import { offlinePanel } from "./views.js";
import {
  MAX_TOTAL_PACK_BYTES,
  OFFLINE_SHELL_RELEASE,
  baseUrlFromModule,
  createReadingPackPlan,
  deleteReadingPack,
  downloadReadingPack,
  estimateResourceSizes,
  offlineCapability,
  serviceWorkerUrl,
  totalPackBytes,
  verifyReadingPack,
} from "./pack.js";

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function readyCourses(courses) {
  return (Array.isArray(courses) ? courses : []).filter(
    (course) => course.status === "ready" && course.readyTopicCount > 0,
  );
}

export async function createOfflineController({
  adapter,
  content,
  courses = [],
  repaint = () => {},
  moduleUrl,
} = {}) {
  const capability = offlineCapability();
  const baseUrl = baseUrlFromModule(moduleUrl);
  const state = {
    capability,
    courses: readyCourses(courses),
    units: [],
    selectedCourseId: readyCourses(courses)[0]?.id || "",
    selectedUnitId: "",
    plan: null,
    packs: [],
    progress: null,
    status: "idle",
    statusMessage: "",
  };
  let records = [];
  let selectionGeneration = 0;
  let abortController = null;

  async function refreshPacks(paint = true) {
    records = await adapter.list({ namespace: "app", kind: "offline-pack" });
    const packs = [];
    for (const record of records) {
      if (record.payload?.status === "complete") {
        const verified = await verifyReadingPack(record, { baseUrl });
        packs.push({
          record,
          available: verified.ok,
          reason: verified.reason,
        });
      } else {
        packs.push({
          record,
          available: false,
          reason: record.payload?.error || "This pack was not completed.",
        });
      }
    }
    state.packs = packs.sort((left, right) =>
      String(right.record.updatedAt).localeCompare(String(left.record.updatedAt)),
    );
    if (paint) repaint();
  }

  async function loadUnits(courseId, { paint = true } = {}) {
    const generation = ++selectionGeneration;
    state.selectedCourseId = courseId;
    state.selectedUnitId = "";
    state.units = [];
    state.plan = null;
    try {
      const choices = await content.readingPackChoices(courseId);
      if (generation !== selectionGeneration) return;
      state.units = (choices?.units || []).filter((unit) => unit.status === "ready");
      state.selectedUnitId = state.units[0]?.id || "";
      state.statusMessage = state.units.length
        ? "Choose Check included files to review this pack."
        : "This course has no ready reading units to save.";
    } catch {
      if (generation !== selectionGeneration) return;
      state.statusMessage = "The unit list could not load. Try again while online.";
    }
    if (paint) repaint();
  }

  async function preparePack({ paint = true } = {}) {
    if (!state.selectedCourseId || !state.selectedUnitId) return false;
    const generation = ++selectionGeneration;
    state.status = "preparing";
    state.statusMessage = "Checking the selected reading pages and release.";
    state.plan = null;
    if (paint) repaint();
    try {
      const data = await content.readingPack(
        state.selectedCourseId,
        state.selectedUnitId,
      );
      if (generation !== selectionGeneration) return false;
      let plan = createReadingPackPlan(data, {
        baseUrl,
        applicationRelease: OFFLINE_SHELL_RELEASE,
      });
      plan = await estimateResourceSizes(plan, { baseUrl });
      if (generation !== selectionGeneration) return false;
      state.plan = plan;
      state.status = "idle";
      state.statusMessage = plan.unknownSizeCount
        ? "Some file sizes will be verified during download."
        : "The selected files are ready to download.";
    } catch (error) {
      if (generation !== selectionGeneration) return false;
      state.status = "error";
      state.statusMessage = error?.message || "The reading pack could not be prepared.";
    }
    if (paint) repaint();
    return true;
  }

  async function registration() {
    if (!capability.ok) throw new Error(capability.reason);
    const serviceWorker = globalThis.navigator?.serviceWorker;
    if (!serviceWorker?.register)
      throw new Error("This browser cannot register the offline reader.");
    return serviceWorker.register(serviceWorkerUrl(moduleUrl), {
      scope: baseUrl.pathname,
    });
  }

  async function writePackRecord(manifest, expectedRevision = 0) {
    return adapter.write(
      {
        namespace: "app",
        kind: "offline-pack",
        recordId: manifest.packId,
        courseId: manifest.course.id,
        contentIdentity: manifest.release,
        payload: {
          schemaVersion: 1,
          status: manifest.status,
          manifest,
          error: manifest.error || "",
        },
      },
      { expectedRevision },
    );
  }

  async function downloadPack() {
    if (!state.plan || state.status === "downloading") return true;
    state.status = "downloading";
    state.statusMessage =
      "Preparing a release-scoped cache. Existing packs stay available.";
    state.progress = { completed: 0, total: state.plan.resources.length };
    repaint();
    const plan = state.plan;
    let recordResult;
    try {
      await registration();
      const existing = records.find(
        (record) => record.kind === "offline-pack" && record.recordId === plan.packId,
      );
      const staging = { ...clone(plan), status: "downloading" };
      recordResult = await writePackRecord(staging, existing?.recordRevision || 0);
      if (!recordResult.ok)
        throw new Error(
          recordResult.error || "The pack metadata changed in another tab.",
        );
      abortController = new AbortController();
      const result = await downloadReadingPack(plan, {
        baseUrl,
        signal: abortController.signal,
        existingRecords: records,
        maxTotalBytes: MAX_TOTAL_PACK_BYTES,
        onProgress(progress) {
          state.progress = progress;
          repaint();
        },
      });
      if (!result.ok) {
        const incomplete = {
          ...clone(plan),
          status: "incomplete",
          error: result.error,
          byteSize: result.byteSize || null,
        };
        await writePackRecord(incomplete, recordResult.record.recordRevision);
        state.status = result.status === "cancelled" ? "idle" : "error";
        state.statusMessage =
          result.status === "cancelled"
            ? "Download cancelled. The partial cache is not available offline."
            : `${result.error} The pack was not marked available offline.`;
      } else {
        const complete = await writePackRecord(
          result.manifest,
          recordResult.record.recordRevision,
        );
        if (!complete.ok) {
          await deleteReadingPack(plan.packId);
          throw new Error(complete.error || "The completed pack could not be recorded.");
        }
        state.status = "idle";
        state.statusMessage = `Reading pack saved: ${result.manifest.pages.length} pages are available offline for this release.`;
      }
    } catch (error) {
      if (recordResult?.record) {
        await writePackRecord(
          {
            ...clone(plan),
            status: "incomplete",
            error: error?.message || "Download failed.",
          },
          recordResult.record.recordRevision,
        );
      }
      state.status = "error";
      state.statusMessage = error?.message || "The reading pack could not be saved.";
    } finally {
      abortController = null;
      state.progress = null;
      await refreshPacks(false);
      repaint();
    }
    return true;
  }

  async function cancelDownload() {
    if (abortController) abortController.abort();
    return true;
  }

  async function deletePack(packId) {
    const pack = state.packs.find((item) => item.record.recordId === packId);
    if (!pack) return true;
    await deleteReadingPack(packId);
    await adapter.remove(pack.record);
    state.statusMessage =
      "The selected offline pack was deleted. Private study work was not changed.";
    await refreshPacks(false);
    repaint();
    return true;
  }

  async function repairPack(packId) {
    const pack = state.packs.find((item) => item.record.recordId === packId);
    const manifest = pack?.record.payload?.manifest;
    if (!manifest) return true;
    state.selectedCourseId = manifest.course.id;
    await loadUnits(state.selectedCourseId, { paint: false });
    state.selectedUnitId = manifest.unit.id;
    await preparePack({ paint: false });
    state.statusMessage =
      "A current release is prepared. Download it to repair this pack.";
    repaint();
    return true;
  }

  await adapter.ready;
  if (state.capability.ok) {
    await loadUnits(state.selectedCourseId, { paint: false });
    await refreshPacks(false);
  }

  return {
    page: () => offlinePanel(state),
    async change(event) {
      const course = event.target.closest?.("[data-offline-course]");
      if (course) {
        await loadUnits(course.value);
        return true;
      }
      const unit = event.target.closest?.("[data-offline-unit]");
      if (unit) {
        state.selectedUnitId = unit.value;
        state.plan = null;
        state.statusMessage = "Choose Check included files to review this pack.";
        repaint();
        return true;
      }
      return false;
    },
    async click(event) {
      const action = event.target.closest?.("[data-offline-action]");
      if (!action) return false;
      const kind = action.dataset.offlineAction;
      if (kind === "prepare-pack") return preparePack();
      if (kind === "download-pack") return downloadPack();
      if (kind === "cancel-download") return cancelDownload();
      if (kind === "delete-pack") return deletePack(action.dataset.offlinePack);
      if (kind === "repair-pack") return repairPack(action.dataset.offlinePack);
      return false;
    },
    get state() {
      return clone({ ...state, records, abortController: undefined });
    },
  };
}

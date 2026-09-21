import {
  BACKUP_CATEGORIES,
  CATEGORY_LABELS,
  createExportEnvelope,
  estimateBytes,
  formatBytes,
  MAX_IMPORT_BYTES,
  parseImportText,
  planImport,
  stringifyExport,
} from "./format.js";
import { backupPanel } from "./views.js";

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function courseIdFor(record) {
  return (
    record.courseId ||
    record.payload?.courseId ||
    (record.namespace?.startsWith("course:") ? record.namespace.slice(8) : "")
  );
}

function filename() {
  return `page-one-study-data-${new Date().toISOString().slice(0, 10)}.json`;
}

export async function createBackupController({
  adapter,
  courses = [],
  records = [],
  repaint = () => {},
} = {}) {
  const state = {
    courses,
    records: [...records],
    categories: ["attempts", "writing", "terms", "reading"],
    courseIds: courses.map((course) => course.id),
    availableCourseIds: [],
    courseLabels: {},
    exportRecordCount: 0,
    exportBytes: 0,
    exportHasInvalid: false,
    importPreview: null,
    importParsed: null,
    strategy: "keep-both",
    feedback: "",
  };

  function refreshCourseChoices() {
    const ids = new Set(state.courses.map((course) => course.id));
    for (const record of state.records) {
      const courseId = courseIdFor(record);
      if (courseId) ids.add(courseId);
    }
    state.availableCourseIds = [...ids].sort();
    state.courseLabels = Object.fromEntries(
      state.availableCourseIds.map((id) => [
        id,
        state.courses.find((course) => course.id === id)?.shortTitle ||
          state.courses.find((course) => course.id === id)?.title ||
          `${id} · archived or unavailable`,
      ]),
    );
    state.courseIds = state.courseIds.filter((id) => ids.has(id));
  }

  function refreshExportPreview() {
    const envelope = createExportEnvelope(state.records, {
      categories: state.categories,
      selectedCourseIds: state.courseIds,
      courses: state.courses,
    });
    state.exportEnvelope = envelope;
    state.exportRecordCount = envelope.records.length;
    state.exportBytes = estimateBytes(envelope);
  }

  async function refreshRecords() {
    state.records = (await adapter.list({ includeIncompatible: true })).filter(Boolean);
    refreshCourseChoices();
    refreshExportPreview();
  }

  await adapter.ready;
  refreshCourseChoices();
  refreshExportPreview();

  function downloadExport() {
    const text = stringifyExport(state.exportEnvelope);
    if (typeof document === "undefined" || typeof Blob !== "function") {
      state.feedback = `Prepared ${formatBytes(state.exportBytes)} of readable JSON.`;
      repaint();
      return true;
    }
    try {
      const url = URL.createObjectURL(
        new Blob([text], { type: "application/json;charset=utf-8" }),
      );
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename();
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 0);
      state.feedback = `Download started for ${state.exportRecordCount} record${state.exportRecordCount === 1 ? "" : "s"}. The file stayed on this device; Page One did not upload it.`;
    } catch {
      state.feedback =
        "The download could not start. Your source records remain unchanged.";
    }
    repaint();
    return true;
  }

  async function previewFile(file) {
    if (!file) return true;
    if (Number(file.size) > MAX_IMPORT_BYTES) {
      state.importPreview = {
        ok: false,
        reason: `This file is ${formatBytes(file.size)}; the limit is ${formatBytes(MAX_IMPORT_BYTES)}.`,
      };
      state.feedback = "Import was not changed or applied.";
      repaint();
      return true;
    }
    let text;
    try {
      text = await file.text();
    } catch {
      state.importPreview = {
        ok: false,
        reason: "The file could not be read as UTF-8 JSON.",
      };
      repaint();
      return true;
    }
    const parsed = parseImportText(text);
    if (!parsed.ok) {
      state.importParsed = null;
      state.importPreview = parsed;
      state.feedback = "Nothing has been imported.";
      repaint();
      return true;
    }
    const plan = planImport(parsed, state.records, {
      knownCourseIds: state.courses.map((course) => course.id),
      conflictStrategy: state.strategy,
    });
    state.importParsed = parsed;
    state.importPreview = { ...plan, strategy: state.strategy };
    state.feedback = `Previewed ${parsed.records.length} supported record${parsed.records.length === 1 ? "" : "s"} from ${formatBytes(parsed.bytes)}.`;
    repaint();
    return true;
  }

  async function changeStrategy(value) {
    state.strategy = value === "replace" ? "replace" : "keep-both";
    if (state.importParsed) {
      const plan = planImport(state.importParsed, state.records, {
        knownCourseIds: state.courses.map((course) => course.id),
        conflictStrategy: state.strategy,
      });
      state.importPreview = { ...plan, strategy: state.strategy };
    }
    repaint();
  }

  async function commitImport() {
    if (!state.importParsed || !state.importPreview?.ok) return true;
    const plan = planImport(state.importParsed, state.records, {
      knownCourseIds: state.courses.map((course) => course.id),
      conflictStrategy: state.strategy,
    });
    if (!plan.ok) {
      state.feedback = plan.reason;
      repaint();
      return true;
    }
    const result = await adapter.commitImport({
      importId: `${plan.importId}:${state.strategy}`,
      records: plan.records,
      removeRecords: plan.removeRecords,
      source: "manual-study-data-import",
    });
    if (!result.ok) {
      state.feedback =
        result.error || "The import was rolled back; existing work was left unchanged.";
      repaint();
      return true;
    }
    await refreshRecords();
    state.importPreview = null;
    state.importParsed = null;
    state.feedback =
      result.status === "skipped"
        ? "This exact file and conflict choice were already imported. No duplicate records were added."
        : `Import complete: ${plan.summary.imported} new, ${plan.summary.duplicates} duplicate${plan.summary.duplicates === 1 ? "" : "s"}, ${plan.summary.preservedConflicts} preserved conflict${plan.summary.preservedConflicts === 1 ? "" : "s"}, and ${plan.summary.replaced} replacement${plan.summary.replaced === 1 ? "" : "s"}.`;
    repaint();
    return true;
  }

  return {
    page: () => backupPanel(state),
    async change(event) {
      const category = event.target.closest?.("[data-backup-category]");
      if (category) {
        const set = new Set(state.categories);
        if (category.checked) set.add(category.dataset.backupCategory);
        else set.delete(category.dataset.backupCategory);
        state.categories = BACKUP_CATEGORIES.filter((item) => set.has(item));
        refreshExportPreview();
        repaint();
        return true;
      }
      const course = event.target.closest?.("[data-backup-course]");
      if (course) {
        const set = new Set(state.courseIds);
        if (course.checked) set.add(course.dataset.backupCourse);
        else set.delete(course.dataset.backupCourse);
        state.courseIds = state.availableCourseIds.filter((item) => set.has(item));
        refreshExportPreview();
        repaint();
        return true;
      }
      const strategy = event.target.closest?.("[data-backup-strategy]");
      if (strategy) {
        await changeStrategy(strategy.value);
        return true;
      }
      const file = event.target.closest?.("[data-backup-file]");
      if (file) {
        await previewFile(file.files?.[0]);
        return true;
      }
      return false;
    },
    async click(event) {
      const action = event.target.closest?.("[data-backup-action]");
      if (!action) return false;
      if (action.dataset.backupAction === "download-export") return downloadExport();
      if (action.dataset.backupAction === "clear-import") {
        state.importPreview = null;
        state.importParsed = null;
        state.feedback = "Import preview discarded. Existing work was not changed.";
        repaint();
        return true;
      }
      if (action.dataset.backupAction === "commit-import") return commitImport();
      return false;
    },
    get state() {
      return clone(state);
    },
  };
}

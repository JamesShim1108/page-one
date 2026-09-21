import { createWritingEngine } from "./engine.js";
import {
  courseNamespace,
  createLocalAdapter,
  migrationIdentity,
} from "../storage/adapter.js";

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function safeStorage(getStorage) {
  try {
    return typeof getStorage === "function" ? getStorage() : getStorage;
  } catch {
    return null;
  }
}

function parseLegacy(storage, key) {
  if (!storage) return null;
  try {
    const raw = storage.getItem(key) || storage.getItem("page-one-writing-v1");
    return raw ? { raw, value: JSON.parse(raw), sourceKey: key } : null;
  } catch {
    return null;
  }
}

function randomId(prefix) {
  try {
    if (globalThis.crypto?.randomUUID)
      return `${prefix}-${globalThis.crypto.randomUUID()}`;
  } catch {
    // Fall through to an opaque local value.
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function digest(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function onlyResponses(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(([, text]) => typeof text === "string"),
  );
}

function hasDraftWork(draft) {
  return (
    Object.values(draft.responses || {}).some((text) => text.trim()) ||
    draft.reviewed ||
    Object.values(draft.scores || {}).some((score) => score !== null)
  );
}

function snapshotFingerprint(draft) {
  return JSON.stringify({
    promptId: draft.promptId,
    promptVersion: draft.promptVersion,
    promptSnapshot: draft.promptSnapshot,
    responses: draft.responses,
    reviewed: draft.reviewed,
    scores: draft.scores,
  });
}

function snapshotMatches(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

function compatibilityMap(quiz, fromVersion) {
  const source =
    quiz.promptCompatibility || quiz.writingCompatibility || quiz.compatibility;
  if (!source || typeof source !== "object") return null;
  return (
    source[`${fromVersion}->${quiz.version}`] ||
    source[String(fromVersion)] ||
    source[fromVersion] ||
    null
  );
}

function mappedFields(mapping) {
  if (!mapping || typeof mapping !== "object") return null;
  const fields = mapping.fields || mapping.responseFields || mapping;
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) return null;
  return fields;
}

export function createWritingStore(quiz, getStorageOrOptions = () => sessionStorage) {
  const options =
    typeof getStorageOrOptions === "function"
      ? { getStorage: getStorageOrOptions }
      : { ...(getStorageOrOptions || {}) };
  const getStorage = options.getStorage || (() => sessionStorage);
  const recent = options.recent || null;
  const recentTarget = options.recentTarget || {};
  const adapter =
    options.adapter ||
    (options.usePersistentStorage ? createLocalAdapter(options) : null);
  const key = `page-one-writing:${quiz.id}:v${quiz.version}`;
  const namespace = courseNamespace(quiz.courseId, quiz.id);
  const contentIdentity = `${quiz.id}@v${quiz.version}`;
  const engine = createWritingEngine(quiz);
  const storage = safeStorage(getStorage);
  let draft = engine.newDraft();
  let storageOK = true;
  let storageState = adapter ? "pending" : "temporary";
  let writer = null;
  let checkpoints = [];
  let recoveryRecords = [];
  let checkpointPreview = null;
  let recoveryPreview = null;
  let clearPending = false;
  let recoveryNotice = null;
  let pendingRecovery = null;
  let checkpointTimer = null;
  let lastCheckpointFingerprint = null;
  let lastCheckpointAt = 0;

  function touchRecent() {
    if (!recent || !hasDraftWork(draft)) return;
    Promise.resolve(
      recent.touch({
        ...recentTarget,
        key: recentTarget.key || `writing:${draft.draftId || quiz.id}`,
        kind: "writing",
        route: recentTarget.route || `/writing/${quiz.id}`,
        courseId: recentTarget.courseId || quiz.courseId,
        title:
          recentTarget.title || draft.promptSnapshot?.promptTitle || "Writing practice",
        detail: draft.reviewed ? "Reviewed response" : "Draft in progress",
        active: draft.reviewed !== true,
        status: draft.reviewed ? "complete" : "active",
      }),
    ).catch(() => {});
  }

  function availabilityState() {
    if (!adapter) return "temporary";
    if (adapter.availability === "persistent") return "clean";
    if (adapter.availability === "session" || adapter.availability === "temporary")
      return "temporary";
    return "failed";
  }

  function setResultState(result) {
    if (!result?.ok) {
      storageState = result?.status || "failed";
      storageOK = false;
      return;
    }
    if (result.status === "temporary" && adapter?.availability === "memory") {
      storageState = "failed";
      storageOK = false;
      return;
    }
    storageState = result.status === "temporary" ? "temporary" : "saved";
    storageOK =
      result.status === "temporary"
        ? adapter?.availability === "session" || adapter?.availability === "temporary"
        : adapter?.availability === "persistent";
  }

  function loadLegacy() {
    const saved = parseLegacy(storage, key);
    if (saved && engine.validate(saved.value)) draft = engine.normalizeDraft(saved.value);
    if (saved && !engine.validate(saved.value)) storageOK = false;
    return saved;
  }

  async function migrateLegacy() {
    if (!adapter) return;
    const saved = parseLegacy(storage, key);
    if (!saved) return;
    const valid = engine.validate(saved.value);
    const record = valid
      ? {
          namespace,
          kind: "writing-draft",
          recordId: quiz.id,
          courseId: quiz.courseId || quiz.id.split("-")[0],
          contentIdentity,
          payload: saved.value,
        }
      : {
          namespace,
          kind: "writing-recovery",
          recordId: `${quiz.id}@legacy-${quiz.version}`,
          courseId: quiz.courseId || quiz.id.split("-")[0],
          contentIdentity,
          payload: {
            sourceKey: saved.sourceKey,
            quizId: quiz.id,
            version: quiz.version,
            legacy: saved.value,
            responses: onlyResponses(saved.value?.responses),
            reason: "The saved draft did not match the current prompt schema.",
            createdAt: new Date().toISOString(),
          },
        };
    await adapter.commitMigration({
      migrationId: migrationIdentity(
        saved.sourceKey,
        `${quiz.id}@${quiz.version}`,
        saved.value,
      ),
      source: saved.sourceKey,
      records: [record],
    });
  }

  async function loadRecoveryRecords() {
    if (!adapter || typeof adapter.list !== "function") return;
    recoveryRecords = (
      await adapter.list({
        namespace,
        kind: "writing-recovery",
        includeIncompatible: true,
      })
    )
      .filter((record) => record.payload?.quizId === quiz.id)
      .sort((first, second) =>
        String(second.payload?.createdAt || second.updatedAt).localeCompare(
          String(first.payload?.createdAt || first.updatedAt),
        ),
      );
  }

  function recoveryPayload(payload, record, reason) {
    return {
      schemaVersion: 1,
      recoveryId: randomId("recovery"),
      quizId: payload?.quizId || quiz.id,
      promptId: payload?.promptId || payload?.quizId || quiz.id,
      promptVersion:
        payload?.promptVersion ?? payload?.version ?? record?.contentIdentity ?? null,
      promptSnapshot:
        payload?.promptSnapshot && typeof payload.promptSnapshot === "object"
          ? clone(payload.promptSnapshot)
          : null,
      responses: onlyResponses(payload?.responses),
      reviewed: payload?.reviewed === true,
      scores:
        payload?.scores && typeof payload.scores === "object"
          ? clone(payload.scores)
          : {},
      reason,
      createdAt: new Date().toISOString(),
    };
  }

  async function preserveIncompatible(record, reason) {
    const payload = recoveryPayload(record.payload, record, reason);
    const recordId = `recovery-${quiz.id}-${record.recordRevision}-${digest(JSON.stringify({ payload: record.payload, reason }))}`;
    const spec = {
      namespace,
      kind: "writing-recovery",
      recordId,
      courseId: quiz.courseId || quiz.id.split("-")[0],
      contentIdentity: record.contentIdentity || "unknown",
      payload,
    };
    if (!adapter) return { ok: true, record: { ...spec, payload } };
    const existing = await adapter.read(spec);
    if (existing) {
      recoveryRecords = [
        existing,
        ...recoveryRecords.filter((item) => item.recordId !== existing.recordId),
      ];
      return { ok: true, record: existing };
    }
    const result = await adapter.write(spec, { expectedRevision: 0 });
    if (result.ok) {
      recoveryRecords = [
        result.record,
        ...recoveryRecords.filter((item) => item.recordId !== result.record.recordId),
      ];
    }
    return result;
  }

  function isCurrentPrompt(record) {
    const payload = record?.payload;
    if (!payload || payload.quizId !== quiz.id || !engine.validate(payload)) return false;
    if (record.contentIdentity && record.contentIdentity !== contentIdentity)
      return false;
    if (payload.promptVersion !== undefined && payload.promptVersion !== quiz.version)
      return false;
    if (
      payload.promptSnapshot &&
      !snapshotMatches(payload.promptSnapshot, engine.promptSnapshot)
    )
      return false;
    return true;
  }

  async function replaceIncompatibleRecord(record, reason) {
    const preserved = await preserveIncompatible(record, reason);
    if (!preserved.ok) {
      pendingRecovery = { record, reason };
      recoveryNotice = {
        message:
          "The older draft could not be moved to recovery yet. Retry before editing this new prompt.",
        retryable: true,
      };
      draft = engine.newDraft();
      storageState = "failed";
      storageOK = false;
      return preserved;
    }
    pendingRecovery = null;
    const next = engine.newDraft();
    draft = next;
    const replacement = await writer.save(next);
    if (!replacement.ok) {
      recoveryNotice = {
        message:
          "The older draft is preserved, but the new prompt could not be opened for saving yet.",
        retryable: true,
      };
      storageState = replacement.status || "failed";
      storageOK = false;
      return replacement;
    }
    recoveryNotice = {
      message:
        "The earlier prompt version is preserved below. This is a new draft for the current prompt.",
      retryable: false,
    };
    setResultState(replacement);
    return replacement;
  }

  async function retryRecovery() {
    if (!pendingRecovery || !writer) return { ok: false, status: "failed" };
    const result = await replaceIncompatibleRecord(
      pendingRecovery.record,
      pendingRecovery.reason,
    );
    if (result.ok) {
      await loadRecoveryRecords();
      await loadCheckpoints();
    }
    return result;
  }

  async function loadCheckpoints() {
    if (!adapter || typeof adapter.list !== "function") return;
    checkpoints = (await adapter.list({ namespace, kind: "draft-checkpoint" }))
      .filter(
        (record) =>
          record.payload?.quizId === quiz.id && record.payload?.draftId === draft.draftId,
      )
      .sort((first, second) =>
        String(second.payload?.createdAt || second.updatedAt).localeCompare(
          String(first.payload?.createdAt || first.updatedAt),
        ),
      );
    const newest = checkpoints[0]?.payload;
    if (newest) {
      lastCheckpointFingerprint = newest.fingerprint || null;
      lastCheckpointAt = Date.parse(newest.createdAt) || 0;
    }
  }

  function checkpointData(reason) {
    const createdAt = new Date().toISOString();
    return {
      schemaVersion: 1,
      checkpointId: randomId("checkpoint"),
      draftId: draft.draftId,
      quizId: quiz.id,
      promptId: draft.promptId,
      promptVersion: draft.promptVersion,
      promptSnapshot: clone(draft.promptSnapshot || engine.promptSnapshot),
      responses: clone(draft.responses),
      lastEditedField: draft.lastEditedField,
      editorPosition: clone(draft.editorPosition),
      reviewed: draft.reviewed,
      scores: clone(draft.scores),
      reason,
      createdAt,
      automatic: true,
      fingerprint: snapshotFingerprint(draft),
    };
  }

  async function pruneCheckpoints() {
    const automatic = checkpoints
      .filter((record) => record.payload?.automatic !== false)
      .sort((first, second) =>
        String(first.payload?.createdAt || first.updatedAt).localeCompare(
          String(second.payload?.createdAt || second.updatedAt),
        ),
      );
    while (automatic.length > 10) {
      const oldest = automatic.shift();
      if (adapter) await adapter.remove(oldest);
      checkpoints = checkpoints.filter((record) => record.recordId !== oldest.recordId);
    }
  }

  async function createCheckpoint(reason = "manual", { force = false } = {}) {
    const fingerprint = snapshotFingerprint(draft);
    const duplicate = checkpoints.find(
      (record) => record.payload?.fingerprint === fingerprint,
    );
    if (!force && duplicate)
      return { ok: true, status: "duplicate", record: clone(duplicate) };
    const payload = checkpointData(reason);
    const record = {
      namespace,
      kind: "draft-checkpoint",
      recordId: `${draft.draftId}:${payload.checkpointId}`,
      courseId: quiz.courseId || quiz.id.split("-")[0],
      contentIdentity,
      payload,
    };
    let result;
    if (adapter) result = await adapter.write(record, { expectedRevision: 0 });
    else {
      result = {
        ok: true,
        status: "temporary",
        record: {
          ...record,
          recordRevision: 1,
          updatedAt: payload.createdAt,
          schemaVersion: 1,
        },
      };
    }
    if (!result.ok) return result;
    checkpoints = [result.record, ...checkpoints];
    lastCheckpointFingerprint = fingerprint;
    lastCheckpointAt = Date.parse(payload.createdAt) || Date.now();
    await pruneCheckpoints();
    return result;
  }

  function schedulePeriodicCheckpoint() {
    if (checkpointTimer !== null) clearTimeout(checkpointTimer);
    checkpointTimer = null;
    if (!adapter || !hasDraftWork(draft)) return;
    checkpointTimer = setTimeout(() => {
      checkpointTimer = null;
      if (hasDraftWork(draft) && snapshotFingerprint(draft) !== lastCheckpointFingerprint)
        createCheckpoint("periodic").catch(() => {});
    }, 120_000);
    checkpointTimer?.unref?.();
  }

  function fieldMappingForPayload(payload) {
    const snapshot = payload?.promptSnapshot;
    if (!snapshot) {
      return payload?.promptVersion === quiz.version ? {} : null;
    }
    if (
      snapshot.promptId === quiz.id &&
      snapshot.promptVersion === quiz.version &&
      snapshotMatches(snapshot, engine.promptSnapshot)
    )
      return {};
    const mapping = mappedFields(compatibilityMap(quiz, payload?.promptVersion));
    return mapping;
  }

  function fieldMappingFor(checkpoint) {
    return fieldMappingForPayload(checkpoint.payload);
  }

  function draftFromPayload(payload, mapping) {
    if (mapping === null) return null;
    const restored = engine.newDraft({ draftId: draft.draftId });
    const responses = payload?.responses || {};
    for (const field of engine.responseFields) {
      const sourceId = mapping[field.id] || field.id;
      if (typeof responses[sourceId] === "string")
        restored.responses[field.id] = responses[sourceId];
    }
    const sourceField = payload?.lastEditedField;
    const targetField = engine.responseFields.some((field) => field.id === sourceField)
      ? sourceField
      : Object.entries(mapping).find(([, sourceId]) => sourceId === sourceField)?.[0];
    if (targetField) restored.lastEditedField = targetField;
    if (
      payload?.editorPosition &&
      Number.isInteger(payload.editorPosition.start) &&
      Number.isInteger(payload.editorPosition.end)
    )
      restored.editorPosition = {
        start: Math.max(0, payload.editorPosition.start),
        end: Math.max(payload.editorPosition.start, payload.editorPosition.end),
      };
    return restored;
  }

  function draftFromCheckpoint(checkpoint) {
    return draftFromPayload(checkpoint.payload, fieldMappingFor(checkpoint));
  }

  function checkpointById(id) {
    return checkpoints.find((record) => record.payload?.checkpointId === id) || null;
  }

  function recoveryById(id) {
    return recoveryRecords.find((record) => record.recordId === id) || null;
  }

  function canMapRecovery(id) {
    const record = recoveryById(id);
    const mapping = record && fieldMappingForPayload(record.payload);
    return Boolean(mapping && Object.keys(mapping).length);
  }

  async function useRecovery(id) {
    const record = recoveryById(id);
    const mapping = record && fieldMappingForPayload(record.payload);
    if (!record || !mapping || !Object.keys(mapping).length)
      return {
        ok: false,
        status: "incompatible",
        error: "No authored compatibility mapping is available for this response.",
      };
    const previous = clone(draft);
    draft = draftFromPayload(record.payload, mapping);
    const result = await save();
    if (!result?.ok) {
      draft = previous;
      return {
        ok: false,
        status: result?.status || "failed",
        error:
          "The mapped response could not be saved. The recovery copy remains available.",
      };
    }
    recoveryPreview = null;
    return { ok: true, status: result.status };
  }

  async function restoreCheckpoint(id) {
    const checkpoint = checkpointById(id);
    const restored = checkpoint && draftFromCheckpoint(checkpoint);
    if (!checkpoint || !restored)
      return {
        ok: false,
        status: "incompatible",
        error:
          "This version belongs to an incompatible prompt. Copy it from the preview instead.",
      };
    const previous = clone(draft);
    const safety = await createCheckpoint("before-restore", { force: true });
    if (!safety.ok)
      return {
        ok: false,
        status: safety.status || "failed",
        error: "The current draft could not be checkpointed, so nothing was restored.",
      };
    draft = restored;
    const result = await save();
    if (!result?.ok) {
      draft = previous;
      return {
        ok: false,
        status: result?.status || "failed",
        error:
          "The restored version could not be saved. Both versions remain available to copy.",
      };
    }
    checkpointPreview = null;
    recoveryPreview = null;
    clearPending = false;
    return { ok: true, status: result.status };
  }

  async function clearDraft() {
    if (!hasDraftWork(draft)) {
      clearPending = false;
      return { ok: true, status: "empty" };
    }
    const previous = clone(draft);
    const safety = await createCheckpoint("before-clear", { force: true });
    if (!safety.ok)
      return {
        ok: false,
        status: safety.status || "failed",
        error: "The current draft could not be checkpointed, so nothing was cleared.",
      };
    draft = engine.newDraft({ draftId: previous.draftId });
    const result = await save();
    if (!result?.ok) {
      draft = previous;
      return {
        ok: false,
        status: result?.status || "failed",
        error: "The draft could not be cleared. Your current version remains visible.",
      };
    }
    clearPending = false;
    checkpointPreview = null;
    return { ok: true, status: result.status };
  }

  function save() {
    if (!adapter) {
      if (!storage) {
        storageOK = false;
        storageState = "failed";
        return false;
      }
      try {
        storage.setItem(key, JSON.stringify(draft));
        storageOK = true;
        storageState = "temporary";
        touchRecent();
      } catch {
        storageOK = false;
        storageState = "failed";
      }
      return storageOK;
    }
    return saveDurable();
  }

  async function saveDurable() {
    storageState = "pending";
    if (!writer) return ready.then(saveDurable);
    const result = await writer
      .save(draft)
      .catch((error) => ({ ok: false, status: "failed", error }));
    setResultState(result);
    if (result.ok) {
      schedulePeriodicCheckpoint();
      touchRecent();
    }
    return result;
  }

  async function initialize() {
    await adapter.ready;
    await migrateLegacy();
    writer = adapter.createRecordWriter({
      namespace,
      kind: "writing-draft",
      recordId: quiz.id,
      resetScopes: [`writing:${quiz.id}`, namespace, "all"],
      courseId: quiz.courseId || quiz.id.split("-")[0],
      contentIdentity,
    });
    const record = await writer.ready;
    await loadRecoveryRecords();
    if (record?.payload) {
      if (isCurrentPrompt(record)) draft = engine.normalizeDraft(record.payload);
      else
        await replaceIncompatibleRecord(
          record,
          "The prompt version or response fields changed.",
        );
    }
    await loadCheckpoints();
    if (!recoveryNotice && storageState !== "failed") {
      storageState = availabilityState();
      storageOK = storageState !== "failed";
    }
  }

  if (!adapter) {
    loadLegacy();
    recoveryRecords = [];
    checkpoints = [];
  }

  const ready = adapter
    ? initialize().catch((error) => {
        storageState = "failed";
        storageOK = false;
        throw error;
      })
    : Promise.resolve();

  return {
    ready,
    engine,
    save,
    createCheckpoint,
    async prepareReview() {
      return createCheckpoint("before-review");
    },
    async prepareRevision() {
      return createCheckpoint("before-revise");
    },
    async restoreCheckpoint(id) {
      const result = await restoreCheckpoint(id);
      return result;
    },
    async clearDraft() {
      return clearDraft();
    },
    async retryRecovery() {
      return retryRecovery();
    },
    canMapRecovery,
    async useRecovery(id) {
      return useRecovery(id);
    },
    previewCheckpoint(id) {
      const record = checkpointById(id);
      checkpointPreview = record ? clone(record.payload) : null;
      recoveryPreview = null;
    },
    previewRecovery(id) {
      const record = recoveryRecords.find((item) => item.recordId === id);
      recoveryPreview = record ? clone(record.payload) : null;
      checkpointPreview = null;
    },
    clearPreview() {
      checkpointPreview = null;
      recoveryPreview = null;
    },
    setClearPending(value) {
      clearPending = Boolean(value);
    },
    get draft() {
      return draft;
    },
    get storageOK() {
      return storageOK;
    },
    get storageState() {
      return writer?.state === "conflict" ? "conflict" : storageState;
    },
    get conflict() {
      return writer?.conflict || null;
    },
    get checkpoints() {
      return checkpoints.map((record) => clone(record.payload));
    },
    get recoveryRecords() {
      return recoveryRecords.map((record) => clone(record));
    },
    get checkpointPreview() {
      return checkpointPreview ? clone(checkpointPreview) : null;
    },
    get recoveryPreview() {
      return recoveryPreview ? clone(recoveryPreview) : null;
    },
    get recoveryNotice() {
      return recoveryNotice;
    },
    get clearPending() {
      return clearPending;
    },
    async resolveSavedConflict() {
      const payload = await writer?.resolveSaved();
      if (!payload) return false;
      if (engine.validate(payload)) draft = engine.normalizeDraft(payload);
      storageState = "saved";
      storageOK = true;
      return true;
    },
    get writer() {
      return writer;
    },
  };
}

// The browser adapter is the only module that knows about IndexedDB or the
// session fallback. Feature engines receive plain objects and stay testable.

import { createStorageCoordinator } from "./coordination.js";

export const DATABASE_VERSION = 1;
export const RECORD_SCHEMA_VERSION = 1;
export const RECORD_STORE = "records";
export const STORAGE_STATES = Object.freeze([
  "clean",
  "pending",
  "saved",
  "temporary",
  "failed",
  "conflict",
]);

const FALLBACK_VERSION = 1;
const NO_VALUE = Symbol("no-value");

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function safeSessionStorage() {
  try {
    return globalThis.sessionStorage;
  } catch {
    return null;
  }
}

function isStorage(value) {
  return (
    value &&
    typeof value.getItem === "function" &&
    typeof value.setItem === "function" &&
    typeof value.removeItem === "function"
  );
}

function currentTime() {
  return new Date().toISOString();
}

function fallbackKey(scope) {
  return `page-one-local-fallback-v${FALLBACK_VERSION}:${scope}`;
}

function temporaryFallbackKey(scope) {
  return `page-one-local-temporary-v${FALLBACK_VERSION}:${scope}`;
}

function recordKey({ namespace, kind, recordId }) {
  return JSON.stringify([namespace, kind, recordId]);
}

function idFor(scope, kind, recordId) {
  return `${scope}:${kind}:${recordId}`;
}

function errorMessage(error) {
  return error instanceof Error
    ? error.message
    : String(error || "Unknown storage error");
}

function openDatabase(indexedDB, name) {
  return new Promise((resolve, reject) => {
    let request;
    try {
      request = indexedDB.open(name, DATABASE_VERSION);
    } catch (error) {
      reject(error);
      return;
    }
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(RECORD_STORE)) {
        database.createObjectStore(RECORD_STORE, {
          keyPath: ["namespace", "kind", "recordId"],
        });
      }
    };
    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => database.close();
      resolve(database);
    };
    request.onerror = () =>
      reject(request.error || new Error("IndexedDB could not open."));
    request.onblocked = () => reject(new Error("IndexedDB open was blocked."));
  });
}

function makeEnvelope({
  namespace,
  kind,
  recordId,
  payload,
  recordRevision = 0,
  updatedAt = currentTime(),
  schemaVersion = RECORD_SCHEMA_VERSION,
  courseId,
  contentIdentity,
}) {
  const record = {
    schemaVersion,
    namespace,
    kind,
    recordId,
    recordRevision,
    updatedAt,
    payload: clone(payload),
  };
  if (courseId) record.courseId = courseId;
  if (contentIdentity) record.contentIdentity = contentIdentity;
  return record;
}

export function validateRecord(record, { allowFuture = false } = {}) {
  if (!record || typeof record !== "object" || Array.isArray(record))
    return { ok: false, reason: "record must be an object" };
  for (const field of ["namespace", "kind", "recordId", "updatedAt"]) {
    if (typeof record[field] !== "string" || !record[field].trim())
      return { ok: false, reason: `${field} must be a nonempty string` };
  }
  if (!Number.isInteger(record.schemaVersion) || record.schemaVersion < 1)
    return { ok: false, reason: "schemaVersion must be a positive integer" };
  if (record.schemaVersion > RECORD_SCHEMA_VERSION && !allowFuture)
    return { ok: false, future: true, reason: "record schema is newer than this app" };
  if (!Number.isInteger(record.recordRevision) || record.recordRevision < 0)
    return { ok: false, reason: "recordRevision must be a nonnegative integer" };
  if (record.payload === undefined) return { ok: false, reason: "payload is required" };
  if (record.courseId !== undefined && typeof record.courseId !== "string")
    return { ok: false, reason: "courseId must be a string when present" };
  if (record.contentIdentity !== undefined && typeof record.contentIdentity !== "string")
    return { ok: false, reason: "contentIdentity must be a string when present" };
  return { ok: true, future: false };
}

export function deploymentScopeFromBase(base = "") {
  const value =
    String(base || "/")
      .replace(/^https?:\/\/[^/]+/i, "")
      .replace(/\/index\.html?$/i, "")
      .replace(/\/+$/, "") || "/";
  return (
    value
      .split("/")
      .filter(Boolean)
      .map((part) => part.replace(/[^a-z0-9._~-]/gi, "_"))
      .join("_") || "root"
  );
}

export function getDeploymentScope() {
  try {
    return deploymentScopeFromBase(globalThis.location?.pathname || "/");
  } catch {
    return "root";
  }
}

function courseNamespace(courseId, fallbackId = "") {
  return `course:${courseId || String(fallbackId).split("-")[0] || "unknown"}`;
}

function normalizeSpec(spec) {
  const namespace = String(spec.namespace || "app");
  const kind = String(spec.kind || "");
  const recordId = String(spec.recordId || "");
  if (!kind || !recordId)
    throw new TypeError("A storage record needs a kind and recordId.");
  return { ...spec, namespace, kind, recordId };
}

function randomRecordId(prefix) {
  try {
    if (globalThis.crypto?.randomUUID)
      return `${prefix}-${globalThis.crypto.randomUUID()}`;
  } catch {
    // Fall through to a local opaque value.
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function resetRecordSpec(scope) {
  return { namespace: "app", kind: "reset-state", recordId: String(scope) };
}

function resetEpoch(record) {
  return Number.isInteger(record?.payload?.epoch) ? record.payload.epoch : 0;
}

function scopeMatches(record, scope) {
  if (!record || typeof scope !== "string") return false;
  if (scope === "all")
    return (
      [
        "attempt",
        "attempt-summary",
        "attempt-annotation",
        "conflict-copy",
        "draft-checkpoint",
        "imported-archive",
        "offline-pack",
        "reading-mark",
        "reading-position",
        "recent",
        "terms-note",
        "terms-progress",
        "writing-draft",
        "writing-recovery",
      ].includes(record.kind) ||
      (record.namespace === "app" && record.kind === "recent")
    );
  if (scope === "preferences")
    return record.namespace === "app" && record.kind === "preferences";
  if (scope === "recent") return record.namespace === "app" && record.kind === "recent";
  if (scope.startsWith("course:")) return record.namespace === scope;
  if (scope.startsWith("terms:")) {
    const setId = scope.slice("terms:".length);
    return (
      ["terms-progress", "terms-note", "conflict-copy"].includes(record.kind) &&
      (record.recordId === setId ||
        record.payload?.setId === setId ||
        record.payload?.original?.recordId === setId)
    );
  }
  if (scope.startsWith("writing:")) {
    const quizId = scope.slice("writing:".length);
    return (
      ["writing-draft", "writing-recovery", "draft-checkpoint", "conflict-copy"].includes(
        record.kind,
      ) &&
      (record.recordId === quizId ||
        record.payload?.quizId === quizId ||
        record.payload?.original?.recordId === quizId)
    );
  }
  if (scope.startsWith("attempt:")) {
    const attemptId = scope.slice("attempt:".length);
    return (
      ["attempt", "attempt-summary", "attempt-annotation", "conflict-copy"].includes(
        record.kind,
      ) &&
      (record.recordId === attemptId ||
        record.payload?.attemptId === attemptId ||
        record.payload?.original?.recordId === attemptId)
    );
  }
  return false;
}

export function createLocalAdapter({
  deploymentScope = getDeploymentScope(),
  indexedDB = globalThis.indexedDB,
  getStorage = safeSessionStorage,
  databaseName = `page-one-local:${deploymentScope}`,
} = {}) {
  const fallbackRecords = new Map();
  const queues = new Map();
  const coordinator = createStorageCoordinator({ scope: deploymentScope });
  let database = null;
  let availability = "opening";
  let initError = null;
  let fallbackLoaded = false;
  let fallbackStorage = null;
  try {
    fallbackStorage = typeof getStorage === "function" ? getStorage() : getStorage;
  } catch (error) {
    initError = error;
  }
  const modeKey = `page-one-tab-mode-v1:${deploymentScope}`;
  let mode = "persistent";
  try {
    if (fallbackStorage?.getItem(modeKey) === "temporary") mode = "temporary";
  } catch {
    // A tab-mode preference is optional; persistent mode remains the default.
  }

  function setFallbackAvailability() {
    availability = mode === "temporary" ? "temporary" : "session";
    if (!isStorage(fallbackStorage)) availability = "memory";
  }

  function loadFallback() {
    if (fallbackLoaded) return;
    fallbackLoaded = true;
    if (!isStorage(fallbackStorage)) return;
    try {
      const parsed = JSON.parse(
        fallbackStorage.getItem(
          mode === "temporary"
            ? temporaryFallbackKey(deploymentScope)
            : fallbackKey(deploymentScope),
        ) || "{}",
      );
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
      for (const [key, value] of Object.entries(parsed)) {
        if (validateRecord(value).ok || validateRecord(value, { allowFuture: true }).ok)
          fallbackRecords.set(key, value);
      }
    } catch (error) {
      initError = error;
    }
  }

  function refreshFallback() {
    if (!isStorage(fallbackStorage) || availability === "memory") return;
    fallbackRecords.clear();
    fallbackLoaded = false;
    loadFallback();
  }

  function saveFallback() {
    if (!isStorage(fallbackStorage)) return false;
    try {
      const value = Object.fromEntries(fallbackRecords.entries());
      fallbackStorage.setItem(
        mode === "temporary"
          ? temporaryFallbackKey(deploymentScope)
          : fallbackKey(deploymentScope),
        JSON.stringify(value),
      );
      return true;
    } catch (error) {
      initError = error;
      return false;
    }
  }

  async function initialize() {
    if (mode === "temporary") {
      loadFallback();
      setFallbackAvailability();
      return;
    }
    if (indexedDB && typeof indexedDB.open === "function") {
      try {
        database = await openDatabase(indexedDB, databaseName);
        availability = "persistent";
        return;
      } catch (error) {
        initError = error;
      }
    }
    loadFallback();
    setFallbackAvailability();
  }

  const ready = initialize();

  function switchToFallback(error) {
    if (error) initError = error;
    database = null;
    loadFallback();
    setFallbackAvailability();
  }

  function notifyRecord(spec, revision) {
    coordinator.notify({
      type: "record",
      namespace: spec.namespace,
      kind: spec.kind,
      recordId: spec.recordId,
      revision,
    });
  }

  function notifyReset(scope, epoch) {
    coordinator.notify({ type: "reset", resetScope: String(scope), epoch });
  }

  async function readRaw(spec) {
    const normalized = normalizeSpec(spec);
    await ready;
    if (database && mode !== "temporary") {
      try {
        return await new Promise((resolve, reject) => {
          let transaction;
          try {
            transaction = database.transaction(RECORD_STORE, "readonly");
            const request = transaction
              .objectStore(RECORD_STORE)
              .get([normalized.namespace, normalized.kind, normalized.recordId]);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () =>
              reject(request.error || new Error("IndexedDB read failed."));
            transaction.onerror = () =>
              reject(transaction.error || new Error("IndexedDB read failed."));
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        switchToFallback(error);
      }
    }
    refreshFallback();
    loadFallback();
    return clone(fallbackRecords.get(recordKey(normalized)) || null);
  }

  async function read(spec) {
    const record = await readRaw(spec);
    return validateRecord(record).ok ? clone(record) : null;
  }

  async function list({ namespace, kind, includeIncompatible = false } = {}) {
    await ready;
    let records;
    if (database && mode !== "temporary") {
      try {
        records = await new Promise((resolve, reject) => {
          let transaction;
          try {
            transaction = database.transaction(RECORD_STORE, "readonly");
            const request = transaction.objectStore(RECORD_STORE).getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () =>
              reject(request.error || new Error("IndexedDB list failed."));
            transaction.onerror = () =>
              reject(transaction.error || new Error("IndexedDB list failed."));
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        switchToFallback(error);
      }
    }
    if (!database || mode === "temporary") {
      refreshFallback();
      loadFallback();
      records = [...fallbackRecords.values()].map(clone);
    }
    return records.filter((record) => {
      const valid = validateRecord(record, { allowFuture: true });
      if (!valid.ok) return false;
      if (!includeIncompatible && validateRecord(record).future) return false;
      return (
        (!namespace || record.namespace === namespace) && (!kind || record.kind === kind)
      );
    });
  }

  async function writeNow(
    spec,
    {
      expectedRevision = null,
      expectedEpoch = null,
      resetScope = "all",
      expectedEpochs = null,
    } = {},
  ) {
    const normalized = normalizeSpec(spec);
    await ready;
    const key = recordKey(normalized);
    const epochs =
      expectedEpochs ||
      (expectedEpoch === null ? null : { [String(resetScope)]: expectedEpoch });
    if (database && mode !== "temporary") {
      try {
        return await new Promise((resolve, reject) => {
          let transaction;
          let outcome = null;
          try {
            transaction = database.transaction(RECORD_STORE, "readwrite");
            const store = transaction.objectStore(RECORD_STORE);
            const request = store.get([
              normalized.namespace,
              normalized.kind,
              normalized.recordId,
            ]);
            const epochRequests = Object.keys(epochs || {}).map((scope) => [
              scope,
              store.get(["app", "reset-state", String(scope)]),
            ]);
            let current = null;
            const epochValues = {};
            let currentReady = false;
            let pendingEpochs = epochRequests.length;
            let epochsReady = pendingEpochs === 0;
            const evaluate = () => {
              if (!currentReady || !epochsReady) return;
              for (const [scope, expected] of Object.entries(epochs || {})) {
                if (epochValues[scope] !== expected) {
                  outcome = {
                    ok: false,
                    status: "conflict",
                    reset: true,
                    reason: "This work was cleared elsewhere. Copy it before leaving.",
                    current: null,
                  };
                  return;
                }
              }
              const currentValidation = current
                ? validateRecord(current, { allowFuture: true })
                : { ok: true, future: false };
              if (!currentValidation.ok) {
                outcome = {
                  ok: false,
                  status: "failed",
                  error: currentValidation.reason,
                };
                return;
              }
              if (currentValidation.future) {
                outcome = {
                  ok: false,
                  status: "conflict",
                  reason: "A newer record schema is already stored.",
                  current: clone(current),
                };
                return;
              }
              const currentRevision = current?.recordRevision || 0;
              if (expectedRevision !== null && expectedRevision !== currentRevision) {
                outcome = {
                  ok: false,
                  status: "conflict",
                  reason: "The saved record changed before this write.",
                  current: clone(current),
                };
                return;
              }
              const record = makeEnvelope({
                ...normalized,
                recordRevision: currentRevision + 1,
              });
              const valid = validateRecord(record);
              if (!valid.ok) {
                outcome = { ok: false, status: "failed", error: valid.reason };
                return;
              }
              store.put(record);
              outcome = { ok: true, status: "saved", record: clone(record) };
            };
            request.onsuccess = () => {
              current = request.result || null;
              currentReady = true;
              evaluate();
            };
            for (const [scope, epochRequest] of epochRequests) {
              epochRequest.onsuccess = () => {
                epochValues[scope] = resetEpoch(epochRequest.result);
                pendingEpochs -= 1;
                epochsReady = pendingEpochs === 0;
                evaluate();
              };
            }
            request.onerror = () =>
              reject(request.error || new Error("IndexedDB write read failed."));
            for (const [, epochRequest] of epochRequests)
              epochRequest.onerror = () =>
                reject(epochRequest.error || new Error("IndexedDB reset check failed."));
            transaction.oncomplete = () => {
              const result = outcome || {
                ok: false,
                status: "failed",
                error: "Write did not complete.",
              };
              if (result.ok) notifyRecord(normalized, result.record.recordRevision);
              resolve(result);
            };
            transaction.onerror = () =>
              reject(transaction.error || new Error("IndexedDB transaction failed."));
            transaction.onabort = () =>
              reject(transaction.error || new Error("IndexedDB transaction aborted."));
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        switchToFallback(error);
        return writeNow(normalized, { expectedRevision, expectedEpochs: epochs });
      }
    }

    refreshFallback();
    loadFallback();
    const current = fallbackRecords.get(key) || null;
    for (const [scope, expected] of Object.entries(epochs || {})) {
      const actual = resetEpoch(fallbackRecords.get(recordKey(resetRecordSpec(scope))));
      if (actual !== expected)
        return {
          ok: false,
          status: "conflict",
          reset: true,
          reason: "This work was cleared elsewhere. Copy it before leaving.",
          current: null,
        };
    }
    const currentValidation = current
      ? validateRecord(current, { allowFuture: true })
      : { ok: true, future: false };
    if (!currentValidation.ok)
      return { ok: false, status: "failed", error: currentValidation.reason };
    if (currentValidation.future)
      return {
        ok: false,
        status: "conflict",
        reason: "A newer record schema is already stored.",
        current: clone(current),
      };
    const currentRevision = current?.recordRevision || 0;
    if (expectedRevision !== null && expectedRevision !== currentRevision)
      return {
        ok: false,
        status: "conflict",
        reason: "The saved record changed before this write.",
        current: clone(current),
      };
    const record = makeEnvelope({ ...normalized, recordRevision: currentRevision + 1 });
    const valid = validateRecord(record);
    if (!valid.ok) return { ok: false, status: "failed", error: valid.reason };
    fallbackRecords.set(key, record);
    const persisted = saveFallback();
    if (!persisted) availability = "memory";
    notifyRecord(normalized, record.recordRevision);
    return { ok: true, status: "temporary", record: clone(record) };
  }

  function write(spec, options = {}) {
    const normalized = normalizeSpec(spec);
    const key = recordKey(normalized);
    const previous = queues.get(key) || Promise.resolve();
    const task = previous.catch(() => {}).then(() => writeNow(normalized, options));
    const queued = task.finally(() => {
      if (queues.get(key) === queued) queues.delete(key);
    });
    queues.set(key, queued);
    return task;
  }

  async function remove(spec) {
    const normalized = normalizeSpec(spec);
    await ready;
    if (database && mode !== "temporary") {
      try {
        return await new Promise((resolve, reject) => {
          let transaction;
          try {
            transaction = database.transaction(RECORD_STORE, "readwrite");
            transaction
              .objectStore(RECORD_STORE)
              .delete([normalized.namespace, normalized.kind, normalized.recordId]);
            transaction.oncomplete = () => {
              coordinator.notify({
                type: "record-removed",
                namespace: normalized.namespace,
                kind: normalized.kind,
                recordId: normalized.recordId,
              });
              resolve(true);
            };
            transaction.onerror = () =>
              reject(transaction.error || new Error("IndexedDB delete failed."));
            transaction.onabort = () =>
              reject(transaction.error || new Error("IndexedDB delete aborted."));
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        switchToFallback(error);
      }
    }
    refreshFallback();
    loadFallback();
    fallbackRecords.delete(recordKey(normalized));
    saveFallback();
    coordinator.notify({
      type: "record-removed",
      namespace: normalized.namespace,
      kind: normalized.kind,
      recordId: normalized.recordId,
    });
    return true;
  }

  async function commitImport({
    importId,
    records = [],
    removeRecords = [],
    source = "manual-import",
  } = {}) {
    if (!importId || !Array.isArray(records) || !Array.isArray(removeRecords))
      throw new TypeError("Invalid import request.");
    const marker = {
      namespace: "app",
      kind: "migration",
      recordId: String(importId),
      payload: {
        source,
        migrationId: String(importId),
        recordCount: records.length,
        import: true,
      },
    };
    const normalized = records.map((record) => normalizeSpec(record));
    const removals = removeRecords.map((record) => normalizeSpec(record));
    await ready;
    const existingMarker = await readRaw(marker);
    if (existingMarker && validateRecord(existingMarker).ok)
      return { ok: true, status: "skipped", marker: existingMarker, records: [] };

    if (database && mode !== "temporary") {
      try {
        return await new Promise((resolve, reject) => {
          let transaction;
          let outcome = null;
          try {
            transaction = database.transaction(RECORD_STORE, "readwrite");
            const store = transaction.objectStore(RECORD_STORE);
            const markerRequest = store.get(["app", "migration", String(importId)]);
            const checks = [
              ...removals.map((spec) => ({ type: "remove", spec })),
              ...normalized.map((spec) => ({ type: "write", spec })),
            ];
            const removalKeys = new Set(removals.map((spec) => recordKey(spec)));
            let pending = checks.length + 1;
            let markerSeen = false;
            let blocked = false;
            const written = [];
            const finish = () => {
              if (!markerSeen || pending !== 0 || blocked) return;
              const markerRecord = makeEnvelope(marker);
              store.put(markerRecord);
              written.push(markerRecord);
              outcome = { ok: true, status: "saved", records: written };
            };
            markerRequest.onsuccess = () => {
              markerSeen = true;
              pending -= 1;
              if (markerRequest.result) {
                blocked = true;
                outcome = {
                  ok: true,
                  status: "skipped",
                  marker: markerRequest.result,
                  records: [],
                };
                transaction.abort();
                return;
              }
              finish();
            };
            markerRequest.onerror = () =>
              reject(markerRequest.error || new Error("Import marker read failed."));
            for (const check of checks) {
              const request = store.get([
                check.spec.namespace,
                check.spec.kind,
                check.spec.recordId,
              ]);
              request.onsuccess = () => {
                const current = request.result || null;
                if (check.type === "remove") {
                  if (current)
                    store.delete([
                      check.spec.namespace,
                      check.spec.kind,
                      check.spec.recordId,
                    ]);
                } else if (check.type === "write") {
                  if (current && !removalKeys.has(recordKey(check.spec))) {
                    blocked = true;
                    outcome = {
                      ok: false,
                      status: "conflict",
                      error: "A record changed before import.",
                    };
                    transaction.abort();
                  } else {
                    const record = makeEnvelope({
                      ...check.spec,
                      recordRevision: 1,
                      updatedAt: check.spec.updatedAt || undefined,
                    });
                    const valid = validateRecord(record);
                    if (!valid.ok) {
                      blocked = true;
                      outcome = { ok: false, status: "failed", error: valid.reason };
                      transaction.abort();
                    } else {
                      store.put(record);
                      written.push(record);
                    }
                  }
                }
                pending -= 1;
                finish();
              };
              request.onerror = () =>
                reject(request.error || new Error("Import record check failed."));
            }
            transaction.oncomplete = () => {
              const result = outcome || {
                ok: false,
                status: "failed",
                error: "Import did not complete.",
              };
              if (result.ok && result.status === "saved")
                for (const record of written) notifyRecord(record, record.recordRevision);
              resolve(result);
            };
            transaction.onerror = () =>
              reject(transaction.error || new Error("Import transaction failed."));
            transaction.onabort = () => {
              if (outcome?.status === "skipped") resolve(outcome);
              else
                resolve(
                  outcome || {
                    ok: false,
                    status: "failed",
                    error: "Import transaction was rolled back.",
                  },
                );
            };
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        switchToFallback(error);
        return commitImport({ importId, records, removeRecords, source });
      }
    }

    refreshFallback();
    loadFallback();
    const snapshot = new Map(fallbackRecords);
    const markerKey = recordKey(marker);
    if (fallbackRecords.has(markerKey))
      return { ok: true, status: "skipped", records: [] };
    for (const removal of removals) fallbackRecords.delete(recordKey(removal));
    const written = [];
    for (const spec of normalized) {
      const key = recordKey(spec);
      if (fallbackRecords.has(key)) {
        fallbackRecords.clear();
        for (const [savedKey, savedRecord] of snapshot)
          fallbackRecords.set(savedKey, savedRecord);
        return {
          ok: false,
          status: "conflict",
          error: "A record changed before import.",
        };
      }
      const record = makeEnvelope({
        ...spec,
        recordRevision: 1,
        updatedAt: spec.updatedAt || undefined,
      });
      const valid = validateRecord(record);
      if (!valid.ok) {
        fallbackRecords.clear();
        for (const [savedKey, savedRecord] of snapshot)
          fallbackRecords.set(savedKey, savedRecord);
        return { ok: false, status: "failed", error: valid.reason };
      }
      fallbackRecords.set(key, record);
      written.push(record);
    }
    fallbackRecords.set(markerKey, makeEnvelope(marker));
    const persisted = saveFallback();
    if (!persisted && isStorage(fallbackStorage)) {
      availability = "memory";
      fallbackRecords.clear();
      for (const [savedKey, savedRecord] of snapshot)
        fallbackRecords.set(savedKey, savedRecord);
      return {
        ok: false,
        status: "failed",
        error: "The browser rejected the import; existing work was left unchanged.",
      };
    }
    for (const record of written) notifyRecord(record, record.recordRevision);
    return { ok: true, status: persisted ? "temporary" : "memory", records: written };
  }

  async function commitMigration({ migrationId, records, source = "legacy" }) {
    if (!migrationId || !Array.isArray(records))
      throw new TypeError("Invalid migration request.");
    const marker = {
      namespace: "app",
      kind: "migration",
      recordId: String(migrationId),
      payload: { source, migrationId: String(migrationId), recordCount: records.length },
    };
    await ready;
    const existingMarker = await readRaw(marker);
    if (existingMarker && validateRecord(existingMarker).ok)
      return { ok: true, status: "skipped", marker: existingMarker };

    const normalized = records.map((record) => normalizeSpec(record));
    if (database && mode !== "temporary") {
      try {
        return await new Promise((resolve, reject) => {
          let transaction;
          const written = [];
          try {
            transaction = database.transaction(RECORD_STORE, "readwrite");
            const store = transaction.objectStore(RECORD_STORE);
            const markerRequest = store.get(["app", "migration", String(migrationId)]);
            let markerSeen = false;
            let pending = normalized.length;
            const finishIfReady = () => {
              if (markerSeen && pending === 0) {
                const markerRecord = makeEnvelope(marker);
                store.put(markerRecord);
                written.push(markerRecord);
                pending = -1;
              }
            };
            markerRequest.onsuccess = () => {
              if (markerRequest.result) {
                markerSeen = true;
                pending = -1;
                return;
              }
              markerSeen = true;
              for (const spec of normalized) {
                const request = store.get([spec.namespace, spec.kind, spec.recordId]);
                request.onsuccess = () => {
                  if (!request.result) {
                    const record = makeEnvelope({ ...spec, recordRevision: 1 });
                    store.put(record);
                    written.push(record);
                  }
                  pending -= 1;
                  finishIfReady();
                };
              }
              finishIfReady();
            };
            transaction.oncomplete = () => {
              for (const record of written) notifyRecord(record, record.recordRevision);
              resolve({ ok: true, status: "saved", records: written });
            };
            transaction.onerror = () =>
              reject(transaction.error || new Error("Migration transaction failed."));
            transaction.onabort = () =>
              reject(transaction.error || new Error("Migration transaction aborted."));
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        switchToFallback(error);
        return commitMigration({ migrationId, records, source });
      }
    }

    refreshFallback();
    loadFallback();
    const markerKey = recordKey(marker);
    if (fallbackRecords.has(markerKey)) return { ok: true, status: "skipped" };
    const written = [];
    for (const spec of normalized) {
      const key = recordKey(spec);
      if (fallbackRecords.has(key)) continue;
      const record = makeEnvelope({ ...spec, recordRevision: 1 });
      fallbackRecords.set(key, record);
      written.push(record);
    }
    fallbackRecords.set(markerKey, makeEnvelope(marker));
    if (!saveFallback()) availability = "memory";
    for (const record of written) notifyRecord(record, record.recordRevision);
    return { ok: true, status: "temporary", records: written };
  }

  async function clearScope(scope = "all") {
    const normalizedScope = String(scope);
    await ready;
    if (database && mode !== "temporary") {
      try {
        return await new Promise((resolve, reject) => {
          let transaction;
          let records = [];
          let reset = null;
          let outcome = null;
          try {
            transaction = database.transaction(RECORD_STORE, "readwrite");
            const store = transaction.objectStore(RECORD_STORE);
            const allRequest = store.getAll();
            const resetRequest = store.get(["app", "reset-state", normalizedScope]);
            let allReady = false;
            let resetReady = false;
            const remove = () => {
              if (!allReady || !resetReady) return;
              const removed = records.filter((record) =>
                scopeMatches(record, normalizedScope),
              );
              for (const record of removed)
                store.delete([record.namespace, record.kind, record.recordId]);
              const resetRecord = makeEnvelope({
                ...resetRecordSpec(normalizedScope),
                recordRevision: resetEpoch(reset) + 1,
                payload: { epoch: resetEpoch(reset) + 1, scope: normalizedScope },
              });
              store.put(resetRecord);
              outcome = {
                ok: true,
                status: "saved",
                scope: normalizedScope,
                epoch: resetRecord.payload.epoch,
                removed: removed.length,
              };
            };
            allRequest.onsuccess = () => {
              records = allRequest.result || [];
              allReady = true;
              remove();
            };
            resetRequest.onsuccess = () => {
              reset = resetRequest.result || null;
              resetReady = true;
              remove();
            };
            allRequest.onerror = () =>
              reject(allRequest.error || new Error("Storage cleanup failed."));
            resetRequest.onerror = () =>
              reject(resetRequest.error || new Error("Reset state could not be read."));
            transaction.oncomplete = () => {
              notifyReset(normalizedScope, outcome.epoch);
              resolve(outcome);
            };
            transaction.onerror = () =>
              reject(transaction.error || new Error("Storage cleanup failed."));
            transaction.onabort = () =>
              reject(transaction.error || new Error("Storage cleanup was aborted."));
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        switchToFallback(error);
      }
    }

    refreshFallback();
    loadFallback();
    const removed = [];
    for (const [key, record] of fallbackRecords) {
      if (scopeMatches(record, normalizedScope)) {
        fallbackRecords.delete(key);
        removed.push(record);
      }
    }
    const resetKey = recordKey(resetRecordSpec(normalizedScope));
    const current = fallbackRecords.get(resetKey) || null;
    const epoch = resetEpoch(current) + 1;
    fallbackRecords.set(
      resetKey,
      makeEnvelope({
        ...resetRecordSpec(normalizedScope),
        recordRevision: (current?.recordRevision || 0) + 1,
        payload: { epoch, scope: normalizedScope },
      }),
    );
    const persisted = saveFallback();
    if (!persisted) availability = "memory";
    notifyReset(normalizedScope, epoch);
    if (!persisted && isStorage(fallbackStorage))
      return {
        ok: false,
        status: "failed",
        error: "The browser rejected the cleanup write.",
        memoryOnly: true,
        scope: normalizedScope,
        epoch,
        removed: removed.length,
      };
    return {
      ok: true,
      status: "temporary",
      scope: normalizedScope,
      epoch,
      removed: removed.length,
    };
  }

  async function createConflictCopy({
    spec,
    payload,
    current = null,
    baseRevision = 0,
    reason = "The saved record changed in another tab.",
  }) {
    const conflictSpec = {
      namespace: spec.namespace,
      kind: "conflict-copy",
      recordId: randomRecordId("conflict"),
      courseId: spec.courseId,
      contentIdentity: spec.contentIdentity,
      payload: {
        original: {
          namespace: spec.namespace,
          kind: spec.kind,
          recordId: spec.recordId,
          recordRevision: baseRevision,
        },
        competingPayload: clone(payload),
        savedRecord: current ? clone(current) : null,
        reason,
        createdAt: currentTime(),
      },
    };
    const result = await write(conflictSpec, { expectedRevision: 0 });
    if (result.ok) return { ok: true, record: result.record, status: result.status };
    return {
      ok: false,
      status: result.status,
      error: result.error || result.reason,
      record: makeEnvelope({ ...conflictSpec, recordRevision: 1 }),
      memoryOnly: true,
    };
  }

  async function getResetEpoch(scope = "all") {
    const record = await read({
      namespace: "app",
      kind: "reset-state",
      recordId: String(scope),
    });
    return Number.isInteger(record?.payload?.epoch) ? record.payload.epoch : 0;
  }

  async function bumpResetEpoch(scope = "all") {
    const recordId = String(scope);
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const current = await read({ namespace: "app", kind: "reset-state", recordId });
      const result = await write(
        {
          namespace: "app",
          kind: "reset-state",
          recordId,
          payload: { epoch: (current?.payload?.epoch || 0) + 1, scope: recordId },
        },
        { expectedRevision: current?.recordRevision || 0 },
      );
      if (result.ok) return result;
      if (result.status !== "conflict") return result;
    }
    return { ok: false, status: "conflict", error: "Reset changed in another tab." };
  }

  function createRecordWriter(spec) {
    const normalized = normalizeSpec(spec);
    const resetScopes = [
      ...(Array.isArray(spec.resetScopes)
        ? spec.resetScopes
        : [spec.resetScopes || spec.resetScope || normalized.namespace]),
      "all",
    ].filter((scope, index, scopes) => scopes.indexOf(scope) === index);
    let current = null;
    let baseEpochs = {};
    let pendingPayload = NO_VALUE;
    let pendingSequence = 0;
    let processing = null;
    let state = "clean";
    let lastResult = null;
    let remoteRecord = null;
    let localConflictPayload = NO_VALUE;
    let conflictCopy = null;
    let resetConflict = false;

    const load = Promise.all([
      read(normalized),
      Promise.all(resetScopes.map((scope) => getResetEpoch(scope))),
    ]).then(([record, epochs]) => {
      current = record;
      baseEpochs = Object.fromEntries(
        resetScopes.map((scope, index) => [scope, epochs[index]]),
      );
      return record;
    });

    const unsubscribe = coordinator.subscribe((message) => {
      if (message.sourceId === coordinator.tabId) return;
      if (message.type === "refresh") {
        Promise.all([
          read(normalized),
          Promise.all(resetScopes.map((scope) => getResetEpoch(scope))),
        ]).then(([record, epochs]) => {
          const latestEpochs = Object.fromEntries(
            resetScopes.map((scope, index) => [scope, epochs[index]]),
          );
          if (resetScopes.some((scope) => latestEpochs[scope] !== baseEpochs[scope])) {
            resetConflict = true;
            state = "conflict";
          } else if (record && record.recordRevision > (current?.recordRevision || 0)) {
            remoteRecord = record;
            state = "conflict";
          }
        });
        return;
      }
      if (message.type === "reset" && resetScopes.includes(String(message.resetScope))) {
        resetConflict = true;
        state = "conflict";
        return;
      }
      if (
        message.type === "record" &&
        message.namespace === normalized.namespace &&
        message.kind === normalized.kind &&
        message.recordId === normalized.recordId &&
        message.revision > (current?.recordRevision || 0)
      ) {
        read(normalized).then((record) => {
          if (record && record.recordRevision > (current?.recordRevision || 0)) {
            remoteRecord = record;
            state = "conflict";
          }
        });
      }
    });

    async function preserveConflict(payload, result) {
      if (result.reset) {
        resetConflict = true;
        localConflictPayload = clone(payload);
        return {
          ...result,
          current: null,
          localPayload: clone(payload),
        };
      }
      remoteRecord = result.current || remoteRecord || (await read(normalized));
      localConflictPayload = clone(payload);
      if (conflictCopy)
        return {
          ...result,
          status: "conflict",
          current: remoteRecord,
          conflictCopy: clone(conflictCopy),
          localPayload: clone(payload),
        };
      const copy = await createConflictCopy({
        spec: normalized,
        payload,
        current: remoteRecord,
        baseRevision: current?.recordRevision || 0,
        reason: result.reason || "The saved record changed in another tab.",
      });
      conflictCopy = copy.record;
      return {
        ...result,
        status: "conflict",
        current: remoteRecord,
        conflictCopy: clone(conflictCopy),
        memoryOnly: copy.memoryOnly,
        localPayload: clone(payload),
      };
    }

    async function drain() {
      await load;
      while (pendingPayload !== NO_VALUE) {
        const payload = pendingPayload;
        const sequence = pendingSequence;
        pendingPayload = NO_VALUE;
        if (resetConflict || remoteRecord) {
          lastResult = await preserveConflict(payload, {
            ok: false,
            status: "conflict",
            reset: resetConflict,
            reason: resetConflict
              ? "This work was cleared elsewhere. Copy it before leaving."
              : "The saved record changed in another tab.",
            current: remoteRecord,
          });
          state = "conflict";
          return lastResult;
        }
        const result = await write(
          { ...normalized, payload },
          { expectedRevision: current?.recordRevision || 0, expectedEpochs: baseEpochs },
        );
        lastResult = result;
        if (!result.ok) {
          if (result.status === "conflict") {
            lastResult = await preserveConflict(payload, result);
            state = "conflict";
          } else state = "failed";
          return lastResult;
        }
        current = result.record;
        state =
          pendingSequence > sequence
            ? "pending"
            : result.status === "temporary"
              ? "temporary"
              : "saved";
      }
      return lastResult || { ok: true, status: state, record: current };
    }

    function save(payload) {
      if (state === "conflict" && pendingPayload === NO_VALUE)
        return preserveConflict(payload, {
          ok: false,
          status: "conflict",
          reset: resetConflict,
          reason: resetConflict
            ? "This work was cleared elsewhere. Copy it before leaving."
            : "The saved record changed in another tab.",
          current: remoteRecord,
        }).then((result) => {
          lastResult = result;
          return result;
        });
      pendingPayload = clone(payload);
      pendingSequence += 1;
      state = "pending";
      processing ||= drain().finally(() => {
        processing = null;
        if (pendingPayload !== NO_VALUE) processing = drain();
      });
      return processing;
    }

    async function resolveSaved() {
      if (!remoteRecord) return null;
      current = remoteRecord;
      remoteRecord = null;
      localConflictPayload = NO_VALUE;
      conflictCopy = null;
      resetConflict = false;
      baseEpochs = Object.fromEntries(
        await Promise.all(
          resetScopes.map(async (scope) => [scope, await getResetEpoch(scope)]),
        ),
      );
      state = "saved";
      lastResult = { ok: true, status: "saved", record: clone(current) };
      return clone(current.payload);
    }

    return {
      ready: load,
      load,
      save,
      flush: () => processing || load.then(() => lastResult),
      remove: async () => {
        const result = await remove(normalized);
        unsubscribe();
        return result;
      },
      get record() {
        return current && clone(current);
      },
      get revision() {
        return current?.recordRevision || 0;
      },
      get state() {
        return state;
      },
      get lastResult() {
        return lastResult;
      },
      get conflict() {
        return {
          remoteRecord: remoteRecord && clone(remoteRecord),
          localPayload:
            localConflictPayload === NO_VALUE ? null : clone(localConflictPayload),
          conflictCopy: conflictCopy && clone(conflictCopy),
          reset: resetConflict,
        };
      },
      resolveSaved,
    };
  }

  return {
    ready,
    read,
    readRaw,
    list,
    write,
    remove,
    commitImport,
    commitMigration,
    clearScope,
    createConflictCopy,
    getResetEpoch,
    bumpResetEpoch,
    createRecordWriter,
    subscribe: coordinator.subscribe,
    setMode(nextMode) {
      if (!["persistent", "temporary"].includes(nextMode)) return mode;
      mode = nextMode;
      try {
        if (isStorage(fallbackStorage)) {
          if (mode === "temporary") fallbackStorage.setItem(modeKey, mode);
          else fallbackStorage.removeItem(modeKey);
        }
      } catch (error) {
        initError = error;
      }
      if (mode === "temporary") {
        fallbackRecords.clear();
        fallbackLoaded = false;
        loadFallback();
        setFallbackAvailability();
      } else {
        fallbackRecords.clear();
        fallbackLoaded = false;
        if (database) availability = "persistent";
        else {
          loadFallback();
          setFallbackAvailability();
        }
      }
      coordinator.notify({ type: "mode", mode });
      return mode;
    },
    get storageMode() {
      return mode;
    },
    get usesBroadcastChannel() {
      return coordinator.usesBroadcastChannel;
    },
    close() {
      coordinator.close();
    },
    get availability() {
      return availability;
    },
    get databaseName() {
      return databaseName;
    },
    get deploymentScope() {
      return deploymentScope;
    },
    get error() {
      return initError;
    },
  };
}

export function migrationIdentity(legacyKey, contentIdentity, payload) {
  const text = JSON.stringify([legacyKey, contentIdentity || "", payload]);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `legacy-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export { courseNamespace, idFor };

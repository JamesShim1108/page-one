import {
  courseNamespace,
  createLocalAdapter,
  migrationIdentity,
} from "../storage/adapter.js";

const storageKey = "page-one-attempts-v1";

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

function readLegacy(getStorage) {
  const storage = safeStorage(getStorage);
  if (!storage) return null;
  try {
    const parsed = JSON.parse(storage.getItem(storageKey) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function attemptIdentity(attempt, fallback = "") {
  return String(attempt?.attemptId || fallback || attempt?.quizId || "");
}

function namespaceFor(attempt) {
  return courseNamespace(attempt.courseId, attempt.attemptId || attempt.quizId);
}

function activityStatus(attempt) {
  if (attempt?.status) return attempt.status;
  return attempt?.complete ? "complete" : "active";
}

function timeValue(attempt) {
  const value = attempt?.completedAt || attempt?.startedAt || attempt?.abandonedAt;
  const parsed = value ? Date.parse(value) : NaN;
  return Number.isFinite(parsed) ? parsed : 0;
}

function isAttemptFor(attempt, quizId) {
  return attempt?.quizId === quizId || attempt?.activityId === quizId;
}

function isQuick(attempt) {
  return attempt?.activityKind === "quick-check" || attempt?.mode === "quick";
}

function snapshotQuestions(attempt) {
  return Object.fromEntries(
    (attempt?.questionSnapshot?.questions || []).map((question) => [
      question.id,
      question,
    ]),
  );
}

function selectedIndex(response) {
  return Number.isInteger(response?.selectedChoiceIndex)
    ? response.selectedChoiceIndex
    : Number.isInteger(response?.selected)
      ? response.selected
      : null;
}

function summaryFor(attempt) {
  const ids = attempt?.orderedQuestionIds || attempt?.ids || [];
  const questions = snapshotQuestions(attempt);
  const scoreKnown = ids.every(
    (id) =>
      Number.isInteger(questions[id]?.correctAnswer) ||
      typeof questions[id]?.correctChoiceId === "string",
  );
  let answered = 0;
  let correct = 0;
  for (const id of ids) {
    const response =
      attempt.responses?.[id] ||
      (Object.hasOwn(attempt.answers || {}, id)
        ? { selectedChoiceIndex: attempt.answers[id] }
        : null);
    const selected = selectedIndex(response);
    if (!Number.isInteger(selected)) continue;
    answered += 1;
    if (selected === questions[id]?.correctAnswer) correct += 1;
  }
  return {
    attemptId: attemptIdentity(attempt),
    courseId: attempt.courseId || "",
    quizId: attempt.quizId || attempt.activityId || "",
    activityId: attempt.activityId || attempt.quizId || "",
    activityKind: attempt.activityKind || "quiz",
    activityTitle: attempt.activityTitle || attempt.quizTitle || "",
    feedbackMode: attempt.feedbackMode || "practice",
    selectionKind:
      attempt.selectionKind || (attempt.mode === "weak" ? "review" : "topic"),
    status: activityStatus(attempt),
    questionCount: ids.length,
    answered,
    unanswered: Math.max(0, ids.length - answered),
    scoreKnown,
    correct: scoreKnown ? correct : null,
    incorrect: scoreKnown ? Math.max(0, answered - correct) : null,
    flagged: Object.values(attempt.flags || {}).filter(Boolean).length,
    uncertain: Object.values(attempt.confidence || {}).filter(Boolean).length,
    startedAt: attempt.startedAt ?? null,
    completedAt: attempt.completedAt ?? null,
    abandonedAt: attempt.abandonedAt ?? null,
    contentRevision: attempt.contentRevision || "unknown",
    provenance: clone(attempt.provenance || { kind: "legacy" }),
  };
}

/**
 * The synchronous legacy API remains available for pure/unit callers. When an
 * adapter is supplied, `ready` hydrates unique v2 records and `save` returns
 * the acknowledged durable write.
 */
export function createAttemptStore(
  getStorageOrOptions = () => sessionStorage,
  maybeOptions = {},
) {
  const options =
    typeof getStorageOrOptions === "function"
      ? { getStorage: getStorageOrOptions, ...maybeOptions }
      : { ...(getStorageOrOptions || {}) };
  const getStorage = options.getStorage || (() => sessionStorage);
  const adapter =
    options.adapter ||
    (options.usePersistentStorage ? createLocalAdapter(options) : null);
  let attempts = {};
  let storageOK = true;
  let storageState = adapter ? "pending" : "temporary";
  const revisions = new Map();
  const writers = new Map();
  const summaries = {};
  const summaryWriters = new Map();

  function loadLegacyIntoMemory() {
    const saved = readLegacy(getStorage);
    if (saved) attempts = saved;
  }

  async function migrateLegacy() {
    const legacy = readLegacy(getStorage);
    if (!legacy || !adapter) return;
    const records = Object.entries(legacy)
      .filter(
        ([, attempt]) =>
          attempt && typeof attempt === "object" && !Array.isArray(attempt),
      )
      .map(([quizId, attempt]) => {
        const normalized = {
          ...attempt,
          quizId: attempt.quizId || quizId,
          migrationSource: storageKey,
        };
        return {
          namespace: namespaceFor(normalized),
          kind: "attempt",
          recordId: attemptIdentity(normalized, quizId),
          courseId: normalized.courseId || String(normalized.quizId).split("-")[0],
          contentIdentity: normalized.contentRevision || normalized.quizId,
          payload: normalized,
        };
      });
    if (!records.length) return;
    await adapter.commitMigration({
      migrationId: migrationIdentity(storageKey, "attempts-v1", legacy),
      source: storageKey,
      records,
    });
  }

  if (!adapter) loadLegacyIntoMemory();
  const ready = adapter
    ? adapter.ready
        .then(migrateLegacy)
        .then(async () => {
          const [records, summaryRecords] = await Promise.all([
            adapter.list({ kind: "attempt" }),
            adapter.list({ kind: "attempt-summary" }),
          ]);
          attempts = {};
          for (const record of summaryRecords) {
            if (record.payload && typeof record.payload === "object")
              summaries[record.recordId] = record.payload;
          }
          for (const record of records) {
            const attempt = record.payload;
            const id = attemptIdentity(attempt, record.recordId);
            if (attempt && typeof attempt === "object" && id) {
              attempts[id] = attempt;
              summaries[id] ||= summaryFor(attempt);
              revisions.set(id, record.recordRevision);
            }
          }
          storageState = adapter.availability === "persistent" ? "clean" : "temporary";
          storageOK = ["persistent", "temporary", "session", "memory"].includes(
            adapter.availability,
          );
        })
        .catch(() => {
          storageState = "failed";
          storageOK = false;
        })
    : Promise.resolve();

  function writerFor(attempt, id = attemptIdentity(attempt)) {
    if (!adapter || !id) return null;
    if (!writers.has(id)) {
      writers.set(
        id,
        adapter.createRecordWriter({
          namespace: namespaceFor({ ...attempt, attemptId: id }),
          kind: "attempt",
          recordId: id,
          resetScopes: [
            `attempt:${id}`,
            namespaceFor({ ...attempt, attemptId: id }),
            "all",
          ],
          courseId: attempt.courseId || String(attempt.quizId || id).split("-")[0],
          contentIdentity: attempt.contentRevision || attempt.quizId || id,
        }),
      );
    }
    return writers.get(id);
  }

  function summaryWriterFor(attempt, id = attemptIdentity(attempt)) {
    if (!adapter || !id) return null;
    if (!summaryWriters.has(id)) {
      summaryWriters.set(
        id,
        adapter.createRecordWriter({
          namespace: namespaceFor({ ...attempt, attemptId: id }),
          kind: "attempt-summary",
          recordId: id,
          resetScopes: [
            `attempt:${id}`,
            namespaceFor({ ...attempt, attemptId: id }),
            "all",
          ],
          courseId: attempt.courseId || String(attempt.quizId || id).split("-")[0],
          contentIdentity: attempt.contentRevision || attempt.quizId || id,
        }),
      );
    }
    return summaryWriters.get(id);
  }

  function save(attempt) {
    const id = attemptIdentity(attempt);
    if (!id) return false;
    attempts[id] = attempt;
    summaries[id] = summaryFor(attempt);
    if (!adapter) {
      try {
        safeStorage(getStorage)?.setItem(storageKey, JSON.stringify(attempts));
        storageOK = true;
      } catch {
        storageOK = false;
      }
      return storageOK;
    }
    const writer = writerFor(attempt, id);
    storageState = "pending";
    if (!writer) return ready.then(() => save(attempt));
    return writer.save(attempt).then(async (result) => {
      if (result.ok) {
        revisions.set(id, result.record.recordRevision);
        storageState = result.status === "temporary" ? "temporary" : "saved";
        storageOK = true;
        const summaryWriter = summaryWriterFor(attempt, id);
        const summaryResult = summaryWriter
          ? await summaryWriter.save(summaries[id])
          : { ok: true, status: result.status };
        result.summary = summaryResult;
        if (!summaryResult.ok) {
          result.ok = false;
          result.status = summaryResult.status || "failed";
          storageState = result.status;
          storageOK = false;
        }
      } else {
        storageState = result.status;
        storageOK = false;
      }
      return result;
    });
  }

  function allForQuiz(quizId) {
    return Object.values(attempts)
      .filter((attempt) => isAttemptFor(attempt, quizId))
      .sort((left, right) => timeValue(right) - timeValue(left));
  }

  function migrateForEngine(candidate, engine) {
    if (!candidate || candidate.version !== 1 || !engine?.migrateAttempt)
      return candidate;
    const migrated = engine.migrateAttempt(candidate, {
      attemptId: candidate.attemptId || `legacy-${candidate.quizId}`,
    });
    if (!migrated) return null;
    const oldId = attemptIdentity(candidate);
    const newId = attemptIdentity(migrated);
    if (oldId && oldId !== newId) delete attempts[oldId];
    if (oldId && oldId !== newId) delete summaries[oldId];
    attempts[newId] = migrated;
    const result = save(migrated);
    if (result?.then) {
      result
        .then((written) => {
          if (written?.ok && oldId && oldId !== newId && adapter)
            Promise.all([
              adapter.remove({
                namespace: namespaceFor({ ...candidate, attemptId: oldId }),
                kind: "attempt",
                recordId: oldId,
              }),
              adapter.remove({
                namespace: namespaceFor({ ...candidate, attemptId: oldId }),
                kind: "attempt-summary",
                recordId: oldId,
              }),
            ]);
        })
        .catch(() => {});
    }
    return migrated;
  }

  function selectCandidate(quizId, attemptId) {
    if (attemptId)
      return attempts[attemptId] && isAttemptFor(attempts[attemptId], quizId)
        ? attempts[attemptId]
        : null;
    const candidates = allForQuiz(quizId);
    return (
      candidates.find((attempt) => activityStatus(attempt) === "active") ||
      candidates.find((attempt) => activityStatus(attempt) === "complete") ||
      candidates.find((attempt) => activityStatus(attempt) === "abandoned") ||
      null
    );
  }

  function get(quizId, engine, { attemptId = null } = {}) {
    const candidate = selectCandidate(quizId, attemptId);
    if (!candidate) return null;
    const migrated = migrateForEngine(candidate, engine);
    if (!migrated) return null;
    if (engine?.validateAttempt && !engine.validateAttempt(migrated)) return null;
    return migrated;
  }

  function peek(quizId, { attemptId = null } = {}) {
    return selectCandidate(quizId, attemptId);
  }

  function list({ courseId, quizId, status } = {}) {
    return Object.values(attempts)
      .filter((attempt) => !courseId || attempt.courseId === courseId)
      .filter((attempt) => !quizId || isAttemptFor(attempt, quizId))
      .filter((attempt) => !status || activityStatus(attempt) === status)
      .sort((left, right) => timeValue(right) - timeValue(left))
      .map(clone);
  }

  function listSummaries({ courseId, quizId, status } = {}) {
    const indexed = { ...summaries };
    for (const attempt of Object.values(attempts)) {
      const id = attemptIdentity(attempt);
      if (id && !indexed[id]) indexed[id] = summaryFor(attempt);
    }
    return Object.values(indexed)
      .filter((summary) => !courseId || summary.courseId === courseId)
      .filter((summary) => !quizId || summary.quizId === quizId)
      .filter((summary) => !status || summary.status === status)
      .sort((left, right) => timeValue(right) - timeValue(left))
      .map(clone);
  }

  async function remove(attemptId) {
    const attempt = attempts[attemptId];
    if (!attempt) return { ok: false, status: "missing" };
    const summary = summaries[attemptId];
    if (!adapter) {
      try {
        const next = { ...attempts };
        delete next[attemptId];
        safeStorage(getStorage)?.setItem(storageKey, JSON.stringify(next));
        attempts = next;
        delete summaries[attemptId];
        writers.delete(attemptId);
        summaryWriters.delete(attemptId);
        return { ok: true, status: "temporary" };
      } catch {
        return { ok: false, status: "failed", error: "The browser rejected the delete." };
      }
    }
    const namespace = namespaceFor({ ...attempt, attemptId });
    const [recordRemoved, summaryRemoved] = await Promise.all([
      adapter.remove({ namespace, kind: "attempt", recordId: attemptId }),
      adapter.remove({ namespace, kind: "attempt-summary", recordId: attemptId }),
    ]);
    if (!recordRemoved || !summaryRemoved) {
      attempts[attemptId] = attempt;
      if (summary) summaries[attemptId] = summary;
      return { ok: false, status: "failed", error: "The attempt could not be removed." };
    }
    delete attempts[attemptId];
    delete summaries[attemptId];
    writers.delete(attemptId);
    summaryWriters.delete(attemptId);
    return { ok: true, status: "saved" };
  }

  function getByAttemptId(attemptId, engine) {
    const attempt = attempts[attemptId];
    if (!attempt) return null;
    const migrated = migrateForEngine(attempt, engine);
    if (!migrated || (engine?.validateAttempt && !engine.validateAttempt(migrated)))
      return null;
    return migrated;
  }

  function mostRecentActive({ quizId, courseId } = {}) {
    return (
      list({ quizId, courseId, status: "active" }).find((attempt) => !isQuick(attempt)) ||
      null
    );
  }

  function resume() {
    return (
      Object.values(attempts)
        .filter((attempt) => activityStatus(attempt) === "active" && !isQuick(attempt))
        .sort((left, right) => timeValue(right) - timeValue(left))[0] || null
    );
  }

  function conflictFor(idOrQuizId) {
    const attempt = attempts[idOrQuizId] || allForQuiz(idOrQuizId)[0];
    const id = attemptIdentity(attempt, idOrQuizId);
    return writers.get(id)?.conflict || null;
  }

  async function resolveConflict(idOrQuizId) {
    const attempt = attempts[idOrQuizId] || allForQuiz(idOrQuizId)[0];
    const id = attemptIdentity(attempt, idOrQuizId);
    const writer = writers.get(id);
    const payload = await writer?.resolveSaved();
    if (!payload) return false;
    attempts[id] = payload;
    summaries[id] = summaryFor(payload);
    const summaryWriter = summaryWriterFor(payload, id);
    if (summaryWriter) await summaryWriter.save(summaries[id]);
    storageState = "saved";
    storageOK = true;
    return true;
  }

  return {
    ready,
    get,
    getByAttemptId,
    peek,
    list,
    listSummaries,
    remove,
    mostRecentActive,
    save,
    resume,
    conflictFor,
    resolveConflict,
    get storageOK() {
      return storageOK;
    },
    get storageState() {
      for (const writer of writers.values())
        if (writer.state === "conflict") return "conflict";
      return storageState;
    },
    get revisions() {
      return new Map(revisions);
    },
  };
}

import { validateRecord } from "../storage/adapter.js";

export const BACKUP_FORMAT = "page-one-study-data";
export const BACKUP_FORMAT_VERSION = 1;
export const MAX_IMPORT_BYTES = 10 * 1024 * 1024;
export const MAX_IMPORT_RECORDS = 10_000;
export const MAX_IMPORT_DEPTH = 20;

export const BACKUP_CATEGORIES = Object.freeze([
  "attempts",
  "writing",
  "checkpoints",
  "terms",
  "reading",
  "preferences",
]);

export const CATEGORY_LABELS = Object.freeze({
  attempts: "Practice attempts and history",
  writing: "Writing drafts and recovery copies",
  checkpoints: "Earlier writing checkpoints",
  terms: "Terms progress and notes",
  reading: "Reading marks and positions",
  preferences: "Reading preferences",
});

const CATEGORY_KINDS = Object.freeze({
  attempts: ["attempt", "attempt-summary", "attempt-annotation"],
  writing: ["writing-draft", "writing-recovery"],
  checkpoints: ["draft-checkpoint"],
  terms: ["terms-progress", "terms-note"],
  reading: ["reading-mark", "reading-position"],
  preferences: ["preferences"],
});

const SUPPORTED_KINDS = new Set(Object.values(CATEGORY_KINDS).flat());
const DANGEROUS_KEYS = new Set(["__proto__", "prototype", "constructor"]);
const MAX_STRING_LENGTH = 1_000_000;

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isPlainObject(value) {
  if (!isObject(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function byteLength(text) {
  if (typeof TextEncoder === "function") return new TextEncoder().encode(text).length;
  return unescape(encodeURIComponent(text)).length;
}

function unique(values) {
  return [...new Set((Array.isArray(values) ? values : []).map(String).filter(Boolean))];
}

function pick(value, keys) {
  if (!isPlainObject(value)) return {};
  return Object.fromEntries(
    keys
      .filter((key) => Object.hasOwn(value, key))
      .map((key) => [key, clone(value[key])]),
  );
}

const PAYLOAD_FIELDS = Object.freeze({
  attempt: [
    "schemaVersion",
    "version",
    "attemptId",
    "courseId",
    "quizId",
    "activityId",
    "activityKind",
    "activityTitle",
    "quizTitle",
    "feedbackMode",
    "selectionKind",
    "status",
    "orderedQuestionIds",
    "ids",
    "choiceOrders",
    "currentQuestionId",
    "currentIndex",
    "responses",
    "answers",
    "flags",
    "confidence",
    "eliminatedChoiceIds",
    "startedAt",
    "completedAt",
    "abandonedAt",
    "contentRevision",
    "questionSnapshot",
    "provenance",
    "parentAttemptId",
    "complete",
    "mode",
  ],
  "attempt-summary": [
    "attemptId",
    "courseId",
    "quizId",
    "activityId",
    "activityKind",
    "activityTitle",
    "feedbackMode",
    "selectionKind",
    "status",
    "questionCount",
    "answered",
    "unanswered",
    "scoreKnown",
    "correct",
    "incorrect",
    "flagged",
    "uncertain",
    "startedAt",
    "completedAt",
    "abandonedAt",
    "contentRevision",
    "provenance",
  ],
  "attempt-annotation": [
    "schemaVersion",
    "attemptId",
    "questionId",
    "reviewNeeded",
    "label",
    "note",
    "status",
    "createdAt",
    "updatedAt",
  ],
  "writing-draft": [
    "schemaVersion",
    "draftId",
    "quizId",
    "promptId",
    "promptVersion",
    "promptSnapshot",
    "responses",
    "reviewed",
    "scores",
    "lastEditedField",
    "editorPosition",
  ],
  "writing-recovery": [
    "schemaVersion",
    "recoveryId",
    "draftId",
    "quizId",
    "promptId",
    "promptVersion",
    "promptSnapshot",
    "responses",
    "reviewed",
    "scores",
    "lastEditedField",
    "editorPosition",
    "reason",
    "createdAt",
  ],
  "draft-checkpoint": [
    "schemaVersion",
    "checkpointId",
    "draftId",
    "quizId",
    "promptId",
    "promptVersion",
    "promptSnapshot",
    "responses",
    "lastEditedField",
    "editorPosition",
    "reviewed",
    "scores",
    "reason",
    "createdAt",
    "automatic",
    "fingerprint",
  ],
  "terms-progress": [
    "schemaVersion",
    "courseId",
    "setId",
    "revision",
    "classifications",
    "order",
    "index",
    "filter",
    "shuffle",
    "front",
    "undo",
    "roundIds",
    "enteringUnitId",
    "view",
  ],
  "terms-note": [
    "schemaVersion",
    "setId",
    "cardId",
    "note",
    "term",
    "setRevision",
    "cardTextHash",
  ],
  "reading-mark": [
    "schemaVersion",
    "pageId",
    "contentId",
    "courseId",
    "pageType",
    "pageRoute",
    "pageTitle",
    "unitTitle",
    "courseTitle",
    "targetType",
    "targetId",
    "sectionId",
    "excerpt",
    "contentRevision",
    "read",
    "understood",
    "review",
    "confusing",
    "note",
    "updatedAt",
  ],
  "reading-position": [
    "pageId",
    "sectionId",
    "blockId",
    "offset",
    "pageRevision",
    "disclosures",
  ],
  preferences: ["schemaVersion", "reading"],
});

export function categoryForKind(kind) {
  return (
    Object.entries(CATEGORY_KINDS).find(([, kinds]) => kinds.includes(kind))?.[0] || ""
  );
}

export function supportedKinds() {
  return new Set(SUPPORTED_KINDS);
}

export function digest(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  let hash = 2166136261;
  for (const character of text) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function payloadForExport(kind, payload) {
  return pick(payload, PAYLOAD_FIELDS[kind] || []);
}

export function courseIdForRecord(record) {
  if (typeof record?.courseId === "string" && record.courseId) return record.courseId;
  if (typeof record?.payload?.courseId === "string" && record.payload.courseId)
    return record.payload.courseId;
  if (typeof record?.namespace === "string" && record.namespace.startsWith("course:"))
    return record.namespace.slice("course:".length);
  return "";
}

function sourceForRecord(record) {
  const source = {
    schemaVersion: Number(record.schemaVersion) || 1,
    namespace: record.namespace,
    kind: record.kind,
    recordId: record.recordId,
    recordRevision: Number.isInteger(record.recordRevision) ? record.recordRevision : 0,
    updatedAt: record.updatedAt,
  };
  if (record.courseId) source.courseId = record.courseId;
  if (record.contentIdentity) source.contentIdentity = record.contentIdentity;
  return source;
}

function isSelectedRecord(record, categories, selectedCourseIds, allCourses) {
  const category = categoryForKind(record.kind);
  if (!category || !categories.has(category)) return false;
  if (record.kind === "preferences") return true;
  const courseId = courseIdForRecord(record);
  return allCourses || selectedCourseIds.has(courseId);
}

export function createExportEnvelope(
  records = [],
  {
    categories = BACKUP_CATEGORIES,
    selectedCourseIds,
    courses = [],
    exportedAt = new Date().toISOString(),
  } = {},
) {
  const categorySet = new Set(
    unique(categories).filter((category) => BACKUP_CATEGORIES.includes(category)),
  );
  const allCourses = selectedCourseIds === undefined;
  const courseSet = new Set(unique(selectedCourseIds));
  const selected = records
    .filter((record) => validateRecord(record).ok)
    .filter((record) => SUPPORTED_KINDS.has(record.kind))
    .filter((record) => isSelectedRecord(record, categorySet, courseSet, allCourses))
    .map((record) => ({
      source: sourceForRecord(record),
      payload: payloadForExport(record.kind, record.payload),
    }));
  const recordIds = new Set(
    selected.map(
      (item) => `${item.source.namespace}|${item.source.kind}|${item.source.recordId}`,
    ),
  );
  const filtered = selected.filter((item) => {
    const kind = item.source.kind;
    if (kind === "attempt-annotation" || kind === "attempt-summary") {
      const attemptId = item.payload.attemptId || item.source.recordId;
      return [...recordIds].some((key) => key.endsWith(`|attempt|${attemptId}`));
    }
    if (kind === "draft-checkpoint") {
      return selected.some(
        (candidate) =>
          candidate.source.kind === "writing-draft" &&
          candidate.payload.draftId === item.payload.draftId,
      );
    }
    return true;
  });
  return {
    format: BACKUP_FORMAT,
    formatVersion: BACKUP_FORMAT_VERSION,
    exportedAt,
    application: {
      recordSchemaVersion: 1,
      transfer: "manual-local-file",
    },
    selected: {
      categories: [...categorySet],
      courseIds: allCourses ? [] : [...courseSet],
    },
    courses: (Array.isArray(courses) ? courses : [])
      .filter((course) => allCourses || courseSet.has(course.id))
      .map((course) => ({
        id: course.id,
        title: course.title,
        status: course.status,
      })),
    records: filtered,
  };
}

export function stringifyExport(envelope) {
  return `${JSON.stringify(envelope, null, 2)}\n`;
}

export function estimateBytes(envelope) {
  return byteLength(stringifyExport(envelope));
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

function safeWalk(value, depth, state) {
  if (depth > MAX_IMPORT_DEPTH)
    throw new Error("The file is nested deeper than the supported limit of 20 levels.");
  state.nodes += 1;
  if (state.nodes > 200_000) throw new Error("The file contains too many nested values.");
  if (typeof value === "string" && value.length > MAX_STRING_LENGTH)
    throw new Error("The file contains an overlong text value.");
  if (!isObject(value) && !Array.isArray(value)) return;
  if (!isPlainObject(value) && !Array.isArray(value))
    throw new Error("The file contains an unsupported object.");
  for (const [key, child] of Object.entries(value)) {
    if (DANGEROUS_KEYS.has(key))
      throw new Error(`The file contains a prohibited key: ${key}.`);
    safeWalk(child, depth + 1, state);
  }
}

function stringField(value, name, { optional = false, max = 4000 } = {}) {
  if (value === undefined && optional) return true;
  return typeof value === "string" && value.length > 0 && value.length <= max;
}

function portableRecordKey(item) {
  return `${item.source.namespace}|${item.source.kind}|${item.source.recordId}`;
}

function validatePortableRecord(item, index) {
  if (!isPlainObject(item) || !isPlainObject(item.source) || !isPlainObject(item.payload))
    return {
      ok: false,
      reason: `Record ${index + 1} must contain source and payload objects.`,
    };
  const source = item.source;
  for (const key of ["namespace", "kind", "recordId", "updatedAt"]) {
    if (!stringField(source[key], `source.${key}`))
      return { ok: false, reason: `Record ${index + 1} has an invalid source.${key}.` };
  }
  if (source.namespace !== "app" && !source.namespace.startsWith("course:"))
    return { ok: false, reason: `Record ${index + 1} has an unsupported namespace.` };
  if (source.recordId.length > 500 || source.kind.length > 100)
    return { ok: false, reason: `Record ${index + 1} has an overlong identity.` };
  if (
    source.schemaVersion !== undefined &&
    (!Number.isInteger(source.schemaVersion) || source.schemaVersion < 1)
  )
    return { ok: false, reason: `Record ${index + 1} has an invalid schema version.` };
  if (
    source.recordRevision !== undefined &&
    (!Number.isInteger(source.recordRevision) || source.recordRevision < 0)
  )
    return { ok: false, reason: `Record ${index + 1} has an invalid record revision.` };
  const record = {
    schemaVersion: source.schemaVersion || 1,
    namespace: source.namespace,
    kind: source.kind,
    recordId: source.recordId,
    recordRevision: source.recordRevision || 0,
    updatedAt: source.updatedAt,
    payload: item.payload,
  };
  if (source.courseId !== undefined) record.courseId = source.courseId;
  if (source.contentIdentity !== undefined)
    record.contentIdentity = source.contentIdentity;
  const validated = validateRecord(record);
  if (!validated.ok)
    return { ok: false, reason: `Record ${index + 1}: ${validated.reason}.` };
  if (
    source.courseId !== undefined &&
    !stringField(source.courseId, "source.courseId", { max: 200 })
  )
    return { ok: false, reason: `Record ${index + 1} has an invalid course ID.` };
  if (
    source.contentIdentity !== undefined &&
    !stringField(source.contentIdentity, "source.contentIdentity", { max: 500 })
  )
    return { ok: false, reason: `Record ${index + 1} has an invalid content identity.` };
  return {
    ok: true,
    supported: SUPPORTED_KINDS.has(source.kind),
    category: categoryForKind(source.kind),
    key: portableRecordKey(item),
    record,
  };
}

function validateCrossReferences(items) {
  const attempts = new Set(
    items
      .filter((item) => item.source.kind === "attempt")
      .map((item) => String(item.payload.attemptId || item.source.recordId)),
  );
  const drafts = new Set(
    items
      .filter((item) => item.source.kind === "writing-draft")
      .map((item) => String(item.payload.draftId || "")),
  );
  for (const item of items) {
    if (["attempt-summary", "attempt-annotation"].includes(item.source.kind)) {
      const attemptId = item.payload.attemptId;
      if (typeof attemptId !== "string" || !attempts.has(attemptId))
        return `Record ${item.source.recordId} references an attempt that is not in this file.`;
    }
    if (item.source.kind === "draft-checkpoint") {
      if (typeof item.payload.draftId !== "string" || !drafts.has(item.payload.draftId))
        return `Checkpoint ${item.source.recordId} references a writing draft that is not in this file.`;
    }
  }
  return "";
}

export function parseImportText(input, { maxBytes = MAX_IMPORT_BYTES } = {}) {
  if (typeof input !== "string")
    return { ok: false, reason: "Choose a UTF-8 JSON file." };
  const bytes = byteLength(input);
  if (bytes > maxBytes)
    return {
      ok: false,
      reason: `This file is ${formatBytes(bytes)}; the limit is ${formatBytes(maxBytes)}.`,
    };
  let value;
  try {
    value = JSON.parse(input);
  } catch {
    return { ok: false, reason: "This file is not valid JSON." };
  }
  try {
    safeWalk(value, 0, { nodes: 0 });
  } catch (error) {
    return { ok: false, reason: error.message };
  }
  if (!isPlainObject(value) || value.format !== BACKUP_FORMAT)
    return { ok: false, reason: "This is not a Page One study-data export." };
  if (value.formatVersion !== BACKUP_FORMAT_VERSION)
    return {
      ok: false,
      reason: "This export version is not supported by this Page One build.",
    };
  if (!Array.isArray(value.records) || value.records.length > MAX_IMPORT_RECORDS)
    return {
      ok: false,
      reason: `The file must contain no more than ${MAX_IMPORT_RECORDS.toLocaleString()} records.`,
    };
  const valid = [];
  const unsupported = [];
  const seen = new Set();
  for (let index = 0; index < value.records.length; index += 1) {
    const result = validatePortableRecord(value.records[index], index);
    if (!result.ok) return result;
    if (seen.has(result.key))
      return { ok: false, reason: `Record ${result.key} appears more than once.` };
    seen.add(result.key);
    if (result.supported) valid.push(value.records[index]);
    else unsupported.push({ key: result.key, kind: value.records[index].source.kind });
  }
  const crossReferenceError = validateCrossReferences(valid);
  if (crossReferenceError) return { ok: false, reason: crossReferenceError };
  return {
    ok: true,
    envelope: clone(value),
    records: valid,
    unsupported,
    bytes,
    sourceDigest: digest(input),
  };
}

function existingKey(record) {
  return `${record.namespace}|${record.kind}|${record.recordId}`;
}

function recordDigest(record) {
  return digest({
    namespace: record.namespace,
    kind: record.kind,
    recordId: record.recordId,
    courseId: record.courseId || "",
    contentIdentity: record.contentIdentity || "",
    payload: record.payload,
  });
}

function targetId(importId, key) {
  return `import-${digest([importId, key])}`;
}

function courseFromSource(source) {
  return (
    source.courseId ||
    (source.namespace.startsWith("course:") ? source.namespace.slice(8) : "")
  );
}

function archiveSpec(importId, item, reason) {
  const source = item.source;
  const id = `archive-${digest([importId, portableRecordKey(item), reason])}`;
  return {
    namespace: "app",
    kind: "imported-archive",
    recordId: id,
    courseId: courseFromSource(source),
    contentIdentity: source.contentIdentity || source.recordId,
    payload: {
      schemaVersion: 1,
      source: clone(source),
      originalKind: source.kind,
      originalRecordId: source.recordId,
      courseId: courseFromSource(source),
      reason,
      incomingPayload: clone(item.payload),
      importedAt: new Date().toISOString(),
    },
  };
}

function remapPayload(kind, payload, idMap) {
  const next = clone(payload);
  if (
    ["attempt", "attempt-summary", "attempt-annotation"].includes(kind) &&
    typeof next.attemptId === "string"
  )
    next.attemptId = idMap.get(next.attemptId) || next.attemptId;
  if (kind === "attempt" && typeof next.attemptId === "string")
    next.attemptId = idMap.get(next.attemptId) || next.attemptId;
  return next;
}

export function planImport(
  parsed,
  existingRecords = [],
  { knownCourseIds = [], conflictStrategy = "keep-both" } = {},
) {
  if (!parsed?.ok)
    return { ok: false, reason: parsed?.reason || "Import preview is unavailable." };
  const existing = new Map(
    existingRecords.map((record) => [existingKey(record), record]),
  );
  const known = new Set(unique(knownCourseIds));
  const sourceToTargetId = new Map();
  const sourceItems = parsed.records;
  const sourceAttemptIds = new Map();
  for (const item of sourceItems) {
    if (item.source.kind !== "attempt") continue;
    const sourceId = String(item.payload.attemptId || item.source.recordId);
    const current = existing.get(
      `${item.source.namespace}|attempt|${item.source.recordId}`,
    );
    if (
      current &&
      recordDigest(current) !==
        digest({
          namespace: item.source.namespace,
          kind: item.source.kind,
          recordId: item.source.recordId,
          courseId: item.source.courseId || "",
          contentIdentity: item.source.contentIdentity || "",
          payload: item.payload,
        })
    )
      sourceAttemptIds.set(
        sourceId,
        targetId(
          parsed.sourceDigest,
          `${item.source.namespace}|attempt|${item.source.recordId}`,
        ),
      );
    else sourceAttemptIds.set(sourceId, item.source.recordId);
  }
  for (const [sourceId, target] of sourceAttemptIds)
    sourceToTargetId.set(sourceId, target);

  const records = [];
  const removeRecords = [];
  const details = [];
  for (const item of sourceItems) {
    const source = item.source;
    const key = portableRecordKey(item);
    const current = existing.get(key);
    const courseId = courseFromSource(source);
    const unknownCourse = courseId && !known.has(courseId);
    if (unknownCourse) {
      records.push(
        archiveSpec(
          parsed.sourceDigest,
          item,
          "The course is not available in this browser; the work was archived without installing content.",
        ),
      );
      details.push({ key, action: "archive", reason: "unknown-course" });
      continue;
    }
    const incomingRecord = {
      schemaVersion: source.schemaVersion || 1,
      namespace: source.namespace,
      kind: source.kind,
      recordId: source.recordId,
      recordRevision: 0,
      updatedAt: source.updatedAt,
      courseId: source.courseId,
      contentIdentity: source.contentIdentity,
      payload: remapPayload(
        source.kind,
        item.payload,
        conflictStrategy === "replace" ? new Map() : sourceToTargetId,
      ),
    };
    if (!incomingRecord.courseId) delete incomingRecord.courseId;
    if (!incomingRecord.contentIdentity) delete incomingRecord.contentIdentity;
    if (conflictStrategy !== "replace") {
      const sourceAttemptId = String(
        item.payload.attemptId ||
          (["attempt-summary", "attempt-annotation"].includes(source.kind)
            ? source.recordId
            : ""),
      );
      const mappedAttemptId = sourceToTargetId.get(sourceAttemptId);
      if (mappedAttemptId && mappedAttemptId !== sourceAttemptId) {
        incomingRecord.payload.attemptId = mappedAttemptId;
        if (source.kind === "attempt-summary") incomingRecord.recordId = mappedAttemptId;
        if (source.kind === "attempt-annotation")
          incomingRecord.recordId = `${mappedAttemptId}:${item.payload.questionId || digest(key)}`;
      }
    }
    const same = current && recordDigest(current) === recordDigest(incomingRecord);
    if (same) {
      details.push({ key, action: "duplicate" });
      if (source.kind === "attempt")
        sourceToTargetId.set(
          String(item.payload.attemptId || source.recordId),
          current.recordId,
        );
      continue;
    }
    if (!current) {
      if (source.kind === "attempt") {
        const target = sourceToTargetId.get(
          String(item.payload.attemptId || source.recordId),
        );
        if (target && target !== source.recordId) {
          incomingRecord.recordId = target;
          incomingRecord.payload.attemptId = target;
        }
      }
      records.push(incomingRecord);
      details.push({ key, action: "import" });
      continue;
    }
    if (
      conflictStrategy === "replace" &&
      source.kind !== "terms-progress" &&
      source.kind !== "terms-note"
    ) {
      records.push(incomingRecord);
      removeRecords.push(current);
      details.push({ key, action: "replace" });
      continue;
    }
    if (["terms-progress", "terms-note", "preferences"].includes(source.kind)) {
      records.push(
        archiveSpec(
          parsed.sourceDigest,
          item,
          "A local record already exists; the incoming version was preserved for review.",
        ),
      );
      details.push({ key, action: "preserve-conflict" });
      continue;
    }
    const remappedId =
      sourceAttemptIds.get(String(item.payload.attemptId || source.recordId)) ||
      targetId(parsed.sourceDigest, key);
    incomingRecord.recordId = remappedId;
    incomingRecord.payload = remapPayload(source.kind, item.payload, sourceToTargetId);
    if (["attempt", "attempt-summary"].includes(source.kind)) {
      incomingRecord.payload.attemptId = remappedId;
    }
    if (source.kind === "attempt-annotation") {
      incomingRecord.payload.attemptId =
        sourceToTargetId.get(String(item.payload.attemptId)) || item.payload.attemptId;
      incomingRecord.recordId = `${incomingRecord.payload.attemptId}:${item.payload.questionId || digest(key)}`;
    }
    if (source.kind === "writing-draft") {
      incomingRecord.kind = "writing-recovery";
      incomingRecord.recordId = remappedId;
      incomingRecord.payload = {
        ...incomingRecord.payload,
        recoveryId: remappedId,
        reason:
          "Imported draft kept as a recovery copy because this browser has a different draft.",
        createdAt: new Date().toISOString(),
      };
    }
    records.push(incomingRecord);
    details.push({ key, action: "keep-both", remappedId: incomingRecord.recordId });
  }
  return {
    ok: true,
    importId: `import:${parsed.sourceDigest}`,
    records,
    removeRecords,
    details,
    unsupported: parsed.unsupported,
    summary: {
      imported: details.filter((item) => item.action === "import").length,
      duplicates: details.filter((item) => item.action === "duplicate").length,
      preservedConflicts: details.filter((item) =>
        ["preserve-conflict", "keep-both", "archive"].includes(item.action),
      ).length,
      replaced: details.filter((item) => item.action === "replace").length,
      unsupported: parsed.unsupported.length,
    },
  };
}

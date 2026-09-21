import test from "node:test";
import assert from "node:assert/strict";
import {
  BACKUP_CATEGORIES,
  MAX_IMPORT_RECORDS,
  createExportEnvelope,
  parseImportText,
  planImport,
  stringifyExport,
} from "../docs/app/backup/format.js";
import { createLocalAdapter } from "../docs/app/storage/adapter.js";

const UPDATED_AT = "2026-09-21T00:00:00.000Z";

function memoryStorage() {
  const values = new Map();
  return {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

function record(kind, recordId, payload, options = {}) {
  const courseId = options.courseId ?? "world";
  const result = {
    schemaVersion: 1,
    namespace: options.namespace || (courseId ? `course:${courseId}` : "app"),
    kind,
    recordId,
    recordRevision: options.recordRevision ?? 1,
    updatedAt: UPDATED_AT,
    payload,
  };
  if (courseId) {
    result.courseId = courseId;
    result.contentIdentity = options.contentIdentity || "world@1";
  }
  return result;
}

function portable(kind, recordId, payload, options = {}) {
  const sourceRecord = record(kind, recordId, payload, options);
  const source = {
    schemaVersion: 1,
    namespace: sourceRecord.namespace,
    kind,
    recordId,
    recordRevision: sourceRecord.recordRevision,
    updatedAt: UPDATED_AT,
  };
  if (sourceRecord.courseId) source.courseId = sourceRecord.courseId;
  if (sourceRecord.contentIdentity) source.contentIdentity = sourceRecord.contentIdentity;
  return { source, payload };
}

function envelope(records) {
  return {
    format: "page-one-study-data",
    formatVersion: 1,
    exportedAt: UPDATED_AT,
    application: { recordSchemaVersion: 1, transfer: "manual-local-file" },
    selected: { categories: BACKUP_CATEGORIES, courseIds: ["world"] },
    courses: [{ id: "world", title: "World History", status: "ready" }],
    records,
  };
}

function parseRecords(records) {
  const parsed = parseImportText(stringifyExport(envelope(records)));
  assert.equal(parsed.ok, true, parsed.reason);
  return parsed;
}

test("export allowlists personal records and respects explicit course/category choices", () => {
  const records = [
    record("attempt", "attempt-1", {
      attemptId: "attempt-1",
      courseId: "world",
      responses: { q1: { selectedChoiceIndex: 0 } },
      privateCache: "must not travel",
    }),
    record("writing-draft", "draft-1", {
      draftId: "draft-1",
      responses: { answer: "A private response" },
      promptSnapshot: { title: "Prompt" },
    }),
    record("draft-checkpoint", "draft-1:checkpoint-1", {
      draftId: "draft-1",
      checkpointId: "checkpoint-1",
      responses: { answer: "Earlier response" },
    }),
    record("recent", "recent-1", { route: "/quiz/world-1", title: "Private route" }),
    record(
      "preferences",
      "reading",
      { reading: { textScale: "125", definitionTrigger: "click" } },
      { namespace: "app", courseId: "" },
    ),
  ];
  const selected = createExportEnvelope(records, {
    categories: ["attempts", "writing", "checkpoints"],
    selectedCourseIds: ["world"],
    courses: [{ id: "world", title: "World History", status: "ready" }],
    exportedAt: UPDATED_AT,
  });
  assert.deepEqual(
    selected.records.map((item) => item.source.kind),
    ["attempt", "writing-draft", "draft-checkpoint"],
  );
  assert.equal(selected.records[0].payload.privateCache, undefined);
  assert.equal(selected.courses[0].id, "world");

  const noCourses = createExportEnvelope(records, {
    categories: ["attempts", "writing", "checkpoints"],
    selectedCourseIds: [],
  });
  assert.equal(noCourses.records.length, 0);
  const preferences = createExportEnvelope(records, {
    categories: ["preferences"],
    selectedCourseIds: [],
  });
  assert.deepEqual(
    preferences.records.map((item) => item.source.kind),
    ["preferences"],
  );
});

test("clean import round-trips, commits once, and skips an exact reimport", async () => {
  const records = [
    record("attempt", "attempt-1", {
      attemptId: "attempt-1",
      courseId: "world",
      quizId: "world-1-practice",
      responses: { q1: { selectedChoiceIndex: 0 } },
    }),
    record("attempt-summary", "attempt-1", {
      attemptId: "attempt-1",
      courseId: "world",
      quizId: "world-1-practice",
      questionCount: 1,
      answered: 0,
    }),
    record("writing-draft", "draft-1", {
      draftId: "draft-1",
      responses: { answer: "A response" },
    }),
    record("draft-checkpoint", "draft-1:checkpoint-1", {
      draftId: "draft-1",
      checkpointId: "checkpoint-1",
      responses: { answer: "An earlier response" },
    }),
  ];
  const parsed = parseRecords(
    createExportEnvelope(records, {
      categories: ["attempts", "writing", "checkpoints"],
      selectedCourseIds: ["world"],
      exportedAt: UPDATED_AT,
    }).records,
  );
  assert.equal(parsed.records.length, 4);
  const plan = planImport(parsed, [], { knownCourseIds: ["world"] });
  assert.equal(plan.ok, true);
  assert.equal(plan.summary.imported, 4);

  const adapter = createLocalAdapter({
    indexedDB: null,
    getStorage: () => memoryStorage(),
    deploymentScope: "backup-round-trip",
  });
  await adapter.ready;
  const first = await adapter.commitImport({
    importId: plan.importId,
    records: plan.records,
    removeRecords: plan.removeRecords,
  });
  assert.equal(first.ok, true);
  assert.equal((await adapter.list({ kind: "attempt" })).length, 1);
  assert.equal((await adapter.list({ kind: "draft-checkpoint" })).length, 1);
  const second = await adapter.commitImport({
    importId: plan.importId,
    records: plan.records,
    removeRecords: plan.removeRecords,
  });
  assert.equal(second.status, "skipped");
  assert.equal((await adapter.list({ kind: "attempt" })).length, 1);
});

test("conflicting work keeps both by default, remaps attempt references, and replaces only explicitly", () => {
  const incoming = [
    portable("attempt", "attempt-1", {
      attemptId: "attempt-1",
      courseId: "world",
      quizId: "world-1-practice",
      responses: { q1: { selectedChoiceIndex: 1 } },
    }),
    portable("attempt-summary", "attempt-1", {
      attemptId: "attempt-1",
      courseId: "world",
      quizId: "world-1-practice",
      questionCount: 1,
      answered: 0,
    }),
    portable("writing-draft", "draft-1", {
      draftId: "draft-1",
      responses: { answer: "Incoming response" },
    }),
    portable("terms-progress", "world-terms", {
      courseId: "world",
      setId: "world-terms",
      classifications: { card1: "know" },
    }),
  ];
  const parsed = parseRecords(incoming);
  const existing = [
    record("attempt", "attempt-1", {
      attemptId: "attempt-1",
      courseId: "world",
      quizId: "world-1-practice",
      responses: { q1: { selectedChoiceIndex: 0 } },
    }),
    record("attempt-summary", "attempt-1", {
      attemptId: "attempt-1",
      courseId: "world",
      quizId: "world-1-practice",
      questionCount: 1,
      answered: 1,
    }),
    record("writing-draft", "draft-1", {
      draftId: "draft-1",
      responses: { answer: "Local response" },
    }),
    record("terms-progress", "world-terms", {
      courseId: "world",
      setId: "world-terms",
      classifications: { card1: "still-learning" },
    }),
  ];
  const keep = planImport(parsed, existing, { knownCourseIds: ["world"] });
  assert.equal(keep.ok, true);
  const importedAttempt = keep.records.find((item) => item.kind === "attempt");
  const importedSummary = keep.records.find((item) => item.kind === "attempt-summary");
  assert.match(importedAttempt.recordId, /^import-/);
  assert.equal(importedAttempt.payload.attemptId, importedAttempt.recordId);
  assert.equal(importedSummary.recordId, importedAttempt.recordId);
  assert.equal(importedSummary.payload.attemptId, importedAttempt.recordId);
  assert.equal(
    keep.records
      .find((item) => item.kind === "writing-recovery")
      ?.payload.reason.includes("different draft"),
    true,
  );
  assert.equal(
    keep.records.find((item) => item.kind === "imported-archive")?.payload.originalKind,
    "terms-progress",
  );
  assert.equal(keep.removeRecords.length, 0);

  const replace = planImport(parsed, existing, {
    knownCourseIds: ["world"],
    conflictStrategy: "replace",
  });
  assert.equal(
    replace.records.find((item) => item.kind === "attempt").recordId,
    "attempt-1",
  );
  assert.equal(
    replace.records.find((item) => item.kind === "attempt").payload.attemptId,
    "attempt-1",
  );
  assert.equal(
    replace.records.find((item) => item.kind === "writing-draft").recordId,
    "draft-1",
  );
  assert.equal(replace.removeRecords.length, 3);
  assert.equal(
    replace.records.some((item) => item.kind === "imported-archive"),
    true,
  );
});

test("unknown courses archive validated work without installing content", () => {
  const parsed = parseRecords([
    portable(
      "attempt",
      "future-attempt",
      { attemptId: "future-attempt", courseId: "future-course", responses: {} },
      { courseId: "future-course" },
    ),
  ]);
  const plan = planImport(parsed, [], { knownCourseIds: ["world"] });
  assert.equal(plan.records.length, 1);
  assert.equal(plan.records[0].kind, "imported-archive");
  assert.equal(plan.records[0].namespace, "app");
  assert.equal(plan.records[0].payload.originalKind, "attempt");
  assert.equal(plan.records[0].courseId, "future-course");
});

test("untrusted input is bounded and cross references are validated before mutation", () => {
  assert.equal(parseImportText("not json").ok, false);
  assert.equal(parseImportText("{}", { maxBytes: 1 }).ok, false);

  const malformed = envelope([
    portable("attempt-summary", "summary-1", {
      attemptId: "missing-attempt",
      courseId: "world",
    }),
  ]);
  assert.match(parseImportText(stringifyExport(malformed)).reason, /not in this file/);

  const prototypePayload = JSON.parse(
    '{"attemptId":"attempt-1","__proto__":{"polluted":true}}',
  );
  const prototypeShaped = envelope([portable("attempt", "attempt-1", prototypePayload)]);
  assert.match(
    parseImportText(stringifyExport(prototypeShaped)).reason,
    /prohibited key/,
  );

  let nested = "end";
  for (let index = 0; index < 22; index += 1) nested = { nested };
  const tooDeep = envelope([portable("attempt", "attempt-1", { nested })]);
  assert.match(parseImportText(stringifyExport(tooDeep)).reason, /nested deeper/);

  const tooMany = envelope(
    Array.from({ length: MAX_IMPORT_RECORDS + 1 }, (_, index) =>
      portable("future-kind", `future-${index}`, {}),
    ),
  );
  assert.match(parseImportText(stringifyExport(tooMany)).reason, /10,000/);

  const htmlLike = parseRecords([
    portable("terms-note", "note-1", {
      setId: "world-terms",
      cardId: "card-1",
      note: "<b>Keep this as text</b>",
    }),
  ]);
  assert.equal(htmlLike.records[0].payload.note, "<b>Keep this as text</b>");
});

test("quota failure leaves the existing fallback records unchanged", async () => {
  const quotaStorage = {
    getItem() {
      return null;
    },
    setItem() {
      throw new Error("quota");
    },
    removeItem() {},
  };
  const adapter = createLocalAdapter({
    indexedDB: null,
    getStorage: () => quotaStorage,
    deploymentScope: "backup-quota",
  });
  await adapter.ready;
  await adapter.write({
    namespace: "course:world",
    kind: "writing-draft",
    recordId: "draft-1",
    courseId: "world",
    payload: { draftId: "draft-1", responses: { answer: "keep me" } },
  });
  const result = await adapter.commitImport({
    importId: "import:quota",
    records: [
      {
        namespace: "course:world",
        kind: "attempt",
        recordId: "attempt-1",
        courseId: "world",
        payload: { attemptId: "attempt-1", responses: {} },
      },
    ],
    removeRecords: [],
  });
  assert.equal(result.ok, false);
  assert.equal(
    (
      await adapter.read({
        namespace: "course:world",
        kind: "writing-draft",
        recordId: "draft-1",
      })
    ).payload.responses.answer,
    "keep me",
  );
  assert.equal(
    await adapter.read({
      namespace: "course:world",
      kind: "attempt",
      recordId: "attempt-1",
    }),
    null,
  );
});

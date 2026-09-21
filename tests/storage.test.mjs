import test from "node:test";
import assert from "node:assert/strict";
import {
  createLocalAdapter,
  deploymentScopeFromBase,
  migrationIdentity,
  validateRecord,
} from "../docs/app/storage/adapter.js";
import { createAttemptStore } from "../docs/app/quiz/store.js";
import { createQuizEngine } from "../docs/app/quiz/engine.js";
import { createWritingStore } from "../docs/app/writing/store.js";

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    values,
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

test("storage envelopes validate scope, identity, and revision fields", () => {
  assert.equal(deploymentScopeFromBase("/page-one/docs/"), "page-one_docs");
  assert.equal(validateRecord(null).ok, false);
  assert.equal(
    validateRecord({
      schemaVersion: 1,
      namespace: "course:world",
      kind: "attempt",
      recordId: "attempt-1",
      recordRevision: 0,
      updatedAt: new Date().toISOString(),
      payload: {},
    }).ok,
    true,
  );
  assert.equal(
    validateRecord({
      schemaVersion: 2,
      namespace: "course:world",
      kind: "attempt",
      recordId: "attempt-1",
      recordRevision: 0,
      updatedAt: new Date().toISOString(),
      payload: {},
    }).future,
    true,
  );
});

test("fallback adapter acknowledges writes, rejects stale revisions, and keeps the latest queued edit", async () => {
  const storage = memoryStorage();
  const options = {
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "queue-test",
  };
  const adapter = createLocalAdapter(options);
  await adapter.ready;
  assert.equal(adapter.availability, "session");

  const first = await adapter.write(
    { namespace: "course:world", kind: "attempt", recordId: "a", payload: { value: 1 } },
    { expectedRevision: 0 },
  );
  assert.equal(first.ok, true);
  assert.equal(first.status, "temporary");
  const conflict = await adapter.write(
    { namespace: "course:world", kind: "attempt", recordId: "a", payload: { value: 2 } },
    { expectedRevision: 0 },
  );
  assert.equal(conflict.status, "conflict");

  const writer = adapter.createRecordWriter({
    namespace: "course:world",
    kind: "attempt",
    recordId: "a",
  });
  await writer.ready;
  await writer.save({ value: 3 });
  await writer.save({ value: 4 });
  const saved = await adapter.read({
    namespace: "course:world",
    kind: "attempt",
    recordId: "a",
  });
  assert.deepEqual(saved.payload, { value: 4 });
  assert.equal(saved.recordRevision, 3);

  const reloaded = createLocalAdapter(options);
  await reloaded.ready;
  assert.deepEqual(
    (await reloaded.read({ namespace: "course:world", kind: "attempt", recordId: "a" }))
      .payload,
    { value: 4 },
  );
});

test("denied or quota-limited persistence falls back without losing the in-memory write", async () => {
  const denied = createLocalAdapter({
    indexedDB: {
      open() {
        throw new Error("denied");
      },
    },
    getStorage: () => memoryStorage(),
    deploymentScope: "denied-test",
  });
  await denied.ready;
  assert.equal(denied.availability, "session");

  const quotaStorage = memoryStorage();
  quotaStorage.setItem = () => {
    throw new Error("quota");
  };
  const quota = createLocalAdapter({
    indexedDB: null,
    getStorage: () => quotaStorage,
    deploymentScope: "quota-test",
  });
  await quota.ready;
  const result = await quota.write({
    namespace: "course:world",
    kind: "attempt",
    recordId: "quota",
    payload: { value: "kept in memory" },
  });
  assert.equal(result.ok, true);
  assert.equal(result.status, "temporary");
  assert.equal(quota.availability, "memory");
  assert.deepEqual(
    (
      await quota.read({
        namespace: "course:world",
        kind: "attempt",
        recordId: "quota",
      })
    ).payload,
    { value: "kept in memory" },
  );
});

test("legacy migration is idempotent and reset epochs are durable", async () => {
  const storage = memoryStorage();
  const adapter = createLocalAdapter({
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "migration-test",
  });
  await adapter.ready;
  const payload = { quizId: "world-1-1-quiz", complete: false };
  const request = {
    migrationId: migrationIdentity("legacy-key", "world-1-1-quiz", payload),
    source: "legacy-key",
    records: [
      {
        namespace: "course:world",
        kind: "attempt",
        recordId: "world-1-1-quiz",
        courseId: "world",
        payload,
      },
    ],
  };
  assert.equal((await adapter.commitMigration(request)).ok, true);
  assert.equal((await adapter.commitMigration(request)).status, "skipped");
  assert.equal((await adapter.list({ kind: "attempt" })).length, 1);
  assert.equal((await adapter.bumpResetEpoch("course:world")).ok, true);
  assert.equal(await adapter.getResetEpoch("course:world"), 1);
});

test("stale writers keep both payloads and reset epochs block resurrection", async () => {
  const storage = memoryStorage();
  const options = {
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "conflict-test",
  };
  const firstAdapter = createLocalAdapter(options);
  const secondAdapter = createLocalAdapter(options);
  await Promise.all([firstAdapter.ready, secondAdapter.ready]);
  const writerOptions = {
    namespace: "course:world",
    kind: "writing-draft",
    recordId: "world-1-saq",
    resetScopes: ["writing:world-1-saq", "course:world", "all"],
    courseId: "world",
    contentIdentity: "world-1-saq@1",
  };
  const first = firstAdapter.createRecordWriter(writerOptions);
  const second = secondAdapter.createRecordWriter(writerOptions);
  await Promise.all([first.ready, second.ready]);
  assert.equal((await first.save({ text: "first" })).ok, true);
  assert.equal((await first.save({ text: "newer first" })).ok, true);
  const conflict = await second.save({ text: "stale second" });
  assert.equal(conflict.status, "conflict");
  assert.equal(conflict.conflictCopy.payload.competingPayload.text, "stale second");
  assert.equal(
    (
      await firstAdapter.read({
        namespace: "course:world",
        kind: "writing-draft",
        recordId: "world-1-saq",
      })
    ).payload.text,
    "newer first",
  );
  assert.equal((await firstAdapter.list({ kind: "conflict-copy" })).length, 1);

  const stale = firstAdapter.createRecordWriter({
    ...writerOptions,
    recordId: "world-1-saq-2",
  });
  await stale.ready;
  await stale.save({ text: "will be cleared" });
  const cleared = await secondAdapter.clearScope("course:world");
  assert.equal(cleared.ok, true);
  const resurrect = await stale.save({ text: "must not return" });
  assert.equal(resurrect.reset, true);
  assert.equal(
    await firstAdapter.read({
      namespace: "course:world",
      kind: "writing-draft",
      recordId: "world-1-saq-2",
    }),
    null,
  );
  assert.equal((await firstAdapter.list({ namespace: "course:other" })).length, 0);
});

test("temporary tab mode uses an isolated fallback scope", async () => {
  const storage = memoryStorage();
  const options = {
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "mode-test",
  };
  const saved = createLocalAdapter(options);
  await saved.ready;
  await saved.write({
    namespace: "course:world",
    kind: "attempt",
    recordId: "saved",
    payload: { value: "persistent fallback" },
  });
  saved.setMode("temporary");
  assert.equal(saved.storageMode, "temporary");
  assert.equal(
    await saved.read({ namespace: "course:world", kind: "attempt", recordId: "saved" }),
    null,
  );
  await saved.write({
    namespace: "course:world",
    kind: "attempt",
    recordId: "temporary",
    payload: { value: "temporary" },
  });
  saved.setMode("persistent");
  assert.equal(
    await saved
      .read({ namespace: "course:world", kind: "attempt", recordId: "saved" })
      .then((record) => record.payload.value),
    "persistent fallback",
  );
  assert.equal(
    await saved.read({
      namespace: "course:world",
      kind: "attempt",
      recordId: "temporary",
    }),
    null,
  );
});

test("attempt and writing stores hydrate through the shared adapter without changing legacy callers", async () => {
  const storage = memoryStorage({
    "page-one-attempts-v1": JSON.stringify({
      "world-1-1-quiz": {
        quizId: "world-1-1-quiz",
        version: 1,
        mode: "topic",
        ids: ["q1"],
        index: 0,
        answers: {},
        complete: false,
      },
    }),
  });
  const adapter = createLocalAdapter({
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "store-test",
  });
  const attempts = createAttemptStore({ adapter, getStorage: () => storage });
  await attempts.ready;
  assert.equal(attempts.peek("world-1-1-quiz").quizId, "world-1-1-quiz");
  const saved = await attempts.save({
    quizId: "world-1-1-quiz",
    version: 1,
    mode: "topic",
    ids: ["q1"],
    index: 0,
    answers: { q1: 0 },
    complete: false,
  });
  assert.equal(saved.ok, true);

  const quiz = {
    id: "world-1-saq",
    version: 1,
    parts: [{ id: "a", prompt: "Part A", required: true }],
  };
  const writing = createWritingStore(quiz, { adapter, getStorage: () => storage });
  await writing.ready;
  writing.draft.responses.a = "Keep this response.";
  assert.equal((await writing.save()).ok, true);
  const secondAdapter = createLocalAdapter({
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "store-test",
  });
  const secondWriting = createWritingStore(quiz, {
    adapter: secondAdapter,
    getStorage: () => storage,
  });
  await secondWriting.ready;
  assert.equal(secondWriting.draft.responses.a, "Keep this response.");
});

test("attempt storage keeps unique v2 records and explicit identity lookups", async () => {
  const storage = memoryStorage();
  const adapter = createLocalAdapter({
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "attempt-identity-test",
  });
  const store = createAttemptStore({ adapter, getStorage: () => storage });
  await store.ready;
  const engine = createQuizEngine({
    questions: [
      {
        id: "identity-q",
        topicId: "fixture",
        concept: "identity",
        prompt: "Question",
        choices: ["A", "B"],
        correctAnswer: 0,
        explanation: "A.",
      },
    ],
    quizzes: [{ id: "identity-quiz", questionIds: ["identity-q"], quizType: "topic" }],
  });
  const first = engine.createAttempt("identity-quiz", null, { attemptId: "attempt-one" });
  const second = engine.createAttempt("identity-quiz", null, {
    attemptId: "attempt-two",
  });
  assert.notEqual(first.attemptId, second.attemptId);
  assert.equal((await store.save(first)).ok, true);
  assert.equal((await store.save(second)).ok, true);
  assert.equal(store.list({ quizId: "identity-quiz" }).length, 2);
  assert.equal(store.listSummaries({ quizId: "identity-quiz" }).length, 2);
  assert.equal((await adapter.list({ kind: "attempt-summary" })).length, 2);
  assert.equal(store.getByAttemptId("attempt-one", engine).attemptId, "attempt-one");
  assert.equal(
    store.get("identity-quiz", engine, { attemptId: "attempt-two" }).attemptId,
    "attempt-two",
  );
  assert.equal((await store.remove("attempt-one")).ok, true);
  assert.equal(store.list({ quizId: "identity-quiz" }).length, 1);
  assert.equal(store.listSummaries({ quizId: "identity-quiz" }).length, 1);
  assert.equal((await adapter.list({ kind: "attempt-summary" })).length, 1);
});

test("writing store reports a failed save and recovers on retry without losing the draft", async () => {
  let fail = true;
  let savedPayload = null;
  const adapter = {
    availability: "persistent",
    ready: Promise.resolve(),
    commitMigration: async () => ({ ok: true }),
    createRecordWriter() {
      return {
        ready: Promise.resolve(),
        save(payload) {
          if (fail) return Promise.reject(new Error("forced write failure"));
          savedPayload = structuredClone(payload);
          return Promise.resolve({ ok: true, status: "saved" });
        },
        state: "saved",
      };
    },
  };
  const quiz = {
    id: "world-1-saq",
    version: 1,
    courseId: "world",
    parts: [{ id: "a", prompt: "Part A", required: true }],
  };
  const store = createWritingStore(quiz, { adapter, getStorage: () => null });
  await store.ready;
  store.draft.responses.a = "Keep this response visible.";
  const failed = await store.save();
  assert.equal(failed.status, "failed");
  assert.equal(store.storageState, "failed");
  fail = false;
  const recovered = await store.save();
  assert.equal(recovered.ok, true);
  assert.equal(store.storageState, "saved");
  assert.equal(savedPayload.responses.a, "Keep this response visible.");
});

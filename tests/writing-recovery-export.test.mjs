import test from "node:test";
import assert from "node:assert/strict";
import { createLocalAdapter } from "../docs/app/storage/adapter.js";
import { createWritingStore } from "../docs/app/writing/store.js";
import { formatWritingExport, writingFilename } from "../docs/app/writing/export.js";

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
}

function quiz(version = 1, fieldId = "a") {
  return {
    id: "world-writing-fixture",
    version,
    courseId: "world",
    headline: "A writing fixture",
    promptTitle: version === 1 ? "Original prompt" : "Revised prompt",
    prompt:
      version === 1 ? "Answer the original question." : "Answer a changed question.",
    instructions: "Use evidence and reasoning.",
    responseFields: [
      {
        id: fieldId,
        label: fieldId === "a" ? "Part A" : "Part B",
        prompt: "Write the response.",
        required: true,
      },
    ],
    rubric: [
      { id: "criterion", label: "Criterion", points: 1, guidance: "Use support." },
    ],
  };
}

async function adapterFor(name) {
  const adapter = createLocalAdapter({
    indexedDB: null,
    getStorage: () => memoryStorage(),
    deploymentScope: name,
  });
  await adapter.ready;
  return adapter;
}

test("writing checkpoints deduplicate identical snapshots and prune to ten", async () => {
  const adapter = await adapterFor("writing-checkpoints");
  const store = createWritingStore(quiz(), { adapter, getStorage: () => null });
  await store.ready;
  store.draft.responses.a = "First version";
  assert.equal((await store.save()).ok, true);
  assert.equal((await store.createCheckpoint("manual")).ok, true);
  assert.equal((await store.createCheckpoint("review-again")).status, "duplicate");

  for (let index = 0; index < 11; index += 1) {
    store.draft.responses.a = `Version ${index}`;
    assert.equal((await store.save()).ok, true);
    assert.equal((await store.createCheckpoint("manual")).ok, true);
  }
  assert.equal(store.checkpoints.length, 10);
  const records = await adapter.list({
    namespace: "course:world",
    kind: "draft-checkpoint",
  });
  assert.equal(records.length, 10);
});

test("checkpoint restore preserves the current version and clears stale review scores", async () => {
  const adapter = await adapterFor("writing-restore");
  const store = createWritingStore(quiz(), { adapter, getStorage: () => null });
  await store.ready;
  store.draft.responses.a = "Earlier Unicode — paragraph one\nparagraph two";
  store.draft.lastEditedField = "a";
  store.draft.editorPosition = { start: 9, end: 15 };
  assert.equal((await store.save()).ok, true);
  const checkpoint = await store.createCheckpoint("manual");
  store.draft.responses.a = "Current version";
  assert.equal((await store.save()).ok, true);
  assert.equal(store.engine.review(store.draft), true);
  assert.equal(store.engine.setScore(store.draft, "criterion", 1), true);
  assert.equal((await store.save()).ok, true);

  const restored = await store.restoreCheckpoint(checkpoint.record.payload.checkpointId);
  assert.equal(restored.ok, true);
  assert.equal(store.draft.responses.a, "Earlier Unicode — paragraph one\nparagraph two");
  assert.equal(store.draft.lastEditedField, "a");
  assert.deepEqual(store.draft.editorPosition, { start: 9, end: 15 });
  assert.equal(store.draft.reviewed, false);
  assert.equal(store.draft.scores.criterion, null);
  assert.equal(
    (
      await adapter.read({
        namespace: "course:world",
        kind: "writing-draft",
        recordId: quiz().id,
      })
    ).payload.responses.a,
    "Earlier Unicode — paragraph one\nparagraph two",
  );
});

test("prompt changes preserve an old response as a recovery record", async () => {
  const adapter = await adapterFor("writing-prompt-change");
  const oldStore = createWritingStore(quiz(), { adapter, getStorage: () => null });
  await oldStore.ready;
  oldStore.draft.responses.a = "Response for the original prompt.";
  assert.equal((await oldStore.save()).ok, true);

  const newStore = createWritingStore(quiz(2, "b"), { adapter, getStorage: () => null });
  await newStore.ready;
  assert.equal(newStore.draft.responses.b, "");
  assert.equal(newStore.recoveryRecords.length, 1);
  newStore.previewRecovery(newStore.recoveryRecords[0].recordId);
  assert.equal(newStore.recoveryPreview.responses.a, "Response for the original prompt.");
});

test("an authored compatibility mapping can copy an old field after preview", async () => {
  const adapter = await adapterFor("writing-prompt-map");
  const oldStore = createWritingStore(quiz(), { adapter, getStorage: () => null });
  await oldStore.ready;
  oldStore.draft.responses.a = "Mapped response.";
  assert.equal((await oldStore.save()).ok, true);
  const revised = {
    ...quiz(2, "b"),
    promptCompatibility: { 1: { fields: { b: "a" } } },
  };
  const newStore = createWritingStore(revised, { adapter, getStorage: () => null });
  await newStore.ready;
  const recoveryId = newStore.recoveryRecords[0].recordId;
  assert.equal(newStore.canMapRecovery(recoveryId), true);
  assert.equal((await newStore.useRecovery(recoveryId)).ok, true);
  assert.equal(newStore.draft.responses.b, "Mapped response.");
  assert.equal(newStore.recoveryRecords.length, 1);
});

test("export preserves multiline Unicode text and treats HTML-like text as plain text", () => {
  const text = formatWritingExport({
    title: "A writing fixture",
    promptSnapshot: {
      promptTitle: "Prompt",
      prompt: "Authored prompt",
      instructions: "Use evidence.",
      responseFields: [{ id: "a", label: "Part A" }],
      rubric: [{ id: "criterion", label: "Criterion", points: 1 }],
    },
    responses: { a: "Café — line one\n<script>stay text</script>" },
  });
  assert.match(text, /Café — line one\n<script>stay text<\/script>/u);
  assert.equal(text.includes("model"), false);
  assert.equal(
    writingFilename("A/unsafe: title?"),
    "A unsafe title-" + new Date().toISOString().slice(0, 10) + ".txt",
  );
});

test("restore failure leaves the current draft intact", async () => {
  const base = await adapterFor("writing-restore-failure");
  let failWrites = false;
  const adapter = {
    ...base,
    createRecordWriter(spec) {
      const writer = base.createRecordWriter(spec);
      return {
        ready: writer.ready,
        save(payload) {
          return failWrites
            ? Promise.resolve({ ok: false, status: "failed", error: "forced" })
            : writer.save(payload);
        },
        get state() {
          return writer.state;
        },
        get conflict() {
          return writer.conflict;
        },
        resolveSaved: writer.resolveSaved,
      };
    },
  };
  const store = createWritingStore(quiz(), { adapter, getStorage: () => null });
  await store.ready;
  store.draft.responses.a = "Saved current";
  assert.equal((await store.save()).ok, true);
  const checkpoint = await store.createCheckpoint("manual");
  store.draft.responses.a = "Unsaved current version";
  assert.equal((await store.save()).ok, true);
  failWrites = true;
  const result = await store.restoreCheckpoint(checkpoint.record.payload.checkpointId);
  assert.equal(result.ok, false);
  assert.equal(store.draft.responses.a, "Unsaved current version");
});

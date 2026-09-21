import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { highlightSearchText, searchRecords } from "../docs/app/search/engine.js";
import {
  createReadingMarkStore,
  normalizeReadingMark,
  reviewPage,
} from "../docs/app/reading/marks.js";
import { createLocalAdapter } from "../docs/app/storage/adapter.js";
import { createContentStore } from "../docs/app/content-store.js";

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

test("search normalizes punctuation, ranks authored IDs and aliases, and escapes highlights", async () => {
  const index = {
    records: [
      {
        id: "fixture-2-3",
        type: "topic",
        courseId: "fixture",
        title: "A Title",
        code: "2.3",
        text: "General reading",
        excerpt: "General reading",
      },
      {
        id: "fixture/section",
        type: "section",
        courseId: "fixture",
        title: "A Title",
        heading: "Exchange networks",
        aliases: ["trade routes"],
        text: "A passage about exchange.",
        excerpt: "A passage about exchange.",
      },
      {
        id: "fixture/private",
        type: "passage",
        courseId: "fixture",
        title: "Private response",
        text: "This should not be indexed in a real generated record.",
      },
    ],
  };
  assert.equal(searchRecords(index, "2-3").items[0].id, "fixture-2-3");
  assert.equal(searchRecords(index, "trade, routes").items[0].id, "fixture/section");
  assert.equal(searchRecords(index, "nonexistent").total, 0);
  assert.match(
    highlightSearchText('<script>alert("x")</script>', "script"),
    /&lt;<mark>script<\/mark>&gt;/,
  );
  assert.doesNotMatch(
    highlightSearchText('<script>alert("x")</script>', "script"),
    /<script>/,
  );
});

test("generated search stays compact, reading-only, and honest about Algebra 2", async () => {
  const world = JSON.parse(
    await readFile(new URL("../docs/generated/world/search.json", import.meta.url)),
  );
  const algebra = JSON.parse(
    await readFile(new URL("../docs/generated/algebra2/search.json", import.meta.url)),
  );
  assert.equal(world.schemaVersion, 1);
  assert.ok(world.records.some((record) => record.type === "passage"));
  assert.ok(world.records.some((record) => record.type === "glossary"));
  assert.equal(
    world.records.some((record) => record.type === "quiz"),
    false,
  );
  assert.equal(algebra.records.length, 0);
});

test("search index loading is on demand and does not fetch question banks", async () => {
  const files = new Map([
    [
      "catalog.json",
      JSON.parse(
        await readFile(new URL("../docs/generated/catalog.json", import.meta.url)),
      ),
    ],
    [
      "world/search.json",
      JSON.parse(
        await readFile(new URL("../docs/generated/world/search.json", import.meta.url)),
      ),
    ],
    [
      "algebra2/search.json",
      JSON.parse(
        await readFile(
          new URL("../docs/generated/algebra2/search.json", import.meta.url),
        ),
      ),
    ],
    [
      "world/routes.json",
      JSON.parse(
        await readFile(new URL("../docs/generated/world/routes.json", import.meta.url)),
      ),
    ],
  ]);
  const requested = [];
  const store = createContentStore({
    fetchJson: async (path) => {
      requested.push(path);
      return files.get(path);
    },
  });
  const loaded = await store.searchIndexes();
  assert.equal(loaded.indexes.length, 1);
  assert.deepEqual(requested, ["catalog.json", "world/search.json"]);
});

test("reading marks keep read, understood, review, and private notes independent", async () => {
  const storage = memoryStorage();
  const options = {
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "reading-mark-test",
  };
  const context = {
    pageId: "reading:topic:fixture-1-1",
    contentId: "fixture-1-1",
    courseId: "fixture",
    pageType: "topic",
    pageRoute: "/topic/fixture-1-1",
    pageTitle: "Fixture lesson",
    courseTitle: "Fixture course",
    unitTitle: "Unit 1",
    contentRevision: "fixture-v1",
  };
  const target = {
    targetType: "section",
    targetId: "section-a",
    sectionId: "section-a",
    excerpt: "A section preview.",
  };
  const store = createReadingMarkStore(createLocalAdapter(options), context);
  await store.ready;
  assert.equal((await store.update(target, { read: true })).ok, true);
  assert.equal(store.get(target).understood, false);
  assert.equal((await store.update(target, { understood: true })).ok, true);
  assert.equal(store.get(target).read, true);

  const block = {
    ...target,
    targetType: "block",
    targetId: "section-a-block-1",
    excerpt: "Original passage.",
  };
  const note = '<img src=x onerror="alert(1)">';
  assert.equal((await store.update(block, { review: true, note })).ok, true);
  const reloaded = createReadingMarkStore(createLocalAdapter(options), context);
  await reloaded.ready;
  assert.equal(reloaded.get(block).note, note);
  assert.equal(reloaded.get(block).review, true);
  assert.equal((await reloaded.removeReview(block)).ok, true);
  const afterRemoval = createReadingMarkStore(createLocalAdapter(options), context);
  await afterRemoval.ready;
  assert.equal(afterRemoval.get(block).review, false);
  assert.equal(afterRemoval.get(block).note, note);
  assert.equal(
    normalizeReadingMark({ ...context, ...block, note: "x".repeat(2001) }),
    null,
  );
});

test("review list escapes notes and keeps removed passages visibly unresolved", () => {
  const html = reviewPage({
    courses: [{ id: "fixture", title: "Fixture", status: "ready", readyTopicCount: 1 }],
    courseId: "fixture",
    records: [
      {
        recordId: "reading-mark:fixture:block-a",
        payload: {
          courseId: "fixture",
          courseTitle: "Fixture",
          unitTitle: "Unit 1",
          pageTitle: "Lesson",
          pageRoute: "/topic/fixture-1-1",
          pageId: "reading:topic:fixture-1-1",
          targetType: "block",
          targetId: "block-a",
          sectionId: "section-a",
          excerpt: "Old passage",
          note: "<b>private</b>",
          review: true,
          updatedAt: "2026-09-21T00:00:00.000Z",
        },
        orphaned: true,
      },
    ],
  });
  assert.match(html, /Original passage changed or is unavailable/);
  assert.match(html, /&lt;b&gt;private&lt;\/b&gt;/);
  assert.doesNotMatch(html, /<b>private<\/b>/);
});

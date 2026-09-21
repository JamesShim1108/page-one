import test from "node:test";
import assert from "node:assert/strict";

import { createRecentWork } from "../docs/app/recent.js";
import { createLocalAdapter } from "../docs/app/storage/adapter.js";
import { coursePage, homePage } from "../docs/app/views/catalog.js";

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

function adapterFor(scope, storage = memoryStorage()) {
  return createLocalAdapter({
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: scope,
  });
}

function target(index, overrides = {}) {
  return {
    key: `quiz:${index}`,
    kind: "quiz",
    route: `/quiz/${index}`,
    title: `Quiz ${index}`,
    detail: `Question ${index} of 10`,
    ...overrides,
  };
}

test("recent work is bounded, deduplicated, and resumes only active work", async () => {
  let clock = Date.parse("2026-09-20T00:00:00Z");
  const recent = createRecentWork({
    adapter: adapterFor("recent-bounds"),
    now: () => clock,
  });
  await recent.ready;

  await recent.touch(target("old"));
  clock += 1_000;
  await recent.touch(target("active", { title: "Active quiz" }));
  clock += 1_000;
  await recent.touch(target("active", { detail: "Question 3 of 10" }));
  clock += 1_000;
  await recent.touch(
    target("done", { active: false, status: "complete", detail: "View results" }),
  );

  assert.equal(recent.list().length, 3);
  assert.equal(
    recent.list().find((item) => item.key === "quiz:active").detail,
    "Question 3 of 10",
  );
  assert.equal(recent.resume().key, "quiz:active");
  assert.equal(
    recent.list().some((item) => item.key === "quiz:done"),
    true,
  );

  for (let index = 0; index < 20; index += 1) {
    clock += 1_000;
    await recent.touch(target(`extra-${index}`));
  }
  assert.equal(recent.list().length, 12);
  assert.equal(
    recent.list().some((item) => item.key === "quiz:old"),
    false,
  );
});

test("existing saved work seeds recents once, and clearing recents does not delete work", async () => {
  const storage = memoryStorage();
  const adapter = adapterFor("recent-migration", storage);
  await adapter.ready;
  await adapter.write(
    {
      namespace: "course:world",
      kind: "attempt",
      recordId: "world-1-1-quiz",
      courseId: "world",
      payload: {
        quizId: "world-1-1-quiz",
        courseId: "world",
        ids: ["q1", "q2", "q3"],
        index: 1,
        complete: false,
      },
    },
    { expectedRevision: 0 },
  );
  await adapter.write(
    {
      namespace: "course:world",
      kind: "writing-draft",
      recordId: "world-1-saq",
      courseId: "world",
      payload: {
        draftId: "world-1-saq@v1",
        quizId: "world-1-saq",
        responses: { a: "A response" },
        reviewed: false,
      },
    },
    { expectedRevision: 0 },
  );
  await adapter.write(
    {
      namespace: "course:world",
      kind: "reading-position",
      recordId: "reading:topic:world-1-1",
      courseId: "world",
      payload: {
        pageId: "reading:topic:world-1-1",
        sectionId: "song-government",
        blockId: "song-government-block",
        sectionLabel: "Song government",
      },
    },
    { expectedRevision: 0 },
  );
  const recent = createRecentWork({ adapter });
  await recent.ready;
  assert.equal(
    recent.list().some((item) => item.key === "quiz:world-1-1-quiz"),
    true,
  );
  assert.equal(
    recent.list().some((item) => item.key === "writing:world-1-saq"),
    true,
  );
  assert.equal(
    recent.list().find((item) => item.kind === "reading").route,
    "/topic/world-1-1?section=song-government&block=song-government-block&resume=1",
  );
  assert.equal(recent.resume().active, true);

  await recent.clear();
  assert.deepEqual(recent.list(), []);
  assert.ok(
    await adapter.read({
      namespace: "course:world",
      kind: "attempt",
      recordId: "world-1-1-quiz",
    }),
  );

  const reloaded = createRecentWork({ adapter });
  await reloaded.ready;
  assert.deepEqual(reloaded.list(), []);
});

test("home resumes one target, shows up to three alternatives, and keeps Algebra 2 honest", () => {
  const courses = [
    {
      id: "world",
      title: "AP World History: Modern",
      shortTitle: "AP World",
      description: "Ready content.",
      period: "c. 1200–present",
      status: "ready",
      readyTopicCount: 1,
      previewTopics: [],
    },
    {
      id: "algebra2",
      title: "Algebra 2",
      shortTitle: "Algebra 2",
      description: "Coming soon.",
      period: "Mathematics",
      status: "soon",
      readyTopicCount: 0,
      previewTopics: [],
      emptyShell: true,
    },
  ];
  const resume = target("resume", { title: "East Asia", detail: "Question 2 of 7" });
  const html = homePage(
    { courses },
    { resume, items: [resume, target("a"), target("b"), target("c"), target("d")] },
  );
  assert.match(html, /Resume/);
  assert.match(html, /Question 2 of 7/);
  assert.equal((html.match(/class="recent-work-card"/g) || []).length, 3);
  assert.doesNotMatch(html, /course shell is ready/);
  const algebra = coursePage({ course: courses[1], units: [] });
  assert.match(algebra, /No lessons or practice have been added yet/);
  assert.doesNotMatch(algebra, /course space is ready/);
});

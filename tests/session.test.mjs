import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { createContentStore } from "../docs/app/content-store.js";
import { createQuizEngine } from "../docs/app/quiz/engine.js";
import {
  normalizeSessionConfig,
  parseSessionConfig,
  sessionPath,
  sessionShare,
} from "../docs/app/session/config.js";
import { allocateSession } from "../docs/app/session/selection.js";

const root = new URL("../", import.meta.url);
const generated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));

test("short-session allocation is balanced, deterministic, and redistributes shortages", () => {
  const result = allocateSession({
    pools: [
      { topicId: "a", questionIds: ["a1", "a2", "a3"] },
      { topicId: "b", questionIds: ["b1"] },
      { topicId: "empty", questionIds: [] },
    ],
    topicIds: ["a", "b", "empty"],
    count: 5,
  });
  assert.deepEqual(result.questionIds, ["a1", "b1", "a2", "a3"]);
  assert.deepEqual(result.allocation, {
    a: ["a1", "a2", "a3"],
    b: ["b1"],
    empty: [],
  });
  assert.equal(result.shortage, true);
  assert.deepEqual(result.emptyTopicIds, ["empty"]);
});

test("overlapping eligible pools deduplicate question IDs without borrowing labels", () => {
  const result = allocateSession({
    pools: [
      { topicId: "first", questionIds: ["shared", "first-only"] },
      { topicId: "second", questionIds: ["shared", "second-only"] },
    ],
    topicIds: ["first", "second"],
    count: 4,
  });
  assert.deepEqual(result.questionIds, ["shared", "second-only", "first-only"]);
  assert.equal(new Set(result.questionIds).size, result.questionIds.length);
  assert.equal(result.availability.first, 2);
  assert.equal(result.availability.second, 1);
});

test("unseen preference uses repeats only when the unseen pool is insufficient", () => {
  const result = allocateSession({
    pools: [{ topicId: "topic", questionIds: ["q1", "q2", "q3"] }],
    topicIds: ["topic"],
    count: 3,
    exposedIds: ["q1", "q2"],
    preferUnseen: true,
  });
  assert.deepEqual(result.questionIds, ["q3", "q1", "q2"]);
  assert.equal(result.newCount, 1);
  assert.equal(result.repeatedCount, 2);
});

test("session URLs carry only public scope configuration and enforce the sharing budget", () => {
  const config = normalizeSessionConfig({
    courseId: "world",
    topicIds: ["world-1-1", "world-1-2"],
    count: 20,
    mode: "test",
    preferUnseen: true,
  });
  const path = sessionPath(config, { attemptId: "private-attempt", view: "quiz" });
  const publicPath = sessionPath(config);
  assert.match(publicPath, /^\/session\?/);
  assert.doesNotMatch(publicPath, /attempt|question/);
  assert.match(path, /attempt=private-attempt/);
  assert.equal(
    parseSessionConfig(new URLSearchParams("course=world&topics=q1&count=999&mode=bad"))
      .count,
    50,
  );
  assert.equal(sessionShare(config, "https://example.test").withinLimit, true);
  assert.equal(
    sessionShare(
      {
        courseId: "world",
        topicIds: Array.from({ length: 300 }, (_, i) => `world-${i}`),
        count: 5,
      },
      "https://example.test",
    ).withinLimit,
    false,
  );
});

test("the generated eligibility ledger excludes reserved unit-form questions and Algebra 2 stays empty", async () => {
  const ledger = await generated("world/custom-practice.json");
  const unitOne = await generated("world/units/world-1.json");
  const reserved = new Set(
    unitOne.unit.quizzes.flatMap((quiz) =>
      quiz.selections.flatMap((selection) => selection.questionIds),
    ),
  );
  assert.equal(ledger.pools.length, 14);
  for (const pool of ledger.pools) {
    assert.ok(pool.questionIds.length > 0);
    assert.ok(pool.questionIds.every((id) => !reserved.has(id)));
    assert.ok(pool.questionIds.every((id) => typeof id === "string"));
  }
  assert.deepEqual((await generated("algebra2/custom-practice.json")).pools, []);
});

test("session content loads the ledger and only the selected topic banks", async () => {
  const store = createContentStore({
    fetchJson: (path) => generated(path),
  });
  const data = await store.sessionData("world");
  assert.equal(data.ledger.pools.length, 14);
  const selected = await store.sessionContent("world", ["world-1-1"]);
  assert.equal(selected.banks.length, 1);
  assert.equal(selected.banks[0].topic.id, "world-1-1");
  assert.ok(selected.pools.every((pool) => pool.topicId === "world-1-1"));
});

test("custom attempts expose questions only when rendered and remain valid snapshots", () => {
  const bank = {
    courseId: "fixture",
    revision: "fixture-v1",
    questions: [
      {
        id: "q1",
        topicId: "fixture-topic",
        prompt: "One",
        choices: ["A", "B"],
        correctAnswer: 0,
        explanation: "Existing explanation.",
      },
      {
        id: "q2",
        topicId: "fixture-topic",
        prompt: "Two",
        choices: ["A", "B"],
        correctAnswer: 1,
        explanation: "Existing explanation.",
      },
    ],
    quizzes: [
      {
        id: "fixture-session",
        courseId: "fixture",
        unitId: "fixture-unit",
        topicId: "fixture-topic",
        title: "Short session",
        quizType: "custom",
        questionIds: ["q1", "q2"],
      },
    ],
  };
  let now = 0;
  const engine = createQuizEngine(bank, {
    now: () => `2026-09-20T00:00:0${now++}.000Z`,
    idFactory: () => "attempt-fixture",
  });
  const attempt = engine.createAttempt("fixture-session", ["q1", "q2"], {
    selectionKind: "custom",
    feedbackMode: "practice",
    trackExposure: true,
  });
  assert.deepEqual(attempt.exposure.questionIds, []);
  assert.equal(engine.markExposed(attempt), true);
  assert.deepEqual(attempt.exposure.questionIds, ["q1"]);
  assert.equal(engine.validateAttempt(attempt), true);
});

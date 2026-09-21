import test from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { compileContent } from "../scripts/build-content.mjs";
import { ContentLoadError, createContentStore } from "../docs/app/content-store.js";
import { parseRoute, createRouteLoader } from "../docs/app/router.js";
import { createQuizEngine } from "../docs/app/quiz/engine.js";
import { createAttemptStore } from "../docs/app/quiz/store.js";
import { resultsPage } from "../docs/app/quiz/views.js";
import { createWritingEngine, maxResponseLength } from "../docs/app/writing/engine.js";
import { createWritingStore } from "../docs/app/writing/store.js";
import { renderBlocks } from "../docs/app/blocks.js";
import { prepareImage } from "../scripts/prepare-image.mjs";

const root = new URL("../", import.meta.url);
const readGenerated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));

async function contentFileMap() {
  const output = new Map();
  const manifest = JSON.parse(
    await readFile(new URL("docs/generated/manifest.json", root), "utf8"),
  );
  for (const path of manifest) output.set(path, await readGenerated(path));
  return output;
}

test("the generated catalog preserves every ready Unit 1 topic and stable route", async () => {
  const catalog = await readGenerated("catalog.json");
  assert.equal(catalog.schemaVersion, 1);
  assert.equal(catalog.courses.length, 2);
  assert.equal(catalog.courses[0].id, "world");
  assert.equal(catalog.courses[0].readyTopicCount, 14);

  const routes = await readGenerated("world/routes.json");
  assert.equal(Object.keys(routes.topic).length, 14);
  assert.equal(Object.keys(routes.quiz).length, 32);
  assert.equal(routes.topic["world-1-2"], "world/topics/world-1-2.json");
  assert.equal(routes.writing["world-1-saq"], "world/writing/world-1-saq.json");

  const unit = await readGenerated("world/units/world-1.json");
  assert.equal(unit.topics.length, 7);
  const unit2 = await readGenerated("world/units/world-2.json");
  assert.equal(unit2.topics.length, 7);
  assert.equal(unit2.unit.quizzes.length, 3);
  assert.equal(
    unit.unit.quizzes[0].selections.flatMap((selection) => selection.questionIds).length,
    21,
  );
});

test("the loader is on demand: a topic does not load unrelated lessons", async () => {
  const files = await contentFileMap();
  const requested = [];
  const fetchJson = async (path) => {
    requested.push(path);
    if (!files.has(path)) throw new Error(`fixture is missing ${path}`);
    return files.get(path);
  };
  const store = createContentStore({ fetchJson });
  const page = await store.page("topic", "world-1-2");
  assert.equal(page.lesson.id, "world-1-2");
  assert.deepEqual(requested, [
    "catalog.json",
    "world/routes.json",
    "world/topics/world-1-2.json",
    "world/banks/world-1-2.json",
  ]);
  assert.equal(
    requested.some((path) => path.includes("world-1-1")),
    false,
  );
});

test("unit practice loads only the seven selected topic banks", async () => {
  const files = await contentFileMap();
  const requested = [];
  const store = createContentStore({
    fetchJson: async (path) => {
      requested.push(path);
      return files.get(path);
    },
  });
  const page = await store.page("quiz", "world-1-practice");
  assert.equal(page.quiz.questionIds.length, 21);
  assert.equal(page.bank.questions.length, 79);
  assert.equal(requested.filter((path) => path.includes("/banks/")).length, 7);
  assert.equal(
    requested.some((path) => path.includes("/topics/")),
    false,
  );
});

test("route parsing and stale loads handle navigation changes", async () => {
  assert.deepEqual(parseRoute("#/topic/world-1-1?section=terms"), {
    type: "topic",
    id: "world-1-1",
    params: new URLSearchParams("section=terms"),
  });
  assert.equal(parseRoute("#/history?course=world").type, "history");
  assert.equal(parseRoute("#/topic/world-1-1/extra").type, "missing");
  let resolveOld;
  let resolveNew;
  const content = {
    page: (_type, id) =>
      new Promise((resolve) =>
        id === "old" ? (resolveOld = resolve) : (resolveNew = resolve),
      ),
  };
  const load = createRouteLoader(content);
  const old = load({ type: "topic", id: "old" });
  const newer = load({ type: "topic", id: "new" });
  await new Promise((resolve) => setImmediate(resolve));
  resolveNew({ id: "new" });
  assert.deepEqual(await newer, { data: { id: "new" }, stale: false });
  resolveOld({ id: "old" });
  assert.deepEqual(await old, { data: { id: "old" }, stale: true });
});

test("content failures are typed, retryable, and optional practice failures keep reading available", async () => {
  const files = await contentFileMap();
  let failCatalog = true;
  let failBank = true;
  const requested = [];
  const store = createContentStore({
    fetchJson: async (path) => {
      requested.push(path);
      if (path === "catalog.json" && failCatalog) throw new Error("offline");
      if (path.includes("/banks/") && failBank) throw new Error("practice unavailable");
      return files.get(path);
    },
  });
  await assert.rejects(store.catalog(), (error) => {
    assert.equal(error instanceof ContentLoadError, true);
    assert.equal(error.category, "network");
    return true;
  });
  failCatalog = false;
  assert.equal((await store.catalog()).length, 2);
  const page = await store.page("topic", "world-1-2");
  assert.equal(page.bank, null);
  assert.equal(page.optionalBankError.category, "network");
  failBank = false;
  const retry = await store.page("topic", "world-1-2");
  assert.equal(retry.bank.questions.length > 0, true);
  assert.equal(requested.filter((path) => path.includes("/banks/")).length, 2);
});

test("quiz engine preserves answer locking, scoring, and topic-scoped concepts", async () => {
  const bank = await readGenerated("world/banks/world-1-1.json");
  const engine = createQuizEngine(bank);
  const quiz = engine.quizById["world-1-1-quiz"];
  const attempt = engine.createAttempt(quiz.id, quiz.questionIds, "topic");
  const firstQuestion = engine.questionById[attempt.ids[0]];
  const wrong = (firstQuestion.correctAnswer + 1) % 4;
  assert.equal(engine.checkAnswer(attempt, wrong), true);
  assert.equal(engine.checkAnswer(attempt, firstQuestion.correctAnswer), false);
  assert.equal(engine.nextQuestion(attempt), true);
  while (attempt.index < attempt.ids.length - 1) {
    const question = engine.questionById[attempt.ids[attempt.index]];
    assert.equal(engine.checkAnswer(attempt, question.correctAnswer), true);
    assert.equal(engine.nextQuestion(attempt), true);
  }
  const lastQuestion = engine.questionById[attempt.ids[attempt.index]];
  assert.equal(engine.checkAnswer(attempt, lastQuestion.correctAnswer), true);
  assert.equal(engine.finish(attempt).ok, true);
  assert.equal(engine.validateAttempt(attempt), true);
  const result = engine.summarize(attempt);
  assert.equal(result.total, quiz.questionIds.length);
  assert.equal(result.correct, result.total - 1);
  assert.ok(result.weak.length > 0);
  assert.ok(Object.keys(engine.concepts).every((key) => key.includes("/")));
});

test("quiz v2 keeps test editing separate from practice feedback", () => {
  const bank = {
    revision: "fixture-v1",
    concepts: {},
    questions: [
      {
        id: "q-a",
        topicId: "fixture",
        concept: "ordering",
        prompt: "Which choice is correct?",
        choices: ["First", "Second", "Third"],
        correctAnswer: 2,
        explanation: "The third choice is the authored answer.",
        shuffleChoices: true,
      },
      {
        id: "q-b",
        topicId: "fixture",
        concept: "sequence",
        prompt: "Which step comes next?",
        choices: ["A", "B"],
        correctAnswer: 0,
        explanation: "The authored sequence starts with A.",
        sequenceSensitive: true,
        shuffleChoices: true,
      },
    ],
    quizzes: [{ id: "fixture-quiz", questionIds: ["q-a", "q-b"], quizType: "topic" }],
  };
  const engine = createQuizEngine(bank, {
    random: () => 0,
    idFactory: (() => {
      let index = 0;
      return () => `fixture-attempt-${++index}`;
    })(),
    now: () => "2026-09-20T00:00:00.000Z",
  });
  const testAttempt = engine.createAttempt("fixture-quiz", null, {
    feedbackMode: "test",
    selectionKind: "topic",
  });
  assert.deepEqual(testAttempt.choiceOrders["q-b"], [0, 1]);
  assert.notDeepEqual(testAttempt.choiceOrders["q-a"], [0, 1, 2]);
  const displayed = engine.displayedChoices(testAttempt, "q-a");
  assert.equal(displayed[2].originalIndex, 0);
  assert.equal(engine.selectAnswer(testAttempt, 0), true);
  assert.equal(engine.responseFor(testAttempt, "q-a").feedbackRevealed, false);
  assert.equal(engine.checkAnswer(testAttempt, 0), false);
  assert.equal(engine.nextQuestion(testAttempt), true);
  assert.equal(engine.selectAnswer(testAttempt, 0), true);
  assert.equal(engine.finish(testAttempt).ok, true);
  assert.equal(engine.summarize(testAttempt).correct, 1);
  assert.equal(engine.validateAttempt(testAttempt), true);
});

test("quiz snapshots preserve mappings and historical scores after a content change", () => {
  const bank = {
    revision: "fixture-before",
    concepts: {},
    questions: [
      {
        id: "snapshot-q",
        topicId: "fixture",
        concept: "history",
        prompt: "Original prompt",
        choices: ["Right", "Wrong"],
        correctAnswer: 0,
        explanation: "Original explanation",
      },
    ],
    quizzes: [{ id: "snapshot-quiz", questionIds: ["snapshot-q"], quizType: "topic" }],
  };
  const engine = createQuizEngine(bank, { now: () => "2026-09-20T00:00:00.000Z" });
  const attempt = engine.createAttempt("snapshot-quiz");
  assert.equal(engine.checkAnswer(attempt, 0), true);
  assert.equal(engine.finish(attempt).ok, true);
  bank.questions[0].correctAnswer = 1;
  bank.questions[0].prompt = "Changed prompt";
  assert.equal(engine.summarize(attempt).correct, 1);
  assert.equal(engine.questionForAttempt(attempt).prompt, "Original prompt");
  const reloaded = JSON.parse(JSON.stringify(attempt));
  assert.equal(engine.validateAttempt(reloaded), true);
  reloaded.choiceOrders["snapshot-q"] = [0, 0];
  assert.equal(engine.validateAttempt(reloaded), false);
});

test("legacy quiz attempts migrate without inventing time or first-exposure claims", () => {
  const bank = {
    concepts: {},
    questions: [
      {
        id: "legacy-q",
        topicId: "fixture",
        concept: "migration",
        prompt: "Legacy question",
        choices: ["A", "B"],
        correctAnswer: 1,
        explanation: "B is correct.",
      },
    ],
    quizzes: [{ id: "legacy-quiz", questionIds: ["legacy-q"], quizType: "topic" }],
  };
  const engine = createQuizEngine(bank);
  const migrated = engine.migrateAttempt({
    version: 1,
    quizId: "legacy-quiz",
    mode: "topic",
    ids: ["legacy-q"],
    index: 0,
    answers: { "legacy-q": 1 },
    complete: true,
  });
  assert.ok(migrated);
  assert.equal(migrated.version, 2);
  assert.equal(migrated.status, "complete");
  assert.equal(migrated.startedAt, null);
  assert.equal(migrated.completedAt, null);
  assert.equal(migrated.provenance.firstExposureKnown, false);
  assert.equal(engine.summarize(migrated).correct, 1);
});

test("quiz controls remain reversible, scoped, and honest about blanks", () => {
  const bank = {
    concepts: {},
    questions: [
      {
        id: "control-1",
        topicId: "fixture",
        concept: "controls",
        prompt: "One",
        choices: ["A", "B"],
        correctAnswer: 0,
        explanation: "A.",
      },
      {
        id: "control-2",
        topicId: "fixture",
        concept: "controls",
        prompt: "Two",
        choices: ["A", "B"],
        correctAnswer: 1,
        explanation: "B.",
      },
      {
        id: "control-3",
        topicId: "fixture",
        concept: "controls",
        prompt: "Three",
        choices: ["A", "B"],
        correctAnswer: 0,
        explanation: "A.",
      },
    ],
    quizzes: [
      {
        id: "control-quiz",
        questionIds: ["control-1", "control-2", "control-3"],
        quizType: "topic",
      },
    ],
  };
  const engine = createQuizEngine(bank, { now: () => "2026-09-20T00:00:00.000Z" });
  const attempt = engine.createAttempt("control-quiz");
  assert.equal(engine.toggleFlag(attempt, "control-1"), true);
  assert.deepEqual(engine.toggleElimination(attempt, "control-1", 0).eliminated, true);
  assert.equal(engine.selectAnswer(attempt, 0), true);
  assert.deepEqual(attempt.eliminatedChoiceIds["control-1"], []);
  assert.deepEqual(engine.toggleElimination(attempt, "control-1", 0), {
    ok: false,
    reason: "selected",
  });
  assert.equal(engine.toggleFlag(attempt, "control-1"), false);
  assert.equal(engine.setConfidence(attempt, "control-1", "unsure"), true);
  assert.equal(engine.checkAnswer(attempt, 0), true);
  assert.equal(engine.setConfidence(attempt, "control-1", null), false);
  assert.equal(engine.navigatorState(attempt)[0].checked, true);
  assert.equal(engine.nextQuestion(attempt), true);
  assert.equal(engine.previousQuestion(attempt), true);
  assert.equal(engine.nextQuestion(attempt), true);
  assert.equal(engine.nextQuestion(attempt), true);
  assert.equal(engine.progress(attempt).unanswered, 2);
  assert.equal(engine.finish(attempt).ok, false);
  const finished = engine.finish(attempt, { allowBlank: true });
  assert.equal(finished.ok, true);
  assert.equal(finished.result.answered, 1);
  assert.equal(finished.result.total, 3);
  assert.equal(engine.finish(attempt, { allowBlank: true }).ok, false);
  assert.equal(engine.validateAttempt(JSON.parse(JSON.stringify(attempt))), true);
});

test("result review planning ranks factual reasons and keeps the original attempt", () => {
  const bank = {
    revision: "review-plan-v1",
    concepts: {
      one: { id: "one", title: "One", section: "one", topicId: "fixture" },
      two: { id: "two", title: "Two", section: "two", topicId: "fixture" },
    },
    questions: [
      ...Array.from({ length: 5 }, (_, index) => ({
        id: `plan-${index + 1}`,
        topicId: "fixture",
        concept: index < 3 ? "one" : "two",
        prompt: `Question ${index + 1}`,
        choices: ["Right", "Wrong"],
        correctAnswer: 0,
        explanation: "The first choice is correct.",
      })),
    ],
    quizzes: [
      {
        id: "plan-quiz",
        questionIds: ["plan-1", "plan-2", "plan-3", "plan-4", "plan-5"],
        quizType: "topic",
        title: "Review plan",
      },
    ],
  };
  const engine = createQuizEngine(bank, { now: () => "2026-09-20T00:00:00.000Z" });
  const attempt = engine.createAttempt("plan-quiz");
  assert.equal(engine.checkAnswer(attempt, 1), true);
  engine.nextQuestion(attempt);
  engine.setConfidence(attempt, "plan-2", "unsure");
  assert.equal(engine.checkAnswer(attempt, 0), true);
  engine.nextQuestion(attempt);
  assert.equal(engine.checkAnswer(attempt, 0), true);
  assert.equal(engine.toggleFlag(attempt, "plan-3"), true);
  engine.nextQuestion(attempt);
  engine.nextQuestion(attempt);
  assert.equal(engine.finish(attempt, { allowBlank: true }).ok, true);

  const before = JSON.stringify(attempt);
  const plan = engine.reviewPlan(attempt);
  assert.deepEqual(plan.questionIds, ["plan-1", "plan-4", "plan-5", "plan-2"]);
  assert.equal(plan.questions.at(-1).reason, "You marked this answer uncertain.");
  assert.equal(plan.questionIds.includes("plan-3"), false);
  assert.ok(plan.sections.length <= 2);
  assert.equal(JSON.stringify(attempt), before);

  const html = resultsPage(
    {
      course: { id: "fixture", shortTitle: "Fixture" },
      quiz: engine.quizById["plan-quiz"],
      unit: { id: "fixture-1", number: 1, hasGuide: false, writingQuizzes: [] },
      topic: { id: "fixture-topic", code: "1.1" },
    },
    attempt,
    engine,
    { filters: [] },
  );
  assert.match(html, /Your answer:/);
  assert.match(html, /Correct answer:/);
  assert.match(html, /No answer selected\./);
  assert.match(html, /A SMALL NEXT STEP/);
  assert.doesNotMatch(html, /mastered|Strong areas|Needs practice/);
});

test("attempt storage keeps old sessions valid while preserving other quiz records", async () => {
  const values = new Map([
    [
      "page-one-attempts-v1",
      JSON.stringify({ "other-quiz": { quizId: "other-quiz", complete: false } }),
    ],
  ]);
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const store = createAttemptStore(() => storage);
  store.save({
    quizId: "world-1-1-quiz",
    version: 1,
    mode: "topic",
    ids: ["q1"],
    index: 0,
    answers: {},
    complete: false,
  });
  assert.equal(store.resume().quizId, "other-quiz");
  const parsed = JSON.parse(values.get("page-one-attempts-v1"));
  assert.ok(parsed["other-quiz"]);
  assert.ok(parsed["world-1-1-quiz"]);
});

test("writing engine keeps responses through review, scoring, revision, and length limits", async () => {
  const { quiz } = await readGenerated("world/writing/world-1-saq.json");
  const engine = createWritingEngine(quiz);
  const draft = engine.newDraft();
  assert.equal(engine.validate(draft), true);
  assert.equal(
    engine.updateResponse(draft, "a", "Answer with evidence and an explanation."),
    true,
  );
  assert.equal(
    engine.updateResponse(draft, "b", "Answer with evidence and an explanation."),
    true,
  );
  assert.equal(
    engine.updateResponse(draft, "c", "Answer with evidence and an explanation."),
    true,
  );
  assert.equal(engine.review(draft), true);
  assert.equal(engine.updateResponse(draft, "a", "Changed after review"), false);
  assert.equal(engine.setScore(draft, "a", 1), true);
  assert.equal(engine.setScore(draft, "b", 0), true);
  assert.equal(engine.setScore(draft, "c", 1), true);
  assert.equal(engine.total(draft), 2);
  engine.revise(draft);
  assert.equal(draft.responses.a.startsWith("Answer"), true);
  assert.equal(draft.scores.a, null);
  assert.equal(
    engine.updateResponse(draft, "a", "x".repeat(maxResponseLength + 1)),
    false,
  );
});

test("writing store reads the pre-architecture draft key", async () => {
  const { quiz } = await readGenerated("world/writing/world-1-saq.json");
  const legacy = {
    version: quiz.version,
    quizId: quiz.id,
    responses: { a: "A", b: "B", c: "C" },
    reviewed: false,
    scores: { a: null, b: null, c: null },
  };
  const values = new Map([["page-one-writing-v1", JSON.stringify(legacy)]]);
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const store = createWritingStore(quiz, () => storage);
  assert.equal(store.draft.responses.a, "A");
  assert.equal(store.save(), true);
  assert.ok(values.has(`page-one-writing:${quiz.id}:v${quiz.version}`));
});

test("content blocks escape text and image support stays declarative", () => {
  const html = renderBlocks([
    { type: "paragraph", text: "<script>alert(1)</script>" },
    { type: "list", items: ["One", "Two"] },
    { type: "table", caption: "A table", columns: ["Name", "Value"], rows: [["A", "1"]] },
  ]);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /<table>/);
});

test("image preparation emits responsive WebP variants without enlarging", async () => {
  const { default: sharp } = await import("sharp");
  const folder = await mkdtemp(join(tmpdir(), "page-one-image-"));
  const input = join(folder, "original.png");
  const output = join(folder, "assets");
  try {
    await sharp({
      create: { width: 900, height: 600, channels: 3, background: "#245548" },
    })
      .png()
      .toFile(input);
    const result = await prepareImage(input, output, "sample-map");
    assert.equal(result.width, 900);
    assert.deepEqual(
      result.variants.map((item) => item.width),
      [640],
    );
    const info = await sharp(join(output, result.file)).metadata();
    assert.equal(info.format, "webp");
    assert.equal(info.width, 900);
    assert.equal(info.height, 600);
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});

test("content compiles from folder discovery rather than a hardcoded topic list", async () => {
  const output = await compileContent(
    new URL("../", import.meta.url).pathname.replace(/\/$/, ""),
  );
  assert.equal(output.has("catalog.json"), true);
  assert.equal([...output.keys()].filter((path) => path.includes("/topics/")).length, 14);
  assert.equal([...output.keys()].filter((path) => path.includes("/banks/")).length, 14);
});

import test from "node:test";
import assert from "node:assert/strict";

import { createQuizEngine } from "../docs/app/quiz/engine.js";
import { summaryFor } from "../docs/app/quiz/store.js";
import {
  isFree,
  pickVariant,
  flattenQuestion,
  hasAnyValue,
  freeAnswered,
  questionFieldIds,
} from "../docs/app/quiz/free.js";
import { freeQuestionBody, freeReviewView } from "../docs/app/quiz/free-views.js";

const variant = (a, b) => ({
  stem: `Add ${a} and ${b}, then find the average.`,
  parts: [
    {
      id: "a",
      prompt: "Find the sum.",
      fields: [{ id: "a1", type: "number", label: "Sum:", key: a + b }],
    },
    {
      id: "b",
      prompt: "Find the average.",
      fields: [{ id: "b1", type: "number", label: "Average:", key: (a + b) / 2 }],
    },
  ],
  solution: [`${a} + ${b} = ${a + b}.`, `${a + b} / 2 = ${(a + b) / 2}.`],
});

const template = (id, variants) => ({
  id,
  topicId: "fixture-topic",
  concept: "s1",
  difficulty: "Core",
  skill: "solve",
  skillLabel: "Solve",
  skillCode: "1.A",
  format: "free",
  variants,
});

const bank = {
  courseId: "fixture",
  revision: "fixture-v1",
  questions: [
    template("t1", [variant(2, 4), variant(10, 20)]),
    template("t2", [variant(6, 8), variant(1, 3)]),
    {
      id: "m1",
      topicId: "fixture-topic",
      prompt: "A multiple-choice question",
      choices: ["A", "B", "C", "D"],
      correctAnswer: 1,
      explanation: "B.",
    },
  ],
  quizzes: [
    {
      id: "fixture-quiz",
      courseId: "fixture",
      unitId: "fixture-unit",
      topicId: "fixture-topic",
      title: "Typed quiz",
      quizType: "topic",
      questionIds: ["t1", "t2"],
    },
    {
      id: "fixture-mixed",
      courseId: "fixture",
      unitId: "fixture-unit",
      topicId: "fixture-topic",
      title: "Mixed",
      quizType: "topic",
      questionIds: ["t1", "m1"],
    },
  ],
};

function start(options = {}, quizId = "fixture-quiz", ids = ["t1", "t2"]) {
  let tick = 0;
  const engine = createQuizEngine(bank, {
    now: () => `2026-10-26T00:00:${String(tick++).padStart(2, "0")}.000Z`,
    idFactory: () => "attempt-fixture",
    random: () => 0,
  });
  const attempt = engine.createAttempt(quizId, ids, {
    selectionKind: "topic",
    feedbackMode: "practice",
    ...options,
  });
  return { engine, attempt };
}

// What the student has to type to get the current question right.
const answers = (attempt) => {
  const question = attempt.questionSnapshot.questions.find(
    (entry) => entry.id === attempt.currentQuestionId,
  );
  return Object.fromEntries(
    question.parts.flatMap((part) =>
      part.fields.map((field) => [field.id, String(field.key)]),
    ),
  );
};

test("helpers recognize typed questions and merge one variant into a normal question", () => {
  const t1 = bank.questions[0];
  assert.equal(isFree(t1), true);
  assert.equal(isFree(bank.questions[2]), false);
  assert.equal(
    pickVariant(t1, () => 0),
    0,
  );
  assert.equal(
    pickVariant(t1, () => 0.99),
    1,
  );
  assert.equal(pickVariant({ format: "free", variants: [] }), 0);
  const flat = flattenQuestion(t1, 1);
  assert.equal(flat.id, "t1");
  assert.equal(flat.variant, 1);
  assert.equal(flat.prompt, t1.variants[1].stem);
  assert.equal(flat.explanation, "10 + 20 = 30. 30 / 2 = 15.");
  assert.ok(!("variants" in flat));
  assert.equal(
    flattenQuestion(t1, 9).variant,
    0,
    "an unknown index falls back to the first",
  );
  assert.equal(flattenQuestion(bank.questions[2]), bank.questions[2]);
  assert.deepEqual(questionFieldIds(flat), ["a1", "b1"]);
  assert.equal(hasAnyValue({ values: { a1: "  ", b1: "" } }), false);
  assert.equal(hasAnyValue({ values: { a1: "3" } }), true);
  assert.equal(freeAnswered({ values: {}, revealed: true }), true);
  assert.equal(freeAnswered({ values: {} }), false);
});

test("an attempt snapshots one variant per question and keeps the template's id", () => {
  const { attempt, engine } = start();
  assert.deepEqual(attempt.orderedQuestionIds, ["t1", "t2"]);
  const [first] = attempt.questionSnapshot.questions;
  assert.equal(first.id, "t1");
  assert.equal(first.format, "free");
  assert.ok(first.parts.length === 2 && first.stem.startsWith("Add 2 and 4"));
  assert.ok(!("variants" in first));
  assert.deepEqual(attempt.choiceOrders.t1, []);
  assert.equal(engine.validateAttempt(attempt), true);
  const later = createQuizEngine(bank, { random: () => 0.99 }).createAttempt(
    "fixture-quiz",
    ["t1", "t2"],
    { selectionKind: "topic", feedbackMode: "practice" },
  );
  assert.equal(
    later.questionSnapshot.questions[0].variant,
    1,
    "a new attempt can see new numbers",
  );
});

test("practice mode: empty and unreadable entries are not tries, wrong ones are", () => {
  const { engine, attempt } = start();
  assert.equal(engine.checkValues(attempt, {}).reason, "empty");
  assert.equal(engine.checkValues(attempt, { a1: "   " }).reason, "empty");
  const unreadable = engine.checkValues(attempt, { a1: "six", b1: "3" });
  assert.equal(unreadable.ok, false);
  assert.equal(unreadable.reason, "invalid");
  assert.equal(engine.responseFor(attempt, "t1").tries, 0);
  const wrong = engine.checkValues(attempt, { a1: "7", b1: "3" });
  assert.deepEqual([wrong.ok, wrong.correct, wrong.tries], [true, false, 1]);
  const response = engine.responseFor(attempt, "t1");
  assert.deepEqual(response.marks, { a1: "no", b1: "ok" });
  assert.equal(
    response.feedbackRevealed,
    false,
    "the solution stays hidden until it is solved",
  );
});

test("a question solved on the first check scores; solved after a miss does not", () => {
  const { engine, attempt } = start();
  const first = engine.checkValues(attempt, answers(attempt));
  assert.deepEqual([first.correct, first.tries], [true, 0]);
  assert.equal(engine.isCorrect(attempt, "t1"), true);
  assert.equal(engine.responseFor(attempt, "t1").feedbackRevealed, true);
  assert.equal(engine.checkValues(attempt, answers(attempt)).reason, "done");

  engine.nextQuestion(attempt);
  assert.equal(attempt.currentQuestionId, "t2");
  assert.equal(engine.checkValues(attempt, { a1: "1", b1: "1" }).correct, false);
  const solved = engine.checkValues(attempt, answers(attempt));
  assert.equal(solved.correct, true);
  assert.equal(engine.responseFor(attempt, "t2").solved, true);
  assert.equal(
    engine.isCorrect(attempt, "t2"),
    false,
    "a retry does not count as correct",
  );

  const finished = engine.finish(attempt);
  assert.equal(finished.ok, true);
  assert.deepEqual(
    [
      finished.result.correct,
      finished.result.answered,
      finished.result.total,
      finished.result.percent,
    ],
    [1, 2, 2, 50],
  );
  assert.equal(finished.result.skills[0].total, 2);
});

test("asking for the solution ends the question as not correct and locks the boxes", () => {
  const { engine, attempt } = start();
  assert.equal(engine.revealSolution(attempt), true);
  const response = engine.responseFor(attempt, "t1");
  assert.deepEqual([response.revealed, response.correct], [true, false]);
  assert.equal(engine.answered(attempt, "t1"), true);
  assert.equal(engine.saveValues(attempt, { a1: "6" }), false);
  assert.equal(engine.checkValues(attempt, { a1: "6" }).ok, false);
  assert.equal(engine.revealSolution(attempt), false, "it can only be revealed once");
});

test("saveValues keeps only fields the question has", () => {
  const { engine, attempt } = start();
  assert.equal(engine.saveValues(attempt, { a1: "7", zzz: "9" }), true);
  assert.deepEqual(engine.responseFor(attempt, "t1").values, { a1: "7" });
  assert.equal(engine.validateAttempt(attempt), true);
  assert.equal(engine.gradeCurrent(attempt).fields.a1.status, "wrong");
  assert.equal(engine.gradeCurrent(attempt).fields.b1.status, "empty");
});

test("test mode grades everything at the end, never earlier", () => {
  const { engine, attempt } = start({ feedbackMode: "test" });
  assert.equal(engine.checkValues(attempt, answers(attempt)).ok, false);
  assert.equal(engine.revealSolution(attempt), false);
  engine.saveValues(attempt, answers(attempt));
  assert.equal(engine.responseFor(attempt, "t1").feedbackRevealed, false);
  engine.nextQuestion(attempt);
  engine.saveValues(attempt, { a1: "1", b1: "1" });
  const blocked = engine.finish(attempt);
  assert.equal(blocked.ok, true);
  assert.deepEqual([blocked.result.correct, blocked.result.answered], [1, 2]);
  assert.equal(
    attempt.responses.t1.correct,
    true,
    "the result is stored when the attempt finishes",
  );
  assert.equal(attempt.responses.t2.correct, false);
});

test("finishing with an untouched typed question asks first, and allows it on request", () => {
  const { engine, attempt } = start({ feedbackMode: "test" });
  engine.saveValues(attempt, answers(attempt));
  const refused = engine.finish(attempt);
  assert.equal(refused.ok, false);
  assert.deepEqual(refused.unanswered, ["t2"]);
  const allowed = engine.finish(attempt, { allowBlank: true });
  assert.equal(allowed.ok, true);
  assert.deepEqual(
    [allowed.result.correct, allowed.result.answered, allowed.result.total],
    [1, 1, 2],
  );
});

test("typed and multiple-choice questions can share one attempt", () => {
  const { engine, attempt } = start({}, "fixture-mixed", ["t1", "m1"]);
  assert.equal(engine.checkValues(attempt, answers(attempt)).correct, true);
  engine.nextQuestion(attempt);
  assert.equal(engine.checkValues(attempt, { a1: "1" }).reason, "question");
  const shown = engine.displayedChoices(attempt, "m1");
  const right = shown.findIndex((choice) => choice.original === 1);
  engine.selectAnswer(attempt, right >= 0 ? right : 1);
  const finished = engine.finish(attempt);
  assert.equal(finished.ok, true);
  assert.equal(finished.result.answered, 2);
  assert.equal(finished.result.total, 2);
});

test("the stored summary scores typed answers by the result saved when they were checked", () => {
  const { engine, attempt } = start();
  engine.checkValues(attempt, answers(attempt));
  engine.nextQuestion(attempt);
  engine.revealSolution(attempt);
  engine.finish(attempt);
  const summary = summaryFor(attempt);
  assert.equal(summary.questionCount, 2);
  assert.equal(summary.correct, 1);
  assert.equal(summary.answered, 2);
  assert.equal(summary.scoreKnown, true);
});

test("an attempt with a mangled typed answer fails validation instead of loading", () => {
  const { engine, attempt } = start();
  engine.saveValues(attempt, { a1: "6" });
  const copy = JSON.parse(JSON.stringify(attempt));
  assert.equal(engine.validateAttempt(copy), true);
  copy.responses.t1.values.nope = "1";
  assert.equal(engine.validateAttempt(copy), false);
  const wrongType = JSON.parse(JSON.stringify(attempt));
  wrongType.responses.t1.values.a1 = 6;
  assert.equal(engine.validateAttempt(wrongType), false);
  const noParts = JSON.parse(JSON.stringify(attempt));
  noParts.questionSnapshot.questions[0].parts = [];
  assert.equal(engine.validateAttempt(noParts), false);
});

test("the question and review views show the stem, the boxes, and escape typed text", () => {
  const { engine, attempt } = start();
  const question = engine.questionForAttempt(attempt, "t1");
  engine.saveValues(attempt, { a1: "<b>6</b>" });
  const response = engine.responseFor(attempt, "t1");
  const body = freeQuestionBody(attempt, question, response, "t1");
  const html = body.markup;
  assert.match(html, /data-free-field="a1"/);
  assert.match(html, /data-free-field="b1"/);
  assert.ok(!html.includes("<b>6</b>"), "typed text is escaped");
  assert.match(html, /&lt;b&gt;6&lt;\/b&gt;/);
  engine.revealSolution(attempt);
  const review = freeReviewView(question, engine.responseFor(attempt, "t1"));
  assert.match(String(review), /1 \+ 1|2 \+ 4 = 6/);
});

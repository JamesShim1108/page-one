import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

import {
  QUESTION_QUALITY,
  validateQuestionQuality,
  requireRepeatedFeedbackLimit,
  validateBlocks,
} from "../scripts/lib/validate.mjs";
import { createQuizEngine } from "../docs/app/quiz/engine.js";
import { summaryFor } from "../docs/app/quiz/store.js";
import { skillTotals, historyPage } from "../docs/app/history.js";
import { renderSource } from "../docs/app/blocks.js";
import { excerpts } from "../docs/content/world-history/excerpts.js";
import { skills } from "../docs/content/world-history/skills.js";

const root = new URL("../", import.meta.url);
const readGenerated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));

function fixtureQuestion(id, correct, choices, feedback = `Feedback for ${id}`) {
  return {
    id,
    choices,
    correctAnswer: correct,
    choiceExplanations: choices.map((_, index) => `${feedback} choice ${index}`),
    distinguisher: `Distinguisher for ${id}`,
  };
}

test("answer-length checks reject a bank where the longest choice is usually correct", () => {
  const biased = Array.from({ length: 10 }, (_, index) =>
    fixtureQuestion(`b${index}`, 0, [
      "A much longer and more detailed correct answer with qualifications",
      "Short wrong answer",
      "Another short one",
      "Brief distractor",
    ]),
  );
  assert.throws(() => validateQuestionQuality(biased, "fixture"), /longest in 10 of 10/);
});

test("answer-length checks also reject a bank where the correct choice is never longest", () => {
  const reversed = Array.from({ length: 10 }, (_, index) =>
    fixtureQuestion(`r${index}`, 0, [
      "Correct but short",
      "A wrong answer padded out to be the longest choice here",
      "Another wrong answer of medium length",
      "A third wrong answer",
    ]),
  );
  assert.throws(() => validateQuestionQuality(reversed, "fixture"), /only 0 of 10/);
});

test("answer-length checks accept a balanced bank", () => {
  const balanced = Array.from({ length: 10 }, (_, index) =>
    fixtureQuestion(
      `ok${index}`,
      0,
      index < 3
        ? [
            "Correct answer, a bit longer",
            "Wrong answer number one",
            "Wrong answer number two",
            "Wrong answer number 3",
          ]
        : [
            "Correct answer text here",
            "A wrong answer that is longer",
            "Wrong answer two text",
            "Wrong answer three tx",
          ],
    ),
  );
  assert.doesNotThrow(() => validateQuestionQuality(balanced, "fixture"));
});

test("pasted feedback text is rejected", () => {
  const pasted = [1, 2, 3].map((index) => ({
    ...fixtureQuestion(`p${index}`, 0, ["a", "b", "c", "d"]),
    distinguisher: "The best answer directly matches the prompt.",
  }));
  assert.throws(() => requireRepeatedFeedbackLimit(pasted, "fixture"), /appears 3 times/);
  assert.equal(QUESTION_QUALITY.maxRepeatedFeedback, 2);
});

test("every World History question names a valid AP skill", async () => {
  const skillIds = new Set(skills.items.map((item) => item.id));
  const reasoningIds = new Set(skills.reasoning.map((item) => item.id));
  const files = (await readdir(new URL("docs/generated/world/banks/", root))).filter(
    (name) => name.endsWith(".json"),
  );
  assert.ok(files.length >= 14);
  for (const file of files) {
    const bank = await readGenerated(`world/banks/${file}`);
    for (const question of bank.questions) {
      assert.ok(skillIds.has(question.skill), `${question.id} skill`);
      assert.ok(
        question.skillLabel,
        `${question.id} carries its label for saved attempts`,
      );
      if (question.reasoning) assert.ok(reasoningIds.has(question.reasoning));
      if (question.skill === "connections") assert.ok(question.reasoning, question.id);
    }
  }
});

test("Unit 2 stimulus sets use cited sources and every topic tests sourcing", async () => {
  for (let number = 1; number <= 7; number += 1) {
    const bank = await readGenerated(`world/banks/world-2-${number}.json`);
    const blocks = bank.questions.flatMap((question) => question.stimulusBlocks || []);
    assert.ok(blocks.length >= 8, `topic 2.${number} has stimulus questions`);
    for (const block of blocks) {
      assert.equal(block.type, "source");
      if (block.sourceType !== "original") assert.ok(block.citation, block.id);
    }
    assert.ok(
      bank.questions.some((question) => question.skill === "sourcing"),
      `topic 2.${number} includes a sourcing question`,
    );
  }
});

test("excerpt edits and ellipses are well formed", () => {
  for (const excerpt of Object.values(excerpts)) {
    assert.doesNotThrow(() => validateBlocks([excerpt], new Map(), excerpt.id));
    for (const edit of excerpt.edits || []) {
      assert.ok(excerpt.text.includes(edit.shown), `${excerpt.id}: ${edit.shown}`);
      assert.match(edit.shown, /^\[.*\]$/, "editorial substitutions are bracketed");
    }
    assert.doesNotMatch(excerpt.text, /\.\.\./, `${excerpt.id} uses spaced ellipses`);
    if (excerpt.sourceType === "original") assert.match(excerpt.attribution, /Page One/);
  }
  const html = renderSource(excerpts.originalMusaLegacy);
  assert.match(html, /Written by Page One/);
});

test("results, saved summaries, and history group answers by AP skill", async () => {
  const bank = await readGenerated("world/banks/world-2-4.json");
  const engine = createQuizEngine(bank);
  const quiz = engine.quizById["world-2-4-quiz"];
  const attempt = engine.createAttempt(quiz.id, quiz.questionIds, "topic");
  const first = engine.questionForAttempt(attempt, attempt.ids[0]);
  for (const [index, id] of attempt.ids.entries()) {
    const question = engine.questionForAttempt(attempt, id);
    const choice =
      index === 0 ? (question.correctAnswer + 1) % 4 : question.correctAnswer;
    assert.equal(engine.checkAnswer(attempt, choice), true);
    if (index < attempt.ids.length - 1) engine.nextQuestion(attempt);
  }
  assert.equal(engine.finish(attempt).ok, true);
  const result = engine.summarize(attempt);
  const missed = result.skills.find((skill) => skill.id === first.skill);
  assert.equal(missed.total - missed.correct, 1);
  assert.equal(
    result.skills.reduce((sum, skill) => sum + skill.total, 0),
    attempt.ids.length,
  );

  const summary = summaryFor({ ...attempt, courseId: "world", status: "complete" });
  assert.equal(
    summary.skills[first.skill].total - summary.skills[first.skill].correct,
    1,
  );
  const totals = skillTotals([summary, summary]);
  const combined = totals.find((item) => item.id === first.skill);
  assert.equal(combined.attempts, 2);
  assert.equal(combined.total, summary.skills[first.skill].total * 2);
  const html = historyPage({
    courses: [{ id: "world", shortTitle: "AP World", status: "ready" }],
    attempts: [summary],
    courseId: "world",
  });
  assert.match(html, /AP skills across completed attempts/);
});

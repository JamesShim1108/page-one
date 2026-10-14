import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { validatePracticeTest, PRACTICE_TEST } from "../scripts/lib/validate.mjs";
import { excerptSourceFor } from "../scripts/lib/excerpt-sources.mjs";
import { excerpts } from "../docs/content/world-history/excerpts.js";
import { unitPage } from "../docs/app/views/catalog.js";

const root = new URL("../", import.meta.url);
const readGenerated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));

const source = (id, sourceType = "original") => ({
  id,
  type: "source",
  sourceType,
  source: "CED fixture concept",
  amsco_review: "pending",
  attribution: "Fixture",
  text: "Fixture passage.",
});

function item(id, stimulus, prompt = `Stem ${id}?`, correct = 0) {
  const choices = ["Alpha choice", "Bravo choice", "Charlie choice", "Delta choice"].map(
    (choice) => `${choice} ${id}`,
  );
  return {
    id,
    prompt,
    choices,
    correctAnswer: correct,
    choiceExplanations: choices.map((choice) => `Because ${choice}`),
    nearMissIndex: (correct + 1) % 4,
    distinguisher: `Distinguisher ${id}`,
    stimulusId: stimulus.id,
    stimulusBlocks: [stimulus],
  };
}

test("practice test validation accepts AP-style sets and rejects broken ones", () => {
  const a = source("fixture-a"),
    b = source("fixture-b");
  const good = [item("q1", a), item("q2", a, "Stem 2?", 1), item("q3", b), item("q4", b)];
  assert.deepEqual(validatePracticeTest({ practiceTest: true }, good, "fixture"), {
    questionCount: 4,
    setCount: 2,
  });
  const lone = [item("q1", a), item("q2", a), item("q3", b)];
  assert.throws(
    () => validatePracticeTest({ practiceTest: true }, lone, "fixture"),
    /used by 1/,
  );
  const five = Array.from({ length: 5 }, (_, i) => item(`q${i}`, a));
  assert.throws(
    () => validatePracticeTest({ practiceTest: true }, five, "fixture"),
    /used by 5/,
  );
  const missing = [item("q1", a), { ...item("q2", a), stimulusId: undefined }];
  assert.throws(
    () => validatePracticeTest({ practiceTest: true }, missing, "fixture"),
    /stimulusId/,
  );
  const wrong = [item("q1", a), { ...item("q2", a), stimulusId: "fixture-b" }];
  assert.throws(
    () => validatePracticeTest({ practiceTest: true }, wrong, "fixture"),
    /does not match/,
  );
  const repeated = [item("q1", a, "Same?"), item("q2", a, "Same?")];
  assert.throws(
    () => validatePracticeTest({ practiceTest: true }, repeated, "fixture"),
    /stem repeats/,
  );
  const split = [item("q1", a), item("q2", b), item("q3", b), item("q4", a)];
  assert.throws(
    () => validatePracticeTest({ practiceTest: true }, split, "fixture"),
    /appear together/,
  );
});

test("every excerpt records provenance and quoted excerpts name a verifiable edition", () => {
  for (const excerpt of Object.values(excerpts)) {
    assert.equal(excerpt.type, "source", excerpt.id);
    assert.ok(["primary", "original"].includes(excerpt.sourceType), excerpt.id);
    assert.ok(excerpt.source?.trim(), `${excerpt.id} needs source`);
    assert.equal(excerpt.amsco_review, "pending", excerpt.id);
    assert.doesNotMatch(excerpt.text, /—/, `${excerpt.id} contains an em dash`);
    if (excerpt.sourceType === "primary") {
      assert.ok(excerptSourceFor(excerpt.id), `${excerpt.id} has no registered edition`);
      assert.ok(excerpt.citation, excerpt.id);
      for (const edit of excerpt.edits || [])
        assert.ok(excerpt.text.includes(edit.shown));
    } else {
      assert.match(excerpt.attribution, /Page One/, excerpt.id);
      assert.match(excerpt.source, /^CED Topic \d\.\d+/, excerpt.id);
    }
  }
});

test("ready units with a practice test meet the AP set structure in generated output", async () => {
  for (let number = 1; number <= 9; number++) {
    const data = await readGenerated(`world/units/world-${number}.json`);
    const summary = data.unit.practiceTest;
    if (!summary) continue;
    const quiz = (await readGenerated(`world/quizzes/${summary.id}.json`)).quiz;
    assert.equal(quiz.practiceTest, true);
    assert.ok(quiz.questionIds.length <= PRACTICE_TEST.maxQuestions);
    assert.equal(quiz.questionIds.length, summary.questionCount);
    const banks = await Promise.all(
      [...new Set(quiz.selections.map((s) => s.topicId))].map((id) =>
        readGenerated(`world/banks/${id}.json`),
      ),
    );
    const lookup = new Map(
      banks.flatMap((bank) => bank.questions.map((question) => [question.id, question])),
    );
    const questions = quiz.questionIds.map((id) => lookup.get(id));
    validatePracticeTest(quiz, questions, summary.id);
    for (const question of questions) {
      assert.ok(question.skill, question.id);
      assert.equal(question.choices.length, 4);
      assert.ok(Number.isInteger(question.correctAnswer));
    }
    const writing = data.unit.writingQuizzes.filter((w) => w.exerciseType === "saq");
    assert.ok(writing.length > 0, `Unit ${number} needs an SAQ`);
    const html = unitPage(data);
    assert.ok(html.includes(`href="#/quiz/${summary.id}"`));
    assert.ok(
      html.indexOf("<h2>Practice Test</h2>") < html.indexOf("<h2>Practice Quiz</h2>"),
    );
  }
});

test("topic practice pools never include practice test questions", async () => {
  const pools = await readGenerated("world/custom-practice.json");
  for (let number = 1; number <= 9; number++) {
    const data = await readGenerated(`world/units/world-${number}.json`);
    if (!data.unit.practiceTest) continue;
    const quiz = (await readGenerated(`world/quizzes/${data.unit.practiceTest.id}.json`))
      .quiz;
    const reserved = new Set(quiz.questionIds);
    for (const pool of pools.pools || pools)
      for (const id of pool.questionIds || []) assert.ok(!reserved.has(id), id);
  }
});

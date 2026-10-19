import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { skills } from "../docs/content/ap-precalculus/skills.js";

const root = new URL("../", import.meta.url);
const generated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));

// Topic codes and titles of Unit 1 in the AP Precalculus Course and Exam Description.
const UNIT_ONE = [
  ["1.1", "Change in Tandem"],
  ["1.2", "Rates of Change"],
  ["1.3", "Rates of Change in Linear and Quadratic Functions"],
  ["1.4", "Polynomial Functions and Rates of Change"],
  ["1.5", "Polynomial Functions and Complex Zeros"],
  ["1.6", "Polynomial Functions and End Behavior"],
  ["1.7", "Rational Functions and End Behavior"],
  ["1.8", "Rational Functions and Zeros"],
  ["1.9", "Rational Functions and Vertical Asymptotes"],
  ["1.10", "Rational Functions and Holes"],
  ["1.11", "Equivalent Representations of Polynomial and Rational Expressions"],
  ["1.12", "Transformations of Functions"],
  ["1.13", "Function Model Selection and Assumption Articulation"],
  ["1.14", "Function Model Construction and Application"],
];

const LATER_UNITS = [
  [2, "Exponential and Logarithmic Functions"],
  [3, "Trigonometric and Polar Functions"],
  [4, "Functions Involving Parameters, Vectors, and Matrices"],
];

test("the catalog lists AP Precalculus after the other courses with its ready topics", async () => {
  const catalog = await generated("catalog.json");
  const course = catalog.courses.find((entry) => entry.id === "precalculus");
  assert.ok(course, "precalculus is in the catalog");
  assert.equal(course.title, "AP Precalculus");
  assert.equal(course.status, "ready");
  assert.equal(course.order, 3);
  assert.equal(course.readyTopicCount, UNIT_ONE.length);
  assert.deepEqual(
    catalog.courses.map((entry) => entry.order),
    [1, 2, 3],
  );
});

test("Unit 1 has every CED topic in order, with stable IDs", async () => {
  const unit = await generated("precalculus/units/precalculus-1.json");
  assert.equal(unit.unit.status, "ready");
  assert.equal(unit.topics.length, UNIT_ONE.length);
  UNIT_ONE.forEach(([code, title], index) => {
    const topic = unit.topics[index];
    assert.equal(topic.code, code);
    assert.equal(topic.title, title);
    assert.equal(topic.id, `precalculus-1-${index + 1}`);
    assert.equal(topic.status, "ready");
  });
});

test("Units 2 to 4 are named placeholders until they are written", async () => {
  for (const [number, title] of LATER_UNITS) {
    const { unit, topics } = await generated(
      `precalculus/units/precalculus-${number}.json`,
    );
    assert.equal(unit.title, title);
    assert.equal(unit.status, "soon");
    assert.equal(topics.length, 0);
  }
});

test("every topic has a lesson, a bank of ten tagged questions, and two quizzes", async () => {
  const skillIds = new Set(skills.items.map((item) => item.id));
  assert.equal(skillIds.size, 8);
  for (let n = 1; n <= UNIT_ONE.length; n += 1) {
    const id = `precalculus-1-${n}`;
    const bank = await generated(`precalculus/banks/${id}.json`);
    const lesson = await generated(`precalculus/topics/${id}.json`);
    assert.ok(lesson.lesson.sections.length >= 3, `${id} has at least three sections`);
    assert.equal(bank.questions.length, 10, `${id} has ten questions`);
    assert.deepEqual(
      bank.quizzes.map((quiz) => quiz.id),
      [`${id}-quick`, `${id}-quiz`],
    );
    const answerSlots = new Set();
    for (const question of bank.questions) {
      assert.ok(skillIds.has(question.skill), `${question.id} uses a course skill`);
      assert.equal(question.choices.length, 4);
      assert.ok(question.correctAnswer >= 0 && question.correctAnswer < 4);
      answerSlots.add(question.correctAnswer);
    }
    assert.ok(answerSlots.size >= 3, `${id} varies the position of the correct answer`);
  }
});

test("the Unit 1 practice quiz draws from every topic and never repeats a question", async () => {
  const { unit } = await generated("precalculus/units/precalculus-1.json");
  const [quiz] = unit.quizzes;
  assert.equal(quiz.selections.length, UNIT_ONE.length);
  const seen = new Set();
  for (const selection of quiz.selections) {
    const bank = await generated(`precalculus/banks/${selection.topicId}.json`);
    const known = new Set(bank.questions.map((question) => question.id));
    assert.equal(selection.questionIds.length, 2);
    for (const id of selection.questionIds) {
      assert.ok(known.has(id), `${id} exists in its own bank`);
      assert.ok(!seen.has(id), `${id} is not reused`);
      seen.add(id);
    }
  }
});

test("custom practice excludes the questions reserved for the unit quiz", async () => {
  const { unit } = await generated("precalculus/units/precalculus-1.json");
  const reserved = new Set(
    unit.quizzes.flatMap((quiz) => quiz.selections.flatMap((entry) => entry.questionIds)),
  );
  const ledger = await generated("precalculus/custom-practice.json");
  assert.equal(ledger.pools.length, UNIT_ONE.length);
  for (const pool of ledger.pools) {
    assert.ok(pool.questionIds.length >= 4);
    assert.ok(pool.questionIds.every((id) => !reserved.has(id)));
  }
});

test("lessons teach in plain text and link only to real sections", async () => {
  const topicIds = UNIT_ONE.map((_, index) => `precalculus-1-${index + 1}`);
  const lessons = new Map();
  for (const id of topicIds)
    lessons.set(id, (await generated(`precalculus/topics/${id}.json`)).lesson);
  for (const lesson of lessons.values()) {
    for (const connection of lesson.connections) {
      for (const link of connection.links) {
        const target = lessons.get(link.topicId);
        assert.ok(target, `${lesson.id} links to ${link.topicId}`);
        assert.ok(
          target.sections.some((section) => section.id === link.sectionId),
          `${lesson.id} links to section ${link.topicId}/${link.sectionId}`,
        );
      }
    }
    const text = JSON.stringify(lesson);
    assert.ok(!text.includes("—"), `${lesson.id} avoids em dashes`);
    assert.ok(!/<[a-z][^>]*>/i.test(text), `${lesson.id} contains no markup`);
  }
});

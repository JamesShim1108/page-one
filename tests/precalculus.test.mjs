import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { skills } from "../docs/content/ap-precalculus/skills.js";

const root = new URL("../", import.meta.url);
const generated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));

// Topic codes and titles of Units 1 to 3 in the AP Precalculus Course and Exam Description.
const UNITS = [
  {
    number: 1,
    title: "Polynomial and Rational Functions",
    // The CED splits each unit's progress checks into two parts; `split` is the last topic of Part 1.
    split: 6,
    topics: [
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
    ],
  },
  {
    number: 2,
    title: "Exponential and Logarithmic Functions",
    split: 8,
    topics: [
      ["2.1", "Change in Arithmetic and Geometric Sequences"],
      ["2.2", "Change in Linear and Exponential Functions"],
      ["2.3", "Exponential Functions"],
      ["2.4", "Exponential Function Manipulation"],
      ["2.5", "Exponential Function Context and Data Modeling"],
      ["2.6", "Competing Function Model Validation"],
      ["2.7", "Composition of Functions"],
      ["2.8", "Inverse Functions"],
      ["2.9", "Logarithmic Expressions"],
      ["2.10", "Inverses of Exponential Functions"],
      ["2.11", "Logarithmic Functions"],
      ["2.12", "Logarithmic Function Manipulation"],
      ["2.13", "Exponential and Logarithmic Equations and Inequalities"],
      ["2.14", "Logarithmic Function Context and Data Modeling"],
      ["2.15", "Semi-log Plots"],
    ],
  },
  {
    number: 3,
    title: "Trigonometric and Polar Functions",
    split: 7,
    topics: [
      ["3.1", "Periodic Phenomena"],
      ["3.2", "Sine, Cosine, and Tangent"],
      ["3.3", "Sine and Cosine Function Values"],
      ["3.4", "Sine and Cosine Function Graphs"],
      ["3.5", "Sinusoidal Functions"],
      ["3.6", "Sinusoidal Function Transformations"],
      ["3.7", "Sinusoidal Function Context and Data Modeling"],
      ["3.8", "The Tangent Function"],
      ["3.9", "Inverse Trigonometric Functions"],
      ["3.10", "Trigonometric Equations and Inequalities"],
      ["3.11", "The Secant, Cosecant, and Cotangent Functions"],
      ["3.12", "Equivalent Representations of Trigonometric Functions"],
      ["3.13", "Trigonometry and Polar Coordinates"],
      ["3.14", "Polar Function Graphs"],
      ["3.15", "Rates of Change in Polar Functions"],
    ],
  },
];
const ALL_TOPIC_IDS = UNITS.flatMap((unit) =>
  unit.topics.map((_, index) => `precalculus-${unit.number}-${index + 1}`),
);

test("the catalog lists AP Precalculus after the other courses with its ready topics", async () => {
  const catalog = await generated("catalog.json");
  const course = catalog.courses.find((entry) => entry.id === "precalculus");
  assert.ok(course, "precalculus is in the catalog");
  assert.equal(course.title, "AP Precalculus");
  assert.equal(course.status, "ready");
  assert.equal(course.order, 3);
  assert.equal(course.readyTopicCount, ALL_TOPIC_IDS.length);
  assert.deepEqual(
    catalog.courses.map((entry) => entry.order),
    [1, 2, 3],
  );
});

test("Units 1 to 3 have every CED topic in order, with stable IDs", async () => {
  for (const { number, title, topics } of UNITS) {
    const unit = await generated(`precalculus/units/precalculus-${number}.json`);
    assert.equal(unit.unit.title, title);
    assert.equal(unit.unit.status, "ready");
    assert.equal(unit.topics.length, topics.length);
    topics.forEach(([code, topicTitle], index) => {
      const topic = unit.topics[index];
      assert.equal(topic.code, code);
      assert.equal(topic.title, topicTitle);
      assert.equal(topic.id, `precalculus-${number}-${index + 1}`);
      assert.equal(topic.status, "ready");
    });
  }
});

test("Unit 4 is a named placeholder until it is written", async () => {
  const { unit, topics } = await generated("precalculus/units/precalculus-4.json");
  assert.equal(unit.title, "Functions Involving Parameters, Vectors, and Matrices");
  assert.equal(unit.status, "soon");
  assert.equal(topics.length, 0);
});

test("every topic has a lesson, a bank of ten tagged questions, and two quizzes", async () => {
  const skillIds = new Set(skills.items.map((item) => item.id));
  assert.equal(skillIds.size, 8);
  for (const id of ALL_TOPIC_IDS) {
    const bank = await generated(`precalculus/banks/${id}.json`);
    const lesson = await generated(`precalculus/topics/${id}.json`);
    assert.ok(lesson.lesson.sections.length >= 2, `${id} has at least two sections`);
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

test("each unit's practice is split into two parts at the same topic as the CED", async () => {
  const seen = new Set();
  for (const { number, split, topics } of UNITS) {
    const { unit } = await generated(`precalculus/units/precalculus-${number}.json`);
    assert.deepEqual(
      unit.quizzes.map((quiz) => quiz.id),
      [`precalculus-${number}-practice`, `precalculus-${number}-practice-2`],
    );
    const [partOne, partTwo] = unit.quizzes;
    const ids = topics.map((_, index) => `precalculus-${number}-${index + 1}`);
    assert.deepEqual(
      partOne.selections.map((selection) => selection.topicId),
      ids.slice(0, split),
    );
    assert.deepEqual(
      partTwo.selections.map((selection) => selection.topicId),
      ids.slice(split),
    );
    const count = (quiz) =>
      quiz.selections.reduce((sum, s) => sum + s.questionIds.length, 0);
    assert.equal(count(partOne), 3 * split);
    assert.equal(count(partTwo), 3 * (topics.length - split));
    for (const selection of [...partOne.selections, ...partTwo.selections]) {
      const bank = await generated(`precalculus/banks/${selection.topicId}.json`);
      const known = new Set(bank.questions.map((question) => question.id));
      assert.equal(selection.questionIds.length, 3);
      for (const id of selection.questionIds) {
        assert.ok(known.has(id), `${id} exists in its own bank`);
        assert.ok(!seen.has(id), `${id} is not reused`);
        seen.add(id);
      }
    }
  }
});

test("lessons list the CED learning objectives with their codes", async () => {
  for (const { number, topics } of UNITS) {
    for (let n = 1; n <= topics.length; n += 1) {
      const { lesson } = await generated(
        `precalculus/topics/precalculus-${number}-${n}.json`,
      );
      assert.ok(lesson.learningGoals.length >= 1);
      const code = new RegExp(`^${number}\\.${n}\\.[A-C] `);
      for (const goal of lesson.learningGoals)
        assert.match(goal, code, `${lesson.id}: ${goal}`);
      assert.ok(
        lesson.sections.every((section) =>
          new RegExp(`^${number}\\.${n}\\.[A-C] · `).test(section.title),
        ),
        `${lesson.id} tags every section with its learning objective`,
      );
    }
  }
});

test("Key Terms quote the CED and name the essential knowledge they come from", async () => {
  for (const id of ALL_TOPIC_IDS) {
    const { lesson } = await generated(`precalculus/topics/${id}.json`);
    for (const term of lesson.vocabulary || [])
      assert.match(
        term.source || "",
        /^CED \d\.\d+\.[A-C]\.\d+/,
        `${id}: ${term.term} cites its CED statement`,
      );
  }
});

test("each unit has four 6-point free-response questions in the AP format", async () => {
  for (const { number } of UNITS) {
    const { unit } = await generated(`precalculus/units/precalculus-${number}.json`);
    const frqs = unit.writingQuizzes;
    assert.equal(frqs.length, 4, `Unit ${number} has four FRQs`);
    for (const summary of frqs) {
      assert.equal(summary.exerciseType, "frq");
      assert.equal(summary.partCount, 6);
      const { quiz } = await generated(`precalculus/writing/${summary.id}.json`);
      assert.equal(
        quiz.rubric.reduce((sum, row) => sum + row.points, 0),
        6,
      );
      assert.deepEqual(
        quiz.responseFields.map((field) => field.id),
        ["a1", "a2", "b1", "b2", "c1", "c2"],
      );
      for (const row of quiz.rubric)
        assert.ok(quiz.responseFields.some((field) => field.id === row.field));
      assert.ok(quiz.modelResponse.includes("C (ii)."));
    }
  }
});

test("custom practice excludes the questions reserved for the unit quiz", async () => {
  const reserved = new Set();
  for (const { number } of UNITS) {
    const { unit } = await generated(`precalculus/units/precalculus-${number}.json`);
    for (const quiz of unit.quizzes)
      for (const entry of quiz.selections)
        entry.questionIds.forEach((id) => reserved.add(id));
  }
  const ledger = await generated("precalculus/custom-practice.json");
  assert.equal(ledger.pools.length, ALL_TOPIC_IDS.length);
  for (const pool of ledger.pools) {
    assert.ok(pool.questionIds.length >= 4);
    assert.ok(pool.questionIds.every((id) => !reserved.has(id)));
  }
});

test("lessons teach in plain text and link only to real sections", async () => {
  const lessons = new Map();
  for (const id of ALL_TOPIC_IDS)
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

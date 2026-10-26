import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { createContentStore } from "../docs/app/content-store.js";
import { coursePage, unitPage, mcqPage } from "../docs/app/views/catalog.js";

const generatedRoot = new URL("../docs/generated/", import.meta.url);
const readGenerated = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, generatedRoot), "utf8"));
const store = () =>
  createContentStore({ fetchJson: async (path) => readGenerated(path) });

test("the course page links to a Multiple Choice section, and only when the course has sets", async () => {
  const data = await store().page("course", "precalculus");
  const html = coursePage(data);
  assert.match(html, /href="#\/mcq\/precalculus"/);
  assert.match(html, /Multiple-choice practice/);
  const world = await store().page("course", "world");
  assert.doesNotMatch(coursePage(world), /#\/mcq\//);
});

test("each unit hub lists Multiple Choice as its own mode next to practice", async () => {
  for (const number of [1, 2, 3]) {
    const data = await store().page("unit", `precalculus-${number}`);
    const html = unitPage(data);
    assert.match(html, new RegExp(`href="#/mcq/precalculus-${number}"`));
    assert.match(html, /Multiple Choice/);
  }
});

test("the course-wide hub opens every unit's sets, and a unit hub opens just its own", async () => {
  const all = await store().page("mcq", "precalculus");
  assert.ok(all.units.length >= 3);
  const html = mcqPage(all);
  for (const number of [1, 2, 3]) {
    assert.match(html, new RegExp(`id="mcq-precalculus-${number}"`));
    assert.match(html, new RegExp(`Unit ${number}: `));
    for (const part of [1, 2]) {
      assert.match(html, new RegExp(`data-quiz="precalculus-${number}-mcq-${part}"`));
    }
  }
  const topics = (html.match(/Topic \d+\.\d+/g) || []).length;
  assert.equal(topics, 14 + 15 + 15, "one set for every topic in Units 1 to 3");

  const one = await store().page("mcq", "precalculus-2");
  assert.equal(one.unit.id, "precalculus-2");
  const unitHtml = mcqPage(one);
  assert.match(unitHtml, /id="mcq-precalculus-2"/);
  assert.doesNotMatch(unitHtml, /id="mcq-precalculus-1"/);
  assert.match(unitHtml, /Unit 2 · Multiple choice/);
});

test("every multiple-choice route resolves to a quiz made only of four-choice questions", async () => {
  const content = store();
  const unit = await content.page("mcq", "precalculus-3");
  const quizIds = [
    ...unit.unit.mcq.unitQuizzes.map((quiz) => quiz.id),
    ...unit.unit.mcq.topicSets.map((quiz) => quiz.id),
  ];
  assert.equal(quizIds.length, 2 + 15);
  for (const id of quizIds) {
    const route = await content.page("quiz", id);
    assert.ok(route, `${id} has a route`);
    assert.equal(
      route.quiz.section,
      "mcq",
      `${id} belongs to the Multiple Choice section`,
    );
    assert.ok(route.bank.questions.length >= 10, `${id} has questions`);
    for (const question of route.bank.questions) {
      assert.notEqual(question.format, "free", `${question.id} is multiple choice`);
      assert.equal(question.choices.length, 4);
    }
  }
});

test("topic pages carry only the typed quick check and topic quiz, never the multiple-choice set", async () => {
  const content = store();
  for (const id of ["precalculus-1-1", "precalculus-2-9", "precalculus-3-15"]) {
    const topic = await content.page("topic", id);
    const quizzes = topic.bank.quizzes;
    assert.deepEqual(
      quizzes.map((quiz) => quiz.id),
      [`${id}-quick`, `${id}-quiz`],
    );
    assert.ok(topic.bank.questions.every((question) => question.format === "free"));
    assert.ok(
      !JSON.stringify([topic.bank.questions, topic.bank.quizzes]).includes("-mcq"),
    );
    assert.ok(!JSON.stringify(topic.lesson).includes("-mcq"));
  }
});

test("unit practice is typed, and the old multiple-choice unit quizzes keep their own IDs", async () => {
  const content = store();
  const practice = await content.page("quiz", "precalculus-3-practice");
  assert.equal(practice.quiz.quizType, "unit");
  const chosen = practice.quiz.selections.flatMap((selection) => selection.questionIds);
  assert.equal(chosen.length, 21);
  assert.equal(new Set(chosen).size, 21);
  const known = new Map(
    practice.bank.questions.map((question) => [question.id, question]),
  );
  assert.ok(chosen.every((id) => known.get(id)?.format === "free"));
  const mc = await content.page("quiz", "precalculus-3-mcq-2");
  assert.equal(mc.quiz.questionIds.length, 24);
  assert.ok(mc.bank.questions.every((question) => question.format !== "free"));
});

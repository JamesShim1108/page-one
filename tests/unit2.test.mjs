import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { createWritingEngine } from "../docs/app/writing/engine.js";
import { lessonPage } from "../docs/app/views/lesson.js";
import { writingPage } from "../docs/app/writing/views.js";

const root = new URL("../", import.meta.url);
const readGenerated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));

const topicSections = {
  1: [
    "network-geography",
    "trade-growth",
    "commercial-practices",
    "cities-production",
    "exchange-limits",
  ],
  2: [
    "state-building",
    "khanates-rule",
    "trade-communication",
    "cultural-transfer",
    "costs-continuities",
  ],
  3: [
    "monsoon-navigation",
    "ports-products",
    "diaspora-communities",
    "states-revenue",
    "zheng-he",
  ],
  4: [
    "desert-logistics",
    "goods-intermediaries",
    "mali-state-trade",
    "musa-learning",
    "accounts-local-life",
  ],
  5: [
    "beliefs-adaptation",
    "knowledge-technology",
    "cities-culture",
    "travelers-sourcing",
    "diffusion-not-uniformity",
  ],
  6: [
    "crop-movement",
    "agriculture-population",
    "pathogen-networks",
    "demographic-economic",
    "environment-feedback",
  ],
  7: [
    "comparison-framework",
    "shared-causes",
    "route-differences",
    "states-communities",
    "arguing-with-evidence",
  ],
};

test("Unit 2 has seven cited lessons and complete question metadata", async () => {
  const allQuestions = [];
  for (let number = 1; number <= 7; number += 1) {
    const topic = await readGenerated(`world/topics/world-2-${number}.json`);
    const bank = await readGenerated(`world/banks/world-2-${number}.json`);
    const lesson = topic.lesson;
    const questions = bank.questions;

    assert.equal(lesson.id, `world-2-${number}`);
    assert.deepEqual(
      lesson.sections.map((section) => section.id),
      topicSections[number],
    );
    assert.deepEqual(lesson.vocabulary, []);
    assert.equal(lesson.readingGuide.prompts.length, 5);
    assert.equal(lesson.connections.length, 3);
    assert.ok(lesson.sourceIds.length >= 3);
    assert.deepEqual(new Set(questions.map((question) => question.id)).size, 20);
    assert.deepEqual(
      questions.reduce((counts, question) => {
        counts[question.difficulty] = (counts[question.difficulty] || 0) + 1;
        return counts;
      }, {}),
      { Core: 6, Apply: 10, Challenge: 4 },
    );
    assert.deepEqual(
      questions.reduce((counts, question) => {
        counts[question.correctAnswer] = (counts[question.correctAnswer] || 0) + 1;
        return counts;
      }, {}),
      { 0: 5, 1: 5, 2: 5, 3: 5 },
    );
    assert.deepEqual(
      new Set(questions.map((question) => question.concept)),
      new Set(topicSections[number]),
    );
    for (const question of questions) {
      assert.equal(question.choices.length, 4);
      assert.equal(question.choiceExplanations.length, 4);
      assert.ok(question.nearMissIndex >= 0 && question.nearMissIndex < 4);
      assert.notEqual(question.nearMissIndex, question.correctAnswer);
      assert.ok(question.sourceIds.length >= 2);
      assert.ok(question.sourceLocators.length >= 1);
    }
    assert.equal(
      questions.slice(4, 16).filter((question) => question.stimulusBlocks?.length).length,
      6,
    );
    assert.equal(
      questions.slice(16).filter((question) => question.stimulusBlocks?.length).length,
      2,
    );
    allQuestions.push(...questions);
  }
  assert.equal(allQuestions.length, 140);
  assert.equal(new Set(allQuestions.map((question) => question.id)).size, 140);
});

test("Unit 2 practice forms partition the 28 reserved questions", async () => {
  const { unit } = await readGenerated("world/units/world-2.json");
  const forms = unit.quizzes;
  assert.equal(forms.length, 3);
  const ids = forms.map((form) =>
    form.selections.flatMap((selection) => selection.questionIds),
  );
  assert.equal(ids[0].length, 14);
  assert.equal(ids[1].length, 14);
  assert.deepEqual(new Set(ids[0]).intersection(new Set(ids[1])).size, 0);
  assert.deepEqual(new Set([...ids[0], ...ids[1]]).size, 28);
  assert.deepEqual(
    new Set(ids[2]),
    new Set(
      Array.from({ length: 7 }, (_, index) => index + 1).flatMap((topic) =>
        [17, 18, 19, 20].map((question) => `world-2-${topic}-q${question}`),
      ),
    ),
  );
});

test("guide, network explorer, activities, and writing inventory survive generation", async () => {
  const guide = (await readGenerated("world/guides/world-2.json")).guide;
  assert.equal(guide.networkData.networks.length, 3);
  assert.equal(guide.networkData.places.length, 13);
  assert.equal(guide.networkData.connections.length, 12);
  assert.equal(guide.activities.length, 6);
  assert.ok(
    guide.networkData.mapSource.sourceIds.includes("natural-earth-populated-places"),
  );
  assert.equal(new Set(guide.activities.map((activity) => activity.id)).size, 6);
  assert.ok(
    guide.networkData.places.every(
      (place) =>
        Number.isFinite(place.coordinates.latitude) &&
        Number.isFinite(place.coordinates.longitude),
    ),
  );
  for (const network of guide.networkData.networks) {
    assert.ok(
      guide.networkData.places.filter((place) => place.networks.includes(network.id))
        .length >= 3,
    );
    assert.deepEqual(
      Object.keys(network.dimensions).sort(),
      [
        "culturalConsequences",
        "environmentalConsequences",
        "geography",
        "representativeGoods",
        "stateInvolvement",
        "tradingCities",
        "transportEnvironment",
        "commercialPractices",
      ].sort(),
    );
  }
  assert.ok(guide.timeline.length >= 10);
  assert.equal(guide.evidenceGuide.length, 12);

  const writingFiles = [
    "world-2-saq-01",
    "world-2-saq-02",
    "world-2-saq-03",
    "world-2-saq-04",
    "world-2-saq-05",
    "world-2-saq-06",
    "world-2-saq-07",
    "world-2-leq-comparison",
    "world-2-leq-causation",
    "world-2-leq-continuity",
    "world-2-dbq-connectivity",
    "world-2-skill-thesis",
    "world-2-skill-context",
    "world-2-skill-evidence",
    "world-2-skill-sourcing",
  ];
  const writing = await Promise.all(
    writingFiles.map(
      async (id) => (await readGenerated(`world/writing/${id}.json`)).quiz,
    ),
  );
  assert.equal(writing.filter((quiz) => quiz.exerciseType === "saq").length, 7);
  assert.equal(writing.filter((quiz) => quiz.exerciseType === "leq").length, 3);
  assert.equal(writing.filter((quiz) => quiz.exerciseType === "skill").length, 4);
  const dbq = writing.find((quiz) => quiz.exerciseType === "dbq");
  assert.equal(dbq.availability, "blocked");
  assert.equal(dbq.documents.length, 7);
  assert.ok(dbq.documents.every((document) => document.status === "blocked"));
  assert.equal(
    dbq.rubric.reduce((sum, criterion) => sum + criterion.points, 0),
    7,
  );
});

test("typed writing drafts score only after every required rubric category is assessed", async () => {
  const { quiz } = await readGenerated("world/writing/world-2-leq-comparison.json");
  const engine = createWritingEngine(quiz);
  const draft = engine.newDraft();
  assert.equal(engine.updateResponse(draft, "outline", "A defensible outline."), true);
  assert.equal(
    engine.updateResponse(draft, "essay", "Specific evidence and reasoning."),
    true,
  );
  assert.equal(engine.review(draft), true);
  assert.equal(engine.total(draft), null);
  assert.equal(engine.setScore(draft, "thesis", 1), true);
  assert.equal(engine.setScore(draft, "context", 1), true);
  assert.equal(engine.setScore(draft, "evidence", 2), true);
  assert.equal(engine.setScore(draft, "analysis", 2), true);
  assert.equal(engine.total(draft), 6);
});

test("Unit 2 lesson rendering omits empty vocabulary navigation while Unit 1 retains it", async () => {
  const unit2 = await readGenerated("world/topics/world-2-1.json");
  const unit1 = await readGenerated("world/topics/world-1-1.json");
  const render = async (data) =>
    lessonPage(
      { ...data, bank: await readGenerated(data.bankPath) },
      { attempt: () => null, quickView: () => "" },
    );
  const unit2Html = await render(unit2);
  const unit1Html = await render(unit1);
  assert.equal(unit2Html.includes("Key terms"), false);
  assert.equal(unit2Html.includes("0 key terms"), false);
  assert.equal(unit1Html.includes("Key terms"), true);
});

test("blocked DBQ routes do not expose a writable document packet", async () => {
  const data = await readGenerated("world/writing/world-2-dbq-connectivity.json");
  const html = writingPage(data, null);
  assert.match(html, /document packet is not released/i);
  assert.equal(html.includes("<textarea"), false);
  assert.equal(html.includes("Review my response"), false);
});

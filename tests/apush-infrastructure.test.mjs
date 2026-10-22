import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  practiceTestRules,
  validateBlocks,
  validatePracticeTest,
  validateSkills,
  validateWriting,
} from "../scripts/lib/validate.mjs";
import {
  resolveExam,
  validateExamFormat,
  weightRange,
  writingMaxPoints,
} from "../scripts/lib/exams.mjs";
import { checkCedTopic, checkCedWriting, resolveCed } from "../scripts/lib/ced.mjs";
import { renderSource } from "../docs/app/blocks.js";
import { ced } from "../docs/content/ap-us-history/ced.js";
import { course } from "../docs/content/ap-us-history/course.js";
import { examFormat } from "../docs/content/ap-us-history/exam-format.js";
import { framework } from "../docs/content/ap-us-history/framework.js";
import { skills as skillList } from "../docs/content/ap-us-history/skills.js";
import { sources as sourceList } from "../docs/content/ap-us-history/sources.js";
import {
  dbq,
  dbqDocument,
  dbqRubric,
  leq,
  leqRubric,
  pairedInterpretationPrompts,
  saq,
} from "../docs/content/ap-us-history/writing-kit.js";

const root = new URL("../", import.meta.url);
const generated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));

const sources = new Map(sourceList.map((source) => [source.id, source]));
const skills = validateSkills(skillList, "skills.js");
const cedIndex = resolveCed(ced, { sources, framework, skills }, "ced.js");

// One fixture image, as a course assets.js record would provide it.
const cartoon = {
  id: "apush-fixture-cartoon",
  title: "Fixture cartoon",
  creator: "Library of Congress",
  license: "Public domain",
  sourceUrl: "https://www.loc.gov/",
  file: "assets/fixture.webp",
  width: 800,
  height: 600,
};
const assets = new Map([[cartoon.id, cartoon]]);

const textSource = (id, sourceType = "primary") => ({
  type: "source",
  id,
  sourceType,
  attribution: `Author of ${id}, 1850`,
  text: `Passage ${id}.`,
  ...(sourceType === "original" ? {} : { citation: `Edition of ${id}` }),
  source: "KC-5.2.II.A",
  ced_review: "pending",
});
const imageSource = (id) => ({
  type: "source",
  id,
  medium: "image",
  sourceType: "primary",
  attribution: `Puck, a satirical magazine, 1901 (${id})`,
  assetId: cartoon.id,
  alt: "A cartoon of Uncle Sam holding a map.",
  description: "Uncle Sam stands over a map of the Caribbean labeled with naval bases.",
  citation: "Library of Congress, fixture call number",
  source: "KC-7.3.I.A",
  ced_review: "pending",
});
const tableSource = (id) => ({
  type: "source",
  id,
  medium: "table",
  sourceType: "secondary",
  attribution: `Census data compiled by a historian (${id})`,
  caption: "Immigrants admitted, by decade",
  columns: ["Decade", "Immigrants"],
  rows: [
    ["1880s", "5.2 million"],
    ["1900s", "8.2 million"],
  ],
  citation: "Historical Statistics of the United States",
  source: "KC-6.2.I.A",
  ced_review: "pending",
});

// ---------------------------------------------------------------------------
// Course framework
// ---------------------------------------------------------------------------

test("the CED framework lists all nine periods and every topic in order", () => {
  assert.deepEqual(
    ced.units.map((unit) => [unit.number, unit.period, unit.topics.length]),
    [
      [1, "1491–1607", 7],
      [2, "1607–1754", 8],
      [3, "1754–1800", 13],
      [4, "1800–1848", 14],
      [5, "1844–1877", 12],
      [6, "1865–1898", 14],
      [7, "1890–1945", 15],
      [8, "1945–1980", 15],
      [9, "1980–present", 7],
    ],
  );
  // Each unit opens with a contextualization topic and closes with a reasoning topic.
  for (const unit of ced.units) {
    assert.equal(unit.topics[0].kind, "context");
    assert.equal(unit.topics.at(-1).kind, "reasoning");
  }
  assert.deepEqual(
    ced.units.map((unit) => unit.topics.at(-1).reasoning),
    [
      "causation",
      "comparison",
      "continuity",
      "causation",
      "comparison",
      "continuity",
      "comparison",
      "continuity",
      "causation",
    ],
  );
  const topic = cedIndex.units.get(3).topics.get("3.3");
  assert.equal(topic.title, "Taxation Without Representation");
  assert.deepEqual(topic.themes, ["WOR"]);
  assert.deepEqual(topic.learningObjectives, ["C"]);
  assert.equal(topic.suggestedSkill, "2.A");
  assert.ok(cedIndex.learningObjectives.has("3.C"));
  assert.ok(cedIndex.keyConcepts.has("KC-3.1.II.A"));
});

test("framework themes use the CED codes and skills carry CED sub-skills", () => {
  assert.deepEqual(
    framework.themes.map((theme) => theme.id),
    ["NAT", "WXT", "GEO", "MIG", "PCE", "WOR", "ARC", "SOC"],
  );
  assert.equal(skills.subskillCodes.size, 17);
  assert.equal(skills.items.get("argumentation").mcq, false);
  assert.deepEqual(
    [...skills.reasoning.keys()],
    ["comparison", "causation", "continuity"],
  );
});

test("the course lists nine CED units and marks only built units ready", async () => {
  const catalog = await generated("catalog.json");
  const entry = catalog.courses.find((item) => item.id === "apush");
  assert.equal(entry.title, course.title);
  const index = await generated("apush/index.json");
  const statuses = new Map();
  for (const unit of ced.units) {
    const module = await import(
      new URL(
        `../docs/content/ap-us-history/unit-${String(unit.number).padStart(2, "0")}/unit.js`,
        import.meta.url,
      )
    );
    statuses.set(`apush-${unit.number}`, module.unit.status);
  }
  assert.deepEqual(
    index.units.map((unit) => [unit.id, unit.title, unit.period, unit.status]),
    ced.units.map((unit) => [
      `apush-${unit.number}`,
      unit.title,
      unit.period,
      statuses.get(`apush-${unit.number}`),
    ]),
  );
  // A course is listed as ready once any unit is ready.
  const anyReady = [...statuses.values()].includes("ready");
  assert.equal(entry.status, anyReady ? "ready" : "soon");
  assert.equal(entry.readyTopicCount > 0, anyReady);
});

test("CED alignment rejects a mistitled topic and unknown tags", () => {
  const unit = { number: 3 };
  const bank = {
    questions: [{ id: "q1", learningObjective: "3.C", keyConcepts: ["KC-3.1.II.A"] }],
  };
  checkCedTopic(
    { code: "3.3", title: "Taxation Without Representation" },
    bank,
    unit,
    cedIndex,
    "t",
  );
  assert.throws(
    () => checkCedTopic({ code: "3.3", title: "Taxes" }, bank, unit, cedIndex, "t"),
    /must be titled "Taxation Without Representation"/,
  );
  assert.throws(
    () => checkCedTopic({ code: "3.14", title: "Extra" }, bank, unit, cedIndex, "t"),
    /not a CED topic/,
  );
  assert.throws(
    () =>
      checkCedTopic(
        { code: "3.3", title: "Taxation Without Representation" },
        { questions: [{ id: "q2", learningObjective: "3.Z" }] },
        unit,
        cedIndex,
        "t",
      ),
    /learningObjective 3.Z is not in the CED/,
  );
  assert.throws(
    () => checkCedWriting({ id: "w", themes: ["INSPECT"] }, cedIndex, "w"),
    /unknown theme/,
  );
});

// ---------------------------------------------------------------------------
// Visual and data stimuli
// ---------------------------------------------------------------------------

test("source blocks can be images or data tables with a written description", () => {
  const options = { reviewField: "ced_review" };
  validateBlocks(
    [textSource("a", "secondary"), imageSource("b"), tableSource("c")],
    assets,
    "f",
    new Set(),
    options,
  );
  const { description, ...undescribed } = imageSource("d");
  assert.ok(description);
  assert.throws(
    () => validateBlocks([undescribed], assets, "f", new Set(), options),
    /expected nonempty text/,
  );
  assert.throws(
    () =>
      validateBlocks(
        [{ ...imageSource("e"), assetId: "missing" }],
        assets,
        "f",
        new Set(),
        options,
      ),
    /unknown image missing/,
  );
  assert.throws(
    () =>
      validateBlocks(
        [{ ...imageSource("g"), text: "A caption" }],
        assets,
        "f",
        new Set(),
        options,
      ),
    /has no text passage/,
  );
  // Each course names its review field; World History's default is amsco_review.
  assert.throws(
    () => validateBlocks([textSource("h", "secondary")], assets, "f"),
    /amsco_review/,
  );
});

test("image and table sources render with credit, description, and data", () => {
  const image = renderSource(imageSource("cartoon-1"), undefined, {
    [cartoon.id]: cartoon,
  });
  assert.match(image, /source-excerpt--image/);
  assert.match(image, /<img [^>]*alt="A cartoon of Uncle Sam holding a map\."/);
  assert.match(image, /Image description/);
  assert.match(image, /Library of Congress<\/a> \/ Public domain/);
  const table = renderSource(tableSource("census"));
  assert.match(table, /<caption>Immigrants admitted, by decade<\/caption>/);
  assert.match(table, /<td>8.2 million<\/td>/);
  // Without the asset record, the description still reaches the student.
  assert.match(renderSource(imageSource("x")), /Uncle Sam stands over a map/);
});

// ---------------------------------------------------------------------------
// Multiple-choice sets
// ---------------------------------------------------------------------------

let questionCounter = 0;
// Choices of similar length; every fifth question has the longest correct
// choice, so answer-length checks pass for the fixture bank.
function question(stimulusBlocks, stimulusId) {
  questionCounter += 1;
  const n = questionCounter;
  const correct = n % 4;
  const choices = [0, 1, 2, 3].map((index) =>
    index === correct && n % 5 === 0
      ? `Choice ${index} for item ${n} with extra words`
      : `Choice ${index} for item ${n} here`,
  );
  return {
    id: `apush-q-${n}`,
    prompt: `Fixture question ${n}?`,
    choices,
    correctAnswer: correct,
    choiceExplanations: choices.map((_, index) => `Why choice ${index} fits item ${n}.`),
    nearMissIndex: (correct + 1) % 4,
    distinguisher: `What separates the near miss in item ${n}.`,
    skill: "developments",
    stimulusId,
    stimulusBlocks,
  };
}
function set(size, blocks) {
  return Array.from({ length: size }, () => question(blocks, blocks[0].id));
}

test("APUSH practice sets have three or four questions and allow visual stimuli", () => {
  const rules = practiceTestRules(validateExamFormat(examFormat, sources, "format"));
  assert.deepEqual(rules, {
    minPerStimulus: 3,
    maxPerStimulus: 4,
    media: ["text", "image", "table"],
  });
  const good = [...set(3, [imageSource("img-1")]), ...set(4, [textSource("txt-1")])];
  validatePracticeTest({ practiceTest: true }, good, "fixture", rules);
  assert.throws(
    () =>
      validatePracticeTest(
        { practiceTest: true },
        [...set(2, [textSource("txt-2")]), ...set(3, [textSource("txt-3")])],
        "fixture",
        rules,
      ),
    /used by 2 questions; use 3 to 4/,
  );
  // World History's default rules still accept text sources only.
  assert.throws(
    () =>
      validatePracticeTest(
        { practiceTest: true },
        set(3, [imageSource("img-2")]),
        "fixture",
      ),
    /need source stimulusBlocks \(text\)/,
  );
});

// ---------------------------------------------------------------------------
// Writing builders
// ---------------------------------------------------------------------------

test("writing builders follow the CED rubric and the 2027 LEQ format", () => {
  assert.equal(
    leqRubric.reduce((sum, row) => sum + row.points, 0),
    6,
  );
  assert.equal(
    dbqRubric.reduce((sum, row) => sum + row.points, 0),
    7,
  );
  const essay = leq({
    id: "apush-4-leq-fixture",
    unitNumber: 4,
    units: [3, 4, 5],
    dateRange: "1776–1876",
    headline: "Political participation",
    context:
      "Between 1776 and 1876, major political developments included new governments and parties.",
    task: "Explain how changes in political participation influenced society between 1776 and 1876.",
    focusNote:
      "Your response may focus on any change(s) in political participation during the period 1776 to 1876.",
    sourceIds: ["ced"],
    modelResponse: "Model.",
    modelNotes: [],
    alternateModel: "Alternate.",
    commonErrors: ["Restating the prompt."],
  });
  assert.match(essay.prompt, /You are not expected to address the entire time period/);
  assert.match(essay.instructions, /^In your response you should do the following:/);
  assert.deepEqual(essay.responseFields[0].review, []);
  const prompts = pairedInterpretationPrompts({
    first: "Peiss",
    second: "Enstad",
    subject: "women’s emergence in the public sphere",
    period: "1880–1929",
  });
  assert.match(
    prompts.a,
    /^Briefly describe ONE important difference between Peiss’s and Enstad’s/,
  );
  assert.match(prompts.c, /from the period 1880–1929 .* support Enstad’s argument\.$/);
});

test("DBQ documents can be images from the asset manifest", () => {
  const unit = { id: "apush-7", courseId: "apush", number: 7 };
  const documents = Array.from({ length: 7 }, (_, index) =>
    dbqDocument({
      id: `doc-${index + 1}`,
      label: `Document ${index + 1}`,
      excerpt:
        index === 3 ? imageSource(`doc-image-${index}`) : textSource(`doc-text-${index}`),
      author: `Author ${index}`,
      date: "1898",
      setting: "United States",
      audience: "Public",
      rights: "Public domain",
      sourceId: "ced",
    }),
  );
  assert.equal(documents[3].medium, "image");
  assert.equal(documents[3].content, undefined);
  const quiz = {
    ...dbq({
      id: "apush-7-dbq-fixture",
      unitNumber: 7,
      headline: "Expansion",
      prompt:
        "Evaluate the relative importance of different causes for the expanding role of the United States in the world in the period from 1865 to 1910.",
      sourceIds: ["ced"],
      documents,
      modelResponse: "Model.",
      modelNotes: [],
      alternateModel: "Alternate.",
      commonErrors: ["Listing documents."],
      examOnly: false,
    }),
  };
  validateWriting(quiz, new Map(), framework, unit, "dbq", sources, {
    assets,
    reviewField: "ced_review",
  });
  assert.throws(
    () => validateWriting(quiz, new Map(), framework, unit, "dbq", sources),
    /unknown image apush-fixture-cartoon/,
  );
});

// ---------------------------------------------------------------------------
// Mock exam contract
// ---------------------------------------------------------------------------

function fixtureExam() {
  questionCounter = 0;
  // Questions per unit inside the CED weighting: 3, 4, 8, 8, 7, 7, 8, 7, 3.
  const plan = {
    1: [3],
    2: [4],
    3: [4, 4],
    4: [4, 4],
    5: [4, 3],
    6: [4, 3],
    7: [4, 4],
    8: [4, 3],
    9: [3],
  };
  const topics = new Map();
  const selections = [];
  for (const [number, sizes] of Object.entries(plan)) {
    const unit = { status: "ready", number: Number(number) };
    sizes.forEach((size, index) => {
      const id = `apush-${number}-${index + 1}`;
      // Unit 3's first set pairs two historians; one Unit 7 set is a cartoon.
      const blocks =
        number === "3" && index === 0
          ? [textSource(`${id}-a`, "secondary"), textSource(`${id}-b`, "secondary")]
          : number === "7" && index === 0
            ? [imageSource(`${id}-img`)]
            : [textSource(`${id}-src`)];
      const questions = set(size, blocks);
      topics.set(id, { lesson: { status: "ready" }, bank: { questions }, unit });
      selections.push({ topicId: id, questionIds: questions.map((item) => item.id) });
    });
  }
  const unitRecord = (number) => ({ status: "ready", number });
  const part = (id) => ({ id, prompt: `Part ${id}` });
  const writing = new Map([
    [
      "s1",
      {
        quiz: {
          id: "s1",
          exerciseType: "saq",
          parts: ["a", "b", "c"].map(part),
          stimulusBlocks: [textSource("h1", "secondary"), textSource("h2", "secondary")],
        },
        unit: unitRecord(7),
      },
    ],
    [
      "s2",
      {
        quiz: {
          id: "s2",
          exerciseType: "saq",
          parts: ["a", "b", "c"].map(part),
          stimulusBlocks: [textSource("p1")],
        },
        unit: unitRecord(3),
      },
    ],
    [
      "s3",
      {
        quiz: {
          id: "s3",
          exerciseType: "saq",
          parts: ["a", "b", "c"].map(part),
          stimulusBlocks: [tableSource("t1")],
        },
        unit: unitRecord(6),
      },
    ],
    [
      "d1",
      {
        quiz: {
          id: "d1",
          exerciseType: "dbq",
          availability: "available",
          rubric: dbqRubric,
          documents: Array.from({ length: 7 }, (_, index) => ({
            metadata: { author: `A${index}` },
          })),
        },
        unit: unitRecord(7),
      },
    ],
    [
      "l1",
      {
        quiz: { id: "l1", exerciseType: "leq", rubric: leqRubric, units: [3, 4, 5] },
        unit: unitRecord(4),
      },
    ],
  ]);
  const exam = {
    schemaVersion: 1,
    id: "apush-mock-fixture",
    courseId: "apush",
    title: "Fixture",
    status: "ready",
    description: "Fixture exam.",
    sections: {
      mcq: { selections },
      saq: { q1: ["s1"], q2: ["s2"], q3: ["s3"] },
      dbq: { q1: ["d1"] },
      leq: { q2: ["l1"] },
    },
  };
  return { exam, topics, writing };
}

const resolve = ({ exam, topics, writing }) =>
  resolveExam(
    exam,
    {
      course: { id: "apush" },
      format: validateExamFormat(examFormat, sources, "f"),
      topics,
      writing,
    },
    "exam",
  );

test("a full APUSH mock exam fits the May 2027 format", () => {
  const { summary, payload } = resolve(fixtureExam());
  assert.equal(summary.questionCount, 55);
  assert.equal(summary.minutes, 195);
  const saqSection = payload.sections.find((section) => section.id === "saq");
  assert.deepEqual(
    saqSection.prompts.map((prompt) => [prompt.choose, prompt.maxPoints]),
    [
      [1, 3],
      [1, 3],
      [1, 3],
    ],
  );
  assert.equal(writingMaxPoints(payload.sections.at(-1).prompts[0].options[0]), 6);
  assert.deepEqual(weightRange({ min: 4, max: 6 }, 55), { min: 2, max: 4 });
  assert.deepEqual(weightRange({ min: 10, max: 17 }, 55), { min: 5, max: 10 });
});

test("the APUSH exam rejects each broken rule", () => {
  const broken = (change, pattern) => {
    const fixture = fixtureExam();
    change(fixture);
    assert.throws(() => resolve(fixture), pattern);
  };
  // Question 3 needs a non-text source.
  broken(({ writing }) => {
    writing.get("s3").quiz.stimulusBlocks = [textSource("p9")];
  }, /needs a non-text source/);
  // Question 1 uses secondary text only.
  broken(({ writing }) => {
    writing.get("s1").quiz.stimulusBlocks = [imageSource("i9")];
  }, /needs secondary text sources only/);
  // Each SAQ focuses on a different period.
  broken(({ writing }) => {
    writing.get("s3").unit = { status: "ready", number: 7 };
  }, /each prompt needs a different period/);
  // The DBQ falls in Units 3-8.
  broken(({ writing }) => {
    writing.get("d1").unit = { status: "ready", number: 2 };
  }, /this prompt allows Units 3-8/);
  // The LEQ spans about half the course.
  broken(({ writing }) => {
    writing.get("l1").quiz.units = [4];
  }, /spans at least 3/);
  // Unit 1 is 4-6% of the exam: 2 to 4 of 55 questions.
  broken(({ topics }) => {
    topics.get("apush-1-1").unit = { status: "ready", number: 9 };
  }, /Unit 1 has 0 questions; the 4-6% weighting allows 2 to 4/);
  // At least one paired-text set somewhere in the exam.
  broken(({ topics, writing }) => {
    for (const item of topics.get("apush-3-1").bank.questions) {
      item.stimulusBlocks = [textSource("solo")];
      item.stimulusId = "solo";
    }
    writing.get("s1").quiz.stimulusBlocks = [textSource("h1", "secondary")];
  }, /paired-text stimulus set/);
});

// ---------------------------------------------------------------------------
// End to end: a fixture topic compiles through the real build
// ---------------------------------------------------------------------------

const fixtureLesson = (title) => ({
  schemaVersion: 1,
  id: "apush-3-3",
  courseId: "apush",
  unitId: "apush-3",
  order: 3,
  code: "3.3",
  title,
  period: "1754–1800",
  status: "ready",
  summary: "Fixture summary.",
  minutes: 5,
  learningGoals: ["Explain a fixture idea."],
  bigIdea: "Fixture big idea.",
  context: "Fixture context.",
  sections: [
    {
      id: "taxes",
      title: "Fixture section",
      conceptTitle: "Taxes",
      lenses: ["WOR"],
      blocks: [{ type: "paragraph", text: "Fixture reading." }],
      takeaway: "Fixture takeaway.",
    },
  ],
  definitionCoverage: { status: "not-needed", reason: "Build test fixture." },
  sourceIds: ["ced"],
});

function fixtureBank() {
  const visual = {
    ...imageSource("apush-fixture-stamp-cartoon"),
    assetId: "apush-fixture-cartoon",
  };
  const data = tableSource("apush-fixture-trade-table");
  const item = (id, extra = {}) => ({
    id,
    topicId: "apush-3-3",
    concept: "taxes",
    prompt: `Fixture prompt ${id}?`,
    explanation: `Fixture explanation ${id}.`,
    skill: "sourcing",
    subskill: "2.A",
    learningObjective: "3.C",
    keyConcepts: ["KC-3.1.II.A"],
    choices: [`A ${id}`, `B ${id}`, `C ${id}`, `D ${id}`],
    correctAnswer: 1,
    choiceExplanations: [0, 1, 2, 3].map((index) => `Choice ${index} on ${id}.`),
    nearMissIndex: 2,
    distinguisher: `Near miss on ${id}.`,
    ...extra,
  });
  const questions = [
    item("apush-3-3-q01"),
    // One correct choice is the longest, so length gives no clue either way.
    item("apush-3-3-q02", {
      choices: ["A q02 one", "B q02 longer", "C q02 one", "D q02 one"],
    }),
    ...["t01", "t02", "t03"].map((n) =>
      item(`apush-3-3-${n}`, { stimulusId: visual.id, stimulusBlocks: [visual] }),
    ),
    ...["t04", "t05", "t06"].map((n) =>
      item(`apush-3-3-${n}`, { stimulusId: data.id, stimulusBlocks: [data] }),
    ),
  ];
  const quiz = (id, quizType, questionIds) => ({
    id,
    courseId: "apush",
    unitId: "apush-3",
    topicId: "apush-3-3",
    title: id,
    quizType,
    questionIds,
  });
  return {
    questions,
    quizzes: [
      quiz("apush-3-3-quick", "quick", ["apush-3-3-q01"]),
      quiz("apush-3-3-topic", "topic", ["apush-3-3-q01", "apush-3-3-q02"]),
    ],
  };
}

const fixtureUnit = {
  schemaVersion: 1,
  id: "apush-3",
  courseId: "apush",
  number: 3,
  title: "Period 3",
  period: "1754–1800",
  status: "ready",
  description: "Fixture unit.",
  quizzes: [
    {
      id: "apush-3-practice-test",
      courseId: "apush",
      unitId: "apush-3",
      title: "Unit 3 Practice Test",
      quizType: "unit",
      practiceTest: true,
      selections: [
        {
          topicId: "apush-3-3",
          questionIds: ["apush-3-3-t01", "apush-3-3-t02", "apush-3-3-t03"],
        },
        {
          topicId: "apush-3-3",
          questionIds: ["apush-3-3-t04", "apush-3-3-t05", "apush-3-3-t06"],
        },
      ],
    },
  ],
};

async function compileApush({ title = "Taxation Without Representation" } = {}) {
  const { cp, mkdtemp, rm, writeFile, mkdir } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const sharp = (await import("sharp")).default;
  const { compileContent } = await import("../scripts/build-content.mjs");
  const temp = await mkdtemp(join(tmpdir(), "page-one-apush-"));
  await cp(join(fileURLToPath(root), "docs"), join(temp, "docs"), {
    recursive: true,
    filter: (path) => !path.includes(join("docs", "generated")),
  });
  const courseRoot = join(temp, "docs/content/ap-us-history");
  const write = (path, name, value) =>
    writeFile(
      join(courseRoot, path),
      `export const ${name} = ${JSON.stringify(value)};\n`,
    );
  try {
    await write("course.js", "course", { ...course, status: "ready" });
    await mkdir(join(courseRoot, "assets"), { recursive: true });
    await sharp({
      create: { width: 64, height: 48, channels: 3, background: "#ddd" },
    })
      .webp()
      .toFile(join(courseRoot, "assets/fixture-cartoon.webp"));
    await write("assets.js", "assets", [
      { ...cartoon, file: "./assets/fixture-cartoon.webp", width: 64, height: 48 },
    ]);
    await write("unit-03/unit.js", "unit", fixtureUnit);
    const topicRoot = join(courseRoot, "unit-03/topics/taxation");
    await mkdir(topicRoot, { recursive: true });
    await writeFile(
      join(topicRoot, "lesson.js"),
      `export const lesson = ${JSON.stringify(fixtureLesson(title))};\n`,
    );
    await writeFile(
      join(topicRoot, "questions.js"),
      `export const bank = ${JSON.stringify(fixtureBank())};\n`,
    );
    const part = (id) => ({
      id,
      prompt: `Fixture part ${id}.`,
      alternatives: "Other accurate answers.",
      criteria: ["Answers the part."],
      model: { answer: "Answer.", prove: "Prove.", explain: "Explain." },
    });
    await write("unit-03/writing.js", "writingQuizzes", [
      saq({
        id: "apush-3-saq-01",
        unitNumber: 3,
        number: 1,
        headline: "Fixture cartoon SAQ",
        stimulusBlocks: [imageSource("apush-fixture-saq-cartoon")],
        parts: ["a", "b", "c"].map(part),
        sourceIds: ["ced"],
        learningObjectives: ["3.C"],
        themes: ["WOR"],
        examOnly: false,
      }),
    ]);
    return await compileContent(temp);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}

test("a fixture APUSH topic with visual stimuli compiles through the build", async () => {
  const output = await compileApush();
  const read = (path) => JSON.parse(output.get(path));
  const bank = read("apush/banks/apush-3-3.json");
  assert.ok(bank.assets["apush-fixture-cartoon"], "the cartoon travels with the bank");
  const first = bank.questions.find((item) => item.id === "apush-3-3-t01");
  assert.equal(first.skillLabel, "Sourcing and Situation");
  assert.match(first.subskillText, /^Identify a source’s point of view/);
  const quiz = read("apush/quizzes/apush-3-practice-test.json");
  assert.equal(quiz.quiz.questionIds.length, 6);
  const writing = read("apush/writing/apush-3-saq-01.json");
  assert.ok(
    writing.assets["apush-fixture-cartoon"],
    "the SAQ cartoon travels with the prompt",
  );
});

test("the build rejects a topic whose title drifts from the CED", async () => {
  await assert.rejects(
    compileApush({ title: "Taxes and Protest" }),
    /must be titled "Taxation Without Representation"/,
  );
});

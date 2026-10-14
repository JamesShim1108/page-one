import test from "node:test";
import assert from "node:assert/strict";
import { cp, mkdtemp, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { compileContent } from "../scripts/build-content.mjs";
import {
  resolveExam,
  validateExamFormat,
  writingMaxPoints,
} from "../scripts/lib/exams.mjs";
import { examFormat } from "../docs/content/world-history/exam-format.js";
import { sources } from "../docs/content/world-history/sources.js";
import { unit as unit7 } from "../docs/content/world-history/unit-07/unit.js";
import { createLocalAdapter } from "../docs/app/storage/adapter.js";
import {
  answerQuestion,
  chooseOption,
  chosenOptions,
  createAttempt,
  endBreak,
  remainingMs,
  scoreSheet,
  setScore,
  startSection,
  submitSection,
  tick,
  toggleFlag,
  writeResponse,
} from "../docs/app/exam/engine.js";
import { createExamStore } from "../docs/app/exam/store.js";
import { examPage } from "../docs/app/exam/views.js";
import { coursePage } from "../docs/app/views/catalog.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const MINUTE = 60_000;

// A fixture exam built only from questions and prompts the course already has.
// It lives in a temporary copy of the content, never in the published site.
const fixtureExam = {
  schemaVersion: 1,
  id: "world-mock-fixture",
  courseId: "world",
  title: "Fixture mock exam",
  status: "ready",
  description: "Assembled from existing practice for testing.",
  sections: {
    mcq: { selections: unit7.quizzes[0].selections },
    saq: {
      q1: ["world-2-saq-02"],
      q2: ["world-2-saq-01"],
      q3: ["world-2-saq-03", "world-2-saq-07"],
    },
    dbq: { q1: ["world-2-dbq-connectivity"] },
    leq: {
      q2: ["world-2-leq-causation", "world-2-leq-comparison", "world-2-leq-continuity"],
    },
  },
};

async function compileWith(files) {
  const temp = await mkdtemp(join(tmpdir(), "page-one-exam-"));
  await cp(join(root, "docs"), join(temp, "docs"), {
    recursive: true,
    filter: (path) =>
      !path.includes(`${join("docs", "generated")}`) &&
      !path.includes(join("docs", "content", "world-history", "exams")),
  });
  const examsRoot = join(temp, "docs/content/world-history/exams");
  await mkdir(examsRoot, { recursive: true });
  for (const [name, exam] of Object.entries(files))
    await writeFile(
      join(examsRoot, name),
      `export const exam = ${JSON.stringify(exam)};\n`,
    );
  try {
    return await compileContent(temp);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}

let compiled;
async function fixture() {
  compiled ||= compileWith({
    "fixture.js": fixtureExam,
    "later.js": {
      schemaVersion: 1,
      id: "world-mock-later",
      courseId: "world",
      title: "Later mock exam",
      status: "soon",
      description: "Not assembled yet.",
    },
  });
  const output = await compiled;
  const read = (path) => JSON.parse(output.get(path));
  return { output, read, exam: read("world/exams/world-mock-fixture.json") };
}

test("the World History exam format matches the AP structure and weights", () => {
  validateExamFormat(
    examFormat,
    new Map(sources.map((item) => [item.id, item])),
    "format",
  );
  const minutes = examFormat.sections.reduce((sum, section) => sum + section.minutes, 0);
  assert.equal(minutes, 195);
  assert.deepEqual(
    examFormat.sections.map((section) => [section.id, section.weight]),
    [
      ["mcq", 40],
      ["saq", 20],
      ["dbq", 25],
      ["leq", 15],
    ],
  );
  assert.throws(
    () =>
      validateExamFormat(
        { ...examFormat, sections: examFormat.sections.slice(1) },
        new Map(sources.map((item) => [item.id, item])),
        "format",
      ),
    /weights must total 100/,
  );
});

test("the published site lists three complete mock exams written for the course", async () => {
  const { readFile } = await import("node:fs/promises");
  const read = async (path) =>
    JSON.parse(await readFile(join(root, "docs/generated", path), "utf8"));
  const routes = await read("world/routes.json");
  const ids = ["world-mock-01", "world-mock-02", "world-mock-03"];
  assert.deepEqual(Object.keys(routes.exam).sort(), ids);
  const index = await read("world/index.json");
  assert.deepEqual(
    index.exams.map((item) => [item.id, item.status, item.questionCount]),
    ids.map((id) => [id, "ready", 55]),
  );
  const questionIds = new Set();
  const promptIds = new Set();
  let items = 0;
  for (const id of ids) {
    const exam = await read(routes.exam[id]);
    assert.deepEqual(
      exam.sections.map((section) => [section.id, section.maxPoints]),
      [
        ["mcq", 55],
        ["saq", 9],
        ["dbq", 7],
        ["leq", 6],
      ],
    );
    for (const section of exam.sections) {
      const entries =
        section.kind === "mcq"
          ? section.questions
          : section.prompts.flatMap((prompt) => prompt.options);
      for (const entry of entries) {
        const seen = section.kind === "mcq" ? questionIds : promptIds;
        assert.equal(seen.has(entry.id), false, `${entry.id} appears in two exams`);
        seen.add(entry.id);
        items += 1;
      }
    }
    // Questions are written for mock exams, not borrowed from topic practice.
    for (const question of exam.sections[0].questions)
      assert.match(question.id, new RegExp(`-m${id.slice(-1)}-`));
  }
  assert.equal(questionIds.size, 165);
  assert.ok(items > 165);
});

test("a ready mock exam resolves existing questions and prompts into one payload", async () => {
  const { read, exam } = await fixture();
  assert.equal(
    read("world/routes.json").exam["world-mock-fixture"],
    "world/exams/world-mock-fixture.json",
  );
  assert.equal(read("world/routes.json").exam["world-mock-later"], undefined);
  assert.deepEqual(
    exam.sections.map((section) => [section.id, section.maxPoints]),
    [
      ["mcq", 55],
      ["saq", 9],
      ["dbq", 7],
      ["leq", 6],
    ],
  );
  assert.equal(exam.sections[0].questions.length, 55);
  assert.ok(exam.sections[0].questions.every((question) => question.skillLabel));
  assert.equal(exam.sections[1].prompts[2].choose, 1);
  assert.equal(exam.format.minutes, 195);
  assert.match(exam.revision, /^[0-9a-f]{16}$/);
  const index = read("world/index.json");
  assert.deepEqual(
    index.exams.map((item) => [item.id, item.status]),
    [
      ["world-mock-fixture", "ready"],
      ["world-mock-later", "soon"],
    ],
  );
  const catalog = read("catalog.json");
  assert.equal(catalog.courses.find((course) => course.id === "world").examCount, 2);
  const html = coursePage({ ...index, units: index.units });
  assert.match(html, /Full mock exams/);
  assert.match(html, /#\/exam\/world-mock-fixture/);
  assert.doesNotMatch(html, /#\/exam\/world-mock-later/);
});

test("exam validation rejects slots that do not match the format", async () => {
  const { read } = await fixture();
  const topics = new Map();
  for (const selection of unit7.quizzes[0].selections) {
    const bank = read(`world/banks/${selection.topicId}.json`);
    topics.set(selection.topicId, {
      lesson: { status: "ready" },
      unit: { status: "ready" },
      bank,
    });
  }
  const writing = new Map();
  for (const id of [
    "world-2-saq-01",
    "world-2-saq-02",
    "world-2-saq-03",
    "world-2-saq-07",
    "world-2-dbq-connectivity",
    "world-2-leq-causation",
    "world-2-leq-comparison",
    "world-2-leq-continuity",
  ])
    writing.set(id, {
      quiz: read(`world/writing/${id}.json`).quiz,
      unit: { status: "ready" },
    });
  const context = { course: { id: "world" }, format: examFormat, topics, writing };
  const resolve = (sections) =>
    resolveExam(
      { ...fixtureExam, sections: { ...fixtureExam.sections, ...sections } },
      context,
      "fixture",
    );
  assert.equal(resolve({}).payload.sections.length, 4);
  assert.throws(
    () => resolve({ saq: { ...fixtureExam.sections.saq, q1: ["world-2-saq-01"] } }),
    /needs a secondary-source stimulus|used twice/,
  );
  assert.throws(
    () => resolve({ saq: { ...fixtureExam.sections.saq, q3: ["world-2-saq-03"] } }),
    /needs 2 writing IDs/,
  );
  assert.throws(
    () => resolve({ dbq: { q1: ["world-2-leq-causation"] } }),
    /is not a DBQ/,
  );
  assert.throws(
    () =>
      resolve({
        mcq: { selections: unit7.quizzes[0].selections.slice(1) },
      }),
    /needs exactly 55 questions/,
  );
  assert.throws(() => resolve({ extra: {} }), /section extra is not in the exam format/);
  assert.throws(
    () => resolveExam({ ...fixtureExam, id: "mock-1" }, context, "fixture"),
    /must start with world-/,
  );
  assert.equal(writingMaxPoints(writing.get("world-2-dbq-connectivity").quiz), 7);
});

test("a timed attempt runs the sections in order and submits at the deadline", async () => {
  const { exam } = await fixture();
  let attempt = createAttempt(exam, { now: 0, timed: true });
  assert.equal(attempt.status, "intro");
  assert.equal(remainingMs(attempt, exam, 0), null);
  attempt = startSection(attempt, exam, 1000);
  assert.equal(remainingMs(attempt, exam, 1000), 55 * MINUTE);
  const [first, second] = exam.sections[0].questions;
  attempt = answerQuestion(attempt, exam, first.id, first.correctAnswer, 2000);
  attempt = answerQuestion(
    attempt,
    exam,
    second.id,
    (second.correctAnswer + 1) % 4,
    2000,
  );
  attempt = toggleFlag(attempt, exam, second.id, 2000);
  assert.equal(answerQuestion(attempt, exam, first.id, 9, 2000), attempt, "out of range");
  // Nothing happens before the deadline; afterward the part is stamped at the deadline.
  assert.equal(tick(attempt, exam, 55 * MINUTE), attempt);
  attempt = tick(attempt, exam, 55 * MINUTE + 1000);
  assert.equal(attempt.sections.mcq.expired, true);
  assert.equal(attempt.sections.mcq.submittedAt, 1000 + 55 * MINUTE);
  assert.equal(attempt.status, "between");
  assert.equal(
    answerQuestion(attempt, exam, first.id, 0, 1),
    attempt,
    "locked after submit",
  );

  // Part B: a choose-one prompt keeps one choice; the break follows it.
  attempt = startSection(attempt, exam, 60 * MINUTE);
  const saq = exam.sections[1];
  const [optionA, optionB] = saq.prompts[2].options;
  attempt = chooseOption(attempt, exam, "q3", optionA.id, 60 * MINUTE);
  attempt = chooseOption(attempt, exam, "q3", optionB.id, 60 * MINUTE);
  assert.deepEqual(
    chosenOptions(attempt, saq, saq.prompts[2]).map((option) => option.id),
    [optionB.id],
  );
  attempt = writeResponse(
    attempt,
    exam,
    {
      promptId: "q1",
      optionId: saq.prompts[0].options[0].id,
      fieldId: "a",
      text: "An answer.",
    },
    61 * MINUTE,
  );
  assert.equal(
    writeResponse(attempt, exam, {
      promptId: "q1",
      optionId: "nope",
      fieldId: "a",
      text: "x",
    }),
    attempt,
  );
  attempt = submitSection(attempt, exam, 70 * MINUTE);
  assert.equal(attempt.status, "break");
  // A closed tab can miss several deadlines; tick applies all that passed.
  attempt = tick(attempt, exam, 90 * MINUTE);
  assert.equal(attempt.status, "between");
  attempt = startSection(attempt, exam, 91 * MINUTE);
  attempt = tick(attempt, exam, 91 * MINUTE + 61 * MINUTE);
  assert.equal(attempt.sections.dbq.expired, true);
  attempt = startSection(attempt, exam, 160 * MINUTE);
  attempt = submitSection(attempt, exam, 170 * MINUTE);
  assert.equal(attempt.status, "finished");
  assert.equal(attempt.finishedAt, 170 * MINUTE);
});

test("untimed attempts never expire, and breaks can end early", async () => {
  const { exam } = await fixture();
  let attempt = startSection(createAttempt(exam, { now: 0, timed: false }), exam, 0);
  assert.equal(remainingMs(attempt, exam, 10 * 60 * MINUTE), null);
  assert.equal(tick(attempt, exam, 10 * 60 * MINUTE), attempt);
  attempt = submitSection(attempt, exam, MINUTE);
  attempt = submitSection(startSection(attempt, exam, MINUTE), exam, 2 * MINUTE);
  assert.equal(attempt.status, "break");
  assert.equal(endBreak(attempt, 3 * MINUTE).status, "between");
});

test("scores combine multiple choice with self-scored writing by exam weight", async () => {
  const { exam } = await fixture();
  let attempt = startSection(createAttempt(exam, { now: 0 }), exam, 0);
  for (const question of exam.sections[0].questions)
    attempt = answerQuestion(attempt, exam, question.id, question.correctAnswer, 0);
  attempt = submitSection(attempt, exam, MINUTE);
  attempt = startSection(attempt, exam, MINUTE);
  const saq = exam.sections[1];
  const q1 = saq.prompts[0].options[0];
  attempt = writeResponse(
    attempt,
    exam,
    { promptId: "q1", optionId: q1.id, fieldId: "a", text: "Answer" },
    MINUTE,
  );
  attempt = submitSection(attempt, exam, 2 * MINUTE);
  attempt = endBreak(attempt, 2 * MINUTE);
  for (const section of exam.sections.slice(2)) {
    attempt = startSection(attempt, exam, 3 * MINUTE);
    attempt = submitSection(attempt, exam, 4 * MINUTE);
  }
  assert.equal(attempt.status, "finished");
  let sheet = scoreSheet(attempt, exam);
  assert.equal(sheet.sections[0].points, 55);
  assert.equal(sheet.complete, false, "the written SAQ is not scored yet");
  assert.equal(sheet.weightedPercent, 40);
  const key = `saq/q1/${q1.id}`;
  for (const part of ["a", "b", "c"])
    attempt = setScore(attempt, exam, { key, criterionId: part, points: 5 }, 5 * MINUTE);
  assert.equal(attempt.scores[key].a, 1, "scores are clamped to the criterion");
  assert.equal(
    setScore(attempt, exam, {
      key: "saq/q3/world-2-saq-03",
      criterionId: "a",
      points: 1,
    }),
    attempt,
    "an unchosen option cannot be scored",
  );
  sheet = scoreSheet(attempt, exam);
  assert.equal(sheet.complete, true);
  assert.equal(sheet.sections[1].points, 3);
  // 40 for multiple choice plus 3 of 9 short-answer points at 20%.
  assert.equal(sheet.weightedPercent, 46.7);
});

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
}

test("the exam store resumes an attempt, keeps history, and drops stale revisions", async () => {
  const { exam } = await fixture();
  const storage = memoryStorage();
  const adapter = createLocalAdapter({
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "exam-test",
  });
  const store = createExamStore({ adapter, exam });
  await store.ready;
  await store.start({ timed: true, now: 0 });
  let attempt = startSection(store.attempt, exam, 0);
  await store.update(attempt);
  await store.flush();

  const reopened = createExamStore({ adapter, exam });
  await reopened.ready;
  assert.equal(reopened.attempt.status, "section");
  for (const section of exam.sections) {
    attempt = startSection(reopened.attempt, exam, MINUTE);
    attempt = submitSection(attempt, exam, 2 * MINUTE);
    if (attempt.status === "break") attempt = endBreak(attempt, 2 * MINUTE);
    await reopened.update(attempt);
    assert.ok(section);
  }
  assert.equal(reopened.attempt.status, "finished");
  assert.equal(reopened.history.length, 1);

  const updated = createExamStore({ adapter, exam: { ...exam, revision: "changed" } });
  await updated.ready;
  assert.equal(updated.attempt, null);
  assert.equal(updated.stale, true);
  assert.equal(updated.history.length, 1);

  const cleared = await adapter.clearScope(`exam:${exam.exam.id}`);
  assert.equal(cleared.ok, true);
  const afterReset = createExamStore({ adapter, exam });
  await afterReset.ready;
  assert.equal(afterReset.attempt, null);
});

test("exam views render each stage without leaking unescaped text", async () => {
  const { exam: payload } = await fixture();
  const exam = { ...payload, exam: { ...payload.exam, title: "<b>Fixture</b>" } };
  const store = { attempt: null, history: [], stale: false, state: "clean" };
  assert.match(examPage(exam, store), /Start timed exam/);
  assert.match(examPage(exam, store), /&lt;b&gt;Fixture&lt;\/b&gt;/);
  let attempt = createAttempt(exam, { now: 0 });
  assert.match(examPage(exam, { ...store, attempt }), /Begin Section I, Part A/);
  attempt = startSection(attempt, exam, 0);
  const mcq = examPage(exam, { ...store, attempt }, {}, 1000);
  assert.match(mcq, /Question 1 of 55/);
  assert.match(mcq, /data-exam-clock>54:59</);
  assert.match(
    examPage(exam, { ...store, attempt }, { confirmSubmit: true }, 0),
    /55 unanswered/,
  );
  attempt = startSection(submitSection(attempt, exam, MINUTE), exam, MINUTE);
  const saq = examPage(exam, { ...store, attempt }, {}, MINUTE);
  assert.match(saq, /Choose 1 to answer/);
  assert.match(saq, /data-exam-field="a"/);
  attempt = endBreak(submitSection(attempt, exam, 2 * MINUTE), 2 * MINUTE);
  attempt = startSection(attempt, exam, 2 * MINUTE);
  assert.match(
    examPage(exam, { ...store, attempt }, {}, 2 * MINUTE),
    /Suggested reading period/,
  );
  assert.match(examPage(exam, { ...store, attempt }, {}, 2 * MINUTE), /Document 7\./);
  for (let index = 0; index < 2; index += 1)
    attempt = submitSection(startSection(attempt, exam, 3 * MINUTE), exam, 3 * MINUTE);
  const results = examPage(exam, { ...store, attempt }, {}, 4 * MINUTE);
  assert.match(results, /Weighted estimate/);
  assert.match(results, /not an AP score/);
  assert.match(results, /0 of 55 correct/);
});

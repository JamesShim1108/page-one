import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { createContentStore } from "../docs/app/content-store.js";
import { createPrintController } from "../docs/app/print/controller.js";
import {
  freezePrintSelection,
  responseSpaceForWriting,
} from "../docs/app/print/selection.js";
import {
  renderLessonDocument,
  renderPracticeDocument,
  renderTermsDocument,
  renderWritingDocument,
} from "../docs/app/print/renderer.js";

const generatedRoot = new URL("../docs/generated/", import.meta.url);

function readGenerated(path) {
  return JSON.parse(fs.readFileSync(new URL(path, generatedRoot), "utf8"));
}

function testContent() {
  return createContentStore({
    fetchJson: async (path) => readGenerated(path),
  });
}

test("print selection freezes eligible IDs and original choice order", () => {
  const questions = [
    {
      id: "q-a",
      prompt: "Choose one.",
      choices: [
        { id: "a", text: "First" },
        { id: "b", text: "Second" },
      ],
      correctAnswer: 1,
      explanation: "The second choice is supported.",
    },
    { id: "q-b", prompt: "Another.", choices: ["Third"] },
  ];
  const selection = freezePrintSelection({
    questions,
    questionIds: ["q-b", "q-a", "missing"],
    revision: "r1",
  });
  assert.deepEqual(selection.questionIds, ["q-b", "q-a"]);
  assert.deepEqual(selection.studentQuestions[1].choices, [
    { id: "a", text: "First" },
    { id: "b", text: "Second" },
  ]);
  assert.equal(selection.studentQuestions[1].correctAnswer, undefined);
  assert.equal(selection.answerKey[1].correctAnswer, 1);
  assert.equal(selection.answerKey[1].explanation, "The second choice is supported.");
});

test("student worksheet excludes answer material while the separate key matches it", () => {
  const question = {
    id: "frozen-1",
    prompt: "Which choice is correct?",
    choices: ["Alpha", "Beta", "Gamma"],
    correctAnswer: 2,
    explanation: "Gamma is the authored explanation.",
  };
  const selection = freezePrintSelection({
    questions: [question],
    questionIds: [question.id],
  });
  const student = renderPracticeDocument({
    selection,
    title: "Frozen practice",
    includeResponseSpace: true,
    publicPath: "/quiz/frozen",
  });
  const key = renderPracticeDocument({
    selection,
    title: "Frozen practice",
    answerKey: true,
    publicPath: "/quiz/frozen",
  });
  assert.match(student, /data-question-id="frozen-1"/);
  assert.match(student, /Alpha/);
  assert.doesNotMatch(student, /Gamma is the authored explanation/);
  assert.doesNotMatch(student, />Answer:</);
  assert.match(key, /data-question-id="frozen-1"/);
  assert.match(key, /Answer:<\/strong> C/);
  assert.match(key, /Gamma is the authored explanation/);
});

test("reading, Terms, and writing previews keep optional private material explicit", () => {
  const lesson = {
    lesson: {
      title: "A lesson",
      period: "1200",
      summary: "Summary",
      bigIdea: "Big idea",
      context: "Context",
      sections: [
        {
          id: "one",
          title: "One section",
          blocks: [
            { type: "paragraph", text: "Authored paragraph." },
            {
              type: "table",
              caption: "A table",
              columns: ["A", "B"],
              rows: [["x", "y"]],
            },
            { type: "image", assetId: "map", alt: "Map", caption: "Caption" },
          ],
          takeaway: "Takeaway",
        },
      ],
      vocabulary: [{ term: "Term", definition: "Definition" }],
    },
    unit: { title: "Unit" },
    sources: [{ label: "Existing authored source label" }],
    assets: {
      map: {
        file: "assets/map.webp",
        width: 100,
        height: 60,
        title: "Map",
        creator: "Page One",
        license: "Original",
        sourceUrl: "https://example.test/source",
        variants: [],
      },
    },
  };
  const reading = renderLessonDocument({
    lessonData: lesson,
    publicPath: "/topic/example",
  });
  assert.match(reading, /A table/);
  assert.match(reading, /lesson-figure/);
  assert.match(reading, /Existing authored source label/);
  assert.doesNotMatch(reading, /Private note/);

  const terms = renderTermsDocument({
    set: {
      title: "Set",
      source: "Existing class list",
      cards: [{ term: "Term", definition: "Definition" }],
    },
    publicPath: "/term-set/set",
  });
  assert.match(terms, /Existing class list/);
  assert.doesNotMatch(terms, /personal note/i);

  const writingQuiz = {
    headline: "Writing task",
    promptTitle: "Prompt",
    prompt: "Explain the relationship.",
    instructions: "Write a response.",
    responseFields: [{ id: "a", label: "Part A", prompt: "Answer", rows: 6 }],
  };
  assert.deepEqual(responseSpaceForWriting(writingQuiz), [
    { id: "a", label: "Part A", prompt: "Answer", rows: 6, required: true },
  ]);
  const blank = renderWritingDocument({ quiz: writingQuiz, publicPath: "/writing/task" });
  assert.match(blank, /print-response-lines/);
  assert.doesNotMatch(blank, /saved response/);
});

test("real generated previews expose public links and preserve the frozen selection", async () => {
  const content = testContent();
  const controller = await createPrintController({
    content,
    route: {
      params: new URLSearchParams("course=world&kind=quiz&quiz=world-1-practice"),
    },
    repaint() {},
  });
  const student = controller.page();
  assert.equal(controller.state.selection.questionIds.length, 21);
  assert.match(student, /Print preview/);
  assert.match(student, /http:\/\/localhost\/#\/quiz\/world-1-practice/);
  assert.match(student, /<svg/);
  assert.doesNotMatch(student, /The examinations connected/);
  assert.doesNotMatch(student, /data-print-document="answer-key"/);

  controller.click({
    target: { closest: () => ({ dataset: { printAction: "show-key" } }) },
  });
  const key = controller.page();
  assert.match(key, /data-print-document="answer-key"/);
  assert.match(key, /Explanation:/);
  assert.equal(controller.state.selection.questionIds[0], "q1");
});

test("unit and session previews report scope before printing and keep cancellation honest", async () => {
  const content = testContent();
  const unit = await createPrintController({
    content,
    route: {
      params: new URLSearchParams("course=world&kind=unit&unit=world-1&topics=world-1-1"),
    },
    repaint() {},
  });
  assert.match(unit.page(), /1 of 7 ready topics selected/);
  assert.match(unit.page(), /data-print-topic="world-1-1"/);
  assert.match(unit.page(), /data-print-paper="letter"/);

  const session = await createPrintController({
    content,
    route: {
      params: new URLSearchParams(
        "course=world&kind=session&topics=world-1-1,world-1-2&count=5",
      ),
    },
    repaint() {},
  });
  assert.equal(session.state.selection.questionIds.length, 5);
  assert.match(session.page(), /does not reopen this exact randomized sheet/);
  session.click({
    target: { closest: () => ({ dataset: { printAction: "print-student" } }) },
  });
  assert.match(session.state.feedback, /did not save a file/);
});

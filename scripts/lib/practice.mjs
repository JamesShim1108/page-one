// Compiles a topic's problem templates (problems.js) into a bank of typed-answer
// questions. Each template becomes one question with several variants, and every
// variant is checked before it can ship:
//
//   1. its structure is complete and its text is clean;
//   2. the template's own verify() recomputes the facts from the displayed expressions;
//   3. every answer key, typed back as text, is graded correct by the real grader;
//   4. plausible wrong answers built from the key are graded not correct.
//
// A variant that fails any check stops the build and names the template and seed.

import { createRandom } from "../../docs/content/practice-kit/index.js";
import { gradeField, answerText, FIELD_TYPES } from "../../docs/app/practice/answers.js";
import { readReal } from "../../docs/app/practice/read.js";
import {
  parseIntervals,
  formatIntervals,
  sameIntervals,
} from "../../docs/app/practice/intervals.js";
import { requireValue, requireText, validateBlocks } from "./validate.mjs";
import { graphReadability } from "./validate-graph.mjs";

export const VARIANTS_PER_TEMPLATE = 8;
const MIN_VARIANTS = 6;
const MAX_ATTEMPTS = 600;
const TEMPLATE_ID = /^p\d{2}$/;

const fail = (location, message) => {
  throw new Error(`${location}: ${message}`);
};

// ---------- Text hygiene ----------

const BAD_TEXT = [
  [
    /\bNaN\b|\[object|\bnull\b|Infinity|\bundefined[x²)]|[(\d]undefined\b/,
    "contains NaN, null, or a leaked JavaScript value",
  ],
  [/—/, "contains an em dash; use a comma, colon, or period"],
  [/\+ −|− −|\+ \+|− \+|--|\+-|\+\s*\+/, "has a doubled sign"],
  [/\s{2,}/, "has repeated spaces"],
  [/(^|[\s(=,×·/])-\d/, "uses a hyphen where a minus sign belongs"],
  [/\(\s|\s\)/, "has a space inside parentheses"],
  [/\b1x|\b0x\b|x\^1\b/, "has an unsimplified term"],
  [
    /(^|[^\d.,/])[−-]?1 (units|meters|feet|inches|seconds|minutes|hours|days|weeks|months|years|degrees|radians|solutions|zeros|points|terms)\b/,
    "uses a plural noun after the number 1",
  ],
];

function checkText(text, location) {
  for (const [pattern, message] of BAD_TEXT)
    if (pattern.test(text)) fail(location, `text ${message}: "${text}"`);
}

// ---------- Wrong answers built from a key ----------

function numericKey(field) {
  return typeof field.key === "number" ? field.key : readReal(String(field.key));
}

function mutants(field) {
  switch (field.type) {
    case "number": {
      const v = numericKey(field);
      const tolerance = field.decimals === undefined ? 1e-9 : 10 ** -field.decimals;
      return [v + 1, v - 1, v * 2, -v, v + 0.5, v / 2]
        .filter((m) => Math.abs(m - v) > 3 * tolerance + 1e-6)
        .map((m) => String(Math.round(m * 1e9) / 1e9));
    }
    case "limit": {
      const key = String(field.key).replace("−", "-");
      if (key === "DNE") return ["0", "∞"];
      if (key === "∞") return ["−∞", "0", "DNE"];
      if (key === "-∞") return ["∞", "0", "DNE"];
      const v = numericKey(field);
      return [String(v + 1), "DNE", v === 0 ? "∞" : "0"];
    }
    case "expr": {
      const variable = (field.vars || ["x"])[0];
      return [`(${field.key})+1`, `2*(${field.key})`, `(${field.key})*(${variable}+1)`];
    }
    case "interval": {
      const list = parseIntervals(String(field.key));
      const out = [];
      const clone = () => list.map((item) => ({ ...item }));
      if (list.length) {
        const a = clone();
        const idx = a.findIndex((item) => Number.isFinite(item.lo));
        if (idx >= 0) {
          a[idx].lo += 1;
          out.push(a);
        }
        const b = field.closure === "any" ? [] : clone();
        const jdx = b.findIndex((item) => Number.isFinite(item.hi));
        if (jdx >= 0) {
          b[jdx].hiClosed = !b[jdx].hiClosed;
          out.push(b);
        }
        const c = field.closure === "any" ? [] : clone();
        const kdx = c.findIndex((item) => Number.isFinite(item.lo));
        if (kdx >= 0) {
          c[kdx].loClosed = !c[kdx].loClosed;
          out.push(c);
        }
      }
      const strings = out.map((candidate) => {
        try {
          return formatIntervals(candidate);
        } catch {
          return "";
        }
      });
      for (const generic of ["(−∞, ∞)", "[0, 0]"])
        if (!sameIntervals(parseIntervals(generic), list)) strings.push(generic);
      return strings.filter(Boolean);
    }
    case "set": {
      const keys = field.key.map(String);
      if (!keys.length) return ["1"];
      const out = [[...keys, "123.5"].join(", ")];
      if (keys.length > 1) out.push(keys.slice(1).join(", "));
      if (!keys.some((k) => k.includes("±")) && !field.complex)
        out.push([`(${keys[0]}) + 1`, ...keys.slice(1)].join(", "));
      return out;
    }
    case "points": {
      const pairs = field.key;
      const text = (list) => list.map(([x, y]) => `(${x}, ${y})`).join(", ");
      const out = [text([[`(${pairs[0][0]}) + 1`, pairs[0][1]], ...pairs.slice(1)])];
      const [x, y] = pairs[0];
      if (String(x) !== String(y)) out.push(text([[y, x], ...pairs.slice(1)]));
      return out;
    }
    case "equations":
      return [field.key.map((k, i) => (i === 0 ? `${k} + 1` : k)).join(", ")];
    case "choice":
      return field.options.filter((o) => o !== field.key);
    default:
      return [];
  }
}

// ---------- One variant ----------

function checkVariant(v, location, assets) {
  requireText(v.stem, location);
  checkText(v.stem, `${location} stem`);
  for (const block of v.stimulusBlocks || []) {
    for (const key of ["caption", "alt"])
      if (typeof block[key] === "string")
        checkText(block[key], `${location} ${block.type} ${key}`);
  }
  requireValue(
    Array.isArray(v.solution) && v.solution.length >= 1,
    location,
    "needs solution steps",
  );
  v.solution.forEach((step) => {
    requireText(step, location);
    checkText(step, `${location} solution`);
  });
  requireValue(Array.isArray(v.parts) && v.parts.length > 0, location, "needs parts");
  const ids = new Set();
  const fieldCount = v.parts.reduce((sum, part) => sum + part.fields.length, 0);
  for (const part of v.parts) {
    if (part.prompt) checkText(part.prompt, `${location} prompt`);
    requireValue(part.fields.length > 0, location, `part ${part.id} has no fields`);
    for (const field of part.fields) {
      requireValue(!ids.has(field.id), location, `duplicate field id ${field.id}`);
      ids.add(field.id);
      requireValue(
        FIELD_TYPES.includes(field.type),
        location,
        `unknown field type ${field.type}`,
      );
      requireValue(
        field.key !== undefined && field.key !== null && field.key !== "",
        location,
        `field ${field.id} has no key`,
      );
      if (field.label) checkText(field.label, `${location} label`);
      requireValue(
        fieldCount === 1 || Boolean(field.label) || Boolean(part.prompt),
        location,
        `field ${field.id} needs a label or part prompt`,
      );
      if (field.type === "choice")
        requireValue(
          Array.isArray(field.options) &&
            field.options.length >= 2 &&
            new Set(field.options).size === field.options.length &&
            field.options.includes(field.key),
          location,
          `choice ${field.id} needs different options that include its key`,
        );
      // Typed back as text, the key must be graded correct.
      const typed = answerText(field);
      const own = gradeField(field, typed);
      requireValue(
        own.status === "correct",
        location,
        `answer key for ${field.id} is not accepted by the grader (typed "${typed}", got ${own.status} ${own.message || ""})`,
      );
      // Wrong answers must not be accepted.
      for (const wrong of mutants(field)) {
        let status = "invalid";
        try {
          status = gradeField(field, wrong).status;
        } catch {
          status = "invalid";
        }
        requireValue(
          status !== "correct",
          location,
          `field ${field.id}: the wrong answer "${wrong}" was graded correct`,
        );
      }
    }
  }
  if (v.stimulusBlocks) validateBlocks(v.stimulusBlocks, assets, location);
}

// The first reason a variant's graphs are hard to read, or null. A seed with such a graph is
// skipped like any other bad draw, so a template only needs to avoid them when most of its
// numbers produce one.
function unreadableGraph(v) {
  for (const block of v.stimulusBlocks || []) {
    if (block.type !== "graph") continue;
    const reason = graphReadability(block);
    if (reason) return reason;
  }
  return null;
}

// Two variants are the same problem when a student sees the same question with the same
// answers. Shuffling the options of a choice box does not make a new problem.
const fingerprint = (v) =>
  JSON.stringify([
    v.stem,
    v.stimulusBlocks || null,
    v.parts.map((part) => [
      part.prompt,
      part.fields.map((field) => [field.key, field.options && [...field.options].sort()]),
    ]),
  ]);

// Shapes a variant for the bank: drops authoring-only data and empty fields.
function publish(v) {
  const { data, ...rest } = v;
  void data;
  return {
    stem: rest.stem,
    ...(rest.stimulusBlocks ? { stimulusBlocks: rest.stimulusBlocks } : {}),
    parts: rest.parts,
    solution: rest.solution,
  };
}

function generate(template, questionId, assets, count, location) {
  const found = [];
  const seen = new Set();
  let rejected = 0;
  let lastUnreadable = "";
  for (let attempt = 0; attempt < MAX_ATTEMPTS && found.length < count; attempt += 1) {
    const random = createRandom(`${questionId}#${attempt}`);
    let v;
    try {
      v = template.make(random, { attempt });
    } catch (error) {
      if (error?.name === "Reject") {
        rejected += 1;
        continue;
      }
      throw new Error(
        `${location} seed ${attempt}: make() failed: ${error.stack || error}`,
      );
    }
    if (!v) {
      rejected += 1;
      continue;
    }
    const where = `${location} seed ${attempt}`;
    const unreadable = unreadableGraph(v);
    if (unreadable) {
      rejected += 1;
      lastUnreadable = unreadable;
      continue;
    }
    try {
      checkVariant(v, where, assets);
      template.verify?.(v);
    } catch (error) {
      throw new Error(
        `${where}: ${error.message}\nvariant: ${JSON.stringify(publish(v))}`,
      );
    }
    const key = fingerprint(v);
    if (seen.has(key)) continue;
    seen.add(key);
    found.push(publish(v));
  }
  requireValue(
    found.length >= MIN_VARIANTS,
    location,
    `only ${found.length} different variants after ${MAX_ATTEMPTS} tries (${rejected} rejected${lastUnreadable ? `; a graph was hard to read: ${lastUnreadable}` : ""}); need at least ${MIN_VARIANTS}`,
  );
  return found;
}

// ---------- A topic ----------

export function compilePractice({ lesson, unit, problems, skills, assets, location }) {
  const quizzes = [];
  requireValue(Array.isArray(problems), location, "problems must be an array");
  const questions = [];
  const ids = new Set();
  const concepts = new Set(lesson.sections.map((section) => section.id));
  for (const template of problems) {
    requireValue(
      TEMPLATE_ID.test(template.id),
      location,
      `bad template id ${template.id}`,
    );
    const id = `${lesson.id}-${template.id}`;
    const here = `${location} ${id}`;
    requireValue(!ids.has(id), here, "duplicate template id");
    ids.add(id);
    requireValue(
      concepts.has(template.concept),
      here,
      `unknown concept ${template.concept}`,
    );
    requireValue(
      skills.items.has(template.skill),
      here,
      `unknown skill ${template.skill}`,
    );
    if (template.reasoning !== undefined)
      requireValue(skills.reasoning.has(template.reasoning), here, "unknown reasoning");
    if (template.skill === "connections")
      requireValue(template.reasoning !== undefined, here, "connections needs reasoning");
    requireValue(
      ["quick", "quiz"].includes(template.tier),
      here,
      "tier is quick or quiz",
    );
    requireValue(typeof template.make === "function", here, "needs make()");
    requireValue(typeof template.verify === "function", here, "needs verify()");
    questions.push({
      id,
      topicId: lesson.id,
      concept: template.concept,
      difficulty: template.tier === "quick" ? "Quick check" : "Core",
      skill: template.skill,
      ...(template.reasoning ? { reasoning: template.reasoning } : {}),
      format: "free",
      unitPractice: template.unit === true,
      variants: generate(template, id, assets, VARIANTS_PER_TEMPLATE, here),
    });
  }
  const quick = questions.filter((_, i) => problems[i].tier === "quick");
  const quiz = questions.filter((_, i) => problems[i].tier === "quiz");
  requireValue(
    quick.length === 4,
    location,
    `needs 4 quick-check templates, has ${quick.length}`,
  );
  requireValue(
    quiz.length === 6,
    location,
    `needs 6 topic-quiz templates, has ${quiz.length}`,
  );
  const forUnit = questions.filter((question) => question.unitPractice);
  requireValue(
    forUnit.length === 3,
    location,
    `needs 3 unit-practice templates, has ${forUnit.length}`,
  );
  requireValue(
    forUnit.filter((question) => quiz.includes(question)).length <= 2,
    location,
    "at most 2 unit-practice templates may come from the topic quiz, so custom practice keeps a pool",
  );
  const base = { courseId: lesson.courseId, unitId: lesson.unitId, topicId: lesson.id };
  quizzes.push(
    {
      id: `${lesson.id}-quick`,
      ...base,
      title: "Quick check",
      quizType: "quick",
      questionIds: quick.map((question) => question.id),
    },
    {
      id: `${lesson.id}-quiz`,
      ...base,
      title: `${lesson.title} topic practice`,
      quizType: "topic",
      customPractice: true,
      questionIds: quiz.map((question) => question.id),
    },
  );
  void unit;
  return {
    questions: questions.map(({ unitPractice, ...question }) => {
      void unitPractice;
      return question;
    }),
    quizzes,
    unitQuestionIds: forUnit.map((question) => question.id),
  };
}

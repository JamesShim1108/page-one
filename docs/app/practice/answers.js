// Grades typed answers. A question has parts, a part has fields, and every field has a
// type and a key. gradeField never throws: it reports one of
//   correct   the entry matches the key
//   wrong     the entry was read and does not match (a message may say what to check)
//   invalid   the entry could not be read; the message says how to fix it, and the quiz
//             does not count it as a try
//   empty     nothing was entered
//
// Field types and their keys:
//   number    key: a number or an exact expression such as "√3/2"; decimals: n accepts
//             a value within one unit in the nth place (rounded or truncated)
//   limit     key: "∞", "−∞", "DNE", or a number
//   expr      key: an expression in `vars` (default ["x"]); strict (default true) also
//             requires the same domain; form: "any" | "factored" | "expanded" | "exponential" | "geometric" |
//             "exponential-e" | "single-log" | "log-sum"
//   interval  key: interval or inequality notation, such as "(−∞, 4]" or "x ≠ 3";
//             closure: "any" accepts round or square brackets at every endpoint
//   set       key: array of numbers (complex: true allows a + bi); empty: true if none
//   points    key: array of [x, y] pairs, in any order
//   equations key: array of equations, such as ["x = 3", "y = 2"]
//   choice    key: one of `options`

import {
  ReadError,
  norm,
  readReal,
  readComplex,
  readExtended,
  sameNumber,
  sameComplex,
  looksLikeApproximation,
  splitTop,
  stripName,
  expandPlusMinus,
  balanced,
} from "./read.js";
import { parseIntervals, sameIntervals } from "./intervals.js";
import { prepare, compareEvaluators, checkForm, equationsEquivalent } from "./algebra.js";

export const FIELD_TYPES = Object.freeze([
  "number",
  "limit",
  "expr",
  "interval",
  "set",
  "points",
  "equations",
  "choice",
]);

// Short reminders shown under an answer box.
export const FIELD_HINTS = Object.freeze({
  number: "Enter a number. Fractions like 3/4 and exact values like √3 work.",
  limit: "Enter a number, ∞, −∞, or DNE.",
  expr: "Enter an expression. The math keys add ², √, and π.",
  interval: "Use interval notation, like (−∞, 3] ∪ (5, ∞).",
  set: "Separate your answers with commas.",
  points: "Write each point as (x, y).",
  equations: "Write each equation, like x = 3, separated by commas.",
  choice: "",
});

const result = (status, message) => (message ? { status, message } : { status });
const correct = () => result("correct");

const cache = new WeakMap();
function cached(field, name, build) {
  let entry = cache.get(field);
  if (!entry) {
    entry = {};
    cache.set(field, entry);
  }
  if (!(name in entry)) entry[name] = build();
  return entry[name];
}

// ---------- number and limit ----------

function keyNumber(field) {
  return cached(field, "number", () =>
    typeof field.key === "number" ? field.key : readReal(String(field.key)),
  );
}

function gradeNumber(field, raw) {
  const text = stripName(String(raw ?? ""));
  if (!text.trim()) return result("empty");
  let student;
  try {
    student = readReal(text);
  } catch (error) {
    if (error instanceof ReadError) return result("invalid", error.message);
    throw error;
  }
  const key = keyNumber(field);
  if (sameNumber(student, key, { decimals: field.decimals })) return correct();
  if (field.decimals === undefined && looksLikeApproximation(text, student, key))
    return result(
      "wrong",
      "That is a decimal approximation. Give the exact value, such as √3 or 3/4.",
    );
  return result("wrong");
}

function readLimit(text) {
  const src = norm(text);
  if (/^(dne|does not exist|d\.n\.e\.)$/i.test(src)) return "DNE";
  return readExtended(src);
}

function gradeLimit(field, raw) {
  const text = stripName(String(raw ?? ""));
  if (!text.trim()) return result("empty");
  let student;
  try {
    student = readLimit(text);
  } catch (error) {
    if (error instanceof ReadError) return result("invalid", error.message);
    throw error;
  }
  const key = cached(field, "limit", () => readLimit(String(field.key)));
  if (student === "DNE" || key === "DNE")
    return student === key ? correct() : result("wrong");
  return sameNumber(student, key, { decimals: field.decimals })
    ? correct()
    : result("wrong");
}

// ---------- expressions ----------

function gradeExpr(field, raw) {
  const text = String(raw ?? "");
  if (!text.trim()) return result("empty");
  const vars = field.vars || ["x"];
  let student;
  try {
    student = prepare(text, vars);
  } catch (error) {
    if (error instanceof ReadError) return result("invalid", error.message);
    throw error;
  }
  const key = cached(field, "expr", () => prepare(String(field.key), vars));
  const outcome = compareEvaluators(student, key, {
    vars,
    strict: field.strict !== false,
    samples: field.samples || [],
  });
  if (!outcome.equal)
    return outcome.domain
      ? result(
          "wrong",
          "Your expression gives the right values where it is defined, but it is not defined at the same inputs as the correct answer.",
        )
      : result("wrong");
  const problem = checkForm(student.tree, field.form, vars, {
    factorDegree: field.factorDegree || 1,
    integerFactors: field.integerFactors === true,
  });
  return problem ? result("wrong", problem) : correct();
}

// ---------- intervals ----------

function gradeInterval(field, raw) {
  if (!String(raw ?? "").trim()) return result("empty");
  let student;
  try {
    student = parseIntervals(String(raw));
  } catch (error) {
    if (error instanceof ReadError) return result("invalid", error.message);
    throw error;
  }
  const key = cached(field, "intervals", () => parseIntervals(String(field.key)));
  return sameIntervals(student, key, {
    decimals: field.decimals,
    ignoreClosure: field.closure === "any",
  })
    ? correct()
    : result("wrong");
}

// ---------- lists of numbers ----------

function readList(raw, complex) {
  let text = norm(raw);
  if (text.startsWith("{") && text.endsWith("}")) text = text.slice(1, -1).trim();
  if (!balanced(text)) throw new ReadError("Check your parentheses.");
  const values = [];
  for (const piece of splitTop(text, /,|;|\band\b|\bor\b/i)) {
    if (!piece) throw new ReadError("There is an extra comma in your list.");
    const body = stripName(piece);
    for (const reading of expandPlusMinus(body))
      values.push(complex ? readComplex(reading) : { re: readReal(reading), im: 0 });
  }
  return values;
}

function dedupe(values, options) {
  const out = [];
  for (const value of values)
    if (!out.some((other) => sameComplex(value, other, options))) out.push(value);
  return out;
}

function matchAll(student, key, options) {
  if (student.length !== key.length) return false;
  const used = new Set();
  for (const target of key) {
    const index = student.findIndex(
      (value, i) => !used.has(i) && sameComplex(value, target, options),
    );
    if (index < 0) return false;
    used.add(index);
  }
  return true;
}

function gradeSet(field, raw) {
  const text = String(raw ?? "");
  if (!text.trim()) return result("empty");
  const options = { decimals: field.decimals };
  const key = cached(field, "set", () =>
    dedupe(
      (field.key || []).flatMap((entry) =>
        readList(String(entry), field.complex === true),
      ),
      {},
    ),
  );
  if (
    /^(none|no solution|no solutions|no real solution|no real solutions|dne|∅|empty set)$/i.test(
      norm(text).trim(),
    )
  )
    return key.length === 0 ? correct() : result("wrong");
  let student;
  try {
    student = dedupe(readList(text, field.complex === true), options);
  } catch (error) {
    if (error instanceof ReadError) return result("invalid", error.message);
    throw error;
  }
  if (matchAll(student, key, options)) return correct();
  if (student.length < key.length)
    return result("wrong", "You have fewer answers than the question needs.");
  if (student.length > key.length)
    return result("wrong", "You have more answers than the question needs.");
  return result("wrong");
}

// ---------- points ----------

function readPoints(raw) {
  const text = norm(raw);
  if (!balanced(text)) throw new ReadError("Check your parentheses.");
  const points = [];
  for (const group of splitTop(text, /,|;|\band\b/i)) {
    if (!/^[([].*[)\]]$/.test(group))
      throw new ReadError("Write each point as an ordered pair, like (2, −1).");
    const coordinates = splitTop(group.slice(1, -1), /,/);
    if (coordinates.length !== 2 || !coordinates[0] || !coordinates[1])
      throw new ReadError("A point has two coordinates, like (2, −1).");
    points.push([readReal(coordinates[0]), readReal(coordinates[1])]);
  }
  return points;
}

function gradePoints(field, raw) {
  const text = String(raw ?? "");
  if (!text.trim()) return result("empty");
  let student;
  try {
    student = readPoints(text);
  } catch (error) {
    if (error instanceof ReadError) return result("invalid", error.message);
    throw error;
  }
  const key = cached(field, "points", () =>
    field.key.map(([x, y]) => [
      typeof x === "number" ? x : readReal(String(x)),
      typeof y === "number" ? y : readReal(String(y)),
    ]),
  );
  const options = { decimals: field.decimals };
  if (student.length !== key.length)
    return result(
      "wrong",
      student.length < key.length
        ? "You have fewer points than the question needs."
        : "You have more points than the question needs.",
    );
  const used = new Set();
  for (const target of key) {
    const index = student.findIndex(
      (point, i) =>
        !used.has(i) &&
        sameNumber(point[0], target[0], options) &&
        sameNumber(point[1], target[1], options),
    );
    if (index < 0) return result("wrong");
    used.add(index);
  }
  return correct();
}

// ---------- equations ----------

function gradeEquations(field, raw) {
  const text = String(raw ?? "");
  if (!text.trim()) return result("empty");
  const vars = field.vars || ["x", "y"];
  const given = splitTop(norm(text), /,|;|\band\b/i);
  if (given.some((item) => !item))
    return result("invalid", "There is an extra comma in your list.");
  const keys = field.key || [];
  if (given.length !== keys.length)
    return result(
      "wrong",
      given.length < keys.length
        ? "You have fewer equations than the question needs."
        : "You have more equations than the question needs.",
    );
  const used = new Set();
  let formProblem = "";
  try {
    for (const target of keys) {
      let matched = -1;
      for (let i = 0; i < given.length && matched < 0; i += 1) {
        if (used.has(i)) continue;
        const outcome = equationsEquivalent(given[i], target, { vars, form: field.form });
        if (outcome.equal) matched = i;
        else if (outcome.problem) formProblem = outcome.problem;
      }
      if (matched < 0) return result("wrong", formProblem);
      used.add(matched);
    }
  } catch (error) {
    if (error instanceof ReadError) return result("invalid", error.message);
    throw error;
  }
  return correct();
}

// ---------- choices ----------

function gradeChoice(field, raw) {
  const text = String(raw ?? "");
  if (!text) return result("empty");
  return text === String(field.key) ? correct() : result("wrong");
}

const GRADERS = {
  number: gradeNumber,
  limit: gradeLimit,
  expr: gradeExpr,
  interval: gradeInterval,
  set: gradeSet,
  points: gradePoints,
  equations: gradeEquations,
  choice: gradeChoice,
};

export function gradeField(field, raw) {
  const grade = GRADERS[field?.type];
  if (!grade) throw new Error(`Unknown field type ${field?.type}`);
  try {
    return grade(field, raw);
  } catch (error) {
    // A bad key is an authoring error, so it must be loud.
    throw new Error(`Cannot grade ${field.type} field: ${error.message}`);
  }
}

// ---------- questions ----------

export function questionFields(question) {
  return (question.parts || []).flatMap((part) => part.fields || []);
}

// values: { [fieldId]: string }. Returns { correct, answered, invalid, fields }.
export function gradeQuestion(question, values = {}) {
  const fields = {};
  let allCorrect = true;
  let answered = false;
  let invalid = false;
  for (const field of questionFields(question)) {
    const outcome = gradeField(field, values[field.id]);
    fields[field.id] = outcome;
    if (outcome.status !== "empty") answered = true;
    if (outcome.status === "invalid") invalid = true;
    if (outcome.status !== "correct") allCorrect = false;
  }
  return { correct: allCorrect, answered, invalid, fields };
}

// A key as it should read on screen: a real minus sign in front of numbers.
const pretty = (text) => String(text).replace(/(^|[\s,(\[])-(?=[\d∞√(])/g, "$1−");

// The correct answer as text, for feedback and for build-time checks.
export function answerText(field) {
  if (field.text !== undefined) return String(field.text);
  if (Array.isArray(field.key)) {
    if (field.type === "points")
      return field.key.map(([x, y]) => `(${pretty(x)}, ${pretty(y)})`).join(", ");
    return field.key.map(pretty).join(", ");
  }
  return pretty(field.key);
}

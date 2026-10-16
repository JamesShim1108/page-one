// PSAT/SAT content contracts: tests, the shared skill taxonomy, public-domain
// passages, and practice items. Runs at build time only. Item verification
// (the math that proves an answer key) is checked here and never shipped.
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";
import {
  requireValue,
  requireText,
  requireId,
  safeUrl,
  QUESTION_QUALITY,
} from "./validate.mjs";
import {
  CHOICE_IDS,
  GRID_IN,
  ITEM_FORMATS,
  NOT_AFFILIATED,
  gridInEntryProblem,
} from "../../docs/app/test-prep/engine.js";

export const TEST_IDS = Object.freeze(["psat89", "psat10", "psatnmsqt", "sat"]);
export const SCALE_FAMILIES = Object.freeze(["psat89", "psat", "sat"]);
export const DIFFICULTIES = Object.freeze(["easy", "medium", "hard"]);

// U.S. public domain: works published in 1930 or earlier, as of 2026. Kept as a
// fixed year so the same content always builds the same way; raise it each
// January after confirming the new cutoff.
export const PUBLIC_DOMAIN_LAST_YEAR = 1930;
export const PASSAGE_BASES = Object.freeze(["us-pre-1931", "us-government-work"]);

// Answer-position limits for a section's bank, alongside the shared length limits.
export const POSITION_QUALITY = Object.freeze({
  minimumBankSize: 8,
  maxShare: 0.4,
  maxRun: 3,
});

// Domains whose items may use a short text written by Page One instead of a
// public-domain passage (student notes, a sentence to revise). Reading items in
// the other two domains always use a cited public-domain passage.
const ORIGINAL_TEXT_DOMAINS = new Set(["rw-expression-ideas", "rw-conventions"]);

// ---------------------------------------------------------------------------
// Exact arithmetic for answer verification.

const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
};

export class Rational {
  constructor(numerator, denominator = 1) {
    requireValue(
      Number.isSafeInteger(numerator) &&
        Number.isSafeInteger(denominator) &&
        denominator !== 0,
      "verification",
      "rationals need safe integers and a nonzero denominator",
    );
    const sign = denominator < 0 ? -1 : 1;
    const divisor = gcd(numerator, denominator);
    this.p = (sign * numerator) / divisor;
    this.q = (sign * denominator) / divisor;
  }
  static from(value) {
    if (value instanceof Rational) return value;
    requireValue(
      Number.isSafeInteger(value),
      "verification",
      `${value} is not an integer; use R(p, q) for an exact fraction`,
    );
    return new Rational(value, 1);
  }
  add(other) {
    const o = Rational.from(other);
    return new Rational(this.p * o.q + o.p * this.q, this.q * o.q);
  }
  sub(other) {
    const o = Rational.from(other);
    return new Rational(this.p * o.q - o.p * this.q, this.q * o.q);
  }
  mul(other) {
    const o = Rational.from(other);
    return new Rational(this.p * o.p, this.q * o.q);
  }
  div(other) {
    const o = Rational.from(other);
    return new Rational(this.p * o.q, this.q * o.p);
  }
  equals(other) {
    const o = Rational.from(other);
    return this.p === o.p && this.q === o.q;
  }
  toNumber() {
    return this.p / this.q;
  }
}

export const R = (p, q = 1) => new Rational(p, q);

const TOLERANCE = 1e-9;

// Exact when both sides are exact; otherwise within floating-point tolerance.
export function sameValue(left, right) {
  if (left === Infinity || right === Infinity) return left === right;
  const exact = (value) =>
    value instanceof Rational ||
    (typeof value === "number" && Number.isSafeInteger(value));
  if (exact(left) && exact(right)) return Rational.from(left).equals(right);
  const a = left instanceof Rational ? left.toNumber() : left;
  const b = right instanceof Rational ? right.toNumber() : right;
  return Math.abs(a - b) <= TOLERANCE * Math.max(1, Math.abs(a), Math.abs(b));
}

// Expressions are authored in this repository and evaluated only by the build.
// The character and name checks stop mistakes, such as a stray quote or a call
// to something other than Math and R, from passing silently.
const EXPRESSION_CHARACTERS = /^[\w\s+\-*/%().,]*$/;

export function evaluate(expression, location, variables = {}) {
  requireValue(
    typeof expression === "string" && expression.trim().length > 0,
    location,
    "expected a verification expression",
  );
  requireValue(
    EXPRESSION_CHARACTERS.test(expression),
    location,
    `expression "${expression}" may use only numbers, names, + - * / % ( ) , .`,
  );
  const names = Object.keys(variables);
  for (const match of expression.matchAll(/(?<![\w.])[A-Za-z_]\w*/g)) {
    requireValue(
      ["R", "Math", "Infinity", ...names].includes(match[0]),
      location,
      `expression "${expression}" uses unknown name ${match[0]}`,
    );
  }
  let value;
  try {
    value = new Function("R", "Math", ...names, `"use strict"; return (${expression});`)(
      R,
      Math,
      ...names.map((name) => variables[name]),
    );
  } catch (error) {
    throw new Error(`${location}: expression "${expression}" failed: ${error.message}`);
  }
  requireValue(
    value instanceof Rational ||
      value === Infinity ||
      (typeof value === "number" && Number.isFinite(value)),
    location,
    `expression "${expression}" must produce a number or R(p, q)`,
  );
  return value;
}

// ---------------------------------------------------------------------------
// Grid-in answer forms.

function parseEntry(entry) {
  const negative = entry.startsWith("-");
  const body = negative ? entry.slice(1) : entry;
  const sign = negative ? -1 : 1;
  if (body.includes("/")) {
    const [p, q] = body.split("/").map(Number);
    return new Rational(sign * p, q);
  }
  if (body.includes(".")) {
    const [whole, fraction] = body.split(".");
    const scale = 10 ** fraction.length;
    return new Rational(sign * (Number(whole || "0") * scale + Number(fraction)), scale);
  }
  return new Rational(sign * Number(body), 1);
}

const fits = (text) =>
  text.length <=
  (text.startsWith("-") ? GRID_IN.maxNegativeLength : GRID_IN.maxPositiveLength);

function terminatingDecimal(value) {
  let q = value.q;
  while (q % 2 === 0 || q % 5 === 0) q /= q % 2 === 0 ? 2 : 5;
  if (q !== 1) return null;
  // Count the decimal places the reduced fraction needs.
  let places = 0;
  while ((value.p * 10 ** places) % value.q !== 0) places += 1;
  const magnitude = Math.abs(value.p) / value.q;
  return { places, text: magnitude.toFixed(places) };
}

// Every form a student could correctly enter for this value: the exact forms
// that fit, plus decimals that fill the space when the exact decimal does not.
// Decimals that fill the space may be truncated or rounded, with or without a
// leading zero when the value is below 1.
export function requiredGridInForms(value) {
  const forms = new Set();
  const negative = (value instanceof Rational ? value.p : value) < 0;
  const sign = negative ? "-" : "";
  const width = negative ? GRID_IN.maxNegativeLength : GRID_IN.maxPositiveLength;
  if (value instanceof Rational || Number.isSafeInteger(value)) {
    const exact = Rational.from(value);
    if (exact.q === 1) {
      const text = String(exact.p);
      requireValue(fits(text), "grid-in", `${text} does not fit in the answer space`);
      forms.add(text);
      return [...forms];
    }
    const fraction = `${exact.p}/${exact.q}`;
    if (fits(fraction)) forms.add(fraction);
    const decimal = terminatingDecimal(exact);
    if (decimal) {
      const variants = decimal.text.startsWith("0.")
        ? [decimal.text, decimal.text.slice(1)]
        : [decimal.text];
      const fitting = variants.map((text) => sign + text).filter(fits);
      if (fitting.length) {
        fitting.forEach((text) => forms.add(text));
        return [...forms];
      }
    }
  }
  // Fill-the-space decimals.
  const magnitude = Math.abs(value instanceof Rational ? value.toNumber() : value);
  const whole = Math.trunc(magnitude);
  const prefixes = whole === 0 ? ["0", ""] : [String(whole)];
  for (const prefix of prefixes) {
    const places = width - sign.length - prefix.length - 1;
    if (places < 1) continue;
    const scale = 10 ** places;
    let truncated, rounded;
    if (value instanceof Rational) {
      const p = Math.abs(value.p);
      truncated = Math.floor((p * scale) / value.q);
      const remainder = (p * scale) % value.q;
      rounded = remainder * 2 >= value.q ? truncated + 1 : truncated;
    } else {
      truncated = Math.floor(magnitude * scale + TOLERANCE);
      rounded = Math.round(magnitude * scale);
    }
    for (const scaled of [truncated, rounded]) {
      const integer = Math.floor(scaled / scale);
      if (String(integer === 0 && prefix === "" ? "" : integer) !== prefix) continue;
      const fraction = String(scaled % scale).padStart(places, "0");
      forms.add(`${sign}${prefix}.${fraction}`);
    }
  }
  requireValue(
    forms.size > 0,
    "grid-in",
    "this value has no form that fits the answer space",
  );
  return [...forms];
}

function validateGridIn(item, value, location) {
  requireValue(
    Array.isArray(item.acceptedAnswers) && item.acceptedAnswers.length > 0,
    location,
    "grid-ins list every accepted answer in acceptedAnswers",
  );
  requireValue(
    new Set(item.acceptedAnswers).size === item.acceptedAnswers.length,
    location,
    "acceptedAnswers has a duplicate",
  );
  const required = requiredGridInForms(value);
  for (const form of required)
    requireValue(
      item.acceptedAnswers.includes(form),
      location,
      `acceptedAnswers is missing ${form}; every accepted form must be listed (${required.join(", ")})`,
    );
  const exactValue = value instanceof Rational || Number.isSafeInteger(value);
  for (const entry of item.acceptedAnswers) {
    const problem = gridInEntryProblem(entry);
    requireValue(
      !problem,
      location,
      `accepted answer ${entry} breaks the entry rules: ${problem}`,
    );
    requireValue(
      required.includes(entry) || (exactValue && sameValue(parseEntry(entry), value)),
      location,
      `accepted answer ${entry} does not equal the verified answer`,
    );
  }
}

// ---------------------------------------------------------------------------
// Verification of math keys.

const DEFAULT_SAMPLES = [-3, -1.5, 0, 0.5, 2, 4.25, 7];

function validateVerification(item, location) {
  const verification = item.verification;
  requireValue(
    verification && typeof verification === "object",
    location,
    "math items need a verification record that computes the key",
  );
  if (verification.kind === "value") {
    const value = evaluate(verification.compute, `${location} verification`);
    if (item.format === "grid-in") {
      validateGridIn(item, value, location);
      return;
    }
    const values = verification.choiceValues || {};
    requireValue(
      CHOICE_IDS.every((id) => typeof values[id] === "string"),
      location,
      "value verification lists choiceValues for A, B, C, and D",
    );
    const choiceValue = Object.fromEntries(
      CHOICE_IDS.map((id) => [id, evaluate(values[id], `${location} choice ${id}`)]),
    );
    requireValue(
      sameValue(choiceValue[item.answer], value),
      location,
      `computed key ${verification.compute} does not match choice ${item.answer}`,
    );
    for (const id of CHOICE_IDS.filter((choice) => choice !== item.answer))
      requireValue(
        !sameValue(choiceValue[id], value),
        location,
        `choice ${id} also equals the computed key, so the item has two right answers`,
      );
    return;
  }
  if (verification.kind === "expression") {
    requireValue(
      item.format === "single-select",
      location,
      "expression checks are for choices",
    );
    const variables = verification.variables;
    requireValue(
      Array.isArray(variables) &&
        variables.length > 0 &&
        variables.every((name) => /^[a-z]$/.test(name)),
      location,
      "expression verification names one-letter variables",
    );
    const samples = verification.samples || DEFAULT_SAMPLES;
    const scope = (index) =>
      Object.fromEntries(
        variables.map((name, offset) => [
          name,
          samples[(index + offset * 3) % samples.length],
        ]),
      );
    const expressions = verification.choiceExpressions || {};
    requireValue(
      CHOICE_IDS.every((id) => typeof expressions[id] === "string"),
      location,
      "expression verification lists choiceExpressions for A, B, C, and D",
    );
    const at = (expression, index, label) =>
      evaluate(expression, `${location} ${label}`, scope(index));
    for (const id of CHOICE_IDS) {
      const results = samples.map((_, index) =>
        sameValue(
          at(expressions[id], index, `choice ${id}`),
          at(verification.compute, index, "key"),
        ),
      );
      requireValue(
        id === item.answer ? results.every(Boolean) : results.some((same) => !same),
        location,
        id === item.answer
          ? `choice ${id} is not equivalent to ${verification.compute}`
          : `choice ${id} is equivalent to the key at every sample`,
      );
    }
    return;
  }
  throw new Error(`${location}: verification kind must be "value" or "expression"`);
}

// ---------------------------------------------------------------------------
// Records.

function oneSentence(text) {
  const trimmed = String(text).trim();
  const ends = trimmed.match(/[.!?](?=\s|$)/g) || [];
  return ends.length === 1 && /[.!?]["')\]]?$/.test(trimmed);
}

export function validateTests(tests, sources, location) {
  requireValue(Array.isArray(tests), location, "tests must be an array");
  requireValue(
    tests
      .map((test) => test.id)
      .sort()
      .join() === [...TEST_IDS].sort().join(),
    location,
    `define exactly these tests: ${TEST_IDS.join(", ")}`,
  );
  const sourceIds = new Set(sources.map((source) => source.id));
  const orders = new Set();
  for (const test of tests) {
    const at = `${location} ${test.id}`;
    requireValue(test.schemaVersion === 1, at, "schemaVersion must be 1");
    for (const field of ["title", "shortTitle", "audience", "description"])
      requireText(test[field], at);
    requireValue(
      Number.isInteger(test.order) && test.order > 0,
      at,
      "add a positive order",
    );
    requireValue(!orders.has(test.order), at, "duplicate order");
    orders.add(test.order);
    requireValue(SCALE_FAMILIES.includes(test.scale?.family), at, "unknown scale family");
    for (const part of ["total", "section"]) {
      const range = test.scale[part];
      requireValue(
        Number.isInteger(range?.min) &&
          Number.isInteger(range?.max) &&
          range.min < range.max,
        at,
        `scale.${part} needs integer min < max`,
      );
    }
    requireValue(
      test.scale.total.min === test.scale.section.min * 2 &&
        test.scale.total.max === test.scale.section.max * 2,
      at,
      "the total scale is the sum of two section scales",
    );
    requireValue(
      test.sections?.map((section) => section.id).join() === "rw,math",
      at,
      "sections are rw then math",
    );
    for (const section of test.sections)
      for (const field of ["questions", "minutes", "modules"])
        requireValue(
          Number.isInteger(section[field]) && section[field] > 0,
          at,
          `${section.id}.${field} must be a positive integer`,
        );
    for (const id of test.sourceIds || [])
      requireValue(sourceIds.has(id), at, `unknown source ${id}`);
  }
  // The PSAT 8/9 scale must stay separate from every other test's scale.
  const psat89 = tests.find((test) => test.id === "psat89");
  requireValue(
    tests.every(
      (test) => test.id === "psat89" || test.scale.family !== psat89.scale.family,
    ),
    location,
    "PSAT 8/9 has its own scale family",
  );
}

export function validateTaxonomy(taxonomy, location) {
  requireValue(taxonomy?.schemaVersion === 1, location, "schemaVersion must be 1");
  requireValue(
    taxonomy.sections?.map((section) => section.id).join() === "rw,math",
    location,
    "sections are rw then math",
  );
  const ids = new Set();
  const skills = new Map();
  const claim = (id, at) => {
    requireId(id, at);
    requireValue(!ids.has(id), at, `duplicate taxonomy ID ${id}`);
    ids.add(id);
  };
  for (const section of taxonomy.sections) {
    requireText(section.title, location);
    requireValue(
      section.formats?.length &&
        section.formats.every((format) => ITEM_FORMATS.includes(format)),
      location,
      `${section.id} lists unknown formats`,
    );
    requireValue(section.domains?.length, location, `${section.id} needs domains`);
    for (const domain of section.domains) {
      const at = `${location} ${domain.id}`;
      claim(domain.id, at);
      requireValue(
        domain.id.startsWith(`${section.id}-`),
        at,
        `must start with ${section.id}-`,
      );
      requireText(domain.title, at);
      for (const [testId, title] of Object.entries(domain.titleByTest || {})) {
        requireValue(TEST_IDS.includes(testId), at, `unknown test ${testId}`);
        requireText(title, at);
      }
      requireValue(domain.skills?.length, at, "needs skills");
      for (const skill of domain.skills) {
        const skillAt = `${location} ${skill.id}`;
        claim(skill.id, skillAt);
        requireValue(
          skill.id.startsWith(`${section.id}-`),
          skillAt,
          `must start with ${section.id}-`,
        );
        requireText(skill.title, skillAt);
        requireValue(
          skill.tests?.length && skill.tests.every((id) => TEST_IDS.includes(id)),
          skillAt,
          "tests must list known test IDs",
        );
        for (const variant of skill.variants || []) {
          requireId(variant.id, skillAt);
          requireText(variant.title, skillAt);
        }
        skills.set(skill.id, { section, domain, skill });
      }
    }
  }
  return skills;
}

export function validatePassages(passages, location) {
  requireValue(Array.isArray(passages), location, "passages must be an array");
  const byId = new Map();
  for (const passage of passages) {
    const at = `${location} ${passage.id}`;
    requireId(passage.id, at);
    requireValue(passage.id.startsWith("tp-p-"), at, 'passage IDs start with "tp-p-"');
    requireValue(!byId.has(passage.id), at, "duplicate passage ID");
    requireText(passage.text, at);
    const source = passage.source || {};
    for (const field of ["author", "title", "publication"])
      requireText(source[field], at);
    requireValue(
      Number.isInteger(source.year),
      at,
      "source.year is the publication year",
    );
    requireValue(
      PASSAGE_BASES.includes(source.basis),
      at,
      `basis must be ${PASSAGE_BASES.join(" or ")}`,
    );
    if (source.basis === "us-pre-1931")
      requireValue(
        source.year <= PUBLIC_DOMAIN_LAST_YEAR,
        at,
        `published ${source.year}; only works from ${PUBLIC_DOMAIN_LAST_YEAR} or earlier are public domain`,
      );
    requireValue(Boolean(source.url), at, "cite a URL for the edition used");
    safeUrl(source.url, at);
    for (const edit of passage.edits || []) {
      requireText(edit.original, at);
      requireText(edit.replacement, at);
      requireValue(
        passage.text.includes(`[${edit.replacement}]`),
        at,
        `edit [${edit.replacement}] must appear in brackets in the text`,
      );
    }
    byId.set(passage.id, passage);
  }
  return byId;
}

function validateTable(table, at) {
  requireText(table.title, at);
  requireValue(
    Array.isArray(table.columns) && table.columns.length > 1,
    at,
    "tables need columns",
  );
  table.columns.forEach((column) => requireText(column, at));
  requireValue(
    Array.isArray(table.rows) &&
      table.rows.length > 0 &&
      table.rows.every(
        (row) => Array.isArray(row) && row.length === table.columns.length,
      ),
    at,
    "every table row needs one cell per column",
  );
  requireValue(
    table.data === "illustrative" || (table.data && typeof table.data === "object"),
    at,
    'table.data is "illustrative" for invented data, or a cited source',
  );
  if (table.data !== "illustrative") {
    requireText(table.data.label, at);
    safeUrl(table.data.url, at);
  }
}

export function validateItem(item, { skills, passages, location }) {
  const at = `${location} ${item.id || "(missing id)"}`;
  requireId(item.id, at);
  requireValue(item.id.startsWith("tp-"), at, 'item IDs start with "tp-"');
  requireValue(item.schemaVersion === 1, at, "schemaVersion must be 1");
  const place = skills.get(item.skillId);
  requireValue(place, at, `unknown skill ${item.skillId}`);
  const { section, domain, skill } = place;
  const tests = item.tests || skill.tests;
  requireValue(
    tests.length > 0 && tests.every((id) => skill.tests.includes(id)),
    at,
    `tests must be a subset of where ${skill.id} is tested (${skill.tests.join(", ")})`,
  );
  requireValue(
    DIFFICULTIES.includes(item.difficulty),
    at,
    `difficulty is ${DIFFICULTIES.join(", ")}`,
  );
  requireValue(
    section.formats.includes(item.format),
    at,
    `${section.title} items cannot be ${item.format}`,
  );
  if (skill.variants)
    requireValue(
      skill.variants.some((variant) => variant.id === item.variant),
      at,
      `name a variant: ${skill.variants.map((variant) => variant.id).join(", ")}`,
    );
  else requireValue(item.variant === undefined, at, `${skill.id} has no variants`);
  requireText(item.stem, at);
  requireText(item.explanation, at);

  if (section.id === "rw") {
    if (item.passageId)
      requireValue(passages.has(item.passageId), at, `unknown passage ${item.passageId}`);
    if (item.originalText !== undefined) {
      requireValue(
        ORIGINAL_TEXT_DOMAINS.has(domain.id),
        at,
        "reading items use a cited public-domain passage, not originalText",
      );
      requireText(item.originalText, at);
    }
    requireValue(
      Boolean(item.passageId) !== (item.originalText !== undefined),
      at,
      "use exactly one of passageId or originalText",
    );
  } else {
    requireValue(
      !item.passageId && item.originalText === undefined,
      at,
      "math items have no passage",
    );
  }
  if (item.table) validateTable(item.table, at);
  if (item.variant === "quantitative")
    requireValue(Boolean(item.table), at, "quantitative evidence needs a table");

  if (item.format === "single-select") {
    requireValue(
      Array.isArray(item.choices) &&
        item.choices.map((choice) => choice.id).join() === CHOICE_IDS.join(),
      at,
      "single-select items have choices A, B, C, D in order",
    );
    item.choices.forEach((choice) => requireText(choice.text, at));
    requireValue(
      new Set(item.choices.map((choice) => choice.text.trim().toLowerCase())).size === 4,
      at,
      "choices must differ",
    );
    requireValue(CHOICE_IDS.includes(item.answer), at, "answer is A, B, C, or D");
    requireValue(
      CHOICE_IDS.includes(item.nearMiss) && item.nearMiss !== item.answer,
      at,
      "nearMiss names the one convincing distractor",
    );
    const wrong = CHOICE_IDS.filter((id) => id !== item.answer);
    requireValue(
      Object.keys(item.rationales || {})
        .sort()
        .join() === wrong.join(),
      at,
      `rationales has one entry for each distractor (${wrong.join(", ")})`,
    );
    for (const id of wrong)
      requireValue(
        oneSentence(item.rationales[id]),
        at,
        `rationale ${id} must be one sentence`,
      );
    requireValue(
      item.acceptedAnswers === undefined,
      at,
      "acceptedAnswers is for grid-ins",
    );
  } else {
    for (const field of ["choices", "answer", "nearMiss", "rationales"])
      requireValue(item[field] === undefined, at, `grid-ins have no ${field}`);
  }

  // Every math key is proven by computation. Reading and Writing items may add
  // one too, such as a quantitative-evidence item that reads a value off a table.
  if (section.id === "math" || item.verification) validateVerification(item, at);

  return { ...place, tests };
}

const plainLength = (text) => String(text).replace(/\s+/g, " ").trim().length;

// Patterns a student could exploit across a section's items.
export function validateItemPatterns(items, location) {
  const choiceItems = items.filter((item) => item.format === "single-select");
  if (choiceItems.length >= QUESTION_QUALITY.minimumBankSize) {
    let longest = 0;
    let ratioTotal = 0;
    for (const item of choiceItems) {
      const lengths = Object.fromEntries(
        item.choices.map((choice) => [choice.id, plainLength(choice.text)]),
      );
      const correct = lengths[item.answer];
      const others = CHOICE_IDS.filter((id) => id !== item.answer).map(
        (id) => lengths[id],
      );
      if (others.every((length) => correct > length)) longest += 1;
      ratioTotal +=
        correct / (others.reduce((sum, value) => sum + value, 0) / others.length);
    }
    const share = longest / choiceItems.length;
    requireValue(
      share <= QUESTION_QUALITY.maxLongestCorrectShare &&
        share >= QUESTION_QUALITY.minLongestCorrectShare,
      location,
      `the correct choice is the longest in ${longest} of ${choiceItems.length} items; keep it between ${QUESTION_QUALITY.minLongestCorrectShare * 100}% and ${QUESTION_QUALITY.maxLongestCorrectShare * 100}%`,
    );
    const ratio = ratioTotal / choiceItems.length;
    requireValue(
      ratio <= QUESTION_QUALITY.maxAverageLengthRatio,
      location,
      `correct choices average ${ratio.toFixed(2)}x the distractor length; keep it at or below ${QUESTION_QUALITY.maxAverageLengthRatio}x`,
    );
  }
  if (choiceItems.length >= POSITION_QUALITY.minimumBankSize) {
    for (const id of CHOICE_IDS) {
      const count = choiceItems.filter((item) => item.answer === id).length;
      requireValue(
        count > 0,
        location,
        `no item has ${id} as its answer; vary answer positions`,
      );
      requireValue(
        count / choiceItems.length <= POSITION_QUALITY.maxShare,
        location,
        `${id} is the answer in ${count} of ${choiceItems.length} items; keep each letter at or below ${POSITION_QUALITY.maxShare * 100}%`,
      );
    }
  }
  let run = 0;
  let previous = "";
  for (const item of choiceItems) {
    run = item.answer === previous ? run + 1 : 1;
    previous = item.answer;
    requireValue(
      run <= POSITION_QUALITY.maxRun,
      location,
      `${run} items in a row have answer ${item.answer}; keep runs at ${POSITION_QUALITY.maxRun} or fewer`,
    );
  }
  const feedback = new Map();
  for (const item of items)
    for (const text of [...Object.values(item.rationales || {}), item.explanation]) {
      const key = text.replace(/\s+/g, " ").trim().toLowerCase();
      feedback.set(key, (feedback.get(key) || 0) + 1);
    }
  for (const [text, count] of feedback)
    requireValue(
      count <= QUESTION_QUALITY.maxRepeatedFeedback,
      location,
      `feedback is repeated ${count} times; write it for its item: "${text.slice(0, 60)}"`,
    );
}

// ---------------------------------------------------------------------------
// Generated output.

const json = (value) => JSON.stringify(value);

// Browser copy of an item. Verification stays in the authored file.
function publicItem(item, place, passages) {
  const { verification: _verification, ...rest } = item;
  return {
    ...rest,
    tests: place.tests,
    sectionId: place.section.id,
    domainId: place.domain.id,
    skillTitle: place.skill.title,
    ...(item.passageId ? { passage: passages.get(item.passageId) } : {}),
  };
}

export async function compileTestPrep({
  contentRoot,
  emit,
  readModule,
  optionalModule,
  exists,
}) {
  const root = join(contentRoot, "test-prep");
  if (!(await exists(root))) return null;
  const sources = await readModule(join(root, "sources.js"), "sources");
  for (const source of sources) {
    requireId(source.id, "test-prep/sources.js");
    requireText(source.label, "test-prep/sources.js");
    safeUrl(source.url, "test-prep/sources.js");
  }
  const tests = await readModule(join(root, "tests.js"), "tests");
  validateTests(tests, sources, "test-prep/tests.js");
  const taxonomy = await readModule(join(root, "taxonomy.js"), "taxonomy");
  const skills = validateTaxonomy(taxonomy, "test-prep/taxonomy.js");
  const passages = validatePassages(
    await optionalModule(join(root, "passages.js"), "passages", []),
    "test-prep/passages.js",
  );

  const itemsRoot = join(root, "items");
  const items = [];
  const seen = new Set();
  if (await exists(itemsRoot)) {
    for (const filename of (await readdir(itemsRoot))
      .filter((name) => name.endsWith(".js"))
      .sort()) {
      const location = `test-prep/items/${filename}`;
      const fileItems = await readModule(join(itemsRoot, filename), "items");
      requireValue(Array.isArray(fileItems), location, "items must be an array");
      for (const item of fileItems) {
        requireValue(!seen.has(item.id), location, `duplicate item ID ${item.id}`);
        seen.add(item.id);
        items.push({ item, place: validateItem(item, { skills, passages, location }) });
      }
      validateItemPatterns(fileItems, location);
    }
  }
  for (const section of taxonomy.sections)
    validateItemPatterns(
      items
        .filter(({ place }) => place.section.id === section.id)
        .map(({ item }) => item),
      `test-prep ${section.id} items`,
    );

  const count = (testId, predicate) =>
    items.filter(({ place }) => place.tests.includes(testId) && predicate(place)).length;
  const bankPaths = {};
  for (const section of taxonomy.sections) {
    const sectionItems = items.filter(({ place }) => place.section.id === section.id);
    if (!sectionItems.length) continue;
    const path = `test-prep/banks/${section.id}.json`;
    bankPaths[section.id] = path;
    emit(path, {
      schemaVersion: 1,
      sectionId: section.id,
      items: sectionItems.map(({ item, place }) => publicItem(item, place, passages)),
    });
  }

  const testRecords = [...tests]
    .sort((a, b) => a.order - b.order)
    .map((test) => ({
      id: test.id,
      order: test.order,
      title: test.title,
      shortTitle: test.shortTitle,
      audience: test.audience,
      description: test.description,
      scale: test.scale,
      sourceIds: test.sourceIds || [],
      itemCount: count(test.id, () => true),
      sections: test.sections.map((format) => {
        const section = taxonomy.sections.find((entry) => entry.id === format.id);
        return {
          ...format,
          title: section.title,
          formats: section.formats,
          bankPath: bankPaths[section.id] || "",
          itemCount: count(test.id, (place) => place.section.id === section.id),
          domains: section.domains
            .map((domain) => ({
              id: domain.id,
              title: domain.titleByTest?.[test.id] || domain.title,
              itemCount: count(test.id, (place) => place.domain.id === domain.id),
              skills: domain.skills
                .filter((skill) => skill.tests.includes(test.id))
                .map((skill) => ({
                  id: skill.id,
                  title: skill.title,
                  ...(skill.variants ? { variants: skill.variants } : {}),
                  itemCount: count(test.id, (place) => place.skill.id === skill.id),
                })),
            }))
            .filter((domain) => domain.skills.length),
        };
      }),
    }));
  const body = { notice: NOT_AFFILIATED, sources, tests: testRecords };
  const revision = createHash("sha256").update(json(body)).digest("hex").slice(0, 16);
  emit("test-prep/index.json", { schemaVersion: 1, revision, ...body });
  return { tests: testRecords, itemCount: items.length };
}

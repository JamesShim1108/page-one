// Low-level reading of typed math answers. Everything here is pure, so the build,
// the Node tests, and the browser all read an answer the same way.
//
// A ReadError carries a message written for the student. Reading failures are not
// wrong answers: the quiz asks the student to fix the entry and does not count a try.

import { createEngine, parseTree, describe } from "../math/engine.js";

export class ReadError extends Error {
  constructor(message) {
    super(message);
    this.name = "ReadError";
  }
}

const REAL = createEngine();
const COMPLEX = createEngine({ settings: { complex: true } });

// Unicode and word forms become one ASCII-friendly spelling. Superscripts and the
// radical sign stay as they are, because the math engine reads them.
export function norm(raw) {
  return String(raw ?? "")
    .replace(/[   ]/g, " ")
    .replace(/[−–—]/g, "-")
    .replace(/[≤⩽]/g, "<=")
    .replace(/[≥⩾]/g, ">=")
    .replace(/≠/g, "!=")
    .replace(/∞/g, "inf")
    .replace(/\binfinity\b/gi, "inf")
    .replace(/∪/g, " U ")
    .replace(/\bunion\b/gi, " U ")
    .replace(/\s+/g, " ")
    .trim();
}

function engineMessage(error, src) {
  const text = String(error?.message || "");
  return text && text.length < 90
    ? `I could not read "${src}". ${text}.`
    : `I could not read "${src}".`;
}

// "1/2x" is (1/2)x on a calculator but 1/(2x) to many students. A typed answer
// that could be read both ways is returned to the student instead of guessed.
function checkAmbiguity(src, functions = []) {
  let parsed;
  try {
    parsed = parseTree(src, { functions });
  } catch (error) {
    throw new ReadError(engineMessage(error, src));
  }
  if (parsed.readAs)
    throw new ReadError(
      `"${src}" is read as ${describe(parsed.tree)}. Add parentheses to show exactly what you mean.`,
    );
  return parsed.tree;
}

export function readReal(text) {
  const src = String(text ?? "").trim();
  if (!src) throw new ReadError("Enter a number.");
  if (/[=<>]/.test(src)) throw new ReadError("Enter a number, not an equation.");
  checkAmbiguity(src);
  let value;
  try {
    value = REAL.value(src);
  } catch (error) {
    throw new ReadError(engineMessage(error, src));
  }
  if (typeof value !== "number" || !Number.isFinite(value))
    throw new ReadError(`"${src}" is not a real number.`);
  return value;
}

// Returns { re, im }. Real results have im = 0.
export function readComplex(text) {
  const src = String(text ?? "").trim();
  if (!src) throw new ReadError("Enter a number.");
  checkAmbiguity(src);
  let value;
  try {
    value = COMPLEX.value(src);
  } catch (error) {
    throw new ReadError(engineMessage(error, src));
  }
  if (typeof value === "number" && Number.isFinite(value)) return { re: value, im: 0 };
  if (
    value &&
    typeof value === "object" &&
    Number.isFinite(value.re) &&
    Number.isFinite(value.im)
  )
    return { re: value.re, im: Math.abs(value.im) < 1e-12 ? 0 : value.im };
  throw new ReadError(`"${src}" is not a number.`);
}

// An endpoint or limit value: a real number, ∞, or −∞.
export function readExtended(text) {
  const src = norm(text).replace(/^\+/, "");
  if (src === "inf") return Infinity;
  if (src === "-inf") return -Infinity;
  return readReal(src);
}

// Splits on a sticky regex at the top level only, so commas inside brackets, as in
// (−∞, 3], stay with their interval.
export function splitTop(text, separator) {
  const parts = [];
  let depth = 0;
  let start = 0;
  const matcher = new RegExp(separator.source, `${separator.flags.replace("y", "")}y`);
  for (let i = 0; i < text.length;) {
    const ch = text[i];
    if ("([{".includes(ch)) depth += 1;
    else if (")]}".includes(ch)) depth = Math.max(0, depth - 1);
    if (depth === 0) {
      matcher.lastIndex = i;
      const match = matcher.exec(text);
      if (match && match[0].length > 0) {
        parts.push(text.slice(start, i));
        i += match[0].length;
        start = i;
        continue;
      }
    }
    i += 1;
  }
  parts.push(text.slice(start));
  return parts.map((part) => part.trim());
}

export function balanced(text) {
  let depth = 0;
  for (const ch of text) {
    if ("([{".includes(ch)) depth += 1;
    else if (")]}".includes(ch)) depth -= 1;
    if (depth < 0) return false;
  }
  return depth === 0;
}

// Two real numbers agree. Without `decimals` the answer is exact, so a decimal
// approximation of an irrational key does not match. With `decimals: n` a value
// within one unit in the nth place matches, which accepts rounding and truncating.
export function sameNumber(student, key, { decimals } = {}) {
  if (!Number.isFinite(student) || !Number.isFinite(key)) return student === key;
  const tolerance =
    decimals === undefined || decimals === null
      ? 1e-9 * Math.max(1, Math.abs(student), Math.abs(key))
      : 10 ** -decimals;
  return Math.abs(student - key) <= tolerance;
}

export function sameComplex(a, b, options = {}) {
  return sameNumber(a.re, b.re, options) && sameNumber(a.im, b.im, options);
}

// True when a student's decimal is near a key it should have given exactly.
export function looksLikeApproximation(text, student, key) {
  return (
    /\d\.\d/.test(String(text)) &&
    Math.abs(student - key) <= 0.01 * Math.max(1, Math.abs(key))
  );
}

// Strips an optional leading name, as in "x = 3" or "f(2) = 5".
export function stripName(text) {
  return String(text).replace(/^\s*[A-Za-zθ](?:\([^()]*\))?\s*=(?![=<>])\s*/, "");
}

// Expands one ± into two readings. "2 ± 3i" gives "2 + 3i" and "2 - 3i".
export function expandPlusMinus(text) {
  const src = String(text);
  const count = (src.match(/±/g) || []).length;
  if (count === 0) return [src];
  if (count > 1) throw new ReadError("Use ± only once in each answer.");
  const lead = src.replace(/^\s*±/, "-");
  const plusStart = src.replace(/^\s*±/, "");
  if (/^\s*±/.test(src)) return [plusStart, lead];
  return [src.replace("±", "+"), src.replace("±", "-")];
}

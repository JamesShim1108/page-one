// Interval notation and inequality notation, read into one canonical form: a sorted
// list of non-touching intervals { lo, hi, loClosed, hiClosed }. Infinity is always
// open. Both "(−∞, 3] ∪ (5, ∞)" and "x ≤ 3 or x > 5" read to the same list.

import { norm, readExtended, ReadError, splitTop, balanced, sameNumber } from "./read.js";

const WHOLE = Object.freeze({
  lo: -Infinity,
  hi: Infinity,
  loClosed: false,
  hiClosed: false,
});
const EMPTY_WORDS = /^(none|no solution|no solutions|empty set|dne|\{\}|∅)$/i;
const ALL_WORDS =
  /^(all real numbers|all reals|real numbers|reals|any real number|r|ℝ)$/i;
const RELATION = /<=|>=|!=|<|>|=/;

function make(lo, hi, loClosed, hiClosed) {
  return {
    lo,
    hi,
    loClosed: Number.isFinite(lo) ? loClosed : false,
    hiClosed: Number.isFinite(hi) ? hiClosed : false,
  };
}

function isEmptyInterval(a) {
  return a.lo > a.hi || (a.lo === a.hi && !(a.loClosed && a.hiClosed));
}

function intersectTwo(a, b) {
  const lo = Math.max(a.lo, b.lo);
  const hi = Math.min(a.hi, b.hi);
  const loClosed =
    a.lo === b.lo ? a.loClosed && b.loClosed : (a.lo > b.lo ? a : b).loClosed;
  const hiClosed =
    a.hi === b.hi ? a.hiClosed && b.hiClosed : (a.hi < b.hi ? a : b).hiClosed;
  const result = make(lo, hi, loClosed, hiClosed);
  return isEmptyInterval(result) ? null : result;
}

export function intersect(left, right) {
  const out = [];
  for (const a of left)
    for (const b of right) {
      const both = intersectTwo(a, b);
      if (both) out.push(both);
    }
  return merge(out);
}

// Merges overlapping or touching intervals. (1, 2) and [2, 3) join into (1, 3),
// but (−∞, 3) and (3, ∞) stay apart, because 3 is in neither.
export function merge(list) {
  const sorted = list
    .filter((item) => !isEmptyInterval(item))
    .map((item) => ({ ...item }))
    .sort((a, b) => a.lo - b.lo || Number(b.loClosed) - Number(a.loClosed));
  const out = [];
  for (const item of sorted) {
    const last = out[out.length - 1];
    if (
      last &&
      (item.lo < last.hi || (item.lo === last.hi && (last.hiClosed || item.loClosed)))
    ) {
      if (item.hi > last.hi) {
        last.hi = item.hi;
        last.hiClosed = item.hiClosed;
      } else if (item.hi === last.hi) last.hiClosed = last.hiClosed || item.hiClosed;
    } else out.push(item);
  }
  return out;
}

export function union(left, right) {
  return merge([...left, ...right]);
}

function atLeast(c, closed) {
  return [make(c, Infinity, closed, false)];
}
function atMost(c, closed) {
  return [make(-Infinity, c, false, closed)];
}

function readLiteral(text) {
  const open = text[0];
  const close = text[text.length - 1];
  if (!balanced(text) || !"([".includes(open) || !")]".includes(close))
    throw new ReadError("Check the brackets in your interval.");
  const inner = text.slice(1, -1);
  const ends = splitTop(inner, /,/);
  if (ends.length !== 2 || !ends[0] || !ends[1])
    throw new ReadError(
      "An interval has two endpoints separated by a comma, like (2, 5].",
    );
  const lo = readExtended(ends[0]);
  const hi = readExtended(ends[1]);
  if (!Number.isFinite(lo) && open === "[")
    throw new ReadError("Use a parenthesis next to ∞ or −∞, never a bracket.");
  if (!Number.isFinite(hi) && close === "]")
    throw new ReadError("Use a parenthesis next to ∞ or −∞, never a bracket.");
  if (lo === Infinity || hi === -Infinity)
    throw new ReadError("Write the smaller endpoint first.");
  if (lo > hi) throw new ReadError("Write the smaller endpoint first.");
  if (lo === hi && !(open === "[" && close === "]"))
    throw new ReadError("An interval with equal endpoints needs brackets, like [3, 3].");
  return [make(lo, hi, open === "[", close === "]")];
}

// Splits "-2 < x <= 5" into operands and operators at the top level.
function readChain(text) {
  const operands = [];
  const ops = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < text.length;) {
    const ch = text[i];
    if ("([{".includes(ch)) depth += 1;
    else if (")]}".includes(ch)) depth -= 1;
    if (depth === 0) {
      const match = RELATION.exec(text.slice(i));
      if (match && match.index === 0) {
        operands.push(text.slice(start, i).trim());
        ops.push(match[0]);
        i += match[0].length;
        start = i;
        continue;
      }
    }
    i += 1;
  }
  operands.push(text.slice(start).trim());
  return { operands, ops };
}

const isVariable = (text) => /^[A-Za-zθ]$/.test(text);
const FLIP = { "<": ">", "<=": ">=", ">": "<", ">=": "<=", "!=": "!=", "=": "=" };

function fromRelation(op, c) {
  if (op === "<") return atMost(c, false);
  if (op === "<=") return atMost(c, true);
  if (op === ">") return atLeast(c, false);
  if (op === ">=") return atLeast(c, true);
  if (op === "=") return [make(c, c, true, true)];
  return union(atMost(c, false), atLeast(c, false));
}

function readInequality(text) {
  const { operands, ops } = readChain(text);
  if (operands.some((part) => !part)) throw new ReadError("Finish the inequality.");
  if (operands.length === 2) {
    const [a, b] = operands;
    if (isVariable(a) && !isVariable(b)) return fromRelation(ops[0], readExtended(b));
    if (isVariable(b) && !isVariable(a))
      return fromRelation(FLIP[ops[0]], readExtended(a));
    throw new ReadError(
      "Write the inequality with one variable and one number, like x ≤ 3.",
    );
  }
  if (operands.length === 3 && isVariable(operands[1])) {
    const [first, , last] = operands;
    const [op1, op2] = ops;
    const rising = ["<", "<="].includes(op1) && ["<", "<="].includes(op2);
    const falling = [">", ">="].includes(op1) && [">", ">="].includes(op2);
    if (!rising && !falling)
      throw new ReadError("Both signs of a compound inequality must point the same way.");
    const lowText = rising ? first : last;
    const highText = rising ? last : first;
    const lowOp = rising ? op1 : FLIP[op2];
    const highOp = rising ? op2 : FLIP[op1];
    const lo = readExtended(lowText);
    const hi = readExtended(highText);
    if (lo >= hi)
      throw new ReadError("The lower bound must be less than the upper bound.");
    return [make(lo, hi, lowOp === "<=", highOp === "<=")];
  }
  throw new ReadError("I could not read that inequality.");
}

function readAtom(text) {
  const src = text.trim();
  if (!src) throw new ReadError("Finish your answer.");
  if (/^[([]/.test(src) && !RELATION.test(src.replace(/\([^()]*\)|\[[^[\]]*\]/g, "")))
    return readLiteral(src);
  return readInequality(src);
}

function readPiece(text) {
  const atoms = splitTop(text, /,|&|\band\b/i);
  let result = null;
  for (const atom of atoms) {
    const read = readAtom(atom);
    result = result === null ? read : intersect(result, read);
  }
  return result || [];
}

export function parseIntervals(raw) {
  const text = norm(raw);
  if (!text) throw new ReadError("Enter an answer.");
  if (!balanced(text)) throw new ReadError("Check the brackets in your answer.");
  if (EMPTY_WORDS.test(text)) return [];
  if (ALL_WORDS.test(text)) return [{ ...WHOLE }];
  let result = [];
  for (const piece of splitTop(text, /\bU\b|\bor\b|\|/i)) {
    if (!piece) throw new ReadError("Finish your answer.");
    result = union(result, readPiece(piece));
  }
  return result;
}

export function sameIntervals(a, b, options = {}) {
  if (a.length !== b.length) return false;
  return a.every((left, index) => {
    const right = b[index];
    return (
      sameNumber(left.lo, right.lo, options) &&
      sameNumber(left.hi, right.hi, options) &&
      (options.ignoreClosure ||
        (left.loClosed === right.loClosed && left.hiClosed === right.hiClosed))
    );
  });
}

function endpointText(value) {
  if (value === Infinity) return "∞";
  if (value === -Infinity) return "−∞";
  return String(Number(value.toFixed(6))).replace("-", "−");
}

// Display text for a parsed list, in interval notation.
export function formatIntervals(list) {
  if (!list.length) return "no values";
  return list
    .map(
      (item) =>
        `${item.loClosed ? "[" : "("}${endpointText(item.lo)}, ${endpointText(item.hi)}${item.hiClosed ? "]" : ")"}`,
    )
    .join(" ∪ ");
}

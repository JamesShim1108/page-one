// Formatting for stems, keys, and worked solutions. Everything uses the characters a
// student sees in the lesson: − for minus, superscript powers, √, ∞, and ∪.

import { Q } from "./rat.js";

const SUP = {
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
};

export const sup = (k) => String(k).replace(/\d/g, (digit) => SUP[digit]);

const abs = (value) =>
  value instanceof Q ? (value.n < 0 ? value.neg() : value) : Math.abs(value);
const neg = (value) => (value instanceof Q ? value.n < 0 : value < 0);

// A number with a real minus sign. Fractions read as 3/4.
export function num(value) {
  if (value instanceof Q) return value.toString();
  const rounded = Math.round(value * 1e9) / 1e9;
  const body = String(Math.abs(rounded));
  return rounded < 0 ? `−${body}` : body;
}

// A number rounded to a stated number of places, trailing zeros kept.
export function fixed(value, places) {
  const text = Math.abs(value).toFixed(places);
  return value < 0 && Number(text) !== 0 ? `−${text}` : text;
}

// Negative numbers get parentheses: (−3).
export const par = (value) => (neg(value) ? `(${num(value)})` : num(value));

// One term of a polynomial, such as 3x², −x, or 7.
function termBody(coefficient, variable, power) {
  const c = abs(coefficient);
  const isOne = c instanceof Q ? c.equals(1) : c === 1;
  if (power === 0) return num(c);
  const lead = isOne ? "" : c instanceof Q && !c.isInteger ? `(${num(c)})` : num(c);
  return `${lead}${variable}${power === 1 ? "" : sup(power)}`;
}

// polyText([2, 0, -5, 1]) is "2x³ − 5x + 1". Coefficients run from the highest power down.
export function polyText(coefficients, variable = "x") {
  const degree = coefficients.length - 1;
  let out = "";
  coefficients.forEach((raw, index) => {
    const c = raw instanceof Q ? raw : new Q(raw);
    if (c.isZero) return;
    const body = termBody(c, variable, degree - index);
    if (!out) out = c.n < 0 ? `−${body}` : body;
    else out += c.n < 0 ? ` − ${body}` : ` + ${body}`;
  });
  return out || "0";
}

// m x + b, as in y = −2x + 5.
export const lineText = (m, b, variable = "x") => polyText([m, b], variable);

// (x − 3) or (x + 3), or x when the root is 0.
export function factorText(root, variable = "x") {
  const r = root instanceof Q ? root : new Q(root);
  if (r.isZero) return variable;
  return r.n < 0 ? `(${variable} + ${num(r.neg())})` : `(${variable} − ${num(r)})`;
}

// "+ 3" or "− 3", for adding a signed number to an expression: `x ${signed(-4)}` is "x − 4".
export const signed = (value) => {
  const n = value instanceof Q ? value : new Q(value);
  return `${n.n < 0 ? "−" : "+"} ${num(abs(n))}`;
};

// x − 3 or x + 3 without the brackets, for use in a sentence.
export const rootText = (root, variable = "x") => {
  const r = root instanceof Q ? root : new Q(root);
  return r.isZero ? variable : `${variable} ${signed(r.neg())}`;
};

// Wraps text in parentheses unless it is already one piece.
export function wrap(text) {
  const s = String(text);
  if (/^[\w.²³⁴⁵⁶⁷⁸⁹−√]+$/.test(s)) return s;
  if (s.startsWith("(") && balancedOuter(s)) return s;
  return `(${s})`;
}

function balancedOuter(text) {
  let depth = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "(") depth += 1;
    if (text[i] === ")") depth -= 1;
    if (depth === 0 && i < text.length - 1) return false;
  }
  return depth === 0;
}

// Text outside every bracket, so an operator inside (x + 1) does not count.
function outside(text) {
  let depth = 0;
  let out = "";
  for (const ch of String(text)) {
    if (ch === "(") depth += 1;
    else if (ch === ")") depth -= 1;
    else if (depth === 0) out += ch;
  }
  return out;
}

const isSum = (text) => / [+−-] /.test(outside(text));
const isSingleGroup = (text) => {
  const body = String(text).replace(/[²³⁴⁵⁶⁷⁸⁹]+$/, "");
  return /^\(.*\)$/.test(body) && balancedOuter(body);
};
// One piece that can follow a "/" without brackets: a number, a single letter with an
// exponent, or one bracketed group. "5x" is not one piece: a/5x reads as (a/5)x.
const isAtom = (text) =>
  /^\d+(\.\d+)?$/.test(text) || /^[A-Za-z][²³⁴⁵⁶⁷⁸⁹]*$/.test(text) || isSingleGroup(text);

// A ratio of two texts, such as (x − 1)(x + 2)/((x − 3)(x + 5)). A product on top needs no
// brackets; a sum on top and anything but one piece on the bottom do.
export const ratio = (top, bottom) =>
  `${isSum(top) ? `(${top})` : top}/${isAtom(bottom) ? bottom : `(${bottom})`}`;

// "f(3)", "g(x)".
export const call = (name, arg) => `${name}(${arg})`;

// ---------- Intervals ----------

export function bound(value) {
  if (value === Infinity) return "∞";
  if (value === -Infinity) return "−∞";
  return num(value);
}

// ivl(-Infinity, 4, false, true) is "(−∞, 4]".
export function ivl(lo, hi, loClosed = false, hiClosed = false) {
  const left = Number.isFinite(lo) && loClosed ? "[" : "(";
  const right = Number.isFinite(hi) && hiClosed ? "]" : ")";
  return `${left}${bound(lo)}, ${bound(hi)}${right}`;
}

export const unionText = (...intervals) => intervals.join(" ∪ ");

// "x ≠ 3, x ≠ −2" style list.
export const listText = (values) => values.map(num).join(", ");

// "3, −2, and 5".
export function andList(items) {
  const list = items.map(String);
  if (list.length <= 1) return list.join("");
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

// Words for a position in a list: "first", "second".
export const ORDINAL = ["first", "second", "third", "fourth", "fifth", "sixth"];

// Terms with more than one symbol, such as 3x² + 3xh + h² − 2. Each term is
// [coefficient, "x²"], [coefficient, "xh"], or [coefficient, ""] for a constant.
export function termsText(terms) {
  let out = "";
  for (const [coefficient, symbols] of terms) {
    if (coefficient === 0) continue;
    const size = Math.abs(coefficient);
    const body = symbols ? (size === 1 ? symbols : `${size}${symbols}`) : String(size);
    if (!out) out = coefficient < 0 ? `−${body}` : body;
    else out += coefficient < 0 ? ` − ${body}` : ` + ${body}`;
  }
  return out || "0";
}

// "x − 7 + 5/(x − 2)" or "x − 7 − 5/(x − 2)": a quotient plus a remainder over the divisor.
export function addRatio(base, remainder, divisor) {
  const value = remainder instanceof Q ? remainder : new Q(remainder);
  const size = value.n < 0 ? value.neg() : value;
  return `${base} ${value.n < 0 ? "−" : "+"} ${ratio(String(size), divisor)}`;
}

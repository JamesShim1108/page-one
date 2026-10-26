// Notation helpers for exponential and logarithmic problems. Stems use the same
// characters as the lessons: f(x) = −2(3)ˣ, P(t) = 500(1.04)ᵗ, log₂(8), ln(x).
// Keys use plain text the answer checker reads: (−2)*3^x, log(8, 2).

import { Q } from "./rat.js";
import { num, sup } from "./fmt.js";

const SUBSCRIPTS = "₀₁₂₃₄₅₆₇₈₉";
export const sub = (n) => String(n).replace(/\d/g, (digit) => SUBSCRIPTS[digit]);

const SUP_LETTER = { x: "ˣ", t: "ᵗ", n: "ⁿ", s: "ˢ" };

const text = (value) => (value instanceof Q ? value.toString() : num(value));
const isNegative = (value) => (value instanceof Q ? value.n < 0 : value < 0);
const size = (value) =>
  value instanceof Q ? (value.n < 0 ? value.neg() : value) : Math.abs(value);
const equalsNumber = (value, k) => (value instanceof Q ? value.equals(k) : value === k);
const isWhole = (value) =>
  value instanceof Q ? value.isInteger : Number.isInteger(value);

// Exponent text: a lone variable becomes a superscript letter, a whole number a
// superscript number, and anything longer is written as ^(…).
export function expo(exponent) {
  const e = String(exponent);
  if (SUP_LETTER[e]) return SUP_LETTER[e];
  if (/^\d+$/.test(e)) return sup(e);
  return `^(${e})`;
}

// A base in front of an exponent: 3 stays 3, but 0.8 and 1/2 get parentheses.
export function baseText(base) {
  const body = text(base);
  return /^\d+$/.test(body) ? body : `(${body})`;
}

export const powerText = (base, exponent = "x") => `${baseText(base)}${expo(exponent)}`;

// a·bˣ in the form the lessons use: −2(3)ˣ, 5(0.8)ˣ, 3ˣ, −1(1/2)ˣ.
export function expText(a, b, variable = "x") {
  if (equalsNumber(a, 1)) return powerText(b, variable);
  // "−3ˣ" would be read as −(3ˣ) or (−3)ˣ, so a −1 coefficient is written out.
  if (equalsNumber(a, -1)) return `−1(${text(b)})${expo(variable)}`;
  const body = text(size(a));
  const coefficient = isWhole(a) || !(a instanceof Q) ? body : `(${body})`;
  return `${isNegative(a) ? "−" : ""}${coefficient}(${text(b)})${expo(variable)}`;
}

const keyPart = (value) => {
  const body = text(value);
  return isNegative(value) || /\//.test(body) ? `(${body})` : body;
};

// The same function as text the answer checker reads: "(−2)*3^x".
export const expKey = (a, b, variable = "x") =>
  equalsNumber(a, 1)
    ? `${keyPart(b)}^${variable}`
    : `${keyPart(a)}*${keyPart(b)}^${variable}`;

// log₂(x), log(x) for base 10, and ln(x) for base e.
export function logText(base, argument) {
  if (base === "e" || base === Math.E) return `ln(${argument})`;
  if (base === 10) return `log(${argument})`;
  return `log${sub(base)}(${argument})`;
}

export function logKey(base, argument) {
  if (base === "e" || base === Math.E) return `ln(${argument})`;
  return `log(${argument}, ${base})`;
}

// The logarithm of x to a base, as a number.
export const lg = (base, x) => Math.log(x) / Math.log(base === "e" ? Math.E : base);

// 0.04 → "4%". Avoids 4.000000000000001%.
export const percent = (rate) => `${num(Math.round(rate * 1e6) / 1e4)}%`;

export const roundTo = (value, places) => {
  const scale = 10 ** places;
  return Math.round(value * scale) / scale;
};

// A fraction as a decimal number when it terminates (1/2 → 0.5, 4/5 → 0.8), so a stem can
// show a base the way a student expects. Fractions that do not terminate stay as fractions.
export function shown(value) {
  if (!(value instanceof Q)) return value;
  let d = value.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? Math.round(value.value * 1e9) / 1e9 : value;
}

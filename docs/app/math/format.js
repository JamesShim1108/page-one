// Display text for calculator results: up to 10 significant digits, a true minus
// sign, ×10ⁿ for very large or small numbers, a + bi for complex numbers, and {…}
// for lists. Every result string can be pasted back into the calculator.

import { Complex } from "./engine.js";
import { exactForm } from "./numeric.js";

const SUPER = {
  "-": "⁻",
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
export const superscript = (text) => [...String(text)].map((c) => SUPER[c] ?? c).join("");

export function formatNumber(value, { decimals = "auto", digits = 10 } = {}) {
  if (Number.isNaN(value)) return "undefined";
  if (!Number.isFinite(value)) return value > 0 ? "∞" : "−∞";
  if (Object.is(value, -0) || value === 0) return "0";
  const abs = Math.abs(value);
  const sign = value < 0 ? "−" : "";
  if (abs >= 1e10 || abs < 1e-5) {
    const [mantissa, exponent] = abs.toExponential(digits - 1).split("e");
    const m =
      decimals === "auto" ? trim(mantissa) : Number(mantissa).toFixed(Number(decimals));
    return `${sign}${m}×10${superscript(Number(exponent))}`;
  }
  if (decimals !== "auto") return `${sign}${abs.toFixed(Number(decimals))}`;
  return `${sign}${trim(abs.toPrecision(digits))}`;
}

function trim(text) {
  if (!text.includes(".")) return text;
  return text.replace(/0+$/, "").replace(/\.$/, "");
}

export function formatValue(value, options = {}) {
  if (Array.isArray(value))
    return `{${value.map((v) => formatValue(v, options)).join(", ")}}`;
  if (value instanceof Complex) {
    const re = value.re;
    const im = value.im;
    const imText = Math.abs(im) === 1 ? "" : formatNumber(Math.abs(im), options);
    if (re === 0) return `${im < 0 ? "−" : ""}${imText}i`;
    return `${formatNumber(re, options)} ${im < 0 ? "−" : "+"} ${imText}i`;
  }
  return formatNumber(value, options);
}

// An exact form worth showing beside the decimal, such as "1/3", "π/6", or "√3/2".
export function exactHint(value) {
  if (typeof value !== "number") return null;
  const form = exactForm(value);
  if (!form || form.endsWith("/1")) return null;
  // A fraction is worth showing only when its decimal repeats, as 1/3 does; 0.12
  // already says 3/25 exactly.
  const fraction = /^−?\d+\/(\d+)$/.exec(form);
  if (fraction) {
    let d = Number(fraction[1]);
    for (const p of [2, 5]) while (d % p === 0) d /= p;
    if (d === 1) return null;
  }
  return form;
}

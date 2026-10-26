// Numeric cross-checks. A template computes its key exactly; verify() uses these to
// recompute the same facts from the displayed expression, so a slip in either one is
// caught when the bank is built.

import { createEngine } from "../../app/math/engine.js";

const engine = createEngine();

// A JavaScript function from an expression written the way a student sees it.
// Returns NaN wherever the expression is undefined.
export function fnOf(source, variable = "x") {
  const compiled = engine.compile(source, variable);
  return (x) => {
    const value = compiled(x);
    return typeof value === "number" ? value : NaN;
  };
}

// Value of an expression with no variable, such as "(3 + 2)/5".
export function valueOf(source) {
  const value = engine.value(source);
  if (typeof value !== "number") throw new Error(`"${source}" is not a real number`);
  return value;
}

export const near = (a, b, tolerance = 1e-8) =>
  Number.isFinite(a) &&
  Number.isFinite(b) &&
  Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(a), Math.abs(b));

export function assert(condition, message) {
  if (!condition) throw new Error(`verify failed: ${message}`);
}

export function assertNear(actual, expected, message, tolerance) {
  assert(
    near(actual, expected, tolerance),
    `${message}: got ${actual}, expected ${expected}`,
  );
}

// Sign changes of f on [lo, hi]: returns approximate zeros.
export function zerosOf(f, lo, hi, steps = 20000) {
  const out = [];
  let prevX = lo;
  let prev = f(lo);
  for (let i = 1; i <= steps; i += 1) {
    const x = lo + ((hi - lo) * i) / steps;
    const y = f(x);
    if (Number.isFinite(prev) && Number.isFinite(y) && prev !== 0 && prev * y < 0) {
      let a = prevX;
      let b = x;
      for (let k = 0; k < 80; k += 1) {
        const m = (a + b) / 2;
        if (f(a) * f(m) <= 0) b = m;
        else a = m;
      }
      out.push((a + b) / 2);
    } else if (y === 0 && Number.isFinite(y)) out.push(x);
    prevX = x;
    prev = y;
  }
  return out.filter((v, i) => i === 0 || Math.abs(v - out[i - 1]) > 1e-6);
}

// Where f is defined: the sampled inputs where the value is a real number.
export function definedAt(f, x) {
  return Number.isFinite(f(x));
}

// Local maxima and minima of f on [lo, hi] by sampling and refining.
export function extremaOf(f, lo, hi, steps = 20000) {
  const out = [];
  const h = (hi - lo) / steps;
  for (let i = 1; i < steps; i += 1) {
    const x = lo + h * i;
    const a = f(x - h);
    const b = f(x);
    const c = f(x + h);
    if (![a, b, c].every(Number.isFinite)) continue;
    if (b > a && b >= c) out.push({ kind: "max", ...refine(f, x - h, x + h, "max") });
    else if (b < a && b <= c)
      out.push({ kind: "min", ...refine(f, x - h, x + h, "min") });
  }
  return out.filter((v, i) => i === 0 || Math.abs(v.x - out[i - 1].x) > 1e-4);
}

function refine(f, lo, hi, kind) {
  let a = lo;
  let b = hi;
  const sign = kind === "max" ? 1 : -1;
  for (let k = 0; k < 100; k += 1) {
    const m1 = a + (b - a) / 3;
    const m2 = b - (b - a) / 3;
    if (sign * f(m1) < sign * f(m2)) a = m1;
    else b = m2;
  }
  const x = (a + b) / 2;
  return { x, y: f(x) };
}

// Average rate of change over [a, b].
export const aroc = (f, a, b) => (f(b) - f(a)) / (b - a);

// Samples f over a window and reports the intervals where it is defined, as a list of
// [start, end] pairs, so a stated domain can be compared with the actual one.
export function definedRuns(f, lo, hi, steps = 4000) {
  const runs = [];
  let start = null;
  let last = null;
  for (let i = 0; i <= steps; i += 1) {
    const x = lo + ((hi - lo) * i) / steps;
    if (definedAt(f, x)) {
      if (start === null) start = x;
      last = x;
    } else if (start !== null) {
      runs.push([start, last]);
      start = null;
    }
  }
  if (start !== null) runs.push([start, last]);
  return runs;
}

// Compares where f is defined with a stated domain. `intervals` is a list of
// [lo, hi, loClosed, hiClosed]; lo and hi may be ±Infinity. Samples a fine grid that
// avoids the endpoints, then checks each endpoint on its own.
export function assertDomain(f, intervals, span = 60) {
  const within = (x) =>
    intervals.some(([lo, hi, loClosed, hiClosed]) => {
      if (x === lo) return Boolean(loClosed);
      if (x === hi) return Boolean(hiClosed);
      return x > lo && x < hi;
    });
  const grid = [];
  for (let i = -span * 8; i <= span * 8; i += 1) grid.push(i / 8 + 0.0137);
  for (const [lo, hi] of intervals) {
    if (Number.isFinite(lo)) grid.push(lo, lo + 1e-4, lo - 1e-4);
    if (Number.isFinite(hi)) grid.push(hi, hi + 1e-4, hi - 1e-4);
  }
  for (const x of grid) {
    assert(
      definedAt(f, x) === within(x),
      `domain disagrees at x = ${x}: f is ${definedAt(f, x) ? "" : "not "}defined`,
    );
  }
}

// Smallest and largest output of f on a window, ignoring undefined and non-finite values.
export function rangeOn(f, lo, hi, steps = 40000) {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i <= steps; i += 1) {
    const y = f(lo + ((hi - lo) * i) / steps);
    if (!Number.isFinite(y)) continue;
    if (y < min) min = y;
    if (y > max) max = y;
  }
  return { min, max };
}

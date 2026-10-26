// Angles and exact trigonometric values for generated problems. Angles are rational
// multiples of π held as fractions (Q), so 5π/6 is Q(5, 6) and nothing is rounded.
// The exact values come from a table of reference angles and the signs of the quadrants,
// and every value is cross-checked against Math.sin and Math.cos when the module loads.

import { Q } from "./rat.js";

// 5π/6, −π/3, 2π, 0, written the way the lesson writes them.
export function piText(angle) {
  const k = Q.of(angle);
  if (k.n === 0) return "0";
  const sign = k.n < 0 ? "−" : "";
  const top = Math.abs(k.n) === 1 ? "π" : `${Math.abs(k.n)}π`;
  return k.d === 1 ? `${sign}${top}` : `${sign}${top}/${k.d}`;
}

// The same angle as a number of radians.
export const radians = (angle) => (Q.of(angle).n / Q.of(angle).d) * Math.PI;

// An angle in degrees as a fraction of π: 150° is 5π/6.
export const fromDegrees = (degrees) => new Q(degrees, 180);

// An angle reduced to 0 ≤ angle < 2π.
export function reduce(angle) {
  const k = Q.of(angle);
  const period = 2 * k.d;
  return new Q(((k.n % period) + period) % period, k.d);
}

// Each magnitude is (n/d) times the root of 1, 2, or 3, so it can be scaled exactly.
const mag = (n, d, root) => {
  const coefficient = new Q(n, d);
  const rootText = root === 1 ? "" : `√${root}`;
  const lead = n === 1 && root !== 1 ? "" : String(n);
  const text = `${lead}${rootText}${d === 1 ? "" : `/${d}`}` || "1";
  return { text, value: (n / d) * Math.sqrt(root), coefficient, root };
};
const MAG = {
  zero: { text: "0", value: 0, coefficient: new Q(0), root: 1 },
  half: mag(1, 2, 1),
  one: mag(1, 1, 1),
  sqrt2over2: mag(1, 2, 2),
  sqrt3over2: mag(1, 2, 3),
  sqrt3over3: mag(1, 3, 3),
  sqrt3: mag(1, 1, 3),
  sqrt2: mag(1, 1, 2),
  two: mag(2, 1, 1),
  twoSqrt3over3: mag(2, 3, 3),
  none: null,
};

// Magnitudes at each reference angle (as a multiple of π), keyed by "n/d".
const REFERENCE = {
  "0/1": { sin: "zero", cos: "one", tan: "zero", sec: "one", csc: "none", cot: "none" },
  "1/6": {
    sin: "half",
    cos: "sqrt3over2",
    tan: "sqrt3over3",
    sec: "twoSqrt3over3",
    csc: "two",
    cot: "sqrt3",
  },
  "1/4": {
    sin: "sqrt2over2",
    cos: "sqrt2over2",
    tan: "one",
    sec: "sqrt2",
    csc: "sqrt2",
    cot: "one",
  },
  "1/3": {
    sin: "sqrt3over2",
    cos: "half",
    tan: "sqrt3",
    sec: "two",
    csc: "twoSqrt3over3",
    cot: "sqrt3over3",
  },
  "1/2": { sin: "one", cos: "zero", tan: "none", sec: "none", csc: "one", cot: "zero" },
};

// Quadrant and reference angle of an angle between 0 and 2π.
function locate(angle) {
  const a = reduce(angle);
  if (a.n * 2 <= a.d) return { quadrant: 1, ref: a };
  if (a.n <= a.d) return { quadrant: 2, ref: new Q(1).sub(a) };
  if (a.n * 2 <= a.d * 3) return { quadrant: 3, ref: a.sub(1) };
  return { quadrant: 4, ref: new Q(2).sub(a) };
}

const POSITIVE = {
  sin: [1, 2],
  csc: [1, 2],
  cos: [1, 4],
  sec: [1, 4],
  tan: [1, 3],
  cot: [1, 3],
};

// The exact value of sin, cos, tan, sec, csc, or cot at a multiple of π/6 or π/4.
// Returns { defined, text, value }; text is "undefined" where the function has no value.
export function exact(fn, angle) {
  const { quadrant, ref } = locate(angle);
  const row = REFERENCE[`${ref.n}/${ref.d}`];
  if (!row) throw new Error(`No exact ${fn} for ${piText(angle)}`);
  const mag = MAG[row[fn]];
  if (!mag) return { defined: false, text: "undefined", value: NaN };
  if (mag.value === 0)
    return { defined: true, text: "0", value: 0, coefficient: new Q(0), root: 1 };
  const negative = !POSITIVE[fn].includes(quadrant);
  return {
    defined: true,
    text: negative ? `−${mag.text}` : mag.text,
    value: negative ? -mag.value : mag.value,
    coefficient: negative ? mag.coefficient.neg() : mag.coefficient,
    root: mag.root,
  };
}

// A signed multiple of √root written the way a student would: −3√3, 3√3/2, √2/2, 5/2.
export function radicalText(coefficient, root = 1) {
  const k = Q.of(coefficient);
  if (k.n === 0) return "0";
  if (root === 1) return k.toString();
  const sign = k.n < 0 ? "−" : "";
  const top = Math.abs(k.n) === 1 ? "" : String(Math.abs(k.n));
  return `${sign}${top}√${root}${k.d === 1 ? "" : `/${k.d}`}`;
}

// k times an exact value: scaled("sin", 5π/6, 6) is 3, scaled("cos", 5π/6, 6) is −3√3.
export function scaled(fn, angle, k = 1) {
  const base = exact(fn, angle);
  if (!base.defined) return base;
  const coefficient = base.coefficient.mul(k);
  return {
    defined: true,
    text: radicalText(coefficient, base.root),
    value:
      coefficient.n === 0 ? 0 : (coefficient.n / coefficient.d) * Math.sqrt(base.root),
    coefficient,
    root: base.root,
  };
}

// c + (an exact value), written without a doubled sign: 25 + 10√3, 25 − 10√3, 25. When the value is a
// plain fraction the sum is just added: 23 + 10 is 33.
export function plusText(c, exactValue) {
  if (exactValue.root === 1) return Q.of(c).add(exactValue.coefficient).toString();
  const head = c < 0 ? `−${Math.abs(c)}` : String(c);
  return exactValue.text.startsWith("−")
    ? `${head} − ${exactValue.text.slice(1)}`
    : `${head} + ${exactValue.text}`;
}

// The acute angle (or 0 or π/2) between the terminal ray and the x-axis.
export const referenceAngle = (angle) => locate(angle).ref;
export const quadrantNumber = (angle) => locate(angle).quadrant;

export const sinExact = (angle) => exact("sin", angle);
export const cosExact = (angle) => exact("cos", angle);
export const tanExact = (angle) => exact("tan", angle);

// The point where the terminal ray meets the unit circle, as text: (−1/2, √3/2).
export const unitPointText = (angle) =>
  `(${cosExact(angle).text}, ${sinExact(angle).text})`;

// Multiples of π/6 and π/4 in [0, 2π), each once.
export const SIXTHS = Array.from({ length: 12 }, (_, k) => new Q(k, 6));
export const FOURTHS = Array.from({ length: 8 }, (_, k) => new Q(k, 4));
export const SPECIAL = (() => {
  const seen = new Set();
  return [...SIXTHS, ...FOURTHS].filter((q) => {
    const key = `${q.n}/${q.d}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
})();

// An exact value may be 1/2, √3/2, and so on: wrap a fraction for use in a sentence.
export const withDegrees = (angle) =>
  `${piText(angle)} (${(Q.of(angle).n * 180) / Q.of(angle).d}°)`;

// Cross-check the table against the standard library once, when the module loads.
for (const angle of SPECIAL) {
  const x = radians(angle);
  const pairs = [
    ["sin", Math.sin(x)],
    ["cos", Math.cos(x)],
  ];
  for (const [fn, expected] of pairs) {
    const got = exact(fn, angle).value;
    if (Math.abs(got - expected) > 1e-9)
      throw new Error(
        `trig table: ${fn}(${piText(angle)}) is ${got}, expected ${expected}`,
      );
  }
  const t = exact("tan", angle);
  if (t.defined && Math.abs(t.value - Math.tan(x)) > 1e-9)
    throw new Error(`trig table: tan(${piText(angle)})`);
  for (const fn of ["sec", "csc", "cot"]) {
    const base = { sec: "cos", csc: "sin", cot: "tan" }[fn];
    const direct = exact(base, angle);
    const recip = exact(fn, angle);
    if (
      direct.defined &&
      direct.value !== 0 &&
      Math.abs(recip.value - 1 / direct.value) > 1e-9
    )
      throw new Error(`trig table: ${fn}(${piText(angle)})`);
  }
}

// Angles whose terminal rays lie on an axis: 0, π/2, π, 3π/2.
export const isAxisAngle = (angle) => {
  const a = reduce(angle);
  return a.n === 0 || a.n * 2 === a.d || a.n === a.d || a.n * 2 === a.d * 3;
};
// The special angles in [0, 2π) whose rays are in a quadrant, so every value is a radical or 1/2.
export const OFF_AXIS = SPECIAL.filter((q) => !isAxisAngle(q));

// "I", "II", "III", or "IV" for an angle off the axes.
export const quadrantName = (angle) =>
  ["I", "II", "III", "IV"][quadrantNumber(angle) - 1];

// Every special angle from lo·π up to (not including) hi·π where fn equals value,
// in increasing order: anglesWith("cos", 0.5, -1, 1) is [−π/3, π/3].
export function anglesWith(fn, value, lo = 0, hi = 2) {
  const found = new Map();
  for (const base of SPECIAL) {
    for (let k = -3; k <= 3; k++) {
      const angle = base.add(2 * k);
      const size = angle.n / angle.d;
      if (size < lo - 1e-12 || size >= hi - 1e-12) continue;
      const here = exact(fn, angle);
      if (here.defined && Math.abs(here.value - value) < 1e-9)
        found.set(`${angle.n}/${angle.d}`, angle);
    }
  }
  return [...found.values()].sort((a, b) => a.n / a.d - b.n / b.d);
}

// Axis ticks labeled in multiples of π: piTicks(-2, 2, 2) is −2π, −3π/2, …, 2π.
// lo and hi are in units of π; d is the denominator of the step.
export function piTicks(lo, hi, d = 2) {
  const ticks = [];
  for (let k = Math.ceil(lo * d - 1e-9); k <= Math.floor(hi * d + 1e-9); k++)
    ticks.push({ at: (k / d) * Math.PI, label: piText(new Q(k, d)) });
  return ticks;
}

// Where fn is greater than 0 (op ">") or less than 0 (op "<") for lo·π ≤ θ ≤ hi·π, as interval
// notation: "[0, π/2) ∪ (3π/2, 2π]". lo and hi are in units of π and multiples of 1/2. With
// open: true the window is open too, so every bracket is a parenthesis.
export function signIntervals(fn, op, lo, hi, { open = false } = {}) {
  const f = (angle) => {
    const v = Math[fn](angle);
    return Math.abs(v) < 1e-12 ? 0 : v;
  };
  const holds = (v) => (op === ">" ? v > 0 : v < 0);
  const steps = Math.round((hi - lo) * 2);
  const runs = [];
  for (let i = 0; i < steps; i++) {
    const a = lo + i / 2;
    const b = a + 0.5;
    if (!holds(f(((a + b) / 2) * Math.PI))) continue;
    const last = runs[runs.length - 1];
    if (last && last.end === a && holds(f(a * Math.PI))) last.end = b;
    else runs.push({ start: a, end: b });
  }
  const text = (u) => piText(new Q(Math.round(u * 2), 2));
  return runs
    .map(({ start, end }) => {
      const left = !open && start === lo && holds(f(start * Math.PI)) ? "[" : "(";
      const right = !open && end === hi && holds(f(end * Math.PI)) ? "]" : ")";
      return `${left}${text(start)}, ${text(end)}${right}`;
    })
    .join(" ∪ ");
}

// Where fn θ is greater than (">", "≥") or less than ("<", "≤") the value k for lo·π ≤ θ < hi·π,
// as interval notation with exact endpoints: inequalityIntervals("sin", ">", 0.5) is
// "(π/6, 5π/6)". The window includes lo and excludes hi. Use a k whose solution is a union of
// intervals, not a single point. For tangent, the asymptotes are never included.
export function inequalityIntervals(fn, op, k, lo = 0, hi = 2) {
  const greater = op === ">" || op === "≥";
  const strict = op === ">" || op === "<";
  const value = (u) => Math[fn](u * Math.PI);
  const isAsymptote = (u) =>
    fn === "tan" && Math.abs(u - 0.5 - Math.round(u - 0.5)) < 1e-9;
  const holds = (u) => {
    if (isAsymptote(u)) return false;
    const v = value(u);
    if (greater) return strict ? v > k + 1e-9 : v >= k - 1e-9;
    return strict ? v < k - 1e-9 : v <= k + 1e-9;
  };
  const breaks = new Set([lo, hi]);
  for (const angle of anglesWith(fn, k, lo, hi)) breaks.add(angle.n / angle.d);
  if (fn === "tan")
    for (let m = Math.floor(lo) - 1; m <= Math.ceil(hi); m++)
      if (m + 0.5 > lo && m + 0.5 < hi) breaks.add(m + 0.5);
  const points = [...breaks].sort((a, b) => a - b);
  const runs = [];
  for (let i = 0; i + 1 < points.length; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (!holds((a + b) / 2)) continue;
    const last = runs[runs.length - 1];
    if (last && last.end === a && holds(a)) last.end = b;
    else runs.push({ start: a, end: b });
  }
  const text = (u) => piText(new Q(Math.round(u * 12), 12));
  return runs
    .map(({ start, end }) => {
      const left = holds(start) ? "[" : "(";
      const right = end !== hi && holds(end) ? "]" : ")";
      return `${left}${text(start)}, ${text(end)}${right}`;
    })
    .join(" ∪ ");
}

// "The terminal ray of 23π/6, which is also the terminal ray of 11π/6," or, for an angle already
// in [0, 2π), just "The terminal ray of π/3".
export function terminalRay(angle) {
  return reduce(angle).toString() === Q.of(angle).toString()
    ? `The terminal ray of ${piText(angle)}`
    : `The terminal ray of ${piText(angle)}, which is also the terminal ray of ${piText(reduce(angle))},`;
}

// Typed-answer problems for Topic 3.14. A polar function r = f(θ) takes an angle and gives a
// signed radius. These templates cover limaçons, cardioids, circles, and roses: exact values,
// shapes, readings from a graph, the sign of r, and the θ-interval that draws part of a graph.
// Every key is rechecked by evaluating f numerically in verify.

import {
  ask,
  part,
  problem,
  table,
  graph,
  Q,
  piText,
  radians,
  exact,
  scaled,
  plusText,
  SPECIAL,
  OFF_AXIS,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const PI = Math.PI;
const units = (n) => (n === 1 ? "1 unit" : `${n} units`);
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const pg = (n) => (n < 0 ? `(−${Math.abs(n)})` : String(n));
const FN = { sin: Math.sin, cos: Math.cos };
const QUADRANTS = ["I", "II", "III", "IV"];
const SHAPES = [
  "circle",
  "cardioid",
  "limaçon with an inner loop",
  "limaçon without an inner loop",
];

// r = a + b fn θ, as text for a sentence and as an expression for a graph.
const limText = (a, b, fn) =>
  `${a} ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : `${Math.abs(b)} `}${fn} θ`;
const limExpr = (a, b, fn) =>
  `${a}${b < 0 ? "-" : "+"}${Math.abs(b) === 1 ? "" : Math.abs(b)}${fn}(θ)`;
const limValue = (a, b, fn, t) => a + b * FN[fn](t);
// The substitution a + b fn(angle) written out: 3 − 2 sin(π/4) = 3 − 2(√2/2).
const evalText = (a, b, fn, angle) => {
  const size = Math.abs(b) === 1 ? "" : String(Math.abs(b));
  const sign = b < 0 ? "−" : "+";
  return `${a} ${sign} ${size ? `${size} ` : ""}${fn}(${piText(angle)}) = ${a} ${sign} ${size}(${exact(fn, angle).text})`;
};
// r = a fn(nθ)
const roseText = (a, fn, n) =>
  `${a === 1 ? "" : a === -1 ? "−" : `${sg(a)} `}${fn}(${n}θ)`;
const roseExpr = (a, fn, n) => `${a === 1 ? "" : a === -1 ? "-" : a}${fn}(${n}θ)`;
const roseValue = (a, fn, n, t) => a * FN[fn](n * t);
const quarter = (i) => `${piText(new Q(i, 2))} ≤ θ ≤ ${piText(new Q(i + 1, 2))}`;

// Smallest and largest r over a full turn, and every θ in [0, 2π) with r within tolerance of zero.
function scan(f, steps = 40000) {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i <= steps; i++) {
    const v = f((2 * PI * i) / steps);
    min = Math.min(min, v);
    max = Math.max(max, v);
  }
  return { min, max };
}
// A coordinate rounded to five places, with −0 written as 0.
const clean = (v) => (Math.round(v * 1e5) / 1e5 + 0).toFixed(5);
// The number of distinct points at the tips of a rose r = a fn(nθ).
function petalCount(a, fn, n) {
  const tips = new Map();
  const f = (t) => roseValue(a, fn, n, t);
  const steps = 20 * n;
  for (let i = 0; i < 2 * steps; i++) {
    const t = (2 * PI * i) / (2 * steps);
    const here = Math.abs(f(t));
    if (Math.abs(here - Math.abs(a)) < 1e-9) {
      const r = f(t);
      tips.set(`${clean(r * Math.cos(t))},${clean(r * Math.sin(t))}`, true);
    }
  }
  return tips.size;
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "polar-graphs",
    skill: "solve",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const a = r.int(2, 7);
      const b = r.sign() * r.int(1, 6);
      const angles = r.sample(SPECIAL, 3);
      const rows = angles.map((angle) => {
        const part1 = scaled(fn, angle, b);
        const text = plusText(a, part1);
        return { angle, text, value: a + part1.value };
      });
      return problem({
        stem: `A polar function is given by r = ${limText(a, b, fn)}. Find each value of r. Write exact values.`,
        parts: rows.map(({ angle, text }) =>
          part(`Find r when θ = ${piText(angle)}.`, ask.number("r =", text)),
        ),
        solution: rows.map(
          ({ angle, text }) => `r = ${evalText(a, b, fn, angle)} = ${text}.`,
        ),
        data: { fn, a, b, rows },
      });
    },
    verify({ data: { fn, a, b, rows } }) {
      for (const { angle, value } of rows)
        assertNear(value, limValue(a, b, fn, radians(angle)), "r");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "polar-graphs",
    skill: "identify-information",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const sign = r.sign();
      const a = r.int(2, 8);
      // r = a + sign·a·fn θ; r = 0 where fn θ = −sign.
      const zero =
        fn === "cos"
          ? sign > 0
            ? new Q(1)
            : new Q(0)
          : sign > 0
            ? new Q(3, 2)
            : new Q(1, 2);
      return problem({
        stem: `The graph of r = ${limText(a, sign * a, fn)} is a cardioid.`,
        parts: [
          part("What is the largest value of r?", ask.number("largest r =", 2 * a)),
          part("What is the smallest value of r?", ask.number("smallest r =", 0)),
          part("For which θ with 0 ≤ θ < 2π is r = 0?", ask.number("θ =", piText(zero))),
        ],
        solution: [
          `${fn} θ ranges from −1 to 1, so r = ${a} ${sign < 0 ? "−" : "+"} ${a} ${fn} θ ranges from ${a} − ${a} = 0 to ${a} + ${a} = ${2 * a}. The largest value is ${2 * a}.`,
          "The smallest value is 0, so the curve touches the origin.",
          `r = 0 when ${fn} θ = ${sg(-sign)}, which happens at θ = ${piText(zero)} for 0 ≤ θ < 2π.`,
        ],
        data: { fn, sign, a, zero },
      });
    },
    verify({ data: { fn, sign, a, zero } }) {
      const f = (t) => limValue(a, sign * a, fn, t);
      const { min, max } = scan(f);
      assertNear(max, 2 * a, "max", 1e-6);
      assertNear(min, 0, "min", 1e-6);
      assertNear(f(zero.value * PI), 0, "zero");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "polar-graphs",
    skill: "describe",
    make(r) {
      const kinds = r.sample(["circle", "cardioid", "loop", "noloop", "rose"], 3);
      const items = kinds.map((kind) => {
        const fn = r.pick(["sin", "cos"]);
        const s = r.sign();
        if (kind === "circle") {
          const c = r.int(2, 9);
          return {
            kind,
            equation: `r = ${c}`,
            shape: "circle",
            why: `r is constant, so every point is ${c} units from the origin. The graph is a circle of radius ${c} centered at the origin.`,
          };
        }
        if (kind === "cardioid") {
          const a = r.int(2, 7);
          return {
            kind,
            equation: `r = ${limText(a, s * a, fn)}`,
            shape: "cardioid",
            why: `The constant ${a} equals the size of the coefficient of ${fn} θ, which is ${a}, so the graph is a cardioid.`,
          };
        }
        if (kind === "loop") {
          const a = r.int(1, 4);
          const b = a + r.int(1, 4);
          return {
            kind,
            equation: `r = ${limText(a, s * b, fn)}`,
            shape: "limaçon with an inner loop",
            why: `The coefficient ${b} of ${fn} θ is greater than the constant ${a}, so r becomes negative for some θ. That makes a limaçon with an inner loop.`,
          };
        }
        if (kind === "noloop") {
          const b = r.int(1, 4);
          const a = b + r.int(1, 4);
          return {
            kind,
            equation: `r = ${limText(a, s * b, fn)}`,
            shape: "limaçon without an inner loop",
            why: `The constant ${a} is greater than the coefficient ${b} of ${fn} θ, so r never becomes negative. That makes a limaçon without an inner loop.`,
          };
        }
        const n = r.int(2, 6);
        const a = r.int(2, 8);
        const petals = n % 2 === 1 ? n : 2 * n;
        return {
          kind,
          equation: `r = ${roseText(a, fn, n)}`,
          petals,
          fn,
          n,
          a,
          why: `This is a rose r = a ${fn}(nθ) with n = ${n}. When n is ${n % 2 === 1 ? "odd" : "even"}, the rose has ${n % 2 === 1 ? "n" : "2n"} petals, so it has ${petals} petals.`,
        };
      });
      return problem({
        stem: "Use each equation to describe its polar graph.",
        parts: items.map((item) =>
          item.kind === "rose"
            ? part(
                `How many petals does the graph of ${item.equation} have?`,
                ask.number("petals =", item.petals),
              )
            : part(
                `What kind of graph is ${item.equation}?`,
                ask.choice("The graph is a", SHAPES, item.shape),
              ),
        ),
        solution: items.map((item) => item.why),
        data: { items },
      });
    },
    verify({ data: { items } }) {
      for (const item of items) {
        if (item.kind !== "rose") continue;
        assert(petalCount(item.a, item.fn, item.n) === item.petals, "petals");
      }
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "restricting-the-domain",
    skill: "apply-results",
    make(r) {
      const a = r.nonzero(-6, 6);
      const i = r.int(0, 3);
      const sign = Math.sign(a) * (i % 2 === 0 ? 1 : -1);
      const quadrantIndex = sign > 0 ? i : (i + 2) % 4;
      const tip = new Q(2 * i + 1, 4);
      return problem({
        stem: `Consider the polar function r = ${roseText(a, "sin", 2)} with ${quarter(i)}.`,
        parts: [
          part(
            "Is r positive or negative on this interval?",
            ask.choice(
              "r is",
              ["positive", "negative"],
              sign > 0 ? "positive" : "negative",
            ),
          ),
          part(
            "In which quadrant are the points of the graph on this interval?",
            ask.choice("Quadrant", QUADRANTS, QUADRANTS[quadrantIndex]),
          ),
          part(
            "Find the point of this part of the graph that is farthest from the origin. Give its distance |r| and its θ.",
            ask.number("|r| =", Math.abs(a)),
            ask.number("θ =", piText(tip)),
          ),
        ],
        solution: [
          `On ${quarter(i)}, 2θ goes from ${piText(new Q(i))} to ${piText(new Q(i + 1))}, where sin(2θ) is ${i % 2 === 0 ? "positive" : "negative"}. With the coefficient ${sg(a)}, r is ${sign > 0 ? "positive" : "negative"}.`,
          sign > 0
            ? `Because r is positive, the points are in the same quadrant as the angles θ, which is Quadrant ${QUADRANTS[quadrantIndex]}.`
            : `Because r is negative, the points are opposite the angles θ. The angles are in Quadrant ${QUADRANTS[i]}, so the points are in Quadrant ${QUADRANTS[quadrantIndex]}.`,
          `|sin(2θ)| = 1 when 2θ = ${piText(new Q(2 * i + 1, 2))}, that is, θ = ${piText(tip)}. There |r| = ${Math.abs(a)}.`,
        ],
        data: { a, i, sign, quadrantIndex, tip },
      });
    },
    verify({ data: { a, i, sign, quadrantIndex, tip } }) {
      const mid = ((i + 0.5) * PI) / 2;
      const rMid = roseValue(a, "sin", 2, mid);
      assert(Math.sign(rMid) === sign, "sign");
      const x = rMid * Math.cos(mid);
      const y = rMid * Math.sin(mid);
      const q = x > 0 ? (y > 0 ? 0 : 3) : y > 0 ? 1 : 2;
      assert(q === quadrantIndex, "quadrant");
      assertNear(Math.abs(roseValue(a, "sin", 2, tip.value * PI)), Math.abs(a), "tip");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "polar-graphs",
    skill: "describe",
    make(r) {
      const kind = r.pick(["cardioid", "loop", "noloop"]);
      let a;
      let b;
      if (kind === "cardioid") {
        a = r.int(2, 4);
        b = a;
      } else if (kind === "loop") {
        a = r.int(1, 3);
        b = a + r.int(1, 4);
      } else {
        b = r.int(1, 3);
        a = b + r.int(1, 4);
      }
      const far = a + b;
      const atPi = a - b;
      const shape =
        kind === "cardioid"
          ? "cardioid"
          : kind === "loop"
            ? "limaçon with an inner loop"
            : "limaçon without an inner loop";
      return problem({
        stem: "The polar graph of r = a + b cos θ, where a and b are positive numbers, is shown. Point A is the point of the graph where θ = 0, and point B is the point of the graph where θ = π.",
        blocks: [
          graph({
            caption: "The graph of r = a + b cos θ with points A (θ = 0) and B (θ = π)",
            alt: `A polar grid with a closed curve. Point A is on the positive x-axis, ${units(far)} from the origin. ${atPi === 0 ? "Point B is at the origin." : `Point B is on the ${atPi > 0 ? "negative" : "positive"} x-axis, ${units(Math.abs(atPi))} from the origin.`}`,
            window: { x: [-(far + 1), far + 1], y: [-(far + 1), far + 1] },
            ticks: { x: 1, y: 1 },
            grid: "polar",
            height: 432,
            polar: [{ expr: limExpr(a, b, "cos"), domain: [0, 2 * PI], color: 1 }],
            points: [
              { at: [far, 0], label: "A", position: "n" },
              { at: [-atPi, 0], label: "B", position: atPi > 0 ? "nw" : "n" },
            ],
          }),
        ],
        parts: [
          part("Find r at point A.", ask.number("r =", far)),
          part(
            "Find r at point B. Remember that r is negative when B is on the opposite side of the origin from the ray θ = π.",
            ask.number("r =", atPi),
          ),
          part("Find a and b.", ask.number("a =", a), ask.number("b =", b)),
          part(
            "What kind of graph is this?",
            ask.choice("The graph is a", SHAPES.slice(1), shape),
          ),
        ],
        solution: [
          `A is ${units(far)} from the origin on the positive x-axis, and r is positive there, so r = ${far}.`,
          atPi > 0
            ? `B is ${units(atPi)} from the origin on the negative x-axis, which is the ray θ = π, so r = ${atPi}.`
            : atPi === 0
              ? "B is at the origin, so r = 0."
              : `B is ${units(-atPi)} from the origin on the positive x-axis, which is opposite the ray θ = π, so r = ${sg(atPi)}.`,
          `At θ = 0, r = a + b = ${far}. At θ = π, r = a − b = ${sg(atPi)}. Adding gives 2a = ${far + atPi}, so a = ${a}, and b = ${far} − ${a} = ${b}.`,
          kind === "cardioid"
            ? `Because a = b, r reaches 0 and the graph is a cardioid.`
            : kind === "loop"
              ? `Because b > a, r is negative for some θ, so the graph is a limaçon with an inner loop.`
              : `Because a > b, r is never negative, so the graph is a limaçon without an inner loop.`,
        ],
        data: { a, b, far, atPi, shape },
      });
    },
    verify({ data: { a, b, far, atPi } }) {
      assertNear(limValue(a, b, "cos", 0), far, "A");
      assertNear(limValue(a, b, "cos", PI), atPi, "B");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "polar-graphs",
    skill: "construct-functions",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const a = r.int(2, 8);
      const b = r.sign() * r.int(1, 6);
      const angle = r.pick(OFF_AXIS);
      const at = (t) => limValue(a, b, fn, t);
      const columns = ["θ", "0", "π/2", "π", "3π/2"];
      const values = [0, PI / 2, PI, (3 * PI) / 2].map((t) => Math.round(at(t)));
      const answer = scaled(fn, angle, b);
      const text = plusText(a, answer);
      return problem({
        stem: `A polar function has the form r = a + b ${fn} θ. The table shows some of its values.`,
        blocks: [table("Values of r", columns, [["r", ...values.map(sg)]])],
        parts: [
          part("Find a.", ask.number("a =", a)),
          part("Find b.", ask.number("b =", b)),
          part(
            `Find r when θ = ${piText(angle)}. Write an exact value.`,
            ask.number("r =", text),
          ),
        ],
        solution: [
          fn === "cos"
            ? `At θ = π/2, cos θ = 0, so r = a = ${sg(values[1])}.`
            : `At θ = 0, sin θ = 0, so r = a = ${sg(values[0])}.`,
          fn === "cos"
            ? `At θ = 0, cos θ = 1, so r = a + b = ${sg(values[0])}. Then b = ${sg(values[0])} − ${a} = ${sg(b)}.`
            : `At θ = π/2, sin θ = 1, so r = a + b = ${sg(values[1])}. Then b = ${sg(values[1])} − ${a} = ${sg(b)}.`,
          `r = ${evalText(a, b, fn, angle)} = ${text}.`,
        ],
        data: { fn, a, b, angle, values, answer },
      });
    },
    verify({ data: { fn, a, b, angle, answer } }) {
      assertNear(a + answer.value, limValue(a, b, fn, radians(angle)), "r");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "restricting-the-domain",
    skill: "construct-representations",
    make(r) {
      const a = r.nonzero(-5, 5);
      const quadrant = r.int(0, 3);
      // Find which quarter of a turn draws the petal in the chosen quadrant.
      let i = -1;
      for (let k = 0; k < 4; k++) {
        const mid = ((k + 0.5) * PI) / 2;
        const rMid = roseValue(a, "sin", 2, mid);
        const x = rMid * Math.cos(mid);
        const y = rMid * Math.sin(mid);
        const q = x > 0 ? (y > 0 ? 0 : 3) : y > 0 ? 1 : 2;
        if (q === quadrant) i = k;
      }
      if (i < 0) reject("no petal");
      const sign = Math.sign(a) * (i % 2 === 0 ? 1 : -1);
      const R = Math.abs(a);
      return problem({
        stem: `The rose r = ${roseText(a, "sin", 2)} is shown for 0 ≤ θ ≤ 2π. One petal, in Quadrant ${QUADRANTS[quadrant]}, is drawn with a solid curve. The domain of the function is restricted to draw only that petal.`,
        blocks: [
          graph({
            caption: `The rose r = ${roseText(a, "sin", 2)}, with one petal solid`,
            alt: `A four-petal rose on a polar grid, drawn dashed, with the petal in Quadrant ${QUADRANTS[quadrant]} drawn solid. The petal starts and ends at the origin and reaches ${units(R)} out.`,
            window: { x: [-(R + 1), R + 1], y: [-(R + 1), R + 1] },
            ticks: { x: 1, y: 1 },
            grid: "polar",
            height: 432,
            polar: [
              {
                expr: roseExpr(a, "sin", 2),
                domain: [0, 2 * PI],
                color: 4,
                dashed: true,
              },
              { expr: roseExpr(a, "sin", 2), domain: [(i * PI) / 2, ((i + 1) * PI) / 2] },
            ],
          }),
        ],
        parts: [
          part(
            "Find the endpoints of the interval of θ, within 0 ≤ θ ≤ 2π, that draws the solid petal.",
            ask.number("from θ =", piText(new Q(i, 2))),
            ask.number("to θ =", piText(new Q(i + 1, 2))),
          ),
          part(
            "Is r positive or negative on this interval?",
            ask.choice(
              "r is",
              ["positive", "negative"],
              sign > 0 ? "positive" : "negative",
            ),
          ),
          part(
            "How far is the tip of the petal from the origin?",
            ask.number("distance =", R),
          ),
        ],
        solution: [
          `The petal starts and ends at the origin, where r = 0. That happens when sin(2θ) = 0, at θ = 0, π/2, π, 3π/2, and 2π. The petal in Quadrant ${QUADRANTS[quadrant]} is drawn when ${quarter(i)}.`,
          `On this interval sin(2θ) is ${i % 2 === 0 ? "positive" : "negative"}, and the coefficient is ${sg(a)}, so r is ${sign > 0 ? "positive" : "negative"}. ${sign > 0 ? `The points are in the same quadrant as θ, Quadrant ${QUADRANTS[i]}.` : `The points are opposite the angles θ, which are in Quadrant ${QUADRANTS[i]}, so they are in Quadrant ${QUADRANTS[quadrant]}.`}`,
          `The tip is where |sin(2θ)| = 1, so |r| = ${R}. The tip is ${units(R)} from the origin.`,
        ],
        data: { a, quadrant, i, sign, R },
      });
    },
    verify({ data: { a, quadrant, i, sign } }) {
      const mid = ((i + 0.5) * PI) / 2;
      const rMid = roseValue(a, "sin", 2, mid);
      assert(Math.sign(rMid) === sign, "sign");
      const x = rMid * Math.cos(mid);
      const y = rMid * Math.sin(mid);
      const q = x > 0 ? (y > 0 ? 0 : 3) : y > 0 ? 1 : 2;
      assert(q === quadrant, "quadrant");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "polar-graphs",
    skill: "support-conclusions",
    make(r) {
      const mask = r.pick([
        [true, true, false],
        [true, false, true],
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      const kinds = r.sample(["circle", "petals", "origin", "loop", "negative"], 3);
      const claims = kinds.map((kind, i) => {
        const truth = mask[i];
        if (kind === "circle") {
          const c = r.int(2, 9);
          return truth
            ? {
                text: `The graph of r = ${c} is a circle of radius ${c} centered at the origin.`,
                truth,
                why: `Every point of the graph is ${c} units from the origin, whatever θ is.`,
                check: () => true,
              }
            : {
                text: `The graph of r = ${c} is a circle of diameter ${c} centered at the origin.`,
                truth,
                why: `The radius is ${c}, so the diameter is ${2 * c}, not ${c}.`,
                check: () => false,
              };
        }
        if (kind === "petals") {
          const fn = r.pick(["sin", "cos"]);
          const n = r.int(2, 6);
          const a = r.int(2, 8);
          const actual = n % 2 === 1 ? n : 2 * n;
          const claimed = truth ? actual : n % 2 === 1 ? 2 * n : n;
          return {
            text: `The graph of r = ${roseText(a, fn, n)} has ${claimed} petals.`,
            truth,
            why: `For a rose r = a ${fn}(nθ), the number of petals is n when n is odd and 2n when n is even. Here n = ${n}, so there are ${actual} petals.`,
            check: () => petalCount(a, fn, n) === claimed,
          };
        }
        if (kind === "origin") {
          const fn = r.pick(["sin", "cos"]);
          const a = r.int(2, 6);
          const b = truth ? a + r.int(0, 4) : r.int(1, a - 1);
          return {
            text: `The graph of r = ${limText(a, b, fn)} passes through the origin.`,
            truth,
            why: truth
              ? `r = 0 when ${fn} θ = ${new Q(-a, b).toString()}, and this has a solution because −1 ≤ ${new Q(-a, b).toString()}.`
              : `r = 0 would need ${fn} θ = ${new Q(-a, b).toString()}, which is less than −1. So r is never 0 and the graph misses the origin.`,
            check: () => scan((t) => limValue(a, b, fn, t), 200000).min < 1e-6,
          };
        }
        if (kind === "loop") {
          const fn = r.pick(["sin", "cos"]);
          const a = r.int(1, 5);
          const b = truth ? a + r.int(1, 4) : r.int(1, a);
          return {
            text: `The graph of r = ${limText(a, b, fn)} has an inner loop.`,
            truth,
            why: truth
              ? `The coefficient ${b} is greater than the constant ${a}, so r is negative for some θ and the graph has an inner loop.`
              : `The coefficient ${b} is not greater than the constant ${a}, so r is never negative and there is no inner loop.${a === b ? " The graph is a cardioid." : ""}`,
            check: () => scan((t) => limValue(a, b, fn, t)).min < -1e-6,
          };
        }
        return truth
          ? {
              text: "When r < 0, the point (r, θ) is on the opposite side of the origin from the terminal ray of θ.",
              truth,
              why: "A negative r measures the distance in the direction opposite the terminal ray of the angle θ.",
              check: () => true,
            }
          : {
              text: "When r < 0, the point (r, θ) is in the same quadrant as the terminal ray of θ.",
              truth,
              why: "A negative r reverses the direction, so the point is in the opposite quadrant from the terminal ray of θ.",
              check: () => false,
            };
      });
      for (const c of claims)
        if (c.check() !== c.truth) reject("claim accidentally flipped");
      return problem({
        stem: "Decide whether each statement is true or false.",
        parts: claims.map((c) =>
          part(
            c.text,
            ask.choice("The statement is", ["true", "false"], c.truth ? "true" : "false"),
          ),
        ),
        solution: claims.map((c) => c.why),
        data: { claims },
      });
    },
    verify({ data: { claims } }) {
      for (const c of claims) assert(c.check() === c.truth, `claim: ${c.text}`);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "polar-graphs",
    skill: "apply-results",
    make(r) {
      if (r.chance()) {
        // A rose-shaped garden bed: r = a cos(nθ).
        const n = r.int(2, 6);
        const a = r.int(3, 9);
        const petals = n % 2 === 1 ? n : 2 * n;
        const tips = [];
        for (let k = 0; 2 * k < n; k++) tips.push(new Q(2 * k, n));
        return problem({
          stem: `A garden bed is planted in the shape of the polar graph r = ${roseText(a, "cos", n)}, where r is in meters and the origin is the center of the bed.`,
          parts: [
            part("How many petals does the bed have?", ask.number("petals =", petals)),
            part(
              "How far is the tip of a petal from the center?",
              ask.number("distance =", a, { unit: "meters" }),
            ),
            part(
              `Find all θ with 0 ≤ θ < π for which r = ${a}, the greatest possible value.`,
              ask.set("θ =", tips.map(piText)),
            ),
          ],
          solution: [
            `This is a rose r = a cos(nθ) with n = ${n}, which is ${n % 2 === 1 ? "odd" : "even"}. So it has ${n % 2 === 1 ? "n" : "2n"} = ${petals} petals.`,
            `cos(${n}θ) is at most 1, so r is at most ${a}. The tips are ${a} meters from the center.`,
            `r = ${a} when cos(${n}θ) = 1, that is, ${n}θ = 0, 2π, 4π, …, so θ = 0, 2π/${n}, 4π/${n}, …. Those less than π are θ = ${tips.map(piText).join(", ")}.`,
          ],
          data: { kind: "rose", n, a, petals, tips },
        });
      }
      const a = r.int(3, 8);
      const b = 2 * r.int(1, Math.floor((a - 1) / 2));
      const pick = r.pick([
        { c: new Q(1, 2), angle: new Q(1, 3), text: "r = a + b/2" },
        { c: new Q(0), angle: new Q(1, 2), text: "r = a" },
        { c: new Q(-1, 2), angle: new Q(2, 3), text: "r = a − b/2" },
      ]);
      const target = a + (b * pick.c.n) / pick.c.d;
      const behind = a - b;
      return problem({
        stem: `The sensitivity of a microphone to sound arriving from an angle θ, measured from the front of the microphone, is r = ${limText(a, b, "cos")}.`,
        parts: [
          part("What is the greatest sensitivity?", ask.number("largest r =", a + b)),
          part(
            "What is the sensitivity to sound from directly behind the microphone, where θ = π?",
            ask.number("r =", behind),
          ),
          part(
            `Find the angle θ with 0 ≤ θ ≤ π at which the sensitivity is ${target}.`,
            ask.number("θ =", piText(pick.angle)),
          ),
        ],
        solution: [
          `cos θ is at most 1, so the greatest sensitivity is ${a} + ${b} = ${a + b}, at θ = 0.`,
          `At θ = π, cos θ = −1, so r = ${a} − ${b} = ${behind}.`,
          `${target} = ${a} + ${b} cos θ gives cos θ = ${pick.c.toString()}, so θ = ${piText(pick.angle)}.`,
        ],
        data: { kind: "mic", a, b, target, behind, pick },
      });
    },
    verify({ data }) {
      if (data.kind === "rose") {
        const { n, a, petals, tips } = data;
        assert(petalCount(a, "cos", n) === petals, "petals");
        for (const t of tips) assertNear(roseValue(a, "cos", n, t.value * PI), a, "tip");
        // no other θ in [0, π) reaches r = a
        const steps = 60 * n;
        let hits = 0;
        for (let k = 0; k < steps; k++) {
          const t = (PI * k) / steps;
          if (Math.abs(roseValue(a, "cos", n, t) - a) < 1e-9) hits++;
        }
        assert(hits === tips.length, "tip count");
      } else {
        const { a, b, target, behind, pick } = data;
        assertNear(limValue(a, b, "cos", PI), behind, "behind");
        assertNear(limValue(a, b, "cos", pick.angle.value * PI), target, "target");
        assert(Number.isInteger(target), "target integer");
      }
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "restricting-the-domain",
    skill: "solve",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const k = r.int(1, 5);
      // r = k + 2k fn θ is zero where fn θ = −1/2 and negative between those angles.
      const zeros =
        fn === "cos" ? [new Q(2, 3), new Q(4, 3)] : [new Q(7, 6), new Q(11, 6)];
      const lowest = fn === "cos" ? new Q(1) : new Q(3, 2);
      return problem({
        stem: `Consider the polar function r = ${limText(k, 2 * k, fn)} for 0 ≤ θ < 2π. Its graph is a limaçon with an inner loop.`,
        parts: [
          part(
            "For which θ in 0 ≤ θ < 2π does the graph pass through the origin?",
            ask.set("θ =", zeros.map(piText)),
          ),
          part(
            "The inner loop is drawn where r < 0. Find the endpoints of the interval of θ that draws the inner loop.",
            ask.number("from θ =", piText(zeros[0])),
            ask.number("to θ =", piText(zeros[1])),
          ),
          part(`Find r when θ = ${piText(lowest)}.`, ask.number("r =", -k)),
        ],
        solution: [
          `r = 0 when ${k} + ${2 * k} ${fn} θ = 0, so ${fn} θ = −1/2. For 0 ≤ θ < 2π this gives θ = ${zeros.map(piText).join(" and ")}.`,
          `Between those angles ${fn} θ < −1/2, so r < 0 and the graph is drawn on the opposite side of the origin: the inner loop is drawn for ${piText(zeros[0])} ≤ θ ≤ ${piText(zeros[1])}.`,
          `At θ = ${piText(lowest)}, ${fn} θ = −1, so r = ${k} + ${2 * k}(−1) = ${sg(-k)}.`,
        ],
        data: { fn, k, zeros, lowest },
      });
    },
    verify({ data: { fn, k, zeros, lowest } }) {
      for (const z of zeros) assertNear(limValue(k, 2 * k, fn, z.value * PI), 0, "zero");
      const mid = ((zeros[0].value + zeros[1].value) / 2) * PI;
      assert(limValue(k, 2 * k, fn, mid) < 0, "negative inside");
      assertNear(limValue(k, 2 * k, fn, lowest.value * PI), -k, "lowest");
      const outside = (zeros[1].value * PI + 2 * PI + zeros[0].value * PI) / 2;
      assert(limValue(k, 2 * k, fn, outside) > 0, "positive outside");
    },
  },
];

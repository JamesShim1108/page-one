// Typed-answer problems for Topic 1.4. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed expression or graph, so a
// slip in the key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  graph,
  factoredText,
  polyText,
  factorText,
  termsText,
  sup,
  ivl,
  unionText,
  num,
  Poly,
  fnOf,
  assert,
  assertNear,
  extremaOf,
  reject,
  lead,
} from "../../../../practice-kit/index.js";

// s(x − h)³ − 3s(x − h) + k: a cubic with a local extremum at x = h − 1 and at x = h + 1
// and a point of inflection at (h, k). The graph is shown without its formula.
function cubicPicture(r) {
  const s = r.pick([1, 1, 2, -1, -1, -2]);
  const h = r.int(-3, 3);
  const k = r.int(-3, 3);
  const expr = `(${s})((x) − (${h}))^3 − (${3 * s})((x) − (${h})) + (${k})`;
  const shown = graph({
    caption: "The graph of the cubic function f",
    alt: "The graph of a cubic polynomial function with one relative maximum and one relative minimum, drawn on a grid.",
    window: { x: [-8, 8], y: [-10, 10] },
    ticks: { x: 1, y: 1 },
    functions: [{ expr }],
  });
  // The extremum on the left is at x = h − 1 and the one on the right at x = h + 1.
  const left = [h - 1, 2 * s + k];
  const right = [h + 1, -2 * s + k];
  const [max, min] = s > 0 ? [left, right] : [right, left];
  return { s, h, k, expr, shown, max, min };
}

const superPower = (n) => (n === 1 ? "x" : `x${sup(n)}`);

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "polynomial-terms",
    skill: "identify-information",
    make(r) {
      const degree = r.int(3, 6);
      const powers = [degree, ...r.sample([...Array(degree).keys()], r.int(2, 3))];
      const coefficients = powers.map(() => r.nonzero(-7, 7));
      const order = r.shuffle(powers.map((_, i) => i));
      const terms = order.map((i) => [
        coefficients[i],
        powers[i] === 0 ? "" : superPower(powers[i]),
      ]);
      const text = termsText(terms);
      const lead = coefficients[0];
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}. What is the degree of f, and what is its leading coefficient?`,
        parts: [ask.number("Degree", degree), ask.number("Leading coefficient", lead)],
        solution: [
          `The degree of a polynomial is the greatest power of x that appears. Here the greatest power is ${degree}, so the degree is ${degree}.`,
          `The leading term is the term with that power, ${termsText([[lead, superPower(degree)]])}, so the leading coefficient is ${num(lead)}.`,
        ],
        data: { text, powers, coefficients, degree, lead },
      });
    },
    verify({ data: { text, powers, coefficients, degree, lead } }) {
      assert(Math.max(...powers) === degree && powers[0] === degree, "degree");
      assert(coefficients[0] === lead, "leading coefficient");
      assert(new Set(powers).size === powers.length, "distinct powers");
      assert(!text.includes("NaN"), "readable");
    },
  },
  {
    id: "p02",
    tier: "quick",
    concept: "extrema",
    skill: "identify-information",
    make(r) {
      const { s, h, k, expr, shown, max, min } = cubicPicture(r);
      return problem({
        stem: "The graph of the cubic polynomial function f is shown. Find the coordinates of the relative maximum and of the relative minimum of f.",
        blocks: [shown],
        parts: [
          ask.points("Relative maximum", [max]),
          ask.points("Relative minimum", [min]),
        ],
        solution: [
          `A relative maximum is a point where the graph changes from rising to falling. On the graph that point is (${num(max[0])}, ${num(max[1])}).`,
          `A relative minimum is a point where the graph changes from falling to rising. That point is (${num(min[0])}, ${num(min[1])}).`,
        ],
        data: { expr, s, h, k, max, min },
      });
    },
    verify({ data: { expr, max, min } }) {
      const g = fnOf(expr);
      const found = extremaOf(g, -9, 9);
      assert(found.length === 2, "two extrema");
      const peak = found.find((e) => e.kind === "max");
      const low = found.find((e) => e.kind === "min");
      assertNear(peak.x, max[0], "max x", 1e-4);
      assertNear(peak.y, max[1], "max y", 1e-4);
      assertNear(low.x, min[0], "min x", 1e-4);
      assertNear(low.y, min[1], "min y", 1e-4);
    },
  },
  {
    id: "p03",
    tier: "quick",
    unit: true,
    concept: "extrema",
    skill: "describe",
    make(r) {
      const { s, h, expr, shown, max, min } = cubicPicture(r);
      const outer = unionText(ivl(-Infinity, h - 1), ivl(h + 1, Infinity));
      const inner = ivl(h - 1, h + 1);
      const rising = s > 0 ? outer : inner;
      const falling = s > 0 ? inner : outer;
      return problem({
        stem: "The graph of the cubic polynomial function f is shown. Write the intervals on which f is increasing and the intervals on which f is decreasing.",
        blocks: [shown],
        parts: [
          ask.interval("Increasing on", rising, { closure: "any" }),
          ask.interval("Decreasing on", falling, { closure: "any" }),
        ],
        solution: [
          `The graph turns at x = ${num(h - 1)} and x = ${num(h + 1)}, where f has its relative extrema.`,
          `The graph rises on ${rising}.`,
          `The graph falls on ${falling}.`,
        ],
        data: { expr, s, h, max, min },
      });
    },
    verify({ data: { expr, s, h, max, min } }) {
      const g = fnOf(expr);
      for (const x of [h - 3, h - 2, h + 2, h + 3])
        assert(g(x + 0.1) > g(x) === s > 0, "outer pieces");
      assert(g(h + 0.1) < g(h) === s > 0, "inner piece");
      assert(max[0] !== min[0], "extrema differ");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "extrema-and-zeros",
    skill: "describe",
    make(r) {
      const d = r.int(4, 9);
      return problem({
        stem: `A polynomial function p has degree ${d}. Give the greatest possible number of each of the following for the graph of p.`,
        parts: [
          part("Real zeros", ask.number("Real zeros", d)),
          part("Relative extrema", ask.number("Relative extrema", d - 1)),
          part("Points of inflection", ask.number("Points of inflection", d - 2)),
        ],
        solution: [
          `A polynomial of degree ${d} has at most ${d} real zeros.`,
          `Its graph has at most ${d} − 1 = ${d - 1} relative extrema, because the rate of change of p is a polynomial of degree ${d - 1}.`,
          `Its graph has at most ${d} − 2 = ${d - 2} points of inflection.`,
        ],
        data: { d },
      });
    },
    verify({ data: { d } }) {
      assert(d >= 4, "degree is at least 4");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    unit: true,
    concept: "polynomial-terms",
    skill: "identify-information",
    make(r) {
      const count = r.int(2, 3);
      const roots = r.distinct(-5, 5, count);
      const mults = roots.map(() => r.pick([1, 1, 2, 3]));
      const degree = mults.reduce((a, b) => a + b, 0);
      if (degree < 3 || degree > 6) reject("degree out of range");
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const text = factoredText(
        a,
        roots.map((root, i) => [root, mults[i]]),
      );
      const poly = Poly.fromRoots(
        a,
        roots.flatMap((root, i) => Array(mults[i]).fill(root)),
      );
      const intercept = poly.at(0);
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}. Find the degree of f, the leading coefficient of f, and the y-intercept of the graph of f.`,
        parts: [
          ask.number("Degree", degree),
          ask.number("Leading coefficient", a),
          ask.number("y-intercept", intercept),
        ],
        solution: [
          `The degree is the sum of the exponents on the factors: ${mults.join(" + ")} = ${degree}.`,
          `When the factors are multiplied out, the leading term is ${lead(a)}x${sup(degree)}, so the leading coefficient is ${num(a)}.`,
          `The y-intercept is f(0) = ${num(intercept.value)}.`,
        ],
        data: { text, degree, a, intercept: intercept.value },
      });
    },
    verify({ data: { text, degree, a, intercept } }) {
      const f = fnOf(text);
      assertNear(f(0), intercept, "y-intercept");
      assertNear(f(1e5) / 1e5 ** degree, a, "leading coefficient", 1e-3);
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "extrema",
    skill: "identify-information",
    make(r) {
      const p = r.pick([1, 2]);
      const s = r.pick([1, 1, -1, -1]);
      const k = r.int(-3, 3);
      const expr = `(${s})(x^2 − ${p * p})^2/${p * p} + (${k})`;
      const f = fnOf(expr);
      const middle = s * p * p + k;
      const word = s > 0 ? "minimum" : "maximum";
      const mid = s > 0 ? "relative maximum" : "relative minimum";
      return problem({
        stem: "The graph of the fourth-degree polynomial function f is shown. The graph is symmetric about the y-axis.",
        blocks: [
          graph({
            caption: "The graph of y = f(x)",
            alt: "The graph of a fourth-degree polynomial with three turning points, symmetric about the y-axis.",
            window: { x: [-6, 6], y: [-10, 10] },
            ticks: { x: 1, y: 1 },
            functions: [{ expr }],
          }),
        ],
        parts: [
          part(
            "At which values of x does f have a relative extremum?",
            ask.set("x =", [-p, 0, p]),
          ),
          part(
            `Find the coordinates of the ${mid} of f.`,
            ask.points(mid[0].toUpperCase() + mid.slice(1), [[0, middle]]),
          ),
          part(
            `What is the absolute ${word} value of f?`,
            ask.number(`Absolute ${word}`, k),
          ),
        ],
        solution: [
          `The graph turns around at x = ${num(-p)}, x = 0, and x = ${num(p)}, so f has a relative extremum at each of those values.`,
          `The turning point on the y-axis is at (0, ${num(middle)}), where the graph changes direction between the other two turning points. It is the ${mid}.`,
          `The two outer turning points are the ${s > 0 ? "lowest" : "highest"} points of the graph, so the absolute ${word} value is ${num(k)}, at both x = ${num(-p)} and x = ${num(p)}.`,
        ],
        data: { expr, p, s, k, middle },
      });
    },
    verify({ data: { expr, p, s, k, middle } }) {
      const f = fnOf(expr);
      const found = extremaOf(f, -7, 7);
      assert(found.length === 3, "three turning points");
      assertNear(f(0), middle, "middle value");
      assertNear(f(p), k, "outer value");
      assertNear(f(-p), k, "outer value");
      assert(
        found
          .map((e) => Math.round(e.x))
          .sort((a, b) => a - b)
          .join() === [-p, 0, p].join(),
        "positions",
      );
      assert(
        s > 0
          ? found.find((e) => Math.abs(e.x) < 0.01).kind === "max"
          : found.find((e) => Math.abs(e.x) < 0.01).kind === "min",
        "kind",
      );
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "extrema-and-zeros",
    skill: "support-conclusions",
    make(r) {
      const [a, b, c] = r.distinctNonzero(-5, 5, 3);
      const k = r.pick([1, 2, -1, -2]);
      const text = factoredText(k, [
        [a, 2],
        [b, 1],
        [c, 1],
      ]);
      const f = fnOf(text);
      const lowAtA = k * (a - b) * (a - c) > 0;
      const poly = Poly.fromRoots(k, [a, a, b, c]);
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}.`,
        parts: [
          part(
            "At which zero of f does the graph touch the x-axis without crossing it?",
            ask.number("x =", a),
          ),
          part(
            "Is there a relative maximum or a relative minimum at that zero?",
            ask.choice(
              "There is a relative",
              ["maximum", "minimum"],
              lowAtA ? "minimum" : "maximum",
            ),
          ),
          part(
            "Find the y-intercept of the graph of f.",
            ask.number("y-intercept", poly.at(0)),
          ),
        ],
        solution: [
          `The factor ${factorText(a)}² has an even exponent, so the graph touches the x-axis at x = ${num(a)} and turns around there instead of crossing.`,
          `Near x = ${num(a)} the output is ${lowAtA ? "positive" : "negative"} on both sides, so the graph stays ${lowAtA ? "above" : "below"} the x-axis there. The point (${num(a)}, 0) is a relative ${lowAtA ? "minimum" : "maximum"}.`,
          `The y-intercept is f(0) = ${num(poly.at(0).value)}.`,
        ],
        data: { text, a, b, c, lowAtA, intercept: poly.at(0).value },
      });
    },
    verify({ data: { text, a, b, c, lowAtA, intercept } }) {
      const f = fnOf(text);
      assertNear(f(0), intercept, "y-intercept");
      for (const dx of [0.01, -0.01])
        assert(lowAtA ? f(a + dx) > 0 : f(a + dx) < 0, "touch point side");
      assert(
        f(b + 0.01) * f(b - 0.01) < 0 && f(c + 0.01) * f(c - 0.01) < 0,
        "single zeros cross",
      );
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "inflection",
    skill: "describe",
    make(r) {
      const { s, h, k, expr, shown } = cubicPicture(r);
      const upInterval = s > 0 ? ivl(h, Infinity) : ivl(-Infinity, h);
      const downInterval = s > 0 ? ivl(-Infinity, h) : ivl(h, Infinity);
      return problem({
        stem: "The graph of the cubic polynomial function f is shown. The graph changes concavity at one point.",
        blocks: [shown],
        parts: [
          part(
            "Find the coordinates of the point of inflection.",
            ask.points("Point of inflection", [[h, k]]),
          ),
          part(
            "On which interval is the graph of f concave up?",
            ask.interval("Concave up on", upInterval, { closure: "any" }),
          ),
          part(
            "On which interval is the graph of f concave down?",
            ask.interval("Concave down on", downInterval, { closure: "any" }),
          ),
        ],
        solution: [
          `A point of inflection is where the concavity changes. The graph changes from ${s > 0 ? "concave down to concave up" : "concave up to concave down"} at (${num(h)}, ${num(k)}), halfway between the relative maximum and the relative minimum.`,
          `The graph is concave up on ${upInterval}.`,
          `The graph is concave down on ${downInterval}.`,
        ],
        data: { expr, s, h, k },
      });
    },
    verify({ data: { expr, s, h, k } }) {
      const g = fnOf(expr);
      assertNear(g(h), k, "inflection height");
      const second = (x) => g(x + 0.01) - 2 * g(x) + g(x - 0.01);
      assert(second(h + 1) * s > 0 && second(h - 1) * s < 0, "concavity by side");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "inflection",
    skill: "describe",
    make(r) {
      const { s, h, expr, shown } = cubicPicture(r);
      const options = [
        "increasing at an increasing rate",
        "increasing at a decreasing rate",
        "decreasing at an increasing rate",
        "decreasing at a decreasing rate",
      ];
      const regions = [
        [h - 3, h - 1],
        [h - 1, h],
        [h, h + 1],
        [h + 1, h + 3],
      ];
      const g = Poly.of(s, 0, -3 * s, 0);
      const d1 = g.derivative().fn();
      const d2 = g.derivative().derivative().fn();
      const describeAt = (lo, hi) => {
        const mid = (lo + hi) / 2 - h;
        return `${d1(mid) > 0 ? "increasing" : "decreasing"} at ${d2(mid) > 0 ? "an increasing" : "a decreasing"} rate`;
      };
      const chosen = r.sample([0, 1, 2, 3], 3).sort();
      return problem({
        stem: "The graph of the cubic polynomial function f is shown. Describe how f changes on each interval: increasing or decreasing, and whether the rate of change is itself increasing or decreasing.",
        blocks: [shown],
        parts: chosen.map((i) => {
          const [lo, hi] = regions[i];
          return part(
            `On the interval ${num(lo)} < x < ${num(hi)}, f is`,
            ask.choice("f is", options, describeAt(lo, hi)),
          );
        }),
        solution: chosen.map((i) => {
          const [lo, hi] = regions[i];
          const text = describeAt(lo, hi);
          return `On ${num(lo)} < x < ${num(hi)} the graph ${text.startsWith("increasing") ? "rises" : "falls"} and is concave ${text.endsWith("an increasing rate") ? "up" : "down"}, so f is ${text}.`;
        }),
        data: { expr, h, chosen, answers: chosen.map((i) => describeAt(...regions[i])) },
      });
    },
    verify({ data: { expr, h, chosen, answers } }) {
      const f = fnOf(expr);
      const spans = [
        [h - 3, h - 1],
        [h - 1, h],
        [h, h + 1],
        [h + 1, h + 3],
      ];
      chosen.forEach((i, n) => {
        const [lo, hi] = spans[i];
        const mid = (lo + hi) / 2;
        const rising = f(mid + 0.01) > f(mid - 0.01);
        const curvature = f(mid + 0.01) - 2 * f(mid) + f(mid - 0.01);
        const expected = `${rising ? "increasing" : "decreasing"} at ${curvature > 0 ? "an increasing" : "a decreasing"} rate`;
        assert(
          expected === answers[n],
          `region ${i}: expected ${expected}, key says ${answers[n]}`,
        );
      });
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "polynomial-terms",
    skill: "equivalent-forms",
    make(r) {
      const roots = r.distinctNonzero(-4, 4, 3);
      const k = r.pick([1, 1, 2, -1]);
      const factored = factoredText(
        k,
        roots.map((root) => [root, 1]),
      );
      const poly = Poly.fromRoots(k, roots);
      const key = polyText([...poly.c].reverse().map((q) => q.value));
      return problem({
        stem: `The polynomial function f is given by f(x) = ${factored}. Write f(x) in standard form, as a sum of terms with the powers of x in decreasing order.`,
        parts: [ask.expr("f(x) =", key, { form: "expanded" })],
        solution: [
          `Multiply the first two factors: ${factorText(roots[0])}${factorText(roots[1])} = ${Poly.fromRoots(1, [roots[0], roots[1]]).text()}.`,
          `Multiply that result by ${factorText(roots[2])}${k === 1 ? "" : ` and by ${num(k)}`}.`,
          `Combining like terms gives f(x) = ${key}.`,
        ],
        data: { factored, key, roots, k },
      });
    },
    verify({ data: { factored, key } }) {
      const a = fnOf(factored);
      const b = fnOf(key);
      for (const x of [-3.5, -1.2, 0, 0.7, 2.9, 5])
        assertNear(a(x), b(x), "factored and standard form agree");
    },
  },
];

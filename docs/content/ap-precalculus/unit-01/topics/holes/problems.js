// Typed-answer problems for Topic 1.10. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed expression, so a slip in the
// key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  graph,
  factoredText,
  factorText,
  rootText,
  signed,
  polyText,
  ratio,
  num,
  Q,
  fnOf,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const roots = (...values) =>
  factoredText(
    1,
    values.map((root) => [root, 1]),
  );

// r(x) = (x − a)(x − b)/((x − a)(x − c)) as text, with the factors in a random order.
function holeText(r, a, b, c) {
  const top = r.chance() ? [a, b] : [b, a];
  const bottom = r.chance() ? [a, c] : [c, a];
  return ratio(roots(...top), roots(...bottom));
}

const threeRoots = (r, limit = 7) => {
  const [a, b, c] = r.distinctNonzero(-limit, limit, 3);
  return [a, b, c];
};

// The text a student sees for "x = 3".
const xEquals = (value) => `x = ${num(value)}`;

// Checks the claims every hole-and-asymptote variant makes about r(x) = (x−a)(x−b)/((x−a)(x−c)).
function checkHoleFacts(text, a, b, c) {
  const f = fnOf(text);
  assert(Number.isNaN(f(a)), "r should be undefined at the hole");
  assert(Number.isNaN(f(c)), "r should be undefined at the asymptote");
  assertNear(f(b), 0, "r(b)");
  const limit = (a - b) / (a - c);
  assertNear(f(a + 1e-6), limit, "right of the hole", 1e-4);
  assertNear(f(a - 1e-6), limit, "left of the hole", 1e-4);
  assert(Math.abs(f(c + 1e-6)) > 1e4, "r should blow up near the asymptote");
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "hole-condition",
    skill: "identify-information",
    make(r) {
      const [a, b, c] = threeRoots(r);
      const text = holeText(r, a, b, c);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}. At what value of x does the graph of r have a hole?`,
        parts: [ask.number("x =", a)],
        solution: [
          `The factor ${rootText(a)} appears in both the numerator and the denominator, so it cancels.`,
          `Setting that factor equal to 0 gives x = ${num(a)}. The graph has a hole at x = ${num(a)}.`,
        ],
        data: { text, a, b, c },
      });
    },
    verify({ data: { text, a, b, c } }) {
      checkHoleFacts(text, a, b, c);
    },
  },
  {
    id: "p02",
    tier: "quick",
    concept: "hole-or-asymptote",
    skill: "describe",
    make(r) {
      const [a, b, c] = threeRoots(r);
      const text = holeText(r, a, b, c);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}. Identify the hole and the vertical asymptote of the graph of r.`,
        parts: [
          ask.number("Hole at x =", a),
          ask.equations("Vertical asymptote", [xEquals(c)], { vars: ["x"] }),
        ],
        solution: [
          `The factor ${rootText(a)} is in both the numerator and the denominator, so the graph has a hole at x = ${num(a)}.`,
          `The factor ${rootText(c)} is only in the denominator, so the graph has a vertical asymptote at x = ${num(c)}.`,
        ],
        data: { text, a, b, c },
      });
    },
    verify({ data: { text, a, b, c } }) {
      checkHoleFacts(text, a, b, c);
    },
  },
  {
    id: "p03",
    tier: "quick",
    unit: true,
    concept: "hole-location",
    skill: "solve",
    make(r) {
      const k = r.nonzero(-6, 6);
      const m = r.nonzero(-6, 6);
      if (k + m === 0) reject("hole on the x-axis hides the point");
      const top = polyText([1, m - k, -k * m]);
      const bottom = polyText([1, -k]);
      const y = k + m;
      return problem({
        stem: `The rational function r is given by r(x) = ${ratio(top, bottom)}. What are the coordinates of the hole in the graph of r?`,
        parts: [ask.points("Hole at", [[k, y]])],
        solution: [
          `Factor the numerator: ${top} = ${roots(k, -m)}. The factor ${rootText(k)} cancels, so r(x) = x ${signed(m)} for x ≠ ${num(k)}.`,
          `The hole is at x = ${num(k)}, and lim x→${num(k)} r(x) = ${num(k)} ${signed(m)} = ${num(y)}. The hole is at (${num(k)}, ${num(y)}).`,
        ],
        data: { top, bottom, k, m },
      });
    },
    verify({ data: { top, bottom, k, m } }) {
      const f = fnOf(`(${top})/(${bottom})`);
      assert(Number.isNaN(f(k)), "undefined at the hole");
      assertNear(f(k + 1e-6), k + m, "limit at the hole", 1e-4);
      assertNear(f(k - 1e-6), k + m, "limit at the hole", 1e-4);
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "hole-location",
    skill: "equivalent-forms",
    make(r) {
      const k = r.nonzero(-6, 6);
      const m = r.nonzero(-6, 6);
      const lead = r.pick([1, 1, 2, 3]);
      const top = polyText([lead, lead * (m - k), -lead * k * m]);
      const bottom = polyText([1, -k]);
      return problem({
        stem: `The rational function r is given by r(x) = ${ratio(top, bottom)}. For x ≠ ${num(k)}, r(x) can be written without a denominator. Write that simpler expression for r(x).`,
        parts: [ask.expr("r(x) =", polyText([lead, lead * m]))],
        solution: [
          `Factor the numerator: ${top} = ${lead === 1 ? "" : `${lead}`}${roots(k, -m)}.`,
          `The factor ${rootText(k)} cancels with the denominator, leaving r(x) = ${polyText([lead, lead * m])} for x ≠ ${num(k)}.`,
        ],
        data: { top, bottom, k, m, lead },
      });
    },
    verify({ data: { top, bottom, k, m, lead } }) {
      const f = fnOf(`(${top})/(${bottom})`);
      for (const x of [-9.5, -2.25, 0.5, 3.75, 11]) {
        if (Math.abs(x - k) < 0.01) continue;
        assertNear(f(x), lead * (x + m), "simplified form");
      }
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "hole-location",
    skill: "describe",
    make(r) {
      const [a, b, c] = threeRoots(r);
      const text = holeText(r, a, b, c);
      const value = new Q(a - b, a - c);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}. What is lim x→${num(a)} r(x)?`,
        parts: [ask.limit("Limit", value)],
        solution: [
          `For x ≠ ${num(a)}, the common factor cancels and r(x) = ${ratio(`${rootText(b)}`, `${rootText(c)}`)}.`,
          `As x approaches ${num(a)}, the outputs approach (${num(a)} ${signed(-b)})/(${num(a)} ${signed(-c)}) = ${value}. The limit exists even though r(${num(a)}) is undefined.`,
        ],
        data: { text, a, b, c },
      });
    },
    verify({ data: { text, a, b, c } }) {
      checkHoleFacts(text, a, b, c);
    },
  },
  {
    id: "p06",
    tier: "quiz",
    unit: true,
    concept: "hole-condition",
    skill: "solve",
    make(r) {
      const [a, b, c] = threeRoots(r);
      const text = holeText(r, a, b, c);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part("For which values of x is r undefined?", ask.set("x =", [a, c])),
          part("Find the x-coordinate of the hole.", ask.number("x =", a)),
          part(
            "Write the equation of each vertical asymptote.",
            ask.equations("Vertical asymptote", [xEquals(c)]),
          ),
        ],
        solution: [
          `The denominator is 0 when x = ${num(a)} or x = ${num(c)}, so r is undefined at both values.`,
          `The factor for x = ${num(a)} is also in the numerator, so it cancels and leaves a hole at x = ${num(a)}.`,
          `The factor for x = ${num(c)} is not in the numerator, so the line x = ${num(c)} is a vertical asymptote.`,
        ],
        data: { text, a, b, c },
      });
    },
    verify({ data: { text, a, b, c } }) {
      checkHoleFacts(text, a, b, c);
    },
  },
  {
    id: "p07",
    tier: "quiz",
    concept: "hole-or-asymptote",
    skill: "support-conclusions",
    make(r) {
      const [a, b, c] = threeRoots(r);
      // Numerator has one factor of (x − a); the denominator has two, so one stays behind.
      const top = roots(a, b);
      const bottom = `${factorText(a)}²${factorText(c)}`;
      const text = ratio(top, bottom);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}. How many holes does the graph of r have, and where are its vertical asymptotes?`,
        parts: [
          ask.number("Number of holes", 0),
          ask.equations("Vertical asymptotes", [xEquals(a), xEquals(c)]),
        ],
        solution: [
          `The factor ${rootText(a)} appears once in the numerator and twice in the denominator. One copy cancels, but one copy stays in the denominator.`,
          `Because ${rootText(a)} is still in the denominator after canceling, the graph has no hole there. It has a vertical asymptote at x = ${num(a)}, and another at x = ${num(c)}.`,
        ],
        data: { a, b, c, text },
      });
    },
    verify({ data: { a, b, c, text } }) {
      const f = fnOf(text);
      assert(Math.abs(f(a + 1e-6)) > 1e4, "blows up at a");
      assert(Math.abs(f(c + 1e-6)) > 1e4, "blows up at c");
      assertNear(f(b), 0, "r(b)");
      assert(b !== a && b !== c, "zero is separate");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "hole-location",
    skill: "identify-information",
    make(r) {
      const k = r.int(-4, 4);
      const m = r.nonzero(-3, 3);
      const slope = r.pick([1, 1, 2, -1]);
      const intercept = r.int(-3, 3);
      const y = slope * k + intercept;
      if (Math.abs(y) > 8 || Math.abs(k) > 5) reject("outside the window");
      return problem({
        stem: "The graph of the rational function r is shown. The graph is a line with one point missing. What are the coordinates of the hole?",
        blocks: [
          graph({
            caption: "The graph of y = r(x)",
            alt: `A straight line with an open circle at x = ${k < 0 ? "−" : ""}${Math.abs(k)}.`,
            window: { x: [-8, 8], y: [-10, 10] },
            ticks: { x: 2, y: 2 },
            functions: [
              { expr: polyText([slope, intercept]).replace(/−/g, "-"), domain: [-8, 8] },
            ],
            points: [{ at: [k, y], open: true }],
          }),
        ],
        parts: [ask.points("Hole at", [[k, y]])],
        solution: [
          `The open circle marks the missing point of the graph, at x = ${num(k)}.`,
          `The line passes through the open circle at y = ${num(y)}, so the hole is at (${num(k)}, ${num(y)}).`,
        ],
        data: { k, y, slope, intercept, m },
      });
    },
    verify({ data: { k, y, slope, intercept } }) {
      assertNear(slope * k + intercept, y, "hole lies on the line");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "hole-condition",
    skill: "solve",
    make(r) {
      const a = r.nonzero(-5, 5);
      const b = r.nonzero(-6, 6);
      const k = -a * a - a * b;
      const hole = 2 * a + b;
      if (k === 0) reject("trivial constant");
      return problem({
        stem: `The rational function r is given by r(x) = ${ratio(`${polyText([1, b, 0])} + k`, `${rootText(a)}`)}, where k is a constant. The graph of r has a hole at x = ${num(a)}.`,
        parts: [
          part("Find the value of k.", ask.number("k =", k)),
          part("Find the y-coordinate of the hole.", ask.number("y =", hole)),
        ],
        solution: [
          `A hole at x = ${num(a)} means ${rootText(a)} is a factor of the numerator, so the numerator is 0 at x = ${num(a)}.`,
          `${a * a} ${signed(a * b)} + k = 0, so k = ${num(k)}.`,
          `With that k the numerator factors as ${roots(a, -(a + b))}, so r(x) = x ${signed(a + b)} for x ≠ ${num(a)}. The hole's y-coordinate is ${num(a)} ${signed(a + b)} = ${num(hole)}.`,
        ],
        data: { a, b, k, hole },
      });
    },
    verify({ data: { a, b, k, hole } }) {
      const f = fnOf(`(x^2 + (${b})x + (${k}))/(x - (${a}))`);
      assert(Number.isNaN(f(a)), "undefined at a");
      assertNear(f(a + 1e-6), hole, "hole height", 1e-4);
      assertNear(a * a + b * a + k, 0, "numerator zero");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    unit: true,
    concept: "hole-location",
    skill: "construct-functions",
    make(r) {
      const [h, z, c] = threeRoots(r, 5);
      const lead = r.pick([1, 2, 3, -1, -2]);
      const y = new Q(lead * (h - z), h - c);
      if (!y.isInteger || y.n === 0) reject("want a whole-number hole height");
      const key = ratio(
        `${lead === 1 ? "" : lead === -1 ? "−" : lead}${roots(z, h)}`,
        roots(h, c),
      );
      return problem({
        stem: `A rational function r has a zero at x = ${num(z)}, a hole at the point (${num(h)}, ${num(y.n)}), and a vertical asymptote at x = ${num(c)}. The numerator and denominator are both quadratic. Write an expression for r(x).`,
        parts: [ask.expr("r(x) =", key, { text: key })],
        solution: [
          `A zero at x = ${num(z)} gives a numerator factor ${rootText(z)}. A hole at x = ${num(h)} puts the factor ${rootText(h)} in both the numerator and the denominator.`,
          `A vertical asymptote at x = ${num(c)} puts the factor ${rootText(c)} in the denominator only. So r(x) = k${ratio(roots(z, h), roots(h, c))} for some constant k.`,
          `The hole's y-coordinate is lim x→${num(h)} r(x) = k(${num(h)} ${signed(-z)})/(${num(h)} ${signed(-c)}) = ${num(y.n)}, so k = ${num(lead)}. One answer is r(x) = ${key}.`,
        ],
        data: { h, z, c, lead, y: y.n, key },
      });
    },
    verify({ data: { h, z, c, lead, y, key } }) {
      const f = fnOf(key);
      assert(Number.isNaN(f(h)), "undefined at the hole");
      assertNear(f(h + 1e-6), y, "hole height", 1e-4);
      assertNear(f(z), 0, "zero");
      assert(Math.abs(f(c + 1e-6)) > 1e4, "asymptote");
      assert(lead !== 0, "nonzero lead");
    },
  },
];

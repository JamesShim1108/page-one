// Typed-answer problems for Topic 1.8. Each template draws new numbers for every
// variant. verify() re-checks every answer set against the displayed expression by
// testing the inequality at many values, so a slip in the key and a slip in the stem
// cannot both survive the build.

import {
  ask,
  part,
  problem,
  graph,
  polyText,
  factorText,
  ratio,
  par,
  num,
  sup,
  ivl,
  unionText,
  andList,
  fnOf,
  assert,
  signSolution,
  factorsText,
  factoredRational,
  byRoot,
  regionsText,
  lead,
} from "../../../../practice-kit/index.js";

// ---------- Building rational functions from their zeros ----------

const SYMBOLS = { ">": ">", "≥": "≥", "<": "<", "≤": "≤" };

// Checks an interval answer against the displayed rational expression: the relation
// must hold exactly on the stated set, at the endpoints and between them.
function checkInequality(text, relation, pieces) {
  const f = fnOf(text);
  const within = (x) =>
    pieces.some(({ lo, hi, loClosed, hiClosed }) => {
      if (x === lo) return Boolean(loClosed);
      if (x === hi) return Boolean(hiClosed);
      return x > lo && x < hi;
    });
  const holds = (y) => {
    if (!Number.isFinite(y)) return false;
    if (relation === ">") return y > 1e-9;
    if (relation === "≥") return y > -1e-9;
    if (relation === "<") return y < -1e-9;
    return y < 1e-9;
  };
  const grid = [];
  for (let x = -16; x <= 16; x += 0.25) grid.push(x + 0.0137, x);
  for (let x = -16; x <= 16; x += 1) grid.push(x);
  for (const x of grid)
    assert(
      holds(f(x)) === within(x),
      `at x = ${x}, r is ${f(x)} but the stated set ${within(x) ? "includes" : "excludes"} it for ${relation} 0`,
    );
}

// Plain-language endpoint rule used in the solutions.
const endpointLine = (relation, name = "r") =>
  relation === "≥" || relation === "≤"
    ? `The inequality allows equality, so include each zero of the numerator that is in the domain. Never include a zero of the denominator, because ${name} is undefined there.`
    : "The inequality is strict, so no endpoint is included.";

// The steps shared by every sign-analysis solution.
function analysis(spec, relation, result, options = {}) {
  const { name = "r", closing = null, endpoints = true, skip = [] } = options;
  const zeros = spec.top.map(([root]) => `x = ${num(root)}`);
  const poles = spec.bottom.map(([root]) => `x = ${num(root)}`);
  const lines = [
    `The numerator is 0 at ${andList(zeros)}, and the denominator is 0 at ${andList(poles)}.`,
    `These values split the number line into ${result.regions.length} intervals. Testing one value in each interval shows that ${name} is ${regionsText(result.regions)}.`,
  ];
  const even = [...spec.top, ...spec.bottom].filter(
    ([root, mult]) => mult % 2 === 0 && !skip.includes(root),
  );
  if (even.length)
    lines.push(
      `The factor${even.length > 1 ? "s" : ""} ${even
        .map(([root, mult]) => `${factorText(root)}${sup(mult)}`)
        .join(
          " and ",
        )} ${even.length > 1 ? "have" : "has"} even multiplicity, so the sign of ${name} does not change there.`,
    );
  if (endpoints) lines.push(endpointLine(relation, name));
  lines.push(closing ?? `So ${name}(x) ${SYMBOLS[relation]} 0 on ${result.text}.`);
  return lines;
}

// Draws distinct nonzero integer roots.
const roots = (r, count, lo = -6, hi = 6) => r.distinctNonzero(lo, hi, count);

// ---------- Problems ----------

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "numerator-zeros",
    skill: "solve",
    make(r) {
      const [first, second, d] = roots(r, 3);
      const [a, b] = [Math.min(first, second), Math.max(first, second)];
      const text = r.chance(0.7)
        ? ratio(polyText([1, -(a + b), a * b]), polyText([1, -d]))
        : ratio(`${factorText(a)}${factorText(b)}`, factorText(d));
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part("Find all real zeros of r.", ask.set("x =", [a, b])),
          part(
            "Find the value of x that is not in the domain of r.",
            ask.number("x =", d),
          ),
        ],
        solution: [
          `A rational function is 0 only where its numerator is 0 and the function is defined. The numerator is 0 at x = ${num(a)} and x = ${num(b)}.`,
          `The denominator is 0 at x = ${num(d)}, so r is undefined there. Neither zero of the numerator equals ${num(d)}, so both are zeros of r.`,
        ],
        data: { text, a, b, d },
      });
    },
    verify({ data: { text, a, b, d } }) {
      const f = fnOf(text);
      assert(Math.abs(f(a)) < 1e-9 && Math.abs(f(b)) < 1e-9, "zeros of r");
      assert(!Number.isFinite(f(d)), "r is undefined at d");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "numerator-zeros",
    skill: "support-conclusions",
    make(r) {
      const [a, b] = roots(r, 2, -6, 6);
      const text = ratio(polyText([1, -(a + b), a * b]), polyText([1, -a]));
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part("Find all real zeros of r.", ask.set("x =", [b])),
          part(
            "Write the domain of r in interval notation.",
            ask.interval("Domain", unionText(ivl(-Infinity, a), ivl(a, Infinity))),
          ),
        ],
        solution: [
          `Factor the numerator: ${polyText([1, -(a + b), a * b])} = ${factorText(a)}${factorText(b)}. The numerator is 0 at x = ${num(a)} and x = ${num(b)}.`,
          `The denominator is 0 at x = ${num(a)}, so ${num(a)} is not in the domain of r, and it cannot be a zero of r even though it makes the numerator 0.`,
          `The only real zero of r is x = ${num(b)}, and the domain is ${unionText(ivl(-Infinity, a), ivl(a, Infinity))}.`,
        ],
        data: { text, a, b },
      });
    },
    verify({ data: { text, a, b } }) {
      const f = fnOf(text);
      assert(!Number.isFinite(f(a)), "r is undefined at a");
      assert(Math.abs(f(b)) < 1e-9, "b is a zero of r");
      assert(Math.abs(f(a + 0.5) - (a + 0.5 - b)) < 1e-9, "r(x) = x − b away from a");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "sign-analysis",
    skill: "identify-information",
    make(r) {
      const [a, b, c] = roots(r, 3, -5, 5);
      const spec = {
        lead: r.sign(),
        top: byRoot([a, b]),
        bottom: [[c, 1]],
      };
      const text = factoredRational(spec);
      const result = signSolution(spec, ">");
      return problem({
        stem: "The graph of the rational function r is shown. The graph has a vertical asymptote, drawn as a dashed line, and crosses the x-axis at the two points shown.",
        blocks: [
          graph({
            caption: "The graph of y = r(x)",
            alt: `The graph of a rational function with x-intercepts at x = ${num(Math.min(a, b))} and x = ${num(Math.max(a, b))} and a vertical asymptote at x = ${num(c)}.`,
            window: { x: [-8, 8], y: [-10, 10] },
            ticks: { x: 1, y: 2 },
            functions: [{ expr: text }],
            asymptotes: [{ x: c }],
            points: [{ at: [a, 0] }, { at: [b, 0] }],
          }),
        ],
        parts: [
          part("Find all real zeros of r.", ask.set("x =", [a, b])),
          part(
            "Write the set of all x for which r(x) > 0 in interval notation.",
            ask.interval("r(x) > 0 on", result.text),
          ),
        ],
        solution: [
          `The graph crosses the x-axis at x = ${num(Math.min(a, b))} and x = ${num(Math.max(a, b))}, so those are the real zeros.`,
          `The dashed line is at x = ${num(c)}, where r is undefined. The three values split the number line into intervals.`,
          `Reading the graph, r(x) > 0 where the graph is above the x-axis: on ${result.text}. The endpoints are not included because r(x) = 0 at the zeros and r is undefined at x = ${num(c)}.`,
        ],
        data: { text, relation: ">", pieces: result.merged },
      });
    },
    verify({ data: { text, relation, pieces } }) {
      checkInequality(text, relation, pieces);
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "inequalities",
    skill: "solve",
    make(r) {
      const [a, c] = roots(r, 2, -7, 7);
      const relation = r.pick([">", "≥", "<", "≤"]);
      const leadValue = r.sign();
      const spec = { lead: leadValue, top: [[a, 1]], bottom: [[c, 1]] };
      const top = leadValue === 1 ? polyText([1, -a]) : `${num(a)} − x`;
      const text = ratio(top, polyText([1, -c]));
      const result = signSolution(spec, relation);
      return problem({
        stem: `Solve the inequality ${text} ${SYMBOLS[relation]} 0. Write the solution in interval notation.`,
        parts: [ask.interval("Solution", result.text)],
        solution: analysis(spec, relation, result, {
          name: "the fraction",
          closing: `So the solution is ${result.text}.`,
        }),
        data: { text, relation, pieces: result.merged },
      });
    },
    verify({ data: { text, relation, pieces } }) {
      checkInequality(text, relation, pieces);
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "sign-analysis",
    skill: "describe",
    make(r) {
      const topCount = r.int(2, 3);
      const bottomCount = r.int(1, 2);
      const all = roots(r, topCount + bottomCount, -7, 7);
      const spec = {
        lead: r.pick([1, -1, 2, -2, 3]),
        top: byRoot(all.slice(0, topCount)),
        bottom: byRoot(all.slice(topCount)),
      };
      const relation = r.pick([">", "<"]);
      const text = factoredRational(spec);
      const result = signSolution(spec, relation);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            "Find all real zeros of r.",
            ask.set(
              "x =",
              spec.top.map(([root]) => root),
            ),
          ),
          part(
            `Write the set of all x for which r(x) ${SYMBOLS[relation]} 0 in interval notation.`,
            ask.interval(`r(x) ${SYMBOLS[relation]} 0 on`, result.text),
          ),
        ],
        solution: [
          `The real zeros of r are the zeros of the numerator: ${andList(spec.top.map(([root]) => `x = ${num(root)}`))}.`,
          ...analysis(spec, relation, result, {
            closing: `The inequality is strict, so no endpoints are included. So r(x) ${SYMBOLS[relation]} 0 on ${result.text}.`,
            endpoints: false,
          }),
        ],
        data: { text, relation, pieces: result.merged },
      });
    },
    verify({ data: { text, relation, pieces } }) {
      checkInequality(text, relation, pieces);
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "sign-analysis",
    skill: "support-conclusions",
    make(r) {
      const [a, b, c, d] = roots(r, 4, -6, 6);
      const evenPole = r.chance(0.35);
      const spec = {
        lead: r.sign(),
        top: byRoot([a, b], (root) => (root === a ? 2 : 1)),
        bottom: [[c, evenPole ? 2 : 1]],
      };
      // Sometimes add a third numerator factor for a richer sign chart.
      if (r.chance(0.4)) {
        spec.top = byRoot([a, b, d], (root) => (root === a ? 2 : 1));
      }
      const relation = r.pick([">", "<"]);
      const text = factoredRational(spec);
      const result = signSolution(spec, relation);
      const asked = r.pick([a, b]);
      const mult = asked === a ? 2 : 1;
      const changes = mult % 2 === 1;
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            `Does the sign of r(x) change at x = ${num(asked)}?`,
            ask.choice(`At x = ${num(asked)}`, ["Yes", "No"], changes ? "Yes" : "No"),
          ),
          part(
            `Write the set of all x for which r(x) ${SYMBOLS[relation]} 0 in interval notation.`,
            ask.interval(`r(x) ${SYMBOLS[relation]} 0 on`, result.text),
          ),
        ],
        solution: [
          `The factor ${factorText(asked)}${mult > 1 ? sup(mult) : ""} has ${mult > 1 ? "even" : "odd"} multiplicity, so the sign of r(x) ${changes ? "changes" : "does not change"} at x = ${num(asked)}.`,
          ...analysis(spec, relation, result, { endpoints: false, skip: [asked] }),
        ],
        data: { text, relation, pieces: result.merged },
      });
    },
    verify({ data: { text, relation, pieces } }) {
      checkInequality(text, relation, pieces);
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "inequalities",
    skill: "solve",
    make(r) {
      const [a, b, c] = roots(r, 3, -6, 6);
      const relation = r.pick([">", "≥", "<", "≤"]);
      const spec = { lead: 1, top: byRoot([a, b]), bottom: [[c, 1]] };
      const numerator = polyText([1, -(a + b), a * b]);
      const text = ratio(numerator, polyText([1, -c]));
      const result = signSolution(spec, relation);
      return problem({
        stem: `Let r(x) = ${text}.`,
        parts: [
          part(
            "Write the numerator in factored form.",
            ask.expr("Numerator =", factorsText(spec.top), {
              form: "factored",
            }),
          ),
          part(
            `Solve r(x) ${SYMBOLS[relation]} 0. Write the solution in interval notation.`,
            ask.interval("Solution", result.text),
          ),
        ],
        solution: [
          `Factor the numerator: ${numerator} = ${factorsText(spec.top)}, so r(x) = ${factoredRational(spec)}.`,
          ...analysis(spec, relation, result),
        ],
        data: { text, relation, pieces: result.merged },
      });
    },
    verify({ data: { text, relation, pieces } }) {
      checkInequality(text, relation, pieces);
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "inequalities",
    skill: "solve",
    make(r) {
      const [a, b, c] = roots(r, 3, -6, 6);
      const relation = r.pick([">", "≥", "<", "≤"]);
      const leadValue = r.pick([1, 1, -1, 2]);
      const spec = { lead: leadValue, top: [[a, 1]], bottom: byRoot([b, c]) };
      const numerator = polyText([leadValue, -leadValue * a]);
      const denominator = polyText([1, -(b + c), b * c]);
      const text = ratio(numerator, denominator);
      const result = signSolution(spec, relation);
      const [lo, hi] = [Math.min(b, c), Math.max(b, c)];
      return problem({
        stem: `Let r(x) = ${text}.`,
        parts: [
          part(
            "Write the domain of r in interval notation.",
            ask.interval(
              "Domain",
              unionText(ivl(-Infinity, lo), ivl(lo, hi), ivl(hi, Infinity)),
            ),
          ),
          part(
            `Solve r(x) ${SYMBOLS[relation]} 0. Write the solution in interval notation.`,
            ask.interval("Solution", result.text),
          ),
        ],
        solution: [
          `Factor the denominator: ${denominator} = ${factorsText(spec.bottom)}. It is 0 at x = ${num(lo)} and x = ${num(hi)}, so those two values are not in the domain.`,
          ...analysis(spec, relation, result),
        ],
        data: { text, relation, pieces: result.merged },
      });
    },
    verify({ data: { text, relation, pieces } }) {
      checkInequality(text, relation, pieces);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "inequalities",
    skill: "equivalent-forms",
    make(r) {
      const b = r.nonzero(-5, 5);
      const c = r.pick([1, 2, 3, -1, -2, -3]);
      const m = r.nonzero(-4, 4);
      const p = c * m;
      const x0 = b + m;
      const relation = r.pick([">", "≥", "<", "≤"]);
      const spec = { lead: -c, top: [[x0, 1]], bottom: [[b, 1]] };
      const result = signSolution(spec, relation);
      const left = `${num(p)}/${factorText(b)}`;
      const inequality = `${left} ${SYMBOLS[relation]} ${num(c)}`;
      const numerator = polyText([-c, p + c * b]);
      const text = `${left} - ${par(c)}`;
      const denominator = polyText([1, -b]);
      const move = c > 0 ? `Subtract ${c} from` : `Add ${-c} to`;
      const moved = `${left} ${c > 0 ? "−" : "+"} ${Math.abs(c)} ${SYMBOLS[relation]} 0`;
      const times = Math.abs(c) === 1 ? factorText(b) : `${Math.abs(c)}${factorText(b)}`;
      return problem({
        stem: `Consider the inequality ${inequality}.`,
        parts: [
          part(
            `${move} both sides. Then write the left side as a single fraction with denominator ${denominator}, and enter its numerator in simplest form.`,
            ask.expr("Numerator =", numerator, { form: "expanded" }),
          ),
          part(
            "Solve the inequality. Write the solution in interval notation.",
            ask.interval("Solution", result.text),
          ),
        ],
        solution: [
          `${move} both sides: ${moved}. Do not multiply both sides by ${denominator}, because it can be positive or negative.`,
          `Write the left side over the common denominator: (${num(p)} ${c > 0 ? "−" : "+"} ${times})/${factorText(b)} = (${numerator})/${factorText(b)}. The numerator in simplest form is ${numerator}.`,
          `The numerator is 0 at x = ${num(x0)} and the denominator is 0 at x = ${num(b)}. Testing a value in each interval, the fraction is ${regionsText(result.regions)}.`,
          `${endpointLine(relation, "the fraction")} So the solution is ${result.text}.`,
        ],
        data: { text, relation, pieces: result.merged },
      });
    },
    verify({ data: { text, relation, pieces } }) {
      checkInequality(text, relation, pieces);
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "inequalities",
    skill: "construct-functions",
    make(r) {
      const [a0, b0, c] = roots(r, 3, -6, 6);
      const a = Math.min(a0, b0);
      const b = Math.max(a0, b0);
      const relation = r.pick(["≤", "≥"]);
      const names = r.pick([
        ["a", "b", "c"],
        ["p", "q", "s"],
        ["h", "k", "m"],
      ]);
      const [A, B, C] = names;
      const spec = {
        lead: 1,
        top: [
          [a, 1],
          [b, 1],
        ],
        bottom: [[c, 1]],
      };
      const result = signSolution(spec, relation);
      const template = `(x − ${A})(x − ${B})/(x − ${C})`;
      const concrete = `${factorText(a)}${factorText(b)}/${factorText(c)}`;
      return problem({
        stem: `The rational function r is given by r(x) = ${template}, where ${A} < ${B}. The solution set of the inequality r(x) ${SYMBOLS[relation]} 0 is ${result.text}.`,
        parts: [
          part(
            `Find the values of ${A}, ${B}, and ${C}.`,
            ask.number(`${A} =`, a),
            ask.number(`${B} =`, b),
            ask.number(`${C} =`, c),
          ),
        ],
        solution: [
          `An endpoint written with a square bracket is included, so r(x) = 0 there. Those endpoints are zeros of the numerator: ${num(a)} and ${num(b)}. With ${A} < ${B}, ${A} = ${num(a)} and ${B} = ${num(b)}.`,
          `An endpoint written with a parenthesis that is not ∞ or −∞ is excluded because r is undefined there, so it is the zero of the denominator: ${C} = ${num(c)}.`,
          `Check: r(x) = ${concrete} gives r(x) ${SYMBOLS[relation]} 0 on ${result.text}.`,
        ],
        data: {
          text: ratio(`${factorText(a)}${factorText(b)}`, factorText(c)),
          relation,
          pieces: result.merged,
        },
      });
    },
    verify({ data: { text, relation, pieces } }) {
      checkInequality(text, relation, pieces);
    },
  },
];

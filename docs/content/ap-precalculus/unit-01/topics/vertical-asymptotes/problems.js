// Typed-answer problems for Topic 1.9. Each template draws new numbers for every
// variant. Asymptotes and one-sided limits are computed exactly from the zeros of the
// numerator and denominator, then verify() re-checks them by evaluating the displayed
// expression very close to each asymptote.

import {
  ask,
  part,
  problem,
  graph,
  table,
  polyText,
  factorText,
  signed,
  num,
  sup,
  fixed,
  andList,
  fnOf,
  assert,
  reject,
  infinity,
  factoredRational,
  expandedRational,
  factorsText,
  byRoot,
  multiplicityAt,
  verticalAsymptotes,
  oneSidedAt,
} from "../../../../practice-kit/index.js";

const distinct = (r, count, lo = -6, hi = 6) => r.distinctNonzero(lo, hi, count);
const equation = (x) => `x = ${num(x)}`;

// "∞" or "−∞" from a sign.
const direction = (sign) => (sign > 0 ? "∞" : "−∞");

// Evaluates the displayed expression just left and just right of a vertical asymptote.
function checkSides(text, root, left, right) {
  const f = fnOf(text);
  for (const [offset, expected, side] of [
    [-1e-6, left, "left"],
    [1e-6, right, "right"],
  ]) {
    const y = f(root + offset);
    assert(
      Number.isFinite(y) && Math.sign(y) === expected && Math.abs(y) > 1e4,
      `r near ${root} on the ${side} should head to ${direction(expected)}, got ${y}`,
    );
  }
}

// Checks that every listed value is a vertical asymptote of the displayed expression
// and that every other zero of the denominator is not.
function checkAsymptotes(text, asymptotes, excluded = []) {
  const f = fnOf(text);
  for (const x of asymptotes) {
    assert(
      Math.abs(f(x - 1e-6)) > 1e4 && Math.abs(f(x + 1e-6)) > 1e4,
      `asymptote at ${x}`,
    );
  }
  for (const x of excluded) {
    assert(
      Math.abs(f(x - 1e-6)) < 1e4 && Math.abs(f(x + 1e-6)) < 1e4,
      `no asymptote at ${x}`,
    );
  }
}

// One sentence per zero of the denominator, saying whether it gives an asymptote.
function asymptoteLines(spec) {
  return spec.bottom.map(([root, mult]) => {
    const top = multiplicityAt(spec.top, root);
    if (!top)
      return `The denominator is 0 at x = ${num(root)} and the numerator is not, so the graph has a vertical asymptote at x = ${num(root)}.`;
    if (mult > top)
      return `The factor ${factorText(root)} has multiplicity ${mult} in the denominator and ${top} in the numerator. The denominator's multiplicity is greater, so the graph has a vertical asymptote at x = ${num(root)}.`;
    return `The factor ${factorText(root)} has multiplicity ${top} in the numerator and ${mult} in the denominator. The numerator's multiplicity is not less, so there is no vertical asymptote at x = ${num(root)}.`;
  });
}

// Two sentences: the sign of r just right of the asymptote, then just left of it.
function sideLines(spec, root, name = "r") {
  const { left, right, excess } = oneSidedAt(spec, root);
  const power = `${factorText(root)}${excess > 1 ? sup(excess) : ""}`;
  const where = num(root);
  return [
    `For x slightly greater than ${where}, ${power} is a small positive number and the remaining factors of ${name}(x) are ${right > 0 ? "positive" : "negative"}, so ${name}(x) is large and ${right > 0 ? "positive" : "negative"}. So lim x→${where}⁺ ${name}(x) = ${direction(right)}.`,
    `For x slightly less than ${where}, ${power} is a small ${excess % 2 === 1 ? "negative" : "positive"} number and the remaining factors keep the same sign, so ${name}(x) is large and ${left > 0 ? "positive" : "negative"}. So lim x→${where}⁻ ${name}(x) = ${direction(left)}.`,
  ];
}

const bigNumber = (value) =>
  `${value < 0 ? "−" : ""}${Math.abs(value).toLocaleString("en-US")}`;

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "where-asymptotes",
    skill: "identify-information",
    make(r) {
      const [a, b, c, d] = distinct(r, 4);
      const shared = r.chance(0.5);
      const spec = {
        lead: r.pick([1, 1, -1, 2]),
        top: shared ? byRoot([c, a]) : byRoot([a, b]),
        bottom: byRoot([c, d]),
      };
      const asymptotes = verticalAsymptotes(spec);
      const text = factoredRational(spec);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [ask.equations("Vertical asymptote(s)", asymptotes.map(equation))],
        solution: [
          ...asymptoteLines(spec),
          `The vertical asymptote${asymptotes.length > 1 ? "s are" : " is"} ${andList(asymptotes.map(equation))}.`,
        ],
        data: {
          text,
          asymptotes,
          excluded: spec.bottom.map(([x]) => x).filter((x) => !asymptotes.includes(x)),
        },
      });
    },
    verify({ data: { text, asymptotes, excluded } }) {
      checkAsymptotes(text, asymptotes, excluded);
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "where-asymptotes",
    skill: "describe",
    make(r) {
      if (r.chance(0.45)) {
        const a = r.nonzero(-6, 6);
        const q = r.pick([1, 4, 9, 16, 2, 5]);
        const text = `(x ${signed(-a)})/(x² + ${q})`;
        return problem({
          stem: `The rational function r is given by r(x) = ${text}. How many vertical asymptotes does the graph of r have?`,
          parts: [ask.number("Number of vertical asymptotes", 0)],
          solution: [
            `A vertical asymptote needs a real zero of the denominator. For every real x, x² ≥ 0, so x² + ${q} ≥ ${q} and the denominator is never 0.`,
            "The graph of r has no vertical asymptotes.",
          ],
          data: { text, asymptotes: [], excluded: [] },
        });
      }
      const [a, b, c] = distinct(r, 3);
      const spec = { lead: 1, top: byRoot([a]), bottom: byRoot([b, c]) };
      const text = expandedRational(spec);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            "How many vertical asymptotes does the graph of r have?",
            ask.number("Number of vertical asymptotes", 2),
          ),
          part(
            "Write the equation of each vertical asymptote.",
            ask.equations("Vertical asymptotes", [equation(b), equation(c)]),
          ),
        ],
        solution: [
          `Factor the denominator: ${polyText([1, -(b + c), b * c])} = ${factorsText(spec.bottom)}. It is 0 at x = ${num(Math.min(b, c))} and x = ${num(Math.max(b, c))}.`,
          `The numerator is 0 only at x = ${num(a)}, which is not a zero of the denominator, so both zeros of the denominator give vertical asymptotes.`,
        ],
        data: { text, asymptotes: [b, c], excluded: [] },
      });
    },
    verify({ data: { text, asymptotes, excluded } }) {
      checkAsymptotes(text, asymptotes, excluded);
      if (!asymptotes.length) {
        const f = fnOf(text);
        for (let x = -20; x <= 20; x += 0.25)
          assert(Number.isFinite(f(x)), "r is defined everywhere");
      }
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "one-sided-limits",
    skill: "describe",
    make(r) {
      const c = r.nonzero(-6, 6);
      const p = r.nonzero(-4, 4);
      const q = r.nonzero(-9, 9);
      const atC = p * c + q;
      if (atC === 0) reject("the numerator is also 0 at c");
      const text = `(${polyText([p, q])})/${factorText(c)}`;
      const right = Math.sign(atC);
      const left = -right;
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            `Find lim x→${num(c)}⁻ r(x).`,
            ask.limit(`lim x→${num(c)}⁻ r(x) =`, direction(left)),
          ),
          part(
            `Find lim x→${num(c)}⁺ r(x).`,
            ask.limit(`lim x→${num(c)}⁺ r(x) =`, direction(right)),
          ),
        ],
        solution: [
          `At x = ${num(c)} the numerator equals ${num(atC)}, which is ${atC > 0 ? "positive" : "negative"}, and the denominator is 0. So x = ${num(c)} is a vertical asymptote.`,
          `For x slightly less than ${num(c)}, the denominator is a small negative number, so r(x) is ${left > 0 ? "positive" : "negative"} and lim x→${num(c)}⁻ r(x) = ${direction(left)}.`,
          `For x slightly greater than ${num(c)}, the denominator is a small positive number, so r(x) is ${right > 0 ? "positive" : "negative"} and lim x→${num(c)}⁺ r(x) = ${direction(right)}.`,
        ],
        data: { text, c, left, right },
      });
    },
    verify({ data: { text, c, left, right } }) {
      checkSides(text, c, left, right);
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "one-sided-limits",
    skill: "identify-information",
    make(r) {
      const c = r.nonzero(-4, 4);
      const n = r.pick([1, 2]);
      const p = r.pick([1, 2, -1, -2]);
      const d = r.int(-3, 3);
      const text = `${num(p)}/${factorText(c)}${n > 1 ? sup(n) : ""}${d ? ` ${signed(d)}` : ""}`;
      const right = Math.sign(p);
      const left = n % 2 === 1 ? -right : right;
      return problem({
        stem: "The graph of the rational function r is shown. The dashed lines are asymptotes of the graph.",
        blocks: [
          graph({
            caption: "The graph of y = r(x)",
            alt: `The graph of a rational function with a vertical asymptote at x = ${num(c)}. Left of the asymptote the graph ${left > 0 ? "rises without bound" : "falls without bound"}, and right of the asymptote it ${right > 0 ? "rises without bound" : "falls without bound"}. A horizontal asymptote is drawn at y = ${num(d)}.`,
            window: { x: [-8, 8], y: [-8, 8] },
            ticks: { x: 1, y: 1 },
            functions: [{ expr: text }],
            asymptotes: [{ x: c }, { y: d }],
          }),
        ],
        parts: [
          part(
            "Write the equation of the vertical asymptote.",
            ask.equations("Vertical asymptote", [equation(c)]),
          ),
          part(
            `Find lim x→${num(c)}⁻ r(x).`,
            ask.limit(`lim x→${num(c)}⁻ r(x) =`, direction(left)),
          ),
          part(
            `Find lim x→${num(c)}⁺ r(x).`,
            ask.limit(`lim x→${num(c)}⁺ r(x) =`, direction(right)),
          ),
        ],
        solution: [
          `The graph approaches the vertical dashed line at x = ${num(c)}, so that is the vertical asymptote.`,
          `As x approaches ${num(c)} from the left, the graph ${left > 0 ? "rises" : "falls"} without bound, so lim x→${num(c)}⁻ r(x) = ${direction(left)}.`,
          `As x approaches ${num(c)} from the right, the graph ${right > 0 ? "rises" : "falls"} without bound, so lim x→${num(c)}⁺ r(x) = ${direction(right)}.`,
        ],
        data: { text, c, left, right },
      });
    },
    verify({ data: { text, c, left, right } }) {
      checkSides(text, c, left, right);
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "where-asymptotes",
    skill: "solve",
    make(r) {
      const [a, b, c, d] = distinct(r, 4);
      const shared = r.chance(0.5);
      const spec = {
        lead: 1,
        top: shared ? byRoot([c, a]) : byRoot([a, b]),
        bottom: byRoot([c, d]),
      };
      const asymptotes = verticalAsymptotes(spec);
      const zeros = spec.top
        .map(([x]) => x)
        .filter((x) => !spec.bottom.some(([y]) => y === x) || asymptotes.includes(x));
      const text = expandedRational(spec);
      const realZeros = spec.top
        .map(([x]) => x)
        .filter((x) => multiplicityAt(spec.bottom, x) === 0);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            "Write the equation of each vertical asymptote.",
            ask.equations("Vertical asymptote(s)", asymptotes.map(equation)),
          ),
          part("Find all real zeros of r.", ask.set("x =", realZeros)),
        ],
        solution: [
          `Factor both polynomials: r(x) = ${factoredRational(spec)}.`,
          ...asymptoteLines(spec),
          `The real zeros of r are the zeros of the numerator that are in the domain: ${andList(realZeros.map(equation))}.`,
        ],
        data: {
          text,
          asymptotes,
          excluded: spec.bottom.map(([x]) => x).filter((x) => !asymptotes.includes(x)),
          zeros,
        },
      });
    },
    verify({ data: { text, asymptotes, excluded } }) {
      checkAsymptotes(text, asymptotes, excluded);
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "multiplicity-effect",
    skill: "support-conclusions",
    make(r) {
      const [a, b, c] = distinct(r, 3);
      const m = r.int(1, 3);
      const n = r.int(1, 3);
      const spec = {
        lead: r.pick([1, 1, -1]),
        top: byRoot([a, b], (x) => (x === a ? m : 1)),
        bottom: byRoot([a, c], (x) => (x === a ? n : 1)),
      };
      const asymptoteAtA = n > m;
      const asymptotes = verticalAsymptotes(spec);
      const text = factoredRational(spec);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            `Does the graph of r have a vertical asymptote at x = ${num(a)}?`,
            ask.choice(`At x = ${num(a)}`, ["Yes", "No"], asymptoteAtA ? "Yes" : "No"),
          ),
          part(
            "Write the equation of each vertical asymptote.",
            ask.equations("Vertical asymptote(s)", asymptotes.map(equation)),
          ),
        ],
        solution: [
          ...asymptoteLines(spec),
          `So the graph of r ${asymptoteAtA ? "has" : "does not have"} a vertical asymptote at x = ${num(a)}, and the vertical asymptote${asymptotes.length > 1 ? "s are" : " is"} ${andList(asymptotes.map(equation))}.`,
        ],
        data: {
          text,
          asymptotes,
          excluded: spec.bottom.map(([x]) => x).filter((x) => !asymptotes.includes(x)),
        },
      });
    },
    verify({ data: { text, asymptotes, excluded } }) {
      checkAsymptotes(text, asymptotes, excluded);
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "one-sided-limits",
    skill: "describe",
    make(r) {
      const [a, b, c] = distinct(r, 3);
      const n = r.int(1, 3);
      const spec = {
        lead: r.pick([1, -1, 2, -3]),
        top: r.chance(0.5) ? byRoot([a]) : byRoot([a, b]),
        bottom: [[c, n]],
      };
      const { left, right } = oneSidedAt(spec, c);
      const text = factoredRational(spec);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            `Find lim x→${num(c)}⁻ r(x).`,
            ask.limit(`lim x→${num(c)}⁻ r(x) =`, direction(left)),
          ),
          part(
            `Find lim x→${num(c)}⁺ r(x).`,
            ask.limit(`lim x→${num(c)}⁺ r(x) =`, direction(right)),
          ),
        ],
        solution: [
          `The numerator is not 0 at x = ${num(c)} and the denominator is 0 there, so x = ${num(c)} is a vertical asymptote.`,
          ...sideLines(spec, c),
        ],
        data: { text, c, left, right },
      });
    },
    verify({ data: { text, c, left, right } }) {
      checkSides(text, c, left, right);
    },
  },
  {
    id: "p08",
    tier: "quiz",
    unit: true,
    concept: "where-asymptotes",
    skill: "solve",
    make(r) {
      const [a, b, c] = distinct(r, 3);
      const k = -(b + c);
      const t = b * c;
      const text = `(x ${signed(-a)})/(${polyText([1, k, t])})`;
      const shown = `(x ${signed(-a)})/(x² + kx ${signed(t)})`;
      return problem({
        stem: `The graph of the rational function r(x) = ${shown} has a vertical asymptote at x = ${num(b)}, where k is a constant.`,
        parts: [
          part("Find the value of k.", ask.number("k =", k)),
          part(
            "Write the equation of the other vertical asymptote.",
            ask.equations("Other vertical asymptote", [equation(c)]),
          ),
        ],
        solution: [
          `A vertical asymptote at x = ${num(b)} means the denominator is 0 there. Substitute x = ${num(b)}: ${num(b * b)} ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}k ${signed(t)} = 0, so ${num(b * b + t)} ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}k = 0 and k = ${num(k)}.`,
          `With k = ${num(k)}, the denominator is ${polyText([1, k, t])} = ${factorsText(byRoot([b, c]))}. Its other zero is x = ${num(c)}.`,
          `The numerator is not 0 at x = ${num(c)}, so the other vertical asymptote is x = ${num(c)}.`,
        ],
        data: { text, asymptotes: [b, c], excluded: [] },
      });
    },
    verify({ data: { text, asymptotes, excluded } }) {
      checkAsymptotes(text, asymptotes, excluded);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "multiplicity-effect",
    skill: "support-conclusions",
    make(r) {
      const [a, c, d] = distinct(r, 3);
      const n = r.int(1, 4);
      const spec = {
        lead: r.pick([1, -1, 2, -2]),
        top: byRoot([a]),
        bottom: byRoot([c, d], (x) => (x === c ? n : 1)),
      };
      const { left, right } = oneSidedAt(spec, c);
      const text = factoredRational(spec);
      const both = left === right;
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            `Find lim x→${num(c)}⁻ r(x).`,
            ask.limit(`lim x→${num(c)}⁻ r(x) =`, direction(left)),
          ),
          part(
            `Find lim x→${num(c)}⁺ r(x).`,
            ask.limit(`lim x→${num(c)}⁺ r(x) =`, direction(right)),
          ),
          part(
            `Find lim x→${num(c)} r(x). If the limit does not exist, enter DNE.`,
            ask.limit(`lim x→${num(c)} r(x) =`, both ? direction(left) : "DNE"),
          ),
        ],
        solution: [
          `The numerator is not 0 at x = ${num(c)} and the denominator is, so x = ${num(c)} is a vertical asymptote. The factor ${factorText(c)} has multiplicity ${n}, which is ${n % 2 === 1 ? "odd" : "even"}.`,
          ...sideLines(spec, c),
          both
            ? `Both one-sided limits are ${direction(left)}, so lim x→${num(c)} r(x) = ${direction(left)}.`
            : "The one-sided limits are not equal, so the limit does not exist.",
        ],
        data: { text, c, left, right },
      });
    },
    verify({ data: { text, c, left, right } }) {
      checkSides(text, c, left, right);
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "one-sided-limits",
    skill: "identify-information",
    make(r) {
      const c = r.nonzero(-5, 5);
      const n = r.int(1, 3);
      const p = r.pick([1, 2, 3, -1, -2, -3]);
      const sides = [...[1, 2, 3].map((k) => [-1, k]), ...[3, 2, 1].map((k) => [1, k])];
      const body = sides.map(([sign, k]) => {
        const xValue = c + sign * 10 ** -k;
        // p / (x − c)^n with x − c = ±10^−k is exactly p·(±1)^n·10^(kn).
        const value = p * (sign < 0 && n % 2 === 1 ? -1 : 1) * 10 ** (k * n);
        return [fixed(xValue, k), bigNumber(value)];
      });
      const right = Math.sign(p);
      const left = n % 2 === 1 ? -right : right;
      const text = `${num(p)}/${factorText(c)}${n > 1 ? sup(n) : ""}`;
      return problem({
        stem: "The table gives values of a rational function r for x near a number c.",
        blocks: [table("Values of r(x) near x = " + num(c), ["x", "r(x)"], body)],
        parts: [
          part(
            "Write the equation of the vertical asymptote that the table suggests.",
            ask.equations("Vertical asymptote", [equation(c)]),
          ),
          part(
            `Find lim x→${num(c)}⁻ r(x).`,
            ask.limit(`lim x→${num(c)}⁻ r(x) =`, direction(left)),
          ),
          part(
            `Find lim x→${num(c)}⁺ r(x).`,
            ask.limit(`lim x→${num(c)}⁺ r(x) =`, direction(right)),
          ),
        ],
        solution: [
          `As x gets closer to ${num(c)}, the magnitude of r(x) grows without bound, so the graph has a vertical asymptote at x = ${num(c)}.`,
          `For x less than ${num(c)}, the values of r(x) are ${left > 0 ? "large and positive" : "large and negative"}, so lim x→${num(c)}⁻ r(x) = ${direction(left)}.`,
          `For x greater than ${num(c)}, the values of r(x) are ${right > 0 ? "large and positive" : "large and negative"}, so lim x→${num(c)}⁺ r(x) = ${direction(right)}.`,
        ],
        data: { text, c, left, right, body },
      });
    },
    verify({ data: { text, c, left, right, body } }) {
      checkSides(text, c, left, right);
      const f = fnOf(text);
      for (const [x, value] of body) {
        const shown = Number(String(x).replace("−", "-"));
        const exact = Number(String(value).replace("−", "-").replaceAll(",", ""));
        assert(
          Math.abs(f(shown) - exact) <= 1e-6 * Math.abs(exact),
          `table value at ${x}`,
        );
      }
    },
  },
];

// Typed-answer problems for Topic 2.9. Each template draws new numbers for every
// variant. verify() recomputes every logarithm with Math.log, so a slip in a key and
// a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  num,
  Q,
  sup,
  logText,
  lg,
  roundTo,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

// A whole number as a superscript with a real minus sign: 3⁴, 2⁻³.
const supInt = (n) => `${n < 0 ? "⁻" : ""}${sup(Math.abs(n))}`;
const asQ = (value) => (value instanceof Q ? value : new Q(value));
const qNum = (value) => asQ(value).value;
// An argument or value as text: 81, 1/27, −2/3.
const text = (value) => (value instanceof Q ? value.toString() : num(value));
// A power as text: 4³, 3⁻², 8^(2/3).
const powText = (base, exponent) => {
  const e = asQ(exponent);
  return e.isInteger ? `${base}${supInt(e.n)}` : `${base}^(${e})`;
};
// 5² = 25 is worth showing; 5¹ = 5 is not.
const rootResult = (root, q, value) =>
  q === 1 ? `${value}` : `${powText(root, q)} = ${value}`;
const grouped = (n) => n.toLocaleString("en-US");
const L = (base, argument) => logText(base, text(argument));
// A decimal such as 0.001 written without floating-point noise.
const decimal = (k) => `0.${"0".repeat(k - 1)}1`;

// Bases that are powers of a common root, so rational logarithms come out exactly.
const ROOTS = [
  { root: 2, powers: [2, 3, 4] },
  { root: 3, powers: [2, 3] },
  { root: 5, powers: [2, 3] },
];

function rootTriple(r, { improper = false } = {}) {
  const { root, powers } = r.pick(ROOTS);
  const p = r.pick(powers);
  const q = improper ? r.int(p + 1, p + 2) : r.int(1, p - 1);
  if (q % p === 0) reject("a whole number");
  return { root, p, q, base: root ** p, argument: root ** q, value: new Q(q, p) };
}

// An integer power that stays a readable size.
function wholePower(r, { low = 2, high = 4 } = {}) {
  const base = r.pick([2, 3, 4, 5, 6, 7]);
  const cap = base >= 5 ? Math.min(high, 3) : high;
  const n = r.int(low, cap);
  return { base, n, value: base ** n };
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "meaning",
    skill: "identify-information",
    make(r) {
      const [b1, b2] = r.distinct(2, 7, 2);
      const n1 = r.int(2, b1 >= 5 ? 3 : 4);
      const m = r.int(1, b2 >= 5 ? 2 : 3);
      const k = r.int(2, 4);
      const decimalArgument = r.chance();
      const c1 = b1 ** n1;
      const c2 = b2 ** m;
      const tenArgument = decimalArgument ? decimal(k) : grouped(10 ** k);
      const tenValue = decimalArgument ? -k : k;
      return problem({
        stem: "Evaluate each logarithmic expression.",
        parts: [
          part(`${L(b1, c1)}`, ask.number(`${L(b1, c1)} =`, n1)),
          part(`${L(b2, new Q(1, c2))}`, ask.number(`${L(b2, new Q(1, c2))} =`, -m)),
          part(`log(${tenArgument})`, ask.number(`log(${tenArgument}) =`, tenValue)),
        ],
        solution: [
          `${L(b1, c1)} is the exponent that ${b1} must be raised to in order to obtain ${c1}. Since ${powText(b1, n1)} = ${c1}, ${L(b1, c1)} = ${n1}.`,
          `Since ${powText(b2, -m)} = 1/${c2}, ${L(b2, new Q(1, c2))} = ${num(-m)}.`,
          `No base is written, so the base is 10. Since ${powText(10, tenValue)} = ${tenArgument}, log(${tenArgument}) = ${num(tenValue)}.`,
        ],
        data: { b1, n1, c1, b2, m, c2, tenValue },
      });
    },
    verify({ data: { b1, n1, c1, b2, m, c2, tenValue } }) {
      assertNear(lg(b1, c1), n1, "first logarithm");
      assertNear(lg(b2, 1 / c2), -m, "second logarithm");
      assertNear(lg(10, 10 ** tenValue), tenValue, "common logarithm");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "meaning",
    skill: "describe",
    make(r) {
      const { base, n, value } = wholePower(r);
      const statements = [
        `${L(base, value)} = ${n}`,
        `${L(n, value)} = ${base}`,
        `${L(value, base)} = ${n}`,
        `${L(base, n)} = ${value}`,
      ];
      // When the base equals the exponent, two of the swapped statements coincide.
      if (new Set(statements).size !== statements.length) reject("options repeat");
      const options = r.shuffle(statements);
      // log_b x = a, with a negative exponent now and then.
      const b2 = r.pick([2, 3, 4, 5]);
      const a2 = r.pick([-3, -2, 2, 3, 4]);
      const x2 = a2 > 0 ? new Q(b2 ** a2) : new Q(1, b2 ** -a2);
      // log_b c = a, find the base.
      const b3 = r.pick([2, 3, 4, 5, 6, 7].filter((v) => v !== b2));
      const a3 = r.int(2, b3 >= 5 ? 3 : 4);
      const c3 = b3 ** a3;
      return problem({
        stem: "Use the relationship between logarithmic and exponential forms.",
        parts: [
          part(
            `Which logarithmic statement is equivalent to ${powText(base, n)} = ${value}?`,
            ask.choice("Equivalent statement:", options, `${L(base, value)} = ${n}`),
          ),
          part(`Find x if ${logText(b2, "x")} = ${num(a2)}.`, ask.number("x =", x2)),
          part(
            `Find the base b if log_b ${c3} = ${a3}, where b > 0.`,
            ask.number("b =", b3),
          ),
        ],
        solution: [
          `The logarithm log_b c = a means that bᵃ = c. For ${powText(base, n)} = ${value}, the base is ${base}, the exponent is ${n}, and the result is ${value}, so ${L(base, value)} = ${n}.`,
          `${logText(b2, "x")} = ${num(a2)} means ${powText(b2, a2)} = x, so x = ${text(x2)}.`,
          `log_b ${c3} = ${a3} means bᵃ = ${c3} with exponent ${a3}, so b${sup(a3)} = ${c3}. Since ${powText(b3, a3)} = ${c3}, b = ${b3}.`,
        ],
        data: { base, n, value, b2, a2, x2, b3, a3, c3 },
      });
    },
    verify({ data: { base, n, value, b2, a2, x2, b3, a3, c3 } }) {
      assertNear(base ** n, value, "the exponential statement");
      assertNear(lg(b2, qNum(x2)), a2, "x");
      assertNear(b3 ** a3, c3, "the base");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "evaluating",
    skill: "solve",
    make(r) {
      const a = rootTriple(r);
      const b = rootTriple(r, { improper: true });
      const c = r.pick([2, 3, 4, 5]);
      const n = r.int(2, c >= 4 ? 3 : 4);
      return problem({
        stem: "Evaluate each logarithmic expression exactly. Enter fractions in lowest terms.",
        parts: [
          part(
            `${L(a.base, a.argument)}`,
            ask.number(`${L(a.base, a.argument)} =`, a.value),
          ),
          part(
            `${L(b.base, b.argument)}`,
            ask.number(`${L(b.base, b.argument)} =`, b.value),
          ),
          part(
            `${L(c, new Q(1, c ** n))}`,
            ask.number(`${L(c, new Q(1, c ** n))} =`, -n),
          ),
        ],
        solution: [
          `Write ${a.base} and ${a.argument} as powers of ${a.root}: ${a.base} = ${powText(a.root, a.p)} and ${a.argument} = ${powText(a.root, a.q)}. Then (${powText(a.root, a.p)})ᵃ = ${powText(a.root, a.q)}, so ${a.p}a = ${a.q} and ${L(a.base, a.argument)} = ${text(a.value)}.`,
          `Write ${b.base} and ${b.argument} as powers of ${b.root}: ${b.base} = ${powText(b.root, b.p)} and ${b.argument} = ${powText(b.root, b.q)}. Then ${b.p}a = ${b.q} and ${L(b.base, b.argument)} = ${text(b.value)}.`,
          `${powText(c, -n)} = 1/${c ** n}, so ${L(c, new Q(1, c ** n))} = ${num(-n)}.`,
        ],
        data: { a, b, c, n },
      });
    },
    verify({ data: { a, b, c, n } }) {
      assertNear(lg(a.base, a.argument), a.q / a.p, "first");
      assertNear(lg(b.base, b.argument), b.q / b.p, "second");
      assertNear(lg(c, 1 / c ** n), -n, "third");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "evaluating",
    skill: "identify-information",
    make(r) {
      const base = r.pick([2, 3, 5, 7]);
      const n = r.int(1, base >= 5 ? 2 : 3);
      const argument = r.int(base ** n + 1, base ** (n + 1) - 1);
      const b2 = r.pick([2, 3, 5, 6, 7, 10, 10]);
      const c2 = r.int(11, 400);
      const approx = roundTo(lg(b2, c2), 3);
      if (Math.abs(lg(b2, c2) - Math.round(lg(b2, c2))) < 0.01)
        reject("too close to an integer");
      const k = r.int(1, 3);
      const d = r.int(2, 9);
      const small = `${decimal(k).slice(0, -1)}${d}`;
      return problem({
        stem: "Some logarithms are not whole numbers. Use powers of the base and technology to describe them.",
        parts: [
          part(
            `${L(base, argument)} is between two consecutive integers. What is the lesser integer?`,
            ask.number("Lesser integer:", n),
          ),
          part(
            `Use technology to approximate ${L(b2, c2)}. Round your answer to three decimal places.`,
            ask.number(`${L(b2, c2)} ≈`, approx, { decimals: 3 }),
          ),
          part(
            `log(${small}) is between two consecutive integers. What is the lesser integer?`,
            ask.number("Lesser integer:", -k),
          ),
        ],
        solution: [
          `${powText(base, n)} = ${base ** n} and ${powText(base, n + 1)} = ${base ** (n + 1)}. Since ${base ** n} < ${argument} < ${base ** (n + 1)}, ${L(base, argument)} is between ${n} and ${n + 1}. The lesser integer is ${n}.`,
          `${L(b2, c2)} ≈ ${approx.toFixed(3)}.`,
          `${powText(10, -k)} = ${decimal(k)} and ${powText(10, -k + 1)} = ${k === 1 ? "1" : decimal(k - 1)}. Since ${decimal(k)} < ${small} < ${k === 1 ? "1" : decimal(k - 1)}, log(${small}) is between ${num(-k)} and ${num(-k + 1)}. The lesser integer is ${num(-k)}.`,
        ],
        data: { base, n, argument, b2, c2, approx, k, small },
      });
    },
    verify({ data: { base, n, argument, b2, c2, approx, k, small } }) {
      assert(Math.floor(lg(base, argument)) === n, "first bracket");
      assert(Math.abs(lg(b2, c2) - approx) < 0.0006, "the approximation");
      assert(Math.floor(lg(10, Number(small))) === -k, "third bracket");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "meaning",
    skill: "construct-representations",
    make(r) {
      const b = r.pick([2, 3, 4, 5]);
      const values = [0, 1, 2, 3, 4].map((x) => b ** x);
      const k = r.int(2, 4);
      const m = r.int(1, 3);
      const beyond = r.int(5, b >= 4 ? 5 : 6);
      return problem({
        stem: `The table gives values of the function f(x) = ${b}ˣ.`,
        blocks: [
          table(
            `Values of f(x) = ${b}ˣ`,
            ["x", "0", "1", "2", "3", "4"],
            [["f(x)", ...values.map(grouped)]],
          ),
        ],
        parts: [
          part(`Find ${L(b, values[k])}.`, ask.number(`${L(b, values[k])} =`, k)),
          part(
            `Find ${L(b, new Q(1, b ** m))}.`,
            ask.number(`${L(b, new Q(1, b ** m))} =`, -m),
          ),
          part(
            `For what value of x does f(x) = ${grouped(b ** beyond)}?`,
            ask.number("x =", beyond),
          ),
        ],
        solution: [
          `The table shows f(${k}) = ${grouped(values[k])}, which means ${powText(b, k)} = ${grouped(values[k])}. So ${L(b, values[k])} = ${k}.`,
          `${powText(b, -m)} = 1/${b ** m}, so ${L(b, new Q(1, b ** m))} = ${num(-m)}.`,
          `f(x) = ${grouped(b ** beyond)} means ${b}ˣ = ${grouped(b ** beyond)}. Each step in x multiplies the output by ${b}, and ${powText(b, beyond)} = ${grouped(b ** beyond)}, so x = ${beyond}. In logarithmic form, x = ${L(b, b ** beyond)}.`,
        ],
        data: { b, values, k, m, beyond },
      });
    },
    verify({ data: { b, values, k, m, beyond } }) {
      assertNear(lg(b, values[k]), k, "table logarithm");
      assertNear(lg(b, 1 / b ** m), -m, "reciprocal logarithm");
      assertNear(b ** beyond, b ** beyond, "beyond");
      assert(beyond > 4, "outside the table");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "evaluating",
    skill: "solve",
    make(r) {
      const a = rootTriple(r, { improper: r.chance() });
      const b = r.pick([2, 3, 4, 5, 6]);
      const n = r.int(2, b >= 5 ? 3 : 4);
      const c = r.pick([2, 3, 4, 5]);
      const e = r.int(2, c >= 4 ? 3 : 4);
      return problem({
        stem: "Solve each equation.",
        parts: [
          part(
            `${logText(a.base, "x")} = ${text(a.value)}`,
            ask.number("x =", a.argument),
          ),
          part(`log_b ${b ** n} = ${n}, where b > 0`, ask.number("b =", b)),
          part(`${logText(c, "x")} = ${num(-e)}`, ask.number("x =", new Q(1, c ** e))),
        ],
        solution: [
          `${logText(a.base, "x")} = ${text(a.value)} means ${powText(a.base, a.value)} = x. Write ${a.base} = ${powText(a.root, a.p)}, so x = (${powText(a.root, a.p)})^(${text(a.value)}) = ${rootResult(a.root, a.q, a.argument)}.`,
          `log_b ${b ** n} = ${n} means b${sup(n)} = ${b ** n}. Since ${powText(b, n)} = ${b ** n} and b > 0, b = ${b}.`,
          `${logText(c, "x")} = ${num(-e)} means x = ${powText(c, -e)} = 1/${c ** e}.`,
        ],
        data: { a, b, n, c, e },
      });
    },
    verify({ data: { a, b, n, c, e } }) {
      assertNear(lg(a.base, a.argument), a.q / a.p, "first equation");
      assertNear(b ** n, b ** n, "second equation");
      assertNear(lg(c, 1 / c ** e), -e, "third equation");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "evaluating",
    skill: "equivalent-forms",
    make(r) {
      const b1 = r.pick([2, 3, 4, 5, 6]);
      const v1 = r.int(2, b1 >= 5 ? 3 : 4);
      const b2 = r.pick([2, 3, 4, 5].filter((v) => v !== b1));
      const v2 = r.int(1, b2 >= 4 ? 2 : 3);
      const t = rootTriple(r, { improper: r.chance() });
      return problem({
        stem: "In each part, find the missing argument so that the equation is true.",
        parts: [
          part(`${num(v1)} = ${logText(b1, "?")}`, ask.number("? =", b1 ** v1)),
          part(
            `${num(-v2)} = ${logText(b2, "?")}`,
            ask.number("? =", new Q(1, b2 ** v2)),
          ),
          part(
            `${text(t.value)} = ${logText(t.base, "?")}`,
            ask.number("? =", t.argument),
          ),
        ],
        solution: [
          `${num(v1)} = ${logText(b1, "?")} means ${powText(b1, v1)} = ?, so ? = ${b1 ** v1}.`,
          `${num(-v2)} = ${logText(b2, "?")} means ${powText(b2, -v2)} = ?, so ? = 1/${b2 ** v2}.`,
          `${text(t.value)} = ${logText(t.base, "?")} means ${powText(t.base, t.value)} = ?. Write ${t.base} = ${powText(t.root, t.p)}, so ? = (${powText(t.root, t.p)})^(${text(t.value)}) = ${rootResult(t.root, t.q, t.argument)}.`,
        ],
        data: { b1, v1, b2, v2, t },
      });
    },
    verify({ data: { b1, v1, b2, v2, t } }) {
      assertNear(lg(b1, b1 ** v1), v1, "first");
      assertNear(lg(b2, 1 / b2 ** v2), -v2, "second");
      assertNear(lg(t.base, t.argument), t.q / t.p, "third");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "meaning",
    skill: "support-conclusions",
    make(r) {
      const masks = [
        [true, true, false],
        [true, false, true],
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ];
      const mask = r.pick(masks);
      const claims = mask.map((truth) => claimFor(r, truth));
      if (new Set(claims.map((c) => `${c.base}|${c.argument}`)).size !== claims.length)
        reject("repeated logarithm");
      return problem({
        stem: "Decide whether each statement is true or false.",
        parts: claims.map((c) =>
          part(
            `${c.statement}`,
            ask.choice("The statement is", ["true", "false"], c.truth ? "true" : "false"),
          ),
        ),
        solution: claims.map((c) => c.reason),
        data: { claims },
      });
    },
    verify({ data: { claims } }) {
      for (const c of claims) {
        const actual = Math.abs(lg(c.base, c.argument) - c.claimed) < 1e-9;
        assert(actual === c.truth, `claim "${c.statement}"`);
      }
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "log-scale",
    skill: "apply-results",
    make(r) {
      const context = r.pick(CONTEXTS);
      const b = context.base;
      const span = b === 10 ? r.int(2, 5) : r.int(3, 6);
      const low = r.int(1, 4);
      const high = low + span;
      const gain = b === 10 ? r.int(2, 4) : r.int(3, 6);
      const start = r.int(2, 5);
      const factor = b ** span;
      const target = b ** gain;
      return problem({
        stem: context.stem,
        parts: [
          part(
            `How many times as great is the ${context.quantity} at ${context.at} of ${high} as at ${context.at} of ${low}?`,
            ask.number("Factor:", factor),
          ),
          part(
            `The ${context.quantity} at reading B is ${grouped(target)} times the ${context.quantity} at reading A, which has ${context.at} of ${start}. What is the ${context.unit} of reading B?`,
            ask.number(
              `${context.unit[0].toUpperCase()}${context.unit.slice(1)}:`,
              start + gain,
            ),
          ),
          part(
            `Equal steps on this scale correspond to equal what?`,
            ask.choice(
              "Equal steps are equal",
              r.shuffle(["factors", "differences"]),
              "factors",
            ),
          ),
        ],
        solution: [
          `Each increase of 1 ${context.unit} multiplies the ${context.quantity} by ${b}. From ${low} to ${high} is ${span} steps, so the factor is ${powText(b, span)} = ${grouped(factor)}.`,
          `${grouped(target)} = ${powText(b, gain)}, so the reading is ${gain} steps above ${start}. Its ${context.unit} is ${start} + ${gain} = ${start + gain}.`,
          `Each step multiplies the ${context.quantity} by the same factor, ${b}. Equal steps on a logarithmic scale correspond to equal factors, not equal differences.`,
        ],
        data: { b, low, high, span, start, gain, factor, target },
      });
    },
    verify({ data: { b, span, factor, gain, target } }) {
      assertNear(b ** span, factor, "the factor");
      assertNear(lg(b, target), gain, "the number of steps");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "log-scale",
    skill: "construct-representations",
    make(r) {
      const b = r.pick([2, 3, 5, 10]);
      const far = b === 10 ? r.int(5, 7) : b === 2 ? r.int(7, 10) : r.int(5, 6);
      const m = r.int(1, b === 2 ? 3 : 2);
      const values = [0, 1, 2, 3, 4].map((x) => b ** x);
      return problem({
        stem: `A scale marks the positions 0, 1, 2, 3, and 4 at the values shown. Equal steps along the scale represent equal multiplicative changes.`,
        blocks: [
          table(
            "Values on a logarithmic scale",
            ["Position", "0", "1", "2", "3", "4"],
            [["Value represented", ...values.map(grouped)]],
          ),
        ],
        parts: [
          part(
            "By what factor does the value change for each step to the right?",
            ask.number("Factor:", b),
          ),
          part(
            `What value is represented at position ${far}?`,
            ask.number(`Value at ${far}:`, b ** far),
          ),
          part(`At what position is the value 1/${b ** m}?`, ask.number("Position:", -m)),
        ],
        solution: [
          `Each value is ${b} times the value before it (for example ${values[2]} ÷ ${values[1]} = ${b}), so the factor is ${b}.`,
          `Position ${far} represents ${powText(b, far)} = ${grouped(b ** far)}.`,
          `${powText(b, -m)} = 1/${b ** m}, so the value 1/${b ** m} is at position ${num(-m)}. Moving to the left divides the value by ${b} at each step.`,
        ],
        data: { b, far, m, values },
      });
    },
    verify({ data: { b, far, m, values } }) {
      for (let i = 1; i < values.length; i += 1)
        assertNear(values[i] / values[i - 1], b, "ratio");
      assertNear(lg(b, b ** far), far, "far position");
      assertNear(lg(b, 1 / b ** m), -m, "left position");
    },
  },
];

const CONTEXTS = [
  {
    stem: "On a certain magnitude scale, each increase of 1 unit in magnitude corresponds to seismic waves with 10 times the amplitude.",
    quantity: "amplitude",
    unit: "magnitude",
    at: "a magnitude",
    base: 10,
  },
  {
    stem: "On a certain loudness scale, each increase of 1 unit corresponds to 10 times the sound intensity.",
    quantity: "intensity",
    unit: "level",
    at: "a level",
    base: 10,
  },
  {
    stem: "A laboratory records the size of a bacteria culture on a scale on which each increase of 1 unit means the culture has doubled in size.",
    quantity: "culture size",
    unit: "level",
    at: "a level",
    base: 2,
  },
  {
    stem: "An insect infestation index is defined so that each increase of 1 unit means 3 times as many insects are present.",
    quantity: "number of insects",
    unit: "index",
    at: "an index",
    base: 3,
  },
];

// One true or false statement about a logarithm, with the reasoning for the key.
function claimFor(r, truth) {
  const kind = truth
    ? r.pick(["whole", "negative", "root"])
    : r.pick(["off", "quotient", "swapped", "inverted"]);
  let base;
  let argument;
  let argumentText;
  let trueValue;
  let claimed;
  let claimedText;
  let statementBase;
  let statementArgument;
  if (kind === "whole" || kind === "off" || kind === "quotient" || kind === "swapped") {
    const w = wholePower(r);
    base = w.base;
    argument = w.value;
    argumentText = text(argument);
    trueValue = new Q(w.n);
    statementBase = base;
    statementArgument = argument;
    claimed = w.n;
    if (kind === "off") claimed = w.n + r.pick([-1, 1]);
    if (kind === "quotient") claimed = w.value / w.base;
    if (kind === "swapped") {
      // log_c(b) = n reads the base and argument backwards.
      statementBase = w.value;
      statementArgument = w.base;
      claimed = w.n;
      trueValue = new Q(1, w.n);
      base = w.value;
      argument = w.base;
      argumentText = text(argument);
    }
    claimedText = num(claimed);
  } else if (kind === "negative") {
    const b = r.pick([2, 3, 4, 5]);
    const n = r.int(1, b >= 4 ? 3 : 4);
    base = b;
    argument = 1 / b ** n;
    argumentText = `1/${b ** n}`;
    trueValue = new Q(-n);
    statementBase = base;
    statementArgument = new Q(1, b ** n);
    claimed = -n;
    claimedText = num(claimed);
  } else {
    const t = rootTriple(r);
    base = t.base;
    argument = t.argument;
    argumentText = text(argument);
    trueValue = t.value;
    statementBase = base;
    statementArgument = argument;
    claimed = t.value.value;
    claimedText = text(t.value);
    if (kind === "inverted") {
      claimed = t.p / t.q;
      claimedText = text(new Q(t.p, t.q));
    }
  }
  if (Math.abs(claimed - trueValue.value) < 1e-9 === !truth)
    reject("claim does not match its kind");
  const statement = `${L(statementBase, statementArgument)} = ${claimedText}`;
  const reason = `${powText(base, trueValue)} = ${argumentText}, so ${L(statementBase, statementArgument)} = ${text(trueValue)}${truth ? ", and the statement is true" : `, not ${claimedText}, so the statement is false`}.`;
  return { statement, base, argument, claimed, truth, reason };
}

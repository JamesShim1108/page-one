// Typed-answer problems for Topic 1.6. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed expression or graph, so a
// slip in the key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  graph,
  factoredText,
  polyText,
  termsText,
  sup,
  ivl,
  num,
  fnOf,
  assert,
  assertNear,
  reject,
  niceCeil,
  infinity,
  lead,
} from "../../../../practice-kit/index.js";

const direction = (sign) => (sign > 0 ? "positive" : "negative");

// The limits of a polynomial with leading coefficient sign `lead` and degree `degree`.
const limits = (lead, degree) => ({
  right: Math.sign(lead),
  left: Math.sign(lead) * (degree % 2 === 0 ? 1 : -1),
});

// Why the limits are what they are, in words.
function reason(lead, degree) {
  const parity = degree % 2 === 0 ? "even" : "odd";
  const { right, left } = limits(lead, degree);
  return `The leading term determines end behavior. The degree ${degree} is ${parity} and the leading coefficient ${num(lead)} is ${direction(lead)}, so f(x) → ${infinity(right)} as x → ∞ and f(x) → ${infinity(left)} as x → −∞.`;
}

// A graph of a polynomial with distinct real zeros, shown without its formula.
function rootsPicture(r, count) {
  const roots = r.distinct(-4, 4, count).sort((a, b) => a - b);
  const s = r.pick([1, -1]);
  const text = factoredText(
    s,
    roots.map((root) => [root, 1]),
  );
  const f = fnOf(text);
  let top = 0;
  for (let x = roots[0] - 0.7; x <= roots[count - 1] + 0.7; x += 0.05)
    top = Math.max(top, Math.abs(f(x)));
  const Y = Math.max(5, niceCeil(top * 1.15));
  if (Math.abs(f(6)) < 1.3 * Y || Math.abs(f(-6)) < 1.3 * Y)
    reject("the ends stay inside the window");
  const shown = graph({
    caption: "The graph of the polynomial function f",
    alt: `The graph of a polynomial function with ${count} zeros, with both ends leaving the window.`,
    window: { x: [-6, 6], y: [-Y, Y] },
    ticks: { x: 1, y: Y / 5 },
    functions: [{ expr: text }],
  });
  return { roots, s, text, f, shown, degree: count };
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "unbounded-notation",
    skill: "identify-information",
    make(r) {
      const { s, degree, shown, text } = rootsPicture(r, r.int(3, 4));
      const { right, left } = limits(s, degree);
      return problem({
        stem: "The graph of the polynomial function f is shown. Both ends of the graph continue in the directions they are heading. Use limit notation to describe the end behavior of f.",
        blocks: [shown],
        parts: [
          ask.limit("lim x→−∞ f(x) =", infinity(left)),
          ask.limit("lim x→∞ f(x) =", infinity(right)),
        ],
        solution: [
          `On the left, the graph goes ${left > 0 ? "up" : "down"} without bound, so the output values ${left > 0 ? "increase" : "decrease"} without bound as x decreases without bound: lim x→−∞ f(x) = ${infinity(left)}.`,
          `On the right, the graph goes ${right > 0 ? "up" : "down"} without bound, so lim x→∞ f(x) = ${infinity(right)}.`,
        ],
        data: { text, left, right },
      });
    },
    verify({ data: { text, left, right } }) {
      const f = fnOf(text);
      assert(Math.sign(f(1e4)) === right, "right end");
      assert(Math.sign(f(-1e4)) === left, "left end");
    },
  },
  {
    id: "p02",
    tier: "quick",
    concept: "leading-term",
    skill: "identify-information",
    make(r) {
      const degree = r.int(3, 6);
      const powers = [degree, ...r.sample([...Array(degree).keys()], r.int(2, 3))];
      const coefficients = powers.map(() => r.nonzero(-9, 9));
      const order = r.shuffle(powers.map((_, i) => i));
      const symbol = (n) => (n === 0 ? "" : n === 1 ? "x" : `x${sup(n)}`);
      const text = termsText(order.map((i) => [coefficients[i], symbol(powers[i])]));
      const term = termsText([[coefficients[0], symbol(degree)]]);
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}. Write the leading term of f.`,
        parts: [
          ask.expr("Leading term", `(${coefficients[0]})*x^${degree}`, { text: term }),
        ],
        solution: [
          `The leading term is the term with the greatest power of x. The greatest power is ${degree}, so the leading term is ${term}.`,
        ],
        data: { text, degree, lead: coefficients[0], powers, coefficients },
      });
    },
    verify({ data: { degree, lead, powers, coefficients } }) {
      assert(Math.max(...powers) === degree && powers[0] === degree, "degree");
      assert(coefficients[0] === lead, "lead");
      assert(new Set(powers).size === powers.length, "distinct powers");
    },
  },
  {
    id: "p03",
    tier: "quick",
    unit: true,
    concept: "four-cases",
    skill: "solve",
    make(r) {
      const degree = r.int(2, 5);
      const coefficients = [r.nonzero(-6, 6)];
      for (let i = 0; i < degree; i += 1) coefficients.push(r.pick([0, r.int(-9, 9)]));
      if (coefficients.filter((c) => c !== 0).length < 2) reject("a single term");
      const text = polyText(coefficients);
      const { right, left } = limits(coefficients[0], degree);
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}. Use limit notation to describe the end behavior of f.`,
        parts: [
          ask.limit("lim x→−∞ f(x) =", infinity(left)),
          ask.limit("lim x→∞ f(x) =", infinity(right)),
        ],
        solution: [reason(coefficients[0], degree)],
        data: { text, coefficients, degree, left, right },
      });
    },
    verify({ data: { text, left, right } }) {
      const f = fnOf(text);
      assert(Math.sign(f(1e4)) === right, "right end");
      assert(Math.sign(f(-1e4)) === left, "left end");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "four-cases",
    skill: "describe",
    make(r) {
      const right = r.pick([1, -1]);
      const left = r.pick([1, -1]);
      const even = left === right;
      const name = r.pick(["f", "g", "h", "p"]);
      const words = r.chance();
      const toward = (sign) => (sign > 0 ? "increase" : "decrease");
      const given = words
        ? `As x increases without bound, the output values of ${name} ${toward(right)} without bound. As x decreases without bound, the output values of ${name} ${toward(left)} without bound.`
        : `lim x→∞ ${name}(x) = ${infinity(right)} and lim x→−∞ ${name}(x) = ${infinity(left)}.`;
      return problem({
        stem: `A polynomial function ${name} has this end behavior. ${given}`,
        parts: [
          part(
            `Is the degree of ${name} even or odd?`,
            ask.choice("The degree is", ["even", "odd"], even ? "even" : "odd"),
          ),
          part(
            `Is the leading coefficient of ${name} positive or negative?`,
            ask.choice(
              "The leading coefficient is",
              ["positive", "negative"],
              right > 0 ? "positive" : "negative",
            ),
          ),
        ],
        solution: [
          `The two ends go in ${even ? "the same direction" : "opposite directions"}, so the degree is ${even ? "even" : "odd"}.`,
          `As x → ∞ the outputs ${toward(right)} without bound, which happens when the leading coefficient is ${direction(right)}.`,
        ],
        data: { left, right },
      });
    },
    verify({ data: { left, right } }) {
      assert(Math.abs(left) === 1 && Math.abs(right) === 1, "signs");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    unit: true,
    concept: "four-cases",
    skill: "solve",
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
      const { right, left } = limits(a, degree);
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}. Use limit notation to describe the end behavior of f.`,
        parts: [
          ask.limit("lim x→−∞ f(x) =", infinity(left)),
          ask.limit("lim x→∞ f(x) =", infinity(right)),
        ],
        solution: [
          `Multiplying out the factors, the leading term is ${lead(a)}x${sup(degree)}, because the degree is the sum of the exponents, ${mults.join(" + ")} = ${degree}, and the leading coefficient is ${num(a)}.`,
          reason(a, degree),
        ],
        data: { text, a, degree, left, right },
      });
    },
    verify({ data: { text, left, right } }) {
      const f = fnOf(text);
      assert(Math.sign(f(1e4)) === right, "right end");
      assert(Math.sign(f(-1e4)) === left, "left end");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "leading-term",
    skill: "equivalent-forms",
    make(r) {
      const linear = r.int(2, 3);
      const factors = [];
      for (let i = 0; i < linear; i += 1)
        factors.push({
          lead: r.pick([1, 2, 3, -1, -2]),
          power: 1,
          rest: r.nonzero(-6, 6),
        });
      if (r.chance(0.6))
        factors.push({ lead: r.pick([1, 2, -1, -3]), power: 2, rest: r.nonzero(-5, 5) });
      const degree = factors.reduce((sum, f) => sum + f.power, 0);
      if (degree < 3) reject("too short");
      const coefficient = factors.reduce((product, f) => product * f.lead, 1);
      const factorText = (f) =>
        `(${polyText(f.power === 1 ? [f.lead, f.rest] : [f.lead, 0, f.rest])})`;
      const text = factors.map(factorText).join("");
      const term = termsText([[coefficient, degree === 1 ? "x" : `x${sup(degree)}`]]);
      const { right, left } = limits(coefficient, degree);
      return problem({
        stem: `The polynomial function g is given by g(x) = ${text}.`,
        parts: [
          part(
            "Write the leading term of g when the product is multiplied out.",
            ask.expr("Leading term", `(${coefficient})*x^${degree}`, { text: term }),
          ),
          part("Find lim x→∞ g(x).", ask.limit("lim x→∞ g(x) =", infinity(right))),
          part("Find lim x→−∞ g(x).", ask.limit("lim x→−∞ g(x) =", infinity(left))),
        ],
        solution: [
          `The leading term of the product is the product of the leading terms of the factors: ${factors.map((f) => `(${termsText([[f.lead, f.power === 1 ? "x" : "x²"]])})`).join("")} = ${term}.`,
          `The degree ${degree} is ${degree % 2 === 0 ? "even" : "odd"} and the leading coefficient ${num(coefficient)} is ${direction(coefficient)}, so g(x) → ${infinity(right)} as x → ∞.`,
          `As x → −∞, g(x) → ${infinity(left)}.`,
        ],
        data: { text, coefficient, degree, left, right },
      });
    },
    verify({ data: { text, coefficient, degree, left, right } }) {
      const g = fnOf(text);
      assertNear(g(1e5) / 1e5 ** degree, coefficient, "leading coefficient", 1e-3);
      assert(Math.sign(g(1e4)) === right && Math.sign(g(-1e4)) === left, "limits");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    concept: "four-cases",
    skill: "construct-functions",
    make(r) {
      const roots = r.distinctNonzero(-4, 4, 3).sort((x, y) => x - y);
      const k = r.pick([1, 2, 3, -1, -2, -3]);
      const y0 = -k * roots[0] * roots[1] * roots[2];
      const text = factoredText(
        k,
        roots.map((root) => [root, 1]),
      );
      const end = k > 0 ? "−∞" : "∞";
      return problem({
        stem: `A polynomial function p has the least possible degree. Its zeros are x = ${roots.map(num).join(", x = ")}, each with multiplicity 1. Also, p(0) = ${num(y0)} and lim x→−∞ p(x) = ${end}. Write an expression for p(x).`,
        parts: [ask.expr("p(x) =", text)],
        solution: [
          `Three zeros of multiplicity 1 give three linear factors, so p(x) = a${roots.map((root) => `(x ${root < 0 ? "+" : "−"} ${Math.abs(root)})`).join("")} and the degree is 3.`,
          `Use p(0) = ${num(y0)}: a(${num(-roots[0])})(${num(-roots[1])})(${num(-roots[2])}) = ${num(y0)}, so a = ${num(k)}.`,
          `Check the end behavior: the degree is odd and the leading coefficient ${num(k)} is ${direction(k)}, so p(x) → ${end} as x → −∞. This matches the given information. p(x) = ${text}.`,
        ],
        data: { text, roots, k, y0 },
      });
    },
    verify({ data: { text, roots, k, y0 } }) {
      const p = fnOf(text);
      assertNear(p(0), y0, "p(0)");
      roots.forEach((root) => assertNear(p(root), 0, "zero"));
      assert(Math.sign(p(-1e4)) === (k > 0 ? -1 : 1), "left end matches the statement");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    unit: true,
    concept: "four-cases",
    skill: "solve",
    make(r) {
      const degree = r.pick([2, 3, 4, 5]);
      const m = r.pick([1, 2, 3, -1, -2]);
      const k0 = r.int(-4, 5);
      const t = m * k0;
      const tail = r.nonzero(-9, 9);
      const slope = `${m === 1 ? "" : m === -1 ? "−" : num(m)}k`;
      const coefficientText =
        t === 0 ? slope : `(${slope} ${t < 0 ? "+" : "−"} ${Math.abs(t)})`;
      const want = r.pick([1, -1]);
      const atLeft = degree % 2 === 1 && r.chance();
      const limit = atLeft ? "x→−∞" : "x→∞";
      // The sign the leading coefficient needs: at the left end of an odd-degree function it flips.
      const needLead = atLeft ? -want : want;
      const positiveForLarge = m > 0;
      const key =
        needLead > 0 === positiveForLarge ? ivl(k0, Infinity) : ivl(-Infinity, k0);
      return problem({
        stem: `The polynomial function f is given by f(x) = ${coefficientText}x${sup(degree)} ${tail < 0 ? "−" : "+"} ${Math.abs(tail)}, where k is a constant. For which values of k is lim ${limit} f(x) = ${infinity(want)}? Write your answer in interval notation.`,
        parts: [ask.interval("k", key)],
        solution: [
          `If the coefficient of x${sup(degree)} is not 0, the leading term is ${coefficientText}x${sup(degree)}, and it decides the end behavior. If it is 0, f is the constant ${num(tail)}, which does not go to ${infinity(want)}.`,
          `With degree ${degree}, ${atLeft ? `lim x→−∞ f(x) = ${infinity(want)} requires the leading coefficient to be ${direction(needLead)}, because the ends of an odd-degree polynomial go in opposite directions` : `lim x→∞ f(x) = ${infinity(want)} requires the leading coefficient to be ${direction(needLead)}`}.`,
          `The coefficient ${coefficientText} is ${direction(needLead)} when ${key.startsWith("(−∞") ? `k < ${num(k0)}` : `k > ${num(k0)}`}. The answer is ${key}.`,
        ],
        data: { degree, m, k0, tail, want, atLeft, key },
      });
    },
    verify({ data: { degree, m, k0, tail, want, atLeft, key } }) {
      const x = atLeft ? -1e3 : 1e3;
      const holds = (k) => {
        const y = m * (k - k0) * x ** degree + tail;
        return Math.sign(y) === want && Math.abs(y) > 1e5;
      };
      const inKey = (k) => (key.startsWith("(−∞") ? k < k0 : k > k0);
      for (const k of [k0 - 3, k0 - 0.5, k0, k0 + 0.5, k0 + 3])
        assert(holds(k) === inKey(k), `k = ${k}`);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "unbounded-notation",
    skill: "describe",
    make(r) {
      const right = r.pick([1, -1]);
      const left = r.pick([1, -1]);
      const k = r.nonzero(-9, 9);
      const transforms = [
        {
          text: "−f(x)",
          atRight: () => -right,
          atLeft: () => -left,
          apply: (f, x) => -f(x),
        },
        {
          text: "f(−x)",
          atRight: () => left,
          atLeft: () => right,
          apply: (f, x) => f(-x),
        },
        {
          text: "−f(−x)",
          atRight: () => -left,
          atLeft: () => -right,
          apply: (f, x) => -f(-x),
        },
        {
          text: `2f(x) ${k < 0 ? "−" : "+"} ${Math.abs(k)}`,
          atRight: () => right,
          atLeft: () => left,
          apply: (f, x) => 2 * f(x) + k,
        },
        {
          text: "f(x − 3)",
          atRight: () => right,
          atLeft: () => left,
          apply: (f, x) => f(x - 3),
        },
      ];
      const [g, h] = r.sample(transforms, 2);
      return problem({
        stem: `A polynomial function f satisfies lim x→∞ f(x) = ${infinity(right)} and lim x→−∞ f(x) = ${infinity(left)}. Let g(x) = ${g.text} and h(x) = ${h.text}.`,
        parts: [
          part(
            "Find the end behavior of g.",
            ask.limit("lim x→∞ g(x) =", infinity(g.atRight())),
            ask.limit("lim x→−∞ g(x) =", infinity(g.atLeft())),
          ),
          part(
            "Find the end behavior of h.",
            ask.limit("lim x→∞ h(x) =", infinity(h.atRight())),
            ask.limit("lim x→−∞ h(x) =", infinity(h.atLeft())),
          ),
        ],
        solution: [
          `For g(x) = ${g.text}: ${explain(g.text, left, right)}`,
          `For h(x) = ${h.text}: ${explain(h.text, left, right)}`,
        ],
        data: { right, left, g, h },
      });
    },
    verify({ data: { right, left, g, h } }) {
      // A sample polynomial with the stated end behavior.
      const base = (x) => (right === left ? right * x ** 4 : right * x ** 3);
      assert(
        Math.sign(base(1e4)) === right && Math.sign(base(-1e4)) === left,
        "sample base",
      );
      for (const t of [g, h]) {
        const sample = (x) => t.apply(base, x);
        assert(Math.sign(sample(1e4)) === t.atRight(), `${t.text} at the right end`);
        assert(Math.sign(sample(-1e4)) === t.atLeft(), `${t.text} at the left end`);
      }
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "four-cases",
    skill: "identify-information",
    make(r) {
      const count = r.int(3, 5);
      const { s, shown, text, degree } = rootsPicture(r, count);
      const { right } = limits(s, degree);
      return problem({
        stem: "The graph of the polynomial function f is shown. The graph shows every real zero of f, and the ends of the graph continue in the directions they are heading. The polynomial has the least possible degree.",
        blocks: [shown],
        parts: [
          part("What is the degree of f?", ask.number("Degree", degree)),
          part(
            "Is the leading coefficient of f positive or negative?",
            ask.choice(
              "The leading coefficient is",
              ["positive", "negative"],
              s > 0 ? "positive" : "negative",
            ),
          ),
          part("Find lim x→∞ f(x).", ask.limit("lim x→∞ f(x) =", infinity(right))),
        ],
        solution: [
          `The graph crosses the x-axis ${degree} times and turns around ${degree - 1} times, so the least possible degree is ${degree}.`,
          `As x → ∞ the graph goes ${right > 0 ? "up" : "down"}, so lim x→∞ f(x) = ${infinity(right)}. With degree ${degree} (${degree % 2 === 0 ? "even" : "odd"}), the leading coefficient is ${direction(s)}.`,
        ],
        data: { text, degree, s, right },
      });
    },
    verify({ data: { text, degree, s, right } }) {
      const f = fnOf(text);
      assert(Math.sign(f(1e4)) === right, "right end");
      assert(Math.sign(f(1e4)) === s, "sign");
      assertNear(f(1e4) / 1e4 ** degree, s, "degree", 1e-2);
    },
  },
];

// Words for how a transformation changes the end behavior of f.
function explain(text, left, right) {
  if (text === "−f(x)")
    return `reflecting in the x-axis flips the outputs, so the end behavior reverses: lim x→∞ = ${infinity(-right)} and lim x→−∞ = ${infinity(-left)}.`;
  if (text === "f(−x)")
    return `replacing x with −x swaps the two ends: as x → ∞, −x → −∞, so lim x→∞ = ${infinity(left)} and lim x→−∞ = ${infinity(right)}.`;
  if (text === "−f(−x)")
    return `swapping the ends and flipping the outputs gives lim x→∞ = ${infinity(-left)} and lim x→−∞ = ${infinity(-right)}.`;
  return `multiplying by a positive number, adding a constant, or shifting horizontally does not change which way the ends go: lim x→∞ = ${infinity(right)} and lim x→−∞ = ${infinity(left)}.`;
}

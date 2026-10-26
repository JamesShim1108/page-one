// Typed-answer problems for Topic 1.7. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed expression or graph, so a
// slip in the key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  graph,
  table,
  polyText,
  ratio,
  fixed,
  addRatio,
  num,
  Q,
  Poly,
  fnOf,
  assert,
  assertNear,
  reject,
  infinity,
} from "../../../../practice-kit/index.js";

// ---------- Building rational functions ----------

// A polynomial of the given degree as coefficients from the highest power down.
function randomCoefficients(r, degree, leadRange = [-5, 5]) {
  const list = [r.nonzero(...leadRange)];
  for (let i = 0; i < degree; i += 1) list.push(r.pick([0, r.int(-8, 8)]));
  return list;
}

// A product of linear factors (px + q), written factored.
function randomFactors(r, count) {
  const factors = [];
  for (let i = 0; i < count; i += 1)
    factors.push([r.pick([1, 1, 2, 3, -1, -2]), r.nonzero(-6, 6)]);
  const coefficient = factors.reduce((product, [p]) => product * p, 1);
  const text = factors.map(([p, q]) => `(${polyText([p, q])})`).join("");
  return { text, lead: coefficient, degree: count };
}

// A rational function with the stated degrees, written expanded or factored.
function rational(r, n, d) {
  const factored = n + d <= 5 && r.chance(0.4);
  if (factored) {
    const top = randomFactors(r, n);
    const bottom = randomFactors(r, d);
    return {
      text: ratio(top.text, bottom.text),
      numLead: top.lead,
      denLead: bottom.lead,
      factored,
    };
  }
  const top = randomCoefficients(r, n);
  const bottom = randomCoefficients(r, d);
  return {
    text: ratio(polyText(top), polyText(bottom)),
    numLead: top[0],
    denLead: bottom[0],
    factored,
  };
}

// The two end limits of a rational function: numbers (as Q) or ±1 for ±∞.
function endLimits(n, d, numLead, denLead) {
  const ratioQ = new Q(numLead, denLead);
  const sign = Math.sign(numLead) * Math.sign(denLead);
  if (n < d) return { right: new Q(0), left: new Q(0), kind: "zero" };
  if (n === d) return { right: ratioQ, left: ratioQ, kind: "ratio" };
  return {
    right: sign,
    left: (n - d) % 2 === 0 ? sign : -sign,
    kind: "infinite",
  };
}

const limitKey = (value) => (value instanceof Q ? value : infinity(value));
const limitText = (value) => (value instanceof Q ? String(value) : infinity(value));

// Checks a rational function's end behavior numerically.
function checkEnds(text, right, left) {
  const f = fnOf(text);
  for (const [x, expected] of [
    [1e6, right],
    [-1e6, left],
  ]) {
    const y = f(x);
    if (expected instanceof Q) assertNear(y, expected.value, "end limit", 1e-3);
    else
      assert(Math.sign(y) === expected && Math.abs(y) > 1e3, "end behavior is unbounded");
  }
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "compare-degrees",
    skill: "describe",
    make(r) {
      const d = r.int(2, 4);
      const n = r.int(1, d - 1);
      const { text, numLead, denLead } = rational(r, n, d);
      const ends = endLimits(n, d, numLead, denLead);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part("Find lim x→∞ r(x).", ask.limit("lim x→∞ r(x) =", 0)),
          part(
            "Write the equation of the horizontal asymptote of the graph of r.",
            ask.equations("Horizontal asymptote", ["y = 0"]),
          ),
        ],
        solution: [
          `The degree of the numerator is ${n} and the degree of the denominator is ${d}. The denominator has the greater degree, so it grows faster and the quotient approaches 0.`,
          "So lim x→∞ r(x) = 0, and the graph has the horizontal asymptote y = 0.",
        ],
        data: { text, ends },
      });
    },
    verify({ data: { text, ends } }) {
      checkEnds(text, ends.right, ends.left);
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "horizontal-asymptotes",
    skill: "identify-information",
    make(r) {
      const n = r.int(1, 3);
      const { text, numLead, denLead } = rational(r, n, n);
      const value = new Q(numLead, denLead);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}. Write the equation of the horizontal asymptote of the graph of r.`,
        parts: [ask.equations("Horizontal asymptote", [`y = ${value}`])],
        solution: [
          `The numerator and the denominator both have degree ${n}, so the horizontal asymptote is the ratio of the leading coefficients: ${num(numLead)}/${num(denLead)}.`,
          `The horizontal asymptote is y = ${value}.`,
        ],
        data: { text, value },
      });
    },
    verify({ data: { text, value } }) {
      checkEnds(text, value, value);
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "rational-quotient",
    skill: "identify-information",
    make(r) {
      const n = r.int(1, 4);
      const d = r.int(1, 4);
      const top = randomFactors(r, n);
      const bottom = randomFactors(r, d);
      const relation = n < d ? "less than" : n === d ? "equal to" : "greater than";
      return problem({
        stem: `The rational function r is given by r(x) = ${ratio(top.text, bottom.text)}.`,
        parts: [
          part(
            "What is the degree of the numerator?",
            ask.number("Degree of numerator", n),
          ),
          part(
            "What is the degree of the denominator?",
            ask.number("Degree of denominator", d),
          ),
          part(
            "The degree of the numerator is",
            ask.choice(
              "The numerator's degree is",
              ["less than", "equal to", "greater than"],
              relation,
            ),
          ),
        ],
        solution: [
          `The numerator is a product of ${n} linear ${n === 1 ? "factor" : "factors"}, so its degree is ${n}.`,
          `The denominator is a product of ${d} linear ${d === 1 ? "factor" : "factors"}, so its degree is ${d}.`,
          `The degree of the numerator, ${n}, is ${relation} the degree of the denominator, ${d}.`,
        ],
        data: { n, d },
      });
    },
    verify({ data: { n, d } }) {
      assert(n >= 1 && d >= 1, "degrees");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "slant-asymptotes",
    skill: "equivalent-forms",
    make(r) {
      const a = r.pick([1, 2, 3, -1, -2]);
      const b = r.int(-6, 6);
      const c = r.int(-8, 8);
      const k = r.nonzero(-5, 5);
      const quotient = new Poly([a * k + b, a]);
      const division = new Poly([c, b, a]).divmod(new Poly([-k, 1]));
      const remainder = division.remainder.at(0);
      if (remainder.isZero) reject("divides evenly");
      const text = ratio(polyText([a, b, c]), polyText([1, -k]));
      const key = `y = ${polyText([a, a * k + b])}`;
      return problem({
        stem: `The rational function r is given by r(x) = ${text}. Write the equation of the slant asymptote of the graph of r.`,
        parts: [ask.equations("Slant asymptote", [key])],
        solution: [
          `The degree of the numerator is one more than the degree of the denominator, so the graph has a slant asymptote. Divide ${polyText([a, b, c])} by ${polyText([1, -k])}.`,
          `The quotient is ${quotient.text()} with remainder ${remainder}. So r(x) = ${addRatio(quotient.text(), remainder, polyText([1, -k]))}, and the remainder term approaches 0 as x → ∞ and x → −∞.`,
          `The slant asymptote is ${key}.`,
        ],
        data: { text, a, b, k, key },
      });
    },
    verify({ data: { text, a, b, k } }) {
      const f = fnOf(text);
      const m = a;
      const intercept = a * k + b;
      for (const x of [1e5, -1e5])
        assertNear(
          f(x) - (m * x + intercept),
          0,
          "distance from the slant asymptote",
          1e-3,
        );
    },
  },
  {
    id: "p05",
    tier: "quiz",
    unit: true,
    concept: "compare-degrees",
    skill: "solve",
    make(r) {
      const [n, d] = r.pick([
        [1, 2],
        [2, 2],
        [2, 3],
        [3, 3],
        [1, 1],
        [3, 2],
        [2, 1],
        [4, 2],
        [3, 4],
        [4, 4],
      ]);
      const { text, numLead, denLead } = rational(r, n, d);
      const ends = endLimits(n, d, numLead, denLead);
      const reasonText =
        ends.kind === "zero"
          ? `The degree of the denominator, ${d}, is greater than the degree of the numerator, ${n}, so r(x) approaches 0 at both ends.`
          : ends.kind === "ratio"
            ? `The degrees are equal, so r(x) approaches the ratio of the leading coefficients, ${num(numLead)}/${num(denLead)} = ${ends.right}, at both ends.`
            : `The degree of the numerator, ${n}, is greater than the degree of the denominator, ${d}, so the outputs are unbounded. The leading terms behave like ${new Q(numLead, denLead)}x${n - d === 1 ? "" : `^${n - d}`}, which goes to ${infinity(ends.right)} as x → ∞ and ${infinity(ends.left)} as x → −∞.`;
      return problem({
        stem: `The rational function r is given by r(x) = ${text}. Use limit notation to describe the end behavior of r.`,
        parts: [
          ask.limit("lim x→∞ r(x) =", limitKey(ends.right)),
          ask.limit("lim x→−∞ r(x) =", limitKey(ends.left)),
        ],
        solution: [
          reasonText,
          `lim x→∞ r(x) = ${limitText(ends.right)} and lim x→−∞ r(x) = ${limitText(ends.left)}.`,
        ],
        data: { text, ends },
      });
    },
    verify({ data: { text, ends } }) {
      checkEnds(text, ends.right, ends.left);
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "slant-asymptotes",
    skill: "solve",
    make(r) {
      const a = r.pick([1, 2, 3, -1, -2]);
      const top = [a, r.int(-6, 6), r.int(-6, 6), r.int(-9, 9)];
      const bottom = [1, r.int(-4, 4), r.int(-6, 6)];
      const division = new Poly([...top].reverse()).divmod(
        new Poly([...bottom].reverse()),
      );
      const quotient = division.quotient;
      if (division.remainder.isZero) reject("divides evenly");
      const m = quotient.c[1].value;
      const b = quotient.c[0].value;
      const text = ratio(polyText(top), polyText(bottom));
      const key = `y = ${polyText([m, b])}`;
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            "Write the equation of the slant asymptote of the graph of r.",
            ask.equations("Slant asymptote", [key]),
          ),
          part("Find lim x→∞ r(x).", ask.limit("lim x→∞ r(x) =", infinity(Math.sign(m)))),
          part(
            "Find lim x→−∞ r(x).",
            ask.limit("lim x→−∞ r(x) =", infinity(-Math.sign(m))),
          ),
        ],
        solution: [
          `The numerator has degree 3 and the denominator has degree 2, so the graph has a slant asymptote. Divide ${polyText(top)} by ${polyText(bottom)}: the quotient is ${polyText([m, b])}.`,
          `The slant asymptote is ${key}.`,
          `Far from the origin the graph follows the line, which has slope ${num(m)}. So r(x) → ${infinity(Math.sign(m))} as x → ∞ and r(x) → ${infinity(-Math.sign(m))} as x → −∞.`,
        ],
        data: { text, m, b },
      });
    },
    verify({ data: { text, m, b } }) {
      const f = fnOf(text);
      for (const x of [1e5, -1e5])
        assertNear(f(x) - (m * x + b), 0, "distance from the line", 1e-2);
      assert(m !== 0, "a real slant");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    concept: "horizontal-asymptotes",
    skill: "apply-results",
    make(r) {
      const family = r.pick(["solution", "cost"]);
      if (family === "solution") {
        const a = r.int(2, 9);
        const c = r.int(1, 6);
        const b = r.int(1, 20);
        if (a * c === b) reject("constant function");
        const initial = new Q(b, c);
        const increases = a * c > b;
        return problem({
          stem: `A tank is filled with a salt solution. The concentration S(t), in grams per liter, of the solution t minutes after fresh solution begins to flow in is given by S(t) = (${polyText([a, b], "t")})/(${polyText([1, c], "t")}).`,
          parts: [
            part(
              "Find S(0), the concentration when the fresh solution starts to flow in.",
              ask.number("S(0) =", initial, { unit: "grams per liter" }),
            ),
            part(
              "Find lim t→∞ S(t), the concentration the solution approaches in the long run.",
              ask.number("lim t→∞ S(t) =", a, { unit: "grams per liter" }),
            ),
            part(
              "As time passes, does the concentration increase or decrease toward this long-run value?",
              ask.choice(
                "The concentration",
                ["increases", "decreases"],
                increases ? "increases" : "decreases",
              ),
            ),
          ],
          solution: [
            `S(0) = ${b}/${c} = ${initial} grams per liter.`,
            `The numerator and the denominator both have degree 1, so S(t) approaches the ratio of the leading coefficients, ${a}/1 = ${a}. The long-run concentration is ${a} grams per liter.`,
            `The starting concentration ${initial} is ${increases ? "less" : "greater"} than the long-run value ${a}, and S is monotonic, so the concentration ${increases ? "increases" : "decreases"} toward ${a}.`,
          ],
          data: { fn: `(${a}t + ${b})/(t + ${c})`, a, initial, increases },
        });
      }
      const price = r.int(3, 20);
      const fixedCost = r.int(2, 9) * 100;
      const items = r.pick([50, 100, 200, 250]);
      const atItems = new Q(price * items + fixedCost, items);
      return problem({
        stem: `A company's average cost A(x), in dollars per item, of making x items in one day is given by A(x) = (${polyText([price, fixedCost], "x")})/x.`,
        parts: [
          part(
            `Find A(${items}), the average cost per item when ${items} items are made.`,
            ask.number(`A(${items}) =`, atItems, { unit: "dollars per item" }),
          ),
          part(
            "Find lim x→∞ A(x), the value the average cost approaches as production increases.",
            ask.number("lim x→∞ A(x) =", price, { unit: "dollars per item" }),
          ),
          part(
            "As more items are made, does the average cost increase or decrease toward this value?",
            ask.choice("The average cost", ["increases", "decreases"], "decreases"),
          ),
        ],
        solution: [
          `A(${items}) = (${price}(${items}) + ${fixedCost})/${items} = ${atItems} dollars per item.`,
          `The numerator and the denominator both have degree 1, so A(x) approaches the ratio of the leading coefficients, ${price}/1 = ${price}.`,
          `Rewrite A(x) = ${price} + ${fixedCost}/x. The term ${fixedCost}/x decreases toward 0 as x grows, so the average cost decreases toward ${price} dollars per item.`,
        ],
        data: {
          fn: `(${price}x + ${fixedCost})/x`,
          a: price,
          initial: atItems,
          increases: false,
          items,
        },
      });
    },
    verify({ data: { fn, a, initial, increases, items } }) {
      const f = fnOf(fn, fn.includes("t") ? "t" : "x");
      assertNear(f(1e7), a, "long-run value", 1e-4);
      if (items) assertNear(f(items), initial.value, "value at the chosen input");
      else assertNear(f(0), initial.value, "initial value");
      const first = f(items ? items : 1);
      const later = f(items ? items * 10 : 10);
      assert(later > first === increases, "monotonic direction");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "horizontal-asymptotes",
    skill: "identify-information",
    make(r) {
      const a = r.nonzero(-3, 3);
      const c = r.int(-4, 4);
      const extra = r.nonzero(-6, 6);
      // r(x) = a + extra/(x − c) = (ax + (extra − ac))/(x − c)
      const b = extra - a * c;
      const text = ratio(polyText([a, b]), polyText([1, -c]));
      const f = fnOf(text);
      if (!Number.isFinite(f(-8)) || !Number.isFinite(f(8))) reject("not drawable");
      return problem({
        stem: "The graph of the rational function r is shown with its asymptotes drawn as dashed lines.",
        blocks: [
          graph({
            caption: "The graph of y = r(x) and its asymptotes",
            alt: `The graph of a rational function with a vertical asymptote at x = ${num(c)} and a horizontal asymptote at y = ${num(a)}.`,
            window: { x: [-8, 8], y: [-8, 8] },
            ticks: { x: 1, y: 1 },
            functions: [{ expr: text }],
            asymptotes: [{ x: c }, { y: a }],
          }),
        ],
        parts: [
          part(
            "Write the equation of the vertical asymptote.",
            ask.equations("Vertical asymptote", [`x = ${num(c)}`]),
          ),
          part(
            "Write the equation of the horizontal asymptote.",
            ask.equations("Horizontal asymptote", [`y = ${num(a)}`]),
          ),
          part("Find lim x→−∞ r(x).", ask.limit("lim x→−∞ r(x) =", a)),
        ],
        solution: [
          `The graph approaches the vertical dashed line at x = ${num(c)}, so that is the vertical asymptote.`,
          `The graph levels off toward the horizontal dashed line at y = ${num(a)} on both the left and the right, so that is the horizontal asymptote.`,
          `The outputs approach ${num(a)} as x → −∞, so lim x→−∞ r(x) = ${num(a)}.`,
        ],
        data: { text, a, c },
      });
    },
    verify({ data: { text, a, c } }) {
      const f = fnOf(text);
      assertNear(f(-1e6), a, "left end", 1e-4);
      assertNear(f(1e6), a, "right end", 1e-4);
      assert(Number.isNaN(f(c)) && Math.abs(f(c + 1e-6)) > 1e4, "vertical asymptote");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "rational-quotient",
    skill: "describe",
    make(r) {
      const d = r.pick([1, 2, 4, 5]);
      const a = r.nonzero(-9, 9);
      const b = r.int(-9, 9);
      const c = r.int(-9, 9);
      const e = r.int(-6, 6);
      const g = r.int(1, 9);
      const text = ratio(polyText([a, b, c]), polyText([d, e, g]));
      const f = fnOf(text);
      const xs = [10, 100, 1000, 10000];
      const limitValue = new Q(a, d);
      const rows = xs.map((x) => [String(x), fixed(f(x), 4)]);
      if (rows.some(([, y]) => y.length > 12)) reject("long entry");
      return problem({
        stem: `The rational function r is given by r(x) = ${text}. The table shows values of r(x) for increasingly large values of x.`,
        blocks: [table("Values of r(x)", ["x", "r(x)"], rows)],
        parts: [
          part(
            "Use the table to find lim x→∞ r(x).",
            ask.number("lim x→∞ r(x) =", limitValue),
          ),
          part(
            "Write the equation of the horizontal asymptote.",
            ask.equations("Horizontal asymptote", [`y = ${limitValue}`]),
          ),
        ],
        solution: [
          `As x increases, the outputs ${rows.map(([, y]) => y).join(", ")} get closer and closer to ${limitValue}.`,
          `This agrees with comparing the leading terms: the numerator and the denominator both have degree 2, so r(x) approaches the ratio of the leading coefficients, ${num(a)}/${num(d)}${String(limitValue) === `${num(a)}/${num(d)}` ? "" : ` = ${limitValue}`}. The horizontal asymptote is y = ${limitValue}.`,
        ],
        data: { text, limitValue },
      });
    },
    verify({ data: { text, limitValue } }) {
      assertNear(fnOf(text)(1e7), limitValue.value, "limit", 1e-4);
    },
  },
  {
    id: "p10",
    tier: "quiz",
    unit: true,
    concept: "slant-asymptotes",
    skill: "support-conclusions",
    make(r) {
      const b = r.int(-6, 6);
      const c = r.int(-8, 8);
      const k = r.nonzero(-5, 5);
      const division = new Poly([c, b, 1]).divmod(new Poly([-k, 1]));
      const remainder = division.remainder.at(0);
      if (remainder.isZero) reject("divides evenly");
      const positive = remainder.n > 0;
      const text = ratio(polyText([1, b, c]), polyText([1, -k]));
      const line = `y = ${polyText([1, b + k])}`;
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            "Write the equation of the slant asymptote.",
            ask.equations("Slant asymptote", [line]),
          ),
          part(
            "As x → ∞, is the graph of r above or below the slant asymptote?",
            ask.choice("The graph is", ["above", "below"], positive ? "above" : "below"),
          ),
          part(
            "As x → −∞, is the graph of r above or below the slant asymptote?",
            ask.choice("The graph is", ["above", "below"], positive ? "below" : "above"),
          ),
        ],
        solution: [
          `Divide ${polyText([1, b, c])} by ${polyText([1, -k])}: the quotient is ${polyText([1, b + k])} and the remainder is ${remainder}. So r(x) = ${addRatio(polyText([1, b + k]), remainder, polyText([1, -k]))}.`,
          `The slant asymptote is ${line}. The difference r(x) − ${/ /.test(polyText([1, b + k])) ? `(${polyText([1, b + k])})` : polyText([1, b + k])} equals ${remainder}/(${polyText([1, -k])}).`,
          `For large positive x, ${polyText([1, -k])} is positive, so the difference is ${positive ? "positive" : "negative"} and the graph is ${positive ? "above" : "below"} the line. For large negative x, ${polyText([1, -k])} is negative, so the graph is ${positive ? "below" : "above"} the line.`,
        ],
        data: { text, b, k, remainder: remainder.value, positive },
      });
    },
    verify({ data: { text, b, k, remainder, positive } }) {
      const f = fnOf(text);
      const line = (x) => x + b + k;
      assert(f(1e4) - line(1e4) > 0 === positive, "above or below on the right");
      assert(f(-1e4) - line(-1e4) > 0 === !positive, "above or below on the left");
      assertNear(
        f(1e4) - line(1e4),
        remainder / (1e4 - k),
        "difference from the line",
        1e-3,
      );
    },
  },
];

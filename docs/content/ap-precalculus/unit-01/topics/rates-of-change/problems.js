// Typed-answer problems for Topic 1.2. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed expression or table, so a
// slip in the key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  factorText,
  polyText,
  termsText,
  ivl,
  num,
  par,
  Q,
  fnOf,
  assert,
  assertNear,
  aroc,
  reject,
  lead,
  cornerGraph,
  zigzag,
} from "../../../../practice-kit/index.js";

const between = (v, a, b) => `${num(a)} ≤ ${v} ≤ ${num(b)}`;

const CONTEXTS = [
  {
    fn: "T",
    intro:
      "The function T gives the temperature of a cup of coffee, in degrees Fahrenheit, t minutes after it is poured.",
    noun: "temperature",
    per: "degrees Fahrenheit per minute",
    unitOut: "degrees Fahrenheit",
    lo: 120,
    hi: 200,
    speed: [2, 9],
    dirs: [-1],
    span: [3, 12],
  },
  {
    fn: "V",
    intro:
      "The function V gives the volume of water in a tank, in gallons, t minutes after a valve is opened.",
    noun: "volume of water",
    per: "gallons per minute",
    unitOut: "gallons",
    lo: 150,
    hi: 600,
    speed: [10, 40],
    dirs: [-1, 1],
    span: [2, 10],
  },
  {
    fn: "P",
    intro:
      "The function P gives the population of a town, in thousands of people, t years after 2010.",
    noun: "population",
    per: "thousand people per year",
    unitOut: "thousand people",
    lo: 20,
    hi: 90,
    speed: [1, 6],
    dirs: [-1, 1],
    span: [2, 8],
  },
  {
    fn: "N",
    intro:
      "The function N gives the number of subscribers to a streaming service, in thousands, t months after the service launched.",
    noun: "number of subscribers",
    per: "thousand subscribers per month",
    unitOut: "thousand subscribers",
    lo: 30,
    hi: 150,
    speed: [2, 12],
    dirs: [1],
    span: [2, 9],
  },
];

// Two times and the values of the quantity at those times. The rate is a whole number.
function drawContext(r) {
  const ctx = r.pick(CONTEXTS);
  const a = r.int(0, 4);
  const b = a + r.int(...ctx.span);
  const dir = r.pick(ctx.dirs);
  const speed = r.int(...ctx.speed);
  const first = r.int(ctx.lo, ctx.hi);
  const second = first + dir * speed * (b - a);
  if (second <= 0) reject("a negative quantity");
  return { ctx, a, b, first, second, rate: new Q(dir * speed), dir };
}

const changed = (dir) => (dir > 0 ? "increased" : "decreased");

// Evaluates a list of terms like [[3, "x²"], [3, "xh"], [2, ""]] at numbers.
const evalTerms = (terms, x, h) =>
  terms.reduce((sum, [c, sym]) => {
    const value = sym.replace(/²/g, "**2").replace(/xh/g, "(x*h)").replace(/^$/, "1");
    return sum + c * Function("x", "h", `return ${value};`)(x, h);
  }, 0);

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "average-rate",
    skill: "solve",
    make(r) {
      const a = r.pick([1, 2, 3, -1, -2]);
      const b = r.int(-6, 6);
      const c = r.int(-6, 6);
      const m = r.int(-4, 2);
      const n = m + r.int(2, 5);
      const text = polyText([a, b, c]);
      const f = (x) => a * x * x + b * x + c;
      const value = new Q(f(n) - f(m), n - m);
      return problem({
        stem: `Let f(x) = ${text}. Find the average rate of change of f over the interval ${between("x", m, n)}.`,
        parts: [ask.number("Average rate of change", value)],
        solution: [
          `Find the outputs at the endpoints: f(${num(m)}) = ${num(f(m))} and f(${num(n)}) = ${num(f(n))}.`,
          `The average rate of change is (${num(f(n))} − ${par(f(m))})/(${num(n)} − ${par(m)}) = ${value}.`,
        ],
        data: { text, m, n, value },
      });
    },
    verify({ data: { text, m, n, value } }) {
      assertNear(aroc(fnOf(text), m, n), value.value, "average rate of change");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "average-rate",
    skill: "identify-information",
    make(r) {
      const xs = [r.int(-3, 0)];
      for (let i = 0; i < 4; i += 1) xs.push(xs[i] + r.int(1, 3));
      const ys = xs.map(() => r.int(-9, 12));
      const i = r.int(0, 1);
      const j = r.int(3, 4);
      const value = new Q(ys[j] - ys[i], xs[j] - xs[i]);
      return problem({
        stem: `Selected values of a function g are shown in the table. Find the average rate of change of g over the interval ${between("x", xs[i], xs[j])}.`,
        blocks: [
          table(
            "Values of g(x)",
            ["x", "g(x)"],
            xs.map((x, k) => [num(x), num(ys[k])]),
          ),
        ],
        parts: [ask.number("Average rate of change", value)],
        solution: [
          `The endpoints of the interval are x = ${num(xs[i])} and x = ${num(xs[j])}, where g(${num(xs[i])}) = ${num(ys[i])} and g(${num(xs[j])}) = ${num(ys[j])}.`,
          `The average rate of change is (${num(ys[j])} − ${par(ys[i])})/(${num(xs[j])} − ${par(xs[i])}) = ${value}.`,
        ],
        data: { xs, ys, i, j, value },
      });
    },
    verify({ data: { xs, ys, i, j, value } }) {
      assertNear((ys[j] - ys[i]) / (xs[j] - xs[i]), value.value, "from the table");
      assert(
        xs.every((x, k) => k === 0 || x > xs[k - 1]),
        "inputs increase",
      );
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "sign-and-meaning",
    skill: "apply-results",
    make(r) {
      const { ctx, a, b, first, second, rate, dir } = drawContext(r);
      const v = "t";
      return problem({
        stem: `${ctx.intro} ${ctx.fn}(${a}) = ${first} and ${ctx.fn}(${b}) = ${second}. Find the average rate of change of ${ctx.fn} over the interval ${between(v, a, b)}.`,
        parts: [ask.number("Average rate of change", rate, { unit: ctx.per })],
        solution: [
          `The average rate of change is (${ctx.fn}(${b}) − ${ctx.fn}(${a}))/(${b} − ${a}) = (${second} − ${first})/${b - a} = ${rate}.`,
          `On average, the ${ctx.noun} ${changed(dir)} by ${rate.n < 0 ? rate.neg() : rate} ${ctx.per} from t = ${a} to t = ${b}.`,
        ],
        data: { first, second, a, b, rate },
      });
    },
    verify({ data: { first, second, a, b, rate } }) {
      assertNear((second - first) / (b - a), rate.value, "rate");
      assert(b > a, "interval runs forward");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "rate-at-a-point",
    skill: "identify-information",
    make(r) {
      const a = r.int(1, 4);
      const b = r.int(-3, 8);
      const s = (t) => a * t * t + b * t;
      const estimate = 6 * a + b;
      return problem({
        stem: "The table gives the distance s(t), in feet, that a cart has traveled along a track t seconds after it is released. Use the average rate of change over the interval 2 ≤ t ≤ 4 to estimate the rate of change of s at t = 3.",
        blocks: [
          table(
            "Distance traveled by the cart",
            ["t (seconds)", "s(t) (feet)"],
            [1, 2, 3, 4, 5].map((t) => [String(t), num(s(t))]),
          ),
        ],
        parts: [ask.number("Estimated rate", estimate, { unit: "feet per second" })],
        solution: [
          "The rate of change at t = 3 can be estimated by the average rate of change over a short interval around t = 3.",
          `(s(4) − s(2))/(4 − 2) = (${num(s(4))} − ${num(s(2))})/2 = ${num(estimate)}. The cart is moving at about ${num(estimate)} feet per second when t = 3.`,
        ],
        data: { a, b, estimate },
      });
    },
    verify({ data: { a, b, estimate } }) {
      const f = fnOf(`${a}x^2 + (${b})x`);
      assertNear((f(4) - f(2)) / 2, estimate, "estimate");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    unit: true,
    concept: "average-rate",
    skill: "equivalent-forms",
    make(r) {
      const family = r.pick(["quadratic", "cubic"]);
      let text;
      let terms;
      let work;
      if (family === "quadratic") {
        const a = r.pick([1, 2, 3, -1, -2]);
        const b = r.nonzero(-6, 6);
        const c = r.int(-6, 6);
        text = polyText([a, b, c]);
        terms = [
          [2 * a, "x"],
          [a, "h"],
          [b, ""],
        ];
        work = `Expand f(x + h) and subtract f(x). The terms in x² and the constant term cancel, leaving ${termsText(
          [
            [2 * a, "xh"],
            [a, "h²"],
            [b, "h"],
          ],
        )}.`;
      } else {
        const b = r.int(-5, 5);
        text = polyText([1, 0, b, 0]);
        terms = [
          [3, "x²"],
          [3, "xh"],
          [1, "h²"],
          [b, ""],
        ];
        work = `Expand f(x + h) and subtract f(x). The terms in x³ and x cancel except for the part that contains h, leaving ${termsText(
          [
            [3, "x²h"],
            [3, "xh²"],
            [1, "h³"],
            [b, "h"],
          ],
        )}.`;
      }
      const shown = termsText(terms);
      const key = terms
        .map(
          ([c, s]) =>
            `(${c})*${s.replace(/²/g, "^2").replace("xh", "x*h").replace(/^$/, "1")}`,
        )
        .join(" + ");
      return problem({
        stem: `Let f(x) = ${text}. For h ≠ 0, the difference quotient (f(x + h) − f(x))/h is the average rate of change of f over the interval from x to x + h. Write the difference quotient as an expression with no h in the denominator.`,
        parts: [
          ask.expr("(f(x + h) − f(x))/h =", key, {
            vars: ["x", "h"],
            form: "expanded",
            text: shown,
          }),
        ],
        solution: [work, `Divide each term by h: (f(x + h) − f(x))/h = ${shown}.`],
        data: { text, terms },
      });
    },
    verify({ data: { text, terms } }) {
      const f = fnOf(text);
      for (const [x, h] of [
        [1.3, 0.5],
        [-2.1, 1.7],
        [0.4, -0.9],
        [3.2, 0.25],
      ])
        assertNear((f(x + h) - f(x)) / h, evalTerms(terms, x, h), "difference quotient");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "average-rate",
    skill: "solve",
    make(r) {
      const family = r.pick(["root", "reciprocal", "cube"]);
      let text;
      let f;
      let m;
      let n;
      if (family === "root") {
        const c = r.int(-8, 8);
        const u = r.int(0, 4);
        const v = u + r.int(1, 3);
        m = u * u - c;
        n = v * v - c;
        text = `√(${polyText([1, c])})`;
        f = (x) => new Q(Math.round(Math.sqrt(x + c)));
      } else if (family === "reciprocal") {
        const k = r.pick([1, 2, 3, 4, -1, -2, -3]);
        const sign = r.sign();
        m = sign * r.int(1, 4);
        n = m + sign * r.int(1, 3);
        if (m > n) [m, n] = [n, m];
        text = `${num(k)}/x`;
        f = (x) => new Q(k, x);
      } else {
        const a = r.pick([1, 2, -1]);
        m = r.int(-3, 1);
        n = m + r.int(2, 4);
        text = `${lead(a)}x³`;
        f = (x) => new Q(a * x * x * x);
      }
      if (family === "reciprocal" && (m === 0 || n === 0 || m * n < 0))
        reject("crosses the asymptote");
      const fm = f(m);
      const fn = f(n);
      const value = fn.sub(fm).div(new Q(n - m));
      return problem({
        stem: `Let f(x) = ${text}. Find the average rate of change of f over the interval ${between("x", m, n)}. Give an exact value.`,
        parts: [ask.number("Average rate of change", value)],
        solution: [
          `f(${num(m)}) = ${fm} and f(${num(n)}) = ${fn}.`,
          `The average rate of change is (${fn} − ${par(fm)})/(${num(n)} − ${par(m)}) = ${value}.`,
        ],
        data: { text, m, n, value },
      });
    },
    verify({ data: { text, m, n, value } }) {
      assertNear(aroc(fnOf(text), m, n), value.value, "average rate of change");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "comparing-rates",
    skill: "describe",
    make(r) {
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const b = r.int(-6, 6);
      const c = r.int(-6, 6);
      const p = r.int(-5, 2);
      const q = p + r.int(2, 4);
      const s0 = r.int(-5, 2);
      const t0 = s0 + r.int(2, 4);
      if (p + q === s0 + t0) reject("equal average rates");
      const f = (x) => a * x * x + b * x + c;
      const one = new Q(f(q) - f(p), q - p);
      const two = new Q(f(t0) - f(s0), t0 - s0);
      const first = ivl(p, q, true, true);
      const second = ivl(s0, t0, true, true);
      const text = polyText([a, b, c]);
      const bigger = one.cmp(two) > 0 ? first : second;
      return problem({
        stem: `Let f(x) = ${text}. Compare the average rate of change of f over the intervals ${first} and ${second}.`,
        parts: [
          part(
            `Find the average rate of change over ${first}.`,
            ask.number("Average rate of change", one),
          ),
          part(
            `Find the average rate of change over ${second}.`,
            ask.number("Average rate of change", two),
          ),
          part(
            "Over which interval is the average rate of change greater?",
            ask.choice("Greater over", [first, second], bigger),
          ),
        ],
        solution: [
          `Over ${first}: (f(${num(q)}) − f(${num(p)}))/(${num(q)} − ${par(p)}) = (${num(f(q))} − ${par(f(p))})/${q - p} = ${one}.`,
          `Over ${second}: (f(${num(t0)}) − f(${num(s0)}))/(${num(t0)} − ${par(s0)}) = (${num(f(t0))} − ${par(f(s0))})/${t0 - s0} = ${two}.`,
          `${one.cmp(two) > 0 ? one : two} is greater than ${one.cmp(two) > 0 ? two : one}, so the average rate of change is greater over ${bigger}.`,
        ],
        data: { text, p, q, s0, t0, one, two },
      });
    },
    verify({ data: { text, p, q, s0, t0, one, two } }) {
      const f = fnOf(text);
      assertNear(aroc(f, p, q), one.value, "first rate");
      assertNear(aroc(f, s0, t0), two.value, "second rate");
      assert(one.cmp(two) !== 0, "rates differ");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "sign-and-meaning",
    skill: "apply-results",
    make(r) {
      const ctx = r.pick(CONTEXTS);
      const dir = r.pick(ctx.dirs);
      const ts = [r.int(0, 2)];
      for (let i = 0; i < 3; i += 1) ts.push(ts[i] + r.int(1, 4));
      const speed = r.int(...ctx.speed);
      const total = speed * (ts[3] - ts[0]);
      const k1 = r.int(1, total - 2);
      const k2 = r.int(1, total - k1 - 1);
      const start = r.int(ctx.lo, ctx.hi);
      const ys = [start, start + dir * k1, start + dir * (k1 + k2), start + dir * total];
      if (ys.some((y) => y <= 0)) reject("a negative quantity");
      const rate = new Q(ys[3] - ys[0], ts[3] - ts[0]);
      const label = `${ctx.fn}(t)`;
      return problem({
        stem: `${ctx.intro} Selected values of ${ctx.fn} are shown in the table.`,
        blocks: [
          table(
            `Values of ${label}`,
            ["t", label],
            ts.map((t, i) => [String(t), num(ys[i])]),
          ),
        ],
        parts: [
          part(
            `Find the average rate of change of ${ctx.fn} over the interval ${between("t", ts[0], ts[3])}.`,
            ask.number("Average rate of change", rate, { unit: ctx.per }),
          ),
          part(
            `Over this interval, the ${ctx.noun}, on average,`,
            ask.choice("The " + ctx.noun, ["increased", "decreased"], changed(dir)),
          ),
        ],
        solution: [
          `The interval runs from t = ${ts[0]} to t = ${ts[3]}, so the average rate of change is (${ctx.fn}(${ts[3]}) − ${ctx.fn}(${ts[0]}))/(${ts[3]} − ${ts[0]}) = (${ys[3]} − ${ys[0]})/${ts[3] - ts[0]} = ${rate}.`,
          `The average rate of change is ${rate.n < 0 ? "negative" : "positive"}, so the ${ctx.noun} ${changed(dir)}, on average, by ${rate.n < 0 ? rate.neg() : rate} ${ctx.per}.`,
        ],
        data: { ts, ys, rate, dir },
      });
    },
    verify({ data: { ts, ys, rate, dir } }) {
      assertNear((ys[3] - ys[0]) / (ts[3] - ts[0]), rate.value, "rate");
      assert(Math.sign(rate.value) === dir, "sign matches direction");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "average-rate",
    skill: "solve",
    make(r) {
      const p = r.pick([1, 2, 3, -1, -2]);
      const c = r.int(-6, 6);
      const a = r.int(-3, 3);
      const k = a + r.int(1, 7);
      const value = p * (a + k) + c;
      const text = polyText([p, c, 0]);
      return problem({
        stem: `Let f(x) = ${text}. The average rate of change of f over the interval ${num(a)} ≤ x ≤ k is ${num(value)}, where k > ${num(a)}. Find the value of k.`,
        parts: [ask.number("k =", k)],
        solution: [
          `The average rate of change is (f(k) − f(${num(a)}))/(k − ${par(a)}). The numerator factors as ${factorText(a, "k")}(${polyText([p, p * a + c], "k")}), so the average rate of change simplifies to ${polyText([p, p * a + c], "k")}.`,
          `Set ${polyText([p, p * a + c], "k")} = ${num(value)}. Solving gives k = ${num(k)}.`,
        ],
        data: { text, a, k, value },
      });
    },
    verify({ data: { text, a, k, value } }) {
      assertNear(aroc(fnOf(text), a, k), value, "average rate of change");
      assert(k > a, "k > a");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "sign-and-meaning",
    skill: "identify-information",
    make(r) {
      const { xs, ys } = zigzag(r);
      const whole = new Q(ys[4] - ys[0], xs[4] - xs[0]);
      const slope = new Q(ys[3] - ys[2], xs[3] - xs[2]);
      const word = ys[2] > ys[1] ? "positive" : "negative";
      return problem({
        stem: "The graph of the function f is shown. The graph consists of line segments.",
        blocks: [cornerGraph(xs, ys, "The graph of y = f(x)")],
        parts: [
          part(
            `Find the average rate of change of f over the interval ${between("x", xs[0], xs[4])}.`,
            ask.number("Average rate of change", whole),
          ),
          part(
            `Find the average rate of change of f over the interval ${between("x", xs[2], xs[3])}.`,
            ask.number("Average rate of change", slope),
          ),
          part(
            `Is the average rate of change of f over ${between("x", xs[1], xs[2])} positive or negative?`,
            ask.choice("The average rate of change is", ["positive", "negative"], word),
          ),
        ],
        solution: [
          `The graph passes through (${num(xs[0])}, ${num(ys[0])}) and (${num(xs[4])}, ${num(ys[4])}), so the average rate of change is (${num(ys[4])} − ${par(ys[0])})/(${num(xs[4])} − ${par(xs[0])}) = ${whole}.`,
          `Between x = ${num(xs[2])} and x = ${num(xs[3])} the graph is one segment, so the average rate of change is its slope: (${num(ys[3])} − ${par(ys[2])})/(${num(xs[3])} − ${par(xs[2])}) = ${slope}.`,
          `Between x = ${num(xs[1])} and x = ${num(xs[2])} the graph ${word === "positive" ? "rises" : "falls"}, so the average rate of change is ${word}.`,
        ],
        data: { xs, ys, whole, slope },
      });
    },
    verify({ data: { xs, ys, whole, slope } }) {
      assertNear((ys[4] - ys[0]) / (xs[4] - xs[0]), whole.value, "whole interval");
      assertNear((ys[3] - ys[2]) / (xs[3] - xs[2]), slope.value, "one segment");
    },
  },
];

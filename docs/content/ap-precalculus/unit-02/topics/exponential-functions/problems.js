// Typed-answer problems for Topic 2.3. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed function, so a slip in the
// key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  graph,
  ivl,
  num,
  par,
  Q,
  fnOf,
  assert,
  assertNear,
  reject,
  expText,
  expKey,
  powerText,
  shown,
} from "../../../../practice-kit/index.js";

const qText = (value) => (value instanceof Q ? value.toString() : num(value));
const BASES = [
  new Q(2),
  new Q(3),
  new Q(4),
  new Q(5),
  new Q(3, 2),
  new Q(1, 2),
  new Q(1, 3),
  new Q(4, 5),
  new Q(1, 4),
  new Q(2, 3),
];
const drawBase = (r) => r.pick(BASES);
const drawA = (r) => new Q(r.pick([1, 2, 3, 4, 5, 6, -1, -2, -3, -4, -5]));
const grows = (b) => b.value > 1;

// The function as the student sees it, with decimal bases where they terminate.
const fText = (a, b) => expText(shown(a), shown(b));
const fKey = (a, b) => expKey(a, b).replace(/−/g, "-");

const INC = ["increasing", "decreasing"];
const CONC = ["concave up", "concave down"];

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "general-form",
    skill: "identify-information",
    make(r) {
      const b = drawBase(r);
      const a = new Q(r.pick([1, 2, 3, 4, 5, 6, 8, 10]));
      return problem({
        stem: `The exponential function f is given by f(x) = ${fText(a, b)}.`,
        parts: [
          part("Find the initial value of f.", ask.number("Initial value =", a)),
          part("Find the base of f.", ask.number("Base =", b)),
          part(
            "Does f demonstrate exponential growth or exponential decay?",
            ask.choice(
              "f demonstrates",
              ["exponential growth", "exponential decay"],
              grows(b) ? "exponential growth" : "exponential decay",
            ),
          ),
        ],
        solution: [
          `In the general form f(x) = abˣ, the initial value is a = f(0) = ${a}.`,
          `The base is b = ${qText(shown(b))}.`,
          `Because a > 0 and ${grows(b) ? "b > 1" : "0 < b < 1"}, f demonstrates exponential ${grows(b) ? "growth" : "decay"}.`,
        ],
        data: { a, b },
      });
    },
    verify({ data: { a, b } }) {
      const f = fnOf(fKey(a, b));
      assertNear(f(0), a.value, "initial value");
      assertNear(f(1) / f(0), b.value, "base");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "monotonic-and-concavity",
    skill: "describe",
    make(r) {
      const a = drawA(r);
      const b = drawBase(r);
      const positive = a.n > 0;
      const increasing = positive === grows(b);
      return problem({
        stem: `The function f is given by f(x) = ${fText(a, b)}.`,
        parts: [
          part(
            "Is f increasing or decreasing?",
            ask.choice("f is", INC, increasing ? "increasing" : "decreasing"),
          ),
          part(
            "Is the graph of f concave up or concave down?",
            ask.choice("The graph is", CONC, positive ? "concave up" : "concave down"),
          ),
        ],
        solution: [
          `Here a = ${a} is ${positive ? "positive" : "negative"} and the base ${qText(shown(b))} is ${grows(b) ? "greater than 1" : "between 0 and 1"}.`,
          `${positive ? (grows(b) ? "A positive initial value with b > 1" : "A positive initial value with 0 < b < 1") : grows(b) ? "A negative initial value with b > 1" : "A negative initial value with 0 < b < 1"} gives a function that is ${increasing ? "increasing" : "decreasing"}.`,
          `The graph is concave ${positive ? "up" : "down"}, because the sign of a decides the concavity of an exponential function.`,
        ],
        data: { a, b, increasing, positive },
      });
    },
    verify({ data: { a, b, increasing, positive } }) {
      const f = fnOf(fKey(a, b));
      const x = 0.3;
      const h = 0.01;
      assert(f(x + h) > f(x) === increasing, "increasing or decreasing");
      const second = f(x + h) - 2 * f(x) + f(x - h);
      assert(second > 0 === positive, "concavity");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "end-behavior",
    skill: "describe",
    make(r) {
      const a = drawA(r);
      const b = drawBase(r);
      const positive = a.n > 0;
      const up = grows(b);
      // The side where abˣ is unbounded: x → ∞ when b > 1, and x → −∞ when 0 < b < 1.
      const atInfinity = up ? (positive ? "∞" : "−∞") : "0";
      const atNegInfinity = up ? "0" : positive ? "∞" : "−∞";
      return problem({
        stem: `The function f is given by f(x) = ${fText(a, b)}.`,
        parts: [
          part(
            "Find the limit as x increases without bound.",
            ask.limit("lim x→∞ f(x) =", atInfinity),
          ),
          part(
            "Find the limit as x decreases without bound.",
            ask.limit("lim x→−∞ f(x) =", atNegInfinity),
          ),
        ],
        solution: [
          up
            ? `Since b > 1, bˣ grows without bound as x → ∞ and gets arbitrarily close to 0 as x → −∞.`
            : `Since 0 < b < 1, bˣ gets arbitrarily close to 0 as x → ∞ and grows without bound as x → −∞.`,
          `Multiplying by a = ${a}, which is ${positive ? "positive" : "negative"}, ${positive ? "keeps" : "reverses"} the sign of the outputs. So lim x→∞ f(x) = ${atInfinity} and lim x→−∞ f(x) = ${atNegInfinity}.`,
        ],
        data: { a, b, atInfinity, atNegInfinity },
      });
    },
    verify({ data: { a, b, atInfinity, atNegInfinity } }) {
      const f = fnOf(fKey(a, b));
      const check = (value, text) => {
        if (text === "0") assert(Math.abs(value) < 1e-6, "limit 0");
        else if (text === "∞") assert(value > 1e6, "limit ∞");
        else assert(value < -1e6, "limit −∞");
      };
      check(f(400), atInfinity);
      check(f(-400), atNegInfinity);
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "end-behavior",
    skill: "describe",
    make(r) {
      const a = drawA(r);
      const b = drawBase(r);
      const positive = a.n > 0;
      return problem({
        stem: `The function f is given by f(x) = ${fText(a, b)}.`,
        parts: [
          part(
            "Write the domain of f in interval notation.",
            ask.interval("Domain", "(−∞, ∞)"),
          ),
          part(
            "Write the range of f in interval notation.",
            ask.interval("Range", positive ? "(0, ∞)" : "(−∞, 0)"),
          ),
          part(
            "Write the equation of the horizontal asymptote.",
            ask.equations("Horizontal asymptote", ["y = 0"], { vars: ["y"] }),
          ),
        ],
        solution: [
          `An exponential function is defined for every real number x, so the domain is (−∞, ∞).`,
          `The factor ${qText(shown(b))}ˣ is always positive, so the outputs have the same sign as a = ${a}. The range is ${positive ? "(0, ∞)" : "(−∞, 0)"}.`,
          `The outputs get arbitrarily close to 0 but never reach it, so the horizontal asymptote is y = 0.`,
        ],
        data: { a, b, positive },
      });
    },
    verify({ data: { a, b, positive } }) {
      const f = fnOf(fKey(a, b));
      for (const x of [-30, -3, 0, 2.5, 30])
        assert(f(x) > 0 === positive, `sign at x = ${x}`);
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "general-form",
    skill: "solve",
    make(r) {
      const a = new Q(r.pick([1, 2, 3, 4, 5, 6, 7, -2, -3, -5]));
      const b = r.pick([new Q(2), new Q(3), new Q(1, 2), new Q(1, 3), new Q(3, 2)]);
      const x1 = r.int(2, 4);
      const n = r.int(-2, 4);
      const f = (x) => a.mul(b.pow(x));
      if (n === x1) reject("same input twice");
      const target = f(n);
      return problem({
        stem: `The function f is given by f(x) = ${fText(a, b)}.`,
        parts: [
          part(`Find f(${x1}).`, ask.number(`f(${x1}) =`, f(x1))),
          part(
            `Find the value of x for which f(x) = ${qText(shown(target))}.`,
            ask.number("x =", n),
          ),
        ],
        solution: [
          `f(${x1}) = ${expText(shown(a), shown(b), x1)} = ${qText(f(x1))}.`,
          `Solve ${fText(a, b)} = ${qText(shown(target))}. Divide both sides by ${a} to get ${powerText(shown(b), "x")} = ${qText(shown(target.div(a)))}.`,
          `Since ${qText(shown(target.div(a)))} = ${powerText(shown(b), num(n))}, x = ${num(n)}.`,
        ],
        data: { a, b, x1, n, target },
      });
    },
    verify({ data: { a, b, x1, n, target } }) {
      const f = fnOf(fKey(a, b));
      assertNear(f(x1), a.mul(b.pow(x1)).value, "value");
      assertNear(f(n), target.value, "the target is f(n)");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "general-form",
    skill: "identify-information",
    make(r) {
      const b = r.pick([new Q(2), new Q(3), new Q(1, 2), new Q(3, 2), new Q(1, 3)]);
      const a = new Q(r.pick([1, 2, 3, -1, -2, -3]) * (b.d > 1 ? b.d : 1));
      const x1 = 1;
      const f = (x) => a.mul(b.pow(x));
      const window = Math.abs(f(0).value) <= 9 && Math.abs(f(1).value) <= 9;
      if (!window) reject("marked points outside the window");
      const key = fKey(a, b);
      const marked = [0, 1, 2].filter((x) => Math.abs(f(x).value) <= 9);
      const sideNote = grows(b) ? "rises" : "falls";
      return problem({
        stem: "The graph of an exponential function f is shown. Points on the graph are marked.",
        blocks: [
          graph({
            caption: "The graph of y = f(x)",
            alt: `The graph of an exponential function. The graph passes through ${marked.map((x) => `(${x}, ${qText(f(x))})`).join(", ")}. It ${sideNote} from left to right and approaches the x-axis on one side.`,
            window: { x: [-4, 4], y: [-10, 10] },
            ticks: { x: 1, y: 2 },
            functions: [{ expr: key }],
            points: marked.map((x) => ({ at: [x, f(x).value] })),
          }),
        ],
        parts: [
          part("Find the initial value of f.", ask.number("Initial value =", a)),
          part("Find the base of f.", ask.number("Base =", b)),
          part(
            "Write an expression for f(x).",
            ask.expr("f(x) =", key, { form: "exponential", text: expText(a, b) }),
          ),
        ],
        solution: [
          `The graph crosses the y-axis at (0, ${qText(f(0))}), so the initial value is ${a}.`,
          `The outputs at x = 0 and x = 1 are ${qText(f(0))} and ${qText(f(1))}, so the base is ${qText(f(1))}/${par(f(0))} = ${b}.`,
          `So f(x) = ${expText(a, b)}.`,
        ],
        data: { key, a, b, x1 },
      });
    },
    verify({ data: { key, a, b } }) {
      const f = fnOf(key);
      assertNear(f(0), a.value, "initial value");
      assertNear(f(1) / f(0), b.value, "base");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "monotonic-and-concavity",
    skill: "describe",
    make(r) {
      const a = drawA(r);
      const b = r.pick([new Q(2), new Q(3), new Q(1, 2), new Q(1, 3), new Q(3, 2)]);
      const xs = [-2, -1, 0, 1, 2];
      const f = (x) => a.mul(b.pow(x));
      const positive = a.n > 0;
      const increasing = positive === grows(b);
      const mult = new Q((b.n * b.d) ** 2);
      const ys = xs.map((x) => f(x).mul(mult));
      const A = ys[2];
      const g = (x) => A.mul(b.pow(x));
      const key = fKey(A, b);
      return problem({
        stem: "Selected values of an exponential function g are shown in the table. The values of x are equally spaced.",
        blocks: [
          table(
            "Values of g(x)",
            ["x", "g(x)"],
            xs.map((x, i) => [num(x), qText(g(x))]),
          ),
        ],
        parts: [
          part(
            "Is g increasing or decreasing?",
            ask.choice("g is", INC, increasing ? "increasing" : "decreasing"),
          ),
          part(
            "Is the graph of g concave up or concave down?",
            ask.choice("The graph is", CONC, positive ? "concave up" : "concave down"),
          ),
          part("Find the initial value of g.", ask.number("Initial value =", A)),
          part("Find the base of g.", ask.number("Base =", b)),
        ],
        solution: [
          `The outputs ${increasing ? "increase" : "decrease"} as x increases, so g is ${increasing ? "increasing" : "decreasing"}.`,
          `The amounts by which the outputs change, ${qText(g(-1).sub(g(-2)))}, ${qText(g(0).sub(g(-1)))}, ${qText(g(1).sub(g(0)))}, ${qText(g(2).sub(g(1)))}, ${positive ? "increase" : "decrease"} from left to right, so the graph is concave ${positive ? "up" : "down"}.`,
          `The initial value is g(0) = ${A}, and the base is g(1)/g(0) = ${qText(g(1))}/${par(g(0))} = ${b}.`,
        ],
        data: { key, A, b, positive, increasing, xs },
      });
    },
    verify({ data: { key, A, b, positive, increasing, xs } }) {
      const g = fnOf(key);
      assertNear(g(0), A.value, "initial value");
      const changes = xs.slice(1).map((x, i) => g(x) - g(xs[i]));
      if (positive)
        assert(
          changes.every((c, i) => i === 0 || c > changes[i - 1]),
          "changes increase",
        );
      else
        assert(
          changes.every((c, i) => i === 0 || c < changes[i - 1]),
          "changes decrease",
        );
      assert(changes[0] > 0 === increasing, "direction");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "monotonic-and-concavity",
    skill: "support-conclusions",
    make(r) {
      const combos = [
        { inc: "increasing", conc: "concave up", a: "positive", b: "greater than 1" },
        { inc: "increasing", conc: "concave down", a: "negative", b: "between 0 and 1" },
        { inc: "decreasing", conc: "concave up", a: "positive", b: "between 0 and 1" },
        { inc: "decreasing", conc: "concave down", a: "negative", b: "greater than 1" },
      ];
      const c = r.pick(combos);
      const name = r.pick(["f", "g", "h", "k"]);
      return problem({
        stem: `The function ${name} is given by ${name}(x) = abˣ, where b > 0 and b ≠ 1. The function ${name} is ${c.inc} and its graph is ${c.conc}.`,
        parts: [
          part(
            "Is a positive or negative?",
            ask.choice("a is", ["positive", "negative"], c.a),
          ),
          part(
            "Is b greater than 1, or between 0 and 1?",
            ask.choice("b is", ["greater than 1", "between 0 and 1"], c.b),
          ),
        ],
        solution: [
          `The graph of an exponential function is concave ${c.conc === "concave up" ? "up" : "down"} when a is ${c.a}, so a is ${c.a}.`,
          `With a ${c.a}, ${name} is ${c.inc} only when b is ${c.b}.`,
        ],
        data: { c },
      });
    },
    verify({ data: { c } }) {
      const a = c.a === "positive" ? 2 : -2;
      const b = c.b === "greater than 1" ? 3 : 0.5;
      const f = (x) => a * b ** x;
      assert(f(1) > f(0) === (c.inc === "increasing"), "direction");
      assert(f(1) - 2 * f(0) + f(-1) > 0 === (c.conc === "concave up"), "concavity");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "end-behavior",
    skill: "describe",
    make(r) {
      const a = drawA(r);
      const b = drawBase(r);
      const k = r.nonzero(-6, 7);
      const positive = a.n > 0;
      const tail = positive ? ivl(k, Infinity) : ivl(-Infinity, k);
      const text = `${fText(a, b)} ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
      const key = `${fKey(a, b)} + (${k})`;
      const yInt = a.add(k);
      return problem({
        stem: `The function f is given by f(x) = ${text}.`,
        parts: [
          part("Write the range of f in interval notation.", ask.interval("Range", tail)),
          part(
            "Write the equation of the horizontal asymptote.",
            ask.equations("Horizontal asymptote", [`y = ${num(k)}`], { vars: ["y"] }),
          ),
          part(
            "Find the coordinates of the y-intercept.",
            ask.points("y-intercept", [[0, yInt]]),
          ),
        ],
        solution: [
          `The term ${fText(a, b)} has the same sign as a = ${a} for every x, and it gets arbitrarily close to 0, so the outputs of f are ${positive ? "greater" : "less"} than ${num(k)} and approach ${num(k)}.`,
          `The range is ${tail}, and the horizontal asymptote is y = ${num(k)}.`,
          `f(0) = ${a} ${k < 0 ? "−" : "+"} ${Math.abs(k)} = ${qText(yInt)}, so the y-intercept is (0, ${qText(yInt)}).`,
        ],
        data: { key, a, b, k, positive, yInt },
      });
    },
    verify({ data: { key, a, b, k, positive, yInt } }) {
      const f = fnOf(key);
      for (const x of [-25, -2, 0, 3, 25])
        assert(f(x) > k === positive, `side of the asymptote at x = ${x}`);
      assert(Math.abs(f(grows(b) ? -300 : 300) - k) < 1e-6, "approaches the asymptote");
      assertNear(f(0), yInt.value, "y-intercept");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "monotonic-and-concavity",
    skill: "support-conclusions",
    make(r) {
      const a = drawA(r);
      const b = r.pick([new Q(2), new Q(3), new Q(1, 2), new Q(3, 2), new Q(1, 3)]);
      const x1 = r.int(-1, 2);
      const len = r.pick([1, 2]);
      const x2 = x1 + len;
      const x3 = x2 + len;
      const positive = a.n > 0;
      const f = (x) => a.mul(b.pow(x));
      const first = f(x2).sub(f(x1)).div(len);
      const second = f(x3).sub(f(x2)).div(len);
      return problem({
        stem: `The function f is given by f(x) = ${fText(a, b)}.`,
        parts: [
          part(
            `Find the average rate of change of f over the interval ${num(x1)} ≤ x ≤ ${num(x2)}.`,
            ask.number("Average rate of change =", first),
          ),
          part(
            `Find the average rate of change of f over the interval ${num(x2)} ≤ x ≤ ${num(x3)}.`,
            ask.number("Average rate of change =", second),
          ),
          part(
            "Based on these two values, is the graph of f concave up or concave down?",
            ask.choice("The graph is", CONC, positive ? "concave up" : "concave down"),
          ),
        ],
        solution: [
          `(f(${num(x2)}) − f(${num(x1)}))/${len} = (${qText(f(x2))} − ${par(f(x1))})/${len} = ${qText(first)}.`,
          `(f(${num(x3)}) − f(${num(x2)}))/${len} = (${qText(f(x3))} − ${par(f(x2))})/${len} = ${qText(second)}.`,
          `The average rate of change ${positive ? "increases" : "decreases"} over successive intervals of equal length, so the graph of f is concave ${positive ? "up" : "down"}.`,
        ],
        data: { a, b, x1, x2, x3, first, second, positive },
      });
    },
    verify({ data: { a, b, x1, x2, x3, first, second, positive } }) {
      const f = fnOf(fKey(a, b));
      assertNear((f(x2) - f(x1)) / (x2 - x1), first.value, "first rate");
      assertNear((f(x3) - f(x2)) / (x3 - x2), second.value, "second rate");
      assert(second.value > first.value === positive, "rates increase for a > 0");
    },
  },
];

// Typed-answer problems for Topic 2.11. Each template draws new numbers for every
// variant. verify() recomputes the characteristics of each function numerically, so a
// slip in a key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  graph,
  num,
  Q,
  sup,
  sub,
  logText,
  lg,
  fnOf,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const asQ = (value) => (value instanceof Q ? value : new Q(value));
const text = (value) =>
  typeof value === "string" ? value : value instanceof Q ? value.toString() : num(value);
const grouped = (n) => n.toLocaleString("en-US");
const baseValue = (b) => (b instanceof Q ? b.value : b);
const logWord = (b) =>
  b instanceof Q ? `log_(${b})` : b === 10 ? "log" : `log${sub(b)}`;
// a log_b x in the lessons' style: 3 log₂ x, −log₅ x, log x.
const aLog = (a, b, argument = "x") =>
  `${a === 1 ? "" : a === -1 ? "−" : `${num(a)} `}${logWord(b)} ${argument}`;
const typedA = (a) => (a === 1 ? "" : a === -1 ? "−" : num(a));
const plusK = (k) => `x ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;

const BASES = [2, 3, 5, 10, new Q(1, 2), new Q(1, 3)];
const WHOLE_BASES = [2, 3, 5, 10];
const direction = (a, b) => a > 0 === baseValue(b) > 1;

// The words the lessons use for the four cases of a and b.
function behavior(a, b) {
  const rising = direction(a, b);
  return {
    rising,
    shape: rising ? "increasing" : "decreasing",
    curve: rising ? "concave down" : "concave up",
    atZero: rising ? "−∞" : "∞",
    atInfinity: rising ? "∞" : "−∞",
  };
}

const caseNote = (a, b) =>
  `a ${a > 0 ? ">" : "<"} 0 and ${baseValue(b) > 1 ? "b > 1" : "0 < b < 1"}`;

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "domain-range",
    skill: "identify-information",
    make(r) {
      const a = r.nonzero(-4, 4);
      const b = r.pick(BASES);
      const w = behavior(a, b);
      const stem =
        b instanceof Q
          ? `Let f(x) = a log_b x, where a = ${num(a)} and b = ${b}.`
          : `Let f(x) = ${aLog(a, b)}.`;
      return problem({
        stem,
        parts: [
          part("Find the domain of f.", ask.interval("Domain:", "(0, ∞)")),
          part("Find the range of f.", ask.interval("Range:", "(−∞, ∞)")),
          part("Find lim x→0⁺ f(x).", ask.limit("lim x→0⁺ f(x) =", w.atZero)),
        ],
        solution: [
          "The domain of a logarithmic function in general form is all x > 0, because only positive numbers can be written as a power of the base.",
          "The range of a logarithmic function in general form is all real numbers.",
          `The graph of f has the vertical asymptote x = 0. With ${caseNote(a, b)}, f is ${w.shape}, so f(x) approaches ${w.atZero} as x approaches 0 from the right.`,
        ],
        data: { a, b },
      });
    },
    verify({ data: { a, b } }) {
      const f = (x) => a * lg(baseValue(b), x);
      const w = behavior(a, b);
      const near = f(1e-30);
      assert(w.atZero === "∞" ? near > 10 : near < -10, "limit at 0+");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "domain-range",
    skill: "describe",
    make(r) {
      const b = r.pick([2, 3]);
      const a = r.pick([-2, -1, 1, 2]);
      const top = b === 2 ? 3 : 2;
      const marked = Array.from({ length: top + 1 }, (_, i) => [b ** i, a * i]);
      const w = behavior(a, b);
      return problem({
        stem: `The graph of the logarithmic function f(x) = a ${logWord(b)} x is shown. Points on the graph are marked.`,
        blocks: [
          graph({
            caption: "The graph of y = f(x)",
            alt: `A ${w.shape} logarithmic curve that has the y-axis as a vertical asymptote and passes through ${marked.map((p) => `(${num(p[0])}, ${num(p[1])})`).join(", ")}.`,
            window: { x: [-1, 10], y: [-8, 8] },
            ticks: { x: 1, y: 2 },
            functions: [{ expr: `(${a})*ln(x)/ln(${b})` }],
            points: marked.map((p) => ({ at: p })),
          }),
        ],
        parts: [
          part("Find lim x→0⁺ f(x).", ask.limit("lim x→0⁺ f(x) =", w.atZero)),
          part("Find lim x→∞ f(x).", ask.limit("lim x→∞ f(x) =", w.atInfinity)),
          part(
            "Is f increasing or decreasing on its domain?",
            ask.choice("f is", r.shuffle(["increasing", "decreasing"]), w.shape),
          ),
          part(
            "Find the x-intercept of the graph of f.",
            ask.number("x-intercept: x =", 1),
          ),
        ],
        solution: [
          `As x approaches 0 from the right, the graph ${w.rising ? "falls" : "rises"} without bound along the asymptote x = 0, so lim x→0⁺ f(x) = ${w.atZero}.`,
          `As x increases without bound the graph ${w.rising ? "rises" : "falls"} without bound, so lim x→∞ f(x) = ${w.atInfinity}.`,
          `The marked points show the outputs ${w.rising ? "increasing" : "decreasing"} as x increases, so f is ${w.shape}.`,
          "Every logarithmic function in general form has f(1) = 0, because b⁰ = 1. The x-intercept is at x = 1.",
        ],
        data: { a, b, marked },
      });
    },
    verify({ data: { a, b, marked } }) {
      for (const [x, y] of marked) assertNear(a * lg(b, x), y, "marked point");
      assertNear(a * lg(b, 1), 0, "x-intercept");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "monotonic",
    skill: "solve",
    make(r) {
      const a = r.nonzero(-4, 4);
      const b = r.pick(BASES);
      const lo = r.int(1, 4);
      const hi = lo + r.int(2, 7);
      const w = behavior(a, b);
      return problem({
        stem: `Let f(x) = a log_b x, where a = ${num(a)} and b = ${text(b)}.`,
        parts: [
          part(
            "Is f increasing or decreasing on its domain?",
            ask.choice("f is", r.shuffle(["increasing", "decreasing"]), w.shape),
          ),
          part(
            "Is the graph of f concave up or concave down on its domain?",
            ask.choice(
              "The graph is",
              r.shuffle(["concave up", "concave down"]),
              w.curve,
            ),
          ),
          part(
            `Find the x-value at which f has its absolute maximum on the closed interval [${lo}, ${hi}].`,
            ask.number("x =", w.rising ? hi : lo),
          ),
        ],
        solution: [
          `With ${caseNote(a, b)}, a logarithmic function is always ${w.shape}.`,
          `With ${caseNote(a, b)}, the graph is always ${w.curve}.`,
          `Because f is always ${w.shape}, the largest output on [${lo}, ${hi}] occurs at the ${w.rising ? "right" : "left"} endpoint, x = ${w.rising ? hi : lo}.`,
        ],
        data: { a, b, lo, hi },
      });
    },
    verify({ data: { a, b, lo, hi } }) {
      const f = (x) => a * lg(baseValue(b), x);
      const w = behavior(a, b);
      assert(f(hi) > f(lo) === w.rising, "monotonic direction");
      const midpoint = f((lo + hi) / 2);
      assert(midpoint > (f(lo) + f(hi)) / 2 === w.rising, "concavity");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "additive-transformation",
    skill: "equivalent-forms",
    make(r) {
      const b = r.pick([2, 3, 4]);
      const k = r.pick([-3, -2, -1, 1, 2, 3]);
      const xs = [0, 1, 2, 3].map((i) => b ** i - k);
      return problem({
        stem: "The table gives values of a function g. The function g can be written as g(x) = f(x + k), where f is a logarithmic function and k is a constant.",
        blocks: [
          table("Values of g", ["x", ...xs.map(num)], [["g(x)", "0", "1", "2", "3"]]),
        ],
        parts: [
          part(
            "What number k, added to each input, makes the new inputs proportional?",
            ask.number("k =", k),
          ),
          part(
            "What is the constant ratio between consecutive values of x + k?",
            ask.number("Ratio:", b),
          ),
          part(
            "Write an expression for g(x).",
            ask.expr("g(x) =", `log(x + (${k}), ${b})`, {
              text: `${logText(b, plusK(k))}`,
            }),
          ),
        ],
        solution: [
          `The outputs increase by 1 each time, but the inputs ${xs.map(num).join(", ")} are not proportional. Adding ${num(k)} gives ${xs.map((x) => num(x + k)).join(", ")}, which are proportional. So k = ${num(k)}.`,
          `Each new input is ${b} times the one before it, so the ratio is ${b}.`,
          `The shifted inputs ${plusK(k)} are powers of ${b} and the outputs are the exponents, so g(x) = ${logText(b, plusK(k))}.`,
        ],
        data: { b, k, xs },
      });
    },
    verify({ data: { b, k, xs } }) {
      const g = fnOf(`log(x + (${k}), ${b})`);
      xs.forEach((x, i) => assertNear(g(x), i, "table value"));
      xs.forEach((x, i) => assertNear(x + k, b ** i, "shifted input"));
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "domain-range",
    skill: "construct-functions",
    make(r) {
      const b = r.pick([2, 3, 4]);
      const a = b === 2 ? r.pick([-2, -1, 1, 2]) : r.pick([-3, -2, -1, 1, 2, 3]);
      const top = b === 2 ? 3 : 2;
      const marked = Array.from({ length: top + 1 }, (_, i) => [b ** i, a * i]);
      const far = 4;
      return problem({
        stem: `The graph of f(x) = a ${logWord(b)} x, where a is a constant, is shown. Points on the graph are marked.`,
        blocks: [
          graph({
            caption: "The graph of y = f(x)",
            alt: `A logarithmic curve with the y-axis as a vertical asymptote passing through ${marked.map((p) => `(${num(p[0])}, ${num(p[1])})`).join(", ")}.`,
            window: { x: [-1, b ** top + 2], y: [-8, 8] },
            ticks: { x: b === 4 ? 2 : 1, y: 2 },
            functions: [{ expr: `(${a})*ln(x)/ln(${b})` }],
            points: marked.map((p) => ({ at: p })),
          }),
        ],
        parts: [
          part("Find a.", ask.number("a =", a)),
          part(
            "Write an expression for f(x).",
            ask.expr("f(x) =", `(${a})*log(x, ${b})`, {
              text: `${typedA(a)}${logText(b, "x")}`,
            }),
          ),
          part(`Find f(${b ** far}).`, ask.number(`f(${b ** far}) =`, a * far)),
        ],
        solution: [
          `The point (${b}, ${num(a)}) is on the graph, so f(${b}) = ${num(a)}. Then a ${logWord(b)} ${b} = ${num(a)}, and since ${logText(b, b)} = 1, a = ${num(a)}.`,
          `With a = ${num(a)}, f(x) = ${aLog(a, b)}.`,
          `Since ${b}${sup(far)} = ${b ** far}, f(${b ** far}) = ${num(a)}(${far}) = ${num(a * far)}.`,
        ],
        data: { a, b, marked, far },
      });
    },
    verify({ data: { a, b, marked, far } }) {
      for (const [x, y] of marked) assertNear(a * lg(b, x), y, "marked point");
      assertNear(a * lg(b, b ** far), a * far, "far value");
      assert(Math.abs(a * (marked.length - 1)) <= 8, "inside the window");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "monotonic",
    skill: "solve",
    make(r) {
      const b = r.pick([2, 3, 4, 5]);
      const a = r.nonzero(-4, 4);
      const m = r.int(0, 2);
      const n = r.int(m + 2, b >= 4 ? Math.max(3, m + 2) : 5);
      const lo = b ** m;
      const hi = b ** n;
      const w = behavior(a, b);
      const maxValue = Math.max(a * m, a * n);
      const minValue = Math.min(a * m, a * n);
      return problem({
        stem: `Let f(x) = ${aLog(a, b)}. Consider f on the closed interval [${grouped(lo)}, ${grouped(hi)}].`,
        parts: [
          part(
            "Find the absolute maximum value of f on this interval.",
            ask.number("Maximum value:", maxValue),
          ),
          part(
            "Find the absolute minimum value of f on this interval.",
            ask.number("Minimum value:", minValue),
          ),
          part(
            "At what x-value does the absolute maximum occur?",
            ask.number("x =", w.rising ? hi : lo),
          ),
        ],
        solution: [
          `Because f is always ${w.shape}, its extreme values on a closed interval occur at the endpoints. f(${grouped(lo)}) = ${num(a)}(${m}) = ${num(a * m)} and f(${grouped(hi)}) = ${num(a)}(${n}) = ${num(a * n)}.`,
          `The smaller of these is the absolute minimum value, ${num(minValue)}, and the larger is the absolute maximum value, ${num(maxValue)}.`,
          `f is ${w.shape}, so the absolute maximum occurs at the ${w.rising ? "right" : "left"} endpoint, x = ${grouped(w.rising ? hi : lo)}.`,
        ],
        data: { a, b, m, n },
      });
    },
    verify({ data: { a, b, m, n } }) {
      assertNear(a * lg(b, b ** m), a * m, "left endpoint");
      assertNear(a * lg(b, b ** n), a * n, "right endpoint");
      const mid = a * lg(b, (b ** m + b ** n) / 2);
      assert(
        mid <= Math.max(a * m, a * n) + 1e-9 && mid >= Math.min(a * m, a * n) - 1e-9,
        "no interior extremum",
      );
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "additive-transformation",
    skill: "identify-information",
    make(r) {
      const b = r.pick(WHOLE_BASES);
      const a = r.nonzero(-4, 4);
      const k = r.nonzero(-6, 6);
      const n = r.int(1, b >= 5 ? 2 : 3);
      const arg = b ** n - k;
      return problem({
        stem: `Let g(x) = ${a === 1 ? "" : a === -1 ? "−" : `${num(a)} `}${logWord(b)}(${plusK(k)}).`,
        parts: [
          part("Find the domain of g.", ask.interval("Domain:", `(${num(-k)}, ∞)`)),
          part("Find the vertical asymptote of the graph of g.", ask.number("x =", -k)),
          part(
            "Find the x-intercept of the graph of g.",
            ask.number("x-intercept: x =", 1 - k),
          ),
          part(`Find g(${num(arg)}).`, ask.number(`g(${num(arg)}) =`, a * n)),
        ],
        solution: [
          `The input of a logarithm must be positive, so ${plusK(k)} > 0 and x > ${num(-k)}. The domain is (${num(-k)}, ∞).`,
          `The graph of g is the graph of ${aLog(a, b)} shifted ${Math.abs(k) === 1 ? "1 unit" : `${Math.abs(k)} units`} ${k > 0 ? "left" : "right"}, so the vertical asymptote is x = ${num(-k)}.`,
          `g(x) = 0 when ${plusK(k)} = 1, which gives x = ${num(1 - k)}.`,
          `g(${num(arg)}) = ${typedA(a) === "" ? "" : typedA(a) === "−" ? "−" : `${typedA(a)} `}${logWord(b)}(${num(arg)} ${k < 0 ? "−" : "+"} ${Math.abs(k)}) = ${typedA(a) === "" ? "" : typedA(a) === "−" ? "−" : `${typedA(a)} `}${logWord(b)} ${b ** n} = ${Math.abs(a) > 1 ? `${num(a)}(${n}) = ` : ""}${num(a * n)}.`,
        ],
        data: { a, b, k, n, arg },
      });
    },
    verify({ data: { a, b, k, n, arg } }) {
      const g = fnOf(`(${a})*log(x + (${k}), ${b})`);
      assertNear(g(arg), a * n, "evaluation");
      assertNear(g(1 - k), 0, "x-intercept");
      let outside;
      try {
        outside = g(-k - 0.5);
      } catch {
        outside = NaN;
      }
      assert(!Number.isFinite(outside), "outside the domain");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "monotonic",
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
      const kinds = r
        .shuffle(["direction", "curve", "domain", "range", "asymptote", "extrema"])
        .slice(0, 3);
      const claims = kinds.map((kind, i) => claimFor(r, kind, mask[i]));
      return problem({
        stem: "Decide whether each statement about a logarithmic function in general form, f(x) = a log_b x, is true or false.",
        parts: claims.map((c) =>
          part(
            c.statement,
            ask.choice("The statement is", ["true", "false"], c.truth ? "true" : "false"),
          ),
        ),
        solution: claims.map((c) => c.reason),
        data: { claims },
      });
    },
    verify({ data: { claims } }) {
      for (const c of claims)
        assert(typeof c.truth === "boolean" && c.reason.length > 0, "claim");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "monotonic",
    skill: "apply-results",
    make(r) {
      const context = r.pick(CONTEXTS);
      const b = context.base;
      const a = context.a;
      const n = r.int(2, b >= 5 ? 3 : 4);
      const x1 = b ** n;
      return problem({
        stem: context.stem(a, b),
        parts: [
          part(
            `Find ${context.name}(${x1}).`,
            ask.number(
              `${context.name}(${x1}) =`,
              a * n,
              context.unit ? { unit: context.unit } : {},
            ),
          ),
          part(
            context.factorPrompt(b),
            ask.number("Change:", a, context.unit ? { unit: context.unit } : {}),
          ),
          part(
            context.ratePrompt,
            ask.choice(
              "The rate of increase is",
              r.shuffle(["increasing", "decreasing", "constant"]),
              "decreasing",
            ),
          ),
        ],
        solution: [
          `${context.name}(${x1}) = ${a} ${logWord(b)} ${x1}. Since ${b}${sup(n)} = ${x1}, ${logText(b, x1)} = ${n}, so ${context.name}(${x1}) = ${a}(${n}) = ${a * n}.`,
          `Multiplying the input by ${b} adds 1 to ${logWord(b)} of the input, so the output changes by ${a}(1) = ${a}.`,
          `With a > 0 and b > 1 the function is increasing and its graph is concave down, so the output increases at a decreasing rate: each multiplication by ${b} adds the same amount, but the input needed for that increase grows.`,
        ],
        data: { a, b, n },
      });
    },
    verify({ data: { a, b, n } }) {
      assertNear(a * lg(b, b ** n), a * n, "value");
      assertNear(a * lg(b, b ** (n + 1)) - a * lg(b, b ** n), a, "step change");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "additive-transformation",
    skill: "construct-representations",
    make(r) {
      const b = r.pick([2, 3]);
      const k = r.pick([-2, -1, 1, 2, 3]);
      const top = b === 2 ? 3 : 2;
      const marked = Array.from({ length: top + 1 }, (_, i) => [b ** i - k, i]);
      return problem({
        stem: `The graph of g(x) = ${logWord(b)}(x + k), where k is a constant, is shown with its vertical asymptote. Points on the graph are marked.`,
        blocks: [
          graph({
            caption: "The graph of y = g(x)",
            alt: `A logarithmic curve with a vertical asymptote at x = ${num(-k)} passing through ${marked.map((p) => `(${num(p[0])}, ${num(p[1])})`).join(", ")}.`,
            window: { x: [-6, 12], y: [-4, 6] },
            ticks: { x: 2, y: 1 },
            functions: [{ expr: `ln(x + (${k}))/ln(${b})` }],
            asymptotes: [{ x: -k }],
            points: marked.map((p) => ({ at: p })),
          }),
        ],
        parts: [
          part("Find the equation of the vertical asymptote.", ask.number("x =", -k)),
          part("Find k.", ask.number("k =", k)),
          part("Find the domain of g.", ask.interval("Domain:", `(${num(-k)}, ∞)`)),
        ],
        solution: [
          `The dashed line shows the vertical asymptote, x = ${num(-k)}.`,
          `The graph of g is the graph of ${logWord(b)} x shifted ${Math.abs(k) === 1 ? "1 unit" : `${Math.abs(k)} units`} ${k > 0 ? "left" : "right"}, so its asymptote is x = ${num(-k)}. Then k = ${num(k)}. Check: the point (${num(marked[0][0])}, 0) means ${logWord(b)}(${num(marked[0][0])} ${k < 0 ? "−" : "+"} ${Math.abs(k)}) = ${logWord(b)} 1 = 0.`,
          `The domain of g is all x to the right of the asymptote: (${num(-k)}, ∞).`,
        ],
        data: { b, k, marked },
      });
    },
    verify({ data: { b, k, marked } }) {
      const g = fnOf(`log(x + (${k}), ${b})`);
      for (const [x, y] of marked) assertNear(g(x), y, "marked point");
      assert(
        marked.every(([x]) => x > -k),
        "points inside the domain",
      );
    },
  },
];

const CONTEXTS = [
  {
    name: "S",
    factorPrompt: (b) =>
      `Each time the number of hours of practice is multiplied by ${b}, by how much does the skill score change?`,
    ratePrompt:
      "As the number of hours of practice increases, the skill score increases, and the rate of increase is",
    base: 2,
    a: 8,
    unit: "points",
    stem: (a, b) =>
      `A skill score S(h) after h hours of practice is modeled by S(h) = ${a} ${logWord(b)} h, for h ≥ 1.`,
  },
  {
    name: "H",
    factorPrompt: (b) =>
      `Each time the number of weeks is multiplied by ${b}, by how much does the height change?`,
    ratePrompt:
      "As the number of weeks increases, the height increases, and the rate of increase is",
    base: 3,
    a: 15,
    unit: "cm",
    stem: (a, b) =>
      `The height, in centimeters, of a plant after w weeks is modeled by H(w) = ${a} ${logWord(b)} w, for w ≥ 1.`,
  },
  {
    name: "L",
    factorPrompt: (b) =>
      `Each time the number of speakers is multiplied by ${b}, by how much does the loudness change?`,
    ratePrompt:
      "As the number of speakers increases, the loudness increases, and the rate of increase is",
    base: 10,
    a: 10,
    unit: "decibels",
    stem: (a, b) =>
      `The loudness, in decibels, of a group of s identical speakers playing together is modeled by L(s) = ${a} ${logWord(b)} s, for s ≥ 1.`,
  },
  {
    name: "P",
    factorPrompt: (b) =>
      `Each time the number of employees is multiplied by ${b}, by how much does the productivity index change?`,
    ratePrompt:
      "As the number of employees increases, the productivity index increases, and the rate of increase is",
    base: 5,
    a: 12,
    unit: "points",
    stem: (a, b) =>
      `A company models its productivity index with P(e) = ${a} ${logWord(b)} e, where e ≥ 1 is the number of employees on a team.`,
  },
];

// One true or false statement about the general form f(x) = a log_b x.
function claimFor(r, kind, truth) {
  const a = r.nonzero(-4, 4);
  const b = r.pick(BASES);
  const w = behavior(a, b);
  const given = `Let a = ${num(a)} and b = ${text(b)}.`;
  const note = caseNote(a, b);
  if (kind === "direction") {
    const claimed = truth ? w.shape : w.rising ? "decreasing" : "increasing";
    return {
      truth,
      statement: `${given} The function f is always ${claimed}.`,
      reason: `With ${note}, f is always ${w.shape}, so the statement is ${truth ? "true" : "false"}.`,
    };
  }
  if (kind === "curve") {
    const claimed = truth ? w.curve : w.rising ? "concave up" : "concave down";
    return {
      truth,
      statement: `${given} The graph of f is always ${claimed}.`,
      reason: `With ${note}, the graph of f is always ${w.curve}, so the statement is ${truth ? "true" : "false"}.`,
    };
  }
  if (kind === "domain") {
    const claimed = truth ? "x > 0" : r.pick(["x ≥ 0", "all real numbers", "x ≠ 0"]);
    return {
      truth,
      statement: `The domain of f is ${claimed === "all real numbers" ? claimed : `the set of x with ${claimed}`}.`,
      reason: `The domain of a logarithmic function in general form is x > 0, so the statement is ${truth ? "true" : "false"}.`,
    };
  }
  if (kind === "range") {
    const claimed = truth
      ? "all real numbers"
      : r.pick(["all positive real numbers", "all nonnegative real numbers"]);
    return {
      truth,
      statement: `The range of f is ${claimed}.`,
      reason: `The range of a logarithmic function in general form is all real numbers, so the statement is ${truth ? "true" : "false"}.`,
    };
  }
  if (kind === "asymptote") {
    const claimed = truth ? "x = 0" : r.pick(["y = 0", "x = 1", "y = 1"]);
    return {
      truth,
      statement: `The graph of f has the ${claimed.startsWith("x") ? "vertical" : "horizontal"} asymptote ${claimed}.`,
      reason: `The graph of a logarithmic function in general form has the vertical asymptote x = 0 and no horizontal asymptote, so the statement is ${truth ? "true" : "false"}.`,
    };
  }
  return {
    truth,
    statement: truth
      ? "The graph of f has no points of inflection."
      : "The graph of f has exactly one point of inflection.",
    reason: `The graph of a logarithmic function is always concave up or always concave down, so it has no points of inflection and the statement is ${truth ? "true" : "false"}.`,
  };
}

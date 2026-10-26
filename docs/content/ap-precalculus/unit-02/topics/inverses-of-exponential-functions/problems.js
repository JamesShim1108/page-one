// Typed-answer problems for Topic 2.10. Each template draws new numbers for every
// variant. verify() recomputes the logarithms and the inverse relationship from the
// displayed functions, so a slip in a key and a slip in the stem cannot both survive.

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
  roundTo,
  fnOf,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const supInt = (n) => `${n < 0 ? "⁻" : ""}${sup(Math.abs(n))}`;
const asQ = (value) => (value instanceof Q ? value : new Q(value));
const text = (value) =>
  typeof value === "string" ? value : value instanceof Q ? value.toString() : num(value);
const powText = (base, exponent) => {
  const e = asQ(exponent);
  return e.isInteger ? `${base}${supInt(e.n)}` : `${base}^(${e})`;
};
const grouped = (n) => n.toLocaleString("en-US");
const L = (base, argument) => logText(base, text(argument));
const logWord = (b) => (b === 10 ? "log" : `log${sub(b)}`);
// a log_b x in the lessons' style: 3 log₂ x, −log₅ x, log x.
const aLog = (a, b, argument = "x") =>
  `${a === 1 ? "" : a === -1 ? "−" : `${num(a)} `}${logWord(b)} ${argument}`;
// The same function the way a student types it, and as a key the checker reads.
const typed = (a, b) => `${a === 1 ? "" : a === -1 ? "−" : num(a)}${logText(b, "x")}`;
const typedKey = (a, b) => `(${a})*log(x, ${b})`;
const supVar = { t: "ᵗ", n: "ⁿ" };

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "log-general-form",
    skill: "identify-information",
    make(r) {
      const b = r.pick([2, 3, 4, 5, 10]);
      const a = r.nonzero(-5, 5);
      const n = r.int(2, b >= 4 ? 3 : 4);
      const m = r.int(1, b >= 4 ? 2 : 3);
      const failing = r.pick(["a", "b"]);
      let choicePart;
      let choiceSolution;
      if (failing === "b") {
        const bad = r.pick(["b = 1", "b = 0", "b = −2", "b = −3"]);
        const good = r.sample(
          ["b = 2", "b = 3", "b = 5", "b = 10", "b = 1/2", "b = 1/3"],
          3,
        );
        const coefficient = r.pick([2, 3, 4, 5]);
        choicePart = part(
          `For which of these values of b is f(x) = ${coefficient} log_b x NOT in the general form of a logarithmic function?`,
          ask.choice("Not in general form:", r.shuffle([bad, ...good]), bad),
        );
        choiceSolution = `The base of a logarithmic function in general form must satisfy b > 0 and b ≠ 1. ${bad} breaks that rule, and the other values do not.`;
      } else {
        const bad = "a = 0";
        const good = r.sample(
          ["a = 1", "a = −1", "a = 2", "a = −4", "a = 1/2", "a = 5"],
          3,
        );
        const base = r.pick([2, 3, 5, 10]);
        choicePart = part(
          `For which of these values of a is f(x) = a ${logWord(base)} x NOT in the general form of a logarithmic function?`,
          ask.choice("Not in general form:", r.shuffle([bad, ...good]), bad),
        );
        choiceSolution =
          "The coefficient of a logarithmic function in general form must satisfy a ≠ 0. With a = 0 the function is just the constant 0, and the other values are allowed.";
      }
      return problem({
        stem: `Let f(x) = ${aLog(a, b)}.`,
        parts: [
          part(`Find f(${b ** n}).`, ask.number(`f(${b ** n}) =`, a * n)),
          part(`Find f(1/${b ** m}).`, ask.number(`f(1/${b ** m}) =`, -a * m)),
          choicePart,
        ],
        solution: [
          `f(${b ** n}) = ${aLog(a, b, String(b ** n))}. Since ${powText(b, n)} = ${b ** n}, ${L(b, b ** n)} = ${n}, so f(${b ** n}) = ${num(a)}(${n}) = ${num(a * n)}.`,
          `Since ${powText(b, -m)} = 1/${b ** m}, ${L(b, new Q(1, b ** m))} = ${num(-m)}, so f(1/${b ** m}) = ${num(a)}(${num(-m)}) = ${num(-a * m)}.`,
          choiceSolution,
        ],
        data: { a, b, n, m },
      });
    },
    verify({ data: { a, b, n, m } }) {
      assertNear(a * lg(b, b ** n), a * n, "f at a power");
      assertNear(a * lg(b, 1 / b ** m), -a * m, "f at a reciprocal power");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "inverse-pairs",
    skill: "construct-representations",
    make(r) {
      const b = r.pick([2, 3, 4, 5, 10]);
      const exponents = r.pick([
        [-1, 1, 2],
        [0, 1, 2],
        [-1, 0, 2],
        [-1, 1, 3],
        [0, 2, 3],
        [-1, 2, 3],
      ]);
      const pointOf = (s) => [new Q(s), s >= 0 ? new Q(b ** s) : new Q(1, b ** -s)];
      const pts = exponents.map(pointOf);
      const pt = (p) => `(${p[0].toString()}, ${p[1].toString()})`;
      const swapped = (p) => `(${p[1].toString()}, ${p[0].toString()})`;
      const target = r.int(0, 2);
      const t = pts[target];
      const options = r.shuffle([
        swapped(t),
        pt(t),
        `(${asQ(t[1].neg()).toString()}, ${t[0].toString()})`,
        `(${t[1].toString()}, ${t[0].neg().toString()})`,
      ]);
      if (new Set(options).size !== 4) reject("options collide");
      return problem({
        stem: `The points ${pts.map(pt).join(", ")} are on the graph of the exponential function g(x) = ${b}ˣ.`,
        parts: [
          part(
            `List the three corresponding points on the graph of the logarithmic function f(x) = ${L(b, "x").replace("(x)", " x")}.`,
            ask.points(
              "Points on the graph of f:",
              pts.map((p) => [p[1], p[0]]),
            ),
          ),
          part(`Find ${L(b, t[1])}.`, ask.number(`${L(b, t[1])} =`, t[0])),
          part(
            `Which ordered pair is on the graph of f(x) = ${L(b, "x").replace("(x)", " x")} and comes from the point ${pt(t)} on the graph of g?`,
            ask.choice("Ordered pair:", options, swapped(t)),
          ),
        ],
        solution: [
          `The functions f and g are inverses, so each point (s, t) on the graph of g corresponds to the point (t, s) on the graph of f. The points are ${pts.map(swapped).join(", ")}.`,
          `Since ${pt(t)} is on the graph of g, ${swapped(t)} is on the graph of f. So f(${t[1].toString()}) = ${t[0].toString()}, which means ${L(b, t[1])} = ${t[0].toString()}.`,
          `Swapping the coordinates of ${pt(t)} gives ${swapped(t)}.`,
        ],
        data: { b, pts },
      });
    },
    verify({ data: { b, pts } }) {
      for (const p of pts) {
        assertNear(b ** p[0].value, p[1].value, "point on g");
        assertNear(lg(b, p[1].value), p[0].value, "point on f");
      }
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "inverse-pairs",
    skill: "solve",
    make(r) {
      const b = r.pick([2, 3, 4, 5, 10]);
      const c = r.pick([3, 5, 7, 9, 11, 12, 15, 20]);
      const x0 = r.pick([-4, -3, -2, 1.5, 2.5, 3, 4, 6]);
      const k = r.int(2, b >= 4 ? 3 : 5);
      return problem({
        stem: `Let g(x) = ${b}ˣ and f(x) = ${logWord(b)} x. The functions f and g are inverses.`,
        parts: [
          part(`Find g(f(${c})).`, ask.number(`g(f(${c})) =`, c)),
          part(`Find f(g(${num(x0)})).`, ask.number(`f(g(${num(x0)})) =`, x0)),
          part(`Find f(${b ** k}).`, ask.number(`f(${b ** k}) =`, k)),
        ],
        solution: [
          `Inverse functions undo each other, so g(f(x)) = x. Then g(f(${c})) = ${c}.`,
          `Likewise f(g(x)) = x, so f(g(${num(x0)})) = ${num(x0)}.`,
          `Since ${powText(b, k)} = ${b ** k}, f(${b ** k}) = ${L(b, b ** k)} = ${k}.`,
        ],
        data: { b, c, x0, k },
      });
    },
    verify({ data: { b, c, x0, k } }) {
      assertNear(b ** lg(b, c), c, "g(f(c))");
      assertNear(lg(b, b ** x0), x0, "f(g(x0))");
      assertNear(lg(b, b ** k), k, "f(b^k)");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "inverse-relationship",
    skill: "describe",
    make(r) {
      const b = r.pick([2, 3, 4, 5]);
      const a = r.nonzero(-5, 5);
      const k = r.int(2, b >= 4 ? 2 : 4);
      const c = r.int(2, 6);
      const j = r.int(2, 4);
      const options = [
        "additively, as the input changes multiplicatively",
        "multiplicatively, as the input changes additively",
        "additively, as the input changes additively",
        "multiplicatively, as the input changes multiplicatively",
      ];
      return problem({
        stem: "Exponential and logarithmic functions have an inverse relationship in the way inputs and outputs vary together.",
        parts: [
          part(
            `Let f(x) = ${aLog(a, b)}. The input x is multiplied by ${b ** k}. By how much does f(x) change?`,
            ask.number("Change in f(x):", a * k),
          ),
          part(
            `Let g(x) = ${c}(${b})ˣ. The input x increases by ${j}. The output g(x) is multiplied by what number?`,
            ask.number("Factor:", b ** j),
          ),
          part(
            "Logarithmic growth is characterized by output values that change",
            ask.choice("Logarithmic growth:", r.shuffle(options), options[0]),
          ),
        ],
        solution: [
          `Multiplying x by ${b ** k} = ${powText(b, k)} adds ${k} to ${logWord(b)} x. Since f(x) = ${aLog(a, b)}, f(x) changes by ${num(a)}(${k}) = ${num(a * k)}.`,
          `Each increase of 1 in x multiplies g(x) by ${b}. An increase of ${j} multiplies g(x) by ${b}${sup(j)} = ${b ** j}.`,
          "For a logarithmic function, output values change additively as input values change multiplicatively. Exponential functions are the reverse: outputs change multiplicatively as inputs change additively.",
        ],
        data: { a, b, k, c, j },
      });
    },
    verify({ data: { a, b, k, j, c } }) {
      const f = (x) => a * lg(b, x);
      assertNear(f(5 * b ** k) - f(5), a * k, "the change in f");
      const g = (x) => c * b ** x;
      assertNear(g(2 + j) / g(2), b ** j, "the factor");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "inverse-pairs",
    skill: "construct-representations",
    make(r) {
      const b = r.pick([2, 3, 5, 10]);
      const start = r.pick([-2, -1, 0]);
      const exponents = [start, start + 1, start + 2, start + 3];
      const outputs = exponents.map((s) => (s >= 0 ? new Q(b ** s) : new Q(1, b ** -s)));
      const pick = r.int(0, 3);
      return problem({
        stem: `The table gives values of the exponential function g(x) = ${b}ˣ. Let f be the inverse function of g.`,
        blocks: [
          table(
            `Values of g(x) = ${b}ˣ`,
            ["x", ...exponents.map(num)],
            [["g(x)", ...outputs.map((q) => q.toString())]],
          ),
        ],
        parts: [
          part(
            "List the four points on the graph of f that correspond to the values in the table.",
            ask.points(
              "Points on the graph of f:",
              exponents.map((s, i) => [outputs[i], new Q(s)]),
            ),
          ),
          part(
            `Find f(${outputs[pick].toString()}).`,
            ask.number(`f(${outputs[pick].toString()}) =`, exponents[pick]),
          ),
          part(
            "Write an expression for f(x).",
            ask.expr("f(x) =", `log(x, ${b})`, { text: L(b, "x") }),
          ),
        ],
        solution: [
          `Each point (s, t) on the graph of g corresponds to the point (t, s) on the graph of f. The points are ${exponents.map((s, i) => `(${outputs[i].toString()}, ${num(s)})`).join(", ")}.`,
          `(${num(exponents[pick])}, ${outputs[pick].toString()}) is on the graph of g, so (${outputs[pick].toString()}, ${num(exponents[pick])}) is on the graph of f. Then f(${outputs[pick].toString()}) = ${num(exponents[pick])}.`,
          `The inverse of g(x) = ${b}ˣ is f(x) = ${L(b, "x")}.`,
        ],
        data: { b, exponents, outputs },
      });
    },
    verify({ data: { b, exponents, outputs } }) {
      exponents.forEach((s, i) => assertNear(b ** s, outputs[i].value, "table"));
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "inverse-pairs",
    skill: "apply-results",
    make(r) {
      const context = r.pick(CONTEXTS);
      const { base: b, v, input } = context;
      const k = r.int(2, b === 10 ? 5 : b === 2 ? 9 : 5);
      const value = r.int(3, b === 10 ? 4000 : 900);
      const rounded = roundTo(lg(b, value), 3);
      const fraction = lg(b, value) % 1;
      if (fraction < 0.03 || fraction > 0.97) reject("too close to a whole number");
      const key = b === 10 ? `log(${input})` : `log(${input}, ${b})`;
      const shownLog = b === 10 ? `log(${input})` : `log${sub(b)}(${input})`;
      return problem({
        stem: context.stem,
        parts: [
          part(
            `Write ${v} as a function of ${input}.`,
            ask.expr(`${v}(${input}) =`, key, { vars: [input], text: shownLog }),
          ),
          part(
            `Find ${v}(${grouped(b ** k)}).`,
            ask.number(`${v}(${grouped(b ** k)}) =`, k),
          ),
          part(
            `Find ${v}(${grouped(value)}). Round your answer to three decimal places.`,
            ask.number(`${v}(${grouped(value)}) ≈`, rounded, { decimals: 3 }),
          ),
        ],
        solution: [
          `The function ${input}(${v}) = ${b}${supVar[v]} has an initial value of 1, and its inverse is the logarithmic function with base ${b}. So ${v}(${input}) = ${shownLog}.`,
          `Since ${powText(b, k)} = ${grouped(b ** k)}, ${v}(${grouped(b ** k)}) = ${k}.`,
          `Using technology, ${v}(${grouped(value)}) = ${b === 10 ? "log" : `log${sub(b)}`}(${grouped(value)}) ≈ ${rounded.toFixed(3)}.`,
        ],
        data: { b, k, value, rounded, input },
      });
    },
    verify({ data: { b, k, value, rounded } }) {
      assertNear(lg(b, b ** k), k, "power");
      assert(Math.abs(lg(b, value) - rounded) < 0.0006, "rounded value");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "log-general-form",
    skill: "construct-functions",
    make(r) {
      const b = r.pick([2, 3, 4, 5, 10]);
      const a = r.nonzero(-5, 5);
      const n = r.int(2, b >= 4 ? 3 : 4);
      const n2 = r.pick([1, 2, 3, 4].filter((v) => v !== n && b ** v <= 1000));
      return problem({
        stem: `The graph of f(x) = a ${logWord(b)} x, where a is a constant, contains the point (${b ** n}, ${num(a * n)}).`,
        parts: [
          part("Find a.", ask.number("a =", a)),
          part(
            "Write an expression for f(x).",
            ask.expr("f(x) =", typedKey(a, b), { text: typed(a, b) }),
          ),
          part(`Find f(${b ** n2}).`, ask.number(`f(${b ** n2}) =`, a * n2)),
        ],
        solution: [
          `The point (${b ** n}, ${num(a * n)}) is on the graph, so f(${b ** n}) = ${num(a * n)}. Then a ${logWord(b)} ${b ** n} = ${num(a * n)}. Since ${L(b, b ** n)} = ${n}, ${n}a = ${num(a * n)} and a = ${num(a)}.`,
          `With a = ${num(a)}, f(x) = ${aLog(a, b)}.`,
          `f(${b ** n2}) = ${aLog(a, b, String(b ** n2))} = ${num(a)}(${n2}) = ${num(a * n2)}.`,
        ],
        data: { a, b, n, n2 },
      });
    },
    verify({ data: { a, b, n, n2 } }) {
      const f = fnOf(typedKey(a, b));
      assertNear(f(b ** n), a * n, "the given point");
      assertNear(f(b ** n2), a * n2, "the evaluation");
      assert(n2 !== n, "different inputs");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "inverse-relationship",
    skill: "support-conclusions",
    make(r) {
      const kind = r.pick(["linear", "exponential", "logarithmic"]);
      let xs;
      let ys;
      let constantPrompt;
      let constant;
      let nextX;
      let nextY;
      let reason;
      if (kind === "linear") {
        const x0 = r.int(0, 3);
        const dx = r.pick([1, 2]);
        const y0 = r.int(-4, 5);
        const dy = r.nonzero(-5, 5);
        xs = [0, 1, 2, 3, 4].map((i) => x0 + i * dx);
        ys = [0, 1, 2, 3, 4].map((i) => y0 + i * dy);
        constantPrompt = `By how much does y change each time x increases by ${dx}?`;
        constant = dy;
        nextX = x0 + 5 * dx;
        nextY = y0 + 5 * dy;
        reason = `The inputs increase additively (by ${dx}) and the outputs change additively (by ${num(dy)}), which is the pattern of a linear function. Continuing the pattern, y = ${num(ys[4])} ${dy < 0 ? "−" : "+"} ${Math.abs(dy)} = ${num(nextY)}.`;
      } else if (kind === "exponential") {
        const x0 = r.int(0, 3);
        const y0 = r.int(1, 4);
        const factor = r.pick([2, 3]);
        xs = [0, 1, 2, 3, 4].map((i) => x0 + i);
        ys = [0, 1, 2, 3, 4].map((i) => y0 * factor ** i);
        constantPrompt = "By what factor is y multiplied each time x increases by 1?";
        constant = factor;
        nextX = x0 + 5;
        nextY = y0 * factor ** 5;
        reason = `The inputs increase additively (by 1) and the outputs change multiplicatively (by a factor of ${factor}), which is the pattern of an exponential function. Continuing the pattern, y = ${grouped(ys[4])}(${factor}) = ${grouped(nextY)}.`;
      } else {
        const x0 = r.pick([1, 2, 3]);
        const factor = r.pick([2, 3]);
        const y0 = r.int(-3, 4);
        const d = r.nonzero(-4, 4);
        xs = [0, 1, 2, 3, 4].map((i) => x0 * factor ** i);
        ys = [0, 1, 2, 3, 4].map((i) => y0 + i * d);
        constantPrompt = `By how much does y change each time x is multiplied by ${factor}?`;
        constant = d;
        nextX = x0 * factor ** 5;
        nextY = y0 + 5 * d;
        reason = `The inputs change multiplicatively (by a factor of ${factor}) and the outputs change additively (by ${num(d)}), which is the pattern of a logarithmic function. Continuing the pattern, y = ${num(ys[4])} ${d < 0 ? "−" : "+"} ${Math.abs(d)} = ${num(nextY)}.`;
      }
      return problem({
        stem: "The table gives values of a function that is linear, exponential, or logarithmic.",
        blocks: [
          table(
            "Values of a function",
            ["x", ...xs.map(grouped)],
            [["y", ...ys.map((y) => (Math.abs(y) >= 1000 ? grouped(y) : num(y)))]],
          ),
        ],
        parts: [
          part(
            "Which type of function is consistent with the table?",
            ask.choice(
              "Type of function:",
              r.shuffle(["linear", "exponential", "logarithmic"]),
              kind,
            ),
          ),
          part(constantPrompt, ask.number("Answer:", constant)),
          part(
            `Assuming the pattern continues, find y when x = ${grouped(nextX)}.`,
            ask.number(`y(${grouped(nextX)}) =`, nextY),
          ),
        ],
        solution: [
          reason,
          `The constant change in the table is ${num(constant)}.`,
          `y(${grouped(nextX)}) = ${num(nextY)}.`,
        ],
        data: { kind, xs, ys, nextX, nextY, constant },
      });
    },
    verify({ data: { kind, xs, ys, nextX, nextY, constant } }) {
      if (kind === "linear") {
        const slope = (ys[1] - ys[0]) / (xs[1] - xs[0]);
        for (let i = 1; i < 5; i += 1)
          assertNear((ys[i] - ys[i - 1]) / (xs[i] - xs[i - 1]), slope, "constant slope");
        assertNear(ys[4] + slope * (nextX - xs[4]), nextY, "linear next");
        assertNear(slope * (xs[1] - xs[0]), constant, "constant");
      } else if (kind === "exponential") {
        for (let i = 1; i < 5; i += 1)
          assertNear(ys[i] / ys[i - 1], constant, "constant ratio");
        assertNear(ys[4] * constant, nextY, "exponential next");
      } else {
        const factor = xs[1] / xs[0];
        for (let i = 1; i < 5; i += 1) {
          assertNear(xs[i] / xs[i - 1], factor, "constant x ratio");
          assertNear(ys[i] - ys[i - 1], constant, "constant difference");
        }
        assertNear(nextX, xs[4] * factor, "next x");
        assertNear(ys[4] + constant, nextY, "log next");
      }
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "inverse-pairs",
    skill: "equivalent-forms",
    make(r) {
      const b = r.pick([2, 3, 4, 5, 6, 7]);
      const n = r.int(2, b >= 5 ? 3 : 4);
      const n2 = r.pick([1, 2, 3].filter((v) => v !== n));
      return problem({
        stem: `The graph of f(x) = log_b x, where b > 0 and b ≠ 1, contains the point (${b ** n}, ${n}). Let g be the inverse function of f.`,
        parts: [
          part("Find b.", ask.number("b =", b)),
          part(
            "Write an expression for g(x).",
            ask.expr("g(x) =", `${b}^x`, { text: `${b}ˣ` }),
          ),
          part(`Find f(${b ** n2}).`, ask.number(`f(${b ** n2}) =`, n2)),
        ],
        solution: [
          `The point (${b ** n}, ${n}) is on the graph of f, so ${L("b", b ** n).replace("logb", "log_b")} = ${n}. In exponential form, b${sup(n)} = ${b ** n}. Since ${powText(b, n)} = ${b ** n} and b > 0, b = ${b}.`,
          `The inverse of f(x) = ${L(b, "x")} is g(x) = ${b}ˣ.`,
          `Since ${powText(b, n2)} = ${b ** n2}, f(${b ** n2}) = ${L(b, b ** n2)} = ${n2}.`,
        ],
        data: { b, n, n2 },
      });
    },
    verify({ data: { b, n, n2 } }) {
      assertNear(lg(b, b ** n), n, "the given point");
      const g = fnOf(`${b}^x`);
      assertNear(g(n), b ** n, "g inverts f");
      assertNear(lg(b, g(n2)), n2, "round trip");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "inverse-pairs",
    skill: "solve",
    make(r) {
      const b = r.pick([2, 3]);
      const top = b === 2 ? 3 : 2;
      const exponents = Array.from({ length: top + 1 }, (_, i) => i);
      const marked = exponents.map((s) => [s, b ** s]);
      const ask1 = r.int(1, top);
      const ask2 = r.pick(exponents.filter((s) => s >= 1 && s !== ask1));
      const options = r.shuffle(["x = 0", "y = 0", "x = 1", "y = 1"]);
      return problem({
        stem: `The graph of the exponential function g(x) = ${b}ˣ is shown. Points with integer coordinates are marked. Let f be the inverse function of g.`,
        blocks: [
          graph({
            caption: `The graph of y = ${b}ˣ`,
            alt: `An increasing exponential curve passing through ${marked.map((p) => `(${p[0]}, ${p[1]})`).join(", ")}.`,
            window: { x: [-3, 5], y: [-2, 10] },
            ticks: { x: 1, y: 1 },
            functions: [{ expr: `${b}^x` }],
            points: marked.map((p) => ({ at: p })),
          }),
        ],
        parts: [
          part(`Find f(${b ** ask1}).`, ask.number(`f(${b ** ask1}) =`, ask1)),
          part(`Find f(${b ** ask2}).`, ask.number(`f(${b ** ask2}) =`, ask2)),
          part(
            "The graph of f has a vertical asymptote. What is its equation?",
            ask.choice("Vertical asymptote:", options, "x = 0"),
          ),
        ],
        solution: [
          `The point (${ask1}, ${b ** ask1}) is on the graph of g, so (${b ** ask1}, ${ask1}) is on the graph of f. Then f(${b ** ask1}) = ${ask1}.`,
          `The point (${ask2}, ${b ** ask2}) is on the graph of g, so f(${b ** ask2}) = ${ask2}.`,
          `The graph of g has the horizontal asymptote y = 0. Reflecting over the line y = x swaps the roles of x and y, so the graph of f has the vertical asymptote x = 0.`,
        ],
        data: { b, marked, ask1, ask2 },
      });
    },
    verify({ data: { b, marked, ask1, ask2 } }) {
      for (const [s, t] of marked) assertNear(b ** s, t, "marked point");
      assertNear(lg(b, b ** ask1), ask1, "first reading");
      assertNear(lg(b, b ** ask2), ask2, "second reading");
      assert(ask1 !== ask2, "different readings");
    },
  },
];

const CONTEXTS = [
  {
    stem: "A single bacterium divides into two cells every hour. The number of cells after t hours is N(t) = 2ᵗ.",
    base: 2,
    v: "t",
    input: "N",
  },
  {
    stem: "A rumor starts with one person. Each day, the number of people who have heard it triples, so after t days N(t) = 3ᵗ people have heard it.",
    base: 3,
    v: "t",
    input: "N",
  },
  {
    stem: "On a certain scale, a reading of n corresponds to a sound intensity of R(n) = 10ⁿ times a reference intensity.",
    base: 10,
    v: "n",
    input: "R",
  },
  {
    stem: "A chain letter starts with one letter. Each week, the number of letters in circulation is multiplied by 5, so after t weeks there are N(t) = 5ᵗ letters.",
    base: 5,
    v: "t",
    input: "N",
  },
];

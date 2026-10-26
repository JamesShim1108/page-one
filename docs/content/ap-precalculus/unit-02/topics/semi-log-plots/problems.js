// Typed-answer problems for Topic 2.15. Each template draws new numbers for every
// variant. verify() recomputes every logarithm and every model from the displayed
// information, so a slip in a key and a slip in the stem cannot both survive.

import {
  ask,
  part,
  problem,
  table,
  graph,
  num,
  fixed,
  Q,
  roundTo,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const grouped = (n) => n.toLocaleString("en-US");
const log10 = Math.log10;
const three = (value) => fixed(value, 3);
const plusC = (c) => `${c < 0 ? "−" : "+"} ${Math.abs(c)}`;
const decimal = (q) => roundTo(q.n / q.d, 6);
// m(t) with a negative slope in parentheses.
const times = (m, t) => (m < 0 ? `(${num(m)})(${t})` : `${num(m)}(${t})`);
const tenPower = (e) =>
  e === 0 ? "1" : e === 1 ? "10" : `10 raised to the power ${e} = ${grouped(10 ** e)}`;
// The line "log y = 0.3x + 2" with the right sign in front of the intercept.
const lineText = (name, m, c) => `${name} = ${num(m)}x ${plusC(c)}`;

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "semi-log",
    skill: "identify-information",
    make(r) {
      const kind = r.pick(["exp", "exp", "lin", "quad"]);
      const xs = [0, 1, 2, 3, 4];
      let ys;
      if (kind === "exp") {
        const a = r.pick([2, 3, 4, 5]);
        const b = r.pick([2, 3, 4, 5, 6, 7]);
        ys = xs.map((x) => a * b ** x);
      } else if (kind === "lin") {
        const m = r.pick([3, 4, 5, 6]);
        const c = r.pick([5, 10, 20]);
        ys = xs.map((x) => c + m * x);
      } else {
        const k = r.pick([2, 3, 4]);
        const c = r.pick([3, 5, 10]);
        ys = xs.map((x) => c + k * x * x);
      }
      const logs = ys.map((y) => log10(y));
      const d1 = logs[1] - logs[0];
      const d2 = logs[4] - logs[3];
      const exponential = kind === "exp";
      if (!exponential && Math.abs(d1 - d2) < 0.05) reject("changes too close");
      const options = ["appropriate", "not appropriate"];
      return problem({
        stem: "The table shows a data set. A semi-log plot of the data graphs log y against x, where log is the common logarithm.",
        blocks: [
          table("Data set", ["x", ...xs.map(String)], [["y", ...ys.map(grouped)]]),
        ],
        parts: [
          part(
            "Find the change in log y from x = 0 to x = 1. Round your answer to two decimal places.",
            ask.number("Change ≈", roundTo(d1, 2), { decimals: 2 }),
          ),
          part(
            "Find the change in log y from x = 3 to x = 4. Round your answer to two decimal places.",
            ask.number("Change ≈", roundTo(d2, 2), { decimals: 2 }),
          ),
          part(
            "Is an exponential model appropriate for the data?",
            ask.choice(
              "An exponential model is",
              r.shuffle(options),
              exponential ? "appropriate" : "not appropriate",
            ),
          ),
        ],
        solution: [
          `The values of log y are ${logs.map(three).join(", ")} for x = 0 through 4. From x = 0 to x = 1, the change is ${three(logs[1])} − ${three(logs[0])} ≈ ${fixed(d1, 2)}.`,
          `From x = 3 to x = 4, the change is ${three(logs[4])} − ${three(logs[3])} ≈ ${fixed(d2, 2)}.`,
          exponential
            ? `Log y changes by the same amount, about ${fixed(d1, 2)}, each time x increases by 1. The points of the semi-log plot lie on a line, so an exponential model is appropriate.`
            : `Log y does not change by a constant amount (${fixed(d1, 2)} compared with ${fixed(d2, 2)}), so the points of the semi-log plot do not lie on a line. An exponential model is not appropriate.`,
        ],
        data: { exponential, d1, d2, ys, xs },
      });
    },
    verify({ data: { exponential, d1, d2, ys } }) {
      if (exponential) {
        assertNear(d1, d2, "constant change");
        assert(Math.abs(ys[1] / ys[0] - ys[2] / ys[1]) < 1e-9, "constant ratio");
      } else {
        assert(Math.abs(d1 - d2) >= 0.05, "visible difference");
      }
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "linearization",
    skill: "construct-functions",
    make(r) {
      const a = r.pick([2, 3, 4, 5, 6, 7]);
      const b = r.pick([2, 3, 4, 5, 6, 7].filter((v) => v !== a));
      const natural = r.chance(0.3);
      const L = natural ? "ln" : "log";
      const f = natural ? Math.log : log10;
      const k = r.int(2, 4);
      const slope = roundTo(f(b), 3);
      const icpt = roundTo(f(a), 3);
      const value = roundTo(f(a) + k * f(b), 2);
      return problem({
        stem: `An exponential function is given by y = ${a}(${b})ˣ. A semi-log plot of the function graphs ${L} y against x, and the points lie on a line.`,
        parts: [
          part(
            "Find the slope of the line. Round your answer to three decimal places.",
            ask.number("Slope ≈", slope, { decimals: 3 }),
          ),
          part(
            "Find the vertical intercept of the line. Round your answer to three decimal places.",
            ask.number("Intercept ≈", icpt, { decimals: 3 }),
          ),
          part(
            `Use the line to find ${L} y when x = ${k}. Round your answer to two decimal places.`,
            ask.number(`${L} y ≈`, value, { decimals: 2 }),
          ),
        ],
        solution: [
          `Take ${L} of both sides of y = ${a}(${b})ˣ: ${L} y = ${L} ${a} + x ${L} ${b}. So ${L} y = (${L} ${b})x + ${L} ${a}, and the slope is ${L} ${b} ≈ ${three(slope)}.`,
          `The vertical intercept is ${L} ${a} ≈ ${three(icpt)}.`,
          `${L} y ≈ ${three(slope)}(${k}) + ${three(icpt)} ≈ ${fixed(value, 2)}. Check: ${L} ${a * b ** k} ≈ ${fixed(value, 2)}.`,
        ],
        data: { a, b, k, f, slope, icpt, value },
      });
    },
    verify({ data: { a, b, k, f, slope, icpt, value } }) {
      assertNear(f(b), slope, "slope", 0.0006);
      assertNear(f(a), icpt, "intercept", 0.0006);
      assertNear(f(a * b ** k), value, "value", 0.006);
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "linearization",
    skill: "solve",
    make(r) {
      const m = r.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 1.5]);
      const c = r.pick([0.5, 1, 1.5, 2, 2.5, 3]);
      const x0 = r.int(2, 8);
      const s = roundTo(c + m * x0, 4);
      const b = roundTo(10 ** m, 3);
      const a = roundTo(10 ** c, 3);
      return problem({
        stem: `A semi-log plot of a data set that follows y = a(b)ˣ is a line with equation log y = ${num(m)}x ${plusC(c)}, where log is the common logarithm.`,
        parts: [
          part(
            "Find b. Round your answer to three decimal places.",
            ask.number("b ≈", b, { decimals: 3 }),
          ),
          part(
            "Find a. Round your answer to three decimal places.",
            ask.number("a ≈", a, { decimals: 3 }),
          ),
          part(`For what value of x is log y = ${num(s)}?`, ask.number("x =", x0)),
        ],
        solution: [
          `For y = a(b)ˣ, the semi-log line is log y = (log b)x + log a. So log b = ${num(m)} and b = 10 raised to the power ${num(m)} ≈ ${b.toFixed(3)}.`,
          `Also log a = ${num(c)}, so a = 10 raised to the power ${num(c)} ≈ ${a.toFixed(3)}.`,
          `Solve ${num(m)}x ${plusC(c)} = ${num(s)}: ${num(m)}x = ${num(roundTo(s - c, 4))}, so x = ${x0}.`,
        ],
        data: { m, c, x0, s, b, a },
      });
    },
    verify({ data: { m, c, x0, s, b, a } }) {
      assertNear(log10(b), m, "log b", 0.0006);
      assertNear(log10(a), c, "log a", 0.0006);
      assertNear(m * x0 + c, s, "line value");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "semi-log",
    skill: "identify-information",
    make(r) {
      const shape = r.pick([
        { rise: 1, run: 4, n: 3 },
        { rise: 1, run: 2, n: 4 },
        { rise: 1, run: 1, n: 5 },
        { rise: 3, run: 2, n: 3 },
      ]);
      const c = r.pick([1, 2, 3]);
      const pts = Array.from({ length: shape.n }, (_, i) => [
        shape.run * i,
        c + shape.rise * i,
      ]);
      const m = new Q(shape.rise, shape.run);
      const [xEnd, yEnd] = pts[pts.length - 1];
      const ratioText = `${shape.rise}/${shape.run}`;
      const fraction =
        ratioText === m.toString() ? ratioText : `${ratioText} = ${m.toString()}`;
      return problem({
        stem: "The graph shows a semi-log plot of a data set, with log y on the vertical axis and x on the horizontal axis. The data follow y = a(b)ˣ, and the marked points have integer coordinates.",
        blocks: [
          graph({
            caption: "Semi-log plot of a data set, log y against x",
            alt: `A line through the points ${pts.map(([x, y]) => `(${num(x)}, ${num(y)})`).join(", ")}.`,
            window: { x: [-1, xEnd + 1], y: [0, yEnd + 1] },
            ticks: { x: 1, y: 1 },
            functions: [{ expr: `(${shape.rise}/${shape.run})*x+${c}` }],
            points: pts.map((at) => ({ at })),
          }),
        ],
        parts: [
          part("Find the slope of the line.", ask.number("Slope =", m)),
          part(
            "Find b. Round your answer to three decimal places.",
            ask.number("b ≈", roundTo(10 ** (shape.rise / shape.run), 3), {
              decimals: 3,
            }),
          ),
          part("Find a.", ask.number("a =", 10 ** c)),
        ],
        solution: [
          `The line passes through (${pts[0][0]}, ${pts[0][1]}) and (${pts[1][0]}, ${pts[1][1]}). The slope is the rise over the run: ${fraction}.`,
          `The slope of the semi-log line is log b, so log b = ${m.toString()} and b = ${shape.rise === shape.run ? "10" : `10 raised to the power ${m.toString()} ≈ ${roundTo(10 ** (shape.rise / shape.run), 3).toFixed(3)}`}.`,
          `The vertical intercept is log a = ${c}, so a = ${tenPower(c)}.`,
        ],
        data: { shape, c, pts },
      });
    },
    verify({ data: { shape, c, pts } }) {
      pts.forEach(([x, y]) => {
        assert(Number.isInteger(x) && Number.isInteger(y), "lattice point");
        assertNear(y, c + (shape.rise / shape.run) * x, "on the line");
      });
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "linearization",
    skill: "construct-representations",
    make(r) {
      const a = r.pick([2, 3, 4, 5, 6]);
      const b = r.pick([2, 3, 4, 5]);
      const xs = [1, 2, 3, 4];
      const ys = xs.map((x) => a * b ** x);
      const logs = ys.map((y) => log10(y));
      const slope = roundTo((logs[3] - logs[0]) / 3, 3);
      const icpt = roundTo(log10(a), 2);
      return problem({
        stem: "The table shows data that follow an exponential model y = a(b)ˣ, where a and b are positive integers. A semi-log plot of the data graphs log y against x, where log is the common logarithm.",
        blocks: [
          table("Data set", ["x", ...xs.map(String)], [["y", ...ys.map(grouped)]]),
        ],
        parts: [
          part(
            "Find the slope of the line through the first and last points of the semi-log plot. Round your answer to three decimal places.",
            ask.number("Slope ≈", slope, { decimals: 3 }),
          ),
          part(
            "Find the vertical intercept of the line. Round your answer to two decimal places.",
            ask.number("Intercept ≈", icpt, { decimals: 2 }),
          ),
          part(
            "Write the exponential model, using integers for a and b.",
            ask.expr("y =", `${a}*${b}^x`, { form: "exponential", text: `${a}(${b})ˣ` }),
          ),
        ],
        solution: [
          `The points of the semi-log plot are ${xs.map((x, i) => `(${x}, ${three(logs[i])})`).join(", ")}. The slope through the first and last points is (${three(logs[3])} − ${three(logs[0])})/3 ≈ ${three(slope)}.`,
          `The vertical intercept is log y at x = 0: ${three(logs[0])} − ${three(slope)}(1) ≈ ${fixed(icpt, 2)}.`,
          `The slope is log b ≈ ${three(slope)}, so b = 10 raised to the power ${three(slope)} ≈ ${b}. The intercept is log a ≈ ${fixed(icpt, 2)}, so a ≈ ${a}. The model is y = ${a}(${b})ˣ.`,
        ],
        data: { a, b, xs, ys, slope, icpt },
      });
    },
    verify({ data: { a, b, xs, ys, slope, icpt } }) {
      xs.forEach((x, i) => assert(ys[i] === a * b ** x, "table value"));
      assertNear(log10(b), slope, "slope", 0.0006);
      assertNear(log10(a), icpt, "intercept", 0.006);
      assertNear(10 ** slope, b, "base", 0.01 * b);
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "linearization",
    skill: "solve",
    make(r) {
      const base = r.pick(BASES);
      const m = r.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.8]);
      const c = r.pick([1, 1.5, 2, 2.5, 3, 4]);
      const target = r.pick(base.targets);
      const x = (base.f(target) - c) / m;
      if (x < 1 || x > 40) reject("x out of range");
      const b = roundTo(base.g(m), 3);
      const a = roundTo(base.g(c), 3);
      return problem({
        stem: `A semi-log plot of a data set that follows y = a(b)ˣ graphs ${base.name} y against x, where ${base.words}. The points lie on the line ${lineText(`${base.name} y`, m, c)}.`,
        parts: [
          part(
            "Find b. Round your answer to three decimal places.",
            ask.number("b ≈", b, { decimals: 3 }),
          ),
          part(
            "Find a. Round your answer to three decimal places.",
            ask.number("a ≈", a, { decimals: 3 }),
          ),
          part(
            `For what value of x does the model give y = ${target}? Round your answer to two decimal places.`,
            ask.number("x ≈", roundTo(x, 2), { decimals: 2 }),
          ),
        ],
        solution: [
          `For y = a(b)ˣ, the semi-log line is ${base.name} y = (${base.name} b)x + ${base.name} a. So ${base.name} b = ${num(m)}, and b = ${base.power(num(m))} ≈ ${b.toFixed(3)}.`,
          `Also ${base.name} a = ${num(c)}, so a = ${base.power(num(c))} ≈ ${a.toFixed(3)}.`,
          `Set y = ${target}: ${base.name} ${target} = ${num(m)}x ${plusC(c)}, so x = (${base.name} ${target} − ${num(c)})/${num(m)} ≈ ${roundTo(x, 2).toFixed(2)}.`,
        ],
        data: { base, m, c, target, x, b, a },
      });
    },
    verify({ data: { base, m, c, target, x, b, a } }) {
      assertNear(base.f(b), m, "log b", 0.0006);
      assertNear(base.f(a), c, "log a", 0.0006);
      assertNear(m * x + c, base.f(target), "solution");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "linearization",
    skill: "apply-results",
    make(r) {
      const context = r.pick(LINES);
      const m = r.pick(context.slopes);
      const c = r.pick([2, 3, 4]);
      const t1 = r.pick([0, 1, 2, 3]);
      const d = r.pick([2, 4, 5, 10]);
      const t2 = t1 + d;
      const T = r.pick([1, 2, 3]) * m.d;
      const e = c + decimal(m) * T;
      if (T < 4 || T > 20 || T <= t2) reject("prediction time out of range");
      if (e < 0 || e > 7) reject("exponent out of range");
      const mDec = decimal(m);
      const y1 = roundTo(c + mDec * t1, 4);
      const y2 = roundTo(c + mDec * t2, 4);
      if (y1 < 0.5 || y2 < 0.5) reject("log values too small");
      const factor = roundTo(10 ** mDec, 3);
      const ex = Math.round(e);
      const { sym, per } = context;
      return problem({
        stem: `${context.stem} The points lie on a line through (${t1}, ${num(y1)}) and (${t2}, ${num(y2)}).`,
        parts: [
          part("Find the slope of the line.", ask.number("Slope =", mDec)),
          part(
            `By what factor is ${sym} multiplied each ${per}? Round your answer to three decimal places.`,
            ask.number("Factor ≈", factor, { decimals: 3 }),
          ),
          part(
            `Use the line to find the predicted value of ${sym} when t = ${T}.`,
            ask.number(`${sym}(${T}) =`, 10 ** ex),
          ),
        ],
        solution: [
          `The slope is the change in log ${sym} divided by the change in t: (${num(y2)} − ${num(y1)})/(${t2} − ${t1}) = ${num(roundTo(y2 - y1, 4))}/${d} = ${num(mDec)}.`,
          `The slope of the semi-log line is log b, so log b = ${num(mDec)} and b = 10 raised to the power ${num(mDec)} ≈ ${factor.toFixed(3)}. So ${sym} is multiplied by about ${factor.toFixed(3)} each ${per}.`,
          `The intercept is ${num(y1)} − ${times(mDec, t1)} = ${num(c)}, so the line is log ${sym} = ${num(mDec)}t ${plusC(c)}. At t = ${T}, log ${sym} = ${times(mDec, T)} ${plusC(c)} = ${num(ex)}, so ${sym} = ${tenPower(ex)}.`,
        ],
        data: { m: mDec, c, t1, t2, y1, y2, T, e, factor },
      });
    },
    verify({ data: { m, c, t1, t2, y1, y2, T, e, factor } }) {
      assertNear(m * t1 + c, y1, "first point");
      assertNear(m * t2 + c, y2, "second point");
      assertNear((y2 - y1) / (t2 - t1), m, "slope");
      assertNear(Math.round(e), e, "whole exponent");
      assertNear(10 ** m, factor, "factor", 0.0006);
      assert(T > t2, "prediction beyond the data");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "semi-log",
    skill: "support-conclusions",
    make(r) {
      const a = r.pick([2, 3, 5]);
      const b = r.pick([2, 3, 4, 5, 6, 7]);
      const mask = r.pick([
        [true, true, false],
        [true, false, true],
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      const kinds = r.shuffle(["slope", "intercept", "step", "general"]).slice(0, 3);
      const claims = kinds.map((kind, idx) => claimFor(r, kind, mask[idx], { a, b }));
      return problem({
        stem: `A data set follows the model y = ${a}(${b})ˣ. A semi-log plot of the data graphs log y against x, where log is the common logarithm. Decide whether each statement is true or false.`,
        parts: claims.map((c) =>
          part(
            c.statement,
            ask.choice("The statement is", ["true", "false"], c.truth ? "true" : "false"),
          ),
        ),
        solution: claims.map((c) => c.reason),
        data: { a, b, claims },
      });
    },
    verify({ data: { a, b, claims } }) {
      assertNear(log10(a * b ** 3) - log10(a * b ** 2), log10(b), "constant step");
      for (const c of claims)
        assert(typeof c.truth === "boolean" && c.reason.length > 0, "claim");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "linearization",
    skill: "apply-results",
    make(r) {
      const context = r.pick(MODELS);
      const a = r.pick(context.aList);
      const b = r.pick(context.bList);
      const F = r.pick(context.multipliers);
      const Y = roundTo(a * F, 2);
      const t = Math.log(F) / Math.log(b);
      if (t < 2 || t > 12) reject("time out of range");
      const slope = roundTo(log10(b), 3);
      const icpt = roundTo(log10(a), 3);
      return problem({
        stem: `${context.stem(a, b)} A semi-log plot of the model graphs log ${context.sym} against t, where log is the common logarithm, and the points lie on a line.`,
        parts: [
          part(
            "Find the slope of the line. Round your answer to three decimal places.",
            ask.number("Slope ≈", slope, { decimals: 3 }),
          ),
          part(
            "Find the vertical intercept of the line. Round your answer to three decimal places.",
            ask.number("Intercept ≈", icpt, { decimals: 3 }),
          ),
          part(
            `${context.question(Y)} Round your answer to one decimal place.`,
            ask.number("t ≈", roundTo(t, 1), { decimals: 1 }),
          ),
        ],
        solution: [
          `Taking logarithms gives log ${context.sym} = (log ${b})t + log ${a}, so the slope is log ${b} ≈ ${three(slope)}.`,
          `The vertical intercept is log ${a} ≈ ${three(icpt)}.`,
          `Set ${context.sym} = ${grouped(Y)}: log ${grouped(Y)} = (log ${b})t + log ${a}, so t = (log ${grouped(Y)} − log ${a})/log ${b} ≈ ${roundTo(t, 1).toFixed(1)} ${context.unit}.`,
        ],
        data: { a, b, Y, t, slope, icpt },
      });
    },
    verify({ data: { a, b, Y, t, slope, icpt } }) {
      assertNear(log10(b), slope, "slope", 0.0006);
      assertNear(log10(a), icpt, "intercept", 0.0006);
      assertNear(log10(a) + t * log10(b), log10(Y), "time");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "semi-log",
    skill: "construct-representations",
    make(r) {
      const m = r.pick([0.2, 0.25, 0.4, 0.5, 0.75]);
      const c = r.pick([0.5, 1, 1.5, 2]);
      const xs = [1, 2, 3, 4];
      const logs = xs.map((x) => roundTo(c + m * x, 4));
      const ys = logs.map((l) => Number((10 ** l).toPrecision(4)));
      return problem({
        stem: "The table shows data that follow an exponential model. A semi-log plot of the data graphs log y against x, where log is the common logarithm.",
        blocks: [
          table("Data set", ["x", ...xs.map(String)], [["y", ...ys.map(grouped)]]),
        ],
        parts: [
          part(
            `Find the log y coordinate of the point of the semi-log plot at x = ${xs[0]}. Round your answer to three decimal places.`,
            ask.number("log y ≈", logs[0], { decimals: 3 }),
          ),
          part(
            `Find the log y coordinate of the point of the semi-log plot at x = ${xs[2]}. Round your answer to three decimal places.`,
            ask.number("log y ≈", logs[2], { decimals: 3 }),
          ),
          part(
            "Find the slope of the line through the points of the semi-log plot. Round your answer to three decimal places.",
            ask.number("Slope ≈", m, { decimals: 3 }),
          ),
        ],
        solution: [
          `At x = ${xs[0]}, y = ${grouped(ys[0])}, so log y = log ${grouped(ys[0])} ≈ ${three(logs[0])}.`,
          `At x = ${xs[2]}, y = ${grouped(ys[2])}, so log y = log ${grouped(ys[2])} ≈ ${three(logs[2])}.`,
          `The points are ${xs.map((x, i) => `(${x}, ${three(logs[i])})`).join(", ")}. They lie on a line with slope (${three(logs[3])} − ${three(logs[0])})/${xs[3] - xs[0]} = ${num(m)}.`,
        ],
        data: { m, c, xs, logs, ys },
      });
    },
    verify({ data: { m, c, xs, logs, ys } }) {
      xs.forEach((x, i) => {
        assertNear(log10(ys[i]), logs[i], "log y", 0.0006);
        assertNear(logs[i], c + m * x, "line");
      });
    },
  },
];

const BASES = [
  {
    name: "ln",
    words: "ln is the natural logarithm",
    f: Math.log,
    g: Math.exp,
    power: (t) => `e raised to the power ${t}`,
    targets: [50, 100, 200, 500, 1000],
  },
  {
    name: "log₂",
    words: "log₂ is the base-2 logarithm",
    f: Math.log2,
    g: (t) => 2 ** t,
    power: (t) => `2 raised to the power ${t}`,
    targets: [30, 50, 100, 200, 500],
  },
];

const LINES = [
  {
    sym: "P",
    per: "hour",
    stem: "A biologist graphs log P against t, where P is the number of bacteria in a culture t hours after the start.",
    slopes: [new Q(1, 5), new Q(1, 4), new Q(3, 10), new Q(2, 5), new Q(1, 2)],
  },
  {
    sym: "F",
    per: "week",
    stem: "An analyst graphs log F against t, where F is the number of followers of a social media account t weeks after it opens.",
    slopes: [new Q(1, 5), new Q(1, 4), new Q(3, 10), new Q(2, 5)],
  },
  {
    sym: "C",
    per: "hour",
    stem: "A pharmacist graphs log C against t, where C is the concentration of a medication in a patient's blood, in milligrams per liter, t hours after a dose.",
    slopes: [new Q(-1, 10), new Q(-1, 5), new Q(-3, 10), new Q(-1, 4)],
  },
  {
    sym: "V",
    per: "year",
    stem: "A buyer graphs log V against t, where V is the value of a vehicle, in dollars, t years after it is purchased.",
    slopes: [new Q(-1, 10), new Q(-1, 5), new Q(-3, 10)],
  },
];

const MODELS = [
  {
    sym: "P",
    unit: "hours",
    aList: [100, 200, 500, 1000],
    bList: [1.5, 2, 3],
    multipliers: [10, 20, 50, 100],
    stem: (a, b) =>
      `The number of bacteria P in a culture t hours after the start is modeled by P(t) = ${a}(${b})ᵗ.`,
    question: (Y) =>
      `After how many hours does the model predict ${grouped(Y)} bacteria?`,
  },
  {
    sym: "F",
    unit: "weeks",
    aList: [500, 800, 1200, 2000],
    bList: [1.2, 1.25, 1.5],
    multipliers: [2, 3, 4, 5, 10],
    stem: (a, b) =>
      `The number of followers F of a social media account t weeks after it opens is modeled by F(t) = ${a}(${b})ᵗ.`,
    question: (Y) =>
      `After how many weeks does the model predict ${grouped(Y)} followers?`,
  },
  {
    sym: "C",
    unit: "hours",
    aList: [40, 60, 80, 120],
    bList: [0.5, 0.6, 0.8, 0.85],
    multipliers: [0.5, 0.25, 0.2, 0.1, 0.05],
    stem: (a, b) =>
      `The concentration C of a medication in the blood, in milligrams per liter, t hours after a dose is modeled by C(t) = ${a}(${b})ᵗ.`,
    question: (Y) =>
      `After how many hours does the model predict a concentration of ${grouped(Y)} milligrams per liter?`,
  },
  {
    sym: "V",
    unit: "years",
    aList: [18000, 24000, 30000],
    bList: [0.8, 0.85, 0.9],
    multipliers: [0.5, 0.25, 0.2, 0.1],
    stem: (a, b) =>
      `The value V of a vehicle, in dollars, t years after it is purchased is modeled by V(t) = ${grouped(a)}(${b})ᵗ.`,
    question: (Y) =>
      `After how many years does the model predict a value of ${grouped(Y)} dollars?`,
  },
];

const GENERAL = [
  {
    truth: true,
    statement:
      "If the points of a semi-log plot lie on a line, an exponential model is appropriate for the data.",
    reason:
      "Taking the logarithm of y = a(b)ˣ gives the line log y = (log b)x + log a, so data that are linear on a semi-log plot are modeled well by an exponential function. The statement is true.",
  },
  {
    truth: true,
    statement:
      "If the y-values of a data set are multiplied by the same factor each time x increases by 1, the points of the semi-log plot lie on a line.",
    reason:
      "A constant factor in y means log y changes by the same amount, the logarithm of the factor, each time x increases by 1. That is a constant rate of change, so the points lie on a line. The statement is true.",
  },
  {
    truth: true,
    statement:
      "If the points of a semi-log plot curve instead of lying on a line, an exponential model is not appropriate for the data.",
    reason:
      "An exponential function appears linear on a semi-log plot. Points that curve away from a line do not follow an exponential pattern, so the statement is true.",
  },
  {
    truth: true,
    statement:
      "If the points of a semi-log plot lie on a line with negative slope, the data can be modeled by an exponential function with 0 < b < 1.",
    reason:
      "The slope of the line is log b. A negative slope means log b < 0, so 0 < b < 1, which is an exponential decay model. The statement is true.",
  },
  {
    truth: false,
    statement:
      "If the y-values of a data set increase by the same amount each time x increases by 1, the points of the semi-log plot lie on a line.",
    reason:
      "A constant increase in y describes a linear function. Its logarithms do not change by a constant amount, so the points do not lie on a line. The statement is false.",
  },
  {
    truth: false,
    statement:
      "The semi-log plot of an exponential function is a curve that gets steeper as x increases.",
    reason:
      "The semi-log plot of an exponential function is a line, not a curve, because log y = (log b)x + log a. The statement is false.",
  },
  {
    truth: false,
    statement:
      "If the points of a semi-log plot lie on a line with negative slope, an exponential model is not appropriate for the data.",
    reason:
      "A negative slope means log b < 0, so 0 < b < 1. That is an exponential decay model, which is still an exponential model. The statement is false.",
  },
];

// One true or false statement about a data set that follows y = a(b)ˣ.
function claimFor(r, kind, truth, { a, b }) {
  if (kind === "slope") {
    return {
      truth,
      statement: truth
        ? `The points of the semi-log plot lie on a line with slope log ${b} ≈ ${three(log10(b))}.`
        : `The points of the semi-log plot lie on a line with slope ${b}.`,
      reason: `Taking logarithms gives log y = (log ${b})x + log ${a}, so the slope is log ${b} ≈ ${three(log10(b))}${truth ? "" : `, not ${b}`}. ${truth ? "The statement is true." : "The statement is false."}`,
    };
  }
  if (kind === "intercept") {
    return {
      truth,
      statement: truth
        ? `The vertical intercept of the line is log ${a} ≈ ${three(log10(a))}.`
        : `The vertical intercept of the line is ${a}.`,
      reason: `The vertical intercept of log y = (log ${b})x + log ${a} is log ${a} ≈ ${three(log10(a))}${truth ? "" : `, not ${a}`}. ${truth ? "The statement is true." : "The statement is false."}`,
    };
  }
  if (kind === "step") {
    return {
      truth,
      statement: truth
        ? `Each time x increases by 1, y is multiplied by ${b}.`
        : `Each time x increases by 1, y increases by ${b}.`,
      reason: `y(x + 1) = ${a}(${b})ˣ⁺¹ = ${b} · ${a}(${b})ˣ, so y is multiplied by ${b} each time x increases by 1.${truth ? "" : " It does not increase by a fixed amount."} ${truth ? "The statement is true." : "The statement is false."}`,
    };
  }
  const { statement, reason } = r.pick(GENERAL.filter((item) => item.truth === truth));
  return { truth, statement, reason };
}

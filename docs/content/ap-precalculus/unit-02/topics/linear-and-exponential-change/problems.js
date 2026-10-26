// Typed-answer problems for Topic 2.2. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed values, so a slip in the
// key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  polyText,
  num,
  par,
  signed,
  lead,
  fixed,
  percent,
  Q,
  fnOf,
  assert,
  assertNear,
  reject,
  expText,
  expKey,
  powerText,
  roundTo,
} from "../../../../practice-kit/index.js";

const money = (value) => Number(value).toLocaleString("en-US");
const pf = (v) => (v.isInteger && v.n >= 0 ? v.toString() : `(${v})`);
const qText = (value) => (value instanceof Q ? value.toString() : num(value));
const TYPES = ["linear", "exponential", "neither"];

function fnTable(name, variable, xs, ys, caption) {
  return table(
    caption || `Values of ${name}(${variable})`,
    [variable, `${name}(${variable})`],
    xs.map((x, i) => [num(x), qText(ys[i])]),
  );
}

// A ratio per step that keeps every table value a whole number.
function drawRatio(r) {
  const ratio = r.pick([2, 3, 4, -2, new Q(1, 2), new Q(1, 3), new Q(3, 2)]);
  return ratio instanceof Q ? ratio : new Q(ratio);
}

const initialFor = (r, ratio, steps) =>
  new Q(r.pick([1, 2, 3, 5, -1, -2, -3]) * ratio.d ** steps);

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "linear-vs-exponential",
    skill: "identify-information",
    make(r) {
      const type = r.pick(TYPES);
      const step = r.pick([1, 1, 2, 3]);
      const x0 = r.int(-4, 3);
      const xs = Array.from({ length: 5 }, (_, i) => x0 + step * i);
      let ys;
      let rate = null;
      if (type === "linear") {
        const m = r.nonzero(-6, 7);
        const c = r.int(-9, 12);
        ys = xs.map((x) => new Q(m * x + c));
        rate = new Q(m);
      } else if (type === "exponential") {
        rate = drawRatio(r);
        const a = initialFor(r, rate, 4);
        ys = xs.map((_, i) => a.mul(rate.pow(i)));
      } else {
        const a = r.int(1, 6);
        const s = r.int(1, 3);
        const bend = r.int(1, 3);
        ys = xs.map((_, i) => new Q(a + s * i + bend * i * i));
      }
      const spaced = `The values of x are equally spaced.`;
      const parts = [
        part("Is f linear, exponential, or neither?", ask.choice("f is", TYPES, type)),
      ];
      const solution = [];
      if (type === "linear") {
        parts.push(
          part("Find the rate of change of f.", ask.number("Rate of change =", rate)),
        );
        solution.push(
          `Over each interval of length ${step}, the output changes by ${qText(ys[1].sub(ys[0]))}, the same amount each time, so f is linear.`,
          `The rate of change is ${qText(ys[1].sub(ys[0]))}/${step} = ${rate}.`,
        );
      } else if (type === "exponential") {
        parts.push(
          part(
            `By what factor does f multiply each time x increases by ${step}?`,
            ask.number("Factor =", rate),
          ),
        );
        solution.push(
          `Over each interval of length ${step}, the output is multiplied by the same factor: ${qText(ys[1])}/${par(ys[0])} = ${rate}. So f is exponential.`,
          `The factor for each increase of ${step} in x is ${rate}.`,
        );
      } else {
        solution.push(
          `The changes in output are ${ys
            .slice(1, 4)
            .map((y, i) => qText(y.sub(ys[i])))
            .join(", ")}, which are not constant, so f is not linear.`,
          `The ratios of successive outputs are ${ys
            .slice(1, 4)
            .map((y, i) => qText(y.div(ys[i])))
            .join(", ")}, which are not constant, so f is not exponential.`,
        );
      }
      return problem({
        stem: `Selected values of a function f are shown in the table. ${spaced}`,
        blocks: [fnTable("f", "x", xs, ys)],
        parts,
        solution,
        data: { type, xs, ys },
      });
    },
    verify({ data: { type, ys } }) {
      const diffs = ys.slice(1).map((y, i) => y.sub(ys[i]).value);
      const ratios = ys.slice(1).map((y, i) => y.value / ys[i].value);
      const lin = diffs.every((d) => Math.abs(d - diffs[0]) < 1e-9);
      const exp = ratios.every((d) => Math.abs(d - ratios[0]) < 1e-9);
      assert(lin === (type === "linear"), "linear test");
      assert(exp === (type === "exponential"), "exponential test");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "linear-and-arithmetic",
    skill: "construct-functions",
    make(r) {
      const m = r.pick([-7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8]);
      const c = r.int(-12, 15);
      const x1 = r.int(-3, 2);
      const x2 = x1 + r.int(2, 5);
      const f = (x) => m * x + c;
      const x3 = x2 + r.int(2, 6);
      const rule = polyText([m, c]);
      return problem({
        stem: `The function f is linear, with f(${num(x1)}) = ${num(f(x1))} and f(${num(x2)}) = ${num(f(x2))}.`,
        parts: [
          part("Find the rate of change of f.", ask.number("Rate of change =", m)),
          part(
            "Write an expression for f(x).",
            ask.expr("f(x) =", rule, { form: "expanded" }),
          ),
          part(`Find f(${x3}).`, ask.number(`f(${x3}) =`, f(x3))),
        ],
        solution: [
          `The rate of change is (${num(f(x2))} − ${par(f(x1))})/(${num(x2)} − ${par(x1)}) = ${num(m)}.`,
          `Then f(x) = ${num(f(x1))} ${signed(m)}(x ${signed(-x1)}), which simplifies to ${rule}.`,
          `f(${x3}) = ${num(m)}·${x3} ${signed(c)} = ${num(f(x3))}.`,
        ],
        data: { rule, x1, x2, x3, f },
      });
    },
    verify({ data: { rule, x1, x2, x3, f } }) {
      const g = fnOf(rule);
      assertNear(g(x1), f(x1), "first point");
      assertNear(g(x2), f(x2), "second point");
      assertNear(g(x3), f(x3), "later point");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "exponential-and-geometric",
    skill: "construct-functions",
    make(r) {
      const b = r.pick([2, 3, 4, new Q(1, 2), new Q(1, 3), new Q(3, 2)]);
      const bq = b instanceof Q ? b : new Q(b);
      const x1 = r.int(0, 2);
      const a = new Q(r.pick([1, 2, 3, 4, 5, -2, -3]) * bq.d ** (x1 + 4));
      const f = (x) => a.mul(bq.pow(x));
      const x3 = x1 + r.int(3, 4);
      const key = expKey(a, bq);
      return problem({
        stem: `The function f is exponential, with f(${x1}) = ${qText(f(x1))} and f(${x1 + 1}) = ${qText(f(x1 + 1))}.`,
        parts: [
          part("Find the base of f.", ask.number("b =", bq)),
          part(
            "Write an expression for f(x) in the form abˣ.",
            ask.expr("f(x) =", key, { form: "exponential", text: expText(a, bq) }),
          ),
          part(`Find f(${x3}).`, ask.number(`f(${x3}) =`, f(x3))),
        ],
        solution: [
          `The inputs differ by 1, so the base is the ratio of the outputs: ${qText(f(x1 + 1))}/${par(f(x1))} = ${bq}.`,
          `Since f(${x1}) = a·${powerText(bq, x1)} = ${qText(f(x1))}, the initial value is a = ${a}. So f(x) = ${expText(a, bq)}.`,
          `f(${x3}) = ${expText(a, bq, x3)} = ${qText(f(x3))}.`,
        ],
        data: { key, x1, x3, f },
      });
    },
    verify({ data: { key, x1, x3, f } }) {
      const g = fnOf(key);
      assertNear(g(x1), f(x1).value, "first point");
      assertNear(g(x1 + 1), f(x1 + 1).value, "second point");
      assertNear(g(x3), f(x3).value, "later point");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "linear-vs-exponential",
    skill: "apply-results",
    make(r) {
      const contexts = [
        {
          fn: "B",
          unit: "bacteria",
          exponential:
            "The table gives the number of bacteria, B(t), in a culture t hours after the culture is started.",
        },
        {
          fn: "D",
          unit: "miles",
          linear:
            "The table gives the distance, D(t), in miles, that a hiker has walked t hours after starting a trail.",
        },
        {
          fn: "V",
          unit: "dollars",
          linear:
            "The table gives the amount, V(t), in dollars, in a savings jar t weeks after it is started. The same deposit is made each week.",
          exponential:
            "The table gives the value, V(t), in dollars, of an investment t years after it is purchased.",
        },
        {
          fn: "W",
          unit: "gallons",
          linear:
            "The table gives the volume of water, W(t), in gallons, in a tank t minutes after a valve is opened.",
        },
        {
          fn: "P",
          unit: "thousand people",
          exponential:
            "The table gives the population, P(t), in thousands, of a town t years after 2010.",
        },
      ];
      const ctx = r.pick(contexts);
      const kinds = ["linear", "exponential"].filter((k) => ctx[k]);
      const kind = r.pick(kinds);
      const ts = [0, 1, 2, 3, 4];
      let ys;
      let rate;
      if (kind === "linear") {
        const m = r.nonzero(-8, 12);
        const c = r.int(40, 150);
        ys = ts.map((t) => new Q(c + m * t));
        rate = new Q(m);
        if (ys.some((y) => y.n <= 0)) reject("a non-positive amount");
      } else {
        rate = r.pick([2, 3, new Q(1, 2), new Q(3, 2)]);
        rate = rate instanceof Q ? rate : new Q(rate);
        const c = new Q(r.pick([1, 2, 3, 5, 7]) * rate.d ** 8);
        ys = ts.map((t) => c.mul(rate.pow(t)));
        if (rate.d > 1 && ys[0].value > 5000) reject("too large");
      }
      const T = r.int(5, 7);
      const value = kind === "linear" ? ys[0].add(rate.mul(T)) : ys[0].mul(rate.pow(T));
      if (value.n <= 0) reject("a non-positive amount");
      const solution =
        kind === "linear"
          ? [
              `The amount changes by ${qText(ys[1].sub(ys[0]))} every time t increases by 1, so the table is linear.`,
              `${ctx.fn}(${T}) = ${qText(ys[0])} ${signed(rate)}(${T}) = ${qText(value)}.`,
            ]
          : [
              `The amount is multiplied by ${rate} every time t increases by 1, so the table is exponential.`,
              `${ctx.fn}(${T}) = ${expText(ys[0], rate, T)} = ${qText(value)}.`,
            ];
      return problem({
        stem: ctx[kind],
        blocks: [fnTable(ctx.fn, "t", ts, ys)],
        parts: [
          part(
            `Is ${ctx.fn} better modeled by a linear function or an exponential function?`,
            ask.choice("A good model is", ["linear", "exponential"], kind),
          ),
          part(
            `Find ${ctx.fn}(${T}).`,
            ask.number(`${ctx.fn}(${T}) =`, value, { unit: ctx.unit }),
          ),
        ],
        solution,
        data: { kind, ys, rate, T, value },
      });
    },
    verify({ data: { kind, ys, rate, T, value } }) {
      const diffs = ys.slice(1).map((y, i) => y.sub(ys[i]).value);
      const ratios = ys.slice(1).map((y, i) => y.value / ys[i].value);
      if (kind === "linear")
        assert(
          diffs.every((d) => Math.abs(d - diffs[0]) < 1e-9),
          "constant difference",
        );
      else
        assert(
          ratios.every((d) => Math.abs(d - ratios[0]) < 1e-9),
          "constant ratio",
        );
      const expected =
        kind === "linear" ? ys[0].value + rate.value * T : ys[0].value * rate.value ** T;
      assertNear(expected, value.value, "predicted value");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "exponential-and-geometric",
    skill: "solve",
    make(r) {
      const b = r.pick([2, 3, -2, new Q(1, 2), new Q(2, 3)]);
      const bq = b instanceof Q ? b : new Q(b);
      if (bq.n < 0) reject("an exponential base is positive");
      const x1 = r.int(0, 2);
      const gap = 3;
      const x2 = x1 + gap;
      const a = new Q(r.pick([1, 2, 3, 5, -2, -4]) * bq.d ** x2);
      const f = (x) => a.mul(bq.pow(x));
      const key = expKey(a, bq);
      const x3 = x2 + r.int(1, 2);
      return problem({
        stem: `The exponential function f is given by f(x) = abˣ, with f(${x1}) = ${qText(f(x1))} and f(${x2}) = ${qText(f(x2))}.`,
        parts: [
          part("Find the base b.", ask.number("b =", bq)),
          part("Find the initial value a.", ask.number("a =", a)),
          part(`Find f(${x3}).`, ask.number(`f(${x3}) =`, f(x3))),
        ],
        solution: [
          `The inputs are ${gap} apart, so f(${x2})/f(${x1}) = b³. Then b³ = ${qText(f(x2))}/${par(f(x1))} = ${qText(f(x2).div(f(x1)))}, so b = ${bq}.`,
          `Since f(${x1}) = a·${powerText(bq, x1)} = ${qText(f(x1))}, a = ${a}. So f(x) = ${expText(a, bq)}.`,
          `f(${x3}) = ${expText(a, bq, x3)} = ${qText(f(x3))}.`,
        ],
        data: { key, x1, x2, x3, f },
      });
    },
    verify({ data: { key, x1, x2, x3, f } }) {
      const g = fnOf(key);
      assertNear(g(x1), f(x1).value, "first point");
      assertNear(g(x2), f(x2).value, "second point");
      assertNear(g(x3), f(x3).value, "later point");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "linear-vs-exponential",
    skill: "describe",
    make(r) {
      const m = r.nonzero(-6, 7);
      const c = r.int(-8, 10);
      const b = r.pick([2, 3, new Q(1, 2), new Q(1, 3), new Q(3, 2)]);
      const bq = b instanceof Q ? b : new Q(b);
      const a = r.pick([1, 2, 3, 5]);
      const k = r.int(2, 4);
      const fText = polyText([m, c]);
      const gText = expText(a, bq);
      return problem({
        stem: `The function f is given by f(x) = ${fText}, and the function g is given by g(x) = ${gText}. For every real number x, the value of f(x + ${k}) − f(x) is the same, and the value of g(x + ${k})/g(x) is the same.`,
        parts: [
          part(`Find f(x + ${k}) − f(x).`, ask.number(`f(x + ${k}) − f(x) =`, m * k)),
          part(`Find g(x + ${k})/g(x).`, ask.number(`g(x + ${k})/g(x) =`, bq.pow(k))),
        ],
        solution: [
          `f(x + ${k}) − f(x) = [${lead(m)}(x + ${k}) ${signed(c)}] − [${fText}] = ${num(m * k)}. A linear function changes by the same amount over every interval of the same length.`,
          `g(x + ${k})/g(x) = ${a}${pf(bq)}^(x + ${k})/(${a}${pf(bq)}ˣ) = ${powerText(bq, k)} = ${qText(bq.pow(k))}. An exponential function is multiplied by the same factor over every interval of the same length.`,
        ],
        data: { m, c, a, bq, k, fText },
      });
    },
    verify({ data: { m, c, a, bq, k } }) {
      for (const x of [-2, 0, 1.5, 4]) {
        assertNear(m * (x + k) + c - (m * x + c), m * k, "difference");
        assertNear(
          (a * bq.value ** (x + k)) / (a * bq.value ** x),
          bq.value ** k,
          "ratio",
        );
      }
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "linear-vs-exponential",
    skill: "apply-results",
    make(r) {
      const grows = r.chance(0.6);
      const pct = r.pick(grows ? [3, 4, 5, 6, 8, 10, 12] : [5, 8, 10, 12, 15, 18]);
      const b = grows ? 1 + pct / 100 : 1 - pct / 100;
      const start = r.pick(
        grows
          ? [1000, 1500, 2000, 2500, 4000, 5000]
          : [12000, 18000, 24000, 30000, 36000],
      );
      const T = r.int(3, 8);
      const value = roundTo(start * b ** T, 2);
      const factor = roundTo(b, 4);
      const intro = grows
        ? `An account has $${money(start)} and earns ${pct}% interest each year. Let A(t) be the value of the account, in dollars, t years after the account is opened, with no deposits or withdrawals.`
        : `A new vehicle is worth $${money(start)}. Its value decreases by ${pct}% each year. Let V(t) be the value of the vehicle, in dollars, t years after it was purchased.`;
      const name = grows ? "A" : "V";
      return problem({
        stem: intro,
        parts: [
          part(
            `By what factor is the value multiplied each year?`,
            ask.number("Factor =", factor),
          ),
          part(
            `Find ${name}(${T}). Round your answer to two decimal places.`,
            ask.number(`${name}(${T}) =`, value, { decimals: 2, unit: "dollars" }),
          ),
        ],
        solution: [
          `Each year the value ${grows ? "increases" : "decreases"} by ${pct}%, so it is multiplied by 1 ${grows ? "+" : "−"} ${num(pct / 100)} = ${num(factor)}.`,
          `${name}(t) = ${money(start)}(${num(factor)})ᵗ, so ${name}(${T}) = ${money(start)}(${num(factor)})${["", "", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸"][T]} ≈ ${money(fixed(value, 2))}.`,
        ],
        data: { start, factor, T, value },
      });
    },
    verify({ data: { start, factor, T, value } }) {
      assertNear(roundTo(start * factor ** T, 2), value, "value after T years", 1e-6);
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "exponential-and-geometric",
    skill: "identify-information",
    make(r) {
      const b = r.pick([2, 3, new Q(1, 2)]);
      const bq = b instanceof Q ? b : new Q(b);
      const x0 = bq.d > 1 ? 0 : r.int(0, 2);
      const xs = [0, 1, 2, 3, 4].map((i) => x0 + 2 * i);
      const a = new Q(r.pick([1, 2, 3, 5]) * bq.d ** (x0 + 8));
      const f = (x) => a.mul(bq.pow(x));
      const ys = xs.map((x) => f(x));
      const odd = xs[0] + 1 + 2 * r.int(0, 2);
      return problem({
        stem: "Selected values of an exponential function f are shown in the table. The values of x are equally spaced.",
        blocks: [fnTable("f", "x", xs, ys)],
        parts: [
          part(
            "By what factor does f multiply each time x increases by 2?",
            ask.number("Factor =", bq.pow(2)),
          ),
          part("Find the base of f.", ask.number("b =", bq)),
          part(`Find f(${odd}).`, ask.number(`f(${odd}) =`, f(odd))),
        ],
        solution: [
          `For each increase of 2 in x, the output is multiplied by ${qText(ys[1])}/${par(ys[0])} = ${qText(bq.pow(2))}.`,
          `An increase of 2 multiplies the output by b², so b² = ${qText(bq.pow(2))} and b = ${bq}, because the base of an exponential function is positive.`,
          `f(${odd}) = f(${odd - 1})·b = ${qText(f(odd - 1))}·${pf(bq)} = ${qText(f(odd))}.`,
        ],
        data: { xs, ys, bq, f, odd },
      });
    },
    verify({ data: { xs, ys, bq, f, odd } }) {
      const ratios = ys.slice(1).map((y, i) => y.value / ys[i].value);
      assert(
        ratios.every((q) => Math.abs(q - ratios[0]) < 1e-9),
        "equal ratios",
      );
      assertNear(ratios[0], bq.value ** 2, "step factor");
      assertNear(
        f(odd).value,
        ys[0].value * bq.value ** (odd - xs[0]),
        "interpolated value",
      );
      assert(f(odd).isInteger, "a whole-number output");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "linear-vs-exponential",
    skill: "construct-functions",
    make(r) {
      const type = r.pick(["linear", "exponential"]);
      const xs = [0, 1, 2, 3, 4];
      const far = r.int(7, 9);
      if (type === "linear") {
        const m = r.nonzero(-7, 8);
        const c = r.nonzero(-12, 15);
        const ys = xs.map((x) => new Q(m * x + c));
        const rule = polyText([m, c]);
        return problem({
          stem: "Selected values of a function g are shown in the table. The values of x are equally spaced, and g is either linear or exponential.",
          blocks: [fnTable("g", "x", xs, ys)],
          parts: [
            part(
              "Is g linear or exponential?",
              ask.choice("g is", ["linear", "exponential"], "linear"),
            ),
            part(
              "Write an expression for g(x).",
              ask.expr("g(x) =", rule, { form: "expanded" }),
            ),
            part(`Find g(${far}).`, ask.number(`g(${far}) =`, m * far + c)),
          ],
          solution: [
            `The outputs change by ${num(m)} each time x increases by 1, so g is linear with rate of change ${num(m)}.`,
            `The initial value is g(0) = ${num(c)}, so g(x) = ${rule}.`,
            `g(${far}) = ${num(m)}·${far} ${signed(c)} = ${num(m * far + c)}.`,
          ],
          data: { type, rule, ys, far, value: m * far + c },
        });
      }
      const b = r.pick([2, 3, 4, new Q(1, 2), new Q(1, 3)]);
      const bq = b instanceof Q ? b : new Q(b);
      const a = new Q(r.pick([1, 2, 3, 5, -2, -3]) * bq.d ** 4);
      const ys = xs.map((x) => a.mul(bq.pow(x)));
      const key = expKey(a, bq);
      const value = a.mul(bq.pow(Math.min(far, 5)));
      const farX = Math.min(far, 5);
      return problem({
        stem: "Selected values of a function g are shown in the table. The values of x are equally spaced, and g is either linear or exponential.",
        blocks: [fnTable("g", "x", xs, ys)],
        parts: [
          part(
            "Is g linear or exponential?",
            ask.choice("g is", ["linear", "exponential"], "exponential"),
          ),
          part(
            "Write an expression for g(x) in the form abˣ.",
            ask.expr("g(x) =", key, { form: "exponential", text: expText(a, bq) }),
          ),
          part(`Find g(${farX}).`, ask.number(`g(${farX}) =`, value)),
        ],
        solution: [
          `The outputs are multiplied by ${bq} each time x increases by 1, so g is exponential with base ${bq}.`,
          `The initial value is g(0) = ${a}, so g(x) = ${expText(a, bq)}.`,
          `g(${farX}) = ${expText(a, bq, farX)} = ${qText(value)}.`,
        ],
        data: { type, key, ys, far: farX, value },
      });
    },
    verify({ data: { type, rule, key, ys, far, value } }) {
      const g = fnOf(type === "linear" ? rule : key);
      ys.forEach((y, i) => assertNear(g(i), y.value, `table value ${i}`));
      assertNear(g(far), value instanceof Q ? value.value : value, "far value");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "linear-vs-exponential",
    skill: "support-conclusions",
    make(r) {
      const a0 = r.int(200, 900);
      const d = r.int(40, 120);
      const e0 = r.int(50, 300);
      const pct = r.pick([15, 20, 25, 30, 40, 50]);
      const b = 1 + pct / 100;
      let first = 0;
      while (e0 * b ** first <= a0 + d * first && first < 60) first += 1;
      if (first < 4 || first > 16) reject("crossover out of range");
      const k = r.int(2, 5);
      return problem({
        stem: `Two plans are offered. Under Plan A, the amount A(t) in dollars, t months after the start, is A(t) = ${a0} + ${d}t. Under Plan B, the amount B(t), in dollars, is B(t) = ${e0}(${num(b)})ᵗ.`,
        parts: [
          part(
            "Which plan changes by the same amount each month?",
            ask.choice("The plan is", ["Plan A", "Plan B"], "Plan A"),
          ),
          part(
            `Find B(${k}). Round to two decimal places.`,
            ask.number(`B(${k}) =`, roundTo(e0 * b ** k, 2), { decimals: 2 }),
          ),
          part(
            "Find the least whole number of months t for which B(t) > A(t).",
            ask.number("t =", first),
          ),
        ],
        solution: [
          `A(t) = ${a0} + ${d}t increases by ${d} every month, so Plan A changes by the same amount each month. Plan B is multiplied by ${num(b)} every month.`,
          `B(${k}) = ${e0}(${num(b)})${["", "", "²", "³", "⁴", "⁵"][k]} ≈ ${fixed(roundTo(e0 * b ** k, 2), 2)}.`,
          `At t = ${first - 1}, A = ${a0 + d * (first - 1)} and B ≈ ${fixed(roundTo(e0 * b ** (first - 1), 2), 2)}, so B is not above A. At t = ${first}, A = ${a0 + d * first} and B ≈ ${fixed(roundTo(e0 * b ** first, 2), 2)}, so t = ${first}.`,
        ],
        data: { a0, d, e0, b, first },
      });
    },
    verify({ data: { a0, d, e0, b, first } }) {
      for (let t = 0; t < first; t += 1)
        assert(e0 * b ** t <= a0 + d * t, `B stays at or below A at t = ${t}`);
      assert(e0 * b ** first > a0 + d * first, "B passes A");
      assert(percent(b - 1).length > 0, "percent text");
    },
  },
];

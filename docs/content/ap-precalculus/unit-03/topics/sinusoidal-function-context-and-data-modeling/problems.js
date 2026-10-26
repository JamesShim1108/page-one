// Typed-answer problems for Topic 3.7. Sinusoidal models are built from the maximum and
// minimum values and the times they occur, then used to predict. Each template picks its
// own maximum, minimum, and period, so verify() can rebuild the model and check every
// answer against it.

import {
  ask,
  part,
  problem,
  table,
  Q,
  piText,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const PI = Math.PI;
const round = (x, places = 2) => Math.round(x * 10 ** places) / 10 ** places;
// A number written plainly with a true minus sign: 5, 5.3, −2.5.
const dec = (x, places = 2) => {
  const v = round(x, places);
  return v < 0 ? `−${Math.abs(v)}` : String(v);
};
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const paren = (text) => (/[/−]/.test(text) ? `(${text})` : text);

const CONTEXTS = [
  {
    fn: "D",
    about: "the depth of the water at a harbor, in feet",
    tUnit: "hours after midnight",
    word: "hours",
    unit: "feet",
  },
  {
    fn: "T",
    about: "the temperature in a desert town, in degrees Fahrenheit",
    tUnit: "hours after midnight",
    word: "hours",
    unit: "degrees",
  },
  {
    fn: "H",
    about: "the height of a seat on a Ferris wheel above the ground, in meters",
    tUnit: "minutes after the ride starts",
    word: "minutes",
    unit: "meters",
  },
];

// The shifted input as text: t, t − 3, t + 3.
const shiftT = (h) => (h === 0 ? "t" : h > 0 ? `t − ${dec(h)}` : `t + ${dec(-h)}`);
// A cos(2π(t − h)/P) + d, written without the pieces that equal 1 or 0.
const cosModel = ({ A, P, h, d }, fn = "cos") =>
  `${A === 1 ? "" : `${dec(A)} `}${fn}(2π${h === 0 ? "t" : `(${shiftT(h)})`}/${dec(P)})${d === 0 ? "" : d > 0 ? ` + ${dec(d)}` : ` − ${dec(-d)}`}`;
const value = ({ A, P, h, d }, t, fn = "cos") => A * Math[fn]((2 * PI * (t - h)) / P) + d;
// "Its maximum value, 9.2 feet, occurs at t = 3, and its next minimum value ..."
const extremes = (c, M, tM, m, tm) =>
  `Its maximum value, ${dec(M)} ${c.unit}, occurs at t = ${dec(tM)}, and its next minimum value, ${dec(m)} ${c.unit}, occurs at t = ${dec(tm)}.`;

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "period-and-amplitude-from-data",
    skill: "identify-information",
    make(r) {
      const c = r.pick(CONTEXTS);
      const half = r.pick([3, 3.5, 4, 4.5, 5, 5.5, 6, 6.25, 6.5, 7, 7.5, 8]);
      const t1 = r.int(0, 8);
      const t2 = round(t1 + half);
      const A = r.int(5, 50) / 10;
      const m = r.int(10, 60) / 10;
      const M = round(m + 2 * A, 1);
      const d = round(m + A, 2);
      const P = round(2 * half);
      return problem({
        stem: `The function ${c.fn} models ${c.about}, where t is measured in ${c.tUnit}. It is sinusoidal. ${extremes(c, M, t1, m, t2)}`,
        parts: [
          part(`Find the period of ${c.fn}.`, ask.number("Period:", P)),
          part(`Find the amplitude of ${c.fn}.`, ask.number("Amplitude:", A)),
          part(
            "Find the midline value d, so that the midline is y = d.",
            ask.number("d =", d),
          ),
        ],
        solution: [
          `From a maximum to the next minimum is half a cycle: ${dec(t2)} − ${dec(t1)} = ${dec(half)}. The period is 2(${dec(half)}) = ${dec(P)}.`,
          `The amplitude is half the difference of the extreme values: (${dec(M)} − ${dec(m)})/2 = ${dec(A)}.`,
          `The midline is the mean of the extreme values: (${dec(M)} + ${dec(m)})/2 = ${dec(d)}.`,
        ],
        data: { t1, t2, half, M, m, A, d, P },
      });
    },
    verify({ data: { t1, t2, half, M, m, A, d, P } }) {
      assert(t2 > t1 && M > m, "order");
      assertNear(t2 - t1, half, "half period");
      assertNear(P, 2 * (t2 - t1), "period");
      assertNear(A, (M - m) / 2, "amplitude");
      assertNear(d, (M + m) / 2, "midline");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "phase-shift-and-regression",
    skill: "construct-functions",
    make(r) {
      const c = r.pick(CONTEXTS);
      const P = r.pick([8, 12, 16, 20, 24]);
      const h = r.int(1, P / 2 - 1);
      const A = r.int(2, 9);
      const d = A + r.int(1, 8);
      const model = { A, P, h, d };
      return problem({
        stem: `The function ${c.fn} models ${c.about}, where t is measured in ${c.tUnit}. It is sinusoidal with a period of ${P}. Its maximum value of ${d + A} occurs at t = ${h}, and its minimum value is ${d - A}.`,
        parts: [
          part(`Find the amplitude of ${c.fn}.`, ask.number("Amplitude:", A)),
          part(
            `Write a formula for ${c.fn}(t) of the form a cos(b(t − h)) + d.`,
            ask.expr(`${c.fn}(t) =`, cosModel(model), { vars: ["t"] }),
          ),
          part(
            `Use your model to find ${c.fn}(${h + P / 4}).`,
            ask.number(`${c.fn}(${h + P / 4}) =`, d),
          ),
        ],
        solution: [
          `The amplitude is (${d + A} − ${d - A})/2 = ${A}.`,
          `The midline is (${d + A} + ${d - A})/2 = ${d}. A cosine reaches its maximum when its input is 0, so the input is t − ${h}. The period is ${P}, so b = 2π/${P}. Then ${c.fn}(t) = ${cosModel(model)}.`,
          `At t = ${h + P / 4}, the input is 2π(${P / 4})/${P} = π/2, and cos(π/2) = 0, so ${c.fn}(${h + P / 4}) = ${d}, the midline value.`,
        ],
        data: { P, h, A, d, model },
      });
    },
    verify({ data: { P, h, A, d, model } }) {
      assertNear(value(model, h), d + A, "max");
      assertNear(value(model, h + P / 2), d - A, "min");
      assertNear(value(model, h + P / 4), d, "quarter period");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "phase-shift-and-regression",
    skill: "equivalent-forms",
    make(r) {
      const P = r.pick([8, 12, 16, 24]);
      const A = r.int(2, 8);
      const d = A + r.int(1, 6);
      const h1 = r.int(1, P / 2 - 1);
      const h2 = r.int(1, P - 1);
      return problem({
        stem: `A sinusoidal model has a period of ${P}, an amplitude of ${A}, and a midline of y = ${d}. Its input is a time t. Models are written in the form a·f(b(t + c)) + d with b > 0, and in each part below, c must satisfy ${sg(-P)} < c < 0.`,
        parts: [
          part(
            `The model C(t) = ${A} cos(b(t + c)) + ${d} reaches its maximum value at t = ${h1}. Find c.`,
            ask.number("c =", -h1),
          ),
          part(
            `The model S(t) = ${A} sin(b(t + c)) + ${d} crosses its midline while increasing at t = ${h2}. Find c.`,
            ask.number("c =", -h2),
          ),
          part(
            "Find the first time t ≥ 0 at which C(t) reaches its minimum value.",
            ask.number("t =", h1 + P / 2),
          ),
        ],
        solution: [
          `Cosine reaches its maximum when its input is 0. So b(${h1} + c) = 0, which gives c = ${sg(-h1)}. This is the only value between ${sg(-P)} and 0.`,
          `Sine crosses its midline going up when its input is 0. So b(${h2} + c) = 0, which gives c = ${sg(-h2)}.`,
          `A minimum comes half a period after a maximum. Half a period is ${P / 2}, so the minimum is at t = ${h1} + ${P / 2} = ${h1 + P / 2}. The minimum before that, at t = ${sg(h1 - P / 2)}, is negative.`,
        ],
        data: { P, A, d, h1, h2 },
      });
    },
    verify({ data: { P, A, d, h1, h2 } }) {
      const C = (t) => A * Math.cos((2 * PI * (t - h1)) / P) + d;
      const S = (t) => A * Math.sin((2 * PI * (t - h2)) / P) + d;
      assertNear(C(h1), d + A, "max");
      assertNear(S(h2), d, "midline");
      assert(S(h2 + 0.01) > S(h2), "increasing");
      assertNear(C(h1 + P / 2), d - A, "min");
      assert(h1 - P / 2 < 0 && h1 + P / 2 >= 0, "first minimum");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "phase-shift-and-regression",
    skill: "describe",
    make(r) {
      const c = r.pick(CONTEXTS);
      const P = r.pick([12, 24]);
      const h = r.int(1, 5);
      const A = r.int(2, 8) * 2;
      const d = A + r.int(1, 8);
      const k = r.pick([1, 2, 4, 5]);
      const t0 = h + (k * P) / 6;
      const u = Math.cos((k * PI) / 3);
      const cosText = u > 0 ? "1/2" : "−1/2";
      const answer = round(d + A * u, 6);
      const inside = r.int(2, 20);
      const outside = r.pick([300, 500, 800, 1000]);
      const model = { A, P, h, d };
      const maximaAt = [0, 1, 2, 3].map((n) => h + n * P).filter((t) => t < 24);
      return problem({
        stem: `The function ${c.fn}(t) = ${cosModel(model)} models ${c.about}, where t is measured in ${c.tUnit}. It was built from data collected for 0 ≤ t ≤ 24.`,
        parts: [
          part(
            `Find ${c.fn}(${t0}).`,
            ask.number(`${c.fn}(${t0}) =`, answer, { unit: c.unit }),
          ),
          part(
            `Which prediction is more likely to be reliable, ${c.fn}(${inside}) or ${c.fn}(${outside})?`,
            ask.choice(
              "More reliable:",
              r.shuffle([`${c.fn}(${inside})`, `${c.fn}(${outside})`]),
              `${c.fn}(${inside})`,
            ),
          ),
          part(
            `For how many values of t with 0 ≤ t < 24 does ${c.fn} reach its maximum value?`,
            ask.number("Count:", maximaAt.length),
          ),
        ],
        solution: [
          `At t = ${t0}, the input of cosine is 2π(${t0} − ${h})/${P} = 2π(${(k * P) / 6})/${P} = ${piText(new Q(k, 3))}, and cos(${piText(new Q(k, 3))}) = ${cosText}. So ${c.fn}(${t0}) = ${A}(${cosText}) + ${d} = ${dec(answer)}.`,
          `${c.fn}(${inside}) is inside the interval 0 ≤ t ≤ 24 where the data were collected. ${c.fn}(${outside}) is far outside it, where the model may no longer match the situation. The prediction at t = ${inside} is more likely to be reliable.`,
          `Maxima occur at t = ${h} and every ${P} units before and after it. The ones with 0 ≤ t < 24 are at t = ${maximaAt.join(", ")}, which is ${maximaAt.length} ${maximaAt.length === 1 ? "value" : "values"}.`,
        ],
        data: { P, h, A, d, t0, u, answer, maxima: maximaAt.length },
      });
    },
    verify({ data: { P, h, A, d, t0, answer, maxima } }) {
      assertNear(value({ A, P, h, d }, t0), answer, "prediction");
      let count = 0;
      for (let n = -3; n <= 5; n++) if (h + n * P >= 0 && h + n * P < 24) count++;
      assert(count === maxima, "maxima");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "period-and-amplitude-from-data",
    skill: "identify-information",
    make(r) {
      const c = r.pick(CONTEXTS);
      const P = r.pick([8, 12, 24]);
      const step = P / 8;
      const A = r.int(3, 12);
      const k = A + r.int(2, 20);
      const shape = r.pick(["cos", "negcos", "sin", "negsin"]);
      const f = (t) => {
        const turn = (2 * PI * t) / P;
        const base = {
          cos: Math.cos(turn),
          negcos: -Math.cos(turn),
          sin: Math.sin(turn),
          negsin: -Math.sin(turn),
        }[shape];
        return k + A * base;
      };
      const times = Array.from({ length: 9 }, (_, i) => round(i * step));
      const values = times.map((t) => round(f(t), 1));
      const high = Math.max(...values);
      const low = Math.min(...values);
      const tHigh = times[values.indexOf(high)];
      const tLow = times[values.indexOf(low)];
      return problem({
        stem: `The function ${c.fn} models ${c.about}, where t is measured in ${c.tUnit}. It is sinusoidal, and the table shows some of its values, rounded to the nearest tenth.`,
        blocks: [
          table(
            `Values of ${c.fn}(t)`,
            ["t", ...times.map((t) => dec(t))],
            [[`${c.fn}(t)`, ...values.map((v) => dec(v, 1))]],
          ),
        ],
        parts: [
          part(
            `Use the maximum and minimum values in the table to find the period of ${c.fn}.`,
            ask.number("Period:", P),
          ),
          part(`Find the amplitude of ${c.fn}.`, ask.number("Amplitude:", A)),
          part(
            "Find the midline value d, so that the midline is y = d.",
            ask.number("d =", k),
          ),
        ],
        solution: [
          `The maximum, ${dec(high, 1)}, is at t = ${dec(tHigh)} and the minimum, ${dec(low, 1)}, is at t = ${dec(tLow)}. They are half a period apart: |${dec(tLow)} − ${dec(tHigh)}| = ${dec(Math.abs(tLow - tHigh))}. The period is ${P}.`,
          `The amplitude is (${dec(high, 1)} − ${dec(low, 1)})/2 = ${A}.`,
          `The midline is (${dec(high, 1)} + ${dec(low, 1)})/2 = ${k}.`,
        ],
        data: { P, A, k, times, values, high, low, tHigh, tLow },
      });
    },
    verify({ data: { P, A, k, high, low, tHigh, tLow } }) {
      assertNear(high - low, 2 * A, "range");
      assertNear((high + low) / 2, k, "midline");
      assertNear(Math.abs(tLow - tHigh), P / 2, "half period");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "phase-shift-and-regression",
    skill: "construct-functions",
    make(r) {
      const c = r.pick(CONTEXTS);
      const half = r.pick([5.5, 6, 6.25, 6.5, 7, 7.5]);
      const P = 2 * half;
      const h = r.int(1, 6);
      const A = r.int(5, 40) / 10;
      const m = r.int(10, 50) / 10;
      const d = round(m + A, 1);
      const M = round(m + 2 * A, 1);
      const wait = r.pick([1, 2, 3, 4, 5]);
      const model = { A, P, h, d };
      const predicted = round(value(model, h + wait), 4);
      return problem({
        stem: `The function ${c.fn} models ${c.about}, where t is measured in ${c.tUnit}. It is sinusoidal. ${extremes(c, M, h, m, h + half)}`,
        parts: [
          part(`Find the period of ${c.fn}.`, ask.number("Period:", P)),
          part(
            `Write a formula for ${c.fn}(t) using a cosine function.`,
            ask.expr(`${c.fn}(t) =`, cosModel(model), { vars: ["t"] }),
          ),
          part(
            `Use your model to predict ${c.fn}(${dec(h + wait)}). Round to the nearest hundredth.`,
            ask.number(`${c.fn}(${dec(h + wait)}) =`, predicted, {
              decimals: 2,
              unit: c.unit,
            }),
          ),
        ],
        solution: [
          `A maximum to the next minimum is half a period: ${dec(h + half)} − ${h} = ${dec(half)}, so the period is ${dec(P)}.`,
          `The amplitude is (${dec(M)} − ${dec(m)})/2 = ${dec(A)} and the midline is (${dec(M)} + ${dec(m)})/2 = ${dec(d)}. A cosine is at its maximum when its input is 0, so the input is t − ${h}, and b = 2π/${dec(P)}. So ${c.fn}(t) = ${cosModel(model)}.`,
          `${c.fn}(${dec(h + wait)}) = ${dec(A)} cos(2π(${wait})/${dec(P)}) + ${dec(d)} ≈ ${dec(predicted)}.`,
        ],
        data: { half, P, h, A, m, M, d, model, wait, predicted },
      });
    },
    verify({ data: { P, h, A, M, m, d, model, wait, predicted } }) {
      assertNear(value(model, h), M, "maximum");
      assertNear(value(model, h + P / 2), m, "minimum");
      assertNear(value(model, h + wait), predicted, "prediction", 1e-4);
      assert(d - A > 0, "positive minimum");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "phase-shift-and-regression",
    skill: "apply-results",
    make(r) {
      const c = r.pick(CONTEXTS);
      const P = r.pick([12, 24]);
      const h = r.int(1, 6);
      const A = r.int(2, 6) * 2;
      const d = A + r.int(2, 14);
      const model = { A, P, h, d };
      const k = r.pick([1, 2, 4, 5]);
      const t0 = h + (k * P) / 6;
      const cos0 = Math.cos((k * PI) / 3);
      const cos0Text = cos0 > 0 ? "1/2" : "−1/2";
      const t0Value = round(d + A * cos0, 6);
      // cos(x) = u when x = ±απ + 2πn, and then t = h + (±α + 2n)(P/2).
      const [u, uText, alpha] = r.pick([
        [0.5, "1/2", new Q(1, 3)],
        [0, "0", new Q(1, 2)],
        [-0.5, "−1/2", new Q(2, 3)],
      ]);
      const a = alpha.n / alpha.d;
      const target = d + A * u;
      let first = Infinity;
      for (let n = -3; n <= 5; n++)
        for (const sign of [-1, 1]) {
          const t = h + ((sign * a + 2 * n) * P) / 2;
          if (t >= -1e-9 && t < first) first = t;
        }
      const reach = (a * P) / 2;
      const above = a * P;
      return problem({
        stem: `The function ${c.fn}(t) = ${cosModel(model)} models ${c.about}, where t is measured in ${c.tUnit}.`,
        parts: [
          part(
            `Find ${c.fn}(${t0}).`,
            ask.number(`${c.fn}(${t0}) =`, t0Value, { unit: c.unit }),
          ),
          part(
            `Find the first time t ≥ 0 at which ${c.fn}(t) = ${dec(target)}.`,
            ask.number("t =", first),
          ),
          part(
            `During each cycle, for how many ${c.word} is ${c.fn}(t) greater than ${dec(target)}?`,
            ask.number("Length:", above, { unit: c.word }),
          ),
        ],
        solution: [
          `At t = ${t0}, the input of cosine is 2π(${t0} − ${h})/${P} = ${piText(new Q(k, 3))}, and cos(${piText(new Q(k, 3))}) = ${cos0Text}. So ${c.fn}(${t0}) = ${A}(${cos0Text}) + ${d} = ${dec(t0Value)}.`,
          `${c.fn}(t) = ${dec(target)} means cos(2π(t − ${h})/${P}) = ${uText}. That happens when the input is ${piText(alpha)} or −${piText(alpha)}, plus whole cycles. Setting 2π(t − ${h})/${P} = ±${piText(alpha)} gives t = ${h} ± ${dec(reach)}, and then every ${P} units. The first value with t ≥ 0 is ${dec(first)}.`,
          `${c.fn}(t) > ${dec(target)} where cos(2π(t − ${h})/${P}) > ${uText}. Within one cycle, that is when the input is between −${piText(alpha)} and ${piText(alpha)}, so t − ${h} is between −${dec(reach)} and ${dec(reach)}. The length of that stretch is 2(${dec(reach)}) = ${dec(above)} ${c.word}.`,
        ],
        data: { P, h, A, d, t0, t0Value, target, first, above, model },
      });
    },
    verify({ data: { P, h, t0, t0Value, target, first, above, model } }) {
      assertNear(value(model, t0), t0Value, "value");
      assertNear(value(model, first), target, "first time");
      for (let t = 0; t < first - 1e-3; t += 0.01)
        assert(Math.abs(value(model, t) - target) > 1e-6, "earlier solution");
      let time = 0;
      const steps = 24000;
      for (let i = 0; i < steps; i++)
        if (value(model, h + (i * P) / steps) > target) time += P / steps;
      assertNear(time, above, "time above", 3e-3);
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "period-and-amplitude-from-data",
    skill: "support-conclusions",
    make(r) {
      const mask = r.pick([
        [true, true, false],
        [true, false, true],
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      const kinds = r.shuffle(["period", "midline", "phase", "reliability"]).slice(0, 3);
      const claims = kinds.map((kind, i) => claim(r, kind, mask[i]));
      for (const c of claims)
        if (c.check() !== c.truth) reject("claim accidentally flipped");
      return problem({
        stem: "Decide whether each statement is true or false.",
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
      for (const c of claims) assert(c.check() === c.truth, `claim: ${c.statement}`);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "phase-shift-and-regression",
    skill: "construct-functions",
    make(r) {
      const c = r.pick(CONTEXTS);
      const P = r.pick([8, 12, 16, 20, 24]);
      const h = r.int(1, P - 1);
      const A = r.int(3, 9);
      const d = A + r.int(1, 10);
      const shift = h - P / 4;
      const model = { A, P, h: shift, d };
      const wait = r.pick([1, 2, 3]);
      const predicted = round(value(model, h + wait, "sin"), 4);
      return problem({
        stem: `The function ${c.fn} models ${c.about}, where t is measured in ${c.tUnit}. It is sinusoidal with a period of ${P}, a maximum value of ${d + A} at t = ${h}, and a minimum value of ${d - A}.`,
        parts: [
          part(
            `A sine model has the form ${c.fn}(t) = a sin(b(t − s)) + d with b > 0. Find s so that the maximum occurs at t = ${h}. Choose the value of s with ${sg(-P / 4)} ≤ s < ${(3 * P) / 4}.`,
            ask.number("s =", shift),
          ),
          part(
            `Write a formula for ${c.fn}(t) using a sine function.`,
            ask.expr(`${c.fn}(t) =`, cosModel(model, "sin"), { vars: ["t"] }),
          ),
          part(
            `Use your model to find ${c.fn}(${h + wait}). Round to the nearest hundredth.`,
            ask.number(`${c.fn}(${h + wait}) =`, predicted, {
              decimals: 2,
              unit: c.unit,
            }),
          ),
        ],
        solution: [
          `A sine reaches its maximum when its input is π/2. The input is 2π(t − s)/${P}, so at t = ${h}: 2π(${h} − s)/${P} = π/2, which gives ${h} − s = ${P / 4} and s = ${h} − ${P / 4} = ${sg(shift)}.`,
          `The amplitude is (${d + A} − ${d - A})/2 = ${A} and the midline is ${d}. So ${c.fn}(t) = ${cosModel(model, "sin")}.`,
          `${c.fn}(${h + wait}) = ${A} sin(2π(${h + wait} − ${paren(sg(shift))})/${P}) + ${d} ≈ ${dec(predicted)}.`,
        ],
        data: { P, h, A, d, shift, model, wait, predicted },
      });
    },
    verify({ data: { P, h, A, d, shift, model, wait, predicted } }) {
      const f = (t) => value(model, t, "sin");
      assertNear(f(h), d + A, "max");
      assertNear(f(h + P / 2), d - A, "min");
      assertNear(f(h + wait), predicted, "prediction", 1e-4);
      assert(shift >= -P / 4 && shift < (3 * P) / 4, "range of s");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "phase-shift-and-regression",
    skill: "apply-results",
    make(r) {
      const c = r.pick(CONTEXTS);
      const a = r.int(20, 90) / 10;
      const b = r.pick([0.26, 0.31, 0.45, 0.52, 0.63, 0.79]);
      const h = r.int(5, 60) / 10;
      const d = r.int(100, 200) / 10;
      const period = round((2 * PI) / b, 3);
      const x0 = round(h + PI / (2 * b), 2);
      // First t ≥ 0 where a sin(b(t − h)) + d is largest: b(t − h) = π/2 + 2πn.
      let first = Infinity;
      for (let n = -5; n <= 5; n++) {
        const t = h + (PI / 2 + 2 * PI * n) / b;
        if (t >= -1e-9 && t < first) first = t;
      }
      first = round(first, 3);
      return problem({
        stem: `A sinusoidal regression on data about ${c.about}, gives ${c.fn}(t) = ${dec(a)} sin(${dec(b)}(t − ${dec(h)})) + ${dec(d)}, where t is measured in ${c.tUnit}.`,
        parts: [
          part(
            "Find the period of the model. Round to the nearest hundredth.",
            ask.number("Period:", period, { decimals: 2 }),
          ),
          part(
            "Find the maximum value the model predicts.",
            ask.number("Maximum:", round(d + a, 2), { unit: c.unit }),
          ),
          part(
            "Find the first time t ≥ 0 at which the model reaches its maximum value. Round to the nearest hundredth.",
            ask.number("t =", first, { decimals: 2 }),
          ),
        ],
        solution: [
          `The period is 2π/b = 2π/${dec(b)} ≈ ${dec(period)}.`,
          `The amplitude is ${dec(a)} and the midline is ${dec(d)}, so the maximum is ${dec(d)} + ${dec(a)} = ${dec(d + a)}.`,
          `The model is at its maximum when ${dec(b)}(t − ${dec(h)}) = π/2 + 2πn. For n = 0 this gives t = ${dec(h)} + (π/2)/${dec(b)} ≈ ${dec(x0)}, and each other whole number n moves t by ${dec(period)}. The first value with t ≥ 0 is t ≈ ${dec(first)}.`,
        ],
        data: { a, b, h, d, period, first },
      });
    },
    verify({ data: { a, b, h, d, period, first } }) {
      const f = (t) => a * Math.sin(b * (t - h)) + d;
      assertNear(period, (2 * PI) / b, "period", 1e-3);
      assertNear(f(first), d + a, "maximum", 1e-3);
      for (let t = 0; t < first - 0.01; t += 0.005)
        assert(f(t) < d + a - 1e-6, "earlier maximum");
    },
  },
];

// A phrase for the shifted input of a cosine: t − 3 or t + 3.
const inputText = (c) => (c < 0 ? `t − ${-c}` : `t + ${c}`);

// One true or false statement about building and using sinusoidal models.
function claim(r, kind, truth) {
  if (kind === "period") {
    const t1 = r.int(0, 6);
    const half = r.pick([3, 4, 5, 6, 7, 8]);
    const t2 = t1 + half;
    const P = 2 * half;
    const said = truth ? P : r.pick([half, P + 2, half + t1 + 1].filter((x) => x !== P));
    return {
      truth,
      statement: `A sinusoidal model has a maximum at t = ${t1} and its next minimum at t = ${t2}. Its period is ${said}.`,
      reason: `A maximum to the next minimum is half a cycle: ${t2} − ${t1} = ${half}. The period is 2(${half}) = ${P}. ${truth ? "The statement is true." : `The period is not ${said}, so the statement is false.`}`,
      check: () => said === 2 * (t2 - t1),
    };
  }
  if (kind === "midline") {
    const m = r.int(2, 10);
    const A = r.int(2, 9);
    const M = m + 2 * A;
    const d = m + A;
    const asksAmplitude = r.chance();
    const right = asksAmplitude ? A : d;
    const said = truth ? right : asksAmplitude ? d : A;
    return {
      truth,
      statement: `A sinusoidal model has a maximum value of ${M} and a minimum value of ${m}. Its ${asksAmplitude ? "amplitude is" : "midline is y ="} ${said}.`,
      reason: asksAmplitude
        ? `The amplitude is half the difference: (${M} − ${m})/2 = ${A}. ${truth ? "The statement is true." : `It is not ${said}, so the statement is false.`}`
        : `The midline is the mean of the extremes: (${M} + ${m})/2 = ${d}. ${truth ? "The statement is true." : `It is not y = ${said}, so the statement is false.`}`,
      check: () => said === right,
    };
  }
  if (kind === "phase") {
    const h = r.int(2, 9);
    const P = r.pick([8, 12, 24]);
    const c = truth ? -h : r.pick([h, h + 1]);
    return {
      truth,
      statement: `The model C(t) = 5 cos(2π(${inputText(c)})/${P}) + 8 has a maximum at t = ${h}.`,
      reason: `A cosine reaches its maximum when its input is 0. Here ${inputText(c)} = 0 when t = ${sg(-c)}, and then every ${P} units. ${truth ? `So there is a maximum at t = ${h}, and the statement is true.` : `The value ${h} is not one of those times, so the statement is false.`}`,
      check: () => Math.abs(5 * Math.cos((2 * PI * (h + c)) / P) + 8 - 13) < 1e-9,
    };
  }
  const inside = r.int(2, 20);
  const outside = r.pick([200, 400, 900]);
  const a = truth ? inside : outside;
  const b = truth ? outside : inside;
  const inData = (t) => t >= 0 && t <= 24;
  return {
    truth,
    statement: `A sinusoidal model was built from data collected for 0 ≤ t ≤ 24. A prediction at t = ${a} is more likely to be reliable than a prediction at t = ${b}.`,
    reason: `A model is most reliable inside the interval of the data that built it. The time ${inside} is inside 0 ≤ t ≤ 24 and ${outside} is far outside it. ${truth ? "The statement is true." : "The statement has it backwards, so it is false."}`,
    check: () => inData(a) && !inData(b),
  };
}

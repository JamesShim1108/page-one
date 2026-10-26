// Typed-answer problems for Topic 2.5. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed values, so a slip in the
// key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  num,
  Q,
  fnOf,
  assert,
  assertNear,
  reject,
  expText,
  expKey,
  powerText,
  roundTo,
  shown,
} from "../../../../practice-kit/index.js";

const qText = (value) => (value instanceof Q ? value.toString() : num(value));
const plain = (value) => qText(value).replace(/−/g, "-");
const keyOf = (a, b, variable = "t") => expKey(a, b, variable).replace(/−/g, "-");
const money = (value) => Number(value).toLocaleString("en-US");

// A quantity with its unit: $1,200 or 1,200.
function show(context, value) {
  const n = value instanceof Q ? value.value : value;
  const body = Number.isInteger(n) ? money(n) : money(roundTo(n, 3));
  return context.dollars ? `$${body}` : `${body}${context.suffix || ""}`;
}

// A table cell: the unit is in the stem, so the cell is just the number.
const cell = (value) => {
  const n = value instanceof Q ? value.value : value;
  return money(Number.isInteger(n) ? n : roundTo(n, 3));
};

// The quantity with its measure for a stem: "mass of a radioactive sample, in grams,".
const named = (c) => `${c.noun}${c.measure ? `, ${c.measure},` : ""}`;

// "= 729" when a value is exact, "≈ 1,972.148" when it was rounded.
function approx(raw) {
  const rounded = roundTo(raw, 3);
  if (Math.abs(raw - rounded) < 1e-9) return `= ${money(rounded)}`;
  return `≈ ${rounded.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
}

// A non-terminating exact value may be typed as a three-decimal rounding.
const tolerance = (q) => (shown(q) instanceof Q ? { decimals: 3 } : {});

// Contexts for growth and decay. `dir` says which way the quantity can move.
const CONTEXTS = [
  { fn: "P", noun: "population of a town", unit: "year", dir: "both" },
  { fn: "N", noun: "number of bacteria in a culture", unit: "hour", dir: "both" },
  { fn: "U", noun: "number of subscribers to a channel", unit: "month", dir: "up" },
  {
    fn: "B",
    noun: "balance of an investment account",
    measure: "in dollars",
    unit: "year",
    dir: "up",
    dollars: true,
  },
  {
    fn: "M",
    noun: "mass of a radioactive sample",
    measure: "in grams",
    suffix: " grams",
    unit: "day",
    dir: "down",
  },
  {
    fn: "V",
    noun: "value of a machine",
    measure: "in dollars",
    unit: "year",
    dir: "down",
    dollars: true,
  },
];
const pickContext = (r, up, unitFilter) =>
  r.pick(
    CONTEXTS.filter(
      (c) =>
        (c.dir === "both" || c.dir === (up ? "up" : "down")) &&
        (!unitFilter || c.unit === unitFilter),
    ),
  );
const plural = (c) => `${c.unit}s`;

const RATIOS = [
  new Q(2),
  new Q(3),
  new Q(3, 2),
  new Q(5, 4),
  new Q(6, 5),
  new Q(1, 2),
  new Q(2, 3),
  new Q(4, 5),
  new Q(1, 3),
  new Q(3, 4),
];
const wrapRatio = (ratio) => {
  const text = qText(shown(ratio));
  return /\//.test(text) ? `(${text})` : text;
};

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "proportional-growth",
    skill: "identify-information",
    make(r) {
      const ratio = r.pick(RATIOS);
      const up = ratio.value > 1;
      const c = pickContext(r, up);
      const step = r.pick([1, 2, 3, 5]);
      const start =
        ratio.d ** 3 * r.pick(ratio.d === 1 ? [4, 5, 6, 8, 10, 12] : [2, 3, 4, 5]);
      const ys = [0, 1, 2, 3].map((k) => new Q(start).mul(ratio.pow(k)));
      const times = [0, 1, 2].map((k) => k * step);
      return problem({
        stem: `The table gives the ${named(c)} at equally spaced times, where t is measured in ${plural(c)}. The values follow an exponential pattern.`,
        blocks: [
          table(
            `${c.fn}(t) over time`,
            ["t", `${c.fn}(t)`],
            times.map((t, k) => [num(t), cell(ys[k])]),
          ),
        ],
        parts: [
          part(
            "Find the constant ratio of each output to the previous output.",
            ask.number("Ratio =", ratio, tolerance(ratio)),
          ),
          part(`Find ${c.fn}(${3 * step}).`, ask.number(`${c.fn}(${3 * step}) =`, ys[3])),
        ],
        solution: [
          `Dividing each output by the one before it gives ${cell(ys[1])}/${cell(ys[0])} = ${qText(shown(ratio))} and ${cell(ys[2])}/${cell(ys[1])} = ${qText(shown(ratio))}, so the ratio is ${qText(shown(ratio))} for every ${step === 1 ? c.unit : `${step} ${plural(c)}`}.`,
          `The next output is ${cell(ys[2])}·${wrapRatio(ratio)} = ${cell(ys[3])}.`,
        ],
        data: { ratio, ys },
      });
    },
    verify({ data: { ratio, ys } }) {
      for (let k = 1; k < ys.length; k += 1)
        assertNear(ys[k].value / ys[k - 1].value, ratio.value, `ratio ${k}`);
      assert(
        ys.every((y) => y.isInteger),
        "whole-number outputs",
      );
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "building-models",
    skill: "construct-functions",
    make(r) {
      const ratio = r.pick(RATIOS);
      const up = ratio.value > 1;
      const c = pickContext(r, up);
      const step = r.pick([2, 3, 4, 5]);
      const n = r.int(2, 3);
      const scale = ratio.d ** n;
      const a =
        scale *
        r.pick(
          [10, 20, 40, 50, 100, 200].filter((m) => scale * m <= 8000 && scale * m >= 40),
        );
      if (!Number.isFinite(a)) reject("no scale fits");
      const value = new Q(a).mul(ratio.pow(n));
      const key = `${a}*(${plain(ratio)})^(t/${step})`;
      return problem({
        stem: `The ${c.noun} is ${show(c, a)} at time t = 0. Every ${step} ${plural(c)}, it is multiplied by ${qText(shown(ratio))}. Let t be the number of ${plural(c)} since t = 0.`,
        parts: [
          part(
            `Write an expression for ${c.fn}(t).`,
            ask.expr(`${c.fn}(t) =`, key, {
              vars: ["t"],
              text: `${a}(${qText(shown(ratio))})^(t/${step})`,
            }),
          ),
          part(`Find ${c.fn}(${n * step}).`, ask.number(`${c.fn}(${n * step}) =`, value)),
        ],
        solution: [
          `In t ${plural(c)} there are t/${step} periods of ${step} ${plural(c)}, and each period multiplies the quantity by ${qText(shown(ratio))}.`,
          `So ${c.fn}(t) = ${a}(${qText(shown(ratio))})^(t/${step}).`,
          `${c.fn}(${n * step}) = ${a}(${qText(shown(ratio))})^(${n * step}/${step}) = ${expText(a, shown(ratio), n)} = ${cell(value)}.`,
        ],
        data: { key, a, ratio, step, n, value },
      });
    },
    verify({ data: { key, a, ratio, step, n, value } }) {
      const f = fnOf(key, "t");
      assertNear(f(0), a, "initial value");
      assertNear(f(step) / f(0), ratio.value, "ratio per period");
      assertNear(f(n * step), value.value, "later value");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "using-models",
    skill: "construct-functions",
    make(r) {
      const up = r.chance();
      const c = pickContext(r, up);
      const rate = r.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25]);
      const b = new Q(100 + (up ? rate : -rate), 100);
      const a = r.pick([100, 250, 400, 500, 800, 1200, 2000, 5000]);
      const key = keyOf(a, b);
      return problem({
        stem: `The ${c.noun} is ${show(c, a)} at time t = 0, where t is measured in ${plural(c)}. Each ${c.unit}, it ${up ? "increases" : "decreases"} by ${rate}% of its value at the start of that ${c.unit}.`,
        parts: [
          part("Find the growth factor.", ask.number("Growth factor =", b)),
          part(
            `Write ${c.fn}(t) in the form abᵗ.`,
            ask.expr(`${c.fn}(t) =`, key, {
              vars: ["t"],
              form: "exponential",
              text: expText(a, shown(b), "t"),
            }),
          ),
        ],
        solution: [
          `A ${rate}% ${up ? "increase" : "decrease"} each ${c.unit} leaves ${up ? "100% + " : "100% − "}${rate}% = ${100 + (up ? rate : -rate)}% of the previous value, so the growth factor is ${qText(shown(b))}.`,
          `With initial value ${cell(a)}, ${c.fn}(t) = ${expText(a, shown(b), "t")}.`,
        ],
        data: { key, a, b, rate, up },
      });
    },
    verify({ data: { key, a, b, rate, up } }) {
      const f = fnOf(key, "t");
      assertNear(f(0), a, "initial value");
      assertNear(f(1) / f(0), 1 + (up ? rate : -rate) / 100, "growth factor");
      assertNear(b.value, 1 + (up ? rate : -rate) / 100, "factor");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "using-models",
    skill: "apply-results",
    make(r) {
      const up = r.chance();
      const c = pickContext(r, up);
      const rate = r.pick(up ? [3, 4, 5, 6, 8, 10, 12] : [3, 4, 5, 6, 8, 10, 12, 15]);
      const b = new Q(100 + (up ? rate : -rate), 100);
      const a = r.pick([200, 300, 450, 500, 800, 1200, 2500, 4000]);
      const n = r.pick([3, 5, 6, 8, 10, 12]);
      const value = roundTo(a * b.value ** n, 3);
      return problem({
        stem: `The ${named(c)} is modeled by ${c.fn}(t) = ${expText(a, shown(b), "t")}, where t is the number of ${plural(c)} since the start of observation.`,
        parts: [
          part("Find the initial value of the model.", ask.number("Initial value =", a)),
          part(
            `Find ${c.fn}(${n}). Round your answer to three decimal places.`,
            ask.number(`${c.fn}(${n}) =`, value, { decimals: 3 }),
          ),
        ],
        solution: [
          `The initial value is ${c.fn}(0) = ${cell(a)}.`,
          `${c.fn}(${n}) = ${expText(a, shown(b), n)} ${approx(a * b.value ** n)}.`,
        ],
        data: { a, b, n, value },
      });
    },
    verify({ data: { a, b, n, value } }) {
      const f = fnOf(keyOf(a, b), "t");
      assertNear(f(0), a, "initial value");
      assert(Math.abs(f(n) - value) <= 0.0005 + 1e-9, "rounded value");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "proportional-growth",
    skill: "support-conclusions",
    make(r) {
      const warming = r.chance();
      const ratio = r.pick([
        new Q(1, 2),
        new Q(2, 3),
        new Q(3, 4),
        new Q(1, 3),
        new Q(4, 5),
      ]);
      const room = r.pick([60, 65, 68, 70, 72, 75]);
      const unit = ratio.d ** 3;
      const multipliers = (
        warming
          ? { 8: [3, 4, 5, 6], 27: [1, 2], 64: [1], 125: [] }
          : { 8: [8, 10, 12, 15], 27: [3, 4], 64: [1, 2], 125: [1] }
      )[unit];
      if (!multipliers.length) reject("no readable starting gap");
      const A = unit * r.pick(multipliers);
      if (warming && room - A < 5) reject("the drink would start below 5 degrees");
      if (!warming && room + A > 205) reject("too hot");
      const s = r.pick([5, 10, 15, 20]);
      const sign = warming ? -1 : 1;
      const ys = [0, 1, 2, 3].map((k) => room + sign * A * ratio.pow(k).value);
      const diffs = ys.map((y) => y - room);
      const key = `${room}${warming ? "-" : "+"}${A}*(${plain(ratio)})^(t/${s})`;
      return problem({
        stem: warming
          ? `A cold drink is placed in a room kept at a constant temperature. The table shows its temperature T, in degrees Fahrenheit, t minutes later.`
          : `A cup of tea is placed in a room kept at a constant temperature. The table shows its temperature T, in degrees Fahrenheit, t minutes later.`,
        blocks: [
          table(
            "Temperature over time",
            ["t (minutes)", "T(t) (°F)"],
            ys.map((y, k) => [num(k * s), num(y)]),
          ),
        ],
        parts: [
          part(
            "The temperatures themselves are not proportional. What constant, subtracted from each temperature, gives values with a constant ratio?",
            ask.number("Constant =", room),
          ),
          part(
            "After that constant is subtracted, what is the ratio of each value to the previous value?",
            ask.number("Ratio =", ratio, tolerance(ratio)),
          ),
          part(
            "Write an expression for T(t).",
            ask.expr("T(t) =", key, {
              vars: ["t"],
              text: `${room} ${warming ? "−" : "+"} ${A}(${qText(shown(ratio))})^(t/${s})`,
            }),
          ),
        ],
        solution: [
          `Subtracting ${room} from each temperature gives ${diffs.map((d) => num(d)).join(", ")}.`,
          `Each value is ${qText(shown(ratio))} times the one before it, so the ratio is ${qText(shown(ratio))} for every ${s} minutes.`,
          `So T(t) − ${room} = ${warming ? "−" : ""}${A}(${qText(shown(ratio))})^(t/${s}), and T(t) = ${room} ${warming ? "−" : "+"} ${A}(${qText(shown(ratio))})^(t/${s}).`,
        ],
        data: { key, ys, room, s, ratio, diffs },
      });
    },
    verify({ data: { key, ys, room, s, ratio, diffs } }) {
      const f = fnOf(key, "t");
      ys.forEach((y, k) => assertNear(f(k * s), y, `table row ${k}`));
      for (let k = 1; k < diffs.length; k += 1)
        assertNear(diffs[k] / diffs[k - 1], ratio.value, `ratio ${k}`);
      assert(
        ys.every((y) => Number.isInteger(y)),
        "whole-number temperatures",
      );
      assert(
        ys.every((y) => y > 0 && y < 213),
        "plausible temperatures",
      );
      assertNear(f(500), room, "approaches the room temperature", 1e-3);
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "building-models",
    skill: "construct-functions",
    make(r) {
      const b = r.pick([
        new Q(6, 5),
        new Q(5, 4),
        new Q(3, 2),
        new Q(2),
        new Q(11, 10),
        new Q(9, 10),
        new Q(4, 5),
        new Q(3, 4),
        new Q(1, 2),
        new Q(2, 3),
      ]);
      const up = b.value > 1;
      const c = pickContext(r, up);
      const t1 = r.int(1, 3);
      const gap = r.pick([1, 2, 3]);
      const t2 = t1 + gap;
      const t3 = t2 + r.int(1, 3);
      const D = b.d ** gap;
      const low = Math.ceil(60 / D);
      const high = Math.floor(900 / D);
      if (low > high) reject("no readable data values");
      const y1 = D * r.int(low, high);
      const ratio = b.pow(gap);
      const y2 = new Q(y1).mul(ratio);
      const a = new Q(y1).div(b.pow(t1));
      const aRounded = roundTo(a.value, 3);
      const y3 = roundTo(a.value * b.value ** t3, 3);
      return problem({
        stem: `The ${named(c)} is modeled by an exponential function ${c.fn}(t) = abᵗ, where t is the number of ${plural(c)} since the start of observation. The model satisfies ${c.fn}(${t1}) = ${cell(y1)} and ${c.fn}(${t2}) = ${cell(y2)}.`,
        parts: [
          part("Find the value of b.", ask.number("b =", b, tolerance(b))),
          part(
            "Find the value of a. Round your answer to three decimal places.",
            ask.number("a =", aRounded, { decimals: 3 }),
          ),
          part(
            `Use the model to find ${c.fn}(${t3}). Round your answer to three decimal places.`,
            ask.number(`${c.fn}(${t3}) =`, y3, { decimals: 3 }),
          ),
        ],
        solution: [
          `The data give ab^${t1} = ${cell(y1)} and ab^${t2} = ${cell(y2)}.`,
          gap === 1
            ? `Dividing the second equation by the first gives b = ${cell(y2)}/${cell(y1)} = ${qText(shown(b))}.`
            : `Dividing the second equation by the first gives b^${gap} = ${cell(y2)}/${cell(y1)} = ${qText(shown(ratio))}, so b = ${qText(shown(b))}.`,
          `Then a = ${cell(y1)}/${powerText(shown(b), t1)} ${approx(a.value)}.`,
          `${c.fn}(${t3}) = a(${qText(shown(b))})^${t3} ${approx(a.value * b.value ** t3)}.`,
        ],
        data: { a, b, t1, t2, t3, y1, y2, y3 },
      });
    },
    verify({ data: { a, b, t1, t2, t3, y1, y2, y3 } }) {
      const f = fnOf(`(${plain(a)})*(${plain(b)})^t`, "t");
      assertNear(f(t1), y1, "first data point");
      assertNear(f(t2), y2.value, "second data point");
      assert(y2.isInteger, "whole-number data");
      assert(Math.abs(f(t3) - y3) <= 0.0005 + 1e-9, "prediction");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "using-models",
    skill: "apply-results",
    make(r) {
      const up = r.chance();
      const c = pickContext(r, up);
      const rate = r.pick(up ? [3, 4, 5, 6, 8, 10, 12] : [4, 5, 6, 8, 10, 12, 15]);
      const b = new Q(100 + (up ? rate : -rate), 100);
      const a = r.pick([500, 800, 1200, 2500, 4000]);
      const n = r.pick([4, 6, 8, 10]);
      const value = roundTo(a * b.value ** n, 3);
      // A readable target value, then the time the model reaches it.
      const raw = a * b.value ** r.int(6, 14);
      const target =
        raw >= 1000 ? Math.round(raw / 100) * 100 : Math.round(raw / 10) * 10;
      const when = roundTo(Math.log(target / a) / Math.log(b.value), 3);
      if (!(when > 0.5) || when > 40) reject("an unusable time");
      return problem({
        stem: `The ${named(c)} is modeled by ${c.fn}(t) = ${expText(a, shown(b), "t")}, where t is the number of ${plural(c)} since the start of observation.`,
        parts: [
          part(
            `Does the ${c.noun} increase or decrease each ${c.unit}?`,
            ask.choice(
              `${c.fn}(t) will`,
              ["increase", "decrease"],
              up ? "increase" : "decrease",
            ),
          ),
          part(
            `By what percent does it ${up ? "increase" : "decrease"} each ${c.unit}?`,
            ask.number("Percent =", rate, { unit: "%" }),
          ),
          part(
            `Find ${c.fn}(${n}). Round your answer to three decimal places.`,
            ask.number(`${c.fn}(${n}) =`, value, { decimals: 3 }),
          ),
          part(
            `According to the model, in how many ${plural(c)} will the ${c.noun} reach ${show(c, target)}? Round your answer to three decimal places.`,
            ask.number("t =", when, { decimals: 3 }),
          ),
        ],
        solution: [
          `The base is ${qText(shown(b))}, which is ${up ? "greater" : "less"} than 1, so the ${c.noun} ${up ? "increases" : "decreases"}. ${qText(shown(b))} = 1 ${up ? "+" : "−"} ${qText(rate / 100)}, so the change is ${rate}% each ${c.unit}.`,
          `${c.fn}(${n}) = ${expText(a, shown(b), n)} ${approx(a * b.value ** n)}.`,
          `Solve ${expText(a, shown(b), "t")} = ${cell(target)} using technology: the graphs of ${c.fn} and y = ${target} intersect at t ${approx(Math.log(target / a) / Math.log(b.value))}.`,
        ],
        data: { a, b, n, value, target, when, up, rate },
      });
    },
    verify({ data: { a, b, n, value, target, when, up, rate } }) {
      const f = fnOf(keyOf(a, b), "t");
      assert(Math.abs(f(n) - value) <= 0.0005 + 1e-9, "rounded value");
      assert(
        Math.abs(f(when) - target) <= Math.max(0.05, Math.abs(target) * 1e-4),
        "target time",
      );
      assert(f(1) > f(0) === up, "direction");
      assertNear(Math.abs(f(1) / f(0) - 1) * 100, rate, "percent");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "using-models",
    skill: "equivalent-forms",
    make(r) {
      const half = r.chance();
      const up = r.chance();
      const c = pickContext(r, up, "year");
      const a = r.pick([200, 500, 800, 1000, 1500, 2400, 5000]);
      const factor = half
        ? r.pick(
            up
              ? [new Q(11, 10), new Q(6, 5), new Q(3, 2), new Q(2)]
              : [new Q(9, 10), new Q(4, 5), new Q(1, 2)],
          )
        : null;
      const yearly = half
        ? factor.pow(2)
        : r.pick(
            up
              ? [new Q(11, 10), new Q(6, 5), new Q(3, 2), new Q(2)]
              : [new Q(9, 10), new Q(4, 5), new Q(1, 2)],
          );
      const periodFactor = half ? factor : yearly.pow(2);
      const period = half ? "6-month" : "2-year";
      const periodText = half ? "6 months" : "2 years";
      const percentChange = periodFactor.sub(new Q(1)).mul(new Q(100));
      const percent = percentChange.n < 0 ? percentChange.neg() : percentChange;
      const grows = periodFactor.value > 1;
      const key = keyOf(a, periodFactor, "s");
      return problem({
        stem: `The ${named(c)} is modeled by ${c.fn}(t) = ${expText(a, shown(yearly), "t")}, where t is the number of years since the start of observation. Let s be the number of ${period} periods since the start, so that s = ${half ? "2t" : "t/2"}.`,
        parts: [
          part(
            `By what factor does the ${c.noun} change every ${periodText}?`,
            ask.number("Factor =", periodFactor, tolerance(periodFactor)),
          ),
          part(
            `By what percent does the ${c.noun} ${grows ? "increase" : "decrease"} every ${periodText}?`,
            ask.number("Percent =", percent, { unit: "%", ...tolerance(percent) }),
          ),
          part(
            `Write ${c.fn} as a function of s in the form acˢ, where a and c are constants.`,
            ask.expr(`${c.fn} =`, key, {
              vars: ["s"],
              form: "exponential",
              text: expText(a, shown(periodFactor), "s"),
            }),
          ),
        ],
        solution: half
          ? [
              `Since s = 2t, t = s/2, so ${c.fn} = ${expText(a, shown(yearly), "s/2")} = ${a}(${powerText(shown(yearly), "1/2")})ˢ.`,
              `The factor is ${powerText(shown(yearly), "1/2")} = ${qText(shown(periodFactor))} every 6 months. That is ${grows ? "an increase" : "a decrease"} of ${qText(shown(percent))}%.`,
              `So ${c.fn} = ${expText(a, shown(periodFactor), "s")}.`,
            ]
          : [
              `Since s = t/2, t = 2s, so ${c.fn} = ${expText(a, shown(yearly), "2s")} = ${a}(${powerText(shown(yearly), 2)})ˢ.`,
              `The factor is ${powerText(shown(yearly), 2)} = ${qText(shown(periodFactor))} every 2 years. That is ${grows ? "an increase" : "a decrease"} of ${qText(shown(percent))}%.`,
              `So ${c.fn} = ${expText(a, shown(periodFactor), "s")}.`,
            ],
        data: { key, a, yearly, periodFactor, half, percent, grows },
      });
    },
    verify({ data: { key, a, yearly, periodFactor, half, percent, grows } }) {
      const f = fnOf(keyOf(a, yearly), "t");
      const g = fnOf(key, "s");
      for (const t of [0, 1, 2, 3.5])
        assertNear(f(t), g(half ? 2 * t : t / 2), `equal at t = ${t}`);
      assertNear(Math.abs(periodFactor.value - 1) * 100, percent.value, "percent");
      assert(periodFactor.value > 1 === grows, "direction");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "building-models",
    skill: "equivalent-forms",
    make(r) {
      const up = r.chance();
      const c = pickContext(r, up);
      const k =
        r.pick([0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.1, 0.12, 0.15, 0.2]) *
        (up ? 1 : -1);
      const a = r.pick([100, 300, 500, 800, 1500, 2000]);
      const T = r.pick([5, 8, 10, 12, 15, 20]);
      const b = Math.exp(k);
      const bRounded = roundTo(b, 3);
      const change = roundTo((b - 1) * 100, 1);
      const value = roundTo(a * Math.exp(k * T), 3);
      if (value > 1e7 || value < 0.01) reject("an extreme value");
      const kText = num(k);
      return problem({
        stem: `The ${named(c)} is modeled by ${c.fn}(t) = ${a}e^(${kText}t), where t is the number of ${plural(c)} since the start of observation and e is the natural base, e ≈ 2.718.`,
        parts: [
          part(
            `The model can be written as ${c.fn}(t) = ${a}bᵗ. Find the value of b. Round your answer to three decimal places.`,
            ask.number("b =", bRounded, { decimals: 3 }),
          ),
          part(
            `By what percent does the ${c.noun} ${up ? "increase" : "decrease"} each ${c.unit}? Round your answer to one decimal place.`,
            ask.number("Percent =", Math.abs(change), { decimals: 1, unit: "%" }),
          ),
          part(
            `Find ${c.fn}(${T}). Round your answer to three decimal places.`,
            ask.number(`${c.fn}(${T}) =`, value, { decimals: 3 }),
          ),
        ],
        solution: [
          `Use the power property: e^(${kText}t) = (e^(${kText}))ᵗ, so b = e^(${kText}) ${approx(b)}.`,
          `Since b ${up ? ">" : "<"} 1, the quantity ${up ? "increases" : "decreases"} each ${c.unit}. The percent change is 100(${up ? "b − 1" : "1 − b"}) ≈ ${Math.abs(change).toFixed(1)}%.`,
          `${c.fn}(${T}) = ${a}e^(${kText}·${T}) ${approx(a * Math.exp(k * T))}.`,
        ],
        data: { a, k, T, bRounded, change, value, up },
      });
    },
    verify({ data: { a, k, T, bRounded, change, value, up } }) {
      const f = (t) => a * Math.exp(k * t);
      assert(Math.abs(Math.exp(k) - bRounded) <= 0.0005 + 1e-12, "rounded base");
      assert(Math.abs(f(T) - value) <= 0.0005 + 1e-9, "rounded value");
      assert(Math.abs((f(1) / f(0) - 1) * 100 - change) <= 0.05 + 1e-9, "percent change");
      assert(k > 0 === up, "direction");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "using-models",
    skill: "describe",
    make(r) {
      const up = r.chance();
      const c = pickContext(r, up);
      const rate = r.pick(
        up ? [3, 4, 5, 6, 8, 10, 12, 15] : [4, 5, 6, 8, 10, 12, 15, 20],
      );
      const b = new Q(100 + (up ? rate : -rate), 100);
      const a = r.pick([100, 250, 400, 800, 1200, 3000]);
      const verb = up ? "increases" : "decreases";
      const correct = `${verb} by ${rate}% each ${c.unit}`;
      const options = r.shuffle([
        correct,
        `${verb} by ${up ? 100 + rate : 100 - rate}% each ${c.unit}`,
        `${verb} by ${rate} each ${c.unit}`,
        `is multiplied by ${rate} each ${c.unit}`,
      ]);
      const target = up ? 2 : 0.5;
      const time = roundTo(Math.log(target) / Math.log(b.value), 3);
      return problem({
        stem: `The ${named(c)} is modeled by ${c.fn}(t) = ${expText(a, shown(b), "t")}, where t is the number of ${plural(c)} since the start of observation.`,
        parts: [
          part(
            "Which statement correctly interprets the base of the model?",
            ask.choice(`${c.fn}(t)`, options, correct),
          ),
          part(
            `According to the model, how many ${plural(c)} does it take for the ${c.noun} to ${up ? "double" : "be cut in half"}? Round your answer to three decimal places.`,
            ask.number("t =", time, { decimals: 3 }),
          ),
        ],
        solution: [
          `The base ${qText(shown(b))} is the growth factor, so each ${c.unit} the quantity is ${qText(shown(b))} times what it was. Since ${qText(shown(b))} = 1 ${up ? "+" : "−"} ${qText(rate / 100)}, ${c.fn}(t) ${correct}.`,
          `The quantity ${up ? "doubles" : "halves"} when ${powerText(shown(b), "t")} = ${up ? "2" : "0.5"}. Using technology, t ${approx(Math.log(target) / Math.log(b.value))} ${plural(c)}.`,
        ],
        data: { a, b, time, up },
      });
    },
    verify({ data: { a, b, time, up } }) {
      const f = fnOf(keyOf(a, b), "t");
      assert(Math.abs(f(time) / a - (up ? 2 : 0.5)) < 0.01, "doubling or halving time");
    },
  },
];

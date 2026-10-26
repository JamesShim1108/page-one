// Typed-answer problems for Topic 3.15. The distance from the origin to the point (f(θ), θ) is
// |f(θ)|, so it grows when f is positive and increasing or negative and decreasing, and it shrinks
// otherwise. The average rate of change of r is Δr/Δθ in radius units per radian. Every direction
// is rechecked in verify by differencing |f| numerically.

import {
  ask,
  part,
  problem,
  table,
  graph,
  Q,
  piText,
  exact,
  scaled,
  plusText,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const PI = Math.PI;
const abs = (q) => (q.n < 0 ? q.neg() : q);
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const fx = (value, places) => {
  const text = value.toFixed(places);
  return text.startsWith("-") ? `−${text.slice(1)}` : text;
};
const FN = { sin: Math.sin, cos: Math.cos };
const DERIVATIVE = { sin: Math.cos, cos: (t) => -Math.sin(t) };
const opposite = (trend) => (trend === "increasing" ? "decreasing" : "increasing");
const TRENDS = ["increasing", "decreasing"];
const QUARTER_NAMES = ["0 < θ < π/2", "π/2 < θ < π", "π < θ < 3π/2", "3π/2 < θ < 2π"];
// Sign and direction of sin θ and cos θ on each quarter turn.
const SIGNS = {
  sin: [
    { sign: 1, trend: "increasing" },
    { sign: 1, trend: "decreasing" },
    { sign: -1, trend: "decreasing" },
    { sign: -1, trend: "increasing" },
  ],
  cos: [
    { sign: 1, trend: "decreasing" },
    { sign: -1, trend: "decreasing" },
    { sign: -1, trend: "increasing" },
    { sign: 1, trend: "increasing" },
  ],
};
// Angles (in units of π) where sin or cos is a rational number.
const RATIONAL = {
  cos: [0, 1 / 3, 1 / 2, 2 / 3, 1, 4 / 3, 3 / 2, 5 / 3, 2],
  sin: [0, 1 / 6, 1 / 2, 5 / 6, 1, 7 / 6, 3 / 2, 11 / 6, 2],
};
const asQ = (units) => new Q(Math.round(units * 6), 6);
const rationalValue = (fn, angle) => exact(fn, angle).coefficient;
// k + 2k·fn θ for a limaçon with an inner loop.
const loopFn = (k, fn, t) => k + 2 * k * FN[fn](t);
const loopText = (k, fn) => `${k} + ${2 * k} ${fn} θ`;
const loopExpr = (k, fn) => `${k}+${2 * k}${fn === "cos" ? "cos(x)" : "sin(x)"}`;
// The text of a coefficient over π: 3/(2π), −4/π.
const overPi = (c) =>
  c.n === 0
    ? "0"
    : `${c.n < 0 ? "−" : ""}${Math.abs(c.n)}/${c.d === 1 ? "π" : `(${c.d}π)`}`;
// Whether the distance |f| is increasing or decreasing at θ (central difference).
const distanceTrend = (f, t) => {
  const h = 1e-5;
  return Math.abs(f(t + h)) - Math.abs(f(t - h)) > 0 ? "increasing" : "decreasing";
};

// The runs of increase and decrease of the distance for r = k + 2k fn θ on (0, 2π).
function distanceRuns(k, fn) {
  const cuts =
    fn === "cos"
      ? [0, 2 / 3, 1, 4 / 3, 2].map(asQ)
      : [0, 1 / 2, 7 / 6, 3 / 2, 11 / 6, 2].map(asQ);
  return cuts.slice(0, -1).map((from, i) => {
    const to = cuts[i + 1];
    const mid = ((from.value + to.value) / 2) * PI;
    const r = loopFn(k, fn, mid);
    const slope = 2 * k * DERIVATIVE[fn](mid);
    return {
      from,
      to,
      positive: r > 0,
      rTrend: slope > 0 ? "increasing" : "decreasing",
      trend: r * slope > 0 ? "increasing" : "decreasing",
    };
  });
}
const unionText = (runs) =>
  runs.map((run) => `(${piText(run.from)}, ${piText(run.to)})`).join(" ∪ ");

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "increasing-and-decreasing-distance",
    skill: "identify-information",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const a = r.nonzero(-9, 9);
      const q = r.int(0, 3);
      const base = SIGNS[fn][q];
      const sign = base.sign * Math.sign(a);
      const trend = Math.sign(a) > 0 ? base.trend : opposite(base.trend);
      const distance = sign > 0 ? trend : opposite(trend);
      const signWord = sign > 0 ? "positive" : "negative";
      return problem({
        stem: `Consider the polar function r = ${a === 1 ? "" : a === -1 ? "−" : `${sg(a)} `}${fn} θ on the interval ${QUARTER_NAMES[q]}.`,
        parts: [
          part(
            "Is r positive or negative on this interval?",
            ask.choice("r is", ["positive", "negative"], signWord),
          ),
          part(
            "Is r increasing or decreasing on this interval?",
            ask.choice("r is", TRENDS, trend),
          ),
          part(
            "Is the distance between the point (r, θ) and the origin increasing or decreasing?",
            ask.choice("The distance is", TRENDS, distance),
          ),
        ],
        solution: [
          `On ${QUARTER_NAMES[q]}, ${fn} θ is ${base.sign > 0 ? "positive" : "negative"}${Math.sign(a) < 0 ? `, and multiplying by ${sg(a)} flips the sign` : ""}, so r is ${signWord}.`,
          `On this interval ${fn} θ is ${base.trend}${Math.sign(a) < 0 ? `, and multiplying by ${sg(a)} reverses the direction` : ""}, so r is ${trend}.`,
          `r is ${signWord} and ${trend}, so the distance from the origin is ${distance}. (Positive and increasing, or negative and decreasing, means the distance increases.)`,
        ],
        data: { fn, a, q, sign, trend, distance },
      });
    },
    verify({ data: { fn, a, q, sign, trend, distance } }) {
      const f = (t) => a * FN[fn](t);
      const mid = ((q + 0.5) * PI) / 2;
      assert(Math.sign(f(mid)) === sign, "sign");
      const slope = a * DERIVATIVE[fn](mid);
      assert((slope > 0 ? "increasing" : "decreasing") === trend, "trend");
      assert(distanceTrend(f, mid) === distance, "distance");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "increasing-and-decreasing-distance",
    skill: "solve",
    make(r) {
      const k = r.int(1, 5);
      const variant = r.pick([
        {
          fn: "cos",
          s: 1,
          lo: new Q(0),
          hi: new Q(1),
          zero: new Q(2, 3),
          rTrend: "decreasing",
        },
        {
          fn: "sin",
          s: 1,
          lo: new Q(-1, 2),
          hi: new Q(1, 2),
          zero: new Q(-1, 6),
          rTrend: "increasing",
        },
        {
          fn: "cos",
          s: -1,
          lo: new Q(0),
          hi: new Q(1),
          zero: new Q(1, 3),
          rTrend: "increasing",
        },
        {
          fn: "sin",
          s: -1,
          lo: new Q(-1, 2),
          hi: new Q(1, 2),
          zero: new Q(1, 6),
          rTrend: "decreasing",
        },
      ]);
      const { fn, s, lo, hi, zero, rTrend } = variant;
      const f = (t) => k + s * 2 * k * FN[fn](t);
      const firstMid = ((lo.value + zero.value) / 2) * PI;
      const firstPositive = f(firstMid) > 0;
      const firstTrend = firstPositive ? rTrend : opposite(rTrend);
      const decreasing = firstTrend === "decreasing" ? [lo, zero] : [zero, hi];
      const increasing = firstTrend === "increasing" ? [lo, zero] : [zero, hi];
      const text = `${k} ${s < 0 ? "−" : "+"} ${2 * k} ${fn} θ`;
      return problem({
        stem: `The polar function r = ${text} is ${rTrend} on the interval ${piText(lo)} < θ < ${piText(hi)}.`,
        parts: [
          part("For which θ in this interval is r = 0?", ask.number("θ =", piText(zero))),
          part(
            "On what interval is the distance between the point (r, θ) and the origin decreasing?",
            ask.number("from θ =", piText(decreasing[0])),
            ask.number("to θ =", piText(decreasing[1])),
          ),
          part(
            "On what interval is the distance between the point (r, θ) and the origin increasing?",
            ask.number("from θ =", piText(increasing[0])),
            ask.number("to θ =", piText(increasing[1])),
          ),
        ],
        solution: [
          `r = 0 when ${fn} θ = ${s > 0 ? "−1/2" : "1/2"}, which happens at θ = ${piText(zero)} in this interval.`,
          `On ${piText(decreasing[0])} < θ < ${piText(decreasing[1])}, r is ${decreasing[0] === lo ? (firstPositive ? "positive" : "negative") : firstPositive ? "negative" : "positive"} and ${rTrend}, so the distance is decreasing.`,
          `On ${piText(increasing[0])} < θ < ${piText(increasing[1])}, r is ${increasing[0] === lo ? (firstPositive ? "positive" : "negative") : firstPositive ? "negative" : "positive"} and ${rTrend}, so the distance is increasing.`,
        ],
        data: { k, s, fn, lo, hi, zero, rTrend, decreasing, increasing },
      });
    },
    verify({ data: { k, s, fn, lo, hi, zero, rTrend, decreasing, increasing } }) {
      const f = (t) => k + s * 2 * k * FN[fn](t);
      assertNear(f(zero.value * PI), 0, "zero");
      const mid = (a, b) => ((a.value + b.value) / 2) * PI;
      assert(distanceTrend(f, mid(...decreasing)) === "decreasing", "decreasing run");
      assert(distanceTrend(f, mid(...increasing)) === "increasing", "increasing run");
      const slope = s * 2 * k * DERIVATIVE[fn](mid(lo, hi));
      assert((slope > 0 ? "increasing" : "decreasing") === rTrend, "r trend");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "polar-rates-of-change",
    skill: "solve",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const a = r.int(1, 8);
      const b = r.sign() * r.int(1, 6);
      const [u1, u2] = r.sample(RATIONAL[fn], 2).sort((x, y) => x - y);
      const t1 = asQ(u1);
      const t2 = asQ(u2);
      const dr = rationalValue(fn, t2).sub(rationalValue(fn, t1)).mul(b);
      if (dr.n === 0) reject("no change");
      const dTheta = t2.sub(t1);
      const c = dr.div(dTheta);
      const f1 = rationalValue(fn, t1).mul(b).add(a);
      const f2 = rationalValue(fn, t2).mul(b).add(a);
      const decimal = c.value / PI;
      return problem({
        stem: `Let r = ${a} ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : `${Math.abs(b)} `}${fn} θ. Find the average rate of change of r with respect to θ on the interval ${piText(t1)} ≤ θ ≤ ${piText(t2)}.`,
        parts: [
          part(
            "Find the change in r, Δr = r(" + piText(t2) + ") − r(" + piText(t1) + ").",
            ask.number("Δr =", dr),
          ),
          part(
            "Find the average rate of change. Write an exact value.",
            ask.number("Δr/Δθ =", overPi(c)),
          ),
          part(
            "Write the average rate of change as a decimal rounded to 3 places.",
            ask.number("Δr/Δθ ≈", Number(decimal.toFixed(3)), {
              decimals: 3,
              unit: "per radian",
            }),
          ),
        ],
        solution: [
          `r(${piText(t2)}) = ${f2.toString()} and r(${piText(t1)}) = ${f1.toString()}, so Δr = ${f2.toString()} − (${f1.toString()}) = ${dr.toString()}.`,
          `Δθ = ${piText(t2)} − ${piText(t1)} = ${piText(dTheta)}, so Δr/Δθ = (${dr.toString()})/(${piText(dTheta)}) = ${overPi(c)}.`,
          `${overPi(c)} ≈ ${fx(decimal, 3)} units of r per radian.`,
        ],
        data: { fn, a, b, t1, t2, dr, c, decimal },
      });
    },
    verify({ data: { fn, a, b, t1, t2, dr, c, decimal } }) {
      const f = (t) => a + b * FN[fn](t);
      const rise = f(t2.value * PI) - f(t1.value * PI);
      assertNear(rise, dr.value, "Δr");
      assertNear(rise / ((t2.value - t1.value) * PI), decimal, "rate");
      assertNear(c.value / PI, decimal, "exact vs decimal");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "polar-rates-of-change",
    skill: "apply-results",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const a = r.int(2, 8);
      const b = 2 * r.sign() * r.int(1, 4);
      const i = r.int(0, 3);
      const left = new Q(i, 2);
      const right = new Q(i + 1, 2);
      const mid = new Q(2 * i + 1, 4);
      const vLeft = rationalValue(fn, left).mul(b).add(a);
      const vRight = rationalValue(fn, right).mul(b).add(a);
      const dr = vRight.sub(vLeft);
      const rate = dr.mul(2);
      if (dr.n === 0) reject("flat");
      const estimate = vLeft.add(dr.div(2));
      const actual = plusText(a, scaled(fn, mid, b));
      const actualValue = a + scaled(fn, mid, b).value;
      return problem({
        stem: `Let r = ${a} ${b < 0 ? "−" : "+"} ${Math.abs(b)} ${fn} θ. The average rate of change of r on ${piText(left)} ≤ θ ≤ ${piText(right)} can be used to estimate r at the midpoint θ = ${piText(mid)}.`,
        parts: [
          part(
            "Find the average rate of change of r on this interval. Write an exact value.",
            ask.number("Δr/Δθ =", overPi(rate)),
          ),
          part(
            `Use the average rate of change to estimate r(${piText(mid)}) as r(${piText(left)}) + (Δr/Δθ)(${piText(mid.sub(left))}).`,
            ask.number("estimate =", estimate),
          ),
          part(
            `Find the actual value of r(${piText(mid)}). Write an exact value.`,
            ask.number("r =", actual),
          ),
        ],
        solution: [
          `r(${piText(left)}) = ${vLeft.toString()} and r(${piText(right)}) = ${vRight.toString()}, so Δr/Δθ = (${dr.toString()})/(${piText(right.sub(left))}) = ${overPi(rate)}.`,
          `Estimate: r(${piText(mid)}) ≈ ${vLeft.toString()} + (${overPi(rate)})(${piText(mid.sub(left))}) = ${vLeft.toString()} ${dr.n < 0 ? "−" : "+"} ${abs(dr.div(2)).toString()} = ${estimate.toString()}.`,
          `Actual: r(${piText(mid)}) = ${a} ${b < 0 ? "−" : "+"} ${Math.abs(b)}(${exact(fn, mid).text}) = ${actual}, which is about ${fx(actualValue, 3)}. The estimate is close but not exact, because r does not change at a constant rate.`,
        ],
        data: { fn, a, b, left, right, mid, estimate, actualValue, rate },
      });
    },
    verify({ data: { fn, a, b, left, right, mid, estimate, actualValue, rate } }) {
      const f = (t) => a + b * FN[fn](t);
      const slope =
        (f(right.value * PI) - f(left.value * PI)) / ((right.value - left.value) * PI);
      assertNear(slope, rate.value / PI, "rate");
      assertNear(
        f(left.value * PI) + slope * (mid.value - left.value) * PI,
        estimate.value,
        "estimate",
      );
      assertNear(f(mid.value * PI), actualValue, "actual");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "increasing-and-decreasing-distance",
    skill: "describe",
    make(r) {
      const k = r.int(1, 4);
      const fn = r.pick(["sin", "cos"]);
      const runs = distanceRuns(k, fn).slice(0, 4);
      const zeros = fn === "cos" ? [2 / 3, 4 / 3] : [7 / 6, 11 / 6];
      const ticks = (
        fn === "cos" ? [0, 2 / 3, 1, 4 / 3, 2] : [0, 1 / 2, 1, 7 / 6, 3 / 2, 11 / 6, 2]
      ).map((u) => ({ at: u * PI, label: piText(asQ(u)) }));
      const step = k >= 3 ? 2 : 1;
      return problem({
        stem: `The graph of r = ${loopText(k, fn)} is shown with θ on the horizontal axis. For each interval, decide whether the distance between the point (r, θ) and the origin is increasing or decreasing.`,
        blocks: [
          graph({
            caption: `r = ${loopText(k, fn)} for 0 ≤ θ ≤ 2π`,
            alt: `A curve with θ on the horizontal axis and r on the vertical axis. It crosses the θ-axis at ${piText(asQ(zeros[0]))} and ${piText(asQ(zeros[1]))}, is negative between them, and otherwise is positive, reaching ${3 * k} at its highest point.`,
            window: { x: [-0.4, 2 * PI + 0.4], y: [-(k + 1), 3 * k + 1] },
            ticks: { x: ticks, y: step },
            axisLabels: { x: "θ", y: "r" },
            functions: [{ expr: loopExpr(k, fn), domain: [0, 2 * PI] }],
            points: zeros.map((u) => ({ at: [u * PI, 0] })),
          }),
        ],
        parts: runs.map((run) =>
          part(
            `On ${piText(run.from)} < θ < ${piText(run.to)}, is the distance increasing or decreasing?`,
            ask.choice("The distance is", TRENDS, run.trend),
          ),
        ),
        solution: runs.map(
          (run) =>
            `On ${piText(run.from)} < θ < ${piText(run.to)}, the graph is ${run.positive ? "above" : "below"} the θ-axis, so r is ${run.positive ? "positive" : "negative"}, and it is ${run.rTrend}. So the distance is ${run.trend}.`,
        ),
        data: { k, fn, runs },
      });
    },
    verify({ data: { k, fn, runs } }) {
      const f = (t) => loopFn(k, fn, t);
      for (const run of runs) {
        const mid = ((run.from.value + run.to.value) / 2) * PI;
        assert(distanceTrend(f, mid) === run.trend, "trend");
        assert(f(mid) > 0 === run.positive, "sign");
      }
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "polar-rates-of-change",
    skill: "construct-representations",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const a = r.int(2, 9);
      const b = 2 * r.sign() * r.int(1, 4);
      const cols =
        fn === "cos" ? [0, 1 / 3, 1 / 2, 2 / 3, 1] : [0, 1 / 6, 1 / 2, 5 / 6, 1];
      const angles = cols.map(asQ);
      const values = angles.map((t) => rationalValue(fn, t).mul(b).add(a));
      const gaps = r.sample([0, 1, 2, 3], 2).sort((x, y) => x - y);
      const info = gaps.map((g) => {
        const dr = values[g + 1].sub(values[g]);
        const dTheta = angles[g + 1].sub(angles[g]);
        const c = dr.div(dTheta);
        return { g, dr, dTheta, c, decimal: c.value / PI };
      });
      if (Math.abs(Math.abs(info[0].decimal) - Math.abs(info[1].decimal)) < 0.05)
        reject("nearly equal rates");
      const faster = Math.abs(info[0].decimal) > Math.abs(info[1].decimal) ? 0 : 1;
      const name = (x) => `${piText(angles[x.g])} ≤ θ ≤ ${piText(angles[x.g + 1])}`;
      return problem({
        stem: `The table shows values of the polar function r = f(θ), which has the form r = a + b ${fn} θ.`,
        blocks: [
          table(
            "Values of f(θ)",
            ["θ", ...angles.map(piText)],
            [["f(θ)", ...values.map((v) => v.toString())]],
          ),
        ],
        parts: [
          part(
            `Find the average rate of change of r on ${name(info[0])}. Round to 3 decimal places.`,
            ask.number("rate ≈", Number(info[0].decimal.toFixed(3)), {
              decimals: 3,
              unit: "per radian",
            }),
          ),
          part(
            `Find the average rate of change of r on ${name(info[1])}. Round to 3 decimal places.`,
            ask.number("rate ≈", Number(info[1].decimal.toFixed(3)), {
              decimals: 3,
              unit: "per radian",
            }),
          ),
          part(
            "On which interval does the signed radius change faster per radian?",
            ask.choice(
              "The faster change is on the",
              ["first interval", "second interval"],
              faster === 0 ? "first interval" : "second interval",
            ),
          ),
        ],
        solution: [
          `Δr/Δθ = (${values[info[0].g + 1].toString()} − (${values[info[0].g].toString()}))/(${piText(info[0].dTheta)}) = (${info[0].dr.toString()})/(${piText(info[0].dTheta)}) ≈ ${fx(info[0].decimal, 3)}.`,
          `Δr/Δθ = (${values[info[1].g + 1].toString()} − (${values[info[1].g].toString()}))/(${piText(info[1].dTheta)}) = (${info[1].dr.toString()})/(${piText(info[1].dTheta)}) ≈ ${fx(info[1].decimal, 3)}.`,
          `|${fx(info[0].decimal, 3)}| ${faster === 0 ? ">" : "<"} |${fx(info[1].decimal, 3)}|, so r changes faster per radian on the ${faster === 0 ? "first" : "second"} interval.`,
        ],
        data: { fn, a, b, angles, values, info, faster },
      });
    },
    verify({ data: { fn, a, b, angles, info, faster } }) {
      const f = (t) => a + b * FN[fn](t);
      info.forEach((x) => {
        const t1 = angles[x.g].value * PI;
        const t2 = angles[x.g + 1].value * PI;
        assertNear((f(t2) - f(t1)) / (t2 - t1), x.decimal, "rate");
      });
      assert(
        (Math.abs(info[0].decimal) > Math.abs(info[1].decimal) ? 0 : 1) === faster,
        "faster",
      );
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "polar-rates-of-change",
    skill: "apply-results",
    make(r) {
      const contexts = [
        {
          intro: (a, b) =>
            `A security drone circles a radio tower. When the drone's bearing from the tower is θ radians, its distance from the tower is r = ${a} + ${b} cos θ meters.`,
          unit: "meters",
          place: "the tower",
          thing: "drone",
        },
        {
          intro: (a, b) =>
            `A boat sails around a lighthouse. When the boat's bearing from the lighthouse is θ radians, its distance from the lighthouse is r = ${a} + ${b} cos θ meters.`,
          unit: "meters",
          place: "the lighthouse",
          thing: "boat",
        },
        {
          intro: (a, b) =>
            `A robot vacuum leaves its charging station along a looping path. When its bearing from the station is θ radians, its distance from the station is r = ${a} + ${b} cos θ meters.`,
          unit: "meters",
          place: "the charging station",
          thing: "robot",
        },
      ];
      const ctx = r.pick(contexts);
      const b = 2 * r.int(1, 4);
      const a = b + r.int(1, 6);
      const rate = new Q(-2 * b);
      const decimal = (-2 * b) / PI;
      const estimate = a + b - b / 2;
      const closer = r.chance();
      const lo = closer ? "0" : "π";
      const hi = closer ? "π" : "2π";
      return problem({
        stem: ctx.intro(a, b),
        parts: [
          part(
            "Find the average rate of change of r on 0 ≤ θ ≤ π/2. Round to 3 decimal places.",
            ask.number("rate ≈", Number(decimal.toFixed(3)), {
              decimals: 3,
              unit: "meters per radian",
            }),
          ),
          part(
            `On ${lo} < θ < ${hi}, is the ${ctx.thing} getting closer to ${ctx.place} or farther from it?`,
            ask.choice(
              "It is getting",
              ["closer", "farther"],
              closer ? "closer" : "farther",
            ),
          ),
          part(
            "Use the average rate of change on 0 ≤ θ ≤ π/2 to estimate r when θ = π/4.",
            ask.number("estimate =", estimate, { unit: "meters" }),
          ),
        ],
        solution: [
          `r(0) = ${a} + ${b} = ${a + b} and r(π/2) = ${a}, so Δr/Δθ = (${a} − ${a + b})/(π/2) = ${overPi(rate)} ≈ ${fx(decimal, 3)} meters per radian.`,
          closer
            ? `r = ${a} + ${b} cos θ is positive for every θ, because ${a} > ${b}. On 0 < θ < π, cos θ is decreasing, so r is positive and decreasing, and the distance is decreasing: the object is getting closer.`
            : `r = ${a} + ${b} cos θ is positive for every θ, because ${a} > ${b}. On π < θ < 2π, cos θ is increasing, so r is positive and increasing, and the distance is increasing: the object is getting farther.`,
          `Estimate: r(π/4) ≈ r(0) + (Δr/Δθ)(π/4) = ${a + b} + (${overPi(rate)})(π/4) = ${a + b} − ${b / 2} = ${estimate} meters.`,
        ],
        data: { a, b, decimal, estimate, closer },
      });
    },
    verify({ data: { a, b, decimal, estimate, closer } }) {
      const f = (t) => a + b * Math.cos(t);
      assertNear((f(PI / 2) - f(0)) / (PI / 2), decimal, "rate");
      assertNear(f(0) + decimal * (PI / 4), estimate, "estimate");
      assert(
        distanceTrend(f, closer ? 1.2 : 4.2) === (closer ? "decreasing" : "increasing"),
        "direction",
      );
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "increasing-and-decreasing-distance",
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
      const kinds = r.sample(["rule", "aroc", "extremum", "increasing"], 3);
      const claims = kinds.map((kind, i) => {
        const truth = mask[i];
        if (kind === "rule") {
          const sign = r.pick(["positive", "negative"]);
          const trend = r.pick(TRENDS);
          const real = sign === "positive" ? trend : opposite(trend);
          const claimed = truth ? real : opposite(real);
          return {
            text: `If r = f(θ) is ${sign} and ${trend} on an interval, then the distance between the point (f(θ), θ) and the origin is ${claimed} on that interval.`,
            truth,
            why: `A ${sign} r that is ${trend} makes the distance ${real}. ${sign === "positive" ? "When r is positive, the distance is |r| = r, so it moves the way r moves." : "When r is negative, the distance is |r| = −r, so it moves opposite to r."}`,
            check: () => claimed === real,
          };
        }
        if (kind === "aroc") {
          const b = r.int(1, 6);
          const a = r.int(b + 1, b + 5);
          const correct = new Q(2 * b);
          const wrong = r.pick([new Q(b), new Q(4 * b), new Q(-2 * b)]);
          const claimed = truth ? correct : wrong;
          return {
            text: `For r = ${a} − ${b} cos θ, the average rate of change of r on 0 ≤ θ ≤ π/2 is ${overPi(claimed)}.`,
            truth,
            why: `r(0) = ${a} − ${b} = ${a - b} and r(π/2) = ${a}, so Δr/Δθ = ${b}/(π/2) = ${overPi(correct)}.`,
            check: () => {
              const f = (t) => a - b * Math.cos(t);
              const rate = (f(PI / 2) - f(0)) / (PI / 2);
              return Math.abs(rate - claimed.value / PI) < 1e-9;
            },
          };
        }
        if (kind === "extremum") {
          return truth
            ? {
                text: "If r = f(θ) changes from increasing to decreasing at some θ, then the graph has a relative extremum there, which is a point relatively closest to or farthest from the origin.",
                truth,
                why: "A change in direction of r gives a relative extremum of r, and this corresponds to a point relatively closest to or farthest from the origin.",
                check: () => true,
              }
            : {
                text: "If r = f(θ) is increasing on an interval, the distance between the point (f(θ), θ) and the origin must be increasing on that interval.",
                truth,
                why: "The distance also depends on the sign of r. If r is negative and increasing, the distance is decreasing.",
                check: () => false,
              };
        }
        return truth
          ? {
              text: "The average rate of change of r with respect to θ over an interval is the change in r divided by the change in θ.",
              truth,
              why: "Δr/Δθ has units of the radius per radian.",
              check: () => true,
            }
          : {
              text: "A negative average rate of change of r over an interval means the point (r, θ) is closer to the origin at the end of the interval than at the start.",
              truth,
              why: "A negative rate means the signed radius r decreases. If r is negative, a decreasing r puts the point farther from the origin.",
              check: () => false,
            };
      });
      for (const c of claims)
        if (c.check() !== c.truth) reject("claim accidentally flipped");
      return problem({
        stem: "Decide whether each statement is true or false.",
        parts: claims.map((c) =>
          part(
            c.text,
            ask.choice("The statement is", ["true", "false"], c.truth ? "true" : "false"),
          ),
        ),
        solution: claims.map((c) => c.why),
        data: { claims },
      });
    },
    verify({ data: { claims } }) {
      for (const c of claims) assert(c.check() === c.truth, `claim: ${c.text}`);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "increasing-and-decreasing-distance",
    skill: "apply-results",
    make(r) {
      const a = r.nonzero(-6, 6);
      const i = r.int(0, 3);
      const start = new Q(i, 2);
      const end = new Q(i + 1, 2);
      const tip = new Q(2 * i + 1, 4);
      const sign = Math.sign(a) * (i % 2 === 0 ? 1 : -1);
      // r goes from 0 to sign·|a| on the first half, then back to 0.
      const firstR = sign > 0 ? "increasing" : "decreasing";
      const dr = sign * Math.abs(a);
      const rate = new Q(4 * dr);
      return problem({
        stem: `Consider the polar function r = ${a === 1 ? "" : a === -1 ? "−" : `${sg(a)} `}sin(2θ) on the interval ${piText(start)} ≤ θ ≤ ${piText(end)}.`,
        parts: [
          part(
            `Find the θ in this interval at which the point (r, θ) is farthest from the origin.`,
            ask.number("θ =", piText(tip)),
          ),
          part(
            `On ${piText(start)} < θ < ${piText(tip)}, is r increasing or decreasing?`,
            ask.choice("r is", TRENDS, firstR),
          ),
          part(
            `On ${piText(start)} < θ < ${piText(tip)}, is the distance from the origin increasing or decreasing?`,
            ask.choice("The distance is", TRENDS, "increasing"),
          ),
          part(
            `Find the average rate of change of r on ${piText(start)} ≤ θ ≤ ${piText(tip)}. Write an exact value.`,
            ask.number("Δr/Δθ =", overPi(rate)),
          ),
        ],
        solution: [
          `|sin(2θ)| = 1 when 2θ = ${piText(new Q(2 * i + 1, 2))}, so the point is farthest from the origin at θ = ${piText(tip)}, where |r| = ${Math.abs(a)}.`,
          `On ${piText(start)} < θ < ${piText(tip)}, r goes from 0 to ${sg(dr)}, so r is ${firstR}.`,
          `r is ${sign > 0 ? "positive" : "negative"} and ${firstR} there. ${sign > 0 ? "Positive and increasing" : "Negative and decreasing"} means the distance is increasing. (After the tip, r returns to 0 and the distance decreases.)`,
          `Δr = ${sg(dr)} − 0 = ${sg(dr)} and Δθ = ${piText(tip.sub(start))}, so Δr/Δθ = ${overPi(rate)}.`,
        ],
        data: { a, i, start, end, tip, dr, rate },
      });
    },
    verify({ data: { a, start, end, tip, dr, rate } }) {
      const f = (t) => a * Math.sin(2 * t);
      const first = ((start.value + tip.value) / 2) * PI;
      const second = ((tip.value + end.value) / 2) * PI;
      assert(distanceTrend(f, first) === "increasing", "first half");
      assert(distanceTrend(f, second) === "decreasing", "second half");
      assertNear(Math.abs(f(tip.value * PI)), Math.abs(a), "tip");
      assertNear(
        (f(tip.value * PI) - f(start.value * PI)) / ((tip.value - start.value) * PI),
        rate.value / PI,
        "rate",
      );
      assertNear(f(tip.value * PI), dr, "dr");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "increasing-and-decreasing-distance",
    skill: "solve",
    make(r) {
      const k = r.int(1, 5);
      const fn = r.pick(["sin", "cos"]);
      const runs = distanceRuns(k, fn);
      const decreasing = runs.filter((run) => run.trend === "decreasing");
      const increasing = runs.filter((run) => run.trend === "increasing");
      const zeros =
        fn === "cos" ? [new Q(2, 3), new Q(4, 3)] : [new Q(7, 6), new Q(11, 6)];
      return problem({
        stem: `Consider the polar function r = ${loopText(k, fn)} on the interval 0 < θ < 2π. It has an inner loop.`,
        parts: [
          part(
            "On which intervals is the distance between the point (r, θ) and the origin decreasing? Write the intervals with ∪.",
            ask.interval("θ ∈", unionText(decreasing)),
          ),
          part(
            "On which intervals is the distance increasing? Write the intervals with ∪.",
            ask.interval("θ ∈", unionText(increasing)),
          ),
          part(
            "Find the θ where the point is relatively closest to the origin. (There the point is at the origin.)",
            ask.set("θ =", zeros.map(piText)),
          ),
        ],
        solution: [
          `r = 0 at θ = ${zeros.map(piText).join(" and ")}, and r changes direction at ${fn === "cos" ? "θ = π" : "θ = π/2 and θ = 3π/2"}. These cut 0 < θ < 2π into pieces. ${runs
            .map(
              (run) =>
                `${piText(run.from)} < θ < ${piText(run.to)}: r is ${run.positive ? "positive" : "negative"} and ${run.rTrend}, so the distance is ${run.trend}.`,
            )
            .join(" ")}`,
          `Increasing: ${unionText(increasing)}.`,
          `The distance is 0 at the zeros of r, and there it changes from decreasing to increasing, so the point is relatively closest to the origin at θ = ${zeros.map(piText).join(" and ")}.`,
        ],
        data: { k, fn, runs, zeros },
      });
    },
    verify({ data: { k, fn, runs, zeros } }) {
      const f = (t) => loopFn(k, fn, t);
      for (const run of runs) {
        const mid = ((run.from.value + run.to.value) / 2) * PI;
        assert(distanceTrend(f, mid) === run.trend, "run trend");
      }
      for (const z of zeros) assertNear(f(z.value * PI), 0, "zero");
      for (let i = 0; i + 1 < runs.length; i++)
        assert(runs[i].trend !== runs[i + 1].trend, "runs alternate");
    },
  },
];

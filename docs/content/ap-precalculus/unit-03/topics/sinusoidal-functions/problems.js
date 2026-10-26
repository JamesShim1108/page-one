// Typed-answer problems for Topic 3.5. Period and frequency, amplitude and midline,
// concavity, and odd and even symmetry of sine and cosine. verify() rebuilds each
// sinusoid from the numbers in the stem and checks every answer against it.

import {
  ask,
  part,
  problem,
  graph,
  table,
  Q,
  piText,
  radians,
  exact,
  sinExact,
  cosExact,
  anglesWith,
  signIntervals,
  OFF_AXIS,
  SPECIAL,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const EPS = 1e-9;
const f = (fn, angle) => Math[fn](radians(angle));
const qv = (q) => q.n / q.d;
// A fraction gets parentheses when it is used in a product or quotient: (1/5), but 4 stays 4.
const qp = (q) => (q.isInteger ? q.toString() : `(${q.toString()})`);

const PERIOD_UNITS = ["second", "minute", "hour"];
// "1/4 second", "5 seconds": a time written with the right singular or plural.
const timeText = (q, unit) => `${q.toString()} ${qv(q) > 1 ? `${unit}s` : unit}`;

const CONTEXTS = [
  {
    fn: "h",
    text: "the height of the water at the end of a harbor pier, in feet",
    v: "t",
    inUnit: "hours after midnight",
    unit: "feet",
  },
  {
    fn: "T",
    text: "the temperature inside a greenhouse, in degrees Celsius",
    v: "t",
    inUnit: "hours after sunrise",
    unit: "degrees Celsius",
  },
  {
    fn: "V",
    text: "the voltage across part of a circuit, in volts",
    v: "t",
    inUnit: "milliseconds",
    unit: "volts",
  },
  {
    fn: "d",
    text: "the distance of a pendulum bob from the wall, in centimeters",
    v: "t",
    inUnit: "seconds",
    unit: "centimeters",
  },
];

// A sinusoid k + A·s(2πt/P) sampled at multiples of a quarter period, for s in cos, −cos, sin, −sin.
const SHAPES = {
  cos: { values: [1, 0, -1, 0], words: "it has its maximum value" },
  negcos: { values: [-1, 0, 1, 0], words: "it has its minimum value" },
  sin: {
    values: [0, 1, 0, -1],
    words: "it is on its midline and increasing",
  },
  negsin: {
    values: [0, -1, 0, 1],
    words: "it is on its midline and decreasing",
  },
};
const quarter = (shape, j) => SHAPES[shape].values[((j % 4) + 4) % 4];

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "sinusoidal-functions",
    skill: "solve",
    make(r) {
      const unit = r.pick(PERIOD_UNITS);
      const T = r.pick([
        new Q(1, 2),
        new Q(1, 4),
        new Q(1, 5),
        new Q(1, 10),
        new Q(2),
        new Q(4),
        new Q(5),
        new Q(8),
        new Q(10),
        new Q(20),
      ]);
      const rate = r.pick([
        new Q(2),
        new Q(3),
        new Q(4),
        new Q(5),
        new Q(10),
        new Q(1, 2),
        new Q(1, 4),
        new Q(1, 5),
      ]);
      const a = r.pick(SPECIAL.filter((q) => q.n !== 0));
      const b = a.add(new Q(1, 2));
      return problem({
        stem: "A sinusoidal function's frequency is the number of cycles per unit of input, and it is the reciprocal of the period.",
        parts: [
          part(
            `A sinusoidal function has a period of ${timeText(T, unit)}. Find its frequency, in cycles per ${unit}.`,
            ask.number("Frequency:", new Q(1).div(T), { unit: `cycles per ${unit}` }),
          ),
          part(
            `A sinusoidal function completes ${rate.toString()} cycles per ${unit}. Find its period, in ${unit}s.`,
            ask.number("Period:", new Q(1).div(rate), { unit: `${unit}s` }),
          ),
          part(
            `Since cos θ = sin(θ + π/2), the value cos(${piText(a)}) equals sin(b) for some angle b. Find b.`,
            ask.number("b =", piText(b)),
          ),
        ],
        solution: [
          `Frequency = 1/period = 1/${qp(T)}${T.isInteger ? "" : ` = ${new Q(1).div(T).toString()}`} cycles per ${unit}.`,
          `Period = 1/frequency = 1/${rate.toString()} = ${new Q(1).div(rate).toString()} ${unit}s.`,
          `cos(${piText(a)}) = sin(${piText(a)} + π/2) = sin(${piText(b)}), so b = ${piText(b)}.`,
        ],
        data: { unit, T, rate, a, b },
      });
    },
    verify({ data: { T, rate, a, b } }) {
      assertNear(qv(new Q(1).div(T)), 1 / qv(T), "frequency");
      assertNear(qv(new Q(1).div(rate)), 1 / qv(rate), "period");
      assertNear(Math.sin(radians(b)), Math.cos(radians(a)), "cos θ = sin(θ + π/2)");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "amplitude-and-midline",
    skill: "identify-information",
    make(r) {
      const P = r.pick([4, 6, 8, 10, 12]);
      const A = r.int(1, 8);
      const k = A + r.int(1, 10);
      const t0 = r.int(0, P / 2);
      const t1 = t0 + P / 2;
      const M = k + A;
      const m = k - A;
      const c = r.pick(CONTEXTS);
      return problem({
        stem: `The graph of a sinusoidal function ${c.fn} is shown, with a maximum point and a minimum point marked.`,
        blocks: [
          graph({
            caption: `The graph of y = ${c.fn}(${c.v}), with a maximum and a minimum marked`,
            alt: `A sinusoidal curve with a maximum at (${t0}, ${M}) and the next minimum at (${t1}, ${m}).`,
            window: { x: [-1, 1.5 * P + 1], y: [m - A * 0.6 - 0.5, M + A * 0.6 + 0.5] },
            ticks: { x: P >= 8 ? 2 : 1, y: Math.max(1, Math.round(A / 2)) },
            axisLabels: { x: c.v, y: `${c.fn}(${c.v})` },
            functions: [{ expr: `${k} + ${A}*cos(2*pi*(x - ${t0})/${P})` }],
            points: [
              { at: [t0, M], label: `(${t0}, ${M})`, position: "ne" },
              { at: [t1, m], label: `(${t1}, ${m})`, position: "se" },
            ],
          }),
        ],
        parts: [
          part(`Find the amplitude of ${c.fn}.`, ask.number("Amplitude:", A)),
          part(
            `The midline of the graph is the line y = k. Find k.`,
            ask.number("k =", k),
          ),
          part(
            `Find the period of ${c.fn}.`,
            ask.number("Period:", P, { unit: "units" }),
          ),
        ],
        solution: [
          `The maximum value is ${M} and the minimum value is ${m}. The amplitude is half the difference: (${M} − ${m})/2 = ${A}.`,
          `The midline is the average of the maximum and minimum values: (${M} + ${m})/2 = ${k}, so k = ${k}.`,
          `The maximum at ${c.v} = ${t0} and the next minimum at ${c.v} = ${t1} are half a cycle apart, so half the period is ${t1} − ${t0} = ${P / 2}. The period is ${P}.`,
        ],
        data: { P, A, k, t0, t1, M, m },
      });
    },
    verify({ data: { P, A, k, t0, t1, M, m } }) {
      const g = (t) => k + A * Math.cos((2 * Math.PI * (t - t0)) / P);
      assertNear(g(t0), M, "max");
      assertNear(g(t1), m, "min");
      assertNear((M - m) / 2, A, "amplitude");
      assertNear((M + m) / 2, k, "midline");
      assertNear(g(t0 + P), g(t0), "period");
      assert(t1 - t0 === P / 2, "half period");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "symmetry-and-concavity",
    skill: "equivalent-forms",
    make(r) {
      const [a1, a2] = r.sample(OFF_AXIS, 2);
      const odd = r.pick(["sin", "cos"]);
      const kind = { sin: "odd", cos: "even" };
      return problem({
        stem: "The sine function is odd, and the cosine function is even.",
        parts: [
          part(
            `Given that sin(${piText(a1)}) = ${sinExact(a1).text}, find sin(${piText(a1.neg())}).`,
            ask.number(`sin(${piText(a1.neg())}) =`, sinExact(a1.neg()).text),
          ),
          part(
            `Given that cos(${piText(a2)}) = ${cosExact(a2).text}, find cos(${piText(a2.neg())}).`,
            ask.number(`cos(${piText(a2.neg())}) =`, cosExact(a2.neg()).text),
          ),
          part(
            `Is f(θ) = ${odd} θ an even function, an odd function, or neither?`,
            ask.choice(`f is`, ["even", "odd", "neither"], kind[odd]),
          ),
        ],
        solution: [
          `Sine is odd, so sin(−θ) = −sin θ. Then sin(${piText(a1.neg())}) = −(${sinExact(a1).text}) = ${sinExact(a1.neg()).text}.`,
          `Cosine is even, so cos(−θ) = cos θ. Then cos(${piText(a2.neg())}) = cos(${piText(a2)}) = ${cosExact(a2.neg()).text}.`,
          odd === "sin"
            ? "The graph of y = sin θ has rotational symmetry about the origin, so sin(−θ) = −sin θ for every θ. The function is odd."
            : "The graph of y = cos θ has reflective symmetry over the y-axis, so cos(−θ) = cos θ for every θ. The function is even.",
        ],
        data: { a1, a2, odd },
      });
    },
    verify({ data: { a1, a2 } }) {
      assertNear(sinExact(a1.neg()).value, -sinExact(a1).value, "sine is odd");
      assertNear(cosExact(a2.neg()).value, cosExact(a2).value, "cosine is even");
      assertNear(sinExact(a1.neg()).value, Math.sin(radians(a1.neg())), "sin");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "symmetry-and-concavity",
    skill: "describe",
    make(r) {
      const fn1 = r.pick(["sin", "cos"]);
      const fn2 = fn1 === "sin" ? "cos" : "sin";
      const spans = [halfPeriodSpan(r, fn1), halfPeriodSpan(r, fn2)];
      if (spans[0].down === spans[1].down) reject("want one of each concavity");
      const fn3 = r.pick(["sin", "cos"]);
      const win = r.pick([
        [0, 2],
        [-1, 1],
        [0, 3],
        [-2, 0],
      ]);
      const inflections = anglesWith(fn3, 0, win[0], win[1]).filter(
        (q) => qv(q) > win[0] + EPS,
      );
      if (!inflections.length) reject("no inflection point");
      const lines = [fn1, fn2].map(
        (fn, i) => `${piText(spans[i].lo)} < θ < ${piText(spans[i].hi)}`,
      );
      return problem({
        stem: "The graphs of y = sin θ and y = cos θ are sinusoidal. A graph is concave down where it lies above its midline y = 0 and concave up where it lies below.",
        parts: [
          part(
            `Is the graph of y = ${fn1} θ concave up or concave down on ${lines[0]}?`,
            ask.choice(
              "The graph is",
              ["concave up", "concave down"],
              spans[0].down ? "concave down" : "concave up",
            ),
          ),
          part(
            `Is the graph of y = ${fn2} θ concave up or concave down on ${lines[1]}?`,
            ask.choice(
              "The graph is",
              ["concave up", "concave down"],
              spans[1].down ? "concave down" : "concave up",
            ),
          ),
          part(
            `Find every θ with ${piText(new Q(win[0]))} < θ < ${piText(new Q(win[1]))} at which the graph of y = ${fn3} θ changes concavity.`,
            ask.set("θ =", inflections.map(piText)),
          ),
        ],
        solution: [
          `On ${lines[0]}, ${fn1} θ is ${spans[0].down ? "positive" : "negative"}, so the graph is ${spans[0].down ? "above" : "below"} its midline and is concave ${spans[0].down ? "down" : "up"}.`,
          `On ${lines[1]}, ${fn2} θ is ${spans[1].down ? "positive" : "negative"}, so the graph is ${spans[1].down ? "above" : "below"} its midline and is concave ${spans[1].down ? "down" : "up"}.`,
          `The concavity changes where the graph crosses its midline, that is, where ${fn3} θ = 0. In this interval that happens at ${inflections.map(piText).join(", ")}.`,
        ],
        data: { fn1, fn2, fn3, spans, win, inflections },
      });
    },
    verify({ data: { fn1, fn2, fn3, spans, win, inflections } }) {
      [fn1, fn2].forEach((fn, i) => {
        const { lo, hi, down } = spans[i];
        for (let s = 1; s < 20; s++) {
          const t = radians(lo) + ((radians(hi) - radians(lo)) * s) / 20;
          assert(Math[fn](t) > 0 === down, "concavity matches the sign");
        }
      });
      inflections.forEach((q) => {
        assertNear(f(fn3, q), 0, "inflection point is on the midline");
        assert(qv(q) > win[0] && qv(q) < win[1], "inside the window");
      });
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "amplitude-and-midline",
    skill: "identify-information",
    make(r) {
      const c = r.pick(CONTEXTS);
      const shape = r.pick(Object.keys(SHAPES));
      const A = r.int(2, 9);
      const k = A + r.int(1, 12);
      const P = 4;
      const values = Array.from({ length: 9 }, (_, t) => k + A * quarter(shape, t));
      return problem({
        stem: `The function ${c.fn} models ${c.text}, where ${c.v} is measured in ${c.inUnit}. The function is sinusoidal, and some of its values are in the table.`,
        blocks: [
          table(
            `Values of ${c.fn}(${c.v})`,
            [c.v, ...Array.from({ length: 9 }, (_, t) => String(t))],
            [[`${c.fn}(${c.v})`, ...values.map(String)]],
          ),
        ],
        parts: [
          part(
            `Find the amplitude of ${c.fn}.`,
            ask.number("Amplitude:", A, { unit: c.unit }),
          ),
          part(
            `Find the midline value k, so that the midline is y = k.`,
            ask.number("k =", k, { unit: c.unit }),
          ),
          part(
            `Find the frequency of ${c.fn}, in cycles per ${c.inUnit.split(" ")[0].replace(/s$/, "")}.`,
            ask.number("Frequency:", new Q(1, P)),
          ),
        ],
        solution: [
          `The table shows a maximum of ${k + A} and a minimum of ${k - A}. The amplitude is (${k + A} − ${k - A})/2 = ${A}.`,
          `The midline value is the average of the maximum and minimum: (${k + A} + ${k - A})/2 = ${k}.`,
          `The values repeat every ${P} units: ${c.fn}(0) = ${c.fn}(${P}) = ${c.fn}(${2 * P}). So the period is ${P} and the frequency is 1/${P}.`,
        ],
        data: { shape, A, k, P, values },
      });
    },
    verify({ data: { A, k, P, values } }) {
      assert(Math.max(...values) === k + A && Math.min(...values) === k - A, "extremes");
      assert(values[0] === values[P] && values[P] === values[2 * P], "period");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "amplitude-and-midline",
    skill: "apply-results",
    make(r) {
      const c = r.pick(CONTEXTS);
      const A = r.int(2, 12);
      const k = A + r.int(2, 14);
      const M = k + A;
      const m = k - A;
      const A2 = r.int(2, 9);
      const k2 = A2 + r.int(1, 12);
      const wantMax = r.chance();
      return problem({
        stem: `A sinusoidal function ${c.fn} models ${c.text}, where ${c.v} is measured in ${c.inUnit}. Over time, ${c.fn} has a maximum value of ${M} and a minimum value of ${m}.`,
        parts: [
          part(
            `Find the amplitude of ${c.fn}.`,
            ask.number("Amplitude:", A, { unit: c.unit }),
          ),
          part(
            `Find the midline value k, so that the midline is y = k.`,
            ask.number("k =", k, { unit: c.unit }),
          ),
          part(
            `Another sinusoidal function g has an amplitude of ${A2} and a midline of y = ${k2}. Find the ${wantMax ? "maximum" : "minimum"} value of g.`,
            ask.number(wantMax ? "Maximum:" : "Minimum:", wantMax ? k2 + A2 : k2 - A2),
          ),
        ],
        solution: [
          `The amplitude is half the difference between the maximum and minimum: (${M} − ${m})/2 = ${A}.`,
          `The midline is the mean of the maximum and minimum: (${M} + ${m})/2 = ${k}.`,
          `The graph rises ${A2} above the midline and falls ${A2} below it. The ${wantMax ? "maximum" : "minimum"} is ${k2} ${wantMax ? "+" : "−"} ${A2} = ${wantMax ? k2 + A2 : k2 - A2}.`,
        ],
        data: { A, k, M, m, A2, k2, wantMax },
      });
    },
    verify({ data: { A, k, M, m, A2, k2, wantMax } }) {
      assert((M - m) / 2 === A && (M + m) / 2 === k, "amplitude and midline");
      assert(m > 0, "positive minimum");
      assert(wantMax ? k2 + A2 > k2 : k2 - A2 < k2, "extreme");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "sinusoidal-functions",
    skill: "apply-results",
    make(r) {
      const scene = r.pick([
        { thing: "a vibrating guitar string", unit: "second" },
        { thing: "a swinging pendulum", unit: "second" },
        { thing: "a spinning fan blade", unit: "minute" },
        { thing: "a rotating beacon", unit: "minute" },
        { thing: "a tide gauge", unit: "hour" },
      ]);
      const T = r.pick([
        new Q(1, 2),
        new Q(1, 4),
        new Q(1, 5),
        new Q(1, 10),
        new Q(2),
        new Q(4),
        new Q(5),
      ]);
      const rate = r.pick([
        new Q(1, 2),
        new Q(1, 4),
        new Q(1, 5),
        new Q(2),
        new Q(3),
        new Q(5),
      ]);
      const span = r.pick([2, 3, 4, 6, 8, 10, 12, 20]);
      const cycles = rate.mul(span);
      if (!cycles.isInteger) reject("whole number of cycles");
      const N = r.pick([3, 4, 5, 6, 10]);
      const total = T.mul(N);
      return problem({
        stem: `The position of ${scene.thing} is modeled by a sinusoidal function of time, measured in ${scene.unit}s.`,
        parts: [
          part(
            `The function has a period of ${timeText(T, scene.unit)}. Find its frequency, in cycles per ${scene.unit}.`,
            ask.number("Frequency:", new Q(1).div(T), {
              unit: `cycles per ${scene.unit}`,
            }),
          ),
          part(
            `A second function has a frequency of ${rate.toString()} ${qv(rate) > 1 ? "cycles" : "cycle"} per ${scene.unit}. How many complete cycles does it make in ${span} ${scene.unit}s?`,
            ask.number("Cycles:", cycles),
          ),
          part(
            `How long does the first function take to complete ${N} cycles?`,
            ask.number("Time:", total, { unit: `${scene.unit}s` }),
          ),
        ],
        solution: [
          `Frequency = 1/period = 1/${qp(T)}${T.isInteger ? "" : ` = ${new Q(1).div(T).toString()}`} cycles per ${scene.unit}.`,
          `Cycles = frequency × time = ${qp(rate)} × ${span} = ${cycles.toString()}.`,
          `Each cycle takes ${timeText(T, scene.unit)}, so ${N} cycles take ${N} × ${qp(T)} = ${timeText(total, scene.unit)}.`,
        ],
        data: { T, rate, span, cycles, N, total },
      });
    },
    verify({ data: { T, rate, span, cycles, N, total } }) {
      assertNear(qv(cycles), qv(rate) * span, "cycles");
      assertNear(qv(total), qv(T) * N, "time");
      assert(qv(total) > 0 && Number.isFinite(qv(total)), "time");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "symmetry-and-concavity",
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
      const kinds = r
        .shuffle(["symmetry", "concave", "amplitude", "frequency"])
        .slice(0, 3);
      const claims = kinds.map((kind, i) => claim(r, kind, mask[i]));
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
    concept: "amplitude-and-midline",
    skill: "solve",
    make(r) {
      const c = r.pick(CONTEXTS);
      const shape = r.pick(Object.keys(SHAPES));
      const P = r.pick([4, 8, 12, 16, 20, 24]);
      const A = r.int(2, 9);
      const k = A + r.int(1, 10);
      const [j1, j2, j3] = [
        r.pick([1, 2, 3]),
        r.pick([5, 6, 7]),
        r.pick([9, 10, 11, 13]),
      ];
      const at = (j) => (j * P) / 4;
      const value = (j) => k + A * quarter(shape, j);
      return problem({
        stem: `The function ${c.fn} models ${c.text}, where ${c.v} is measured in ${c.inUnit}. It is sinusoidal with a period of ${P}, an amplitude of ${A}, and a midline of y = ${k}. At ${c.v} = 0, ${SHAPES[shape].words}.`,
        parts: [j1, j2, j3].map((j) =>
          part(
            `Find ${c.fn}(${at(j)}).`,
            ask.number(`${c.fn}(${at(j)}) =`, value(j), { unit: c.unit }),
          ),
        ),
        solution: [j1, j2, j3].map(
          (j) =>
            `${at(j)} = ${j}(${P}/4), which is ${j} quarter-${j === 1 ? "period" : "periods"} after ${c.v} = 0. The pattern repeats every 4 quarter-periods, so this matches ${j % 4 === 0 ? "the start of a cycle" : `${j % 4} quarter-${j % 4 === 1 ? "period" : "periods"} into a cycle`}, where the graph is ${describePoint(shape, j)}. So ${c.fn}(${at(j)}) = ${value(j)}.`,
        ),
        data: { shape, P, A, k, js: [j1, j2, j3] },
      });
    },
    verify({ data: { shape, P, A, k, js } }) {
      const g = (t) => {
        const turn = (2 * Math.PI * t) / P;
        const base = {
          cos: Math.cos(turn),
          negcos: -Math.cos(turn),
          sin: Math.sin(turn),
          negsin: -Math.sin(turn),
        }[shape];
        return k + A * base;
      };
      js.forEach((j) => assertNear(g((j * P) / 4), k + A * quarter(shape, j), "value"));
      assert(new Set(js).size === 3, "distinct");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "symmetry-and-concavity",
    skill: "describe",
    make(r) {
      const specs = r.sample(
        [
          ["sin", "down"],
          ["sin", "up"],
          ["cos", "down"],
          ["cos", "up"],
        ],
        2,
      );
      const windows = r.sample(
        [
          [0, 2],
          [-1, 1],
          [0, 3],
          [-2, 0],
          [-1, 2],
        ],
        3,
      );
      const answers = specs.map(([fn, dir], i) =>
        signIntervals(fn, dir === "down" ? ">" : "<", ...windows[i], { open: true }),
      );
      const fn3 = r.pick(["sin", "cos"]);
      const inflections = anglesWith(fn3, 0, windows[2][0], windows[2][1]).filter(
        (q) => qv(q) > windows[2][0] + EPS,
      );
      if (answers.some((text) => text === "") || !inflections.length)
        reject("empty answer");
      const open = ([lo, hi]) => `${piText(new Q(lo))} < θ < ${piText(new Q(hi))}`;
      return problem({
        stem: "Use the fact that the graphs of y = sin θ and y = cos θ are concave down above the midline y = 0 and concave up below it. Write intervals with parentheses only.",
        parts: [
          part(
            `On ${open(windows[0])}, where is the graph of y = ${specs[0][0]} θ concave ${specs[0][1]}?`,
            ask.interval("θ in", answers[0]),
          ),
          part(
            `On ${open(windows[1])}, where is the graph of y = ${specs[1][0]} θ concave ${specs[1][1]}?`,
            ask.interval("θ in", answers[1]),
          ),
          part(
            `How many points of inflection does the graph of y = ${fn3} θ have for ${open(windows[2])}?`,
            ask.number("Points:", inflections.length),
          ),
        ],
        solution: [
          ...specs.map(
            ([fn, dir], i) =>
              `The graph of y = ${fn} θ is concave ${dir} where ${fn} θ is ${dir === "down" ? "positive" : "negative"}, because it is ${dir === "down" ? "above" : "below"} its midline. That happens for θ in ${answers[i]}.`,
          ),
          `Points of inflection are where the graph crosses its midline, so ${fn3} θ = 0. In ${open(windows[2])} that happens at ${inflections.map(piText).join(", ")}, which is ${inflections.length} ${inflections.length === 1 ? "point" : "points"}.`,
        ],
        data: { specs, windows, answers, fn3, inflections },
      });
    },
    verify({ data: { specs, windows, answers, fn3, inflections } }) {
      specs.forEach(([fn, dir], i) => {
        const [lo, hi] = windows[i];
        for (let s = 0; s < (hi - lo) * 2; s++) {
          const t = lo + s / 2 + 0.25;
          const holds =
            dir === "down" ? Math[fn](t * Math.PI) > 0 : Math[fn](t * Math.PI) < 0;
          assert(
            holds === insideIntervals(answers[i], t),
            `interval ${answers[i]} at ${t}`,
          );
        }
      });
      inflections.forEach((q) => assertNear(f(fn3, q), 0, "on the midline"));
    },
  },
];

// A random stretch strictly inside one half-period of sin or cos: concave down if the function is positive there.
function halfPeriodSpan(r, fn) {
  const k = r.int(-2, 3);
  const left = fn === "sin" ? new Q(k) : new Q(2 * k - 1, 2);
  const start = r.int(1, 9);
  const lo = left.add(new Q(start, 12));
  const hi = lo.add(new Q(r.int(1, 11 - start), 12));
  const mid = (qv(lo) + qv(hi)) / 2;
  return { lo, hi, down: Math[fn](mid * Math.PI) > 0 };
}

function describePoint(shape, j) {
  const v = quarter(shape, j);
  return v === 0 ? "on the midline" : v > 0 ? "at a maximum" : "at a minimum";
}

// Whether t (in units of π) lies in interval text such as "(π/2, 3π/2) ∪ (5π/2, 3π)".
function insideIntervals(text, t) {
  const toNumber = (s) => {
    const clean = s.trim().replace("−", "-");
    if (clean === "0") return 0;
    const match = clean.match(/^(-?)(\d*)π(?:\/(\d+))?$/);
    if (!match) throw new Error(`cannot read ${s}`);
    const sign = match[1] ? -1 : 1;
    const top = match[2] === "" ? 1 : Number(match[2]);
    return (sign * top) / (match[3] ? Number(match[3]) : 1);
  };
  return text.split("∪").some((piece) => {
    const m = piece.trim().match(/^([[(])(.+),(.+)([\])])$/);
    const lo = toNumber(m[2]);
    const hi = toNumber(m[3]);
    return (m[1] === "[" ? t >= lo : t > lo) && (m[4] === "]" ? t <= hi : t < hi);
  });
}

const negText = (text) => (text.startsWith("−") ? text.slice(1) : `−${text}`);

// One true or false statement about symmetry, concavity, amplitude, or frequency.
function claim(r, kind, truth) {
  if (kind === "symmetry") {
    const fn = r.pick(["sin", "cos"]);
    const a = r.pick(OFF_AXIS);
    const sameSign = fn === "cos";
    const form = truth ? sameSign : !sameSign;
    const lhs = `${fn}(${piText(a.neg())})`;
    const rhs = `${form ? "" : "−"}${fn}(${piText(a)})`;
    return {
      truth,
      statement: `${lhs} = ${rhs}`,
      reason: `${fn === "sin" ? "Sine is odd, so sin(−θ) = −sin θ" : "Cosine is even, so cos(−θ) = cos θ"}. Here ${lhs} = ${exact(fn, a.neg()).text}, while ${rhs} = ${form ? exact(fn, a).text : negText(exact(fn, a).text)}. ${truth ? "They are equal, so the statement is true." : "They are not equal, so the statement is false."}`,
      check: () => Math.abs(f(fn, a.neg()) - (form ? 1 : -1) * f(fn, a)) < EPS,
    };
  }
  if (kind === "concave") {
    const fn = r.pick(["sin", "cos"]);
    const span = halfPeriodSpan(r, fn);
    const said = truth ? span.down : !span.down;
    return {
      truth,
      statement: `The graph of y = ${fn} θ is concave ${said ? "down" : "up"} on ${piText(span.lo)} < θ < ${piText(span.hi)}.`,
      reason: `On this interval ${fn} θ is ${span.down ? "positive" : "negative"}, so the graph lies ${span.down ? "above" : "below"} its midline and is concave ${span.down ? "down" : "up"}. The statement is ${truth ? "true" : "false"}.`,
      check: () => said === span.down,
    };
  }
  if (kind === "amplitude") {
    const A = r.int(2, 9);
    const k = A + r.int(1, 10);
    const asksAmplitude = r.chance();
    const right = asksAmplitude ? A : k;
    const wrong = asksAmplitude ? 2 * A : A;
    const said = truth ? right : wrong;
    return {
      truth,
      statement: `A sinusoidal function has a maximum value of ${k + A} and a minimum value of ${k - A}. Its ${asksAmplitude ? "amplitude" : "midline is y"} ${asksAmplitude ? "is" : "="} ${said}.`,
      reason: asksAmplitude
        ? `The amplitude is half the difference: (${k + A} − ${k - A})/2 = ${A}. ${truth ? "The statement is true." : `It is not ${said}, so the statement is false.`}`
        : `The midline is the mean of the extremes: (${k + A} + ${k - A})/2 = ${k}. ${truth ? "The statement is true." : `It is not y = ${said}, so the statement is false.`}`,
      check: () => said === right,
    };
  }
  const T = r.pick([2, 4, 5, 8, 10]);
  const unit = r.pick(PERIOD_UNITS);
  const said = truth ? `1/${T}` : r.pick([`${T}`, `2/${T}`]);
  return {
    truth,
    statement: `A sinusoidal function with a period of ${T} ${unit}s has a frequency of ${said} cycles per ${unit}.`,
    reason: `Frequency is the reciprocal of the period, so the frequency is 1/${T} cycles per ${unit}. ${truth ? "The statement is true." : `${said} is not 1/${T}, so the statement is false.`}`,
    check: () => said === `1/${T}`,
  };
}

// Typed-answer problems for Topic 3.6. Sinusoids are written a·sin(b(θ + c)) + d. Every
// template builds the function from numbers it picked itself, so verify() can evaluate
// that function and check the amplitude, period, shift, and any exact value it asks for.

import {
  ask,
  part,
  problem,
  graph,
  Q,
  piText,
  radians,
  exact,
  scaled,
  plusText,
  piTicks,
  SPECIAL,
  OFF_AXIS,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const qv = (q) => q.n / q.d;
// A number written with a true minus sign.
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
// The same, in parentheses when negative: 5 − (−3).
// Parentheses around a fraction or a negative number in a product or quotient.
const paren = (text) => (/[/−]/.test(text) ? `(${text})` : text);
const units = (n) => `${n} ${n === 1 ? "unit" : "units"}`;
// "x = y", or just "x" when y would repeat it.
const eq = (expression, result) =>
  expression === result ? expression : `${expression} = ${result}`;
const pg = (n) => (n < 0 ? `(${sg(n)})` : String(n));
const PI = Math.PI;

// ---------- writing sinusoids ----------

const coefText = (a) =>
  a === 1 ? "" : a === -1 ? "−" : a < 0 ? `−${Math.abs(a)}` : String(a);
const dText = (d) => (d === 0 ? "" : d > 0 ? ` + ${sg(d)}` : ` − ${Math.abs(d)}`);
// θ + π/3 or θ − π/3 for a shift c (in units of π).
const shifted = (variable, c) =>
  c.n === 0
    ? variable
    : `${variable} ${c.n < 0 ? "−" : "+"} ${piText(c.n < 0 ? c.neg() : c)}`;
// 2θ, θ/2, 3θ/2, or θ for a coefficient b.
const bTheta = (b, variable = "θ") =>
  b.d === 1
    ? `${b.n === 1 ? "" : b.n}${variable}`
    : `${b.n === 1 ? "" : b.n}${variable}/${b.d}`;
// The front of a term: sin, −sin, 3 sin, −3 sin.
const lead = (a, fn) =>
  a === 1 ? fn : a === -1 ? `−${fn}` : `${a < 0 ? "−" : ""}${Math.abs(a)} ${fn}`;
// a sin(b(θ + c)) + d with b a whole number.
const factored = ({ fn, a, b, c, d }, variable = "θ") =>
  `${lead(a, fn)}(${
    b === 1
      ? shifted(variable, c)
      : c.n === 0
        ? `${b}${variable}`
        : `${b}(${shifted(variable, c)})`
  })${dText(d)}`;
// a sin(bθ) + d with b any fraction.
const stretched = ({ fn, a, b, d }, variable = "θ") =>
  `${lead(a, fn)}(${bTheta(b, variable)})${dText(d)}`;
// A function as a number: a·fn(b(θ + c·π)) + d.
const evaluate = ({ fn, a, b, c, d }, theta) =>
  a * Math[fn](qv(Q.of(b)) * (theta + qv(c) * PI)) + d;

const C_CHOICES = [
  new Q(1, 6),
  new Q(1, 4),
  new Q(1, 3),
  new Q(1, 2),
  new Q(2, 3),
  new Q(3, 4),
  new Q(5, 6),
];
const randomShift = (r) => {
  const c = r.pick(C_CHOICES);
  return r.chance() ? c.neg() : c;
};
const nonzero = (r, lo, hi) =>
  r.pick(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((n) => n !== 0));

const rightLeft = (shift) => (shift.n > 0 ? "right" : "left");
const absQ = (q) => (q.n < 0 ? q.neg() : q);

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "additive-transformations",
    skill: "identify-information",
    make(r) {
      const fn1 = r.pick(["sin", "cos"]);
      const fn2 = r.pick(["sin", "cos"]);
      const d = nonzero(r, -6, 6);
      const c = randomShift(r);
      const shift = c.neg();
      return problem({
        stem: "The sine and cosine functions are transformed by adding constants.",
        parts: [
          part(
            `The midline of the graph of f(θ) = ${fn1} θ${dText(d)} is the line y = k. Find k.`,
            ask.number("k =", d),
          ),
          part(
            `Find the maximum value of f(θ) = ${fn1} θ${dText(d)}.`,
            ask.number("Maximum:", d + 1),
          ),
          part(
            `The graph of g(θ) = ${fn2}(${shifted("θ", c)}) is the graph of y = ${fn2} θ shifted horizontally. Give the shift as a number of units, positive for a shift to the right and negative for a shift to the left.`,
            ask.number("Shift:", piText(shift)),
          ),
        ],
        solution: [
          `Adding ${sg(d)} to the output moves the graph ${d > 0 ? "up" : "down"} ${units(Math.abs(d))}, including its midline y = 0. The midline is y = ${sg(d)}.`,
          `The maximum of ${fn1} θ is 1, so the maximum of f is 1${dText(d)} = ${sg(d + 1)}.`,
          `${fn2}(${shifted("θ", c)}) has phase shift −c = ${piText(shift)}, where c = ${piText(c)}. The graph moves ${piText(absQ(shift))} units to the ${rightLeft(shift)}, so the shift is ${piText(shift)}.`,
        ],
        data: { fn1, fn2, d, c, shift },
      });
    },
    verify({ data: { fn1, fn2, d, c, shift } }) {
      const g = (t) => Math[fn2](t + qv(c) * PI);
      const base = (t) => Math[fn2](t);
      for (const t of [0.3, 1.1, 2.5, 4])
        assertNear(g(t), base(t - qv(shift) * PI), "shift");
      assert(Math.sign(qv(shift)) === -Math.sign(qv(c)), "sign");
      assertNear(
        Math.max(
          ...Array.from({ length: 400 }, (_, i) => Math[fn1]((i * 2 * PI) / 400) + d),
        ),
        d + 1,
        "maximum",
      );
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "multiplicative-transformations",
    skill: "identify-information",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const a = nonzero(r, -5, 5);
      const b = r.pick([
        new Q(2),
        new Q(3),
        new Q(4),
        new Q(1, 2),
        new Q(1, 3),
        new Q(3, 2),
      ]);
      const alpha = r.pick(SPECIAL);
      const theta0 = alpha.div(b);
      const fx = stretched({ fn, a, b, d: 0 });
      const value = scaled(fn, alpha, a);
      return problem({
        stem: `Consider the function f(θ) = ${fx}.`,
        parts: [
          part("Find the amplitude of f.", ask.number("Amplitude:", Math.abs(a))),
          part("Find the period of f.", ask.number("Period:", piText(new Q(2).div(b)))),
          part(
            `Find f(${piText(theta0)}).`,
            ask.number(`f(${piText(theta0)}) =`, value.text),
          ),
        ],
        solution: [
          `The amplitude is |a| = |${sg(a)}| = ${Math.abs(a)}.${a < 0 ? " A negative a only reflects the graph over its midline." : ""}`,
          `The period is 2π/|b| = ${eq(`2π/${paren(b.toString())}`, piText(new Q(2).div(b)))}.`,
          `At θ = ${piText(theta0)}, the input of ${fn} is ${paren(b.toString())}(${piText(theta0)}) = ${piText(alpha)}, and ${fn}(${piText(alpha)}) = ${exact(fn, alpha).text}. So f(${piText(theta0)}) = ${sg(a)}(${exact(fn, alpha).text}) = ${value.text}.`,
        ],
        data: { fn, a, b, alpha, theta0, value },
      });
    },
    verify({ data: { fn, a, b, alpha, theta0, value } }) {
      const f = (t) => a * Math[fn](qv(b) * t);
      assertNear(f(qv(theta0) * PI), value.value, "value");
      assertNear(f(0.7 + (2 * PI) / qv(b)), f(0.7), "period");
      assertNear(f(qv(theta0) * PI), a * Math[fn](qv(alpha) * PI), "angle");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "general-form",
    skill: "equivalent-forms",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const a = nonzero(r, -4, 4);
      const b = r.pick([2, 3, 4]);
      const c = randomShift(r);
      const e = c.mul(b);
      if (Math.abs(qv(e)) > 2) reject("keep the added constant under 2π");
      const d = r.int(-3, 5);
      const expanded = `${coefText(a)}${Math.abs(a) === 1 ? "" : " "}${fn}(${b}θ ${e.n < 0 ? "−" : "+"} ${piText(absQ(e))})${dText(d)}`;
      return problem({
        stem: `Consider f(θ) = ${expanded}. To read the phase shift, write the input of ${fn} as ${b}(θ + c).`,
        parts: [
          part(`Find c.`, ask.number("c =", piText(c))),
          part(
            "Find the phase shift of the graph. Give it as a number, positive for a shift to the right and negative for a shift to the left.",
            ask.number("Phase shift:", piText(c.neg())),
          ),
          part("Find the period of f.", ask.number("Period:", piText(new Q(2, b)))),
        ],
        solution: [
          `Factor out ${b}: ${b}θ ${e.n < 0 ? "−" : "+"} ${piText(absQ(e))} = ${b}(θ ${c.n < 0 ? "−" : "+"} ${piText(absQ(c))}), so c = ${piText(c)}.`,
          `The phase shift is −c = ${piText(c.neg())}, which is ${piText(absQ(c))} units to the ${rightLeft(c.neg())}. It is not the constant ${piText(e)} that was added to ${b}θ.`,
          `The period is ${eq(`2π/${b}`, piText(new Q(2, b)))}.`,
        ],
        data: { fn, a, b, c, e, d },
      });
    },
    verify({ data: { fn, a, b, c, e, d } }) {
      const original = (t) => a * Math[fn](b * t + qv(e) * PI) + d;
      const factoredForm = (t) => a * Math[fn](b * (t + qv(c) * PI)) + d;
      for (const t of [0.2, 1.3, 2.9, 5])
        assertNear(original(t), factoredForm(t), "factored form");
      assertNear(original(0.4 + (2 * PI) / b), original(0.4), "period");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "general-form",
    skill: "identify-information",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const spec = {
        fn,
        a: nonzero(r, -5, 5),
        b: r.pick([2, 3, 4]),
        c: randomShift(r),
        d: r.int(-4, 6),
      };
      const text = factored(spec);
      return problem({
        stem: `Consider f(θ) = ${text}.`,
        parts: [
          part("Find the amplitude of f.", ask.number("Amplitude:", Math.abs(spec.a))),
          part("Find the period of f.", ask.number("Period:", piText(new Q(2, spec.b)))),
          part(
            "Find the phase shift. Give it as a number, positive for a shift to the right and negative for a shift to the left.",
            ask.number("Phase shift:", piText(spec.c.neg())),
          ),
          part(
            "The midline of the graph is the line y = k. Find k.",
            ask.number("k =", spec.d),
          ),
        ],
        solution: [
          `f has the form a ${fn}(b(θ + c)) + d with a = ${sg(spec.a)}, b = ${spec.b}, c = ${piText(spec.c)}, and d = ${sg(spec.d)}. The amplitude is |a| = ${Math.abs(spec.a)}.`,
          `The period is 2π/|b| = ${eq(`2π/${spec.b}`, piText(new Q(2, spec.b)))}.`,
          `The phase shift is −c = ${piText(spec.c.neg())}, so the graph moves ${piText(absQ(spec.c))} units to the ${rightLeft(spec.c.neg())}.`,
          `The midline is y = d = ${sg(spec.d)}.`,
        ],
        data: { spec },
      });
    },
    verify({ data: { spec } }) {
      const f = (t) => evaluate(spec, t);
      const samples = Array.from({ length: 2000 }, (_, i) => f((i * 4 * PI) / 2000));
      assertNear(
        (Math.max(...samples) - Math.min(...samples)) / 2,
        Math.abs(spec.a),
        "amplitude",
        1e-3,
      );
      assertNear(
        (Math.max(...samples) + Math.min(...samples)) / 2,
        spec.d,
        "midline",
        1e-3,
      );
      assertNear(f(0.5 + (2 * PI) / spec.b), f(0.5), "period");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "multiplicative-transformations",
    skill: "construct-functions",
    make(r) {
      const shapes = r.sample(
        [
          { id: "cos", words: "has a maximum at θ = 0", fn: "cos", sign: 1 },
          { id: "negcos", words: "has a minimum at θ = 0", fn: "cos", sign: -1 },
          {
            id: "sin",
            words:
              "passes through the point (0, k), on its midline, and is increasing there",
            fn: "sin",
            sign: 1,
          },
          {
            id: "negsin",
            words:
              "passes through the point (0, k), on its midline, and is decreasing there",
            fn: "sin",
            sign: -1,
          },
        ],
        3,
      );
      const specs = shapes.map((shape) => {
        const amplitude = r.int(1, 6);
        const period = r.pick([
          new Q(1, 2),
          new Q(2, 3),
          new Q(1),
          new Q(2),
          new Q(4),
          new Q(6),
        ]);
        const d = r.int(-3, 6);
        return {
          shape,
          amplitude,
          period,
          d,
          b: new Q(2).div(period),
          key: stretched({
            fn: shape.fn,
            a: shape.sign * amplitude,
            b: new Q(2).div(period),
            d,
          }),
        };
      });
      return problem({
        stem: "Write a formula in terms of θ for each sinusoidal function. Use sine or cosine, whichever fits.",
        parts: specs.map((spec, i) =>
          part(
            `A function ${"fgh"[i]} has an amplitude of ${spec.amplitude}, a period of ${piText(spec.period)}, and a midline of y = ${sg(spec.d)}. Its graph ${spec.shape.words.replace("(0, k)", `(0, ${sg(spec.d)})`)}. Write a formula for ${"fgh"[i]}(θ).`,
            ask.expr(`${"fgh"[i]}(θ) =`, spec.key, { vars: ["θ"] }),
          ),
        ),
        solution: specs.map(
          (spec, i) =>
            `The factor b is 2π divided by the period: b = 2π/${paren(piText(spec.period))} = ${spec.b.toString()}. ${spec.shape.sign < 0 ? `The graph is reflected, so a = −${spec.amplitude}. ` : ""}${spec.shape.fn === "cos" ? "A function that starts at a maximum or minimum is a cosine." : "A function that starts on its midline is a sine."} So ${"fgh"[i]}(θ) = ${spec.key}.`,
        ),
        data: { specs },
      });
    },
    verify({ data: { specs } }) {
      for (const { shape, amplitude, period, d, b } of specs) {
        const f = (t) => shape.sign * amplitude * Math[shape.fn](qv(b) * t) + d;
        assertNear(f(qv(period) * PI + 0.37), f(0.37), "period");
        assertNear(qv(b) * qv(period) * PI, 2 * PI, "b");
        const start = f(0);
        if (shape.fn === "cos")
          assertNear(start, d + shape.sign * amplitude, "extreme at 0");
        else assertNear(start, d, "on the midline at 0");
      }
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "additive-transformations",
    skill: "construct-functions",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const shift = randomShift(r); // the graph moves this far (positive = right)
      const c = shift.neg();
      const d = nonzero(r, -5, 5);
      const spec = { fn, a: 1, b: 1, c, d };
      const peak = (fn === "sin" ? new Q(1, 2) : new Q(0)).add(shift);
      const reduced = new Q(
        ((peak.n % (2 * peak.d)) + 2 * peak.d) % (2 * peak.d),
        peak.d,
      );
      return problem({
        stem: `The graph of y = ${fn} θ is translated ${Math.abs(d)} ${Math.abs(d) === 1 ? "unit" : "units"} ${d > 0 ? "up" : "down"} and ${piText(absQ(shift))} units to the ${rightLeft(shift)}. The new graph is the graph of g.`,
        parts: [
          part(
            "Write a formula for g(θ).",
            ask.expr("g(θ) =", factored(spec), { vars: ["θ"] }),
          ),
          part("Find the maximum value of g.", ask.number("Maximum:", d + 1)),
          part(
            "Find the value of θ with 0 ≤ θ < 2π at which g reaches its maximum.",
            ask.number("θ =", piText(reduced)),
          ),
        ],
        solution: [
          `Translating ${d > 0 ? "up" : "down"} ${units(Math.abs(d))} ${d > 0 ? "adds" : "subtracts"} ${Math.abs(d)} ${d > 0 ? "to" : "from"} the output. Translating ${rightLeft(shift)} by ${piText(absQ(shift))} replaces θ with θ ${shift.n > 0 ? "−" : "+"} ${piText(absQ(shift))}. So g(θ) = ${factored(spec)}.`,
          `The maximum of ${fn} is 1, so the maximum of g is 1 ${d > 0 ? "+" : "−"} ${Math.abs(d)} = ${sg(d + 1)}.`,
          `${fn} reaches its maximum at ${fn === "sin" ? "π/2" : "0"}, so g reaches it ${piText(absQ(shift))} units ${rightLeft(shift)} of that: ${piText(peak)}${reduced.toString() === peak.toString() ? "" : `, which is the same as ${piText(reduced)} in the interval`}.`,
        ],
        data: { spec, shift, peak, reduced },
      });
    },
    verify({ data: { spec, peak, reduced } }) {
      const g = (t) => evaluate(spec, t);
      assertNear(g(qv(reduced) * PI), spec.d + 1, "maximum at the answer");
      assertNear(g(qv(peak) * PI), spec.d + 1, "maximum at the peak");
      assert(qv(reduced) >= 0 && qv(reduced) < 2, "in range");
      assert(g(qv(reduced) * PI + 0.3) <= spec.d + 1 + 1e-9, "not above the maximum");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "general-form",
    skill: "apply-results",
    make(r) {
      const scene = r.pick([
        {
          thing: "a Ferris wheel",
          start: (low) =>
            `A rider boards a Ferris wheel at its ${low ? "lowest" : "highest"} point at t = 0`,
          about: "the height of the rider above the ground",
          unit: "feet",
          time: "minutes",
        },
        {
          thing: "a mass hanging from a spring",
          start: (low) =>
            `A mass hanging from a spring is released from its ${low ? "lowest" : "highest"} position at t = 0`,
          about: "the height of the mass above the floor",
          unit: "centimeters",
          time: "seconds",
        },
        {
          thing: "an ocean tide",
          start: (low) => `The tide at a dock is ${low ? "low" : "high"} at t = 0`,
          about: "the depth of the water at a dock",
          unit: "feet",
          time: "hours",
        },
      ]);
      const low = r.chance();
      const R = r.pick([6, 8, 10, 12, 16, 20, 24, 30]);
      const D = R + r.pick([2, 4, 5, 10]);
      const T = r.pick([6, 12, 24]);
      const j = r.pick([2, 4, 8, 10]);
      const t = (j * T) / 12;
      const sign = low ? -1 : 1;
      const omega = new Q(2, T);
      const argument = `${omega.n === 1 ? "" : omega.n}πt${omega.d === 1 ? "" : `/${omega.d}`}`;
      const key = `${sg(D)} ${sign < 0 ? "−" : "+"} ${R} cos(${argument})`;
      const angle = new Q(j, 6);
      const height = plusText(D, scaled("cos", angle, sign * R));
      const peak = D + R;
      return problem({
        stem: `${scene.start(low)}. The function h models ${scene.about}, in ${scene.unit}, t ${scene.time} after that. It is sinusoidal with a period of ${T} ${scene.time}, a midline of y = ${sg(D)}, and an amplitude of ${R}.`,
        parts: [
          part(
            "Write a formula for h(t) using a cosine function.",
            ask.expr("h(t) =", key, { vars: ["t"] }),
          ),
          part(
            `Find the height when t = ${T / 2}.`,
            ask.number(`h(${T / 2}) =`, low ? D + R : D - R, { unit: scene.unit }),
          ),
          part(`Find h(${t}).`, ask.number(`h(${t}) =`, height, { unit: scene.unit })),
        ],
        solution: [
          `Because the model starts at a ${low ? "minimum" : "maximum"}, it is ${low ? "a negative" : "a positive"} cosine: h(t) = ${low ? "−" : ""}${R} cos(bt) + ${sg(D)}. The period is ${T}, so b = 2π/${T} = ${piText(new Q(2, T))}. So h(t) = ${key}.`,
          `Half a period later, t = ${T / 2}, the model is at the ${low ? "maximum" : "minimum"}: ${sg(D)} ${low ? "+" : "−"} ${R} = ${low ? D + R : D - R} ${scene.unit}.`,
          `At t = ${t}, the angle is ${paren(piText(new Q(2, T)))}(${t}) = ${piText(angle)}, and cos(${piText(angle)}) = ${exact("cos", angle).text}. So h(${t}) = ${sg(D)} ${low ? "−" : "+"} ${R}(${exact("cos", angle).text}) = ${height} ${scene.unit}.`,
        ],
        data: { low, R, D, T, t, j, key, angle, height, peak },
      });
    },
    verify({ data: { low, R, D, T, t, angle } }) {
      const h = (x) => D + (low ? -1 : 1) * R * Math.cos((2 * PI * x) / T);
      assertNear(h(0), low ? D - R : D + R, "start");
      assertNear(h(T / 2), low ? D + R : D - R, "half period");
      assertNear(h(t), D + (low ? -1 : 1) * R * Math.cos(qv(angle) * PI), "value");
      assert(D - R > 0, "stays positive");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "multiplicative-transformations",
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
      const kinds = r.shuffle(["amplitude", "period", "phase", "extreme"]).slice(0, 3);
      const claims = kinds.map((kind, i) => claim(r, kind, mask[i]));
      if (claims.some((c) => c.check() !== c.truth))
        reject("a false statement turned out true");
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
    concept: "general-form",
    skill: "construct-functions",
    make(r) {
      const b = r.pick([1, 2, 3]);
      const A = r.int(1, 5);
      const k = r.int(-3, 4);
      const half = new Q(1, b); // half a period, in units of π
      const maxPoint = new Q(r.int(1, 12 * qv(half)), 12);
      const minPoint = maxPoint.add(half);
      const M = k + A;
      const m = k - A;
      const equation = factored({ fn: "cos", a: A, b, c: maxPoint.neg(), d: k });
      return problem({
        stem: "The graph of a sinusoidal function f is shown, with a maximum point and the next minimum point marked.",
        blocks: [
          graph({
            caption: "The graph of y = f(θ), with a maximum and a minimum marked",
            alt: `A sinusoidal curve with a maximum at (${piText(maxPoint)}, ${sg(M)}) and the next minimum at (${piText(minPoint)}, ${sg(m)}).`,
            window: { x: [-0.4 * PI, 2.4 * PI], y: [m - 1.2, M + 1.2] },
            ticks: { x: piTicks(-0.25, 2.25, 2), y: Math.max(1, Math.round(A / 2)) },
            axisLabels: { x: "θ", y: "f(θ)" },
            functions: [{ expr: `${A}*cos(${b}*(x - ${qv(maxPoint) * PI})) + ${sg(k)}` }],
            points: [
              {
                at: [qv(maxPoint) * PI, M],
                label: `(${piText(maxPoint)}, ${sg(M)})`,
                position: "ne",
              },
              {
                at: [qv(minPoint) * PI, m],
                label: `(${piText(minPoint)}, ${sg(m)})`,
                position: "se",
              },
            ],
          }),
        ],
        parts: [
          part("Find the amplitude of f.", ask.number("Amplitude:", A)),
          part("Find the period of f.", ask.number("Period:", piText(half.mul(2)))),
          part(
            "Write a formula for f(θ) of the form a cos(b(θ − h)) + k, using the maximum point as the starting point of a cycle.",
            ask.expr("f(θ) =", equation, { vars: ["θ"] }),
          ),
        ],
        solution: [
          `The maximum is ${sg(M)} and the minimum is ${sg(m)}, so the amplitude is (${sg(M)} − ${pg(m)})/2 = ${A}.`,
          `The maximum at θ = ${piText(maxPoint)} and the next minimum at θ = ${piText(minPoint)} are half a period apart: ${piText(minPoint)} − ${piText(maxPoint)} = ${piText(half)}. The period is ${piText(half.mul(2))}, so b = 2π/${paren(piText(half.mul(2)))} = ${b}.`,
          `The midline is k = (${sg(M)} + ${pg(m)})/2 = ${sg(k)}. The cosine starts a cycle at its maximum, so h = ${piText(maxPoint)}. So f(θ) = ${equation}.`,
        ],
        data: { b, A, k, maxPoint, minPoint, M, m, half },
      });
    },
    verify({ data: { b, A, k, maxPoint, minPoint, M, m, half } }) {
      const f = (t) => A * Math.cos(b * (t - qv(maxPoint) * PI)) + k;
      assertNear(f(qv(maxPoint) * PI), M, "max");
      assertNear(f(qv(minPoint) * PI), m, "min");
      assertNear(qv(half.mul(2)) * PI, (2 * PI) / b, "period");
      assert(qv(minPoint) <= 2.3 && qv(maxPoint) > 0, "points are on the graph window");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "general-form",
    skill: "solve",
    make(r) {
      const a = nonzero(r, -4, 4);
      const b = r.pick([2, 3, 4]);
      const c = randomShift(r);
      const d = r.int(-3, 5);
      const alpha = r.pick(OFF_AXIS);
      const theta0 = alpha.div(b).sub(c);
      const spec = { fn: "sin", a, b, c, d };
      const value = plusText(d, scaled("sin", alpha, a));
      const valueNumber = d + scaled("sin", alpha, a).value;
      // The first positive θ at which sin(b(θ + c)) = ±1 gives f its maximum.
      const target = a > 0 ? new Q(1, 2) : new Q(3, 2);
      let first = null;
      for (let n = -20; n <= 20; n++) {
        const t = target
          .add(2 * n)
          .div(b)
          .sub(c);
        if (qv(t) > 1e-9 && (first === null || qv(t) < qv(first))) first = t;
      }
      const low = d - Math.abs(a);
      const high = d + Math.abs(a);
      return problem({
        stem: `Consider f(θ) = ${factored(spec)}.`,
        parts: [
          part(`Find f(${piText(theta0)}).`, ask.number(`f(${piText(theta0)}) =`, value)),
          part(
            "Find the smallest positive value of θ at which f reaches its maximum value.",
            ask.number("θ =", piText(first)),
          ),
          part(
            "Write the range of f in interval notation.",
            ask.interval("Range:", `[${sg(low)}, ${sg(high)}]`),
          ),
        ],
        solution: [
          `At θ = ${piText(theta0)}, the input of sine is ${b}(${piText(theta0)} ${c.n < 0 ? "−" : "+"} ${piText(absQ(c))}) = ${piText(alpha)}, and sin(${piText(alpha)}) = ${exact("sin", alpha).text}. So f(${piText(theta0)}) = ${sg(a)}(${exact("sin", alpha).text})${dText(d)} = ${value}.`,
          `${a > 0 ? "f reaches its maximum when sin(b(θ + c)) = 1" : "Because a is negative, f reaches its maximum when sin(b(θ + c)) = −1"}, that is, when ${b}(θ ${c.n < 0 ? "−" : "+"} ${piText(absQ(c))}) = ${piText(target)} + 2πn. Solving gives θ = ${piText(target.div(b).sub(c))} + ${paren(piText(new Q(2, b)))}n, and the smallest positive value is ${piText(first)}.`,
          `The amplitude is ${Math.abs(a)} and the midline is y = ${sg(d)}, so the outputs run from ${sg(d)} − ${Math.abs(a)} = ${sg(low)} to ${sg(d)} + ${Math.abs(a)} = ${sg(high)}.`,
        ],
        data: { spec, alpha, theta0, valueNumber, first, low, high },
      });
    },
    verify({ data: { spec, theta0, valueNumber, first, low, high } }) {
      const f = (t) => evaluate(spec, t);
      const samples = Array.from({ length: 4000 }, (_, i) => f((i * 6 * PI) / 4000));
      assertNear(Math.max(...samples), high, "max", 1e-3);
      assertNear(Math.min(...samples), low, "min", 1e-3);
      assertNear(f(qv(first) * PI), high, "maximum at the answer");
      assert(qv(first) > 0, "positive");
      // Nothing earlier reaches the maximum.
      for (let t = 0.002; t < qv(first) * PI - 1e-3; t += 0.0005)
        assert(f(t) < high - 1e-9, "earlier maximum");
      assertNear(f(qv(theta0) * PI), valueNumber, "f(θ0)");
    },
  },
];

// One true or false statement about a transformed sine or cosine.
function claim(r, kind, truth) {
  const fn = r.pick(["sin", "cos"]);
  if (kind === "amplitude") {
    const a = nonzero(r, -5, -1);
    const d = r.int(-3, 4);
    const said = truth ? Math.abs(a) : a;
    const text = `−${Math.abs(a)} ${fn} θ${dText(d)}`;
    return {
      truth,
      statement: `The amplitude of f(θ) = ${text} is ${said < 0 ? `−${Math.abs(said)}` : said}.`,
      reason: `The amplitude is |a| = |${sg(a)}| = ${Math.abs(a)}, never negative; a negative a reflects the graph over its midline. ${truth ? "The statement is true." : `The amplitude is not ${said < 0 ? `−${Math.abs(said)}` : said}, so the statement is false.`}`,
      check: () => said === Math.abs(a),
    };
  }
  if (kind === "period") {
    const a = r.int(2, 5);
    const b = r.pick([2, 3, 4, 6]);
    const right = new Q(2, b);
    const wrong = r.pick([new Q(2 * b), new Q(2)]);
    const said = truth ? right : wrong;
    return {
      truth,
      statement: `The period of f(θ) = ${sg(a)} ${fn}(${b}θ) is ${piText(said)}.`,
      reason: `The period is 2π/|b| = 2π/${b} = ${piText(right)}. ${truth ? "The statement is true." : `It is not ${piText(said)}, so the statement is false.`}`,
      check: () => {
        const t = qv(said) * PI;
        return (
          Math.abs(a * Math[fn](b * (0.4 + t)) - a * Math[fn](b * 0.4)) < 1e-9 &&
          qv(said) === qv(right)
        );
      },
    };
  }
  if (kind === "phase") {
    const b = r.pick([2, 3, 4]);
    const c = randomShift(r);
    const e = c.mul(b);
    if (Math.abs(qv(e)) > 2) reject("keep the added constant under 2π");
    const trueSide = c.neg().n > 0 ? "right" : "left";
    const otherSide = trueSide === "right" ? "left" : "right";
    const wrong = r.pick([
      { amount: absQ(e), side: trueSide },
      { amount: absQ(c), side: otherSide },
    ]);
    const said = truth ? { amount: absQ(c), side: trueSide } : wrong;
    return {
      truth,
      statement: `The graph of g(θ) = ${fn}(${b}θ ${e.n < 0 ? "−" : "+"} ${piText(absQ(e))}) is the graph of y = ${fn}(${b}θ) shifted ${piText(said.amount)} units to the ${said.side}.`,
      reason: `Factor: ${b}θ ${e.n < 0 ? "−" : "+"} ${piText(absQ(e))} = ${b}(θ ${c.n < 0 ? "−" : "+"} ${piText(absQ(c))}). The phase shift is ${piText(absQ(c))} units to the ${trueSide}. ${truth ? "The statement is true." : `The graph does not shift ${piText(said.amount)} units to the ${said.side}, so the statement is false.`}`,
      check: () => {
        const shiftNumber = (said.side === "right" ? 1 : -1) * qv(said.amount) * PI;
        return [0.3, 1.2, 2.6].every(
          (t) =>
            Math.abs(Math[fn](b * t + qv(e) * PI) - Math[fn](b * (t - shiftNumber))) <
            1e-9,
        );
      },
    };
  }
  const a = nonzero(r, -5, 5);
  const d = r.int(-4, 5);
  const which = r.pick(["maximum", "minimum"]);
  const right = which === "maximum" ? d + Math.abs(a) : d - Math.abs(a);
  const wrong = which === "maximum" ? d + a : d - a;
  const said = truth ? right : wrong === right ? right + 1 : wrong;
  const text = `${a < 0 ? "−" : ""}${Math.abs(a)} ${fn} θ${dText(d)}`;
  return {
    truth,
    statement: `The ${which} value of f(θ) = ${text} is ${said < 0 ? `−${Math.abs(said)}` : said}.`,
    reason: `The amplitude is ${Math.abs(a)} and the midline is y = ${sg(d)}, so the ${which} is ${sg(d)} ${which === "maximum" ? "+" : "−"} ${Math.abs(a)} = ${right < 0 ? `−${Math.abs(right)}` : right}. ${truth ? "The statement is true." : `It is not ${said < 0 ? `−${Math.abs(said)}` : said}, so the statement is false.`}`,
    check: () => said === right,
  };
}

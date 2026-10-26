// Typed-answer problems for Topic 3.8. Tangent is the slope of the terminal ray, so the
// templates move between a ray, its slope, the graph of y = tan θ, and its transformations
// a·tan(b(θ − h)) + d. verify() recomputes every value with Math.tan.

import {
  ask,
  part,
  problem,
  graph,
  Q,
  piText,
  radians,
  tanExact,
  scaled,
  plusText,
  piTicks,
  OFF_AXIS,
  referenceAngle,
  quadrantName,
  anglesWith,
  signIntervals,
  assert,
  assertNear,
} from "../../../../practice-kit/index.js";

const PI = Math.PI;
const qv = (q) => q.n / q.d;
const pg = (n) => (n < 0 ? `(${sg(n)})` : String(n));
// "x = y", or just "x" when y would repeat it.
const eq = (expression, result) =>
  expression === result ? expression : `${expression} = ${result}`;
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
];

// a·tan(b(θ − h)) + d as text. b is a Q, h a Q in units of π.
function tanText({ a, b, h = new Q(0), d = 0 }) {
  const shift =
    qv(h) === 0 ? "θ" : qv(h) > 0 ? `θ − ${piText(h)}` : `θ + ${piText(h.neg())}`;
  const bare = qv(h) === 0;
  let arg;
  if (b.n === 1 && b.d === 1) arg = shift;
  else if (b.d === 1) arg = bare ? `${b.n}θ` : `${b.n}(${shift})`;
  else if (b.n === 1) arg = bare ? `θ/${b.d}` : `(${shift})/${b.d}`;
  else arg = bare ? `${b.n}θ/${b.d}` : `${b.n}(${shift})/${b.d}`;
  const lead = a === 1 ? "" : a === -1 ? "−" : `${sg(a)} `;
  const tail = d === 0 ? "" : d > 0 ? ` + ${d}` : ` − ${Math.abs(d)}`;
  return `${lead}tan(${arg})${tail}`;
}
const tanOf =
  ({ a, b, h = new Q(0), d = 0 }) =>
  (theta) =>
    a * Math.tan(qv(b) * (theta - qv(h) * PI)) + d;
// A multiple of π/2 given in units of π: 0.5 becomes π/2.
const halfPi = (u) => piText(new Q(Math.round(u * 2), 2));

// The number of times the graph of y = tan θ meets y = level for lo·π ≤ θ ≤ hi·π, counted
// along the curve so asymptotes are never mistaken for crossings.
function crossings(level, lo, hi) {
  let count = 0;
  const steps = 40000;
  let prev = null;
  for (let i = 0; i <= steps; i++) {
    const x = (lo + ((hi - lo) * i) / steps) * PI;
    const y = Math.tan(x) - level;
    if (Math.abs(y) < 1e-12) {
      count++;
      prev = null;
      continue;
    }
    if (
      prev !== null &&
      Math.sign(prev) !== Math.sign(y) &&
      Math.abs(prev) < 50 &&
      Math.abs(y) < 50
    )
      count++;
    prev = y;
  }
  return count;
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "tangent-function",
    skill: "identify-information",
    make(r) {
      const [a, b, h] = r.pick(TRIPLES);
      const [top, bottom] = r.chance() ? [a, b] : [b, a];
      const s = new Q(r.sign() * top, h);
      const c = new Q(r.sign() * bottom, h);
      const t = s.div(c);
      const quadrant = qv(c) > 0 ? (qv(s) > 0 ? "I" : "IV") : qv(s) > 0 ? "II" : "III";
      return problem({
        stem: `An angle θ in standard position has sin θ = ${s.toString()} and cos θ = ${c.toString()}.`,
        parts: [
          part("Find tan θ.", ask.number("tan θ =", t)),
          part("Find the slope of the terminal ray of θ + π.", ask.number("Slope:", t)),
          part(
            "In which quadrant does the terminal ray of θ lie?",
            ask.choice("Quadrant:", ["I", "II", "III", "IV"], quadrant),
          ),
        ],
        solution: [
          `tan θ = sin θ / cos θ = (${s.toString()})/(${c.toString()}) = ${t.toString()}. This is the slope of the terminal ray.`,
          `Adding π turns the ray half a revolution, onto the same line through the origin, so it has the same slope: ${t.toString()}.`,
          `sin θ is ${qv(s) > 0 ? "positive" : "negative"} and cos θ is ${qv(c) > 0 ? "positive" : "negative"}, so the terminal ray is in quadrant ${quadrant}.`,
        ],
        data: { s, c, t, quadrant },
      });
    },
    verify({ data: { s, c, t, quadrant } }) {
      assertNear(qv(s) ** 2 + qv(c) ** 2, 1, "unit circle");
      const angle = Math.atan2(qv(s), qv(c));
      assertNear(Math.tan(angle), qv(t), "tan");
      assertNear(Math.tan(angle + PI), qv(t), "tan(θ + π)");
      const q =
        angle >= 0 ? (angle < PI / 2 ? "I" : "II") : angle > -PI / 2 ? "IV" : "III";
      assert(q === quadrant, "quadrant");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "tangent-function",
    skill: "construct-representations",
    make(r) {
      const base = r.pick(OFF_AXIS);
      const first = base.add(2 * r.pick([-1, 0, 1]));
      const second = base.add(r.pick([-1, 1, 3]));
      const axis = r.pick([
        new Q(1, 2),
        new Q(3, 2),
        new Q(1),
        new Q(0),
        new Q(2),
        new Q(-1, 2),
      ]);
      const t = tanExact(first);
      const t2 = tanExact(second);
      const onAxis = tanExact(axis);
      const ref = referenceAngle(first);
      const sign = ["I", "III"].includes(quadrantName(first)) ? "positive" : "negative";
      return problem({
        stem: "Find each value of the tangent function. Write exact values, with radicals where needed, and DNE where the value does not exist.",
        parts: [
          part(
            `Find tan(${piText(first)}).`,
            ask.number(`tan(${piText(first)}) =`, t.text),
          ),
          part(
            `Find tan(${piText(second)}).`,
            ask.number(`tan(${piText(second)}) =`, t2.text),
          ),
          part(
            `Find tan(${piText(axis)}).`,
            ask.limit(`tan(${piText(axis)}) =`, onAxis.defined ? onAxis.text : "DNE"),
          ),
        ],
        solution: [
          `The terminal ray of ${piText(first)} is in quadrant ${quadrantName(first)} with reference angle ${piText(ref)}. There tan is ${sign}, and tan(${piText(ref)}) = ${tanExact(ref).text}, so tan(${piText(first)}) = ${t.text}.`,
          `${piText(second)} and ${piText(base)} differ by a whole number of π, and tangent has period π, so tan(${piText(second)}) = tan(${piText(base)}) = ${t2.text}.`,
          onAxis.defined
            ? `The terminal ray of ${piText(axis)} lies on the x-axis, which is horizontal, so its slope is 0.`
            : `The terminal ray of ${piText(axis)} lies on the y-axis, which is vertical, so its slope is undefined and tan(${piText(axis)}) does not exist.`,
        ],
        data: { first, second, base, axis, t, t2, onAxis },
      });
    },
    verify({ data: { first, second, base, axis, t, t2, onAxis } }) {
      assertNear(t.value, Math.tan(radians(first)), "first");
      assertNear(t2.value, Math.tan(radians(second)), "second");
      assertNear(t2.value, Math.tan(radians(base)), "periodic");
      if (onAxis.defined) assertNear(Math.tan(radians(axis)), 0, "zero");
      else assert(Math.abs(Math.cos(radians(axis))) < 1e-9, "asymptote");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "tangent-characteristics",
    skill: "describe",
    make(r) {
      const lo = r.pick([-2, -1.5, -1, -0.5, 0, 0.5, 1]);
      const hi = lo + r.pick([2, 2.5, 3, 3.5, 4]);
      let asymptotes = 0;
      let zeros = 0;
      for (let k = -6; k <= 8; k++) {
        if (k + 0.5 > lo + 1e-9 && k + 0.5 < hi - 1e-9) asymptotes++;
        if (k >= lo - 1e-9 && k <= hi + 1e-9) zeros++;
      }
      const k = r.pick([-2, -1, 0, 1, 2]);
      const up = r.chance();
      const left = up ? k : k - 0.5;
      const right = up ? k + 0.5 : k;
      return problem({
        stem: "Use what you know about the graph of y = tan θ.",
        parts: [
          part(
            `How many vertical asymptotes does the graph have for ${halfPi(lo)} < θ < ${halfPi(hi)}?`,
            ask.number("Asymptotes:", asymptotes),
          ),
          part(
            `How many zeros does tan θ have for ${halfPi(lo)} ≤ θ ≤ ${halfPi(hi)}?`,
            ask.number("Zeros:", zeros),
          ),
          part(
            `Is the graph of y = tan θ concave up or concave down on the interval (${halfPi(left)}, ${halfPi(right)})?`,
            ask.choice(
              "Concavity:",
              ["concave up", "concave down"],
              up ? "concave up" : "concave down",
            ),
          ),
        ],
        solution: [
          `The asymptotes are at θ = π/2 + kπ, where cos θ = 0. Those in this interval are ${asymptoteList(lo, hi, 0.5)}, so there ${asymptotes === 1 ? "is 1 asymptote" : `are ${asymptotes} asymptotes`}.`,
          `The zeros are at θ = kπ, where sin θ = 0. Those in this interval are ${asymptoteList(lo, hi, 0, true)}, so there ${zeros === 1 ? "is 1 zero" : `are ${zeros} zeros`}.`,
          up
            ? `On (${halfPi(left)}, ${halfPi(right)}) the graph lies above the θ-axis, between a zero and the next asymptote. There it is concave up.`
            : `On (${halfPi(left)}, ${halfPi(right)}) the graph lies below the θ-axis, between an asymptote and the next zero. There it is concave down.`,
        ],
        data: { lo, hi, asymptotes, zeros, left, right, up },
      });
    },
    verify({ data: { lo, hi, asymptotes, zeros, left, right, up } }) {
      let a = 0;
      let z = 0;
      for (let i = -12; i <= 12; i++) {
        const asym = (i + 0.5) * PI;
        const zero = i * PI;
        if (asym > lo * PI + 1e-9 && asym < hi * PI - 1e-9) a++;
        if (zero >= lo * PI - 1e-9 && zero <= hi * PI + 1e-9) z++;
      }
      assert(a === asymptotes && z === zeros, "counts");
      const mid = ((left + right) / 2) * PI;
      const second = Math.tan(mid + 1e-3) + Math.tan(mid - 1e-3) - 2 * Math.tan(mid);
      assert(up ? second > 0 : second < 0, "concavity");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "tangent-transformations",
    skill: "describe",
    make(r) {
      const b = r.pick([
        new Q(1, 2),
        new Q(1, 4),
        new Q(2),
        new Q(3),
        new Q(4),
        new Q(6),
      ]);
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const d = r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
      const period = new Q(b.d, b.n);
      const text = tanText({ a, b, d });
      return problem({
        stem: `Let f(θ) = ${text}.`,
        parts: [
          part("Find the period of f.", ask.number("Period:", piText(period))),
          part(
            "The points of inflection of the graph of f lie on a horizontal line y = k. Find k.",
            ask.number("k =", d),
          ),
          part(
            "Between consecutive vertical asymptotes, does the graph of f fall from left to right?",
            ask.choice("Falls between asymptotes:", ["yes", "no"], a < 0 ? "yes" : "no"),
          ),
        ],
        solution: [
          `For f(θ) = a tan(bθ) + d, the period is π/|b|. Here b = ${b.toString()}, so the period is ${piText(period)}.`,
          `The points of inflection of y = tan θ are on y = 0. Adding d = ${sg(d)} moves them to the line y = ${sg(d)}.`,
          a < 0
            ? `Since a = ${sg(a)} is negative, the graph is reflected over the x-axis, so it falls from left to right between asymptotes.`
            : `Since a = ${sg(a)} is positive, the graph is not reflected, so it rises from left to right between asymptotes.`,
        ],
        data: { a, b, d, period },
      });
    },
    verify({ data: { a, b, d, period } }) {
      const f = tanOf({ a, b, d });
      assertNear(f(0.3 + qv(period) * PI), f(0.3), "period");
      assertNear(f(0), d, "inflection");
      assert(f(0.2) < f(0.1) === a < 0, "direction");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "tangent-function",
    skill: "construct-representations",
    make(r) {
      const [a, b, h] = r.pick(TRIPLES);
      const k = r.pick([1, 2, 3].filter((n) => h * n <= 30));
      const [xm, ym] = r.chance() ? [a, b] : [b, a];
      const sx = r.sign();
      const sy = r.sign();
      const x = sx * xm * k;
      const y = sy * ym * k;
      const rad = h * k;
      const ux = new Q(sx * xm, h);
      const uy = new Q(sy * ym, h);
      const t = new Q(y, x);
      return problem({
        stem: `The terminal ray of an angle θ in standard position passes through the point P(${sg(x)}, ${sg(y)}).`,
        blocks: [
          graph({
            caption: `The terminal ray of θ through P(${sg(x)}, ${sg(y)})`,
            alt: `A ray from the origin through the point (${sg(x)}, ${sg(y)}).`,
            window: { x: [-rad - 1, rad + 1], y: [-rad - 1, rad + 1] },
            ticks: {
              x: rad <= 10 ? 1 : rad <= 20 ? 2 : 5,
              y: rad <= 10 ? 1 : rad <= 20 ? 2 : 5,
            },
            axisLabels: { x: "x", y: "y" },
            segments: [{ from: [0, 0], to: [x, y] }],
            points: [
              {
                at: [x, y],
                label: `P(${sg(x)}, ${sg(y)})`,
                position: x > 0 ? "ne" : "nw",
              },
            ],
          }),
        ],
        parts: [
          part("Find the distance from the origin to P.", ask.number("r =", rad)),
          part("Find tan θ.", ask.number("tan θ =", t)),
          part(
            "At what point does the terminal ray meet the unit circle? Write the point as (x, y).",
            ask.points("Point:", [[ux, uy]]),
          ),
        ],
        solution: [
          `r = √(${pg(x)}² + ${pg(y)}²) = √${x * x + y * y} = ${rad}.`,
          `tan θ is the slope of the terminal ray, the change in y over the change in x from the origin to P: ${eq(`${sg(y)}/${pg(x)}`, t.toString())}.`,
          `Dividing both coordinates of P by r = ${rad} puts the point on the unit circle: ${eq(`(${sg(x)}/${rad}, ${sg(y)}/${rad})`, `(${ux.toString()}, ${uy.toString()})`)}.`,
        ],
        data: { x, y, rad, t, ux, uy },
      });
    },
    verify({ data: { x, y, rad, t, ux, uy } }) {
      assertNear(Math.hypot(x, y), rad, "r");
      assertNear(Math.tan(Math.atan2(y, x)), qv(t), "tan");
      assertNear(qv(ux) ** 2 + qv(uy) ** 2, 1, "unit circle");
      assertNear(qv(ux) * rad, x, "x");
      assertNear(qv(uy) * rad, y, "y");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "tangent-characteristics",
    skill: "identify-information",
    make(r) {
      const base = r.pick([
        new Q(1, 6),
        new Q(1, 4),
        new Q(1, 3),
        new Q(-1, 6),
        new Q(-1, 4),
        new Q(-1, 3),
      ]);
      const at = base.add(r.pick([-1, 0, 1]));
      const y = tanExact(at);
      const level = r.pick([0, 1, -1, 2, -2, 3, -3]);
      const nextIndex = Math.floor(qv(at) - 0.5 + 1e-9) + 1;
      const next = new Q(2 * nextIndex + 1, 2);
      const count = crossings(level, -2, 2);
      return problem({
        stem: "The graph of y = tan θ is shown for −2π ≤ θ ≤ 2π. The dashed lines are its vertical asymptotes.",
        blocks: [
          graph({
            caption: "The graph of y = tan θ with the point A marked",
            alt: `Branches of the tangent function that rise from the bottom of the window to the top between dashed vertical asymptotes at θ = −3π/2, −π/2, π/2, and 3π/2. The point A is marked on the curve at θ = ${piText(at)}.`,
            window: { x: [-2 * PI - 0.3, 2 * PI + 0.3], y: [-4, 4] },
            ticks: { x: piTicks(-2, 2, 2), y: 1 },
            axisLabels: { x: "θ", y: "y" },
            functions: [{ expr: "tan(x)" }],
            asymptotes: [-1.5, -0.5, 0.5, 1.5].map((u) => ({ x: u * PI })),
            points: [
              {
                at: [radians(at), y.value],
                label: "A",
                position: qv(at) > 0 ? "se" : "nw",
              },
            ],
          }),
        ],
        parts: [
          part(
            `Point A is on the graph at θ = ${piText(at)}. What is the y-coordinate of A?`,
            ask.number("y =", y.text),
          ),
          part(
            "What is the θ-coordinate of the first vertical asymptote to the right of A?",
            ask.number("θ =", piText(next)),
          ),
          part(
            `How many solutions does tan θ = ${sg(level)} have with −2π ≤ θ ≤ 2π?`,
            ask.number("Solutions:", count),
          ),
        ],
        solution: [
          `tan(${piText(at)}) = ${y.text}, so A = (${piText(at)}, ${y.text}).`,
          `The asymptotes are at θ = π/2 + kπ. The first one to the right of ${piText(at)} is θ = ${piText(next)}.`,
          level === 0
            ? "The graph meets the θ-axis once at each of −2π, −π, 0, π, and 2π, which is 5 solutions."
            : `Between consecutive asymptotes the graph increases through every y-value exactly once. The three full branches between −3π/2 and 3π/2 each meet y = ${sg(level)} once, and so does one partial branch at ${level > 0 ? "the left end" : "the right end"}. That is 4 solutions.`,
        ],
        data: { at, y, level, next, count },
      });
    },
    verify({ data: { at, y, level, next, count } }) {
      assertNear(y.value, Math.tan(radians(at)), "y");
      assert(qv(next) > qv(at) && qv(next) - qv(at) <= 1, "next asymptote");
      assertNear(Math.cos(radians(next)), 0, "asymptote");
      assert(count === (level === 0 ? 5 : 4), "count");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "tangent-transformations",
    skill: "construct-functions",
    make(r) {
      const b = r.pick([new Q(1, 2), new Q(2), new Q(3), new Q(4)]);
      const a = r.pick([1, 2, 3, 4, -1, -2, -3]);
      const d = r.pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]);
      const period = new Q(b.d, b.n);
      const at1 = new Q(1, 4).div(b);
      const at2 = new Q(1, 3).div(b);
      const key = tanText({ a, b, d });
      const value = scaled("tan", new Q(1, 3), a);
      return problem({
        stem: `The function f(θ) = a tan(bθ) + d, with b > 0, has a period of ${piText(period)}. The points of inflection of its graph lie on the line y = ${sg(d)}, and the graph passes through the point (${piText(at1)}, ${sg(a + d)}).`,
        parts: [
          part("Find b.", ask.number("b =", b)),
          part("Find a.", ask.number("a =", a)),
          part("Write a formula for f(θ).", ask.expr("f(θ) =", key, { vars: ["θ"] })),
          part(
            `Find f(${piText(at2)}). Write an exact value.`,
            ask.number(`f(${piText(at2)}) =`, plusText(d, value)),
          ),
        ],
        solution: [
          `The period of a·tan(bθ) + d is π/b. Setting π/b = ${piText(period)} gives b = ${b.toString()}.`,
          `The inflection points are on y = d, so d = ${sg(d)}. At θ = ${piText(at1)}, bθ = π/4 and tan(π/4) = 1, so f(${piText(at1)}) = a + d = ${sg(a + d)}. Then a = ${sg(a + d)} − ${d < 0 ? `(${sg(d)})` : d} = ${sg(a)}.`,
          `f(θ) = ${key}.`,
          `At θ = ${piText(at2)}, bθ = π/3 and tan(π/3) = √3, so f(${piText(at2)}) = ${sg(a)}(√3) + ${d < 0 ? `(${sg(d)})` : d} = ${plusText(d, value)}.`,
        ],
        data: { a, b, d, period, at1, at2, value },
      });
    },
    verify({ data: { a, b, d, period, at1, at2, value } }) {
      const f = tanOf({ a, b, d });
      assertNear(f(qv(at1) * PI), a + d, "point");
      assertNear(f(0.4 + qv(period) * PI), f(0.4), "period");
      assertNear(f(qv(at2) * PI), d + value.value, "value");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "tangent-characteristics",
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
        .shuffle(["bounded", "period", "asymptote", "inflection", "monotone"])
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
    concept: "tangent-transformations",
    skill: "describe",
    make(r) {
      const b = r.pick([new Q(1), new Q(2), new Q(1, 2), new Q(3)]);
      const h = r.pick([
        new Q(-3, 4),
        new Q(-1, 2),
        new Q(-1, 4),
        new Q(1, 4),
        new Q(1, 2),
        new Q(3, 4),
      ]);
      const a = r.pick([1, 2, 3, -1, -2]);
      const d = r.pick([-3, -2, -1, 1, 2, 3]);
      const period = new Q(b.d, b.n);
      const spaced = [];
      for (let k = -12; k <= 12; k++) spaced.push(h.add(new Q(2 * k + 1, 2).div(b)));
      const positive = spaced.filter((q) => qv(q) > 1e-9).sort((p, q) => qv(p) - qv(q));
      const inside = positive.filter((q) => qv(q) < 2 - 1e-9);
      const smallest = positive[0];
      assert(inside.length >= 1 && inside[0].toString() === smallest.toString(), "first");
      return problem({
        stem: `Let f(θ) = ${tanText({ a, b, h, d })}.`,
        parts: [
          part("Find the period of f.", ask.number("Period:", piText(period))),
          part(
            "Find the smallest positive value of θ at which the graph of f has a vertical asymptote.",
            ask.number("θ =", piText(smallest)),
          ),
          part(
            "How many vertical asymptotes does the graph of f have for 0 < θ < 2π?",
            ask.number("Asymptotes:", inside.length),
          ),
        ],
        solution: [
          `The period of a·tan(b(θ − h)) + d is π/|b|. Here b = ${b.toString()}, so the period is ${piText(period)}.`,
          `The asymptotes are where b(θ − h) = π/2 + kπ, that is θ = ${piText(h)} + (π/2 + kπ)/${b.toString()}. They are spaced ${piText(period)} apart. The smallest positive one is θ = ${piText(smallest)}.`,
          `The asymptotes with 0 < θ < 2π are at ${inside.map(piText).join(", ")}, so there ${inside.length === 1 ? "is 1 asymptote" : `are ${inside.length} asymptotes`}.`,
        ],
        data: { a, b, h, d, period, smallest, inside },
      });
    },
    verify({ data: { a, b, h, d, period, smallest, inside } }) {
      const f = tanOf({ a, b, h, d });
      assertNear(f(0.2 + qv(period) * PI), f(0.2), "period");
      const arg = qv(b) * (qv(smallest) - qv(h)) * PI;
      assertNear(Math.cos(arg), 0, "asymptote");
      for (const q of inside)
        assertNear(Math.cos(qv(b) * (qv(q) - qv(h)) * PI), 0, "asymptotes");
      let count = 0;
      for (let k = -30; k <= 30; k++) {
        const t = qv(h) + (k + 0.5) / qv(b);
        if (t > 1e-9 && t < 2 - 1e-9) count++;
      }
      assert(count === inside.length, "count");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "tangent-function",
    skill: "apply-results",
    make(r) {
      const s3 = Math.sqrt(3);
      const LEVELS = [
        { v: 1, t: "1" },
        { v: -1, t: "−1" },
        { v: s3, t: "√3" },
        { v: -s3, t: "−√3" },
        { v: s3 / 3, t: "√3/3" },
        { v: -s3 / 3, t: "−√3/3" },
      ];
      const [first, second] = r.sample(LEVELS, 2);
      const op = r.pick([">", "<"]);
      const setA = anglesWith("tan", first.v, 0, 2);
      const principal = anglesWith("tan", second.v, -0.5, 0.5);
      assert(setA.length === 2 && principal.length === 1, "solutions");
      const where = signIntervals("tan", op, 0, 2);
      return problem({
        stem: "Use the unit circle and the graph of y = tan θ.",
        parts: [
          part(
            `Solve tan θ = ${first.t} for 0 ≤ θ < 2π.`,
            ask.set("θ =", setA.map(piText)),
          ),
          part(
            `Solve tan θ = ${second.t} for −π/2 < θ < π/2.`,
            ask.number("θ =", piText(principal[0])),
          ),
          part(
            `Where is tan θ ${op} 0 for 0 ≤ θ ≤ 2π? Write the answer in interval notation.`,
            ask.interval("θ in", where),
          ),
        ],
        solution: [
          `tan θ is the slope of the terminal ray. It equals ${first.t} at θ = ${setA.map(piText).join(" and ")}. These differ by π, because tangent has a period of π.`,
          `Tangent is increasing on (−π/2, π/2), so it takes each value once there. The solution is θ = ${piText(principal[0])}.`,
          `tan θ ${op} 0 when sin θ and cos θ have ${op === ">" ? "the same sign, in quadrants I and III" : "opposite signs, in quadrants II and IV"}. Tangent does not exist at π/2 and 3π/2, so those values are left out: ${where}.`,
        ],
        data: { first, second, op, setA, principal, where },
      });
    },
    verify({ data: { first, second, setA, principal, op, where } }) {
      for (const q of setA) assertNear(Math.tan(radians(q)), first.v, "set");
      assertNear(Math.tan(radians(principal[0])), second.v, "principal");
      for (let t = 0.05; t < 2 * PI; t += 0.1) {
        const near = [PI / 2, (3 * PI) / 2].some((p) => Math.abs(t - p) < 0.06);
        if (near) continue;
        const v = Math.tan(t);
        const shouldHold = op === ">" ? v > 0 : v < 0;
        const inside = where.split(" ∪ ").some((piece) => within(piece, t / PI));
        assert(inside === shouldHold, `sign at ${t}`);
      }
    },
  },
];

// Parses "(0, π/2)" or "[0, π]" and tests whether u (in units of π) is inside.
function within(piece, u) {
  const [left, right] = piece.slice(1, -1).split(", ");
  const parse = (s) => {
    if (s === "0") return 0;
    const m = /^(−?)(\d*)π(?:\/(\d+))?$/.exec(s);
    const coefficient = m[2] === "" ? 1 : Number(m[2]);
    const value = coefficient / (m[3] ? Number(m[3]) : 1);
    return m[1] ? -value : value;
  };
  return u > parse(left) - 1e-9 && u < parse(right) + 1e-9;
}

// The values k + offset in lo..hi as text, in units of π: "π/2, 3π/2". With closed, the ends count.
function asymptoteList(lo, hi, offset, closed = false) {
  const values = [];
  for (let k = -8; k <= 10; k++) {
    const u = k + offset;
    const inside = closed
      ? u >= lo - 1e-9 && u <= hi + 1e-9
      : u > lo + 1e-9 && u < hi - 1e-9;
    if (inside) values.push(halfPi(u));
  }
  return values.join(", ");
}

// One true or false statement about the tangent function and its transformations.
function claim(r, kind, truth) {
  if (kind === "bounded") {
    const M = r.pick([1, 3, 10]);
    return truth
      ? {
          truth,
          statement: "The graph of y = tan θ has no maximum value and no minimum value.",
          reason:
            "Near each vertical asymptote the graph rises without bound on one side and falls without bound on the other, so tangent has no maximum or minimum value. The statement is true.",
          check: () => Math.tan(PI / 2 - 1e-6) > 1e5 && Math.tan(-PI / 2 + 1e-6) < -1e5,
        }
      : {
          truth,
          statement: `The graph of y = tan θ has a maximum value of ${M}.`,
          reason: `Near θ = π/2 the values of tan θ grow without bound, so they pass ${M}. Tangent has no maximum value, so the statement is false.`,
          check: () => Math.tan(PI / 2 - 1e-6) <= M,
        };
  }
  if (kind === "period") {
    const b = r.pick([2, 3, 4]);
    const right = new Q(1, b);
    const said = truth ? right : r.pick([new Q(b), new Q(1), new Q(2, b)]);
    return {
      truth,
      statement: `The function y = tan(${b}θ) has a period of ${piText(said)}.`,
      reason: `The period of tan(bθ) is π/|b|. With b = ${b}, the period is ${piText(right)}. ${truth ? "The statement is true." : `It is not ${piText(said)}, so the statement is false.`}`,
      check: () => Math.abs(qv(said) - 1 / b) < 1e-9,
    };
  }
  if (kind === "asymptote") {
    const k = r.pick([-2, -1, 0, 1, 2]);
    const said = truth ? new Q(2 * k + 1, 2) : r.pick([new Q(k), new Q(2 * k + 1, 4)]);
    return {
      truth,
      statement: `The graph of y = tan θ has a vertical asymptote at θ = ${piText(said)}.`,
      reason: `Tangent has asymptotes where cos θ = 0, at θ = π/2 + kπ. ${truth ? `cos(${piText(said)}) = 0, so the statement is true.` : `cos(${piText(said)}) is not 0, so there is no asymptote there and the statement is false.`}`,
      check: () => Math.abs(Math.cos(qv(said) * PI)) < 1e-9,
    };
  }
  if (kind === "inflection") {
    const d = r.pick([-4, -3, -2, 2, 3, 4]);
    const said = truth ? d : r.pick([-d, 0]);
    return {
      truth,
      statement: `The points of inflection of the graph of y = tan θ ${d > 0 ? "+" : "−"} ${Math.abs(d)} lie on the line y = ${sg(said)}.`,
      reason: `The points of inflection of y = tan θ are on the θ-axis, y = 0. Adding ${sg(d)} moves them to the line y = ${sg(d)}. ${truth ? "The statement is true." : `They are not on y = ${sg(said)}, so the statement is false.`}`,
      check: () => said === d,
    };
  }
  const word = truth ? "increasing" : "decreasing";
  return {
    truth,
    statement: `On every interval between two consecutive vertical asymptotes, the function y = tan θ is ${word}.`,
    reason: `Between consecutive asymptotes the graph rises from the bottom of the window to the top, so tan θ is increasing. ${truth ? "The statement is true." : "It is not decreasing, so the statement is false."}`,
    check: () => (Math.tan(1.2) > Math.tan(1.0) ? "increasing" : "decreasing") === word,
  };
}

// Typed-answer problems for Topic 3.12. Every key is checked against Math.sin and Math.cos:
// the Pythagorean identities, the sum, difference, and double-angle identities, and equations
// that become quadratic once an identity is used. Exact values are built with a small radical
// arithmetic (1, √2, √3, √6) so that sin(5π/12) comes out as (√6 + √2)/4.

import {
  ask,
  part,
  problem,
  Q,
  piText,
  exact,
  fromDegrees,
  anglesWith,
  SPECIAL,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const RAD = Math.PI / 180;
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const abs = (q) => (q.n < 0 ? q.neg() : q);
const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
];

// ---------- exact values: numbers of the form p + q√2 + r√3 + s√6 ----------

const ROOTS = [1, 2, 3, 6];
// √u · √v = factor · √root
const PRODUCT = {
  1: [1, 1],
  2: [1, 2],
  3: [1, 3],
  6: [1, 6],
  4: [2, 1],
  9: [3, 1],
  36: [6, 1],
  12: [2, 3],
  18: [3, 2],
};
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

class Surd {
  constructor(parts = {}) {
    this.c = {};
    for (const root of ROOTS) this.c[root] = parts[root] ? Q.of(parts[root]) : new Q(0);
  }
  add(other) {
    const parts = {};
    for (const root of ROOTS) parts[root] = this.c[root].add(other.c[root]);
    return new Surd(parts);
  }
  neg() {
    const parts = {};
    for (const root of ROOTS) parts[root] = this.c[root].neg();
    return new Surd(parts);
  }
  sub(other) {
    return this.add(other.neg());
  }
  mul(other) {
    const parts = {};
    for (const root of ROOTS) parts[root] = new Q(0);
    for (const u of ROOTS)
      for (const v of ROOTS) {
        const k = this.c[u].mul(other.c[v]);
        if (k.n === 0) continue;
        const [factor, root] = PRODUCT[u * v];
        parts[root] = parts[root].add(k.mul(factor));
      }
    return new Surd(parts);
  }
  get value() {
    return ROOTS.reduce((sum, root) => sum + this.c[root].value * Math.sqrt(root), 0);
  }
  // Written the way a student would: (√6 + √2)/4, −(2 + √3), √3/2.
  get text() {
    const terms = ROOTS.filter((root) => this.c[root].n !== 0).map((root) => ({
      root,
      k: this.c[root],
      size: Math.abs(this.c[root].value) * Math.sqrt(root),
    }));
    if (!terms.length) return "0";
    terms.sort((a, b) => b.size - a.size);
    // √2 − √6 reads better than −(√6 − √2).
    if (terms.length === 2 && terms[0].k.n < 0 && terms[1].k.n > 0) terms.reverse();
    const den = terms.reduce((lcm, t) => (lcm * t.k.d) / gcd(lcm, t.k.d), 1);
    const negative = terms[0].k.n < 0;
    const parts = terms.map((t) => {
      const n = Math.abs((t.k.n * den) / t.k.d);
      const body = t.root === 1 ? String(n) : `${n === 1 ? "" : n}√${t.root}`;
      return { body, minus: t.k.n < 0 !== negative };
    });
    const inner = parts
      .map((p, i) => (i === 0 ? p.body : `${p.minus ? "−" : "+"} ${p.body}`))
      .join(" ");
    const many = parts.length > 1;
    const base = many
      ? den === 1
        ? negative
          ? `(${inner})`
          : inner
        : `(${inner})/${den}`
      : den === 1
        ? inner
        : `${inner}/${den}`;
    return negative ? `−${base}` : base;
  }
}
const surd = (root, k) => new Surd({ [root]: k });
const half = (root) => surd(root, new Q(1, 2));
const SIN_REF = {
  0: new Surd(),
  30: surd(1, new Q(1, 2)),
  45: half(2),
  60: half(3),
  90: surd(1, 1),
};
const COS_REF = {
  0: surd(1, 1),
  30: half(3),
  45: half(2),
  60: surd(1, new Q(1, 2)),
  90: new Surd(),
};

function locate(degrees) {
  const d = ((degrees % 360) + 360) % 360;
  if (d <= 90) return { ref: d, s: 1, c: 1 };
  if (d <= 180) return { ref: 180 - d, s: 1, c: -1 };
  if (d <= 270) return { ref: d - 180, s: -1, c: -1 };
  return { ref: 360 - d, s: -1, c: 1 };
}
const sinS = (degrees) => {
  const { ref, s } = locate(degrees);
  return s > 0 ? SIN_REF[ref] : SIN_REF[ref].neg();
};
const cosS = (degrees) => {
  const { ref, c } = locate(degrees);
  return c > 0 ? COS_REF[ref] : COS_REF[ref].neg();
};
// tan at an odd multiple of 15° is ±(2 ± √3).
const TAN15 = {
  15: new Surd({ 1: 2, 3: -1 }),
  75: new Surd({ 1: 2, 3: 1 }),
  105: new Surd({ 1: -2, 3: -1 }),
  165: new Surd({ 1: -2, 3: 1 }),
};
const tanS = (degrees) => TAN15[((degrees % 180) + 180) % 180];
const angleText = (degrees) => piText(fromDegrees(degrees));

// ---------- angles from a Pythagorean triple ----------

function angleData(r) {
  const [a0, b0, h] = r.pick(TRIPLES);
  const [a, b] = r.chance() ? [a0, b0] : [b0, a0];
  const ss = r.sign();
  const cs = r.sign();
  const sin = new Q(ss * a, h);
  const cos = new Q(cs * b, h);
  const quadrant = ss > 0 ? (cs > 0 ? "I" : "II") : cs > 0 ? "IV" : "III";
  return { sin, cos, quadrant, ss, cs, a, b, h, angle: Math.atan2(sin.value, cos.value) };
}
const signWord = (s) => (s > 0 ? "positive" : "negative");
const lowerFn = (fn) => (fn === "sin" ? "sine" : "cosine");

// An equation written from [coefficient, body] terms: 2 cos²θ + 3 sin θ − 3 = 0.
function equationText(terms) {
  let out = "";
  for (const [coefficient, body] of terms) {
    if (coefficient === 0) continue;
    const size = Math.abs(coefficient);
    const text = body ? (size === 1 ? body : `${size} ${body}`) : String(size);
    out += out
      ? ` ${coefficient < 0 ? "−" : "+"} ${text}`
      : `${coefficient < 0 ? "−" : ""}${text}`;
  }
  return `${out} = 0`;
}
const rootFactor = (name, root) =>
  root.n === 0 ? name : `(${name} ${root.n < 0 ? "+" : "−"} ${abs(root).toString()})`;
const factoredText = (lead, name, r1, r2) => {
  // A root of 0 gives the bare factor, which goes first: 2 sin θ(sin θ − 3/2).
  const [first, second] = r2.n === 0 ? [r2, r1] : [r1, r2];
  const head = lead === 1 ? "" : first.n === 0 ? `${lead} ` : String(lead);
  return `${head}${rootFactor(name, first)}${rootFactor(name, second)}`;
};

// Values from −2 to 2 in steps of 1/2: sin θ or cos θ can only reach the ones in [−1, 1].
const ROOT_POOL = Array.from({ length: 9 }, (_, k) => new Q(k - 4, 2));
const reachable = (q) => Math.abs(q.value) <= 1;
const rootPairs = (ok) => {
  const pairs = [];
  for (let i = 0; i < ROOT_POOL.length; i++)
    for (let j = i + 1; j < ROOT_POOL.length; j++) {
      const pair = [ROOT_POOL[i], ROOT_POOL[j]];
      if ((reachable(pair[0]) || reachable(pair[1])) && ok(pair)) pairs.push(pair);
    }
  return pairs;
};
const isInteger = (q) => q.d === 1;
const anglesFor = (fn, roots, hi = 2) => {
  const all = new Map();
  for (const root of roots)
    if (reachable(root))
      for (const angle of anglesWith(fn, root.value, 0, hi))
        all.set(`${angle.n}/${angle.d}`, angle);
  return [...all.values()].sort((x, y) => x.value - y.value);
};
const listText = (angles) => angles.map(piText).join(", ");

// A chosen identity is only worth asking about if sides really are (or are not) equal.
const TEST_POINTS = [
  [0.7, 1.3],
  [2.1, 0.4],
  [-1.2, 0.9],
  [4.0, 2.2],
];
const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan;
const sec = (x) => 1 / Math.cos(x);

const CLAIMS = {
  sumSin: [
    {
      text: "sin(θ + φ) = sin θ cos φ + cos θ sin φ",
      truth: true,
      f: (t, p) => [sin(t + p), sin(t) * cos(p) + cos(t) * sin(p)],
      why: "This is the sum identity for sine.",
    },
    {
      text: "sin(θ + φ) = sin θ cos φ − cos θ sin φ",
      truth: false,
      f: (t, p) => [sin(t + p), sin(t) * cos(p) - cos(t) * sin(p)],
      why: "The sum identity for sine has a plus sign. The version with a minus sign is the identity for sin(θ − φ).",
    },
    {
      text: "sin(θ + φ) = sin θ + sin φ",
      truth: false,
      f: (t, p) => [sin(t + p), sin(t) + sin(p)],
      why: "Sine does not distribute over a sum. For θ = φ = π/6, sin(π/3) = √3/2, but sin(π/6) + sin(π/6) = 1.",
    },
    {
      text: "sin(θ + φ) = cos θ cos φ − sin θ sin φ",
      truth: false,
      f: (t, p) => [sin(t + p), cos(t) * cos(p) - sin(t) * sin(p)],
      why: "The right side is the sum identity for cosine, cos(θ + φ). The sum identity for sine is sin θ cos φ + cos θ sin φ.",
    },
  ],
  sumCos: [
    {
      text: "cos(θ + φ) = cos θ cos φ − sin θ sin φ",
      truth: true,
      f: (t, p) => [cos(t + p), cos(t) * cos(p) - sin(t) * sin(p)],
      why: "This is the sum identity for cosine.",
    },
    {
      text: "cos(θ + φ) = cos θ cos φ + sin θ sin φ",
      truth: false,
      f: (t, p) => [cos(t + p), cos(t) * cos(p) + sin(t) * sin(p)],
      why: "The sum identity for cosine has a minus sign. The version with a plus sign is the identity for cos(θ − φ).",
    },
    {
      text: "cos(θ + φ) = cos θ + cos φ",
      truth: false,
      f: (t, p) => [cos(t + p), cos(t) + cos(p)],
      why: "Cosine does not distribute over a sum. For θ = φ = π/3, cos(2π/3) = −1/2, but cos(π/3) + cos(π/3) = 1.",
    },
  ],
  diffCos: [
    {
      text: "cos(θ − φ) = cos θ cos φ + sin θ sin φ",
      truth: true,
      f: (t, p) => [cos(t - p), cos(t) * cos(p) + sin(t) * sin(p)],
      why: "This is the difference identity for cosine: replacing φ with −φ in the sum identity changes the sign.",
    },
    {
      text: "cos(θ − φ) = cos θ cos φ − sin θ sin φ",
      truth: false,
      f: (t, p) => [cos(t - p), cos(t) * cos(p) - sin(t) * sin(p)],
      why: "The difference identity for cosine has a plus sign. The version with a minus sign is the identity for cos(θ + φ).",
    },
    {
      text: "cos(θ − φ) = cos θ − cos φ",
      truth: false,
      f: (t, p) => [cos(t - p), cos(t) - cos(p)],
      why: "Cosine does not distribute over a difference. For θ = φ = π/2, cos 0 = 1, but cos(π/2) − cos(π/2) = 0.",
    },
  ],
  diffSin: [
    {
      text: "sin(θ − φ) = sin θ cos φ − cos θ sin φ",
      truth: true,
      f: (t, p) => [sin(t - p), sin(t) * cos(p) - cos(t) * sin(p)],
      why: "This is the difference identity for sine: replacing φ with −φ in the sum identity changes the sign.",
    },
    {
      text: "sin(θ − φ) = sin θ cos φ + cos θ sin φ",
      truth: false,
      f: (t, p) => [sin(t - p), sin(t) * cos(p) + cos(t) * sin(p)],
      why: "The difference identity for sine has a minus sign. The version with a plus sign is the identity for sin(θ + φ).",
    },
    {
      text: "sin(θ − φ) = sin θ − sin φ",
      truth: false,
      f: (t, p) => [sin(t - p), sin(t) - sin(p)],
      why: "Sine does not distribute over a difference. For θ = π/2 and φ = π/6, sin(π/3) = √3/2, but 1 − 1/2 = 1/2.",
    },
  ],
  doubleSin: [
    {
      text: "sin 2θ = 2 sin θ cos θ",
      truth: true,
      f: (t) => [sin(2 * t), 2 * sin(t) * cos(t)],
      why: "This is the double-angle identity for sine: let φ = θ in sin(θ + φ).",
    },
    {
      text: "sin 2θ = 2 sin θ",
      truth: false,
      f: (t) => [sin(2 * t), 2 * sin(t)],
      why: "Doubling the angle does not double the sine. For θ = π/4, sin(π/2) = 1, but 2 sin(π/4) = √2.",
    },
    {
      text: "sin 2θ = sin²θ + cos²θ",
      truth: false,
      f: (t) => [sin(2 * t), sin(t) ** 2 + cos(t) ** 2],
      why: "sin²θ + cos²θ is always 1, but sin 2θ is not. For θ = π/6, sin(π/3) = √3/2.",
    },
  ],
  doubleCos: [
    {
      text: "cos 2θ = cos²θ − sin²θ",
      truth: true,
      f: (t) => [cos(2 * t), cos(t) ** 2 - sin(t) ** 2],
      why: "This is the double-angle identity for cosine: let φ = θ in cos(θ + φ).",
    },
    {
      text: "cos 2θ = 1 − 2 sin²θ",
      truth: true,
      f: (t) => [cos(2 * t), 1 - 2 * sin(t) ** 2],
      why: "Substitute cos²θ = 1 − sin²θ into cos²θ − sin²θ to get 1 − 2 sin²θ.",
    },
    {
      text: "cos 2θ = 2 cos²θ − 1",
      truth: true,
      f: (t) => [cos(2 * t), 2 * cos(t) ** 2 - 1],
      why: "Substitute sin²θ = 1 − cos²θ into cos²θ − sin²θ to get 2 cos²θ − 1.",
    },
    {
      text: "cos 2θ = 1 − 2 cos²θ",
      truth: false,
      f: (t) => [cos(2 * t), 1 - 2 * cos(t) ** 2],
      why: "The identity is 2 cos²θ − 1. For θ = 0, cos 0 = 1, but 1 − 2 cos²0 = −1.",
    },
    {
      text: "cos 2θ = 2 cos θ",
      truth: false,
      f: (t) => [cos(2 * t), 2 * cos(t)],
      why: "Doubling the angle does not double the cosine. For θ = π/3, cos(2π/3) = −1/2, but 2 cos(π/3) = 1.",
    },
    {
      text: "cos 2θ = sin²θ − cos²θ",
      truth: false,
      f: (t) => [cos(2 * t), sin(t) ** 2 - cos(t) ** 2],
      why: "The terms are in the wrong order: cos 2θ = cos²θ − sin²θ. For θ = 0, cos 0 = 1, but sin²0 − cos²0 = −1.",
    },
  ],
  pythagorean: [
    {
      text: "tan²θ = sec²θ − 1",
      truth: true,
      f: (t) => [tan(t) ** 2, sec(t) ** 2 - 1],
      why: "Divide sin²θ + cos²θ = 1 by cos²θ to get tan²θ + 1 = sec²θ.",
    },
    {
      text: "sin²θ = 1 − cos²θ",
      truth: true,
      f: (t) => [sin(t) ** 2, 1 - cos(t) ** 2],
      why: "This is sin²θ + cos²θ = 1 with cos²θ moved to the other side.",
    },
    {
      text: "tan²θ = sec²θ + 1",
      truth: false,
      f: (t) => [tan(t) ** 2, sec(t) ** 2 + 1],
      why: "The identity is tan²θ = sec²θ − 1. For θ = 0, tan 0 = 0, but sec²0 + 1 = 2.",
    },
    {
      text: "sin θ + cos θ = 1",
      truth: false,
      f: (t) => [sin(t) + cos(t), 1],
      why: "It is the squares that add to 1: sin²θ + cos²θ = 1. For θ = π/3, sin θ + cos θ = (√3 + 1)/2, which is not 1.",
    },
    {
      text: "sin²θ = cos²θ − 1",
      truth: false,
      f: (t) => [sin(t) ** 2, cos(t) ** 2 - 1],
      why: "The signs are reversed: sin²θ = 1 − cos²θ. For θ = π/2, sin²θ = 1, but cos²θ − 1 = −1.",
    },
  ],
};
const sidesEqual = (entry) =>
  TEST_POINTS.every(([t, p]) => {
    const [left, right] = entry.f(t, p);
    return Math.abs(left - right) < 1e-9;
  });

// Angles in degrees whose double is a multiple of 30 or 45, and the special angles for sums.
const HALF_ANGLES = [15, 30, 45, 60, 75, 105, 120, 135, 150, 165];
const SUM_TOTALS = [30, 45, 60, 120, 135, 150];
const COMPONENTS = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];
const ODD_FIFTEENS = [15, 75, 105, 165, 195, 255, 285, 345];
const exactAt = (fn, degrees) => exact(fn, fromDegrees(degrees));

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "pythagorean-identity",
    skill: "identify-information",
    make(r) {
      const d = angleData(r);
      const given = r.pick(["sin", "cos"]);
      const other = given === "sin" ? "cos" : "sin";
      const g = d[given];
      const o = d[other];
      const tanQ = d.sin.div(d.cos);
      const gsq = g.mul(g);
      const osq = new Q(1).sub(gsq);
      const sign = other === "cos" ? d.cs : d.ss;
      return problem({
        stem: `An angle θ in standard position has ${given} θ = ${g.toString()}, and its terminal ray is in Quadrant ${d.quadrant}.`,
        parts: [
          part(`Find ${other} θ.`, ask.number(`${other} θ =`, o)),
          part("Find tan θ.", ask.number("tan θ =", tanQ)),
        ],
        solution: [
          `Since sin²θ + cos²θ = 1, ${other}²θ = 1 − (${g.toString()})² = 1 − ${gsq.toString()} = ${osq.toString()}. So ${other} θ = ±${abs(o).toString()}. In Quadrant ${d.quadrant}, ${lowerFn(other)} is ${signWord(sign)}, so ${other} θ = ${o.toString()}.`,
          `tan θ = sin θ / cos θ = (${d.sin.toString()})/(${d.cos.toString()}) = ${tanQ.toString()}.`,
        ],
        data: { d, given },
      });
    },
    verify({ data: { d } }) {
      assertNear(d.sin.value ** 2 + d.cos.value ** 2, 1, "identity");
      assertNear(Math.sin(d.angle), d.sin.value, "sin");
      assertNear(Math.cos(d.angle), d.cos.value, "cos");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "pythagorean-identity",
    skill: "solve",
    make(r) {
      const [a0, b0, h] = r.pick(TRIPLES);
      const [a, b] = r.chance() ? [a0, b0] : [b0, a0];
      const ts = r.sign();
      const cs = r.sign();
      const ss = ts * cs;
      const tanQ = new Q(ts * a, b);
      const clueFn = r.pick(["sin", "cos"]);
      const clueSign = clueFn === "cos" ? cs : ss;
      const clue = `${clueFn} θ ${clueSign < 0 ? "<" : ">"} 0`;
      const sec = new Q(cs * h, b);
      const cosQ = new Q(cs * b, h);
      const sinQ = new Q(ss * a, h);
      const sq = tanQ.mul(tanQ);
      const secSq = new Q(1).add(sq);
      return problem({
        stem: `An angle θ has tan θ = ${tanQ.toString()} and ${clue}.`,
        parts: [
          part("Find sec θ.", ask.number("sec θ =", sec)),
          part("Find cos θ.", ask.number("cos θ =", cosQ)),
          part("Find sin θ.", ask.number("sin θ =", sinQ)),
        ],
        solution: [
          `Use tan²θ + 1 = sec²θ: sec²θ = (${tanQ.toString()})² + 1 = ${sq.toString()} + 1 = ${secSq.toString()}, so sec θ = ±${new Q(h, b).toString()}. Because tan θ is ${signWord(ts)} and ${clue}, cos θ is ${signWord(cs)}, so sec θ = ${sec.toString()}.`,
          `cos θ is the reciprocal of sec θ: cos θ = 1/(${sec.toString()}) = ${cosQ.toString()}.`,
          `sin θ = tan θ · cos θ = (${tanQ.toString()})(${cosQ.toString()}) = ${sinQ.toString()}.`,
        ],
        data: { tanQ, sec, cosQ, sinQ, cs, ss },
      });
    },
    verify({ data: { tanQ, sec, cosQ, sinQ } }) {
      assertNear(cosQ.value ** 2 + sinQ.value ** 2, 1, "identity");
      assertNear(sinQ.value / cosQ.value, tanQ.value, "tan");
      assertNear(1 / cosQ.value, sec.value, "sec");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "pythagorean-identity",
    skill: "equivalent-forms",
    make(r) {
      const coefficients = r.distinct(2, 9, 3);
      const pool = r.shuffle([
        (a) => ({
          prompt: `Simplify ${a} sin²θ + ${a} cos²θ to a single number.`,
          label: "value =",
          key: new Q(a),
          why: `Factor out ${a}: ${a}(sin²θ + cos²θ) = ${a}(1) = ${a}.`,
          check: (t) => [a * sin(t) ** 2 + a * cos(t) ** 2, a],
        }),
        (a) => ({
          prompt: `${a} − ${a} cos²θ can be written as k sin²θ. Find k.`,
          label: "k =",
          key: new Q(a),
          why: `${a} − ${a} cos²θ = ${a}(1 − cos²θ) = ${a} sin²θ, so k = ${a}.`,
          check: (t) => [a - a * cos(t) ** 2, a * sin(t) ** 2],
        }),
        (a) => ({
          prompt: `Simplify ${a} sec²θ − ${a} tan²θ to a single number.`,
          label: "value =",
          key: new Q(a),
          why: `Factor out ${a}: ${a}(sec²θ − tan²θ) = ${a}(1) = ${a}, because tan²θ + 1 = sec²θ.`,
          check: (t) => [a * sec(t) ** 2 - a * tan(t) ** 2, a],
        }),
        (a) => ({
          prompt: `${a} tan²θ + ${a} can be written as k sec²θ. Find k.`,
          label: "k =",
          key: new Q(a),
          why: `${a} tan²θ + ${a} = ${a}(tan²θ + 1) = ${a} sec²θ, so k = ${a}.`,
          check: (t) => [a * tan(t) ** 2 + a, a * sec(t) ** 2],
        }),
        (a) => ({
          prompt: `Simplify (${a} cos²θ − ${a}) / sin²θ to a single number. Assume sin θ ≠ 0.`,
          label: "value =",
          key: new Q(-a),
          why: `The numerator is ${a}(cos²θ − 1) = −${a}(1 − cos²θ) = −${a} sin²θ. Dividing by sin²θ leaves −${a}.`,
          check: (t) => [(a * cos(t) ** 2 - a) / sin(t) ** 2, -a],
        }),
        (a, q) => ({
          prompt: `If sin²θ = ${q.toString()}, find cos²θ.`,
          label: "cos²θ =",
          key: new Q(1).sub(q),
          why: `cos²θ = 1 − sin²θ = 1 − ${q.toString()} = ${new Q(1).sub(q).toString()}.`,
          check: () => [1 - q.value, new Q(1).sub(q).value],
        }),
        (a, q) => ({
          prompt: `If tan²θ = ${q.toString()}, find sec²θ.`,
          label: "sec²θ =",
          key: new Q(1).add(q),
          why: `sec²θ = tan²θ + 1 = ${q.toString()} + 1 = ${new Q(1).add(q).toString()}.`,
          check: () => [1 + q.value, new Q(1).add(q).value],
        }),
      ]);
      const items = pool.slice(0, 3).map((build, i) => {
        const den = r.pick([5, 8, 10, 20, 25]);
        const q = new Q(r.int(1, den - 1), den);
        return build(coefficients[i], q);
      });
      return problem({
        stem: "Use the Pythagorean identities to answer each part.",
        parts: items.map((item) => part(item.prompt, ask.number(item.label, item.key))),
        solution: items.map((item) => item.why),
        data: { items },
      });
    },
    verify({ data: { items } }) {
      for (const item of items)
        for (const t of [0.4, 1.1, 2.3, 4.6]) {
          const [left, right] = item.check(t);
          assertNear(left, right, item.prompt);
        }
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "sum-identities",
    skill: "apply-results",
    make(r) {
      const alpha = angleData(r);
      const beta = angleData(r);
      const givenA = r.pick(["sin", "cos"]);
      const givenB = r.pick(["sin", "cos"]);
      const otherA = givenA === "sin" ? "cos" : "sin";
      const otherB = givenB === "sin" ? "cos" : "sin";
      const kind = r.pick(["sin+", "cos+", "sin−", "cos−"]);
      const fn = kind.slice(0, 3);
      const plus = kind.endsWith("+");
      const [sA, cA, sB, cB] = [alpha.sin, alpha.cos, beta.sin, beta.cos];
      let value;
      let rule;
      let work;
      const p = (q) => `(${q.toString()})`;
      if (fn === "sin") {
        const t1 = sA.mul(cB);
        const t2 = cA.mul(sB);
        value = plus ? t1.add(t2) : t1.sub(t2);
        rule = `sin(α ${plus ? "+" : "−"} β) = sin α cos β ${plus ? "+" : "−"} cos α sin β`;
        work = `${p(sA)}${p(cB)} ${plus ? "+" : "−"} ${p(cA)}${p(sB)}`;
      } else {
        const t1 = cA.mul(cB);
        const t2 = sA.mul(sB);
        value = plus ? t1.sub(t2) : t1.add(t2);
        rule = `cos(α ${plus ? "+" : "−"} β) = cos α cos β ${plus ? "−" : "+"} sin α sin β`;
        work = `${p(cA)}${p(cB)} ${plus ? "−" : "+"} ${p(sA)}${p(sB)}`;
      }
      const describe = (name, given, d) =>
        `${given} ${name} = ${d[given].toString()} and ${name} is in Quadrant ${d.quadrant}`;
      const find = (name, other, d, given) => {
        const sq = new Q(1).sub(d[given].mul(d[given]));
        const sign = other === "cos" ? d.cs : d.ss;
        return `${other}²${name} = 1 − (${d[given].toString()})² = ${sq.toString()}, so ${other} ${name} = ±${abs(d[other]).toString()}. ${lowerFn(other)[0].toUpperCase()}${lowerFn(other).slice(1)} is ${signWord(sign)} in Quadrant ${d.quadrant}, so ${other} ${name} = ${d[other].toString()}.`;
      };
      return problem({
        stem: `The angles α and β satisfy ${describe("α", givenA, alpha)}, and ${describe("β", givenB, beta)}.`,
        parts: [
          part(`Find ${otherA} α.`, ask.number(`${otherA} α =`, alpha[otherA])),
          part(`Find ${otherB} β.`, ask.number(`${otherB} β =`, beta[otherB])),
          part(
            `Find ${fn}(α ${plus ? "+" : "−"} β).`,
            ask.number(`${fn}(α ${plus ? "+" : "−"} β) =`, value),
          ),
        ],
        solution: [
          find("α", otherA, alpha, givenA),
          find("β", otherB, beta, givenB),
          `${rule} = ${work} = ${value.toString()}.`,
        ],
        data: { alpha, beta, fn, plus, value },
      });
    },
    verify({ data: { alpha, beta, fn, plus, value } }) {
      const target = plus ? alpha.angle + beta.angle : alpha.angle - beta.angle;
      assertNear(
        fn === "sin" ? Math.sin(target) : Math.cos(target),
        value.value,
        "value",
      );
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "sum-identities",
    skill: "equivalent-forms",
    make(r) {
      const x = r.pick(ODD_FIFTEENS);
      const options = [];
      for (const a of COMPONENTS)
        for (const b of COMPONENTS) {
          if (a + b === x) options.push({ a, b, plus: true });
          if (a - b === x) options.push({ a, b, plus: false });
        }
      if (!options.length) reject("no decomposition");
      const simple = options.filter((o) => Math.max(o.a, o.b) <= 180);
      const { a, b, plus } = r.pick(simple.length ? simple : options);
      const sinX = plus
        ? sinS(a)
            .mul(cosS(b))
            .add(cosS(a).mul(sinS(b)))
        : sinS(a)
            .mul(cosS(b))
            .sub(cosS(a).mul(sinS(b)));
      const cosX = plus
        ? cosS(a)
            .mul(cosS(b))
            .sub(sinS(a).mul(sinS(b)))
        : cosS(a)
            .mul(cosS(b))
            .add(sinS(a).mul(sinS(b)));
      const tanX = tanS(x);
      const A = angleText(a);
      const B = angleText(b);
      const X = angleText(x);
      const op = plus ? "+" : "−";
      const t = (fn, deg) => exactAt(fn, deg).text;
      const pg = (text) => `(${text})`;
      return problem({
        stem: `Write ${X} = ${A} ${op} ${B}. Use a sum or difference identity to find each exact value. Do not use a calculator.`,
        parts: [
          part(`Find sin(${X}).`, ask.number(`sin(${X}) =`, sinX.text)),
          part(`Find cos(${X}).`, ask.number(`cos(${X}) =`, cosX.text)),
          part(`Find tan(${X}).`, ask.number(`tan(${X}) =`, tanX.text)),
        ],
        solution: [
          `sin(${A} ${op} ${B}) = sin(${A})cos(${B}) ${op} cos(${A})sin(${B}) = ${pg(t("sin", a))}${pg(t("cos", b))} ${op} ${pg(t("cos", a))}${pg(t("sin", b))} = ${sinX.text}.`,
          `cos(${A} ${op} ${B}) = cos(${A})cos(${B}) ${plus ? "−" : "+"} sin(${A})sin(${B}) = ${pg(t("cos", a))}${pg(t("cos", b))} ${plus ? "−" : "+"} ${pg(t("sin", a))}${pg(t("sin", b))} = ${cosX.text}.`,
          `tan(${X}) = sin(${X}) / cos(${X}). Dividing the two exact values and rationalizing the denominator gives ${tanX.text}.`,
        ],
        data: { x, a, b, plus, sinX, cosX, tanX },
      });
    },
    verify({ data: { x, a, b, plus, sinX, cosX, tanX } }) {
      assertNear(sinX.value, Math.sin(x * RAD), "sin");
      assertNear(cosX.value, Math.cos(x * RAD), "cos");
      assertNear(tanX.value, Math.tan(x * RAD), "tan");
      assert(plus ? a + b === x : a - b === x, "decomposition");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "sum-identities",
    skill: "construct-functions",
    make(r) {
      const d = angleData(r);
      const given = r.pick(["sin", "cos"]);
      const sinQ = d.sin;
      const cosQ = d.cos;
      const sin2 = sinQ.mul(cosQ).mul(2);
      const cos2 = cosQ.mul(cosQ).sub(sinQ.mul(sinQ));
      const tan2 = sin2.div(cos2);
      const other = given === "sin" ? "cos" : "sin";
      const g = d[given].toString();
      const gsq = d[given].mul(d[given]);
      const osq = new Q(1).sub(gsq);
      const sign = other === "cos" ? d.cs : d.ss;
      const byGiven = given === "sin" ? new Q(1).sub(gsq.mul(2)) : gsq.mul(2).sub(1);
      return problem({
        stem: `An angle θ has ${given} θ = ${g}, and its terminal ray is in Quadrant ${d.quadrant}.`,
        parts: [
          part("Find sin 2θ.", ask.number("sin 2θ =", sin2)),
          part("Find cos 2θ.", ask.number("cos 2θ =", cos2)),
          part("Find tan 2θ.", ask.number("tan 2θ =", tan2)),
        ],
        solution: [
          `First find ${other} θ: ${other}²θ = 1 − (${g})² = ${osq.toString()}, so ${other} θ = ±${abs(d[other]).toString()}. In Quadrant ${d.quadrant}, ${lowerFn(other)} is ${signWord(sign)}, so ${other} θ = ${d[other].toString()}. Then sin 2θ = 2 sin θ cos θ = 2(${sinQ.toString()})(${cosQ.toString()}) = ${sin2.toString()}.`,
          `cos 2θ = cos²θ − sin²θ = (${cosQ.toString()})² − (${sinQ.toString()})² = ${cos2.toString()}. As a check, ${given === "sin" ? "1 − 2 sin²θ" : "2 cos²θ − 1"} = ${byGiven.toString()}.`,
          `tan 2θ = sin 2θ / cos 2θ = (${sin2.toString()})/(${cos2.toString()}) = ${tan2.toString()}.`,
        ],
        data: { d, sin2, cos2, tan2, byGiven },
      });
    },
    verify({ data: { d, sin2, cos2, tan2, byGiven } }) {
      assertNear(Math.sin(2 * d.angle), sin2.value, "sin 2θ");
      assertNear(Math.cos(2 * d.angle), cos2.value, "cos 2θ");
      assertNear(Math.tan(2 * d.angle), tan2.value, "tan 2θ");
      assertNear(byGiven.value, cos2.value, "alternate form");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "sum-identities",
    skill: "identify-information",
    make(r) {
      const awayFrom15 = (n) => n % 15 !== 0;
      // (i) sin A cos B ± cos A sin B
      const S1 = r.pick(SUM_TOTALS);
      const plus1 = r.chance();
      let A1;
      let B1;
      if (plus1) {
        A1 = r.int(10, S1 - 10);
        B1 = S1 - A1;
      } else {
        B1 = r.int(10, 40);
        A1 = S1 + B1;
      }
      if (!awayFrom15(A1) || !awayFrom15(B1)) reject("angles too nice");
      // (ii) cos A cos B ∓ sin A sin B
      const S2 = r.pick(SUM_TOTALS);
      const plus2 = r.chance();
      let A2;
      let B2;
      if (plus2) {
        A2 = r.int(10, S2 - 10);
        B2 = S2 - A2;
      } else {
        B2 = r.int(10, 40);
        A2 = S2 + B2;
      }
      if (!awayFrom15(A2) || !awayFrom15(B2)) reject("angles too nice");
      // (iii) double-angle forms
      const A3 = r.pick(HALF_ANGLES);
      const form3 = r.pick(["sin", "cos1", "cos2", "cos3"]);
      const value1 = exactAt("sin", S1);
      const value2 = exactAt("cos", S2);
      const value3 = form3 === "sin" ? exactAt("sin", 2 * A3) : exactAt("cos", 2 * A3);
      const text1 = `sin ${A1}° cos ${B1}° ${plus1 ? "+" : "−"} cos ${A1}° sin ${B1}°`;
      const text2 = `cos ${A2}° cos ${B2}° ${plus2 ? "−" : "+"} sin ${A2}° sin ${B2}°`;
      const text3 = {
        sin: `2 sin ${A3}° cos ${A3}°`,
        cos1: `cos²(${A3}°) − sin²(${A3}°)`,
        cos2: `1 − 2 sin²(${A3}°)`,
        cos3: `2 cos²(${A3}°) − 1`,
      }[form3];
      return problem({
        stem: "Each expression is the right side of an identity. Rewrite it as a single sine or cosine, then give its exact value.",
        parts: [
          part(`Find the exact value of ${text1}.`, ask.number("value =", value1.text)),
          part(`Find the exact value of ${text2}.`, ask.number("value =", value2.text)),
          part(`Find the exact value of ${text3}.`, ask.number("value =", value3.text)),
        ],
        solution: [
          `This is the ${plus1 ? "sum" : "difference"} identity for sine: sin(${A1}° ${plus1 ? "+" : "−"} ${B1}°) = sin ${S1}° = ${value1.text}.`,
          `This is the ${plus2 ? "sum" : "difference"} identity for cosine: cos(${A2}° ${plus2 ? "+" : "−"} ${B2}°) = cos ${S2}° = ${value2.text}.`,
          form3 === "sin"
            ? `This is the double-angle identity for sine: 2 sin A cos A = sin 2A, so the value is sin ${2 * A3}° = ${value3.text}.`
            : `This is a double-angle identity for cosine: it equals cos 2A, so the value is cos ${2 * A3}° = ${value3.text}.`,
        ],
        data: { A1, B1, plus1, S1, A2, B2, plus2, S2, A3, form3, value1, value2, value3 },
      });
    },
    verify({
      data: { A1, B1, plus1, A2, B2, plus2, A3, form3, value1, value2, value3 },
    }) {
      const s = (d) => Math.sin(d * RAD);
      const c = (d) => Math.cos(d * RAD);
      assertNear(
        plus1 ? s(A1) * c(B1) + c(A1) * s(B1) : s(A1) * c(B1) - c(A1) * s(B1),
        value1.value,
        "part a",
      );
      assertNear(
        plus2 ? c(A2) * c(B2) - s(A2) * s(B2) : c(A2) * c(B2) + s(A2) * s(B2),
        value2.value,
        "part b",
      );
      const direct = {
        sin: 2 * s(A3) * c(A3),
        cos1: c(A3) ** 2 - s(A3) ** 2,
        cos2: 1 - 2 * s(A3) ** 2,
        cos3: 2 * c(A3) ** 2 - 1,
      }[form3];
      assertNear(direct, value3.value, "part c");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "pythagorean-identity",
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
      const kinds = r.sample(Object.keys(CLAIMS), 3);
      const claims = kinds.map((kind, i) => {
        const entry = r.pick(CLAIMS[kind].filter((e) => e.truth === mask[i]));
        return entry;
      });
      return problem({
        stem: "Decide whether each statement is true for every θ and φ for which both sides are defined.",
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
      for (const c of claims) assert(sidesEqual(c) === c.truth, `claim: ${c.text}`);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "solving-with-identities",
    skill: "solve",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const square = fn === "sin" ? "cos" : "sin";
      const a = r.pick([1, 2, 4]);
      const pairs = rootPairs(([r1, r2]) => {
        const b = r1.add(r2).mul(a);
        const k = r1.mul(r2).mul(a);
        return isInteger(b) && isInteger(k) && b.n !== 0;
      });
      if (!pairs.length) reject("no pairs");
      const [r1, r2] = r.pick(pairs);
      const b = r1.add(r2).mul(a).n;
      const k = r1.mul(r2).mul(a).n;
      const c = -a - k;
      const equation = equationText([
        [a, `${square}²θ`],
        [b, `${fn} θ`],
        [c, ""],
      ]);
      const quadratic = equationText([
        [a, `${fn}²θ`],
        [-b, `${fn} θ`],
        [-(a + c), ""],
      ]);
      const solutions = anglesFor(fn, [r1, r2]);
      const wider = anglesFor(fn, [r1, r2], 4);
      const rootList = [r1, r2];
      const notes = rootList.map((root) =>
        reachable(root)
          ? `${fn} θ = ${root.toString()} gives θ = ${listText(anglesFor(fn, [root]))}.`
          : `${fn} θ = ${root.toString()} has no solution, because ${fn} θ is never ${root.value > 0 ? "greater than 1" : "less than −1"}.`,
      );
      return problem({
        stem: `Consider the equation ${equation} for 0 ≤ θ < 2π.`,
        parts: [
          part(
            `Replace ${square}²θ using ${square}²θ = 1 − ${fn}²θ, and solve the resulting quadratic equation for ${fn} θ. Include every root, even one that ${fn} θ can never reach.`,
            ask.set(`${fn} θ =`, [r1, r2]),
          ),
          part(
            "Find all solutions of the original equation with 0 ≤ θ < 2π.",
            ask.set("θ =", solutions.map(piText)),
          ),
          part(
            "How many solutions does the equation have with 0 ≤ θ < 4π?",
            ask.number("number of solutions =", wider.length),
          ),
        ],
        solution: [
          `Replacing ${square}²θ with 1 − ${fn}²θ gives ${a === 1 ? `1 − ${fn}²θ` : `${a}(1 − ${fn}²θ)`}${b === 0 ? "" : ` ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b) + " "}${fn} θ`}${c === 0 ? "" : ` ${c < 0 ? "−" : "+"} ${Math.abs(c)}`} = 0, which simplifies to ${quadratic}. This factors as ${factoredText(a, `${fn} θ`, r1, r2)} = 0, so ${fn} θ = ${r1.toString()} or ${fn} θ = ${r2.toString()}.`,
          notes.join(" ") + ` The solutions are θ = ${listText(solutions)}.`,
          `${solutions.length === 1 ? "There is 1 solution" : `There are ${solutions.length} solutions`} in each period of 2π, so there are ${wider.length} solutions with 0 ≤ θ < 4π.`,
        ],
        data: { fn, square, a, b, c, r1, r2, solutions, wider },
      });
    },
    verify({ data: { fn, square, a, b, c, solutions, wider } }) {
      const f = (t) =>
        a * (square === "cos" ? Math.cos(t) ** 2 : Math.sin(t) ** 2) +
        b * (fn === "sin" ? Math.sin(t) : Math.cos(t)) +
        c;
      const chosen = new Set(solutions.map((q) => `${q.n}/${q.d}`));
      for (const angle of SPECIAL) {
        const zero = Math.abs(f(angle.value * Math.PI)) < 1e-9;
        assert(
          zero === chosen.has(`${angle.n}/${angle.d}`),
          `solution check at ${piText(angle)}`,
        );
      }
      assert(solutions.length > 0, "has solutions");
      assert(wider.length === 2 * solutions.length, "doubled");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "solving-with-identities",
    skill: "apply-results",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const pairs = rootPairs(([r1, r2]) => {
        const p = r1.add(r2).mul(2);
        const k = r1.mul(r2).mul(2);
        return isInteger(p) && isInteger(k) && p.n !== 0;
      });
      if (!pairs.length) reject("no pairs");
      const [r1, r2] = r.pick(pairs);
      const sum2 = r1.add(r2).mul(2).n;
      const prod2 = r1.mul(r2).mul(2).n;
      // sin: cos 2θ = 1 − 2 sin²θ, so 2s² − p s − (1 + q) = 0; cos: 2c² + p c + (q − 1) = 0.
      const p = fn === "sin" ? sum2 : -sum2;
      const q = fn === "sin" ? -1 - prod2 : 1 + prod2;
      const equation = equationText([
        [1, "cos 2θ"],
        [p, `${fn} θ`],
        [q, ""],
      ]);
      const rewrite = fn === "sin" ? "cos 2θ = 1 − 2 sin²θ" : "cos 2θ = 2 cos²θ − 1";
      const quadratic = equationText([
        [2, `${fn}²θ`],
        [fn === "sin" ? -p : p, `${fn} θ`],
        [fn === "sin" ? -(1 + q) : q - 1, ""],
      ]);
      const solutions = anglesFor(fn, [r1, r2]);
      if (solutions.length < 2) reject("only one solution");
      const largest = solutions[solutions.length - 1];
      const notes = [r1, r2].map((root) =>
        reachable(root)
          ? `${fn} θ = ${root.toString()} gives θ = ${listText(anglesFor(fn, [root]))}.`
          : `${fn} θ = ${root.toString()} has no solution, because ${fn} θ is never ${root.value > 0 ? "greater than 1" : "less than −1"}.`,
      );
      return problem({
        stem: `Consider the equation ${equation} for 0 ≤ θ < 2π.`,
        parts: [
          part(
            `Use the identity ${rewrite} to write the equation as a quadratic equation in ${fn} θ, and solve it for ${fn} θ. Include every root, even one that ${fn} θ can never reach.`,
            ask.set(`${fn} θ =`, [r1, r2]),
          ),
          part(
            "Find all solutions with 0 ≤ θ < 2π.",
            ask.set("θ =", solutions.map(piText)),
          ),
          part(
            "What is the largest solution with 0 ≤ θ < 2π?",
            ask.number("θ =", piText(largest)),
          ),
        ],
        solution: [
          `Replace cos 2θ using ${rewrite}. The equation becomes ${quadratic}, which factors as ${factoredText(2, `${fn} θ`, r1, r2)} = 0. So ${fn} θ = ${r1.toString()} or ${fn} θ = ${r2.toString()}.`,
          notes.join(" ") + ` The solutions are θ = ${listText(solutions)}.`,
          `The largest of these is θ = ${piText(largest)}.`,
        ],
        data: { fn, p, q, r1, r2, solutions },
      });
    },
    verify({ data: { fn, p, q, solutions } }) {
      const f = (t) =>
        Math.cos(2 * t) + p * (fn === "sin" ? Math.sin(t) : Math.cos(t)) + q;
      const chosen = new Set(solutions.map((x) => `${x.n}/${x.d}`));
      for (const angle of SPECIAL) {
        const zero = Math.abs(f(angle.value * Math.PI)) < 1e-9;
        assert(
          zero === chosen.has(`${angle.n}/${angle.d}`),
          `solution check at ${piText(angle)}`,
        );
      }
      assert(solutions.length > 0, "has solutions");
    },
  },
];

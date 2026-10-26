// Typed-answer problems for Topic 3.11. Secant, cosecant, and cotangent are reciprocals of
// cosine, sine, and tangent, so every key here is checked against 1/Math.cos, 1/Math.sin,
// and 1/Math.tan. Where a function is undefined the answer is DNE.

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
  OFF_AXIS,
  SPECIAL,
  anglesWith,
  quadrantName,
  piTicks,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const PI = Math.PI;
const qv = (q) => q.n / q.d;
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const BASE = { sec: "cos", csc: "sin", cot: "tan" };
const RECIPROCAL_RANGE = "(−∞, −1] ∪ [1, ∞)";
const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
];
// The value of sec, csc, or cot at an angle, computed directly.
const reciprocal = (fn, x) =>
  fn === "sec" ? 1 / Math.cos(x) : fn === "csc" ? 1 / Math.sin(x) : 1 / Math.tan(x);
const list = (angles) => angles.map(piText).join(", ");
const windowText = (lo, hi, closed = true) =>
  `${piText(new Q(Math.round(lo * 2), 2))} ${closed ? "≤" : "<"} θ ${closed ? "≤" : "<"} ${piText(new Q(Math.round(hi * 2), 2))}`;

// Asymptotes of sec θ are at π/2 + kπ; those of csc θ and cot θ are at kπ.
const asymptoteOffset = (fn) => (fn === "sec" ? 0.5 : 0);

// Counts the points of lo·π ≤ θ ≤ hi·π where fn θ meets a level, along the curve so the jumps at
// asymptotes are never counted.
function crossings(fn, level, lo, hi) {
  let count = 0;
  const steps = 40000;
  let prev = null;
  for (let i = 0; i <= steps; i++) {
    const x = (lo + ((hi - lo) * i) / steps) * PI;
    const y = reciprocal(fn, x) - level;
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
    concept: "secant-and-cosecant",
    skill: "identify-information",
    make(r) {
      const fns = r.shuffle(["sec", "csc", "cot"]);
      const rows = fns.map((fn, i) => {
        const pool = i === 0 && r.chance() ? SPECIAL : OFF_AXIS;
        const angle = r.pick(pool);
        return { fn, angle, value: exact(fn, angle) };
      });
      return problem({
        stem: "Find each exact value. Write DNE if the value does not exist.",
        parts: rows.map(({ fn, angle, value }) =>
          part(
            `Find ${fn}(${piText(angle)}).`,
            ask.limit(`${fn}(${piText(angle)}) =`, value.defined ? value.text : "DNE"),
          ),
        ),
        solution: rows.map(({ fn, angle, value }) => {
          const base = exact(BASE[fn], angle);
          return value.defined
            ? `${BASE[fn]}(${piText(angle)}) = ${base.text}, so ${fn}(${piText(angle)}) = 1/(${base.text}) = ${value.text}.`
            : `${BASE[fn]}(${piText(angle)}) = ${base.text}, and a reciprocal of 0 does not exist, so ${fn}(${piText(angle)}) is DNE.`;
        }),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { fn, angle, value } of rows) {
        const direct = reciprocal(fn, radians(angle));
        if (value.defined) assertNear(value.value, direct, `${fn} value`);
        else
          assert(!Number.isFinite(direct) || Math.abs(direct) > 1e12, `${fn} undefined`);
      }
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "secant-and-cosecant",
    skill: "construct-representations",
    make(r) {
      const [a0, b0, h] = r.pick(TRIPLES);
      const [a, b] = r.chance() ? [a0, b0] : [b0, a0];
      const ss = r.sign();
      const cs = r.sign();
      const s = new Q(ss * a, h);
      const c = new Q(cs * b, h);
      const sec = new Q(h, cs * b);
      const csc = new Q(h, ss * a);
      const cot = new Q(cs * b, ss * a);
      return problem({
        stem: `An angle θ in standard position has sin θ = ${s.toString()} and cos θ = ${c.toString()}.`,
        parts: [
          part("Find sec θ.", ask.number("sec θ =", sec)),
          part("Find csc θ.", ask.number("csc θ =", csc)),
          part("Find cot θ.", ask.number("cot θ =", cot)),
        ],
        solution: [
          `sec θ is the reciprocal of cos θ: 1/(${c.toString()}) = ${sec.toString()}.`,
          `csc θ is the reciprocal of sin θ: 1/(${s.toString()}) = ${csc.toString()}.`,
          `cot θ = cos θ / sin θ = (${c.toString()})/(${s.toString()}) = ${cot.toString()}.`,
        ],
        data: { s, c, sec, csc, cot },
      });
    },
    verify({ data: { s, c, sec, csc, cot } }) {
      assertNear(qv(s) ** 2 + qv(c) ** 2, 1, "unit circle");
      const x = Math.atan2(qv(s), qv(c));
      assertNear(qv(sec), 1 / Math.cos(x), "sec");
      assertNear(qv(csc), 1 / Math.sin(x), "csc");
      assertNear(qv(cot), 1 / Math.tan(x), "cot");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "secant-and-cosecant",
    skill: "describe",
    make(r) {
      const [fnA, fnB, fnC] = r.shuffle(["sec", "csc", "cot"]);
      const lo = r.pick([-2, -1.5, -1, -0.5, 0, 0.5]);
      const hi = lo + r.pick([2, 2.5, 3, 3.5]);
      let asymptotes = 0;
      let zeros = 0;
      for (let k = -8; k <= 10; k++) {
        const a = k + asymptoteOffset(fnA);
        if (a > lo + 1e-9 && a < hi - 1e-9) asymptotes++;
        if (fnC === "cot") {
          const z = k + 0.5;
          if (z >= lo - 1e-9 && z <= hi + 1e-9) zeros++;
        }
      }
      const range = fnB === "cot" ? "(−∞, ∞)" : RECIPROCAL_RANGE;
      const asymptoteList = [];
      const zeroList = [];
      for (let k = -8; k <= 10; k++) {
        const a = k + asymptoteOffset(fnA);
        if (a > lo + 1e-9 && a < hi - 1e-9)
          asymptoteList.push(piText(new Q(Math.round(a * 2), 2)));
        const z = k + 0.5;
        if (fnC === "cot" && z >= lo - 1e-9 && z <= hi + 1e-9)
          zeroList.push(piText(new Q(Math.round(z * 2), 2)));
      }
      return problem({
        stem: "Use what you know about the graphs of the reciprocal trigonometric functions.",
        parts: [
          part(
            `How many vertical asymptotes does the graph of y = ${fnA} θ have for ${windowText(lo, hi, false)}?`,
            ask.number("Asymptotes:", asymptotes),
          ),
          part(
            `What is the range of y = ${fnB} θ? Use interval notation.`,
            ask.interval("Range:", range),
          ),
          part(
            `How many zeros does ${fnC} θ have for ${windowText(lo, hi)}?`,
            ask.number("Zeros:", zeros),
          ),
        ],
        solution: [
          `${fnA} θ is undefined where ${BASE[fnA]} θ = 0, at θ = ${fnA === "sec" ? "π/2 + kπ" : "kπ"}. ${asymptoteList.length === 1 ? "The one in this interval is" : "Those in this interval are"} ${asymptoteList.join(", ") || "none"}, so there ${asymptotes === 1 ? "is 1 asymptote" : `are ${asymptotes} asymptotes`}.`,
          fnB === "cot"
            ? "Cotangent takes every real value, so its range is (−∞, ∞)."
            : `${fnB} θ is the reciprocal of ${BASE[fnB]} θ, and ${BASE[fnB]} θ is between −1 and 1, so the reciprocal is at most −1 or at least 1. The range is ${RECIPROCAL_RANGE}.`,
          fnC === "cot"
            ? `cot θ = cos θ / sin θ is 0 where cos θ = 0, at θ = π/2 + kπ. ${zeroList.length === 1 ? "The one in this interval is" : "Those in this interval are"} ${zeroList.join(", ") || "none"}, so there ${zeros === 1 ? "is 1 zero" : `are ${zeros} zeros`}.`
            : `${fnC} θ is a reciprocal of ${BASE[fnC]} θ, and 1 divided by a number is never 0, so ${fnC} θ has no zeros.`,
        ],
        data: { fnA, fnB, fnC, lo, hi, asymptotes, zeros },
      });
    },
    verify({ data: { fnA, fnB, fnC, lo, hi, asymptotes, zeros } }) {
      let a = 0;
      for (let i = -20; i <= 20; i++) {
        const x = (i + asymptoteOffset(fnA)) * PI;
        assert(
          Math.abs(Math[BASE[fnA] === "tan" ? "sin" : BASE[fnA]](x)) < 1e-9,
          "asymptote location",
        );
        if (x > lo * PI + 1e-9 && x < hi * PI - 1e-9) a++;
      }
      assert(a === asymptotes, "asymptote count");
      if (fnB !== "cot")
        for (let x = 0.01; x < 2 * PI; x += 0.0173)
          assert(Math.abs(reciprocal(fnB, x)) >= 1 - 1e-9, "range");
      if (fnC === "cot") {
        let z = 0;
        for (let i = -20; i <= 20; i++) {
          const x = (i + 0.5) * PI;
          if (x >= lo * PI - 1e-9 && x <= hi * PI + 1e-9) z++;
        }
        assert(z === zeros, "zeros");
      } else assert(zeros === 0, "no zeros");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "cotangent",
    skill: "identify-information",
    make(r) {
      const [a0, b0] = r.pick(TRIPLES);
      const tan = new Q(r.sign() * a0, b0);
      const axis = r.pick([
        new Q(1, 2),
        new Q(3, 2),
        new Q(0),
        new Q(1),
        new Q(2),
        new Q(-1, 2),
      ]);
      const onAxis = exact("cot", axis);
      const angle = r.pick(OFF_AXIS);
      const off = exact("cot", angle);
      return problem({
        stem: "Cotangent is the reciprocal of tangent: cot θ = cos θ / sin θ.",
        parts: [
          part(
            `If tan θ = ${tan.toString()}, find cot θ.`,
            ask.number("cot θ =", new Q(tan.d, tan.n)),
          ),
          part(
            `Find cot(${piText(axis)}). Write DNE if it does not exist.`,
            ask.limit(`cot(${piText(axis)}) =`, onAxis.defined ? onAxis.text : "DNE"),
          ),
          part(
            `Find cot(${piText(angle)}).`,
            ask.number(`cot(${piText(angle)}) =`, off.text),
          ),
        ],
        solution: [
          `cot θ = 1/tan θ = 1/(${tan.toString()}) = ${new Q(tan.d, tan.n).toString()}.`,
          onAxis.defined
            ? `At θ = ${piText(axis)}, cos θ = 0 and sin θ = ${exact("sin", axis).text}, so cot θ = 0/(${exact("sin", axis).text}) = 0.`
            : `At θ = ${piText(axis)}, sin θ = 0, so cot θ = cos θ / sin θ has a zero in the denominator and does not exist.`,
          `cos(${piText(angle)}) = ${exact("cos", angle).text} and sin(${piText(angle)}) = ${exact("sin", angle).text}, so cot(${piText(angle)}) = ${off.text}.`,
        ],
        data: { tan, axis, onAxis, angle, off },
      });
    },
    verify({ data: { tan, axis, onAxis, angle, off } }) {
      assertNear(qv(new Q(tan.d, tan.n)), 1 / qv(tan), "reciprocal");
      const x = radians(axis);
      if (onAxis.defined) assertNear(Math.cos(x) / Math.sin(x), 0, "zero");
      else assert(Math.abs(Math.sin(x)) < 1e-9, "sin is 0");
      assertNear(
        off.value,
        Math.cos(radians(angle)) / Math.sin(radians(angle)),
        "off axis",
      );
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "secant-and-cosecant",
    skill: "solve",
    make(r) {
      const rows = r.shuffle(["sec", "csc", "cot"]).map((fn) => {
        const angle = r.pick(OFF_AXIS);
        const value = exact(fn, angle);
        const base = exact(BASE[fn], angle);
        return {
          fn,
          value,
          base,
          solutions: anglesWith(BASE[fn], base.value, 0, 2),
        };
      });
      return problem({
        stem: "Solve each equation for 0 ≤ θ < 2π. Give exact answers.",
        parts: rows.map(({ fn, value, solutions }) =>
          part(`Solve ${fn} θ = ${value.text}.`, ask.set("θ =", solutions.map(piText))),
        ),
        solution: rows.map(
          ({ fn, value, base, solutions }) =>
            `${fn} θ = ${value.text} means ${BASE[fn]} θ = 1/(${value.text}) = ${base.text}. On the unit circle, ${BASE[fn]} θ = ${base.text} at θ = ${solutions.map(piText).join(" and ")}.`,
        ),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { fn, value, solutions } of rows) {
        assert(solutions.length === 2, "two solutions");
        for (const q of solutions) {
          assertNear(reciprocal(fn, radians(q)), value.value, `${fn} solution`);
          assert(qv(q) >= 0 && qv(q) < 2, "window");
        }
      }
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "cotangent",
    skill: "identify-information",
    make(r) {
      const base = r.pick(OFF_AXIS.filter((q) => qv(q) < 1));
      const at = base.add(r.pick([-1, 0, 1]));
      const y = exact("cot", at);
      const next = new Q(Math.floor(qv(at)) + 1);
      const lo = r.pick([-2, -1.5, -1, -0.5]);
      const hi = lo + r.pick([2, 2.5, 3, 3.5]);
      const level = r.pick([0, 1, -1, 2, -2, 3, -3]);
      const count = crossings("cot", level, lo, hi);
      return problem({
        stem: "The graph of y = cot θ is shown for −2π ≤ θ ≤ 2π. The dashed lines are its vertical asymptotes.",
        blocks: [
          graph({
            caption: "The graph of y = cot θ with the point A marked",
            alt: `Branches of the cotangent function that fall from the top of the window to the bottom between dashed vertical asymptotes at θ = −2π, −π, 0, π, and 2π. The point A is marked on the curve at θ = ${piText(at)}.`,
            window: { x: [-2 * PI - 0.3, 2 * PI + 0.3], y: [-4, 4] },
            ticks: { x: piTicks(-2, 2, 2), y: 1 },
            axisLabels: { x: "θ", y: "y" },
            functions: [{ expr: "cot(x)" }],
            asymptotes: [-2, -1, 0, 1, 2].map((u) => ({ x: u * PI })),
            points: [{ at: [radians(at), y.value], label: "A", position: "ne" }],
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
            `How many solutions does cot θ = ${sg(level)} have for ${windowText(lo, hi)}?`,
            ask.number("Solutions:", count),
          ),
        ],
        solution: [
          `cot(${piText(at)}) = cos(${piText(at)}) / sin(${piText(at)}) = ${y.text}, so A = (${piText(at)}, ${y.text}).`,
          `The asymptotes are at θ = kπ, where sin θ = 0. The first one to the right of ${piText(at)} is θ = ${piText(next)}.`,
          level === 0
            ? `cot θ = 0 where cos θ = 0, at θ = π/2 + kπ. In ${windowText(lo, hi)} there ${count === 1 ? "is 1 such value" : `are ${count} such values`}.`
            : `Between consecutive asymptotes the graph falls through every y-value exactly once. In ${windowText(lo, hi)}, the line y = ${sg(level)} meets the graph ${count} ${count === 1 ? "time" : "times"}.`,
        ],
        data: { at, y, next, lo, hi, level, count },
      });
    },
    verify({ data: { at, y, next, level, count, lo, hi } }) {
      assertNear(y.value, 1 / Math.tan(radians(at)), "y");
      assert(qv(next) > qv(at) && qv(next) - qv(at) <= 1, "next asymptote");
      assertNear(Math.sin(radians(next)), 0, "asymptote");
      assert(crossings("cot", level, lo, hi) === count, "count");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "secant-and-cosecant",
    skill: "construct-representations",
    make(r) {
      const fn = r.pick(["sec", "csc"]);
      const base = BASE[fn];
      const angle = r.pick(OFF_AXIS).add(r.pick([-2, 0]));
      const y = exact(fn, angle);
      const asymptotes = fn === "sec" ? 4 : 3;
      const ticks = (fn === "sec" ? [-1.5, -0.5, 0.5, 1.5] : [-2, -1, 0, 1, 2]).map(
        (u) => ({
          x: u * PI,
        }),
      );
      const names = ["y = sec θ", "y = csc θ"];
      return problem({
        stem: `The solid curve is the graph of a reciprocal trigonometric function for −2π ≤ θ ≤ 2π. The dashed curve is y = ${base} θ. Point A is on the solid curve at θ = ${piText(angle)}.`,
        blocks: [
          graph({
            caption: `A reciprocal function (solid) and y = ${base} θ (dashed), with the point A marked`,
            alt: `Branches that open upward from y = 1 and downward from y = −1, separated by dashed vertical asymptotes, with the wave y = ${base} θ drawn dashed between them. The point A is marked on one branch at θ = ${piText(angle)}.`,
            window: { x: [-2 * PI - 0.3, 2 * PI + 0.3], y: [-4, 4] },
            ticks: { x: piTicks(-2, 2, 2), y: 1 },
            axisLabels: { x: "θ", y: "y" },
            functions: [
              { expr: `${base}(x)`, dashed: true, color: 4 },
              { expr: `${fn}(x)` },
            ],
            asymptotes: ticks,
            points: [
              {
                at: [radians(angle), y.value],
                label: "A",
                position: y.value > 0 ? "ne" : "se",
              },
            ],
          }),
        ],
        parts: [
          part(
            "Which function is graphed with the solid curve?",
            ask.choice("The solid curve is", names, `y = ${fn} θ`),
          ),
          part(
            `What is the y-coordinate of A? Write an exact value.`,
            ask.number("y =", y.text),
          ),
          part(
            "How many vertical asymptotes does the solid curve have for −2π < θ < 2π?",
            ask.number("Asymptotes:", asymptotes),
          ),
        ],
        solution: [
          `The solid curve has asymptotes where the dashed curve y = ${base} θ is 0, and it touches the dashed curve at its highest and lowest points. Since the dashed curve is ${base}, the solid curve is the reciprocal, ${fn} θ.`,
          `${base}(${piText(angle)}) = ${exact(base, angle).text}, so ${fn}(${piText(angle)}) = 1/(${exact(base, angle).text}) = ${y.text}, and A = (${piText(angle)}, ${y.text}).`,
          `The asymptotes are where ${base} θ = 0: ${fn === "sec" ? "−3π/2, −π/2, π/2, 3π/2" : "−π, 0, π"}. That is ${asymptotes} asymptotes.`,
        ],
        data: { fn, base, angle, y, asymptotes },
      });
    },
    verify({ data: { fn, angle, y, asymptotes } }) {
      assertNear(y.value, reciprocal(fn, radians(angle)), "y");
      assert(Math.abs(y.value) >= 1 - 1e-9 && Math.abs(y.value) < 3.5, "visible");
      let n = 0;
      for (let k = -20; k <= 20; k++) {
        const u = k + asymptoteOffset(fn);
        if (u > -2 + 1e-9 && u < 2 - 1e-9) n++;
      }
      assert(n === asymptotes, "asymptotes");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "cotangent",
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
        .shuffle(["range", "asymptote", "monotone", "notation", "value"])
        .slice(0, 3);
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
    concept: "cotangent",
    skill: "apply-results",
    make(r) {
      const height = r.pick([6, 9, 12, 15, 18, 24, 30]);
      const angle = r.pick([new Q(1, 6), new Q(1, 4), new Q(1, 3)]);
      const distance = scaled("cot", angle, height);
      const shadow = r.chance();
      const intro = shadow
        ? `A vertical pole is ${height} meters tall. When the sun's angle of elevation is θ, the pole casts a shadow of length d = ${height} cot θ meters on level ground.`
        : `A lookout stands on a tower ${height} meters tall. The angle of depression to a boat on the water is θ, and the boat is d = ${height} cot θ meters from the base of the tower.`;
      return problem({
        stem: intro,
        parts: [
          part(
            `Find d when θ = ${piText(angle)}. Write an exact value.`,
            ask.number("d =", distance.text, { unit: "meters" }),
          ),
          part(
            `Find the angle θ, with 0 < θ < π/2, when d = ${distance.text} meters.`,
            ask.number("θ =", piText(angle)),
          ),
          part(
            "As θ gets closer to 0 from the positive side, what happens to cot θ? Write ∞ or −∞.",
            ask.limit("cot θ →", "∞"),
          ),
        ],
        solution: [
          `cot(${piText(angle)}) = ${exact("cot", angle).text}, so d = ${height}(${exact("cot", angle).text}) = ${distance.text} meters.`,
          `${distance.text} = ${height} cot θ gives cot θ = ${exact("cot", angle).text}, so tan θ = ${exact("tan", angle).text} and θ = ${piText(angle)}.`,
          shadow
            ? "As the sun gets lower, sin θ approaches 0 while cos θ approaches 1, so cot θ = cos θ / sin θ grows without bound, and the shadow gets longer and longer."
            : "As the line of sight gets closer to horizontal, sin θ approaches 0 while cos θ approaches 1, so cot θ = cos θ / sin θ grows without bound, and the boat is farther and farther away.",
        ],
        data: { height, angle, distance },
      });
    },
    verify({ data: { height, angle, distance } }) {
      assertNear(distance.value, height / Math.tan(radians(angle)), "distance");
      assert(1 / Math.tan(0.0001) > 1e3, "grows");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "secant-and-cosecant",
    skill: "apply-results",
    make(r) {
      const [a0, b0, h] = r.pick(TRIPLES);
      const [a, b] = r.chance() ? [a0, b0] : [b0, a0];
      const quadrant = r.pick(["I", "II", "III", "IV"]);
      const ss = quadrant === "I" || quadrant === "II" ? 1 : -1;
      const cs = quadrant === "I" || quadrant === "IV" ? 1 : -1;
      const given = r.pick(["sin", "cos", "tan"]);
      const sinQ = new Q(ss * a, h);
      const cosQ = new Q(cs * b, h);
      const tanQ = sinQ.div(cosQ);
      const givenQ = given === "sin" ? sinQ : given === "cos" ? cosQ : tanQ;
      const csc = new Q(h, ss * a);
      const sec = new Q(h, cs * b);
      const cot = new Q(cs * b, ss * a);
      return problem({
        stem: `For an angle θ in standard position, ${given} θ = ${givenQ.toString()} and the terminal ray is in quadrant ${quadrant}.`,
        parts: [
          part("Find csc θ.", ask.number("csc θ =", csc)),
          part("Find sec θ.", ask.number("sec θ =", sec)),
          part("Find cot θ.", ask.number("cot θ =", cot)),
        ],
        solution: [
          `A reference triangle has legs ${a} and ${b} and hypotenuse ${h}. In quadrant ${quadrant}, sine is ${ss > 0 ? "positive" : "negative"} and cosine is ${cs > 0 ? "positive" : "negative"}, so sin θ = ${sinQ.toString()}, cos θ = ${cosQ.toString()}, and tan θ = ${tanQ.toString()}.`,
          `csc θ = 1/sin θ = 1/(${sinQ.toString()}) = ${csc.toString()}, and sec θ = 1/cos θ = 1/(${cosQ.toString()}) = ${sec.toString()}.`,
          `cot θ = cos θ / sin θ = 1/tan θ = ${cot.toString()}.`,
        ],
        data: { quadrant, sinQ, cosQ, csc, sec, cot },
      });
    },
    verify({ data: { quadrant, sinQ, cosQ, csc, sec, cot } }) {
      assertNear(qv(sinQ) ** 2 + qv(cosQ) ** 2, 1, "unit circle");
      const x = Math.atan2(qv(sinQ), qv(cosQ));
      const q = quadrantName(new Q(Math.round(((x / PI + 2) % 2) * 12), 12));
      assert(q === quadrant, "quadrant");
      assertNear(qv(csc), 1 / Math.sin(x), "csc");
      assertNear(qv(sec), 1 / Math.cos(x), "sec");
      assertNear(qv(cot), 1 / Math.tan(x), "cot");
    },
  },
];

// One true or false statement about secant, cosecant, and cotangent.
function claim(r, kind, truth) {
  if (kind === "range") {
    const fn = r.pick(["sec", "csc"]);
    const value = r.pick([0.5, 0, -0.25, 0.9, -0.75]);
    if (truth) {
      const big = r.pick([2, -2, 3.5, -4]);
      return {
        truth,
        statement: `The equation ${fn} θ = ${sg(big)} has a solution.`,
        reason: `${fn} θ is the reciprocal of ${BASE[fn]} θ, so ${BASE[fn]} θ = 1/(${sg(big)}), which is between −1 and 1. That has solutions, so the statement is true.`,
        check: () => Math.abs(1 / big) <= 1,
      };
    }
    return {
      truth,
      statement: `The equation ${fn} θ = ${sg(value)} has a solution.`,
      reason:
        value === 0
          ? `${fn} θ is a reciprocal, and a reciprocal is never 0, so the statement is false.`
          : `${fn} θ = ${sg(value)} would need ${BASE[fn]} θ = 1/(${sg(value)}) = ${sg(round(1 / value, 3))}, which is outside −1 to 1. The range of ${fn} is (−∞, −1] ∪ [1, ∞), so the statement is false.`,
      check: () => value !== 0 && Math.abs(1 / value) <= 1,
    };
  }
  if (kind === "asymptote") {
    const fn = r.pick(["sec", "csc", "cot"]);
    const k = r.pick([-2, -1, 0, 1, 2]);
    const rightUnits = fn === "sec" ? k + 0.5 : k;
    const wrongUnits = fn === "sec" ? k : k + 0.5;
    const shown = truth ? rightUnits : wrongUnits;
    const text = piText(new Q(Math.round(shown * 2), 2));
    return {
      truth,
      statement: `The graph of y = ${fn} θ has a vertical asymptote at θ = ${text}.`,
      reason: `${fn} θ is undefined where ${BASE[fn] === "tan" ? "sin" : BASE[fn]} θ = 0. ${BASE[fn] === "tan" ? "sin" : BASE[fn]}(${text}) ${truth ? "= 0, so there is an asymptote and the statement is true." : "is not 0, so there is no asymptote there and the statement is false."}`,
      check: () =>
        Math.abs(Math[BASE[fn] === "tan" ? "sin" : BASE[fn]](shown * PI)) < 1e-9,
    };
  }
  if (kind === "monotone") {
    const word = truth ? "decreasing" : "increasing";
    return {
      truth,
      statement: `On every interval between two consecutive vertical asymptotes, the function y = cot θ is ${word}.`,
      reason: `Between consecutive asymptotes the graph of cotangent falls from the top of the window to the bottom, so it is decreasing. ${truth ? "The statement is true." : "It is not increasing, so the statement is false."}`,
      check: () =>
        (1 / Math.tan(1.2) < 1 / Math.tan(1.0) ? "decreasing" : "increasing") === word,
    };
  }
  if (kind === "notation") {
    return truth
      ? {
          truth,
          statement:
            "sec 0 = 1, but arccos 0 = π/2, so sec x and cos⁻¹x are different functions.",
          reason:
            "sec 0 = 1/cos 0 = 1, while arccos 0 = π/2 because cos(π/2) = 0. The notation cos⁻¹ means the inverse function, not the reciprocal, so the statement is true.",
          check: () =>
            Math.abs(1 / Math.cos(0) - 1) < 1e-9 &&
            Math.abs(Math.acos(0) - PI / 2) < 1e-9,
        }
      : {
          truth,
          statement: "cos⁻¹x and sec x are two names for the same function.",
          reason:
            "cos⁻¹x means arccos x, the inverse function, and sec x = 1/cos x is the reciprocal. For example sec 0 = 1 but arccos 0 = π/2. The statement is false.",
          check: () => Math.abs(1 / Math.cos(0) - Math.acos(0)) < 1e-9,
        };
  }
  // value
  const angle = r.pick(OFF_AXIS);
  const fn = r.pick(["sec", "csc", "cot"]);
  const right = exact(fn, angle);
  const other = exact(BASE[fn], angle);
  const shown = truth ? right.text : other.text;
  return {
    truth,
    statement: `${fn}(${piText(angle)}) = ${shown}.`,
    reason: `${BASE[fn]}(${piText(angle)}) = ${other.text}, so ${fn}(${piText(angle)}) = ${right.text}. ${truth ? "The statement is true." : `The value ${shown} is ${BASE[fn]}(${piText(angle)}), not the reciprocal, so the statement is false.`}`,
    check: () => shown === right.text,
  };
}

function round(x, places) {
  return Math.round(x * 10 ** places) / 10 ** places;
}

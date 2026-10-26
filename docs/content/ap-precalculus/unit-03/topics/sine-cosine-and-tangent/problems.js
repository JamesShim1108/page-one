// Typed-answer problems for Topic 3.2. Each template draws new numbers for every
// variant. verify() recomputes every angle, arc, and trigonometric value with Math.sin,
// Math.cos, and Math.tan, so a slip in a key and a slip in the stem cannot both survive.

import {
  ask,
  part,
  problem,
  graph,
  num,
  Q,
  piText,
  radians,
  fromDegrees,
  reduce,
  exact,
  sinExact,
  cosExact,
  tanExact,
  unitPointText,
  SIXTHS,
  FOURTHS,
  SPECIAL,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
];
const RATIONAL_POINTS = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
];
const qText = (q) => (q instanceof Q ? q.toString() : num(q));
const AXES = (q) => q.n === 0 || q.n * 2 === q.d || q.n === q.d || q.n * 2 === q.d * 3;
const NON_AXIS = SPECIAL.filter((q) => !AXES(q));
const quadrantOf = (angle) => {
  const a = reduce(angle);
  if (a.n * 2 < a.d) return "I";
  if (a.n < a.d) return "II";
  if (a.n * 2 < a.d * 3) return "III";
  return "IV";
};
// "The terminal ray of 23π/6, which is also the terminal ray of 11π/6," (or the short form).
const ray = (angle) =>
  reduce(angle).toString() === angle.toString()
    ? `The terminal ray of ${piText(angle)}`
    : `The terminal ray of ${piText(angle)}, which is also the terminal ray of ${piText(reduce(angle))},`;
const squared = (v) => (v < 0 ? `(${num(v)})²` : `${num(v)}²`);
const revText = (k) => (k === 1 ? "one revolution" : `${k} revolutions`);

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "standard-position-and-radians",
    skill: "solve",
    make(r) {
      const deg = r.pick([
        30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330, 390, 480,
      ]);
      const rad = fromDegrees(deg);
      const toDeg = r.pick(SPECIAL.filter((q) => q.n !== 0 && q.n !== q.d).map((q) => q));
      const degAnswer = (toDeg.n * 180) / toDeg.d;
      const radius = r.pick([4, 6, 8, 10, 12]);
      const arcAngle = r.pick(
        [60, 90, 120, 150, 210, 240, 270, 300].filter((d) => d !== deg),
      );
      const arcQ = fromDegrees(arcAngle);
      const arc = new Q(radius * arcQ.n, arcQ.d);
      return problem({
        stem: "Angles are measured in radians, and a full revolution is 2π radians.",
        parts: [
          part(`Convert ${deg}° to radians.`, ask.number("Radians:", piText(rad))),
          part(
            `Convert ${piText(toDeg)} radians to degrees.`,
            ask.number("Degrees:", degAnswer, { unit: "°" }),
          ),
          part(
            `A circle has radius ${radius} centimeters. Find the length of the arc subtended by a central angle of ${arcAngle}°.`,
            ask.number("Arc length:", piText(arc), { unit: "centimeters" }),
          ),
        ],
        solution: [
          `${deg}° = ${deg}(π/180) = ${piText(rad)} radians.`,
          `${piText(toDeg)} radians = (${piText(toDeg)})(180/π) = ${degAnswer}°.`,
          `${arcAngle}° = ${piText(arcQ)} radians. The arc length is s = rθ = ${radius}(${piText(arcQ)}) = ${piText(arc)} centimeters.`,
        ],
        data: { deg, rad, toDeg, degAnswer, radius, arcQ, arc },
      });
    },
    verify({ data: { deg, rad, toDeg, degAnswer, radius, arcQ, arc } }) {
      assertNear(radians(rad), (deg * Math.PI) / 180, "degrees to radians");
      assertNear(radians(toDeg), (degAnswer * Math.PI) / 180, "radians to degrees");
      assertNear(radians(arc), radius * radians(arcQ), "arc length");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "standard-position-and-radians",
    skill: "identify-information",
    make(r) {
      const bases = [...SIXTHS, ...FOURTHS].filter((q) => q.n !== 0);
      const base1 = r.pick(bases);
      const k1 = r.int(1, 3);
      const big = base1.add(k1 * 2);
      const base2 = r.pick(
        bases.filter((q) => `${q.n}/${q.d}` !== `${base1.n}/${base1.d}`),
      );
      const k2 = r.int(1, 2);
      const small = base2.sub(k2 * 2);
      const phi = r.pick(bases.filter((q) => q.n < q.d * 2));
      const negPhi = phi.sub(2);
      return problem({
        stem: "Angles in standard position that share a terminal ray differ by an integer number of revolutions.",
        parts: [
          part(
            `Find the angle with measure from 0 to 2π that has the same terminal ray as ${piText(big)}.`,
            ask.number("Angle:", piText(reduce(big))),
          ),
          part(
            `Find the angle with measure from 0 to 2π that has the same terminal ray as ${piText(small)}.`,
            ask.number("Angle:", piText(reduce(small))),
          ),
          part(
            `Find the angle with measure from −2π to 0 that has the same terminal ray as ${piText(phi)}.`,
            ask.number("Angle:", piText(negPhi)),
          ),
        ],
        solution: [
          `Subtract ${revText(k1)}, which is ${k1 === 1 ? "2π" : `${k1}(2π) = ${k1 * 2}π`}: ${piText(big)} − ${k1 * 2}π = ${piText(base1)}.`,
          `Add ${revText(k2)}, which is ${k2 === 1 ? "2π" : `${k2}(2π) = ${k2 * 2}π`}: ${piText(small)} + ${k2 * 2}π = ${piText(base2)}.`,
          `Subtract one revolution: ${piText(phi)} − 2π = ${piText(negPhi)}.`,
        ],
        data: { base1, k1, big, base2, k2, small, phi, negPhi },
      });
    },
    verify({ data: { base1, big, base2, small, phi, negPhi } }) {
      assertNear(radians(reduce(big)), radians(base1), "reduced large angle");
      assertNear(radians(reduce(small)), radians(base2), "reduced negative angle");
      assert(radians(negPhi) < 0 && radians(negPhi) >= -2 * Math.PI, "range");
      assertNear(Math.sin(radians(phi)), Math.sin(radians(negPhi)), "same terminal ray");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "sine-cosine-tangent",
    skill: "identify-information",
    make(r) {
      const [p, q, h] = r.pick(TRIPLES);
      const swap = r.chance();
      const a = swap ? q : p;
      const b = swap ? p : q;
      const x = r.sign() * a;
      const y = r.sign() * b;
      const span = Math.max(Math.abs(x), Math.abs(y)) + 3;
      return problem({
        stem: `The terminal ray of an angle θ in standard position passes through the point P(${num(x)}, ${num(y)}).`,
        blocks: [
          graph({
            caption: `The terminal ray of θ through P(${num(x)}, ${num(y)})`,
            alt: `A ray from the origin to the point (${num(x)}, ${num(y)}).`,
            window: { x: [-span, span], y: [-span, span] },
            ticks: { x: span > 12 ? 5 : 1, y: span > 12 ? 5 : 1 },
            segments: [{ from: [0, 0], to: [x, y] }],
            points: [{ at: [x, y], label: "P" }],
          }),
        ],
        parts: [
          part("Find sin θ.", ask.number("sin θ =", new Q(y, h))),
          part("Find cos θ.", ask.number("cos θ =", new Q(x, h))),
          part("Find tan θ.", ask.number("tan θ =", new Q(y, x))),
        ],
        solution: [
          `The distance from the origin to P is √(${squared(x)} + ${squared(y)}) = √${x * x + y * y} = ${h}. The sine is the y-coordinate over this distance: sin θ = ${num(y)}/${h}${new Q(y, h).toString() === `${num(y)}/${h}` ? "" : ` = ${new Q(y, h).toString()}`}.`,
          `cos θ = ${num(x)}/${h}${new Q(x, h).toString() === `${num(x)}/${h}` ? "" : ` = ${new Q(x, h).toString()}`}.`,
          `tan θ is the slope of the terminal ray: ${num(y)}/${num(x)}${new Q(y, x).toString() === `${num(y)}/${num(x)}` ? "" : ` = ${new Q(y, x).toString()}`}. It also equals sin θ / cos θ.`,
        ],
        data: { x, y, h },
      });
    },
    verify({ data: { x, y, h } }) {
      assert(x * x + y * y === h * h, "distance");
      const theta = Math.atan2(y, x);
      assertNear(Math.sin(theta), y / h, "sin");
      assertNear(Math.cos(theta), x / h, "cos");
      assertNear(Math.tan(theta), y / x, "tan");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "sine-cosine-tangent",
    skill: "describe",
    make(r) {
      const base = r.pick(NON_AXIS);
      const shift = r.pick([-2, 0, 0, 2, 4]);
      const angle = base.add(shift);
      const quadrant = quadrantOf(angle);
      const sinSign = quadrant === "I" || quadrant === "II" ? "positive" : "negative";
      const cosSign = quadrant === "I" || quadrant === "IV" ? "positive" : "negative";
      const tanSign = quadrant === "I" || quadrant === "III" ? "positive" : "negative";
      const ask2 = r.pick(["cos", "tan"]);
      const second = ask2 === "cos" ? cosSign : tanSign;
      return problem({
        stem: `An angle θ = ${piText(angle)} radians is in standard position.`,
        parts: [
          part(
            "In which quadrant does the terminal ray lie?",
            ask.choice("Quadrant:", ["I", "II", "III", "IV"], quadrant),
          ),
          part(
            "Is sin θ positive or negative?",
            ask.choice("sin θ is", ["positive", "negative"], sinSign),
          ),
          part(
            `Is ${ask2} θ positive or negative?`,
            ask.choice(`${ask2} θ is`, ["positive", "negative"], second),
          ),
        ],
        solution: [
          reduce(angle).toString() === angle.toString()
            ? `${piText(angle)} lies in Quadrant ${quadrant}.`
            : `${piText(angle)} differs from ${piText(reduce(angle))} by whole revolutions, and ${piText(reduce(angle))} lies in Quadrant ${quadrant}.`,
          `In Quadrant ${quadrant}, the y-coordinate of the point on the circle is ${sinSign}, so sin θ is ${sinSign}.`,
          ask2 === "cos"
            ? `In Quadrant ${quadrant}, the x-coordinate is ${cosSign}, so cos θ is ${cosSign}.`
            : `In Quadrant ${quadrant}, the slope y/x of the terminal ray is ${tanSign}, so tan θ is ${tanSign}.`,
        ],
        data: { angle, quadrant, sinSign, cosSign, tanSign },
      });
    },
    verify({ data: { angle, quadrant, sinSign, cosSign, tanSign } }) {
      const x = radians(angle);
      assert((Math.sin(x) > 0 ? "positive" : "negative") === sinSign, "sin sign");
      assert((Math.cos(x) > 0 ? "positive" : "negative") === cosSign, "cos sign");
      assert((Math.tan(x) > 0 ? "positive" : "negative") === tanSign, "tan sign");
      assert(["I", "II", "III", "IV"].includes(quadrant), "quadrant");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "sine-cosine-tangent",
    skill: "solve",
    make(r) {
      const angles = r.sample(NON_AXIS, 3);
      const shifts = angles.map(() => r.pick([0, 0, 2, -2]));
      const [a1, a2, a3] = angles.map((q, i) => q.add(shifts[i]));
      const s = sinExact(a1);
      const c = cosExact(a2);
      const t = tanExact(a3);
      return problem({
        stem: "Give each value exactly, without a calculator.",
        parts: [
          part(`Find sin(${piText(a1)}).`, ask.number(`sin(${piText(a1)}) =`, s.text)),
          part(`Find cos(${piText(a2)}).`, ask.number(`cos(${piText(a2)}) =`, c.text)),
          part(`Find tan(${piText(a3)}).`, ask.number(`tan(${piText(a3)}) =`, t.text)),
        ],
        solution: [
          `${ray(a1)} meets the unit circle at ${unitPointText(a1)}. The sine is the y-coordinate, so sin(${piText(a1)}) = ${s.text}.`,
          `${ray(a2)} meets the unit circle at ${unitPointText(a2)}. The cosine is the x-coordinate, so cos(${piText(a2)}) = ${c.text}.`,
          `${ray(a3)} meets the unit circle at ${unitPointText(a3)}. So tan(${piText(a3)}) = sin/cos = (${sinExact(a3).text})/(${cosExact(a3).text}) = ${t.text}.`,
        ],
        data: { a1, a2, a3, s, c, t },
      });
    },
    verify({ data: { a1, a2, a3, s, c, t } }) {
      assertNear(Math.sin(radians(a1)), s.value, "sin");
      assertNear(Math.cos(radians(a2)), c.value, "cos");
      assertNear(Math.tan(radians(a3)), t.value, "tan");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "standard-position-and-radians",
    skill: "apply-results",
    make(r) {
      const find = r.pick(FIND_ANGLE);
      const radius1 = r.pick([4, 5, 8, 10, 12]);
      const arc1 = r.pick([6, 9, 12, 15, 18, 20, 30]);
      const theta1 = new Q(arc1, radius1);
      const sweep = r.pick(SWEEP);
      const radius2 = r.pick([6, 8, 9, 12, 15, 18, 20]);
      const deg2 = r.pick([30, 45, 60, 90, 120, 135, 150, 240, 270, 300]);
      const angle2 = fromDegrees(deg2);
      const arc2 = new Q(radius2 * angle2.n, angle2.d);
      const reach = r.pick(REACH);
      const radius3 = r.pick([6, 8, 9, 12, 15, 20, 24]);
      const angle3 = r.pick(
        SPECIAL.filter(
          (q) => q.n !== 0 && q.n * 2 < q.d * 3 && !(q.n === 1 && q.d === 1),
        ),
      );
      const arc3 = new Q(radius3 * angle3.n, angle3.d);
      return problem({
        stem: "On a circle of radius r, an angle of θ radians in standard position subtends an arc of length s = rθ.",
        parts: [
          part(find.text(radius1, arc1), ask.number("θ =", theta1, { unit: "radians" })),
          part(
            sweep.text(radius2, deg2),
            ask.number("Distance:", piText(arc2), { unit: sweep.unit }),
          ),
          part(
            reach.text(piText(arc3), piText(angle3)),
            ask.number("Radius:", radius3, { unit: reach.unit }),
          ),
        ],
        solution: [
          `θ = s/r = ${arc1}/${radius1}${theta1.toString() === `${arc1}/${radius1}` ? "" : ` = ${theta1.toString()}`} radians.`,
          `${deg2}° = ${piText(angle2)} radians, so s = rθ = ${radius2}(${piText(angle2)}) = ${piText(arc2)} ${sweep.unit}.`,
          `s = rθ, so r = s/θ = (${piText(arc3)})/(${piText(angle3)}) = ${radius3} ${reach.unit}.`,
        ],
        data: {
          arc1,
          radius1,
          theta1,
          radius2,
          deg2,
          angle2,
          arc2,
          radius3,
          angle3,
          arc3,
        },
      });
    },
    verify({
      data: { arc1, radius1, theta1, radius2, angle2, arc2, radius3, angle3, arc3 },
    }) {
      assertNear(arc1 / radius1, theta1.n / theta1.d, "angle");
      assertNear(radians(arc2), radius2 * radians(angle2), "arc");
      assertNear(radians(arc3), radius3 * radians(angle3), "radius");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "sine-cosine-tangent",
    skill: "apply-results",
    make(r) {
      const [p, q, h] = r.pick(RATIONAL_POINTS);
      const swap = r.chance();
      const a = swap ? q : p;
      const b = swap ? p : q;
      const sx = r.sign();
      const sy = r.sign();
      const x = new Q(sx * a, h);
      const y = new Q(sy * b, h);
      return problem({
        stem: `The terminal ray of an angle θ in standard position meets the unit circle at P(${x.toString()}, ${y.toString()}).`,
        parts: [
          part("Find tan θ.", ask.number("tan θ =", y.div(x))),
          part(
            "Where does the terminal ray of θ + π meet the unit circle? Write the point as (x, y).",
            ask.points("Point:", [[x.neg(), y.neg()]]),
          ),
          part("Find sin(−θ).", ask.number("sin(−θ) =", y.neg())),
        ],
        solution: [
          `On the unit circle, sin θ is the y-coordinate and cos θ is the x-coordinate, so tan θ = sin θ / cos θ = (${y.toString()})/(${x.toString()}) = ${y.div(x).toString()}.`,
          `Adding π rotates the terminal ray half a revolution about the origin, which sends P to the opposite point (${x.neg().toString()}, ${y.neg().toString()}).`,
          `The angle −θ is the reflection of θ across the x-axis, so the y-coordinate changes sign: sin(−θ) = ${y.neg().toString()}.`,
        ],
        data: { x, y },
      });
    },
    verify({ data: { x, y } }) {
      const nx = x.n / x.d;
      const ny = y.n / y.d;
      assertNear(nx * nx + ny * ny, 1, "on the unit circle");
      const theta = Math.atan2(ny, nx);
      assertNear(Math.tan(theta), ny / nx, "tan");
      assertNear(Math.cos(theta + Math.PI), -nx, "opposite x");
      assertNear(Math.sin(theta + Math.PI), -ny, "opposite y");
      assertNear(Math.sin(-theta), -ny, "sin(−θ)");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "standard-position-and-radians",
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
      const kinds = r.shuffle(["coterminal", "quadrant", "arc", "sign"]).slice(0, 3);
      const claims = kinds.map((kind, idx) => claim(r, kind, mask[idx]));
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
      for (const c of claims) {
        assert(typeof c.truth === "boolean" && c.reason.length > 0, "claim");
        if (c.check) assert(c.check() === c.truth, `claim truth: ${c.statement}`);
      }
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "sine-cosine-tangent",
    skill: "solve",
    make(r) {
      const k = r.pick([-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const angle = new Q(k, 2);
      const s = sinExact(angle);
      const c = cosExact(angle);
      const t = tanExact(angle);
      const point = `(${c.text}, ${s.text})`;
      return problem({
        stem: `An angle θ = ${piText(angle)} radians is in standard position.`,
        parts: [
          part("Find sin θ.", ask.number("sin θ =", s.text)),
          part("Find cos θ.", ask.number("cos θ =", c.text)),
          part(
            "Find tan θ. Write DNE if tan θ is undefined.",
            ask.limit("tan θ =", t.defined ? t.text : "DNE"),
          ),
        ],
        solution: [
          `${ray(angle)} lies along an axis and meets the unit circle at ${point}. The sine is the y-coordinate, so sin θ = ${s.text}.`,
          `The cosine is the x-coordinate, so cos θ = ${c.text}.`,
          t.defined
            ? `The terminal ray is along the x-axis, so its slope is 0, and tan θ = ${s.text}/${c.text} = 0.`
            : `The terminal ray is vertical, so its slope does not exist. Equivalently, cos θ = 0, so sin θ / cos θ is undefined. tan θ is undefined.`,
        ],
        data: { angle, s, c, t },
      });
    },
    verify({ data: { angle, s, c, t } }) {
      const x = radians(angle);
      assertNear(Math.sin(x), s.value, "sin");
      assertNear(Math.cos(x), c.value, "cos");
      assert(t.defined === Math.abs(Math.cos(x)) > 1e-9, "tan defined");
      if (t.defined) assertNear(Math.tan(x), t.value, "tan");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "sine-cosine-tangent",
    skill: "solve",
    make(r) {
      const [t1, t2, t3] = r.sample(NON_AXIS, 3);
      const sin2 = sinExact(t2);
      const cos2 = cosExact(t2);
      const tanAngle = t3;
      const tanValue = tanExact(tanAngle);
      const other = reduce(tanAngle.add(1));
      const pair = [tanAngle, other].sort((m, n) => m.n / m.d - n.n / n.d);
      return problem({
        stem: "Give each angle in radians, from 0 to 2π, as an exact value.",
        parts: [
          part(
            `The terminal ray of θ meets the unit circle at (${cosExact(t1).text}, ${sinExact(t1).text}). Find θ.`,
            ask.number("θ =", piText(t1)),
          ),
          part(
            `sin θ = ${sin2.text} and cos θ is ${cos2.value > 0 ? "positive" : "negative"}. Find θ.`,
            ask.number("θ =", piText(t2)),
          ),
          part(
            `Find all θ with tan θ = ${tanValue.text}.`,
            ask.set(
              "θ =",
              pair.map((q) => piText(q)),
            ),
          ),
        ],
        solution: [
          `The x-coordinate ${cosExact(t1).text} and y-coordinate ${sinExact(t1).text} are the cosine and sine of ${piText(t1)}, in Quadrant ${quadrantOf(t1)}. So θ = ${piText(t1)}.`,
          `The reference angle has sine ${sin2.text.replace("−", "")}. Since sin θ is ${sin2.value > 0 ? "positive" : "negative"} and cos θ is ${cos2.value > 0 ? "positive" : "negative"}, the angle is in Quadrant ${quadrantOf(t2)}, so θ = ${piText(t2)}.`,
          `tan θ = ${tanValue.text} at ${piText(tanAngle)} in Quadrant ${quadrantOf(tanAngle)}. The tangent repeats every half revolution, so the other angle is ${piText(tanAngle)} ${radians(tanAngle) < Math.PI ? "+" : "−"} π = ${piText(other)}. The angles are ${piText(pair[0])} and ${piText(pair[1])}.`,
        ],
        data: { t1, t2, t3, tanValue, pair },
      });
    },
    verify({ data: { t1, t2, t3, tanValue, pair } }) {
      assert(
        pair.length === 2 && pair[0].n * pair[1].d !== pair[1].n * pair[0].d,
        "two different angles",
      );
      pair.forEach((q) => assertNear(Math.tan(radians(q)), tanValue.value, "tan"));
      assertNear(Math.cos(radians(t1)), cosExact(t1).value, "cos");
      assert(radians(t2) < 2 * Math.PI && radians(t2) >= 0, "range");
    },
  },
];

const FIND_ANGLE = [
  {
    text: (radius, arc) =>
      `A bicycle wheel has radius ${radius} centimeters. A point on the rim travels ${arc} centimeters along the circle. Through what angle, in radians, has the wheel turned?`,
  },
  {
    text: (radius, arc) =>
      `A robot arm ${radius} centimeters long swings so that its tip travels ${arc} centimeters along a circular arc. Through what angle, in radians, did the arm swing?`,
  },
  {
    text: (radius, arc) =>
      `A sprinkler sprays water ${radius} meters, and the farthest water lands along an arc ${arc} meters long. Through what angle, in radians, does the sprinkler turn?`,
  },
];
const SWEEP = [
  {
    unit: "centimeters",
    text: (radius, deg) =>
      `The tip of a clock's minute hand is ${radius} centimeters from the center. How far does the tip travel while the hand turns through ${deg}°?`,
  },
  {
    unit: "centimeters",
    text: (radius, deg) =>
      `A windshield wiper blade ${radius} centimeters long pivots through ${deg}°. How far does the tip of the blade travel?`,
  },
  {
    unit: "centimeters",
    text: (radius, deg) =>
      `A turntable has radius ${radius} centimeters. How far does a point on its edge travel while the turntable turns through ${deg}°?`,
  },
];
const REACH = [
  {
    unit: "centimeters",
    text: (arc, angle) =>
      `A pendulum arm swings through an angle of ${angle} radians, and its tip travels ${arc} centimeters along the arc. How long is the arm, in centimeters?`,
  },
  {
    unit: "meters",
    text: (arc, angle) =>
      `A sprinkler turns through ${angle} radians, and the farthest spray covers an arc ${arc} meters long. How far does the sprinkler spray, in meters?`,
  },
  {
    unit: "centimeters",
    text: (arc, angle) =>
      `A gear turns through ${angle} radians, and a point on its rim moves ${arc} centimeters along the rim. What is the radius of the gear, in centimeters?`,
  },
];

// One true or false statement about angles, arcs, and signs.
function claim(r, kind, truth) {
  if (kind === "coterminal") {
    const base = r.pick([...SIXTHS, ...FOURTHS].filter((q) => q.n !== 0));
    const k = r.int(1, 3);
    const given = base.add(k * 2);
    const wrong = reduce(base.add(1));
    const shown = truth
      ? base
      : r.pick(
          [wrong, reduce(new Q(2).sub(base))].filter(
            (q) => `${q.n}/${q.d}` !== `${base.n}/${base.d}`,
          ),
        );
    return {
      truth,
      statement: `The angles ${piText(given)} and ${piText(shown)} have the same terminal ray when in standard position.`,
      reason: truth
        ? `${piText(given)} − ${k * 2}π = ${piText(base)}, a difference of ${revText(k)}, so the terminal rays are the same. The statement is true.`
        : `${piText(given)} − ${k * 2}π = ${piText(base)}, and ${piText(shown)} is not ${piText(base)} plus a whole number of revolutions. The statement is false.`,
      check: () =>
        Math.abs(Math.cos(radians(given)) - Math.cos(radians(shown))) < 1e-9 &&
        Math.abs(Math.sin(radians(given)) - Math.sin(radians(shown))) < 1e-9,
    };
  }
  if (kind === "quadrant") {
    const value = r.pick([1, 2, 2.5, 3, 4, 4.5, 5, 6]);
    const actual = quadrantOf(new Q(Math.round((value / Math.PI) * 10000), 10000));
    const names = ["I", "II", "III", "IV"];
    const claimed = truth ? actual : names.filter((n) => n !== actual)[r.int(0, 2)];
    return {
      truth,
      statement: `An angle of ${value} ${value === 1 ? "radian" : "radians"} in standard position has its terminal ray in Quadrant ${claimed}.`,
      reason: `π/2 ≈ 1.57, π ≈ 3.14, and 3π/2 ≈ 4.71, so ${value} ${value === 1 ? "radian" : "radians"} is in Quadrant ${actual}. ${truth ? "The statement is true." : `It is not in Quadrant ${claimed}, so the statement is false.`}`,
      check: () => claimed === actual,
    };
  }
  if (kind === "arc") {
    const radius = r.pick([3, 4, 5, 6, 8, 10]);
    const theta = r.pick([2, 3, 4, 5]);
    const claimed = truth ? radius * theta : radius + theta;
    return {
      truth,
      statement: `On a circle of radius ${radius}, an angle of ${theta} radians subtends an arc of length ${claimed}.`,
      reason: `s = rθ = ${radius}(${theta}) = ${radius * theta}. ${truth ? "The statement is true." : `The arc length is ${radius * theta}, not ${claimed}, so the statement is false.`}`,
      check: () => claimed === radius * theta,
    };
  }
  const q = r.pick(NON_AXIS);
  const fn = r.pick(["sin", "cos"]);
  const actual =
    (fn === "sin" ? sinExact(q) : cosExact(q)).value > 0 ? "positive" : "negative";
  const claimed = truth ? actual : actual === "positive" ? "negative" : "positive";
  return {
    truth,
    statement: `${fn}(${piText(q)}) is ${claimed}.`,
    reason: `${piText(q)} is in Quadrant ${quadrantOf(q)}, where ${fn === "sin" ? "the y-coordinate" : "the x-coordinate"} of the point on the circle is ${actual}. ${truth ? "The statement is true." : "The statement is false."}`,
    check: () => claimed === actual,
  };
}

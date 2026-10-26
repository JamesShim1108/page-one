// Typed-answer problems for Topic 3.3. Coordinates on a circle of radius r are
// (r cos θ, r sin θ); every exact value comes from the kit's trig table and verify()
// recomputes it with Math.sin and Math.cos.

import {
  ask,
  part,
  problem,
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
  scaled,
  plusText,
  referenceAngle,
  quadrantName,
  anglesWith,
  OFF_AXIS,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const point = (x, y) => `(${x}, ${y})`;
const sameAngle = (a, b) => reduce(a).toString() === reduce(b).toString();
const OFF_AXIS_SHIFTED = (r) => {
  const base = r.pick(OFF_AXIS);
  return base.add(r.pick([0, 0, 0, 2, -2]));
};
const wrap = (text) => (/^\d+$/.test(text) ? text : `(${text})`);
const signWord = (value) => (value > 0 ? "positive" : "negative");
// ", which is also the terminal ray of 11π/6," when the angle is outside [0, 2π).
const via = (angle) =>
  reduce(angle).toString() === angle.toString()
    ? ""
    : `, which is also the terminal ray of ${piText(reduce(angle))},`;

const ROTORS = [
  {
    name: "Ferris wheel",
    point: "the seat",
    pointCap: "A seat",
    unit: "meters",
    start: "A seat on the rim starts level with the center, on the right side.",
    vertical: "How high above the ground is the seat",
  },
  {
    name: "windmill",
    point: "the tip of the blade",
    pointCap: "The tip of a blade",
    unit: "meters",
    start: "The tip of a blade starts level with the hub, on the right side.",
    vertical: "How high above the ground is the tip of the blade",
  },
  {
    name: "bicycle wheel",
    point: "the valve stem",
    pointCap: "The valve stem",
    unit: "centimeters",
    start: "The valve stem on the rim starts level with the axle, on the right side.",
    vertical: "How high above the ground is the valve stem",
  },
];
const centerWord = (rotor) =>
  rotor.name === "windmill" ? "hub" : rotor.name === "bicycle wheel" ? "axle" : "center";

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "points-on-a-circle",
    skill: "identify-information",
    make(r) {
      const radius = r.pick([2, 4, 6, 8, 10, 12]);
      const angle = r.pick(OFF_AXIS);
      const opposite = angle.add(1);
      const x = scaled("cos", angle, radius);
      const y = scaled("sin", angle, radius);
      const ox = scaled("cos", opposite, radius);
      const oy = scaled("sin", opposite, radius);
      return problem({
        stem: `A circle with radius ${radius} is centered at the origin. The terminal ray of an angle θ = ${piText(angle)} in standard position meets the circle at the point P.`,
        parts: [
          part("Find the x-coordinate of P.", ask.number("x =", x.text)),
          part("Find the y-coordinate of P.", ask.number("y =", y.text)),
          part(
            "The terminal ray of θ + π meets the same circle at the point Q. Write the coordinates of Q.",
            ask.points("Q:", [[ox.text, oy.text]]),
          ),
        ],
        solution: [
          `For a circle of radius r, x = r cos θ. So x = ${radius} cos(${piText(angle)}) = ${radius}(${cosExact(angle).text}) = ${x.text}.`,
          `y = r sin θ = ${radius} sin(${piText(angle)}) = ${radius}(${sinExact(angle).text}) = ${y.text}.`,
          `Adding π turns the ray half a revolution, so Q is the point on the opposite side of the origin: ${point(ox.text, oy.text)}.`,
        ],
        data: { radius, angle, x, y, ox, oy },
      });
    },
    verify({ data: { radius, angle, x, y, ox, oy } }) {
      const t = radians(angle);
      assertNear(x.value, radius * Math.cos(t), "x");
      assertNear(y.value, radius * Math.sin(t), "y");
      assertNear(ox.value, -x.value, "opposite x");
      assertNear(oy.value, -y.value, "opposite y");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "special-angles",
    skill: "solve",
    make(r) {
      const a1 = OFF_AXIS_SHIFTED(r);
      const a2 = OFF_AXIS_SHIFTED(r);
      const deg = r.pick([30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330]);
      const a3 = fromDegrees(deg);
      return problem({
        stem: "Give exact values, with no calculator.",
        parts: [
          part(
            `Find sin(${piText(a1)}).`,
            ask.number(`sin(${piText(a1)}) =`, sinExact(a1).text),
          ),
          part(
            `Find cos(${piText(a2)}).`,
            ask.number(`cos(${piText(a2)}) =`, cosExact(a2).text),
          ),
          part(
            `Where does the terminal ray of ${deg}° meet the unit circle? Write the point as (x, y).`,
            ask.points("Point:", [[cosExact(a3).text, sinExact(a3).text]]),
          ),
        ],
        solution: [
          `The terminal ray of ${piText(a1)}${via(a1)} makes a ${piText(referenceAngle(a1))} angle with the x-axis and is in Quadrant ${quadrantName(a1)}. So sin(${piText(a1)}) = ${sinExact(a1).text}.`,
          `The terminal ray of ${piText(a2)}${via(a2)} makes a ${piText(referenceAngle(a2))} angle with the x-axis and is in Quadrant ${quadrantName(a2)}. So cos(${piText(a2)}) = ${cosExact(a2).text}.`,
          `${deg}° = ${piText(a3)} radians. The point is (cos ${piText(a3)}, sin ${piText(a3)}) = ${point(cosExact(a3).text, sinExact(a3).text)}.`,
        ],
        data: { a1, a2, a3, deg },
      });
    },
    verify({ data: { a1, a2, a3 } }) {
      assertNear(sinExact(a1).value, Math.sin(radians(a1)), "sin");
      assertNear(cosExact(a2).value, Math.cos(radians(a2)), "cos");
      assertNear(cosExact(a3).value, Math.cos(radians(a3)), "x");
      assertNear(sinExact(a3).value, Math.sin(radians(a3)), "y");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "points-on-a-circle",
    skill: "apply-results",
    make(r) {
      const rotor = r.pick(ROTORS);
      const radius = r.pick([8, 10, 12, 16, 20, 24, 30]);
      const center = radius + r.pick([2, 3, 5, 10]);
      const halfAngle = r.pick([new Q(1, 6), new Q(5, 6), new Q(7, 6), new Q(11, 6)]);
      const sideAngle = r.pick([new Q(1, 3), new Q(2, 3), new Q(4, 3), new Q(5, 3)]);
      const axisAngle = r.pick([new Q(1, 2), new Q(3, 2), new Q(1, 1)]);
      const height1 = sinExact(halfAngle).coefficient.mul(radius).add(center);
      const offset = scaled("cos", sideAngle, radius);
      const height3 = scaled("sin", axisAngle, radius).coefficient.add(center);
      const c = centerWord(rotor);
      return problem({
        stem: `A ${rotor.name} has radius ${radius} ${rotor.unit}, and its ${c} is ${center} ${rotor.unit} above the ground. ${rotor.start} The ${rotor.name} turns counterclockwise through an angle θ.`,
        parts: [
          part(
            `${rotor.vertical} when θ = ${piText(halfAngle)}?`,
            ask.number("Height:", height1, { unit: rotor.unit }),
          ),
          part(
            `When θ = ${piText(sideAngle)}, how far is ${rotor.point} to the right of the ${c}? Use a negative number if it is to the left.`,
            ask.number("Horizontal distance:", offset.text, { unit: rotor.unit }),
          ),
          part(
            `${rotor.vertical} when θ = ${piText(axisAngle)}?`,
            ask.number("Height:", height3, { unit: rotor.unit }),
          ),
        ],
        solution: [
          `The height is ${center} + ${radius} sin θ. At θ = ${piText(halfAngle)}, sin θ = ${sinExact(halfAngle).text}, so the height is ${center} + ${radius}(${sinExact(halfAngle).text}) = ${num(height1.n / height1.d)} ${rotor.unit}.`,
          `The horizontal distance from the ${c} is ${radius} cos θ. At θ = ${piText(sideAngle)}, cos θ = ${cosExact(sideAngle).text}, so it is ${radius}(${cosExact(sideAngle).text}) = ${offset.text} ${rotor.unit}.`,
          `At θ = ${piText(axisAngle)}, sin θ = ${sinExact(axisAngle).text}, so the height is ${center} + ${radius}(${sinExact(axisAngle).text}) = ${num(height3.n / height3.d)} ${rotor.unit}.`,
        ],
        data: {
          radius,
          center,
          halfAngle,
          sideAngle,
          axisAngle,
          height1,
          offset,
          height3,
        },
      });
    },
    verify({
      data: { radius, center, halfAngle, sideAngle, axisAngle, height1, offset, height3 },
    }) {
      assertNear(
        height1.n / height1.d,
        center + radius * Math.sin(radians(halfAngle)),
        "height 1",
      );
      assertNear(offset.value, radius * Math.cos(radians(sideAngle)), "offset");
      assertNear(
        height3.n / height3.d,
        center + radius * Math.sin(radians(axisAngle)),
        "height 3",
      );
      assert(center - radius > 0, "stays above the ground");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "special-angles",
    skill: "describe",
    make(r) {
      const angle = OFF_AXIS_SHIFTED(r);
      const fn = r.pick(["sin", "cos"]);
      const fn2 = fn === "sin" ? "cos" : "sin";
      const ref = referenceAngle(angle);
      const target = exact(fn, angle);
      const signFn = exact(fn2, angle);
      return problem({
        stem: `An angle θ = ${piText(angle)} is in standard position.`,
        parts: [
          part(
            "Find the reference angle, the acute angle between the terminal ray and the x-axis.",
            ask.number("Reference angle:", piText(ref)),
          ),
          part(
            `Is ${fn2} θ positive or negative?`,
            ask.choice(`${fn2} θ is`, ["positive", "negative"], signWord(signFn.value)),
          ),
          part(`Find ${fn} θ.`, ask.number(`${fn} θ =`, target.text)),
        ],
        solution: [
          `${reduce(angle).toString() === angle.toString() ? "" : `${piText(angle)} has the same terminal ray as ${piText(reduce(angle))}. `}The terminal ray is in Quadrant ${quadrantName(angle)}, and the angle between it and the x-axis is ${piText(ref)}.`,
          `In Quadrant ${quadrantName(angle)}, ${fn2 === "sin" ? "the y-coordinate" : "the x-coordinate"} on the circle is ${signWord(signFn.value)}, so ${fn2} θ is ${signWord(signFn.value)}.`,
          `The value of ${fn} at the reference angle ${piText(ref)} is ${exact(fn, ref).text}. In Quadrant ${quadrantName(angle)} the sign is ${signWord(target.value)}, so ${fn} θ = ${target.text}.`,
        ],
        data: { angle, ref, fn, target, signFn },
      });
    },
    verify({ data: { angle, ref, fn, target, signFn } }) {
      const t = radians(angle);
      assertNear(Math[fn](t), target.value, fn);
      assert(
        Math.sign(signFn.value) === Math.sign(Math[fn === "sin" ? "cos" : "sin"](t)),
        "sign",
      );
      assertNear(
        Math.abs(Math.sin(radians(ref))),
        Math.abs(Math.sin(t)),
        "reference angle",
      );
      assert(radians(ref) > 0 && radians(ref) < Math.PI / 2, "acute");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "points-on-a-circle",
    skill: "identify-information",
    make(r) {
      const radius = r.pick([4, 6, 8, 10, 12, 16, 20]);
      const angle = r.pick(OFF_AXIS);
      const x = scaled("cos", angle, radius);
      const y = scaled("sin", angle, radius);
      return problem({
        stem: `The terminal ray of an angle θ in standard position, with 0 ≤ θ < 2π, meets a circle centered at the origin at the point ${point(x.text, y.text)}.`,
        parts: [
          part("Find the radius of the circle.", ask.number("r =", radius)),
          part("Find cos θ.", ask.number("cos θ =", cosExact(angle).text)),
          part("Find θ.", ask.number("θ =", piText(angle))),
        ],
        solution: [
          `The distance from the origin to the point is the radius: r = √(${wrap(x.text)}² + ${wrap(y.text)}²) = √${radius * radius} = ${radius}.`,
          `Since x = r cos θ, cos θ = x/r = ${wrap(x.text)}/${radius} = ${cosExact(angle).text}.`,
          `Likewise sin θ = y/r = ${sinExact(angle).text}. The point is in Quadrant ${quadrantName(angle)}, with reference angle ${piText(referenceAngle(angle))}, so θ = ${piText(angle)}.`,
        ],
        data: { radius, angle, x, y },
      });
    },
    verify({ data: { radius, angle, x, y } }) {
      assertNear(Math.hypot(x.value, y.value), radius, "radius");
      const t = Math.atan2(y.value, x.value);
      assertNear((t + 2 * Math.PI) % (2 * Math.PI), radians(angle), "angle");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "special-angles",
    skill: "equivalent-forms",
    make(r) {
      const base = r.pick([new Q(1, 6), new Q(1, 4), new Q(1, 3)]);
      const fn = r.pick(["sin", "cos"]);
      const family = r.sample(
        [
          new Q(1).sub(base),
          new Q(1).add(base),
          new Q(2).sub(base),
          base.neg(),
          base.add(2),
          new Q(3).sub(base),
        ],
        3,
      );
      return problem({
        stem: `It is known that ${fn}(${piText(base)}) = ${exact(fn, base).text}. Use it, and what you know about quadrants, to find the other values. Give exact answers.`,
        parts: family.map((angle) =>
          part(
            `Find ${fn}(${piText(angle)}).`,
            ask.number(`${fn}(${piText(angle)}) =`, exact(fn, angle).text),
          ),
        ),
        solution: family.map(
          (angle) =>
            `${piText(angle)} has a reference angle of ${piText(referenceAngle(angle))}, and its terminal ray is in Quadrant ${quadrantName(angle)}, where ${fn === "sin" ? "the y-coordinate" : "the x-coordinate"} is ${signWord(exact(fn, angle).value)}. So ${fn}(${piText(angle)}) = ${exact(fn, angle).text}.`,
        ),
        data: { base, fn, family },
      });
    },
    verify({ data: { base, fn, family } }) {
      for (const angle of family) {
        assertNear(Math[fn](radians(angle)), exact(fn, angle).value, "value");
        assertNear(
          Math.abs(Math[fn](radians(angle))),
          Math.abs(Math[fn](radians(base))),
          "same size",
        );
        assert(sameAngle(referenceAngle(angle), base), "reference angle");
      }
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "points-on-a-circle",
    skill: "apply-results",
    make(r) {
      const radius = r.pick([2, 4, 6, 8, 10, 12, 14, 18]);
      const angle = OFF_AXIS_SHIFTED(r);
      const x = scaled("cos", angle, radius);
      const y = scaled("sin", angle, radius);
      const slope = tanExact(angle);
      const ry = scaled("sin", angle.neg(), radius);
      return problem({
        stem: `A circle with radius ${radius} is centered at the origin. The terminal ray of θ = ${piText(angle)} in standard position meets the circle at the point P.`,
        parts: [
          part("Write the coordinates of P.", ask.points("P:", [[x.text, y.text]])),
          part(
            "Find the slope of the line through the origin and P.",
            ask.number("Slope:", slope.text),
          ),
          part(
            "The terminal ray of −θ meets the circle at the point R. Write the coordinates of R.",
            ask.points("R:", [[x.text, ry.text]]),
          ),
        ],
        solution: [
          `P = (${radius} cos θ, ${radius} sin θ) = (${radius}(${cosExact(angle).text}), ${radius}(${sinExact(angle).text})) = ${point(x.text, y.text)}.`,
          `The slope of the ray is y/x = tan θ = ${slope.text}.`,
          `The angle −θ is the reflection of θ across the x-axis, so R has the same x-coordinate and the opposite y-coordinate: ${point(x.text, ry.text)}.`,
        ],
        data: { radius, angle, x, y, slope, ry },
      });
    },
    verify({ data: { radius, angle, x, y, slope, ry } }) {
      const t = radians(angle);
      assertNear(x.value, radius * Math.cos(t), "x");
      assertNear(y.value, radius * Math.sin(t), "y");
      assertNear(slope.value, y.value / x.value, "slope");
      assertNear(ry.value, -y.value, "reflection");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "special-angles",
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
      const kinds = r.shuffle(["same", "circle", "compare", "radius"]).slice(0, 3);
      const claims = kinds.map((kind, index) => claim(r, kind, mask[index]));
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
    concept: "special-angles",
    skill: "solve",
    make(r) {
      const values = [
        { text: "1/2", value: 0.5 },
        { text: "√2/2", value: Math.SQRT2 / 2 },
        { text: "√3/2", value: Math.sqrt(3) / 2 },
      ];
      const pick = () => {
        const base = r.pick(values);
        return r.chance() ? { text: `−${base.text}`, value: -base.value } : base;
      };
      const [fnA, fnB, fnC] = r.shuffle(["sin", "cos", "sin", "cos"]).slice(0, 3);
      const a = pick();
      const b = pick();
      const c = pick();
      const setA = anglesWith(fnA, a.value, 0, 2);
      const setB = anglesWith(fnB, b.value, 0, 2);
      const setC = anglesWith(fnC, c.value, -1, 1);
      if (setA.length !== 2 || setB.length !== 2 || setC.length !== 2)
        reject("two solutions each");
      return problem({
        stem: "Find every angle that makes the equation true. Give exact answers in radians, separated by commas.",
        parts: [
          part(
            `Find all θ with 0 ≤ θ < 2π for which ${fnA} θ = ${a.text}.`,
            ask.set("θ =", setA.map(piText)),
          ),
          part(
            `Find all θ with 0 ≤ θ < 2π for which ${fnB} θ = ${b.text}.`,
            ask.set("θ =", setB.map(piText)),
          ),
          part(
            `Find all θ with −π ≤ θ < π for which ${fnC} θ = ${c.text}.`,
            ask.set("θ =", setC.map(piText)),
          ),
        ],
        solution: [
          solveLine(fnA, a, setA),
          solveLine(fnB, b, setB),
          solveLine(fnC, c, setC),
        ],
        data: { fnA, fnB, fnC, a, b, c, setA, setB, setC },
      });
    },
    verify({ data: { fnA, fnB, fnC, a, b, c, setA, setB, setC } }) {
      for (const [fn, target, set, lo, hi] of [
        [fnA, a, setA, 0, 2],
        [fnB, b, setB, 0, 2],
        [fnC, c, setC, -1, 1],
      ]) {
        assert(set.length === 2, "two angles");
        for (const angle of set) {
          assertNear(Math[fn](radians(angle)), target.value, "solution");
          const size = angle.n / angle.d;
          assert(size >= lo && size < hi, "range");
        }
      }
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "points-on-a-circle",
    skill: "apply-results",
    make(r) {
      const rotor = r.pick(ROTORS);
      const radius = r.pick([10, 12, 16, 20, 24, 30, 40]);
      const center = radius + r.pick([2, 3, 5, 10]);
      const minutes = r.pick([8, 12, 24]);
      const step = r.int(1, minutes - 1);
      const angle = new Q(2 * step, minutes);
      if (
        angle.n === 0 ||
        angle.n * 2 === angle.d ||
        angle.n === angle.d ||
        angle.n * 2 === angle.d * 3
      )
        reject("axis angle");
      if (!OFF_AXIS.some((q) => sameAngle(q, angle))) reject("not special");
      const rise = scaled("sin", angle, radius);
      const run = scaled("cos", angle, radius);
      const height = plusText(center, rise);
      const c = centerWord(rotor);
      const time = rotor.name === "bicycle wheel" ? "seconds" : "minutes";
      return problem({
        stem: `A ${rotor.name} has radius ${radius} ${rotor.unit}, and its ${c} is ${center} ${rotor.unit} above the ground. ${rotor.start} The ${rotor.name} turns counterclockwise and makes one full revolution every ${minutes} ${time}.`,
        parts: [
          part(
            `Through what angle θ, in radians, has the ${rotor.name} turned after ${step} ${step === 1 ? time.slice(0, -1) : time}?`,
            ask.number("θ =", piText(angle)),
          ),
          part(
            `${rotor.vertical} at that time?`,
            ask.number("Height:", height, { unit: rotor.unit }),
          ),
          part(
            `At that time, how far is ${rotor.point} to the right of the ${c}? Use a negative number if it is to the left.`,
            ask.number("Horizontal distance:", run.text, { unit: rotor.unit }),
          ),
        ],
        solution: [
          `One revolution is 2π radians and takes ${minutes} ${time}, so after ${step} ${step === 1 ? time.slice(0, -1) : time} the angle is 2π(${step}/${minutes}) = ${piText(angle)}.`,
          `The height is ${center} + ${radius} sin θ = ${center} + ${radius}(${sinExact(angle).text}) = ${height} ${rotor.unit}.`,
          `The horizontal distance from the ${c} is ${radius} cos θ = ${radius}(${cosExact(angle).text}) = ${run.text} ${rotor.unit}.`,
        ],
        data: { radius, center, minutes, step, angle, rise, run, height },
      });
    },
    verify({ data: { radius, center, minutes, step, angle, rise, run } }) {
      const t = (2 * Math.PI * step) / minutes;
      assertNear(radians(angle), t, "angle");
      assertNear(rise.value, radius * Math.sin(t), "rise");
      assertNear(run.value, radius * Math.cos(t), "run");
      assert(center - radius > 0, "stays above the ground");
    },
  },
];

function solveLine(fn, target, set) {
  const base = referenceAngleFor(fn, target);
  return `${fn} θ = ${target.text}. The reference angle is ${piText(base)}, and ${fn} is ${signWord(target.value)} in ${fn === "sin" ? (target.value > 0 ? "Quadrants I and II" : "Quadrants III and IV") : target.value > 0 ? "Quadrants I and IV" : "Quadrants II and III"}. The angles in the interval are ${set.map(piText).join(" and ")}.`;
}

// The reference angle whose sine or cosine has the size of the target.
function referenceAngleFor(fn, target) {
  for (const q of [new Q(1, 6), new Q(1, 4), new Q(1, 3)])
    if (Math.abs(Math.abs(exact(fn, q).value) - Math.abs(target.value)) < 1e-9) return q;
  throw new Error("no reference angle");
}

// One true or false statement about special-angle values.
function claim(r, kind, truth) {
  if (kind === "same") {
    const fn = r.pick(["sin", "cos"]);
    const base = r.pick([new Q(1, 6), new Q(1, 4), new Q(1, 3)]);
    const partners = [
      new Q(1).sub(base),
      new Q(1).add(base),
      new Q(2).sub(base),
      base.neg(),
      base.add(2),
    ];
    const pool = partners.filter(
      (angle) =>
        Math.abs(exact(fn, angle).value - exact(fn, base).value) < 1e-9 === truth,
    );
    if (!pool.length) reject("no partner");
    const other = r.pick(pool);
    return {
      truth,
      statement: `${fn}(${piText(base)}) = ${fn}(${piText(other)})`,
      reason: `${fn}(${piText(base)}) = ${exact(fn, base).text} and ${fn}(${piText(other)}) = ${exact(fn, other).text}. ${truth ? "They are equal, so the statement is true." : "They are not equal, so the statement is false."}`,
      check: () => Math.abs(Math[fn](radians(base)) - Math[fn](radians(other))) < 1e-9,
    };
  }
  if (kind === "circle") {
    const angle = r.pick(OFF_AXIS);
    const other = r.pick(
      OFF_AXIS.filter(
        (q) =>
          Math.abs(Math.abs(sinExact(q).value) - Math.abs(sinExact(angle).value)) > 1e-9,
      ),
    );
    const x = cosExact(angle).text;
    const y = truth ? sinExact(angle).text : sinExact(other).text;
    const yv = truth ? sinExact(angle).value : sinExact(other).value;
    return {
      truth,
      statement: `The point ${point(x, y)} lies on the unit circle.`,
      reason: truth
        ? `A point (cos θ, sin θ) lies on the unit circle. Here ${point(x, y)} is the point at ${piText(angle)}, so the statement is true.`
        : `For a point on the unit circle, x² + y² = 1. Here ${wrap(x)}² + ${wrap(y)}² = ${num(Math.round((cosExact(angle).value ** 2 + yv ** 2) * 1000) / 1000)}, which is not 1, so the statement is false.`,
      check: () => Math.abs(cosExact(angle).value ** 2 + yv ** 2 - 1) < 1e-9,
    };
  }
  if (kind === "compare") {
    const fn = r.pick(["sin", "cos"]);
    const [p, q] = r.sample(OFF_AXIS, 2);
    if (Math.abs(exact(fn, p).value - exact(fn, q).value) < 1e-9) reject("equal values");
    const less = exact(fn, p).value < exact(fn, q).value;
    const symbol = truth ? (less ? "<" : ">") : less ? ">" : "<";
    return {
      truth,
      statement: `${fn}(${piText(p)}) ${symbol} ${fn}(${piText(q)})`,
      reason: `${fn}(${piText(p)}) = ${exact(fn, p).text} and ${fn}(${piText(q)}) = ${exact(fn, q).text}. ${exact(fn, p).value < exact(fn, q).value ? `The first is less than the second` : `The first is greater than the second`}, so the statement is ${truth ? "true" : "false"}.`,
      check: () =>
        symbol === "<"
          ? Math[fn](radians(p)) < Math[fn](radians(q))
          : Math[fn](radians(p)) > Math[fn](radians(q)),
    };
  }
  const radius = r.pick([4, 6, 8, 10, 12]);
  const angle = r.pick(OFF_AXIS);
  const x = scaled("cos", angle, radius);
  const y = scaled("sin", angle, radius);
  const claimed = truth ? radius : radius + r.pick([2, 4]);
  return {
    truth,
    statement: `The point ${point(x.text, y.text)} lies on the circle of radius ${claimed} centered at the origin.`,
    reason: `The distance from the origin is √(${wrap(x.text)}² + ${wrap(y.text)}²) = ${radius}. ${truth ? "That matches the radius, so the statement is true." : `That is not ${claimed}, so the statement is false.`}`,
    check: () => Math.abs(Math.hypot(x.value, y.value) - claimed) < 1e-9,
  };
}

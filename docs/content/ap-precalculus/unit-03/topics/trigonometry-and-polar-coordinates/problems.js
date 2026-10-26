// Typed-answer problems for Topic 3.13. A point is named by (r, θ) or by (x, y), with
// x = r cos θ, y = r sin θ, r = √(x² + y²), and θ = arctan(y/x) (plus π when x < 0). Exact keys
// come from the special angles; decimal keys use Pythagorean triples. Every conversion is
// re-done numerically in verify.

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
  radicalText,
  OFF_AXIS,
  quadrantName,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const PI = Math.PI;
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const pg = (n) => (n < 0 ? `(−${Math.abs(n)})` : String(n));
const fx = (value, places) => {
  const text = value.toFixed(places);
  return text.startsWith("-") ? `−${text.slice(1)}` : text;
};
const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
];
const QUADRANTS = ["I", "II", "III", "IV"];
const AXIS = [new Q(0), new Q(1, 2), new Q(1), new Q(3, 2)];
const quadrantOf = (x, y) => (x > 0 ? (y > 0 ? "I" : "IV") : y > 0 ? "II" : "III");
// An angle in [0, 2) as units of π, from a number of radians.
const unitsOf = (radiansValue) => {
  const q = new Q(Math.round(((radiansValue / PI) * 12) % 24), 12);
  return q.n < 0 ? q.add(2) : q;
};
// The principal arctan of a direction, in units of π (between −1/2 and 1/2).
const arctanUnits = (y, x) => new Q(Math.round((Math.atan(y / x) / PI) * 12), 12);
const sqrtText = (n) => {
  for (let f = Math.floor(Math.sqrt(n)); f >= 1; f -= 1)
    if (n % (f * f) === 0) {
      const m = n / (f * f);
      return m === 1 ? String(f) : f === 1 ? `√${m}` : `${f}√${m}`;
    }
  return `√${n}`;
};
const polarText = (r, angle) => `(${sg(r)}, ${piText(angle)})`;
const rectOf = (r, angle) => [r * Math.cos(radians(angle)), r * Math.sin(radians(angle))];
const sameRect = (p, q) => Math.abs(p[0] - q[0]) < 1e-9 && Math.abs(p[1] - q[1]) < 1e-9;

// A point on the ray at one of the twelve off-axis special angles, with an exact r, x, and y.
// Angles that are multiples of π/4 get r = k√2 and x, y = ±k; the others get r = 2k.
function rectPoint(angle, k) {
  const c = exact("cos", angle);
  const s = exact("sin", angle);
  if (angle.d === 4) {
    const x = Math.sign(c.value) * k;
    const y = Math.sign(s.value) * k;
    return {
      r: { text: radicalText(new Q(k), 2), value: k * Math.SQRT2 },
      x: { text: sg(x), value: x },
      y: { text: sg(y), value: y },
      n: 2 * k * k,
      tan: Math.sign(s.value) * Math.sign(c.value) < 0 ? "−1" : "1",
    };
  }
  const x = scaled("cos", angle, 2 * k);
  const y = scaled("sin", angle, 2 * k);
  return {
    r: { text: String(2 * k), value: 2 * k },
    x,
    y,
    n: 4 * k * k,
    tan: exact("tan", angle).text,
  };
}
// A complex number a + bi written from exact parts.
function complexText(x, y) {
  const imaginary = y.text.startsWith("−") ? y.text.slice(1) : y.text;
  const body =
    imaginary === "1"
      ? "i"
      : /^\d+$/.test(imaginary)
        ? `${imaginary}i`
        : `${imaginary} i`;
  if (x.text === "0") return y.text.startsWith("−") ? `−${body}` : body;
  return `${x.text} ${y.text.startsWith("−") ? "−" : "+"} ${body}`;
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "polar-coordinates",
    skill: "identify-information",
    make(r) {
      const angle = r.pick(OFF_AXIS);
      const radius = -r.int(2, 9);
      const opposite = angle.add(1).value >= 2 ? angle.sub(1) : angle.add(1);
      return problem({
        stem: `The point P has polar coordinates (${sg(radius)}, ${piText(angle)}).`,
        parts: [
          part(
            "In which quadrant is P?",
            ask.choice("Quadrant", QUADRANTS, quadrantName(opposite)),
          ),
          part(
            "Write polar coordinates (r, θ) for P with r > 0 and 0 ≤ θ < 2π.",
            ask.number("r =", -radius),
            ask.number("θ =", piText(opposite)),
          ),
        ],
        solution: [
          `Because r = ${sg(radius)} is negative, P is ${-radius} units from the origin in the direction opposite the ray θ = ${piText(angle)}. That is the ray θ = ${piText(angle)} ${angle.value < 1 ? "+" : "−"} π = ${piText(opposite)}, which is in Quadrant ${quadrantName(opposite)}.`,
          `Using the opposite direction gives a positive r: (${-radius}, ${piText(opposite)}).`,
        ],
        data: { radius, angle, opposite },
      });
    },
    verify({ data: { radius, angle, opposite } }) {
      assert(sameRect(rectOf(radius, angle), rectOf(-radius, opposite)), "same point");
      assert(opposite.value >= 0 && opposite.value < 2, "range");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "converting-coordinates",
    skill: "solve",
    make(r) {
      const axis = r.pick(AXIS);
      const angles = r.shuffle([...r.sample(OFF_AXIS, 2), axis]);
      const radii = r.distinctNonzero(-8, 8, 3);
      const rows = angles.map((angle, i) => {
        const radius = radii[i];
        const x = scaled("cos", angle, radius);
        const y = scaled("sin", angle, radius);
        return { angle, radius, x, y };
      });
      return problem({
        stem: "Convert each point from polar coordinates (r, θ) to rectangular coordinates (x, y). Write exact values.",
        parts: rows.map(({ angle, radius, x, y }) =>
          part(
            `Convert ${polarText(radius, angle)}.`,
            ask.number("x =", x.text),
            ask.number("y =", y.text),
          ),
        ),
        solution: rows.map(({ angle, radius, x, y }) => {
          const c = exact("cos", angle);
          const s = exact("sin", angle);
          return `x = r cos θ = ${pg(radius)}(${c.text}) = ${x.text}, and y = r sin θ = ${pg(radius)}(${s.text}) = ${y.text}.`;
        }),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { angle, radius, x, y } of rows) {
        const [px, py] = rectOf(radius, angle);
        assertNear(x.value, px, "x");
        assertNear(y.value, py, "y");
      }
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "converting-coordinates",
    skill: "solve",
    make(r) {
      const angle = r.pick(OFF_AXIS);
      const k = r.int(1, 6);
      const point = rectPoint(angle, k);
      const x = point.x.value;
      const y = point.y.value;
      const principal = arctanUnits(y, x);
      const direction = x < 0 ? principal.add(1) : principal;
      return problem({
        stem: `A point has rectangular coordinates (${point.x.text}, ${point.y.text}). Find its polar coordinates (r, θ) with r > 0 and −π/2 < θ < 3π/2.`,
        parts: [
          part("Find r.", ask.number("r =", point.r.text)),
          part("Find arctan(y/x).", ask.number("arctan(y/x) =", piText(principal))),
          part("Find θ.", ask.number("θ =", piText(direction))),
        ],
        solution: [
          `r = √(x² + y²) = √((${point.x.text})² + (${point.y.text})²) = √${point.n}${point.r.text === `√${point.n}` ? "" : ` = ${point.r.text}`}.`,
          `y/x = (${point.y.text})/(${point.x.text}) = ${point.tan}, and arctan(${point.tan}) = ${piText(principal)}.`,
          x < 0
            ? `Because x < 0, add π: θ = ${piText(principal)} + π = ${piText(direction)}.`
            : `Because x > 0, θ = arctan(y/x) = ${piText(direction)}.`,
        ],
        data: { point, principal, direction },
      });
    },
    verify({ data: { point, principal, direction } }) {
      const x = point.x.value;
      const y = point.y.value;
      assertNear(point.r.value, Math.hypot(x, y), "r");
      assertNear(principal.value * PI, Math.atan(y / x), "arctan");
      assert(sameRect(rectOf(point.r.value, direction), [x, y]), "round trip");
      assert(direction.value > -0.5 && direction.value < 1.5, "window");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "complex-numbers",
    skill: "construct-representations",
    make(r) {
      const angle = r.pick(OFF_AXIS);
      const radius = r.int(2, 9);
      const a = scaled("cos", angle, radius);
      const b = scaled("sin", angle, radius);
      return problem({
        stem: `The complex number z has polar coordinates (${radius}, ${piText(angle)}) in the complex plane, so z = ${radius} cos(${piText(angle)}) + i(${radius} sin(${piText(angle)})).`,
        parts: [
          part(
            "Write z in the form a + bi.",
            ask.number("a =", a.text),
            ask.number("b =", b.text),
          ),
          part(
            "In which quadrant of the complex plane is z?",
            ask.choice("Quadrant", QUADRANTS, quadrantName(angle)),
          ),
        ],
        solution: [
          `a = ${radius} cos(${piText(angle)}) = ${radius}(${exact("cos", angle).text}) = ${a.text}, and b = ${radius} sin(${piText(angle)}) = ${radius}(${exact("sin", angle).text}) = ${b.text}. So z = ${complexText(a, b)}.`,
          `The point (${a.text}, ${b.text}) is in Quadrant ${quadrantName(angle)}.`,
        ],
        data: { angle, radius, a, b },
      });
    },
    verify({ data: { angle, radius, a, b } }) {
      assertNear(a.value, radius * Math.cos(radians(angle)), "a");
      assertNear(b.value, radius * Math.sin(radians(angle)), "b");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "polar-coordinates",
    skill: "describe",
    make(r) {
      const angle = r.pick(OFF_AXIS);
      const R = r.int(2, 5);
      const c = Math.cos(radians(angle));
      const s = Math.sin(radians(angle));
      const opposite = angle.add(1).value >= 2 ? angle.sub(1) : angle.add(1);
      const x = scaled("cos", angle, -R);
      const y = scaled("sin", angle, -R);
      return problem({
        stem: `On the polar grid, the dashed ray is the ray θ = ${piText(angle)}. Point P is ${R} units from the origin on the line that contains the ray, but on the opposite side of the origin from the ray.`,
        blocks: [
          graph({
            caption: `Point P and the ray θ = ${piText(angle)}`,
            alt: `A polar grid. A dashed ray leaves the origin at the angle ${piText(angle)}. Point P is ${R} units from the origin in the opposite direction.`,
            window: { x: [-(R + 1), R + 1], y: [-(R + 1), R + 1] },
            ticks: { x: 1, y: 1 },
            grid: "polar",
            height: 432,
            segments: [
              {
                from: [0, 0],
                to: [(R + 0.8) * c, (R + 0.8) * s],
                dashed: true,
                color: 4,
                label: `θ = ${piText(angle)}`,
                labelAt: 0.6 * (R + 0.8) * c,
                labelPosition: c > 0 ? "e" : "w",
              },
            ],
            points: [
              {
                at: [-R * c, -R * s],
                label: "P",
                position: c > 0 ? "sw" : "se",
              },
            ],
          }),
        ],
        parts: [
          part(
            "Write polar coordinates (r, θ) for P using the angle θ of the dashed ray.",
            ask.number("r =", -R),
            ask.number("θ =", piText(angle)),
          ),
          part(
            "Write polar coordinates (r, θ) for P with r > 0 and 0 ≤ θ < 2π.",
            ask.number("r =", R),
            ask.number("θ =", piText(opposite)),
          ),
          part(
            "Find the rectangular coordinates (x, y) of P. Write exact values.",
            ask.number("x =", x.text),
            ask.number("y =", y.text),
          ),
        ],
        solution: [
          `P is on the line through the ray θ = ${piText(angle)}, but the opposite way from the ray, so r is negative: P = (${sg(-R)}, ${piText(angle)}).`,
          `Turning the direction around by π gives the same point with a positive r: (${R}, ${piText(opposite)}).`,
          `x = r cos θ = ${pg(-R)}(${exact("cos", angle).text}) = ${x.text}, and y = r sin θ = ${pg(-R)}(${exact("sin", angle).text}) = ${y.text}.`,
        ],
        data: { angle, R, opposite, x, y },
      });
    },
    verify({ data: { angle, R, opposite, x, y } }) {
      assert(sameRect(rectOf(-R, angle), rectOf(R, opposite)), "same point");
      assertNear(x.value, -R * Math.cos(radians(angle)), "x");
      assertNear(y.value, -R * Math.sin(radians(angle)), "y");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "converting-coordinates",
    skill: "solve",
    make(r) {
      const [a, b, h] = r.pick(TRIPLES);
      const [m, n] = r.chance() ? [a, b] : [b, a];
      const x = r.sign() * m;
      const y = r.sign() * n;
      const principal = Math.atan(y / x);
      const theta = x < 0 ? principal + PI : principal;
      return problem({
        stem: `A point has rectangular coordinates (${sg(x)}, ${sg(y)}). Find its polar coordinates (r, θ) with r > 0 and −π/2 < θ < 3π/2. Round angles to 3 decimal places.`,
        parts: [
          part("Find r.", ask.number("r =", h)),
          part(
            "Find arctan(y/x) in radians.",
            ask.number("arctan(y/x) =", Number(principal.toFixed(3)), { decimals: 3 }),
          ),
          part(
            "Find θ in radians.",
            ask.number("θ =", Number(theta.toFixed(3)), { decimals: 3 }),
          ),
        ],
        solution: [
          `r = √(x² + y²) = √(${pg(x)}² + ${pg(y)}²) = √${h * h} = ${h}.`,
          `arctan(y/x) = arctan(${sg(y)}/${pg(x)}) ≈ ${fx(principal, 3)}.`,
          x < 0
            ? `Because x < 0, add π: θ ≈ ${fx(principal, 3)} + π ≈ ${fx(theta, 3)}.`
            : `Because x > 0, θ = arctan(y/x) ≈ ${fx(theta, 3)}.`,
        ],
        data: { x, y, h, principal, theta },
      });
    },
    verify({ data: { x, y, h, theta } }) {
      assert(h * h === x * x + y * y, "triple");
      assertNear(h * Math.cos(theta), x, "x back", 1e-9);
      assertNear(h * Math.sin(theta), y, "y back", 1e-9);
      assert(theta > -PI / 2 && theta < (3 * PI) / 2, "window");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "converting-coordinates",
    skill: "apply-results",
    make(r) {
      const contexts = [
        {
          intro: (radius, angle) =>
            `A radar station sits at the origin of a map measured in kilometers, with the x-axis pointing east and the y-axis pointing north. A plane is detected at polar coordinates (${radius}, ${piText(angle)}).`,
          unit: "km",
          second: "A second plane is detected",
          axes: ["east", "west", "north", "south"],
        },
        {
          intro: (radius, angle) =>
            `A robot starts at the origin of a floor plan measured in meters, with the x-axis pointing east and the y-axis pointing north. A sensor places a beacon at polar coordinates (${radius}, ${piText(angle)}).`,
          unit: "meters",
          second: "A second beacon is located",
          axes: ["east", "west", "north", "south"],
        },
        {
          intro: (radius, angle) =>
            `A lookout at the origin of a park map, measured in meters, with the x-axis pointing east and the y-axis pointing north, spots a hiker at polar coordinates (${radius}, ${piText(angle)}).`,
          unit: "meters",
          second: "A second hiker is located",
          axes: ["east", "west", "north", "south"],
        },
      ];
      const ctx = r.pick(contexts);
      const angle = r.pick(OFF_AXIS);
      const radius = r.pick([10, 12, 16, 20, 24, 30, 40]);
      const x1 = scaled("cos", angle, radius);
      const y1 = scaled("sin", angle, radius);
      const [a, b, h] = r.pick(TRIPLES);
      const k = r.pick([1, 2, 3]);
      const [m, n] = r.chance() ? [a, b] : [b, a];
      const x2 = r.sign() * m * k;
      const y2 = r.sign() * n * k;
      const rad2 = h * k;
      let theta2 = Math.atan2(y2, x2);
      if (theta2 < 0) theta2 += 2 * PI;
      const where = (value, positive, negative) =>
        value.value >= 0 ? positive : negative;
      return problem({
        stem: ctx.intro(radius, angle),
        parts: [
          part(
            "Find the rectangular coordinates (x, y) of this object. Write exact values.",
            ask.number("x =", x1.text, { unit: ctx.unit }),
            ask.number("y =", y1.text, { unit: ctx.unit }),
          ),
          part(
            `${ctx.second} ${Math.abs(x2)} ${ctx.unit} ${where({ value: x2 }, "east", "west")} and ${Math.abs(y2)} ${ctx.unit} ${where({ value: y2 }, "north", "south")} of the origin. How far from the origin is it?`,
            ask.number("r =", rad2, { unit: ctx.unit }),
          ),
          part(
            "Find the angle θ of the second object, with 0 ≤ θ < 2π. Round to 2 decimal places.",
            ask.number("θ =", Number(theta2.toFixed(2)), {
              decimals: 2,
              unit: "radians",
            }),
          ),
        ],
        solution: [
          `x = r cos θ = ${radius} cos(${piText(angle)}) = ${radius}(${exact("cos", angle).text}) = ${x1.text}, and y = r sin θ = ${radius}(${exact("sin", angle).text}) = ${y1.text}.`,
          `The second object is at (${sg(x2)}, ${sg(y2)}), so r = √(${pg(x2)}² + ${pg(y2)}²) = √${rad2 * rad2} = ${rad2} ${ctx.unit}.`,
          x2 < 0
            ? `Because x < 0, θ = arctan(${sg(y2)}/${pg(x2)}) + π ≈ ${fx(theta2, 2)} radians.`
            : y2 < 0
              ? `Because x > 0, arctan(${sg(y2)}/${x2}) ≈ ${fx(Math.atan(y2 / x2), 2)} is negative. Adding 2π gives θ ≈ ${fx(theta2, 2)} radians.`
              : `Because x > 0, θ = arctan(${sg(y2)}/${x2}) ≈ ${fx(theta2, 2)} radians.`,
        ],
        data: { angle, radius, x1, y1, x2, y2, rad2, theta2 },
      });
    },
    verify({ data: { angle, radius, x1, y1, x2, y2, rad2, theta2 } }) {
      assertNear(x1.value, radius * Math.cos(radians(angle)), "x1");
      assertNear(y1.value, radius * Math.sin(radians(angle)), "y1");
      assertNear(rad2, Math.hypot(x2, y2), "r2");
      assertNear(rad2 * Math.cos(theta2), x2, "x2 back", 1e-9);
      assertNear(rad2 * Math.sin(theta2), y2, "y2 back", 1e-9);
      assert(theta2 >= 0 && theta2 < 2 * PI, "range");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "converting-coordinates",
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
      const kinds = r.sample(["same", "formula", "arctan", "general"], 3);
      const claims = kinds.map((kind, i) => {
        const truth = mask[i];
        if (kind === "same") {
          const radius = r.int(2, 9);
          const angle = r.pick(OFF_AXIS);
          const pool = truth
            ? [
                {
                  a: [-radius, angle],
                  b: [radius, angle.add(1)],
                  why: "A negative r puts the point on the opposite side of the origin, which is the same as adding π to θ and using the positive r.",
                },
                {
                  a: [radius, angle],
                  b: [radius, angle.add(2)],
                  why: "Adding 2π is one full turn, so the direction does not change.",
                },
                {
                  a: [radius, angle],
                  b: [-radius, angle.add(1)],
                  why: "A negative r and an extra π cancel: the point is on the same side of the origin as the ray θ.",
                },
              ]
            : [
                {
                  a: [radius, angle],
                  b: [-radius, angle],
                  why: "The sign of r reverses the direction, so these points are on opposite sides of the origin.",
                },
                {
                  a: [radius, angle],
                  b: [radius, angle.add(1)],
                  why: "Adding π to θ turns the direction around, so the second point is on the opposite side of the origin.",
                },
                {
                  a: [radius, angle],
                  b: [-radius, angle.add(2)],
                  why: "Adding 2π is a full turn and changes nothing, so the negative r still reverses the direction.",
                },
              ];
          const pick = r.pick(pool);
          return {
            text: `The polar coordinates ${polarText(...pick.a)} and ${polarText(...pick.b)} name the same point.`,
            truth,
            why: pick.why,
            check: () => sameRect(rectOf(...pick.a), rectOf(...pick.b)),
          };
        }
        if (kind === "formula") {
          const pool = truth
            ? [
                {
                  text: "If a point has polar coordinates (r, θ), then its rectangular coordinates are x = r cos θ and y = r sin θ.",
                  why: "These are the conversion formulas from polar to rectangular coordinates.",
                },
                {
                  text: "If a point has rectangular coordinates (x, y), then r² = x² + y².",
                  why: "r is the distance from the origin, so r² = x² + y² by the Pythagorean theorem.",
                },
              ]
            : [
                {
                  text: "If a point has polar coordinates (r, θ), then its rectangular coordinates are x = r sin θ and y = r cos θ.",
                  why: "The formulas are swapped: x = r cos θ and y = r sin θ. For (1, 0), x = 1 cos 0 = 1, not 1 sin 0 = 0.",
                },
                {
                  text: "If a point has rectangular coordinates (x, y), then r = x + y.",
                  why: "The distance from the origin is r = √(x² + y²). For (3, 4), r = 5, not 7.",
                },
              ];
          const pick = r.pick(pool);
          return { text: pick.text, truth, why: pick.why, check: () => truth };
        }
        if (kind === "arctan") {
          const k = r.int(1, 6);
          const sx = r.sign();
          const sy = r.sign();
          const x = sx * k;
          const y = sy * k;
          const correctUnits = unitsOf(Math.atan2(y, x));
          const principal = arctanUnits(y, x);
          const claimed = truth
            ? x < 0
              ? correctUnits
              : principal
            : x < 0
              ? principal
              : principal.add(1);
          const radiusText = radicalText(new Q(k), 2);
          return {
            text: `The point (${sg(x)}, ${sg(y)}) has polar coordinates (${radiusText}, ${piText(claimed)}).`,
            truth,
            why: truth
              ? x < 0
                ? `Because x < 0, add π to arctan(y/x) = ${piText(principal)}, giving ${piText(claimed)}. Check: ${radiusText} cos(${piText(claimed)}) = ${sg(x)} and ${radiusText} sin(${piText(claimed)}) = ${sg(y)}.`
                : `Because x > 0, arctan(y/x) = ${piText(principal)} is the correct direction, and r = √(${pg(x)}² + ${pg(y)}²) = ${radiusText}.`
              : x < 0
                ? `arctan(y/x) = ${piText(principal)} points into Quadrant ${y > 0 ? "IV" : "I"}, but this point is in Quadrant ${quadrantOf(x, y)} because x < 0. Add π to get ${piText(unitsOf(Math.atan2(y, x)))}.`
                : `Adding π is only for x < 0. This point has x > 0, so θ = arctan(y/x) = ${piText(principal)}, not ${piText(claimed)}.`,
            check: () => sameRect(rectOf(k * Math.SQRT2, claimed), [x, y]),
          };
        }
        const pool = truth
          ? [
              {
                text: "The origin can be written as (0, θ) for any angle θ.",
                why: "A point with r = 0 is at the origin whatever the direction is.",
              },
              {
                text: "In polar coordinates, r can be negative.",
                why: "A negative r means a displacement in the direction opposite the ray θ.",
              },
            ]
          : [
              {
                text: "Every point other than the origin has exactly one pair of polar coordinates (r, θ).",
                why: "Each point has many polar names, such as (r, θ), (r, θ + 2π), and (−r, θ + π).",
              },
              {
                text: "In polar coordinates, r must always be positive.",
                why: "A negative r is allowed. It means a displacement in the direction opposite the ray θ.",
              },
            ];
        const pick = r.pick(pool);
        return { text: pick.text, truth, why: pick.why, check: () => truth };
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
    concept: "complex-numbers",
    skill: "construct-representations",
    make(r) {
      const angle = r.pick(OFF_AXIS);
      const k = r.int(1, 6);
      const point = rectPoint(angle, k);
      const x = point.x.value;
      const y = point.y.value;
      const principal = arctanUnits(y, x);
      const direction = angle;
      return problem({
        stem: `Consider the complex number z = ${complexText(point.x, point.y)}.`,
        parts: [
          part(
            "Find the distance r from z to the origin of the complex plane.",
            ask.number("r =", point.r.text),
          ),
          part(
            "Find the angle θ of z, with 0 ≤ θ < 2π.",
            ask.number("θ =", piText(direction)),
          ),
          part(
            "In which quadrant of the complex plane is z?",
            ask.choice("Quadrant", QUADRANTS, quadrantOf(x, y)),
          ),
        ],
        solution: [
          `z is the point (${point.x.text}, ${point.y.text}), so r = √((${point.x.text})² + (${point.y.text})²) = √${point.n}${point.r.text === `√${point.n}` ? "" : ` = ${point.r.text}`}.`,
          x < 0
            ? `y/x = ${point.tan} and arctan(${point.tan}) = ${piText(principal)}. Because x < 0, add π: θ = ${piText(direction)}.`
            : y < 0
              ? `y/x = ${point.tan} and arctan(${point.tan}) = ${piText(principal)}. This is negative, so add 2π to get an angle between 0 and 2π: θ = ${piText(direction)}.`
              : `y/x = ${point.tan} and arctan(${point.tan}) = ${piText(principal)}. Because x > 0, θ = ${piText(direction)}.`,
          `With x ${x > 0 ? ">" : "<"} 0 and y ${y > 0 ? ">" : "<"} 0, z is in Quadrant ${quadrantOf(x, y)}. In polar form, z = ${point.r.text} cos(${piText(direction)}) + i(${point.r.text} sin(${piText(direction)})).`,
        ],
        data: { point, direction },
      });
    },
    verify({ data: { point, direction } }) {
      const x = point.x.value;
      const y = point.y.value;
      assertNear(point.r.value, Math.hypot(x, y), "r");
      assert(sameRect(rectOf(point.r.value, direction), [x, y]), "round trip");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "converting-coordinates",
    skill: "apply-results",
    make(r) {
      // A is on a diagonal ray with r = ±a√2; B is either another diagonal point or on an axis.
      const diagonal = [new Q(1, 4), new Q(3, 4), new Q(5, 4), new Q(7, 4)];
      const angleA = r.pick(diagonal);
      const a = r.int(1, 5) * r.sign();
      const cA = Math.sign(Math.cos(radians(angleA)));
      const sA = Math.sign(Math.sin(radians(angleA)));
      const xA = a * cA;
      const yA = a * sA;
      const rA = { text: radicalText(new Q(a), 2) };
      let angleB;
      let rB;
      let xB;
      let yB;
      if (r.chance()) {
        angleB = r.pick(diagonal.filter((q) => q.n !== angleA.n));
        const b = r.int(1, 5) * r.sign();
        rB = { text: radicalText(new Q(b), 2) };
        xB = b * Math.sign(Math.cos(radians(angleB)));
        yB = b * Math.sign(Math.sin(radians(angleB)));
      } else {
        angleB = r.pick(AXIS);
        const b = r.nonzero(-7, 7);
        rB = { text: sg(b) };
        xB = Math.round(b * Math.cos(radians(angleB))) + 0;
        yB = Math.round(b * Math.sin(radians(angleB))) + 0;
      }
      const dx = xA - xB;
      const dy = yA - yB;
      const d2 = dx * dx + dy * dy;
      if (d2 === 0) reject("same point");
      const distance = sqrtText(d2);
      const cosText = (angle) => exact("cos", angle).text;
      const sinText = (angle) => exact("sin", angle).text;
      const pt = (name, text, angle) => `${name}(${text}, ${piText(angle)})`;
      return problem({
        stem: `Two buoys are located by polar coordinates, in meters, from a dock at the origin: ${pt("A", rA.text, angleA)} and ${pt("B", rB.text, angleB)}.`,
        parts: [
          part(
            "Find the rectangular coordinates of A.",
            ask.number("x =", xA),
            ask.number("y =", yA),
          ),
          part(
            "Find the rectangular coordinates of B.",
            ask.number("x =", xB),
            ask.number("y =", yB),
          ),
          part(
            "Find the exact distance between the two buoys.",
            ask.number("distance =", distance, { unit: "meters" }),
          ),
        ],
        solution: [
          `x = r cos θ = (${rA.text})(${cosText(angleA)}) = ${sg(xA)}, and y = r sin θ = (${rA.text})(${sinText(angleA)}) = ${sg(yA)}. So A = (${sg(xA)}, ${sg(yA)}).`,
          `x = r cos θ = (${rB.text})(${cosText(angleB)}) = ${sg(xB)}, and y = r sin θ = (${rB.text})(${sinText(angleB)}) = ${sg(yB)}. So B = (${sg(xB)}, ${sg(yB)}).`,
          `The distance is √((${sg(xA)} − ${pg(xB)})² + (${sg(yA)} − ${pg(yB)})²) = √(${pg(dx)}² + ${pg(dy)}²) = √${d2}${distance === `√${d2}` ? "" : ` = ${distance}`} ${distance === "1" ? "meter" : "meters"}.`,
        ],
        data: { angleA, a, xA, yA, angleB, xB, yB, d2, distance },
      });
    },
    verify({ data: { angleA, a, xA, yA, angleB, xB, yB, d2 } }) {
      assertNear(a * Math.SQRT2 * Math.cos(radians(angleA)), xA, "xA");
      assertNear(a * Math.SQRT2 * Math.sin(radians(angleA)), yA, "yA");
      assertNear(Math.hypot(xA - xB, yA - yB), Math.sqrt(d2), "distance");
      assert(Number.isInteger(xB) && Number.isInteger(yB), "B integer");
    },
  },
];

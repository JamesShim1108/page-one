// Typed-answer problems for Topic 1.13. Each template draws new numbers for every
// variant. Data tables come from exact polynomial rules, and verify() recomputes the
// successive differences, domains, and maxima from the numbers shown to the student.

import {
  ask,
  part,
  problem,
  table,
  polyText,
  num,
  fixed,
  Poly,
  fnOf,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

// ---------- Successive differences ----------

const differences = (values) => values.slice(1).map((v, i) => v - values[i]);

// All the rows of successive differences until one row is constant (or runs out).
function differenceRows(values) {
  const rows = [];
  let current = values;
  while (current.length > 1) {
    current = differences(current);
    rows.push(current);
    if (current.every((v) => v === current[0])) break;
  }
  return rows;
}

const ordinal = ["zeroth", "1st", "2nd", "3rd", "4th", "5th"];
const rowName = (index) => `${ordinal[index + 1]} differences`;

function differenceLines(values) {
  const rows = differenceRows(values);
  const level = rows.length;
  const last = rows[level - 1];
  const lines = rows
    .slice(0, -1)
    .map((row, i) => `The ${rowName(i)} are ${row.map(num).join(", ")}.`);
  lines.push(
    `The ${rowName(level - 1)} are ${last.map(num).join(", ")}. They are all equal, so a polynomial of degree ${level} models the data, and the constant ${ordinal[level]} difference is ${num(last[0])}.`,
  );
  return { lines, level, constant: last[0] };
}

// Checks the shown values really have constant nth differences and no smaller level.
function assertDegree(values, degree, constant) {
  const rows = differenceRows(values);
  assert(rows.length === degree, `constant at level ${degree}, found ${rows.length}`);
  const last = rows[rows.length - 1];
  assert(last.length >= 2 && last.every((v) => v === constant), "constant difference");
  if (rows.length > 1)
    assert(
      !rows[rows.length - 2].every((v) => v === rows[rows.length - 2][0]),
      "lower level is not constant",
    );
}

const horizontalTable = (caption, xHeader, xs, yHeader, values) =>
  table(caption, [xHeader, ...xs.map(num)], [[yHeader, ...values.map(num)]]);

// A polynomial of the given degree with small whole-number coefficients, as a Poly.
function randomPolynomial(r, degree, leadRange = [-3, 3]) {
  const coefficients = [];
  for (let i = 0; i < degree; i += 1) coefficients.push(r.int(-6, 6));
  coefficients.push(r.nonzero(...leadRange));
  return new Poly(coefficients);
}

const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

// ---------- Contexts for choosing a function type ----------

const TYPES = ["Linear", "Quadratic", "Cubic", "Piecewise-defined"];

const CONTEXTS = [
  (r) => {
    const fee = r.int(15, 60);
    const rate = r.int(8, 25);
    return {
      key: "Linear",
      stem: `A tutoring service charges a registration fee of $${fee} plus $${rate} per hour of tutoring. A function models the total cost of tutoring as a function of the number of hours.`,
      reason: `The cost increases by the same $${rate} for every hour, so the rate of change is constant and a linear function is appropriate.`,
      degree: 1,
    };
  },
  (r) => {
    const P = r.pick([40, 60, 80, 100, 120]);
    return {
      key: "Quadratic",
      stem: `A rectangular garden is enclosed with ${P} meters of fencing. A function models the area of the garden as a function of its width.`,
      reason: `Area is a product of two dimensions. With a fixed perimeter, the area is w(${P / 2} − w), which is quadratic, and it has a unique maximum.`,
      degree: 2,
    };
  },
  (r) => {
    const L = r.pick([24, 30, 36, 40]);
    const W = r.pick([16, 18, 20, 24]);
    return {
      key: "Cubic",
      stem: `An open box is made from a ${L}-inch by ${W}-inch sheet of cardboard by cutting a square of side x inches from each corner and folding up the sides. A function models the volume of the box as a function of x.`,
      reason: `Volume involves three dimensions. The volume is x(${L} − 2x)(${W} − 2x), a product of three linear factors, so a cubic function is appropriate.`,
      degree: 3,
    };
  },
  (r) => {
    const m = r.int(2, 6);
    return {
      key: "Cubic",
      stem: `A storage box has a square base with side length x feet and a height that is ${m} feet more than the side length of the base. A function models the volume of the box as a function of x.`,
      reason: `Volume involves three dimensions. The volume is x · x · (x + ${m}) = x³ + ${m}x², a cubic function.`,
      degree: 3,
    };
  },
  (r) => {
    const v = r.pick([32, 48, 64]);
    const c = r.int(3, 8);
    return {
      key: "Quadratic",
      stem: `A ball is thrown upward from a height of ${c} feet. Its height is recorded at equal time intervals, and the heights rise to a single maximum and then fall in a roughly symmetric pattern. A function models the height of the ball as a function of time.`,
      reason:
        "The data are roughly symmetric with a unique maximum, which indicates a quadratic function.",
      degree: 2,
      speed: v,
    };
  },
  (r) => {
    const rate = r.int(2, 9);
    return {
      key: "Linear",
      stem: `A candle burns down at a constant rate of ${rate} millimeters per hour. A function models the height of the candle as a function of the number of hours it has burned.`,
      reason: `The height changes by the same ${rate} millimeters each hour, so the rate of change is constant and a linear function is appropriate.`,
      degree: 1,
    };
  },
  (r) => {
    const first = r.pick([4, 5, 6]);
    const after = r.pick([1, 2]);
    return {
      key: "Piecewise-defined",
      stem: `A parking garage charges $${first} per hour for the first 2 hours and $${after} per hour after that. A function models the total cost of parking as a function of the number of hours.`,
      reason: `The rate of change is $${first} per hour on the first interval and $${after} per hour on the second, so the function has different characteristics over different intervals. A piecewise-defined function is appropriate.`,
      degree: 0,
    };
  },
];

export const problems = [
  {
    id: "p01",
    tier: "quick",
    unit: true,
    concept: "choose-type",
    skill: "identify-information",
    make(r) {
      const context = r.pick(CONTEXTS)(r);
      return problem({
        stem: `${context.stem} Which type of function is the most appropriate model?`,
        parts: [ask.choice("Function type", TYPES, context.key)],
        solution: [
          context.reason,
          `So the most appropriate model is a ${context.key.toLowerCase()} function.`,
        ],
        data: { key: context.key, degree: context.degree },
      });
    },
    verify({ data: { key, degree } }) {
      const expected = { Linear: 1, Quadratic: 2, Cubic: 3, "Piecewise-defined": 0 }[key];
      assert(expected === degree, "type matches the degree of the described model");
    },
  },
  {
    id: "p02",
    tier: "quick",
    concept: "differences-and-degree",
    skill: "describe",
    make(r) {
      const degree = r.int(2, 4);
      const poly = randomPolynomial(
        r,
        degree,
        [1, 3].includes(degree) ? [-3, 3] : [-2, 2],
      );
      const xs = [0, 1, 2, 3, 4, 5];
      const values = xs.map((x) => poly.at(x).value);
      if (values.some((v) => Math.abs(v) > 400)) reject("values too large");
      const { lines, level, constant } = differenceLines(values);
      if (level !== degree) reject("lower-degree data");
      return problem({
        stem: "The table gives values of a function y at equally spaced values of x. The values are exactly modeled by a polynomial function.",
        blocks: [horizontalTable("Values of y", "x", xs, "y", values)],
        parts: [
          part(
            "What is the least degree of a polynomial function that models these data?",
            ask.number("Degree", degree),
          ),
          part(
            `What is the constant ${ordinal[degree]} difference?`,
            ask.number("Constant difference", constant),
          ),
        ],
        solution: lines,
        data: { values, degree, constant },
      });
    },
    verify({ data: { values, degree, constant } }) {
      assertDegree(values, degree, constant);
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "assumptions-restrictions",
    skill: "describe",
    make(r) {
      const P = r.pick([40, 60, 80, 100, 120, 160]);
      const half = P / 2;
      const top = (P / 4) ** 2;
      const noun = r.pick(["pen", "garden", "play area"]);
      const rule = `A(w) = w(${half} − w)`;
      return problem({
        stem: `A farmer uses all ${P} meters of fencing to enclose a rectangular ${noun} with width w meters. The area of the ${noun} in square meters is modeled by ${rule}. The model is meaningful only for values of w for which the ${noun} has positive area.`,
        parts: [
          part(
            "Write an appropriate domain for the model in interval notation.",
            ask.interval("Domain", `(0, ${half})`),
          ),
          part(
            "Write the corresponding range of the model in interval notation.",
            ask.interval("Range", `(0, ${top}]`),
          ),
        ],
        solution: [
          `The width must be positive, and the length is ${half} − w, which must also be positive. So 0 < w < ${half}, and the domain is (0, ${half}).`,
          `The graph of A is a parabola that opens downward with zeros at w = 0 and w = ${half}. Its maximum is at w = ${half / 2}, where A(${half / 2}) = ${half / 2}(${half / 2}) = ${top}. The area is positive on the domain, so the range is (0, ${top}].`,
        ],
        data: { half, top },
      });
    },
    verify({ data: { half, top } }) {
      const f = (w) => w * (half - w);
      let max = -Infinity;
      for (let w = 0.001; w < half; w += 0.001) max = Math.max(max, f(w));
      assertNear(max, top, "maximum area", 1e-6);
      assert(f(0) === 0 && f(half) === 0, "zeros of A");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "piecewise-models",
    skill: "apply-results",
    make(r) {
      const breakpoint = r.pick([2, 3, 4]);
      const first = r.pick([2, 3, 4, 5, 6]);
      const after = r.pick([1, 1.5, 2].filter((v) => v < first));
      const noun = r.pick([
        ["parking garage", "parking", "hours"],
        ["bike rental shop", "rental", "hours"],
        ["campground", "camping", "days"],
      ]);
      const [place, thing, unit] = noun;
      const cost = (t) =>
        t <= breakpoint ? first * t : first * breakpoint + after * (t - breakpoint);
      const t1 = r.pick([1, 1.5, 2].filter((t) => t < breakpoint));
      const t2 = breakpoint + r.int(2, 4);
      return problem({
        stem: `A ${place} charges $${first} per ${unit.slice(0, -1)} for the first ${breakpoint} ${unit} of ${thing} and $${num(after)} per ${unit.slice(0, -1)} for each ${unit.slice(0, -1)} after that. Let C(t) be the total cost, in dollars, of t ${unit} of ${thing}.`,
        parts: [
          part(
            `Find C(${num(t1)}).`,
            ask.number(`C(${num(t1)}) =`, cost(t1), { unit: "dollars" }),
          ),
          part(
            `Find C(${num(t2)}).`,
            ask.number(`C(${num(t2)}) =`, cost(t2), { unit: "dollars" }),
          ),
        ],
        solution: [
          `For 0 ≤ t ≤ ${breakpoint}, C(t) = ${first}t. Since ${num(t1)} ≤ ${breakpoint}, C(${num(t1)}) = ${first}(${num(t1)}) = ${num(cost(t1))} dollars.`,
          `For t > ${breakpoint}, C(t) = ${first * breakpoint} + ${num(after)}(t − ${breakpoint}). So C(${num(t2)}) = ${first * breakpoint} + ${num(after)}(${num(t2 - breakpoint)}) = ${num(cost(t2))} dollars.`,
        ],
        data: {
          first,
          after,
          breakpoint,
          answers: [
            [t1, cost(t1)],
            [t2, cost(t2)],
          ],
        },
      });
    },
    verify({ data: { first, after, breakpoint, answers } }) {
      // Charge each unit of time at its own rate and add them up.
      for (const [t, expected] of answers) {
        const total =
          first * Math.min(t, breakpoint) + after * Math.max(t - breakpoint, 0);
        assertNear(total, expected, `cost of ${t}`, 1e-9);
      }
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "differences-and-degree",
    skill: "apply-results",
    make(r) {
      const degree = r.int(3, 4);
      const poly = randomPolynomial(r, degree, [-2, 2]);
      const xs = [0, 1, 2, 3, 4, 5, 6];
      const values = xs.map((x) => poly.at(x).value);
      if (values.some((v) => Math.abs(v) > 900)) reject("values too large");
      const next = poly.at(7).value;
      const { lines, level, constant } = differenceLines(values);
      if (level !== degree) reject("lower-degree data");
      const lead = poly.lead.value;
      return problem({
        stem: "The table gives values of a function y at equally spaced values of x. The values are exactly modeled by a polynomial function.",
        blocks: [horizontalTable("Values of y", "x", xs, "y", values)],
        parts: [
          part(
            "What is the least degree of a polynomial function that models these data?",
            ask.number("Degree", degree),
          ),
          part(
            `The constant ${ordinal[degree]} difference of a polynomial of degree n with leading coefficient a is n! · a. Find the leading coefficient of the polynomial model.`,
            ask.number("Leading coefficient", lead),
          ),
          part(
            "Use the model to find the value of y when x = 7.",
            ask.number("y(7) =", next),
          ),
        ],
        solution: [
          ...lines,
          `The leading coefficient satisfies ${degree}! · a = ${num(constant)}, so a = ${num(constant)}/${factorial(degree)} = ${num(lead)}.`,
          `To find y(7), extend the difference table: the next ${ordinal[degree]} difference is also ${num(constant)}, and working back up through the rows gives y(7) = ${num(next)}.`,
        ],
        data: { values, degree, constant, next, lead, poly },
      });
    },
    verify({ data: { values, degree, constant, next, lead, poly } }) {
      assertDegree(values, degree, constant);
      assert(constant === factorial(degree) * lead, "constant difference equals n! · a");
      // Extend the differences one row at a time and compare with the polynomial's value.
      const rows = [values, ...differenceRows(values)];
      rows[rows.length - 1].push(constant);
      for (let level = rows.length - 2; level >= 0; level -= 1) {
        const last = rows[level][rows[level].length - 1];
        const step = rows[level + 1][rows[level + 1].length - 1];
        rows[level].push(last + step);
      }
      assert(rows[0][rows[0].length - 1] === next, "extended table gives y(7)");
      assert(poly.at(7).value === next, "polynomial gives y(7)");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "differences-and-degree",
    skill: "support-conclusions",
    make(r) {
      const degree = r.int(2, 3);
      const poly = randomPolynomial(r, degree, [-3, 3]);
      const step = r.pick([2, 5, 10]);
      const start = r.pick([1990, 2000, 2010, 0]);
      const xs = [0, 1, 2, 3, 4, 5].map((u) => start + u * step);
      const values = [0, 1, 2, 3, 4, 5].map((u) => poly.at(u).value);
      if (values.some((v) => Math.abs(v) > 300)) reject("values too large");
      const { lines, level, constant } = differenceLines(values);
      if (level !== degree) reject("lower-degree data");
      const subject = r.pick([
        "the number of subscribers, in thousands, of a streaming service",
        "the number of residents, in hundreds, of a town",
        "the number of students enrolled at a school",
      ]);
      const yearly = start !== 0;
      return problem({
        stem: `The table gives ${subject} at equally spaced ${yearly ? "years" : "times"}. The values are exactly modeled by a polynomial function.`,
        blocks: [
          horizontalTable("Values of N", yearly ? "Year" : "Time", xs, "N", values),
        ],
        parts: [
          part(
            "What is the least degree of a polynomial function that models these data?",
            ask.number("Degree", degree),
          ),
          part(
            "Is the leading coefficient of the polynomial model positive or negative?",
            ask.choice(
              "Leading coefficient",
              ["Positive", "Negative"],
              poly.lead.value > 0 ? "Positive" : "Negative",
            ),
          ),
        ],
        solution: [
          `The input values are equally spaced, ${step} apart, so the differences can be compared.`,
          ...lines,
          `The constant ${ordinal[degree]} difference is ${num(constant)}, which is ${constant > 0 ? "positive" : "negative"}, so the leading coefficient is ${constant > 0 ? "positive" : "negative"}.`,
        ],
        data: { values, degree, constant },
      });
    },
    verify({ data: { values, degree, constant } }) {
      assertDegree(values, degree, constant);
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "piecewise-models",
    skill: "describe",
    make(r) {
      const breakpoint = r.int(3, 5);
      const m1 = r.nonzero(-4, 6);
      let m2 = r.nonzero(-4, 6);
      if (m2 === m1) m2 = m1 + r.pick([2, -2, 3]);
      const y0 = r.int(0, 20);
      const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const values = xs.map((x) =>
        x <= breakpoint ? y0 + m1 * x : y0 + m1 * breakpoint + m2 * (x - breakpoint),
      );
      if (values.some((v) => v < 0)) reject("negative amount of water");
      return problem({
        stem: "The table gives the amount of water in a tank, in gallons, x minutes after a valve is opened. The tank changes at one constant rate at first and at a different constant rate later.",
        blocks: [
          horizontalTable("Water in the tank", "x (minutes)", xs, "Gallons", values),
        ],
        parts: [
          part(
            "Find the rate of change, in gallons per minute, before the rate changes.",
            ask.number("Rate", m1, { unit: "gallons per minute" }),
          ),
          part(
            "Find the rate of change, in gallons per minute, after the rate changes.",
            ask.number("Rate", m2, { unit: "gallons per minute" }),
          ),
          part(
            "At what value of x does the rate of change change?",
            ask.number("x =", breakpoint, { unit: "minutes" }),
          ),
        ],
        solution: [
          `The first differences are ${differences(values).map(num).join(", ")}.`,
          `The first differences equal ${num(m1)} for the first ${breakpoint} intervals and ${num(m2)} after that. So the rate is ${num(m1)} gallons per minute at first and ${num(m2)} gallons per minute later.`,
          `The rate changes at x = ${breakpoint} minutes, so a piecewise-defined function with two linear pieces models the data.`,
        ],
        data: { values, breakpoint, m1, m2 },
      });
    },
    verify({ data: { values, breakpoint, m1, m2 } }) {
      const d = differences(values);
      d.forEach((v, i) => assert(v === (i < breakpoint ? m1 : m2), `difference ${i}`));
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "piecewise-models",
    skill: "solve",
    make(r) {
      const c = r.int(-2, 3);
      const m = r.nonzero(-4, 4);
      const n = r.int(-6, 6);
      const p = r.nonzero(-3, 3);
      const q = r.int(-6, 6);
      const left = (x) => m * x + n;
      const right = (x) => (x - p) ** 2 + q;
      const f = (x) => (x < c ? left(x) : right(x));
      const inputs = [c - 2, c, c + 3];
      const leftText = polyText([m, n]);
      const rightText = `(x ${p > 0 ? "−" : "+"} ${Math.abs(p)})²${q === 0 ? "" : ` ${q < 0 ? "−" : "+"} ${Math.abs(q)}`}`;
      return problem({
        stem: `The function f is defined by f(x) = ${leftText} for x < ${num(c)}, and f(x) = ${rightText} for x ≥ ${num(c)}.`,
        parts: inputs.map((x) =>
          part(`Find f(${num(x)}).`, ask.number(`f(${num(x)}) =`, f(x))),
        ),
        solution: inputs.map((x) =>
          x < c
            ? `Since ${num(x)} < ${num(c)}, use the first rule: f(${num(x)}) = ${num(m)}(${num(x)}) ${n < 0 ? "−" : "+"} ${Math.abs(n)} = ${num(f(x))}.`
            : `Since ${num(x)} ≥ ${num(c)}, use the second rule: f(${num(x)}) = (${num(x)} ${p > 0 ? "−" : "+"} ${Math.abs(p)})²${q === 0 ? "" : ` ${q < 0 ? "−" : "+"} ${Math.abs(q)}`} = ${num(f(x))}.`,
        ),
        data: { c, m, n, p, q, inputs },
      });
    },
    verify({ data: { c, m, n, p, q, inputs } }) {
      const first = fnOf(polyText([m, n]));
      const second = fnOf(
        `(x ${p > 0 ? "−" : "+"} ${Math.abs(p)})² ${q < 0 ? "−" : "+"} ${Math.abs(q)}`,
      );
      assert(inputs.length === 3, "three inputs");
      assert(
        first(c - 2) === m * (c - 2) + n && second(c) === (c - p) ** 2 + q,
        "rules agree",
      );
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "assumptions-restrictions",
    skill: "describe",
    make(r) {
      const v = r.pick([16, 24, 32, 40, 48, 56]);
      const c = r.int(3, 9);
      const landing = (v + Math.sqrt(v * v + 64 * c)) / 32;
      const peak = c + (v * v) / 64;
      const rule = `h(t) = −16t² + ${v}t + ${c}`;
      return problem({
        stem: `A ball is thrown upward from a height of ${c} feet. The height of the ball, in feet, t seconds after it is thrown is modeled by ${rule}. The model assumes that only gravity acts on the ball, and it is meaningful from the moment the ball is thrown until the ball lands.`,
        parts: [
          part(
            "Write an appropriate domain for the model in interval notation. Round to three decimal places.",
            ask.interval("Domain", `[0, ${fixed(landing, 3)}]`, { decimals: 3 }),
          ),
          part(
            "Write the corresponding range of the model in interval notation.",
            ask.interval("Range", `[0, ${num(peak)}]`, { decimals: 3 }),
          ),
        ],
        solution: [
          `The ball is thrown at t = 0 and lands when h(t) = 0. Solving −16t² + ${v}t + ${c} = 0 gives t ≈ ${fixed(landing, 3)} seconds, so the domain is [0, ${fixed(landing, 3)}].`,
          `The graph of h is a parabola that opens downward, so the maximum is at t = ${num(v / 32)}: h(${num(v / 32)}) = ${num(peak)} feet. The ball ends at height 0 feet, so the range is [0, ${num(peak)}].`,
        ],
        data: { v, c, landing, peak },
      });
    },
    verify({ data: { v, c, landing, peak } }) {
      const h = (t) => -16 * t * t + v * t + c;
      assertNear(h(landing), 0, "ball lands", 1e-9);
      let max = -Infinity;
      for (let t = 0; t <= landing; t += 0.0005) max = Math.max(max, h(t));
      assertNear(max, peak, "maximum height", 1e-6);
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "assumptions-restrictions",
    skill: "apply-results",
    make(r) {
      const L = r.pick([24, 30, 36, 40, 48]);
      const W = r.pick([16, 18, 20, 24, 28]);
      if (L === W) reject("square sheet");
      const side = Math.min(L, W) / 2;
      const V = (x) => x * (L - 2 * x) * (W - 2 * x);
      // Maximum of V on (0, side): solve V′(x) = 12x² − 4(L + W)x + LW = 0.
      const sum = L + W;
      const root = (4 * sum - Math.sqrt(16 * sum * sum - 48 * L * W)) / 24;
      const maximum = V(root);
      return problem({
        stem: `An open box is made from a ${L}-inch by ${W}-inch sheet of cardboard by cutting a square of side x inches from each corner and folding up the sides. The volume of the box, in cubic inches, is modeled by V(x) = x(${L} − 2x)(${W} − 2x). The model is meaningful only for values of x for which the box has positive volume.`,
        parts: [
          part(
            "Write an appropriate domain for the model in interval notation.",
            ask.interval("Domain", `(0, ${side})`),
          ),
          part(
            "Use technology to find the maximum volume of the box. Round to three decimal places.",
            ask.number("Maximum volume", Number(fixed(maximum, 3)), {
              decimals: 3,
              unit: "cubic inches",
            }),
          ),
        ],
        solution: [
          `The side of each cut square must be positive, and the shorter side of the sheet is ${Math.min(L, W)} inches, so ${Math.min(L, W)} − 2x > 0. So 0 < x < ${side}, and the domain is (0, ${side}).`,
          `Graph V on this domain and find the maximum. It occurs at x ≈ ${fixed(root, 3)} inches, where V ≈ ${fixed(maximum, 3)} cubic inches.`,
        ],
        data: { L, W, side, root, maximum },
      });
    },
    verify({ data: { L, W, side, root, maximum } }) {
      const V = (x) => x * (L - 2 * x) * (W - 2 * x);
      let best = -Infinity;
      for (let x = 0; x <= side; x += 0.0002) best = Math.max(best, V(x));
      assertNear(best, maximum, "maximum volume", 1e-6);
      assert(V(0) === 0 && V(side) === 0, "volume is 0 at both ends");
      assert(root > 0 && root < side, "maximum lies inside the domain");
    },
  },
];

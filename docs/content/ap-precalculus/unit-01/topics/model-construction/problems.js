// Typed-answer problems for Topic 1.14. Each template draws new numbers for every
// variant. Models are built from exact conditions, regressions are solved from the
// normal equations, and verify() checks every model against the conditions it was
// built from.

import {
  ask,
  part,
  problem,
  table,
  polyText,
  factorText,
  num,
  fixed,
  signed,
  par,
  Poly,
  Q,
  fnOf,
  assert,
  assertNear,
  reject,
  lead,
  byRoot,
  factorsText,
} from "../../../../practice-kit/index.js";

const distinct = (r, count, lo = -4, hi = 4) => r.distinctNonzero(lo, hi, count);

const standard = (poly) => polyText([...poly.c].reverse().map((q) => q.value));

const horizontalTable = (caption, xHeader, xs, yHeader, values) =>
  table(caption, [xHeader, ...xs.map(num)], [[yHeader, ...values.map(num)]]);

// ---------- Least squares ----------

// Solves the normal equations for a polynomial of the given degree. Returns the
// coefficients from the constant term up, in full double precision.
function fitPolynomial(xs, ys, degree) {
  const size = degree + 1;
  const matrix = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) =>
      xs.reduce((sum, x) => sum + x ** (row + col), 0),
    ),
  );
  const vector = Array.from({ length: size }, (_, row) =>
    xs.reduce((sum, x, i) => sum + ys[i] * x ** row, 0),
  );
  for (let col = 0; col < size; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < size; row += 1)
      if (Math.abs(matrix[row][col]) > Math.abs(matrix[pivot][col])) pivot = row;
    [matrix[col], matrix[pivot]] = [matrix[pivot], matrix[col]];
    [vector[col], vector[pivot]] = [vector[pivot], vector[col]];
    for (let row = col + 1; row < size; row += 1) {
      const factor = matrix[row][col] / matrix[col][col];
      for (let k = col; k < size; k += 1) matrix[row][k] -= factor * matrix[col][k];
      vector[row] -= factor * vector[col];
    }
  }
  const out = Array(size).fill(0);
  for (let row = size - 1; row >= 0; row -= 1) {
    let sum = vector[row];
    for (let k = row + 1; k < size; k += 1) sum -= matrix[row][k] * out[k];
    out[row] = sum / matrix[row][row];
  }
  return out;
}

const evaluate = (coefficients, x) =>
  coefficients.reduceRight((sum, c) => sum * x + c, 0);

// The fit must make every residual orthogonal to 1, x, ..., x^degree.
function assertLeastSquares(xs, ys, coefficients) {
  for (let power = 0; power < coefficients.length; power += 1) {
    const total = xs.reduce(
      (sum, x, i) => sum + (ys[i] - evaluate(coefficients, x)) * x ** power,
      0,
    );
    assert(Math.abs(total) < 1e-6, `residuals are orthogonal to x^${power}`);
  }
}

// A number rounded to three places, as a number.
const three = (value) => Number(value.toFixed(3));

// ---------- Equations in a, b, c ----------

// "4a + 2b + c" from the coefficients [4, 2, 1].
function combination(coefficients, names = ["a", "b", "c"]) {
  let out = "";
  coefficients.forEach((value, index) => {
    if (value === 0) return;
    const size = Math.abs(value);
    const body = `${size === 1 ? "" : size}${names[index]}`;
    if (!out) out = value < 0 ? `−${body}` : body;
    else out += value < 0 ? ` − ${body}` : ` + ${body}`;
  });
  return out || "0";
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "build-from-conditions",
    skill: "construct-functions",
    make(r) {
      const roots = distinct(r, 3);
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const sortedRoots = [...roots].sort((x, y) => x - y);
      const poly = Poly.fromRoots(a, sortedRoots);
      const y0 = poly.at(0).value;
      const list = sortedRoots.map(num);
      const factored = `${lead(a)}${factorsText(byRoot(sortedRoots))}`;
      return problem({
        stem: `A cubic polynomial function p has real zeros at x = ${list[0]}, x = ${list[1]}, and x = ${list[2]}. The graph of p has y-intercept (0, ${num(y0)}).`,
        parts: [
          part(
            "Find the leading coefficient of p.",
            ask.number("Leading coefficient", a),
          ),
          part(
            "Write p(x) in standard form.",
            ask.expr("p(x) =", standard(poly), { form: "expanded" }),
          ),
        ],
        solution: [
          `Because p has zeros at ${list.join(", ")}, p(x) = a${factorsText(byRoot(sortedRoots))} for some constant a.`,
          `Since p(0) = ${num(y0)}: a(${num(-sortedRoots[0])})(${num(-sortedRoots[1])})(${num(-sortedRoots[2])}) = ${num(y0)}, so ${num(y0 / a)}a = ${num(y0)} and a = ${num(a)}.`,
          `So p(x) = ${factored}. Multiplying out gives p(x) = ${standard(poly)}.`,
        ],
        data: { roots: sortedRoots, a, y0, poly },
      });
    },
    verify({ data: { roots, a, y0, poly } }) {
      for (const x of roots) assert(poly.at(x).isZero, `p(${x}) = 0`);
      assert(
        poly.at(0).value === y0 && poly.lead.value === a && poly.degree === 3,
        "conditions",
      );
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "build-from-conditions",
    skill: "solve",
    make(r) {
      const xs = r.pick([
        [0, 1, 2],
        [-1, 0, 1],
        [0, 1, 3],
        [-2, -1, 0],
        [1, 2, 3],
        [-1, 1, 2],
      ]);
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const b = r.int(-6, 6);
      const c = r.int(-6, 6);
      const ys = xs.map((x) => a * x * x + b * x + c);
      const points = xs.map((x, i) => `(${num(x)}, ${num(ys[i])})`);
      const equations = xs.map((x, i) => `${combination([x * x, x, 1])} = ${num(ys[i])}`);
      const [x1, x2, x3] = xs;
      const [y1, y2, y3] = ys;
      return problem({
        stem: `A quadratic function model has the form y = ax² + bx + c. Its graph passes through ${points[0]}, ${points[1]}, and ${points[2]}.`,
        parts: [
          part(
            "Find the values of a, b, and c.",
            ask.number("a =", a),
            ask.number("b =", b),
            ask.number("c =", c),
          ),
        ],
        solution: [
          `Substitute each point into y = ax² + bx + c to get three equations: ${equations.join("; ")}.`,
          `Subtract the first equation from the second and from the third to eliminate c: ${combination([x2 * x2 - x1 * x1, x2 - x1], ["a", "b"])} = ${num(y2 - y1)} and ${combination([x3 * x3 - x1 * x1, x3 - x1], ["a", "b"])} = ${num(y3 - y1)}.`,
          `Solving these two equations gives a = ${num(a)} and b = ${num(b)}. Then the first equation gives c = ${num(c)}.`,
          `The model is y = ${polyText([a, b, c])}.`,
        ],
        data: { xs, ys, a, b, c },
      });
    },
    verify({ data: { xs, ys, a, b, c } }) {
      xs.forEach((x, i) => assert(a * x * x + b * x + c === ys[i], `point ${i}`));
      // The three points must determine the quadratic uniquely.
      const [x1, x2, x3] = xs;
      assert(x1 !== x2 && x2 !== x3 && x1 !== x3, "distinct inputs");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "build-from-parent",
    skill: "construct-functions",
    make(r) {
      const half = r.chance(0.35);
      const a = half ? new Q(-1, 2) : new Q(r.pick([-1, -2, -3]));
      const h = half ? r.pick([2, 4]) : r.int(2, 5);
      const k = r.int(6, 14);
      const y0 = Q.of(k).add(a.mul(h * h));
      if (y0.value < 1 || !y0.isInteger) reject("nozzle height is not a clean value");
      const options = [-3, -2, -1, 1, 2, 3].filter(
        (d) => Math.abs(d) !== h && a.mul(d * d).isInteger,
      );
      if (!options.length) reject("no clean second point");
      const d = r.pick(options);
      const x2 = h + d;
      const second = Q.of(k).add(a.mul(d * d));
      if (second.value < 1) reject("below the ground");
      const aText = a.toString().replace("-", "−");
      const feet = (value) => `${num(value)} ${value === 1 ? "foot" : "feet"}`;
      return problem({
        stem: `Water from a fountain follows a parabolic path. Let x be the horizontal distance, in feet, from the nozzle and y the height, in feet, above the ground. The highest point of the path is (${h}, ${k}), and the water leaves the nozzle at (0, ${num(y0.value)}). The path is modeled by y = a(x − ${h})² + ${k}.`,
        parts: [
          part("Find the value of a.", ask.number("a =", a)),
          part(
            `Use the model to find the height of the water, in feet, when x = ${x2}.`,
            ask.number(`y(${x2}) =`, second, { unit: "feet" }),
          ),
        ],
        solution: [
          `The path passes through (0, ${num(y0.value)}), so ${num(y0.value)} = a(0 − ${h})² + ${k}. Then ${num(y0.value - k)} = ${h * h}a, and a = ${aText}.`,
          `So y = ${aText}(x − ${h})² + ${k}. When x = ${x2}, y = ${aText}(${x2} − ${h})² + ${k} = ${feet(second.value)}.`,
        ],
        data: { a: a.value, h, k, y0: y0.value, x2, second: second.value },
      });
    },
    verify({ data: { a, h, k, y0, x2, second } }) {
      assertNear(a * (0 - h) ** 2 + k, y0, "nozzle", 1e-9);
      assertNear(a * (x2 - h) ** 2 + k, second, "second point", 1e-9);
      assert(a < 0, "opens downward");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "rational-models",
    skill: "construct-functions",
    make(r) {
      if (r.chance(0.5)) {
        const [d1, d2] = r.sample([2, 3, 4, 5, 6], 2);
        const m = r.int(1, 3);
        const k = m * (d1 * d2) ** 2;
        const I1 = m * d2 * d2;
        const I2 = m * d1 * d1;
        return problem({
          stem: `The intensity I of light from a point source is inversely proportional to the square of the distance d from the source, so I(d) = k/d², where I is in lux and d is in meters. At a distance of ${d1} meters, the intensity is ${I1} lux.`,
          parts: [
            part("Find the value of k.", ask.number("k =", k)),
            part(
              `Use the model to find the intensity at a distance of ${d2} meters.`,
              ask.number(`I(${d2}) =`, I2, { unit: "lux" }),
            ),
          ],
          solution: [
            `Since I(${d1}) = ${I1}: ${I1} = k/${d1}² = k/${d1 * d1}, so k = ${I1} · ${d1 * d1} = ${num(k)}.`,
            `So I(d) = ${num(k)}/d². At d = ${d2}, I(${d2}) = ${num(k)}/${d2 * d2} = ${num(I2)} lux.`,
          ],
          data: { kind: "square", d1, d2, I1, I2, k },
        });
      }
      const n1 = r.pick([2, 3, 4, 5, 6]);
      const t1 = r.pick([6, 8, 10, 12, 15]);
      const k = n1 * t1;
      const options = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20].filter(
        (n) => n !== n1 && k % n === 0,
      );
      const n2 = r.pick(options);
      const t2 = k / n2;
      return problem({
        stem: `The time t, in hours, needed to repaint a school is inversely proportional to the number n of painters, so t(n) = k/n. With ${n1} painters, the job takes ${t1} hours.`,
        parts: [
          part("Find the value of k.", ask.number("k =", k)),
          part(
            `Use the model to find the time the job takes with ${n2} painters.`,
            ask.number(`t(${n2}) =`, t2, { unit: "hours" }),
          ),
        ],
        solution: [
          `Since t(${n1}) = ${t1}: ${t1} = k/${n1}, so k = ${t1} · ${n1} = ${k}.`,
          `So t(n) = ${k}/n. With ${n2} painters, t(${n2}) = ${k}/${n2} = ${num(t2)} hours.`,
        ],
        data: { kind: "inverse", n1, t1, n2, t2, k },
      });
    },
    verify({ data }) {
      if (data.kind === "square") {
        assertNear(data.k / data.d1 ** 2, data.I1, "first reading");
        assertNear(data.k / data.d2 ** 2, data.I2, "second reading");
      } else {
        assertNear(data.k / data.n1, data.t1, "first reading");
        assertNear(data.k / data.n2, data.t2, "second reading");
      }
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "regression-technology",
    skill: "construct-functions",
    make(r) {
      const a0 = r.pick([0.5, 0.8, 1.2, 1.5, 2]);
      const b0 = r.int(-3, 5);
      const c0 = r.int(1, 8);
      const xs = [0, 1, 2, 3, 4, 5];
      const ys = xs.map((x) =>
        Number((a0 * x * x + b0 * x + c0 + r.int(-4, 4) / 10).toFixed(1)),
      );
      const [c, b, a] = fitPolynomial(xs, ys, 2);
      const predicted = evaluate([c, b, a], 6);
      if (Math.abs(a) < 0.2) reject("nearly linear");
      const context = r.pick([
        [
          "The table gives the height, in centimeters, of a plant x weeks after it is measured for the first time.",
          "Height",
        ],
        [
          "The table gives the number of visitors, in hundreds, to a museum exhibit x days after it opens.",
          "Visitors",
        ],
        [
          "The table gives the amount of a medicine, in milligrams, in a patient's body x hours after a dose.",
          "Amount",
        ],
      ]);
      return problem({
        stem: `${context[0]} Use technology to find a quadratic regression model y = ax² + bx + c for the data. Do not round any intermediate values.`,
        blocks: [horizontalTable("The data", "x", xs, context[1], ys)],
        parts: [
          part(
            "Find the values of a, b, and c. Round each to three decimal places.",
            ask.number("a =", three(a), { decimals: 3 }),
            ask.number("b =", three(b), { decimals: 3 }),
            ask.number("c =", three(c), { decimals: 3 }),
          ),
          part(
            "Use the regression model to predict y when x = 6. Round to three decimal places.",
            ask.number("y(6) =", three(predicted), { decimals: 2 }),
          ),
        ],
        solution: [
          `Enter the data into the calculator's lists and run a quadratic regression. The model is y ≈ ${fixed(a, 3)}x² ${b < 0 ? "−" : "+"} ${fixed(Math.abs(b), 3)}x ${c < 0 ? "−" : "+"} ${fixed(Math.abs(c), 3)}.`,
          `Store the full-precision constants and evaluate at x = 6: y(6) ≈ ${fixed(predicted, 3)}. Rounding the constants first can change the third decimal place.`,
        ],
        data: { xs, ys, coefficients: [c, b, a], predicted },
      });
    },
    verify({ data: { xs, ys, coefficients, predicted } }) {
      assertLeastSquares(xs, ys, coefficients);
      assertNear(evaluate(coefficients, 6), predicted, "prediction", 1e-9);
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "regression-technology",
    skill: "apply-results",
    make(r) {
      const context = r.pick([
        {
          stem: "A coffee shop records its weekly sales, in hundreds of dollars, for each of 8 weeks after it opens.",
          unit: "week",
          header: "Week",
          output: "Sales",
          slopes: [2.5, 3, 4.5, 5],
          base: [10, 40],
        },
        {
          stem: "A farmer records the water level, in centimeters, of a tank at the end of each of 8 hours as the tank drains.",
          unit: "hour",
          header: "Hour",
          output: "Water level",
          slopes: [-2, -3.5, -4, -5],
          base: [100, 140],
        },
      ]);
      const m0 = r.pick(context.slopes);
      const b0 = r.int(...context.base);
      const xs = [1, 2, 3, 4, 5, 6, 7, 8];
      const ys = xs.map((x) => Number((m0 * x + b0 + r.int(-9, 9) / 10).toFixed(1)));
      const [b, m] = fitPolynomial(xs, ys, 1);
      const x0 = r.int(10, 14);
      const predicted = m * x0 + b;
      const target = Math.round((m * 20 + b) / 5) * 5;
      const solveX = (target - b) / m;
      if (solveX < 0 || target <= 0) reject("target is outside the context");
      return problem({
        stem: `${context.stem} Use technology to find a linear regression model y = mx + b for the data. Do not round any intermediate values.`,
        blocks: [horizontalTable("The data", context.header, xs, context.output, ys)],
        parts: [
          part(
            "Find the values of m and b. Round each to three decimal places.",
            ask.number("m =", three(m), { decimals: 3 }),
            ask.number("b =", three(b), { decimals: 3 }),
          ),
          part(
            `Use the model to predict y at ${context.unit} ${x0}. Round to three decimal places.`,
            ask.number(`y(${x0}) =`, three(predicted), { decimals: 2 }),
          ),
          part(
            `According to the model, at what value of x does y equal ${num(target)}? Round to three decimal places.`,
            ask.number("x =", three(solveX), { decimals: 2 }),
          ),
        ],
        solution: [
          `A linear regression gives y ≈ ${fixed(m, 3)}x ${b < 0 ? "−" : "+"} ${fixed(Math.abs(b), 3)}.`,
          `At ${context.unit} ${x0}, y ≈ ${fixed(predicted, 3)}.`,
          `Solve ${num(target)} = mx + b using the full-precision constants: x = (${num(target)} − b)/m ≈ ${fixed(solveX, 3)}.`,
        ],
        data: { xs, ys, coefficients: [b, m], predicted, solveX, target },
      });
    },
    verify({ data: { xs, ys, coefficients, predicted, solveX, target } }) {
      assertLeastSquares(xs, ys, coefficients);
      assertNear(evaluate(coefficients, solveX), target, "solves for x", 1e-9);
      assert(Number.isFinite(predicted), "prediction is finite");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "rational-models",
    skill: "apply-results",
    make(r) {
      const F = r.pick([60, 90, 120, 180, 240]);
      const c = r.int(2, 9);
      const divisors = [2, 3, 4, 5, 6, 10, 12, 15, 20, 30].filter((n) => F % n === 0);
      const [n0, n1] = r.sample(divisors, 2);
      const item = r.pick([
        ["poster", "A print shop charges a setup fee of", "per poster"],
        ["T-shirt", "A screen-printing shop charges a setup fee of", "per T-shirt"],
        ["mug", "A pottery studio charges a setup fee of", "per mug"],
      ]);
      const target = c + F / n1;
      const A = (n) => (F + c * n) / n;
      return problem({
        stem: `${item[1]} $${F} plus $${c} ${item[2]}. The average cost per ${item[0]}, in dollars, of an order of n ${item[0]}s is A(n) = (${F} + ${c}n)/n.`,
        parts: [
          part(
            `Find the average cost per ${item[0]} of an order of ${n0} ${item[0]}s.`,
            ask.number(`A(${n0}) =`, A(n0), { unit: "dollars" }),
          ),
          part("Find lim n→∞ A(n).", ask.limit("lim n→∞ A(n) =", c)),
          part(
            `How many ${item[0]}s must be ordered for the average cost per ${item[0]} to be $${num(target)}?`,
            ask.number("n =", n1),
          ),
        ],
        solution: [
          `A(${n0}) = (${F} + ${c}(${n0}))/${n0} = ${F + c * n0}/${n0} = ${num(A(n0))} dollars.`,
          `A(n) = ${F}/n + ${c}. As n increases without bound, ${F}/n approaches 0, so lim n→∞ A(n) = ${c}. The average cost per ${item[0]} approaches $${c}.`,
          `Solve (${F} + ${c}n)/n = ${num(target)}: ${F} + ${c}n = ${num(target)}n, so ${F} = ${num(target - c)}n and n = ${n1}.`,
        ],
        data: { F, c, n0, n1, target },
      });
    },
    verify({ data: { F, c, n0, n1, target } }) {
      const A = fnOf(`(${F} + ${c}n)/n`, "n");
      assert(
        Number.isInteger(A(n0)) || Math.abs(A(n0) - Math.round(A(n0))) < 1e-9,
        "A(n0)",
      );
      assertNear(A(n1), target, "target average cost");
      assertNear(A(1e9), c, "limit", 1e-6);
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "build-from-parent",
    skill: "construct-functions",
    make(r) {
      const a = r.pick([2, 3, 4, 6, -2, -3, -4, -6]);
      const h = r.int(-4, 4);
      const k = r.nonzero(-5, 5);
      const divisors = [1, 2, 3, 4, 6, -1, -2, -3, -4, -6].filter((d) => a % d === 0);
      const [d1, d2] = r.sample(divisors, 2);
      const g = (x) => a / (x - h) + k;
      const x1 = h + d1;
      const x2 = h + d2;
      const denominator = h === 0 ? "x" : `(x ${signed(-h)})`;
      return problem({
        stem: `A rational function model g has a vertical asymptote at x = ${num(h)} and a horizontal asymptote at y = ${num(k)}. The graph of g passes through (${num(x1)}, ${num(g(x1))}). The model has the form g(x) = a/${denominator} ${signed(k)}.`,
        parts: [
          part("Find the value of a.", ask.number("a =", a)),
          part(`Find g(${num(x2)}).`, ask.number(`g(${num(x2)}) =`, g(x2))),
        ],
        solution: [
          `The graph passes through (${num(x1)}, ${num(g(x1))}), so ${num(g(x1))} = a/${h === 0 ? num(x1) : `(${num(x1)} ${signed(-h)})`} ${signed(k)}${h === 0 ? "" : `, which simplifies to ${num(g(x1))} = a/${num(d1)} ${signed(k)}`}.`,
          `Then a/${num(d1)} = ${num(g(x1) - k)}, so a = ${num(a)}.`,
          `So g(x) = ${num(a)}/${denominator} ${signed(k)}, and g(${num(x2)}) = ${num(a)}/${par(d2)} ${signed(k)} = ${num(g(x2))}.`,
        ],
        data: { a, h, k, x1, x2 },
      });
    },
    verify({ data: { a, h, k, x1, x2 } }) {
      assert(x1 !== h && x2 !== h && x1 !== x2, "inputs are in the domain");
      assert(
        Number.isInteger(a / (x1 - h)) && Number.isInteger(a / (x2 - h)),
        "whole-number outputs",
      );
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "build-from-conditions",
    skill: "construct-functions",
    make(r) {
      const [r1, r2, r3] = distinct(r, 3, -3, 3);
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const poly = Poly.fromRoots(a, [r1, r1, r2, r3]);
      const choices = [-3, -2, -1, 1, 2, 3].filter((x) => ![r1, r2, r3].includes(x));
      const c = r.pick(choices);
      const y1 = poly.at(c).value;
      const factored = `${lead(a)}${factorsText(byRoot([r1, r2, r3], (x) => (x === r1 ? 2 : 1)))}`;
      const ordered = [r1, r2, r3].sort((x, y) => x - y);
      return problem({
        stem: `A quartic polynomial function p has a real zero of multiplicity 2 at x = ${num(r1)} and real zeros at x = ${num(r2)} and x = ${num(r3)}. The graph of p passes through the point (${num(c)}, ${num(y1)}).`,
        parts: [
          part(
            "Find the leading coefficient of p.",
            ask.number("Leading coefficient", a),
          ),
          part("Find p(0).", ask.number("p(0) =", poly.at(0).value)),
          part("Find lim x→−∞ p(x).", ask.limit("lim x→−∞ p(x) =", a > 0 ? "∞" : "−∞")),
        ],
        solution: [
          `Because of the zeros, p(x) = a${factorsText(byRoot([r1, r2, r3], (x) => (x === r1 ? 2 : 1)))}.`,
          `Since p(${num(c)}) = ${num(y1)}: a(${num(c - r1)})²(${num(c - r2)})(${num(c - r3)}) = ${num(y1)}, so ${num(y1 / a)}a = ${num(y1)} and a = ${num(a)}.`,
          `So p(x) = ${factored}, and p(0) = ${num(poly.at(0).value)}.`,
          `The degree is even and the leading coefficient is ${a > 0 ? "positive" : "negative"}, so p(x) → ${a > 0 ? "∞" : "−∞"} as x → −∞.`,
        ],
        data: { r1, r2, r3, a, c, y1, poly, ordered },
      });
    },
    verify({ data: { r1, r2, r3, a, c, y1, poly } }) {
      for (const x of [r1, r2, r3]) assert(poly.at(x).isZero, `zero at ${x}`);
      assert(poly.at(c).value === y1 && poly.lead.value === a, "conditions");
      const f = (x) => poly.fn()(x);
      assert(Math.sign(f(-1e4)) === Math.sign(a), "end behavior");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    unit: true,
    concept: "interpret-model",
    skill: "apply-results",
    make(r) {
      const B = r.pick([2, 4, 5]);
      const best = r.int(5, 20);
      const A = 2 * B * best;
      const R = (p) => p * (A - B * p);
      const [p1, p2] = r.sample([2, 4, 5, 6, 8, 10, 12, 15], 2).sort((x, y) => x - y);
      if (A - B * p2 <= 0) reject("price too high");
      const rate = (R(p2) - R(p1)) / (p2 - p1);
      const venue = r.pick([
        ["theater", "tickets", "ticket"],
        ["school", "play tickets", "ticket"],
        ["stadium", "tickets", "ticket"],
      ]);
      return problem({
        stem: `A ${venue[0]} sells ${A} − ${B}p ${venue[1]} per show when the price of a ${venue[2]} is p dollars. The revenue, in dollars, from one show is modeled by R(p) = p(${A} − ${B}p).`,
        parts: [
          part(
            "Find the ticket price that maximizes the revenue.",
            ask.number("p =", best, { unit: "dollars" }),
          ),
          part(
            "Find the maximum revenue.",
            ask.number("Maximum revenue", R(best), { unit: "dollars" }),
          ),
          part(
            `Find the average rate of change of R from p = ${p1} to p = ${p2}.`,
            ask.number("Average rate of change", rate, {
              unit: "dollars of revenue per dollar of price",
            }),
          ),
        ],
        solution: [
          `R(p) = ${polyText([-B, A, 0], "p")} is a parabola that opens downward with zeros at p = 0 and p = ${A / B}. The maximum is at the midpoint, p = ${best}.`,
          `R(${best}) = ${best}(${A} − ${B}(${best})) = ${best}(${A - B * best}) = ${num(R(best))} dollars.`,
          `(R(${p2}) − R(${p1}))/(${p2} − ${p1}) = (${num(R(p2))} − ${num(R(p1))})/${p2 - p1} = ${num(rate)} dollars of revenue per dollar of price. On average, from a price of $${p1} to a price of $${p2}, revenue ${rate >= 0 ? "increases" : "decreases"} by $${Math.abs(rate)} for each $1 increase in price.`,
        ],
        data: { A, B, best, p1, p2, rate },
      });
    },
    verify({ data: { A, B, best, p1, p2, rate } }) {
      const R = (p) => p * (A - B * p);
      let max = -Infinity;
      let at = 0;
      for (let p = 0; p <= A / B; p += 0.001) {
        const value = R(p);
        if (value > max) {
          max = value;
          at = p;
        }
      }
      assertNear(at, best, "best price", 1e-3);
      assertNear(max, R(best), "maximum revenue", 1e-6);
      assertNear((R(p2) - R(p1)) / (p2 - p1), rate, "average rate of change");
    },
  },
];

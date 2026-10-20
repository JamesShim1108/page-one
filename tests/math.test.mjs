import test from "node:test";
import assert from "node:assert/strict";

import { createEngine, CalcError, Complex } from "../docs/app/math/engine.js";
import { formatValue, formatNumber, exactHint } from "../docs/app/math/format.js";
import {
  findZeros,
  findExtrema,
  polynomialRoots,
  regression,
  oneVariable,
  integrate,
  derivative,
  exactForm,
  solve,
} from "../docs/app/math/numeric.js";

const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const run = (engine, input) => formatValue(engine.run(input).value);

test("arithmetic follows calculator conventions", () => {
  const e = createEngine();
  const cases = [
    ["2(3 + 4)", "14"],
    ["−2²", "−4"],
    ["2^-1", "0.5"],
    ["2^3^2", "512"],
    ["5!", "120"],
    ["12%", "0.12"],
    ["2.5E3", "2500"],
    ["4!/(2!2!)", "6"],
    ["|−3| + |2 − 5|", "6"],
    ["∛(−8)", "−2"],
    ["(−8)^(2/3)", "4"],
    ["root(16, 4)", "2"],
    ["0.1 + 0.2", "0.3"],
    ["2pi", "6.283185307"],
    ["1/7", "0.1428571429"],
    ["10^20", "1×10²⁰"],
    ["{1, 2, 3}·2", "{2, 4, 6}"],
    ["nCr(5, 2) + nPr(5, 2)", "30"],
    ["gcd(12, 18)·lcm(4, 6)", "72"],
    ["mod(−7, 3)", "2"],
    ["round(2.345, 2)", "2.35"],
    ["log(8, 2) + log₂(8) + log_3(81)", "10"],
    ["ln(e^3)", "3"],
  ];
  for (const [input, expected] of cases) assert.equal(run(e, input), expected, input);
});

test("results that need care say how the input was read", () => {
  const e = createEngine();
  e.run("x = 4");
  const result = e.run("1/2x");
  assert.equal(result.value, 2);
  assert.equal(result.readAs, "1/2·x");
  assert.equal(e.run("−2^2").readAs, "−(2²)");
  assert.equal(e.run("√4x").readAs, "√(4)·x");
  assert.equal(e.run("2 + 3").readAs, null);
});

test("trig follows the angle mode and is exact at special angles", () => {
  const rad = createEngine();
  assert.equal(rad.run("sin(π)").value, 0);
  assert.equal(rad.run("cos(π/2)").value, 0);
  assert.equal(rad.run("tan(π/4)").value, 1);
  assert.equal(rad.run("sin(π/6)").value, 0.5);
  assert.equal(exactHint(rad.run("sin⁻¹(0.5)").value), "π/6");
  assert.equal(exactHint(rad.run("sin^-1(1)").value), "π/2");
  assert.equal(rad.run("sin²(1) + cos²(1)").value, 1);
  assert.throws(() => rad.run("tan(π/2)"), /undefined/);
  const deg = createEngine({ settings: { angle: "deg" } });
  assert.equal(deg.run("sin(30)").value, 0.5);
  assert.equal(deg.run("cos(90)").value, 0);
  assert.equal(deg.run("tan(45)").value, 1);
  assert.equal(deg.run("sin⁻¹(1)").value, 90);
  assert.equal(deg.run("sin(30°)").value, 0.5);
  assert.ok(near(rad.run("sin(30°)").value, 0.5));
  assert.throws(() => deg.run("tan(90)"), /undefined/);
  assert.throws(() => deg.run("sin⁻¹(2)"), /−1 to 1/);
});

test("variables, Ans, user functions, and graph slots", () => {
  const e = createEngine();
  e.run("A = 5");
  e.run("2 → B");
  assert.equal(e.run("3A + B").value, 17);
  assert.equal(e.run("Ans + 1").value, 18);
  const def = e.run("f(x) = x² − 3x");
  assert.equal(def.kind, "define");
  assert.equal(e.run("f(2)").value, -2);
  assert.equal(e.run("f(f(1))").value, 10);
  e.run("g(a, b) = a² + b²");
  assert.equal(e.run("g(3, 4)").value, 25);
  e.setSlots({ y1: "2x + 1" });
  assert.equal(e.run("y1(3)").value, 7);
  assert.throws(() => e.run("y2(3)"), /empty/);
  assert.throws(() => e.run("q"), /no value/);
  const restored = createEngine(e.snapshot());
  assert.equal(restored.run("f(4) + A").value, 9);
});

test("summation, sequences, solving, derivatives, and integrals", () => {
  const e = createEngine();
  assert.equal(e.run("Σ(k², k, 1, 10)").value, 385);
  assert.equal(e.run("sum(2^n, n, 0, 9)").value, 1023);
  assert.equal(e.run("sum({1, 2, 3})").value, 6);
  assert.deepEqual(e.run("seq(2^n, n, 0, 5)").value, [1, 2, 4, 8, 16, 32]);
  assert.ok(near(e.run("solve(x² = 2, x, 1)").value, Math.SQRT2));
  assert.ok(near(e.run("solve(x² = 2, x, −1)").value, -Math.SQRT2));
  assert.ok(near(e.run("solve(cos(x) = x, x)").value, 0.7390851332151607));
  assert.ok(near(e.run("solve(2^x = 10, x, 0, 10)").value, Math.log2(10)));
  assert.equal(e.run("nDeriv(x³, x, 2)").value, 12);
  assert.equal(e.run("fnInt(x², x, 0, 3)").value, 9);
  assert.throws(() => e.run("solve(x² = −1, x, 0)"), /No solution/);
});

test("statistics on lists", () => {
  const e = createEngine();
  assert.equal(e.run("mean({2, 4, 4, 4, 5, 5, 7, 9})").value, 5);
  assert.equal(e.run("stdDevP({2, 4, 4, 4, 5, 5, 7, 9})").value, 2);
  assert.ok(near(e.run("stdDev({2, 4, 4, 4, 5, 5, 7, 9})").value, Math.sqrt(32 / 7)));
  assert.equal(e.run("median({5, 1, 3, 2})").value, 2.5);
  e.setLists({ L1: [1, 2, 3, 4] });
  assert.equal(e.run("sum(L1)").value, 10);
  const stats = oneVariable([1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual([stats.q1, stats.median, stats.q3], [2, 4, 6]);
});

test("complex numbers in a + bi mode, and clear errors in real mode", () => {
  const real = createEngine();
  assert.throws(() => real.run("√(−4)"), /a \+ bi mode/);
  assert.throws(() => real.run("ln(0)"), /undefined/);
  assert.throws(() => real.run("1/0"), /Division by zero/);
  assert.throws(() => real.run("2 3"), /operator/);
  assert.throws(() => real.run("sin x"), /parentheses/);
  assert.throws(() => real.run("x² = 4"), /solve/);
  assert.throws(() => real.run("foo("), CalcError);
  const c = createEngine({ settings: { complex: true } });
  assert.equal(run(c, "√(−4)"), "2i");
  assert.equal(run(c, "i²"), "−1");
  assert.equal(run(c, "e^(iπ)"), "−1");
  assert.equal(run(c, "(1 + 2i)(3 − i)"), "5 + 5i");
  assert.equal(run(c, "(1 + 2i)/(3 − i)"), "0.1 + 0.7i");
  assert.equal(run(c, "abs(3 + 4i)"), "5");
  assert.equal(run(c, "conj(2 − 3i)"), "2 + 3i");
  assert.ok(c.run("(−8)^(1/3)").value instanceof Complex);
  assert.equal(run(real, "polyRoots(1, 0, 1)"), "{−i, i}");
  assert.equal(run(real, "polyRoots(1, −6, 11, −6)"), "{1, 2, 3}");
});

test("number display and exact forms", () => {
  assert.equal(formatNumber(-0.000001234), "−1.234×10⁻⁶");
  assert.equal(formatNumber(2 / 3, { decimals: 3 }), "0.667");
  assert.equal(exactHint(1 / 3), "1/3");
  assert.equal(exactHint(0.12), null, "a terminating decimal needs no fraction");
  assert.equal(exactHint(Math.sqrt(3) / 2), "√3/2");
  assert.equal(exactHint((2 * Math.PI) / 3), "2π/3");
  assert.equal(exactForm(Math.sqrt(12)), "2√3");
  assert.equal(exactHint(Math.E), null);
});

test("zeros and extrema skip asymptotes and find touching zeros", () => {
  const xs = (list) => list.map((p) => p.x);
  assert.deepEqual(xs(findZeros((x) => (x + 1) ** 2 * (x - 2) ** 3, -10, 10)), [-1, 2]);
  assert.deepEqual(xs(findZeros((x) => 1 / (x - 2), -10, 10)), []);
  assert.deepEqual(xs(findZeros((x) => (x * x - 4) / (x - 2), -10, 10)), [-2]);
  assert.deepEqual(xs(findZeros((x) => x * x, -10, 10)), [0]);
  const r10 = (v) => Number(v.toPrecision(10));
  assert.deepEqual(
    findExtrema((x) => x ** 3 - 3 * x, -10, 10).map((p) => [r10(p.x), r10(p.y), p.kind]),
    [
      [-1, 2, "maximum"],
      [1, -2, "minimum"],
    ],
  );
  assert.deepEqual(findExtrema(Math.tan, -5, 5), []);
  assert.deepEqual(
    findExtrema((x) => (x + 1) ** 2 * (x - 2) ** 3, -10, 10).map((p) => [
      r10(p.x),
      p.kind,
    ]),
    [
      [-1, "maximum"],
      [0.2, "minimum"],
    ],
  );
  assert.ok(
    near(
      solve((x) => Math.cos(x) - x, 0),
      0.7390851332151607,
    ),
  );
  assert.ok(near(integrate(Math.sin, 0, Math.PI), 2));
  assert.ok(near(derivative(Math.exp, 1), Math.E, 1e-8));
  assert.deepEqual(polynomialRoots([1, -2, 1]), [
    { re: 1, im: 0 },
    { re: 1, im: 0 },
  ]);
});

test("regressions recover known models", () => {
  const xs = [0, 1, 2, 3, 4, 5];
  const quad = regression(
    "quadratic",
    xs,
    xs.map((x) => 3 + 2 * x + 0.5 * x * x),
  );
  assert.deepEqual(quad.coefficients, { a: 3, b: 2, c: 0.5 });
  assert.ok(near(quad.r2, 1));
  const line = regression("linear", [1, 2, 3, 4], [2, 4.1, 5.9, 8.2]);
  assert.ok(near(line.coefficients.b, 2.04, 1e-9));
  assert.ok(line.r > 0.99 && line.r2 > 0.99);
  const exp = regression("exponential", [0, 1, 2, 3], [2, 6, 18, 54]);
  assert.ok(near(exp.coefficients.a, 2) && near(exp.coefficients.b, 3));
  const log = regression("logarithmic", [1, Math.E, Math.E ** 2], [1, 3, 5]);
  assert.ok(near(log.coefficients.a, 1) && near(log.coefficients.b, 2));
  const power = regression("power", [1, 2, 4], [3, 12, 48]);
  assert.ok(near(power.coefficients.a, 3) && near(power.coefficients.b, 2));
  const sx = Array.from({ length: 16 }, (_, k) => k);
  const sin = regression(
    "sinusoidal",
    sx,
    sx.map((x) => 4 * Math.sin(0.5 * (x + 1)) + 10),
  );
  assert.ok(near(sin.coefficients.a, 4, 1e-6) && near(sin.coefficients.b, 0.5, 1e-6));
  assert.ok(near(sin.coefficients.c, 1, 1e-6) && near(sin.coefficients.d, 10, 1e-6));
  // The expression the calculator graphs reproduces the model.
  const e = createEngine();
  const f = e.compile(sin.expression);
  assert.ok(near(f(3), 4 * Math.sin(2) + 10, 1e-6));
  assert.throws(() => regression("exponential", [0, 1], [1, -1]), /positive/);
  assert.throws(() => regression("cubic", [0, 1, 2], [1, 2, 3]), /at least 4/);
});

import { shortcutAt } from "../docs/app/mathkeys/autoformat.js";
import { LAYOUTS } from "../docs/app/mathkeys/keys.js";
import { parseData } from "../docs/app/calculator/app.js";
import { isMathCourse } from "../docs/app/math/courses.js";

// Types text one character at a time through the shortcut rules, like a student would.
function typeWithShortcuts(text) {
  let value = "";
  for (const ch of text) {
    value += ch;
    const change = shortcutAt(value, value.length);
    if (change)
      value = value.slice(0, change.start) + change.insert + value.slice(change.end);
  }
  return value;
}

test("typing shortcuts turn calculator-style text into math notation", () => {
  assert.equal(typeWithShortcuts("x^2 + x^-1 + x^10"), "x² + x⁻¹ + x¹⁰");
  assert.equal(
    typeWithShortcuts("x<=2, x>=0, x!=1, +-3, x->2"),
    "x≤2, x≥0, x≠1, ±3, x→2",
  );
  assert.equal(typeWithShortcuts("2pi rad, theta = pi/3 "), "2π rad, θ = π/3 ");
  assert.equal(typeWithShortcuts("sqrt(5) + cbrt(8)"), "√(5) + ∛(8)");
  assert.equal(typeWithShortcuts("as x -> inf "), "as x → ∞ ");
  // Words that merely contain the letters stay as typed.
  assert.equal(
    typeWithShortcuts("spice pipe pick infinite "),
    "spice pipe pick infinite ",
  );
  assert.equal(
    typeWithShortcuts("x² 3"),
    "x² 3",
    "a superscript followed by a space ends the exponent",
  );
});

test("math key templates put the caret inside the first blank", () => {
  for (const layout of Object.values(LAYOUTS))
    for (const group of layout)
      for (const key of group.keys) {
        if (key.action) continue;
        assert.ok(key.back >= 0 && key.back <= key.insert.length, key.label);
        const before = key.insert.slice(0, key.insert.length - key.back);
        if (key.back)
          assert.match(
            before,
            /[([{|]$/,
            `${key.label} leaves the caret after an opening mark`,
          );
      }
});

test("calculator data accepts pasted columns and reports bad lines", () => {
  const pasted = parseData("Year\tPopulation\n0\t2\n1\t6.1\n2 17.8\n3, 54.5\n\nfour, 9");
  assert.deepEqual(pasted.xs, [0, 1, 2, 3]);
  assert.deepEqual(pasted.ys, [2, 6.1, 17.8, 54.5]);
  assert.deepEqual(pasted.problems, [7]);
  const single = parseData("4\n−2\n7.5");
  assert.deepEqual(single.xs, [4, -2, 7.5]);
  assert.deepEqual(single.ys, []);
  assert.ok(isMathCourse("precalculus") && !isMathCourse("world"));
});

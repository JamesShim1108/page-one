import test from "node:test";
import assert from "node:assert/strict";

import * as kit from "../docs/content/practice-kit/index.js";

const { Q, createRandom } = kit;
const text = (list) => list.map(String);

test("the seeded generator repeats itself for one seed and differs between seeds", () => {
  const draw = (seed) => {
    const random = createRandom(seed);
    return Array.from({ length: 8 }, () => random.int(1, 100));
  };
  assert.deepEqual(draw("seed-a"), draw("seed-a"));
  assert.notDeepEqual(draw("seed-a"), draw("seed-b"));
  assert.equal(kit.hashText("a"), kit.hashText("a"));
  assert.notEqual(kit.hashText("a"), kit.hashText("b"));
});

test("int stays inside its inclusive range, and nonzero never returns zero", () => {
  const random = createRandom("range");
  const seen = new Set();
  for (let i = 0; i < 300; i += 1) {
    const value = random.int(-3, 3);
    assert.ok(Number.isInteger(value) && value >= -3 && value <= 3);
    seen.add(value);
    assert.notEqual(random.nonzero(-3, 3), 0);
  }
  assert.equal(seen.size, 7, "every value in the range shows up");
});

test("pick and sample choose from the list without repeating a sample", () => {
  const random = createRandom("pick");
  const list = ["a", "b", "c", "d", "e"];
  for (let i = 0; i < 50; i += 1) assert.ok(list.includes(random.pick(list)));
  const sample = random.sample(list, 3);
  assert.equal(sample.length, 3);
  assert.equal(new Set(sample).size, 3);
  assert.ok(sample.every((item) => list.includes(item)));
});

test("exact fractions add, subtract, multiply, divide, and print with a real minus sign", () => {
  const half = new Q(1, 2);
  const third = new Q(1, 3);
  assert.equal(half.add(third).toString(), "5/6");
  assert.equal(half.sub(third).toString(), "1/6");
  assert.equal(half.mul(third).toString(), "1/6");
  assert.equal(half.div(third).toString(), "3/2");
  assert.equal(half.neg().toString(), "−1/2");
  assert.equal(new Q(4, 2).toString(), "2");
  assert.equal(new Q(3, -4).toString(), "−3/4");
  assert.equal(half.pow(2).toString(), "1/4");
  assert.equal(half.pow(-2).toString(), "4");
  assert.equal(new Q(4, 2).isInteger, true);
  assert.equal(half.isInteger, false);
  assert.equal(half.cmp(third), 1);
  assert.ok(new Q(2, 4).equals(half));
  assert.throws(() => new Q(1, 0));
  assert.throws(() => new Q(0.5, 1));
});

test("angles are written as multiples of π", () => {
  assert.equal(kit.piText(new Q(5, 6)), "5π/6");
  assert.equal(kit.piText(new Q(1)), "π");
  assert.equal(kit.piText(new Q(2)), "2π");
  assert.equal(kit.piText(new Q(0)), "0");
  assert.equal(kit.piText(new Q(-3, 2)), "−3π/2");
  assert.equal(kit.piText(new Q(-1)), "−π");
  assert.equal(kit.piText(kit.fromDegrees(150)), "5π/6");
  assert.equal(kit.piText(kit.fromDegrees(-45)), "−π/4");
  assert.equal(kit.piText(kit.reduce(new Q(23, 6))), "11π/6");
  assert.equal(kit.piText(kit.reduce(new Q(-1, 3))), "5π/3");
});

test("exact trigonometric values match Math.sin and Math.cos everywhere on the circle", () => {
  for (const angle of kit.SPECIAL) {
    for (const fn of ["sin", "cos", "tan", "sec", "csc", "cot"]) {
      const here = kit.exact(fn, angle);
      const x = kit.radians(angle);
      const direct = {
        sin: Math.sin(x),
        cos: Math.cos(x),
        tan: Math.tan(x),
        sec: 1 / Math.cos(x),
        csc: 1 / Math.sin(x),
        cot: 1 / Math.tan(x),
      }[fn];
      if (here.defined) {
        assert.ok(
          Math.abs(here.value - direct) < 1e-9,
          `${fn}(${kit.piText(angle)}) is ${here.text}`,
        );
      } else {
        assert.equal(here.text, "undefined");
        assert.ok(
          !Number.isFinite(direct) || Math.abs(direct) > 1e9,
          `${fn}(${kit.piText(angle)})`,
        );
      }
    }
  }
});

test("exact values are written the way a student writes them", () => {
  const value = (fn, n, d) => kit.exact(fn, new Q(n, d)).text;
  assert.equal(value("sin", 1, 6), "1/2");
  assert.equal(value("cos", 2, 3), "−1/2");
  assert.equal(value("cos", 5, 4), "−√2/2");
  assert.equal(value("sin", 7, 6), "−1/2");
  assert.equal(value("tan", 1, 4), "1");
  assert.equal(value("tan", 1, 2), "undefined");
  assert.equal(value("sec", 1, 3), "2");
  assert.equal(value("cot", 3, 4), "−1");
  assert.equal(kit.scaled("cos", new Q(5, 6), 6).text, "−3√3");
  assert.equal(kit.scaled("sin", new Q(5, 6), 6).text, "3");
  assert.equal(kit.radicalText(new Q(3, 2), 3), "3√3/2");
  assert.equal(kit.radicalText(new Q(-1, 2), 2), "−√2/2");
  assert.equal(kit.radicalText(new Q(5, 2), 1), "5/2");
  assert.equal(kit.plusText(25, kit.scaled("sin", new Q(1, 3), 20)), "25 + 10√3");
  assert.equal(kit.plusText(25, kit.scaled("cos", new Q(5, 6), 20)), "25 − 10√3");
});

test("anglesWith lists every special angle in the window, in order", () => {
  assert.deepEqual(text(kit.anglesWith("sin", 0.5, 0, 2)), ["1/6", "5/6"]);
  assert.deepEqual(text(kit.anglesWith("cos", 0.5, -1, 1)), ["−1/3", "1/3"]);
  assert.deepEqual(text(kit.anglesWith("tan", 1, 0, 2)), ["1/4", "5/4"]);
  assert.deepEqual(text(kit.anglesWith("sin", 2, 0, 2)), []);
});

test("quadrants are named from the position of the terminal ray", () => {
  assert.equal(kit.quadrantName(new Q(1, 6)), "I");
  assert.equal(kit.quadrantName(new Q(5, 6)), "II");
  assert.equal(kit.quadrantName(new Q(7, 6)), "III");
  assert.equal(kit.quadrantName(new Q(7, 4)), "IV");
  assert.equal(kit.quadrantName(new Q(-1, 4)), "IV");
  assert.equal(kit.piText(kit.referenceAngle(new Q(5, 6))), "π/6");
});

test("sign and inequality solutions come out as exact interval notation", () => {
  assert.equal(kit.signIntervals("sin", ">", 0, 2), "(0, π)");
  assert.equal(kit.signIntervals("cos", "<", 0, 2), "(π/2, 3π/2)");
  assert.equal(kit.inequalityIntervals("sin", ">", 0.5, 0, 2), "(π/6, 5π/6)");
  assert.equal(kit.inequalityIntervals("sin", "≥", 0.5, 0, 2), "[π/6, 5π/6]");
  assert.equal(kit.inequalityIntervals("cos", "≤", 0.5, 0, 2), "[π/3, 5π/3]");
  assert.equal(kit.inequalityIntervals("tan", ">", 1, 0, 1), "(π/4, π/2)");
});

test("axis ticks for π and the terminal-ray sentence", () => {
  assert.deepEqual(
    kit.piTicks(-1, 1, 2).map((tick) => tick.label),
    ["−π", "−π/2", "0", "π/2", "π"],
  );
  assert.equal(kit.terminalRay(new Q(1, 3)), "The terminal ray of π/3");
  assert.match(kit.terminalRay(new Q(23, 6)), /which is also the terminal ray of 11π\/6/);
});

test("expression text uses real minus signs and drops needless 1s", () => {
  assert.equal(kit.num(-3), "−3");
  assert.equal(kit.num(2.5), "2.5");
  assert.equal(kit.polyText([1, 0, -4]), "x² − 4");
  assert.equal(kit.polyText([-1, 2]), "−x + 2");
  assert.equal(kit.polyText([2, -3, 1]), "2x² − 3x + 1");
  assert.equal(kit.lineText(1, 5), "x + 5");
  assert.equal(kit.lineText(-1, 0), "−x");
  assert.equal(kit.ivl(0, 5, true, false), "[0, 5)");
  assert.equal(kit.unionText("(1, 2)", "(3, 4)"), "(1, 2) ∪ (3, 4)");
  assert.equal(kit.par(-2), "(−2)");
  assert.equal(kit.par(2), "2");
});

test("polynomials multiply, divide, and evaluate exactly", () => {
  const { Poly } = kit;
  const p = Poly.fromRoots(1, [2, -2]);
  assert.equal(p.text(), "x² − 4");
  assert.equal(p.at(3).toString(), "5");
  assert.equal(p.degree, 2);
  const { quotient, remainder } = Poly.of(1, 0, -4).divmod(Poly.of(1, -2));
  assert.equal(quotient.text(), "x + 2");
  assert.ok(remainder.isZero);
  assert.equal(Poly.of(3, 0, 1).derivative().text(), "6x");
  assert.equal(Poly.of(1, 1).pow(2).text(), "x² + 2x + 1");
});

test("numeric helpers compare, differentiate, and report failures with the numbers", () => {
  assert.ok(kit.near(1, 1 + 1e-12));
  assert.ok(!kit.near(1, 1.1));
  assert.equal(
    kit.aroc((x) => x * x, 1, 3),
    4,
  );
  assert.equal(kit.fnOf("x^2 + 1")(3), 10);
  assert.equal(kit.valueOf("2 + 3"), 5);
  assert.throws(() => kit.assert(false, "bad"), /verify failed: bad/);
  assert.throws(() => kit.assertNear(1, 2, "msg"), /msg: got 1, expected 2/);
  assert.doesNotThrow(() => kit.assertNear(1, 1 + 1e-12, "msg"));
});

test("ask, part, and problem build the shapes the compiler expects", () => {
  assert.deepEqual(kit.ask.number("x =", 3), { type: "number", label: "x =", key: 3 });
  assert.deepEqual(kit.ask.choice("pick", ["a", "b"], "b"), {
    type: "choice",
    label: "pick",
    options: ["a", "b"],
    key: "b",
  });
  const built = kit.problem({
    stem: "S",
    parts: [kit.part("p", kit.ask.number("x =", 1), kit.ask.number("y =", 2))],
    solution: ["s"],
    data: { a: 1 },
  });
  assert.deepEqual(
    built.parts[0].fields.map((field) => field.id),
    ["a1", "a2"],
  );
  assert.deepEqual(built.data, { a: 1 });
  assert.throws(() => kit.reject("nope"), kit.Reject);
});

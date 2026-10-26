import test from "node:test";
import assert from "node:assert/strict";

import { gradeField, gradeQuestion, answerText } from "../docs/app/practice/answers.js";

const number = (key, extra = {}) => ({ type: "number", key, ...extra });
const expr = (key, extra = {}) => ({ type: "expr", key, ...extra });
const interval = (key, extra = {}) => ({ type: "interval", key, ...extra });
const set = (key, extra = {}) => ({ type: "set", key, ...extra });

const status = (field, raw) => gradeField(field, raw).status;

// Each row is [field, what the student typed, expected status].
function table(name, rows) {
  test(name, () => {
    for (const [field, typed, expected] of rows) {
      assert.equal(
        status(field, typed),
        expected,
        `${field.type} key ${JSON.stringify(field.key)} with input ${JSON.stringify(typed)}`,
      );
    }
  });
}

table("number fields accept any equal fraction, decimal, or typing style", [
  [number("1/2"), "1/2", "correct"],
  [number("1/2"), "2/4", "correct"],
  [number("1/2"), "0.5", "correct"],
  [number("1/2"), ".5", "correct"],
  [number("1/2"), "1/3", "wrong"],
  [number("−3/4"), "-3/4", "correct"],
  [number("−3/4"), "−0.75", "correct"],
  [number("−3/4"), "3/-4", "correct"],
  [number("−3/4"), "3/4", "wrong"],
  [number("0"), "-0", "correct"],
  [number("0"), "0.0", "correct"],
]);

table("number fields compare exact values with radicals and π", [
  [number("√3/2"), "√3/2", "correct"],
  [number("√3/2"), "sqrt(3)/2", "correct"],
  [number("√3/2"), "(1/2)√3", "correct"],
  [number("5π/6"), "5π/6", "correct"],
  [number("5π/6"), "5pi/6", "correct"],
  [number("(√6 + √2)/4"), "(√2+√6)/4", "correct"],
  [number("(√6 − √2)/4"), "(√6-√2)/4", "correct"],
  [number("(√6 − √2)/4"), "(√6+√2)/4", "wrong"],
]);

test("an exact key rejects a decimal approximation and says why", () => {
  for (const typed of ["0.8660", "0.87", "0.866"]) {
    const outcome = gradeField(number("√3/2"), typed);
    assert.equal(outcome.status, "wrong", typed);
    assert.match(outcome.message, /exact/i);
  }
  assert.equal(status(number("1/3"), "0.3333"), "wrong");
  assert.equal(status(number("5π/6"), "2.618"), "wrong");
});

test("decimals: n makes a number field an approximation with a tolerance of 10 to the minus n", () => {
  const field = number("3.14159", { decimals: 3 });
  assert.equal(status(field, "3.142"), "correct");
  assert.equal(status(field, "3.1416"), "correct");
  assert.equal(status(field, "3.15"), "wrong");
  assert.equal(status(number("3", { decimals: 2 }), "3.004"), "correct");
  assert.equal(status(number("3", { decimals: 2 }), "3.02"), "wrong");
});

test("number fields separate empty, unreadable, and wrong input", () => {
  assert.equal(status(number("1/2"), ""), "empty");
  assert.equal(status(number("1/2"), "   "), "empty");
  assert.equal(status(number("1/2"), undefined), "empty");
  assert.equal(status(number("1/2"), "abc"), "invalid");
  assert.equal(status(number("1/2"), "1/"), "invalid");
  assert.equal(status(number("1/2"), "1/3"), "wrong");
  assert.ok(gradeField(number("1/2"), "abc").message.length > 0);
});

table("expr fields accept every equivalent form", [
  [expr("x^2 − 4"), "(x−2)(x+2)", "correct"],
  [expr("x^2 − 4"), "x²-4", "correct"],
  [expr("x^2 − 4"), "x^2 - 4 + 0", "correct"],
  [expr("x^2 − 4"), "x^2-5", "wrong"],
  [expr("3x + 6"), "3(x+2)", "correct"],
  [expr("2sin(x)cos(x)"), "sin(2x)", "correct"],
  [expr("e^x"), "exp(x)", "correct"],
  [expr("1/x"), "x^-1", "correct"],
  [expr("1/x"), "x⁻¹", "correct"],
  [expr("5·(1/2)^t", { vars: ["t"] }), "5(0.5)^t", "correct"],
  [expr("cos(θ)^2", { vars: ["θ"] }), "1−sin(θ)^2", "correct"],
  [expr("ln(x)"), "log(x)", "wrong"],
]);

test("a leading name such as f(x) = or y = is optional on both sides", () => {
  assert.equal(status(expr("3x + 6"), "f(x) = 3x + 6"), "correct");
  assert.equal(status(expr("3x + 6"), "y=3x+6"), "correct");
  assert.equal(status(expr("f(x) = 3x + 6"), "3x+6"), "correct");
  assert.equal(status(expr("y = 3x + 6"), "3x+6"), "correct");
});

test("−x² is read as the negative of x², not as (−x)²", () => {
  const field = expr("−x^2");
  for (const typed of ["−x²", "-x^2", "−(x^2)", "-1x^2"]) {
    assert.equal(status(field, typed), "correct", typed);
  }
  assert.equal(status(field, "(−x)²"), "wrong");
  assert.equal(status(expr("(−x)^2"), "x²"), "correct");
  assert.equal(status(expr("(−x)^2"), "−x²"), "wrong");
});

test("expr fields tell a missing parenthesis apart from a wrong answer", () => {
  for (const typed of ["sin 2x", "ln x", "x +", "(x+1"]) {
    assert.equal(status(expr("x + 1"), typed), "invalid", typed);
  }
  assert.match(gradeField(expr("2sin(x)cos(x)"), "sin 2x").message, /parenthes/);
  assert.equal(status(expr("cos(θ)^2", { vars: ["θ"] }), "cos²θ"), "invalid");
});

test("strict expressions must agree on the domain, and strict: false only compares values", () => {
  const key = "(x²−4)/(x−2)";
  const strict = gradeField(expr(key), "x+2");
  assert.equal(strict.status, "wrong");
  assert.match(strict.message, /defined/);
  assert.equal(status(expr(key, { strict: false }), "x+2"), "correct");
  assert.equal(status(expr(key), "(x²−4)/(x−2)"), "correct");
  assert.equal(status(expr(key), "(x+2)(x−2)/(x−2)"), "correct");
});

table("form: exponential asks for a·b^x and refuses look-alikes", [
  [expr("6·2^x", { form: "exponential" }), "6·2^x", "correct"],
  [expr("6·2^x", { form: "exponential" }), "6(2)^x", "correct"],
  [expr("6·2^x", { form: "exponential" }), "3·2^(x+1)", "wrong"],
  [expr("6·2^x", { form: "exponential" }), "12·2^(x−1)", "wrong"],
  [expr("6·2^x", { form: "exponential" }), "6^x·2^x", "wrong"],
  [expr("(1/3)^x", { form: "exponential" }), "(1/3)^x", "correct"],
  [expr("(1/3)^x", { form: "exponential" }), "3^(−x)", "wrong"],
  [expr("5·0.8^x", { form: "exponential" }), "5*0.8^x", "correct"],
  [expr("5·0.8^x", { form: "exponential" }), "5/1.25^x", "wrong"],
  [expr("500·1.04^t", { vars: ["t"], form: "exponential" }), "500(1.04)^t", "correct"],
  [expr("2·t", { vars: ["t"], form: "exponential" }), "2t", "wrong"],
]);

table("form: exponential-e asks for a·e^(kx)", [
  [expr("2·e^(3x)", { form: "exponential-e" }), "2e^(3x)", "correct"],
  [expr("2·e^(3x)", { form: "exponential-e" }), "2e^(3*x)", "correct"],
  [expr("2·e^(3x)", { form: "exponential-e" }), "2(e^3)^x", "wrong"],
]);

table("form: single-log wants one logarithm and log-sum wants the expanded form", [
  [expr("log(5x^2,3)", { form: "single-log" }), "log₃(5x²)", "correct"],
  [expr("log(5x^2,3)", { form: "single-log" }), "log(5*x^2, 3)", "correct"],
  [expr("log(5x^2,3)", { form: "single-log" }), "log₃(5)+2log₃(x)", "wrong"],
  [expr("log(5x^2,3)", { form: "single-log" }), "log(5x^2)/log(3)", "wrong"],
  [expr("log(5,3)+2log(x,3)", { form: "log-sum" }), "log₃(5)+2log₃(x)", "correct"],
  [expr("log(5,3)+2log(x,3)", { form: "log-sum" }), "2log₃(x)+log₃(5)", "correct"],
  [expr("log(5,3)+2log(x,3)", { form: "log-sum" }), "log₃(5x²)", "wrong"],
  [expr("log(5,3)+2log(x,3)", { form: "log-sum" }), "log₃(5)+log₃(x²)", "wrong"],
  [expr("ln(x+1)−ln(x)", { form: "log-sum" }), "ln(x+1)−ln(x)", "correct"],
  [expr("ln(x+1)−ln(x)", { form: "log-sum" }), "ln((x+1)/x)", "wrong"],
]);

table("interval fields read brackets, unions, words, and π", [
  [interval("(−∞, 3]"), "(-inf, 3]", "correct"],
  [interval("(−∞, 3]"), "x ≤ 3", "correct"],
  [interval("(−∞, 3]"), "(−∞, 3)", "wrong"],
  [interval("(−∞, 1) ∪ (1, ∞)"), "(−∞,1)U(1,∞)", "correct"],
  [interval("(−∞, 1) ∪ (1, ∞)"), "(−∞, ∞)", "wrong"],
  [interval("[0, π/2) ∪ (3π/2, 2π]"), "[0,pi/2)∪(3pi/2,2pi]", "correct"],
  [interval("[0, π/2) ∪ (3π/2, 2π]"), "0 ≤ x < π/2 or 3π/2 < x ≤ 2π", "correct"],
  [interval("(2, 5)"), "(5, 2)", "invalid"],
]);

test("closure: any ignores brackets and compares only the endpoints", () => {
  const field = interval("(0, π)", { closure: "any" });
  assert.equal(status(field, "[0, π]"), "correct");
  assert.equal(status(field, "(0, pi)"), "correct");
  assert.equal(status(field, "(0, 3π/2)"), "wrong");
  assert.equal(status(interval("(0, π)"), "[0, π]"), "wrong");
});

table("set fields ignore order and accept ± and several separators", [
  [set(["2", "−3"]), "-3, 2", "correct"],
  [set(["2", "−3"]), "2", "wrong"],
  [set(["2", "−3"]), "2, -3, 5", "wrong"],
  [set(["5π/6", "11π/6"]), "11π/6, 5π/6", "correct"],
  [set(["√2", "−√2"]), "±√2", "correct"],
  [set(["1/2", "3"]), "0.5; 3", "correct"],
]);

table("points fields compare ordered pairs", [
  [
    {
      type: "points",
      key: [
        ["1", "2"],
        ["−3", "4"],
      ],
    },
    "(−3,4), (1,2)",
    "correct",
  ],
  [{ type: "points", key: [["1", "2"]] }, "(2,1)", "wrong"],
  [{ type: "points", key: [["√3/2", "1/2"]] }, "(√3/2, 1/2)", "correct"],
  [{ type: "points", key: [["√3/2", "1/2"]] }, "(0.866, 0.5)", "wrong"],
]);

table("limit fields accept ∞, DNE, and numbers in their usual spellings", [
  [{ type: "limit", key: "∞" }, "∞", "correct"],
  [{ type: "limit", key: "∞" }, "inf", "correct"],
  [{ type: "limit", key: "−∞" }, "-infinity", "correct"],
  [{ type: "limit", key: "DNE" }, "DNE", "correct"],
  [{ type: "limit", key: "DNE" }, "does not exist", "correct"],
  [{ type: "limit", key: "3" }, "DNE", "wrong"],
  [{ type: "limit", key: "1/2" }, "0.5", "correct"],
]);

table("equations fields compare equations by solutions, not by spelling", [
  [{ type: "equations", key: ["y = 2x + 1"] }, "y=2x+1", "correct"],
  [{ type: "equations", key: ["y = 2x + 1"] }, "2x−y+1=0", "correct"],
  [{ type: "equations", key: ["y = 2x + 1"] }, "y=2x+2", "wrong"],
]);

test("choice fields compare the chosen option with the key", () => {
  const field = { type: "choice", key: "b", options: ["a", "b", "c"] };
  assert.equal(status(field, "b"), "correct");
  assert.equal(status(field, "a"), "wrong");
  assert.equal(status(field, undefined), "empty");
  assert.equal(status(field, ""), "empty");
});

test("an unknown field type or a broken key is an authoring error, so it throws", () => {
  assert.throws(() => gradeField({ type: "essay", key: "x" }, "x"), /Unknown field type/);
  assert.throws(() => gradeField(number("not a number"), "1"), /Cannot grade number/);
});

test("gradeQuestion needs every field correct and reports each one", () => {
  const question = {
    parts: [
      { id: "a", fields: [{ id: "a1", ...number("1/2") }] },
      {
        id: "b",
        fields: [
          { id: "b1", ...expr("x + 1") },
          { id: "b2", ...interval("(0, 1)") },
        ],
      },
    ],
  };
  const right = gradeQuestion(question, { a1: "0.5", b1: "1+x", b2: "(0,1)" });
  assert.deepEqual([right.correct, right.answered, right.invalid], [true, true, false]);
  const partly = gradeQuestion(question, { a1: "0.5", b1: "x+2", b2: "(0,1)" });
  assert.equal(partly.correct, false);
  assert.equal(partly.fields.a1.status, "correct");
  assert.equal(partly.fields.b1.status, "wrong");
  const blank = gradeQuestion(question, {});
  assert.deepEqual([blank.correct, blank.answered, blank.invalid], [false, false, false]);
  const broken = gradeQuestion(question, { a1: "0.5", b1: "x +", b2: "(0,1)" });
  assert.equal(broken.invalid, true);
  assert.equal(broken.correct, false);
});

test("answerText prints keys with a real minus sign and round-trips through the grader", () => {
  const fields = [
    number("-3/4"),
    number("√3/2"),
    expr("−x^2 + 4"),
    interval("(−∞, 3]"),
    set(["-2", "5"]),
    { type: "points", key: [["-1", "2"]] },
    { type: "limit", key: "−∞" },
  ];
  for (const field of fields) {
    const text = answerText(field);
    assert.ok(!/(^|[\s,(\[])-\d/.test(text), `${text} uses a hyphen before a digit`);
    assert.equal(status(field, text), "correct", `${field.type} ${text}`);
  }
  assert.equal(answerText({ ...number("1"), text: "one" }), "one");
});

// Checking typed algebra: is a student's expression or equation the same as the key,
// and is it written in the form the question asks for (factored, expanded)?
//
// Equivalence is tested by evaluating both sides at many points, including every
// whole number from −6 to 6, so a missing hole such as (x² − 4)/(x − 2) versus x + 2
// is caught. Form checks read the syntax tree of what the student typed.

import { createEngine, parseTree, describe } from "../math/engine.js";
import { ReadError, norm, splitTop, balanced } from "./read.js";

// ---------- Preparing what the student typed ----------

const NAME_PREFIX =
  /^\s*(?:[A-Za-z](?:\^\(?-1\)?|⁻¹)?(?:\([A-Za-zθ, ]*\))?)\s*=(?![=<>])\s*/;

export function stripLeftName(text) {
  return String(text).replace(NAME_PREFIX, "");
}

function walk(node, visit) {
  if (!node || typeof node !== "object") return;
  visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
    else if (value && typeof value === "object") walk(value, visit);
  }
}

function variablesIn(tree) {
  const names = new Set();
  walk(tree, (node) => {
    if (node.type === "var") names.add(node.name);
  });
  return names;
}

function engineMessage(error, src) {
  const text = String(error?.message || "");
  return text && text.length < 90
    ? `I could not read "${src}". ${text}.`
    : `I could not read "${src}".`;
}

// Parses once and keeps a reusable evaluator. `vars` are the letters an answer may use.
export function prepare(text, vars = ["x"]) {
  const src = String(text ?? "").trim();
  if (!src) throw new ReadError("Enter an expression.");
  const body = stripLeftName(src).trim();
  if (!body) throw new ReadError("Enter an expression after the equals sign.");
  if (/(?<![<>!])=(?!=)/.test(body.replace(/[<>!]=/g, "")))
    throw new ReadError("Enter an expression, not an equation.");
  if (!balanced(body)) throw new ReadError("Check your parentheses.");
  let parsed;
  try {
    parsed = parseTree(body);
  } catch (error) {
    throw new ReadError(engineMessage(error, body));
  }
  if (parsed.readAs)
    throw new ReadError(
      `"${body}" is read as ${describe(parsed.tree)}. Add parentheses to show exactly what you mean.`,
    );
  const used = variablesIn(parsed.tree);
  const extra = [...used].filter((name) => !vars.includes(name));
  if (extra.length)
    throw new ReadError(
      vars.length === 1
        ? `Use only the variable ${vars[0]} in your answer.`
        : `Use only the variables ${vars.join(", ")} in your answer.`,
    );
  const engine = createEngine();
  let fn;
  try {
    fn = engine.compile(body, vars[0]);
  } catch (error) {
    throw new ReadError(engineMessage(error, body));
  }
  const others = vars.slice(1);
  return {
    source: body,
    tree: parsed.tree,
    evaluate(assignment) {
      for (const name of others) engine.run(`${name} = ${assignment[name]}`);
      return fn(assignment[vars[0]]);
    },
  };
}

// ---------- Sample points ----------

const GRID = [
  -9.37, -7.13, -5.5, -4.2, -3.1, -2.71, -1.5, -1.13, -0.6, -0.25, 0.35, 0.75, 1.2, 1.9,
  2.5, 3.33, 4.1, 5.07, 6.4, 8.2, 11.3, 14.6, 23.1,
];
const WHOLE_NUMBERS = Array.from({ length: 25 }, (_, i) => i - 12);
const HALVES = [-3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5, 4.5];
const SCALES = [0.1, 3, 10, 0.3, 30, 100];

function round3(value) {
  return Math.round(value * 1000) / 1000;
}

function samplePoints(vars, extra = [], phase = 0) {
  const base = [...new Set([...GRID, ...WHOLE_NUMBERS, ...HALVES, ...extra])];
  const list =
    phase === 0 ? base : base.map((value) => round3(value * SCALES[phase - 1]));
  if (vars.length === 1) return list.map((value) => ({ [vars[0]]: value }));
  const n = list.length;
  const points = [];
  for (let i = 0; i < n; i += 1) {
    const point = {};
    vars.forEach((name, j) => {
      point[name] = list[(i * (2 * j + 3) + 7 * j) % n];
    });
    points.push(point);
  }
  return points;
}

function close(a, b) {
  return Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(a), Math.abs(b));
}

// Compares two prepared expressions. Returns { equal, comparable, domain } where
// `domain` is true when the values agree but the two are defined at different inputs.
export function compareEvaluators(
  student,
  key,
  { vars = ["x"], strict = true, samples = [] } = {},
) {
  let comparable = 0;
  let domainMismatch = false;
  for (let phase = 0; phase <= SCALES.length; phase += 1) {
    for (const point of samplePoints(vars, samples, phase)) {
      const k = key.evaluate(point);
      const s = student.evaluate(point);
      const keyOk = Number.isFinite(k);
      const studentOk = Number.isFinite(s);
      if (keyOk && studentOk) {
        comparable += 1;
        if (!close(k, s)) return { equal: false, comparable, domain: false };
      } else if (keyOk !== studentOk) {
        if (keyOk || strict) domainMismatch = true;
      }
    }
    if (comparable >= 12) break;
  }
  if (domainMismatch) return { equal: false, comparable, domain: true };
  return { equal: comparable >= 6, comparable, domain: false };
}

export function expressionsEquivalent(studentText, keyText, options = {}) {
  const vars = options.vars || ["x"];
  const student = prepare(studentText, vars);
  const key = prepare(keyText, vars);
  return { ...compareEvaluators(student, key, { ...options, vars }), student };
}

// ---------- Equations ----------

function splitEquation(text) {
  const parts = text.split(/(?<![<>!])=(?!=)/);
  if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim())
    throw new ReadError("Write one equation with a single equals sign, like y = 2x + 1.");
  return parts.map((part) => part.trim());
}

function residual(text, vars) {
  const [left, right] = splitEquation(text);
  const l = prepare(left, vars);
  const r = prepare(right, vars);
  return {
    left: l,
    right: r,
    leftText: left,
    evaluate(point) {
      return l.evaluate(point) - r.evaluate(point);
    },
  };
}

// Two equations are the same when one residual is a nonzero constant multiple of the
// other everywhere, so y = 2x − 3, 2x − y = 3, and 3 = 2x − y all match.
export function equationsEquivalent(
  studentText,
  keyText,
  { vars = ["x", "y"], form = "any" } = {},
) {
  const student = residual(String(studentText).trim(), vars);
  const key = residual(String(keyText).trim(), vars);
  let ratio = null;
  let used = 0;
  const grid = samplePoints(vars, [], 0);
  for (const point of grid) {
    const k = key.evaluate(point);
    const s = student.evaluate(point);
    if (!Number.isFinite(k) || Math.abs(k) < 1e-6) continue;
    if (!Number.isFinite(s)) return { equal: false };
    const current = s / k;
    if (ratio === null) ratio = current;
    else if (!close(current, ratio)) return { equal: false };
    used += 1;
  }
  if (used < 6 || ratio === null || Math.abs(ratio) < 1e-9) return { equal: false };
  if (form === "slope-intercept") {
    if (student.leftText.replace(/\s+/g, "") !== "y")
      return { equal: false, problem: "Solve for y: write the equation as y = mx + b." };
    const problem = checkForm(student.right.tree, "slope-intercept", vars);
    if (problem) return { equal: false, problem };
  }
  return { equal: true };
}

// ---------- Polynomial forms ----------

const exponentKey = (exps) => exps.join(",");

function constPoly(c, n) {
  return c === 0 ? new Map() : new Map([[exponentKey(Array(n).fill(0)), c]]);
}
function varPoly(index, n) {
  const exps = Array(n).fill(0);
  exps[index] = 1;
  return new Map([[exponentKey(exps), 1]]);
}
function addPoly(a, b, sign = 1) {
  const out = new Map(a);
  for (const [key, value] of b) {
    const next = (out.get(key) || 0) + sign * value;
    if (Math.abs(next) < 1e-12) out.delete(key);
    else out.set(key, next);
  }
  return out;
}
function mulPoly(a, b) {
  const out = new Map();
  for (const [ka, va] of a)
    for (const [kb, vb] of b) {
      const exps = ka
        .split(",")
        .map((value, i) => Number(value) + Number(kb.split(",")[i]));
      const key = exponentKey(exps);
      const next = (out.get(key) || 0) + va * vb;
      if (Math.abs(next) < 1e-12) out.delete(key);
      else out.set(key, next);
    }
  return out;
}

// A constant value of a tree with no variables, or null.
function constantOf(node) {
  if (!node) return null;
  if (node.type === "num") return node.value;
  if (node.type === "neg") {
    const v = constantOf(node.arg);
    return v === null ? null : -v;
  }
  if (node.type === "bin") {
    const a = constantOf(node.left);
    const b = constantOf(node.right);
    if (a === null || b === null) return null;
    if (node.op === "+") return a + b;
    if (node.op === "-") return a - b;
    if (node.op === "*") return a * b;
    if (node.op === "/") return b === 0 ? null : a / b;
    return null;
  }
  if (node.type === "pow") {
    const a = constantOf(node.left);
    const b = constantOf(node.right);
    return a === null || b === null ? null : a ** b;
  }
  if (node.type === "call" && node.args?.length === 1) {
    const a = constantOf(node.args[0]);
    if (a === null) return null;
    if (node.name === "sqrt") return a < 0 ? null : Math.sqrt(a);
    if (node.name === "abs") return Math.abs(a);
    if (node.name === "cbrt") return Math.cbrt(a);
  }
  return null;
}

// The tree as a polynomial in `vars` (a Map of exponent vector to coefficient), or null.
export function toPoly(node, vars) {
  const n = vars.length;
  const constant = constantOf(node);
  if (constant !== null) return constPoly(constant, n);
  if (node.type === "var") {
    const index = vars.indexOf(node.name);
    return index < 0 ? null : varPoly(index, n);
  }
  if (node.type === "neg") {
    const inner = toPoly(node.arg, vars);
    return inner ? mulPoly(inner, constPoly(-1, n)) : null;
  }
  if (node.type === "bin") {
    const left = toPoly(node.left, vars);
    const right = toPoly(node.right, vars);
    if (!left || !right) return null;
    if (node.op === "+") return addPoly(left, right);
    if (node.op === "-") return addPoly(left, right, -1);
    if (node.op === "*") return mulPoly(left, right);
    if (node.op === "/") {
      const divisor = constantOf(node.right);
      return divisor === null || divisor === 0
        ? null
        : mulPoly(left, constPoly(1 / divisor, n));
    }
    return null;
  }
  if (node.type === "pow") {
    const exponent = constantOf(node.right);
    if (exponent === null || !Number.isInteger(exponent) || exponent < 0 || exponent > 12)
      return null;
    const base = toPoly(node.left, vars);
    if (!base) return null;
    let out = constPoly(1, n);
    for (let i = 0; i < exponent; i += 1) out = mulPoly(out, base);
    return out;
  }
  return null;
}

function totalDegree(poly) {
  let best = 0;
  for (const key of poly.keys())
    best = Math.max(
      best,
      key.split(",").reduce((sum, value) => sum + Number(value), 0),
    );
  return best;
}

function additiveTerms(node) {
  if (node.type === "bin" && (node.op === "+" || node.op === "-"))
    return [...additiveTerms(node.left), ...additiveTerms(node.right)];
  return [node];
}

function containsSum(node) {
  let found = false;
  walk(node, (child) => {
    if (child.type === "bin" && (child.op === "+" || child.op === "-")) found = true;
  });
  return found;
}

// The factors of a product, or null when the whole expression is a sum. A sum inside
// a product, as in (x − 2)(x + 3), is one factor.
function topLevelFactors(node, top = true) {
  let current = node;
  while (current.type === "neg") current = current.arg;
  if (current.type === "bin" && (current.op === "*" || current.op === "/")) {
    const left = topLevelFactors(current.left, false);
    const right = topLevelFactors(current.right, false);
    return [...left, ...right];
  }
  if (current.type === "bin") return top ? null : [current];
  if (current.type === "pow") {
    const exponent = constantOf(current.right);
    if (exponent !== null && Number.isInteger(exponent) && exponent >= 1)
      return topLevelFactors(current.left, false);
    return [current];
  }
  return [current];
}

// Returns null when the tree is in the requested form, or a message for the student.
export function checkForm(
  tree,
  form,
  vars = ["x"],
  { factorDegree = 1, integerFactors = false } = {},
) {
  if (form === "any" || !form) return null;
  if (form === "expanded" || form === "slope-intercept") {
    const whole = toPoly(tree, vars);
    const message =
      form === "slope-intercept"
        ? "Write the right side as mx + b, with no parentheses."
        : "Multiply out and combine like terms. Write the answer in standard form.";
    if (!whole) return message;
    if (form === "slope-intercept" && totalDegree(whole) > 1)
      return "A line has the form y = mx + b.";
    const seen = new Set();
    for (const term of additiveTerms(tree)) {
      const poly = toPoly(term, vars);
      if (!poly || poly.size > 1 || containsSum(term)) return message;
      for (const key of poly.keys()) {
        if (seen.has(key)) return "Combine like terms.";
        seen.add(key);
      }
    }
    return null;
  }
  if (form === "factored") {
    const factors = topLevelFactors(tree);
    if (!factors) return "Write the answer as a product of factors.";
    for (const factor of factors) {
      if (constantOf(factor) !== null) continue;
      const poly = toPoly(factor, vars);
      if (!poly) return "Write each factor as a polynomial, like (x − 2).";
      if (totalDegree(poly) > factorDegree)
        return factorDegree === 1
          ? "Factor completely: every factor should be linear."
          : "Factor completely.";
      if (integerFactors)
        for (const value of poly.values())
          if (Math.abs(value - Math.round(value)) > 1e-9)
            return "Use whole-number coefficients in each factor, like (2x − 1).";
    }
    return null;
  }
  if (form === "exponential" || form === "exponential-e" || form === "geometric")
    return exponentialProblem(tree, form, vars);
  if (form === "single-log") return singleLogProblem(tree);
  if (form === "log-sum") return logSumProblem(tree);
  return null;
}

// ---------- Exponential and logarithmic forms ----------

const isLogCall = (node) =>
  node?.type === "call" && (node.name === "log" || node.name === "ln");

function logCallsIn(node) {
  let count = 0;
  walk(node, (child) => {
    if (isLogCall(child)) count += 1;
  });
  return count;
}

// A product written with * (or / by a constant) split into its factors, or null.
function productFactors(node) {
  let current = node;
  let sign = false;
  while (current.type === "neg") {
    current = current.arg;
    sign = !sign;
  }
  if (current.type === "bin" && current.op === "*") {
    const left = productFactors(current.left);
    const right = productFactors(current.right);
    return left && right ? [...left, ...right] : null;
  }
  if (current.type === "bin" && current.op === "/") {
    if (constantOf(current.right) === null) return null;
    return productFactors(current.left);
  }
  return [current];
}

// a·b^x: one constant coefficient and one power with a constant base and the plain
// variable as its exponent. With e as the base, the exponent may be a multiple of the
// variable, as in 3e^(−0.2x).
function exponentialProblem(tree, form, vars) {
  const v = vars[0];
  const factors = productFactors(tree);
  const shape =
    form === "exponential-e"
      ? "Write the answer in the form a·e^(kx)."
      : form === "geometric"
        ? `Write the answer in the form g₀·rⁿ, with one constant ratio r.`
        : "Write the answer in the form a·b^x, with one constant base b.";
  if (!factors) return shape;
  const powers = factors.filter((factor) => constantOf(factor) === null);
  if (powers.length !== 1 || powers[0].type !== "pow") return shape;
  const power = powers[0];
  const base = constantOf(power.left);
  if (base === null || Math.abs(base - 1) < 1e-12 || Math.abs(base) < 1e-12) return shape;
  // A negative ratio is fine for a sequence (the inputs are whole numbers) but not for an
  // exponential function.
  if (base < 0 && form !== "geometric") return shape;
  if (form === "exponential" || form === "geometric") {
    return power.right.type === "var" && power.right.name === v
      ? null
      : "Write the exponent as just the input variable. Use the base that makes that true.";
  }
  if (Math.abs(base - Math.E) > 1e-9) return shape;
  const exponent = toPoly(power.right, vars);
  if (!exponent) return shape;
  const keys = [...exponent.keys()];
  return keys.length === 1 && keys[0] === "1" ? null : shape;
}

function singleLogProblem(tree) {
  if (isLogCall(tree) && logCallsIn(tree.args[0]) === 0) return null;
  return "Write the answer as a single logarithm.";
}

// Every term is a constant times one logarithm whose input is not a product, quotient,
// power, or root.
function logSumProblem(tree) {
  const message =
    "Expand the logarithm using the product, quotient, and power properties.";
  for (const term of additiveTerms(tree)) {
    const factors = productFactors(term);
    if (!factors) return message;
    const logs = factors.filter((factor) => constantOf(factor) === null);
    if (logs.length === 0) continue;
    if (logs.length !== 1 || !isLogCall(logs[0])) return message;
    const input = logs[0].args[0];
    if (logCallsIn(input) > 0) return message;
    if (
      (input.type === "bin" && (input.op === "*" || input.op === "/")) ||
      input.type === "pow" ||
      input.type === "call"
    )
      return message;
  }
  return null;
}

export function describeTree(tree) {
  return describe(tree);
}

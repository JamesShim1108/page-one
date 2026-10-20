// The calculator's expression engine. It reads what a student types the way a
// graphing calculator does, never with eval:
//
//   2(3 + 4)   1/2x  (read as (1/2)·x, and the result says so)   −2² = −4
//   sin(30°)   sin⁻¹(0.5)   √(2)   ∛(−8)   root(16, 4)   log(8, 2)   log₂(8)   |−3|
//   5!   12%   2.5E3   {1, 2, 3}   mean({…})   nCr(5, 2)   gcd(12, 18)
//   A = 5   5 → A   f(x) = x² − 3x   f(2)   y1(3) (a graph slot)   Ans
//   Σ(k², k, 1, 10)   seq(2^n, n, 0, 5)   solve(x² = 2, x, 1)   nDeriv(x³, x, 2)
//   fnInt(x², x, 0, 3)   polyRoots(1, 0, 1)  (x² + 1 → ±i)
//
// Angle mode (radians or degrees) and complex mode (real or a + bi) follow the settings.

import {
  derivative,
  integrate,
  oneVariable,
  polynomialRoots,
  solve as solveNumeric,
  toFraction,
} from "./numeric.js";

export class CalcError extends Error {
  constructor(message) {
    super(message);
    this.name = "CalcError";
  }
}

export class Complex {
  constructor(re, im = 0) {
    this.re = re;
    this.im = im;
  }
}

const fail = (message) => {
  throw new CalcError(message);
};
const isComplex = (v) => v instanceof Complex;
const isList = Array.isArray;
const toComplex = (v) => (isComplex(v) ? v : new Complex(v, 0));
// A complex value whose imaginary part is rounding noise becomes a real number.
const settle = (c) =>
  isComplex(c) && Math.abs(c.im) <= 1e-13 * Math.max(1, Math.abs(c.re)) ? c.re : c;

function finite(v) {
  if (isComplex(v)) {
    if (!Number.isFinite(v.re) || !Number.isFinite(v.im)) fail("Overflow");
    return settle(v);
  }
  if (Number.isNaN(v)) fail("Domain error");
  if (!Number.isFinite(v)) fail("Overflow");
  return v;
}

// ---------- Tokens ----------

const SUPERSCRIPTS = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁺": "+",
  "⁻": "-",
  "⁽": "(",
  "⁾": ")",
  ˣ: "x",
  ⁿ: "n",
  "⋅": "*",
};
const SUBSCRIPTS = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
};

const TRIG = ["sin", "cos", "tan", "sec", "csc", "cot"];
const HYPERBOLIC = ["sinh", "cosh", "tanh"];

export function normalizeInput(source) {
  return String(source)
    .replace(/(sinh|cosh|tanh|sin|cos|tan|sec|csc|cot)⁻¹/g, "a$1")
    .replace(
      /log([₀₁₂₃₄₅₆₇₈₉]+)/g,
      (m, digits) => `log_(${[...digits].map((d) => SUBSCRIPTS[d]).join("")})`,
    )
    .replace(/[−–—]/g, "-")
    .replace(/[×·∙⋅]/g, "*")
    .replace(/÷/g, "/")
    .replace(/ᴇ/g, "E")
    .replace(/≔/g, "=")
    .replace(/∫/g, "fnInt")
    .replace(
      /[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾ˣⁿ]+/g,
      (run) => `^(${[...run].map((c) => SUPERSCRIPTS[c]).join("")})`,
    );
}

// Multi-letter names the tokenizer recognizes; anything else splits into letters,
// so "xy" is x·y and "2pi" is 2π.
const KNOWN_NAMES = [];

function tokenize(source) {
  const text = normalizeInput(source);
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      const match = /^(\d+\.?\d*|\.\d+)(E[+-]?\d+)?/.exec(text.slice(i));
      if (!match || match[0] === ".") fail(`Unreadable number at position ${i + 1}`);
      tokens.push({ type: "num", value: Number(match[0].replace("E", "e")), at: i });
      i += match[0].length;
      continue;
    }
    if (/[A-Za-zπθΣ]/.test(ch)) {
      let run = /^[A-Za-zπθΣ]+/.exec(text.slice(i))[0];
      let end = i + run.length;
      // L1–L6 (data lists), y1–y6 (graph slots), log2 and log10 keep their digits.
      const digit = /^\d+/.exec(text.slice(end))?.[0] || "";
      if (digit) {
        if (/(^|[^A-Za-z])?L$/.test(run) && /^[1-6]$/.test(digit)) {
          run += digit;
          end += digit.length;
        } else if (/y$/.test(run) && /^[1-6]$/.test(digit) && text[end + 1] === "(") {
          run += digit;
          end += digit.length;
        } else if (
          /log$/.test(run) &&
          (digit === "2" || digit === "10") &&
          text[end + digit.length] === "("
        ) {
          run += digit;
          end += digit.length;
        }
      }
      for (const name of splitName(run))
        tokens.push({ type: "name", value: name, at: i });
      i = end;
      continue;
    }
    if ("+-*/^!%°(),[]{}|=_".includes(ch)) {
      tokens.push({ type: "op", value: ch, at: i });
      i += 1;
      continue;
    }
    if (ch === "→") {
      tokens.push({ type: "op", value: "→", at: i });
      i += 1;
      continue;
    }
    if (ch === "√" || ch === "∛" || ch === "∜") {
      tokens.push({ type: "op", value: ch, at: i });
      i += 1;
      continue;
    }
    if (ch === "∞") fail("∞ is not a number the calculator can compute with");
    fail(`Unexpected "${ch}"`);
  }
  return tokens;
}

function splitName(run) {
  const parts = [];
  let rest = run;
  while (rest) {
    const known = KNOWN_NAMES.find((name) => rest.startsWith(name));
    const take = known || (/^[Ly][1-6]/.test(rest) ? rest.slice(0, 2) : rest[0]);
    parts.push(take);
    rest = rest.slice(take.length);
  }
  return parts;
}

// ---------- Functions ----------

const DEG = Math.PI / 180;

function nearInteger(value) {
  return Math.abs(value - Math.round(value)) < 1e-12;
}

// Trig at exact angles returns exact values: sin(π) is 0, tan(45°) is 1.
function snapTrig(value, input) {
  if (Math.abs(input) < 1e-6) return value;
  const half = Math.round(value * 2) / 2;
  return Math.abs(value - half) < 1e-14 ? half : value;
}

function trig(name, x, ctx) {
  const radians = ctx.settings.angle === "deg" ? x * DEG : x;
  const turns = ctx.settings.angle === "deg" ? x / 180 : x / Math.PI; // multiples of π
  const s = () => (nearInteger(turns) ? 0 : snapTrig(Math.sin(radians), x));
  const c = () => (nearInteger(turns - 0.5) ? 0 : snapTrig(Math.cos(radians), x));
  const ratio = (top, bottom) => {
    const b = bottom();
    if (b === 0) fail(`Domain error: ${name} is undefined at this angle`);
    return snapTrig(top() / b, x);
  };
  switch (name) {
    case "sin":
      return s();
    case "cos":
      return c();
    case "tan":
      return ratio(s, c);
    case "sec":
      return ratio(() => 1, c);
    case "csc":
      return ratio(() => 1, s);
    case "cot":
      return ratio(c, s);
    default:
      return NaN;
  }
}

function inverseTrig(name, x, ctx) {
  const out = (r) => (ctx.settings.angle === "deg" ? r / DEG : r);
  const check = (ok, message) => ok || fail(`Domain error: ${message}`);
  switch (name) {
    case "asin":
      check(Math.abs(x) <= 1, "sin⁻¹ needs an input from −1 to 1");
      return out(Math.asin(x));
    case "acos":
      check(Math.abs(x) <= 1, "cos⁻¹ needs an input from −1 to 1");
      return out(Math.acos(x));
    case "atan":
      return out(Math.atan(x));
    case "acsc":
      check(Math.abs(x) >= 1, "csc⁻¹ needs |input| ≥ 1");
      return out(Math.asin(1 / x));
    case "asec":
      check(Math.abs(x) >= 1, "sec⁻¹ needs |input| ≥ 1");
      return out(Math.acos(1 / x));
    case "acot":
      return out(x === 0 ? Math.PI / 2 : Math.atan(1 / x) + (x < 0 ? Math.PI : 0));
    default:
      return NaN;
  }
}

// Lanczos approximation, used for factorials of non-integers.
function gamma(z) {
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  const g = 7;
  const p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  z -= 1;
  let x = p[0];
  for (let i = 1; i < g + 2; i += 1) x += p[i] / (z + i);
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * t ** (z + 0.5) * Math.exp(-t) * x;
}

function factorial(n) {
  if (Number.isInteger(n)) {
    if (n < 0) fail("Domain error: factorial of a negative integer");
    if (n > 170) fail("Overflow");
    let r = 1;
    for (let k = 2; k <= n; k += 1) r *= k;
    return r;
  }
  if (n < 0 && Number.isInteger(n + 1)) fail("Domain error");
  return gamma(n + 1);
}

const integer = (v, name) => {
  const n = real(v, name);
  if (!Number.isInteger(n)) fail(`${name} needs whole numbers`);
  return n;
};

function real(v, name = "This function") {
  if (isComplex(v)) fail(`${name} needs a real number`);
  if (isList(v)) fail(`${name} needs a number, not a list`);
  return v;
}

function listOf(args, name) {
  const values = args.length === 1 && isList(args[0]) ? args[0] : args;
  if (!values.length) fail(`${name} needs at least one value`);
  return values.map((v) => real(v, name));
}

const gcd2 = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};

function complexSqrt(z) {
  const r = Math.hypot(z.re, z.im);
  const re = Math.sqrt((r + z.re) / 2);
  const im = Math.sign(z.im || 1) * Math.sqrt(Math.max(0, (r - z.re) / 2));
  return new Complex(re, im);
}
function complexLog(z) {
  return new Complex(Math.log(Math.hypot(z.re, z.im)), Math.atan2(z.im, z.re));
}
function complexExp(z) {
  const m = Math.exp(z.re);
  return new Complex(m * Math.cos(z.im), m * Math.sin(z.im));
}

// Each entry: [min args, max args, function(args, ctx), maps over lists?]
const FUNCTIONS = {};
function define(names, min, max, fn, maps = true) {
  for (const name of [].concat(names)) FUNCTIONS[name] = { min, max, fn, maps };
}

for (const name of TRIG) define(name, 1, 1, ([x], ctx) => trig(name, real(x, name), ctx));
for (const name of ["asin", "acos", "atan", "acsc", "asec", "acot"]) {
  define([name, `arc${name.slice(1)}`], 1, 1, ([x], ctx) =>
    inverseTrig(name, real(x, name), ctx),
  );
}
define("sinh", 1, 1, ([x]) => Math.sinh(real(x, "sinh")));
define("cosh", 1, 1, ([x]) => Math.cosh(real(x, "cosh")));
define("tanh", 1, 1, ([x]) => Math.tanh(real(x, "tanh")));
define("asinh", 1, 1, ([x]) => Math.asinh(real(x, "sinh⁻¹")));
define("acosh", 1, 1, ([x]) => {
  if (real(x) < 1) fail("Domain error: cosh⁻¹ needs an input of at least 1");
  return Math.acosh(x);
});
define("atanh", 1, 1, ([x]) => {
  if (Math.abs(real(x)) >= 1)
    fail("Domain error: tanh⁻¹ needs an input between −1 and 1");
  return Math.atanh(x);
});
define(["sqrt", "√"], 1, 1, ([x], ctx) => {
  if (isComplex(x) || x < 0) {
    if (!ctx.settings.complex && !isComplex(x))
      fail("Nonreal result. Turn on a + bi mode to see complex answers");
    return complexSqrt(toComplex(x));
  }
  return Math.sqrt(x);
});
define(["cbrt", "∛"], 1, 1, ([x]) => Math.cbrt(real(x, "∛")));
define(["root", "∜"], 1, 2, ([x, n = 4]) => {
  real(x, "root");
  integer(n, "root");
  if (n === 0) fail("Domain error: the zeroth root is undefined");
  if (x < 0) {
    if (Math.abs(n) % 2 === 1) return -((-x) ** (1 / n));
    fail("Nonreal result: an even root of a negative number");
  }
  return x ** (1 / n);
});
function logarithm(x, base, ctx, label) {
  if (isComplex(x) || x <= 0) {
    if (x === 0) fail(`Domain error: ${label}(0) is undefined`);
    if (!ctx.settings.complex && !isComplex(x))
      fail(`Domain error: ${label} needs a positive input`);
    const z = complexLog(toComplex(x));
    const lb = Math.log(base);
    return new Complex(z.re / lb, z.im / lb);
  }
  return Math.log(x) / Math.log(base);
}
define("ln", 1, 1, ([x], ctx) => {
  if (isComplex(x) || x <= 0) return logarithm(x, Math.E, ctx, "ln");
  return Math.log(x);
});
define("log", 1, 2, ([x, b = 10], ctx) => {
  real(b, "log base");
  if (b <= 0 || b === 1)
    fail("Domain error: a logarithm base must be positive and not 1");
  if (b === 10 && !isComplex(x) && x > 0) return Math.log10(x);
  if (b === 2 && !isComplex(x) && x > 0) return Math.log2(x);
  return logarithm(x, b, ctx, "log");
});
define("log2", 1, 1, ([x], ctx) => FUNCTIONS.log.fn([x, 2], ctx));
define("log10", 1, 1, ([x], ctx) => FUNCTIONS.log.fn([x, 10], ctx));
define("exp", 1, 1, ([x]) => (isComplex(x) ? complexExp(x) : Math.exp(x)));
define("abs", 1, 1, ([x]) => (isComplex(x) ? Math.hypot(x.re, x.im) : Math.abs(x)));
define("sign", 1, 1, ([x]) => Math.sign(real(x, "sign")));
define("floor", 1, 1, ([x]) => Math.floor(real(x, "floor")));
define("ceil", 1, 1, ([x]) => Math.ceil(real(x, "ceil")));
define(["trunc", "iPart"], 1, 1, ([x]) => Math.trunc(real(x, "iPart")));
define("fPart", 1, 1, ([x]) => real(x, "fPart") - Math.trunc(x));
define("round", 1, 2, ([x, d = 0]) => {
  real(x, "round");
  integer(d, "round");
  const f = 10 ** d;
  return Math.round((x + Math.sign(x) * Number.EPSILON * Math.abs(x)) * f) / f;
});
define("mod", 2, 2, ([a, b]) => {
  real(a, "mod");
  real(b, "mod");
  if (b === 0) fail("Division by zero");
  return a - b * Math.floor(a / b);
});
define(
  "gcd",
  2,
  99,
  (args) =>
    listOf(args, "gcd")
      .map((v) => integer(v, "gcd"))
      .reduce(gcd2),
  false,
);
define(
  "lcm",
  2,
  99,
  (args) =>
    listOf(args, "lcm")
      .map((v) => integer(v, "lcm"))
      .reduce((a, b) => (a && b ? Math.abs(a * b) / gcd2(a, b) : 0)),
  false,
);
define(["nCr", "ncr"], 2, 2, ([n, r]) => {
  integer(n, "nCr");
  integer(r, "nCr");
  if (n < 0 || r < 0) fail("Domain error: nCr needs nonnegative whole numbers");
  if (r > n) return 0;
  let out = 1;
  for (let k = 1; k <= Math.min(r, n - r); k += 1)
    out = (out * (n - Math.min(r, n - r) + k)) / k;
  return Math.round(out);
});
define(["nPr", "npr"], 2, 2, ([n, r]) => {
  integer(n, "nPr");
  integer(r, "nPr");
  if (n < 0 || r < 0) fail("Domain error: nPr needs nonnegative whole numbers");
  if (r > n) return 0;
  let out = 1;
  for (let k = 0; k < r; k += 1) out *= n - k;
  return out;
});
define("gamma", 1, 1, ([x]) => gamma(real(x, "gamma")));
define("min", 1, 99, (args) => Math.min(...listOf(args, "min")), false);
define("max", 1, 99, (args) => Math.max(...listOf(args, "max")), false);
define("mean", 1, 99, (args) => oneVariable(listOf(args, "mean")).mean, false);
define("median", 1, 99, (args) => oneVariable(listOf(args, "median")).median, false);
define(
  "stdDev",
  1,
  99,
  (args) => {
    const values = listOf(args, "stdDev");
    if (values.length < 2) fail("stdDev needs at least two values");
    return oneVariable(values).sampleSD;
  },
  false,
);
define(
  "stdDevP",
  1,
  99,
  (args) => oneVariable(listOf(args, "stdDevP")).populationSD,
  false,
);
define(
  "variance",
  1,
  99,
  (args) => {
    const values = listOf(args, "variance");
    if (values.length < 2) fail("variance needs at least two values");
    return oneVariable(values).sampleSD ** 2;
  },
  false,
);
define(
  ["dim", "length"],
  1,
  1,
  ([list]) => (isList(list) ? list.length : fail("dim needs a list")),
  false,
);
define(
  "sort",
  1,
  1,
  ([list]) =>
    isList(list)
      ? listOf([list], "sort").sort((a, b) => a - b)
      : fail("sort needs a list"),
  false,
);
define("prod", 1, 99, (args) => listOf(args, "prod").reduce((a, b) => a * b, 1), false);
define(
  "polyRoots",
  2,
  99,
  (args) => {
    const coefficients = listOf(args, "polyRoots");
    if (coefficients.every((c) => c === 0)) fail("polyRoots needs a nonzero coefficient");
    return polynomialRoots(coefficients).map((z) =>
      z.im === 0 ? z.re : new Complex(z.re, z.im),
    );
  },
  false,
);
define("conj", 1, 1, ([z]) => (isComplex(z) ? new Complex(z.re, -z.im) : z));
define("real", 1, 1, ([z]) => (isComplex(z) ? z.re : z));
define("imag", 1, 1, ([z]) => (isComplex(z) ? z.im : 0));
define("angle", 1, 1, ([z], ctx) => {
  const c = toComplex(z);
  const r = Math.atan2(c.im, c.re);
  return ctx.settings.angle === "deg" ? r / DEG : r;
});
define("rand", 0, 0, () => Math.random(), false);
define(
  "randInt",
  2,
  2,
  ([a, b]) => {
    integer(a, "randInt");
    integer(b, "randInt");
    const [lo, hi] = a < b ? [a, b] : [b, a];
    return lo + Math.floor(Math.random() * (hi - lo + 1));
  },
  false,
);

// Special forms receive their arguments unevaluated: the expression and its variable.
const SPECIAL = {
  Σ: { min: 4, max: 4 },
  summation: { min: 4, max: 4 },
  seq: { min: 4, max: 5 },
  solve: { min: 2, max: 4 },
  nDeriv: { min: 3, max: 3 },
  fnInt: { min: 4, max: 4 },
};
// sum(list) is a list sum; sum(expr, k, a, b) is a summation.
define("sum", 1, 99, (args) => listOf(args, "sum").reduce((a, b) => a + b, 0), false);

const ALIASES = {
  randint: "randInt",
  nderiv: "nDeriv",
  fnint: "fnInt",
  stddev: "stdDev",
  polyroots: "polyRoots",
  ans: "Ans",
  pi: "π",
};

KNOWN_NAMES.push(
  ...[
    ...Object.keys(FUNCTIONS),
    ...Object.keys(SPECIAL),
    ...Object.keys(ALIASES),
    "Ans",
    "pi",
  ]
    .filter((name) => name.length > 1)
    .sort((a, b) => b.length - a.length),
);

export const FUNCTION_NAMES = Object.freeze(Object.keys(FUNCTIONS));

// ---------- Parser ----------

const RESERVED_LETTERS = new Set(["e", "i", "π", "Σ"]);
export const isVariableName = (name) =>
  typeof name === "string" && /^([A-Za-zθ])$/.test(name) && !RESERVED_LETTERS.has(name);

function parse(tokens, { functions = new Set(), allowStatements = true } = {}) {
  let index = 0;
  let absDepth = 0;
  let readAs = false;
  const peek = (offset = 0) => tokens[index + offset];
  const take = () => tokens[index++];
  const isOp = (token, value) => token?.type === "op" && token.value === value;
  const expect = (value, message) => {
    const token = take();
    if (!isOp(token, value)) fail(message || `Missing "${value}"`);
  };

  function statement() {
    if (allowStatements) {
      const first = peek();
      // f(x) = …  or  f(x, y) = …
      if (first?.type === "name" && isVariableName(first.value) && isOp(peek(1), "(")) {
        let k = 2;
        const params = [];
        while (peek(k)?.type === "name" && isVariableName(peek(k).value)) {
          params.push(peek(k).value);
          if (isOp(peek(k + 1), ",")) k += 2;
          else {
            k += 1;
            break;
          }
        }
        if (params.length && isOp(peek(k), ")") && isOp(peek(k + 1), "=")) {
          index = k + 2;
          const body = expression();
          if (index < tokens.length) fail(`Unexpected "${peek().value}"`);
          return { type: "define", name: first.value, params, body };
        }
      }
      // A = …
      if (first?.type === "name" && isVariableName(first.value) && isOp(peek(1), "=")) {
        index = 2;
        const body = expression();
        if (index < tokens.length) fail(`Unexpected "${peek().value}"`);
        return { type: "assign", name: first.value, body };
      }
    }
    const node = expression();
    if (isOp(peek(), "→")) {
      take();
      const target = take();
      if (target?.type !== "name" || !isVariableName(target.value))
        fail("Store into one letter, as in 5 → A");
      if (index < tokens.length) fail(`Unexpected "${peek().value}"`);
      return { type: "assign", name: target.value, body: node };
    }
    if (index < tokens.length) {
      const token = peek();
      if (isOp(token, "="))
        fail(
          "Use = to store (A = 5) or define a function (f(x) = x²). To solve an equation, use solve(…)",
        );
      if (isOp(token, ")")) fail('Unmatched ")"');
      fail(`Unexpected "${token.value}"`);
    }
    return node;
  }

  function expression(allowEquation = false) {
    const left = sum();
    if (allowEquation && isOp(peek(), "=")) {
      take();
      return { type: "equation", left, right: sum() };
    }
    return left;
  }

  function sum() {
    let node = product();
    while (isOp(peek(), "+") || isOp(peek(), "-")) {
      const op = take().value;
      node = { type: "bin", op, left: node, right: product() };
    }
    return node;
  }

  function startsImplicit(token) {
    if (!token) return false;
    if (token.type === "num" || token.type === "name") return true;
    if (token.type !== "op") return false;
    if (["(", "[", "{", "√", "∛", "∜"].includes(token.value)) return true;
    return token.value === "|" && absDepth === 0;
  }

  function product() {
    let node = unary();
    let divided = false;
    for (;;) {
      const token = peek();
      if (isOp(token, "*") || isOp(token, "/")) {
        take();
        if (token.value === "/") divided = true;
        node = { type: "bin", op: token.value, left: node, right: unary() };
      } else if (startsImplicit(token)) {
        if (token.type === "num" && tokens[index - 1]?.type === "num")
          fail("Two numbers in a row need an operator between them");
        if (divided) readAs = true;
        node = { type: "bin", op: "*", implicit: true, left: node, right: power() };
      } else return node;
    }
  }

  function unary() {
    const token = peek();
    if (isOp(token, "-")) {
      take();
      const operand = unary();
      if (operand.type === "pow") readAs = true;
      return { type: "neg", arg: operand };
    }
    if (isOp(token, "+")) {
      take();
      return unary();
    }
    return power();
  }

  function power() {
    const base = postfix();
    if (isOp(peek(), "^")) {
      take();
      return { type: "pow", left: base, right: unary() };
    }
    return base;
  }

  function postfix() {
    let node = primary();
    for (;;) {
      const token = peek();
      if (isOp(token, "!")) node = { type: "fact", arg: node };
      else if (isOp(token, "%")) node = { type: "percent", arg: node };
      else if (isOp(token, "°")) node = { type: "degree", arg: node };
      else return node;
      take();
    }
  }

  function args(name, allowEquation = false) {
    expect("(", `${name} needs parentheses, as in ${name}(…)`);
    const list = [];
    if (isOp(peek(), ")")) {
      take();
      return list;
    }
    for (;;) {
      list.push(expression(allowEquation && list.length === 0));
      if (isOp(peek(), ",")) take();
      else break;
    }
    expect(")", `Missing ")" after the inputs of ${name}`);
    return list;
  }

  function primary() {
    const token = take();
    if (!token) fail("The expression ends too soon");
    if (token.type === "num") return { type: "num", value: token.value };
    if (token.type === "op") {
      if (token.value === "(" || token.value === "[") {
        const inner = expression();
        expect(
          token.value === "(" ? ")" : "]",
          `Missing "${token.value === "(" ? ")" : "]"}"`,
        );
        return inner;
      }
      if (token.value === "{") {
        const items = [];
        if (!isOp(peek(), "}"))
          for (;;) {
            items.push(expression());
            if (isOp(peek(), ",")) take();
            else break;
          }
        expect("}", 'Missing "}" at the end of the list');
        return { type: "list", items };
      }
      if (token.value === "|") {
        absDepth += 1;
        const inner = expression();
        expect("|", 'Missing the closing "|"');
        absDepth -= 1;
        return { type: "call", name: "abs", args: [inner] };
      }
      if (["√", "∛", "∜"].includes(token.value)) {
        const name = { "√": "sqrt", "∛": "cbrt", "∜": "root" }[token.value];
        const operand = isOp(peek(), "(") ? primary() : power();
        if (!isOp(tokens[index - 1], ")") && startsImplicit(peek())) readAs = true;
        return {
          type: "call",
          name,
          args: name === "root" ? [operand, { type: "num", value: 4 }] : [operand],
        };
      }
      if (token.value === "-") fail("Use a minus sign before the number, as in −5");
      fail(`Unexpected "${token.value}"`);
    }
    // Names
    let name = ALIASES[token.value] || token.value;
    if (name === "sum" && looksLikeSummation()) name = "Σ";
    if (SPECIAL[name]) {
      const list = args(name, name === "solve");
      const spec = SPECIAL[name];
      if (list.length < spec.min || list.length > spec.max)
        fail(arityMessage(name, spec));
      return { type: "special", name: name === "summation" ? "Σ" : name, args: list };
    }
    if (FUNCTIONS[name]) {
      let exponent = null;
      let base = null;
      if (name === "log" && isOp(peek(), "_")) {
        take();
        base = primary();
      }
      // sin^-1(x) is the inverse function, as on a calculator key.
      if (
        isOp(peek(), "^") &&
        isOp(peek(1), "-") &&
        peek(2)?.type === "num" &&
        peek(2).value === 1 &&
        FUNCTIONS[`a${name}`]
      ) {
        index += 3;
        name = `a${name}`;
      }
      // sin²(x) means (sin x)².
      if (isOp(peek(), "^") && !isOp(peek(1), "-") && name !== "log") {
        take();
        exponent = primary();
      }
      const list = args(name);
      if (base) list.push(base);
      const spec = FUNCTIONS[name];
      if (list.length < spec.min || list.length > spec.max)
        fail(arityMessage(name, spec));
      const call = { type: "call", name, args: list };
      return exponent ? { type: "pow", left: call, right: exponent } : call;
    }
    if (/^y[1-6]$/.test(name) && isOp(peek(), "(")) {
      const list = args(name);
      if (list.length !== 1) fail(`${name} takes one input, as in ${name}(2)`);
      return { type: "slot", name, args: list };
    }
    if (functions.has(name) && isOp(peek(), "("))
      return { type: "user", name, args: args(name) };
    if (name === "π") return { type: "num", value: Math.PI, label: "π" };
    if (name === "e") return { type: "num", value: Math.E, label: "e" };
    if (name === "i") return { type: "imaginary" };
    if (name === "Ans") return { type: "ans" };
    if (/^L[1-6]$/.test(name)) return { type: "datalist", name };
    if (isVariableName(name)) return { type: "var", name };
    fail(`Unknown name "${name}"`);
  }

  function looksLikeSummation() {
    // sum(expr, k, a, b): four arguments at the top level of the parentheses.
    if (!isOp(peek(), "(")) return false;
    let depth = 0;
    let commas = 0;
    for (let k = index; k < tokens.length; k += 1) {
      const t = tokens[k];
      if (t.type !== "op") continue;
      if ("([{".includes(t.value)) depth += 1;
      else if (")]}".includes(t.value)) {
        depth -= 1;
        if (depth === 0) break;
      } else if (t.value === "," && depth === 1) commas += 1;
    }
    return commas === 3;
  }

  const tree = statement();
  return { tree, readAs };
}

function arityMessage(name, spec) {
  if (spec.min === spec.max)
    return `${name} takes ${spec.min} input${spec.min === 1 ? "" : "s"}`;
  return `${name} takes ${spec.min} to ${spec.max === 99 ? "many" : spec.max} inputs`;
}

// ---------- Arithmetic ----------

function broadcast(a, b, fn) {
  if (isList(a) || isList(b)) {
    if (isList(a) && isList(b)) {
      if (a.length !== b.length) fail("Lists must have the same length");
      return a.map((v, i) => fn(v, b[i]));
    }
    return isList(a) ? a.map((v) => fn(v, b)) : b.map((v) => fn(a, v));
  }
  return fn(a, b);
}

function add(a, b) {
  return broadcast(a, b, (x, y) => {
    if (isComplex(x) || isComplex(y)) {
      const p = toComplex(x);
      const q = toComplex(y);
      return settle(new Complex(p.re + q.re, p.im + q.im));
    }
    return x + y;
  });
}
function negate(a) {
  if (isList(a)) return a.map(negate);
  return isComplex(a) ? new Complex(-a.re, -a.im) : -a;
}
function multiply(a, b) {
  return broadcast(a, b, (x, y) => {
    if (isComplex(x) || isComplex(y)) {
      const p = toComplex(x);
      const q = toComplex(y);
      return settle(new Complex(p.re * q.re - p.im * q.im, p.re * q.im + p.im * q.re));
    }
    return x * y;
  });
}
function divide(a, b) {
  return broadcast(a, b, (x, y) => {
    if (isComplex(x) || isComplex(y)) {
      const p = toComplex(x);
      const q = toComplex(y);
      const d = q.re * q.re + q.im * q.im;
      if (d === 0) fail("Division by zero");
      return settle(
        new Complex((p.re * q.re + p.im * q.im) / d, (p.im * q.re - p.re * q.im) / d),
      );
    }
    if (y === 0) fail("Division by zero");
    return x / y;
  });
}
function raise(a, b, ctx) {
  return broadcast(a, b, (x, y) => {
    if (isComplex(x) || isComplex(y)) {
      const p = toComplex(x);
      if (!isComplex(y) && Number.isInteger(y) && Math.abs(y) <= 64) {
        let out = new Complex(1, 0);
        for (let k = 0; k < Math.abs(y); k += 1) out = toComplex(multiply(out, p));
        return y < 0 ? divide(1, out) : settle(out);
      }
      if (p.re === 0 && p.im === 0) return 0;
      const l = complexLog(p);
      const q = toComplex(y);
      return settle(
        complexExp(new Complex(q.re * l.re - q.im * l.im, q.re * l.im + q.im * l.re)),
      );
    }
    if (x === 0 && y === 0) fail("0^0 is undefined");
    if (x === 0 && y < 0) fail("Division by zero");
    if (x < 0 && !Number.isInteger(y)) {
      // A power p/q with odd q is real: (−8)^(1/3) = −2 and (−8)^(2/3) = 4.
      const fraction = toFraction(y, 99);
      if (fraction && fraction.d % 2 === 1 && !ctx.settings.complex)
        return (Math.abs(fraction.n) % 2 === 0 ? 1 : -1) * (-x) ** y;
      if (!ctx.settings.complex)
        fail("Nonreal result. Turn on a + bi mode to see complex answers");
      return raise(toComplex(x), y, ctx);
    }
    return x ** y;
  });
}

// ---------- Evaluation ----------

function evaluate(node, ctx, scope) {
  switch (node.type) {
    case "num":
      return node.value;
    case "imaginary":
      if (!ctx.settings.complex)
        fail("i is the imaginary unit. Turn on a + bi mode to use it");
      return new Complex(0, 1);
    case "ans":
      return ctx.ans;
    case "var": {
      if (scope && node.name in scope) return scope[node.name];
      if (ctx.vars.has(node.name)) return ctx.vars.get(node.name);
      fail(`${node.name} has no value yet. Store one first, as in 3 → ${node.name}`);
      break;
    }
    case "datalist": {
      const list = ctx.lists?.[node.name];
      if (!list?.length) fail(`${node.name} is empty. Enter data on the Stats tab`);
      return [...list];
    }
    case "list":
      return node.items.map((item) => {
        const value = evaluate(item, ctx, scope);
        if (isList(value)) fail("Lists cannot contain lists");
        return value;
      });
    case "neg":
      return negate(evaluate(node.arg, ctx, scope));
    case "bin": {
      const a = evaluate(node.left, ctx, scope);
      const b = evaluate(node.right, ctx, scope);
      if (node.op === "+") return add(a, b);
      if (node.op === "-") return add(a, negate(b));
      if (node.op === "*") return multiply(a, b);
      return divide(a, b);
    }
    case "pow":
      return raise(
        evaluate(node.left, ctx, scope),
        evaluate(node.right, ctx, scope),
        ctx,
      );
    case "fact":
      return mapReal(evaluate(node.arg, ctx, scope), factorial, "!");
    case "percent":
      return divide(evaluate(node.arg, ctx, scope), 100);
    case "degree": {
      const value = evaluate(node.arg, ctx, scope);
      return ctx.settings.angle === "deg" ? value : multiply(value, DEG);
    }
    case "call": {
      const spec = FUNCTIONS[node.name];
      const values = node.args.map((arg) => evaluate(arg, ctx, scope));
      if (spec.maps && values.length === 1 && isList(values[0]))
        return values[0].map((v) => finite(spec.fn([v], ctx)));
      if (spec.maps && values.some(isList)) fail(`${node.name} cannot take a list here`);
      return spec.fn(values, ctx);
    }
    case "user":
      return callUser(node, ctx, scope);
    case "slot":
      return callSlot(node, ctx, scope);
    case "special":
      return evaluateSpecial(node, ctx, scope);
    case "equation":
      fail("An equation (with =) can only go inside solve(…)");
      break;
    default:
      fail("Cannot evaluate this expression");
  }
  return NaN;
}

function mapReal(value, fn, label) {
  if (isList(value)) return value.map((v) => fn(real(v, label)));
  return fn(real(value, label));
}

function withDepth(ctx, fn) {
  ctx.depth = (ctx.depth || 0) + 1;
  try {
    if (ctx.depth > 64) fail("Too many nested function calls");
    return fn();
  } finally {
    ctx.depth -= 1;
  }
}

function callUser(node, ctx, scope) {
  const def = ctx.funcs.get(node.name);
  if (node.args.length !== def.params.length)
    fail(
      `${node.name} takes ${def.params.length} input${def.params.length === 1 ? "" : "s"}`,
    );
  const values = node.args.map((arg) => evaluate(arg, ctx, scope));
  const local = Object.fromEntries(def.params.map((p, i) => [p, values[i]]));
  return withDepth(ctx, () => evaluate(def.body, ctx, local));
}

function callSlot(node, ctx, scope) {
  const source = ctx.slots?.[node.name];
  if (!source?.trim()) fail(`${node.name} is empty. Enter it on the Graph tab`);
  const tree = ctx.parseCached(source, false);
  const x = evaluate(node.args[0], ctx, scope);
  return withDepth(ctx, () => evaluate(tree, ctx, { x }));
}

// Turns an expression in one variable into a real function for the numeric methods.
function realFunction(node, variable, ctx, scope) {
  return (t) => {
    try {
      const value = evaluate(node, ctx, { ...scope, [variable]: t });
      const settled = settle(value);
      return typeof settled === "number" && Number.isFinite(settled) ? settled : NaN;
    } catch {
      return NaN;
    }
  };
}

function boundVariable(node, name) {
  if (node?.type !== "var")
    fail(`The second input of ${name} must be a variable letter, as in ${name}(…, x, …)`);
  return node.name;
}

function evaluateSpecial(node, ctx, scope) {
  const { name, args } = node;
  const number = (arg, label) => real(evaluate(arg, ctx, scope), label);
  if (name === "Σ" || name === "seq") {
    const variable = boundVariable(args[1], name);
    const start = number(args[2], name);
    const end = number(args[3], name);
    const step = args[4] ? number(args[4], name) : 1;
    if (name === "Σ" && (!Number.isInteger(start) || !Number.isInteger(end)))
      fail("Σ needs whole-number limits");
    if (step === 0) fail("seq needs a nonzero step");
    const count = Math.floor((end - start) / step) + 1;
    if (count > (name === "Σ" ? 1e6 : 1e4)) fail("Too many terms");
    const values = [];
    for (let k = 0; k < count; k += 1) {
      const value = evaluate(args[0], ctx, { ...scope, [variable]: start + k * step });
      if (isList(value)) fail(`${name} terms must be numbers`);
      values.push(value);
    }
    if (name === "seq") return values;
    return values.reduce((s, v) => add(s, v), 0);
  }
  if (name === "solve") {
    const variable = boundVariable(args[1], "solve");
    const equation =
      args[0].type === "equation"
        ? { type: "bin", op: "-", left: args[0].left, right: args[0].right }
        : args[0];
    const f = realFunction(equation, variable, ctx, scope);
    const stored = ctx.vars.get(variable);
    const guess = args[2]
      ? number(args[2], "solve")
      : typeof stored === "number"
        ? stored
        : 0;
    const high = args[3] ? number(args[3], "solve") : undefined;
    const root = solveNumeric(f, guess, high);
    if (!Number.isFinite(root))
      fail(
        high === undefined
          ? "No solution found near the guess. Try another guess, or a range: solve(…, x, low, high)"
          : "No solution found in that range",
      );
    return root;
  }
  if (name === "nDeriv") {
    const variable = boundVariable(args[1], "nDeriv");
    const at = number(args[2], "nDeriv");
    const f = realFunction(args[0], variable, ctx, scope);
    if (!Number.isFinite(f(at))) fail("The function is undefined there");
    const value = derivative(f, at);
    if (!Number.isFinite(value)) fail("The derivative could not be computed there");
    return value;
  }
  if (name === "fnInt") {
    const variable = boundVariable(args[1], "fnInt");
    const a = number(args[2], "fnInt");
    const b = number(args[3], "fnInt");
    const value = integrate(realFunction(args[0], variable, ctx, scope), a, b);
    if (!Number.isFinite(value)) fail("The integral did not converge");
    return value;
  }
  fail(`Unknown function ${name}`);
  return NaN;
}

function checkResult(value) {
  if (isList(value)) return value.map(finite);
  return finite(value);
}

// ---------- Engine ----------

export const DEFAULT_SETTINGS = Object.freeze({ angle: "rad", complex: false });

export function serializeValue(value) {
  if (isList(value)) return value.map(serializeValue);
  if (isComplex(value)) return { re: value.re, im: value.im };
  return value;
}
export function deserializeValue(value) {
  if (Array.isArray(value)) return value.map(deserializeValue);
  if (value && typeof value === "object")
    return new Complex(Number(value.re), Number(value.im));
  return Number(value);
}

export function createEngine(saved = {}) {
  const cache = new Map();
  const ctx = {
    settings: { ...DEFAULT_SETTINGS, ...(saved.settings || {}) },
    vars: new Map(),
    funcs: new Map(),
    ans: 0,
    lists: {},
    slots: {},
    parseCached(source, statements) {
      const key = `${statements ? "s" : "e"}:${[...ctx.funcs.keys()].join("")}:${source}`;
      if (!cache.has(key)) {
        if (cache.size > 200) cache.clear();
        cache.set(
          key,
          parse(tokenize(source), {
            functions: new Set(ctx.funcs.keys()),
            allowStatements: statements,
          }).tree,
        );
      }
      return cache.get(key);
    },
  };

  function defineFunction(name, params, source) {
    const tokens = tokenize(source);
    const functions = new Set([...ctx.funcs.keys(), name]);
    const { tree } = parse(tokens, { functions, allowStatements: false });
    ctx.funcs.set(name, { params, body: tree, source });
    cache.clear();
  }

  for (const [name, value] of Object.entries(saved.vars || {}))
    if (isVariableName(name)) ctx.vars.set(name, deserializeValue(value));
  for (const [name, def] of Object.entries(saved.funcs || {}))
    try {
      defineFunction(name, def.params, def.source);
    } catch {
      // A saved function that no longer parses is dropped.
    }
  if (saved.ans !== undefined) ctx.ans = deserializeValue(saved.ans);

  return {
    settings: ctx.settings,
    // Evaluates one line. Returns { kind, value, name?, readAs? } or throws CalcError.
    run(input) {
      if (!String(input).trim()) fail("Type an expression first");
      const tokens = tokenize(input);
      const { tree, readAs } = parse(tokens, { functions: new Set(ctx.funcs.keys()) });
      if (tree.type === "define") {
        const source = String(input)
          .slice(String(input).indexOf("=") + 1)
          .trim();
        if (FUNCTIONS[tree.name]) fail(`${tree.name} is a built-in function name`);
        if (ctx.vars.has(tree.name)) ctx.vars.delete(tree.name);
        defineFunction(tree.name, tree.params, source);
        return { kind: "define", name: tree.name, params: tree.params, source };
      }
      if (tree.type === "assign") {
        const value = checkResult(evaluate(tree.body, ctx, null));
        ctx.vars.set(tree.name, value);
        if (ctx.funcs.has(tree.name)) {
          ctx.funcs.delete(tree.name);
          cache.clear();
        }
        ctx.ans = value;
        return {
          kind: "store",
          name: tree.name,
          value,
          readAs: readAs ? describe(tree.body) : null,
        };
      }
      const value = checkResult(evaluate(tree, ctx, null));
      ctx.ans = value;
      return { kind: "value", value, readAs: readAs ? describe(tree) : null };
    },
    // A real function of one variable for graphs and tables. Undefined points are NaN.
    compile(source, variable = "x") {
      const tree = ctx.parseCached(source, false);
      return realFunction(tree, variable, ctx, null);
    },
    // Evaluates an expression without touching Ans or memory (for window fields).
    value(source) {
      return checkResult(evaluate(ctx.parseCached(source, false), ctx, null));
    },
    check(source) {
      ctx.parseCached(source, false);
    },
    setLists(lists) {
      ctx.lists = lists;
    },
    setSlots(slots) {
      ctx.slots = slots;
    },
    variables: () => [...ctx.vars.entries()],
    functions: () =>
      [...ctx.funcs.entries()].map(([name, def]) => ({
        name,
        params: def.params,
        source: def.source,
      })),
    forget(name) {
      ctx.vars.delete(name);
      if (ctx.funcs.delete(name)) cache.clear();
    },
    clearMemory() {
      ctx.vars.clear();
      ctx.funcs.clear();
      ctx.ans = 0;
      cache.clear();
    },
    snapshot() {
      return {
        settings: { ...ctx.settings },
        vars: Object.fromEntries([...ctx.vars].map(([k, v]) => [k, serializeValue(v)])),
        funcs: Object.fromEntries(
          [...ctx.funcs].map(([k, d]) => [k, { params: d.params, source: d.source }]),
        ),
        ans: serializeValue(ctx.ans),
      };
    },
  };
}

// ---------- Describing an expression ("Read as") ----------

const PRECEDENCE = { "+": 1, "-": 1, "*": 2, "/": 2, neg: 3, pow: 4, post: 5 };

export function describe(node) {
  const wrap = (child, min) => {
    const text = describe(child);
    return precedenceOf(child) < min ? `(${text})` : text;
  };
  switch (node.type) {
    case "num":
      return node.label || String(node.value).replace("-", "−");
    case "var":
    case "datalist":
      return node.name;
    case "ans":
      return "Ans";
    case "imaginary":
      return "i";
    case "list":
      return `{${node.items.map(describe).join(", ")}}`;
    case "neg":
      return node.arg.type === "pow"
        ? `−(${describe(node.arg)})`
        : `−${wrap(node.arg, PRECEDENCE.neg + 1)}`;
    case "bin": {
      const p = PRECEDENCE[node.op];
      const symbol = { "+": " + ", "-": " − ", "*": "·", "/": "/" }[node.op];
      const right = wrap(node.right, node.op === "-" || node.op === "/" ? p + 1 : p);
      return `${wrap(node.left, p)}${symbol}${right}`;
    }
    case "pow": {
      const base = wrap(node.left, PRECEDENCE.pow + 1);
      if (
        node.right.type === "num" &&
        Number.isInteger(node.right.value) &&
        node.right.value >= 0
      )
        return `${base}${[...String(node.right.value)].map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("")}`;
      return `${base}^${wrap(node.right, PRECEDENCE.post)}`;
    }
    case "fact":
      return `${wrap(node.arg, PRECEDENCE.post)}!`;
    case "percent":
      return `${wrap(node.arg, PRECEDENCE.post)}%`;
    case "degree":
      return `${wrap(node.arg, PRECEDENCE.post)}°`;
    case "call":
      if (node.name === "abs") return `|${describe(node.args[0])}|`;
      if (node.name === "sqrt") return `√(${describe(node.args[0])})`;
      return `${node.name}(${node.args.map(describe).join(", ")})`;
    case "user":
    case "slot":
    case "special":
      return `${node.name}(${node.args.map(describe).join(", ")})`;
    case "equation":
      return `${describe(node.left)} = ${describe(node.right)}`;
    default:
      return "?";
  }
}

function precedenceOf(node) {
  if (node.type === "bin") return PRECEDENCE[node.op];
  if (node.type === "neg") return PRECEDENCE.neg;
  if (node.type === "pow") return PRECEDENCE.pow;
  if (node.type === "num" && node.value < 0) return PRECEDENCE.neg;
  return 9;
}

export { isComplex, isList };

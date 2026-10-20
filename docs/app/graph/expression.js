// A small, safe math expression parser for graph blocks. Content stays plain data:
// authors write expressions as text, such as "x^3 - 3x" or "(x² - 4)/(x - 2)", and
// this module turns them into functions of one variable without using eval.
//
// Supported:
//   numbers (2, 0.5, .25), the variable (x by default), the constants pi, π, and e
//   + − - * · × / ^ and parentheses; Unicode superscripts ² ³ ⁴ ⁵ mean ^2 ^3 ^4 ^5
//   implicit multiplication: 2x, 3(x + 1), x(x − 2), (x + 1)(x − 1), 2pi
//   functions: sin cos tan sec csc cot asin acos atan sqrt cbrt abs ln log log2 exp
//   √(...) is sqrt(...)
// Precedence follows algebra: ^ is right-associative and binds tighter than a leading
// minus, so −x^2 means −(x^2). Write 1/(2x) when the whole 2x is the denominator.

export class GraphExpressionError extends Error {
  constructor(message, source) {
    super(`${message} in "${source}"`);
    this.name = "GraphExpressionError";
  }
}

const FUNCTIONS = Object.freeze({
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sec: (v) => 1 / Math.cos(v),
  csc: (v) => 1 / Math.sin(v),
  cot: (v) => Math.cos(v) / Math.sin(v),
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  arcsin: Math.asin,
  arccos: Math.acos,
  arctan: Math.atan,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
  ln: Math.log,
  log: Math.log10,
  log2: Math.log2,
  exp: Math.exp,
});

const CONSTANTS = Object.freeze({ pi: Math.PI, π: Math.PI, e: Math.E });

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
};

function normalize(source) {
  return String(source)
    .replace(/[−–]/g, "-")
    .replace(/[·×]/g, "*")
    .replace(/√/g, "sqrt")
    .replace(
      /[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,
      (digits) => `^(${[...digits].map((d) => SUPERSCRIPTS[d]).join("")})`,
    );
}

function tokenize(text, source) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      const match = /^(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(text.slice(i));
      if (!match)
        throw new GraphExpressionError(`Unreadable number at position ${i + 1}`, source);
      tokens.push({ type: "number", value: Number(match[0]) });
      i += match[0].length;
      continue;
    }
    if (/[A-Za-zπθ]/.test(ch)) {
      const match = /^[A-Za-zπθ][A-Za-z0-9πθ]*/.exec(text.slice(i))[0];
      tokens.push({ type: "name", value: match });
      i += match.length;
      continue;
    }
    if ("+-*/^()".includes(ch)) {
      tokens.push({ type: "op", value: ch });
      i += 1;
      continue;
    }
    throw new GraphExpressionError(`Unexpected character "${ch}"`, source);
  }
  return tokens;
}

// Splits a run of letters such as "xpi" or "2x" handled by the tokenizer into known names.
function splitName(name, variable, source) {
  if (name === variable || FUNCTIONS[name] || name in CONSTANTS) return [name];
  const parts = [];
  let rest = name;
  const known = [variable, ...Object.keys(CONSTANTS)].sort((a, b) => b.length - a.length);
  while (rest) {
    const hit = known.find((candidate) => rest.startsWith(candidate));
    if (!hit) throw new GraphExpressionError(`Unknown name "${name}"`, source);
    parts.push(hit);
    rest = rest.slice(hit.length);
  }
  return parts;
}

export function parseExpression(source, { variable = "x" } = {}) {
  if (typeof source !== "string" || !source.trim())
    throw new GraphExpressionError("Empty expression", String(source));
  const raw = tokenize(normalize(source), source);
  const tokens = raw.flatMap((token) =>
    token.type === "name" && !FUNCTIONS[token.value]
      ? splitName(token.value, variable, source).map((value) => ({ type: "name", value }))
      : [token],
  );
  let index = 0;
  const peek = () => tokens[index];
  const take = () => tokens[index++];
  const startsFactor = (token) =>
    token &&
    (token.type === "number" ||
      token.type === "name" ||
      (token.type === "op" && token.value === "("));

  function expression() {
    let node = term();
    while (peek()?.type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = take().value;
      node = { op, left: node, right: term() };
    }
    return node;
  }
  function term() {
    let node = unary();
    for (;;) {
      const token = peek();
      if (token?.type === "op" && (token.value === "*" || token.value === "/")) {
        take();
        node = { op: token.value, left: node, right: unary() };
      } else if (startsFactor(token)) {
        node = { op: "*", left: node, right: power() };
      } else return node;
    }
  }
  function unary() {
    const token = peek();
    if (token?.type === "op" && (token.value === "-" || token.value === "+")) {
      take();
      const operand = unary();
      return token.value === "-" ? { op: "neg", arg: operand } : operand;
    }
    return power();
  }
  function power() {
    const base = primary();
    if (peek()?.type === "op" && peek().value === "^") {
      take();
      return { op: "^", left: base, right: unary() };
    }
    return base;
  }
  function primary() {
    const token = take();
    if (!token) throw new GraphExpressionError("Expression ends too soon", source);
    if (token.type === "number") return { num: token.value };
    if (token.type === "op" && token.value === "(") {
      const inner = expression();
      const close = take();
      if (!close || close.value !== ")")
        throw new GraphExpressionError("Missing )", source);
      return inner;
    }
    if (token.type === "name") {
      if (FUNCTIONS[token.value]) {
        const open = take();
        if (!open || open.value !== "(")
          throw new GraphExpressionError(
            `${token.value} needs parentheses, as in ${token.value}(x)`,
            source,
          );
        const arg = expression();
        const close = take();
        if (!close || close.value !== ")")
          throw new GraphExpressionError("Missing )", source);
        return { fn: token.value, arg };
      }
      if (token.value === variable) return { variable: true };
      if (token.value in CONSTANTS) return { num: CONSTANTS[token.value] };
      throw new GraphExpressionError(`Unknown name "${token.value}"`, source);
    }
    throw new GraphExpressionError(`Unexpected "${token.value}"`, source);
  }

  const tree = expression();
  if (index < tokens.length)
    throw new GraphExpressionError(`Unexpected "${tokens[index].value}"`, source);
  return tree;
}

function evaluate(node, x) {
  if ("num" in node) return node.num;
  if (node.variable) return x;
  if (node.fn) return FUNCTIONS[node.fn](evaluate(node.arg, x));
  if (node.op === "neg") return -evaluate(node.arg, x);
  const a = evaluate(node.left, x);
  const b = evaluate(node.right, x);
  switch (node.op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "^":
      // Odd integer roots of negatives, such as x^(1/3), are real.
      if (a < 0 && !Number.isInteger(b)) {
        const inverse = 1 / b;
        if (Number.isInteger(inverse) && Math.abs(inverse) % 2 === 1) return -((-a) ** b);
        return NaN;
      }
      return a ** b;
    default:
      return NaN;
  }
}

// Returns f(x) for the expression. Undefined values come back as NaN, never as errors.
export function compileExpression(source, options = {}) {
  const tree = parseExpression(source, options);
  return (x) => {
    const value = evaluate(tree, x);
    return Number.isFinite(value) ? value : NaN;
  };
}

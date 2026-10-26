// Typed-answer problems for Topic 1.12. Each template draws new numbers for every
// variant. Keys come from exact rules for translations, dilations and reflections,
// and verify() re-checks every transformed rule against the parent function by
// evaluating both at many inputs.

import {
  ask,
  part,
  problem,
  graph,
  table,
  polyText,
  par,
  num,
  signed,
  ivl,
  unionText,
  andList,
  Poly,
  fnOf,
  assert,
  assertNear,
  lead,
  zigzag,
  cornerGraph,
} from "../../../../practice-kit/index.js";

// ---------- Parent functions ----------

// Each parent has a JavaScript rule for checking, the name used in the stem, and a way
// to write a·f(x − h) + k for the answer. `key` is what the grader reads; `text` is what
// students see (absolute value uses bars).
const PARENTS = {
  square: {
    name: "x²",
    f: (x) => x * x,
    domain: "(−∞, ∞)",
    range: "[0, ∞)",
    body: (inner) => (inner === "x" ? "x²" : `(${inner})²`),
  },
  cube: {
    name: "x³",
    f: (x) => x ** 3,
    body: (inner) => (inner === "x" ? "x³" : `(${inner})³`),
  },
  sqrt: {
    name: "√x",
    f: (x) => Math.sqrt(x),
    domain: "[0, ∞)",
    range: "[0, ∞)",
    body: (inner) => (inner === "x" ? "√x" : `√(${inner})`),
  },
  abs: {
    name: "|x|",
    f: (x) => Math.abs(x),
    domain: "(−∞, ∞)",
    range: "[0, ∞)",
    body: (inner, display) =>
      display ? (inner === "x" ? "|x|" : `|${inner}|`) : `abs(${inner})`,
  },
  reciprocal: {
    name: "1/x",
    f: (x) => 1 / x,
    body: (inner) => `1/${inner === "x" ? "x" : `(${inner})`}`,
  },
};

const inner = (h) => (h === 0 ? "x" : `x ${signed(-h)}`);

// a·f(x − h) + k written for the grader (key) and for the student (text).
function transformed(parentId, { a = 1, h = 0, k = 0 }, coefficient = null) {
  const parent = PARENTS[parentId];
  const write = (display) => {
    let core;
    if (parentId === "reciprocal") {
      core = `${a === 1 ? "1" : num(a)}/${h === 0 ? "x" : `(${inner(h)})`}`;
    } else {
      core = `${coefficient ?? lead(a)}${parent.body(inner(h), display)}`;
    }
    return `${core}${k === 0 ? "" : ` ${signed(k)}`}`;
  };
  return { key: write(false), text: write(true) };
}

// The true value of a·f(x − h) + k from the parent's rule.
const valueAt = (parentId, { a = 1, h = 0, k = 0 }, x) =>
  a * PARENTS[parentId].f(x - h) + k;

function assertTransform(parentId, spec, key) {
  const g = fnOf(key);
  for (const x of [-7.5, -4.25, -3, -1.5, -0.5, 0.5, 1.5, 2.75, 4, 6.25, 9]) {
    const expected = valueAt(parentId, spec, x);
    const actual = g(x);
    if (!Number.isFinite(expected)) {
      assert(!Number.isFinite(actual), `g should be undefined at ${x}`);
    } else {
      assertNear(actual, expected, `g(${x})`, 1e-9);
    }
  }
}

// ---------- Words ----------

const unitsText = (value) => `${num(value)} unit${Math.abs(value) === 1 ? "" : "s"}`;
const alsoUnit = (value) => `${Math.abs(value)} unit${Math.abs(value) === 1 ? "" : "s"}`;

// "3 units to the right and 2 units down".
const directionWords = (h, k) =>
  `${alsoUnit(h)} to the ${h > 0 ? "right" : "left"} and ${alsoUnit(k)} ${k > 0 ? "up" : "down"}`;

// "horizontally by 3 units and vertically by −2 units".
const signedWords = (h, k) =>
  `horizontally by ${unitsText(h)} and vertically by ${unitsText(k)}`;

// Describes the dilation and reflection for a vertical factor a.
function dilationWords(a) {
  const size = Math.abs(a);
  const pieces = [];
  if (size !== 1) pieces.push(`a vertical dilation by a factor of ${size}`);
  if (a < 0) pieces.push("a reflection over the x-axis");
  return pieces.join(" and ");
}

// "adds 5 to" or "subtracts 5 from" the output, for a vertical translation by k.
const addsText = (k) => (k > 0 ? `adds ${k} to` : `subtracts ${-k} from`);

// a times a value, written the way a student would show the work: 3(−4), −(−4), 5.
const times = (a, value) =>
  a === 1 ? num(value) : a === -1 ? `−${par(value)}` : `${num(a)}(${num(value)})`;

// The value of an argument written as a function call: f(x − 3) + 2.
const callText = (name, h) => `${name}(${inner(h)})`;

// ---------- Tables and graphs ----------

const XS = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

function randomTable(r) {
  return XS.map(() => r.int(-8, 8));
}

const valueTable = (values) =>
  table(
    "Values of f(x)",
    ["x", "f(x)"],
    XS.map((x, i) => [num(x), num(values[i])]),
  );

const lookup = (values, x) => values[XS.indexOf(x)];

// ---------- Compose a polynomial with a linear rule ----------

function compose(f, linear) {
  let out = new Poly([0]);
  let power = new Poly([1]);
  for (const coefficient of f.c) {
    out = out.add(power.scale(coefficient));
    power = power.mul(linear);
  }
  return out;
}

const standard = (poly) => polyText([...poly.c].reverse().map((q) => q.value));

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "shifts",
    skill: "apply-results",
    make(r) {
      const h = r.nonzero(-5, 5);
      const k = r.nonzero(-5, 5);
      const [x1, y1, x2, y2] = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)];
      const rule = `g(x) = ${callText("f", h)} ${signed(k)}`;
      return problem({
        stem: `The function g is defined by ${rule}.`,
        parts: [
          part(
            `The point (${num(x1)}, ${num(y1)}) is on the graph of f. Write the corresponding point on the graph of g.`,
            ask.points("Point on g", [[x1 + h, y1 + k]]),
          ),
          part(
            `The point (${num(x2)}, ${num(y2)}) is on the graph of g. Write the corresponding point on the graph of f.`,
            ask.points("Point on f", [[x2 - h, y2 - k]]),
          ),
        ],
        solution: [
          `The rule ${rule} translates the graph of f horizontally by ${unitsText(h)} and vertically by ${unitsText(k)}. A point (a, b) on f corresponds to the point (a ${signed(h)}, b ${signed(k)}) on g.`,
          `So (${num(x1)}, ${num(y1)}) on f corresponds to (${num(x1 + h)}, ${num(y1 + k)}) on g.`,
          `Working backward, (${num(x2)}, ${num(y2)}) on g comes from (${num(x2)} ${signed(-h)}, ${num(y2)} ${signed(-k)}) = (${num(x2 - h)}, ${num(y2 - k)}) on f.`,
        ],
        data: { h, k, x1, y1, x2, y2 },
      });
    },
    verify({ data: { h, k, x1, y1, x2, y2 } }) {
      // A line through (x1, y1) stands in for f: g must send the image of x1 to y1 + k.
      const f = (x) => y1 + 0.7 * (x - x1);
      const g = (x) => f(x - h) + k;
      assert(Math.abs(g(x1 + h) - (y1 + k)) < 1e-9, "image of the first point");
      assert(Math.abs(g(x2) - k - f(x2 - h)) < 1e-9, "preimage of the second point");
      assert(x2 - h + h === x2 && y2 - k + k === y2, "round trip");
    },
  },
  {
    id: "p02",
    tier: "quick",
    concept: "shifts",
    skill: "construct-functions",
    make(r) {
      const parentId = r.pick(["square", "cube", "sqrt", "abs", "reciprocal"]);
      const h = r.nonzero(-5, 5);
      const k = r.nonzero(-6, 6);
      const spec = { a: 1, h, k };
      const { key, text } = transformed(parentId, spec);
      const wording = r.chance(0.5) ? directionWords(h, k) : signedWords(h, k);
      const parent = PARENTS[parentId];
      return problem({
        stem: `The graph of g is the graph of f(x) = ${parent.name} translated ${wording}. Write an expression for g(x).`,
        parts: [ask.expr("g(x) =", key, { text })],
        solution: [
          `Translating horizontally by ${unitsText(h)} replaces x with ${inner(h)} in the rule for f.`,
          `Translating vertically by ${unitsText(k)} ${addsText(k)} the output.`,
          `So g(x) = f(${inner(h)}) ${signed(k)} = ${text}.`,
        ],
        data: { parentId, spec, key },
      });
    },
    verify({ data: { parentId, spec, key } }) {
      assertTransform(parentId, spec, key);
    },
  },
  {
    id: "p03",
    tier: "quick",
    unit: true,
    concept: "dilations-reflections",
    skill: "apply-results",
    make(r) {
      const values = randomTable(r);
      const vertical = r.chance(0.5);
      if (vertical) {
        const a = r.pick([2, 3, -1, -2, -3]);
        const [c1, c2] = r.sample(XS, 2);
        const rule = `g(x) = ${lead(a)}f(x)`;
        return problem({
          stem: `The table gives values of the function f. The function g is defined by ${rule}.`,
          blocks: [valueTable(values)],
          parts: [
            part(
              `Find g(${num(c1)}).`,
              ask.number(`g(${num(c1)}) =`, a * lookup(values, c1)),
            ),
            part(
              `Find g(${num(c2)}).`,
              ask.number(`g(${num(c2)}) =`, a * lookup(values, c2)),
            ),
          ],
          solution: [
            `g(${num(c1)}) = ${lead(a)}f(${num(c1)}) = ${num(a)}(${num(lookup(values, c1))}) = ${num(a * lookup(values, c1))}.`,
            `g(${num(c2)}) = ${lead(a)}f(${num(c2)}) = ${num(a)}(${num(lookup(values, c2))}) = ${num(a * lookup(values, c2))}.`,
          ],
          data: { values },
        });
      }
      const b = r.pick([2, -1, 0.5]);
      const inputs =
        b === 0.5 ? [-8, -4, -2, 0, 2, 4, 8] : b === 2 ? [-2, -1, 0, 1, 2] : XS;
      const [c1, c2] = r.sample(inputs, 2);
      const name = b === 2 ? "f(2x)" : b === -1 ? "f(−x)" : "f(x/2)";
      const rule = `g(x) = ${name}`;
      const inside = (c) => b * c;
      return problem({
        stem: `The table gives values of the function f. The function g is defined by ${rule}.`,
        blocks: [valueTable(values)],
        parts: [
          part(
            `Find g(${num(c1)}).`,
            ask.number(`g(${num(c1)}) =`, lookup(values, inside(c1))),
          ),
          part(
            `Find g(${num(c2)}).`,
            ask.number(`g(${num(c2)}) =`, lookup(values, inside(c2))),
          ),
        ],
        solution: [
          `To find g(${num(c1)}), first find the input to f: ${num(inside(c1))}. Then g(${num(c1)}) = f(${num(inside(c1))}) = ${num(lookup(values, inside(c1)))}.`,
          `To find g(${num(c2)}), the input to f is ${num(inside(c2))}, so g(${num(c2)}) = f(${num(inside(c2))}) = ${num(lookup(values, inside(c2)))}.`,
        ],
        data: { values },
      });
    },
    verify() {},
  },
  {
    id: "p04",
    tier: "quick",
    concept: "combining",
    skill: "apply-results",
    make(r) {
      const { xs, ys } = zigzag(r);
      const a = r.pick([1, 1, -1, 2, -2]);
      const h = r.nonzero(-4, 4);
      const k = r.nonzero(-5, 5);
      const [i, j] = r.sample([0, 1, 2, 3, 4], 2);
      const rule = `g(x) = ${lead(a)}f(${inner(h)}) ${signed(k)}`;
      const at = (index) => ({ x: xs[index] + h, y: a * ys[index] + k });
      const p1 = at(i);
      const p2 = at(j);
      const line = (index, p) =>
        `g(${num(p.x)}) = ${lead(a)}f(${num(p.x)} ${signed(-h)}) ${signed(k)} = ${lead(a)}f(${num(xs[index])}) ${signed(k)} = ${times(a, ys[index])} ${signed(k)} = ${num(p.y)}.`;
      return problem({
        stem: `The graph of the function f is shown. The function g is defined by ${rule}.`,
        blocks: [cornerGraph(xs, ys, "The graph of y = f(x)")],
        parts: [
          part(`Find g(${num(p1.x)}).`, ask.number(`g(${num(p1.x)}) =`, p1.y)),
          part(`Find g(${num(p2.x)}).`, ask.number(`g(${num(p2.x)}) =`, p2.y)),
        ],
        solution: [
          "Find the input to f first, read f at that input from the graph, and then apply the outside operations.",
          line(i, p1),
          line(j, p2),
        ],
        data: { xs, ys, a, h, k, points: [p1, p2], idx: [i, j] },
      });
    },
    verify({ data: { xs, ys, a, h, k, points, idx } }) {
      points.forEach((p, n) => {
        const index = idx[n];
        assert(xs[index] === p.x - h, "input to f is a corner");
        assert(a * ys[index] + k === p.y, "output of g");
      });
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "dilations-reflections",
    skill: "construct-functions",
    make(r) {
      const parentId = r.pick(["square", "cube", "sqrt", "abs", "reciprocal"]);
      const a = r.pick([2, 3, 4, -1, -2, -3]);
      const h = r.nonzero(-4, 4);
      const k = r.nonzero(-6, 6);
      const spec = { a, h, k };
      const { key, text } = transformed(parentId, spec);
      const parent = PARENTS[parentId];
      return problem({
        stem: `The graph of g is obtained from the graph of f(x) = ${parent.name} by ${dilationWords(a)}, followed by a translation ${directionWords(h, k)}. Write an expression for g(x).`,
        parts: [ask.expr("g(x) =", key, { text })],
        solution: [
          a < 0 && Math.abs(a) === 1
            ? "A reflection over the x-axis multiplies each output of f by −1, giving −f(x)."
            : `${a < 0 ? "A vertical dilation by a factor of " + -a + " and a reflection over the x-axis multiply" : "A vertical dilation by a factor of " + a + " multiplies"} each output of f by ${num(a)}, giving ${num(a)}f(x).`,
          `The translation replaces x with ${inner(h)} and ${addsText(k)} the output.`,
          `So g(x) = ${lead(a)}f(${inner(h)}) ${signed(k)} = ${text}.`,
        ],
        data: { parentId, spec, key },
      });
    },
    verify({ data: { parentId, spec, key } }) {
      assertTransform(parentId, spec, key);
    },
  },
  {
    id: "p06",
    tier: "quiz",
    unit: true,
    concept: "combining",
    skill: "equivalent-forms",
    make(r) {
      const v = r.nonzero(-4, 4);
      const w = r.int(-6, 6);
      const f = new Poly([v * v + w, -2 * v, 1]);
      const a = r.pick([2, 3, -1, -2]);
      const h = r.nonzero(-3, 3);
      const k = r.nonzero(-6, 6);
      const g = compose(f, new Poly([-h, 1]))
        .scale(a)
        .add(k);
      const fText = standard(f);
      const rule = `g(x) = ${lead(a)}f(${inner(h)}) ${signed(k)}`;
      const vertex = [v + h, a * w + k];
      return problem({
        stem: `Let f(x) = ${fText}. The function g is defined by ${rule}.`,
        parts: [
          part(
            "Write g(x) in standard form.",
            ask.expr("g(x) =", standard(g), { form: "expanded" }),
          ),
          part("Write the vertex of the graph of g.", ask.points("Vertex", [vertex])),
        ],
        solution: [
          `Replace x with ${inner(h)} in f: f(${inner(h)}) = ${standard(compose(f, new Poly([-h, 1])))}.`,
          `Multiply by ${num(a)} and ${k > 0 ? "add" : "subtract"} ${Math.abs(k)}: g(x) = ${standard(g)}.`,
          `Since f(x) = (x ${signed(-v)})² ${signed(w)}, the vertex of f is (${num(v)}, ${num(w)}). The graph of g comes from the graph of f by a horizontal translation by ${unitsText(h)}, ${dilationWords(a)}, and a vertical translation by ${unitsText(k)}, so its vertex is (${num(v + h)}, ${num(a * w + k)}).`,
        ],
        data: { f, a, h, k, g, vertex },
      });
    },
    verify({ data: { f, a, h, k, g, vertex } }) {
      for (const x of [-3, -1, 0, 2, 5]) {
        const expected = a * f.fn()(x - h) + k;
        assert(Math.abs(g.fn()(x) - expected) < 1e-9, `g(${x})`);
      }
      assert(Math.abs(g.fn()(vertex[0]) - vertex[1]) < 1e-9, "vertex lies on g");
      // The vertex is where g' = 0.
      assert(
        Math.abs(g.derivative().fn()(vertex[0])) < 1e-9,
        "vertex is a turning point",
      );
    },
  },
  {
    id: "p07",
    tier: "quiz",
    concept: "combining",
    skill: "apply-results",
    make(r) {
      const values = randomTable(r);
      const a = r.pick([2, 3, -1, -2, -3]);
      const b = r.pick([2, 0.5]);
      const k = r.nonzero(-6, 6);
      const inputs = b === 2 ? [-2, -1, 0, 1, 2] : [-8, -4, -2, 0, 2, 4, 8];
      const [c1, c2] = r.sample(inputs, 2);
      const call = b === 2 ? "f(2x)" : "f(x/2)";
      const rule = `g(x) = ${lead(a)}${call} ${signed(k)}`;
      const gAt = (c) => a * lookup(values, b * c) + k;
      const line = (c) =>
        `g(${num(c)}) = ${lead(a)}f(${b === 2 ? `2(${num(c)})` : `${num(c)}/2`}) ${signed(k)} = ${lead(a)}f(${num(b * c)}) ${signed(k)} = ${times(a, lookup(values, b * c))} ${signed(k)} = ${num(gAt(c))}.`;
      return problem({
        stem: `The table gives values of the function f. The function g is defined by ${rule}.`,
        blocks: [valueTable(values)],
        parts: [
          part(`Find g(${num(c1)}).`, ask.number(`g(${num(c1)}) =`, gAt(c1))),
          part(`Find g(${num(c2)}).`, ask.number(`g(${num(c2)}) =`, gAt(c2))),
        ],
        solution: [
          "Find the input to f first, read f at that input from the table, and then apply the outside operations.",
          line(c1),
          line(c2),
        ],
        data: { values },
      });
    },
    verify() {},
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "domain-and-range",
    skill: "describe",
    make(r) {
      const parentId = r.pick(["sqrt", "abs", "square"]);
      const parent = PARENTS[parentId];
      const a = r.pick([2, 3, -1, -2, -3, 4]);
      const h = r.nonzero(-5, 5);
      const k = r.nonzero(-6, 6);
      const domain = parentId === "sqrt" ? `[${num(h)}, ∞)` : "(−∞, ∞)";
      const range = a > 0 ? `[${num(k)}, ∞)` : `(−∞, ${num(k)}]`;
      const { text } = transformed(parentId, { a, h, k });
      const rule = `g(x) = ${lead(a)}f(${inner(h)}) ${signed(k)}`;
      return problem({
        stem: `The function f(x) = ${parent.name} has domain ${parent.domain} and range ${parent.range}. The function g is defined by ${rule}.`,
        parts: [
          part(
            "Write the domain of g in interval notation.",
            ask.interval("Domain", domain),
          ),
          part(
            "Write the range of g in interval notation.",
            ask.interval("Range", range),
          ),
        ],
        solution: [
          parentId === "sqrt"
            ? `The horizontal translation by ${unitsText(h)} moves the starting point of the domain from 0 to ${num(h)}, so the domain of g is ${domain}.`
            : `A horizontal translation does not change the domain of f, which is all real numbers, so the domain of g is ${domain}.`,
          `For f, the output values are at least 0. Multiplying by ${num(a)} gives ${a > 0 ? "values at least 0" : "values at most 0"}, and ${k > 0 ? `adding ${k}` : `subtracting ${-k}`} gives ${a > 0 ? `values at least ${num(k)}` : `values at most ${num(k)}`}. So the range of g is ${range}.`,
          `Written out, g(x) = ${text}.`,
        ],
        data: { parentId, spec: { a, h, k }, domain, range },
      });
    },
    verify({ data: { parentId, spec, domain, range } }) {
      // Sample g across a wide window and compare with the stated domain and range.
      const f = (x) => valueAt(parentId, spec, x);
      let low = Infinity;
      let high = -Infinity;
      const grid = [spec.h];
      for (let x = -40; x <= 40; x += 0.01) grid.push(x);
      for (const x of grid) {
        const y = f(x);
        if (Number.isFinite(y)) {
          low = Math.min(low, y);
          high = Math.max(high, y);
        }
      }
      const atLeast = range.startsWith("[");
      assert(
        atLeast ? Math.abs(low - spec.k) < 1e-6 : Math.abs(high - spec.k) < 1e-6,
        "range endpoint",
      );
      if (domain.startsWith("[")) {
        assert(
          Number.isFinite(f(spec.h)) && !Number.isFinite(f(spec.h - 0.01)),
          "domain endpoint",
        );
      } else {
        assert(Number.isFinite(f(-30)) && Number.isFinite(f(30)), "domain is all reals");
      }
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "domain-and-range",
    skill: "identify-information",
    make(r) {
      const squared = r.chance(0.4);
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const h = r.nonzero(-5, 5);
      const k = r.nonzero(-5, 5);
      const parentName = squared ? "1/x²" : "1/x";
      const call = `f(${inner(h)})`;
      const rule = `g(x) = ${lead(a)}${call} ${signed(k)}`;
      const range = squared
        ? a > 0
          ? `(${num(k)}, ∞)`
          : `(−∞, ${num(k)})`
        : unionText(ivl(-Infinity, k), ivl(k, Infinity));
      const domain = unionText(ivl(-Infinity, h), ivl(h, Infinity));
      const g = (x) => a * (squared ? 1 / (x - h) ** 2 : 1 / (x - h)) + k;
      return problem({
        stem: `The function f(x) = ${parentName} has a vertical asymptote at x = 0 and a horizontal asymptote at y = 0. The function g is defined by ${rule}.`,
        parts: [
          part(
            "Write the equations of the vertical and horizontal asymptotes of the graph of g.",
            ask.equations("Asymptotes", [`x = ${num(h)}`, `y = ${num(k)}`]),
          ),
          part(
            "Write the domain of g in interval notation.",
            ask.interval("Domain", domain),
          ),
          part(
            "Write the range of g in interval notation.",
            ask.interval("Range", range),
          ),
        ],
        solution: [
          `The horizontal translation by ${unitsText(h)} moves the vertical asymptote from x = 0 to x = ${num(h)}. The vertical translation by ${unitsText(k)} moves the horizontal asymptote from y = 0 to y = ${num(k)}. The dilation and reflection do not move either asymptote.`,
          `The function is undefined only at x = ${num(h)}, so the domain is ${domain}.`,
          squared
            ? `Since 1/x² > 0 for every x ≠ 0, the output of ${lead(a)}f(${inner(h)}) is ${a > 0 ? "positive" : "negative"}, so g(x) ${a > 0 ? ">" : "<"} ${num(k)} and the range is ${range}.`
            : `The function 1/x takes every nonzero value, so ${lead(a)}f(${inner(h)}) takes every nonzero value, and g takes every value except ${num(k)}. The range is ${range}.`,
        ],
        data: { g, h, k, a, squared },
      });
    },
    verify({ data: { g, h, k, a, squared } }) {
      assert(!Number.isFinite(g(h)), "undefined at the asymptote");
      assertNear(g(h + 1e7), k, "horizontal asymptote on the right", 1e-3);
      assertNear(g(h - 1e7), k, "horizontal asymptote on the left", 1e-3);
      let low = Infinity;
      let high = -Infinity;
      for (let x = -60; x <= 60; x += 0.013) {
        const y = g(x);
        if (Number.isFinite(y) && Math.abs(y) < 1e6) {
          low = Math.min(low, y);
          high = Math.max(high, y);
        }
      }
      if (squared) {
        assert(a > 0 ? low > k : high < k, "range stays on one side of y = k");
      } else {
        assert(low < k && high > k, "range crosses y = k");
      }
    },
  },
  {
    id: "p10",
    tier: "quiz",
    unit: true,
    concept: "combining",
    skill: "construct-functions",
    make(r) {
      const parentId = r.pick(["square", "square", "sqrt", "abs"]);
      const parent = PARENTS[parentId];
      const h = r.int(-4, 4);
      const k = r.int(-4, 4);
      const half = parentId === "square" && r.chance(0.3);
      const a = half ? r.pick([0.5, -0.5]) : r.pick([1, 2, -1, -2]);
      // A second point on the curve with whole-number coordinates.
      const step = half ? 2 : 1;
      const second = [h + step, k + a * parent.f(step)];
      const spec = { a, h, k };
      const coefficient = half ? (a > 0 ? "(1/2)" : "−(1/2)") : null;
      const { key, text } = transformed(parentId, spec, coefficient);
      const range = a > 0 ? `[${num(k)}, ∞)` : `(−∞, ${num(k)}]`;
      const tip = parentId === "sqrt" ? "starting point" : "vertex";
      const form = `a${parent.body(inner(h), true)}`;
      return problem({
        stem: `The graph of g is shown. It is a transformation of the graph of f(x) = ${parent.name}. The two points marked on the graph have whole-number coordinates.`,
        blocks: [
          graph({
            caption: "The graph of y = g(x)",
            alt: `The graph of a transformation of ${parent.name} with its ${tip} at (${num(h)}, ${num(k)}) and passing through (${num(second[0])}, ${num(second[1])}).`,
            window: { x: [-8, 8], y: [-8, 8] },
            ticks: { x: 1, y: 1 },
            functions: [{ expr: key }],
            points: [{ at: [h, k] }, { at: second }],
          }),
        ],
        parts: [
          part(
            "Write an expression for g(x) in terms of x.",
            ask.expr("g(x) =", key, { text }),
          ),
          part(
            "Write the range of g in interval notation.",
            ask.interval("Range", range),
          ),
        ],
        solution: [
          `The ${tip} of the graph is (${num(h)}, ${num(k)}), so g(x) = ${form} ${signed(k)} for some constant a.`,
          `The graph passes through (${num(second[0])}, ${num(second[1])}). Substituting gives ${num(second[1])} = a(${num(parent.f(step))}) ${signed(k)}, so a = ${coefficient ? `${a > 0 ? "" : "−"}1/2` : num(a)}.`,
          `So g(x) = ${text}. The graph ${parentId === "sqrt" ? (a > 0 ? "rises" : "falls") : a > 0 ? "opens upward" : "opens downward"} from its ${tip} at y = ${num(k)}, so the range is ${range}.`,
        ],
        data: { parentId, spec, key, second },
      });
    },
    verify({ data: { parentId, spec, key, second } }) {
      assertTransform(parentId, spec, key);
      assert(
        Math.abs(fnOf(key)(second[0]) - second[1]) < 1e-9,
        "graph passes through the second point",
      );
      assert(
        Math.abs(valueAt(parentId, spec, second[0]) - second[1]) < 1e-9,
        "second point lies on g",
      );
    },
  },
];

import test from "node:test";
import assert from "node:assert/strict";

import { compileExpression, GraphExpressionError } from "../docs/app/graph/expression.js";
import { renderGraph, niceStep, formatTick } from "../docs/app/graph/render.js";
import { renderBlocks } from "../docs/app/blocks.js";
import { validateGraph } from "../scripts/lib/validate-graph.mjs";
import { studentQuestion } from "../docs/app/print/selection.js";

const near = (a, b) => Math.abs(a - b) < 1e-12;
const base = {
  type: "graph",
  caption: "Graph of a test function",
  alt: "A test curve used by the automated tests.",
  window: { x: [-5, 5], y: [-5, 5] },
};

test("the expression parser follows algebra rules and the content's Unicode math", () => {
  const cases = [
    ["x^3 - 3x", 2, 2],
    ["(x² − 4)/(x − 2)", 3, 5],
    ["−x^2", 3, -9],
    ["2x(x - 1)", 3, 12],
    ["(x + 1)(x − 1)", 3, 8],
    ["x^(1/3)", -8, -2],
    ["3sin(x)", Math.PI / 2, 3],
    ["−2x⁴ + 5x³ − x", 1, 2],
    ["√(x + 1)", 3, 2],
    ["2^-x", 1, 0.5],
    ["abs(x − 3)", 1, 2],
    ["2pi", 0, 2 * Math.PI],
  ];
  for (const [source, x, expected] of cases)
    assert.ok(near(compileExpression(source)(x), expected), source);
  assert.ok(near(compileExpression("-16t^2 + 48t + 6", { variable: "t" })(1.5), 42));
  assert.ok(Number.isNaN(compileExpression("1/(x - 2)")(2)));
  assert.ok(Number.isNaN(compileExpression("sqrt(x)")(-1)));
});

test("the expression parser rejects unsafe or unclear input with a readable message", () => {
  for (const source of [
    "x +",
    "foo(x)",
    "2 ** x",
    "(x",
    "sin x",
    "y + 1",
    "alert(1)",
    "x; 1",
  ])
    assert.throws(() => compileExpression(source), GraphExpressionError, source);
});

test("graphs render as accessible SVG with a title, description, and clipped plot", () => {
  const svg = renderGraph({ ...base, functions: [{ expr: "x^2 - 2", label: "f" }] });
  assert.match(svg, /<svg class="graph"[^>]*role="img"/);
  assert.match(svg, /<title id="[^"]+">Graph of a test function<\/title>/);
  assert.match(svg, /<desc id="[^"]+">A test curve/);
  assert.match(svg, /clip-path="url\(#graph-[a-z0-9]+-clip\)"/);
  assert.match(svg, /<figcaption>Graph of a test function<\/figcaption>/);
  assert.match(svg, />f<\/text>/);
});

test("a vertical asymptote splits a curve, and holes and endpoints draw as points", () => {
  const svg = renderGraph({
    ...base,
    functions: [
      { expr: "1/(x - 2)" },
      { expr: "x", domain: [-4, -1], endpoints: ["closed", "open"], color: 2 },
    ],
    asymptotes: [{ x: 2 }, { y: 0 }],
    points: [{ at: [0, 1], open: true, label: "(0, 1)" }],
  });
  const curves = svg.match(/<path class="graph-curve graph-ink-1"/g) || [];
  assert.equal(curves.length, 2, "1/(x − 2) is drawn as two separate branches");
  assert.equal((svg.match(/class="graph-asymptote"/g) || []).length, 2);
  assert.equal((svg.match(/graph-point--open/g) || []).length, 2);
  assert.ok(svg.includes(">(0, 1)</text>"));
});

test("a steep but continuous curve is not split", () => {
  const svg = renderGraph({ ...base, functions: [{ expr: "x^5" }] });
  assert.equal((svg.match(/<path class="graph-curve/g) || []).length, 1);
});

test("curves through points pass through every authored point without overshooting", () => {
  const svg = renderGraph({
    ...base,
    curves: [
      {
        through: [
          [-4, -2],
          [-1, 3],
          [2, 3],
          [4, -1],
        ],
      },
    ],
  });
  assert.equal((svg.match(/<path class="graph-curve/g) || []).length, 1);
});

test("tick steps and labels use round numbers and a true minus sign", () => {
  assert.equal(niceStep(10), 2);
  assert.equal(niceStep(4), 0.5);
  assert.equal(niceStep(48), 10);
  assert.equal(formatTick(-2), "−2");
  assert.equal(formatTick(0.1 + 0.2), "0.3");
  const svg = renderGraph({
    ...base,
    ticks: { x: [{ at: Math.PI, label: "π" }] },
    functions: [{ expr: "x" }],
  });
  assert.ok(svg.includes(">π</text>"));
  const hidden = renderGraph({ ...base, tickLabels: false, functions: [{ expr: "x" }] });
  assert.ok(!hidden.includes('class="graph-tick"'));
});

test("renderBlocks draws graph blocks inside lessons and question stimuli", () => {
  const html = renderBlocks([{ ...base, functions: [{ expr: "x" }] }]);
  assert.match(html, /<figure class="graph-figure">/);
});

test("the build rejects graph blocks that would draw wrongly", () => {
  const good = { ...base, functions: [{ expr: "x^2" }] };
  validateGraph(good, "test");
  const bad = [
    [{ ...good, caption: "" }, /caption/],
    [{ ...good, window: { x: [5, -5], y: [-5, 5] } }, /minimums/],
    [{ ...good, functions: [{ expr: "x^^2" }] }, /Unexpected/],
    [{ ...good, functions: [{ expr: "x + 100" }] }, /never appears/],
    [{ ...good, points: [{ at: [9, 0] }] }, /outside the window/],
    [{ ...good, asymptotes: [{ x: 1, y: 2 }] }, /exactly one/],
    [{ ...good, colour: 2 }, /unknown field/],
    [{ ...base }, /draws nothing/],
    [
      { ...good, functions: [{ expr: "x", endpoints: ["closed", "open"] }] },
      /need a domain/,
    ],
  ];
  for (const [block, message] of bad)
    assert.throws(() => validateGraph(block, "test"), message);
});

test("printed questions keep the whole graph, and a graph without data degrades to its text", () => {
  const block = { ...base, functions: [{ expr: "x^2" }] };
  const printed = studentQuestion({ id: "q1", choices: ["A"], stimulusBlocks: [block] });
  assert.deepEqual(printed.stimulusBlocks[0], block);
  assert.match(renderGraph(printed.stimulusBlocks[0]), /<svg class="graph"/);
  assert.match(
    renderGraph({ type: "graph", alt: "A parabola." }),
    /\[Graph: A parabola\.\]/,
  );
});

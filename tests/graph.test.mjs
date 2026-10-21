import test from "node:test";
import assert from "node:assert/strict";

import {
  compileExpression,
  coordinate,
  GraphExpressionError,
} from "../docs/app/graph/expression.js";
import { renderGraph, niceStep, formatTick } from "../docs/app/graph/render.js";
import { renderBlocks } from "../docs/app/blocks.js";
import { validateGraph } from "../scripts/lib/validate-graph.mjs";
import { studentQuestion } from "../docs/app/print/selection.js";
import {
  traceItems,
  readoutText,
  zoomWindow,
  formatValue,
} from "../docs/app/graph/interact.js";
import { graphModel } from "../docs/app/graph/render.js";

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
  assert.match(
    html,
    /<figure class="graph-figure graph-figure--interactive" data-graph=/,
  );
  const printed = renderBlocks(
    [{ ...base, functions: [{ expr: "x" }] }],
    {},
    undefined,
    "",
    null,
    {
      interactiveGraphs: false,
    },
  );
  assert.match(printed, /<figure class="graph-figure">/);
  assert.ok(!printed.includes("data-graph="));
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

const unescapeAttr = (text) =>
  text
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");

const sliderGraph = {
  ...base,
  caption: "Translations of f(x) = x² by h and k",
  window: { x: [-6, 6], y: [-4, 10] },
  sliders: [
    { name: "h", min: -4, max: 4, step: 1, value: 2, label: "Shift" },
    { name: "k", min: -3, max: 5, value: 1 },
  ],
  functions: [{ expr: "(x - h)^2 + k", label: "g" }],
  points: [{ at: ["h", "k"], label: "({h}, {k})" }],
};

test("slider names work in expressions, coordinates, and labels", () => {
  assert.equal(compileExpression("a(x - h)^2", { parameters: { a: 2, h: 1 } })(3), 8);
  assert.equal(
    compileExpression("ah", { variable: "x", parameters: { a: 2, h: 3 } })(0),
    6,
  );
  assert.equal(coordinate("k + 1", { k: 3 }), 4);
  assert.equal(coordinate(-2), -2);
  assert.throws(() => compileExpression("a x"), GraphExpressionError);
  const model = graphModel(sliderGraph, { h: -1, k: 3 });
  assert.equal(model.functions[0].f(-1), 3);
  assert.deepEqual([model.points[0].x, model.points[0].y], [-1, 3]);
  assert.equal(model.points[0].label, "(−1, 3)");
});

test("interactive graphs carry their data, controls, sliders, and keyboard help", () => {
  const html = renderGraph(sliderGraph, { interactive: true });
  const data = JSON.parse(unescapeAttr(/data-graph="([^"]*)"/.exec(html)[1]));
  assert.deepEqual(data, sliderGraph);
  assert.match(
    html,
    /role="application" aria-roledescription="interactive graph" tabindex="0"/,
  );
  for (const action of ["zoom-in", "zoom-out", "reset"])
    assert.ok(html.includes(`data-graph-action="${action}"`), action);
  assert.match(
    html,
    /<input type="range" data-graph-slider="h" min="-4" max="4" step="1" value="2">/,
  );
  assert.match(html, /data-graph-slider="k" min="-3" max="5" step="0.5" value="1"/);
  assert.ok(html.includes(">(2, 1)</text>"));
  assert.match(html, /arrow keys to trace/);
  assert.match(html, /class="graph-trace"/);
});

test("still copies stay still: print, exams, no-scale graphs, and opted-out graphs", () => {
  const still = renderGraph(sliderGraph);
  assert.ok(!still.includes("data-graph="));
  assert.match(still, /role="img"/);
  assert.match(still, /Shown with h = 2, k = 1\./);
  const noScale = { ...base, tickLabels: false, functions: [{ expr: "x" }] };
  assert.ok(!renderGraph(noScale, { interactive: true }).includes("data-graph="));
  const optOut = { ...base, interactive: false, functions: [{ expr: "x" }] };
  assert.ok(!renderGraph(optOut, { interactive: true }).includes("data-graph="));
});

test("tracing reads exact values, approximate curve values, and undefined points", () => {
  const model = graphModel({
    ...base,
    functions: [
      { expr: "(x^2 - 4)/(x - 2)", label: "r" },
      { expr: "x", domain: [0, 2], label: "p" },
    ],
    curves: [
      {
        through: [
          [0, 0],
          [2, 2],
        ],
        label: "W",
      },
    ],
  });
  const [r, p, w] = traceItems(model);
  assert.equal(readoutText(r, 1.5, r.valueAt(1.5)), "r(1.5) = 3.5");
  assert.equal(
    readoutText(r, 2, r.valueAt(2), "2, 4"),
    "r(2) is undefined. The open circle marks (2, 4).",
  );
  assert.ok(Number.isNaN(p.valueAt(3)), "outside its domain a piece has no value");
  assert.equal(readoutText(w, 1, w.valueAt(1)), "W(1) ≈ 1");
  assert.equal(readoutText({ label: "" }, -0.5, 2), "(−0.5, 2)");
  assert.equal(formatValue(1 / 3), "0.333");
  assert.equal(formatValue(-1e-12), "0");
});

test("zooming keeps the point under the pointer fixed and stays within limits", () => {
  const home = { x: [-10, 10], y: [-10, 10] };
  const zoomed = zoomWindow(home, 0.5, { x: 4, y: 0 }, home);
  assert.deepEqual(zoomed, { x: [-3, 7], y: [-5, 5] });
  let far = home;
  for (let i = 0; i < 40; i += 1) far = zoomWindow(far, 2, { x: 0, y: 0 }, home);
  assert.equal(far.x[1] - far.x[0], 400);
  let close = home;
  for (let i = 0; i < 40; i += 1) close = zoomWindow(close, 0.5, { x: 0, y: 0 }, home);
  assert.equal(close.x[1] - close.x[0], 0.5);
});

test("the build rejects sliders that would draw wrongly", () => {
  validateGraph(sliderGraph, "test");
  const bad = [
    [{ ...sliderGraph, sliders: [{ name: "x", min: 0, max: 1, value: 0 }] }, /already/],
    [
      { ...sliderGraph, sliders: [{ name: "hk", min: 0, max: 1, value: 0 }] },
      /one letter/,
    ],
    [
      {
        ...sliderGraph,
        sliders: [{ name: "h", min: 0, max: 1, value: 2 }, sliderGraph.sliders[1]],
      },
      /starting value/,
    ],
    [
      { ...sliderGraph, sliders: [sliderGraph.sliders[0], sliderGraph.sliders[0]] },
      /used twice/,
    ],
    [
      {
        ...sliderGraph,
        sliders: [{ ...sliderGraph.sliders[0], speed: 2 }, sliderGraph.sliders[1]],
      },
      /unknown field/,
    ],
    [{ ...sliderGraph, sliders: [sliderGraph.sliders[0]] }, /Unknown name "k"/],
    [{ ...sliderGraph, points: [{ at: ["h", "q"] }] }, /needs at/],
    [{ ...sliderGraph, points: [{ at: [0, 0], label: "{a}" }] }, /cannot be computed/],
    [{ ...sliderGraph, interactive: "yes" }, /interactive must be/],
  ];
  for (const [block, message] of bad)
    assert.throws(() => validateGraph(block, "test"), message);
});

test("polar curves plot (r cos θ, r sin θ), including negative radii", () => {
  const block = {
    ...base,
    window: { x: [-4, 4], y: [-4, 4] },
    height: 432,
    grid: "polar",
    polar: [
      { expr: "2 + 2cos(θ)", label: "cardioid", labelAt: 1 },
      { expr: "1 + 2cos(θ)", domain: [0, "pi"] },
    ],
  };
  validateGraph(block, "polar test");
  const svg = renderGraph(block);
  assert.match(svg, /data-graph-curve="p0"/);
  assert.match(svg, /data-graph-curve="p1"/);
  assert.match(svg, /<ellipse class="graph-grid"/);
  assert.match(svg, />cardioid</);
  const model = graphModel(block);
  assert.equal(model.polar.length, 2);
  // r = 1 + 2 cos π = −1 lands on the opposite ray, at (1, 0).
  const r = model.polar[1].r;
  assert.ok(near(r(Math.PI), -1));
  assert.ok(near(model.polar[1].domain[1], Math.PI));
  // A slider can trace a polar curve by moving the end of its domain.
  validateGraph(
    {
      ...block,
      polar: [{ expr: "3sin(2θ)", domain: [0, "t"] }],
      sliders: [{ name: "t", min: 0.1, max: 6.28, value: 1 }],
    },
    "polar slider test",
  );
});

test("the build rejects polar curves and axes settings that would draw wrongly", () => {
  const polar = (curve, extra = {}) => ({ ...base, polar: [curve], ...extra });
  assert.throws(() => validateGraph(polar({ expr: "2 +" }), "t"), /polar\[0\]/);
  assert.throws(
    () => validateGraph(polar({ expr: "1", domain: ["pi", 0] }), "t"),
    /domain/,
  );
  assert.throws(() => validateGraph(polar({ expr: "20" }), "t"), /never appears/);
  assert.throws(
    () => validateGraph(polar({ expr: "1" }, { grid: "radial" }), "t"),
    /grid/,
  );
  assert.throws(
    () => validateGraph(polar({ expr: "1" }, { axes: false }), "t"),
    /tickLabels/,
  );
  const noAxes = {
    ...base,
    functions: [{ expr: "sin(x)" }],
    axes: false,
    tickLabels: false,
  };
  validateGraph(noAxes, "t");
  assert.doesNotMatch(renderGraph(noAxes), /graph-axis/);
});

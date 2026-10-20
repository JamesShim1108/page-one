// Build-time checks for "graph" content blocks. A graph that fails here would draw
// wrongly or not at all, so the build stops with a message that names the problem.
import { compileExpression } from "../../docs/app/graph/expression.js";
import { renderGraph } from "../../docs/app/graph/render.js";

const fail = (location, message) => {
  throw new Error(`${location}: graph ${message}`);
};
const isNum = (value) => typeof value === "number" && Number.isFinite(value);
const isPair = (value) =>
  Array.isArray(value) && value.length === 2 && value.every(isNum);
const POSITIONS = new Set(["n", "s", "e", "w", "ne", "nw", "se", "sw"]);
const ALLOWED = new Set([
  "type",
  "id",
  "caption",
  "alt",
  "window",
  "ticks",
  "tickLabels",
  "axisLabels",
  "grid",
  "height",
  "functions",
  "curves",
  "segments",
  "asymptotes",
  "points",
]);

function checkStyle(item, at) {
  if (item.dashed !== undefined && typeof item.dashed !== "boolean")
    fail(at, "dashed must be true or false");
  if (item.color !== undefined && ![1, 2, 3, 4].includes(item.color))
    fail(at, "color must be 1, 2, 3, or 4");
  if (item.label !== undefined && (typeof item.label !== "string" || !item.label.trim()))
    fail(at, "label must be text");
  if (item.labelPosition !== undefined && !POSITIONS.has(item.labelPosition))
    fail(at, `labelPosition must be one of ${[...POSITIONS].join(", ")}`);
}

export function validateGraph(block, location) {
  for (const key of Object.keys(block))
    if (!ALLOWED.has(key)) fail(location, `has unknown field "${key}"`);
  for (const key of ["caption", "alt"])
    if (typeof block[key] !== "string" || block[key].trim().length < 8)
      fail(location, `needs a ${key} of at least a few words`);
  const window = block.window;
  if (!window || !isPair(window.x) || !isPair(window.y))
    fail(location, "needs window: { x: [min, max], y: [min, max] }");
  const [xMin, xMax] = window.x;
  const [yMin, yMax] = window.y;
  if (!(xMin < xMax) || !(yMin < yMax))
    fail(location, "window minimums must be less than maximums");
  if (
    block.height !== undefined &&
    (!isNum(block.height) || block.height < 160 || block.height > 520)
  )
    fail(location, "height must be between 160 and 520");
  for (const axis of ["x", "y"]) {
    const spec = block.ticks?.[axis];
    if (spec === undefined) continue;
    const [min, max] = window[axis];
    if (isNum(spec)) {
      if (spec <= 0) fail(location, `ticks.${axis} must be positive`);
      if ((max - min) / spec > 40)
        fail(location, `ticks.${axis} would draw more than 40 ticks`);
    } else if (Array.isArray(spec)) {
      spec.forEach((tick) => {
        if (!isNum(tick?.at) || tick.at < min || tick.at > max)
          fail(location, `ticks.${axis} entries need an at value inside the window`);
        if (tick.label !== undefined && typeof tick.label !== "string")
          fail(location, "tick labels must be text");
      });
    } else fail(location, `ticks.${axis} must be a step or a list of { at, label }`);
  }
  for (const key of ["tickLabels", "grid"])
    if (block[key] !== undefined && typeof block[key] !== "boolean")
      fail(location, `${key} must be true or false`);
  if (block.axisLabels !== undefined)
    for (const [axis, text] of Object.entries(block.axisLabels))
      if (!["x", "y"].includes(axis) || typeof text !== "string")
        fail(location, "axisLabels takes text for x and y");

  const drawn =
    (block.functions?.length || 0) +
    (block.curves?.length || 0) +
    (block.segments?.length || 0) +
    (block.points?.length || 0);
  if (!drawn) fail(location, "draws nothing; add functions, curves, segments, or points");

  (block.functions || []).forEach((fn, index) => {
    const at = `${location} functions[${index}]`;
    let f;
    try {
      f = compileExpression(fn.expr, { variable: fn.variable || "x" });
    } catch (error) {
      fail(at, error.message);
    }
    checkStyle(fn, at);
    const [a, b] = fn.domain ?? [xMin, xMax];
    if (fn.domain !== undefined && (!isPair(fn.domain) || !(a < b)))
      fail(at, "domain must be [min, max] with min < max");
    if (fn.endpoints !== undefined) {
      if (!fn.domain) fail(at, "endpoints need a domain");
      if (
        !Array.isArray(fn.endpoints) ||
        fn.endpoints.length !== 2 ||
        fn.endpoints.some((e) => ![null, "open", "closed"].includes(e))
      )
        fail(at, 'endpoints must be two of "open", "closed", or null');
    }
    if (fn.labelAt !== undefined && !isNum(fn.labelAt))
      fail(at, "labelAt must be a number");
    const from = Math.max(a, xMin);
    const to = Math.min(b, xMax);
    let visible = 0;
    for (let k = 0; k <= 200; k += 1) {
      const y = f(from + ((to - from) * k) / 200);
      if (Number.isFinite(y) && y >= yMin && y <= yMax) visible += 1;
    }
    if (!visible) fail(at, `"${fn.expr}" never appears inside the window`);
  });

  (block.curves || []).forEach((curve, index) => {
    const at = `${location} curves[${index}]`;
    checkStyle(curve, at);
    if (
      !Array.isArray(curve.through) ||
      curve.through.length < 2 ||
      !curve.through.every(isPair)
    )
      fail(at, "through needs at least two [x, y] points");
    const xs = curve.through.map((p) => p[0]);
    if (new Set(xs).size !== xs.length) fail(at, "through points need distinct x values");
  });

  (block.segments || []).forEach((segment, index) => {
    const at = `${location} segments[${index}]`;
    checkStyle(segment, at);
    if (!isPair(segment.from) || !isPair(segment.to))
      fail(at, "needs from: [x, y] and to: [x, y]");
  });

  (block.asymptotes || []).forEach((line, index) => {
    const at = `${location} asymptotes[${index}]`;
    const vertical = isNum(line.x);
    const horizontal = isNum(line.y);
    const slant = isNum(line.slope) && isNum(line.intercept);
    if ([vertical, horizontal, slant].filter(Boolean).length !== 1)
      fail(at, "must be exactly one of { x }, { y }, or { slope, intercept }");
  });

  (block.points || []).forEach((point, index) => {
    const at = `${location} points[${index}]`;
    if (!isPair(point.at)) fail(at, "needs at: [x, y]");
    const [x, y] = point.at;
    if (x < xMin || x > xMax || y < yMin || y > yMax)
      fail(at, `(${x}, ${y}) is outside the window`);
    if (point.open !== undefined && typeof point.open !== "boolean")
      fail(at, "open must be true or false");
    if (point.label !== undefined && typeof point.label !== "string")
      fail(at, "label must be text");
    if (point.position !== undefined && !POSITIONS.has(point.position))
      fail(at, `position must be one of ${[...POSITIONS].join(", ")}`);
  });

  // The final check is the real one: the graph has to render.
  renderGraph(block);
}

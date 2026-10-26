// Build-time checks for "graph" content blocks. A graph that fails here would draw
// wrongly or not at all, so the build stops with a message that names the problem.
import { compileExpression, coordinate } from "../../docs/app/graph/expression.js";
import { renderGraph, sliderValues } from "../../docs/app/graph/render.js";

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
  "axes",
  "axisLabels",
  "grid",
  "height",
  "functions",
  "curves",
  "polar",
  "segments",
  "asymptotes",
  "points",
  "sliders",
  "interactive",
]);
const SLIDER_FIELDS = new Set(["name", "label", "min", "max", "step", "value"]);
const RESERVED = new Set(["x", "e", "i"]);

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
  if (block.interactive !== undefined && typeof block.interactive !== "boolean")
    fail(location, "interactive must be true or false");

  // Sliders: each name becomes a parameter that expressions and coordinates may use.
  if (block.sliders !== undefined && !Array.isArray(block.sliders))
    fail(location, "sliders must be a list");
  const variables = new Set((block.functions || []).map((fn) => fn.variable || "x"));
  const names = new Set();
  (block.sliders || []).forEach((slider, index) => {
    const at = `${location} sliders[${index}]`;
    for (const key of Object.keys(slider || {}))
      if (!SLIDER_FIELDS.has(key)) fail(at, `has unknown field "${key}"`);
    if (typeof slider.name !== "string" || !/^[A-Za-z]$/.test(slider.name))
      fail(at, "name must be one letter, such as a, h, or k");
    if (RESERVED.has(slider.name) || variables.has(slider.name))
      fail(at, `name "${slider.name}" is already the variable or a constant`);
    if (names.has(slider.name)) fail(at, `name "${slider.name}" is used twice`);
    names.add(slider.name);
    if (!isNum(slider.min) || !isNum(slider.max) || !(slider.min < slider.max))
      fail(at, "needs numbers min < max");
    if (!isNum(slider.value) || slider.value < slider.min || slider.value > slider.max)
      fail(at, "needs a starting value between min and max");
    if (
      slider.step !== undefined &&
      (!isNum(slider.step) || slider.step <= 0 || slider.step > slider.max - slider.min)
    )
      fail(at, "step must be positive and no larger than max − min");
    if (
      slider.label !== undefined &&
      (typeof slider.label !== "string" || !slider.label.trim())
    )
      fail(at, "label must be text");
  });
  const parameters = sliderValues(block);
  // With sliders, a coordinate may be an expression in the slider names, such as "h".
  const isCoord = (value) => {
    if (isNum(value)) return true;
    if (!names.size || typeof value !== "string") return false;
    try {
      return Number.isFinite(coordinate(value, parameters));
    } catch {
      return false;
    }
  };
  const isCoordPair = (value) =>
    Array.isArray(value) && value.length === 2 && value.every(isCoord);
  const resolve = (value) => coordinate(value, parameters);
  // Polar angles may be written with pi, such as "2pi" or "pi/2".
  const resolveAngle = (value) =>
    isNum(value) ? value : coordinate(String(value), parameters);
  const isPolarDomain = (value) => {
    if (!Array.isArray(value) || value.length !== 2) return false;
    try {
      const [from, to] = value.map(resolveAngle);
      return Number.isFinite(from) && Number.isFinite(to) && from < to;
    } catch {
      return false;
    }
  };
  const checkPlaceholders = (text, at) => {
    for (const [, source] of String(text ?? "").matchAll(/\{([^{}]+)\}/g)) {
      let value = NaN;
      try {
        value = coordinate(source, parameters);
      } catch (error) {
        fail(at, `label placeholder {${source}} cannot be computed: ${error.message}`);
      }
      if (!Number.isFinite(value))
        fail(at, `label placeholder {${source}} has no value at the starting sliders`);
    }
  };
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
  if (block.tickLabels !== undefined && typeof block.tickLabels !== "boolean")
    fail(location, "tickLabels must be true or false");
  if (block.axes !== undefined && typeof block.axes !== "boolean")
    fail(location, "axes must be true or false");
  if (block.axes === false && block.tickLabels !== false)
    fail(location, "a graph with axes: false also needs tickLabels: false");
  if (
    block.grid !== undefined &&
    typeof block.grid !== "boolean" &&
    block.grid !== "polar"
  )
    fail(location, 'grid must be true, false, or "polar"');
  if (block.axisLabels !== undefined)
    for (const [axis, text] of Object.entries(block.axisLabels))
      if (!["x", "y"].includes(axis) || typeof text !== "string")
        fail(location, "axisLabels takes text for x and y");

  const drawn =
    (block.functions?.length || 0) +
    (block.curves?.length || 0) +
    (block.polar?.length || 0) +
    (block.segments?.length || 0) +
    (block.points?.length || 0);
  if (!drawn)
    fail(
      location,
      "draws nothing; add functions, curves, polar curves, segments, or points",
    );

  (block.functions || []).forEach((fn, index) => {
    const at = `${location} functions[${index}]`;
    let f;
    try {
      f = compileExpression(fn.expr, { variable: fn.variable || "x", parameters });
    } catch (error) {
      fail(at, error.message);
    }
    checkStyle(fn, at);
    checkPlaceholders(fn.label, at);
    if (fn.domain !== undefined && !isCoordPair(fn.domain))
      fail(at, "domain must be [min, max] with min < max");
    const [a, b] = fn.domain ? fn.domain.map(resolve) : [xMin, xMax];
    if (!(a < b)) fail(at, "domain must be [min, max] with min < max");
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

  (block.polar || []).forEach((curve, index) => {
    const at = `${location} polar[${index}]`;
    let r;
    try {
      r = compileExpression(curve.expr, { variable: "θ", parameters });
    } catch (error) {
      fail(at, error.message);
    }
    checkStyle(curve, at);
    checkPlaceholders(curve.label, at);
    if (curve.domain !== undefined && !isPolarDomain(curve.domain))
      fail(at, 'domain must be [from, to] angles with from < to, such as [0, "2pi"]');
    if (curve.labelAt !== undefined && !isNum(curve.labelAt))
      fail(at, "labelAt must be an angle in radians");
    const [from, to] = curve.domain ? curve.domain.map(resolveAngle) : [0, 2 * Math.PI];
    let visible = 0;
    for (let k = 0; k <= 360; k += 1) {
      const theta = from + ((to - from) * k) / 360;
      const radius = r(theta);
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      if (Number.isFinite(radius) && x >= xMin && x <= xMax && y >= yMin && y <= yMax)
        visible += 1;
    }
    if (!visible) fail(at, `"${curve.expr}" never appears inside the window`);
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
    if (!isCoordPair(segment.from) || !isCoordPair(segment.to))
      fail(at, "needs from: [x, y] and to: [x, y]");
    if (segment.labelAt !== undefined && !isNum(segment.labelAt))
      fail(at, "labelAt must be a number");
    checkPlaceholders(segment.label, at);
  });

  (block.asymptotes || []).forEach((line, index) => {
    const at = `${location} asymptotes[${index}]`;
    const vertical = line.x !== undefined && isCoord(line.x);
    const horizontal = line.y !== undefined && isCoord(line.y);
    const slant =
      line.slope !== undefined &&
      line.intercept !== undefined &&
      isCoord(line.slope) &&
      isCoord(line.intercept);
    if ([vertical, horizontal, slant].filter(Boolean).length !== 1)
      fail(at, "must be exactly one of { x }, { y }, or { slope, intercept }");
  });

  (block.points || []).forEach((point, index) => {
    const at = `${location} points[${index}]`;
    if (!isCoordPair(point.at)) fail(at, "needs at: [x, y]");
    const [x, y] = point.at.map(resolve);
    if (x < xMin || x > xMax || y < yMin || y > yMax)
      fail(at, `(${x}, ${y}) is outside the window`);
    if (point.open !== undefined && typeof point.open !== "boolean")
      fail(at, "open must be true or false");
    if (point.label !== undefined && typeof point.label !== "string")
      fail(at, "label must be text");
    checkPlaceholders(point.label, at);
    if (point.position !== undefined && !POSITIONS.has(point.position))
      fail(at, `position must be one of ${[...POSITIONS].join(", ")}`);
  });

  // The final check is the real one: the graph has to render, at the starting slider
  // values and at both ends of every slider.
  renderGraph(block);
  renderGraph(block, { interactive: true });
  for (const slider of block.sliders || [])
    for (const value of [slider.min, slider.max])
      renderGraph(block, { values: { [slider.name]: value } });
}

// A graph can be valid and still unreadable: a branch of a rational function that leaves the
// window at once and shows only a sliver, or a curve that is almost entirely off the screen.
// Practice graphs are generated from random numbers, so the build checks each one. The window is
// cut into pieces at its edges and at every vertical asymptote. Each piece wide enough to read
// must show the curve for at least `minShare` of its width. Returns a description of the first
// problem, or null when the graph reads well.
export function graphReadability(block, { minShare = 0.15, minWidth = 1.2 } = {}) {
  if (!block?.window?.x || !block?.window?.y) return null;
  const [x0, x1] = block.window.x;
  const [y0, y1] = block.window.y;
  const cuts = [
    x0,
    x1,
    ...(block.asymptotes || [])
      .filter((line) => isNum(line.x) && line.x > x0 && line.x < x1)
      .map((line) => line.x),
  ].sort((a, b) => a - b);
  for (const fn of block.functions || []) {
    if (fn.variable && fn.variable !== "x") continue;
    let f;
    try {
      f = compileExpression(fn.expr, { variable: "x" });
    } catch {
      continue;
    }
    const [d0, d1] =
      Array.isArray(fn.domain) && fn.domain.every(isNum) ? fn.domain : [x0, x1];
    for (let i = 0; i + 1 < cuts.length; i += 1) {
      const from = Math.max(cuts[i], d0);
      const to = Math.min(cuts[i + 1], d1);
      if (to - from < minWidth) continue;
      const samples = 160;
      let drawn = 0;
      let defined = 0;
      for (let k = 1; k < samples; k += 1) {
        const y = f(from + ((to - from) * k) / samples);
        if (!Number.isFinite(y)) continue;
        defined += 1;
        if (y >= y0 && y <= y1) drawn += 1;
      }
      // A piece where the function is undefined is not the graph's problem; a piece where it
      // is defined but hidden is.
      if (defined > samples * 0.5 && drawn / samples < minShare)
        return `y = ${fn.expr} shows only ${Math.round((100 * drawn) / samples)}% of its curve for x from ${Math.round(from * 100) / 100} to ${Math.round(to * 100) / 100}`;
    }
  }
  return null;
}

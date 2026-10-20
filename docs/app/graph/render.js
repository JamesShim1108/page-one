// Renders a "graph" content block as an inline SVG figure. Graphs are authored as
// data (a window, expressions, points, asymptotes) so they stay sharp at any size,
// follow the site's colors, print cleanly, and need no image files.
//
// Block shape (see handbook/graphs.md for the full reference):
// {
//   type: "graph",
//   caption: "Graph of y = f(x)",                 shown under the graph
//   alt: "A cubic curve that rises, falls, ...",  read by screen readers
//   window: { x: [-4, 4], y: [-5, 5] },
//   ticks: { x: 1, y: 1 } or { x: [{ at: 3.14, label: "π" }] }, optional
//   tickLabels: false,                            hide the scale (no scale shown)
//   axisLabels: { x: "t", y: "h(t)" },            optional, default x and y
//   height: 300,                                  optional, 160 to 520
//   functions: [{ expr: "x^3 - 3x", domain: [-2, 2], endpoints: ["closed", "open"],
//                 label: "f", labelAt: 1.5, dashed: false, color: 1 }],
//   curves: [{ through: [[0, 1], [2, 3], [4, 0]], label: "g" }],
//   segments: [{ from: [1, 1], to: [3, 9], dashed: true, label: "slope 4", labelAt: 2 }],
//   asymptotes: [{ x: 2 }, { y: 1 }, { slope: 2, intercept: 0 }],
//   points: [{ at: [2, 4], open: true, label: "(2, 4)", position: "ne" }],
//   sliders: [{ name: "h", min: -4, max: 4, step: 1, value: 3, label: "Shift" }],
//   interactive: false,                           keep a lesson graph still
// }
//
// renderGraph(block) draws a still figure (print, exams, previews).
// renderGraph(block, { interactive: true }) adds the controls that graph/interact.js
// brings to life: tracing, zoom, drag to pan, and sliders. Slider names can appear in
// expressions, coordinates ("h", "k + 1"), and labels ("({h}, {k})").

import { compileExpression, coordinate } from "./expression.js";

export const VIEW_WIDTH = 440;
export const MARGIN = { top: 14, right: 14, bottom: 26, left: 34 };
const DEFAULT_HEIGHT = 300;
const SAMPLES = 600;

const escapeXml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function hashText(text) {
  let hash = 2166136261;
  for (const ch of text) {
    hash ^= ch.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

export function niceStep(range, target = 8) {
  const raw = range / target;
  const power = 10 ** Math.floor(Math.log10(raw));
  const scaled = raw / power;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return nice * power;
}

export function formatTick(value) {
  const rounded = Math.round(value * 1e6) / 1e6;
  const text = String(Math.abs(rounded));
  return rounded < 0 ? `−${text}` : text;
}

function tickList(spec, [min, max]) {
  if (Array.isArray(spec))
    return spec
      .filter((tick) => tick.at >= min && tick.at <= max)
      .map((tick) => ({ at: tick.at, label: tick.label ?? formatTick(tick.at) }));
  // An authored step that would crowd a zoomed-out view falls back to a round one.
  const step = spec && (max - min) / spec <= 24 ? spec : niceStep(max - min);
  const ticks = [];
  for (let k = Math.ceil(min / step - 1e-9); k * step <= max + 1e-9; k += 1) {
    const at = Math.round(k * step * 1e9) / 1e9;
    ticks.push({ at, label: formatTick(at) });
  }
  return ticks;
}

// Monotone cubic interpolation (Fritsch–Carlson): passes through every authored point
// without overshooting, so a peak placed at a point stays the peak.
function monotoneSpline(points) {
  const n = points.length;
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const h = xs.slice(1).map((x, i) => x - xs[i]);
  const delta = ys.slice(1).map((y, i) => (y - ys[i]) / h[i]);
  const m = new Array(n);
  m[0] = delta[0];
  m[n - 1] = delta[n - 2];
  for (let i = 1; i < n - 1; i += 1)
    m[i] = delta[i - 1] * delta[i] <= 0 ? 0 : (delta[i - 1] + delta[i]) / 2;
  for (let i = 0; i < n - 1; i += 1) {
    if (delta[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const a = m[i] / delta[i];
    const b = m[i + 1] / delta[i];
    const s = a * a + b * b;
    if (s > 9) {
      const t = 3 / Math.sqrt(s);
      m[i] = t * a * delta[i];
      m[i + 1] = t * b * delta[i];
    }
  }
  const out = [];
  for (let i = 0; i < n - 1; i += 1) {
    const steps = 24;
    for (let k = i === 0 ? 0 : 1; k <= steps; k += 1) {
      const t = k / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const x = xs[i] + t * h[i];
      const y =
        (2 * t3 - 3 * t2 + 1) * ys[i] +
        (t3 - 2 * t2 + t) * h[i] * m[i] +
        (-2 * t3 + 3 * t2) * ys[i + 1] +
        (t3 - t2) * h[i] * m[i + 1];
      out.push([x, y]);
    }
  }
  return out;
}

// True when f really jumps between a and b (an asymptote or a break), rather than
// rising steeply but continuously.
function jumps(f, a, b) {
  const fa = f(a);
  const fb = f(b);
  const increasing = fb > fa;
  let previous = fa;
  for (let k = 1; k <= 16; k += 1) {
    const value = f(a + ((b - a) * k) / 16);
    if (!Number.isFinite(value)) return true;
    if (increasing ? value < previous : value > previous) return true;
    previous = value;
  }
  return false;
}

function sampleFunction(f, from, to, yMin, yMax) {
  const span = yMax - yMin;
  const low = yMin - 2 * span;
  const high = yMax + 2 * span;
  const pieces = [];
  let current = [];
  let previousX = null;
  let previousY = null;
  for (let k = 0; k <= SAMPLES; k += 1) {
    const x = from + ((to - from) * k) / SAMPLES;
    const y = f(x);
    if (!Number.isFinite(y)) {
      if (current.length > 1) pieces.push(current);
      current = [];
      previousX = null;
      continue;
    }
    if (previousX !== null) {
      const crosses = (previousY < yMin && y > yMax) || (previousY > yMax && y < yMin);
      if (crosses && jumps(f, previousX, x)) {
        if (current.length > 1) pieces.push(current);
        current = [];
      }
    }
    current.push([x, Math.min(high, Math.max(low, y))]);
    previousX = x;
    previousY = y;
  }
  if (current.length > 1) pieces.push(current);
  return pieces;
}

export function graphLayout(block, view = block.window) {
  const [xMin, xMax] = view.x;
  const [yMin, yMax] = view.y;
  const height = block.height || DEFAULT_HEIGHT;
  const plotW = VIEW_WIDTH - MARGIN.left - MARGIN.right;
  const plotH = height - MARGIN.top - MARGIN.bottom;
  const px = (x) => MARGIN.left + ((x - xMin) / (xMax - xMin)) * plotW;
  const py = (y) => MARGIN.top + ((yMax - y) / (yMax - yMin)) * plotH;
  return { xMin, xMax, yMin, yMax, height, plotW, plotH, px, py };
}

const r2 = (n) => Math.round(n * 100) / 100;

function pathFrom(points, { px, py }) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${r2(px(x))} ${r2(py(y))}`).join("");
}

function inkClass(item) {
  const color =
    Number.isInteger(item.color) && item.color >= 1 && item.color <= 4 ? item.color : 1;
  return `graph-ink-${color}${item.dashed ? " graph-dashed" : ""}`;
}

export function sliderValues(block, values = {}) {
  const out = {};
  for (const slider of block.sliders || [])
    out[slider.name] = Number.isFinite(values[slider.name])
      ? values[slider.name]
      : slider.value;
  return out;
}

// "{h}" in a label becomes the slider's current value, and "{b^2}" or "{b + 1}"
// becomes the value of that expression in the slider names.
export function fillLabel(text, values) {
  return String(text ?? "").replace(/\{([^{}]+)\}/g, (match, source) => {
    try {
      const value = coordinate(source, values);
      return Number.isFinite(value) ? formatTick(Math.round(value * 1e4) / 1e4) : match;
    } catch {
      return match;
    }
  });
}

// The drawable pieces of a graph at the given slider values: compiled functions,
// sampled curves, and resolved points. The renderer and the tracer share it.
export function graphModel(block, values = sliderValues(block)) {
  const parameters = values;
  const at = (value) => coordinate(value, parameters);
  return {
    functions: (block.functions || []).map((fn) => {
      const domain = fn.domain ? fn.domain.map(at) : null;
      return {
        source: fn,
        f: compileExpression(fn.expr, { variable: fn.variable || "x", parameters }),
        domain,
        variable: fn.variable || "x",
        label: fn.label ? fillLabel(fn.label, values) : "",
      };
    }),
    curves: (block.curves || []).map((curve) => ({
      source: curve,
      points: monotoneSpline([...curve.through].sort((p, q) => p[0] - q[0])),
      label: curve.label ? fillLabel(curve.label, values) : "",
    })),
    segments: (block.segments || []).map((segment) => ({
      source: segment,
      from: segment.from.map(at),
      to: segment.to.map(at),
      label: segment.label ? fillLabel(segment.label, values) : "",
    })),
    asymptotes: (block.asymptotes || []).map((line) => ({
      x: line.x === undefined ? undefined : at(line.x),
      y: line.y === undefined ? undefined : at(line.y),
      slope: line.slope === undefined ? undefined : at(line.slope),
      intercept: line.intercept === undefined ? undefined : at(line.intercept),
    })),
    points: (block.points || []).map((point) => ({
      source: point,
      x: at(point.at[0]),
      y: at(point.at[1]),
      label: point.label ? fillLabel(point.label, values) : "",
    })),
  };
}

const LABEL_OFFSETS = {
  n: [0, -10, "middle"],
  s: [0, 18, "middle"],
  e: [9, 4, "start"],
  w: [-9, 4, "end"],
  ne: [7, -8, "start"],
  nw: [-7, -8, "end"],
  se: [7, 16, "start"],
  sw: [-7, 16, "end"],
};

function labelText(text, x, y, position, className) {
  const [dx, dy, anchor] = LABEL_OFFSETS[position] || LABEL_OFFSETS.ne;
  return `<text class="${className}" x="${r2(x + dx)}" y="${r2(y + dy)}" text-anchor="${anchor}">${escapeXml(text)}</text>`;
}

// True when the figure gets live controls: tracing needs a scale to read, so a
// "no scale shown" graph stays still unless it has sliders.
export function graphIsInteractive(block, options = {}) {
  return Boolean(
    options.interactive &&
    block.interactive !== false &&
    (block.tickLabels !== false || block.sliders?.length),
  );
}

// The SVG drawing alone, for any view window and slider values.
export function drawGraphSvg(block, { values, view, interactive = false } = {}) {
  const current = sliderValues(block, values);
  const model = graphModel(block, current);
  const layout = graphLayout(block, view || block.window);
  const { xMin, xMax, yMin, yMax, height, plotW, plotH, px, py } = layout;
  const id = `graph-${hashText(JSON.stringify(block))}`;
  const inside = (x, y) => x >= xMin && x <= xMax && y >= yMin && y <= yMax;
  const parts = [];

  // Grid and ticks.
  const xTicks = tickList(block.ticks?.x, [xMin, xMax]);
  const yTicks = tickList(block.ticks?.y, [yMin, yMax]);
  if (block.grid !== false) {
    for (const tick of xTicks)
      parts.push(
        `<line class="graph-grid" x1="${r2(px(tick.at))}" x2="${r2(px(tick.at))}" y1="${MARGIN.top}" y2="${MARGIN.top + plotH}"/>`,
      );
    for (const tick of yTicks)
      parts.push(
        `<line class="graph-grid" x1="${MARGIN.left}" x2="${MARGIN.left + plotW}" y1="${r2(py(tick.at))}" y2="${r2(py(tick.at))}"/>`,
      );
  }
  parts.push(
    `<rect class="graph-frame" x="${MARGIN.left}" y="${MARGIN.top}" width="${plotW}" height="${plotH}"/>`,
  );

  // Axes sit at 0 when 0 is in view; tick labels sit on the axis or along the frame.
  const xAxisY = yMin <= 0 && yMax >= 0 ? py(0) : null;
  const yAxisX = xMin <= 0 && xMax >= 0 ? px(0) : null;
  if (xAxisY !== null)
    parts.push(
      `<line class="graph-axis" x1="${MARGIN.left}" x2="${MARGIN.left + plotW}" y1="${r2(xAxisY)}" y2="${r2(xAxisY)}"/>`,
    );
  if (yAxisX !== null)
    parts.push(
      `<line class="graph-axis" x1="${r2(yAxisX)}" x2="${r2(yAxisX)}" y1="${MARGIN.top}" y2="${MARGIN.top + plotH}"/>`,
    );
  if (block.tickLabels !== false) {
    const labelY = MARGIN.top + plotH + 16;
    for (const tick of xTicks)
      if (!(tick.at === 0 && yAxisX !== null && xAxisY !== null))
        parts.push(
          `<text class="graph-tick" x="${r2(px(tick.at))}" y="${labelY}" text-anchor="middle">${escapeXml(tick.label)}</text>`,
        );
    for (const tick of yTicks)
      if (!(tick.at === 0 && yAxisX !== null && xAxisY !== null))
        parts.push(
          `<text class="graph-tick" x="${MARGIN.left - 5}" y="${r2(py(tick.at) + 4)}" text-anchor="end">${escapeXml(tick.label)}</text>`,
        );
    if (yAxisX !== null && xAxisY !== null)
      parts.push(
        `<text class="graph-tick" x="${r2(yAxisX - 5)}" y="${r2(xAxisY + 14)}" text-anchor="end">0</text>`,
      );
  }
  const axisLabels = { x: "x", y: "y", ...(block.axisLabels || {}) };
  parts.push(
    `<text class="graph-axis-label" x="${MARGIN.left + plotW - 4}" y="${r2((xAxisY ?? MARGIN.top + plotH) - 6)}" text-anchor="end">${escapeXml(axisLabels.x)}</text>`,
  );
  parts.push(
    `<text class="graph-axis-label" x="${r2((yAxisX ?? MARGIN.left) + 6)}" y="${MARGIN.top + 13}" text-anchor="start">${escapeXml(axisLabels.y)}</text>`,
  );

  // Everything plotted is clipped to the frame.
  const plotted = [];
  const overlays = [];

  for (const asymptote of model.asymptotes) {
    let d;
    if (asymptote.x !== undefined)
      d = `M${r2(px(asymptote.x))} ${MARGIN.top}V${MARGIN.top + plotH}`;
    else if (asymptote.y !== undefined)
      d = `M${MARGIN.left} ${r2(py(asymptote.y))}H${MARGIN.left + plotW}`;
    else {
      const line = (x) => asymptote.slope * x + asymptote.intercept;
      d = `M${r2(px(xMin))} ${r2(py(line(xMin)))}L${r2(px(xMax))} ${r2(py(line(xMax)))}`;
    }
    if (!d.includes("NaN")) plotted.push(`<path class="graph-asymptote" d="${d}"/>`);
  }

  for (const segment of model.segments)
    if ([...segment.from, ...segment.to].every(Number.isFinite))
      plotted.push(
        `<path class="graph-curve graph-segment ${inkClass(segment.source)}" d="M${r2(px(segment.from[0]))} ${r2(py(segment.from[1]))}L${r2(px(segment.to[0]))} ${r2(py(segment.to[1]))}"/>`,
      );

  // Labels sit on a visible point of their curve: the one nearest labelAt, or one
  // near the right end of the visible part.
  const labelFor = (item, text, points) => {
    if (!text) return;
    const visible = points.filter(([x, y]) => inside(x, y));
    if (!visible.length) return;
    const candidate =
      item.labelAt !== undefined
        ? visible.reduce((best, p) =>
            Math.abs(p[0] - item.labelAt) < Math.abs(best[0] - item.labelAt) ? p : best,
          )
        : visible[Math.floor((visible.length - 1) * 0.82)];
    overlays.push(
      labelText(
        text,
        px(candidate[0]),
        py(candidate[1]),
        item.labelPosition || "ne",
        "graph-label",
      ),
    );
  };

  for (const segment of model.segments)
    if (segment.label && [...segment.from, ...segment.to].every(Number.isFinite))
      labelFor(
        segment.source,
        segment.label,
        Array.from({ length: 41 }, (_, k) => [
          segment.from[0] + ((segment.to[0] - segment.from[0]) * k) / 40,
          segment.from[1] + ((segment.to[1] - segment.from[1]) * k) / 40,
        ]),
      );

  model.functions.forEach((fn, index) => {
    const { f, source } = fn;
    const [a, b] = fn.domain || [xMin, xMax];
    const from = Math.max(a, xMin);
    const to = Math.min(b, xMax);
    if (!(to > from)) return;
    const pieces = sampleFunction(f, from, to, yMin, yMax);
    for (const piece of pieces)
      plotted.push(
        `<path class="graph-curve ${inkClass(source)}" data-graph-curve="f${index}" d="${pathFrom(piece, layout)}"/>`,
      );
    labelFor(source, fn.label, pieces.flat());
    (source.endpoints || []).forEach((kind, i) => {
      if (!kind) return;
      const x = i === 0 ? a : b;
      const y = f(x);
      if (Number.isFinite(y) && inside(x, y))
        overlays.push(
          `<circle class="graph-point${kind === "open" ? " graph-point--open" : ""} ${inkClass(source)}" cx="${r2(px(x))}" cy="${r2(py(y))}" r="4.5"/>`,
        );
    });
  });

  model.curves.forEach((curve, index) => {
    plotted.push(
      `<path class="graph-curve ${inkClass(curve.source)}" data-graph-curve="c${index}" d="${pathFrom(curve.points, layout)}"/>`,
    );
    labelFor(curve.source, curve.label, curve.points);
  });

  for (const point of model.points) {
    const { x, y } = point;
    if (!Number.isFinite(x) || !Number.isFinite(y) || !inside(x, y)) continue;
    overlays.push(
      `<circle class="graph-point${point.source.open ? " graph-point--open" : ""}" cx="${r2(px(x))}" cy="${r2(py(y))}" r="4.5"/>`,
    );
    if (point.label)
      overlays.push(
        labelText(
          point.label,
          px(x),
          py(y),
          point.source.position || "ne",
          "graph-point-label",
        ),
      );
  }

  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const role = interactive
    ? `role="application" aria-roledescription="interactive graph" tabindex="0" aria-labelledby="${titleId}" aria-describedby="${descId} ${id}-keys"`
    : `role="img" aria-labelledby="${titleId} ${descId}" focusable="false"`;
  return `<svg class="graph" viewBox="0 0 ${VIEW_WIDTH} ${height}" ${role}>
    <title id="${titleId}">${escapeXml(block.caption)}</title>
    <desc id="${descId}">${escapeXml(block.alt)}</desc>
    <defs><clipPath id="${id}-clip"><rect x="${MARGIN.left}" y="${MARGIN.top}" width="${plotW}" height="${plotH}"/></clipPath></defs>
    ${parts.join("\n    ")}
    <g clip-path="url(#${id}-clip)">${plotted.join("")}</g>
    ${overlays.join("\n    ")}
    <g class="graph-trace" clip-path="url(#${id}-clip)"></g>
  </svg>`;
}

function sliderControls(block, values) {
  if (!block.sliders?.length) return "";
  return `<div class="graph-sliders">${block.sliders
    .map((slider) => {
      const step = slider.step ?? niceStep(slider.max - slider.min, 20);
      const value = values[slider.name];
      return `<label class="graph-slider">
        <span class="graph-slider-text"><span>${escapeXml(slider.label || "Slider")}</span><span class="graph-slider-value"><i>${escapeXml(slider.name)}</i> = <output data-graph-slider-value="${escapeXml(slider.name)}">${escapeXml(formatTick(value))}</output></span></span>
        <input type="range" data-graph-slider="${escapeXml(slider.name)}" min="${slider.min}" max="${slider.max}" step="${step}" value="${value}">
      </label>`;
    })
    .join("")}</div>`;
}

export function renderGraph(block, options = {}) {
  // A copy that lost its drawing data still shows its description instead of breaking the page.
  if (!Array.isArray(block?.window?.x) || !Array.isArray(block?.window?.y))
    return `<p class="muted">[Graph: ${escapeXml(block?.alt || block?.caption || "unavailable")}]</p>`;
  const values = sliderValues(block, options.values);
  if (!graphIsInteractive(block, options)) {
    const shown = block.sliders?.length
      ? `<span class="graph-values">Shown with ${block.sliders
          .map(
            (slider) =>
              `${escapeXml(slider.name)} = ${escapeXml(formatTick(values[slider.name]))}`,
          )
          .join(", ")}.</span>`
      : "";
    return `<figure class="graph-figure">
  ${drawGraphSvg(block, { values })}
  <figcaption>${escapeXml(block.caption)}${shown}</figcaption>
</figure>`;
  }
  const id = `graph-${hashText(JSON.stringify(block))}`;
  const traceable = block.tickLabels !== false;
  return `<figure class="graph-figure graph-figure--interactive" data-graph="${escapeXml(JSON.stringify(block))}">
  <div class="graph-stage">${drawGraphSvg(block, { values, interactive: true })}</div>
  <div class="graph-bar">
    <output class="graph-readout" aria-live="off">${traceable ? "Trace a curve to read its values. Zoom with + and −." : "Move the sliders to change the graph."}</output>
    <div class="graph-tools" role="group" aria-label="Graph view">
      <button type="button" class="graph-tool" data-graph-action="zoom-in" aria-label="Zoom in" title="Zoom in">+</button>
      <button type="button" class="graph-tool" data-graph-action="zoom-out" aria-label="Zoom out" title="Zoom out">−</button>
      <button type="button" class="graph-tool graph-tool--text" data-graph-action="reset" disabled>Reset</button>
    </div>
  </div>
  <p class="visually-hidden" id="${id}-keys">${traceable ? "Use the left and right arrow keys to trace, up and down to switch curves, plus and minus to zoom, and 0 to reset." : "Use plus and minus to zoom, and 0 to reset."}</p>
  ${sliderControls(block, values)}
  <figcaption>${escapeXml(block.caption)}</figcaption>
</figure>`;
}

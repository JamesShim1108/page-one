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
//   segments: [{ from: [1, 1], to: [3, 9], dashed: true }],
//   asymptotes: [{ x: 2 }, { y: 1 }, { slope: 2, intercept: 0 }],
//   points: [{ at: [2, 4], open: true, label: "(2, 4)", position: "ne" }],
// }

import { compileExpression } from "./expression.js";

const VIEW_WIDTH = 440;
const MARGIN = { top: 14, right: 14, bottom: 26, left: 34 };
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
    return spec.map((tick) => ({
      at: tick.at,
      label: tick.label ?? formatTick(tick.at),
    }));
  const step = spec || niceStep(max - min);
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

export function graphLayout(block) {
  const [xMin, xMax] = block.window.x;
  const [yMin, yMax] = block.window.y;
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

export function renderGraph(block) {
  // A copy that lost its drawing data still shows its description instead of breaking the page.
  if (!Array.isArray(block?.window?.x) || !Array.isArray(block?.window?.y))
    return `<p class="muted">[Graph: ${escapeXml(block?.alt || block?.caption || "unavailable")}]</p>`;
  const layout = graphLayout(block);
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

  for (const asymptote of block.asymptotes || []) {
    let d;
    if (asymptote.x !== undefined)
      d = `M${r2(px(asymptote.x))} ${MARGIN.top}V${MARGIN.top + plotH}`;
    else if (asymptote.y !== undefined)
      d = `M${MARGIN.left} ${r2(py(asymptote.y))}H${MARGIN.left + plotW}`;
    else {
      const line = (x) => asymptote.slope * x + asymptote.intercept;
      d = `M${r2(px(xMin))} ${r2(py(line(xMin)))}L${r2(px(xMax))} ${r2(py(line(xMax)))}`;
    }
    plotted.push(`<path class="graph-asymptote" d="${d}"/>`);
  }

  for (const segment of block.segments || [])
    plotted.push(
      `<path class="graph-curve graph-segment ${inkClass(segment)}" d="M${r2(px(segment.from[0]))} ${r2(py(segment.from[1]))}L${r2(px(segment.to[0]))} ${r2(py(segment.to[1]))}"/>`,
    );

  // Labels sit on a visible point of their curve: the one nearest labelAt, or one
  // near the right end of the visible part.
  const labelFor = (item, points) => {
    if (!item.label) return;
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
        item.label,
        px(candidate[0]),
        py(candidate[1]),
        item.labelPosition || "ne",
        "graph-label",
      ),
    );
  };

  for (const fn of block.functions || []) {
    const f = compileExpression(fn.expr, { variable: fn.variable || "x" });
    const [a, b] = fn.domain || [xMin, xMax];
    const from = Math.max(a, xMin);
    const to = Math.min(b, xMax);
    if (to <= from) continue;
    const pieces = sampleFunction(f, from, to, yMin, yMax);
    for (const piece of pieces)
      plotted.push(
        `<path class="graph-curve ${inkClass(fn)}" d="${pathFrom(piece, layout)}"/>`,
      );
    labelFor(fn, pieces.flat());
    (fn.endpoints || []).forEach((kind, i) => {
      if (!kind) return;
      const x = i === 0 ? a : b;
      const y = f(x);
      if (Number.isFinite(y) && inside(x, y))
        overlays.push(
          `<circle class="graph-point${kind === "open" ? " graph-point--open" : ""} ${inkClass(fn)}" cx="${r2(px(x))}" cy="${r2(py(y))}" r="4.5"/>`,
        );
    });
  }

  for (const curve of block.curves || []) {
    const points = monotoneSpline([...curve.through].sort((p, q) => p[0] - q[0]));
    plotted.push(
      `<path class="graph-curve ${inkClass(curve)}" d="${pathFrom(points, layout)}"/>`,
    );
    labelFor(curve, points);
  }

  for (const point of block.points || []) {
    const [x, y] = point.at;
    overlays.push(
      `<circle class="graph-point${point.open ? " graph-point--open" : ""}" cx="${r2(px(x))}" cy="${r2(py(y))}" r="4.5"/>`,
    );
    if (point.label)
      overlays.push(
        labelText(point.label, px(x), py(y), point.position || "ne", "graph-point-label"),
      );
  }

  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  return `<figure class="graph-figure">
  <svg class="graph" viewBox="0 0 ${VIEW_WIDTH} ${height}" role="img" aria-labelledby="${titleId} ${descId}" focusable="false">
    <title id="${titleId}">${escapeXml(block.caption)}</title>
    <desc id="${descId}">${escapeXml(block.alt)}</desc>
    <defs><clipPath id="${id}-clip"><rect x="${MARGIN.left}" y="${MARGIN.top}" width="${plotW}" height="${plotH}"/></clipPath></defs>
    ${parts.join("\n    ")}
    <g clip-path="url(#${id}-clip)">${plotted.join("")}</g>
    ${overlays.join("\n    ")}
  </svg>
  <figcaption>${escapeXml(block.caption)}</figcaption>
</figure>`;
}

// The calculator: Calculate (expressions, memory, history), Graph (y1–y6 with trace,
// zoom, and analysis), Table, and Stats (one-variable statistics and regressions).
// mountCalculator(root) draws it into any element and returns a cleanup function.
// State is kept in this browser only.

import { escapeHtml as esc } from "../ui.js";
import { createEngine, CalcError } from "../math/engine.js";
import { formatNumber, formatValue, exactHint } from "../math/format.js";
import {
  findExtrema,
  findZeros,
  oneVariable,
  regression,
  REGRESSIONS,
} from "../math/numeric.js";
import { renderGraph, niceStep } from "../graph/render.js";
import { registerGraphFunction } from "../graph/registry.js";
import { renderMathKeyboard, insertText } from "../mathkeys/keys.js";

const STORAGE_KEY = "page-one-calculator-v1";
const SLOT_COUNT = 6;
const HISTORY_LIMIT = 100;
const TABS = [
  ["calculate", "Calculate"],
  ["graph", "Graph"],
  ["table", "Table"],
  ["stats", "Stats"],
];
const STANDARD_WINDOW = { x: [-10, 10], y: [-10, 10] };
// Slot colors reuse the four graph inks; slots 5 and 6 are dashed to stay distinct.
const SLOT_STYLE = [
  { color: 1 },
  { color: 2 },
  { color: 3 },
  { color: 4 },
  { color: 1, dashed: true },
  { color: 2, dashed: true },
];

export function clearCalculatorStorage() {
  try {
    globalThis.localStorage?.removeItem(STORAGE_KEY);
  } catch {
    // Nothing was stored.
  }
}

function loadState() {
  let saved = {};
  try {
    saved = JSON.parse(globalThis.localStorage?.getItem(STORAGE_KEY) || "{}") || {};
  } catch {
    saved = {};
  }
  const slots = Array.from({ length: SLOT_COUNT }, (_, i) => ({
    expr: String(saved.slots?.[i]?.expr ?? ""),
    visible: saved.slots?.[i]?.visible !== false,
  }));
  const window = validWindow(saved.window) ? saved.window : STANDARD_WINDOW;
  return {
    tab: TABS.some(([id]) => id === saved.tab) ? saved.tab : "calculate",
    engine: saved.engine || {},
    history: Array.isArray(saved.history) ? saved.history.slice(-HISTORY_LIMIT) : [],
    slots,
    window: { x: [...window.x], y: [...window.y] },
    table: {
      start: Number.isFinite(saved.table?.start) ? saved.table.start : 0,
      step:
        Number.isFinite(saved.table?.step) && saved.table.step > 0 ? saved.table.step : 1,
    },
    stats: {
      data: String(saved.stats?.data ?? ""),
      model: REGRESSIONS[saved.stats?.model] ? saved.stats.model : "linear",
    },
    display: {
      decimals: /^(auto|[0-9])$/.test(saved.display?.decimals)
        ? saved.display.decimals
        : "auto",
      exact: saved.display?.exact !== false,
    },
  };
}

function validWindow(w) {
  return (
    w &&
    ["x", "y"].every(
      (axis) =>
        Array.isArray(w[axis]) &&
        w[axis].length === 2 &&
        w[axis].every(Number.isFinite) &&
        w[axis][0] < w[axis][1],
    )
  );
}

// Data lines: "x, y", "x y", or tab-separated pairs pasted from a spreadsheet.
export function parseData(text) {
  const xs = [];
  const ys = [];
  const problems = [];
  let columns = 0;
  String(text)
    .split(/\r?\n/)
    .forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      const parts = trimmed
        .split(/[\s,;]+/)
        .filter(Boolean)
        .map((p) => Number(p.replace(/[−–]/g, "-")));
      if (!parts.length || parts.some((v) => !Number.isFinite(v)) || parts.length > 2) {
        if (index === 0 && /[A-Za-z]/.test(trimmed)) return; // a header row
        problems.push(index + 1);
        return;
      }
      columns = Math.max(columns, parts.length);
      xs.push(parts[0]);
      ys.push(parts.length > 1 ? parts[1] : NaN);
    });
  const paired = columns === 2 && ys.every(Number.isFinite);
  if (columns === 2 && !paired) problems.push("some lines have only one number");
  return { xs, ys: paired ? ys : [], problems };
}

let instances = 0;

export function mountCalculator(root, { compact = false } = {}) {
  const id = `calc-${(instances += 1)}`;
  const state = loadState();
  const engine = createEngine(state.engine);
  let settingsOpen = false;
  let recall = null; // index into history while pressing ↑ / ↓
  let analysis = { slot: 0, op: "zeros", other: 1, at: "", results: [], message: "" };
  let fit = null;
  let saveTimer = 0;
  let graphTimer = 0;

  const save = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        globalThis.localStorage?.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...state, engine: engine.snapshot() }),
        );
      } catch {
        // Storage can be full or blocked; the calculator keeps working for this visit.
      }
    }, 200);
  };

  const display = (value) => formatValue(value, { decimals: state.display.decimals });
  const inputId = `${id}-input`;
  const slotRef = (i) => `${id}-y${i + 1}`;

  function syncEngine() {
    const data = parseData(state.stats.data);
    engine.setLists({ L1: data.xs, L2: data.ys });
    engine.setSlots(
      Object.fromEntries(state.slots.map((slot, i) => [`y${i + 1}`, slot.expr])),
    );
    state.slots.forEach((slot, i) => {
      let f = () => NaN;
      try {
        if (slot.expr.trim()) f = engine.compile(slot.expr);
      } catch {
        f = () => NaN;
      }
      registerGraphFunction(slotRef(i), f);
    });
  }

  // ---------- Markup ----------

  function settingsPanel() {
    const s = engine.settings;
    return `<div class="calc-settings" id="${id}-settings">
      <fieldset><legend>Angle</legend>
        <label><input type="radio" name="${id}-angle" value="rad" data-calc-setting="angle" ${s.angle === "rad" ? "checked" : ""}> Radians</label>
        <label><input type="radio" name="${id}-angle" value="deg" data-calc-setting="angle" ${s.angle === "deg" ? "checked" : ""}> Degrees</label>
      </fieldset>
      <fieldset><legend>Numbers</legend>
        <label><input type="checkbox" data-calc-setting="complex" ${s.complex ? "checked" : ""}> Complex results (a + bi)</label>
        <label><input type="checkbox" data-calc-setting="exact" ${state.display.exact ? "checked" : ""}> Show exact forms (1/3, π/6, √3/2)</label>
        <label class="calc-decimals">Decimal places <select data-calc-setting="decimals">${[
          "auto",
          ..."0123456789",
        ]
          .map(
            (d) =>
              `<option value="${d}" ${state.display.decimals === d ? "selected" : ""}>${d === "auto" ? "Auto" : d}</option>`,
          )
          .join("")}</select></label>
      </fieldset>
      <div class="calc-settings-actions">
        <button type="button" class="text-button" data-calc-action="clear-history">Clear history</button>
        <button type="button" class="text-button" data-calc-action="clear-memory">Clear variables and functions</button>
      </div>
    </div>`;
  }

  function historyItem(entry, index) {
    if (entry.error)
      return `<li class="calc-line calc-line--error"><button type="button" class="calc-in" data-calc-reuse="${index}">${esc(entry.input)}</button><span class="calc-out">${esc(entry.text)}</span></li>`;
    return `<li class="calc-line"><button type="button" class="calc-in" data-calc-reuse="${index}" title="Use this expression again">${esc(entry.input)}</button>${
      entry.readAs ? `<span class="calc-read-as">Read as ${esc(entry.readAs)}</span>` : ""
    }<button type="button" class="calc-out" data-calc-insert="${index}" title="Insert this result">${esc(entry.text)}${
      entry.exact && state.display.exact
        ? `<span class="calc-exact"> = ${esc(entry.exact)}</span>`
        : ""
    }</button></li>`;
  }

  function memoryList() {
    const vars = engine.variables();
    const funcs = engine.functions();
    if (!vars.length && !funcs.length)
      return `<p class="calc-muted">Store a value with <code>A = 5</code> or <code>5 → A</code>. Define a function with <code>f(x) = x² − 3x</code>.</p>`;
    return `<ul class="calc-memory-list">${[
      ...funcs.map(
        (f) =>
          `<li><code>${esc(f.name)}(${esc(f.params.join(", "))}) = ${esc(f.source)}</code><button type="button" class="text-button" data-calc-forget="${esc(f.name)}" aria-label="Delete ${esc(f.name)}">Delete</button></li>`,
      ),
      ...vars.map(
        ([name, value]) =>
          `<li><code>${esc(name)} = ${esc(display(value))}</code><button type="button" class="text-button" data-calc-forget="${esc(name)}" aria-label="Delete ${esc(name)}">Delete</button></li>`,
      ),
    ].join("")}</ul>`;
  }

  function calculateTab() {
    return `<div class="calc-calculate">
      <ol class="calc-history" data-calc-history aria-label="History">${
        state.history.length
          ? state.history.map(historyItem).join("")
          : `<li class="calc-empty">Type an expression and press Enter. Examples: <code>2(3 + 4)</code>, <code>sin(π/6)</code>, <code>log(8, 2)</code>, <code>solve(x² = 2, x, 1)</code>.</li>`
      }</ol>
      <p class="calc-error" data-calc-error role="alert"></p>
      <div class="calc-entry">
        <label class="visually-hidden" for="${inputId}">Expression</label>
        <input id="${inputId}" class="calc-input" type="text" data-math-input data-calc-input autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="go" placeholder="Expression">
        <button type="button" class="btn calc-go" data-calc-action="evaluate">Enter</button>
      </div>
      <details class="calc-memory"><summary>Variables and functions</summary><div data-calc-memory>${memoryList()}</div></details>
      ${renderMathKeyboard("calculator", { target: inputId })}
    </div>`;
  }

  function graphBlock() {
    const points = [];
    for (const result of analysis.results)
      if (Number.isFinite(result.x) && Number.isFinite(result.y))
        points.push({
          at: [result.x, result.y],
          label: `(${formatNumber(result.x, { digits: 5 })}, ${formatNumber(result.y, { digits: 5 })})`,
        });
    const data = parseData(state.stats.data);
    if (data.ys.length) data.xs.forEach((x, i) => points.push({ at: [x, data.ys[i]] }));
    const visible = state.slots
      .map((slot, i) => ({ slot, i }))
      .filter(({ slot }) => slot.visible && slot.expr.trim());
    const w = state.window;
    const inside = (p) =>
      p.at[0] >= w.x[0] && p.at[0] <= w.x[1] && p.at[1] >= w.y[0] && p.at[1] <= w.y[1];
    return {
      type: "graph",
      caption: visible.length
        ? visible.map(({ slot, i }) => `y${i + 1} = ${slot.expr}`).join(";  ")
        : "Enter a function to graph it",
      alt: visible.length
        ? `Graph of ${visible.map(({ slot, i }) => `y${i + 1} = ${slot.expr}`).join(" and ")} for x from ${w.x[0]} to ${w.x[1]}.`
        : "An empty coordinate grid.",
      window: { x: [...w.x], y: [...w.y] },
      height: compact ? 280 : 320,
      functions: visible.map(({ i }) => ({
        ref: slotRef(i),
        label: `y${i + 1}`,
        ...SLOT_STYLE[i],
      })),
      points: points.filter(inside).slice(0, 400),
    };
  }

  function slotError(slot) {
    if (!slot.expr.trim()) return "";
    try {
      engine.check(slot.expr);
      return "";
    } catch (error) {
      return error.message;
    }
  }

  function graphTab() {
    const w = state.window;
    const slotOptions = (selected) =>
      state.slots
        .map(
          (slot, i) =>
            `<option value="${i}" ${i === selected ? "selected" : ""}>y${i + 1}${slot.expr.trim() ? ` = ${esc(slot.expr)}` : " (empty)"}</option>`,
        )
        .join("");
    return `<div class="calc-graph">
      <ol class="calc-slots">${state.slots
        .map(
          (slot, i) => `<li class="calc-slot">
          <button type="button" class="calc-swatch graph-ink-${SLOT_STYLE[i].color}${SLOT_STYLE[i].dashed ? " is-dashed" : ""}${slot.visible ? "" : " is-off"}" data-calc-visible="${i}" aria-pressed="${slot.visible}" aria-label="Show y${i + 1} on the graph"></button>
          <label for="${id}-slot-${i}">y<sub>${i + 1}</sub> =</label>
          <input id="${id}-slot-${i}" class="calc-slot-input" type="text" data-math-input data-calc-slot="${i}" value="${esc(slot.expr)}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${i === 0 ? "x² − 2" : ""}" aria-describedby="${id}-slot-${i}-error">
          <span class="calc-slot-error" id="${id}-slot-${i}-error" data-calc-slot-error="${i}">${esc(slotError(slot))}</span>
        </li>`,
        )
        .join("")}</ol>
      <div class="calc-figure" data-calc-figure>${renderGraph(graphBlock(), { interactive: true })}</div>
      <fieldset class="calc-window"><legend>Window</legend>
        ${[
          ["x", 0, "x min"],
          ["x", 1, "x max"],
          ["y", 0, "y min"],
          ["y", 1, "y max"],
        ]
          .map(
            ([axis, end, label]) =>
              `<label>${label}<input type="text" inputmode="decimal" data-calc-window="${axis}${end}" value="${esc(formatNumber(w[axis][end], { digits: 6 }))}"></label>`,
          )
          .join("")}
        <div class="calc-window-actions">
          <button type="button" class="btn secondary" data-calc-zoom="standard">Standard</button>
          <button type="button" class="btn secondary" data-calc-zoom="fit">Fit y</button>
          <button type="button" class="btn secondary" data-calc-zoom="trig">Trig</button>
          <button type="button" class="btn secondary" data-calc-zoom="data">Data</button>
        </div>
      </fieldset>
      <fieldset class="calc-analyze"><legend>Analyze</legend>
        <label>Function <select data-calc-analysis="slot">${slotOptions(analysis.slot)}</select></label>
        <label>Find <select data-calc-analysis="op">${[
          ["zeros", "Zeros"],
          ["minimum", "Minimums"],
          ["maximum", "Maximums"],
          ["intersect", "Intersections with"],
          ["value", "Value at x ="],
        ]
          .map(
            ([v, l]) =>
              `<option value="${v}" ${analysis.op === v ? "selected" : ""}>${l}</option>`,
          )
          .join("")}</select></label>
        ${analysis.op === "intersect" ? `<label>Other function <select data-calc-analysis="other">${slotOptions(analysis.other)}</select></label>` : ""}
        ${analysis.op === "value" ? `<label>x = <input type="text" data-calc-analysis="at" data-math-input value="${esc(analysis.at)}" inputmode="decimal"></label>` : ""}
        <button type="button" class="btn" data-calc-action="analyze">Find</button>
        <div class="calc-analysis-results" role="status" aria-live="polite">${analysisResults()}</div>
        <p class="calc-muted">Searches the x-values in the current window.</p>
      </fieldset>
    </div>`;
  }

  function analysisResults() {
    if (analysis.message) return `<p>${esc(analysis.message)}</p>`;
    if (!analysis.results.length) return "";
    return `<ul>${analysis.results
      .map(
        (r) =>
          `<li>${esc(r.label)}: <strong>x = ${esc(formatNumber(r.x))}</strong>, y = ${esc(formatNumber(r.y))}</li>`,
      )
      .join("")}</ul>`;
  }

  function tableTab() {
    const columns = state.slots
      .map((slot, i) => ({ slot, i }))
      .filter(({ slot }) => slot.expr.trim());
    const rows = [];
    const { start, step } = state.table;
    const fns = columns.map(({ i }) => {
      try {
        return engine.compile(state.slots[i].expr);
      } catch {
        return () => NaN;
      }
    });
    for (let k = 0; k < 20; k += 1) {
      const x = Math.round((start + k * step) * 1e10) / 1e10;
      rows.push(
        `<tr><th scope="row">${esc(formatNumber(x, { digits: 8 }))}</th>${fns
          .map((f) => {
            const y = f(x);
            return `<td>${Number.isFinite(y) ? esc(formatNumber(y, { digits: 8 })) : '<span class="calc-muted">undefined</span>'}</td>`;
          })
          .join("")}</tr>`,
      );
    }
    return `<div class="calc-table">
      <div class="calc-table-controls">
        <label>Start x <input type="text" inputmode="decimal" data-calc-table="start" value="${esc(formatNumber(start, { digits: 8 }))}"></label>
        <label>Step Δx <input type="text" inputmode="decimal" data-calc-table="step" value="${esc(formatNumber(step, { digits: 8 }))}"></label>
        <button type="button" class="btn secondary" data-calc-page="-1" aria-label="Earlier rows">↑ Earlier</button>
        <button type="button" class="btn secondary" data-calc-page="1" aria-label="Later rows">↓ Later</button>
      </div>
      ${
        columns.length
          ? `<div class="table-wrap" role="region" tabindex="0" aria-label="Table of values"><table class="calc-values"><thead><tr><th scope="col">x</th>${columns
              .map(({ i }) => `<th scope="col">y${i + 1}</th>`)
              .join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`
          : `<p class="calc-muted">Enter functions on the Graph tab to see their values here.</p>`
      }
    </div>`;
  }

  function statsRows(label, values) {
    const s = oneVariable(values);
    const cells = [
      ["n", s.n],
      [`mean ${label}̄`, s.mean],
      [`Σ${label}`, s.sum],
      [`Σ${label}²`, s.sumSquares],
      [`S${label} (sample SD)`, s.sampleSD],
      [`σ${label} (population SD)`, s.populationSD],
      ["min", s.min],
      ["Q1", s.q1],
      ["median", s.median],
      ["Q3", s.q3],
      ["max", s.max],
    ];
    return `<table class="calc-stats-table"><caption>One-variable statistics for ${label} (${label === "x" ? "L1" : "L2"})</caption><tbody>${cells
      .map(
        ([name, value]) =>
          `<tr><th scope="row">${esc(name)}</th><td>${Number.isFinite(value) ? esc(formatNumber(value)) : "—"}</td></tr>`,
      )
      .join("")}</tbody></table>`;
  }

  function fitView() {
    if (!fit) return "";
    if (fit.error) return `<p class="calc-error-text" role="alert">${esc(fit.error)}</p>`;
    const r = fit.result;
    const coefficient = (name) => formatNumber(r.coefficients[name], { digits: 7 });
    const degrees = engine.settings.angle === "deg" && r.kind === "sinusoidal";
    const coefficients = Object.keys(r.coefficients)
      .map((name) => {
        let value = r.coefficients[name];
        if (degrees && name === "b") value = (value * 180) / Math.PI;
        return `<li><i>${name}</i> = ${esc(formatNumber(value, { digits: 7 }))}</li>`;
      })
      .join("");
    const equation = equationText(r, coefficient, degrees);
    return `<div class="calc-fit">
      <p class="calc-fit-equation"><strong>${esc(r.label)}:</strong> ${esc(equation)}</p>
      <ul class="calc-fit-coefficients">${coefficients}</ul>
      <p>${r.r !== undefined ? `r = ${esc(formatNumber(r.r, { digits: 6 }))}, ` : ""}r² = ${esc(formatNumber(r.r2, { digits: 6 }))}${r.transformed ? ` <span class="calc-muted">(from the linear fit of ${esc(r.transformed)}, as graphing calculators report it)</span>` : ""}</p>
      ${degrees ? '<p class="calc-muted">b is in degrees per unit of x because the calculator is in degree mode.</p>' : ""}
      <div class="calc-fit-actions">
        <label>Graph as <select data-calc-fit-slot>${state.slots
          .map(
            (slot, i) =>
              `<option value="${i}" ${i === firstEmptySlot() ? "selected" : ""}>y${i + 1}${slot.expr.trim() ? " (replace)" : ""}</option>`,
          )
          .join("")}</select></label>
        <button type="button" class="btn" data-calc-action="graph-fit">Graph with data</button>
      </div>
      <details><summary>Residuals</summary><div class="table-wrap" role="region" tabindex="0" aria-label="Residuals"><table class="calc-values"><thead><tr><th scope="col">x</th><th scope="col">y</th><th scope="col">Predicted</th><th scope="col">Residual</th></tr></thead><tbody>${fit.xs
        .map((x, i) => {
          const p = r.predict(x);
          return `<tr><th scope="row">${esc(formatNumber(x))}</th><td>${esc(formatNumber(fit.ys[i]))}</td><td>${esc(formatNumber(p, { digits: 7 }))}</td><td>${esc(formatNumber(fit.ys[i] - p, { digits: 7 }))}</td></tr>`;
        })
        .join("")}</tbody></table></div></details>
    </div>`;
  }

  function equationText(r, c, degrees) {
    const sign = (name) => {
      const v = r.coefficients[name];
      return v < 0 ? ` − ${formatNumber(-v, { digits: 7 })}` : ` + ${c(name)}`;
    };
    switch (r.kind) {
      case "linear":
        return `y = ${c("a")}${sign("b")}x`;
      case "quadratic":
        return `y = ${c("a")}${sign("b")}x${sign("c")}x²`;
      case "cubic":
        return `y = ${c("a")}${sign("b")}x${sign("c")}x²${sign("d")}x³`;
      case "quartic":
        return `y = ${c("a")}${sign("b")}x${sign("c")}x²${sign("d")}x³${sign("e")}x⁴`;
      case "exponential":
        return `y = ${c("a")}·(${c("b")})ˣ`;
      case "logarithmic":
        return `y = ${c("a")}${sign("b")}·ln(x)`;
      case "power":
        return `y = ${c("a")}·x^${c("b")}`;
      case "sinusoidal": {
        const b = degrees ? (r.coefficients.b * 180) / Math.PI : r.coefficients.b;
        return `y = ${c("a")}·sin(${formatNumber(b, { digits: 7 })}(x${sign("c")}))${sign("d")}`;
      }
      default:
        return r.form;
    }
  }

  function firstEmptySlot() {
    const index = state.slots.findIndex((slot) => !slot.expr.trim());
    return index < 0 ? SLOT_COUNT - 1 : index;
  }

  function statsTab() {
    const data = parseData(state.stats.data);
    let summary = "";
    try {
      if (data.xs.length)
        summary = `<div class="calc-stats-grid">${statsRows("x", data.xs)}${data.ys.length ? statsRows("y", data.ys) : ""}</div>`;
    } catch {
      summary = "";
    }
    return `<div class="calc-stats">
      <label for="${id}-data">Data: one point per line, as <code>x, y</code> (or one number per line for a single list). Paste two columns from a spreadsheet.</label>
      <textarea id="${id}-data" class="calc-data" rows="8" data-calc-data spellcheck="false" placeholder="1, 2.5\n2, 4.1\n3, 5.8">${esc(state.stats.data)}</textarea>
      <p class="calc-muted" data-calc-data-status>${esc(dataStatus(data))}</p>
      ${summary}
      <fieldset class="calc-regression"><legend>Regression</legend>
        <label>Model <select data-calc-model>${Object.entries(REGRESSIONS)
          .map(
            ([key, spec]) =>
              `<option value="${key}" ${state.stats.model === key ? "selected" : ""}>${esc(spec.label)} · ${esc(spec.form)}</option>`,
          )
          .join("")}</select></label>
        <button type="button" class="btn" data-calc-action="fit" ${data.ys.length ? "" : "disabled"}>Fit model</button>
        ${data.ys.length ? "" : '<p class="calc-muted">Regression needs x, y pairs.</p>'}
        <div data-calc-fit>${fitView()}</div>
      </fieldset>
    </div>`;
  }

  function dataStatus(data) {
    if (!data.xs.length)
      return "No data yet. The values are available in expressions as L1 (x) and L2 (y).";
    const lines = data.problems.filter((p) => typeof p === "number");
    const text = `${data.xs.length} ${data.ys.length ? "points" : "values"} · L1${data.ys.length ? " and L2" : ""} ready`;
    if (!data.problems.length) return text;
    return `${text}. Skipped ${lines.length ? `line${lines.length === 1 ? "" : "s"} ${lines.join(", ")}` : ""}${data.problems.some((p) => typeof p === "string") ? `${lines.length ? "; " : ""}${data.problems.find((p) => typeof p === "string")}` : ""}.`;
  }

  function tabBody() {
    if (state.tab === "graph") return graphTab();
    if (state.tab === "table") return tableTab();
    if (state.tab === "stats") return statsTab();
    return calculateTab();
  }

  // Controls are found again after a repaint by their data attribute, so focus stays
  // on the same control when its markup is replaced.
  const FOCUS_KEYS = [
    "calcTab",
    "calcAction",
    "calcSlot",
    "calcSetting",
    "calcAnalysis",
    "calcZoom",
    "calcPage",
    "calcTable",
    "calcModel",
    "calcInput",
    "calcData",
    "calcWindow",
  ];
  const attribute = (key) =>
    `data-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
  let painting = false;

  function paint({ focusInput = false } = {}) {
    if (painting) return;
    painting = true;
    try {
      paintNow(focusInput);
    } finally {
      painting = false;
    }
  }

  function paintNow(focusInput) {
    const active = root.contains(document.activeElement) ? document.activeElement : null;
    const key = active && FOCUS_KEYS.find((name) => name in active.dataset);
    const selector = key
      ? `[${attribute(key)}="${CSS.escape(active.dataset[key])}"]${key === "calcSetting" && active.type === "radio" ? `[value="${CSS.escape(active.value)}"]` : ""}`
      : null;
    syncEngine();
    const angle = engine.settings.angle === "deg" ? "DEG" : "RAD";
    root.innerHTML = `<section class="calc${compact ? " calc--compact" : ""}" aria-label="Calculator">
      <div class="calc-head">
        <div class="calc-tabs" role="tablist" aria-label="Calculator views">${TABS.map(
          ([tab, label]) =>
            `<button type="button" role="tab" class="calc-tab" aria-selected="${state.tab === tab}" data-calc-tab="${tab}">${label}</button>`,
        ).join("")}</div>
        <div class="calc-modes">
          <button type="button" class="calc-mode" data-calc-action="angle" title="Switch between radians and degrees" aria-label="Angle mode: ${angle === "DEG" ? "degrees" : "radians"}. Switch">${angle}</button>
          ${engine.settings.complex ? '<span class="calc-mode calc-mode--static" title="Complex results on">a+bi</span>' : ""}
          <button type="button" class="calc-mode" data-calc-action="settings" aria-expanded="${settingsOpen}" aria-controls="${id}-settings" aria-label="Calculator settings">⚙︎</button>
        </div>
      </div>
      ${settingsOpen ? settingsPanel() : ""}
      <div class="calc-body" role="tabpanel">${tabBody()}</div>
    </section>`;
    if (state.tab === "calculate") {
      const history = root.querySelector("[data-calc-history]");
      if (history) history.scrollTop = history.scrollHeight;
      const input = root.querySelector("[data-calc-input]");
      // On touch screens the math keys are the keyboard, so the system one stays closed.
      if (matchMedia("(pointer: coarse)").matches)
        input?.setAttribute("inputmode", "none");
      if (focusInput) input?.focus({ preventScroll: true });
    }
    if (selector && !focusInput)
      root.querySelector(selector)?.focus({ preventScroll: true });
  }

  function repaintGraph() {
    const holder = root.querySelector("[data-calc-figure]");
    if (!holder) return;
    syncEngine();
    holder.innerHTML = renderGraph(graphBlock(), { interactive: true });
  }

  // ---------- Actions ----------

  function evaluateInput() {
    const input = root.querySelector("[data-calc-input]");
    const error = root.querySelector("[data-calc-error]");
    const text = input.value.trim();
    if (!text) return;
    syncEngine();
    let entry;
    try {
      const result = engine.run(text);
      if (result.kind === "define")
        entry = {
          input: text,
          text: `${result.name}(${result.params.join(", ")}) is defined`,
        };
      else {
        const value = display(result.value);
        entry = {
          input: text,
          text: result.kind === "store" ? `${value} → ${result.name}` : value,
          value: result.kind === "store" ? undefined : value,
          exact: exactHint(result.value),
          readAs: result.readAs,
        };
      }
      error.textContent = "";
      input.value = "";
    } catch (problem) {
      if (!(problem instanceof CalcError) && !(problem instanceof Error)) throw problem;
      error.textContent = problem.message;
      entry = null;
    }
    if (entry) {
      state.history.push(entry);
      if (state.history.length > HISTORY_LIMIT) state.history.shift();
      const list = root.querySelector("[data-calc-history]");
      list.innerHTML = state.history.map(historyItem).join("");
      list.scrollTop = list.scrollHeight;
      root.querySelector("[data-calc-memory]").innerHTML = memoryList();
      announce(
        `${entry.input} equals ${entry.text}${entry.exact && state.display.exact ? `, exactly ${entry.exact}` : ""}`,
      );
      save();
    }
    recall = null;
    input.focus({ preventScroll: true });
  }

  function announce(text) {
    let live = root.querySelector("[data-calc-live]");
    if (!live) {
      live = document.createElement("p");
      live.className = "visually-hidden";
      live.setAttribute("aria-live", "polite");
      live.dataset.calcLive = "";
      root.append(live);
    }
    live.textContent = text;
  }

  function runAnalysis() {
    syncEngine();
    analysis.results = [];
    analysis.message = "";
    const slot = state.slots[analysis.slot];
    if (!slot?.expr.trim()) {
      analysis.message = `y${analysis.slot + 1} is empty.`;
      return;
    }
    let f;
    let g;
    try {
      f = engine.compile(slot.expr);
      if (analysis.op === "intersect") {
        const other = state.slots[analysis.other];
        if (!other?.expr.trim() || analysis.other === analysis.slot) {
          analysis.message = "Choose a second, different function.";
          return;
        }
        g = engine.compile(other.expr);
      }
    } catch (error) {
      analysis.message = error.message;
      return;
    }
    const [a, b] = state.window.x;
    const name = `y${analysis.slot + 1}`;
    if (analysis.op === "zeros")
      analysis.results = findZeros(f, a, b).map((p) => ({ ...p, label: "Zero" }));
    else if (analysis.op === "minimum" || analysis.op === "maximum")
      analysis.results = findExtrema(f, a, b)
        .filter((p) => p.kind === analysis.op)
        .map((p) => ({
          ...p,
          label: analysis.op === "minimum" ? "Relative minimum" : "Relative maximum",
        }));
    else if (analysis.op === "intersect")
      analysis.results = findZeros((x) => f(x) - g(x), a, b).map((p) => ({
        x: p.x,
        y: f(p.x),
        label: "Intersection",
      }));
    else {
      const x = number(analysis.at);
      if (!Number.isFinite(x)) {
        analysis.message = "Type an x-value.";
        return;
      }
      const y = f(x);
      if (!Number.isFinite(y)) {
        analysis.message = `${name}(${formatNumber(x)}) is undefined.`;
        return;
      }
      analysis.results = [{ x, y, label: `${name}(${formatNumber(x)})` }];
    }
    if (!analysis.results.length)
      analysis.message = `No ${analysis.op === "zeros" ? "zeros" : analysis.op === "intersect" ? "intersections" : `relative ${analysis.op}s`} of ${name} between x = ${formatNumber(a)} and x = ${formatNumber(b)}.`;
  }

  function zoom(kind) {
    if (kind === "standard") state.window = { x: [-10, 10], y: [-10, 10] };
    else if (kind === "trig") {
      const deg = engine.settings.angle === "deg";
      state.window = { x: deg ? [-360, 360] : [-2 * Math.PI, 2 * Math.PI], y: [-4, 4] };
    } else if (kind === "data") {
      const data = parseData(state.stats.data);
      if (!data.ys.length) return false;
      state.window = paddedWindow(data.xs, data.ys);
    } else if (kind === "fit") {
      const values = [];
      const [a, b] = state.window.x;
      state.slots.forEach((slot) => {
        if (!slot.visible || !slot.expr.trim()) return;
        try {
          const f = engine.compile(slot.expr);
          for (let k = 0; k <= 400; k += 1) {
            const y = f(a + ((b - a) * k) / 400);
            if (Number.isFinite(y)) values.push(y);
          }
        } catch {
          // An invalid slot does not change the window.
        }
      });
      if (!values.length) return false;
      // Ignore the far tails near asymptotes: use the 2nd to 98th percentiles.
      values.sort((p, q) => p - q);
      const lo = values[Math.floor(values.length * 0.02)];
      const hi = values[Math.ceil(values.length * 0.98) - 1];
      const pad = (hi - lo) * 0.1 || 1;
      state.window = { x: [a, b], y: [lo - pad, hi + pad] };
    }
    return true;
  }

  function paddedWindow(xs, ys) {
    const pad = (min, max) => {
      const span = max - min || Math.max(1, Math.abs(min));
      const step = niceStep(span * 1.2);
      return [
        Math.floor((min - span * 0.1) / step) * step,
        Math.ceil((max + span * 0.1) / step) * step,
      ];
    };
    return {
      x: pad(Math.min(...xs), Math.max(...xs)),
      y: pad(Math.min(...ys), Math.max(...ys)),
    };
  }

  function fitModel() {
    const data = parseData(state.stats.data);
    try {
      const result = regression(state.stats.model, data.xs, data.ys);
      fit = { result, xs: data.xs, ys: data.ys };
    } catch (error) {
      fit = { error: error.message };
    }
  }

  function graphFit() {
    if (!fit?.result) return;
    const slotIndex = Number(
      root.querySelector("[data-calc-fit-slot]")?.value ?? firstEmptySlot(),
    );
    let expression = fit.result.expression;
    if (fit.result.kind === "sinusoidal" && engine.settings.angle === "deg") {
      const { a, b, c, d } = fit.result.coefficients;
      const n = (v) => String(Number(v.toPrecision(15)));
      expression = `${n(a)}*sin(${n((b * 180) / Math.PI)}*(x + (${n(c)}))) + (${n(d)})`;
    }
    state.slots[slotIndex] = { expr: expression, visible: true };
    const data = parseData(state.stats.data);
    state.window = paddedWindow(data.xs, data.ys);
    state.tab = "graph";
    analysis = { ...analysis, results: [], message: "" };
    save();
    paint();
  }

  function number(text) {
    try {
      const value = engine.value(String(text));
      return typeof value === "number" ? value : NaN;
    } catch {
      return NaN;
    }
  }

  // ---------- Events ----------

  function onClick(event) {
    const target = event.target;
    const tab = target.closest("[data-calc-tab]");
    if (tab) {
      state.tab = tab.dataset.calcTab;
      save();
      paint();
      root.querySelector(`[data-calc-tab="${state.tab}"]`)?.focus();
      return;
    }
    const reuse = target.closest("[data-calc-reuse]");
    if (reuse) {
      const input = root.querySelector("[data-calc-input]");
      input.value = state.history[Number(reuse.dataset.calcReuse)]?.input || "";
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      return;
    }
    const insert = target.closest("[data-calc-insert]");
    if (insert) {
      const entry = state.history[Number(insert.dataset.calcInsert)];
      const input = root.querySelector("[data-calc-input]");
      if (entry?.value && input) {
        input.focus();
        insertText(
          input,
          entry.value.includes(" ") || entry.value.startsWith("−")
            ? `(${entry.value})`
            : entry.value,
        );
      }
      return;
    }
    const forget = target.closest("[data-calc-forget]");
    if (forget) {
      engine.forget(forget.dataset.calcForget);
      root.querySelector("[data-calc-memory]").innerHTML = memoryList();
      save();
      return;
    }
    const visible = target.closest("[data-calc-visible]");
    if (visible) {
      const slot = state.slots[Number(visible.dataset.calcVisible)];
      slot.visible = !slot.visible;
      visible.setAttribute("aria-pressed", String(slot.visible));
      visible.classList.toggle("is-off", !slot.visible);
      save();
      repaintGraph();
      return;
    }
    const zoomButton = target.closest("[data-calc-zoom]");
    if (zoomButton) {
      if (zoom(zoomButton.dataset.calcZoom)) {
        save();
        paint();
      }
      return;
    }
    const page = target.closest("[data-calc-page]");
    if (page) {
      state.table.start += Number(page.dataset.calcPage) * 20 * state.table.step;
      state.table.start = Math.round(state.table.start * 1e10) / 1e10;
      save();
      paint();
      return;
    }
    const action = target.closest("[data-calc-action]")?.dataset.calcAction;
    if (!action) return;
    if (action === "evaluate") evaluateInput();
    else if (action === "angle") {
      engine.settings.angle = engine.settings.angle === "deg" ? "rad" : "deg";
      save();
      paint({ focusInput: false });
      root.querySelector('[data-calc-action="angle"]')?.focus();
    } else if (action === "settings") {
      settingsOpen = !settingsOpen;
      paint();
      root.querySelector('[data-calc-action="settings"]')?.focus();
    } else if (action === "clear-history") {
      state.history = [];
      save();
      paint();
    } else if (action === "clear-memory") {
      engine.clearMemory();
      save();
      paint();
    } else if (action === "analyze") {
      runAnalysis();
      paint();
      root
        .querySelector(".calc-analysis-results")
        ?.scrollIntoView?.({ block: "nearest" });
    } else if (action === "fit") {
      fitModel();
      root.querySelector("[data-calc-fit]").innerHTML = fitView();
    } else if (action === "graph-fit") graphFit();
  }

  function onKeydown(event) {
    const input = event.target.closest?.("[data-calc-input]");
    if (!input) return;
    if (event.key === "Enter") {
      event.preventDefault();
      evaluateInput();
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const inputs = state.history.filter((entry) => entry.input);
      if (!inputs.length) return;
      event.preventDefault();
      if (recall === null) recall = inputs.length;
      recall = Math.max(
        0,
        Math.min(inputs.length, recall + (event.key === "ArrowUp" ? -1 : 1)),
      );
      input.value = recall === inputs.length ? "" : inputs[recall].input;
      input.setSelectionRange(input.value.length, input.value.length);
    } else if (event.key === "Escape" && input.value) {
      event.preventDefault();
      event.stopPropagation();
      input.value = "";
    }
  }

  function onInput(event) {
    const target = event.target;
    if (target.matches("[data-calc-slot]")) {
      const index = Number(target.dataset.calcSlot);
      state.slots[index].expr = target.value;
      analysis.results = [];
      syncEngine();
      const error = root.querySelector(`[data-calc-slot-error="${index}"]`);
      if (error) error.textContent = slotError(state.slots[index]);
      clearTimeout(graphTimer);
      graphTimer = setTimeout(repaintGraph, 150);
      save();
    } else if (target.matches("[data-calc-data]")) {
      state.stats.data = target.value;
      fit = null;
      const status = root.querySelector("[data-calc-data-status]");
      if (status) status.textContent = dataStatus(parseData(target.value));
      save();
    } else if (target.matches("[data-calc-analysis='at']")) {
      analysis.at = target.value;
    }
  }

  function onChange(event) {
    if (painting) return;
    const target = event.target;
    const setting = target.dataset.calcSetting;
    if (setting === "angle") engine.settings.angle = target.value;
    else if (setting === "complex") engine.settings.complex = target.checked;
    else if (setting === "exact") state.display.exact = target.checked;
    else if (setting === "decimals") state.display.decimals = target.value;
    if (setting) {
      save();
      paint();
      root.querySelector(`[data-calc-setting="${setting}"]`)?.focus();
      return;
    }
    if (target.matches("[data-calc-window]")) {
      const [axis, end] = [
        target.dataset.calcWindow[0],
        Number(target.dataset.calcWindow[1]),
      ];
      const value = number(target.value);
      const next = { x: [...state.window.x], y: [...state.window.y] };
      next[axis][end] = value;
      if (validWindow(next)) {
        state.window = next;
        save();
        repaintGraph();
      } else target.value = formatNumber(state.window[axis][end], { digits: 6 });
      return;
    }
    if (target.matches("[data-calc-table]")) {
      const value = number(target.value);
      const key = target.dataset.calcTable;
      if (Number.isFinite(value) && (key === "start" || value > 0)) {
        state.table[key] = value;
        save();
        paint();
        root.querySelector(`[data-calc-table="${key}"]`)?.focus();
      }
      return;
    }
    if (target.matches("[data-calc-analysis]")) {
      const key = target.dataset.calcAnalysis;
      if (key === "at") return;
      analysis[key] = key === "op" ? target.value : Number(target.value);
      analysis.results = [];
      analysis.message = "";
      paint();
      root.querySelector(`[data-calc-analysis="${key}"]`)?.focus();
      return;
    }
    if (target.matches("[data-calc-model]")) {
      state.stats.model = target.value;
      fit = null;
      save();
      const holder = root.querySelector("[data-calc-fit]");
      if (holder) holder.innerHTML = "";
    }
    if (target.matches("[data-calc-data]")) paint();
  }

  // Zooming or dragging the graph updates the window fields without redrawing.
  function onGraphView(event) {
    if (!validWindow(event.detail)) return;
    state.window = { x: [...event.detail.x], y: [...event.detail.y] };
    for (const field of root.querySelectorAll("[data-calc-window]")) {
      const [axis, end] = [
        field.dataset.calcWindow[0],
        Number(field.dataset.calcWindow[1]),
      ];
      field.value = formatNumber(state.window[axis][end], { digits: 6 });
    }
    save();
  }

  function onEnterKey(event) {
    if (event.target.matches?.("[data-calc-input]")) evaluateInput();
  }

  root.addEventListener("click", onClick);
  root.addEventListener("keydown", onKeydown);
  root.addEventListener("input", onInput);
  root.addEventListener("change", onChange);
  root.addEventListener("graph:view", onGraphView);
  root.addEventListener("mathkeys:enter", onEnterKey);
  paint();

  return {
    focus() {
      const field = root.querySelector(
        "[data-calc-input], [data-calc-slot], [data-calc-data]",
      );
      field?.focus({ preventScroll: true });
    },
    destroy({ save: keep = true } = {}) {
      clearTimeout(graphTimer);
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKeydown);
      root.removeEventListener("input", onInput);
      root.removeEventListener("change", onChange);
      root.removeEventListener("graph:view", onGraphView);
      root.removeEventListener("mathkeys:enter", onEnterKey);
      // Flush the last change before the calculator closes.
      clearTimeout(saveTimer);
      if (keep)
        try {
          globalThis.localStorage?.setItem(
            STORAGE_KEY,
            JSON.stringify({ ...state, engine: engine.snapshot() }),
          );
        } catch {
          // Nothing more to do.
        }
      root.innerHTML = "";
    },
  };
}

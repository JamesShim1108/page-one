// Brings interactive graph figures to life: trace a curve to read its values, zoom,
// drag to move the view, and move sliders that change the graph. Figures are drawn as
// plain HTML by render.js; one set of document listeners wakes each figure the first
// time a reader points at it or focuses it, so pages need no setup when they render.
//
// Mouse: hover traces the nearest curve, drag moves the view, double-click zooms in,
// and Ctrl + wheel (or a trackpad pinch) zooms around the pointer.
// Touch: slide a finger along the graph to trace. After zooming in, drag to move.
// Keyboard (graph focused): ← → trace, ↑ ↓ switch curves, + − zoom, 0 reset, Esc clear.

import {
  MARGIN,
  VIEW_WIDTH,
  drawGraphSvg,
  formatTick,
  graphLayout,
  graphModel,
  niceStep,
  sliderValues,
} from "./render.js";

const ZOOM_STEP = 1.5;
const MAX_ZOOM_IN = 40;
const MAX_ZOOM_OUT = 20;

export function formatValue(value) {
  return formatTick(Math.round(value * 1000) / 1000);
}

// The traceable curves in a graph: expression functions (exact) and curves drawn
// through points (read approximately, as from a printed graph).
export function traceItems(model) {
  const items = model.functions.map((fn) => ({
    label: fn.label,
    variable: fn.variable,
    approximate: false,
    ink: fn.source.color || 1,
    domain: fn.domain,
    valueAt(x) {
      if (fn.domain && (x < fn.domain[0] - 1e-9 || x > fn.domain[1] + 1e-9)) return NaN;
      return fn.f(x);
    },
  }));
  for (const curve of model.curves) {
    const points = curve.points;
    items.push({
      label: curve.label,
      variable: "x",
      approximate: true,
      ink: curve.source.color || 1,
      domain: [points[0][0], points[points.length - 1][0]],
      valueAt(x) {
        if (x < points[0][0] || x > points[points.length - 1][0]) return NaN;
        let i = 1;
        while (i < points.length - 1 && points[i][0] < x) i += 1;
        const [x0, y0] = points[i - 1];
        const [x1, y1] = points[i];
        return x1 === x0 ? y0 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
      },
    });
  }
  return items;
}

// What the readout says for a traced point, in the lesson's notation.
export function readoutText(item, x, y, hole = null) {
  const fx = formatValue(x);
  if (!Number.isFinite(y)) {
    const where = item?.label
      ? `${item.label}(${fx}) is undefined`
      : `Undefined at x = ${fx}`;
    return hole ? `${where}. The open circle marks (${hole}).` : `${where}.`;
  }
  const fy = formatValue(y);
  const sign = item?.approximate ? "≈" : "=";
  return item?.label ? `${item.label}(${fx}) ${sign} ${fy}` : `(${fx}, ${fy})`;
}

// Scales a view window by factor around a center point, within limits set by the
// authored window so a reader cannot get lost.
export function zoomWindow(view, factor, center, home) {
  const out = {};
  for (const axis of ["x", "y"]) {
    const [min, max] = view[axis];
    const homeSpan = home[axis][1] - home[axis][0];
    const span = Math.min(
      homeSpan * MAX_ZOOM_OUT,
      Math.max(homeSpan / MAX_ZOOM_IN, (max - min) * factor),
    );
    const applied = span / (max - min);
    const c = center[axis];
    out[axis] = [c - (c - min) * applied, c + (max - c) * applied];
  }
  return out;
}

const sameWindow = (a, b) =>
  ["x", "y"].every((axis) =>
    a[axis].every((value, i) => Math.abs(value - b[axis][i]) < 1e-9),
  );

function createController(figure) {
  const block = JSON.parse(figure.dataset.graph);
  const home = { x: [...block.window.x], y: [...block.window.y] };
  const traceable = block.tickLabels !== false;
  const stage = figure.querySelector(".graph-stage");
  const readout = figure.querySelector(".graph-readout");
  const resetButton = figure.querySelector('[data-graph-action="reset"]');
  const hint = readout.textContent;
  let view = { x: [...home.x], y: [...home.y] };
  let values = sliderValues(block);
  let model = graphModel(block, values);
  let items = traceItems(model);
  let trace = null; // { index, x }
  let drag = null;
  let queued = false;

  const svg = () => stage.querySelector("svg");
  const layout = () => graphLayout(block, view);

  function toPlot(clientX, clientY) {
    const rect = svg().getBoundingClientRect();
    const { xMin, xMax, yMin, yMax, plotW, plotH, height } = layout();
    const vx = ((clientX - rect.left) * VIEW_WIDTH) / rect.width;
    const vy = ((clientY - rect.top) * height) / rect.height;
    return {
      x: xMin + ((vx - MARGIN.left) / plotW) * (xMax - xMin),
      y: yMax - ((vy - MARGIN.top) / plotH) * (yMax - yMin),
      inPlot:
        vx >= MARGIN.left &&
        vx <= MARGIN.left + plotW &&
        vy >= MARGIN.top &&
        vy <= MARGIN.top + plotH,
      // Screen pixels per view unit, for distance checks.
      scaleX: (rect.width / VIEW_WIDTH) * (plotW / (xMax - xMin)),
      scaleY: (rect.height / height) * (plotH / (yMax - yMin)),
    };
  }

  // Trace positions land on round x-values, or on a marked point when one is near.
  function snapX(x, pixelsPerUnit = Infinity) {
    for (const point of model.points)
      if (Number.isFinite(point.x) && Math.abs(point.x - x) * pixelsPerUnit < 8)
        return point.x;
    const step = niceStep(view.x[1] - view.x[0]) / 10;
    return Math.round(Math.round(x / step) * step * 1e9) / 1e9;
  }

  function nearest(x, y, scaleY = 1) {
    let best = null;
    items.forEach((item, index) => {
      const value = item.valueAt(x);
      if (!Number.isFinite(value)) return;
      const distance = Math.abs(value - y) * scaleY;
      if (!best || distance < best.distance) best = { index, distance };
    });
    return best;
  }

  function holeAt(x) {
    const point = model.points.find(
      (p) => p.source.open && Math.abs(p.x - x) < 1e-9 && Number.isFinite(p.y),
    );
    return point ? `${formatValue(point.x)}, ${formatValue(point.y)}` : null;
  }

  function drawTrace() {
    const group = svg()?.querySelector(".graph-trace");
    if (!group) return;
    if (!trace || !items[trace.index]) {
      group.replaceChildren();
      readout.textContent = hint;
      figure.classList.remove("is-tracing");
      return;
    }
    const item = items[trace.index];
    const { px, py, yMin, yMax, xMin, xMax } = layout();
    const y = item.valueAt(trace.x);
    const xs = Math.round(px(trace.x) * 100) / 100;
    let markup = "";
    if (trace.x >= xMin && trace.x <= xMax)
      markup += `<line class="graph-trace-guide" x1="${xs}" x2="${xs}" y1="${MARGIN.top}" y2="${py(yMin)}"/>`;
    if (Number.isFinite(y) && y >= yMin && y <= yMax)
      markup += `<circle class="graph-trace-dot graph-ink-${item.ink}" cx="${xs}" cy="${Math.round(py(y) * 100) / 100}" r="5.5"/>`;
    group.innerHTML = markup;
    readout.textContent = readoutText(item, trace.x, y, holeAt(trace.x));
    figure.classList.add("is-tracing");
  }

  function redraw() {
    queued = false;
    const holder = document.createElement("div");
    holder.innerHTML = drawGraphSvg(block, { values, view, interactive: true });
    // Swap the drawing inside the same <svg> so keyboard focus stays put.
    svg().replaceChildren(...holder.firstElementChild.childNodes);
    const zoomed = !sameWindow(view, home);
    resetButton.disabled = !zoomed;
    figure.classList.toggle("is-zoomed", zoomed);
    drawTrace();
    figure.dispatchEvent(
      new CustomEvent("graph:view", {
        bubbles: true,
        detail: { x: [...view.x], y: [...view.y] },
      }),
    );
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(redraw);
  }

  function zoom(factor, center) {
    const c = center || {
      x: trace ? trace.x : (view.x[0] + view.x[1]) / 2,
      y: (view.y[0] + view.y[1]) / 2,
    };
    view = zoomWindow(view, factor, c, home);
    schedule();
  }

  function traceAt(clientX, clientY) {
    if (!traceable || !items.length) return;
    const point = toPlot(clientX, clientY);
    if (!point.inPlot) return;
    const x = snapX(point.x, point.scaleX);
    const hit = nearest(x, point.y, point.scaleY);
    // Keep tracing the same curve while the pointer is closest to it at this x.
    trace = { index: hit ? hit.index : (trace?.index ?? 0), x };
    drawTrace();
  }

  function setLive(on) {
    readout.setAttribute("aria-live", on ? "polite" : "off");
  }

  function step(direction, large) {
    const span = view.x[1] - view.x[0];
    const unit = (niceStep(span) / 10) * (large ? 10 : 1);
    if (!trace) {
      const middle = snapX((view.x[0] + view.x[1]) / 2);
      const index = Math.max(
        0,
        items.findIndex((item) => Number.isFinite(item.valueAt(middle))),
      );
      trace = { index, x: middle };
    } else {
      const x = Math.round((trace.x + direction * unit) * 1e9) / 1e9;
      // A piecewise function hands off to the piece whose domain holds the new x.
      const current = items[trace.index];
      if (current.domain && (x < current.domain[0] || x > current.domain[1])) {
        const next = items.findIndex(
          (item) => item.domain && x >= item.domain[0] && x <= item.domain[1],
        );
        if (next >= 0) trace.index = next;
      }
      trace.x = x;
      // The view follows a trace that walks off its edge.
      const shift =
        x < view.x[0] ? x - view.x[0] - unit : x > view.x[1] ? x - view.x[1] + unit : 0;
      if (shift) {
        view = { x: view.x.map((v) => v + shift), y: view.y };
        schedule();
        return;
      }
    }
    drawTrace();
  }

  stage.addEventListener("pointerdown", (event) => {
    if (event.button > 0) return;
    const point = toPlot(event.clientX, event.clientY);
    if (!point.inPlot) return;
    const touch = event.pointerType !== "mouse";
    const hit = traceable ? nearest(point.x, point.y, point.scaleY) : null;
    const onCurve = hit && hit.distance < (touch ? 24 : 10);
    const zoomed = figure.classList.contains("is-zoomed");
    const mode = onCurve || (touch && !zoomed) ? "trace" : "pan";
    if (mode === "trace" && !traceable) return;
    setLive(false);
    drag = {
      id: event.pointerId,
      mode,
      clientX: event.clientX,
      clientY: event.clientY,
      view: { x: [...view.x], y: [...view.y] },
      scaleX: point.scaleX,
      scaleY: point.scaleY,
    };
    stage.setPointerCapture?.(event.pointerId);
    if (mode === "trace") traceAt(event.clientX, event.clientY);
    else figure.classList.add("is-panning");
  });

  stage.addEventListener("pointermove", (event) => {
    if (drag && drag.id === event.pointerId) {
      if (drag.mode === "trace") traceAt(event.clientX, event.clientY);
      else {
        const dx = (event.clientX - drag.clientX) / drag.scaleX;
        const dy = (event.clientY - drag.clientY) / drag.scaleY;
        view = {
          x: drag.view.x.map((v) => v - dx),
          y: drag.view.y.map((v) => v + dy),
        };
        schedule();
      }
      return;
    }
    if (event.pointerType === "mouse") {
      setLive(false);
      traceAt(event.clientX, event.clientY);
    }
  });

  const endDrag = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    drag = null;
    figure.classList.remove("is-panning");
  };
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  stage.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse" && !drag) {
      trace = null;
      drawTrace();
    }
  });

  stage.addEventListener("dblclick", (event) => {
    const point = toPlot(event.clientX, event.clientY);
    if (point.inPlot) zoom(1 / ZOOM_STEP, point);
  });

  // Plain scrolling still scrolls the page; only a pinch or Ctrl + wheel zooms.
  stage.addEventListener(
    "wheel",
    (event) => {
      if (!event.ctrlKey) return;
      const point = toPlot(event.clientX, event.clientY);
      if (!point.inPlot) return;
      event.preventDefault();
      zoom(Math.exp(Math.max(-0.5, Math.min(0.5, event.deltaY * 0.01))), point);
    },
    { passive: false },
  );

  stage.addEventListener("keydown", (event) => {
    if (!event.target.closest("svg")) return;
    let handled = true;
    setLive(true);
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
        if (traceable && items.length)
          step(event.key === "ArrowLeft" ? -1 : 1, event.shiftKey);
        else handled = false;
        break;
      case "ArrowUp":
      case "ArrowDown":
        if (traceable && items.length > 1) {
          if (!trace) step(0, false);
          trace.index =
            (trace.index + (event.key === "ArrowUp" ? 1 : items.length - 1)) %
            items.length;
          drawTrace();
        } else handled = false;
        break;
      case "+":
      case "=":
        zoom(1 / ZOOM_STEP);
        break;
      case "-":
      case "_":
        zoom(ZOOM_STEP);
        break;
      case "0":
        view = { x: [...home.x], y: [...home.y] };
        schedule();
        break;
      case "Escape":
        if (trace) {
          trace = null;
          drawTrace();
        } else handled = false;
        break;
      default:
        handled = false;
    }
    if (handled) event.preventDefault();
  });

  return {
    action(name) {
      setLive(true);
      if (name === "zoom-in") zoom(1 / ZOOM_STEP);
      else if (name === "zoom-out") zoom(ZOOM_STEP);
      else if (name === "reset") {
        view = { x: [...home.x], y: [...home.y] };
        schedule();
      }
    },
    slide(name, value) {
      if (!Number.isFinite(value)) return;
      values = { ...values, [name]: value };
      model = graphModel(block, values);
      items = traceItems(model);
      const output = figure.querySelector(
        `[data-graph-slider-value="${CSS.escape(name)}"]`,
      );
      if (output) output.textContent = formatTick(value);
      schedule();
    },
  };
}

const controllers = new WeakMap();

function controllerFor(target) {
  const figure = target?.closest?.(".graph-figure--interactive");
  if (!figure) return null;
  if (!controllers.has(figure)) {
    let controller = null;
    try {
      controller = createController(figure);
    } catch (error) {
      // The still drawing remains readable if a figure cannot be brought to life.
      console.warn("An interactive graph could not start.", error);
    }
    controllers.set(figure, controller);
  }
  return controllers.get(figure);
}

let installed = false;

export function installGraphInteractions(root = document) {
  if (installed) return;
  installed = true;
  root.addEventListener("pointerover", (event) => controllerFor(event.target));
  root.addEventListener("focusin", (event) => controllerFor(event.target));
  root.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-graph-action]");
    if (button) controllerFor(button)?.action(button.dataset.graphAction);
  });
  root.addEventListener("input", (event) => {
    const input = event.target.closest?.("[data-graph-slider]");
    if (input)
      controllerFor(input)?.slide(input.dataset.graphSlider, Number(input.value));
  });
}

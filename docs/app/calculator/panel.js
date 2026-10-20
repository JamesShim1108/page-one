// The floating calculator: a launcher button on math pages and a panel that stays
// open while the reader moves between pages. On wide screens the panel can be
// dragged by its title bar; on phones it opens as a sheet from the bottom.
// Any element with data-open-calculator opens it too (the SAT math module bar does).

import { icon } from "../icons.js";

let launcher = null;
let panel = null;
let calculator = null;
let available = false;
let onCalculatorPage = false;
let returnFocus = null;

function build() {
  if (panel) return;
  launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "calc-launcher";
  launcher.dataset.openCalculator = "";
  launcher.setAttribute("aria-controls", "calc-panel");
  launcher.setAttribute("aria-expanded", "false");
  launcher.innerHTML = `${icon("calculator")}<span>Calculator</span>`;
  launcher.hidden = true;

  panel = document.createElement("section");
  panel.id = "calc-panel";
  panel.className = "calc-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-labelledby", "calc-panel-title");
  panel.hidden = true;
  panel.innerHTML = `<div class="calc-panel-bar" data-calc-drag>
      <h2 id="calc-panel-title">${icon("calculator")}Calculator</h2>
      <a class="calc-panel-link" href="#/calculator" data-calc-panel-full>Full page</a>
      <button type="button" class="calc-panel-close" data-calc-panel-close aria-label="Close calculator">×</button>
    </div>
    <div class="calc-panel-body"></div>`;
  document.body.append(launcher, panel);

  panel.addEventListener("click", (event) => {
    if (event.target.closest("[data-calc-panel-close]")) closeCalculator();
    else if (event.target.closest("[data-calc-panel-full]"))
      closeCalculator({ restoreFocus: false });
  });
  enableDragging(panel.querySelector("[data-calc-drag]"));
}

function enableDragging(bar) {
  let start = null;
  bar.addEventListener("pointerdown", (event) => {
    if (
      event.button > 0 ||
      event.target.closest("a, button") ||
      !matchMedia("(min-width: 760px)").matches
    )
      return;
    const rect = panel.getBoundingClientRect();
    start = {
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
      id: event.pointerId,
    };
    bar.setPointerCapture?.(event.pointerId);
    panel.classList.add("is-dragging");
  });
  bar.addEventListener("pointermove", (event) => {
    if (!start || event.pointerId !== start.id) return;
    const rect = panel.getBoundingClientRect();
    const left = Math.min(
      Math.max(8, start.left + event.clientX - start.x),
      window.innerWidth - rect.width - 8,
    );
    const top = Math.min(
      Math.max(8, start.top + event.clientY - start.y),
      window.innerHeight - 48,
    );
    Object.assign(panel.style, {
      left: `${left}px`,
      top: `${top}px`,
      right: "auto",
      bottom: "auto",
    });
  });
  const end = () => {
    start = null;
    panel.classList.remove("is-dragging");
  };
  bar.addEventListener("pointerup", end);
  bar.addEventListener("pointercancel", end);
}

function syncLauncher() {
  if (!launcher) return;
  launcher.hidden = !available || onCalculatorPage || !panel.hidden;
  launcher.setAttribute("aria-expanded", String(!panel.hidden));
}

export async function openCalculator() {
  if (onCalculatorPage) {
    document.querySelector("[data-calc-page] [data-calc-input]")?.focus();
    return;
  }
  build();
  returnFocus = document.activeElement;
  if (!calculator) {
    const { mountCalculator } = await import("./app.js");
    calculator = mountCalculator(panel.querySelector(".calc-panel-body"), {
      compact: true,
    });
  }
  panel.hidden = false;
  document.documentElement.classList.add("calc-open");
  syncLauncher();
  calculator.focus();
}

export function closeCalculator({ restoreFocus = true } = {}) {
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  document.documentElement.classList.remove("calc-open");
  syncLauncher();
  const target = returnFocus && document.contains(returnFocus) ? returnFocus : launcher;
  if (restoreFocus && target && !target.hidden) target.focus({ preventScroll: true });
}

// main.js calls this after each page renders.
export function setCalculatorContext({ math = false, calculatorPage = false } = {}) {
  available = math;
  onCalculatorPage = calculatorPage;
  build();
  if (calculatorPage && calculator) {
    // The full page has its own calculator; one copy at a time keeps one history.
    closeCalculator({ restoreFocus: false });
    calculator.destroy();
    calculator = null;
  }
  syncLauncher();
}

let installed = false;

export function installCalculator(root = document) {
  if (installed) return;
  installed = true;
  // Escape closes the panel when focus is in it or nowhere in particular.
  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.defaultPrevented || !panel || panel.hidden)
      return;
    const active = document.activeElement;
    if (!active || active === document.body || panel.contains(active)) {
      event.preventDefault();
      closeCalculator();
    }
  });
  root.addEventListener("click", (event) => {
    const opener = event.target.closest?.("[data-open-calculator]");
    if (!opener) return;
    event.preventDefault();
    if (panel && !panel.hidden && opener === launcher) closeCalculator();
    else openCalculator();
  });
}

// "Clear all local data" in Settings also clears the calculator.
export async function forgetCalculator() {
  if (calculator) {
    closeCalculator({ restoreFocus: false });
    calculator.destroy({ save: false });
    calculator = null;
  }
  const { clearCalculatorStorage } = await import("./app.js");
  clearCalculatorStorage();
}

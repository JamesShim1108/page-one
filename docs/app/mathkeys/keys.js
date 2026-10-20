// On-screen math keys. A key inserts text at the caret of its target field and keeps
// focus there, so the system keyboard and the math keys can be used together.
//
// Two ways to use it:
//   1. Answer fields: add data-math-input to a <textarea> or <input> and put
//      mathKeysToggle(fieldId) beside it. The toggle opens one shared dock of keys.
//   2. Embedded: renderMathKeyboard("calculator", { target: inputId }) draws keys that
//      always type into that input (the calculator uses this).

import { escapeHtml as esc } from "../ui.js";
import {
  SHORTCUT_SUMMARY,
  installAutoformat,
  setShortcutsEnabled,
  shortcutsEnabled,
} from "./autoformat.js";

// A key is [label, text to insert, caret offset from the end of the text, aria label].
// Or { action, label } for editing keys.
const k = (label, insert = label, back = 0, aria = "") => ({ label, insert, back, aria });
const act = (action, label, aria, extra = "") => ({ action, label, aria, extra });

const ANSWER_LAYOUT = [
  {
    id: "symbols",
    label: "Symbols",
    keys: [
      k("x²", "²", 0, "squared"),
      k("x³", "³", 0, "cubed"),
      k("xⁿ", "^", 0, "to the power, then type the exponent"),
      k("x⁻¹", "⁻¹", 0, "inverse, superscript negative one"),
      k("√", "√()", 1, "square root"),
      k("∛", "∛()", 1, "cube root"),
      k("π", "π", 0, "pi"),
      k("θ", "θ", 0, "theta"),
      k("≤"),
      k("≥"),
      k("≠"),
      k("≈"),
      k("±"),
      k("·", "·", 0, "times"),
      k("÷"),
      k("−", "−", 0, "minus"),
      k("∞", "∞", 0, "infinity"),
      k("→", "→", 0, "approaches"),
      k("°", "°", 0, "degrees"),
      k("Δ", "Δ", 0, "delta"),
      k("|x|", "||", 1, "absolute value"),
      k("( )", "()", 1, "parentheses"),
      k("[ ]", "[]", 1, "brackets"),
      k("∪", "∪", 0, "union"),
    ],
  },
  {
    id: "functions",
    label: "Functions",
    keys: [
      k("sin", "sin()", 1),
      k("cos", "cos()", 1),
      k("tan", "tan()", 1),
      k("sin⁻¹", "sin⁻¹()", 1, "inverse sine"),
      k("cos⁻¹", "cos⁻¹()", 1, "inverse cosine"),
      k("tan⁻¹", "tan⁻¹()", 1, "inverse tangent"),
      k("csc", "csc()", 1),
      k("sec", "sec()", 1),
      k("cot", "cot()", 1),
      k("ln", "ln()", 1, "natural log"),
      k("log", "log()", 1),
      k("logₐ", "log_()", 1, "log base, type the base after the underscore"),
      k("eˣ", "e^", 0, "e to the power"),
      k("f(x)", "f(x)"),
      k("f⁻¹(x)", "f⁻¹(x)", 0, "f inverse of x"),
      k("g(x)", "g(x)"),
      k("aₙ", "aₙ", 0, "a sub n"),
      k("Σ", "Σ", 0, "sum"),
    ],
  },
  {
    id: "scripts",
    label: "Exponents",
    keys: [
      ..."⁰¹²³⁴⁵⁶⁷⁸⁹".split("").map((c, i) => k(c, c, 0, `superscript ${i}`)),
      k("⁺", "⁺", 0, "superscript plus"),
      k("⁻", "⁻", 0, "superscript minus"),
      k("ⁿ", "ⁿ", 0, "superscript n"),
      k("ˣ", "ˣ", 0, "superscript x"),
      ..."₀₁₂₃₄₅₆₇₈₉".split("").map((c, i) => k(c, c, 0, `subscript ${i}`)),
      k("ₙ", "ₙ", 0, "subscript n"),
      k("₊", "₊", 0, "subscript plus"),
      k("₋", "₋", 0, "subscript minus"),
    ],
  },
  {
    id: "greek",
    label: "Greek",
    keys: ["α", "β", "γ", "δ", "Δ", "ε", "θ", "λ", "μ", "π", "σ", "Σ", "φ", "ω"].map(
      (c) => k(c),
    ),
  },
];

const CALCULATOR_LAYOUT = [
  {
    id: "main",
    label: "123",
    keys: [
      k("x", "x"),
      k("(", "("),
      k(")", ")"),
      k(",", ","),
      act("backspace", "⌫", "Delete"),
      k("7"),
      k("8"),
      k("9"),
      k("÷", "÷", 0, "divide"),
      k("xʸ", "^", 0, "power"),
      k("4"),
      k("5"),
      k("6"),
      k("×", "×", 0, "times"),
      k("x²", "²", 0, "squared"),
      k("1"),
      k("2"),
      k("3"),
      k("−", "−", 0, "minus"),
      k("√", "√(", 0, "square root"),
      k("0"),
      k("."),
      k("(−)", "−", 0, "negative"),
      k("+"),
      k("π", "π", 0, "pi"),
      k("Ans", "Ans", 0, "previous answer"),
      act("left", "←", "Move left"),
      act("right", "→", "Move right"),
      act("enter", "Enter", "Calculate", "wide"),
    ],
  },
  {
    id: "functions",
    label: "f(x)",
    keys: [
      k("sin", "sin("),
      k("cos", "cos("),
      k("tan", "tan("),
      k("ln", "ln(", 0, "natural log"),
      k("log", "log(", 0),
      k("sin⁻¹", "sin⁻¹(", 0, "inverse sine"),
      k("cos⁻¹", "cos⁻¹(", 0, "inverse cosine"),
      k("tan⁻¹", "tan⁻¹(", 0, "inverse tangent"),
      k("eˣ", "e^(", 0, "e to the power"),
      k("10ˣ", "10^(", 0, "ten to the power"),
      k("csc", "csc("),
      k("sec", "sec("),
      k("cot", "cot("),
      k("logₐ", "log(,)", 2, "log with a base: log(value, base)"),
      k("ⁿ√", "root(,)", 2, "nth root: root(value, n)"),
      k("|x|", "abs(", 0, "absolute value"),
      k("∛", "∛(", 0, "cube root"),
      k("x⁻¹", "⁻¹", 0, "reciprocal"),
      k("!", "!", 0, "factorial"),
      k("°", "°", 0, "degrees"),
      k("nCr", "nCr(", 0, "combinations"),
      k("nPr", "nPr(", 0, "permutations"),
      k("E", "E", 0, "times ten to the power"),
      k("%"),
      k("e", "e", 0, "e"),
    ],
  },
  {
    id: "more",
    label: "More",
    keys: [
      k("=", "=", 0, "equals, to store or define"),
      k("→", "→", 0, "store into"),
      k("f(x)=", "f(x)=", 0, "define f"),
      k("{ }", "{}", 1, "list"),
      k("i", "i", 0, "imaginary unit"),
      k("Σ", "Σ(,k,,)", 5, "summation: Σ(expression, k, start, end)"),
      k("seq", "seq(,n,,)", 5, "sequence list: seq(expression, n, start, end)"),
      k("solve", "solve(=,x,)", 5, "solve: solve(left = right, x, guess)"),
      k(
        "nDeriv",
        "nDeriv(,x,)",
        4,
        "derivative at a point: nDeriv(expression, x, value)",
      ),
      k("∫", "fnInt(,x,,)", 5, "integral: fnInt(expression, x, a, b)"),
      k("mean", "mean("),
      k("median", "median("),
      k("stdDev", "stdDev(", 0, "sample standard deviation"),
      k("min", "min("),
      k("max", "max("),
      k("roots", "polyRoots(", 0, "polynomial roots: polyRoots(coefficients)"),
      k("gcd", "gcd("),
      k("lcm", "lcm("),
      k("mod", "mod("),
      k("round", "round("),
      k("floor", "floor("),
      k("ceil", "ceil("),
      k("rand", "rand()", 0, "random number"),
      k("L1", "L1", 0, "data list 1"),
      k("L2", "L2", 0, "data list 2"),
    ],
  },
  {
    id: "letters",
    label: "abc",
    keys: [
      ..."abcdfghjklmnpqrstuvwyz".split("").map((c) => k(c)),
      k("A"),
      k("B"),
      k("C"),
      k("θ", "θ", 0, "theta"),
      act("keyboard", "⌨︎", "Use the device keyboard"),
    ],
  },
];

export const LAYOUTS = Object.freeze({
  answer: ANSWER_LAYOUT,
  calculator: CALCULATOR_LAYOUT,
});

function keyButton(key) {
  if (key.action)
    return `<button type="button" class="mathkey mathkey--action${key.extra ? ` mathkey--${key.extra}` : ""}" data-mathkeys-action="${esc(key.action)}" aria-label="${esc(key.aria)}">${esc(key.label)}</button>`;
  return `<button type="button" class="mathkey" data-mathkeys-insert="${esc(key.insert)}" data-mathkeys-back="${key.back}"${key.aria ? ` aria-label="${esc(key.aria)}"` : ""}>${esc(key.label)}</button>`;
}

let instance = 0;

export function renderMathKeyboard(layoutId, { target = "", tab = "" } = {}) {
  const layout = LAYOUTS[layoutId];
  const active = layout.find((group) => group.id === tab) || layout[0];
  const id = `mathkeys-${(instance += 1)}`;
  return `<div class="mathkeys mathkeys--${esc(layoutId)}" data-mathkeys data-mathkeys-layout="${esc(layoutId)}"${target ? ` data-mathkeys-for="${esc(target)}"` : ""}>
    <div class="mathkeys-tabs" role="tablist" aria-label="Math key groups">${layout
      .map(
        (group) =>
          `<button type="button" role="tab" class="mathkeys-tab" id="${id}-${group.id}" aria-selected="${group === active}" aria-controls="${id}-panel" data-mathkeys-tab="${esc(group.id)}">${esc(group.label)}</button>`,
      )
      .join("")}</div>
    <div class="mathkeys-grid mathkeys-grid--${esc(active.id)}" id="${id}-panel" role="tabpanel" aria-labelledby="${id}-${active.id}">${active.keys.map(keyButton).join("")}</div>
  </div>`;
}

export function mathKeysToggle(fieldId) {
  return `<button type="button" class="mathkeys-toggle" data-mathkeys-toggle="${esc(fieldId)}" aria-expanded="false" aria-controls="mathkeys-dock">∑ Math keys</button>`;
}

// ---------- Editing the target field ----------

export function insertText(field, text, back = 0) {
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? field.value.length;
  // Wrap a selection in a function: select 2x, press √, get √(2x).
  const selected = field.value.slice(start, end);
  let insert = text;
  let caretBack = back;
  if (selected && back === 1 && /[)\]|]$/.test(text)) {
    insert = text.slice(0, -1) + selected + text.slice(-1);
    caretBack = 0;
  }
  field.setRangeText(insert, start, end, "end");
  const caret = start + insert.length - caretBack;
  field.setSelectionRange(caret, caret);
  field.dispatchEvent(new Event("input", { bubbles: true }));
}

function editField(field, action) {
  const start = field.selectionStart ?? 0;
  const end = field.selectionEnd ?? 0;
  if (action === "backspace") {
    if (start !== end) field.setRangeText("", start, end, "end");
    else if (start > 0) {
      // Remove a whole function name with its parenthesis: "sin(" goes at once.
      const before = field.value.slice(0, start);
      const name = /(?:sin⁻¹|cos⁻¹|tan⁻¹|[A-Za-z]{2,})\($/.exec(before)?.[0];
      const width = name ? name.length : [...before].at(-1).length;
      field.setRangeText("", start - width, start, "end");
    }
    field.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (action === "left" || action === "right") {
    const caret = Math.max(
      0,
      Math.min(
        field.value.length,
        action === "left" ? Math.min(start, end) - 1 : Math.max(start, end) + 1,
      ),
    );
    field.setSelectionRange(caret, caret);
  } else if (action === "enter") {
    field.dispatchEvent(new CustomEvent("mathkeys:enter", { bubbles: true }));
  } else if (action === "keyboard") {
    field.removeAttribute("inputmode");
    field.blur();
    field.focus();
  }
}

// ---------- The shared dock for answer fields ----------

let dock = null;
let dockTarget = null;
let dockTab = "symbols";

function ensureDock() {
  if (dock && document.body.contains(dock)) return dock;
  dock = document.createElement("section");
  dock.id = "mathkeys-dock";
  dock.className = "mathkeys-dock";
  dock.setAttribute("aria-label", "Math keys");
  dock.hidden = true;
  document.body.append(dock);
  return dock;
}

function paintDock() {
  const on = shortcutsEnabled();
  dock.innerHTML = `<div class="mathkeys-dock-head">
      <span class="mathkeys-dock-title">Math keys</span>
      <label class="mathkeys-shortcuts"><input type="checkbox" data-mathkeys-shortcuts ${on ? "checked" : ""}> Typing shortcuts</label>
      <button type="button" class="text-button" data-mathkeys-action="close">Close</button>
    </div>
    ${renderMathKeyboard("answer", { tab: dockTab })}
    <p class="mathkeys-hint">${on ? `Shortcuts: ${SHORTCUT_SUMMARY.map(([from, to]) => `<kbd>${esc(from)}</kbd> ${esc(to)}`).join(" · ")}. Backspace right after a shortcut undoes it.` : "Typing shortcuts are off. Characters stay exactly as typed."}</p>`;
}

function setToggles(open) {
  for (const button of document.querySelectorAll("[data-mathkeys-toggle]"))
    button.setAttribute(
      "aria-expanded",
      String(open && button.dataset.mathkeysToggle === dockTarget?.id),
    );
}

function placeDock() {
  // Keep the dock above an on-screen keyboard on phones.
  const viewport = globalThis.visualViewport;
  if (!dock || !viewport) return;
  const covered = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
  dock.style.bottom = `${covered}px`;
}

export function openDock(field) {
  ensureDock();
  dockTarget = field;
  paintDock();
  dock.hidden = false;
  document.documentElement.classList.add("mathkeys-open");
  setToggles(true);
  placeDock();
}

export function closeDock() {
  if (!dock) return;
  dock.hidden = true;
  document.documentElement.classList.remove("mathkeys-open");
  setToggles(false);
}

function targetFor(element) {
  const keyboard = element.closest("[data-mathkeys]");
  const id = keyboard?.dataset.mathkeysFor;
  if (id) return document.getElementById(id);
  return dockTarget && document.contains(dockTarget) ? dockTarget : null;
}

let installed = false;

export function installMathKeys(root = document) {
  if (installed) return;
  installed = true;
  installAutoformat(root);
  globalThis.visualViewport?.addEventListener("resize", placeDock);
  globalThis.visualViewport?.addEventListener("scroll", placeDock);

  // Pressing a key must not take focus from the field (or close a phone keyboard).
  root.addEventListener("pointerdown", (event) => {
    if (
      event.target.closest?.(
        "[data-mathkeys-insert], [data-mathkeys-action]:not([data-mathkeys-action='close'])",
      )
    )
      event.preventDefault();
  });
  root.addEventListener("focusin", (event) => {
    const field = event.target;
    if (
      field?.matches?.("[data-math-input]") &&
      dock &&
      !dock.hidden &&
      !field.closest(".calc")
    ) {
      dockTarget = field;
      setToggles(true);
    }
  });
  root.addEventListener("change", (event) => {
    if (event.target.matches?.("[data-mathkeys-shortcuts]")) {
      setShortcutsEnabled(event.target.checked);
      paintDock();
      dockTarget?.focus();
    }
  });
  root.addEventListener("click", (event) => {
    const toggle = event.target.closest?.("[data-mathkeys-toggle]");
    if (toggle) {
      const field = document.getElementById(toggle.dataset.mathkeysToggle);
      if (!field) return;
      if (dock && !dock.hidden && dockTarget === field) closeDock();
      else openDock(field);
      field.focus();
      return;
    }
    const tab = event.target.closest?.("[data-mathkeys-tab]");
    if (tab) {
      const keyboard = tab.closest("[data-mathkeys]");
      const field = targetFor(tab);
      if (keyboard.closest(".mathkeys-dock")) {
        dockTab = tab.dataset.mathkeysTab;
        paintDock();
      } else {
        keyboard.outerHTML = renderMathKeyboard(keyboard.dataset.mathkeysLayout, {
          target: keyboard.dataset.mathkeysFor,
          tab: tab.dataset.mathkeysTab,
        });
      }
      field?.focus({ preventScroll: true });
      return;
    }
    const key = event.target.closest?.("[data-mathkeys-insert], [data-mathkeys-action]");
    if (!key) return;
    if (key.dataset.mathkeysAction === "close") {
      closeDock();
      dockTarget?.focus();
      return;
    }
    const field = targetFor(key);
    if (!field || field.readOnly || field.disabled) return;
    field.focus({ preventScroll: true });
    if (key.dataset.mathkeysAction) editField(field, key.dataset.mathkeysAction);
    else
      insertText(
        field,
        key.dataset.mathkeysInsert,
        Number(key.dataset.mathkeysBack) || 0,
      );
  });
  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dock && !dock.hidden && event.target === dockTarget)
      closeDock();
  });
}

// Pages call this when they repaint so a dock aimed at a removed field closes.
export function refreshMathKeys() {
  if (dock && !dock.hidden && (!dockTarget || !document.contains(dockTarget))) {
    const replacement = dockTarget?.id ? document.getElementById(dockTarget.id) : null;
    if (replacement) {
      dockTarget = replacement;
      setToggles(true);
    } else closeDock();
  }
}

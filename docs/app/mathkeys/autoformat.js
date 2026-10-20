// Typing shortcuts for math answer fields. They run only on fields marked
// data-math-input, and Backspace right after a shortcut puts back what was typed.
//
//   x^2 → x²    x^-1 → x⁻¹    x^n → xⁿ    <= → ≤    >= → ≥    != → ≠    +- → ±
//   -> → →      ~= → ≈       pi → π      theta → θ  sqrt( → √(  cbrt( → ∛(  inf → ∞

const SUPER = {
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
  "+": "⁺",
  "-": "⁻",
  "−": "⁻",
  n: "ⁿ",
  x: "ˣ",
};
const SUPER_DIGITS = new Set(["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹", "⁻"]);
const PAIRS = [
  ["<=", "≤"],
  [">=", "≥"],
  ["!=", "≠"],
  ["+-", "±"],
  ["->", "→"],
  ["~=", "≈"],
];
// Whole words, replaced when the next character ends the word.
const WORDS = { pi: "π", theta: "θ", inf: "∞" };
// Function words, replaced as soon as their opening parenthesis is typed.
const OPENERS = { sqrt: "√", cbrt: "∛" };

export const SHORTCUT_SUMMARY = [
  ["^2", "²"],
  ["^-1", "⁻¹"],
  ["<=", "≤"],
  [">=", "≥"],
  ["!=", "≠"],
  ["+-", "±"],
  ["->", "→"],
  ["pi", "π"],
  ["theta", "θ"],
  ["sqrt(", "√("],
];

const isWordChar = (ch) => /[A-Za-z0-9_]/.test(ch || "");

// Looks at the text just before the caret after one typed character. Returns the
// replacement, or null when nothing should change.
export function shortcutAt(text, caret) {
  const before = text.slice(0, caret);
  const typed = before.slice(-1);
  if (!typed) return null;

  // x^2 → x²; the caret must follow "^" and one exponent character.
  if (before.length >= 2 && before.at(-2) === "^" && SUPER[typed]) {
    return { start: caret - 2, end: caret, insert: SUPER[typed] };
  }
  // x¹ then 0 → x¹⁰: digits keep going while the exponent is a run of superscripts.
  if (/[0-9]/.test(typed) && SUPER_DIGITS.has(before.at(-2)) && before.length >= 3) {
    // Only continue an exponent, not a superscript that stands alone.
    let k = before.length - 2;
    while (k > 0 && SUPER_DIGITS.has(before[k - 1])) k -= 1;
    if (k > 0 && !/\s/.test(before[k - 1]))
      return { start: caret - 1, end: caret, insert: SUPER[typed] };
  }
  for (const [pair, symbol] of PAIRS)
    if (before.endsWith(pair))
      return { start: caret - pair.length, end: caret, insert: symbol };

  if (typed === "(") {
    for (const [word, symbol] of Object.entries(OPENERS)) {
      const start = caret - word.length - 1;
      if (before.endsWith(`${word}(`) && !isWordChar(before[start - 1]))
        return { start, end: caret, insert: `${symbol}(` };
    }
  }
  if (!isWordChar(typed)) {
    for (const [word, symbol] of Object.entries(WORDS)) {
      const start = caret - word.length - 1;
      if (
        before.slice(start, caret - 1) === word &&
        start >= 0 &&
        !/[A-Za-z_]/.test(before[start - 1] || "")
      )
        return { start, end: caret - 1, insert: symbol };
    }
  }
  return null;
}

const STORAGE_KEY = "page-one-math-shortcuts";

export function shortcutsEnabled() {
  try {
    return globalThis.localStorage?.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setShortcutsEnabled(on) {
  try {
    if (on) globalThis.localStorage?.removeItem(STORAGE_KEY);
    else globalThis.localStorage?.setItem(STORAGE_KEY, "off");
  } catch {
    // The choice still applies for this page.
  }
  enabledOverride = on;
}

let enabledOverride = null;
let lastChange = null;

const notify = (field) =>
  field.dispatchEvent(new Event("input", { bubbles: true, cancelable: false }));

export function installAutoformat(root = document) {
  root.addEventListener("input", (event) => {
    const field = event.target;
    if (!field?.matches?.("[data-math-input]") || event.isComposing) return;
    if (event.inputType !== "insertText" || !event.data || event.data.length !== 1) {
      if (event.inputType) lastChange = null;
      return;
    }
    if (!(enabledOverride ?? shortcutsEnabled())) return;
    if (field.selectionStart !== field.selectionEnd) return;
    const caret = field.selectionStart;
    const change = shortcutAt(field.value, caret);
    if (!change) {
      lastChange = null;
      return;
    }
    const original = field.value.slice(change.start, change.end);
    field.setRangeText(change.insert, change.start, change.end, "end");
    const shift = change.insert.length - (change.end - change.start);
    const newCaret = caret + shift;
    field.setSelectionRange(newCaret, newCaret);
    lastChange = {
      field,
      start: change.start,
      insert: change.insert,
      original,
      caret: newCaret,
      tail: field.value.slice(change.start + change.insert.length, newCaret),
    };
    notify(field);
  });
  root.addEventListener("keydown", (event) => {
    if (!lastChange) return;
    const { field } = lastChange;
    if (event.target !== field) {
      lastChange = null;
      return;
    }
    if (
      event.key === "Backspace" &&
      field.selectionStart === lastChange.caret &&
      field.selectionEnd === lastChange.caret &&
      field.value.slice(lastChange.start, lastChange.caret) ===
        lastChange.insert + lastChange.tail
    ) {
      event.preventDefault();
      // Put back exactly what was typed, minus nothing: Backspace undoes the shortcut.
      field.setRangeText(
        lastChange.original + lastChange.tail,
        lastChange.start,
        lastChange.caret,
        "end",
      );
      lastChange = null;
      notify(field);
      return;
    }
    if (!["Shift", "Control", "Alt", "Meta"].includes(event.key)) lastChange = null;
  });
}

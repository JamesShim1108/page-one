// Constructors for the parts of a typed-answer problem. A template's make() returns
// problem({ stem, parts, solution }); the builder turns that into one variant.
//
//   problem({
//     stem: "Let f(x) = √(x − 3). Find the domain of f.",
//     parts: [ask.interval("Domain", "[3, ∞)")],
//     solution: ["The radicand must be at least 0, so x − 3 ≥ 0.", "x ≥ 3, so the domain is [3, ∞)."],
//   })
//
// Several parts:
//   parts: [part("Find f(2).", ask.number("f(2) =", 7)), part("Solve f(x) = 0.", ask.set("x =", [1, 3]))]

import { Q } from "./rat.js";

function asKey(key) {
  if (key instanceof Q) return key.isInteger ? key.n : key.toString();
  return key;
}

// Every ask.* takes (label, key, options). Options are the grader's options for that
// type, plus `unit` (text shown after the box) and `text` (how the answer is shown
// when the key is not already readable).
export const ask = {
  // A number or exact value such as "√3/2" or 3/4. decimals: n accepts a rounded value.
  number: (label, key, o = {}) => ({ type: "number", label, key: asKey(key), ...o }),
  // A limit: a number, "∞", "−∞", or "DNE".
  limit: (label, key, o = {}) => ({ type: "limit", label, key: asKey(key), ...o }),
  // An expression such as "x² − 4". form: "factored" | "expanded" | "any".
  expr: (label, key, o = {}) => ({ type: "expr", label, key: String(key), ...o }),
  // Interval or inequality notation, such as "(−∞, 4]".
  interval: (label, key, o = {}) => ({ type: "interval", label, key: String(key), ...o }),
  // A list of numbers in any order. complex: true allows a + bi. empty: true if none.
  set: (label, keys, o = {}) => ({
    type: "set",
    label,
    key: keys.map((k) => String(asKey(k))),
    ...o,
  }),
  // Ordered pairs in any order.
  points: (label, pairs, o = {}) => ({
    type: "points",
    label,
    key: pairs.map(([x, y]) => [asKey(x), asKey(y)]),
    ...o,
  }),
  // Equations in any order, such as ["x = 3", "y = 2"].
  equations: (label, keys, o = {}) => ({ type: "equations", label, key: keys, ...o }),
  // One of a short list of words, chosen with buttons.
  choice: (label, options, key, o = {}) => ({
    type: "choice",
    label,
    options,
    key,
    ...o,
  }),
};

export const part = (prompt, ...fields) => ({ prompt, fields });

// A random draw that cannot make a good problem. The builder simply tries the next seed.
// It is recognized by name, so it still works when two copies of the kit are loaded.
export class Reject extends Error {
  constructor(message) {
    super(message);
    this.name = "Reject";
  }
}
export const reject = (why = "") => {
  throw new Reject(why);
};

const LETTERS = "abcdefghij";

// Gives every part and field its id and drops anything unset.
export function problem({ stem, parts, blocks, solution, data }) {
  if (!Array.isArray(parts) || !parts.length) throw new Error("problem needs parts");
  const numbered = parts.map((entry, index) => {
    const base = entry.type ? { fields: [entry] } : entry;
    const id = LETTERS[index];
    const out = { id };
    if (base.prompt) out.prompt = base.prompt;
    out.fields = base.fields.map((field, slot) => ({ id: `${id}${slot + 1}`, ...field }));
    return out;
  });
  const out = { stem, parts: numbered, solution };
  if (blocks?.length) out.stimulusBlocks = blocks;
  if (data !== undefined) out.data = data;
  return out;
}

// Graph and table blocks for stimuli.
export const table = (caption, columns, rows) => ({
  type: "table",
  caption,
  columns,
  rows,
});
export const graph = (spec) => ({ type: "graph", interactive: false, ...spec });

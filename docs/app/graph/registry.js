// Functions computed outside graph blocks (the calculator's y1–y6) are registered
// here under a name, and a graph block draws them with { ref: "name" } in place of
// an expression. Authored content always uses expressions.
const functions = new Map();

export function registerGraphFunction(ref, f) {
  functions.set(ref, f);
}

export function graphFunction(ref) {
  return functions.get(ref) || (() => NaN);
}

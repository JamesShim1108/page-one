// Rational functions described by their zeros: lead·Π(x − r)^m over Π(x − r)^n.
// A spec is { lead, top: [[root, multiplicity], ...], bottom: [[root, multiplicity], ...] }.
// Templates use it to write the function, expand it, and compute its asymptotes and
// one-sided limits exactly, so the key never depends on a student-facing formula.

import { Poly } from "./poly.js";
import { factorText, polyText, ratio, sup } from "./fmt.js";
import { lead as leadText } from "./shapes.js";

// (x − 2)²(x + 5): a product of factors, each with its power.
export const factorsText = (list) =>
  list.map(([root, mult]) => `${factorText(root)}${mult > 1 ? sup(mult) : ""}`).join("");

// r(x) written factored, with the leading constant in front of the numerator.
export const factoredRational = (spec) =>
  ratio(`${leadText(spec.lead)}${factorsText(spec.top)}`, factorsText(spec.bottom));

// Coefficients from the highest power down.
export function expandList(leadValue, list) {
  const roots = list.flatMap(([root, mult]) => Array(mult).fill(root));
  return Poly.fromRoots(leadValue, roots)
    .c.map((q) => q.value)
    .reverse();
}

// r(x) with both polynomials multiplied out.
export const expandedRational = (spec) =>
  ratio(polyText(expandList(spec.lead, spec.top)), polyText(expandList(1, spec.bottom)));

// [[root, mult], ...] sorted by root; mult is a function of the root.
export const byRoot = (roots, mult = () => 1) =>
  [...roots].sort((a, b) => a - b).map((root) => [root, mult(root)]);

export const multiplicityAt = (list, root) => {
  const entry = list.find(([value]) => value === root);
  return entry ? entry[1] : 0;
};

// Real zeros of the denominator whose multiplicity beats the numerator's.
export const verticalAsymptotes = (spec) =>
  spec.bottom
    .filter(([root, mult]) => mult > multiplicityAt(spec.top, root))
    .map(([root]) => root);

// The sign of the rest of the expression at x = root, once the factor of that root
// has been set aside.
function restSign(spec, root) {
  let sign = Math.sign(spec.lead);
  for (const [value, mult] of spec.top)
    if (value !== root && root < value && mult % 2 === 1) sign = -sign;
  for (const [value, mult] of spec.bottom)
    if (value !== root && root < value && mult % 2 === 1) sign = -sign;
  return sign;
}

// Limits from the left and the right at a vertical asymptote: +1 for ∞, −1 for −∞.
export function oneSidedAt(spec, root) {
  const excess = multiplicityAt(spec.bottom, root) - multiplicityAt(spec.top, root);
  if (excess <= 0) throw new Error(`x = ${root} is not a vertical asymptote`);
  const rest = restSign(spec, root);
  return { right: rest, left: excess % 2 === 0 ? rest : -rest, excess };
}

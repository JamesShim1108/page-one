// Sign analysis for a rational function written as lead·Π(x − r)^m over Π(x − r)^m.
// Used to build the key for "where is r(x) > 0" questions and to explain it step by step.

import { ivl, unionText, num, andList } from "./fmt.js";
import { reject } from "./build.js";

const sameRoot = (a, b) => Math.abs(a - b) < 1e-9;

// The sign of the function at a point that is not a root or a pole.
function signAt(spec, x) {
  let sign = Math.sign(spec.lead);
  for (const [root, mult] of spec.top) if (x < root && mult % 2 === 1) sign = -sign;
  for (const [root, mult] of spec.bottom) if (x < root && mult % 2 === 1) sign = -sign;
  return sign;
}

// The open regions between the critical values, each with its sign.
export function signRegions(spec) {
  const points = [...new Set([...spec.top, ...spec.bottom].map(([root]) => root))].sort(
    (a, b) => a - b,
  );
  const bounds = [-Infinity, ...points, Infinity];
  const regions = [];
  for (let i = 0; i < bounds.length - 1; i += 1) {
    const lo = bounds[i];
    const hi = bounds[i + 1];
    const probe =
      Number.isFinite(lo) && Number.isFinite(hi)
        ? (lo + hi) / 2
        : Number.isFinite(lo)
          ? lo + 1
          : hi - 1;
    regions.push({ lo, hi, sign: signAt(spec, probe), probe });
  }
  return { points, regions };
}

// The solution set of f(x) > 0, f(x) ≥ 0, f(x) < 0, or f(x) ≤ 0, as interval text.
// A draw whose answer would include an isolated point is rejected.
export function signSolution(spec, relation) {
  const { points, regions } = signRegions(spec);
  const want = relation === ">" || relation === "≥" ? 1 : -1;
  const withEquals = relation === "≥" || relation === "≤";
  const pieces = regions
    .filter((region) => region.sign === want)
    .map(({ lo, hi }) => ({ lo, hi, loClosed: false, hiClosed: false }));
  if (withEquals) {
    const poles = new Set(spec.bottom.map(([root]) => root));
    for (const [root] of spec.top)
      if (![...poles].some((pole) => sameRoot(pole, root)))
        pieces.push({ lo: root, hi: root, loClosed: true, hiClosed: true });
  }
  pieces.sort((a, b) => a.lo - b.lo || a.hi - b.hi);
  const merged = [];
  for (const piece of pieces) {
    const last = merged[merged.length - 1];
    if (
      last &&
      last.hi >= piece.lo &&
      (last.hi > piece.lo || last.hiClosed || piece.loClosed)
    ) {
      if (piece.hi > last.hi || (piece.hi === last.hi && piece.hiClosed)) {
        last.hi = piece.hi;
        last.hiClosed = piece.hiClosed;
      }
    } else merged.push({ ...piece });
  }
  if (merged.some((piece) => piece.lo === piece.hi))
    reject("an isolated point in the answer");
  if (!merged.length) reject("empty solution set");
  const text = unionText(
    ...merged.map((piece) => ivl(piece.lo, piece.hi, piece.loClosed, piece.hiClosed)),
  );
  return { text, merged, regions, points };
}

// "positive on (−∞, −2) and (3, ∞), negative on (−2, 3)".
export function regionsText(regions) {
  const group = (sign) =>
    andList(
      regions.filter((region) => region.sign === sign).map(({ lo, hi }) => ivl(lo, hi)),
    );
  const positive = group(1);
  const negative = group(-1);
  return [positive && `positive on ${positive}`, negative && `negative on ${negative}`]
    .filter(Boolean)
    .join(", ");
}

// The critical values in words: "−2, 1, and 4".
export const criticalText = (points) =>
  points.length === 1
    ? num(points[0])
    : points.length === 2
      ? `${num(points[0])} and ${num(points[1])}`
      : `${points.slice(0, -1).map(num).join(", ")}, and ${num(points[points.length - 1])}`;

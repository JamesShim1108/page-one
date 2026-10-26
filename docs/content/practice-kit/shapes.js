// Shared building blocks for problem templates: a leading coefficient written in front
// of a symbol, and graphs made of straight segments with whole-number corners.

import { graph } from "./build.js";
import { reject } from "./build.js";
import { num } from "./fmt.js";

// A leading coefficient as it appears in front of a symbol: "", "−", or 3.
export const lead = (a) => (a === 1 ? "" : a === -1 ? "−" : num(a));

// "(−3)" for a negative number, "3" otherwise, for use inside a subtraction.
export const inParens = (value) => (value < 0 ? `(${num(value)})` : num(value));

// Five corners joined by straight segments, alternating up and down, so the intervals
// of increase and decrease can be read off exactly.
export function zigzag(r) {
  const xs = [r.int(-7, -6)];
  for (let i = 0; i < 4; i += 1) xs.push(xs[i] + r.int(2, 3));
  if (xs[4] > 7) reject("runs off the grid");
  const startsUp = r.chance();
  const ys = [r.int(-5, 5)];
  for (let i = 0; i < 4; i += 1) {
    const up = (i % 2 === 0) === startsUp;
    ys.push(ys[i] + (up ? 1 : -1) * r.int(2, 6));
  }
  if (ys.some((y) => Math.abs(y) > 8)) reject("outside the window");
  return { xs, ys, startsUp };
}

// A graph of straight segments through the given corners, drawn with filled dots.
export const cornerGraph = (xs, ys, caption, extra = {}) =>
  graph({
    caption,
    alt: `A graph made of straight segments joining the points ${xs
      .map((x, i) => `(${num(x)}, ${num(ys[i])})`)
      .join(", ")}.`,
    window: { x: [-8, 8], y: [-10, 10] },
    ticks: { x: 1, y: 2 },
    segments: xs
      .slice(0, -1)
      .map((x, i) => ({ from: [x, ys[i]], to: [xs[i + 1], ys[i + 1]] })),
    points: xs.map((x, i) => ({ at: [x, ys[i]] })),
    ...extra,
  });

// "+ 2" or "− 2" in front of a bracket, with the 1 left out: signedLead(-1) is "−".
export const signedLead = (a) =>
  `${a < 0 ? "−" : "+"} ${Math.abs(a) === 1 ? "" : Math.abs(a)}`;

// The smallest "nice" number at or above a size: 1, 2, 5, 10, 20, 50, 100, and so on.
export function niceCeil(value) {
  const steps = [1, 2, 5, 10];
  let scale = 1;
  while (value / scale > 10) scale *= 10;
  while (value / scale < 1) scale /= 10;
  return scale * steps.find((step) => step * scale >= value - 1e-9);
}

// "∞" or "−∞" for a sign.
export const infinity = (sign) => (sign > 0 ? "∞" : "−∞");

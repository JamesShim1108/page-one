// Typed-answer problems for Topic 3.4. Sine is the y-coordinate and cosine is the
// x-coordinate of a point moving around the unit circle. Every value and every count
// is recomputed from Math.sin and Math.cos in verify().

import {
  ask,
  part,
  problem,
  graph,
  Q,
  piText,
  radians,
  reduce,
  exact,
  sinExact,
  cosExact,
  anglesWith,
  signIntervals,
  piTicks,
  terminalRay,
  OFF_AXIS,
  SPECIAL,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const EPS = 1e-9;
const half = (k) => new Q(k, 2); // kπ/2
const f = (fn, angle) => Math[fn](radians(angle));
const trendWord = (rising) => (rising ? "increasing" : "decreasing");
const SIGN = (v) => (v > 0 ? "positive" : "negative");
const WORD = { sin: "y-coordinate", cos: "x-coordinate" };

// Whether fn rises, falls, or turns around on lo·π < θ < hi·π (lo and hi are Q).
function direction(fn, lo, hi) {
  const steps = 64;
  let up = 0;
  let down = 0;
  const a = radians(lo);
  const b = radians(hi);
  for (let i = 0; i < steps; i++) {
    const d =
      Math[fn](a + ((i + 1) * (b - a)) / steps) - Math[fn](a + (i * (b - a)) / steps);
    if (d > 1e-12) up++;
    else if (d < -1e-12) down++;
  }
  if (up && !down) return "increasing";
  if (down && !up) return "decreasing";
  return "neither";
}

// The sentence that explains the direction using the point P on the unit circle.
function trendReason(fn, lo, hi) {
  const dir = direction(fn, lo, hi);
  const coordinate = WORD[fn];
  const where =
    fn === "sin"
      ? ["up", "down", "highest", "lowest"]
      : ["to the right", "to the left", "rightmost", "leftmost"];
  if (dir === "neither") {
    const turn = turning(fn, lo, hi);
    return `Inside the interval, P reaches its ${f(fn, turn) > 0 ? where[2] : where[3]} point at θ = ${piText(turn)}, so the ${coordinate} stops ${f(fn, turn) > 0 ? "rising" : "falling"} and starts to ${f(fn, turn) > 0 ? "fall" : "rise"}. ${fn} θ is neither increasing nor decreasing on the whole interval.`;
  }
  return `On this interval P moves ${dir === "increasing" ? where[0] : where[1]} along the circle, so its ${coordinate}, ${fn} θ, is ${dir}.`;
}

// The angle strictly inside (lo, hi) where fn reaches 1 or −1.
function turning(fn, lo, hi) {
  const found = [...anglesWith(fn, 1, -4, 8), ...anglesWith(fn, -1, -4, 8)].find(
    (q) => radians(q) > radians(lo) + EPS && radians(q) < radians(hi) - EPS,
  );
  if (!found) throw new Error("no turning point");
  return found;
}

const LINE_VALUES = [
  { text: "1", value: 1 },
  { text: "−1", value: -1 },
  { text: "1/2", value: 0.5 },
  { text: "−1/2", value: -0.5 },
  { text: "√2/2", value: Math.SQRT2 / 2 },
  { text: "−√2/2", value: -Math.SQRT2 / 2 },
  { text: "√3/2", value: Math.sqrt(3) / 2 },
  { text: "−√3/2", value: -Math.sqrt(3) / 2 },
];
const WINDOWS = [
  [0, 2],
  [-2, 2],
  [-1, 1],
  [0, 4],
  [-1, 2],
  [-2, 0],
];
const SOLVE_WINDOWS = [
  [0, 2],
  [-2, 2],
  [0, 4],
  [-1, 1],
  [-2, 0],
  [1, 3],
];
const range = ([lo, hi]) => `${piText(new Q(lo))} ≤ θ ≤ ${piText(new Q(hi))}`;
const closedAngles = (fn, value, [lo, hi]) => anglesWith(fn, value, lo, hi + EPS);

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "sine-function",
    skill: "identify-information",
    make(r) {
      const k1 = r.pick([-9, -7, -6, -5, -3, -2, 3, 5, 6, 7, 9, 11]);
      let k2 = r.pick([-9, -7, -6, -5, -3, -2, 3, 5, 6, 7, 9, 11]);
      if (k2 === k1) k2 += 2;
      const fnCount = r.pick(["sin", "cos"]);
      const target = r.pick([
        { text: "1", value: 1 },
        { text: "−1", value: -1 },
        { text: "0", value: 0 },
      ]);
      const count = closedAngles(fnCount, target.value, [0, 2]).length;
      return problem({
        stem: "Use the unit circle. When the terminal ray of θ meets the circle at P, sin θ is the y-coordinate of P and cos θ is its x-coordinate.",
        parts: [
          part(
            `Find sin(${piText(half(k1))}).`,
            ask.number(`sin(${piText(half(k1))}) =`, sinExact(half(k1)).text),
          ),
          part(
            `Find cos(${piText(half(k2))}).`,
            ask.number(`cos(${piText(half(k2))}) =`, cosExact(half(k2)).text),
          ),
          part(
            `How many angles θ with 0 ≤ θ ≤ 2π satisfy ${fnCount} θ = ${target.text}?`,
            ask.number("Count:", count),
          ),
        ],
        solution: [
          `${terminalRay(half(k1))} meets the circle at (${cosExact(half(k1)).text}, ${sinExact(half(k1)).text}). The y-coordinate gives sin(${piText(half(k1))}) = ${sinExact(half(k1)).text}.`,
          `${terminalRay(half(k2))} meets the circle at (${cosExact(half(k2)).text}, ${sinExact(half(k2)).text}). The x-coordinate gives cos(${piText(half(k2))}) = ${cosExact(half(k2)).text}.`,
          `${fnCount} θ = ${target.text} when θ = ${closedAngles(fnCount, target.value, [0, 2]).map(piText).join(", ")} in this interval, which is ${count} ${count === 1 ? "angle" : "angles"}.`,
        ],
        data: { k1, k2, fnCount, target, count },
      });
    },
    verify({ data: { k1, k2, fnCount, target, count } }) {
      assertNear(sinExact(half(k1)).value, Math.sin((k1 * Math.PI) / 2), "sin");
      assertNear(cosExact(half(k2)).value, Math.cos((k2 * Math.PI) / 2), "cos");
      let seen = 0;
      for (let i = 0; i <= 2000; i++) {
        const t = (i * 2 * Math.PI) / 2000;
        if (Math.abs(Math[fnCount](t) - target.value) < 1e-9) seen++;
      }
      // The 2000-point grid lands exactly on every multiple of π/2, so it finds the same angles.
      assert(seen === count, `count ${count} but the grid finds ${seen}`);
      assert(count >= 1, "count");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "cosine-function",
    skill: "describe",
    make(r) {
      const ks = r.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7], 3);
      const fns = [
        r.pick(["sin", "cos"]),
        r.pick(["sin", "cos"]),
        r.pick(["sin", "cos"]),
      ];
      const span = (k) => `from ${piText(half(k))} to ${piText(half(k + 1))}`;
      const rises = ks.map((k, i) => f(fns[i], half(k + 1)) > f(fns[i], half(k)));
      const change = exact(fns[2], half(ks[2] + 1)).coefficient.sub(
        exact(fns[2], half(ks[2])).coefficient,
      );
      return problem({
        stem: "Think about the point P where the terminal ray of θ meets the unit circle as θ increases. The sine of θ is the y-coordinate of P, and the cosine of θ is its x-coordinate.",
        parts: [
          part(
            `As θ increases ${span(ks[0])}, is ${fns[0]} θ increasing or decreasing?`,
            ask.choice(
              `${fns[0]} θ is`,
              ["increasing", "decreasing"],
              trendWord(rises[0]),
            ),
          ),
          part(
            `As θ increases ${span(ks[1])}, is ${fns[1]} θ increasing or decreasing?`,
            ask.choice(
              `${fns[1]} θ is`,
              ["increasing", "decreasing"],
              trendWord(rises[1]),
            ),
          ),
          part(
            `By how much does ${fns[2]} θ change as θ increases ${span(ks[2])}?`,
            ask.number("Change:", change),
          ),
        ],
        solution: ks
          .slice(0, 2)
          .map(
            (k, i) =>
              `P moves from ${pointText(half(k))} to ${pointText(half(k + 1))}, so its ${WORD[fns[i]]} ${rises[i] ? "rises" : "falls"} and ${fns[i]} θ is ${trendWord(rises[i])}.`,
          )
          .concat([
            `${fns[2]}(${piText(half(ks[2]))}) = ${exact(fns[2], half(ks[2])).text} and ${fns[2]}(${piText(half(ks[2] + 1))}) = ${exact(fns[2], half(ks[2] + 1)).text}. The change is ${exact(fns[2], half(ks[2] + 1)).text} − (${exact(fns[2], half(ks[2])).text}) = ${change.toString()}.`,
          ]),
        data: { ks, fns, rises, change },
      });
    },
    verify({ data: { ks, fns, rises, change } }) {
      ks.slice(0, 2).forEach((k, i) => {
        const mid = (k + 0.5) * (Math.PI / 2);
        const slope = fns[i] === "sin" ? Math.cos(mid) : -Math.sin(mid);
        assert(slope > 0 === rises[i], "direction");
      });
      assertNear(
        f(fns[2], half(ks[2] + 1)) - f(fns[2], half(ks[2])),
        change.n / change.d,
        "change",
      );
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "sine-function",
    skill: "construct-representations",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const k = r.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
      const at = half(k);
      const y = exact(fn, at);
      return problem({
        stem: "The graph of a function f is shown. It is either f(θ) = sin θ or f(θ) = cos θ.",
        blocks: [
          graph({
            caption: "The graph of f(θ), with the point A marked",
            alt: `A wave that oscillates between −1 and 1 for −2π ≤ θ ≤ 2π. The point A is marked on the curve at θ = ${piText(at)}.`,
            window: { x: [-2 * Math.PI - 0.5, 2 * Math.PI + 0.5], y: [-1.6, 1.6] },
            ticks: { x: piTicks(-2, 2, 2), y: 0.5 },
            axisLabels: { x: "θ", y: "f(θ)" },
            functions: [{ expr: `${fn}(x)` }],
            points: [{ at: [radians(at), y.value], label: "A", position: "ne" }],
          }),
        ],
        parts: [
          part(
            "Which function is graphed?",
            ask.choice("f(θ) =", ["sin θ", "cos θ"], `${fn} θ`),
          ),
          part(
            `Point A is on the graph at θ = ${piText(at)}. What is the y-coordinate of A?`,
            ask.number("y =", y.text),
          ),
          part(
            "For −2π ≤ θ ≤ 2π, how many times does the graph cross the θ-axis?",
            ask.number("Count:", closedAngles(fn, 0, [-2, 2]).length),
          ),
        ],
        solution: [
          fn === "sin"
            ? "The graph passes through the origin, where sin 0 = 0, and cos 0 = 1, so the graph is f(θ) = sin θ."
            : "The graph is 1 at θ = 0, where cos 0 = 1 and sin 0 = 0, so the graph is f(θ) = cos θ.",
          `At θ = ${piText(at)}, ${fn} θ = ${y.text}, so A = (${piText(at)}, ${y.text}).`,
          `${fn} θ = 0 at ${closedAngles(fn, 0, [-2, 2]).map(piText).join(", ")}, so the graph crosses the θ-axis ${closedAngles(fn, 0, [-2, 2]).length} times.`,
        ],
        data: { fn, k, y },
      });
    },
    verify({ data: { fn, k, y } }) {
      assertNear(y.value, Math[fn]((k * Math.PI) / 2), "A");
      assert(closedAngles(fn, 0, [-2, 2]).length === (fn === "sin" ? 5 : 4), "crossings");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "cosine-function",
    skill: "identify-information",
    make(r) {
      const pairs = r.sample(
        [
          ["sin", 1],
          ["sin", -1],
          ["sin", 0],
          ["cos", 1],
          ["cos", -1],
          ["cos", 0],
        ],
        3,
      );
      const smallest = ([fn, v]) => closedAngles(fn, v, [0, 2]).find((q) => q.n > 0);
      const greatestNegative = ([fn, v]) => anglesWith(fn, v, -2, 0).at(-1);
      const target = (v) => (v === 0 ? "0" : v > 0 ? "1" : "−1");
      return problem({
        stem: "Think about the point P on the unit circle, where sin θ is the y-coordinate and cos θ is the x-coordinate.",
        parts: [
          part(
            `Find the smallest positive angle θ for which ${pairs[0][0]} θ = ${target(pairs[0][1])}.`,
            ask.number("θ =", piText(smallest(pairs[0]))),
          ),
          part(
            `Find the smallest positive angle θ for which ${pairs[1][0]} θ = ${target(pairs[1][1])}.`,
            ask.number("θ =", piText(smallest(pairs[1]))),
          ),
          part(
            `Find the greatest negative angle θ for which ${pairs[2][0]} θ = ${target(pairs[2][1])}.`,
            ask.number("θ =", piText(greatestNegative(pairs[2]))),
          ),
        ],
        solution: [
          reasonFor(pairs[0], piText(smallest(pairs[0]))),
          reasonFor(pairs[1], piText(smallest(pairs[1]))),
          `${reasonFor(pairs[2], piText(greatestNegative(pairs[2])))} Turning clockwise from 0, this is the first angle reached.`,
        ],
        data: {
          pairs,
          answers: [smallest(pairs[0]), smallest(pairs[1]), greatestNegative(pairs[2])],
        },
      });
    },
    verify({ data: { pairs, answers } }) {
      answers.forEach((angle, i) => {
        assertNear(Math[pairs[i][0]](radians(angle)), pairs[i][1], "value");
        assert(i < 2 ? radians(angle) > 0 : radians(angle) < 0, "sign of angle");
      });
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "sine-function",
    skill: "describe",
    make(r) {
      const lo = new Q(r.int(0, 30), 12);
      const hi = lo.add(new Q(r.int(3, 9), 12));
      const dirSin = direction("sin", lo, hi);
      const dirCos = direction("cos", lo, hi);
      if (dirSin === "neither" && dirCos === "neither") reject("both turn");
      const signFn = r.pick(["sin", "cos"]);
      const signs = new Set();
      for (let i = 1; i < 40; i++)
        signs.add(Math.sign(f(signFn, lo.add(hi.sub(lo).mul(new Q(i, 40))))));
      const kind = signs.size > 1 ? "both" : signs.has(1) ? "positive" : "negative";
      const where = `${piText(lo)} < θ < ${piText(hi)}`;
      return problem({
        stem: `Consider the interval ${where}.`,
        parts: [
          part(
            "Is sin θ increasing, decreasing, or neither on this interval?",
            ask.choice("sin θ is", ["increasing", "decreasing", "neither"], dirSin),
          ),
          part(
            "Is cos θ increasing, decreasing, or neither on this interval?",
            ask.choice("cos θ is", ["increasing", "decreasing", "neither"], dirCos),
          ),
          part(
            `On this interval, is ${signFn} θ positive, negative, or both?`,
            ask.choice(`${signFn} θ is`, ["positive", "negative", "both"], kind),
          ),
        ],
        solution: [
          trendReason("sin", lo, hi),
          trendReason("cos", lo, hi),
          kind === "both"
            ? `The ${WORD[signFn]} of P changes sign inside the interval, so ${signFn} θ takes both positive and negative values.`
            : `Throughout the interval, the ${WORD[signFn]} of P is ${kind}, so ${signFn} θ is ${kind}.`,
        ],
        data: { lo, hi, dirSin, dirCos, signFn, kind },
      });
    },
    verify({ data: { lo, hi, dirSin, dirCos } }) {
      assert(
        direction("sin", lo, hi) === dirSin && direction("cos", lo, hi) === dirCos,
        "direction",
      );
      assert(radians(hi) - radians(lo) >= Math.PI / 4 - EPS, "long enough");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "cosine-function",
    skill: "construct-representations",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const lines = r.sample(LINE_VALUES, 3);
      // Lines closer than 0.3 apart would run through each other's labels.
      const heights = lines.map((line) => line.value).sort((a, b) => a - b);
      if (heights[1] - heights[0] < 0.3 || heights[2] - heights[1] < 0.3)
        reject("lines too close for their labels");
      const windows = r.sample(WINDOWS, 3);
      const counts = lines.map(
        (line, i) => closedAngles(fn, line.value, windows[i]).length,
      );
      if (counts.some((c) => c === 0)) reject("no crossings");
      const labelAt = [-5.2, 0.4, 5.2];
      return problem({
        stem: `The graph of y = ${fn} θ is shown with three horizontal lines.`,
        blocks: [
          graph({
            caption: `The graph of y = ${fn} θ and the lines y = ${lines[0].text}, y = ${lines[1].text}, and y = ${lines[2].text}`,
            alt: `A wave between −1 and 1 for −2π ≤ θ ≤ 2π with three dashed horizontal lines at y = ${lines[0].text}, y = ${lines[1].text}, and y = ${lines[2].text}.`,
            window: { x: [-2 * Math.PI - 0.5, 2 * Math.PI + 0.5], y: [-1.6, 1.6] },
            ticks: { x: piTicks(-2, 2, 2), y: 0.5 },
            axisLabels: { x: "θ", y: "y" },
            functions: [{ expr: `${fn}(x)` }],
            segments: lines.map((line, i) => ({
              from: [-2 * Math.PI - 0.5, line.value],
              to: [2 * Math.PI + 0.5, line.value],
              dashed: true,
              label: `y = ${line.text}`,
              labelAt: labelAt[i],
            })),
          }),
        ],
        parts: lines.map((line, i) =>
          part(
            `How many solutions does ${fn} θ = ${line.text} have with ${range(windows[i])}?`,
            ask.number("Solutions:", counts[i]),
          ),
        ),
        solution: lines.map(
          (line, i) =>
            `The line y = ${line.text} meets the graph at θ = ${closedAngles(fn, line.value, windows[i]).map(piText).join(", ")} for ${range(windows[i])}, which is ${counts[i]} ${counts[i] === 1 ? "solution" : "solutions"}.`,
        ),
        data: { fn, lines, windows, counts },
      });
    },
    verify({ data: { fn, lines, windows, counts } }) {
      lines.forEach((line, i) => {
        const [lo, hi] = windows[i];
        let crossings = 0;
        const steps = 40000;
        let previous = Math[fn](lo * Math.PI) - line.value;
        if (Math.abs(previous) < 1e-12) crossings++;
        for (let s = 1; s <= steps; s++) {
          const t = (lo + ((hi - lo) * s) / steps) * Math.PI;
          const here = Math[fn](t) - line.value;
          if (Math.abs(here) < 1e-12) crossings++;
          else if (
            previous !== 0 &&
            Math.abs(previous) >= 1e-12 &&
            Math.sign(previous) !== Math.sign(here)
          )
            crossings++;
          previous = here;
        }
        if (Math.abs(line.value) === 1) assert(counts[i] >= 1, "tangent line touches");
        else
          assert(
            crossings === counts[i],
            `crossings for ${line.text}: ${crossings} vs ${counts[i]}`,
          );
      });
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "sine-function",
    skill: "apply-results",
    make(r) {
      const base = r.pick(OFF_AXIS.filter((q) => q.n > 0));
      const revolutions = r.int(1, 4);
      const s = base.add(2 * revolutions);
      const toStart = new Q(2).sub(base);
      const thing = r.pick(["bead", "ant", "marker"]);
      const article = thing === "ant" ? "An" : "A";
      return problem({
        stem: `${article} ${thing} starts at the point (1, 0) and moves counterclockwise around the unit circle. It has traveled ${piText(s)} units along the circle.`,
        parts: [
          part(
            `Where is the ${thing} now? Write the point as (x, y).`,
            ask.points("Point:", [[cosExact(s).text, sinExact(s).text]]),
          ),
          part(
            `How many complete trips around the circle has the ${thing} made?`,
            ask.number("Complete trips:", revolutions),
          ),
          part(
            `How much farther must the ${thing} travel to reach (1, 0) again?`,
            ask.number("Distance:", piText(toStart), { unit: "units" }),
          ),
        ],
        solution: [
          `On the unit circle, the distance traveled equals the angle in radians. ${piText(s)} − ${revolutions * 2}π = ${piText(base)}, so the ${thing} is at (cos ${piText(base)}, sin ${piText(base)}) = (${cosExact(s).text}, ${sinExact(s).text}).`,
          `Each trip around is 2π units. ${piText(s)} = ${revolutions}(2π) + ${piText(base)}, so there are ${revolutions} complete ${revolutions === 1 ? "trip" : "trips"}.`,
          `The ${thing} is ${piText(base)} past (1, 0), so it needs 2π − ${piText(base)} = ${piText(toStart)} more.`,
        ],
        data: { base, revolutions, s, toStart },
      });
    },
    verify({ data: { base, revolutions, s, toStart } }) {
      assertNear(Math.floor(radians(s) / (2 * Math.PI)), revolutions, "trips");
      assertNear(radians(toStart) + radians(base), 2 * Math.PI, "return");
      assertNear(sinExact(s).value, Math.sin(radians(s)), "y");
      assertNear(cosExact(s).value, Math.cos(radians(s)), "x");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "cosine-function",
    skill: "support-conclusions",
    make(r) {
      const mask = r.pick([
        [true, true, false],
        [true, false, true],
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      const kinds = r.shuffle(["trend", "equal", "zero", "bound"]).slice(0, 3);
      const claims = kinds.map((kind, i) => claim(r, kind, mask[i]));
      return problem({
        stem: "Decide whether each statement is true or false.",
        parts: claims.map((c) =>
          part(
            c.statement,
            ask.choice("The statement is", ["true", "false"], c.truth ? "true" : "false"),
          ),
        ),
        solution: claims.map((c) => c.reason),
        data: { claims },
      });
    },
    verify({ data: { claims } }) {
      for (const c of claims) assert(c.check() === c.truth, `claim: ${c.statement}`);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "cosine-function",
    skill: "solve",
    make(r) {
      const specs = r.sample(
        [
          ["sin", 0],
          ["sin", 1],
          ["sin", -1],
          ["cos", 0],
          ["cos", 1],
          ["cos", -1],
        ],
        3,
      );
      const windows = r.sample(SOLVE_WINDOWS, 3);
      const sets = specs.map(([fn, v], i) => closedAngles(fn, v, windows[i]));
      if (sets.some((set) => set.length === 0 || set.length > 5)) reject("set size");
      const target = (v) => (v === 0 ? "0" : v > 0 ? "1" : "−1");
      return problem({
        stem: "Find every angle that makes the equation true. Give exact answers in radians, separated by commas.",
        parts: specs.map(([fn, v], i) =>
          part(
            `Find all θ with ${range(windows[i])} for which ${fn} θ = ${target(v)}.`,
            ask.set("θ =", sets[i].map(piText)),
          ),
        ),
        solution: specs.map(
          ([fn, v], i) =>
            `${fn} θ = ${target(v)} when P is at ${v === 0 ? (fn === "sin" ? "(1, 0) or (−1, 0)" : "(0, 1) or (0, −1)") : fn === "sin" ? (v > 0 ? "(0, 1)" : "(0, −1)") : v > 0 ? "(1, 0)" : "(−1, 0)"}, which happens at ${sets[i].map(piText).join(", ")} in ${range(windows[i])}.`,
        ),
        data: { specs, windows, sets },
      });
    },
    verify({ data: { specs, windows, sets } }) {
      specs.forEach(([fn, v], i) => {
        const [lo, hi] = windows[i];
        for (const angle of sets[i]) {
          assertNear(Math[fn](radians(angle)), v, "solution");
          const size = angle.n / angle.d;
          assert(size >= lo - EPS && size <= hi + EPS, "range");
        }
        // Every multiple of π/2 in the window that satisfies the equation is listed.
        let expected = 0;
        for (let k = Math.ceil(lo * 2); k <= Math.floor(hi * 2); k++)
          if (Math.abs(Math[fn]((k * Math.PI) / 2) - v) < 1e-9) expected++;
        assert(expected === sets[i].length, "missing solution");
      });
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "sine-function",
    skill: "apply-results",
    make(r) {
      const specs = r.sample(
        [
          ["sin", ">"],
          ["sin", "<"],
          ["cos", ">"],
          ["cos", "<"],
        ],
        3,
      );
      const windows = r.sample(
        [
          [0, 2],
          [-1, 1],
          [-2, 0],
          [-1, 2],
          [0, 3],
        ],
        3,
      );
      const answers = specs.map(([fn, op], i) => signIntervals(fn, op, ...windows[i]));
      if (answers.some((text) => text === "")) reject("no solutions");
      return problem({
        stem: "The graphs of y = sin θ (solid) and y = cos θ (dashed) are shown. Write each answer in interval notation, using brackets or parentheses to show whether the endpoints are included.",
        blocks: [
          graph({
            caption: "y = sin θ (solid) and y = cos θ (dashed)",
            alt: "Two waves between −1 and 1 for −2π ≤ θ ≤ 3π. The sine wave rises from 0 at θ = 0 and the cosine wave starts at 1.",
            window: { x: [-2 * Math.PI - 0.4, 3 * Math.PI + 0.4], y: [-1.6, 1.6] },
            ticks: { x: piTicks(-2, 3, 2), y: 0.5 },
            axisLabels: { x: "θ", y: "y" },
            functions: [
              { expr: "sin(x)", label: "sin θ", labelAt: 1.1 },
              { expr: "cos(x)", label: "cos θ", dashed: true, labelAt: -0.3 },
            ],
          }),
        ],
        parts: specs.map(([fn, op], i) =>
          part(
            `For ${range(windows[i])}, where is ${fn} θ ${op === ">" ? "greater than 0" : "less than 0"}?`,
            ask.interval("θ in", answers[i]),
          ),
        ),
        solution: specs.map(
          ([fn, op], i) =>
            `${fn} θ ${op} 0 where the ${WORD[fn]} of P is ${op === ">" ? "positive" : "negative"}. The graph is ${op === ">" ? "above" : "below"} the θ-axis for θ in ${answers[i]}. The endpoints where ${fn} θ = 0 are not included, because the inequality is strict.`,
        ),
        data: { specs, windows, answers },
      });
    },
    verify({ data: { specs, windows, answers } }) {
      specs.forEach(([fn, op], i) => {
        const [lo, hi] = windows[i];
        // Test one point from every half-turn piece against the interval text.
        for (let s = 0; s < (hi - lo) * 2; s++) {
          const mid = (lo + s / 2 + 0.25) * Math.PI;
          const holds = op === ">" ? Math[fn](mid) > 0 : Math[fn](mid) < 0;
          const t = (mid / Math.PI).toFixed(4);
          assert(
            holds === insideIntervals(answers[i], Number(t)),
            `interval ${answers[i]} at ${t}`,
          );
        }
      });
    },
  },
];

function pointText(angle) {
  return `(${cosExact(angle).text}, ${sinExact(angle).text})`;
}

function reasonFor([fn, v], answer) {
  const place =
    fn === "sin"
      ? v === 0
        ? "the y-coordinate is 0, so P is on the x-axis"
        : v > 0
          ? "the y-coordinate is 1, so P is at the top of the circle (0, 1)"
          : "the y-coordinate is −1, so P is at the bottom of the circle (0, −1)"
      : v === 0
        ? "the x-coordinate is 0, so P is on the y-axis"
        : v > 0
          ? "the x-coordinate is 1, so P is at the right of the circle (1, 0)"
          : "the x-coordinate is −1, so P is at the left of the circle (−1, 0)";
  return `${fn} θ = ${v === 0 ? "0" : v > 0 ? "1" : "−1"} when ${place}. The angle needed is ${answer}.`;
}

// Whether the number t (in units of π) lies in interval text such as "[0, π/2) ∪ (3π/2, 2π]".
function insideIntervals(text, t) {
  const toNumber = (s) => {
    const clean = s.trim().replace("−", "-");
    if (clean === "0") return 0;
    const match = clean.match(/^(-?)(\d*)π(?:\/(\d+))?$/);
    if (!match) throw new Error(`cannot read ${s}`);
    const sign = match[1] ? -1 : 1;
    const top = match[2] === "" ? 1 : Number(match[2]);
    return (sign * top) / (match[3] ? Number(match[3]) : 1);
  };
  return text.split("∪").some((piece) => {
    const m = piece.trim().match(/^([[(])(.+),(.+)([\])])$/);
    const lo = toNumber(m[2]);
    const hi = toNumber(m[3]);
    return (m[1] === "[" ? t >= lo : t > lo) && (m[4] === "]" ? t <= hi : t < hi);
  });
}

// One true or false statement about sine and cosine.
function claim(r, kind, truth) {
  if (kind === "trend") {
    const fn = r.pick(["sin", "cos"]);
    const k = r.pick([-3, -2, -1, 0, 1, 2, 3, 4, 5]);
    const rises = f(fn, half(k + 1)) > f(fn, half(k));
    const said = truth ? rises : !rises;
    return {
      truth,
      statement: `As θ increases from ${piText(half(k))} to ${piText(half(k + 1))}, ${fn} θ is ${trendWord(said)}.`,
      reason: `${trendReason(fn, half(k), half(k + 1))} The statement is ${truth ? "true" : "false"}.`,
      check: () => said === (direction(fn, half(k), half(k + 1)) === "increasing"),
    };
  }
  if (kind === "equal") {
    for (let tries = 0; tries < 400; tries++) {
      const fn1 = r.pick(["sin", "cos"]);
      const fn2 = r.pick(["sin", "cos"]);
      const a = r.pick(SPECIAL);
      const b = r.pick(SPECIAL);
      if (fn1 === fn2 && a.toString() === b.toString()) continue;
      const equal = Math.abs(exact(fn1, a).value - exact(fn2, b).value) < EPS;
      if (equal !== truth) continue;
      return {
        truth,
        statement: `${fn1}(${piText(a)}) = ${fn2}(${piText(b)})`,
        reason: `${fn1}(${piText(a)}) = ${exact(fn1, a).text} and ${fn2}(${piText(b)}) = ${exact(fn2, b).text}. ${truth ? "They are equal, so the statement is true." : "They are not equal, so the statement is false."}`,
        check: () => Math.abs(f(fn1, a) - f(fn2, b)) < EPS,
      };
    }
    reject("no equality claim");
  }
  if (kind === "zero") {
    const fn = r.pick(["sin", "cos"]);
    const k = r.pick([-7, -6, -5, -3, -2, 3, 5, 6, 7, 9]);
    const actual = exact(fn, half(k)).text;
    const wrong = r.pick(["0", "1", "−1"].filter((t) => t !== actual));
    const said = truth ? actual : wrong;
    return {
      truth,
      statement: `${fn}(${piText(half(k))}) = ${said}`,
      reason: `${terminalRay(half(k))} meets the circle at P = ${pointText(half(k))}. So ${fn}(${piText(half(k))}) = ${actual}, and the statement is ${truth ? "true" : "false"}.`,
      check: () =>
        Math.abs(f(fn, half(k)) - (said === "0" ? 0 : said === "1" ? 1 : -1)) < EPS,
    };
  }
  const fn = r.pick(["sin", "cos"]);
  const value = truth
    ? r.pick([
        { text: "1/3", n: 1 / 3 },
        { text: "−3/4", n: -0.75 },
        { text: "1", n: 1 },
        { text: "−1", n: -1 },
        { text: "2/5", n: 0.4 },
      ])
    : r.pick([
        { text: "3/2", n: 1.5 },
        { text: "−2", n: -2 },
        { text: "5/4", n: 1.25 },
        { text: "−7/4", n: -1.75 },
      ]);
  return {
    truth,
    statement: `There is an angle θ for which ${fn} θ = ${value.text}.`,
    reason: `Every point on the unit circle has coordinates between −1 and 1, so ${fn} θ is always between −1 and 1. ${truth ? `${value.text} is in that range, so the statement is true.` : `${value.text} is outside that range, so the statement is false.`}`,
    check: () => Math.abs(value.n) <= 1,
  };
}

// Typed-answer problems for Topic 3.1. Each template draws new numbers for every
// variant. verify() rebuilds each periodic pattern from the displayed information and
// checks every answer against it, so a slip in a key and a slip in the stem cannot both survive.

import {
  ask,
  part,
  problem,
  table,
  graph,
  num,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const mod = (a, n) => ((a % n) + n) % n;
const grouped = (n) => n.toLocaleString("en-US");
const times = (n) => (n === 1 ? "once" : n === 2 ? "twice" : `${n} times`);
const shown = (v) => (Number.isInteger(v) ? String(v) : num(Math.round(v * 100) / 100));
const secs = (v) => `${shown(v)} second${v === 1 ? "" : "s"}`;
const mins = (v) => `${shown(v)} minute${v === 1 ? "" : "s"}`;

const TABLES = [
  {
    f: "D",
    unit: "hours",
    caption: "Water depth D(t), in feet",
    stem: "The table gives the water depth D(t), in feet, at a dock t hours after midnight. D is a periodic function.",
  },
  {
    f: "T",
    unit: "minutes",
    caption: "Temperature T(t), in degrees Fahrenheit",
    stem: "The table gives the temperature T(t), in degrees Fahrenheit, of an oven t minutes after it is turned on. T is a periodic function.",
  },
  {
    f: "C",
    unit: "minutes",
    caption: "Customers C(t)",
    stem: "The table gives the number of customers C(t) in a cafe t minutes after it opens. C is a periodic function.",
  },
];

// A repeating pattern of length L whose shortest repeat is the whole pattern.
function pattern(r, L) {
  for (let tries = 0; tries < 50; tries += 1) {
    let cycle;
    if (L === 4 && r.chance(0.6)) {
      const [a, b, c] = r.distinct(2, 16, 3);
      cycle = [a, b, a, c];
    } else {
      cycle = r.distinct(2, 16, L);
    }
    const shift = r.int(0, L - 1);
    cycle = [...cycle.slice(shift), ...cycle.slice(0, shift)];
    const shorter = Array.from({ length: L - 1 }, (_, i) => i + 1)
      .filter((d) => L % d === 0)
      .some((d) => cycle.every((v, i) => v === cycle[i % d]));
    if (!shorter) return cycle;
  }
  throw new Error("no pattern");
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "period",
    skill: "identify-information",
    make(r) {
      const context = r.pick(TABLES);
      const L = r.pick([3, 4]);
      const h = r.pick([1, 2, 3, 5]);
      const cycle = pattern(r, L);
      const P = L * h;
      const ts = Array.from({ length: 2 * L + 1 }, (_, i) => i * h);
      const k = r.int(5, 12);
      const j = r.int(1, L - 1);
      const far = h * (L * k + j);
      const back = r.int(1, L - 1);
      const near = -back * h;
      const f = context.f;
      return problem({
        stem: context.stem,
        blocks: [
          table(
            context.caption,
            ["t", ...ts.map(String)],
            [[`${f}(t)`, ...ts.map((_, i) => String(cycle[i % L]))]],
          ),
        ],
        parts: [
          part(
            `What is the period of ${f}?`,
            ask.number("Period:", P, { unit: context.unit }),
          ),
          part(`Find ${f}(${far}).`, ask.number(`${f}(${far}) =`, cycle[j])),
          part(
            `Find ${f}(${num(near)}).`,
            ask.number(`${f}(${num(near)}) =`, cycle[mod(-back, L)]),
          ),
        ],
        solution: [
          `The outputs ${cycle.join(", ")} start over at t = ${P}, so the period is ${P} ${context.unit}.${cycle[0] === cycle[2] && L === 4 ? ` The output ${cycle[0]} appears again at t = ${2 * h}, but the next output does not match, so the pattern has not started over yet.` : ""}`,
          `${far} = ${k}(${P}) + ${j * h}, so ${f}(${far}) = ${f}(${j * h}) = ${cycle[j]}.`,
          `Adding one period gives ${f}(${num(near)}) = ${f}(${num(near)} + ${P}) = ${f}(${P + near}) = ${cycle[mod(-back, L)]}.`,
        ],
        data: { cycle, L, h, P, far, near, j, back },
      });
    },
    verify({ data: { cycle, L, h, P, far, near, j, back } }) {
      assert(P === L * h, "period");
      assert(cycle[j] === cycle[mod(far / h, L)], "far value");
      assert(cycle[mod(-back, L)] === cycle[mod(near / h, L)], "negative input");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "periodic-relationships",
    skill: "construct-representations",
    make(r) {
      const context = r.pick(CYCLES);
      const a = r.int(1, 6);
      const b = r.int(1, 6);
      const A = r.pick([60, 120]);
      const P = a + b;
      if (P < 3) reject("cycle too short");
      const n = r.int(3, 8);
      let s = r.int(1, P - 1);
      if (s === a) s = a + 1 <= P - 1 ? a + 1 : a - 1;
      if (s <= 0 || s >= P) reject("no usable offset");
      const tStar = n * P + s;
      const value = s < a ? (A * s) / a : (A * (P - s)) / b;
      const T0 = r.int(P, 5 * P);
      const kFirst = Math.floor((T0 - a) / P) + 1;
      const nextMax = a + kFirst * P;
      const f = context.f;
      return problem({
        stem: `${context.stem(A, a, b)} The graph shows one cycle of ${f}, and the function repeats this cycle in both directions.`,
        blocks: [
          graph({
            caption: `One cycle of ${f}(t)`,
            alt: `A graph made of two line segments, from (0, 0) up to (${a}, ${A}) and down to (${P}, 0).`,
            window: { x: [-1, P + 1], y: [-A / 6, A * 1.15] },
            ticks: { x: 1, y: A / 3 },
            segments: [
              { from: [0, 0], to: [a, A] },
              { from: [a, A], to: [P, 0] },
            ],
            points: [{ at: [0, 0] }, { at: [a, A] }, { at: [P, 0] }],
          }),
        ],
        parts: [
          part(
            `What is the period of ${f}?`,
            ask.number("Period:", P, { unit: context.unit }),
          ),
          part(`Find ${f}(${tStar}).`, ask.number(`${f}(${tStar}) =`, value)),
          part(
            `What is the first time after t = ${T0} at which ${f} reaches its maximum value?`,
            ask.number("t =", nextMax),
          ),
        ],
        solution: [
          `One cycle runs from t = 0 to t = ${P}, so the period is ${P} ${context.unit}.`,
          `${tStar} = ${n}(${P}) + ${s}, so ${f}(${tStar}) = ${f}(${s}). On the ${s < a ? "rising" : "falling"} segment, ${f}(${s}) = ${s < a ? `${s}(${A / a})` : `${A} − ${s - a}(${A / b})`} = ${value}.`,
          `The maximum ${A} occurs at t = ${a}, and again every ${P} ${context.unit}: t = ${a}, ${a + P}, ${a + 2 * P}, and so on. The first of these after t = ${T0} is t = ${nextMax}.`,
        ],
        data: { a, b, A, P, n, s, value, T0, nextMax },
      });
    },
    verify({ data: { a, A, P, n, s, value, T0, nextMax } }) {
      assert(Number.isInteger(value), "whole-number output");
      assert(nextMax > T0 && nextMax - P <= T0, "first maximum after T0");
      assert((nextMax - a) % P === 0, "maximum position");
      assert(n * P + s > P, "later cycle");
      assert(value > 0 && value < A, "between 0 and the maximum");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "period",
    skill: "solve",
    make(r) {
      const P = r.int(5, 8);
      const values = r.distinct(2, 20, P - 1);
      const repeated = r.int(0, values.length - 1);
      // One value appears twice in each cycle.
      const cycle = [...values];
      const spot = r.pick(cycle.map((_, i) => i).filter((i) => i !== repeated));
      cycle.splice(spot + 1, 0, values[repeated]);
      const v = values[repeated];
      const first = r.int(60, 400);
      const back = r.int(3, 30);
      const K = r.int(3, 9) * P + r.int(0, P - 1);
      const count = Array.from({ length: K }, (_, t) => t).filter(
        (t) => cycle[t % P] === v,
      ).length;
      const positions = cycle
        .map((c, i) => (c === v ? i : null))
        .filter((i) => i !== null);
      const full = Math.floor(K / P);
      return problem({
        stem: `The function f is periodic with period ${P}. The table gives one full cycle.`,
        blocks: [
          table(
            "One cycle of f",
            ["t", ...cycle.map((_, i) => String(i))],
            [["f(t)", ...cycle.map(String)]],
          ),
        ],
        parts: [
          part(`Find f(${first}).`, ask.number(`f(${first}) =`, cycle[first % P])),
          part(
            `Find f(${num(-back)}).`,
            ask.number(`f(${num(-back)}) =`, cycle[mod(-back, P)]),
          ),
          part(
            `How many integers t with 0 ≤ t < ${K} satisfy f(t) = ${v}?`,
            ask.number("Count:", count),
          ),
        ],
        solution: [
          `${first} = ${Math.floor(first / P)}(${P}) + ${first % P}, so f(${first}) = f(${first % P}) = ${cycle[first % P]}.`,
          `${num(-back)} + ${Math.ceil(back / P) * P} = ${Math.ceil(back / P) * P - back}, and adding periods does not change the output, so f(${num(-back)}) = f(${mod(-back, P)}) = ${cycle[mod(-back, P)]}.`,
          `In one cycle, the value ${v} appears at t = ${positions.join(" and t = ")}. The interval 0 ≤ t < ${K} contains ${full} full cycles, which give ${2 * full} such inputs. ${K % P === 0 ? "No inputs remain, so" : `The remaining inputs t = ${full * P} to ${K - 1} add ${count - 2 * full}, so`} the count is ${count}.`,
        ],
        data: { P, cycle, v, first, back, K, count },
      });
    },
    verify({ data: { P, cycle, first, back, K, count, v } }) {
      assert(cycle.length === P, "one cycle");
      assert(cycle.filter((c) => c === v).length === 2, "value appears twice per cycle");
      assert(cycle[first % P] !== undefined, "far value");
      assert(count >= 2, "count");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "period",
    skill: "describe",
    make(r) {
      const P = r.pick([4, 5, 6, 8, 10, 12]);
      const u = r.int(1, P - 1);
      const f = r.pick(["f", "g", "h"]);
      const n = r.int(3, 7);
      const T0 = r.int(P, 5 * P);
      const kNext = Math.floor((T0 - u) / P) + 1;
      const A = r.int(P, 6 * P);
      const B = A + r.int(2 * P, 5 * P);
      const count = Array.from({ length: B - A + 1 }, (_, i) => A + i).filter(
        (t) => mod(t - u, P) === 0,
      ).length;
      return problem({
        stem: `The function ${f} is periodic with period ${P}. On the interval 0 < t < ${P}, ${f} is increasing on 0 < t < ${u} and decreasing on ${u} < t < ${P}, and the maximum value of ${f} occurs at t = ${u}.`,
        parts: [
          part(
            `Write the part of the interval ${n * P} < t < ${(n + 1) * P} on which ${f} is increasing, using interval notation.`,
            ask.interval("Interval:", `(${n * P}, ${n * P + u})`),
          ),
          part(
            `What is the first time after t = ${T0} at which ${f} reaches its maximum value?`,
            ask.number("t =", u + kNext * P),
          ),
          part(
            `How many times does ${f} reach its maximum value on the interval ${A} ≤ t ≤ ${B}?`,
            ask.number("Count:", count),
          ),
        ],
        solution: [
          `Whatever happens in one period happens in every period. Shifting 0 < t < ${u} by ${n} periods, which is ${n}(${P}) = ${n * P}, gives ${n * P} < t < ${n * P + u}.`,
          `The maximum occurs at t = ${u} + ${P}k for integers k, which gives ${u}, ${u + P}, ${u + 2 * P}, and so on. The first of these after t = ${T0} is t = ${u + kNext * P}.`,
          `The maxima in ${A} ≤ t ≤ ${B} are the values ${u} + ${P}k that lie in this interval. There are ${count} of them.`,
        ],
        data: { P, u, n, T0, kNext, A, B, count },
      });
    },
    verify({ data: { P, u, T0, kNext, A, B, count } }) {
      assert(u + kNext * P > T0 && u + (kNext - 1) * P <= T0, "next maximum");
      assert(
        count === Math.floor((B - u) / P) - Math.ceil((A - u) / P) + 1,
        "count formula",
      );
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "periodic-relationships",
    skill: "construct-representations",
    make(r) {
      const context = r.pick(ARMS);
      const H = 60;
      const rise = r.pick([2, 3, 4, 5, 6]);
      const hold = r.int(1, 3);
      const fall = r.pick([2, 3, 4, 5, 6]);
      const rest = r.int(1, 3);
      const P = rise + hold + fall + rest;
      const height = (t) => {
        const s = mod(t, P);
        if (s < rise) return (H * s) / rise;
        if (s < rise + hold) return H;
        if (s < rise + hold + fall) return H - (H * (s - rise - hold)) / fall;
        return 0;
      };
      const n = r.int(3, 9);
      const s = r.int(1, P - 1);
      const tStar = n * P + s;
      const T = r.int(3, 8) * P + r.int(0, P - 1);
      // The height is H/2 once while rising and once while falling in every cycle.
      const hits = [];
      for (let k = 0; k * P <= T; k += 1) {
        for (const t of [k * P + rise / 2, k * P + rise + hold + fall / 2]) {
          if (t <= T) hits.push(t);
        }
      }
      if (hits.some((t) => t === T)) reject("a crossing lands on the end time");
      return problem({
        stem: `${context.stem(H, rise, hold, fall, rest)} The pattern then repeats.`,
        parts: [
          part(
            "What is the period of the motion?",
            ask.number("Period:", P, { unit: "seconds" }),
          ),
          part(
            `Find the ${context.what} ${tStar} seconds after the start.`,
            ask.number(`${context.sym}(${tStar}) =`, height(tStar)),
          ),
          part(
            `How many times during the first ${T} seconds is the ${context.what} exactly ${H / 2}?`,
            ask.number("Count:", hits.length),
          ),
        ],
        solution: [
          `One cycle takes ${rise} + ${hold} + ${fall} + ${rest} = ${P} seconds, so the period is ${P} seconds.`,
          `${tStar} = ${n}(${P}) + ${s}, so the ${context.what} at ${tStar} seconds equals the ${context.what} at ${s} seconds, which is ${height(tStar)}.`,
          `In each cycle the ${context.what} passes ${H / 2} once while rising, at ${secs(rise / 2)}, and once while falling, at ${secs(rise + hold + fall / 2)}. Adding ${P} seconds for each cycle, ${hits.length} of these times fall within the first ${T} seconds.`,
        ],
        data: { H, rise, hold, fall, rest, P, tStar, T, hits, value: height(tStar) },
      });
    },
    verify({ data: { H, P, hits, T, value } }) {
      assert(Number.isInteger(value) && value >= 0 && value <= H, "output");
      assert(
        hits.every((t) => t <= T),
        "within the window",
      );
      assert(P >= 7, "period");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "period",
    skill: "solve",
    make(r) {
      const context = r.pick(TABLES);
      const L = 5;
      const h = r.pick([1, 2, 3, 4]);
      const cycle = pattern(r, L);
      const P = L * h;
      const ts = Array.from({ length: 2 * L + 1 }, (_, i) => i * h);
      const f = context.f;
      const cycles = r.int(3, 9);
      const T = cycles * P;
      const bigT = r.int(8, 20) * P + r.int(1, L - 1) * h;
      const peak = Math.max(...cycle);
      const peakAt = cycle.indexOf(peak) * h;
      const countMax = Math.floor((bigT - peakAt) / P) + 1;
      return problem({
        stem: context.stem,
        blocks: [
          table(
            context.caption,
            ["t", ...ts.map(String)],
            [[`${f}(t)`, ...ts.map((_, i) => String(cycle[i % L]))]],
          ),
        ],
        parts: [
          part(
            `Estimate the period of ${f}.`,
            ask.number("Period:", P, { unit: context.unit }),
          ),
          part(
            `How many complete periods occur in the first ${T} ${context.unit}?`,
            ask.number("Periods:", cycles),
          ),
          part(
            `How many times does ${f} reach its greatest value of ${peak} for 0 ≤ t ≤ ${bigT}?`,
            ask.number("Count:", countMax),
          ),
        ],
        solution: [
          `The outputs ${cycle.join(", ")} start over at t = ${P}, so the period is ${P} ${context.unit}.`,
          `${T} ÷ ${P} = ${cycles}, so ${cycles} complete periods fit in the first ${T} ${context.unit}.`,
          `The greatest value ${peak} occurs at t = ${peakAt} and then every ${P} ${context.unit}: ${peakAt}, ${peakAt + P}, ${peakAt + 2 * P}, and so on. The last of these not past ${bigT} is ${peakAt + (countMax - 1) * P}, so there are ${countMax} such times.`,
        ],
        data: { cycle, P, T, cycles, peak, peakAt, bigT, countMax },
      });
    },
    verify({ data: { cycle, P, T, cycles, peakAt, bigT, countMax } }) {
      assert(T === cycles * P, "complete periods");
      const brute = Array.from({ length: bigT + 1 }, (_, t) => t).filter(
        (t) => t >= peakAt && (t - peakAt) % P === 0,
      ).length;
      assert(brute === countMax, "maximum count");
      assert(cycle.length === 5, "cycle length");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "period",
    skill: "apply-results",
    make(r) {
      const context = r.pick(WHEELS);
      const revs = r.pick([2, 3, 4, 5]);
      const minutes = r.pick([6, 8, 10, 12]);
      const P = minutes / revs;
      if (!Number.isInteger(P) || P % 2 !== 0)
        reject("period should be a whole, even number of minutes");
      const low = r.pick([1, 2, 3]);
      const dia = r.pick([16, 20, 24, 30]);
      const mid = low + dia / 2;
      const top = low + dia;
      const q = P / 4;
      const seq = [low, mid, top, mid];
      const k = r.int(3, 10);
      const j = r.int(1, 3);
      const tStar = k * P + j * q;
      const T = r.int(5, 12) * P;
      const tops = Math.floor((T - 2 * q) / P) + 1;
      return problem({
        stem: `${context.stem(revs, minutes)} A rider gets on at the lowest point at time t = 0 and the heights ${context.pos(low, mid, top)}`,
        parts: [
          part(
            "What is the period of the wheel?",
            ask.number("Period:", P, { unit: "minutes" }),
          ),
          part(
            `How high is the rider ${num(tStar)} minutes after getting on?`,
            ask.number(`h(${num(tStar)}) =`, seq[j], { unit: "meters" }),
          ),
          part(
            `How many times is the rider at the highest point during the first ${num(T)} minutes after getting on?`,
            ask.number("Count:", tops),
          ),
        ],
        solution: [
          `${revs} revolutions in ${minutes} minutes means one revolution takes ${minutes}/${revs} = ${num(P)} minutes, so the period is ${num(P)} minutes.`,
          `${num(tStar)} = ${k}(${num(P)}) + ${num(j * q)}, so the rider has gone ${k} full revolutions and is ${j} quarter${j === 1 ? "" : "s"} of the way around the next one. Starting at the bottom, the heights at the quarter points are ${low}, ${mid}, ${top}, ${mid} meters, so the height is ${seq[j]} meters.`,
          `The rider is at the top ${mins(2 * q)} into each revolution, at t = ${num(2 * q)}, ${num(2 * q + P)}, ${num(2 * q + 2 * P)}, and so on. ${tops} of these times are within the first ${num(T)} minutes.`,
        ],
        data: { revs, minutes, P, q, seq, k, j, tStar, T, tops },
      });
    },
    verify({ data: { P, q, seq, T, tops } }) {
      assertNear(4 * q, P, "quarter period");
      const brute = Array.from({ length: Math.floor(T / q) + 1 }, (_, i) => i * q).filter(
        (t) => Math.abs(((t - 2 * q) / P) % 1) < 1e-9 && t >= 2 * q,
      ).length;
      assert(brute === tops, "top count");
      assert(seq[0] < seq[2], "low below high");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "period",
    skill: "support-conclusions",
    make(r) {
      const context = r.pick(TABLES);
      const h = r.pick([1, 2, 3]);
      const L = 4;
      const [a, b, c] = r.distinct(2, 16, 3);
      const cycle = [a, b, a, c];
      const P = L * h;
      const ts = Array.from({ length: 2 * L + 1 }, (_, i) => i * h);
      const f = context.f;
      const mask = r.pick([
        [true, true, false],
        [true, false, true],
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      const kinds = r.shuffle(["trap", "multiple", "half", "equation"]).slice(0, 3);
      const claims = kinds.map((kind, idx) =>
        claim(kind, mask[idx], { f, h, P, cycle, r, unit: context.unit }),
      );
      return problem({
        stem: `${context.stem} Decide whether each statement is true or false.`,
        blocks: [
          table(
            context.caption,
            ["t", ...ts.map(String)],
            [[`${f}(t)`, ...ts.map((_, i) => String(cycle[i % L]))]],
          ),
        ],
        parts: claims.map((c) =>
          part(
            c.statement,
            ask.choice("The statement is", ["true", "false"], c.truth ? "true" : "false"),
          ),
        ),
        solution: claims.map((c) => c.reason),
        data: { cycle, claims },
      });
    },
    verify({ data: { cycle, claims } }) {
      assert(cycle[0] === cycle[2] && cycle[1] !== cycle[3], "trap pattern");
      for (const c of claims)
        assert(typeof c.truth === "boolean" && c.reason.length > 0, "claim");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "periodic-relationships",
    skill: "describe",
    make(r) {
      const x1 = r.int(1, 3);
      const x2 = x1 + r.int(1, 3);
      const P = x2 + r.int(1, 3);
      const y0 = r.int(0, 3);
      const y1 = y0 + r.int(3, 6);
      const y2 = r.int(y0, y1 - 2);
      const f = r.pick(["f", "g", "h"]);
      const pts = [
        [0, y0],
        [x1, y1],
        [x2, y2],
        [P, y0],
        [P + x1, y1],
        [P + x2, y2],
        [2 * P, y0],
      ];
      const k = r.int(4, 9);
      const T = r.int(3, 6) * P + r.int(0, P - 1);
      const maxima = Array.from({ length: T + 1 }, (_, t) => t).filter(
        (t) => t >= x1 && (t - x1) % P === 0,
      ).length;
      return problem({
        stem: `The graph shows the periodic function ${f} on the interval 0 ≤ t ≤ ${2 * P}. Each corner of the graph is at a point with integer coordinates.`,
        blocks: [
          graph({
            caption: `The graph of y = ${f}(t)`,
            alt: `A graph made of line segments through the points ${pts.map(([x, y]) => `(${x}, ${y})`).join(", ")}.`,
            window: { x: [-1, 2 * P + 1], y: [-1, y1 + 2] },
            ticks: { x: 1, y: 1 },
            segments: pts.slice(0, -1).map((p, i) => ({ from: p, to: pts[i + 1] })),
            points: pts.map((at) => ({ at })),
          }),
        ],
        parts: [
          part(`What is the period of ${f}?`, ask.number("Period:", P)),
          part(`Find ${f}(${x2 + k * P}).`, ask.number(`${f}(${x2 + k * P}) =`, y2)),
          part(
            `How many times does ${f} reach its maximum value for 0 ≤ t ≤ ${T}?`,
            ask.number("Count:", maxima),
          ),
        ],
        solution: [
          `The graph from t = 0 to t = ${P} is repeated from t = ${P} to t = ${2 * P}, and the pattern first starts over at t = ${P}. The period is ${P}.`,
          `${x2 + k * P} = ${k}(${P}) + ${x2}, so ${f}(${x2 + k * P}) = ${f}(${x2}) = ${y2}.`,
          `The maximum value ${y1} occurs at t = ${x1} and then every ${P} units: ${x1}, ${x1 + P}, ${x1 + 2 * P}, and so on. There are ${maxima} such values with t ≤ ${T}.`,
        ],
        data: { x1, x2, P, y0, y1, y2, k, T, maxima },
      });
    },
    verify({ data: { x1, x2, P, y0, y1, y2, T, maxima } }) {
      assert(x1 < x2 && x2 < P, "ordered corners");
      assert(y1 > y2 && y1 > y0, "single maximum");
      assert(maxima >= 3, "enough maxima");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "period",
    skill: "solve",
    make(r) {
      const context = r.pick(SIGNALS);
      const P = r.int(5, 14);
      const m = r.int(1, P - 1);
      const n = r.int(8, 25);
      const A = r.int(0, 3 * P);
      const B = A + r.int(4 * P, 9 * P);
      const maxCount = Array.from({ length: B - A + 1 }, (_, i) => A + i).filter(
        (t) => t >= m && (t - m) % P === 0,
      ).length;
      const T = r.int(2, 6) * P + m + r.int(1, P - 1);
      const kNext = Math.floor((T - m) / P) + 1;
      return problem({
        stem: context.stem(P, m),
        parts: [
          part(
            `At what time does the ${n}th maximum occur? The first maximum is the 1st.`,
            ask.number("t =", m + (n - 1) * P, { unit: context.unit }),
          ),
          part(
            `How many times does the ${context.thing} reach its maximum for ${A} ≤ t ≤ ${B}?`,
            ask.number("Count:", maxCount),
          ),
          part(
            `What is the first time after t = ${T} at which the ${context.thing} is at a maximum?`,
            ask.number("t =", m + kNext * P, { unit: context.unit }),
          ),
        ],
        solution: [
          `The maxima occur at t = ${m} + ${P}k for k = 0, 1, 2, and so on. The ${n}th maximum has k = ${n - 1}, so t = ${m} + ${n - 1}(${P}) = ${m + (n - 1) * P}.`,
          `The values ${m} + ${P}k between ${A} and ${B} are the maxima in that interval. There are ${maxCount} of them.`,
          `The maxima after t = ${T} come from k = ${kNext}, since ${m} + ${kNext - 1}(${P}) = ${m + (kNext - 1) * P} is not after ${T} but ${m} + ${kNext}(${P}) = ${m + kNext * P} is.`,
        ],
        data: { P, m, n, A, B, maxCount, T, kNext },
      });
    },
    verify({ data: { P, m, n, A, B, maxCount, T, kNext } }) {
      assert(m + kNext * P > T && m + (kNext - 1) * P <= T, "next maximum");
      assert(
        maxCount === Math.floor((B - m) / P) - Math.max(0, Math.ceil((A - m) / P)) + 1,
        "count formula",
      );
      assert(m + (n - 1) * P > 0, "positive time");
    },
  },
];

const CYCLES = [
  {
    f: "W",
    unit: "seconds",
    stem: (A, a, b) =>
      `A windshield wiper rises from 0° to ${A}° at a constant rate in ${a} second${a === 1 ? "" : "s"}, then falls back to 0° at a constant rate in the next ${b} second${b === 1 ? "" : "s"}, and repeats. Let W(t) be the angle of the wiper, in degrees, t seconds after it starts.`,
  },
  {
    f: "H",
    unit: "seconds",
    stem: (A, a, b) =>
      `A piston head rises from its lowest position to ${A} millimeters above it at a constant rate in ${a} second${a === 1 ? "" : "s"}, then returns at a constant rate in the next ${b} second${b === 1 ? "" : "s"}, and repeats. Let H(t) be the height of the piston head above its lowest position, in millimeters, t seconds after it starts.`,
  },
  {
    f: "V",
    unit: "milliseconds",
    stem: (A, a, b) =>
      `A signal generator raises its voltage from 0 to ${A} millivolts at a constant rate in ${a} millisecond${a === 1 ? "" : "s"}, then lowers it back to 0 at a constant rate in the next ${b} millisecond${b === 1 ? "" : "s"}, and repeats. Let V(t) be the voltage, in millivolts, t milliseconds after it starts.`,
  },
];

const ARMS = [
  {
    sym: "h",
    what: "height",
    stem: (H, rise, hold, fall, rest) =>
      `A robotic arm lifts a part from 0 centimeters to ${H} centimeters at a constant rate in ${rise} seconds, holds it at ${H} centimeters for ${hold} second${hold === 1 ? "" : "s"}, lowers it back to 0 at a constant rate in ${fall} seconds, and rests at 0 for ${rest} second${rest === 1 ? "" : "s"}.`,
  },
  {
    sym: "d",
    what: "depth",
    stem: (H, rise, hold, fall, rest) =>
      `A tank is filled from a depth of 0 centimeters to ${H} centimeters at a constant rate in ${rise} seconds, stays at ${H} centimeters for ${hold} second${hold === 1 ? "" : "s"}, is drained back to 0 at a constant rate in ${fall} seconds, and stays empty for ${rest} second${rest === 1 ? "" : "s"}.`,
  },
];

const WHEELS = [
  {
    stem: (revs, minutes) =>
      `A Ferris wheel makes ${revs} revolutions every ${minutes} minutes.`,
    pos: (low, mid, top) =>
      `of the rider, in meters, are ${low} at the lowest point, ${mid} at the level of the center, and ${top} at the highest point. Let h(t) be the rider's height, in meters, t minutes after getting on.`,
  },
  {
    stem: (revs, minutes) =>
      `A carousel platform turns ${revs} times every ${minutes} minutes, and the rider sits on a seat that moves up and down with each turn.`,
    pos: (low, mid, top) =>
      `of the seat, in meters, are ${low} at its lowest, ${mid} halfway between, and ${top} at its highest. Let h(t) be the seat's height, in meters, t minutes after the ride begins.`,
  },
];

const SIGNALS = [
  {
    thing: "tide",
    unit: "hours",
    stem: (P, m) =>
      `The water level at a harbor is a periodic function of the time t, in hours after midnight. The period is ${P} hours, and the first maximum occurs at t = ${m}.`,
  },
  {
    thing: "pendulum",
    unit: "seconds",
    stem: (P, m) =>
      `The position of a pendulum bob is a periodic function of the time t, in seconds after a stopwatch starts. The period is ${P} seconds, and the first time the bob is at its maximum is t = ${m}.`,
  },
];

function claim(kind, truth, { f, h, P, cycle, r, unit }) {
  if (kind === "trap") {
    const wrong = 2 * h;
    return {
      truth,
      statement: truth
        ? `The period of ${f} is ${P} ${unit}.`
        : `The period of ${f} is ${wrong} ${unit}.`,
      reason: truth
        ? `The outputs ${cycle.join(", ")} start over at t = ${P}, so the period is ${P} ${unit}. The statement is true.`
        : `The output ${cycle[0]} appears at t = 0 and at t = ${wrong}, but the next outputs ${cycle[1]} and ${cycle[3]} differ, so the pattern has not started over. The period is ${P}, not ${wrong}. The statement is false.`,
    };
  }
  if (kind === "multiple") {
    const k = r.int(2, 4);
    return {
      truth,
      statement: truth
        ? `${f}(t + ${k * P}) = ${f}(t) for every value of t.`
        : `${f}(t + ${P + h}) = ${f}(t) for every value of t.`,
      reason: truth
        ? `${k * P} = ${k}(${P}) is a whole number of periods, so shifting by ${k * P} does not change the output. The statement is true.`
        : `${P + h} is not a whole number of periods of length ${P}, so the outputs do not repeat after a shift of ${P + h}. The statement is false.`,
    };
  }
  if (kind === "half") {
    return {
      truth,
      statement: truth ? `${f}(${P}) = ${f}(0).` : `${f}(${P / 2 + h}) = ${f}(${h}).`,
      reason: truth
        ? `${P} is one full period, so ${f}(${P}) = ${f}(0) = ${cycle[0]}. The statement is true.`
        : `${f}(${P / 2 + h}) = ${cycle[3]} and ${f}(${h}) = ${cycle[1]}. They are not equal, so ${P / 2} is not a period. The statement is false.`,
    };
  }
  return {
    truth,
    statement: truth
      ? `${f}(${P + h}) = ${f}(${h}).`
      : `${f}(${P + h}) = ${f}(${2 * h}).`,
    reason: truth
      ? `${P + h} = ${h} + ${P}, so ${f}(${P + h}) = ${f}(${h}) = ${cycle[1]}. The statement is true.`
      : `${f}(${P + h}) = ${f}(${h}) = ${cycle[1]}, while ${f}(${2 * h}) = ${cycle[2]}. They are not equal. The statement is false.`,
  };
}

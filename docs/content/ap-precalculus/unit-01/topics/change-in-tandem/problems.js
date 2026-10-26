// Typed-answer problems for Topic 1.1. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed expression, so a slip in the
// key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  rootText,
  signed,
  polyText,
  factorText,
  ivl,
  unionText,
  num,
  Q,
  fnOf,
  assert,
  assertNear,
  assertDomain,
  rangeOn,
  reject,
  lead,
  zigzag,
  cornerGraph,
} from "../../../../practice-kit/index.js";

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "function-basics",
    skill: "identify-information",
    make(r) {
      const a = r.pick([1, 2, 3, 4, -1, -2, -3]);
      const root = r.int(-6, 6);
      const inner = polyText([a, -a * root]);
      const domain =
        a > 0 ? ivl(root, Infinity, true) : ivl(-Infinity, root, false, true);
      return problem({
        stem: `Let f(x) = √(${inner}). Write the domain of f in interval notation.`,
        parts: [ask.interval("Domain", domain)],
        solution: [
          `The expression under the square root must be at least 0, so ${inner} ≥ 0.`,
          a > 0
            ? `Solving gives x ≥ ${num(root)}, so the domain is ${domain}.`
            : `Dividing by ${num(a)} reverses the inequality, so x ≤ ${num(root)}. The domain is ${domain}.`,
        ],
        data: { inner, a, root },
      });
    },
    verify({ data: { inner, a, root } }) {
      assertDomain(fnOf(`√(${inner})`), [
        a > 0 ? [root, Infinity, true] : [-Infinity, root, false, true],
      ]);
    },
  },
  {
    id: "p02",
    tier: "quick",
    concept: "function-basics",
    skill: "describe",
    make(r) {
      const [lo, hi] = r.distinctNonzero(-7, 7, 2).sort((m, n) => m - n);
      const p = r.pick([1, 1, 2, 3]);
      const q = r.int(-5, 5);
      if (-q / p === lo || -q / p === hi) reject("numerator would cancel a factor");
      const top = polyText([p, q]);
      const bottom = polyText([1, -(lo + hi), lo * hi]);
      const domain = unionText(ivl(-Infinity, lo), ivl(lo, hi), ivl(hi, Infinity));
      return problem({
        stem: `Let g(x) = (${top})/(${bottom}). Write the domain of g in interval notation.`,
        parts: [ask.interval("Domain", domain)],
        solution: [
          `The function is undefined where the denominator is 0. Factor: ${bottom} = ${factorText(lo)}${factorText(hi)}.`,
          `So x ≠ ${num(lo)} and x ≠ ${num(hi)}, and the domain is ${domain}.`,
        ],
        data: { top, bottom, lo, hi },
      });
    },
    verify({ data: { top, bottom, lo, hi } }) {
      assertDomain(fnOf(`(${top})/(${bottom})`), [
        [-Infinity, lo],
        [lo, hi],
        [hi, Infinity],
      ]);
    },
  },
  {
    id: "p03",
    tier: "quick",
    unit: true,
    concept: "zeros",
    skill: "solve",
    make(r) {
      const [s, t] = r.distinctNonzero(-6, 6, 2);
      const a = r.pick([1, 1, 2, 3]);
      const expanded = polyText([a, -a * (s + t), a * s * t]);
      return problem({
        stem: `Let f(x) = ${expanded}. Find all zeros of f.`,
        parts: [ask.set("x =", [s, t])],
        solution: [
          `A zero is an input value where the output value is 0, so solve ${expanded} = 0.`,
          `Factor: ${a === 1 ? "" : `${a}`}${factorText(s)}${factorText(t)} = 0. The zeros are x = ${num(s)} and x = ${num(t)}.`,
        ],
        data: { expanded, s, t },
      });
    },
    verify({ data: { expanded, s, t } }) {
      const f = fnOf(expanded);
      assertNear(f(s), 0, "f(s)");
      assertNear(f(t), 0, "f(t)");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "increasing-decreasing",
    skill: "identify-information",
    make(r) {
      const { xs, ys, startsUp } = zigzag(r);
      const rising = [0, 2].map((i) => [
        xs[i + (startsUp ? 0 : 1)],
        xs[i + 1 + (startsUp ? 0 : 1)],
      ]);
      const falling = [0, 2].map((i) => [
        xs[i + (startsUp ? 1 : 0)],
        xs[i + 1 + (startsUp ? 1 : 0)],
      ]);
      const text = (pairs) => unionText(...pairs.map(([lo, hi]) => ivl(lo, hi)));
      return problem({
        stem: "The graph of the function f is shown. The graph consists of line segments. Write the intervals on which f is increasing and the intervals on which f is decreasing.",
        blocks: [cornerGraph(xs, ys, "The graph of y = f(x)")],
        parts: [
          ask.interval("Increasing on", text(rising), { closure: "any" }),
          ask.interval("Decreasing on", text(falling), { closure: "any" }),
        ],
        solution: [
          `A function is increasing where its graph rises as x increases. The graph rises on ${text(rising)}.`,
          `A function is decreasing where its graph falls as x increases. The graph falls on ${text(falling)}.`,
        ],
        data: { xs, ys, startsUp },
      });
    },
    verify({ data: { xs, ys, startsUp } }) {
      for (let i = 0; i < 4; i += 1) {
        const up = ys[i + 1] > ys[i];
        assert(up === ((i % 2 === 0) === startsUp), "segments alternate");
      }
    },
  },
  {
    id: "p05",
    tier: "quiz",
    unit: true,
    concept: "concavity",
    skill: "describe",
    make(r) {
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const b = r.int(-6, 6);
      const c = r.int(-6, 6);
      const step = r.pick([1, 2]);
      const x0 = r.int(-3, 1);
      const xs = [0, 1, 2, 3, 4].map((i) => x0 + step * i);
      const f = (x) => a * x * x + b * x + c;
      const ys = xs.map(f);
      const first = new Q(ys[1] - ys[0], step);
      const last = new Q(ys[4] - ys[3], step);
      const up = a > 0;
      return problem({
        stem: "Selected values of a function f are shown in the table. The values of x are equally spaced.",
        blocks: [
          table(
            "Values of f(x)",
            ["x", "f(x)"],
            xs.map((x, i) => [num(x), num(ys[i])]),
          ),
        ],
        parts: [
          part(
            `Find the average rate of change of f over the interval ${num(xs[0])} ≤ x ≤ ${num(xs[1])}.`,
            ask.number("Average rate of change", first),
          ),
          part(
            `Find the average rate of change of f over the interval ${num(xs[3])} ≤ x ≤ ${num(xs[4])}.`,
            ask.number("Average rate of change", last),
          ),
          part(
            "Based on how the rates of change behave, is the graph of f concave up or concave down on this interval?",
            ask.choice(
              "The graph is",
              ["concave up", "concave down"],
              up ? "concave up" : "concave down",
            ),
          ),
        ],
        solution: [
          `The average rate of change over ${num(xs[0])} ≤ x ≤ ${num(xs[1])} is (${num(ys[1])} − ${ys[0] < 0 ? `(${num(ys[0])})` : num(ys[0])})/${step} = ${first}.`,
          `The average rate of change over ${num(xs[3])} ≤ x ≤ ${num(xs[4])} is (${num(ys[4])} − ${ys[3] < 0 ? `(${num(ys[3])})` : num(ys[3])})/${step} = ${last}.`,
          `The rates of change are ${up ? "increasing" : "decreasing"} as x increases (${first} then ${last}), so the graph is concave ${up ? "up" : "down"}.`,
        ],
        data: { a, b, c, xs, ys },
      });
    },
    verify({ data: { a, b, c, xs, ys } }) {
      const f = fnOf(`(${a})x^2 + (${b})x + (${c})`);
      xs.forEach((x, i) => assertNear(f(x), ys[i], "table value"));
    },
  },
  {
    id: "p06",
    tier: "quiz",
    unit: true,
    concept: "function-basics",
    skill: "describe",
    make(r) {
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const h = r.nonzero(-5, 5);
      const k = r.int(-6, 6);
      const text = `${lead(a)}√(${rootText(h)})${k ? ` ${signed(k)}` : ""}`;
      const range = a > 0 ? ivl(k, Infinity, true) : ivl(-Infinity, k, false, true);
      const domain = ivl(h, Infinity, true);
      return problem({
        stem: `Let f(x) = ${text}. Write the domain and the range of f in interval notation.`,
        parts: [ask.interval("Domain", domain), ask.interval("Range", range)],
        solution: [
          `The radicand must be at least 0, so ${rootText(h)} ≥ 0 and x ≥ ${num(h)}. The domain is ${domain}.`,
          `The outputs of √(${rootText(h)}) are every value from 0 up, so its range is [0, ∞). ${
            a === 1
              ? ""
              : a > 0
                ? `Multiplying by ${a} keeps the range [0, ∞). `
                : a === -1
                  ? "The negative sign flips the range to (−∞, 0]. "
                  : `Multiplying by ${num(a)} flips the range to (−∞, 0]. `
          }${k ? `${k > 0 ? "Adding" : "Subtracting"} ${Math.abs(k)} moves every output ${k > 0 ? "up" : "down"} by ${Math.abs(k)}.` : ""}`.trim(),
          `The range is ${range}.`,
        ],
        data: { text, a, h, k },
      });
    },
    verify({ data: { text, a, h, k } }) {
      const f = fnOf(text);
      assertDomain(f, [[h, Infinity, true]]);
      const { min, max } = rangeOn(f, h, h + 4000);
      if (a > 0) {
        assertNear(min, k, "least output", 1e-6);
        assert(max > 40, "outputs grow");
      } else {
        assertNear(max, k, "greatest output", 1e-6);
        assert(min < -40, "outputs fall");
      }
    },
  },
  {
    id: "p07",
    tier: "quiz",
    concept: "function-basics",
    skill: "describe",
    make(r) {
      const family = r.pick(["quadratic", "absolute", "reciprocal"]);
      const h = r.nonzero(-5, 5);
      const k = r.int(-6, 6);
      let text;
      let domain;
      let range;
      let why;
      if (family === "reciprocal") {
        const c = r.pick([1, 2, 3, 4, -1, -2, -3]);
        text = `${num(c)}/(${rootText(h)})${k ? ` ${signed(k)}` : ""}`;
        domain = unionText(ivl(-Infinity, h), ivl(h, Infinity));
        range = unionText(ivl(-Infinity, k), ivl(k, Infinity));
        why = `The denominator is 0 at x = ${num(h)}, so that input is excluded. The fraction ${num(c)}/(${rootText(h)}) is never 0, so the output ${num(k)} is never reached.`;
        return problem({
          stem: `Let f(x) = ${text}. Write the domain and the range of f in interval notation.`,
          parts: [ask.interval("Domain", domain), ask.interval("Range", range)],
          solution: [why, `The domain is ${domain} and the range is ${range}.`],
          data: { family, text, h, k, a: c },
        });
      }
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const core = family === "quadratic" ? `(${rootText(h)})²` : `|${rootText(h)}|`;
      text = `${lead(a)}${core}${k ? ` ${signed(k)}` : ""}`;
      domain = ivl(-Infinity, Infinity);
      range = a > 0 ? ivl(k, Infinity, true) : ivl(-Infinity, k, false, true);
      return problem({
        stem: `Let f(x) = ${text}. Write the domain and the range of f in interval notation.`,
        parts: [ask.interval("Domain", domain), ask.interval("Range", range)],
        solution: [
          `${family === "quadratic" ? "A polynomial" : "An absolute value"} is defined for every real number, so the domain is ${domain}.`,
          `${core} is never negative and equals 0 at x = ${num(h)}. ${a > 0 ? `So the least output is ${num(k)}` : `With the factor ${num(a)}, the greatest output is ${num(k)}`}, and the range is ${range}.`,
        ],
        data: { family, text, h, k, a },
      });
    },
    verify({ data: { family, text, h, k, a } }) {
      const f = fnOf(text);
      if (family === "reciprocal") {
        assertDomain(f, [
          [-Infinity, h],
          [h, Infinity],
        ]);
        for (let x = -40.3; x < 40; x += 0.7)
          assert(Math.abs(f(x) - k) > 1e-9, "never reaches k");
        assert(f(h + 1e-3) * f(h - 1e-3) < 0, "outputs on both sides of k");
        return;
      }
      assertDomain(f, [[-Infinity, Infinity]]);
      const { min, max } = rangeOn(f, h - 200, h + 200);
      if (a > 0) assertNear(min, k, "least output", 1e-6);
      else assertNear(max, k, "greatest output", 1e-6);
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "zeros",
    skill: "solve",
    make(r) {
      const s = r.int(2, 5);
      const p = r.nonzero(-6, 6);
      if (Math.abs(p) === s) reject("a repeated zero");
      const expanded = polyText([1, p, -s * s, -p * s * s]);
      return problem({
        stem: `Let f(x) = ${expanded}. Find all real zeros of f.`,
        parts: [ask.set("x =", [-p, s, -s])],
        solution: [
          `Group the terms: x²(x ${signed(p)}) − ${s * s}(x ${signed(p)}) = (x ${signed(p)})(x² − ${s * s}).`,
          `Factor again: (x ${signed(p)})(x − ${s})(x + ${s}) = 0. The zeros are x = ${num(-p)}, x = ${s}, and x = ${num(-s)}.`,
        ],
        data: { expanded, p, s },
      });
    },
    verify({ data: { expanded, p, s } }) {
      const f = fnOf(expanded);
      for (const z of [-p, s, -s]) assertNear(f(z), 0, "zero");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "construct-graph",
    skill: "identify-information",
    make(r) {
      const flip = r.chance() ? -1 : 1;
      const x0 = r.int(-7, -5);
      const z1 = x0 + r.int(2, 3);
      const xp = z1 + r.int(1, 2);
      const z2 = xp + r.int(1, 3);
      const xe = z2 + r.int(2, 3);
      if (xe > 7) reject("runs off the grid");
      const ya = -flip * r.int(2, 6);
      const yp = flip * r.int(3, 8);
      const ye = -flip * r.int(2, 6);
      const xs = [x0, z1, xp, z2, xe];
      const ys = [ya, 0, yp, 0, ye];
      const positive =
        flip === 1
          ? ivl(z1, z2)
          : unionText(ivl(x0, z1, true, false), ivl(z2, xe, false, true));
      const extreme = flip === 1 ? "greatest" : "least";
      return problem({
        stem: "The graph of the function f is shown. The graph consists of line segments, and its domain is the closed interval shown.",
        blocks: [cornerGraph(xs, ys, "The graph of y = f(x)")],
        parts: [
          part("Find all x for which f(x) = 0.", ask.set("x =", [z1, z2])),
          part(`Find f(${num(xe)}).`, ask.number(`f(${num(xe)}) =`, ye)),
          part(
            `What is the ${extreme} value of f?`,
            ask.number(`${extreme[0].toUpperCase()}${extreme.slice(1)} value`, yp),
          ),
          part(
            "On which interval(s) is f(x) > 0?",
            ask.interval("f(x) > 0 on", positive),
          ),
        ],
        solution: [
          `The zeros are the x-coordinates where the graph meets the x-axis: x = ${num(z1)} and x = ${num(z2)}.`,
          `The graph ends at the point (${num(xe)}, ${num(ye)}), so f(${num(xe)}) = ${num(ye)}.`,
          `The ${extreme} output is at the point (${num(xp)}, ${num(yp)}), so the ${extreme} value of f is ${num(yp)}.`,
          `The graph is above the x-axis on ${positive}. The endpoints where f(x) = 0 are not included.`,
        ],
        data: { xs, ys, flip },
      });
    },
    verify({ data: { xs, ys, flip } }) {
      assert(ys[1] === 0 && ys[3] === 0, "zeros are corners");
      assert(Math.sign(ys[2]) === flip && Math.sign(ys[0]) === -flip, "signs");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "construct-graph",
    skill: "apply-results",
    make(r) {
      const m = r.int(1, 3);
      const T = m + r.int(1, 5);
      const rate = 16 * (T - m);
      const start = 16 * m * T;
      const peakTime = (T - m) / 2;
      const best = 4 * (T + m) * (T + m);
      return problem({
        stem: `A ball is thrown upward from a platform. The height of the ball, in feet, t seconds after it is thrown is given by h(t) = ${polyText([-16, rate, start], "t")}.`,
        parts: [
          part(
            "How high is the platform above the ground?",
            ask.number("Height", start, { unit: "feet" }),
          ),
          part(
            "How many seconds after the throw does the ball reach the ground?",
            ask.number("Time", T, { unit: "seconds" }),
          ),
          part(
            "What is the greatest height the ball reaches?",
            ask.number("Greatest height", best, { unit: "feet" }),
          ),
          part(
            "Write the domain of h in this context, in interval notation.",
            ask.interval("Domain", ivl(0, T, true, true)),
          ),
        ],
        solution: [
          `The platform height is the height at the moment of the throw: h(0) = ${num(start)} feet.`,
          `Set h(t) = 0 and factor: −16(t + ${m})(t − ${T}) = 0. The time t = −${m} does not make sense here, so the ball lands at t = ${T} seconds.`,
          `The graph of h is symmetric about the vertical line halfway between the zeros t = −${m} and t = ${T}, which is t = ${peakTime}. The greatest height is h(${peakTime}) = ${num(best)} feet.`,
          `The ball is in the air from t = 0 until it lands, so the domain in this context is ${ivl(0, T, true, true)}.`,
        ],
        data: { m, T, rate, start, best, peakTime },
      });
    },
    verify({ data: { m, T, rate, start, best, peakTime } }) {
      const h = fnOf(`-16t^2 + ${rate}t + ${start}`, "t");
      assertNear(h(0), start, "h(0)");
      assertNear(h(T), 0, "lands at T");
      assertNear(h(-m), 0, "other zero");
      assertNear(h(peakTime), best, "greatest height");
      assert(h(peakTime + 0.01) < best && h(peakTime - 0.01) < best, "it is a maximum");
    },
  },
];

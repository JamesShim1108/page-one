// Typed-answer problems for Topic 3.10. Equations are solved with the unit circle or an
// inverse function, and inequalities are read from the graph. verify() recomputes every
// solution with Math.sin, Math.cos, and Math.tan, and tests the signs of each inequality.

import {
  ask,
  part,
  problem,
  graph,
  Q,
  piText,
  radians,
  exact,
  OFF_AXIS,
  SPECIAL,
  anglesWith,
  inequalityIntervals,
  referenceAngle,
  quadrantName,
  piTicks,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const PI = Math.PI;
const qv = (q) => q.n / q.d;
// Fixed decimals with a true minus sign: 0.450, −1.326.
const fx = (x, places) => (x < 0 ? "−" : "") + Math.abs(x).toFixed(places);
const round = (x, places = 2) => Math.round(x * 10 ** places) / 10 ** places;
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const INVERSE = { sin: Math.asin, cos: Math.acos, tan: Math.atan };
const NAME = { sin: "sine", cos: "cosine", tan: "tangent" };
const ARC = { sin: "arcsin", cos: "arccos", tan: "arctan" };
// "0 ≤ θ < 2π" for a window given in units of π.
const windowText = (lo, hi) => `${piText(new Q(lo))} ≤ θ < ${piText(new Q(hi))}`;
const list = (angles) => angles.map(piText).join(", ");
// The unit-circle readings of an equation fn θ = k as a sentence.
const setSentence = (fn, kText, angles) =>
  `On the unit circle, ${fn} θ = ${kText} at θ = ${angles.map(piText).join(" and ")}.`;

// a·fn θ + b = 0 forms that rearrange to fn θ = k.
const FORMS = {
  "1/2": (fn) => `2 ${fn} θ − 1 = 0`,
  "−1/2": (fn) => `2 ${fn} θ + 1 = 0`,
  "√2/2": (fn) => `2 ${fn} θ − √2 = 0`,
  "−√2/2": (fn) => `2 ${fn} θ + √2 = 0`,
  "√3/2": (fn) => `2 ${fn} θ − √3 = 0`,
  "−√3/2": (fn) => `2 ${fn} θ + √3 = 0`,
  1: (fn) => `${fn} θ − 1 = 0`,
  "−1": (fn) => `${fn} θ + 1 = 0`,
  "√3": (fn) => `${fn} θ − √3 = 0`,
  "−√3": (fn) => `${fn} θ + √3 = 0`,
  "√3/3": (fn) => `3 ${fn} θ − √3 = 0`,
  "−√3/3": (fn) => `3 ${fn} θ + √3 = 0`,
};
const FORM_STEP = {
  "1/2": (fn, k) => `Add 1 and divide by 2: ${fn} θ = ${k}.`,
  "−1/2": (fn, k) => `Subtract 1 and divide by 2: ${fn} θ = ${k}.`,
  "√2/2": (fn, k) => `Add √2 and divide by 2: ${fn} θ = ${k}.`,
  "−√2/2": (fn, k) => `Subtract √2 and divide by 2: ${fn} θ = ${k}.`,
  "√3/2": (fn, k) => `Add √3 and divide by 2: ${fn} θ = ${k}.`,
  "−√3/2": (fn, k) => `Subtract √3 and divide by 2: ${fn} θ = ${k}.`,
  1: (fn, k) => `Add 1: ${fn} θ = ${k}.`,
  "−1": (fn, k) => `Subtract 1: ${fn} θ = ${k}.`,
  "√3": (fn, k) => `Add √3: ${fn} θ = ${k}.`,
  "−√3": (fn, k) => `Subtract √3: ${fn} θ = ${k}.`,
  "√3/3": (fn, k) => `Add √3 and divide by 3: ${fn} θ = ${k}.`,
  "−√3/3": (fn, k) => `Subtract √3 and divide by 3: ${fn} θ = ${k}.`,
};

// One special-angle value of fn that has an exact text such as "√2/2".
const pickValue = (r, fn, pool = OFF_AXIS) => {
  const angle = r.pick(pool.filter((q) => exact(fn, q).defined));
  return { angle, ...exact(fn, angle) };
};

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "solving-equations",
    skill: "solve",
    make(r) {
      const rows = r.shuffle(["sin", "cos", "tan"]).map((fn) => {
        const k = pickValue(r, fn);
        return { fn, k, solutions: anglesWith(fn, k.value, 0, 2) };
      });
      return problem({
        stem: "Solve each equation for 0 ≤ θ < 2π. Give exact answers.",
        parts: rows.map(({ fn, k, solutions }) =>
          part(`Solve ${FORMS[k.text](fn)}.`, ask.set("θ =", solutions.map(piText))),
        ),
        solution: rows.map(({ fn, k, solutions }) => {
          const ref = referenceAngle(solutions[0]);
          return `${FORM_STEP[k.text](fn, k.text)} The reference angle is ${piText(ref)}, and the solutions are in quadrants ${quadrantName(solutions[0])} and ${quadrantName(solutions[1])}: θ = ${solutions.map(piText).join(" and ")}.`;
        }),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { fn, k, solutions } of rows) {
        assert(solutions.length === 2, "two solutions");
        for (const q of solutions) {
          assertNear(Math[fn](radians(q)), k.value, `${fn} solution`);
          assert(qv(q) >= 0 && qv(q) < 2, "in the window");
        }
      }
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "solving-equations",
    skill: "solve",
    make(r) {
      const fns = r.shuffle(["sin", "cos", "tan"]);
      const rows = fns.slice(0, 2).map((fn) => {
        const k = pickValue(r, fn, SPECIAL);
        const lo = r.pick([-2, -1, 0]);
        const hi = lo + r.pick([2, 3, 4]);
        return { fn, k, lo, hi, count: anglesWith(fn, k.value, lo, hi).length };
      });
      const last = fns[2];
      const kLast = pickValue(r, last, OFF_AXIS);
      const all = anglesWith(last, kLast.value, 0, 8).filter((q) => qv(q) > 0);
      const third = all[2];
      return problem({
        stem: "Trigonometric functions are periodic, so an equation can have many solutions.",
        parts: [
          ...rows.map(({ fn, k, lo, hi }) =>
            part(
              `How many solutions does ${fn} θ = ${k.text} have for ${windowText(lo, hi)}?`,
              ask.number("Solutions:", anglesWith(fn, k.value, lo, hi).length),
            ),
          ),
          part(
            `What is the third smallest positive solution of ${last} θ = ${kLast.text}?`,
            ask.number("Third solution:", piText(third)),
          ),
        ],
        solution: [
          ...rows.map(
            ({ fn, k, lo, hi }) =>
              `On ${windowText(lo, hi)}, ${fn} θ = ${k.text} at θ = ${list(anglesWith(fn, k.value, lo, hi))}, which is ${anglesWith(fn, k.value, lo, hi).length} ${anglesWith(fn, k.value, lo, hi).length === 1 ? "solution" : "solutions"}.`,
          ),
          `The positive solutions of ${last} θ = ${kLast.text} are ${list(all.slice(0, 4))}, and so on. The third one is ${piText(third)}.`,
        ],
        data: { rows, last, kLast, third },
      });
    },
    verify({ data: { rows, last, kLast, third } }) {
      for (const { fn, k, lo, hi, count } of rows) {
        let n = 0;
        for (const q of anglesWith(fn, k.value, lo, hi)) {
          assertNear(Math[fn](radians(q)), k.value, "solution");
          n++;
        }
        assert(n === count, "count");
      }
      assertNear(Math[last](radians(third)), kLast.value, "third");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "solving-equations",
    skill: "solve",
    make(r) {
      const rows = r.shuffle(["sin", "cos", "tan"]).map((fn) => {
        const k = pickValue(r, fn, SPECIAL);
        const [lo, hi] = r.pick([
          [0, 2],
          [-1, 1],
          [-2, 0],
          [1, 3],
        ]);
        return { fn, k, lo, hi, solutions: anglesWith(fn, k.value, lo, hi) };
      });
      return problem({
        stem: "Solve each equation. Give exact answers.",
        parts: rows.map(({ fn, k, lo, hi, solutions }) =>
          part(
            `Solve ${fn} θ = ${k.text} for ${windowText(lo, hi)}.`,
            ask.set("θ =", solutions.map(piText)),
          ),
        ),
        solution: rows.map(
          ({ fn, k, lo, hi, solutions }) =>
            `${setSentence(fn, k.text, solutions)} These are all the solutions with ${windowText(lo, hi)}.`,
        ),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { fn, k, lo, hi, solutions } of rows) {
        assert(solutions.length >= 1, "at least one solution");
        for (const q of solutions) {
          assertNear(Math[fn](radians(q)), k.value, `${fn} solution`);
          assert(qv(q) >= lo && qv(q) < hi, "in the window");
        }
      }
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "inequalities-and-context",
    skill: "describe",
    make(r) {
      const fn = r.pick(["sin", "cos"]);
      const k = pickValue(r, fn);
      const solutions = anglesWith(fn, k.value, 0, 2);
      const denominator = k.angle.d === 4 ? 4 : 6;
      const greater = r.pick([">", "≥"]);
      const less = greater === ">" ? "≤" : "<";
      const lineLabel = `y = ${k.text}`;
      const labelAt = qv(solutions[0]) > 1 ? 1.2 : 5.2;
      return problem({
        stem: `The graph of y = ${fn} θ is shown for 0 ≤ θ < 2π with the dashed line ${lineLabel}.`,
        blocks: [
          graph({
            caption: `The graph of y = ${fn} θ and the line ${lineLabel}`,
            alt: `One cycle of the ${NAME[fn]} wave for θ from 0 to 2π, crossed by a dashed horizontal line at ${lineLabel}.`,
            window: { x: [-0.3, 2 * PI + 0.3], y: [-1.5, 1.5] },
            ticks: { x: piTicks(0, 2, denominator), y: 0.5 },
            axisLabels: { x: "θ", y: "y" },
            functions: [{ expr: `${fn}(x)` }],
            segments: [
              {
                from: [-0.3, k.value],
                to: [2 * PI + 0.3, k.value],
                dashed: true,
                label: lineLabel,
                labelAt,
              },
            ],
          }),
        ],
        parts: [
          part(
            `Solve ${fn} θ = ${k.text} for 0 ≤ θ < 2π.`,
            ask.set("θ =", solutions.map(piText)),
          ),
          part(
            `Solve ${fn} θ ${greater} ${k.text} for 0 ≤ θ < 2π. Use interval notation.`,
            ask.interval("θ in", inequalityIntervals(fn, greater, k.value)),
          ),
          part(
            `Solve ${fn} θ ${less} ${k.text} for 0 ≤ θ < 2π. Use interval notation.`,
            ask.interval("θ in", inequalityIntervals(fn, less, k.value)),
          ),
        ],
        solution: [
          `The curve meets the line ${lineLabel} at θ = ${solutions.map(piText).join(" and ")}.`,
          `Where the curve is ${greater === ">" || greater === "≥" ? "above" : "below"} the line, ${fn} θ ${greater} ${k.text}: ${inequalityIntervals(fn, greater, k.value)}. ${greater === "≥" ? "The endpoints are included because the inequality allows equality." : "The endpoints are not included because the inequality is strict."}`,
          `Where the curve is on the other side of the line, ${fn} θ ${less} ${k.text}: ${inequalityIntervals(fn, less, k.value)}. ${less === "≤" ? "The endpoints are included." : "The endpoints are not included."}`,
        ],
        data: { fn, k, solutions, greater, less },
      });
    },
    verify({ data: { fn, k, greater, less } }) {
      for (const op of [greater, less]) {
        const text = inequalityIntervals(fn, op, k.value);
        for (let u = 0.003; u < 2; u += 0.01) {
          const v = Math[fn](u * PI);
          const should =
            op === ">"
              ? v > k.value
              : op === "≥"
                ? v >= k.value
                : op === "<"
                  ? v < k.value
                  : v <= k.value;
          assert(inside(text, u) === should, `${op} at ${u}`);
        }
      }
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "solving-equations",
    skill: "solve",
    make(r) {
      // fn(bθ) = k
      const fnA = r.pick(["sin", "cos"]);
      const bA = r.pick([new Q(2), new Q(1, 2)]);
      const kA = pickValue(r, fnA);
      const solA = anglesWith(fnA, kA.value, 0, 2 * qv(bA)).map((q) => q.div(bA));
      if (solA.length === 0) reject("no solutions");
      // fn(θ + c) = k
      const fnB = r.pick(["sin", "cos"]);
      const kB = pickValue(r, fnB);
      const choices =
        kB.angle.d === 4
          ? [1 / 4, 1 / 2, -1 / 4, -1 / 2]
          : [1 / 6, 1 / 3, 1 / 2, -1 / 6, -1 / 3, -1 / 2];
      const cNum = r.pick(choices);
      const c = new Q(Math.round(cNum * 12), 12);
      const solB = anglesWith(fnB, kB.value, cNum, cNum + 2).map((q) => q.sub(c));
      // tan(2θ) = k
      const kC = pickValue(r, "tan");
      const solC = anglesWith("tan", kC.value, 0, 4).map((q) => q.div(new Q(2)));
      const argA = qv(bA) === 2 ? "2θ" : "θ/2";
      const argB = cNum > 0 ? `θ + ${piText(c)}` : `θ − ${piText(c.neg())}`;
      return problem({
        stem: "Solve each equation for 0 ≤ θ < 2π. Give exact answers.",
        parts: [
          part(`Solve ${fnA}(${argA}) = ${kA.text}.`, ask.set("θ =", solA.map(piText))),
          part(`Solve ${fnB}(${argB}) = ${kB.text}.`, ask.set("θ =", solB.map(piText))),
          part(`Solve tan(2θ) = ${kC.text}.`, ask.set("θ =", solC.map(piText))),
        ],
        solution: [
          `Let x = ${argA}. For 0 ≤ θ < 2π, x is in ${windowText(0, 2 * qv(bA)).replace("θ", "x")}. ${fnA} x = ${kA.text} at x = ${list(anglesWith(fnA, kA.value, 0, 2 * qv(bA)))}. Since θ = ${qv(bA) === 2 ? "x/2" : "2x"}, θ = ${list(solA)}.`,
          `Let x = ${argB}. For 0 ≤ θ < 2π, x is in ${piText(c)} ≤ x < ${piText(c.add(2))}. ${fnB} x = ${kB.text} at x = ${list(anglesWith(fnB, kB.value, cNum, cNum + 2))}. Since θ = x ${cNum > 0 ? "−" : "+"} ${piText(cNum > 0 ? c : c.neg())}, θ = ${list(solB)}.`,
          `Let x = 2θ. For 0 ≤ θ < 2π, x is in 0 ≤ x < 4π. tan x = ${kC.text} at x = ${list(anglesWith("tan", kC.value, 0, 4))}. Dividing by 2, θ = ${list(solC)}.`,
        ],
        data: { fnA, bA, kA, solA, fnB, kB, c, solB, kC, solC },
      });
    },
    verify({ data: { fnA, bA, kA, solA, fnB, kB, c, solB, kC, solC } }) {
      for (const q of solA) {
        assertNear(Math[fnA](radians(q) * qv(bA)), kA.value, "A");
        assert(qv(q) >= 0 && qv(q) < 2, "A window");
      }
      for (const q of solB) {
        assertNear(Math[fnB](radians(q) + radians(c)), kB.value, "B");
        assert(qv(q) >= 0 && qv(q) < 2, "B window");
      }
      for (const q of solC) {
        assertNear(Math.tan(2 * radians(q)), kC.value, "C");
        assert(qv(q) >= 0 && qv(q) < 2, "C window");
      }
      assert(solB.length === 2 && solC.length === 4, "counts");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "solving-equations",
    skill: "solve",
    make(r) {
      const fn = r.pick(["sin", "cos", "tan"]);
      const a = r.pick([2, 3, 4, 5]);
      const b = r.pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
      const limit = fn === "tan" ? 3 * a : a - 1;
      const diff = r.int(-limit, limit);
      if (diff === 0) reject("k = 0 is a special value");
      if (fn !== "tan" && Math.abs(diff) === a) reject("k = ±1");
      const c = b + diff;
      const k = new Q(diff, a);
      const kv = qv(k);
      const first = INVERSE[fn](kv);
      const two =
        fn === "sin"
          ? [first < 0 ? first + 2 * PI : first, PI - first]
          : fn === "cos"
            ? [first, 2 * PI - first]
            : [first < 0 ? first + PI : first, first < 0 ? first + 2 * PI : first + PI];
      const [small, large] = two.sort((p, q) => p - q);
      return problem({
        stem: `Solve ${a} ${fn} θ ${b > 0 ? "+" : "−"} ${Math.abs(b)} = ${sg(c)} for 0 ≤ θ < 2π. Round decimal answers to the nearest thousandth.`,
        parts: [
          part(`Rewrite the equation as ${fn} θ = k. Find k.`, ask.number("k =", k)),
          part(
            "Find the smaller solution.",
            ask.number("Smaller θ =", round(small, 3), { decimals: 3 }),
          ),
          part(
            "Find the larger solution.",
            ask.number("Larger θ =", round(large, 3), { decimals: 3 }),
          ),
        ],
        solution: [
          `Subtract ${b > 0 ? b : `(${sg(b)})`} from both sides and divide by ${a}: ${fn} θ = (${sg(c)} ${b > 0 ? "−" : "+"} ${Math.abs(b)})/${a} = ${k.toString()}.`,
          `${ARC[fn]}(${k.toString()}) ≈ ${fx(first, 3)}. ${
            fn === "sin"
              ? `Sine takes each value twice in a turn, at x and at π − x, so the solutions are ${fx(two[0], 3)} and ${fx(two[1], 3)}.`
              : fn === "cos"
                ? `Cosine takes each value twice in a turn, at x and at 2π − x, so the solutions are ${fx(first, 3)} and ${fx(2 * PI - first, 3)}.`
                : `Tangent has a period of π, so the solutions are ${fx(two[0], 3)} and ${fx(two[1], 3)}.`
          }`,
          `The smaller solution is ${fx(small, 3)} and the larger is ${fx(large, 3)}.`,
        ],
        data: { fn, a, b, c, k, small, large },
      });
    },
    verify({ data: { fn, a, b, c, small, large } }) {
      for (const x of [small, large]) {
        assert(x >= 0 && x < 2 * PI, "window");
        assertNear(a * Math[fn](x) + b, c, "solves the equation", 1e-8);
      }
      assert(large > small, "two solutions");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "inequalities-and-context",
    skill: "solve",
    make(r) {
      const rows = r.shuffle(["sin", "cos", "tan"]).map((fn) => {
        const k = pickValue(r, fn);
        const op = r.pick([">", "<", "≥", "≤"]);
        return { fn, k, op, answer: inequalityIntervals(fn, op, k.value) };
      });
      return problem({
        stem: "Solve each inequality for 0 ≤ θ < 2π. Write each answer in interval notation.",
        parts: rows.map(({ fn, k, op, answer }) =>
          part(`Solve ${fn} θ ${op} ${k.text}.`, ask.interval("θ in", answer)),
        ),
        solution: rows.map(({ fn, k, op, answer }) => {
          const crit = anglesWith(fn, k.value, 0, 2);
          return `${fn} θ = ${k.text} at θ = ${list(crit)}${fn === "tan" ? ", and tangent has asymptotes at π/2 and 3π/2, which are never included" : ""}. On the graph, the curve is ${op === ">" || op === "≥" ? "above" : "below"} the line y = ${k.text} on ${answer}. ${op === "≥" || op === "≤" ? "Endpoints where the curve meets the line are included." : "Endpoints are not included."}`;
        }),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { fn, k, op, answer } of rows) {
        for (let u = 0.0037; u < 2; u += 0.0101) {
          if (fn === "tan" && Math.abs(u - Math.round(u - 0.5) - 0.5) < 0.006) continue;
          const v = Math[fn](u * PI);
          const should =
            op === ">"
              ? v > k.value
              : op === "≥"
                ? v >= k.value
                : op === "<"
                  ? v < k.value
                  : v <= k.value;
          assert(inside(answer, u) === should, `${fn} ${op} at ${u}`);
        }
      }
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "inequalities-and-context",
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
      const kinds = r.shuffle(["member", "count", "interval", "context"]).slice(0, 3);
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
    concept: "inequalities-and-context",
    skill: "apply-results",
    make(r) {
      const ride = r.chance();
      const P = r.pick([12, 24]);
      const A = r.pick([4, 6, 8, 10, 12]);
      const D = A + r.int(2, 14);
      const [mText, mValue, alpha] = r.pick([
        ["1/2", 0.5, 2 / 3],
        ["0", 0, 1 / 2],
        ["−1/2", -0.5, 1 / 3],
      ]);
      const threshold = D + A * mValue;
      assert(Number.isInteger(threshold), "integer threshold");
      const t1 = (alpha * P) / 2;
      const t2 = P - t1;
      const unit = ride ? "meters" : "feet";
      const timeUnit = ride ? "minutes" : "hours";
      const h = (t) => D - A * Math.cos((2 * PI * t) / P);
      const fraction = new Q(Math.round(((t2 - t1) / P) * 12), 12);
      return problem({
        stem: ride
          ? `A rider boards a Ferris wheel at the bottom. The rider's height, in meters, t minutes after boarding is h(t) = ${D} − ${A} cos(2πt/${P}), for the ${P}-minute ride, 0 ≤ t ≤ ${P}.`
          : `The depth of the water at a dock, in feet, t hours after low tide is h(t) = ${D} − ${A} cos(2πt/${P}), for one ${P}-hour cycle, 0 ≤ t ≤ ${P}.`,
        parts: [
          part(
            `During what times is h(t) > ${threshold}? Use interval notation.`,
            ask.interval("t in", `(${t1}, ${t2})`),
          ),
          part(
            `For how many ${timeUnit} is h(t) > ${threshold}?`,
            ask.number("Length:", t2 - t1, { unit: timeUnit }),
          ),
          part(
            `What fraction of the ${P}-${ride ? "minute ride" : "hour cycle"} is h(t) > ${threshold}?`,
            ask.number("Fraction:", fraction),
          ),
        ],
        solution: [
          `h(t) > ${threshold} means ${D} − ${A} cos(2πt/${P}) > ${threshold}, so cos(2πt/${P}) < ${mText === "0" ? "0" : mText[0] === "−" ? mText.slice(1) : `−${mText}`}. Let x = 2πt/${P}, so 0 ≤ x ≤ 2π. cos x = ${mText === "0" ? "0" : mText[0] === "−" ? mText.slice(1) : `−${mText}`} at x = ${piText(new Q(Math.round(alpha * 6), 6))} and ${piText(new Q(12 - Math.round(alpha * 6), 6))}, and cosine is below that value between them. Then t = x·${P}/(2π) gives ${t1} < t < ${t2}.`,
          `The length of the interval is ${t2} − ${t1} = ${t2 - t1} ${timeUnit}.`,
          `${t2 - t1}/${P} = ${fraction.toString()}.`,
        ],
        data: { D, A, P, threshold, t1, t2, h, fraction },
      });
    },
    verify({ data: { P, threshold, t1, t2, h, fraction } }) {
      assertNear(h(t1), threshold, "left end");
      assertNear(h(t2), threshold, "right end");
      for (let t = 0.013; t < P; t += 0.0517) {
        assert(h(t) > threshold + 1e-9 === (t > t1 && t < t2), `sign at ${t}`);
      }
      assertNear(qv(fraction), (t2 - t1) / P, "fraction");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "inequalities-and-context",
    skill: "apply-results",
    make(r) {
      const A = r.pick([5, 6, 8, 10]);
      const D = r.int(10, 30);
      const rise = r.int(1, A - 1);
      if ([A / 2, A].includes(rise) || (A === 6 && rise === 3)) reject("special value");
      const k = new Q(rise, A);
      const x1 = Math.asin(qv(k));
      const t1 = (x1 * 12) / PI;
      const t2 = 12 - t1;
      const threshold = D + rise;
      return problem({
        stem: `The temperature in a greenhouse, in degrees Celsius, t hours after midnight is T(t) = ${D} + ${A} sin(πt/12), for 0 ≤ t ≤ 24. Round times to the nearest hundredth.`,
        parts: [
          part(`T(t) > ${threshold} means sin(πt/12) > k. Find k.`, ask.number("k =", k)),
          part(
            `The temperature first rises above ${threshold} degrees at what time t?`,
            ask.number("t =", round(t1, 2), { decimals: 2, unit: "hours" }),
          ),
          part(
            `At what time t does the temperature fall back to ${threshold} degrees?`,
            ask.number("t =", round(t2, 2), { decimals: 2, unit: "hours" }),
          ),
        ],
        solution: [
          `${D} + ${A} sin(πt/12) > ${threshold} gives ${A} sin(πt/12) > ${rise}, so sin(πt/12) > ${k.toString()}.`,
          `Let x = πt/12, so 0 ≤ x ≤ 2π. sin x = ${k.toString()} at x = arcsin(${k.toString()}) ≈ ${fx(x1, 3)}. Then t = 12x/π ≈ ${fx(t1, 2)} hours.`,
          `Sine is also ${k.toString()} at x = π − ${fx(x1, 3)} ≈ ${fx(PI - x1, 3)}, so t = 12x/π ≈ ${fx(t2, 2)} hours. The temperature is above ${threshold} degrees between these times.`,
        ],
        data: { A, D, k, t1, t2, threshold },
      });
    },
    verify({ data: { A, D, t1, t2, threshold } }) {
      const T = (t) => D + A * Math.sin((PI * t) / 12);
      assertNear(T(t1), threshold, "rises through the threshold", 1e-9);
      assertNear(T(t2), threshold, "falls through the threshold", 1e-9);
      assert(
        T((t1 + t2) / 2) > threshold && T(t1 - 0.01) < threshold,
        "above between the times",
      );
    },
  },
];

// Is u (in units of π) inside the interval notation text such as "[0, π/6) ∪ (5π/6, 2π)"?
function inside(text, u) {
  if (!text) return false;
  return text.split(" ∪ ").some((piece) => {
    const open = piece[0] === "(";
    const closeOpen = piece.at(-1) === ")";
    const [left, right] = piece.slice(1, -1).split(", ").map(parse);
    const a = open ? u > left + 1e-9 : u >= left - 1e-9;
    const b = closeOpen ? u < right - 1e-9 : u <= right + 1e-9;
    return a && b;
  });
}
function parse(s) {
  if (s === "0") return 0;
  const m = /^(−?)(\d*)π(?:\/(\d+))?$/.exec(s);
  if (!m) throw new Error(`Cannot read ${s}`);
  const value = (m[2] === "" ? 1 : Number(m[2])) / (m[3] ? Number(m[3]) : 1);
  return m[1] ? -value : value;
}

// One true or false statement about solving trigonometric equations and inequalities.
function claim(r, kind, truth) {
  if (kind === "member") {
    const fn = r.pick(["sin", "cos"]);
    const k = pickValue(r, fn);
    const solutions = anglesWith(fn, k.value, 0, 2);
    const wrongPool = SPECIAL.filter(
      (q) =>
        qv(q) < 2 && qv(q) > 0 && !solutions.some((s) => s.toString() === q.toString()),
    );
    const shown = truth ? r.pick(solutions) : r.pick(wrongPool);
    return {
      truth,
      statement: `θ = ${piText(shown)} is a solution of ${fn} θ = ${k.text}.`,
      reason: truth
        ? `${fn}(${piText(shown)}) = ${k.text}, so the statement is true.`
        : `${fn}(${piText(shown)}) = ${exact(fn, shown).text}, which is not ${k.text}, so the statement is false. The solutions in 0 ≤ θ < 2π are ${list(solutions)}.`,
      check: () => Math.abs(Math[fn](radians(shown)) - k.value) < 1e-9,
    };
  }
  if (kind === "count") {
    const fn = r.pick(["sin", "cos"]);
    const k = pickValue(r, fn);
    const periods = r.pick([2, 3]);
    const actual = anglesWith(fn, k.value, 0, 2 * periods).length;
    const shown = truth ? actual : r.pick([actual - 2, actual + 2, actual / 2]);
    return {
      truth,
      statement: `The equation ${fn} θ = ${k.text} has exactly ${shown} solutions for 0 ≤ θ < ${piText(new Q(2 * periods))}.`,
      reason: `There are 2 solutions in each interval of length 2π, so ${periods} cycles give ${actual} solutions. ${truth ? "The statement is true." : `It does not have ${shown}, so the statement is false.`}`,
      check: () => shown === anglesWith(fn, k.value, 0, 2 * periods).length,
    };
  }
  if (kind === "interval") {
    const fn = r.pick(["sin", "cos"]);
    const k = pickValue(r, fn);
    const op = r.pick([">", "<"]);
    const right = inequalityIntervals(fn, op, k.value);
    const closedVersion = right.replace(/\(/g, "[").replace(/\)/g, "]");
    const wrongOp = inequalityIntervals(fn, op === ">" ? "<" : ">", k.value);
    const shown = truth
      ? right
      : r.pick([closedVersion, wrongOp].filter((w) => w !== right));
    return {
      truth,
      statement: `For 0 ≤ θ < 2π, the solution of ${fn} θ ${op} ${k.text} is ${shown}.`,
      reason: `${fn} θ = ${k.text} at ${list(anglesWith(fn, k.value, 0, 2))}. The solution of ${fn} θ ${op} ${k.text} is ${right}. ${truth ? "The statement is true." : shown === closedVersion ? "The inequality is strict, so the endpoints are not included, and the statement is false." : "That interval is where the opposite inequality holds, so the statement is false."}`,
      check: () => shown === inequalityIntervals(fn, op, k.value),
    };
  }
  // context
  const h = (t) => 25 - 20 * Math.cos((PI * t) / 4);
  const goodTimes = [8 / 3, 16 / 3];
  const badTimes = [32 / 3, 40 / 3, -8 / 3];
  const t = truth ? r.pick(goodTimes) : r.pick(badTimes);
  const text = (x) =>
    (x < 0 ? "−" : "") +
    (Math.abs(x) % 1 === 0 ? String(Math.abs(x)) : `${Math.round(Math.abs(x) * 3)}/3`);
  return {
    truth,
    statement: `A rider's height is h(t) = 25 − 20 cos(πt/4) meters, t minutes after boarding, for a ride lasting 8 minutes (0 ≤ t ≤ 8). The time t = ${text(t)} is a valid solution of h(t) = 35 in this situation.`,
    reason: `h(t) = 35 means cos(πt/4) = −1/2, which has solutions t = 8/3 + 8n and t = 16/3 + 8n. ${truth ? `The time ${text(t)} is in the ride's domain 0 ≤ t ≤ 8, so the statement is true.` : `The time ${text(t)} solves the equation but is outside the ride's domain 0 ≤ t ≤ 8, so it is not a valid solution and the statement is false.`}`,
    check: () => Math.abs(h(t) - 35) < 1e-9 && t >= 0 && t <= 8,
  };
}

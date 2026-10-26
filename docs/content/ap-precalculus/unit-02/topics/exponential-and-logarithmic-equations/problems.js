// Typed-answer problems for Topic 2.13. Each template draws new numbers for every
// variant. verify() substitutes every answer back into the displayed equation or
// recomputes the inverse by composition, so a slip in a key and a slip in the stem
// cannot both survive the build.

import {
  ask,
  part,
  problem,
  num,
  Q,
  sup,
  sub,
  polyText,
  logText,
  lg,
  roundTo,
  fnOf,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const text = (value) =>
  typeof value === "string" ? value : value instanceof Q ? value.toString() : num(value);
const grouped = (n) => n.toLocaleString("en-US");
const logWord = (b) => (b === 10 ? "log" : `log${sub(b)}`);
const supInt = (n) => `${n < 0 ? "⁻" : ""}${sup(Math.abs(n))}`;
const powText = (base, n) => `${base}${supInt(n)}`;
const plusK = (k, v = "x") => `${v} ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
// x, −x, 2x, −3x: a multiple of x with the 1 left out.
const xTerm = (n) => (n === 1 ? "x" : n === -1 ? "−x" : `${num(n)}x`);
const shift = (h, v = "x") => (h === 0 ? v : plusK(h, v));
const addOrSub = (k) => `${k < 0 ? "Add" : "Subtract"} ${Math.abs(k)}`;
const baseShown = (g) => (Number.isInteger(g) ? `${g}` : `${g.toFixed(2)}`);
const fixed3 = (value) => `${value < 0 ? "−" : ""}${Math.abs(value).toFixed(3)}`;
const aLogText = (a, b, argument) =>
  `${a === 1 ? "" : a === -1 ? "−" : `${num(a)} `}${logWord(b)} ${argument}`;

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "solving",
    skill: "solve",
    make(r) {
      // (a) the same base on both sides
      const b = r.pick([2, 3, 5]);
      const m = r.pick([2, 3, 4, -2, -3]);
      const x0 = r.int(-3, 4);
      const c = r.int(-4, 5);
      const t = m * x0 + c;
      if (t < 1 || t > (b === 5 ? 3 : 4)) reject("exponent out of range");
      // (b) bases that are powers of a common root
      const R = r.pick([2, 3]);
      const p = r.pick([2, 3]);
      const q = r.int(1, R === 2 ? 5 : 3);
      if (q % p === 0) reject("a whole number");
      const d = r.nonzero(-3, 3);
      const answerB = new Q(q, p).sub(d);
      // (c) a power that is not a power of the base
      const b3 = r.pick([2, 3, 5, 7]);
      const N = r.int(5, 90);
      if (Number.isInteger(lg(b3, N))) reject("exact value");
      const approx = roundTo(lg(b3, N), 3);
      return problem({
        stem: "Solve each equation.",
        parts: [
          part(`${b}^(${polyText([m, c])}) = ${b ** t}`, ask.number("x =", x0)),
          part(`${R ** p}^(${plusK(d)}) = ${R ** q}`, ask.number("x =", answerB)),
          part(
            `${b3}ˣ = ${N}. Round your answer to three decimal places.`,
            ask.number("x ≈", approx, { decimals: 3 }),
          ),
        ],
        solution: [
          `Write ${b ** t} as ${powText(b, t)}. The bases are equal, so the exponents are equal: ${polyText([m, c])} = ${t}. Then ${num(m)}x = ${num(t - c)} and x = ${num(x0)}.`,
          `Write both sides as powers of ${R}: ${R ** p} = ${powText(R, p)} and ${R ** q} = ${powText(R, q)}. Then ${p}(${plusK(d)}) = ${q}, so ${plusK(d)} = ${text(new Q(q, p))} and x = ${text(answerB)}.`,
          `Take a logarithm of both sides: x = ${logWord(b3)} ${N} = (ln ${N})/(ln ${b3}) ≈ ${fixed3(approx)}.`,
        ],
        data: { b, m, c, t, x0, R, p, q, d, answerB, b3, N, approx },
      });
    },
    verify({ data: { b, m, c, t, x0, R, p, q, d, answerB, b3, N, approx } }) {
      assertNear(b ** (m * x0 + c), b ** t, "first equation");
      assertNear((R ** p) ** (answerB.value + d), R ** q, "second equation");
      assert(Math.abs(b3 ** approx - N) / N < 0.003, "third equation");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "solving",
    skill: "solve",
    make(r) {
      // (a) log_b(mx + c) = n
      const b = r.pick([2, 3, 5]);
      const n = r.int(1, b === 5 ? 2 : 3);
      const m = r.pick([1, 2, 3, 4]);
      const x0 = r.int(1, 8);
      const c = b ** n - m * x0;
      if (Math.abs(c) > 30 || c === 0) reject("constant out of range");
      // (b) a log_b x = d
      const b2 = r.pick([2, 3, 4, 10]);
      const a2 = r.pick([2, 3, 4, -2, -3]);
      const n2 = r.int(1, b2 === 10 ? 3 : 2);
      // (c) ln(x + c3) = d3
      const c3 = r.nonzero(-4, 6);
      const d3 = r.pick([1, 2, 3]);
      const answer3 = roundTo(Math.exp(d3) - c3, 3);
      return problem({
        stem: "Solve each equation.",
        parts: [
          part(`${logWord(b)}(${polyText([m, c])}) = ${n}`, ask.number("x =", x0)),
          part(`${aLogText(a2, b2, "x")} = ${num(a2 * n2)}`, ask.number("x =", b2 ** n2)),
          part(
            `ln(${plusK(c3)}) = ${d3}. Round your answer to three decimal places.`,
            ask.number("x ≈", answer3, { decimals: 3 }),
          ),
        ],
        solution: [
          `Rewrite in exponential form: ${polyText([m, c])} = ${powText(b, n)} = ${b ** n}. Then ${xTerm(m)} = ${b ** n - c} and x = ${x0}.`,
          `Divide both sides by ${num(a2)}: ${logWord(b2)} x = ${n2}. In exponential form, x = ${powText(b2, n2)} = ${b2 ** n2}.`,
          `In exponential form, ${plusK(c3)} = ${d3 === 1 ? "e" : `e${sup(d3)}`}, so x = ${d3 === 1 ? "e" : `e${sup(d3)}`} ${c3 < 0 ? "+" : "−"} ${Math.abs(c3)} ≈ ${fixed3(answer3)}.`,
        ],
        data: { b, n, m, c, x0, b2, a2, n2, c3, d3, answer3 },
      });
    },
    verify({ data: { b, n, m, c, x0, b2, a2, n2, c3, d3, answer3 } }) {
      assertNear(lg(b, m * x0 + c), n, "first equation");
      assertNear(a2 * lg(b2, b2 ** n2), a2 * n2, "second equation");
      assert(Math.abs(Math.log(answer3 + c3) - d3) < 0.002, "third equation");
      assert(m * x0 + c > 0, "argument is positive");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "solving",
    skill: "describe",
    make(r) {
      const b = r.pick([2, 3, 5]);
      const t = r.int(1, b === 5 ? 2 : 4);
      const ops = [">", "≥", "<", "≤"];
      const op1 = r.pick(ops);
      const op2 = r.pick(ops);
      const op3 = r.pick(ops);
      const t3 = r.int(1, b === 5 ? 2 : 3);
      const ray = (op, value, flip) => {
        const greater = op === ">" || op === "≥";
        const toRight = flip ? !greater : greater;
        const closed = op === "≥" || op === "≤";
        return toRight
          ? `${closed ? "[" : "("}${value}, ∞)`
          : `(−∞, ${value}${closed ? "]" : ")"}`;
      };
      const logAnswer = (op, upper) => {
        const greater = op === ">" || op === "≥";
        const closed = op === "≥" || op === "≤";
        return greater
          ? `${closed ? "[" : "("}${upper}, ∞)`
          : `(0, ${upper}${closed ? "]" : ")"}`;
      };
      const direction = (op, flip) => {
        const greater = op === ">" || op === "≥";
        return (flip ? !greater : greater) ? "greater" : "less";
      };
      return problem({
        stem: "Solve each inequality. Write your answer in interval notation.",
        parts: [
          part(`${b}ˣ ${op1} ${b ** t}`, ask.interval("Solution:", ray(op1, t, false))),
          part(
            `(1/${b})ˣ ${op2} 1/${b ** t}`,
            ask.interval("Solution:", ray(op2, t, true)),
          ),
          part(
            `${logWord(b)} x ${op3} ${t3}`,
            ask.interval("Solution:", logAnswer(op3, b ** t3)),
          ),
        ],
        solution: [
          `Write ${b ** t} as ${powText(b, t)}. Because ${b}ˣ is always increasing, the inequality keeps its direction: x ${op1} ${t}. The solution is ${ray(op1, t, false)}.`,
          `Write 1/${b ** t} as (1/${b})${sup(t)}. Because (1/${b})ˣ is always decreasing, the inequality reverses: x is ${direction(op2, true)} than ${t}. The solution is ${ray(op2, t, true)}.`,
          `The input of the logarithm must be positive, so x > 0. In exponential form, x ${op3} ${powText(b, t3)} = ${b ** t3}, since ${logWord(b)} x is always increasing. The solution is ${logAnswer(op3, b ** t3)}.`,
        ],
        data: { b, t, op1, op2, op3, t3 },
      });
    },
    verify({ data: { b, t, op1, op2, op3, t3 } }) {
      const holds = (op, a, c) =>
        op === ">"
          ? a > c + 1e-9
          : op === "≥"
            ? a >= c - 1e-9
            : op === "<"
              ? a < c - 1e-9
              : a <= c + 1e-9;
      for (const x of [t - 1.5, t, t + 1.5]) {
        const direct1 = holds(op1, b ** x, b ** t);
        const viaExponent = holds(op1, x, t);
        assert(direct1 === viaExponent, "increasing base");
        const direct2 = holds(op2, (1 / b) ** x, (1 / b) ** t);
        const flipped = { ">": "<", "≥": "≤", "<": ">", "≤": "≥" }[op2];
        assert(direct2 === holds(flipped, x, t), "decreasing base");
      }
      for (const x of [0.5, b ** t3, b ** t3 * 2]) {
        assert(
          holds(op3, lg(b, x), t3) === holds(op3, x, b ** t3),
          "logarithmic inequality",
        );
      }
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "inverses",
    skill: "construct-functions",
    make(r) {
      const b = r.pick([2, 3, 5]);
      const k1 = r.nonzero(-6, 6);
      const b2 = r.pick([2, 3, 5]);
      const k2 = r.nonzero(-5, 5);
      const b3 = r.pick([2, 3, 4]);
      const c3 = r.pick([2, 3, 5]);
      return problem({
        stem: "Find the inverse function of each function.",
        parts: [
          part(
            `f(x) = ${b}ˣ ${k1 < 0 ? "−" : "+"} ${Math.abs(k1)}`,
            ask.expr("f⁻¹(x) =", `log(x - (${k1}), ${b})`, {
              text: logText(b, plusK(-k1)),
            }),
          ),
          part(
            `g(x) = ${logWord(b2)} x ${k2 < 0 ? "−" : "+"} ${Math.abs(k2)}`,
            ask.expr("g⁻¹(x) =", `${b2}^(x - (${k2}))`, {
              text: `${b2}^(${plusK(-k2)})`,
            }),
          ),
          part(
            `h(x) = ${c3}(${b3})ˣ`,
            ask.expr("h⁻¹(x) =", `log(x/${c3}, ${b3})`, { text: logText(b3, `x/${c3}`) }),
          ),
        ],
        solution: [
          `Write y = ${b}ˣ ${k1 < 0 ? "−" : "+"} ${Math.abs(k1)} and reverse x and y: x = ${b}^y ${k1 < 0 ? "−" : "+"} ${Math.abs(k1)}. ${addOrSub(k1)}: ${b}^y = ${plusK(-k1)}. Then y = ${logText(b, plusK(-k1))}.`,
          `Write y = ${logWord(b2)} x ${k2 < 0 ? "−" : "+"} ${Math.abs(k2)} and reverse x and y: x = ${logWord(b2)} y ${k2 < 0 ? "−" : "+"} ${Math.abs(k2)}. Then ${logWord(b2)} y = ${plusK(-k2)}, so y = ${b2}^(${plusK(-k2)}).`,
          `Write y = ${c3}(${b3})ˣ and reverse x and y: x = ${c3}(${b3})^y. Divide by ${c3}: ${b3}^y = x/${c3}, so y = ${logText(b3, `x/${c3}`)}.`,
        ],
        data: { b, k1, b2, k2, b3, c3 },
      });
    },
    verify({ data: { b, k1, b2, k2, b3, c3 } }) {
      const f1 = fnOf(`log(x - (${k1}), ${b})`);
      for (const x of [-1, 0, 2, 3.5]) assertNear(f1(b ** x + k1), x, "f⁻¹(f(x))");
      const g1 = fnOf(`${b2}^(x - (${k2}))`);
      for (const x of [0.5, 2, 7]) assertNear(g1(lg(b2, x) + k2), x, "g⁻¹(g(x))");
      const h1 = fnOf(`log(x/${c3}, ${b3})`);
      for (const x of [-1, 0, 2.5]) assertNear(h1(c3 * b3 ** x), x, "h⁻¹(h(x))");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "extraneous",
    skill: "support-conclusions",
    make(r) {
      const b = r.pick([2, 3, 4, 5]);
      const n = r.int(2, b === 5 ? 2 : 4);
      const P = b ** n;
      const factors = [];
      for (let d = 1; d <= P; d += 1) {
        const e = P / d;
        if (Number.isInteger(e) && d !== e) factors.push([d, e]);
      }
      const [d, e] = r.pick(factors);
      const c = e - d;
      if (c === 0) reject("c is zero");
      const secondArgument = c > 0 ? `x + ${c}` : `x − ${-c}`;
      const quadratic = polyText([1, c, -P], "x");
      const expanded = c > 0 ? `x² + ${c}x` : `x² − ${-c}x`;
      return problem({
        stem: `Consider the equation ${logWord(b)} x + ${logWord(b)}(${secondArgument}) = ${n}.`,
        parts: [
          part(
            "By the product property, the equation becomes a quadratic equation. List all solutions of that quadratic equation.",
            ask.set("Solutions of the quadratic:", [d, -e]),
          ),
          part(
            "One of these values is extraneous. Which one?",
            ask.number("Extraneous value: x =", -e),
          ),
          part(
            `Find the solution of ${logWord(b)} x + ${logWord(b)}(${secondArgument}) = ${n}.`,
            ask.number("x =", d),
          ),
        ],
        solution: [
          `By the product property, ${logWord(b)}(x(${secondArgument})) = ${n}. In exponential form, ${expanded} = ${P}, so ${quadratic} = 0 and (x − ${d})(x + ${e}) = 0. The solutions are x = ${d} and x = ${num(-e)}.`,
          `Both logarithms in the original equation need a positive input. At x = ${num(-e)}, the input of ${logWord(b)} x is ${num(-e)}, which is not positive, so x = ${num(-e)} is extraneous.`,
          `At x = ${d}, the inputs are ${d} and ${d + c}, both positive, and ${logWord(b)} ${d} + ${logWord(b)} ${d + c} = ${logWord(b)} ${P} = ${n}. The solution is x = ${d}.`,
        ],
        data: { b, n, P, d, e, c },
      });
    },
    verify({ data: { b, n, P, d, e, c } }) {
      assert(d * (d + c) === P, "x = d solves x(x + c) = b^n");
      assert(-e * (-e + c) === P, "x = −e solves x(x + c) = b^n");
      assert(-e <= 0, "extraneous root is not positive");
      assert(d > 0 && d + c > 0, "d is a valid solution");
      assertNear(lg(b, d) + lg(b, d + c), n, "the solution");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "solving",
    skill: "solve",
    make(r) {
      // (a) a e^(mx) + c = d
      const a = r.int(2, 6);
      const m = r.pick([2, 3, -1, -2, 1]);
      const c = r.nonzero(-5, 5);
      const u = r.int(2, 9);
      const d = a * u + c;
      const answerA = roundTo(Math.log(u) / m, 3);
      // (b) a ln x + k = d
      const a2 = r.int(2, 4);
      const n2 = r.pick([-1, 1, 2, 3]);
      const k2 = r.nonzero(-3, 3);
      const d2 = a2 * n2 + k2;
      const answerB = roundTo(Math.exp(n2), 3);
      // (c) p^x = q^(x + s)
      const [p, q] = r.distinct(2, 7, 2);
      const s = r.int(1, 3);
      const answerC = roundTo((s * Math.log(q)) / (Math.log(p) - Math.log(q)), 3);
      if (!Number.isFinite(answerC) || Math.abs(answerC) > 60)
        reject("answer out of range");
      const eText = (v) => (v === 1 ? "e^x" : `e^(${xTerm(v)})`);
      return problem({
        stem: "Solve each equation. Round each answer to three decimal places.",
        parts: [
          part(
            `${a}${eText(m)} ${c < 0 ? "−" : "+"} ${Math.abs(c)} = ${num(d)}`,
            ask.number("x ≈", answerA, { decimals: 3 }),
          ),
          part(
            `${a2} ln x ${k2 < 0 ? "−" : "+"} ${Math.abs(k2)} = ${num(d2)}`,
            ask.number("x ≈", answerB, { decimals: 3 }),
          ),
          part(`${p}ˣ = ${q}^(${plusK(s)})`, ask.number("x ≈", answerC, { decimals: 3 })),
        ],
        solution: [
          `${addOrSub(c)} and divide by ${a}: ${eText(m)} = ${u}. Take the natural logarithm of both sides: ${xTerm(m)} = ln ${u}, so x = ${m === 1 ? `ln ${u}` : m === -1 ? `−ln ${u}` : `(ln ${u})/${m < 0 ? `(${num(m)})` : m}`} ≈ ${fixed3(answerA)}.`,
          `${addOrSub(k2)} and divide by ${a2}: ln x = ${num(n2)}. In exponential form, x = ${n2 === 1 ? "e" : `e^${n2 < 0 ? `(${num(n2)})` : n2}`} ≈ ${fixed3(answerB)}.`,
          `Take the natural logarithm of both sides: x ln ${p} = (${plusK(s)}) ln ${q}. Collect the x terms: x(ln ${p} − ln ${q}) = ${s} ln ${q}, so x = (${s} ln ${q})/(ln ${p} − ln ${q}) ≈ ${fixed3(answerC)}.`,
        ],
        data: { a, m, c, d, u, answerA, a2, n2, k2, d2, answerB, p, q, s, answerC },
      });
    },
    verify({ data: { a, m, c, d, answerA, a2, k2, d2, answerB, p, q, s, answerC } }) {
      assert(Math.abs(a * Math.exp(m * answerA) + c - d) < 0.2, "first");
      assert(Math.abs(a2 * Math.log(answerB) + k2 - d2) < 0.005 * a2 + 0.005, "second");
      const lhs = p ** answerC;
      const rhs = q ** (answerC + s);
      assert(Math.abs(lhs - rhs) / Math.max(lhs, rhs) < 0.01, "third");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "solving",
    skill: "apply-results",
    make(r) {
      const context = r.pick(CONTEXTS);
      const g = context.growth(r);
      const N0 = context.start(r);
      const factor = r.pick([2, 3, 5]);
      const target = N0 * r.pick([4, 6, 8, 10].filter((v) => v !== factor));
      const T = N0 * r.pick([6, 7, 9, 11, 15]);
      const tReach = roundTo(Math.log(target / N0) / Math.log(g), 3);
      const tFactor = roundTo(Math.log(factor) / Math.log(g), 3);
      const wholeNeeded = Math.floor(Math.log(T / N0) / Math.log(g)) + 1;
      if (
        Math.abs(
          Math.log(T / N0) / Math.log(g) - Math.round(Math.log(T / N0) / Math.log(g)),
        ) < 0.02
      )
        reject("near a whole number");
      return problem({
        stem: context.stem(N0, g),
        parts: [
          part(
            `When does ${context.name}(t) equal ${grouped(target)}? Round your answer to three decimal places.`,
            ask.number("t ≈", tReach, { decimals: 3, unit: context.unit }),
          ),
          part(
            `How long does it take for ${context.noun} to be multiplied by ${factor}? Round your answer to three decimal places.`,
            ask.number("t ≈", tFactor, { decimals: 3, unit: context.unit }),
          ),
          part(
            `What is the smallest whole number of ${context.units} t for which ${context.name}(t) > ${grouped(T)}?`,
            ask.number("t =", wholeNeeded, { unit: context.unit }),
          ),
        ],
        solution: [
          `Solve ${N0}(${baseShown(g)})^t = ${grouped(target)}. Divide by ${N0}: ${baseShown(g)}^t = ${target / N0}. Take a logarithm: t = ln(${target / N0})/ln(${baseShown(g)}) ≈ ${fixed3(tReach)}.`,
          `Multiplying by ${factor} means ${baseShown(g)}^t = ${factor}, so t = ln(${factor})/ln(${baseShown(g)}) ≈ ${fixed3(tFactor)}.`,
          `Solve ${N0}(${baseShown(g)})^t > ${grouped(T)}: ${baseShown(g)}^t > ${T / N0}, so t > ln(${T / N0})/ln(${baseShown(g)}) ≈ ${fixed3(Math.log(T / N0) / Math.log(g))}. The smallest whole number is ${wholeNeeded}.`,
        ],
        data: { N0, g, target, factor, T, tReach, tFactor, wholeNeeded },
      });
    },
    verify({ data: { N0, g, target, T, tReach, tFactor, factor, wholeNeeded } }) {
      assert(Math.abs(N0 * g ** tReach - target) / target < 0.004, "time to reach");
      assert(Math.abs(g ** tFactor - factor) / factor < 0.004, "time to multiply");
      assert(
        N0 * g ** wholeNeeded > T && N0 * g ** (wholeNeeded - 1) <= T,
        "smallest whole number",
      );
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "extraneous",
    skill: "solve",
    make(r) {
      const b = r.pick([2, 3, 5, 10]);
      const a1 = r.nonzero(-4, 4);
      const a2 = r.nonzero(-4, 4);
      if (a1 === a2) reject("parallel arguments");
      const x0 = r.int(-6, 7);
      const c1 = r.nonzero(-9, 9);
      const c2 = c1 + (a1 - a2) * x0;
      if (c2 === 0) reject("constant is zero");
      const valid = a1 * x0 + c1 > 0;
      const left = polyText([a1, c1]);
      const right = polyText([a2, c2]);
      return problem({
        stem: `Consider the equation ${logWord(b)}(${left}) = ${logWord(b)}(${right}).`,
        parts: [
          part(
            "Set the two inputs equal and solve the resulting equation.",
            ask.number("x =", x0),
          ),
          part(
            "Is this value a solution of the logarithmic equation?",
            ask.choice(
              "The value is",
              ["a solution", "extraneous"],
              valid ? "a solution" : "extraneous",
            ),
          ),
          part(
            "List all solutions of the logarithmic equation. Enter none if there are no solutions.",
            ask.set(
              "Solutions:",
              valid ? [x0] : [],
              valid ? {} : { empty: true, text: "none" },
            ),
          ),
        ],
        solution: [
          `Because ${logWord(b)} is one-to-one, the inputs must be equal: ${left} = ${right}. Then ${xTerm(a1 - a2)} = ${num(c2 - c1)}${a1 - a2 === 1 ? "" : ` and x = ${num(x0)}`}.`,
          `At x = ${num(x0)}, the input ${left} is ${num(a1 * x0 + c1)} and the input ${right} is ${num(a2 * x0 + c2)}. ${valid ? "Both inputs are positive, so x is a solution." : "The inputs are not positive, so the logarithms are undefined and x is extraneous."}`,
          valid
            ? `The only solution is x = ${num(x0)}.`
            : "There are no solutions to the logarithmic equation.",
        ],
        data: { b, a1, c1, a2, c2, x0, valid },
      });
    },
    verify({ data: { a1, c1, a2, c2, x0, valid } }) {
      assert(a1 * x0 + c1 === a2 * x0 + c2, "inputs agree at x0");
      assert(a1 * x0 + c1 > 0 === valid, "validity");
      assert(a1 * x0 + c1 !== 0, "input is not zero");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "inverses",
    skill: "equivalent-forms",
    make(r) {
      const family = r.pick(["exponential", "logarithmic"]);
      const b = r.pick([2, 3, 5]);
      const h = r.int(-3, 3);
      const k = r.nonzero(-5, 5);
      const hText = h === 0 ? "" : ` ${h < 0 ? "+" : "−"} ${Math.abs(h)}`;
      if (family === "exponential") {
        const a = r.int(2, 6);
        const t = r.int(0, b === 5 ? 2 : 3);
        const x0 = t - h;
        const c = a * b ** t + k;
        const f = `f(x) = ${a}${h === 0 ? `(${b})ˣ` : `(${b})^(${plusK(h)})`} ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
        const inner = `(${plusK(-k)})/${a}`;
        return problem({
          stem: `Let ${f}.`,
          parts: [
            part(
              "Find an expression for f⁻¹(x).",
              ask.expr("f⁻¹(x) =", `log((x - (${k}))/${a}, ${b}) - (${h})`, {
                text: `${logText(b, inner)}${hText}`,
              }),
            ),
            part("Find the domain of f⁻¹.", ask.interval("Domain:", `(${num(k)}, ∞)`)),
            part(`Find f⁻¹(${num(c)}).`, ask.number(`f⁻¹(${num(c)}) =`, x0)),
          ],
          solution: [
            `Reverse x and y: x = ${a}(${b})^(${shift(h, "y")}) ${k < 0 ? "−" : "+"} ${Math.abs(k)}. Undo the constant: ${plusK(-k)} = ${a}(${b})^(${shift(h, "y")}). Divide by ${a}: (${plusK(-k)})/${a} = ${b}^(${shift(h, "y")}). Then ${shift(h, "y")} = ${logText(b, inner)}, so f⁻¹(x) = ${logText(b, inner)}${hText}.`,
            `The domain of f⁻¹ is the range of f. The graph of f has the horizontal asymptote y = ${num(k)} and ${a} > 0, so the range of f is (${num(k)}, ∞).`,
            `f⁻¹(${num(c)}) = ${[...new Set([`${logText(b, `(${num(c)} ${k < 0 ? "+" : "−"} ${Math.abs(k)})/${a}`)}${hText}`, `${logText(b, b ** t)}${hText}`, `${t}${hText}`, num(x0)])].join(" = ")}.`,
          ],
          data: { family, a, b, h, k, t, x0, c },
        });
      }
      const a = r.pick([2, 3, 4, -2, -3]);
      const t = r.int(0, b === 5 ? 2 : 3);
      const x0 = b ** t - h;
      const c = a * t + k;
      const f = `f(x) = ${num(a)} ${logWord(b)}(${shift(h)}) ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
      const exponent = `(${plusK(-k)})/${a < 0 ? `(${num(a)})` : a}`;
      return problem({
        stem: `Let ${f}.`,
        parts: [
          part(
            "Find an expression for f⁻¹(x).",
            ask.expr("f⁻¹(x) =", `${b}^((x - (${k}))/(${a})) - (${h})`, {
              text: `${b}^(${exponent})${hText}`,
            }),
          ),
          part("Find the domain of f⁻¹.", ask.interval("Domain:", "(−∞, ∞)")),
          part(`Find f⁻¹(${num(c)}).`, ask.number(`f⁻¹(${num(c)}) =`, x0)),
        ],
        solution: [
          `Reverse x and y: x = ${num(a)} ${logWord(b)}(${shift(h, "y")}) ${k < 0 ? "−" : "+"} ${Math.abs(k)}. Undo the constant and divide by ${num(a)}: ${logWord(b)}(${shift(h, "y")}) = ${exponent}. In exponential form, ${shift(h, "y")} = ${b}^(${exponent}), so f⁻¹(x) = ${b}^(${exponent})${hText}.`,
          "The domain of f⁻¹ is the range of f. The range of a logarithmic function with a nonzero coefficient is all real numbers, so the domain of f⁻¹ is (−∞, ∞).",
          `f⁻¹(${num(c)}) = ${b}^((${num(c)} ${k < 0 ? "+" : "−"} ${Math.abs(k)})/${a < 0 ? `(${num(a)})` : a})${hText} = ${b}${supInt(t)}${hText} = ${num(x0)}.`,
        ],
        data: { family, a, b, h, k, t, x0, c },
      });
    },
    verify({ data: { family, a, b, h, k, t, x0, c } }) {
      if (family === "exponential") {
        const f = (x) => a * b ** (x + h) + k;
        const inv = fnOf(`log((x - (${k}))/${a}, ${b}) - (${h})`);
        for (const x of [-2, 0, 1.5]) assertNear(inv(f(x)), x, "f⁻¹(f(x))");
        assertNear(f(x0), c, "the value");
        assertNear(inv(c), x0, "f⁻¹(c)");
      } else {
        const f = (x) => a * lg(b, x + h) + k;
        const inv = fnOf(`${b}^((x - (${k}))/(${a})) - (${h})`);
        for (const x of [-h + 0.5, -h + 2, -h + 9]) assertNear(inv(f(x)), x, "f⁻¹(f(x))");
        assertNear(f(x0), c, "the value");
        assertNear(inv(c), x0, "f⁻¹(c)");
      }
      assert(Number.isInteger(c) && Number.isInteger(x0), "integer values");
      void t;
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "rewriting",
    skill: "equivalent-forms",
    make(r) {
      // (a) b^x = e^(kx)
      const b = r.pick([2, 3, 5, 10, 7]);
      const kA = roundTo(Math.log(b), 3);
      // (b) B^x = C^(mx), both powers of a root
      const R = r.pick([2, 3]);
      const exps = R === 2 ? [2, 3, 4] : [2, 3];
      const [u, v] = r.distinct(1, exps.length, 2).map((i) => exps[i - 1]);
      const B = R ** u;
      const C = R ** v;
      const m = new Q(u, v);
      // (c) A(1 + r)^t = A e^(kt)
      const A = r.pick([200, 500, 1200, 3000]);
      const rate = r.pick([2, 3, 4, 5, 6, 7, 8]);
      const growth = 1 + rate / 100;
      const kC = roundTo(Math.log(growth), 4);
      return problem({
        stem: "Logarithms can rewrite an exponential expression with a different base.",
        parts: [
          part(
            `Write ${b}ˣ in the form e^(kx). Find k. Round your answer to three decimal places.`,
            ask.number("k ≈", kA, { decimals: 3 }),
          ),
          part(`Write ${B}ˣ in the form ${C}^(mx). Find m.`, ask.number("m =", m)),
          part(
            `A population is modeled by P(t) = ${grouped(A)}(${growth.toFixed(2)})^t. Write P(t) in the form ${grouped(A)}e^(kt). Find k. Round your answer to four decimal places.`,
            ask.number("k ≈", kC, { decimals: 4 }),
          ),
        ],
        solution: [
          `Since b = e^(ln b), ${b}ˣ = (e^(ln ${b}))ˣ = e^((ln ${b})x). So k = ln ${b} ≈ ${kA.toFixed(3)}.`,
          `Write ${B} = ${R}${sup(u)} and ${C} = ${R}${sup(v)}. Then ${B}ˣ = ${R}^(${u}x) and ${C}^(mx) = ${R}^(${v}mx), so ${v}m = ${u} and m = ${text(m)}. In general, bˣ = c^((log_c b)x), and ${logWord(C)} ${B} = ${text(m)}.`,
          `${growth.toFixed(2)}^t = e^((ln ${growth.toFixed(2)})t), so k = ln ${growth.toFixed(2)} ≈ ${kC.toFixed(4)}.`,
        ],
        data: { b, kA, R, B, C, m, A, growth, kC },
      });
    },
    verify({ data: { b, kA, B, C, m, A, growth, kC } }) {
      assert(Math.abs(Math.exp(kA * 3) - b ** 3) / b ** 3 < 0.003, "first rewrite");
      assertNear(B ** 2, C ** (m.value * 2), "second rewrite");
      assert(
        Math.abs(Math.exp(kC * 10) - growth ** 10) / growth ** 10 < 0.003,
        "third rewrite",
      );
      void A;
    },
  },
];

const CONTEXTS = [
  {
    name: "A",
    noun: "the account balance",
    units: "years",
    unit: "years",
    growth: (r) => 1 + r.pick([3, 4, 5, 6, 7, 8]) / 100,
    start: (r) => r.pick([500, 1000, 2000, 5000]),
    stem: (N0, g) =>
      `An account starts with $${grouped(N0)} and earns ${roundTo((g - 1) * 100, 2)}% interest compounded annually, so the balance after t years is A(t) = ${grouped(N0)}(${g.toFixed(2)})^t dollars.`,
  },
  {
    name: "N",
    noun: "the number of bacteria",
    units: "hours",
    unit: "hours",
    growth: (r) => r.pick([2, 3, 4]),
    start: (r) => r.pick([100, 250, 400, 1000]),
    stem: (N0, g) =>
      `A culture starts with ${grouped(N0)} bacteria. The number of bacteria is multiplied by ${g} each hour, so after t hours there are N(t) = ${grouped(N0)}(${g})^t bacteria.`,
  },
  {
    name: "V",
    noun: "the value of the property",
    units: "years",
    unit: "years",
    growth: (r) => 1 + r.pick([4, 5, 6, 7, 9]) / 100,
    start: (r) => r.pick([80000, 120000, 250000]),
    stem: (N0, g) =>
      `A property is worth $${grouped(N0)} and its value increases by ${roundTo((g - 1) * 100, 2)}% each year, so its value after t years is V(t) = ${grouped(N0)}(${g.toFixed(2)})^t dollars.`,
  },
];

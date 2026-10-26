// Typed-answer problems for Topic 2.12. Each template draws new numbers for every
// variant. verify() recomputes every logarithm numerically, so a slip in a key and a
// slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  graph,
  num,
  Q,
  sup,
  sub,
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
const L = (base, argument) => logText(base, text(argument));
const logWord = (b) => (b === 10 ? "log" : `log${sub(b)}`);
const supInt = (n) => `${n < 0 ? "⁻" : ""}${sup(Math.abs(n))}`;
const powText = (base, n) => `${base}${supInt(n)}`;
const withCoefficient = (n, body) => (n === 1 ? body : `${n}${body}`);
const plusK = (k) => `x ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "product-property",
    skill: "solve",
    make(r) {
      const [b1, b2, b3] = [
        r.pick([2, 3, 5, 10]),
        r.pick([2, 3, 5]),
        r.pick([2, 3, 4, 5]),
      ];
      const odd = (b) => r.pick([3, 5, 7, 11].filter((u) => u !== b));
      // (a) log p + log q with p·q a power of the base.
      const u1 = odd(b1);
      const i = r.int(1, b1 >= 5 ? 2 : 3);
      const j = r.int(1, b1 >= 5 ? 2 : 3);
      const p1 = b1 ** i * u1;
      const q1 = new Q(b1 ** j, u1);
      // (b) log p − log q with p/q a power of the base.
      const u2 = odd(b2);
      const hi = r.int(2, b2 >= 5 ? 3 : 4);
      const lo = r.int(0, hi - 1);
      const p2 = b2 ** hi * u2;
      const q2 = b2 ** lo * u2;
      // (c) log p + log q − log t with p·q/t a power of the base.
      const u3 = odd(b3);
      const v3 = r.pick([3, 5, 7].filter((u) => u !== b3 && u !== u3));
      const m = r.int(1, 2);
      const n = r.int(1, 2);
      const p3 = b3 ** m * u3;
      const q3 = b3 ** n * v3;
      const t3 = u3 * v3;
      return problem({
        stem: "Use the properties of logarithms to evaluate each expression exactly.",
        parts: [
          part(
            `${L(b1, p1)} + ${L(b1, q1)}`,
            ask.number(`${L(b1, p1)} + ${L(b1, q1)} =`, i + j),
          ),
          part(
            `${L(b2, p2)} − ${L(b2, q2)}`,
            ask.number(`${L(b2, p2)} − ${L(b2, q2)} =`, hi - lo),
          ),
          part(
            `${L(b3, p3)} + ${L(b3, q3)} − ${L(b3, t3)}`,
            ask.number(`${L(b3, p3)} + ${L(b3, q3)} − ${L(b3, t3)} =`, m + n),
          ),
        ],
        solution: [
          `By the product property, ${L(b1, p1)} + ${L(b1, q1)} = ${L(b1, `${p1}(${q1})`)} = ${L(b1, b1 ** (i + j))} = ${i + j}.`,
          `By the quotient property, ${L(b2, p2)} − ${L(b2, q2)} = ${L(b2, `${p2}/${q2}`)} = ${L(b2, b2 ** (hi - lo))} = ${hi - lo}.`,
          `Combine the terms: ${L(b3, p3)} + ${L(b3, q3)} − ${L(b3, t3)} = ${L(b3, `${p3}(${q3})/${t3}`)} = ${L(b3, b3 ** (m + n))} = ${m + n}.`,
        ],
        data: { b1, p1, q1, i, j, b2, p2, q2, hi, lo, b3, p3, q3, t3, m, n },
      });
    },
    verify({ data: { b1, p1, q1, i, j, b2, p2, q2, hi, lo, b3, p3, q3, t3, m, n } }) {
      assertNear(lg(b1, p1) + lg(b1, q1.value), i + j, "sum");
      assertNear(lg(b2, p2) - lg(b2, q2), hi - lo, "difference");
      assertNear(lg(b3, p3) + lg(b3, q3) - lg(b3, t3), m + n, "three terms");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "product-property",
    skill: "describe",
    make(r) {
      const b = r.pick([2, 3, 5, 10]);
      const n = r.int(1, b >= 5 ? 2 : 3);
      const s = r.pick([1, -1]);
      const B = b ** n;
      const argument = s > 0 ? `${B}x` : `x/${B}`;
      const a = s * n;
      const correct =
        s > 0
          ? `a horizontal compression by a factor of 1/${B}`
          : `a horizontal stretch by a factor of ${B}`;
      const options = r.shuffle([
        correct,
        s > 0
          ? `a horizontal stretch by a factor of ${B}`
          : `a horizontal compression by a factor of 1/${B}`,
        `a vertical stretch by a factor of ${B}`,
        `a vertical translation up ${B} units`,
      ]);
      return problem({
        stem: `Let f(x) = ${logText(b, argument)}.`,
        parts: [
          part("Write f(x) in the form a + log_b x by finding a.", ask.number("a =", a)),
          part(
            "Write an expression for f(x) as a constant plus a logarithm of x.",
            ask.expr("f(x) =", `(${a}) + log(x, ${b})`, {
              strict: false,
              text: `${num(a)} + ${logText(b, "x")}`,
            }),
          ),
          part(
            `The graph of f is obtained from the graph of y = ${logText(b, "x")} by which horizontal dilation?`,
            ask.choice("Dilation:", options, correct),
          ),
        ],
        solution: [
          `By the product property, ${logText(b, argument)} = ${s > 0 ? `${logText(b, B)} + ${logText(b, "x")}` : `${logText(b, "x")} − ${logText(b, B)}`}. Since ${powText(b, n)} = ${B}, ${logText(b, B)} = ${n}, so f(x) = ${num(a)} + ${logText(b, "x")} and a = ${num(a)}.`,
          `f(x) = ${num(a)} + ${logText(b, "x")}.`,
          `${s > 0 ? "Multiplying" : "Dividing"} the input by ${B} is ${correct}. By the product property, this is the same graph as the graph of y = ${logText(b, "x")} translated ${s > 0 ? "up" : "down"} ${n} unit${n === 1 ? "" : "s"}.`,
        ],
        data: { b, n, s, a },
      });
    },
    verify({ data: { b, n, s, a } }) {
      const f = (x) => lg(b, s > 0 ? b ** n * x : x / b ** n);
      for (const x of [0.5, 1, 3, 7]) assertNear(f(x), a + lg(b, x), "a + log x");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "power-property",
    skill: "solve",
    make(r) {
      const b1 = r.pick([2, 3, 5]);
      const m1 = r.int(2, b1 === 5 ? 2 : 3);
      const n1 = r.int(2, 5);
      const b2 = r.pick([2, 3, 4, 5]);
      const m2 = r.int(2, b2 >= 4 ? 2 : 3);
      const n2 = r.int(2, 4);
      const b3 = r.pick([2, 3, 5]);
      const m3 = r.int(1, b3 === 5 ? 2 : 3);
      const root = r.pick([2, 3]);
      const radical = root === 2 ? "√" : "∛";
      const radicand = b3 ** (root * m3);
      return problem({
        stem: "Use the power property of logarithms to evaluate each expression exactly.",
        parts: [
          part(
            `${n1} ${L(b1, b1 ** m1)}`,
            ask.number(`${n1} ${L(b1, b1 ** m1)} =`, n1 * m1),
          ),
          part(
            `${logWord(b2)}(${b2 ** m2}${sup(n2)})`,
            ask.number(`${logWord(b2)}(${b2 ** m2}${sup(n2)}) =`, n2 * m2),
          ),
          part(
            `${logWord(b3)}(${radical}${radicand})`,
            ask.number(`${logWord(b3)}(${radical}${radicand}) =`, m3),
          ),
        ],
        solution: [
          `${L(b1, b1 ** m1)} = ${m1} because ${powText(b1, m1)} = ${b1 ** m1}. Then ${n1}(${m1}) = ${n1 * m1}.`,
          `By the power property, ${logWord(b2)}(${b2 ** m2}${sup(n2)}) = ${n2} ${L(b2, b2 ** m2)} = ${n2}(${m2}) = ${n2 * m2}.`,
          `${radical}${radicand} = ${radicand}^(1/${root}), so by the power property ${logWord(b3)}(${radical}${radicand}) = (1/${root}) ${L(b3, radicand)} = (1/${root})(${root * m3}) = ${m3}.`,
        ],
        data: { b1, m1, n1, b2, m2, n2, b3, m3, root, radicand },
      });
    },
    verify({ data: { b1, m1, n1, b2, m2, n2, b3, m3, root, radicand } }) {
      assertNear(n1 * lg(b1, b1 ** m1), n1 * m1, "first");
      assertNear(lg(b2, (b2 ** m2) ** n2), n2 * m2, "second");
      assertNear(lg(b3, radicand ** (1 / root)), m3, "third");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "change-of-base",
    skill: "solve",
    make(r) {
      const b = r.pick([3, 5, 6, 7, 8]);
      const c = r.int(11, 200);
      const approx = roundTo(Math.log(c) / Math.log(b), 3);
      if (Math.abs(approx * 1000 - Math.round(approx * 1000)) > 1e-6) reject("rounding");
      const R = r.pick([2, 3, 5]);
      const p = r.int(2, 4);
      const options = r.shuffle([
        "(ln x)/(ln b)",
        "(ln b)/(ln x)",
        "(ln x)(ln b)",
        "ln(x/b)",
      ]);
      return problem({
        stem: "Use the change of base property of logarithms.",
        parts: [
          part(
            `Use ln to approximate ${L(b, c)}. Round your answer to three decimal places.`,
            ask.number(`${L(b, c)} ≈`, approx, { decimals: 3 }),
          ),
          part(
            `The function g(x) = ${logWord(R ** p)} x can be written as g(x) = k ${logWord(R)} x. Find k.`,
            ask.number("k =", new Q(1, p)),
          ),
          part(
            "Which expression is equal to log_b x, where b > 0 and b ≠ 1?",
            ask.choice("log_b x =", options, "(ln x)/(ln b)"),
          ),
        ],
        solution: [
          `${L(b, c)} = (ln ${c})/(ln ${b}) ≈ ${approx.toFixed(3)}.`,
          `By the change of base property, ${logWord(R ** p)} x = (${logWord(R)} x)/(${L(R, R ** p)}) = (${logWord(R)} x)/${p}, so k = 1/${p}.`,
          "The change of base property states that log_b x = (log_a x)/(log_a b). With a = e, log_b x = (ln x)/(ln b).",
        ],
        data: { b, c, approx, R, p },
      });
    },
    verify({ data: { b, c, approx, R, p } }) {
      assert(Math.abs(lg(b, c) - approx) < 0.0006, "approximation");
      for (const x of [0.4, 2, 9])
        assertNear(lg(R ** p, x), lg(R, x) / p, "change of base");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "power-property",
    skill: "equivalent-forms",
    make(r) {
      const b1 = r.pick([2, 3, 5]);
      const a1 = r.int(2, 4);
      const c1 = r.pick([2, 3, 5, 7].filter((v) => v !== b1));
      const b2 = r.pick([2, 3, 4, 5]);
      const k2 = r.int(2, 4);
      const m2 = r.nonzero(-4, 4);
      // ln p^m − ln q^n with p^m / q^n an integer.
      const p3 = r.int(3, 9);
      const squares = p3 * p3;
      const divisors = [];
      for (let q = 2; q < squares; q += 1)
        if (squares % q === 0 && squares / q >= 2 && q !== p3) divisors.push(q);
      if (divisors.length === 0) reject("no divisor");
      const q3 = r.pick(divisors);
      const result = squares / q3;
      return problem({
        stem: "Write each expression as a single logarithm.",
        parts: [
          part(
            `${a1} ${logWord(b1)} x + ${logWord(b1)} ${c1}`,
            ask.expr("Single logarithm:", `log(${c1}*x^${a1}, ${b1})`, {
              form: "single-log",
              strict: false,
              text: `${logWord(b1)}(${c1}x${sup(a1)})`,
            }),
          ),
          part(
            `${logWord(b2)} x − ${k2} ${logWord(b2)}(${plusK(m2)})`,
            ask.expr("Single logarithm:", `log(x/(x + (${m2}))^${k2}, ${b2})`, {
              form: "single-log",
              strict: false,
              text: `${logWord(b2)}(x/(${plusK(m2)})${sup(k2)})`,
            }),
          ),
          part(
            `2 ln ${p3} − ln ${q3}`,
            ask.expr("Single logarithm:", `ln(${result})`, {
              form: "single-log",
              strict: false,
              text: `ln(${result})`,
            }),
          ),
        ],
        solution: [
          `By the power property, ${a1} ${logWord(b1)} x = ${logWord(b1)}(x${sup(a1)}). By the product property, ${logWord(b1)}(x${sup(a1)}) + ${logWord(b1)} ${c1} = ${logWord(b1)}(${c1}x${sup(a1)}).`,
          `By the power property, ${k2} ${logWord(b2)}(${plusK(m2)}) = ${logWord(b2)}((${plusK(m2)})${sup(k2)}). By the quotient property, the expression equals ${logWord(b2)}(x/(${plusK(m2)})${sup(k2)}).`,
          `2 ln ${p3} − ln ${q3} = ln ${p3}² − ln ${q3} = ln ${squares} − ln ${q3} = ln(${squares}/${q3}) = ln ${result}.`,
        ],
        data: { b1, a1, c1, b2, k2, m2, p3, q3, result },
      });
    },
    verify({ data: { b1, a1, c1, b2, k2, m2, p3, q3, result } }) {
      for (const x of [1.5, 2, 5, 9]) {
        assertNear(
          a1 * lg(b1, x) + lg(b1, c1),
          lg(b1, c1 * x ** a1),
          "first combination",
        );
        if (x + m2 > 0)
          assertNear(
            lg(b2, x) - k2 * lg(b2, x + m2),
            lg(b2, x / (x + m2) ** k2),
            "second combination",
          );
      }
      assertNear(2 * Math.log(p3) - Math.log(q3), Math.log(result), "third combination");
      assert(Number.isInteger(result), "an integer result");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "product-property",
    skill: "equivalent-forms",
    make(r) {
      const b1 = r.pick([2, 3, 5]);
      const c1 = r.pick([2, 3, 5, 7].filter((v) => v !== b1));
      const n1 = r.int(2, 4);
      const b2 = r.pick([2, 3, 5]);
      const m2 = r.int(2, 4);
      const n2 = r.int(2, 5);
      const m3 = r.int(2, 3);
      const n3 = r.int(2, 4);
      const c3 = r.nonzero(-5, 5);
      return problem({
        stem: "Expand each logarithm using the product, quotient, and power properties.",
        parts: [
          part(
            `${logWord(b1)}(${c1}x${sup(n1)})`,
            ask.expr("Expanded form:", `log(${c1}, ${b1}) + ${n1}*log(x, ${b1})`, {
              form: "log-sum",
              strict: false,
              text: `${logWord(b1)}(${c1}) + ${withCoefficient(n1, logText(b1, "x"))}`,
            }),
          ),
          part(
            `${logWord(b2)}(x${sup(m2)}/y${sup(n2)})`,
            ask.expr("Expanded form:", `${m2}*log(x, ${b2}) - ${n2}*log(y, ${b2})`, {
              form: "log-sum",
              strict: false,
              vars: ["x", "y"],
              text: `${withCoefficient(m2, logText(b2, "x"))} − ${withCoefficient(n2, logText(b2, "y"))}`,
            }),
          ),
          part(
            `ln(x${sup(m3)}(${plusK(c3)})${sup(n3)})`,
            ask.expr("Expanded form:", `${m3}*ln(x) + ${n3}*ln(x + (${c3}))`, {
              form: "log-sum",
              strict: false,
              text: `${withCoefficient(m3, "ln(x)")} + ${withCoefficient(n3, `ln(${plusK(c3)})`)}`,
            }),
          ),
        ],
        solution: [
          `By the product property, ${logWord(b1)}(${c1}x${sup(n1)}) = ${logWord(b1)} ${c1} + ${logWord(b1)}(x${sup(n1)}). By the power property, ${logWord(b1)}(x${sup(n1)}) = ${n1} ${logWord(b1)} x.`,
          `By the quotient property, ${logWord(b2)}(x${sup(m2)}/y${sup(n2)}) = ${logWord(b2)}(x${sup(m2)}) − ${logWord(b2)}(y${sup(n2)}). By the power property, this is ${m2} ${logWord(b2)} x − ${n2} ${logWord(b2)} y.`,
          `By the product property, ln(x${sup(m3)}(${plusK(c3)})${sup(n3)}) = ln(x${sup(m3)}) + ln((${plusK(c3)})${sup(n3)}). By the power property, this is ${m3} ln x + ${n3} ln(${plusK(c3)}).`,
        ],
        data: { b1, c1, n1, b2, m2, n2, m3, n3, c3 },
      });
    },
    verify({ data: { b1, c1, n1, b2, m2, n2, m3, n3, c3 } }) {
      for (const x of [1.5, 2, 6]) {
        assertNear(lg(b1, c1 * x ** n1), lg(b1, c1) + n1 * lg(b1, x), "first expansion");
        if (x + c3 > 0)
          assertNear(
            Math.log(x ** m3 * (x + c3) ** n3),
            m3 * Math.log(x) + n3 * Math.log(x + c3),
            "third expansion",
          );
      }
      assertNear(
        lg(b2, 3 ** m2 / 2 ** n2),
        m2 * lg(b2, 3) - n2 * lg(b2, 2),
        "second expansion",
      );
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "product-property",
    skill: "apply-results",
    make(r) {
      const context = r.pick(CONTEXTS);
      const c = context.c;
      const m = r.pick(context.steps);
      const k = r.pick([2, 3, 5]);
      const m2 = r.pick(context.steps);
      const target = c.mul(m2);
      const raising = target.value > 0;
      const approx = roundTo(c.value * Math.log10(k), 3);
      const cText = c.isInteger ? (c.n < 0 ? `(${num(c.n)})` : `${c.n}`) : `(${c})`;
      const approxText = `${approx < 0 ? "−" : ""}${Math.abs(approx).toFixed(3)}`;
      const unit = context.unit ? { unit: context.unit } : {};
      const amount = target.value > 0 ? target : target.neg();
      return problem({
        stem: context.stem,
        parts: [
          part(
            `The ${context.quantity} is multiplied by ${grouped(10 ** m)}. By how much does the ${context.out} change?`,
            ask.number("Change:", c.mul(m), unit),
          ),
          part(
            `The ${context.quantity} is multiplied by ${k}. By how much does the ${context.out} change? Round your answer to three decimal places.`,
            ask.number("Change ≈", approx, { decimals: 3, ...unit }),
          ),
          part(
            `By what factor must the ${context.quantity} be multiplied so that the ${context.out} ${raising ? "increases" : "decreases"} by ${text(amount)}${context.unit ? ` ${context.unit}` : ""}?`,
            ask.number("Factor:", 10 ** m2),
          ),
        ],
        solution: [
          `Multiplying the ${context.quantity} by ${grouped(10 ** m)} = 10${sup(m)} adds log 10${sup(m)} = ${m} to log(${context.X}), by the product property. The ${context.out} changes by ${cText}(${m}) = ${text(c.mul(m))}.`,
          `By the product property, the ${context.out} changes by ${cText} log ${k} ≈ ${approxText}.`,
          `A change of ${text(target)} means ${cText}(log F) = ${text(target)}, so log F = ${m2} and F = 10${sup(m2)} = ${grouped(10 ** m2)}.`,
        ],
        data: { c, m, k, m2, approx },
      });
    },
    verify({ data: { c, m, k, m2, approx } }) {
      assertNear(
        c.value * (Math.log10(10 ** m * 7) - Math.log10(7)),
        c.value * m,
        "power-of-ten change",
      );
      assertNear(
        c.value * (Math.log10(k * 7) - Math.log10(7)),
        approx,
        "change by k",
        0.0006,
      );
      assertNear(c.value * Math.log10(10 ** m2), c.value * m2, "target change");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "power-property",
    skill: "support-conclusions",
    make(r) {
      const masks = [
        [true, true, false],
        [true, false, true],
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ];
      const mask = r.pick(masks);
      const kinds = r.shuffle(["product", "quotient", "power", "base"]).slice(0, 3);
      const claims = kinds.map((kind, i) => claimFor(r, kind, mask[i]));
      return problem({
        stem: "Decide whether each equation is true or false.",
        parts: claims.map((c) =>
          part(
            c.statement,
            ask.choice("The equation is", ["true", "false"], c.truth ? "true" : "false"),
          ),
        ),
        solution: claims.map((c) => c.reason),
        data: { claims },
      });
    },
    verify({ data: { claims } }) {
      for (const c of claims)
        assert(Math.abs(c.lhs - c.rhs) < 1e-9 === c.truth, `claim "${c.statement}"`);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "change-of-base",
    skill: "apply-results",
    make(r) {
      const R = r.pick([2, 3, 5]);
      const p = r.int(2, 4);
      const B = R ** p;
      const b2 = r.pick([2, 3, 4, 5, 6, 7, 8, 9]);
      const c2 = roundTo(1 / Math.log(b2), 3);
      const v = r.pick(
        [3, 5, 6, 7, 10, 11, 12, 13].filter((n) => n !== R && n % R !== 0 && n !== B),
      );
      const given = roundTo(lg(R, v), 3);
      const wanted = roundTo(given / p, 3);
      return problem({
        stem: "All logarithmic functions are vertical dilations of each other.",
        parts: [
          part(
            `The function g(x) = ${logWord(B)} x can be written as g(x) = k ${logWord(R)} x. Find k.`,
            ask.number("k =", new Q(1, p)),
          ),
          part(
            `The function h(x) = ${logWord(b2)} x can be written as h(x) = c ln x. Find c. Round your answer to three decimal places.`,
            ask.number("c ≈", c2, { decimals: 3 }),
          ),
          part(
            `It is known that ${L(R, v)} ≈ ${given.toFixed(3)}. Use this to approximate ${L(B, v)} to three decimal places.`,
            ask.number(`${L(B, v)} ≈`, wanted, { decimals: 3 }),
          ),
        ],
        solution: [
          `By the change of base property, ${logWord(B)} x = (${logWord(R)} x)/(${L(R, B)}) = (${logWord(R)} x)/${p}. So k = 1/${p}, and the graph of g is a vertical dilation of the graph of y = ${logWord(R)} x by a factor of 1/${p}.`,
          `${logWord(b2)} x = (ln x)/(ln ${b2}) = (1/ln ${b2}) ln x, so c = 1/ln ${b2} ≈ ${c2.toFixed(3)}.`,
          `${L(B, v)} = ${L(R, v)}/${p} ≈ ${given.toFixed(3)}/${p} ≈ ${wanted.toFixed(3)}.`,
        ],
        data: { R, p, B, b2, c2, v, given, wanted },
      });
    },
    verify({ data: { R, p, B, b2, c2, v, given, wanted } }) {
      assertNear(lg(B, 7), lg(R, 7) / p, "k");
      assert(Math.abs(1 / Math.log(b2) - c2) < 0.0006, "c");
      assert(Math.abs(lg(B, v) - wanted) < 0.0009, "the approximation");
      assert(Math.abs(lg(R, v) - given) < 0.0006, "given value");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "change-of-base",
    skill: "construct-representations",
    make(r) {
      // Either f uses the small base and g the large one (g shrinks f) or the reverse (g stretches f).
      const R = r.pick([2, 2, 3, 5]);
      const p = R === 2 ? r.int(2, 3) : 2;
      const B = R ** p;
      const shrink = r.chance(0.5);
      const baseF = shrink ? R : B;
      const baseG = shrink ? B : R;
      const k = shrink ? new Q(1, p) : new Q(p, 1);
      const factor = shrink ? `1/${p}` : String(p);
      const arg = B ** 2;
      const options = r.shuffle([
        `a vertical dilation by a factor of ${factor}`,
        `a horizontal dilation by a factor of ${shrink ? p : `1/${p}`}`,
        `a vertical translation ${shrink ? "down" : "up"} ${p} units`,
        "a reflection over the x-axis",
      ]);
      return problem({
        stem: `The graphs of f(x) = ${logWord(baseF)} x and g(x) = ${logWord(baseG)} x are shown. Points on the graphs are marked.`,
        blocks: [
          graph({
            caption: `The graphs of y = f(x) and y = g(x)`,
            alt: `Two increasing logarithmic curves that cross at (1, 0). The graph of f passes through (${B}, ${shrink ? p : 1}) and the graph of g passes through (${B}, ${shrink ? 1 : p}).`,
            window: { x: [-1, B + 2], y: [-4, 4] },
            ticks: { x: B > 12 ? 5 : B > 5 ? 2 : 1, y: 1 },
            functions: [
              { expr: `ln(x)/ln(${baseF})`, label: "f", color: 1 },
              { expr: `ln(x)/ln(${baseG})`, label: "g", color: 2 },
            ],
            points: [
              { at: [1, 0] },
              { at: [B, shrink ? p : 1] },
              { at: [B, shrink ? 1 : p] },
            ],
          }),
        ],
        parts: [
          part("Find the constant k such that g(x) = k f(x).", ask.number("k =", k)),
          part(`Find g(${arg}).`, ask.number(`g(${arg}) =`, shrink ? 2 : 2 * p)),
          part(
            "The graph of g is obtained from the graph of f by which transformation?",
            ask.choice(
              "Transformation:",
              options,
              `a vertical dilation by a factor of ${factor}`,
            ),
          ),
        ],
        solution: [
          shrink
            ? `The point (${B}, ${p}) is on the graph of f and (${B}, 1) is on the graph of g. At x = ${B}, g(${B}) = 1 = (1/${p})(${p}) = (1/${p}) f(${B}), so k = 1/${p}. The change of base property gives the same result: ${logWord(B)} x = (${logWord(R)} x)/${p}.`
            : `The point (${B}, 1) is on the graph of f and (${B}, ${p}) is on the graph of g. At x = ${B}, g(${B}) = ${p} = ${p}(1) = ${p} f(${B}), so k = ${p}. The change of base property gives the same result: ${logWord(R)} x = ${p}(${logWord(B)} x).`,
          shrink
            ? `g(${arg}) = (1/${p}) f(${arg}) = (1/${p})(${2 * p}) = 2.`
            : `g(${arg}) = ${p} f(${arg}) = ${p}(2) = ${2 * p}.`,
          `Every output of g is ${shrink ? `1/${p} of` : `${p} times`} the corresponding output of f, so the graph of g is a vertical dilation of the graph of f by a factor of ${factor}.`,
        ],
        data: { R, p, B, baseF, baseG, k: k.value, arg, shrink },
      });
    },
    verify({ data: { R, p, B, baseF, baseG, k, arg, shrink } }) {
      const f = fnOf(`log(x, ${baseF})`);
      const g = fnOf(`log(x, ${baseG})`);
      assertNear(f(B), shrink ? p : 1, "f at B");
      assertNear(g(B), shrink ? 1 : p, "g at B");
      for (const x of [0.5, 3, 9, 40]) assertNear(g(x), k * f(x), "vertical dilation");
      assertNear(g(arg), shrink ? 2 : 2 * p, "the evaluation");
      assertNear(Math.log(B) / Math.log(R), p, "B is R to the p");
    },
  },
];

const CONTEXTS = [
  {
    stem: "The loudness, in decibels, of a sound with intensity I is L = 10 log(I/I₀), where I₀ is a fixed reference intensity.",
    quantity: "intensity",
    out: "loudness",
    unit: "decibels",
    c: new Q(10),
    steps: [1, 2, 3, 4],
    X: "I/I₀",
  },
  {
    stem: "The magnitude of an earthquake that releases energy E is M = (2/3) log(E/E₀), where E₀ is a fixed reference energy.",
    quantity: "energy released",
    out: "magnitude",
    unit: "",
    c: new Q(2, 3),
    steps: [3, 6],
    X: "E/E₀",
  },
  {
    stem: "The pH of a solution with hydrogen ion concentration C, in moles per liter, is pH = −log C.",
    quantity: "concentration",
    out: "pH",
    unit: "",
    c: new Q(-1),
    steps: [1, 2, 3, 4],
    X: "C",
  },
];

// One true or false equation about the properties of logarithms, with numbers.
function claimFor(r, kind, truth) {
  const b = r.pick([2, 3, 5, 10]);
  const p = r.int(3, 12);
  const q = r.pick([2, 3, 4, 5, 6, 7].filter((v) => v !== p));
  const ln = Math.log;
  if (kind === "product") {
    const rhs = `${L(b, p)} + ${L(b, q)}`;
    const claimed = truth ? p * q : p + q;
    if (!truth && p + q === p * q) reject("coincidence");
    return {
      statement: `${L(b, claimed)} = ${rhs}`,
      truth,
      lhs: lg(b, claimed),
      rhs: lg(b, p) + lg(b, q),
      reason: truth
        ? `By the product property, ${rhs} = ${L(b, `${p}(${q})`)} = ${L(b, p * q)}, so the equation is true.`
        : `The product property gives ${rhs} = ${L(b, p * q)}, not ${L(b, p + q)}. The logarithm of a sum is not the sum of the logarithms, so the equation is false.`,
    };
  }
  if (kind === "quotient") {
    const t = r.int(2, 6);
    const top = q * t;
    const claimed = truth ? t : top - q;
    if (!truth && top - q === t) reject("coincidence");
    return {
      statement: `${L(b, top)} − ${L(b, q)} = ${L(b, claimed)}`,
      truth,
      lhs: lg(b, top) - lg(b, q),
      rhs: lg(b, claimed),
      reason: truth
        ? `By the quotient property, ${L(b, top)} − ${L(b, q)} = ${L(b, `${top}/${q}`)} = ${L(b, t)}, so the equation is true.`
        : `By the quotient property, ${L(b, top)} − ${L(b, q)} = ${L(b, `${top}/${q}`)} = ${L(b, t)}. The difference of logarithms is the logarithm of a quotient, not of a difference, so the equation is false.`,
    };
  }
  if (kind === "power") {
    const n = r.int(2, 3);
    const small = r.int(3, 9);
    const lhsText = L(b, small ** n);
    const rhsText = truth ? `${n} ${L(b, small)}` : `(${L(b, small)})${sup(n)}`;
    const rhsValue = truth ? n * lg(b, small) : lg(b, small) ** n;
    if (!truth && Math.abs(rhsValue - lg(b, small ** n)) < 1e-6) reject("coincidence");
    return {
      statement: `${lhsText} = ${rhsText}`,
      truth,
      lhs: lg(b, small ** n),
      rhs: rhsValue,
      reason: truth
        ? `By the power property, ${lhsText} = ${n} ${L(b, small)}, so the equation is true.`
        : `By the power property, ${lhsText} = ${n} ${L(b, small)}. The exponent becomes a coefficient, not an exponent on the logarithm, so the equation is false.`,
    };
  }
  if (p === b) reject("the argument equals the base");
  const sides = truth ? `ln ${p} / ln ${b}` : `ln ${b} / ln ${p}`;
  return {
    statement: `${L(b, p)} = ${sides}`,
    truth,
    lhs: lg(b, p),
    rhs: truth ? ln(p) / ln(b) : ln(b) / ln(p),
    reason: truth
      ? `By the change of base property, ${L(b, p)} = (ln ${p})/(ln ${b}), so the equation is true.`
      : `By the change of base property, ${L(b, p)} = (ln ${p})/(ln ${b}), with the logarithm of the argument in the numerator. The equation reverses them, so it is false.`,
  };
}

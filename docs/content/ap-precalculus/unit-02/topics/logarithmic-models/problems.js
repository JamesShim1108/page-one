// Typed-answer problems for Topic 2.14. Each template draws new numbers for every
// variant. verify() rebuilds each model from the displayed information and checks
// every answer against it, so a slip in a key and a slip in the stem cannot both survive.

import {
  ask,
  part,
  problem,
  table,
  num,
  fixed,
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

const grouped = (n) => n.toLocaleString("en-US");
const logWord = (b) => (b === 10 ? "log" : `log${sub(b)}`);
const supInt = (n) => `${n < 0 ? "⁻" : ""}${sup(Math.abs(n))}`;
const powText = (base, n) => `${base}${supInt(n)}`;
const pow10 = (n) => (n === 1 ? "10" : powText(10, n));
const plusC = (c) => `${c < 0 ? "−" : "+"} ${Math.abs(c)}`;
const WORDS = ["zero", "once", "twice", "three times", "four times", "five times"];
const once = (n) => WORDS[n];
// "2b = 10, so b = 5", or just "b = 5" when the coefficient is 1.
const solved = (n, v, rhs, answer) =>
  n === 1 ? `${v} = ${answer}` : `${n}${v} = ${rhs}, so ${v} = ${answer}`;
const coef = (n, v) => (n === 1 ? v : `${n}${v}`);
// "7 + 3 log₂ x": the constant first, then the multiple of the logarithm.
const modelText = (A, B, b, v = "x") =>
  `${num(A)} ${B < 0 ? "−" : "+"} ${Math.abs(B) === 1 ? "" : `${Math.abs(B)} `}${logWord(b)} ${v}`;

const RATINGS = [
  {
    input: "I",
    output: "L",
    caption: "Loudness rating L for sounds of intensity I",
    what: "loudness rating",
    subject: "a sound with intensity",
    stem: "The table gives a loudness rating L for sounds of intensity I, in relative units.",
  },
  {
    input: "E",
    output: "M",
    caption: "Magnitude rating M for events releasing energy E",
    what: "magnitude rating",
    subject: "an event that releases energy",
    stem: "The table gives a magnitude rating M for events that release energy E, in relative units.",
  },
];

const intro = ({ input, output, what, subject }, a, b) =>
  `The model ${output}(${input}) = ${a} ${logWord(b)} ${input} gives the ${what} ${output} of ${subject} ${input}, where ${input} > 0.`;

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "log-models",
    skill: "identify-information",
    make(r) {
      const b = r.pick([2, 3, 5, 10]);
      const a = r.pick([2, 3, 4, 5, 10]);
      const context = r.pick(RATINGS);
      const { input, output } = context;
      const steps = [0, 1, 2, 3, 4];
      const inputs = steps.map((i) => b ** i);
      const options = ["additively", "multiplicatively"];
      return problem({
        stem: context.stem,
        blocks: [
          table(
            context.caption,
            [input, ...inputs.map(grouped)],
            [[output, ...steps.map((i) => num(a * i))]],
          ),
        ],
        parts: [
          part(
            `Each time ${output} increases by ${a}, how does ${input} change?`,
            ask.choice(`${input} changes`, r.shuffle(options), "multiplicatively"),
          ),
          part(
            `By what factor is ${input} multiplied each time ${output} increases by ${a}?`,
            ask.number("Factor:", b),
          ),
          part(
            `Write a logarithmic model ${output}(${input}) for the table.`,
            ask.expr(`${output}(${input}) =`, `${a}*log(${input}, ${b})`, {
              vars: [input],
              text: `${a}${logText(b, input)}`,
            }),
          ),
        ],
        solution: [
          `The values of ${input} are ${inputs.map(grouped).join(", ")}. Each is ${b} times the one before, while ${output} increases by the same amount, ${a}, each time. So ${input} changes multiplicatively over equal-length intervals of ${output}.`,
          `Each value of ${input} is ${b} times the one before it, so the factor is ${b}.`,
          `${output} = ${a} when ${input} = ${b}, so ${output}(${input}) = ${a} ${logWord(b)} ${input}. Check: ${output}(${grouped(b ** 3)}) = ${a}(3) = ${a * 3}, which matches the table.`,
        ],
        data: { a, b, inputs },
      });
    },
    verify({ data: { a, b, inputs } }) {
      inputs.forEach((x, i) => assertNear(a * lg(b, x), a * i, "table value"));
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "building",
    skill: "construct-functions",
    make(r) {
      const b = r.pick([2, 3, 5]);
      const i = r.int(0, 2);
      const j = r.int(i + 1, b === 5 ? 3 : 4);
      const B = r.pick([-4, -3, -2, 2, 3, 4, 5]);
      const A = r.nonzero(-8, 12);
      const m = r.pick([1, 2, 3, 4].filter((v) => v !== i && v !== j && b ** v <= 700));
      const y1 = A + B * i;
      const y2 = A + B * j;
      const eq = (e, y) =>
        e === 0 ? `a = ${num(y)}` : `a + ${coef(e, "b")} = ${num(y)}`;
      return problem({
        stem: `A model of the form y = a + b ${logWord(b)} x passes through the points (${b ** i}, ${num(y1)}) and (${b ** j}, ${num(y2)}).`,
        parts: [
          part("Find b.", ask.number("b =", B)),
          part("Find a.", ask.number("a =", A)),
          part(
            `Use the model to find y when x = ${b ** m}.`,
            ask.number(`y(${b ** m}) =`, A + B * m),
          ),
        ],
        solution: [
          `Since ${logText(b, b ** i)} = ${i} and ${logText(b, b ** j)} = ${j}, the two points give ${eq(i, y1)} and ${eq(j, y2)}. Subtracting the first equation from the second leaves ${solved(j - i, "b", num(y2 - y1), num(B))}.`,
          i === 0
            ? `The first equation gives a = ${num(A)}. The model is y = ${modelText(A, B, b)}.`
            : `Substituting b = ${num(B)} into ${eq(i, y1)} gives a = ${num(A)}. The model is y = ${modelText(A, B, b)}.`,
          `Since ${logText(b, b ** m)} = ${m}, y(${b ** m}) = ${num(A)} ${plusC(B)}(${m}) = ${num(A + B * m)}.`,
        ],
        data: { b, i, j, A, B, m, y1, y2 },
      });
    },
    verify({ data: { b, i, j, A, B, m, y1, y2 } }) {
      const f = (x) => A + B * lg(b, x);
      assertNear(f(b ** i), y1, "first point");
      assertNear(f(b ** j), y2, "second point");
      assertNear(f(b ** m), A + B * m, "prediction");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "using",
    skill: "solve",
    make(r) {
      const b = r.pick([2, 3, 5]);
      const B = r.pick([-3, -2, 2, 3, 4, 5]);
      const A = r.nonzero(-6, 12);
      const top = b === 5 ? 3 : 5;
      const m = r.int(2, top);
      const n = r.pick([2, 3, 4, 5].filter((v) => v <= top && v !== m));
      const k = r.int(2, 3);
      const target = A + B * n;
      return problem({
        stem: `A situation is modeled by y = ${modelText(A, B, b)}, where x > 0.`,
        parts: [
          part(`Predict y when x = ${b ** m}.`, ask.number(`y(${b ** m}) =`, A + B * m)),
          part(`Find x when y = ${num(target)}.`, ask.number("x =", b ** n)),
          part(
            `By how much does y change when x is multiplied by ${b ** k}?`,
            ask.number("Change in y:", B * k),
          ),
        ],
        solution: [
          `y(${b ** m}) = ${num(A)} ${plusC(B)} ${logText(b, b ** m)} = ${num(A)} ${plusC(B)}(${m}) = ${num(A + B * m)}.`,
          `Solve ${num(A)} ${plusC(B)} ${logWord(b)} x = ${num(target)}: ${num(B)} ${logWord(b)} x = ${num(target - A)}, so ${logWord(b)} x = ${n}. In exponential form, x = ${powText(b, n)} = ${b ** n}.`,
          `${b ** k} = ${powText(b, k)}, so multiplying x by ${b ** k} is multiplying by ${b} ${once(k)}. Each multiplication by ${b} changes y by ${num(B)}, so y changes by ${num(B)}(${k}) = ${num(B * k)}.`,
        ],
        data: { b, B, A, m, n, k, target },
      });
    },
    verify({ data: { b, B, A, m, n, k, target } }) {
      const f = (x) => A + B * lg(b, x);
      assertNear(f(b ** m), A + B * m, "prediction");
      assertNear(f(b ** n), target, "inverse");
      assertNear(f(7 * b ** k) - f(7), B * k, "change");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "log-models",
    skill: "describe",
    make(r) {
      const b = r.pick([2, 3, 5, 10]);
      const a = r.pick([2, 3, 4, 5, 10]);
      const top = b === 10 ? 4 : b === 5 ? 3 : b === 3 ? 4 : 5;
      const n = r.int(2, top);
      const k = r.pick([2, 3, 4, 5].filter((v) => v <= top && v !== n));
      const context = r.pick(RATINGS);
      const { input, output } = context;
      const shapes = [
        "increasing and concave down",
        "increasing and concave up",
        "decreasing and concave down",
        "decreasing and concave up",
      ];
      return problem({
        stem: intro(context, a, b),
        parts: [
          part(
            `The input ${input} = 1 gives ${output} = 0. How many times must ${input} be multiplied by ${b} for ${output} to reach ${a * n}?`,
            ask.number("Number of times:", n),
          ),
          part(
            `Find ${input} when ${output} = ${a * k}.`,
            ask.number(`${input} =`, b ** k),
          ),
          part(
            `Which description of the graph of ${output} is correct?`,
            ask.choice(`The graph of ${output} is`, r.shuffle(shapes), shapes[0]),
          ),
        ],
        solution: [
          `${output} = ${a * n} means ${a} ${logWord(b)} ${input} = ${a * n}, so ${logWord(b)} ${input} = ${n} and ${input} = ${powText(b, n)}. Starting from ${input} = 1, the input has been multiplied by ${b} ${once(n)}.`,
          `${a} ${logWord(b)} ${input} = ${a * k}, so ${logWord(b)} ${input} = ${k} and ${input} = ${powText(b, k)} = ${b ** k}.`,
          `Since a = ${a} > 0 and the base ${b} is greater than 1, the graph is increasing and concave down. Each multiplication by ${b} adds the same ${a} to ${output}, but it takes a larger and larger input to do so.`,
        ],
        data: { a, b, n, k },
      });
    },
    verify({ data: { a, b, n, k } }) {
      assertNear(lg(b, b ** n), n, "number of multiplications");
      assertNear(a * lg(b, b ** k), a * k, "input");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "building",
    skill: "construct-functions",
    make(r) {
      const z = r.pick([2, 3, 4, 5, 6, 7, 10]);
      const b = r.pick([2, 3, 4, 5, 10]);
      const a = r.pick([2, 3, 4, 5, -2, -3, -4]);
      const m = r.int(2, b >= 5 ? 2 : 3);
      const n = r.int(1, 2);
      const low = new Q(z, b ** n);
      const word = a > 0 ? "increases" : "decreases";
      return problem({
        stem: `A logarithmic model f satisfies f(${z}) = 0. Each time x is multiplied by ${b}, f(x) ${word} by ${Math.abs(a)}.`,
        parts: [
          part(`Find f(${z * b ** m}).`, ask.number(`f(${z * b ** m}) =`, a * m)),
          part(
            `Find f(${low.toString()}).`,
            ask.number(`f(${low.toString()}) =`, -a * n),
          ),
          part(
            "Write an expression for f(x).",
            ask.expr("f(x) =", `(${a})*log(x/${z}, ${b})`, {
              text: `${a === 1 ? "" : num(a)}${logText(b, `x/${z}`)}`,
            }),
          ),
        ],
        solution: [
          `${z * b ** m} = ${z}(${b ** m}), so starting from x = ${z}, x has been multiplied by ${b} ${once(m)}. Each multiplication changes f by ${num(a)}, so f(${z * b ** m}) = ${num(a)}(${m}) = ${num(a * m)}.`,
          `${low.toString()} is ${z} divided by ${b} ${once(n)}, so f has moved ${n === 1 ? "one step" : `${n} steps`} the other way from f(${z}) = 0: f(${low.toString()}) = ${num(-a * n)}.`,
          `The zero is at x = ${z}, so the input of the logarithm is x/${z}. Multiplying x by ${b} changes f(x) by ${num(a)}, so f(x) = ${num(a)} ${logWord(b)}(x/${z}).`,
        ],
        data: { z, b, a, m, n },
      });
    },
    verify({ data: { z, b, a, m, n } }) {
      const f = fnOf(`(${a})*log(x/${z}, ${b})`);
      assertNear(f(z), 0, "zero");
      assertNear(f(z * b ** m), a * m, "far value");
      assertNear(f(z / b ** n), -a * n, "near value");
      assertNear(f(7 * b) - f(7), a, "step change");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "building",
    skill: "solve",
    make(r) {
      const b = r.pick([2, 3, 5]);
      const small = b === 5;
      const u = r.pick([3, 5, 7].filter((v) => v !== b));
      const s = small ? 1 : r.int(1, 2);
      const k = small ? 1 : r.int(1, 2);
      const m = small ? 1 : r.int(1, 2);
      const x1 = u * b ** s;
      const x2 = x1 * b ** k;
      if (x2 * b ** m > 1500) reject("inputs too large");
      const B = r.pick([-4, -3, -2, 2, 3, 4, 5]);
      const y1 = r.int(-5, 15);
      const y2 = y1 + B * k;
      return problem({
        stem: `A model of the form y = a + b ${logWord(b)} x passes through the points (${x1}, ${num(y1)}) and (${x2}, ${num(y2)}).`,
        parts: [
          part(
            `How much does y change each time x is multiplied by ${b}?`,
            ask.number("Change in y:", B),
          ),
          part(
            `Find y when x = ${x2 * b ** m}.`,
            ask.number(`y(${x2 * b ** m}) =`, y2 + B * m),
          ),
          part(`Find y when x = ${u}.`, ask.number(`y(${u}) =`, y1 - B * s)),
        ],
        solution: [
          `${x2}/${x1} = ${b ** k}, so x was multiplied by ${b} ${once(k)} while y went from ${num(y1)} to ${num(y2)}, a change of ${num(y2 - y1)}.${k === 1 ? "" : ` Each multiplication by ${b} changes y by ${num(y2 - y1)}/${k} = ${num(B)}.`} So y changes by ${num(B)} each time x is multiplied by ${b}.`,
          `${x2 * b ** m} = ${x2}(${b ** m}), so x is multiplied by ${b} ${once(m)} more and y changes by ${num(B * m)}. Then y = ${num(y2)} ${plusC(B * m)} = ${num(y2 + B * m)}.`,
          `${u} = ${x1}/${b ** s}, so x is divided by ${b} ${once(s)} and y changes by ${num(-B * s)}. Then y = ${num(y1)} ${plusC(-B * s)} = ${num(y1 - B * s)} when x = ${u}.`,
        ],
        data: { b, u, s, x1, x2, k, B, y1, y2, m },
      });
    },
    verify({ data: { b, u, s, x1, x2, k, B, y1, y2, m } }) {
      const A = y1 - B * lg(b, x1);
      const f = (x) => A + B * lg(b, x);
      assertNear(f(x2), y2, "second point");
      assertNear(f(x2 * b ** m), y2 + B * m, "prediction");
      assertNear(f(u), y1 - B * s, "extrapolation");
      assert(x1 === u * b ** s && x2 === x1 * b ** k, "inputs");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "building",
    skill: "apply-results",
    make(r) {
      const b = r.pick([2, 3]);
      const h = r.pick([-2, -1, 1, 2, 3]);
      const exps = [0, 1, 2, 3, 4].filter((e) => b ** e - h >= 0 && b ** e - h <= 40);
      if (exps.length < 3) reject("too few usable inputs");
      const [i, j, m] = r.sample(exps, 3);
      const [lo, hi] = i < j ? [i, j] : [j, i];
      const a = r.pick([2, 3, 4, 5]);
      const k = r.int(0, 9);
      const context = r.pick(SHIFTED);
      const x1 = b ** lo - h;
      const x2 = b ** hi - h;
      const y1 = a * lo + k;
      const y2 = a * hi + k;
      const xm = b ** m - h;
      const eq = (e, y) => `${e === 0 ? "" : e === 1 ? "a + " : `${e}a + `}k = ${num(y)}`;
      return problem({
        stem: `${context.intro(b, h)} The model passes through the points (${x1}, ${num(y1)}) and (${x2}, ${num(y2)}).`,
        parts: [
          part("Find a.", ask.number("a =", a)),
          part("Find k.", ask.number("k =", k)),
          part(
            `Use the model to find ${context.name} when ${context.input} = ${xm}.`,
            ask.number(`${context.name}(${xm}) =`, a * m + k),
          ),
        ],
        solution: [
          `At ${context.input} = ${x1}, the input of the logarithm is ${x1} ${plusC(h)} = ${b ** lo}, and ${logText(b, b ** lo)} = ${lo}. At ${context.input} = ${x2}, the input is ${b ** hi} and ${logText(b, b ** hi)} = ${hi}. So ${eq(lo, y1)} and ${eq(hi, y2)}. Subtracting the first equation from the second leaves ${solved(hi - lo, "a", num(y2 - y1), num(a))}.`,
          lo === 0
            ? `The first equation gives k = ${num(k)}.`
            : `Substituting a = ${num(a)} into ${eq(lo, y1)} gives k = ${num(k)}.`,
          `At ${context.input} = ${xm}, the input of the logarithm is ${xm} ${plusC(h)} = ${b ** m}, so ${logText(b, b ** m)} = ${m} and ${context.name} = ${num(a)}(${m}) ${plusC(k)} = ${num(a * m + k)}.`,
        ],
        data: { b, h, a, k, m, x1, x2, xm, y1, y2 },
      });
    },
    verify({ data: { b, h, a, k, m, x1, x2, xm, y1, y2 } }) {
      const f = (x) => a * lg(b, x + h) + k;
      assertNear(f(x1), y1, "first point");
      assertNear(f(x2), y2, "second point");
      assertNear(f(xm), a * m + k, "prediction");
      assert(x1 >= 0 && x2 >= 0 && xm >= 0, "inputs are not negative");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "log-models",
    skill: "support-conclusions",
    make(r) {
      const b = r.pick([2, 3, 5, 10]);
      const a = r.pick([2, 3, 4, 5, 8, 10]);
      const context = r.pick(RATINGS);
      const mask = r.pick([
        [true, true, false],
        [true, false, true],
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      const kinds = r.shuffle(["step", "product", "rate", "double"]).slice(0, 3);
      const claims = kinds.map((kind, idx) =>
        claimFor(r, kind, mask[idx], { a, b, context }),
      );
      return problem({
        stem: `${intro(context, a, b)} Decide whether each statement is true or false.`,
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
      for (const c of claims)
        assert(typeof c.truth === "boolean" && c.reason.length > 0, "claim");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "using",
    skill: "apply-results",
    make(r) {
      const context = r.pick(SCALES);
      const c = r.pick([1.5, 2.4, 3.2, 4.8, 6.3, 7.5]);
      const k = r.int(3, 8);
      const output = roundTo(context.measure(c * 10 ** -k), 3);
      const P = context.target(r);
      const e = context.exponent(P);
      const m = -Math.floor(e);
      const frac = e + m;
      if (frac < 0.03 || frac > 0.97) reject("too close to a power of ten");
      const coefficient = roundTo(10 ** frac, 3);
      const delta = context.delta(r);
      const exponent = delta / context.s;
      const direction = delta > 0 ? "increases" : "decreases";
      return problem({
        stem: context.stem,
        parts: [
          part(
            `Find the ${context.out} when the ${context.noun} is ${c} × ${pow10(-k)} ${context.concUnit}. Round your answer to three decimal places.`,
            ask.number(`${context.sym} ≈`, output, { decimals: 3 }),
          ),
          part(
            `${context.sample(P)} Its ${context.noun} can be written as c × ${pow10(-m)} ${context.concUnit}, where 1 ≤ c < 10. Find c. Round your answer to three decimal places.`,
            ask.number("c ≈", coefficient, { decimals: 3 }),
          ),
          part(
            `By what factor is the ${context.noun} multiplied when the ${context.out} ${direction} by ${Math.abs(delta)}?`,
            ask.number("Factor:", 10 ** exponent),
          ),
        ],
        solution: [
          `${context.sym} = ${context.formula(`${c} × ${pow10(-k)}`)} ≈ ${fixed(output, 3)}.`,
          `${context.inverse(P)} So the ${context.noun} is 10 raised to the power ${num(roundTo(e, 3))}, which equals ${coefficient.toFixed(3)} × ${pow10(-m)} ${context.concUnit}. Then c ≈ ${coefficient.toFixed(3)}.`,
          `A change of ${num(delta)} in the ${context.out} changes the logarithm of the ${context.noun} by ${num(exponent)}, so the ${context.noun} is multiplied by ${exponent === 1 ? "10" : `${pow10(exponent)} = ${grouped(10 ** exponent)}`}.`,
        ],
        data: { context, c, k, output, P, m, coefficient, exponent },
      });
    },
    verify({ data: { context, c, k, output, P, m, coefficient, exponent } }) {
      assertNear(context.measure(c * 10 ** -k), output, "output", 0.0006);
      assertNear(context.measure(coefficient * 10 ** -m), P, "coefficient", 0.0025);
      assert(coefficient >= 1 && coefficient < 10, "coefficient range");
      assert(Number.isFinite(10 ** exponent) && 10 ** exponent > 0, "factor");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "using",
    skill: "solve",
    make(r) {
      const A = r.pick([1.5, 2.8, 4.2, 5.6, 7.1]);
      const B = r.pick([1.2, 2.4, 3.1, 4.6, 5.3]);
      const x1 = r.int(5, 60);
      const x2 = r.int(8, 30);
      const T = roundTo(A + B * Math.log(x2), 1);
      const answer = roundTo(Math.exp((T - A) / B), 2);
      const doubling = roundTo(B * Math.log(2), 3);
      const context = r.pick(REGRESSION);
      const predicted = roundTo(A + B * Math.log(x1), 3);
      return problem({
        stem: context.stem(A, B),
        parts: [
          part(
            `Predict ${context.output} when ${context.input} = ${x1}. Round your answer to three decimal places.`,
            ask.number(`${context.output} ≈`, predicted, { decimals: 3 }),
          ),
          part(
            `For what value of ${context.input} does the model give ${context.output} = ${num(T)}? Round your answer to two decimal places.`,
            ask.number(`${context.input} ≈`, answer, { decimals: 2 }),
          ),
          part(
            `By how much does the model's ${context.output} increase each time ${context.input} is doubled? Round your answer to three decimal places.`,
            ask.number("Increase ≈", doubling, { decimals: 3 }),
          ),
        ],
        solution: [
          `${context.output}(${x1}) = ${num(A)} + ${num(B)} ln ${x1} ≈ ${predicted.toFixed(3)}.`,
          `Solve ${num(A)} + ${num(B)} ln ${context.input} = ${num(T)}: ln ${context.input} = (${num(T)} − ${num(A)})/${num(B)}, so ${context.input} = e^((${num(T)} − ${num(A)})/${num(B)}) ≈ ${answer.toFixed(2)}.`,
          `Doubling the input adds ${num(B)} ln 2 to the output, since ln(2${context.input}) = ln 2 + ln ${context.input}. So the increase is ${num(B)}(0.6931…) ≈ ${doubling.toFixed(3)}.`,
        ],
        data: { A, B, x1, T, answer, doubling, predicted },
      });
    },
    verify({ data: { A, B, x1, T, answer, doubling, predicted } }) {
      assertNear(A + B * Math.log(x1), predicted, "prediction", 0.0006);
      assertNear(Math.exp((T - A) / B), answer, "inverse", 0.006);
      assertNear(
        A + B * Math.log(2 * x1) - (A + B * Math.log(x1)),
        doubling,
        "doubling",
        0.0006,
      );
    },
  },
];

const SHIFTED = [
  {
    name: "S",
    input: "d",
    intro: (b, h) =>
      `A skill score S is modeled by S(d) = a ${logWord(b)}(d ${plusC(h)}) + k, where d is the number of days of training.`,
  },
  {
    name: "H",
    input: "t",
    intro: (b, h) =>
      `The height H, in centimeters, of a seedling is modeled by H(t) = a ${logWord(b)}(t ${plusC(h)}) + k, where t is the number of days after planting.`,
  },
  {
    name: "P",
    input: "w",
    intro: (b, h) =>
      `A productivity index P is modeled by P(w) = a ${logWord(b)}(w ${plusC(h)}) + k, where w is the number of weeks on a project.`,
  },
];

const SCALES = [
  {
    out: "pH",
    sym: "pH",
    noun: "hydrogen ion concentration",
    concUnit: "moles per liter",
    s: -1,
    stem: "The pH of a solution is pH = −log [H⁺], where [H⁺] is the hydrogen ion concentration in moles per liter.",
    measure: (conc) => -Math.log10(conc),
    exponent: (P) => -P,
    formula: (conc) => `−log(${conc})`,
    inverse: (P) => `pH = ${P} means −log [H⁺] = ${P}, so log [H⁺] = −${P}.`,
    sample: (P) => `A sample has a pH of ${P}.`,
    target: (r) => r.pick([3.2, 4.5, 5.3, 6.7, 7.4, 8.1]),
    delta: (r) => r.pick([-1, -2, -3, 1, 2]),
  },
  {
    out: "loudness",
    sym: "L",
    noun: "sound intensity",
    concUnit: "watts per square meter",
    s: 10,
    stem: "The loudness L of a sound, in decibels, is L = 10 log(I/10⁻¹²), where I is the sound intensity in watts per square meter.",
    measure: (conc) => 10 * Math.log10(conc / 1e-12),
    exponent: (P) => P / 10 - 12,
    formula: (conc) => `10 log(${conc}/10⁻¹²)`,
    inverse: (P) =>
      `L = ${P} means 10 log(I/10⁻¹²) = ${P}, so log(I/10⁻¹²) = ${P / 10} and log I = ${num(roundTo(P / 10 - 12, 3))}.`,
    sample: (P) => `A sound has a loudness of ${P} decibels.`,
    target: (r) => r.pick([42, 57, 63, 71, 85, 94]),
    delta: (r) => r.pick([10, 20, 30, 40]),
  },
];

const REGRESSION = [
  {
    input: "x",
    output: "y",
    stem: (A, B) =>
      `A logarithmic regression of a data set gives the model y = ${num(A)} + ${num(B)} ln x, where x ≥ 1.`,
  },
  {
    input: "t",
    output: "S",
    stem: (A, B) =>
      `A logarithmic regression models the sales S, in thousands of units, t months after a product launch as S(t) = ${num(A)} + ${num(B)} ln t, where t ≥ 1.`,
  },
];

// One true or false statement about the model f(x) = a log_b x.
function claimFor(r, kind, truth, { a, b, context }) {
  const { input, output } = context;
  const base = logWord(b);
  if (kind === "step") {
    const k = r.int(1, b === 10 ? 3 : 2);
    const claimed = truth ? a * k : a * b ** k;
    if (!truth && a * b ** k === a * k) reject("coincidence");
    return {
      truth,
      statement: `When ${input} is multiplied by ${b ** k}, ${output} increases by ${grouped(claimed)}.`,
      reason: `${k === 1 ? `Multiplying ${input} by ${b} adds ${a} to ${output}` : `${b ** k} = ${powText(b, k)}, so multiplying ${input} by ${b ** k} is multiplying by ${b} ${once(k)}, and ${output} increases by ${a}(${k}) = ${a * k}`}. ${truth ? "The statement is true." : `The increase is ${a * k}, not ${grouped(claimed)}, so the statement is false.`}`,
    };
  }
  if (kind === "product") {
    const p = r.pick([2, 3, 4, 5, 6]);
    const q = r.pick([2, 3, 4, 5, 7].filter((v) => v !== p));
    const shown = truth ? p * q : p + q;
    return {
      truth,
      statement: `${output}(${p}) + ${output}(${q}) = ${output}(${shown}).`,
      reason: `By the product property, ${output}(${p}) + ${output}(${q}) = ${a} ${base} ${p} + ${a} ${base} ${q} = ${a} ${base}(${p * q}) = ${output}(${p * q}). ${truth ? "The statement is true." : `The sum is ${output}(${p * q}), not ${output}(${p + q}), so the statement is false.`}`,
    };
  }
  if (kind === "rate") {
    return {
      truth,
      statement: `As ${input} increases, ${output} increases at ${truth ? "a decreasing" : "an increasing"} rate.`,
      reason: `Since a > 0 and the base ${b} is greater than 1, the graph of ${output} is increasing and concave down, so ${output} increases at a decreasing rate. ${truth ? "The statement is true." : "The statement is false."}`,
    };
  }
  return {
    truth,
    statement: truth
      ? `Each time ${input} is doubled, ${output} increases by the same amount.`
      : `Doubling ${input} always doubles ${output}.`,
    reason: `Doubling ${input} adds ${a} ${base} 2 to ${output}, because ${output}(2${input}) = ${a} ${base} 2 + ${a} ${base} ${input}. That is a fixed amount, not a doubling of ${output}. ${truth ? "The statement is true." : "The statement is false."}`,
  };
}

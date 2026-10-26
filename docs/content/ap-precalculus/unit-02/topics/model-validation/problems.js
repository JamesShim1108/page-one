// Typed-answer problems for Topic 2.6. Each template draws new numbers for every
// variant. Regression models are fitted in code from the generated data and rounded to
// three decimals, so the model a student sees is the one the keys use. verify() refits
// and recomputes each key from the displayed values.

import {
  ask,
  part,
  problem,
  table,
  graph,
  num,
  fnOf,
  assert,
  assertNear,
  reject,
  expText,
  roundTo,
} from "../../../../practice-kit/index.js";

const sum = (list) => list.reduce((total, value) => total + value, 0);
const round1 = (value) => Math.round(value * 10) / 10;
const r3 = (value) => roundTo(value, 3);
const sign = (value) => (value < 0 ? "−" : "+");
const money = (value) => Number(value).toLocaleString("en-US").replace("-", "−");

// "= 5" when a value is exact, "≈ 5.123" when it was rounded to three places.
function approx(raw) {
  const rounded = r3(raw);
  if (Math.abs(raw - rounded) < 1e-9) return `= ${money(rounded)}`;
  const text = rounded.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
  return `≈ ${text.replace("-", "−")}`;
}

// ---------------------------------------------------------------- regression

function linReg(xs, ys) {
  const n = xs.length;
  const sx = sum(xs);
  const sy = sum(ys);
  const sxx = sum(xs.map((x) => x * x));
  const sxy = sum(xs.map((x, i) => x * ys[i]));
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return { a: (sy - b * sx) / n, b };
}

function expReg(xs, ys) {
  const { a, b } = linReg(xs, ys.map(Math.log));
  return { a: Math.exp(a), b: Math.exp(b) };
}

function quadReg(xs, ys) {
  const n = xs.length;
  const S = (k) => sum(xs.map((x) => x ** k));
  const T = (k) => sum(xs.map((x, i) => x ** k * ys[i]));
  const m = [
    [S(4), S(3), S(2), T(2)],
    [S(3), S(2), S(1), T(1)],
    [S(2), S(1), n, T(0)],
  ];
  for (let col = 0; col < 3; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < 3; row += 1)
      if (Math.abs(m[row][col]) > Math.abs(m[pivot][col])) pivot = row;
    [m[col], m[pivot]] = [m[pivot], m[col]];
    for (let row = 0; row < 3; row += 1) {
      if (row === col) continue;
      const factor = m[row][col] / m[col][col];
      for (let k = col; k < 4; k += 1) m[row][k] -= factor * m[col][k];
    }
  }
  return { a: m[0][3] / m[0][0], b: m[1][3] / m[1][1], c: m[2][3] / m[2][2] };
}

// Models with coefficients rounded to three decimals, the way a calculator reports them.
function linearModel(xs, ys) {
  const { a, b } = linReg(xs, ys);
  const A = r3(a);
  const B = r3(b);
  return {
    kind: "linear",
    text: `y = ${num(A)} ${sign(B)} ${num(Math.abs(B))}x`,
    source: `(${A}) + (${B})*x`,
    substitute: (x) => `${num(A)} ${sign(B)} ${num(Math.abs(B))}(${num(x)})`,
    f: (x) => A + B * x,
  };
}

function exponentialModel(xs, ys) {
  const { a, b } = expReg(xs, ys);
  const A = r3(a);
  const B = r3(b);
  return {
    kind: "exponential",
    text: `y = ${expText(A, B, "x")}`,
    source: `(${A})*(${B})^x`,
    substitute: (x) => expText(A, B, num(x)),
    f: (x) => A * B ** x,
  };
}

function quadraticModel(xs, ys) {
  const { a, b, c } = quadReg(xs, ys);
  const A = r3(a);
  const B = r3(b);
  const C = r3(c);
  return {
    kind: "quadratic",
    text: `y = ${num(A)}x² ${sign(B)} ${num(Math.abs(B))}x ${sign(C)} ${num(Math.abs(C))}`,
    source: `(${A})*x^2 + (${B})*x + (${C})`,
    substitute: (x) =>
      `${num(A)}(${num(x)})² ${sign(B)} ${num(Math.abs(B))}(${num(x)}) ${sign(C)} ${num(Math.abs(C))}`,
    f: (x) => A * x * x + B * x + C,
    coefficients: { A, B, C },
  };
}

// ---------------------------------------------------------------- data sets

const EXP_CONTEXTS = [
  {
    x: "the number of weeks since a video was posted",
    y: "the number of views, in thousands",
  },
  {
    x: "the number of days since an app launched",
    y: "the number of downloads, in thousands",
  },
  {
    x: "the number of hours since a culture was started",
    y: "the number of bacteria, in thousands",
  },
  {
    x: "the number of months since a store opened its online shop",
    y: "the number of orders",
  },
];
const LIN_CONTEXTS = [
  {
    x: "the number of months since a gym opened",
    y: "the number of members, in hundreds",
  },
  {
    x: "the number of weeks since a school started a recycling program",
    y: "the mass of recycled paper, in hundreds of kilograms",
  },
  {
    x: "the number of days since a trail was opened",
    y: "the number of hikers, in hundreds",
  },
];
const QUAD_CONTEXTS = [
  {
    x: "the number of seconds after a ball is thrown upward",
    y: "the height of the ball above the ground, in feet",
  },
];

function dataSet(r, kind, count = 6) {
  const xs = Array.from({ length: count }, (_, i) => i);
  let ys;
  let context;
  if (kind === "exponential") {
    const a0 = r.pick([2, 3, 4, 5, 6, 8]);
    const b0 = r.pick([1.2, 1.25, 1.3, 1.35, 1.4, 1.5]);
    const noise = [-0.04, -0.03, -0.02, -0.01, 0.01, 0.02, 0.03, 0.04];
    ys = xs.map((x) => round1(a0 * b0 ** x * (1 + r.pick(noise))));
    context = r.pick(EXP_CONTEXTS);
    return { xs, ys, context, truth: (x) => a0 * b0 ** x, noise };
  }
  if (kind === "linear") {
    const m0 = r.pick([1.5, 2, 2.5, 3, 4]);
    const c0 = r.pick([4, 6, 8, 10, 12]);
    const noise = [-0.6, -0.4, -0.2, 0.2, 0.4, 0.6];
    ys = xs.map((x) => round1(c0 + m0 * x + r.pick(noise)));
    context = r.pick(LIN_CONTEXTS);
    return { xs, ys, context, truth: (x) => c0 + m0 * x, noise };
  }
  const v0 = r.pick([64, 72, 80]);
  const h0 = r.pick([3, 4, 5, 6]);
  const noise = [-1.8, -1.2, -0.6, 0.6, 1.2, 1.8];
  const quadXs = [0, 1, 2, 3, 4];
  ys = quadXs.map((x) => round1(-16 * x * x + v0 * x + h0 + r.pick(noise)));
  context = r.pick(QUAD_CONTEXTS);
  return { xs: quadXs, ys, context, truth: (x) => -16 * x * x + v0 * x + h0, noise };
}

const introText = (context) => `The table shows x, ${context.x}, and y, ${context.y}.`;
const dataTable = (xs, ys) =>
  table("Data set", ["x", ...xs.map(num)], [["y", ...ys.map(num)]]);

const checkModel = (model) => {
  const g = fnOf(model.source);
  for (const x of [0, 1, 2.5, 4]) assertNear(g(x), model.f(x), `model at x = ${x}`);
};

const TYPES = ["linear", "quadratic", "exponential"];

// ---------------------------------------------------------------- templates

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "residuals",
    skill: "apply-results",
    make(r) {
      const kind = r.pick(["linear", "exponential"]);
      const d = dataSet(r, kind);
      const model =
        kind === "linear" ? linearModel(d.xs, d.ys) : exponentialModel(d.xs, d.ys);
      const k = r.int(1, d.xs.length - 2);
      const x = d.xs[k];
      const y = d.ys[k];
      const predicted = model.f(x);
      const residual = y - predicted;
      if (Math.abs(residual) < 0.05) reject("a residual too close to zero");
      return problem({
        stem: `${introText(d.context)} A regression model for the data is ${model.text}.`,
        blocks: [dataTable(d.xs, d.ys)],
        parts: [
          part(
            `Find the value the model predicts for y when x = ${x}. Round your answer to three decimal places.`,
            ask.number("Predicted y =", r3(predicted), { decimals: 3 }),
          ),
          part(
            `Find the residual at x = ${x}. Round your answer to three decimal places.`,
            ask.number("Residual =", r3(residual), { decimals: 3 }),
          ),
        ],
        solution: [
          `Substitute x = ${x} into the model: y = ${model.substitute(x)} ${approx(predicted)}.`,
          `A residual is the actual value minus the predicted value: ${num(y)} − ${num(r3(predicted))} ${approx(residual)}.`,
        ],
        data: { model, x, y, predicted, residual },
      });
    },
    verify({ data: { model, x, y, predicted, residual } }) {
      checkModel(model);
      assertNear(fnOf(model.source)(x), predicted, "predicted value");
      assertNear(y - predicted, residual, "residual");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "errors",
    skill: "describe",
    make(r) {
      const xs = r.pick([
        [1, 2, 3, 4],
        [2, 4, 6, 8],
        [5, 10, 15, 20],
      ]);
      const start = r.int(10, 40);
      const step = r.pick([3, 4, 5, 6]);
      const predicted = xs.map((_, i) =>
        round1(start + step * i + r.pick([0, 0.2, 0.4, 0.6])),
      );
      const deltas = xs.map(() =>
        r.pick([-2.4, -1.8, -1.2, -0.6, -0.3, 0.3, 0.6, 1.2, 1.8, 2.4]),
      );
      const actual = predicted.map((p, i) => round1(p + deltas[i]));
      const residuals = actual.map((y, i) => round1(y - predicted[i]));
      const negatives = residuals.filter((v) => v < 0).length;
      if (negatives === 0 || negatives === residuals.length)
        reject("every residual has the same sign");
      const k = r.int(0, xs.length - 1);
      const over = residuals[k] < 0;
      return problem({
        stem: "A model is used to predict the value of y. The table shows actual values of y and the values predicted by the model.",
        blocks: [
          table(
            "Actual and predicted values",
            ["x", ...xs.map(num)],
            [
              ["Actual y", ...actual.map(num)],
              ["Predicted y", ...predicted.map(num)],
            ],
          ),
        ],
        parts: [
          part(
            `Find the residual at x = ${xs[k]}.`,
            ask.number("Residual =", residuals[k]),
          ),
          part(
            `At x = ${xs[k]}, does the model overestimate or underestimate the actual value?`,
            ask.choice(
              "The model",
              ["overestimates", "underestimates"],
              over ? "overestimates" : "underestimates",
            ),
          ),
          part(
            "For how many of the values of x in the table does the model overestimate the actual value?",
            ask.number("Number of values =", negatives),
          ),
        ],
        solution: [
          `A residual is the actual value minus the predicted value. At x = ${xs[k]}, ${num(actual[k])} − ${num(predicted[k])} = ${num(residuals[k])}.`,
          `The residual is ${over ? "negative" : "positive"}, so the model ${over ? "overestimates" : "underestimates"} the actual value there.`,
          `The residuals are ${residuals.map(num).join(", ")}. The model overestimates where the residual is negative, which happens ${negatives} ${negatives === 1 ? "time" : "times"}.`,
        ],
        data: { actual, predicted, residuals, k, negatives, over },
      });
    },
    verify({ data: { actual, predicted, residuals, k, negatives, over } }) {
      residuals.forEach((value, i) =>
        assertNear(actual[i] - predicted[i], value, `residual ${i}`, 1e-9),
      );
      assert(residuals[k] !== 0, "a nonzero residual");
      assert(residuals[k] < 0 === over, "direction");
      assert(residuals.filter((v) => v < -1e-9).length === negatives, "count");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "competing-models",
    skill: "apply-results",
    make(r) {
      const d = dataSet(r, "exponential");
      const lin = linearModel(d.xs, d.ys);
      const exp = exponentialModel(d.xs, d.ys);
      const x = r.pick([7, 8, 9]);
      const a = lin.f(x);
      const b = exp.f(x);
      if (b - a < 1) reject("predictions too close");
      return problem({
        stem: `${introText(d.context)} Technology gives a linear model, ${lin.text}, and an exponential model, ${exp.text}, for the data.`,
        blocks: [dataTable(d.xs, d.ys)],
        parts: [
          part(
            `Use the linear model to predict y when x = ${x}. Round your answer to three decimal places.`,
            ask.number("Linear prediction =", r3(a), { decimals: 3 }),
          ),
          part(
            `Use the exponential model to predict y when x = ${x}. Round your answer to three decimal places.`,
            ask.number("Exponential prediction =", r3(b), { decimals: 3 }),
          ),
          part(
            "By how much does the exponential model's prediction exceed the linear model's prediction? Round your answer to three decimal places.",
            ask.number("Difference =", r3(b - a), { decimals: 3 }),
          ),
        ],
        solution: [
          `Linear model at x = ${x}: y = ${lin.substitute(x)} ${approx(a)}.`,
          `Exponential model at x = ${x}: y = ${exp.substitute(x)} ${approx(b)}.`,
          `The exponential prediction is greater by ${num(r3(b))} − ${num(r3(a))} ${approx(b - a)}. The two models fit the table about equally well but disagree more as x moves past the data.`,
        ],
        data: { lin, exp, x, a, b },
      });
    },
    verify({ data: { lin, exp, x, a, b } }) {
      checkModel(lin);
      checkModel(exp);
      assertNear(fnOf(lin.source)(x), a, "linear prediction");
      assertNear(fnOf(exp.source)(x), b, "exponential prediction");
      assert(b > a, "the exponential prediction is larger");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "competing-models",
    skill: "identify-information",
    make(r) {
      const BANK = [
        {
          type: "linear",
          text: "The total cost of renting a bicycle is a flat fee plus a fixed charge for each hour.",
        },
        {
          type: "linear",
          text: "A candle burns down by about the same number of centimeters every hour.",
        },
        {
          type: "linear",
          text: "A taxi fare is a base amount plus a fixed charge for each mile traveled.",
        },
        {
          type: "quadratic",
          text: "The height of a ball above the ground, t seconds after it is thrown upward.",
        },
        {
          type: "quadratic",
          text: "The area of a square garden as a function of the length of one side.",
        },
        {
          type: "quadratic",
          text: "The distance an object falls from rest during its first t seconds, which is proportional to t².",
        },
        {
          type: "exponential",
          text: "The number of bacteria in a culture that doubles at regular intervals.",
        },
        {
          type: "exponential",
          text: "The balance of a savings account that earns 3% interest each year, with no deposits or withdrawals.",
        },
        {
          type: "exponential",
          text: "The mass of a radioactive isotope that is cut in half every half-life.",
        },
      ];
      const types = r.shuffle(TYPES).slice(0, 2);
      const picks = types.map((type) =>
        r.pick(BANK.filter((item) => item.type === type)),
      );
      return problem({
        stem: "For each situation, choose the type of function model that is most appropriate based on the context.",
        parts: picks.map((item, i) =>
          part(
            `Situation ${i + 1}: ${item.text}`,
            ask.choice("Most appropriate model", TYPES, item.type),
          ),
        ),
        solution: picks.map(
          (item, i) =>
            `Situation ${i + 1}: ${
              item.type === "linear"
                ? "the quantity changes by the same amount for each equal change in the input, so a linear model is appropriate."
                : item.type === "quadratic"
                  ? "the quantity depends on the square of the input, with a rate of change that changes at a steady rate, so a quadratic model is appropriate."
                  : "the quantity is multiplied by the same factor over equal intervals, so an exponential model is appropriate."
            }`,
        ),
        data: { picks },
      });
    },
    verify({ data: { picks } }) {
      assert(new Set(picks.map((p) => p.type)).size === picks.length, "different types");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "residuals",
    skill: "describe",
    make(r) {
      const shape = r.pick(["u", "cap", "none"]);
      const noise = () => r.pick([-0.06, -0.03, 0, 0.03, 0.06]);
      let residuals;
      if (shape === "none") {
        const signs = r.pick([
          [1, -1, 1, -1, -1, 1],
          [-1, 1, 1, -1, 1, -1],
          [1, -1, -1, 1, 1, -1],
          [-1, 1, -1, 1, 1, -1],
        ]);
        residuals = signs.map(
          (s) => s * r.pick([0.15, 0.25, 0.35, 0.45, 0.55, 0.7, 0.85]),
        );
      } else {
        const c1 = r.pick([0.15, 0.2, 0.25]);
        const c2 = r.pick([0.6, 0.7, 0.8]);
        const flip = shape === "u" ? 1 : -1;
        residuals = [0, 1, 2, 3, 4, 5].map(
          (x) => flip * (c1 * (x - 2.5) ** 2 - c2) + noise(),
        );
        if (residuals.some((v) => Math.abs(v) < 0.15))
          reject("a residual too close to zero");
      }
      residuals = residuals.map((v) => Math.round(v * 100) / 100);
      if (residuals.some((v) => Math.abs(v) > 1.1))
        reject("a residual outside the window");
      const signs = residuals.map((v) => Math.sign(v));
      const changes = signs.slice(1).filter((s, i) => s !== signs[i]).length;
      const patterned = shape !== "none";
      if (patterned && changes !== 2) reject("not a clean curve");
      if (!patterned && changes < 3) reject("looks like a curve");
      const positives = signs.filter((s) => s > 0).length;
      const k = r.int(0, 5);
      const over = residuals[k] < 0;
      return problem({
        stem: "A regression model was fitted to a data set. The residual plot for the model is shown.",
        blocks: [
          graph({
            caption: "Residual plot",
            alt: `Residual plot with six points at x = 0 through 5 with residuals ${residuals.map(num).join(", ")}.`,
            window: { x: [-0.5, 5.5], y: [-1.2, 1.2] },
            ticks: { x: 1, y: 0.4 },
            axisLabels: { x: "x", y: "residual" },
            height: 220,
            points: residuals.map((v, i) => ({ at: [i, v] })),
          }),
        ],
        parts: [
          part(
            "Does the residual plot appear to have a pattern?",
            ask.choice(
              "The residual plot has",
              ["a pattern", "no pattern"],
              patterned ? "a pattern" : "no pattern",
            ),
          ),
          part(
            "Based on the residual plot, is the model appropriate for the data?",
            ask.choice(
              "The model is",
              ["appropriate", "not appropriate"],
              patterned ? "not appropriate" : "appropriate",
            ),
          ),
          part(
            `At x = ${k}, does the model overestimate or underestimate the actual value?`,
            ask.choice(
              "The model",
              ["overestimates", "underestimates"],
              over ? "overestimates" : "underestimates",
            ),
          ),
          part(
            "For how many values of x is the residual positive?",
            ask.number("Number of values =", positives),
          ),
        ],
        solution: [
          patterned
            ? `The residuals are ${signs[0] > 0 ? "positive" : "negative"}, then ${signs[2] > 0 ? "positive" : "negative"}, then ${signs[5] > 0 ? "positive" : "negative"}, forming a curved pattern. A model is appropriate only if its residual plot appears without pattern, so this model is not appropriate.`
            : "The residuals are scattered above and below the x-axis with no curve or trend. A residual plot without pattern supports the model as appropriate.",
          `A residual is the actual value minus the predicted value. At x = ${k} the residual is ${over ? "negative" : "positive"}, so the model ${over ? "overestimates" : "underestimates"}.`,
          `${positives} of the 6 residuals are above the x-axis, so ${positives} ${positives === 1 ? "value" : "values"} of x ${positives === 1 ? "has" : "have"} a positive residual.`,
        ],
        data: { residuals, patterned, positives, k, over, changes },
      });
    },
    verify({ data: { residuals, patterned, positives, k, over, changes } }) {
      assert(residuals.length === 6, "six residuals");
      assert(
        residuals.every((v) => Math.abs(v) >= 0.15 && Math.abs(v) <= 1.1),
        "readable residuals",
      );
      assert(residuals.filter((v) => v > 0).length === positives, "positive count");
      assert(residuals[k] < 0 === over, "direction at x");
      assert(patterned ? changes === 2 : changes >= 3, "pattern classification");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "residuals",
    skill: "support-conclusions",
    make(r) {
      // Model A has a curved pattern of residuals and Model B does not, or the reverse.
      const curvedFirst = r.chance();
      const flip = r.chance() ? 1 : -1;
      const curved = [0, 1, 2, 3, 4, 5].map((x) => {
        const raw =
          flip * (r.pick([0.15, 0.2, 0.25]) * (x - 2.5) ** 2 - r.pick([0.6, 0.7]));
        return Math.round(raw * 100) / 100;
      });
      const noisy = r.pick([
        [0.12, -0.18, 0.15, -0.1, -0.14, 0.2],
        [-0.15, 0.1, 0.2, -0.16, 0.12, -0.08],
        [0.2, -0.12, -0.1, 0.18, 0.14, -0.2],
      ]);
      const a = curvedFirst ? curved : noisy;
      const b = curvedFirst ? noisy : curved;
      const signsA = a.map((v) => Math.sign(v));
      if (curved.some((v) => Math.abs(v) < 0.1)) reject("a residual too close to zero");
      const negativeXsA = a.map((v, i) => (v < 0 ? i : null)).filter((i) => i !== null);
      if (negativeXsA.length === 0) reject("no negative residuals in model A");
      const appropriate = curvedFirst ? "Model B" : "Model A";
      const patterned = curvedFirst ? "Model A" : "Model B";
      return problem({
        stem: "Two regression models, Model A and Model B, were fitted to the same data set. The table shows the residuals for each model.",
        blocks: [
          table(
            "Residuals",
            ["x", "0", "1", "2", "3", "4", "5"],
            [
              ["Residual, Model A", ...a.map(num)],
              ["Residual, Model B", ...b.map(num)],
            ],
          ),
        ],
        parts: [
          part(
            "List the values of x for which Model A overestimates the actual value.",
            ask.set("x =", negativeXsA),
          ),
          part(
            "Which model has a residual plot that appears to have a pattern?",
            ask.choice("The residuals of", ["Model A", "Model B"], patterned),
          ),
          part(
            "Which model is more appropriate for the data?",
            ask.choice("More appropriate:", ["Model A", "Model B"], appropriate),
          ),
        ],
        solution: [
          `A model overestimates where the residual (actual minus predicted) is negative. The residuals of Model A are negative at x = ${negativeXsA.join(", ")}.`,
          `${patterned} has residuals that are ${(curvedFirst ? a : b)[0] > 0 ? "positive, then negative, then positive" : "negative, then positive, then negative"}, a curved pattern. The residuals of ${appropriate} alternate in sign with no trend.`,
          `A model is justified as appropriate when its residual plot appears without pattern, so ${appropriate} is more appropriate.`,
        ],
        data: { a, b, negativeXsA, patterned, appropriate, signsA },
      });
    },
    verify({ data: { a, b, negativeXsA, patterned, appropriate } }) {
      const changes = (list) =>
        list.slice(1).filter((v, i) => Math.sign(v) !== Math.sign(list[i])).length;
      assert(
        changes(patterned === "Model A" ? a : b) === 2,
        "the patterned model has a clean curve",
      );
      assert(
        changes(appropriate === "Model A" ? a : b) >= 3,
        "the other model looks random",
      );
      assert(
        a.every((v, i) => v < 0 === negativeXsA.includes(i)),
        "negative residuals of A",
      );
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "residuals",
    skill: "support-conclusions",
    make(r) {
      const m = r.pick([1.5, 2, 2.5, 3, 3.5, 4]);
      const c = r.pick([2, 3.5, 5, 6.5, 8]);
      const xs = [1, 2, 3, 4, 5];
      const base = r.pick([
        { tenths: [6, -1, -5, -2, 7], pattern: true },
        { tenths: [8, -3, -6, -2, 5], pattern: true },
        { tenths: [5, -2, -6, -1, 8], pattern: true },
        { tenths: [4, -6, 3, -2, 5], pattern: false },
        { tenths: [-5, 3, -4, 6, -2], pattern: false },
        { tenths: [3, -5, -2, 6, -4], pattern: false },
      ]);
      const flip = base.pattern && r.chance() ? -1 : 1;
      const scale = r.pick([1, 2]);
      const residuals = base.tenths.map((t) => (flip * scale * t) / 10);
      const model = (x) => m * x + c;
      const ys = xs.map((x, i) => round1(model(x) + residuals[i]));
      const negatives = residuals.filter((v) => v < 0).length;
      const modelText = `y = ${num(m)}x ${sign(c)} ${num(Math.abs(c))}`;
      return problem({
        stem: `A linear regression model, ${modelText}, was fitted to the data in the table.`,
        blocks: [dataTable(xs, ys)],
        parts: [
          part(
            "Find the residual at each value of x.",
            ...xs.map((x, i) => ask.number(`Residual at x = ${x}:`, residuals[i])),
          ),
          part(
            "For how many values of x does the linear model overestimate the actual value?",
            ask.number("Number of values =", negatives),
          ),
          part(
            "Does the residual plot appear to have a pattern?",
            ask.choice(
              "The residual plot has",
              ["a pattern", "no pattern"],
              base.pattern ? "a pattern" : "no pattern",
            ),
          ),
          part(
            "Is the linear model appropriate for the data?",
            ask.choice(
              "The linear model is",
              ["appropriate", "not appropriate"],
              base.pattern ? "not appropriate" : "appropriate",
            ),
          ),
        ],
        solution: [
          `For each x, find the predicted value ${modelText.replace("y = ", "")}, then subtract it from the actual value.`,
          xs
            .map(
              (x, i) =>
                `x = ${x}: ${num(ys[i])} − ${num(round1(model(x)))} = ${num(residuals[i])}`,
            )
            .join("; ") + ".",
          `${negatives} of the residuals are negative, so the model overestimates for ${negatives} ${negatives === 1 ? "value" : "values"} of x.`,
          base.pattern
            ? `The signs of the residuals are ${residuals.map((v) => (v > 0 ? "positive" : "negative")).join(", ")}, a curved pattern, so the linear model is not appropriate.`
            : `The signs of the residuals are ${residuals.map((v) => (v > 0 ? "positive" : "negative")).join(", ")}, with no pattern, so the linear model is appropriate.`,
        ],
        data: { m, c, xs, ys, residuals, negatives, pattern: base.pattern },
      });
    },
    verify({ data: { m, c, xs, ys, residuals, negatives, pattern } }) {
      const f = fnOf(`${m}*x + ${c}`);
      xs.forEach((x, i) =>
        assert(Math.abs(ys[i] - f(x) - residuals[i]) <= 0.051, `residual ${i}`),
      );
      assert(residuals.filter((v) => v < 0).length === negatives, "negative count");
      const signs = residuals.map((v) => Math.sign(v));
      const changes = signs.slice(1).filter((s, i) => s !== signs[i]).length;
      assert(pattern ? changes === 2 : changes >= 3, "pattern classification");
      assert(
        residuals.every((v) => v !== 0),
        "no zero residuals",
      );
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "errors",
    skill: "support-conclusions",
    make(r) {
      const SCENARIOS = [
        {
          text: "A bakery uses a model to decide how many loaves to bake each day. Unsold loaves cost the bakery less than lost sales, so the bakery prefers a model that overestimates demand.",
          prefers: "overestimates",
          name: "bakery",
        },
        {
          text: "A pharmacist uses a model for the amount of a medicine still in a patient's body to decide when to give the next dose. Giving a dose too early is dangerous, so the pharmacist prefers a model that overestimates the amount remaining.",
          prefers: "overestimates",
          name: "pharmacist",
        },
        {
          text: "A contractor uses a model to estimate the cost of a project before quoting a price. Quoting too low means losing money, so the contractor prefers a model that overestimates the cost.",
          prefers: "overestimates",
          name: "contractor",
        },
        {
          text: "An event planner uses a model for the number of people a venue can hold. Selling more tickets than the venue can hold causes serious problems, so the planner prefers a model that underestimates the capacity.",
          prefers: "underestimates",
          name: "planner",
        },
        {
          text: "A bridge inspector uses a model for the weight a bridge can safely carry. Posting a limit that is too high would be dangerous, so the inspector prefers a model that underestimates the safe weight.",
          prefers: "underestimates",
          name: "inspector",
        },
        {
          text: "A shipping company uses a model for the number of packages it can deliver in a day to promise delivery dates. Late deliveries upset customers, so the company prefers a model that underestimates its daily capacity.",
          prefers: "underestimates",
          name: "shipper",
        },
      ];
      const scenario = r.pick(SCENARIOS);
      const xs = r.pick([
        [2, 4, 6],
        [10, 20, 30],
        [1, 3, 5],
      ]);
      const start = r.int(20, 60);
      const step = r.pick([5, 8, 10, 12]);
      const predicted = xs.map((_, i) => round1(start + step * i));
      const over = r.chance();
      const gaps = xs.map(() => r.pick([0.4, 0.8, 1.2, 1.6, 2.0, 2.4]));
      const actual = predicted.map((p, i) => round1(p + (over ? -1 : 1) * gaps[i]));
      const k = r.int(0, xs.length - 1);
      const residual = round1(actual[k] - predicted[k]);
      const direction = over ? "overestimates" : "underestimates";
      const matches = direction === scenario.prefers;
      return problem({
        stem: `${scenario.text} The table shows actual values and the values predicted by the model.`,
        blocks: [
          table(
            "Actual and predicted values",
            ["x", ...xs.map(num)],
            [
              ["Actual y", ...actual.map(num)],
              ["Predicted y", ...predicted.map(num)],
            ],
          ),
        ],
        parts: [
          part(`Find the residual at x = ${xs[k]}.`, ask.number("Residual =", residual)),
          part(
            "On the interval of x-values shown, does the model overestimate or underestimate the actual values?",
            ask.choice("The model", ["overestimates", "underestimates"], direction),
          ),
          part(
            "Does the error in the model on this interval match the stated preference?",
            ask.choice(
              "The error",
              ["matches the preference", "does not match the preference"],
              matches ? "matches the preference" : "does not match the preference",
            ),
          ),
        ],
        solution: [
          `A residual is the actual value minus the predicted value: ${num(actual[k])} − ${num(predicted[k])} = ${num(residual)}.`,
          `Every residual in the table is ${over ? "negative" : "positive"}, so the model ${direction} the actual values on this interval.`,
          `The context says the preference is a model that ${scenario.prefers}. The model ${direction}, so its error ${matches ? "matches" : "does not match"} that preference.`,
        ],
        data: {
          actual,
          predicted,
          k,
          residual,
          over,
          direction,
          matches,
          prefers: scenario.prefers,
        },
      });
    },
    verify({
      data: { actual, predicted, k, residual, over, direction, matches, prefers },
    }) {
      assertNear(actual[k] - predicted[k], residual, "residual", 1e-9);
      assert(
        actual.every((y, i) => y < predicted[i] === over),
        "one direction throughout",
      );
      assert((direction === prefers) === matches, "match");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "competing-models",
    skill: "support-conclusions",
    make(r) {
      const kind = r.pick(["exponential", "exponential", "linear"]);
      const d = dataSet(r, kind);
      const lin = linearModel(d.xs, d.ys);
      const exp = exponentialModel(d.xs, d.ys);
      const x = r.pick([7, 8]);
      const actualNew = round1(
        d.truth(x) +
          (kind === "linear" ? r.pick(d.noise) : d.truth(x) * 0.02 * r.pick([-1, 1])),
      );
      const linResidual = actualNew - lin.f(x);
      const expResidual = actualNew - exp.f(x);
      const better =
        Math.abs(linResidual) < Math.abs(expResidual) ? "linear" : "exponential";
      if (
        Math.min(Math.abs(linResidual), Math.abs(expResidual)) * 2 >
        Math.max(Math.abs(linResidual), Math.abs(expResidual))
      )
        reject("the two models are too close to call");
      if (Math.min(Math.abs(linResidual), Math.abs(expResidual)) < 0.02)
        reject("a residual too close to zero");
      return problem({
        stem: `${introText(d.context)} Technology gives a linear model, ${lin.text}, and an exponential model, ${exp.text}, for the data. A new observation is made at x = ${x}, and the actual value is y = ${num(actualNew)}.`,
        blocks: [dataTable(d.xs, d.ys)],
        parts: [
          part(
            "Find the residual of the linear model at the new observation. Round your answer to three decimal places.",
            ask.number("Linear residual =", r3(linResidual), { decimals: 3 }),
          ),
          part(
            "Find the residual of the exponential model at the new observation. Round your answer to three decimal places.",
            ask.number("Exponential residual =", r3(expResidual), { decimals: 3 }),
          ),
          part(
            "Which model's prediction is closer to the new observation?",
            ask.choice("Closer prediction:", ["linear", "exponential"], better),
          ),
        ],
        solution: [
          `Linear model at x = ${x}: predicted y = ${lin.substitute(x)} ${approx(lin.f(x))}, so the residual is ${num(actualNew)} − ${num(r3(lin.f(x)))} ${approx(linResidual)}.`,
          `Exponential model at x = ${x}: predicted y = ${exp.substitute(x)} ${approx(exp.f(x))}, so the residual is ${num(actualNew)} − ${num(r3(exp.f(x)))} ${approx(expResidual)}.`,
          `The ${better} model has the residual with the smaller absolute value, so its prediction is closer to the new observation.`,
        ],
        data: { lin, exp, x, actualNew, linResidual, expResidual, better },
      });
    },
    verify({ data: { lin, exp, x, actualNew, linResidual, expResidual, better } }) {
      checkModel(lin);
      checkModel(exp);
      assertNear(actualNew - fnOf(lin.source)(x), linResidual, "linear residual");
      assertNear(actualNew - fnOf(exp.source)(x), expResidual, "exponential residual");
      assert(
        (Math.abs(linResidual) < Math.abs(expResidual) ? "linear" : "exponential") ===
          better,
        "closer model",
      );
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "competing-models",
    skill: "apply-results",
    make(r) {
      const d = dataSet(r, "quadratic");
      const model = quadraticModel(d.xs, d.ys);
      const { A, B } = model.coefficients;
      if (A >= 0) reject("not a downward parabola");
      const k = r.int(1, d.xs.length - 2);
      const x = d.xs[k];
      const y = d.ys[k];
      const predicted = model.f(x);
      const residual = y - predicted;
      if (Math.abs(residual) < 0.05) reject("a residual too close to zero");
      const peakX = -B / (2 * A);
      const peak = model.f(peakX);
      return problem({
        stem: `${introText(d.context)} A quadratic regression model for the data is ${model.text}.`,
        blocks: [dataTable(d.xs, d.ys)],
        parts: [
          part(
            `Find the height the model predicts when x = ${x}. Round your answer to three decimal places.`,
            ask.number("Predicted y =", r3(predicted), { decimals: 3 }),
          ),
          part(
            `Find the residual at x = ${x}. Round your answer to three decimal places.`,
            ask.number("Residual =", r3(residual), { decimals: 3 }),
          ),
          part(
            `At x = ${x}, does the model overestimate or underestimate the actual height?`,
            ask.choice(
              "The model",
              ["overestimates", "underestimates"],
              residual < 0 ? "overestimates" : "underestimates",
            ),
          ),
          part(
            "According to the model, what is the maximum height of the ball? Round your answer to three decimal places.",
            ask.number("Maximum height =", r3(peak), { decimals: 3 }),
          ),
        ],
        solution: [
          `At x = ${x}, the predicted height is y = ${model.substitute(x)} ${approx(predicted)}.`,
          `The residual is the actual value minus the predicted value: ${num(y)} − ${num(r3(predicted))} ${approx(residual)}. It is ${residual < 0 ? "negative, so the model overestimates" : "positive, so the model underestimates"} the actual height.`,
          `The maximum of a downward-opening parabola is at x = −b/(2a) ≈ ${r3(peakX).toFixed(3)}, where y ${approx(peak)}.`,
        ],
        data: { model, x, y, predicted, residual, peakX, peak },
      });
    },
    verify({ data: { model, x, y, predicted, residual, peakX, peak } }) {
      checkModel(model);
      const g = fnOf(model.source);
      assertNear(g(x), predicted, "predicted value");
      assertNear(y - g(x), residual, "residual");
      assertNear(g(peakX), peak, "peak");
      assert(g(peakX) >= g(peakX - 0.01) && g(peakX) >= g(peakX + 0.01), "a maximum");
    },
  },
];

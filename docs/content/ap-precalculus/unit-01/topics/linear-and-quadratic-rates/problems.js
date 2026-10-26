// Typed-answer problems for Topic 1.3. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed expression or table, so a
// slip in the key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  signed,
  polyText,
  ivl,
  num,
  par,
  fnOf,
  assert,
  assertNear,
  aroc,
  extremaOf,
  reject,
  signedLead,
} from "../../../../practice-kit/index.js";

const between = (v, a, b) => `${num(a)} ≤ ${v} ≤ ${num(b)}`;

// Linear situations: a rate with units and a starting amount.
const LINEAR = [
  {
    fn: "C",
    input: "m",
    intro:
      "A taxi company charges a fee for each ride plus a fixed amount for each mile traveled. The cost C(m), in dollars, of a ride of m miles is a linear function of m.",
    rateUnit: "dollars per mile",
    startUnit: "dollars",
    startName: "the fee for each ride",
    valueName: "the cost of a ride",
    dir: 1,
    start: [3, 9],
    speed: [2, 5],
  },
  {
    fn: "V",
    input: "t",
    intro:
      "Water drains from a tank at a constant rate. The volume V(t), in gallons, of water in the tank t minutes after the drain is opened is a linear function of t.",
    rateUnit: "gallons per minute",
    startUnit: "gallons",
    startName: "the volume of water when the drain is opened",
    valueName: "the volume of water",
    dir: -1,
    start: [200, 480],
    speed: [8, 24],
  },
  {
    fn: "S",
    input: "w",
    intro:
      "A student saves the same amount each week. The amount S(w), in dollars, in the student's savings account w weeks after the student opens it is a linear function of w.",
    rateUnit: "dollars per week",
    startUnit: "dollars",
    startName: "the amount in the account when it is opened",
    valueName: "the amount in the account",
    dir: 1,
    start: [20, 90],
    speed: [5, 15],
  },
  {
    fn: "H",
    input: "t",
    intro:
      "A candle burns at a constant rate. The height H(t), in centimeters, of the candle t hours after it is lit is a linear function of t.",
    rateUnit: "centimeters per hour",
    startUnit: "centimeters",
    startName: "the height of the candle when it is lit",
    valueName: "the height of the candle",
    dir: -1,
    start: [18, 30],
    speed: [1, 2],
  },
];

export const problems = [
  {
    id: "p01",
    tier: "quick",
    unit: true,
    concept: "linear-rates",
    skill: "construct-functions",
    make(r) {
      const m = r.nonzero(-5, 5);
      const c = r.int(-8, 8);
      const [p, q] = r.distinct(-4, 6, 2).sort((u, v) => u - v);
      const key = polyText([m, c]);
      return problem({
        stem: `A linear function f satisfies f(${num(p)}) = ${num(m * p + c)} and f(${num(q)}) = ${num(m * q + c)}. Write an expression for f(x).`,
        parts: [ask.expr("f(x) =", key)],
        solution: [
          `The rate of change of a linear function is constant, so the slope is (${num(m * q + c)} − ${par(m * p + c)})/(${num(q)} − ${par(p)}) = ${num(m)}.`,
          `Use the point (${num(p)}, ${num(m * p + c)}): f(x) = ${num(m * p + c)} ${signedLead(m)}(x ${signed(-p)}), which simplifies to f(x) = ${key}.`,
        ],
        data: { m, c, p, q, key },
      });
    },
    verify({ data: { m, c, p, q, key } }) {
      const f = fnOf(key);
      assertNear(f(p), m * p + c, "f(p)");
      assertNear(f(q), m * q + c, "f(q)");
    },
  },
  {
    id: "p02",
    tier: "quick",
    concept: "quadratic-rates",
    skill: "identify-information",
    make(r) {
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const b = r.int(-6, 6);
      const c = r.int(-8, 8);
      const f = (x) => a * x * x + b * x + c;
      const ys = [0, 1, 2, 3].map(f);
      const d = [ys[1] - ys[0], ys[2] - ys[1], ys[3] - ys[2]];
      const second = d[2] - d[1];
      const next = d[2] + second;
      return problem({
        stem: "The table gives values of a quadratic function f at equally spaced inputs. Find f(4).",
        blocks: [
          table(
            "Values of f(x)",
            ["x", "f(x)"],
            ys.map((y, x) => [String(x), num(y)]),
          ),
        ],
        parts: [ask.number("f(4) =", f(4))],
        solution: [
          `Over equal steps, the changes in the outputs are ${num(d[0])}, ${num(d[1])}, and ${num(d[2])}. These change by ${num(second)} each time, because the rate of change of a quadratic function changes at a constant rate.`,
          `The next change is ${num(d[2])} ${signed(second)} = ${num(next)}, so f(4) = ${num(ys[3])} ${signed(next)} = ${num(f(4))}.`,
        ],
        data: { a, b, c, ys },
      });
    },
    verify({ data: { a, b, c, ys } }) {
      const f = fnOf(polyText([a, b, c]));
      ys.forEach((y, x) => assertNear(f(x), y, "table value"));
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "secant-lines",
    skill: "construct-representations",
    make(r) {
      const a = r.pick([1, 2, 3, -1, -2]);
      const b = r.int(-5, 5);
      const c = r.int(-6, 6);
      const [p, q] = r.distinct(-3, 4, 2).sort((u, v) => u - v);
      const f = (x) => a * x * x + b * x + c;
      const slope = a * (p + q) + b;
      const intercept = f(p) - slope * p;
      const text = polyText([a, b, c]);
      const key = `y = ${polyText([slope, intercept])}`;
      return problem({
        stem: `Let f(x) = ${text}. A secant line to the graph of f passes through the points on the graph where x = ${num(p)} and x = ${num(q)}. Write an equation for the secant line.`,
        parts: [ask.equations("Secant line", [key], { vars: ["x", "y"] })],
        solution: [
          `The points are (${num(p)}, ${num(f(p))}) and (${num(q)}, ${num(f(q))}). The slope of the secant line is the average rate of change: (${num(f(q))} − ${par(f(p))})/(${num(q)} − ${par(p)}) = ${num(slope)}.`,
          `Use the point (${num(p)}, ${num(f(p))}): y = ${num(f(p))} ${signedLead(slope)}(x ${signed(-p)}), which simplifies to ${key}.`,
        ],
        data: { text, p, q, slope, intercept },
      });
    },
    verify({ data: { text, p, q, slope, intercept } }) {
      const f = fnOf(text);
      assertNear(slope * p + intercept, f(p), "line through first point");
      assertNear(slope * q + intercept, f(q), "line through second point");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "concavity-from-rates",
    skill: "describe",
    make(r) {
      const up = r.chance();
      const step = r.pick([1, 2]);
      const x0 = r.int(-4, 0);
      let rate = r.int(-8, 4);
      const rates = [];
      for (let i = 0; i < 3; i += 1) {
        rates.push(rate);
        rate += (up ? 1 : -1) * r.int(2, 5);
      }
      const rows = rates.map((rt, i) => [
        `${num(x0 + step * i)} ≤ x ≤ ${num(x0 + step * (i + 1))}`,
        num(rt),
      ]);
      return problem({
        stem: "The table shows the average rate of change of a function g over three consecutive intervals of equal length.",
        blocks: [
          table(
            "Average rates of change of g",
            ["Interval", "Average rate of change"],
            rows,
          ),
        ],
        parts: [
          ask.choice(
            "The graph of g is",
            ["concave up", "concave down"],
            up ? "concave up" : "concave down",
          ),
        ],
        solution: [
          `The average rates of change are ${rates.map(num).join(", ")}. They are ${up ? "increasing" : "decreasing"} from one interval to the next.`,
          `When the rate of change is ${up ? "increasing" : "decreasing"}, the graph is concave ${up ? "up" : "down"}.`,
        ],
        data: { rates, up },
      });
    },
    verify({ data: { rates, up } }) {
      assert(
        rates.every((v, i) => i === 0 || (up ? v > rates[i - 1] : v < rates[i - 1])),
        "rates are monotonic",
      );
    },
  },
  {
    id: "p05",
    tier: "quiz",
    unit: true,
    concept: "quadratic-rates",
    skill: "apply-results",
    make(r) {
      const family = r.pick(["barn", "garden", "revenue"]);
      if (family === "barn") {
        const m = r.int(5, 20);
        const L = 4 * m;
        return problem({
          stem: `A farmer has ${L} feet of fencing to enclose a rectangular pen. One side of the pen is a barn wall and needs no fence, so the fence covers the other three sides. Let x be the length, in feet, of each of the two sides that are perpendicular to the barn.`,
          parts: [
            part(
              "Write an expression for the area A(x) of the pen, in square feet.",
              ask.expr("A(x) =", `-2x^2 + ${L}x`, { text: `−2x² + ${L}x` }),
            ),
            part(
              "What value of x gives the greatest area?",
              ask.number("x =", m, { unit: "feet" }),
            ),
            part(
              "What is the greatest possible area?",
              ask.number("Greatest area", 2 * m * m, { unit: "square feet" }),
            ),
          ],
          solution: [
            `The side parallel to the barn is ${L} − 2x feet long, so A(x) = x(${L} − 2x) = −2x² + ${L}x.`,
            `A(x) is a downward-opening quadratic, so its greatest value is at the vertex. The zeros are x = 0 and x = ${L / 2}, so the vertex is halfway between them at x = ${m}.`,
            `A(${m}) = ${m}(${L} − ${2 * m}) = ${2 * m * m}. The greatest possible area is ${2 * m * m} square feet.`,
          ],
          data: { family, f: `-2x^2 + ${L}x`, vertex: m, best: 2 * m * m },
        });
      }
      if (family === "garden") {
        const m = r.int(4, 15);
        const P = 4 * m;
        return problem({
          stem: `A gardener plans a rectangular garden with a perimeter of ${P} feet. Let x be the width of the garden, in feet.`,
          parts: [
            part(
              "Write an expression for the area A(x) of the garden, in square feet.",
              ask.expr("A(x) =", `-x^2 + ${2 * m}x`, { text: `−x² + ${2 * m}x` }),
            ),
            part(
              "What width gives the greatest area?",
              ask.number("Width", m, { unit: "feet" }),
            ),
            part(
              "What is the greatest possible area?",
              ask.number("Greatest area", m * m, { unit: "square feet" }),
            ),
          ],
          solution: [
            `The perimeter is 2x + 2(length) = ${P}, so the length is ${2 * m} − x feet. A(x) = x(${2 * m} − x) = −x² + ${2 * m}x.`,
            `The zeros of A are x = 0 and x = ${2 * m}, so the vertex of this downward-opening parabola is at x = ${m}.`,
            `A(${m}) = ${m}(${m}) = ${m * m}. The greatest possible area is ${m * m} square feet.`,
          ],
          data: { family, f: `-x^2 + ${2 * m}x`, vertex: m, best: m * m },
        });
      }
      const slope = r.int(2, 6);
      const m = r.int(8, 30);
      const base = 2 * slope * m;
      return problem({
        stem: `A company sells x items per day at a price of p(x) = ${base} − ${slope}x dollars per item. The daily revenue is the number of items sold times the price per item.`,
        parts: [
          part(
            "Write an expression for the daily revenue R(x), in dollars.",
            ask.expr("R(x) =", `-${slope}x^2 + ${base}x`, {
              text: `−${slope}x² + ${base}x`,
            }),
          ),
          part(
            "How many items should the company sell to make the greatest revenue?",
            ask.number("Items", m),
          ),
          part(
            "What is the greatest possible revenue?",
            ask.number("Greatest revenue", slope * m * m, { unit: "dollars" }),
          ),
        ],
        solution: [
          `Revenue is items times price, so R(x) = x(${base} − ${slope}x) = −${slope}x² + ${base}x.`,
          `The zeros of R are x = 0 and x = ${base / slope}, so the vertex of this downward-opening parabola is halfway between them at x = ${m}.`,
          `R(${m}) = ${m}(${base} − ${slope * m}) = ${slope * m * m}. The greatest possible revenue is ${slope * m * m} dollars.`,
        ],
        data: { family, f: `-${slope}x^2 + ${base}x`, vertex: m, best: slope * m * m },
      });
    },
    verify({ data: { f, vertex, best } }) {
      const g = fnOf(f);
      assertNear(g(vertex), best, "greatest value");
      assert(g(vertex + 0.5) < best && g(vertex - 0.5) < best, "it is a maximum");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "quadratic-rates",
    skill: "describe",
    make(r) {
      const a = r.pick([1, 2, 3, -1, -2, -3]);
      const h = r.nonzero(-5, 5);
      const k = r.int(-8, 8);
      const b = -2 * a * h;
      const c = a * h * h + k;
      const text = polyText([a, b, c]);
      const range = a > 0 ? ivl(k, Infinity, true) : ivl(-Infinity, k, false, true);
      return problem({
        stem: `Let f(x) = ${text}. The vertex of the graph of f is where the rate of change of f is 0.`,
        parts: [
          part("Find the coordinates of the vertex.", ask.points("Vertex", [[h, k]])),
          part(
            "Is the vertex a maximum or a minimum of f?",
            ask.choice(
              "The vertex is a",
              ["maximum", "minimum"],
              a > 0 ? "minimum" : "maximum",
            ),
          ),
          part(
            "Write the range of f in interval notation.",
            ask.interval("Range", range),
          ),
        ],
        solution: [
          `The x-coordinate of the vertex is −b/(2a) = −(${num(b)})/(2(${num(a)})) = ${num(h)}. Then f(${num(h)}) = ${num(k)}, so the vertex is (${num(h)}, ${num(k)}).`,
          `The leading coefficient is ${num(a)}, so the parabola opens ${a > 0 ? "upward" : "downward"} and the vertex is a ${a > 0 ? "minimum" : "maximum"}.`,
          `Every output is ${a > 0 ? "at least" : "at most"} ${num(k)}, so the range is ${range}.`,
        ],
        data: { text, a, h, k },
      });
    },
    verify({ data: { text, a, h, k } }) {
      const f = fnOf(text);
      assertNear(f(h), k, "vertex height");
      assert(
        a > 0 ? f(h + 0.01) > k && f(h - 0.01) > k : f(h + 0.01) < k && f(h - 0.01) < k,
        "vertex type",
      );
    },
  },
  {
    id: "p07",
    tier: "quiz",
    concept: "secant-lines",
    skill: "identify-information",
    make(r) {
      const a = r.pick([1, 2, 3]);
      const b = r.int(-6, 6);
      const x0 = r.int(1, 5);
      const hs = [1, 0.1, 0.01, 0.001];
      const base = 2 * a * x0 + b;
      const rows = hs.map((h) => {
        const value = base + a * h;
        return [String(h), num(Number(value.toFixed(6)))];
      });
      const text = polyText([a, b, 0]);
      return problem({
        stem: `For the function g(x) = ${text}, the table gives the slope of the secant line through the points on the graph where x = ${x0} and x = ${x0} + h, for smaller and smaller values of h. Use the table to estimate the rate of change of g at x = ${x0}.`,
        blocks: [
          table(
            `Slope of the secant line through x = ${x0} and x = ${x0} + h`,
            ["h", "Slope"],
            rows,
          ),
        ],
        parts: [ask.number("Estimated rate of change", base)],
        solution: [
          `As h gets closer to 0, the secant lines approach a single line through the point where x = ${x0}, and their slopes approach a single value.`,
          `The slopes ${rows.map((row) => row[1]).join(", ")} get closer and closer to ${num(base)}, so the rate of change of g at x = ${x0} is about ${num(base)}.`,
        ],
        data: { text, x0, hs, base, a },
      });
    },
    verify({ data: { text, x0, hs, base, a } }) {
      const g = fnOf(text);
      for (const h of hs)
        assertNear(aroc(g, x0, x0 + h), base + a * h, "secant slope", 1e-6);
    },
  },
  {
    id: "p08",
    tier: "quiz",
    unit: true,
    concept: "linear-rates",
    skill: "apply-results",
    make(r) {
      const ctx = r.pick(LINEAR);
      const start = r.int(...ctx.start);
      const speed = r.int(...ctx.speed);
      const rate = ctx.dir * speed;
      const [p, q] = r.distinct(1, 9, 2).sort((u, v) => u - v);
      const target = q + r.int(2, 5);
      const value = (x) => start + rate * x;
      if (value(target) <= 0 || value(q) <= 0) reject("a negative quantity");
      const f = ctx.fn;
      return problem({
        stem: `${ctx.intro} ${f}(${p}) = ${value(p)} and ${f}(${q}) = ${value(q)}.`,
        parts: [
          part(
            `Find the rate of change of ${f}.`,
            ask.number("Rate of change", rate, { unit: ctx.rateUnit }),
          ),
          part(
            `Find ${f}(0), ${ctx.startName}.`,
            ask.number(`${f}(0) =`, start, { unit: ctx.startUnit }),
          ),
          part(
            `Find ${ctx.valueName} when ${ctx.input} = ${target}.`,
            ask.number(`${f}(${target}) =`, value(target), { unit: ctx.startUnit }),
          ),
        ],
        solution: [
          `The rate of change of a linear function is its slope: (${f}(${q}) − ${f}(${p}))/(${q} − ${p}) = (${value(q)} − ${value(p)})/${q - p} = ${num(rate)} ${ctx.rateUnit}.`,
          `Starting at ${ctx.input} = ${p} and moving back to ${ctx.input} = 0 changes the output by ${num(rate)} × (0 − ${p}) = ${num(-rate * p)}, so ${f}(0) = ${value(p)} ${signed(-rate * p)} = ${num(start)}.`,
          `${f}(${target}) = ${num(start)} + ${par(rate)}(${target}) = ${num(value(target))}.`,
        ],
        data: { start, rate, p, q, target },
      });
    },
    verify({ data: { start, rate, p, q, target } }) {
      const g = fnOf(`(${rate})x + (${start})`);
      assertNear(g(0), start, "start");
      assertNear(aroc(g, p, q), rate, "rate");
      assertNear(g(target), start + rate * target, "target value");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "quadratic-rates",
    skill: "solve",
    make(r) {
      const a = r.pick([1, 2, -1, -2]);
      const h = r.int(-3, 4);
      const k = r.int(-8, 8);
      const xs = r.distinct(-3, 5, 3).sort((u, v) => u - v);
      const f = (x) => a * (x - h) * (x - h) + k;
      if (xs.includes(h)) reject("the vertex is one of the given points");
      const b = -2 * a * h;
      const c = a * h * h + k;
      const [x1, x2, x3] = xs;
      const text = polyText([a, b, c]);
      return problem({
        stem: `A quadratic function f has f(${num(x1)}) = ${num(f(x1))}, f(${num(x2)}) = ${num(f(x2))}, and f(${num(x3)}) = ${num(f(x3))}. Find the coordinates of the vertex of the graph of f.`,
        parts: [ask.points("Vertex", [[h, k]])],
        solution: [
          `Write f(x) = ax² + bx + c. The three outputs give three equations in a, b, and c. Solving them gives a = ${num(a)}, b = ${num(b)}, and c = ${num(c)}, so f(x) = ${text}.`,
          `The x-coordinate of the vertex is −b/(2a) = ${num(h)}, and f(${num(h)}) = ${num(k)}. The vertex is (${num(h)}, ${num(k)}).`,
        ],
        data: { text, a, b, c, h, k, xs },
      });
    },
    verify({ data: { text, h, k, xs } }) {
      const g = fnOf(text);
      assertNear(g(h), k, "vertex height");
      const best = extremaOf(g, -20, 20);
      assert(best.length === 1 && Math.abs(best[0].x - h) < 1e-3, "vertex position");
      assert(new Set(xs).size === 3, "three different inputs");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "concavity-from-rates",
    skill: "describe",
    make(r) {
      const up = r.chance();
      let rate = r.int(-7, 7);
      const rates = [];
      for (let i = 0; i < 4; i += 1) {
        rates.push(rate);
        rate += (up ? 1 : -1) * r.int(1, 4);
      }
      const ys = [r.int(-5, 8)];
      rates.forEach((rt) => ys.push(ys[ys.length - 1] + rt));
      const last = rates[3];
      if (last === 0) reject("a flat last interval");
      const x0 = r.int(-2, 1);
      const xs = [0, 1, 2, 3, 4].map((i) => x0 + i);
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
            `Is f increasing or decreasing over the interval ${between("x", xs[3], xs[4])}?`,
            ask.choice(
              "f is",
              ["increasing", "decreasing"],
              last > 0 ? "increasing" : "decreasing",
            ),
          ),
          part(
            "Based on the average rates of change over the four intervals, is the graph of f concave up or concave down?",
            ask.choice(
              "The graph is",
              ["concave up", "concave down"],
              up ? "concave up" : "concave down",
            ),
          ),
        ],
        solution: [
          `The outputs change by ${rates.map(num).join(", ")} over the four intervals, so those are the average rates of change.`,
          `The last interval has an average rate of change of ${num(last)}, so f is ${last > 0 ? "increasing" : "decreasing"} there.`,
          `The average rates of change are ${up ? "increasing" : "decreasing"} from left to right, so the graph is concave ${up ? "up" : "down"}.`,
        ],
        data: { rates, ys, up },
      });
    },
    verify({ data: { rates, ys, up } }) {
      rates.forEach((rt, i) => assertNear(ys[i + 1] - ys[i], rt, "rate from table"));
      assert(
        rates.every((v, i) => i === 0 || (up ? v > rates[i - 1] : v < rates[i - 1])),
        "rates are monotonic",
      );
    },
  },
];

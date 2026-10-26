// Typed-answer problems for Topic 2.8. Each template draws new numbers for every
// variant. verify() recomputes each inverse by composing it with the original function,
// so a slip in the key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  graph,
  num,
  Q,
  Poly,
  polyText,
  ivl,
  fnOf,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const qText = (value) => (value instanceof Q ? value.toString() : num(value));

// (x − b)/m for the inverse of mx + b, written without a negative denominator.
function inverseLinearText(m, b, variable = "x") {
  const top = polyText([m < 0 ? -1 : 1, m < 0 ? b : -b], variable);
  return Math.abs(m) === 1 ? top : `(${top})/${Math.abs(m)}`;
}

// Substitute a number for the variable in displayed text, parenthesizing negatives.
function at(text, value, variable = "x") {
  const shown = value < 0 ? `(${num(value)})` : num(value);
  return text.replace(new RegExp(variable, "g"), shown);
}

const sorted = (list) => [...list].sort((a, b) => a - b);

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "invertible",
    skill: "identify-information",
    make(r) {
      const xs = sorted(r.distinct(-5, 9, 5));
      const ys = r.distinct(-8, 14, 5);
      const i = r.int(0, 4);
      const j = (i + r.int(1, 4)) % 5;
      return problem({
        stem: "The table gives all of the values of a function f. The function f is invertible.",
        blocks: [table("Values of f", ["x", ...xs.map(num)], [["f(x)", ...ys.map(num)]])],
        parts: [
          part(`Find f⁻¹(${num(ys[i])}).`, ask.number(`f⁻¹(${num(ys[i])}) =`, xs[i])),
          part(`Find f⁻¹(${num(ys[j])}).`, ask.number(`f⁻¹(${num(ys[j])}) =`, xs[j])),
          part("List the elements of the domain of f⁻¹.", ask.set("Domain of f⁻¹:", ys)),
        ],
        solution: [
          `f(${num(xs[i])}) = ${num(ys[i])}, so f⁻¹(${num(ys[i])}) = ${num(xs[i])}.`,
          `f(${num(xs[j])}) = ${num(ys[j])}, so f⁻¹(${num(ys[j])}) = ${num(xs[j])}.`,
          `The domain of f⁻¹ is the set of outputs of f: ${sorted(ys).map(num).join(", ")}.`,
        ],
        data: { xs, ys },
      });
    },
    verify({ data: { xs, ys } }) {
      assert(
        new Set(ys).size === ys.length && new Set(xs).size === xs.length,
        "one-to-one table",
      );
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "invertible",
    skill: "describe",
    make(r) {
      // A table that is invertible or has a repeated output.
      const xs = sorted(r.distinct(-4, 8, 5));
      const ys = r.distinct(-6, 12, 5);
      const repeats = r.chance();
      let i = 0;
      let j = 0;
      if (repeats) {
        i = r.int(0, 4);
        j = (i + r.int(1, 4)) % 5;
        ys[j] = ys[i];
      }
      // A quadratic on an interval that does or does not contain the vertex.
      const h = r.int(-3, 4);
      const k = r.nonzero(-5, 6);
      const fits = r.chance();
      let lo;
      let hi;
      if (fits) {
        if (r.chance()) {
          lo = h;
          hi = h + r.int(2, 5);
        } else {
          hi = h;
          lo = h - r.int(2, 5);
        }
      } else {
        lo = h - r.int(1, 4);
        hi = h + r.int(1, 4);
      }
      const fText = `${h === 0 ? "x" : `(x ${h < 0 ? "+" : "−"} ${Math.abs(h)})`}² ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
      return problem({
        stem: "Decide whether each function is invertible on the given domain.",
        blocks: [table("Values of f", ["x", ...xs.map(num)], [["f(x)", ...ys.map(num)]])],
        parts: [
          part(
            "Is f, defined by the table, invertible?",
            ask.choice(
              "f is",
              ["invertible", "not invertible"],
              repeats ? "not invertible" : "invertible",
            ),
          ),
          part(
            `Let g(x) = ${fText} on the domain ${num(lo)} ≤ x ≤ ${num(hi)}. Is g invertible?`,
            ask.choice(
              "g is",
              ["invertible", "not invertible"],
              fits ? "invertible" : "not invertible",
            ),
          ),
          part(
            `What is the smallest value of c for which g(x) = ${fText} is invertible on the domain x ≥ c?`,
            ask.number("c =", h),
          ),
        ],
        solution: [
          repeats
            ? `f(${num(xs[i])}) = f(${num(xs[j])}) = ${num(ys[i])}. Two inputs share one output, so f is not invertible.`
            : "Every output in the table comes from a single input, so f is invertible.",
          fits
            ? `The vertex of g is at x = ${num(h)}, which is not inside the interval ${num(lo)} < x < ${num(hi)}. On that domain g is strictly ${lo >= h ? "increasing" : "decreasing"}, so each output comes from one input and g is invertible.`
            : `The vertex of g is at x = ${num(h)}, inside the interval ${num(lo)} < x < ${num(hi)}. Inputs on either side of the vertex give the same output, so g is not invertible on this domain.`,
          `The graph of g turns at its vertex, x = ${num(h)}. On x ≥ ${num(h)} the function is increasing, and for any smaller c the domain would include inputs on both sides of the vertex. So c = ${num(h)}.`,
        ],
        data: { xs, ys, repeats, h, lo, hi, fits },
      });
    },
    verify({ data: { ys, repeats, h, lo, hi, fits } }) {
      assert(new Set(ys).size < ys.length === repeats, "repeat flag");
      assert((lo >= h || hi <= h) === fits, "invertibility of g");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "finding-inverses",
    skill: "construct-functions",
    make(r) {
      const m = r.pick([2, 3, 4, 5, -2, -3, -4, -5, 6]);
      const b = r.nonzero(-9, 9);
      const f = Poly.of(m, b);
      const x0 = r.int(-6, 7);
      const c = f.at(x0);
      const text = inverseLinearText(m, b);
      const key = `(x - (${b}))/(${m})`;
      return problem({
        stem: `Let f(x) = ${f.text()}.`,
        parts: [
          part("Find f⁻¹(x).", ask.expr("f⁻¹(x) =", key, { text })),
          part(`Find f⁻¹(${qText(c)}).`, ask.number(`f⁻¹(${qText(c)}) =`, x0)),
        ],
        solution: [
          `Write y = ${f.text()} and reverse the roles of x and y: x = ${polyText([m, b], "y")}.`,
          `Solve for y: ${num(m)}y = x ${b < 0 ? "+" : "−"} ${Math.abs(b)}, so y = ${m < 0 ? `(x ${b < 0 ? "+" : "−"} ${Math.abs(b)})/(${num(m)}) = ` : ""}${text}. Therefore f⁻¹(x) = ${text}.`,
          `f⁻¹(${qText(c)}) = ${at(text, c.value)} = ${num(x0)}.`,
        ],
        data: { f, m, b, key, x0, c },
      });
    },
    verify({ data: { f, key, x0, c } }) {
      const F = f.fn();
      const G = fnOf(key);
      for (const x of [-3, 0, 1.5, 6]) {
        assertNear(F(G(x)), x, `f(f⁻¹(${x}))`);
        assertNear(G(F(x)), x, `f⁻¹(f(${x}))`);
      }
      assertNear(G(c.value), x0, "f⁻¹(c)");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "inverse-by-composition",
    skill: "solve",
    make(r) {
      const m = r.pick([2, 3, 4, 5, -2, -3]);
      const b = r.nonzero(-9, 9);
      const f = Poly.of(m, b);
      const w = r.pick([-47, -23, -12, 17, 29, 35, 41, 58]);
      const x0 = r.pick([-31, -15, -8, 13, 22, 36, 44]);
      return problem({
        stem: `The function f is given by f(x) = ${f.text()}, and f⁻¹ is its inverse function.`,
        parts: [
          part(`Find f(f⁻¹(${num(w)})).`, ask.number(`f(f⁻¹(${num(w)})) =`, w)),
          part(`Find f⁻¹(f(${num(x0)})).`, ask.number(`f⁻¹(f(${num(x0)})) =`, x0)),
          part(
            "The domain of f⁻¹ is the same set as which of the following for f?",
            ask.choice("The domain of f⁻¹ is the", ["domain", "range"], "range"),
          ),
        ],
        solution: [
          `A function composed with its inverse is the identity function, so f(f⁻¹(x)) = x. Then f(f⁻¹(${num(w)})) = ${num(w)}.`,
          `Likewise f⁻¹(f(x)) = x, so f⁻¹(f(${num(x0)})) = ${num(x0)}.`,
          "The inverse reverses every input-output pair, so the outputs of f become the inputs of f⁻¹. The domain of f⁻¹ is the range of f.",
        ],
        data: { f, w, x0 },
      });
    },
    verify({ data: { f, w, x0 } }) {
      const G = fnOf(`(x - (${f.c[0].value}))/(${f.c[1].value})`);
      assertNear(f.fn()(G(w)), w, "f(f⁻¹(w))");
      assertNear(G(f.fn()(x0)), x0, "f⁻¹(f(x0))");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "invertible",
    skill: "construct-representations",
    make(r) {
      const xs = sorted(r.distinct(-6, 8, 3));
      const ys = r.distinct(-7, 9, 3);
      const pairs = xs.map((x, i) => [x, ys[i]]);
      const k = r.int(0, 2);
      const pointText = (p) => `(${num(p[0])}, ${num(p[1])})`;
      const lines = r.shuffle(["y = x", "y = −x", "the x-axis", "the y-axis"]);
      return problem({
        stem: `The graph of an invertible function f contains the points ${pairs.map(pointText).join(", ")}.`,
        parts: [
          part(
            "List the three points on the graph of f⁻¹ that correspond to these points.",
            ask.points(
              "Points on the graph of f⁻¹:",
              pairs.map(([x, y]) => [y, x]),
            ),
          ),
          part(
            `Find f⁻¹(${num(pairs[k][1])}).`,
            ask.number(`f⁻¹(${num(pairs[k][1])}) =`, pairs[k][0]),
          ),
          part(
            "The graph of f⁻¹ is the reflection of the graph of f over which of the following?",
            ask.choice("Reflection over", lines, "y = x"),
          ),
        ],
        solution: [
          `Each point (a, b) on the graph of f corresponds to the point (b, a) on the graph of f⁻¹. The points are ${pairs.map(([x, y]) => pointText([y, x])).join(", ")}.`,
          `The point ${pointText(pairs[k])} is on the graph of f, so f(${num(pairs[k][0])}) = ${num(pairs[k][1])} and f⁻¹(${num(pairs[k][1])}) = ${num(pairs[k][0])}.`,
          "Swapping the coordinates of every point reflects the graph over the line y = x.",
        ],
        data: { pairs },
      });
    },
    verify({ data: { pairs } }) {
      assert(new Set(pairs.map((p) => p[1])).size === pairs.length, "one-to-one");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "finding-inverses",
    skill: "construct-functions",
    make(r) {
      const a = r.nonzero(-4, 4);
      const d = r.nonzero(-5, 5);
      const b = r.nonzero(-6, 6);
      if (a * d - b === 0) reject("degenerate function");
      // x0 chosen so that f(x0) is an integer.
      const choices = [];
      for (let x = -6; x <= 7; x += 1) {
        if (x + d === 0) continue;
        const top = a * x + b;
        if (top % (x + d) === 0) choices.push(x);
      }
      if (choices.length === 0) reject("no integer value");
      const x0 = r.pick(choices);
      const c = (a * x0 + b) / (x0 + d);
      const fText = `(${polyText([a, b])})/(${polyText([1, d])})`;
      const gText = `(${polyText([-d, b])})/(${polyText([1, -a])})`;
      const key = `((${-d})*x + (${b}))/(x - (${a}))`;
      return problem({
        stem: `Let f(x) = ${fText}.`,
        parts: [
          part("Find f⁻¹(x).", ask.expr("f⁻¹(x) =", key, { text: gText })),
          part("Find the domain of f⁻¹.", ask.interval("Domain of f⁻¹:", `x ≠ ${a}`)),
          part(`Find f⁻¹(${num(c)}).`, ask.number(`f⁻¹(${num(c)}) =`, x0)),
        ],
        solution: [
          `Write y = ${fText} and reverse the roles of x and y: x = (${polyText([a, b], "y")})/(${polyText([1, d], "y")}).`,
          `Multiply both sides by the denominator and collect the y terms on one side: x(y ${d < 0 ? "−" : "+"} ${Math.abs(d)}) = ${polyText([a, b], "y")}, so y(x ${a < 0 ? "+" : "−"} ${Math.abs(a)}) = ${polyText([-d, b])}. Then y = ${gText}, so f⁻¹(x) = ${gText}.`,
          `The denominator of f⁻¹ cannot be 0, so x ≠ ${num(a)}. Equivalently, ${num(a)} is not in the range of f.`,
          `f⁻¹(${num(c)}) = ${at(gText, c)} = ${num(x0)}.`,
        ],
        data: { a, b, d, key, x0, c },
      });
    },
    verify({ data: { a, b, d, key, x0, c } }) {
      const f = (x) => (a * x + b) / (x + d);
      const g = fnOf(key);
      for (const x of [-4.3, -1.7, 0.5, 3.1, 6.2]) {
        if (Math.abs(x + d) > 1e-6 && Math.abs(x - a) > 1e-6) {
          assertNear(f(g(x)), x, `f(f⁻¹(${x}))`);
          assertNear(g(f(x)), x, `f⁻¹(f(${x}))`);
        }
      }
      assertNear(g(c), x0, "f⁻¹(c)");
      assert(Number.isInteger(c), "an integer input to f⁻¹");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "finding-inverses",
    skill: "equivalent-forms",
    make(r) {
      const h = r.int(-4, 5);
      const k = r.nonzero(-6, 6);
      const family = r.pick(["quadratic", "root"]);
      const hText = (variable) =>
        h === 0 ? variable : `(${variable} ${h < 0 ? "+" : "−"} ${Math.abs(h)})`;
      if (family === "quadratic") {
        const a = r.pick([1, 2, 4, 9]);
        const x0 = h + r.int(1, 4);
        const c = a * (x0 - h) ** 2 + k;
        const f = `${a === 1 ? "" : a}${hText("x")}² ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
        const innerText =
          a === 1
            ? `x ${k < 0 ? "+" : "−"} ${Math.abs(k)}`
            : `(x ${k < 0 ? "+" : "−"} ${Math.abs(k)})/${a}`;
        const gText = `√(${innerText}) ${h < 0 ? "−" : "+"} ${Math.abs(h)}`.replace(
          / [+−] 0$/,
          "",
        );
        const key = `sqrt((x - (${k}))/${a}) + (${h})`;
        return problem({
          stem: `Let f(x) = ${f} for x ≥ ${num(h)}. On this domain f is invertible.`,
          parts: [
            part("Find f⁻¹(x).", ask.expr("f⁻¹(x) =", key, { text: gText })),
            part(
              "Find the domain of f⁻¹.",
              ask.interval("Domain of f⁻¹:", ivl(k, Infinity, true)),
            ),
            part(
              "Find the range of f⁻¹.",
              ask.interval("Range of f⁻¹:", ivl(h, Infinity, true)),
            ),
            part(`Find f⁻¹(${num(c)}).`, ask.number(`f⁻¹(${num(c)}) =`, x0)),
          ],
          solution: [
            `Write y = ${f} and reverse the roles of x and y: x = ${f.replace(/x/g, "y")}.`,
            `Solve for y: ${a === 1 ? "" : `${a}`}${hText("y")}² = x ${k < 0 ? "+" : "−"} ${Math.abs(k)}, so ${hText("y").replace(/^\((.*)\)$/, "$1")} = ±√(${innerText}). Because y ≥ ${num(h)} on the domain of f, take the positive root: f⁻¹(x) = ${gText}.`,
            `The domain of f⁻¹ is the range of f, which is [${num(k)}, ∞). The range of f⁻¹ is the domain of f, which is [${num(h)}, ∞).`,
            `f⁻¹(${num(c)}) = √(${innerText.replace(/x/g, num(c))}) ${h < 0 ? "−" : "+"} ${Math.abs(h)} = ${num(x0)}.`,
          ],
          data: { family, h, k, a, key, x0, c },
        });
      }
      const s = r.int(1, 4);
      const x0 = h + s * s;
      const c = s + k;
      const f = `${h === 0 ? "√x" : `√(${polyText([1, -h])})`} ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
      const gText = `(${polyText([1, -k])})² ${h < 0 ? "−" : "+"} ${Math.abs(h)}`.replace(
        / [+−] 0$/,
        "",
      );
      const key = `(x - (${k}))^2 + (${h})`;
      return problem({
        stem: `Let f(x) = ${f} for x ≥ ${num(h)}. On this domain f is invertible.`,
        parts: [
          part("Find f⁻¹(x).", ask.expr("f⁻¹(x) =", key, { text: gText })),
          part(
            "Find the domain of f⁻¹.",
            ask.interval("Domain of f⁻¹:", ivl(k, Infinity, true)),
          ),
          part(
            "Find the range of f⁻¹.",
            ask.interval("Range of f⁻¹:", ivl(h, Infinity, true)),
          ),
          part(`Find f⁻¹(${num(c)}).`, ask.number(`f⁻¹(${num(c)}) =`, x0)),
        ],
        solution: [
          `Write y = ${f} and reverse the roles of x and y: x = ${f.replace(/x/g, "y")}.`,
          `Isolate the radical: x ${k < 0 ? "+" : "−"} ${Math.abs(k)} = √(${polyText([1, -h], "y")}). Square both sides: (${polyText([1, -k])})² = ${polyText([1, -h], "y")}, so f⁻¹(x) = ${gText}.`,
          `The domain of f⁻¹ is the range of f, which is [${num(k)}, ∞). The range of f⁻¹ is the domain of f, which is [${num(h)}, ∞).`,
          `f⁻¹(${num(c)}) = (${num(c)} ${k < 0 ? "+" : "−"} ${Math.abs(k)})² ${h < 0 ? "−" : "+"} ${Math.abs(h)} = ${num(x0)}.`,
        ],
        data: { family, h, k, key, x0, c, s },
      });
    },
    verify({ data: { family, h, k, a, key, x0, c } }) {
      const g = fnOf(key);
      const f =
        family === "quadratic"
          ? (x) => a * (x - h) ** 2 + k
          : (x) => Math.sqrt(x - h) + k;
      for (const t of [h + 0.5, h + 1, h + 2.5, h + 4])
        assertNear(g(f(t)), t, `f⁻¹(f(${t}))`);
      for (const t of [k + 0.5, k + 3, k + 10]) assertNear(f(g(t)), t, `f(f⁻¹(${t}))`);
      assertNear(g(c), x0, "f⁻¹(c)");
      assert(x0 > h, "x0 is on the domain");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "inverse-by-composition",
    skill: "support-conclusions",
    make(r) {
      const m = r.pick([2, 3, 4, 5, 6]);
      const b = r.nonzero(-9, 9);
      const f = Poly.of(m, b);
      const kind = r.pick(["inverse", "inverse", "sign", "partial", "negated"]);
      const signed = (value) => `${value < 0 ? "−" : "+"} ${Math.abs(value)}`;
      let g;
      let gText;
      if (kind === "inverse") {
        g = new Poly([new Q(-b, m), new Q(1, m)]);
        gText = `(x ${signed(-b)})/${m}`;
      } else if (kind === "sign") {
        g = new Poly([new Q(b, m), new Q(1, m)]);
        gText = `(x ${signed(b)})/${m}`;
      } else if (kind === "partial") {
        g = new Poly([new Q(-b), new Q(1, m)]);
        gText = `x/${m} ${signed(-b)}`;
      } else {
        g = new Poly([new Q(b, m), new Q(-1, m)]);
        gText = `(${num(b)} − x)/${m}`;
      }
      const compose = (outer, inner) =>
        outer.c.reduceRight(
          (sum, coefficient) => sum.mul(inner).add(new Poly([coefficient])),
          new Poly([0]),
        );
      const fg = compose(f, g);
      const gf = compose(g, f);
      const inverse =
        fg.degree === 1 &&
        fg.c[0].isZero &&
        fg.c[1].equals(1) &&
        gf.c[0].isZero &&
        gf.c[1].equals(1);
      if (inverse !== (kind === "inverse")) reject("classification mismatch");
      return problem({
        stem: `Let f(x) = ${f.text()} and g(x) = ${gText}.`,
        parts: [
          part(
            "Write f(g(x)) in simplest form.",
            ask.expr("f(g(x)) =", fg.text(), { form: "expanded" }),
          ),
          part(
            "Write g(f(x)) in simplest form.",
            ask.expr("g(f(x)) =", gf.text(), { form: "expanded" }),
          ),
          part(
            "Is g the inverse function of f?",
            ask.choice(
              "g is",
              ["the inverse of f", "not the inverse of f"],
              inverse ? "the inverse of f" : "not the inverse of f",
            ),
          ),
        ],
        solution: [
          `f(g(x)) = ${m}(${gText}) ${signed(b)} = ${fg.text()}.`,
          `g(f(x)) = ${gText.replace(/x/g, `(${f.text()})`)} = ${gf.text()}.`,
          inverse
            ? "Both compositions equal x, so g is the inverse of f."
            : `At least one composition is not x, so g is not the inverse of f. Two functions are inverses only if f(g(x)) = x and g(f(x)) = x.`,
        ],
        data: { f, g, fg, gf, inverse },
      });
    },
    verify({ data: { f, g, fg, gf, inverse } }) {
      const F = f.fn();
      const G = g.fn();
      for (const x of [-3, 0, 1.5, 6]) {
        assertNear(F(G(x)), fg.fn()(x), "f(g(x))");
        assertNear(G(F(x)), gf.fn()(x), "g(f(x))");
      }
      assert(
        (Math.abs(F(G(2)) - 2) < 1e-9 && Math.abs(G(F(2)) - 2) < 1e-9) === inverse,
        "inverse flag",
      );
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "finding-inverses",
    skill: "apply-results",
    make(r) {
      const kind = r.pick(["taxi", "plan", "temperature", "cylinder", "tile"]);
      let c;
      if (kind === "taxi") {
        const a = r.pick([2, 3, 4, 5]);
        const b = r.pick([2, 3, 4]);
        const m0 = r.int(3, 15);
        c = {
          stem: `The fare, in dollars, for a taxi ride of m miles is F(m) = ${polyText([b, a], "m")}.`,
          inv: "m",
          input: "F",
          key: `(F - ${a})/${b}`,
          text: `(F − ${a})/${b}`,
          at: a + b * m0,
          value: m0,
          rounded: false,
          meaning: "the number of miles that can be traveled for a fare of F dollars",
          wrong: [
            "the fare, in dollars, for a ride of F miles",
            "the fare, in dollars, for a ride of m miles",
          ],
          work: `F = ${polyText([b, a], "m")}, so m = (F − ${a})/${b}`,
          check: (F) => (F - a) / b,
          forward: (m) => a + b * m,
          domainNote: "",
        };
      } else if (kind === "plan") {
        const a = r.pick([20, 25, 30, 35]);
        const b = r.pick([4, 5, 6, 8]);
        const g0 = r.int(2, 12);
        c = {
          stem: `The monthly cost, in dollars, of a data plan that uses g gigabytes is C(g) = ${polyText([b, a], "g")}.`,
          inv: "g",
          input: "C",
          key: `(C - ${a})/${b}`,
          text: `(C − ${a})/${b}`,
          at: a + b * g0,
          value: g0,
          rounded: false,
          meaning:
            "the number of gigabytes that can be used for a monthly cost of C dollars",
          wrong: [
            "the monthly cost, in dollars, of using C gigabytes",
            "the monthly cost, in dollars, of using g gigabytes",
          ],
          work: `C = ${polyText([b, a], "g")}, so g = (C − ${a})/${b}`,
          check: (C) => (C - a) / b,
          forward: (g) => a + b * g,
          domainNote: "",
        };
      } else if (kind === "temperature") {
        const f0 = r.pick([2, 3, 5, 6, 8, 10, 12, 15]);
        c = {
          stem: "The temperature in degrees Fahrenheit that corresponds to a temperature of C degrees Celsius is F(C) = (9/5)C + 32.",
          inv: "C",
          input: "F",
          key: "(5/9)*(F - 32)",
          text: "(5/9)(F − 32)",
          at: 32 + 9 * f0,
          value: 5 * f0,
          rounded: false,
          meaning:
            "the temperature in degrees Celsius that corresponds to F degrees Fahrenheit",
          wrong: [
            "the temperature in degrees Fahrenheit that corresponds to F degrees Celsius",
            "the temperature in degrees Celsius that corresponds to C degrees Fahrenheit",
          ],
          work: "F = (9/5)C + 32, so (9/5)C = F − 32 and C = (5/9)(F − 32)",
          check: (F) => (5 / 9) * (F - 32),
          forward: (Cc) => (9 / 5) * Cc + 32,
          domainNote: "",
        };
      } else if (kind === "cylinder") {
        const radius = r.pick([2, 3, 4, 5]);
        const volume = r.pick([100, 150, 200, 250, 300, 500]);
        c = {
          stem: `A cylindrical tank has a radius of ${radius} meters. The volume of water in the tank, in cubic meters, when the water is h meters deep is V(h) = ${radius * radius}πh.`,
          inv: "h",
          input: "V",
          key: `V/(${radius * radius}*π)`,
          text: `V/(${radius * radius}π)`,
          at: volume,
          value: volume / (Math.PI * radius * radius),
          rounded: true,
          meaning:
            "the depth, in meters, of the water when the tank holds V cubic meters",
          wrong: [
            "the volume, in cubic meters, of the water when the water is V meters deep",
            "the depth, in meters, of the water when the tank holds h cubic meters",
          ],
          work: `V = ${radius * radius}πh, so h = V/(${radius * radius}π)`,
          check: (V) => V / (Math.PI * radius * radius),
          forward: (h) => Math.PI * radius * radius * h,
          domainNote: "",
        };
      } else {
        const s0 = r.int(3, 12);
        c = {
          stem: "The area, in square meters, of a square tile with side length s meters is A(s) = s², where s > 0.",
          inv: "s",
          input: "A",
          key: "sqrt(A)",
          text: "√A",
          at: s0 * s0,
          value: s0,
          rounded: false,
          meaning:
            "the side length, in meters, of a square tile with an area of A square meters",
          wrong: [
            "the area, in square meters, of a square tile with a side length of A meters",
            "the side length, in meters, of a square tile with an area of s square meters",
          ],
          work: "A = s², so s = √A because the side length s is positive",
          check: (A) => Math.sqrt(A),
          forward: (s) => s * s,
          domainNote: "",
        };
      }
      const options = r.shuffle([c.meaning, ...c.wrong]);
      const valueKey = c.rounded ? Math.round(c.value * 1000) / 1000 : c.value;
      return problem({
        stem: c.stem,
        parts: [
          part(
            `Write ${c.inv} as a function of ${c.input}.`,
            ask.expr(`${c.inv}(${c.input}) =`, c.key, { vars: [c.input], text: c.text }),
          ),
          part(
            `Find ${c.inv}(${num(c.at)}).${c.rounded ? " Round your answer to three decimal places." : ""}`,
            ask.number(
              `${c.inv}(${num(c.at)}) =`,
              valueKey,
              c.rounded ? { decimals: 3 } : {},
            ),
          ),
          part(
            `Which statement describes the meaning of ${c.inv}(${c.input})?`,
            ask.choice(`${c.inv}(${c.input}) is`, options, c.meaning),
          ),
        ],
        solution: [
          `Set the output equal to the rule and solve for the input: ${c.work}.`,
          `${c.inv}(${num(c.at)}) = ${at(c.text, c.at, c.input)} ${c.rounded ? `≈ ${valueKey.toFixed(3)}` : `= ${num(c.value)}`}.`,
          `The inverse takes the output of the original function and gives its input, so ${c.inv}(${c.input}) is ${c.meaning}.`,
        ],
        data: { c, valueKey },
      });
    },
    verify({ data: { c, valueKey } }) {
      const g = fnOf(c.key, c.input);
      for (const t of [c.at, c.at * 1.5, c.at + 7])
        assertNear(c.forward(g(t)), t, `forward(inverse(${t}))`);
      assert(Math.abs(g(c.at) - valueKey) <= 0.0005 + 1e-9, "the value");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "inverse-by-composition",
    skill: "construct-representations",
    make(r) {
      const m = r.pick([1, 2, -1, -2]);
      const b = r.int(-3, 3);
      const key = `${m}*x + (${b})`;
      const f = (x) => m * x + b;
      // Inputs whose outputs stay inside the window, so every reading is a lattice point.
      const usable = [-3, -2, -1, 0, 1, 2, 3].filter((x) => Math.abs(f(x)) <= 7);
      if (usable.length < 5) reject("not enough lattice points");
      const [p1, p2] = r.sample(usable, 2);
      const y1 = f(p1);
      const y2 = f(p2);
      const marked = sorted([...new Set([0, p1, p2])]);
      const text = inverseLinearText(m, b);
      return problem({
        stem: "The graph of a linear function f is shown. Points with integer coordinates on the graph are marked.",
        blocks: [
          graph({
            caption: "The graph of y = f(x)",
            alt: `A line with ${m > 0 ? "positive" : "negative"} slope passing through ${marked.map((x) => `(${num(x)}, ${num(f(x))})`).join(", ")}.`,
            window: { x: [-8, 8], y: [-8, 8] },
            ticks: { x: 1, y: 1 },
            functions: [{ expr: key }],
            points: marked.map((x) => ({ at: [x, f(x)] })),
          }),
        ],
        parts: [
          part(`Find f⁻¹(${num(y1)}).`, ask.number(`f⁻¹(${num(y1)}) =`, p1)),
          part(`Find f⁻¹(${num(y2)}).`, ask.number(`f⁻¹(${num(y2)}) =`, p2)),
          part(
            "Write an expression for f⁻¹(x).",
            ask.expr("f⁻¹(x) =", `(x - (${b}))/(${m})`, { text }),
          ),
        ],
        solution: [
          `On the graph, the point with y-coordinate ${num(y1)} is (${num(p1)}, ${num(y1)}), so f(${num(p1)}) = ${num(y1)} and f⁻¹(${num(y1)}) = ${num(p1)}.`,
          `The point with y-coordinate ${num(y2)} is (${num(p2)}, ${num(y2)}), so f⁻¹(${num(y2)}) = ${num(p2)}.`,
          `The graph crosses the y-axis at (0, ${num(b)}) and has slope ${num(m)}, so f(x) = ${polyText([m, b])}. Reverse the roles of x and y and solve: f⁻¹(x) = ${text}.`,
        ],
        data: { key, m, b, p1, p2, y1, y2 },
      });
    },
    verify({ data: { key, m, b, p1, p2, y1, y2 } }) {
      const f = fnOf(`${m}*x + (${b})`);
      assertNear(f(p1), y1, "first reading");
      assertNear(f(p2), y2, "second reading");
      const g = fnOf(`(x - (${b}))/(${m})`);
      for (const x of [-3, 0, 2.5]) assertNear(f(g(x)), x, `f(f⁻¹(${x}))`);
      assert(p1 !== p2, "different readings");
      void key;
    },
  },
];

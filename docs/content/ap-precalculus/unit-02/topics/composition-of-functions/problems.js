// Typed-answer problems for Topic 2.7. Each template draws new numbers for every
// variant. verify() recomputes each composite from the displayed functions, so a slip in
// the key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  num,
  par,
  Q,
  Poly,
  polyText,
  ivl,
  unionText,
  fnOf,
  assert,
  assertNear,
  reject,
  sup,
} from "../../../../practice-kit/index.js";

const qText = (value) => (value instanceof Q ? value.toString() : num(value));

// f(g(x)) for polynomials: replace every x in f with g.
const compose = (f, g) =>
  f.c.reduceRight(
    (sum, coefficient) => sum.mul(g).add(new Poly([coefficient])),
    new Poly([0]),
  );

// f(x) written with every x replaced by (inner), such as 2(3x − 1)² − 5(3x − 1) + 4.
const substitute = (f, inner) =>
  f.text().replace(/x([²³⁴⁵⁶⁷⁸⁹]*)/g, (_, power) => `(${inner})${power}`);

const lin = (r) => Poly.of(r.nonzero(-4, 4), r.int(-6, 6));
const quad = (r) => Poly.of(r.pick([1, 2, 3, -1, -2]), r.int(-4, 4), r.int(-5, 5));
const call = (name, argument) => `${name}(${argument})`;
const plain = (text) => String(text).replace(/−/g, "-");

// a·x + b·k + c written with signs, such as 6x + 2k − 5.
function twoVariableText(ax, bk, c) {
  const parts = [
    [ax, "x"],
    [bk, "k"],
    [c, ""],
  ].filter(([value]) => value !== 0);
  return parts
    .map(([value, letter], i) => {
      const size = Math.abs(value);
      const body = letter ? `${size === 1 ? "" : size}${letter}` : String(size);
      return i === 0
        ? `${value < 0 ? "−" : ""}${body}`
        : ` ${value < 0 ? "−" : "+"} ${body}`;
    })
    .join("");
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "evaluate",
    skill: "identify-information",
    make(r) {
      const D = [0, 1, 2, 3, 4];
      const g = D.map(() => r.int(-1, 5));
      const f = D.map(() => r.int(-2, 6));
      const inD = (v) => D.includes(v);
      const as = D.filter((x) => inD(g[x]));
      const bs = D.filter((x) => inD(f[x]));
      if (as.length < 2 || bs.length < 2) reject("too few values to compose");
      const a = r.pick(as);
      const b = r.pick(bs);
      return problem({
        stem: "The table gives values of the functions f and g.",
        blocks: [
          table(
            "Values of f and g",
            ["x", ...D.map(num)],
            [
              ["f(x)", ...f.map(num)],
              ["g(x)", ...g.map(num)],
            ],
          ),
        ],
        parts: [
          part(`Find f(g(${a})).`, ask.number(`f(g(${a})) =`, f[g[a]])),
          part(`Find g(f(${b})).`, ask.number(`g(f(${b})) =`, g[f[b]])),
        ],
        solution: [
          `Work from the inside out. g(${a}) = ${num(g[a])}, and f(${num(g[a])}) = ${num(f[g[a]])}, so f(g(${a})) = ${num(f[g[a]])}.`,
          `f(${b}) = ${num(f[b])}, and g(${num(f[b])}) = ${num(g[f[b]])}, so g(f(${b})) = ${num(g[f[b]])}.`,
        ],
        data: { D, f, g, a, b },
      });
    },
    verify({ data: { D, f, g, a, b } }) {
      assert(D.includes(g[a]) && D.includes(f[b]), "both compositions are defined");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "order-and-identity",
    skill: "solve",
    make(r) {
      const fIsQuad = r.chance();
      const f = fIsQuad ? quad(r) : lin(r);
      const g = fIsQuad ? lin(r) : r.chance() ? quad(r) : lin(r);
      const a = r.int(-3, 3);
      const fg = f.at(g.at(a));
      const gf = g.at(f.at(a));
      if (fg.equals(gf)) reject("the two orders agree");
      if (Math.abs(fg.value) > 300 || Math.abs(gf.value) > 300)
        reject("values too large");
      return problem({
        stem: `Let f(x) = ${f.text()} and g(x) = ${g.text()}.`,
        parts: [
          part(`Find f(g(${num(a)})).`, ask.number(`f(g(${num(a)})) =`, fg)),
          part(`Find g(f(${num(a)})).`, ask.number(`g(f(${num(a)})) =`, gf)),
        ],
        solution: [
          `g(${num(a)}) = ${qText(g.at(a))}, and f(${qText(g.at(a))}) = ${qText(fg)}, so f(g(${num(a)})) = ${qText(fg)}.`,
          `f(${num(a)}) = ${qText(f.at(a))}, and g(${qText(f.at(a))}) = ${qText(gf)}, so g(f(${num(a)})) = ${qText(gf)}.`,
          "The two values differ because composition is not commutative: the order of the functions matters.",
        ],
        data: { f, g, a, fg, gf },
      });
    },
    verify({ data: { f, g, a, fg, gf } }) {
      const F = f.fn();
      const G = g.fn();
      assertNear(F(G(a)), fg.value, "f(g(a))");
      assertNear(G(F(a)), gf.value, "g(f(a))");
      assert(
        Math.abs(fg.value - gf.value) > 1e-9,
        "different orders give different values",
      );
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "construct",
    skill: "construct-functions",
    make(r) {
      const f = quad(r);
      const g = Poly.of(r.nonzero(-3, 3), r.nonzero(-4, 4));
      const fg = compose(f, g);
      const gf = compose(g, f);
      return problem({
        stem: `Let f(x) = ${f.text()} and g(x) = ${g.text()}.`,
        parts: [
          part(
            "Write f(g(x)) as a polynomial in standard form.",
            ask.expr("f(g(x)) =", fg.text(), { form: "expanded" }),
          ),
          part(
            "Write g(f(x)) as a polynomial in standard form.",
            ask.expr("g(f(x)) =", gf.text(), { form: "expanded" }),
          ),
        ],
        solution: [
          `Replace every x in f with g(x): f(g(x)) = ${substitute(f, g.text())}. Expanding and combining like terms gives ${fg.text()}.`,
          `Replace every x in g with f(x): g(f(x)) = ${substitute(g, f.text())}. Expanding gives ${gf.text()}.`,
        ],
        data: { f, g, fg, gf },
      });
    },
    verify({ data: { f, g, fg, gf } }) {
      const F = f.fn();
      const G = g.fn();
      for (const x of [-2, -0.5, 1, 3]) {
        assertNear(F(G(x)), fg.fn()(x), `f(g(${x}))`);
        assertNear(G(F(x)), gf.fn()(x), `g(f(${x}))`);
      }
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "decompose",
    skill: "equivalent-forms",
    make(r) {
      const inner = () => {
        const a = r.nonzero(-4, 4);
        const b = r.nonzero(-6, 6);
        return Poly.of(a, b);
      };
      // Families where the outer function is determined by the inner one. hKey is h(x)
      // written for the checker, so verify() can compare f(g(x)) with h(x).
      const key = (g) => plain(g.text());
      const given = [
        (g) => {
          const n = r.pick([2, 3, 4, 5]);
          return {
            h: `(${g.text()})${sup(n)}`,
            hKey: `(${key(g)})^${n}`,
            fText: `x${sup(n)}`,
            fKey: `x^${n}`,
          };
        },
        (g) => ({
          h: `√(${g.text()})`,
          hKey: `sqrt(${key(g)})`,
          fText: "√x",
          fKey: "sqrt(x)",
        }),
        (g) => ({
          h: `1/(${g.text()})`,
          hKey: `1/(${key(g)})`,
          fText: "1/x",
          fKey: "1/x",
        }),
        (g) => {
          const c = r.pick([2, 3, 5]);
          return {
            h: `${c}^(${g.text()})`,
            hKey: `${c}^(${key(g)})`,
            fText: `${c}ˣ`,
            fKey: `${c}^x`,
          };
        },
        (g) => {
          const k = r.pick([2, 3, 4, -2, -3, 5]);
          const n = r.pick([2, 3]);
          return {
            h: `${k < 0 ? "−" : ""}${Math.abs(k)}(${g.text()})${sup(n)}`,
            hKey: `(${k})*(${key(g)})^${n}`,
            fText: `${k < 0 ? "−" : ""}${Math.abs(k)}x${sup(n)}`,
            fKey: `(${k})*x^${n}`,
          };
        },
        (g) => ({
          h: `|${g.text()}|`,
          hKey: `abs(${key(g)})`,
          fText: "|x|",
          fKey: "abs(x)",
        }),
      ];
      // Families where the inner function is determined by a given outer one.
      const asked = [
        (g) => {
          const n = r.pick([3, 5]);
          return {
            h: `(${g.text()})${sup(n)}`,
            hKey: `(${key(g)})^${n}`,
            fText: `x${sup(n)}`,
            fKey: `x^${n}`,
          };
        },
        (g) => ({
          h: `√(${g.text()})`,
          hKey: `sqrt(${key(g)})`,
          fText: "√x",
          fKey: "sqrt(x)",
        }),
        (g) => ({
          h: `1/(${g.text()})`,
          hKey: `1/(${key(g)})`,
          fText: "1/x",
          fKey: "1/x",
        }),
        (g) => {
          const c = r.pick([2, 3, 5]);
          return {
            h: `${c}^(${g.text()})`,
            hKey: `${c}^(${key(g)})`,
            fText: `${c}ˣ`,
            fKey: `${c}^x`,
          };
        },
      ];
      const g1 = inner();
      const first = r.pick(given)(g1);
      const g2 = inner();
      const second = r.pick(asked)(g2);
      return problem({
        stem: "Each function h can be written as a composition, h(x) = f(g(x)).",
        parts: [
          part(
            `If h(x) = ${first.h} and g(x) = ${g1.text()}, find f(x).`,
            ask.expr("f(x) =", first.fKey, { text: first.fText }),
          ),
          part(
            `If h(x) = ${second.h} and f(x) = ${second.fText}, find g(x).`,
            ask.expr("g(x) =", g2.text(), { form: "any" }),
          ),
        ],
        solution: [
          `In ${first.h}, the expression ${g1.text()} is the inside function g(x). The remaining operation applied to it is f(x) = ${first.fText}.`,
          `In ${second.h}, f(x) = ${second.fText} is applied to the inside expression, so g(x) = ${g2.text()}.`,
        ],
        data: { first, second, g1, g2 },
      });
    },
    verify({ data: { first, second, g1, g2 } }) {
      for (const [spec, g] of [
        [first, g1],
        [second, g2],
      ]) {
        const h = fnOf(spec.hKey);
        const f = fnOf(spec.fKey);
        const G = g.fn();
        let checked = 0;
        for (let x = -9; x <= 9; x += 1.3) {
          const expected = h(x);
          const actual = f(G(x));
          if (Number.isFinite(expected) && Number.isFinite(actual)) {
            assertNear(actual, expected, `f(g(${x})) = h(${x})`);
            checked += 1;
          }
        }
        assert(checked >= 3, "the composition is checked at several points");
      }
      assert(g1.degree === 1 && g2.degree === 1, "linear inner functions");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "evaluate",
    skill: "identify-information",
    make(r) {
      const D = [0, 1, 2, 3, 4];
      const g = D.map(() => r.int(-1, 5));
      const f = D.map(() => r.int(-2, 6));
      const inD = (v) => D.includes(v);
      const as = D.filter((x) => inD(g[x]));
      const bs = D.filter((x) => inD(f[x]));
      const notBs = D.filter((x) => !inD(f[x]));
      if (as.length < 2 || as.length > 4) reject("need some compositions undefined");
      if (bs.length < 1 || notBs.length < 1) reject("need both cases for g(f(x))");
      const a = r.pick(as);
      const b = r.chance() ? r.pick(bs) : r.pick(notBs);
      const found = inD(f[b]);
      return problem({
        stem: "The table gives all of the values of the functions f and g. The input values of each function are 0, 1, 2, 3, and 4.",
        blocks: [
          table(
            "Values of f and g",
            ["x", ...D.map(num)],
            [
              ["f(x)", ...f.map(num)],
              ["g(x)", ...g.map(num)],
            ],
          ),
        ],
        parts: [
          part(`Find f(g(${a})).`, ask.number(`f(g(${a})) =`, f[g[a]])),
          part(
            `Can g(f(${b})) be found from the table?`,
            ask.choice(
              `g(f(${b}))`,
              ["can be found", "cannot be found"],
              found ? "can be found" : "cannot be found",
            ),
          ),
          part(
            "For how many of the input values x = 0, 1, 2, 3, 4 can f(g(x)) be found from the table?",
            ask.number("Number of values =", as.length),
          ),
        ],
        solution: [
          `g(${a}) = ${num(g[a])}, and f(${num(g[a])}) = ${num(f[g[a]])}, so f(g(${a})) = ${num(f[g[a]])}.`,
          found
            ? `f(${b}) = ${num(f[b])}, which is an input of g, so g(f(${b})) = ${num(g[f[b]])} can be found.`
            : `f(${b}) = ${num(f[b])}, but ${num(f[b])} is not an input in the table for g, so g(f(${b})) cannot be found.`,
          `f(g(x)) can be found only when g(x) is an input of f. This happens for x = ${as.join(", ")}, which is ${as.length} values.`,
        ],
        data: { f, g, a, b, found, as },
      });
    },
    verify({ data: { f, g, a, b, found, as } }) {
      const D = [0, 1, 2, 3, 4];
      assert(D.includes(g[a]), "f(g(a)) is defined");
      assert(D.includes(f[b]) === found, "definedness of g(f(b))");
      assert(
        as.every((x) => D.includes(g[x])) &&
          as.length === D.filter((x) => D.includes(g[x])).length,
        "count",
      );
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "order-and-identity",
    skill: "construct-functions",
    make(r) {
      const m = r.pick([2, 3, 4, 5, -2]);
      const p = r.pick([2, 3, 4, 5, -2, -3]);
      const t = r.nonzero(-3, 3);
      const n = (m - 1) * t;
      const k = (p - 1) * t;
      if (m === 1 || p === 1) reject("degenerate");
      const fgText = twoVariableText(m * p, m, n);
      const gfText = twoVariableText(p * m, 1, p * n);
      const fgKey = `(${m})*((${p})*x + k) + (${n})`;
      const gfKey = `(${p})*((${m})*x + (${n})) + k`;
      return problem({
        stem: `Let f(x) = ${polyText([m, n])} and g(x) = ${twoVariableText(p, 1, 0)}, where k is a constant.`,
        parts: [
          part(
            "Write f(g(x)) in terms of x and k.",
            ask.expr("f(g(x)) =", fgKey, { vars: ["x", "k"], text: fgText }),
          ),
          part(
            "Write g(f(x)) in terms of x and k.",
            ask.expr("g(f(x)) =", gfKey, { vars: ["x", "k"], text: gfText }),
          ),
          part(
            "Find the value of k for which f(g(x)) = g(f(x)) for every x.",
            ask.number("k =", k),
          ),
          part(
            "Let I(x) = x be the identity function. Which of the following are equal to f(x)?",
            ask.choice(
              "Equal to f(x):",
              ["f(I(x)) only", "I(f(x)) only", "both f(I(x)) and I(f(x))", "neither"],
              "both f(I(x)) and I(f(x))",
            ),
          ),
        ],
        solution: [
          `f(g(x)) = ${num(m)}(${twoVariableText(p, 1, 0)}) ${n < 0 ? "−" : "+"} ${Math.abs(n)} = ${fgText}.`,
          `g(f(x)) = ${num(p)}(${polyText([m, n])}) + k = ${gfText}.`,
          `The x terms already match. Setting the remaining terms equal gives ${num(m)}k ${n < 0 ? "−" : "+"} ${Math.abs(n)} = ${num(p * n)} + k, so ${num(m - 1)}k = ${num(p * n - n)} and k = ${num(k)}.`,
          "Composing with the identity function changes nothing: f(I(x)) = f(x) and I(f(x)) = f(x).",
        ],
        data: { m, n, p, k, fgKey, gfKey },
      });
    },
    verify({ data: { m, n, p, k, fgKey, gfKey } }) {
      const f = (x) => m * x + n;
      const g = (x, kk) => p * x + kk;
      for (const x of [-2, 0, 1.5, 4]) {
        assertNear(f(g(x, k)), g(f(x), k), `equal when k = ${k}`);
        assertNear(fnOf(fgKey.replace(/k/g, `(${k})`))(x), f(g(x, k)), "f(g(x))");
        assertNear(fnOf(gfKey.replace(/k/g, `(${k})`))(x), g(f(x), k), "g(f(x))");
      }
      assert(m - 1 !== 0 && (m - 1) * k === n * (p - 1), "k solves the equation");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "construct",
    skill: "construct-functions",
    make(r) {
      const squareFamily = r.chance();
      const c = r.nonzero(-3, 5);
      if (squareFamily) {
        const cases = [
          { a: 1, e: 3, s: 2 },
          { a: 2, e: 5, s: 3 },
          { a: 3, e: 7, s: 4 },
          { a: 4, e: 9, s: 5 },
          { a: 2, e: 12, s: 4 },
          { a: 3, e: 16, s: 5 },
          { a: 5, e: 11, s: 6 },
          { a: 5, e: -9, s: 4 },
          { a: 5, e: -16, s: 3 },
          { a: 10, e: -36, s: 8 },
          { a: 13, e: -25, s: 12 },
        ];
        const pick = r.pick(cases);
        const d = pick.e - c;
        const g = Poly.of(1, 0, d);
        const composite = Poly.of(1, 0, pick.e);
        const domain =
          pick.e > 0
            ? ivl(-Infinity, Infinity)
            : unionText(
                ivl(-Infinity, -Math.sqrt(-pick.e), false, true),
                ivl(Math.sqrt(-pick.e), Infinity, true),
              );
        return problem({
          stem: `Let f(x) = √(${polyText([1, c])}) and g(x) = ${g.text()}.`,
          parts: [
            part(
              "Write f(g(x)) as a single square root.",
              ask.expr("f(g(x)) =", `sqrt(${composite.text()})`, {
                text: `√(${composite.text()})`,
              }),
            ),
            part("Find the domain of f(g(x)).", ask.interval("Domain:", domain)),
            part(`Find f(g(${pick.a})).`, ask.number(`f(g(${pick.a})) =`, pick.s)),
          ],
          solution: [
            `Replace x in f with g(x): f(g(x)) = √((${g.text()}) ${c < 0 ? "−" : "+"} ${Math.abs(c)}) = √(${composite.text()}).`,
            pick.e > 0
              ? `The radicand ${composite.text()} is positive for every x, so the domain is all real numbers, ${domain}.`
              : `The radicand must be at least 0, so ${composite.text()} ≥ 0, which means x² ≥ ${-pick.e}. The domain is ${domain}.`,
            `f(g(${pick.a})) = √(${pick.a}² ${pick.e < 0 ? "−" : "+"} ${Math.abs(pick.e)}) = √${pick.a * pick.a + pick.e} = ${pick.s}.`,
          ],
          data: { family: "square", c, g, composite, pick },
        });
      }
      const cases = [
        { a: 1, k: 1, s: 1 },
        { a: 1, k: 4, s: 2 },
        { a: 1, k: 9, s: 3 },
        { a: 2, k: 2, s: 2 },
        { a: 2, k: 8, s: 4 },
        { a: 3, k: 3, s: 3 },
        { a: 4, k: 1, s: 2 },
        { a: 4, k: 4, s: 4 },
        { a: -1, k: -1, s: 1 },
        { a: -1, k: -4, s: 2 },
        { a: -2, k: -2, s: 2 },
      ];
      const pick = r.pick(cases);
      const root = r.int(-4, 5);
      const e = -pick.a * root;
      const b = e - c;
      const g = Poly.of(pick.a, b);
      const composite = Poly.of(pick.a, e);
      const x0 = root + pick.k;
      const domain =
        pick.a > 0 ? ivl(root, Infinity, true) : ivl(-Infinity, root, false, true);
      return problem({
        stem: `Let f(x) = √(${polyText([1, c])}) and g(x) = ${g.text()}.`,
        parts: [
          part(
            "Write f(g(x)) as a single square root.",
            ask.expr("f(g(x)) =", `sqrt(${composite.text()})`, {
              text: `√(${composite.text()})`,
            }),
          ),
          part("Find the domain of f(g(x)).", ask.interval("Domain:", domain)),
          part(`Find f(g(${num(x0)})).`, ask.number(`f(g(${num(x0)})) =`, pick.s)),
        ],
        solution: [
          `Replace x in f with g(x): f(g(x)) = √((${g.text()}) ${c < 0 ? "−" : "+"} ${Math.abs(c)}) = √(${composite.text()}).`,
          `The radicand must be at least 0: ${composite.text()} ≥ 0, so x ${pick.a > 0 ? "≥" : "≤"} ${num(root)}. The domain is ${domain}.`,
          `f(g(${num(x0)})) = √(${pick.a === 1 ? "" : pick.a === -1 ? "−" : pick.a}(${num(x0)}) ${e < 0 ? "−" : "+"} ${Math.abs(e)}) = √${pick.s * pick.s} = ${pick.s}.`,
        ],
        data: { family: "linear", c, g, composite, pick, root, x0 },
      });
    },
    verify({ data: { family, c, g, composite, pick, root, x0 } }) {
      const G = g.fn();
      const C = composite.fn();
      const f = (x) => Math.sqrt(x + c);
      for (const x of [-6, -3, 0, 2.5, 7]) {
        const inner = G(x);
        if (inner + c >= 0) assertNear(f(inner), Math.sqrt(C(x)), `f(g(${x}))`);
        assert(inner + c >= -1e-12 === C(x) >= -1e-12, `domain agrees at ${x}`);
      }
      const at = family === "square" ? pick.a : x0;
      assertNear(f(G(at)), pick.s, "the value");
      if (family === "linear") assertNear(C(root), 0, "the boundary of the domain");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "construct",
    skill: "construct-representations",
    make(r) {
      const kind = r.pick(["ripple", "balloon", "patio", "cost", "temperature"]);
      let c;
      if (kind === "ripple") {
        const k = r.int(2, 6);
        const t0 = r.int(2, 8);
        c = {
          stem: `The radius of a circular ripple is r(t) = ${k}t centimeters, where t is the number of seconds after a stone hits the water. The area of a circle with radius r is A(r) = πr².`,
          name: "A(r(t))",
          ask: ask.expr("A(r(t)) =", `${k * k}*π*t^2`, {
            vars: ["t"],
            text: `${k * k}πt²`,
          }),
          t0,
          value: Math.PI * k * k * t0 * t0,
          rounded: true,
          source: (t) => Math.PI * (k * t) ** 2,
          meaning:
            "the area, in square centimeters, of the ripple t seconds after the stone hits the water",
          wrong: [
            "the radius, in centimeters, of the ripple t seconds after the stone hits the water",
            "the area, in square centimeters, of a circle whose radius is t centimeters",
          ],
          expr: `${k * k}πt²`,
          work: `A(r(t)) = π(${k}t)² = ${k * k}πt²`,
          at: `A(r(${t0})) = ${k * k}π(${t0})² = ${k * k * t0 * t0}π`,
        };
      } else if (kind === "balloon") {
        const k = r.pick([1, 2, 3, 4, 6]);
        const t0 = r.int(2, 5);
        const coef = new Q(4 * k ** 3, 3);
        const coefText = coef.isInteger ? String(coef) : `(${coef})`;
        c = {
          stem: `A spherical balloon is inflated so that its radius is r(t) = ${k}t centimeters after t seconds. The volume of a sphere with radius r is V(r) = (4/3)πr³.`,
          name: "V(r(t))",
          ask: ask.expr("V(r(t)) =", `(${coef.toString()})*π*t^3`, {
            vars: ["t"],
            text: `${coefText}πt³`,
          }),
          t0,
          value: (4 / 3) * Math.PI * (k * t0) ** 3,
          rounded: true,
          source: (t) => (4 / 3) * Math.PI * (k * t) ** 3,
          meaning:
            "the volume, in cubic centimeters, of the balloon t seconds after inflation begins",
          wrong: [
            "the radius, in centimeters, of the balloon t seconds after inflation begins",
            "the volume, in cubic centimeters, of a sphere whose radius is t centimeters",
          ],
          expr: `${coefText}πt³`,
          work: `V(r(t)) = (4/3)π(${k}t)³ = ${coefText}πt³`,
          at: `V(r(${t0})) = ${coefText}π(${t0})³`,
        };
      } else if (kind === "patio") {
        const a = r.int(1, 3);
        const b = r.int(2, 8);
        const t0 = r.int(2, 6);
        const s = Poly.of(a, b);
        const area = s.mul(s);
        c = {
          stem: `A square patio is extended so that its side length is s(t) = ${s.text("t")} feet after t days of work. The area of a square with side length s is A(s) = s².`,
          name: "A(s(t))",
          ask: ask.expr("A(s(t)) =", area.text("t"), { vars: ["t"], form: "expanded" }),
          t0,
          value: area.at(t0),
          rounded: false,
          source: (t) => area.fn()(t),
          meaning: "the area, in square feet, of the patio t days after the work begins",
          wrong: [
            "the side length, in feet, of the patio t days after the work begins",
            "the area, in square feet, of a square whose side length is t feet",
          ],
          expr: area.text("t"),
          work: `A(s(t)) = (${s.text("t")})² = ${area.text("t")}`,
          at: `A(s(${t0})) = ${area.text("t").replace(/t/g, `(${t0})`)}`,
        };
      } else if (kind === "cost") {
        const u = r.int(3, 9);
        const p = r.pick([2, 3, 4, 5, 6, 8]);
        const q = r.pick([50, 75, 100, 120, 150]);
        const t0 = r.int(2, 8);
        const total = Poly.of(p * u, q);
        c = {
          stem: `A factory makes n(h) = ${u}h items during h hours of production. The cost, in dollars, of making n items is C(n) = ${p}n + ${q}.`,
          name: "C(n(h))",
          ask: ask.expr("C(n(h)) =", total.text("h"), { vars: ["h"], form: "expanded" }),
          t0,
          value: total.at(t0),
          rounded: false,
          source: (h) => total.fn()(h),
          meaning: "the cost, in dollars, of the items made during h hours of production",
          wrong: [
            "the number of items made during h hours of production",
            "the cost, in dollars, of making h items",
          ],
          expr: total.text("h"),
          work: `C(n(h)) = ${p}(${u}h) + ${q} = ${total.text("h")}`,
          at: `C(n(${t0})) = ${p * u}(${t0}) + ${q}`,
          variable: "h",
        };
      } else {
        const base = r.pick([10, 15, 20, 25, 30]);
        const t0 = r.int(2, 6);
        const celsius = Poly.of(5, base);
        const fahrenheit = Poly.of(9, (9 * base) / 5 + 32);
        c = {
          stem: `A lab sample is heated so that its temperature is C(t) = ${celsius.text("t")} degrees Celsius after t minutes. The temperature in degrees Fahrenheit is F(C) = (9/5)C + 32.`,
          name: "F(C(t))",
          ask: ask.expr("F(C(t)) =", fahrenheit.text("t"), {
            vars: ["t"],
            form: "expanded",
          }),
          t0,
          value: fahrenheit.at(t0),
          rounded: false,
          source: (t) => fahrenheit.fn()(t),
          meaning:
            "the temperature, in degrees Fahrenheit, of the sample t minutes after heating begins",
          wrong: [
            "the temperature, in degrees Celsius, of the sample t minutes after heating begins",
            "the temperature, in degrees Fahrenheit, of a sample whose Celsius temperature is t degrees",
          ],
          expr: fahrenheit.text("t"),
          work: `F(C(t)) = (9/5)(${celsius.text("t")}) + 32 = ${fahrenheit.text("t")}`,
          at: `F(C(${t0})) = ${fahrenheit.text("t").replace(/t/g, `(${t0})`)}`,
        };
      }
      const inputName = c.variable || "t";
      const options = r.shuffle([c.meaning, ...c.wrong]);
      const valueKey = c.rounded ? Math.round(c.value * 1000) / 1000 : c.value;
      const nameAt = c.name.replace(/\(\w\)\)$/, `(${c.t0}))`);
      const result = c.rounded ? `≈ ${valueKey.toFixed(3)}` : `= ${qText(c.value)}`;
      return problem({
        stem: c.stem,
        parts: [
          part(`Write ${c.name} as a function of ${inputName}.`, c.ask),
          part(
            `Find ${nameAt}.${c.rounded ? " Round your answer to three decimal places." : ""}`,
            ask.number(`${nameAt} =`, valueKey, c.rounded ? { decimals: 3 } : {}),
          ),
          part(
            `Which statement describes the meaning of ${c.name}?`,
            ask.choice(`${c.name} is`, options, c.meaning),
          ),
        ],
        solution: [
          `Substitute the inner function for the input of the outer function: ${c.work}.`,
          `${c.at} ${result}.`,
          `The composite takes the input of the inner function, ${inputName}, and gives the output of the outer function, so ${c.name} is ${c.meaning}.`,
        ],
        data: { source: c.source, t0: c.t0, valueKey, kind },
      });
    },
    verify({ data: { source, t0, valueKey } }) {
      const value = source(t0);
      const target = valueKey instanceof Q ? valueKey.value : valueKey;
      assert(Math.abs(value - target) <= 0.0005 + 1e-9, "the value of the composite");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "decompose",
    skill: "equivalent-forms",
    make(r) {
      const f = quad(r);
      const h = r.pick([1, 2, 3, -1, -2, -3]);
      const dil = r.pick([2, 3, -1, 4]);
      const A = r.pick([2, 3, -1, -2, 4]);
      const B = r.nonzero(-5, 5);
      const translate = Poly.of(1, -h);
      const dilate = Poly.of(dil, 0);
      const vertical = Poly.of(A, B);
      const horizontal = compose(f, translate);
      const stretched = compose(f, dilate);
      const outer = compose(vertical, f);
      return problem({
        stem: `Let f(x) = ${f.text()}.`,
        parts: [
          part(
            `Let t(x) = ${translate.text()}. Write f(t(x)), a horizontal translation of f, as a polynomial in standard form.`,
            ask.expr("f(t(x)) =", horizontal.text(), { form: "expanded" }),
          ),
          part(
            `Let d(x) = ${dilate.text()}. Write f(d(x)), a horizontal dilation of f, as a polynomial in standard form.`,
            ask.expr("f(d(x)) =", stretched.text(), { form: "expanded" }),
          ),
          part(
            `Let v(x) = ${vertical.text()}. Write v(f(x)), a vertical dilation and translation of f, as a polynomial in standard form.`,
            ask.expr("v(f(x)) =", outer.text(), { form: "expanded" }),
          ),
        ],
        solution: [
          `Replace x in f with t(x): f(t(x)) = ${substitute(f, translate.text())} = ${horizontal.text()}.`,
          `Replace x in f with d(x): f(d(x)) = ${substitute(f, dilate.text())} = ${stretched.text()}.`,
          `Replace x in v with f(x): v(f(x)) = ${substitute(vertical, f.text())} = ${outer.text()}.`,
        ],
        data: { f, translate, dilate, vertical, horizontal, stretched, outer },
      });
    },
    verify({ data: { f, translate, dilate, vertical, horizontal, stretched, outer } }) {
      const F = f.fn();
      for (const x of [-2, 0, 1.5, 3]) {
        assertNear(horizontal.fn()(x), F(translate.fn()(x)), "translation");
        assertNear(stretched.fn()(x), F(dilate.fn()(x)), "dilation");
        assertNear(outer.fn()(x), vertical.fn()(F(x)), "vertical");
      }
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "evaluate",
    skill: "solve",
    make(r) {
      const f = Poly.of(r.nonzero(-3, 3), r.int(-5, 5));
      const g = r.chance() ? Poly.of(1, 0, 0) : Poly.of(1, 0, r.int(-3, 3));
      const k = Poly.of(r.pick([1, 2, -1, 3]), r.nonzero(-4, 4));
      const a = r.int(-2, 3);
      const fgk = compose(f, compose(g, k));
      const kgf = compose(k, compose(g, f));
      const v1 = f.at(g.at(k.at(a)));
      const v2 = k.at(g.at(f.at(a)));
      if (v1.equals(v2)) reject("both orders agree");
      if (Math.abs(v1.value) > 500 || Math.abs(v2.value) > 500)
        reject("values too large");
      return problem({
        stem: `Let f(x) = ${f.text()}, g(x) = ${g.text()}, and k(x) = ${k.text()}.`,
        parts: [
          part(`Find f(g(k(${num(a)}))).`, ask.number(`f(g(k(${num(a)}))) =`, v1)),
          part(`Find k(g(f(${num(a)}))).`, ask.number(`k(g(f(${num(a)}))) =`, v2)),
          part(
            "Write f(g(k(x))) as a polynomial in standard form.",
            ask.expr("f(g(k(x))) =", fgk.text(), { form: "expanded" }),
          ),
        ],
        solution: [
          `Work from the inside out. k(${num(a)}) = ${qText(k.at(a))}, g(${qText(k.at(a))}) = ${qText(g.at(k.at(a)))}, and f(${qText(g.at(k.at(a)))}) = ${qText(v1)}, so f(g(k(${num(a)}))) = ${qText(v1)}.`,
          `f(${num(a)}) = ${qText(f.at(a))}, g(${qText(f.at(a))}) = ${qText(g.at(f.at(a)))}, and k(${qText(g.at(f.at(a)))}) = ${qText(v2)}, so k(g(f(${num(a)}))) = ${qText(v2)}.`,
          `For the expression, replace x in k, then g, then f: g(k(x)) = ${substitute(g, k.text())} = ${compose(g, k).text()}, and f(g(k(x))) = ${substitute(f, `${compose(g, k).text()}`)} = ${fgk.text()}.`,
        ],
        data: { f, g, k, a, v1, v2, fgk, kgf },
      });
    },
    verify({ data: { f, g, k, a, v1, v2, fgk } }) {
      const F = f.fn();
      const G = g.fn();
      const K = k.fn();
      assertNear(F(G(K(a))), v1.value, "f(g(k(a)))");
      assertNear(K(G(F(a))), v2.value, "k(g(f(a)))");
      for (const x of [-2, 0, 1.5, 3])
        assertNear(F(G(K(x))), fgk.fn()(x), "composite polynomial");
    },
  },
];

// Typed-answer problems for Topic 1.5. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed expression or graph, so a
// slip in the key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  graph,
  table,
  factoredText,
  factorText,
  polyText,
  termsText,
  ratio,
  signed,
  sup,
  num,
  par,
  Poly,
  fnOf,
  assert,
  assertNear,
  reject,
  signedLead,
} from "../../../../practice-kit/index.js";

// A complex number written the way a student types it: 3 + 2i, −2i, 4.
function cx(re, im) {
  if (im === 0) return num(re);
  const body = Math.abs(im) === 1 ? "i" : `${Math.abs(im)}i`;
  if (re === 0) return im < 0 ? `−${body}` : body;
  return `${num(re)} ${im < 0 ? "−" : "+"} ${body}`;
}

const powerSymbol = (n) => (n === 0 ? "" : n === 1 ? "x" : `x${sup(n)}`);

// Builds f(x) from [power, coefficient] pairs, highest power first.
function fromTerms(pairs) {
  const sorted = [...pairs].sort((m, n) => n[0] - m[0]);
  return {
    sorted,
    text: termsText(sorted.map(([power, c]) => [c, powerSymbol(power)])),
    // f(−x): odd powers change sign.
    flipped: termsText(
      sorted.map(([power, c]) => [power % 2 === 1 ? -c : c, powerSymbol(power)]),
    ),
  };
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    unit: true,
    concept: "zeros-and-factors",
    skill: "solve",
    make(r) {
      const a = r.nonzero(-4, 4);
      const p = r.nonzero(-6, 6);
      const k = r.nonzero(-8, 8);
      const q = -(a ** 3 + p * a * a + k * a);
      if (q === 0) reject("no constant term to show");
      const text = `x³ ${signedLead(p)}x² + kx ${signed(q)}`;
      const A = `(${num(a)})`;
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}, where k is a constant. The expression ${factorText(a)} is a factor of f(x). Find the value of k.`,
        parts: [ask.number("k =", k)],
        solution: [
          `If ${factorText(a)} is a factor of f(x), then ${num(a)} is a zero of f, so f(${num(a)}) = 0.`,
          `${A}³ ${signedLead(p)}${A}² + k${A} ${signed(q)} = 0 gives ${num(a ** 3 + p * a * a + q)} ${signedLead(a)}k = 0, so k = ${num(k)}.`,
        ],
        data: { a, p, k, q },
      });
    },
    verify({ data: { a, p, k, q } }) {
      const f = fnOf(`x^3 + (${p})x^2 + (${k})x + (${q})`);
      assertNear(f(a), 0, "f(a)");
    },
  },
  {
    id: "p02",
    tier: "quick",
    concept: "multiplicity",
    skill: "describe",
    make(r) {
      const roots = r.distinctNonzero(-6, 6, 3);
      const mults = r.shuffle([1, 2, 3]);
      const lead_ = r.pick([1, 2, -1, -3]);
      const text = factoredText(
        lead_,
        roots.map((root, i) => [root, mults[i]]),
      );
      const pick = r.int(0, 2);
      const root = roots[pick];
      const m = mults[pick];
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}. Consider the zero of f at x = ${num(root)}.`,
        parts: [
          part("What is the multiplicity of this zero?", ask.number("Multiplicity", m)),
          part(
            "Does the graph of f cross the x-axis or touch the x-axis and turn around at x = " +
              num(root) +
              "?",
            ask.choice(
              "The graph",
              ["crosses", "touches"],
              m % 2 === 1 ? "crosses" : "touches",
            ),
          ),
        ],
        solution: [
          `The factor ${factorText(root)} appears with exponent ${m}, so the multiplicity of the zero x = ${num(root)} is ${m}.`,
          `${m % 2 === 1 ? "An odd multiplicity" : "An even multiplicity"} means the graph ${m % 2 === 1 ? "crosses" : "touches and turns around at"} the x-axis there${m === 3 ? ", flattening out as it crosses" : ""}.`,
        ],
        data: { text, root, m },
      });
    },
    verify({ data: { text, root, m } }) {
      const f = fnOf(text);
      const left = f(root - 0.01);
      const right = f(root + 0.01);
      assert(
        left * right < 0 === (m % 2 === 1),
        "crossing matches the parity of the multiplicity",
      );
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "conjugate-zeros",
    skill: "identify-information",
    make(r) {
      const re = r.int(-5, 5);
      const im = r.int(1, 5);
      const real = r.nonzero(-5, 5);
      if (real === re) reject("the real zero matches the real part");
      return problem({
        stem: `A polynomial function p has real coefficients. Two of its zeros are x = ${num(real)} and x = ${cx(re, im)}.`,
        parts: [
          part(
            "What is another zero of p?",
            ask.set("Another zero", [cx(re, -im)], { complex: true }),
          ),
          part("What is the least possible degree of p?", ask.number("Least degree", 3)),
        ],
        solution: [
          `Nonreal zeros of a polynomial with real coefficients come in conjugate pairs, so ${cx(re, im)} forces its conjugate ${cx(re, -im)} to be a zero too.`,
          `The zeros ${num(real)}, ${cx(re, im)}, and ${cx(re, -im)} give at least 3 linear factors, so the least possible degree is 3.`,
        ],
        data: { re, im, real },
      });
    },
    verify({ data: { re, im, real } }) {
      assert(im !== 0 && real !== re, "a nonreal zero and a separate real zero");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "even-and-odd",
    skill: "support-conclusions",
    make(r) {
      const kind = r.pick(["even", "odd", "neither"]);
      const degree = r.int(3, 6);
      const evens = [0, 2, 4, 6].filter((n) => n <= degree);
      const odds = [1, 3, 5].filter((n) => n <= degree);
      let powers;
      if (kind === "even") powers = r.sample(evens, Math.min(evens.length, r.int(2, 3)));
      else if (kind === "odd")
        powers = r.sample(odds, Math.min(odds.length, r.int(2, 3)));
      else
        powers = [
          ...r.sample(evens, 1),
          ...r.sample(odds, 1),
          ...r.sample([...evens, ...odds], r.int(0, 1)),
        ];
      powers = [...new Set(powers)];
      if (powers.length < 2) reject("too short");
      const pairs = powers.map((power) => [power, r.nonzero(-7, 7)]);
      const { text, flipped, sorted } = fromTerms(pairs);
      const evenOdd = sorted.every(([power]) => power % 2 === 0)
        ? "even"
        : sorted.every(([power]) => power % 2 === 1)
          ? "odd"
          : "neither";
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}.`,
        parts: [
          part(
            "Write f(−x) in simplified form.",
            ask.expr("f(−x) =", flipped, { form: "expanded" }),
          ),
          part(
            "Is f even, odd, or neither?",
            ask.choice("f is", ["even", "odd", "neither"], evenOdd),
          ),
        ],
        solution: [
          `Replace x with −x. An even power of −x equals the same power of x, and an odd power of −x has the opposite sign, so f(−x) = ${flipped}.`,
          evenOdd === "even"
            ? "Every term has an even power, so f(−x) = f(x). The function is even."
            : evenOdd === "odd"
              ? "Every term has an odd power, so f(−x) = −f(x). The function is odd."
              : "Some terms keep their sign and some change sign, so f(−x) is neither f(x) nor −f(x). The function is neither even nor odd.",
        ],
        data: { text, flipped, evenOdd, kind },
      });
    },
    verify({ data: { text, flipped, evenOdd } }) {
      const f = fnOf(text);
      const g = fnOf(flipped);
      for (const x of [0.7, 1.9, 3.1]) {
        assertNear(g(x), f(-x), "f(−x)");
        if (evenOdd === "even") assertNear(f(-x), f(x), "even");
        else if (evenOdd === "odd") assertNear(f(-x), -f(x), "odd");
        else
          assert(
            Math.abs(f(-x) - f(x)) > 1e-6 && Math.abs(f(-x) + f(x)) > 1e-6,
            "neither",
          );
      }
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "zeros-and-factors",
    skill: "solve",
    make(r) {
      const [a, b, c] = r.distinctNonzero(-5, 5, 3);
      const k = r.pick([1, 1, 2]);
      const poly = Poly.fromRoots(k, [a, b, c]);
      const text = polyText(poly.c.map((q) => q.value).reverse());
      const quad = Poly.fromRoots(k, [b, c]);
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}. One zero of f is x = ${num(a)}. Find the other zeros of f.`,
        parts: [ask.set("x =", [b, c])],
        solution: [
          `Since x = ${num(a)} is a zero, ${factorText(a)} is a factor. Dividing f(x) by ${factorText(a)} gives ${quad.text()}.`,
          `Factor the quotient: ${quad.text()} = ${k === 1 ? "" : `${k}`}${factorText(b)}${factorText(c)}. The other zeros are x = ${num(b)} and x = ${num(c)}.`,
        ],
        data: { text, a, b, c },
      });
    },
    verify({ data: { text, a, b, c } }) {
      const f = fnOf(text);
      for (const z of [a, b, c]) assertNear(f(z), 0, "zero");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    unit: true,
    concept: "conjugate-zeros",
    skill: "solve",
    make(r) {
      const a = r.nonzero(-4, 4);
      const h = r.int(-3, 3);
      const m = r.int(1, 3);
      const k = r.pick([1, 1, 2]);
      const quad = new Poly([h * h + m * m, -2 * h, 1]);
      const poly = quad.mul(new Poly([-a, 1])).scale(k);
      const text = polyText(poly.c.map((q) => q.value).reverse());
      return problem({
        stem: `The polynomial function f is given by f(x) = ${text}. One zero of f is x = ${num(a)}. Find all zeros of f, including nonreal complex zeros.`,
        parts: [ask.set("Zeros", [num(a), cx(h, m), cx(h, -m)], { complex: true })],
        solution: [
          `Since x = ${num(a)} is a zero, ${factorText(a)} is a factor. Dividing gives the quadratic factor ${quad.scale(k).text()}.`,
          `Solve ${quad.text()} = 0 with the quadratic formula: x = (${num(2 * h)} ± √(${num(4 * h * h)} − ${4 * (h * h + m * m)}))/2 = (${num(2 * h)} ± √(−${4 * m * m}))/2 = ${cx(h, m)} or ${cx(h, -m)}.`,
          `The zeros of f are ${num(a)}, ${cx(h, m)}, and ${cx(h, -m)}.`,
        ],
        data: { text, a, h, m },
      });
    },
    verify({ data: { text, a, h, m } }) {
      const f = fnOf(text);
      assertNear(f(a), 0, "real zero");
      // The quadratic factor x² − 2hx + h² + m² vanishes at h ± mi.
      const quad = (re, im) => {
        const real = re * re - im * im - 2 * h * re + h * h + m * m;
        const imag = 2 * re * im - 2 * h * im;
        return [real, imag];
      };
      for (const sign of [1, -1]) {
        const [real, imag] = quad(h, sign * m);
        assertNear(real, 0, "real part");
        assertNear(imag, 0, "imaginary part");
      }
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "multiplicity",
    skill: "construct-functions",
    make(r) {
      const shapes = [
        [2, 1, 1],
        [1, 2, 1],
        [1, 1, 2],
        [3, 1, 1],
        [1, 1, 3],
        [2, 2, 1],
      ];
      const mults = r.pick(shapes);
      const roots = r.distinctNonzero(-4, 4, 3).sort((x, y) => x - y);
      const k = r.pick([1, 2, -1, -2]);
      const pairs = roots.map((root, i) => [root, mults[i]]);
      const poly = Poly.fromRoots(
        k,
        pairs.flatMap(([root, m]) => Array(m).fill(root)),
      );
      const y0 = poly.at(0).value;
      const text = factoredText(k, pairs);
      const f = poly.fn();
      let top = 0;
      for (let x = roots[0] - 1; x <= roots[2] + 1; x += 0.05)
        top = Math.max(top, Math.abs(f(x)));
      if (Math.abs(y0) > 14 || top > 40) reject("graph would be too steep");
      return problem({
        stem: `The graph of the polynomial function p is shown. The graph passes through the point (0, ${num(y0)}), and p has the least possible degree. Write an expression for p(x).`,
        blocks: [
          graph({
            caption: "The graph of y = p(x)",
            alt: `A polynomial graph that meets the x-axis at x = ${roots.map(num).join(", ")}, crossing at some zeros and turning around or flattening at others, passing through (0, ${num(y0)}).`,
            window: { x: [-6, 6], y: [-15, 15] },
            ticks: { x: 1, y: 5 },
            functions: [{ expr: text }],
            points: [{ at: [0, y0], label: `(0, ${num(y0)})`, position: "ne" }],
          }),
        ],
        parts: [ask.expr("p(x) =", text, { text })],
        solution: [
          `The graph meets the x-axis at x = ${roots.map(num).join(", ")}. ${roots
            .map((root, i) =>
              mults[i] === 1
                ? `At x = ${num(root)} it crosses straight through, so ${factorText(root)} has exponent 1.`
                : mults[i] === 2
                  ? `At x = ${num(root)} it touches and turns around, so ${factorText(root)} has exponent 2.`
                  : `At x = ${num(root)} it flattens as it crosses, so ${factorText(root)} has exponent 3.`,
            )
            .join(" ")}`,
          `So p(x) = a${pairs.map(([root, m]) => `${factorText(root)}${m > 1 ? sup(m) : ""}`).join("")} for some constant a.`,
          `Use p(0) = ${num(y0)}: a · ${pairs.map(([root, m]) => `(${num(-root)})${m > 1 ? sup(m) : ""}`).join(" · ")} = ${num(y0)}, so a = ${num(k)}. Then p(x) = ${text}.`,
        ],
        data: { text, roots, mults, k, y0 },
      });
    },
    verify({ data: { text, roots, mults, k, y0 } }) {
      const f = fnOf(text);
      assertNear(f(0), y0, "passes through the labeled point");
      roots.forEach((root, i) => {
        assertNear(f(root), 0, "zero");
        assert(
          f(root - 0.02) * f(root + 0.02) < 0 === (mults[i] % 2 === 1),
          "behavior at zero",
        );
      });
      assert(k !== 0, "nonzero leading coefficient");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "even-and-odd",
    skill: "support-conclusions",
    make(r) {
      const kind = r.pick(["even", "odd", "neither"]);
      const denominator = r.pick([
        { text: (c) => polyText([1, 0, c]), at: (x, c) => x * x + c },
        { text: (c) => polyText([1, 0, 0, 0, c]), at: (x, c) => x ** 4 + c },
      ]);
      const c = r.int(1, 6);
      const top =
        kind === "even"
          ? [
              [2, r.nonzero(-4, 4)],
              [0, r.int(-5, 5)],
            ]
          : kind === "odd"
            ? [
                [3, r.nonzero(-4, 4)],
                [1, r.nonzero(-5, 5)],
              ]
            : [
                [2, r.nonzero(-4, 4)],
                [1, r.nonzero(-5, 5)],
              ];
      const { text: numerator, flipped } = fromTerms(
        top.filter(([, coefficient]) => coefficient !== 0),
      );
      const bottom = denominator.text(c);
      const shown = ratio(numerator, bottom);
      const key = ratio(flipped, bottom);
      return problem({
        stem: `Let g(x) = ${shown}. Show whether g is even, odd, or neither by finding g(−x).`,
        parts: [
          part("Write g(−x) in simplified form.", ask.expr("g(−x) =", key)),
          part(
            "Is g even, odd, or neither?",
            ask.choice("g is", ["even", "odd", "neither"], kind),
          ),
        ],
        solution: [
          `The denominator ${bottom} has only even powers, so it does not change when x is replaced with −x. Replacing x with −x in the numerator gives g(−x) = ${key}.`,
          kind === "even"
            ? "That equals g(x), so g is even."
            : kind === "odd"
              ? "That is the opposite of g(x), so g is odd."
              : "That is neither g(x) nor −g(x), so g is neither even nor odd.",
        ],
        data: { shown, key, kind },
      });
    },
    verify({ data: { shown, key, kind } }) {
      const g = fnOf(shown);
      const h = fnOf(key);
      for (const x of [0.6, 1.7, 2.9]) {
        assertNear(h(x), g(-x), "g(−x)");
        if (kind === "even") assertNear(g(-x), g(x), "even");
        else if (kind === "odd") assertNear(g(-x), -g(x), "odd");
        else
          assert(
            Math.abs(g(-x) - g(x)) > 1e-6 && Math.abs(g(-x) + g(x)) > 1e-6,
            "neither",
          );
      }
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "degree-from-differences",
    skill: "identify-information",
    make(r) {
      const degree = r.int(2, 4);
      const coefficients = [r.nonzero(-3, 3)];
      for (let i = 0; i < degree; i += 1) coefficients.push(r.int(-6, 6));
      const f = (x) => coefficients.reduce((sum, c) => sum * x + c, 0);
      const ys = [0, 1, 2, 3, 4, 5].map(f);
      let level = ys;
      const rows = [];
      for (let i = 0; i < degree; i += 1) {
        level = level.slice(1).map((v, j) => v - level[j]);
        rows.push(level);
      }
      const constant = rows[degree - 1];
      if (new Set(constant).size !== 1) reject("not constant");
      if (rows.slice(0, degree - 1).some((row) => new Set(row).size === 1))
        reject("constant too early");
      // Extend the differences to find f(6).
      const next = [];
      let carry = constant[0];
      for (let i = degree - 1; i >= 0; i -= 1) {
        carry = rows[i][rows[i].length - 1] + (i === degree - 1 ? 0 : carry);
        next[i] = carry;
      }
      const f6 = ys[5] + next[0];
      return problem({
        stem: "The table gives values of a polynomial function f at equally spaced inputs. The differences of the outputs are used to find the least possible degree of f.",
        blocks: [
          table(
            "Values of f(x)",
            ["x", "f(x)"],
            ys.map((y, x) => [String(x), num(y)]),
          ),
        ],
        parts: [
          part(
            "What is the least possible degree of f?",
            ask.number("Least degree", degree),
          ),
          part(
            "Use the pattern of differences to find f(6).",
            ask.number("f(6) =", f(6)),
          ),
        ],
        solution: [
          ...rows.map(
            (row, i) =>
              `The ${["first", "second", "third", "fourth"][i]} differences are ${row.map(num).join(", ")}${i === degree - 1 ? ". They are constant." : "."}`,
          ),
          `Constant ${["first", "second", "third", "fourth"][degree - 1]} differences mean a polynomial of degree ${degree}.`,
          `Continue the pattern: the next ${["first", "second", "third", "fourth"][degree - 1]} difference is ${num(constant[0])}, which gives f(6) = ${num(f(6))}.`,
        ],
        data: { coefficients, degree, ys, f6 },
      });
    },
    verify({ data: { coefficients, degree, ys, f6 } }) {
      const g = fnOf(polyText(coefficients));
      ys.forEach((y, x) => assertNear(g(x), y, "table value"));
      assertNear(g(6), f6, "f(6) from differences");
      assert(degree >= 2, "degree");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "zeros-and-factors",
    skill: "solve",
    make(r) {
      const p1 = r.int(1, 4);
      const p2 = r.int(1, 4);
      if (p1 === p2) reject("repeated pair");
      const s1 = r.pick([1, -1]);
      const s2 = r.pick([1, -1]);
      const u1 = s1 * p1 * p1;
      const u2 = s2 * p2 * p2;
      const text = polyText([1, 0, -(u1 + u2), 0, u1 * u2]);
      const zeros = [];
      for (const [u, p] of [
        [u1, p1],
        [u2, p2],
      ]) {
        if (u > 0) zeros.push(num(p), num(-p));
        else zeros.push(cx(0, p), cx(0, -p));
      }
      const factored = `(x² ${signed(-u1)})(x² ${signed(-u2)})`;
      return problem({
        stem: `Let f(x) = ${text}. Find all zeros of f, real and nonreal.`,
        parts: [ask.set("Zeros", zeros, { complex: true })],
        solution: [
          `Treat the polynomial as a quadratic in x²: ${text} = ${factored}.`,
          `Setting each factor to 0 gives x² = ${num(u1)} and x² = ${num(u2)}.`,
          `${[
            [u1, p1],
            [u2, p2],
          ]
            .map(([u, p]) =>
              u > 0
                ? `x² = ${u} gives x = ±${p}`
                : `x² = ${num(u)} gives x = ±${p}i, because i² = −1`,
            )
            .join(". ")}.`,
        ],
        data: { text, u1, u2 },
      });
    },
    verify({ data: { text, u1, u2 } }) {
      const f = fnOf(text);
      for (const u of [u1, u2]) {
        if (u > 0) assertNear(f(Math.sqrt(u)), 0, "real zero");
        // For a negative u the zeros are ±i√|u|; check that u solves the quadratic in x².
        assertNear(u * u - (u1 + u2) * u + u1 * u2, 0, "quadratic in x²");
      }
    },
  },
];

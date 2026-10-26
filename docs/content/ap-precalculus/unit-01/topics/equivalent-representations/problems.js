// Typed-answer problems for Topic 1.11. Each template draws new numbers for every
// variant. Every key is built from exact polynomial arithmetic, then verify() checks
// the identity again by evaluating the displayed expressions at several values.

import {
  ask,
  part,
  problem,
  polyText,
  factorText,
  par,
  num,
  sup,
  ivl,
  unionText,
  andList,
  addRatio,
  Poly,
  Q,
  fnOf,
  assert,
  reject,
  lead,
  byRoot,
  factorsText,
  expandedRational,
  factoredRational,
  multiplicityAt,
} from "../../../../practice-kit/index.js";

const distinct = (r, count, lo = -6, hi = 6) => r.distinctNonzero(lo, hi, count);

// Values of two expressions must agree wherever both are defined.
function assertSame(
  first,
  second,
  label,
  points = [-3.5, -2.25, -1.5, -0.5, 0.75, 1.5, 2.25, 3.5, 5.5],
) {
  const f = fnOf(first);
  const g = fnOf(second);
  for (const x of points) {
    const a = f(x);
    const b = g(x);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    assert(
      Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(a)),
      `${label} at x = ${x}: ${a} vs ${b}`,
    );
  }
}

// Coefficients from the highest power down, ready for polyText.
const coefficientsOf = (poly) => [...poly.c].reverse().map((q) => q.value);
const textOf = (poly) => polyText(coefficientsOf(poly));

// (px + q)^n as a Poly.
function power(p, q, n) {
  let out = new Poly([1]);
  for (let i = 0; i < n; i += 1) out = out.mul(new Poly([q, p]));
  return out;
}

// ---------- Long division steps ----------

// One line per step of polynomial long division, then the conclusion.
function divisionLines(numerator, divisor) {
  const lines = [];
  let remainder = numerator;
  const divisorText = textOf(divisor);
  while (!remainder.isZero && remainder.degree >= divisor.degree) {
    const shift = remainder.degree - divisor.degree;
    const factor = remainder.lead.div(divisor.lead);
    const term = new Poly([...Array(shift).fill(new Q(0)), factor]);
    const product = divisor.mul(term);
    remainder = remainder.sub(product);
    lines.push(
      `Divide the leading terms to get ${term.text()}. Then ${term.text()} · (${divisorText}) = ${textOf(product)}, and subtracting leaves ${remainder.isZero ? "0" : textOf(remainder)}.`,
    );
  }
  return lines;
}

// ---------- Binomial theorem ----------

const pascal = (n) => {
  let row = [1];
  for (let i = 0; i < n; i += 1)
    row = [1, ...row.slice(1).map((value, index) => value + row[index]), 1];
  return row;
};

const powerText = (base, exponent) =>
  exponent === 0 || base === 1
    ? null
    : exponent === 1
      ? par(base)
      : `${par(base)}${sup(exponent)}`;

// The entry, a power of p and a power of q for the term with x^(n − i).
const termProduct = (row, p, q, n, i) =>
  [String(row[i]), powerText(p, n - i), powerText(q, i)].filter(Boolean).join(" · ");

const termValue = (row, p, q, n, i) => row[i] * p ** (n - i) * q ** i;

function binomialLines(p, q, n) {
  const row = pascal(n);
  const terms = row.map((_, i) => {
    const product = termProduct(row, p, q, n, i);
    const value = String(num(termValue(row, p, q, n, i)));
    return product === value ? value : `${product} = ${value}`;
  });
  return [
    `Row ${n} of Pascal's triangle is ${row.join(", ")}.`,
    `Let a = ${p === 1 ? "x" : `${num(p)}x`} and b = ${num(q)}. The coefficient of each term, from the highest power of x down to the constant term, is: ${terms.join("; ")}.`,
    `So (${polyText([p, q])})${sup(n)} = ${textOf(power(p, q, n))}.`,
  ];
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "choose-form",
    skill: "equivalent-forms",
    make(r) {
      const style = r.pick(["common-x", "grouping", "constant"]);
      if (style === "common-x") {
        const [a, b] = distinct(r, 2);
        const k = r.pick([1, 1, -1, 2]);
        const text = textOf(Poly.fromRoots(k, [0, a, b]));
        const inner = textOf(Poly.fromRoots(1, [a, b]));
        const key = `${lead(k)}x${factorText(a)}${factorText(b)}`;
        return problem({
          stem: `Let f(x) = ${text}. Write f(x) in factored form.`,
          parts: [ask.expr("f(x) =", key, { form: "factored" })],
          solution: [
            `Every term has a factor of ${lead(k)}x: ${text} = ${lead(k)}x(${inner}).`,
            `Factor the quadratic: ${inner} = ${factorText(a)}${factorText(b)}. So f(x) = ${key}.`,
          ],
          data: { text, key },
        });
      }
      if (style === "grouping") {
        const a = r.nonzero(-5, 5);
        const m = r.int(1, 5);
        if (a === m || a === -m) reject("repeated factor");
        const text = textOf(Poly.fromRoots(1, [a, m, -m]));
        const key = `${factorText(a)}${factorText(m)}${factorText(-m)}`;
        const common = polyText([1, -a]);
        return problem({
          stem: `Let f(x) = ${text}. Write f(x) in factored form.`,
          parts: [ask.expr("f(x) =", key, { form: "factored" })],
          solution: [
            `Group the terms in pairs and factor each pair: x²(${common}) − ${m * m}(${common}).`,
            `The common factor is (${common}), so f(x) = (${common})(x² − ${m * m}).`,
            `Factor the difference of squares: x² − ${m * m} = ${factorText(m)}${factorText(-m)}. So f(x) = ${key}.`,
          ],
          data: { text, key },
        });
      }
      const [a, b] = distinct(r, 2);
      const k = r.pick([2, 3, -2, -3, 4]);
      const text = textOf(Poly.fromRoots(k, [a, b]));
      const inner = textOf(Poly.fromRoots(1, [a, b]));
      const key = `${num(k)}${factorText(a)}${factorText(b)}`;
      return problem({
        stem: `Let f(x) = ${text}. Write f(x) in factored form.`,
        parts: [ask.expr("f(x) =", key, { form: "factored" })],
        solution: [
          `Every coefficient is divisible by ${num(k)}, so factor it out: ${text} = ${num(k)}(${inner}).`,
          `Factor the quadratic: ${inner} = ${factorText(a)}${factorText(b)}. So f(x) = ${key}.`,
        ],
        data: { text, key },
      });
    },
    verify({ data: { text, key } }) {
      assertSame(text, key, "factored form");
    },
  },
  {
    id: "p02",
    tier: "quick",
    concept: "choose-form",
    skill: "equivalent-forms",
    make(r) {
      const double = r.chance(0.3);
      const [a, b, c] = distinct(r, 3, -4, 4);
      const roots = double ? [a, a, b] : [a, b, c];
      const k = r.pick([1, 1, -1, 2, -2]);
      const grouped = byRoot(
        [...new Set(roots)],
        (root) => roots.filter((x) => x === root).length,
      );
      const text = `${lead(k)}${factorsText(grouped)}`;
      const poly = Poly.fromRoots(k, roots);
      const key = textOf(poly);
      const y0 = poly.at(0).value;
      return problem({
        stem: `Let f(x) = ${text}.`,
        parts: [
          part(
            "Write f(x) in standard form.",
            ask.expr("f(x) =", key, { form: "expanded" }),
          ),
          part("Find the y-intercept of the graph of f.", ask.number("f(0) =", y0)),
        ],
        solution: [
          `Multiply the factors two at a time and combine like terms. The result is f(x) = ${key}.`,
          `The y-intercept is f(0), which is the constant term of the standard form: ${num(y0)}.`,
        ],
        data: { text, key, y0 },
      });
    },
    verify({ data: { text, key, y0 } }) {
      assertSame(text, key, "standard form");
      assert(Math.abs(fnOf(text)(0) - y0) < 1e-9, "y-intercept");
    },
  },
  {
    id: "p03",
    tier: "quick",
    unit: true,
    concept: "long-division",
    skill: "solve",
    make(r) {
      const k = r.nonzero(-5, 5);
      const m = r.nonzero(-6, 6);
      const R = r.nonzero(-9, 9);
      const divisor = new Poly([-k, 1]);
      const quotient = new Poly([m, 1]);
      const numerator = divisor.mul(quotient).add(R);
      const top = textOf(numerator);
      return problem({
        stem: `Use polynomial long division to divide ${top} by ${textOf(divisor)}.`,
        parts: [
          part(
            "Find the quotient.",
            ask.expr("Quotient =", textOf(quotient), { form: "expanded" }),
          ),
          part("Find the remainder.", ask.number("Remainder =", R)),
        ],
        solution: [
          ...divisionLines(numerator, divisor),
          `The last result, ${num(R)}, has lower degree than ${textOf(divisor)}, so it is the remainder. The quotient is ${textOf(quotient)}.`,
        ],
        data: { top, divisor: textOf(divisor), quotient: textOf(quotient), R },
      });
    },
    verify({ data: { top, divisor, quotient, R } }) {
      assertSame(top, `(${divisor})(${quotient}) + ${par(R)}`, "division identity");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "binomial-theorem",
    skill: "solve",
    make(r) {
      const n = r.int(3, 4);
      const p = n === 3 ? r.pick([1, 1, 2]) : 1;
      const q = r.nonzero(-4, 4);
      const base = `(${polyText([p, q])})${sup(n)}`;
      const key = textOf(power(p, q, n));
      return problem({
        stem: `Use the binomial theorem to expand ${base}. Write the result in standard form.`,
        parts: [ask.expr(`${base} =`, key, { form: "expanded" })],
        solution: binomialLines(p, q, n),
        data: { base: `(${polyText([p, q])})^${n}`, key },
      });
    },
    verify({ data: { base, key } }) {
      assertSame(base, key, "binomial expansion");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "long-division",
    skill: "solve",
    make(r) {
      const k = r.nonzero(-4, 4);
      const q2 = r.pick([1, 1, 2, -1, 3]);
      const quotient = new Poly([r.int(-6, 6), r.int(-6, 6), q2]);
      const R = r.chance(0.15) ? 0 : r.nonzero(-9, 9);
      const divisor = new Poly([-k, 1]);
      const numerator = divisor.mul(quotient).add(R);
      if (numerator.degree !== 3) reject("not a cubic");
      const top = textOf(numerator);
      return problem({
        stem: `Let f(x) = ${top} and g(x) = ${textOf(divisor)}. Use polynomial long division to write f(x) = g(x)q(x) + r(x), where the degree of r is less than the degree of g.`,
        parts: [
          part("Find q(x).", ask.expr("q(x) =", textOf(quotient), { form: "expanded" })),
          part("Find r(x).", ask.number("r(x) =", R)),
        ],
        solution: [
          ...divisionLines(numerator, divisor),
          `The remaining value, ${num(R)}, has lower degree than g, so r(x) = ${num(R)} and q(x) = ${textOf(quotient)}.`,
          `Check: (${textOf(divisor)})(${textOf(quotient)}) ${R < 0 ? "−" : "+"} ${Math.abs(R)} = ${top}.`,
        ],
        data: { top, divisor: textOf(divisor), quotient: textOf(quotient), R },
      });
    },
    verify({ data: { top, divisor, quotient, R } }) {
      assertSame(top, `(${divisor})(${quotient}) + ${par(R)}`, "division identity");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    unit: true,
    concept: "long-division",
    skill: "equivalent-forms",
    make(r) {
      const p = r.pick([1, 1, 2, 3]);
      const q = r.nonzero(-6, 6);
      const m = r.nonzero(-4, 4);
      const n = r.int(-6, 6);
      const R = r.nonzero(-9, 9);
      const divisor = new Poly([q, p]);
      const quotient = new Poly([n, m]);
      const numerator = divisor.mul(quotient).add(R);
      const top = textOf(numerator);
      const bottom = textOf(divisor);
      const text = `(${top})/(${bottom})`;
      const key = `y = ${textOf(quotient)}`;
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            `Divide ${top} by ${bottom}. Find the quotient.`,
            ask.expr("Quotient =", textOf(quotient), { form: "expanded" }),
          ),
          part("Find the remainder.", ask.number("Remainder =", R)),
          part(
            "Write the equation of the slant asymptote of the graph of r.",
            ask.equations("Slant asymptote", [key]),
          ),
        ],
        solution: [
          ...divisionLines(numerator, divisor),
          `So r(x) = ${addRatio(textOf(quotient), R, bottom)}.`,
          `As x → ∞ or x → −∞, ${num(R)}/(${bottom}) approaches 0, so the graph approaches the line ${key}.`,
        ],
        data: { text, top, bottom, quotient: textOf(quotient), R },
      });
    },
    verify({ data: { text, bottom, quotient, R } }) {
      assertSame(text, `(${quotient}) + ${par(R)}/(${bottom})`, "division identity");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    concept: "long-division",
    skill: "solve",
    make(r) {
      const divisor = new Poly([r.int(-6, 6), r.int(-4, 4), 1]);
      const quotient = new Poly([r.int(-5, 5), r.int(-5, 5), r.pick([1, 1, 2, -1])]);
      const remainder = new Poly([r.int(-9, 9), r.int(-5, 5)]);
      if (remainder.isZero) reject("remainder is 0");
      const numerator = divisor.mul(quotient).add(remainder);
      if (numerator.degree !== 4) reject("not a quartic");
      const top = textOf(numerator);
      return problem({
        stem: `Divide ${top} by ${textOf(divisor)} using polynomial long division.`,
        parts: [
          part(
            "Find the quotient.",
            ask.expr("Quotient =", textOf(quotient), { form: "expanded" }),
          ),
          part(
            "Find the remainder.",
            ask.expr("Remainder =", textOf(remainder), { form: "expanded" }),
          ),
        ],
        solution: [
          ...divisionLines(numerator, divisor),
          `The last result, ${textOf(remainder)}, has lower degree than ${textOf(divisor)}, so it is the remainder. The quotient is ${textOf(quotient)}.`,
          `Check: (${textOf(divisor)})(${textOf(quotient)}) + (${textOf(remainder)}) = ${top}.`,
        ],
        data: {
          top,
          divisor: textOf(divisor),
          quotient: textOf(quotient),
          remainder: textOf(remainder),
        },
      });
    },
    verify({ data: { top, divisor, quotient, remainder } }) {
      assertSame(top, `(${divisor})(${quotient}) + (${remainder})`, "division identity");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    unit: true,
    concept: "choose-form",
    skill: "identify-information",
    make(r) {
      const [a, b, c, d] = distinct(r, 4);
      const shared = r.chance(0.4);
      const k = r.pick([1, 1, 2, -1, 3]);
      const spec = {
        lead: k,
        top: shared ? byRoot([a, c]) : byRoot([a, b]),
        bottom: byRoot([c, d]),
      };
      const text = expandedRational(spec);
      const holes = spec.bottom.map(([x]) => x);
      const [lo, hi] = holes.sort((x, y) => x - y);
      const zeros = spec.top
        .map(([x]) => x)
        .filter((x) => multiplicityAt(spec.bottom, x) === 0);
      return problem({
        stem: `The rational function r is given by r(x) = ${text}.`,
        parts: [
          part(
            "Write the domain of r in interval notation.",
            ask.interval(
              "Domain",
              unionText(ivl(-Infinity, lo), ivl(lo, hi), ivl(hi, Infinity)),
            ),
          ),
          part("Find all real zeros of r.", ask.set("x =", zeros)),
          part(
            "Write the equation of the horizontal asymptote of the graph of r.",
            ask.equations("Horizontal asymptote", [`y = ${num(k)}`]),
          ),
        ],
        solution: [
          `Factor the numerator and denominator: r(x) = ${factoredRational(spec)}. The factored form shows the domain and the zeros.`,
          `The denominator is 0 at x = ${num(lo)} and x = ${num(hi)}, so the domain is ${unionText(ivl(-Infinity, lo), ivl(lo, hi), ivl(hi, Infinity))}.`,
          `The zeros of the numerator are ${andList(spec.top.map(([x]) => `x = ${num(x)}`))}${zeros.length < spec.top.length ? `, but x = ${num(c)} is not in the domain, so the real zero${zeros.length > 1 ? "s are" : " is"} ${andList(zeros.map((x) => `x = ${num(x)}`))}` : ""}.`,
          `The standard form shows the degrees and leading coefficients. The numerator and denominator both have degree 2, so the horizontal asymptote is y = ${num(k)}/1 = ${num(k)}.`,
        ],
        data: { text, zeros, k },
      });
    },
    verify({ data: { text, zeros, k } }) {
      const f = fnOf(text);
      for (const x of zeros) assert(Math.abs(f(x)) < 1e-9, `zero at ${x}`);
      assert(
        Math.abs(f(1e7) - k) < 1e-3 && Math.abs(f(-1e7) - k) < 1e-3,
        "horizontal asymptote",
      );
    },
  },
  {
    id: "p09",
    tier: "quiz",
    concept: "binomial-theorem",
    skill: "solve",
    make(r) {
      const n = r.int(3, 5);
      const p = n === 5 ? 1 : r.pick([1, 1, 2, 3]);
      const q = r.nonzero(-3, 3);
      const base = `(${polyText([p, q])})${sup(n)}`;
      const key = textOf(power(p, q, n));
      return problem({
        stem: `Let f(x) = ${base}. Use the binomial theorem to write f(x) in standard form.`,
        parts: [ask.expr("f(x) =", key, { form: "expanded" })],
        solution: binomialLines(p, q, n),
        data: { base: `(${polyText([p, q])})^${n}`, key },
      });
    },
    verify({ data: { base, key } }) {
      assertSame(base, key, "binomial expansion");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "binomial-theorem",
    skill: "apply-results",
    make(r) {
      const n = r.int(5, 6);
      const p = r.pick([1, 1, 2]);
      const q = r.nonzero(-3, 3);
      const [j, k] = r.sample([1, 2, 3, 4], 2).sort((x, y) => x - y);
      const row = pascal(n);
      const coefficient = (power) => termValue(row, p, q, n, n - power);
      const base = `(${polyText([p, q])})${sup(n)}`;
      const termName = (power) => (power === 1 ? "x" : `x${sup(power)}`);
      const lineFor = (power) =>
        `The entry for ${termName(power)} is ${row[n - power]}, so the coefficient is ${termProduct(row, p, q, n, n - power)} = ${num(coefficient(power))}.`;
      return problem({
        stem: `The polynomial function f is given by f(x) = ${base}. Use the binomial theorem to find the coefficients of two terms in the standard form of f(x).`,
        parts: [
          part(
            `Find the coefficient of the ${termName(j)} term.`,
            ask.number(`Coefficient of ${termName(j)} =`, coefficient(j)),
          ),
          part(
            `Find the coefficient of the ${termName(k)} term.`,
            ask.number(`Coefficient of ${termName(k)} =`, coefficient(k)),
          ),
        ],
        solution: [
          `Row ${n} of Pascal's triangle is ${row.join(", ")}. Let a = ${p === 1 ? "x" : `${num(p)}x`} and b = ${num(q)}.`,
          lineFor(j),
          lineFor(k),
        ],
        data: {
          base: `(${polyText([p, q])})^${n}`,
          expansion: textOf(power(p, q, n)),
          poly: power(p, q, n),
          asked: [
            [j, coefficient(j)],
            [k, coefficient(k)],
          ],
        },
      });
    },
    verify({ data: { base, expansion, poly, asked } }) {
      assertSame(base, expansion, "expansion");
      for (const [exponent, value] of asked)
        assert(poly.c[exponent].value === value, `coefficient of x^${exponent}`);
    },
  },
];

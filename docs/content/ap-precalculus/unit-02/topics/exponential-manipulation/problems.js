// Typed-answer problems for Topic 2.4. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed function, so a slip in the
// key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  num,
  Q,
  fnOf,
  assert,
  assertNear,
  reject,
  expText,
  expKey,
  powerText,
  shown,
} from "../../../../practice-kit/index.js";

const qText = (value) => (value instanceof Q ? value.toString() : num(value));
const plain = (value) => qText(value).replace(/−/g, "-");
const key = (a, b) => expKey(a, b).replace(/−/g, "-");
// A multiple of x with the 1 left out: x, −x, 3x, −2x.
const xTerm = (n) => (n === 1 ? "x" : n === -1 ? "−x" : `${num(n)}x`);
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const magnitude = (q) => (q.n < 0 ? q.neg() : q);

// "1·" in front of a power is noise, so a coefficient of 1 is left out of a solution line.
const lead = (a) =>
  (a instanceof Q ? a.equals(1) : a === 1) ? "" : `${qText(shown(a))}·`;

// The exponent p·x + q as text, such as "2x − 3", "x + 4", "x/2", or "−3x/2".
function exponentText(p, q) {
  const pq = p instanceof Q ? p : new Q(p);
  const size = magnitude(pq);
  const body =
    size.isInteger && size.n === 1
      ? "x"
      : size.isInteger
        ? `${size.n}x`
        : size.n === 1
          ? `x/${size.d}`
          : `${size.n}x/${size.d}`;
  const front = `${pq.n < 0 ? "−" : ""}${body}`;
  if (!q) return front;
  return `${front} ${q < 0 ? "−" : "+"} ${Math.abs(q)}`;
}

// A function a·b^(p x + q) as text for the stem and as a key the checker can read.
const stemText = (a, b, p, q) => expText(shown(a), shown(b), exponentText(p, q));
const sourceKey = (a, b, p, q) => {
  const pq = p instanceof Q ? p : new Q(p);
  return `(${plain(a)})*(${plain(b)})^((${plain(pq)})*x + (${q}))`;
};

// Bases that have exact roots, so the rewritten base is a rational number.
const ROOTS = [
  new Q(2),
  new Q(3),
  new Q(4),
  new Q(5),
  new Q(1, 2),
  new Q(1, 3),
  new Q(3, 2),
  new Q(2, 3),
];
const ROOT_NAME = { 2: "square", 3: "cube", 4: "fourth" };
const withinReach = (value, limit = 100) =>
  value.value <= limit && value.value >= 1 / limit;

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "product-property",
    skill: "equivalent-forms",
    make(r) {
      const b = r.pick([
        new Q(2),
        new Q(3),
        new Q(4),
        new Q(5),
        new Q(1, 2),
        new Q(1, 3),
      ]);
      const a = new Q(r.pick([1, 2, 3, 4, 5, -2, -3]));
      const h = r.pick([-3, -2, -1, 1, 2, 3, 4]);
      const a2 = a.mul(b.pow(h));
      if (Math.abs(a2.value) > 400 || Math.abs(a2.value) < 1 / 400)
        reject("an extreme coefficient");
      const sign = h < 0 ? "−" : "+";
      return problem({
        stem: `The function f is given by f(x) = ${stemText(a, b, 1, h)}.`,
        parts: [
          part(
            "Write f(x) in the form abˣ, where a and b are constants.",
            ask.expr("f(x) =", key(a2, b), {
              form: "exponential",
              text: expText(shown(a2), shown(b)),
            }),
          ),
        ],
        solution: [
          `Use the property ${powerText(shown(b), `x ${sign} ${Math.abs(h)}`)} = ${powerText(shown(b), "x")}·${powerText(shown(b), num(h))}.`,
          `So f(x) = ${lead(a)}${powerText(shown(b), num(h))}·${powerText(shown(b), "x")}. Since ${powerText(shown(b), num(h))} = ${qText(shown(b.pow(h)))}, f(x) = ${expText(shown(a2), shown(b))}.`,
        ],
        data: { a, b, h, a2 },
      });
    },
    verify({ data: { a, b, h, a2 } }) {
      const f = fnOf(sourceKey(a, b, 1, h));
      const g = fnOf(key(a2, b));
      for (const x of [-2, 0, 1, 2.5, 4]) assertNear(f(x), g(x), `equal at x = ${x}`);
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "power-property",
    skill: "equivalent-forms",
    make(r) {
      const root = r.pick(ROOTS);
      const k = r.pick([2, 3, 4]);
      const big = root.pow(k);
      if (!withinReach(big, 130)) reject("a base that is too extreme");
      const multiple = r.chance();
      const a = new Q(r.pick([1, 2, 3, 5, 6]));
      if (multiple) {
        return problem({
          stem: `The function f is given by f(x) = ${stemText(a, root, k, 0)}.`,
          parts: [
            part(
              "Write f(x) in the form abˣ, where a and b are constants.",
              ask.expr("f(x) =", key(a, big), {
                form: "exponential",
                text: expText(shown(a), shown(big)),
              }),
            ),
          ],
          solution: [
            `Use the property b^(kx) = (bᵏ)ˣ with b = ${qText(shown(root))} and k = ${k}.`,
            `${powerText(shown(root), `${k}x`)} = (${powerText(shown(root), k)})ˣ = ${powerText(shown(big), "x")}, so f(x) = ${expText(shown(a), shown(big))}.`,
          ],
          data: { a, root, big, mode: "multiple", p: new Q(k) },
        });
      }
      return problem({
        stem: `The function f is given by f(x) = ${stemText(a, big, new Q(1, k), 0)}.`,
        parts: [
          part(
            "Write f(x) in the form abˣ, where a and b are constants.",
            ask.expr("f(x) =", key(a, root), {
              form: "exponential",
              text: expText(shown(a), shown(root)),
            }),
          ),
        ],
        solution: [
          `Write ${qText(shown(big))} as a power: ${qText(shown(big))} = ${powerText(shown(root), k)}.`,
          `Then ${powerText(shown(big), `x/${k}`)} = (${powerText(shown(root), k)})^(x/${k}) = ${powerText(shown(root), "x")}, so f(x) = ${expText(shown(a), shown(root))}.`,
        ],
        data: { a, root, big, mode: "fraction", p: new Q(1, k) },
      });
    },
    verify({ data: { a, root, big, mode, p } }) {
      const source =
        mode === "multiple" ? sourceKey(a, root, p, 0) : sourceKey(a, big, p, 0);
      const answer = mode === "multiple" ? big : root;
      const f = fnOf(source);
      const g = fnOf(key(a, answer));
      for (const x of [-2, 0, 1, 3]) assertNear(f(x), g(x), `equal at x = ${x}`);
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "negative-and-roots",
    skill: "equivalent-forms",
    make(r) {
      const b = r.pick([
        new Q(2),
        new Q(3),
        new Q(4),
        new Q(5),
        new Q(1, 2),
        new Q(1, 3),
        new Q(2, 3),
        new Q(3, 2),
      ]);
      const a = new Q(r.pick([1, 2, 3, 4, 5, -2, -3]));
      const flipped = b.pow(-1);
      return problem({
        stem: `The function f is given by f(x) = ${stemText(a, b, -1, 0)}.`,
        parts: [
          part(
            "Write f(x) in the form abˣ, where a and b are constants.",
            ask.expr("f(x) =", key(a, flipped), {
              form: "exponential",
              text: expText(shown(a), shown(flipped)),
            }),
          ),
        ],
        solution: [
          `Use the property b^(−x) = (1/b)ˣ. The reciprocal of ${qText(shown(b))} is ${qText(shown(flipped))}.`,
          `So ${powerText(shown(b), "−x")} = ${powerText(shown(flipped), "x")}, and f(x) = ${expText(shown(a), shown(flipped))}.`,
        ],
        data: { a, b, flipped },
      });
    },
    verify({ data: { a, b, flipped } }) {
      const f = fnOf(sourceKey(a, b, -1, 0));
      const g = fnOf(key(a, flipped));
      for (const x of [-3, -1, 0, 2, 4.5]) assertNear(f(x), g(x), `equal at x = ${x}`);
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "negative-and-roots",
    skill: "solve",
    make(r) {
      // Each expression is base^(p/q) with the base a perfect q-th power and p/q in lowest terms.
      const draw = (sign) => {
        const q = r.pick([2, 3, 4]);
        const p = sign * r.pick([1, 2, 3].filter((n) => gcd(n, q) === 1));
        const root = r.pick(ROOTS.filter((candidate) => withinReach(candidate.pow(q))));
        return { q, p, root, base: root.pow(q), value: root.pow(p) };
      };
      const first = draw(1);
      const second = draw(-1);
      const text = ({ base, p, q }) => powerText(shown(base), `${num(p)}/${q}`);
      const line = (e) => {
        const found = `the ${ROOT_NAME[e.q]} root of ${qText(shown(e.base))} is ${qText(shown(e.root))}`;
        return e.p === 1
          ? `${text(e)}: ${found}.`
          : `${text(e)}: ${found}, and ${qText(shown(e.root))} raised to the power ${num(e.p)} is ${qText(shown(e.value))}.`;
      };
      return problem({
        stem: "Evaluate each expression without a calculator.",
        parts: [
          part(`Evaluate ${text(first)}.`, ask.number(`${text(first)} =`, first.value)),
          part(
            `Evaluate ${text(second)}.`,
            ask.number(`${text(second)} =`, second.value),
          ),
        ],
        solution: [line(first), line(second)],
        data: { first, second },
      });
    },
    verify({ data: { first, second } }) {
      for (const { base, p, q, value } of [first, second])
        assertNear(base.value ** (p / q), value.value, "the value");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "product-property",
    skill: "describe",
    make(r) {
      const b = r.pick([
        new Q(2),
        new Q(3),
        new Q(4),
        new Q(5),
        new Q(1, 2),
        new Q(1, 3),
      ]);
      const a = new Q(r.pick([1, 2, 3, 4, 5, 6]));
      const h = r.pick([-3, -2, 2, 3, 4]);
      const factor = b.pow(h);
      if (!withinReach(factor)) reject("a factor that is too extreme");
      const g = a.mul(factor);
      const sign = h < 0 ? "−" : "+";
      return problem({
        stem: `The function f is given by f(x) = ${expText(shown(a), shown(b))}, and the function g is given by g(x) = ${stemText(a, b, 1, h)}. The graph of g can be described as a vertical dilation of the graph of f.`,
        parts: [
          part(
            "By what factor is the graph of f dilated vertically to produce the graph of g?",
            ask.number("Dilation factor =", factor),
          ),
          part(
            "Write g(x) in the form abˣ.",
            ask.expr("g(x) =", key(g, b), {
              form: "exponential",
              text: expText(shown(g), shown(b)),
            }),
          ),
        ],
        solution: [
          `Use the property ${powerText(shown(b), `x ${sign} ${Math.abs(h)}`)} = ${powerText(shown(b), num(h))}·${powerText(shown(b), "x")}, so g(x) = ${powerText(shown(b), num(h))}·f(x).`,
          `The factor ${powerText(shown(b), num(h))} = ${qText(shown(factor))} multiplies every output of f, so the graph of g is the graph of f dilated vertically by a factor of ${qText(shown(factor))}. In the form abˣ, g(x) = ${expText(shown(g), shown(b))}.`,
        ],
        data: { a, b, h, g, factor },
      });
    },
    verify({ data: { a, b, h, g, factor } }) {
      const f = fnOf(key(a, b));
      const shifted = fnOf(sourceKey(a, b, 1, h));
      for (const x of [-2, 0, 1.5, 3])
        assertNear(shifted(x), factor.value * f(x), `dilation at x = ${x}`);
      assertNear(fnOf(key(g, b))(2), shifted(2), "form abˣ");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "power-property",
    skill: "equivalent-forms",
    make(r) {
      // [base, exponent multiplier, the base b^p written exactly]
      const options = [
        [new Q(2), new Q(3), new Q(8)],
        [new Q(3), new Q(2), new Q(9)],
        [new Q(4), new Q(1, 2), new Q(2)],
        [new Q(9), new Q(1, 2), new Q(3)],
        [new Q(8), new Q(1, 3), new Q(2)],
        [new Q(27), new Q(1, 3), new Q(3)],
        [new Q(4), new Q(3, 2), new Q(8)],
        [new Q(9), new Q(3, 2), new Q(27)],
        [new Q(16), new Q(1, 4), new Q(2)],
        [new Q(25), new Q(1, 2), new Q(5)],
        [new Q(2), new Q(-2), new Q(1, 4)],
        [new Q(3), new Q(-2), new Q(1, 9)],
        [new Q(4), new Q(-1, 2), new Q(1, 2)],
        [new Q(8), new Q(-1, 3), new Q(1, 2)],
        [new Q(9), new Q(-1, 2), new Q(1, 3)],
        [new Q(4), new Q(-3, 2), new Q(1, 8)],
        [new Q(8), new Q(2, 3), new Q(4)],
        [new Q(1, 2), new Q(2), new Q(1, 4)],
        [new Q(1, 3), new Q(2), new Q(1, 9)],
        [new Q(1, 4), new Q(1, 2), new Q(1, 2)],
      ];
      const [b, p, c] = r.pick(options);
      const a = new Q(r.pick([1, 2, 3, 4, 5, -2, -3]));
      const pText = p.isInteger ? num(p.n) : p.toString();
      return problem({
        stem: `The function f is given by f(x) = ${stemText(a, b, p, 0)}.`,
        parts: [
          part(
            "By what factor does f multiply each time x increases by 1?",
            ask.number("Factor =", c),
          ),
          part(
            "Write f(x) in the form abˣ.",
            ask.expr("f(x) =", key(a, c), {
              form: "exponential",
              text: expText(shown(a), shown(c)),
            }),
          ),
        ],
        solution: [
          `Use the property b^(px) = (bᵖ)ˣ. Here ${powerText(shown(b), pText)} = ${qText(shown(c))}.`,
          `So f(x) = ${expText(shown(a), shown(c))}. Each increase of 1 in x multiplies the output by ${qText(shown(c))}.`,
        ],
        data: { a, b, p, c },
      });
    },
    verify({ data: { a, b, p, c } }) {
      const f = fnOf(sourceKey(a, b, p, 0));
      const g = fnOf(key(a, c));
      for (const x of [-2, 0, 1, 2, 3.5]) assertNear(f(x), g(x), `equal at x = ${x}`);
      assertNear(g(1) / g(0), c.value, "the growth factor");
      assert(c.d <= 64 && Math.abs(c.n) <= 200, "a readable base");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "power-property",
    skill: "equivalent-forms",
    make(r) {
      const options = [
        [new Q(2), 2],
        [new Q(2), 3],
        [new Q(3), 2],
        [new Q(5), 2],
        [new Q(1, 2), 2],
      ];
      const [b, p] = r.pick(options);
      const a = new Q(r.pick([1, 2, 3, 5, 6, -2, -4]));
      const q = r.pick([-3, -2, -1, 1, 2, 3]);
      const c = b.pow(p);
      const a2 = a.mul(b.pow(q));
      if (Math.abs(a2.value) > 400) reject("an extreme coefficient");
      return problem({
        stem: `The function f is given by f(x) = ${stemText(a, b, p, q)}.`,
        parts: [
          part(
            "Write f(x) in the form abˣ, where a and b are constants.",
            ask.expr("f(x) =", key(a2, c), {
              form: "exponential",
              text: expText(shown(a2), shown(c)),
            }),
          ),
          part("Find the initial value of f.", ask.number("Initial value =", a2)),
        ],
        solution: [
          `Write the exponent as a sum: ${powerText(shown(b), exponentText(p, q))} = ${powerText(shown(b), `${p}x`)}·${powerText(shown(b), num(q))}.`,
          `${powerText(shown(b), `${p}x`)} = (${powerText(shown(b), p)})ˣ = ${powerText(shown(c), "x")}, and ${powerText(shown(b), num(q))} = ${qText(shown(b.pow(q)))}.`,
          `So f(x) = ${qText(shown(a))}·${qText(shown(b.pow(q)))}·${powerText(shown(c), "x")} = ${expText(shown(a2), shown(c))}. The initial value is f(0) = ${qText(shown(a2))}.`,
        ],
        data: { a, b, p, q, c, a2 },
      });
    },
    verify({ data: { a, b, p, q, c, a2 } }) {
      const f = fnOf(sourceKey(a, b, p, q));
      const g = fnOf(key(a2, c));
      for (const x of [-2, 0, 1, 2.5, 4]) assertNear(f(x), g(x), `equal at x = ${x}`);
      assertNear(g(0), a2.value, "initial value");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "power-property",
    skill: "equivalent-forms",
    make(r) {
      const c = r.pick([new Q(2), new Q(3), new Q(5)]);
      const power = r.pick([-3, -2, -1, 2, 3, 4]);
      const a = new Q(r.pick([1, 2, 3, 5, 7, -2, -3]));
      const target = c.pow(power);
      if (!withinReach(target, 130)) reject("a base that is too extreme");
      // Half of the time the new base is a power of c, so k is a fraction.
      const m = r.chance() ? 1 : r.pick([2, 3]);
      const base = c.pow(m);
      const k = new Q(power, m);
      if (!withinReach(base, 130)) reject("a new base that is too extreme");
      if (m > 1 && base.equals(target)) reject("the same base twice");
      return problem({
        stem: `The function f is given by f(x) = ${expText(shown(a), shown(target))}. It can also be written as f(x) = ${qText(shown(a))}·${powerText(base, "kx")}, where k is a constant.`,
        parts: [part("Find the value of k.", ask.number("k =", k))],
        solution:
          m === 1
            ? [
                `Write the base ${qText(shown(target))} as a power of ${c}: ${qText(shown(target))} = ${powerText(c, num(power))}.`,
                `Then ${powerText(shown(target), "x")} = (${powerText(c, num(power))})ˣ = ${powerText(c, xTerm(power))}, so k = ${num(power)}.`,
              ]
            : [
                `Write both bases as powers of ${c}: ${qText(shown(target))} = ${powerText(c, num(power))} and ${qText(base)} = ${powerText(c, m)}.`,
                `Then ${powerText(shown(target), "x")} = ${powerText(c, xTerm(power))} and ${powerText(base, "kx")} = ${powerText(c, `${m}kx`)}. Setting ${m}k = ${num(power)} gives k = ${qText(k)}.`,
              ],
        data: { a, target, base, k },
      });
    },
    verify({ data: { a, target, base, k } }) {
      const f = fnOf(key(a, target));
      const g = fnOf(`(${plain(a)})*(${plain(base)})^((${plain(k)})*x)`);
      for (const x of [-2, 0, 1, 3.5]) assertNear(f(x), g(x), `equal at x = ${x}`);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "product-property",
    skill: "equivalent-forms",
    make(r) {
      const root = r.pick([new Q(2), new Q(3), new Q(5), new Q(1, 2)]);
      const m = r.pick([2, 3, 4]);
      const big = root.pow(m);
      if (!withinReach(big, 130)) reject("a base that is too extreme");
      const a = new Q(r.pick([1, 2, 3, 4, 6, -2, -3]));
      const h = r.pick([1, 2, 3]);
      // f(x) = a·big^((x + h)/m) = a·root^(x + h) = a·root^h·root^x
      const a2 = a.mul(root.pow(h));
      const x0 = r.int(1, root.value >= 5 ? 2 : 3);
      const value = a2.mul(root.pow(x0));
      if (Math.abs(value.value) > 20000) reject("a value that is too large");
      const exponent = `(x + ${h})/${m}`;
      return problem({
        stem: `The function f is given by f(x) = ${expText(shown(a), shown(big), exponent)}.`,
        parts: [
          part(
            "Write f(x) in the form abˣ, where a and b are constants.",
            ask.expr("f(x) =", key(a2, root), {
              form: "exponential",
              text: expText(shown(a2), shown(root)),
            }),
          ),
          part(`Find f(${x0}).`, ask.number(`f(${x0}) =`, value)),
        ],
        solution: [
          `Since ${qText(shown(big))} = ${powerText(shown(root), m)}, ${powerText(shown(big), exponent)} = (${powerText(shown(root), m)})^(${exponent}) = ${powerText(shown(root), `x + ${h}`)}.`,
          `${powerText(shown(root), `x + ${h}`)} = ${powerText(shown(root), h)}·${powerText(shown(root), "x")}, so f(x) = ${qText(shown(a))}·${qText(shown(root.pow(h)))}·${powerText(shown(root), "x")} = ${expText(shown(a2), shown(root))}.`,
          `f(${x0}) = ${expText(shown(a2), shown(root), x0)} = ${qText(shown(value))}.`,
        ],
        data: { a, big, m, h, a2, root, x0, value },
      });
    },
    verify({ data: { a, big, m, h, a2, root, x0, value } }) {
      const f = fnOf(`(${plain(a)})*(${plain(big)})^((x + ${h})/${m})`);
      const g = fnOf(key(a2, root));
      for (const x of [-3, 0, 1, 2.5, 6]) assertNear(f(x), g(x), `equal at x = ${x}`);
      assertNear(f(x0), value.value, "the value");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "power-property",
    skill: "apply-results",
    make(r) {
      const decay = r.chance();
      const period = r.pick([2, 3, 4, 5, 6, 8, 10]);
      const start = r.pick([40, 60, 80, 100, 120, 200, 500]);
      const base = decay ? new Q(1, 2) : new Q(r.pick([2, 3]));
      const k = r.int(2, 4);
      const T = period * k;
      const factor = Math.pow(base.value, 1 / period);
      const rounded = Math.round(factor * 1000) / 1000;
      const value = start * base.value ** k;
      const name = decay ? "M" : "N";
      const shownBase = shown(base);
      const model = expText(start, shownBase, `t/${period}`);
      const intro = decay
        ? `The mass of a radioactive sample, in milligrams, is modeled by M(t) = ${model}, where t is the number of days after the sample is first measured.`
        : `The number of bacteria in a culture is modeled by N(t) = ${model}, where t is the number of hours after the culture is started.`;
      const root = powerText(shownBase, `1/${period}`);
      return problem({
        stem: intro,
        parts: [
          part(
            `The model can be written as ${name}(t) = ${start}bᵗ. Find the value of b. Round your answer to three decimal places.`,
            ask.number("b =", rounded, { decimals: 3 }),
          ),
          part(
            `Find ${name}(${T}).`,
            ask.number(`${name}(${T}) =`, value, {
              unit: decay ? "milligrams" : "bacteria",
            }),
          ),
        ],
        solution: [
          `Use the power property: ${powerText(shownBase, `t/${period}`)} = (${root})ᵗ.`,
          `So b = ${root} ≈ ${rounded.toFixed(3)}.`,
          `${name}(${T}) = ${expText(start, shownBase, `${T}/${period}`)} = ${expText(start, shownBase, k)} = ${num(value)}.`,
        ],
        data: { start, base, period, rounded, T, value },
      });
    },
    verify({ data: { start, base, period, rounded, T, value } }) {
      const b = base.value ** (1 / period);
      assert(Math.abs(b - rounded) <= 0.0005 + 1e-12, "rounded base");
      assertNear(start * b ** T, value, "model value");
    },
  },
];

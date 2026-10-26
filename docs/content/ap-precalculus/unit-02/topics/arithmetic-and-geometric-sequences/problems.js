// Typed-answer problems for Topic 2.1. Each template draws new numbers for every
// variant. verify() recomputes the facts from the displayed rule or table, so a slip
// in the key and a slip in the stem cannot both survive the build.

import {
  ask,
  part,
  problem,
  table,
  polyText,
  num,
  par,
  signed,
  sub,
  Q,
  fnOf,
  assert,
  assertNear,
  reject,
  expText,
  expKey,
  powerText,
} from "../../../../practice-kit/index.js";

const term = (letter, k) => `${letter}${sub(k)}`;
const qText = (value) => (value instanceof Q ? value.toString() : num(value));
const KINDS = ["arithmetic", "geometric", "neither"];

// A geometric ratio that keeps every term a whole number for the first several terms.
function drawRatio(r) {
  const ratio = r.pick([
    2,
    3,
    4,
    -2,
    -3,
    new Q(1, 2),
    new Q(1, 3),
    new Q(3, 2),
    new Q(2, 3),
  ]);
  return ratio instanceof Q ? ratio : new Q(ratio);
}

// An initial value that keeps g₀rᵏ a whole number through k = last.
function drawInitial(r, ratio, last = 5) {
  const base = ratio.d ** last;
  return new Q(r.pick([1, 2, 3, 5, -1, -2, -3, -5]) * base);
}

// A ratio as it appears inside a product: 2 stays 2, −2 and 1/3 get parentheses.
const rp = (ratio) => (ratio.isInteger && ratio.n > 0 ? String(ratio.n) : `(${ratio})`);

const arith = (a0, d, n) => a0.add(d.mul(n));
const geom = (g0, ratio, n) => g0.mul(ratio.pow(n));

function seqTable(letter, values, from = 0) {
  return table(
    `Values of ${letter}ₙ`,
    ["n", `${letter}ₙ`],
    values.map((value, i) => [String(from + i), value === null ? "?" : qText(value)]),
  );
}

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "arithmetic",
    skill: "solve",
    make(r) {
      const a0 = new Q(r.int(-9, 15));
      const d = new Q(r.nonzero(-7, 8));
      const k = r.int(6, 12);
      const value = arith(a0, d, k);
      const rule = polyText([d, a0], "n");
      return problem({
        stem: `An arithmetic sequence aₙ has initial value a₀ = ${a0} and common difference d = ${d}.`,
        parts: [
          part(`Find ${term("a", k)}.`, ask.number(`${term("a", k)} =`, value)),
          part(
            "Write an expression for aₙ.",
            ask.expr("aₙ =", rule, { vars: ["n"], form: "expanded" }),
          ),
        ],
        solution: [
          `The general term is aₙ = a₀ + dn = ${a0} + ${par(d)}n, which is ${rule}.`,
          `Then ${term("a", k)} = ${a0} + ${par(d)}(${k}) = ${value}.`,
        ],
        data: { rule, k, value },
      });
    },
    verify({ data: { rule, k, value } }) {
      assertNear(fnOf(rule, "n")(k), value.value, "the term from the rule");
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "sequences",
    skill: "identify-information",
    make(r) {
      const kind = r.pick(KINDS);
      const count = 6;
      let values;
      let rate = null;
      if (kind === "arithmetic") {
        const a0 = new Q(r.int(-8, 12));
        rate = new Q(r.nonzero(-6, 7));
        values = Array.from({ length: count }, (_, n) => arith(a0, rate, n));
      } else if (kind === "geometric") {
        rate = drawRatio(r);
        const g0 = drawInitial(r, rate, count - 1);
        values = Array.from({ length: count }, (_, n) => geom(g0, rate, n));
      } else {
        const a0 = r.int(1, 9);
        const step = r.int(1, 4);
        const bend = r.int(1, 3);
        values = Array.from(
          { length: count },
          (_, n) => new Q(a0 + step * n + bend * n * n),
        );
      }
      if (kind === "geometric" && values.some((v) => v.isZero)) reject("a zero term");
      const letter = kind === "geometric" ? "g" : "a";
      const parts = [
        part(
          `Is the sequence arithmetic, geometric, or neither?`,
          ask.choice("The sequence is", KINDS, kind),
        ),
      ];
      const solution = [];
      if (kind === "arithmetic") {
        parts.push(part("Find the common difference.", ask.number("d =", rate)));
        solution.push(
          `Successive terms differ by ${rate} each time: ${qText(values[1])} − ${par(values[0])} = ${rate}. A common difference means the sequence is arithmetic.`,
        );
      } else if (kind === "geometric") {
        parts.push(part("Find the common ratio.", ask.number("r =", rate)));
        solution.push(
          `Successive terms have a constant ratio: ${qText(values[1])}/${par(values[0])} = ${rate}. A common ratio means the sequence is geometric.`,
        );
      } else {
        const diffs = values.slice(1).map((v, i) => v.sub(values[i]));
        solution.push(
          `The differences are ${diffs.slice(0, 3).map(qText).join(", ")}, and so on, which are not constant, so the sequence is not arithmetic.`,
          `The ratios ${qText(values[1].div(values[0]))} and ${qText(values[2].div(values[1]))} are not equal, so the sequence is not geometric.`,
        );
      }
      return problem({
        stem: `Selected terms of a sequence are shown in the table.`,
        blocks: [seqTable(letter, values)],
        parts,
        solution,
        data: { kind, values },
      });
    },
    verify({ data: { kind, values } }) {
      const diffs = values.slice(1).map((v, i) => v.sub(values[i]).value);
      const ratios = values
        .slice(1)
        .map((v, i) => (values[i].isZero ? NaN : v.value / values[i].value));
      const isArith = diffs.every((x) => Math.abs(x - diffs[0]) < 1e-9);
      const isGeom = ratios.every(
        (x) => Number.isFinite(x) && Math.abs(x - ratios[0]) < 1e-9,
      );
      assert(isArith === (kind === "arithmetic"), "arithmetic test");
      assert(isGeom === (kind === "geometric"), "geometric test");
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "geometric",
    skill: "solve",
    make(r) {
      const ratio = drawRatio(r);
      const k = ratio.isInteger ? r.int(3, 5) : r.int(3, 4);
      const g0 = drawInitial(r, ratio, k);
      const value = geom(g0, ratio, k);
      const key = expKey(g0, ratio, "n");
      return problem({
        stem: `A geometric sequence gₙ has initial value g₀ = ${g0} and common ratio r = ${ratio}.`,
        parts: [
          part(`Find ${term("g", k)}.`, ask.number(`${term("g", k)} =`, value)),
          part(
            "Write an expression for gₙ in the form g₀rⁿ.",
            ask.expr("gₙ =", key, {
              vars: ["n"],
              form: "geometric",
              text: expText(g0, ratio, "n"),
            }),
          ),
        ],
        solution: [
          `The general term is gₙ = g₀rⁿ = ${expText(g0, ratio, "n")}.`,
          `Then ${term("g", k)} = ${expText(g0, ratio, k)} = ${value}.`,
        ],
        data: { key, k, value },
      });
    },
    verify({ data: { key, k, value } }) {
      assertNear(fnOf(key, "n")(k), value.value, "the term from the rule");
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "arithmetic",
    skill: "solve",
    make(r) {
      const j = r.int(1, 4);
      const m = j + r.int(3, 6);
      const d = new Q(r.nonzero(-6, 8));
      const a0 = new Q(r.int(-10, 20));
      const aj = arith(a0, d, j);
      const am = arith(a0, d, m);
      const k = m + r.int(2, 6);
      const value = arith(a0, d, k);
      return problem({
        stem: `In an arithmetic sequence, ${term("a", j)} = ${aj} and ${term("a", m)} = ${am}.`,
        parts: [
          part("Find the common difference.", ask.number("d =", d)),
          part(`Find ${term("a", k)}.`, ask.number(`${term("a", k)} =`, value)),
        ],
        solution: [
          `The terms are ${m - j} steps apart, so the common difference is (${am} − ${par(aj)})/${m - j} = ${d}.`,
          `Using aₙ = aₖ + d(n − k) with k = ${m}: ${term("a", k)} = ${am} + ${par(d)}(${k} − ${m}) = ${value}.`,
        ],
        data: { j, m, aj, am, d, k, value },
      });
    },
    verify({ data: { j, m, aj, am, d, k, value } }) {
      assertNear((am.value - aj.value) / (m - j), d.value, "difference");
      assertNear(am.value + d.value * (k - m), value.value, "later term");
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "geometric",
    skill: "solve",
    make(r) {
      const ratio = r.pick([2, 3, -2, -3, new Q(1, 2)]);
      const rq = ratio instanceof Q ? ratio : new Q(ratio);
      const j = r.int(1, 2);
      const m = j + 3;
      const g0 = new Q(r.pick([1, 2, 3, 4, 5, -2, -3]) * rq.d ** m);
      const gj = geom(g0, rq, j);
      const gm = geom(g0, rq, m);
      const key = expKey(g0, rq, "n");
      return problem({
        stem: `In a geometric sequence, ${term("g", j)} = ${gj} and ${term("g", m)} = ${gm}.`,
        parts: [
          part("Find the common ratio.", ask.number("r =", rq)),
          part("Find the initial value g₀.", ask.number("g₀ =", g0)),
          part(
            "Write an expression for gₙ.",
            ask.expr("gₙ =", key, {
              vars: ["n"],
              form: "geometric",
              text: expText(g0, rq, "n"),
            }),
          ),
        ],
        solution: [
          `The terms are 3 steps apart, so ${term("g", m)} = ${term("g", j)}·r³, or ${gm} = ${par(gj)}r³.`,
          `Then r³ = ${gm}/${par(gj)} = ${gm.div(gj)}, so r = ${rq}.`,
          `Since ${term("g", j)} = g₀${j === 1 ? "r" : "r" + ["", "", "²"][j]}, g₀ = ${gj}/${rp(rq)}${j === 1 ? "" : ["", "", "²"][j]} = ${g0}. So gₙ = ${expText(g0, rq, "n")}.`,
        ],
        data: { key, j, m, gj, gm, rq, g0 },
      });
    },
    verify({ data: { key, j, m, gj, gm, rq, g0 } }) {
      const f = fnOf(key, "n");
      assertNear(f(j), gj.value, "the jth term");
      assertNear(f(m), gm.value, "the mth term");
      assertNear(f(1) / f(0), rq.value, "ratio");
      assertNear(f(0), g0.value, "initial value");
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "arithmetic",
    skill: "construct-functions",
    make(r) {
      const j = r.int(1, 5);
      const m = j + r.int(2, 6);
      const d = new Q(r.nonzero(-9, 9));
      const a0 = new Q(r.int(-15, 25));
      const aj = arith(a0, d, j);
      const am = arith(a0, d, m);
      const rule = polyText([d, a0], "n");
      return problem({
        stem: `An arithmetic sequence has ${term("a", j)} = ${aj} and ${term("a", m)} = ${am}.`,
        parts: [
          part("Find the common difference.", ask.number("d =", d)),
          part("Find the initial value a₀.", ask.number("a₀ =", a0)),
          part(
            "Write an expression for aₙ.",
            ask.expr("aₙ =", rule, { vars: ["n"], form: "expanded" }),
          ),
        ],
        solution: [
          `The common difference is (${am} − ${par(aj)})/(${m} − ${j}) = ${d}.`,
          `Going back ${j} step${j === 1 ? "" : "s"} from ${term("a", j)} gives a₀ = ${aj} − ${par(d)}(${j}) = ${a0}.`,
          `So aₙ = a₀ + dn = ${rule}.`,
        ],
        data: { rule, j, m, aj, am },
      });
    },
    verify({ data: { rule, j, m, aj, am } }) {
      const f = fnOf(rule, "n");
      assertNear(f(j), aj.value, "the jth term");
      assertNear(f(m), am.value, "the mth term");
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "geometric",
    skill: "apply-results",
    make(r) {
      const geometric = r.chance();
      if (!geometric) {
        const options = [
          {
            who: (a0, d) =>
              `A jar holds $${a0} at the start of a savings plan, and $${d} is added each day. Let aₙ be the amount in the jar, in dollars, after n days.`,
            unit: "dollars",
          },
          {
            who: (a0, d) =>
              `A library has ${a0} books on a shelf at the start of the month, and ${d} more are shelved each day. Let aₙ be the number of books on the shelf after n days.`,
            unit: "books",
          },
        ];
        const o = r.pick(options);
        const a0 = r.int(20, 90);
        const d = r.int(4, 15);
        const k = r.int(8, 20);
        const value = a0 + d * k;
        const goal = a0 + d * r.int(12, 30) - r.int(1, d - 1);
        const first = Math.ceil((goal - a0) / d);
        return problem({
          stem: o.who(a0, d),
          parts: [
            part(
              "Is the sequence arithmetic or geometric?",
              ask.choice("The sequence is", ["arithmetic", "geometric"], "arithmetic"),
            ),
            part(
              `Find ${term("a", k)}.`,
              ask.number(`${term("a", k)} =`, value, { unit: o.unit }),
            ),
            part(
              `Find the least whole number n for which aₙ ≥ ${goal}.`,
              ask.number("n =", first),
            ),
          ],
          solution: [
            `The same amount, ${d}, is added each day, so there is a common difference and the sequence is arithmetic.`,
            `aₙ = ${a0} + ${d}n, so ${term("a", k)} = ${a0} + ${d}(${k}) = ${value}.`,
            `Solve ${a0} + ${d}n ≥ ${goal}: n ≥ ${goal - a0}/${d}, which is about ${num(Math.round(((goal - a0) / d) * 100) / 100)}. The least whole number is n = ${first}.`,
          ],
          data: { kind: "arithmetic", a0, d, k, value, goal, first },
        });
      }
      const options = [
        {
          who: (g0, ratio) =>
            `A culture starts with ${g0} bacteria, and the number of bacteria ${ratio === 2 ? "doubles" : "triples"} every hour. Let gₙ be the number of bacteria after n hours.`,
          unit: "bacteria",
          ratios: [2, 3],
        },
        {
          who: (g0, ratio) =>
            `A video is shared by ${g0} people on the first day. Each day, ${ratio === 2 ? "twice" : "three times"} as many people share it as on the day before. Let gₙ be the number of people who share it on day n after the first day.`,
          unit: "people",
          ratios: [2, 3],
        },
      ];
      const o = r.pick(options);
      const ratio = r.pick(o.ratios);
      const g0 = r.int(3, 20);
      const k = r.int(4, 8);
      const value = g0 * ratio ** k;
      const raw = g0 * ratio ** r.int(4, 7) - r.int(1, g0);
      const goal =
        Math.round(raw / 10 ** (String(raw).length - 2)) * 10 ** (String(raw).length - 2);
      let first = 0;
      while (g0 * ratio ** first < goal) first += 1;
      return problem({
        stem: o.who(g0, ratio),
        parts: [
          part(
            "Is the sequence arithmetic or geometric?",
            ask.choice("The sequence is", ["arithmetic", "geometric"], "geometric"),
          ),
          part(
            `Find ${term("g", k)}.`,
            ask.number(`${term("g", k)} =`, value, { unit: o.unit }),
          ),
          part(
            `Find the least whole number n for which gₙ ≥ ${goal}.`,
            ask.number("n =", first),
          ),
        ],
        solution: [
          `Each value is ${ratio} times the one before, so there is a common ratio and the sequence is geometric.`,
          `gₙ = ${expText(g0, ratio, "n")}, so ${term("g", k)} = ${expText(g0, ratio, k)} = ${value}.`,
          `${term("g", first - 1)} = ${g0 * ratio ** (first - 1)} is less than ${goal}, and ${term("g", first)} = ${g0 * ratio ** first} is at least ${goal}, so n = ${first}.`,
        ],
        data: { kind: "geometric", g0, ratio, k, value, goal, first },
      });
    },
    verify({ data }) {
      if (data.kind === "arithmetic") {
        const { a0, d, k, value, goal, first } = data;
        assertNear(a0 + d * k, value, "term");
        assert(a0 + d * first >= goal && a0 + d * (first - 1) < goal, "least n");
      } else {
        const { g0, ratio, k, value, goal, first } = data;
        assertNear(g0 * ratio ** k, value, "term");
        assert(
          g0 * ratio ** first >= goal && g0 * ratio ** (first - 1) < goal,
          "least n",
        );
      }
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "sequences",
    skill: "identify-information",
    make(r) {
      const geometric = r.chance();
      let values;
      let kind;
      if (geometric) {
        kind = "geometric";
        const ratio = r.pick([2, 3, -2, new Q(1, 2)]);
        const rq = ratio instanceof Q ? ratio : new Q(ratio);
        const g0 = new Q(r.pick([1, 2, 3, 5, -4]) * rq.d ** 5);
        values = Array.from({ length: 6 }, (_, n) => geom(g0, rq, n));
      } else {
        kind = "arithmetic";
        const a0 = new Q(r.int(-12, 20));
        const d = new Q(r.nonzero(-8, 9));
        values = Array.from({ length: 6 }, (_, n) => arith(a0, d, n));
      }
      // Hide two terms that are not next to each other, so both must be reached from known ones.
      const hidden = r.sample([1, 2, 3, 4], 2).sort((a, b) => a - b);
      if (hidden[1] - hidden[0] === 1) {
        // Two adjacent blanks are fine, but keep one known term on each side.
      }
      const shown = values.map((v, i) => (hidden.includes(i) ? null : v));
      const letter = geometric ? "g" : "a";
      const solution = [];
      if (geometric) {
        const lo = shown.findIndex((v) => v !== null);
        const nextKnown = shown.findIndex((v, i) => i > lo && v !== null);
        const steps = nextKnown - lo;
        const ratioValue = values[1].div(values[0]);
        solution.push(
          `The terms ${term(letter, lo)} = ${qText(values[lo])} and ${term(letter, nextKnown)} = ${qText(values[nextKnown])} are ${steps} step${steps === 1 ? "" : "s"} apart, so r${steps === 1 ? "" : ["", "", "²", "³", "⁴", "⁵"][steps]} = ${qText(values[nextKnown].div(values[lo]))}${steps === 1 ? "" : " and r = " + ratioValue}.`,
        );
        for (const i of hidden) {
          solution.push(
            `${term(letter, i)} = ${qText(values[i - 1])} · ${par(ratioValue)} = ${qText(values[i])}.`,
          );
        }
      } else {
        const d = values[1].sub(values[0]);
        const lo = shown.findIndex((v) => v !== null);
        const nextKnown = shown.findIndex((v, i) => i > lo && v !== null);
        const steps = nextKnown - lo;
        solution.push(
          `The terms ${term(letter, lo)} = ${qText(values[lo])} and ${term(letter, nextKnown)} = ${qText(values[nextKnown])} are ${steps} step${steps === 1 ? "" : "s"} apart, so the common difference is (${qText(values[nextKnown])} − ${par(values[lo])})/${steps} = ${d}.`,
        );
        for (const i of hidden) {
          solution.push(
            `${term(letter, i)} = ${qText(values[i - 1])} + ${par(d)} = ${qText(values[i])}.`,
          );
        }
      }
      return problem({
        stem: `Selected terms of ${geometric ? "a geometric" : "an arithmetic"} sequence are shown in the table. Two terms are not shown.`,
        blocks: [seqTable(letter, shown)],
        parts: hidden.map((i) =>
          part(`Find ${term(letter, i)}.`, ask.number(`${term(letter, i)} =`, values[i])),
        ),
        solution,
        data: { kind, values, hidden },
      });
    },
    verify({ data: { kind, values, hidden } }) {
      const diffs = values.slice(1).map((v, i) => v.sub(values[i]).value);
      const ratios = values.slice(1).map((v, i) => v.value / values[i].value);
      if (kind === "arithmetic")
        assert(
          diffs.every((x) => Math.abs(x - diffs[0]) < 1e-9),
          "constant difference",
        );
      else
        assert(
          ratios.every((x) => Math.abs(x - ratios[0]) < 1e-9),
          "constant ratio",
        );
      assert(hidden.length === 2, "two blanks");
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "arithmetic",
    skill: "equivalent-forms",
    make(r) {
      if (r.chance()) {
        const k = r.int(2, 6);
        const d = new Q(r.pick([-7, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8]));
        const ak = new Q(r.nonzero(-10, 30));
        const a0 = ak.sub(d.mul(k));
        const rule = polyText([d, a0], "n");
        const n = r.int(8, 15);
        const shifted = d.mul(-k);
        return problem({
          stem: `An arithmetic sequence is defined by aₙ = ${ak} ${signed(d)}(n − ${k}).`,
          parts: [
            part("Find the initial value a₀.", ask.number("a₀ =", a0)),
            part(
              "Write aₙ in the form a₀ + dn.",
              ask.expr("aₙ =", rule, { vars: ["n"], form: "expanded" }),
            ),
            part(
              `Find ${term("a", n)}.`,
              ask.number(`${term("a", n)} =`, arith(a0, d, n)),
            ),
          ],
          solution: [
            `Distribute the common difference: aₙ = ${ak} ${signed(d)}n ${signed(shifted)} = ${rule}.`,
            `The initial value is a₀ = ${a0}.`,
            `${term("a", n)} = ${a0} + ${par(d)}(${n}) = ${arith(a0, d, n)}.`,
          ],
          data: {
            kind: "arithmetic",
            text: `${qText(ak).replace("−", "-")} + ${qText(d).replace("−", "-")}*(n - ${k})`,
            rule,
            n,
            value: arith(a0, d, n),
          },
        });
      }
      const ratio = r.pick([2, 3, new Q(1, 2), new Q(1, 3), -2]);
      const rq = ratio instanceof Q ? ratio : new Q(ratio);
      const k = r.int(2, 4);
      const g0 = drawInitial(r, rq, k);
      const gk = geom(g0, rq, k);
      const key = expKey(g0, rq, "n");
      const n = r.int(4, 6);
      return problem({
        stem: `A geometric sequence is defined by gₙ = ${expText(gk, rq, `n − ${k}`)}.`,
        parts: [
          part("Find the initial value g₀.", ask.number("g₀ =", g0)),
          part(
            "Write gₙ in the form g₀rⁿ.",
            ask.expr("gₙ =", key, {
              vars: ["n"],
              form: "geometric",
              text: expText(g0, rq, "n"),
            }),
          ),
          part(`Find ${term("g", n)}.`, ask.number(`${term("g", n)} =`, geom(g0, rq, n))),
        ],
        solution: [
          `Write ${powerText(rq, `n − ${k}`)} as ${powerText(rq, "n")}/${powerText(rq, k)}. Then g₀ = ${gk}/${powerText(rq, k)} = ${g0}.`,
          `So gₙ = ${expText(g0, rq, "n")}.`,
          `${term("g", n)} = ${expText(g0, rq, n)} = ${geom(g0, rq, n)}.`,
        ],
        data: {
          kind: "geometric",
          text: `${qText(gk).replace("−", "-")}*${rq.isInteger && rq.n > 0 ? String(rq.n) : `(${qText(rq).replace("−", "-")})`}^(n - ${k})`,
          key,
          n,
          value: geom(g0, rq, n),
        },
      });
    },
    verify({ data }) {
      const stemFn = fnOf(data.text, "n");
      const keyFn = fnOf(data.kind === "arithmetic" ? data.rule : data.key, "n");
      for (const n of [0, 1, 2, 5, 9])
        assertNear(stemFn(n), keyFn(n), `rule at n = ${n}`);
      assertNear(keyFn(data.n), data.value.value, "the term");
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "geometric",
    skill: "support-conclusions",
    make(r) {
      const a0 = r.int(40, 150);
      const d = r.int(10, 40);
      const g0 = r.int(2, 12);
      const ratio = r.pick([2, 3]);
      let first = 0;
      while (g0 * ratio ** first <= a0 + d * first && first < 30) first += 1;
      if (first < 3 || first > 9) reject("crossover out of range");
      const k = r.int(2, 4);
      return problem({
        stem: `The arithmetic sequence aₙ has a₀ = ${a0} and common difference ${d}. The geometric sequence gₙ has g₀ = ${g0} and common ratio ${ratio}.`,
        parts: [
          part(`Find ${term("a", k)}.`, ask.number(`${term("a", k)} =`, a0 + d * k)),
          part(`Find ${term("g", k)}.`, ask.number(`${term("g", k)} =`, g0 * ratio ** k)),
          part(
            "Find the least whole number n for which gₙ > aₙ.",
            ask.number("n =", first),
          ),
        ],
        solution: [
          `aₙ = ${a0} + ${d}n, so ${term("a", k)} = ${a0 + d * k}.`,
          `gₙ = ${expText(g0, ratio, "n")}, so ${term("g", k)} = ${g0 * ratio ** k}.`,
          `Compare the terms. ${term("a", first - 1)} = ${a0 + d * (first - 1)} and ${term("g", first - 1)} = ${g0 * ratio ** (first - 1)}, so gₙ has not passed aₙ yet. ${term("a", first)} = ${a0 + d * first} and ${term("g", first)} = ${g0 * ratio ** first}, so n = ${first}.`,
        ],
        data: { a0, d, g0, ratio, first, k },
      });
    },
    verify({ data: { a0, d, g0, ratio, first } }) {
      for (let n = 0; n < first; n += 1)
        assert(g0 * ratio ** n <= a0 + d * n, `g stays at or below a at n = ${n}`);
      assert(g0 * ratio ** first > a0 + d * first, "g passes a");
    },
  },
];

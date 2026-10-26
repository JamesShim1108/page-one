// Typed-answer problems for Topic 3.9. Arcsine, arccosine, and arctangent turn a ratio back
// into an angle on a restricted domain. The exact-value templates use the special angles;
// the context templates use a calculator-style decimal. verify() recomputes every output
// with Math.asin, Math.acos, and Math.atan.

import {
  ask,
  part,
  problem,
  graph,
  Q,
  piText,
  radians,
  exact,
  piTicks,
  anglesWith,
  assert,
  assertNear,
  reject,
} from "../../../../practice-kit/index.js";

const PI = Math.PI;
const qv = (q) => q.n / q.d;
const round = (x, places = 2) => Math.round(x * 10 ** places) / 10 ** places;
const dec = (x, places = 2) => {
  const v = round(x, places);
  return v < 0 ? `−${Math.abs(v)}` : String(v);
};
// Fixed decimals with a true minus sign: 0.450, −1.326.
const fx = (x, places) => (x < 0 ? "−" : "") + Math.abs(x).toFixed(places);
const NAME = { sin: "Sine", cos: "Cosine", tan: "Tangent" };
const sg = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
];

const ARC = { sin: "arcsin", cos: "arccos", tan: "arctan" };
// The angles that arcsin, arccos, and arctan can return, as multiples of π.
const OUTPUTS = {
  sin: [-1 / 2, -1 / 3, -1 / 4, -1 / 6, 0, 1 / 6, 1 / 4, 1 / 3, 1 / 2],
  cos: [0, 1 / 6, 1 / 4, 1 / 3, 1 / 2, 2 / 3, 3 / 4, 5 / 6, 1],
  tan: [-1 / 3, -1 / 4, -1 / 6, 0, 1 / 6, 1 / 4, 1 / 3],
};
const fromUnits = (u) => {
  for (const d of [1, 2, 3, 4, 6]) {
    const n = Math.round(u * d);
    if (Math.abs(n / d - u) < 1e-9) return new Q(n, d);
  }
  throw new Error(`Not a special angle: ${u}`);
};
// Is the angle u (a multiple of π) a possible output of the inverse function?
const inRange = (fn, u) =>
  fn === "sin"
    ? u >= -0.5 - 1e-9 && u <= 0.5 + 1e-9
    : fn === "cos"
      ? u >= -1e-9 && u <= 1 + 1e-9
      : u > -0.5 + 1e-9 && u < 0.5 - 1e-9;
// The one angle in the restricted domain with the given value of fn.
function principal(fn, value) {
  const found =
    fn === "sin"
      ? anglesWith("sin", value, -0.5, 0.5 + 1e-9)
      : fn === "cos"
        ? anglesWith("cos", value, 0, 1 + 1e-9)
        : anglesWith("tan", value, -0.5, 0.5);
  assert(found.length === 1, `one principal angle for ${fn} = ${value}`);
  return found[0];
}
const INVERSE = { sin: Math.asin, cos: Math.acos, tan: Math.atan };
// Every special angle strictly between −2π and 2π.
const CANDIDATES = (() => {
  const all = [];
  for (let k = -24; k <= 24; k++) {
    try {
      all.push(fromUnits(k / 12));
    } catch {
      // not a special angle
    }
  }
  return all;
})();

const CASES = {
  sin: { domain: "[−1, 1]", range: "[−π/2, π/2]", restricted: "[−π/2, π/2]" },
  cos: { domain: "[−1, 1]", range: "[0, π]", restricted: "[0, π]" },
  tan: { domain: "(−∞, ∞)", range: "(−π/2, π/2)", restricted: "(−π/2, π/2)" },
};

export const problems = [
  {
    id: "p01",
    tier: "quick",
    concept: "inverse-trig-functions",
    skill: "identify-information",
    make(r) {
      const rows = ["sin", "cos", "tan"].map((fn) => {
        const angle = fromUnits(r.pick(OUTPUTS[fn]));
        return { fn, angle, text: exact(fn, angle).text };
      });
      return problem({
        stem: "Find the exact value of each expression. Give each answer as an angle in radians.",
        parts: rows.map(({ fn, angle, text }) =>
          part(
            `Find ${ARC[fn]}(${text}).`,
            ask.number(`${ARC[fn]}(${text}) =`, piText(angle)),
          ),
        ),
        solution: rows.map(
          ({ fn, angle, text }) =>
            `${fn}(${piText(angle)}) = ${text}, and ${piText(angle)} is in ${CASES[fn].restricted}, so ${ARC[fn]}(${text}) = ${piText(angle)}.`,
        ),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { fn, angle, text } of rows) {
        const value = exact(fn, angle).value;
        assertNear(INVERSE[fn](value), radians(angle), `${fn} inverse of ${text}`);
      }
    },
  },
  {
    id: "p02",
    tier: "quick",
    unit: true,
    concept: "inverse-trig-functions",
    skill: "apply-results",
    make(r) {
      const rise = r.int(8, 30) / 10;
      if (rise === 1) reject("1 meters reads badly");
      const run = r.int(40, 90) / 10;
      const ladder = r.int(8, 20);
      const foot = r.int(2, ladder - 4);
      const string = r.int(20, 80);
      const height = r.int(8, string - 6);
      const unitLength = r.pick(["meters", "feet"]);
      const ramp = Math.atan(rise / run);
      const lean = Math.acos(foot / ladder);
      const kite = Math.asin(height / string);
      return problem({
        stem: "Each angle is found with an inverse trigonometric function. Round each answer to the nearest thousandth of a radian.",
        parts: [
          part(
            `A ramp rises ${dec(rise, 1)} ${unitLength} over a horizontal run of ${dec(run, 1)} ${unitLength}. Find the angle the ramp makes with the ground.`,
            ask.number("θ =", round(ramp, 3), { decimals: 3, unit: "radians" }),
          ),
          part(
            `A ${ladder}-foot ladder leans against a wall with its foot ${foot} feet from the wall. Find the angle the ladder makes with the ground.`,
            ask.number("θ =", round(lean, 3), { decimals: 3, unit: "radians" }),
          ),
          part(
            `A kite is ${height} meters above the ground on a straight string that is ${string} meters long. Find the angle the string makes with the ground.`,
            ask.number("θ =", round(kite, 3), { decimals: 3, unit: "radians" }),
          ),
        ],
        solution: [
          `tan θ = rise/run = ${dec(rise, 1)}/${dec(run, 1)}, so θ = arctan(${dec(rise, 1)}/${dec(run, 1)}) ≈ ${fx(ramp, 3)} radians.`,
          `The foot of the ladder is adjacent to the angle and the ladder is the hypotenuse, so cos θ = ${foot}/${ladder} and θ = arccos(${foot}/${ladder}) ≈ ${fx(lean, 3)} radians.`,
          `The height is opposite the angle and the string is the hypotenuse, so sin θ = ${height}/${string} and θ = arcsin(${height}/${string}) ≈ ${fx(kite, 3)} radians.`,
        ],
        data: { rise, run, ladder, foot, string, height, ramp, lean, kite },
      });
    },
    verify({ data: { rise, run, ladder, foot, string, height, ramp, lean, kite } }) {
      assertNear(Math.tan(ramp), rise / run, "ramp");
      assertNear(Math.cos(lean), foot / ladder, "ladder");
      assertNear(Math.sin(kite), height / string, "kite");
      assert(
        ramp > 0 && ramp < PI / 2 && lean > 0 && kite > 0,
        "angles in the first quadrant",
      );
    },
  },
  {
    id: "p03",
    tier: "quick",
    concept: "restricted-domains",
    skill: "describe",
    make(r) {
      const fns = r.shuffle(["sin", "cos", "tan"]);
      const aspects = r.shuffle(["domain", "range", "restricted"]);
      const rows = fns.map((fn, i) => ({
        fn,
        aspect: aspects[i],
        answer: CASES[fn][aspects[i]],
      }));
      const prompt = ({ fn, aspect }) =>
        aspect === "domain"
          ? `State the domain of y = ${ARC[fn]} x. Use interval notation.`
          : aspect === "range"
            ? `State the range of y = ${ARC[fn]} x. Use interval notation.`
            : `To define y = ${ARC[fn]} x, the ${fn === "sin" ? "sine" : fn === "cos" ? "cosine" : "tangent"} function is restricted to which interval of angles? Use interval notation.`;
      const label = ({ aspect }) =>
        aspect === "domain" ? "Domain:" : aspect === "range" ? "Range:" : "Angles in";
      return problem({
        stem: "Answer each question about the inverse trigonometric functions.",
        parts: rows.map((row) => part(prompt(row), ask.interval(label(row), row.answer))),
        solution: rows.map(({ fn, aspect, answer }) =>
          aspect === "domain"
            ? `The input of ${ARC[fn]} is a value of ${fn}. ${fn === "tan" ? "Tangent takes every real value" : `${NAME[fn]} takes values from −1 to 1`}, so the domain of ${ARC[fn]} is ${answer}.`
            : aspect === "range"
              ? `The output of ${ARC[fn]} is an angle in the restricted domain of ${fn}, so the range is ${answer}.`
              : `${NAME[fn]} is restricted to ${answer}, where it is one-to-one and still takes every value in its range.`,
        ),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { fn, aspect, answer } of rows) {
        if (aspect === "domain") {
          if (fn === "tan") assert(Number.isFinite(Math.atan(1e9)), "arctan defined");
          else {
            assert(
              Number.isFinite(INVERSE[fn](1)) && Number.isFinite(INVERSE[fn](-1)),
              "ends",
            );
            assert(Number.isNaN(INVERSE[fn](1.0001)), "outside");
          }
        } else if (aspect === "range") {
          const lo = INVERSE[fn](fn === "tan" ? -1e12 : -1);
          const hi = INVERSE[fn](fn === "tan" ? 1e12 : 1);
          assert(
            Math.abs(Math.min(lo, hi)) < PI / 2 + 1e-9 && Math.max(lo, hi) <= PI + 1e-9,
            "range",
          );
        } else {
          assert(answer === CASES[fn].range, "restricted domain matches range");
        }
      }
    },
  },
  {
    id: "p04",
    tier: "quick",
    concept: "restricted-domains",
    skill: "describe",
    make(r) {
      const rows = r.shuffle(["sin", "cos", "tan"]).map((fn) => {
        const valid = CANDIDATES.map(qv).filter((u) => inRange(fn, u) && u !== 0);
        const invalid = CANDIDATES.map(qv).filter(
          (u) => !inRange(fn, u) && Math.abs(u) <= 1.5,
        );
        const right = r.pick(valid);
        const wrong = [];
        if (fn === "tan") wrong.push(r.pick([-0.5, 0.5]));
        while (wrong.length < 3) {
          const next = r.pick(invalid);
          if (!wrong.includes(next) && next !== right) wrong.push(next);
        }
        const options = r.shuffle([right, ...wrong]).map((u) => piText(fromUnits(u)));
        return { fn, right, answer: piText(fromUnits(right)), options };
      });
      return problem({
        stem: "Each inverse trigonometric function returns an angle from a restricted interval.",
        parts: rows.map(({ fn, options, answer }) =>
          part(
            `Which of these angles can be the output of y = ${ARC[fn]} x?`,
            ask.choice("Output:", options, answer),
          ),
        ),
        solution: rows.map(
          ({ fn, answer }) =>
            `The output of ${ARC[fn]} must lie in ${CASES[fn].range}. Of the four angles, only ${answer} is in that interval.`,
        ),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { fn, options, answer } of rows) {
        assert(new Set(options).size === 4, "distinct options");
        const valid = CANDIDATES.filter(
          (q) => options.includes(piText(q)) && inRange(fn, qv(q)),
        );
        assert(
          valid.length === 1 && piText(valid[0]) === answer,
          `only one valid output for ${fn}`,
        );
      }
    },
  },
  {
    id: "p05",
    tier: "quiz",
    concept: "restricted-domains",
    skill: "apply-results",
    make(r) {
      const rows = ["sin", "cos", "tan"].map((fn) => {
        const options = CANDIDATES.filter(
          (q) => !inRange(fn, qv(q)) && Math.abs(qv(q)) < 2.01 && exact(fn, q).defined,
        ).filter((q) => qv(q) !== 0);
        const angle = r.pick(options);
        const trigValue = exact(fn, angle);
        const result = principal(fn, trigValue.value);
        return {
          fn,
          angle,
          trigText: trigValue.text,
          trigValue: trigValue.value,
          result,
        };
      });
      return problem({
        stem: "Evaluate each expression. Remember that an inverse trigonometric function returns an angle from its restricted interval.",
        parts: rows.map(({ fn, angle, result }) =>
          part(
            `Find ${ARC[fn]}(${fn}(${piText(angle)})).`,
            ask.number(`${ARC[fn]}(${fn}(${piText(angle)})) =`, piText(result)),
          ),
        ),
        solution: rows.map(
          ({ fn, angle, trigText, result }) =>
            `${fn}(${piText(angle)}) = ${trigText}. The angle in ${CASES[fn].restricted} with ${fn} equal to ${trigText} is ${piText(result)}, so ${ARC[fn]}(${fn}(${piText(angle)})) = ${piText(result)}${qv(result) === qv(angle) ? "" : `, not ${piText(angle)}`}.`,
        ),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const { fn, angle, result } of rows) {
        assertNear(
          INVERSE[fn](Math[fn](radians(angle))),
          radians(result),
          `${fn} composition`,
        );
        assert(inRange(fn, qv(result)), "result in range");
        assert(qv(result) !== qv(angle), "angle is outside the restricted interval");
      }
    },
  },
  {
    id: "p06",
    tier: "quiz",
    concept: "inverse-trig-functions",
    skill: "construct-representations",
    make(r) {
      const types = r.sample(
        [
          "cos∘arcsin",
          "tan∘arcsin",
          "sin∘arccos",
          "tan∘arccos",
          "sin∘arctan",
          "cos∘arctan",
        ],
        3,
      );
      const rows = types.map((type) => {
        const [a0, b0, h] = r.pick(TRIPLES);
        const [a, b] = r.chance() ? [a0, b0] : [b0, a0];
        return compose(type, a, b, h, r.sign());
      });
      return problem({
        stem: "Evaluate each expression exactly. A right triangle or the unit circle can help.",
        parts: rows.map((row) =>
          part(`Find ${row.label}.`, ask.number(`${row.label} =`, row.answer)),
        ),
        solution: rows.map((row) => row.why),
        data: { rows },
      });
    },
    verify({ data: { rows } }) {
      for (const row of rows) assertNear(row.check(), qv(row.answer), row.label);
    },
  },
  {
    id: "p07",
    tier: "quiz",
    unit: true,
    concept: "restricted-domains",
    skill: "construct-representations",
    make(r) {
      const fn = r.pick(["sin", "cos", "tan"]);
      const angle = fromUnits(
        r.pick(
          OUTPUTS[fn].filter((u) => u !== 0 && Math.abs(u) !== (fn === "cos" ? 1 : 0.5)),
        ),
      );
      const value = exact(fn, angle);
      const x0 = value.value;
      assert(Math.abs(x0) <= (fn === "tan" ? 5 : 1), "point on graph");
      const wide = fn === "tan";
      const window = {
        x: wide ? [-6, 6] : [-1.5, 1.5],
        y: fn === "cos" ? [-0.6, 3.8] : [-2, 2],
      };
      const names = ["y = arcsin x", "y = arccos x", "y = arctan x"];
      return problem({
        stem: `The graph of an inverse trigonometric function is shown. Point A is on the graph at x = ${value.text}.`,
        blocks: [
          graph({
            caption:
              "The graph of an inverse trigonometric function with the point A marked",
            alt:
              fn === "sin"
                ? "An increasing curve from (−1, −π/2) to (1, π/2) through the origin. The point A is marked on it."
                : fn === "cos"
                  ? "A decreasing curve from (−1, π) to (1, 0) through (0, π/2). The point A is marked on it."
                  : "An increasing curve through the origin that levels off toward the dashed horizontal lines y = π/2 and y = −π/2. The point A is marked on it.",
            window,
            ticks: {
              x: wide ? 1 : 0.5,
              y: fn === "cos" ? piTicks(0, 1, 2) : piTicks(-0.5, 0.5, 2),
            },
            axisLabels: { x: "x", y: "y" },
            functions: [
              wide
                ? { expr: "atan(x)" }
                : {
                    expr: fn === "sin" ? "asin(x)" : "acos(x)",
                    domain: [-1, 1],
                    endpoints: ["closed", "closed"],
                  },
            ],
            asymptotes: wide ? [{ y: PI / 2 }, { y: -PI / 2 }] : [],
            points: [
              {
                at: [x0, radians(angle)],
                label: "A",
                position: qv(angle) > 0 ? "se" : "nw",
              },
            ],
          }),
        ],
        parts: [
          part(
            "Which function is graphed?",
            ask.choice("The graph of", names, names[["sin", "cos", "tan"].indexOf(fn)]),
          ),
          part(`What is the y-coordinate of A?`, ask.number("y =", piText(angle))),
          part(
            "What is the range of the function? Use interval notation.",
            ask.interval("Range:", CASES[fn].range),
          ),
        ],
        solution: [
          fn === "tan"
            ? "The graph is defined for every x, increases, and levels off toward y = π/2 and y = −π/2, which is the graph of arctangent."
            : fn === "sin"
              ? "The graph exists only for −1 ≤ x ≤ 1, increases, and passes through the origin, which is the graph of arcsine."
              : "The graph exists only for −1 ≤ x ≤ 1 and decreases from (−1, π) to (1, 0), which is the graph of arccosine.",
          `${ARC[fn]}(${value.text}) = ${piText(angle)}, because ${fn}(${piText(angle)}) = ${value.text} and ${piText(angle)} is in ${CASES[fn].restricted}. So A = (${value.text}, ${piText(angle)}).`,
          fn === "tan"
            ? "The graph levels off toward y = −π/2 and y = π/2 without reaching them, so the range is (−π/2, π/2)."
            : `The lowest y-value on the graph is ${fn === "sin" ? "−π/2" : "0"} and the highest is ${fn === "sin" ? "π/2" : "π"}, so the range is ${CASES[fn].range}.`,
        ],
        data: { fn, angle, x0 },
      });
    },
    verify({ data: { fn, angle, x0 } }) {
      assertNear(INVERSE[fn](x0), radians(angle), "point");
    },
  },
  {
    id: "p08",
    tier: "quiz",
    concept: "inverse-trig-functions",
    skill: "support-conclusions",
    make(r) {
      const mask = r.pick([
        [true, true, false],
        [true, false, true],
        [false, true, true],
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
      const kinds = r.shuffle(["value", "notation", "domain", "composition"]).slice(0, 3);
      const claims = kinds.map((kind, i) => claim(r, kind, mask[i]));
      return problem({
        stem: "Decide whether each statement is true or false.",
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
      for (const c of claims) assert(c.check() === c.truth, `claim: ${c.statement}`);
    },
  },
  {
    id: "p09",
    tier: "quiz",
    unit: true,
    concept: "inverse-trig-functions",
    skill: "apply-results",
    make(r) {
      const scene = r.pick(["ladder", "kite", "ramp"]);
      let data;
      if (scene === "ladder") {
        const L = r.int(8, 20);
        const d = r.int(2, L - 4);
        data = {
          intro: `A ${L}-foot ladder leans against a vertical wall. Its foot is ${d} feet from the wall.`,
          angle: Math.acos(d / L),
          ratio: `cos θ = ${d}/${L}`,
          arc: `arccos(${d}/${L})`,
          lastPrompt: "How high up the wall does the ladder reach?",
          last: Math.sqrt(L * L - d * d),
          lastUnit: "feet",
          lastWhy: `The height is the other leg of the right triangle: √(${L}² − ${d}²) = √${L * L - d * d} ≈ ${fx(Math.sqrt(L * L - d * d), 2)} feet.`,
          check: (θ) => L * Math.sin(θ),
          lastLabel: "Height:",
          inverseCheck: (θ) => Math.cos(θ) * L,
          knownTarget: d,
        };
      } else if (scene === "kite") {
        const L = r.int(20, 80);
        const h = r.int(8, L - 6);
        data = {
          intro: `A kite is flying ${h} meters above the ground on a straight string that is ${L} meters long.`,
          angle: Math.asin(h / L),
          ratio: `sin θ = ${h}/${L}`,
          arc: `arcsin(${h}/${L})`,
          lastPrompt:
            "How far is the point on the ground directly below the kite from the person holding the string?",
          last: Math.sqrt(L * L - h * h),
          lastUnit: "meters",
          lastWhy: `The ground distance is the other leg of the right triangle: √(${L}² − ${h}²) = √${L * L - h * h} ≈ ${fx(Math.sqrt(L * L - h * h), 2)} meters.`,
          check: (θ) => L * Math.cos(θ),
          lastLabel: "Distance:",
          inverseCheck: (θ) => Math.sin(θ) * L,
          knownTarget: h,
        };
      } else {
        const rise = r.int(8, 30) / 10;
        if (rise === 1) reject("1 meters reads badly");
        const run = r.int(40, 90) / 10;
        data = {
          intro: `A ramp rises ${dec(rise, 1)} meters over a horizontal run of ${dec(run, 1)} meters.`,
          angle: Math.atan(rise / run),
          ratio: `tan θ = ${dec(rise, 1)}/${dec(run, 1)}`,
          arc: `arctan(${dec(rise, 1)}/${dec(run, 1)})`,
          lastPrompt: "How long is the surface of the ramp?",
          last: Math.hypot(rise, run),
          lastUnit: "meters",
          lastWhy: `The surface is the hypotenuse: √(${dec(rise, 1)}² + ${dec(run, 1)}²) = √${dec(rise * rise + run * run, 2)} ≈ ${fx(Math.hypot(rise, run), 2)} meters.`,
          check: (θ) => run / Math.cos(θ),
          lastLabel: "Length:",
          inverseCheck: (θ) => Math.tan(θ) * run,
          knownTarget: rise,
        };
      }
      const degrees = round((data.angle * 180) / PI, 1);
      const radiansValue = round(data.angle, 3);
      const lastValue = round(data.last, 2);
      return problem({
        stem: `${data.intro} Let θ be the angle with the ground.`,
        parts: [
          part(
            "Find θ in radians. Round to the nearest thousandth.",
            ask.number("θ =", radiansValue, { decimals: 3, unit: "radians" }),
          ),
          part(
            "Find θ in degrees. Round to the nearest tenth.",
            ask.number("θ =", degrees, { decimals: 1, unit: "degrees" }),
          ),
          part(
            data.lastPrompt,
            ask.number(data.lastLabel, lastValue, { decimals: 2, unit: data.lastUnit }),
          ),
        ],
        solution: [
          `${data.ratio}, so θ = ${data.arc} ≈ ${fx(radiansValue, 3)} radians.`,
          `To convert to degrees, multiply by 180/π: ${fx(radiansValue, 3)}(180/π) ≈ ${fx(degrees, 1)} degrees.`,
          data.lastWhy,
        ],
        data: {
          angle: data.angle,
          radiansValue,
          degrees,
          last: data.last,
          lastValue,
          check: data.check,
          inverseCheck: data.inverseCheck,
          knownTarget: data.knownTarget,
        },
      });
    },
    verify({
      data: {
        angle,
        radiansValue,
        degrees,
        last,
        lastValue,
        check,
        inverseCheck,
        knownTarget,
      },
    }) {
      assertNear(radiansValue, angle, "radians", 6e-4);
      assertNear(degrees, (angle * 180) / PI, "degrees", 0.06);
      assertNear(lastValue, last, "last", 6e-3);
      assertNear(check(angle), last, "other leg from the angle", 1e-9);
      assertNear(
        inverseCheck(angle),
        knownTarget,
        "the angle returns the given side",
        1e-9,
      );
    },
  },
  {
    id: "p10",
    tier: "quiz",
    concept: "restricted-domains",
    skill: "apply-results",
    make(r) {
      const fn = r.pick(["sin", "cos", "tan"]);
      const value =
        fn === "tan"
          ? r.pick([0.5, 0.8, 1.5, 2, 2.5, 3, 4]) * r.sign()
          : r.pick([0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9]) * r.sign();
      const first = INVERSE[fn](value);
      // The two solutions of fn x = value in [0, 2π).
      const two =
        fn === "sin"
          ? [first < 0 ? first + 2 * PI : first, PI - first]
          : fn === "cos"
            ? [first, 2 * PI - first]
            : [first < 0 ? first + PI : first, first < 0 ? first + 2 * PI : first + PI];
      const [small, large] = two.sort((p, q) => p - q);
      const vText = dec(value, 1);
      return problem({
        stem: `Solve ${fn} x = ${vText} for x. Round each answer to the nearest thousandth.`,
        parts: [
          part(
            `Find ${ARC[fn]}(${vText}).`,
            ask.number(`${ARC[fn]}(${vText}) =`, round(first, 3), { decimals: 3 }),
          ),
          part(
            "Find the smaller solution of the equation with 0 ≤ x < 2π.",
            ask.number("Smaller x =", round(small, 3), { decimals: 3 }),
          ),
          part(
            "Find the larger solution of the equation with 0 ≤ x < 2π.",
            ask.number("Larger x =", round(large, 3), { decimals: 3 }),
          ),
        ],
        solution: [
          `${ARC[fn]}(${vText}) is the angle in ${CASES[fn].restricted} with ${fn} equal to ${vText}. A calculator in radian mode gives ${fx(first, 3)}.`,
          fn === "sin"
            ? `Sine takes each value twice in a turn, at x and at π − x. ${first < 0 ? `The angle ${fx(first, 3)} is negative, so add 2π: ${fx(first + 2 * PI, 3)}.` : `The first solution is ${fx(first, 3)}.`} The other solution is π − (${fx(first, 3)}) ≈ ${fx(PI - first, 3)}.`
            : fn === "cos"
              ? `Cosine takes each value twice in a turn, at x and at 2π − x. The solutions are ${fx(first, 3)} and 2π − ${fx(first, 3)} ≈ ${fx(2 * PI - first, 3)}.`
              : `Tangent has a period of π, so its solutions repeat every π. ${first < 0 ? `The angle ${fx(first, 3)} is negative, so add π to get ${fx(first + PI, 3)} and 2π to get ${fx(first + 2 * PI, 3)}.` : `The solutions are ${fx(first, 3)} and ${fx(first, 3)} + π ≈ ${fx(first + PI, 3)}.`}`,
          `The smaller solution is ${fx(small, 3)} and the larger solution is ${fx(large, 3)}.`,
        ],
        data: { fn, value, first, small, large },
      });
    },
    verify({ data: { fn, value, first, small, large } }) {
      assertNear(Math[fn](first), value, "principal");
      for (const x of [small, large]) {
        assert(x >= 0 && x < 2 * PI, "in [0, 2π)");
        assertNear(Math[fn](x), value, "solution");
      }
      assert(large > small, "two solutions");
    },
  },
];

// A composite such as cos(arcsin(s)), worked with a right triangle with legs a and b and
// hypotenuse h. sigma is the sign carried by the input.
function compose(type, a, b, h, sigma) {
  const q = (n, d) => new Q(n, d);
  const [outer, inner] = type.split("∘");
  const base = { arcsin: "sin", arccos: "cos", arctan: "tan" }[inner];
  const interval = CASES[base].restricted;
  let input;
  let sinQ;
  let cosQ;
  let note;
  if (inner === "arcsin") {
    input = q(sigma * a, h);
    sinQ = input;
    cosQ = q(b, h);
    note = `Let θ = arcsin(${input}). Then sin θ = ${input} and θ is in ${interval}, where cosine is not negative, so cos θ = √(1 − (${input})²) = ${cosQ}.`;
  } else if (inner === "arccos") {
    input = q(sigma * b, h);
    cosQ = input;
    sinQ = q(a, h);
    note = `Let θ = arccos(${input}). Then cos θ = ${input} and θ is in ${interval}, where sine is not negative, so sin θ = √(1 − (${input})²) = ${sinQ}.`;
  } else {
    input = q(sigma * a, b);
    sinQ = q(sigma * a, h);
    cosQ = q(b, h);
    note = `Let θ = arctan(${input}). Then tan θ = ${input} and θ is in ${interval}, where cosine is positive. A right triangle with legs ${a} and ${b} has hypotenuse ${h}, so cos θ = ${cosQ} and sin θ = ${sinQ}.`;
  }
  const answer = outer === "sin" ? sinQ : outer === "cos" ? cosQ : sinQ.div(cosQ);
  const label = `${outer}(${inner}(${input}))`;
  const closing =
    outer === "tan"
      ? `Then tan θ = (sin θ)/(cos θ) = (${sinQ})/(${cosQ}) = ${answer}.`
      : `So ${label} = ${outer} θ = ${answer}.`;
  const x = qv(input);
  return {
    label,
    answer,
    why: `${note} ${closing}`,
    check: () => Math[outer](INVERSE[base](x)),
  };
}

// One true or false statement about inverse trigonometric functions.
function claim(r, kind, truth) {
  if (kind === "value") {
    const fn = r.pick(["sin", "cos", "tan"]);
    const right = fromUnits(
      r.pick(
        OUTPUTS[fn].filter(
          (u) =>
            u !== 0 && Math.abs(u) !== 0.5 && !(fn === "cos" && (u === 1 || u === 0.5)),
        ),
      ),
    );
    const trig = exact(fn, right);
    // Another angle with the same value that is outside the restricted interval.
    const other =
      fn === "sin" ? new Q(1).sub(right) : fn === "cos" ? right.neg() : right.add(1);
    const shown = truth ? right : other;
    return {
      truth,
      statement: `${ARC[fn]}(${trig.text}) = ${piText(shown)}.`,
      reason: `${fn}(${piText(right)}) = ${trig.text} with ${piText(right)} in ${CASES[fn].restricted}, so ${ARC[fn]}(${trig.text}) = ${piText(right)}. ${truth ? "The statement is true." : `The angle ${piText(shown)} has the same ${fn} but is outside ${CASES[fn].restricted}, so the statement is false.`}`,
      check: () => Math.abs(INVERSE[fn](trig.value) - radians(shown)) < 1e-9,
    };
  }
  if (kind === "notation") {
    return truth
      ? {
          truth,
          statement: "sin⁻¹(1/2) is the angle in [−π/2, π/2] whose sine is 1/2.",
          reason:
            "The notation sin⁻¹ means the inverse function, arcsin. It returns the angle in [−π/2, π/2] whose sine is the input. The statement is true.",
          check: () =>
            Math.abs(Math.sin(Math.asin(0.5)) - 0.5) < 1e-9 &&
            Math.abs(Math.asin(0.5)) <= PI / 2,
        }
      : {
          truth,
          statement: "sin⁻¹(1/2) means the same as 1/sin(1/2).",
          reason:
            "The exponent −1 in sin⁻¹ marks the inverse function. It is not a reciprocal, so sin⁻¹(1/2) = π/6, while 1/sin(1/2) is about 2.086. The statement is false.",
          check: () => Math.abs(Math.asin(0.5) - 1 / Math.sin(0.5)) < 1e-9,
        };
  }
  if (kind === "domain") {
    const fn = r.pick(["sin", "cos", "tan"]);
    if (fn === "tan") {
      const c = r.pick([250, -40, 7]);
      return truth
        ? {
            truth,
            statement: `The expression arctan(${sg(c)}) is defined.`,
            reason: `Arctangent is defined for every real number, so arctan(${sg(c)}) is defined. The statement is true.`,
            check: () => !Number.isNaN(Math.atan(c)),
          }
        : {
            truth,
            statement: `The expression arctan(${sg(c)}) is not defined.`,
            reason: `Arctangent is defined for every real number, so arctan(${sg(c)}) is defined and the statement is false.`,
            check: () => Number.isNaN(Math.atan(c)),
          };
    }
    const c = truth ? r.pick([0.25, -0.5, 0.9, -1]) : r.pick([1.5, 2, -3, 4]);
    return {
      truth,
      statement: `The expression ${ARC[fn]}(${sg(c)}) is defined.`,
      reason: `The domain of ${ARC[fn]} is [−1, 1]. ${truth ? `${sg(c)} is in that interval, so the statement is true.` : `${sg(c)} is not in that interval, so the statement is false.`}`,
      check: () => !Number.isNaN(INVERSE[fn](c)),
    };
  }
  // composition
  const fn = r.pick(["sin", "cos", "tan"]);
  const inside = CANDIDATES.filter(
    (q) =>
      inRange(fn, qv(q)) && qv(q) !== 0 && Math.abs(qv(q)) !== (fn === "cos" ? 1 : 0.5),
  );
  const outside = CANDIDATES.filter(
    (q) =>
      !inRange(fn, qv(q)) &&
      Math.abs(qv(q)) <= 1.5 &&
      exact(fn, q).defined &&
      qv(q) !== 0,
  );
  const angle = truth ? r.pick(inside) : r.pick(outside);
  const result = principal(fn, exact(fn, angle).value);
  return {
    truth,
    statement: `${ARC[fn]}(${fn}(${piText(angle)})) = ${piText(angle)}.`,
    reason: truth
      ? `${piText(angle)} is in ${CASES[fn].restricted}, so ${ARC[fn]} returns it unchanged. The statement is true.`
      : `${piText(angle)} is not in ${CASES[fn].restricted}. The output of ${ARC[fn]} must be in that interval, so ${ARC[fn]}(${fn}(${piText(angle)})) = ${piText(result)}, and the statement is false.`,
    check: () => Math.abs(INVERSE[fn](Math[fn](radians(angle))) - radians(angle)) < 1e-9,
  };
}

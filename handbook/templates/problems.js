// Typed-answer templates for one topic. Copy this file into
// docs/content/ap-precalculus/unit-0N/topics/<slug>/problems.js and replace the examples.
// The guide is handbook/free-response.md; run `npm run sample -- unit-0N/topics/<slug>`
// to read what students will see.
//
// A topic needs exactly ten templates:
//   p01 to p04  tier "quick"  the quick check on the topic page
//   p05 to p10  tier "quiz"   the topic quiz
// and exactly three with `unit: true` (usually p02, p07, and p09) for the unit practice.
import {
  ask,
  part,
  problem,
  table,
  graph,
  reject,
  Q,
  num,
  polyText,
  fnOf,
  assertNear,
} from "../../../../practice-kit/index.js";

export const problems = [
  {
    id: "p01",
    tier: "quick",
    // A section id in this topic's lesson.js, and one of the eight ids in skills.js.
    concept: "average-rate-of-change",
    skill: "solve",
    // make(r) turns a seeded random generator into one complete problem. It must give the
    // same problem for the same seed. Call reject("why") to skip numbers that read badly.
    make(r) {
      const a = r.int(2, 9);
      const b = r.nonzero(-6, 6);
      if (2 * a + b === 0) reject("makes the rate of change zero");
      const at2 = 4 * a + 2 * b;
      return problem({
        // Write minus as − (U+2212), and never "1x". polyText(), num(), and the other kit helpers do this for you.
        stem: `Let f(x) = ${polyText([a, b, 0])}.`,
        parts: [
          part("Find f(2).", ask.number("f(2) =", at2)),
          part(
            "Find the average rate of change of f from x = 0 to x = 2.",
            ask.number("Rate of change:", Q.of(at2).div(2)),
          ),
        ],
        // One or more steps. Show the work the way a student should write it.
        solution: [
          `f(2) = ${a}(4) ${b < 0 ? "−" : "+"} ${Math.abs(b)}(2) = ${num(at2)}.`,
          `(f(2) − f(0)) / (2 − 0) = ${num(at2)} / 2 = ${Q.of(at2).div(2).toString()}.`,
        ],
        // For verify() only. It is not published.
        data: { a, b, at2 },
      });
    },
    // Check the keys by a second route. A failure stops the build and shows the variant.
    verify({ data: { a, b, at2 } }) {
      const f = fnOf(`${a}x^2 + (${b})x`);
      assertNear(f(2), at2, "f(2)");
      assertNear((f(2) - f(0)) / 2, at2 / 2, "average rate of change");
    },
  },

  // Other ways to ask:
  //   ask.expr("f(x) =", "x² − 4", { form: "factored" })          an expression, in a required form
  //   ask.interval("Domain:", "(−∞, 3]")                          interval notation
  //   ask.set("Solutions:", [2, -3])                              values in any order
  //   ask.points("Hole at", [[2, 4]])                             ordered pairs
  //   ask.limit("Limit:", "−∞")                                   a number, ∞, −∞, or DNE
  //   ask.choice("Concavity:", ["up", "down"], "up")              one option
  // A problem may also carry blocks: [table("Caption", ["x", "f(x)"], [[1, 3], [2, 5]]),
  // graph({ caption, alt, window, ticks, functions, points })]. Give every graph a caption
  // and an alt description, and look at it in the browser.
  // The remaining nine templates follow the same shape.
];

// Keep these referenced so an unused import is obvious when a template is copied.
void table;
void graph;

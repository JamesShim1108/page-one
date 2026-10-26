# Typed-answer practice

Most practice in AP Precalculus asks the student to type an answer and has the site check it, the way DeltaMath does. There is no self-scoring: the site decides, per part, whether each answer is right. The four-choice questions live in a separate [Multiple Choice](#multiple-choice-section) section that is not on any topic page. The 6-point written FRQs are unchanged and still scored by the student against a rubric.

## What a student sees

| Where                                 | What it is                                                                                                                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Topic page, "Quick check"             | 4 typed questions. Check each one, retry, and open the worked solution.                                                                                                       |
| Topic quiz (`…-N-M-quiz`)             | 6 typed questions, one at a time, with the same feedback.                                                                                                                     |
| Unit practice, Part 1 and Part 2      | 3 typed questions per topic, split where the CED splits its progress checks (after 1.6, 2.8, and 3.7). `…-N-practice`, `…-practice-2`.                                        |
| Custom practice, History, printing    | Custom practice draws on the topic-quiz questions not reserved for unit practice. History records typed attempts by topic and skill, and worksheets print with an answer key. |
| Multiple Choice (`#/mcq/precalculus`) | 10 four-choice questions per topic and two unit sets per unit, by unit and by topic.                                                                                          |

Every attempt shows new numbers. A question in the bank is a template with eight pre-generated variants, and each attempt picks one, so a retry, "practice these again", and a printed worksheet do not repeat the same problem. A worksheet and its answer key always carry the same variant.

### Checking an answer

- Each part has one or more answer boxes. **Check** marks every box with a ✓ or ✗. Boxes that cannot be read ("sin 2x", an unclosed parenthesis) get a message and do **not** count as a try.
- A wrong check counts as a try. After two wrong checks the page offers **Show solution**. Showing the solution ends the question as not correct and locks the boxes.
- A question scores as correct only if it is fully right on the **first** check. Solving it after a miss shows the worked solution but scores as not correct. The score is stored when the attempt finishes, so improving the checker later never changes an old result.
- In test mode (feedback at the end) nothing is checked until the attempt is finished, then every question is graded at once.
- Math keys and the scientific calculator are available on every box. Typing `pi`, `sqrt(3)`, `^`, `-`, and `inf` all work.

## How answers are graded

The checker is `docs/app/practice/answers.js`. It never compares strings: it compares values.

| Field type      | Student types                                | Accepted when                                                                                                                                                                                                                                                                                                                                                             |
| --------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `number`        | `3/4`, `0.75`, `5π/6`, `√3/2`                | Equal to the key. An exact key (a fraction, radical, or π) refuses a decimal approximation and says to give the exact value. `decimals: n` turns the box into an approximation with tolerance 10⁻ⁿ. `unit` is shown after the box and is not typed.                                                                                                                       |
| `expr`          | `(x−2)(x+2)`, `3(x+2)`, `sin(2x)`            | Equivalent to the key as a function of `vars` (default `x`), compared at many points. Strict by default: it must also be defined at the same inputs, so `x+2` is not `(x²−4)/(x−2)`. `strict: false` compares values only. A leading `f(x) =` or `y =` is optional. Trig and log functions need parentheses.                                                              |
| `expr` + `form` | `x²−4` as `(x−2)(x+2)`, `6·2^x`, `log₃(5x²)` | Equivalent **and** written in the requested form: `factored` (a product of linear factors with whole-number coefficients), `expanded`, `slope-intercept`, `exponential` (a·b^x), `exponential-e` (a·e^(kx)), `geometric`, `single-log` (one logarithm), `log-sum` (expanded). Look-alikes such as `3·2^(x+1)` for `6·2^x` are wrong, and the message says what to change. |
| `limit`         | `∞`, `-inf`, `DNE`, `2/3`                    | Same value, or the same of ∞, −∞, DNE.                                                                                                                                                                                                                                                                                                                                    |
| `interval`      | `(−∞, 3]`, `x ≤ 3`, `[0,pi/2)U(3pi/2,2pi]`   | Same union of intervals with the same brackets. `closure: "any"` compares endpoints only.                                                                                                                                                                                                                                                                                 |
| `set`           | `-3, 2`, `±√2`                               | Same values in any order. `ask.set(label, keys)`; `complex: true` allows a + bi and `empty: true` accepts "none".                                                                                                                                                                                                                                                         |
| `points`        | `(−3,4), (1,2)`                              | Same ordered pairs in any order.                                                                                                                                                                                                                                                                                                                                          |
| `equations`     | `y=2x+1`, `2x−y+1=0`                         | Same solutions; the spelling of the equation does not matter.                                                                                                                                                                                                                                                                                                             |
| `choice`        | one radio option                             | The key. Options are listed in `options`; the key must be one of them.                                                                                                                                                                                                                                                                                                    |

A key that the grader cannot read is a build error, not a broken question in the browser.

## Where the questions live

```
docs/content/ap-precalculus/unit-0N/topics/<slug>/
  lesson.js       the reading
  problems.js     typed-answer templates (this guide)
  questions.js    the topic's multiple-choice questions only
docs/content/practice-kit/   helpers shared by every problems.js
docs/app/practice/           the grader (answers.js, algebra.js, intervals.js, read.js)
docs/app/quiz/free.js        variant picking and typed-answer helpers
docs/app/quiz/free-views.js  the answer boxes and review markup
scripts/lib/practice.mjs     compiles templates into the generated bank
```

`unit.js` lists the unit practice parts under `practice` and the multiple-choice unit sets under the unit's quizzes (ids `…-mcq-1` and `…-mcq-2`).

## Writing a topic's problems.js

A topic has exactly **ten templates**: `p01` to `p04` are `tier: "quick"` (the quick check) and `p05` to `p10` are `tier: "quiz"` (the topic quiz). Exactly three carry `unit: true`; at most two of them may come from the quiz tier so custom practice keeps a pool. By convention they are `p02`, `p07`, and `p09`.

```js
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
  // …nine more
];
```

The annotated starter is `handbook/templates/problems.js`, which also lists every `ask.*` form.

### The pieces

- `make(r)` receives a seeded generator (`r.int`, `r.nonzero`, `r.pick`, `r.chance`, `r.sign`, `r.shuffle`, `r.sample`). It must be deterministic for a seed. Call `reject("why")` to skip a seed whose numbers are awkward.
- `problem({ stem, blocks, parts, solution, data })` builds one variant. `blocks` are tables (`table(caption, columns, rows)`) or graphs (`graph({...})`); `solution` has one or more steps; `data` is for `verify` and is stripped from the bank.
- `part(prompt, ...fields)` makes a lettered part. A single-box question may leave the prompt empty if the box has a label; every box in a multi-box question needs a label or a part prompt.
- `ask.number`, `ask.expr`, `ask.interval`, `ask.set`, `ask.limit`, `ask.points`, `ask.equations`, and `ask.choice(label, options, key)` build the fields.
- `verify({ data })` must check the answer by a **second route**: recompute from the function, sample it numerically, or substitute back. It runs once per variant.

### What the build checks for you

For every template the builder generates 8 variants from seeds `<id>#0`, `#1`, … and fails with the seed and the full variant if any of these is false:

- there are at least 6 different variants (shuffling the options of a choice box does not make a new one);
- no student-facing text (stems, prompts, labels, solutions, graph captions and descriptions) has an em dash, a hyphen where a minus sign belongs, a doubled sign (`+ −`), repeated spaces, a space inside parentheses, `NaN` or another leaked JavaScript value, an unsimplified term (`1x`, `x^1`), or a plural after the number 1 (`1 units`, `1 radians`);
- every key is accepted by the grader when typed the way `answerText` prints it, and common wrong answers built from it (key ± 1, double, negative, and so on) are rejected;
- choice options are different and include the key;
- the graph or table blocks are valid, with a caption and a description;
- `verify` passes.

Write minus as `−` (U+2212) with the helpers `num`, `polyText`, `piText`, and `Q`. Write exact answers (`√3/2`, `5π/6`) as keys, not decimals.

### Proofreading

Run `npm run sample -- unit-03/topics/polar-function-graphs p05 4` to print four readable variants of one template (or leave out the template to see two of each). Read stems, prompts, and solutions as a student would, and look at every graph in the browser: the build proves the keys, not that a graph is readable.

## The kit

`docs/content/practice-kit/` holds what a template needs, so a topic file stays about the topic.

| Module                                 | For                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `rng.js`                               | `createRandom(seed)` and its draws                                                                      |
| `rat.js`                               | `Q`, exact fractions that print with a real minus sign                                                  |
| `poly.js`                              | `Poly`: roots, products, division, derivative, and text                                                 |
| `fmt.js`                               | `num`, `polyText`, `lineText`, intervals, unions, lists, superscripts                                   |
| `numeric.js`                           | `fnOf`, `assert`, `assertNear`, zeros, extrema, AROC, domain checks                                     |
| `build.js`                             | `ask`, `part`, `problem`, `table`, `graph`, `reject`                                                    |
| `trig.js`                              | angles as multiples of π, exact values (`exact`, `scaled`), `anglesWith`, sign and inequality intervals |
| `expo.js`                              | exponential and logarithm text and keys                                                                 |
| `rational.js`, `signs.js`, `shapes.js` | rational-function specs, sign charts, small graph builders                                              |

## Multiple Choice section

Every topic's `questions.js` still holds ten four-choice questions with a reason for every choice (the rules in [AP practice standards](ap-practice.md) apply). They are no longer on topic pages. The build writes them to `docs/generated/precalculus/mcq/` and the unit sets to `…-mcq-1` and `…-mcq-2`. The course page and each unit hub link to `#/mcq/precalculus` and `#/mcq/precalculus-N`, where the sets are listed by unit and by topic. Quizzes opened from there carry `section: "mcq"` and return to the Multiple Choice hub.

## Tests

| File                              | Covers                                                                              |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `tests/answers.test.mjs`          | every field type of the grader                                                      |
| `tests/practice-builder.test.mjs` | the builder: structure, reproducibility, reject, text slips, choice rules           |
| `tests/practice-kit.test.mjs`     | the generator, fractions, exact trig values, text helpers                           |
| `tests/free-quiz.test.mjs`        | the attempt engine for typed answers: tries, solutions, scoring, validation, views  |
| `tests/free-bank.test.mjs`        | the whole generated bank: keys round-trip, no text slips, enough different variants |
| `tests/mcq-section.test.mjs`      | the Multiple Choice hub, routes, and its separation from topic pages                |

None of these opens a browser. After changing templates or the answer boxes, also click through a quick check, a topic quiz, and a unit practice part in a real browser, and look at every graph question.

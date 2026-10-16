# PSAT / SAT prep

A separate section at `#/test-prep` for PSAT 8/9, PSAT 10, PSAT/NMSQT, and SAT. It is not a course: it has its own content folder, build step, and pages, and shares the site's theme, quiz choice styles, and feedback styles.

## Files

| Change                                          | File                                 |
| ----------------------------------------------- | ------------------------------------ |
| Test names, timing, question counts, scales     | `docs/content/test-prep/tests.js`    |
| Sections, domains, skills, and where each tests | `docs/content/test-prep/taxonomy.js` |
| Official pages used for structure               | `docs/content/test-prep/sources.js`  |
| Public-domain reading passages                  | `docs/content/test-prep/passages.js` |
| Practice items (one file per skill or set)      | `docs/content/test-prep/items/*.js`  |
| Build validation                                | `scripts/lib/test-prep.mjs`          |
| Grid-in rules, answer checks, scale labels      | `docs/app/test-prep/engine.js`       |
| Selection page, test pages, item renderer       | `docs/app/test-prep/views.js`        |
| Item interactions                               | `docs/app/test-prep/controller.js`   |
| Styles                                          | `docs/styles/test-prep.css`          |

The build writes `docs/generated/test-prep/index.json` and, once items exist, one bank per section in `docs/generated/test-prep/banks/`.

## Hierarchy

test > section > domain > skill > item. Tests list their sections (`rw`, `math`). The taxonomy holds domains and skills once, and each skill's `tests` array says where it is tested: right triangle trigonometry is not on PSAT 8/9, and circles are SAT only. Items name only a `skillId`; section and domain are derived, so they cannot disagree.

## Item record

```js
{
  schemaVersion: 1,
  id: "tp-math-linear-functions-001", // starts with tp-, never reused
  skillId: "math-linear-functions",
  tests: ["psat10", "psatnmsqt", "sat"], // optional; defaults to the skill's tests
  difficulty: "medium", // easy | medium | hard
  format: "single-select", // or "grid-in" (math only)
  variant: "quantitative", // only for skills with variants (Command of Evidence)
  passageId: "tp-p-...", // R&W: a public-domain passage, or
  originalText: "...", // R&W Expression of Ideas and Conventions only
  table: { title, columns, rows, data: "illustrative" | { label, url } },
  stem: "...",
  choices: [{ id: "A", text }, { id: "B", text }, { id: "C", text }, { id: "D", text }],
  answer: "C",
  nearMiss: "B", // the one convincing distractor
  rationales: { A: "One sentence.", B: "One sentence.", D: "One sentence." },
  explanation: "Why the answer is right.",
  acceptedAnswers: ["2/3", ".6666", ".6667", "0.666", "0.667"], // grid-ins only
  verification: { kind: "value", compute: "R(2, 3)" }, // build-only, never shipped
}
```

## Rules the build enforces

- Items are original. Official skill names and formats are structure only; never copy or closely paraphrase an official stem, passage, or choice. (Not machine-checkable; review every item.)
- Single-select: four choices A–D, one `nearMiss`, one-sentence `rationales` for each distractor, and an `explanation`.
- Per section bank (8+ items): the correct choice is the longest in 10–40% of items, averages at most 1.25x distractor length, each letter is the answer at most 40% of the time and at least once, and no answer letter repeats more than 3 times in a row.
- Every math item has `verification`. `kind: "value"` computes the key and compares it to `choiceValues` (exactly one must match) or to the grid-in answers. `kind: "expression"` compares `choiceExpressions` with the key at sample values. Expressions may use numbers, `Math`, `R(p, q)` for exact fractions, and declared variables.
- Grid-ins list every accepted form. The build computes the required forms: the integer, the fraction if it fits, the exact decimal if it fits (with and without a leading zero), otherwise every truncated and rounded decimal that fills the space. Extra entries must equal the value exactly. Entry rules: 5 characters, 6 if negative; no mixed numbers, %, $, or commas.
- Passages are U.S. public domain (`us-pre-1931`: published 1930 or earlier, or `us-government-work`) with author, title, publication, year, and URL. Reading items in Information and Ideas and Craft and Structure must use one.

## Scores

Scores are always labeled "Practice estimate". Each test has a scale family (`psat89`, `psat`, `sat`); `sameScaleFamily` must be true before two estimates are ever compared, so a PSAT 8/9 estimate is never shown as equal to a PSAT or SAT score. Page One is not affiliated with the College Board.

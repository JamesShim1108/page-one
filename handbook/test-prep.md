# PSAT / SAT prep

A separate section at `#/test-prep` for PSAT 8/9, PSAT 10, PSAT/NMSQT, and SAT. It is not a course: it has its own content folder, build step, and pages, and shares the site's theme, quiz choice styles, and feedback styles.

## Pages

| Route                                             | Page                                                     |
| ------------------------------------------------- | -------------------------------------------------------- |
| `#/test-prep`                                     | Test selection: four cards                               |
| `#/test-prep/<test>`                              | One test's sections, domains, skills, and item counts    |
| `#/test-practice/<test>?skill=<id>`               | Skill practice, one item at a time, with feedback        |
| `#/test-practice/<test>?domain=<id>`              | Domain practice                                          |
| `#/test-practice/<test>?section=<rw or math>`     | Every item in a section                                  |
| `#/test-practice/<test>?section=<id>&mode=module` | Timed module, scored at the end with a practice estimate |
| `#/test-practice/<test>?mode=full`                | Full-length adaptive practice test                       |

Test IDs are `psat89`, `psat10`, `psatnmsqt`, and `sat`. Practice and single modules keep answers in the open tab only. The full-length test saves its progress in the browser (`localStorage`, key `page-one:test-prep:full:<test>`), pauses the timer while the page is closed, and offers to resume.

## Files

| Change                                          | File                                    |
| ----------------------------------------------- | --------------------------------------- |
| Test names, timing, question counts, scales     | `docs/content/test-prep/tests.js`       |
| Domain mix of one timed module                  | `moduleDomains` in `tests.js`           |
| Sections, domains, skills, and where each tests | `docs/content/test-prep/taxonomy.js`    |
| Official pages used for structure               | `docs/content/test-prep/sources.js`     |
| Public-domain reading passages                  | `docs/content/test-prep/passages.js`    |
| Practice items, one file per domain             | `docs/content/test-prep/items/*.js`     |
| Build validation                                | `scripts/lib/test-prep.mjs`             |
| Passage check against full texts                | `scripts/verify-test-prep-passages.mjs` |
| Grid-in rules, answer checks, scale labels      | `docs/app/test-prep/engine.js`          |
| Scopes, module draws, results, estimates        | `docs/app/test-prep/practice.js`        |
| Selection page, test pages, item renderer       | `docs/app/test-prep/views.js`           |
| Item state changes                              | `docs/app/test-prep/controller.js`      |
| Practice and module sessions                    | `docs/app/test-prep/session.js`         |
| Styles                                          | `docs/styles/test-prep.css`             |

The build writes `docs/generated/test-prep/index.json` and one bank per section in `docs/generated/test-prep/banks/`. Item files are read in filename order, which is also the order the bank checks use.

## Hierarchy

test > section > domain > skill > item. Tests list their sections (`rw`, `math`). The taxonomy holds domains and skills once, and each skill's `tests` array says where it is tested: right triangle trigonometry is not on PSAT 8/9, and circles are SAT only. Items name only a `skillId`; section and domain are derived, so they cannot disagree.

## Item record

```js
{
  schemaVersion: 1,
  id: "tp-math-lf-001", // starts with tp-, never reused
  skillId: "math-linear-functions",
  tests: ["psat10", "psatnmsqt", "sat"], // optional; defaults to the skill's tests
  difficulty: "medium", // easy | medium | hard
  format: "single-select", // or "grid-in" (math only)
  variant: "quantitative", // only for skills with variants (Command of Evidence)

  // Reading and Writing text: exactly one of these
  passageId: "tp-p-...", // a public-domain passage
  passageIds: ["tp-p-a", "tp-p-b"], // Cross-Text Connections: Text 1 and Text 2
  originalText: "...", // Expression of Ideas and Conventions only, labeled "Written by Page One"

  blank: "fixed", // optional: hides these words in the passage; the correct choice is exactly this text
  quotesPassage: true, // optional: every choice must quote the passage word for word, in curly quotes
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
- Per file and per section bank (8+ items): the correct choice is the longest in 10–40% of items and averages at most 1.25x distractor length; each letter is the answer at most 40% of the time and at least once; no answer letter repeats more than 3 times in a row; no feedback sentence is used more than twice.
- Every math item has `verification`:
  - `kind: "value"` computes the key and compares it to `choiceValues` (exactly one must match) or to the grid-in answers.
  - `kind: "expression"` compares `choiceExpressions` with `compute` at sample values (`samples`, or a default set). With `compare: "truth"`, choices are inequalities compared as true or false.
  - `kind: "predicate"` tests each choice's `choicePoints` (one value per variable) against `condition`; only the answer may satisfy it.
  - `kind: "study"` checks statistical-claims items: from `design` (`randomSample`, `randomAssignment`), only the answer's `choiceClaims` (cause and scope) may be supported.
  - Data items compute with `S.mean`, `S.median`, `S.range`, and `S.sd` over listed values.
  - Expressions may use numbers, `Math`, `R(p, q)` with `.add`, `.sub`, `.mul`, `.div` for exact fractions, comparisons, logic, and declared variables. Use `R` for any non-integer grid-in key.
- Grid-ins list every accepted form. The build computes the required forms: the integer, the fraction if it fits, the exact decimal if it fits (with and without a leading zero), otherwise every truncated and rounded decimal that fills the space. Extra entries must equal the value exactly. Entry rules: 5 characters, 6 if negative; no mixed numbers, %, $, or commas.
- Reading and Writing follows the digital format: every question has its own 25–150-word text (or a pair for Cross-Text Connections), no passage is used by two questions, every passage opens with an `intro` line naming the author and year, and each stem ends with the official prompt form for its skill (`STEM_FORMS` in `scripts/lib/test-prep.mjs`). Notes items begin "While researching a topic, a student has taken the following notes:" and use 3–6 bullets. Graphs (`figure`: plot, bars, or shapes) are drawn as SVG from data.
- Passages are U.S. public domain (`us-pre-1931`: published 1930 or earlier, or `us-government-work`) with author, title, publication, year, URL, and Gutenberg ebook number. Reading items in Information and Ideas and Craft and Structure must use one.
- A blank must appear exactly once in its passage, and the correct choice must be the hidden wording. The tests also check that no other item shows a blank's hidden words.
- Each test section's `moduleDomains` must list every tested domain and add up to one module (questions ÷ modules).

## Checking passages

Before committing a new or changed passage, download the Gutenberg plain-text files it cites (named by ebook number, such as `205.txt`) and run:

```bash
node scripts/verify-test-prep-passages.mjs path/to/texts
```

The check ignores line wrapping, italics underscores, quote style, and `--` versus an em dash. `. . .` stands for an omission, and a bracketed edit stands for the `original` listed in `edits`.

## Full-length test

The full-length test runs like the digital test: directions, Reading and Writing Module 1 (27 questions, 32 minutes), an adaptive Module 2, a 10-minute break, then Math Module 1 (22 questions, 35 minutes) and an adaptive Module 2. Each section's two modules never repeat a question.

- **Blueprints.** `moduleDomains` gives one domain-count object per module. Together they match the official share of each domain for that test; for example, SAT Math is 15 Algebra, 15 Advanced Math, 7 Problem-Solving, and 7 Geometry and Trigonometry questions.
- **Adaptive routing.** Module 1 draws an even spread of easy, medium, and hard questions. At least 60% correct leads to a harder Module 2 (mostly hard and medium); otherwise an easier one (mostly easy and medium). The official routing rule is not published; this threshold is Page One's.
- **Order.** Reading and Writing groups questions by skill in the official order (`moduleOrder` in `taxonomy.js`), easier first in each group. Math runs from easier to harder.
- **Tools.** Cross out choices, mark for review, a question menu, a review page before submitting, a timer that can be hidden until 5 minutes remain, and a Math reference sheet. There is no built-in graphing calculator; the page links to a free online one. Highlighting, notes, and the line reader are not reproduced.
- **Pretest questions.** The real test includes unscored pretest questions; every question here counts.

## Timed modules and scores

A module draws each domain's count from `moduleDomains` at random. Reading and Writing questions are grouped by domain and skill; Math runs from easier to harder. The module timer is the official module length (32 minutes for Reading and Writing, 35 for Math), and can be turned off before starting or hidden while working. Answers can change until the module is submitted or time runs out, and explanations appear afterward.

Results show the correct count by domain and a practice estimate band on that test's own section scale. For a single module, the band is the share correct mapped onto the section scale, plus or minus 7% of the scale width. For the full-length test, each module counts half, an easier Module 2 earns at most 80% credit (so it cannot reach the top of the scale), the band is plus or minus 5%, and the total band adds the two section bands. It is labeled "Practice estimate" and "Not an official score", because official scoring uses two adaptive modules and question difficulty. Skill practice reports accuracy only.

Each test has a scale family (`psat89`, `psat`, `sat`); `sameScaleFamily` must be true before two estimates are ever compared, so a PSAT 8/9 estimate is never shown as equal to a PSAT or SAT score. Page One is not affiliated with the College Board.

# AP practice standards

These rules keep Page One's practice aligned with how AP history exams test students. The build enforces the ones marked **checked**.

## Skills

Each course can define `skills.js` next to `course.js`. World History uses the six AP historical thinking skills and the three reasoning processes from the Course and Exam Description.

- Every practice question names one `skill` ID. **Checked.**
- A `connections` question also names a `reasoning` process: `comparison`, `causation`, or `continuity`. **Checked.**
- The build copies the skill label onto each question, so saved attempts keep their labels after content changes.
- Results show accuracy by skill for one attempt. History combines completed attempts in this browser. Both say plainly that small samples and repeated questions limit what the numbers mean.

A science or math course can define its own `skills.js` (for example, AP science practices) without code changes. A course without the file falls back to free-text `skillTag`.

## Multiple-choice quality

The validator measures every topic bank with at least eight questions. **Checked.**

| Rule                                       | Limit                            | Why                                                                        |
| ------------------------------------------ | -------------------------------- | -------------------------------------------------------------------------- |
| Correct choice is the longest              | between 10% and 40% of questions | Length must not give the answer away, in either direction.                 |
| Correct length ÷ average distractor length | at most 1.25 on average          | Catches correct answers that are consistently fuller.                      |
| Repeated feedback text                     | at most 2 uses course-wide       | Choice explanations and distinguishers must be written for their question. |

Authoring rules the validator cannot check:

- One distractor is a near miss: true in part, wrong in one specific way. Record it with `nearMissIndex`, and say what separates it in `distinguisher`.
- The other distractors are plausible to a student who half-knows the topic. Avoid joke choices, other continents, and absolute words that no one would pick.
- Each `choiceExplanations` entry explains why that choice fits or misses.

## Stimulus sources

AP multiple-choice questions come in sets of two to four questions about one source. Use a `source` block in `stimulusBlocks`:

```js
import { excerpts } from "../../../excerpts.js";
// ...
stimulusBlocks: [excerpts.battutaMali],
```

`excerpts.js` holds every passage. Its rules:

- **Primary excerpts** quote a public-domain edition exactly. Mark omissions with `. . .`. Put editorial substitutions in brackets and list each one in `edits`.
- **Practice passages** (`sourceType: "original"`) are written by Page One to summarize scholarship. They render with a "Written by Page One" label and must never be presented as quotations.
- Each excerpt has an `attribution` (who, what, when, as on an exam) and, for quotations, a `citation` with edition and locator.

Before committing a new or changed quotation, run the excerpt check against full texts of the editions:

```bash
node scripts/verify-excerpts.mjs path/to/source-texts
```

The script lists the file names it expects. Project Gutenberg texts can be downloaded from gutenberg.org; for Gibb's Ibn Battuta, save the Internet Archive full-text OCR. The source texts are not stored in this repository.

## Writing

- **SAQs** follow the exam mix: primary source, secondary source, and no stimulus. Each part has a task verb (identify, describe, explain), specific criteria, and a model Answer–Prove–Explain response.
- **LEQ and DBQ rubrics** use the College Board point structure. The DBQ is 7 points: thesis 1, contextualization 1, document evidence 2, outside evidence 1, sourcing 1, complexity 1.
- **Model essays** are complete responses with `modelNotes` explaining which rubric points each part earns.
- A DBQ can be `available` only when all seven documents are `verified` with an attribution and citation. **Checked.**

# Mock exams

A mock exam is a full-length, timed practice exam in the AP format. World History has three: `world-mock-01` (causation essays), `world-mock-02` (comparison essays), and `world-mock-03` (continuity and change essays). Each has 55 new multiple-choice questions, three new short-answer questions, a new DBQ, and three new essay prompts; no question or prompt is shared between exams.

## How it fits together

| Piece                   | File                                                    |
| ----------------------- | ------------------------------------------------------- |
| Exam structure          | Course folder's `exam-format.js`                        |
| One mock exam           | Course folder's `exams/<name>.js`                       |
| Template                | `handbook/templates/exam.js`                            |
| Writing prompt builders | `docs/content/world-history/writing-kit.js`             |
| Build checks            | `scripts/lib/exams.mjs`                                 |
| Rules, timer, scoring   | `docs/app/exam/engine.js` (no DOM, fully tested)        |
| Saving and history      | `docs/app/exam/store.js`                                |
| Pages and interactions  | `docs/app/exam/views.js`, `docs/app/exam/controller.js` |
| Styles                  | `docs/styles/exam.css`                                  |
| Tests                   | `tests/mock-exam.test.mjs`                              |

`exam-format.js` describes the AP World History: Modern exam: Section I Part A (55 multiple-choice questions, 55 minutes, 40%), Part B (three short-answer questions with a choice between Questions 3 and 4, 40 minutes, 20%), a 10-minute break, then the DBQ (60 minutes including a 15-minute suggested reading period, 25%) and the LEQ (choose one of three, 40 minutes, 15%). Check it against the College Board's exam description each year; every exam follows it automatically, and the build rejects any exam that no longer fits.

## Authoring an exam

Exams never contain their own questions. They select existing multiple-choice questions from topic banks and existing writing prompts from unit `writing.js` files, so a correction reaches every exam that uses an item.

1. Write any missing questions or prompts in their topic bank or unit `writing.js` first, following [AP practice standards](ap-practice.md). See "Writing items for a mock exam" below.
2. Copy `handbook/templates/exam.js` into `docs/content/world-history/exams/` and fill every slot.
3. Run `npm run build` and `npm run check`.

The build checks that:

- every section in the format is filled and nothing extra is added;
- the multiple-choice section has exactly the format's question count, from ready topics, with no repeats, and meets every unit Practice Test rule (source sets of two to four, sets together, no repeated stems, answer-length balance);
- each writing slot lists one ID per option, of the right type (SAQ, DBQ, or LEQ), from a ready unit, with no prompt used twice;
- SAQ stimulus rules hold: Question 1 has a secondary or Page One practice passage, Question 2 a primary source, Questions 3 and 4 no stimulus;
- a DBQ is marked `availability: "available"` (all seven documents verified) and uses at most three documents by one author, so sourcing has contrasting viewpoints to work with;
- options in a "choose one" slot are worth the same points;
- every writing prompt marked `examOnly: true` is used by at least one ready exam.

An exam with `status: "soon"` needs only its identity, title, and description. It is listed on the course page without a link.

## Writing items for a mock exam

Mock exams should be original. Write new items for each exam instead of reusing practice questions, so a student who has finished the unit Practice Tests still meets fresh material.

- **Multiple choice.** Add the question to the bank of the topic it tests, with an ID of the form `<topic>-m<exam>-<set><letter>`, for example `world-4-4-m3-06a`. These questions follow every rule for Practice Test questions: a text source stimulus shared by two to four questions, four choices, a `choiceExplanations` entry for each, a `nearMissIndex` and `distinguisher`, and a skill (plus a reasoning process for `connections`). Leave them out of every `quizzes` list, so they never appear in topic practice, custom practice, or a unit Practice Test. The build still checks the bank as a whole, so balance answer lengths across it: the correct choice should be the longest in 10% to 40% of the bank's questions. Tests that count practice questions ignore IDs with `-m<digit>-`.
- **Stimuli.** Use a verified primary excerpt from `excerpts.js` or write a new Page One practice passage (`sourceType: "original"`) that summarizes scholarship and never invents a quotation. Do not add a new quotation unless you can check it against the edition; the excerpt check needs the full text.
- **Repeats.** Keep every source, stimulus, and DBQ document different within one exam. Verified primary excerpts are limited, so a source may return in another exam with new questions.
- **Writing.** Build SAQs, essays, and DBQs with `saq`, `leq`, `dbq`, and `dbqDocument` from `writing-kit.js` in the unit's `writing.js`. The builders mark every prompt `examOnly: true`, so it has no `/writing` page and is not listed on its unit's Study Hub; students first see it inside the exam. DBQ documents reuse a verified excerpt unchanged.
- **DBQ scope.** Write the DBQ prompt for the documents you actually have. Page One's verified excerpts are mostly European and American, so a prompt framed for "the world" with seven Western documents invites unsupported generalizations; name the region instead, or wait until verified documents from other regions exist. Give every essay prompt a date range.
- **Unit weights.** Keep each exam's multiple-choice section within the CED's unit ranges: Units 1–2 at 16–20% (9–11 questions), Units 3–6 at 48–60% (27–33), and Units 7–9 at 24–30% (14–16). `tests/mock-exam.test.mjs` checks this.
- **Wrong answers.** Every distractor must be plausible to a student who half-knows the period. Avoid joke choices such as impossible conquests or anachronisms no one would pick.
- **Essay choice.** An exam's three essay prompts should test one reasoning process (comparison, causation, or continuity and change) across 1200–1750, 1750–1900, and 1900 to the present, as the AP exam does.

## What students get

- The course page lists mock exams under **Full mock exams** once at least one exam exists.
- **Timed mode** runs each part on the real exam clock. The clock keeps running if the tab is closed, as in a real exam, and a part is submitted at its deadline. Warnings are announced at five minutes and one minute.
- **Untimed mode** shows elapsed time and never expires.
- Parts run in order, and a submitted part cannot be reopened. Multiple-choice questions can be flagged and revisited from a question grid within the part.
- Results score multiple choice automatically, by AP skill, with every explanation. Students score their own writing against each prompt's rubric (one point per SAQ part, or the essay rubric rows), with model answers for comparison. The weighted estimate combines parts by exam weight and is labeled as a self-assessed practice estimate, not an AP score.

Attempts are saved in the browser per exam (record kind `mock-exam`). An attempt taken on an earlier version of an exam is not resumed. Settings → reset clears mock exam records along with other saved work. Backup export does not include mock exam attempts yet.

# Mock exams

A mock exam is a full-length, timed practice exam in the AP format. The infrastructure is in place; no World History mock exam has been authored yet, so none appears on the site.

## How it fits together

| Piece                  | File                                                    |
| ---------------------- | ------------------------------------------------------- |
| Exam structure         | Course folder's `exam-format.js`                        |
| One mock exam          | Course folder's `exams/<name>.js`                       |
| Template               | `handbook/templates/exam.js`                            |
| Build checks           | `scripts/lib/exams.mjs`                                 |
| Rules, timer, scoring  | `docs/app/exam/engine.js` (no DOM, fully tested)        |
| Saving and history     | `docs/app/exam/store.js`                                |
| Pages and interactions | `docs/app/exam/views.js`, `docs/app/exam/controller.js` |
| Styles                 | `docs/styles/exam.css`                                  |
| Tests                  | `tests/mock-exam.test.mjs`                              |

`exam-format.js` describes the AP World History: Modern exam: Section I Part A (55 multiple-choice questions, 55 minutes, 40%), Part B (three short-answer questions with a choice between Questions 3 and 4, 40 minutes, 20%), a 10-minute break, then the DBQ (60 minutes including a 15-minute suggested reading period, 25%) and the LEQ (choose one of three, 40 minutes, 15%). Check it against the College Board's exam description each year; every exam follows it automatically, and the build rejects any exam that no longer fits.

## Authoring an exam

Exams never contain their own questions. They select existing multiple-choice questions from topic banks and existing writing prompts from unit `writing.js` files, so a correction reaches every exam that uses an item.

1. Write any missing questions or prompts in their topic bank or unit `writing.js` first, following [AP practice standards](ap-practice.md).
2. Copy `handbook/templates/exam.js` into `docs/content/world-history/exams/` and fill every slot.
3. Run `npm run build` and `npm run check`.

The build checks that:

- every section in the format is filled and nothing extra is added;
- the multiple-choice section has exactly the format's question count, from ready topics, with no repeats, and meets every unit Practice Test rule (source sets of two to four, sets together, no repeated stems, answer-length balance);
- each writing slot lists one ID per option, of the right type (SAQ, DBQ, or LEQ), from a ready unit, with no prompt used twice;
- SAQ stimulus rules hold: Question 1 has a secondary or Page One practice passage, Question 2 a primary source, Questions 3 and 4 no stimulus;
- a DBQ is marked `availability: "available"` (all seven documents verified);
- options in a "choose one" slot are worth the same points.

An exam with `status: "soon"` needs only its identity, title, and description. It is listed on the course page without a link.

## What students get

- The course page lists mock exams under **Full mock exams** once at least one exam exists.
- **Timed mode** runs each part on the real exam clock. The clock keeps running if the tab is closed, as in a real exam, and a part is submitted at its deadline. Warnings are announced at five minutes and one minute.
- **Untimed mode** shows elapsed time and never expires.
- Parts run in order, and a submitted part cannot be reopened. Multiple-choice questions can be flagged and revisited from a question grid within the part.
- Results score multiple choice automatically, by AP skill, with every explanation. Students score their own writing against each prompt's rubric (one point per SAQ part, or the essay rubric rows), with model answers for comparison. The weighted estimate combines parts by exam weight and is labeled as a self-assessed practice estimate, not an AP score.

Attempts are saved in the browser per exam (record kind `mock-exam`). An attempt taken on an earlier version of an exam is not resumed. Settings → reset clears mock exam records along with other saved work. Backup export does not include mock exam attempts yet.

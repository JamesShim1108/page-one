# AP Precalculus

The course folder is `docs/content/ap-precalculus/`. Its course ID is `precalculus` (letters and digits only), and every unit, topic, and question ID starts with `precalculus-`, for example `precalculus-1`, `precalculus-1-7`, and `precalculus-1-7-q03`. The folder uses the same shared templates as World History, so a topic needs no new page, view, or stylesheet.

## What exists

| Area            | Status                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| Unit 1          | All 14 CED topics (1.1 to 1.14) are ready with a lesson, a 10-question bank, two quizzes, and glossary entries. |
| Unit 1 practice | One unit quiz with two questions chosen from every topic.                                                       |
| Units 2 to 4    | Titled placeholders (`status: "soon"`, no topics) with the CED exam weighting.                                  |
| Not built yet   | Graph figures, Terms sets, study guide, free-response (writing) prompts, mock exams.                            |

The CED sources are listed in `sources.js`: the course and exam description plus one record per topic (`ced-topic-1-N`). Every lesson cites the description and its own topic record. Lesson text is original Page One wording. The site does not claim any College Board affiliation.

## Writing math in plain text

Content is plain text, so write math with Unicode characters and no markup.

- Minus is `−` (U+2212), not a hyphen, in expressions, tables, and answers. Use `×` or `·` for multiplication, `÷` or a slash for division, `≤`, `≥`, `≠`, `∞`, `→`, `√`, and superscripts such as `x²`, `x³`, and `xⁿ`.
- Write limits as `lim x→3⁻ r(x) = −∞`, intervals as `(−∞, 3]`, and points as `(2, 4)`.
- Put a whole expression such as `(x² − 4)/(x − 2)` in a single choice rather than splitting it across lines.
- Table cells cannot be empty. Use a two-column layout (label, values) instead of a staircase table.
- Do not use em dashes in prose.

## Skills

`skills.js` holds eight practice skills that follow the three Mathematical Practices in the CED (codes 1.A to 3.C). Every question needs one of the IDs, and the IDs are permanent because history groups results by them. The ID `connections` is avoided on purpose, because the validator treats it as a history skill that needs a reasoning process.

## Question rules that apply here

The validator enforces the shared multiple-choice limits in [AP practice standards](ap-practice.md). For a ten-question math bank, the practical rules are:

- The correct choice should be strictly the longest in about two of the ten questions, and never in more than three or fewer than one. The average length of the correct choice should stay within about 1.1 times the average distractor.
- One distractor is a near miss, and its `nearMissIndex` needs a `distinguisher` that states what separates it from the key.
- Spread the correct answer across all four positions.
- Check every numeric key by running code before saving. Many early topics were authored with an embedded check for each question and for each number quoted in a lesson table.

## Adding a topic

1. Copy `lesson.js` and `questions.js` from `handbook/templates/` into a new `unit-0N/topics/<slug>/` folder and fill them in.
2. Give each topic exactly one `quick` and one `topic` quiz, with `customPractice: true` on the topic quiz questions that may appear in Custom practice.
3. Add `from: { topicId, vocabularyId }` glossary entries for the lesson vocabulary in `glossary/unit-0N.js`, and list other topics where the term applies in `topicIds`. Each entry's phrase has to appear in the lesson prose of every topic it is enabled on.
4. Add the topic to the unit's practice quiz selections.
5. Register the topic's `ced-topic-N-M` record in `sources.js`.
6. Run `npm run format`, `npm run build`, and `npm run check`.

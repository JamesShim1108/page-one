# AP Precalculus

The course folder is `docs/content/ap-precalculus/`. Its course ID is `precalculus` (letters and digits only), and every unit, topic, and question ID starts with `precalculus-`, for example `precalculus-1`, `precalculus-1-7`, and `precalculus-1-7-q03`. The folder uses the same shared templates as World History, so a topic needs no new page, view, or stylesheet.

## What exists

| Area             | Status                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Unit 1 lessons   | All 14 CED topics (1.1 to 1.14). Each lesson lists its CED learning objectives with codes and tags every section with one. |
| Unit 1 questions | 10 per topic: a 4-question quick check and a 6-question topic quiz, written in AP stem style.                              |
| Unit 1 practice  | Part 1 (Topics 1.1 to 1.6, 18 questions) and Part 2 (Topics 1.7 to 1.14, 24 questions), the split the CED uses for Unit 1. |
| Unit 1 FRQs      | Four 6-point free-response questions (`unit-01/writing.js`, `exerciseType: "frq"`), two for each part.                     |
| Units 2 to 4     | Titled placeholders (`status: "soon"`, no topics) with the CED exam weighting.                                             |
| Not built yet    | Graph figures, Terms sets, study guide, mock exams.                                                                        |

The CED sources are listed in `sources.js`: the course and exam description plus one record per topic (`ced-topic-1-N`). Learning objective statements and skill descriptions are quoted from the CED with their codes. Essential knowledge is explained in original Page One wording that keeps the CED's terms and notation. Questions are original. The site does not claim any College Board affiliation.

## Matching AP language

Students are scored on precise language, so lessons and questions follow the CED's vocabulary and the phrasing of its scoring guidelines.

- Use CED terms: input values and output values, rate of change, average rate of change over an interval, concave up and concave down, relative and absolute maximum, point of inflection, multiplicity, tangent to the x-axis, end behavior, vertical asymptote, hole, additive and multiplicative transformation, vertical dilation by a factor of |a|, horizontal translation by −h units, function model, piecewise-defined function, regression.
- Interpret an average rate of change with the interval, "on average", the direction, and units: "From t = 2 to t = 5 hours, on average, the amount of water increased at a rate of 45 gallons per hour."
- Justify a model choice with the differences: "Because the 2nd differences in the output values are a constant 4 over consecutive equal-length input-value intervals, a quadratic model is best."
- Give end behavior and asymptotes in limit notation, such as lim x→∞ p(x) = −∞ and lim x→2⁻ r(x) = ∞.
- For a decreasing function, name the rate of change directly ("decreasing, and the rate of change is increasing") instead of a shorthand that a reader could misread.
- Decimal answers have three places after the decimal point, computed without rounding intermediate values.
- MCQ stems use the exam's forms: "The function f is given by …", "Which of the following …?", "What are all values of x for which …?", and domains as "all real numbers x where x ≠ …".
- Each lesson section can end with a "Write it like the AP Exam" callout that models the sentence a scoring guideline rewards.

## Free-response questions

FRQs use the typed writing engine with `exerciseType: "frq"`. Each has six response fields (`a1`, `a2`, `b1`, `b2`, `c1`, `c2`), a rubric of six 1-point rows whose `field` names the part they score, a `modelResponse` with one paragraph per part, an `alternateModel`, and `commonErrors`. The validator requires the rubric to total 6 points. FRQ stimuli may be tables, paragraphs, lists, or callouts. Generate the numbers in code and assert them before writing the file.

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
4. Mark exactly three questions per topic for the unit practice part that covers it, with at most two from the topic quiz so Custom practice keeps at least four.
5. Register the topic's `ced-topic-N-M` record in `sources.js`.
6. Run `npm run format`, `npm run build`, and `npm run check`.

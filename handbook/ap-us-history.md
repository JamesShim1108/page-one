# AP U.S. History

The course folder is `docs/content/ap-us-history/` (course ID `apush`). The infrastructure is in place; no lessons, questions, terms, or writing prompts have been written yet, so the course is listed as coming soon. This page describes what the course needs that World History does not, and how to add content.

Everything here follows the AP U.S. History Course and Exam Description (CED) **effective fall 2026**, which describes the exam from **May 2027** onward. That exam changed the short-answer and long essay sections, so do not copy older APUSH practice formats.

## Files

| File                    | What it holds                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `course.js`             | Identity, catalog copy, `status: "soon"`, and `sourceReview: "ced_review"`.                                                                                                              |
| `ced.js`                | The CED framework: 9 units, 105 topics, titles, thematic focus, learning objectives (quoted), key concept codes, suggested skills, and topic kinds. The build checks content against it. |
| `skills.js`             | The six historical thinking skills with CED sub-skills (1.A–6.D) and the three reasoning processes with their sub-processes. Skill 6 is marked `mcq: false`.                             |
| `framework.js`          | The eight course themes, using the CED codes (NAT, WXT, GEO, MIG, PCE, WOR, ARC, SOC). They replace InSPECT as lenses for sections and writing parts.                                    |
| `exam-format.js`        | The May 2027 exam: sections, timing, weights, set sizes, stimulus media, unit weighting, and the period rule for each writing slot.                                                      |
| `writing-kit.js`        | Builders for SAQs, the DBQ, DBQ documents, and the LEQ, with CED rubric wording. `pairedInterpretationPrompts` writes the standard paired-historian SAQ parts.                           |
| `excerpts.js`           | Empty registry for passages, images, and data tables used as stimuli.                                                                                                                    |
| `assets.js`             | Empty manifest for cartoons, posters, photographs, and maps.                                                                                                                             |
| `sources.js`            | CED, CED clarifications, exam updates, and the AP Central exam page.                                                                                                                     |
| `unit-01/` … `unit-09/` | One `unit.js` per CED period, `status: "soon"`. Titles are `Period N` with the CED dates; the build checks them.                                                                         |

Shared code that changed for this course is optional for other courses: World History and AP Precalculus build exactly as before.

## The exam the practice must mirror

| Part                | Questions                         | Time                    | Weight | Rules the build enforces                                                                                                                |
| ------------------- | --------------------------------- | ----------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| I-A Multiple choice | 55                                | 55 min                  | 40%    | Sets of **3–4** questions; stimuli may be passages, images, or data; CED unit weighting; no Skill 6 questions.                          |
| I-B Short answer    | 3, **all required**               | 40 min                  | 20%    | Q1 secondary **text** source(s); Q2 primary **text** source; Q3 primary or secondary **non-text** source; each from a different period. |
| II DBQ              | 1                                 | 60 min (15 min reading) | 25%    | Seven documents; topic within **1754–1980** (Units 3–8); no author has more than three documents.                                       |
| II Long essay       | **1 required prompt** (no choice) | 40 min                  | 15%    | Covers about half of the course; the prompt lists the units it spans (at least three).                                                  |
| Whole exam          |                                   | 3 h 15 min              |        | At least one **paired-text** set, in multiple choice or an SAQ.                                                                         |

Unit weighting (multiple choice, rounded outward to whole questions out of 55): Units 1 and 9 at 4–6% (2–4 questions), Unit 2 at 6–8% (3–5), Units 3–8 at 10–17% (5–10 each).

Scoring: SAQs are 3 points each (one per part). The DBQ is 7 points (thesis 1, contextualization 1, document evidence 2, outside evidence 1, sourcing 1, complexity 1). The LEQ is 6 points (thesis 1, contextualization 1, evidence 2, analysis and reasoning 2). The rubric rows in `writing-kit.js` carry the CED decision rules.

## Practice types this course needs

### 1. Multiple-choice stimulus sets

Every multiple-choice question belongs to a set of three or four questions on one stimulus. A stimulus is a `source` block:

```js
// A passage (the default medium).
{ type: "source", id: "dickinson-letter-2", sourceType: "primary",
  attribution: "John Dickinson, Letters from a Farmer in Pennsylvania, 1767",
  text: "…", citation: "Edition, page", source: "KC-3.1.II.B", ced_review: "pending" }

// An image: cartoon, poster, photograph, painting, or map.
{ type: "source", id: "puck-1901-expansion", medium: "image", sourceType: "primary",
  attribution: "Puck, a satirical magazine, November 20, 1901",
  assetId: "apush-puck-1901", alt: "Short alt text.",
  description: "What the image shows, including any labels and captions.",
  citation: "Library of Congress, LC-DIG-ppmsca-25583", source: "KC-7.3.I.A", ced_review: "pending" }

// Quantitative data.
{ type: "source", id: "immigration-1880-1910", medium: "table", sourceType: "secondary",
  attribution: "…", caption: "…", columns: ["Decade", "Immigrants"], rows: [["1880s", "…"]],
  citation: "…", source: "KC-6.2.I.A", ced_review: "pending" }
```

- A **paired-text** set lists two passages in `stimulusBlocks` (for example two historians). Questions on it often ask what both authors would agree on, or how they differ (Skill 3.C).
- Visual sources need `description` so the information is available as text; it is shown under an "Image description" disclosure.
- Images go in the course's `assets.js` (or a topic's). Use public-domain or openly licensed copies, such as Library of Congress prints, and record creator, source URL, and license.
- Every question names a `skill`. Add the exact `subskill` (for example `"2.B"`) the way the CED answer key does; a `connections` question also names its `reasoning`. Argumentation (Skill 6) is rejected for multiple choice.
- Tag the CED alignment: `learningObjective: "3.C"` (unit and letter) and `keyConcepts: ["KC-3.1.II.A"]`. A question may target another unit's objective, as CED sample question 7 does; the build checks that the code exists.
- All World History quality rules still apply: one near-miss distractor with a `distinguisher`, explanations for every choice, and answer-length balance.

### 2. Short-answer questions

Use `saq()` from `writing-kit.js`. Each SAQ has parts (a), (b), and (c).

- **Question 1, secondary sources.** Usually two historians. `pairedInterpretationPrompts({ first, second, subject, period })` returns the CED wording for the three parts: describe one difference, then explain how one event from the period supports each historian.
- **Question 2, primary source.** One primary passage.
- **Question 3, non-text source.** An image, map, chart, or data table. No passages.
- Give each SAQ in an exam a different owning unit; the exam format checks this.

### 3. Document-based question

Use `dbq()` and `dbqDocument()`. Documents are passages or images (the CED sample DBQ includes two cartoons). A document built from an image excerpt reuses its asset, alt text, and description. Exam DBQs must fall in Units 3–8. Contrast viewpoints: no more than three documents by one author.

### 4. Long essay question

Use `leq()`. The May 2027 LEQ is one required, broad prompt:

```js
leq({
  id: "apush-4-leq-participation",
  unitNumber: 4,
  units: [3, 4, 5], // every unit the prompt covers
  dateRange: "1776–1876",
  headline: "Political participation",
  context:
    "Between 1776 and 1876, major political developments in the United States included …",
  task: "Explain how changes in political participation in the United States influenced society between 1776 and 1876.",
  focusNote:
    "Your response may focus on any change(s) in political participation during the period 1776 to 1876.",
  reasoning: "causation",
  // sourceIds, model responses, common errors …
});
```

The builder adds "You are not expected to address the entire time period in your response" and the CED's "In your response you should do the following" directions.

### 5. Contextualization and reasoning topics

Each unit opens with a **Contextualizing Period N** topic (`kind: "context"`, Skill 4) and ends with a reasoning topic (`kind: "reasoning"`: causation, comparison, or continuity and change, Skill 6). These topics are about skills, not new content. Good practice for them:

- Context topics: a short contextualization drill (`exerciseType: "skill"`) using the unit's overarching key concepts.
- Reasoning topics: an LEQ or thesis drill using the topic's reasoning process across the whole unit.

### 6. Themes

Lesson sections and SAQ parts can name `lenses` from `framework.js`. Questions and writing prompts can also carry `themes: ["WOR"]`. Each CED topic's thematic focus is in `ced.js`.

## What the build checks

- Every CED unit has a unit folder, with the CED title and period.
- A topic's `code` and `title` match its CED topic (`3.3`, "Taxation Without Representation").
- Learning objectives, key concepts, and themes on questions and writing prompts exist in `ced.js`.
- Practice Tests and mock exams use sets of 3–4 questions with text, image, or table stimuli.
- Mock exams follow every rule in the exam table above.
- Every source block records `ced_review` (`pending` until checked against the CED key concept it names, then `complete`).
- Image sources and image DBQ documents point to a manifest asset and have a description.

`tests/apush-infrastructure.test.mjs` covers these rules, including a full fixture exam and a fixture topic built through the real build.

## Sources for content

Write from the CED and College Board materials (AP Central, AP Classroom) first, then Khan Academy, The Princeton Review, Fiveable, and Albert. Other sites are for stimuli and practice material the course itself does not teach, such as Library of Congress images or public-domain documents. Primary quotations follow the same verification rule as World History: register the edition prefix in `scripts/lib/excerpt-sources.mjs` and run `node scripts/verify-excerpts.mjs path/to/source-texts`, which now checks both courses.

Do not imply College Board affiliation, and label every score as a practice estimate.

## Adding the first topic

1. Create `unit-0N/topics/<name>/lesson.js` and `questions.js` from `handbook/templates/`. Use `id: "apush-N-M"`, `code: "N.M"`, and the exact CED title from `ced.js`.
2. Add the topic's sources to `sources.js` and stimuli to `excerpts.js`.
3. Set the unit to `status: "ready"` with a description once it has a ready topic, and the course to `status: "ready"` when the first unit is ready.
4. Run `npm run format`, `npm run build`, and `npm run check`.

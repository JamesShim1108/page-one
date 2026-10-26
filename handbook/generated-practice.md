# Generated practice

Status: **typed-answer practice is built** and is described in [Typed-answer practice](free-response.md). Every AP Precalculus topic has ten templates that produce new numbers on each attempt, with keys proved at build time. It uses pre-generated variants (eight per template) instead of a runtime seed, so a saved attempt is a plain snapshot of the variant the student saw.

The rest of this note is the original proposal for generating **multiple-choice** questions with distractors built from named mistakes. That part is **not built**; the multiple-choice sets are still authored. Several ideas carried over: templates that prove their own answers by a second method, text rules checked by the build, and a quality gate. Where this note says "a question is described by `(templateId, seed)`", the built system instead stores the variant itself.

The written banks give every topic ten carefully checked questions. Students who want more run out quickly, and repeating the same ten questions trains recall of answers instead of skill. This note proposes a way for the site to make new questions on demand without losing what makes the authored ones good: a verified key, distractors that come from real mistakes, explanations for every choice, and AP wording.

## The idea in one sentence

Each generated question comes from a **template**, a small program that turns a random seed into one complete question and then proves its own answer key, so a question is fully described by `(templateId, seed)`.

## What a template is

A template covers one kind of task in one topic, such as "find the period of a sin(b(θ + c)) + d" (3.6) or "solve log_b(x + h) = k" (2.13).

```js
export const template = {
  id: "precalculus-3-6-period",
  topicId: "precalculus-3-6",
  sectionId: "general-form",
  skill: "identify-information",
  // 1. Draw parameters from "nice" values, with constraints.
  params(rng) {
    const b = rng.pick([2, 3, 4, 1 / 2, 1 / 3, Math.PI / 6, Math.PI / 4]);
    const a = rng.pick([2, 3, 5]) * rng.sign();
    return { a, b, c: rng.pick([0, 1, -2]), d: rng.int(-4, 6) };
  },
  // 2. Build the stem, the key, and the choices from named mistakes.
  build({ a, b, c, d }, fmt) {
    return {
      prompt: `What is the period of f(θ) = ${fmt.sinusoid(a, b, c, d)}?`,
      answer: (2 * Math.PI) / Math.abs(b),
      distractors: [
        { value: 2 * Math.PI * Math.abs(b), mistake: "multiplied 2π by b" },
        {
          value: Math.PI / Math.abs(b),
          mistake: "used the tangent period",
          nearMiss: true,
        },
        { value: Math.abs(b), mistake: "gave b itself" },
        { value: 1 / Math.abs(b), mistake: "gave the reciprocal of b" },
      ],
      explain: `The period is |1/b|·2π = ${fmt.pi((2 * Math.PI) / Math.abs(b))}.`,
    };
  },
  // 3. Check the key by a different route than the one that built it.
  verify(params, question) {
    return (
      isPeriod(f(params), question.answer) && !isPeriod(f(params), question.answer / 2)
    );
  },
};
```

The three parts matter for different reasons:

- **Parameters** are drawn from short lists of values that give clean answers, the way a human author picks numbers. Constraints reject bad draws (a zero coefficient, an answer that equals a distractor, an equation with no solution when one is wanted).
- **Distractors come from a catalog of named mistakes**, not from random nearby numbers. Each mistake carries the sentence that explains it, which becomes the choice explanation. This is what keeps generated feedback as useful as the authored `ce` lines. The catalog is per topic and grows from the mistakes the authored banks already name.
- **Verification uses a second method.** The key is computed one way in `build` and confirmed another way in `verify`: numerically with the calculator engine (`math/engine.js`, `math/numeric.js`), by sampling the function, or by substituting the answer back. A question that fails verification is thrown away and the next seed is tried.

## Making a question

1. Pick a template for the topic, weighted toward skills the student has missed (from History).
2. Draw a seed and run `params`, `build`, and `verify`.
3. Format with the site's plain-text math (−, ², √, π/6) and exact values from `numeric.exactForm`.
4. Shuffle the four choices with the same seed, then run the same rules the build applies to authored banks: four distinct choices, one near miss, the correct choice not always the longest, and every choice explained.
5. If any rule fails, try the next seed. A template that needs more than a few tries per question is a template bug and is reported by the audit below.

Because everything is seeded, a generated question can be saved in History, reopened from a review link, printed, or shared, and it will be identical every time. Nothing needs a server, so it works offline like the rest of the site.

## Graphs and tables

Templates can return stimulus blocks built from their parameters, using the same graph blocks as the lessons (functions, points, polar curves, `tickLabels: false` for no-scale questions). Tables are filled from the function the template chose, so the data and the key always agree. Data with noise for regression questions would use a seeded noise generator and check that the intended model still wins.

## Quality gate

Generated questions are only as good as their templates, so templates are tested harder than authored questions.

- **Template audit** (`npm run check`): generate 500 questions per template with fixed seeds, run `verify` and all bank rules on each, and fail the build on any error.
- **Snapshot review**: commit 20 rendered samples per template so a person can read them in a pull request, as they would read an authored bank.
- **Answer distribution**: the audit also checks that the correct position, the near-miss rate, and the length balance across the 500 samples match the targets in [AP practice standards](ap-practice.md).
- **Language**: stems come from the AP phrasings already listed in [AP Precalculus](precalculus.md), so generated questions read like the authored ones.

## Where students would see it

- **More like this** on a reviewed question: five generated questions from the same template.
- **Custom practice**: an option to add generated questions after the authored ones run out, labeled "Generated" so students know the difference.
- **Skill drills**: short sets that mix templates for one CED skill, such as 1.A solving, across topics.

Unit practice and FRQs stay authored. They are the closest thing to an exam, and their value comes from careful selection.

## What to build first

1. **Engine**: seeded random numbers, the template runner, formatting helpers, and the audit. No user interface yet.
2. **Ten templates** for high-volume, numeric skills: average rate of change (1.2), zeros and multiplicity (1.5), asymptotes and holes (1.9, 1.10), exponential models from two points (2.5), solving exponential and logarithmic equations (2.13), exact trig values (3.3), sinusoidal features (3.6), solving trig equations (3.10), polar to rectangular (3.13).
3. **More like this** in review, using those templates.
4. Graph-stimulus templates and skill-weighted selection.
5. FRQ parts later. A generated FRQ needs a generated rubric and model response, which is harder to check automatically, so it should wait until the multiple-choice templates have proven themselves.

## Why not a language model at runtime

A model could write endless questions, but the site could not prove the keys, the questions would differ from visit to visit, it would need a network connection and an account, and it could drift from AP wording. A model can still help authors draft new templates and mistake catalogs offline, as long as every template passes the audit before it ships.

## Open questions

- How many generated questions a student should see before the site suggests moving on.
- Whether generated results count toward topic mastery in History, or are tracked separately.
- How to retire a template that students report as confusing without breaking saved `(templateId, seed)` links. A likely answer: templates are versioned like questions, and old versions stay available for replay.

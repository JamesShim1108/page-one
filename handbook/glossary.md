# Reading definitions

Reading pages use a shared glossary registry to turn selected phrases into small explanations. All courses use the same matching and popup code. This feature is separate from the class Terms sets and never changes their definitions.

## File map

| Purpose                             | Location                              |
| ----------------------------------- | ------------------------------------- |
| Course concept groups               | `docs/content/<course>/glossary/*.js` |
| Editable starting point             | `handbook/templates/glossary.js`      |
| Reference checks and page selection | `scripts/lib/glossary.mjs`            |
| Safe inline phrase matching         | `docs/app/concepts/text.js`           |
| Hover, click, focus, and dismissal  | `docs/app/concepts/controller.js`     |
| Screen-edge positioning             | `docs/app/concepts/position.js`       |
| Appearance                          | `docs/styles/concepts.css`            |

Use one file per manageable subject group, such as `east-asia.js` or `chemistry-basics.js`. The build discovers every `.js` file in each course's glossary folder. Filenames can change; concept IDs should stay stable.

## Reuse a definition already in a lesson

```js
export const glossary = {
  schemaVersion: 1,
  courseId: "world",
  entries: [
    {
      id: "world-bureaucracy",
      from: {
        topicId: "world-1-1",
        vocabularyId: "bureaucracy",
      },
      aliases: ["bureaucracy"],
    },
  ],
};
```

`from` points to a term in that lesson's `vocabulary` array. Its term and definition are reused verbatim. Edit that source to update every popup that references it. The canonical term is matched automatically; aliases add other exact phrases, such as plural forms. Do not repeat the canonical term as an alias.

Referenced concepts are enabled automatically on their source lesson. Add `topicIds: ["world-1-7"]` to reuse one on additional topics. A lesson or study guide can instead specify `glossaryIds: ["world-bureaucracy"]` to select its complete set of concepts. An empty array disables inline explanations for that page.

Guides default to their unit's concepts. If two entries match the same phrase, the build asks you to select the intended meaning with `glossaryIds`. Do not merge two definitions that mean different things in different contexts.

## Add a new definition without a source lesson

An entry may provide `term`, `definition`, `sourceLabel`, and `sourceIds` instead of `from`. The source IDs must exist in the course's `sources.js`. Use `topicIds` or page-level `glossaryIds` to choose where it applies. Authored entries should also record `sourceLocators` and a concise `verificationNote`; locators are checked against the same source IDs and the note records the editorial verification decision. The template shows this form. Do not combine referenced and authored definitions in the same entry.

## Coverage contract

New ready lessons and guides must declare `definitionCoverage` in the authored page record. `status: "required"` lists selected glossary `conceptIds` that actually match eligible explanatory prose; `status: "not-needed"` requires a reason. The build rejects missing or unmatched coverage for new pages. A small legacy exemption exists only for already-published World History Unit 1 pages created before this contract. The contract is course-agnostic and does not create definitions automatically.

## Behavior and delivery

- Complete words and listed aliases match regardless of capitalization. Longer phrases take priority. There is no automatic stemming or guessed meaning.
- Each concept is linked once per paragraph or table cell. Reading text and punctuation stay intact.
- Hover briefly to preview. Click or tap to keep the popup open. Keyboard users can focus a word and press Enter or Space. Escape, the close button, or clicking outside dismisses it.
- Popups stay open while the pointer moves onto them, fit narrow screens, and disappear when navigating away.
- Only selected definitions are included in that page's generated JSON. The browser does not load other lessons or the entire course glossary.
- Lessons and study guides opt into the renderer. Quizzes, flashcards, writing responses, headings, and source links are not automatically annotated.
- The same registry and coverage contract applies to future courses, including Algebra 2 when real lessons are later authorized. Keep equation markup and interactive assessment content outside plain-text annotation.

Run `npm run build`, `npm run format`, and `npm run check` after editing glossary data. Validation catches unknown references, duplicate IDs, repeated phrases, and ambiguous meanings. Tests check exact source reuse, text escaping, word boundaries, reading coverage, and popup placement.

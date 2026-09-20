import {
  requireId,
  requireText,
  requireValue,
  validateSourceLocators,
} from "./validate.mjs";

// Resolve references at build time. A reader never downloads another lesson
// just to explain one word, and authored definitions still have one owner.
export function resolveGlossary(groups, { courseId, topics, sources }) {
  const concepts = new Map();
  for (const { glossary, file } of groups) {
    requireValue(glossary.schemaVersion === 1, file, "unsupported glossary version");
    requireValue(glossary.courseId === courseId, file, "wrong glossary courseId");
    requireValue(Array.isArray(glossary.entries), file, "glossary needs entries");
    for (const entry of glossary.entries) {
      const at = `${file}: ${entry.id}`;
      requireId(entry.id, at);
      requireValue(
        entry.id.startsWith(`${courseId}-`),
        at,
        "concept ID needs its course prefix",
      );
      requireValue(!concepts.has(entry.id), at, "duplicate concept ID");
      let term,
        definition,
        sourceLabel,
        sourceIds = [],
        sourceLocators = [],
        verificationNote = "";
      let topicIds = entry.topicIds || [];
      requireValue(Array.isArray(topicIds), at, "topicIds must be an array");
      if (entry.from) {
        requireValue(
          !entry.term && !entry.definition,
          at,
          "use a definition reference OR authored text, not both",
        );
        const lesson = topics.get(entry.from.topicId)?.lesson;
        const vocabulary = lesson?.vocabulary.find(
          (item) => item.id === entry.from.vocabularyId,
        );
        requireValue(Boolean(vocabulary), at, "definition reference does not exist");
        ({ term, definition } = vocabulary);
        sourceLabel = `Topic ${lesson.code} glossary`;
        topicIds = [...new Set([lesson.id, ...topicIds])];
      } else {
        ({ term, definition, sourceLabel, sourceIds, sourceLocators, verificationNote } =
          entry);
        requireText(sourceLabel, at);
        requireValue(
          Array.isArray(entry.sourceIds) && entry.sourceIds.length > 0,
          at,
          "authored definitions need sourceIds",
        );
        for (const id of entry.sourceIds)
          requireValue(sources.has(id), at, `unknown source ${id}`);
        if (entry.sourceLocators) {
          validateSourceLocators(entry.sourceLocators, sources, at);
          sourceLocators = entry.sourceLocators;
        }
        requireText(verificationNote, at);
      }
      requireText(term, at);
      requireText(definition, at);
      for (const id of topicIds) requireValue(topics.has(id), at, `unknown topic ${id}`);
      const aliases = entry.aliases || [];
      requireValue(Array.isArray(aliases), at, "aliases must be an array");
      aliases.forEach((alias) => requireText(alias, at));
      const phrases = [term, ...aliases].map((phrase) => phrase.toLocaleLowerCase("en"));
      requireValue(
        new Set(phrases).size === phrases.length,
        at,
        "duplicate matching phrase",
      );
      const concept = {
        id: entry.id,
        term,
        definition,
        aliases,
        sourceLabel,
        topicIds,
      };
      if (!entry.from)
        Object.assign(concept, { sourceIds, sourceLocators, verificationNote });
      concepts.set(entry.id, concept);
    }
  }
  return concepts;
}

export function selectGlossary(concepts, { topicIds = [], ids }, location) {
  if (ids !== undefined)
    requireValue(
      Array.isArray(ids) && new Set(ids).size === ids.length,
      location,
      "glossaryIds must be unique IDs",
    );
  const selected =
    ids === undefined
      ? [...concepts.values()].filter((entry) =>
          entry.topicIds.some((id) => topicIds.includes(id)),
        )
      : ids.map((id) => {
          requireValue(concepts.has(id), location, `unknown glossary concept ${id}`);
          return concepts.get(id);
        });
  const phrases = new Map();
  for (const entry of selected) {
    for (const phrase of [entry.term, ...entry.aliases]) {
      const key = phrase.toLocaleLowerCase("en");
      requireValue(
        !phrases.has(key),
        location,
        `ambiguous phrase "${phrase}"; choose one meaning with glossaryIds`,
      );
      phrases.set(key, entry.id);
    }
  }
  return selected.map(({ topicIds, ...entry }) => entry);
}

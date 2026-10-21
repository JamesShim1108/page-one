// Course framework contracts. A course can record its Course and Exam
// Description in ced.js: units, topics, learning objectives, key concept
// codes, themes, and suggested skills. When it does, the build keeps unit
// folders, topic lessons, and question and writing tags aligned with it, so
// content cannot drift from the official framework.
import { requireId, requireText, requireValue } from "./validate.mjs";

const TOPIC_KINDS = new Set(["context", "content", "reasoning"]);
const LETTER = /^[A-Z]$/;
// Codes as the CED prints them: KC-3.1, KC-3.1.II, KC-3.1.II.A, KC-3.2.II.C.i.
const KEY_CONCEPT = /^KC-(\d)\.\d(?:\.[IVX]+)?(?:\.[A-Z])?(?:\.[ivx]+)?$/;

/**
 * Validates ced.js and returns lookup maps:
 * units (number -> { unit, topics: Map code -> topic }), learningObjectives
 * (Set of "3.C"), and keyConcepts (Set of codes).
 */
export function resolveCed(ced, { sources, framework, skills }, location) {
  requireValue(ced.schemaVersion === 1, location, "unsupported ced schemaVersion");
  requireId(ced.id, location);
  requireText(ced.title, location);
  requireText(ced.effective, location);
  requireValue(sources.has(ced.sourceId), location, `unknown CED source ${ced.sourceId}`);
  requireValue(
    Array.isArray(ced.units) && ced.units.length > 0,
    location,
    "ced needs units",
  );
  const themes = new Set((framework?.themes || []).map((theme) => theme.id));
  const units = new Map();
  const learningObjectives = new Set();
  const keyConcepts = new Set();
  for (const unit of ced.units) {
    const at = `${location}: Unit ${unit.number}`;
    requireValue(
      Number.isInteger(unit.number) && unit.number > 0 && !units.has(unit.number),
      at,
      "unit numbers must be unique positive integers",
    );
    requireText(unit.title, at);
    requireText(unit.period, at);
    requireValue(
      Number.isFinite(unit.examWeight?.min) &&
        Number.isFinite(unit.examWeight?.max) &&
        unit.examWeight.min <= unit.examWeight.max,
      at,
      "examWeight needs min <= max",
    );
    const objectives = Object.entries(unit.learningObjectives || {});
    requireValue(objectives.length > 0, at, "unit needs learningObjectives");
    for (const [letter, text] of objectives) {
      requireValue(
        LETTER.test(letter),
        at,
        `learning objective ${letter} must be a letter`,
      );
      requireText(text, `${at} Learning Objective ${letter}`);
      learningObjectives.add(`${unit.number}.${letter}`);
    }
    const topics = new Map();
    const usedObjectives = new Set();
    requireValue(
      Array.isArray(unit.topics) && unit.topics.length > 0,
      at,
      "unit needs topics",
    );
    unit.topics.forEach((topic, index) => {
      const code = `${unit.number}.${index + 1}`;
      const topicAt = `${at}, Topic ${topic.code}`;
      // Topics are listed in CED order, numbered from 1 without gaps.
      requireValue(topic.code === code, topicAt, `expected topic ${code} here`);
      requireText(topic.title, topicAt);
      requireValue(TOPIC_KINDS.has(topic.kind), topicAt, "unknown topic kind");
      if (topic.kind === "reasoning")
        requireValue(
          skills?.reasoning.has(topic.reasoning),
          topicAt,
          "a reasoning topic names its reasoning process",
        );
      if (skills?.subskillCodes?.size)
        requireValue(
          skills.subskillCodes.has(topic.suggestedSkill),
          topicAt,
          `unknown suggested skill ${topic.suggestedSkill}`,
        );
      requireValue(Array.isArray(topic.themes), topicAt, "themes must be an array");
      for (const theme of topic.themes)
        requireValue(themes.has(theme), topicAt, `unknown theme ${theme}`);
      requireValue(
        topic.kind === "context" || topic.kind === "reasoning" || topic.themes.length > 0,
        topicAt,
        "a content topic has a thematic focus",
      );
      requireValue(
        Array.isArray(topic.learningObjectives) && topic.learningObjectives.length > 0,
        topicAt,
        "topic needs learning objectives",
      );
      for (const letter of topic.learningObjectives) {
        requireValue(
          Boolean(unit.learningObjectives[letter]),
          topicAt,
          `unknown learning objective ${letter}`,
        );
        usedObjectives.add(letter);
      }
      requireValue(
        Array.isArray(topic.keyConcepts) && topic.keyConcepts.length > 0,
        topicAt,
        "topic needs key concepts",
      );
      for (const concept of topic.keyConcepts) {
        const match = KEY_CONCEPT.exec(concept);
        requireValue(
          Boolean(match) && Number(match[1]) === unit.number,
          topicAt,
          `key concept ${concept} is not a Unit ${unit.number} code`,
        );
        keyConcepts.add(concept);
      }
      topics.set(topic.code, topic);
    });
    for (const [letter] of objectives)
      requireValue(
        usedObjectives.has(letter),
        at,
        `Learning Objective ${letter} is not assigned to a topic`,
      );
    units.set(unit.number, { unit, topics });
  }
  return { ced, units, learningObjectives, keyConcepts, themes };
}

/** A unit folder must be a CED unit with the CED's title and period. */
export function checkCedUnit(unit, index, location) {
  const entry = index.units.get(unit.number);
  requireValue(Boolean(entry), location, `Unit ${unit.number} is not in the CED`);
  requireValue(
    unit.title === entry.unit.title && unit.period === entry.unit.period,
    location,
    `Unit ${unit.number} must be titled "${entry.unit.title}" (${entry.unit.period}) as in the CED`,
  );
}

/** Every CED unit has a unit folder, so the course page shows the full course. */
export function checkCedCoverage(unitNumbers, index, location) {
  for (const number of index.units.keys())
    requireValue(
      unitNumbers.has(number),
      location,
      `CED Unit ${number} has no unit folder`,
    );
}

function checkTags(record, index, location) {
  const id = record.id;
  if (record.learningObjective !== undefined)
    requireValue(
      index.learningObjectives.has(record.learningObjective),
      location,
      `${id} learningObjective ${record.learningObjective} is not in the CED (use "unit.letter", like "3.C")`,
    );
  if (record.learningObjectives !== undefined) {
    requireValue(
      Array.isArray(record.learningObjectives) && record.learningObjectives.length > 0,
      location,
      `${id} learningObjectives must be a nonempty array`,
    );
    for (const code of record.learningObjectives)
      requireValue(
        index.learningObjectives.has(code),
        location,
        `${id} learning objective ${code} is not in the CED`,
      );
  }
  if (record.keyConcepts !== undefined) {
    requireValue(
      Array.isArray(record.keyConcepts) && record.keyConcepts.length > 0,
      location,
      `${id} keyConcepts must be a nonempty array`,
    );
    for (const code of record.keyConcepts)
      requireValue(
        index.keyConcepts.has(code),
        location,
        `${id} key concept ${code} is not in the CED`,
      );
  }
  if (record.themes !== undefined) {
    requireValue(Array.isArray(record.themes), location, `${id} themes must be an array`);
    for (const theme of record.themes)
      requireValue(index.themes.has(theme), location, `${id} has unknown theme ${theme}`);
  }
}

/**
 * A topic lesson's code and title match its CED topic, and every question's
 * learning objective, key concepts, and themes exist in the CED.
 */
export function checkCedTopic(lesson, bank, unit, index, location) {
  const entry = index.units.get(unit.number);
  const topic = entry?.topics.get(lesson.code);
  requireValue(
    Boolean(topic),
    location,
    `Topic ${lesson.code} is not a CED topic in Unit ${unit.number}`,
  );
  requireValue(
    lesson.title === topic.title,
    location,
    `Topic ${lesson.code} must be titled "${topic.title}" as in the CED`,
  );
  for (const question of bank.questions) checkTags(question, index, location);
}

/** Writing prompts can tag learning objectives, key concepts, and themes. */
export function checkCedWriting(quiz, index, location) {
  checkTags(quiz, index, location);
}

// Mock exam contracts. A course's exam-format.js describes the exam's sections;
// each file in the course's exams/ folder fills those sections with questions
// and writing prompts that already exist in topic banks and unit writing files.
// Mock exams never contain their own questions, so a correction to a question
// or prompt reaches every exam that uses it.
import {
  requireId,
  requireText,
  requireValue,
  uniqueById,
  validatePracticeTest,
} from "./validate.mjs";

const SECTION_KINDS = new Set(["mcq", "saq", "dbq", "leq"]);
const STIMULUS_RULES = new Set(["primary", "secondary", "none", "any"]);
const EXAM_STATUSES = new Set(["ready", "soon"]);

const positiveInteger = (value) => Number.isInteger(value) && value > 0;

export function validateExamFormat(format, sources, location) {
  requireValue(format.schemaVersion === 1, location, "unsupported exam format version");
  requireId(format.id, location);
  requireText(format.title, location);
  requireText(format.note, location);
  for (const id of format.sourceIds || [])
    requireValue(sources.has(id), location, `unknown exam format source ${id}`);
  requireValue(
    Array.isArray(format.sections) && format.sections.length > 0,
    location,
    "exam format needs sections",
  );
  uniqueById(format.sections, `${location}.sections`);
  let weight = 0;
  for (const section of format.sections) {
    const at = `${location}: section ${section.id}`;
    requireValue(SECTION_KINDS.has(section.kind), at, "unknown section kind");
    for (const field of ["part", "title", "instructions"])
      requireText(section[field], at);
    requireValue(
      positiveInteger(section.minutes),
      at,
      "minutes must be a positive integer",
    );
    requireValue(
      Number.isFinite(section.weight) && section.weight > 0,
      at,
      "weight must be positive",
    );
    weight += section.weight;
    if (section.readingMinutes !== undefined)
      requireValue(
        positiveInteger(section.readingMinutes) &&
          section.readingMinutes < section.minutes,
        at,
        "readingMinutes must be shorter than the section",
      );
    if (section.breakAfterMinutes !== undefined)
      requireValue(
        positiveInteger(section.breakAfterMinutes),
        at,
        "breakAfterMinutes must be a positive integer",
      );
    if (section.kind === "mcq") {
      requireValue(
        positiveInteger(section.questionCount),
        at,
        "a multiple-choice section needs a questionCount",
      );
      requireValue(!section.prompts, at, "a multiple-choice section has no prompts");
      continue;
    }
    requireValue(
      Array.isArray(section.prompts) && section.prompts.length > 0,
      at,
      "a writing section needs prompts",
    );
    uniqueById(section.prompts, `${at}.prompts`);
    for (const prompt of section.prompts) {
      requireText(prompt.label, at);
      requireValue(positiveInteger(prompt.options), at, `${prompt.id} needs options`);
      const choose = prompt.choose ?? prompt.options;
      requireValue(
        positiveInteger(choose) && choose <= prompt.options,
        at,
        `${prompt.id} choose must be between 1 and options`,
      );
      if (prompt.stimulus !== undefined)
        requireValue(
          section.kind === "saq" && STIMULUS_RULES.has(prompt.stimulus),
          at,
          `${prompt.id} has an invalid stimulus rule`,
        );
    }
  }
  requireValue(Math.abs(weight - 100) < 1e-9, location, "section weights must total 100");
  return format;
}

// SAQs earn one point per part; essays earn their rubric points.
export function writingMaxPoints(quiz) {
  if ((quiz.exerciseType || "saq") === "saq") return quiz.parts?.length || 0;
  return (quiz.rubric || []).reduce((sum, row) => sum + (row.points || 0), 0);
}

function stimulusTypes(quiz) {
  return new Set((quiz.stimulusBlocks || []).map((block) => block.sourceType));
}

function checkStimulus(quiz, rule, at) {
  if (!rule || rule === "any") return;
  const types = stimulusTypes(quiz);
  if (rule === "none")
    requireValue(types.size === 0, at, `${quiz.id} must not have a stimulus`);
  else if (rule === "primary")
    requireValue(types.has("primary"), at, `${quiz.id} needs a primary-source stimulus`);
  else
    requireValue(
      types.has("secondary") || types.has("original"),
      at,
      `${quiz.id} needs a secondary-source stimulus`,
    );
}

/**
 * Validates one exam file and resolves its references.
 * topics: Map of topic ID to { lesson, bank, unit } records.
 * writing: Map of writing ID to { quiz, unit } records.
 * Returns { summary, payload }; payload is null for an exam marked "soon".
 */
export function resolveExam(
  exam,
  { course, format, topics, writing, labelQuestion = (question) => question },
  location,
) {
  requireValue(exam.schemaVersion === 1, location, "unsupported exam version");
  requireId(exam.id, location);
  requireValue(
    exam.id.startsWith(`${course.id}-`),
    location,
    `exam ID must start with ${course.id}-`,
  );
  requireValue(exam.courseId === course.id, location, "wrong exam courseId");
  requireValue(EXAM_STATUSES.has(exam.status), location, "status must be ready or soon");
  requireText(exam.title, location);
  requireText(exam.description, location);
  const minutes = format.sections.reduce((sum, section) => sum + section.minutes, 0);
  const summary = {
    id: exam.id,
    courseId: course.id,
    title: exam.title,
    description: exam.description,
    status: exam.status,
    formatId: format.id,
    minutes,
    sectionCount: format.sections.length,
  };
  if (exam.status === "soon") return { summary, payload: null };

  requireValue(
    exam.sections && typeof exam.sections === "object",
    location,
    "a ready exam needs sections",
  );
  const known = new Set(format.sections.map((section) => section.id));
  for (const id of Object.keys(exam.sections))
    requireValue(known.has(id), location, `section ${id} is not in the exam format`);

  const usedWriting = new Set();
  const sections = format.sections.map((section) => {
    const at = `${location}: section ${section.id}`;
    const filled = exam.sections[section.id];
    requireValue(Boolean(filled), at, "fill every section of the exam format");
    const base = {
      id: section.id,
      kind: section.kind,
      part: section.part,
      title: section.title,
      minutes: section.minutes,
      weight: section.weight,
      instructions: section.instructions,
      ...(section.readingMinutes ? { readingMinutes: section.readingMinutes } : {}),
      ...(section.breakAfterMinutes
        ? { breakAfterMinutes: section.breakAfterMinutes }
        : {}),
    };
    if (section.kind === "mcq") {
      requireValue(
        Array.isArray(filled.selections) && filled.selections.length > 0,
        at,
        "a multiple-choice section needs selections",
      );
      const questions = [];
      for (const selection of filled.selections) {
        const topic = topics.get(selection.topicId);
        requireValue(
          topic?.lesson.status === "ready" && topic.unit.status === "ready",
          at,
          `unavailable topic ${selection.topicId}`,
        );
        requireValue(
          Array.isArray(selection.questionIds) && selection.questionIds.length > 0,
          at,
          `selection for ${selection.topicId} needs questionIds`,
        );
        const lookup = new Map(
          topic.bank.questions.map((question) => [question.id, question]),
        );
        for (const id of selection.questionIds) {
          requireValue(lookup.has(id), at, `unknown question ${id}`);
          questions.push(lookup.get(id));
        }
      }
      requireValue(
        new Set(questions.map((question) => question.id)).size === questions.length,
        at,
        "a question appears twice",
      );
      requireValue(
        questions.length === section.questionCount,
        at,
        `needs exactly ${section.questionCount} questions (has ${questions.length})`,
      );
      // Mock exam sets follow the same AP rules as unit Practice Tests.
      validatePracticeTest({ practiceTest: true }, questions, at);
      return {
        ...base,
        questionCount: questions.length,
        maxPoints: questions.length,
        questions: questions.map(labelQuestion),
      };
    }
    const prompts = section.prompts.map((prompt) => {
      const ids = filled[prompt.id];
      const promptAt = `${at} ${prompt.id}`;
      requireValue(
        Array.isArray(ids) && ids.length === prompt.options,
        promptAt,
        `needs ${prompt.options} writing ID${prompt.options === 1 ? "" : "s"}`,
      );
      const options = ids.map((id) => {
        const record = writing.get(id);
        requireValue(Boolean(record), promptAt, `unknown writing prompt ${id}`);
        requireValue(!usedWriting.has(id), promptAt, `${id} is used twice`);
        usedWriting.add(id);
        const { quiz, unit } = record;
        requireValue(
          unit.status === "ready",
          promptAt,
          `${id} belongs to a unit that is not ready`,
        );
        requireValue(
          (quiz.exerciseType || "saq") === section.kind,
          promptAt,
          `${id} is not a ${section.kind.toUpperCase()}`,
        );
        if (section.kind === "dbq")
          requireValue(
            quiz.availability === "available",
            promptAt,
            `${id} is not an available DBQ`,
          );
        checkStimulus(quiz, prompt.stimulus, promptAt);
        const maxPoints = writingMaxPoints(quiz);
        requireValue(maxPoints > 0, promptAt, `${id} has no scorable points`);
        return { ...quiz, maxPoints };
      });
      const choose = prompt.choose ?? prompt.options;
      return {
        id: prompt.id,
        label: prompt.label,
        choose,
        ...(prompt.stimulus ? { stimulus: prompt.stimulus } : {}),
        // Every option in a prompt must be worth the same, or choosing would change the scale.
        maxPoints: options[0].maxPoints * choose,
        options,
      };
    });
    for (const prompt of prompts)
      requireValue(
        prompt.options.every(
          (option) => option.maxPoints === prompt.options[0].maxPoints,
        ),
        `${at} ${prompt.id}`,
        "options in one prompt must be worth the same points",
      );
    return {
      ...base,
      maxPoints: prompts.reduce((sum, prompt) => sum + prompt.maxPoints, 0),
      prompts,
    };
  });
  const questionCount = sections
    .filter((section) => section.kind === "mcq")
    .reduce((sum, section) => sum + section.questions.length, 0);
  return {
    summary: { ...summary, questionCount },
    payload: {
      schemaVersion: 1,
      exam: {
        id: exam.id,
        courseId: course.id,
        title: exam.title,
        description: exam.description,
      },
      format: { id: format.id, title: format.title, note: format.note, minutes },
      sections,
    },
  };
}

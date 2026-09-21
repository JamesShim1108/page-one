// Print selections are frozen before either document view is rendered. The
// student and key renderers consume separate projections of the same snapshot.

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function choiceText(choice) {
  return choice && typeof choice === "object"
    ? choice.text || choice.label || ""
    : String(choice ?? "");
}

function safeChoice(choice, index) {
  if (choice && typeof choice === "object") {
    return {
      id: choice.id || String(index),
      text: choiceText(choice),
    };
  }
  return { id: String(index), text: choiceText(choice) };
}

function questionMap(questions = []) {
  return new Map(
    (Array.isArray(questions) ? questions : [])
      .filter((question) => question?.id)
      .map((question) => [String(question.id), question]),
  );
}

function uniqueIds(ids = []) {
  return [...new Set((Array.isArray(ids) ? ids : []).map(String))];
}

export function studentQuestion(question) {
  return {
    id: String(question.id),
    topicId: question.topicId || "",
    prompt: question.prompt || "",
    stimulus: question.stimulus || question.context || question.passage || "",
    choices: (question.choices || []).map(safeChoice),
    stimulusBlocks: Array.isArray(question.stimulusBlocks)
      ? question.stimulusBlocks.map((block) => ({
          type: block.type || "paragraph",
          title: block.title || "",
          text: block.text || "",
          items: Array.isArray(block.items) ? [...block.items] : [],
          ordered: block.ordered === true,
          caption: block.caption || "",
          columns: Array.isArray(block.columns) ? [...block.columns] : [],
          rows: Array.isArray(block.rows) ? clone(block.rows) : [],
          alt: block.alt || "",
        }))
      : [],
    parts: Array.isArray(question.parts)
      ? question.parts.map((part) => ({
          id: part.id || "",
          prompt: part.prompt || "",
        }))
      : [],
  };
}

export function keyQuestion(question) {
  const safe = studentQuestion(question);
  return {
    ...safe,
    correctAnswer: Number.isInteger(question.correctAnswer)
      ? question.correctAnswer
      : null,
    correctChoiceId: question.correctChoiceId || "",
    explanation: question.explanation || "",
  };
}

export function freezePrintSelection({
  questions = [],
  questionIds = [],
  revision = "",
  title = "Practice questions",
  source = "existing activity",
} = {}) {
  const byId = questionMap(questions);
  const ids = uniqueIds(questionIds.length ? questionIds : [...byId.keys()]);
  const frozen = ids.filter((id) => byId.has(id)).map((id) => clone(byId.get(id)));
  return Object.freeze({
    schemaVersion: 1,
    revision: String(revision || ""),
    title: String(title || "Practice questions"),
    source: String(source || "existing activity"),
    questionIds: frozen.map((question) => String(question.id)),
    questions: frozen,
    studentQuestions: frozen.map(studentQuestion),
    answerKey: frozen.map(keyQuestion),
  });
}

export function quizQuestionIds(quiz = {}) {
  if (Array.isArray(quiz.questionIds)) return uniqueIds(quiz.questionIds);
  return uniqueIds(
    (quiz.selections || []).flatMap((selection) => selection.questionIds || []),
  );
}

export function freezeQuizSelection({ quiz, bank, revision = "" } = {}) {
  return freezePrintSelection({
    questions: bank?.questions || [],
    questionIds: quizQuestionIds(quiz),
    revision,
    title: quiz?.title || "Practice questions",
    source: quiz?.id || "existing activity",
  });
}

export function freezeTopicSelection({ topics = [], revision = "" } = {}) {
  const questions = [];
  const ids = [];
  for (const topic of topics) {
    const quiz = (topic.bank?.quizzes || []).find((item) => item.quizType === "topic");
    const topicIds = quizQuestionIds(quiz);
    const byId = questionMap(topic.bank?.questions || []);
    for (const id of topicIds) {
      if (byId.has(id)) {
        ids.push(id);
        questions.push(byId.get(id));
      }
    }
  }
  return freezePrintSelection({
    questions,
    questionIds: ids,
    revision,
    title: "Selected topic practice",
    source: "selected topic activities",
  });
}

export function responseSpaceForWriting(quiz = {}) {
  const fields =
    quiz.responseFields ||
    (quiz.parts || []).map((part) => ({
      id: part.id,
      label: part.prompt,
      prompt: part.prompt,
      rows: 8,
      required: true,
    }));
  return (Array.isArray(fields) ? fields : []).map((field) => ({
    id: field.id || "response",
    label: field.label || field.prompt || field.id || "Response",
    prompt: field.prompt || field.label || "Response",
    rows: Math.max(4, Math.min(18, Number(field.rows) || 8)),
    required: field.required !== false,
  }));
}

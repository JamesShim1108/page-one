export const maxResponseLength = 10000;

export function createWritingEngine(quiz) {
  const responseFields =
    quiz.responseFields ||
    quiz.parts.map((part) => ({ ...part, label: part.prompt, required: true }));
  const responseIds = responseFields.map((field) => field.id);
  const rubric =
    quiz.rubric || quiz.parts.map((part) => ({ id: part.id, label: part.id, points: 1 }));
  const scoreIds = rubric.map((criterion) => criterion.id);
  const scoreById = new Map(rubric.map((criterion) => [criterion.id, criterion]));
  const emptyScores = () => Object.fromEntries(scoreIds.map((id) => [id, null]));

  function newDraft() {
    return {
      version: quiz.version,
      quizId: quiz.id,
      responses: Object.fromEntries(responseIds.map((id) => [id, ""])),
      reviewed: false,
      scores: emptyScores(),
    };
  }

  function validate(draft) {
    if (
      !draft ||
      draft.version !== quiz.version ||
      draft.quizId !== quiz.id ||
      typeof draft.reviewed !== "boolean"
    )
      return false;
    for (const value of [draft.responses, draft.scores]) {
      if (
        !value ||
        typeof value !== "object" ||
        Array.isArray(value) ||
        Object.keys(value).length !==
          (value === draft.responses ? responseIds.length : scoreIds.length)
      )
        return false;
    }
    if (
      !responseIds.every(
        (id) =>
          typeof draft.responses[id] === "string" &&
          draft.responses[id].length <= maxResponseLength &&
          true,
      ) ||
      !scoreIds.every(
        (id) =>
          draft.scores[id] === null ||
          (Number.isInteger(draft.scores[id]) &&
            draft.scores[id] >= 0 &&
            draft.scores[id] <= scoreById.get(id).points),
      )
    )
      return false;
    if (
      draft.reviewed &&
      !responseFields
        .filter((field) => field.required !== false)
        .every((field) => draft.responses[field.id].trim())
    )
      return false;
    return draft.reviewed || scoreIds.every((id) => draft.scores[id] === null);
  }

  function updateResponse(draft, partId, text) {
    if (
      !responseIds.includes(partId) ||
      typeof text !== "string" ||
      text.length > maxResponseLength ||
      draft.reviewed
    )
      return false;
    draft.responses[partId] = text;
    draft.scores = emptyScores();
    return true;
  }

  function review(draft) {
    if (
      !responseFields
        .filter((field) => field.required !== false)
        .every((field) => draft.responses[field.id].trim())
    )
      return false;
    draft.reviewed = true;
    return true;
  }

  function revise(draft) {
    draft.reviewed = false;
    draft.scores = emptyScores();
  }

  function setScore(draft, partId, value) {
    if (
      !draft.reviewed ||
      !scoreById.has(partId) ||
      !Number.isInteger(value) ||
      value < 0 ||
      value > scoreById.get(partId).points
    )
      return false;
    draft.scores[partId] = value;
    return true;
  }

  function total(draft) {
    if (!draft.reviewed || !scoreIds.every((id) => draft.scores[id] !== null))
      return null;
    return scoreIds.reduce((sum, id) => sum + draft.scores[id], 0);
  }
  return {
    newDraft,
    validate,
    updateResponse,
    review,
    revise,
    setScore,
    total,
    responseFields,
    rubric,
  };
}

export const maxResponseLength = 10000;

function responseFieldsFor(quiz) {
  return (
    quiz.responseFields ||
    quiz.parts.map((part) => ({ ...part, label: part.prompt, required: true }))
  );
}

function rubricFor(quiz) {
  return (
    quiz.rubric || quiz.parts.map((part) => ({ id: part.id, label: part.id, points: 1 }))
  );
}

export function createPromptSnapshot(quiz) {
  return {
    schemaVersion: 1,
    promptId: quiz.id,
    promptVersion: quiz.version,
    promptTitle: quiz.promptTitle || "",
    prompt: quiz.prompt || "",
    instructions: quiz.instructions || "",
    responseFields: responseFieldsFor(quiz).map((field) => ({
      id: field.id,
      label: field.label || field.prompt,
      prompt: field.prompt,
      required: field.required !== false,
    })),
    rubric: rubricFor(quiz).map((criterion) => ({
      id: criterion.id,
      label: criterion.label,
      points: criterion.points,
      guidance: criterion.guidance || "",
    })),
  };
}

export function createWritingEngine(quiz) {
  const responseFields = responseFieldsFor(quiz);
  const responseIds = responseFields.map((field) => field.id);
  const rubric = rubricFor(quiz);
  const scoreIds = rubric.map((criterion) => criterion.id);
  const scoreById = new Map(rubric.map((criterion) => [criterion.id, criterion]));
  const emptyScores = () => Object.fromEntries(scoreIds.map((id) => [id, null]));

  function newDraft({ draftId = `${quiz.id}@v${quiz.version}`, promptSnapshot } = {}) {
    return {
      schemaVersion: 2,
      draftId,
      version: quiz.version,
      quizId: quiz.id,
      promptId: quiz.id,
      promptVersion: quiz.version,
      promptSnapshot: promptSnapshot || createPromptSnapshot(quiz),
      responses: Object.fromEntries(responseIds.map((id) => [id, ""])),
      lastEditedField: null,
      editorPosition: null,
      reviewed: false,
      scores: emptyScores(),
    };
  }

  function normalizeDraft(draft, options = {}) {
    const normalized = newDraft({
      draftId: draft?.draftId || options.draftId,
      promptSnapshot: options.promptSnapshot,
    });
    if (draft?.responses && typeof draft.responses === "object")
      for (const id of responseIds)
        if (typeof draft.responses[id] === "string")
          normalized.responses[id] = draft.responses[id];
    if (responseIds.includes(draft?.lastEditedField))
      normalized.lastEditedField = draft.lastEditedField;
    if (
      draft?.editorPosition &&
      typeof draft.editorPosition === "object" &&
      Number.isInteger(draft.editorPosition.start) &&
      Number.isInteger(draft.editorPosition.end) &&
      draft.editorPosition.start >= 0 &&
      draft.editorPosition.end >= draft.editorPosition.start
    )
      normalized.editorPosition = {
        start: draft.editorPosition.start,
        end: draft.editorPosition.end,
      };
    if (draft?.reviewed === true) {
      normalized.reviewed = true;
      if (draft.scores && typeof draft.scores === "object")
        for (const id of scoreIds)
          if (Number.isInteger(draft.scores[id]))
            normalized.scores[id] = draft.scores[id];
    }
    return normalized;
  }

  function validate(draft) {
    if (
      !draft ||
      draft.version !== quiz.version ||
      draft.quizId !== quiz.id ||
      typeof draft.reviewed !== "boolean"
    )
      return false;
    if (
      (draft.schemaVersion !== undefined && draft.schemaVersion > 2) ||
      (draft.promptId !== undefined && draft.promptId !== quiz.id) ||
      (draft.promptVersion !== undefined && draft.promptVersion !== quiz.version)
    )
      return false;
    if (
      draft.promptSnapshot &&
      (draft.promptSnapshot.promptId !== quiz.id ||
        draft.promptSnapshot.promptVersion !== quiz.version)
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
    normalizeDraft,
    promptSnapshot: createPromptSnapshot(quiz),
    responseFields,
    rubric,
  };
}

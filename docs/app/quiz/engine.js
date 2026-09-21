// Quiz state is deliberately pure. The browser-facing store owns persistence;
// this module owns the meaning of an attempt and the snapshot it carries.
export const ATTEMPT_SCHEMA_VERSION = 2;
export const FEEDBACK_MODES = Object.freeze(["practice", "test"]);
export const SELECTION_KINDS = Object.freeze(["topic", "unit", "custom", "review"]);

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function nowIso() {
  return new Date().toISOString();
}

function opaqueId(prefix = "attempt") {
  try {
    if (globalThis.crypto?.randomUUID)
      return `${prefix}-${globalThis.crypto.randomUUID()}`;
  } catch {
    // Use a local opaque fallback when Web Crypto is unavailable.
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function choiceText(choice) {
  return choice && typeof choice === "object"
    ? choice.text || choice.label || ""
    : String(choice ?? "");
}

function choiceIdentity(choice, index) {
  return choice && typeof choice === "object" && choice.id
    ? String(choice.id)
    : String(index);
}

function questionCorrectIndex(question) {
  if (Number.isInteger(question?.correctAnswer)) return question.correctAnswer;
  if (typeof question?.correctChoiceId === "string")
    return (question.choices || []).findIndex(
      (choice, index) => choiceIdentity(choice, index) === question.correctChoiceId,
    );
  return -1;
}

function questionMap(questions = []) {
  return Object.assign(
    Object.create(null),
    Object.fromEntries(
      (Array.isArray(questions) ? questions : []).map((question) => [
        question.id,
        question,
      ]),
    ),
  );
}

function quizMap(quizzes = []) {
  return Object.assign(
    Object.create(null),
    Object.fromEntries(
      (Array.isArray(quizzes) ? quizzes : []).map((quiz) => [quiz.id, quiz]),
    ),
  );
}

function uniqueKnown(ids, questionById) {
  return [...new Set(Array.isArray(ids) ? ids : [])].filter((id) => questionById[id]);
}

function isSequenceSensitive(question) {
  return Boolean(
    question?.sequenceSensitive ||
    question?.positionSensitive ||
    question?.orderedChoices ||
    question?.choiceOrderMeaningful ||
    question?.positionalReference ||
    question?.choiceLabelReference,
  );
}

function canShuffleChoices(question) {
  return question?.shuffleChoices === true && !isSequenceSensitive(question);
}

function canShuffleQuestions(questions) {
  return !questions.some(
    (question) => question?.sequenceSensitive || question?.groupSequenceSensitive,
  );
}

function permutation(length, random = Math.random) {
  const values = Array.from({ length }, (_, index) => index);
  for (let index = values.length - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1));
    [values[index], values[other]] = [values[other], values[index]];
  }
  return values;
}

function validPermutation(value, length) {
  return (
    Array.isArray(value) &&
    value.length === length &&
    new Set(value).size === length &&
    value.every((entry) => Number.isInteger(entry) && entry >= 0 && entry < length)
  );
}

function snapshotQuestion(question) {
  return clone(question);
}

function selectionKindFor(value) {
  if (value === "weak") return "review";
  if (value === "quick") return "topic";
  return SELECTION_KINDS.includes(value) ? value : "topic";
}

function feedbackModeFor(value) {
  return FEEDBACK_MODES.includes(value) ? value : "practice";
}

function responseSelected(response) {
  return Number.isInteger(response?.selectedChoiceIndex)
    ? response.selectedChoiceIndex
    : Number.isInteger(response?.selected)
      ? response.selected
      : null;
}

function responseRevealed(response) {
  return response?.feedbackRevealed === true || response?.revealed === true;
}

function confidenceValue(value) {
  return value === "unsure" || value === "guessed" ? value : null;
}

function attemptIds(attempt) {
  return Array.isArray(attempt?.orderedQuestionIds)
    ? attempt.orderedQuestionIds
    : Array.isArray(attempt?.ids)
      ? attempt.ids
      : [];
}

function attemptResponses(attempt) {
  if (attempt?.responses && typeof attempt.responses === "object")
    return attempt.responses;
  const responses = {};
  for (const [id, selected] of Object.entries(attempt?.answers || {}))
    responses[id] = { selectedChoiceIndex: selected, feedbackRevealed: true };
  return responses;
}

function syncCompatibility(attempt) {
  const ids = attemptIds(attempt);
  attempt.ids = [...ids];
  const currentIndex = attempt.currentQuestionId
    ? ids.indexOf(attempt.currentQuestionId)
    : Math.max(
        0,
        Math.min(Number.isInteger(attempt.index) ? attempt.index : 0, ids.length - 1),
      );
  attempt.index = ids.length ? Math.max(0, currentIndex) : 0;
  attempt.currentQuestionId = ids[attempt.index] || null;
  attempt.answers = {};
  for (const id of ids) {
    const selected = responseSelected(attempt.responses?.[id]);
    if (Number.isInteger(selected)) attempt.answers[id] = selected;
  }
  attempt.complete = attempt.status === "complete";
  attempt.mode = attempt.selectionKind;
  return attempt;
}

function makeAttempt({
  quiz,
  ids,
  bank,
  feedbackMode,
  selectionKind,
  random,
  shuffleQuestions,
  attemptId,
  startedAt,
  contentRevision,
  provenance,
  parentAttemptId,
  currentQuestionId,
  trackExposure,
  now,
}) {
  const selectedQuestions = ids.map((id) => bank.questionById[id]).filter(Boolean);
  const orderedQuestionIds =
    shuffleQuestions && canShuffleQuestions(selectedQuestions)
      ? shuffle(ids, random)
      : [...ids];
  const choiceOrders = {};
  for (const id of orderedQuestionIds) {
    const question = bank.questionById[id];
    choiceOrders[id] = canShuffleChoices(question)
      ? permutation(question.choices.length, random)
      : question.choices.map((_, index) => index);
  }
  const snapshot = {
    schemaVersion: 1,
    questions: orderedQuestionIds.map((id) => snapshotQuestion(bank.questionById[id])),
    assets: clone(bank.assets || {}),
  };
  const attempt = {
    version: ATTEMPT_SCHEMA_VERSION,
    schemaVersion: ATTEMPT_SCHEMA_VERSION,
    attemptId: attemptId || opaqueId("attempt"),
    courseId: quiz.courseId || bank.courseId || "",
    quizId: quiz.id,
    activityId: quiz.id,
    activityKind: quiz.quizType === "quick" ? "quick-check" : "quiz",
    activityTitle: quiz.title || "",
    feedbackMode,
    selectionKind,
    status: "active",
    orderedQuestionIds,
    choiceOrders,
    currentQuestionId: currentQuestionId || orderedQuestionIds[0] || null,
    responses: {},
    flags: {},
    confidence: {},
    eliminatedChoiceIds: {},
    startedAt: startedAt === undefined ? now() : startedAt,
    completedAt: null,
    abandonedAt: null,
    contentRevision: String(contentRevision || "unversioned"),
    questionSnapshot: snapshot,
    provenance: provenance || { kind: "new", firstExposureKnown: false },
    ...(parentAttemptId ? { parentAttemptId: String(parentAttemptId) } : {}),
    ...(trackExposure
      ? { exposure: { questionIds: [], firstExposedAt: null, lastExposedAt: null } }
      : {}),
  };
  return syncCompatibility(attempt);
}

export function createQuizEngine(bank, options = {}) {
  const questionById = questionMap(bank?.questions);
  const quizById = quizMap(bank?.quizzes);
  const random = options.random || Math.random;
  const now = options.now || nowIso;
  const idFactory = options.idFactory || (() => opaqueId("attempt"));
  const contentRevision =
    bank?.revision || bank?.contentRevision || options.contentRevision || "unversioned";
  const concepts = Object.fromEntries(
    Object.values(bank?.concepts || {}).map((concept) => [
      `${concept.topicId}/${concept.id || concept.section}`,
      concept,
    ]),
  );

  function quizFor(quizId) {
    return quizById[quizId] || null;
  }

  function parseCreateOptions(selectionOrOptions, feedbackOrOptions, extraOptions) {
    if (selectionOrOptions && typeof selectionOrOptions === "object")
      return { ...selectionOrOptions };
    const result = {
      selectionKind: selectionKindFor(selectionOrOptions),
      feedbackMode: feedbackModeFor(feedbackOrOptions),
    };
    if (feedbackOrOptions && typeof feedbackOrOptions === "object")
      Object.assign(result, feedbackOrOptions);
    if (extraOptions && typeof extraOptions === "object")
      Object.assign(result, extraOptions);
    return result;
  }

  function createAttempt(
    quizId,
    questionIds = null,
    selectionOrOptions = "topic",
    feedbackOrOptions = "practice",
    extraOptions = {},
  ) {
    const quiz = quizFor(quizId);
    if (!quiz) return null;
    const createOptions = parseCreateOptions(
      selectionOrOptions,
      feedbackOrOptions,
      extraOptions,
    );
    const selectionKind = selectionKindFor(
      createOptions.selectionKind || createOptions.mode || selectionOrOptions,
    );
    const feedbackMode = feedbackModeFor(createOptions.feedbackMode || feedbackOrOptions);
    const selected = uniqueKnown(questionIds ?? quiz.questionIds, questionById).filter(
      (id) => quiz.questionIds.includes(id) || selectionKind === "review",
    );
    if (!selected.length) return null;
    return makeAttempt({
      quiz,
      ids: selected,
      bank: { ...bank, questionById },
      feedbackMode,
      selectionKind,
      random,
      shuffleQuestions:
        createOptions.shuffleQuestions === true ||
        (createOptions.shuffleQuestions === undefined && quiz.shuffleQuestions === true),
      attemptId: createOptions.attemptId || idFactory(),
      startedAt: createOptions.startedAt,
      contentRevision: createOptions.contentRevision || contentRevision,
      provenance: createOptions.provenance,
      parentAttemptId: createOptions.parentAttemptId,
      currentQuestionId: createOptions.currentQuestionId,
      trackExposure: createOptions.trackExposure === true,
      now,
    });
  }

  function snapshotQuestions(attempt) {
    return questionMap(attempt?.questionSnapshot?.questions);
  }

  function questionForAttempt(attempt, id = attempt?.currentQuestionId) {
    return snapshotQuestions(attempt)[id] || questionById[id] || null;
  }

  function responseFor(attempt, id = attempt?.currentQuestionId) {
    return attemptResponses(attempt)[id] || null;
  }

  function markExposed(attempt, ids = [attempt?.currentQuestionId]) {
    if (!attempt || !attempt.exposure || !Array.isArray(ids)) return false;
    const valid = new Set(attemptIds(attempt));
    const next = new Set(attempt.exposure.questionIds || []);
    const before = next.size;
    for (const id of ids) if (valid.has(id)) next.add(id);
    if (next.size === before) return false;
    const timestamp = now();
    attempt.exposure.questionIds = [...next];
    attempt.exposure.firstExposedAt ||= timestamp;
    attempt.exposure.lastExposedAt = timestamp;
    return true;
  }

  function selectAnswer(attempt, displayedChoice, { displayed = true } = {}) {
    if (!attempt || attempt.status !== "active") return false;
    const id = attempt.currentQuestionId || attemptIds(attempt)[attempt.index];
    const question = questionForAttempt(attempt, id);
    if (!question || !Number.isInteger(displayedChoice)) return false;
    const existing = responseFor(attempt, id);
    if (responseRevealed(existing)) return false;
    const order = attempt.choiceOrders?.[id];
    const original = displayed
      ? Array.isArray(order)
        ? order[displayedChoice]
        : displayedChoice
      : displayedChoice;
    if (
      !Number.isInteger(original) ||
      original < 0 ||
      original >= question.choices.length
    )
      return false;
    const choice = question.choices[original];
    attempt.responses ||= {};
    attempt.responses[id] = {
      selectedChoiceIndex: original,
      selectedChoiceId: choiceIdentity(choice, original),
      selectedValue: choiceText(choice),
      feedbackRevealed: false,
    };
    const eliminated = attempt.eliminatedChoiceIds?.[id] || [];
    const choiceId = choiceIdentity(choice, original);
    if (eliminated.includes(choiceId))
      attempt.eliminatedChoiceIds[id] = eliminated.filter((entry) => entry !== choiceId);
    syncCompatibility(attempt);
    return true;
  }

  function revealAnswer(attempt) {
    if (!attempt || attempt.status !== "active" || attempt.feedbackMode !== "practice")
      return false;
    const id = attempt.currentQuestionId;
    const response = responseFor(attempt, id);
    if (!response || !Number.isInteger(responseSelected(response))) return false;
    if (responseRevealed(response)) return false;
    response.feedbackRevealed = true;
    response.checkedAt = now();
    syncCompatibility(attempt);
    return true;
  }

  // Kept as the old public name for existing quick checks and callers. In the
  // v2 model it means select, then reveal only in practice mode.
  function checkAnswer(attempt, choice) {
    if (!attempt || attempt.status !== "active") return false;
    if (!responseFor(attempt, attempt.currentQuestionId)) {
      if (!selectAnswer(attempt, choice)) return false;
    }
    return revealAnswer(attempt);
  }

  function moveTo(attempt, index) {
    const ids = attemptIds(attempt);
    if (!attempt || attempt.status !== "active" || !Number.isInteger(index)) return false;
    if (index < 0 || index >= ids.length) return false;
    attempt.currentQuestionId = ids[index];
    syncCompatibility(attempt);
    return true;
  }

  function nextQuestion(attempt) {
    const ids = attemptIds(attempt);
    const index = ids.indexOf(attempt?.currentQuestionId);
    return index >= 0 && index < ids.length - 1 ? moveTo(attempt, index + 1) : false;
  }

  function previousQuestion(attempt) {
    const ids = attemptIds(attempt);
    const index = ids.indexOf(attempt?.currentQuestionId);
    return index > 0 ? moveTo(attempt, index - 1) : false;
  }

  function jumpToQuestion(attempt, questionId) {
    return moveTo(attempt, attemptIds(attempt).indexOf(questionId));
  }

  function unanswered(attempt) {
    return attemptIds(attempt).filter(
      (id) => !Number.isInteger(responseSelected(responseFor(attempt, id))),
    );
  }

  function unchecked(attempt) {
    if (attempt?.feedbackMode !== "practice") return [];
    return attemptIds(attempt).filter((id) => {
      const response = responseFor(attempt, id);
      return Number.isInteger(responseSelected(response)) && !responseRevealed(response);
    });
  }

  function finish(attempt, { allowBlank = false } = {}) {
    if (!attempt || attempt.status !== "active")
      return { ok: false, reason: "inactive", unanswered: [] };
    const missing = unanswered(attempt);
    const pending = unchecked(attempt);
    if (missing.length && !allowBlank)
      return { ok: false, reason: "unanswered", unanswered: missing, unchecked: pending };
    attempt.status = "complete";
    attempt.completedAt = now();
    attempt.abandonedAt = null;
    syncCompatibility(attempt);
    return { ok: true, result: summarize(attempt) };
  }

  function abandon(attempt) {
    if (!attempt || attempt.status !== "active") return false;
    attempt.status = "abandoned";
    attempt.abandonedAt = now();
    syncCompatibility(attempt);
    return true;
  }

  function continueAttempt(attempt) {
    if (!attempt || attempt.status !== "abandoned") return false;
    attempt.status = "active";
    attempt.abandonedAt = null;
    syncCompatibility(attempt);
    return true;
  }

  function toggleFlag(attempt, questionId = attempt?.currentQuestionId) {
    if (
      !attempt ||
      attempt.status !== "active" ||
      !attemptIds(attempt).includes(questionId)
    )
      return false;
    attempt.flags ||= {};
    attempt.flags[questionId] = !Boolean(attempt.flags[questionId]);
    return attempt.flags[questionId];
  }

  function toggleElimination(
    attempt,
    questionId = attempt?.currentQuestionId,
    originalChoiceIndex,
  ) {
    if (
      !attempt ||
      attempt.status !== "active" ||
      !attemptIds(attempt).includes(questionId)
    )
      return { ok: false, reason: "inactive" };
    const question = questionForAttempt(attempt, questionId);
    if (
      !question ||
      !Number.isInteger(originalChoiceIndex) ||
      originalChoiceIndex < 0 ||
      originalChoiceIndex >= question.choices.length
    )
      return { ok: false, reason: "choice" };
    if (responseSelected(responseFor(attempt, questionId)) === originalChoiceIndex)
      return { ok: false, reason: "selected" };
    const choiceId = choiceIdentity(
      question.choices[originalChoiceIndex],
      originalChoiceIndex,
    );
    const current = Array.isArray(attempt.eliminatedChoiceIds?.[questionId])
      ? attempt.eliminatedChoiceIds[questionId]
      : [];
    const eliminated = current.includes(choiceId);
    attempt.eliminatedChoiceIds ||= {};
    attempt.eliminatedChoiceIds[questionId] = eliminated
      ? current.filter((entry) => entry !== choiceId)
      : [...current, choiceId];
    return { ok: true, eliminated: !eliminated, choiceId };
  }

  function resetEliminations(attempt, questionId = attempt?.currentQuestionId) {
    if (
      !attempt ||
      attempt.status !== "active" ||
      !attemptIds(attempt).includes(questionId)
    )
      return false;
    attempt.eliminatedChoiceIds ||= {};
    delete attempt.eliminatedChoiceIds[questionId];
    return true;
  }

  function isEliminated(attempt, questionId, originalChoiceIndex) {
    const question = questionForAttempt(attempt, questionId);
    if (!question || !Number.isInteger(originalChoiceIndex)) return false;
    return (attempt.eliminatedChoiceIds?.[questionId] || []).includes(
      choiceIdentity(question.choices[originalChoiceIndex], originalChoiceIndex),
    );
  }

  function setConfidence(attempt, questionId = attempt?.currentQuestionId, value = null) {
    if (
      !attempt ||
      attempt.status !== "active" ||
      !attemptIds(attempt).includes(questionId)
    )
      return false;
    if (responseRevealed(responseFor(attempt, questionId))) return false;
    const normalized = confidenceValue(value);
    attempt.confidence ||= {};
    if (normalized) attempt.confidence[questionId] = normalized;
    else delete attempt.confidence[questionId];
    return true;
  }

  function progress(attempt) {
    const ids = attemptIds(attempt);
    const selected = ids.filter((id) =>
      Number.isInteger(responseSelected(responseFor(attempt, id))),
    );
    const checked = ids.filter((id) => responseRevealed(responseFor(attempt, id)));
    const unansweredIds = ids.filter(
      (id) => !Number.isInteger(responseSelected(responseFor(attempt, id))),
    );
    const uncheckedIds = selected.filter((id) => !checked.includes(id));
    const flaggedIds = ids.filter((id) => attempt.flags?.[id] === true);
    return {
      total: ids.length,
      selected: selected.length,
      checked: checked.length,
      unanswered: unansweredIds.length,
      unchecked: uncheckedIds.length,
      flagged: flaggedIds.length,
      unansweredIds,
      uncheckedIds,
      flaggedIds,
    };
  }

  function navigatorState(attempt) {
    return attemptIds(attempt).map((id, index) => {
      const response = responseFor(attempt, id);
      return {
        id,
        number: index + 1,
        current: id === attempt.currentQuestionId,
        answered: Number.isInteger(responseSelected(response)),
        checked: responseRevealed(response),
        flagged: attempt.flags?.[id] === true,
        confidence: attempt.confidence?.[id] || null,
      };
    });
  }

  function displayedChoices(attempt, questionId = attempt?.currentQuestionId) {
    const question = questionForAttempt(attempt, questionId);
    if (!question) return [];
    const order =
      attempt?.choiceOrders?.[questionId] || question.choices.map((_, index) => index);
    if (!validPermutation(order, question.choices.length)) return [];
    return order.map((originalIndex, displayedIndex) => ({
      displayedIndex,
      originalIndex,
      id: choiceIdentity(question.choices[originalIndex], originalIndex),
      text: choiceText(question.choices[originalIndex]),
      value: question.choices[originalIndex],
    }));
  }

  function isCorrect(attempt, questionId = attempt?.currentQuestionId) {
    const question = questionForAttempt(attempt, questionId);
    const response = responseFor(attempt, questionId);
    return Boolean(
      question &&
      Number.isInteger(responseSelected(response)) &&
      responseSelected(response) === questionCorrectIndex(question),
    );
  }

  function summarize(attempt) {
    const tags = {};
    let correct = 0;
    let answered = 0;
    for (const id of attemptIds(attempt)) {
      const question = questionForAttempt(attempt, id);
      const response = responseFor(attempt, id);
      const selected = responseSelected(response);
      if (!question || !Number.isInteger(selected)) continue;
      answered += 1;
      const hit = selected === questionCorrectIndex(question);
      correct += Number(hit);
      const key = `${question.topicId || "quiz"}/${question.concept || "general"}`;
      tags[key] ??= { correct: 0, total: 0 };
      tags[key].total += 1;
      tags[key].correct += Number(hit);
    }
    const strong = Object.keys(tags).filter(
      (key) => tags[key].correct / tags[key].total >= 0.75,
    );
    const weak = Object.keys(tags).filter((key) => !strong.includes(key));
    return {
      correct,
      answered,
      incorrect: Math.max(0, answered - correct),
      total: attemptIds(attempt).length,
      percent: attemptIds(attempt).length
        ? Math.round((correct / attemptIds(attempt).length) * 100)
        : 0,
      tags,
      strong,
      weak,
    };
  }

  function weakQuestionIds(attempt) {
    const weak = summarize(attempt).weak;
    return attemptIds(attempt).filter((id) => {
      const question = questionForAttempt(attempt, id);
      return weak.includes(
        `${question.topicId || "quiz"}/${question.concept || "general"}`,
      );
    });
  }

  function reviewPlan(attempt) {
    const ids = attemptIds(attempt);
    const groups = [[], [], []];
    const reasons = new Map();
    const topicOrder = new Map();

    for (const [index, id] of ids.entries()) {
      const question = questionForAttempt(attempt, id);
      if (!question) continue;
      const response = responseFor(attempt, id);
      const selected = responseSelected(response);
      const answered = Number.isInteger(selected);
      const incorrect = answered && !isCorrect(attempt, id);
      const uncertain = Boolean(attempt.confidence?.[id]);
      const flagged = attempt.flags?.[id] === true;
      const priority = !answered || incorrect ? 0 : uncertain ? 1 : flagged ? 2 : -1;
      if (priority < 0) continue;
      const topicId = question.topicId || "quiz";
      if (!topicOrder.has(topicId)) topicOrder.set(topicId, topicOrder.size);
      groups[priority].push({ id, index, topicId });
      reasons.set(
        id,
        priority === 0
          ? !answered
            ? "No answer was selected."
            : "You missed this question."
          : priority === 1
            ? "You marked this answer uncertain."
            : "You flagged this question for review.",
      );
    }

    const ordered = [];
    for (const group of groups) {
      const counts = new Map();
      for (const item of group)
        counts.set(item.topicId, (counts.get(item.topicId) || 0) + 1);
      group.sort(
        (left, right) =>
          (counts.get(right.topicId) || 0) - (counts.get(left.topicId) || 0) ||
          (topicOrder.get(left.topicId) || 0) - (topicOrder.get(right.topicId) || 0) ||
          left.index - right.index,
      );
      ordered.push(...group);
    }
    const selected = ordered.slice(0, 4);
    const sectionGroups = new Map();
    for (const item of ordered) {
      const question = questionForAttempt(attempt, item.id);
      const concept = concepts[`${question.topicId}/${question.concept}`];
      const key = concept?.section
        ? `${question.topicId}/${concept.section}`
        : `topic/${question.topicId || "unknown"}`;
      const existing = sectionGroups.get(key) || {
        key,
        topicId: question.topicId || "",
        section: concept?.section || "",
        title: concept?.title || question.topicId || "Review this topic",
        count: 0,
        firstIndex: item.index,
        ids: [],
      };
      existing.count += 1;
      existing.ids.push(item.id);
      sectionGroups.set(key, existing);
    }
    const sections = [...sectionGroups.values()]
      .sort(
        (left, right) => right.count - left.count || left.firstIndex - right.firstIndex,
      )
      .slice(0, 2)
      .map((section) => ({
        ...section,
        path: section.section
          ? `/topic/${section.topicId}?section=${encodeURIComponent(section.section)}`
          : `/topic/${section.topicId}`,
        reason: `${section.count} question${section.count === 1 ? "" : "s"} linked to this section need review.`,
      }));

    return {
      questionIds: selected.map((item) => item.id),
      questions: selected.map((item) => ({
        id: item.id,
        reason: reasons.get(item.id),
      })),
      sections,
    };
  }

  function validateAttempt(attempt) {
    if (!attempt || !quizById[attempt.quizId]) return false;
    if (attempt.version === 1) return Boolean(migrateAttempt(attempt));
    if (
      attempt.version !== ATTEMPT_SCHEMA_VERSION ||
      attempt.schemaVersion !== ATTEMPT_SCHEMA_VERSION
    )
      return false;
    if (!attempt.attemptId || typeof attempt.attemptId !== "string") return false;
    if (!FEEDBACK_MODES.includes(attempt.feedbackMode)) return false;
    if (!SELECTION_KINDS.includes(attempt.selectionKind)) return false;
    if (!["active", "complete", "abandoned"].includes(attempt.status)) return false;
    if (!Array.isArray(attempt.orderedQuestionIds) || !attempt.orderedQuestionIds.length)
      return false;
    if (new Set(attempt.orderedQuestionIds).size !== attempt.orderedQuestionIds.length)
      return false;
    const snapshot = snapshotQuestions(attempt);
    if (
      !attempt.orderedQuestionIds.every((id) => {
        const question = snapshot[id];
        return (
          question &&
          Array.isArray(question.choices) &&
          Number.isInteger(questionCorrectIndex(question)) &&
          questionCorrectIndex(question) >= 0 &&
          questionCorrectIndex(question) < question.choices.length
        );
      })
    )
      return false;
    for (const id of attempt.orderedQuestionIds) {
      if (!validPermutation(attempt.choiceOrders?.[id], snapshot[id].choices.length))
        return false;
      const authoredOrder = snapshot[id].choices.map((_, index) => index);
      if (
        !canShuffleChoices(snapshot[id]) &&
        JSON.stringify(attempt.choiceOrders[id]) !== JSON.stringify(authoredOrder)
      )
        return false;
    }
    if (
      attempt.currentQuestionId !== null &&
      !attempt.orderedQuestionIds.includes(attempt.currentQuestionId)
    )
      return false;
    if (
      !attempt.responses ||
      typeof attempt.responses !== "object" ||
      Array.isArray(attempt.responses)
    )
      return false;
    for (const [id, response] of Object.entries(attempt.responses)) {
      const question = snapshot[id];
      const selected = responseSelected(response);
      if (
        !question ||
        !Number.isInteger(selected) ||
        selected < 0 ||
        selected >= question.choices.length ||
        (attempt.feedbackMode === "test" && responseRevealed(response))
      )
        return false;
    }
    if (
      !attempt.flags ||
      typeof attempt.flags !== "object" ||
      Array.isArray(attempt.flags)
    )
      return false;
    if (
      !attempt.confidence ||
      typeof attempt.confidence !== "object" ||
      Array.isArray(attempt.confidence)
    )
      return false;
    if (
      !attempt.eliminatedChoiceIds ||
      typeof attempt.eliminatedChoiceIds !== "object" ||
      Array.isArray(attempt.eliminatedChoiceIds)
    )
      return false;
    const validQuestionIds = new Set(attempt.orderedQuestionIds);
    for (const [id, flagged] of Object.entries(attempt.flags)) {
      if (!validQuestionIds.has(id) || typeof flagged !== "boolean") return false;
    }
    for (const [id, confidence] of Object.entries(attempt.confidence)) {
      if (!validQuestionIds.has(id) || !confidenceValue(confidence)) return false;
    }
    for (const [id, choices] of Object.entries(attempt.eliminatedChoiceIds)) {
      const question = snapshot[id];
      if (!question || !Array.isArray(choices)) return false;
      const validChoiceIds = new Set(
        question.choices.map((choice, index) => choiceIdentity(choice, index)),
      );
      if (
        new Set(choices).size !== choices.length ||
        choices.some((choice) => !validChoiceIds.has(choice))
      )
        return false;
      if (
        choices.includes(
          choiceIdentity(
            question.choices[responseSelected(attempt.responses[id])],
            responseSelected(attempt.responses[id]),
          ),
        )
      )
        return false;
    }
    if (attempt.exposure !== undefined) {
      if (
        !attempt.exposure ||
        typeof attempt.exposure !== "object" ||
        Array.isArray(attempt.exposure) ||
        !Array.isArray(attempt.exposure.questionIds) ||
        new Set(attempt.exposure.questionIds).size !==
          attempt.exposure.questionIds.length ||
        attempt.exposure.questionIds.some((id) => !validQuestionIds.has(id))
      )
        return false;
    }
    if (attempt.status === "active" && attempt.completedAt !== null) return false;
    if (
      attempt.status === "complete" &&
      !attempt.completedAt &&
      attempt.provenance?.timestampsKnown !== false
    )
      return false;
    if (attempt.status === "abandoned" && !attempt.abandonedAt) return false;
    if (
      attempt.ids &&
      JSON.stringify(attempt.ids) !== JSON.stringify(attempt.orderedQuestionIds)
    )
      return false;
    if (attempt.complete !== (attempt.status === "complete")) return false;
    for (const [id, selected] of Object.entries(attempt.answers || {})) {
      if (selected !== responseSelected(attempt.responses[id])) return false;
    }
    return true;
  }

  function migrateAttempt(legacy, migrationOptions = {}) {
    if (!legacy || typeof legacy !== "object" || Array.isArray(legacy)) return null;
    if (legacy.version === ATTEMPT_SCHEMA_VERSION)
      return validateAttempt(legacy) ? clone(legacy) : null;
    if (legacy.version !== 1 && !Array.isArray(legacy.ids)) return null;
    const quiz = quizFor(legacy.quizId);
    if (!quiz) return null;
    const ids = uniqueKnown(legacy.ids || quiz.questionIds, questionById).filter((id) =>
      quiz.questionIds.includes(id),
    );
    if (!ids.length) return null;
    const migrated = makeAttempt({
      quiz,
      ids,
      bank: { ...bank, questionById },
      feedbackMode: "practice",
      selectionKind: selectionKindFor(legacy.mode),
      random,
      shuffleQuestions: false,
      attemptId:
        legacy.attemptId ||
        migrationOptions.attemptId ||
        `legacy-${String(legacy.quizId)}`,
      startedAt: null,
      contentRevision: migrationOptions.contentRevision || contentRevision,
      provenance: {
        kind: "legacy-migration",
        sourceVersion: legacy.version || 1,
        timestampsKnown: false,
        firstExposureKnown: false,
      },
      currentQuestionId: ids[Math.min(Math.max(legacy.index || 0, 0), ids.length - 1)],
      now,
    });
    migrated.responses = {};
    for (const [id, selected] of Object.entries(legacy.answers || {})) {
      const question = questionById[id];
      if (!ids.includes(id) || !question || !Number.isInteger(selected)) return null;
      if (selected < 0 || selected >= question.choices.length) return null;
      migrated.responses[id] = {
        selectedChoiceIndex: selected,
        selectedChoiceId: choiceIdentity(question.choices[selected], selected),
        selectedValue: choiceText(question.choices[selected]),
        feedbackRevealed: true,
      };
    }
    if (legacy.complete) {
      if (ids.some((id) => !migrated.responses[id])) return null;
      migrated.status = "complete";
      migrated.completedAt = null;
    }
    syncCompatibility(migrated);
    return validateAttempt(migrated) ? migrated : null;
  }

  return {
    questionById,
    quizById,
    concepts,
    createAttempt,
    selectAnswer,
    revealAnswer,
    checkAnswer,
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
    finish,
    abandon,
    continueAttempt,
    toggleFlag,
    toggleElimination,
    resetEliminations,
    isEliminated,
    setConfidence,
    progress,
    navigatorState,
    displayedChoices,
    isCorrect,
    responseFor,
    markExposed,
    questionForAttempt,
    summarize,
    weakQuestionIds,
    reviewPlan,
    validateAttempt,
    migrateAttempt,
  };
}

export function shuffle(ids, random = Math.random) {
  const shuffled = [...ids];
  const order = permutation(shuffled.length, random);
  return order.map((index) => shuffled[index]);
}

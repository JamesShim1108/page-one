// Mock exam rules without DOM or storage access. Every function takes the
// generated exam payload and a plain attempt object and returns a new attempt,
// so the controller, the store, and the tests share one set of rules.
//
// Timing follows the real exam: a timed section's clock runs from the moment it
// starts, including while the tab is closed, and the section is submitted when
// time runs out. Untimed attempts show elapsed time and never expire.

export const EXAM_ATTEMPT_VERSION = 1;
export const MAX_RESPONSE_LENGTH = 50_000;
const MINUTE = 60_000;

const clone = (value) => JSON.parse(JSON.stringify(value));

export function responseKey(sectionId, promptId, optionId) {
  return `${sectionId}/${promptId}/${optionId}`;
}

export function createAttempt(exam, { now = Date.now(), timed = true, attemptId } = {}) {
  return {
    schemaVersion: EXAM_ATTEMPT_VERSION,
    attemptId: attemptId || `${exam.exam.id}-${now.toString(36)}`,
    examId: exam.exam.id,
    courseId: exam.exam.courseId,
    revision: exam.revision || "",
    timed: Boolean(timed),
    status: "intro",
    sectionIndex: 0,
    createdAt: now,
    updatedAt: now,
    finishedAt: null,
    breakStartedAt: null,
    sections: Object.fromEntries(
      exam.sections.map((section) => [
        section.id,
        { startedAt: null, submittedAt: null, expired: false },
      ]),
    ),
    mcq: { answers: {}, flags: {}, current: 0 },
    choices: {},
    responses: {},
    scores: {},
  };
}

// A saved attempt is only usable with the exam revision it was taken on.
export function attemptMatches(attempt, exam) {
  return Boolean(
    attempt &&
    attempt.schemaVersion === EXAM_ATTEMPT_VERSION &&
    attempt.examId === exam.exam.id &&
    attempt.revision === (exam.revision || "") &&
    attempt.sections &&
    exam.sections.every((section) => attempt.sections[section.id]),
  );
}

export function currentSection(attempt, exam) {
  return exam.sections[attempt.sectionIndex] || null;
}

export const sectionLimitMs = (section) => section.minutes * MINUTE;

export function elapsedMs(attempt, section, now = Date.now()) {
  const state = attempt.sections[section.id];
  if (state?.startedAt == null) return 0;
  const end = state.submittedAt ?? now;
  return Math.max(0, end - state.startedAt);
}

// Null when no clock applies: an untimed attempt, or no section in progress.
export function remainingMs(attempt, exam, now = Date.now()) {
  if (!attempt.timed || attempt.status !== "section") return null;
  const section = currentSection(attempt, exam);
  return Math.max(0, sectionLimitMs(section) - elapsedMs(attempt, section, now));
}

export function breakRemainingMs(attempt, exam, now = Date.now()) {
  if (attempt.status !== "break") return null;
  const previous = exam.sections[attempt.sectionIndex - 1];
  const limit = (previous?.breakAfterMinutes || 0) * MINUTE;
  return Math.max(0, limit - (now - attempt.breakStartedAt));
}

// The DBQ reading period is advice, not a lock: the AP exam does not stop
// students from writing during it either.
export function inReadingPeriod(attempt, exam, now = Date.now()) {
  const section = currentSection(attempt, exam);
  if (attempt.status !== "section" || !section?.readingMinutes) return false;
  return elapsedMs(attempt, section, now) < section.readingMinutes * MINUTE;
}

function touch(attempt, now) {
  attempt.updatedAt = now;
  return attempt;
}

export function startSection(attempt, exam, now = Date.now()) {
  if (!["intro", "between"].includes(attempt.status)) return attempt;
  const section = currentSection(attempt, exam);
  if (!section) return attempt;
  const next = clone(attempt);
  next.status = "section";
  next.sections[section.id].startedAt ??= now;
  next.breakStartedAt = null;
  if (section.kind === "mcq") next.mcq.current = 0;
  return touch(next, now);
}

export function submitSection(attempt, exam, now = Date.now(), { expired = false } = {}) {
  if (attempt.status !== "section") return attempt;
  const section = currentSection(attempt, exam);
  const next = clone(attempt);
  const state = next.sections[section.id];
  // An expired section is stamped at its deadline, not when the tab noticed.
  state.submittedAt = expired ? state.startedAt + sectionLimitMs(section) : now;
  state.expired = expired;
  next.sectionIndex += 1;
  if (next.sectionIndex >= exam.sections.length) {
    next.status = "finished";
    next.finishedAt = state.submittedAt;
  } else if (section.breakAfterMinutes) {
    next.status = "break";
    next.breakStartedAt = state.submittedAt;
  } else next.status = "between";
  return touch(next, now);
}

export function endBreak(attempt, now = Date.now()) {
  if (attempt.status !== "break") return attempt;
  const next = clone(attempt);
  next.status = "between";
  next.breakStartedAt = null;
  return touch(next, now);
}

// Applies every deadline that has passed. Several can pass while a tab is
// closed, for example a section and the break after it.
export function tick(attempt, exam, now = Date.now()) {
  let next = attempt;
  for (let guard = 0; guard <= exam.sections.length; guard += 1) {
    if (next.timed && next.status === "section" && remainingMs(next, exam, now) === 0)
      next = submitSection(next, exam, now, { expired: true });
    else if (next.status === "break" && breakRemainingMs(next, exam, now) === 0)
      next = endBreak(next, now);
    else break;
  }
  return next;
}

function activeMcq(attempt, exam) {
  const section = currentSection(attempt, exam);
  return attempt.status === "section" && section?.kind === "mcq" ? section : null;
}

export function answerQuestion(attempt, exam, questionId, choiceIndex, now = Date.now()) {
  const section = activeMcq(attempt, exam);
  const question = section?.questions.find((item) => item.id === questionId);
  if (!question || !Number.isInteger(choiceIndex)) return attempt;
  if (choiceIndex < 0 || choiceIndex >= question.choices.length) return attempt;
  const next = clone(attempt);
  next.mcq.answers[questionId] = choiceIndex;
  return touch(next, now);
}

export function toggleFlag(attempt, exam, questionId, now = Date.now()) {
  const section = activeMcq(attempt, exam);
  if (!section?.questions.some((item) => item.id === questionId)) return attempt;
  const next = clone(attempt);
  if (next.mcq.flags[questionId]) delete next.mcq.flags[questionId];
  else next.mcq.flags[questionId] = true;
  return touch(next, now);
}

export function goToQuestion(attempt, exam, index, now = Date.now()) {
  const section = activeMcq(attempt, exam);
  if (!section || !Number.isInteger(index)) return attempt;
  const next = clone(attempt);
  next.mcq.current = Math.min(Math.max(index, 0), section.questions.length - 1);
  return touch(next, now);
}

export function mcqProgress(attempt, section) {
  const answered = section.questions.filter((question) =>
    Number.isInteger(attempt.mcq.answers[question.id]),
  ).length;
  const flagged = section.questions.filter((question) => attempt.mcq.flags[question.id]);
  return {
    answered,
    unanswered: section.questions.length - answered,
    flagged: flagged.length,
  };
}

// For a prompt where every option is required, all options count as chosen.
export function chosenOptions(attempt, section, prompt) {
  if (prompt.choose >= prompt.options.length) return prompt.options;
  const ids = attempt.choices[`${section.id}/${prompt.id}`] || [];
  return prompt.options.filter((option) => ids.includes(option.id));
}

export function chooseOption(attempt, exam, promptId, optionId, now = Date.now()) {
  const section = currentSection(attempt, exam);
  if (attempt.status !== "section" || !section?.prompts) return attempt;
  const prompt = section.prompts.find((item) => item.id === promptId);
  if (!prompt || prompt.choose >= prompt.options.length) return attempt;
  if (!prompt.options.some((option) => option.id === optionId)) return attempt;
  const next = clone(attempt);
  const key = `${section.id}/${prompt.id}`;
  const current = next.choices[key] || [];
  // Choosing a new option replaces the oldest choice once the limit is reached;
  // responses already written for an unchosen option are kept, not scored.
  next.choices[key] = current.includes(optionId)
    ? current
    : [...current, optionId].slice(-prompt.choose);
  return touch(next, now);
}

export function responseFields(option) {
  if ((option.exerciseType || "saq") === "saq")
    return option.parts.map((part) => ({
      id: part.id,
      label: `Part ${part.id.toUpperCase()}`,
      prompt: part.prompt,
      rows: 6,
    }));
  // Essays use the prompt's own fields: optional planning notes and the essay.
  return (option.responseFields || [{ id: "essay", label: "Essay", required: true }]).map(
    (field) => ({
      id: field.id,
      label: field.label,
      prompt: field.prompt || "",
      rows: field.rows || 12,
      required: field.required !== false,
    }),
  );
}

export function writeResponse(
  attempt,
  exam,
  { promptId, optionId, fieldId, text },
  now = Date.now(),
) {
  const section = currentSection(attempt, exam);
  if (attempt.status !== "section" || !section?.prompts) return attempt;
  const prompt = section.prompts.find((item) => item.id === promptId);
  const option = prompt?.options.find((item) => item.id === optionId);
  if (!option || !responseFields(option).some((field) => field.id === fieldId))
    return attempt;
  const next = clone(attempt);
  const key = responseKey(section.id, prompt.id, option.id);
  next.responses[key] = {
    ...(next.responses[key] || {}),
    [fieldId]: String(text ?? "").slice(0, MAX_RESPONSE_LENGTH),
  };
  return touch(next, now);
}

// Self-scoring criteria: one point per SAQ part, or the essay's rubric rows.
export function scoringCriteria(option) {
  if ((option.exerciseType || "saq") === "saq")
    return option.parts.map((part) => ({
      id: part.id,
      label: `Part ${part.id.toUpperCase()}`,
      points: 1,
      description: (part.criteria || []).join(" "),
    }));
  return (option.rubric || []).map((row) => ({
    id: row.id,
    label: row.label,
    points: row.points,
    // Course rubrics name this field guidance; description is accepted too.
    description: row.guidance || row.description || "",
  }));
}

export function setScore(attempt, exam, { key, criterionId, points }, now = Date.now()) {
  if (attempt.status !== "finished") return attempt;
  const [sectionId, promptId, optionId] = String(key).split("/");
  const section = exam.sections.find((item) => item.id === sectionId);
  const prompt = section?.prompts?.find((item) => item.id === promptId);
  const option = prompt?.options.find((item) => item.id === optionId);
  const criterion =
    option && scoringCriteria(option).find((row) => row.id === criterionId);
  if (!criterion || !chosenOptions(attempt, section, prompt).includes(option))
    return attempt;
  const next = clone(attempt);
  const value = Number(points);
  next.scores[key] = { ...(next.scores[key] || {}) };
  if (points === "" || points === null || !Number.isFinite(value))
    delete next.scores[key][criterionId];
  else
    next.scores[key][criterionId] = Math.min(
      Math.max(Math.round(value), 0),
      criterion.points,
    );
  return touch(next, now);
}

const hasText = (response) =>
  Object.values(response || {}).some((value) => String(value).trim().length > 0);

// A full scoring summary. Multiple choice is scored automatically; writing uses
// the student's own rubric scores, and blank or unchosen work earns zero.
export function scoreSheet(attempt, exam) {
  const sections = exam.sections.map((section) => {
    if (section.kind === "mcq") {
      const skills = new Map();
      let correct = 0;
      const questions = section.questions.map((question) => {
        const selected = attempt.mcq.answers[question.id];
        const isCorrect = selected === question.correctAnswer;
        if (isCorrect) correct += 1;
        const label = question.skillLabel || "Other";
        const skill = skills.get(label) || {
          label,
          code: question.skillCode || "",
          correct: 0,
          total: 0,
        };
        skill.total += 1;
        if (isCorrect) skill.correct += 1;
        skills.set(label, skill);
        return {
          id: question.id,
          selected: Number.isInteger(selected) ? selected : null,
          correct: isCorrect,
          flagged: Boolean(attempt.mcq.flags[question.id]),
        };
      });
      return {
        id: section.id,
        kind: section.kind,
        weight: section.weight,
        points: correct,
        maxPoints: section.questions.length,
        complete: true,
        questions,
        skills: [...skills.values()].sort((a, b) =>
          String(a.code).localeCompare(String(b.code)),
        ),
      };
    }
    const items = section.prompts.flatMap((prompt) => {
      const chosen = chosenOptions(attempt, section, prompt);
      const perOption = prompt.maxPoints / prompt.choose;
      const slots = [...chosen];
      // An unchosen slot still counts against the section total.
      while (slots.length < prompt.choose) slots.push(null);
      return slots.map((option, index) => {
        if (!option)
          return {
            key: `${section.id}/${prompt.id}/missing-${index}`,
            promptId: prompt.id,
            option: null,
            maxPoints: perOption,
            points: 0,
            answered: false,
            complete: true,
          };
        const key = responseKey(section.id, prompt.id, option.id);
        const answered = hasText(attempt.responses[key]);
        const criteria = scoringCriteria(option);
        const scored = attempt.scores[key] || {};
        const complete = !answered || criteria.every((row) => row.id in scored);
        const points = answered
          ? criteria.reduce((sum, row) => sum + (scored[row.id] || 0), 0)
          : 0;
        return {
          key,
          promptId: prompt.id,
          option,
          maxPoints: perOption,
          points,
          answered,
          complete,
        };
      });
    });
    return {
      id: section.id,
      kind: section.kind,
      weight: section.weight,
      points: items.reduce((sum, item) => sum + item.points, 0),
      maxPoints: section.maxPoints,
      complete: items.every((item) => item.complete),
      items,
    };
  });
  const weighted = sections.reduce(
    (sum, section) =>
      sum +
      (section.maxPoints ? (section.points / section.maxPoints) * section.weight : 0),
    0,
  );
  return {
    sections,
    weightedPercent: Math.round(weighted * 10) / 10,
    complete: sections.every((section) => section.complete),
  };
}

export function formatClock(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${seconds}`
    : `${minutes}:${seconds}`;
}

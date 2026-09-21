import { escapeHtml as esc, link, breadcrumbs } from "./ui.js";

function dateLabel(value) {
  if (!value) return "Date not recorded";
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Date not recorded"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function attemptState(attempt) {
  if (attempt.status === "complete" || attempt.complete) return "Complete";
  if (attempt.status === "abandoned") return "Abandoned";
  return "In progress";
}

function provenanceLabel(attempt, index, groupSize) {
  if (attempt.provenance?.kind === "legacy-migration") return "Earlier saved attempt";
  if (attempt.provenance?.kind === "imported") return "Imported attempt";
  if (attempt.selectionKind === "review" || attempt.mode === "weak")
    return "Review session";
  return index === groupSize - 1
    ? "First recorded attempt in this browser"
    : "Repeat attempt";
}

function resultLabel(attempt) {
  if (attempt.status !== "complete" && !attempt.complete) return "";
  if (Number.isInteger(attempt.questionCount)) {
    if (attempt.scoreKnown === false || !Number.isInteger(attempt.correct))
      return "Result not available for this saved record.";
    return `${attempt.correct} / ${attempt.questionCount} correct · ${Math.round((attempt.correct / Math.max(attempt.questionCount, 1)) * 100)}%${attempt.unanswered ? ` · ${attempt.unanswered} unanswered` : ""}`;
  }
  const ids = attempt.orderedQuestionIds || attempt.ids || [];
  const questions = Object.fromEntries(
    (attempt.questionSnapshot?.questions || []).map((question) => [
      question.id,
      question,
    ]),
  );
  if (!ids.length || ids.some((id) => !Number.isInteger(questions[id]?.correctAnswer)))
    return "Result not available for this saved record.";
  let answered = 0;
  let correct = 0;
  for (const id of ids) {
    const response =
      attempt.responses?.[id] ||
      (Object.hasOwn(attempt.answers || {}, id)
        ? { selectedChoiceIndex: attempt.answers[id] }
        : null);
    const selected = Number.isInteger(response?.selectedChoiceIndex)
      ? response.selectedChoiceIndex
      : response?.selected;
    if (!Number.isInteger(selected)) continue;
    answered += 1;
    if (selected === questions[id]?.correctAnswer) correct += 1;
  }
  return `${correct} / ${ids.length} correct · ${Math.round((correct / Math.max(ids.length, 1)) * 100)}%${answered < ids.length ? ` · ${ids.length - answered} unanswered` : ""}`;
}

export function historyPage({ courses = [], attempts = [], courseId = "", quizId = "" }) {
  const course = courses.find((item) => item.id === courseId);
  const filtered = attempts.filter(
    (attempt) =>
      (!courseId || attempt.courseId === courseId) &&
      (!quizId || attempt.quizId === quizId),
  );
  const groups = new Map();
  for (const attempt of filtered) {
    const key = attempt.quizId || attempt.activityId || "unknown";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(attempt);
  }
  for (const group of groups.values())
    group.sort(
      (left, right) =>
        new Date(right.completedAt || right.startedAt || 0) -
        new Date(left.completedAt || left.startedAt || 0),
    );
  const rows = [...groups.values()]
    .flatMap((group) =>
      group.map((attempt, index) => ({ attempt, index, groupSize: group.length })),
    )
    .sort(
      (left, right) =>
        new Date(right.attempt.completedAt || right.attempt.startedAt || 0) -
        new Date(left.attempt.completedAt || left.attempt.startedAt || 0),
    );
  return `<div class="history-page"><div class="history-inner">
    ${breadcrumbs([["Courses", "/courses"], [course?.shortTitle || "History", course ? `/course/${course.id}` : ""], ["History"]])}
    <header class="history-heading"><p class="eyebrow">LOCAL STUDY RECORDS</p><h1>Attempt history</h1><p>See what you did in this browser. These records are personal study notes, not official grades or a secure exam record.</p></header>
    <nav class="history-filters" aria-label="History course filter"><span>Course:</span>${link("/history", "All courses", !courseId ? "active" : "text-link")}${courses
      .filter((item) => item.status === "ready")
      .map((item) =>
        link(
          `/history?course=${encodeURIComponent(item.id)}`,
          item.shortTitle,
          item.id === courseId ? "active" : "text-link",
        ),
      )
      .join("")}</nav>
    <p class="history-limit-note">Different question sets are shown separately and are not compared automatically.</p>
    ${
      rows.length
        ? `<div class="history-list" role="list">${rows
            .map(({ attempt, index, groupSize }) => {
              const quiz = attempt.quizId || attempt.activityId || "activity";
              const href =
                attempt.status === "complete" || attempt.complete
                  ? `/results/${quiz}?attempt=${encodeURIComponent(attempt.attemptId || quiz)}`
                  : `/quiz/${quiz}?attempt=${encodeURIComponent(attempt.attemptId || quiz)}`;
              const action =
                attempt.status === "complete" || attempt.complete
                  ? "View results"
                  : attempt.status === "abandoned"
                    ? "Continue"
                    : "Resume";
              const mode = attempt.feedbackMode === "test" ? "Test" : "Practice";
              const questionCount =
                attempt.questionCount ??
                (attempt.orderedQuestionIds || attempt.ids || []).length;
              const answered =
                attempt.answered ??
                (attempt.responses
                  ? Object.keys(attempt.responses).length
                  : Object.keys(attempt.answers || {}).length);
              return `<article class="history-item" role="listitem"><div class="history-item-heading"><div><p class="eyebrow">${esc(provenanceLabel(attempt, index, groupSize))}</p><h2>${esc(attempt.activityTitle || attempt.quizTitle || quiz)}</h2></div><span class="pill">${esc(attemptState(attempt))}</span></div><p class="history-meta">${esc(mode)} · ${attempt.selectionKind === "review" ? "Review session" : "Full selected set"} · ${dateLabel(attempt.completedAt || attempt.startedAt)}</p><p class="history-result">${esc(resultLabel(attempt) || `${questionCount} questions · ${answered} selected`)}</p>${link(href, `${action} →`, "btn secondary")}</article>`;
            })
            .join("")}</div>`
        : `<div class="empty-state"><h2>No saved attempts here yet.</h2><p>Finish or pause a quiz and its local record will appear in this history.</p>${link(course ? `/course/${course.id}` : "/courses", course ? "Return to course" : "Browse courses", "btn")}</div>`
    }
  </div></div>`;
}

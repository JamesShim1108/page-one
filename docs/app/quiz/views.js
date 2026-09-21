import {
  escapeHtml as esc,
  link,
  arrow,
  quizButton,
  breadcrumbs,
  contextCrumbs,
} from "../ui.js";
import { renderBlocks } from "../blocks.js";
import { reportButton, sharePanel } from "../share/views.js";

function responseSelected(response) {
  return Number.isInteger(response?.selectedChoiceIndex)
    ? response.selectedChoiceIndex
    : Number.isInteger(response?.selected)
      ? response.selected
      : null;
}

function pageCrumbs(data, tail) {
  return data.breadcrumbs
    ? breadcrumbs([...data.breadcrumbs, [tail]])
    : breadcrumbs(contextCrumbs(data, tail));
}

function routeFor(routes, kind, fallback, ...args) {
  return typeof routes?.[kind] === "function" ? routes[kind](...args) : fallback;
}

function questionLabel(index) {
  return String.fromCharCode(65 + index);
}

function choiceText(choice) {
  return choice && typeof choice === "object"
    ? choice.text || choice.label || ""
    : String(choice ?? "");
}

function navigatorView(attempt, engine) {
  const states = engine.navigatorState(attempt);
  const testMode = attempt.feedbackMode === "test";
  return `<section class="question-navigator" aria-labelledby="question-navigator-title">
    <div class="question-navigator-heading"><h2 id="question-navigator-title">Questions</h2><span>${states.filter((state) => state.answered).length} selected · ${states.filter((state) => state.flagged).length} flagged</span></div>
    <div class="question-navigator-grid" role="list">
      ${states
        .map((state) => {
          const classes = [
            state.current ? "current" : "",
            state.answered ? "answered" : "unanswered",
            state.checked && !testMode ? "checked" : "",
            state.flagged ? "flagged" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const label = [
            `Question ${state.number}`,
            state.current ? "current" : "",
            state.answered ? "answered" : "unanswered",
            state.checked && !testMode ? "checked" : "",
            state.flagged ? "flagged" : "",
          ]
            .filter(Boolean)
            .join(", ");
          return `<button type="button" class="question-nav-item ${classes}" role="listitem" data-action="jump" data-quiz="${esc(attempt.quizId)}" data-question="${esc(state.id)}" aria-label="${esc(label)}" aria-current="${state.current ? "step" : "false"}">${state.number}${state.flagged ? '<span aria-hidden="true"> ⚑</span>' : ""}</button>`;
        })
        .join("")}
    </div>
    <p class="question-navigator-legend"><span>Unanswered</span><span>Selected</span>${testMode ? "" : "<span>Checked</span>"}<span>⚑ Review later</span></p>
    <div class="question-navigator-actions">
      ${quizButton("Go to first unanswered", "first-unanswered", attempt.quizId, { secondary: true })}
      ${quizButton("Go to next flagged", "next-flagged", attempt.quizId, { secondary: true })}
    </div>
  </section>`;
}

export function questionView(attempt, engine, assets, quick = false, ui = {}) {
  if (!attempt) return "";
  const id = attempt.currentQuestionId || attempt.ids[attempt.index];
  const question = engine.questionForAttempt(attempt, id);
  if (!question) return "";
  const response = engine.responseFor(attempt, id);
  const selected = responseSelected(response);
  const checked = response?.feedbackRevealed === true;
  const correct = checked && engine.isCorrect(attempt, id);
  const progress = engine.progress(attempt);
  const heading = quick ? "h3" : "h1";
  const concept = engine.concepts[`${question.topicId}/${question.concept}`];
  const choices = engine.displayedChoices(attempt, id);
  const canFinish = attempt.index === attempt.ids.length - 1;
  const isPractice = attempt.feedbackMode === "practice";
  const feedback =
    checked && isPractice
      ? `<div class="answer-feedback ${correct ? "" : "wrong"}" id="answer-feedback" tabindex="-1" role="status">
        <h4>${correct ? "✓ Correct" : "✗ Incorrect"}</h4>
        ${correct ? "" : `<p><strong>Correct answer:</strong> ${questionLabel(question.correctAnswer)}. ${esc(choiceText(question.choices[question.correctAnswer]))}</p>`}
        <p><strong>Why:</strong> ${esc(question.explanation)}</p>
        ${question.choiceExplanations ? `<details class="choice-explanations"><summary>Why each choice fits or misses</summary><ul>${question.choiceExplanations.map((explanation, index) => `<li><strong>${questionLabel(index)}.</strong> ${esc(explanation)}</li>`).join("")}</ul></details>` : ""}
      </div>`
      : "";
  const choiceMarkup = choices
    .map((choice) => choiceView(choice, question, selected, attempt, checked, engine, id))
    .join("");
  const prompt = question.prompt || question.text || "";
  const stimulus = question.stimulus
    ? `<div class="stimulus"><p class="eyebrow">Practice scenario · Written for this quiz</p><p>${esc(question.stimulus)}</p></div>`
    : "";
  const stimulusBlocks = question.stimulusBlocks
    ? renderBlocks(question.stimulusBlocks, assets || attempt.questionSnapshot?.assets)
    : "";
  const instruction = isPractice
    ? checked
      ? "Read the explanation before continuing."
      : "Choose an answer, then check it."
    : selected === null
      ? "Choose an answer. You can change it before finishing."
      : "Your choice is saved. Correctness stays hidden until you finish.";
  const primaryAction =
    checked || !isPractice
      ? quizButton(
          canFinish ? "Review and finish" : `Next question ${arrow}`,
          canFinish ? "review-finish" : "next",
          attempt.quizId,
          { questionId: id },
        )
      : '<button class="btn" type="submit" disabled>Check answer</button>';
  const secondaryAction = canFinish
    ? !checked && isPractice
      ? quizButton("Review and finish", "review-finish", attempt.quizId, {
          secondary: true,
          questionId: id,
        })
      : ""
    : quizButton(
        selected === null ? "Skip this question" : "Next",
        "next",
        attempt.quizId,
        {
          secondary: true,
          questionId: id,
        },
      );
  const confidence = attempt.confidence?.[id] === "unsure";
  const flagLabel = attempt.flags?.[id] ? "Clear review flag" : "Review later";
  const eliminationIds = attempt.eliminatedChoiceIds?.[id] || [];
  const notice = ui.notice
    ? `<p class="quiz-notice" role="status">${esc(ui.notice)}</p>`
    : "";
  const reportContext =
    typeof ui.reportContext === "function"
      ? ui.reportContext(question, id)
      : ui.reportContext;
  return `${notice}<div class="quiz-progress"><span>${quick ? "Quick check" : "Question"} ${attempt.index + 1} of ${attempt.ids.length}</span><span>${progress.selected} selected · ${progress.unanswered} unanswered</span></div>
    <div class="progress-track" role="progressbar" aria-label="Questions selected" aria-valuenow="${progress.selected}" aria-valuemin="0" aria-valuemax="${attempt.ids.length}">
      <div class="progress-fill" style="width:${(progress.selected / attempt.ids.length) * 100}%"></div>
    </div>
    ${navigatorView(attempt, engine)}
    <form class="question-card" data-quiz="${esc(attempt.quizId)}" data-question="${esc(id)}">
      <p class="question-meta">${esc(concept?.title || question.concept || "Practice")} · ${esc(question.skillTag || "Reviewing a question")}</p>
      ${stimulus}${stimulusBlocks}
      <${heading} id="question-heading">${esc(prompt)}</${heading}>
      <fieldset class="choices" aria-labelledby="question-heading"><legend class="visually-hidden">Choose one answer</legend>
        ${choiceMarkup}
      </fieldset>
      ${eliminationIds.length ? `<button type="button" class="text-link elimination-reset" data-action="reset-eliminations" data-quiz="${esc(attempt.quizId)}" data-question="${esc(id)}">Clear eliminated choices</button>` : ""}
      <div class="question-self-report"><button type="button" class="btn secondary question-flag" data-action="toggle-flag" data-quiz="${esc(attempt.quizId)}" data-question="${esc(id)}" aria-pressed="${attempt.flags?.[id] ? "true" : "false"}">${flagLabel}</button>
        <label><input type="checkbox" data-question-confidence="unsure" data-quiz="${esc(attempt.quizId)}" data-question="${esc(id)}" ${confidence ? "checked" : ""} ${checked ? "disabled" : ""}> I guessed / Not sure</label>
        ${reportContext ? reportButton(reportContext) : ""}
      </div>
      ${feedback}
      <div class="question-actions"><p>${instruction}</p><div class="question-action-buttons">${attempt.index > 0 ? quizButton("Previous", "previous", attempt.quizId, { secondary: true, questionId: id }) : ""}${primaryAction}${secondaryAction}</div></div>
    </form>`;
}

function choiceView(choice, question, selected, attempt, checked, engine, questionId) {
  const selectedHere = selected === choice.originalIndex;
  const correct =
    checked &&
    attempt.feedbackMode === "practice" &&
    choice.originalIndex === question.correctAnswer;
  const eliminated = engine.isEliminated(attempt, questionId, choice.originalIndex);
  const disabledElimination = selectedHere ? "disabled" : "";
  return `<div class="choice-row ${eliminated ? "is-eliminated" : ""}"><label class="choice ${correct ? "correct" : selectedHere && checked ? "incorrect" : ""}">
    <input type="radio" name="answer" value="${choice.displayedIndex}" ${selectedHere ? "checked" : ""} ${checked ? "disabled" : ""}>
    <span class="choice-letter" aria-hidden="true">${questionLabel(choice.displayedIndex)}</span>
    <span><span class="visually-hidden">${questionLabel(choice.displayedIndex)}. </span>${esc(choice.text)}</span>
    ${correct ? '<span class="answer-mark">✓ Correct</span>' : selectedHere && checked ? '<span class="answer-mark">✗ Your answer</span>' : ""}
  </label><button type="button" class="elimination-control" data-action="toggle-elimination" data-quiz="${esc(attempt.quizId)}" data-question="${esc(questionId)}" data-choice="${choice.originalIndex}" aria-pressed="${eliminated ? "true" : "false"}" ${disabledElimination}>${eliminated ? "Restore choice" : selectedHere ? "Selected" : "Eliminate"}</button>${eliminated ? '<span class="elimination-state">Eliminated</span>' : ""}</div>`;
}

function finishPreviewView(attempt, engine) {
  const progress = engine.progress(attempt);
  return `<section class="finish-preview" aria-labelledby="finish-preview-title">
    <h2 id="finish-preview-title">Review before finishing</h2>
    <p>${progress.selected} selected, ${progress.unanswered} unanswered, and ${progress.flagged} flagged out of ${progress.total} questions.</p>
    ${progress.unchecked ? `<p class="muted">${progress.unchecked} practice selection${progress.unchecked === 1 ? " is" : "s are"} not checked yet. They will be scored when you finish.</p>` : ""}
    <div class="actions"><button type="button" class="btn secondary" data-action="close-finish" data-quiz="${esc(attempt.quizId)}">Return to quiz</button>
      ${progress.unanswered ? quizButton("Go to first unanswered", "first-unanswered", attempt.quizId, { secondary: true }) : ""}
      ${progress.flagged ? quizButton("Review flagged", "next-flagged", attempt.quizId, { secondary: true }) : ""}
      ${quizButton(progress.unanswered ? "Finish with unanswered questions" : "Finish", progress.unanswered ? "finish-blank" : "finish", attempt.quizId)}</div>
  </section>`;
}

export function quizPage(data, attempt, engine, storageState, conflict = null, ui = {}) {
  const { quiz, unit, topic } = data;
  const routes = ui.routes || data.routes || {};
  const label = topic ? `Topic ${topic.code}` : `Unit ${unit.number}`;
  const sharePath = routeFor(routes, "share", `/quiz/${quiz.id}`, quiz.id);
  const printLink = link(
    `/print?course=${encodeURIComponent(data.course?.id || quiz.courseId || "")}&kind=quiz&quiz=${encodeURIComponent(quiz.id)}`,
    "Print preview",
    "text-link",
  );
  const questionReportContext = (question, questionId) => ({
    type: "question",
    courseId: data.course?.id || quiz.courseId || attempt?.courseId || "",
    topicId: question.topicId || topic?.id || "",
    itemId: questionId,
    title: question.prompt || question.text || "Practice question",
    revision: data.contentRevision || attempt?.contentRevision || "",
    path: sharePath,
  });
  if (attempt?.status === "complete" || attempt?.complete)
    return resultsPage(data, attempt, engine, { routes });
  if (attempt?.status === "abandoned")
    return `<div class="quiz-page">${pageCrumbs(data, "Paused attempt")}<div class="empty-state quiz-paused">
      <p class="eyebrow">${esc(label)} · ${attempt.feedbackMode === "test" ? "Test" : "Practice"}</p><h1>This attempt is paused.</h1>
      <p>Your selected answers and question order are still saved in this browser. Continue this attempt or start a separate one.</p>${sharePanel({ path: sharePath, title: quiz.title, label: "Share this quiz without answers." })}${printLink}
      <div class="actions"><button type="button" class="btn" data-action="continue" data-quiz="${esc(quiz.id)}">Continue attempt ${arrow}</button>${quizButton("Start new attempt", "start-practice", quiz.id, { secondary: true })}</div>
      ${link(routeFor(routes, "history", `/history?course=${encodeURIComponent(attempt.courseId || quiz.courseId || "")}&quiz=${encodeURIComponent(quiz.id)}`, attempt.courseId || quiz.courseId || "", quiz.id), "Other attempts", "text-link")}
    </div></div>`;
  if (!attempt)
    return `<div class="quiz-page">${pageCrumbs(data, "Quiz")}<div class="empty-state">
    <p class="eyebrow">${esc(label)}</p><h1>Ready when you are.</h1>
    <p>${quiz.questionIds.length} questions, one at a time. Choose whether you want feedback as you go or at the end.</p>${sharePanel({ path: sharePath, title: quiz.title, label: "Share this quiz without answers." })}${printLink}
    <div class="quiz-mode-grid" aria-label="Choose quiz mode">
      <div class="quiz-mode-card"><h2>Practice</h2><p>Check each answer and read the existing explanation before moving on.</p>${quizButton(`Start Practice ${arrow}`, "start-practice", quiz.id)}</div>
      <div class="quiz-mode-card"><h2>Test</h2><p>Save editable choices and see correctness only after you finish.</p>${quizButton(`Start Test ${arrow}`, "start-test", quiz.id, { secondary: true })}</div>
    </div>
    ${quiz.quizType === "unit" ? "<p>This review reuses selected topic-quiz questions.</p>" : ""}
  </div></div>`;
  const storageNote =
    storageState === "conflict"
      ? `<aside id="quiz-storage-note" class="storage-conflict note" role="alert"><strong>This attempt changed in another tab.</strong><p>Your current answers were not merged with the saved attempt. Choose a version before saving again.</p><div class="actions">${conflict?.remoteRecord ? `<button type="button" class="btn secondary" data-action="resolve-conflict" data-quiz="${esc(quiz.id)}">Use saved attempt</button>` : ""}<button type="button" class="btn secondary" data-action="keep-conflict" data-quiz="${esc(quiz.id)}">Keep this attempt separate</button></div></aside>`
      : "";
  const saveNote =
    storageState === "saved"
      ? "Answers saved in this browser as you work."
      : storageState === "temporary"
        ? "Answers are kept for this tab or browser session only."
        : storageState === "failed"
          ? "Quiz progress could not be saved. Keep this page open and copy important work."
          : "Your answers will save in this browser as you work.";
  const modeLabel = attempt.feedbackMode === "test" ? "Test mode" : "Practice mode";
  const backPath = routeFor(
    routes,
    "back",
    topic ? `/topic/${topic.id}` : `/unit/${unit.id}`,
  );
  const historyPath = routeFor(
    routes,
    "history",
    `/history?course=${encodeURIComponent(attempt.courseId || quiz.courseId || "")}&quiz=${encodeURIComponent(quiz.id)}`,
    attempt.courseId || quiz.courseId || "",
    quiz.id,
  );
  return `<div class="quiz-page">${pageCrumbs(data, attempt.selectionKind === "review" ? "Targeted practice" : "Quiz")}
    <div class="quiz-context"><p>${esc(modeLabel)} · ${attempt.selectionKind === "review" ? "Review session" : esc(quiz.title)}<br>No timer. Focus on the reasoning.</p>
      <span>${link(backPath, topic ? "Back to lesson" : "Back to session")} · ${link(historyPath, "Other attempts")}</span>
    </div>${sharePanel({ path: sharePath, title: quiz.title, label: "Share this quiz. This opens the activity without answers." })}${printLink}${storageNote}<div id="quiz-shell">${questionView(attempt, engine, data.bank.assets, false, { ...ui, reportContext: questionReportContext })}</div>${ui.finishOpen ? finishPreviewView(attempt, engine) : ""}
    <p class="question-footnote">${saveNote}</p>
  </div>`;
}

function resultFilterValue(value) {
  return ["incorrect", "unanswered", "flagged", "uncertain"].includes(value) ? value : "";
}

function resultDate(value) {
  if (!value) return "Date not recorded";
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Date not recorded"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function resultPath(quizId, attemptId, filters = [], topic = "", routes = {}) {
  const params = new URLSearchParams({ attempt: attemptId });
  if (filters.length) params.set("filter", filters.join(","));
  if (topic) params.set("topic", topic);
  return routeFor(
    routes,
    "results",
    `/results/${quizId}?${params}`,
    quizId,
    attemptId,
    filters,
    topic,
  );
}

function reviewReasonSet(attempt, questionId, engine) {
  const response = engine.responseFor(attempt, questionId);
  const selected = responseSelected(response);
  const reasons = [];
  if (!Number.isInteger(selected)) reasons.push("unanswered");
  else if (!engine.isCorrect(attempt, questionId)) reasons.push("incorrect");
  if (attempt.flags?.[questionId] === true) reasons.push("flagged");
  if (attempt.confidence?.[questionId]) reasons.push("uncertain");
  return reasons;
}

function matchesReviewFilters(attempt, questionId, engine, filters, topic) {
  const question = engine.questionForAttempt(attempt, questionId);
  if (topic && question?.topicId !== topic) return false;
  if (!filters.length) return true;
  const reasons = reviewReasonSet(attempt, questionId, engine);
  return filters.some((filter) => reasons.includes(filter));
}

function filterLinks(data, attempt, filters, topic, routes = {}) {
  const values = ["", "incorrect", "unanswered", "flagged", "uncertain"];
  return values
    .map((value) => {
      const next = value
        ? filters.includes(value)
          ? filters.filter((item) => item !== value)
          : [...filters, value]
        : [];
      const path = resultPath(data.quiz.id, attempt.attemptId, next, topic, routes);
      const label = value ? value[0].toUpperCase() + value.slice(1) : "All";
      const className =
        (!value && !filters.length) || (value && filters.includes(value))
          ? "active"
          : "text-link";
      return link(path, label, className);
    })
    .join("");
}

function resultQuestionView(
  data,
  attempt,
  engine,
  questionId,
  index,
  returnPath,
  sharePath,
) {
  const question = engine.questionForAttempt(attempt, questionId);
  if (!question) return "";
  const response = engine.responseFor(attempt, questionId);
  const selected = responseSelected(response);
  const correct = engine.isCorrect(attempt, questionId);
  const selectedText = Number.isInteger(selected)
    ? choiceText(question.choices[selected])
    : "No answer selected.";
  const correctText = choiceText(question.choices[question.correctAnswer]);
  const topicPath = question.topicId
    ? `/topic/${question.topicId}${question.concept ? `?section=${encodeURIComponent(question.concept)}` : ""}`
    : "";
  const lessonPath =
    topicPath && returnPath
      ? `${topicPath}&return=${encodeURIComponent(returnPath)}`
      : topicPath;
  const status = correct
    ? "Correct"
    : Number.isInteger(selected)
      ? "Incorrect"
      : "Unanswered";
  const reasonLabels = reviewReasonSet(attempt, questionId, engine)
    .map((value) => value[0].toUpperCase() + value.slice(1))
    .join(" · ");
  return `<details class="review-question" id="review-${esc(questionId)}"><summary><span>${correct ? "✓" : Number.isInteger(selected) ? "✗" : "○"} ${index + 1}. ${esc(question.prompt)}</span><span class="review-question-state">${status}${reasonLabels ? ` · ${esc(reasonLabels)}` : ""}</span></summary>
    <p><strong>Your answer:</strong> ${esc(selectedText)}</p>
    <p><strong>Correct answer:</strong> ${esc(correctText)}</p>
    <p><strong>Explanation:</strong> ${esc(question.explanation || "No explanation was saved with this attempt.")}</p>${reportButton({ type: "result-question", courseId: data.course?.id || attempt.courseId || data.quiz.courseId || "", topicId: question.topicId || "", itemId: questionId, title: question.prompt, revision: attempt.contentRevision || data.contentRevision || "", path: sharePath })}
    ${lessonPath ? link(lessonPath, `Review this lesson ${arrow}`, "text-link") : ""}
  </details>`;
}

function reviewPlanView(data, attempt, engine, plan, returnPath) {
  const sections = plan.sections
    .map((section) => {
      const path = `${section.path}${section.path.includes("?") ? "&" : "?"}return=${encodeURIComponent(returnPath)}`;
      return `<li><strong>${esc(section.title)}</strong><span>${esc(section.reason)}</span>${link(path, `Read this section ${arrow}`, "text-link")}</li>`;
    })
    .join("");
  const questions = plan.questions
    .map((item) => {
      const question = engine.questionForAttempt(attempt, item.id);
      return question
        ? `<li><span>${esc(question.prompt)}</span><span class="muted">${esc(item.reason)}</span></li>`
        : "";
    })
    .join("");
  const start = plan.questionIds.length
    ? `<button type="button" class="btn" data-action="start-review" data-quiz="${esc(data.quiz.id)}" data-question-ids="${esc(plan.questionIds.join(","))}">Practice these questions ${arrow}</button>`
    : "";
  if (!sections && !questions)
    return `<section class="review-plan"><h2>Choose your next step</h2><p>No unanswered, incorrect, uncertain, or flagged questions were recorded in this attempt.</p></section>`;
  return `<section class="review-plan" aria-labelledby="review-plan-title"><p class="eyebrow">A SMALL NEXT STEP</p><h2 id="review-plan-title">Review a few things, then stop.</h2>
    <p>This plan uses only existing lesson sections and questions from this attempt.</p>
    ${sections ? `<h3>Reading</h3><ul>${sections}</ul>` : ""}
    ${questions ? `<h3>Practice</h3><ul>${questions}</ul>${start}` : ""}
  </section>`;
}

export function resultsPage(
  data,
  attempt,
  engine,
  { filters = [], topicFilter = "", routes = {} } = {},
) {
  const { quiz, unit, topic } = data;
  if (!attempt || (attempt.status !== "complete" && !attempt.complete)) {
    const continuePath = routeFor(
      routes,
      "quiz",
      `/quiz/${quiz.id}?attempt=${encodeURIComponent(attempt?.attemptId || "")}`,
      quiz.id,
      attempt?.attemptId || "",
    );
    return `<div class="results-wrap">${pageCrumbs(data, "Results")}<div class="empty-state">
    <h1>${attempt ? "Finish your quiz first." : "Start with a quiz."}</h1>
    <p>${attempt ? "Continue where you left off." : "There are no completed results in this tab yet."}</p>
    ${attempt ? link(continuePath, `Continue quiz ${arrow}`, "btn") : quizButton(`Start Practice ${arrow}`, "start-practice", quiz.id)}
  </div></div>`;
  }
  const result = engine.summarize(attempt);
  const label = topic ? `Topic ${topic.code}` : `Unit ${unit.number}`;
  const activeFilters = [
    ...new Set(
      (Array.isArray(filters) ? filters : String(filters).split(","))
        .map(resultFilterValue)
        .filter(Boolean),
    ),
  ];
  const currentResultPath = resultPath(
    quiz.id,
    attempt.attemptId,
    activeFilters,
    topicFilter,
    routes,
  );
  const reviewIds = attempt.ids.filter((id) =>
    matchesReviewFilters(attempt, id, engine, activeFilters, topicFilter),
  );
  const plan = engine.reviewPlan(attempt);
  const clearPath = resultPath(quiz.id, attempt.attemptId, [], topicFilter, routes);
  const reviewPath = routeFor(
    routes,
    "review",
    topic
      ? `/topic/${topic.id}?section=connections`
      : unit.hasGuide
        ? `/guide/${unit.id}`
        : `/unit/${unit.id}`,
  );
  const historyPath = routeFor(
    routes,
    "history",
    `/history?course=${encodeURIComponent(attempt.courseId || quiz.courseId || "")}&quiz=${encodeURIComponent(quiz.id)}`,
    attempt.courseId || quiz.courseId || "",
    quiz.id,
  );
  const sharePath = routeFor(routes, "share", `/quiz/${quiz.id}`, quiz.id);
  return `<div class="results-wrap">${pageCrumbs(data, "Results")}
    <header class="result-head"><p class="eyebrow">${attempt.selectionKind === "review" ? "Targeted practice" : esc(label)} · ${attempt.feedbackMode === "test" ? "Test" : "Practice"} results</p>
      <div class="result-score" aria-label="${result.correct} out of ${result.total} correct">${result.correct}<span> / ${result.total}</span></div>
      <p>${result.percent}% correct · ${result.answered} answered · ${result.total - result.answered} unanswered</p><p class="result-meta">Attempt date: ${esc(resultDate(attempt.completedAt || attempt.startedAt))} · Content revision: ${esc(attempt.contentRevision || "unknown")}</p><h1>Here is what this attempt shows.</h1>
      <p>Use the counts and saved explanations to choose one small review step. This is a record of this attempt, not an official grade.</p>${sharePanel({ path: sharePath, title: quiz.title, label: "This opens the quiz, without your answers." })}${reportButton({ type: "results", courseId: data.course?.id || attempt.courseId || quiz.courseId || "", topicId: topic?.id || "", itemId: quiz.id, title: quiz.title, revision: attempt.contentRevision || data.contentRevision || "", path: sharePath })}
    </header>
    ${attempt.selectionKind === "review" ? '<p class="result-explainer">These results cover only targeted practice. Untested areas are not assessed here.</p>' : ""}
    <section class="result-facts" aria-label="Attempt facts"><div><strong>${result.correct}</strong><span>Correct</span></div><div><strong>${result.incorrect}</strong><span>Incorrect</span></div><div><strong>${result.total - result.answered}</strong><span>Unanswered</span></div><div><strong>${Object.values(attempt.flags || {}).filter(Boolean).length}</strong><span>Flagged</span></div><div><strong>${Object.values(attempt.confidence || {}).filter(Boolean).length}</strong><span>Uncertain</span></div></section>
    <section class="result-filters" aria-labelledby="result-filter-title"><div class="section-heading"><h2 id="result-filter-title">Review answers</h2><span>${reviewIds.length} shown of ${attempt.ids.length}</span></div><nav aria-label="Filter review answers">${filterLinks(data, attempt, activeFilters, topicFilter, routes)}</nav>${activeFilters.length ? `${link(clearPath, "Clear filters", "text-link")}` : ""}</section>
    ${reviewIds.length ? `<section class="review-list">${reviewIds.map((id) => resultQuestionView(data, attempt, engine, id, attempt.ids.indexOf(id), currentResultPath, sharePath)).join("")}</section>` : `<div class="empty-state result-empty-state"><h2>No questions match these filters.</h2><p>Choose another filter or clear the current one.</p>${link(clearPath, "Show all answers", "btn secondary")}</div>`}
    ${reviewPlanView(data, attempt, engine, plan, currentResultPath)}
    <div class="actions">${link(reviewPath, `Review connections ${arrow}`, "btn")}
      ${quizButton("Start new attempt", "start-practice", quiz.id, { secondary: true })}
      ${unit.writingQuizzes.map((item) => link(`/writing/${item.id}`, "Try the writing quiz", "text-link")).join("")}
    </div><p class="reuse-note">A new attempt keeps this result unchanged. ${link(historyPath, "View other attempts", "text-link")}</p>
  </div>`;
}

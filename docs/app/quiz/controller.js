import { createQuizEngine } from "./engine.js";
import { questionView, quizPage, resultsPage } from "./views.js";

let preferredFeedbackMode = "practice";

export function createQuizController(
  data,
  store,
  {
    navigate,
    repaint = () => {},
    recent = null,
    attemptId = null,
    resultFilter = "",
    resultTopic = "",
    routes = null,
    attemptOptions = {},
  } = {},
) {
  const engine = createQuizEngine(data.bank);
  let notice = "";
  let selectedAttemptId = attemptId;
  let finishOpen = false;
  const resultFilters = [...new Set(String(resultFilter || "").split(","))].filter(
    (value) => ["incorrect", "unanswered", "flagged", "uncertain"].includes(value),
  );

  const pathFor = (kind, ...args) =>
    typeof routes?.[kind] === "function"
      ? routes[kind](...args)
      : kind === "share"
        ? `/quiz/${args[0]}`
        : kind === "results"
          ? `/results/${args[0]}?attempt=${encodeURIComponent(args[1])}`
          : `/quiz/${args[0]}?attempt=${encodeURIComponent(args[1])}`;

  const attempt = (id, explicitId = selectedAttemptId) =>
    store.get(id, engine, { attemptId: explicitId });

  function persist(current) {
    const result = store.save(current);
    return Promise.resolve(result).then((outcome) => {
      if (outcome === false || outcome?.ok === false) {
        notice =
          "This change is kept on this page, but could not be saved in this browser. Try again.";
      }
      return outcome;
    });
  }

  function touchRecent(current) {
    if (!recent || !current) return;
    const total = current.ids.length;
    const position = Math.min(current.index + 1, total);
    const complete = current.status === "complete" || current.complete === true;
    Promise.resolve(
      recent.touch({
        key: `quiz:${current.quizId}`,
        kind: "quiz",
        route: complete
          ? pathFor("results", current.quizId, current.attemptId)
          : pathFor("quiz", current.quizId, current.attemptId),
        courseId: data.course?.id || current.courseId,
        title: data.quiz.title,
        detail: complete ? "View results" : `Question ${position} of ${total}`,
        active: current.status === "active" && !complete,
        status: complete ? "complete" : current.status,
      }),
    ).catch(() => {});
  }

  function start(
    quizId,
    feedbackMode = preferredFeedbackMode,
    selectionKind = "topic",
    questionIds = null,
  ) {
    if (feedbackMode === "weak") {
      selectionKind = "review";
      feedbackMode = "practice";
    }
    const prior = attempt(quizId);
    if (selectionKind === "review" && (!prior || prior.status !== "complete"))
      return null;
    const ids =
      selectionKind === "review"
        ? questionIds?.length
          ? questionIds
          : engine.weakQuestionIds(prior)
        : questionIds;
    const next = engine.createAttempt(quizId, ids, {
      selectionKind,
      feedbackMode,
      ...(selectionKind === "review" && prior
        ? {
            parentAttemptId: prior.attemptId,
            provenance: { kind: "review", parentAttemptId: prior.attemptId },
          }
        : {}),
      ...(typeof attemptOptions === "function"
        ? attemptOptions({ quizId, feedbackMode, selectionKind })
        : attemptOptions),
    });
    if (!next) return null;
    preferredFeedbackMode = feedbackMode;
    selectedAttemptId = next.attemptId;
    persist(next).then(() => touchRecent(next));
    return next;
  }

  function expose(current = attempt(data.quiz.id)) {
    if (!current || !engine.markExposed(current)) return false;
    persist(current).then(() => touchRecent(current));
    return true;
  }

  function quickView(quiz) {
    const current = attempt(quiz.id);
    const reportContext = (question, questionId) => ({
      type: "question",
      courseId: data.course?.id || data.quiz?.courseId || "",
      topicId: question.topicId || data.lesson?.id || "",
      itemId: questionId,
      title: question.prompt || question.text || "Practice question",
      revision: data.contentRevision || "",
      path: data.lesson?.id
        ? `/topic/${data.lesson.id}?section=practice`
        : pathFor("share", quiz.id),
    });
    if (!current) {
      const next = start(quiz.id, "practice", "topic");
      if (!next) return "";
      return questionView(next, engine, data.bank.assets, true, { reportContext });
    }
    if (current.status !== "complete")
      return questionView(current, engine, data.bank.assets, true, { reportContext });
    const result = engine.summarize(current);
    return `<div class="quick-complete"><h3>Quick check complete: ${result.correct} / ${result.total}</h3>
      <p>${result.correct === result.total ? "Nice work. Try the topic quiz to connect these ideas." : "Revisit any concepts that felt uncertain, then try the topic quiz."}</p>
      <p class="muted">These answers are separate from your topic quiz score.</p>
      <button type="button" class="btn secondary" data-action="restart-quick" data-quiz="${quiz.id}">Try these checks again</button>
    </div>`;
  }

  function refresh(quizId, focusId) {
    const quiz = engine.quizById[quizId];
    const quick = quiz.quizType === "quick";
    const shell = document.getElementById(quick ? "quick-shell" : "quiz-shell");
    if (!shell) return;
    shell.innerHTML = quick
      ? quickView(quiz)
      : questionView(attempt(quizId), engine, data.bank.assets, false, { notice });
    const target = shell.querySelector(focusId);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "nearest" });
    }
  }

  function change(event) {
    if (event.target.dataset.questionConfidence) {
      const current = attempt(event.target.dataset.quiz);
      if (!current) return true;
      if (
        engine.setConfidence(
          current,
          event.target.dataset.question,
          event.target.checked ? event.target.dataset.questionConfidence : null,
        )
      )
        persist(current).then(() => touchRecent(current));
      return true;
    }
    const form = event.target.closest(".question-card");
    if (!form || event.target.name !== "answer") return false;
    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = false;
    return true;
  }

  function submit(event) {
    const form = event.target.closest(".question-card");
    if (!form) return false;
    event.preventDefault();
    const current = attempt(form.dataset.quiz);
    const selected = form.querySelector('input[name="answer"]:checked');
    if (!current || !selected || current.currentQuestionId !== form.dataset.question)
      return true;
    const changed =
      current.feedbackMode === "practice"
        ? engine.checkAnswer(current, Number(selected.value))
        : engine.selectAnswer(current, Number(selected.value));
    if (changed) {
      notice = "";
      persist(current).then(() => touchRecent(current));
      refresh(
        current.quizId,
        current.feedbackMode === "practice" ? "#answer-feedback" : "#question-heading",
      );
    }
    return true;
  }

  function finish(current, allowBlank = false) {
    const result = engine.finish(current, { allowBlank });
    if (!result.ok) {
      notice =
        result.reason === "unanswered"
          ? "Answer every question or choose Finish with unanswered questions."
          : "Check the selected practice answer before finishing.";
      refresh(current.quizId, "#question-heading");
      return false;
    }
    notice = "";
    finishOpen = false;
    persist(current).then(() => touchRecent(current));
    navigate(pathFor("results", current.quizId, current.attemptId));
    return true;
  }

  function click(control) {
    const { action, quiz: quizId, question: questionId } = control.dataset;
    const quiz = engine.quizById[quizId];
    if (!quiz) return false;
    if (["start", "start-practice", "start-test"].includes(action)) {
      const mode = action === "start-test" ? "test" : "practice";
      const next = start(quizId, mode, "topic");
      if (next && action !== "start") navigate(pathFor("quiz", quizId, next.attemptId));
      return true;
    }
    if (action === "weak") {
      const next = start(quizId, "practice", "review");
      if (next) navigate(pathFor("quiz", quizId, next.attemptId));
      return true;
    }
    if (action === "resolve-conflict") {
      store.resolveConflict(selectedAttemptId || quizId).then(() => repaint());
    } else if (action === "keep-conflict") {
      const note = document.getElementById("quiz-storage-note");
      if (note)
        note.querySelector("p").textContent =
          "This attempt remains preserved as a separate recovery copy.";
    } else if (action === "restart-quick") {
      const next = start(quizId, "practice", "topic");
      if (next) refresh(quizId, "#question-heading");
    } else if (action === "continue") {
      const current = attempt(quizId);
      if (current && engine.continueAttempt(current)) {
        persist(current).then(() => touchRecent(current));
        navigate(pathFor("quiz", quizId, current.attemptId));
      }
    } else if (action === "start-review") {
      const ids = String(control.dataset.questionIds || "")
        .split(",")
        .filter(Boolean);
      const next = start(quizId, "practice", "review", ids);
      if (next) navigate(pathFor("quiz", quizId, next.attemptId));
    } else if (action === "review-finish") {
      finishOpen = true;
      repaint();
    } else if (action === "close-finish") {
      finishOpen = false;
      repaint();
    } else if (["next", "previous"].includes(action)) {
      const current = attempt(quizId);
      if (!current || current.currentQuestionId !== questionId) return true;
      const moved =
        action === "next"
          ? engine.nextQuestion(current)
          : engine.previousQuestion(current);
      if (moved) {
        persist(current).then(() => touchRecent(current));
        refresh(quizId, "#question-heading");
      }
    } else if (
      action === "finish" ||
      action === "finish-blank" ||
      action === "finish-quick"
    ) {
      const current = attempt(quizId);
      if (current)
        finish(current, action === "finish-blank" || control.dataset.allowBlank === "1");
    } else if (action === "jump") {
      const current = attempt(quizId);
      if (current && engine.jumpToQuestion(current, questionId)) {
        finishOpen = false;
        persist(current).then(() => touchRecent(current));
        refresh(quizId, "#question-heading");
      }
    } else if (action === "first-unanswered" || action === "next-flagged") {
      const current = attempt(quizId);
      if (!current) return true;
      const states = engine.navigatorState(current);
      const candidates = states.filter((state) =>
        action === "first-unanswered" ? !state.answered : state.flagged,
      );
      if (candidates.length) {
        const currentIndex = states.findIndex((state) => state.current);
        const next =
          action === "next-flagged"
            ? candidates.find((state) => state.number - 1 > currentIndex) || candidates[0]
            : candidates[0];
        engine.jumpToQuestion(current, next.id);
        finishOpen = false;
        persist(current).then(() => touchRecent(current));
        repaint();
      }
    } else if (action === "toggle-flag") {
      const current = attempt(quizId);
      if (current) {
        engine.toggleFlag(current, questionId);
        persist(current).then(() => touchRecent(current));
        refresh(quizId, '[data-action="toggle-flag"]');
      }
    } else if (action === "toggle-elimination") {
      const current = attempt(quizId);
      const result = current
        ? engine.toggleElimination(current, questionId, Number(control.dataset.choice))
        : { ok: false };
      if (result.ok) {
        notice = "";
        persist(current).then(() => touchRecent(current));
        refresh(
          quizId,
          `button[data-action="toggle-elimination"][data-choice="${control.dataset.choice}"]`,
        );
      } else if (result.reason === "selected") {
        notice = "Change the selected answer before eliminating that choice.";
        refresh(quizId, "#question-heading");
      }
    } else if (action === "reset-eliminations") {
      const current = attempt(quizId);
      if (current && engine.resetEliminations(current, questionId)) {
        persist(current).then(() => touchRecent(current));
        refresh(quizId, "#question-heading");
      }
    } else if (action === "abandon") {
      const current = attempt(quizId);
      if (current && engine.abandon(current)) {
        persist(current).then(() => touchRecent(current));
        navigate(pathFor("quiz", quizId, current.attemptId));
      }
    } else return false;
    return true;
  }

  return {
    attempt,
    start,
    quickView,
    change,
    submit,
    click,
    expose,
    engine,
    page: () =>
      quizPage(
        data,
        attempt(data.quiz.id),
        engine,
        store.storageState,
        store.conflictFor(selectedAttemptId || data.quiz.id),
        { notice, finishOpen, routes },
      ),
    results: () =>
      resultsPage(data, attempt(data.quiz.id), engine, {
        filters: resultFilters,
        topicFilter: resultTopic,
        routes,
      }),
  };
}

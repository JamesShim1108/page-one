// Connects the mock exam engine, store, and views to the page. Typing saves
// without repainting, so focus and cursor position stay in the response box;
// the clock updates in place once a second and repaints only when a deadline
// changes the section.
import {
  answerQuestion,
  breakRemainingMs,
  chooseOption,
  currentSection,
  elapsedMs,
  endBreak,
  formatClock,
  goToQuestion,
  inReadingPeriod,
  remainingMs,
  setScore,
  startSection,
  submitSection,
  tick,
  toggleFlag,
  writeResponse,
} from "./engine.js";
import { examPage } from "./views.js";

const TYPING_SAVE_DELAY = 600;
const WARNINGS = [
  { ms: 5 * 60_000, text: "Five minutes remain in this part." },
  { ms: 60_000, text: "One minute remains in this part." },
];

export function createExamController(
  data,
  store,
  { repaint, navigate, view = "", now = () => Date.now() },
) {
  const ui = { view, confirmSubmit: false, confirmDiscard: false, confirmRetake: false };
  let typingTimer = null;
  let pendingAttempt = null;
  const announced = new Set();

  function commit(next, { paint = true } = {}) {
    if (next === store.attempt) return false;
    ui.confirmSubmit = false;
    store.update(next);
    if (paint) repaint();
    return true;
  }

  // Apply any deadline that passed while the page was closed or in the background.
  function catchUp() {
    if (!store.attempt) return false;
    return commit(tick(store.attempt, data, now()));
  }

  function flushTyping() {
    clearTimeout(typingTimer);
    typingTimer = null;
    if (pendingAttempt) {
      const next = pendingAttempt;
      pendingAttempt = null;
      store.update(next);
    }
  }

  function startAttempt(timed) {
    store.start({ timed, now: now() }).then(() => {
      ui.view = "";
      navigate(`/exam/${data.exam.id}`);
      repaint();
    });
  }

  function click(event) {
    // The question grid is native <details>; remember its state across repaints.
    const summary = event.target.closest?.(".exam-navigator > summary");
    if (summary) {
      ui.navigatorOpen = !summary.parentElement.open;
      return false;
    }
    const control = event.target.closest?.("[data-exam-action]");
    if (!control) return false;
    const action = control.dataset.examAction;
    const attempt = store.attempt;
    const at = now();
    if (action === "start-timed") startAttempt(true);
    else if (action === "start-untimed") startAttempt(false);
    else if (action === "resume") {
      ui.view = "";
      navigate(`/exam/${data.exam.id}`);
    } else if (action === "prepare-discard") {
      ui.confirmDiscard = true;
      repaint();
    } else if (action === "cancel-discard") {
      ui.confirmDiscard = false;
      repaint();
    } else if (action === "discard") {
      ui.confirmDiscard = false;
      store.discard().then(repaint);
    } else if (action === "prepare-retake") {
      ui.confirmRetake = true;
      repaint();
    } else if (action === "cancel-retake") {
      ui.confirmRetake = false;
      repaint();
    } else if (action === "retake") {
      ui.confirmRetake = false;
      store.discard().then(() => {
        ui.view = "overview";
        repaint();
      });
    } else if (!attempt) return true;
    else if (action === "begin-section") commit(startSection(attempt, data, at));
    else if (action === "end-break") commit(endBreak(attempt, at));
    else if (action === "go") {
      commit(goToQuestion(attempt, data, Number(control.dataset.index), at));
      document.getElementById("exam-question-heading")?.focus?.();
    } else if (action === "flag")
      commit(toggleFlag(attempt, data, control.dataset.question, at));
    else if (action === "choose") {
      flushTyping();
      commit(
        chooseOption(
          store.attempt,
          data,
          control.dataset.prompt,
          control.dataset.option,
          at,
        ),
      );
    } else if (action === "prepare-submit") {
      ui.confirmSubmit = true;
      repaint();
      document.getElementById("exam-submit-title")?.focus?.();
    } else if (action === "cancel-submit") {
      ui.confirmSubmit = false;
      repaint();
    } else if (action === "submit-section") {
      flushTyping();
      commit(submitSection(store.attempt, data, at));
      window.scrollTo?.({ top: 0 });
    }
    return true;
  }

  function change(event) {
    const target = event.target;
    if (target.matches?.("[data-exam-answer]")) {
      commit(
        answerQuestion(
          store.attempt,
          data,
          target.dataset.question,
          Number(target.value),
          now(),
        ),
      );
      return true;
    }
    if (target.matches?.("[data-exam-score]")) {
      commit(
        setScore(
          store.attempt,
          data,
          {
            key: target.dataset.key,
            criterionId: target.dataset.criterion,
            points: target.value,
          },
          now(),
        ),
      );
      return true;
    }
    return false;
  }

  function input(event) {
    const target = event.target;
    if (!target.matches?.("[data-exam-field]")) return false;
    const base = pendingAttempt || store.attempt;
    const next = writeResponse(
      base,
      data,
      {
        promptId: target.dataset.prompt,
        optionId: target.dataset.option,
        fieldId: target.dataset.examField,
        text: target.value,
      },
      now(),
    );
    if (next === base) return true;
    pendingAttempt = next;
    const counter = document.querySelector(
      `[data-exam-words="${CSS.escape(target.id)}"]`,
    );
    if (counter) {
      const words = target.value.trim() ? target.value.trim().split(/\s+/u).length : 0;
      counter.textContent = `${words} words`;
    }
    clearTimeout(typingTimer);
    typingTimer = setTimeout(flushTyping, TYPING_SAVE_DELAY);
    return true;
  }

  // Keeps the clock current without replacing the page under the student's cursor.
  function enhance() {
    const placeBar = () => {
      const header = document.querySelector(".site-header");
      document.documentElement.style.setProperty(
        "--exam-bar-top",
        `${header?.offsetHeight || 0}px`,
      );
    };
    placeBar();
    window.addEventListener("resize", placeBar);
    const timer = setInterval(() => {
      const attempt = pendingAttempt || store.attempt;
      if (!attempt) return;
      const at = now();
      const next = tick(attempt, data, at);
      if (next !== attempt) {
        pendingAttempt = null;
        clearTimeout(typingTimer);
        commit(next);
        return;
      }
      const clock = document.querySelector("[data-exam-clock]");
      if (!clock) return;
      if (attempt.status === "break") {
        clock.textContent = formatClock(breakRemainingMs(attempt, data, at));
        return;
      }
      const remaining = remainingMs(attempt, data, at);
      const section = currentSection(attempt, data);
      clock.textContent = formatClock(
        remaining === null ? elapsedMs(attempt, section, at) : remaining,
      );
      if (remaining !== null) {
        clock.parentElement?.classList.toggle("is-warning", remaining <= 5 * 60_000);
        for (const warning of WARNINGS) {
          const key = `${section.id}:${warning.ms}`;
          if (
            remaining <= warning.ms &&
            remaining > warning.ms - 2000 &&
            !announced.has(key)
          ) {
            announced.add(key);
            const live = document.querySelector("[data-exam-announce]");
            if (live) live.textContent = warning.text;
          }
        }
      }
      const reading = document.querySelector("[data-exam-reading]");
      if (reading && !inReadingPeriod(attempt, data, at)) reading.remove();
    }, 1000);
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", placeBar);
    };
  }

  catchUp();

  return {
    page() {
      // Text typed since the last save must be in the attempt before the page is rebuilt.
      flushTyping();
      return examPage(data, store, ui, now());
    },
    click,
    change,
    input,
    enhance,
    flush() {
      flushTyping();
      return store.flush();
    },
    visibility() {
      if (document.visibilityState === "hidden") flushTyping();
      else catchUp();
    },
    destroy() {
      flushTyping();
    },
  };
}

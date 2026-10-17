// PSAT/SAT practice sessions. Two modes share one controller:
//   practice: a skill, domain, or section, one item at a time with feedback
//   module:   a timed set drawn by the test's domain mix, scored at the end
// Answers live in this tab only. Leaving the page ends the session.
import { escapeHtml as esc, link, arrow, breadcrumbs } from "../ui.js";
import {
  gridInEntryProblem,
  checkResponse,
  scaleLabel,
  NOT_AFFILIATED,
} from "./engine.js";
import { itemView } from "./views.js";
import { check, respond, retry } from "./controller.js";
import {
  drawModule,
  formatClock,
  scopeItems,
  scopeLabel,
  sectionEstimate,
  summarize,
} from "./practice.js";

const WARNING_MS = 5 * 60 * 1000;
// Moving between questions focuses the top of the card, so a reading passage
// above the question stays in view.
const QUESTION_TOP = ".tp-item .question-meta";

function crumbs(test, label) {
  return breadcrumbs([
    ["Home", "/"],
    ["PSAT / SAT", "/test-prep"],
    [test.title, `/test-prep/${test.id}`],
    [label],
  ]);
}

const button = (
  action,
  label,
  { secondary = false, extra = "", disabled = false } = {},
) =>
  `<button type="button" class="btn ${secondary ? "secondary" : ""}" data-tp-session="${esc(action)}" ${extra} ${disabled ? "disabled" : ""}>${label}</button>`;

function percent(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}

function groupTable(caption, rows) {
  if (!rows.length) return "";
  return `<div class="tp-table-wrap"><table class="tp-table tp-results-table"><caption>${esc(caption)}</caption>
    <thead><tr><th scope="col">Area</th><th scope="col">Correct</th><th scope="col">Share</th></tr></thead>
    <tbody>${rows.map((row) => `<tr><th scope="row">${esc(row.title)}</th><td>${row.correct} of ${row.total}</td><td>${percent(row.correct, row.total)}%</td></tr>`).join("")}</tbody>
  </table></div>`;
}

function reviewList(summary, numberLabel = "Question") {
  return `<div class="tp-review-list">${summary.results
    .map(({ item, correct, answered }, index) => {
      const status = correct ? "Correct" : answered ? "Incorrect" : "Not answered";
      return `<details class="tp-review-item ${correct ? "is-correct" : "is-missed"}"><summary><span>${numberLabel} ${index + 1} · ${esc(item.skillTitle)}</span><span class="tp-review-status">${status}</span></summary>
      ${itemView(item, reviewState(item, summary.responses[item.id]), { heading: "h3", number: index + 1, mode: "review", footer: "" })}</details>`;
    })
    .join("")}</div>`;
}

function reviewState(item, response) {
  const result = checkResponse(item, response);
  return {
    response: response ?? "",
    checked: true,
    problem: null,
    result: { correct: result.correct, answered: result.answered },
  };
}

export function createTestPrepSession({ testPrep, test, items, params, repaint }) {
  const scope = {
    section: params.get("section") || "",
    domain: params.get("domain") || "",
    skill: params.get("skill") || "",
  };
  const mode = params.get("mode") === "module" ? "module" : "practice";
  const byId = new Map(items.map((item) => [item.id, item]));
  const label =
    mode === "module"
      ? `${scopeLabel(test, { section: scope.section })} module`
      : scopeLabel(test, scope);
  const section = test.sections.find((entry) => entry.id === scope.section);
  let pendingFocus = "";

  // Practice state
  const practiceIds =
    mode === "practice" ? scopeItems(items, test, scope).map((item) => item.id) : [];
  const states = new Map(practiceIds.map((id) => [id, retry()]));

  // Shared position and module state
  let ids = practiceIds;
  let index = 0;
  let phase = mode === "module" ? "intro" : "active";
  let responses = {};
  let flags = new Set();
  let timed = true;
  let timerHidden = false;
  let deadline = 0;
  let timeUp = false;

  const current = () => byId.get(ids[index]);
  const focusAfter = (selector) => {
    pendingFocus = selector;
    repaint();
  };

  function startModule() {
    ids = drawModule(items, test, scope.section) || [];
    index = 0;
    responses = {};
    flags = new Set();
    timeUp = false;
    deadline = timed ? Date.now() + section.moduleMinutes * 60 * 1000 : 0;
    phase = "active";
    focusAfter(QUESTION_TOP);
  }

  function finish() {
    phase = "results";
    focusAfter("#tp-results-title");
  }

  // ---- Views

  function intro() {
    const scale = scaleLabel(test);
    const ready = section && drawModule(items, test, scope.section);
    if (!ready)
      return `<section class="empty-state"><h2>This module is not ready yet.</h2><p>More items are needed in every domain before a full module can be drawn.</p>${link(`/test-prep/${test.id}`, "Back to skills", "btn")}</section>`;
    return `<section class="tp-module-intro" aria-labelledby="tp-module-title">
      <dl class="tp-facts">
        <div><dt>Questions</dt><dd>${section.moduleSize}, drawn by the ${esc(test.title)} domain mix</dd></div>
        <div><dt>Time</dt><dd>${section.moduleMinutes} minutes, the length of one official module</dd></div>
        <div><dt>Result</dt><dd>Correct count by domain, and a practice estimate on the ${esc(test.title)} section scale (${esc(scale.section)})</dd></div>
      </dl>
      <label class="tp-check"><input type="checkbox" data-tp-session-toggle="timed" ${timed ? "checked" : ""}> Use the ${section.moduleMinutes}-minute timer</label>
      <p class="muted">Answers stay in this tab only. Reloading or leaving the page ends the module. Each question can be changed until you submit, and explanations appear afterward. This is one module, not the adaptive two-module test.</p>
      <div class="actions">${button("start", `Start module ${arrow}`)}</div>
    </section>`;
  }

  function clock() {
    if (!deadline) return "";
    const remaining = deadline - Date.now();
    return `<div class="tp-clock ${remaining <= WARNING_MS ? "is-warning" : ""}" role="timer" aria-live="off">
      <span data-tp-clock ${timerHidden ? "hidden" : ""}>${formatClock(remaining)}</span>${timerHidden ? '<span class="muted">Timer hidden</span>' : ""}
      <button type="button" class="text-button" data-tp-session="toggle-timer">${timerHidden ? "Show" : "Hide"}</button></div>`;
  }

  function navigator() {
    return `<ol class="tp-navigator" aria-label="Questions">${ids
      .map((id, position) => {
        const answered = String(responses[id] ?? "").trim() !== "";
        const state = [
          position === index ? "is-current" : "",
          answered ? "is-answered" : "",
          flags.has(id) ? "is-flagged" : "",
        ].join(" ");
        const words = [
          answered ? "answered" : "unanswered",
          flags.has(id) ? "flagged" : "",
        ]
          .filter(Boolean)
          .join(", ");
        return `<li><button type="button" class="tp-nav-item ${state}" data-tp-session="goto" data-index="${position}" aria-label="Question ${position + 1}, ${words}" ${position === index && phase === "active" ? 'aria-current="step"' : ""}>${position + 1}</button></li>`;
      })
      .join("")}</ol>`;
  }

  function moduleActive() {
    const item = current();
    const last = index === ids.length - 1;
    const flagged = flags.has(item.id);
    const footer = [
      index > 0 ? button("prev", "Previous", { secondary: true }) : "",
      button("flag", flagged ? "Clear flag" : "Flag for review", {
        secondary: true,
        extra: `aria-pressed="${flagged}"`,
      }),
      last
        ? button("review", `Review answers ${arrow}`)
        : button("next", `Next ${arrow}`),
    ].join("");
    return `<div class="tp-module-bar"><span>${esc(label)}</span>${clock()}</div>
      ${itemView(item, { response: responses[item.id] ?? "", problem: item.format === "grid-in" && responses[item.id] ? gridInEntryProblem(responses[item.id]) : null }, { number: index + 1, total: ids.length, mode: "test", footer })}`;
  }

  function moduleReview() {
    const unanswered = ids.filter(
      (id) => String(responses[id] ?? "").trim() === "",
    ).length;
    return `<div class="tp-module-bar"><span>${esc(label)}</span>${clock()}</div>
      <section class="question-card tp-module-review" aria-labelledby="tp-review-title">
        <h2 id="tp-review-title">Check your work</h2>
        <p>${unanswered ? `${unanswered} ${unanswered === 1 ? "question is" : "questions are"} unanswered.` : "Every question has an answer."} ${flags.size ? `${flags.size} flagged for review.` : ""} Choose a number to return to it.</p>
        ${navigator()}
        <p class="muted tp-nav-legend"><span class="tp-key is-answered"></span> Answered <span class="tp-key is-flagged"></span> Flagged</p>
        <div class="actions">${button("back", "Back to questions", { secondary: true })}${button("submit", "Submit module")}</div>
      </section>`;
  }

  function moduleResults() {
    const set = ids.map((id) => byId.get(id));
    const summary = { ...summarize(test, set, responses), responses };
    const estimate = sectionEstimate(test, summary.correct, summary.total);
    return `<section class="tp-results" aria-labelledby="tp-results-title">
      <h2 id="tp-results-title" tabindex="-1">${timeUp ? "Time is up. " : ""}${summary.correct} of ${summary.total} correct</h2>
      <div class="tp-estimate"><p class="eyebrow">${esc(estimate.label)}</p>
        <p class="tp-estimate-range">${estimate.low}–${estimate.high}</p>
        <p>${esc(test.title)} ${esc(section.title)} section scale, ${estimate.min}–${estimate.max}.</p>
        <p class="muted">Not an official score. This band comes only from the share correct on one non-adaptive module. Official scoring uses two adaptive modules and question difficulty, so a real score can fall outside it.</p></div>
      ${groupTable("By domain", summary.byDomain)}
      <h3>Review every question</h3>${reviewList(summary)}
      <div class="actions">${button("restart", "Start a new module")}${link(`/test-prep/${test.id}`, "Back to skills", "btn secondary")}</div>
      <p class="muted">${esc(NOT_AFFILIATED)}</p>
    </section>`;
  }

  function practiceActive() {
    if (!ids.length)
      return `<section class="empty-state"><h2>No practice items here yet.</h2><p>Items for this skill are still being written.</p>${link(`/test-prep/${test.id}`, "Back to skills", "btn")}</section>`;
    const item = current();
    const state = states.get(item.id);
    const last = index === ids.length - 1;
    const previous = index > 0 ? button("prev", "Previous", { secondary: true }) : "";
    const forward = last
      ? button("finish", `See results ${arrow}`)
      : button("next", `Next ${arrow}`);
    const footer = state.checked
      ? `${previous}${forward}`
      : `${previous}${button(last ? "finish" : "next", last ? "Finish" : "Skip", { secondary: true })}`;
    return `<p class="tp-progress">${index + 1} of ${ids.length} · ${[...states.values()].filter((entry) => entry.checked).length} checked</p>
      ${itemView(item, state, { number: index + 1, total: ids.length, footer })}`;
  }

  function practiceResults() {
    const set = ids.map((id) => byId.get(id));
    const checkedResponses = Object.fromEntries(
      ids.map((id) => [id, states.get(id).checked ? states.get(id).response : ""]),
    );
    const summary = {
      ...summarize(test, set, checkedResponses),
      responses: checkedResponses,
    };
    return `<section class="tp-results" aria-labelledby="tp-results-title">
      <h2 id="tp-results-title" tabindex="-1">${summary.correct} of ${summary.total} correct</h2>
      <p class="muted">${summary.answered} of ${summary.total} checked. Skill practice shows accuracy only; timed modules give a practice estimate.</p>
      ${groupTable("By skill", summary.bySkill)}
      <h3>Review</h3>${reviewList(summary)}
      <div class="actions">${button("restart", "Practice again")}${link(`/test-prep/${test.id}`, "Back to skills", "btn secondary")}</div>
    </section>`;
  }

  function page() {
    const body =
      mode === "module"
        ? { intro, active: moduleActive, review: moduleReview, results: moduleResults }[
            phase
          ]()
        : phase === "results"
          ? practiceResults()
          : practiceActive();
    const eyebrow =
      mode === "module" ? `${test.title} · Timed module` : `${test.title} · Practice`;
    return `<div class="container tp-page tp-session" data-tp-phase="${esc(phase)}">${crumbs(test, label)}
      <div class="page-intro tp-session-intro"><p class="eyebrow">${esc(eyebrow)}</p><h1 id="tp-module-title">${esc(label)}</h1></div>
      ${body}
    </div>`;
  }

  // ---- Interactions

  function act(action, target) {
    if (action === "start") return startModule();
    if (action === "restart") {
      if (mode === "module") {
        phase = "intro";
        deadline = 0;
        return focusAfter("h1");
      }
      for (const id of ids) states.set(id, retry());
      index = 0;
      phase = "active";
      return focusAfter(QUESTION_TOP);
    }
    if (action === "next") {
      index = Math.min(ids.length - 1, index + 1);
      return focusAfter(QUESTION_TOP);
    }
    if (action === "prev") {
      index = Math.max(0, index - 1);
      return focusAfter(QUESTION_TOP);
    }
    if (action === "flag") {
      const id = ids[index];
      if (flags.has(id)) flags.delete(id);
      else flags.add(id);
      return focusAfter('[data-tp-session="flag"]');
    }
    if (action === "review") {
      phase = "review";
      return focusAfter("#tp-review-title");
    }
    if (action === "back") {
      phase = "active";
      return focusAfter(QUESTION_TOP);
    }
    if (action === "goto") {
      index = Number(target.dataset.index) || 0;
      phase = "active";
      return focusAfter(QUESTION_TOP);
    }
    if (action === "submit" || action === "finish") return finish();
    if (action === "toggle-timer") {
      timerHidden = !timerHidden;
      return focusAfter('[data-tp-session="toggle-timer"]');
    }
    return undefined;
  }

  function enhance() {
    const root = document.getElementById("main");
    if (!root) return () => {};
    // Keep the timer bar below the sticky site header.
    const placeBar = () =>
      document.documentElement.style.setProperty(
        "--tp-bar-top",
        `${document.querySelector(".site-header")?.offsetHeight || 0}px`,
      );
    placeBar();
    window.addEventListener("resize", placeBar);
    if (pendingFocus) {
      root.querySelector(pendingFocus)?.setAttribute("tabindex", "-1");
      root.querySelector(pendingFocus)?.focus({ preventScroll: false });
      pendingFocus = "";
    }
    const onClick = (event) => {
      const target = event.target.closest?.("[data-tp-session]");
      if (target) act(target.dataset.tpSession, target);
      else if (event.target.closest?.('[data-tp-action="retry"]')) {
        states.set(ids[index], retry());
        focusAfter("[data-tp-choice], [data-tp-entry]");
      }
    };
    const onChange = (event) => {
      if (event.target.matches?.('[data-tp-session-toggle="timed"]')) {
        timed = event.target.checked;
        return;
      }
      if (!event.target.matches?.("[data-tp-choice]") || phase !== "active") return;
      const id = ids[index];
      if (mode === "module") responses[id] = event.target.value;
      else {
        states.set(id, respond(event.target.value));
        focusAfter(`[data-tp-choice][value="${CSS.escape(event.target.value)}"]`);
      }
    };
    const onInput = (event) => {
      if (!event.target.matches?.("[data-tp-entry]") || phase !== "active") return;
      const id = ids[index];
      const value = event.target.value;
      const form = event.target.closest("form");
      if (mode === "module") {
        responses[id] = value;
        const live = form.querySelector("[data-tp-live]");
        const problem = value.trim() ? gridInEntryProblem(value) : null;
        if (live) live.textContent = problem || "";
        event.target.toggleAttribute("aria-invalid", Boolean(problem));
      } else {
        states.set(id, respond(value));
        const submit = form.querySelector('button[type="submit"]');
        if (submit) submit.disabled = value.trim() === "";
      }
    };
    const onSubmit = (event) => {
      if (!event.target.matches?.("form[data-tp-item]")) return;
      event.preventDefault();
      if (mode === "module") {
        // Enter in a grid-in moves on, as Next would.
        if (index < ids.length - 1) act("next");
        else act("review");
        return;
      }
      const id = ids[index];
      const next = check(byId.get(id), states.get(id));
      states.set(id, next);
      focusAfter(next.checked ? ".answer-feedback" : "[data-tp-entry]");
    };
    root.addEventListener("click", onClick);
    root.addEventListener("change", onChange);
    root.addEventListener("input", onInput);
    root.addEventListener("submit", onSubmit);

    let timer = 0;
    const live = mode === "module" && ["active", "review"].includes(phase);
    if (live && deadline) {
      timer = setInterval(() => {
        const remaining = deadline - Date.now();
        if (remaining <= 0) {
          clearInterval(timer);
          timeUp = true;
          finish();
          return;
        }
        const element = root.querySelector("[data-tp-clock]");
        if (element) element.textContent = formatClock(remaining);
        root
          .querySelector(".tp-clock")
          ?.classList.toggle("is-warning", remaining <= WARNING_MS);
      }, 1000);
    }
    const onLeave = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    if (live) window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("resize", placeBar);
      clearInterval(timer);
      window.removeEventListener("beforeunload", onLeave);
      root.removeEventListener("click", onClick);
      root.removeEventListener("change", onChange);
      root.removeEventListener("input", onInput);
      root.removeEventListener("submit", onSubmit);
    };
  }

  return {
    page,
    enhance,
    title: `${label} · ${test.title}`,
    // Exposed for tests.
    debug: () => ({ phase, ids: [...ids], index, responses: { ...responses } }),
    act,
    setResponse: (value) => {
      if (mode === "module") responses[ids[index]] = value;
      else states.set(ids[index], respond(value));
    },
    checkCurrent: () => {
      const id = ids[index];
      states.set(id, check(byId.get(id), states.get(id)));
    },
  };
}

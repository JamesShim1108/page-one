// Full-length PSAT/SAT practice test, run the way the digital test runs:
// directions, Reading and Writing module 1, an adaptive module 2, a 10-minute
// break, then Math module 1 and an adaptive module 2. Results come at the end.
//
// Progress is kept in this browser (localStorage), so a reload or a closed tab
// can resume. The timer pauses while the page is closed. Nothing leaves the
// device, and a cleared browser simply starts over.
import { escapeHtml as esc, link, arrow, breadcrumbs } from "../ui.js";
import {
  checkResponse,
  gridInEntryProblem,
  NOT_AFFILIATED,
  scaleLabel,
} from "./engine.js";
import { itemView } from "./views.js";
import {
  drawModule,
  formatClock,
  fullSectionEstimate,
  routeAfter,
  summarize,
  totalEstimate,
  ROUTE_THRESHOLD,
} from "./practice.js";

export const BREAK_MINUTES = 10;
export const ALERT_MS = 5 * 60 * 1000;
const STATE_VERSION = 1;
const QUESTION_TOP = ".tp-item .question-meta";

export const storageKey = (testId) => `page-one:test-prep:full:${testId}`;

function readSaved(storage, key) {
  try {
    const raw = storage?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSaved(storage, key, value) {
  try {
    if (value) storage?.setItem(key, JSON.stringify(value));
    else storage?.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function defaultStorage() {
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

// Section directions, written for Page One. They describe the format; they are
// not the official directions.
const DIRECTIONS = {
  rw: (section) => [
    `This section has ${section.modules} modules of ${section.moduleSize} questions. You have ${section.moduleMinutes} minutes for each module.`,
    "Each question comes with its own short text, or a pair of texts. Read the text and the question, then choose the best of the four answers.",
    "Every question is multiple choice. You can cross out choices, mark questions for review, and move freely among the questions in a module until it ends.",
    "When a module ends, you cannot go back to it. How you do on the first module decides whether the second is harder or easier.",
  ],
  math: (section) => [
    `This section has ${section.modules} modules of ${section.moduleSize} questions. You have ${section.moduleMinutes} minutes for each module.`,
    "Most questions are multiple choice. For the rest, type your own answer: up to 5 characters, or 6 for a negative answer. Enter a fraction such as 7/2 or a decimal such as 3.5, not a mixed number, and leave out units, percent signs, and commas. If more than one answer is correct, enter just one.",
    "You may use a calculator and the reference sheet. Unless a question says otherwise, figures are drawn to scale, lie in a plane, and all numbers are real numbers.",
    "When a module ends, you cannot go back to it. How you do on the first module decides whether the second is harder or easier.",
  ],
};

// Common formulas, laid out for Page One. The real test supplies its own sheet.
const REFERENCE = [
  ["Circle", "A = πr²   C = 2πr"],
  ["Rectangle", "A = ℓw"],
  ["Triangle", "A = ½bh"],
  ["Pythagorean theorem", "c² = a² + b²"],
  [
    "Special right triangles",
    "45°-45°-90°: sides x, x, x√2   30°-60°-90°: sides x, x√3, 2x",
  ],
  ["Rectangular prism", "V = ℓwh"],
  ["Cylinder", "V = πr²h"],
  ["Sphere", "V = (4/3)πr³"],
  ["Cone", "V = (1/3)πr²h"],
  ["Pyramid", "V = (1/3)ℓwh"],
  ["Angles", "A circle has 360°, or 2π radians. A triangle's angles add up to 180°."],
];

export function createFullTest({
  testPrep,
  test,
  items,
  repaint,
  storage = defaultStorage(),
  now = () => Date.now(),
  random = Math.random,
}) {
  const key = storageKey(test.id);
  const byId = new Map(items.map((item) => [item.id, item]));
  const sections = test.sections;
  let pendingFocus = "";
  let notice = "";
  let menuOpen = false;
  let referenceOpen = false;
  let deadline = 0;
  let saveFailed = false;

  // Saved state is used only if every question still exists.
  const saved = readSaved(storage, key);
  const savedUsable =
    saved?.version === STATE_VERSION &&
    saved.testId === test.id &&
    saved.modules.every((module) => module.ids.every((id) => byId.has(id)));
  let state = savedUsable ? saved : null;
  let stage = state ? (state.stage === "results" ? "results" : "resume") : "intro";

  const module = () => state.modules.at(-1);
  const sectionOf = (record) =>
    sections.find((section) => section.id === record.sectionId);
  const currentItem = () => byId.get(module().ids[module().index]);

  function persist() {
    if (!state) return;
    if (stage === "module" || stage === "review") module().remainingMs = remaining();
    if (stage === "break") state.breakRemainingMs = remaining();
    state.stage = stage === "resume" ? state.stage : stage;
    saveFailed = !writeSaved(storage, key, state);
  }

  function remaining() {
    return Math.max(0, deadline - now());
  }

  function startClock(ms) {
    deadline = now() + ms;
  }

  function go(nextStage, focus) {
    stage = nextStage;
    menuOpen = false;
    referenceOpen = false;
    persist();
    pendingFocus = focus;
    repaint();
  }

  function begin() {
    state = {
      version: STATE_VERSION,
      testId: test.id,
      startedAt: new Date(now()).toISOString(),
      sectionIndex: 0,
      modules: [],
      routes: {},
      timerHidden: false,
      stage: "directions",
    };
    go("directions", "#tp-directions-title");
  }

  function openModule(sectionIndex, moduleIndex) {
    const section = sections[sectionIndex];
    const sectionModules = state.modules.filter(
      (record) => record.sectionId === section.id,
    );
    const mix = moduleIndex === 0 ? "mixed" : state.routes[section.id];
    const ids = drawModule(items, test, section.id, random, {
      moduleIndex,
      mix,
      exclude: sectionModules.flatMap((record) => record.ids),
    });
    if (!ids) {
      notice = "There are not enough questions to build this module.";
      return go("intro", "h1");
    }
    state.sectionIndex = sectionIndex;
    state.modules.push({
      sectionId: section.id,
      moduleIndex,
      mix,
      ids,
      index: 0,
      responses: {},
      flags: [],
      eliminated: {},
      remainingMs: section.moduleMinutes * 60 * 1000,
      submitted: false,
    });
    startClock(module().remainingMs);
    go("module", QUESTION_TOP);
  }

  function submitModule(timedOut = false) {
    const record = module();
    record.submitted = true;
    record.timedOut = timedOut;
    record.remainingMs = timedOut ? 0 : remaining();
    const section = sectionOf(record);
    const set = record.ids.map((id) => byId.get(id));
    const correct = set.filter(
      (item) => checkResponse(item, record.responses[item.id]).correct,
    ).length;
    record.correct = correct;
    notice = timedOut
      ? `Time is up for ${section.title} Module ${record.moduleIndex + 1}.`
      : "";
    if (record.moduleIndex === 0) {
      state.routes[section.id] = routeAfter(correct, record.ids.length);
      return openModule(state.sectionIndex, 1);
    }
    if (state.sectionIndex === 0) {
      startClock(BREAK_MINUTES * 60 * 1000);
      return go("break", "#tp-break-title");
    }
    state.finishedAt = new Date(now()).toISOString();
    deadline = 0;
    return go("results", "#tp-results-title");
  }

  function resume() {
    stage = state.stage;
    if (stage === "module" || stage === "review") startClock(module().remainingMs);
    if (stage === "break")
      startClock(state.breakRemainingMs ?? BREAK_MINUTES * 60 * 1000);
    go(stage, stage === "module" ? QUESTION_TOP : "h2");
  }

  function discard() {
    writeSaved(storage, key, null);
    state = null;
    deadline = 0;
    notice = "";
    go("intro", "h1");
  }

  // ---- Views

  function crumbs() {
    return breadcrumbs([
      ["Home", "/"],
      ["PSAT / SAT", "/test-prep"],
      [test.title, `/test-prep/${test.id}`],
      ["Full-length practice test"],
    ]);
  }

  const button = (action, label, { secondary = false, extra = "" } = {}) =>
    `<button type="button" class="btn ${secondary ? "secondary" : ""}" data-tp-full="${esc(action)}" ${extra}>${label}</button>`;

  function introView() {
    const scale = scaleLabel(test);
    const rows = sections
      .map(
        (section) =>
          `<div><dt>${esc(section.title)}</dt><dd>${section.modules} modules · ${section.moduleSize} questions and ${section.moduleMinutes} minutes each</dd></div>`,
      )
      .join("");
    return `<section class="tp-module-intro" aria-labelledby="tp-full-intro">
      <h2 id="tp-full-intro" class="visually-hidden">About this practice test</h2>
      ${notice ? `<p class="quiz-notice" role="status">${esc(notice)}</p>` : ""}
      <dl class="tp-facts">${rows}
        <div><dt>Break</dt><dd>${BREAK_MINUTES} minutes between the sections</dd></div>
        <div><dt>Total</dt><dd>${sections.reduce((sum, section) => sum + section.questions, 0)} questions in ${Math.floor(sections.reduce((sum, section) => sum + section.minutes, 0) / 60)} hours ${sections.reduce((sum, section) => sum + section.minutes, 0) % 60} minutes, plus the break</dd></div>
        <div><dt>Result</dt><dd>A practice estimate on the ${esc(test.title)} scale (${esc(scale.total)}), section by section, with every question explained</dd></div>
      </dl>
      <p>Like the real test, each section is adaptive: a strong first module (at least ${Math.round(ROUTE_THRESHOLD * 100)}% correct here) leads to a harder second module, and the harder module can earn a higher score.</p>
      <p class="muted">All questions are original Page One practice. Unlike the real test, there are no unscored pretest questions, and the estimate is rough: it is not an official score. Your progress is saved in this browser, and the timer pauses if you leave.</p>
      <div class="actions">${button("begin", `Start the practice test ${arrow}`)}${link(`/test-prep/${test.id}`, "Back to skills", "btn secondary")}</div>
    </section>`;
  }

  function resumeView() {
    const record = module();
    const where =
      state.stage === "break"
        ? "the break"
        : record
          ? `${sectionOf(record).title}, Module ${record.moduleIndex + 1}`
          : "the directions";
    return `<section class="tp-module-intro" aria-labelledby="tp-resume-title">
      <h2 id="tp-resume-title">Resume your practice test</h2>
      <p>You stopped during ${esc(where)}${record && state.stage !== "break" ? `, with ${formatClock(record.remainingMs)} left` : ""}. The timer was paused while you were away.</p>
      <div class="actions">${button("resume", `Resume ${arrow}`)}${button("discard", "Discard and start over", { secondary: true })}</div>
    </section>`;
  }

  function directionsView() {
    const section = sections[state.modules.length ? 1 : 0];
    return `<section class="question-card tp-directions" aria-labelledby="tp-directions-title">
      <p class="eyebrow">Section ${sections.indexOf(section) + 1}</p>
      <h2 id="tp-directions-title" tabindex="-1">${esc(section.title)}: directions</h2>
      ${DIRECTIONS[section.id](section)
        .map((text) => `<p>${esc(text)}</p>`)
        .join("")}
      <div class="actions">${button("open-section", `Begin ${esc(section.title)} ${arrow}`)}</div>
    </section>`;
  }

  function clockView() {
    const left = remaining();
    const alert = left <= ALERT_MS;
    const hidden = state.timerHidden && !alert;
    return `<div class="tp-clock ${alert ? "is-warning" : ""}" role="timer" aria-live="off">
      <span data-tp-clock ${hidden ? "hidden" : ""}>${formatClock(left)}</span>${hidden ? '<span class="muted">Timer hidden</span>' : ""}
      ${alert ? "" : `<button type="button" class="text-button" data-tp-full="toggle-timer">${hidden ? "Show" : "Hide"}</button>`}</div>`;
  }

  function referenceView() {
    return `<section class="tp-reference" id="tp-reference" aria-labelledby="tp-reference-title">
      <h2 id="tp-reference-title">Reference</h2>
      <dl>${REFERENCE.map(([term, formula]) => `<div><dt>${esc(term)}</dt><dd>${esc(formula)}</dd></div>`).join("")}</dl>
      <p class="muted">Formulas collected by Page One. The real test supplies its own reference sheet and a built-in graphing calculator; here, use your own calculator or <a href="https://www.desmos.com/calculator" target="_blank" rel="noopener noreferrer">a free online graphing calculator</a>.</p>
    </section>`;
  }

  function barView() {
    const record = module();
    const section = sectionOf(record);
    const tools =
      section.id === "math"
        ? `<button type="button" class="text-button" data-tp-full="reference" aria-expanded="${referenceOpen}" aria-controls="tp-reference">Reference</button>`
        : "";
    return `<div class="tp-module-bar"><span>Section ${sections.indexOf(section) + 1}, Module ${record.moduleIndex + 1}: ${esc(section.title)}</span><span class="tp-bar-tools">${tools}${clockView()}</span></div>
      ${left5Notice()}${referenceOpen ? referenceView() : ""}`;
  }

  function left5Notice() {
    return remaining() <= ALERT_MS
      ? `<p class="tp-time-alert" role="status">Less than 5 minutes remain in this module.</p>`
      : "";
  }

  function navigatorView() {
    const record = module();
    return `<ol class="tp-navigator" aria-label="Questions in this module">${record.ids
      .map((id, position) => {
        const answered = String(record.responses[id] ?? "").trim() !== "";
        const flagged = record.flags.includes(id);
        const classes = [
          position === record.index && stage === "module" ? "is-current" : "",
          answered ? "is-answered" : "",
          flagged ? "is-flagged" : "",
        ].join(" ");
        const words = [
          answered ? "answered" : "unanswered",
          flagged ? "marked for review" : "",
        ]
          .filter(Boolean)
          .join(", ");
        return `<li><button type="button" class="tp-nav-item ${classes}" data-tp-full="goto" data-index="${position}" aria-label="Question ${position + 1}, ${words}">${position + 1}</button></li>`;
      })
      .join("")}</ol>
      <p class="muted tp-nav-legend"><span class="tp-key is-answered"></span> Answered <span class="tp-key is-flagged"></span> Marked for review</p>`;
  }

  function moduleView() {
    const record = module();
    const item = currentItem();
    const last = record.index === record.ids.length - 1;
    const flagged = record.flags.includes(item.id);
    const footer = [
      `<button type="button" class="btn secondary tp-menu-button" data-tp-full="menu" aria-expanded="${menuOpen}" aria-controls="tp-question-menu">Question ${record.index + 1} of ${record.ids.length}</button>`,
      button("flag", flagged ? "Unmark" : "Mark for review", {
        secondary: true,
        extra: `aria-pressed="${flagged}"`,
      }),
      record.index > 0 ? button("prev", "Back", { secondary: true }) : "",
      last
        ? button("review", `Check your work ${arrow}`)
        : button("next", `Next ${arrow}`),
    ].join("");
    const response = record.responses[item.id] ?? "";
    return `${barView()}
      ${menuOpen ? `<section class="question-card tp-question-menu" id="tp-question-menu" aria-label="Question menu">${navigatorView()}${button("review", "Go to review page", { secondary: true })}</section>` : ""}
      ${itemView(
        item,
        {
          response,
          problem:
            item.format === "grid-in" && response ? gridInEntryProblem(response) : null,
        },
        {
          number: record.index + 1,
          total: record.ids.length,
          mode: "test",
          footer,
          eliminator: item.format === "single-select",
          eliminated: record.eliminated[item.id] || [],
        },
      )}`;
  }

  function reviewView() {
    const record = module();
    const unanswered = record.ids.filter(
      (id) => String(record.responses[id] ?? "").trim() === "",
    ).length;
    return `${barView()}
      <section class="question-card tp-module-review" aria-labelledby="tp-review-title">
        <h2 id="tp-review-title" tabindex="-1">Check your work</h2>
        <p>${unanswered ? `${unanswered} ${unanswered === 1 ? "question is" : "questions are"} unanswered.` : "Every question has an answer."} ${record.flags.length ? `${record.flags.length} marked for review.` : ""} Choose a number to go back to it. When you submit, this module ends.</p>
        ${navigatorView()}
        <div class="actions">${button("back", "Back to questions", { secondary: true })}${button("submit", `Submit module ${arrow}`)}</div>
      </section>`;
  }

  function breakView() {
    return `<section class="question-card tp-break" aria-labelledby="tp-break-title">
      <h2 id="tp-break-title" tabindex="-1">Break</h2>
      <p class="tp-break-clock" role="timer"><span data-tp-clock>${formatClock(remaining())}</span></p>
      <p>${esc(sections[0].title)} is done. Stand up, stretch, and look away from the screen. Math begins when the break ends or when you choose to resume.</p>
      <div class="actions">${button("end-break", `Resume testing ${arrow}`)}</div>
    </section>`;
  }

  function sectionResult(section) {
    const [first, second] = state.modules.filter(
      (record) => record.sectionId === section.id,
    );
    const part = (record) => ({ correct: record.correct, total: record.ids.length });
    const estimate = fullSectionEstimate(
      test,
      part(first),
      part(second),
      state.routes[section.id],
    );
    const set = [...first.ids, ...second.ids].map((id) => byId.get(id));
    const summary = summarize(test, set, { ...first.responses, ...second.responses });
    return { section, first, second, estimate, summary, route: state.routes[section.id] };
  }

  function domainTable(summary) {
    return `<div class="tp-table-wrap"><table class="tp-table tp-results-table"><caption>By domain</caption>
      <thead><tr><th scope="col">Domain</th><th scope="col">Correct</th><th scope="col">Share</th></tr></thead>
      <tbody>${summary.byDomain.map((row) => `<tr><th scope="row">${esc(row.title)}</th><td>${row.correct} of ${row.total}</td><td>${Math.round((row.correct / row.total) * 100)}%</td></tr>`).join("")}</tbody></table></div>`;
  }

  function moduleReview(record, section) {
    return `<details class="tp-module-details"><summary>Review ${esc(section.title)} Module ${record.moduleIndex + 1}: ${record.correct} of ${record.ids.length} correct</summary>
      <div class="tp-review-list">${record.ids
        .map((id, position) => {
          const item = byId.get(id);
          const result = checkResponse(item, record.responses[id]);
          const status = result.correct
            ? "Correct"
            : result.answered
              ? "Incorrect"
              : "Not answered";
          return `<details class="tp-review-item ${result.correct ? "is-correct" : "is-missed"}"><summary><span>Question ${position + 1} · ${esc(item.skillTitle)}</span><span class="tp-review-status">${status}</span></summary>
          ${itemView(item, { response: record.responses[id] ?? "", checked: true, result: { correct: result.correct, answered: result.answered } }, { heading: "h3", number: position + 1, mode: "review", footer: "" })}</details>`;
        })
        .join("")}</div></details>`;
  }

  function resultsView() {
    const parts = sections.map(sectionResult);
    const total = totalEstimate(
      test,
      parts.map((part) => part.estimate),
    );
    return `<section class="tp-results" aria-labelledby="tp-results-title">
      <h2 id="tp-results-title" tabindex="-1">Your practice test results</h2>
      <div class="tp-estimate"><p class="eyebrow">${esc(total.label)} · total</p>
        <p class="tp-estimate-range">${total.low}–${total.high}</p>
        <p>${esc(test.title)} total scale, ${total.min}–${total.max}.</p>
        <p class="muted">Not an official score. Each section's band comes from the share correct in each module, with less credit for an easier second module. Official scoring weighs each question's difficulty, so a real score can fall outside these bands.</p></div>
      ${parts
        .map(
          (
            part,
          ) => `<section class="tp-section-result" aria-labelledby="tp-result-${esc(part.section.id)}">
        <h3 id="tp-result-${esc(part.section.id)}">${esc(part.section.title)}: ${part.estimate.low}–${part.estimate.high}</h3>
        <p class="muted">Module 1: ${part.first.correct} of ${part.first.ids.length} correct, which led to the ${part.route} Module 2. Module 2: ${part.second.correct} of ${part.second.ids.length} correct. Section scale ${part.estimate.min}–${part.estimate.max}.</p>
        ${domainTable(part.summary)}
        ${moduleReview(part.first, part.section)}${moduleReview(part.second, part.section)}
      </section>`,
        )
        .join("")}
      <div class="actions">${button("discard", "Start a new practice test")}${link(`/test-prep/${test.id}`, "Back to skills", "btn secondary")}</div>
      <p class="muted">${esc(NOT_AFFILIATED)}</p>
    </section>`;
  }

  function page() {
    const body = {
      intro: introView,
      resume: resumeView,
      directions: directionsView,
      module: moduleView,
      review: reviewView,
      break: breakView,
      results: resultsView,
    }[stage]();
    return `<div class="container tp-page tp-session tp-full" data-tp-stage="${esc(stage)}">${crumbs()}
      <div class="page-intro tp-session-intro"><p class="eyebrow">${esc(test.title)} · Full-length practice test</p><h1>${esc(test.title)} practice test</h1></div>
      ${saveFailed ? '<p class="quiz-notice" role="status">This browser is not saving progress, so leaving the page will end the test.</p>' : ""}
      ${body}
    </div>`;
  }

  // ---- Interactions

  function act(action, target) {
    const record = state && module();
    switch (action) {
      case "begin":
        return begin();
      case "resume":
        return resume();
      case "discard":
        return discard();
      case "open-section":
        return openModule(state.modules.length ? 1 : 0, 0);
      case "next":
        record.index = Math.min(record.ids.length - 1, record.index + 1);
        return go("module", QUESTION_TOP);
      case "prev":
        record.index = Math.max(0, record.index - 1);
        return go("module", QUESTION_TOP);
      case "goto":
        record.index = Number(target?.dataset.index) || 0;
        return go("module", QUESTION_TOP);
      case "flag": {
        const id = record.ids[record.index];
        record.flags = record.flags.includes(id)
          ? record.flags.filter((entry) => entry !== id)
          : [...record.flags, id];
        return go("module", '[data-tp-full="flag"]');
      }
      case "menu":
        menuOpen = !menuOpen;
        persist();
        pendingFocus = menuOpen
          ? "#tp-question-menu .tp-nav-item"
          : '[data-tp-full="menu"]';
        return repaint();
      case "reference":
        referenceOpen = !referenceOpen;
        pendingFocus = referenceOpen
          ? "#tp-reference-title"
          : '[data-tp-full="reference"]';
        return repaint();
      case "review":
        return go("review", "#tp-review-title");
      case "back":
        return go("module", QUESTION_TOP);
      case "submit":
        return submitModule(false);
      case "end-break":
        state.breakRemainingMs = 0;
        return go("directions", "#tp-directions-title");
      case "toggle-timer":
        state.timerHidden = !state.timerHidden;
        persist();
        pendingFocus = '[data-tp-full="toggle-timer"]';
        return repaint();
      default:
        return undefined;
    }
  }

  function respond(value) {
    const record = module();
    record.responses[record.ids[record.index]] = value;
    persist();
  }

  function eliminate(choiceId) {
    const record = module();
    const id = record.ids[record.index];
    const list = record.eliminated[id] || [];
    record.eliminated[id] = list.includes(choiceId)
      ? list.filter((entry) => entry !== choiceId)
      : [...list, choiceId];
    // A crossed-out choice cannot stay selected.
    if (record.eliminated[id].includes(record.responses[id])) delete record.responses[id];
    go("module", `[data-tp-eliminate="${choiceId}"]`);
  }

  // Time passing: module time-outs submit the module; the break ends itself.
  function tick() {
    if (!state || !["module", "review", "break"].includes(stage)) return;
    const left = remaining();
    if (left <= 0) {
      if (stage === "break") return act("end-break");
      return submitModule(true);
    }
    const crossed = left <= ALERT_MS && left + 1000 > ALERT_MS;
    if (crossed && stage !== "break") return repaint();
    return { left };
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
      const target = root.querySelector(pendingFocus);
      if (target) {
        if (!target.matches("button, a, input, [tabindex]"))
          target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: false });
      }
      pendingFocus = "";
    }
    const onClick = (event) => {
      const eliminator = event.target.closest?.("[data-tp-eliminate]");
      if (eliminator) return eliminate(eliminator.dataset.tpEliminate);
      const target = event.target.closest?.("[data-tp-full]");
      if (target) act(target.dataset.tpFull, target);
      return undefined;
    };
    const onChange = (event) => {
      if (stage !== "module" || !event.target.matches?.("[data-tp-choice]")) return;
      respond(event.target.value);
      // Selecting a crossed-out choice restores it.
      const record = module();
      const id = record.ids[record.index];
      if ((record.eliminated[id] || []).includes(event.target.value)) {
        record.eliminated[id] = record.eliminated[id].filter(
          (entry) => entry !== event.target.value,
        );
        go("module", `[data-tp-choice][value="${event.target.value}"]`);
      }
    };
    const onInput = (event) => {
      if (stage !== "module" || !event.target.matches?.("[data-tp-entry]")) return;
      const value = event.target.value;
      respond(value);
      const problem = value.trim() ? gridInEntryProblem(value) : null;
      const live = event.target.closest("form")?.querySelector("[data-tp-live]");
      if (live) live.textContent = problem || "";
      event.target.toggleAttribute("aria-invalid", Boolean(problem));
    };
    const onSubmit = (event) => {
      if (!event.target.matches?.("form[data-tp-item]")) return;
      event.preventDefault();
      const record = module();
      act(record.index < record.ids.length - 1 ? "next" : "review");
    };
    root.addEventListener("click", onClick);
    root.addEventListener("change", onChange);
    root.addEventListener("input", onInput);
    root.addEventListener("submit", onSubmit);

    const timed = state && ["module", "review", "break"].includes(stage);
    let timer = 0;
    if (timed)
      timer = setInterval(() => {
        const result = tick();
        if (!result) return;
        for (const element of root.querySelectorAll("[data-tp-clock]"))
          element.textContent = formatClock(result.left);
      }, 1000);
    // Save remaining time often, so a crash or closed tab loses little.
    const saver = timed ? setInterval(persist, 5000) : 0;
    const onHide = () => persist();
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("resize", placeBar);
      clearInterval(timer);
      clearInterval(saver);
      persist();
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onHide);
      root.removeEventListener("click", onClick);
      root.removeEventListener("change", onChange);
      root.removeEventListener("input", onInput);
      root.removeEventListener("submit", onSubmit);
    };
  }

  return {
    page,
    enhance,
    title: `${test.title} practice test`,
    // Exposed for tests.
    act,
    respond,
    eliminate,
    tick,
    debug: () => ({
      stage,
      state: state && JSON.parse(JSON.stringify(state)),
      remaining: remaining(),
    }),
  };
}

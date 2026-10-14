// HTML for the mock exam pages. Views read the exam payload, the attempt, and
// small UI flags from the controller; they never change state themselves.
import { escapeHtml as esc, arrow, breadcrumbs, link } from "../ui.js";
import { renderSource } from "../blocks.js";
import {
  breakRemainingMs,
  chosenOptions,
  currentSection,
  elapsedMs,
  formatClock,
  inReadingPeriod,
  mcqProgress,
  remainingMs,
  responseFields,
  responseKey,
  scoreSheet,
  scoringCriteria,
} from "./engine.js";

const letter = (index) => String.fromCharCode(65 + index);
const wordCount = (text) =>
  String(text).trim() ? String(text).trim().split(/\s+/u).length : 0;
const paragraphs = (text) =>
  String(text || "")
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${esc(paragraph)}</p>`)
    .join("");

function crumbs(data, tail) {
  return breadcrumbs([
    ["Courses", "/courses"],
    [data.course.shortTitle || data.course.title, `/course/${data.course.id}`],
    [tail],
  ]);
}

function examButton(label, action, { secondary = false, extra = "" } = {}) {
  return `<button type="button" class="btn ${secondary ? "secondary" : ""}" data-exam-action="${esc(action)}" ${extra}>${label}</button>`;
}

function sectionSize(section) {
  if (section.kind === "mcq") return `${section.questionCount} questions`;
  return section.prompts
    .map((prompt) =>
      prompt.choose < prompt.options.length
        ? `${prompt.label} (choose ${prompt.choose} of ${prompt.options.length})`
        : prompt.label,
    )
    .join("; ");
}

function formatTable(data) {
  const rows = data.sections
    .map(
      (section) =>
        `<tr><th scope="row">${esc(section.part)}<span class="exam-table-sub">${esc(section.title)}</span></th><td>${esc(sectionSize(section))}</td><td>${section.minutes} min${section.readingMinutes ? ` (includes ${section.readingMinutes}-min reading period)` : ""}</td><td>${section.weight}%</td></tr>`,
    )
    .join("");
  return `<div class="table-wrap" role="region" tabindex="0" aria-label="Exam format"><table class="exam-format-table"><thead><tr><th scope="col">Part</th><th scope="col">Questions</th><th scope="col">Time</th><th scope="col">Weight</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function historyView(history) {
  if (!history.length) return "";
  const rows = history
    .map(
      (item) =>
        `<tr><td>${esc(new Date(item.finishedAt).toLocaleDateString())}</td><td>${item.timed ? "Timed" : "Untimed"}</td><td>${item.mcqCorrect} / ${item.mcqTotal}</td><td>${item.complete ? `${item.weightedPercent}%` : "Writing not scored yet"}</td></tr>`,
    )
    .join("");
  return `<section class="exam-history" aria-labelledby="exam-history-title"><h2 id="exam-history-title">Earlier attempts</h2><div class="table-wrap" role="region" tabindex="0" aria-label="Earlier attempts"><table><thead><tr><th scope="col">Finished</th><th scope="col">Mode</th><th scope="col">Multiple choice</th><th scope="col">Weighted estimate</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
}

function statusLine(store) {
  if (store.state === "failed")
    return '<p class="exam-save-state is-warning" role="status">This attempt could not be saved in this browser. Keep this tab open.</p>';
  if (store.state === "temporary")
    return '<p class="exam-save-state" role="status">Saving for this tab only.</p>';
  if (store.state === "conflict")
    return '<p class="exam-save-state is-warning" role="status">This exam changed in another tab. Use one tab per exam.</p>';
  return "";
}

export function introPage(data, store, ui = {}) {
  const attempt = store.attempt;
  const total = formatClock(data.format.minutes * 60_000);
  const resume = attempt
    ? `<section class="exam-resume" aria-labelledby="exam-resume-title"><h2 id="exam-resume-title">${attempt.status === "finished" ? "Your last attempt" : "Attempt in progress"}</h2><p>${attempt.status === "finished" ? "Review your answers and score your writing." : `${attempt.timed ? "Timed" : "Untimed"} · ${esc(currentSection(attempt, data)?.part || "")}. In a timed exam the clock keeps running while you are away.`}</p><div class="actions">${examButton(attempt.status === "finished" ? `View results ${arrow}` : `Resume ${arrow}`, "resume")}${ui.confirmDiscard ? examButton("Yes, discard it", "discard", { secondary: true }) + examButton("Keep it", "cancel-discard", { secondary: true }) : examButton("Discard attempt", "prepare-discard", { secondary: true })}</div></section>`
    : "";
  const start = attempt
    ? ""
    : `<div class="exam-mode-grid">
      <div class="exam-mode-card"><h2>Timed</h2><p>Each part runs on the real exam clock and is submitted when time runs out. The clock keeps running if you leave the page.</p>${examButton(`Start timed exam ${arrow}`, "start-timed")}</div>
      <div class="exam-mode-card"><h2>Untimed</h2><p>Work through the same sections in order without a time limit. Elapsed time is shown for reference.</p>${examButton(`Start untimed ${arrow}`, "start-untimed", { secondary: true })}</div>
    </div>`;
  return `<div class="exam-page">${crumbs(data, "Mock exam")}
    <header class="exam-header"><p class="eyebrow">Mock exam · ${esc(total)} total</p><h1>${esc(data.exam.title)}</h1><p>${esc(data.exam.description)}</p></header>
    ${store.stale ? '<p class="note" role="status">This exam was updated, so an earlier unfinished attempt cannot be resumed.</p>' : ""}
    ${statusLine(store)}
    ${resume}${start}
    <section aria-labelledby="exam-format-title"><h2 id="exam-format-title">Exam format</h2>${formatTable(data)}<p class="muted">${esc(data.format.note)}</p></section>
    ${historyView(store.history)}
  </div>`;
}

function clockView(attempt, data, now) {
  const section = currentSection(attempt, data);
  const remaining = remainingMs(attempt, data, now);
  const label = remaining === null ? "Elapsed" : "Time left";
  const value =
    remaining === null
      ? formatClock(elapsedMs(attempt, section, now))
      : formatClock(remaining);
  const warning = remaining !== null && remaining <= 5 * 60_000 ? " is-warning" : "";
  return `<div class="exam-clock${warning}"><span>${label}</span><strong data-exam-clock>${value}</strong></div>`;
}

function sectionBar(attempt, data, now, detail = "") {
  const section = currentSection(attempt, data);
  return `<div class="exam-bar" aria-label="Section status"><div><p class="eyebrow">${esc(section.part)} · ${esc(section.title)}</p>${detail}</div>${clockView(attempt, data, now)}</div><p class="visually-hidden" aria-live="polite" data-exam-announce></p>`;
}

export function betweenPage(data, store) {
  const attempt = store.attempt;
  const section = currentSection(attempt, data);
  const first = attempt.status === "intro";
  return `<div class="exam-page">${crumbs(data, "Mock exam")}
    <div class="exam-section-intro"><p class="eyebrow">${first ? "Ready to begin" : "Next part"}</p><h1>${esc(section.part)}: ${esc(section.title)}</h1>
    <p>${esc(section.instructions)}</p>
    <ul class="exam-facts"><li>${esc(sectionSize(section))}</li><li>${section.minutes} minutes${attempt.timed ? "" : " suggested (untimed)"}</li><li>${section.weight}% of the exam score</li></ul>
    ${attempt.timed ? "<p>The clock starts when you begin and cannot be paused. You cannot return to earlier parts.</p>" : "<p>You cannot return to earlier parts after submitting them.</p>"}
    <div class="actions">${examButton(`Begin ${esc(section.part)} ${arrow}`, "begin-section")}${link(`/exam/${data.exam.id}?view=overview`, "Exam overview", "btn secondary")}</div></div>
    ${statusLine(store)}
  </div>`;
}

export function breakPage(data, store, now = Date.now()) {
  const remaining = breakRemainingMs(store.attempt, data, now);
  const next = currentSection(store.attempt, data);
  return `<div class="exam-page">${crumbs(data, "Mock exam")}
    <div class="exam-section-intro"><p class="eyebrow">Break</p><h1>Take a break</h1>
    <p>The AP exam includes a break before ${esc(next.part)}. Stand up, get water, and come back ready to write.</p>
    <div class="exam-clock"><span>Break left</span><strong data-exam-clock>${formatClock(remaining)}</strong></div>
    <div class="actions">${examButton(`End break ${arrow}`, "end-break")}</div></div>
  </div>`;
}

function navigatorView(attempt, section, open = false) {
  const buttons = section.questions
    .map((question, index) => {
      const answered = Number.isInteger(attempt.mcq.answers[question.id]);
      const flagged = Boolean(attempt.mcq.flags[question.id]);
      const current = index === attempt.mcq.current;
      const state = [answered ? "answered" : "unanswered", flagged ? "flagged" : ""]
        .filter(Boolean)
        .join(", ");
      return `<button type="button" class="exam-nav-item${answered ? " is-answered" : ""}${flagged ? " is-flagged" : ""}" data-exam-action="go" data-index="${index}" ${current ? 'aria-current="true"' : ""} aria-label="Question ${index + 1}, ${state}">${index + 1}</button>`;
    })
    .join("");
  return `<details class="exam-navigator" ${open ? "open" : ""}><summary>All questions</summary><div class="exam-nav-grid">${buttons}</div><p class="muted">Filled: answered. Marked: flagged for review.</p></details>`;
}

function submitPanel(label, progressText) {
  return `<section class="exam-submit-panel" role="alertdialog" aria-labelledby="exam-submit-title"><h2 id="exam-submit-title">Submit ${esc(label)}?</h2><p>${progressText}</p><p>You cannot return to this part after submitting it.</p><div class="actions">${examButton("Submit now", "submit-section")}${examButton("Keep working", "cancel-submit", { secondary: true })}</div></section>`;
}

export function mcqPage(data, store, ui = {}, now = Date.now()) {
  const attempt = store.attempt;
  const section = currentSection(attempt, data);
  const index = attempt.mcq.current;
  const question = section.questions[index];
  const progress = mcqProgress(attempt, section);
  const selected = attempt.mcq.answers[question.id];
  const flagged = Boolean(attempt.mcq.flags[question.id]);
  const previous = section.questions[index - 1];
  // A stimulus is repeated on every question in its set, as on screen in the AP exam.
  const setStart = !previous || previous.stimulusId !== question.stimulusId;
  const stimulus = (question.stimulusBlocks || [])
    .filter((block) => block.type === "source")
    .map((block) => renderSource(block))
    .join("");
  const choices = question.choices
    .map(
      (choice, choiceIndex) =>
        `<label class="choice${selected === choiceIndex ? " is-selected" : ""}"><input type="radio" name="exam-answer" value="${choiceIndex}" data-exam-answer data-question="${esc(question.id)}" ${selected === choiceIndex ? "checked" : ""}><span class="choice-letter" aria-hidden="true">${letter(choiceIndex)}</span><span><span class="visually-hidden">${letter(choiceIndex)}. </span>${esc(choice)}</span></label>`,
    )
    .join("");
  const detail = `<p class="exam-progress">${progress.answered} of ${section.questions.length} answered · ${progress.flagged} flagged</p>`;
  return `<div class="exam-page exam-active">
    ${sectionBar(attempt, data, now, detail)}
    ${statusLine(store)}
    ${ui.confirmSubmit ? submitPanel(section.part, `${progress.unanswered} unanswered and ${progress.flagged} flagged.`) : ""}
    ${navigatorView(attempt, section, ui.navigatorOpen)}
    <article class="question-card exam-question" aria-labelledby="exam-question-heading">
      <p class="question-meta">Question ${index + 1} of ${section.questions.length}${setStart ? "" : " · same source as the previous question"}</p>
      ${stimulus}
      <h2 id="exam-question-heading">${esc(question.prompt)}</h2>
      <fieldset class="choices"><legend class="visually-hidden">Choose one answer</legend>${choices}</fieldset>
      <div class="exam-question-actions">
        ${examButton(flagged ? "Remove flag" : "Flag for review", "flag", { secondary: true, extra: `data-question="${esc(question.id)}" aria-pressed="${flagged}"` })}
        <div class="actions">
          ${index > 0 ? examButton("Previous", "go", { secondary: true, extra: `data-index="${index - 1}"` }) : ""}
          ${index < section.questions.length - 1 ? examButton(`Next ${arrow}`, "go", { extra: `data-index="${index + 1}"` }) : ""}
          ${examButton(`Review and submit`, "prepare-submit", { secondary: index < section.questions.length - 1 })}
        </div>
      </div>
    </article>
  </div>`;
}

function documentView(document, index) {
  return renderSource({
    type: "source",
    sourceType: document.sourceType,
    attribution: `Document ${index + 1}. ${document.attribution || document.label}`,
    text: document.content,
    citation: document.citation,
    note: document.note,
  });
}

function optionBody(attempt, section, prompt, option, { readOnly = false } = {}) {
  const key = responseKey(section.id, prompt.id, option.id);
  const response = attempt.responses[key] || {};
  const stimulus = (option.stimulusBlocks || [])
    .map((block) => renderSource(block))
    .join("");
  const documents = (option.documents || []).map(documentView).join("");
  const fields = responseFields(option)
    .map((field) => {
      const value = response[field.id] || "";
      const id = `exam-${key.replaceAll("/", "-")}-${field.id}`;
      const fieldPrompt =
        (option.exerciseType || "saq") === "saq"
          ? `<p class="exam-part-prompt"><strong>(${esc(field.id)})</strong> ${esc(field.prompt)}</p>`
          : field.prompt
            ? `<p class="muted">${esc(field.prompt)}</p>`
            : "";
      if (readOnly)
        return `<div class="exam-response"><h4>${esc(field.label)}</h4>${fieldPrompt}${value.trim() ? `<div class="exam-response-text">${paragraphs(value)}</div>` : '<p class="muted">No response.</p>'}</div>`;
      return `<div class="exam-response">${fieldPrompt}<label for="${esc(id)}">${esc(field.label)}${field.required === false ? " (optional)" : ""}</label><textarea id="${esc(id)}" rows="${field.rows}" data-exam-field="${esc(field.id)}" data-section="${esc(section.id)}" data-prompt="${esc(prompt.id)}" data-option="${esc(option.id)}" spellcheck="true">${esc(value)}</textarea><p class="exam-word-count" data-exam-words="${esc(id)}">${wordCount(value)} words</p></div>`;
    })
    .join("");
  return `${stimulus}${documents ? `<div class="exam-documents">${documents}</div>` : ""}<p class="exam-prompt-text">${esc(option.prompt)}</p>${fields}`;
}

function promptView(attempt, section, prompt) {
  const chosen = chosenOptions(attempt, section, prompt);
  const choosing = prompt.choose < prompt.options.length;
  const picker = choosing
    ? `<fieldset class="exam-choice"><legend>Choose ${prompt.choose} to answer</legend>${prompt.options
        .map((option, index) => {
          const isChosen = chosen.includes(option);
          return `<button type="button" class="btn ${isChosen ? "" : "secondary"}" data-exam-action="choose" data-prompt="${esc(prompt.id)}" data-option="${esc(option.id)}" aria-pressed="${isChosen}">Option ${index + 1}: ${esc(option.headline || option.title)}</button>`;
        })
        .join("")}</fieldset>`
    : "";
  const bodies = chosen
    .map(
      (option) =>
        `<div class="exam-option"><h3>${esc(option.promptTitle || option.title)}</h3>${optionBody(attempt, section, prompt, option)}</div>`,
    )
    .join("");
  return `<section class="exam-prompt" aria-labelledby="exam-prompt-${esc(prompt.id)}"><h2 id="exam-prompt-${esc(prompt.id)}">${esc(prompt.label)}</h2>${picker}${bodies || (choosing ? '<p class="muted">Choose a question to see it and start writing.</p>' : "")}</section>`;
}

export function writingPage(data, store, ui = {}, now = Date.now()) {
  const attempt = store.attempt;
  const section = currentSection(attempt, data);
  const reading = inReadingPeriod(attempt, data, now)
    ? `<p class="exam-reading-note" data-exam-reading>Suggested reading period: read and plan for the first ${section.readingMinutes} minutes.</p>`
    : "";
  const answered = section.prompts.reduce(
    (sum, prompt) =>
      sum +
      chosenOptions(attempt, section, prompt).filter((option) =>
        Object.values(
          attempt.responses[responseKey(section.id, prompt.id, option.id)] || {},
        ).some((text) => String(text).trim()),
      ).length,
    0,
  );
  const needed = section.prompts.reduce((sum, prompt) => sum + prompt.choose, 0);
  return `<div class="exam-page exam-active">
    ${sectionBar(attempt, data, now, `<p class="exam-progress">${answered} of ${needed} responses started</p>`)}
    ${statusLine(store)}
    ${reading}
    ${ui.confirmSubmit ? submitPanel(section.part, `${answered} of ${needed} responses started.`) : ""}
    <p class="exam-instructions">${esc(section.instructions)}</p>
    ${section.prompts.map((prompt) => promptView(attempt, section, prompt)).join("")}
    <div class="actions exam-submit-row">${examButton(`Submit ${esc(section.part)}`, "prepare-submit")}</div>
  </div>`;
}

function mcqResults(data, section, sheetSection, attempt) {
  const skills = sheetSection.skills
    .map(
      (skill) =>
        `<tr><th scope="row">${skill.code ? `<span class="skill-code">${esc(skill.code)}</span> ` : ""}${esc(skill.label)}</th><td>${skill.correct} / ${skill.total}</td></tr>`,
    )
    .join("");
  const review = section.questions
    .map((question, index) => {
      const result = sheetSection.questions[index];
      const status =
        result.selected === null
          ? "Unanswered"
          : result.correct
            ? "Correct"
            : "Incorrect";
      return `<details class="exam-review-item ${result.correct ? "is-correct" : "is-incorrect"}"><summary>Question ${index + 1} · ${status}${result.flagged ? " · flagged" : ""}</summary>
        <p class="exam-review-prompt">${esc(question.prompt)}</p>
        <p>Your answer: ${result.selected === null ? "none" : `${letter(result.selected)}. ${esc(question.choices[result.selected])}`}</p>
        <p>Correct answer: ${letter(question.correctAnswer)}. ${esc(question.choices[question.correctAnswer])}</p>
        <p>${esc(question.explanation)}</p>
        ${question.choiceExplanations ? `<ul>${question.choiceExplanations.map((text, choiceIndex) => `<li><strong>${letter(choiceIndex)}.</strong> ${esc(text)}</li>`).join("")}</ul>` : ""}
      </details>`;
    })
    .join("");
  return `<section class="exam-result-section" aria-labelledby="result-${esc(section.id)}"><h2 id="result-${esc(section.id)}">${esc(section.part)}: ${esc(section.title)}</h2>
    <p class="exam-score-line">${sheetSection.points} of ${sheetSection.maxPoints} correct</p>
    ${skills ? `<div class="table-wrap" role="region" tabindex="0" aria-label="Multiple choice by AP skill"><table><thead><tr><th scope="col">AP skill</th><th scope="col">Correct</th></tr></thead><tbody>${skills}</tbody></table></div>` : ""}
    <div class="exam-review-list">${review}</div></section>`;
}

function modelView(option) {
  if ((option.exerciseType || "saq") === "saq")
    return `<details class="exam-model"><summary>Model answers</summary>${option.parts
      .map(
        (part) =>
          `<div><h5>Part ${esc(part.id.toUpperCase())}</h5><p>${esc(part.model.answer)} ${esc(part.model.prove)} ${esc(part.model.explain)}</p>${part.alternatives ? `<p class="muted">${esc(part.alternatives)}</p>` : ""}</div>`,
      )
      .join("")}</details>`;
  if (!option.modelResponse) return "";
  const notes = (option.modelNotes || [])
    .map((note) => `<li><strong>${esc(note.label)}:</strong> ${esc(note.text)}</li>`)
    .join("");
  return `<details class="exam-model"><summary>Model essay</summary>${paragraphs(option.modelResponse)}${notes ? `<ul>${notes}</ul>` : ""}</details>`;
}

function writingResults(data, section, sheetSection, attempt) {
  const items = sheetSection.items
    .map((item) => {
      const prompt = section.prompts.find((candidate) => candidate.id === item.promptId);
      if (!item.option)
        return `<div class="exam-result-item"><h3>${esc(prompt.label)}</h3><p class="muted">No question was chosen. 0 of ${item.maxPoints} points.</p></div>`;
      const scored = attempt.scores[item.key] || {};
      const criteria = scoringCriteria(item.option)
        .map((row) => {
          const options = Array.from({ length: row.points + 1 }, (_, value) => value)
            .map(
              (value) =>
                `<option value="${value}" ${scored[row.id] === value ? "selected" : ""}>${value}</option>`,
            )
            .join("");
          return `<div class="exam-criterion"><label><span>${esc(row.label)} (${row.points} ${row.points === 1 ? "point" : "points"})</span><select data-exam-score data-key="${esc(item.key)}" data-criterion="${esc(row.id)}" ${item.answered ? "" : "disabled"}><option value="" ${row.id in scored ? "" : "selected"}>Not scored</option>${options}</select></label>${row.description ? `<p class="muted">${esc(row.description)}</p>` : ""}</div>`;
        })
        .join("");
      return `<div class="exam-result-item"><h3>${esc(prompt.label)}: ${esc(item.option.promptTitle || item.option.title)}</h3>
        <p class="exam-score-line">${item.answered ? `${item.points} of ${item.maxPoints} points${item.complete ? "" : " so far"}` : `No response · 0 of ${item.maxPoints} points`}</p>
        <details class="exam-your-work"><summary>Your response</summary>${optionBody(attempt, section, prompt, item.option, { readOnly: true })}</details>
        ${item.answered ? `<fieldset class="exam-self-score"><legend>Score your response with the rubric</legend>${criteria}</fieldset>` : ""}
        ${modelView(item.option)}
      </div>`;
    })
    .join("");
  return `<section class="exam-result-section" aria-labelledby="result-${esc(section.id)}"><h2 id="result-${esc(section.id)}">${esc(section.part)}: ${esc(section.title)}</h2>
    <p class="exam-score-line">${sheetSection.points} of ${sheetSection.maxPoints} points${sheetSection.complete ? "" : " (scoring not finished)"}</p>${items}</section>`;
}

export function resultsPage(data, store, ui = {}) {
  const attempt = store.attempt;
  const sheet = scoreSheet(attempt, data);
  const summary = sheet.sections
    .map((sheetSection) => {
      const section = data.sections.find((item) => item.id === sheetSection.id);
      const contribution = sheetSection.maxPoints
        ? Math.round(
            (sheetSection.points / sheetSection.maxPoints) * section.weight * 10,
          ) / 10
        : 0;
      return `<tr><th scope="row">${esc(section.part)}<span class="exam-table-sub">${esc(section.title)}</span></th><td>${sheetSection.points} / ${sheetSection.maxPoints}${sheetSection.complete ? "" : " *"}</td><td>${section.weight}%</td><td>${contribution}</td></tr>`;
    })
    .join("");
  const expired = data.sections.filter((section) => attempt.sections[section.id].expired);
  const sections = data.sections
    .map((section, index) =>
      section.kind === "mcq"
        ? mcqResults(data, section, sheet.sections[index], attempt)
        : writingResults(data, section, sheet.sections[index], attempt),
    )
    .join("");
  return `<div class="exam-page">${crumbs(data, "Mock exam results")}
    <header class="exam-header"><p class="eyebrow">${attempt.timed ? "Timed" : "Untimed"} mock exam · results</p><h1>${esc(data.exam.title)}</h1></header>
    ${statusLine(store)}
    <section class="exam-estimate" aria-labelledby="exam-estimate-title"><h2 id="exam-estimate-title">Weighted estimate</h2>
      <p class="exam-estimate-value">${sheet.weightedPercent}%${sheet.complete ? "" : " so far"}</p>
      <p>${sheet.complete ? "Each part counts by its exam weight." : "Score each writing response below to complete the estimate. Unscored responses count as zero until you score them."} This is a self-assessed practice estimate, not an AP score from 1 to 5.</p>
      ${expired.length ? `<p class="muted">Time ran out on: ${expired.map((section) => esc(section.part)).join(", ")}.</p>` : ""}
      <div class="table-wrap" role="region" tabindex="0" aria-label="Score by part"><table><thead><tr><th scope="col">Part</th><th scope="col">Points</th><th scope="col">Weight</th><th scope="col">Weighted</th></tr></thead><tbody>${summary}</tbody></table></div>
      ${sheet.complete ? "" : '<p class="muted">* Writing scores not finished.</p>'}
    </section>
    ${sections}
    <div class="actions">${ui.confirmRetake ? examButton("Start a new attempt", "retake") + examButton("Cancel", "cancel-retake", { secondary: true }) : examButton("Take this exam again", "prepare-retake", { secondary: true })}${link(`/course/${data.course.id}`, "Back to course", "btn secondary")}</div>
  </div>`;
}

export function examPage(data, store, ui = {}, now = Date.now()) {
  const attempt = store.attempt;
  if (!attempt || ui.view === "overview") return introPage(data, store, ui);
  if (attempt.status === "finished") return resultsPage(data, store, ui);
  if (attempt.status === "break") return breakPage(data, store, now);
  if (["intro", "between"].includes(attempt.status)) return betweenPage(data, store);
  return currentSection(attempt, data).kind === "mcq"
    ? mcqPage(data, store, ui, now)
    : writingPage(data, store, ui, now);
}

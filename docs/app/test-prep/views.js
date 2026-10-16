// PSAT/SAT prep HTML: the test-selection page, one page per test, and the item
// renderer shared by every future practice mode. Views return strings and
// escape all authored text.
import { escapeHtml as esc, link, arrow, badge, breadcrumbs } from "../ui.js";
import { CHOICE_IDS, GRID_IN, NOT_AFFILIATED, scaleLabel } from "./engine.js";

const FORMAT_LABELS = {
  "single-select": "Multiple choice",
  "grid-in": "Student-produced response",
};

const crumbs = (tail) =>
  breadcrumbs([
    ["Home", "/"],
    ["PSAT / SAT", tail ? "/test-prep" : ""],
    ...(tail ? [[tail]] : []),
  ]);

function sectionLine(section) {
  return `${section.questions} questions · ${section.minutes} min · ${section.modules} modules`;
}

function itemStatus(count) {
  return count > 0
    ? badge("ready", `${count} practice ${count === 1 ? "item" : "items"}`)
    : badge("soon", "Items in preparation");
}

function scaleNote(test) {
  return test.scale.family === "psat89"
    ? "PSAT 8/9 has its own scale. Page One never shows a PSAT 8/9 estimate as equal to a PSAT 10, PSAT/NMSQT, or SAT score."
    : "Page One reports practice estimates on this scale only.";
}

function sourcesList(index, ids) {
  const sources = ids
    .map((id) => index.sources.find((source) => source.id === id))
    .filter(Boolean);
  if (!sources.length) return "";
  return `<ul class="tp-sources">${sources
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.label)}</a></li>`,
    )
    .join("")}</ul>`;
}

function notice(index, ids) {
  return `<aside class="tp-notice" aria-label="About this practice">
    <p>${esc(index.notice || NOT_AFFILIATED)}</p>
    <p class="muted">Test formats, timing, score ranges, and skill names follow these official descriptions:</p>
    ${sourcesList(index, ids)}
  </aside>`;
}

function testCard(test) {
  const scale = scaleLabel(test);
  const titleId = `tp-${esc(test.id)}-title`;
  return `<article class="tp-test-card" aria-labelledby="${titleId}">
    <p class="eyebrow">${esc(test.audience)}</p>
    <h2 id="${titleId}">${esc(test.title)}</h2>
    <p class="tp-test-description">${esc(test.description)}</p>
    <dl class="tp-facts">
      <div><dt>Score scale</dt><dd>${esc(scale.total)} <span class="muted">(sections ${esc(scale.section)})</span></dd></div>
      ${test.sections.map((section) => `<div><dt>${esc(section.title)}</dt><dd>${esc(sectionLine(section))}</dd></div>`).join("")}
    </dl>
    ${test.scale.family === "psat89" ? `<p class="tp-scale-note">${esc(scaleNote(test))}</p>` : ""}
    <div class="tp-card-foot">${itemStatus(test.itemCount)}${link(`/test-prep/${test.id}`, `View skills ${arrow}`, "btn secondary")}</div>
  </article>`;
}

export function testPrepIndexPage({ testPrep }) {
  const allSourceIds = testPrep.sources.map((source) => source.id);
  return `<div class="container tp-page">${crumbs()}
    <div class="page-intro"><p class="eyebrow">PSAT / SAT prep</p><h1>Choose your test.</h1>
      <p>Each test lists its sections, skill domains, and timing. Practice items are written by Page One to match official question types.</p></div>
    <div class="tp-test-grid">${testPrep.tests.map(testCard).join("")}</div>
    ${notice(testPrep, allSourceIds)}
  </div>`;
}

function skillRow(skill) {
  const variants = skill.variants?.length
    ? `<span class="muted"> (${esc(skill.variants.map((variant) => variant.title).join(", "))})</span>`
    : "";
  return `<li class="tp-skill"><span>${esc(skill.title)}${variants}</span><span class="tp-skill-count">${skill.itemCount ? `${skill.itemCount}` : '<span class="visually-hidden">No items yet</span>–'}</span></li>`;
}

function sectionBlock(section) {
  return `<section class="tp-section" aria-labelledby="tp-section-${esc(section.id)}">
    <div class="section-heading"><div><h2 id="tp-section-${esc(section.id)}">${esc(section.title)}</h2>
      <p class="muted">${esc(sectionLine(section))} · ${esc(section.formats.map((format, index) => (index ? FORMAT_LABELS[format].toLowerCase() : FORMAT_LABELS[format])).join(" and "))}</p></div>${itemStatus(section.itemCount)}</div>
    <div class="tp-domain-grid">${section.domains
      .map(
        (domain) => `<article class="tp-domain"><h3>${esc(domain.title)}</h3>
        <ul class="tp-skill-list" aria-label="${esc(domain.title)} skills">${domain.skills.map(skillRow).join("")}</ul></article>`,
      )
      .join("")}</div>
  </section>`;
}

export function testPrepTestPage({ testPrep, test }) {
  const scale = scaleLabel(test);
  const others = testPrep.tests.filter((item) => item.id !== test.id);
  return `<div class="container tp-page">${crumbs(test.title)}
    <div class="page-intro"><p class="eyebrow">${esc(test.audience)}</p><h1>${esc(test.title)}</h1><p>${esc(test.description)}</p></div>
    <div class="tp-scale" role="note"><p><strong>Score scale:</strong> ${esc(scale.total)} total, ${esc(scale.section)} per section.</p><p class="muted">${esc(scaleNote(test))}</p></div>
    ${test.sections.map(sectionBlock).join("")}
    <nav class="tp-other-tests" aria-label="Other tests"><p class="eyebrow">Other tests</p>${others.map((item) => link(`/test-prep/${item.id}`, esc(item.title), "text-link")).join("")}</nav>
    ${notice(testPrep, test.sourceIds)}
  </div>`;
}

// ---------------------------------------------------------------------------
// Item renderer.
//
// state: { response, checked, problem, result }
//   response: choice ID ("A"-"D") or the grid-in text
//   checked:  true after the student checks a well-formed answer
//   problem:  an entry-format message for a grid-in, shown instead of feedback
//   result:   { correct } from checkResponse

const itemDomId = (item) => `tp-item-${item.id}`;

function citation(source) {
  return `${esc(source.author)}, <cite>${esc(source.title)}</cite> (${esc(source.publication)}, ${esc(source.year)})`;
}

function passageView(item) {
  if (item.passage) {
    const { source } = item.passage;
    const paragraphs = item.passage.text
      .split(/\n\s*\n/)
      .map((text) => `<p>${esc(text.trim())}</p>`)
      .join("");
    return `<figure class="tp-passage"><blockquote>${paragraphs}</blockquote>
      <figcaption>${citation(source)}. <a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">Source text</a></figcaption></figure>`;
  }
  if (item.originalText)
    return `<div class="stimulus tp-original"><p class="eyebrow">Written by Page One for practice</p>${item.originalText
      .split(/\n\s*\n/)
      .map((text) => `<p>${esc(text.trim())}</p>`)
      .join("")}</div>`;
  return "";
}

function tableView(table) {
  if (!table) return "";
  const note =
    table.data === "illustrative"
      ? "Illustrative data written for practice."
      : `Data: ${table.data.label}`;
  return `<div class="tp-table-wrap"><table class="tp-table"><caption>${esc(table.title)}</caption>
    <thead><tr>${table.columns.map((column) => `<th scope="col">${esc(column)}</th>`).join("")}</tr></thead>
    <tbody>${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table><p class="tp-table-note muted">${esc(note)}</p></div>`;
}

function choicesView(item, state) {
  const name = `${itemDomId(item)}-answer`;
  const checked = state.checked === true;
  return `<fieldset class="choices" aria-labelledby="${itemDomId(item)}-stem"><legend class="visually-hidden">Choose one answer</legend>
    ${item.choices
      .map((choice) => {
        const selected = state.response === choice.id;
        const correct = checked && choice.id === item.answer;
        const wrong = checked && selected && !correct;
        const mark = correct ? "Correct answer" : wrong ? "Your answer" : "";
        return `<div class="choice-row"><label class="choice ${correct ? "correct" : wrong ? "incorrect" : ""}">
        <input type="radio" name="${esc(name)}" value="${esc(choice.id)}" data-tp-choice ${selected ? "checked" : ""} ${checked ? "disabled" : ""}>
        <span class="choice-letter" aria-hidden="true">${esc(choice.id)}</span>
        <span><span class="visually-hidden">${esc(choice.id)}. </span>${esc(choice.text)}</span>
        ${mark ? `<span class="answer-mark">${mark}</span>` : ""}
      </label></div>`;
      })
      .join("")}
  </fieldset>`;
}

function gridInView(item, state) {
  const inputId = `${itemDomId(item)}-entry`;
  const rulesId = `${itemDomId(item)}-rules`;
  const problemId = `${itemDomId(item)}-problem`;
  const checked = state.checked === true;
  const status = checked ? (state.result?.correct ? "correct" : "incorrect") : "";
  return `<div class="tp-grid-in ${status}">
    <label for="${inputId}">Your answer</label>
    <input id="${inputId}" class="tp-grid-in-input" type="text" inputmode="decimal" autocomplete="off" autocapitalize="off" spellcheck="false"
      maxlength="${GRID_IN.maxNegativeLength + 2}" value="${esc(state.response || "")}" data-tp-entry
      aria-describedby="${rulesId}${state.problem ? ` ${problemId}` : ""}" ${state.problem ? 'aria-invalid="true"' : ""} ${checked ? "readonly" : ""}>
    <p id="${rulesId}" class="tp-grid-in-rules muted">Up to ${GRID_IN.maxPositiveLength} characters, or ${GRID_IN.maxNegativeLength} for a negative answer. Use a fraction such as 7/2 or a decimal such as 3.5. Mixed numbers are not accepted.</p>
    ${state.problem ? `<p id="${problemId}" class="tp-grid-in-problem" role="alert">${esc(state.problem)}</p>` : ""}
  </div>`;
}

function feedbackView(item, state) {
  if (!state.checked) return "";
  const correct = state.result?.correct === true;
  const answer =
    item.format === "grid-in"
      ? `<p><strong>Accepted answers:</strong> ${item.acceptedAnswers.map((entry) => `<code>${esc(entry)}</code>`).join(", ")}</p>`
      : correct
        ? ""
        : `<p><strong>Correct answer:</strong> ${esc(item.answer)}. ${esc(item.choices.find((choice) => choice.id === item.answer).text)}</p>`;
  const rationales =
    item.format === "single-select"
      ? `<details class="choice-explanations" ${correct ? "" : "open"}><summary>Why the other choices miss</summary><ul>${CHOICE_IDS.filter(
          (id) => id !== item.answer,
        )
          .map(
            (id) => `<li><strong>${esc(id)}.</strong> ${esc(item.rationales[id])}</li>`,
          )
          .join("")}</ul></details>`
      : "";
  return `<div class="answer-feedback ${correct ? "" : "wrong"}" id="${itemDomId(item)}-feedback" tabindex="-1" role="status">
    <h4>${correct ? "✓ Correct" : "✗ Incorrect"}</h4>${answer}
    <p><strong>Why:</strong> ${esc(item.explanation)}</p>${rationales}
  </div>`;
}

export function itemView(item, state = {}, { heading = "h2", number = null } = {}) {
  const checked = state.checked === true;
  const canCheck =
    !checked &&
    (item.format === "grid-in"
      ? String(state.response || "").trim() !== ""
      : Boolean(state.response));
  const meta = [
    number ? `Question ${number}` : "",
    item.skillTitle,
    FORMAT_LABELS[item.format],
  ]
    .filter(Boolean)
    .join(" · ");
  return `<form class="question-card tp-item" id="${esc(itemDomId(item))}" data-tp-item="${esc(item.id)}" novalidate>
    <p class="question-meta">${esc(meta)}</p>
    ${passageView(item)}${tableView(item.table)}
    <${heading} id="${esc(itemDomId(item))}-stem" class="tp-stem">${esc(item.stem)}</${heading}>
    ${item.format === "grid-in" ? gridInView(item, state) : choicesView(item, state)}
    ${feedbackView(item, state)}
    <div class="question-actions"><p>${checked ? "Read the explanation, then continue." : item.format === "grid-in" ? "Type your answer, then check it." : "Choose an answer, then check it."}</p>
      <div class="question-action-buttons">${checked ? `<button type="button" class="btn secondary" data-tp-action="retry">Try again</button>` : `<button type="submit" class="btn" ${canCheck ? "" : "disabled"}>Check answer</button>`}</div></div>
  </form>`;
}

import { escapeHtml as esc } from "../ui.js";
import { renderBlocks } from "../blocks.js";
import { formatWritingExport } from "../writing/export.js";
import { qrSvg } from "../share/qr.js";
import { publicUrl } from "../share/links.js";
import { responseSpaceForWriting } from "./selection.js";

function sourceLabels(sources = []) {
  const labels = (Array.isArray(sources) ? sources : [])
    .map((source) => source?.label || "")
    .filter(Boolean);
  return labels.length
    ? `<p class="print-sources"><strong>Authored references:</strong> ${labels.map(esc).join(" · ")}</p>`
    : "";
}

function blockText(block) {
  if (!block || typeof block !== "object") return "";
  if (block.type === "paragraph" || block.type === "callout") return block.text || "";
  if (block.type === "list") return (block.items || []).join(" ");
  return "";
}

function renderLessonSection(section, assets = {}) {
  return `<section class="print-reading-section" data-print-section="${esc(section.id)}">
    <h2>${esc(section.title)}</h2>
    ${renderBlocks(section.blocks || [], assets, esc)}
    ${section.takeaway ? `<p class="print-takeaway"><strong>Remember:</strong> ${esc(section.takeaway)}</p>` : ""}
  </section>`;
}

function renderLessonTerms(lesson) {
  if (!lesson?.vocabulary?.length) return "";
  return `<section class="print-reading-section" data-print-section="terms"><h2>Key terms</h2><dl class="print-terms">${lesson.vocabulary
    .map(
      (term) => `<div><dt>${esc(term.term)}</dt><dd>${esc(term.definition)}</dd></div>`,
    )
    .join("")}</dl></section>`;
}

function renderReadingGuide(guide) {
  if (!guide) return "";
  return `<section class="print-reading-section" data-print-section="reading-guide"><h2>Reading guide: ${esc(guide.readingLabel)}</h2><ol>${(
    guide.prompts || []
  )
    .map(
      (prompt) =>
        `<li>${esc(typeof prompt === "string" ? prompt : prompt.prompt || "")}</li>`,
    )
    .join("")}</ol></section>`;
}

function renderConnections(lesson) {
  if (!lesson?.connections?.length) return "";
  return `<section class="print-reading-section" data-print-section="connections"><h2>Connections</h2>${lesson.connections
    .map(
      (connection) =>
        `<article class="print-connection"><p class="eyebrow">${esc(connection.type || "Connection")}</p><h3>${esc(connection.title)}</h3><p>${esc(connection.body)}</p></article>`,
    )
    .join("")}</section>`;
}

export function printUrlBlock(path, { includeQr = true, note = "" } = {}) {
  const url = publicUrl(path);
  const qr = includeQr ? qrSvg(url, { title: "Public Page One activity link" }) : null;
  return `<aside class="print-link-card"><p class="eyebrow">OPEN THIS ACTIVITY</p><p class="print-public-url">${esc(url)}</p>${
    qr?.ok
      ? `<div class="print-qr"><p>Scan to open the public activity.</p>${qr.svg}</div>`
      : `<p class="muted">The QR code is unavailable for this URL length. Use the readable link above.</p>`
  }${note ? `<p class="muted">${esc(note)}</p>` : ""}</aside>`;
}

export function renderLessonDocument({
  lessonData,
  sectionId = "",
  includeTerms = false,
  includeQr = true,
  publicPath = "/",
  titlePrefix = "Reading",
} = {}) {
  const { lesson, unit, sources, assets } = lessonData;
  const sections =
    !sectionId || sectionId === "learn"
      ? lesson.sections || []
      : (lesson.sections || []).filter((section) => section.id === sectionId);
  const special = sectionId === "terms" ? renderLessonTerms(lesson) : "";
  const readingGuide =
    sectionId === "reading-guide" ? renderReadingGuide(lesson.readingGuide) : "";
  const connections = sectionId === "connections" ? renderConnections(lesson) : "";
  const body =
    sectionId && !sections.length && !special && !readingGuide && !connections
      ? `<p class="print-empty">That reading section has no printable authored material yet.</p>`
      : `${sections.map((section) => renderLessonSection(section, assets)).join("")}${special}${readingGuide}${connections}`;
  const heading = sectionId ? `${titlePrefix}: ${lesson.title}` : lesson.title;
  return `<article class="print-document__body print-reading-document"><header class="print-document__heading"><p class="eyebrow">${esc(unit?.title || "Reading")}</p><h1>${esc(heading)}</h1><p>${esc(lesson.period || "")} · ${esc(lesson.summary || "")}</p></header>${!sectionId ? `<div class="print-reading-lede"><p><strong>The big idea:</strong> ${esc(lesson.bigIdea || "")}</p><p><strong>Place it in time:</strong> ${esc(lesson.context || "")}</p></div>` : ""}${body}${includeTerms && !sectionId ? renderLessonTerms(lesson) : ""}${includeTerms && !sectionId ? renderReadingGuide(lesson.readingGuide) : ""}${sourceLabels(sources)}${printUrlBlock(publicPath, { includeQr })}</article>`;
}

function renderQuestion(question, index, { key = false, responseSpace = false } = {}) {
  const stimulusBlocks = (question.stimulusBlocks || [])
    .map((block) => {
      if (block.type === "callout")
        return `<aside class="note"><strong>${esc(block.title)}</strong> ${esc(block.text)}</aside>`;
      if (block.type === "list") {
        const tag = block.ordered ? "ol" : "ul";
        return `<${tag}>${(block.items || []).map((item) => `<li>${esc(item)}</li>`).join("")}</${tag}>`;
      }
      if (block.type === "table")
        return `<div class="table-wrap"><table><caption>${esc(block.caption)}</caption><thead><tr>${(block.columns || []).map((column) => `<th scope="col">${esc(column)}</th>`).join("")}</tr></thead><tbody>${(block.rows || []).map((row) => `<tr>${row.map((cell, cellIndex) => (cellIndex === 0 ? `<th scope="row">${esc(cell)}</th>` : `<td>${esc(cell)}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>`;
      if (block.type === "image")
        return block.alt ? `<p class="muted">[Image: ${esc(block.alt)}]</p>` : "";
      return block.text ? `<p>${esc(block.text)}</p>` : "";
    })
    .join("");
  const choices = (question.choices || []).length
    ? `<ol class="print-choice-list" type="A">${question.choices.map((choice) => `<li>${esc(choice.text || choice)}</li>`).join("")}</ol>`
    : "";
  const parts = question.parts?.length
    ? `<ol class="print-parts">${question.parts.map((part) => `<li><strong>${esc(part.id || "Part")}</strong> ${esc(part.prompt || "")}${responseSpace ? '<div class="print-response-lines print-response-lines--short" aria-hidden="true"></div>' : ""}</li>`).join("")}</ol>`
    : "";
  const answer = key
    ? `<div class="print-answer"><strong>Answer:</strong> ${question.correctAnswer === null || question.correctAnswer === undefined ? esc(question.correctChoiceId || "Not specified") : esc(String.fromCharCode(65 + Number(question.correctAnswer)))}${question.explanation ? `<p><strong>Explanation:</strong> ${esc(question.explanation)}</p>` : ""}</div>`
    : responseSpace
      ? `<div class="print-response-lines" aria-hidden="true"></div>`
      : "";
  return `<article class="print-question" data-question-id="${esc(question.id)}"><h3>${index + 1}. ${esc(question.prompt || "")}</h3>${stimulusBlocks ? `<div class="print-stimulus-blocks">${stimulusBlocks}</div>` : ""}${question.stimulus ? `<blockquote class="print-stimulus">${esc(question.stimulus)}</blockquote>` : ""}${choices}${parts}${answer}</article>`;
}

export function renderPracticeDocument({
  selection,
  title = "Practice questions",
  includeResponseSpace = false,
  answerKey = false,
  includeQr = true,
  publicPath = "/",
  customNote = "",
} = {}) {
  const questions = answerKey
    ? selection?.answerKey || []
    : selection?.studentQuestions || [];
  const heading = answerKey ? `${title} — answer key` : title;
  return `<article class="print-document__body print-practice-document" data-print-document="${answerKey ? "answer-key" : "student"}"><header class="print-document__heading"><p class="eyebrow">${answerKey ? "ANSWER KEY · SEPARATE DOCUMENT" : "PRACTICE WORKSHEET"}</p><h1>${esc(heading)}</h1><p>${questions.length} question${questions.length === 1 ? "" : "s"} · ${esc(selection?.source || "existing activity")}</p>${customNote ? `<p class="note">${esc(customNote)}</p>` : ""}</header>${questions.length ? questions.map((question, index) => renderQuestion(question, index, { key: answerKey, responseSpace: includeResponseSpace && !answerKey })).join("") : '<p class="print-empty">No complete existing practice questions are available for this selection.</p>'}${printUrlBlock(publicPath, { includeQr, note: customNote })}</article>`;
}

export function renderTermsDocument({
  set,
  includeQr = true,
  publicPath = "/",
  title = "Terms reference",
} = {}) {
  return `<article class="print-document__body print-terms-document"><header class="print-document__heading"><p class="eyebrow">OFFICIAL TERMS TEXT</p><h1>${esc(title)}</h1><p>Wording is preserved from the existing class set: ${esc(set?.source || "")}</p></header><dl class="print-terms">${(
    set?.cards || []
  )
    .map(
      (card, index) =>
        `<div class="print-term-card"><dt><span>${index + 1}.</span> ${esc(card.term)}</dt><dd>${esc(card.definition)}</dd></div>`,
    )
    .join("")}</dl>${printUrlBlock(publicPath, { includeQr })}</article>`;
}

export function renderWritingDocument({
  quiz,
  responses = {},
  includeResponse = false,
  includePrompt = true,
  includeQr = true,
  publicPath = "/",
} = {}) {
  const fields = responseSpaceForWriting(quiz);
  const responseText = formatWritingExport({
    title: quiz?.headline || quiz?.title || "Writing response",
    promptSnapshot: { ...quiz, responseFields: fields },
    responses,
    includePrompt: false,
  });
  return `<article class="print-document__body print-writing-document"><header class="print-document__heading"><p class="eyebrow">WRITING PRACTICE</p><h1>${esc(quiz?.headline || quiz?.title || "Writing response")}</h1></header>${includePrompt ? `<section class="print-writing-prompt"><h2>${esc(quiz?.promptTitle || "Prompt")}</h2><p>${esc(quiz?.prompt || "")}</p><p>${esc(quiz?.instructions || "")}</p></section>` : ""}${quiz?.availability === "blocked" ? '<p class="print-empty">This activity is unavailable pending source verification and cannot be printed as a completed document packet.</p>' : fields.map((field) => `<section class="print-writing-field"><h2>${esc(field.label)}</h2><p>${esc(field.prompt)}</p>${includeResponse && responses[field.id] ? `<pre class="print-response-text">${esc(responses[field.id])}</pre>` : `<div class="print-response-lines" aria-hidden="true"></div>`}</section>`).join("")}${includeResponse ? `<details class="print-export-text"><summary>Included response text</summary><pre>${esc(responseText)}</pre></details>` : ""}${printUrlBlock(publicPath, { includeQr })}</article>`;
}

export function optionsSummary(options = {}) {
  return [
    options.reading && "reading",
    options.practice && "practice questions",
    options.responseSpace && "blank response space",
    options.terms && "official Terms text",
    options.notes && "personal notes",
    options.responses && "completed responses",
  ].filter(Boolean);
}

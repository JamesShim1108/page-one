import { escapeHtml as esc, link, breadcrumbs, contextCrumbs } from "../ui.js";
import { frameworkBadges, frameworkGuide } from "../views/framework.js";
import { maxResponseLength } from "./engine.js";
import { formatWritingExport } from "./export.js";
import { sharePanel } from "../share/views.js";

export const wordCount = (text) => (text.trim() ? text.trim().split(/\s+/u).length : 0);
export const saveMessage = (store) => {
  if (store.storageState === "conflict")
    return "This draft changed in another tab. Your visible text is kept here until you choose a version.";
  if (store.storageState === "pending") return "Saving…";
  if (store.storageState === "saved") return "Saved in this browser.";
  if (store.storageState === "temporary") return "Saved for this tab.";
  if (store.storageState === "failed")
    return "Couldn't save the latest changes. Keep this tab open and copy your work before leaving.";
  return store.storageOK
    ? "Your draft will save in this browser as you work."
    : "Draft kept in memory only. This browser could not save it across a reload.";
};

function conflictNotice(store) {
  if (store.storageState !== "conflict" || !store.conflict) return "";
  const conflict = store.conflict;
  return `<aside class="storage-conflict note" role="alert"><strong>This work changed in another tab.</strong><p>Your visible response was not merged or overwritten. ${conflict.reset ? "The saved record was cleared elsewhere." : "A separate recovery copy was saved when possible."}</p><div class="actions">${conflict.remoteRecord ? '<button type="button" class="btn secondary" data-writing-action="resolve-saved">Use saved version</button>' : ""}<button type="button" class="btn secondary" data-writing-action="keep-separate">Keep my version separate</button><button type="button" class="text-button" data-writing-action="copy-conflict">Copy my version</button></div></aside>`;
}

function fieldsFor(quiz) {
  return (
    quiz.responseFields ||
    quiz.parts.map((part) => ({ ...part, label: part.prompt, required: true }))
  );
}

function typeLabel(quiz) {
  return (
    {
      saq: "SOURCE-BASED SAQ",
      leq: "LEQ-STYLE ESSAY",
      dbq: "DOCUMENT-BASED QUESTION",
      skill: "SKILL DRILL",
    }[quiz.exerciseType] || "SHORT-ANSWER QUESTION"
  );
}

function responseField(field, draft, framework) {
  const placeholder =
    field.placeholder ||
    (field.required === false
      ? "Optional planning notes."
      : "Write your response here. Use specific evidence and explain the connection.");
  const help =
    field.help ||
    (field.required === false
      ? "Optional planning space. It is not included in the self-assessment total."
      : "Your response is saved locally while you work.");
  return `<section class="writing-part">
    <div class="writing-part-heading"><span class="part-letter" aria-hidden="true">${esc(field.id.slice(0, 2).toUpperCase())}</span>
      <label for="writing-${esc(field.id)}"><span class="visually-hidden">${esc(field.label)}. </span>${esc(field.prompt)}</label>
    </div>${frameworkBadges(field.lenses, framework)}
    <textarea id="writing-${esc(field.id)}" name="${esc(field.id)}" data-writing-part="${esc(field.id)}" rows="${field.rows || 8}"
      data-maxlength="${maxResponseLength}" spellcheck="true" ${field.required === false ? "" : "required"} ${draft.reviewed ? "readonly" : ""} aria-describedby="writing-${esc(field.id)}-help"
      placeholder="${esc(placeholder)}">${esc(draft.responses[field.id])}</textarea>
    <div class="writing-field-meta"><small id="writing-${esc(field.id)}-help" data-default-text="${esc(help)}">${esc(help)} Maximum ${maxResponseLength.toLocaleString()} characters; longer input is not saved until shortened.</small>
      <small id="writing-${esc(field.id)}-count">${wordCount(draft.responses[field.id])} words</small>
    </div>
  </section>`;
}

function reviewPart(part, draft) {
  return `<article class="writing-review-part"><h3>Part ${esc(part.id.toUpperCase())}</h3>
    <ul>${part.criteria.map((criterion) => `<li>${esc(criterion)}</li>`).join("")}</ul>
    <details class="model-answer"><summary>Show one model APE response</summary>
      <dl>${[
        ["answer", "Answer"],
        ["prove", "Prove"],
        ["explain", "Explain"],
      ]
        .map(
          ([key, label]) =>
            `<div><dt>${label}</dt><dd>${esc(part.model[key])}</dd></div>`,
        )
        .join("")}</dl>
      <p>${esc(part.alternatives)}</p>
    </details>
    <fieldset class="self-score"><legend>Your assessment of part ${esc(part.id.toUpperCase())}</legend>
      ${[
        [1, "Meets the criteria: 1 point"],
        [0, "Needs revision: 0 points"],
      ]
        .map(
          ([value, label]) =>
            `<label><input aria-label="${esc(part.id.toUpperCase())}: ${esc(label)}" type="radio" name="writing-score-${esc(part.id)}" data-writing-score="${esc(part.id)}" value="${value}" ${draft.scores[part.id] === value ? "checked" : ""}>${label}</label>`,
        )
        .join("")}
    </fieldset>
    <div class="writing-review-links">${(part.review || []).map((review) => link(`/topic/${review.topicId}?section=${review.sectionId}`, `Review ${esc(review.label)}`)).join("")}</div>
  </article>`;
}

export function scoreMessage(store, quiz = null) {
  const total = store.engine.total(store.draft);
  const maximum = store.engine.rubric.reduce(
    (sum, criterion) => sum + criterion.points,
    0,
  );
  return total === null
    ? "Your self-review score: assess every rubric category to see your total."
    : `Your self-review score: ${total} / ${maximum}. This is your assessment, not an automatic grade.`;
}

function typedReview(quiz, store) {
  const fields = fieldsFor(quiz);
  return `<section class="writing-review" id="writing-review" tabindex="-1" aria-labelledby="writing-review-title">
    <p class="eyebrow">REVIEW / SELF-ASSESSMENT</p><h2 id="writing-review-title">Compare, then revise.</h2>
    <p>Use the rubric as a checklist. This is practice feedback, not an automatic grade or a College Board score.</p>
    <p id="writing-score" class="note" role="status">${scoreMessage(store, quiz)}</p>
    <div class="typed-rubric"><h3>Rubric</h3>${quiz.rubric.map((criterion) => `<article><h4>${esc(criterion.label)} · ${criterion.points} point${criterion.points === 1 ? "" : "s"}</h4><p>${esc(criterion.guidance)}</p><fieldset class="self-score"><legend>Self-assess ${esc(criterion.label)}</legend>${Array.from({ length: criterion.points + 1 }, (_, value) => `<label><input aria-label="${esc(criterion.label)}: ${value} point${value === 1 ? "" : "s"}" type="radio" name="writing-score-${esc(criterion.id)}" data-writing-score="${esc(criterion.id)}" value="${value}" ${store.draft.scores[criterion.id] === value ? "checked" : ""}>${value}</label>`).join("")}</fieldset></article>`).join("")}</div>
    <details class="model-answer"><summary>Show the annotated model</summary><p>${esc(quiz.modelResponse)}</p><h3>Another defensible route</h3><p>${esc(quiz.alternateModel)}</p><h3>Common errors to check</h3><ul>${quiz.commonErrors.map((error) => `<li>${esc(error)}</li>`).join("")}</ul></details>
    <div class="writing-review-links">${fields
      .flatMap((field) => field.review || [])
      .map((review) =>
        link(
          `/topic/${review.topicId}?section=${review.sectionId}`,
          `Review ${esc(review.label)}`,
        ),
      )
      .join(" ")}</div>
    <button type="button" class="btn" data-writing-action="revise">Revise responses</button>
    <p class="muted">Revising keeps your writing and clears the self-check scores.</p>
  </section>`;
}

function legacyReview(quiz, store) {
  return `<section class="writing-review" id="writing-review" tabindex="-1" aria-labelledby="writing-review-title">
    <p class="eyebrow">REVIEW / APE</p><h2 id="writing-review-title">Compare, then revise.</h2>
    <p>Each part is worth one self-assessed point. Look for a direct answer, accurate evidence, and a clear explanation. Other defensible answers can work.</p>
    <p id="writing-score" class="note" role="status">${scoreMessage(store, quiz)}</p>
    ${quiz.parts.map((part) => reviewPart(part, store.draft)).join("")}
    <button type="button" class="btn" data-writing-action="revise">Revise responses</button>
    <p class="muted">Revising keeps your writing and clears the self-check scores.</p>
  </section>`;
}

function documentPacket(quiz) {
  if (quiz.exerciseType !== "dbq") return "";
  return `<section class="document-packet" aria-labelledby="document-packet-title"><h2 id="document-packet-title">Document packet</h2>
    ${quiz.availability === "blocked" ? `<p class="note"><strong>Unavailable until source verification is complete.</strong> The packet remains visible as an authoring record; the unresolved source list is recorded below.</p>` : ""}
    <div class="document-list">${quiz.documents.map((document, index) => `<details class="document-card"><summary>Document ${index + 1}: ${esc(document.label)}${document.status === "blocked" ? " · blocked" : ""}</summary><p>${esc(document.content)}</p><dl><div><dt>Author</dt><dd>${esc(document.metadata.author)}</dd></div><div><dt>Date</dt><dd>${esc(document.metadata.date)}</dd></div><div><dt>Setting / audience</dt><dd>${esc(document.metadata.setting)} · ${esc(document.metadata.audience)}</dd></div><div><dt>Rights / source</dt><dd>${esc(document.metadata.rights)} ${esc(document.sourceNote)}</dd></div></dl></details>`).join("")}</div></section>`;
}

function promptContext(quiz, className = "") {
  return `<div class="writing-context ${className}">
    <div class="writing-prompt"><h2>${esc(quiz.promptTitle)}</h2><p>${esc(quiz.prompt)}</p></div>
    <p>${esc(quiz.instructions)}</p>
    ${quiz.sourceContext ? `<aside class="note"><strong>${esc(quiz.sourceContext.label)}:</strong> ${esc(quiz.sourceContext.text)}</aside>` : ""}
    ${quiz.scaffold?.length ? `<div class="ape-steps">${quiz.scaffold.map((step) => `<div><b>${esc(step.label)}</b><span>${esc(step.text)}</span></div>`).join("")}</div>` : ""}
  </div>`;
}

function saveActions(store) {
  return `<div class="writing-save-actions" data-writing-save-actions ${store.storageState === "failed" ? "" : "hidden"}><button type="button" class="btn secondary" data-writing-action="retry-save">Retry save</button><button type="button" class="text-button" data-writing-action="copy-draft">Copy draft</button></div>`;
}

function dateLabel(value) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "Date unavailable" : date.toLocaleString();
}

function previewFields(payload) {
  const fields = payload.promptSnapshot?.responseFields;
  if (Array.isArray(fields) && fields.length) return fields;
  return Object.keys(payload.responses || {}).map((id) => ({ id, label: `Part ${id}` }));
}

function responsePreview(
  payload,
  heading,
  restore = false,
  mapped = false,
  recoveryId = "",
) {
  const action = restore
    ? '<button type="button" class="btn secondary" data-writing-action="restore-checkpoint" data-checkpoint-id="' +
      esc(payload.checkpointId) +
      '">Restore this version</button>'
    : mapped
      ? '<button type="button" class="btn secondary" data-writing-action="use-recovery" data-recovery-id="' +
        esc(recoveryId) +
        '">Use mapped fields</button>'
      : '<button type="button" class="text-button" data-writing-action="copy-recovery">Copy this version</button>';
  return `<section class="writing-version-preview" aria-live="polite"><div class="writing-version-head"><div><p class="eyebrow">${heading}</p><p class="muted">${dateLabel(payload.createdAt)} · ${esc(payload.reason || "Saved version")}</p></div><div class="writing-save-actions">${action}<button type="button" class="text-button" data-writing-action="close-preview">Close preview</button></div></div>${previewFields(
    payload,
  )
    .map(
      (field) =>
        `<article><h4>${esc(field.label || field.prompt || field.id)}</h4><pre>${esc(payload.responses?.[field.id] || "")}</pre></article>`,
    )
    .join("")}</section>`;
}

function writingHistory(store) {
  const checkpoints = store.checkpoints || [];
  const recoveries = store.recoveryRecords || [];
  const notice = store.recoveryNotice;
  const recoveryPreview = store.recoveryPreview;
  const recoveryPreviewRecord = recoveryPreview
    ? recoveries.find(
        (record) => record.payload?.recoveryId === recoveryPreview.recoveryId,
      )
    : null;
  return `<section id="writing-history" class="writing-history" aria-labelledby="writing-history-title"><div class="writing-history-heading"><div><h2 id="writing-history-title">Earlier versions</h2><p class="muted">Page One keeps up to 10 automatic local checkpoints for recovery. This is not an account backup.</p></div>${store.clearPending ? "" : '<button type="button" class="text-button" data-writing-action="prepare-clear">Clear this draft</button>'}</div>${notice ? `<aside class="note" role="status">${esc(notice.message)}${notice.retryable ? ' <button type="button" class="text-button" data-writing-action="retry-recovery">Retry recovery</button>' : ""}</aside>` : ""}${store.clearPending ? '<aside class="note" role="alert"><strong>Clear this draft?</strong><p>The current response will be replaced with a blank draft after a recovery checkpoint is created.</p><div class="actions"><button type="button" class="btn" data-writing-action="confirm-clear">Clear draft</button><button type="button" class="btn secondary" data-writing-action="cancel-clear">Cancel</button></div></aside>' : ""}${checkpoints.length ? `<ul class="writing-history-list">${checkpoints.map((checkpoint) => `<li><span>${dateLabel(checkpoint.createdAt)} · ${esc(checkpoint.reason || "checkpoint")}</span><button type="button" class="text-button" data-writing-action="preview-checkpoint" data-checkpoint-id="${esc(checkpoint.checkpointId)}">View version</button></li>`).join("")}</ul>` : '<p class="muted">No earlier checkpoint is available yet.</p>'}${recoveries.length ? `<div class="writing-recovery-list"><h3>Prompt versions needing review</h3><p class="muted">These responses were kept because their prompt version or fields no longer match this activity.</p><ul>${recoveries.map((record) => `<li><span>${dateLabel(record.payload?.createdAt || record.updatedAt)} · ${esc(record.payload?.reason || "Earlier prompt")}</span><span class="writing-save-actions"><button type="button" class="text-button" data-writing-action="preview-recovery" data-recovery-id="${esc(record.recordId)}">View recovery</button>${store.canMapRecovery(record.recordId) ? `<button type="button" class="text-button" data-writing-action="use-recovery" data-recovery-id="${esc(record.recordId)}">Use mapped fields</button>` : ""}</span></li>`).join("")}</ul></div>` : ""}${store.checkpointPreview ? responsePreview(store.checkpointPreview, "CHECKPOINT", true) : ""}${recoveryPreview ? responsePreview(recoveryPreview, "RECOVERED RESPONSE", false, Boolean(recoveryPreviewRecord && store.canMapRecovery(recoveryPreviewRecord.recordId)), recoveryPreviewRecord?.recordId || "") : ""}</section>`;
}

function exportPanel(quiz, store) {
  const snapshot = store.draft.promptSnapshot;
  const title =
    quiz.headline || quiz.title || snapshot?.promptTitle || "Writing response";
  const text = formatWritingExport({
    title,
    promptSnapshot: snapshot,
    responses: store.draft.responses,
    reviewed: store.draft.reviewed,
    scores: store.draft.scores,
  });
  return `<details class="writing-export"><summary>Copy or download response</summary><p>Preview the plain text before copying or downloading. It includes your current in-memory response, even if the latest save is still pending.</p><div class="writing-export-options"><label><input type="checkbox" data-writing-export-option="prompt"> Include the authored prompt</label><label><input type="checkbox" data-writing-export-option="review" ${store.draft.reviewed ? "" : "disabled"}> Include self-review${store.draft.reviewed ? "" : " after review"}</label></div><textarea id="writing-export-preview" readonly aria-label="Writing export preview" rows="10">${esc(text)}</textarea><div class="writing-save-actions"><button type="button" class="btn secondary" data-writing-action="copy-response">Copy response</button><button type="button" class="btn secondary" data-writing-action="download-response">Download text</button></div><p id="writing-export-status" class="muted" role="status" aria-live="polite"></p></details>`;
}

function blockedWritingPage(data) {
  const { quiz, unit } = data;
  return `<div class="container writing-page">${breadcrumbs(contextCrumbs(data, "Writing practice"))}
    <header class="writing-head"><p class="eyebrow">UNIT ${unit.number} / DOCUMENT-BASED QUESTION</p>
      <h1>${esc(quiz.headline)}</h1><p class="writing-meta">Unavailable pending source verification</p>${sharePanel({ path: `/writing/${quiz.id}`, title: quiz.promptTitle || quiz.headline, label: "Share this prompt without a response or draft." })}${link(`/print?course=${encodeURIComponent(quiz.courseId)}&kind=writing&writing=${encodeURIComponent(quiz.id)}`, "Print preview", "text-link")}</header>
    <section class="writing-paper blocked-writing" aria-labelledby="blocked-writing-title">
      <h2 id="blocked-writing-title">This document packet is not released yet.</h2>
      <p>The seven documents are withheld until each author, date, edition or translation, locator, and reuse-rights record is independently verified. No unverified quotation is presented as evidence.</p>
      ${quiz.unresolvedSources?.length ? `<h3>Open source checks</h3><ul>${quiz.unresolvedSources.map((source) => `<li>${esc(source)}</li>`).join("")}</ul>` : ""}
      <p class="muted">The prompt and rubric remain in the authoring audit. Return to the Unit ${unit.number} hub for the available SAQ, LEQ, and skill practice.</p>
      ${link(`/unit/${unit.id}`, `Return to Unit ${unit.number}`, "btn")}
    </section>
  </div>`;
}

export function writingPage(data, store) {
  const { quiz, unit, framework } = data;
  if (quiz.availability === "blocked") return blockedWritingPage(data);
  const fields = fieldsFor(quiz);
  const typed = Boolean(quiz.exerciseType && quiz.exerciseType !== "saq");
  const review = store.draft.reviewed
    ? typed
      ? typedReview(quiz, store)
      : legacyReview(quiz, store)
    : "";
  return `<div class="container writing-page">${breadcrumbs(contextCrumbs(data, "Writing practice"))}
    <header class="writing-head"><p class="eyebrow">UNIT ${unit.number} / ${typeLabel(quiz)}</p>
      <h1>${esc(quiz.headline)}</h1><p class="writing-meta">${typeLabel(quiz).toLowerCase()} · ${fields.length} response field${fields.length === 1 ? "" : "s"} · untimed</p>${sharePanel({ path: `/writing/${quiz.id}`, title: quiz.promptTitle || quiz.headline, label: "Share this prompt without a response or draft." })}${link(`/print?course=${encodeURIComponent(quiz.courseId)}&kind=writing&writing=${encodeURIComponent(quiz.id)}`, "Print preview", "text-link")}
    </header>
    <div class="writing-layout"><div class="writing-paper">
      ${promptContext(quiz, "writing-context--wide")}
      <details class="writing-prompt-disclosure"><summary>Show prompt</summary>${promptContext(quiz)}</details>
      ${documentPacket(quiz)}
      <form class="writing-form">${fields.map((field) => responseField(field, store.draft, framework)).join("")}
        ${conflictNotice(store)}
        <div class="writing-save-row"><p id="writing-save" class="muted" role="status" aria-live="polite">${saveMessage(store)}</p>${saveActions(store)}</div>
        ${store.draft.reviewed ? '<p class="note">Responses are ready for review below. Choose Revise responses to edit them.</p>' : `<button class="btn" type="submit">Review my response${fields.length === 1 ? "" : "s"}</button><p class="writing-review-note">Reveals self-check criteria and model reasoning. No automatic grading.</p>`}
      </form>${review}${writingHistory(store)}${exportPanel(quiz, store)}
    </div><aside class="writing-sidebar">${quiz.sidebar ? `<div class="side-note"><h2>${esc(quiz.sidebar.title)}</h2>${quiz.sidebar.paragraphs.map((text) => `<p>${esc(text)}</p>`).join("")}</div>` : ""}${frameworkGuide(framework)}<p class="writing-disclosure">${esc(quiz.note)}</p></aside></div>
  </div>`;
}

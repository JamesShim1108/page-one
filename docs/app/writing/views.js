import { escapeHtml as esc, link, breadcrumbs, contextCrumbs } from "../ui.js";
import { frameworkBadges, frameworkGuide } from "../views/framework.js";
import { maxResponseLength } from "./engine.js";

export const wordCount = (text) => (text.trim() ? text.trim().split(/\s+/u).length : 0);
export const saveMessage = (store) =>
  store.storageOK
    ? "Draft saved in this tab. Closing the tab ends this session."
    : "Draft kept in memory only. This browser could not save it across a reload.";

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
  return `<section class="writing-part">
    <div class="writing-part-heading"><span class="part-letter" aria-hidden="true">${esc(field.id.slice(0, 2).toUpperCase())}</span>
      <label for="writing-${esc(field.id)}"><span class="visually-hidden">${esc(field.label)}. </span>${esc(field.prompt)}</label>
    </div>${frameworkBadges(field.lenses, framework)}
    <textarea id="writing-${esc(field.id)}" name="${esc(field.id)}" data-writing-part="${esc(field.id)}" rows="${field.rows || 8}"
      maxlength="${maxResponseLength}" ${field.required === false ? "" : "required"} ${draft.reviewed ? "readonly" : ""} aria-describedby="writing-${esc(field.id)}-help"
      placeholder="${esc(placeholder)}">${esc(draft.responses[field.id])}</textarea>
    <div class="writing-field-meta"><small id="writing-${esc(field.id)}-help">${esc(field.help || (field.required === false ? "Optional planning space. It is not included in the self-assessment total." : "Your response is saved locally while you work."))}</small>
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
            `<label><input type="radio" name="writing-score-${esc(part.id)}" data-writing-score="${esc(part.id)}" value="${value}" ${draft.scores[part.id] === value ? "checked" : ""}>${label}</label>`,
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
    ? "Self-check: assess every rubric category to see your total."
    : `Your self-check: ${total} / ${maximum}. This is your assessment, not an automatic grade.`;
}

function typedReview(quiz, store) {
  const fields = fieldsFor(quiz);
  return `<section class="writing-review" id="writing-review" tabindex="-1" aria-labelledby="writing-review-title">
    <p class="eyebrow">REVIEW / SELF-ASSESSMENT</p><h2 id="writing-review-title">Compare, then revise.</h2>
    <p>Use the rubric as a checklist. This is practice feedback, not an automatic grade or a College Board score.</p>
    <p id="writing-score" class="note" role="status">${scoreMessage(store, quiz)}</p>
    <div class="typed-rubric"><h3>Rubric</h3>${quiz.rubric.map((criterion) => `<article><h4>${esc(criterion.label)} · ${criterion.points} point${criterion.points === 1 ? "" : "s"}</h4><p>${esc(criterion.guidance)}</p><fieldset class="self-score"><legend>Self-assess ${esc(criterion.label)}</legend>${Array.from({ length: criterion.points + 1 }, (_, value) => `<label><input type="radio" name="writing-score-${esc(criterion.id)}" data-writing-score="${esc(criterion.id)}" value="${value}" ${store.draft.scores[criterion.id] === value ? "checked" : ""}>${value}</label>`).join("")}</fieldset></article>`).join("")}</div>
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

function blockedWritingPage(data) {
  const { quiz, unit } = data;
  return `<div class="container writing-page">${breadcrumbs(contextCrumbs(data, "Writing practice"))}
    <header class="writing-head"><p class="eyebrow">UNIT ${unit.number} / DOCUMENT-BASED QUESTION</p>
      <h1>${esc(quiz.headline)}</h1><p class="writing-meta">Unavailable pending source verification</p></header>
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
      <h1>${esc(quiz.headline)}</h1><p class="writing-meta">${typeLabel(quiz).toLowerCase()} · ${fields.length} response field${fields.length === 1 ? "" : "s"} · untimed</p>
    </header>
    <div class="writing-layout"><div class="writing-paper">
      <div class="writing-prompt"><h2>${esc(quiz.promptTitle)}</h2><p>${esc(quiz.prompt)}</p></div>
      <p>${esc(quiz.instructions)}</p>
      ${quiz.sourceContext ? `<aside class="note"><strong>${esc(quiz.sourceContext.label)}:</strong> ${esc(quiz.sourceContext.text)}</aside>` : ""}
      ${quiz.scaffold?.length ? `<div class="ape-steps">${quiz.scaffold.map((step) => `<div><b>${esc(step.label)}</b><span>${esc(step.text)}</span></div>`).join("")}</div>` : ""}
      ${documentPacket(quiz)}
      <form class="writing-form">${fields.map((field) => responseField(field, store.draft, framework)).join("")}
        <p id="writing-save" class="muted">${saveMessage(store)}</p>
        ${store.draft.reviewed ? '<p class="note">Responses are ready for review below. Choose Revise responses to edit them.</p>' : `<button class="btn" type="submit">Review my response${fields.length === 1 ? "" : "s"}</button><p class="writing-review-note">Reveals self-check criteria and model reasoning. No automatic grading.</p>`}
      </form>${review}
    </div><aside class="writing-sidebar">${quiz.sidebar ? `<div class="side-note"><h2>${esc(quiz.sidebar.title)}</h2>${quiz.sidebar.paragraphs.map((text) => `<p>${esc(text)}</p>`).join("")}</div>` : ""}${frameworkGuide(framework)}<p class="writing-disclosure">${esc(quiz.note)}</p></aside></div>
  </div>`;
}

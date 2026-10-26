// Markup for typed-answer questions: the answer boxes, the per-part marks, the
// feedback after a check, and the review of an answer on the results page.

import { escapeHtml as esc } from "../ui.js";
import { mathKeysToggle } from "../mathkeys/keys.js";
import { FIELD_HINTS, answerText, gradeField } from "../practice/answers.js";
import { TRIES_BEFORE_SOLUTION_OFFER } from "./free.js";

const partLetter = (index) => String.fromCharCode(97 + index);
const fieldDomId = (field) => `free-${field.id}`;

function solutionView(question) {
  const steps = Array.isArray(question.solution) ? question.solution.filter(Boolean) : [];
  if (!steps.length)
    return question.explanation ? `<p>${esc(question.explanation)}</p>` : "";
  return `<div class="free-solution"><h5>Worked solution</h5><ol>${steps
    .map((step) => `<li>${esc(step)}</li>`)
    .join("")}</ol></div>`;
}

function choiceFieldView(field, ctx) {
  const value = ctx.values[field.id] ?? "";
  const locked = ctx.locked || ctx.marks[field.id] === "ok";
  const options = (field.options || [])
    .map(
      (option) =>
        `<label class="free-option"><input type="radio" name="${esc(field.id)}" value="${esc(option)}" data-free-field="${esc(field.id)}" ${value === option ? "checked" : ""} ${locked ? "disabled" : ""}><span>${esc(option)}</span></label>`,
    )
    .join("");
  const mark = ctx.marks[field.id];
  return `<fieldset class="free-field free-choice ${mark ? `is-${mark}` : ""}" ${mark === "no" ? "data-needs-fix" : ""}><legend>${esc(field.label || "Choose one")}</legend><div class="free-options">${options}</div>${markView(mark)}${answerLine(field, ctx)}</fieldset>`;
}

function markView(mark) {
  return mark === "ok"
    ? '<span class="free-mark" aria-hidden="true">✓</span><span class="visually-hidden"> Correct.</span>'
    : mark === "no"
      ? '<span class="free-mark" aria-hidden="true">✗</span><span class="visually-hidden"> Not correct yet.</span>'
      : "";
}

function answerLine(field, ctx) {
  return ctx.revealed && ctx.marks[field.id] !== "ok"
    ? `<p class="free-answer">Answer: <strong>${esc(answerText(field))}</strong></p>`
    : "";
}

function fieldView(field, ctx, showHint) {
  if (field.type === "choice") return choiceFieldView(field, ctx);
  const id = fieldDomId(field);
  const value = ctx.values[field.id] ?? "";
  const mark = ctx.practice ? ctx.marks[field.id] || "" : "";
  const message = ctx.messages[field.id] || "";
  const invalid = Boolean(message) && !mark;
  const locked = ctx.locked || mark === "ok";
  const hint = showHint ? FIELD_HINTS[field.type] || "" : "";
  const describedBy = [hint ? `${id}-hint` : "", message ? `${id}-note` : ""]
    .filter(Boolean)
    .join(" ");
  const needsFix = mark === "no" || invalid;
  return `<div class="free-field ${mark ? `is-${mark}` : ""} ${invalid ? "is-invalid" : ""}">
    ${field.label ? `<label class="free-label" for="${id}">${esc(field.label)}</label>` : ""}
    <div class="free-input-wrap">
      <input id="${id}" class="free-input" type="text" name="${esc(field.id)}" data-free-field="${esc(field.id)}" data-math-input ${needsFix ? "data-needs-fix" : ""}
        value="${esc(value)}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
        ${locked ? "readonly" : ""} ${invalid ? 'aria-invalid="true"' : ""} ${describedBy ? `aria-describedby="${describedBy}"` : ""}
        ${field.label ? "" : `aria-label="${esc(ctx.partLabel)}"`}>
      ${markView(mark)}${field.unit ? `<span class="free-unit">${esc(field.unit)}</span>` : ""}
    </div>
    ${hint ? `<p class="free-hint" id="${id}-hint">${esc(hint)}</p>` : ""}
    ${message ? `<p class="free-note ${invalid ? "invalid" : ""}" id="${id}-note">${esc(message)}</p>` : ""}
    ${answerLine(field, ctx)}
  </div>`;
}

function partsView(question, ctx) {
  const parts = question.parts || [];
  const lettered = parts.length > 1 || parts.some((part) => part.prompt);
  const seenHints = new Set();
  return parts
    .map((part, index) => {
      const partCtx = {
        ...ctx,
        partLabel: part.prompt || `Answer ${partLetter(index)}`,
      };
      const fields = (part.fields || [])
        .map((field) => {
          const showHint = !seenHints.has(field.type);
          seenHints.add(field.type);
          return fieldView(field, partCtx, showHint);
        })
        .join("");
      return `<section class="free-part">
        ${
          lettered
            ? `<p class="free-part-prompt">${parts.length > 1 ? `<span class="part-letter" aria-hidden="true">${partLetter(index)}</span>` : ""}<span>${parts.length > 1 ? `<span class="visually-hidden">Part ${partLetter(index)}. </span>` : ""}${esc(part.prompt || "")}</span></p>`
            : ""
        }
        <div class="free-fields">${fields}</div>
      </section>`;
    })
    .join("");
}

function feedbackView(question, ctx) {
  if (!ctx.practice) return "";
  if (ctx.solved) {
    const retry = ctx.tries > 0;
    return `<div class="answer-feedback" id="answer-feedback" tabindex="-1" role="status">
      <h4>✓ Correct</h4>
      ${retry ? `<p>You found it after ${ctx.tries} wrong ${ctx.tries === 1 ? "check" : "checks"}. Practice scores the first check, so this question is counted as missed.</p>` : ""}
      ${solutionView(question)}
    </div>`;
  }
  if (ctx.revealed)
    return `<div class="answer-feedback wrong" id="answer-feedback" tabindex="-1" role="status">
      <h4>Solution</h4>
      <p>The answers are shown below each box. This question is counted as missed.</p>
      ${solutionView(question)}
    </div>`;
  if (ctx.tries > 0) {
    const offer = ctx.tries >= TRIES_BEFORE_SOLUTION_OFFER;
    return `<div class="answer-feedback wrong" id="answer-feedback" role="status">
      <h4>✗ Not yet</h4>
      <p>${ctx.fieldCount > 1 ? "Look at the boxes marked ✗ and check again. Boxes marked ✓ are done." : "That is not correct yet. Look over your answer and check again."}</p>
      ${offer ? `<p>Still stuck? You can see the worked solution. That counts this question as missed.</p><button type="button" class="btn secondary" data-action="reveal-solution" data-quiz="${esc(ctx.quizId)}" data-question="${esc(ctx.id)}">Show solution</button>` : ""}
    </div>`;
  }
  return "";
}

// The answer area of a typed question: boxes, math keys, and feedback.
export function freeQuestionBody(attempt, question, response, id) {
  const practice = attempt.feedbackMode === "practice";
  const ctx = {
    id,
    quizId: attempt.quizId,
    practice,
    values: response?.values || {},
    marks: response?.marks || {},
    messages: response?.messages || {},
    tries: response?.tries || 0,
    solved: response?.solved === true,
    revealed: response?.revealed === true,
  };
  ctx.locked = ctx.solved || ctx.revealed;
  ctx.fieldCount = (question.parts || []).reduce(
    (sum, part) => sum + (part.fields || []).length,
    0,
  );
  const textFields = (question.parts || [])
    .flatMap((part) => part.fields || [])
    .filter((field) => field.type !== "choice");
  const keys =
    !ctx.locked && textFields.length
      ? `<div class="free-keys">${mathKeysToggle(fieldDomId(textFields[0]))}</div>`
      : "";
  return {
    ctx,
    markup: `<div class="free-answer-area" role="group" aria-label="Your answer">${partsView(question, ctx)}</div>${keys}${feedbackView(question, ctx)}`,
  };
}

// ---------- Results review ----------

const STATUS_MARK = { correct: "✓", wrong: "✗", invalid: "✗", empty: "○" };

// One line per answer box: what the student entered and what the key was.
export function freeReviewView(question, response) {
  const values = response?.values || {};
  const parts = question.parts || [];
  const rows = parts
    .map((part, index) => {
      const heading =
        parts.length > 1
          ? `<p class="free-review-part"><span class="part-letter" aria-hidden="true">${partLetter(index)}</span>${esc(part.prompt || "")}</p>`
          : part.prompt
            ? `<p class="free-review-part">${esc(part.prompt)}</p>`
            : "";
      const lines = (part.fields || [])
        .map((field) => {
          const entered = String(values[field.id] ?? "").trim();
          const outcome = entered ? gradeField(field, entered) : { status: "empty" };
          const hit = outcome.status === "correct";
          // A label such as "x =" belongs in front of the value; a phrase such as
          // "Average rate of change" is a line of its own above both answers.
          const prefixed = /=\s*$/.test(field.label || "");
          const prefix = prefixed ? `${esc(field.label)} ` : "";
          const heading =
            field.label && !prefixed
              ? `<span class="free-review-label">${esc(field.label)}</span>`
              : "";
          return `<li class="${hit ? "is-ok" : "is-no"}"><span class="free-review-mark" aria-hidden="true">${STATUS_MARK[outcome.status] || "○"}</span><span class="free-review-body">${heading}<span><strong>Your answer:</strong> ${entered ? `${prefix}${esc(entered)}` : "No answer entered."}</span>${hit ? "" : `<span><strong>Correct answer:</strong> ${prefix}${esc(answerText(field))}</span>`}</span></li>`;
        })
        .join("");
      return `${heading}<ul class="free-review-list">${lines}</ul>`;
    })
    .join("");
  const tries = response?.tries || 0;
  const note =
    response?.solved && tries > 0
      ? `<p class="muted">You got this after ${tries} wrong ${tries === 1 ? "check" : "checks"}. Practice scores the first check only.</p>`
      : response?.revealed
        ? '<p class="muted">You looked at the solution, so this question counts as missed.</p>'
        : "";
  return `${rows}${note}${solutionView(question)}`;
}

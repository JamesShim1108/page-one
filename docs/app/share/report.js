import { escapeHtml as esc } from "../ui.js";
import { cleanPublicPath } from "./links.js";

export const REPORT_CATEGORIES = Object.freeze([
  ["typo", "Typo"],
  ["unclear-wording", "Unclear wording"],
  ["possible-answer", "Possible incorrect answer"],
  ["broken-link", "Broken link"],
  ["display-problem", "Display problem"],
]);

function labelFor(category) {
  return (
    REPORT_CATEGORIES.find(([value]) => value === category)?.[1] || "Display problem"
  );
}

export function normalizeReportContext(context = {}) {
  return {
    type: String(context.type || "content"),
    courseId: String(context.courseId || ""),
    topicId: String(context.topicId || ""),
    itemId: String(context.itemId || ""),
    title: String(context.title || ""),
    revision: String(context.revision || ""),
    path: cleanPublicPath(context.path || "/"),
  };
}

export function buildReport(
  context,
  { category = "display-problem", description = "" } = {},
) {
  const normalized = normalizeReportContext(context);
  const lines = [
    "Page One issue report",
    "This report is prepared locally and has not been sent.",
    "",
    `Category: ${labelFor(category)}`,
    `Content type: ${normalized.type}`,
    `Course: ${normalized.courseId || "Not recorded"}`,
    `Topic: ${normalized.topicId || "Not recorded"}`,
    `Item ID: ${normalized.itemId || "Not recorded"}`,
    `Content revision: ${normalized.revision || "Not recorded"}`,
    `Public link: ${normalized.path}`,
  ];
  const trimmed = String(description || "").trim();
  if (trimmed) lines.push("", "Description:", trimmed.slice(0, 2000));
  return lines.join("\n");
}

function optionMarkup() {
  return REPORT_CATEGORIES.map(
    ([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`,
  ).join("");
}

function contextFrom(control) {
  return normalizeReportContext({
    type: control.dataset.reportType,
    courseId: control.dataset.reportCourse,
    topicId: control.dataset.reportTopic,
    itemId: control.dataset.reportItem,
    title: control.dataset.reportTitle,
    revision: control.dataset.reportRevision,
    path: control.dataset.reportPath,
  });
}

function reportDialog() {
  let dialog = document.getElementById("report-dialog");
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.id = "report-dialog";
  dialog.className = "report-dialog";
  dialog.innerHTML = `<form method="dialog" data-report-form><div class="report-dialog__head"><div><p class="eyebrow">LOCAL REPORT</p><h2>Report an issue</h2></div><button type="button" class="text-button" data-report-action="close">Close</button></div><p class="report-dialog__context" data-report-context></p><label for="report-category">What seems wrong?</label><select id="report-category" data-report-category>${optionMarkup()}</select><label for="report-description">Optional description</label><textarea id="report-description" data-report-description rows="4" maxlength="2000" placeholder="Add a short description if it would help."></textarea><p class="muted">The preview contains the content location and revision, not your answer, score, notes, draft, or history.</p><pre class="report-preview" data-report-preview aria-label="Report preview"></pre><div class="actions"><button type="button" class="btn secondary" data-report-action="copy">Copy report</button><button type="button" class="btn secondary" data-report-action="download">Download text</button></div><p class="report-status" data-report-status role="status" aria-live="polite"></p></form>`;
  document.body.append(dialog);
  return dialog;
}

function currentReport(dialog) {
  const context = dialog._pageOneReportContext || {};
  return buildReport(context, {
    category: dialog.querySelector("[data-report-category]")?.value,
    description: dialog.querySelector("[data-report-description]")?.value,
  });
}

function showDialog(dialog) {
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.hidden = false;
}

function hideDialog(dialog) {
  if (typeof dialog.close === "function") dialog.close();
  else dialog.hidden = true;
}

async function copyValue(value) {
  try {
    if (globalThis.navigator?.clipboard?.writeText) {
      await globalThis.navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // The visible report remains available for manual selection.
  }
  return false;
}

export function createReportController() {
  function updatePreview(dialog) {
    const preview = dialog.querySelector("[data-report-preview]");
    if (preview) preview.textContent = currentReport(dialog);
  }

  return {
    input(event) {
      const dialog = event.target.closest?.("#report-dialog");
      if (!dialog) return false;
      updatePreview(dialog);
      return true;
    },
    change(event) {
      const dialog = event.target.closest?.("#report-dialog");
      if (!dialog) return false;
      updatePreview(dialog);
      return true;
    },
    click(event) {
      const control = event.target.closest?.("[data-report-action]");
      if (!control) return false;
      if (control.dataset.reportAction === "open") {
        const dialog = reportDialog();
        dialog._pageOneReportContext = contextFrom(control);
        const title = dialog.querySelector("[data-report-context]");
        if (title)
          title.textContent =
            dialog._pageOneReportContext.title || "Selected Page One content";
        const status = dialog.querySelector("[data-report-status]");
        if (status) status.textContent = "";
        const description = dialog.querySelector("[data-report-description]");
        if (description) description.value = "";
        const category = dialog.querySelector("[data-report-category]");
        if (category) category.value = "display-problem";
        updatePreview(dialog);
        showDialog(dialog);
        dialog.querySelector("[data-report-category]")?.focus({ preventScroll: true });
        return true;
      }
      const dialog = control.closest("#report-dialog");
      if (!dialog) return false;
      if (control.dataset.reportAction === "close") {
        hideDialog(dialog);
        return true;
      }
      const value = currentReport(dialog);
      const status = dialog.querySelector("[data-report-status]");
      if (control.dataset.reportAction === "copy") {
        copyValue(value).then((ok) => {
          if (status)
            status.textContent = ok
              ? "Report copied."
              : "Copy was unavailable. Select the preview text to copy it.";
        });
        return true;
      }
      if (control.dataset.reportAction === "download") {
        if (typeof Blob !== "undefined" && typeof URL?.createObjectURL === "function") {
          const url = URL.createObjectURL(
            new Blob([value], { type: "text/plain;charset=utf-8" }),
          );
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = "page-one-issue-report.txt";
          anchor.click();
          setTimeout(() => URL.revokeObjectURL(url), 0);
          if (status) status.textContent = "Text download prepared.";
        } else if (status)
          status.textContent =
            "Downloads are unavailable. Select the preview text instead.";
        return true;
      }
      return false;
    },
  };
}

import { escapeHtml as esc } from "../ui.js";
import { cleanPublicPath } from "./links.js";

export function sharePanel({ path, title, label = "Share this activity" } = {}) {
  const cleanPath = cleanPublicPath(path);
  return `<section class="share-panel" data-share-path="${esc(cleanPath)}" data-share-title="${esc(title || "Page One activity")}" aria-label="${esc(label)}">
    <div class="share-panel__copy"><p class="eyebrow">SHARE</p><p>${esc(label)}</p></div>
    <div class="share-panel__actions"><button type="button" class="btn secondary" data-share-action="copy">Copy link</button><button type="button" class="btn secondary" data-share-action="native" hidden>Share…</button><button type="button" class="text-button" data-share-action="qr">Show QR code</button></div>
    <p class="share-status" data-share-status role="status" aria-live="polite"></p>
    <div class="share-qr" data-share-qr hidden></div>
  </section>`;
}

export function reportButton({
  type,
  courseId = "",
  topicId = "",
  itemId = "",
  title = "",
  revision = "",
  path = "/",
  label = "Report an issue",
} = {}) {
  return `<button type="button" class="text-button report-trigger" data-report-action="open" data-report-type="${esc(type)}" data-report-course="${esc(courseId)}" data-report-topic="${esc(topicId)}" data-report-item="${esc(itemId)}" data-report-title="${esc(title)}" data-report-revision="${esc(revision)}" data-report-path="${esc(cleanPublicPath(path))}">${esc(label)}</button>`;
}

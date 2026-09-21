import { escapeHtml as esc } from "../ui.js";
import { BACKUP_CATEGORIES, CATEGORY_LABELS, formatBytes } from "./format.js";

function checkboxList(items, selected, attribute, labels = {}) {
  return items
    .map(
      (item) =>
        `<label class="backup-choice"><input type="checkbox" ${attribute}="${esc(item)}" ${selected.has(item) ? "checked" : ""}> <span>${esc(labels[item] || item)}</span></label>`,
    )
    .join("");
}

function importPreview(preview) {
  if (!preview) return "";
  if (!preview.ok)
    return `<aside class="backup-message note" role="alert"><strong>Import preview unavailable.</strong><p>${esc(preview.reason)}</p></aside>`;
  const summary = preview.plan?.summary || {};
  const detailRows = (preview.plan?.details || [])
    .filter((item) => item.action !== "duplicate")
    .slice(0, 12)
    .map(
      (item) =>
        `<li><code>${esc(item.key)}</code> · ${esc(item.action === "keep-both" ? "kept as a separate local copy" : item.action.replaceAll("-", " "))}</li>`,
    )
    .join("");
  return `<aside class="backup-preview" aria-labelledby="backup-preview-title"><p class="eyebrow">IMPORT PREVIEW</p><h3 id="backup-preview-title">Nothing has been changed yet.</h3><p>${summary.imported || 0} new · ${summary.duplicates || 0} duplicate${summary.duplicates === 1 ? "" : "s"} · ${summary.preservedConflicts || 0} preserved conflict${summary.preservedConflicts === 1 ? "" : "s"} · ${summary.replaced || 0} replacement${summary.replaced === 1 ? "" : "s"} · ${summary.unsupported || 0} unsupported.</p>${preview.unsupported?.length ? `<p class="muted">Unsupported record types are skipped; they do not install content.</p>` : ""}${detailRows ? `<ul class="backup-preview-list">${detailRows}</ul>` : ""}<label class="backup-strategy">Conflicts<select data-backup-strategy><option value="keep-both" ${preview.strategy === "keep-both" ? "selected" : ""}>Keep both (recommended)</option><option value="replace" ${preview.strategy === "replace" ? "selected" : ""}>Replace matching local records</option></select></label><p class="muted">Replacement is explicit and limited to matching records shown in this preview. Terms conflicts stay preserved for review.</p><div class="actions"><button type="button" class="btn" data-backup-action="commit-import">Import this preview</button><button type="button" class="btn secondary" data-backup-action="clear-import">Discard preview</button></div></aside>`;
}

export function backupPanel(state) {
  const categorySet = new Set(state.categories);
  const courseSet = new Set(state.courseIds);
  return `<section class="settings-card backup-card" aria-labelledby="backup-title"><p class="eyebrow">MANUAL TRANSFER</p><h2 id="backup-title">Export or import study data</h2><p>Use a readable JSON file to move selected local work between permitted devices. This is manual transfer, not automatic sync, encryption, or a verified grade record. Page One never uploads the file.</p><div class="backup-grid"><fieldset><legend>Include categories</legend>${checkboxList(BACKUP_CATEGORIES, categorySet, "data-backup-category", CATEGORY_LABELS)}<p class="muted">Earlier checkpoints and reading preferences are off by default.</p></fieldset><fieldset><legend>Include courses</legend>${checkboxList(state.availableCourseIds, courseSet, "data-backup-course", state.courseLabels)}<p class="muted">Unknown course IDs can be archived on import; no course content is installed.</p></fieldset></div><div class="backup-summary"><strong>Export preview:</strong> ${state.exportRecordCount} record${state.exportRecordCount === 1 ? "" : "s"} · approximately ${formatBytes(state.exportBytes)}${state.exportHasInvalid ? " · some stored records are not exportable by this version" : ""}</div><div class="actions"><button type="button" class="btn" data-backup-action="download-export">Download study data</button><label class="btn secondary backup-file-label">Choose JSON to preview<input type="file" accept="application/json,.json" data-backup-file></label></div><p class="muted" data-backup-status role="status" aria-live="polite">${esc(state.feedback || "No file has been imported.")}</p>${importPreview(state.importPreview)}</section>`;
}

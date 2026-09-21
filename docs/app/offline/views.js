import { escapeHtml as esc } from "../ui.js";
import { formatBytes, MAX_PACK_BYTES, MAX_TOTAL_PACK_BYTES } from "./pack.js";
import { offlineRoute } from "./route.js";

function courseOptions(state) {
  return state.courses
    .filter((course) => course.status === "ready" && course.readyTopicCount > 0)
    .map(
      (course) =>
        `<option value="${esc(course.id)}" ${course.id === state.selectedCourseId ? "selected" : ""}>${esc(course.title)}</option>`,
    )
    .join("");
}

function unitOptions(state) {
  return state.units
    .filter((unit) => unit.status === "ready")
    .map(
      (unit) =>
        `<option value="${esc(unit.id)}" ${unit.id === state.selectedUnitId ? "selected" : ""}>Unit ${esc(unit.number)} · ${esc(unit.title)}</option>`,
    )
    .join("");
}

function planSummary(plan) {
  if (!plan)
    return '<p class="muted">Choose a unit to prepare its included reading pages.</p>';
  const size = plan.unknownSizeCount
    ? `at least ${formatBytes(plan.estimatedBytes)} · ${plan.unknownSizeCount} file size${plan.unknownSizeCount === 1 ? "" : "s"} will be checked during download`
    : `approximately ${formatBytes(plan.estimatedBytes)}`;
  return `<div class="offline-plan" aria-labelledby="offline-plan-title"><h3 id="offline-plan-title">This pack includes</h3><p>${plan.pages.length} reading page${plan.pages.length === 1 ? "" : "s"} · ${size} · release ${esc(plan.release)}</p><ul>${plan.pages.map((page) => `<li>${esc(page.title)} <span class="muted">(${esc(page.kind)})</span></li>`).join("")}</ul><p class="muted">Quizzes, writing, external media, source PDFs, and interactive answer tasks stay online.</p></div>`;
}

function savedPack(pack) {
  const manifest = pack.record.payload.manifest;
  const pages = manifest.pages || [];
  return `<article class="offline-pack-row"><div><h3>${esc(manifest.unit.title)}</h3><p>${esc(manifest.course.title)} · ${formatBytes(manifest.byteSize || 0)} · release ${esc(manifest.release)}</p><p class="muted">${pack.available ? "Available offline" : esc(pack.reason || "This pack needs repair before it can open.")}</p></div>${pack.available ? `<div class="offline-pack-links">${pages.map((page) => `<a class="text-link" href="${esc(offlineRoute(page.route, manifest.packId))}">${esc(page.title)}</a>`).join("")}</div>` : ""}<div class="actions"><button type="button" class="btn secondary" data-offline-action="repair-pack" data-offline-pack="${esc(manifest.packId)}">Repair</button><button type="button" class="text-button" data-offline-action="delete-pack" data-offline-pack="${esc(manifest.packId)}">Delete</button></div></article>`;
}

export function offlinePanel(state) {
  if (!state.capability.ok)
    return `<section class="settings-card offline-card" aria-labelledby="offline-title"><p class="eyebrow">OFFLINE READING</p><h2 id="offline-title">Saved reading packs are unavailable here.</h2><p>${esc(state.capability.reason)} Online reading remains available; Page One does not claim that this browser can cache a pack.</p></section>`;
  const downloading = state.status === "downloading";
  return `<section class="settings-card offline-card" aria-labelledby="offline-title"><p class="eyebrow">OFFLINE READING</p><h2 id="offline-title">Save selected reading packs</h2><p>Download a deliberate, reading-only pack while the site is accessible. It is not a school-filter bypass, an installation requirement, or a promise that a managed browser will keep the files.</p><div class="offline-select-grid"><label>Course<select data-offline-course>${courseOptions(state)}</select></label><label>Unit<select data-offline-unit>${unitOptions(state)}</select></label></div>${planSummary(state.plan)}<div class="offline-actions actions">${downloading ? `<button type="button" class="btn secondary" data-offline-action="cancel-download">Cancel download</button>` : `<button type="button" class="btn secondary" data-offline-action="prepare-pack">Check included files</button>${state.plan ? `<button type="button" class="btn" data-offline-action="download-pack">Download reading pack</button>` : ""}`}</div><p class="muted">Limits: ${formatBytes(MAX_PACK_BYTES)} per pack and ${formatBytes(MAX_TOTAL_PACK_BYTES)} total saved packs. A pack stays tied to one release.</p><p class="offline-status" role="status" aria-live="polite">${esc(state.statusMessage || "")}</p>${state.progress ? `<div class="offline-progress" role="status"><span>${state.progress.completed} of ${state.progress.total} files checked</span><progress max="${state.progress.total}" value="${state.progress.completed}"></progress></div>` : ""}${state.packs.length ? `<div class="offline-pack-list"><h3>Saved packs</h3>${state.packs.map(savedPack).join("")}</div>` : '<p class="muted">No complete reading packs are saved in this browser.</p>'}</section>`;
}

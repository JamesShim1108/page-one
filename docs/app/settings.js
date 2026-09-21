import { breadcrumbs, escapeHtml as esc, link } from "./ui.js";
import { readingSettingsPanel } from "./reading/preferences.js";

function storageExplanation(adapter) {
  if (adapter.storageMode === "temporary")
    return {
      title: "Temporary tab mode",
      text: "New work is kept only in this tab's temporary storage. Existing saved work is not copied into this mode.",
      action: "Return to saved browser mode",
    };
  if (adapter.availability === "persistent")
    return {
      title: "Saved in this browser",
      text: "Page One is using this browser's local storage. There is no account or cloud sync, so another browser will not see this work.",
      action: "Use this tab temporarily",
    };
  if (adapter.availability === "session")
    return {
      title: "Saved for this browser session",
      text: "Persistent storage was unavailable, so new work is using session storage. It may not survive a browser restart.",
      action: "Use this tab temporarily",
    };
  return {
    title: "Kept in memory only",
    text: "This browser did not provide usable storage. Keep the tab open or copy important work before leaving.",
    action: "Use this tab temporarily",
  };
}

function countFor(records, predicate) {
  return records.filter(predicate).length;
}

function resetButton(scope, label, detail, records) {
  const count = countFor(records, (record) => {
    if (scope === "all")
      return record.kind !== "reset-state" && record.kind !== "migration";
    if (scope.startsWith("course:")) return record.namespace === scope;
    if (scope === "recent") return record.kind === "recent";
    if (scope === "preferences") return record.kind === "preferences";
    return false;
  });
  return `<div class="settings-action"><div><h3>${esc(label)}</h3><p>${esc(detail)}</p><small>${count} stored record${count === 1 ? "" : "s"} in this scope</small></div><button type="button" class="btn secondary" data-settings-action="prepare-reset" data-settings-scope="${esc(scope)}">Clear</button></div>`;
}

function confirmation(scope) {
  const label =
    scope === "all"
      ? "all Page One private work"
      : scope === "recent"
        ? "recent destinations"
        : scope === "preferences"
          ? "reading settings"
          : `private work in ${scope.replace(/^course:/, "the ")} `;
  return `<div class="settings-confirm" role="alert"><p>Clear ${esc(label)}? This cannot restore the deleted work.</p><div class="actions"><button type="button" class="btn" data-settings-action="confirm-reset" data-settings-scope="${esc(scope)}">Yes, clear it</button><button type="button" class="btn secondary" data-settings-action="cancel-reset">Cancel</button></div></div>`;
}

export function settingsPage({
  courses = [],
  adapter,
  records = [],
  resetScope = null,
  feedback = "",
  readingPreferences = {},
  backup = null,
  offline = null,
}) {
  const storage = storageExplanation(adapter);
  return `<div class="container settings-page">${breadcrumbs([["Home", "/"], ["Settings"]])}
    <header class="page-intro"><p class="eyebrow">LOCAL CONTROLS</p><h1>Settings</h1><p>Choose how this tab keeps work. Page One does not ask for an account or a name.</p></header>
    ${feedback ? `<p class="note" role="status">${esc(feedback)}</p>` : ""}
    <section class="settings-card reading-settings-card" aria-labelledby="reading-settings-title"><p class="eyebrow">READING COMFORT</p><h2 id="reading-settings-title">Reading settings</h2><p>Adjust explanatory reading without changing drafts, attempts, Terms progress, or the graph-paper identity.</p>${readingSettingsPanel(readingPreferences)}</section>
    <section class="settings-card" aria-labelledby="storage-title"><p class="eyebrow">SAVE LOCATION</p><h2 id="storage-title">${esc(storage.title)}</h2><p>${esc(storage.text)}</p><p class="muted">Saved work is local to this browser and deployment. It is not synced, encrypted, or guaranteed to survive a managed-device reset.</p><button type="button" class="btn secondary" data-settings-action="toggle-mode">${esc(storage.action)}</button></section>
    <section class="settings-card" aria-labelledby="clear-title"><p class="eyebrow">PRIVATE WORK</p><h2 id="clear-title">Clear only what you mean to clear.</h2><p>These actions operate on Page One records only. They do not clear another project on the same browser origin.</p>
      ${resetScope ? confirmation(resetScope) : ""}
      <div class="settings-actions">
        ${resetButton("preferences", "Reset reading settings", "Return reading preferences to their defaults. Progress remains.", records)}
        ${resetButton("recent", "Clear recent destinations", "Remove the short list of places shown as recent work. Saved drafts and attempts remain.", records)}
        ${courses
          .filter((course) => course.status === "ready")
          .map((course) =>
            resetButton(
              `course:${course.id}`,
              `Clear ${course.shortTitle} private work`,
              "Remove attempts, drafts, terms progress, and conflict copies for this course.",
              records,
            ),
          )
          .join("")}
        ${resetButton("all", "Clear all Page One private work", "Remove private work in this browser, including drafts, attempts, Terms progress, and recovery copies. Preferences stay unless reset separately.", records)}
      </div>
    </section>
    ${backup?.page?.() || ""}
    ${offline?.page?.() || ""}
    <section class="settings-card"><p class="eyebrow">BOUNDARIES</p><h2>What these controls cannot promise</h2><p>Clearing Page One records is an app-level cleanup control. It cannot promise deletion from school-managed backups, browser session restoration, or device administration tools.</p>${link("/courses", "Back to courses", "btn secondary")}</section>
  </div>`;
}

import { escapeHtml as esc, breadcrumbs, contextCrumbs, link } from "../ui.js";
import { saveNavigationContext, readNavigationContext } from "../navigation-context.js";
import { icon } from "../icons.js";

function keyFor(targetType, targetId) {
  return `${targetType}:${targetId}`;
}

function namespaceFor(courseId) {
  return `course:${courseId || "unknown"}`;
}

function recordIdFor(pageId, targetType, targetId) {
  return `reading-mark:${pageId}:${targetType}:${targetId}`;
}

export function normalizeReadingMark(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const targetType =
    value.targetType === "block"
      ? "block"
      : value.targetType === "section"
        ? "section"
        : "";
  if (!targetType || typeof value.pageId !== "string" || !value.pageId.trim())
    return null;
  if (typeof value.targetId !== "string" || !value.targetId.trim()) return null;
  if (typeof value.courseId !== "string" || !value.courseId.trim()) return null;
  if (typeof value.sectionId !== "string" || !value.sectionId.trim()) return null;
  return {
    schemaVersion: 1,
    pageId: value.pageId,
    contentId: typeof value.contentId === "string" ? value.contentId : "",
    courseId: value.courseId,
    pageType: value.pageType === "guide" ? "guide" : "topic",
    pageRoute: typeof value.pageRoute === "string" ? value.pageRoute : "",
    pageTitle: typeof value.pageTitle === "string" ? value.pageTitle : "Reading",
    unitTitle: typeof value.unitTitle === "string" ? value.unitTitle : "",
    courseTitle: typeof value.courseTitle === "string" ? value.courseTitle : "",
    targetType,
    targetId: value.targetId,
    sectionId: value.sectionId,
    excerpt: typeof value.excerpt === "string" ? value.excerpt.slice(0, 500) : "",
    contentRevision:
      typeof value.contentRevision === "string" ? value.contentRevision : "",
    read: value.read === true,
    understood: value.understood === true,
    review: value.review === true,
    confusing: value.confusing === true,
    updatedAt:
      typeof value.updatedAt === "string" ? value.updatedAt : new Date().toISOString(),
  };
}

function blankMark(context, target, previous = {}) {
  return normalizeReadingMark({
    schemaVersion: 1,
    ...context,
    ...target,
    ...previous,
    targetType: target.targetType,
    targetId: target.targetId,
    sectionId: target.sectionId || previous.sectionId,
    excerpt: target.excerpt ?? previous.excerpt ?? "",
    updatedAt: new Date().toISOString(),
  });
}

function hasFlags(mark) {
  return Boolean(mark.read || mark.understood || mark.review || mark.confusing);
}

export async function listReadingMarks(adapter, { courseId = "", pageId = "" } = {}) {
  if (!adapter) return [];
  const records = await adapter.list({
    namespace: courseId ? namespaceFor(courseId) : undefined,
    kind: "reading-mark",
  });
  return records
    .map((record) => {
      const payload = normalizeReadingMark(record.payload);
      return payload ? { ...record, payload } : null;
    })
    .filter((record) => record && (!courseId || record.payload.courseId === courseId))
    .filter((record) => !pageId || record.payload.pageId === pageId);
}

export function createReadingMarkStore(adapter, context) {
  const records = new Map();
  const writers = new Map();
  const base = {
    pageId: context.pageId,
    courseId: context.courseId,
    pageType: context.pageType || "topic",
    pageRoute: context.pageRoute || "",
    pageTitle: context.pageTitle || "Reading",
    courseTitle: context.courseTitle || "",
    unitTitle: context.unitTitle || "",
    contentRevision: context.contentRevision || "",
    contentId: context.contentId || "",
  };
  const ready = (
    adapter ? listReadingMarks(adapter, { pageId: base.pageId }) : Promise.resolve([])
  ).then(async (loaded) => {
    const kept = [];
    for (const record of loaded) {
      const mark = record.payload;
      if (hasFlags(mark)) {
        records.set(keyFor(mark.targetType, mark.targetId), record);
        kept.push(record);
        continue;
      }
      // A mark that only held a removed private note: delete it so the old
      // note text does not linger in this browser.
      const writer = writerFor(mark, mark);
      await writer.ready;
      await writer.remove().catch(() => null);
    }
    return kept;
  });

  function writerFor(target, current) {
    const key = keyFor(target.targetType, target.targetId);
    if (!adapter) return null;
    if (!writers.has(key)) {
      writers.set(
        key,
        adapter.createRecordWriter({
          namespace: namespaceFor(base.courseId),
          kind: "reading-mark",
          recordId: recordIdFor(base.pageId, target.targetType, target.targetId),
          courseId: base.courseId,
          contentIdentity: base.contentRevision || base.pageId,
          resetScopes: [namespaceFor(base.courseId), "all"],
          payload: current,
        }),
      );
    }
    return writers.get(key);
  }

  async function update(target, patch) {
    await ready;
    const key = keyFor(target.targetType, target.targetId);
    const current = records.get(key)?.payload || {};
    const next = blankMark(base, target, { ...current, ...patch });
    if (!next) return { ok: false, status: "invalid" };
    if (!hasFlags(next)) {
      records.delete(key);
      if (adapter) {
        const writer = writerFor(target, next);
        await writer.ready;
        const removed = await writer
          .remove()
          .catch((error) => ({ ok: false, status: "failed", error }));
        if (!removed || removed.ok === false)
          return removed || { ok: false, status: "failed" };
      }
      return { ok: true, status: "removed", payload: next };
    }
    const writer = writerFor(target, next);
    if (!writer) {
      const record = {
        namespace: namespaceFor(base.courseId),
        kind: "reading-mark",
        recordId: recordIdFor(base.pageId, target.targetType, target.targetId),
        payload: next,
        updatedAt: next.updatedAt,
        recordRevision: (records.get(key)?.recordRevision || 0) + 1,
      };
      records.set(key, record);
      return { ok: true, status: "temporary", record, payload: next };
    }
    await writer.ready;
    const result = await writer
      .save(next)
      .catch((error) => ({ ok: false, status: "failed", error }));
    if (result.ok) records.set(key, { ...(result.record || {}), payload: next });
    return { ...result, payload: next };
  }

  return {
    ready,
    get(target) {
      return records.get(keyFor(target.targetType, target.targetId))?.payload || null;
    },
    list() {
      return [...records.values()];
    },
    update,
    removeReview(target) {
      return update(target, { review: false });
    },
  };
}

// A symbol button keeps its words for screen readers and as a tooltip, so the
// paragraph toolbar can stay quiet without losing its names.
function markButton(action, label, description, describedBy = "", iconName = "") {
  const content = iconName
    ? `${icon(iconName)}<span class="visually-hidden">${esc(label)}</span>`
    : esc(label);
  return `<button type="button" class="reading-mark-button${iconName ? " reading-mark-button--icon" : ""}" data-reading-mark-action="${esc(action)}" aria-pressed="false"${describedBy ? ` aria-describedby="${esc(describedBy)}"` : ""} title="${esc(description)}">${content}</button>`;
}

export function readingMarkControls({
  targetType,
  targetId,
  sectionId,
  excerpt = "",
  label = "this section",
}) {
  const isSection = targetType === "section";
  const targetDescription = isSection
    ? "Read means you reached this section. Understood is a separate learner report."
    : "Review this keeps an anchored passage in your private review list.";
  const descriptionId = `reading-mark-description-${targetType}-${targetId}`;
  return `<div class="reading-mark-controls" data-reading-mark-target="${esc(targetType)}" data-reading-mark-target-id="${esc(targetId)}" data-reading-mark-section="${esc(sectionId)}" data-reading-mark-excerpt="${esc(excerpt)}" data-reading-mark-label="${esc(label)}">
    <span class="visually-hidden" id="${esc(descriptionId)}" data-reading-mark-description>${esc(targetDescription)}</span>
    ${isSection ? `${markButton("read", "Read", "Mark this section read.", descriptionId)}${markButton("understood", "Understood", "Report that you can explain this section.", descriptionId)}` : markButton("review", "Review this", "Keep this passage in your private review list.", descriptionId, "bookmark")}
    <span class="reading-mark-status" role="status" aria-live="polite"></span>
  </div>`;
}

export function mountReadingMarks(
  root,
  {
    adapter = null,
    pageId = "",
    contentId = "",
    courseId = "",
    pageType = "topic",
    pageRoute = "",
    pageTitle = "Reading",
    unitTitle = "",
    courseTitle = "",
    contentRevision = "",
  } = {},
) {
  const surface = root?.querySelector?.(".reading-surface");
  if (!surface || !pageId || !courseId) return () => {};
  const store = createReadingMarkStore(adapter, {
    pageId,
    contentId,
    courseId,
    pageType,
    pageRoute,
    pageTitle,
    unitTitle,
    courseTitle,
    contentRevision,
  });
  const abort = new AbortController();
  let disposed = false;

  function targetFor(container) {
    return {
      targetType: container.dataset.readingMarkTarget,
      targetId: container.dataset.readingMarkTargetId,
      sectionId: container.dataset.readingMarkSection,
      excerpt: container.dataset.readingMarkExcerpt || "",
    };
  }

  function paint(container) {
    const target = targetFor(container);
    const mark = store.get(target) || {};
    for (const button of container.querySelectorAll("[data-reading-mark-action]")) {
      const action = button.dataset.readingMarkAction;
      if (!["read", "understood", "review"].includes(action)) continue;
      const active = mark[action] === true;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("is-active", active);
    }
  }

  function status(container, result) {
    const message = result.ok
      ? result.status === "saved"
        ? "Saved in this browser."
        : result.status === "temporary"
          ? "Saved in this tab temporarily."
          : result.status === "removed"
            ? "Mark cleared."
            : "Saved for now."
      : result.status === "conflict"
        ? "This mark changed in another tab. Reload before changing it again."
        : "This mark could not be saved.";
    for (const element of container.querySelectorAll(".reading-mark-status"))
      element.textContent = message;
  }

  async function save(container, patch) {
    const result = await store.update(targetFor(container), patch);
    if (disposed) return;
    paint(container);
    status(container, result);
  }

  function onClick(event) {
    const action = event.target.closest?.("[data-reading-mark-action]");
    if (!action || !surface.contains(action)) return;
    event.preventDefault();
    const container = action.closest("[data-reading-mark-target]");
    if (!container) return;
    const name = action.dataset.readingMarkAction;
    if (["read", "understood", "review"].includes(name)) {
      const current = store.get(targetFor(container)) || {};
      save(container, { [name]: current[name] !== true });
    }
  }

  surface.addEventListener("click", onClick, { signal: abort.signal });
  store.ready.then(() => {
    if (disposed) return;
    for (const container of surface.querySelectorAll("[data-reading-mark-target]"))
      paint(container);
  });
  return () => {
    disposed = true;
    abort.abort();
  };
}

function appendParams(path, params) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${params}`;
}

function reviewTargetPath(payload, token) {
  const params = new URLSearchParams();
  params.set("section", payload.sectionId);
  if (payload.targetType === "block") params.set("block", payload.targetId);
  params.set("reviewReturn", token);
  return appendParams(payload.pageRoute || "/courses", params.toString());
}

function reviewRow(record, contextToken) {
  const payload = record.payload;
  const rowId = `reading-review-${record.recordId}`;
  const destination = reviewTargetPath(payload, contextToken);
  const location = payload.targetType === "block" ? "Passage" : "Section";
  const stale = record.orphaned === true;
  return `<article class="reading-review-item" id="${esc(rowId)}" data-reading-review-record="${esc(record.recordId)}">
    <p class="eyebrow">${esc(payload.courseTitle || payload.courseId)}${payload.unitTitle ? ` · ${esc(payload.unitTitle)}` : ""}</p>
    <h2>${esc(payload.pageTitle || "Reading")}</h2><p class="reading-review-location">${esc(location)} · ${esc(payload.sectionId)}</p>
    <blockquote>${esc(payload.excerpt || "Original passage unavailable.")}</blockquote>
    ${stale ? '<p class="reading-review-orphan" role="status">Original passage changed or is unavailable. Open the surrounding section to find it again, or remove it from review.</p>' : ""}
    <div class="actions">${link(destination, stale ? "Open surrounding section" : "Open passage", "btn secondary")}<button type="button" class="text-button" data-reading-review-remove="${esc(record.recordId)}">Remove from review</button></div>
  </article>`;
}

export function reviewPage({ records, courses, courseId = "", returnToken = "" }) {
  const visible = records
    .filter((record) => record.payload.review === true)
    .filter((record) => !courseId || record.payload.courseId === courseId)
    .sort((left, right) =>
      String(right.payload.updatedAt).localeCompare(String(left.payload.updatedAt)),
    );
  const readyCourses = courses.filter(
    (course) => course.status === "ready" && course.readyTopicCount > 0,
  );
  return `<div class="container reading-review-page">${breadcrumbs([["Home", "/"], ["My review"]])}
    <header class="page-intro"><p class="eyebrow">PRIVATE TO THIS BROWSER</p><h1>My review</h1><p>Passages you chose to revisit. Read and Understood reports remain separate from this list.</p>
      <label class="reading-review-filter">Course<select data-reading-review-course><option value="">All available courses</option>${readyCourses.map((course) => `<option value="${esc(course.id)}"${course.id === courseId ? " selected" : ""}>${esc(course.title)}</option>`).join("")}</select></label>
    </header>
    ${visible.length ? `<div class="reading-review-list">${visible.map((record) => reviewRow(record, saveNavigationContext("reading-review", { courseId: record.payload.courseId, focusedRecordId: record.recordId, scroll: globalThis.scrollY || 0 }))).join("")}</div>` : `<section class="empty-state"><h2>Nothing marked for review yet.</h2><p>Choose Review this beside a lesson passage when you want a return point.</p>${link(courseId ? `/course/${courseId}` : "/courses", "Browse lessons", "btn")}</section>`}
  </div>`;
}

export function createReadingReviewController({
  records,
  courses,
  courseId = "",
  returnToken = "",
  adapter,
  navigate,
  repaint,
}) {
  async function removeReview(button) {
    const record = controller.records.find(
      (item) => item.recordId === button.dataset.readingReviewRemove,
    );
    if (!record) return;
    const store = createReadingMarkStore(adapter, record.payload);
    await store.ready;
    const result = await store.removeReview(record.payload);
    if (result.ok) {
      controller.records = controller.records.filter(
        (item) => item.recordId !== record.recordId,
      );
      repaint();
    }
  }
  const controller = {
    records,
    page: () =>
      reviewPage({ records: controller.records, courses, courseId, returnToken }),
    change(event) {
      const select = event.target.closest?.("[data-reading-review-course]");
      if (!select) return false;
      const value = select.value;
      navigate(value ? `/review?course=${encodeURIComponent(value)}` : "/review");
      return true;
    },
    // Answers synchronously: the dispatcher stops at the first truthy
    // result, and a Promise would swallow every later click on the page.
    click(event) {
      const button = event.target.closest?.("[data-reading-review-remove]");
      if (!button) return false;
      event.preventDefault();
      removeReview(button);
      return true;
    },
    enhance() {
      const context = readNavigationContext("reading-review", returnToken);
      if (!context?.focusedRecordId) return () => {};
      return () => {
        const row = [...document.querySelectorAll("[data-reading-review-record]")].find(
          (candidate) =>
            candidate.dataset.readingReviewRecord === context.focusedRecordId,
        );
        if (!row) return;
        row.setAttribute("tabindex", "-1");
        row.focus({ preventScroll: true });
        row.scrollIntoView({ block: "start", behavior: "auto" });
      };
    },
  };
  return controller;
}

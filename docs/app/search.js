import { escapeHtml as esc, breadcrumbs, link } from "./ui.js";
import { excerptForSearch, highlightSearchText, searchRecords } from "./search/engine.js";
import { readNavigationContext, saveNavigationContext } from "./navigation-context.js";

const typeLabels = Object.freeze({
  course: "Course",
  unit: "Unit",
  topic: "Lesson",
  section: "Reading section",
  passage: "Reading passage",
  glossary: "Term in reading",
});

function appendParams(path, params) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${params}`;
}

function searchPath(query, courseId = "") {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (courseId) params.set("course", courseId);
  const queryString = params.toString();
  return queryString ? `/search?${queryString}` : "/search";
}

function resultLocation(record, courses) {
  const course = courses.find((item) => item.id === record.courseId);
  const pieces = [course?.shortTitle || course?.title || record.courseId];
  if (record.code) pieces.push(`Topic ${record.code}`);
  if (record.heading && record.type !== "topic") pieces.push(record.heading);
  return pieces.join(" · ");
}

function resultCard(record, query, courses) {
  const destination = record.route || "/courses";
  const title = ["passage", "section"].includes(record.type)
    ? record.heading || record.title
    : record.title;
  const excerpt = excerptForSearch(record);
  return `<article class="search-result" data-search-result-id="${esc(record.id)}">
    <p class="eyebrow">${esc(typeLabels[record.type] || "Reading")} · ${esc(resultLocation(record, courses))}</p>
    <h2><a href="#${esc(destination)}" data-search-result-route="${esc(destination)}" data-search-result-link="${esc(record.id)}">${highlightSearchText(title, query)}</a></h2>
    ${record.type === "glossary" ? `<p class="muted">A pointer to the authored reading location for this term.</p>` : `<p>${highlightSearchText(excerpt, query)}</p>`}
    <p class="search-match">${esc(record.match || "Reading match")}</p>
  </article>`;
}

export function searchPage({
  courses,
  indexes,
  failures = [],
  query = "",
  courseId = "",
  shown = 20,
  returnToken = "",
  updated = false,
}) {
  const combined = {
    revision: indexes.map((index) => index.revision || "").join("|"),
    records: indexes.flatMap((index) => index.records || []),
  };
  const results = searchRecords(combined, query, { courseId, limit: shown });
  const readyCourses = courses.filter(
    (course) => course.status === "ready" && course.readyTopicCount > 0,
  );
  const nearby = combined.records
    .filter((record) => record.type === "topic")
    .slice(0, 5)
    .map((record) => `${record.code} · ${record.title}`)
    .join("; ");
  const failureText = failures.length
    ? `<div class="search-index-warning" role="status"><p>Some available course results could not load.</p><button type="button" class="btn secondary" data-action="retry-load">Retry search index</button></div>`
    : "";
  const returnNotice = updated
    ? '<p class="search-return-notice" role="status">Search results updated for this content version.</p>'
    : "";
  return `<div class="container search-page">${breadcrumbs([["Home", "/"], ["Search"]])}
    <header class="page-intro"><p class="eyebrow">FIND A READING PLACE</p><h1>Search</h1><p>Search available lessons, section headings, and selected reading passages. Assessments and private work are not searched.</p>
      <form class="search-form" data-search-form><label for="search-query">Search lessons and reading</label><div class="search-form-row"><input id="search-query" name="q" type="search" value="${esc(query)}" autocomplete="off" enterkeyhint="search" placeholder="Try 2.3, a title, or a phrase" /><button type="submit" class="btn">Search</button></div><label class="search-course-filter" for="search-course">Course<select id="search-course" name="course" data-search-course><option value="">All available courses</option>${readyCourses.map((course) => `<option value="${esc(course.id)}"${course.id === courseId ? " selected" : ""}>${esc(course.title)}</option>`).join("")}${courses
        .filter((course) => course.status !== "ready" || course.readyTopicCount <= 0)
        .map(
          (course) =>
            `<option value="${esc(course.id)}"${course.id === courseId ? " selected" : ""}>${esc(course.title)} (no lessons available)</option>`,
        )
        .join("")}</select></label></form>
    </header>
    ${failureText}${returnNotice}
    ${query ? `<div class="search-results-heading"><p class="eyebrow">RESULTS</p><h2 id="search-results-title">${results.total} result${results.total === 1 ? "" : "s"}</h2><p class="muted" aria-live="polite">Showing ${Math.min(shown, results.total)} of ${results.total}.</p></div>${results.items.length ? `<div class="search-results" aria-labelledby="search-results-title">${results.items.map((record) => resultCard(record, query, courses)).join("")}</div>${results.hasMore ? '<button type="button" class="btn secondary search-more" data-search-more>Show more results</button>' : ""}` : `<section class="empty-state search-empty"><h2>No matching reading place</h2><p>Try a topic code, a shorter phrase, or clear the course filter. Search uses authored labels and passages rather than inferred synonyms.</p>${nearby ? `<p class="muted">Available topic codes include ${esc(nearby)}.</p>` : ""}<button type="button" class="text-button" data-search-clear>Clear search</button></section>`}` : `<section class="search-help"><h2>Search when you remember a phrase.</h2><p>Use a topic code, a lesson title, a section heading, or an existing term alias. A blank search does not open every paragraph.</p></section>`}
  </div>`;
}

export function createSearchController({
  courses,
  indexes,
  failures,
  query = "",
  courseId = "",
  returnToken = "",
  navigate,
  repaint,
  retry,
}) {
  const context = readNavigationContext("search", returnToken);
  const state = {
    query: query || context?.query || "",
    courseId: courseId || context?.courseId || "",
    shown: Math.max(20, Number(context?.shown) || 20),
  };
  const currentRevision = indexes.map((index) => index.revision || "").join("|");
  let queryGeneration = 0;
  const controller = {
    page: () =>
      searchPage({
        courses,
        indexes,
        failures,
        ...state,
        returnToken,
        updated: Boolean(context?.revision && context.revision !== currentRevision),
      }),
    submit(event) {
      if (!event.target.closest?.("[data-search-form]")) return false;
      event.preventDefault();
      const form = event.target.closest("[data-search-form]");
      const value = form.querySelector("[name=q]")?.value.trim() || "";
      const selected = form.querySelector("[name=course]")?.value || "";
      state.query = value;
      state.courseId = selected;
      state.shown = 20;
      navigate(searchPath(value, selected));
      return true;
    },
    change(event) {
      const select = event.target.closest?.("[data-search-course]");
      if (!select) return false;
      const input = document.querySelector("[data-search-form] [name=q]");
      state.query = input?.value.trim() || state.query;
      state.courseId = select.value;
      state.shown = 20;
      navigate(searchPath(state.query, state.courseId));
      return true;
    },
    click(event) {
      const more = event.target.closest?.("[data-search-more]");
      if (more) {
        event.preventDefault();
        state.shown += 20;
        repaint();
        return true;
      }
      const clear = event.target.closest?.("[data-search-clear]");
      if (clear) {
        event.preventDefault();
        navigate(searchPath("", state.courseId));
        return true;
      }
      const result = event.target.closest?.("[data-search-result-link]");
      if (!result) return false;
      event.preventDefault();
      const token = saveNavigationContext("search", {
        query: state.query,
        courseId: state.courseId,
        shown: state.shown,
        focusedResultId: result.dataset.searchResultLink,
        scroll: globalThis.scrollY || 0,
        path: searchPath(state.query, state.courseId),
        revision: currentRevision,
      });
      navigate(
        appendParams(
          result.dataset.searchResultRoute,
          `searchReturn=${encodeURIComponent(token)}`,
        ),
      );
      return true;
    },
    async run(queryValue) {
      const request = ++queryGeneration;
      await Promise.resolve();
      if (request !== queryGeneration) return null;
      return searchRecords(
        { records: indexes.flatMap((index) => index.records || []) },
        queryValue,
        { courseId: state.courseId, limit: state.shown },
      );
    },
    enhance() {
      const saved = readNavigationContext("search", returnToken);
      if (!saved?.focusedResultId) return () => {};
      return () => {
        const item = [...document.querySelectorAll("[data-search-result-id]")].find(
          (candidate) => candidate.dataset.searchResultId === saved.focusedResultId,
        );
        if (!item) return;
        item.setAttribute("tabindex", "-1");
        item.focus({ preventScroll: true });
        item.scrollIntoView({ block: "start", behavior: "auto" });
      };
    },
    retry,
  };
  return controller;
}

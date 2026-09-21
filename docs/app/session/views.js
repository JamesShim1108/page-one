import { escapeHtml as esc, arrow, breadcrumbs, link } from "../ui.js";
import { sessionShare } from "./config.js";
import { sharePanel } from "../share/views.js";

function topicLabel(topic) {
  return topic.code ? `${topic.code} · ${topic.title}` : topic.title;
}

export function sessionPage({
  courses = [],
  course = null,
  pools = [],
  config,
  preview,
  activeAttempt = null,
  notice = "",
  share = null,
} = {}) {
  const topicMap = new Map();
  for (const pool of pools) {
    if (!topicMap.has(pool.topicId)) topicMap.set(pool.topicId, pool);
  }
  const topics = [...topicMap.values()];
  const selected = new Set(config.topicIds);
  const countOptions = [5, 10, 20]
    .map(
      (value) =>
        `<option value="${value}" ${config.count === value ? "selected" : ""}>${value} questions</option>`,
    )
    .join("");
  const custom = ![5, 10, 20].includes(config.count);
  const activeLink = activeAttempt
    ? `/session?course=${encodeURIComponent(config.courseId)}&topics=${encodeURIComponent(config.topicIds.join(","))}&count=${config.count}&mode=${config.mode}&attempt=${encodeURIComponent(activeAttempt.attemptId)}&view=quiz`
    : "";
  const shareState = share || sessionShare(config);
  const previewRows = topics
    .map((topic) => {
      const amount = preview?.allocation?.[topic.topicId]?.length || 0;
      const available = preview?.availability?.[topic.topicId] || 0;
      const isSelected = selected.has(topic.topicId);
      return `<li class="session-topic-row ${isSelected ? "is-selected" : ""}">
        <label><input type="checkbox" name="topics" value="${esc(topic.topicId)}" ${isSelected ? "checked" : ""}> <span>${esc(topicLabel(topic))}</span></label>
        <span class="session-topic-count">${isSelected ? `${amount} selected` : `${available} available`}</span>
      </li>`;
    })
    .join("");
  const empty = !topics.length;
  const startDisabled = !preview?.questionIds?.length;
  return `<div class="container session-page">${breadcrumbs([
    ["Courses", "/courses"],
    [course?.shortTitle || "Sessions", course ? `/course/${course.id}` : ""],
    ["Short session"],
  ])}
    <header class="page-intro"><p class="eyebrow">SHORT PRACTICE</p><h1>Build a short session</h1><p>Choose a few ready topics and make a bounded set from existing practice questions. The order is saved when you start.</p></header>
    ${notice ? `<p class="session-notice" role="status">${esc(notice)}</p>` : ""}
    ${activeAttempt ? `<aside class="session-resume note"><strong>You have an unfinished session with this scope.</strong><p>Resume it, or start another session without changing the saved attempt.</p><div class="actions">${link(activeLink, `Resume session ${arrow}`, "btn")}<span class="muted">Starting another keeps the existing one.</span></div></aside>` : ""}
    ${
      empty
        ? `<section class="empty-state"><h2>No short-session topics are available yet.</h2><p>This course keeps its current availability honest. Open a ready course to build a session.</p>${link("/courses", "Browse courses", "btn")}</section>`
        : `<form class="session-builder" data-session-builder>
      <div class="session-builder-grid">
        <label class="session-field"><span>Course</span><select name="course">${courses.map((item) => `<option value="${esc(item.id)}" ${item.id === config.courseId ? "selected" : ""}>${esc(item.title)}${item.status === "ready" ? "" : " · Coming soon"}</option>`).join("")}</select></label>
        <label class="session-field"><span>Question count</span><select name="count" data-session-count>${countOptions}<option value="custom" ${custom ? "selected" : ""}>Custom count</option></select></label>
        <label class="session-field session-custom-count"><span>Custom count</span><input name="customCount" type="number" min="1" max="50" value="${custom ? config.count : ""}" placeholder="Up to 50" inputmode="numeric"><small>At most 50; the preview may be smaller when fewer questions are available.</small></label>
      </div>
      <fieldset class="session-topics"><legend>Topics</legend><p class="muted">Select one or more ready topics. Questions are allocated as evenly as the available pools allow.</p><ul>${previewRows}</ul></fieldset>
      <fieldset class="session-mode"><legend>Feedback mode</legend><label><input type="radio" name="mode" value="practice" ${config.mode === "practice" ? "checked" : ""}> Practice — check answers as you go</label><label><input type="radio" name="mode" value="test" ${config.mode === "test" ? "checked" : ""}> Test — see correctness after finishing</label></fieldset>
      <label class="session-preference"><input type="checkbox" name="preferUnseen" ${config.preferUnseen ? "checked" : ""} ${preview?.hasExposure ? "" : "disabled"}> <span>Prefer questions I haven’t seen</span></label>
      ${preview?.hasExposure ? '<p class="muted session-history-note">New and repeated counts use this browser’s saved practice history.</p>' : '<p class="muted session-history-note">This browser has no question exposure history yet.</p>'}
      <div class="session-preview" aria-live="polite"><p class="eyebrow">PREVIEW</p><h2>${preview?.questionIds?.length || 0} questions selected</h2><p>${preview?.newCount || 0} new${preview?.repeatedCount ? ` · ${preview.repeatedCount} repeated` : ""}${preview?.shortage ? ` · ${preview.questionIds.length} available right now` : ""} · ${config.mode === "test" ? "Test" : "Practice"} mode</p>
        ${preview?.emptyTopicIds?.length ? `<p class="session-warning">${preview.emptyTopicIds.length === 1 ? "One selected topic has" : "Some selected topics have"} no eligible questions. Its reading link remains available, but questions are not borrowed from another topic.</p>` : ""}
      </div>
      <div class="actions"><button type="submit" class="btn secondary">Update preview</button><button type="button" class="btn" data-action="session-start" ${startDisabled ? "disabled" : ""}>Start this session ${arrow}</button></div>
      ${shareState.withinLimit ? sharePanel({ path: shareState.path, title: "Short practice session", label: "Share this scope without answers or history." }) : '<p class="session-warning">This scope is too long to share as one link. Choose fewer topics, or use a printed scope later.</p>'}
    </form>`
    }
  </div>`;
}

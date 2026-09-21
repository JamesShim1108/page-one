import { escapeHtml as esc, link, breadcrumbs, contextCrumbs, quizEntry } from "../ui.js";
import { renderBlocks } from "../blocks.js?v=20260918-concepts";
import { createConceptText, conceptHelp } from "../concepts/text.js";
import { readingSettingsPanel } from "../reading/preferences.js";
import { readingMarkControls } from "../reading/marks.js";
import {
  frameworkBadges,
  frameworkGuide,
  sourceList,
  writingInvite,
} from "./framework.js";
import { readingPath } from "../share/links.js";
import { reportButton, sharePanel } from "../share/views.js";

function readingPrompt(prompt, index, reading) {
  if (typeof prompt === "string") return `<li>${reading(prompt)}</li>`;
  return `<li><p>${reading(prompt.prompt)}</p>
    <details class="reading-reveal"><summary>Show a way to reason through it</summary>
      <p><strong>Model reasoning:</strong> ${reading(prompt.model)}</p><p><strong>Feedback:</strong> ${reading(prompt.feedback)}</p>
    </details></li>`;
}

function copySectionAction(route, sectionId, label = "section", reportContext = null) {
  const printLink =
    route.startsWith("/topic/") && reportContext?.courseId
      ? link(
          `/print?course=${encodeURIComponent(reportContext.courseId)}&kind=section&topic=${encodeURIComponent(route.split("/").at(-1))}&section=${encodeURIComponent(sectionId)}`,
          "Print",
          "reading-section-action",
        )
      : "";
  return `<button type="button" class="reading-section-action" data-reading-action="copy-section" data-reading-route="${esc(route)}" data-reading-section="${esc(sectionId)}" aria-label="Copy link to this ${esc(label)}">Copy link</button>${printLink}${
    reportContext
      ? reportButton({
          ...reportContext,
          type: "reading-section",
          itemId: sectionId,
          title: label,
          path: readingPath(route, sectionId),
        })
      : ""
  }`;
}

function sectionHeading(
  route,
  sectionId,
  content,
  label = "section",
  excerpt = "",
  reportContext = null,
) {
  return `<div class="reading-section-heading"><h2>${content}</h2><div class="reading-heading-actions">${copySectionAction(route, sectionId, label, reportContext)}${readingMarkControls({ targetType: "section", targetId: sectionId, sectionId, excerpt, label: `this ${label}` })}</div></div>`;
}

function readingGuide(lesson, framework, reading, route, reportContext) {
  const guide = lesson.readingGuide;
  if (!guide) return "";
  return `<section class="lesson-section reading-guide reading-copy" id="reading-guide" data-reading-section="reading-guide">
    ${sectionHeading(route, "reading-guide", '<span class="section-number">READING GUIDE</span>Read, then explain.', "section", guide.readingLabel, reportContext)}
    <p class="muted">Companion prompts for ${esc(guide.readingLabel)}. Use your own reading copy alongside these original notes.</p>
    ${frameworkBadges(guide.lenses, framework)}
    <ol>${guide.prompts.map((prompt, index) => readingPrompt(prompt, index, reading)).join("")}</ol>${frameworkGuide(framework)}
  </section>`;
}

function lessonSection(
  section,
  framework,
  assets,
  reading,
  sources,
  route,
  reportContext,
) {
  const cited = (section.sourceIds || [])
    .map((id) => sources.find((source) => source.id === id)?.label || id)
    .map((label) => esc(label))
    .join(" · ");
  return `<div class="concept reading-copy" id="${esc(section.id)}" data-reading-section="${esc(section.id)}">
    <div class="reading-subsection-heading"><h3>${esc(section.title)}</h3><div class="reading-heading-actions">${copySectionAction(route, section.id, "section")}${readingMarkControls({ targetType: "section", targetId: section.id, sectionId: section.id, excerpt: section.takeaway, label: "this section" })}</div></div>${frameworkBadges(section.lenses, framework)}
    ${renderBlocks(section.blocks, assets, reading, section.id, reportContext)}
    <p class="note"><strong>Remember:</strong> ${reading(section.takeaway)}</p>
    ${cited ? `<p class="source-disclosure"><strong>Section sources:</strong> ${cited}</p>` : ""}
  </div>`;
}

export function lessonPage(data, quizController) {
  const { lesson, unit, framework, bank, sources, assets } = data;
  const offlineReading = data.offlineReading === true;
  const route = `/topic/${lesson.id}`;
  const reportContext = {
    courseId: data.course?.id || lesson.courseId,
    topicId: lesson.id,
    revision: data.contentRevision || "",
    route,
  };
  const definitionTrigger = data.readingPreferences?.definitionTrigger || "hover-focus";
  const reading = createConceptText(data.glossary, { triggerMode: definitionTrigger });
  const quiz = bank?.quizzes.find((item) => item.quizType === "topic");
  const quick = bank?.quizzes.find((item) => item.quizType === "quick");
  const hasTerms = lesson.vocabulary.length > 0;
  const entry = () =>
    quiz && quizController
      ? quizEntry(quiz, quizController.attempt(quiz.id))
      : offlineReading
        ? '<p class="practice-unavailable" role="status">Practice is available online when you reconnect.</p>'
        : '<p class="practice-unavailable" role="status">Practice could not load. <button type="button" class="text-button" data-action="retry-load">Try again</button></p>';
  const returnLink = data.returnPath?.startsWith("/results/")
    ? link(data.returnPath, "Return to these results", "text-link")
    : "";
  const reviewLink =
    data.reviewReturn && data.reviewContext
      ? link(
          `/review?course=${encodeURIComponent(data.reviewContext.courseId || lesson.courseId)}&return=${encodeURIComponent(data.reviewReturn)}`,
          "Back to My review",
          "text-link",
        )
      : "";
  const searchLink =
    data.searchReturn && data.searchContext
      ? link(data.searchContext.path || "/search", "Back to search results", "text-link")
      : "";
  const crumbs = contextCrumbs(data);
  crumbs[crumbs.length - 1] = [`Topic ${lesson.code}`];
  const sections = [
    ["learn", "Learn"],
    ...(lesson.readingGuide ? [["reading-guide", "Reading guide"]] : []),
    ...(hasTerms ? [["terms", "Key terms"]] : []),
    ["connections", "Connections"],
    ["practice", "Quick practice"],
    ...(unit.writingQuizzes.length ? [["writing", "Writing quiz"]] : []),
  ];
  const navLink = (id, label) =>
    `<a href="#${route}?section=${esc(id)}" data-reading-nav-link="${esc(id)}">${esc(label)}</a>`;
  return `<div class="container reading-surface" data-reading-route="${esc(route)}" data-reading-revision="${esc(data.contentRevision || "")}">${breadcrumbs(crumbs)}<div class="lesson-grid">
    <aside class="lesson-nav" aria-label="Lesson sections">
      <details class="reading-nav-disclosure" open><summary>On this page</summary><div class="reading-nav-links">${sections.map(([id, label]) => navLink(id, label)).join("")}</div></details>${entry()}
      <details class="reading-settings-disclosure"><summary>Reading settings</summary>${readingSettingsPanel(data.readingPreferences, { compact: true })}</details>
      <p id="reading-position-status" class="muted" role="status" aria-live="polite"></p>
      ${quiz ? `<p class="nav-note">${quiz.questionIds.length} questions · Explanations included<br>No timer. Take your time.</p>` : ""}
    </aside>
    <article><header class="lesson-head"><p class="eyebrow">Topic ${esc(lesson.code)} · ${esc(unit.title)}</p>
      <h1>${esc(lesson.title)}</h1><p class="date-line">${esc(lesson.period)}</p><p class="lede">${esc(lesson.summary)}</p>
      <div class="lesson-meta"><span>About ${lesson.minutes} min to read</span>${hasTerms ? `<span>${lesson.vocabulary.length} key terms</span>` : ""}<span>Original lesson</span></div>
      ${conceptHelp(data.glossary, definitionTrigger)}${returnLink || reviewLink || searchLink ? `<div class="actions">${returnLink}${reviewLink}${searchLink}</div>` : ""}
      <div class="actions">${link(`/print?course=${encodeURIComponent(lesson.courseId)}&kind=lesson&topic=${encodeURIComponent(lesson.id)}`, "Print lesson", "btn secondary")}</div>
      ${sharePanel({ path: route, title: lesson.title, label: "Share this lesson. It opens the lesson without private work." })}
    </header>
    <div class="lesson-goals"><p class="eyebrow">What you should be able to explain</p>
      <ul>${lesson.learningGoals.map((goal) => `<li>${esc(goal)}</li>`).join("")}</ul>
      ${lesson.readingGuide?.objectives ? `<small>Unit ${unit.number} learning objectives ${esc(lesson.readingGuide.objectives)}</small>` : ""}
    </div>
    <div class="big-idea reading-copy"><p class="eyebrow">The big idea</p><p>${reading(lesson.bigIdea)}</p></div>
    <section class="lesson-section reading-copy" id="learn" data-reading-section="learn">${sectionHeading(route, "learn", '<span class="section-number">01 / LEARN</span>Understand the story.', "section", lesson.bigIdea, reportContext)}
      <p class="note"><strong>Place it in time.</strong> ${reading(lesson.context)}</p>
      ${lesson.sections.map((section) => lessonSection(section, framework, assets, reading, sources, route, reportContext)).join("")}
    </section>
    ${readingGuide(lesson, framework, reading, route, reportContext)}
    ${
      hasTerms
        ? `<section class="lesson-section reading-copy" id="terms" data-reading-section="terms">${sectionHeading(route, "terms", '<span class="section-number">02 / KEY TERMS</span>Words worth knowing.', "section", lesson.vocabulary.map((term) => term.term).join(", "), reportContext)}
      <dl class="terms">${lesson.vocabulary.map((term) => `<div class="term-row"><dt>${esc(term.term)}</dt><dd>${esc(term.definition)}</dd></div>`).join("")}</dl>
    </section>`
        : ""
    }
    <section class="lesson-section reading-copy" id="connections" data-reading-section="connections">${sectionHeading(route, "connections", '<span class="section-number">03 / CONNECTIONS</span>Go beyond the facts.', "section", lesson.connections.map((connection) => connection.title).join(", "), reportContext)}
      <div class="connection-list">${lesson.connections.map((connection) => `<div class="connection"><p class="eyebrow">${esc(connection.type)}</p><h3>${esc(connection.title)}</h3><p>${reading(connection.body)}</p>${connection.transferQuestion ? `<details class="transfer-check"><summary>${esc(connection.transferQuestion)}</summary><p>${esc(connection.feedback || "Use a specific example and explain the mechanism.")}</p></details>` : ""}${connection.links?.length ? `<p class="connection-links">${connection.links.map((item) => link(`/topic/${item.topicId}?section=${item.sectionId}`, item.label, "text-link")).join(" ")}</p>` : ""}</div>`).join("")}</div>
    </section>
    <section class="lesson-section" id="practice" data-reading-section="practice">${sectionHeading(route, "practice", '<span class="section-number">04 / QUICK PRACTICE</span>Check what stuck.', "section", "Quick practice", reportContext)}
      ${quick && quizController ? `<p class="muted">${quick.questionIds.length} short questions before the topic quiz.</p><div class="quick-shell" id="quick-shell">${quizController.quickView(quick)}</div>` : offlineReading ? '<div class="practice-unavailable" role="status"><p>Quick practice is available online when you reconnect.</p></div>' : '<div class="practice-unavailable" role="status"><p>Practice could not load while this lesson was opening.</p><button type="button" class="btn secondary" data-action="retry-load">Try again</button></div>'}
    </section>
    <section class="quiz-invite"><p class="eyebrow">Ready to put it together?</p><h2>Take the topic quiz.</h2>
      ${quiz ? `<p>${quiz.questionIds.length} questions. A clear explanation after each answer. A focused next step when you finish.</p>` : ""}${entry()}
    </section>
    ${writingInvite(unit, { offlineReading })}
    <details class="sources" id="reading-disclosure-sources" data-reading-disclosure="sources"><summary>About this lesson &amp; references</summary>
      <p>Original study notes and questions, informed by course readings.</p><ul>${sourceList(sources)}</ul>
      <p>The questions are original. Study scenarios are written for practice; they are not historical quotations.</p>
    </details></article>
  </div></div>`;
}

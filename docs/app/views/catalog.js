import {
  escapeHtml as esc,
  link,
  arrow,
  badge,
  breadcrumbs,
  contextCrumbs,
  quizEntry,
} from "../ui.js";

function courseCard(course, index) {
  const available = course.status === "ready" && course.readyTopicCount > 0;
  const hasCoursePage = available || course.emptyShell === true;
  return `<article class="course-feature course-catalog-card" aria-labelledby="course-${esc(course.id)}-title">
    <div class="catalog-number" aria-hidden="true"><span>COURSE</span><strong>${String(index + 1).padStart(2, "0")}</strong></div>
    <div class="catalog-description">
      ${badge(available ? "ready" : "soon", available ? `${course.readyTopicCount} topics available` : null)}
      <h2 id="course-${esc(course.id)}-title">${esc(course.title)}</h2>
      <p class="period">${esc(course.period)}</p><p class="feature-info">${esc(course.description)}</p>
    </div>
    <div class="catalog-entry"><p class="eyebrow">${available ? "Ready to study" : "In development"}</p>
      ${course.previewTopics.length ? `<ul class="catalog-topics">${course.previewTopics.map((topic) => `<li><span>${esc(topic.code)}</span>${esc(topic.title)}</li>`).join("")}</ul>` : `<p class="catalog-empty">No lessons added yet.</p>`}
      ${hasCoursePage ? link(`/course/${course.id}`, available ? `Open course ${arrow}` : `View course ${arrow}`, "btn") : badge("soon")}
      <p class="feature-foot">${available ? "More topics are on the way." : course.emptyShell ? "Lessons and practice are coming soon." : "Lessons and practice are being prepared."}</p>
    </div>
  </article>`;
}

function coursePreview(courses) {
  const available = courses
    .filter((course) => course.status === "ready" && course.readyTopicCount > 0)
    .slice(0, 6);
  if (!available.length) return "";
  const cycle = Math.max(2, available.length);
  const cards = Array.from({ length: cycle * 3 + 1 }, (_, index) => {
    const course = available[index % available.length];
    return `<div class="preview-card preview-course${index === cycle * 2 ? " is-active" : ""}">
      <div class="preview-meta"><span class="preview-code">${esc(course.shortTitle)}</span><span class="preview-label">Available now</span></div>
      <h3>${esc(course.title)}</h3><p class="preview-period">${esc(course.period)}</p>
      <p class="preview-description">${esc(course.previewDescription || course.description)}</p>
      <div class="preview-foot">${course.readyTopicCount} topics available</div>
    </div>`;
  }).join("");
  return `<aside class="course-preview" aria-label="Available courses" data-cycle-length="${cycle}">
    <div class="preview-toolbar"><span></span>
      <button type="button" class="preview-pause" data-action="toggle-preview" aria-pressed="false" aria-controls="course-preview-track" aria-label="Pause animation" title="Pause animation">
        <svg class="preview-icon preview-icon-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6v12M16 6v12"/></svg>
        <svg class="preview-icon preview-icon-play" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z"/></svg>
      </button>
    </div>
    <p class="visually-hidden">Available courses: ${esc(available.map((course) => course.title).join(", "))}.</p>
    <div class="preview-viewport" aria-hidden="true"><div class="preview-track" id="course-preview-track">${cards}</div></div>
    <p class="preview-caption">${available.length === 1 ? `${esc(available[0].title)} is available now. More courses are coming.` : "Find your next course below."}</p>
  </aside>`;
}

function recentLabel(target) {
  return (
    {
      reading: "Reading",
      quiz: "Practice",
      writing: "Writing",
      terms: "Terms",
    }[target.kind] || "Recent work"
  );
}

function recentRoute(target) {
  if (!target.active || !["reading", "writing"].includes(target.kind))
    return target.route;
  const [path, query = ""] = target.route.split("?");
  const params = new URLSearchParams(query);
  params.set("resume", "1");
  return `${path}?${params}`;
}

function recentCard(target) {
  const action = target.active ? "Resume" : "Open";
  return `<article class="recent-work-card"><p class="eyebrow">${recentLabel(target)}</p><h3>${esc(target.title)}</h3>${target.detail ? `<p>${esc(target.detail)}</p>` : ""}${link(recentRoute(target), `${action} ${arrow}`, "text-link")}</article>`;
}

function recentWorkSection(work) {
  const resume = work?.resume || null;
  const items = Array.isArray(work?.items) ? work.items : [];
  if (!resume && !items.length) return "";
  const alternatives = items.filter((item) => item.key !== resume?.key).slice(0, 3);
  return `<section class="recent-work" aria-labelledby="recent-work-title">
    <div class="section-heading"><div><p class="eyebrow">${resume ? "YOUR SAVED PLACE" : "YOUR RECENT WORK"}</p><h2 id="recent-work-title">${resume ? "Continue where you left off" : "Recently opened"}</h2></div>${items.length ? '<button type="button" class="text-button" data-action="clear-recents">Clear recent</button>' : ""}</div>
    ${resume ? `<article class="recent-work-resume"><div><p class="eyebrow">${recentLabel(resume)}</p><h3>${esc(resume.title)}</h3><p>${esc(resume.detail || "Saved work ready to continue")}</p></div>${link(recentRoute(resume), `Resume ${arrow}`, "btn")}</article>` : ""}
    ${alternatives.length ? `<div class="recent-work-grid" aria-label="Recent destinations">${alternatives.map(recentCard).join("")}</div>` : ""}
  </section>`;
}

export function homePage({ courses }, recent = null) {
  const work =
    recent && (Object.hasOwn(recent, "resume") || Object.hasOwn(recent, "items"))
      ? recent
      : recent
        ? {
            resume: {
              key: `quiz:${recent.quizId}`,
              kind: "quiz",
              route: `/quiz/${recent.quizId}`,
              title: "Practice quiz",
              detail: "Saved practice",
              active: true,
            },
            items: [],
          }
        : null;
  const resume = work?.resume;
  return `<div class="container">
    <section class="home-top" aria-labelledby="home-title">
      <div class="home-copy"><p class="eyebrow">A little learning, every day</p>
        <h1 id="home-title">Courses.<br><em>Your pace.</em></h1>
        <p class="home-intro">Lessons, key terms, and practice in one place. Understand the concepts, test what you know, and find what to review next.</p>
        <div class="actions">${resume ? link(resume.route, `Resume ${arrow}`, "btn") : link("/?section=courses", `Browse courses ${arrow}`, "btn")}
          ${link("/session", `Build a short session ${arrow}`, "text-link")}
        </div>
        <p class="free-note">Free access · No account needed</p>
      </div>${coursePreview(courses)}
    </section>
    ${recentWorkSection(work)}
    <section class="home-courses" id="courses" aria-labelledby="courses-title">
      <div class="section-heading"><h2 id="courses-title">Find your next chapter</h2>${link("/courses", `View all courses ${arrow}`, "text-link")}</div>
      <div class="course-catalog">${courses.map(courseCard).join("")}</div>
      <p class="catalog-note">More courses to come.</p>
    </section>
    <section class="how-section"><div class="section-heading"><h2>A little learning. A clearer next step.</h2></div>
      <div class="step-grid">${[
        [
          "Understand the idea",
          "Short explanations, useful terms, and connections that make the facts stick.",
        ],
        [
          "Put it into practice",
          "One question at a time, with an explanation after every answer.",
        ],
        [
          "Know what to revisit",
          "See which concepts went well and which deserve another look.",
        ],
      ]
        .map(
          ([title, text], index) =>
            `<div class="step"><div class="step-index">0${index + 1}</div><div><h3>${title}</h3><p>${text}</p></div></div>`,
        )
        .join("")}</div>
    </section>
  </div>`;
}

export function courseListPage({ courses }) {
  return `<div class="container">${breadcrumbs([["Home", "/"], ["Courses"]])}
    <div class="page-intro"><p class="eyebrow">Choose your starting point</p><h1>Your course. Your pace.</h1><p>Start with a topic, understand the connections, and test what you know.</p></div>
    <div class="courses-list course-catalog">${courses.map(courseCard).join("")}</div>
  </div>`;
}

export function coursePage({ course, units }) {
  const firstTopic = course.firstTopic;
  if (!units.length && course.emptyShell) {
    return `<div class="container">${breadcrumbs([["Courses", "/courses"], [course.shortTitle]])}
      <div class="page-intro"><p class="eyebrow">${esc(course.period)} · Coming soon</p><h1>${esc(course.title)}</h1><p>${esc(course.description)}</p></div>
      <section class="empty-state course-empty-shell" aria-labelledby="course-empty-title"><p class="eyebrow">COMING SOON</p><h2 id="course-empty-title">No lessons or practice have been added yet.</h2><p>Lessons and practice will appear here when they are available.</p>${link("/courses", "Back to courses", "btn")}</section>
    </div>`;
  }
  return `<div class="container">${breadcrumbs([["Courses", "/courses"], [course.shortTitle]])}
    <div class="page-intro"><p class="eyebrow">${esc(course.period)} · ${units.length} units</p><h1>${esc(course.title)}</h1><p>${esc(course.description)}</p></div>
    <div class="course-layout"><div><div class="section-heading"><h2>Explore the units</h2></div>
      <div class="unit-list">${units
        .map((unit) => {
          const ready = unit.status === "ready";
          return `<a href="#/unit/${esc(unit.id)}" class="unit-row is-ready">
          <span class="unit-number">${String(unit.number).padStart(2, "0")}</span><div><h3>${esc(unit.title)}</h3><p>${esc(unit.period)}</p></div>
          <div class="status">${badge(ready || unit.termSets?.length ? "ready" : "soon", ready ? `${unit.topicCount} topics ready` : unit.termSets?.length ? "Terms available" : "In preparation")}<span class="big-arrow" aria-hidden="true">&#8594;</span></div>
        </a>`;
        })
        .join("")}</div>
    </div><aside class="side-note"><p class="eyebrow">Start small</p><h3>One topic is enough for today.</h3>
      ${firstTopic ? `<p>${esc(firstTopic.summary)}</p>${link(`/topic/${firstTopic.id}`, `Start Topic ${esc(firstTopic.code)} ${arrow}`, "btn")}` : "<p>Lessons are being prepared.</p>"}
    </aside></div>
  </div>`;
}

export function unitPage(data, peekAttempt = () => null) {
  const { unit, topics } = data;
  const crumbs = contextCrumbs(data);
  crumbs[crumbs.length - 1] = [`Unit ${unit.number}`];
  const quizzes = unit.quizzes || [],
    writing = unit.writingQuizzes || [];
  const writingGroups = [
    ["SAQ", writing.filter((item) => item.exerciseType === "saq")],
    ["Essay", writing.filter((item) => item.exerciseType === "leq")],
    ["DBQ", writing.filter((item) => item.exerciseType === "dbq")],
    ["Skills", writing.filter((item) => item.exerciseType === "skill")],
  ].filter(([, items]) => items.length);
  const practice =
    quizzes.length === 1 ? `/quiz/${quizzes[0].id}` : `/unit/${unit.id}?section=practice`;
  const modes = [
    {
      title: "Practice Quiz",
      label: "01 · Test yourself",
      text: "Check your understanding and find what to review.",
      path: practice,
      available: Boolean(quizzes.length || unit.topicQuizzes?.length),
    },
    {
      title: "Terms",
      label: "02 · Build recall",
      text: unit.termSets.length
        ? `${unit.termSets.length} class sets. Lists and flashcards.`
        : "Class term sets will appear here.",
      path: `/terms/${unit.id}`,
      available: true,
      pending: !unit.termSets.length,
    },
    {
      title: "Writing Practice",
      label: "03 · Explain it",
      text: "Practice a response and review your reasoning.",
      path:
        writing.length === 1
          ? `/writing/${writing[0].id}`
          : `/unit/${unit.id}?section=writing`,
      available: writing.length > 0,
    },
    {
      title: "Reading / Learn",
      label: "04 · Understand",
      text: "Explore the lessons, one topic at a time.",
      path: `/unit/${unit.id}?section=learn`,
      available: unit.topicCount > 0,
    },
    ...(unit.hasGuide
      ? [
          {
            title: "Study Guide",
            label: "05 · Connect ideas",
            text: "Timelines, comparisons, and reading prompts.",
            path: `/guide/${unit.id}`,
            available: true,
          },
          {
            title: "Maps & Connections",
            label: "06 · See the networks",
            text: "Explore places, routes, seasonal planning, and evidence connections.",
            path: `/guide/${unit.id}?section=networks`,
            available: true,
          },
        ]
      : []),
  ];
  return `<div class="container unit-hub">${breadcrumbs(crumbs)}
    <header class="study-heading"><p class="eyebrow">Unit ${unit.number} · ${esc(unit.period)} · Study Hub</p>
      <h1>${esc(unit.title)}</h1><p>What do you want to practice?</p>
      <div class="actions">${link(`/print?course=${encodeURIComponent(unit.courseId)}&kind=unit&unit=${encodeURIComponent(unit.id)}`, "Print selected topics", "btn secondary")}</div>
    </header>
    <nav class="study-mode-grid" aria-label="Unit study modes">${modes
      .map((mode) => {
        const body = `<span class="eyebrow">${mode.label}</span><h2>${mode.title}</h2><p>${mode.text}</p><span class="study-mode__entry">${!mode.available ? "Coming soon" : mode.pending ? "No sets yet" : `Open ${arrow}`}</span>`;
        return mode.available
          ? `<a class="study-mode" href="#${esc(mode.path)}">${body}</a>`
          : `<div class="study-mode study-mode--soon" aria-disabled="true">${body}</div>`;
      })
      .join("")}</nav>
    ${unit.description ? `<p class="hub-description">${esc(unit.description)}</p>` : '<p class="hub-description">More study modes will become available as this unit is prepared.</p>'}
    <section id="learn" class="hub-section" aria-labelledby="learn-title">
    <div class="course-layout"><div><div class="section-heading"><h2 id="learn-title">Choose a topic</h2><small class="muted">Learn → Review → Practice</small></div>
      <div class="topic-list">${topics
        .map((topic) => {
          const ready = unit.status === "ready" && topic.status === "ready",
            tag = ready ? "a" : "div";
          return `<${tag} ${ready ? `href="#/topic/${esc(topic.id)}"` : ""} class="topic-row ${ready ? "ready" : ""}">
          <span class="topic-code">${esc(topic.code)}</span><div><h3>${esc(topic.title)}, ${esc(topic.period)}</h3><p>${esc(topic.summary)}</p></div>
          ${ready ? '<span class="big-arrow" aria-hidden="true">&#8594;</span>' : badge("soon")}
        </${tag}>`;
        })
        .join("")}</div>
      ${topics.length ? "" : '<p class="study-empty">Lessons for this unit are being prepared.</p>'}
      <div id="practice" class="unit-tools">
        ${unit.quizzes.map((quiz) => `<div class="unit-tool"><p class="eyebrow">PRACTICE</p><h3>${esc(quiz.title)}</h3><p>${quiz.selections.reduce((sum, selection) => sum + selection.questionIds.length, 0)} questions selected from the Unit ${unit.number} question banks.</p>${quizEntry(quiz, peekAttempt(quiz.id), "Start unit practice")}</div>`).join("")}
        ${!quizzes.length ? (unit.topicQuizzes || []).map((quiz) => `<div class="unit-tool"><h3>${esc(quiz.title)}</h3>${quizEntry(quiz, peekAttempt(quiz.id))}</div>`).join("") : ""}
      </div>
      <div id="writing" class="unit-tools writing-groups">${writingGroups.map(([group, items]) => `<section class="writing-group"><p class="eyebrow">${group}</p>${items.map((quiz) => `<div class="unit-tool writing-tool"><h3>${esc(quiz.title)}</h3><p>${quiz.exerciseType === "dbq" && quiz.availability === "blocked" ? "Blocked pending source verification." : `${quiz.partCount} response field${quiz.partCount === 1 ? "" : "s"}. Untimed practice with self-assessment.`}</p>${quiz.availability === "blocked" ? `<span class="muted">Unavailable until verified documents are added.</span>` : link(`/writing/${quiz.id}`, "Open writing practice", "btn")}</div>`).join("")}</section>`).join("")}</div>
    </div><aside class="side-note"><p class="eyebrow">Make the connection</p><h3>Explain it in your own words.</h3><p>Compare ideas across topics and support your explanation with specific evidence.</p></aside></div>
    </section>
  </div>`;
}

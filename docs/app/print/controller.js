import { escapeHtml as esc, breadcrumbs, contextCrumbs, link } from "../ui.js";
import { listReadingMarks } from "../reading/marks.js";
import { allocateSession } from "../session/selection.js";
import { sessionPath } from "../session/config.js";
import {
  freezePrintSelection,
  freezeQuizSelection,
  freezeTopicSelection,
} from "./selection.js";
import {
  optionsSummary,
  renderLessonDocument,
  renderPracticeDocument,
  renderTermsDocument,
  renderWritingDocument,
} from "./renderer.js";

const KINDS = new Set([
  "section",
  "lesson",
  "unit",
  "quiz",
  "writing",
  "terms",
  "session",
]);

function unique(values) {
  return [...new Set((Array.isArray(values) ? values : []).map(String).filter(Boolean))];
}

function requestedKind(params) {
  const kind = params.get("kind") || "lesson";
  return KINDS.has(kind) ? kind : "lesson";
}

function readyTopics(topics = []) {
  return (Array.isArray(topics) ? topics : []).filter(
    (topic) => topic.status === "ready",
  );
}

function selectedTopicIds(params, topics) {
  const available = new Set(readyTopics(topics).map((topic) => topic.id));
  const requested = unique(params.get("topics")?.split(","));
  return (requested.length ? requested : [...available]).filter((id) =>
    available.has(id),
  );
}

function defaultOptions(kind) {
  return {
    reading: ["section", "lesson", "unit"].includes(kind),
    practice: ["unit", "quiz", "session"].includes(kind),
    responseSpace: false,
    terms: false,
    notes: false,
    responses: false,
    qr: true,
    paper: "letter",
  };
}

function optionValue(params, key, fallback) {
  return params.get(key) === "1" ? true : params.get(key) === "0" ? false : fallback;
}

function optionsFromParams(params, kind) {
  const defaults = defaultOptions(kind);
  return {
    ...defaults,
    reading: optionValue(params, "reading", defaults.reading),
    practice: optionValue(params, "practice", defaults.practice),
    responseSpace: optionValue(params, "space", defaults.responseSpace),
    terms: optionValue(params, "terms", defaults.terms),
    notes: optionValue(params, "notes", defaults.notes),
    responses: optionValue(params, "responses", defaults.responses),
    qr: optionValue(params, "qr", defaults.qr),
    paper: params.get("paper") === "a4" ? "a4" : "letter",
  };
}

async function safePage(content, type, id) {
  try {
    return await content.page(type, id);
  } catch {
    return null;
  }
}

async function termSetsFor(content, unit) {
  const ids = unit?.termSetIds || [];
  return (await Promise.all(ids.map((id) => safePage(content, "term-set", id)))).filter(
    (data) => data?.set,
  );
}

async function loadTopicPages(content, topics) {
  return (
    await Promise.all(
      readyTopics(topics).map((topic) => safePage(content, "topic", topic.id)),
    )
  ).filter((data) => data?.lesson);
}

async function loadStateData(content, params, kind) {
  const courseId = params.get("course") || "world";
  const base = { kind, courseId, courses: await content.catalog() };
  if (kind === "section" || kind === "lesson") {
    const topicId = params.get("topic") || "";
    const topic = await safePage(content, "topic", topicId);
    if (!topic?.lesson || topic.lesson.status !== "ready")
      return { ...base, unavailable: true };
    return {
      ...base,
      topicId,
      topic,
      sectionId: kind === "section" ? params.get("section") || "learn" : "",
      selection: freezeTopicSelection({
        topics: [topic],
        revision: topic.contentRevision || "",
      }),
      termSets: await termSetsFor(content, topic.unit),
    };
  }
  if (kind === "unit") {
    const unitId = params.get("unit") || "";
    const unitData = await safePage(content, "unit", unitId);
    if (!unitData?.unit || unitData.unit.status !== "ready")
      return { ...base, unavailable: true };
    const topicIds = selectedTopicIds(params, unitData.topics);
    const topics = await loadTopicPages(content, unitData.topics);
    const quizEntries = [];
    for (const quiz of unitData.unit.quizzes || []) {
      const data = await safePage(content, "quiz", quiz.id);
      if (data?.quiz && data?.bank) quizEntries.push(data);
    }
    const primaryQuiz = quizEntries[0] || null;
    const allowedTopics = new Set(topicIds);
    const selection = primaryQuiz
      ? freezePrintSelection({
          questions: primaryQuiz.bank.questions,
          questionIds: primaryQuiz.quiz.questionIds || [],
          revision: primaryQuiz.contentRevision || "",
          title: primaryQuiz.quiz.title,
          source: primaryQuiz.quiz.id,
        })
      : freezeTopicSelection({ topics, revision: unitData.contentRevision || "" });
    const filteredSelection = freezePrintSelection({
      questions: selection.questions,
      questionIds: selection.questionIds.filter((id) => {
        const question = selection.questions.find(
          (item) => String(item.id) === String(id),
        );
        return !question?.topicId || allowedTopics.has(question.topicId);
      }),
      revision: selection.revision,
      title: selection.title,
      source: selection.source,
    });
    return {
      ...base,
      unitId,
      unit: unitData.unit,
      topics: unitData.topics,
      topicPages: topics,
      topicIds,
      selection: filteredSelection,
      termSets: await termSetsFor(content, unitData.unit),
    };
  }
  if (kind === "quiz") {
    const quizId = params.get("quiz") || "";
    const quiz = await safePage(content, "quiz", quizId);
    if (!quiz?.quiz || !quiz.bank) return { ...base, unavailable: true };
    return {
      ...base,
      quizId,
      quiz,
      selection: freezeQuizSelection({
        quiz: quiz.quiz,
        bank: quiz.bank,
        revision: quiz.contentRevision || "",
      }),
    };
  }
  if (kind === "writing") {
    const writingId = params.get("writing") || "";
    const writing = await safePage(content, "writing", writingId);
    if (!writing?.quiz || writing.quiz.availability === "blocked")
      return { ...base, writingId, writing, unavailable: !writing?.quiz };
    return { ...base, writingId, writing };
  }
  if (kind === "terms") {
    const setId = params.get("set") || "";
    const termData = await safePage(content, "term-set", setId);
    if (!termData?.set) return { ...base, unavailable: true };
    const unit =
      termData.units.find((item) => item.id === params.get("unit")) || termData.units[0];
    return { ...base, setId, termData, unit, set: termData.set };
  }
  const config = {
    courseId,
    topicIds: unique(params.get("topics")?.split(",")),
    count: Number(params.get("count") || 5),
    preferUnseen: params.get("unseen") === "1",
  };
  const session = await content.sessionContent(courseId, config.topicIds);
  if (!session || !config.topicIds.length) return { ...base, unavailable: true };
  const allocation = allocateSession({
    pools: session.pools,
    topicIds: config.topicIds,
    count: config.count,
    preferUnseen: config.preferUnseen,
  });
  const questions = session.banks.flatMap((bank) => bank.questions || []);
  const path = sessionPath({ ...config, count: allocation.questionIds.length });
  return {
    ...base,
    session,
    config,
    allocation,
    selection: freezePrintSelection({
      questions,
      questionIds: allocation.questionIds,
      revision: session.ledger?.revision || "",
      title: "Short practice session",
      source: "selected existing topic pools",
    }),
    sessionPublicPath: path,
  };
}

function noteForState(state) {
  const ids = new Set([state.topicId, ...(state.topicIds || [])].filter(Boolean));
  return (state.notesRecords || [])
    .map((record) => record.payload)
    .filter((mark) => mark?.note && (!ids.size || ids.has(mark.contentId)))
    .map((mark) => ({
      title: mark.pageTitle || mark.sectionId || "Reading note",
      section: mark.sectionId,
      excerpt: mark.excerpt,
      note: mark.note,
    }));
}

function renderNotes(state) {
  if (!state.options.notes) return "";
  const notes = noteForState(state);
  return notes.length
    ? `<section class="print-private-notes"><h2>Personal notes</h2><p class="muted">These notes were saved in this browser and were included only because you selected them.</p>${notes
        .map(
          (item) =>
            `<article><h3>${esc(item.title)}${item.section ? ` · ${esc(item.section)}` : ""}</h3>${item.excerpt ? `<p class="muted">${esc(item.excerpt)}</p>` : ""}<p>${esc(item.note)}</p></article>`,
        )
        .join("")}</section>`
    : `<section class="print-private-notes"><h2>Personal notes</h2><p class="print-empty">No saved notes match this selection.</p></section>`;
}

function publicPathFor(state) {
  if (state.kind === "section")
    return `/topic/${state.topicId}?section=${state.sectionId}`;
  if (state.kind === "lesson") return `/topic/${state.topicId}`;
  if (state.kind === "unit") return `/unit/${state.unitId}`;
  if (state.kind === "quiz") return `/quiz/${state.quizId}`;
  if (state.kind === "writing") return `/writing/${state.writingId}`;
  if (state.kind === "terms")
    return `/term-set/${state.setId}?unit=${state.unit?.id || ""}`;
  return state.sessionPublicPath || "/session";
}

function titleFor(state) {
  if (state.kind === "section" || state.kind === "lesson")
    return state.topic?.lesson?.title || "Reading";
  if (state.kind === "unit") return state.unit?.title || "Unit print preview";
  if (state.kind === "quiz") return state.quiz?.quiz?.title || "Practice questions";
  if (state.kind === "writing")
    return (
      state.writing?.quiz?.headline || state.writing?.quiz?.title || "Writing response"
    );
  if (state.kind === "terms") return state.set?.title || "Terms reference";
  return "Short practice session";
}

function availabilityText(state) {
  const scope = scopeText(state);
  if (state.kind === "section" || state.kind === "lesson")
    return `${scope} Existing authored reading is ready.`;
  if (state.kind === "unit")
    return `${scope} ${state.topicIds.length} of ${readyTopics(state.topics).length} ready topics selected.${state.selection.questionIds.length ? ` ${state.selection.questionIds.length} existing practice questions are available.` : " Practice is unavailable for this selection."}`;
  if (state.kind === "quiz")
    return `${scope} ${state.selection.questionIds.length} existing questions · revision ${state.selection.revision || "not separately labeled"}.`;
  if (state.kind === "writing")
    return `${scope} ${state.writing.quiz.responseFields?.length || state.writing.quiz.parts?.length || 0} response fields · no timer · self-assessment only.`;
  if (state.kind === "terms")
    return `${scope} ${state.set.cards.length} official cards · wording preserved from the existing set.`;
  return `${scope} ${state.selection.questionIds.length} of ${state.allocation.requestedCount} requested questions selected from existing topic pools.${state.allocation.shortage ? " The available pools were shorter than requested." : ""}`;
}

function scopeText(state) {
  if (state.kind === "section") {
    const section = state.topic?.lesson?.sections?.find(
      (item) => item.id === state.sectionId,
    );
    const title =
      section?.title || (state.sectionId === "learn" ? "Learn" : state.sectionId);
    const minutes = section ? "an authored section" : "the authored lesson reading";
    return `Includes: ${state.topic?.lesson?.title || "Reading"} · ${title} · ${minutes}.`;
  }
  if (state.kind === "lesson")
    return `Includes: ${state.topic?.lesson?.title || "Lesson"} · approximately ${state.topic?.lesson?.minutes || "a short"} minutes of reading.`;
  if (state.kind === "unit") {
    const titles = readyTopics(state.topics)
      .filter((topic) => state.topicIds.includes(topic.id))
      .map((topic) => `${topic.code} ${topic.title}`);
    const minutes = state.topicPages
      .filter((topic) => state.topicIds.includes(topic.lesson.id))
      .reduce((total, topic) => total + (Number(topic.lesson.minutes) || 0), 0);
    return `Includes: ${titles.join(" · ") || "no topics"} · approximately ${minutes || "no"} reading minutes.`;
  }
  if (state.kind === "quiz")
    return `Includes: ${state.quiz?.quiz?.title || "Practice activity"}.`;
  if (state.kind === "writing")
    return `Includes: ${state.writing?.quiz?.headline || "Writing activity"}.`;
  if (state.kind === "terms") return `Includes: ${state.set?.title || "Terms set"}.`;
  return `Includes: ${state.config?.topicIds?.join(", ") || "selected topics"} · no additional authored assets.`;
}

function assetText(state) {
  const assets = [];
  if (state.topic?.assets) assets.push(...Object.keys(state.topic.assets));
  for (const topic of state.topicPages || [])
    assets.push(...Object.keys(topic.assets || {}));
  for (const asset of Object.keys(state.quiz?.bank?.assets || {})) assets.push(asset);
  const uniqueAssets = [...new Set(assets)];
  return uniqueAssets.length
    ? `Required authored assets: ${uniqueAssets.length} image${uniqueAssets.length === 1 ? "" : "s"}.`
    : "Required assets: none beyond the browser print stylesheet.";
}

function printOptions(state) {
  const supports = {
    reading: ["section", "lesson", "unit"].includes(state.kind),
    practice: Boolean(state.selection?.questionIds?.length),
    responseSpace: ["section", "lesson", "quiz", "session", "writing"].includes(
      state.kind,
    ),
    terms: Boolean(state.termSets?.length || state.kind === "terms"),
    notes: Boolean(state.notesRecords?.some((record) => record.payload?.note)),
    responses: state.kind === "writing" && state.hasResponse,
  };
  const rows = [
    ["reading", "Reading", supports.reading],
    ["practice", "Practice questions", supports.practice],
    ["responseSpace", "Blank response space", supports.responseSpace],
    ["terms", "Official Terms text", supports.terms],
    ["notes", "Personal notes", supports.notes],
    ["responses", "Completed responses", supports.responses],
  ];
  return `<fieldset class="print-options"><legend>Include in this preview</legend>${rows
    .map(
      ([key, label, enabled]) =>
        `<label class="print-option"><input type="checkbox" data-print-option="${key}" ${state.options[key] ? "checked" : ""} ${enabled ? "" : "disabled"}> <span>${label}</span>${!enabled ? '<small class="muted">Unavailable for this selection</small>' : ""}</label>`,
    )
    .join("")}</fieldset>`;
}

function topicPicker(state) {
  if (state.kind !== "unit") return "";
  const selected = new Set(state.topicIds);
  return `<fieldset class="print-topic-picker"><legend>Select ready topics</legend>${readyTopics(
    state.topics,
  )
    .map(
      (topic) =>
        `<label><input type="checkbox" data-print-topic="${esc(topic.id)}" ${selected.has(topic.id) ? "checked" : ""}> <span>${esc(topic.code)} · ${esc(topic.title)}</span></label>`,
    )
    .join("")}</fieldset>`;
}

function renderDocuments(state) {
  const path = publicPathFor(state);
  const includeQr = state.options.qr;
  let documents = "";
  if (state.kind === "section" || state.kind === "lesson") {
    if (state.options.reading)
      documents += renderLessonDocument({
        lessonData: state.topic,
        sectionId: state.sectionId,
        includeTerms: false,
        includeQr,
        publicPath: path,
        titlePrefix: state.kind === "section" ? "Section" : "Lesson",
      });
    if (state.options.terms)
      documents += (state.termSets || [])
        .map((termData) =>
          renderTermsDocument({
            set: termData.set,
            includeQr,
            publicPath: path,
            title: termData.set.title,
          }),
        )
        .join("");
    if (state.options.practice)
      documents += renderPracticeDocument({
        selection: state.selection,
        title: `${titleFor(state)} practice`,
        includeResponseSpace: state.options.responseSpace,
        includeQr: false,
        publicPath: path,
      });
  } else if (state.kind === "unit") {
    if (state.options.reading)
      documents += state.topicPages
        .filter((topic) => state.topicIds.includes(topic.lesson.id))
        .map((topic, index) =>
          renderLessonDocument({
            lessonData: topic,
            includeTerms: false,
            includeQr: includeQr && index === 0,
            publicPath: path,
            titlePrefix: "Topic",
          }),
        )
        .join("");
    if (state.options.terms)
      documents += (state.termSets || [])
        .map((termData) =>
          renderTermsDocument({
            set: termData.set,
            includeQr: false,
            publicPath: path,
            title: termData.set.title,
          }),
        )
        .join("");
  } else if (state.kind === "quiz" || state.kind === "session") {
    if (state.options.practice)
      documents = renderPracticeDocument({
        selection: state.selection,
        title: titleFor(state),
        includeResponseSpace: state.options.responseSpace,
        answerKey: state.previewMode === "key",
        includeQr,
        publicPath: path,
        customNote:
          state.kind === "session"
            ? "This link opens the public session scope; it does not reopen this exact randomized sheet on another device."
            : "",
      });
  } else if (state.kind === "writing") {
    documents = renderWritingDocument({
      quiz: state.writing.quiz,
      responses: state.responses,
      includeResponse: state.options.responses,
      includePrompt: true,
      includeQr,
      publicPath: path,
    });
  } else if (state.kind === "terms") {
    documents = renderTermsDocument({
      set: state.set,
      includeQr,
      publicPath: path,
      title: state.set.title,
    });
  }
  return `${documents}${renderNotes(state)}`;
}

function statusText(state) {
  const selected = optionsSummary(state.options);
  return selected.length
    ? `Included: ${selected.join(", ")}.`
    : "Choose at least one available item to preview.";
}

export function printPage(state) {
  const crumb =
    state.kind === "unit" && state.unit
      ? contextCrumbs(
          {
            course:
              state.courses.find((course) => course.id === state.courseId) ||
              state.topic?.course,
            unit: state.unit,
          },
          "Print preview",
        )
      : [["Courses", "/courses"], [titleFor(state), ""], ["Print preview"]];
  const keyAvailable =
    Boolean(state.selection?.questionIds?.length) &&
    ["quiz", "session"].includes(state.kind);
  const showKey = state.previewMode === "key" && keyAvailable;
  return `<div class="container print-page"><nav class="breadcrumbs" aria-label="Breadcrumb">${breadcrumbs(crumb).replace(/^<nav[^>]*>|<\/nav>$/g, "")}</nav>
    <header class="page-intro print-page__intro"><p class="eyebrow">PRINT / PREVIEW</p><h1>${esc(titleFor(state))}</h1><p>Prepare a clean browser printout from the existing activity. Nothing is saved as a file by Page One.</p></header>
    ${state.unavailable ? '<section class="empty-state"><h2>This material is not ready to print.</h2><p>Only current, complete authored material is available here. No substitute course or source packet was added.</p></section>' : `<section class="print-config" aria-labelledby="print-config-title"><div><p class="eyebrow">BEFORE YOU PRINT</p><h2 id="print-config-title">Check the activity scope.</h2><p>${esc(availabilityText(state))}</p><p class="muted">${esc(assetText(state))}</p>${state.kind === "session" ? '<p class="muted">This is a local preview of an existing short-session selection. It is not a saved worksheet manifest.</p>' : ""}</div>${topicPicker(state)}${printOptions(state)}<fieldset class="print-paper"><legend>Paper preview</legend><label><input type="radio" name="print-paper" value="letter" data-print-paper="letter" ${state.options.paper === "letter" ? "checked" : ""}> Letter</label><label><input type="radio" name="print-paper" value="a4" data-print-paper="a4" ${state.options.paper === "a4" ? "checked" : ""}> A4</label><label><input type="checkbox" data-print-qr ${state.options.qr ? "checked" : ""}> Include public QR code when it fits</label></fieldset><div class="print-actions"><button type="button" class="btn" data-print-action="print-student" ${state.options.reading || state.options.practice || state.options.terms || state.kind === "writing" ? "" : "disabled"}>Print ${showKey ? "student copy" : "preview"}</button>${keyAvailable ? `<button type="button" class="btn secondary" data-print-action="show-key">${showKey ? "Show student copy" : "Show separate answer key"}</button><button type="button" class="btn secondary" data-print-action="print-key" ${showKey ? "" : "disabled"}>Print answer key</button>` : ""}<p class="muted" data-print-status role="status" aria-live="polite">${esc(state.feedback || statusText(state))}</p></div></section><section class="print-preview-frame" data-print-paper="${esc(state.options.paper)}" aria-label="Print preview"><div class="print-preview-label">${showKey ? "Separate answer-key preview" : "Student preview"}</div>${renderDocuments(state)}</section>`}
  </div>`;
}

export async function createPrintController({ content, route, adapter, repaint }) {
  const kind = requestedKind(route.params);
  const state = {
    ...(await loadStateData(content, route.params, kind)),
    options: optionsFromParams(route.params, kind),
    previewMode: "student",
    feedback: "",
    notesRecords: [],
    hasResponse: false,
    responses: {},
  };
  if (adapter) {
    try {
      state.notesRecords = await listReadingMarks(adapter, { courseId: state.courseId });
    } catch {
      state.notesRecords = [];
    }
  }
  if (kind === "writing" && state.writing?.quiz && adapter) {
    try {
      const { createWritingStore } = await import("../writing/store.js");
      const store = createWritingStore(state.writing.quiz, { adapter });
      await store.ready;
      state.responses = { ...(store.draft.responses || {}) };
      state.hasResponse = Object.values(state.responses).some((value) =>
        String(value).trim(),
      );
    } catch {
      state.responses = {};
    }
  }

  function repaintPage() {
    repaint();
  }

  function change(event) {
    const option = event.target.closest?.("[data-print-option]");
    if (option) {
      state.options[option.dataset.printOption] = option.checked;
      state.feedback = "";
      repaintPage();
      return true;
    }
    const topic = event.target.closest?.("[data-print-topic]");
    if (topic && state.kind === "unit") {
      const next = new Set(state.topicIds);
      if (topic.checked) next.add(topic.dataset.printTopic);
      else next.delete(topic.dataset.printTopic);
      state.topicIds = [...next];
      const allowed = new Set(state.topicIds);
      const selection = state.selection;
      state.selection = freezePrintSelection({
        questions: selection.questions,
        questionIds: selection.questionIds.filter((id) => {
          const question = selection.questions.find(
            (item) => String(item.id) === String(id),
          );
          return !question?.topicId || allowed.has(question.topicId);
        }),
        revision: selection.revision,
        title: selection.title,
        source: selection.source,
      });
      repaintPage();
      return true;
    }
    const paper = event.target.closest?.("[data-print-paper]");
    if (paper) {
      state.options.paper = paper.dataset.printPaper;
      repaintPage();
      return true;
    }
    const qr = event.target.closest?.("[data-print-qr]");
    if (qr) {
      state.options.qr = qr.checked;
      repaintPage();
      return true;
    }
    return false;
  }

  function click(event) {
    const action = event.target.closest?.("[data-print-action]");
    if (!action) return false;
    const name = action.dataset.printAction;
    if (name === "show-key") {
      state.previewMode = state.previewMode === "key" ? "student" : "key";
      state.feedback =
        state.previewMode === "key"
          ? "Answer key is shown as a separate preview. It is not included in the student document."
          : "Student copy is shown.";
      repaintPage();
      return true;
    }
    if (name === "print-student" || name === "print-key") {
      state.previewMode = name === "print-key" ? "key" : "student";
      state.feedback = "Print dialog opened. Page One did not save a file.";
      repaintPage();
      setTimeout(() => globalThis.print?.(), 0);
      return true;
    }
    return false;
  }

  return {
    page: () => printPage(state),
    change,
    click,
    state,
  };
}

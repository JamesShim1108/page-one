import { createQuizController } from "../quiz/controller.js";
import { sessionPage } from "./views.js";
import { allocateSession } from "./selection.js";
import {
  normalizeSessionConfig,
  parseSessionConfig,
  sessionPath,
  sessionShare,
} from "./config.js";

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function stableHash(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

export function sessionActivityId(config) {
  return `session-${stableHash(JSON.stringify(normalizeSessionConfig(config)))}`;
}

function topicPools(data) {
  const byTopic = new Map();
  for (const pool of data?.ledger?.pools || []) {
    if (!byTopic.has(pool.topicId)) byTopic.set(pool.topicId, pool);
  }
  return [...byTopic.values()];
}

function exposureIds(attempts = []) {
  const ids = new Set();
  for (const attempt of attempts) {
    const exposed = attempt.exposure?.questionIds;
    const exposedIds = Array.isArray(exposed)
      ? exposed
      : attempt.selectionKind === "custom"
        ? []
        : attempt.orderedQuestionIds || [];
    for (const id of exposedIds) ids.add(id);
  }
  return [...ids];
}

function combineBanks(banks, selectedIds, revision) {
  const questions = [];
  const concepts = {};
  const assets = {};
  const byId = new Map();
  for (const bank of banks || []) {
    for (const question of bank.questions || []) byId.set(question.id, question);
    Object.assign(concepts, bank.concepts || {});
    Object.assign(assets, bank.assets || {});
  }
  for (const id of selectedIds) if (byId.has(id)) questions.push(clone(byId.get(id)));
  return { questions, concepts, assets, revision };
}

function sessionDataFromAttempt(base, attempt, config) {
  const selectedIds = attempt.orderedQuestionIds || attempt.ids || [];
  const bank = {
    ...combineBanks([], [], attempt.contentRevision || "saved"),
    questions: clone(attempt.questionSnapshot?.questions || []),
    assets: clone(attempt.questionSnapshot?.assets || {}),
    revision: attempt.contentRevision || "saved",
  };
  return buildQuizData(base, config, selectedIds, bank, attempt);
}

function buildQuizData(base, config, selectedIds, bank, attempt = null) {
  const activityId = attempt?.quizId || sessionActivityId(config);
  const quiz = {
    id: activityId,
    courseId: config.courseId,
    unitId: "session",
    title: "Short practice session",
    quizType: "custom",
    questionIds: [...selectedIds],
  };
  const routes = {
    quiz: (quizId, attemptId) => sessionPath(config, { attemptId, view: "quiz" }),
    results: (quizId, attemptId, filters = [], topic = "") => {
      const path = sessionPath(config, { attemptId, view: "results" });
      const params = new URLSearchParams(path.split("?")[1] || "");
      if (filters.length) params.set("filter", filters.join(","));
      if (topic) params.set("topic", topic);
      return `/session?${params}`;
    },
    back: () => sessionPath(config),
    share: () => sessionPath(config),
    review: () => sessionPath(config),
    history: (courseId, quizId) =>
      `/history?course=${encodeURIComponent(courseId)}&quiz=${encodeURIComponent(quizId)}`,
  };
  return {
    course: base.course,
    unit: {
      id: "session",
      number: "S",
      title: "Short session",
      hasGuide: false,
      writingQuizzes: [],
    },
    topic: null,
    quiz,
    bank: { ...bank, quizzes: [quiz], courseId: config.courseId },
    breadcrumbs: [
      ["Courses", "/courses"],
      [base.course.shortTitle, `/course/${base.course.id}`],
      ["Short session"],
    ],
    routes,
  };
}

function currentAttemptFor(store, config) {
  const activityId = sessionActivityId(config);
  return (
    store
      .list({ courseId: config.courseId, quizId: activityId, status: "active" })
      .find((attempt) => attempt.selectionKind === "custom") || null
  );
}

export async function createSessionController({
  content,
  attemptStore,
  route,
  navigate,
  repaint = () => {},
  recent = null,
} = {}) {
  const requested = parseSessionConfig(route.params, {});
  let base = await content.sessionData(requested.courseId);
  if (!base) return null;
  const availableTopics = topicPools(base);
  const fallback = {
    courseId: base.course.id,
    topicIds: availableTopics.slice(0, 1).map((topic) => topic.topicId),
    count: 5,
    mode: "practice",
    preferUnseen: false,
  };
  let config = parseSessionConfig(route.params, fallback);
  if (config.courseId !== base.course.id) {
    base = (await content.sessionData(config.courseId)) || base;
  }
  const pools = topicPools(base);
  const validTopics = new Set(pools.map((topic) => topic.topicId));
  config = normalizeSessionConfig({
    ...config,
    courseId: base.course.id,
    topicIds: config.topicIds.filter((topicId) => validTopics.has(topicId)),
  });
  if (!config.topicIds.length)
    config.topicIds = pools.slice(0, 1).map((topic) => topic.topicId);

  const storedAttempt = route.params.get("attempt")
    ? attemptStore.getByAttemptId(route.params.get("attempt"))
    : null;
  const activityId = sessionActivityId(config);
  const validStoredAttempt =
    storedAttempt &&
    storedAttempt.courseId === config.courseId &&
    storedAttempt.quizId === activityId &&
    storedAttempt.selectionKind === "custom" &&
    storedAttempt.provenance?.sessionConfig &&
    JSON.stringify(normalizeSessionConfig(storedAttempt.provenance.sessionConfig)) ===
      JSON.stringify(config)
      ? storedAttempt
      : null;

  let notice = "";
  let starting = false;
  let preview = allocateSession({
    pools,
    topicIds: config.topicIds,
    count: config.count,
    exposedIds: exposureIds(attemptStore.list({ courseId: config.courseId })),
    preferUnseen: config.preferUnseen,
  });
  preview.hasExposure =
    exposureIds(attemptStore.list({ courseId: config.courseId })).length > 0;
  let quizController = null;

  if (validStoredAttempt) {
    const data = sessionDataFromAttempt(base, validStoredAttempt, config);
    quizController = createQuizController(data, attemptStore, {
      navigate,
      repaint,
      recent,
      attemptId: validStoredAttempt.attemptId,
      resultFilter: route.params.get("filter"),
      resultTopic: route.params.get("topic"),
      routes: data.routes,
    });
  }

  async function start() {
    if (starting || !preview.questionIds.length) return false;
    starting = true;
    const current = await content.sessionContent(config.courseId, config.topicIds);
    const currentPools = current?.pools || [];
    const currentExposures = exposureIds(
      attemptStore.list({ courseId: config.courseId }),
    );
    const currentPreview = allocateSession({
      pools: currentPools,
      topicIds: config.topicIds,
      count: config.count,
      exposedIds: currentExposures,
      preferUnseen: config.preferUnseen,
    });
    currentPreview.hasExposure = currentExposures.length > 0;
    if (currentPreview.questionIds.length !== preview.questionIds.length) {
      preview = currentPreview;
      notice =
        "Availability changed while this page was open. Review the updated preview before starting.";
      starting = false;
      repaint();
      return false;
    }
    const bankRevision =
      [
        current?.ledger?.revision,
        ...(current?.banks || []).map(
          (bank) => bank.contentRevision || bank.revision || "",
        ),
      ]
        .filter(Boolean)
        .join(":") || "unversioned";
    const bank = combineBanks(
      current?.banks || [],
      currentPreview.questionIds,
      bankRevision,
    );
    if (bank.questions.length !== currentPreview.questionIds.length) {
      preview = {
        ...currentPreview,
        questionIds: bank.questions.map((question) => question.id),
        shortage: true,
      };
      notice =
        "Some current questions were unavailable. Review the updated preview before starting.";
      starting = false;
      repaint();
      return false;
    }
    const data = buildQuizData(current, config, currentPreview.questionIds, bank);
    quizController = createQuizController(data, attemptStore, {
      navigate,
      repaint,
      recent,
      routes: data.routes,
      attemptOptions: {
        trackExposure: true,
        provenance: {
          kind: "custom-session",
          sessionConfig: clone(config),
          eligibilityRevision: current?.ledger?.revision || "unversioned",
        },
      },
    });
    const next = quizController.start(
      data.quiz.id,
      config.mode,
      "custom",
      currentPreview.questionIds,
    );
    starting = false;
    if (!next) {
      notice = "This session could not start. Review the available topics and try again.";
      repaint();
      return false;
    }
    navigate(sessionPath(config, { attemptId: next.attemptId, view: "quiz" }));
    return true;
  }

  function submit(event) {
    event.preventDefault();
    const form = event.target.closest("[data-session-builder]");
    if (!form) return false;
    const countValue = form.elements.count.value;
    const count = countValue === "custom" ? form.elements.customCount.value : countValue;
    const next = normalizeSessionConfig({
      courseId: form.elements.course.value,
      topicIds: [...form.querySelectorAll('input[name="topics"]:checked')].map(
        (input) => input.value,
      ),
      count,
      mode: form.elements.mode.value,
      preferUnseen: form.elements.preferUnseen.checked,
    });
    navigate(sessionPath(next));
    return true;
  }

  function click(event) {
    const control = event?.target?.closest?.("[data-action]");
    if (!control) return false;
    if (control.dataset.action === "session-start") {
      control.disabled = true;
      start().catch(() => {
        starting = false;
        notice =
          "This session could not start. Review the available topics and try again.";
        repaint();
      });
      return true;
    }
    return false;
  }

  function change(event) {
    return Boolean(event.target.closest?.("[data-session-builder]"));
  }

  const page = () => {
    if (quizController) {
      quizController.expose();
      return route.params.get("view") === "results"
        ? quizController.results()
        : quizController.page();
    }
    const activeAttempt = currentAttemptFor(attemptStore, config);
    return sessionPage({
      courses: base.courses,
      course: base.course,
      pools,
      config,
      preview,
      activeAttempt,
      notice,
      share: sessionShare(config),
    });
  };

  return {
    page,
    submit,
    click,
    change,
    quiz: quizController,
    get ready() {
      return Promise.resolve();
    },
  };
}

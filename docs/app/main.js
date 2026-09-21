import { createContentStore } from "./content-store.js";
import { parseRoute, createRouteLoader } from "./router.js";
import { pageTitle, emptyPage, link } from "./ui.js";
import { homePage, courseListPage, coursePage, unitPage } from "./views/catalog.js";
import { startCarousel, toggleCarousel } from "./carousel.js";
import { createAttemptStore } from "./quiz/store.js";
import { createLocalAdapter } from "./storage/adapter.js";
import {
  applyReadingPreferences,
  createReadingPreferences,
} from "./reading/preferences.js";
import { createRecentWork } from "./recent.js";
import { readNavigationContext } from "./navigation-context.js";
import { stableBlockId } from "./blocks.js";
import { listReadingMarks } from "./reading/marks.js";
import { createShareController } from "./share/controller.js";
import { createReportController } from "./share/report.js";
import { createPrintController } from "./print/controller.js";
import { createBackupController } from "./backup/controller.js";
import { createOfflineController } from "./offline/controller.js";
import {
  announceOfflinePack,
  offlinePackId,
  offlineReadingActive,
} from "./offline/route.js";

// Persistent stores are separate from the page controllers, which change with the route.
const content = createContentStore();
const loadRoute = createRouteLoader(content);
const persistence = createLocalAdapter();
const recentWork = createRecentWork({ adapter: persistence });
const attemptStore = createAttemptStore({ adapter: persistence });
const readingPreferences = createReadingPreferences(persistence);
const shareController = createShareController();
const reportController = createReportController();
applyReadingPreferences(readingPreferences.values);
readingPreferences.subscribe((values) => {
  applyReadingPreferences(values);
  window.dispatchEvent(
    new CustomEvent("page-one-reading-preference", { detail: values }),
  );
});
readingPreferences.ready.then(() => applyReadingPreferences(readingPreferences.values));
const activeOfflinePack = offlinePackId();
if (activeOfflinePack) void announceOfflinePack(activeOfflinePack);
const writingStores = new Map();
let termsStore = null;
const main = document.getElementById("main");
let currentPage = () => "",
  currentQuiz = null,
  currentWriting = null,
  currentTerms = null,
  currentSearch = null,
  currentReview = null,
  currentSession = null,
  currentPrint = null,
  currentBackup = null,
  currentOffline = null;
let stopCarousel = () => {},
  currentRoute = parseRoute(location.hash),
  routeGeneration = 0;
let pendingQuizStart = null;
let settingsResetScope = null;
let settingsFeedback = "";
let enhancePage = () => () => {},
  stopPageEnhancements = () => {};

function navigate(path) {
  if (location.hash === `#${path}`) repaint();
  else location.hash = `#${path}`;
}

function routeBase(route) {
  if (!route || route.type === "home") return "/";
  return route.id ? `/${route.type}/${route.id}` : `/${route.type}`;
}

function savedTargetFor(route) {
  return recentWork.findRoute(routeBase(route));
}

function savedDestinationPage(target) {
  return {
    html: () =>
      emptyPage(
        "That saved place is no longer available.",
        `${target.title} was removed or renamed. Your other saved work is still here.`,
        "/courses",
        "Browse courses",
      ),
    title: "Saved place unavailable",
    description: "Choose another course or activity to continue studying.",
  };
}

function guideSectionIds(guide) {
  return new Set([
    ...(guide?.overview ? ["overview"] : []),
    "timeline",
    "comparison",
    ...(guide?.networkData ? ["networks", "comparison-workspace"] : []),
    ...(guide?.activities?.length ? ["claim-activities"] : []),
    ...(guide?.causalChains ? ["causal-chains"] : []),
    ...(guide?.evidenceGuide ? ["evidence-guide"] : []),
    "topic-check",
    "pitfalls",
    ...(guide?.unit1Bridge ? ["unit1-bridge"] : []),
    ...(guide?.laterCallout ? ["later-callout"] : []),
    "resources",
  ]);
}

async function markAvailability(records) {
  const pages = new Map();
  for (const record of records) {
    const payload = record.payload;
    const contentId = payload.contentId || payload.pageId.split(":").at(-1);
    const pageKey = `${payload.pageType}:${contentId}`;
    if (!pages.has(pageKey))
      pages.set(
        pageKey,
        content.readingPage(payload.pageType, contentId).catch(() => null),
      );
  }
  const resolved = new Map(
    await Promise.all(
      [...pages.entries()].map(async ([key, promise]) => [key, await promise]),
    ),
  );
  return records.map((record) => {
    const payload = record.payload;
    const contentId = payload.contentId || payload.pageId.split(":").at(-1);
    const page = resolved.get(`${payload.pageType}:${contentId}`);
    const sectionIds =
      payload.pageType === "topic"
        ? new Set([
            "learn",
            "reading-guide",
            "terms",
            "connections",
            "practice",
            "writing",
            ...(page?.lesson?.sections || []).map((section) => section.id),
          ])
        : guideSectionIds(page?.guide);
    const sectionExists = Boolean(page && sectionIds.has(payload.sectionId));
    const blockExists =
      payload.targetType !== "block" ||
      Boolean(
        page?.lesson?.sections
          ?.find((section) => section.id === payload.sectionId)
          ?.blocks?.some(
            (block, index) =>
              stableBlockId(block, payload.sectionId, index) === payload.targetId,
          ),
      );
    return { ...record, orphaned: !sectionExists || !blockExists };
  });
}

function repaint() {
  currentWriting?.flush();
  stopCarousel();
  stopPageEnhancements();
  main.innerHTML = currentPage();
  stopCarousel = startCarousel();
  stopPageEnhancements = enhancePage();
}

async function selectPage(route, data, generation) {
  if (!data) {
    const savedTarget = savedTargetFor(route);
    return savedTarget
      ? savedDestinationPage(savedTarget)
      : {
          html: () =>
            emptyPage(
              "Let’s get you back on track.",
              "We couldn’t find that page. Pick a course to continue.",
            ),
          title: "Page not found",
          description: "Choose a course to continue studying.",
        };
  }
  const title =
    data.set?.title ||
    data.quiz?.title ||
    data.lesson?.title ||
    data.guide?.title ||
    data.unit?.title ||
    data.course?.title ||
    "Study smarter";
  const description =
    data.lesson?.summary ||
    data.unit?.description ||
    data.course?.description ||
    "Free lessons, key terms, and practice in one place.";
  const selected = { title, description };
  const offlineReading = offlineReadingActive();
  const enhancements = [];
  if (["topic", "guide"].includes(route.type) && data.glossary?.length) {
    const { mountConceptPopovers } =
      await import("./concepts/controller.js?v=20260918-fit");
    if (generation !== routeGeneration) return null;
    enhancements.push(() =>
      mountConceptPopovers(main, data.glossary, {
        mode: readingPreferences.values.definitionTrigger,
        reportContext: {
          courseId: data.course?.id || data.lesson?.courseId || data.unit?.courseId || "",
          topicId: data.lesson?.id || "",
          revision: data.contentRevision || "",
          path: `/${route.type}/${route.id}`,
        },
      }),
    );
  }
  if (route.type === "guide" && data.guide?.networkData && !offlineReading) {
    const { mountUnitTools } = await import("./unit-tools.js");
    if (generation !== routeGeneration) return null;
    enhancements.push(() => mountUnitTools(main, data.guide, { sources: data.sources }));
  }
  if (["topic", "guide"].includes(route.type)) {
    const { mountReadingSurface } = await import("./reading/controller.js");
    if (generation !== routeGeneration) return null;
    enhancements.push(() =>
      mountReadingSurface(main, {
        adapter: persistence,
        pageId: `reading:${route.type}:${route.id}`,
        courseId: data.course?.id || data.lesson?.courseId || "",
        explicitTarget:
          Boolean(route.params.get("section") || route.params.get("block")) &&
          route.params.get("resume") !== "1",
        recent: recentWork,
        recentTarget: {
          key: `reading:reading:${route.type}:${route.id}`,
          kind: "reading",
          route: `/${route.type}/${route.id}`,
          courseId: data.course?.id || data.lesson?.courseId || "",
          title: data.lesson?.title || data.guide?.headline || "Reading",
        },
      }),
    );
    const { mountReadingMarks } = await import("./reading/marks.js");
    if (generation !== routeGeneration) return null;
    enhancements.push(() =>
      mountReadingMarks(main, {
        adapter: persistence,
        pageId: `reading:${route.type}:${route.id}`,
        contentId: route.id,
        courseId: data.course?.id || data.lesson?.courseId || data.unit?.courseId || "",
        pageType: route.type,
        pageRoute: `/${route.type}/${route.id}`,
        pageTitle: data.lesson?.title || data.guide?.headline || "Reading",
        unitTitle: data.unit?.title || "",
        courseTitle: data.course?.title || data.course?.shortTitle || "",
        contentRevision: data.contentRevision || "",
      }),
    );
  }
  enhancements.push(() => shareController.enhance());
  if (enhancements.length)
    selected.enhance = () => {
      const cleanups = enhancements.map((enhance) => enhance()).filter(Boolean);
      return () => cleanups.forEach((cleanup) => cleanup());
    };
  if (route.type === "home")
    selected.html = () =>
      homePage(data, { resume: recentWork.resume(), items: recentWork.list() });
  else if (route.type === "courses") {
    selected.html = () => courseListPage(data);
    selected.title = "Courses";
  } else if (route.type === "course") selected.html = () => coursePage(data);
  else if (route.type === "settings") {
    const { settingsPage } = await import("./settings.js");
    const records = await persistence.list({ includeIncompatible: true });
    const backup = await createBackupController({
      adapter: persistence,
      courses: data.courses,
      records,
      repaint,
    });
    if (generation !== routeGeneration) return null;
    selected.backup = backup;
    const offline = await createOfflineController({
      adapter: persistence,
      content,
      courses: data.courses,
      repaint,
      moduleUrl: import.meta.url,
    });
    if (generation !== routeGeneration) return null;
    selected.offline = offline;
    selected.title = "Settings";
    selected.html = () =>
      settingsPage({
        courses: data.courses,
        adapter: persistence,
        records,
        resetScope: settingsResetScope,
        feedback: settingsFeedback,
        readingPreferences: readingPreferences.values,
        backup,
        offline,
      });
  } else if (route.type === "history") {
    const { historyPage } = await import("./history.js");
    selected.title = "Attempt history";
    selected.description = "Review saved practice attempts in this browser.";
    selected.html = () =>
      historyPage({
        courses: data.courses,
        attempts: attemptStore.listSummaries({
          courseId: route.params.get("course") || "",
          quizId: route.params.get("quiz") || "",
        }),
        courseId: route.params.get("course") || "",
        quizId: route.params.get("quiz") || "",
      });
  } else if (route.type === "search") {
    const { createSearchController } = await import("./search.js");
    const searchData = await content.searchIndexes(route.params.get("course") || "");
    if (generation !== routeGeneration) return null;
    selected.title = "Search";
    selected.description = "Find an available lesson or reading passage.";
    selected.search = createSearchController({
      ...searchData,
      query: route.params.get("q") || "",
      courseId: route.params.get("course") || "",
      returnToken: route.params.get("return") || "",
      navigate,
      repaint,
      retry: () => render(true),
    });
    selected.html = selected.search.page;
    selected.enhance = selected.search.enhance;
  } else if (route.type === "review") {
    const { createReadingReviewController } = await import("./reading/marks.js");
    const records = await markAvailability(await listReadingMarks(persistence));
    if (generation !== routeGeneration) return null;
    selected.title = "My review";
    selected.description = "Review passages saved in this browser.";
    selected.review = createReadingReviewController({
      records,
      courses: data.courses,
      courseId: route.params.get("course") || "",
      returnToken: route.params.get("return") || "",
      adapter: persistence,
      navigate,
      repaint,
    });
    selected.html = selected.review.page;
    selected.enhance = selected.review.enhance;
  } else if (route.type === "session") {
    const { createSessionController } = await import("./session/controller.js");
    if (generation !== routeGeneration) return null;
    const session = await createSessionController({
      content,
      attemptStore,
      route,
      navigate,
      repaint,
      recent: recentWork,
    });
    if (generation !== routeGeneration) return null;
    selected.session = session;
    selected.quiz = session?.quiz || null;
    selected.title = "Short practice session";
    selected.description = "Build a bounded practice session from selected topics.";
    selected.html =
      session?.page ||
      (() =>
        emptyPage(
          "Short sessions are unavailable",
          "Choose a ready course to continue.",
        ));
  } else if (route.type === "print") {
    const print = await createPrintController({
      content,
      route,
      adapter: persistence,
      repaint,
    });
    if (generation !== routeGeneration) return null;
    selected.print = print;
    selected.title = "Print preview";
    selected.description =
      "Prepare a clean browser printout from existing Page One material.";
    selected.html = print.page;
  } else if (route.type === "unit")
    selected.html = () => unitPage(data, attemptStore.peek);
  else if (route.type === "terms") {
    const { termsIndexPage } = await import("./terms/views.js");
    selected.title = `Unit ${data.unit.number} terms`;
    selected.html = () => termsIndexPage(data);
  } else if (route.type === "term-set") {
    const { createTermsController } = await import("./terms/controller.js");
    const { createTermsStore } = await import("./terms/store.js");
    if (generation !== routeGeneration) return null;
    termsStore ||= createTermsStore({ adapter: persistence });
    await termsStore.ready;
    const unit =
      data.units.find((item) => item.id === route.params.get("unit")) || data.units[0];
    selected.terms = createTermsController({ ...data, unit }, termsStore, {
      repaint,
      navigate,
      mode: route.params.get("view") === "list" ? "list" : "cards",
      recent: recentWork,
      listFilter: {
        status: route.params.get("status"),
        query: route.params.get("q"),
        includeNotes: route.params.get("notes") === "1",
        row: route.params.get("row"),
      },
      referenceCardId: route.params.get("card"),
      returnPath: route.params.get("return"),
    });
    await selected.terms.ready;
    selected.html = selected.terms.page;
  } else if (["topic", "quiz", "results"].includes(route.type)) {
    const { createQuizController } = await import("./quiz/controller.js");
    if (generation !== routeGeneration) return null;
    const controller = data.bank
      ? createQuizController(data, attemptStore, {
          navigate,
          repaint,
          recent: recentWork,
          attemptId: route.params.get("attempt"),
          resultFilter: route.params.get("filter"),
          resultTopic: route.params.get("topic"),
        })
      : null;
    selected.quiz = controller;
    if (controller && pendingQuizStart?.quizId === route.id) {
      controller.start(route.id, pendingQuizStart.mode || "practice");
      pendingQuizStart = null;
    }
    if (route.type === "topic") {
      const { lessonPage } = await import("./views/lesson.js?v=20260918-concepts");
      selected.html = () =>
        lessonPage(
          {
            ...data,
            readingPreferences: readingPreferences.values,
            offlineReading,
            returnPath: route.params.get("return"),
            searchReturn: route.params.get("searchReturn"),
            searchContext: readNavigationContext(
              "search",
              route.params.get("searchReturn"),
            ),
            reviewReturn: route.params.get("reviewReturn"),
            reviewContext: readNavigationContext(
              "reading-review",
              route.params.get("reviewReturn"),
            ),
          },
          controller,
        );
    } else selected.html = route.type === "quiz" ? controller.page : controller.results;
  } else if (route.type === "guide") {
    const { studyGuidePage } = await import("./views/guide.js?v=20260918-concepts");
    selected.html = () =>
      studyGuidePage({
        ...data,
        readingPreferences: readingPreferences.values,
        offlineReading,
      });
  } else if (route.type === "writing") {
    const { createWritingStore } = await import("./writing/store.js");
    const { createWritingController } = await import("./writing/controller.js");
    const key = `${data.quiz.id}:${data.quiz.version}`;
    if (!writingStores.has(key))
      writingStores.set(
        key,
        createWritingStore(data.quiz, {
          adapter: persistence,
          recent: recentWork,
          recentTarget: {
            key: `writing:${data.quiz.id}`,
            kind: "writing",
            route: `/writing/${data.quiz.id}`,
            courseId: data.course?.id || data.quiz.courseId || "",
            title: data.quiz.promptTitle || data.quiz.title || "Writing practice",
          },
        }),
      );
    const writingStore = writingStores.get(key);
    await writingStore.ready;
    selected.writing = createWritingController(data, writingStore, repaint, {
      resume: route.params.get("resume") === "1",
    });
    selected.html = selected.writing.page;
  }
  return selected.html
    ? selected
    : {
        html: () => emptyPage("Page not found", "Choose a course to continue."),
        title: "Page not found",
        description,
      };
}

async function render(focus = false) {
  const generation = ++routeGeneration;
  currentRoute = parseRoute(location.hash);
  const route = currentRoute;
  const activePack = offlinePackId();
  if (activePack) void announceOfflinePack(activePack);
  currentWriting?.flush();
  currentWriting?.destroy();
  stopCarousel();
  stopPageEnhancements();
  stopPageEnhancements = () => {};
  enhancePage = () => () => {};
  currentQuiz = null;
  currentWriting = null;
  currentTerms = null;
  currentSearch = null;
  currentReview = null;
  currentSession = null;
  currentPrint = null;
  currentBackup = null;
  currentOffline = null;
  main.setAttribute("aria-busy", "true");
  main.innerHTML = '<div class="page-loading" role="status">Loading...</div>';
  const loadingTimer = setTimeout(() => {
    if (generation === routeGeneration)
      main.innerHTML =
        '<div class="page-loading" role="status"><p>This is taking longer than expected.</p><button type="button" class="btn secondary" data-action="retry-load">Try again</button></div>';
  }, 10_000);
  try {
    await attemptStore.ready;
    await readingPreferences.ready;
    await recentWork.ready;
    const loaded =
      offlineReadingActive() && ["topic", "guide"].includes(route.type)
        ? { data: await content.readingPage(route.type, route.id), stale: false }
        : await loadRoute(route);
    if (loaded.stale) return;
    const page = await selectPage(route, loaded.data, generation);
    if (generation !== routeGeneration || !page) return;
    currentQuiz = page.quiz || null;
    currentWriting = page.writing || null;
    currentTerms = page.terms || null;
    currentSearch = page.search || null;
    currentReview = page.review || null;
    currentSession = page.session || null;
    currentPrint = page.print || null;
    currentBackup = page.backup || null;
    currentOffline = page.offline || null;
    enhancePage = page.enhance || (() => () => {});
    currentPage = page.html;
    pageTitle(page.title, page.description);
    repaint();
    focusDestination(route, loaded.data, focus);
    if (route.type === "writing" && route.params.get("resume") === "1")
      currentWriting?.resumeFocus();
  } catch (error) {
    if (generation !== routeGeneration) return;
    console.error(error);
    const savedTarget = savedTargetFor(route);
    const copy =
      savedTarget && ["network", "timeout"].includes(error?.category)
        ? [
            "Your saved place is temporarily unavailable.",
            `${savedTarget.title} is still saved. Try again when the connection recovers.`,
          ]
        : savedTarget && ["missing", "invalid"].includes(error?.category)
          ? [
              "That saved place is no longer available.",
              `${savedTarget.title} was removed or renamed. Your other saved work is still here.`,
            ]
          : error?.category === "missing"
            ? [
                "This page is unavailable.",
                "The requested content file was not found. Try again or choose a course.",
              ]
            : error?.category === "invalid"
              ? [
                  "This page could not be used.",
                  "The content response was not valid. Try again later or choose another course.",
                ]
              : error?.category === "timeout"
                ? [
                    "This page took too long to load.",
                    "Try again, or return to courses while the connection recovers.",
                  ]
                : [
                    "This page could not load.",
                    "Try again, or return to courses while the connection recovers.",
                  ];
    pageTitle(
      copy[0],
      savedTarget && ["network", "timeout"].includes(error?.category)
        ? "Retry loading this saved place or return to courses."
        : "Retry loading this page or return to courses.",
    );
    currentPage = () =>
      `<div class="empty-state"><h1>${copy[0]}</h1><p>${copy[1]}</p><button type="button" class="btn" data-action="retry-load">Try again</button> ${link("/courses", "Browse courses", "text-link")}</div>`;
    repaint();
  } finally {
    clearTimeout(loadingTimer);
    if (generation === routeGeneration) {
      main.removeAttribute("aria-busy");
      const courseRoute = [
        "courses",
        "course",
        "unit",
        "topic",
        "terms",
        "term-set",
        "quiz",
        "results",
        "guide",
        "writing",
        "history",
        "session",
        "print",
      ].includes(route.type);
      for (const [id, active] of [
        ["nav-home", route.type === "home"],
        ["nav-courses", courseRoute],
        ["nav-history", route.type === "history"],
        ["nav-search", route.type === "search"],
        ["nav-session", route.type === "session"],
        ["nav-review", route.type === "review"],
        ["nav-settings", route.type === "settings"],
      ]) {
        const element = document.getElementById(id);
        if (active) element.setAttribute("aria-current", "page");
        else element.removeAttribute("aria-current");
      }
    }
  }
}

function focusDestination(route, data, focus) {
  if (route.type === "term-set" && route.params.get("row")) {
    const row = document.getElementById(`term-row-${route.params.get("row")}`);
    if (row) {
      row.setAttribute("tabindex", "-1");
      row.focus({ preventScroll: true });
      row.scrollIntoView({ block: "start", behavior: "auto" });
      return;
    }
  }
  const section = route.params.get("section");
  const block = route.params.get("block");
  const allowed =
    route.type === "home"
      ? ["courses"]
      : route.type === "topic"
        ? [
            "learn",
            "reading-guide",
            "terms",
            "connections",
            "practice",
            "writing",
            ...(data?.lesson.sections.map((item) => item.id) || []),
          ]
        : route.type === "unit"
          ? ["learn", "practice", "writing"]
          : route.type === "guide"
            ? [
                ...(data?.guide?.overview ? ["overview"] : []),
                "timeline",
                "comparison",
                ...(data?.guide?.networkData ? ["networks", "comparison-workspace"] : []),
                ...(data?.guide?.activities?.length ? ["claim-activities"] : []),
                ...(data?.guide?.causalChains ? ["causal-chains"] : []),
                ...(data?.guide?.evidenceGuide ? ["evidence-guide"] : []),
                "topic-check",
                "pitfalls",
                ...(data?.guide?.unit1Bridge ? ["unit1-bridge"] : []),
                ...(data?.guide?.laterCallout ? ["later-callout"] : []),
                "resources",
                ...(data?.unit?.writingQuizzes?.length ? ["writing"] : []),
              ]
            : [];
  const validSection = section && allowed.includes(section);
  let element = null;
  if (block && validSection) {
    element =
      [...document.querySelectorAll("[data-reading-block]")].find(
        (candidate) =>
          candidate.dataset.readingBlock === block &&
          candidate.dataset.readingSection === section,
      ) || null;
    if (!element) {
      const fallback = document.getElementById(section);
      const status = document.getElementById("reading-position-status");
      if (fallback && status)
        status.textContent = "That paragraph moved; showing its section.";
      element = fallback;
    }
  } else if (validSection) element = document.getElementById(section);
  if (element) {
    element.setAttribute("tabindex", "-1");
    element.focus({ preventScroll: true });
    element.scrollIntoView({ block: "start", behavior: "auto" });
  } else if (focus) {
    window.scrollTo({ top: 0, behavior: "auto" });
    main.focus({ preventScroll: true });
  }
}

// One delegated listener per event keeps handlers intact when pages are replaced.
document.addEventListener("input", (event) => {
  if (currentWriting?.input(event)) return;
  reportController.input(event);
});
document.addEventListener("compositionstart", (event) =>
  currentWriting?.compositionstart(event),
);
document.addEventListener("compositionend", (event) =>
  currentWriting?.compositionend(event),
);
document.addEventListener("focusout", (event) => currentWriting?.focusout(event));
document.addEventListener("change", (event) => {
  const preference = event.target.closest?.("[data-reading-preference]");
  if (preference) {
    readingPreferences
      .set(preference.dataset.readingPreference, preference.value)
      .then((result) => {
        const status = document.getElementById("reading-settings-status");
        if (!status) return;
        status.textContent =
          result.status === "saved"
            ? "Saved in this browser."
            : result.status === "temporary"
              ? "Using this tab temporarily."
              : result.ok
                ? "This setting is active for now."
                : "This setting is active, but could not be saved.";
      });
    return;
  }
  if (reportController.change(event)) return;
  if (currentBackup?.change(event)) return;
  if (currentOffline?.change(event)) return;
  if (currentPrint?.change(event)) return;
  if (currentSearch?.change(event)) return;
  if (currentReview?.change(event)) return;
  if (currentSession?.change(event)) return;
  if (currentTerms?.change(event)) return;
  if (!currentWriting?.change(event)) currentQuiz?.change(event);
});
document.addEventListener("submit", (event) => {
  if (currentSearch?.submit(event)) return;
  if (currentSession?.submit(event)) return;
  if (currentTerms?.submit(event)) return;
  if (!currentWriting?.submit(event)) currentQuiz?.submit(event);
});
document.addEventListener("click", (event) => {
  if (reportController.click(event)) return;
  if (shareController.click(event)) return;
  if (currentBackup?.click(event)) return;
  if (currentOffline?.click(event)) return;
  if (currentPrint?.click(event)) return;
  if (currentSearch?.click(event)) return;
  if (currentReview?.click(event)) return;
  if (currentSession?.click(event)) return;
  if (currentTerms?.click(event)) return;
  if (currentWriting?.click(event)) return;
  if (event.target.closest(".skip-link")) {
    event.preventDefault();
    main.focus();
    return;
  }
  const readingAction = event.target.closest?.(
    '[data-reading-action="reset-reading-settings"]',
  );
  if (readingAction) {
    readingAction.disabled = true;
    readingPreferences.reset().then((result) => {
      readingAction.disabled = false;
      const status = document.getElementById("reading-settings-status");
      if (status)
        status.textContent = result.ok
          ? result.status === "saved"
            ? "Reading settings reset and saved in this browser."
            : "Reading settings reset for this tab."
          : "Reading settings reset here, but could not be saved.";
    });
    return;
  }
  const settingsControl = event.target.closest("[data-settings-action]");
  if (settingsControl) {
    const action = settingsControl.dataset.settingsAction;
    if (action === "toggle-mode") {
      persistence.setMode(
        persistence.storageMode === "temporary" ? "persistent" : "temporary",
      );
      settingsFeedback =
        persistence.storageMode === "temporary"
          ? "Temporary tab mode is on. New work is not copied to persistent storage."
          : "Saved browser mode is on. Existing persistent work is available again.";
      render(true);
    } else if (action === "prepare-reset") {
      settingsResetScope = settingsControl.dataset.settingsScope;
      settingsFeedback = "";
      repaint();
    } else if (action === "cancel-reset") {
      settingsResetScope = null;
      repaint();
    } else if (action === "confirm-reset") {
      const scope = settingsControl.dataset.settingsScope;
      settingsControl.disabled = true;
      persistence
        .clearScope(scope)
        .then((result) => {
          const reloaded =
            scope === "preferences"
              ? readingPreferences.reload()
              : scope === "recent"
                ? recentWork.reload()
                : Promise.resolve();
          settingsResetScope = null;
          settingsFeedback = result.ok
            ? "The selected Page One records were cleared."
            : "Some records could not be cleared. Try again.";
          return reloaded.then(() => render(true));
        })
        .catch(() => {
          settingsResetScope = scope;
          settingsFeedback = "The cleanup could not finish. Try again.";
          repaint();
        });
    }
    return;
  }
  const control = event.target.closest("[data-action]");
  if (!control) return;
  if (control.dataset.action === "toggle-preview") {
    toggleCarousel(control);
    return;
  }
  if (control.dataset.action === "retry-load") {
    render(true);
    return;
  }
  if (control.dataset.action === "clear-recents") {
    control.disabled = true;
    recentWork.clear().then(() => render(true));
    return;
  }
  if (currentQuiz?.click(control)) return;
  if (
    ["start", "start-practice", "start-test"].includes(control.dataset.action) &&
    control.dataset.quiz
  ) {
    pendingQuizStart = {
      quizId: control.dataset.quiz,
      mode: control.dataset.action === "start-test" ? "test" : "practice",
    };
    navigate(`/quiz/${control.dataset.quiz}`);
  }
});
document.addEventListener("keydown", (event) => currentTerms?.keydown(event));
document.addEventListener("visibilitychange", () => currentWriting?.visibility());
window.addEventListener("pagehide", () => currentWriting?.flush());
window.addEventListener("hashchange", () => render(true));
render();

// Runtime loading uses generated JSON only. Authoring modules never enter the app bundle.

export class ContentLoadError extends Error {
  constructor(message, { category = "network", path = "", status = 0, cause } = {}) {
    super(message, cause ? { cause } : undefined);
    this.name = "ContentLoadError";
    this.category = category;
    this.path = path;
    this.status = status;
    this.retryable = ["network", "timeout"].includes(category);
  }
}

function typedError(error, path) {
  if (error instanceof ContentLoadError) return error;
  return new ContentLoadError(error?.message || "The content request failed.", {
    category: error?.name === "AbortError" ? "timeout" : "network",
    path,
    cause: error,
  });
}

export function createContentStore({ fetchJson = readJson } = {}) {
  const requests = new Map();
  let revision = "";

  function load(path) {
    if (!requests.has(path)) {
      const request = fetchJson(path, revision).catch((error) => {
        requests.delete(path); // A temporary network failure must be retryable.
        throw typedError(error, path);
      });
      requests.set(path, request);
    }
    return requests.get(path);
  }

  async function catalog() {
    const data = await load("catalog.json");
    revision = data.revision;
    return data.courses;
  }

  async function sessionData(courseId = "") {
    const courses = await catalog();
    const course =
      courses.find((item) => item.id === courseId) ||
      courses.find((item) => item.status === "ready" && item.readyTopicCount > 0) ||
      null;
    if (!course) return null;
    const [index, ledger] = await Promise.all([
      load(course.indexPath),
      load(course.customPracticePath || `${course.id}/custom-practice.json`),
    ]);
    return { courses, course, units: index.units || [], ledger };
  }

  async function sessionContent(courseId, topicIds = []) {
    const data = await sessionData(courseId);
    if (!data) return null;
    const selected = new Set(topicIds);
    const pools = (data.ledger?.pools || []).filter((pool) => selected.has(pool.topicId));
    const paths = [...new Set(pools.map((pool) => pool.bankPath).filter(Boolean))];
    const banks = await Promise.all(paths.map((path) => load(path)));
    return { ...data, pools, banks };
  }

  async function page(type, id) {
    const courses = await catalog();
    if (type === "home" || type === "courses") return { courses };
    if (["settings", "history", "review", "search", "session", "print"].includes(type))
      return { courses };
    // Course IDs have no hyphens; content IDs begin with the owning course ID.
    const courseId = type === "course" ? id : id?.split("-")[0];
    const course = courses.find((item) => item.id === courseId);
    if (!course) return null;
    if (type === "course") return load(course.indexPath);
    const routes = await load(course.routesPath);
    const path = routes[type === "results" ? "quiz" : type]?.[id];
    if (!path) return null;
    const data = await load(path);
    if (type === "topic") {
      try {
        return { ...data, bank: await load(data.bankPath) };
      } catch (error) {
        // A lesson remains useful when its optional practice bank is temporarily
        // unavailable. Required quiz routes still fail as a whole below.
        return { ...data, bank: null, optionalBankError: error };
      }
    }
    if (type === "quiz" || type === "results") {
      const banks = [];
      // Only banks explicitly selected by this quiz are read.
      for (const bankPath of data.bankPaths || []) banks.push(await load(bankPath));
      if (!banks.length) banks.push(data);
      const quiz = data.quiz || data.quizzes.find((item) => item.id === id);
      if (!quiz || quiz.quizType === "quick") return null;
      return {
        ...data,
        quiz,
        bank: {
          questions: banks.flatMap((bank) => bank.questions),
          quizzes: [quiz],
          concepts: Object.fromEntries(
            banks.flatMap((bank) =>
              Object.values(bank.concepts).map((concept) => [
                `${concept.topicId}/${concept.id}`,
                concept,
              ]),
            ),
          ),
          assets: Object.assign({}, ...banks.map((bank) => bank.assets)),
        },
      };
    }
    return data;
  }

  async function searchIndexes(courseId = "") {
    const courses = await catalog();
    const selected = courseId
      ? courses.filter((course) => course.id === courseId)
      : courses.filter(
          (course) => course.status === "ready" && course.readyTopicCount > 0,
        );
    const indexes = [];
    const failures = [];
    await Promise.all(
      selected.map(async (course) => {
        if (course.status !== "ready" || course.readyTopicCount <= 0) return;
        try {
          indexes.push(await load(`${course.id}/search.json`));
        } catch (error) {
          failures.push({ courseId: course.id, error });
        }
      }),
    );
    indexes.sort((left, right) =>
      String(left.courseId).localeCompare(String(right.courseId)),
    );
    failures.sort((left, right) => left.courseId.localeCompare(right.courseId));
    return { courses, indexes, failures, courseId };
  }

  async function readingPage(type, id) {
    const courses = await catalog();
    const courseId = id?.split("-")[0];
    const course = courses.find((item) => item.id === courseId);
    if (!course) return null;
    const routes = await load(course.routesPath);
    const path = routes[type]?.[id];
    return path ? load(path) : null;
  }

  async function readingPackChoices(courseId = "") {
    const courses = await catalog();
    const course =
      courses.find((item) => item.id === courseId) ||
      courses.find((item) => item.status === "ready" && item.readyTopicCount > 0) ||
      null;
    if (!course) return null;
    const index = await load(course.indexPath);
    return { courses, course, units: index.units || [] };
  }

  async function readingPack(courseId = "", unitId = "") {
    const choices = await readingPackChoices(courseId);
    if (!choices) return null;
    const routes = await load(choices.course.routesPath);
    const unitPath = routes.unit?.[unitId];
    if (!unitPath) return null;
    const unitData = await load(unitPath);
    const topicEntries = (unitData.topics || []).filter(
      (topic) => topic.status === "ready" && routes.topic?.[topic.id],
    );
    const topicData = await Promise.all(
      topicEntries.map((topic) => load(routes.topic[topic.id])),
    );
    const guidePath = routes.guide?.[unitId] || "";
    const guideData = guidePath ? await load(guidePath) : null;
    return {
      ...choices,
      routes,
      unit: unitData.unit,
      topicData,
      guideData,
      paths: {
        catalog: "catalog.json",
        routes: choices.course.routesPath,
        topics: topicData.map((data) => routes.topic[data.topic.id]),
        guide: guidePath,
      },
    };
  }

  return {
    catalog,
    page,
    sessionData,
    sessionContent,
    searchIndexes,
    readingPage,
    readingPackChoices,
    readingPack,
  };
}

async function readJson(path, revision) {
  const url = new URL(`../generated/${path}`, import.meta.url);
  if (revision) url.searchParams.set("v", revision);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(url, { cache: "no-cache", signal: controller.signal });
    if (!response.ok)
      throw new ContentLoadError(`Could not load content (${response.status}).`, {
        category: response.status === 404 ? "missing" : "network",
        path,
        status: response.status,
      });
    try {
      return await response.json();
    } catch (error) {
      throw new ContentLoadError("The content response was not valid JSON.", {
        category: "invalid",
        path,
        cause: error,
      });
    }
  } catch (error) {
    if (error instanceof ContentLoadError) throw error;
    throw new ContentLoadError(
      error?.name === "AbortError"
        ? "The content request timed out."
        : "The content request failed.",
      {
        category: error?.name === "AbortError" ? "timeout" : "network",
        path,
        cause: error,
      },
    );
  } finally {
    clearTimeout(timer);
  }
}

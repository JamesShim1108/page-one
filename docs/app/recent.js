const RECENT_LIMIT = 12;
const recentSpec = { namespace: "app", kind: "recent", recordId: "work" };

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function timestamp(value, fallback = Date.now()) {
  if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function isoTime(value) {
  return new Date(timestamp(value)).toISOString();
}

function validRoute(route) {
  return typeof route === "string" && route.startsWith("/") && !route.includes("#");
}

function normalizeTarget(target, fallbackTime = Date.now()) {
  if (!target || typeof target !== "object") return null;
  const kind = String(target.kind || "");
  const key = String(target.key || "");
  const route = String(target.route || "");
  if (!key || !kind || !validRoute(route)) return null;
  const active = target.active !== false && target.status !== "complete";
  return {
    key,
    kind,
    route,
    courseId: target.courseId ? String(target.courseId) : "",
    title: String(target.title || "Study activity"),
    detail: String(target.detail || ""),
    active,
    status: target.status || (active ? "active" : "complete"),
    updatedAt: isoTime(target.updatedAt || fallbackTime),
    enteringUnitId: target.enteringUnitId ? String(target.enteringUnitId) : null,
    view: target.view === "list" ? "list" : target.view === "cards" ? "cards" : null,
  };
}

function normalizedItems(items) {
  if (!Array.isArray(items)) return [];
  const byKey = new Map();
  for (const item of items) {
    const normalized = normalizeTarget(item);
    if (!normalized) continue;
    const previous = byKey.get(normalized.key);
    if (!previous || timestamp(normalized.updatedAt) >= timestamp(previous.updatedAt))
      byKey.set(normalized.key, normalized);
  }
  return [...byKey.values()]
    .sort((first, second) => timestamp(second.updatedAt) - timestamp(first.updatedAt))
    .slice(0, RECENT_LIMIT);
}

function recentPayload(items, sourcesHydrated = true) {
  return { schemaVersion: 1, sourcesHydrated, items: normalizedItems(items) };
}

function sourceTarget(record) {
  const payload = record?.payload;
  if (!payload || typeof payload !== "object") return null;
  const updatedAt = record.updatedAt || Date.now();
  if (record.kind === "attempt") {
    const quizId = String(payload.quizId || "");
    if (!quizId) return null;
    const total = Array.isArray(payload.ids) ? payload.ids.length : 0;
    const position = total
      ? Math.min(Math.max(Number(payload.index) || 0, 0) + 1, total)
      : null;
    const complete = payload.complete === true;
    return normalizeTarget(
      {
        key: `quiz:${quizId}`,
        kind: "quiz",
        route: complete ? `/results/${quizId}` : `/quiz/${quizId}`,
        courseId: payload.courseId,
        title: payload.quizTitle || "Practice quiz",
        detail: complete
          ? "View results"
          : position
            ? `Question ${position} of ${total}`
            : "Unfinished practice",
        active: !complete,
        status: complete ? "complete" : "active",
        updatedAt,
      },
      timestamp(updatedAt),
    );
  }
  if (record.kind === "writing-draft") {
    const responses =
      payload.responses && typeof payload.responses === "object" ? payload.responses : {};
    const hasWork =
      Object.values(responses).some(
        (value) => typeof value === "string" && value.trim(),
      ) || payload.reviewed === true;
    if (!hasWork || !payload.quizId) return null;
    return normalizeTarget(
      {
        key: `writing:${payload.quizId}`,
        kind: "writing",
        route: `/writing/${payload.quizId}`,
        courseId: payload.courseId,
        title: payload.promptSnapshot?.promptTitle || "Writing practice",
        detail: payload.reviewed ? "Reviewed response" : "Draft in progress",
        active: payload.reviewed !== true,
        status: payload.reviewed ? "complete" : "active",
        updatedAt,
      },
      timestamp(updatedAt),
    );
  }
  if (record.kind === "terms-progress") {
    const setId = String(record.recordId || payload.setId || "");
    if (!setId) return null;
    const total = Array.isArray(payload.order) ? payload.order.length : 0;
    const position = total
      ? Math.min(Math.max(Number(payload.index) || 0, 0) + 1, total)
      : null;
    const params = new URLSearchParams();
    if (payload.enteringUnitId) params.set("unit", payload.enteringUnitId);
    if (payload.view === "list") params.set("view", "list");
    const query = params.toString() ? `?${params}` : "";
    return normalizeTarget(
      {
        key: `terms:${setId}`,
        kind: "terms",
        route: `/term-set/${setId}${query}`,
        courseId: payload.courseId,
        title: payload.setTitle || "Terms",
        detail: position ? `Card ${position} of ${total}` : "Flashcards",
        active: true,
        status: "active",
        enteringUnitId: payload.enteringUnitId,
        view: payload.view,
        updatedAt,
      },
      timestamp(updatedAt),
    );
  }
  if (record.kind === "reading-position") {
    const pageId = String(payload.pageId || record.recordId || "");
    const match = /^reading:(topic|guide):(.+)$/.exec(pageId);
    if (!match || !payload.sectionId) return null;
    const params = new URLSearchParams({ section: payload.sectionId });
    if (payload.blockId) params.set("block", payload.blockId);
    params.set("resume", "1");
    return normalizeTarget(
      {
        key: `reading:${pageId}`,
        kind: "reading",
        route: `/${match[1]}/${match[2]}?${params}`,
        courseId: record.courseId,
        title: payload.title || "Reading",
        detail: payload.sectionLabel || `Section ${payload.sectionId}`,
        active: true,
        status: "active",
        updatedAt,
      },
      timestamp(updatedAt),
    );
  }
  return null;
}

export function createRecentWork({ adapter = null, now = () => Date.now() } = {}) {
  let items = [];
  let writer = null;
  let state = adapter ? "pending" : "temporary";
  let hydrated = true;
  let saveQueue = Promise.resolve();

  function payload() {
    return recentPayload(items, hydrated);
  }

  function applyItems(nextItems) {
    items = normalizedItems(nextItems);
    return list();
  }

  async function writeCurrent() {
    if (!adapter || !writer) {
      state = "temporary";
      return { ok: true, status: "temporary" };
    }
    const result = await writer.save(payload()).catch((error) => ({
      ok: false,
      status: "failed",
      error,
    }));
    state = result.ok
      ? result.status === "temporary"
        ? "temporary"
        : "saved"
      : result.status;
    return result;
  }

  function persist() {
    const operation = ready.then(() => writeCurrent());
    saveQueue = saveQueue.then(
      () => operation,
      () => operation,
    );
    return saveQueue;
  }

  async function initialize() {
    await adapter.ready;
    writer = adapter.createRecordWriter({
      ...recentSpec,
      resetScopes: ["recent", "all"],
    });
    const record = await writer.ready;
    const stored = record?.payload;
    items = normalizedItems(stored?.items);
    hydrated = stored?.sourcesHydrated === true;
    if (!hydrated) {
      const records = await adapter.list({ includeIncompatible: false });
      const seeded = records
        .filter((item) => item.kind !== "recent")
        .map(sourceTarget)
        .filter(Boolean);
      items = normalizedItems([...items, ...seeded]);
      hydrated = true;
      const migration = await writeCurrent();
      if (!migration.ok) state = migration.status || "failed";
    }
    if (!["failed", "conflict"].includes(state))
      state = adapter.availability === "persistent" ? "clean" : "temporary";
  }

  const ready = adapter
    ? initialize().catch((error) => {
        state = "failed";
        throw error;
      })
    : Promise.resolve();

  function touch(target) {
    const normalized = normalizeTarget(target, now());
    if (!normalized) return Promise.resolve({ ok: false, status: "invalid" });
    applyItems([normalized, ...items]);
    return persist();
  }

  function seed(target, updatedAt) {
    const normalized = normalizeTarget(target, timestamp(updatedAt, now()));
    if (!normalized) return list();
    const existing = items.find((item) => item.key === normalized.key);
    if (!existing || timestamp(normalized.updatedAt) > timestamp(existing.updatedAt))
      applyItems([normalized, ...items]);
    return list();
  }

  function list() {
    return items.map((item) => clone(item));
  }

  function resume() {
    return (
      items
        .filter((item) => item.active && item.status === "active")
        .sort(
          (first, second) => timestamp(second.updatedAt) - timestamp(first.updatedAt),
        )[0] || null
    );
  }

  function findRoute(route) {
    const base = String(route || "").split("?")[0];
    return (
      items.find((item) => item.route === route || item.route.split("?")[0] === base) ||
      null
    );
  }

  async function clear() {
    items = [];
    hydrated = true;
    return persist();
  }

  async function reload() {
    await ready;
    if (!adapter || !writer) return list();
    if (writer.state === "conflict" && writer.conflict?.reset) {
      await writer.remove().catch(() => {});
      writer = adapter.createRecordWriter({
        ...recentSpec,
        resetScopes: ["recent", "all"],
      });
      await writer.ready;
    }
    let record = await adapter.read(recentSpec);
    if (!record && writer.record) {
      await writer.remove().catch(() => {});
      writer = adapter.createRecordWriter({
        ...recentSpec,
        resetScopes: ["recent", "all"],
      });
      await writer.ready;
      record = await adapter.read(recentSpec);
    }
    items = normalizedItems(record?.payload?.items);
    hydrated = record?.payload?.sourcesHydrated === true;
    state = adapter.availability === "persistent" ? "saved" : "temporary";
    return list();
  }

  return {
    ready,
    touch,
    seed,
    list,
    resume,
    findRoute,
    clear,
    reload,
    get state() {
      return writer?.state === "conflict" ? "conflict" : state;
    },
    get limit() {
      return RECENT_LIMIT;
    },
  };
}

export { RECENT_LIMIT };

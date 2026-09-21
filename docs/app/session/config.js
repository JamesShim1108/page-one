export const SESSION_PRESETS = Object.freeze([5, 10, 20]);
export const SESSION_MAX_COUNT = 50;
export const SESSION_URL_LIMIT = 1800;

function unique(values) {
  return [...new Set((Array.isArray(values) ? values : []).map(String).filter(Boolean))];
}

function safeId(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(String(value || ""));
}

export function normalizeSessionConfig(config = {}) {
  const rawCount = Number(config.count);
  const count = Number.isInteger(rawCount)
    ? Math.max(1, Math.min(SESSION_MAX_COUNT, rawCount))
    : SESSION_PRESETS[0];
  return {
    courseId: safeId(config.courseId) ? String(config.courseId) : "",
    topicIds: unique(config.topicIds).filter(safeId),
    count,
    mode: config.mode === "test" ? "test" : "practice",
    preferUnseen: config.preferUnseen === true,
  };
}

export function parseSessionConfig(params, fallback = {}) {
  const topics = String(params?.get("topics") || "")
    .split(",")
    .filter(Boolean);
  return normalizeSessionConfig({
    courseId: params?.get("course") || fallback.courseId,
    topicIds: topics.length ? topics : fallback.topicIds,
    count: params?.get("count") || fallback.count,
    mode: params?.get("mode") || fallback.mode,
    preferUnseen: params?.get("unseen") === "1" || fallback.preferUnseen === true,
  });
}

export function sessionPath(config, { attemptId = "", view = "" } = {}) {
  const normalized = normalizeSessionConfig(config);
  const params = new URLSearchParams();
  if (normalized.courseId) params.set("course", normalized.courseId);
  if (normalized.topicIds.length) params.set("topics", normalized.topicIds.join(","));
  params.set("count", String(normalized.count));
  params.set("mode", normalized.mode);
  if (normalized.preferUnseen) params.set("unseen", "1");
  if (attemptId) params.set("attempt", String(attemptId));
  if (view) params.set("view", view);
  return `/session?${params}`;
}

export function sessionShare(config, origin = "") {
  const path = sessionPath(config);
  const base =
    origin ||
    (typeof location !== "undefined" ? String(location.href).split("#", 1)[0] : "");
  const href = `${base}#${path}`;
  return { href, path, withinLimit: href.length <= SESSION_URL_LIMIT };
}

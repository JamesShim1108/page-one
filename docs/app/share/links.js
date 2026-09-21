const PUBLIC_QUERY_KEYS = Object.freeze({
  topic: ["section", "block"],
  guide: ["section"],
  termSet: ["unit", "view"],
  session: ["course", "topics", "count", "mode", "unseen"],
});

function segment(value) {
  return encodeURIComponent(String(value ?? ""));
}

function appendQuery(path, values = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== null && String(value) !== "")
      params.set(key, String(value));
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export function readingPath(route, section = "", block = "") {
  const base = String(route || "/").startsWith("/") ? String(route) : `/${route}`;
  return appendQuery(base, { section, block });
}

export function publicPath(kind, values = {}) {
  const id =
    values.id || values.topicId || values.quizId || values.setId || values.unitId;
  if (kind === "home") return "/";
  if (kind === "course") return `/course/${segment(id)}`;
  if (kind === "unit") return `/unit/${segment(id)}`;
  if (kind === "topic")
    return readingPath(`/topic/${segment(id)}`, values.section, values.block);
  if (kind === "guide") return readingPath(`/guide/${segment(id)}`, values.section);
  if (kind === "terms") return `/terms/${segment(id)}`;
  if (kind === "termSet")
    return appendQuery(`/term-set/${segment(id)}`, {
      unit: values.unitId,
      view: values.view === "list" ? "list" : "",
    });
  if (kind === "quiz") return `/quiz/${segment(id)}`;
  if (kind === "writing") return `/writing/${segment(id)}`;
  if (kind === "session") return appendQuery("/session", values);
  return "/";
}

function allowedQuery(kind, query) {
  const allowed = PUBLIC_QUERY_KEYS[kind] || [];
  const result = new URLSearchParams();
  for (const key of allowed) {
    const value = query.get(key);
    if (value) result.set(key, value);
  }
  return result;
}

// Normalize a route before it is made public. Result and active-attempt routes
// intentionally become their original activity; private state is never shared.
export function cleanPublicPath(path) {
  let value = String(path || "/").trim();
  if (value.startsWith("#")) value = value.slice(1);
  if (!value.startsWith("/")) value = `/${value}`;
  const [pathname, queryString = ""] = value.split("?", 2);
  const parts = pathname.split("/").filter(Boolean);
  const type = parts[0] || "";
  const id = parts[1] || "";
  const query = new URLSearchParams(queryString);
  if (!id && type !== "session" && type !== "search" && type !== "review") return "/";
  if (type === "results" || type === "quiz") return id ? `/quiz/${segment(id)}` : "/";
  if (type === "topic")
    return readingPath(`/topic/${segment(id)}`, query.get("section"), query.get("block"));
  if (type === "guide") return readingPath(`/guide/${segment(id)}`, query.get("section"));
  if (type === "term-set")
    return appendQuery(`/term-set/${segment(id)}`, {
      unit: query.get("unit"),
      view: query.get("view") === "list" ? "list" : "",
    });
  if (type === "session")
    return appendQuery("/session", Object.fromEntries(allowedQuery("session", query)));
  if (["course", "unit", "terms", "writing"].includes(type) && id)
    return `/${type}/${segment(id)}`;
  if (type === "search") return "/search";
  if (type === "review") return "/review";
  if (["courses", "settings", "history"].includes(type)) return `/${type}`;
  return "/";
}

export function publicUrl(path, { href = globalThis.location?.href } = {}) {
  const base = new URL(href || "http://localhost/", "http://localhost/");
  base.search = "";
  base.hash = `#${cleanPublicPath(path)}`;
  return base.href;
}

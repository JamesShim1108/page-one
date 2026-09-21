import { escapeHtml } from "../ui.js";

const WORDS = /[\p{L}\p{N}]+/gu;
const TYPE_ORDER = Object.freeze({
  code: 0,
  topic: 1,
  section: 2,
  passage: 3,
  glossary: 4,
  unit: 5,
  course: 6,
});

export function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-US")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function searchWords(value) {
  return normalizeSearchText(value).match(WORDS) || [];
}

function uniqueWords(value) {
  return [...new Set(searchWords(value))];
}

function recordText(record) {
  return [
    record.id,
    record.code,
    record.title,
    record.heading,
    ...(record.aliases || []),
    record.text,
  ]
    .filter(Boolean)
    .join(" ");
}

function searchableFields(record) {
  return {
    id: normalizeSearchText(record.id),
    code: normalizeSearchText(record.code),
    title: normalizeSearchText(record.title),
    heading: normalizeSearchText(record.heading),
    aliases: (record.aliases || []).map(normalizeSearchText),
    text: normalizeSearchText(record.text),
  };
}

function allWordsPresent(words, text) {
  const tokens = new Set(searchWords(text));
  return words.every((word) => tokens.has(word));
}

function partialWordsPresent(words, text) {
  const tokens = searchWords(text);
  return (
    words.length > 0 &&
    words.every((word) => tokens.some((token) => token.startsWith(word)))
  );
}

export function scoreSearchRecord(record, query) {
  const words = uniqueWords(query);
  if (!words.length) return null;
  const fields = searchableFields(record);
  const phrase = normalizeSearchText(query);
  if (fields.id === phrase || fields.code === phrase)
    return { score: 0, match: "Topic code or ID" };
  if (fields.title === phrase || fields.heading === phrase)
    return { score: 10, match: "Exact title" };
  if (fields.aliases.includes(phrase)) return { score: 20, match: "Alias" };
  if (allWordsPresent(words, recordText(record)))
    return { score: 30, match: "Reading match" };
  if (partialWordsPresent(words, recordText(record)))
    return { score: 40, match: "Partial match" };
  return null;
}

export function searchRecords(
  index,
  query,
  { courseId = "", limit = 20, offset = 0 } = {},
) {
  const records = Array.isArray(index) ? index : index?.records || [];
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery)
    return {
      query: "",
      total: 0,
      items: [],
      hasMore: false,
      revision: index?.revision || "",
    };
  const ranked = records
    .filter((record) => !courseId || record.courseId === courseId)
    .map((record, index) => {
      const scored = scoreSearchRecord(record, normalizedQuery);
      return scored ? { ...record, ...scored, _index: index } : null;
    })
    .filter(Boolean)
    .sort(
      (left, right) =>
        left.score - right.score ||
        (TYPE_ORDER[left.type] ?? 99) - (TYPE_ORDER[right.type] ?? 99) ||
        left._index - right._index ||
        String(left.id).localeCompare(String(right.id)),
    );
  const start = Math.max(0, Number(offset) || 0);
  const size = Math.max(1, Math.min(100, Number(limit) || 20));
  return {
    query: normalizedQuery,
    total: ranked.length,
    items: ranked.slice(start, start + size),
    hasMore: start + size < ranked.length,
    revision: index?.revision || "",
  };
}

function regexEscape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightSearchText(value, query) {
  const text = String(value ?? "");
  const terms = [...new Set(String(query ?? "").match(/[\p{L}\p{N}]+/gu) || [])].filter(
    Boolean,
  );
  if (!terms.length) return escapeHtml(text);
  const expression = new RegExp(`(${terms.map(regexEscape).join("|")})`, "giu");
  let output = "";
  let cursor = 0;
  for (const match of text.matchAll(expression)) {
    const start = match.index ?? 0;
    output += escapeHtml(text.slice(cursor, start));
    output += `<mark>${escapeHtml(match[0])}</mark>`;
    cursor = start + match[0].length;
  }
  return output + escapeHtml(text.slice(cursor));
}

export function excerptForSearch(record) {
  const text = String(record.excerpt || record.text || record.title || "").trim();
  if (text.length <= 280) return text;
  return `${text.slice(0, 277).trimEnd()}…`;
}

// Shared helpers for typed-answer ("free") questions. Kept free of imports so the
// attempt store, print views, and quiz engine can all use them without pulling in
// the answer checker.
//
// A free question in a bank is a template with many `variants`, each a complete
// problem with its own numbers. An attempt snapshots one variant under the
// template's id, so everything keyed by question ID (responses, flags, history,
// review) keeps working, and a retry or a "practice these again" gets new numbers.

// After this many wrong checks the quiz offers the worked solution.
export const TRIES_BEFORE_SOLUTION_OFFER = 2;

export const isFree = (question) => question?.format === "free";

export function pickVariant(question, random = Math.random) {
  const count = Array.isArray(question?.variants) ? question.variants.length : 0;
  return count ? Math.min(count - 1, Math.floor(random() * count)) : 0;
}

// The template with one variant merged in, shaped like any other question.
export function flattenQuestion(question, index = 0) {
  if (!isFree(question) || !Array.isArray(question.variants) || !question.variants.length)
    return question;
  const { variants, ...base } = question;
  const variant = variants[index] || variants[0];
  const solution = Array.isArray(variant.solution) ? variant.solution : [];
  return {
    ...base,
    ...variant,
    prompt: variant.stem ?? base.prompt ?? "",
    explanation: variant.explanation || solution.join(" "),
    variant: variants[index] ? index : 0,
  };
}

export function hasAnyValue(response) {
  return Object.values(response?.values || {}).some(
    (value) => String(value ?? "").trim() !== "",
  );
}

// A typed question counts as answered once something is typed or the solution was shown.
export const freeAnswered = (response) =>
  hasAnyValue(response) || response?.revealed === true;

export function questionFieldIds(question) {
  return (question?.parts || []).flatMap((part) =>
    (part.fields || []).map((field) => field.id),
  );
}

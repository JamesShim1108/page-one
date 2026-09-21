import { escapeHtml as esc } from "../ui.js";

const escapePattern = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Match complete words in plain text, before HTML escaping. Longest phrases win,
// so a shorter concept cannot split an already recognized multiword concept.
export function createConceptText(concepts = [], { triggerMode = "hover-focus" } = {}) {
  const phrases = new Map();
  for (const concept of concepts) {
    for (const phrase of [concept.term, ...(concept.aliases || [])]) {
      phrases.set(phrase.toLocaleLowerCase("en"), concept.id);
    }
  }
  if (!phrases.size) return esc;
  const alternatives = [...phrases.keys()]
    .sort((a, b) => b.length - a.length)
    .map(escapePattern);
  const pattern = new RegExp(
    `(?<![\\p{L}\\p{N}_])(?:${alternatives.join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
  let triggerIndex = 0;
  return (text) => {
    let html = "",
      offset = 0;
    const seen = new Set();
    for (const match of text.matchAll(pattern)) {
      const id = phrases.get(match[0].toLocaleLowerCase("en"));
      html += esc(text.slice(offset, match.index));
      // One link per concept in each paragraph keeps repeated wording readable.
      html += seen.has(id)
        ? esc(match[0])
        : triggerMode === "off"
          ? `<span class="concept-term" data-concept-id="${esc(id)}">${esc(match[0])}</span>`
          : `<button type="button" class="concept-trigger" id="concept-word-${triggerIndex++}" data-concept-id="${esc(id)}" aria-haspopup="dialog" aria-expanded="false">${esc(match[0])}</button>`;
      seen.add(id);
      offset = match.index + match[0].length;
    }
    return html + esc(text.slice(offset));
  };
}

export function conceptHelp(concepts = [], triggerMode = "hover-focus") {
  if (!concepts.length || triggerMode === "off") return "";
  return triggerMode === "click"
    ? '<p class="concept-help">Dotted-underlined words have definitions. Select one to explore.</p>'
    : '<p class="concept-help">Dotted-underlined words have definitions. Hover over or focus one to explore.</p>';
}

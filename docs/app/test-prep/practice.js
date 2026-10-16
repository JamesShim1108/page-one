// Pure rules for PSAT/SAT practice sessions: which items a scope includes, how a
// timed module is drawn, and how results and practice estimates are computed.
import { checkResponse, PRACTICE_ESTIMATE_LABEL } from "./engine.js";

// Items for one test, optionally narrowed to a section, domain, or skill.
export function scopeItems(items, test, scope = {}) {
  return items.filter(
    (item) =>
      item.tests.includes(test.id) &&
      (!scope.section || item.sectionId === scope.section) &&
      (!scope.domain || item.domainId === scope.domain) &&
      (!scope.skill || item.skillId === scope.skill),
  );
}

// Describe a scope in words, using the test's own domain titles.
export function scopeLabel(test, scope = {}) {
  for (const section of test.sections) {
    if (scope.section === section.id && !scope.domain && !scope.skill)
      return section.title;
    for (const domain of section.domains) {
      if (scope.domain === domain.id) return domain.title;
      const skill = domain.skills.find((entry) => entry.id === scope.skill);
      if (skill) return skill.title;
    }
  }
  return "All practice";
}

function shuffled(list, random) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2 };

// One module: the blueprint's count from each domain, drawn at random, then
// grouped by domain in blueprint order. Math runs from easier to harder within
// the module. Returns null when a domain lacks enough items.
export function drawModule(items, test, sectionId, random = Math.random) {
  const section = test.sections.find((entry) => entry.id === sectionId);
  if (!section) return null;
  const chosen = [];
  for (const [domainId, needed] of Object.entries(section.moduleDomains)) {
    const pool = scopeItems(items, test, { section: sectionId, domain: domainId });
    if (pool.length < needed) return null;
    chosen.push(...shuffled(pool, random).slice(0, needed));
  }
  if (sectionId === "math")
    chosen.sort(
      (left, right) =>
        DIFFICULTY_ORDER[left.difficulty] - DIFFICULTY_ORDER[right.difficulty],
    );
  else {
    // Reading and Writing groups questions of the same skill together, in the
    // taxonomy's order within each domain.
    const order = new Map(
      section.domains
        .flatMap((domain) => domain.skills)
        .map((skill, index) => [skill.id, index]),
    );
    const domainOrder = Object.keys(section.moduleDomains);
    chosen.sort(
      (left, right) =>
        domainOrder.indexOf(left.domainId) - domainOrder.indexOf(right.domainId) ||
        order.get(left.skillId) - order.get(right.skillId),
    );
  }
  return chosen.map((item) => item.id);
}

// Correct counts overall, by domain, and by skill, in the test's own order.
export function summarize(test, items, responses) {
  const results = items.map((item) => ({
    item,
    correct: checkResponse(item, responses[item.id]).correct === true,
    answered: String(responses[item.id] ?? "").trim() !== "",
  }));
  const group = (key, entries) =>
    entries
      .map((entry) => {
        const matching = results.filter((result) => result.item[key] === entry.id);
        return {
          id: entry.id,
          title: entry.title,
          total: matching.length,
          correct: matching.filter((result) => result.correct).length,
        };
      })
      .filter((entry) => entry.total > 0);
  const domains = test.sections.flatMap((section) => section.domains);
  return {
    total: results.length,
    correct: results.filter((result) => result.correct).length,
    answered: results.filter((result) => result.answered).length,
    results,
    byDomain: group("domainId", domains),
    bySkill: group(
      "skillId",
      domains.flatMap((domain) => domain.skills),
    ),
  };
}

// A deliberately rough section estimate. Official scoring uses two adaptive
// modules and question difficulty; this uses only the share correct on one
// module, so it reports a band, never one exact number.
export const ESTIMATE_BAND_SHARE = 0.07;

export function sectionEstimate(test, correct, total) {
  const { min, max } = test.scale.section;
  const span = max - min;
  const round = (value) => Math.round(value / 10) * 10;
  const point = round(min + span * (total ? correct / total : 0));
  const band = round(span * ESTIMATE_BAND_SHARE);
  return {
    low: Math.max(min, point - band),
    high: Math.min(max, point + band),
    min,
    max,
    label: PRACTICE_ESTIMATE_LABEL,
  };
}

export function formatClock(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

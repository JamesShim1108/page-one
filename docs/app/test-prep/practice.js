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

// Difficulty mixes. "mixed" is a first module: a spread of easy, medium, and
// hard. "harder" and "easier" are second modules after an adaptive route.
const MIXES = {
  mixed: { easy: 1, medium: 1, hard: 1 },
  harder: { easy: 0.15, medium: 0.4, hard: 0.45 },
  easier: { easy: 0.45, medium: 0.4, hard: 0.15 },
};

// Take `needed` items from a shuffled pool, filling each difficulty's share
// first and topping up from whatever remains.
function pickByMix(pool, needed, mix) {
  const total = Object.values(mix).reduce((sum, value) => sum + value, 0);
  const picked = [];
  const left = [...pool];
  for (const level of ["hard", "medium", "easy"]) {
    const want = Math.round((needed * mix[level]) / total);
    for (let index = 0; index < left.length && picked.length < needed;) {
      if (
        left[index].difficulty === level &&
        picked.filter((item) => item.difficulty === level).length < want
      )
        picked.push(...left.splice(index, 1));
      else index += 1;
    }
  }
  while (picked.length < needed && left.length) picked.push(left.shift());
  return picked;
}

// Official order inside a module. Reading and Writing groups questions by
// skill, easier to harder in each group; Math runs easier to harder overall.
export function orderModule(items, section) {
  const sorted = [...items];
  if (section.id === "math")
    sorted.sort(
      (left, right) =>
        DIFFICULTY_ORDER[left.difficulty] - DIFFICULTY_ORDER[right.difficulty],
    );
  else {
    const order = section.moduleOrder || [];
    sorted.sort(
      (left, right) =>
        order.indexOf(left.skillId) - order.indexOf(right.skillId) ||
        DIFFICULTY_ORDER[left.difficulty] - DIFFICULTY_ORDER[right.difficulty],
    );
  }
  return sorted;
}

// One module: the blueprint's count from each domain, drawn at random with the
// requested difficulty mix, then put in official order. `exclude` keeps a
// full-length test from repeating questions. Returns null when a domain lacks
// enough items.
export function drawModule(
  items,
  test,
  sectionId,
  random = Math.random,
  { moduleIndex = 0, mix = "mixed", exclude = [] } = {},
) {
  const section = test.sections.find((entry) => entry.id === sectionId);
  if (!section) return null;
  const blueprint = section.moduleDomains[moduleIndex];
  const skip = new Set(exclude);
  const chosen = [];
  for (const [domainId, needed] of Object.entries(blueprint)) {
    const pool = scopeItems(items, test, { section: sectionId, domain: domainId }).filter(
      (item) => !skip.has(item.id),
    );
    if (pool.length < needed) return null;
    chosen.push(...pickByMix(shuffled(pool, random), needed, MIXES[mix]));
  }
  return orderModule(chosen, section).map((item) => item.id);
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

// Adaptive routing after a first module. On the real test the routing rule is
// not published; this uses a fixed share correct.
export const ROUTE_THRESHOLD = 0.6;

export function routeAfter(correct, total) {
  return total && correct / total >= ROUTE_THRESHOLD ? "harder" : "easier";
}

// A full section's rough estimate. Each module counts half. The easier second
// module is worth at most 80% of the harder one, so a student routed there
// cannot reach the top of the scale, as on an adaptive test. The band is
// narrower than for one module because there are twice as many questions.
export const FULL_BAND_SHARE = 0.05;
export const EASIER_ROUTE_CREDIT = 0.8;

export function fullSectionEstimate(test, first, second, route) {
  const { min, max } = test.scale.section;
  const span = max - min;
  const round = (value) => Math.round(value / 10) * 10;
  const share = (part) => (part.total ? part.correct / part.total : 0);
  const credit = route === "harder" ? 1 : EASIER_ROUTE_CREDIT;
  const fraction = 0.5 * share(first) + 0.5 * share(second) * credit;
  const point = round(min + span * fraction);
  const band = round(span * FULL_BAND_SHARE);
  return {
    low: Math.max(min, point - band),
    high: Math.min(max, point + band),
    point,
    min,
    max,
    label: PRACTICE_ESTIMATE_LABEL,
  };
}

// The total band adds the two section bands, on the same test's total scale.
export function totalEstimate(test, sections) {
  const sum = (key) => sections.reduce((total, section) => total + section[key], 0);
  return {
    low: Math.max(test.scale.total.min, sum("low")),
    high: Math.min(test.scale.total.max, sum("high")),
    min: test.scale.total.min,
    max: test.scale.total.max,
    label: PRACTICE_ESTIMATE_LABEL,
  };
}

export function formatClock(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

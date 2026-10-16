// Pure PSAT/SAT item rules. No DOM access, so the build validator, Node tests,
// and the browser all share one definition of a valid grid-in entry and a
// correct response.

export const ITEM_FORMATS = Object.freeze(["single-select", "grid-in"]);
export const CHOICE_IDS = Object.freeze(["A", "B", "C", "D"]);

// Bluebook entry rules for student-produced responses (grid-ins): up to five
// characters for a positive answer, six for a negative answer including the
// sign. No mixed numbers, percent signs, commas, or dollar signs.
export const GRID_IN = Object.freeze({
  maxPositiveLength: 5,
  maxNegativeLength: 6,
});

export const PRACTICE_ESTIMATE_LABEL = "Practice estimate";
export const NOT_AFFILIATED =
  "Page One is not affiliated with or endorsed by the College Board. Practice items are original, and scores are practice estimates, not official scores.";

const GRID_IN_PATTERN = /^-?(\d+|\d*\.\d+|\d+\/\d+)$/;

// Leading and trailing spaces are ignored. Spaces inside an entry are reported,
// because "3 1/2" is a mixed number, not 31/2.
export function normalizeGridIn(raw) {
  return String(raw ?? "").trim();
}

// Returns null for a well-formed entry, or a message a student can act on.
// Correctness is a separate check: a well-formed entry can still be wrong.
export function gridInEntryProblem(raw) {
  const entry = normalizeGridIn(raw);
  if (!entry) return "Enter an answer.";
  if (/[%$,]/.test(entry))
    return "Leave out percent signs, dollar signs, and commas. Enter the number only.";
  if (/^-?\d+\s+\d+\/\d+$/.test(entry))
    return "Mixed numbers are not accepted. Enter an improper fraction, such as 7/2, or a decimal, such as 3.5.";
  if (/\s/.test(entry)) return "Remove the spaces inside your answer.";
  if (!GRID_IN_PATTERN.test(entry))
    return "Use digits with at most one decimal point or one fraction bar, and a leading minus sign for a negative answer.";
  if (/\/0+$/.test(entry)) return "A fraction cannot have a denominator of 0.";
  const limit = entry.startsWith("-")
    ? GRID_IN.maxNegativeLength
    : GRID_IN.maxPositiveLength;
  if (entry.length > limit)
    return entry.startsWith("-")
      ? `Negative answers can use up to ${GRID_IN.maxNegativeLength} characters, including the minus sign.`
      : `Positive answers can use up to ${GRID_IN.maxPositiveLength} characters. If a decimal does not fit, round or truncate it.`;
  return null;
}

// A response is a choice ID for single-select items and the raw text for grid-ins.
export function checkResponse(item, response) {
  if (item.format === "grid-in") {
    const problem = gridInEntryProblem(response);
    if (problem) return { answered: false, correct: false, problem };
    const entry = normalizeGridIn(response);
    return { answered: true, correct: item.acceptedAnswers.includes(entry), entry };
  }
  if (!CHOICE_IDS.includes(response)) return { answered: false, correct: false };
  return { answered: true, correct: response === item.answer, entry: response };
}

// Score scales by family. Families never compare: a PSAT 8/9 estimate is not
// shown as equal to a PSAT 10, PSAT/NMSQT, or SAT score.
export function scaleLabel(test) {
  const { total, section } = test.scale;
  return {
    total: `${total.min}–${total.max}`,
    section: `${section.min}–${section.max}`,
  };
}

export function sameScaleFamily(left, right) {
  return Boolean(left?.scale?.family) && left.scale.family === right?.scale?.family;
}

export function estimateLabel(test, value) {
  return `${PRACTICE_ESTIMATE_LABEL}: ${value} on the ${test.title} scale (${scaleLabel(test).total})`;
}

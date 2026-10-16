// The four SAT Suite tests Page One prepares students for. Structure only: the
// counts, times, and scales below describe the official digital format so
// practice can match it. Page One is not affiliated with the College Board.
//
// `scale.family` keeps score scales apart. PSAT 8/9 has its own family and its
// estimates are never displayed as equal to a PSAT 10, PSAT/NMSQT, or SAT score.

const digitalSections = (mathMinutes) => [
  {
    id: "rw",
    questions: 54,
    minutes: 64,
    modules: 2,
  },
  {
    id: "math",
    questions: 44,
    minutes: mathMinutes,
    modules: 2,
  },
];

export const tests = [
  {
    schemaVersion: 1,
    id: "psat89",
    order: 1,
    title: "PSAT 8/9",
    shortTitle: "PSAT 8/9",
    audience: "Grades 8 and 9",
    description:
      "The first test in the suite. Its own score scale shows where a student is now and which skills to build next.",
    scale: {
      family: "psat89",
      total: { min: 240, max: 1440 },
      section: { min: 120, max: 720 },
    },
    sections: digitalSections(70),
    sourceIds: ["cb-psat89-guide", "cb-math-alignment-psat"],
  },
  {
    schemaVersion: 1,
    id: "psat10",
    order: 2,
    title: "PSAT 10",
    shortTitle: "PSAT 10",
    audience: "Grade 10, usually in spring",
    description:
      "Same content and format as the PSAT/NMSQT, given in spring. Scores do not enter the National Merit program.",
    scale: {
      family: "psat",
      total: { min: 320, max: 1520 },
      section: { min: 160, max: 760 },
    },
    sections: digitalSections(70),
    sourceIds: ["cb-math-alignment-psat", "cb-test-directions"],
  },
  {
    schemaVersion: 1,
    id: "psatnmsqt",
    order: 3,
    title: "PSAT/NMSQT",
    shortTitle: "PSAT/NMSQT",
    audience: "Grades 10 and 11, in fall",
    description:
      "The fall PSAT. Grade 11 scores are used to screen entry to the National Merit Scholarship Program.",
    scale: {
      family: "psat",
      total: { min: 320, max: 1520 },
      section: { min: 160, max: 760 },
    },
    sections: digitalSections(70),
    sourceIds: ["cb-math-alignment-psat", "cb-test-directions"],
  },
  {
    schemaVersion: 1,
    id: "sat",
    order: 4,
    title: "SAT",
    shortTitle: "SAT",
    audience: "Grades 11 and 12",
    description:
      "The college admission test. Adds circles to the math content covered by the PSAT tests.",
    scale: {
      family: "sat",
      total: { min: 400, max: 1600 },
      section: { min: 200, max: 800 },
    },
    sections: digitalSections(70),
    sourceIds: ["cb-math-alignment-sat", "cb-test-directions"],
  },
];

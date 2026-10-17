// The four SAT Suite tests Page One prepares students for. Structure only: the
// counts, times, and scales below describe the official digital format so
// practice can match it. Page One is not affiliated with the College Board.
//
// `scale.family` keeps score scales apart. PSAT 8/9 has its own family and its
// estimates are never displayed as equal to a PSAT 10, PSAT/NMSQT, or SAT score.

// Domain counts for each of a section's two modules, close to the official
// share of questions per domain for each test (pretest questions included).
// Reading and Writing is the same on every test: per section, Craft and
// Structure 15, Information and Ideas 14, Conventions 14, Expression of Ideas 11.
const rwModules = [
  {
    "rw-craft-structure": 8,
    "rw-information-ideas": 7,
    "rw-conventions": 7,
    "rw-expression-ideas": 5,
  },
  {
    "rw-craft-structure": 7,
    "rw-information-ideas": 7,
    "rw-conventions": 7,
    "rw-expression-ideas": 6,
  },
];
const mathModules = {
  // About 42.5% Algebra, 20% Advanced Math, 25% Problem-Solving, 12.5% Geometry.
  psat89: [
    {
      "math-algebra": 9,
      "math-advanced": 4,
      "math-data-analysis": 6,
      "math-geometry-trig": 3,
    },
    {
      "math-algebra": 9,
      "math-advanced": 5,
      "math-data-analysis": 5,
      "math-geometry-trig": 3,
    },
  ],
  // About 35%, 32.5%, 20%, and 12.5%.
  psat: [
    {
      "math-algebra": 8,
      "math-advanced": 7,
      "math-data-analysis": 4,
      "math-geometry-trig": 3,
    },
    {
      "math-algebra": 7,
      "math-advanced": 7,
      "math-data-analysis": 5,
      "math-geometry-trig": 3,
    },
  ],
  // About 35%, 35%, 15%, and 15%.
  sat: [
    {
      "math-algebra": 8,
      "math-advanced": 7,
      "math-data-analysis": 3,
      "math-geometry-trig": 4,
    },
    {
      "math-algebra": 7,
      "math-advanced": 8,
      "math-data-analysis": 4,
      "math-geometry-trig": 3,
    },
  ],
};

const digitalSections = (mathMinutes, mathModule) => [
  {
    id: "rw",
    questions: 54,
    minutes: 64,
    modules: 2,
    moduleDomains: rwModules,
  },
  {
    id: "math",
    questions: 44,
    minutes: mathMinutes,
    modules: 2,
    moduleDomains: mathModule,
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
    sections: digitalSections(70, mathModules.psat89),
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
    sections: digitalSections(70, mathModules.psat),
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
    sections: digitalSections(70, mathModules.psat),
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
    sections: digitalSections(70, mathModules.sat),
    sourceIds: ["cb-math-alignment-sat", "cb-test-directions"],
  },
];

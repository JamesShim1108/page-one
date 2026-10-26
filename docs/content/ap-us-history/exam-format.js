// The structure every AP U.S. History mock exam follows, from the Course and
// Exam Description effective fall 2026 (the May 2027 exam onward): sections,
// timing, question counts, score weights, and the stimulus and period rules for
// each question. Mock exams in ./exams/ fill these slots with existing
// questions and writing prompts; the build rejects an exam that does not match.
// Unit Practice Tests follow the multiple-choice `sets` rule too. Check this
// file against the College Board's exam description each year.

export const examFormat = {
  schemaVersion: 1,
  id: "ap-us-history-2027",
  title: "AP U.S. History exam",
  note: "Timing, question counts, weights, and stimulus rules follow the College Board's published exam format, starting with the May 2027 exam. Page One mock exams are practice; scores are estimates, not AP scores.",
  sourceIds: ["ced", "exam"],
  // At least one set of paired text stimuli appears in the multiple-choice
  // section or in a short-answer question.
  pairedTextSet: true,
  sections: [
    {
      id: "mcq",
      kind: "mcq",
      part: "Section I, Part A",
      title: "Multiple choice",
      minutes: 55,
      questionCount: 55,
      weight: 40,
      instructions:
        "Answer every question. Questions come in sets of three or four based on one or more sources: passages, images, maps, or data. You can move between questions and flag them for review until time runs out or you submit this part.",
      // Sets of three to four questions; stimuli can be passages, images
      // (artwork, photographs, posters, cartoons, maps), or quantitative data.
      sets: { min: 3, max: 4, media: ["text", "image", "table"] },
      // Exam weighting by unit. Percentages round outward to whole questions.
      unitWeights: [
        { units: [1], min: 4, max: 6 },
        { units: [2], min: 6, max: 8 },
        { units: [3], min: 10, max: 17 },
        { units: [4], min: 10, max: 17 },
        { units: [5], min: 10, max: 17 },
        { units: [6], min: 10, max: 17 },
        { units: [7], min: 10, max: 17 },
        { units: [8], min: 10, max: 17 },
        { units: [9], min: 4, max: 6 },
      ],
    },
    {
      id: "saq",
      kind: "saq",
      part: "Section I, Part B",
      title: "Short answer",
      minutes: 40,
      weight: 20,
      instructions:
        "Answer all three questions. Each question has three parts, and each part is worth one point. Each question focuses on a different historical period.",
      // The three questions cover 1491-2001 and each focuses on a different period.
      distinctUnits: true,
      prompts: [
        { id: "q1", label: "Question 1", stimulus: "secondary-text", options: 1 },
        { id: "q2", label: "Question 2", stimulus: "primary-text", options: 1 },
        { id: "q3", label: "Question 3", stimulus: "non-text", options: 1 },
      ],
      breakAfterMinutes: 10,
    },
    {
      id: "dbq",
      kind: "dbq",
      part: "Section II",
      title: "Document-based question",
      minutes: 60,
      readingMinutes: 15,
      weight: 25,
      instructions:
        "The first 15 minutes are a suggested reading period for the seven documents. Then write an essay that uses at least four documents as evidence.",
      // The DBQ topic falls between 1754 and 1980: Units 3 through 8.
      prompts: [{ id: "q1", label: "Question 1", options: 1, units: [3, 8] }],
    },
    {
      id: "leq",
      kind: "leq",
      part: "Section II",
      title: "Long essay",
      minutes: 40,
      weight: 15,
      instructions:
        "Answer the long essay question. The prompt covers a long span of time; you may focus on one or more developments it names and do not need to address the entire period.",
      // One required prompt covering about half of the course's chronology. The
      // CED's sample (1776-1876) spans Units 3-5, so a prompt spans 3+ units.
      prompts: [{ id: "q2", label: "Question 2", options: 1, minUnitSpan: 3 }],
    },
  ],
};

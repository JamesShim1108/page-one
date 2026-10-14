// The structure every World History mock exam follows: sections, timing,
// question counts, and score weights. Mock exams in ./exams/ fill these slots
// with existing questions and writing prompts; the build rejects an exam that
// does not match. Check this file against the College Board's exam description
// each year and update it when the exam changes.

export const examFormat = {
  schemaVersion: 1,
  id: "ap-world-modern",
  title: "AP World History: Modern exam",
  note: "Timing, question counts, and weights follow the College Board's published exam format. Page One mock exams are practice; scores are estimates, not AP scores.",
  sourceIds: ["ced", "exam"],
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
        "Answer every question. Questions come in sets based on a source. You can move between questions and flag them for review until time runs out or you submit this part.",
    },
    {
      id: "saq",
      kind: "saq",
      part: "Section I, Part B",
      title: "Short answer",
      minutes: 40,
      weight: 20,
      instructions:
        "Answer Questions 1 and 2, then answer either Question 3 or Question 4. Each part of a question is worth one point.",
      prompts: [
        { id: "q1", label: "Question 1", stimulus: "secondary", options: 1 },
        { id: "q2", label: "Question 2", stimulus: "primary", options: 1 },
        { id: "q3", label: "Question 3 or 4", stimulus: "none", options: 2, choose: 1 },
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
        "The first 15 minutes are a suggested reading period for the documents. Then write an essay that uses at least four documents as evidence.",
      prompts: [{ id: "q1", label: "Question 1", options: 1 }],
    },
    {
      id: "leq",
      kind: "leq",
      part: "Section II",
      title: "Long essay",
      minutes: 40,
      weight: 15,
      instructions: "Choose one of the three questions and write an essay.",
      prompts: [{ id: "q2", label: "Question 2, 3, or 4", options: 3, choose: 1 }],
    },
  ],
};

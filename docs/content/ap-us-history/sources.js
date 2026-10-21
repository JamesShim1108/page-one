// Reusable source records. Lessons, questions, and writing prompts refer to
// these IDs instead of copying URLs. Course content is built from the CED and
// College Board materials first, then Khan Academy, The Princeton Review,
// Fiveable, and Albert. Add a record here when content first cites it.

export const sources = [
  {
    id: "ced",
    label:
      "College Board: AP U.S. History Course and Exam Description (effective fall 2026)",
    url: "https://apcentral.collegeboard.org/media/pdf/ap-us-history-course-and-exam-description.pdf",
    note: "Course framework, learning objectives, key concepts, exam format, and scoring rubrics. Recorded for checking in ced.js, skills.js, framework.js, and exam-format.js.",
  },
  {
    id: "ced-clarifications",
    label:
      "College Board: AP U.S. History Course and Exam Description clarifications (effective fall 2026)",
    url: "https://apcentral.collegeboard.org/media/pdf/ap-us-history-course-and-exam-description-clarifications-effective-fall-2026.pdf",
    note: "Corrects Key Concept 2.1.II.D (cash crops) and confirms the May 2027 short-answer and long essay format.",
  },
  {
    id: "exam",
    label: "College Board: AP history exam updates for 2027",
    url: "https://apcentral.collegeboard.org/courses/ap-history-exam-updates",
    note: "Three required short-answer questions with sources and one required long essay question, starting with the May 2027 exam.",
  },
  {
    id: "exam-page",
    label: "College Board: AP United States History exam (AP Central)",
    url: "https://apcentral.collegeboard.org/courses/ap-united-states-history/exam",
    note: "Released free-response questions and scoring guidelines.",
  },
];

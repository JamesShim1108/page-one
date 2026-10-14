// Mock Exam 2. Selects questions and prompts written for this exam.
export const exam = {
  schemaVersion: 1,
  id: "world-mock-02",
  courseId: "world",
  title: "Mock Exam 2",
  status: "ready",
  description:
    "A full-length practice exam covering Units 1-9, with new questions and prompts written for this exam: 55 multiple-choice questions, three short-answer questions, a document-based question on new ideas in the age of revolution and industry, and an essay choice on comparison.",
  sections: {
    mcq: {
      selections: [
        {
          topicId: "world-1-4",
          questionIds: [
            "world-1-4-m2-01a",
            "world-1-4-m2-01b",
            "world-1-4-m2-01c",
            "world-1-4-m2-01d",
          ],
        },
        {
          topicId: "world-2-2",
          questionIds: [
            "world-2-2-m2-02a",
            "world-2-2-m2-02b",
            "world-2-2-m2-02c",
            "world-2-2-m2-02d",
          ],
        },
        {
          topicId: "world-2-4",
          questionIds: ["world-2-4-m2-03a", "world-2-4-m2-03b", "world-2-4-m2-03c"],
        },
        {
          topicId: "world-3-1",
          questionIds: ["world-3-1-m2-04a", "world-3-1-m2-04b", "world-3-1-m2-04c"],
        },
        {
          topicId: "world-3-3",
          questionIds: ["world-3-3-m2-05a", "world-3-3-m2-05b", "world-3-3-m2-05c"],
        },
        {
          topicId: "world-4-5",
          questionIds: [
            "world-4-5-m2-06a",
            "world-4-5-m2-06b",
            "world-4-5-m2-06c",
            "world-4-5-m2-06d",
          ],
        },
        {
          topicId: "world-4-7",
          questionIds: ["world-4-7-m2-07a", "world-4-7-m2-07b", "world-4-7-m2-07c"],
        },
        {
          topicId: "world-5-2",
          questionIds: [
            "world-5-2-m2-08a",
            "world-5-2-m2-08b",
            "world-5-2-m2-08c",
            "world-5-2-m2-08d",
          ],
        },
        {
          topicId: "world-5-5",
          questionIds: ["world-5-5-m2-09a", "world-5-5-m2-09b", "world-5-5-m2-09c"],
        },
        {
          topicId: "world-6-5",
          questionIds: [
            "world-6-5-m2-10a",
            "world-6-5-m2-10b",
            "world-6-5-m2-10c",
            "world-6-5-m2-10d",
          ],
        },
        {
          topicId: "world-6-7",
          questionIds: ["world-6-7-m2-11a", "world-6-7-m2-11b", "world-6-7-m2-11c"],
        },
        {
          topicId: "world-7-1",
          questionIds: [
            "world-7-1-m2-12a",
            "world-7-1-m2-12b",
            "world-7-1-m2-12c",
            "world-7-1-m2-12d",
          ],
        },
        {
          topicId: "world-7-2",
          questionIds: ["world-7-2-m2-13a", "world-7-2-m2-13b", "world-7-2-m2-13c"],
        },
        {
          topicId: "world-8-2",
          questionIds: ["world-8-2-m2-14a", "world-8-2-m2-14b", "world-8-2-m2-14c"],
        },
        {
          topicId: "world-8-8",
          questionIds: ["world-8-8-m2-15a", "world-8-8-m2-15b", "world-8-8-m2-15c"],
        },
        {
          topicId: "world-9-3",
          questionIds: [
            "world-9-3-m2-16a",
            "world-9-3-m2-16b",
            "world-9-3-m2-16c",
            "world-9-3-m2-16d",
          ],
        },
      ],
    },
    saq: {
      q1: ["world-2-saq-08"],
      q2: ["world-9-saq-02"],
      q3: ["world-3-saq-03", "world-7-saq-02"],
    },
    dbq: { q1: ["world-6-dbq-ideas"] },
    leq: {
      q2: ["world-3-leq-comparison", "world-5-leq-comparison", "world-7-leq-comparison"],
    },
  },
};

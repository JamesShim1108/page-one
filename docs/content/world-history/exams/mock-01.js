// Mock Exam 1. Selects questions and prompts written for this exam.
export const exam = {
  schemaVersion: 1,
  id: "world-mock-01",
  courseId: "world",
  title: "Mock Exam 1",
  status: "ready",
  description:
    "A full-length practice exam covering Units 1-9, with new questions and prompts written for this exam: 55 multiple-choice questions, three short-answer questions, a document-based question on cities and exchange, and an essay choice on causation.",
  sections: {
    mcq: {
      selections: [
        {
          topicId: "world-1-6",
          questionIds: [
            "world-1-6-m1-01a",
            "world-1-6-m1-01b",
            "world-1-6-m1-01c",
            "world-1-6-m1-01d",
          ],
        },
        {
          topicId: "world-2-1",
          questionIds: [
            "world-2-1-m1-02a",
            "world-2-1-m1-02b",
            "world-2-1-m1-02c",
            "world-2-1-m1-02d",
          ],
        },
        {
          topicId: "world-2-3",
          questionIds: ["world-2-3-m1-03a", "world-2-3-m1-03b", "world-2-3-m1-03c"],
        },
        {
          topicId: "world-3-2",
          questionIds: ["world-3-2-m1-04a", "world-3-2-m1-04b", "world-3-2-m1-04c"],
        },
        {
          topicId: "world-3-3",
          questionIds: ["world-3-3-m1-05a", "world-3-3-m1-05b", "world-3-3-m1-05c"],
        },
        {
          topicId: "world-4-3",
          questionIds: [
            "world-4-3-m1-06a",
            "world-4-3-m1-06b",
            "world-4-3-m1-06c",
            "world-4-3-m1-06d",
          ],
        },
        {
          topicId: "world-4-4",
          questionIds: ["world-4-4-m1-07a", "world-4-4-m1-07b", "world-4-4-m1-07c"],
        },
        {
          topicId: "world-5-1",
          questionIds: [
            "world-5-1-m1-08a",
            "world-5-1-m1-08b",
            "world-5-1-m1-08c",
            "world-5-1-m1-08d",
          ],
        },
        {
          topicId: "world-5-8",
          questionIds: ["world-5-8-m1-09a", "world-5-8-m1-09b", "world-5-8-m1-09c"],
        },
        {
          topicId: "world-6-1",
          questionIds: [
            "world-6-1-m1-10a",
            "world-6-1-m1-10b",
            "world-6-1-m1-10c",
            "world-6-1-m1-10d",
          ],
        },
        {
          topicId: "world-6-4",
          questionIds: [
            "world-6-4-m1-11a",
            "world-6-4-m1-11b",
            "world-6-4-m1-11c",
            "world-6-4-m1-11d",
          ],
        },
        {
          topicId: "world-7-5",
          questionIds: ["world-7-5-m1-12a", "world-7-5-m1-12b", "world-7-5-m1-12c"],
        },
        {
          topicId: "world-7-7",
          questionIds: ["world-7-7-m1-13a", "world-7-7-m1-13b", "world-7-7-m1-13c"],
        },
        {
          topicId: "world-8-5",
          questionIds: ["world-8-5-m1-14a", "world-8-5-m1-14b", "world-8-5-m1-14c"],
        },
        {
          topicId: "world-8-2",
          questionIds: ["world-8-2-m1-15a", "world-8-2-m1-15b", "world-8-2-m1-15c"],
        },
        {
          topicId: "world-9-4",
          questionIds: [
            "world-9-4-m1-16a",
            "world-9-4-m1-16b",
            "world-9-4-m1-16c",
            "world-9-4-m1-16d",
          ],
        },
      ],
    },
    saq: {
      q1: ["world-4-saq-02"],
      q2: ["world-3-saq-02"],
      q3: ["world-4-saq-03", "world-5-saq-02"],
    },
    dbq: { q1: ["world-2-dbq-authority"] },
    leq: {
      q2: ["world-4-leq-causation", "world-6-leq-causation", "world-8-leq-causation"],
    },
  },
};

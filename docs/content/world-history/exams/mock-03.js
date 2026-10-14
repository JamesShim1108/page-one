// Mock Exam 3. Selects questions and prompts written for this exam.
export const exam = {
  schemaVersion: 1,
  id: "world-mock-03",
  courseId: "world",
  title: "Mock Exam 3",
  status: "ready",
  description:
    "A full-length practice exam covering Units 1-9, with new questions and prompts written for this exam: 55 multiple-choice questions, three short-answer questions, a document-based question on the role of government, and an essay choice on continuity and change.",
  sections: {
    mcq: {
      selections: [
        {
          topicId: "world-1-1",
          questionIds: [
            "world-1-1-m3-01a",
            "world-1-1-m3-01b",
            "world-1-1-m3-01c",
            "world-1-1-m3-01d",
          ],
        },
        {
          topicId: "world-2-2",
          questionIds: [
            "world-2-2-m3-02a",
            "world-2-2-m3-02b",
            "world-2-2-m3-02c",
            "world-2-2-m3-02d",
          ],
        },
        {
          topicId: "world-2-6",
          questionIds: ["world-2-6-m3-03a", "world-2-6-m3-03b", "world-2-6-m3-03c"],
        },
        {
          topicId: "world-3-1",
          questionIds: ["world-3-1-m3-04a", "world-3-1-m3-04b", "world-3-1-m3-04c"],
        },
        {
          topicId: "world-3-2",
          questionIds: ["world-3-2-m3-05a", "world-3-2-m3-05b", "world-3-2-m3-05c"],
        },
        {
          topicId: "world-4-4",
          questionIds: [
            "world-4-4-m3-06a",
            "world-4-4-m3-06b",
            "world-4-4-m3-06c",
            "world-4-4-m3-06d",
          ],
        },
        {
          topicId: "world-4-6",
          questionIds: ["world-4-6-m3-07a", "world-4-6-m3-07b", "world-4-6-m3-07c"],
        },
        {
          topicId: "world-5-1",
          questionIds: [
            "world-5-1-m3-08a",
            "world-5-1-m3-08b",
            "world-5-1-m3-08c",
            "world-5-1-m3-08d",
          ],
        },
        {
          topicId: "world-5-3",
          questionIds: [
            "world-5-3-m3-09a",
            "world-5-3-m3-09b",
            "world-5-3-m3-09c",
            "world-5-3-m3-09d",
          ],
        },
        {
          topicId: "world-6-3",
          questionIds: [
            "world-6-3-m3-10a",
            "world-6-3-m3-10b",
            "world-6-3-m3-10c",
            "world-6-3-m3-10d",
          ],
        },
        {
          topicId: "world-6-4",
          questionIds: ["world-6-4-m3-11a", "world-6-4-m3-11b", "world-6-4-m3-11c"],
        },
        {
          topicId: "world-7-8",
          questionIds: ["world-7-8-m3-12a", "world-7-8-m3-12b", "world-7-8-m3-12c"],
        },
        {
          topicId: "world-7-3",
          questionIds: ["world-7-3-m3-13a", "world-7-3-m3-13b", "world-7-3-m3-13c"],
        },
        {
          topicId: "world-8-3",
          questionIds: ["world-8-3-m3-14a", "world-8-3-m3-14b", "world-8-3-m3-14c"],
        },
        {
          topicId: "world-8-7",
          questionIds: ["world-8-7-m3-15a", "world-8-7-m3-15b", "world-8-7-m3-15c"],
        },
        {
          topicId: "world-9-7",
          questionIds: [
            "world-9-7-m3-16a",
            "world-9-7-m3-16b",
            "world-9-7-m3-16c",
            "world-9-7-m3-16d",
          ],
        },
      ],
    },
    saq: {
      q1: ["world-7-saq-03"],
      q2: ["world-4-saq-04"],
      q3: ["world-1-saq-03", "world-8-saq-02"],
    },
    dbq: { q1: ["world-9-dbq-government"] },
    leq: {
      q2: ["world-4-leq-continuity", "world-5-leq-continuity", "world-9-leq-continuity"],
    },
  },
};

// Copy to docs/content/<course>/exams/<name>.js. A mock exam only selects
// questions and writing prompts that already exist; it never contains its own.
// The build checks every slot against the course's exam-format.js.
export const exam = {
  schemaVersion: 1,
  id: "world-mock-01", // Permanent. Starts with the course ID.
  courseId: "world",
  title: "Mock Exam 1",
  // "soon" lists the exam on the course page without making it available.
  // Remove the sections below while it is "soon".
  status: "ready",
  description: "A full-length practice exam covering Units 1-9.",
  sections: {
    // Exactly the format's questionCount (55). Sets of two to four questions on
    // one source, kept together, with the same rules as unit Practice Tests.
    mcq: {
      selections: [
        { topicId: "world-1-1", questionIds: ["world-1-1-t01", "world-1-1-t02"] },
      ],
    },
    // One writing ID per option. A "choose 1 of 2" slot lists two IDs.
    saq: {
      q1: ["world-x-saq-secondary"], // Secondary or Page One practice passage stimulus.
      q2: ["world-x-saq-primary"], // Primary-source stimulus.
      q3: ["world-x-saq-no-stimulus-a", "world-x-saq-no-stimulus-b"], // No stimulus.
    },
    dbq: { q1: ["world-x-dbq"] }, // Must have availability: "available".
    leq: { q2: ["world-x-leq-a", "world-x-leq-b", "world-x-leq-c"] },
  },
};

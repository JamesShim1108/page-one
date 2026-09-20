// Copy into docs/content/<course>/glossary/<group>.js and replace the examples.
// Course IDs, topic IDs, and source IDs must already exist in that course.
export const glossary = {
  schemaVersion: 1,
  courseId: "yourcourse",
  entries: [
    {
      id: "yourcourse-concept-name",
      term: "Concept name",
      definition: "Write the approved explanation once, here.",
      aliases: ["Concept names"],
      sourceLabel: "Class notes",
      sourceIds: ["class-notes"],
      sourceLocators: [{ sourceId: "class-notes", locator: "Page or section" }],
      verificationNote: "Record what was checked and any qualification applied.",
      topicIds: ["yourcourse-1-1"],
    },
  ],
};

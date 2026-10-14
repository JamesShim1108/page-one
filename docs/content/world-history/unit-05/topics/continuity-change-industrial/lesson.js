// Original Page One lesson for CED Topic 5.10. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-05.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-10",
  unitId: "world-5",
  courseId: "world",
  code: "5.10",
  title: "Continuity and Change in the Industrial Age",
  period: "c. 1750–1900",
  status: "ready",
  order: 10,
  summary:
    "What changed and what continued as revolutions and industrialization transformed the world from 1750 to 1900.",
  minutes: 7,
  learningGoals: [
    "Explain the extent to which industrialization brought change from 1750 to 1900.",
    "Support a claim about continuity and change with specific evidence.",
  ],
  bigIdea:
    "Revolutions and industrialization brought rapid change, yet agriculture, monarchy, and many inequalities continued.",
  context: "Continuity and change is an AP reasoning process. Strong answers weigh both.",
  sections: [
    {
      id: "industrial-change",
      title: "Weighing change and continuity",
      conceptTitle: "Weighing change and continuity",
      lenses: ["E", "P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Ideas of natural rights and nationalism spread, new nations formed, and machines and fossil fuels transformed production. Global trade grew and connected regions more tightly.",
        },
        {
          type: "paragraph",
          text: "Yet most people still farmed, many states remained monarchies, and industrial wealth was concentrated in a few countries. Women, colonized peoples, and many workers remained excluded from political rights.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Do not overstate change. A strong answer names what stayed the same as well as what changed.",
        },
      ],
      takeaway: "The period combined dramatic change with deep continuities.",
      sourceIds: ["ced-topic-5-10"],
    },
  ],
  vocabulary: [
    {
      id: "fossil-fuels",
      topicId: "world-5-10",
      term: "fossil fuels",
      definition:
        "Energy sources such as coal and oil formed from ancient organic matter, which powered industrialization.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-5-fossil-fuels"],
  },
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "Industry and empire",
      body: "Industrial power gave a few states the means to build global empires, the subject of Unit 6.",
      transferQuestion:
        "How did industrialization change the balance of power among regions?",
      feedback: "Name a specific advantage industrial states gained.",
      links: [
        {
          topicId: "world-5-4",
          sectionId: "spread-west",
          label: "Review the spread of industry",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-10", "ced"],
};

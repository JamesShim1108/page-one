// Original Page One lesson for CED Topic 6.1. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-06.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-6-1",
  unitId: "world-6",
  courseId: "world",
  code: "6.1",
  title: "Rationales for Imperialism from 1750 to 1900",
  period: "c. 1750–1900",
  status: "ready",
  order: 1,
  summary:
    "How economic motives, nationalism, religious missions, and ideas such as Social Darwinism and the civilizing mission were used to justify empire.",
  minutes: 9,
  learningGoals: [
    "Explain how ideologies contributed to the development of imperialism from 1750 to 1900.",
    "Distinguish economic motives from ideological justifications for empire.",
  ],
  bigIdea:
    "Industrial states built empires for economic and strategic reasons and justified them with ideas of racial and cultural superiority.",
  context:
    "By the late 1800s, industrial powers had the motives and the means to expand. They also developed ideas that made conquest seem natural or even generous.",
  sections: [
    {
      id: "motives",
      title: "Economic and national motives",
      conceptTitle: "Economic and national motives",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Several forces drove imperialism in the 1800s. Factories needed raw materials such as cotton and rubber, and industrialists wanted new markets. Nationalism made colonies a matter of prestige: owning an empire showed that a nation was a great power.",
        },
        {
          type: "paragraph",
          text: "Strategic needs mattered too. Steamships needed coaling stations, and navies needed bases around the world.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Industrial demand for raw materials and markets, combined with national rivalry, pushed states to seek colonies.",
        },
      ],
      takeaway: "Economic needs and national prestige drove imperial expansion.",
      sourceIds: ["ced-topic-6-1"],
    },
    {
      id: "ideologies",
      title: "Justifying empire",
      conceptTitle: "Justifying empire",
      lenses: ["C", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Social Darwinism applied ideas of competition and survival of the fittest to human societies, claiming that stronger nations deserved to dominate. Scientists today reject this misuse of Darwin's theory.",
        },
        {
          type: "paragraph",
          text: "The civilizing mission held that Europeans had a duty to spread Christianity, Western education, and their laws. Missionaries founded schools and hospitals, while the idea assumed colonized cultures were inferior.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Do not confuse motives with justifications. Economic gain was a motive; the civilizing mission was often a justification presented to the public.",
        },
      ],
      takeaway:
        "Ideologies of racial and cultural superiority made conquest seem acceptable to many Europeans and Americans.",
      sourceIds: ["ced-topic-6-1"],
    },
  ],
  vocabulary: [
    {
      id: "social-darwinism",
      topicId: "world-6-1",
      term: "Social Darwinism",
      definition:
        "The false application of ideas of natural selection to human societies, used to claim that stronger nations or races deserved to dominate.",
    },
    {
      id: "civilizing-mission",
      topicId: "world-6-1",
      term: "civilizing mission",
      definition:
        "The belief that Europeans had a duty to spread their religion, education, and laws to colonized peoples, used to justify empire.",
    },
    {
      id: "imperialism",
      topicId: "world-6-1",
      term: "imperialism",
      definition:
        "The policy of extending a nation's power over other territories through conquest, colonization, or economic control.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-6-social-darwinism",
      "world-6-civilizing-mission",
      "world-6-imperialism",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 5 bridge",
      title: "Industry creates demand",
      body: "Unit 5 described factories that needed raw cotton and markets. Those needs became motives for empire.",
      transferQuestion: "How did industrialization create motives for imperialism?",
      feedback: "Link a specific industrial need to a specific colonial resource.",
      links: [
        {
          topicId: "world-5-4",
          sectionId: "deindustrialization",
          label: "Review raw materials and markets",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-6-1", "ced"],
};

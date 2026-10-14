// Original Page One lesson for CED Topic 8.9. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-08.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-8-9",
  unitId: "world-8",
  courseId: "world",
  code: "8.9",
  title: "Causation in the Age of the Cold War and Decolonization",
  period: "c. 1900–present",
  status: "ready",
  order: 9,
  summary: "How the Cold War and decolonization shaped each other.",
  minutes: 6,
  learningGoals: [
    "Explain the relative significance of the effects of the Cold War and decolonization in the period after 1900.",
  ],
  bigIdea:
    "The Cold War and decolonization were intertwined: the superpowers competed for influence in new states, and new states used that competition for their own ends.",
  context:
    "Causation is an AP reasoning process. Strong answers explain how one development shaped another.",
  sections: [
    {
      id: "intertwined",
      title: "Two processes, one era",
      conceptTitle: "Two processes, one era",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "World War II weakened the colonial powers and created two superpowers. As new states emerged, the United States and the Soviet Union competed to win them as allies, offering aid and weapons.",
        },
        {
          type: "paragraph",
          text: "Some new states joined a bloc, some remained nonaligned, and some became battlegrounds in proxy wars. The Global South, the poorer countries of Asia, Africa, and Latin America, felt the Cold War's effects most violently.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "The weakening of empires created new states, and superpower rivalry shaped their politics, economies, and wars.",
        },
      ],
      takeaway:
        "The Cold War and decolonization shaped each other from 1945 until the Soviet collapse.",
      sourceIds: ["ced-topic-8-9"],
    },
  ],
  vocabulary: [
    {
      id: "global-south",
      topicId: "world-8-9",
      term: "Global South",
      definition:
        "A term for the poorer countries of Asia, Africa, and Latin America, many of them former colonies.",
    },
  ],
  definitionCoverage: { status: "required", conceptIds: ["world-8-global-south"] },
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "From Cold War to globalization",
      body: "Unit 9 examines the global economy, technology, and institutions that shaped the world after the Cold War.",
      transferQuestion: "How did the Cold War's end change global politics?",
      feedback: "Explain one change in alliances or trade.",
      links: [
        {
          topicId: "world-8-9",
          sectionId: "intertwined",
          label: "Review the connections",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-8-9", "ced"],
};

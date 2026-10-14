// Original Page One lesson for CED Topic 7.9. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-07.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-7-9",
  unitId: "world-7",
  courseId: "world",
  code: "7.9",
  title: "Causation in Global Conflict",
  period: "c. 1900–present",
  status: "ready",
  order: 9,
  summary: "How the world wars, the Depression, and the interwar crises were connected.",
  minutes: 6,
  learningGoals: [
    "Explain the relative significance of the causes of global conflict in the period 1900 to the present.",
  ],
  bigIdea:
    "The two world wars were connected through the unresolved settlement of 1919 and the crises of the 1930s, and together they reshaped global power.",
  context:
    "Causation is an AP reasoning process. Strong answers trace chains of cause and effect.",
  sections: [
    {
      id: "chain-of-conflict",
      title: "A chain of conflict",
      conceptTitle: "A chain of conflict",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "World War I destroyed four empires and produced a resented peace. The Great Depression weakened democracies and strengthened extremists. Fascist and Japanese expansion then led to World War II.",
        },
        {
          type: "paragraph",
          text: "World War II weakened European empires and left the United States and Soviet Union as superpowers, setting the stage for the Cold War and decolonization.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Each crisis created conditions for the next: war led to a flawed peace, the Depression to extremism, and extremism to a second war.",
        },
      ],
      takeaway: "Global conflicts from 1914 to 1945 formed a connected chain of causes.",
      sourceIds: ["ced-topic-7-9"],
    },
  ],
  vocabulary: [
    {
      id: "superpowers",
      topicId: "world-7-9",
      term: "superpowers",
      definition:
        "The United States and the Soviet Union, the two dominant world powers after World War II.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-7-superpowers"],
  },
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "From world war to Cold War",
      body: "Unit 8 traces how the superpowers' rivalry and the decline of empires shaped the world after 1945.",
      transferQuestion: "How did World War II set the stage for the Cold War?",
      feedback: "Explain the shift in global power.",
      links: [
        {
          topicId: "world-7-9",
          sectionId: "chain-of-conflict",
          label: "Review the chain of conflict",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-7-9", "ced"],
};

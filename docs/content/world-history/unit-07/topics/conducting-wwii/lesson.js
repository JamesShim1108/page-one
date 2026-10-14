// Original Page One lesson for CED Topic 7.7. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-07.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-7-7",
  unitId: "world-7",
  courseId: "world",
  code: "7.7",
  title: "Conducting World War II",
  period: "c. 1900–present",
  status: "ready",
  order: 7,
  summary:
    "How governments mobilized for total war, how new technology increased civilian deaths, and how the atomic bomb ended the war.",
  minutes: 9,
  learningGoals: [
    "Explain similarities and differences in how governments used a variety of methods to conduct war.",
  ],
  bigIdea:
    "World War II was an even more total war than the first, targeting civilians on a massive scale and ending with the use of atomic weapons.",
  context:
    "Both sides mobilized entire economies and societies, and new technologies made cities into battlefields.",
  sections: [
    {
      id: "wwii-mobilization",
      title: "Mobilization and civilians",
      conceptTitle: "Mobilization and civilians",
      lenses: ["P", "E", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "The United States converted factories to war production, and millions of women took industrial jobs. The Soviet Union moved factories east. Governments rationed goods and used propaganda.",
        },
        {
          type: "paragraph",
          text: "Bombing destroyed cities across Europe and Asia. The war killed an estimated 70 to 85 million people, more than half of them civilians.",
        },
      ],
      takeaway: "Civilians were both workers in the war effort and targets of attack.",
      sourceIds: ["ced-topic-7-7"],
    },
    {
      id: "atomic-bomb",
      title: "The atomic bomb",
      conceptTitle: "The atomic bomb",
      lenses: ["T", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "In August 1945, the United States dropped atomic bombs on Hiroshima and Nagasaki, and Japan surrendered days later. Historians debate whether the bombs were necessary to end the war and what role the coming rivalry with the Soviet Union played.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "The decision to use the bomb led to Japan's surrender and opened a nuclear age that shaped the Cold War.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Present historical debates as debates. A strong answer can weigh arguments without treating one side as settled fact.",
        },
      ],
      takeaway: "The atomic bomb ended the war and began the nuclear age.",
      sourceIds: ["ced-topic-7-7"],
    },
  ],
  vocabulary: [
    {
      id: "atomic-bombs",
      topicId: "world-7-7",
      term: "atomic bombs",
      definition:
        "Nuclear weapons, first used by the United States against Hiroshima and Nagasaki in August 1945.",
    },
    {
      id: "civilian-casualties",
      topicId: "world-7-7",
      term: "civilians",
      definition: "People who are not members of the armed forces.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-7-atomic-bombs", "world-7-civilian-casualties"],
  },
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "The nuclear age",
      body: "Nuclear weapons shaped the Cold War rivalry studied in Unit 8.",
      transferQuestion: "How might nuclear weapons change how great powers compete?",
      feedback: "Consider deterrence and the risk of direct war.",
      links: [
        {
          topicId: "world-7-7",
          sectionId: "atomic-bomb",
          label: "Review the atomic bomb",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-7-7", "ced"],
};

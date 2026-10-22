// Original Page One lesson for CED Topic 8.6.

export const lesson = {
  schemaVersion: 1,
  id: "world-8-6",
  unitId: "world-8",
  courseId: "world",
  code: "8.6",
  title: "Newly Independent States",
  period: "c. 1900–present",
  status: "ready",
  order: 6,
  summary:
    "How new borders caused mass migration and how new states pursued economic independence.",
  minutes: 9,
  learningGoals: [
    "Explain how political changes in the period from c. 1900 to the present led to territorial, demographic, and nationalist developments.",
  ],
  bigIdea:
    "Independence redrew borders, uprooted millions of people, and led many new states to use government power to develop their economies.",
  context:
    "Many colonial borders had been drawn without regard to the peoples living within them, and new states inherited economies built to export raw materials.",
  sections: [
    {
      id: "borders-migration",
      title: "New borders, mass migration",
      conceptTitle: "New borders, mass migration",
      lenses: ["S", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "The partition of India in 1947 divided British India into India and Pakistan. About 15 million people crossed the new borders, and communal violence killed hundreds of thousands. In 1971, East Pakistan broke away to become Bangladesh.",
        },
        {
          type: "paragraph",
          text: "When Israel was founded in 1948, war with neighboring Arab states followed, and about 700,000 Palestinians fled or were expelled. Many people also moved from former colonies to Europe: Caribbean and South Asian migrants to Britain, and Algerians to France.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Drawing new borders along religious or national lines turned minorities into refugees, and conflicts over those borders lasted for decades.",
        },
      ],
      takeaway:
        "Independence and partition caused some of the largest migrations in history.",
      sourceIds: ["ced-topic-8-6"],
    },
    {
      id: "economic-independence",
      title: "Economic independence",
      conceptTitle: "Economic independence",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Many new states used government power to build their economies. Egypt's Gamal Abdel Nasser carried out land reform and, in 1956, announced the nationalization of the Suez Canal, putting it under state ownership. The resulting Suez Crisis ended when the superpowers forced Britain, France, and Israel to withdraw.",
        },
        {
          type: "paragraph",
          text: "India's Jawaharlal Nehru used Five-Year Plans to build state-owned steel mills and dams in a mixed economy. Other states nationalized mines or oil fields once owned by foreign companies.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Political independence did not bring economic independence automatically. Many new states still depended on exporting a few raw materials.",
        },
      ],
      takeaway:
        "New states used nationalization and planning to reduce dependence on former colonial powers.",
      sourceIds: ["ced-topic-8-6"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 7 bridge",
      title: "Mandates and new nations",
      body: "Conflicts over Palestine and Iraq grew from the mandates created after World War I.",
      transferQuestion: "How did the mandate system shape conflicts after 1945?",
      feedback: "Connect a British or French promise to a later conflict.",
      links: [
        {
          topicId: "world-7-5",
          sectionId: "mandates-anticolonial",
          label: "Review the mandate system",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-8-6", "ced"],
};

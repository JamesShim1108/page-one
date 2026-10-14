// Original Page One lesson for CED Topic 7.6. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-07.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-7-6",
  unitId: "world-7",
  courseId: "world",
  code: "7.6",
  title: "Causes of World War II",
  period: "c. 1900–present",
  status: "ready",
  order: 6,
  summary:
    "How fascism, the failure of the peace settlement, appeasement, and Japanese expansion led to a second world war.",
  minutes: 9,
  learningGoals: ["Explain the causes and consequences of World War II."],
  bigIdea:
    "Fascist expansion, Japanese imperialism, and the failure of other powers to stop them led to World War II.",
  context:
    "The Depression and the unpopular peace settlement weakened democracies and strengthened extremists.",
  sections: [
    {
      id: "fascism",
      title: "The rise of fascism",
      conceptTitle: "The rise of fascism",
      lenses: ["P", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "Fascism glorified the nation, rejected democracy and communism, and demanded obedience to a single leader. Mussolini took power in Italy in 1922, and Hitler became chancellor of Germany in 1933.",
        },
        {
          type: "paragraph",
          text: "Both regimes used propaganda and violence and promised national greatness through expansion. The Nazis persecuted Jews from the start.",
        },
      ],
      takeaway: "Fascist regimes rejected democracy and pursued expansion by force.",
      sourceIds: ["ced-topic-7-6"],
    },
    {
      id: "road-to-war",
      title: "Appeasement and expansion",
      conceptTitle: "Appeasement and expansion",
      lenses: ["P"],
      blocks: [
        {
          type: "paragraph",
          text: "Britain and France tried appeasement, giving in to some demands to avoid war. At Munich in 1938 they allowed Germany to take the Sudetenland. Germany invaded Poland on September 1, 1939.",
        },
        {
          type: "paragraph",
          text: "In Asia, Japan seized Manchuria in 1931 and invaded China in 1937. After the United States cut off oil, Japan attacked Pearl Harbor on December 7, 1941.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Fascist and Japanese expansion went unchecked by appeasement, which encouraged further aggression until war broke out.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "World War II began in Asia before 1939. Japan's war in China started in 1937.",
        },
      ],
      takeaway: "Unchecked aggression in Europe and Asia produced a global war.",
      sourceIds: ["ced-topic-7-6"],
    },
  ],
  vocabulary: [
    {
      id: "fascism",
      topicId: "world-7-6",
      term: "Fascism",
      definition:
        "A political movement that glorifies the nation, rejects democracy and communism, and demands obedience to one leader.",
    },
    {
      id: "appeasement",
      topicId: "world-7-6",
      term: "appeasement",
      definition:
        "The policy of giving in to an aggressor's demands to avoid war, as Britain and France did at Munich in 1938.",
    },
    {
      id: "manchuria",
      topicId: "world-7-6",
      term: "Manchuria",
      definition: "A region of northeastern China that Japan seized in 1931.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-7-fascism", "world-7-appeasement", "world-7-manchuria"],
  },
  connections: [
    {
      id: "c1",
      type: "Within Unit 7",
      title: "From Versailles to war",
      body: "Resentment of the Treaty of Versailles helped the Nazis win support, linking the end of one war to the start of the next.",
      transferQuestion: "How did the outcome of World War I contribute to World War II?",
      feedback: "Name a specific result of the first war and explain its effect.",
      links: [
        {
          topicId: "world-7-5",
          sectionId: "versailles",
          label: "Review the Treaty of Versailles",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-7-6", "ced"],
};

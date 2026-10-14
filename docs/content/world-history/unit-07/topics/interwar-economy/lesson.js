// Original Page One lesson for CED Topic 7.4. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-07.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-7-4",
  unitId: "world-7",
  courseId: "world",
  code: "7.4",
  title: "Economy in the Interwar Period",
  period: "c. 1900–present",
  status: "ready",
  order: 4,
  summary:
    "How the Great Depression spread around the world and how governments responded with new economic policies.",
  minutes: 9,
  learningGoals: [
    "Explain how different governments responded to economic crisis after 1900.",
  ],
  bigIdea:
    "The Great Depression ended faith in self-correcting markets and led governments to take a much larger role in their economies.",
  context:
    "After World War I, many economies were fragile. The 1929 crash in New York set off a worldwide collapse.",
  sections: [
    {
      id: "great-depression",
      title: "The Great Depression",
      conceptTitle: "The Great Depression",
      lenses: ["E"],
      blocks: [
        {
          type: "paragraph",
          text: "After the stock market crash of October 1929, banks failed and factories closed. Countries raised tariffs, and world trade shrank. By 1933, about one in four American workers was unemployed. Exporters of raw materials, such as Brazil, suffered as prices fell.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "The crash caused bank failures and falling demand, and tariffs then shrank world trade, which spread the crisis from industrial countries to exporters of raw materials.",
        },
      ],
      takeaway:
        "The Depression became global because economies were linked through trade and finance.",
      sourceIds: ["ced-topic-7-4"],
    },
    {
      id: "state-responses",
      title: "Government responses",
      conceptTitle: "Government responses",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "The New Deal in the United States created jobs and regulated banks while keeping markets. Stalin's Five-Year Plans in the Soviet Union put the economy under state control and forced peasants onto collective farms, contributing to a deadly famine in Ukraine in 1932 and 1933.",
        },
        {
          type: "paragraph",
          text: "Fascist Italy and Nazi Germany kept private companies but directed them toward state goals such as rearmament. The economist John Maynard Keynes argued that government spending could help end depressions.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Not every response was democratic. The Soviet and fascist responses used coercion and violence.",
        },
      ],
      takeaway:
        "Governments of every type took on new economic roles, with very different methods.",
      sourceIds: ["ced-topic-7-4"],
    },
  ],
  vocabulary: [
    {
      id: "great-depression",
      topicId: "world-7-4",
      term: "Great Depression",
      definition:
        "The worldwide economic collapse that began in 1929 and lasted through the 1930s.",
    },
    {
      id: "new-deal",
      topicId: "world-7-4",
      term: "New Deal",
      definition:
        "Franklin Roosevelt's programs, begun in 1933, that created jobs, regulated banks, and expanded government's economic role in the United States.",
    },
    {
      id: "five-year-plans",
      topicId: "world-7-4",
      term: "Five-Year Plans",
      definition:
        "Stalin's state-directed plans, begun in 1928, for rapid industrialization and collective farming in the Soviet Union.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-7-great-depression",
      "world-7-new-deal",
      "world-7-five-year-plans",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 5 bridge",
      title: "Beyond laissez-faire",
      body: "Unit 5 described laissez-faire capitalism. The Depression led many to reject the idea that markets would fix themselves.",
      transferQuestion: "How did the Depression challenge laissez-faire ideas?",
      feedback:
        "Name a government response and explain how it differed from laissez-faire.",
      links: [
        {
          topicId: "world-5-7",
          sectionId: "laissez-faire",
          label: "Review laissez-faire",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-7-4", "ced"],
};

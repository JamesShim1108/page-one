// Original Page One lesson for CED Topic 5.6. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-05.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-6",
  unitId: "world-5",
  courseId: "world",
  code: "5.6",
  title: "Industrialization: Government's Role from 1750 to 1900",
  period: "c. 1750–1900",
  status: "ready",
  order: 6,
  summary:
    "How states such as Meiji Japan, Egypt under Muhammad Ali, and Russia promoted industrialization.",
  minutes: 9,
  learningGoals: [
    "Explain the causes and effects of state-sponsored industrialization.",
    "Compare state-led industrialization in Japan, Egypt, and Russia.",
  ],
  bigIdea:
    "Some governments led industrialization themselves to strengthen their states against Western powers, with mixed results.",
  context:
    "Late industrializers saw how industrial power let Britain and France dominate others. Governments that wanted to stay independent tried to build industry quickly.",
  sections: [
    {
      id: "meiji",
      title: "Meiji Japan",
      conceptTitle: "Meiji Japan",
      lenses: ["P", "E", "T"],
      blocks: [
        {
          type: "paragraph",
          text: "After the Meiji Restoration of 1868, Japan's leaders abolished the samurai class, created a conscript army, and sent students abroad to study Western science and government. The state built railroads, telegraph lines, and model factories.",
        },
        {
          type: "paragraph",
          text: "The government later sold many factories to private owners, and some became zaibatsu, large family-controlled business groups.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Fear of Western domination led Meiji leaders to build industry and a modern army, which made Japan a major power by 1900.",
        },
      ],
      takeaway: "Meiji Japan shows how a government could drive rapid industrialization.",
      sourceIds: ["ced-topic-5-6"],
    },
    {
      id: "egypt-russia",
      title: "Egypt and Russia",
      conceptTitle: "Egypt and Russia",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Muhammad Ali, governor of Egypt from 1805 to 1848, built state factories and required farmers to grow cotton for export. After European powers forced him to reduce his army in 1841, many factories closed.",
        },
        {
          type: "paragraph",
          text: "In Russia, the state built railroads, including the Trans-Siberian Railway begun in 1891, and encouraged heavy industry through foreign investment and tariffs.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "State support did not guarantee success. Egypt's factories struggled against British competition and European pressure.",
        },
      ],
      takeaway:
        "State-led industrialization had mixed results depending on resources and foreign pressure.",
      sourceIds: ["ced-topic-5-6"],
    },
  ],
  vocabulary: [
    {
      id: "meiji-restoration",
      topicId: "world-5-6",
      term: "Meiji Restoration",
      definition:
        "The 1868 overthrow of the Tokugawa shogunate that restored power to the emperor and launched rapid modernization in Japan.",
    },
    {
      id: "zaibatsu",
      topicId: "world-5-6",
      term: "zaibatsu",
      definition:
        "Large family-controlled business groups in Japan that grew from enterprises the Meiji state sold to private owners.",
    },
    {
      id: "muhammad-ali",
      topicId: "world-5-6",
      term: "Muhammad Ali",
      definition:
        "Governor of Egypt from 1805 to 1848 who built state factories and promoted cotton exports.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-5-meiji-restoration", "world-5-zaibatsu", "world-5-muhammad-ali"],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 3 bridge",
      title: "The end of the Tokugawa order",
      body: "Unit 3 described the Tokugawa shogunate's control over daimyo and samurai. The Meiji Restoration ended that order and abolished the samurai class.",
      transferQuestion:
        "What changed about the samurai between the Tokugawa period and the Meiji period?",
      feedback: "Describe their role in each period and the reason for change.",
      links: [
        {
          topicId: "world-3-2",
          sectionId: "bureaucracy-military",
          label: "Review the Tokugawa system",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-6", "ced"],
};

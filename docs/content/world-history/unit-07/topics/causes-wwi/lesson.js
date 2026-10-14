// Original Page One lesson for CED Topic 7.2. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-07.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-7-2",
  unitId: "world-7",
  courseId: "world",
  code: "7.2",
  title: "Causes of World War I",
  period: "c. 1900–present",
  status: "ready",
  order: 2,
  summary:
    "How alliances, militarism, imperial rivalry, and nationalism turned an assassination into a world war.",
  minutes: 9,
  learningGoals: [
    "Explain the causes of World War I.",
    "Weigh long-term and immediate causes.",
  ],
  bigIdea:
    "Long-term rivalries and rigid alliances turned a Balkan assassination into a war among the great powers.",
  context:
    "Europe had avoided a general war for a century, but industrial power, colonial competition, and nationalism raised the stakes of every crisis.",
  sections: [
    {
      id: "long-term-causes",
      title: "Long-term causes",
      conceptTitle: "Long-term causes",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Two alliance systems divided Europe: Germany and Austria-Hungary against France, Russia, and Britain. Militarism, the glorification of military power and the build-up of armies and navies, shaped planning. Germany and Britain raced to build battleships.",
        },
        {
          type: "paragraph",
          text: "Imperial rivalries over colonies and nationalism in the Balkans raised tensions further.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "No single cause explains the war. Strong answers connect several causes and explain how they interacted.",
        },
      ],
      takeaway:
        "Alliances, militarism, imperialism, and nationalism made a general war more likely.",
      sourceIds: ["ced-topic-7-2"],
    },
    {
      id: "july-crisis",
      title: "The July Crisis",
      conceptTitle: "The July Crisis",
      lenses: ["P"],
      blocks: [
        {
          type: "paragraph",
          text: "On June 28, 1914, a Bosnian Serb nationalist assassinated Archduke Franz Ferdinand of Austria-Hungary. Austria-Hungary declared war on Serbia, Russia mobilized, and Germany declared war on Russia and France and invaded Belgium. Britain then entered the war.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "The assassination triggered an Austrian attack on Serbia, and alliance commitments and war plans then drew in the other great powers within days.",
        },
      ],
      takeaway:
        "Alliances and mobilization plans spread a regional crisis into a world war.",
      sourceIds: ["ced-topic-7-2"],
    },
  ],
  vocabulary: [
    {
      id: "militarism",
      topicId: "world-7-2",
      term: "Militarism",
      definition:
        "The glorification of military power and the build-up of large armies and navies.",
    },
    {
      id: "alliance-systems",
      topicId: "world-7-2",
      term: "alliance systems",
      definition:
        "Agreements among states to support one another in war, which divided Europe into two camps before 1914.",
    },
    {
      id: "franz-ferdinand",
      topicId: "world-7-2",
      term: "Archduke Franz Ferdinand",
      definition:
        "Heir to the throne of Austria-Hungary, whose assassination in 1914 triggered World War I.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-7-militarism",
      "world-7-alliance-systems",
      "world-7-franz-ferdinand",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 6 bridge",
      title: "Imperial rivalry",
      body: "The competition for colonies described in Unit 6 created tensions among the powers that went to war in 1914.",
      transferQuestion: "How did imperial rivalry contribute to World War I?",
      feedback: "Name a rivalry between two powers and explain its effect.",
      links: [
        {
          topicId: "world-6-8",
          sectionId: "industry-empire",
          label: "Review industry and empire",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-7-2", "ced"],
};

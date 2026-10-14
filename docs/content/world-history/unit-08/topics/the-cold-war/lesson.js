// Original Page One lesson for CED Topic 8.2. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-08.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-8-2",
  unitId: "world-8",
  courseId: "world",
  code: "8.2",
  title: "The Cold War",
  period: "c. 1900–present",
  status: "ready",
  order: 2,
  summary:
    "How the United States and the Soviet Union competed through ideology, alliances, aid, and nuclear weapons.",
  minutes: 9,
  learningGoals: [
    "Explain the causes and effects of the ideological struggle of the Cold War.",
  ],
  bigIdea:
    "The superpowers competed for influence everywhere except on the battlefield against each other, dividing much of the world into rival blocs.",
  context:
    "Both superpowers believed their system was best for all humanity, and both feared the other would spread its system by force.",
  sections: [
    {
      id: "containment",
      title: "Containment and rival blocs",
      conceptTitle: "Containment and rival blocs",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "The Cold War was a rivalry between the United States and the Soviet Union from about 1947 to 1991 that never became a direct war between them. In 1947 the United States adopted containment, a policy of stopping the spread of communism. The Truman Doctrine sent aid to Greece and Turkey.",
        },
        {
          type: "paragraph",
          text: "The Marshall Plan gave about $13 billion to rebuild Western Europe, partly so that poverty would not drive voters toward communism. The Soviet Union kept tight control over Eastern Europe and blockaded West Berlin in 1948, and the West supplied the city by air.",
        },
        {
          type: "paragraph",
          text: "In 1949 the United States, Canada, and Western European states formed NATO, a military alliance. The Soviet Union answered with the Warsaw Pact in 1955. Germany was divided into two states.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Each side read the other's moves as aggression: Soviet control of Eastern Europe looked like expansion to the West, and the Marshall Plan and NATO looked like encirclement to Moscow.",
        },
      ],
      takeaway:
        "Containment, aid, and alliances divided Europe into US-led and Soviet-led blocs.",
      sourceIds: ["ced-topic-8-2"],
    },
    {
      id: "nonalignment",
      title: "Choosing not to choose",
      conceptTitle: "Choosing not to choose",
      lenses: ["P"],
      blocks: [
        {
          type: "paragraph",
          text: "Many newly independent states refused to join either bloc. At Bandung, Indonesia, in 1955, Asian and African leaders condemned colonialism. In 1961, leaders including Nehru of India, Nasser of Egypt, Sukarno of Indonesia, and Tito of Yugoslavia founded the Non-Aligned Movement.",
        },
        {
          type: "paragraph",
          text: "Nonalignment let these states focus on development and accept aid from both sides, though in practice some leaned toward one superpower.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The Cold War was not only a European conflict. The superpowers competed for influence in Asia, Africa, and Latin America, where many states tried to stay neutral.",
        },
      ],
      takeaway:
        "Newly independent states used nonalignment to protect their independence from both superpowers.",
      sourceIds: ["ced-topic-8-2"],
    },
  ],
  vocabulary: [
    {
      id: "cold-war",
      topicId: "world-8-2",
      term: "Cold War",
      definition:
        "The rivalry between the United States and the Soviet Union, c. 1947–1991, fought through alliances, aid, propaganda, and proxy wars rather than direct war.",
    },
    {
      id: "containment",
      topicId: "world-8-2",
      term: "containment",
      definition:
        "The US policy of stopping the spread of communism beyond where it already existed.",
    },
    {
      id: "marshall-plan",
      topicId: "world-8-2",
      term: "Marshall Plan",
      definition:
        "The US program that gave about $13 billion to rebuild Western European economies after World War II.",
    },
    {
      id: "nato",
      topicId: "world-8-2",
      term: "NATO",
      definition:
        "The North Atlantic Treaty Organization, a military alliance of the United States, Canada, and Western European states formed in 1949.",
    },
    {
      id: "non-aligned-movement",
      topicId: "world-8-2",
      term: "Non-Aligned Movement",
      definition:
        "An organization of states, founded in 1961, that refused to join either Cold War bloc.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-8-cold-war",
      "world-8-containment",
      "world-8-marshall-plan",
      "world-8-nato",
      "world-8-non-aligned-movement",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 6 bridge",
      title: "Ideologies in competition",
      body: "The rivalry between capitalism and communism grew from the debates over industrial society that you studied in Units 5 and 6.",
      transferQuestion: "How did nineteenth-century ideas shape the Cold War?",
      feedback: "Connect Marx's ideas or liberal ideas to one superpower's goals.",
      links: [
        {
          topicId: "world-8-2",
          sectionId: "containment",
          label: "Review containment and rival blocs",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-8-2", "ced"],
};

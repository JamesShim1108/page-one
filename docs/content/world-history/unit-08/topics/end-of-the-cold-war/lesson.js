// Original Page One lesson for CED Topic 8.8. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-08.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-8-8",
  unitId: "world-8",
  courseId: "world",
  code: "8.8",
  title: "End of the Cold War",
  period: "c. 1900–present",
  status: "ready",
  order: 8,
  summary:
    "How Soviet economic weakness, Gorbachev's reforms, and the revolutions of 1989 ended the Cold War.",
  minutes: 9,
  learningGoals: ["Explain the causes of the end of the Cold War."],
  bigIdea:
    "Economic stagnation, costly commitments, and reforms that loosened control allowed Eastern Europeans to overthrow communism and the Soviet Union to dissolve.",
  context:
    "By the 1980s, the Soviet economy could not keep pace with Western technology or consumer goods.",
  sections: [
    {
      id: "soviet-decline",
      title: "Soviet decline and reform",
      conceptTitle: "Soviet decline and reform",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "In the 1970s, détente, a relaxation of tensions, produced arms control treaties, but it ended when the Soviet Union invaded Afghanistan in 1979. The war cost lives and money for a decade. Meanwhile, the Soviet economy stagnated, and falling oil prices in the 1980s cut its income.",
        },
        {
          type: "paragraph",
          text: "US President Ronald Reagan increased military spending. Mikhail Gorbachev, the Soviet leader from 1985, introduced glasnost, or openness, which allowed more criticism, and perestroika, a restructuring of the economy. He also negotiated arms reductions with the United States.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Gorbachev's reforms were meant to save the Soviet system, but openness let people criticize it, and restructuring disrupted the economy.",
        },
      ],
      takeaway:
        "Economic weakness and Gorbachev's reforms loosened the Soviet grip at home and abroad.",
      sourceIds: ["ced-topic-8-8"],
    },
    {
      id: "revolutions-1989",
      title: "1989 and 1991",
      conceptTitle: "1989 and 1991",
      lenses: ["P"],
      blocks: [
        {
          type: "paragraph",
          text: "In Poland, the trade union Solidarity, led by Lech Wałęsa, won a semi-free election in 1989. Gorbachev refused to send troops, and the revolutions of 1989 spread across Eastern Europe. The Berlin Wall fell in November, and Germany reunited in 1990.",
        },
        {
          type: "paragraph",
          text: "Nationalist movements inside the Soviet Union demanded independence. After a failed coup by hard-liners in August 1991, the Soviet Union dissolved in December into fifteen independent states.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The Cold War did not end only because of US pressure. Soviet economic problems, Gorbachev's choices, and protests in Eastern Europe were all essential.",
        },
      ],
      takeaway:
        "Popular revolutions and Soviet restraint ended communist rule in Eastern Europe.",
      sourceIds: ["ced-topic-8-8"],
    },
  ],
  vocabulary: [
    {
      id: "detente",
      topicId: "world-8-8",
      term: "détente",
      definition: "The easing of tensions between the superpowers in the 1970s.",
    },
    {
      id: "glasnost",
      topicId: "world-8-8",
      term: "glasnost",
      definition:
        "Gorbachev's policy of openness, which allowed more criticism and freedom of expression.",
    },
    {
      id: "perestroika",
      topicId: "world-8-8",
      term: "perestroika",
      definition: "Gorbachev's policy of restructuring the Soviet economy.",
    },
    {
      id: "solidarity",
      topicId: "world-8-8",
      term: "Solidarity",
      definition:
        "The Polish independent trade union, led by Lech Wałęsa, that challenged communist rule.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-8-detente",
      "world-8-glasnost",
      "world-8-perestroika",
      "world-8-solidarity",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "A globalizing world",
      body: "The end of the Cold War opened former communist states to world trade, a theme of Unit 9.",
      transferQuestion: "How did the end of the Cold War affect the global economy?",
      feedback: "Name a country that opened to trade and explain the effect.",
      links: [
        {
          topicId: "world-8-8",
          sectionId: "revolutions-1989",
          label: "Review 1989 and 1991",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-8-8", "ced"],
};

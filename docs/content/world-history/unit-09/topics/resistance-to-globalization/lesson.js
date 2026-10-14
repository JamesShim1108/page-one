// Original Page One lesson for CED Topic 9.7. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-09.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-9-7",
  unitId: "world-9",
  courseId: "world",
  code: "9.7",
  title: "Resistance to Globalization After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 7,
  summary:
    "How farmers, workers, environmentalists, and others protested the effects of global trade.",
  minutes: 8,
  learningGoals: [
    "Explain the various responses to increasing interactions in the period after 1900.",
  ],
  bigIdea:
    "As global trade grew, some groups resisted it, arguing that it harmed workers, small farmers, local cultures, and the environment.",
  context:
    "By the 1990s, new trade agreements and institutions had lowered barriers to trade around the world.",
  sections: [
    {
      id: "protest",
      title: "Protesting globalization",
      conceptTitle: "Protesting globalization",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "The anti-globalization movement brought together labor unions, environmentalists, farmers, and students who argued that free trade benefited corporations at the expense of workers and the environment.",
        },
        {
          type: "paragraph",
          text: "In 1994, the Zapatistas rose up in southern Mexico on the day the North American Free Trade Agreement took effect. In 1999, protesters disrupted a World Trade Organization meeting in Seattle, and in 2001 activists founded the World Social Forum in Brazil.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Lower trade barriers exposed farmers and workers to foreign competition, which led some of them to organize against free trade.",
        },
      ],
      takeaway: "Groups harmed by global trade organized to resist it.",
      sourceIds: ["ced-topic-9-7"],
    },
    {
      id: "defending-local",
      title: "Defending local ways",
      conceptTitle: "Defending local ways",
      lenses: ["C", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Other resistance was cultural. Some communities and governments tried to protect local languages, foods, and industries from global competition. Defenders of globalization replied that open trade raised living standards and reduced poverty.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Resistance to globalization was not the same as rejecting all global connections. Many protesters used the internet and international networks to organize.",
        },
      ],
      takeaway:
        "Debates over globalization weighed its economic gains against its local costs.",
      sourceIds: ["ced-topic-9-7"],
    },
  ],
  vocabulary: [
    {
      id: "anti-globalization-movement",
      topicId: "world-9-7",
      term: "anti-globalization movement",
      definition:
        "A coalition of unions, environmentalists, farmers, and others who opposed free-trade agreements and global economic institutions.",
    },
    {
      id: "zapatistas",
      topicId: "world-9-7",
      term: "Zapatistas",
      definition:
        "Mostly Indigenous rebels in Chiapas, Mexico, who rose up in 1994 against NAFTA and the Mexican government.",
    },
    {
      id: "world-social-forum",
      topicId: "world-9-7",
      term: "World Social Forum",
      definition:
        "An annual meeting of activists, founded in Brazil in 2001, that opposed corporate-led globalization.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-9-anti-globalization-movement",
      "world-9-zapatistas",
      "world-9-world-social-forum",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 6 bridge",
      title: "Earlier resistance to global markets",
      body: "Like resistance to economic imperialism in the nineteenth century, protests against globalization targeted outside economic control.",
      transferQuestion:
        "Compare resistance to economic imperialism and resistance to globalization.",
      feedback: "Name one similarity in grievances and one difference in methods.",
      links: [
        {
          topicId: "world-9-7",
          sectionId: "protest",
          label: "Review protesting globalization",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-9-7", "ced"],
};

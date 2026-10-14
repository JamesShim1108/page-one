// Original Page One lesson for CED Topic 4.8. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-04.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-4-8",
  unitId: "world-4",
  courseId: "world",
  code: "4.8",
  title: "Continuity and Change from 1450 to 1750",
  period: "c. 1450–1750",
  status: "ready",
  order: 8,
  summary:
    "What changed and what stayed the same as sea routes connected the world from 1450 to 1750.",
  minutes: 8,
  learningGoals: [
    "Explain the continuities and changes in economic systems, labor, and trade from 1450 to 1750.",
    "Support a claim about continuity and change with specific evidence.",
  ],
  bigIdea:
    "Ocean voyages created the first global networks and transformed the Atlantic world, while much of Asia's economic power and many older trade patterns continued.",
  context:
    "Continuity and change is an AP reasoning process. A strong answer names what changed, what stayed the same, and why.",
  sections: [
    {
      id: "what-changed",
      title: "What changed",
      conceptTitle: "What changed",
      lenses: ["E", "S", "In"],
      blocks: [
        {
          type: "paragraph",
          text: "For the first time, sea routes linked every inhabited continent. The Columbian Exchange transformed diets and environments, and American silver created a global economy centered on Chinese demand.",
        },
        {
          type: "paragraph",
          text: "The Atlantic world changed most. European empires, epidemic disease, and the forced migration of millions of Africans produced new societies in the Americas.",
        },
      ],
      takeaway:
        "Global connection and the creation of Atlantic societies were the period's major changes.",
      sourceIds: ["ced-topic-4-8"],
    },
    {
      id: "what-continued",
      title: "What continued",
      conceptTitle: "What continued",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Asian merchants still carried most Indian Ocean trade. Chinese and Indian manufactured goods remained in demand worldwide, and land-based empires such as the Ottomans, Mughals, and Qing remained powerful.",
        },
        {
          type: "paragraph",
          text: "Coerced labor also continued, though in new forms. Older systems of slavery and serfdom persisted while Atlantic chattel slavery expanded.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Because Asian states were strong and Asian goods were valuable, Europeans had to join existing trade networks rather than replace them.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Do not claim Europeans dominated the world by 1750. Their power was greatest in the Americas and at sea, not in Asia's interior.",
        },
      ],
      takeaway: "European expansion added to, rather than replaced, many older patterns.",
      sourceIds: ["ced-topic-4-8"],
    },
  ],
  vocabulary: [
    {
      id: "global-economy",
      topicId: "world-4-8",
      term: "global economy",
      definition:
        "A network of trade linking all inhabited continents, which first formed after 1450 through ocean routes and silver flows.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-4-global-economy"],
  },
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "Toward industrialization",
      body: "Atlantic trade and profits from colonies contributed to the economic changes that led to industrialization in Britain after 1750, studied in Unit 5.",
      transferQuestion:
        "How might Atlantic trade have contributed to later economic change in Britain?",
      feedback: "Name a specific good or profit and explain its role.",
      links: [
        {
          topicId: "world-4-5",
          sectionId: "atlantic-slave-trade",
          label: "Review the Atlantic economy",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-4-8", "ced"],
};

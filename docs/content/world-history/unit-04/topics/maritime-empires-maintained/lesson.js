// Original Page One lesson for CED Topic 4.5. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-04.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-4-5",
  unitId: "world-4",
  courseId: "world",
  code: "4.5",
  title: "Maritime Empires Maintained and Developed",
  period: "c. 1450–1750",
  status: "ready",
  order: 5,
  summary:
    "How coerced labor, the Atlantic slave trade, the silver trade, and Asian trade restrictions shaped maritime empires.",
  minutes: 12,
  learningGoals: [
    "Explain the changing and continuing role of coerced labor from 1450 to 1750.",
    "Explain how the Atlantic slave trade and the global silver trade developed.",
    "Explain why some Asian states restricted European trade.",
  ],
  bigIdea:
    "Maritime empires depended on coerced labor and global flows of silver, while powerful Asian states set limits on European activity.",
  context:
    "Colonies produced silver, sugar, and other goods for world markets. Producing them required huge numbers of workers, most of whom were forced to work.",
  sections: [
    {
      id: "labor-systems",
      title: "Coerced labor in Spanish America",
      conceptTitle: "Coerced labor in Spanish America",
      lenses: ["E", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "The encomienda system gave Spanish colonists the right to demand labor and tribute from Indigenous communities. After abuses and population collapse, the crown restricted it, and haciendas came to rely on workers bound by debt.",
        },
        {
          type: "paragraph",
          text: "Spain adapted the Inca mit'a into a forced labor draft for the silver mines of Potosí, discovered in 1545. Many workers died in dangerous mines.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The Spanish mit'a used an Inca name, but it served colonial mining and was far deadlier than the Inca labor system.",
        },
      ],
      takeaway: "Spanish colonial wealth depended on coerced Indigenous labor.",
      sourceIds: ["ced-topic-4-5"],
    },
    {
      id: "atlantic-slave-trade",
      title: "The Atlantic slave trade",
      conceptTitle: "The Atlantic slave trade",
      lenses: ["E", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Plantations in Brazil and the Caribbean imported enslaved Africans in huge numbers. About 12.5 million Africans were forced across the Atlantic, and nearly 2 million died during the Middle Passage.",
        },
        {
          type: "paragraph",
          text: "Chattel slavery made enslaved status hereditary and tied it to race. Enslaved Africans nonetheless preserved languages, beliefs, and skills that shaped American cultures.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Indigenous population collapse and the profits of sugar led planters to buy enslaved Africans, which expanded the slave trade and created racially defined slavery in the Americas.",
        },
      ],
      takeaway:
        "The Atlantic slave trade forcibly moved millions and built a racial hierarchy into colonial societies.",
      sourceIds: ["ced-topic-4-5"],
    },
    {
      id: "silver-trade",
      title: "Silver and global trade",
      conceptTitle: "Silver and global trade",
      lenses: ["E"],
      blocks: [
        {
          type: "paragraph",
          text: "After Spain founded Manila in 1571, the Manila galleons carried American silver across the Pacific to trade for Chinese silk and porcelain. Japan also exported large amounts of silver to China.",
        },
        {
          type: "paragraph",
          text: "China's demand for silver, partly because taxes were paid in silver, pulled the Americas, Asia, and Europe into one trade network. Silver also caused inflation in Spain.",
        },
      ],
      takeaway:
        "American silver created the first truly global trade network, centered on Chinese demand.",
      sourceIds: ["ced-topic-4-5"],
    },
    {
      id: "trade-restrictions",
      title: "Asian states set limits",
      conceptTitle: "Asian states set limits",
      lenses: ["P", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "In the 1630s, Tokugawa Japan banned Christianity, expelled the Portuguese, and limited European trade to the Dutch at Nagasaki. By the 1750s, the Qing limited European merchants to the port of Canton.",
        },
        {
          type: "paragraph",
          text: "These policies did not end trade. They let powerful Asian states control it and limit foreign religious and political influence.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Japan was not completely isolated. It traded with the Dutch, China, and Korea under strict control.",
        },
      ],
      takeaway: "Strong Asian states controlled the terms of European trade.",
      sourceIds: ["ced-topic-4-5"],
    },
  ],
  vocabulary: [
    {
      id: "encomienda",
      topicId: "world-4-5",
      term: "encomienda",
      definition:
        "A Spanish colonial grant giving colonists the right to demand labor and tribute from Indigenous communities.",
    },
    {
      id: "hacienda",
      topicId: "world-4-5",
      term: "haciendas",
      definition:
        "Large landed estates in Spanish America that relied on Indigenous and mixed-ancestry workers, often bound by debt.",
    },
    {
      id: "middle-passage",
      topicId: "world-4-5",
      term: "Middle Passage",
      definition:
        "The forced voyage of enslaved Africans across the Atlantic to the Americas, during which many died.",
    },
    {
      id: "chattel-slavery",
      topicId: "world-4-5",
      term: "chattel slavery",
      definition:
        "A system in which enslaved people are treated as property and their status passes to their children.",
    },
    {
      id: "manila-galleons",
      topicId: "world-4-5",
      term: "Manila galleons",
      definition:
        "Spanish ships that carried American silver across the Pacific to Manila to trade for Chinese goods after 1571.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-4-encomienda",
      "world-4-hacienda",
      "world-4-middle-passage",
      "world-4-chattel-slavery",
      "world-4-manila-galleons",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 1 bridge",
      title: "Mit'a before and after conquest",
      body: "Unit 1 described the Inca mit'a as a rotating labor duty that supported the state. Spanish officials kept the name but turned it into a deadly mining draft.",
      transferQuestion: "How did the Spanish mit'a differ from the Inca mit'a?",
      feedback: "Compare purpose and conditions with specific evidence.",
      links: [
        {
          topicId: "world-1-4",
          sectionId: "americas-inca",
          label: "Review the Inca mit'a",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-4-5", "ced"],
};

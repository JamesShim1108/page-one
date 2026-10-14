// Original Page One lesson for CED Topic 5.7. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-05.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-7",
  unitId: "world-5",
  courseId: "world",
  code: "5.7",
  title: "Economic Developments and Innovations in the Industrial Age",
  period: "c. 1750–1900",
  status: "ready",
  order: 7,
  summary:
    "How laissez-faire ideas, limited liability, stock markets, and transnational businesses changed economies.",
  minutes: 8,
  learningGoals: [
    "Explain the development of economic systems, ideologies, and institutions.",
    "Explain how new financial institutions supported industrial growth.",
  ],
  bigIdea:
    "New economic ideas and institutions, from Adam Smith's free-market arguments to limited liability and global banks, supported industrial capitalism.",
  context:
    "Mercantilism dominated European economic thinking before 1750. Industrialization encouraged new arguments for free markets and new ways to raise capital.",
  sections: [
    {
      id: "laissez-faire",
      title: "Laissez-faire ideas",
      conceptTitle: "Laissez-faire ideas",
      lenses: ["E", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "Adam Smith argued in 1776 that the division of labor and free markets would increase wealth. Laissez-faire capitalism held that government should interfere little in the economy.",
        },
        {
          type: "paragraph",
          text: "Critics pointed to monopolies, harsh working conditions, and economic crises, and some called for regulation.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Laissez-faire was an argument, not a description of reality. Governments still passed tariffs, built railroads, and regulated some industries.",
        },
      ],
      takeaway:
        "Free-market ideas challenged mercantilism and shaped industrial economies.",
      sourceIds: ["ced-topic-5-7"],
    },
    {
      id: "financial-institutions",
      title: "New financial institutions",
      conceptTitle: "New financial institutions",
      lenses: ["E"],
      blocks: [
        {
          type: "paragraph",
          text: "Limited liability, introduced in Britain in 1855, meant investors could lose only what they had invested. Stock exchanges grew as more people bought shares.",
        },
        {
          type: "paragraph",
          text: "Banks and businesses operated across borders. The Hongkong and Shanghai Banking Corporation, founded in 1865, financed trade across Asia.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Limited liability lowered investors' risk, which drew more capital into companies and allowed larger enterprises.",
        },
      ],
      takeaway: "New financial tools mobilized capital for large industrial firms.",
      sourceIds: ["ced-topic-5-7"],
    },
  ],
  vocabulary: [
    {
      id: "laissez-faire",
      topicId: "world-5-7",
      term: "Laissez-faire",
      definition:
        "The idea that government should interfere as little as possible in the economy.",
    },
    {
      id: "limited-liability",
      topicId: "world-5-7",
      term: "Limited liability",
      definition:
        "A legal rule that investors can lose only the money they put into a company, not their other property.",
    },
    {
      id: "division-of-labor",
      topicId: "world-5-7",
      term: "division of labor",
      definition:
        "Splitting production into many small tasks, each done by a different worker, to increase output.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-5-laissez-faire",
      "world-5-limited-liability",
      "world-5-division-of-labor",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 4 bridge",
      title: "From joint-stock companies to stock markets",
      body: "Unit 4 described joint-stock companies such as the VOC. Limited liability and stock exchanges expanded the practice of selling shares.",
      transferQuestion: "How did limited liability build on the joint-stock model?",
      feedback: "Compare how each spread risk among investors.",
      links: [
        {
          topicId: "world-4-4",
          sectionId: "joint-stock-companies",
          label: "Review joint-stock companies",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-7", "ced"],
};

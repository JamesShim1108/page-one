// Original Page One lesson for CED Topic 9.4. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-09.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-9-4",
  unitId: "world-9",
  courseId: "world",
  code: "9.4",
  title: "Economics in the Global Age",
  period: "c. 1900–present",
  status: "ready",
  order: 4,
  summary:
    "How free-market reforms, new Asian economies, and multinational corporations reshaped the world economy.",
  minutes: 9,
  learningGoals: [
    "Explain the continuities and changes in the global economy from 1900 to the present.",
  ],
  bigIdea:
    "After the 1970s, many states reduced government control of their economies, production shifted to Asia, and wealthy countries moved toward knowledge-based work.",
  context:
    "In the 1970s, rising oil prices and inflation weakened confidence in the government-managed economies of the postwar decades.",
  sections: [
    {
      id: "free-market",
      title: "The turn to free markets",
      conceptTitle: "The turn to free markets",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "In the 1980s, leaders including Ronald Reagan in the United States and Margaret Thatcher in Britain cut taxes, reduced regulation, and sold state-owned companies. This economic liberalization reduced the government's role in the economy.",
        },
        {
          type: "paragraph",
          text: "In China, Deng Xiaoping's reforms after 1978 let peasants sell crops at market prices and opened special economic zones to foreign investors, while the Communist Party kept political control. India opened its economy to foreign trade and investment in 1991.",
        },
        {
          type: "callout",
          title: "Comparison",
          text: "Thatcher and Deng both expanded the role of markets, but Britain remained a democracy, while China's Communist Party kept its monopoly on power.",
        },
      ],
      takeaway:
        "Many states, capitalist and communist, gave markets a larger role after the 1970s.",
      sourceIds: ["ced-topic-9-4"],
    },
    {
      id: "new-economies",
      title: "New centers of production",
      conceptTitle: "New centers of production",
      lenses: ["E"],
      blocks: [
        {
          type: "paragraph",
          text: "South Korea, Taiwan, Hong Kong, and Singapore, known as the Asian Tigers, grew rapidly by producing goods for export. Multinational corporations, companies that operate in many countries, moved factories to places with lower wages.",
        },
        {
          type: "paragraph",
          text: "Wealthy countries shifted toward knowledge economies, in which more people worked in finance, technology, research, and services than in factories.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Cheaper shipping and communication let corporations spread production across countries, which helped Asian economies grow and reduced factory jobs in older industrial regions.",
        },
      ],
      takeaway:
        "Production moved toward Asia, and wealthy economies came to depend on knowledge and services.",
      sourceIds: ["ced-topic-9-4"],
    },
  ],
  vocabulary: [
    {
      id: "economic-liberalization",
      topicId: "world-9-4",
      term: "economic liberalization",
      definition:
        "Policies that reduce government control of the economy through lower taxes, less regulation, and privatization.",
    },
    {
      id: "asian-tigers",
      topicId: "world-9-4",
      term: "Asian Tigers",
      definition:
        "South Korea, Taiwan, Hong Kong, and Singapore, which grew rapidly by producing goods for export after the 1960s.",
    },
    {
      id: "multinational-corporations",
      topicId: "world-9-4",
      term: "Multinational corporations",
      definition: "Companies that operate and produce goods in many countries.",
    },
    {
      id: "knowledge-economies",
      topicId: "world-9-4",
      term: "knowledge economies",
      definition:
        "Economies in which most people work in finance, technology, research, and services rather than manufacturing.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-9-economic-liberalization",
      "world-9-asian-tigers",
      "world-9-multinational-corporations",
      "world-9-knowledge-economies",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 7 bridge",
      title: "From the New Deal to free markets",
      body: "The Depression led governments to take a larger role in their economies; after the 1970s, many reversed course.",
      transferQuestion: "Compare government economic roles in the 1930s and the 1980s.",
      feedback: "Name one policy from each period and explain the difference.",
      links: [
        {
          topicId: "world-7-4",
          sectionId: "state-responses",
          label: "Review government responses to the Depression",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-9-4", "ced"],
};

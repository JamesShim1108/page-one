// Original Page One lesson for CED Topic 9.3. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-09.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-9-3",
  unitId: "world-9",
  courseId: "world",
  code: "9.3",
  title: "Technological Advances: Debates About the Environment After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 3,
  summary:
    "How population growth and industry changed the environment, and how people debated what to do.",
  minutes: 9,
  learningGoals: [
    "Explain the causes and effects of environmental changes in the period from 1900 to the present.",
  ],
  bigIdea:
    "Growing populations and economies used resources faster than ever, causing pollution, deforestation, and climate change, and sparking global debates over who should act.",
  context:
    "Humans had always changed their environments, but after 1900 the scale of change became global.",
  sections: [
    {
      id: "environmental-change",
      title: "A changing planet",
      conceptTitle: "A changing planet",
      lenses: ["In", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Burning coal, oil, and gas released greenhouse gases such as carbon dioxide, which trap heat in the atmosphere. Scientists linked these emissions to climate change, the long-term warming of the planet and shifts in weather patterns.",
        },
        {
          type: "paragraph",
          text: "Demand for land, timber, and farmland led to deforestation in the Amazon and Southeast Asia. Overgrazing and drought spread deserts in the Sahel. In Central Asia, Soviet irrigation for cotton drained the Aral Sea.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Rapid population growth and industrialization increased demand for energy, land, and water, which accelerated environmental damage.",
        },
      ],
      takeaway: "Human activity changed the environment on a global scale after 1900.",
      sourceIds: ["ced-topic-9-3"],
    },
    {
      id: "environmental-debates",
      title: "Debating responses",
      conceptTitle: "Debating responses",
      lenses: ["In", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Environmental movements grew after 1960. In 1970, millions marked the first Earth Day in the United States. In Kenya, Wangari Maathai's Green Belt Movement organized women to plant trees.",
        },
        {
          type: "paragraph",
          text: "International agreements followed. The Kyoto Protocol of 1997 required cuts only from wealthy countries; developing countries argued that rich nations had caused most emissions and that poor nations needed to grow. The Paris Agreement of 2015 asked almost every country to set targets.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Debates over the environment were not only scientific. They were also about fairness: who caused the damage, who should pay, and whether limits would slow development.",
        },
      ],
      takeaway:
        "Responses to environmental change raised questions about fairness between rich and poor nations.",
      sourceIds: ["ced-topic-9-3"],
    },
  ],
  vocabulary: [
    {
      id: "greenhouse-gases",
      topicId: "world-9-3",
      term: "greenhouse gases",
      definition: "Gases such as carbon dioxide that trap heat in the atmosphere.",
    },
    {
      id: "climate-change",
      topicId: "world-9-3",
      term: "climate change",
      definition:
        "The long-term warming of the planet and shifts in weather patterns, driven largely by greenhouse gases from human activity.",
    },
    {
      id: "deforestation",
      topicId: "world-9-3",
      term: "deforestation",
      definition:
        "The large-scale clearing of forests for farming, timber, or settlement.",
    },
    {
      id: "green-belt-movement",
      topicId: "world-9-3",
      term: "Green Belt Movement",
      definition:
        "The Kenyan movement founded by Wangari Maathai in 1977 that organized women to plant trees.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-9-greenhouse-gases",
      "world-9-climate-change",
      "world-9-deforestation",
      "world-9-green-belt-movement",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 5 bridge",
      title: "Fossil fuels",
      body: "The fossil fuels that powered the Industrial Revolution are the main source of the greenhouse gases driving climate change.",
      transferQuestion:
        "How did industrialization contribute to environmental debates after 1900?",
      feedback: "Connect a specific energy source to a specific environmental effect.",
      links: [
        {
          topicId: "world-9-3",
          sectionId: "environmental-change",
          label: "Review a changing planet",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-9-3", "ced"],
};

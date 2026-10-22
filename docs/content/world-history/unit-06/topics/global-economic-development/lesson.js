// Original Page One lesson for CED Topic 6.4.

export const lesson = {
  schemaVersion: 1,
  id: "world-6-4",
  unitId: "world-6",
  courseId: "world",
  code: "6.4",
  title: "Global Economic Development from 1750 to 1900",
  period: "c. 1750–1900",
  status: "ready",
  order: 4,
  summary:
    "How industrial demand for raw materials and food reshaped economies around the world, and how new technology connected them.",
  minutes: 9,
  learningGoals: [
    "Explain how various environmental factors contributed to the development of the global economy from 1750 to 1900.",
    "Explain how export economies developed in colonized and independent regions.",
  ],
  bigIdea:
    "Industrial demand turned many regions into exporters of raw materials and food, linking them to industrial markets but leaving them dependent on a few products.",
  context:
    "Railroads, steamships, telegraphs, and refrigeration created a truly global economy in which distant regions specialized in particular goods.",
  sections: [
    {
      id: "raw-materials",
      title: "Raw materials for industry",
      conceptTitle: "Raw materials for industry",
      lenses: ["E", "In"],
      blocks: [
        {
          type: "paragraph",
          text: "Egypt and India grew cotton for British mills. Rubber came from the Amazon and the Congo, and palm oil from West Africa was used for soap and machine lubricants. Peru exported guano, bird droppings used as fertilizer.",
        },
        {
          type: "paragraph",
          text: "In the Congo Free State, workers who failed to meet rubber quotas were beaten or mutilated.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Factories demanded raw materials, which led colonial governments and companies to reorganize land and labor around exports.",
        },
      ],
      takeaway: "Industrial demand reshaped economies around raw material exports.",
      sourceIds: ["ced-topic-6-4"],
    },
    {
      id: "export-economies",
      title: "Export economies and dependence",
      conceptTitle: "Export economies and dependence",
      lenses: ["E", "T"],
      blocks: [
        {
          type: "paragraph",
          text: "Refrigerated steamships, introduced in the 1870s and 1880s, let Argentina export beef and wheat to Europe. Foreign investors financed railroads that carried crops to ports.",
        },
        {
          type: "paragraph",
          text: "Many economies came to depend on one or two exports. When world prices fell, they suffered, and land once used for food was given over to export crops.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Export growth did not mean balanced development. Many economies became dependent on foreign markets and capital.",
        },
      ],
      takeaway: "Global trade brought wealth to some exporters and dependence to many.",
      sourceIds: ["ced-topic-6-4"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Within Unit 6",
      title: "Economic imperialism",
      body: "Topic 6.5 shows how industrial powers used investment and force to open markets, even without formal colonies.",
      transferQuestion:
        "How could a country be economically dependent without being a colony?",
      feedback: "Use Argentina or another Latin American example.",
      links: [
        {
          topicId: "world-6-5",
          sectionId: "latin-investment",
          label: "Review foreign investment",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-6-4", "ced"],
};

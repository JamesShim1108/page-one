// Original Page One lesson for CED Topic 5.4.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-4",
  unitId: "world-5",
  courseId: "world",
  code: "5.4",
  title: "Industrialization Spreads in the Period from 1750 to 1900",
  period: "c. 1750–1900",
  status: "ready",
  order: 4,
  summary:
    "How industrialization spread to western Europe, the United States, Russia, and Japan, and how it hurt older manufacturing in places such as India.",
  minutes: 9,
  learningGoals: [
    "Explain how different modes and locations of production developed and changed over time.",
    "Explain how industrialization affected older manufacturing regions.",
  ],
  bigIdea:
    "Industrialization spread unevenly, making some countries powerful producers while older manufacturing centers such as India's textile industry declined.",
  context:
    "Britain tried to keep its machines and methods secret, but skilled workers and plans spread, and other governments and entrepreneurs copied British success.",
  sections: [
    {
      id: "spread-west",
      title: "Europe, the United States, and beyond",
      conceptTitle: "Europe, the United States, and beyond",
      lenses: ["E", "T"],
      blocks: [
        {
          type: "paragraph",
          text: "Belgium, France, and the German states began industrializing in the early 1800s. By 1900 Germany and the United States produced more steel than Britain.",
        },
        {
          type: "paragraph",
          text: "Russia and Japan industrialized rapidly in the late 1800s with heavy government involvement. Japan became Asia's leading industrial power.",
        },
      ],
      takeaway:
        "Industrialization spread from Britain, often with government support in late industrializers.",
      sourceIds: ["ced-topic-5-4"],
    },
    {
      id: "deindustrialization",
      title: "Decline of older industries",
      conceptTitle: "Decline of older industries",
      lenses: ["E", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Machine-made British cloth flooded markets in India, where hand spinners and weavers had supplied much of the world's cotton cloth. India became an exporter of raw cotton instead.",
        },
        {
          type: "paragraph",
          text: "Shifts like this, sometimes called deindustrialization, turned some regions into suppliers of raw materials for industrial countries.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Cheap factory goods undersold handmade cloth, which ruined many artisans and pushed colonies to export raw materials instead.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Industrialization did not make every region richer. It often turned colonies into suppliers of raw materials.",
        },
      ],
      takeaway: "Industrial growth in some places caused decline in others.",
      sourceIds: ["ced-topic-5-4"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "Raw materials and empire",
      body: "Industrial countries needed raw materials and markets, a need that drove the new imperialism studied in Unit 6.",
      transferQuestion: "How might industrialization encourage imperial expansion?",
      feedback: "Explain the link between factories, raw materials, and colonies.",
      links: [
        {
          topicId: "world-5-4",
          sectionId: "deindustrialization",
          label: "Review deindustrialization",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-4", "ced"],
};

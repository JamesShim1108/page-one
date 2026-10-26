// Original Page One lesson for CED Topic 5.3.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-3",
  unitId: "world-5",
  courseId: "world",
  code: "5.3",
  title: "Industrial Revolution Begins",
  period: "c. 1750–1900",
  status: "ready",
  order: 3,
  summary:
    "Why industrial production began in Britain, and how machines, steam power, and factories transformed textile manufacturing.",
  minutes: 10,
  learningGoals: [
    "Explain how environmental factors contributed to industrialization from 1750 to 1900.",
    "Explain how the factory system and new machines changed production.",
  ],
  bigIdea:
    "Industrialization began in Britain because of coal and iron, agricultural change, capital, and overseas trade, and it transformed production through machines and factories.",
  context:
    "Before 1750, goods were made by hand in homes and workshops, often in the putting-out system. Most energy came from muscles, water, wind, and wood.",
  sections: [
    {
      id: "why-britain",
      title: "Why Britain",
      conceptTitle: "Why Britain",
      lenses: ["In", "E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Britain had coal and iron ore near rivers and ports. Agricultural improvements and the enclosure of common lands raised food output and pushed rural laborers toward towns, creating a workforce for factories.",
        },
        {
          type: "paragraph",
          text: "Merchants had capital from trade, including the Atlantic trade, and banks and a stable government protected investments. Colonies supplied raw cotton and markets for finished goods.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Cheap coal, available labor, capital, and colonial markets made machines profitable, so British entrepreneurs invested in mechanized production first.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "No single factor explains why industrialization began in Britain. Strong answers combine resources, labor, capital, and markets.",
        },
      ],
      takeaway:
        "A combination of resources, labor, capital, and global trade made Britain the first industrial nation.",
      sourceIds: ["ced-topic-5-3"],
    },
    {
      id: "factories-textiles",
      title: "Machines and factories",
      conceptTitle: "Machines and factories",
      lenses: ["T", "E", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "The spinning jenny and Richard Arkwright's water frame mechanized cotton spinning in the 1760s. Arkwright's mills brought workers under one roof on fixed hours, creating the factory system.",
        },
        {
          type: "paragraph",
          text: "Steam engines freed factories from rivers. Mills moved into cities such as Manchester, near coal and workers, and production rose dramatically.",
        },
      ],
      takeaway:
        "Mechanized textile mills were the first industry to adopt the factory system.",
      sourceIds: ["ced-topic-5-3"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 4 bridge",
      title: "Atlantic trade and industry",
      body: "Profits and raw cotton from the Atlantic economy, including slave-grown cotton, fed British industry.",
      transferQuestion:
        "How did the Atlantic economy contribute to British industrialization?",
      feedback: "Name a specific link such as cotton or capital and explain it.",
      links: [
        {
          topicId: "world-4-5",
          sectionId: "atlantic-slave-trade",
          label: "Review the Atlantic economy",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-3", "ced"],
};

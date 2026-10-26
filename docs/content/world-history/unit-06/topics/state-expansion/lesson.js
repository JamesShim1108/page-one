// Original Page One lesson for CED Topic 6.2.

export const lesson = {
  schemaVersion: 1,
  id: "world-6-2",
  unitId: "world-6",
  courseId: "world",
  code: "6.2",
  title: "State Expansion from 1750 to 1900",
  period: "c. 1750–1900",
  status: "ready",
  order: 2,
  summary:
    "How European states, Japan, the United States, and Russia expanded their empires through conquest, settler colonies, and stronger control of existing colonies.",
  minutes: 11,
  learningGoals: [
    "Compare processes by which state power shifted in various parts of the world from 1750 to 1900.",
    "Explain how and why Africa was partitioned among European powers.",
  ],
  bigIdea:
    "Industrial states strengthened their hold on older colonies and seized new territory, especially in Africa, while Japan, the United States, and Russia built empires of their own.",
  context:
    "In 1880, most of Africa was ruled by Africans. Within a generation, almost all of it had been divided among European powers.",
  sections: [
    {
      id: "scramble-africa",
      title: "The partition of Africa",
      conceptTitle: "The partition of Africa",
      lenses: ["P", "T"],
      blocks: [
        {
          type: "paragraph",
          text: "At the Berlin Conference of 1884 to 1885, European powers set rules for claiming African land; no African rulers attended. By 1914, Europeans controlled about 90 percent of Africa. Only Ethiopia and Liberia stayed independent.",
        },
        {
          type: "paragraph",
          text: "Machine guns, steamships, railroads, and quinine against malaria gave Europeans a decisive advantage. King Leopold II of Belgium ruled the Congo Free State as a personal colony from 1885 to 1908.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Industrial technology lowered the cost of conquest, and rivalry among European powers sped up the race for territory.",
        },
      ],
      takeaway:
        "Technology and rivalry let Europeans partition Africa in a single generation.",
      sourceIds: ["ced-topic-6-2"],
    },
    {
      id: "existing-colonies",
      title: "Tightening control and settler colonies",
      conceptTitle: "Tightening control and settler colonies",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Britain took direct control of India from the East India Company in 1858. The Netherlands tightened control of Indonesia, forcing farmers to grow export crops. In settler colonies such as Australia and New Zealand, British settlers took Indigenous land.",
        },
      ],
      takeaway: "Older empires turned trading presences into direct colonial rule.",
      sourceIds: ["ced-topic-6-2"],
    },
    {
      id: "new-empires",
      title: "Japan, the United States, and Russia",
      conceptTitle: "Japan, the United States, and Russia",
      lenses: ["P"],
      blocks: [
        {
          type: "paragraph",
          text: "Japan took Taiwan in 1895 and annexed Korea in 1910. The United States annexed Hawaii and took the Philippines from Spain in 1898. Russia conquered much of Central Asia.",
        },
        {
          type: "paragraph",
          text: "Siam, present-day Thailand, stayed independent as a buffer between British and French colonies, while its kings modernized the state.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Imperialism was not only European. Japan and the United States built empires with similar methods and justifications.",
        },
      ],
      takeaway: "Non-European industrial powers also became imperial powers.",
      sourceIds: ["ced-topic-6-2"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 4 bridge",
      title: "From trading posts to colonies",
      body: "In Unit 4, Europeans held coastal trading posts in Africa and Asia. Industrial technology let them move inland and rule directly.",
      transferQuestion:
        "How did European control of Africa in 1900 differ from European presence in 1700?",
      feedback: "Compare coastal posts with territorial rule and explain the change.",
      links: [
        {
          topicId: "world-4-4",
          sectionId: "african-states",
          label: "Review African states and Atlantic trade",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-6-2", "ced"],
};

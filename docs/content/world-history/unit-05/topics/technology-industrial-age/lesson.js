// Original Page One lesson for CED Topic 5.5.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-5",
  unitId: "world-5",
  courseId: "world",
  code: "5.5",
  title: "Technology of the Industrial Age",
  period: "c. 1750–1900",
  status: "ready",
  order: 5,
  summary:
    "How steam engines, railroads, steamships, the telegraph, and later steel and electricity transformed production, transport, and communication.",
  minutes: 8,
  learningGoals: [
    "Explain how technology shaped economic production over time.",
    "Distinguish the first industrial technologies from the second wave after 1850.",
  ],
  bigIdea:
    "New energy sources and machines transformed how goods were made and moved and how information traveled.",
  context:
    "The steam engine was the key early technology. Later, steel, electricity, and chemistry produced a second wave of industrial change.",
  sections: [
    {
      id: "steam-transport",
      title: "Steam and transport",
      conceptTitle: "Steam and transport",
      lenses: ["T", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "James Watt's improvements to the steam engine made it far more efficient. Steam powered factories, then locomotives and ships. The Liverpool and Manchester Railway opened in 1830.",
        },
        {
          type: "paragraph",
          text: "Railroads and steamships lowered transport costs and tied distant regions into national and global markets. The telegraph sent messages almost instantly; a transatlantic cable worked from 1866.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Cheaper and faster transport and communication expanded markets, which encouraged larger factories and more specialized production.",
        },
      ],
      takeaway: "Steam and electricity shrank distances for goods and information.",
      sourceIds: ["ced-topic-5-5"],
    },
    {
      id: "second-industrial",
      title: "A second wave",
      conceptTitle: "A second wave",
      lenses: ["T"],
      blocks: [
        {
          type: "paragraph",
          text: "After 1850, the Bessemer process made steel cheap. Electricity, chemicals, and the internal combustion engine created new industries.",
        },
        {
          type: "paragraph",
          text: "Germany and the United States led many of these industries, investing in research laboratories and engineers.",
        },
      ],
      takeaway:
        "Science-based industries made Germany and the United States industrial leaders.",
      sourceIds: ["ced-topic-5-5"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 4 bridge",
      title: "From sail to steam",
      body: "Unit 4 described ships that depended on winds and currents. Steamships freed ocean travel from the wind.",
      transferQuestion:
        "How did steamships change ocean travel compared with sailing ships?",
      feedback: "Compare dependence on wind and the speed or reliability of voyages.",
      links: [
        {
          topicId: "world-4-1",
          sectionId: "winds-currents",
          label: "Review sailing technology",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-5", "ced"],
};

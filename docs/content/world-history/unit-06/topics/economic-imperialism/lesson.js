// Original Page One lesson for CED Topic 6.5.

export const lesson = {
  schemaVersion: 1,
  id: "world-6-5",
  unitId: "world-6",
  courseId: "world",
  code: "6.5",
  title: "Economic Imperialism from 1750 to 1900",
  period: "c. 1750–1900",
  status: "ready",
  order: 5,
  summary:
    "How industrial powers used war, unequal treaties, and investment to gain economic control, as in China and Latin America.",
  minutes: 9,
  learningGoals: [
    "Explain how and why industrial states used economic imperialism.",
    "Explain the causes and effects of the Opium Wars.",
  ],
  bigIdea:
    "Industrial powers could dominate other states economically through force, unequal treaties, and investment without ruling them as colonies.",
  context:
    "Formal colonies were not the only form of empire. In China and Latin America, foreign powers gained profits and influence while local governments remained in place.",
  sections: [
    {
      id: "opium-wars",
      title: "The Opium Wars",
      conceptTitle: "The Opium Wars",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "British merchants sold opium from India to China. When Qing official Lin Zexu destroyed opium stocks in 1839, Britain went to war and won. The Treaty of Nanjing in 1842 gave Hong Kong to Britain and opened ports to foreign trade.",
        },
        {
          type: "paragraph",
          text: "A second war from 1856 to 1860 opened more ports. These unequal treaties weakened Qing authority and let foreign powers carve out spheres of influence.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Britain's desire to sell opium and open Chinese markets led to war, which produced unequal treaties that weakened the Qing state.",
        },
      ],
      takeaway: "Industrial military power forced China open on unequal terms.",
      sourceIds: ["ced-topic-6-5"],
    },
    {
      id: "latin-investment",
      title: "Investment in Latin America",
      conceptTitle: "Investment in Latin America",
      lenses: ["E"],
      blocks: [
        {
          type: "paragraph",
          text: "Independent Latin American nations relied heavily on foreign investment. British investors financed railroads and mines, and American companies built banana plantations in Central America with great influence over governments.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Economic imperialism did not require formal colonies. Latin American states were independent yet economically dependent.",
        },
      ],
      takeaway:
        "Foreign investment gave industrial powers influence without colonial rule.",
      sourceIds: ["ced-topic-6-5"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 4 bridge",
      title: "From silver to opium",
      body: "In Unit 4, silver flowed into China to pay for Chinese goods. British opium sales reversed that flow.",
      transferQuestion: "How did the opium trade change the direction of silver flows?",
      feedback: "Compare the earlier silver trade with the opium trade.",
      links: [
        {
          topicId: "world-4-5",
          sectionId: "silver-trade",
          label: "Review the silver trade",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-6-5", "ced"],
};

// Original Page One lesson for CED Topic 7.1. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-07.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-7-1",
  unitId: "world-7",
  courseId: "world",
  code: "7.1",
  title: "Shifting Power After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 1,
  summary:
    "How the Qing, Ottoman, and Russian empires collapsed and how revolutions in China, Russia, and Mexico challenged the old order.",
  minutes: 10,
  learningGoals: [
    "Explain how internal and external factors contributed to change in various states after 1900.",
    "Explain the causes of the collapse of empires and the revolutions in Russia, China, and Mexico.",
  ],
  bigIdea:
    "Long-established empires and regimes collapsed after 1900 under the pressure of war, foreign intervention, and revolutionary movements.",
  context:
    "By 1900, the Qing, Ottoman, and Russian empires had suffered defeats and faced demands for reform from within.",
  sections: [
    {
      id: "empires-collapse",
      title: "The collapse of empires",
      conceptTitle: "The collapse of empires",
      lenses: ["P"],
      blocks: [
        {
          type: "paragraph",
          text: "The Qing dynasty, weakened by foreign defeats and the Boxer Rebellion, fell in a revolution in 1911; the last emperor abdicated in 1912. Sun Yat-sen led the new Republic of China, but warlords controlled much of the country.",
        },
        {
          type: "paragraph",
          text: "The Ottoman Empire, defeated in World War I, ended in 1922, and Mustafa Kemal founded the Republic of Turkey in 1923.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The end of an empire did not produce a stable state at once. China and Turkey faced years of conflict and reform.",
        },
      ],
      takeaway:
        "Defeat and internal pressure brought down empires that had lasted for centuries.",
      sourceIds: ["ced-topic-7-1"],
    },
    {
      id: "revolutions",
      title: "Revolutions in Russia and Mexico",
      conceptTitle: "Revolutions in Russia and Mexico",
      lenses: ["P", "S", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "In Russia, war losses and food shortages led the tsar to abdicate in March 1917. In November, the Bolsheviks under Lenin seized power, promising peace, land, and bread. After a civil war, they founded the Soviet Union in 1922.",
        },
        {
          type: "paragraph",
          text: "The Mexican Revolution began in 1910 against the dictator Porfirio Díaz. Leaders such as Emiliano Zapata demanded land for peasants, and the Constitution of 1917 promised land reform and national control of resources.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Inequality, war, and hunger discredited old rulers, which allowed revolutionary movements promising land and bread to win support.",
        },
      ],
      takeaway:
        "Revolutions in Russia and Mexico promised land and social change to peasants and workers.",
      sourceIds: ["ced-topic-7-1"],
    },
  ],
  vocabulary: [
    {
      id: "bolsheviks",
      topicId: "world-7-1",
      term: "Bolsheviks",
      definition:
        "The Russian Marxist party led by Lenin that seized power in November 1917.",
    },
    {
      id: "warlords",
      topicId: "world-7-1",
      term: "warlords",
      definition:
        "Regional military leaders who controlled much of China after the fall of the Qing.",
    },
    {
      id: "mexican-revolution",
      topicId: "world-7-1",
      term: "Mexican Revolution",
      definition:
        "The revolution that began in 1910 against Porfirio Díaz and produced the Constitution of 1917.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-7-bolsheviks", "world-7-warlords", "world-7-mexican-revolution"],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 6 bridge",
      title: "From reform to revolution",
      body: "Unit 6 described the Self-Strengthening Movement and the Opium Wars. When reforms failed to protect China, revolutionaries turned against the Qing.",
      transferQuestion: "How did foreign pressure contribute to the fall of the Qing?",
      feedback: "Name a specific defeat and explain its effect on Qing legitimacy.",
      links: [
        {
          topicId: "world-6-5",
          sectionId: "opium-wars",
          label: "Review the Opium Wars",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-7-1", "ced"],
};

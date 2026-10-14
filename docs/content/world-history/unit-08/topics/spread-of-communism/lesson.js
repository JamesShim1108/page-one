// Original Page One lesson for CED Topic 8.4. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-08.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-8-4",
  unitId: "world-8",
  courseId: "world",
  code: "8.4",
  title: "Spread of Communism After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 4,
  summary:
    "How communist and socialist movements won power in China, Cuba, and Vietnam, and how land reform shaped them.",
  minutes: 9,
  learningGoals: [
    "Explain the causes and consequences of China's communist revolution.",
    "Explain how movements to redistribute land and resources developed in the twentieth century.",
  ],
  bigIdea:
    "Communism spread most where peasants wanted land and nationalists wanted independence, but its rapid transformations often caused enormous suffering.",
  context:
    "By the mid-twentieth century, most people in Asia, Africa, and Latin America were poor farmers, and many did not own the land they worked.",
  sections: [
    {
      id: "chinese-revolution",
      title: "The Chinese Revolution",
      conceptTitle: "The Chinese Revolution",
      lenses: ["P", "S", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "The Chinese Communist Party, led by Mao Zedong, fought the Nationalist government of Chiang Kai-shek for more than two decades. Mao built support among peasants, who were the vast majority of the population, by promising land. The Communists won the civil war, and in 1949 Mao proclaimed the People's Republic of China.",
        },
        {
          type: "paragraph",
          text: "The new government carried out land reform, taking land from landlords and redistributing it to peasants, then organized farms into collectives. The Great Leap Forward of 1958 to 1962 tried to industrialize China rapidly, but it caused a famine that killed tens of millions. The Cultural Revolution of 1966 to 1976 mobilized young Red Guards to attack teachers, officials, and traditional culture.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Unlike Marx's prediction, communism in China came to power through a peasant revolution, not through industrial workers.",
        },
      ],
      takeaway:
        "Communists won China by promising land to peasants, but Mao's campaigns caused famine and upheaval.",
      sourceIds: ["ced-topic-8-4"],
    },
    {
      id: "land-and-revolution",
      title: "Land reform and revolution elsewhere",
      conceptTitle: "Land reform and revolution elsewhere",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "In Vietnam, Ho Chi Minh combined communism with nationalism, fighting first France and then the United States. In Cuba, Fidel Castro's revolution of 1959 seized large estates and nationalized US-owned businesses, and Cuba became a Soviet ally.",
        },
        {
          type: "paragraph",
          text: "Land reform was not always communist. In Guatemala, an elected government began redistributing unused land in 1952, but a US-backed coup overthrew it in 1954. The United States often saw land reform as a step toward communism.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Unequal land ownership made revolutionary promises appealing to peasants, and Cold War fears led the United States to oppose many reform movements.",
        },
      ],
      takeaway:
        "Demands for land fueled revolutions, and the Cold War shaped how the superpowers responded.",
      sourceIds: ["ced-topic-8-4"],
    },
  ],
  vocabulary: [
    {
      id: "mao-zedong",
      topicId: "world-8-4",
      term: "Mao Zedong",
      definition:
        "Leader of the Chinese Communist Party who founded the People's Republic of China in 1949.",
    },
    {
      id: "land-reform",
      topicId: "world-8-4",
      term: "land reform",
      definition:
        "The redistribution of land from large landowners to peasants or the state.",
    },
    {
      id: "great-leap-forward",
      topicId: "world-8-4",
      term: "Great Leap Forward",
      definition:
        "Mao's 1958–1962 campaign to industrialize China rapidly, which caused a famine that killed tens of millions.",
    },
    {
      id: "cultural-revolution",
      topicId: "world-8-4",
      term: "Cultural Revolution",
      definition:
        "Mao's 1966–1976 campaign in which Red Guards attacked officials, teachers, and traditional culture.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-8-mao-zedong",
      "world-8-land-reform",
      "world-8-great-leap-forward",
      "world-8-cultural-revolution",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 7 bridge",
      title: "From the Russian Revolution",
      body: "The Bolshevik Revolution of 1917 created the first communist state, which later aided communist movements in China, Vietnam, and Cuba.",
      transferQuestion: "Compare the Russian and Chinese communist revolutions.",
      feedback:
        "Name one similarity, such as promises of land, and one difference, such as the role of peasants.",
      links: [
        {
          topicId: "world-7-1",
          sectionId: "revolutions",
          label: "Review the Russian Revolution",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-8-4", "ced"],
};

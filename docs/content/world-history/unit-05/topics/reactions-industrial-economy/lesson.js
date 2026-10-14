// Original Page One lesson for CED Topic 5.8. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-05.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-8",
  unitId: "world-5",
  courseId: "world",
  code: "5.8",
  title: "Reactions to the Industrial Economy from 1750 to 1900",
  period: "c. 1750–1900",
  status: "ready",
  order: 8,
  summary:
    "How workers, socialists, and governments responded to industrial capitalism, and how China and the Ottoman Empire attempted reform.",
  minutes: 10,
  learningGoals: [
    "Explain the causes and effects of calls for changes in industrial societies.",
    "Explain how some states attempted reforms in response to industrial powers.",
  ],
  bigIdea:
    "Industrial capitalism produced workers' movements, socialist ideas, and government reforms, while states facing industrial powers attempted reforms of their own.",
  context:
    "Long hours, low wages, and dangerous conditions led workers to organize. Thinkers debated whether reform or revolution was the answer.",
  sections: [
    {
      id: "workers-movements",
      title: "Workers and reform",
      conceptTitle: "Workers and reform",
      lenses: ["S", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Luddites smashed machines in Britain between 1811 and 1816. Over time, workers formed labor unions to bargain for better wages and hours. Chartists demanded voting rights for all men.",
        },
        {
          type: "paragraph",
          text: "Britain's Factory Act of 1833 limited child labor, and voting rights expanded in 1867 and 1884.",
        },
      ],
      takeaway: "Workers organized, and governments gradually responded with reforms.",
      sourceIds: ["ced-topic-5-8"],
    },
    {
      id: "socialism",
      title: "Socialism and Marxism",
      conceptTitle: "Socialism and Marxism",
      lenses: ["C", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Socialists argued that workers or society as a whole should own the means of production. Karl Marx and Friedrich Engels published the Communist Manifesto in 1848, arguing that history was a struggle between classes and predicting a workers' revolution.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Harsh factory conditions and inequality led critics to argue that capitalism itself must change, which produced socialist and communist movements.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Not all socialists were revolutionaries. Many sought change through elections, unions, and laws.",
        },
      ],
      takeaway: "Marxism offered a revolutionary critique of industrial capitalism.",
      sourceIds: ["ced-topic-5-8"],
    },
    {
      id: "state-reforms",
      title: "Reform in China and the Ottoman Empire",
      conceptTitle: "Reform in China and the Ottoman Empire",
      lenses: ["P", "T"],
      blocks: [
        {
          type: "paragraph",
          text: "China's Self-Strengthening Movement of the 1860s built arsenals and shipyards while keeping Confucian institutions. Defeat by Japan in 1895 exposed its limits.",
        },
        {
          type: "paragraph",
          text: "The Ottoman Tanzimat reforms of 1839 to 1876 reorganized the army, courts, and schools and declared legal equality for all subjects.",
        },
      ],
      takeaway:
        "Reforms in China and the Ottoman Empire borrowed Western methods but faced resistance and limited success.",
      sourceIds: ["ced-topic-5-8"],
    },
  ],
  vocabulary: [
    {
      id: "labor-unions",
      topicId: "world-5-8",
      term: "labor unions",
      definition:
        "Organizations of workers formed to bargain with employers for better wages, hours, and conditions.",
    },
    {
      id: "socialism",
      topicId: "world-5-8",
      term: "Socialism",
      definition:
        "An economic and political system in which workers or society as a whole own the means of production.",
    },
    {
      id: "self-strengthening-movement",
      topicId: "world-5-8",
      term: "Self-Strengthening Movement",
      definition:
        "A Qing reform effort of the 1860s to the 1890s that adopted Western military technology while preserving Confucian institutions.",
    },
    {
      id: "tanzimat",
      topicId: "world-5-8",
      term: "Tanzimat",
      definition:
        "Ottoman reforms from 1839 to 1876 that modernized the army, courts, and schools and declared legal equality for subjects.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-5-labor-unions",
      "world-5-socialism",
      "world-5-self-strengthening-movement",
      "world-5-tanzimat",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "Communism in the 1900s",
      body: "Marx's ideas inspired revolutions in Russia and China in the 1900s, studied in Units 7 and 8.",
      transferQuestion:
        "Why might Marx's ideas appeal to people in agrarian societies such as Russia or China?",
      feedback: "Connect inequality and revolutionary promises to those societies.",
      links: [
        {
          topicId: "world-5-8",
          sectionId: "socialism",
          label: "Review socialism",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-8", "ced"],
};

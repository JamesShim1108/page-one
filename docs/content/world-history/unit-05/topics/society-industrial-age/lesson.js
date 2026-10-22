// Original Page One lesson for CED Topic 5.9.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-9",
  unitId: "world-5",
  courseId: "world",
  code: "5.9",
  title: "Society and the Industrial Age",
  period: "c. 1750–1900",
  status: "ready",
  order: 9,
  summary:
    "How industrialization created new social classes, changed family and gender roles, and transformed cities.",
  minutes: 9,
  learningGoals: [
    "Explain the continuities and changes in social hierarchies and family life caused by industrialization.",
    "Explain how urbanization affected living conditions.",
  ],
  bigIdea:
    "Industrialization created a new working class and middle class, changed family and gender roles, and produced crowded cities with new problems.",
  context:
    "Factory work separated home from workplace. Millions moved from countryside to city in search of work.",
  sections: [
    {
      id: "new-classes",
      title: "New social classes",
      conceptTitle: "New social classes",
      lenses: ["S"],
      blocks: [
        {
          type: "paragraph",
          text: "The industrial working class labored in factories and mines for wages, often twelve hours a day or more. A growing middle class of managers, professionals, and shopkeepers gained wealth and influence.",
        },
        {
          type: "paragraph",
          text: "Middle-class writers praised hard work, thrift, and self-improvement. Samuel Smiles's Self-Help, published in 1859, became a best seller.",
        },
      ],
      takeaway:
        "Industrialization reshaped social hierarchy around wages and property rather than birth.",
      sourceIds: ["ced-topic-5-9"],
    },
    {
      id: "family-cities",
      title: "Family life and cities",
      conceptTitle: "Family life and cities",
      lenses: ["S", "In"],
      blocks: [
        {
          type: "paragraph",
          text: "Women and children worked in mills for lower pay than men. Middle-class families often followed the ideal of separate spheres, in which men earned wages and women managed the home.",
        },
        {
          type: "paragraph",
          text: "Rapid urbanization meant that cities grew faster than housing and sanitation. Crowded tenements and polluted water spread diseases such as cholera, which led to public health reforms later in the century.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Rapid migration to cities overwhelmed housing and water systems, which spread disease and eventually pushed governments to build sewers and clean water supplies.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Separate spheres was a middle-class ideal. Most working-class women still had to work for wages.",
        },
      ],
      takeaway: "Urban industrial life brought new opportunities and serious hardships.",
      sourceIds: ["ced-topic-5-9"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Within Unit 5",
      title: "Conditions and reform",
      body: "Harsh conditions in industrial cities helped produce the unions, socialism, and reforms described in Topic 5.8.",
      transferQuestion: "How did working conditions contribute to reform movements?",
      feedback: "Link a specific condition to a specific response.",
      links: [
        {
          topicId: "world-5-8",
          sectionId: "workers-movements",
          label: "Review workers' movements",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-9", "ced"],
};

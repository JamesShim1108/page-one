// Original Page One lesson for CED Topic 7.3.

export const lesson = {
  schemaVersion: 1,
  id: "world-7-3",
  unitId: "world-7",
  courseId: "world",
  code: "7.3",
  title: "Conducting World War I",
  period: "c. 1900–present",
  status: "ready",
  order: 3,
  summary:
    "How governments waged total war, how new weapons created stalemate, and how colonial peoples were drawn into the fighting.",
  minutes: 9,
  learningGoals: ["Explain how governments used a variety of methods to conduct war."],
  bigIdea:
    "World War I was a total war in which governments mobilized entire societies and empires, and industrial weapons produced unprecedented casualties.",
  context:
    "Generals expected a short war. Instead, industrial weapons created a long, deadly stalemate.",
  sections: [
    {
      id: "total-war",
      title: "Total war",
      conceptTitle: "Total war",
      lenses: ["P", "S", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "In total war, governments directed industry, rationed food, and drafted millions. Women took jobs in factories and transportation. Propaganda portrayed enemies as monstrous and urged civilians to support the war.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Because the war required vast amounts of weapons and soldiers, governments took control of economies, which drew women into new kinds of work.",
        },
      ],
      takeaway: "Total war mobilized entire societies.",
      sourceIds: ["ced-topic-7-3"],
    },
    {
      id: "trench-warfare",
      title: "Trenches and new weapons",
      conceptTitle: "Trenches and new weapons",
      lenses: ["T"],
      blocks: [
        {
          type: "paragraph",
          text: "Machine guns and artillery forced armies into trenches on the Western Front. Attacks across open ground killed hundreds of thousands. Poison gas, used on a large scale from 1915, and tanks, from 1916, did not end the stalemate.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "New weapons did not bring quick victory. Most new technologies added to the killing without breaking the stalemate.",
        },
      ],
      takeaway:
        "Industrial weapons made defense stronger than attack, producing a war of attrition.",
      sourceIds: ["ced-topic-7-3"],
    },
    {
      id: "empire-at-war",
      title: "Empires at war",
      conceptTitle: "Empires at war",
      lenses: ["P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "About 1.3 million Indian soldiers and laborers served Britain. France recruited troops from West Africa, North Africa, and Indochina, and China sent about 140,000 laborers to France.",
        },
        {
          type: "paragraph",
          text: "Many colonial soldiers expected rewards for their service. Disappointment after the war fed demands for self-government.",
        },
      ],
      takeaway:
        "Colonial participation in the war strengthened demands for independence.",
      sourceIds: ["ced-topic-7-3"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Within Unit 7",
      title: "From one war to the next",
      body: "Total war returned on an even larger scale in World War II, studied in Topic 7.7.",
      transferQuestion: "Compare total war in World War I with World War II.",
      feedback:
        "Name a similarity in mobilization and a difference in the targeting of civilians.",
      links: [
        {
          topicId: "world-7-7",
          sectionId: "wwii-mobilization",
          label: "Review total war in World War II",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-7-3", "ced"],
};

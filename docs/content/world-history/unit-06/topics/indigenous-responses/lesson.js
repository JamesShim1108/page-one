// Original Page One lesson for CED Topic 6.3. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-06.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-6-3",
  unitId: "world-6",
  courseId: "world",
  code: "6.3",
  title: "Indigenous Responses to State Expansion from 1750 to 1900",
  period: "c. 1750–1900",
  status: "ready",
  order: 3,
  summary:
    "How colonized and Indigenous peoples resisted through rebellion, warfare, religious movements, and the defense of independent states.",
  minutes: 10,
  learningGoals: [
    "Explain the ways in which Indigenous peoples responded to state expansion from 1750 to 1900.",
    "Compare armed, political, and religious forms of resistance.",
  ],
  bigIdea:
    "Colonized peoples resisted imperial expansion in many ways, from armed rebellion to religious movements, with outcomes that ranged from crushing defeat to preserved independence.",
  context:
    "Imperial expansion met resistance everywhere. Its forms depended on local leaders, beliefs, and the military balance.",
  sections: [
    {
      id: "armed-resistance",
      title: "Rebellion and war",
      conceptTitle: "Rebellion and war",
      lenses: ["P", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "In the Indian Rebellion of 1857, sepoys and civilians rose against East India Company rule. The revolt grew from land seizures, taxes, and fears for religion, and it was crushed by 1858.",
        },
        {
          type: "paragraph",
          text: "Some resisters won. Menelik II of Ethiopia armed his forces with modern rifles and defeated Italy at the Battle of Adwa in 1896, preserving Ethiopian independence. The Zulu kingdom defeated a British army at Isandlwana in 1879 but was conquered later that year.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Seizure of land and threats to religion and custom produced resentment, which became rebellion when a trigger such as the cartridge rumors appeared.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Resistance did not always fail. Ethiopia's victory at Adwa shows that a well-armed African state could defeat a European army.",
        },
      ],
      takeaway:
        "Armed resistance was widespread, and Ethiopia succeeded in keeping its independence.",
      sourceIds: ["ced-topic-6-3"],
    },
    {
      id: "religious-movements",
      title: "Religious movements",
      conceptTitle: "Religious movements",
      lenses: ["C", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Some peoples turned to prophecy. In the Xhosa cattle-killing movement of 1856 to 1857, followers killed their cattle believing ancestors would drive out the British; famine followed. The Ghost Dance of the 1880s promised Native Americans a restored world before US troops killed Lakota people at Wounded Knee in 1890.",
        },
        {
          type: "paragraph",
          text: "In China, the Taiping Rebellion of 1850 to 1864, led by a man who claimed to be the brother of Jesus, challenged the Qing dynasty and cost millions of lives.",
        },
      ],
      takeaway:
        "Religious movements expressed hope and resistance in the face of conquest and crisis.",
      sourceIds: ["ced-topic-6-3"],
    },
  ],
  vocabulary: [
    {
      id: "sepoys",
      topicId: "world-6-3",
      term: "sepoys",
      definition: "Indian soldiers in the army of the British East India Company.",
    },
    {
      id: "battle-of-adwa",
      topicId: "world-6-3",
      term: "Battle of Adwa",
      definition:
        "The 1896 battle in which Ethiopian forces under Menelik II defeated Italy, preserving Ethiopia's independence.",
    },
    {
      id: "ghost-dance",
      topicId: "world-6-3",
      term: "Ghost Dance",
      definition:
        "A Native American religious movement of the 1880s that promised the return of the buffalo and the old way of life.",
    },
    {
      id: "taiping-rebellion",
      topicId: "world-6-3",
      term: "Taiping Rebellion",
      definition:
        "A massive rebellion against the Qing dynasty from 1850 to 1864, led by Hong Xiuquan, that cost millions of lives.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-6-sepoys",
      "world-6-battle-of-adwa",
      "world-6-ghost-dance",
      "world-6-taiping-rebellion",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 4 bridge",
      title: "Earlier resistance",
      body: "Unit 4 described the Pueblo Revolt and Queen Nzinga's resistance. Resistance to empire had a long history before 1850.",
      transferQuestion: "Compare the Pueblo Revolt with the Indian Rebellion of 1857.",
      feedback: "Name a shared cause and a difference in outcome.",
      links: [
        {
          topicId: "world-4-6",
          sectionId: "colonial-resistance",
          label: "Review earlier resistance",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-6-3", "ced"],
};

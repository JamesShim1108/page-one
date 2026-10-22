// Original Page One lesson for CED Topic 4.3.

export const lesson = {
  schemaVersion: 1,
  id: "world-4-3",
  unitId: "world-4",
  courseId: "world",
  code: "4.3",
  title: "Columbian Exchange",
  period: "c. 1450–1750",
  status: "ready",
  order: 3,
  summary:
    "How the transfer of diseases, crops, and animals between hemispheres after 1492 transformed populations, diets, and environments.",
  minutes: 10,
  learningGoals: [
    "Explain the causes of the Columbian Exchange and its effects on the Eastern and Western Hemispheres.",
    "Explain how disease, crops, and animals changed populations and environments.",
  ],
  bigIdea:
    "The Columbian Exchange reunited the biology of two hemispheres, causing a catastrophic population collapse in the Americas and new food supplies in Afro-Eurasia.",
  context:
    "For thousands of years, the Americas and Afro-Eurasia had developed separate plants, animals, and diseases. After 1492, ships carried all three across the Atlantic.",
  sections: [
    {
      id: "disease",
      title: "Disease and demographic collapse",
      conceptTitle: "Disease and demographic collapse",
      lenses: ["In", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Smallpox, measles, and influenza had no history in the Americas, so Indigenous people had no acquired immunity. A smallpox epidemic struck Tenochtitlan in 1520. Historians estimate that the Indigenous population of the Americas fell by as much as 90 percent within a century.",
        },
        {
          type: "paragraph",
          text: "Disease combined with war, forced labor, and displacement. The collapse helped Spanish conquest and created labor shortages that colonists filled with enslaved Africans.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "New diseases killed huge numbers of Indigenous people, which weakened resistance to conquest and led colonists to import enslaved Africans to replace lost labor.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Disease was unintentional, but conquest, forced labor, and violence also caused deaths. A strong answer names both.",
        },
      ],
      takeaway:
        "Epidemic disease was the deadliest part of the exchange and shaped the labor systems that followed.",
      sourceIds: ["ced-topic-4-3"],
    },
    {
      id: "crops-animals",
      title: "Crops and animals",
      conceptTitle: "Crops and animals",
      lenses: ["In", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Maize, potatoes, and manioc, first grown in the Americas, became staple foods across Europe, Africa, and Asia. Some historians link them to population growth in the 1700s.",
        },
        {
          type: "paragraph",
          text: "Europeans brought wheat, sugarcane, horses, cattle, and pigs to the Americas. Horses changed hunting and warfare on the Great Plains, while grazing animals reshaped landscapes.",
        },
      ],
      takeaway:
        "New foods fed growing populations in Afro-Eurasia, and new animals transformed American environments.",
      sourceIds: ["ced-topic-4-3"],
    },
    {
      id: "environment-labor",
      title: "Plantations and the environment",
      conceptTitle: "Plantations and the environment",
      lenses: ["In", "E", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Sugarcane, originally from Asia, became the main plantation crop of Brazil and the Caribbean. Plantations cleared forests, exhausted soils, and relied on the forced labor of enslaved Africans.",
        },
        {
          type: "paragraph",
          text: "Enslaved Africans also brought knowledge and crops, including rice cultivation in parts of the Americas. The exchange moved people and knowledge, not only plants and animals.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The exchange was not equal. Indigenous Americans suffered population collapse, while Europeans gained land, crops, and wealth.",
        },
      ],
      takeaway:
        "Plantation agriculture linked the Columbian Exchange to slavery and environmental change.",
      sourceIds: ["ced-topic-4-3"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 2 bridge",
      title: "Disease along trade routes",
      body: "The plague spread along Afro-Eurasian trade routes in the 1300s. After 1492, ships carried Afro-Eurasian diseases to the Americas with even more devastating results.",
      transferQuestion:
        "Compare the spread of the plague in the 1300s with the spread of smallpox after 1492.",
      feedback:
        "Name a similarity in how disease traveled and a difference in its effects.",
      links: [
        {
          topicId: "world-2-6",
          sectionId: "pathogen-networks",
          label: "Review the plague",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-4-3", "ced"],
};

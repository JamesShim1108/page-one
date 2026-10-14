// Original Page One lesson for CED Topic 6.6. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-06.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-6-6",
  unitId: "world-6",
  courseId: "world",
  code: "6.6",
  title: "Causes of Migration in an Interconnected World",
  period: "c. 1750–1900",
  status: "ready",
  order: 6,
  summary:
    "Why millions of people migrated, including free migrants escaping hardship and indentured laborers recruited for plantations.",
  minutes: 8,
  learningGoals: [
    "Explain the causes of migration in the period from 1750 to 1900.",
    "Distinguish free, indentured, and coerced migration.",
  ],
  bigIdea:
    "Population growth, famine, and industrial demand for labor pushed and pulled tens of millions of people across oceans.",
  context:
    "Steamships and railroads made long-distance travel cheaper. The end of slavery in many places created demand for new sources of plantation labor.",
  sections: [
    {
      id: "push-pull",
      title: "Push and pull factors",
      conceptTitle: "Push and pull factors",
      lenses: ["S", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Tens of millions of Europeans emigrated between 1840 and 1914. The Irish famine of 1845 to 1852 killed about a million people and drove more than a million abroad. Others left because farmland was scarce or wages were higher in the Americas.",
        },
        {
          type: "paragraph",
          text: "Many Italians went to Argentina and the United States, and Japanese migrants went to Hawaii and Brazil.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Famine and land shortage pushed people out, while jobs and wages abroad pulled them, and cheaper steamship travel made the move possible.",
        },
      ],
      takeaway:
        "Push and pull factors combined with new transport to drive mass migration.",
      sourceIds: ["ced-topic-6-6"],
    },
    {
      id: "indenture",
      title: "Indentured labor",
      conceptTitle: "Indentured labor",
      lenses: ["E", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "After Britain abolished slavery, plantation owners recruited indentured servants. More than a million Indians signed contracts to work, usually for five years, in the Caribbean, Mauritius, Fiji, and southern Africa. Chinese laborers went to Cuba, Peru, and Southeast Asia.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Indentured workers were not enslaved, but their contracts limited their freedom and conditions were often harsh.",
        },
      ],
      takeaway: "Indenture replaced slavery as a source of plantation labor.",
      sourceIds: ["ced-topic-6-6"],
    },
  ],
  vocabulary: [
    {
      id: "indentured-servants",
      topicId: "world-6-6",
      term: "indentured servants",
      definition:
        "Workers who signed contracts to labor for a set number of years in exchange for passage, wages, or land.",
    },
    {
      id: "irish-famine",
      topicId: "world-6-6",
      term: "Irish famine",
      definition:
        "A famine from 1845 to 1852 caused by potato blight and worsened by British policy, which killed about a million people.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-6-indentured-servants", "world-6-irish-famine"],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 4 bridge",
      title: "From slavery to indenture",
      body: "Unit 4 described the Atlantic slave trade. After abolition, indentured workers from Asia filled many plantation jobs.",
      transferQuestion: "How did abolition affect labor migration?",
      feedback: "Connect the end of slavery to the recruitment of indentured workers.",
      links: [
        {
          topicId: "world-4-5",
          sectionId: "atlantic-slave-trade",
          label: "Review the Atlantic slave trade",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-6-6", "ced"],
};

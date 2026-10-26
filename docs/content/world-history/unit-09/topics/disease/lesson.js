// Original Page One lesson for CED Topic 9.2.

export const lesson = {
  schemaVersion: 1,
  id: "world-9-2",
  unitId: "world-9",
  courseId: "world",
  code: "9.2",
  title: "Technological Advances and Limitations After 1900: Disease",
  period: "c. 1900–present",
  status: "ready",
  order: 2,
  summary:
    "How medicine defeated some diseases while poverty-related diseases persisted and new epidemics emerged.",
  minutes: 8,
  learningGoals: [
    "Explain how disease and medical advances affected people from 1900 to the present.",
  ],
  bigIdea:
    "Medicine won great victories after 1900, but diseases of poverty persisted, new epidemics spread quickly in a connected world, and longer lives brought new illnesses.",
  context:
    "The same air travel and trade that connected the world also let diseases spread farther and faster.",
  sections: [
    {
      id: "epidemics",
      title: "Old and new epidemics",
      conceptTitle: "Old and new epidemics",
      lenses: ["S", "T"],
      blocks: [
        {
          type: "paragraph",
          text: "The influenza pandemic of 1918 to 1919, a worldwide outbreak spread partly by soldiers returning from World War I, killed tens of millions. HIV/AIDS, identified in the early 1980s, spread worldwide and hit sub-Saharan Africa hardest. Ebola in West Africa from 2014 and COVID-19 from 2020 showed how fast disease could cross borders.",
        },
        {
          type: "paragraph",
          text: "Diseases associated with poverty, such as malaria, tuberculosis, and cholera, continued to kill millions, especially where clean water and health care were scarce.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Global travel spread new diseases faster, while poverty limited access to clean water, vaccines, and treatment.",
        },
      ],
      takeaway:
        "New epidemics spread quickly in a connected world, and diseases of poverty persisted.",
      sourceIds: ["ced-topic-9-2"],
    },
    {
      id: "medical-advances",
      title: "Medical advances and longer lives",
      conceptTitle: "Medical advances and longer lives",
      lenses: ["T", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Vaccines prevented polio and measles, and a World Health Organization campaign eradicated smallpox by 1980. Drugs that slowed HIV turned it from a death sentence into a manageable illness for those who could get treatment.",
        },
        {
          type: "paragraph",
          text: "As life expectancy rose, more people lived long enough to develop heart disease, cancer, and Alzheimer's disease, which became leading causes of death in wealthier countries.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Medical progress did not reach everyone at the same time. In 2003, only a small share of Africans with HIV received the drugs that were already common in wealthy countries.",
        },
      ],
      takeaway:
        "Medicine lengthened lives, which changed which diseases were most common.",
      sourceIds: ["ced-topic-9-2"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 4 bridge",
      title: "Disease and connection",
      body: "Smallpox crossed the Atlantic with the Columbian Exchange; in the twentieth century, a global campaign eradicated it.",
      transferQuestion: "How did global connections both spread and help defeat disease?",
      feedback: "Give one example of each.",
      links: [
        {
          topicId: "world-9-2",
          sectionId: "medical-advances",
          label: "Review medical advances",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-9-2", "ced"],
};

// Original Page One lesson for CED Topic 9.5. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-09.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-9-5",
  unitId: "world-9",
  courseId: "world",
  code: "9.5",
  title: "Calls for Reform and Responses After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 5,
  summary:
    "How rights movements challenged old assumptions about race, gender, class, and religion, and how states responded.",
  minutes: 9,
  learningGoals: [
    "Explain the various responses to increasing interactions in the period after 1900.",
  ],
  bigIdea:
    "Movements claiming universal rights challenged discrimination based on race, gender, caste, and class; some states reformed, while others resisted with force.",
  context:
    "After World War II and the Holocaust, many people insisted that all human beings had rights that governments must respect.",
  sections: [
    {
      id: "rights",
      title: "Rights for all",
      conceptTitle: "Rights for all",
      lenses: ["S", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "In 1948, the United Nations adopted the Universal Declaration of Human Rights, which declared that all people are equal in dignity and rights regardless of race, sex, religion, or birth.",
        },
        {
          type: "paragraph",
          text: "Feminism, the movement for women's political, social, and economic equality, won voting rights in most countries by the 1970s and pushed for equal education and pay. India's 1950 constitution abolished untouchability and reserved university places and government jobs for lower castes.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "New rights on paper did not end discrimination in practice. Many reforms took decades to enforce.",
        },
      ],
      takeaway:
        "Rights-based movements challenged old hierarchies of race, gender, and caste.",
      sourceIds: ["ced-topic-9-5"],
    },
    {
      id: "responses",
      title: "Reform and resistance",
      conceptTitle: "Reform and resistance",
      lenses: ["C", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Some reform movements grew from religious traditions. In Latin America, liberation theology called on the Catholic Church to work for justice for the poor. Military governments saw it as a threat, and Archbishop Óscar Romero was killed in 1980.",
        },
        {
          type: "paragraph",
          text: "States responded differently. Some extended rights through new laws, while others used force, as China's government did against protesters in Tiananmen Square in 1989.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Demands for rights forced governments to choose between reform and repression.",
        },
      ],
      takeaway:
        "States met calls for reform with change in some places and repression in others.",
      sourceIds: ["ced-topic-9-5"],
    },
  ],
  vocabulary: [
    {
      id: "udhr",
      topicId: "world-9-5",
      term: "Universal Declaration of Human Rights",
      definition:
        "The 1948 United Nations statement that all people are equal in dignity and rights.",
    },
    {
      id: "feminism",
      topicId: "world-9-5",
      term: "Feminism",
      definition:
        "The movement for women's political, social, and economic equality with men.",
    },
    {
      id: "liberation-theology",
      topicId: "world-9-5",
      term: "liberation theology",
      definition:
        "A Latin American Catholic movement that called on the church to work for justice for the poor.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-9-udhr", "world-9-feminism", "world-9-liberation-theology"],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 5 bridge",
      title: "Enlightenment rights, extended",
      body: "Enlightenment thinkers proclaimed natural rights; twentieth-century movements demanded that those rights apply to everyone.",
      transferQuestion:
        "How did twentieth-century rights movements build on Enlightenment ideas?",
      feedback: "Connect a specific Enlightenment idea to a later movement.",
      links: [
        { topicId: "world-9-5", sectionId: "rights", label: "Review rights for all" },
      ],
    },
  ],
  sourceIds: ["ced-topic-9-5", "ced"],
};

// Original Page One lesson for CED Topic 7.8.

export const lesson = {
  schemaVersion: 1,
  id: "world-7-8",
  unitId: "world-7",
  courseId: "world",
  code: "7.8",
  title: "Mass Atrocities After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 8,
  summary:
    "How governments and armed groups carried out genocide and mass killing in the twentieth century, including the Holocaust.",
  minutes: 9,
  learningGoals: [
    "Explain the various causes and consequences of mass atrocities from 1900 to the present.",
  ],
  bigIdea:
    "In the twentieth century, governments and armed movements used propaganda, state power, and modern organization to carry out genocide and mass killing.",
  context:
    "Genocide means acts committed with intent to destroy a national, ethnic, racial, or religious group. The word was coined in 1944.",
  sections: [
    {
      id: "holocaust",
      title: "The Holocaust",
      conceptTitle: "The Holocaust",
      lenses: ["P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "The Nazi regime stripped Jews of their rights through laws such as the Nuremberg Laws of 1935. During the war, the Nazis carried out the systematic murder of about six million Jews in the Holocaust, as well as Roma, disabled people, and others.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Racist ideology, propaganda, and the power of a modern state allowed persecution to become organized mass murder.",
        },
      ],
      takeaway: "The Holocaust was a state-organized genocide driven by racist ideology.",
      sourceIds: ["ced-topic-7-8"],
    },
    {
      id: "other-genocides",
      title: "Other mass atrocities",
      conceptTitle: "Other mass atrocities",
      lenses: ["P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "During World War I, the Ottoman government deported and killed a large share of its Armenian population in the Armenian genocide, beginning in 1915. The Khmer Rouge regime in Cambodia caused the deaths of 1.5 to 2 million people from 1975 to 1979. In Rwanda in 1994, Hutu extremists killed an estimated 500,000 to 800,000 people, mostly Tutsi, in about one hundred days.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Atrocities were not spontaneous. Strong answers identify the role of governments, organized groups, and propaganda.",
        },
      ],
      takeaway: "Mass atrocities occurred across the century and the world.",
      sourceIds: ["ced-topic-7-8"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "Human rights after 1945",
      body: "The horrors of the Holocaust led to the 1948 Genocide Convention and the Universal Declaration of Human Rights, studied in Unit 9.",
      transferQuestion: "How did the Holocaust shape international law after 1945?",
      feedback: "Name a specific agreement and explain the connection.",
      links: [
        {
          topicId: "world-7-8",
          sectionId: "holocaust",
          label: "Review the Holocaust",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-7-8", "ced"],
};

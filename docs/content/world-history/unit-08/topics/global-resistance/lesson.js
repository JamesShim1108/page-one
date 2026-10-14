// Original Page One lesson for CED Topic 8.7. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-08.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-8-7",
  unitId: "world-8",
  courseId: "world",
  code: "8.7",
  title: "Global Resistance to Established Power Structures After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 7,
  summary:
    "How movements used nonviolence, and sometimes violence, to challenge discrimination and authoritarian rule.",
  minutes: 9,
  learningGoals: [
    "Explain various reactions to existing power structures in the period after 1900.",
  ],
  bigIdea:
    "People around the world challenged unjust power through nonviolent protest and, in some cases, armed struggle; governments responded with reform or repression.",
  context:
    "Gandhi's success in India inspired movements around the world, but not every movement or government chose nonviolence.",
  sections: [
    {
      id: "nonviolent-resistance",
      title: "Nonviolent resistance",
      conceptTitle: "Nonviolent resistance",
      lenses: ["S", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "In the United States, the civil rights movement used boycotts, marches, and sit-ins to end legal segregation. Martin Luther King Jr. drew on Gandhi's methods, and the movement won the Civil Rights Act of 1964 and the Voting Rights Act of 1965.",
        },
        {
          type: "paragraph",
          text: "In South Africa, the government imposed apartheid, a system of racial segregation, after 1948. The African National Congress protested peacefully until the government banned it in 1960; it then formed an armed wing. International boycotts and protest within South Africa ended apartheid, and Nelson Mandela became president in 1994.",
        },
        {
          type: "callout",
          title: "Comparison",
          text: "King and Mandela both fought racial discrimination, but King's movement stayed nonviolent, while the ANC turned to armed struggle after peaceful protest was banned.",
        },
      ],
      takeaway:
        "Nonviolent movements inspired by Gandhi challenged racial discrimination on several continents.",
      sourceIds: ["ced-topic-8-7"],
    },
    {
      id: "challenges-and-repression",
      title: "Armed challenges and repression",
      conceptTitle: "Armed challenges and repression",
      lenses: ["P"],
      blocks: [
        {
          type: "paragraph",
          text: "Some movements used violence. In Peru, the Maoist Shining Path waged a guerrilla war from 1980. Governments also used force against protest: in the Prague Spring of 1968, Czech reformers loosened censorship, and Warsaw Pact armies invaded to end the reforms. In 1989 the Chinese army crushed pro-democracy protests in Tiananmen Square.",
        },
        {
          type: "paragraph",
          text: "In Latin America, military governments such as Augusto Pinochet's in Chile, which seized power in 1973, killed or imprisoned thousands of opponents.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Not every challenge succeeded. Many protest movements were crushed, and some armed movements caused great suffering of their own.",
        },
      ],
      takeaway:
        "Challenges to power took violent and nonviolent forms, and many governments met them with repression.",
      sourceIds: ["ced-topic-8-7"],
    },
  ],
  vocabulary: [
    {
      id: "civil-rights-movement",
      topicId: "world-8-7",
      term: "civil rights movement",
      definition:
        "The movement, especially in the 1950s and 1960s, to end racial segregation and discrimination in the United States.",
    },
    {
      id: "apartheid",
      topicId: "world-8-7",
      term: "apartheid",
      definition:
        "South Africa's system of legal racial segregation and white minority rule, 1948–1994.",
    },
    {
      id: "african-national-congress",
      topicId: "world-8-7",
      term: "African National Congress",
      definition:
        "The South African political party that led the struggle against apartheid.",
    },
    {
      id: "prague-spring",
      topicId: "world-8-7",
      term: "Prague Spring",
      definition:
        "The 1968 reform movement in Czechoslovakia, ended by a Warsaw Pact invasion.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-8-civil-rights-movement",
      "world-8-apartheid",
      "world-8-african-national-congress",
      "world-8-prague-spring",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 7 bridge",
      title: "Gandhi's legacy",
      body: "The nonviolent noncooperation Gandhi led in India between the wars became a model for movements around the world.",
      transferQuestion: "How did Gandhi's methods influence later movements?",
      feedback: "Name a later movement and a method it borrowed.",
      links: [
        {
          topicId: "world-7-5",
          sectionId: "mandates-anticolonial",
          label: "Review interwar anticolonial movements",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-8-7", "ced"],
};

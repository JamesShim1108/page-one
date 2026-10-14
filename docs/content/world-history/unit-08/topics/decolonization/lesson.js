// Original Page One lesson for CED Topic 8.5. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-08.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-8-5",
  unitId: "world-8",
  courseId: "world",
  code: "8.5",
  title: "Decolonization After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 5,
  summary:
    "How colonies in Asia and Africa won independence, some through negotiation and others through war.",
  minutes: 10,
  learningGoals: [
    "Compare the processes by which various peoples pursued independence after 1900.",
  ],
  bigIdea:
    "Independence came through negotiation where colonial powers were willing to leave, and through armed struggle where settlers or rulers refused.",
  context: "Between 1945 and 1975, more than fifty colonies became independent states.",
  sections: [
    {
      id: "negotiated-independence",
      title: "Negotiated independence",
      conceptTitle: "Negotiated independence",
      lenses: ["P"],
      blocks: [
        {
          type: "paragraph",
          text: "In India, Gandhi's mass movements and the Quit India campaign of 1942 made British rule impossible to sustain. Britain negotiated with the Indian National Congress and the Muslim League, and in 1947 India and Pakistan became independent.",
        },
        {
          type: "paragraph",
          text: "In the Gold Coast, Kwame Nkrumah organized strikes and boycotts and won elections. Britain negotiated a gradual handover, and in 1957 the colony became independent Ghana. France also negotiated independence for most of its West African colonies in 1960.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Negotiated independence was not peaceful everywhere. India's independence came with the violence of partition.",
        },
      ],
      takeaway:
        "Mass political movements won independence through negotiation where colonial powers agreed to leave.",
      sourceIds: ["ced-topic-8-5"],
    },
    {
      id: "armed-struggle",
      title: "Armed struggle",
      conceptTitle: "Armed struggle",
      lenses: ["P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Where many European settlers lived or a colonial power refused to leave, independence movements often turned to war. In the Algerian War of 1954 to 1962, the National Liberation Front fought France, which had about one million settlers in Algeria.",
        },
        {
          type: "paragraph",
          text: "In Vietnam, the Viet Minh defeated France at Dien Bien Phu in 1954. In Kenya, the Mau Mau rebellion against British rule and settler landholding began in 1952; Kenya won independence in 1963. Portugal fought independence movements in Angola and Mozambique until 1975.",
        },
        {
          type: "callout",
          title: "Comparison",
          text: "Ghana and Algeria both won independence, but Ghana's came through elections and negotiation, while Algeria's came after an eight-year war against a settler colony.",
        },
      ],
      takeaway:
        "Settler populations and colonial resistance made armed struggle more likely.",
      sourceIds: ["ced-topic-8-5"],
    },
  ],
  vocabulary: [
    {
      id: "kwame-nkrumah",
      topicId: "world-8-5",
      term: "Kwame Nkrumah",
      definition:
        "Leader of the Gold Coast independence movement and first prime minister of Ghana in 1957.",
    },
    {
      id: "algerian-war",
      topicId: "world-8-5",
      term: "Algerian War",
      definition:
        "The 1954–1962 war in which the National Liberation Front won Algeria's independence from France.",
    },
    {
      id: "dien-bien-phu",
      topicId: "world-8-5",
      term: "Dien Bien Phu",
      definition:
        "The 1954 battle in which the Viet Minh defeated France, ending French rule in Indochina.",
    },
    {
      id: "mau-mau",
      topicId: "world-8-5",
      term: "Mau Mau",
      definition:
        "A Kenyan movement that rebelled against British rule and settler landholding beginning in 1952.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-8-kwame-nkrumah",
      "world-8-algerian-war",
      "world-8-dien-bien-phu",
      "world-8-mau-mau",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 6 bridge",
      title: "Settler colonies",
      body: "The settler colonies created in the age of imperialism, like Algeria and Kenya, were where decolonization was most violent.",
      transferQuestion:
        "Why did settler colonies resist decolonization more than other colonies?",
      feedback: "Explain what settlers stood to lose.",
      links: [
        {
          topicId: "world-6-2",
          sectionId: "existing-colonies",
          label: "Review settler colonies",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-8-5", "ced"],
};

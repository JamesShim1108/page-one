// Original Page One lesson for CED Topic 7.5. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-07.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-7-5",
  unitId: "world-7",
  courseId: "world",
  code: "7.5",
  title: "Unresolved Tensions After World War I",
  period: "c. 1900–present",
  status: "ready",
  order: 5,
  summary:
    "How the peace settlement, the mandate system, and anticolonial movements left tensions that shaped the following decades.",
  minutes: 10,
  learningGoals: [
    "Explain the continuities and changes in territorial holdings after World War I.",
  ],
  bigIdea:
    "The peace settlement punished Germany, redrew borders, and extended imperial control through mandates, leaving resentments that fed later conflict.",
  context:
    "The victors met in Paris in 1919 to remake the map of Europe and the Middle East.",
  sections: [
    {
      id: "versailles",
      title: "The Treaty of Versailles",
      conceptTitle: "The Treaty of Versailles",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "The Treaty of Versailles of 1919 blamed Germany for the war, took its colonies and some territory, limited its army, and required large reparations. The League of Nations was created to keep peace, but the United States never joined.",
        },
        {
          type: "paragraph",
          text: "The economist John Maynard Keynes warned that a punishing peace would ruin Europe's economy and invite future conflict.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Harsh terms and reparations created German resentment, which extremists later exploited.",
        },
      ],
      takeaway: "The peace settlement left Germany resentful and Europe unstable.",
      sourceIds: ["ced-topic-7-5"],
    },
    {
      id: "mandates-anticolonial",
      title: "Mandates and anticolonial movements",
      conceptTitle: "Mandates and anticolonial movements",
      lenses: ["P", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "Former German colonies and Ottoman Arab lands became mandates under the League of Nations. France received Syria and Lebanon; Britain received Iraq, Palestine, and Transjordan. Many Arabs saw this as colonialism under a new name.",
        },
        {
          type: "paragraph",
          text: "In China, the May Fourth Movement of 1919 protested the transfer of German rights in Shandong to Japan. In India, Gandhi led nonviolent campaigns, including the Salt March of 1930.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Mandates were not independence. Despite the language of preparation, they extended British and French control.",
        },
      ],
      takeaway:
        "The settlement extended empire while anticolonial movements grew stronger.",
      sourceIds: ["ced-topic-7-5"],
    },
  ],
  vocabulary: [
    {
      id: "treaty-of-versailles",
      topicId: "world-7-5",
      term: "Treaty of Versailles",
      definition:
        "The 1919 peace treaty that blamed Germany for World War I and imposed territorial losses and reparations.",
    },
    {
      id: "reparations",
      topicId: "world-7-5",
      term: "reparations",
      definition:
        "Payments a defeated country is required to make to compensate for war damage.",
    },
    {
      id: "mandates",
      topicId: "world-7-5",
      term: "mandates",
      definition:
        "Former German and Ottoman territories placed under British or French control by the League of Nations after World War I.",
    },
    {
      id: "league-of-nations",
      topicId: "world-7-5",
      term: "League of Nations",
      definition:
        "An international organization created after World War I to keep peace, which the United States never joined.",
    },
    {
      id: "may-fourth",
      topicId: "world-7-5",
      term: "May Fourth Movement",
      definition:
        "A Chinese protest movement that began on May 4, 1919, against the transfer of German rights in Shandong to Japan.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-7-treaty-of-versailles",
      "world-7-reparations",
      "world-7-mandates",
      "world-7-league-of-nations",
      "world-7-may-fourth",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "From mandates to independence",
      body: "The mandates of the Middle East became independent states after World War II, a process studied in Unit 8.",
      transferQuestion:
        "Why might mandates have produced resentment among Arab nationalists?",
      feedback: "Connect wartime expectations with the outcome of the peace.",
      links: [
        {
          topicId: "world-7-5",
          sectionId: "mandates-anticolonial",
          label: "Review mandates",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-7-5", "ced"],
};

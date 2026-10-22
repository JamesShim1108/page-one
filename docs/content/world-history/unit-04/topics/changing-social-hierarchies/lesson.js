// Original Page One lesson for CED Topic 4.7.

export const lesson = {
  schemaVersion: 1,
  id: "world-4-7",
  unitId: "world-4",
  courseId: "world",
  code: "4.7",
  title: "Changing Social Hierarchies from 1450 to 1750",
  period: "c. 1450–1750",
  status: "ready",
  order: 7,
  summary:
    "How new hierarchies based on ancestry formed in colonial societies, and how empires treated religious and ethnic groups.",
  minutes: 9,
  learningGoals: [
    "Explain how social categories, roles, and practices were maintained or changed from 1450 to 1750.",
    "Explain how the casta system ranked people in Spanish America.",
  ],
  bigIdea:
    "Empires both kept older hierarchies and created new ones, most strikingly in the Americas, where ancestry and race shaped a person's legal and social position.",
  context:
    "Conquest and the slave trade mixed European, African, and Indigenous peoples in the Americas. Rulers in Asia governed diverse populations with hierarchies of their own.",
  sections: [
    {
      id: "casta-system",
      title: "The casta system",
      conceptTitle: "The casta system",
      lenses: ["S", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Spanish American society ranked people largely by ancestry. Peninsulares, born in Spain, held the highest offices. Creoles, of Spanish descent but born in the Americas, were wealthy but often excluded from top posts. Mestizos and mulattoes had mixed ancestry. Indigenous people and enslaved Africans were near the bottom.",
        },
        {
          type: "paragraph",
          text: "Categories were not always fixed in practice. Wealth, occupation, and reputation could change how people were classified.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Conquest and the slave trade produced populations of mixed ancestry, which led colonial elites to create ranked categories that protected their own privileges.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Do not treat the casta system as identical to the caste system of South Asia. The casta system was based on ancestry in a colonial society.",
        },
      ],
      takeaway: "Colonial hierarchies tied status to ancestry and race.",
      sourceIds: ["ced-topic-4-7"],
    },
    {
      id: "elites-and-diversity",
      title: "Ruling minorities and diverse subjects",
      conceptTitle: "Ruling minorities and diverse subjects",
      lenses: ["S", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "Manchu rulers of Qing China kept separate privileges for Manchus while employing Han Chinese officials. Ottoman non-Muslims kept their own religious leaders but paid extra taxes. In Mughal India, Hindu Rajputs could rise high in imperial service.",
        },
        {
          type: "paragraph",
          text: "European ideas about other peoples were also contested. Some writers, such as Montaigne, questioned whether Europeans had the right to call others barbarians.",
        },
      ],
      takeaway:
        "Rulers adapted hierarchies to govern diverse subjects, and some Europeans questioned their own assumptions.",
      sourceIds: ["ced-topic-4-7"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "Creole resentment",
      body: "Creoles' exclusion from the highest offices helped fuel independence movements in Latin America after 1800, studied in Unit 5.",
      transferQuestion:
        "Why might Creoles resent the casta system even though they ranked near the top?",
      feedback: "Explain the difference between their wealth and their access to power.",
      links: [
        {
          topicId: "world-4-7",
          sectionId: "casta-system",
          label: "Review the casta system",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-4-7", "ced"],
};

// Original Page One lesson for CED Topic 4.6. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-04.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-4-6",
  unitId: "world-4",
  courseId: "world",
  code: "4.6",
  title: "Internal and External Challenges to State Power from 1450 to 1750",
  period: "c. 1450–1750",
  status: "ready",
  order: 6,
  summary:
    "How Indigenous peoples, colonized societies, nobles, and rival groups resisted expanding states.",
  minutes: 9,
  learningGoals: [
    "Explain the effects of the development of state power from 1450 to 1750.",
    "Compare the causes of resistance by different groups.",
  ],
  bigIdea:
    "As states expanded and centralized their power, many groups resisted, from Indigenous peoples facing colonial rule to nobles defending their privileges.",
  context:
    "Expanding empires demanded labor, taxes, and religious conformity. Those demands produced revolts inside empires and resistance at their edges.",
  sections: [
    {
      id: "colonial-resistance",
      title: "Resistance to colonial rule",
      conceptTitle: "Resistance to colonial rule",
      lenses: ["P", "C", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "In the Pueblo Revolt of 1680, communities in present-day New Mexico, led by Popé, rose against Spanish rule and drove colonists out for more than a decade. Spanish demands for labor and attacks on Pueblo religion had fueled the revolt.",
        },
        {
          type: "paragraph",
          text: "In west-central Africa, Queen Nzinga of Ndongo and Matamba resisted Portuguese expansion for decades. Enslaved people who escaped plantations formed maroon communities in Jamaica, Brazil, and elsewhere.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Colonial demands for labor and suppression of local religion led to resentment, which turned into armed revolt when communities could unite.",
        },
      ],
      takeaway: "Colonized peoples resisted through revolt, diplomacy, and escape.",
      sourceIds: ["ced-topic-4-6"],
    },
    {
      id: "internal-revolts",
      title: "Challenges from within",
      conceptTitle: "Challenges from within",
      lenses: ["P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "In France, nobles and Paris officials rose against royal power in the Fronde from 1648 to 1653. In India, the Maratha leader Shivaji built an independent kingdom and fought the Mughals in the 1670s. In Russia, Cossack revolts challenged the tsar's authority.",
        },
        {
          type: "paragraph",
          text: "These challenges sometimes weakened states, as the Marathas weakened the Mughals. Other times, as in France, the ruler emerged stronger.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Not all resistance came from the bottom. Elites such as French nobles resisted when centralization threatened their power.",
        },
      ],
      takeaway:
        "Centralizing rulers faced resistance from elites and rival groups as well as from peasants.",
      sourceIds: ["ced-topic-4-6"],
    },
  ],
  vocabulary: [
    {
      id: "pueblo-revolt",
      topicId: "world-4-6",
      term: "Pueblo Revolt",
      definition:
        "A 1680 uprising in which Pueblo communities expelled Spanish colonists from present-day New Mexico for more than a decade.",
    },
    {
      id: "maroon-communities",
      topicId: "world-4-6",
      term: "maroon communities",
      definition:
        "Settlements formed by people who escaped slavery, often in mountains or forests, in the Americas.",
    },
    {
      id: "fronde",
      topicId: "world-4-6",
      term: "Fronde",
      definition:
        "A series of revolts in France from 1648 to 1653 by nobles and officials against growing royal power.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-4-pueblo-revolt", "world-4-maroon-communities", "world-4-fronde"],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 3 bridge",
      title: "Absolutism and its opponents",
      body: "Louis XIV became a model of absolutism after surviving the Fronde as a child. Resistance and centralization shaped one another.",
      transferQuestion:
        "How might the Fronde have encouraged Louis XIV to centralize power?",
      feedback: "Connect the experience of revolt to later policies such as Versailles.",
      links: [
        {
          topicId: "world-3-2",
          sectionId: "religion-legitimacy",
          label: "Review divine right",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-4-6", "ced"],
};

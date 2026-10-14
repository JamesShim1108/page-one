// Original Page One lesson for CED Topic 4.4. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-04.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-4-4",
  unitId: "world-4",
  courseId: "world",
  code: "4.4",
  title: "Maritime Empires Established",
  period: "c. 1450–1750",
  status: "ready",
  order: 4,
  summary:
    "How European states built trading-post empires, joint-stock companies, and colonies, and how some African and Asian states grew through new trade.",
  minutes: 12,
  learningGoals: [
    "Explain the process of state building and expansion among maritime empires from 1450 to 1750.",
    "Explain how joint-stock companies and trading posts operated.",
    "Explain how African states such as Kongo and Asante took part in new trade networks.",
  ],
  bigIdea:
    "European maritime empires grew through fortified trading posts, chartered companies, and conquest, while some African and Asian states used new trade to grow stronger.",
  context:
    "Once sea routes were known, European states and merchants competed to control them. Their methods ranged from naval force at Asian ports to conquest of entire American empires.",
  sections: [
    {
      id: "trading-post-empires",
      title: "Trading-post empires",
      conceptTitle: "Trading-post empires",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Portugal seized fortified ports such as Goa in 1510 and Malacca in 1511. It required Asian ships to buy passes and pay duties, enforcing the system with armed ships.",
        },
        {
          type: "paragraph",
          text: "Most Indian Ocean trade remained in Asian hands, and land empires such as the Mughals were barely affected. A trading-post empire controlled points on the coast, not whole regions.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Do not describe Portugal as ruling India. It held a handful of coastal forts while powerful Asian states ruled the interior.",
        },
      ],
      takeaway:
        "Trading-post empires used naval force to profit from trade without governing large territories.",
      sourceIds: ["ced-topic-4-4"],
    },
    {
      id: "joint-stock-companies",
      title: "Joint-stock companies",
      conceptTitle: "Joint-stock companies",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "The English East India Company, chartered in 1600, and the Dutch East India Company, or VOC, chartered in 1602, raised money by selling shares to investors. These joint-stock companies spread the risk of long voyages among many owners.",
        },
        {
          type: "paragraph",
          text: "Governments gave the companies the right to build forts, keep armies, and make treaties. The VOC, based at Batavia on Java from 1619, used force to control the spice trade.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Long voyages were costly and risky, so merchants pooled money in joint-stock companies, which let them fund fleets and armies and compete for control of Asian trade.",
        },
      ],
      takeaway:
        "Joint-stock companies combined private investment with state-like powers.",
      sourceIds: ["ced-topic-4-4"],
    },
    {
      id: "spanish-conquests",
      title: "Conquest in the Americas",
      conceptTitle: "Conquest in the Americas",
      lenses: ["P", "In"],
      blocks: [
        {
          type: "paragraph",
          text: "Hernán Cortés, with tens of thousands of Indigenous allies, defeated the Mexica between 1519 and 1521. Francisco Pizarro captured the Inca ruler Atahualpa in 1532 during a civil war within the empire.",
        },
        {
          type: "paragraph",
          text: "Spain built a land empire in the Americas with viceroys, colonial courts, and the Catholic Church. Portugal colonized Brazil, while France, England, and the Netherlands founded colonies in North America and the Caribbean.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "A small number of Spanish soldiers did not conquer the Mexica alone. Indigenous allies, disease, and internal divisions were essential.",
        },
      ],
      takeaway:
        "In the Americas, Europeans built territorial empires rather than trading posts.",
      sourceIds: ["ced-topic-4-4"],
    },
    {
      id: "african-states",
      title: "African states and Atlantic trade",
      conceptTitle: "African states and Atlantic trade",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "The Kingdom of Kongo established ties with Portugal in the 1480s. King Afonso I adopted Christianity but protested Portuguese slave raiding. The Asante kingdom, rising around 1700, sold gold and enslaved war captives to Europeans for firearms and cloth.",
        },
        {
          type: "paragraph",
          text: "European traders on the West African coast generally depended on African rulers and merchants, who controlled access to the interior.",
        },
      ],
      takeaway:
        "Some African states grew stronger by taking part in Atlantic trade, including the slave trade.",
      sourceIds: ["ced-topic-4-4"],
    },
  ],
  vocabulary: [
    {
      id: "trading-post-empire",
      topicId: "world-4-4",
      term: "trading-post empire",
      definition:
        "An empire that controlled trade through fortified coastal ports rather than by ruling large territories.",
    },
    {
      id: "joint-stock-company",
      topicId: "world-4-4",
      term: "joint-stock companies",
      definition:
        "Businesses that raised money by selling shares to investors, who shared profits and risks; some held state-like powers.",
    },
    {
      id: "voc",
      topicId: "world-4-4",
      term: "VOC",
      definition:
        "The Dutch East India Company, a joint-stock company chartered in 1602 that controlled much of the spice trade.",
    },
    {
      id: "kingdom-of-kongo",
      topicId: "world-4-4",
      term: "Kingdom of Kongo",
      definition:
        "A west-central African kingdom whose rulers adopted Christianity and traded with Portugal from the late 1400s.",
    },
    {
      id: "asante",
      topicId: "world-4-4",
      term: "Asante",
      definition:
        "A West African kingdom that rose around 1700 and grew powerful through trade in gold and enslaved captives.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-4-trading-post-empire",
      "world-4-joint-stock-company",
      "world-4-voc",
      "world-4-kingdom-of-kongo",
      "world-4-asante",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 3 bridge",
      title: "Land and sea empires",
      body: "The Ottomans, Safavids, and Mughals expanded over land, while Portugal and the Netherlands built empires of ports and sea lanes.",
      transferQuestion:
        "Explain one difference between a land-based empire and a trading-post empire.",
      feedback:
        "Name an example of each and explain how each controlled territory or trade.",
      links: [
        {
          topicId: "world-3-1",
          sectionId: "islamic-empires",
          label: "Review land-based empires",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-4-4", "ced"],
};

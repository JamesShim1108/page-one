// Original Page One lesson for CED Topic 2.6.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("2.6", {
  summary:
    "How slavery spread through the British colonies, how colonial laws created a racial system of chattel slavery, and how enslaved Africans resisted and preserved their culture.",
  minutes: 12,
  goals: [
    "Explain why British colonies participated in the Atlantic slave trade and how participation differed by region.",
    "Explain how slave codes created a racial system of hereditary, lifelong slavery.",
    "Explain how enslaved people resisted slavery and maintained family, culture, and religion.",
  ],
  bigIdea:
    "Slavery grew because land was abundant and labor was scarce, colonial laws made it hereditary and racial, and enslaved people resisted it openly and in everyday ways while preserving their own culture.",
  context:
    "The CED asks you to explain the causes and effects of slavery in the British colonial regions and how enslaved people responded. Keep each region's economy in mind.",
  sections: [
    section(
      "slave-trade-and-regions",
      "The slave trade and the colonies",
      ["WXT", "SOC", "WOR"],
      [
        "All the British colonies took part to varying degrees in the Atlantic slave trade. The reasons were an abundance of land, a growing European demand for colonial goods, and a shortage of indentured servants. Enslaved Africans endured the Middle Passage, the forced voyage across the Atlantic, in crowded and unhealthy ships, and many died on the way.",
        "The extent of slavery depended on the economy. Small New England farms used relatively few enslaved laborers, and all port cities held significant minorities of enslaved people. The emerging plantation systems of the Chesapeake and the southern Atlantic coast had large numbers of enslaved workers. The great majority of enslaved Africans, however, were sent to the West Indies.",
      ],
      "Land, demand for colonial goods, and a shortage of servants drew all British colonies into the slave trade, with plantation regions using the most enslaved labor.",
    ),
    section(
      "racial-slavery-and-law",
      "Chattel slavery and the law",
      ["SOC", "NAT", "PCE"],
      [
        "In the early 1600s the legal status of Africans in Virginia was unsettled, and some became free. As chattel slavery, in which people are legal property and slavery is lifelong, became the dominant labor system in many southern colonies, new laws created a strict racial system. Slave codes restricted where enslaved people could go and what they could do, and they prohibited interracial relationships. A Virginia law of 1662 defined the children of enslaved mothers as enslaved, so slavery passed from mother to child. In this way the descendants of African American mothers were defined as black and enslaved in perpetuity.",
        "Many historians argue that planters' fear of unrest also pushed them toward slavery. In Bacon's Rebellion in 1676, poor white and Black laborers in Virginia joined an armed revolt against the colonial elite, and afterward planters relied more heavily on African slavery, which also let them use race to divide laborers.",
        [
          "Common trap",
          "Slavery was not simply a leftover of earlier labor systems. Colonial legislatures wrote laws that made it racial, hereditary, and permanent.",
        ],
      ],
      "Colonial laws made slavery a racial, hereditary, lifelong status.",
    ),
    section(
      "resistance-and-culture",
      "Resistance and culture",
      ["SOC", "ARC"],
      [
        "Africans developed both overt and covert means to resist the dehumanizing nature of slavery. Overt resistance included armed revolt. In 1739, in the Stono Rebellion in South Carolina, a group of enslaved people seized weapons, killed several colonists, and marched toward Spanish Florida before militia defeated them. South Carolina responded with a harsher slave code. Others fled to Spanish Florida, where Spain offered freedom to those who converted to Catholicism.",
        "Covert resistance included working slowly, damaging tools, feigning illness, and learning in secret. Enslaved people also maintained their family and gender systems, culture, and religion. African languages, music, foods, and names blended with new influences, as in the Gullah culture of the South Carolina coast, and enslaved people formed their own religious communities.",
      ],
      "Enslaved people resisted through revolt, flight, and daily acts of defiance and kept their families, cultures, and religions alive.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 2.7",
      title: "Slavery and colonial society",
      body: "Slavery shaped the economy and law of the colonies. Topic 2.7 looks at the wider colonial society and how ideas and religion crossed the Atlantic.",
      transferQuestion: "How did colonial law turn a labor system into a racial system?",
      feedback:
        "A strong answer names a specific rule, such as hereditary status through the mother or bans on interracial relationships, and explains how it fixed race and slavery together.",
      links: [
        {
          topicId: "apush-1-5",
          sectionId: "african-slavery",
          label: "Review African slavery in the Spanish colonies",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-2", "equiano-1789"],
});

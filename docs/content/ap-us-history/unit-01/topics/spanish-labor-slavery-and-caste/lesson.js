// Original Page One lesson for CED Topic 1.5.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("1.5", {
  summary:
    "How the encomienda, African slavery, and the casta system organized work and social rank across the Spanish empire in the Americas.",
  minutes: 10,
  goals: [
    "Explain how the encomienda system used Native American labor in mining and agriculture.",
    "Explain why enslaved Africans were brought to the Spanish colonies and how Europeans obtained them.",
    "Describe the casta system and how it ranked the people of the Spanish empire.",
  ],
  bigIdea:
    "Spanish colonial economies were built on forced labor, first from Native Americans and then from enslaved Africans, and a rigid caste system ranked people by ancestry.",
  context:
    "The CED asks how the growth of the Spanish empire shaped social and economic structures over time. Think about how labor, wealth, and rank connected.",
  sections: [
    section(
      "encomienda",
      "The encomienda and Native labor",
      ["SOC", "WXT"],
      [
        "Spanish rulers rewarded conquistadors and settlers with grants called encomiendas. An encomienda gave a colonist the right to demand labor and tribute from a Native community. In return, the holder was supposed to protect the people and teach them Christianity, but in practice the system often meant brutal work and heavy losses of life.",
        "Native workers mined silver, grew sugar and other crops, and herded livestock. In the Andes, Spanish officials adapted an Inca labor draft called the mita to supply workers for the silver mines at Potosí. Spain used Native labor to extract precious metals and to support plantation agriculture across its empire.",
        [
          "Common trap",
          "The encomienda was not slavery in law, because the Crown claimed Native peoples were its free subjects. In practice, forced and unpaid labor often looked much like slavery.",
        ],
      ],
      "The encomienda gave Spanish colonists control over Native labor and tribute, which fueled mining and plantation agriculture.",
    ),
    section(
      "african-slavery",
      "Enslaved Africans in the Spanish and Portuguese Americas",
      ["SOC", "WXT", "WOR"],
      [
        "Slavery already existed in Africa, the Mediterranean, and Europe, and Portuguese traders had been buying enslaved Africans since the 1400s. Along the African coast, Europeans partnered with some West African groups that practiced slavery. These partners captured people and sold them to Europeans, who forcibly transported them across the Atlantic.",
        "The Spanish began importing enslaved Africans to the Caribbean in the early 1500s. Demand grew as epidemics, overwork, and abuse reduced the Native workforce. Enslaved Africans labored on sugar plantations and in mines throughout the Spanish empire, and Portuguese colonists in Brazil built a large plantation economy on enslaved labor.",
        [
          "Cause and effect",
          "Native populations declined, labor shortages followed, and colonists and the Crown turned to enslaved Africans, which expanded the Atlantic slave trade.",
        ],
      ],
      "Labor shortages after Native population decline increased reliance on enslaved Africans obtained through partnerships on the African coast.",
    ),
    section(
      "casta-system",
      "The casta system",
      ["SOC", "ARC"],
      [
        "Spanish settlers formed families with Native and African partners, and the empire's population became very mixed. To organize this society, Spanish officials and the Church developed a caste system, known as the casta system, that ranked people by ancestry and color.",
        "At the top were peninsulares, people born in Spain, who held the highest government and Church offices. Below them were criollos, people of Spanish descent born in the Americas. Mestizos had Spanish and Native ancestry, and mulattoes had Spanish and African ancestry. Native Americans paid tribute and provided labor, and enslaved Africans held the lowest position. Rank shaped legal rights, occupations, and taxes, though some people could improve their standing.",
      ],
      "The casta system defined each group's status by ancestry and tied social rank to rights, work, and taxes.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Within Unit 1",
      title: "Labor, ideas, and resistance",
      body: "Forced labor and rank created conflict and debate. Topic 1.6 follows how Native peoples resisted and how Europeans argued about how Native peoples and Africans should be treated.",
      transferQuestion:
        "How did the casta system reflect the economic goals of the Spanish empire?",
      feedback:
        "A strong answer links rank to access to land, office, and labor, and explains how the empire's wealth depended on keeping some groups at the bottom.",
      links: [
        {
          topicId: "apush-1-4",
          sectionId: "epidemics-and-conquest",
          label: "Review epidemics and Spanish conquest",
        },
      ],
    },
  ],
  sourceIds: ["albert-apush-labor-slavery-caste", "fiveable-apush-unit-1"],
});

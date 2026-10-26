// Original Page One lesson for CED Topic 2.5.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("2.5", {
  summary:
    "How alliances, trade, and war shaped relations among American Indian nations and French, Dutch, British, and Spanish colonies, including Metacom's War and the Pueblo Revolt.",
  minutes: 11,
  goals: [
    "Explain how European empires and American Indian nations formed alliances and why those alliances produced both cooperation and conflict.",
    "Explain the causes and effects of Metacom's War.",
    "Explain the Pueblo Revolt and how Spain accommodated some aspects of Pueblo culture afterward.",
  ],
  bigIdea:
    "American Indian nations acted for their own interests, forming alliances and fighting wars with European colonies, and their resistance shaped how colonial societies developed.",
  context:
    "The CED asks you to explain how and why interactions between European nations and American Indians changed over time. When you read a source about these events, ask who wrote it, for whom, and why, because each side saw events differently.",
  sections: [
    section(
      "alliances-and-accommodation",
      "Alliances and accommodation",
      ["WOR", "GEO"],
      [
        "Interactions between European rivals and American Indian nations fostered both accommodation and conflict. French, Dutch, British, and Spanish colonies allied with and armed American Indian groups, and Native nations frequently sought alliances with Europeans against other American Indian nations.",
        "The French and their Algonquin and Huron allies fought the Iroquois Confederacy, also called the Haudenosaunee, which traded with the Dutch at Fort Orange and later with the English. In the late 1600s the Iroquois and English colonists joined in a diplomatic alliance known as the Covenant Chain. In Virginia, the Powhatan Confederacy traded with Jamestown's settlers, but conflicts over land and food led to wars, including a Powhatan attack in 1622 that killed hundreds of colonists.",
        [
          "Common trap",
          "American Indians were not passive partners. Nations chose alliances to protect their land and trade, and they often bargained with several European powers at once.",
        ],
      ],
      "Europeans and American Indians formed alliances for their own purposes, and those alliances brought both cooperation and conflict.",
    ),
    section(
      "metacoms-war",
      "Metacom's War",
      ["WOR", "GEO"],
      [
        "By the 1670s English settlements in New England had grown, and colonists were pressing onto Native land, extending English law over Native peoples, and pushing Native communities to adopt Christianity. Metacom, a Wampanoag leader whom the English called King Philip, resisted these pressures. In 1675 fighting began after the English executed three Wampanoag men, and it spread across New England as the Wampanoag, Narragansett, Nipmuc, and other nations attacked English towns.",
        "Colonists, aided by Native allies such as the Mohegan, struck back, and the war ended in 1676 when Metacom was killed. Thousands of people died, including a large share of the colonial and Native populations, and English towns were destroyed. British conflicts with American Indians over land, resources, and political boundaries had led to a military confrontation, and its outcome broke the power of Native nations in southern New England, where many captives were enslaved or sold.",
      ],
      "Conflict over land and authority led to Metacom's War, which devastated both sides and ended Native power in southern New England.",
    ),
    section(
      "pueblo-revolt",
      "The Pueblo Revolt and Spanish accommodation",
      ["WOR", "ARC"],
      [
        "In New Mexico, Spanish colonists demanded labor and tribute from Pueblo peoples, and Franciscan priests tried to suppress Native religious ceremonies. In 1680, Pueblo communities, led in part by a religious leader named Popé, rose together, killed hundreds of Spanish colonists, including many priests, and drove the Spanish out of New Mexico.",
        "The Spanish returned in 1692 and 1693, but Pueblo resistance changed their approach. Spanish officials reduced forced labor demands and tolerated some Pueblo religious practices alongside Catholicism. American Indian resistance, particularly after the Pueblo Revolt, led to Spanish accommodation of some aspects of American Indian culture in the Southwest.",
      ],
      "The Pueblo Revolt expelled the Spanish for a time and led Spain to accommodate some Pueblo culture after its return.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 2.6",
      title: "Forced labor in the British colonies",
      body: "Wars and disease reduced Native populations, and English colonists increasingly relied on enslaved Africans for labor. Topic 2.6 follows how slavery grew and how enslaved people responded.",
      transferQuestion:
        "How did Native resistance in 1675 and 1680 resemble each other, and how did the results differ?",
      feedback:
        "A strong answer notes that both responded to colonial demands for land, labor, or religion, but that Native power ended in southern New England while the Pueblos expelled the Spanish and later gained accommodation.",
      links: [
        {
          topicId: "apush-1-6",
          sectionId: "diplomacy-and-resistance",
          label: "Review diplomacy and resistance in Period 1",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-2", "rowlandson-1682"],
});

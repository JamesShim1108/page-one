// Original Page One lesson for CED Topic 2.2.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("2.2", {
  summary:
    "How Spanish, French, Dutch, and English colonization differed in size, goals, labor, and relations with American Indians.",
  minutes: 10,
  goals: [
    "Explain how Spanish colonial institutions subjugated and incorporated Native peoples and Africans.",
    "Explain how French and Dutch colonies relied on trade alliances with American Indians.",
    "Explain why English colonization drew large numbers of migrants who settled on land taken from Native Americans.",
  ],
  bigIdea:
    "Spain built institutions of conquest and conversion, France and the Netherlands built small trading colonies, and England built agricultural colonies filled with migrants who took Native land.",
  context:
    "The CED asks you to explain how and why various European colonies developed and expanded. Compare what each empire wanted, who came, and how they treated Native peoples.",
  sections: [
    section(
      "spanish-colonies",
      "Spanish colonies in the borderlands",
      ["MIG", "WXT"],
      [
        "Spain's colonial system rested on extracting wealth from the land. In what is now the United States, Spain founded St. Augustine in Florida in 1565, and in 1598 Juan de Oñate led settlers into New Mexico, where Santa Fe became the capital in 1610. Spanish officials built institutions that subjugated Native peoples, converted them to Christianity through missions, and incorporated them, along with enslaved and free Africans, into colonial society.",
        "The Spanish ranked people by ancestry and demanded Native labor and tribute. Franciscan missionaries tried to replace Native religious practices. Spanish settlements in the borderlands were small and often served as military outposts to protect Spain's richer colonies farther south.",
      ],
      "Spain used conquest, conversion, and forced labor to subordinate Native peoples inside a ranked colonial society.",
    ),
    section(
      "french-and-dutch",
      "French and Dutch trading colonies",
      ["MIG", "WXT", "WOR"],
      [
        "France founded Quebec in 1608, and the Dutch founded New Netherland, with its port of New Amsterdam, in the 1620s under the Dutch West India Company. Both colonies attracted relatively few Europeans. Their goal was the fur trade, not large farming settlements, so colonists relied on trade alliances and on marriage and family ties with American Indians to acquire furs and other products for export to Europe.",
        "French traders and Jesuit missionaries traveled deep into the interior and allied with nations such as the Huron and Algonquin. The Dutch traded with the Iroquois at Fort Orange, near present-day Albany. Because these colonies needed Native partners, their relations with American Indians were more cooperative than in English colonies, although alliances also drew Native peoples into European rivalries.",
        [
          "Common trap",
          "French and Dutch cooperation with American Indians was practical, not equal. Colonists wanted furs, and trade changed Native economies and sometimes led to conflict.",
        ],
      ],
      "France and the Netherlands built small colonies that depended on trade alliances and family ties with Native peoples.",
    ),
    section(
      "english-colonies",
      "English settlement colonies",
      ["MIG", "WXT", "SOC"],
      [
        "England founded Jamestown in Virginia in 1607, Plymouth in 1620, and Massachusetts Bay in 1630. Unlike the Spanish, French, and Dutch, England attracted a comparatively large number of migrants, including many women and families, as well as other Europeans. They came seeking social mobility, economic prosperity, religious freedom, and better living conditions.",
        "Private joint-stock companies, such as the Virginia Company, paid for early ventures. English colonists focused on agriculture, settled on land taken from Native Americans, and lived separately from them. This pattern of settlement caused more direct conflict over land than the trade-based French and Dutch colonies did.",
      ],
      "England sent many families who farmed land taken from American Indians, which led to conflict over land.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 2.3",
      title: "From empires to regions",
      body: "Topic 2.3 looks inside the British colonies to see how environment, religion, and labor shaped separate regions.",
      transferQuestion:
        "Why would colonies built on farming settlements and colonies built on the fur trade treat Native peoples differently?",
      feedback:
        "A strong answer notes that farming settlers needed land, which led to conflict, while fur traders needed Native partners, which encouraged alliances.",
      links: [
        {
          topicId: "apush-1-5",
          sectionId: "casta-system",
          label: "Review the Spanish casta system",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-2"],
});

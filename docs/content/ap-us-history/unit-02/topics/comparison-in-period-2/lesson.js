// Original Page One lesson for CED Topic 2.8, a reasoning topic on comparison.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("2.8", {
  summary:
    "How to compare developments in Period 2: choosing criteria, finding similarities and differences, and explaining why they matter, using European empires and the British colonial regions.",
  minutes: 10,
  goals: [
    "Explain what a comparison requires: a criterion, similarities, differences, and an explanation of why they matter.",
    "Compare Spanish, French, Dutch, and British colonization in land, labor, and relations with American Indians.",
    "Compare the Chesapeake, New England, middle, and plantation colonies in economy, labor, society, and government.",
  ],
  bigIdea:
    "A strong comparison picks a clear criterion, identifies both similarities and differences, and explains the reasons that account for them.",
  context:
    "This topic applies the reasoning skill of comparison to everything in Unit 2. The CED asks you to compare the effects of the development of colonial society in the various regions of North America.",
  sections: [
    section(
      "comparison-basics",
      "How to compare",
      ["WOR"],
      [
        "Comparison means explaining similarities and differences between developments. A strong comparison starts with a criterion, such as labor, religion, or relations with American Indians, so that the things you compare are measured against the same standard. Then it names at least one similarity and one difference and explains why they existed. Listing facts about each subject separately is description, not comparison.",
        [
          "Common trap",
          "Do not stop after naming a difference. Explain why it existed, for example because of environment, goals, or labor needs, and say why it mattered.",
        ],
      ],
      "A comparison needs a criterion, similarities, differences, and reasons that explain them.",
    ),
    section(
      "comparing-empires",
      "Comparing European colonization",
      ["WOR", "MIG", "WXT"],
      [
        "Spain, France, the Netherlands, and Britain all wanted wealth, and all used American Indians as trading partners, workers, or allies. They differed in how they pursued their goals. Spain extracted wealth through conquest, missions, and forced labor and incorporated Natives and Africans into a ranked society. France and the Netherlands sent few colonists and relied on trade alliances and family ties to obtain furs. Britain sent many families who took land for farming, lived apart from Native peoples, and fought over land.",
        "These differences help explain why relations with American Indians varied. Colonies built around trade needed Native partners, while colonies built around land and farming needed Native land.",
      ],
      "All empires sought wealth, but the form of their colonies, and their relations with Native peoples, differed with their goals.",
    ),
    section(
      "comparing-regions",
      "Comparing the British colonial regions",
      ["GEO", "WXT", "SOC", "PCE"],
      [
        "The British colonial regions shared a great deal. All exported goods across the Atlantic, all took part in the slave trade to some degree, all developed elected assemblies, and all became more English over time. They differed in environment, economy, labor, and society. The Chesapeake and plantation colonies grew cash crops using indentured servants and then enslaved Africans. New England built family farms, towns, and a mixed economy. The middle colonies exported grain and were the most diverse.",
        "The explanations are largely environmental and demographic. Long growing seasons favored plantation crops and large enslaved workforces, rocky soil and short summers favored family farms and trade, and a rich grain belt and varied migration shaped the middle colonies.",
      ],
      "Regions shared Atlantic trade, assemblies, and Anglicization but differed in labor, economy, and society because of environment and demography.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Unit 3",
      title: "Differences that matter later",
      body: "Unit 3 covers the years from 1754 to 1800. The regional differences you compared here help explain why the colonies cooperated against Britain and why they later disagreed about slavery and the shape of the new nation.",
      transferQuestion:
        "Which regional difference from Period 2 would be most important in later political disputes, and why?",
      feedback:
        "A strong answer picks a difference, such as reliance on slavery, and explains how it created different interests in later debates.",
      links: [
        {
          topicId: "apush-2-3",
          sectionId: "plantation-colonies",
          label: "Review plantation colonies",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-2"],
});

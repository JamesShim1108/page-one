// Original Page One lesson for CED Topic 2.4.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("2.4", {
  summary:
    "How an Atlantic economy linked Europe, Africa, and the Americas, how Britain tried to control it through mercantilism, and how trade changed American Indian communities.",
  minutes: 10,
  goals: [
    "Explain how goods, enslaved people, and capital moved among Europe, Africa, and the Americas.",
    "Explain mercantilism and how Britain tried to enforce it, and why enforcement was erratic.",
    "Explain how trade with Europeans changed American Indian communities.",
  ],
  bigIdea:
    "Atlantic trade tied the colonies to Europe and Africa, Britain tried to run that trade for its own benefit through mercantilism, and trade transformed Native communities.",
  context:
    "The CED asks you to explain causes and effects of transatlantic trade over time. Follow the goods and the people: who produced them, who bought them, and who profited.",
  sections: [
    section(
      "atlantic-economy",
      "An Atlantic economy",
      ["WXT", "WOR"],
      [
        "An Atlantic economy developed in which goods, along with enslaved Africans and American Indians, moved among Europe, Africa, and the Americas through extensive trade networks. European colonial economies focused on acquiring, producing, and exporting commodities that were valued in Europe, such as tobacco, sugar, rice, furs, fish, and timber, and on gaining new sources of labor.",
        "Ships carried manufactured goods from Europe to Africa and the Americas, enslaved Africans across the Atlantic to the colonies, and colonial products back to Europe. Many voyages did not follow a neat triangle, and merchants also traded directly between colonies and the West Indies, but historians use the term triangular trade for this web of exchange. Some colonists also captured and sold American Indians as slaves, as in the Carolina trade, which sent many to the Caribbean.",
        [
          "Common trap",
          "The triangular trade is a model of connected routes, not a single fixed route that every ship followed.",
        ],
      ],
      "Colonial commodities, manufactured goods, and enslaved people moved through a web of Atlantic trade.",
    ),
    section(
      "mercantilism",
      "Mercantilism and imperial control",
      ["WXT", "PCE", "NAT"],
      [
        "Britain, like other European powers, followed mercantilism, the belief that a nation grows strong by exporting more than it imports and by using colonies to supply raw materials and buy its manufactured goods. To pursue those aims, Parliament passed the Navigation Acts beginning in 1651 and 1660. They required that colonial trade travel on English or colonial ships and that certain valuable goods, such as tobacco and sugar, be shipped only to England or other English colonies.",
        "Britain tried to fit its North American colonies into a coherent, hierarchical imperial structure, but enforcement was erratic. Conflicts with colonists and American Indians, the long distance across the Atlantic, and Britain's own distractions meant that smuggling was common and many rules went unenforced. Britain's occasional efforts to tighten control, such as the Dominion of New England in the 1680s, met resistance.",
      ],
      "Britain used the Navigation Acts to make the colonies serve its economy, but weak and uneven enforcement left colonists room to resist.",
    ),
    section(
      "native-economies",
      "Trade and American Indian communities",
      ["WXT", "GEO", "WOR"],
      [
        "Continuing trade with Europeans increased the flow of goods in and out of American Indian communities. Native peoples traded furs and deerskins for metal tools, cloth, and guns. This trade stimulated cultural and economic change, such as dependence on European goods and shifts in hunting patterns.",
        "Contact also spread epidemic diseases that caused radical demographic shifts, killing large shares of some communities. Competition for trade goods and hunting grounds also sharpened rivalries among Native nations and among European empires.",
      ],
      "Trade changed Native economies and cultures, and it spread epidemic disease that reshaped Native populations.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 2.5",
      title: "Trade and conflict",
      body: "Trade created alliances, but it also fueled competition for land and resources. Topic 2.5 follows the alliances and wars that resulted.",
      transferQuestion:
        "How did the fur trade encourage both cooperation and conflict between Europeans and American Indians?",
      feedback:
        "A strong answer names a form of cooperation, such as alliances, and a source of conflict, such as competition for hunting grounds and trade.",
      links: [
        {
          topicId: "apush-1-4",
          sectionId: "silver-and-trade",
          label: "Review silver and the European economy",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-2"],
});

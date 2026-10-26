// Original Page One lesson for CED Topic 3.12.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.12", {
  summary:
    "How American Indian nations adjusted their alliances, how westward migration spread frontier cultures and tensions, and how slavery expanded in the Deep South while antislavery sentiment grew in the North.",
  minutes: 12,
  goals: [
    "Explain how American Indian groups evaluated and adjusted their alliances from 1754 to 1800.",
    "Explain how westward migration and frontier cultures caused competition and conflict.",
    "Explain how the expansion of slavery and rising antislavery sentiment produced distinct regional attitudes.",
  ],
  bigIdea:
    "Movement of people into the interior intensified competition for land, and the growth of slavery in one region and its decline in another created lasting regional differences.",
  context:
    "The CED asks you to explain how migration and immigration caused competition and conflict, and how regional attitudes about slavery changed. This topic builds connections across regions, so practice linking a cause to a pattern.",
  sections: [
    section(
      "american-indian-alliances",
      "American Indian alliances",
      ["MIG", "WOR", "GEO"],
      [
        "Various American Indian groups repeatedly evaluated and adjusted their alliances with Europeans, other tribes, and the United States, seeking to limit migration of white settlers and maintain control of tribal lands and natural resources. During the Revolution, Native nations had to choose sides or try to stay neutral, and the Haudenosaunee (Iroquois) Confederacy split, with some nations supporting the Patriots and others the British. The Treaty of Paris of 1783 gave the United States land claimed by Native nations, who were not parties to it.",
        "After the war, a confederation of Native peoples in the Ohio country resisted U.S. expansion with British support. British alliances with American Indians contributed to tensions between the United States and Britain, because British forts remained in the Northwest. These tensions eased after Fallen Timbers in 1794, when Native forces were defeated, and after Jay's Treaty, in which Britain agreed to leave the forts.",
      ],
      "Native nations made shifting alliances to protect their lands, and British support for them added to tensions with the United States.",
    ),
    section(
      "frontier-cultures",
      "Westward migration and frontier cultures",
      ["MIG", "SOC", "GEO"],
      [
        "As increasing numbers of migrants from North America and other parts of the world continued to move westward, frontier cultures that had emerged in the colonial period continued to grow, fueling social, political, and ethnic tensions. After the Revolution, settlers crossed the Appalachians into Kentucky and Tennessee, which became states in 1792 and 1796, and into the Ohio country. Many of them were of Scots-Irish and German descent, and they made their living from farming, hunting, and trade.",
        "Frontier settlers wanted secure land titles, protection from Native peoples, and access to markets, especially through the Mississippi River. They often resented eastern elites and federal policies such as taxes, which was the background of the Whiskey Rebellion. Competition for land also meant conflict with Native nations, with the Spanish and British, and among settlers themselves.",
      ],
      "Settlers who moved west brought frontier cultures with them and competed for land with Native peoples and one another.",
    ),
    section(
      "slavery-and-regional-attitudes",
      "Slavery and regional attitudes",
      ["SOC", "WXT", "GEO"],
      [
        "The expansion of slavery in the Deep South and adjacent western lands and rising antislavery sentiment began to create distinctive regional attitudes toward slavery. In the North, states abolished slavery or adopted gradual emancipation, and the Northwest Ordinance banned slavery north of the Ohio River. Free Black communities in northern cities formed churches and aid societies, such as the Free African Society, founded in Philadelphia in 1787 by Richard Allen and Absalom Jones.",
        "In the South, the invention of the cotton gin in 1793 made short-staple cotton profitable and encouraged the spread of slavery into the Deep South and westward. Many white Southerners who had once called slavery an evil came to defend it as necessary. The Constitution protected slavery with the Three-Fifths Compromise, the fugitive slave clause, and the delay of any ban on the international slave trade until 1808. Fear of slave rebellion, heightened by the Haitian Revolution, led Southern states to tighten control of enslaved people.",
        [
          "Common trap",
          "Slavery was not limited to the South in 1790, and antislavery action was not limited to the North. The pattern was uneven, and it was moving in different directions in different regions.",
        ],
      ],
      "Slavery declined in the North and expanded in the Deep South, which created distinct regional attitudes.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.13",
      title: "Looking across the period",
      body: "Topic 3.13 asks what stayed the same and what changed between 1754 and 1800.",
      transferQuestion:
        "How did the cotton gin and the Revolution's ideals pull the nation in different directions on slavery?",
      feedback:
        "A strong answer explains that the ideals led some to question slavery while the cotton gin gave slaveholders a new economic reason to expand it.",
      links: [
        {
          topicId: "apush-3-6",
          sectionId: "equality-and-slavery",
          label: "Review equality and slavery",
        },
      ],
    },
  ],
  sourceIds: [],
});

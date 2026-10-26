// Original Page One lesson for CED Topic 4.13.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.13", {
  summary:
    "How cotton, soil exhaustion, and the westward movement of slavery shaped the South's economy, society, and sense of regional identity from 1800 to 1848.",
  minutes: 12,
  goals: [
    "Explain how reliance on agricultural staples shaped a distinctive Southern identity.",
    "Explain how overcultivation and the search for fertile land moved slavery west.",
    "Explain how Southern leaders defended slavery as part of the Southern way of life.",
  ],
  bigIdea:
    "The South tied its economy to cotton and slavery, expanded slavery into new lands as old fields wore out, and developed a regional identity that its leaders defended.",
  context:
    "The CED asks you to explain how geographic and environmental factors shaped the development of the South. Link soil, climate, and rivers to crops, labor, migration, and the South's political and cultural defense of slavery.",
  sections: [
    section(
      "cotton-and-regional-identity",
      "Cotton and Southern identity",
      ["GEO", "WXT", "ARC"],
      [
        "Southern business leaders continued to rely on the production and export of traditional agricultural staples, contributing to the growth of a distinctive Southern regional identity. Cotton became the leading crop after the invention of the cotton gin in 1793 and the demand of British and New England textile mills. By the 1830s and 1840s cotton made up roughly half of the nation's exports by value, and the South's long growing season and warm, wet climate suited it well.",
        "While the North built factories, canals, and railroads, the South invested its wealth in land and in enslaved laborers. It had fewer cities, banks, and factories, and fewer immigrants, than the North. Its economy relied on exports and on Northern and British merchants and bankers, and these differences encouraged white Southerners to see their region as distinct.",
      ],
      "Dependence on cotton and slave labor set the South apart from the North and shaped its regional identity.",
    ),
    section(
      "westward-slavery",
      "Overcultivation and the westward movement of slavery",
      ["GEO", "MIG", "SOC"],
      [
        "As overcultivation depleted arable land in the Southeast, slaveholders began relocating their plantations to more fertile lands west of the Appalachians, where the institution of slavery continued to grow. Tobacco and cotton had worn out the soil of Virginia, the Carolinas, and Georgia. Planters moved to Alabama, Mississippi, Louisiana, and later Texas, where the black soil of the Mississippi Valley and the Gulf plains was rich.",
        "The movement was also a forced migration of enslaved people. Between 1790 and 1860 about a million enslaved people were moved from the Upper South to the Deep South, many by traders who sold them in markets such as Richmond and New Orleans, which broke up families. This westward expansion of slavery caused the contests over new territories discussed in Topic 4.3.",
      ],
      "Soil exhaustion pushed planters west, and enslaved people were moved by force to new cotton lands.",
    ),
    section(
      "slavery-as-a-way-of-life",
      "Slavery as a Southern way of life",
      ["SOC", "ARC", "PCE"],
      [
        "In the South, although the majority of Southerners owned no enslaved persons, most leaders argued that slavery was part of the Southern way of life. About three-fourths of white Southern families owned no enslaved people, and many were yeoman farmers who grew food and some cotton on small farms. A small group of large planters held most of the enslaved people, most of the wealth, and most of the political power.",
        "After the 1830s, as abolitionism grew in the North, many Southern leaders stopped calling slavery a necessary evil and began to defend it as a “positive good.” John C. Calhoun and others argued that slavery benefited both enslaved and enslavers. Proslavery writers used economics, religion, and claims about race to support their case. White Southerners who did not own slaves often supported slavery because they hoped to own slaves someday and because it gave them a claim to higher status than Black people.",
        [
          "Common trap",
          "Do not assume that most white Southerners owned enslaved people. Most owned none, but the large planters who did dominated Southern politics and economic life.",
        ],
      ],
      "Planters led the South, and as abolitionism grew, Southern leaders defended slavery as a positive good and as part of their way of life.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.14",
      title: "Pulling Period 4 together",
      body: "The South's development, the market revolution, and westward expansion all shaped American identity. Topic 4.14 asks how to reason about causes across the period.",
      transferQuestion:
        "How did the demand of Northern and British textile mills affect Southern society?",
      feedback:
        "A strong answer notes that demand for cotton raised the value of land and enslaved labor, tied the South to export markets, and expanded slavery to new lands.",
      links: [
        {
          topicId: "apush-4-5",
          sectionId: "transportation-and-commerce",
          label: "Review transportation, commerce, and regional ties",
        },
      ],
    },
  ],
  sourceIds: [],
});

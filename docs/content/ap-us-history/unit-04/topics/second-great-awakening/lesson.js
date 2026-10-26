// Original Page One lesson for CED Topic 4.10.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.10", {
  summary:
    "Why a wave of Protestant revivals swept the United States after 1800, and how the Second Great Awakening reshaped religion and set the stage for reform.",
  minutes: 11,
  goals: [
    "Explain the causes of the Second Great Awakening.",
    "Describe revivals, preachers, and new religious movements of the period.",
    "Explain how the Awakening influenced American society and reform.",
  ],
  bigIdea:
    "Democratic and individualistic beliefs, a response to rationalism, and the changes of the market revolution helped to produce a Protestant revival that emphasized individual choice and moral improvement.",
  context:
    "The CED asks you to explain the causes of the Second Great Awakening. Separate the causes from the effects: causes lie in ideas and society before the revivals, and effects appear in reform and new churches.",
  sections: [
    section(
      "causes-of-the-awakening",
      "Causes of the Second Great Awakening",
      ["ARC", "SOC"],
      [
        "The rise of democratic and individualistic beliefs, a response to rationalism, and changes to society caused by the market revolution, along with greater social and geographical mobility, contributed to a Second Great Awakening among Protestants. Many Americans of the early republic believed that ordinary people could govern themselves, and they came to believe that ordinary people could also make their own religious choices.",
        "Some Americans reacted against rationalism, the Enlightenment emphasis on reason, which had led some leaders to embrace Deism and Unitarianism. Others felt anxious about a rapidly changing society. As people moved to cities and to the West, away from the churches of their communities, revivals offered a sense of belonging and moral order.",
      ],
      "Democratic ideas, a reaction against rationalism, and the disruption of the market revolution drew many Americans to revivals.",
    ),
    section(
      "revivals-and-new-churches",
      "Revivals and new religious movements",
      ["ARC", "SOC"],
      [
        "Revivals spread through camp meetings, such as the large gathering at Cane Ridge, Kentucky, in 1801, and through preachers such as Charles Grandison Finney, who held revivals in western New York and in Northern cities in the 1820s and 1830s. Finney taught that individuals could choose salvation and could work to improve themselves and society. This view differed from the Calvinist belief in predestination. Methodist and Baptist churches grew rapidly because they accepted ordinary preachers and welcomed participation from many people.",
        "The Awakening also produced new religious groups. Joseph Smith founded the Church of Jesus Christ of Latter-day Saints in 1830, and after its members faced hostility in several states, they migrated west. African Americans founded their own churches, such as the African Methodist Episcopal Church (1816), because they were often kept at the margins of white congregations. Women played a central role in the revivals, in church membership, and in religious organizations.",
      ],
      "Camp meetings and preachers such as Finney spread revival, and new churches, including Black churches and the Latter-day Saints, grew from it.",
    ),
    section(
      "effects-of-the-awakening",
      "Effects on American society",
      ["ARC", "PCE", "SOC"],
      [
        "The Awakening influenced moral and social reforms and inspired utopian and other religious movements. Revivalists urged believers to improve themselves and to reform their society. Many converts joined movements for temperance, education, the abolition of slavery, and women's rights, which are the subject of Topic 4.11. The revivals reached the frontier and the settled East alike, and in the South many white and Black Southerners joined Methodist and Baptist congregations.",
        [
          "Common trap",
          "The Second Great Awakening was a cause of reform movements, not the same thing as reform. Keep the revivals separate from the movements they helped to inspire.",
        ],
      ],
      "The Awakening encouraged individual improvement and inspired many reform efforts and new religious communities.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.11",
      title: "From revival to reform",
      body: "The belief that individuals and society could be improved drove an age of reform. Topic 4.11 follows the reform movements.",
      transferQuestion:
        "How did the market revolution contribute to the Second Great Awakening?",
      feedback:
        "A strong answer notes that migration, wage labor, and city life weakened traditional communities and left people looking for moral order and belonging.",
      links: [
        {
          topicId: "apush-4-6",
          sectionId: "migration-and-new-communities",
          label: "Review migration and new communities",
        },
      ],
    },
  ],
  sourceIds: [],
});

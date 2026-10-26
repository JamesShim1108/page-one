// Original Page One lesson for CED Topic 5.2.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.2", {
  summary:
    "Why many Americans believed that the nation was meant to reach the Pacific, how settlers and new laws moved people west, and how the United States sought ties with Asia.",
  minutes: 12,
  goals: [
    "Explain how the idea of Manifest Destiny was used to justify westward expansion.",
    "Explain the causes of migration to the West, including the role of new legislation.",
    "Explain how interest in trade led to American initiatives in Asia.",
  ],
  bigIdea:
    "Belief in Manifest Destiny, hopes for land and wealth, and new laws moved Americans west, while interest in trade pulled the nation toward Asia.",
  context:
    "The CED asks you to explain the causes and effects of westward expansion. For each cause, ask who held the belief or hope and what it led them to do.",
  sections: [
    section(
      "manifest-destiny-and-annexation",
      "Manifest Destiny and annexation",
      ["GEO", "NAT", "WOR"],
      [
        "Advocates of annexing western lands argued that Manifest Destiny and the superiority of American institutions compelled the United States to expand its borders westward to the Pacific Ocean. The phrase was used in 1845 by the journalist John L. O'Sullivan, and it expressed a widespread belief that the nation was meant to spread across the continent. This expansion frequently provoked competition and violent conflict.",
        "President James K. Polk, elected in 1844, made expansion the aim of his administration. Texas, which had won its independence from Mexico in 1836, became a state in 1845. In his Inaugural Address, Polk described the annexation of Texas as a “peaceful acquisition” and claimed that the right of the United States to the Oregon country was “clear and unquestionable.” In 1846 the United States and Britain agreed to divide the Oregon country along the 49th parallel, and expansion into the Southwest led to war with Mexico, which is the subject of Topic 5.3.",
        [
          "Common trap",
          "Manifest Destiny was a popular belief and not a law or a treaty. Many Americans did not share it. Some Whigs and Northerners opposed annexation because they feared that it would add slave states.",
        ],
      ],
      "Manifest Destiny gave a name to the belief that the United States should stretch to the Pacific, and Polk acted on it.",
    ),
    section(
      "migration-to-the-west",
      "Migration to the West",
      ["MIG", "WXT", "GEO"],
      [
        "The desire for access to natural and mineral resources and the hope of many settlers for economic opportunities or religious refuge led to increased migration to and settlement in the West. In the 1840s thousands of families followed the Oregon Trail to the Pacific Northwest. In 1847 the Mormons, who had suffered violence in the Midwest, followed Brigham Young to the Great Salt Lake in what became Utah. After gold was discovered at Sutter's Mill in 1848, hundreds of thousands of people, including migrants from Latin America, Europe, and China, came to California in the Gold Rush that followed.",
        "Westward migration was boosted during and after the Civil War by the passage of new legislation promoting western transportation and economic development. The Homestead Act (1862) offered 160 acres of public land to settlers who lived on it and farmed it for five years. The Pacific Railway Act (1862) provided land and loans for the building of a transcontinental railroad, which was completed in 1869. The Morrill Land-Grant Act (1862) gave states land to support colleges.",
      ],
      "Resources, opportunity, and religious refuge drew migrants west, and the laws of 1862 sped the movement during the Civil War era.",
    ),
    section(
      "trade-with-asia",
      "Trade with Asia",
      ["WOR", "WXT"],
      [
        "U.S. interest in expanding trade led to economic, diplomatic, and cultural initiatives to create more ties with Asia. The Treaty of Wanghia (1844) opened Chinese ports to American merchants. In 1853 and 1854 Commodore Matthew Perry led a naval squadron to Japan and negotiated the Treaty of Kanagawa, which opened two Japanese ports to American ships. The acquisition of California gave the United States ports on the Pacific for this trade.",
        "After the Civil War, Secretary of State William Seward continued the effort to extend American reach. In 1867 the United States purchased Alaska from Russia for $7.2 million, which gave it a base on the northern Pacific.",
      ],
      "Trade with Asia was one reason that the United States wanted Pacific ports, and treaties in China and Japan followed.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.3",
      title: "From annexation to war",
      body: "Expansion into Texas and the Southwest led to a border dispute with Mexico. Topic 5.3 follows the war that resulted.",
      transferQuestion:
        "How was Polk's argument for annexing Texas similar to, or different from, Jefferson's reasons for buying Louisiana?",
      feedback:
        "A strong answer notes that both leaders sought security and markets and linked land to the nation's future, while Jefferson doubted that the Constitution allowed the purchase and Polk presented annexation as the wish of Texas.",
      links: [
        {
          topicId: "apush-4-4",
          sectionId: "diplomacy-and-borders",
          label: "Review earlier border agreements",
        },
      ],
    },
  ],
  sourceIds: ["polk-1845"],
});

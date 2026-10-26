// Original Page One lesson for CED Topic 5.3.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.3", {
  summary:
    "Why the United States and Mexico went to war in 1846, how the war ended, and what the lands of the Mexican Cession meant for slavery, Mexicans, and American Indians.",
  minutes: 12,
  goals: [
    "Explain the causes of the Mexican–American War, including the dispute over the Texas border.",
    "Explain the terms of the treaty that ended the war and the territory that the United States gained.",
    "Explain how the war and the new lands affected slavery, Mexican Americans, and American Indians.",
  ],
  bigIdea:
    "The Mexican–American War gave the United States a vast new territory in the West, and the acquisition raised new questions about slavery and about the rights of the people who already lived there.",
  context:
    "The CED asks you to compare the arguments of two sources on this topic. As you read, notice who made each argument, when, and for what purpose, because the supporters and opponents of the war described the same events very differently.",
  sections: [
    section(
      "road-to-war",
      "Texas, the border, and the road to war",
      ["WOR", "GEO", "NAT"],
      [
        "After the United States annexed Texas, it and Mexico disagreed about the border. Mexico had never accepted the independence of Texas, and it claimed that Texas ended at the Nueces River, while the United States and Texas claimed the Rio Grande. In 1845 President Polk sent a diplomat, John Slidell, to try to buy California and New Mexico and to settle the border, and Mexico refused to receive him. In early 1846 Polk ordered General Zachary Taylor to move troops into the disputed land near the Rio Grande.",
        "When fighting began in April 1846, Polk asked Congress to declare war, and Congress did so in May. Polk presented the war as a defense against invasion. In his message of December 1846 he said that Mexico had “invaded our territory” and had shed “the blood of our citizens on our own soil.”",
        "Not all Americans agreed. Many Whigs and antislavery Northerners argued that Polk had provoked the war in order to gain land that slaveholders could use. The writer Henry David Thoreau called the war “the work of comparatively a few individuals using the standing government as their tool.” Abraham Lincoln, then a congressman from Illinois, questioned whether the ground where the fighting began belonged to the United States.",
        [
          "Common trap",
          "Americans disagreed about who started the war. Polk's account is the account of one party to the dispute, and it should not be treated as settled fact.",
        ],
      ],
      "A disputed border and Polk's willingness to use force led to a war that many Americans supported and many opposed.",
    ),
    section(
      "victory-and-the-treaty",
      "Victory and the Treaty of Guadalupe Hidalgo",
      ["WOR", "GEO"],
      [
        "The United States won by invading Mexico on several fronts. American forces took New Mexico and California, and General Winfield Scott landed at Veracruz and captured Mexico City in 1847. The Treaty of Guadalupe Hidalgo (1848) ended the war. Mexico accepted the Rio Grande as the southern boundary of Texas and gave up California and the lands of the Southwest, which together are called the Mexican Cession. In return the United States paid Mexico $15 million.",
        "The United States added large territories in the West through victory in the Mexican–American War and diplomatic negotiations. In 1853 the Gadsden Purchase added a strip of land in present-day Arizona and New Mexico for $10 million, which made possible a southern route for a railroad to the Pacific.",
      ],
      "The war and the treaties that followed added California and the Southwest and completed the nation's reach to the Pacific.",
    ),
    section(
      "slavery-mexicans-and-american-indians",
      "Slavery, Mexicans, and American Indians in the new lands",
      ["SOC", "MIG", "PCE"],
      [
        "The new territories raised questions about the status of slavery, American Indians, and Mexicans. In 1846 Representative David Wilmot proposed that slavery be banned in any land acquired from Mexico. The Wilmot Proviso passed the House but not the Senate, and the vote divided Northerners from Southerners, which is the subject of Topic 5.4.",
        "The treaty promised the Mexicans who stayed in the territory the opportunity to become United States citizens and the protection of their property. In practice many Mexican Americans lost their land through lawsuits, taxes, and violence, and they faced discrimination. Government interaction and conflict with Mexican Americans and American Indians increased in regions newly taken from American Indians and Mexico, which altered the economic self-sufficiency and cultures of these groups. The Navajo, Apache, and Comanche peoples faced new pressure from settlers and soldiers, and the Native peoples of California suffered violence and disease during the Gold Rush.",
      ],
      "The new lands renewed the dispute over slavery and cost Mexican Americans and American Indians land and independence.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.4",
      title: "A new debate over slavery",
      body: "The Mexican Cession made the question of slavery in the territories the central issue in national politics. Topic 5.4 follows the Compromise of 1850.",
      transferQuestion:
        "Why did the acquisition of land from Mexico revive a debate that the Missouri Compromise had seemed to settle?",
      feedback:
        "A strong answer notes that the Missouri Compromise drew a line only through the Louisiana Purchase, so it did not cover the Mexican Cession, and that the balance of free and slave states was again at stake.",
      links: [
        {
          topicId: "apush-4-3",
          sectionId: "missouri-compromise",
          label: "Review the Missouri Compromise",
        },
      ],
    },
  ],
  sourceIds: ["polk-1846", "thoreau-1849"],
});

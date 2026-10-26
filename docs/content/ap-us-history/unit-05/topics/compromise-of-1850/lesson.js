// Original Page One lesson for CED Topic 5.4.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.4", {
  summary:
    "How the question of slavery in the Mexican Cession brought a national crisis, what the Compromise of 1850 provided, and how Northerners and Southerners reacted to it.",
  minutes: 12,
  goals: [
    "Explain the competing positions on slavery in the territories acquired from Mexico.",
    "Describe the main provisions of the Compromise of 1850.",
    "Compare how Northern and Southern attitudes shaped federal policy and reactions to the Compromise.",
  ],
  bigIdea:
    "The Compromise of 1850 gave each section part of what it wanted and avoided a crisis for the moment, but it left both sections with grievances.",
  context:
    "The CED asks you to explain the similarities and differences in how regional attitudes affected federal policy after the Mexican–American War. As you read, ask what each section wanted from Congress and what it was willing to accept.",
  sections: [
    section(
      "slavery-in-the-mexican-cession",
      "Slavery in the Mexican Cession",
      ["PCE", "NAT", "GEO"],
      [
        "The Mexican Cession led to heated controversies over whether to allow slavery in the newly acquired territories. Northerners who supported the Wilmot Proviso, and the Free-Soil Party that formed in 1848, wanted Congress to bar slavery from the territories. Southerners such as Senator John C. Calhoun argued that the territories belonged to all of the states and that Congress had no power to keep slaveholders from taking enslaved people into them. A third position, popular sovereignty, was supported by Senator Lewis Cass and would let the settlers of each territory decide.",
        "The Gold Rush brought so many people to California that it applied for statehood in 1849 with a constitution that barred slavery. At the time there were fifteen free states and fifteen slave states. The admission of California would give the free states a majority in the Senate, which was the only place where the South could still block laws that it opposed.",
        [
          "Common trap",
          "Popular sovereignty and the Wilmot Proviso were different answers. The Proviso would have banned slavery in the territories by an act of Congress, and popular sovereignty left the choice to the settlers.",
        ],
      ],
      "The Mexican Cession divided Americans into those who would bar slavery from the territories, those who would protect it, and those who would let settlers decide.",
    ),
    section(
      "the-compromise",
      "The Compromise of 1850",
      ["PCE", "NAT"],
      [
        "The courts and national leaders made a variety of attempts to resolve the issue of slavery in the territories, including the Compromise of 1850. Senator Henry Clay of Kentucky proposed a plan in January 1850. After the death of President Zachary Taylor, Senator Stephen Douglas of Illinois guided its parts through Congress as separate bills, and President Millard Fillmore signed them in September.",
        "The Compromise made five main changes. California entered the Union as a free state. The rest of the Mexican Cession was organized as the territories of Utah and New Mexico, where the settlers would decide on slavery. Texas gave up its claim to part of New Mexico and received $10 million to pay its debts. The slave trade, but not slavery, was ended in Washington, D.C. A stronger Fugitive Slave Act required citizens to help to capture people who had escaped from slavery and denied accused fugitives a jury trial.",
      ],
      "California entered as a free state, and the South received popular sovereignty in the other territories and a stronger Fugitive Slave Act.",
    ),
    section(
      "regional-reactions",
      "Regional attitudes and reactions",
      ["PCE", "SOC", "NAT"],
      [
        "Leaders in both sections shared a goal, which was to settle the question of slavery in the territories and to keep the Union together. In both sections some also opposed any compromise. In the North, antislavery Americans resented the Fugitive Slave Act because it required them to take part in returning people to slavery. Some Northern states passed personal liberty laws to protect Black residents, the Underground Railroad grew, and Harriet Beecher Stowe's novel Uncle Tom's Cabin (1852) turned many readers against slavery.",
        "In the South, many welcomed the Fugitive Slave Act, but they objected to the admission of California as a free state, and at the Nashville Convention in 1850 some delegates talked of leaving the Union. The Compromise brought a few years of calm. It did not end the dispute, and the next attempts to settle it, described in Topic 5.6, failed.",
      ],
      "Northerners objected most to the Fugitive Slave Act, and Southerners objected most to California's admission as a free state.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.5",
      title: "Why the compromise could not last",
      body: "The Compromise rested on a truce between two sections with different economies and ideas. Topic 5.5 explains those differences.",
      transferQuestion:
        "How was the Compromise of 1850 similar to the Missouri Compromise, and how was it different?",
      feedback:
        "A strong answer notes that both sought to settle the spread of slavery by an agreement between the sections, while the Missouri Compromise drew a line across the territory and the Compromise of 1850 left most of the question to the settlers.",
      links: [
        {
          topicId: "apush-4-3",
          sectionId: "missouri-compromise",
          label: "Review the Missouri Compromise",
        },
      ],
    },
  ],
  sourceIds: [],
});

// Original Page One lesson for CED Topic 5.1.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.1", {
  summary:
    "A map of Period 5 (1844–1877): expansion and migration, debates over rights and citizenship, and the sectional conflict that led to the Civil War and Reconstruction.",
  minutes: 11,
  goals: [
    "Explain the context in which sectional conflict emerged from 1844 to 1877.",
    "Describe how expansion and migration connected the United States to the wider world.",
    "Trace how debates over slavery led to civil war and to the contested reconstruction of the South.",
  ],
  bigIdea:
    "Expansion, migration, and debates over slavery pushed the nation toward civil war, and the Union's victory ended slavery and secession but left the meaning of citizenship contested.",
  context:
    "Contextualization, the CED skill for this topic, means placing an event or a source in the broader setting of its time. For Period 5 the setting is a nation that was growing quickly in territory and population while it divided over slavery.",
  sections: [
    section(
      "expansion-and-connection",
      "Expansion and new connections",
      ["GEO", "MIG", "WOR"],
      [
        "Between 1844 and 1877, the United States became more connected with the world, pursued an expansionist foreign policy in the Western Hemisphere, and emerged as the destination for many migrants from other countries. Popular enthusiasm for expansion, supported by economic and security interests, led to the acquisition of new territories, to substantial migration westward, and to new overseas initiatives.",
        "By 1848 the nation reached the Pacific Ocean through the annexation of Texas, an agreement with Britain over the Oregon country, and the lands taken from Mexico. Migration from Europe, mainly from Ireland and Germany, increased the population of the Northern states, and trade with Asia grew.",
      ],
      "By 1848 the United States reached from the Atlantic to the Pacific, and its population was growing through migration.",
    ),
    section(
      "rights-and-citizenship",
      "Debates over rights and citizenship",
      ["SOC", "PCE"],
      [
        "In the 1840s and 1850s, Americans continued to debate questions about rights and citizenship for various groups of U.S. inhabitants. The groups included enslaved and free African Americans, women, immigrants, American Indians, and the Mexicans who lived in the lands that the United States acquired. These debates built on earlier arguments about the Declaration of Independence's claim that “all men are created equal.”",
        "After the Civil War, the same questions returned in new forms. Reconstruction and the Civil War ended slavery, altered the relationship between the states and the federal government, and led to debates over new definitions of citizenship, particularly regarding the rights of African Americans, women, and other minorities.",
        [
          "Common trap",
          "Period 5 was not only about slavery. Slavery divided the nation most deeply, but questions about immigrants, women, and American Indians ran alongside it.",
        ],
      ],
      "Debates over who belonged and who held rights began before the war and continued after it.",
    ),
    section(
      "sectional-conflict-and-reconstruction",
      "From sectional conflict to Reconstruction",
      ["NAT", "PCE", "ARC"],
      [
        "Intensified by expansion and deepening regional divisions, debates over slavery and other economic, cultural, and political issues led the nation into civil war. Debates over slavery came to dominate political discussion in the 1850s, and they culminated in the bitter election of 1860 and the secession of Southern states.",
        "The North's greater manpower and industrial resources, the leadership of Abraham Lincoln and others, and the decision to emancipate enslaved people eventually led to the Union's military victory in the devastating Civil War. The Union victory and the contested reconstruction of the South settled the issues of slavery and secession, but they left unresolved many questions about the power of the federal government and the rights of citizens.",
        "Keep the order of events in mind: the Mexican–American War (1846–1848), the Compromise of 1850, the Kansas–Nebraska Act (1854), the Dred Scott decision (1857), Lincoln's election (1860), the Civil War (1861–1865), and Reconstruction (1865–1877).",
      ],
      "A war over expansion opened a period of sectional conflict, a civil war ended slavery, and Reconstruction left the rights of citizens unsettled.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.2",
      title: "Where the story begins",
      body: "The disputes of Period 5 grew out of the westward spread of slavery in Period 4. Topic 5.2 follows the drive to expand to the Pacific.",
      transferQuestion:
        "Which development from Period 4 do you think did the most to prepare the sectional conflict that followed?",
      feedback:
        "A strong answer picks one development, such as the westward movement of slavery or the Missouri Compromise, and connects it to the conflicts over slavery in new territories after 1844.",
      links: [
        {
          topicId: "apush-4-1",
          sectionId: "expansion-and-slavery",
          label: "Review expansion and slavery before 1848",
        },
      ],
    },
  ],
  sourceIds: [],
});

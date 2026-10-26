// Original Page One lesson for CED Topic 5.12, a reasoning-process topic.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.12", {
  summary:
    "A guide to comparing the responses to slavery before the Civil War, the two sides in the war, and the roles of the federal government during the war and Reconstruction.",
  minutes: 12,
  goals: [
    "Explain what a comparison is and how to separate similarities from differences.",
    "Compare Northern and Southern responses to slavery and the national attempts to settle the question in the 1850s.",
    "Compare the Union and the Confederacy, and compare the Civil War and Reconstruction as turning points for the federal government and for rights.",
  ],
  bigIdea:
    "The Civil War and Reconstruction ended slavery and enlarged the power of the federal government, but they left unresolved many questions about the power of that government and the rights of citizens.",
  context:
    "The CED treats comparison as a historical reasoning process. The strongest answers choose a category of comparison, identify at least one similarity and one difference, and explain why they existed, using specific evidence.",
  sections: [
    section(
      "how-to-reason-about-comparison",
      "How to reason about comparison",
      ["NAT", "SOC"],
      [
        "Comparison means describing and explaining similarities and differences between two or more people, groups, events, or developments. Begin by naming the things you are comparing. Then choose a category of comparison, such as economy, goals, methods, or results, so that your points line up. Say what they share and how they differ in that category.",
        "A strong comparison also explains why. A similarity or a difference becomes historical reasoning when you say what caused it or what it shows. Do not describe each item separately and leave the reader to find the link. Use words such as “both,” “however,” and “whereas” to keep the two sides in the same sentence.",
      ],
      "Name the items, choose a category, give a similarity and a difference, and explain why.",
    ),
    section(
      "comparing-responses-to-slavery",
      "Comparing responses to slavery before the war",
      ["SOC", "PCE", "GEO"],
      [
        "Ideological and economic differences over slavery produced an array of diverging responses from Americans in the North and the South. The North's expanding manufacturing economy relied on free labor, in contrast to the Southern economy's dependence on enslaved labor. Within the North, abolitionists, who were a minority, presented moral arguments against slavery as an institution and sometimes expressed a willingness to use violence. Free-soilers wanted only to stop its spread to protect free labor, and some of them did not object to slavery on principle. In the South, defenders of slavery relied on racial doctrines, on the view that slavery was a positive social good, and on the belief that the Constitution protected slavery and states' rights.",
        "National leaders tried to settle the question of slavery in the territories. The Compromise of 1850 admitted California as a free state, applied popular sovereignty to Utah and New Mexico, ended the slave trade in the District of Columbia, and passed a stronger Fugitive Slave Act. The Kansas–Nebraska Act of 1854 also relied on popular sovereignty, but it repealed the Missouri Compromise line. The two measures were alike in leaving the choice to settlers, but they differed in their results. The Compromise of 1850 eased the conflict for a time, and the Kansas–Nebraska Act revived it, split the Whigs and the Democrats, and led to the Republican Party and to violence in Kansas.",
        "In the Lincoln–Douglas debates of 1858, Stephen Douglas defended popular sovereignty, while Abraham Lincoln argued that slavery should not spread into the territories. Both men were Illinois candidates who wished to preserve the Union. They differed over whether the nation could allow slavery to expand.",
      ],
      "Americans agreed on the importance of the Union but differed over free labor, moral arguments, and the expansion of slavery, and each attempt at compromise failed to end that disagreement.",
    ),
    section(
      "comparing-the-war-and-reconstruction",
      "Comparing the war and Reconstruction",
      ["PCE", "WXT", "NAT"],
      [
        "The North's greater manpower and industrial resources, the leadership of Abraham Lincoln and others, and the decision to emancipate enslaved people eventually led to the Union military victory. Even so, both the Union and the Confederacy mobilized their economies and societies to wage the war, drafted soldiers, and faced considerable opposition at home. The Union had the greater population, factories, and railroads. The Confederacy began with a military advantage in its defensive position, and it showed initiative and daring early in the war.",
        "Emancipation and the Reconstruction amendments can be compared too. The Emancipation Proclamation of 1863 was a war measure that applied to areas in rebellion. The 13th Amendment of 1865 ended slavery everywhere in the United States, and the 14th and 15th amendments went on to address citizenship, equal protection, and voting. Women's rights leaders, in turn, were divided over whether to support amendments that left out women.",
        "The Civil War and Reconstruction both altered relationships between the states and the federal government. During the war, the national government drafted soldiers, collected an income tax, issued greenbacks, and created a national banking system. During Reconstruction it created the Freedmen's Bureau, divided the South into military districts, and amended the Constitution. They differed in purpose and in how long they lasted. Wartime powers aimed to win the war and shrank when it was over, while Reconstruction aimed to protect the rights of freed people but ended as Northern resolve waned, troops were withdrawn in 1877, and Southern states took away rights.",
        [
          "Common trap",
          "Do not write that two things were “similar” without naming the category. Say what they shared, such as expanding federal power, and how the aims or results differed.",
        ],
      ],
      "The Civil War and Reconstruction both expanded federal power and ended slavery, but wartime power served victory, and Reconstruction's attempt to secure rights did not last.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Unit 6",
      title: "A nation reunited, with rights unsettled",
      body: "The Union victory settled the issues of slavery and secession, but left unresolved many questions about the power of the federal government and about citizenship rights. Unit 6 follows the nation as it industrializes.",
      transferQuestion:
        "Compare how the end of slavery changed the lives of formerly enslaved people in the South with how Reconstruction's end changed them.",
      feedback:
        "A strong answer notes that freedom brought citizenship, family reunions, schools, and churches, but that the loss of federal protection and sharecropping reduced the gains, and it explains that the amendments remained as a basis for later change.",
      links: [
        {
          topicId: "apush-5-11",
          sectionId: "retreat-from-equal-rights",
          label: "Review the retreat from equal rights",
        },
        {
          topicId: "apush-5-9",
          sectionId: "from-union-to-emancipation",
          label: "Review the move from union to emancipation",
        },
      ],
    },
  ],
  sourceIds: [],
});

// Original Page One lesson for CED Topic 5.7.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.7", {
  summary:
    "How the election of 1860 split the parties, why most slave states seceded after Lincoln's victory, and how the firing on Fort Sumter began the Civil War.",
  minutes: 12,
  goals: [
    "Explain how the Democratic split and Lincoln's victory without Southern electoral votes produced the secession crisis.",
    "Explain the reasons that Southern leaders gave for secession and Lincoln's response.",
    "Explain how Fort Sumter and Lincoln's call for troops determined which states joined the Confederacy.",
  ],
  bigIdea:
    "Lincoln was elected on a free-soil platform without any Southern electoral votes, and the Southern states that seceded in response formed a Confederacy that the Union refused to accept.",
  context:
    "The CED asks you to describe the effects of Lincoln's election. For each event, ask what Southern leaders feared would follow and how Lincoln answered them.",
  sections: [
    section(
      "the-election-of-1860",
      "The election of 1860",
      ["PCE", "NAT"],
      [
        "The Democratic Party split in 1860. Northern Democrats nominated Stephen Douglas, who supported popular sovereignty, and Southern Democrats nominated Vice President John C. Breckinridge of Kentucky, who demanded federal protection of slavery in the territories. John Bell of Tennessee ran on the ticket of the Constitutional Union Party, which asked voters to support the Union and the Constitution. The Republicans nominated Abraham Lincoln, who opposed the spread of slavery but promised not to interfere with it in the states where it existed.",
        "Abraham Lincoln's victory on the Republicans' free-soil platform in the presidential election of 1860 was accomplished without any Southern electoral votes. He won only about 40 percent of the popular vote, and his name was not even on the ballot in most Southern states, but he carried nearly all of the free states, which gave him a majority of the electoral votes.",
        [
          "Common trap",
          "The election was lawful under the rules of the Constitution. Lincoln won the Electoral College without a majority of the popular vote, and the Southern states left because of what they expected his party to do, not because of any fraud.",
        ],
      ],
      "A divided Democratic Party and a united North elected Lincoln without a single Southern electoral vote.",
    ),
    section(
      "secession",
      "Secession",
      ["PCE", "NAT", "GEO"],
      [
        "After a series of contested debates about secession, most slave states voted to secede from the Union. Southern leaders argued that the Union was a compact among sovereign states that could be withdrawn from, and that the election of a president pledged to stop the spread of slavery threatened their rights and their way of life. Several states' declarations named the protection of slavery as a central reason. South Carolina left the Union in December 1860, and by February 1861 Mississippi, Florida, Alabama, Georgia, Louisiana, and Texas had followed. Delegates from these seven states formed the Confederate States of America and chose Jefferson Davis as president.",
        "Efforts to avoid the break failed. The Crittenden Compromise would have extended the line at 36°30′ to the Pacific and protected slavery south of it, but Lincoln refused to accept any plan that allowed slavery to spread into the territories. In his First Inaugural Address in March 1861, Lincoln said that he had no purpose to interfere with slavery in the states where it existed, that the Union was perpetual, and that the issue of civil war was in the hands of those who would break it.",
      ],
      "Seven states seceded to protect slavery, and Lincoln rejected both secession and any compromise that allowed slavery to spread.",
    ),
    section(
      "fort-sumter-and-the-upper-south",
      "Fort Sumter and the Upper South",
      ["WOR", "GEO", "PCE"],
      [
        "Confederate forces took most federal forts in the South, but the Union held Fort Sumter in Charleston harbor. When Lincoln sent supplies to the fort, Confederate batteries fired on it on April 12, 1861, and the garrison surrendered. Lincoln called for 75,000 volunteers to put down the rebellion.",
        "The call for troops pushed the Upper South to a decision. Virginia, Arkansas, Tennessee, and North Carolina seceded, which brought the Confederacy to eleven states. Four slave states, Delaware, Maryland, Kentucky, and Missouri, stayed in the Union and are called the border states. Lincoln worked to keep them loyal because their location and resources were important to the Union.",
      ],
      "Fort Sumter began the war, and Lincoln's call for troops brought four more states into the Confederacy.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.8",
      title: "From secession to war",
      body: "With eleven states in the Confederacy, the two sides had to mobilize for a long war. Topic 5.8 follows the military conflict.",
      transferQuestion:
        "How did Lincoln's statements in 1858 about slavery and the Union compare with his statements in 1861?",
      feedback:
        "A strong answer notes that in both periods he opposed the spread of slavery and promised not to interfere with it in the states, while in 1861 he also argued that the Union was perpetual and that secession was not lawful.",
      links: [
        {
          topicId: "apush-5-6",
          sectionId: "lincoln-douglas-and-john-brown",
          label: "Review the Lincoln–Douglas debates",
        },
      ],
    },
  ],
  sourceIds: ["lincoln-1861"],
});

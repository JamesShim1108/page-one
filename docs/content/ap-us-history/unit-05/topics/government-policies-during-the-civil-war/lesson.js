// Original Page One lesson for CED Topic 5.9.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.9", {
  summary:
    "How Lincoln's decision to issue the Emancipation Proclamation changed the purpose of the war, how he used speeches to link the Union cause to America's founding ideals, and how the war expanded federal power.",
  minutes: 13,
  goals: [
    "Explain why Lincoln issued the Emancipation Proclamation and what it did and did not do.",
    "Explain how Lincoln's speeches linked the struggle against slavery to America's founding ideals.",
    "Describe the wartime policies that expanded the powers of the federal government.",
  ],
  bigIdea:
    "Lincoln moved from a war to preserve the Union to a war that also ended slavery, and he described the change as the fulfillment of the nation's founding ideals.",
  context:
    "The CED asks you to read sources for purpose and point of view. For each document in this topic, ask who is speaking, to whom, and what the speaker wanted the audience to believe or do.",
  sections: [
    section(
      "from-union-to-emancipation",
      "From Union to emancipation",
      ["NAT", "WOR", "SOC"],
      [
        "Lincoln and most Union supporters began the Civil War to preserve the Union. Lincoln said at first that he had no power to end slavery in the states where it existed, and he needed the support of the border states, where slavery remained legal. As the war continued, Congress passed Confiscation Acts that freed enslaved people who had been used to aid the Confederate war effort, and many African Americans fled Southern plantations for Union lines.",
        "After the victory at Antietam, Lincoln announced in September 1862 that he would free the enslaved people in the states that were still in rebellion on January 1, 1863. Lincoln's decision to issue the Emancipation Proclamation reframed the purpose of the war and helped prevent the Confederacy from gaining full diplomatic support from European powers, because Britain and France, where antislavery opinion was strong, would not enter a war to preserve slavery. The Proclamation also declared that Black men would be received into the armed forces. Many African Americans fled Southern plantations and enlisted in the Union Army, helping to undermine the Confederacy. About 180,000 Black men served in the army before the war ended.",
        [
          "Common trap",
          "The Emancipation Proclamation did not end slavery everywhere. It was a war measure that applied to areas in rebellion and not to the border states. The Thirteenth Amendment, ratified in December 1865, ended slavery throughout the United States.",
        ],
      ],
      "The Emancipation Proclamation added the end of slavery to the Union's purpose, turned the army into a force for freedom, and made European support for the Confederacy less likely.",
    ),
    section(
      "gettysburg-and-american-ideals",
      "Gettysburg and American ideals",
      ["NAT", "ARC", "PCE"],
      [
        "Lincoln sought to reunify the country and used speeches such as the Gettysburg Address to portray the struggle against slavery as the fulfillment of America's founding democratic ideals. In November 1863, at the dedication of a cemetery for the soldiers who died at Gettysburg, he began by pointing back to a nation “conceived in liberty, and dedicated to the proposition that all men are created equal.” He called on his listeners to resolve that “this nation, under God, shall have a new birth of freedom.”",
        "In his Second Inaugural Address in March 1865, Lincoln described slavery as the cause of the war and called on Americans to act “with malice toward none, with charity for all” and “to bind up the nation's wounds.” Congress had passed the Thirteenth Amendment in January 1865.",
      ],
      "Lincoln presented the war as a test of whether the nation could live up to the promise of the Declaration of Independence.",
    ),
    section(
      "wartime-policies",
      "Wartime policies and federal power",
      ["WXT", "NAT", "PCE"],
      [
        "The war expanded the powers of the federal government. Lincoln suspended the writ of habeas corpus, which allowed the army to hold suspected Confederate supporters without a trial, and critics said that he had gone beyond his powers. Congress raised taxes, including a first income tax, issued paper money called greenbacks in 1862, and created a national banking system in 1863 and 1864.",
        "With Southern members absent, Congress also passed laws that it had long blocked. In 1862 it passed the Homestead Act, the Pacific Railway Act, and the Morrill Land-Grant Act, which promoted western settlement and economic development (Topic 5.2). Together these changes gave the national government a larger role in the economy and in the lives of citizens.",
      ],
      "The Union government used new powers to pay for the war, to hold suspected opponents, and to promote western development.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.10",
      title: "From wartime to Reconstruction",
      body: "The end of slavery and the larger role of the federal government raised the question of how to rebuild the South. Topic 5.10 follows Reconstruction.",
      transferQuestion:
        "How did the Gettysburg Address connect the Civil War to the principles of the Declaration of Independence?",
      feedback:
        "A strong answer notes that Lincoln dated the nation from 1776 and repeated the claim that all men are created equal, which presented the war as a test of that principle and the end of slavery as its fulfillment.",
      links: [
        {
          topicId: "apush-3-6",
          sectionId: "equality-and-slavery",
          label: "Review the Revolution's ideals of equality",
        },
      ],
    },
  ],
  sourceIds: ["lincoln-speeches"],
});

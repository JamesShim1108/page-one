// Writing prompts for Unit 5. Saving and review behavior live in app/writing/.
// These are unit practice prompts (examOnly: false). Mock exams reuse prompts
// flagged examOnly: true, and Unit 5 has none yet.
import { excerpts } from "../excerpts.js";
import { leq, saq } from "../writing-kit.js";

export const writingQuizzes = [
  saq({
    id: "apush-5-saq-01",
    unitNumber: 5,
    number: 1,
    headline: "The Gettysburg Address",
    stimulusBlocks: [excerpts.gettysburgAddress],
    sourceIds: ["ced", "lincoln-speeches"],
    learningObjectives: ["5.J"],
    keyConcepts: ["KC-5.3.I.C", "KC-5.3.I.B"],
    themes: ["NAT", "PCE"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["NAT", "PCE"],
        prompt:
          "Briefly describe ONE American ideal that Lincoln expresses in the excerpt.",
        criteria: [
          "Identifies an ideal stated in the excerpt, such as equality, liberty, or self-government.",
          "Uses the excerpt to show it, with more than a copied phrase.",
        ],
        model: {
          answer:
            "Lincoln expresses the ideal of equality, which he links to the founding of the nation.",
          prove:
            "He says that the nation was “dedicated to the proposition that all men are created equal,” and begins with “Fourscore and seven years ago,” which points back to 1776.",
          explain:
            "By returning to the Declaration of Independence, Lincoln presents the Civil War as a test of whether the nation would live up to its founding principle.",
        },
        alternatives:
          "A response can also use “government of the people, by the people, and for the people,” if it explains that this expresses the ideal of self-government, or “a new birth of freedom,” if it explains that Lincoln linked the war to expanded liberty.",
        review: [
          {
            topicId: "apush-5-9",
            sectionId: "gettysburg-and-american-ideals",
            label: "Gettysburg and American ideals",
          },
        ],
      },
      {
        id: "b",
        lenses: ["PCE", "NAT"],
        prompt:
          "Briefly explain ONE specific historical development from 1861 to 1863 that contributed to Lincoln's description of the war as a struggle for “a new birth of freedom.”",
        criteria: [
          "Names a specific development from 1861–1863.",
          "Explains how it changed the purpose of the war or the way that Lincoln described it.",
        ],
        model: {
          answer:
            "The Emancipation Proclamation of 1863 contributed to Lincoln's description of the war as a struggle for freedom.",
          prove:
            "The Proclamation, which took effect on January 1, 1863, declared that enslaved people in the areas in rebellion were free, and it invited Black men to serve in the Union army.",
          explain:
            "It added the end of slavery to the Union's goal of preserving the nation, so Lincoln could present the war as a fight for freedom as well as for the Union.",
        },
        alternatives:
          "A response can also use the flight of enslaved people to Union lines, the Confiscation Acts, the abolition of slavery in the District of Columbia in 1862, or the Union victory at Antietam in 1862, if it explains how the development changed the aims of the war.",
        review: [
          {
            topicId: "apush-5-9",
            sectionId: "from-union-to-emancipation",
            label: "From Union to emancipation",
          },
        ],
      },
      {
        id: "c",
        lenses: ["PCE", "WXT"],
        prompt:
          "Briefly explain ONE way, other than emancipation, that the federal government expanded its role during the Civil War.",
        criteria: [
          "Names a specific wartime policy of the federal government.",
          "Explains how it increased the role of the national government.",
        ],
        model: {
          answer:
            "The federal government expanded its role by creating a national banking system.",
          prove:
            "The National Banking Acts of 1863 and 1864 set up national banks that could issue a common national currency, and Congress had also issued paper money, called greenbacks, in 1862.",
          explain:
            "These laws gave the national government a larger part in the money supply and the financing of the war, which had been left mainly to the states and to private banks.",
        },
        alternatives:
          "A response can also use the first federal income tax, the Enrollment Act of 1863 that drafted men into the army, the suspension of habeas corpus, or the Homestead, Morrill, and Pacific Railway Acts, if it explains how the policy increased federal power.",
        review: [
          {
            topicId: "apush-5-9",
            sectionId: "wartime-policies",
            label: "Wartime policies",
          },
        ],
      },
    ],
  }),
  saq({
    id: "apush-5-saq-02",
    unitNumber: 5,
    number: 2,
    headline: "Hayes's Inaugural Address",
    stimulusBlocks: [excerpts.hayesInaugural],
    sourceIds: ["ced", "hayes-1877"],
    learningObjectives: ["5.L"],
    keyConcepts: ["KC-5.3.II.E", "KC-5.3.II.D"],
    themes: ["PCE", "NAT", "SOC"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["PCE", "NAT"],
        prompt:
          "Briefly describe ONE goal for the South that President Hayes expresses in the excerpt.",
        criteria: [
          "Identifies a goal stated in the excerpt, such as local self-government or national reunion.",
          "Uses the excerpt to show it, with more than a copied phrase.",
        ],
        model: {
          answer:
            "Hayes sought local self-government in the Southern states that would also protect the rights of all.",
          prove:
            "He calls “wise, honest, and peaceful local self-government” the “imperative necessity” of those states, and says that only a government that “maintains inviolate the rights of all is a true self-government.”",
          explain:
            "The goal signaled the end of federal intervention in the South, because the states would manage their own affairs, and Hayes promised that the rights of both white and Black Southerners would still be respected.",
        },
        alternatives:
          "A response can also point to his hope to “wipe out in our political affairs the color line and the distinction between North and South” for “a united country,” if it explains that he sought reconciliation between the sections.",
        review: [
          {
            topicId: "apush-5-11",
            sectionId: "redeemers-violence-and-the-end",
            label: "Redeemers, violence, and the end of Reconstruction",
          },
        ],
      },
      {
        id: "b",
        lenses: ["PCE", "SOC"],
        prompt:
          "Briefly explain ONE specific historical development from 1865 to 1877 that contributed to the end of Reconstruction.",
        criteria: [
          "Names a specific development from 1865–1877.",
          "Explains how it weakened or ended Reconstruction.",
        ],
        model: {
          answer:
            "Violence and intimidation by white Southerners who opposed Reconstruction contributed to its end.",
          prove:
            "Groups such as the Ku Klux Klan, the White League, and the Red Shirts attacked Black voters and Republican officials, and by 1876 Democrats called Redeemers had regained control of most Southern state governments.",
          explain:
            "The violence kept Black voters from the polls and weakened Republican governments, while Northern support for sending troops faded, so Reconstruction could no longer be enforced.",
        },
        alternatives:
          "A response can also use the Panic of 1873 and the scandals of Grant's administration, which turned Northern attention away from the South, or the Compromise of 1877, if it explains how the development ended federal enforcement.",
        review: [
          {
            topicId: "apush-5-11",
            sectionId: "redeemers-violence-and-the-end",
            label: "Redeemers, violence, and the end of Reconstruction",
          },
        ],
      },
      {
        id: "c",
        lenses: ["SOC", "WXT"],
        prompt:
          "Briefly explain ONE way that the rights or economic independence of African Americans in the South were limited after 1877.",
        criteria: [
          "Names a specific limit on rights or economic independence after 1877.",
          "Explains how it limited African Americans.",
        ],
        model: {
          answer:
            "Sharecropping limited the economic independence of formerly enslaved people.",
          prove:
            "Planters still owned most of the land, and freed families farmed plots for a share of the crop, bought supplies on credit at high prices, and often owed more than the crop was worth.",
          explain:
            "The debts bound families to the land and to the planters, so they fell short of the self-sufficiency that they had sought through land ownership.",
        },
        alternatives:
          "A response can also use poll taxes and literacy tests, Jim Crow laws, the Supreme Court decisions in the Civil Rights Cases or Plessy v. Ferguson, or violence, if it explains how the tactic limited African American rights.",
        review: [
          {
            topicId: "apush-5-11",
            sectionId: "land-and-sharecropping",
            label: "Land and sharecropping",
          },
        ],
      },
    ],
  }),
  leq({
    id: "apush-5-leq-federal-role",
    unitNumber: 5,
    headline: "The federal government in war and Reconstruction",
    context:
      "Between 1861 and 1877, the national government fought a civil war, ended slavery, and tried to rebuild the South.",
    task: "Compare the ways in which the Civil War and Reconstruction changed the role of the federal government in the United States in the period 1861 to 1877.",
    focusNote:
      "Your response may focus on powers over the economy, the army, the states, or the rights of citizens.",
    reasoning: "comparison",
    sourceIds: ["ced"],
    topicId: "apush-5-12",
    outlineReview: {
      sectionId: "comparing-the-war-and-reconstruction",
      label: "Review comparing the war and Reconstruction",
    },
    essayReview: {
      sectionId: "how-to-reason-about-comparison",
      label: "Review how to reason about comparison",
    },
    learningObjectives: ["5.M", "5.K"],
    keyConcepts: ["KC-5.3", "KC-5.3.I.B", "KC-5.3.II.i", "KC-5.3.II.A", "KC-5.3.II.E"],
    themes: ["PCE", "NAT", "WXT"],
    examOnly: false,
    modelResponse:
      "In 1860 the federal government was small. It collected most of its revenue from the tariff, it had a small army, and most Americans looked first to their states. The Union victory in the Civil War and the contested Reconstruction of the South settled the issues of slavery and secession, but they left unresolved many questions about the power of the federal government and about citizenship rights.\n\nThe Civil War and Reconstruction both enlarged the power of the national government over the states and over individuals, but the war expanded its economic and military power, which lasted, while Reconstruction expanded its power over rights, which ended in 1877.\n\nThe two periods were alike in the growth of federal power. During the war, the government drafted soldiers under the Enrollment Act of 1863, collected a federal income tax, issued paper money called greenbacks, and created a national banking system. Lincoln suspended habeas corpus, and in the Emancipation Proclamation he used his war powers to declare enslaved people in the areas in rebellion free. Reconstruction continued the pattern. The Thirteenth, Fourteenth, and Fifteenth Amendments abolished slavery, defined citizenship and equal protection, and protected the vote, and each gave Congress the power to enforce it. Congress created the Freedmen's Bureau, divided the South into military districts under the Reconstruction Acts of 1867, and passed the Enforcement Acts of 1870 and 1871 against the Ku Klux Klan. In both periods the national government reached into the states in a way that it had not before.\n\nThe periods differed in purpose and in leadership. Wartime power was aimed at winning the war, and it was exercised largely by the president and by a Congress that, with Southern members gone, could pass the Homestead Act and the Pacific Railway Act. Reconstruction power was aimed at redefining citizenship and protecting freed people, and it was exercised by Congress against President Andrew Johnson, who pardoned former Confederates and opposed the Reconstruction Acts, and was impeached in 1868. Congress, and not the president, became the center of national policy.\n\nThe periods differed also in how long the changes lasted. Many of the economic changes of the war endured. National banks, a national currency, and federal support for western railroads and settlement outlasted the war. The expansion of federal protection for rights did not endure in the same way. Northern resolve weakened after the Panic of 1873, violence by the White League and the Red Shirts helped Redeemers regain control of Southern governments, and in 1877 Hayes withdrew the last federal troops. The Supreme Court narrowed the Fourteenth Amendment in the Slaughter-House Cases of 1873 and in United States v. Cruikshank in 1876, and in Plessy v. Ferguson in 1896 it upheld segregation. Even so, the amendments remained in the Constitution, and in the twentieth century the Supreme Court and Congress used the Fourteenth and Fifteenth Amendments to uphold civil rights, as in Brown v. Board of Education in 1954.\n\nIn sum, the Civil War and Reconstruction both made the national government more powerful than the states, but the war created an enlarged economic and military role that proved lasting, while Reconstruction created a role as protector of rights that was withdrawn in 1877 and revived only in the twentieth century.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes the small federal government of 1860 and states that the war and Reconstruction left questions unresolved, which places the comparison in context.",
      },
      {
        label: "Thesis",
        text: "The second paragraph makes a comparison claim that names a similarity (more federal power) and a difference (economic and military power lasted, while power over rights ended).",
      },
      {
        label: "Evidence",
        text: "The Enrollment Act, greenbacks, the national banking system, habeas corpus, the Emancipation Proclamation, the Reconstruction amendments, the Freedmen's Bureau, the Reconstruction Acts, the Enforcement Acts, the Slaughter-House Cases, Cruikshank, and Plessy are specific examples used to support the argument.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay compares purposes, leadership, and durability, and it explains why the differences existed, which supports a complex understanding.",
      },
    ],
    alternateModel:
      "An essay could compare the relative significance of the effects of the Civil War on American values by arguing that the end of slavery changed the nation more than the growth of federal power. To earn the complexity point it could add a qualification, such as the fact that emancipation did not secure equal rights, as sharecropping and segregation showed.",
    commonErrors: [
      "Describing the war and Reconstruction in separate paragraphs without comparing them.",
      "Writing that the federal government grew stronger in both periods without naming what grew, such as the draft, the banking system, or the amendments.",
      "Treating 1877 as the end of the amendments and not explaining that they were used again in the twentieth century.",
      "Using evidence from after 1877 as the main support for the argument, such as the Civil Rights Act of 1964, without relating it to the period 1861 to 1877.",
    ],
  }),
];

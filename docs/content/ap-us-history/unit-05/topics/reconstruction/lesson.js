// Original Page One lesson for CED Topic 5.10.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.10", {
  summary:
    "How Presidents Lincoln and Johnson and Congress disagreed over Reconstruction, what the 13th, 14th, and 15th Amendments did, how the women's rights movement split, and what Reconstruction achieved in the South.",
  minutes: 14,
  goals: [
    "Compare the Reconstruction plans of Lincoln, Johnson, and Congress.",
    "Explain what the Reconstruction amendments did and how they divided the women's rights movement.",
    "Explain the short-term successes of Reconstruction and the reasons that it ultimately failed.",
  ],
  bigIdea:
    "Reconstruction changed the relationship between the states and the federal government and gave African Americans citizenship and the vote, but it failed to secure those rights because of Southern resistance and the North's waning resolve.",
  context:
    "The CED asks you to use evidence from sources to support a claim. For this topic the main evidence is the text of the amendments and the actions of the president and Congress, so keep track of what each one did and what it left undone.",
  sections: [
    section(
      "plans-for-reconstruction",
      "Plans for Reconstruction",
      ["PCE", "NAT"],
      [
        "Reconstruction altered relationships between the states and the federal government and led to debates over new definitions of citizenship, particularly regarding the rights of African Americans, women, and other minorities. Leaders disagreed about how to bring the Southern states back even before the war ended. In 1863 Lincoln proposed the Ten Percent Plan, under which a state could form a new government when ten percent of its voters of 1860 swore loyalty to the Union and accepted the end of slavery. Radical Republicans in Congress, such as Thaddeus Stevens and Charles Sumner, thought the plan too lenient and wanted stronger protection for the freed people. Congress passed the Wade–Davis Bill in 1864, which required a majority of voters to take an oath, and Lincoln let it die by a pocket veto.",
        "After Lincoln's assassination in April 1865, President Andrew Johnson, a Southern Democrat, pardoned most former Confederates and allowed the Southern states to form new governments quickly. Those governments passed Black Codes, which limited the freedom of formerly enslaved people, and elected former Confederate leaders to Congress. Congress refused to seat them. It created the Freedmen's Bureau to help the freed people, passed the Civil Rights Act of 1866 over Johnson's veto, and in 1867 passed the Reconstruction Acts, which divided most of the South into five military districts and required states to ratify the Fourteenth Amendment and to allow Black men to vote. In 1868 the House impeached Johnson, and the Senate fell one vote short of removing him.",
      ],
      "Lincoln and Johnson favored a quick and lenient restoration, and Congress, led by the Radical Republicans, took control of Reconstruction in 1867.",
    ),
    section(
      "the-reconstruction-amendments",
      "The Reconstruction amendments",
      ["PCE", "SOC", "NAT"],
      [
        "The 13th Amendment abolished slavery, while the 14th and 15th amendments granted African Americans citizenship, equal protection under the laws, and voting rights. The 13th Amendment was ratified in 1865. The 14th Amendment (1868) made all persons born or naturalized in the United States citizens, which overturned the Dred Scott ruling, and barred the states from denying equal protection of the laws. The 15th Amendment (1870) barred the national government and the states from denying the vote on account of race, color, or previous condition of servitude.",
        "The women's rights movement was both emboldened and divided over the 14th and 15th amendments. Many women had worked for abolition and hoped that the vote would be extended to them. The 14th Amendment used the word “male” in the Constitution for the first time, and the 15th Amendment did not mention sex. Elizabeth Cady Stanton and Susan B. Anthony opposed the 15th Amendment because it left out women, and in 1869 they formed the National Woman Suffrage Association. Lucy Stone, Julia Ward Howe, and others supported the amendment, argued that the vote for Black men should not wait, and formed the American Woman Suffrage Association.",
      ],
      "The amendments ended slavery and defined citizenship and voting rights for African American men, while women's suffrage leaders divided over them.",
    ),
    section(
      "reconstruction-in-the-south",
      "Reconstruction in the South",
      ["PCE", "SOC", "GEO"],
      [
        "Efforts by radical and moderate Republicans to change the balance of power between Congress and the presidency and to reorder race relations in the defeated South yielded some short-term successes. Reconstruction opened up political opportunities and other leadership roles to formerly enslaved persons. Black men voted and held office in Southern state governments and in Congress, and in 1870 Hiram Revels of Mississippi became the first African American to serve in the Senate. Freed people founded their own churches and schools, and the new state governments set up public schools.",
        "Reconstruction ultimately failed, due both to determined Southern resistance and the North's waning resolve. White Southerners who opposed Reconstruction used violence and intimidation. The Ku Klux Klan, founded in 1866, attacked Black voters and Republican officials, and Congress passed the Enforcement Acts in 1870 and 1871 to try to stop it. Many Northerners grew tired of the effort, and attention turned to economic problems after the Panic of 1873. Topic 5.11 follows the end of Reconstruction.",
        [
          "Common trap",
          "Opponents of Reconstruction claimed that Black officeholders were incompetent and the new governments corrupt. Historians point instead to the violence, resistance, and loss of Northern will that ended it.",
        ],
      ],
      "Reconstruction brought real political gains for African Americans, but violence and the loss of Northern support undermined them.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.11",
      title: "Why the gains did not last",
      body: "The amendments remained in the Constitution, but the practice of Reconstruction ended. Topic 5.11 explains why.",
      transferQuestion:
        "How did the promise of Lincoln's Second Inaugural Address, “with malice toward none,” compare with the policies of Congress after 1867?",
      feedback:
        "A strong answer notes that Lincoln stressed reconciliation and a lenient restoration, while Congress after 1867 imposed military rule and conditions that protected the rights of the freed people.",
      links: [
        {
          topicId: "apush-5-9",
          sectionId: "gettysburg-and-american-ideals",
          label: "Review Lincoln's war aims and ideals",
        },
      ],
    },
  ],
  sourceIds: [],
});

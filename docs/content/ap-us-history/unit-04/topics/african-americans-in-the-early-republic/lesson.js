// Original Page One lesson for CED Topic 4.12.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.12", {
  summary:
    "How enslaved people resisted and created communities, how free African Americans built institutions and joined antislavery efforts, and what stayed the same and changed in African American life from 1800 to 1848.",
  minutes: 13,
  goals: [
    "Explain how enslaved people resisted slavery and what limited their efforts.",
    "Explain how enslaved and free African Americans protected their dignity and family structures.",
    "Identify continuities and changes in African American experience from 1800 to 1848.",
  ],
  bigIdea:
    "Enslaved and free African Americans built families, churches, and organizations, and they resisted slavery and discrimination, even as slavery expanded and legal restrictions on free Black Americans increased.",
  context:
    "The CED asks you to explain the continuities and changes in the experience of African Americans. Ask what stayed constant, such as the force of slavery, and what changed, such as the growth of free Black institutions and abolitionist activity.",
  sections: [
    section(
      "slavery-and-resistance",
      "Slavery and resistance",
      ["SOC", "WXT"],
      [
        "Antislavery efforts in the South were largely limited to unsuccessful rebellions by enslaved people. Gabriel's plot in Virginia (1800) and Denmark Vesey's plot in Charleston (1822) were discovered and crushed. In 1831 Nat Turner led a rebellion in Southampton County, Virginia, in which about 55 white people were killed. The rebellion was put down, and many Black people were killed in revenge. Southern legislatures then tightened the slave codes and restricted the education and movement of enslaved and free Black people.",
        "Enslaved people also resisted in everyday ways, by working slowly, breaking tools, pretending to be ill, or running away. Slavery grew and became more profitable as cotton spread. The Constitution allowed Congress to end the Atlantic slave trade in 1808, but the internal slave trade sold many enslaved people from the Upper South to the Deep South and broke up families.",
      ],
      "Rebellions failed and brought harsher laws, but enslaved people kept resisting in daily acts, while the internal slave trade split families.",
    ),
    section(
      "enslaved-families-and-communities",
      "Families, religion, and community under slavery",
      ["SOC", "ARC"],
      [
        "Enslaved blacks and free African Americans created communities and strategies to protect their dignity and family structures. Enslaved people formed families even though the law gave those families no protection and slaveholders could sell a husband, wife, or child. They kept kin ties across plantations, passed on names and stories, and helped relatives who had been sold away.",
        "Religion was central. Enslaved people practiced Christianity in their own way, often in secret meetings, and they combined African traditions with Protestant faith in spirituals and sermons that emphasized hope and deliverance. Education was risky because Southern laws increasingly forbade teaching enslaved people to read, yet many learned secretly. Frederick Douglass later wrote of how he learned to read and why literacy became, for him, a pathway to freedom.",
      ],
      "Families, kin networks, religion, and secret learning helped enslaved people keep their dignity under slavery.",
    ),
    section(
      "free-black-communities-and-activism",
      "Free Black communities and political activism",
      ["SOC", "PCE", "ARC"],
      [
        "Free African Americans, who numbered more than 300,000 by 1830, lived in both North and South. They joined political efforts aimed at changing their status. In the North they built churches, such as Richard Allen's African Methodist Episcopal Church (1816), as well as schools, newspapers, and mutual aid societies. Black leaders held national conventions beginning in 1830, and David Walker's Appeal (1829) called on enslaved people to resist. Black abolitionists such as Frederick Douglass spoke and wrote against slavery. Free Black people and white allies also aided fugitives in the network known as the Underground Railroad.",
        "Free African Americans faced severe restrictions. Northern states and towns segregated schools, churches, and transport, and some states took away their votes. Southern states limited their movement, and the Fugitive Slave Act of 1793 put free Black people at risk of being seized. This was a period of both change, in the growth of free Black institutions and abolitionist activity, and continuity, in the power of slavery and racial prejudice.",
        [
          "Common trap",
          "Free Black Americans were not free from discrimination. They organized, but they also faced legal and social limits in both the North and the South.",
        ],
      ],
      "Free Black communities built institutions and joined antislavery efforts while facing discrimination in every region.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.13",
      title: "Slavery and the society of the South",
      body: "Understanding Black resistance and community helps explain how white Southern leaders defended slavery. Topic 4.13 follows Southern society.",
      transferQuestion:
        "How did the Nat Turner rebellion change the way many Southern leaders treated slavery and free Black people?",
      feedback:
        "A strong answer notes that Southern legislatures tightened the slave codes, restricted education and movement, and defended slavery more openly.",
      links: [
        {
          topicId: "apush-4-11",
          sectionId: "abolition-and-antislavery",
          label: "Review abolitionism",
        },
      ],
    },
  ],
  sourceIds: ["douglass-1845"],
});

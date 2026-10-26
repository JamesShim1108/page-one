// Original Page One lesson for CED Topic 3.6.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.6", {
  summary:
    "How Revolutionary ideals of equality and liberty led some Americans to challenge slavery and expand political participation, how women's roles were redefined, and how the Revolution inspired movements abroad.",
  minutes: 12,
  goals: [
    "Explain how the Revolution's ideals led some Americans to call for the abolition of slavery and greater political democracy.",
    "Explain what republican motherhood was and why it gained popularity.",
    "Describe the global impact of the American Revolution in France, Haiti, and Latin America.",
  ],
  bigIdea:
    "The Revolution's ideals made inequalities in American society harder to ignore, but they were applied unevenly and left slavery and many exclusions in place.",
  context:
    "The CED asks you to explain the various ways the Revolution affected society and to describe its global impact. Look for both the change that Revolutionary ideals produced and the limits on that change.",
  sections: [
    section(
      "equality-and-slavery",
      "Equality, slavery, and political democracy",
      ["SOC", "PCE"],
      [
        "During and after the American Revolution, an increased awareness of inequalities in society motivated some individuals and groups to call for the abolition of slavery and greater political democracy in the new state and national governments. Many Patriots saw a contradiction between demanding liberty from Britain and holding people in slavery. Quakers and other reformers led antislavery efforts, and enslaved and free Black Americans petitioned for freedom, used the courts, and some served in the Continental Army.",
        "The result was uneven. Vermont's 1777 constitution banned slavery, Pennsylvania began gradual emancipation in 1780, and Massachusetts courts ended slavery in the state in the 1780s, while other northern states adopted gradual emancipation laws in the years that followed. Slavery remained central to the economy of the South. In 1775 Virginia's royal governor, Lord Dunmore, offered freedom to enslaved people who left rebel owners and joined the British, and thousands of enslaved people fled to British lines during the war.",
        "Calls for greater political democracy also appeared in the new state governments. Some states widened participation, but property qualifications for voting remained common, and women and most free Black men could not vote in most states.",
      ],
      "The Revolution encouraged antislavery action and wider political participation, but both advanced unevenly.",
    ),
    section(
      "republican-motherhood",
      "Women and republican motherhood",
      ["SOC", "ARC"],
      [
        "Women contributed to the Revolutionary cause by boycotting British goods, running farms and businesses, raising money, nursing the wounded, and following the army. In response to women's participation in the American Revolution, Enlightenment ideas, and women's appeals for expanded roles, an ideal of “republican motherhood” gained popularity. It called on women to teach republican values within the family and granted women a new importance in American political culture.",
        "Abigail Adams, writing to her husband John Adams while he served in Congress in 1776, urged him to consider women's legal position as the new government was shaped. The ideal of republican motherhood gave women a recognized civic role and encouraged the education of girls, but it did not give women the vote or equal legal rights.",
        [
          "Common trap",
          "Republican motherhood expanded women's civic importance without giving women political rights. It placed women's political role within the home.",
        ],
      ],
      "Republican motherhood gave women a civic role as teachers of republican values, without political equality.",
    ),
    section(
      "global-impact",
      "The global impact of the Revolution",
      ["WOR", "NAT"],
      [
        "The American Revolution and the ideals set forth in the Declaration of Independence reverberated in France, Haiti, and Latin America, inspiring future independence movements. In France, the American example and ideas about natural rights and popular government helped inspire revolutionaries in 1789. In the French colony of Saint-Domingue, an uprising by enslaved people that began in 1791 led to the independent Republic of Haiti in 1804. In the early 1800s, independence movements spread across Spanish and Portuguese America.",
        "Each of these movements had its own causes and its own leaders, so the American Revolution is best seen as one important influence among several.",
      ],
      "The Revolution's ideals helped inspire later independence movements in France, Haiti, and Latin America.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.7",
      title: "Writing new governments",
      body: "Revolutionary ideals shaped the constitutions that the states wrote and the national government they created. Topic 3.7 follows those experiments.",
      transferQuestion:
        "Why did the Revolution's ideals of equality lead to emancipation in some states but not others?",
      feedback:
        "A strong answer connects the economic importance of slavery to the differences between northern and southern states.",
      links: [
        {
          topicId: "apush-3-4",
          sectionId: "enlightenment-and-religion",
          label: "Review Enlightenment ideas and religion",
        },
      ],
    },
  ],
  sourceIds: ["declaration-1776"],
});

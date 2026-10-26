// Original Page One lesson for CED Topic 3.13, a reasoning-process topic.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.13", {
  summary:
    "A guide to describing and explaining what stayed the same and what changed in American politics, society, and ideas between 1754 and 1800.",
  minutes: 10,
  goals: [
    "Identify continuities and changes in government, society, and ideas from 1754 to 1800.",
    "Use a specific historical example to support a claim about continuity or change.",
    "Explain how the American independence movement affected society.",
  ],
  bigIdea:
    "Independence changed who governed and how, but many social patterns, including slavery and inequality, continued.",
  context:
    "The CED treats continuity and change as a historical reasoning process. The strongest answers say what stayed the same, what changed, and why, using a specific example for each claim.",
  sections: [
    section(
      "how-to-reason",
      "How to reason about continuity and change",
      ["NAT", "SOC"],
      [
        "Continuity and change over time means describing what remained the same and what shifted across a period, and explaining why. Start by choosing a starting point and an ending point. For Period 3, those are the colonial situation in 1754 and the new republic in 1800. Then pick a category, such as government, society, or ideas, and describe the state of that category at each end.",
        "A claim about change should name the change, give evidence for it, and explain what caused it. A claim about continuity should name what persisted and explain why it persisted. Strong answers avoid treating a period as all change or all continuity.",
      ],
      "Compare a category at the beginning and the end of the period, and explain the causes of change and the reasons for continuity.",
    ),
    section(
      "politics-and-government",
      "Continuity and change in politics and government",
      ["PCE", "NAT"],
      [
        "The independence movement changed the form of government. Colonists who had been subjects of a monarch built republics, wrote state constitutions and a federal Constitution, and formed political parties. Power moved from Parliament and the Crown to elected American governments, and the Constitution replaced the weak Articles with a stronger national government.",
        "At the same time, much continued. Colonial assemblies became state legislatures, and traditions of local self-government, English legal rights, and fear of concentrated power continued from the colonial period. Property qualifications for voting remained common. Disputes between those who wanted a stronger central government and those who favored local and state power continued from the Articles to the Constitution to the parties of the 1790s.",
      ],
      "Government changed from monarchy to republic, but self-government traditions and debates over central power continued.",
    ),
    section(
      "society-and-ideas",
      "Continuity and change in society and ideas",
      ["SOC", "ARC", "MIG"],
      [
        "The American independence movement affected society in several ways. Revolutionary ideals led some Americans to challenge slavery, widened women's civic role through republican motherhood, and encouraged a national culture. Northern states ended or began to end slavery, and religious freedom expanded.",
        "Yet slavery continued and grew in the South, women and most free Black men could not vote, and American Indian nations lost land as settlers moved west. The same Revolution that inspired antislavery arguments also left slavery protected in the Constitution. A balanced answer explains both the change and its limits.",
        [
          "Common trap",
          "Do not say the Revolution changed nothing or everything. Name the specific change, name what stayed the same, and say why.",
        ],
      ],
      "The Revolution changed ideas and some institutions, but slavery, inequality, and Native dispossession continued.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Unit 4",
      title: "A new republic faces new tests",
      body: "Unit 4 follows the republic as it expands, industrializes, and changes politically between 1800 and 1848.",
      transferQuestion:
        "Which continuity from the colonial period do you think had the greatest effect on the new republic, and why?",
      feedback:
        "A strong answer picks one continuity, such as self-government traditions or slavery, and gives evidence from the 1790s.",
      links: [
        {
          topicId: "apush-3-12",
          sectionId: "slavery-and-regional-attitudes",
          label: "Review slavery and regional attitudes",
        },
      ],
    },
  ],
  sourceIds: [],
});

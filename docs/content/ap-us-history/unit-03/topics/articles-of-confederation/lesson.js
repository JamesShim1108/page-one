// Original Page One lesson for CED Topic 3.7.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.7", {
  summary:
    "How the states and the first national government were organized after independence, why the Articles of Confederation proved too weak, and how Congress organized the Northwest Territory.",
  minutes: 12,
  goals: [
    "Describe how new state constitutions distributed power.",
    "Explain the structure and limits of the Articles of Confederation and why they led to calls for a stronger government.",
    "Explain the significance of the Northwest Ordinance.",
  ],
  bigIdea:
    "After independence, Americans feared concentrated power, so they created weak executives and a weak national government, and they then found that this arrangement could not meet the new nation's problems.",
  context:
    "The CED asks you to explain how different forms of government developed and changed as a result of the Revolutionary period. Compare what the new governments did with what their designers feared.",
  sections: [
    section(
      "state-constitutions",
      "New state constitutions",
      ["PCE", "NAT"],
      [
        "Many new state constitutions placed power in the hands of the legislative branch and maintained property qualifications for voting and citizenship. Americans had just fought against a distant executive power, so most states gave their governors limited powers and made legislatures the strongest branch. Many constitutions included declarations of rights that protected individual liberties.",
        "Massachusetts's 1780 constitution was written by a convention elected for that purpose and approved by voters, which became a model for later constitution making.",
      ],
      "State constitutions gave the most power to legislatures, limited governors, and protected rights.",
    ),
    section(
      "government-under-the-articles",
      "The Articles of Confederation",
      ["PCE", "WXT"],
      [
        "The Articles of Confederation unified the newly independent states, creating a central government with limited power. Congress was the only branch of the national government. Each state had one vote, there was no president, and the national government had no power to tax or to regulate trade among the states. Important laws required the approval of nine of the thirteen states, and changing the Articles required the agreement of all thirteen. The Articles were adopted by Congress in 1777 and went into force in 1781 after all the states had ratified them.",
        "The new government won the war and negotiated the Treaty of Paris of 1783. After the Revolution, however, difficulties over international trade, finances, interstate commerce, foreign relations, and internal unrest led to calls for a stronger central government. Congress had to ask the states for money and could not make them pay. States set up trade barriers against one another, Britain refused to leave forts in the Northwest, and Spain closed the Mississippi River to American navigation in 1784, hurting western settlers.",
        "In 1786–1787, Shays' Rebellion, in which indebted farmers in western Massachusetts shut down courts to stop foreclosures, frightened many leaders. The national government had no army to put down the rebellion and the state had to raise a militia on its own. To many Americans, the episode showed the need for a government able to keep order.",
      ],
      "The Articles preserved state power and won the war, but a government without the power to tax or regulate trade could not solve postwar problems.",
    ),
    section(
      "northwest-ordinance",
      "Settling the West",
      ["MIG", "PCE"],
      [
        "As settlers moved westward during the 1780s, Congress enacted the Northwest Ordinance for admitting new states. The Land Ordinance of 1785 set up a system for surveying and selling western land in orderly townships and set aside land for public schools. The Northwest Ordinance of 1787 provided for governing the territory north of the Ohio River and a path to statehood on equal terms with the original states once a territory reached a certain population. The ordinance promoted public education, the protection of private property, and a ban on slavery in the Northwest Territory.",
        "These laws were among the most lasting achievements of the Confederation Congress, and they created a model for how the nation would expand. They did not recognize the land claims of the Native peoples who lived in the region, which led to conflict.",
      ],
      "The Northwest Ordinance created a lasting model for admitting new states and banned slavery in the Northwest Territory.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.8",
      title: "Revising the Articles",
      body: "The weaknesses of the Articles led to a convention in Philadelphia. Topic 3.8 follows that meeting and the debate over ratification.",
      transferQuestion:
        "Which problem under the Articles do you think most convinced leaders that a stronger government was needed?",
      feedback:
        "A strong answer picks a specific problem, such as the lack of a power to tax or Shays' Rebellion, and explains how a stronger government would address it.",
      links: [
        {
          topicId: "apush-3-5",
          sectionId: "turning-points",
          label: "Review how the war ended",
        },
      ],
    },
  ],
  sourceIds: [],
});

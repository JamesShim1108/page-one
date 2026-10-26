// Original Page One lesson for CED Topic 3.2.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.2", {
  summary:
    "Why Britain and France went to war over the North American interior, how Britain won, and how victory left Britain in debt and set the stage for new imperial policies and colonial resentment.",
  minutes: 11,
  goals: [
    "Explain why rivalry between Britain and France intensified in the mid-1700s.",
    "Explain how Britain's victory expanded its empire and created new costs.",
    "Explain why the Proclamation of 1763 angered colonists and how Native nations responded.",
  ],
  bigIdea:
    "The Seven Years' War removed France from eastern North America, but victory left Britain with debts and new responsibilities that led it to tighten control over the colonies.",
  context:
    "The CED asks you to explain the causes and effects of the Seven Years' War. The war's most important effects were not on the battlefield but in the years after 1763, so keep asking what Britain and the colonists each wanted next.",
  sections: [
    section(
      "rivalry-in-the-interior",
      "Rivalry in the interior",
      ["WOR", "GEO"],
      [
        "Colonial rivalry intensified between Britain and France in the mid-18th century as the growing population of the British colonies expanded into the interior of North America, threatening French–Indian trade networks and American Indian autonomy. The Ohio River Valley was the center of the dispute, because both empires claimed it and many Native nations lived and traded there.",
        "The war began in 1754 with fighting in the Ohio Valley, where George Washington, then a young Virginia militia officer, was forced to surrender at Fort Necessity. In the same year, colonial delegates meeting at Albany considered Benjamin Franklin's plan for a union of the colonies, but no colony approved it. The French and their Native allies won early victories. The conflict then widened into a global war, called the Seven Years' War in Europe, and under the leadership of William Pitt, Britain committed money, ships, and soldiers to North America. Britain captured Quebec in 1759 and Montreal in 1760.",
      ],
      "British expansion into the Ohio Valley threatened French and Native interests and brought on the war.",
    ),
    section(
      "british-victory-and-cost",
      "Victory at tremendous expense",
      ["WOR", "WXT", "PCE"],
      [
        "Britain achieved a major expansion of its territorial holdings by defeating the French, but at tremendous expense. In the Treaty of Paris of 1763, France gave up Canada and its claims east of the Mississippi River, and Spain, which had entered the war late on the French side, gave Florida to Britain. France had earlier transferred Louisiana west of the Mississippi to Spain.",
        "Britain now ruled an enormous empire, owed a large debt, and needed troops to defend its new frontier. These conditions set the stage for imperial efforts to raise revenue and consolidate control over the colonies, which led to the conflicts described in Topic 3.3.",
        [
          "Common trap",
          "Colonists and British officials drew different lessons from the war. Many colonists believed they had helped win it and deserved more say, while many British officials believed the colonists had been defended at British expense and should help pay.",
        ],
      ],
      "Victory removed France but left Britain with debts and a larger empire, which led it to look to the colonies for revenue and control.",
    ),
    section(
      "proclamation-and-native-resistance",
      "The Proclamation of 1763 and Native resistance",
      ["MIG", "GEO", "WOR"],
      [
        "After the British victory, imperial officials' attempts to prevent colonists from moving westward generated colonial opposition, while Native groups sought both to continue trading with Europeans and to resist the encroachments of colonists on tribal lands. In 1763, Native nations of the Great Lakes and Ohio Valley, inspired in part by the Ottawa leader Pontiac, attacked British forts, because they feared British settlement and disliked British trade policies.",
        "The Crown responded with the Proclamation of 1763, which forbade colonial settlement west of the Appalachian Mountains and reserved the western lands for Native peoples. Colonists who had expected to claim western land, including veterans and land speculators, resented the order, and many settlers moved west anyway. The line was hard to enforce and added to colonial opposition to British policy.",
      ],
      "British efforts to restrain western settlement angered colonists, while Native nations resisted settlers' advance.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.3",
      title: "Paying for victory",
      body: "Britain's debts led Parliament to tax the colonies directly, and colonists responded with arguments about their rights. Topic 3.3 follows that conflict.",
      transferQuestion:
        "How did the costs of victory lead Parliament to look to the colonies for revenue?",
      feedback:
        "A strong answer links Britain's debt and larger empire to the belief that the colonies should help pay for their own defense.",
      links: [
        {
          topicId: "apush-3-1",
          sectionId: "colonies-in-1754",
          label: "Review the colonies in 1754",
        },
      ],
    },
  ],
  sourceIds: [],
});

// Original Page One lesson for CED Topic 3.5.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.5", {
  summary:
    "How the war began, the turning points that saved the Patriot cause, and why Britain's apparent advantages were not enough to defeat the colonies.",
  minutes: 12,
  goals: [
    "Describe how the Revolutionary War began and widened from 1775 to 1778.",
    "Identify the turning points that led to American victory.",
    "Explain how militias, the Continental Army, Washington's leadership, ideological commitment, and European allies contributed to victory.",
  ],
  bigIdea:
    "Despite loyalist opposition and Britain's apparent military and financial advantages, the Patriot cause succeeded because of the combined effects of the colonists' own efforts and help from abroad.",
  context:
    "The CED asks you to explain how various factors contributed to the American victory. Be ready to rank the factors and to say why a single cause is not enough.",
  sections: [
    section(
      "war-begins",
      "The war begins",
      ["PCE", "WOR"],
      [
        "Fighting began in April 1775 when British troops marching to seize colonial military supplies clashed with militia at Lexington and Concord in Massachusetts. The Second Continental Congress met in Philadelphia, created the Continental Army, and named George Washington its commander. In July 1775 Congress sent the Olive Branch Petition to the king, who rejected it, and in July 1776 Congress adopted the Declaration of Independence.",
        "Not all colonists supported the Patriot cause. Loyalists, who stayed faithful to the Crown, were a substantial minority, and some regions, especially in the South and in parts of New York, were bitterly divided. The war was in part a civil war among colonists.",
      ],
      "The war began in Massachusetts in 1775, widened into a fight for independence by 1776, and divided colonists into Patriots and Loyalists.",
    ),
    section(
      "turning-points",
      "Turning points",
      ["WOR", "GEO"],
      [
        "After early defeats in 1776, Washington's surprise victory at Trenton at the end of the year lifted Patriot morale. The Patriot victory at Saratoga in New York in 1777 convinced France that the Americans could win. In 1778 France signed an alliance with the United States, and soon provided money, supplies, troops, and naval power. Spain and the Netherlands later joined the war against Britain, which turned the conflict into a wider European and global war.",
        "The Continental Army endured the hard winter at Valley Forge in 1777–1778 and emerged better trained. After 1778 the British shifted their effort to the South, but they struggled to hold territory there. In 1781, a combined American and French army and French fleet trapped a British army under General Cornwallis at Yorktown, Virginia, and he surrendered in October. The Treaty of Paris of 1783 recognized American independence and set the new nation's boundaries from the Atlantic to the Mississippi River.",
      ],
      "Saratoga brought the French alliance, and the allied victory at Yorktown led to the Treaty of Paris of 1783.",
    ),
    section(
      "why-patriots-won",
      "Why the Patriots won",
      ["PCE", "SOC", "WOR"],
      [
        "The Patriot cause succeeded because of the actions of colonial militias and the Continental Army, George Washington's military leadership, the colonists' ideological commitment and resilience, and assistance sent by European allies. Washington kept the army together through defeat and hardship and avoided the destruction of his forces. Militias controlled their local areas and wore down British forces. Many Patriots remained committed to republican ideals even when the war went badly.",
        "Britain faced its own problems. Its armies were thousands of miles from home, the colonies were too large to occupy, and British leaders could not win the support of enough colonists to hold the territory that their soldiers captured. French assistance, in money, equipment, soldiers, and sea power, was decisive at Yorktown.",
        [
          "Common trap",
          "Do not credit one cause alone. The French alliance mattered, but it came after Saratoga showed that the Patriots could fight, and it did not remove the need for Washington's army or local militias.",
        ],
      ],
      "Colonial effort, leadership, commitment, and European help together overcame Britain's advantages.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.6",
      title: "The war's effects on society",
      body: "The war reached into every part of society. Topic 3.6 follows what it did to ideas about slavery, women, and politics.",
      transferQuestion:
        "Which two factors from this topic would you rank as most important in the Patriot victory, and why?",
      feedback:
        "A strong answer names two factors, supports each with a specific event, and explains why the others were less decisive.",
      links: [
        {
          topicId: "apush-3-4",
          sectionId: "common-sense-and-the-declaration",
          label: "Review Common Sense and the Declaration",
        },
      ],
    },
  ],
  sourceIds: [],
});

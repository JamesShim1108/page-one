// Original practice questions for Topic 3.5. q-numbered items are topic practice;
// t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("3.5", [
  {
    id: "q01",
    s: "war-begins",
    sub: "1.A",
    kc: ["KC-3.1.II.E"],
    q: "The first armed fighting of the Revolutionary War took place in April 1775 at",
    right:
      "Lexington and Concord, Massachusetts, where militia clashed with British troops",
    at: 3,
    wrong: [
      [
        "Yorktown, Virginia, where a British army was trapped by American and French forces",
        "Yorktown was the last major battle, in 1781.",
      ],
      [
        "Saratoga, New York, where a British army under General Burgoyne was forced to surrender",
        "Saratoga was fought in 1777.",
      ],
      [
        "Trenton, New Jersey, where Washington surprised German soldiers hired by Britain",
        "Trenton took place at the end of 1776.",
      ],
    ],
    why: "British troops marching to seize colonial military supplies met militia at Lexington and Concord, and the shooting began the war.",
    d: "The Saratoga choice is close because it was an early and famous Patriot victory, but it came two years later.",
  },
  {
    id: "q02",
    s: "war-begins",
    sub: "1.A",
    kc: ["KC-3.1.II.E"],
    q: "Which of the following actions did the Second Continental Congress take in 1775 and 1776?",
    right:
      "It created the Continental Army, named George Washington its commander, and adopted the Declaration of Independence",
    at: 0,
    wrong: [
      [
        "It signed a peace treaty with Britain and then ratified the Constitution of the United States",
        "The peace treaty came in 1783, and the Constitution was written in 1787.",
      ],
      [
        "It sent the Olive Branch Petition to Parliament and accepted the Coercive Acts in return for peace",
        "The petition was sent to the king, and Congress did not accept the Coercive Acts.",
      ],
      [
        "It appointed Benjamin Franklin commander of the army and moved the capital from Philadelphia to Boston",
        "Washington was the commander, and Congress met in Philadelphia.",
      ],
    ],
    why: "Congress organized the army, chose Washington, and in July 1776 declared independence after the king rejected its petition.",
    d: "The Olive Branch choice is close because the petition was real, but it went to the king and was rejected.",
  },
  {
    id: "q03",
    s: "war-begins",
    sub: "1.B",
    kc: ["KC-3.1.II.E"],
    q: "Which of the following best describes the Loyalists during the American Revolution?",
    right:
      "Colonists who stayed faithful to the Crown, a substantial minority whose presence made the war partly a civil war",
    at: 1,
    wrong: [
      [
        "British soldiers who deserted the army and settled in the colonies to join the Patriot cause",
        "Loyalists were colonists who supported Britain.",
      ],
      [
        "Colonists who supported independence but wanted a king to rule the new nation under a constitution",
        "Loyalists wanted to remain under the Crown, not to create a new monarchy.",
      ],
      [
        "A small group of royal officials who had no support among the colonists and lived only in Boston",
        "Loyalists lived in every colony and many were ordinary colonists.",
      ],
    ],
    why: "A substantial minority of colonists opposed independence, and the war divided communities and families, especially in the South and parts of New York.",
    d: "The royal-officials choice is close because officials were Loyalists, but the group also included many ordinary colonists.",
  },
  {
    id: "q04",
    s: "turning-points",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.1.II.E"],
    q: "Which of the following best explains the importance of the Patriot victory at Saratoga in 1777?",
    right:
      "It convinced France that the Americans could win, which led to the French alliance of 1778",
    at: 2,
    wrong: [
      [
        "It ended the war because the British army in North America surrendered and Britain asked for peace",
        "The war continued until 1781, and the treaty was signed in 1783.",
      ],
      [
        "It gave the Americans control of the South, where they used it to force Loyalists to leave the colonies",
        "Saratoga was in New York, and the war in the South came later.",
      ],
      [
        "It led Spain to give up Florida to the United States in return for American help against France",
        "Spain joined the war against Britain later, and Florida did not pass to the United States then.",
      ],
    ],
    why: "The victory showed that the Patriots could defeat a British army, which persuaded France to ally with them and send money, supplies, and naval power.",
    d: "The war-ended choice is close because Saratoga was a major victory, but the British kept fighting for years.",
  },
  {
    id: "q05",
    s: "why-patriots-won",
    sub: "1.B",
    kc: ["KC-3.1.II.E"],
    q: "George Washington contributed to the American victory mainly by",
    right:
      "keeping the Continental Army together through defeat and hardship and avoiding its destruction",
    at: 0,
    wrong: [
      [
        "winning every major battle against the British army and capturing its commanders early in the war",
        "The Continental Army lost many battles, and Washington's strength was in keeping the army in being.",
      ],
      [
        "negotiating the alliance with France on behalf of Congress during the winter at Valley Forge",
        "Benjamin Franklin and other diplomats negotiated the alliance in France.",
      ],
      [
        "writing the Declaration of Independence and presenting it to the Second Continental Congress in 1776",
        "Jefferson was the principal author of the Declaration.",
      ],
    ],
    why: "Washington's leadership held the army together through the winter at Valley Forge and long retreats, so the Patriots could keep fighting.",
    d: "The battle-victories choice is close because Washington won key battles, but he lost many and his main strength was persistence.",
  },
  {
    id: "q06",
    s: "why-patriots-won",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.1.II.E"],
    q: "Which of the following best explains why Britain, despite its military and financial advantages, did not defeat the Patriots?",
    right:
      "The distance from home, the size of the colonies, and limited colonial support made it hard to hold territory",
    at: 3,
    wrong: [
      [
        "Britain's navy was destroyed in the first year of the war, and it could not ship troops to North America",
        "The British navy stayed powerful and transported armies across the Atlantic.",
      ],
      [
        "Most colonists supported the Patriot cause and took up arms, so no Loyalists remained in the colonies",
        "Loyalists were a substantial minority throughout the war.",
      ],
      [
        "Britain withdrew from North America in 1776 in order to defend its holdings in India",
        "Britain fought in North America until 1781.",
      ],
    ],
    why: "British armies were thousands of miles from home, the colonies were too large to occupy, and British forces could not win enough colonial support to hold the places they captured.",
    d: "The navy choice is close because sea power mattered, but the British navy was strong until France joined the war.",
  },
  {
    id: "q07",
    s: "turning-points",
    sub: "1.A",
    kc: ["KC-3.1.II.E"],
    q: "The British surrender at Yorktown in 1781 was the result of",
    right:
      "a combined American and French army and a French fleet trapping a British army under General Cornwallis",
    at: 1,
    wrong: [
      [
        "a surprise attack by Patriot militia on the British army that was sleeping in winter quarters at Valley Forge",
        "Valley Forge was the Patriot camp, and the surrender at Yorktown was in 1781.",
      ],
      [
        "a naval blockade of Boston Harbor by the Continental Navy, which forced British troops to leave Massachusetts",
        "The British left Boston in 1776, and Yorktown is in Virginia.",
      ],
      [
        "a mutiny among German soldiers hired by Britain, who refused to fight against the Patriot army",
        "Yorktown resulted from a military siege and a naval blockade.",
      ],
    ],
    why: "French ships cut off the British by sea, and American and French troops surrounded them on land, so Cornwallis surrendered.",
    d: "The Boston choice is close because Boston was an earlier blockade, but the Yorktown surrender came from French and American cooperation.",
  },
  {
    id: "q08",
    s: "turning-points",
    sub: "1.A",
    kc: ["KC-3.1.II.E"],
    q: "The Treaty of Paris of 1783 did which of the following?",
    right:
      "Britain recognized American independence and set the new nation's boundaries to the Mississippi River",
    at: 2,
    wrong: [
      [
        "Britain kept the Northwest forts and the United States agreed to pay the taxes that it had refused before the war",
        "The treaty recognized independence and did not restore British taxes.",
      ],
      [
        "France received Canada from Britain and agreed to give up its claims to the Mississippi valley",
        "France did not receive Canada.",
      ],
      [
        "The colonies agreed to a union under the king and to send representatives to Parliament",
        "The treaty recognized the United States as independent.",
      ],
    ],
    why: "The treaty ended the war, recognized the independence of the United States, and set boundaries from the Atlantic to the Mississippi River.",
    d: "The Northwest-forts choice is close because Britain kept forts for years, but the treaty did not restore taxes.",
  },
  {
    id: "t01",
    s: "turning-points",
    sub: "3.A",
    kc: ["KC-3.1.II.E"],
    q: "Which of the following conclusions about the Revolutionary War is best supported by the table?",
    right:
      "Events in 1777 and 1778 brought a European ally into the war on the American side",
    at: 3,
    wrong: [
      [
        "The American army won every major battle between 1775 and 1783 without foreign help",
        "The table lists key events, and it does not show that the Americans won every battle.",
      ],
      [
        "Britain recognized American independence before the surrender of its army at Yorktown",
        "The table shows that recognition came in 1783, after Yorktown.",
      ],
      [
        "The war ended in 1776 when the Declaration of Independence was adopted by Congress",
        "The table lists events through 1783.",
      ],
    ],
    why: "The table shows the surrender at Saratoga in 1777 followed by the Franco-American alliance in 1778.",
    d: "The recognition choice is close because the table lists the treaty, but the treaty is dated after Yorktown.",
    stim: excerpts.originalRevolutionTable,
  },
  {
    id: "t02",
    s: "turning-points",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.1.II.E"],
    q: "Which of the following best explains the importance of the event listed in the table for 1778?",
    right:
      "France supplied money, troops, and naval power that helped the Americans win at Yorktown",
    at: 1,
    wrong: [
      [
        "France forced Britain to recognize American independence by threatening an invasion of London",
        "Britain recognized independence in 1783 after the war's end.",
      ],
      [
        "France ended the loyalist threat by sending its army to remove Loyalists from the colonies",
        "France did not remove Loyalists.",
      ],
      [
        "France took over command of the Continental Army so that Washington could negotiate the peace",
        "Washington remained commander of the army.",
      ],
    ],
    why: "The alliance gave the Patriots French money, supplies, troops, and ships, and the French fleet was decisive at Yorktown in 1781.",
    d: "The recognition choice is close because the war ended with recognition, but France's role was to help win the war.",
    stim: excerpts.originalRevolutionTable,
  },
  {
    id: "t03",
    s: "why-patriots-won",
    sub: "3.D",
    kc: ["KC-3.1.II.E"],
    q: "Which of the following would best support the claim that European allies contributed to the American victory?",
    right:
      "French ships prevented British reinforcements and supplies from reaching Cornwallis at Yorktown",
    at: 2,
    wrong: [
      [
        "Washington's army camped at Valley Forge in the winter of 1777 and 1778 and trained there",
        "Valley Forge concerned the Continental Army's own training and endurance.",
      ],
      [
        "Patriot militia in Massachusetts gathered at Lexington and Concord in April 1775",
        "This shows colonial effort and not European help.",
      ],
      [
        "The Declaration of Independence listed grievances against the king and Parliament in July 1776",
        "This is a statement of colonial ideas and not evidence of European help.",
      ],
    ],
    why: "French naval power cut the British off by sea at Yorktown, which is direct evidence of an ally's contribution to the victory.",
    d: "The Valley Forge choice is close because it was part of the war, but it shows American endurance and not foreign help.",
    stim: excerpts.originalRevolutionTable,
  },
]);

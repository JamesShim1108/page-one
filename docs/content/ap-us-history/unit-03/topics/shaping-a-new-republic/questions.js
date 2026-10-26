// Original practice questions for Topic 3.10. q-numbered items are topic practice;
// t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("3.10", [
  {
    id: "q01",
    s: "institutions-and-precedents",
    sub: "1.B",
    lo: "L",
    kc: ["KC-3.2.III.A"],
    q: "Which of the following was a way in which Washington's administration put the Constitution into practice?",
    right:
      "Washington appointed department heads who met with him as a cabinet, and Congress created the federal courts",
    at: 2,
    wrong: [
      [
        "Washington ruled by proclamation and refused to sign any bill that Congress had passed during his presidency",
        "Washington signed bills and worked with Congress.",
      ],
      [
        "Washington let Congress appoint the heads of the executive departments and approve each of his decisions",
        "The president appointed department heads with the Senate's approval.",
      ],
      [
        "Washington asked the states to select a council of governors to advise him in place of a cabinet",
        "Washington relied on a cabinet of department heads.",
      ],
    ],
    why: "The first president and Congress created departments, courts, and customs that turned the Constitution's text into a working government.",
    d: "The Congress-appoints choice is close because Congress approves nominations, but the president makes them.",
  },
  {
    id: "q02",
    s: "institutions-and-precedents",
    sub: "1.A",
    lo: "L",
    kc: ["KC-3.2.III.A"],
    q: "Alexander Hamilton's financial program for the new nation included",
    right:
      "paying the national debt, assuming state war debts, and creating a national bank",
    at: 0,
    wrong: [
      [
        "ending all tariffs and taxes, refusing to repay the war debt, and relying on loans from the states",
        "Hamilton's program called for repaying the debt and raising revenue.",
      ],
      [
        "abolishing the national debt by printing paper money that states were required to accept at its face value",
        "Hamilton proposed paying the debt and not printing money to cancel it.",
      ],
      [
        "dividing the war debt among the states and eliminating all national control of trade and taxation",
        "Hamilton wanted the national government to assume state debts.",
      ],
    ],
    why: "Hamilton believed a strong financial system would strengthen the national government and its credit.",
    d: "The dividing-the-debt choice is close because it concerns state debts, but Hamilton proposed national assumption of them.",
  },
  {
    id: "q03",
    s: "institutions-and-precedents",
    sub: "1.B",
    lo: "L",
    kc: ["KC-3.2.III.A"],
    q: "The Whiskey Rebellion of 1794 was significant because Washington",
    right:
      "led a large militia force to western Pennsylvania, which showed that the government could enforce its laws",
    at: 3,
    wrong: [
      [
        "agreed to repeal the excise tax after farmers threatened to leave the nation and join Spain",
        "The government enforced the tax and put down the resistance.",
      ],
      [
        "asked the state of Pennsylvania to settle the dispute because the national government lacked authority",
        "The national government asserted its own authority.",
      ],
      [
        "dismissed Hamilton for having proposed the tax and replaced him with Thomas Jefferson",
        "Hamilton remained in office until 1795.",
      ],
    ],
    why: "The rebellion tested the new government's power, and the federal response contrasted with the failure to deal with Shays' Rebellion under the Articles.",
    d: "The state-settles choice is close because the Articles relied on the states, but the Constitution gave the nation its own authority.",
  },
  {
    id: "q04",
    s: "parties-and-foreign-policy",
    sub: "5.A",
    r: "comparison",
    lo: "L",
    kc: ["KC-3.2.III.B"],
    q: "Which of the following was a difference between the Federalists and the Democratic-Republicans in the 1790s?",
    right:
      "Federalists favored a strong national government and ties with Britain, while Democratic-Republicans favored limited national power and sympathized with France",
    at: 1,
    wrong: [
      [
        "Federalists favored a weak national government and ties with France, while Democratic-Republicans favored strong national power and ties with Britain",
        "This reverses the positions of the two parties.",
      ],
      [
        "Federalists wanted to end slavery and expand voting rights, while Democratic-Republicans wanted to protect slavery and limit voting",
        "Neither party was organized around these positions.",
      ],
      [
        "Federalists wanted to abolish the Constitution and return to the Articles, while Democratic-Republicans wanted to preserve it",
        "Federalists supported the Constitution.",
      ],
    ],
    why: "The parties formed around disagreements over the power of the national government, the economy, and foreign policy.",
    d: "The reversed choice is close because it uses the same issues, but it swaps the positions of the two parties.",
  },
  {
    id: "q05",
    s: "parties-and-foreign-policy",
    sub: "5.B",
    r: "causation",
    lo: "K",
    kc: ["KC-3.3.II.B"],
    q: "Which of the following best explains why the war between Britain and France was a challenge for the United States in the 1790s?",
    right:
      "Both powers seized American ships, and Americans were divided over which side to favor",
    at: 3,
    wrong: [
      [
        "Both powers sent armies into the United States and demanded that Americans join them in the war",
        "Neither power invaded the United States in the 1790s.",
      ],
      [
        "Both powers demanded that the United States repay its war debts in full within one year",
        "Foreign debts were not the main issue in these disputes.",
      ],
      [
        "Both powers agreed to divide the Northwest Territory between them, and the United States objected",
        "The powers did not divide the territory.",
      ],
    ],
    why: "The conflict endangered American neutral trade and deepened the split between those who favored Britain and those who favored France.",
    d: "The armies choice is close because the war was a threat, but the main challenge came at sea and in politics.",
  },
  {
    id: "q06",
    s: "borders-and-american-indians",
    sub: "1.A",
    lo: "K",
    kc: ["KC-3.3.II.A"],
    q: "Under Pinckney's Treaty of 1795, Spain",
    right:
      "recognized American rights to navigate the Mississippi River and to store goods at New Orleans",
    at: 0,
    wrong: [
      [
        "agreed to withdraw its forts from the Northwest Territory and to end its trade with Native nations",
        "Britain, not Spain, kept the Northwest forts, and Jay's Treaty addressed them.",
      ],
      [
        "gave Florida and Louisiana to the United States in return for American neutrality in the war with Britain",
        "Spain did not give up these lands in 1795.",
      ],
      [
        "closed the Mississippi River to American shipping in order to pressure the United States to ally with Spain",
        "The treaty opened the river, which Spain had closed in 1784.",
      ],
    ],
    why: "The treaty gave western settlers the access to markets that they wanted.",
    d: "The Northwest-forts choice is close because it was also a border issue in 1794–1795, but it was settled with Britain through Jay's Treaty.",
  },
  {
    id: "q07",
    s: "institutions-and-precedents",
    sub: "1.B",
    lo: "K",
    kc: ["KC-3.3.II.C"],
    q: "In his Farewell Address, George Washington",
    right:
      "encouraged national unity and warned against political factions and permanent foreign alliances",
    at: 1,
    wrong: [
      [
        "urged Americans to form two strong political parties to protect liberty from the central government",
        "Washington warned against parties.",
      ],
      [
        "called for a permanent alliance with France as a reward for French help in the Revolutionary War",
        "Washington warned against permanent alliances.",
      ],
      [
        "announced that he would seek a third term in order to complete the Hamilton financial program",
        "Washington declined to run for a third term.",
      ],
    ],
    why: "Washington feared that factions and foreign entanglements would divide and endanger the nation.",
    d: "The French alliance choice is close because France had aided the Revolution, but Washington warned against permanent alliances.",
  },
  {
    id: "q08",
    s: "borders-and-american-indians",
    sub: "1.A",
    lo: "K",
    kc: ["KC-3.3.I.D"],
    q: "The Battle of Fallen Timbers in 1794 and the Treaty of Greenville in 1795 resulted in",
    right:
      "the defeat of a Native confederacy and the cession of much of present-day Ohio to the United States",
    at: 2,
    wrong: [
      [
        "the recognition of the Ohio country as an independent Native nation protected by the United States",
        "The tribes gave up much of the land.",
      ],
      [
        "the expulsion of British troops from Canada by a joint American and Native army in the war",
        "The battle was fought in the Ohio country, and Britain stayed in Canada.",
      ],
      [
        "the creation of a Native reservation in the Ohio country that settlers were forbidden to enter",
        "The treaty opened much of Ohio to settlement.",
      ],
    ],
    why: "The defeat of the Native confederacy at Fallen Timbers led to a treaty in which the tribes gave up land, which opened Ohio to settlement.",
    d: "The independent-nation choice is close because the treaty did recognize tribes, but they gave up much of their land.",
  },
  {
    id: "q09",
    s: "borders-and-american-indians",
    sub: "1.B",
    lo: "K",
    kc: ["KC-3.3.I.E"],
    q: "Which of the following describes the Spanish missions in California in the late 1700s?",
    right:
      "They were supported by the bonded labor of local American Indians, gave soldiers opportunities for mobility, and led to cultural blending",
    at: 3,
    wrong: [
      [
        "They were self-governing settlements in which Native peoples and Spanish soldiers held equal political rights",
        "The missions relied on the bonded labor of Native peoples.",
      ],
      [
        "They were trading posts run by French merchants who exchanged furs with Native peoples for manufactured goods",
        "The missions were Spanish settlements.",
      ],
      [
        "They were military forts that the United States built to defend its western border against Spanish expansion",
        "The missions were built by Spain, not by the United States.",
      ],
    ],
    why: "The missions expanded Spanish power in California, and they blended Spanish and Native cultures even as Native people suffered from forced labor and disease.",
    d: "The equal-rights choice is close because cultural blending occurred, but Native people worked under compulsion.",
  },
  {
    id: "t01",
    s: "parties-and-foreign-policy",
    sub: "3.A",
    lo: "L",
    kc: ["KC-3.2.III.B"],
    q: "Which of the following statements about the first political parties is best supported by the table?",
    right:
      "The parties disagreed over the power of the national government, the economy, and foreign policy",
    at: 2,
    wrong: [
      [
        "Both parties supported a national bank, but they disagreed over where it should be located",
        "The table shows that Democratic-Republicans opposed the bank.",
      ],
      [
        "Both parties wanted closer ties with France, but they disagreed over trade with Britain",
        "The table shows the parties favored different foreign partners.",
      ],
      [
        "Federalists wanted a strict reading of the Constitution, while Democratic-Republicans wanted a broad reading",
        "The table shows that Federalists favored a broad reading.",
      ],
    ],
    why: "The table lists contrasting positions on federal power, the economy, foreign policy, and the Constitution.",
    d: "The strict-reading choice is close because it uses the same issue, but it swaps the two positions.",
    stim: excerpts.originalPartiesTable,
  },
  {
    id: "t02",
    s: "parties-and-foreign-policy",
    sub: "5.A",
    r: "comparison",
    lo: "L",
    kc: ["KC-3.2.III.B"],
    q: "Which of the following was a difference between the two parties on the economy, as shown in the table?",
    right:
      "Federalists supported a national bank and commerce, while Democratic-Republicans favored small farmers",
    at: 0,
    wrong: [
      [
        "Federalists favored an economy of small farmers, while Democratic-Republicans supported a national bank",
        "This reverses the positions in the table.",
      ],
      [
        "Federalists opposed manufacturing, while Democratic-Republicans supported new factories in the cities",
        "The table shows that Federalists supported manufacturing.",
      ],
      [
        "Federalists wanted free trade with all nations, while Democratic-Republicans wanted high tariffs",
        "The table does not show these positions on trade.",
      ],
    ],
    why: "Federalists, led by Hamilton, favored policies that helped commerce, and Democratic-Republicans, led by Jefferson, favored an economy of small farmers.",
    d: "The reversed choice is close because it uses the same topics, but it swaps the two positions.",
    stim: excerpts.originalPartiesTable,
  },
  {
    id: "t03",
    s: "parties-and-foreign-policy",
    sub: "5.B",
    r: "causation",
    lo: "K",
    kc: ["KC-3.3.II.B"],
    q: "Which of the following events most directly contributed to the disagreement over foreign policy shown in the table?",
    right: "The wars between Britain and France that followed the French Revolution",
    at: 1,
    wrong: [
      [
        "The Treaty of Paris of 1783, which ended the Revolutionary War and recognized independence",
        "The treaty ended the war between Britain and the United States.",
      ],
      [
        "The Northwest Ordinance of 1787, which set rules for organizing the territory north of the Ohio River",
        "The ordinance concerned western territory.",
      ],
      [
        "The Great Compromise of 1787, which settled how states would be represented in Congress",
        "The compromise concerned representation in Congress.",
      ],
    ],
    why: "The conflict between Britain and France forced Americans to decide whom to favor, and the parties divided over the answer.",
    d: "The Treaty of Paris choice is close because it involved Britain, but it came a decade before the divisions over France.",
    stim: excerpts.originalPartiesTable,
  },
]);

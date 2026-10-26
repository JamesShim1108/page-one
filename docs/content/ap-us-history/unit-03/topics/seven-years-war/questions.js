// Original practice questions for Topic 3.2. q-numbered items are topic practice;
// t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("3.2", [
  {
    id: "q01",
    s: "rivalry-in-the-interior",
    sub: "1.B",
    kc: ["KC-3.1.I.A"],
    q: "Which of the following best explains why rivalry between Britain and France intensified in the mid-1700s?",
    right:
      "The growing colonial population expanded into the interior, threatening French–Indian trade and Native autonomy",
    at: 1,
    wrong: [
      [
        "French settlers moved into the British colonies on the Atlantic coast and took over much of the best farmland there",
        "French settlements were in the St. Lawrence valley and the interior, not on the British Atlantic coast.",
      ],
      [
        "Britain wanted to end the fur trade in North America so that colonists could focus on farming",
        "The fur trade was valuable to France and to Native nations, and Britain also traded for furs.",
      ],
      [
        "American Indian nations asked Britain to fight France so that Native peoples could trade with Spain",
        "Native nations had their own interests and did not make this request.",
      ],
    ],
    why: "As colonists moved west, they came into conflict with French trading networks and with Native nations who wanted to keep their lands.",
    d: "The fur-trade choice is close because the fur trade was part of the conflict, but Britain did not try to end it.",
  },
  {
    id: "q02",
    s: "rivalry-in-the-interior",
    sub: "1.A",
    kc: ["KC-3.1.I.A"],
    q: "Which region was at the center of the dispute between Britain and France that began the Seven Years' War in North America?",
    right:
      "The Ohio River Valley, which both empires claimed and many Native nations inhabited",
    at: 0,
    wrong: [
      [
        "The Great Plains west of the Mississippi River, which neither empire had explored or settled",
        "Fighting began in the Ohio Valley, east of the Mississippi.",
      ],
      [
        "The coast of the Carolinas, where French ships had attacked English trading posts for years",
        "The dispute was in the interior rather than on the Carolina coast.",
      ],
      [
        "The St. Lawrence River valley, which Britain claimed and the French had never settled or governed",
        "The St. Lawrence valley was the heart of French Canada.",
      ],
    ],
    why: "Both Britain and France claimed the Ohio Valley, and the first fighting of the war took place there in 1754.",
    d: "The St. Lawrence choice is close because Quebec later fell to the British, but the war began over the Ohio Valley.",
  },
  {
    id: "q03",
    s: "british-victory-and-cost",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.1.I.B"],
    q: "Which of the following best explains why Britain looked to the colonies for revenue after 1763?",
    right:
      "The war had left Britain deeply in debt with a larger empire to defend, and officials thought the colonies should help pay",
    at: 3,
    wrong: [
      [
        "Colonial merchants had refused to pay the customs duties that Britain collected before the war began",
        "The problem after 1763 was Britain's war debt, not unpaid customs from before the war.",
      ],
      [
        "Britain wanted to punish the colonies for having refused to send soldiers to fight in the war",
        "Colonial militias had fought in the war, and Britain's concern was its debt.",
      ],
      [
        "France demanded payments from Britain, and Britain asked colonists to send gold and silver to Paris",
        "France lost the war and did not collect payments from Britain.",
      ],
    ],
    why: "Victory brought a large new territory to defend and a large debt, so officials decided that the colonies should share the cost.",
    d: "The punishment choice is close because colonists later felt punished, but the cause was the cost of the war.",
  },
  {
    id: "q04",
    s: "british-victory-and-cost",
    sub: "1.A",
    kc: ["KC-3.1.I.B"],
    q: "Which of the following was a result of the Treaty of Paris of 1763?",
    right:
      "France gave up Canada and its claims east of the Mississippi River, and Britain gained Florida",
    at: 2,
    wrong: [
      [
        "Britain gave Florida to France in return for Canada and its claims east of the Mississippi River",
        "Britain gained Florida from Spain and Canada from France.",
      ],
      [
        "France kept Canada but gave Britain its claims in the Ohio Valley and the Great Lakes region",
        "France gave up Canada as well as its claims east of the Mississippi.",
      ],
      [
        "Spain gained all of the land east of the Mississippi River in exchange for aid to Britain",
        "Spain gave up Florida and received Louisiana from France.",
      ],
    ],
    why: "Britain emerged with Canada, the land east of the Mississippi, and Florida, which made its North American empire much larger.",
    d: "The Florida-exchange choice is close because Florida was exchanged, but it went to Britain, not to France.",
  },
  {
    id: "q05",
    s: "proclamation-and-native-resistance",
    sub: "1.B",
    kc: ["KC-3.1.I.C"],
    q: "The Proclamation of 1763 was intended to",
    right:
      "avoid new wars with Native nations by forbidding settlement west of the Appalachian Mountains",
    at: 0,
    wrong: [
      [
        "raise revenue for the Crown by selling the western lands to colonists at high prices",
        "The proclamation closed the western lands to settlement rather than selling them.",
      ],
      [
        "give colonial assemblies authority to govern and distribute the western territories as they wished",
        "The Crown kept control of the western lands and gave assemblies no such authority.",
      ],
      [
        "reward soldiers who had fought for Britain by granting each of them a farm in the Ohio country",
        "Settlement of the Ohio country was restricted by the proclamation.",
      ],
    ],
    why: "The Crown wanted to reduce conflict with Native nations, many of whom feared the loss of their land, by limiting settlement west of the mountains.",
    d: "The revenue choice is close because Britain needed money, but the proclamation was a security measure and restricted settlement.",
  },
  {
    id: "q06",
    s: "proclamation-and-native-resistance",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.1.I.C"],
    q: "Which of the following best explains why Native nations of the Great Lakes and Ohio Valley attacked British forts in 1763?",
    right:
      "They feared the spread of British settlement and disliked British trade policies after the French defeat",
    at: 1,
    wrong: [
      [
        "They had joined the colonists in a campaign against the Crown and its tax policies in North America",
        "Taxation disputes between the colonists and Britain came later, and Native nations acted on their own concerns.",
      ],
      [
        "They believed that the Proclamation of 1763 had opened their lands to British settlers and traders",
        "The proclamation restricted settlement, and the attacks had begun before it was issued.",
      ],
      [
        "They had been ordered by the Spanish to attack British forts so that Spain could take the Ohio Valley",
        "Native nations acted for their own reasons, not on Spanish orders.",
      ],
    ],
    why: "With the French gone, Native nations lost a trading partner and counterweight, and they feared that colonists would move onto their lands.",
    d: "The proclamation choice is close because the proclamation was linked to the war, but it followed the first attacks and was meant to limit settlement.",
  },
  {
    id: "q07",
    s: "proclamation-and-native-resistance",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.1.I.C"],
    q: "Which of the following best describes the colonial reaction to the Proclamation of 1763?",
    right:
      "Many colonists, who had expected western lands, resented the restriction, and some settled there anyway",
    at: 2,
    wrong: [
      [
        "Colonists welcomed the proclamation because it protected them from Native attacks and from French rule",
        "Many colonists, including veterans and land speculators, wanted western land and resented the limit.",
      ],
      [
        "Colonial assemblies passed laws requiring every settler to return to the coast within one year",
        "The assemblies did not order settlers back, and many settlers moved west anyway.",
      ],
      [
        "Colonists accepted the proclamation because it gave each colony a share of the western lands",
        "The proclamation reserved the land for Native peoples and did not distribute it to colonies.",
      ],
    ],
    why: "The line was hard to enforce, and the restriction added to colonial opposition to British policy.",
    d: "The welcome choice is close because the proclamation did reduce the risk of conflict, but it blocked expectations of land.",
  },
  {
    id: "q08",
    s: "rivalry-in-the-interior",
    sub: "1.A",
    kc: ["KC-3.1.I.A"],
    q: "Which of the following describes the Albany Plan of Union of 1754?",
    right:
      "Colonial delegates considered a plan for a union of the colonies, but no colony approved it",
    at: 3,
    wrong: [
      [
        "Britain created a union of the colonies under a royal governor to fight the French in the Ohio Valley",
        "The Albany Plan was proposed by colonists, and Britain did not impose it.",
      ],
      [
        "The colonies formed a permanent government that taxed the colonists to pay for the war with France",
        "The colonies did not form a permanent government.",
      ],
      [
        "The colonies signed a treaty with the Iroquois to join the French against the British",
        "The colonies hoped to keep the Iroquois as allies against the French.",
      ],
    ],
    why: "Benjamin Franklin and other delegates proposed a union at Albany, but the colonial assemblies were unwilling to give up power.",
    d: "The royal-governor choice is close because Britain did later direct the war, but the Albany Plan came from the colonies.",
  },
  {
    id: "t01",
    s: "british-victory-and-cost",
    sub: "3.A",
    kc: ["KC-3.1.I.B"],
    q: "Which of the following best states the main idea of the passage?",
    right:
      "Britain's victory brought new territory but also debt and duties that shaped its colonial policies",
    at: 1,
    wrong: [
      [
        "France won the war but lost control of its colonies because of the Proclamation of 1763",
        "The passage says Britain won the war and that France gave up Canada.",
      ],
      [
        "The colonists defeated the French by themselves and expected Britain to reward them with western land",
        "The passage describes a British victory and does not credit the colonists alone.",
      ],
      [
        "American Indians gained control of the Appalachian Mountains as a result of the Treaty of Paris",
        "The passage describes the Proclamation of 1763, not a transfer of control to Native nations.",
      ],
    ],
    why: "The passage describes the territory Britain gained, the debt it carried, and the policies that followed, including the Proclamation of 1763.",
    d: "The colonist choice is close because the passage mentions that colonists expected western lands, but it does not say they won the war alone.",
    stim: excerpts.originalSevenYearsWar,
  },
  {
    id: "t02",
    s: "proclamation-and-native-resistance",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.1.I.C"],
    q: "According to the passage, why did the Crown forbid colonists from settling west of the Appalachian Mountains?",
    right:
      "Officials wanted to avoid new wars with American Indians who feared the loss of their land",
    at: 0,
    wrong: [
      [
        "Officials wanted to keep the colonists close to the coast where they could be taxed more easily",
        "The passage links the order to the danger of new wars with American Indians.",
      ],
      [
        "Officials wanted to hold the western lands for the French, who had been promised them by treaty",
        "The passage says France gave up its claims east of the Mississippi.",
      ],
      [
        "Officials wanted to prevent colonists from fighting other colonists over control of the western lands",
        "The passage does not mention disputes among colonists as the reason.",
      ],
    ],
    why: "The passage states that British officials wished to avoid new wars with American Indians, who now feared the loss of their land.",
    d: "The taxation choice is close because the passage says colonists should pay for defense, but it gives a different reason for the Proclamation.",
    stim: excerpts.originalSevenYearsWar,
  },
  {
    id: "t03",
    s: "british-victory-and-cost",
    sub: "3.B",
    kc: ["KC-3.1.I.B"],
    q: "Which of the following details from the passage best supports the claim that Britain's victory created new problems for the empire?",
    right:
      "The victory left Britain deeply in debt and responsible for a much larger empire",
    at: 3,
    wrong: [
      [
        "France gave up Canada and its claims east of the Mississippi River in the Treaty of Paris",
        "This detail describes a gain for Britain and not a problem.",
      ],
      [
        "Spain gave Florida to Britain at the end of the war in the Treaty of Paris",
        "This detail describes a territorial gain for Britain.",
      ],
      [
        "The victory removed the French threat to the colonies after the end of the war",
        "This detail describes a benefit of the victory.",
      ],
    ],
    why: "The debt and the larger empire were the costs of victory, and they pushed Britain toward new policies for the colonies.",
    d: "The French-threat choice is close because it comes from the same sentence, but it describes a benefit, not a problem.",
    stim: excerpts.originalSevenYearsWar,
  },
]);

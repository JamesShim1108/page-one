// Original practice questions for Topic 3.3. q-numbered items are topic practice;
// t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("3.3", [
  {
    id: "q01",
    s: "new-policies",
    sub: "1.A",
    kc: ["KC-3.1.II.A"],
    q: "The Stamp Act of 1765 was a British law that",
    right:
      "taxed printed materials such as newspapers and was the first direct tax Parliament placed on colonists",
    at: 2,
    wrong: [
      [
        "taxed imported sugar and molasses and strengthened enforcement against smuggling in colonial ports",
        "This describes the Sugar Act of 1764.",
      ],
      [
        "closed the port of Boston and limited self-government in Massachusetts after the destruction of tea there",
        "This describes the Coercive Acts of 1774.",
      ],
      [
        "allowed the East India Company to sell tea in the colonies at a lower price than colonial merchants",
        "This describes the Tea Act of 1773.",
      ],
    ],
    why: "The Stamp Act placed a direct tax on printed materials, which led to organized protest throughout the colonies.",
    d: "The Sugar Act choice is close because it was the previous revenue measure, but it taxed imports and not printed materials.",
  },
  {
    id: "q02",
    s: "new-policies",
    sub: "1.B",
    kc: ["KC-3.1.II.A"],
    q: "Parliament passed the Declaratory Act in 1766 at the same time that it repealed the Stamp Act. The Declaratory Act",
    right:
      "claimed that Parliament had the power to make laws for the colonies in all cases whatsoever",
    at: 1,
    wrong: [
      [
        "promised that the colonies would never again be taxed by Parliament without the approval of their assemblies",
        "The act asserted Parliament's authority and made no such promise.",
      ],
      [
        "declared the colonies independent of Parliament in matters of trade and left taxes to the colonial assemblies",
        "The act asserted Parliament's authority over the colonies.",
      ],
      [
        "ended the Navigation Acts so that colonial merchants could trade freely with France and Spain",
        "The Declaratory Act did not end the Navigation Acts.",
      ],
    ],
    why: "By repealing the tax but asserting its authority, Parliament made clear that it would not give up its claim to govern the colonies.",
    d: "The promise choice is close because repeal looked like a concession, but Parliament insisted on its power.",
  },
  {
    id: "q03",
    s: "new-policies",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.1.II.A"],
    q: "Which of the following best explains why Parliament repealed the Stamp Act in 1766?",
    right:
      "Colonial protests, including boycotts, hurt British merchants and showed widespread resistance",
    at: 0,
    wrong: [
      [
        "French and Spanish officials threatened to attack British colonies unless the tax was ended",
        "Foreign powers did not force the repeal.",
      ],
      [
        "The act had raised so much money that Parliament no longer needed to collect the tax",
        "The tax was difficult to collect and raised little money because of the protests.",
      ],
      [
        "The Stamp Act Congress voted to leave the empire, and Parliament repealed the act to win it back",
        "The Stamp Act Congress petitioned Parliament and did not vote to leave the empire.",
      ],
    ],
    why: "Boycotts and protests cost British merchants business and showed that the tax could not be enforced.",
    d: "The raised-money choice reverses the situation, because the tax was widely resisted and hard to collect.",
  },
  {
    id: "q04",
    s: "arguments-for-resistance",
    sub: "1.B",
    kc: ["KC-3.1.II.B"],
    q: "The colonial slogan “no taxation without representation” expressed the belief that",
    right:
      "colonists should be taxed only by representatives they had chosen, such as those in their own assemblies",
    at: 3,
    wrong: [
      [
        "colonists should refuse to pay any taxes to any government unless the money was spent in their own town",
        "Colonists accepted taxes by their own assemblies and did not reject all government.",
      ],
      [
        "colonists should elect members of Parliament who would then represent them in London",
        "Most colonists did not ask for seats in Parliament.",
      ],
      [
        "only property owners should pay taxes because they had the most interest in the colonial government",
        "The slogan concerned who had the right to tax, not who should pay.",
      ],
    ],
    why: "Colonists argued that as British subjects they could be taxed only with the consent of their representatives, and they pointed to their assemblies.",
    d: "The Parliament-seats choice is close because the slogan mentions representation, but most colonists wanted their own assemblies to tax them.",
  },
  {
    id: "q05",
    s: "arguments-for-resistance",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-3.1.II.B"],
    q: "Which of the following was a difference between the British and colonial views on representation in the 1760s?",
    right:
      "Britain argued that Parliament represented all British subjects, while colonists said only their assemblies could tax them",
    at: 2,
    wrong: [
      [
        "Britain argued that colonial assemblies alone should tax the colonies, while colonists argued for taxes by Parliament",
        "This reverses the two positions.",
      ],
      [
        "Britain argued that representation required a vote for every adult, while colonists argued for property requirements",
        "Neither side based its argument on universal adult suffrage.",
      ],
      [
        "Britain argued that representation was unnecessary in the empire, while colonists argued for a king chosen by the colonies",
        "British officials claimed that Parliament did represent the colonists, and colonists did not seek a colonial king.",
      ],
    ],
    why: "British officials relied on the idea of virtual representation, and many colonists rejected it, pointing to their own assemblies.",
    d: "The reversed-positions choice is close because both sides used the word representation, but it swaps who held each view.",
  },
  {
    id: "q06",
    s: "new-policies",
    sub: "1.A",
    kc: ["KC-3.1.II.A"],
    q: "The Coercive Acts of 1774 were passed in response to which of the following?",
    right: "The destruction of tea in Boston Harbor by colonists protesting the Tea Act",
    at: 1,
    wrong: [
      [
        "The Boston Massacre, in which British soldiers killed five colonists in a crowd in 1770",
        "The massacre occurred four years earlier, and the Coercive Acts were a response to the Tea Party.",
      ],
      [
        "The refusal of colonial merchants to pay duties under the Townshend Acts in the years after 1767",
        "The Townshend duties were mostly repealed in 1770.",
      ],
      [
        "The meeting of the First Continental Congress, which called for a boycott of British goods",
        "The Congress met after the Coercive Acts.",
      ],
    ],
    why: "Parliament punished Massachusetts by closing the port of Boston and limiting its self-government, and the colonies called these measures the Intolerable Acts.",
    d: "The Boston Massacre choice is close because it was also a Boston crisis, but the Coercive Acts followed the Tea Party.",
  },
  {
    id: "q07",
    s: "popular-movements",
    sub: "1.B",
    kc: ["KC-3.1.II.C"],
    q: "Which of the following describes how women contributed to the colonial resistance to British policies?",
    right:
      "Women formed groups that spun cloth at home and gave up British tea in support of boycotts",
    at: 0,
    wrong: [
      [
        "Women served in the House of Burgesses and voted on the boycott resolutions that colonial assemblies passed",
        "Women could not hold seats in colonial assemblies.",
      ],
      [
        "Women wrote the petitions sent to Parliament and signed them as official representatives of the colonies",
        "Colonial assemblies and congresses sent official petitions.",
      ],
      [
        "Women commanded militia units in towns near Boston and led the Sons of Liberty in port cities",
        "Women did not command militia units or lead the Sons of Liberty.",
      ],
    ],
    why: "Women supported the boycotts by making cloth at home and giving up imported goods, and they ran farms and shops.",
    d: "The petition choice is close because women took part in the cause, but they did not sign official petitions as representatives.",
  },
  {
    id: "q08",
    s: "popular-movements",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.1.II.D"],
    q: "Which of the following best explains how many colonists responded to economic shortages and the British military occupation of some regions?",
    right:
      "Men and women mobilized in large numbers to give financial and material support to the Patriot cause",
    at: 2,
    wrong: [
      [
        "Most colonists left the cities for the frontier and refused to take part in the conflict",
        "Many colonists stayed and supported the movement.",
      ],
      [
        "Colonial leaders ended the boycotts and asked Parliament to station more soldiers in the port cities",
        "Leaders continued the boycotts and resisted British troops.",
      ],
      [
        "Wealthy merchants took over the colonial governments and sold supplies only to the British army",
        "Many merchants supported the Patriot cause.",
      ],
    ],
    why: "The hardships strengthened the movement because people gave money, supplies, and labor to the Patriot cause.",
    d: "The frontier choice is close because some colonists did move west, but the movement drew broad support.",
  },
  {
    id: "t01",
    s: "arguments-for-resistance",
    sub: "2.A",
    kc: ["KC-3.1.II.B"],
    q: "Which of the following best describes the historical situation in which the excerpt was written?",
    right:
      "Colonial representatives were explaining their break with Britain after years of disputes over taxes and authority",
    at: 3,
    wrong: [
      [
        "Colonial merchants were responding to the Sugar Act and preparing to petition Parliament for its repeal",
        "The Sugar Act was passed in 1764, and the excerpt is from the Declaration of Independence of 1776.",
      ],
      [
        "British officials were announcing new regulations for the western lands after the Seven Years' War",
        "The excerpt is a complaint against British rule, not an announcement from British officials.",
      ],
      [
        "Delegates to the Constitutional Convention were debating how to divide power between the states and the national government",
        "The Constitutional Convention met in 1787, after the Declaration was adopted.",
      ],
    ],
    why: "The Declaration of Independence was adopted by the Second Continental Congress in 1776, when war with Britain was already under way.",
    d: "The Sugar Act choice is close because it also concerned colonial grievances, but the excerpt was written twelve years later, when the colonies were declaring independence.",
    stim: excerpts.declarationGrievances,
  },
  {
    id: "t02",
    s: "arguments-for-resistance",
    sub: "3.A",
    kc: ["KC-3.1.II.B"],
    q: "Which of the following best states the main claim of the excerpt?",
    right:
      "The Crown and Parliament had violated the colonists' rights through taxes, troops, and the denial of jury trials",
    at: 1,
    wrong: [
      [
        "The colonists could no longer trade with Britain until Parliament repealed the Navigation Acts",
        "The excerpt lists grievances, including cutting off trade, but it does not demand the repeal of the Navigation Acts.",
      ],
      [
        "The colonial assemblies should have the same powers as Parliament throughout the British Empire",
        "The excerpt does not call for equal powers for the assemblies.",
      ],
      [
        "The colonists wished to remain loyal to Parliament while objecting only to the presence of the army",
        "The excerpt accuses the king and Parliament of many acts, not only of stationing an army.",
      ],
    ],
    why: "The excerpt accuses the king and Parliament of imposing a foreign jurisdiction, taxing without consent, quartering troops, and denying jury trial.",
    d: "The army choice is close because quartering troops is one of the grievances, but the excerpt lists several others.",
    stim: excerpts.declarationGrievances,
  },
  {
    id: "t03",
    s: "new-policies",
    sub: "4.A",
    kc: ["KC-3.1.II.A"],
    q: "The grievances listed in the excerpt are best understood in the context of which of the following?",
    right:
      "British efforts after 1763 to raise revenue and tighten control, such as the Stamp Act and Coercive Acts",
    at: 0,
    wrong: [
      [
        "The Great Awakening, which led colonists to question religious authority and traditional church membership",
        "The Great Awakening was a religious movement, and it did not produce these grievances.",
      ],
      [
        "The Articles of Confederation, which gave Congress the power to quarter troops in the states in wartime",
        "The Articles came after the Declaration, and the grievances concern British actions.",
      ],
      [
        "The Proclamation of 1763, which allowed colonists to settle west of the Appalachian Mountains",
        "The Proclamation restricted settlement, and it does not explain the grievances in the excerpt.",
      ],
    ],
    why: "The grievances in the excerpt summarize colonial complaints about taxes, troops, trade restrictions, and legal changes after 1763.",
    d: "The Proclamation choice is close because it was also a source of friction, but it restricted settlement and is not the context for these grievances.",
    stim: excerpts.declarationGrievances,
  },
]);

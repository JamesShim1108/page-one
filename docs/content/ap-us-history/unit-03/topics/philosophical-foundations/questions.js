// Original practice questions for Topic 3.4. q-numbered items are topic practice;
// t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("3.4", [
  {
    id: "q01",
    s: "enlightenment-and-religion",
    sub: "1.B",
    kc: ["KC-3.2.I.A"],
    q: "Enlightenment ideas inspired many American political thinkers to emphasize",
    right: "individual talent over hereditary privilege in choosing leaders",
    at: 2,
    wrong: [
      [
        "the authority of kings and nobles as the natural leaders of every well-ordered society",
        "Enlightenment thinkers questioned the claims of hereditary rulers.",
      ],
      [
        "the duty of colonists to obey Parliament in all matters because it represented the empire",
        "Enlightenment ideas supported resistance to unjust authority.",
      ],
      [
        "the importance of limiting education to the families who already held positions in government",
        "Enlightenment ideas favored education and the use of reason by individuals.",
      ],
    ],
    why: "Enlightenment writers argued that people should be judged by their abilities and reason and that government should serve the people.",
    d: "The Parliament choice is close because it sounds like a traditional view of authority, but the Enlightenment encouraged questioning such claims.",
  },
  {
    id: "q02",
    s: "enlightenment-and-religion",
    sub: "1.A",
    kc: ["KC-3.2.I.A"],
    q: "John Locke's writings influenced American colonists by arguing that",
    right:
      "people have natural rights to life, liberty, and property, and governments rest on consent",
    at: 0,
    wrong: [
      [
        "governments should control the economy so that property is shared equally among all of the people",
        "Locke defended individual property rights.",
      ],
      [
        "people owe loyalty to their rulers because rulers receive their authority directly from God",
        "Locke rejected the claim that kings ruled by divine right.",
      ],
      [
        "the best form of government is a powerful monarch who can prevent disorder among the people",
        "Locke argued that government should be limited and based on consent.",
      ],
    ],
    why: "Locke's idea that governments exist to protect natural rights, and that people may resist a government that violates them, was widely read in the colonies.",
    d: "The divine-right choice is close because many Europeans believed it, but Locke argued against it.",
  },
  {
    id: "q03",
    s: "enlightenment-and-religion",
    sub: "1.B",
    kc: ["KC-3.2.I.A"],
    q: "Which of the following best describes how religion contributed to the American Revolution?",
    right:
      "It strengthened Americans' view of themselves as a people blessed with liberty who should defend it",
    at: 1,
    wrong: [
      [
        "It required colonists to obey the Church of England and the king, who was its official head",
        "Many colonists belonged to churches that were not the Church of England.",
      ],
      [
        "It discouraged colonists from taking part in politics because religion focused only on the afterlife",
        "Many ministers encouraged political action and the defense of liberty.",
      ],
      [
        "It united the colonies under a single church that organized resistance to British taxes on its own",
        "The colonies had many different churches, and no single church organized resistance.",
      ],
    ],
    why: "Many ministers preached that Americans were blessed with liberty, and religious dissent had taught colonists to question authority.",
    d: "The Church of England choice is close because it was the established church in some colonies, but many colonists belonged to other churches.",
  },
  {
    id: "q04",
    s: "republicanism-and-natural-rights",
    sub: "1.A",
    kc: ["KC-3.2.I.B"],
    q: "A republican form of government, as Revolutionary leaders understood it, is one in which",
    right:
      "power comes from the people and is exercised through representatives they choose",
    at: 3,
    wrong: [
      [
        "every adult resident votes directly on each law, and no representatives are needed in government",
        "This describes a direct democracy, not the republic that Revolutionary leaders had in mind.",
      ],
      [
        "power is held by a hereditary monarch who consults with a council of the wealthiest families",
        "A republic rejects hereditary rule.",
      ],
      [
        "a single national leader holds all powers and the legislatures advise but cannot make laws",
        "In a republic, elected legislatures make the laws.",
      ],
    ],
    why: "A republic places power in the people and their representatives, rather than in a monarch or a hereditary aristocracy.",
    d: "The direct-democracy choice is close because both rely on the people, but a republic works through representatives.",
  },
  {
    id: "q05",
    s: "republicanism-and-natural-rights",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.I.B"],
    q: "Which of the following best explains why republican ideas made British policies after 1763 seem threatening to many colonists?",
    right:
      "Republican thinkers feared that unchecked power would corrupt liberty, so taxes without consent looked like a threat",
    at: 2,
    wrong: [
      [
        "Republican thinkers argued that taxes should be paid only by those who owned land in the colonies",
        "Republican ideas concerned consent and the danger of unchecked power, not taxes on landowners alone.",
      ],
      [
        "Republican thinkers believed that Parliament should rule the colonies directly in order to protect their liberties",
        "Republican thinkers feared distant concentrated power.",
      ],
      [
        "Republican thinkers argued that colonies should seek the protection of France against British officials",
        "Republican ideas did not call for French protection.",
      ],
    ],
    why: "Colonists who feared that power tends to corrupt liberty saw new taxes and controls as signs of a design against their freedom.",
    d: "The landowner choice is close because property mattered in colonial politics, but the republican concern was power without consent.",
  },
  {
    id: "q06",
    s: "common-sense-and-the-declaration",
    sub: "1.A",
    kc: ["KC-3.2.I.B"],
    q: "Thomas Paine's Common Sense was significant because it",
    right:
      "attacked monarchy and hereditary rule and argued for American independence in plain language",
    at: 0,
    wrong: [
      [
        "urged colonists to remain loyal to the king and to seek peace through a petition to Parliament",
        "Paine argued against reconciliation with Britain.",
      ],
      [
        "proposed a plan of government for the new nation with three branches and a bill of rights",
        "Common Sense argued for independence, and it did not propose a constitution.",
      ],
      [
        "described the economic costs of the Navigation Acts for colonial merchants in the port cities",
        "The pamphlet was a political argument for independence.",
      ],
    ],
    why: "Paine's pamphlet, published in January 1776, was widely read and helped turn many colonists toward independence.",
    d: "The petition choice is close because many colonists still hoped for reconciliation, but Paine argued against it.",
  },
  {
    id: "q07",
    s: "common-sense-and-the-declaration",
    sub: "1.A",
    kc: ["KC-3.2.I.B"],
    q: "The Declaration of Independence argued that",
    right:
      "governments rest on the consent of the governed, and people may abolish a government that violates their rights",
    at: 1,
    wrong: [
      [
        "Parliament had the power to tax the colonies as long as it also gave them seats in the House of Commons",
        "The Declaration rejected Parliament's authority over the colonies.",
      ],
      [
        "the colonies should form a national government with the power to tax citizens and to regulate trade among the states and with foreign nations",
        "The Declaration announced independence and did not set up a government.",
      ],
      [
        "the king should be given greater powers over the colonial assemblies in order to keep the peace",
        "The Declaration accused the king of abusing his powers.",
      ],
    ],
    why: "The Declaration stated that people have unalienable rights, that governments rest on consent, and that people may change a government that violates those rights.",
    d: "The national-government choice is close because the nation later needed one, but the Declaration only declared independence.",
  },
  {
    id: "q08",
    s: "common-sense-and-the-declaration",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-3.2.I.B"],
    q: "Which of the following best describes how the Declaration of Independence continued to influence American history after 1776?",
    right:
      "Later reformers cited its language of equality and rights to demand that the nation live up to its ideals",
    at: 3,
    wrong: [
      [
        "Courts used the Declaration as the source of authority for the structure of the three branches of government",
        "The Constitution, not the Declaration, set up the structure of government.",
      ],
      [
        "Congress used the Declaration to justify its power to collect taxes under the Articles of Confederation",
        "The Declaration did not give Congress taxing power.",
      ],
      [
        "Britain used the Declaration as the basis for the peace terms in the Treaty of Paris of 1783",
        "Britain did not accept the Declaration's claims, and the treaty ended the war.",
      ],
    ],
    why: "The Declaration's ideals shaped Americans' understanding of the nation's founding principles and gave reformers language to use.",
    d: "The courts choice is close because the Declaration is a founding document, but the Constitution created the structure of government.",
  },
  {
    id: "t01",
    s: "common-sense-and-the-declaration",
    sub: "2.A",
    kc: ["KC-3.2.I.B"],
    q: "Which of the following best describes the intended audience of the excerpt?",
    right:
      "Ordinary colonists who were deciding whether to continue seeking reconciliation with Britain",
    at: 1,
    wrong: [
      [
        "Members of Parliament who were considering whether to repeal the Coercive Acts of 1774",
        "The pamphlet was written for colonial readers and not for members of Parliament.",
      ],
      [
        "Delegates to the Constitutional Convention who were drafting a plan for the national government",
        "The Convention met in 1787, eleven years after Common Sense was published.",
      ],
      [
        "French officials whose help the colonists needed in order to defeat the British army",
        "The pamphlet was addressed to colonists, not to foreign officials.",
      ],
    ],
    why: "Paine wrote in plain language for ordinary colonists, and his pamphlet argued against reconciliation with Britain.",
    d: "The Parliament choice is close because the excerpt criticizes British rule, but the intended readers were colonists.",
    stim: excerpts.paineDistance,
  },
  {
    id: "t02",
    s: "common-sense-and-the-declaration",
    sub: "3.A",
    kc: ["KC-3.2.I.B"],
    q: "Which of the following best states Paine's argument in the excerpt?",
    right:
      "Britain was too distant to govern the colonies well, and it was absurd for an island to rule a continent",
    at: 0,
    wrong: [
      [
        "Britain was strong enough to conquer the colonies, and so the colonies should seek peace and obey",
        "Paine says that if Britain cannot conquer the colonies, it cannot govern them.",
      ],
      [
        "The colonies were too small to protect themselves and needed to remain under British protection",
        "Paine says small islands need protection, not a continent.",
      ],
      [
        "Petitions to the Crown had been a success and would soon bring needed reforms to colonial government",
        "Paine calls the practice of sending petitions folly and childishness.",
      ],
    ],
    why: "Paine argues that distance and ignorance make British government of the colonies impractical and absurd.",
    d: "The protection choice is close because Paine mentions small islands needing protection, but he uses the point to say a continent should not be ruled by an island.",
    stim: excerpts.paineDistance,
  },
  {
    id: "t03",
    s: "common-sense-and-the-declaration",
    sub: "3.D",
    kc: ["KC-3.2.I.B"],
    q: "Which of the following would best support the argument in the excerpt?",
    right:
      "Colonial petitions to the king often took months to cross the Atlantic and to receive a reply",
    at: 2,
    wrong: [
      [
        "Parliament had granted the colonies seats in the House of Commons in the years before 1776",
        "Parliament had not granted seats to the colonies, and such seats would weaken Paine's argument.",
      ],
      [
        "The colonies had formed a national government under the Articles of Confederation by 1775",
        "The Articles were adopted after 1776, and they do not bear on Paine's argument about distance.",
      ],
      [
        "Most colonial merchants earned higher profits in 1775 than in any previous year of the colonial period",
        "Profits are not related to Paine's point about distance and delay.",
      ],
    ],
    why: "Paine argues that delay and distance make British government impractical, and evidence of slow communication supports this claim.",
    d: "The Commons choice is close because it concerns representation, but it did not happen and would weaken Paine's case.",
    stim: excerpts.paineDistance,
  },
]);

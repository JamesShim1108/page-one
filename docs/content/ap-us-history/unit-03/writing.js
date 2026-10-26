// Writing prompts for Unit 3. Saving and review behavior live in app/writing/.
// These are unit practice prompts (examOnly: false). Mock exams reuse prompts
// flagged examOnly: true, and Unit 3 has none yet.
import { excerpts } from "../excerpts.js";
import { leq, saq } from "../writing-kit.js";

export const writingQuizzes = [
  saq({
    id: "apush-3-saq-01",
    unitNumber: 3,
    number: 1,
    headline: "Common Sense and independence",
    stimulusBlocks: [excerpts.paineDistance],
    sourceIds: ["ced", "paine-1776"],
    learningObjectives: ["3.D", "3.C"],
    keyConcepts: ["KC-3.1.II.B", "KC-3.2.I.B"],
    themes: ["NAT", "PCE"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["NAT", "PCE"],
        prompt:
          "Briefly describe ONE way Paine's argument in the excerpt challenged the traditional relationship between the colonists and Britain.",
        criteria: [
          "Identifies a claim in the excerpt that challenges the colonists' relationship with Britain.",
          "Uses the excerpt to show it, with more than a copied phrase.",
        ],
        model: {
          answer:
            "Paine challenged the idea that the colonists should keep seeking relief from within the British Empire.",
          prove:
            "He calls the practice of carrying a “petition” across the ocean and waiting months for an answer “folly and childishness,” and he says it is absurd to suppose “a continent to be perpetually governed by an island.”",
          explain:
            "By ridiculing petitions and distant rule, Paine encouraged readers to see independence as more reasonable than continued membership in the empire.",
        },
        alternatives:
          "A response can also point to his claim that if Britain cannot conquer the colonies, it cannot govern them, if it explains how this undermines British authority.",
        review: [
          {
            topicId: "apush-3-4",
            sectionId: "common-sense-and-the-declaration",
            label: "Common Sense and the Declaration",
          },
        ],
      },
      {
        id: "b",
        lenses: ["PCE", "WXT"],
        prompt:
          "Briefly explain how ONE specific historical event or development from the period 1763 to 1775 that is not mentioned in the excerpt could be used to support Paine's argument that Britain could not govern the colonies well.",
        criteria: [
          "Names a specific event or development from 1763–1775 that is not in the excerpt.",
          "Explains how it supports the claim that British government of the colonies was unwise or unworkable.",
        ],
        model: {
          answer: "The Stamp Act of 1765 could be used to support Paine's argument.",
          prove:
            "Parliament placed a direct tax on printed materials in the colonies without colonial consent, which led to the Stamp Act Congress, boycotts, and repeal in 1766.",
          explain:
            "This supports Paine because it shows a distant government passing measures that colonists believed violated their rights and that they could not enforce, so British rule produced conflict rather than good government.",
        },
        alternatives:
          "A response can also use the Proclamation of 1763, the Townshend Acts, or the Coercive Acts, if it explains how the policy showed that British rule was poorly suited to the colonies.",
        review: [
          {
            topicId: "apush-3-3",
            sectionId: "new-policies",
            label: "New taxes and controls",
          },
        ],
      },
      {
        id: "c",
        lenses: ["NAT", "PCE"],
        prompt:
          "Briefly explain ONE way Common Sense, or the ideas expressed in it, contributed to the movement for American independence in 1776.",
        criteria: [
          "Names a specific contribution of Common Sense or of the ideas in it.",
          "Explains how it moved colonists toward independence.",
        ],
        model: {
          answer: "Common Sense helped turn colonial opinion toward independence.",
          prove:
            "Paine published the pamphlet in January 1776, attacked monarchy and hereditary rule in plain language that ordinary readers could follow, and was widely read, and in July the Second Continental Congress adopted the Declaration of Independence.",
          explain:
            "By arguing that reconciliation with Britain was foolish and that republican government was better than monarchy, the pamphlet persuaded colonists who still hoped for reconciliation to accept independence.",
        },
        alternatives:
          "A response can also show how Paine's republican ideas reappear in the Declaration of Independence, such as the claim that governments rest on the consent of the governed, if it explains how that helped justify independence.",
        review: [
          {
            topicId: "apush-3-4",
            sectionId: "republicanism-and-natural-rights",
            label: "Republicanism and natural rights",
          },
        ],
      },
    ],
  }),
  saq({
    id: "apush-3-saq-02",
    unitNumber: 3,
    number: 2,
    headline: "Debating the Constitution",
    stimulusBlocks: [excerpts.federalistTen],
    sourceIds: ["ced", "federalist-1787"],
    learningObjectives: ["3.I", "3.H"],
    keyConcepts: ["KC-3.2.II.C.i", "KC-3.2.II.E"],
    themes: ["PCE", "NAT"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["PCE"],
        prompt:
          "Briefly describe ONE way the excerpt reflects the author's position in the debate over ratification of the Constitution.",
        criteria: [
          "Identifies the author's position as support for ratification.",
          "Uses the excerpt to show how the argument supports a stronger national government.",
        ],
        model: {
          answer:
            "The excerpt supports ratification by arguing that a large republic can control the dangers of faction.",
          prove:
            "The author writes, “Extend the sphere, and you take in a greater variety of parties and interests,” which makes it less likely that a majority will share a common motive to violate the rights of others.",
          explain:
            "This answered critics who feared that a large national republic would be dangerous, so it defended the larger government that the Constitution created.",
        },
        alternatives:
          "A response can also note that the author defines faction as a danger to the rights of other citizens, if it explains that the Constitution's structure is presented as a remedy.",
        review: [
          {
            topicId: "apush-3-8",
            sectionId: "federalists-and-anti-federalists",
            label: "Federalists and Anti-Federalists",
          },
        ],
      },
      {
        id: "b",
        lenses: ["PCE", "NAT"],
        prompt:
          "Briefly explain ONE argument that Anti-Federalists made against ratification of the Constitution.",
        criteria: [
          "Names a specific Anti-Federalist argument.",
          "Explains why they believed it was a reason to oppose the Constitution.",
        ],
        model: {
          answer:
            "Anti-Federalists argued that the Constitution lacked a bill of rights to protect individual liberties.",
          prove:
            "Leaders such as Patrick Henry and George Mason pointed out that the Constitution set up a strong national government without listing the rights of individuals that it could not violate.",
          explain:
            "They believed that a powerful government without explicit limits could threaten liberty, just as the British government had, and so they urged the states to reject or amend the Constitution.",
        },
        alternatives:
          "A response can also use the argument that a distant national government would threaten the powers of the states, or that republics work best in small communities, if it explains the concern.",
        review: [
          {
            topicId: "apush-3-8",
            sectionId: "federalists-and-anti-federalists",
            label: "Federalists and Anti-Federalists",
          },
        ],
      },
      {
        id: "c",
        lenses: ["PCE", "NAT"],
        prompt:
          "Briefly explain ONE way the debate over ratification affected the Constitution or the government that followed.",
        criteria: [
          "Names a specific effect of the ratification debate.",
          "Explains how the debate led to that effect.",
        ],
        model: {
          answer:
            "The debate over ratification led to the adoption of the Bill of Rights.",
          prove:
            "Federalists promised to add amendments that listed individual rights and restricted the federal government in order to win ratification, and ten amendments were ratified in 1791.",
          explain:
            "The promise answered the Anti-Federalists' main objection and made ratification possible, and it added explicit protections for individual liberty to the new government.",
        },
        alternatives:
          "A response can also describe how the debate between Federalists and Anti-Federalists foreshadowed the later disagreements over federal power that helped produce political parties, if it explains the connection.",
        review: [
          {
            topicId: "apush-3-8",
            sectionId: "bill-of-rights",
            label: "The Bill of Rights",
          },
        ],
      },
    ],
  }),
  leq({
    id: "apush-3-leq-society",
    unitNumber: 3,
    headline: "How much did the Revolution change society?",
    context:
      "Between 1754 and 1800, American colonists resisted British rule, won independence, and built new governments based on republican ideals.",
    task: "Evaluate the extent to which the American independence movement brought about change in American society in the period 1754 to 1800.",
    focusNote:
      "Your response may focus on any aspect of society, such as slavery, the status of women, political participation, religion, or relations with American Indians.",
    reasoning: "continuity",
    sourceIds: ["ced"],
    topicId: "apush-3-13",
    outlineReview: {
      sectionId: "society-and-ideas",
      label: "Review continuity and change in society",
    },
    essayReview: {
      sectionId: "how-to-reason",
      label: "Review how to reason about continuity and change",
    },
    learningObjectives: ["3.F", "3.P"],
    keyConcepts: ["KC-3.2.I", "KC-3.2.I.C", "KC-3.2.I.D", "KC-3.2.III.C"],
    themes: ["SOC", "PCE", "NAT"],
    examOnly: false,
    modelResponse:
      "In 1754 the British colonies were growing quickly, governed themselves through elected assemblies, and were divided by slavery, gender, and property. After the Seven Years' War, Britain tried to raise revenue and tighten its control, and colonists who valued their rights as British subjects and the ideas of the Enlightenment resisted, which led to war and independence.\n\nThe American independence movement changed American government and ideas more than it changed American society, because it inspired new ideals of liberty and equality but left slavery, the limits on women's political rights, and the loss of Native lands largely in place.\n\nThe Revolution did bring real change. The Declaration of Independence stated that all men are created equal and that governments rest on the consent of the governed, and Americans replaced monarchy with republican governments and written constitutions. These ideals led some Americans to question slavery. Vermont's constitution of 1777 banned slavery, Pennsylvania began gradual emancipation in 1780, and Massachusetts courts ended slavery within the state in the 1780s, while the Northwest Ordinance of 1787 banned slavery in the Northwest Territory. Women also gained a new place in civic life. Because women had boycotted British goods, run farms and shops, and supported the army, the ideal of republican motherhood called on them to teach republican values within the family, and it encouraged the education of girls.\n\nYet the changes were limited and uneven. Slavery did not end but grew in the South. The Constitution of 1787 counted three-fifths of the enslaved population for representation, delayed any ban on the international slave trade until 1808, and required the return of people who escaped slavery, and after Eli Whitney's cotton gin of 1793 made short-staple cotton profitable, planters expanded slavery into the Deep South. Republican motherhood gave women civic importance but not the vote or equal legal rights, and property qualifications kept many men from voting. American Indians also saw little benefit. The Treaty of Paris of 1783 gave the United States land that Native nations claimed without consulting them, and after the Battle of Fallen Timbers in 1794, the Treaty of Greenville of 1795 forced the tribes of the Ohio country to give up much of present-day Ohio.\n\nThe extent of change also varied by region. In the North, where slavery was less central to the economy, states acted on the Revolution's ideals, while in the South, where planters depended on enslaved labor, slaveholders defended slavery more firmly, so the Revolution widened regional differences over slavery. At the same time, the Revolution's language of equality gave later reformers words with which to challenge the limits that it left in place.\n\nIn sum, the independence movement changed the form of government and planted ideals that undermined inequality, but its immediate effects on society were limited because slavery, the exclusion of women from politics, and the dispossession of Native peoples continued.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes the colonies in 1754 and the conflict over British control, which places the Revolution's social effects in context.",
      },
      {
        label: "Thesis",
        text: "The second paragraph makes a defensible claim about the extent of change, that it was greater for government and ideas than for society, and names the reasons.",
      },
      {
        label: "Evidence",
        text: "Vermont's 1777 constitution, Pennsylvania's 1780 act, the Northwest Ordinance, the three-fifths clause, the cotton gin, republican motherhood, and the Treaty of Greenville are specific examples used to support the argument.",
      },
      {
        label: "Analysis and reasoning",
        text: "Each paragraph explains a change and its limits, and the regional paragraph and the conclusion qualify the argument, which supports a complex understanding.",
      },
    ],
    alternateModel:
      "An essay could focus only on slavery and argue that the Revolution changed the North but strengthened slavery in the South, using Vermont, Pennsylvania, and the Northwest Ordinance against the three-fifths clause and the cotton gin. To earn the complexity point it could add a qualification, such as the fact that thousands of enslaved people gained freedom by fleeing to British lines after Lord Dunmore's proclamation, which shows that the war itself created opportunities for freedom.",
    commonErrors: [
      "Describing the causes of the Revolution without evaluating its effects on society.",
      "Claiming that the Revolution changed everything or nothing without explaining which changes mattered and why.",
      'Writing a thesis that only says the Revolution had "some effects" without a claim about their extent.',
      "Using evidence from after 1800, such as the abolitionist movement of the 1830s, or from before 1754, such as the Great Awakening alone.",
    ],
  }),
];

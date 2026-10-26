// Writing prompts for Unit 2. Saving and review behavior live in app/writing/.
// These are unit practice prompts (examOnly: false). Mock exams reuse prompts
// flagged examOnly: true, and Unit 2 has none yet.
import { excerpts } from "../excerpts.js";
import { leq, saq } from "../writing-kit.js";

export const writingQuizzes = [
  saq({
    id: "apush-2-saq-01",
    unitNumber: 2,
    number: 1,
    headline: "Why racial slavery took hold",
    stimulusBlocks: [excerpts.originalSlaveryEconomic, excerpts.originalSlaveryPrejudice],
    sourceIds: ["ced"],
    learningObjectives: ["2.F"],
    keyConcepts: ["KC-2.2.II.A", "KC-2.2.II.B"],
    themes: ["SOC", "WXT"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["SOC", "WXT"],
        prompt:
          "Briefly describe ONE important difference between Interpretation A and Interpretation B of the origins of racial slavery in the English colonies.",
        criteria: [
          "Names what each interpretation emphasizes: planters' demand for labor for A and English prejudice for B.",
          "Describes the difference rather than only naming two topics.",
        ],
        model: {
          answer:
            "Interpretation A argues that planters' need for labor produced racial slavery, while Interpretation B argues that English prejudice toward Africans produced it.",
          prove:
            "A says that as fewer English servants arrived, planters turned to enslaved Africans who could be held for life, and that racial ideas justified the choice afterward. B says colonists already regarded Africans as inferior, so laws made slavery racial because of those beliefs.",
          explain:
            "The difference is whether economic demand or existing prejudice was the main cause of racial slavery.",
        },
        alternatives:
          "A response can also note that A treats racial ideas as a justification that followed slavery, while B treats them as a cause that came before it.",
        review: [
          {
            topicId: "apush-2-6",
            sectionId: "racial-slavery-and-law",
            label: "Chattel slavery and the law",
          },
        ],
      },
      {
        id: "b",
        lenses: ["WXT"],
        prompt:
          "Briefly explain how ONE specific historical event, development, or circumstance from the period 1607–1754 that is not specifically mentioned in the passages could be used to support Interpretation A.",
        criteria: [
          "Names a specific event or circumstance from 1607–1754 that is not in the passages.",
          "Explains how it shows labor demand leading to the use of enslaved Africans.",
        ],
        model: {
          answer:
            "The growth of tobacco and rice production increased planters' demand for a permanent workforce.",
          prove:
            "As tobacco expanded in the Chesapeake and rice and indigo grew in South Carolina, planters bought rising numbers of enslaved Africans, and the plantation systems of the southern Atlantic coast came to depend on them.",
          explain:
            "This supports Interpretation A because it shows planters turning to enslaved labor when their crops required more workers than indentured servants could supply.",
        },
        alternatives:
          "A response can also use the demand for labor on the sugar plantations of the West Indies, where most enslaved Africans were sent, if it connects that demand to the choice of enslaved workers.",
        review: [
          {
            topicId: "apush-2-3",
            sectionId: "tobacco-colonies",
            label: "Tobacco and labor",
          },
        ],
      },
      {
        id: "c",
        lenses: ["SOC", "NAT"],
        prompt:
          "Briefly explain how ONE specific historical event, development, or circumstance from the period 1607–1754 that is not specifically mentioned in the passages could be used to support Interpretation B.",
        criteria: [
          "Names a specific event or circumstance from 1607–1754 that is not in the passages.",
          "Explains how it shows prejudice shaping the treatment of Africans.",
        ],
        model: {
          answer:
            "A 1640 Virginia court case punished an African runaway more harshly than white runaways.",
          prove:
            "After three servants escaped, the court added years to the sentences of the two white servants but sentenced John Punch, an African, to serve for life.",
          explain:
            "The different punishments show that officials treated Africans differently before slavery was widespread, which supports Interpretation B's claim that prejudice shaped slavery.",
        },
        alternatives:
          "A response can also use Virginia's laws banning marriage between English people and Africans, if it explains how they reflect English attitudes about race.",
        review: [
          {
            topicId: "apush-2-6",
            sectionId: "racial-slavery-and-law",
            label: "Chattel slavery and the law",
          },
        ],
      },
    ],
  }),
  saq({
    id: "apush-2-saq-02",
    unitNumber: 2,
    number: 2,
    headline: "War in New England, 1675",
    stimulusBlocks: [excerpts.rowlandsonLancaster],
    sourceIds: ["ced", "rowlandson-1682"],
    learningObjectives: ["2.E"],
    keyConcepts: ["KC-2.1.III.C", "KC-2.1.III.E"],
    themes: ["WOR", "GEO"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["WOR"],
        prompt:
          "Briefly describe ONE way the author's point of view as a colonist shaped how she portrays the attackers in the excerpt.",
        criteria: [
          "Identifies a feature of the excerpt that reflects the author's point of view.",
          "Uses the excerpt to show it, with more than a copied phrase.",
        ],
        model: {
          answer:
            "Rowlandson portrays the attackers as cruel destroyers and shows no interest in their reasons for fighting.",
          prove:
            "She calls them “murderous wretches” who went on “burning, and destroying,” and she describes only what they did to the people of Lancaster.",
          explain:
            "As a colonist who lived through the attack, she saw the war as an assault on her family and community, so her account leaves out the Native perspective.",
        },
        alternatives:
          "A response can also point out that she describes the attack as a personal catastrophe, calling it the “dolefulest day,” if it explains how that shapes her portrayal.",
        review: [
          {
            topicId: "apush-2-5",
            sectionId: "metacoms-war",
            label: "Metacom's War",
          },
        ],
      },
      {
        id: "b",
        lenses: ["GEO", "WOR"],
        prompt:
          "Briefly explain ONE cause of Metacom's War that is not mentioned in the excerpt.",
        criteria: [
          "Names a specific cause of the war that is not in the excerpt.",
          "Explains how it led Native peoples and colonists into war.",
        ],
        model: {
          answer: "English settlements grew and pressed onto Native land.",
          prove:
            "By the 1670s colonists were extending English towns, English law, and pressure to adopt Christianity over Wampanoag and other Native communities.",
          explain:
            "These pressures threatened Native land and independence, so Metacom and other leaders resisted, and fighting spread when the English executed three Wampanoag men in 1675.",
        },
        alternatives:
          "A response can also use English efforts to extend colonial law over Native peoples, or pressure on Native communities to adopt Christianity, if it explains how these led to conflict.",
        review: [
          {
            topicId: "apush-2-5",
            sectionId: "metacoms-war",
            label: "Metacom's War",
          },
        ],
      },
      {
        id: "c",
        lenses: ["WOR", "GEO"],
        prompt:
          "Briefly explain ONE way Metacom's War changed relations between English colonists and American Indians in New England.",
        criteria: [
          "Names a specific result of the war.",
          "Explains how it changed the balance of power or the relationship between the two groups.",
        ],
        model: {
          answer: "The war broke the power of Native nations in southern New England.",
          prove:
            "Metacom was killed in 1676, Native communities lost many people, and many captives were enslaved or sold.",
          explain:
            "With Native nations weakened, English colonists could expand settlement more easily, and Native peoples had less ability to resist.",
        },
        alternatives:
          "A response can also describe the destruction of English towns and the heavy loss of life on both sides, if it explains how this deepened mistrust between colonists and Native peoples.",
        review: [
          {
            topicId: "apush-2-5",
            sectionId: "metacoms-war",
            label: "Metacom's War",
          },
        ],
      },
    ],
  }),
  leq({
    id: "apush-2-leq-regions",
    unitNumber: 2,
    headline: "New England and the Chesapeake",
    context:
      "Between 1607 and 1754, English colonists settled along the Atlantic coast, where different environments, motives, and labor systems produced distinct regions.",
    task: "Compare the ways in which the economies and societies of the New England colonies and the Chesapeake colonies developed in the period 1607 to 1754.",
    focusNote:
      "Your response may focus on any aspect of economy and society, such as labor, religion, population, or government.",
    reasoning: "comparison",
    sourceIds: ["ced"],
    topicId: "apush-2-8",
    outlineReview: {
      sectionId: "comparing-regions",
      label: "Review comparing the regions",
    },
    essayReview: {
      sectionId: "comparison-basics",
      label: "Review how to compare",
    },
    learningObjectives: ["2.C", "2.J"],
    keyConcepts: ["KC-2.1.II.A", "KC-2.1.II.B", "KC-2.1.II.E"],
    themes: ["GEO", "WXT", "SOC"],
    examOnly: false,
    modelResponse:
      "In the early 1600s, England was beginning to challenge Spain in North America, and English migrants left home seeking land, prosperity, and religious freedom. Some settled along Chesapeake Bay, and others sailed to New England, where they met different environments and built different colonies.\n\nThe New England and Chesapeake colonies were alike in governing themselves to an unusual degree and in trading across the Atlantic, but they differed sharply in economy, labor, and society because of their environments and their settlers' motives.\n\nBoth regions built self-governing institutions. Virginia's House of Burgesses first met in 1619, and New England towns held participatory town meetings whose members elected representatives to colonial legislatures. In both, distance from Britain and Britain's initially lax attention left colonists free to manage local affairs, and in both, voting was limited to property-owning men but reached a larger share of colonists than in England. Both regions also depended on Atlantic trade, since each sold products to Europe and bought manufactured goods in return.\n\nTheir economies, however, differed. The Chesapeake's long growing season and fertile soil made tobacco profitable, and once John Rolfe's tobacco found a market in England, planters rushed to claim land and grow a single cash crop for export. New England's rocky soil and short summers did not support such a crop, so colonists built a mixed economy of family farms, fishing, lumber, shipbuilding, and trade.\n\nLabor and population differed for related reasons. Because tobacco needed many workers, Chesapeake planters relied first on indentured servants, who were mostly young men, and then increasingly on enslaved Africans, so the early population had unequal numbers of men and women and high death rates from disease. In New England, many Puritans migrated in families to build religious communities, farmed family-sized plots, and used relatively few enslaved laborers, so the population was healthier and more balanced.\n\nSociety reflected these differences. New England colonists lived in small towns organized around the church and the town meeting, while the Chesapeake's scattered plantations gave power to an elite of planters who dominated local authority and the elected assembly.\n\nIn sum, the two regions shared self-government and Atlantic trade, but environment and settlers' motives led the Chesapeake toward a plantation economy built on servants and then slavery, and New England toward a mixed economy of family farms and commerce.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph places both regions in the context of English rivalry with Spain and the motives of English migrants, which sets up the comparison.",
      },
      {
        label: "Thesis",
        text: "The second paragraph names similarities (self-government and trade) and differences (economy, labor, and society) and previews the reasons, so it establishes a line of reasoning.",
      },
      {
        label: "Evidence",
        text: "The House of Burgesses, town meetings, John Rolfe's tobacco, indentured servants, enslaved Africans, and Puritan family migration are specific examples that support the argument.",
      },
      {
        label: "Analysis and reasoning",
        text: "Each paragraph pairs a similarity or difference with a reason, such as environment or motive, and the conclusion qualifies the comparison, which supports a complex understanding.",
      },
    ],
    alternateModel:
      "An essay could organize the comparison around a single criterion, such as labor, and argue that the regions differed more than they resembled each other, then use tobacco, indentured servitude, and slavery in the Chesapeake against family farms in New England. To earn the complexity point it could add a qualification, such as the fact that New England's port cities also held significant minorities of enslaved people and took part in Atlantic trade.",
    commonErrors: [
      "Describing New England and then the Chesapeake without ever comparing them.",
      "Naming differences without explaining why they existed, such as environment or the motives of the settlers.",
      'Writing a thesis that only says the regions were "similar in some ways and different in others" without a claim about which similarities and differences mattered.',
      "Using evidence from after 1754, such as the Stamp Act, or from outside these regions, such as the Spanish missions in New Mexico.",
    ],
  }),
];

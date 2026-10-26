// Writing prompts for Unit 1. Saving and review behavior live in app/writing/.
// These are unit practice prompts (examOnly: false). Mock exams reuse prompts
// flagged examOnly: true, and Unit 1 has none yet.
import { excerpts } from "../excerpts.js";
import { leq, saq } from "../writing-kit.js";

export const writingQuizzes = [
  saq({
    id: "apush-1-saq-01",
    unitNumber: 1,
    number: 1,
    headline: "Disease and Native allies in the Spanish conquest",
    stimulusBlocks: [excerpts.originalConquestDisease, excerpts.originalConquestAllies],
    sourceIds: ["ced"],
    learningObjectives: ["1.D", "1.F"],
    keyConcepts: ["KC-1.2.II.A", "KC-1.2.III.B"],
    themes: ["WOR", "GEO"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["WOR", "GEO"],
        prompt:
          "Briefly describe ONE important difference between Interpretation A and Interpretation B of the Spanish conquest of the Americas.",
        criteria: [
          "Names what each interpretation emphasizes: disease for A and Native allies for B.",
          "Describes the difference rather than only naming two topics.",
        ],
        model: {
          answer:
            "Interpretation A treats disease as the main reason Spain succeeded, while Interpretation B treats Native allies as the main reason.",
          prove:
            "A says epidemics broke the armies and governments of the Aztec and Inca Empires, while B says Cortés could not have taken Tenochtitlan without thousands of Tlaxcalan and other warriors.",
          explain:
            "The difference is whether conquest came mostly from what happened to Native societies or from choices Native peoples made.",
        },
        alternatives:
          "A response can also note that A treats Native peoples mainly as victims of events, while B treats them as political actors pursuing their own goals.",
        review: [
          {
            topicId: "apush-1-7",
            sectionId: "weighing-causes",
            label: "Weighing causes",
          },
        ],
      },
      {
        id: "b",
        lenses: ["GEO"],
        prompt:
          "Briefly explain how ONE specific historical event, development, or circumstance from the period 1491–1607 that is not specifically mentioned in the passages could be used to support Interpretation A.",
        criteria: [
          "Names a specific event or circumstance from 1491–1607 that is not in the passages.",
          "Explains how it shows disease helping the Spanish conquest.",
        ],
        model: {
          answer:
            "The Inca Empire was already weakened by disease when Francisco Pizarro arrived.",
          prove:
            "Epidemics spread through the Andes in the 1520s, and the emperor Huayna Capac died, which led to a civil war between his sons Huáscar and Atahualpa. Pizarro arrived in 1532 and captured Atahualpa with a few hundred men.",
          explain:
            "Because disease had killed leaders and divided the empire before the Spanish arrived, a small force could take advantage of a state already in crisis, which supports Interpretation A.",
        },
        alternatives:
          "A response can also use the smallpox epidemic that struck Tenochtitlan in 1520, as long as it explains how the loss of life weakened Aztec resistance.",
        review: [
          {
            topicId: "apush-1-4",
            sectionId: "epidemics-and-conquest",
            label: "Epidemics and Spanish conquest",
          },
        ],
      },
      {
        id: "c",
        lenses: ["WOR"],
        prompt:
          "Briefly explain how ONE specific historical event, development, or circumstance from the period 1491–1607 that is not specifically mentioned in the passages could be used to support Interpretation B.",
        criteria: [
          "Names a specific event or circumstance from 1491–1607 that is not in the passages.",
          "Explains how it shows Native peoples acting to shape the conquest.",
        ],
        model: {
          answer:
            "Doña Marina, a Nahua woman, helped Cortés by interpreting and negotiating with Native leaders.",
          prove:
            "She translated between Spanish and Nahuatl and advised Cortés as he met the rulers of Native cities, which helped him form alliances against the Aztecs.",
          explain:
            "Her work shows that Native people took part in the conquest as interpreters and political actors, which supports Interpretation B.",
        },
        alternatives:
          "A response can also describe Native groups in the Andes who aided Pizarro because they resented Inca rule, if it connects their choices to the Spanish success.",
        review: [
          {
            topicId: "apush-1-6",
            sectionId: "diplomacy-and-resistance",
            label: "Diplomacy and resistance",
          },
        ],
      },
    ],
  }),
  saq({
    id: "apush-1-saq-02",
    unitNumber: 1,
    number: 2,
    headline: "English and Native perspectives at Roanoke",
    stimulusBlocks: [excerpts.harriotReligion],
    sourceIds: ["ced", "harriot-1588"],
    learningObjectives: ["1.F"],
    keyConcepts: ["KC-1.2.III.A", "KC-1.2.III.B"],
    themes: ["WOR"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["WOR"],
        prompt:
          "Briefly describe ONE attitude of the English toward Native Americans expressed in the excerpt.",
        criteria: [
          "Identifies an attitude the excerpt actually expresses.",
          "Uses the excerpt to show it, with more than a copied phrase.",
        ],
        model: {
          answer:
            "The English believed their religion and technology were superior to those of the Native peoples.",
          prove:
            "Harriot says Native peoples thought English instruments and guns were the works of gods, and that if they did not know the truth about God, it was rather to be had from the English.",
          explain:
            "He assumed English culture was more advanced and that Native peoples would learn from it.",
        },
        alternatives:
          "A response can also describe Harriot's belief that Native peoples were eager to learn about Christianity, if it points to the excerpt's evidence for that belief.",
        review: [
          {
            topicId: "apush-1-6",
            sectionId: "misunderstandings-and-borrowing",
            label: "Misunderstandings and borrowing",
          },
        ],
      },
      {
        id: "b",
        lenses: ["WOR", "WXT"],
        prompt:
          "Briefly explain ONE way that Europeans and Native Americans borrowed from each other's cultures in the period 1491–1607.",
        criteria: [
          "Names a specific item, practice, or idea that one group took from the other.",
          "Explains how it served the borrower's needs or changed life.",
        ],
        model: {
          answer:
            "Europeans took up Native crops, and Native peoples acquired European tools and weapons.",
          prove:
            "Maize and potatoes from the Americas were grown in Europe, while Native peoples traded for metal tools, cloth, and firearms.",
          explain:
            "Each side adopted goods that served its needs, so contact changed daily life on both sides of the Atlantic.",
        },
        alternatives:
          "A response can also use Native knowledge of local waters and land that colonists relied on, or the livestock Native peoples took from Spanish colonists.",
        review: [
          {
            topicId: "apush-1-6",
            sectionId: "misunderstandings-and-borrowing",
            label: "Misunderstandings and borrowing",
          },
        ],
      },
      {
        id: "c",
        lenses: ["WOR", "PCE"],
        prompt:
          "Briefly explain ONE way Native peoples defended their lands or independence from Europeans in the period 1491–1607.",
        criteria: [
          "Names a specific action by a Native people in 1491–1607.",
          "Explains how it served to defend land, independence, or beliefs.",
        ],
        model: {
          answer:
            "The people of Acoma Pueblo resisted Spanish demands for food and labor.",
          prove:
            "After Juan de Oñate's settlers entered New Mexico in 1598 and demanded supplies, warriors at Acoma killed a group of Spanish soldiers, and the Spanish destroyed the pueblo in January 1599.",
          explain:
            "The attack shows Native peoples fighting to protect their independence, although the Spanish response shows how costly armed resistance could be.",
        },
        alternatives:
          "A response can also use diplomacy, such as the Tlaxcalans allying with Cortés to pursue their own goals against the Aztecs, if it explains how the alliance served their interests.",
        review: [
          {
            topicId: "apush-1-6",
            sectionId: "diplomacy-and-resistance",
            label: "Diplomacy and resistance",
          },
        ],
      },
    ],
  }),
  leq({
    id: "apush-1-leq-change",
    unitNumber: 1,
    headline: "Contact and change in Native societies",
    context:
      "Between 1491 and 1607, contact among Europeans, Native Americans, and Africans brought the Columbian Exchange, new systems of labor, and new conflicts over land and religion.",
    task: "Evaluate the extent to which contact with Europeans changed Native American societies in the period 1491 to 1607.",
    focusNote:
      "Your response may focus on any change(s) or continuity in Native American societies during the period 1491 to 1607.",
    reasoning: "continuity",
    sourceIds: ["ced"],
    topicId: "apush-1-6",
    outlineReview: {
      sectionId: "diplomacy-and-resistance",
      label: "Review diplomacy and resistance",
    },
    essayReview: {
      sectionId: "misunderstandings-and-borrowing",
      label: "Review misunderstandings and borrowing",
    },
    learningObjectives: ["1.D", "1.E", "1.F"],
    keyConcepts: ["KC-1.2.II.A", "KC-1.2.II.B", "KC-1.2.III.B"],
    themes: ["WOR", "GEO", "SOC"],
    examOnly: false,
    modelResponse:
      "Before 1491, Native peoples had built diverse societies, from the maize-farming villages of the Southwest to the mobile hunting groups of the Great Plains and the fishing communities of the Pacific Northwest. European kingdoms seeking wealth, rivals' advantage, and converts then sent expeditions across the Atlantic and set off a long process of contact.\n\nContact with Europeans changed Native societies deeply through disease, forced labor, and religious pressure, but the change was uneven, and in much of North America Native peoples kept their lands, political independence, and many traditions through 1607.\n\nThe greatest change was demographic. Old World diseases such as smallpox spread among peoples with no immunity, and in many regions most of the population died within a few generations. Epidemics also weakened the Aztec and Inca Empires, and small Spanish forces took advantage of societies already in crisis.\n\nWhere Spain ruled, new systems reorganized Native work and rank. Under the encomienda, colonists received labor and tribute from Native villages, and officials adapted the Inca mita to supply workers for the silver mines at Potosí. Spanish officials also ranked people by ancestry in a caste system that placed Native peoples below Spaniards. Missionaries pressed Native peoples to give up their religions, and Spanish leaders such as Las Casas condemned the abuses even as the system continued.\n\nYet change was limited by Native action and by the thinness of European settlement. The Tlaxcalans allied with Cortés to pursue their own goals against the Aztecs, and the people of Acoma Pueblo fought Oñate's demands in 1598 and 1599. At Roanoke in the 1580s, Thomas Harriot found Native leaders who dealt with the English on their own terms. Across the continent, from the Plains to the Northeast, most Native peoples still governed themselves, farmed or hunted as they had before, and decided whether to trade or fight.\n\nIn sum, contact with Europeans transformed Native America most where Spain conquered and where disease struck, but continuity in land, government, and ways of life remained strong across much of the continent through 1607.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes the variety of Native societies before 1491 and the European motives that began contact, which sets up the question of change.",
      },
      {
        label: "Thesis",
        text: "The second paragraph makes a claim about extent (deep but uneven change) and previews disease, labor, and religion, so it establishes a line of reasoning.",
      },
      {
        label: "Evidence",
        text: "Smallpox, the encomienda, the mita, Potosí, Tlaxcalans, Acoma, and Harriot at Roanoke are specific examples that support the argument.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay uses continuity and change to frame the argument and qualifies it by showing where change was greatest and where Native control continued, which supports a complex understanding.",
      },
    ],
    alternateModel:
      "An essay could argue that change was greater than continuity because disease alone remade Native societies everywhere that Europeans reached, and then use the encomienda, Spanish missions, and the Columbian Exchange of horses and livestock as further evidence. To earn the complexity point it would still need to qualify the claim, for example by showing that the Pueblos and the Tlaxcalans shaped the terms of contact.",
    commonErrors: [
      "Describing only what the Spanish did without explaining how Native societies changed or stayed the same.",
      'Writing a thesis that restates the prompt ("Contact changed Native societies in some ways and not in others") without a claim about extent.',
      "Using evidence from after 1607, such as the Pueblo Revolt of 1680 (a Period 2 event) or the Powhatan wars.",
      "Listing examples of change without explaining why they mattered for Native societies.",
    ],
  }),
];

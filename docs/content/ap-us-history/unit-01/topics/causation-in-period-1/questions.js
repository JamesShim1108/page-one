// Original practice questions for Topic 1.7. q-numbered items are topic practice;
// t-numbered items belong to the Unit 1 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("1.7", [
  {
    id: "q01",
    s: "causes-of-voyages",
    sub: "5.B",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.I"],
    q: "Which of the following was a long-term cause of European exploration of the Americas?",
    right:
      "Competition among European monarchies for wealth and power, along with a desire to spread Christianity",
    at: 2,
    wrong: [
      [
        "The Spanish conquest of the Aztec Empire, which showed monarchs that overseas ventures could be profitable",
        "The conquest of the Aztecs came after the first voyages, so it was a result of exploration and not its long-term cause.",
      ],
      [
        "The Protestant Reformation, which divided Europe's Christians and encouraged Catholic monarchs to send explorers",
        "The Reformation began in 1517, after the first voyages, so it cannot be a cause of Columbus's journey.",
      ],
      [
        "The joint-stock company, which pooled the money of many investors to pay for Spanish voyages",
        "Spain's monarchs financed early voyages themselves, and joint-stock companies became important later.",
      ],
    ],
    why: "Rivalry among monarchies, the search for wealth, and religious goals were at work for years before the first voyages across the Atlantic.",
    d: "The conquest of the Aztecs encouraged later ventures, but it followed the first voyages and so was an effect of exploration.",
  },
  {
    id: "q02",
    s: "causes-of-voyages",
    sub: "5.B",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.I.A"],
    q: "Which of the following best explains the relationship between navigation technology and European exploration?",
    right:
      "Better ships and instruments made long ocean voyages possible, but rulers still needed motives to pay for them",
    at: 1,
    wrong: [
      [
        "Better ships and instruments were the main reason monarchs wanted to find new trade routes to Asia",
        "Technology made voyages possible but did not give monarchs their reasons for wanting wealth and power.",
      ],
      [
        "Better ships and instruments removed the need for royal sponsorship because merchants could easily pay for voyages",
        "Voyages remained costly, and monarchs sponsored many of them.",
      ],
      [
        "Better ships and instruments gave Europeans military power over every society they met in the Americas",
        "Spanish victories also depended on allies and disease, and technology did not decide the outcome everywhere.",
      ],
    ],
    why: "Technology was a condition that made long voyages possible, while wealth, competition, and faith explain why monarchs wanted them.",
    d: "Navigation tools enabled the voyages, but they did not supply the motives behind them.",
  },
  {
    id: "q03",
    s: "effects-of-voyages",
    sub: "5.B",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.II.A"],
    q: "Which of the following is an unintended effect of European voyages to the Americas?",
    right:
      "Epidemics spread among Native peoples who had no immunity, which weakened their resistance to conquest",
    at: 0,
    wrong: [
      [
        "Spanish officials imported enslaved Africans to replace Native workers in mines and on plantations",
        "Spanish officials deliberately imported enslaved Africans, so this was an intended decision.",
      ],
      [
        "Spain created the encomienda system to obtain Native labor and tribute for its colonists",
        "The encomienda was a deliberate policy to control Native labor.",
      ],
      [
        "Spanish missionaries founded missions to convert Native peoples to Christianity in New Spain",
        "Missionaries intentionally pursued conversion as a goal.",
      ],
    ],
    why: "Rulers did not plan the epidemics, but widespread disease devastated Native populations and helped the conquest succeed.",
    d: "Importing enslaved Africans was a consequence of earlier developments, but it was a deliberate choice and not an unintended result.",
  },
  {
    id: "q04",
    s: "effects-of-voyages",
    sub: "5.B",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.II"],
    q: "Which of the following sequences best describes a chain of cause and effect in the Spanish empire?",
    right:
      "Epidemics reduced Native populations, labor shortages followed, and Spain imported more enslaved Africans",
    at: 3,
    wrong: [
      [
        "Spain imported more enslaved Africans, labor shortages followed, and epidemics then reduced Native populations",
        "This reverses the order; epidemics and population decline came before the rise in imports.",
      ],
      [
        "Labor shortages ended the encomienda, and Native populations then recovered as the epidemics ended",
        "Native populations did not quickly recover, and the encomienda was not ended by labor shortages.",
      ],
      [
        "Silver mining declined, Spain stopped using forced labor, and Native workers returned to their villages",
        "Silver mining remained central to Spain's economy and used forced labor for a long time.",
      ],
    ],
    why: "Population loss created labor shortages, which led colonists and the Crown to rely more heavily on enslaved Africans.",
    d: "The near miss uses the right events but reverses their order, which changes the causal story.",
  },
  {
    id: "q05",
    s: "effects-of-voyages",
    sub: "5.B",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.II.C"],
    q: "Which of the following was an effect of the growth of transatlantic voyages on West Africa?",
    right:
      "Growing demand for enslaved laborers expanded the coastal trade in captives, partly through some West African partners",
    at: 1,
    wrong: [
      [
        "West African states took control of Atlantic shipping and ended the practice of slavery in their region within a generation",
        "Slavery was not ended, and European traders and shipping companies carried most captives across the Atlantic.",
      ],
      [
        "European armies conquered most of West Africa in the 1500s and forced the people to farm for export",
        "Europeans mainly traded along the coast in this period and did not conquer West Africa.",
      ],
      [
        "Demand for African goods fell, and West African states stopped trading with Europeans after 1500",
        "Trade between West Africa and Europe grew, and included the buying and selling of captives.",
      ],
    ],
    why: "European demand for laborers expanded the trade in captives, and some West African groups partnered with Europeans to supply them.",
    d: "The effect was an expansion of an existing trade through partnerships, and neither a West African takeover of shipping nor a European conquest.",
  },
  {
    id: "q06",
    s: "weighing-causes",
    sub: "5.B",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.II.A"],
    q: "Which of the following would best support the argument that Indigenous allies were a more important cause than disease in the Spanish defeat of the Aztecs?",
    right:
      "Thousands of Tlaxcalan warriors fought alongside a few hundred Spaniards because they opposed Aztec rule",
    at: 2,
    wrong: [
      [
        "Smallpox struck Tenochtitlan in 1520 and killed a large share of the city's people before the final siege began",
        "This is evidence for the importance of disease, not allies.",
      ],
      [
        "Spanish soldiers carried steel swords and rode horses, which the Aztec warriors had never faced",
        "This is evidence for the importance of Spanish weapons, not allies.",
      ],
      [
        "Pizarro conquered the Inca Empire in the 1530s after a civil war that had weakened it",
        "This concerns the Inca, not the Aztecs, and does not show the role of allies.",
      ],
    ],
    why: "Large numbers of Native allies who shared Spain's goal of ending Aztec rule would show that allies, and not disease, tipped the balance.",
    d: "Smallpox is real evidence in the debate, but it supports the opposing argument that disease mattered most.",
  },
  {
    id: "q07",
    s: "effects-of-voyages",
    sub: "5.A",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.I.B", "KC-1.2.II"],
    q: "Which of the following was a long-term effect of the voyages of the 1400s and 1500s?",
    right:
      "Europe, Africa, and the Americas became linked through trade, migration, and forced labor in an Atlantic world",
    at: 3,
    wrong: [
      [
        "Native peoples of North America lost their political independence in every region by the year 1607",
        "Many Native societies in North America remained independent in 1607, so the effect is overstated.",
      ],
      [
        "European economies returned to a feudal system based on land held by lords and worked by peasants",
        "Silver and new business methods helped move Europe toward capitalism, not back to feudalism.",
      ],
      [
        "Spain gained exclusive control of all trade across the Atlantic and shut out the other European powers",
        "England, France, and the Dutch challenged Spain and sent their own ships across the Atlantic.",
      ],
    ],
    why: "Over time the voyages tied three continents together through exchange of goods, people, and forced labor.",
    d: "Spanish power grew greatly, but saying Native peoples had lost independence everywhere by 1607 goes beyond the evidence.",
  },
  {
    id: "q08",
    s: "weighing-causes",
    sub: "4.B",
    lo: "G",
    kc: ["KC-1.2.I.A"],
    q: "A historian argues that rivalry among European monarchies was an important cause of exploration. Which of the following would best support that argument?",
    right:
      "England and France sent their own expeditions across the Atlantic despite the Spanish-Portuguese division of the world",
    at: 1,
    wrong: [
      [
        "Spain's monarchs received a papal decree granting them the right and the duty to spread Christianity in lands to the west",
        "This supports a religious motive, not rivalry among monarchies.",
      ],
      [
        "Potatoes and maize from the Americas led to rapid population growth in many parts of Europe",
        "This is an effect of the voyages, not evidence of rivalry among monarchs.",
      ],
      [
        "Caravels and the compass allowed Portuguese sailors to travel farther down the African coast",
        "This shows technology, not rivalry among monarchs.",
      ],
    ],
    why: "Other states sending expeditions despite the Spanish-Portuguese division shows monarchies competing for overseas claims.",
    d: "The papal decree reflects religion and Spanish claims, but the argument concerns competition among monarchies.",
  },
  {
    id: "t01",
    s: "weighing-causes",
    sub: "3.C",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.II.A"],
    q: "Which of the following best describes a difference between Interpretation A and Interpretation B?",
    right:
      "A stresses disease as the main cause of Spanish success, while B stresses the actions of Native allies",
    at: 1,
    wrong: [
      [
        "A stresses Spanish weapons as the main cause of Spanish success, while B stresses the role of disease",
        "A stresses disease, not weapons, and B stresses allies.",
      ],
      [
        "A argues that conquest happened quickly, while B argues that Native peoples never lost any battles",
        "Neither passage makes these claims; B describes conquest as a long process.",
      ],
      [
        "A focuses on the Inca Empire, while B focuses on events in Europe that led to the voyages",
        "Both passages concern the Spanish conquest in the Americas.",
      ],
    ],
    why: "Interpretation A emphasizes epidemics, and Interpretation B emphasizes Native allies who acted for their own reasons.",
    d: "Weapons appear in neither passage as the main cause, so the near miss misstates both arguments.",
    stim: [excerpts.originalConquestDisease, excerpts.originalConquestAllies],
  },
  {
    id: "t02",
    s: "weighing-causes",
    sub: "3.D",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.III.B"],
    q: "Which of the following could best be used to support Interpretation B?",
    right:
      "The Tlaxcalans joined Cortés against the Aztecs, whose tribute demands they resented",
    at: 3,
    wrong: [
      [
        "A smallpox epidemic struck Tenochtitlan in 1520 and killed many of its people",
        "This would support Interpretation A, which emphasizes disease.",
      ],
      [
        "Spanish horses and steel weapons gave Cortés an advantage in open battle",
        "This supports an argument about Spanish technology, which neither passage stresses.",
      ],
      [
        "Silver mines at Potosí produced great wealth for Spain in the late 1500s",
        "This concerns the results of conquest and not how conquest succeeded.",
      ],
    ],
    why: "The Tlaxcalan alliance shows Native allies pursuing their own goals and helping the Spanish defeat the Aztecs.",
    d: "The 1520 epidemic is strong evidence in the debate, but it supports Interpretation A.",
    stim: [excerpts.originalConquestDisease, excerpts.originalConquestAllies],
  },
  {
    id: "t03",
    s: "weighing-causes",
    sub: "3.C",
    r: "causation",
    lo: "G",
    kc: ["KC-1.2.II.A"],
    q: "Both interpretations would most likely agree with which of the following statements?",
    right:
      "Spanish military strength alone does not fully explain the success of the conquest",
    at: 2,
    wrong: [
      [
        "The conquest succeeded mainly because Spain brought larger armies to the Americas than its rivals did",
        "Both passages say the Spanish forces were small.",
      ],
      [
        "Native peoples in the Americas had no part in the course or outcome of the conquest",
        "Interpretation B stresses Native action, and Interpretation A describes the effects on Native societies.",
      ],
      [
        "The conquest ended quickly once the Aztec capital had fallen in 1521",
        "Interpretation B describes conquest as a long process.",
      ],
    ],
    why: "A points to disease and B to allies, and both describe small Spanish forces that depended on other factors.",
    d: "Both interpretations downplay raw military force, so the claim that Spain won through larger armies conflicts with both.",
    stim: [excerpts.originalConquestDisease, excerpts.originalConquestAllies],
  },
]);

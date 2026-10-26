// Original practice questions for Topic 2.6. q-numbered items are topic practice;
// t-numbered items belong to the Unit 2 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("2.6", [
  {
    id: "q01",
    s: "slave-trade-and-regions",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.2.II.A"],
    q: "Which of the following best explains why the British colonies increasingly turned to enslaved Africans for labor?",
    right:
      "Land was abundant, demand for colonial goods was growing, and fewer indentured servants were available",
    at: 2,
    wrong: [
      [
        "Parliament required each colony to purchase a fixed number of enslaved Africans every year",
        "Parliament did not set purchase quotas for colonies.",
      ],
      [
        "Colonial leaders believed that enslaved Africans were needed to defend the frontier settlements from attack",
        "Enslaved Africans were brought to the colonies to work, and defense was not the main reason.",
      ],
      [
        "Enslaved Africans could be hired for lower wages than the wages that English servants demanded",
        "Enslaved people were bought and held as property, not hired for wages.",
      ],
    ],
    why: "Abundant land and growing demand for colonial goods required more workers, and fewer indentured servants were arriving.",
    d: "The wage choice sounds economic, but enslaved people were not paid wages, so it misdescribes the system.",
  },
  {
    id: "q02",
    s: "slave-trade-and-regions",
    sub: "1.B",
    kc: ["KC-2.2.II.A"],
    q: "Which of the following was true of where enslaved Africans were sent in the Americas?",
    right:
      "The great majority were sent to the West Indies, while the Chesapeake and southern Atlantic coast also held large numbers",
    at: 0,
    wrong: [
      [
        "The great majority were sent to the small farms of New England, where they replaced indentured servants",
        "New England's small farms used relatively few enslaved laborers.",
      ],
      [
        "Most were sent to the wheat farms of the middle colonies, which depended on enslaved labor for most harvests",
        "The middle colonies used enslaved workers, but not as their main labor force.",
      ],
      [
        "Most were sent to Spanish missions in New Mexico, where they replaced the labor of Native villages",
        "The great majority went to plantation regions, especially the West Indies.",
      ],
    ],
    why: "Most enslaved Africans went to the West Indies, and the Chesapeake and southern Atlantic coast had large numbers on plantations.",
    d: "Slavery existed in New England, but small farms there used relatively few enslaved workers.",
  },
  {
    id: "q03",
    s: "slave-trade-and-regions",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.2.II.A"],
    q: "Which of the following was a difference in the extent of slavery between New England and the Chesapeake?",
    right:
      "New England's small farms used relatively few enslaved laborers, while Chesapeake plantations used large numbers",
    at: 3,
    wrong: [
      [
        "Slavery was illegal in New England, while it was legal and widespread throughout the Chesapeake",
        "Slavery was legal in New England, though it was less extensive there.",
      ],
      [
        "New England colonists enslaved far more people than Chesapeake planters did, mainly on rice plantations",
        "Rice was not a New England crop, and the Chesapeake used more enslaved laborers.",
      ],
      [
        "Enslaved people in New England worked on large estates, while Chesapeake planters used none",
        "The Chesapeake's plantations depended on enslaved labor.",
      ],
    ],
    why: "New England's family farms needed few enslaved workers, but the Chesapeake's tobacco plantations used large numbers of them.",
    d: "The illegal-in-New-England choice exaggerates the difference, since slavery existed in every colony to some degree.",
  },
  {
    id: "q04",
    s: "racial-slavery-and-law",
    sub: "1.A",
    kc: ["KC-2.2.II.B"],
    q: "Chattel slavery differed from indentured servitude in that",
    right:
      "enslaved people were legal property held for life, and their status passed to their children",
    at: 1,
    wrong: [
      [
        "enslaved people signed contracts that ended after a set number of years of labor for a planter",
        "Indentured servants signed such contracts, but enslaved people did not.",
      ],
      [
        "enslaved people earned land at the end of their service and became eligible to vote in colonial elections",
        "Enslaved people received no land or political rights when their labor ended.",
      ],
      [
        "enslaved people were paid wages that planters deducted from their earnings to cover the cost of passage",
        "Enslaved people were not paid wages.",
      ],
    ],
    why: "Chattel slavery meant lifelong, hereditary bondage in which people were legal property, unlike a contract for a limited term.",
    d: "The contract choice describes indentured servitude, so it is the near miss that confuses the two systems.",
  },
  {
    id: "q05",
    s: "racial-slavery-and-law",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.2.II.B"],
    q: "Virginia's 1662 law that defined a child's status by the status of the mother most directly",
    right:
      "made slavery hereditary, so the children of enslaved mothers were enslaved for life",
    at: 0,
    wrong: [
      [
        "freed the children of enslaved mothers and white fathers after a set number of years",
        "The law tied a child's status to the mother's status and did not free anyone.",
      ],
      [
        "ended the importation of enslaved Africans into Virginia in order to protect indentured servants",
        "Virginia continued to import enslaved Africans.",
      ],
      [
        "gave enslaved mothers a legal right to keep their children together on the same plantation",
        "The law did not protect enslaved families.",
      ],
    ],
    why: "Under the law, slavery passed from mother to child, so descendants of enslaved women were enslaved in perpetuity.",
    d: "The law concerned mothers, so the near miss that mentions white fathers uses the wrong parent to describe the rule.",
  },
  {
    id: "q06",
    s: "racial-slavery-and-law",
    sub: "4.B",
    kc: ["KC-2.2.II.B"],
    q: "Slave codes in the southern colonies are best understood in the context of which of the following?",
    right:
      "The spread of chattel slavery as the dominant labor system in many southern colonies",
    at: 2,
    wrong: [
      [
        "A decline in the Atlantic slave trade after 1700 that left colonists with fewer enslaved workers",
        "The slave trade expanded in the 1700s.",
      ],
      [
        "Parliament's effort to abolish slavery throughout the British Empire in the late 1600s",
        "Parliament did not try to abolish slavery in this period.",
      ],
      [
        "The Great Awakening of the 1740s, which led many colonists to call for an end to bondage",
        "The first slave codes came decades before the Great Awakening, which did not end slavery.",
      ],
    ],
    why: "As slavery became the main labor system, colonial legislatures wrote codes to control enslaved people and to define slavery in racial terms.",
    d: "The Great Awakening is a real development of the colonial era, but it came after the first slave codes.",
  },
  {
    id: "q07",
    s: "resistance-and-culture",
    sub: "1.A",
    lo: "G",
    kc: ["KC-2.2.II.C"],
    q: "Which of the following is an example of covert resistance to slavery?",
    right:
      "Working slowly, damaging tools, or pretending to be ill in order to slow the work of the plantation",
    at: 3,
    wrong: [
      [
        "An armed revolt against planters, such as the Stono Rebellion in South Carolina in 1739",
        "An armed revolt is overt resistance.",
      ],
      [
        "Seizing weapons and fighting planters' militias in an attempt to reach Spanish territory",
        "Open fighting is overt resistance.",
      ],
      [
        "A coordinated attack on a plantation house by a group of enslaved men and women",
        "A coordinated attack is overt resistance.",
      ],
    ],
    why: "Covert resistance was hidden and everyday, such as slowing work, breaking tools, or feigning illness.",
    d: "The Stono Rebellion is a famous act of resistance, but it was an open, armed revolt.",
  },
  {
    id: "q08",
    s: "resistance-and-culture",
    sub: "5.B",
    r: "causation",
    lo: "G",
    kc: ["KC-2.2.II.C"],
    q: "Which of the following was a result of the Stono Rebellion of 1739?",
    right:
      "South Carolina passed a harsher slave code to tighten control over enslaved people",
    at: 1,
    wrong: [
      [
        "South Carolina ended its importation of enslaved Africans in order to prevent further violence",
        "South Carolina continued to import enslaved people.",
      ],
      [
        "Parliament banned the Atlantic slave trade throughout the British colonies the next year",
        "Parliament did not ban the slave trade until much later.",
      ],
      [
        "Spain closed Florida to all fugitives from the British colonies and returned them to planters",
        "Spanish Florida continued to offer freedom to some fugitives.",
      ],
    ],
    why: "Colonists responded to the revolt with a stricter slave code that restricted movement and gatherings.",
    d: "Spanish Florida was the rebels' destination, but the revolt did not lead Spain to close it to fugitives.",
  },
  {
    id: "t01",
    s: "slave-trade-and-regions",
    sub: "2.A",
    kc: ["KC-2.2.II.A"],
    q: "Which of the following best describes the intended audience of the excerpt?",
    right: "British readers whom the author hoped to persuade to oppose the slave trade",
    at: 2,
    wrong: [
      [
        "Colonial legislators who were drafting slave codes for Virginia and South Carolina",
        "The narrative was published in London for a general reading public.",
      ],
      [
        "African merchants who were deciding whether to sell captives to European ships",
        "The narrative was written in English for readers in Britain.",
      ],
      [
        "Planters who were deciding how many enslaved workers to buy for their plantations",
        "The author describes the cruelty of the trade and not the needs of planters.",
      ],
    ],
    why: "Equiano published his narrative in London during the campaign to end the slave trade, and he describes the trade's cruelty to move his readers.",
    d: "Planters and legislators were part of the system, but the narrative was written to turn readers in Britain against it.",
    stim: excerpts.equianoMiddlePassage,
  },
  {
    id: "t02",
    s: "slave-trade-and-regions",
    sub: "3.A",
    kc: ["KC-2.2.II.A"],
    q: "Which of the following best states the author's account of his arrival on the coast?",
    right:
      "He was terrified by the slave ship and the crew, and he feared that he would be killed",
    at: 0,
    wrong: [
      [
        "He welcomed the ship as a chance to leave Africa for the opportunities of the Americas",
        "He describes astonishment and terror, not welcome.",
      ],
      [
        "He was confident that the crew would treat him as a guest and return him to his home",
        "He believed that the crew would kill him.",
      ],
      [
        "He was calm because other Africans on the ship assured him that he would soon be freed",
        "He describes horror and anguish and fainting on the deck.",
      ],
    ],
    why: "Equiano describes astonishment that turned to terror, a belief that the crew were spirits who would kill him, and fainting from horror.",
    d: "The near misses invent comfort or hope, but the excerpt describes only fear, horror, and despair.",
    stim: excerpts.equianoMiddlePassage,
  },
  {
    id: "t03",
    s: "slave-trade-and-regions",
    sub: "4.A",
    kc: ["KC-2.2.II.A"],
    q: "The experience described in the excerpt was most directly part of which of the following developments?",
    right:
      "The Atlantic slave trade, which brought enslaved laborers to the plantation colonies",
    at: 3,
    wrong: [
      [
        "The Columbian Exchange, which carried crops, animals, and diseases between the hemispheres",
        "The excerpt describes the forced voyage of a captive, not the exchange of crops and diseases.",
      ],
      [
        "The Navigation Acts, which required colonial goods to travel on English or colonial ships",
        "The Navigation Acts regulated shipping and trade and did not involve the capture of people.",
      ],
      [
        "The encomienda system, which gave Spanish colonists the labor of Native villages",
        "The excerpt describes Africans on a ship and not Native villages under the Spanish.",
      ],
    ],
    why: "The excerpt describes a captive's voyage on a slave ship, which was a part of the Atlantic slave trade.",
    d: "The Navigation Acts regulated ships, but they did not govern the capture or transport of enslaved people.",
    stim: excerpts.equianoMiddlePassage,
  },
  {
    id: "t04",
    s: "racial-slavery-and-law",
    sub: "3.C",
    r: "causation",
    kc: ["KC-2.2.II.B"],
    q: "Which of the following best describes the main difference between Interpretation A and Interpretation B?",
    right:
      "A stresses planters' demand for permanent labor, while B stresses English prejudice against Africans",
    at: 0,
    wrong: [
      [
        "A stresses English prejudice against Africans, while B stresses planters' demand for permanent labor",
        "This reverses the two arguments.",
      ],
      [
        "A argues that colonial laws created racial slavery, while B argues that laws played no part in it",
        "Both passages say that colonial laws made slavery racial and hereditary.",
      ],
      [
        "A argues that slavery began in the 1600s, while B argues that it began only in the 1700s",
        "Neither passage gives a different century for the beginning of slavery.",
      ],
    ],
    why: "Interpretation A emphasizes planters' economic need for a permanent workforce, and Interpretation B emphasizes English attitudes toward Africans.",
    d: "The laws choice is tempting because both passages mention laws, but they agree about the laws and differ about their causes.",
    stim: [excerpts.originalSlaveryEconomic, excerpts.originalSlaveryPrejudice],
  },
  {
    id: "t05",
    s: "racial-slavery-and-law",
    sub: "3.D",
    r: "causation",
    kc: ["KC-2.2.II.B"],
    q: "Which of the following could best be used to support Interpretation B?",
    right:
      "In 1640 a Virginia court gave an African runaway lifelong service but gave white runaways added years",
    at: 1,
    wrong: [
      [
        "The number of English servants arriving in the Chesapeake fell sharply in the late 1600s",
        "This supports Interpretation A, which stresses the need for labor.",
      ],
      [
        "Chesapeake planters bought rising numbers of enslaved Africans as tobacco exports expanded",
        "This supports Interpretation A, which links slavery to demand for labor.",
      ],
      [
        "Planters in the West Indies imported large numbers of enslaved Africans to grow sugar",
        "This supports Interpretation A, which stresses economic demand for labor.",
      ],
    ],
    why: "Harsher punishment for an African than for white runaways before slavery was widespread suggests that prejudice shaped treatment early.",
    d: "The labor-supply facts are strong evidence in the debate, but they support Interpretation A.",
    stim: [excerpts.originalSlaveryEconomic, excerpts.originalSlaveryPrejudice],
  },
  {
    id: "t06",
    s: "racial-slavery-and-law",
    sub: "3.C",
    r: "causation",
    kc: ["KC-2.2.II.B"],
    q: "Both interpretations would most likely agree with which of the following statements?",
    right:
      "Colonial laws helped make slavery a racial, hereditary, and lifelong condition",
    at: 1,
    wrong: [
      [
        "Enslaved Africans were the main labor force in the Chesapeake from the founding of Jamestown",
        "Both passages say that servants were used before slavery became common.",
      ],
      [
        "Slavery developed in the English colonies without any involvement from colonial governments",
        "Both passages describe laws passed by colonial legislatures or courts.",
      ],
      [
        "Parliament imposed racial slavery on the colonies over the objections of colonial leaders",
        "Neither passage says that Parliament imposed slavery on the colonies.",
      ],
    ],
    why: "Both passages describe laws that made slavery lifelong, hereditary, and racial, though they disagree about what caused the laws.",
    d: "The Jamestown choice moves the beginning of slavery earlier than either passage does.",
    stim: [excerpts.originalSlaveryEconomic, excerpts.originalSlaveryPrejudice],
  },
]);

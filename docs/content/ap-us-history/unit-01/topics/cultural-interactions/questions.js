// Original practice questions for Topic 1.6. q-numbered items are topic practice;
// t-numbered items belong to the Unit 1 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("1.6", [
  {
    id: "q01",
    s: "misunderstandings-and-borrowing",
    sub: "1.A",
    kc: ["KC-1.2.III.A"],
    q: "Which of the following was a common source of misunderstanding between Europeans and Native Americans in the early years of contact?",
    right:
      "Europeans viewed land as property that individuals could own and sell, while many Native societies recognized shared rights to use it",
    at: 1,
    wrong: [
      [
        "Native societies viewed land as property that individuals could own and sell, while Europeans recognized shared rights to use it",
        "This reverses the two views; Europeans favored individual ownership.",
      ],
      [
        "Europeans and Native Americans both viewed land as shared, but they disagreed about which crops to plant on it",
        "The disagreement concerned ownership and use of land, not which crops to plant.",
      ],
      [
        "Europeans refused to trade with Native peoples because they believed trade would weaken their claims to the land",
        "Europeans eagerly sought trade, and trade was not a reason for misunderstanding in this way.",
      ],
    ],
    why: "Many Europeans assumed land could be bought and owned outright, while many Native peoples saw agreements as sharing use of land, not giving it up forever.",
    d: "The near miss reverses the two views; individual ownership was the European assumption.",
  },
  {
    id: "q02",
    s: "misunderstandings-and-borrowing",
    sub: "1.B",
    kc: ["KC-1.2.III"],
    q: "Many European colonists criticized Native societies in which women did most of the farming because",
    right:
      "European custom treated farming as men's work, so colonists judged Native gender roles as improper",
    at: 0,
    wrong: [
      [
        "European custom barred women from all economic activity, so colonists judged Native women to be too powerful",
        "European women did work, especially in households and on farms; the objection was about who should farm.",
      ],
      [
        "Colonists believed that farming harmed the land, so they preferred that Native women gather wild foods instead",
        "Colonists were farmers themselves and wanted farming to expand.",
      ],
      [
        "Native women's farming produced too little food to feed colonists, who therefore refused to trade for it",
        "Native farming often fed colonists, and Europeans traded for maize.",
      ],
    ],
    why: "In European custom men farmed, so seeing Native women farm while men hunted led many colonists to see Native societies as disordered.",
    d: "European women did work, but the colonists' complaint was that farming belonged to men, not that women should not work.",
  },
  {
    id: "q03",
    s: "misunderstandings-and-borrowing",
    sub: "1.B",
    kc: ["KC-1.2.III.A"],
    q: "Which of the following best illustrates cultural borrowing between Europeans and Native Americans in the early period of contact?",
    right:
      "Europeans adopted Native crops such as maize, and Native peoples acquired metal tools and firearms",
    at: 2,
    wrong: [
      [
        "Native peoples adopted European legal codes, and Europeans adopted Native weapons as their main arms",
        "Europeans kept their own legal codes, and Native peoples did not abandon their own governments.",
      ],
      [
        "Europeans adopted Native languages for government business, and Native peoples adopted European farm crops",
        "Colonies continued to use European languages for government.",
      ],
      [
        "Both groups avoided the other's technology and crops in order to protect their own traditions",
        "Contact involved much borrowing of useful goods, crops, and technology by both sides.",
      ],
    ],
    why: "Both sides adopted things they found useful: Europeans took up Native foods and knowledge, and Native peoples gained metal tools, cloth, and firearms.",
    d: "Borrowing was selective and practical, so claiming complete adoption of laws or languages overstates what happened.",
  },
  {
    id: "q04",
    s: "diplomacy-and-resistance",
    sub: "1.A",
    kc: ["KC-1.2.III.B"],
    q: "Which of the following best describes how Native peoples responded to growing European demands on their land and labor?",
    right:
      "They used both diplomacy, such as alliances and trade, and military resistance to defend their sovereignty",
    at: 3,
    wrong: [
      [
        "They relied only on military resistance and rejected every offer of trade and every alliance with Europeans",
        "Many Native leaders negotiated, traded, and formed alliances, so resistance was not purely military.",
      ],
      [
        "They accepted Spanish rule and Christianity at once, and few defended their lands in any way",
        "Native peoples defended their lands, beliefs, and independence in many ways.",
      ],
      [
        "They moved away from the coasts and had little contact with Europeans for the next century",
        "Native peoples and Europeans were in frequent contact through trade, diplomacy, and conflict.",
      ],
    ],
    why: "Native peoples negotiated, traded, and formed alliances, and they also fought when they judged it necessary.",
    d: "Military resistance did occur, but saying it was the only response ignores the many negotiations and alliances.",
  },
  {
    id: "q05",
    s: "diplomacy-and-resistance",
    sub: "5.A",
    r: "causation",
    kc: ["KC-1.2.III.B"],
    q: "The alliance between the Tlaxcalans and Hernán Cortés illustrates which of the following?",
    right:
      "Some Native peoples allied with Europeans to pursue their own political goals against rivals",
    at: 1,
    wrong: [
      [
        "Native peoples across Mexico united against the Spanish and drove Cortés out of the Aztec capital",
        "Many Native peoples joined or aided the Spanish rather than uniting against them.",
      ],
      [
        "Native peoples accepted Spanish culture and religion completely, and abandoned their own political interests",
        "The Tlaxcalans acted on their own political interests, which included defeating the Aztecs.",
      ],
      [
        "Spanish rulers shared power equally with Native leaders in exchange for military service",
        "The alliance did not lead to equal power sharing; Spain went on to rule Mexico.",
      ],
    ],
    why: "The Tlaxcalans resented Aztec tribute and joined the Spanish to pursue their own interests.",
    d: "Not every Native people opposed Spain, because rivalries among Native states led some to ally with Cortés.",
  },
  {
    id: "q06",
    s: "debate-over-treatment",
    sub: "1.A",
    kc: ["KC-1.2.III.C"],
    q: "Bartolomé de las Casas is best known for",
    right:
      "condemning the brutal treatment of Native peoples under Spanish rule and arguing that they should be protected",
    at: 2,
    wrong: [
      [
        "arguing that Native peoples were naturally inferior and could justly be conquered and forced to work",
        "That was the position of Juan Ginés de Sepúlveda, his opponent in the Valladolid debate.",
      ],
      [
        "leading a Native uprising against Spanish colonists in the Caribbean and demanding independence",
        "Las Casas was a Spanish friar, not a leader of an uprising.",
      ],
      [
        "conquering the Inca Empire and ordering its subjects to accept Christianity and Spanish law",
        "Pizarro, not Las Casas, led the conquest of the Inca Empire.",
      ],
    ],
    why: "Las Casas, a Dominican friar, wrote about the abuse of Native peoples and urged the Crown to protect them.",
    d: "The near miss describes Sepúlveda, who took the opposite side in the debate with Las Casas.",
  },
  {
    id: "q07",
    s: "debate-over-treatment",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-1.2.III.C"],
    q: "Which of the following best describes the difference between the positions of Las Casas and Sepúlveda in the Spanish debate over Native peoples?",
    right:
      "Las Casas defended Native peoples as rational and worthy of protection, while Sepúlveda called them inferior and fit to be ruled",
    at: 3,
    wrong: [
      [
        "Las Casas argued that Native peoples should not be converted to Christianity, while Sepúlveda argued that they should be",
        "Las Casas supported conversion, though by persuasion and not by force.",
      ],
      [
        "Las Casas argued that Spain had no right to any land in the Americas, while Sepúlveda argued that Spain should leave",
        "Neither man argued that Spain should give up the Americas.",
      ],
      [
        "Las Casas argued for enslaving Native peoples to protect them, while Sepúlveda argued for freeing them to farm",
        "Las Casas opposed the abuse of Native workers, and Sepúlveda defended conquest and forced labor.",
      ],
    ],
    why: "Las Casas defended Native peoples as rational human beings, while Sepúlveda called them naturally inferior and defended conquest.",
    d: "Both men supported Christianity, so the difference was in whether force and forced labor could be justified.",
  },
  {
    id: "q08",
    s: "debate-over-treatment",
    sub: "5.B",
    r: "continuity",
    kc: ["KC-1.2.III.C"],
    q: "Over the course of the 1500s, Europeans who defended the subjugation of Africans and Native Americans increasingly relied on arguments that were",
    right:
      "religious, cultural, and racial, claiming that the people they ruled were inferior or in need of conversion",
    at: 0,
    wrong: [
      [
        "legal and economic, claiming that Africans and Native Americans had agreed to serve under signed labor contracts",
        "Enslaved Africans did not sign contracts, and Native peoples were pressed into labor by force.",
      ],
      [
        "scientific, relying on measurements of the human body that Spanish scholars conducted in universities",
        "Racial thought of this period was not based on modern scientific measurements.",
      ],
      [
        "political, claiming that Native and African leaders had asked European monarchs to govern them",
        "Defenders of conquest used religious and cultural claims, not claims that rulers had asked for European rule.",
      ],
    ],
    why: "Defenders of conquest and slavery combined religious, cultural, and racial claims to justify their rule.",
    d: "The near misses describe arguments that were not used; the justifications rested on religion, culture, and race.",
  },
  {
    id: "t01",
    s: "misunderstandings-and-borrowing",
    sub: "2.B",
    lo: "F",
    kc: ["KC-1.2.III.A"],
    q: "Which of the following best explains the likely purpose of Harriot's report?",
    right:
      "To encourage English investment in and settlement of Virginia by describing the land and its people",
    at: 3,
    wrong: [
      [
        "To warn English readers that epidemics made settlement in Virginia too dangerous to attempt",
        'The excerpt describes disease, but a report on a "new found land" by an expedition member was meant to promote settlement.',
      ],
      [
        "To argue that the English should leave Native peoples alone and abandon their plans for colonies",
        "Harriot was a member of an English colonizing expedition and favored settlement.",
      ],
      [
        "To record the religious beliefs of Native peoples for use by scholars in English universities",
        "Harriot wrote about Native peoples to inform and persuade potential investors and settlers.",
      ],
    ],
    why: 'Harriot sailed with an English colonizing expedition, and his report on the "new found land" described its resources and people to encourage investment and settlement.',
    d: "The report does describe disease, but its author and title point to a purpose of promoting colonization and not discouraging it.",
    stim: excerpts.harriotDisease,
  },
  {
    id: "t02",
    s: "misunderstandings-and-borrowing",
    sub: "3.A",
    lo: "F",
    kc: ["KC-1.2.III.A"],
    q: "Which of the following claims about Native peoples does Harriot make in the excerpt?",
    right:
      "Some of them explained the strange sickness as the work of the English and their God",
    at: 0,
    wrong: [
      [
        "They quickly learned to treat the disease and passed their cures on to the English",
        "Harriot says they neither knew what the disease was nor how to cure it.",
      ],
      [
        "They blamed the sickness on rival Native peoples and refused to deal with the English afterward",
        "Harriot says friendly leaders such as Wingina believed the English God had caused it.",
      ],
      [
        "They had suffered the same disease many times before and were not alarmed by its arrival",
        "Harriot says the oldest men reported that nothing like it had happened before.",
      ],
    ],
    why: "Harriot reports that Wingina and others were persuaded that the English God had caused the deaths.",
    d: "The excerpt shows Native peoples reading the sickness through their own beliefs about the newcomers, and not treating or ignoring it.",
    stim: excerpts.harriotDisease,
  },
  {
    id: "t03",
    s: "diplomacy-and-resistance",
    sub: "4.A",
    lo: "F",
    kc: ["KC-1.2.II.A"],
    q: "The events described in the excerpt are best understood in the context of which of the following?",
    right:
      "The spread of Old World diseases to Native peoples who had no immunity after contact with Europeans",
    at: 2,
    wrong: [
      [
        "Rivalry between England and Spain over claims to North America in the late 1500s",
        "This rivalry is part of the context for Roanoke, but it does not explain the sudden deaths in Native towns.",
      ],
      [
        "The Spanish use of the encomienda system to obtain Native labor in the Caribbean and Mexico in the early 1500s",
        "The excerpt concerns English contact with Native peoples, not the Spanish labor system.",
      ],
      [
        "The Treaty of Tordesillas, which divided the lands of the Americas between Spain and Portugal",
        "The treaty did not cause or explain the epidemics Harriot describes.",
      ],
    ],
    why: "Native towns suffered sudden deaths after contact with the English, as with Old World diseases elsewhere in the Americas.",
    d: "Rivalry with Spain helps explain why the English were at Roanoke, but the deaths themselves are explained by disease.",
    stim: excerpts.harriotDisease,
  },
  {
    id: "t04",
    s: "misunderstandings-and-borrowing",
    sub: "3.A",
    lo: "F",
    kc: ["KC-1.2.III.A"],
    q: "Which of the following best states Harriot's claim about the reaction of Native peoples to English instruments and tools?",
    right:
      "They were so impressed that many came to think English religion might be truer than their own",
    at: 1,
    wrong: [
      [
        "They were so frightened that most of them refused to touch the objects or speak with the English",
        "Harriot says many were eager to learn more from the English.",
      ],
      [
        "They quickly learned to build the instruments themselves and no longer relied on the English",
        "Harriot says the objects exceeded their ability to understand how they were made.",
      ],
      [
        "They regarded the objects as worthless and held on firmly to their own beliefs about the gods",
        "Harriot says the objects led many to doubt their own traditions.",
      ],
    ],
    why: "Harriot says Native peoples thought the objects were the works of gods and began to give credit to what the English said about religion.",
    d: "Harriot reports curiosity and doubt, not fear or rejection, as the reaction to English instruments.",
    stim: excerpts.harriotReligion,
  },
  {
    id: "t05",
    s: "misunderstandings-and-borrowing",
    sub: "2.C",
    lo: "F",
    kc: ["KC-1.2.III.A"],
    q: "Which of the following is a limitation of the excerpt as evidence of Native religious beliefs?",
    right:
      "Harriot was an English colonizer hoping to spread Christianity, so he may have overstated Native interest",
    at: 2,
    wrong: [
      [
        "Harriot wrote many years after his visit to Virginia and relied mostly on the memories of other colonists",
        "Harriot published in 1588, soon after his time in Virginia in 1585 and 1586.",
      ],
      [
        "Harriot never met a Native American, and he based his description on stories told in Spain",
        "Harriot lived among Native peoples and learned some of their language.",
      ],
      [
        "Harriot was a Native priest whose English translation was edited by colonial officials",
        "Harriot was an Englishman, as the attribution states.",
      ],
    ],
    why: "Harriot's goals as a colonizer and Christian shaped how he described Native reactions, so his account reflects English hopes.",
    d: "The report is an eyewitness account, but one written by an outsider with a reason to stress Native interest in Christianity.",
    stim: excerpts.harriotReligion,
  },
  {
    id: "t06",
    s: "debate-over-treatment",
    sub: "5.A",
    r: "comparison",
    lo: "F",
    kc: ["KC-1.2.III.C"],
    q: "The attitude toward Native peoples expressed in the excerpt is most similar to which of the following in Spanish America?",
    right:
      "Missionaries' belief that Native peoples should be taught Christianity as part of colonization",
    at: 0,
    wrong: [
      [
        "Colonists' decision to import enslaved Africans to replace Native workers in the mines",
        "The excerpt does not discuss labor, and importing enslaved Africans was an economic decision.",
      ],
      [
        "Sepúlveda's argument that Native peoples were naturally inferior and could justly be conquered",
        "Harriot describes teaching and persuasion, not conquest on the grounds of natural inferiority.",
      ],
      [
        "Las Casas's claim that Spanish colonists had no right to hold any land in the Americas",
        "Las Casas condemned abuse, but he did not argue that Spain should give up its claims.",
      ],
    ],
    why: "Harriot hoped to share Christian teachings with Native peoples, as Spanish missionaries did in their colonies.",
    d: "Both Harriot and Sepúlveda saw Native peoples as inferior in religion, but Harriot's emphasis is on teaching and persuading and not on conquest.",
    stim: excerpts.harriotReligion,
  },
]);

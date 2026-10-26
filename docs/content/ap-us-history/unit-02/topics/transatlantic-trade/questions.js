// Original practice questions for Topic 2.4. q-numbered items are topic practice;
// t-numbered items belong to the Unit 2 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("2.4", [
  {
    id: "q01",
    s: "atlantic-economy",
    sub: "1.A",
    kc: ["KC-2.1.III.A"],
    q: "Which of the following best describes the Atlantic economy that developed in the 1600s and 1700s?",
    right:
      "A web of trade that moved manufactured goods, colonial products, and enslaved people among three continents",
    at: 3,
    wrong: [
      [
        "A single trade route that every ship followed, carrying the same goods from Europe to Africa and then to the Americas",
        "Historians use the triangular trade as a model of connected routes, but many voyages did not follow one fixed route.",
      ],
      [
        "A system in which American Indian nations controlled shipping between Europe and Africa",
        "European merchants and governments controlled Atlantic shipping.",
      ],
      [
        "A trade controlled entirely by the Spanish monarchy and closed to all other empires",
        "British, French, and Dutch merchants all took part in the Atlantic economy.",
      ],
    ],
    why: "Goods and people moved among Europe, Africa, and the Americas in many directions, and colonies exported commodities that Europeans valued.",
    d: "The single-route choice treats the triangular trade as a fixed route, but it describes a web of connected exchanges.",
  },
  {
    id: "q02",
    s: "atlantic-economy",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.III.A"],
    q: "Which of the following best explains why European colonies sought new sources of labor?",
    right:
      "Colonial economies produced commodities that were valued in Europe, and doing so required large workforces",
    at: 0,
    wrong: [
      [
        "European governments banned wage labor in their colonies in order to protect their own workers",
        "Governments did not ban wage labor across their colonies.",
      ],
      [
        "Native populations had grown so large that colonial officials could not govern them without help",
        "Disease and war reduced many Native populations, which added to the demand for labor.",
      ],
      [
        "Colonists wanted to reduce their dependence on manufactured goods imported from Europe",
        "Colonists continued to import manufactured goods from Europe.",
      ],
    ],
    why: "Producing tobacco, sugar, rice, and other exports took many workers, so colonists looked for new sources of labor.",
    d: "Native populations did change, but they shrank rather than grew, which strengthens the demand for workers.",
  },
  {
    id: "q03",
    s: "mercantilism",
    sub: "1.A",
    kc: ["KC-2.2.I.C"],
    q: "Mercantilism is best described as the belief that",
    right:
      "a nation grows stronger by exporting more than it imports and by using colonies to supply raw materials",
    at: 1,
    wrong: [
      [
        "free trade among nations benefits every country equally and requires no government regulation of commerce",
        "Mercantilists favored government regulation of trade.",
      ],
      [
        "colonies should be allowed to govern their own trade so that they can become prosperous",
        "Mercantilism treated colonies as sources of raw materials and markets for the mother country.",
      ],
      [
        "a nation's power depends mainly on the size of its army and its control of inland territory",
        "Mercantilists emphasized wealth from trade, not simply military size.",
      ],
    ],
    why: "Mercantilists believed national wealth came from a favorable balance of trade and colonies that served the mother country.",
    d: "The near miss mentions national power, but mercantilism located power in trade and wealth.",
  },
  {
    id: "q04",
    s: "mercantilism",
    sub: "1.B",
    kc: ["KC-2.2.I.C"],
    q: "The Navigation Acts required that",
    right:
      "colonial trade travel on English or colonial ships and certain goods be sold only within the empire",
    at: 2,
    wrong: [
      [
        "colonists pay Parliament a tax on every imported good in order to fund the Royal Navy",
        "The Navigation Acts regulated shipping and markets, and they did not impose a tax on every import.",
      ],
      [
        "colonial merchants trade only with the Netherlands, which had the lowest prices for manufactured goods",
        "The acts limited trade with the Dutch and other foreign powers.",
      ],
      [
        "all manufactured goods made in the colonies be sold in Britain at prices set by Parliament",
        "The acts did not set prices for colonial manufactures.",
      ],
    ],
    why: "The Navigation Acts kept colonial trade within the English empire by regulating the ships and the markets that colonists could use.",
    d: "The tax choice describes a later controversy, whereas the Navigation Acts regulated where goods traveled.",
  },
  {
    id: "q05",
    s: "mercantilism",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.2.I.C"],
    q: "Which of the following best explains why enforcement of British imperial policies in the colonies was erratic?",
    right:
      "Distance, resistance, and Britain's other concerns made strict enforcement difficult",
    at: 3,
    wrong: [
      [
        "Parliament repealed the Navigation Acts soon after passing them because merchants objected",
        "The Navigation Acts remained in force, though enforcement varied.",
      ],
      [
        "Colonial governors refused every order from the Crown in all of the British colonies",
        "Governors enforced many orders, but the Atlantic distance and local resistance made enforcement uneven.",
      ],
      [
        "British courts ruled that colonists were exempt from laws that regulated trade",
        "Colonists were not legally exempt from the acts.",
      ],
    ],
    why: "The Atlantic was wide, Britain was often busy elsewhere, and colonists and American Indians resisted, so enforcement was uneven.",
    d: "Colonial resistance was real, but it did not mean governors refused all orders or that the acts were repealed.",
  },
  {
    id: "q06",
    s: "native-economies",
    sub: "1.A",
    kc: ["KC-2.1.III.B"],
    q: "Trade with Europeans changed American Indian communities mainly by",
    right:
      "increasing the flow of goods such as metal tools, cloth, and guns and encouraging dependence on European goods",
    at: 0,
    wrong: [
      [
        "ending the hunting of furs and deerskins as Native nations moved to European-style farming",
        "Trade increased the hunting of furs and deerskins.",
      ],
      [
        "requiring Native nations to pay taxes to European monarchs in exchange for protection",
        "Trade did not require Native nations to pay taxes to European monarchs.",
      ],
      [
        "giving every Native nation equal access to European goods and weapons through the fur trade",
        "Access to goods was unequal, which sharpened rivalries among Native nations.",
      ],
    ],
    why: "European goods flowed into Native communities, changing economies, hunting patterns, and the balance among nations.",
    d: "The tax choice describes a colonial relationship, but trade created exchange and dependence without taxation.",
  },
  {
    id: "q07",
    s: "native-economies",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.III.B"],
    q: "Which of the following was a result of the epidemic diseases that spread through contact with Europeans?",
    right:
      "Radical demographic shifts, as some Native communities lost large shares of their populations",
    at: 1,
    wrong: [
      [
        "Rapid recovery, as Native peoples gained immunity and regained their numbers within a generation",
        "Epidemics caused lasting demographic change and populations did not recover so quickly.",
      ],
      [
        "A halt to colonization, because European settlers were the main victims of the diseases",
        "Native peoples suffered most, and colonization continued.",
      ],
      [
        "The end of the fur trade, because Native hunters refused to meet with European traders",
        "Trade continued, and it also spread disease.",
      ],
    ],
    why: "Diseases such as smallpox killed large shares of communities that had no earlier exposure, reshaping Native societies.",
    d: "Immunity develops over time, but the question asks about the immediate and radical effects of epidemics.",
  },
  {
    id: "q08",
    s: "mercantilism",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.2.I.C", "KC-2.1.III.A"],
    q: "Which of the following was a similarity between Britain's economic policies and those of other European empires in the Americas?",
    right:
      "Each expected its colonies to supply raw materials and buy its manufactured goods",
    at: 3,
    wrong: [
      [
        "Each allowed its colonies to trade freely with the colonies of rival empires",
        "European empires generally tried to restrict colonial trade to themselves.",
      ],
      [
        "Each placed colonial governments under the control of locally elected assemblies",
        "Many colonies of other empires were governed by officials sent from Europe.",
      ],
      [
        "Each banned the use of enslaved labor in order to protect the wages of workers at home",
        "Britain and other empires used enslaved labor extensively.",
      ],
    ],
    why: "Mercantilist thinking led European empires to treat colonies as sources of raw materials and markets for finished goods.",
    d: "Britain did allow elected assemblies, but that was not a feature shared by all European empires.",
  },
  {
    id: "t01",
    s: "mercantilism",
    sub: "3.A",
    kc: ["KC-2.2.I.C"],
    q: "Which of the following best states the main idea of the passage?",
    right:
      "Britain tried to make the colonies serve its economy, but colonists often resisted or evaded its control",
    at: 2,
    wrong: [
      [
        "Britain strictly enforced the Navigation Acts, which ended smuggling by colonial merchants",
        "The passage says enforcement was uneven and that many colonists smuggled goods.",
      ],
      [
        "Colonial merchants opposed the Navigation Acts because the laws harmed shipbuilders",
        "The passage says that merchants and shipbuilders gained protected markets.",
      ],
      [
        "Parliament passed the Navigation Acts to give the colonies control over their own trade",
        "The acts were designed to benefit England by regulating colonial trade.",
      ],
    ],
    why: "The passage describes mercantilist laws meant to benefit England, followed by uneven enforcement and resistance.",
    d: "The passage mentions that some colonists benefited, so the shipbuilder near miss reverses the evidence.",
    stim: excerpts.originalMercantilism,
  },
  {
    id: "t02",
    s: "mercantilism",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.2.I.C"],
    q: "According to the passage, which of the following best explains why colonists were able to evade the Navigation Acts?",
    right: "Britain was far away and busy with other problems, so enforcement was uneven",
    at: 0,
    wrong: [
      [
        "Parliament had no authority to pass laws that regulated colonial trade in the 1600s",
        "The passage says that Parliament passed the Navigation Acts.",
      ],
      [
        "The acts exempted valuable products such as tobacco and sugar from any regulation",
        "The passage says these goods had to be shipped only to England or other English colonies.",
      ],
      [
        "Colonial merchants controlled the ships that were supposed to enforce the laws",
        "The passage does not say that colonial merchants controlled enforcement.",
      ],
    ],
    why: "The passage says that distance and Britain's other concerns made enforcement uneven.",
    d: "The tobacco and sugar choice is tempting because those goods mattered, but the passage says they were regulated.",
    stim: excerpts.originalMercantilism,
  },
  {
    id: "t03",
    s: "mercantilism",
    sub: "3.B",
    kc: ["KC-2.2.I.C"],
    q: "Which of the following details from the passage best supports the idea that the Navigation Acts affected some colonists differently from others?",
    right:
      "Merchants gained protected markets, while planters and farmers had fewer places to sell",
    at: 3,
    wrong: [
      [
        "Colonial goods had to travel on English or colonial ships under the Navigation Acts of 1651 and 1660",
        "This describes a rule that applied to all colonial trade.",
      ],
      [
        "Parliament passed a series of Navigation Acts beginning in 1651 and 1660",
        "This gives the dates of the laws and does not show different effects on colonists.",
      ],
      [
        "The Dominion of New England in the 1680s tried to tighten control over the colonies",
        "This shows an effort to enforce control and not different effects on groups.",
      ],
    ],
    why: "The passage says merchants and shipbuilders benefited, while planters and farmers lost markets and paid more for imports.",
    d: "The other details are accurate, but they apply to colonists as a whole, so they do not show different effects.",
    stim: excerpts.originalMercantilism,
  },
]);

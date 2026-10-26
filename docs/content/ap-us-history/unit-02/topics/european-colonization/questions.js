// Original practice questions for Topic 2.2. q-numbered items are topic practice;
// t-numbered items belong to the Unit 2 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("2.2", [
  {
    id: "q01",
    s: "spanish-colonies",
    sub: "1.A",
    kc: ["KC-2.1.I.A"],
    q: "Spanish colonial institutions in the borderlands of North America were designed primarily to",
    right:
      "extract wealth, convert Native peoples to Christianity, and incorporate them into a ranked society",
    at: 1,
    wrong: [
      [
        "establish self-governing towns in which settlers and Native peoples shared political power equally",
        "Spain ruled through royal officials and a ranked society rather than shared power.",
      ],
      [
        "build trading posts that exchanged furs with Native nations without changing their religion",
        "Fur trading posts were the model of the French and Dutch, not the Spanish.",
      ],
      [
        "attract large numbers of Spanish farming families who would settle on land bought from Native peoples",
        "Few Spanish families settled in the borderlands, and land was not bought from Native peoples.",
      ],
    ],
    why: "Spanish institutions subjugated Native peoples, converted them through missions, and incorporated them and Africans into colonial society.",
    d: "Fur trading posts were a French and Dutch pattern, while Spain relied on missions and forced labor.",
  },
  {
    id: "q02",
    s: "french-and-dutch",
    sub: "1.B",
    kc: ["KC-2.1.I.B"],
    q: "French and Dutch colonial efforts in North America were similar in that both",
    right:
      "involved relatively few Europeans and relied on trade alliances with American Indians for furs",
    at: 3,
    wrong: [
      [
        "attracted large numbers of families who farmed land taken from American Indians and built permanent towns",
        "This describes the English colonies rather than the French and Dutch.",
      ],
      [
        "forced American Indians to labor in silver mines under a system of tribute",
        "This describes Spanish colonies.",
      ],
      [
        "banned trade with American Indians in order to protect settlers from conflict",
        "Both colonies depended on trade with Native peoples.",
      ],
    ],
    why: "French and Dutch colonies had few settlers and relied on trade alliances and family ties with American Indians to acquire furs.",
    d: "Large farming settlements were an English pattern, which is why the near miss describes the wrong empire.",
  },
  {
    id: "q03",
    s: "english-colonies",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1.I.C"],
    q: "Which of the following was a difference between English colonization and French colonization in North America?",
    right:
      "English colonies attracted many families who farmed land taken from American Indians, while French colonies relied on trade",
    at: 0,
    wrong: [
      [
        "English colonies relied on fur-trading alliances with American Indians, while French colonies relied on farming families",
        "This reverses the two patterns.",
      ],
      [
        "English colonies were built mainly by missionaries, while French colonies were built mainly by soldiers",
        "Neither colony was built mainly by one group in this way.",
      ],
      [
        "English colonies enslaved Native peoples through the encomienda, while French colonies used wage labor",
        "The encomienda was a Spanish system.",
      ],
    ],
    why: "England sent many families who farmed and took land, while France built small colonies around the fur trade.",
    d: "The near miss swaps the two colonial patterns.",
  },
  {
    id: "q04",
    s: "english-colonies",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.I.C"],
    q: "Which of the following best explains why English colonization led to frequent conflict with American Indians over land?",
    right:
      "English colonists focused on agriculture, took land from Native Americans, and lived apart from them",
    at: 2,
    wrong: [
      [
        "English colonists depended on Native partners for furs and therefore allied with them against Spain",
        "Dependence on trade partners describes the French and Dutch, not English farm colonies.",
      ],
      [
        "English colonists were forbidden by the Crown to trade with American Indians, which led to hostility",
        "English colonists did trade with American Indians, and the Crown did not forbid it.",
      ],
      [
        "English colonists wanted to convert Native peoples to Anglicanism, and Native leaders refused all contact",
        "Conflict arose chiefly from land, and Native peoples did not refuse all contact.",
      ],
    ],
    why: "Farming colonists needed land, took it from Native peoples, and kept apart from them, which produced conflict over land.",
    d: "Trade-based colonies depended on Native partners, but English farming colonies needed Native land.",
  },
  {
    id: "q05",
    s: "french-and-dutch",
    sub: "1.A",
    kc: ["KC-2.1.I.B"],
    q: "The Dutch West India Company is best described as",
    right:
      "a private trading company that ran the Dutch colony of New Netherland and its fur trade",
    at: 3,
    wrong: [
      [
        "a religious order that sent missionaries to convert the Iroquois in the Hudson Valley",
        "The Dutch West India Company was a commercial enterprise, not a religious order.",
      ],
      [
        "a royal army that conquered Native nations throughout New England on behalf of the Dutch crown",
        "It was a trading company and not a royal army.",
      ],
      [
        "a Spanish agency that supplied enslaved labor for plantations in the West Indies",
        "It was a Dutch company, not a Spanish agency.",
      ],
    ],
    why: "The Dutch West India Company, a private company, governed New Netherland and organized its fur trade with Native nations.",
    d: "Religious orders played a major role in New France, but the Dutch colony was organized as a business.",
  },
  {
    id: "q06",
    s: "spanish-colonies",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.I.A"],
    q: "Which of the following best explains why Spain established missions in New Mexico?",
    right:
      "Spanish leaders sought to convert Native peoples and incorporate them into colonial society and labor",
    at: 1,
    wrong: [
      [
        "Spanish leaders sought to protect Native peoples from English colonists who were moving west",
        "Missions were established to convert Native peoples and secure Spanish control, not to protect them from the English.",
      ],
      [
        "Spanish leaders sought to attract French fur traders who would develop the region's economy",
        "Missions were not designed to attract French traders.",
      ],
      [
        "Spanish leaders sought to build farming towns of free settlers who would pay taxes to the Crown",
        "Spain built missions and presidios, and few free settlers farmed in the region.",
      ],
    ],
    why: "Spain used missions to convert Native peoples to Christianity and to bring them into the colonial system.",
    d: "The Spanish did compete with other empires, but the missions served religious conversion and colonial control.",
  },
  {
    id: "q07",
    s: "english-colonies",
    sub: "1.B",
    kc: ["KC-2.1.I.C"],
    q: "Which of the following was the primary role of joint-stock companies in early English colonization?",
    right:
      "They pooled the money of many investors to finance colonial ventures such as Jamestown",
    at: 2,
    wrong: [
      [
        "They provided military protection for colonies against Spanish and French forces",
        "Joint-stock companies raised money; they were not armies.",
      ],
      [
        "They granted Native peoples shares in colonial profits in exchange for the use of their land",
        "Native peoples were not shareholders in these companies.",
      ],
      [
        "They managed colonial governments through elected assemblies in every English colony",
        "Companies financed ventures, and colonial assemblies developed separately.",
      ],
    ],
    why: "Investors pooled money in joint-stock companies, which spread the risk of expensive ventures such as the Virginia Company's Jamestown.",
    d: "Some companies did govern colonies at first, but their main role was financing the venture.",
  },
  {
    id: "q08",
    s: "english-colonies",
    sub: "4.B",
    kc: ["KC-2.1.I.C"],
    q: "Which of the following best explains why England was able to send larger numbers of migrants to North America than France or the Netherlands?",
    right:
      "Economic hardship and religious dissent at home, plus hope for land, pushed many English people to leave",
    at: 3,
    wrong: [
      [
        "The English Crown paid the full cost of every migrant's passage and set aside land for each family in advance",
        "Most migrants paid their own way or came as indentured servants.",
      ],
      [
        "Spain had banned French and Dutch settlers from North America, leaving it open only to the English",
        "Spain did not ban French or Dutch settlement.",
      ],
      [
        "English colonies offered the fur trade, which paid higher profits than the French or Dutch trade",
        "English colonies focused on agriculture rather than fur.",
      ],
    ],
    why: "Many English people sought land, prosperity, and religious freedom, which pushed them toward colonies.",
    d: "The Crown did support colonization, but it did not pay for each migrant.",
  },
  {
    id: "t01",
    s: "spanish-colonies",
    sub: "3.A",
    kc: ["KC-2.1.I"],
    q: "Which of the following conclusions is best supported by the table?",
    right:
      "Empires founded settlements in North America for varied purposes, including defense, trade, and religion",
    at: 2,
    wrong: [
      [
        "Spain established its settlements in North America only after England had founded its first colonies",
        "St. Augustine, founded in 1565, came decades before Jamestown in 1607.",
      ],
      [
        "Settlements founded for the fur trade outnumbered the settlements founded for any other single purpose",
        "The table lists two trading posts and two settlements founded for religion, so trade does not outnumber the others.",
      ],
      [
        "Every English settlement in the table was founded by a group of English colonists seeking religious freedom",
        "Jamestown was founded to make a profit for investors.",
      ],
    ],
    why: "The table lists military, commercial, governmental, missionary, and religious purposes across four empires.",
    d: "Religion explains Plymouth and Boston, but the table shows Jamestown was founded for profit, so the near miss overgeneralizes.",
    stim: excerpts.originalColoniesTable,
  },
  {
    id: "t02",
    s: "french-and-dutch",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1.I.B", "KC-2.1.I.C"],
    q: "Which of the following is a difference between the English settlements founded in 1620 and 1630 and the French and Dutch settlements shown in the table?",
    right:
      "The English settlements were founded as religious communities, while the French and Dutch settlements were founded as trading posts",
    at: 0,
    wrong: [
      [
        "The English settlements were founded as trading posts, while the French and Dutch settlements were founded as religious communities",
        "This reverses the purposes the table lists for each empire.",
      ],
      [
        "The English settlements were founded to spread Catholicism, while the French and Dutch settlements were founded to spread Protestantism",
        "Plymouth and Boston were founded by Separatists and Puritans, who were Protestants, and Quebec and New Amsterdam were trading posts.",
      ],
      [
        "The English settlements were founded to defend Spanish claims, while the French and Dutch settlements were founded for profit",
        "The table lists religious purposes for the 1620 and 1630 English settlements.",
      ],
    ],
    why: "Plymouth and Boston were founded as religious communities, while Quebec and New Amsterdam were trading posts for the fur trade.",
    d: "The reversed statement uses the same two purposes, so you must check which empire the table assigns each one.",
    stim: excerpts.originalColoniesTable,
  },
  {
    id: "t03",
    s: "english-colonies",
    sub: "4.B",
    kc: ["KC-2.1.I.C"],
    q: "The founding of Plymouth in 1620 and Boston in 1630 is best understood in the context of which of the following?",
    right:
      "Religious conflict in England that led dissenters to seek places where they could worship freely",
    at: 3,
    wrong: [
      [
        "Competition with the Dutch for control of the fur trade in the Hudson River valley",
        "The table lists religious purposes for Plymouth and Boston, and the Dutch fur trade was not their cause.",
      ],
      [
        "Spanish missions in New Mexico that threatened English access to the Atlantic coast",
        "Santa Fe was far from New England and did not threaten English access to the coast.",
      ],
      [
        "Parliament's Navigation Acts, which required English dissenters to settle in New England",
        "The Navigation Acts began in 1651 and did not tell anyone where to settle.",
      ],
    ],
    why: "Separatists and Puritans left England because of religious conflict, and they founded Plymouth and Boston as religious communities.",
    d: "The Dutch fur trade appears in the table, but it explains New Amsterdam rather than the English religious settlements.",
    stim: excerpts.originalColoniesTable,
  },
]);

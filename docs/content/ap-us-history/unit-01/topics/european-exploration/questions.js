// Original practice questions for Topic 1.3. q-numbered items are topic practice;
// t-numbered items belong to the Unit 1 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("1.3", [
  {
    id: "q01",
    s: "wealth-and-routes",
    sub: "1.A",
    q: "Which of the following was a primary motive for European monarchs who sponsored voyages to the Americas in the late 1400s and 1500s?",
    right:
      "Gaining new sources of wealth, such as gold and trade goods, and advantages over rival states",
    at: 1,
    wrong: [
      [
        "Escaping religious persecution by founding settlements for dissenting Protestant communities abroad",
        "Dissenters founding settlements for religious freedom were a feature of later English colonization, not of these royal voyages.",
      ],
      [
        "Answering requests from Native American leaders for military alliances against their neighbors",
        "Europeans did not set out in response to Native requests for alliances.",
      ],
      [
        "Expanding farmland for rural populations that had grown too large for European villages to support",
        "Voyages were funded for trade, wealth, and rivalry rather than to settle surplus farmers.",
      ],
    ],
    why: "Monarchs backed voyages to find wealth, such as gold and trade goods, and to gain power over rival states.",
    d: "Religious refuge did motivate some later colonists, but the monarchs who paid for these voyages sought wealth, advantage, and Christian expansion.",
  },
  {
    id: "q02",
    s: "rivalry-among-monarchies",
    sub: "1.B",
    q: "The Treaty of Tordesillas (1494) is best understood as an attempt to",
    right:
      "settle competing Spanish and Portuguese claims to lands that their explorers had newly encountered",
    at: 3,
    wrong: [
      [
        "end religious conflict between Catholic and Protestant states over the control of overseas trade",
        "The Protestant Reformation had not yet begun in 1494.",
      ],
      [
        "set borders between Spanish colonies and the territories of Native American nations in the Caribbean",
        "The treaty was between two European monarchies and did not include Native nations.",
      ],
      [
        "create a joint-stock company that would share the profits of New World trade among several states",
        "Joint-stock companies came later, and the treaty involved only Spain and Portugal.",
      ],
    ],
    why: "Spain and Portugal asked the papacy to settle their overlapping claims, and the treaty divided future discoveries between them.",
    d: "Religion was involved because the pope mediated, but the dispute was over claims between two Catholic monarchies, not Catholic-Protestant conflict.",
  },
  {
    id: "q03",
    s: "spreading-christianity",
    sub: "5.B",
    r: "causation",
    q: "Which of the following developments most directly encouraged the Spanish monarchy to link overseas expansion to the spread of Christianity?",
    right:
      "The Reconquista, which ended in 1492 after centuries of Christian campaigns against Muslim rule in Iberia",
    at: 0,
    wrong: [
      [
        "The Protestant Reformation, which began in 1517 and led Spain to seek converts in distant lands",
        "The Reformation began after Columbus's first voyage, though it later strengthened religious rivalry.",
      ],
      [
        "The encomienda system, which required colonists to convert the Native Americans they employed",
        "The encomienda developed in the Americas after expansion began, so it could not have started the link.",
      ],
      [
        "The English translation of the Bible, which convinced Spanish rulers to support missionary work",
        "The English Bible was a later Protestant development and did not shape Spain's early policy.",
      ],
    ],
    why: "The Reconquista had joined Christian faith and military expansion in Spanish politics, and that habit carried across the Atlantic.",
    d: "The Reformation did deepen religious motives in later decades, but it began in 1517, after Spain's expansion overseas had started.",
  },
  {
    id: "q04",
    s: "wealth-and-routes",
    sub: "1.B",
    q: "Which of the following technological developments most directly helped European sailors make long Atlantic voyages in the 1400s?",
    right:
      "The caravel and navigation tools such as the magnetic compass and the astrolabe",
    at: 2,
    wrong: [
      [
        "The printing press, which allowed pilots to steer by printed charts alone without any other instruments",
        "Printing spread geographic knowledge, but sailors still needed instruments and ships built for ocean sailing.",
      ],
      [
        "Gunpowder cannons, which allowed ships to defend their cargo and enter ports without permission",
        "Cannons helped fight, but they did not make long voyages possible.",
      ],
      [
        "The steam engine, which allowed ships to travel against the wind and across the Atlantic faster",
        "The steam engine was developed centuries later.",
      ],
    ],
    why: "The caravel's sails and the compass and astrolabe let sailors travel farther, find their direction, and return.",
    d: "The printing press did spread maps and geographic ideas, but it could not replace the ships and instruments that made ocean crossings possible.",
  },
  {
    id: "q05",
    s: "spreading-christianity",
    sub: "5.A",
    r: "comparison",
    q: "Which of the following best describes a similarity between Spanish and English motives for expansion in the Americas in the 1500s?",
    right:
      "Both hoped to gain wealth and an advantage over rivals, and both described expansion as a way to spread Christianity",
    at: 3,
    wrong: [
      [
        "Both were Catholic monarchies that sought to convert Native Americans under the authority of the pope",
        "England broke with the Catholic Church in the 1530s and was Protestant by the time it sought colonies.",
      ],
      [
        "Both relied on the encomienda system to obtain labor and tribute from Native Americans",
        "The encomienda was a Spanish institution; England had no equivalent system.",
      ],
      [
        "Both sent expeditions mainly to find a refuge for religious dissenters from their own countries",
        "Early expeditions sought wealth and power; dissenter refuge became a motive for some later colonies.",
      ],
    ],
    why: "Spain and England both pursued wealth and rivalry and justified expansion as spreading Christianity, though they practiced different branches of the faith.",
    d: "Both were Christian kingdoms, but they were not the same church: Spain was Catholic and England was Protestant.",
  },
  {
    id: "q06",
    s: "spreading-christianity",
    sub: "3.D",
    q: "A historian argues that European expansion across the Atlantic combined the pursuit of profit with religious purpose. Which of the following would best support that claim?",
    right:
      "Monarchs funded voyages to reach gold and trade goods while also sending priests to convert Native peoples",
    at: 0,
    wrong: [
      [
        "Monarchs funded voyages only after missionaries promised to pay for all the costs through donations",
        "Monarchs, not missionaries, paid for these voyages.",
      ],
      [
        "Explorers kept their travels secret from the Church so that they could keep all of the profit",
        "Church involvement, including papal decrees, is evidence of religious purpose.",
      ],
      [
        "European states competed for colonies but took no interest in the beliefs of the peoples they met",
        "Missionary activity shows that states did care about Native beliefs.",
      ],
    ],
    why: "Funding for both wealth and missions shows that the same expansion served economic and religious goals.",
    d: "The near miss links missions to money, but it reverses who paid; the claim needs evidence of rulers pursuing both goals at once.",
  },
  {
    id: "q07",
    s: "wealth-and-routes",
    sub: "4.A",
    q: "Which of the following developments in the 1400s provides the best historical context for Spain's decision to fund Columbus's voyage in 1492?",
    right:
      "Portuguese voyages along the African coast, which showed the profits that Atlantic trade could bring",
    at: 1,
    wrong: [
      [
        "The Aztec ruler's request for Spanish help against rival cities, which first drew Spain to the Americas",
        "Spain had no contact with the Aztecs until Cortés arrived in 1519.",
      ],
      [
        "The founding of English colonies in North America, which forced Spain to compete for land there",
        "English colonies were founded more than a century later.",
      ],
      [
        "The Columbian Exchange, which created demand for American crops across the Spanish kingdoms",
        "The Columbian Exchange began after Columbus's voyage and cannot be its cause.",
      ],
    ],
    why: "Portugal's gains from African trade raised the stakes for Spain and made a rival route across the Atlantic attractive.",
    d: "Every choice names a development tied to the Americas, but only Portugal's voyages came before 1492.",
  },
  {
    id: "q08",
    s: "rivalry-among-monarchies",
    sub: "5.B",
    r: "causation",
    q: "Which of the following best describes how rivalry among European monarchies shaped exploration in the 1500s?",
    right:
      "Each state sponsored explorers who claimed land to gain wealth and keep rivals from controlling it",
    at: 2,
    wrong: [
      [
        "Competition ended when the pope gave the Americas to Spain and rival states accepted the decision",
        "France and England did not accept papal grants to Spain and sent their own expeditions.",
      ],
      [
        "European monarchies agreed to share the Americas and avoid conflict by trading only through one company",
        "Rivalry continued; the states did not agree to share the Americas.",
      ],
      [
        "Only Spain and Portugal were interested in the Americas until the English founded Jamestown in 1607",
        "France and England sponsored voyages, such as Cabot's and Verrazzano's, long before 1607.",
      ],
    ],
    why: "Spain, Portugal, France, and England all sponsored voyages, hoping to claim territory and wealth before their rivals did.",
    d: "The pope did issue decrees that favored Spain, but other kingdoms did not accept them and continued to send explorers.",
  },
  {
    id: "t01",
    s: "wealth-and-routes",
    sub: "3.A",
    lo: "C",
    kc: ["KC-1.2.I.A"],
    q: "Which of the following conclusions is best supported by the table?",
    right:
      "Several European kingdoms sponsored voyages of exploration in the late 1400s and early 1500s",
    at: 3,
    wrong: [
      [
        "Spain sponsored more voyages of exploration than any other European kingdom shown in the table",
        "The table lists one Spanish voyage, fewer than Portugal and France, which have two each.",
      ],
      [
        "Every voyage shown in the table reached the Americas, which showed that Europeans valued the New World",
        "The voyages of Dias and da Gama reached Africa and India.",
      ],
      [
        "France began sponsoring voyages before Portugal and England, which gave France the earliest claims",
        "The table shows Portuguese voyages in 1488 and 1498, before the first French voyage in 1524.",
      ],
    ],
    why: "The table lists voyages sponsored by Portugal, Spain, England, and France between 1488 and 1534.",
    d: "The near miss misreads the table, which shows Spain with a single voyage.",
    stim: excerpts.originalVoyagesTable,
  },
  {
    id: "t02",
    s: "rivalry-among-monarchies",
    sub: "5.B",
    r: "causation",
    lo: "C",
    kc: ["KC-1.2.I.A"],
    q: "Which of the following best explains why England and France sponsored voyages such as those shown in the table?",
    right:
      "Their monarchs sought new wealth and wanted to compete with Spain and Portugal for overseas claims",
    at: 1,
    wrong: [
      [
        "Their monarchs held lands in North America granted by the Treaty of Tordesillas and wanted to explore them",
        "The Treaty of Tordesillas divided claims between Spain and Portugal and gave nothing to England or France.",
      ],
      [
        "Their monarchs hoped to protect Native peoples from Spanish conquest by establishing separate colonies",
        "Protecting Native peoples was not the aim of these early voyages.",
      ],
      [
        "Their monarchs wanted to spread Protestant Christianity, which Spain had banned in the Americas",
        "Cabot sailed in 1497, before the Reformation began in 1517.",
      ],
    ],
    why: "Wealth and rivalry with Spain and Portugal pushed other monarchies to claim territory in the Americas.",
    d: "The treaty drew a line between two Catholic states, so it could not give England or France any land.",
    stim: excerpts.originalVoyagesTable,
  },
  {
    id: "t03",
    s: "wealth-and-routes",
    sub: "1.A",
    lo: "C",
    kc: ["KC-1.2.I.A"],
    q: "Which voyage in the table most directly reflects Portuguese efforts to reach Asian trade by sailing around Africa?",
    right: "Vasco da Gama's 1498 voyage to India",
    at: 2,
    wrong: [
      [
        "Columbus's 1492 voyage to the Caribbean",
        "Columbus sailed west for Spain in the hope of reaching Asia.",
      ],
      [
        "Cabot's 1497 voyage to North America",
        "Cabot sailed for England across the North Atlantic.",
      ],
      [
        "Cartier's 1534 voyage to the Gulf of St. Lawrence",
        "Cartier sailed for France to explore North America.",
      ],
    ],
    why: "Da Gama sailed around Africa to India for Portugal, which reached Asian trade by an eastern route.",
    d: "Columbus also sought Asia, but he sailed west for Spain, not around Africa for Portugal.",
    stim: excerpts.originalVoyagesTable,
  },
]);

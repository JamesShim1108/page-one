// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-2-1-q01",
      topicId: "world-2-1",
      concept: "network-geography",
      difficulty: "Core",
      skill: "developments",
      prompt: "Which description of the Silk Roads after 1200 is most accurate?",
      choices: [
        "Routes controlled by Chinese merchants who carried goods all the way to the Mediterranean",
        "A single paved highway that one empire built and maintained between China and Persia",
        "Linked regional routes on which goods often changed hands at oasis and city markets",
        "A sea route connecting East African ports with markets on the coast of southern China",
      ],
      correctAnswer: 2,
      explanation:
        "Most goods moved in relays. Merchants traded at nodes such as Kashgar and Samarkand instead of crossing the whole network.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Chinese goods traveled far, but few merchants of any background covered the full distance; relay trade through intermediaries was the norm.",
        "No single road or builder existed. The name covers many routes across deserts, mountains, and valleys.",
        "Most goods moved in relays. Merchants traded at nodes such as Kashgar and Samarkand instead of crossing the whole network.",
        "That describes Indian Ocean exchange. The Silk Roads were overland routes across Central Asia.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The key word is relay: the network worked because goods passed through many hands, not because one group traveled the whole way.",
    },
    {
      id: "world-2-1-q02",
      topicId: "world-2-1",
      concept: "trade-growth",
      difficulty: "Core",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which factor most directly increased the volume of Silk Roads trade after 1200?",
      choices: [
        "Strong demand for luxury goods combined with states that protected routes",
        "The decline of oasis cities, which pushed merchants onto longer routes",
        "New laws in Europe requiring merchants to buy silk directly from China",
        "Strong demand for bulk grain that could feed growing Central Asian cities",
      ],
      correctAnswer: 0,
      explanation:
        "Wealthy buyers wanted silk, porcelain, and spices, and protected routes made it practical to supply them.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Wealthy buyers wanted silk, porcelain, and spices, and protected routes made it practical to supply them.",
        "Oasis cities supported trade with water, supplies, and markets. Their growth, not decline, accompanied expansion.",
        "No such European law existed, and Europe was one market among many on these routes.",
        "Demand mattered, but overland transport was too costly for cheap, heavy goods such as grain. Luxury goods justified the cost.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Ask what was worth carrying overland: high-value, low-weight goods.",
    },
    {
      id: "world-2-1-q03",
      topicId: "world-2-1",
      concept: "commercial-practices",
      difficulty: "Core",
      skill: "developments",
      prompt: "How did flying cash and bills of exchange help long-distance merchants?",
      choices: [
        "They guaranteed that caravans would be protected from bandit attacks",
        "They let merchants borrow from imperial treasuries at no interest",
        "They replaced bargaining with fixed prices set by the Yuan government",
        "They let merchants move value without carrying large amounts of coin",
      ],
      correctAnswer: 3,
      explanation:
        "A merchant could deposit value in one place and collect it in another, reducing the risk and weight of carrying coin.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Credit reduced the coin a caravan carried but did nothing to stop attacks on the goods themselves.",
        "These were credit and transfer tools, not interest-free state loans. Merchants still depended on trust and repayment.",
        "Prices still depended on markets and negotiation. These tools changed how payment moved, not how prices were set.",
        "A merchant could deposit value in one place and collect it in another, reducing the risk and weight of carrying coin.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Credit moves payment through space or time. It does not set prices or provide security.",
    },
    {
      id: "world-2-1-q04",
      topicId: "world-2-1",
      concept: "cities-production",
      difficulty: "Core",
      skill: "developments",
      prompt: "Why did cities such as Kashgar and Samarkand grow during this period?",
      choices: [
        "They produced most of the silk that merchants carried westward",
        "They supplied water, lodging, markets, and crafts where routes met",
        "They were capitals of the Song dynasty and drew tribute from Central Asia",
        "They were ports where caravans transferred goods onto oceangoing ships",
      ],
      correctAnswer: 1,
      explanation:
        "These oasis cities were service nodes. Travelers needed water, food, animals, and places to trade.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Silk was produced mainly in China. Central Asian cities grew by serving and trading, not by dominating silk output.",
        "These oasis cities were service nodes. Travelers needed water, food, animals, and places to trade.",
        "Song capitals were in China. Kashgar and Samarkand lay in Central Asia, outside Song rule.",
        "Both cities lie deep inland; their importance came from overland routes, not seaborne trade.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A node grows by serving traffic; producing the goods is a different role.",
    },
    {
      id: "world-2-1-q05",
      topicId: "world-2-1",
      concept: "exchange-limits",
      difficulty: "Apply",
      skill: "developments",
      prompt: "Which good was LEAST likely to travel the full length of the Silk Roads?",
      choices: [
        "Silk, which was valuable, light, and in demand among elites",
        "Grain, which was heavy and cheap compared with its transport cost",
        "Spices, which were valuable in small quantities across many markets",
        "Porcelain, which was heavy and fragile even though it was valuable",
      ],
      correctAnswer: 1,
      explanation:
        "Overland transport was slow and costly, so cheap, bulky goods rarely justified a long journey.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Silk was the classic long-distance good because its value was high for its weight.",
        "Overland transport was slow and costly, so cheap, bulky goods rarely justified a long journey.",
        "Spices packed high value into small loads, which made them worth carrying far.",
        "Porcelain was fragile and heavy, but its high value meant it did travel long distances; much also went by sea.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Compare value to transport cost. The weakest ratio is the least likely long-distance good.",
    },
    {
      id: "world-2-1-q06",
      topicId: "world-2-1",
      concept: "cities-production",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "The passage best supports which claim about Cambaluc?",
      choices: [
        "The city's prosperity came mainly from exporting silk to European markets",
        "The city's merchants were mostly Europeans who controlled trade with the court",
        "The city's government barred foreign merchants from living near the capital",
        "The city drew merchants from distant regions as well as nearby provinces",
      ],
      correctAnswer: 3,
      explanation:
        "The passage describes foreign merchants in the suburbs, lodging for merchants “from different parts of the world,” and goods brought to the court.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "The passage describes silk entering the city to be made into cloth, not leaving for Europe.",
        "Polo names Lombards, Germans, and Frenchmen as an example of separate lodging, not as the main group of merchants.",
        "Foreign merchants lodged in the suburbs just outside the walls, which shows access to the city rather than exclusion.",
        "The passage describes foreign merchants in the suburbs, lodging for merchants “from different parts of the world,” and goods brought to the court.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Stay with what the passage states. European names appear as an example, not as evidence of control.",
      stimulusBlocks: [excerpts.poloCambalucTrade],
    },
    {
      id: "world-2-1-q07",
      topicId: "world-2-1",
      concept: "trade-growth",
      difficulty: "Apply",
      skill: "contextualization",
      prompt: "Which development best explains the scale of trade Polo describes?",
      choices: [
        "Mongol rule linked much of Eurasia and protected major overland routes",
        "Song officials recruited foreign merchants through civil service exams",
        "Ming emperors opened Chinese ports after the Zheng He voyages ended",
        "European crusaders established trading posts in Central Asian cities",
      ],
      correctAnswer: 0,
      explanation:
        "Polo visited Yuan China, when Mongol rule connected regions and protected many routes into the capital.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Polo visited Yuan China, when Mongol rule connected regions and protected many routes into the capital.",
        "The examinations selected Confucian officials, not merchants, and Polo describes the Yuan period, after Song rule in the north ended.",
        "The Ming dynasty began in 1368, after Polo's time, and Zheng He sailed from 1405.",
        "Crusader states were on the eastern Mediterranean coast, not in Central Asia.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Match the source's date and ruler (late 1200s, Kublai Khan) to the right context.",
      stimulusBlocks: [excerpts.poloCambalucTrade],
    },
    {
      id: "world-2-1-q08",
      topicId: "world-2-1",
      concept: "cities-production",
      difficulty: "Challenge",
      skill: "sourcing",
      prompt:
        "Which aspect of Polo's situation most likely shaped how he described Cambaluc?",
      choices: [
        "As a Christian missionary, he focused on the city's churches and converts",
        "As a Chinese scholar, he compared the city with earlier capitals in classical texts",
        "As a merchant writing for Europeans, he stressed wealth they would find striking",
        "As a Yuan official, he was required to report trade figures from imperial records",
      ],
      correctAnswer: 2,
      explanation:
        "Polo was a Venetian merchant whose book was meant to amaze European readers, which helps explain the focus on markets, silk, and scale.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Polo was not a missionary, and this passage is about trade and lodging, not religion.",
        "Polo was not a Chinese scholar and did not write within that tradition.",
        "Polo was a Venetian merchant whose book was meant to amaze European readers, which helps explain the focus on markets, silk, and scale.",
        "Polo claimed to have served Kublai Khan, but the book was a dictated travel account, not an official report drawing on records.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Point of view means who wrote it and for whom. Here: a European merchant writing for Europeans.",
      stimulusBlocks: [excerpts.poloCambalucTrade],
    },
    {
      id: "world-2-1-q09",
      topicId: "world-2-1",
      concept: "commercial-practices",
      difficulty: "Core",
      skill: "connections",
      reasoning: "comparison",
      prompt: "How did caravanserai and credit tools work together to support exchange?",
      choices: [
        "Both removed the dangers of travel, so merchants no longer used guards",
        "Caravanserai set prices for goods, while credit tools decided which routes caravans used",
        "Both were run by the Mongol state, which owned every caravan on the roads",
        "Caravanserai reduced travel hardships, while credit reduced the need to carry coin",
      ],
      correctAnswer: 3,
      explanation:
        "Each tool solved a different problem. Inns supported people and animals; credit moved payment safely.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Both reduced some risks, but travel remained dangerous, so caravans still traveled together with protection.",
        "Caravanserai were inns and meeting places, not price-setting bodies, and credit did not determine routes.",
        "Many caravanserai and merchant partnerships were private or local, and they predate Mongol rule.",
        "Each tool solved a different problem. Inns supported people and animals; credit moved payment safely.",
      ],
      nearMissIndex: 1,
      distinguisher: "Name the specific problem each institution solved.",
    },
    {
      id: "world-2-1-q10",
      topicId: "world-2-1",
      concept: "exchange-limits",
      difficulty: "Apply",
      skill: "developments",
      prompt:
        "Why did many merchants rely on intermediaries rather than travel the entire network?",
      choices: [
        "Intermediaries were required by Mongol law to handle all foreign transactions",
        "Intermediaries guaranteed fixed profits no matter how far goods traveled",
        "Intermediaries knew local languages, laws, prices, and routes along each stretch",
        "Intermediaries owned most of the camels, so merchants could not travel without hiring them",
      ],
      correctAnswer: 2,
      explanation:
        "Local expertise made relay trade efficient, which is why goods changed hands many times.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Mongol authorities regulated some trade, but relay exchange existed long before and outside Mongol rule.",
        "No one could guarantee profits; risk and uneven profits were part of the system.",
        "Local expertise made relay trade efficient, which is why goods changed hands many times.",
        "Animals were bought, hired, and traded in many ways. Ownership of camels was not the main reason for relay trade.",
      ],
      nearMissIndex: 0,
      distinguisher: "Relay trade is about knowledge spread across many places.",
    },
    {
      id: "world-2-1-q11",
      topicId: "world-2-1",
      concept: "commercial-practices",
      difficulty: "Core",
      skill: "claims-evidence",
      prompt:
        "According to the passage, why did merchants accept the emperor's paper money?",
      choices: [
        "They received notes worth more than the market value of their goods",
        "They were paid promptly and could spend the notes across the empire",
        "They were allowed to print their own notes once they traded at court",
        "They could exchange the notes for gold at any market outside China",
      ],
      correctAnswer: 1,
      explanation:
        "Polo says merchants accepted because the price was good, payment came without delay, and the notes were usable everywhere in the empire.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Polo calls the price better than others offered, but he never says it exceeded the goods' value.",
        "Polo says merchants accepted because the price was good, payment came without delay, and the notes were usable everywhere in the empire.",
        "The passage describes the emperor issuing the notes, with forging punished by death in the full chapter.",
        "Polo stresses use within the Great Kaan's dominions; he says nothing about redeeming notes for gold abroad.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Look for the reasons Polo lists: price, speed, and usability inside the empire.",
      stimulusBlocks: [excerpts.poloPaperMoney],
    },
    {
      id: "world-2-1-q12",
      topicId: "world-2-1",
      concept: "commercial-practices",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "The practice described in the passage built most directly on which earlier development?",
      choices: [
        "Earlier Chinese dynasties' use of paper money and credit instruments",
        "The minting of gold coins by the Mali Empire for trans-Saharan trade",
        "The spread of Islamic banking practices into China under the Abbasids",
        "European bills of exchange brought to China by Venetian merchants",
      ],
      correctAnswer: 0,
      explanation:
        "Song and earlier Chinese states had used paper money and flying cash. The Yuan extended an existing Chinese practice.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Song and earlier Chinese states had used paper money and flying cash. The Yuan extended an existing Chinese practice.",
        "Mali exported gold but did not supply China's currency system.",
        "Muslim merchants used credit across Afro-Eurasia, but Chinese paper money developed within China's own institutions.",
        "Few Europeans reached China; Polo presents paper money as a marvel unknown to his readers.",
      ],
      nearMissIndex: 2,
      distinguisher: "Polo is describing something new to Europeans, not new to China.",
      stimulusBlocks: [excerpts.poloPaperMoney],
    },
    {
      id: "world-2-1-q13",
      topicId: "world-2-1",
      concept: "commercial-practices",
      difficulty: "Challenge",
      skill: "sourcing",
      prompt: "A historian would most likely use this passage as evidence of",
      choices: [
        "how the Yuan state controlled currency and drew valuable goods to the court",
        "how ordinary Chinese farmers judged the value of paper money in daily life",
        "how much paper money the Yuan government printed in each year of its rule",
        "how European merchants adopted paper money after reading Polo's account",
      ],
      correctAnswer: 0,
      explanation:
        "The passage describes the emperor's orders, the ban on refusing notes, and merchants selling precious goods only to the emperor.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "The passage describes the emperor's orders, the ban on refusing notes, and merchants selling precious goods only to the emperor.",
        "Polo describes official policy and merchants, not farmers' views. One foreign observer cannot show ordinary people's opinions.",
        "Polo gives no annual totals. Exact amounts would need Chinese government records.",
        "The passage is about Yuan China, and it gives no evidence about European practice after the book appeared.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Match the claim to what the source can show: state policy as seen by a foreign merchant.",
      stimulusBlocks: [excerpts.poloPaperMoney],
    },
    {
      id: "world-2-1-q14",
      topicId: "world-2-1",
      concept: "network-geography",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt:
        "Which statement best describes continuity in Silk Roads exchange across 1200–1450?",
      choices: [
        "Trade began for the first time when the Mongols conquered Central Asia",
        "Routes revived under new states, but relay trade through oasis cities persisted",
        "Trade stopped completely once the Mongol khanates divided after 1260",
        "Routes revived under new states, and single merchants came to cover the whole road",
      ],
      correctAnswer: 1,
      explanation:
        "Rulers and conditions changed, but the basic pattern of relay exchange through nodes continued.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The routes are centuries older than the Mongols; Mongol rule intensified existing exchange.",
        "Rulers and conditions changed, but the basic pattern of relay exchange through nodes continued.",
        "Fragmentation disrupted some routes, but trade continued, including after Mongol power declined.",
        "Revival is accurate, but relay trade remained normal. Polo's long journey was unusual, not typical.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Continuity means something persisted while other things changed. Name both.",
    },
    {
      id: "world-2-1-q15",
      topicId: "world-2-1",
      concept: "trade-growth",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which sequence best explains how political conditions affected Silk Roads trade?",
      choices: [
        "Conquest of oasis cities → loss of water supplies → abandonment of trade",
        "Protected routes → higher taxes on every caravan → fewer merchants overall",
        "Protected routes → lower risk for merchants → more frequent caravans",
        "New dynasties in China → closure of overland routes → growth of local farming",
      ],
      correctAnswer: 2,
      explanation:
        "Security reduced the danger and cost of travel, which encouraged more exchange.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Conquerors generally wanted oasis cities to keep functioning because they produced revenue.",
        "Rulers did tax trade, but protection usually increased exchange because taxes depended on traffic continuing.",
        "Security reduced the danger and cost of travel, which encouraged more exchange.",
        "Dynastic change did not close the routes, and the chain ignores the role of demand.",
      ],
      nearMissIndex: 1,
      distinguisher: "Follow the mechanism from policy to merchant behavior.",
    },
    {
      id: "world-2-1-q16",
      topicId: "world-2-1",
      concept: "cities-production",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "How did rising Silk Roads demand most directly affect production in China?",
      choices: [
        "Factories using steam power replaced household workshops in major cities",
        "Farmers abandoned rice cultivation to raise silkworms for export",
        "The state banned private manufacturing so that it could control exports",
        "Workshops expanded output of silk, porcelain, and iron for wider markets",
      ],
      correctAnswer: 3,
      explanation:
        "Demand encouraged artisans and workshops to produce more for distant buyers, alongside iron and steel expansion.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Production grew without steam power or factories; those belong to the Industrial Revolution centuries later.",
        "Rice remained central to China's economy; silk production grew alongside farming, not instead of it.",
        "Private workshops and merchants produced much of China's output in this period.",
        "Demand encouraged artisans and workshops to produce more for distant buyers, alongside iron and steel expansion.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Production expanded within existing workshops, not through industrial machines.",
    },
    {
      id: "world-2-1-q17",
      topicId: "world-2-1",
      concept: "exchange-limits",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "The passage best supports which conclusion about travel across Mongol Eurasia?",
      choices: [
        "Mongol rule made travel completely safe until the Black Death began",
        "Envoys could cross the empire only with permission from European kings",
        "Conflict among Mongol rulers could block routes even during the Mongol era",
        "Conflict among Mongol rulers usually made envoys travel by sea instead",
      ],
      correctAnswer: 2,
      explanation:
        "The envoys turned back because wars among “Tartar Princes” closed the roads.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "The passage shows the opposite: the routes were not reliably safe.",
        "The envoys served Kublai Khan and the Ilkhan; European kings played no role.",
        "The envoys turned back because wars among “Tartar Princes” closed the roads.",
        "The envoys did later travel by sea, but the passage itself shows only that the roads closed, not that this was usual.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "A claim must rest on the passage. It shows one blocked journey, which limits what “usually” can mean.",
      stimulusBlocks: [excerpts.poloRoadsClosed],
    },
    {
      id: "world-2-1-q18",
      topicId: "world-2-1",
      concept: "exchange-limits",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt:
        "How could a historian best use this passage in an argument about the Pax Mongolica?",
      choices: [
        "To show that sea routes completely replaced overland routes across Eurasia after the 1290s",
        "To prove that the Pax Mongolica never existed and that exchange declined after 1260",
        "To show that Ramusio's edition is unreliable, so historians should not use it at all",
        "To qualify claims of Mongol-era security by showing that internal wars disrupted travel",
      ],
      correctAnswer: 3,
      explanation:
        "One example of blocked roads complicates, but does not cancel, the idea of relative stability under Mongol rule.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Overland trade continued; one diverted embassy cannot show a complete shift.",
        "One blocked journey cannot disprove a broad pattern of increased exchange; it qualifies it.",
        "A later edition calls for caution, but historians can still use it while noting its transmission.",
        "One example of blocked roads complicates, but does not cancel, the idea of relative stability under Mongol rule.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Strong arguments qualify. One counterexample limits a generalization without overturning it.",
      stimulusBlocks: [excerpts.poloRoadsClosed],
    },
    {
      id: "world-2-1-q19",
      topicId: "world-2-1",
      concept: "network-geography",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Compared with Indian Ocean trade, Silk Roads exchange relied more heavily on",
      choices: [
        "caravans that moved between oasis cities across deserts and mountains",
        "seasonal wind patterns that set the timing of long-distance voyages",
        "large ships that carried bulk goods between coastal port cities",
        "river barges that linked Central Asian cities to the Mediterranean",
      ],
      correctAnswer: 0,
      explanation:
        "Overland trade moved by caravan between oases, which shaped which goods and cities mattered.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Overland trade moved by caravan between oases, which shaped which goods and cities mattered.",
        "Seasonal timing mattered on land too, but monsoon winds are the defining feature of Indian Ocean sailing.",
        "Ships carrying bulk goods describe the Indian Ocean, where sea transport could move heavier cargo.",
        "Rivers helped in places, but no river route linked Central Asia to the Mediterranean.",
      ],
      nearMissIndex: 1,
      distinguisher: "Identify the transport system that defines each network.",
    },
    {
      id: "world-2-1-q20",
      topicId: "world-2-1",
      concept: "trade-growth",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt:
        "Which thesis best answers: “To what extent did the Mongols cause the growth of Silk Roads trade after 1200?”",
      choices: [
        "Trade grew because of demand alone, so political conditions had no effect on exchange",
        "Mongol protection intensified trade, but older demand and commercial tools made that growth possible",
        "The Mongols mainly reduced trade by conquering cities, so growth happened only after them",
        "Mongol protection created Silk Roads trade, which had not existed in any organized form before 1200",
      ],
      correctAnswer: 1,
      explanation:
        "This thesis takes a position on extent and explains it with more than one cause.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-1",
          locator: "Topic 2.1 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Demand mattered, but security and state policy clearly affected travel and costs.",
        "This thesis takes a position on extent and explains it with more than one cause.",
        "Conquest caused real destruction, but Mongol rule also protected routes; trade grew during the Mongol era.",
        "The routes are much older than 1200, so this claim is inaccurate.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "“To what extent” calls for a claim about degree that also names limits.",
    },
  ],
  quizzes: [
    {
      id: "world-2-1-quick",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-1",
      title: "Topic 1 quick check",
      quizType: "quick",
      questionIds: ["world-2-1-q01", "world-2-1-q02", "world-2-1-q03", "world-2-1-q04"],
    },
    {
      id: "world-2-1-quiz",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-1",
      title: "The Silk Roads topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-2-1-q05",
        "world-2-1-q06",
        "world-2-1-q07",
        "world-2-1-q08",
        "world-2-1-q09",
        "world-2-1-q10",
        "world-2-1-q11",
        "world-2-1-q12",
        "world-2-1-q13",
        "world-2-1-q14",
        "world-2-1-q15",
        "world-2-1-q16",
      ],
    },
  ],
};

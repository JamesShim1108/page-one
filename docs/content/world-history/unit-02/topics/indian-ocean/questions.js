// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-2-3-q01",
      topicId: "world-2-3",
      concept: "monsoon-navigation",
      difficulty: "Core",
      skill: "developments",
      prompt: "Why did knowledge of the monsoon winds matter to Indian Ocean merchants?",
      choices: [
        "Steady winds blew in one direction all year, so ships never had to wait",
        "Monsoon storms closed the ocean to all shipping for most of each year",
        "Seasonal wind shifts let sailors plan outbound and return voyages",
        "Wind knowledge replaced the need for compasses and other navigation tools",
      ],
      correctAnswer: 2,
      explanation:
        "The winds reverse direction by season, so merchants timed departures and returns around them.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The monsoons reverse seasonally. Merchants often waited in port for the wind to change.",
        "Some months were dangerous, but the seasonal pattern made regular sailing possible.",
        "The winds reverse direction by season, so merchants timed departures and returns around them.",
        "Pilots combined wind knowledge with compasses, astrolabes, and local experience.",
      ],
      nearMissIndex: 0,
      distinguisher: "The monsoon is valuable because it is predictable and reverses.",
    },
    {
      id: "world-2-3-q02",
      topicId: "world-2-3",
      concept: "ports-products",
      difficulty: "Core",
      skill: "developments",
      prompt:
        "Which pairing of a region and a good it supplied to Indian Ocean trade is accurate?",
      choices: [
        "India: cotton textiles and pepper",
        "China: gold dust and elephant ivory",
        "Southeast Asia: horses and wool",
        "East Africa: porcelain and silk",
      ],
      correctAnswer: 0,
      explanation: "India was known for cotton cloth and pepper from the Malabar coast.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "India was known for cotton cloth and pepper from the Malabar coast.",
        "Gold and ivory were East African exports; China exported silk and porcelain.",
        "Southeast Asian islands supplied spices; horses came largely from Arabia and Persia.",
        "Porcelain and silk came from China. East Africa supplied gold, ivory, and other goods.",
      ],
      nearMissIndex: 3,
      distinguisher: "Match each region with its best-known exports.",
    },
    {
      id: "world-2-3-q03",
      topicId: "world-2-3",
      concept: "diaspora-communities",
      difficulty: "Core",
      skill: "developments",
      prompt: "Why did merchant communities settle in foreign Indian Ocean ports?",
      choices: [
        "Ships were too slow to return home within the merchants' lifetimes",
        "Rulers of every port required foreign merchants to settle permanently",
        "Merchants were fleeing religious persecution in their homelands in large numbers",
        "Long waits for seasonal winds and profitable trade encouraged residence",
      ],
      correctAnswer: 3,
      explanation:
        "Merchants waited months for the winds to change, and steady trade made settling worthwhile.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Voyages took months, not lifetimes; the issue was seasonal timing.",
        "Rulers welcomed merchants for revenue, but settlement was usually by choice, not requirement.",
        "Diasporas formed mainly through trade, not mass flight from persecution.",
        "Merchants waited months for the winds to change, and steady trade made settling worthwhile.",
      ],
      nearMissIndex: 1,
      distinguisher: "Link settlement to the monsoon calendar and profit.",
    },
    {
      id: "world-2-3-q04",
      topicId: "world-2-3",
      concept: "states-revenue",
      difficulty: "Core",
      skill: "developments",
      prompt: "How did Malacca become a powerful state in the 1400s?",
      choices: [
        "It conquered the Swahili coast to control African gold",
        "It taxed and protected ships passing through a key strait",
        "It produced most of the cotton cloth traded in the ocean",
        "It controlled the Silk Roads oases in Central Asia",
      ],
      correctAnswer: 1,
      explanation:
        "The Strait of Malacca linked the Indian Ocean and South China Sea, and Malacca profited by taxing and protecting traffic.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Malacca was in Southeast Asia. It did not rule East Africa.",
        "The Strait of Malacca linked the Indian Ocean and South China Sea, and Malacca profited by taxing and protecting traffic.",
        "Cotton cloth came mainly from India, especially Gujarat.",
        "Malacca was a maritime state far from Central Asia.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A strait creates power when a ruler can tax and protect the ships that must pass.",
    },
    {
      id: "world-2-3-q05",
      topicId: "world-2-3",
      concept: "ports-products",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "The passage best supports which claim about trade in the late 1200s?",
      choices: [
        "Chinese merchants refused to buy goods brought by foreign ships",
        "Chinese ports received far more Asian spice imports than Europe did",
        "Spices reached China mainly by caravan over the Silk Roads, not by sea",
        "European ports received most of the pepper shipped from India",
      ],
      correctAnswer: 1,
      explanation:
        "Polo says a hundred shiploads of pepper came to Zayton for every one sent toward Christendom.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Zayton was “frequented by all the ships of India,” and goods were distributed across southern China.",
        "Polo says a hundred shiploads of pepper came to Zayton for every one sent toward Christendom.",
        "Polo describes ships bringing spices to a Chinese port, which is sea trade.",
        "Polo says the opposite: Europe's share was small compared with China's.",
      ],
      nearMissIndex: 3,
      distinguisher: "Use Polo's comparison of shiploads.",
      stimulusBlocks: [excerpts.poloZayton],
    },
    {
      id: "world-2-3-q06",
      topicId: "world-2-3",
      concept: "states-revenue",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "According to the passage, how did Zayton's trade benefit the Yuan state?",
      choices: [
        "The state owned all ships and kept the profits from freight",
        "The emperor collected a ten percent duty on all goods exported",
        "Foreign merchants paid the emperor in silk instead of silver",
        "The emperor collected a ten percent duty on imported goods",
      ],
      correctAnswer: 3,
      explanation:
        "Polo says the Great Kaan levied a duty of ten percent on all imported merchandise.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Polo separates the emperor's duty from freight charges paid to ships.",
        "Polo specifies imports, not exports.",
        "The passage describes a duty on imports, not payment in silk.",
        "Polo says the Great Kaan levied a duty of ten percent on all imported merchandise.",
      ],
      nearMissIndex: 1,
      distinguisher: "Read the detail closely: a duty on imported goods.",
      stimulusBlocks: [excerpts.poloZayton],
    },
    {
      id: "world-2-3-q07",
      topicId: "world-2-3",
      concept: "ports-products",
      difficulty: "Challenge",
      skill: "sourcing",
      prompt: "Why might Polo emphasize the comparison between Zayton and Alexandria?",
      choices: [
        "His European readers knew Alexandria, so it showed them China's scale",
        "His European readers knew Alexandria, so he could prove Zayton was smaller",
        "He was reporting official Yuan statistics that compared the two ports",
        "He was a Chinese official who wanted to discourage European traders",
      ],
      correctAnswer: 0,
      explanation:
        "Alexandria was a major port for Europeans buying spices, so the comparison made China's trade vivid to his audience.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Alexandria was a major port for Europeans buying spices, so the comparison made China's trade vivid to his audience.",
        "The audience point is right, but Polo uses Alexandria to show Zayton was much larger.",
        "Polo gives a striking estimate, not figures from records.",
        "Polo was a Venetian merchant, not a Chinese official.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Audience shapes comparisons: Polo picks a reference his readers understood.",
      stimulusBlocks: [excerpts.poloZayton],
    },
    {
      id: "world-2-3-q08",
      topicId: "world-2-3",
      concept: "monsoon-navigation",
      difficulty: "Core",
      skill: "developments",
      prompt: "Which technology helped navigators estimate their latitude at sea?",
      choices: [
        "The stern rudder",
        "The junk's watertight hull",
        "The astrolabe",
        "The lateen sail",
      ],
      correctAnswer: 2,
      explanation:
        "The astrolabe measured the height of stars or the sun to estimate latitude.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The stern rudder improved steering, not position finding.",
        "Watertight compartments made Chinese junks safer; they did not measure position.",
        "The astrolabe measured the height of stars or the sun to estimate latitude.",
        "The lateen sail helped ships sail closer to the wind, not find latitude.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Separate tools for finding position from tools for moving the ship.",
    },
    {
      id: "world-2-3-q09",
      topicId: "world-2-3",
      concept: "zheng-he",
      difficulty: "Apply",
      skill: "developments",
      prompt: "What was the main purpose of Zheng He's voyages from 1405 to 1433?",
      choices: [
        "To spread Buddhism by sending monks to every port they visited",
        "To display Ming power and found Chinese colonies in East Africa",
        "To find a sea route to Europe so China could trade with Venice",
        "To display Ming power, collect tribute, and build diplomatic ties",
      ],
      correctAnswer: 3,
      explanation:
        "The fleets carried gifts, sought recognition of the Ming emperor, and expanded knowledge of distant regions.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Zheng He was Muslim, and the voyages were diplomatic and commercial, not missionary.",
        "Displaying power is right, but the voyages did not establish colonies.",
        "The fleets sailed the Indian Ocean as far as East Africa; reaching Europe was not their goal.",
        "The fleets carried gifts, sought recognition of the Ming emperor, and expanded knowledge of distant regions.",
      ],
      nearMissIndex: 1,
      distinguisher: "Tribute and prestige, not conquest or settlement.",
    },
    {
      id: "world-2-3-q10",
      topicId: "world-2-3",
      concept: "ports-products",
      difficulty: "Core",
      skill: "claims-evidence",
      prompt: "The passage provides evidence for which feature of Indian Ocean trade?",
      choices: [
        "Piracy was common, so most merchants avoided the Malabar coast",
        "Rulers of Malabar had banned foreign ships from trading at their ports",
        "Piracy was a real risk, and merchants armed their ships in response",
        "Pepper from Malabar went mostly to Europe instead of China",
      ],
      correctAnswer: 2,
      explanation:
        "Polo describes corsair fleets and says merchants now sailed “well manned and armed.”",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Piracy is described, but ships still came “from many quarters,” especially from southern China.",
        "Polo describes ships arriving from many places to trade.",
        "Polo describes corsair fleets and says merchants now sailed “well manned and armed.”",
        "Polo says ships heading west were “not one to ten” of those going east.",
      ],
      nearMissIndex: 0,
      distinguisher: "The passage shows both the risk and the response.",
      stimulusBlocks: [excerpts.poloMelibar],
    },
    {
      id: "world-2-3-q11",
      topicId: "world-2-3",
      concept: "states-revenue",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt: "Compared with the Zayton passage, this passage shows that",
      choices: [
        "Malabar's rulers taxed foreign trade more heavily than Kublai Khan did",
        "China was also the largest destination for exports from western India",
        "both ports traded only with ships from their own regions",
        "China was the main source of the pepper that India sold to Europe",
      ],
      correctAnswer: 1,
      explanation:
        "Both passages describe more goods heading to China than to Europe, from opposite ends of the route.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "The Malabar passage gives no tax rates to compare.",
        "Both passages describe more goods heading to China than to Europe, from opposite ends of the route.",
        "Both passages describe ships arriving from distant regions.",
        "Pepper grew in Malabar itself. Ships from China brought silk, gold, and other goods to exchange for it.",
      ],
      nearMissIndex: 3,
      distinguisher: "Look for the pattern the two sources share.",
      stimulusBlocks: [excerpts.poloMelibar],
    },
    {
      id: "world-2-3-q12",
      topicId: "world-2-3",
      concept: "ports-products",
      difficulty: "Apply",
      skill: "contextualization",
      prompt: "Which broader development best explains the trade pattern Polo describes?",
      choices: [
        "Demand in a growing, commercial China drew goods from across the ocean",
        "A collapse of Chinese industry forced China to import manufactured goods",
        "Demand in Europe after the Crusades drew most spices to Venice",
        "Mongol armies had conquered India and redirected its trade to China",
      ],
      correctAnswer: 0,
      explanation:
        "China's large, commercial economy created strong demand for spices and other imports.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "China's large, commercial economy created strong demand for spices and other imports.",
        "China exported manufactured goods such as silk and porcelain; it imported spices and raw materials.",
        "European demand existed, but Polo shows that the eastern market was far larger.",
        "The Mongols did not conquer southern India; the Delhi Sultanate resisted Mongol invasions in the north.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Context explains why goods flowed east: the size of the Chinese market.",
      stimulusBlocks: [excerpts.poloMelibar],
    },
    {
      id: "world-2-3-q13",
      topicId: "world-2-3",
      concept: "diaspora-communities",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "How did Islam spread in many Indian Ocean coastal regions?",
      choices: [
        "Through merchants, intermarriage, and teachers who settled in port cities",
        "Through merchants, but only after rulers ordered everyone to convert",
        "Through armies of the Abbasid caliphate that conquered the Swahili coast",
        "Through Zheng He's voyages, which carried Muslim teachers to Africa",
      ],
      correctAnswer: 0,
      explanation:
        "Repeated contact, marriage ties, and teachers in port towns spread Islam gradually and unevenly.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Repeated contact, marriage ties, and teachers in port towns spread Islam gradually and unevenly.",
        "Merchants mattered, but conversion was usually gradual; royal patronage varied by place.",
        "No caliphal conquest of the Swahili coast occurred; Islam spread through trade networks.",
        "Islam was established on the Swahili coast centuries before Zheng He sailed.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "In coastal regions, Islam spread through contact more than conquest.",
    },
    {
      id: "world-2-3-q14",
      topicId: "world-2-3",
      concept: "diaspora-communities",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt: "Which example shows both change and continuity on the Swahili coast?",
      choices: [
        "Merchants from Arabia ruled the coast while banning local African customs",
        "Many city-states adopted Islam while Bantu-rooted Swahili remained the main language",
        "Coastal cities ended trade with the interior after adopting Islam",
        "Many city-states adopted Islam and replaced Swahili with Arabic as the main language",
      ],
      correctAnswer: 1,
      explanation:
        "Islam brought religious change, while Swahili, a Bantu language with Arabic loanwords, continued.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Swahili city-states had African rulers and blended local and imported customs.",
        "Islam brought religious change, while Swahili, a Bantu language with Arabic loanwords, continued.",
        "Trade with the interior, including gold from the south, continued and grew.",
        "Islam spread, but Swahili remained the main language, absorbing Arabic words rather than being replaced.",
      ],
      nearMissIndex: 3,
      distinguisher: "Continuity and change: name what changed and what persisted.",
    },
    {
      id: "world-2-3-q15",
      topicId: "world-2-3",
      concept: "zheng-he",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which statement best describes the effect of ending Zheng He's voyages after 1433?",
      choices: [
        "Malacca collapsed because it depended entirely on the Ming fleet",
        "State-sponsored voyages stopped, and all Chinese trade with the ocean ended",
        "State-sponsored voyages stopped, but private Indian Ocean trade continued",
        "European fleets immediately took control of Indian Ocean trade routes",
      ],
      correctAnswer: 2,
      explanation:
        "The Ming court ended costly expeditions, but merchants of many regions kept trading.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Malacca kept thriving as a trading port well after the voyages ended.",
        "The voyages ended, but Chinese and other merchants continued to trade.",
        "The Ming court ended costly expeditions, but merchants of many regions kept trading.",
        "Portuguese ships reached the Indian Ocean only in 1498, decades later.",
      ],
      nearMissIndex: 1,
      distinguisher: "The state's program was one part of a much larger network.",
    },
    {
      id: "world-2-3-q16",
      topicId: "world-2-3",
      concept: "states-revenue",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt:
        "Which evidence would best support the claim that Indian Ocean trade strengthened states?",
      choices: [
        "Malacca's merchants building mosques and trading with ships from many distant regions",
        "Monsoon winds reversing direction between summer and winter",
        "Ibn Battuta describing the food eaten on the island of Mombasa",
        "Malacca's rulers taxing ships in the strait and protecting traffic with a navy",
      ],
      correctAnswer: 3,
      explanation:
        "Taxes and naval protection link trade directly to state revenue and power.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "This shows commercial and cultural vitality, but not how trade strengthened the state.",
        "This explains how sailing worked, not how states gained power.",
        "Diet tells us about daily life, not state power.",
        "Taxes and naval protection link trade directly to state revenue and power.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Evidence must connect to the specific claim: trade producing state power.",
    },
    {
      id: "world-2-3-q17",
      topicId: "world-2-3",
      concept: "ports-products",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "The passage best supports which conclusion about the Swahili coast?",
      choices: [
        "Coastal towns grew all the grain they needed on their own islands",
        "Coastal towns had few ties to Islam or to the wider Muslim world",
        "Coastal towns were linked by trade to gold sources far in the interior",
        "Coastal towns produced the gold they exported in mines inside the cities",
      ],
      correctAnswer: 2,
      explanation:
        "Ibn Battuta reports that gold dust reached Sufala from a region a month's journey inland.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "Mombasa had no cereals and had to import them from the mainland.",
        "Ibn Battuta describes pious inhabitants and “well-built wooden mosques.”",
        "Ibn Battuta reports that gold dust reached Sufala from a region a month's journey inland.",
        "The passage says gold came from the interior, not from the coastal towns themselves.",
      ],
      nearMissIndex: 3,
      distinguisher: "Follow the gold in the passage: interior to coast.",
      stimulusBlocks: [excerpts.battutaSwahili],
    },
    {
      id: "world-2-3-q18",
      topicId: "world-2-3",
      concept: "diaspora-communities",
      difficulty: "Challenge",
      skill: "sourcing",
      prompt: "How does Ibn Battuta's background most likely shape this description?",
      choices: [
        "As a Chinese envoy, he compared East African towns with Ming ports",
        "As a Muslim scholar, he ignored trade because commerce did not interest him",
        "As a Swahili merchant himself, he exaggerated the wealth of his own home city of Kilwa",
        "As a Muslim scholar, he paid attention to piety and mosques in the towns he visited",
      ],
      correctAnswer: 3,
      explanation:
        "His judgment that the inhabitants were “pious, honourable, and upright” reflects his religious viewpoint.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "Ibn Battuta was a Moroccan traveler, not a Chinese envoy, and he wrote before Zheng He sailed.",
        "He did notice trade: he reports what a merchant told him about gold.",
        "He was from Morocco, not Kilwa.",
        "His judgment that the inhabitants were “pious, honourable, and upright” reflects his religious viewpoint.",
      ],
      nearMissIndex: 1,
      distinguisher: "Point of view affects what a writer notices and praises.",
      stimulusBlocks: [excerpts.battutaSwahili],
    },
    {
      id: "world-2-3-q19",
      topicId: "world-2-3",
      concept: "monsoon-navigation",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "How did Indian Ocean trade differ from Silk Roads trade in what it could carry?",
      choices: [
        "Ships could carry heavier, bulkier cargo than overland caravans",
        "Ships could carry heavier cargo, so luxury goods disappeared from sea trade",
        "Caravans carried more cargo, because ships could sail only in summer",
        "Both carried only luxury goods, because transport costs were identical",
      ],
      correctAnswer: 0,
      explanation:
        "Sea transport moved larger loads, including bulkier goods such as cotton cloth, timber, and grain.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Sea transport moved larger loads, including bulkier goods such as cotton cloth, timber, and grain.",
        "Bulk cargo grew, but luxury goods such as spices and porcelain remained central.",
        "Ships sailed in both monsoon seasons and carried more than caravans.",
        "Costs differed; sea transport was usually cheaper per unit of weight.",
      ],
      nearMissIndex: 1,
      distinguisher: "Compare capacity, then check whether the claim overstates.",
    },
    {
      id: "world-2-3-q20",
      topicId: "world-2-3",
      concept: "zheng-he",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt:
        "Which thesis best answers: “Evaluate the significance of Zheng He's voyages for Indian Ocean trade”?",
      choices: [
        "They mattered more than any other factor because China then controlled every port",
        "They showed Ming power within an existing network, but trade did not depend on them",
        "They had no significance, because the Ming dynasty ended them after a few years",
        "They created Indian Ocean trade, which had not connected China and Africa before",
      ],
      correctAnswer: 1,
      explanation:
        "This thesis makes an evaluative claim and qualifies it by placing the voyages in a larger network.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-3"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-3",
          locator: "Topic 2.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The voyages displayed power but did not establish control over ports.",
        "This thesis makes an evaluative claim and qualifies it by placing the voyages in a larger network.",
        "The voyages lasted nearly three decades and had real diplomatic effects; dismissing them overstates the case.",
        "Indian Ocean trade linked these regions for centuries before 1405.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "“Evaluate significance” asks for a weighed claim, not an extreme one.",
    },
  ],
  quizzes: [
    {
      id: "world-2-3-quick",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-3",
      title: "Topic 3 quick check",
      quizType: "quick",
      questionIds: ["world-2-3-q01", "world-2-3-q02", "world-2-3-q03", "world-2-3-q04"],
    },
    {
      id: "world-2-3-quiz",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-3",
      title: "Exchange in the Indian Ocean topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-2-3-q05",
        "world-2-3-q06",
        "world-2-3-q07",
        "world-2-3-q08",
        "world-2-3-q09",
        "world-2-3-q10",
        "world-2-3-q11",
        "world-2-3-q12",
        "world-2-3-q13",
        "world-2-3-q14",
        "world-2-3-q15",
        "world-2-3-q16",
      ],
    },
  ],
};

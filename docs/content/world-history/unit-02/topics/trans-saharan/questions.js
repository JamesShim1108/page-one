// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-2-4-q01",
      topicId: "world-2-4",
      concept: "desert-logistics",
      difficulty: "Core",
      skill: "developments",
      prompt: "Why were camels essential to trans-Saharan trade?",
      choices: [
        "They could carry heavy loads, so caravans no longer needed oases",
        "They were faster than horses over the paved roads of the Sahara",
        "They could carry heavy loads long distances with little water",
        "They were raised by Mali's rulers, who controlled every caravan",
      ],
      correctAnswer: 2,
      explanation:
        "Camels tolerated heat and thirst and carried substantial loads between scattered water sources.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Camels needed less water than other animals, but caravans still depended on oases and wells.",
        "The Sahara had no paved roads; camels suited sand and long dry stretches.",
        "Camels tolerated heat and thirst and carried substantial loads between scattered water sources.",
        "Berber and other desert groups raised and handled camels; Mali did not control every caravan.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Camels reduced the difficulty of crossing the desert; they did not remove it.",
    },
    {
      id: "world-2-4-q02",
      topicId: "world-2-4",
      concept: "goods-intermediaries",
      difficulty: "Core",
      skill: "developments",
      prompt: "Which exchange was at the center of trans-Saharan trade?",
      choices: [
        "West African gold moving north for Saharan salt moving south",
        "Chinese silk moving west for European wool moving east",
        "Indian spices moving north for Arabian horses moving south",
        "West African salt moving north for North African gold moving south",
      ],
      correctAnswer: 0,
      explanation:
        "Gold from West African fields went north, while salt mined in the Sahara went south.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Gold from West African fields went north, while salt mined in the Sahara went south.",
        "Silk and wool trade belonged to other networks.",
        "Spices moved mainly through the Indian Ocean, though horses did reach West Africa.",
        "This reverses the flow. Gold came from West Africa; salt came from the desert.",
      ],
      nearMissIndex: 3,
      distinguisher: "Get the direction right: gold north, salt south.",
    },
    {
      id: "world-2-4-q03",
      topicId: "world-2-4",
      concept: "mali-state-trade",
      difficulty: "Core",
      skill: "developments",
      prompt: "How did the rulers of Mali gain wealth from trans-Saharan trade?",
      choices: [
        "They required every foreign merchant to convert to Islam before entering the empire",
        "They mined Saharan salt themselves and sold it to merchants in Morocco",
        "They owned the merchant fleets that carried gold across the Mediterranean",
        "They taxed goods passing through their territory and controlled access to gold",
      ],
      correctAnswer: 3,
      explanation:
        "Mali's rulers taxed trade and controlled access to gold sources and trading cities.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Mali's rulers were Muslim, but trade did not require conversion.",
        "Salt came from Saharan mines such as Taghaza, which lay north of Mali's core.",
        "Mali was an inland empire; Mediterranean shipping was handled by others.",
        "Mali's rulers taxed trade and controlled access to gold sources and trading cities.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Rulers profited by taxing and controlling trade, not by doing all of it.",
    },
    {
      id: "world-2-4-q04",
      topicId: "world-2-4",
      concept: "musa-learning",
      difficulty: "Core",
      skill: "developments",
      prompt: "Which statement about Mansa Musa's pilgrimage of 1324–1325 is accurate?",
      choices: [
        "It displayed Mali's wealth and was the first event to bring Islam to West Africa",
        "It displayed Mali's wealth and strengthened ties with the Islamic world",
        "It led Mali's rulers to abandon Islam after returning from Mecca",
        "It was a military campaign to conquer Egypt and control its trade",
      ],
      correctAnswer: 1,
      explanation:
        "The pilgrimage made Mali famous in Cairo and beyond and linked Musa to Muslim scholars and rulers.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The wealth is right, but Islam had reached West Africa centuries earlier through merchants.",
        "The pilgrimage made Mali famous in Cairo and beyond and linked Musa to Muslim scholars and rulers.",
        "Musa returned and sponsored mosques and scholarship.",
        "The journey was a religious pilgrimage, not an invasion.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The pilgrimage strengthened existing connections; it did not start them.",
    },
    {
      id: "world-2-4-q05",
      topicId: "world-2-4",
      concept: "goods-intermediaries",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "The passage best supports which claim about Taghaza?",
      choices: [
        "It was a farming town that exported grain to West African cities",
        "It depended on imported food and on the forced labor of enslaved miners",
        "It was the capital of Mali and the center of its gold trade",
        "It depended on imported food but was run by free miners who owned the salt",
      ],
      correctAnswer: 1,
      explanation:
        "Only the enslaved workers of the Massufa lived there, eating dates, camel meat, and imported millet.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "The passage says nothing grew there: “no trees there, nothing but sand.”",
        "Only the enslaved workers of the Massufa lived there, eating dates, camel meat, and imported millet.",
        "Taghaza was a salt-mining village in the desert, far from Mali's capital.",
        "Imported food is correct, but Ibn Battuta says the miners were enslaved.",
      ],
      nearMissIndex: 3,
      distinguisher: "Note who lived and worked at Taghaza.",
      stimulusBlocks: [excerpts.battutaTaghaza],
    },
    {
      id: "world-2-4-q06",
      topicId: "world-2-4",
      concept: "desert-logistics",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which detail in the passage best explains why salt was valuable south of the Sahara?",
      choices: [
        "Camels could carry only two slabs, so salt was rarely traded",
        "Taghaza's houses and mosques were built of salt blocks",
        "Salt was so common that it was used as building material",
        "West Africans traveled north to Taghaza to obtain it",
      ],
      correctAnswer: 3,
      explanation:
        "People made the long trip north to obtain salt, which shows strong demand in West Africa.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "Two slabs per camel was a load size; caravans carried many camels' worth.",
        "Salt buildings show abundance at the source, not value in the south.",
        "Abundance at Taghaza does not explain its value elsewhere; distance and demand do.",
        "People made the long trip north to obtain salt, which shows strong demand in West Africa.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Value comes from demand where a good is scarce, not abundance where it is mined.",
      stimulusBlocks: [excerpts.battutaTaghaza],
    },
    {
      id: "world-2-4-q07",
      topicId: "world-2-4",
      concept: "accounts-local-life",
      difficulty: "Challenge",
      skill: "sourcing",
      prompt:
        "Which aspect of the source most affects how a historian should read the word “unattractive”?",
      choices: [
        "It is the judgment of a traveler from Morocco's cities, not a neutral description",
        "It is the judgment of a traveler, so the salt mine he describes probably did not exist",
        "It was written by the Massufa workers who mined salt at Taghaza",
        "It comes from a Mali government report criticizing the salt trade",
      ],
      correctAnswer: 0,
      explanation:
        "Ibn Battuta's urban, scholarly background shapes his opinion; his facts about salt and supplies are more reliable than his taste.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "Ibn Battuta's urban, scholarly background shapes his opinion; his facts about salt and supplies are more reliable than his taste.",
        "His opinion is subjective, but the mine and its trade are confirmed by other sources.",
        "Ibn Battuta, not the miners, wrote this account.",
        "This is a traveler's account dictated in Morocco, not a Mali government report.",
      ],
      nearMissIndex: 1,
      distinguisher: "Separate observation from judgment.",
      stimulusBlocks: [excerpts.battutaTaghaza],
    },
    {
      id: "world-2-4-q08",
      topicId: "world-2-4",
      concept: "goods-intermediaries",
      difficulty: "Core",
      skill: "developments",
      prompt: "Which goods besides gold and salt moved along trans-Saharan routes?",
      choices: [
        "Furs and timber from Scandinavian forests",
        "Rice and spices from the Indian Ocean coast",
        "Textiles, horses, books, and enslaved people",
        "Porcelain, silk, and tea from Song dynasty China",
      ],
      correctAnswer: 2,
      explanation:
        "North African textiles and horses went south; books and enslaved people also crossed the desert.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Northern European furs and timber did not move along Saharan routes.",
        "Rice and spices belonged mainly to Indian Ocean trade.",
        "North African textiles and horses went south; books and enslaved people also crossed the desert.",
        "Some Chinese goods reached Africa by sea, but they were not typical Saharan cargo.",
      ],
      nearMissIndex: 3,
      distinguisher: "Picture both ends of the route: North Africa and West Africa.",
    },
    {
      id: "world-2-4-q09",
      topicId: "world-2-4",
      concept: "mali-state-trade",
      difficulty: "Apply",
      skill: "developments",
      prompt: "Why did Timbuktu become an important city in the 1300s?",
      choices: [
        "It was founded by Zheng He as a base for Chinese trade",
        "It linked desert caravans with Atlantic shipping bound for Portugal and Spain",
        "It was the source of the salt that West Africans needed",
        "It linked desert caravans with Niger River trade and drew Muslim scholars",
      ],
      correctAnswer: 3,
      explanation:
        "Its position near the Niger made it a meeting point for caravans and river traffic, and its mosques and scholars attracted learning.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Zheng He's fleets never reached West Africa.",
        "Atlantic trade with Portugal began only in the 1400s and did not run through Timbuktu.",
        "Salt came from Saharan mines such as Taghaza; Timbuktu traded it.",
        "Its position near the Niger made it a meeting point for caravans and river traffic, and its mosques and scholars attracted learning.",
      ],
      nearMissIndex: 1,
      distinguisher: "Desert route plus river route plus scholarship.",
    },
    {
      id: "world-2-4-q10",
      topicId: "world-2-4",
      concept: "mali-state-trade",
      difficulty: "Core",
      skill: "claims-evidence",
      prompt: "Which claim does the passage most directly support?",
      choices: [
        "Mali's government kept order mainly by banning foreign merchants",
        "Mali's people rarely practiced Islam outside the royal court",
        "Mali's government kept order that made travel and trade safe",
        "Mali's economy depended mostly on salt mined near the capital",
      ],
      correctAnswer: 2,
      explanation:
        "Ibn Battuta says there was “complete security” and that travelers had nothing to fear from robbers.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "The passage describes foreign merchants' property being protected, not foreigners being banned.",
        "He describes crowded Friday prayers and children learning the Koran.",
        "Ibn Battuta says there was “complete security” and that travelers had nothing to fear from robbers.",
        "The passage does not discuss salt mining near the capital.",
      ],
      nearMissIndex: 0,
      distinguisher: "Choose the claim the passage states directly.",
      stimulusBlocks: [excerpts.battutaMali],
    },
    {
      id: "world-2-4-q11",
      topicId: "world-2-4",
      concept: "musa-learning",
      difficulty: "Apply",
      skill: "contextualization",
      prompt: "The religious practices Ibn Battuta describes are best explained by",
      choices: [
        "the arrival of Christian missionaries from Ethiopia after 1300",
        "the spread of Islam through trade networks and the patronage of Mali's rulers",
        "the influence of Buddhist monks who traveled with Chinese merchants",
        "the spread of Islam through Mansa Musa's military conquest of North Africa and Egypt",
      ],
      correctAnswer: 1,
      explanation:
        "Muslim merchants and scholars had long used Saharan routes, and rulers such as Mansa Musa sponsored Islamic institutions.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "Ethiopia was Christian, but it did not convert Mali.",
        "Muslim merchants and scholars had long used Saharan routes, and rulers such as Mansa Musa sponsored Islamic institutions.",
        "Buddhism did not spread to West Africa in this period.",
        "Musa made a pilgrimage, not a conquest; Islam spread through trade and patronage.",
      ],
      nearMissIndex: 3,
      distinguisher: "Context links the passage to the networks that carried Islam.",
      stimulusBlocks: [excerpts.battutaMali],
    },
    {
      id: "world-2-4-q12",
      topicId: "world-2-4",
      concept: "accounts-local-life",
      difficulty: "Apply",
      skill: "sourcing",
      prompt: "Ibn Battuta's criticism of “bad qualities” most clearly reflects",
      choices: [
        "his expectations as a Muslim scholar trained in North African customs",
        "his lack of contact with Mali's people during a very short visit",
        "his expectations as a Muslim scholar, so his praise should also be ignored",
        "his loyalty to Mali's sultan, who paid him to praise the empire",
      ],
      correctAnswer: 0,
      explanation:
        "He judged court customs, such as throwing dust on the head, against the norms of his own society.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "He judged court customs, such as throwing dust on the head, against the norms of his own society.",
        "He stayed in Mali for months, so lack of contact is not the issue.",
        "Bias in one judgment does not erase observations such as crowded prayers; weigh each claim.",
        "He criticizes some customs, which argues against paid praise; he also complained about the sultan's stinginess.",
      ],
      nearMissIndex: 2,
      distinguisher: "Point of view explains judgments; it does not cancel observations.",
      stimulusBlocks: [excerpts.battutaMali],
    },
    {
      id: "world-2-4-q13",
      topicId: "world-2-4",
      concept: "desert-logistics",
      difficulty: "Apply",
      skill: "developments",
      prompt: "How did caravans reduce the risks of crossing the Sahara?",
      choices: [
        "Merchants traveled together with guides, guards, and planned water stops",
        "Merchants traveled together, so robbery and thirst no longer occurred",
        "Merchants hired ships to carry goods along the Niger to the Mediterranean",
        "Merchants waited for the monsoon winds before setting out from Morocco",
      ],
      correctAnswer: 0,
      explanation:
        "Group travel shared guides and protection, and routes were planned around wells and oases.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Group travel shared guides and protection, and routes were planned around wells and oases.",
        "Caravans reduced risk but did not eliminate it; crossings remained dangerous.",
        "The Niger flows through West Africa to the Atlantic, not to the Mediterranean.",
        "Monsoons govern Indian Ocean sailing, not Saharan caravans.",
      ],
      nearMissIndex: 1,
      distinguisher: "Reduce is not the same as remove.",
    },
    {
      id: "world-2-4-q14",
      topicId: "world-2-4",
      concept: "goods-intermediaries",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "How did trans-Saharan trade affect religion in West Africa?",
      choices: [
        "Christian merchants from Europe converted Mali's rulers to Christianity",
        "Muslim merchants and scholars spread Islam, especially among rulers and traders",
        "Trade had no religious effect because merchants never settled in cities",
        "Muslim merchants spread Islam, which nearly everyone adopted within one generation",
      ],
      correctAnswer: 1,
      explanation:
        "Islam spread first among elites and urban traders, while many rural communities kept local beliefs.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "European merchants did not cross the Sahara to Mali in this period.",
        "Islam spread first among elites and urban traders, while many rural communities kept local beliefs.",
        "Merchants settled in towns such as Timbuktu and Gao, which became centers of Islam.",
        "Islam spread, but unevenly. Many people kept local practices for centuries.",
      ],
      nearMissIndex: 3,
      distinguisher: "Track who adopted Islam first and how fully.",
    },
    {
      id: "world-2-4-q15",
      topicId: "world-2-4",
      concept: "mali-state-trade",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt:
        "Which statement best describes continuity in West African politics from Ghana to Mali?",
      choices: [
        "Both states banned Muslim merchants to protect local religious traditions",
        "Both states drew power from gold, and both were ruled by Christian kings",
        "Both states drew power from controlling gold and taxing trans-Saharan trade",
        "Both states were coastal kingdoms that depended on Indian Ocean ports",
      ],
      correctAnswer: 2,
      explanation:
        "Ghana and later Mali grew by controlling access to gold and taxing the trade that crossed the desert.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Both welcomed Muslim merchants; Mali's rulers became Muslim.",
        "Gold continued to matter, but Mali's rulers were Muslim, and Ghana's kings were not Christian.",
        "Ghana and later Mali grew by controlling access to gold and taxing the trade that crossed the desert.",
        "Both were inland states connected to the Sahara, not the Indian Ocean.",
      ],
      nearMissIndex: 1,
      distinguisher: "Find the economic pattern that persisted across both states.",
    },
    {
      id: "world-2-4-q16",
      topicId: "world-2-4",
      concept: "accounts-local-life",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt:
        "Which approach would best support a claim about daily life across the Mali Empire?",
      choices: [
        "Relying on Ibn Battuta alone, since he visited the capital himself",
        "Using Mansa Musa's pilgrimage as the main evidence for village life",
        "Using European maps of Africa drawn after 1500 as the main evidence",
        "Comparing Ibn Battuta's account with archaeological and oral evidence",
      ],
      correctAnswer: 3,
      explanation:
        "One traveler saw only part of the empire; other kinds of evidence test and broaden his observations.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Firsthand testimony is valuable, but one visitor's route cannot represent the whole empire.",
        "A royal pilgrimage tells us about the court, not daily life in villages.",
        "Later European maps are distant in time and place from daily life in Mali.",
        "One traveler saw only part of the empire; other kinds of evidence test and broaden his observations.",
      ],
      nearMissIndex: 0,
      distinguisher: "A broad claim needs more than one source.",
    },
    {
      id: "world-2-4-q17",
      topicId: "world-2-4",
      concept: "musa-learning",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "Which statement best summarizes the passage's argument?",
      choices: [
        "Mali's power came mainly from Islam, which all of its people had adopted",
        "Mali's power declined because Musa spent its gold on the pilgrimage",
        "Musa's pilgrimage raised Mali's profile, but its power rested on broader foundations",
        "Musa's pilgrimage raised Mali's profile, and his gold was the main source of its power",
      ],
      correctAnswer: 2,
      explanation:
        "The passage credits the pilgrimage's impact but warns against explaining Mali through one ruler's wealth.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The passage notes that many people kept local practices.",
        "The passage does not argue that the pilgrimage caused decline.",
        "The passage credits the pilgrimage's impact but warns against explaining Mali through one ruler's wealth.",
        "The passage cautions against this view, stressing farming, tribute, and trade routes.",
      ],
      nearMissIndex: 3,
      distinguisher: "Find the passage's main claim and its qualification.",
      stimulusBlocks: [excerpts.originalMusaLegacy],
    },
    {
      id: "world-2-4-q18",
      topicId: "world-2-4",
      concept: "mali-state-trade",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt: "Which evidence would best support the passage's second paragraph?",
      choices: [
        "Descriptions of the Djinguereber mosque built after Musa's return",
        "Records showing Mali taxed trade routes and that Musa gave away large amounts of gold in Cairo",
        "Accounts of the number of camels in Musa's caravan to Mecca",
        "Records showing Mali taxed trade routes and collected tribute from subject peoples",
      ],
      correctAnswer: 3,
      explanation:
        "Taxation and tribute show the broader foundations the second paragraph emphasizes.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The mosque shows patronage of Islam, not the economic foundations of power.",
        "Taxes fit, but gifts in Cairo describe the pilgrimage, which belongs to the first paragraph.",
        "Caravan size describes the pilgrimage's display of wealth, not the empire's base.",
        "Taxation and tribute show the broader foundations the second paragraph emphasizes.",
      ],
      nearMissIndex: 1,
      distinguisher: "Match evidence to the specific part of the argument.",
      stimulusBlocks: [excerpts.originalMusaLegacy],
    },
    {
      id: "world-2-4-q19",
      topicId: "world-2-4",
      concept: "desert-logistics",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt: "How did trans-Saharan trade compare with Indian Ocean trade?",
      choices: [
        "Both relied on environmental knowledge, but desert caravans carried smaller loads",
        "Both relied on seasonal winds, which set when caravans and ships could travel",
        "Both were controlled by a single empire that set prices across each network",
        "Both moved goods only between two endpoints without any intermediaries",
      ],
      correctAnswer: 0,
      explanation:
        "Caravans needed water and route knowledge, sailors needed monsoon knowledge, and ships carried more.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Caravans needed water and route knowledge, sailors needed monsoon knowledge, and ships carried more.",
        "Monsoon winds governed sailing; caravans depended on water sources, not winds.",
        "No single empire controlled either network.",
        "Both depended on many intermediaries and stops.",
      ],
      nearMissIndex: 1,
      distinguisher: "A good comparison names a similarity and a specific difference.",
    },
    {
      id: "world-2-4-q20",
      topicId: "world-2-4",
      concept: "goods-intermediaries",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt:
        "Which thesis best answers: “Evaluate the effects of trans-Saharan trade on West African societies, c. 1200–1450”?",
      choices: [
        "Trade had little effect because West Africa remained isolated from other world regions",
        "Trade enriched states and spread Islam among elites, while also expanding slavery",
        "Trade mainly harmed West Africa because merchants took all of its gold",
        "Trade enriched states and converted every West African community to Islam",
      ],
      correctAnswer: 1,
      explanation:
        "This thesis names several effects and recognizes harm alongside growth.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-4",
          locator: "Topic 2.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Trade connected West Africa to North Africa and the Islamic world.",
        "This thesis names several effects and recognizes harm alongside growth.",
        "Rulers and merchants profited greatly; the claim ignores clear evidence of wealth.",
        "Islam spread unevenly; many communities kept local religions.",
      ],
      nearMissIndex: 3,
      distinguisher: "Evaluate means weighing different effects.",
    },
  ],
  quizzes: [
    {
      id: "world-2-4-quick",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-4",
      title: "Topic 4 quick check",
      quizType: "quick",
      questionIds: ["world-2-4-q01", "world-2-4-q02", "world-2-4-q03", "world-2-4-q04"],
    },
    {
      id: "world-2-4-quiz",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-4",
      title: "Trans-Saharan Trade Routes topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-2-4-q05",
        "world-2-4-q06",
        "world-2-4-q07",
        "world-2-4-q08",
        "world-2-4-q09",
        "world-2-4-q10",
        "world-2-4-q11",
        "world-2-4-q12",
        "world-2-4-q13",
        "world-2-4-q14",
        "world-2-4-q15",
        "world-2-4-q16",
      ],
    },
  ],
};

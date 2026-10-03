// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-2-5-q01",
      topicId: "world-2-5",
      concept: "beliefs-adaptation",
      difficulty: "Core",
      skill: "developments",
      prompt: "Which example best shows a religion being adapted as it spread?",
      choices: [
        "Buddhism spreading to China and keeping every Indian practice unchanged",
        "Islam spreading to Mali and replacing all earlier customs at once",
        "Chan Buddhism in China and Zen in Japan emphasizing meditation",
        "Christianity spreading from Rome to China through Yuan missionaries",
      ],
      correctAnswer: 2,
      explanation:
        "Chan and Zen reshaped Buddhist teaching through Chinese and Japanese settings.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Buddhism did spread to China, but it changed there; Chan is an example of that change.",
        "Islam spread in Mali, but many local customs continued.",
        "Chan and Zen reshaped Buddhist teaching through Chinese and Japanese settings.",
        "A few missionaries reached Yuan China, but Christianity did not take root there in this period.",
      ],
      nearMissIndex: 0,
      distinguisher: "Adaptation means the tradition changed in its new setting.",
    },
    {
      id: "world-2-5-q02",
      topicId: "world-2-5",
      concept: "knowledge-technology",
      difficulty: "Core",
      skill: "developments",
      prompt:
        "Which technology spread from China to the Islamic world and Europe along trade networks?",
      choices: ["Papermaking", "The lateen sail", "Arabic numerals", "The astrolabe"],
      correctAnswer: 0,
      explanation:
        "Papermaking spread west from China through Central Asia and the Islamic world, and later to Europe.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Papermaking spread west from China through Central Asia and the Islamic world, and later to Europe.",
        "The lateen sail is associated with Indian Ocean and Mediterranean sailors, not China.",
        "The numerals Europeans call Arabic came from India through the Islamic world.",
        "The astrolabe was developed in the Greek and Islamic worlds, not in China.",
      ],
      nearMissIndex: 3,
      distinguisher: "Know where each technology began.",
    },
    {
      id: "world-2-5-q03",
      topicId: "world-2-5",
      concept: "cities-culture",
      difficulty: "Core",
      skill: "developments",
      prompt: "Why did trading cities often become centers of culture and learning?",
      choices: [
        "Merchants were required to found a school in every city they visited",
        "Trade brought wealth, so cities could stop depending on nearby farmland",
        "Rulers banned learning in rural areas so that schooling would stay in cities",
        "Trade brought wealth for patrons and drew scholars, artisans, and travelers",
      ],
      correctAnswer: 3,
      explanation:
        "Wealth supported mosques, schools, and courts, while traffic brought new people and ideas.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "No such requirement existed, though some merchants did fund institutions.",
        "Wealth mattered, but cities still relied on food from surrounding farmland.",
        "No such ban existed; learning concentrated where wealth and people gathered.",
        "Wealth supported mosques, schools, and courts, while traffic brought new people and ideas.",
      ],
      nearMissIndex: 1,
      distinguisher: "Wealth plus movement of people explains urban culture.",
    },
    {
      id: "world-2-5-q04",
      topicId: "world-2-5",
      concept: "travelers-sourcing",
      difficulty: "Core",
      skill: "sourcing",
      prompt: "Why do historians compare travel accounts with other evidence?",
      choices: [
        "Each traveler wrote with a purpose, so travel accounts have no value",
        "Each traveler saw only part of a region and wrote with a purpose",
        "Travelers usually copied their descriptions from earlier books",
        "Travel accounts were written by governments to hide information",
      ],
      correctAnswer: 1,
      explanation:
        "One traveler's route, interests, and audience limit how far an account can be generalized.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Purpose shapes an account, but historians still use travel writing as evidence.",
        "One traveler's route, interests, and audience limit how far an account can be generalized.",
        "Some travel writing borrowed from earlier works, but most accounts drew on real experience.",
        "Most famous accounts were personal narratives, not government cover-ups.",
      ],
      nearMissIndex: 0,
      distinguisher: "Limits narrow how a source is used; they do not make it worthless.",
    },
    {
      id: "world-2-5-q05",
      topicId: "world-2-5",
      concept: "beliefs-adaptation",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "The passage best supports which claim about Honavar?",
      choices: [
        "Most people in Honavar farmed rice and traded only within the region",
        "A Muslim trading port could exist under the overlordship of a non-Muslim ruler",
        "Honavar's schools taught boys but did not admit girls",
        "A Muslim trading port could exist only after its ruler conquered nearby kingdoms",
      ],
      correctAnswer: 1,
      explanation:
        "Honavar's Muslim sultan ruled under the suzerainty of Haryab, usually identified as Vijayanagara's Harihara.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "Ibn Battuta says the town lived “by maritime commerce” and had “no cultivated land.”",
        "Honavar's Muslim sultan ruled under the suzerainty of Haryab, usually identified as Vijayanagara's Harihara.",
        "He counted thirteen schools for girls and twenty-three for boys.",
        "The passage says the sultan was under another ruler's authority, not that he conquered neighbors.",
      ],
      nearMissIndex: 3,
      distinguisher: "Notice the political relationship in the last sentence.",
      stimulusBlocks: [excerpts.battutaHinawr],
    },
    {
      id: "world-2-5-q06",
      topicId: "world-2-5",
      concept: "cities-culture",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which development best explains the presence of Islamic learning in Honavar?",
      choices: [
        "The Abbasid caliphate's direct rule over the Malabar coast",
        "Mongol conquest of southern India, which imposed Islam on the coastal trading towns",
        "Zheng He's voyages, which founded Muslim schools in Indian ports",
        "Long-term Indian Ocean trade that linked western India with the Muslim world",
      ],
      correctAnswer: 3,
      explanation:
        "Muslim merchants had traded and settled along India's western coast for centuries.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "The Abbasids never ruled India's southwestern coast.",
        "The Mongols never conquered southern India.",
        "Zheng He sailed after 1405; Ibn Battuta visited around 1342.",
        "Muslim merchants had traded and settled along India's western coast for centuries.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Check dates and geography: trade came long before these other events.",
      stimulusBlocks: [excerpts.battutaHinawr],
    },
    {
      id: "world-2-5-q07",
      topicId: "world-2-5",
      concept: "travelers-sourcing",
      difficulty: "Challenge",
      skill: "sourcing",
      prompt:
        "Why does Ibn Battuta call the girls' schools “a thing which I have never seen elsewhere”?",
      choices: [
        "It differed from the norms of the many Muslim societies he had visited",
        "It differed from Islamic law, which he believed banned schools for girls",
        "He had never visited any Muslim society before arriving in India",
        "He wanted European readers to see India as more advanced than Europe",
      ],
      correctAnswer: 0,
      explanation:
        "Comparing with places across the Muslim world, he found so many girls' schools unusual.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "Comparing with places across the Muslim world, he found so many girls' schools unusual.",
        "He reports the schools approvingly; he does not suggest they broke Islamic law.",
        "He had traveled through North Africa, Arabia, Persia, and Central Asia before India.",
        "He dictated his account in Morocco for Muslim readers, not Europeans.",
      ],
      nearMissIndex: 1,
      distinguisher: "His comparison comes from his wide travel within the Muslim world.",
      stimulusBlocks: [excerpts.battutaHinawr],
    },
    {
      id: "world-2-5-q08",
      topicId: "world-2-5",
      concept: "knowledge-technology",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "How did translation in the Islamic world affect later European learning?",
      choices: [
        "Islamic scholars destroyed Greek texts, so Europe lost classical learning",
        "European scholars translated Chinese texts directly without intermediaries",
        "Arabic works on medicine and philosophy were later translated into Latin",
        "Arabic works were translated into Latin, but European scholars rejected them",
      ],
      correctAnswer: 2,
      explanation:
        "Works such as Ibn Sina's Canon of Medicine reached Europe in Latin and shaped university teaching.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Scholars in the Islamic world preserved and extended Greek learning.",
        "Very few European scholars read Chinese in this period.",
        "Works such as Ibn Sina's Canon of Medicine reached Europe in Latin and shaped university teaching.",
        "Translation happened, and European universities used these works for centuries.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Follow the chain: Greek to Arabic to Latin, with additions along the way.",
    },
    {
      id: "world-2-5-q09",
      topicId: "world-2-5",
      concept: "beliefs-adaptation",
      difficulty: "Apply",
      skill: "developments",
      prompt: "How did Hinduism and Buddhism shape Southeast Asian states?",
      choices: [
        "Chinese emperors required Southeast Asian rulers to adopt both religions",
        "Rulers adopted these traditions and copied Indian political borders exactly",
        "Indian armies conquered Southeast Asia and imposed both religions by force",
        "Rulers adopted these traditions in court rituals, temples, and ideas of kingship",
      ],
      correctAnswer: 3,
      explanation:
        "Courts such as Angkor and Majapahit used Hindu and Buddhist ideas and art to support royal authority.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "China did not impose Hinduism; these traditions came mainly from South Asia.",
        "Rulers adopted religious ideas, but they kept their own states and political structures.",
        "These traditions spread mainly through trade, priests, and local choice, not conquest.",
        "Courts such as Angkor and Majapahit used Hindu and Buddhist ideas and art to support royal authority.",
      ],
      nearMissIndex: 1,
      distinguisher: "Influence through choice and adaptation, not conquest.",
    },
    {
      id: "world-2-5-q10",
      topicId: "world-2-5",
      concept: "diffusion-not-uniformity",
      difficulty: "Core",
      skill: "claims-evidence",
      prompt: "The passage provides evidence that",
      choices: [
        "Muslim merchant communities in China were forced to keep their faith secret",
        "Chinese officials refused to let foreign merchants live in Quanzhou",
        "Muslim merchant communities lived and prospered in a Chinese port city",
        "Most merchants in Quanzhou had converted from Islam to Buddhism",
      ],
      correctAnswer: 2,
      explanation:
        "Ibn Battuta meets a qadi, a shaykh al-Islam, and wealthy Muslim merchants in Zaytun.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "These merchants had public religious leaders and recited the Koran openly.",
        "The passage describes foreign Muslim merchants settled in the city.",
        "Ibn Battuta meets a qadi, a shaykh al-Islam, and wealthy Muslim merchants in Zaytun.",
        "The merchants he describes remained devout Muslims.",
      ],
      nearMissIndex: 0,
      distinguisher: "The passage names Muslim institutions in the city.",
      stimulusBlocks: [excerpts.battutaZaytun],
    },
    {
      id: "world-2-5-q11",
      topicId: "world-2-5",
      concept: "diffusion-not-uniformity",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "Which broader development best explains the community Ibn Battuta describes?",
      choices: [
        "Zheng He's voyages, which brought Muslim merchants back to China",
        "Centuries of maritime trade that brought Arab and Persian merchants to China",
        "European demand for silk, which drew merchants to Quanzhou",
        "Mongol conquest of Persia, which forced Persian merchants to resettle in southern China",
      ],
      correctAnswer: 1,
      explanation:
        "Muslim merchants had sailed to southern Chinese ports since the Tang period, forming lasting communities.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "Zheng He sailed after Ibn Battuta's visit around 1345.",
        "Muslim merchants had sailed to southern Chinese ports since the Tang period, forming lasting communities.",
        "European demand was small compared with Asian trade, and these merchants were from the Muslim world.",
        "Mongol rule increased movement, but Muslim communities in Chinese ports were much older.",
      ],
      nearMissIndex: 3,
      distinguisher: "Look for the long-term pattern behind the scene.",
      stimulusBlocks: [excerpts.battutaZaytun],
    },
    {
      id: "world-2-5-q12",
      topicId: "world-2-5",
      concept: "travelers-sourcing",
      difficulty: "Apply",
      skill: "sourcing",
      prompt: "How does Ibn Battuta's purpose most likely shape this passage?",
      choices: [
        "He highlights the welcome and support Muslims gave a fellow Muslim abroad",
        "He wants to prove that he never borrowed money during his travels",
        "He highlights the welcome Muslims gave him to criticize Chinese officials",
        "He wants to show that Chinese merchants controlled trade with India",
      ],
      correctAnswer: 0,
      explanation:
        "His account stresses ties of faith that connected Muslims across great distances.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5", "battuta-gibb-1929"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
        {
          sourceId: "battuta-gibb-1929",
          locator: "ch",
        },
      ],
      choiceExplanations: [
        "His account stresses ties of faith that connected Muslims across great distances.",
        "He openly says he had borrowed from Sharaf ad-Din in India.",
        "The passage praises the Muslim community; it does not attack Chinese officials.",
        "The merchants named are Muslims from Tabriz and elsewhere, not Chinese.",
      ],
      nearMissIndex: 2,
      distinguisher: "What does the passage go out of its way to show?",
      stimulusBlocks: [excerpts.battutaZaytun],
    },
    {
      id: "world-2-5-q13",
      topicId: "world-2-5",
      concept: "knowledge-technology",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt: "How did the spread of gunpowder compare with the spread of papermaking?",
      choices: [
        "Both began in China and changed as other societies adapted them",
        "Both began in China, and other societies used them without change",
        "Both began in Europe and spread east along the Silk Roads",
        "Both spread only by sea through the Indian Ocean ports",
      ],
      correctAnswer: 0,
      explanation:
        "Each technology traveled west and was adapted for new uses, such as cannon and new paper industries.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Each technology traveled west and was adapted for new uses, such as cannon and new paper industries.",
        "Both began in China, but adopters modified them; that is the key point.",
        "Both originated in China, not Europe.",
        "Both moved largely overland through Central Asia and the Islamic world.",
      ],
      nearMissIndex: 1,
      distinguisher: "Same origin, both adapted.",
    },
    {
      id: "world-2-5-q14",
      topicId: "world-2-5",
      concept: "cities-culture",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt:
        "Which statement best describes change and continuity in trading cities, c. 1200–1450?",
      choices: [
        "Cities lost all cultural importance after the Mongol conquests",
        "Cities kept serving as cultural centers, though war and plague caused declines",
        "Cities were replaced by rural monasteries as centers of learning",
        "Cities kept growing steadily, because trade made them immune to disaster",
      ],
      correctAnswer: 1,
      explanation:
        "Urban culture persisted, but invasions and plague damaged cities such as Baghdad and many in Europe.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Many cities recovered or flourished under Mongol rule, such as Tabriz.",
        "Urban culture persisted, but invasions and plague damaged cities such as Baghdad and many in Europe.",
        "Monasteries mattered in some places, but cities remained centers of learning.",
        "Growth was uneven. Conquest, plague, and shifts in trade hurt many cities.",
      ],
      nearMissIndex: 3,
      distinguisher: "Continuity with interruptions.",
    },
    {
      id: "world-2-5-q15",
      topicId: "world-2-5",
      concept: "diffusion-not-uniformity",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt: "Which claim about cultural diffusion, c. 1200–1450, is most defensible?",
      choices: [
        "Diffusion happened only through military conquest, never through trade or travel",
        "Diffusion spread shared practices, so the regions involved became culturally identical over time",
        "Diffusion spread shared practices, but local societies reshaped what they adopted",
        "Diffusion was rare because most societies rejected foreign influences",
      ],
      correctAnswer: 2,
      explanation: "This claim recognizes connection and local adaptation together.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Trade, pilgrimage, and scholarship spread culture as much as conquest did.",
        "Shared practices spread, but regions stayed distinct.",
        "This claim recognizes connection and local adaptation together.",
        "Many examples, from Islam to paper, show widespread adoption.",
      ],
      nearMissIndex: 1,
      distinguisher: "Connection and difference together.",
    },
    {
      id: "world-2-5-q16",
      topicId: "world-2-5",
      concept: "travelers-sourcing",
      difficulty: "Core",
      skill: "sourcing",
      prompt:
        "Why is Margery Kempe's dictated account valuable to historians of this period?",
      choices: [
        "It records a laywoman's pilgrimage, so it shows how all medieval European women lived",
        "It was written by a royal official who recorded tax revenue along the Silk Roads",
        "It describes her own voyages with Zheng He's fleet across the Indian Ocean in 1420",
        "It records a laywoman's experience of pilgrimage, a perspective rarely written down",
      ],
      correctAnswer: 3,
      explanation:
        "Kempe, an English laywoman, described pilgrimages to Jerusalem, Rome, and Santiago de Compostela, a view few medieval sources preserve.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Her account is valuable because it is unusual; one woman's experience cannot represent all women.",
        "Kempe was not an official, and her travels were religious pilgrimages.",
        "Kempe traveled in Europe and to the Holy Land; she had no connection to Zheng He.",
        "Kempe, an English laywoman, described pilgrimages to Jerusalem, Rome, and Santiago de Compostela, a view few medieval sources preserve.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A rare perspective is valuable, and its rarity also limits how far it can be generalized.",
    },
    {
      id: "world-2-5-q17",
      topicId: "world-2-5",
      concept: "knowledge-technology",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "Which statement best describes the passage's main argument?",
      choices: [
        "Ideas spread on their own, without help from merchants, scholars, or officials",
        "Most societies rejected new ideas that arrived from distant regions of Afro-Eurasia",
        "Societies selected and reinterpreted what arrived, often creating something new",
        "Societies selected what arrived, but they copied those ideas without change",
      ],
      correctAnswer: 2,
      explanation:
        "The passage describes exchange as “translation rather than transfer.”",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The passage emphasizes the people who carried ideas.",
        "The passage gives examples of adoption and adaptation, not rejection.",
        "The passage describes exchange as “translation rather than transfer.”",
        "The passage stresses reinterpretation, not copying.",
      ],
      nearMissIndex: 3,
      distinguisher: "Translation versus transfer.",
      stimulusBlocks: [excerpts.originalCulturalDiffusion],
    },
    {
      id: "world-2-5-q18",
      topicId: "world-2-5",
      concept: "travelers-sourcing",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt: "Which example would best support the passage's argument?",
      choices: [
        "Monsoon winds reversing direction each season across the Indian Ocean",
        "Swahili towns importing Chinese porcelain without changing how it looked",
        "Mongol armies conquering Persia and ending the Abbasid caliphate in the 1250s",
        "Swahili mosques built in coral stone, combining Islamic and local forms",
      ],
      correctAnswer: 3,
      explanation:
        "These mosques show an imported faith expressed through local materials and building traditions.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "This is environmental knowledge, not cultural adaptation.",
        "Porcelain was imported, but unchanged goods show transfer, not translation.",
        "Conquest is relevant to exchange but does not show reinterpretation.",
        "These mosques show an imported faith expressed through local materials and building traditions.",
      ],
      nearMissIndex: 1,
      distinguisher: "The best evidence shows adaptation.",
      stimulusBlocks: [excerpts.originalCulturalDiffusion],
    },
    {
      id: "world-2-5-q19",
      topicId: "world-2-5",
      concept: "beliefs-adaptation",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "How did the spread of Islam in West Africa compare with its spread on the Swahili coast?",
      choices: [
        "Both spread through traders and elites, while many rural people kept local beliefs",
        "Both spread through traders, and both regions adopted Arabic as their main language",
        "Islam spread to West Africa by sea and to the Swahili coast across the Sahara",
        "Islam spread in both regions only after Mongol armies arrived",
      ],
      correctAnswer: 0,
      explanation:
        "In both regions Islam took root first in towns, courts, and merchant communities.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "In both regions Islam took root first in towns, courts, and merchant communities.",
        "Traders mattered in both, but local languages such as Swahili and Mande remained central.",
        "This reverses the routes. Islam reached West Africa across the Sahara and the Swahili coast by sea.",
        "Mongol armies never reached either region.",
      ],
      nearMissIndex: 1,
      distinguisher: "Name the shared pattern, then check each detail.",
    },
    {
      id: "world-2-5-q20",
      topicId: "world-2-5",
      concept: "travelers-sourcing",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt:
        "Which thesis best answers: “Explain how travelers' accounts help historians understand cultural exchange”?",
      choices: [
        "They mostly contain fiction and invented stories, so they are useless for understanding exchange",
        "They record encounters directly, but historians must weigh each traveler's purpose and limits",
        "They matter mainly because they were written by famous people whom readers already admired",
        "They record encounters directly, so they are the most reliable evidence historians have available",
      ],
      correctAnswer: 1,
      explanation: "This thesis explains their value and qualifies it with sourcing.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-5",
          locator: "Topic 2.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Accounts can contain errors, but many details are confirmed by other sources.",
        "This thesis explains their value and qualifies it with sourcing.",
        "Their value comes from the evidence they provide, not fame.",
        "Firsthand accounts are valuable, but not automatically more reliable than other evidence.",
      ],
      nearMissIndex: 3,
      distinguisher: "Value plus limits.",
    },
  ],
  quizzes: [
    {
      id: "world-2-5-quick",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-5",
      title: "Topic 5 quick check",
      quizType: "quick",
      questionIds: ["world-2-5-q01", "world-2-5-q02", "world-2-5-q03", "world-2-5-q04"],
    },
    {
      id: "world-2-5-quiz",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-5",
      title: "Cultural Consequences of Connectivity topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-2-5-q05",
        "world-2-5-q06",
        "world-2-5-q07",
        "world-2-5-q08",
        "world-2-5-q09",
        "world-2-5-q10",
        "world-2-5-q11",
        "world-2-5-q12",
        "world-2-5-q13",
        "world-2-5-q14",
        "world-2-5-q15",
        "world-2-5-q16",
      ],
    },
  ],
};

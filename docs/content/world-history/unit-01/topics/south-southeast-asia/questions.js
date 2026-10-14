// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-1-3-q1",
      topicId: "world-1-3",
      concept: "asia-beliefs",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt:
        "Why did conversion to Islam not necessarily remove a person’s low social status in South Asia?",
      choices: [
        "Islamic law in South Asia formally assigned converts to the caste of their ancestors",
        "Muslim rulers required converts to pay higher taxes than other subjects",
        "Local hierarchies also rested on occupation, wealth, and inherited community ties",
        "Converts were barred from mosques until their families had been Muslim for generations",
      ],
      correctAnswer: 2,
      explanation:
        "Status depended on more than religion. Occupation, wealth, and jati ties persisted after conversion.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Islam did not formally assign caste, but social practice often carried earlier hierarchies forward; that persistence is the point.",
        "The jizya fell on non-Muslims, not converts, so taxation does not explain lasting low status.",
        "Status depended on more than religion. Occupation, wealth, and jati ties persisted after conversion.",
        "No such general rule existed; converts joined Muslim worship.",
      ],
      nearMissIndex: 0,
      distinguisher: "Ask what else, besides religion, determined status.",
    },
    {
      id: "world-1-3-q2",
      topicId: "world-1-3",
      concept: "asia-states",
      difficulty: "Apply",
      skill: "developments",
      prompt:
        "What best explains the coexistence of the Delhi Sultanate, Rajput kingdoms, and Vijayanagara?",
      choices: [
        "Regional rulers kept separate power bases, and no one state could control the subcontinent",
        "The Delhi Sultanate appointed Rajput and Vijayanagara rulers as its provincial governors",
        "Religious law forbade Hindu and Muslim rulers from fighting one another",
        "Regional rulers kept separate power bases because Mongol rule had divided India into khanates",
      ],
      correctAnswer: 0,
      explanation:
        "Each relied on its own armies, revenue, and alliances, and none could absorb the others.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Each relied on its own armies, revenue, and alliances, and none could absorb the others.",
        "Rajput kingdoms and Vijayanagara were independent rivals, not sultanate provinces.",
        "These states did fight, and alliances crossed religious lines when politics required.",
        "Separate power bases are right, but the Mongols never conquered India; the sultanate repelled their invasions.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Fragmentation came from regional strength, not from an outside conqueror.",
    },
    {
      id: "world-1-3-q3",
      topicId: "world-1-3",
      concept: "asia-devotion",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt: "Which comparison of Bhakti and Sufi traditions is most defensible?",
      choices: [
        "Both spread mainly through the conquests of the Delhi Sultanate's armies",
        "Both emphasized personal devotion and abolished caste among their followers",
        "Both rejected the larger religions they grew from and formed new faiths",
        "Both emphasized personal devotion and often taught in local languages",
      ],
      correctAnswer: 3,
      explanation:
        "Each stressed a direct, devotional relationship with the divine and reached people beyond religious specialists.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Sufis traveled with or after armies at times, but both spread mainly through teachers and communities.",
        "Some Bhakti teachers criticized caste, but neither movement abolished hierarchy.",
        "Bhakti stayed within Hindu traditions and Sufism within Islam.",
        "Each stressed a direct, devotional relationship with the divine and reached people beyond religious specialists.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A shared emphasis does not mean a shared result such as ending caste.",
    },
    {
      id: "world-1-3-q4",
      topicId: "world-1-3",
      concept: "asia-sea",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "How could a ruler of a Southeast Asian port convert location into political power?",
      choices: [
        "By attracting ships and forcing every merchant to adopt the ruler's religion",
        "By attracting ships, collecting port revenue, and protecting merchants",
        "By closing the port to foreigners so local farmers controlled all trade",
        "By building a road network that replaced sea travel across the region",
      ],
      correctAnswer: 1,
      explanation:
        "Revenue and good relations with traders turned a strategic harbor into wealth and influence.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Attracting ships is right, but forced conversion would drive merchants to rival ports.",
        "Revenue and good relations with traders turned a strategic harbor into wealth and influence.",
        "Closing the port would remove the revenue that made location valuable.",
        "Maritime Southeast Asia depended on sea routes; roads could not replace them.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Location becomes power only when rulers organize revenue and keep merchants coming.",
    },
    {
      id: "world-1-3-q5",
      topicId: "world-1-3",
      concept: "asia-land",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "What do Khmer reservoirs and canals most directly help explain?",
      choices: [
        "The defensive moats that protected Angkor from all foreign invasions",
        "The farm surplus that supported Angkor's population and building projects",
        "The navigation routes that linked Angkor directly to Chinese ports",
        "The trade surplus that Angkor earned by exporting water to its neighbors",
      ],
      correctAnswer: 1,
      explanation:
        "Water management helped grow rice for a large population and freed labor for temples and the state.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Some waterworks had defensive uses, but Angkor was attacked and later abandoned as a capital.",
        "Water management helped grow rice for a large population and freed labor for temples and the state.",
        "The waterworks served agriculture, not direct sea access to China.",
        "Water supported farming at Angkor; it was not an export.",
      ],
      nearMissIndex: 3,
      distinguisher: "Follow water to rice, and rice to people and power.",
    },
    {
      id: "world-1-3-q6",
      topicId: "world-1-3",
      concept: "asia-land",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt:
        "A temple built for Vishnu later becomes a Buddhist place of worship. What does this change best illustrate?",
      choices: [
        "Buddhism and Hinduism were the same religion under different names",
        "Religious practice changed because Khmer rulers banned Hinduism by law",
        "Most residents of the region migrated away and were replaced by newcomers",
        "Religious practice could change while an important site kept its significance",
      ],
      correctAnswer: 3,
      explanation:
        "Angkor Wat's use changed, but it remained a major sacred and political site.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "They share some ideas but are distinct traditions.",
        "Royal patronage shifted toward Buddhism, but the change was gradual, not a legal ban.",
        "A change of worship does not show population replacement.",
        "Angkor Wat's use changed, but it remained a major sacred and political site.",
      ],
      nearMissIndex: 1,
      distinguisher: "Continuity of place, change of practice.",
    },
    {
      id: "world-1-3-q7",
      topicId: "world-1-3",
      concept: "asia-states",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "Why could temple patronage help Vijayanagara rulers maintain authority?",
      choices: [
        "It linked rulers to sacred tradition and to temples that controlled land and wealth",
        "It linked rulers to sacred tradition, which ended the need for armies or taxes",
        "It required all subjects to join a single temple and worship one deity",
        "It persuaded the Delhi Sultanate to recognize Vijayanagara's independence",
      ],
      correctAnswer: 0,
      explanation:
        "Temples were religious centers and major landholders, so patronage brought legitimacy and resources.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Temples were religious centers and major landholders, so patronage brought legitimacy and resources.",
        "Legitimacy mattered, but Vijayanagara also relied on armies and land revenue.",
        "Hindu practice was diverse; patronage did not impose a single cult.",
        "Vijayanagara's independence rested on military power, not sultanate recognition.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Patronage supported authority alongside, not instead of, force and revenue.",
    },
    {
      id: "world-1-3-q8",
      topicId: "world-1-3",
      concept: "asia-devotion",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "Which evidence would best support a claim that Buddhism connected politically separate societies?",
      choices: [
        "A single Buddhist king ruling over both Sri Lanka and mainland Southeast Asia at once",
        "Hindu temples built at Angkor in honor of Vishnu in the 1100s",
        "Monks traveling between Sri Lanka and mainland Southeast Asia for ordination",
        "Monks living in one Sukhothai monastery and teaching only local students",
      ],
      correctAnswer: 2,
      explanation:
        "Travel for study and ordination shows religious ties crossing political borders.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "No single king ruled both, which is why the claim stresses separate societies.",
        "Hindu temples do not provide evidence about Buddhist connections.",
        "Travel for study and ordination shows religious ties crossing political borders.",
        "Monastic life in one place shows local practice, not connections between societies.",
      ],
      nearMissIndex: 3,
      distinguisher: "Evidence must show a connection across borders.",
    },
    {
      id: "world-1-3-k1",
      topicId: "world-1-3",
      concept: "asia-devotion",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "What does Bhakti emphasize?",
      choices: [
        "Strict study of Sanskrit legal texts",
        "Ritual led only by Brahmin priests",
        "Withdrawal from society into monasteries",
        "Personal devotion to a deity",
      ],
      correctAnswer: 3,
      explanation:
        "Bhakti centers on a loving, personal relationship with a chosen deity.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Bhakti poets often wrote in local languages rather than Sanskrit.",
        "Bhakti often bypassed priestly ritual, using local languages and song.",
        "Monastic withdrawal is associated more with Buddhism.",
        "Bhakti centers on a loving, personal relationship with a chosen deity.",
      ],
      nearMissIndex: 1,
      distinguisher: "Bhakti means devotion.",
    },
    {
      id: "world-1-3-k2",
      topicId: "world-1-3",
      concept: "asia-sea",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "Which description of Majapahit is accurate?",
      choices: [
        "A Sumatran Buddhist maritime power with roots well before 1200",
        "A Muslim sultanate that controlled the Strait of Malacca",
        "A Javanese state with Hindu and Buddhist court traditions",
        "A Khmer kingdom centered on the temples of Angkor",
      ],
      correctAnswer: 2,
      explanation:
        "Majapahit, founded on Java in 1293, blended Hindu and Buddhist traditions with maritime ties.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "That describes Srivijaya, an earlier Buddhist power based on Sumatra.",
        "That describes Melaka in the 1400s.",
        "Majapahit, founded on Java in 1293, blended Hindu and Buddhist traditions with maritime ties.",
        "Angkor was the Khmer capital on the mainland, not on Java.",
      ],
      nearMissIndex: 0,
      distinguisher: "Separate the Southeast Asian states by place and period.",
    },
    {
      id: "world-1-3-k3",
      topicId: "world-1-3",
      concept: "asia-land",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "Which pair connects a place to a relevant institution?",
      choices: [
        "Vijayanagara and the Theravada monastic order",
        "Sinhala kingdoms and Buddhist monastic patronage",
        "Majapahit and the Delhi Sultanate's land revenue",
        "Sukhothai and Hindu temple patronage to Vishnu",
      ],
      correctAnswer: 1,
      explanation:
        "Sinhala rulers in Sri Lanka supported Buddhist monasteries and irrigation.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.3 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Vijayanagara patronized Hindu temples.",
        "Sinhala rulers in Sri Lanka supported Buddhist monasteries and irrigation.",
        "Majapahit was a Javanese state; the Delhi Sultanate ruled northern India.",
        "Sukhothai rulers supported Theravada Buddhism, not mainly Vishnu temples.",
      ],
      nearMissIndex: 3,
      distinguisher: "Match each state with its main religious institution.",
    },
    // BEGIN unit-01 practice test
    // Unit 1 Practice Test items (t-numbered): AP-style sets that each depend on one stimulus.
    {
      id: "world-1-3-t01",
      topicId: "world-1-3",
      concept: "asia-sea",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "According to the passage, Islam spread in Ferlec mainly through",
      choices: [
        "contact with Muslim merchants in the hill country",
        "the conquest of the kingdom by a Muslim army",
        "contact with Muslim merchants in the towns",
        "the orders of a ruler appointed by the Great Kaan",
      ],
      correctAnswer: 2,
      explanation:
        "Polo says Saracen merchants frequented Ferlec and converted the townspeople.",
      sourceIds: ["ced-topic-1-3", "polo-yule-1903"],
      choiceExplanations: [
        "Polo specifies “the townspeople only,” excluding the hill people.",
        "Polo names merchants, not an army, as the cause of conversion.",
        "Polo says Saracen merchants frequented Ferlec and converted the townspeople.",
        "The Great Kaan's men could not even reach these islands, according to the passage.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Merchants are the right agents, but Polo limits conversion to townspeople, not the hill people.",
      stimulusId: "polo-ferlec",
      stimulusBlocks: [excerpts.poloFerlec],
    },
    {
      id: "world-1-3-t02",
      topicId: "world-1-3",
      concept: "asia-sea",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which of the following best explains why the process described in the passage occurred in coastal towns first?",
      choices: [
        "Ports were visited regularly by merchants who belonged to Indian Ocean Muslim networks",
        "Coastal rulers were forced to convert by the Delhi Sultanate's navy",
        "Muslim scholars avoided inland areas because of strict local laws",
        "Ports were visited regularly by merchants who were required by law to convert local rulers",
      ],
      correctAnswer: 0,
      explanation:
        "Regular trade brought Muslim merchants and teachers to ports, where conversion could also ease commercial ties.",
      sourceIds: ["ced-topic-1-3", "polo-yule-1903"],
      choiceExplanations: [
        "Regular trade brought Muslim merchants and teachers to ports, where conversion could also ease commercial ties.",
        "The Delhi Sultanate was a land-based state in northern India and did not conquer Sumatra.",
        "The passage gives no evidence of such laws; access, not prohibition, explains the coastal pattern.",
        "Merchants spread Islam through contact and community, not under any requirement to convert rulers.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Merchant contact explains the pattern, but no rule required merchants to convert rulers; conversion was voluntary and gradual.",
      stimulusId: "polo-ferlec",
      stimulusBlocks: [excerpts.poloFerlec],
    },
    {
      id: "world-1-3-t03",
      topicId: "world-1-3",
      concept: "asia-states",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "Polo's description of Basma's relationship with the Great Kaan is best understood in the context of",
      choices: [
        "Chinese tribute relationships in which distant rulers paid heavy annual taxes",
        "the spread of Christianity among Southeast Asian islanders",
        "the Mongol conquest and direct rule of maritime Southeast Asia",
        "Chinese tribute relationships in which distant rulers sent gifts as a sign of respect",
      ],
      correctAnswer: 3,
      explanation:
        "Rulers declared themselves subjects and sent presents, a symbolic relationship common in Chinese diplomacy.",
      sourceIds: ["ced-topic-1-3", "polo-yule-1903"],
      choiceExplanations: [
        "The passage says Basma's people pay the Kaan no tribute.",
        "The passage mentions Islam and local beliefs, not Christianity.",
        "Polo says the Kaan's men could not reach Basma, so there was no direct rule.",
        "Rulers declared themselves subjects and sent presents, a symbolic relationship common in Chinese diplomacy.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Tribute relationships are the right context, but Polo says Basma pays no tribute, only sends curiosities as presents.",
      stimulusId: "polo-ferlec",
      stimulusBlocks: [excerpts.poloFerlec],
    },
    {
      id: "world-1-3-t04",
      topicId: "world-1-3",
      concept: "asia-devotion",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "The passage provides evidence for which of the following?",
      choices: [
        "Buddhist and Muslim pilgrims agreed that the mountain held the Buddha's tomb",
        "Buddhist and Muslim pilgrims both treated the same mountain as sacred",
        "Muslim rulers had forced Buddhists in Sri Lanka to abandon pilgrimage",
        "Christian missionaries had converted most of the people of Sri Lanka",
      ],
      correctAnswer: 1,
      explanation:
        "Polo says Idolaters (Buddhists) and Saracens (Muslims) both come on pilgrimage to the mountain.",
      sourceIds: ["ced-topic-1-3", "polo-yule-1903"],
      choiceExplanations: [
        "Muslims identified the site as Adam's tomb, not the Buddha's.",
        "Polo says Idolaters (Buddhists) and Saracens (Muslims) both come on pilgrimage to the mountain.",
        "The passage shows both groups making pilgrimages, not one forcing the other out.",
        "Polo compares the pilgrimage to a Christian shrine in Spain; he does not describe Christians in Sri Lanka.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Both groups revered the site, but Polo says each identified it differently: the Buddha for one, Adam for the other.",
      stimulusId: "polo-seilan",
      stimulusBlocks: [excerpts.poloSeilan],
    },
    {
      id: "world-1-3-t05",
      topicId: "world-1-3",
      concept: "asia-devotion",
      difficulty: "Apply",
      skill: "sourcing",
      prompt:
        "Polo's comparison of the pilgrimage to the shrine of Saint James in Gallicia most likely reflects",
      choices: [
        "his belief that Buddhism and Christianity were the same religion",
        "his effort to explain an unfamiliar practice to European readers",
        "his effort to convince Buddhists to visit Christian shrines",
        "his belief that pilgrimage was unknown in Europe",
      ],
      correctAnswer: 1,
      explanation:
        "Polo wrote for Europeans and used a familiar Christian pilgrimage to make the practice understandable.",
      sourceIds: ["ced-topic-1-3", "polo-yule-1903"],
      choiceExplanations: [
        "Polo still calls the Buddhists Idolaters, so he clearly saw the religions as different.",
        "Polo wrote for Europeans and used a familiar Christian pilgrimage to make the practice understandable.",
        "Polo's audience was European, not Buddhist.",
        "Polo's comparison only works because Europeans already knew pilgrimage well.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The comparison is about the practice of pilgrimage. Polo still calls the Buddhists “Idolaters,” so he did not think the religions were the same.",
      stimulusId: "polo-seilan",
      stimulusBlocks: [excerpts.poloSeilan],
    },
    {
      id: "world-1-3-t06",
      topicId: "world-1-3",
      concept: "asia-states",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Based on the passage, which of the following was a similarity between the Delhi Sultanate and the Vijayanagara Empire?",
      choices: [
        "Both converted most of their subjects to the rulers' religion",
        "Both were founded by Turkic and Afghan military elites",
        "Both relied on trade revenue rather than agricultural taxes",
        "Both relied on agricultural revenue to support their armies",
      ],
      correctAnswer: 3,
      explanation:
        "The Delhi sultans collected land revenue and Vijayanagara built power on agricultural revenue, each funding a large army.",
      sourceIds: ["ced-topic-1-3"],
      choiceExplanations: [
        "The passage says most of the Sultanate's subjects did not convert.",
        "Only the Delhi Sultanate was founded by Turkic and Afghan elites.",
        "Both used land revenue; trade was an addition, not a replacement.",
        "The Delhi sultans collected land revenue and Vijayanagara built power on agricultural revenue, each funding a large army.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Vijayanagara did profit from trade, but the passage says both states depended on land or agricultural revenue.",
      stimulusId: "original-south-asia-states",
      stimulusBlocks: [excerpts.originalSouthAsiaStates],
    },
    {
      id: "world-1-3-t07",
      topicId: "world-1-3",
      concept: "asia-states",
      difficulty: "Apply",
      skill: "developments",
      prompt:
        "The passage best supports which of the following conclusions about South Asia in this period?",
      choices: [
        "Political power was divided among rival states with different religious traditions",
        "The Delhi Sultanate unified the subcontinent under a single Muslim government",
        "Hindu temples lost their economic role after the arrival of Muslim rulers",
        "Political power was divided among states that all shared one religious tradition",
      ],
      correctAnswer: 0,
      explanation:
        "A Muslim-ruled sultanate in the north and a Hindu-patron empire in the south competed for power.",
      sourceIds: ["ced-topic-1-3"],
      choiceExplanations: [
        "A Muslim-ruled sultanate in the north and a Hindu-patron empire in the south competed for power.",
        "The passage stresses regional rivals and a separate southern empire, not unification.",
        "Vijayanagara temples remained centers of landholding and economic life.",
        "The two states had different ruling religions, so they did not share one tradition.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Power was divided, but the passage contrasts a Muslim-ruled sultanate with a Hindu-patron empire.",
      stimulusId: "original-south-asia-states",
      stimulusBlocks: [excerpts.originalSouthAsiaStates],
    },
    {
      id: "world-1-3-t08",
      topicId: "world-1-3",
      concept: "asia-states",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which of the following best explains why Vijayanagara rulers gave rich gifts to temples?",
      choices: [
        "Temples were the only institutions that could train soldiers",
        "Temple patronage strengthened rulers' claims to be descended from the Buddha himself",
        "Temple patronage strengthened rulers' legitimacy and ties to local economic life",
        "Temples were required by Delhi sultans to pay tribute on the rulers' behalf",
      ],
      correctAnswer: 2,
      explanation:
        "Supporting temples presented kings as protectors of Hindu tradition and linked them to centers of land and wealth.",
      sourceIds: ["ced-topic-1-3"],
      choiceExplanations: [
        "The passage describes temples as centers of worship and economic life, not military training.",
        "Vijayanagara rulers claimed to protect Hindu tradition, not descent from the Buddha.",
        "Supporting temples presented kings as protectors of Hindu tradition and linked them to centers of land and wealth.",
        "Vijayanagara was a rival of the Delhi Sultanate, not its tributary.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Patronage did support legitimacy, but Vijayanagara presented itself as protector of Hindu, not Buddhist, tradition.",
      stimulusId: "original-south-asia-states",
      stimulusBlocks: [excerpts.originalSouthAsiaStates],
    },
    // END unit-01 practice test
  ],
  quizzes: [
    {
      id: "world-1-3-quiz",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-3",
      title: "South and Southeast Asia topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-1-3-q1",
        "world-1-3-q2",
        "world-1-3-q3",
        "world-1-3-q4",
        "world-1-3-q5",
        "world-1-3-q6",
        "world-1-3-q7",
        "world-1-3-q8",
      ],
    },
    {
      id: "world-1-3-quick",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-3",
      title: "South and Southeast Asia quick practice",
      quizType: "quick",
      questionIds: ["world-1-3-k1", "world-1-3-k2", "world-1-3-k3"],
    },
  ],
};

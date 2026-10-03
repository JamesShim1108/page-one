// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.

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

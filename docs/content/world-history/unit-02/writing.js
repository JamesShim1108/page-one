// Unit 2 writing practice. SAQs follow the AP mix of primary-source,
// secondary-source, and no-stimulus questions. The DBQ uses verified
// public-domain excerpts from ../excerpts.js. Increment `version` when a
// prompt or its fields change enough to invalidate saved drafts.
import { excerpts } from "../excerpts.js";

const saqInstructions =
  "Answer all three parts. For each part, Answer the question directly, Prove it with specific historical evidence, and Explain how the evidence supports your answer. On the AP exam each part earns one point. This is self-assessment practice, not official College Board scoring.";

const saqNote =
  "Original Page One practice in AP short-answer format. Model answers show one strong response; other accurate, well-supported answers can earn the point.";

const saqScaffold = [
  {
    label: "Answer",
    text: "Respond directly to the task verb: identify, describe, or explain.",
  },
  { label: "Prove", text: "Name a specific person, place, institution, or development." },
  { label: "Explain", text: "Show how or why the evidence answers the question." },
];

const essayNote =
  "Original Page One practice. Rubric categories follow the structure of the College Board's AP history rubrics; scoring here is your own self-assessment, not an official score.";

const leqRubric = [
  {
    id: "thesis",
    label: "Thesis",
    points: 1,
    guidance:
      "Responds to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.",
  },
  {
    id: "context",
    label: "Contextualization",
    points: 1,
    guidance:
      "Describes a broader historical context relevant to the prompt: developments before, during, or continuing after the period.",
  },
  {
    id: "evidence",
    label: "Evidence",
    points: 2,
    guidance:
      "1 point: provides at least two specific historical examples relevant to the prompt. 2 points: uses specific and relevant examples to support an argument in response to the prompt.",
  },
  {
    id: "analysis",
    label: "Analysis and reasoning",
    points: 2,
    guidance:
      "1 point: uses comparison, causation, or continuity and change to frame or structure the argument. 2 points: demonstrates a complex understanding, for example by explaining multiple causes, weighing similarities and differences, or using evidence to qualify or modify the argument.",
  },
];

const leqScaffold = [
  { label: "Claim", text: "Answer the prompt and preview your line of reasoning." },
  {
    label: "Context",
    text: "Describe a broader development before or during the period.",
  },
  {
    label: "Evidence",
    text: "Use at least two specific examples, and explain each one.",
  },
  {
    label: "Reasoning",
    text: "Structure the essay around the reasoning process and qualify your claim.",
  },
];

const leqInstructions =
  "Develop an argument in one organized essay. Include a thesis, contextualization, specific evidence, and historical reasoning. This is untimed Unit 2 practice in AP long-essay format, not a full exam simulation.";

export const writingQuizzes = [
  {
    id: "world-2-saq-01",
    version: 2,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 SAQ 01",
    headline: "Paper money and the Yuan state",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.poloPaperMoney],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["P", "E"],
        prompt:
          "Identify ONE way the Yuan government described in the passage controlled commerce.",
        criteria: [
          "Names a specific policy described in the passage.",
          "Connects the policy to government control of trade, not just to trade in general.",
        ],
        model: {
          answer:
            "The Yuan government forced everyone in the empire to accept its paper money.",
          prove:
            "Polo writes that nobody “dares to refuse them on pain of death,” and that merchants bringing gold, silver, gems, or pearls could sell them only to the emperor.",
          explain:
            "Both rules made the state the authority over how people paid and who could buy the most valuable goods, so commerce flowed through the emperor's currency and court.",
        },
        alternatives:
          "The rule that precious goods could be sold only to the emperor also earns the point. A general statement such as “the government supported trade” does not identify how it controlled commerce.",
        review: [
          {
            topicId: "world-2-2",
            sectionId: "trade-communication",
            label: "Mongol trade policy",
          },
        ],
      },
      {
        id: "b",
        lenses: ["E", "T"],
        prompt:
          "Explain ONE way that commercial practices such as the one described in the passage made long-distance trade easier in the period 1200–1450.",
        criteria: [
          "Names a specific commercial practice of the period.",
          "Explains how it reduced a cost, risk, or difficulty of long-distance trade.",
        ],
        model: {
          answer:
            "Paper money and credit let merchants move value without carrying large amounts of heavy coin.",
          prove:
            "Polo notes that paper money was “vastly lighter to carry,” and earlier Chinese merchants had used flying cash to deposit money in one city and collect it in another; bills of exchange served a similar purpose for Muslim and Italian merchants.",
          explain:
            "Lighter and safer ways to pay lowered the risk of theft and the cost of transport, so long journeys became more profitable for more merchants.",
        },
        alternatives:
          "Bills of exchange, banking houses, or caravanserai that supported repeated travel can also work if the answer explains how they made long-distance trade easier.",
        review: [
          {
            topicId: "world-2-1",
            sectionId: "commercial-practices",
            label: "Commercial practices",
          },
        ],
      },
      {
        id: "c",
        lenses: ["C"],
        prompt:
          "Explain ONE way Marco Polo's point of view or purpose might affect the reliability of his description of Yuan paper money.",
        criteria: [
          "Identifies a specific feature of Polo's point of view, purpose, audience, or situation.",
          "Explains how that feature could make the description more or less reliable.",
        ],
        model: {
          answer:
            "Polo was writing to amaze European readers, so he may have made the system sound more successful than it was.",
          prove:
            "He describes notes accepted everywhere without complaint, yet in 1287 Kublai Khan issued a new currency, each note worth five of the old ones, which suggests the earlier notes had lost much of their value.",
          explain:
            "A merchant writing for readers who had never seen paper money had reasons to stress its marvels and leave out its problems, so historians should check his account against Chinese records.",
        },
        alternatives:
          "Answers can also explain that Polo saw the system as a foreigner close to the court and merchants, or that he dictated the book years after leaving China, relying on memory.",
        review: [
          {
            topicId: "world-2-5",
            sectionId: "travelers-sourcing",
            label: "Travelers as evidence",
          },
        ],
      },
    ],
    sourceIds: ["polo-yule-1903", "ced-topic-2-1", "ced-topic-2-2", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "polo-yule-1903", locator: "vol. 1, Book II, ch. 24 and note 1" },
      { sourceId: "ced-topic-2-1", locator: "Topic 2.1 learning objectives" },
    ],
  },
  {
    id: "world-2-saq-02",
    version: 2,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 SAQ 02",
    headline: "Interpreting the Mongol Empire",
    promptTitle: "Secondary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.originalMongolInterpretation],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["P"],
        prompt: "Identify ONE claim the author makes about the Mongol Empire.",
        criteria: [
          "States a claim the passage actually makes.",
          "Uses the passage's reasoning, not only a detail it mentions.",
        ],
        model: {
          answer:
            "The author claims that the Mongol Empire both destroyed cities and made Eurasia more connected.",
          prove:
            "The passage cites massacres such as Baghdad in 1258 alongside relay stations, protection for merchants, and experts moving between courts.",
          explain:
            "The author argues that these are “not opposites” and that a convincing account must “hold both together,” rejecting views of the Mongols as only destroyers or only builders.",
        },
        alternatives:
          "Identifying the narrower claim that recent historians stress Mongol connectivity, or that Mongol security rested on violence, also earns the point.",
        review: [
          {
            topicId: "world-2-2",
            sectionId: "costs-continuities",
            label: "Conquest and connection",
          },
        ],
      },
      {
        id: "b",
        lenses: ["C", "P"],
        prompt:
          "Provide ONE piece of historical evidence, not mentioned in the passage, that supports the claim that Mongol rule increased connections across Eurasia.",
        criteria: [
          "Uses specific evidence that the passage does not already mention.",
          "Explains how the evidence shows increased connection.",
        ],
        model: {
          answer:
            "Mongol rule made it possible for envoys to travel across all of Eurasia.",
          prove:
            "Rabban Sauma, a Christian monk from Yuan China, traveled west and in 1287–1288 served as an envoy of the Ilkhan of Persia to Constantinople, Rome, and Paris.",
          explain:
            "A traveler from China reaching European courts as a Mongol envoy shows how linked Mongol states opened routes for diplomacy as well as trade.",
        },
        alternatives:
          "Marco Polo's journey to Kublai Khan's court, Ibn Battuta's travel to Yuan China, or the Ilkhanate's attempt to introduce Chinese-style paper money in 1294 can also work. Relay stations and moving artisans are already in the passage.",
        review: [
          {
            topicId: "world-2-2",
            sectionId: "cultural-transfer",
            label: "Ideas moved with people",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P"],
        prompt:
          "Provide ONE piece of historical evidence, not mentioned in the passage, that complicates the claim that Mongol rule made travel across Eurasia more secure.",
        criteria: [
          "Uses specific evidence that the passage does not already mention.",
          "Explains how the evidence limits or complicates the claim about security.",
        ],
        model: {
          answer:
            "Wars among Mongol rulers could close the very routes the empire protected.",
          prove:
            "After the empire divided, the Golden Horde and the Ilkhanate fought each other from the 1260s, and Kaidu waged long wars against Kublai Khan in Central Asia.",
          explain:
            "Security depended on cooperation among rival khanates, so the protection merchants enjoyed varied by time and region rather than covering all of Eurasia.",
        },
        alternatives:
          "The collapse of Mongol authority in the mid-1300s, which made overland routes more dangerous, or the spread of plague along Mongol-linked routes, can also complicate the claim if clearly explained.",
        review: [
          {
            topicId: "world-2-2",
            sectionId: "khanates-rule",
            label: "One empire, several khanates",
          },
        ],
      },
    ],
    sourceIds: ["ced-topic-2-2", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-2", locator: "Topic 2.2 learning objectives" },
    ],
  },
  {
    id: "world-2-saq-03",
    version: 2,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 SAQ 03",
    headline: "Indian Ocean exchange",
    promptTitle: "Short-answer question without a source",
    prompt:
      "Answer all parts of the question. Use evidence from the period c. 1200 to c. 1450.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["In", "T"],
        prompt:
          "Describe ONE way environmental knowledge shaped trade in the Indian Ocean.",
        criteria: [
          "Names specific environmental knowledge.",
          "Describes its effect on how trade was carried out.",
        ],
        model: {
          answer:
            "Knowledge of the monsoon winds set the schedule of Indian Ocean trade.",
          prove:
            "Because the winds blow from the southwest in summer and from the northeast in winter, ships sailed out on one monsoon and returned on the other.",
          explain:
            "Sailors who understood the pattern could plan predictable round trips, which made regular long-distance trade possible.",
        },
        alternatives:
          "Navigational knowledge of stars and coastlines, used with the astrolabe and compass, can also work.",
        review: [
          {
            topicId: "world-2-3",
            sectionId: "monsoon-navigation",
            label: "Reading the ocean's seasons",
          },
        ],
      },
      {
        id: "b",
        lenses: ["S", "C"],
        prompt: "Explain ONE way merchant diasporas affected Indian Ocean port cities.",
        criteria: [
          "Names a specific diaspora community or port.",
          "Explains a cultural, social, or economic effect on the city.",
        ],
        model: {
          answer: "Merchant diasporas brought Islam and new customs into port cities.",
          prove:
            "Arab and Persian merchants settled in Swahili cities such as Kilwa and married into local families, and Swahili developed as a Bantu language with many Arabic loanwords.",
          explain:
            "Because merchants stayed for months or settled permanently while waiting for the winds, cultural exchange became part of everyday life in the ports rather than a brief contact.",
        },
        alternatives:
          "Chinese merchant communities in Southeast Asia, or Muslim communities in Calicut and Quanzhou that built mosques and appointed judges, can also work.",
        review: [
          {
            topicId: "world-2-3",
            sectionId: "diaspora-communities",
            label: "Communities across the water",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P", "E"],
        prompt: "Explain ONE way a state used Indian Ocean trade to increase its power.",
        criteria: [
          "Names a specific state.",
          "Explains how trade added to that state's revenue, prestige, or control.",
        ],
        model: {
          answer:
            "Malacca used its control of a strategic strait to become a powerful sultanate.",
          prove:
            "In the 1400s Malacca's rulers taxed ships passing between the Indian Ocean and the South China Sea and used naval forces to protect traffic.",
          explain:
            "Customs revenue from a passage that ships could not easily avoid paid for the navy and court that made Malacca a regional power.",
        },
        alternatives:
          "Swahili city-states taxing trade in gold and ivory, or the Ming using Zheng He's voyages to gain tribute and prestige, can also work.",
        review: [
          {
            topicId: "world-2-3",
            sectionId: "states-revenue",
            label: "Trade could build states",
          },
        ],
      },
    ],
    sourceIds: ["ced-topic-2-3", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-3", locator: "Topic 2.3 learning objectives" },
    ],
  },
  {
    id: "world-2-saq-04",
    version: 2,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 SAQ 04",
    headline: "Ibn Battuta in Mali",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.battutaMali],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["C"],
        prompt:
          "Identify ONE piece of evidence from the passage that shows Mali's connection to the wider Islamic world.",
        criteria: [
          "Points to a specific detail in the passage.",
          "Connects the detail to Islamic practice or learning shared beyond West Africa.",
        ],
        model: {
          answer:
            "The passage shows that Islamic religious practice was widespread in Mali.",
          prove:
            "Ibn Battuta says Malians were “careful to observe the hours of prayer” and showed “zeal for learning the Koran by heart.”",
          explain:
            "Regular prayer and Quranic study linked Mali's towns to the religion and scholarship of North Africa and the Middle East.",
        },
        alternatives:
          "The protection of foreign merchants' property, held for a “rightful heir,” can also work if linked to ties with North African and Arab merchants.",
        review: [
          {
            topicId: "world-2-4",
            sectionId: "musa-learning",
            label: "Mansa Musa and learning",
          },
        ],
      },
      {
        id: "b",
        lenses: ["E", "P"],
        prompt:
          "Explain ONE way trans-Saharan trade contributed to the conditions Ibn Battuta describes.",
        criteria: [
          "Uses specific evidence about trans-Saharan trade.",
          "Explains how it produced security, wealth, or Islamic practice in Mali.",
        ],
        model: {
          answer:
            "Trade gave Mali's rulers the wealth to keep order and brought Muslim merchants and scholars into the empire.",
          prove:
            "Caravans carried gold north and salt south across the Sahara; Mali's rulers taxed this trade, and Mansa Musa used his wealth to support mosques and scholars in Timbuktu.",
          explain:
            "Trade revenue supported the authority behind the “complete security” Ibn Battuta praises, while merchants and scholars spread the Islamic practice he describes.",
        },
        alternatives:
          "Answers can also explain that rulers protected merchants because trade revenue depended on safe routes.",
        review: [
          {
            topicId: "world-2-4",
            sectionId: "mali-state-trade",
            label: "Mali and the political economy of trade",
          },
        ],
      },
      {
        id: "c",
        lenses: ["C", "S"],
        prompt:
          "Explain ONE way Ibn Battuta's background affected his description of Mali.",
        criteria: [
          "Identifies a specific aspect of his background, purpose, or audience.",
          "Explains how it shaped what he praised, criticized, or noticed.",
        ],
        model: {
          answer:
            "As a Muslim legal scholar from Morocco, Ibn Battuta judged Mali by the standards of his own Islamic society.",
          prove:
            "He praises prayer and Quranic study but lists as “bad qualities” court customs such as putting dust on one's head as a sign of respect.",
          explain:
            "Both his praise and his criticism follow North African Islamic norms, so the passage shows what a visiting scholar valued as well as what Malians did.",
        },
        alternatives:
          "Answers can also note that he saw mainly towns and the court, or that he dictated his account after returning to Morocco for Muslim readers there.",
        review: [
          {
            topicId: "world-2-4",
            sectionId: "accounts-local-life",
            label: "Reading traveler accounts",
          },
        ],
      },
    ],
    sourceIds: ["battuta-gibb-1929", "ced-topic-2-4", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "battuta-gibb-1929", locator: "ch. 14, Mali; scan pp. 351–352" },
      { sourceId: "ced-topic-2-4", locator: "Topic 2.4 learning objectives" },
    ],
  },
  {
    id: "world-2-saq-05",
    version: 2,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 SAQ 05",
    headline: "Two travelers in Quanzhou",
    promptTitle: "Paired primary-source short-answer question",
    prompt: "Use the two passages below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.poloZayton, excerpts.battutaZaytun],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["E"],
        prompt:
          "Identify ONE similarity in how the two passages portray Quanzhou (Zayton).",
        criteria: [
          "Names a feature both passages share.",
          "Supports it with a detail from each passage.",
        ],
        model: {
          answer:
            "Both passages portray Quanzhou as a port connected to distant regions.",
          prove:
            "Polo says the ships of India brought spices there, and Ibn Battuta meets a merchant from Tabriz whom he had borrowed from in India.",
          explain:
            "Both show a city tied into Indian Ocean trade that reached far beyond China.",
        },
        alternatives:
          "Noting that both describe wealthy merchants, or that both show foreigners doing business in the city, also works with support from each passage.",
        review: [
          {
            topicId: "world-2-3",
            sectionId: "ports-products",
            label: "Specialized goods and ports",
          },
        ],
      },
      {
        id: "b",
        lenses: ["C"],
        prompt:
          "Explain ONE way the authors' different backgrounds shaped what each passage emphasizes.",
        criteria: [
          "Identifies a relevant feature of each author's background or purpose.",
          "Connects each to a specific emphasis in that author's passage.",
        ],
        model: {
          answer:
            "Polo, a Venetian merchant, emphasizes trade volume and revenue, while Ibn Battuta, a Muslim scholar, emphasizes the Muslim community and its religious life.",
          prove:
            "Polo compares pepper shipments with those to Alexandria and reports the emperor's ten percent duty; Ibn Battuta names the qadi and the shaykh al-Islam and notes a merchant who recited the Koran.",
          explain:
            "Each writer noticed what his own experience and readers valued, so together the passages give a fuller picture of the port than either does alone.",
        },
        alternatives:
          "Answers can also explain audience: Polo wrote for Christian Europeans who knew Alexandria, while Ibn Battuta wrote for Muslim readers in Morocco.",
        review: [
          {
            topicId: "world-2-5",
            sectionId: "travelers-sourcing",
            label: "Travelers are evidence with viewpoints",
          },
        ],
      },
      {
        id: "c",
        lenses: ["E", "S"],
        prompt:
          "Explain ONE way these passages reflect broader patterns of exchange in the period 1200–1450.",
        criteria: [
          "Names a broader pattern beyond Quanzhou.",
          "Uses specific evidence from another place or development.",
        ],
        model: {
          answer:
            "The passages show how merchant diasporas made long-distance trade work.",
          prove:
            "Muslim merchants had lived in Chinese ports since the Tang dynasty, and similar communities existed in Calicut, Kilwa, and Malacca.",
          explain:
            "Shared religion, family ties, and credit, like the loan Ibn Battuta mentions, built the trust that let merchants trade across thousands of miles.",
        },
        alternatives:
          "Answers can also connect Polo's account of import duties to other states that taxed trade, such as Malacca or Mali.",
        review: [
          {
            topicId: "world-2-3",
            sectionId: "diaspora-communities",
            label: "Communities across the water",
          },
        ],
      },
    ],
    sourceIds: ["polo-yule-1903", "battuta-gibb-1929", "ced-topic-2-3", "ced-topic-2-5"],
    sourceLocators: [
      { sourceId: "polo-yule-1903", locator: "vol. 2, Book II, ch. 82" },
      { sourceId: "battuta-gibb-1929", locator: "ch. 12, Zaytun; scan p. 310" },
    ],
  },
  {
    id: "world-2-saq-06",
    version: 2,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 SAQ 06",
    headline: "The plague and its consequences",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.boccaccioSociety],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["S"],
        prompt: "Identify ONE social effect of the plague described in the passage.",
        criteria: [
          "Names a social effect the passage describes.",
          "Supports it with a detail from the passage.",
        ],
        model: {
          answer: "The plague left many sick people without care.",
          prove:
            "Boccaccio says the sick had no help except “the charity of friends (and of these there were few)” or servants drawn by “high and extravagant wage.”",
          explain:
            "Fear of contagion weakened ordinary obligations of care within families and communities.",
        },
        alternatives:
          "Farmers dying “without succour of physician or aid of servitor” also earns the point.",
        review: [
          {
            topicId: "world-2-6",
            sectionId: "demographic-economic",
            label: "Demographic shocks changed labor",
          },
        ],
      },
      {
        id: "b",
        lenses: ["E", "S"],
        prompt:
          "Explain ONE economic effect of the plague in Afro-Eurasia in the period c. 1340 to c. 1450.",
        criteria: [
          "Names a specific economic effect in a specific region.",
          "Explains the mechanism linking population loss to that effect.",
        ],
        model: {
          answer: "In parts of western Europe, the plague raised the value of labor.",
          prove:
            "With so many workers dead, survivors demanded higher wages, and England's government responded with the Statute of Labourers in 1351 to hold wages at earlier levels.",
          explain:
            "A sudden labor shortage gave workers bargaining power, which elites tried to limit through law, helping lead to conflicts such as the English Peasants' Revolt of 1381.",
        },
        alternatives:
          "Falling farm production and tax revenue in Mamluk Egypt, or the abandonment of villages in parts of Europe, can also work.",
        review: [
          {
            topicId: "world-2-6",
            sectionId: "demographic-economic",
            label: "Demographic shocks changed labor",
          },
        ],
      },
      {
        id: "c",
        lenses: ["In", "E"],
        prompt: "Explain ONE way trade networks contributed to the spread of the plague.",
        criteria: [
          "Names a specific route, port, or form of transport.",
          "Explains how movement along it spread the disease.",
        ],
        model: {
          answer:
            "Ships and caravans carried infected rats and fleas along trade routes.",
          prove:
            "The plague reached the Black Sea port of Caffa by 1346, and Genoese ships brought it from the Black Sea to Sicily and Italy in 1347.",
          explain:
            "Busy routes linking Mongol-ruled Asia to Mediterranean ports let the disease travel thousands of miles within a few years.",
        },
        alternatives:
          "Answers can also explain how caravan routes or the movement of armies spread the disease overland.",
        review: [
          {
            topicId: "world-2-6",
            sectionId: "pathogen-networks",
            label: "Pathogens moved with mobility",
          },
        ],
      },
    ],
    sourceIds: ["boccaccio-payne-1886", "ced-topic-2-6", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "boccaccio-payne-1886", locator: "First Day, introduction" },
      { sourceId: "ced-topic-2-6", locator: "Topic 2.6 learning objectives" },
    ],
  },
  {
    id: "world-2-saq-07",
    version: 2,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 SAQ 07",
    headline: "Comparing land and sea networks",
    promptTitle: "Short-answer question without a source",
    prompt:
      "Answer all parts of the question. Use evidence from the period c. 1200 to c. 1450.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["C"],
        prompt:
          "Identify ONE similarity between the Silk Roads and Indian Ocean trade networks in the period 1200–1450.",
        criteria: [
          "Names a feature shared by both networks.",
          "Supports it with evidence from each network.",
        ],
        model: {
          answer: "Both networks spread religions along with goods.",
          prove:
            "Islam and Buddhism traveled the Silk Roads into Central Asia and China, while Islam spread by sea to Swahili and Southeast Asian ports.",
          explain:
            "In both networks, merchants and teachers who traveled for trade carried beliefs that local communities adopted and adapted.",
        },
        alternatives:
          "Both carrying luxury goods such as silk and spices, or both depending on trading cities as service nodes, also earns the point.",
        review: [
          {
            topicId: "world-2-7",
            sectionId: "shared-causes",
            label: "Shared causes and effects",
          },
        ],
      },
      {
        id: "b",
        lenses: ["E", "T"],
        prompt: "Explain ONE difference between the two networks in transport or goods.",
        criteria: [
          "States a specific difference with evidence from both networks.",
          "Explains the consequence of that difference for trade.",
        ],
        model: {
          answer:
            "Indian Ocean ships could carry bulkier, cheaper goods than Silk Roads caravans.",
          prove:
            "Ships moved cargoes such as cotton cloth, timber, and grain, while caravans of camels and horses concentrated on light, valuable goods such as silk.",
          explain:
            "Because sea transport carried more for its cost, the Indian Ocean could support trade in everyday goods as well as luxuries.",
        },
        alternatives:
          "A difference in the environmental knowledge each required, monsoon winds versus oases and mountain passes, can also work.",
        review: [
          {
            topicId: "world-2-7",
            sectionId: "route-differences",
            label: "Geography changes the route",
          },
        ],
      },
      {
        id: "c",
        lenses: ["In"],
        prompt: "Explain ONE reason for the difference you described in part B.",
        criteria: [
          "Gives a specific cause for the difference.",
          "Explains how the cause produced it.",
        ],
        model: {
          answer:
            "Geography made sea transport cheaper per unit of cargo than overland transport.",
          prove:
            "A single ship using the monsoon winds could carry far more than a caravan, which needed animals, fodder, water, and payments at each oasis.",
          explain:
            "Lower costs per load meant that goods of modest value could still be traded profitably by sea but not across deserts and mountains.",
        },
        alternatives:
          "If part B compared environmental knowledge, a reason can explain how wind patterns and desert water sources created different planning needs.",
        review: [
          {
            topicId: "world-2-7",
            sectionId: "route-differences",
            label: "Geography changes the route",
          },
        ],
      },
    ],
    sourceIds: ["ced-topic-2-7", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-7", locator: "Topic 2.7 learning objectives" },
    ],
  },
  {
    id: "world-2-leq-comparison",
    version: 1,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 LEQ: Comparing networks",
    headline: "Comparing networks",
    promptTitle: "Long essay question",
    prompt:
      "Evaluate the similarities and differences in how two networks of exchange shaped economic and cultural life from 1200 to 1450.",
    instructions: leqInstructions,
    note: essayNote,
    exerciseType: "leq",
    sourceIds: ["ced-topic-2-7", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-7", locator: "Topic 2.7 learning objectives" },
    ],
    responseFields: [
      {
        id: "outline",
        label: "Optional outline",
        prompt: "Plan your claim, context, evidence, and reasoning before drafting.",
        required: false,
        rows: 6,
        help: "Optional planning notes; the essay is the required response.",
        review: [
          {
            topicId: "world-2-7",
            sectionId: "comparison-framework",
            label: "How to compare historically",
          },
        ],
      },
      {
        id: "essay",
        label: "Essay response",
        prompt:
          "Write the full essay. Make the line of reasoning visible and explain why each example supports the claim.",
        required: true,
        rows: 16,
        help: "Informational word count only. No timer or automatic grading.",
        review: [
          {
            topicId: "world-2-7",
            sectionId: "arguing-with-evidence",
            label: "From comparison to argument",
          },
        ],
      },
    ],
    rubric: leqRubric,
    scaffold: leqScaffold,
    modelResponse:
      "Long before 1200, merchants crossed the Sahara by camel and sailed the Indian Ocean with the monsoon winds. In the centuries after 1200, both networks grew as states such as Mali and the Swahili city-states drew revenue from trade and as Islam, already established in North Africa and Arabia, spread along commercial routes.\n\nThe trans-Saharan and Indian Ocean networks shaped economic and cultural life in similar ways, enriching trade-based states and spreading Islam among merchants and rulers. However, the Indian Ocean's maritime geography produced more diverse port communities and a broader range of goods than the desert routes.\n\nEconomically, both networks allowed states to grow rich by controlling and taxing trade. Mali's rulers taxed the gold that moved north and the salt that moved south, and Mansa Musa's pilgrimage of 1324–1325 displayed wealth so great that it was remembered in Cairo for years. On the Swahili coast, Kilwa grew wealthy as a link between Indian Ocean merchants and the gold of the southern African interior. In both cases, rulers gained power not by producing most goods themselves but by controlling where goods changed hands.\n\nCulturally, both networks spread Islam first among elites and traders. Muslim merchants and scholars crossed the Sahara, and by the 1300s Timbuktu had become a center of Islamic learning supported by Mali's rulers. Along the Swahili coast, mosques were built in coral stone, and Swahili absorbed many Arabic words. Yet in both regions many rural people kept local religious practices, so Islam's spread was real but uneven.\n\nThe networks differed in what geography made possible. Ships carried far larger loads than camel caravans, so Indian Ocean trade included bulk goods such as cotton cloth and timber, while trans-Saharan trade concentrated on gold, salt, and other goods valuable enough to justify desert transport. The monsoon calendar also kept merchants in port for months, producing diaspora communities of Arabs, Persians, Indians, and Chinese in cities from Kilwa to Malacca. Caravan cities such as Timbuktu were cosmopolitan too, but they drew mainly on North African and West African traders.\n\nIn conclusion, both networks tied economic power to the control of trade and spread Islam through merchants, but the Indian Ocean's maritime environment created a wider mix of goods and peoples than the desert routes could support.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes earlier trade and the spread of Islam before 1200, setting up the comparison.",
      },
      {
        label: "Thesis",
        text: "The second paragraph names a similarity and a difference and gives reasons for each, establishing a line of reasoning.",
      },
      {
        label: "Evidence",
        text: "Specific examples (Mali's gold and salt taxes, Mansa Musa's pilgrimage, Kilwa, Timbuktu, coral-stone mosques, Swahili vocabulary) support the argument rather than being listed.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay is organized by comparison and explains why the networks differed. Noting that Islam's spread was uneven, and that caravan cities were also cosmopolitan, qualifies the argument and shows complexity.",
      },
    ],
    alternateModel:
      "A different strong essay could compare the Silk Roads and the Indian Ocean, arguing that both depended on state protection but that Mongol political unity mattered more to overland trade than to maritime trade, which relied on many small states.",
    commonErrors: [
      "Describing one network, then the other, without ever making a direct comparison.",
      "Listing famous examples without explaining what they show.",
      "Treating the networks as sealed systems that never overlapped.",
      "Using post-1450 European voyages as the main evidence.",
    ],
  },
  {
    id: "world-2-leq-causation",
    version: 1,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 LEQ: Causes of exchange growth",
    headline: "Causes of exchange growth",
    promptTitle: "Long essay question",
    prompt:
      "Evaluate the most important causes of expanding exchange across Afro-Eurasia from 1200 to 1450.",
    instructions: leqInstructions,
    note: essayNote,
    exerciseType: "leq",
    sourceIds: ["ced-topic-2-1", "ced-topic-2-2", "ced-topic-2-3", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-1", locator: "Topic 2.1 learning objectives" },
    ],
    responseFields: [
      {
        id: "outline",
        label: "Optional outline",
        prompt: "Plan your claim, context, evidence, and reasoning before drafting.",
        required: false,
        rows: 6,
        help: "Optional planning notes; the essay is the required response.",
        review: [
          {
            topicId: "world-2-1",
            sectionId: "trade-growth",
            label: "Why exchange grew after 1200",
          },
        ],
      },
      {
        id: "essay",
        label: "Essay response",
        prompt:
          "Write the full essay. Make the line of reasoning visible and explain why each example supports the claim.",
        required: true,
        rows: 16,
        help: "Informational word count only. No timer or automatic grading.",
        review: [
          {
            topicId: "world-2-7",
            sectionId: "shared-causes",
            label: "Shared causes and effects",
          },
        ],
      },
    ],
    rubric: leqRubric,
    scaffold: leqScaffold,
    modelResponse:
      "Before 1200, the Tang dynasty and the Abbasid caliphate had built routes, cities, and commercial habits that connected much of Asia. By the 1100s both had weakened or fallen, leaving trade to smaller states and to merchant communities that kept older routes alive.\n\nAlthough demand and new technologies made long-distance travel more practical, the most important cause of expanding exchange between 1200 and 1450 was the protection and revenue-seeking of states, because rulers who profited from trade had strong reasons to keep routes open and safe.\n\nThe clearest example is the Mongol Empire. After conquering much of Eurasia in the 1200s, Mongol rulers maintained the yam system of relay stations and protected merchants traveling between China and Persia. Under Kublai Khan, the Yuan state required its paper money to be accepted throughout the empire and, according to Marco Polo, collected a ten percent duty on imports at Quanzhou. A state that profited from trade this directly had every reason to protect it, and safer roads drew more merchants onto long routes.\n\nThe same logic drove expansion at sea and across the desert. In the 1400s Malacca's rulers taxed ships passing through the Strait of Malacca and used naval power to protect traffic, turning location into wealth. In West Africa, Mali's rulers taxed the gold and salt trade, and Ibn Battuta reported that travelers had nothing to fear from robbers there. In each case, a ruler's need for revenue made trade safer.\n\nDemand and technology mattered, but mostly where states made them usable. Growing populations in Song China and elsewhere raised demand for spices, silk, and porcelain. The compass, the astrolabe, and lateen-rigged ships helped Indian Ocean sailors, and load-bearing camel saddles let caravans carry heavy goods across the Sahara. Credit tools such as flying cash and bills of exchange reduced the risk of carrying coin. Yet many of these tools were centuries old; trade grew fastest when political conditions let merchants use them regularly.\n\nThe importance of states is clearest when protection failed. When Mongol khanates fought one another, envoys found roads closed, and after Mongol authority collapsed in the mid-1300s overland routes became more dangerous. Exchange continued, especially by sea, but it shifted toward routes that other states still protected.\n\nIn conclusion, demand and technology made expanding exchange possible, but states that protected and taxed trade turned that possibility into sustained growth.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The opening explains the earlier Tang and Abbasid networks and their decline, which helps explain why new states could expand trade after 1200.",
      },
      {
        label: "Thesis",
        text: "The thesis ranks causes and gives a reason, so it makes a defensible, arguable claim with a line of reasoning.",
      },
      {
        label: "Evidence",
        text: "The yam system, Yuan paper money and import duties, Malacca, and Mali are specific and used to support the claim about states.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay explains causation, weighs state protection against demand and technology, and uses the failure of Mongol protection to test its own argument. That weighing earns the complexity point.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that demand was most important, using the commercial growth of Song China and the spice trade, while showing that states and technology responded to that demand.",
    commonErrors: [
      "Listing causes without arguing which mattered most or why.",
      "Giving “trade increased” as a cause of trade increasing.",
      "Claiming the Mongols created trade routes that existed for centuries.",
      "Using post-1450 European voyages as the main evidence.",
    ],
  },
  {
    id: "world-2-leq-continuity",
    version: 1,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 LEQ: Continuity and change",
    headline: "Continuity and change",
    promptTitle: "Long essay question",
    prompt:
      "Evaluate the extent to which expanding connectivity changed societies while older institutions and practices persisted from 1200 to 1450.",
    instructions: leqInstructions,
    note: essayNote,
    exerciseType: "leq",
    sourceIds: ["ced-topic-2-5", "ced-topic-2-6", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-5", locator: "Topic 2.5 learning objectives" },
    ],
    responseFields: [
      {
        id: "outline",
        label: "Optional outline",
        prompt: "Plan your claim, context, evidence, and reasoning before drafting.",
        required: false,
        rows: 6,
        help: "Optional planning notes; the essay is the required response.",
        review: [
          {
            topicId: "world-2-5",
            sectionId: "diffusion-not-uniformity",
            label: "Connected does not mean identical",
          },
        ],
      },
      {
        id: "essay",
        label: "Essay response",
        prompt:
          "Write the full essay. Make the line of reasoning visible and explain why each example supports the claim.",
        required: true,
        rows: 16,
        help: "Informational word count only. No timer or automatic grading.",
        review: [
          {
            topicId: "world-2-6",
            sectionId: "demographic-economic",
            label: "Demographic shocks changed labor",
          },
        ],
      },
    ],
    rubric: leqRubric,
    scaffold: leqScaffold,
    modelResponse:
      "By 1200, Afro-Eurasia was already linked by trade routes that had carried Buddhism into East Asia, Islam across North Africa, and goods such as silk and spices for centuries. Most people, however, still lived as farmers within local communities, governed by older institutions such as Confucian bureaucracy in China and lineage-based authority in many African societies.\n\nBetween 1200 and 1450, expanding connectivity changed societies significantly by spreading religions, crops, and disease, but these changes worked through older institutions rather than replacing them, so continuity remained strong in how most societies were organized.\n\nConnectivity brought real change in religion. Islam spread to new regions through merchants and teachers: by the 1300s Mali's rulers were Muslim and Timbuktu was a center of Islamic scholarship, while Muslim sultanates arose in Southeast Asian ports such as Malacca in the 1400s. These were genuine changes in belief, law, and learning among elites and townspeople.\n\nThe environmental effects of connectivity were even more dramatic. Plague traveled along trade routes from Central Asia to the Black Sea and then to Mediterranean ports in 1347, killing perhaps a third or more of the population in many regions. In parts of western Europe the resulting labor shortage raised wages, and governments responded with laws such as England's Statute of Labourers in 1351.\n\nYet older institutions persisted and shaped how change took hold. In China, the Ming dynasty that replaced the Yuan in 1368 rebuilt government around Confucian examinations and scholar-officials, a tradition the Yuan itself had revived in limited form in 1315, showing that Mongol rule had not erased Chinese bureaucratic traditions. In Mali, Islam was adopted by rulers and merchants, but many rural communities kept local religious practices, and royal ceremonies that Ibn Battuta found strange continued alongside Islamic worship. On the Swahili coast, Islam and Arabic vocabulary entered a society whose language and family structures remained African.\n\nEven the plague's effects depended on older structures. Where lords and governments were strong, they used law and force to limit workers' gains, so the same demographic shock produced different outcomes in different regions.\n\nIn conclusion, expanding connectivity changed belief and population in profound ways, but because those changes passed through existing political and social institutions, continuity shaped the extent and form of change in most societies.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The opening describes earlier connections and the agrarian, local character of most societies before 1200.",
      },
      {
        label: "Thesis",
        text: "The thesis takes a position on extent: significant change that worked through persistent institutions.",
      },
      {
        label: "Evidence",
        text: "Mali, Timbuktu, Malacca, the plague's route, the Statute of Labourers, Ming reliance on the examinations, and the Swahili coast give specific support for both change and continuity.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay is organized around continuity and change and explains how older institutions shaped new developments, which demonstrates a complex understanding.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that change outweighed continuity, using the plague's demographic shock and the spread of Islam as its main evidence while acknowledging persistent agrarian economies.",
    commonErrors: [
      "Describing changes without explaining what persisted, or the reverse.",
      "Answering “to what extent” with no clear judgment.",
      "Treating the adoption of Islam by rulers as proof that everyone converted.",
      "Using developments after 1450 as the main evidence.",
    ],
  },
  {
    id: "world-2-dbq-connectivity",
    version: 2,
    courseId: "world",
    unitId: "world-2",
    title: "Unit 2 DBQ: Connectivity and consequences",
    headline: "Connectivity, opportunity, and unequal consequences",
    promptTitle: "Document-based question",
    prompt:
      "Evaluate the extent to which expanding networks of exchange changed societies in Afro-Eurasia in the period 1200–1450.",
    instructions:
      "Use at least four documents to support an argument. For at least two documents, explain how the author's point of view, purpose, historical situation, or audience is relevant to your argument. Use at least one piece of specific historical evidence beyond the documents. Include contextualization and develop a complex argument. This is untimed self-assessment practice in AP format.",
    note: essayNote,
    exerciseType: "dbq",
    availability: "available",
    sourceIds: [
      "polo-yule-1903",
      "battuta-gibb-1929",
      "boccaccio-payne-1886",
      "ced-topic-2-5",
      "ced-topic-2-6",
    ],
    sourceLocators: [
      {
        sourceId: "polo-yule-1903",
        locator: "vol. 1, Book II, ch. 24; vol. 2, Book II, ch. 82",
      },
      {
        sourceId: "battuta-gibb-1929",
        locator: "chs. 8, 12, 14; scan pp. 252, 310, 339, 351–352",
      },
      { sourceId: "boccaccio-payne-1886", locator: "First Day, introduction" },
    ],
    responseFields: [
      ...[1, 2, 3, 4, 5, 6, 7].map((number) => ({
        id: `doc-${number}-notes`,
        label: `Document ${number} notes`,
        prompt:
          "Note what this document shows, which part of your argument it supports, and how its point of view, purpose, situation, or audience matters.",
        required: false,
        rows: 4,
        review: [
          {
            topicId: "world-2-5",
            sectionId: "travelers-sourcing",
            label: "Sourcing travelers' accounts",
          },
        ],
      })),
      {
        id: "essay",
        label: "DBQ essay",
        prompt:
          "Write the full essay: thesis, contextualization, at least four documents used as evidence, sourcing for at least two, outside evidence, and a qualified argument.",
        required: true,
        rows: 20,
        review: [
          {
            topicId: "world-2-7",
            sectionId: "arguing-with-evidence",
            label: "From comparison to argument",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "thesis",
        label: "Thesis",
        points: 1,
        guidance:
          "Responds to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.",
      },
      {
        id: "context",
        label: "Contextualization",
        points: 1,
        guidance: "Describes a broader historical context relevant to the prompt.",
      },
      {
        id: "documents",
        label: "Evidence from the documents",
        points: 2,
        guidance:
          "1 point: accurately describes the content of at least three documents to address the prompt. 2 points: uses the content of at least four documents to support an argument in response to the prompt.",
      },
      {
        id: "outside",
        label: "Evidence beyond the documents",
        points: 1,
        guidance:
          "Uses at least one additional piece of specific historical evidence, not found in the documents, that is relevant to an argument about the prompt.",
      },
      {
        id: "sourcing",
        label: "Sourcing",
        points: 1,
        guidance:
          "For at least two documents, explains how or why the document's point of view, purpose, historical situation, or audience is relevant to an argument.",
      },
      {
        id: "complexity",
        label: "Complexity",
        points: 1,
        guidance:
          "Demonstrates a complex understanding of the topic, using evidence to corroborate, qualify, or modify an argument.",
      },
    ],
    scaffold: [
      {
        label: "Read",
        text: "Note each document's author, date, and purpose before its content.",
      },
      {
        label: "Group",
        text: "Sort documents by the claim they support, not by their order.",
      },
      {
        label: "Argue",
        text: "Use documents as evidence and explain how each supports your claim.",
      },
      {
        label: "Source",
        text: "Explain why point of view, purpose, situation, or audience matters for two documents.",
      },
      {
        label: "Qualify",
        text: "Show where the pattern varied by region or social group.",
      },
    ],
    documents: [
      {
        id: "doc-1",
        label: "Yuan paper money",
        sourceType: "primary",
        attribution: excerpts.poloPaperMoney.attribution,
        content: excerpts.poloPaperMoney.text,
        citation: excerpts.poloPaperMoney.citation,
        note: excerpts.poloPaperMoney.note,
        sourceNote:
          "Verified against the Project Gutenberg text of the Yule–Cordier edition.",
        metadata: {
          author: "Marco Polo, dictated to Rustichello of Pisa",
          date: "c. 1298",
          setting: "Yuan China under Kublai Khan",
          audience: "European readers",
          rights: "Public-domain translation (1903).",
        },
        sourceIds: ["polo-yule-1903"],
        status: "verified",
      },
      {
        id: "doc-2",
        label: "The port of Quanzhou",
        sourceType: "primary",
        attribution: excerpts.poloZayton.attribution,
        content: excerpts.poloZayton.text,
        citation: excerpts.poloZayton.citation,
        note: excerpts.poloZayton.note,
        sourceNote:
          "Verified against the Project Gutenberg text of the Yule–Cordier edition.",
        metadata: {
          author: "Marco Polo, dictated to Rustichello of Pisa",
          date: "c. 1298",
          setting: "Quanzhou, southern China",
          audience: "European readers",
          rights: "Public-domain translation (1903).",
        },
        sourceIds: ["polo-yule-1903"],
        status: "verified",
      },
      {
        id: "doc-3",
        label: "Muslim merchants in Quanzhou",
        sourceType: "primary",
        attribution: excerpts.battutaZaytun.attribution,
        content: excerpts.battutaZaytun.text,
        citation: excerpts.battutaZaytun.citation,
        note: excerpts.battutaZaytun.note,
        sourceNote:
          "Verified against the Internet Archive full text of Gibb's 1929 translation.",
        metadata: {
          author: "Ibn Battuta, dictated to Ibn Juzayy",
          date: "Visit c. 1345; account dictated 1355",
          setting: "Quanzhou, Yuan China",
          audience: "Muslim readers in Morocco",
          rights: "Public-domain translation in the United States (1929).",
        },
        sourceIds: ["battuta-gibb-1929"],
        status: "verified",
      },
      {
        id: "doc-4",
        label: "A trading town on India's southwestern coast",
        sourceType: "primary",
        attribution: excerpts.battutaHinawr.attribution,
        content: excerpts.battutaHinawr.text,
        citation: excerpts.battutaHinawr.citation,
        note: excerpts.battutaHinawr.note,
        sourceNote:
          "Verified against the Internet Archive full text of Gibb's 1929 translation.",
        metadata: {
          author: "Ibn Battuta, dictated to Ibn Juzayy",
          date: "Visit c. 1342; account dictated 1355",
          setting: "Honavar, southwestern India",
          audience: "Muslim readers in Morocco",
          rights: "Public-domain translation in the United States (1929).",
        },
        sourceIds: ["battuta-gibb-1929"],
        status: "verified",
      },
      {
        id: "doc-5",
        label: "The salt mines of Taghaza",
        sourceType: "primary",
        attribution: excerpts.battutaTaghaza.attribution,
        content: excerpts.battutaTaghaza.text,
        citation: excerpts.battutaTaghaza.citation,
        note: excerpts.battutaTaghaza.note,
        sourceNote:
          "Verified against the Internet Archive full text of Gibb's 1929 translation.",
        metadata: {
          author: "Ibn Battuta, dictated to Ibn Juzayy",
          date: "Journey 1352; account dictated 1355",
          setting: "The western Sahara, on the route to Mali",
          audience: "Muslim readers in Morocco",
          rights: "Public-domain translation in the United States (1929).",
        },
        sourceIds: ["battuta-gibb-1929"],
        status: "verified",
      },
      {
        id: "doc-6",
        label: "Order and Islam in Mali",
        sourceType: "primary",
        attribution: excerpts.battutaMali.attribution,
        content: excerpts.battutaMali.text,
        citation: excerpts.battutaMali.citation,
        note: excerpts.battutaMali.note,
        sourceNote:
          "Verified against the Internet Archive full text of Gibb's 1929 translation.",
        metadata: {
          author: "Ibn Battuta, dictated to Ibn Juzayy",
          date: "Visit 1352–1353; account dictated 1355",
          setting: "The Mali Empire, West Africa",
          audience: "Muslim readers in Morocco",
          rights: "Public-domain translation in the United States (1929).",
        },
        sourceIds: ["battuta-gibb-1929"],
        status: "verified",
      },
      {
        id: "doc-7",
        label: "Plague in Florence and its countryside",
        sourceType: "primary",
        attribution: excerpts.boccaccioSociety.attribution,
        content: excerpts.boccaccioSociety.text,
        citation: excerpts.boccaccioSociety.citation,
        note: excerpts.boccaccioSociety.note,
        sourceNote: "Verified against the Project Gutenberg text of Payne's translation.",
        metadata: {
          author: "Giovanni Boccaccio",
          date: "Completed c. 1353, describing 1348",
          setting: "Florence and its countryside, Italy",
          audience: "Italian readers of his story collection",
          rights: "Public-domain translation (1886).",
        },
        sourceIds: ["boccaccio-payne-1886"],
        status: "verified",
      },
    ],
    modelResponse:
      "By 1200, trade routes had linked Afro-Eurasia for centuries, carrying silk from China, spices from South and Southeast Asia, and Islam across North Africa and the Indian Ocean. In the 1200s the Mongol conquests united much of Eurasia under related rulers, while states such as Mali and the Swahili city-states grew rich from trade in gold and other goods.\n\nBetween 1200 and 1450, expanding networks of exchange significantly changed societies by enriching states that controlled trade and spreading Islam and its institutions to new regions, but the benefits were unequal, and connectivity also carried coerced labor and devastating disease.\n\nTrade networks strengthened states that could tax and protect commerce. Marco Polo describes Kublai Khan forcing merchants to accept Yuan paper money and to sell their gold, gems, and pearls only to the emperor (Document 1), and collecting a ten percent duty on all imports at Quanzhou (Document 2). Polo was a Venetian merchant writing for European readers who had never seen paper money, so he emphasized the emperor's wealth and may have overstated how smoothly the system worked; in 1287 Kublai had to replace the earlier notes with a new currency. Even allowing for exaggeration, his account shows a state drawing power from the trade it controlled. Ibn Battuta similarly describes Mali as a place of \"complete security\" where even the estates of foreign merchants were protected (Document 6), conditions that reflect rulers who depended on trans-Saharan trade revenue.\n\nExchange also spread Islam and Islamic learning far beyond its Middle Eastern heartland. In Quanzhou, Ibn Battuta found a Muslim judge, a shaykh al-Islam, and merchants who recited the Koran (Document 3), and in the Indian port of Honavar he counted thirteen schools for girls and twenty-three for boys among people who all knew the Koran by heart (Document 4). In Mali, children learned the Koran and crowds filled the mosques on Fridays (Document 6). Because Ibn Battuta was a Muslim legal scholar writing for Muslim readers in Morocco, he paid close attention to mosques and Quranic learning, and his praise and criticism, including his complaint about court customs he considered improper, reflect North African Islamic norms. Yet his observations agree with other evidence: Mansa Musa's pilgrimage to Mecca in 1324–1325 and his support for scholars in Timbuktu show Mali's rulers deliberately joining the Islamic world.\n\nThese changes, however, were neither universal nor equally beneficial. At Taghaza, the salt that West Africans valued was dug by enslaved workers who lived on imported food in a village without trees (Document 5), showing that the same trade that enriched Mali's rulers depended on coerced labor. Honavar's Muslim ruler governed under the authority of a Hindu overlord (Document 4), a reminder that religious change in port cities did not replace older political structures. Most dramatically, the routes that carried goods and ideas also carried plague. Boccaccio describes peasants dying \"like beasts\" and crops left unharvested around Florence, while the few willing to nurse the sick demanded \"high and extravagant wage\" (Document 7). Writing the introduction to a book of stories, Boccaccio had reasons to dramatize, but he lived through the epidemic, and his description of scarce, expensive labor matches England's attempt to cap wages in the Statute of Labourers of 1351.\n\nIn conclusion, expanding exchange transformed political power and religious life across Afro-Eurasia, but it did so unevenly, enriching rulers and merchants while also spreading forced labor and disease that reshaped societies in ways no one intended.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes earlier trade routes, the spread of Islam, and the Mongol conquests that set up the period.",
      },
      {
        label: "Thesis",
        text: "The thesis makes a claim about extent (significant but unequal change) and previews three lines of reasoning: state power, the spread of Islam, and unequal costs.",
      },
      {
        label: "Evidence from the documents",
        text: "All seven documents are used to support the argument, not summarized one after another, which exceeds the four-document requirement.",
      },
      {
        label: "Evidence beyond the documents",
        text: "Kublai's 1287 currency reissue, Mansa Musa's pilgrimage and patronage in Timbuktu, and the Statute of Labourers are specific evidence not found in the documents.",
      },
      {
        label: "Sourcing",
        text: "The essay explains how Polo's purpose and audience (Documents 1–2), Ibn Battuta's background (Documents 3–6), and Boccaccio's purpose (Document 7) affect how each source should be used.",
      },
      {
        label: "Complexity",
        text: "The argument qualifies its own claim by showing coerced labor, persistent older political structures, and disease, and it corroborates sources with outside evidence.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that connectivity changed elites and cities more than ordinary people, grouping Documents 1–4 as evidence of change among rulers and merchants and Documents 5–7 as evidence of how ordinary people bore the costs.",
    commonErrors: [
      "Summarizing each document in order instead of grouping them by argument.",
      "Quoting a document without explaining how it supports the claim.",
      "Writing “Ibn Battuta was biased” without explaining how his background affects the document's use.",
      "Treating one traveler's description as true for an entire region.",
      "Forgetting evidence beyond the documents.",
    ],
  },
  {
    id: "world-2-skill-thesis",
    version: 1,
    courseId: "world",
    unitId: "world-2",
    title:
      "Unit 2 skill drill: Revise an overly broad claim into an arguable claim with a line of reasoning.",
    headline:
      "Revise an overly broad claim into an arguable claim with a line of reasoning.",
    promptTitle: "Skill drill: thesis",
    prompt:
      "A student writes: “Trade changed everything.” Rewrite it as a defensible Unit 2 thesis.",
    instructions:
      "Write a short response, then open the worked example and compare. This checklist is practice and does not produce an official AP score.",
    note: essayNote,
    exerciseType: "skill",
    sourceIds: ["ced-topic-2-7", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-7", locator: "Topic 2.7 learning objectives" },
    ],
    responseFields: [
      {
        id: "response",
        label: "Your response",
        prompt:
          "Write your revised thesis and one sentence explaining why it is stronger.",
        required: true,
        rows: 8,
        review: [
          {
            topicId: "world-2-7",
            sectionId: "arguing-with-evidence",
            label: "From comparison to argument",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "checklist",
        label: "Skill checklist",
        points: 1,
        guidance:
          "The thesis is limited to a time and place, makes a claim someone could dispute, and previews a line of reasoning.",
      },
    ],
    modelResponse:
      "Worked example: “Between 1200 and 1450, expanding trade strengthened states that could tax it, such as Mali and Malacca, and spread Islam to new regions, but these changes were uneven because many rural communities kept older economies and beliefs.”\n\nWhy it is stronger: it sets a time period, names specific states, makes a claim a reader could argue against, previews two lines of reasoning (state power and religion), and qualifies the claim instead of saying trade changed “everything.”",
    alternateModel:
      "Another strong thesis could focus on environmental effects: “Trade networks spread both useful crops and deadly disease, so connectivity raised food supplies in some regions while the plague cut populations sharply in others.”",
    commonErrors: [
      "Restating the prompt without making a claim.",
      "Naming topics without explaining how they connect to the claim.",
      "Making a claim so broad that no evidence could disprove it.",
    ],
    scaffold: [
      { label: "Narrow", text: "Set a time, place, or group." },
      { label: "Claim", text: "Say what changed and how much." },
      { label: "Reason", text: "Preview why, with two categories of evidence." },
    ],
    checklist: [
      "Limits the claim to a time period and specific places.",
      "Makes a claim that a reader could argue against.",
      "Previews at least two reasons or categories of evidence.",
    ],
  },
  {
    id: "world-2-skill-context",
    version: 1,
    courseId: "world",
    unitId: "world-2",
    title:
      "Unit 2 skill drill: Distinguish relevant wider context from a restatement of the prompt.",
    headline: "Distinguish relevant wider context from a restatement of the prompt.",
    promptTitle: "Skill drill: contextualization",
    prompt:
      "Write two sentences of context for a prompt about exchange growth after 1200.",
    instructions:
      "Write a short response, then open the worked example and compare. This checklist is practice and does not produce an official AP score.",
    note: essayNote,
    exerciseType: "skill",
    sourceIds: ["ced-topic-2-1", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-1", locator: "Topic 2.1 learning objectives" },
    ],
    responseFields: [
      {
        id: "response",
        label: "Your response",
        prompt: "Write two sentences of context and connect them to the prompt.",
        required: true,
        rows: 8,
        review: [
          {
            topicId: "world-2-1",
            sectionId: "trade-growth",
            label: "Why exchange grew after 1200",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "checklist",
        label: "Skill checklist",
        points: 1,
        guidance:
          "The context describes a broader development before or during the period and explains how it relates to the prompt.",
      },
    ],
    modelResponse:
      "Worked example: “Before 1200, the Tang dynasty and the Abbasid caliphate had built routes, cities, and commercial practices that connected much of Asia, but by the 1100s both had fallen or weakened, leaving trade to smaller states. This background helps explain why the Mongol conquests of the 1200s, which united much of Eurasia under related rulers, could revive and extend older routes so quickly.”\n\nWhy it works: the first sentence describes a broader development before the period, and the second connects it directly to the prompt. It does not simply restate that trade grew.",
    alternateModel:
      "Context could also describe the earlier spread of Islam through North Africa and the Indian Ocean, which created merchant communities that later networks relied on.",
    commonErrors: [
      "Restating the prompt as context.",
      "Describing a development without connecting it to the prompt.",
      "Using a development from long after 1450.",
    ],
    scaffold: [
      {
        label: "Before",
        text: "Describe a broader development before or during the period.",
      },
      { label: "Connect", text: "Explain how it shaped the topic in the prompt." },
    ],
    checklist: [
      "Describes a specific broader development.",
      "Places it in time before or during the period.",
      "Explains how it relates to the prompt.",
    ],
  },
  {
    id: "world-2-skill-evidence",
    version: 1,
    courseId: "world",
    unitId: "world-2",
    title:
      "Unit 2 skill drill: Turn an accurate example into support for an argument through explicit explanation.",
    headline:
      "Turn an accurate example into support for an argument through explicit explanation.",
    promptTitle: "Skill drill: evidence",
    prompt:
      "Use one example from Unit 2 and explain how it supports a claim about state power and exchange.",
    instructions:
      "Write a short response, then open the worked example and compare. This checklist is practice and does not produce an official AP score.",
    note: essayNote,
    exerciseType: "skill",
    sourceIds: ["ced-topic-2-3", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-3", locator: "Topic 2.3 learning objectives" },
    ],
    responseFields: [
      {
        id: "response",
        label: "Your response",
        prompt:
          "State a claim, give one example, and explain how the example supports the claim.",
        required: true,
        rows: 8,
        review: [
          {
            topicId: "world-2-3",
            sectionId: "states-revenue",
            label: "Trade could build states",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "checklist",
        label: "Skill checklist",
        points: 1,
        guidance:
          "The response uses a specific example and explains the mechanism that connects it to the claim.",
      },
    ],
    modelResponse:
      "Worked example: “Claim: Trade could strengthen states that controlled key routes. Evidence: In the 1400s Malacca taxed ships passing through the Strait of Malacca and protected them with a navy. Explanation: Because ships moving between the Indian Ocean and the South China Sea had to pass the strait, Malacca's rulers could collect steady customs revenue, which paid for the navy and court that made the city a regional power.”\n\nWhy it works: the explanation names the mechanism, a passage that ships could not avoid, instead of just saying Malacca was rich.",
    alternateModel:
      "Mali's taxation of gold and salt, or the Yuan import duty at Quanzhou described by Marco Polo, can support the same claim with a different mechanism.",
    commonErrors: [
      "Naming an example without explaining it.",
      "Explaining the example but never connecting it to the claim.",
      "Using an example from the wrong period.",
    ],
    scaffold: [
      { label: "Claim", text: "State what you are arguing." },
      { label: "Evidence", text: "Give one specific example." },
      {
        label: "Explain",
        text: "Show the mechanism that links the example to the claim.",
      },
    ],
    checklist: [
      "States a clear claim.",
      "Uses a specific, accurate example from Unit 2.",
      "Explains how or why the example supports the claim.",
    ],
  },
  {
    id: "world-2-skill-sourcing",
    version: 1,
    courseId: "world",
    unitId: "world-2",
    title:
      "Unit 2 skill drill: Explain why a document’s perspective, purpose, or situation matters to an argument.",
    headline:
      "Explain why a document’s perspective, purpose, or situation matters to an argument.",
    promptTitle: "Skill drill: sourcing",
    prompt:
      "Explain how a traveler’s purpose could shape what the account can support about cultural change.",
    instructions:
      "Write a short response, then open the worked example and compare. This checklist is practice and does not produce an official AP score.",
    note: essayNote,
    exerciseType: "skill",
    sourceIds: ["ced-topic-2-5", "amsco-unit-2"],
    sourceLocators: [
      { sourceId: "ced-topic-2-5", locator: "Topic 2.5 learning objectives" },
    ],
    responseFields: [
      {
        id: "response",
        label: "Your response",
        prompt:
          "Name a traveler, identify a feature of the source, and explain why it matters for an argument.",
        required: true,
        rows: 8,
        review: [
          {
            topicId: "world-2-5",
            sectionId: "travelers-sourcing",
            label: "Travelers are evidence with viewpoints",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "checklist",
        label: "Skill checklist",
        points: 1,
        guidance:
          "The response identifies a specific feature of the source and explains how it affects the source's use in an argument.",
      },
    ],
    modelResponse:
      "Worked example: “Ibn Battuta was a Muslim legal scholar writing for Muslim readers in Morocco, so he paid close attention to mosques, prayer, and Quranic learning wherever he went. This makes his account strong evidence that Islamic institutions existed in places such as Mali and Quanzhou, but weaker evidence for how non-Muslim or rural people lived, since they interested him less and he spent little time among them.”\n\nWhy it works: it names a specific feature (purpose and audience) and explains how it makes the source more useful for one claim and less useful for another, which is what sourcing must do in an essay.",
    alternateModel:
      "Marco Polo's purpose, impressing European readers with the wealth of the East, could be used to explain why his account is strong on trade and court wealth but may exaggerate numbers.",
    commonErrors: [
      "Writing “the author is biased” without saying how or why it matters.",
      "Describing the author without connecting the description to an argument.",
      "Treating a limitation as a reason to ignore the source entirely.",
    ],
    scaffold: [
      {
        label: "Identify",
        text: "Name the point of view, purpose, situation, or audience.",
      },
      {
        label: "Effect",
        text: "Explain how it shapes what the source includes or leaves out.",
      },
      {
        label: "Use",
        text: "Say what the source can and cannot support in an argument.",
      },
    ],
    checklist: [
      "Identifies a specific feature of the source's author or situation.",
      "Explains how that feature shapes the content.",
      "Connects the effect to how the source can be used as evidence.",
    ],
  },
];

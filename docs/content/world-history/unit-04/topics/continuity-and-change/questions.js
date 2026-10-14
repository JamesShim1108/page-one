// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// q-numbered items are topic practice; t-numbered items belong to the Unit 4 Practice Test.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-4-8-q01",
      topicId: "world-4-8",
      concept: "what-continued",
      difficulty: "Core",
      skill: "connections",
      reasoning: "continuity",
      prompt:
        "Which of the following best illustrates continuity from before 1450 to 1750?",
      choices: [
        "American silver began flowing across the Pacific to China",
        "Asian merchants continued to carry most Indian Ocean trade",
        "Ships began to link every inhabited continent",
        "Millions of Africans were forced to the Americas",
      ],
      correctAnswer: 1,
      explanation: "Asian merchants dominated Indian Ocean trade before and after 1450.",
      sourceIds: ["ced-topic-4-8"],
      choiceExplanations: [
        "The American silver trade was new.",
        "Asian merchants dominated Indian Ocean trade before and after 1450.",
        "Global sea links were new.",
        "The Atlantic slave trade on this scale was new.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Silver flows to China were new after the 1550s, which makes them a change.",
    },
    {
      id: "world-4-8-q02",
      topicId: "world-4-8",
      concept: "what-changed",
      difficulty: "Core",
      skill: "connections",
      reasoning: "continuity",
      prompt:
        "Which of the following was the most significant change in the Americas from 1450 to 1750?",
      choices: [
        "The continued isolation of the Americas from trade and contact with Afro-Eurasia",
        "The creation of new societies shaped by conquest, disease, and slavery",
        "The continuation of Inca rule in the Andes",
        "The end of all trade between Europe and the Americas",
      ],
      correctAnswer: 1,
      explanation:
        "European conquest, epidemic disease, and the slave trade transformed American societies.",
      sourceIds: ["ced-topic-4-8"],
      choiceExplanations: [
        "The Americas became connected to Afro-Eurasia.",
        "European conquest, epidemic disease, and the slave trade transformed American societies.",
        "Spain conquered the Inca in the 1530s.",
        "Atlantic trade grew.",
      ],
      nearMissIndex: 0,
      distinguisher: "The Americas became more connected, not less.",
    },
    {
      id: "world-4-8-q03",
      topicId: "world-4-8",
      concept: "what-continued",
      difficulty: "Core",
      skill: "argumentation",
      prompt:
        "Which of the following best supports the claim that Europeans had not dominated Asia by 1750?",
      choices: [
        "Portugal held fortified ports such as Goa on the coast of India",
        "The VOC controlled the spice trade in the Banda Islands",
        "Spanish ships carried silver to Manila",
        "Land-based empires such as the Mughals and Qing remained powerful",
      ],
      correctAnswer: 3,
      explanation:
        "Powerful Asian empires controlled vast territories and the terms of trade.",
      sourceIds: ["ced-topic-4-8"],
      choiceExplanations: [
        "A few forts do not show domination of Asia.",
        "VOC control of small islands shows limited, local power.",
        "Silver shipments show trade, not domination.",
        "Powerful Asian empires controlled vast territories and the terms of trade.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Holding a few ports shows European presence, not domination of Asia.",
    },
    {
      id: "world-4-8-t01",
      topicId: "world-4-8",
      concept: "what-changed",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "According to Smith, the discoveries harmed the natives of the East and West Indies mainly because",
      choices: [
        "the new trade routes bypassed their markets",
        "they refused to trade with Europeans",
        "Europeans had superior goods that ruined local industries",
        "Europeans had a superiority of force that let them act unjustly",
      ],
      correctAnswer: 3,
      explanation:
        "Smith says Europeans' superior force let them commit every sort of injustice.",
      sourceIds: ["ced-topic-4-8", "smith-wealth-of-nations"],
      choiceExplanations: [
        "Smith does not say markets were bypassed.",
        "Smith blames European conduct.",
        "Smith points to force, not goods.",
        "Smith says Europeans' superior force let them commit every sort of injustice.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Smith blames force and injustice, not competition from European goods.",
      stimulusId: "smith-discovery",
      stimulusBlocks: [excerpts.smithDiscovery],
    },
    {
      id: "world-4-8-t02",
      topicId: "world-4-8",
      concept: "what-changed",
      difficulty: "Apply",
      skill: "sourcing",
      prompt: "Smith's view of the mercantile system was most likely shaped by",
      choices: [
        "his argument that colonies should be closed to trade with every foreign nation",
        "his argument that free trade would benefit nations more than mercantilism",
        "his work as a director of the VOC",
        "his role as a Spanish colonial governor",
      ],
      correctAnswer: 1,
      explanation:
        "Smith wrote The Wealth of Nations to argue for freer trade, so he describes mercantilism skeptically.",
      sourceIds: ["ced-topic-4-8", "smith-wealth-of-nations"],
      choiceExplanations: [
        "Smith opposed restrictions.",
        "Smith wrote The Wealth of Nations to argue for freer trade, so he describes mercantilism skeptically.",
        "Smith did not work for the VOC.",
        "Smith was Scottish.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Smith criticized restrictions on trade; he did not want colonies closed.",
      stimulusId: "smith-discovery",
      stimulusBlocks: [excerpts.smithDiscovery],
    },
    {
      id: "world-4-8-t03",
      topicId: "world-4-8",
      concept: "what-changed",
      difficulty: "Challenge",
      skill: "connections",
      reasoning: "continuity",
      prompt: "Smith's passage best supports which claim about the period 1450 to 1750?",
      choices: [
        "Ocean voyages connected distant regions, and colonized peoples benefited the most from them",
        "Ocean voyages connected distant regions but brought great harm to colonized peoples",
        "Ocean voyages had little effect on world trade",
        "Colonized peoples gained the most from the discoveries",
      ],
      correctAnswer: 1,
      explanation:
        "Smith says the discoveries united distant parts of the world but caused dreadful misfortunes to natives.",
      sourceIds: ["ced-topic-4-8", "smith-wealth-of-nations"],
      choiceExplanations: [
        "Smith says colonized peoples suffered.",
        "Smith says the discoveries united distant parts of the world but caused dreadful misfortunes to natives.",
        "Smith calls them the most important events in history.",
        "Smith says natives suffered.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Smith says benefits to colonized peoples were sunk and lost in misfortune.",
      stimulusId: "smith-discovery",
      stimulusBlocks: [excerpts.smithDiscovery],
    },
    {
      id: "world-4-8-t04",
      topicId: "world-4-8",
      concept: "what-continued",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "Which of the following is presented in the passage as a continuity?",
      choices: [
        "The forced migration of Africans to the Americas",
        "Sea routes linking every inhabited continent",
        "The creation of new Atlantic societies",
        "Demand for Chinese and Indian manufactured goods",
      ],
      correctAnswer: 3,
      explanation: "The passage says Chinese and Indian goods remained in high demand.",
      sourceIds: ["ced-topic-4-8"],
      choiceExplanations: [
        "This is described as a change in the Atlantic world.",
        "Global sea links were new.",
        "New Atlantic societies were a change.",
        "The passage says Chinese and Indian goods remained in high demand.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The forced migration of Africans to the Americas is described as part of what changed.",
      stimulusId: "original-continuity-1450-1750",
      stimulusBlocks: [excerpts.originalContinuity4],
    },
    {
      id: "world-4-8-t05",
      topicId: "world-4-8",
      concept: "what-changed",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "The author would most likely agree that the greatest changes from 1450 to 1750 occurred",
      choices: [
        "in the Atlantic world",
        "in the interior of the Mughal Empire",
        "in Indian Ocean trade",
        "in Chinese manufacturing",
      ],
      correctAnswer: 0,
      explanation: "The author says what changed most was the Atlantic world.",
      sourceIds: ["ced-topic-4-8"],
      choiceExplanations: [
        "The author says what changed most was the Atlantic world.",
        "The Mughals remained powerful and largely unchanged.",
        "Indian Ocean trade showed continuity.",
        "Chinese goods remained in demand.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "The author says Indian Ocean trade largely continued in Asian hands.",
      stimulusId: "original-continuity-1450-1750",
      stimulusBlocks: [excerpts.originalContinuity4],
    },
  ],
  quizzes: [
    {
      id: "world-4-8-quick",
      courseId: "world",
      unitId: "world-4",
      topicId: "world-4-8",
      title: "Topic 4.8 quick check",
      quizType: "quick",
      questionIds: ["world-4-8-q01", "world-4-8-q02", "world-4-8-q03"],
    },
    {
      id: "world-4-8-quiz",
      courseId: "world",
      unitId: "world-4",
      topicId: "world-4-8",
      title: "Continuity and Change from 1450 to 1750 topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: ["world-4-8-q01", "world-4-8-q02", "world-4-8-q03"],
    },
  ],
};

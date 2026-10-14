// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// q-numbered items are topic practice; t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-3-4-q01",
      topicId: "world-3-4",
      concept: "compare-religion",
      difficulty: "Core",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Which of the following best describes a difference between Akbar's and Aurangzeb's religious policies?",
      choices: [
        "Akbar expelled Hindu officials, while Aurangzeb promoted them",
        "Akbar abolished the jizya, while Aurangzeb extended it to Muslims",
        "Akbar abolished the jizya, while Aurangzeb restored it",
        "Akbar made Shi'ism the state religion, while Aurangzeb restored Sunni Islam",
      ],
      correctAnswer: 2,
      explanation: "Akbar ended the jizya in 1564, and Aurangzeb reimposed it in 1679.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "Akbar included Hindu elites; Aurangzeb's policies were stricter.",
        "Aurangzeb restored the jizya on non-Muslims only.",
        "Akbar ended the jizya in 1564, and Aurangzeb reimposed it in 1679.",
        "The Mughals were Sunni; making Shi'ism the state religion was a Safavid policy.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The jizya was a tax on non-Muslims; Aurangzeb restored it, he did not apply it to Muslims.",
    },
    {
      id: "world-3-4-q02",
      topicId: "world-3-4",
      concept: "compare-legitimacy",
      difficulty: "Core",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Which of the following was a similarity among the Ottoman, Mughal, and Qing empires?",
      choices: [
        "Each was ruled by a Muslim dynasty",
        "Each relied entirely on examinations to choose officials",
        "Each was ruled by a dynasty that shared its subjects' main religion",
        "Each was ruled by a dynasty that differed from most of its subjects",
      ],
      correctAnswer: 3,
      explanation:
        "Turkic Ottomans, Muslim Mughals, and Manchu Qing each ruled populations unlike themselves.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "The Qing were Manchu, not Muslim.",
        "Only the Qing used examinations widely.",
        "Mughal rulers were Muslim and most subjects Hindu, so this fails.",
        "Turkic Ottomans, Muslim Mughals, and Manchu Qing each ruled populations unlike themselves.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Mughal emperors were Muslim while most subjects were Hindu, so the dynasty did not share the majority religion.",
    },
    {
      id: "world-3-4-q03",
      topicId: "world-3-4",
      concept: "compare-expansion",
      difficulty: "Core",
      skill: "argumentation",
      prompt:
        "Which of the following claims about land-based empires is most defensible?",
      choices: [
        "Gunpowder weapons alone explain why these empires grew",
        "Gunpowder helped expansion, but alliances and revenue also shaped success",
        "Land-based empires grew mainly by sending fleets of ships to distant colonies",
        "Gunpowder made alliances with local elites unnecessary",
      ],
      correctAnswer: 1,
      explanation:
        "This claim recognizes gunpowder's role and the other factors that shaped expansion.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "Weapons mattered but do not explain everything, such as the Mughal alliances with Rajputs.",
        "This claim recognizes gunpowder's role and the other factors that shaped expansion.",
        "Land-based empires expanded over land frontiers.",
        "The Mughals and Qing depended heavily on alliances with local elites.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Gunpowder was important, but a claim that it alone explains growth ignores alliances and revenue.",
    },
    {
      id: "world-3-4-t01",
      topicId: "world-3-4",
      concept: "compare-religion",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Which of the following best describes a similarity between the policies in Passage A and Akbar's policies in Passage B?",
      choices: [
        "Both allowed non-Muslims to practice their faith and serve the state",
        "Both required non-Muslims to convert to Islam",
        "Both abolished the jizya on non-Muslims",
        "Both allowed non-Muslims to serve the state but banned their worship",
      ],
      correctAnswer: 0,
      explanation:
        "Ottoman non-Muslims kept their worship and some served the state; Akbar appointed Hindu Rajputs to high command.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "Ottoman non-Muslims kept their worship and some served the state; Akbar appointed Hindu Rajputs to high command.",
        "Neither required conversion.",
        "Only Akbar abolished the jizya; the Ottomans collected it.",
        "Both allowed non-Muslim worship.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Akbar abolished the jizya, but the Ottomans continued to collect it, so this is a difference.",
      stimulusId: "original-religious-policy-ottoman",
      stimulusBlocks: [
        excerpts.originalReligiousPolicyA,
        excerpts.originalReligiousPolicyB,
      ],
    },
    {
      id: "world-3-4-t02",
      topicId: "world-3-4",
      concept: "compare-religion",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt: "Passage B best illustrates which of the following?",
      choices: [
        "The spread of Shi'ism into India",
        "Change over time in Ottoman religious policy",
        "Change over time in one empire's religious policy",
        "Continuity in Mughal policy from Akbar to Aurangzeb",
      ],
      correctAnswer: 2,
      explanation:
        "Akbar abolished the jizya and Aurangzeb restored it, a clear change over time.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "Both rulers were Sunni.",
        "Passage B concerns the Mughals, not the Ottomans.",
        "Akbar abolished the jizya and Aurangzeb restored it, a clear change over time.",
        "Aurangzeb restored the jizya, reversing Akbar.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Aurangzeb reversed Akbar's policy, so the passage shows change, not continuity.",
      stimulusId: "original-religious-policy-ottoman",
      stimulusBlocks: [
        excerpts.originalReligiousPolicyA,
        excerpts.originalReligiousPolicyB,
      ],
    },
    {
      id: "world-3-4-t03",
      topicId: "world-3-4",
      concept: "compare-religion",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt: "Which of the following claims is best supported by both passages?",
      choices: [
        "Religious accommodation always ended once a new ruler took power",
        "Religious accommodation could help rulers govern diverse empires",
        "Muslim rulers always treated non-Muslims as legal equals",
        "Religious policy had no effect on imperial stability",
      ],
      correctAnswer: 1,
      explanation:
        "Ottoman accommodation and Akbar's inclusion helped govern diverse subjects, while Aurangzeb's reversal is linked to revolts.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "Passage A shows accommodation as a lasting Ottoman policy.",
        "Ottoman accommodation and Akbar's inclusion helped govern diverse subjects, while Aurangzeb's reversal is linked to revolts.",
        "Passage A notes special taxes and legal limits.",
        "Passage B links Aurangzeb's policies to revolts.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Aurangzeb changed course, but the Ottoman passage shows accommodation lasting; “always ended” overstates it.",
      stimulusId: "original-religious-policy-ottoman",
      stimulusBlocks: [
        excerpts.originalReligiousPolicyA,
        excerpts.originalReligiousPolicyB,
      ],
    },
    {
      id: "world-3-4-t04",
      topicId: "world-3-4",
      concept: "compare-expansion",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "The historians described in the second paragraph argue that the label “gunpowder empires”",
      choices: [
        "should be applied to every empire in world history",
        "is accurate because firearms explain everything important about these states",
        "explains how these empires lasted but not how they expanded",
        "explains expansion but not the full story of how these empires lasted",
      ],
      correctAnswer: 3,
      explanation:
        "They say gunpowder helped expansion but cavalry, alliances, taxes, and legitimacy explain how the empires lasted.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "They narrow the label rather than widening it.",
        "They argue against a guns-only explanation.",
        "They grant the role of guns in expansion and question it for survival.",
        "They say gunpowder helped expansion but cavalry, alliances, taxes, and legitimacy explain how the empires lasted.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "The order is reversed: they accept that guns helped expansion, and question whether guns explain survival.",
      stimulusId: "original-gunpowder-debate",
      stimulusBlocks: [excerpts.originalGunpowderDebate],
    },
    {
      id: "world-3-4-t05",
      topicId: "world-3-4",
      concept: "compare-expansion",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "Which of the following pieces of evidence would most directly support the historians in the second paragraph?",
      choices: [
        "Evidence that Babur used field guns at Panipat",
        "Evidence that the Safavids bought cannons from European merchants",
        "Evidence that Mughal power depended on alliances with Rajput princes",
        "Evidence that the Ottomans used cannons at Constantinople",
      ],
      correctAnswer: 2,
      explanation:
        "Alliances show that factors other than guns held the empire together.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "Field guns at Panipat support the older view.",
        "This stresses firearms, the older argument.",
        "Alliances show that factors other than guns held the empire together.",
        "Cannons at Constantinople support the older view.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Buying cannons shows the importance of firearms, which supports the older label rather than its critics.",
      stimulusId: "original-gunpowder-debate",
      stimulusBlocks: [excerpts.originalGunpowderDebate],
    },
    {
      id: "world-3-4-t06",
      topicId: "world-3-4",
      concept: "compare-legitimacy",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "Which of the following best states the author's argument?",
      choices: [
        "Minority rulers held diverse empires by combining force with inclusion",
        "Land-based empires were ruled by the majority group in each region",
        "Force alone allowed rulers to govern diverse subjects",
        "Minority rulers held diverse empires by forcing subjects to adopt their culture",
      ],
      correctAnswer: 0,
      explanation:
        "The author says rulers combined force with recruitment, local institutions, and varied self-presentation.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "The author says rulers combined force with recruitment, local institutions, and varied self-presentation.",
        "The author says each empire was ruled by a minority.",
        "The author says force was combined with inclusion.",
        "The passage says rulers kept many local institutions.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "The author stresses inclusion and keeping local institutions, not forced cultural change.",
      stimulusId: "original-legitimacy-compare",
      stimulusBlocks: [excerpts.originalLegitimacyCompare],
    },
    {
      id: "world-3-4-t07",
      topicId: "world-3-4",
      concept: "compare-legitimacy",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "The final sentence of the passage would best explain which of the following?",
      choices: [
        "The founding of the Safavid Empire in 1501",
        "The Ottoman conquest of Constantinople in 1453",
        "The success of Akbar's alliances with Rajput princes",
        "Revolts in the Mughal Empire after Aurangzeb's policies alienated Hindu groups",
      ],
      correctAnswer: 3,
      explanation:
        "Aurangzeb's policies alienated important groups, and revolts followed, as the sentence predicts.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "The Safavid founding is not about the end of inclusion.",
        "The conquest of Constantinople concerns expansion, not alienation.",
        "This is an example of inclusion succeeding.",
        "Aurangzeb's policies alienated important groups, and revolts followed, as the sentence predicts.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Akbar's alliances show inclusion working; the final sentence is about what happens when inclusion ends.",
      stimulusId: "original-legitimacy-compare",
      stimulusBlocks: [excerpts.originalLegitimacyCompare],
    },
    {
      id: "world-3-4-t08",
      topicId: "world-3-4",
      concept: "compare-legitimacy",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt: "Which of the following best fits the pattern described in the passage?",
      choices: [
        "Qing emperors abolishing the examinations in order to exclude Han Chinese officials",
        "Qing emperors appearing as Buddhist patrons to Tibetans and Mongols",
        "Luther posting his theses on indulgences",
        "Moroccan musketeers defeating Songhai cavalry",
      ],
      correctAnswer: 1,
      explanation:
        "Presenting themselves differently to different subjects is the pattern the author describes.",
      sourceIds: ["ced-topic-3-4"],
      choiceExplanations: [
        "The Qing kept the examinations.",
        "Presenting themselves differently to different subjects is the pattern the author describes.",
        "Luther's theses are about religious reform, not minority rule.",
        "The battle concerns military technology.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The Qing kept the examinations, which included Han Chinese in government.",
      stimulusId: "original-legitimacy-compare",
      stimulusBlocks: [excerpts.originalLegitimacyCompare],
    },
  ],
  quizzes: [
    {
      id: "world-3-4-quick",
      courseId: "world",
      unitId: "world-3",
      topicId: "world-3-4",
      title: "Topic 3.4 quick check",
      quizType: "quick",
      questionIds: ["world-3-4-q01", "world-3-4-q02", "world-3-4-q03"],
    },
    {
      id: "world-3-4-quiz",
      courseId: "world",
      unitId: "world-3",
      topicId: "world-3-4",
      title: "Comparison in Land-Based Empires topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: ["world-3-4-q01", "world-3-4-q02", "world-3-4-q03"],
    },
  ],
};

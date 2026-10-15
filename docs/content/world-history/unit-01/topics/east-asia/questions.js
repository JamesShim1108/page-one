// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "q1",
      topicId: "world-1-1",
      concept: "governance",
      difficulty: "Core",
      skill: "developments",
      prompt:
        "Why did examinations on Confucian writings help the Song government maintain its authority?",
      choices: [
        "They recruited officials mainly for military experience, reducing the dynasty’s reliance on civilian administrators.",
        "They gave wealthy provincial families the right to appoint officials who owed loyalty to local elites.",
        "They helped recruit officials whose education reinforced ideas of hierarchy and duty.",
        "They made the emperor’s authority depend on approval from officials selected by regional assemblies.",
      ],
      correctAnswer: 2,
      explanation:
        "The examinations connected recruitment with Confucian ideas about ethical conduct and hierarchy. They trained civilian administrators loyal to the imperial system rather than military officers, hereditary appointees, or elected representatives.",
    },
    {
      id: "q2",
      topicId: "world-1-1",
      concept: "governance",
      difficulty: "Apply",
      skill: "claims-evidence",
      stimulus:
        "Two candidates hope to pass an imperial examination. One has family-funded tutors and years to study. The other must spend most days working to support his household.",
      prompt: "Which conclusion is best supported by this situation?",
      choices: [
        "Examinations offered a route to office, but resources affected a candidate’s opportunities.",
        "Only hereditary nobles could sit for the exams, so preparation did not matter.",
        "Family wealth, rather than exam performance, directly determined official scores.",
        "Because the exams rewarded merit alone, unequal preparation did not affect social mobility.",
      ],
      correctAnswer: 0,
      explanation:
        "Testing knowledge could create opportunities beyond noble birth, while unequal access to preparation favored wealthy families. Wealth influenced preparation and opportunity, but it did not legally restrict the exams to nobles or directly determine a candidate’s score.",
    },
    {
      id: "q3",
      topicId: "world-1-1",
      concept: "beliefs",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt:
        "Which description best captures continuity and change in Neo-Confucian thought?",
      choices: [
        "It preserved Confucian social hierarchy but rejected Buddhist and Daoist ideas as incompatible with Chinese traditions.",
        "It preserved Confucian moral concerns while developing ideas in response to other traditions.",
        "It combined Buddhist meditation with civil-service training to create a state religion enforced throughout East Asia.",
        "It revived classical Confucian texts while shifting moral authority from families and rulers to Buddhist monasteries.",
      ],
      correctAnswer: 1,
      explanation:
        "Neo-Confucianism kept Confucian ethics and hierarchy central while developing ideas in conversation with Buddhism and Daoism. It neither rejected those influences completely nor transferred authority to Buddhist institutions.",
    },
    {
      id: "q4",
      topicId: "world-1-1",
      concept: "beliefs",
      difficulty: "Core",
      skill: "developments",
      prompt: "How could the Confucian emphasis on filial piety support imperial rule?",
      choices: [
        "It taught respect for family elders while discouraging people from applying those duties to political rulers.",
        "It justified imperial authority mainly by promising equal social rank to every obedient subject.",
        "It shifted loyalty away from kinship groups and toward Buddhist monasteries supervised by the state.",
        "It encouraged respect for hierarchical relationships that could extend from family to state.",
      ],
      correctAnswer: 3,
      explanation:
        "Filial piety linked duties within the family to respect for authority in a wider political hierarchy. Its political importance came from extending hierarchy, not separating family ethics from government or promising social equality.",
    },
    {
      id: "q5",
      topicId: "world-1-1",
      concept: "economy",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which sequence best explains how agricultural innovation contributed to Song economic growth?",
      choices: [
        "Higher food output → support for population and specialized work → larger markets",
        "Higher food output → population growth → declining demand for artisan goods as workers returned to subsistence farming",
        "New rice varieties → more land under cultivation → less need for canals and commercial transport",
        "More harvests → lower government revenues → contraction of cities and long-distance trade",
      ],
      correctAnswer: 0,
      explanation:
        "A larger food supply supported population growth and workers in specialized occupations, which expanded towns and markets. Agricultural gains increased rather than reduced the value of artisan production and transport networks.",
    },
    {
      id: "q6",
      topicId: "world-1-1",
      concept: "economy",
      difficulty: "Apply",
      skill: "claims-evidence",
      stimulus:
        "A village workshop makes porcelain for buyers in distant cities. Boats carry its output along waterways, and merchants arrange sales beyond the local community.",
      prompt: "This situation most directly illustrates which development?",
      choices: [
        "The growth of home-based production intended mainly for local household consumption",
        "The expansion of state-supervised workshops that produced porcelain only as tribute for the emperor",
        "The growing importance of production for markets and regional trade",
        "The spread of rural proto-industrial production powered by mechanized steam equipment",
      ],
      correctAnswer: 2,
      explanation:
        "Production for distant buyers shows commercialization and proto-industrial market production. The key evidence is sale beyond the local community, not household consumption, tribute-only production, or later steam-powered industry.",
    },
    {
      id: "q7",
      topicId: "world-1-1",
      concept: "influence",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt: "Which comparison of Song China and medieval Japan is most accurate?",
      choices: [
        "Both borrowed Chinese political models and relied primarily on scholar-officials selected through civil-service examinations.",
        "Both experienced Chinese and Buddhist cultural influences, but Japan’s warrior elites differed from Song scholar-officials.",
        "Both adopted Buddhism, but Song rulers placed political authority in monasteries while Japan retained secular rule.",
        "Both developed warrior governments, although Japan’s shogunate was more centralized than Song military rule.",
      ],
      correctAnswer: 1,
      explanation:
        "Cultural borrowing coexisted with political differences. Song administration relied heavily on scholar-officials, while warrior leadership grew central in Japan; Japan did not simply reproduce China’s examination bureaucracy.",
    },
    {
      id: "q8",
      topicId: "world-1-1",
      concept: "influence",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "A historian finds Chinese-derived writing and Confucian learning in Korea and Vietnam. What additional evidence would best show local adaptation?",
      choices: [
        "Records showing Korean and Vietnamese elites used Chinese writing in government documents",
        "Evidence that Korea and Vietnam maintained tributary and diplomatic relations with Chinese dynasties",
        "Records showing rulers copied China’s examination curriculum without adapting it",
        "Records showing that each region modified borrowed institutions to suit its own elites and traditions",
      ],
      correctAnswer: 3,
      explanation:
        "Adaptation means reshaping what is borrowed. Writing, diplomacy, and an unaltered exam curriculum would demonstrate contact or adoption; local modifications specifically show adaptation.",
    },
    {
      id: "k1",
      topicId: "world-1-1",
      concept: "governance",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "Which example describes a bureaucracy?",
      choices: [
        "A ruler handling every tax dispute personally",
        "Appointed officials managing taxes and carrying out imperial policies",
        "Merchants choosing the emperor through a market vote",
        "Families independently issuing all government laws",
      ],
      correctAnswer: 1,
      explanation:
        "A bureaucracy divides government work among appointed officials. In Song China, these officials helped put imperial policies into practice across a large territory.",
    },
    {
      id: "k2",
      topicId: "world-1-1",
      concept: "economy",
      difficulty: "Quick check",
      skill: "connections",
      reasoning: "causation",
      prompt: "Why did early-ripening rice matter beyond agriculture?",
      choices: [
        "It made transport networks unnecessary.",
        "It immediately gave all farmers government jobs.",
        "It ended the need for other agricultural improvements.",
        "It helped increase the food supply that supported people doing specialized work.",
      ],
      correctAnswer: 3,
      explanation:
        "Increased food output helped support a growing population and people working in crafts and trade. Early-ripening rice worked alongside other agricultural changes.",
    },
    {
      id: "k3",
      topicId: "world-1-1",
      concept: "beliefs",
      difficulty: "Quick check",
      skill: "developments",
      prompt:
        "Which statement best describes the relationship between Confucianism and Buddhism in East Asia?",
      choices: [
        "They could coexist and influence intellectual and cultural life in different ways.",
        "They were the same tradition under two names.",
        "The spread of one instantly removed the other everywhere.",
        "Neither influenced life beyond the Chinese imperial court.",
      ],
      correctAnswer: 0,
      explanation:
        "Multiple traditions coexisted, sometimes in tension and sometimes influencing each other. Their influence reached societies beyond China and extended beyond government.",
    },
    // BEGIN unit-01 practice test
    // Unit 1 Practice Test items (t-numbered): AP-style sets that each depend on one stimulus.
    {
      id: "world-1-1-t01",
      topicId: "world-1-1",
      concept: "economy",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Based on the passage, which of the following best describes the economy of Kinsay?",
      choices: [
        "It relied on large estates where serfs produced goods for their lords",
        "It depended mainly on tribute that farmers delivered to the imperial court",
        "It combined specialized craft production with trade that supplied other cities",
        "It was organized around foreign merchants who controlled most of the city's manufacturing",
      ],
      correctAnswer: 2,
      explanation:
        "Guilds of craftsmen supply “many other cities,” and merchants handle enormous amounts of goods. That is specialized, commercial production.",
      sourceIds: ["ced-topic-1-1", "polo-yule-1903"],
      choiceExplanations: [
        "Serfs and lords describe European manorialism, not the urban guilds Polo describes.",
        "The passage stresses guild workshops and merchants, not tribute from farmers.",
        "Guilds of craftsmen supply “many other cities,” and merchants handle enormous amounts of goods. That is specialized, commercial production.",
        "The passage describes the city's own guilds and merchants; it does not say foreigners controlled manufacturing.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Merchants appear in the passage, but the crafts are organized in local guilds and houses of workers, not run by foreigners.",
      stimulusId: "polo-kinsay",
      stimulusBlocks: [excerpts.poloKinsay],
    },
    {
      id: "world-1-1-t02",
      topicId: "world-1-1",
      concept: "economy",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "Which of the following developments best explains the prosperity described in the passage?",
      choices: [
        "Song commercialization, supported by greater rice output and canal transport",
        "The arrival of American food crops, which allowed Chinese cities to grow rapidly",
        "The commercialization of the Song economy, made possible by a lack of state taxation",
        "The rise of factory production powered by coal and steam engines",
      ],
      correctAnswer: 0,
      explanation:
        "Champa rice, the Grand Canal, and growing markets supported a commercial economy and large cities such as Hangzhou.",
      sourceIds: ["ced-topic-1-1", "polo-yule-1903"],
      choiceExplanations: [
        "Champa rice, the Grand Canal, and growing markets supported a commercial economy and large cities such as Hangzhou.",
        "American crops reached China only after 1500, through the Columbian Exchange.",
        "The Song and Yuan governments taxed trade; Polo notes the Kaan's “immense revenue” from duties.",
        "Factory production with steam power belongs to the Industrial Revolution after 1750.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Song commerce grew strongly, but the state taxed it heavily; the passage itself mentions large duties on trade.",
      stimulusId: "polo-kinsay",
      stimulusBlocks: [excerpts.poloKinsay],
    },
    {
      id: "world-1-1-t03",
      topicId: "world-1-1",
      concept: "economy",
      difficulty: "Challenge",
      skill: "sourcing",
      prompt:
        "The purpose of the document Polo relies on most likely affects the passage's reliability in which of the following ways?",
      choices: [
        "The document was meant to save the city, so it probably described its crafts and merchants accurately",
        "The document was a tax record, so it probably understated the city's wealth",
        "The document was written by a foreign visitor who never saw the city",
        "The document was meant to save the city, so it may exaggerate the city's size and wealth",
      ],
      correctAnswer: 3,
      explanation:
        "The Queen wanted the Kaan to spare the city, a strong motive to stress its grandeur; figures such as 12,000 houses per guild suggest exaggeration.",
      sourceIds: ["ced-topic-1-1", "polo-yule-1903"],
      choiceExplanations: [
        "The purpose is identified correctly, but a motive to impress the conqueror makes accuracy less certain, not more.",
        "Polo describes a statement sent to the conqueror, not a tax register.",
        "Polo says the Queen of the realm sent the document, so it came from inside the city's ruling family.",
        "The Queen wanted the Kaan to spare the city, a strong motive to stress its grandeur; figures such as 12,000 houses per guild suggest exaggeration.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Purpose explains how a source might be distorted. A plea to spare a city gives a reason to make it sound as impressive as possible.",
      stimulusId: "polo-kinsay",
      stimulusBlocks: [excerpts.poloKinsay],
    },
    {
      id: "world-1-1-t04",
      topicId: "world-1-1",
      concept: "governance",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "Which of the following claims is best supported by the passage?",
      choices: [
        "The examination system ended the political influence of wealthy families",
        "The examination system spread Confucian values beyond those who held office",
        "The examination system allowed women to serve as local officials",
        "The examination system was used mainly to choose military commanders",
      ],
      correctAnswer: 1,
      explanation:
        "Many degree holders became teachers and community leaders, spreading shared values about loyalty and hierarchy beyond government posts.",
      sourceIds: ["ced-topic-1-1"],
      choiceExplanations: [
        "The passage says most successful candidates came from families with land or commercial wealth.",
        "Many degree holders became teachers and community leaders, spreading shared values about loyalty and hierarchy beyond government posts.",
        "The passage states that women could not sit for the examinations.",
        "The examinations tested the Confucian classics and selected civil officials.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The passage says the system was more open than hereditary rule but that wealthy families still dominated success.",
      stimulusId: "original-song-exams",
      stimulusBlocks: [excerpts.originalSongExams],
    },
    {
      id: "world-1-1-t05",
      topicId: "world-1-1",
      concept: "governance",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Which of the following best describes a difference between Song government and government in western Europe in the same period?",
      choices: [
        "Song rulers shared power with an elected assembly, while European kings ruled without limits",
        "Song rulers relied on an educated bureaucracy, while European kings relied heavily on landholding nobles",
        "Song rulers depended on a written legal code, while European kingdoms had no written laws at all",
        "Song rulers relied on an educated bureaucracy, while European kings relied mainly on salaried university scholars",
      ],
      correctAnswer: 1,
      explanation:
        "Song emperors used examination-selected officials; European monarchs depended on nobles who held land in return for service.",
      sourceIds: ["ced-topic-1-1"],
      choiceExplanations: [
        "Song China had no elected assembly, and European kings were limited by nobles and the Church.",
        "Song emperors used examination-selected officials; European monarchs depended on nobles who held land in return for service.",
        "European kingdoms had written laws and charters, such as Magna Carta.",
        "Clergy served kings as advisers, but feudal nobles, not salaried scholars, carried most local power in Europe.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Europe had universities and clergy, but royal power rested chiefly on nobles bound by land and military service.",
      stimulusId: "original-song-exams",
      stimulusBlocks: [excerpts.originalSongExams],
    },
    {
      id: "world-1-1-t06",
      topicId: "world-1-1",
      concept: "beliefs",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "The ideas promoted by the system described in the passage are most directly associated with which of the following?",
      choices: [
        "Legalism, which relied on strict punishments rather than moral education",
        "Theravada Buddhism, which emphasized monastic life and personal liberation",
        "Neo-Confucianism, which rejected family duty and ancestor rites in favor of loyalty to the state",
        "Neo-Confucianism, which blended Confucian ethics with ideas from Buddhism and Daoism",
      ],
      correctAnswer: 3,
      explanation:
        "Song thinkers renewed Confucian ethics while responding to Buddhist and Daoist ideas, and examinations rewarded mastery of these texts.",
      sourceIds: ["ced-topic-1-1"],
      choiceExplanations: [
        "Legalism was an older school associated with the Qin; Song examinations tested Confucian classics.",
        "Theravada Buddhism was prominent in Sri Lanka and mainland Southeast Asia, not in Song examinations.",
        "Neo-Confucianism stressed filial piety and family hierarchy as the base of social order.",
        "Song thinkers renewed Confucian ethics while responding to Buddhist and Daoist ideas, and examinations rewarded mastery of these texts.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "The term is right, but Neo-Confucianism kept family duty, including filial piety, at its center.",
      stimulusId: "original-song-exams",
      stimulusBlocks: [excerpts.originalSongExams],
    },
    {
      id: "world-1-1-t07",
      topicId: "world-1-1",
      concept: "influence",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "The author's main argument is that Korea and Japan",
      choices: [
        "borrowed from China selectively in ways that served local elites",
        "borrowed from China selectively, keeping its examination system intact",
        "rejected Chinese influence in order to protect their own traditions",
        "were ruled directly by Chinese officials during this period",
      ],
      correctAnswer: 0,
      explanation:
        "The passage concludes that local elites kept what strengthened them and reshaped the rest.",
      sourceIds: ["ced-topic-1-1"],
      choiceExplanations: [
        "The passage concludes that local elites kept what strengthened them and reshaped the rest.",
        "Korea used examinations, but Japan's shogun governed through warrior vassals instead.",
        "Both societies adopted many Chinese practices, so rejection is the wrong description.",
        "Neither society was ruled directly by China; tribute and cultural influence are not direct rule.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Selective borrowing is right, but Japan's power had moved to warrior families who did not govern through examinations.",
      stimulusId: "original-east-asia-adaptation",
      stimulusBlocks: [excerpts.originalEastAsiaAdaptation],
    },
    {
      id: "world-1-1-t08",
      topicId: "world-1-1",
      concept: "influence",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Based on the passage, which of the following best explains a difference between Korea and Japan in this period?",
      choices: [
        "Korea used Confucian examinations, while Japan copied the Song bureaucracy",
        "Korea adopted Buddhism, while Japan remained entirely Shinto",
        "Korea used Confucian examinations, while Japan was governed by warrior elites",
        "Korea was isolated from China, while Japan traded widely with China",
      ],
      correctAnswer: 2,
      explanation:
        "Korea adopted Chinese-style examinations; in Japan the shogun ruled through warrior vassals.",
      sourceIds: ["ced-topic-1-1"],
      choiceExplanations: [
        "Japan's earlier court used Chinese titles, but the shogun governed through warriors, not a Song-style bureaucracy.",
        "Buddhism was important in both societies, alongside Shinto in Japan.",
        "Korea adopted Chinese-style examinations; in Japan the shogun ruled through warrior vassals.",
        "The passage describes strong Chinese influence on Korea, not isolation.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Japan had borrowed bureaucratic titles earlier, but by this period warrior families held real power.",
      stimulusId: "original-east-asia-adaptation",
      stimulusBlocks: [excerpts.originalEastAsiaAdaptation],
    },
    // END unit-01 practice test
    // BEGIN mock exam questions (written for full-length mock exams; not in topic practice)
    {
      id: "world-1-1-m3-01a",
      topicId: "world-1-1",
      concept: "governance",
      difficulty: "Core",
      skill: "claims-evidence",
      prompt: "Which statement about Song officials is best supported by the passage?",
      choices: [
        "Officials inherited their posts from fathers who had served the emperor",
        "Only military commanders could hold civil offices in the government",
        "Women who were wealthy enough were allowed to sit the examinations",
        "Advancement by examination was open to more than nobles, but costly",
      ],
      correctAnswer: 3,
      explanation:
        "The passage says candidates could rise regardless of birth but that the long years of study favored families who could afford teachers.",
      sourceIds: ["ced-topic-1-1"],
      choiceExplanations: [
        "The passage describes selection by examination, not inheritance.",
        "The passage describes civil service examinations on Confucian texts.",
        "The passage says nothing about women taking examinations.",
        "The passage says candidates could rise regardless of birth but that the long years of study favored families who could afford teachers.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Wealth gave an advantage in preparing for the examinations, but the passage does not make posts hereditary.",
      stimulusId: "mock3-song-china",
      stimulusBlocks: [excerpts.m3Song],
    },
    {
      id: "world-1-1-m3-01b",
      topicId: "world-1-1",
      concept: "economy",
      difficulty: "Apply",
      skill: "developments",
      prompt: "Champa rice contributed to the Song economy primarily by",
      choices: [
        "allowing two harvests a year and supporting more people",
        "replacing paper money as the main means of exchange",
        "removing the need for farmers to pay taxes to the state",
        "replacing millet as the staple crop of the northern steppe",
      ],
      correctAnswer: 0,
      explanation:
        "Fast-ripening rice allowed more food per year, supporting more people and trade.",
      sourceIds: ["ced-topic-1-1"],
      choiceExplanations: [
        "Fast-ripening rice allowed more food per year, supporting more people and trade.",
        "Paper money and rice were separate developments, and the passage connects rice to harvests.",
        "The passage does not say rice reduced taxes.",
        "Champa rice grew in the wet south; it raised southern harvests rather than changing steppe diets.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Song trade did expand, but the passage ties rice directly to farming output.",
      stimulusId: "mock3-song-china",
      stimulusBlocks: [excerpts.m3Song],
    },
    {
      id: "world-1-1-m3-01c",
      topicId: "world-1-1",
      concept: "influence",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which later development in East Asia was most directly influenced by Song-era Neo-Confucianism?",
      choices: [
        "The spread of Theravada Buddhism in Southeast Asian kingdoms",
        "Joseon Korea's use of Confucian education as state ideology",
        "The Mongol use of relay stations to govern across Eurasia",
        "Japan's shogunate built on hereditary warrior rule",
      ],
      correctAnswer: 1,
      explanation:
        "Korea's Joseon dynasty, founded in 1392, made Neo-Confucianism the basis of its government and schools.",
      sourceIds: ["ced-topic-1-1"],
      choiceExplanations: [
        "Theravada Buddhism spread from Sri Lanka, not from Song Neo-Confucian scholarship.",
        "Korea's Joseon dynasty, founded in 1392, made Neo-Confucianism the basis of its government and schools.",
        "The yam system was a Mongol institution, not a product of Neo-Confucian learning.",
        "The shogunate rested on hereditary warrior status, not Confucian examinations.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Japan also absorbed Confucian ideas, but its shogunate rested on hereditary warrior rule rather than Confucian state education.",
      stimulusId: "mock3-song-china",
      stimulusBlocks: [excerpts.m3Song],
    },
    {
      id: "world-1-1-m3-01d",
      topicId: "world-1-1",
      concept: "beliefs",
      difficulty: "Apply",
      skill: "developments",
      prompt: "The spread of foot binding among Song elites is best seen as evidence of",
      choices: [
        "a rejection of Confucian ideas about family and gender roles",
        "Buddhist reforms intended to improve the health of women",
        "patriarchal norms that limited the mobility of elite women",
        "Mongol customs that elite Chinese families adopted early",
      ],
      correctAnswer: 2,
      explanation:
        "Foot binding limited the mobility of women and reflected expectations about gender within elite families.",
      sourceIds: ["ced-topic-1-1"],
      choiceExplanations: [
        "Confucian ideas about family hierarchy supported, not rejected, these norms.",
        "Foot binding was painful and harmful to women, not a health reform.",
        "Foot binding limited the mobility of women and reflected expectations about gender within elite families.",
        "The Mongols did not conquer China until the late 1200s, and foot binding began earlier.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The Mongols later ruled China, but the practice spread under the Song and continued after them.",
      stimulusId: "mock3-song-china",
      stimulusBlocks: [excerpts.m3Song],
    },
    // END mock exam questions
  ],
  quizzes: [
    {
      id: "world-1-1-quiz",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-1",
      title: "East Asia topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
    },
    {
      id: "world-1-1-quick",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-1",
      title: "East Asia quick practice",
      quizType: "quick",
      questionIds: ["k1", "k2", "k3"],
    },
  ],
};

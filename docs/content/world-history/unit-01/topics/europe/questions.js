// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-1-6-q1",
      topicId: "world-1-6",
      concept: "europe-power",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "Why did many medieval European monarchs depend on local nobles?",
      choices: [
        "Nobles controlled land, so kings had no recognized legal claim to rule over their own kingdoms",
        "Nobles were appointed through examinations that kings were required to accept",
        "Nobles controlled land, armed men, and local justice that kings could not run directly",
        "Nobles paid all royal taxes, so kings never needed revenue of their own",
      ],
      correctAnswer: 2,
      explanation:
        "Limited revenue and slow communication made kings rely on lords who held land and followers.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Nobles held land, but kings still claimed authority; the issue was practical control.",
        "European nobility was largely hereditary, not selected by examination.",
        "Limited revenue and slow communication made kings rely on lords who held land and followers.",
        "Kings collected their own revenues, though limited ones; that limit is part of the explanation.",
      ],
      nearMissIndex: 0,
      distinguisher: "The problem was practical capacity, not legal title.",
    },
    {
      id: "world-1-6-q2",
      topicId: "world-1-6",
      concept: "europe-manors",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Which distinction between feudal relationships and manorialism is most useful?",
      choices: [
        "Feudalism linked elites through land and service; manorialism organized peasant labor",
        "Feudalism applied only in towns, while manorialism applied only in monasteries",
        "Feudalism ended in 1200, and manorialism replaced it across all of Europe",
        "Feudalism organized peasant labor; manorialism linked elites through military service",
      ],
      correctAnswer: 0,
      explanation:
        "Feudal ties connected lords and vassals; manors organized production and peasant obligations.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Feudal ties connected lords and vassals; manors organized production and peasant obligations.",
        "Both were rural arrangements centered on land.",
        "Both continued, varying by place, through this period.",
        "This reverses the two systems.",
      ],
      nearMissIndex: 3,
      distinguisher: "Elite ties versus estate labor.",
    },
    {
      id: "world-1-6-q3",
      topicId: "world-1-6",
      concept: "europe-faith",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Which example shows the Church functioning as more than a place of worship?",
      choices: [
        "A priest leads a procession through town on an important holy day",
        "A monastery holds daily prayers and services for monks and local villagers",
        "A cathedral is built in a city to hold the relics of a local saint",
        "A monastery manages farmland, runs a school, and advises regional lords",
      ],
      correctAnswer: 3,
      explanation:
        "Landholding, education, and political influence show economic and social roles beyond worship.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Processions are religious observances.",
        "Prayer services are the Church's religious role, which the question asks you to look beyond.",
        "Relics and cathedrals are religious functions.",
        "Landholding, education, and political influence show economic and social roles beyond worship.",
      ],
      nearMissIndex: 1,
      distinguisher: "Look for economic, educational, or political roles.",
    },
    {
      id: "world-1-6-q4",
      topicId: "world-1-6",
      concept: "europe-faith",
      difficulty: "Apply",
      skill: "developments",
      prompt: "Which statement best describes religious life in medieval Europe?",
      choices: [
        "Christianity dominated, and Jewish and Muslim communities enjoyed fully equal legal rights everywhere",
        "Christianity dominated, while Jewish and Muslim communities faced both exchange and persecution",
        "Most Europeans had converted to Islam after the Crusades brought it to the region",
        "Religion had little effect on daily life outside monasteries and cathedrals",
      ],
      correctAnswer: 1,
      explanation:
        "Christian institutions were central, and minority communities contributed to trade and learning while facing restrictions and violence.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Christianity's dominance is right, but minorities faced legal restrictions and expulsions.",
        "Christian institutions were central, and minority communities contributed to trade and learning while facing restrictions and violence.",
        "Christianity remained the majority religion; Muslim rule existed in parts of Iberia.",
        "Christian beliefs shaped work, holidays, law, and family life.",
      ],
      nearMissIndex: 0,
      distinguisher: "Influence and diversity, with both cooperation and conflict.",
    },
    {
      id: "world-1-6-q5",
      topicId: "world-1-6",
      concept: "europe-agriculture",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "How could agricultural improvements contribute to town growth?",
      choices: [
        "Crop rotation let lords sell their manors to town merchants",
        "Larger harvests could feed people who worked in crafts and trade",
        "Heavy plows were made in towns, which became rich from selling them",
        "Larger harvests could end serfdom, freeing all peasants to move to towns",
      ],
      correctAnswer: 1,
      explanation:
        "Surplus food supported people who did not farm, allowing towns to grow.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Rotation improved yields; it did not transfer estates to merchants.",
        "Surplus food supported people who did not farm, allowing towns to grow.",
        "Towns produced tools, but surplus food explains their growth better.",
        "More food helped towns, but serfdom did not end because of harvests alone.",
      ],
      nearMissIndex: 3,
      distinguisher: "Surplus food supports non-farm work.",
    },
    {
      id: "world-1-6-q6",
      topicId: "world-1-6",
      concept: "europe-agriculture",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which explanation best connects the conditions in the passage to changing labor relations in western Europe?",
      choices: [
        "Plague losses made labor less valuable because fewer goods were needed",
        "Fewer workers raised labor's bargaining power, so serfdom ended everywhere in Europe at once",
        "Abandoned farms let lords hire more workers at lower wages than before",
        "Fewer workers raised labor's bargaining power, while elites tried to hold wages down",
      ],
      correctAnswer: 3,
      explanation:
        "Boccaccio's “high and extravagant wage” reflects scarcity; laws such as England's Statute of Labourers tried to cap wages.",
      sourceIds: ["amsco-unit-1", "ced", "boccaccio-payne-1886"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
        {
          sourceId: "boccaccio-payne-1886",
          locator: "First Day, introduction",
        },
      ],
      choiceExplanations: [
        "Demand fell in some areas, but labor became scarcer and more valuable.",
        "Bargaining power rose, but serfdom declined unevenly over many years.",
        "Scarce labor pushed wages up, not down.",
        "Boccaccio's “high and extravagant wage” reflects scarcity; laws such as England's Statute of Labourers tried to cap wages.",
      ],
      nearMissIndex: 1,
      distinguisher: "Scarcity strengthens bargaining, but elites push back.",
      stimulusBlocks: [excerpts.boccaccioSociety],
    },
    {
      id: "world-1-6-q7",
      topicId: "world-1-6",
      concept: "europe-exchange",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "Why is the Fourth Crusade’s attack on Constantinople important for interpreting religious conflict?",
      choices: [
        "Political and commercial interests could lead crusaders to attack fellow Christians",
        "Political and commercial interests caused nearly every crusade to target Christian cities instead",
        "It showed that the Crusades ended Christian control of Jerusalem permanently",
        "It united the Catholic and Orthodox churches under Byzantine leadership",
      ],
      correctAnswer: 0,
      explanation:
        "The 1204 sack of Constantinople shows motives beyond a simple Christian-versus-Muslim struggle.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The 1204 sack of Constantinople shows motives beyond a simple Christian-versus-Muslim struggle.",
        "Interests mattered, but most crusades targeted Muslim-ruled lands; 1204 is an important exception.",
        "Jerusalem had already been lost to Saladin in 1187; the Fourth Crusade never reached it.",
        "The attack deepened the split between the churches.",
      ],
      nearMissIndex: 1,
      distinguisher: "An exception complicates a simple pattern.",
    },
    {
      id: "world-1-6-q8",
      topicId: "world-1-6",
      concept: "europe-learning",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt: "Which statement best describes early Renaissance humanism?",
      choices: [
        "Humanism began in the monasteries of Ethiopia and spread to Italy",
        "Humanism ended the influence of universities across Europe",
        "Renewed classical study coexisted with Christian belief and institutions",
        "Renewed classical study led most humanists to reject Christian belief",
      ],
      correctAnswer: 2,
      explanation:
        "Many humanists were devout Christians who studied classical texts alongside religious ones.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Humanism developed in Italian cities.",
        "Universities continued and adapted to new learning.",
        "Many humanists were devout Christians who studied classical texts alongside religious ones.",
        "Classical study grew, but most humanists remained Christian.",
      ],
      nearMissIndex: 3,
      distinguisher: "Innovation within continuity.",
    },
    {
      id: "world-1-6-k1",
      topicId: "world-1-6",
      concept: "europe-manors",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "What commonly distinguished a serf from a free peasant?",
      choices: [
        "Exemption from rents, labor, and other dues",
        "Ownership of the land that the family had farmed for generations",
        "Military service owed as a knight to a king or great lord",
        "Inherited duties and limits on movement tied to an estate",
      ],
      correctAnswer: 3,
      explanation:
        "Serfs owed hereditary obligations and often could not leave without permission.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Serfs owed rents and labor; exemption describes privilege.",
        "Serfs worked land they did not own.",
        "Knightly service belonged to elites, not serfs.",
        "Serfs owed hereditary obligations and often could not leave without permission.",
      ],
      nearMissIndex: 1,
      distinguisher: "Serfdom meant inherited obligations and restrictions.",
    },
    {
      id: "world-1-6-k2",
      topicId: "world-1-6",
      concept: "europe-power",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "What was a fief?",
      choices: [
        "A tax paid by peasants to the Church",
        "A charter granting a town self-government",
        "Land or rights granted in return for service",
        "A guild's rules for training apprentices",
      ],
      correctAnswer: 2,
      explanation:
        "A lord granted a fief to a vassal, who owed loyalty and service in return.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Payments to the Church were tithes.",
        "Town charters were separate grants of rights.",
        "A lord granted a fief to a vassal, who owed loyalty and service in return.",
        "Guild rules governed crafts, not land grants.",
      ],
      nearMissIndex: 0,
      distinguisher: "A fief supported a vassal's service.",
    },
    {
      id: "world-1-6-k3",
      topicId: "world-1-6",
      concept: "europe-learning",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "What does vernacular mean in literary history?",
      choices: [
        "A style of church architecture",
        "A language people commonly spoke in a region",
        "A collection of classical Greek texts translated into Latin",
        "Latin, the language of the Church and the universities",
      ],
      correctAnswer: 1,
      explanation:
        "Writers such as Dante and Chaucer wrote in the everyday languages of their regions.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.6 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Vernacular refers to language, not architecture.",
        "Writers such as Dante and Chaucer wrote in the everyday languages of their regions.",
        "Vernacular is the opposite of classical learned languages.",
        "Latin was the learned language; vernacular means the local spoken one.",
      ],
      nearMissIndex: 3,
      distinguisher: "Vernacular means local, everyday language.",
    },
    // BEGIN unit-01 practice test
    // Unit 1 Practice Test items (t-numbered): AP-style sets that each depend on one stimulus.
    {
      id: "world-1-6-t01",
      topicId: "world-1-6",
      concept: "europe-agriculture",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "According to Boccaccio, the authority of the laws collapsed in Florence because",
      choices: [
        "the Church had excommunicated the city's rulers",
        "the officials who enforced the laws had abandoned the city for the countryside",
        "the city's merchants had overthrown the government",
        "the officials who enforced the laws were dead, sick, or without assistants",
      ],
      correctAnswer: 3,
      explanation:
        "He writes that the ministers of the law were dead, sick, or left without followers, so no one could enforce it.",
      sourceIds: ["ced-topic-1-6", "boccaccio-payne-1886"],
      choiceExplanations: [
        "No excommunication appears in the passage.",
        "Flight is described for ordinary people, not given as the reason officials failed.",
        "Boccaccio describes no political revolt.",
        "He writes that the ministers of the law were dead, sick, or left without followers, so no one could enforce it.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Boccaccio says many people fled, but he blames the collapse of law on officials being dead, sick, or without followers.",
      stimulusId: "boccaccio-laws",
      stimulusBlocks: [excerpts.boccaccioLaws],
    },
    {
      id: "world-1-6-t02",
      topicId: "world-1-6",
      concept: "europe-agriculture",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which of the following was a long-term effect of the crisis Boccaccio describes in parts of western Europe?",
      choices: [
        "Labor shortages that led lords to free all serfs voluntarily",
        "Labor shortages that strengthened the bargaining power of surviving workers",
        "The immediate end of serfdom in every European kingdom",
        "The rapid growth of European population in the following decades",
      ],
      correctAnswer: 1,
      explanation:
        "So many deaths left fewer workers, who in some regions could demand higher wages and better terms.",
      sourceIds: ["ced-topic-1-6", "boccaccio-payne-1886"],
      choiceExplanations: [
        "Lords often resisted change, and laws tried to limit wages and mobility.",
        "So many deaths left fewer workers, who in some regions could demand higher wages and better terms.",
        "Serfdom declined unevenly and lasted for centuries in eastern Europe.",
        "The plague sharply reduced population; recovery took generations.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Labor shortages were real, but lords and governments often tried to hold down wages and keep peasants bound.",
      stimulusId: "boccaccio-laws",
      stimulusBlocks: [excerpts.boccaccioLaws],
    },
    {
      id: "world-1-6-t03",
      topicId: "world-1-6",
      concept: "europe-faith",
      difficulty: "Apply",
      skill: "developments",
      prompt:
        "Boccaccio's reference to laws both “human and divine” most directly reflects",
      choices: [
        "the role of the Church as the only real government in western Europe at the time",
        "the spread of Islamic law in Italian city-states",
        "the role of the Church as a source of authority alongside secular governments",
        "the rule of Florence by a council of bishops",
      ],
      correctAnswer: 2,
      explanation:
        "Divine law refers to the Church's authority, which existed beside the city's own laws.",
      sourceIds: ["ced-topic-1-6", "boccaccio-payne-1886"],
      choiceExplanations: [
        "Secular rulers and city governments existed alongside the Church.",
        "Divine law here means Christian teaching, not Islamic law.",
        "Divine law refers to the Church's authority, which existed beside the city's own laws.",
        "Florence was a republic governed by its citizens' councils, not by bishops.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The Church was powerful, but kings, nobles, and city governments also ruled; authority was divided.",
      stimulusId: "boccaccio-laws",
      stimulusBlocks: [excerpts.boccaccioLaws],
    },
    {
      id: "world-1-6-t04",
      topicId: "world-1-6",
      concept: "europe-power",
      difficulty: "Apply",
      skill: "developments",
      prompt:
        "Based on the passage, which of the following best describes political authority in much of western Europe?",
      choices: [
        "Authority was divided between kings and landholding nobles",
        "Authority was held mainly by elected town councils",
        "Authority was divided between kings and Mongol governors",
        "Authority was centralized in salaried officials chosen by examination",
      ],
      correctAnswer: 0,
      explanation:
        "Kings depended on nobles who held land, collected rents, held courts, and kept armed followers.",
      sourceIds: ["ced-topic-1-6"],
      choiceExplanations: [
        "Kings depended on nobles who held land, collected rents, held courts, and kept armed followers.",
        "Towns gained some rights, but nobles controlled most local authority.",
        "Mongol rule did not extend into western Europe.",
        "Examination-selected bureaucrats describe Song China, not Europe.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Towns did win charters, but the passage shows nobles, not town councils, holding most local power.",
      stimulusId: "original-feudalism",
      stimulusBlocks: [excerpts.originalFeudalism],
    },
    {
      id: "world-1-6-t05",
      topicId: "world-1-6",
      concept: "europe-manors",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Which of the following details from the passage best supports the claim that the manorial system was not uniform?",
      choices: [
        "Free peasants rented land for money",
        "Kings had to bargain with nobles to raise armies",
        "Serfs owed their lords days of labor each week",
        "Lords held courts and kept armed followers",
      ],
      correctAnswer: 0,
      explanation: "Free peasants paying rent show that not everyone was a serf.",
      sourceIds: ["ced-topic-1-6"],
      choiceExplanations: [
        "Free peasants paying rent show that not everyone was a serf.",
        "Bargaining concerns kings and nobles, not variation among peasants.",
        "Labor dues show the typical pattern, not variation.",
        "Courts and armed followers describe lords' power, not variation in the system.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Labor dues describe how manors usually worked; the claim needs an exception to the pattern.",
      stimulusId: "original-feudalism",
      stimulusBlocks: [excerpts.originalFeudalism],
    },
    {
      id: "world-1-6-t06",
      topicId: "world-1-6",
      concept: "europe-manors",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "The labor obligations of serfs described in the passage were most similar to",
      choices: [
        "the rotating labor service owed by Mexica nobles to their emperor",
        "the wages paid to factory workers in industrial cities",
        "the rotating labor service owed by communities to the Inca state",
        "the examinations that qualified men for office in Song China",
      ],
      correctAnswer: 2,
      explanation:
        "Both serfs and Inca communities paid obligations in labor rather than money.",
      sourceIds: ["ced-topic-1-6"],
      choiceExplanations: [
        "The Mexica collected tribute in goods; rotating labor service was an Inca practice.",
        "Factory wages belong to a much later period, and serfs were not wage workers.",
        "Both serfs and Inca communities paid obligations in labor rather than money.",
        "Examinations selected officials; they were not labor obligations.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Rotating labor service is the right comparison, but it was owed by Inca communities, not Mexica nobles.",
      stimulusId: "original-feudalism",
      stimulusBlocks: [excerpts.originalFeudalism],
    },
    {
      id: "world-1-6-t07",
      topicId: "world-1-6",
      concept: "europe-learning",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "According to the passage, which of the following contributed to the work of scholars such as Thomas Aquinas?",
      choices: [
        "Translations of Aristotle made by Mongol officials in Baghdad",
        "Translations of Aristotle that reached Latin readers largely through Arabic",
        "Printed books produced on Gutenberg's press",
        "Greek texts brought by scholars fleeing the fall of Constantinople",
      ],
      correctAnswer: 1,
      explanation:
        "The passage says Aristotle reached Latin readers largely through translations from Arabic.",
      sourceIds: ["ced-topic-1-6"],
      choiceExplanations: [
        "Mongol officials did not produce these translations; Iberian centers such as Toledo did.",
        "The passage says Aristotle reached Latin readers largely through translations from Arabic.",
        "Gutenberg's press came about two centuries after Aquinas.",
        "Constantinople fell in 1453, long after Aquinas.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Byzantine scholars did bring Greek texts west, but mostly after 1453, long after Aquinas died in 1274.",
      stimulusId: "original-europe-learning",
      stimulusBlocks: [excerpts.originalEuropeLearning],
    },
    {
      id: "world-1-6-t08",
      topicId: "world-1-6",
      concept: "europe-faith",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "Which of the following would most directly support the claim in the second paragraph?",
      choices: [
        "Evidence that universities taught theology alongside law and medicine",
        "Evidence that popes supported crusades in the eastern Mediterranean",
        "Evidence that most European peasants attended church regularly",
        "Evidence that kings and popes disputed control over appointing bishops",
      ],
      correctAnswer: 3,
      explanation:
        "Disputes over appointing bishops show rulers contesting Church authority, which is the claim.",
      sourceIds: ["ced-topic-1-6"],
      choiceExplanations: [
        "University teaching shows the Church's role in education, not opposition to it.",
        "Supporting crusades demonstrates papal power rather than a challenge to it.",
        "Church attendance shows influence, not challenges to it.",
        "Disputes over appointing bishops show rulers contesting Church authority, which is the claim.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Crusades show papal influence; the claim is that the Church's authority was challenged.",
      stimulusId: "original-europe-learning",
      stimulusBlocks: [excerpts.originalEuropeLearning],
    },
    // END unit-01 practice test
    // BEGIN mock exam questions (written for full-length mock exams; not in topic practice)
    {
      id: "world-1-6-m1-01a",
      topicId: "world-1-6",
      concept: "europe-agriculture",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Which development in the passage most directly made possible the growth of towns?",
      choices: [
        "Rising food output that could support people who did not farm",
        "A single law code issued by the Church for all of Europe",
        "A fall in population that raised the value of labor",
        "A decline in long-distance trade after the Crusades ended",
      ],
      correctAnswer: 0,
      explanation:
        "Better plows, horse collars, and the three-field system produced surplus food, which freed people to work in towns as merchants and artisans.",
      sourceIds: ["ced-topic-1-6"],
      choiceExplanations: [
        "Better plows, horse collars, and the three-field system produced surplus food, which freed people to work in towns as merchants and artisans.",
        "The passage describes no common law code, and the Church did not issue one.",
        "A fall in population came after the plague of the mid-1300s, not before the towns' growth described here.",
        "The passage describes trade expanding through Venice, Genoa, and the Champagne fairs, not declining.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Population loss did raise wages in the late 1300s, but the growth of towns in the passage rests on a food surplus.",
      stimulusId: "mock1-europe-growth",
      stimulusBlocks: [excerpts.m1Europe],
    },
    {
      id: "world-1-6-m1-01b",
      topicId: "world-1-6",
      concept: "europe-learning",
      difficulty: "Apply",
      skill: "developments",
      prompt:
        "The study of Aristotle at European universities most directly reflects the influence of",
      choices: [
        "the spread of printing presses that made books cheap across Europe",
        "Byzantine scholars who brought Greek texts to Italy after 1453",
        "scholarship preserved and translated through the Islamic world",
        "the revival of Roman law studied at Bologna",
      ],
      correctAnswer: 2,
      explanation:
        "The passage says Aristotle's works were preserved and translated through the Islamic world before European scholars studied them.",
      sourceIds: ["ced-topic-1-6"],
      choiceExplanations: [
        "Movable-type printing in Europe began in the 1450s, after the period of the passage.",
        "Greek scholars fleeing Constantinople came after 1453, long after universities began studying Aristotle.",
        "The passage says Aristotle's works were preserved and translated through the Islamic world before European scholars studied them.",
        "Bologna revived Roman law, but the passage links Aristotle's works to translation through the Islamic world.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Printing helped spread Renaissance and Reformation ideas, but the transfer of Aristotle's texts came centuries earlier through Islamic scholars.",
      stimulusId: "mock1-europe-growth",
      stimulusBlocks: [excerpts.m1Europe],
    },
    {
      id: "world-1-6-m1-01c",
      topicId: "world-1-6",
      concept: "europe-power",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Which statement best explains the passage's claim that European kings were weaker than Chinese or Islamic rulers?",
      choices: [
        "European kings commanded no armies of their own and relied on mercenaries",
        "Europe produced no agricultural surplus that rulers could tax",
        "Towns and the Church lost their independence to powerful regional nobles",
        "Power was divided among kings, nobles, towns, and the Church",
      ],
      correctAnswer: 3,
      explanation:
        "The passage ends by noting that power was divided among several competing authorities, which limited what any king could do.",
      sourceIds: ["ced-topic-1-6"],
      choiceExplanations: [
        "Kings had armies, and the passage does not describe reliance on foreign mercenaries.",
        "The passage describes rising food output, so a surplus did exist.",
        "The passage shows towns and the Church gaining importance, not being abolished.",
        "The passage ends by noting that power was divided among several competing authorities, which limited what any king could do.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Kings did raise armies, but they had to bargain with nobles, towns, and the Church for money and support.",
      stimulusId: "mock1-europe-growth",
      stimulusBlocks: [excerpts.m1Europe],
    },
    {
      id: "world-1-6-m1-01d",
      topicId: "world-1-6",
      concept: "europe-exchange",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "The fairs of Champagne and the ships of Venice and Genoa are best understood as part of",
      choices: [
        "the manorial system that bound peasants to the land of their lords",
        "a commercial revival linking Europe to Afro-Eurasian trade",
        "the first European settlements established in the Americas",
        "the Hanseatic League's control of Mediterranean shipping",
      ],
      correctAnswer: 1,
      explanation:
        "Fairs and Mediterranean shipping show Europe's merchants joining the long-distance trade that connected Afro-Eurasia.",
      sourceIds: ["ced-topic-1-6"],
      choiceExplanations: [
        "Manors organized rural labor; fairs and shipping were commercial.",
        "Fairs and Mediterranean shipping show Europe's merchants joining the long-distance trade that connected Afro-Eurasia.",
        "European settlement of the Americas began after 1492.",
        "The Hanseatic League traded in the Baltic and North Seas; Venice and Genoa led Mediterranean shipping.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Manorialism was a real feature of medieval Europe, but it describes rural obligations, not trade.",
      stimulusId: "mock1-europe-growth",
      stimulusBlocks: [excerpts.m1Europe],
    },
    // END mock exam questions
  ],
  quizzes: [
    {
      id: "world-1-6-quiz",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-6",
      title: "Europe topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-1-6-q1",
        "world-1-6-q2",
        "world-1-6-q3",
        "world-1-6-q4",
        "world-1-6-q5",
        "world-1-6-q6",
        "world-1-6-q7",
        "world-1-6-q8",
      ],
    },
    {
      id: "world-1-6-quick",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-6",
      title: "Europe quick practice",
      quizType: "quick",
      questionIds: ["world-1-6-k1", "world-1-6-k2", "world-1-6-k3"],
    },
  ],
};

// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-1-4-q1",
      topicId: "world-1-4",
      concept: "americas-maya",
      difficulty: "Apply",
      skill: "developments",
      prompt: "Which statement best describes Maya political organization?",
      choices: [
        "Rival city-states shared cultural traditions until Mayapan united them into an empire",
        "A single Maya emperor ruled all cities from Tenochtitlan after 1325",
        "Rival city-states shared cultural traditions but had no single permanent government",
        "Maya cities were governed as provinces of the Mexica Triple Alliance",
      ],
      correctAnswer: 2,
      explanation:
        "Maya cities competed and allied with one another while sharing writing, calendars, and religion.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Mayapan was powerful in the later period, but it did not create a lasting empire over all Maya cities.",
        "Tenochtitlan was the Mexica capital, not a Maya one.",
        "Maya cities competed and allied with one another while sharing writing, calendars, and religion.",
        "Most Maya cities lay outside Mexica control.",
      ],
      nearMissIndex: 0,
      distinguisher: "Shared culture, divided politics.",
    },
    {
      id: "world-1-4-q2",
      topicId: "world-1-4",
      concept: "americas-mexica",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "Why was retaining local rulers useful to the Mexica tributary system?",
      choices: [
        "Local rulers delivered tribute, while Mexica military power enforced it",
        "Local rulers became Mexica nobles and moved to Tenochtitlan",
        "Local rulers kept tribute for themselves in exchange for loyalty",
        "Local rulers delivered tribute, so the Mexica no longer needed to maintain an army",
      ],
      correctAnswer: 0,
      explanation:
        "Using existing leaders saved the cost of direct rule, while the threat of force kept tribute flowing.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Using existing leaders saved the cost of direct rule, while the threat of force kept tribute flowing.",
        "Most local rulers stayed in their own communities.",
        "Tribute went to the alliance; that was its purpose.",
        "Local delivery is right, but force remained essential to the system.",
      ],
      nearMissIndex: 3,
      distinguisher: "Indirect rule worked because force backed it.",
    },
    {
      id: "world-1-4-q3",
      topicId: "world-1-4",
      concept: "americas-mexica",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "What was the main relationship between chinampas and Tenochtitlan’s growth?",
      choices: [
        "Chinampas let the city export most of its maize to the Andes",
        "Intensive farming near the city made tribute from other regions unnecessary",
        "Chinampas protected the city from attack by surrounding it with water",
        "Intensive farming near the city helped feed a large urban population",
      ],
      correctAnswer: 3,
      explanation:
        "Raised beds in the lake produced crops close to the city, supporting its growth.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Mesoamerica and the Andes did not trade maize on such a scale.",
        "Chinampas mattered, but tribute still brought food and goods from elsewhere.",
        "The lake helped defense, but chinampas were mainly agricultural.",
        "Raised beds in the lake produced crops close to the city, supporting its growth.",
      ],
      nearMissIndex: 1,
      distinguisher: "Chinampas were one food source among several.",
    },
    {
      id: "world-1-4-q4",
      topicId: "world-1-4",
      concept: "americas-inca",
      difficulty: "Apply",
      skill: "developments",
      prompt: "How did mit’a obligations strengthen Inca administration?",
      choices: [
        "They provided rotating labor, which was paid in gold coins by the state",
        "They provided rotating labor for roads, farms, armies, and storehouses",
        "They required every household to move permanently to Cusco",
        "They let communities pay taxes in silver instead of goods or work",
      ],
      correctAnswer: 1,
      explanation:
        "Communities owed periods of work to the state, which built and supplied the empire.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Rotating labor is right, but the Inca did not use coined money.",
        "Communities owed periods of work to the state, which built and supplied the empire.",
        "Mit'a was a rotating obligation, not permanent relocation.",
        "Inca obligations were met mainly through labor, not silver payments.",
      ],
      nearMissIndex: 0,
      distinguisher: "Labor, not money, was the Inca tax.",
    },
    {
      id: "world-1-4-q5",
      topicId: "world-1-4",
      concept: "americas-inca",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "What inference is supported by Inca roads, relay messengers, and khipus?",
      choices: [
        "Merchants used wheeled carts to move goods along the roads",
        "The state coordinated information and supplies across difficult terrain",
        "Each region governed itself without contact with Cusco",
        "The state coordinated information, which was written in alphabetic script",
      ],
      correctAnswer: 1,
      explanation:
        "Roads, runners, and knotted-cord records let officials manage people and resources over long distances.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Andean transport relied on people and llamas, not wheeled carts.",
        "Roads, runners, and knotted-cord records let officials manage people and resources over long distances.",
        "These tools existed precisely to connect regions to the center.",
        "Coordination is right, but khipus were knotted cords, not alphabetic writing.",
      ],
      nearMissIndex: 3,
      distinguisher: "Infrastructure plus record keeping equals coordination.",
    },
    {
      id: "world-1-4-q6",
      topicId: "world-1-4",
      concept: "americas-environment",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt: "Which comparison accurately connects farming to geography?",
      choices: [
        "Both were techniques for herding llamas in high mountain pastures",
        "Chinampas used Andean slopes, while terraces used lake environments",
        "Both used irrigation canals in flat desert regions of North America",
        "Chinampas used lake environments, while terraces managed Andean slopes",
      ],
      correctAnswer: 3,
      explanation: "Each technique answered a different environmental challenge.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Both were farming methods, not herding techniques.",
        "This reverses the two techniques.",
        "Neither describes desert farming in North America.",
        "Each technique answered a different environmental challenge.",
      ],
      nearMissIndex: 1,
      distinguisher: "Match technique to environment.",
    },
    {
      id: "world-1-4-q7",
      topicId: "world-1-4",
      concept: "americas-north",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "Why is European disease an unsuitable explanation for Mesa Verde’s thirteenth-century relocation?",
      choices: [
        "The relocation happened centuries before Europeans reached the region",
        "The relocation happened before Europeans arrived, so disease played no role anywhere",
        "Ancestral Pueblo people were immune to all diseases",
        "Spanish settlers founded Mesa Verde as a mission town",
      ],
      correctAnswer: 0,
      explanation:
        "Europeans arrived in the Southwest in the 1500s; drought and resource pressures fit the 1200s.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Europeans arrived in the Southwest in the 1500s; drought and resource pressures fit the 1200s.",
        "The timing rules out European disease here, but disease was a real factor in later centuries.",
        "No population was immune to all diseases.",
        "Ancestral Pueblo people built Mesa Verde long before Spanish contact.",
      ],
      nearMissIndex: 1,
      distinguisher: "Check chronology before accepting a cause.",
    },
    {
      id: "world-1-4-q8",
      topicId: "world-1-4",
      concept: "americas-north",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "What can Cahokia’s large earthen mounds most directly support?",
      choices: [
        "The city's residents were all of roughly equal social rank and wealth",
        "The mounds were built by migrants from Mesoamerica",
        "The community organized large amounts of labor and resources",
        "The community organized labor under a written law code",
      ],
      correctAnswer: 2,
      explanation:
        "Building massive mounds required coordinating many workers and food supplies.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Burials and buildings suggest social ranking, not equality.",
        "Cahokia was built by Mississippian peoples of the region.",
        "Building massive mounds required coordinating many workers and food supplies.",
        "Mounds show organized labor, but Cahokia left no written records.",
      ],
      nearMissIndex: 3,
      distinguisher: "Claim only what the evidence can show.",
    },
    {
      id: "world-1-4-k1",
      topicId: "world-1-4",
      concept: "americas-mexica",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "What is tribute?",
      choices: [
        "A record kept on knotted cords by state officials",
        "Goods traded voluntarily between merchants at a market",
        "A gift that rulers gave to their subjects at festivals",
        "Goods or labor that a subject community is required to provide",
      ],
      correctAnswer: 3,
      explanation:
        "Tribute was a required payment imposed on conquered or subordinate communities.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "That describes a khipu.",
        "Market exchange was voluntary; tribute was required.",
        "Tribute flowed to rulers, not from them.",
        "Tribute was a required payment imposed on conquered or subordinate communities.",
      ],
      nearMissIndex: 1,
      distinguisher: "Required, not voluntary.",
    },
    {
      id: "world-1-4-k2",
      topicId: "world-1-4",
      concept: "americas-inca",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "Which tool helped Inca officials keep records?",
      choices: [
        "Chinampas in the lake",
        "Codices painted on bark",
        "Khipus of knotted cords",
        "Stelae carved in stone",
      ],
      correctAnswer: 2,
      explanation: "Khipus recorded numbers and other information with knots.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Chinampas were Mexica farming plots.",
        "Painted codices are associated with Mesoamerica.",
        "Khipus recorded numbers and other information with knots.",
        "Carved stelae are associated with the Maya.",
      ],
      nearMissIndex: 0,
      distinguisher: "Khipus are Inca.",
    },
    {
      id: "world-1-4-k3",
      topicId: "world-1-4",
      concept: "americas-maya",
      difficulty: "Quick check",
      skill: "connections",
      reasoning: "continuity",
      prompt: "What continued after the decline of many Classic Maya centers?",
      choices: [
        "A single permanent empire uniting all of the Maya cities",
        "Maya communities, languages, and later centers such as Mayapan",
        "Mexica imperial control over the entire Yucatán Peninsula",
        "Maya rule over the distant Inca, who paid them regular tribute",
      ],
      correctAnswer: 1,
      explanation:
        "Maya peoples and cities continued, and Maya languages are spoken today.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.4 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "No single empire united all Maya cities.",
        "Maya peoples and cities continued, and Maya languages are spoken today.",
        "The Mexica did not control the Yucatán.",
        "The Maya never ruled the Inca.",
      ],
      nearMissIndex: 3,
      distinguisher: "A city's decline is not the end of a people.",
    },
    // BEGIN unit-01 practice test
    // Unit 1 Practice Test items (t-numbered): AP-style sets that each depend on one stimulus.
    {
      id: "world-1-4-t01",
      topicId: "world-1-4",
      concept: "americas-mexica",
      difficulty: "Apply",
      skill: "developments",
      prompt:
        "Based on the passage, which of the following best describes how the Mexica governed conquered peoples?",
      choices: [
        "They resettled conquered peoples to work on state farms",
        "They left local rulers in place and demanded rotating labor service",
        "They replaced local rulers with officials from Tenochtitlan",
        "They left local rulers in place and demanded regular tribute",
      ],
      correctAnswer: 3,
      explanation:
        "Local rulers stayed, and conquered towns delivered tribute goods recorded on tribute lists.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "Large resettlement policies are associated with the Inca, not with the passage's description.",
        "The Mexica collected goods such as maize, cloth, and cacao rather than labor turns.",
        "The passage says the Mexica usually left local rulers in place.",
        "Local rulers stayed, and conquered towns delivered tribute goods recorded on tribute lists.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Rotating labor service describes the Inca mit'a. The Mexica demanded goods.",
      stimulusId: "original-mexica-tribute",
      stimulusBlocks: [excerpts.originalMexicaTribute],
    },
    {
      id: "world-1-4-t02",
      topicId: "world-1-4",
      concept: "americas-mexica",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "The passage suggests which of the following was an effect of the Mexica tribute system?",
      choices: [
        "It created resentment that led subject peoples to overthrow the Mexica before 1519",
        "It created resentment that later helped Spanish forces find allies",
        "It ended warfare among the peoples of central Mexico",
        "It caused the Mexica to abandon Tenochtitlan for a new capital",
      ],
      correctAnswer: 1,
      explanation:
        "The passage says resentment led several subject and rival peoples to fight alongside the Spanish.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "No overthrow happened before the Spanish arrived; resentment mattered during the Spanish invasion.",
        "The passage says resentment led several subject and rival peoples to fight alongside the Spanish.",
        "The system was enforced by the threat of war, so it did not end warfare.",
        "Tribute flowed into Tenochtitlan, which remained the capital.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Resentment is right, but the Mexica remained in power until the Spanish and their Indigenous allies attacked after 1519.",
      stimulusId: "original-mexica-tribute",
      stimulusBlocks: [excerpts.originalMexicaTribute],
    },
    {
      id: "world-1-4-t03",
      topicId: "world-1-4",
      concept: "americas-mexica",
      difficulty: "Challenge",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "The Mexica system described in the passage was most similar to which of the following in Afro-Eurasia?",
      choices: [
        "Mongol rulers' appointment of their own governors to replace every conquered local prince",
        "Song China's use of examination-selected officials in every county",
        "Mongol rulers' collection of tribute from conquered states that kept their own princes",
        "European manors, where serfs owed labor directly to resident lords",
      ],
      correctAnswer: 2,
      explanation:
        "In places such as the Rus principalities, Mongols collected tribute while local princes kept power, as Mexica allies did.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "Replacing every prince would be direct rule, which the Mexica generally avoided.",
        "Song officials governed directly, unlike the Mexica.",
        "In places such as the Rus principalities, Mongols collected tribute while local princes kept power, as Mexica allies did.",
        "Manorial labor was owed locally to lords, not as imperial tribute.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Mongol rule did use governors in some places, but the comparison that fits the Mexica is indirect rule through local rulers who paid tribute.",
      stimulusId: "original-mexica-tribute",
      stimulusBlocks: [excerpts.originalMexicaTribute],
    },
    {
      id: "world-1-4-t04",
      topicId: "world-1-4",
      concept: "americas-inca",
      difficulty: "Apply",
      skill: "developments",
      prompt:
        "According to the passage, the Inca state obtained most of its resources through",
      choices: [
        "labor obligations owed by communities on a rotating basis",
        "tribute in goods that conquered rulers delivered to Cusco",
        "taxes paid in grain to officials who kept written ledgers",
        "taxes paid in silver coins by each household",
      ],
      correctAnswer: 0,
      explanation:
        "Communities owed mit'a, rotating labor that farmed state lands and built infrastructure.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "Communities owed mit'a, rotating labor that farmed state lands and built infrastructure.",
        "Tribute deliveries describe the Mexica more than the Inca.",
        "The Inca had no written ledgers; khipu recorded numbers.",
        "The passage says the state collected little in goods or money from households.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Tribute in goods was the Mexica pattern. The Inca counted obligations in labor.",
      stimulusId: "original-inca-administration",
      stimulusBlocks: [excerpts.originalIncaAdministration],
    },
    {
      id: "world-1-4-t05",
      topicId: "world-1-4",
      concept: "americas-inca",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Which of the following details from the passage best supports the claim that the Inca developed effective administrative tools?",
      choices: [
        "Officials tracked people and goods with khipu",
        "Communities sent soldiers to serve in the army",
        "Workers produced cloth for the state",
        "The state expanded from Cusco in the fifteenth century",
      ],
      correctAnswer: 0,
      explanation:
        "Khipu let officials record people, labor, and stores without writing, a key administrative tool.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "Khipu let officials record people, labor, and stores without writing, a key administrative tool.",
        "Military service is an obligation, not a tool of administration.",
        "Cloth shows the results of labor but not how officials administered it.",
        "Expansion describes growth, not the tools that managed it.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Cloth production shows what labor produced; the claim is about how officials kept track of it.",
      stimulusId: "original-inca-administration",
      stimulusBlocks: [excerpts.originalIncaAdministration],
    },
    {
      id: "world-1-4-t06",
      topicId: "world-1-4",
      concept: "americas-inca",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which of the following best explains why the Inca built the road network described in the passage?",
      choices: [
        "To connect the Andes with Mexica cities in central Mexico",
        "To carry messages, since khipu could not be carried by runners",
        "To carry messages and move troops and supplies across difficult terrain",
        "To allow merchants to sell goods in markets across the empire",
      ],
      correctAnswer: 2,
      explanation:
        "Relay runners and way stations moved information, soldiers, and supplies through the mountains.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "There was no road link between the Andes and central Mexico.",
        "Runners could carry khipu with them; nothing prevented it.",
        "Relay runners and way stations moved information, soldiers, and supplies through the mountains.",
        "Inca roads served the state; private merchant trade was limited.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Runners did carry messages, and they could carry khipu; the error is the claim that khipu could not travel.",
      stimulusId: "original-inca-administration",
      stimulusBlocks: [excerpts.originalIncaAdministration],
    },
    {
      id: "world-1-4-t07",
      topicId: "world-1-4",
      concept: "americas-north",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "The archaeologists described in the passage use elite burials as evidence that Cahokia",
      choices: [
        "was abandoned because of warfare with neighboring peoples",
        "was a ranked society with access to goods from distant regions",
        "was founded by migrants from the Mexica Empire",
        "was a ranked society that kept written records of trade",
      ],
      correctAnswer: 1,
      explanation:
        "Burials with valuable goods from far away suggest a ranked society tied to long-distance exchange.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "The passage does not give warfare as the cause of decline.",
        "Burials with valuable goods from far away suggest a ranked society tied to long-distance exchange.",
        "Cahokia was a Mississippian center that predates the Mexica Empire.",
        "Cahokia had no writing; the evidence is archaeological.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Rank is supported, but no written records are mentioned; the evidence is material objects.",
      stimulusId: "original-cahokia",
      stimulusBlocks: [excerpts.originalCahokia],
    },
    {
      id: "world-1-4-t08",
      topicId: "world-1-4",
      concept: "americas-north",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which of the following best explains Cahokia's ability to support a large population?",
      choices: [
        "Tribute collected from Andean communities",
        "Maize farming made possible by terraced mountain slopes",
        "Trade with Spanish settlers along the Mississippi",
        "Maize farming in a fertile river floodplain",
      ],
      correctAnswer: 3,
      explanation:
        "The passage links Cahokia's population to maize grown in fertile floodplain soil.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "Cahokia had no contact with the Andes.",
        "Terraces were an Andean technique; Cahokia lay in a river valley.",
        "Cahokia declined long before Spanish arrival.",
        "The passage links Cahokia's population to maize grown in fertile floodplain soil.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Maize is correct, but terraces belong to the Andes; Cahokia farmed a flat river floodplain.",
      stimulusId: "original-cahokia",
      stimulusBlocks: [excerpts.originalCahokia],
    },
    // END unit-01 practice test
    // BEGIN mock exam questions (written for full-length mock exams; not in topic practice)
    {
      id: "world-1-4-m2-01a",
      topicId: "world-1-4",
      concept: "americas-inca",
      difficulty: "Core",
      skill: "claims-evidence",
      prompt: "Which statement about Inca governance is best supported by the passage?",
      choices: [
        "Gold and silver coins financed the roads and storehouses of the empire",
        "Officials relied on an alphabetic script to record decisions and laws",
        "The state drew on the labor of households instead of collecting money taxes",
        "Local lords kept independent armies that the state could not command",
      ],
      correctAnswer: 2,
      explanation:
        "The passage describes the mit'a labor service and says the Inca had no money economy.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "The passage says the Inca had no money economy.",
        "The passage says officials kept records on knotted cords, not in an alphabet.",
        "The passage describes the mit'a labor service and says the Inca had no money economy.",
        "The passage says the state supplied soldiers through labor service, so armies were not independent.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The Inca did keep written-style records, but on quipus, which are not a script.",
      stimulusId: "mock2-inca-state",
      stimulusBlocks: [excerpts.m2Inca],
    },
    {
      id: "world-1-4-m2-01b",
      topicId: "world-1-4",
      concept: "americas-inca",
      difficulty: "Apply",
      skill: "developments",
      prompt: "The Inca used quipus mainly to",
      choices: [
        "record census figures, labor obligations, and the contents of storehouses",
        "write laws that were displayed in public squares for ordinary people",
        "mark the boundaries of the private farmland owned by each family",
        "send news by messenger from one region of the empire to another",
      ],
      correctAnswer: 0,
      explanation:
        "The passage says officials kept census data, labor obligations, and storehouse contents on quipus.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "The passage says officials kept census data, labor obligations, and storehouse contents on quipus.",
        "The passage describes no public posting of laws.",
        "Farmland was organized by the state and community, not recorded as private property on quipus in the passage.",
        "Messengers carried news along the roads; quipus kept records.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Quipus and messengers both appear in Inca administration, but the cords stored records rather than carrying news themselves.",
      stimulusId: "mock2-inca-state",
      stimulusBlocks: [excerpts.m2Inca],
    },
    {
      id: "world-1-4-m2-01c",
      topicId: "world-1-4",
      concept: "americas-mexica",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "How did the Inca method of drawing on conquered peoples differ from that of the Mexica?",
      choices: [
        "The Inca demanded tribute in cacao and cloth, while the Mexica demanded labor service",
        "The Inca relied mainly on rotating labor service, while the Mexica relied mainly on tribute in goods",
        "The Inca abolished all local customs, while the Mexica preserved every one",
        "The Inca paid conquered peoples in coins, while the Mexica paid them in land",
      ],
      correctAnswer: 1,
      explanation:
        "The Inca mit'a organized labor, whereas the Mexica collected tribute such as cloth, food, and cacao from conquered cities.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "The statement reverses the two systems.",
        "The Inca mit'a organized labor, whereas the Mexica collected tribute such as cloth, food, and cacao from conquered cities.",
        "The Inca moved communities and spread Quechua but did not abolish every local custom, and the Mexica did not preserve them all.",
        "Neither empire used coins as the passage and the topic describe.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Both empires took resources from conquered peoples, but the form of what they took differed.",
      stimulusId: "mock2-inca-state",
      stimulusBlocks: [excerpts.m2Inca],
    },
    {
      id: "world-1-4-m2-01d",
      topicId: "world-1-4",
      concept: "americas-environment",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "Which geographic challenge did Inca roads and terraces most directly help overcome?",
      choices: [
        "Dense rainforest that blocked access to the Amazon's rivers",
        "Seasonal flooding of a great river valley",
        "A lack of timber for building ocean-going ships",
        "Steep mountain terrain that limited farming and travel",
      ],
      correctAnswer: 3,
      explanation:
        "The Andes' steep slopes limited farmland and travel, and terraces and roads made them more usable.",
      sourceIds: ["ced-topic-1-4"],
      choiceExplanations: [
        "The Inca heartland was in the Andes, not a lowland rainforest.",
        "River flooding shaped Egypt's Nile Valley, not the Andes.",
        "The Inca did not depend on ocean-going ships.",
        "The Andes' steep slopes limited farmland and travel, and terraces and roads made them more usable.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The Inca did reach lowland areas, but their roads and terraces were built for high-mountain terrain.",
      stimulusId: "mock2-inca-state",
      stimulusBlocks: [excerpts.m2Inca],
    },
    // END mock exam questions
  ],
  quizzes: [
    {
      id: "world-1-4-quiz",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-4",
      title: "The Americas topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-1-4-q1",
        "world-1-4-q2",
        "world-1-4-q3",
        "world-1-4-q4",
        "world-1-4-q5",
        "world-1-4-q6",
        "world-1-4-q7",
        "world-1-4-q8",
      ],
    },
    {
      id: "world-1-4-quick",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-4",
      title: "The Americas quick practice",
      quizType: "quick",
      questionIds: ["world-1-4-k1", "world-1-4-k2", "world-1-4-k3"],
    },
  ],
};

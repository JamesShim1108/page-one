// Unit 4 writing practice: a stimulus-based SAQ with model APE responses.
// Lenses name the InSPECT categories in ../framework.js. Increment `version` when a
// prompt or its fields change enough to invalidate saved drafts.
import { excerpts } from "../excerpts.js";
import { dbq, dbqDocument, leq, saq } from "../writing-kit.js";

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

export const writingQuizzes = [
  {
    id: "world-4-saq-01",
    version: 1,
    courseId: "world",
    unitId: "world-4",
    title: "Unit 4 SAQ 01",
    headline: "Smith on the discoveries",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.smithDiscovery],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["E", "S"],
        prompt: "Identify ONE effect of the voyages of exploration that Smith describes.",
        criteria: [
          "Names a specific effect stated in the passage.",
          "Connects the effect to the voyages of exploration.",
        ],
        model: {
          answer:
            "Smith says the voyages connected distant parts of the world through trade.",
          prove:
            "He writes that the discoveries united “the most distant parts of the world,” letting them relieve one another's wants and encourage one another's industry.",
          explain:
            "Sea routes to the Americas and around Africa let goods move between regions that had never traded directly, creating a global economy.",
        },
        alternatives:
          "Answers can also identify the misfortunes suffered by Indigenous peoples, or the strengthening of the mercantile system.",
        review: [
          {
            topicId: "world-4-8",
            sectionId: "what-changed",
            label: "What changed",
          },
        ],
      },
      {
        id: "b",
        lenses: ["E", "S", "P"],
        prompt:
          "Explain ONE way European expansion caused the “dreadful misfortunes” Smith describes for the natives of the Americas in the period 1450 to 1750.",
        criteria: [
          "Names a specific development from the period.",
          "Explains how it harmed Indigenous peoples.",
        ],
        model: {
          answer:
            "Spanish labor systems forced Indigenous people into dangerous work for colonial profit.",
          prove:
            "Under the Spanish mit'a, Andean communities had to send men to the silver mines of Potosí, where many died from accidents and mercury poisoning.",
          explain:
            "Because colonial wealth depended on silver, Spain used its power to force Indigenous labor, which Smith calls the “superiority of force” that allowed injustice.",
        },
        alternatives:
          "Answers can also explain the encomienda system, epidemic disease such as smallpox, or the conquest of the Mexica and Inca.",
        review: [
          {
            topicId: "world-4-5",
            sectionId: "labor-systems",
            label: "Coerced labor",
          },
          {
            topicId: "world-4-3",
            sectionId: "disease",
            label: "Disease",
          },
        ],
      },
      {
        id: "c",
        lenses: ["C", "E"],
        prompt:
          "Explain ONE way Smith's purpose in writing might affect how historians use this passage.",
        criteria: [
          "Identifies a specific feature of Smith's purpose or point of view.",
          "Explains how it affects the passage's usefulness as evidence.",
        ],
        model: {
          answer:
            "Smith wrote to criticize mercantilism, so he presents colonial trade in a way that supports his case for freer trade.",
          prove:
            "He describes the discoveries raising the mercantile system to “splendour and glory,” a system the rest of his book attacks.",
          explain:
            "Historians can use the passage as evidence of an influential 1776 view, but they should check his economic claims against other evidence because he was making an argument.",
        },
        alternatives:
          "Answers can also note that Smith wrote in 1776, centuries after the voyages, so the passage reflects later reflection rather than eyewitness experience.",
        review: [
          {
            topicId: "world-4-2",
            sectionId: "motives",
            label: "Mercantilism",
          },
        ],
      },
    ],
    sourceIds: ["smith-wealth-of-nations", "ced-topic-4-8", "ced"],
  },
  // BEGIN mock exam prompts (written for full-length mock exams)
  saq({
    id: "world-4-saq-02",
    unitNumber: 4,
    number: 2,
    headline: "Why the Mexica were defeated",
    promptTitle: "Secondary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    stimulusBlocks: [excerpts.m1Conquest],
    sourceIds: ["ced-topic-4-4", "ced-topic-4-3"],
    parts: [
      {
        id: "a",
        lenses: ["P", "In"],
        prompt:
          "Identify ONE factor, other than Spanish weapons, that the passage says helped the Spanish defeat the Mexica.",
        criteria: [
          "States a specific factor named in the passage.",
          "Does not rely on Spanish weapons or horses.",
        ],
        model: {
          answer:
            "The Spanish were helped by Indigenous allies who fought against the Mexica.",
          prove:
            "The passage says Cortés fought with tens of thousands of allies, such as the Tlaxcalans, who supplied most of the fighters in the siege of Tenochtitlan.",
          explain:
            "Their help shows that the conquest depended on divisions among Indigenous peoples who resented Mexica tribute, not on Spanish strength alone.",
        },
        alternatives: "The smallpox epidemic that began in 1520 also earns the point.",
        review: [
          {
            topicId: "world-4-4",
            sectionId: "spanish-conquests",
            label: "Spanish conquests",
          },
        ],
      },
      {
        id: "b",
        lenses: ["In", "P"],
        prompt:
          "Explain ONE piece of historical evidence, not mentioned in the passage, that supports the argument that disease helped Spanish conquests in the Americas.",
        criteria: [
          "Gives a specific example beyond the passage.",
          "Explains how disease weakened Indigenous resistance in that example.",
        ],
        model: {
          answer: "Disease also weakened the Inca Empire before Pizarro's conquest.",
          prove:
            "Smallpox or a related epidemic spread through the Andes ahead of the Spanish and killed the emperor Huayna Capac in the 1520s, and a civil war followed between his sons Huáscar and Atahualpa.",
          explain:
            "The war left the empire divided when Pizarro arrived in 1532, which let a small Spanish force capture Atahualpa and exploit the split.",
        },
        alternatives:
          "Answers can also explain that Indigenous populations in Mesoamerica and the Andes fell by as much as 90 percent in the century after contact, which left too few people to resist forced labor or rebuild.",
        review: [
          {
            topicId: "world-4-3",
            sectionId: "disease",
            label: "Disease",
          },
        ],
      },
      {
        id: "c",
        lenses: ["T", "P"],
        prompt:
          "Explain ONE way Spanish technology could be used to qualify the argument that alliances and disease, rather than technology alone, explain the conquest.",
        criteria: [
          "Names a specific technology or tactic.",
          "Explains how it contributed to the Spanish victory without ignoring the passage's argument.",
        ],
        model: {
          answer:
            "Spanish technology mattered because it gave the Spanish and their allies advantages in the final siege.",
          prove:
            "Cortés had thirteen brigantines built to use on Lake Texcoco, and steel weapons, armor, and firearms gave his soldiers advantages in battle.",
          explain:
            "The boats let the besiegers cut off Tenochtitlan's food and attack its causeways, so technology helped turn the alliances and disease into victory.",
        },
        alternatives:
          "Answers can also explain how cannon or horses frightened Indigenous opponents or gave the Spanish an advantage in open fighting.",
        review: [
          {
            topicId: "world-4-4",
            sectionId: "spanish-conquests",
            label: "Spanish conquests",
          },
        ],
      },
    ],
  }),
  saq({
    id: "world-4-saq-03",
    unitNumber: 4,
    number: 3,
    headline: "The Atlantic slave trade and Africa",
    promptTitle: "Short-answer question without a stimulus",
    prompt: "Answer all parts of the question.",
    sourceIds: ["ced-topic-4-5", "ced-topic-4-4"],
    parts: [
      {
        id: "a",
        lenses: ["E", "In"],
        prompt:
          "Identify ONE reason European planters in the Americas turned to enslaved Africans for labor in the 1500s and 1600s.",
        criteria: [
          "States a specific reason.",
          "Connects the reason to labor in the Americas.",
        ],
        model: {
          answer:
            "Planters needed more labor after disease and overwork reduced the Indigenous workforce.",
          prove:
            "Epidemics of smallpox and measles and harsh conditions in the Caribbean and Brazil killed so many Indigenous workers that sugar planters needed another source of labor.",
          explain:
            "Because the Portuguese and other Europeans already traded for captives along the African coast, the Atlantic slave trade offered a supply that could be expanded as plantations grew.",
        },
        alternatives:
          "Answers can also identify the rising European demand for sugar and the profits of plantation agriculture.",
        review: [
          {
            topicId: "world-4-5",
            sectionId: "atlantic-slave-trade",
            label: "The Atlantic slave trade",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "E"],
        prompt:
          "Describe ONE way African rulers or merchants took part in the Atlantic slave trade.",
        criteria: [
          "Names a specific African state, ruler, or group.",
          "Describes what that group did in the trade.",
        ],
        model: {
          answer:
            "Some African states captured people in war and sold them to European traders.",
          prove:
            "Kingdoms such as Dahomey and Asante sold captives to Europeans on the West African coast in exchange for goods such as firearms, textiles, and iron.",
          explain:
            "These states used the imported weapons to expand their power, which in turn produced more captives for the trade.",
        },
        alternatives:
          "Answers can also describe King Afonso I of Kongo, who tried to limit the trade, or African merchants who bought and transported captives to coastal forts.",
        review: [
          {
            topicId: "world-4-4",
            sectionId: "african-states",
            label: "African states in Atlantic trade",
          },
        ],
      },
      {
        id: "c",
        lenses: ["S", "P"],
        prompt:
          "Explain ONE effect of the Atlantic slave trade on African societies between 1500 and 1750.",
        criteria: [
          "Names a specific effect on African societies.",
          "Explains how the slave trade produced it.",
        ],
        model: {
          answer: "The trade increased warfare and the power of slave-raiding states.",
          prove:
            "As demand for captives grew, states such as Dahomey and Oyo expanded their armies and raided their neighbors to supply the trade.",
          explain:
            "This pattern made neighboring peoples less secure and tied the political strength of some states to the Atlantic trade.",
        },
        alternatives:
          "Answers can also explain population loss, especially among young adults, or unequal gender ratios in regions where more men were taken.",
        review: [
          {
            topicId: "world-4-5",
            sectionId: "atlantic-slave-trade",
            label: "The Atlantic slave trade",
          },
        ],
      },
    ],
  }),
  leq({
    id: "world-4-leq-causation",
    unitNumber: 4,
    headline: "Causes of European exploration",
    prompt:
      "Evaluate the relative importance of the causes of the voyages of European exploration in the period 1450 to 1600.",
    sourceIds: ["ced-topic-4-2", "ced-topic-4-1"],
    topicId: "world-4-2",
    outlineReview: { sectionId: "motives", label: "Why Europeans explored" },
    essayReview: { sectionId: "portuguese-voyages", label: "Portuguese voyages" },
    modelResponse:
      "In the 1300s and 1400s, goods from Asia such as spices and silk reached Europe through a chain of Muslim and Italian middlemen, and each stage added to the price. At the same time, the Reconquista was ending Muslim rule in Iberia, and small kingdoms in Portugal and Spain were growing stronger.\n\nAlthough religious zeal and state rivalry mattered, the most important cause of the voyages of exploration between 1450 and 1600 was the search for wealth by merchants and rulers who wanted direct access to Asian trade and African gold, which new navigation technology made possible.\n\nThe pursuit of profit explains why the voyages began and why they continued. Portuguese ships sailed down the African coast in the 1400s under Prince Henry's patronage in search of gold and a route that avoided North African middlemen. In 1498 Vasco da Gama reached Calicut, and Portugal built trading posts that let it buy spices directly. Columbus, backed by Queen Isabella in 1492, also set out to reach Asia by sailing west. When Spain found gold and silver, including the mountain of silver at Potosí, the profits drew more expeditions.\n\nTechnology made the economic goal reachable. The caravel's lateen sails let ships sail against the wind, and the compass and astrolabe, adopted from Islamic and Chinese navigators, helped sailors find their position far from land. Without these tools, wealth alone could not have sent ships across the open Atlantic or around Africa.\n\nReligion and rivalry shaped how Europeans explored but were not the main reason they did so. The Reconquista gave Spain and Portugal a tradition of crusading, and rulers promised to spread Christianity, yet missions followed the ships and trading posts rather than leading them. State competition mattered because Spain and Portugal sought to outdo one another, as in the Treaty of Tordesillas in 1494, but the rivalry was over who would control wealth.\n\nIn conclusion, the desire for wealth was the most important cause of exploration, with technology as the enabling condition and religion and rivalry as influences on how the competition was carried out.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes the earlier overland trade through middlemen and the Reconquista in Iberia.",
      },
      {
        label: "Thesis",
        text: "The thesis ranks the causes, names wealth as most important, and previews the roles of technology, religion, and rivalry.",
      },
      {
        label: "Evidence",
        text: "Prince Henry, da Gama, Columbus, Potosí, the caravel, the astrolabe, and the Treaty of Tordesillas are specific and tied to the claim.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay uses causation to weigh motives against enabling conditions and explains why religion and rivalry are less important. Treating technology as a condition and not a motive shows complex understanding.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that state rivalry was most important, using the competition between Portugal and Spain and later the entry of the Dutch, English, and French, while treating profit as the goal that rivalry intensified.",
    commonErrors: [
      "Listing God, gold, and glory without arguing which mattered most.",
      "Treating Columbus as the cause of exploration instead of one example of it.",
      "Claiming Europeans were the first to cross oceans or use navigation tools.",
      "Describing the voyages instead of explaining why they were made.",
    ],
  }),
  saq({
    id: "world-4-saq-04",
    unitNumber: 4,
    number: 4,
    headline: "Montaigne on the Tupinamba",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    stimulusBlocks: [excerpts.montaigneCannibals],
    sourceIds: ["montaigne-cotton-1877", "ced-topic-4-8"],
    parts: [
      {
        id: "a",
        lenses: ["C", "S"],
        prompt:
          "Identify ONE claim Montaigne makes about the word “barbarism” in the passage.",
        criteria: [
          "States a specific claim from the passage.",
          "Connects it to how people label unfamiliar customs.",
        ],
        model: {
          answer:
            "Montaigne claims that people call barbaric whatever is not the custom in their own country.",
          prove:
            "He writes that “every one gives the title of barbarism to everything that is not in use in his own country.”",
          explain:
            "The claim suggests that European judgments of Indigenous Americans reflected habit and bias more than a fair comparison.",
        },
        alternatives:
          "Answers can also identify his claim that torturing a living person is more barbarous than eating a dead one.",
        review: [
          {
            topicId: "world-4-3",
            sectionId: "environment-labor",
            label: "Contact and its consequences",
          },
        ],
      },
      {
        id: "b",
        lenses: ["C", "P"],
        prompt:
          "Explain ONE way the situation in which Montaigne was writing might affect how historians use the passage.",
        criteria: [
          "Identifies a specific feature of Montaigne's situation or purpose.",
          "Explains how it affects the passage's usefulness as evidence.",
        ],
        model: {
          answer:
            "Montaigne wrote during the French wars of religion and used the Tupinamba to criticize Europeans.",
          prove:
            "He compares the cruelty of eating a dead enemy with the torture and killing of neighbors “under colour of piety and religion” in France.",
          explain:
            "Because his purpose was to criticize his own society, the passage is strong evidence of one French thinker's views but may idealize the Tupinamba and cannot be treated as a full account of their lives.",
        },
        alternatives:
          "Answers can also note that Montaigne relied on a servant who had lived in Brazil rather than on his own observation.",
        review: [
          {
            topicId: "world-4-2",
            sectionId: "spanish-voyages",
            label: "Spanish voyages",
          },
        ],
      },
      {
        id: "c",
        lenses: ["S", "P"],
        prompt:
          "Explain ONE way European debates about the treatment of Indigenous peoples of the Americas developed in the 1500s.",
        criteria: [
          "Names a specific person, law, or debate.",
          "Explains what it shows about European views of Indigenous peoples.",
        ],
        model: {
          answer:
            "Some Spanish writers and officials argued that Indigenous peoples should be treated more humanely.",
          prove:
            "The priest Bartolomé de las Casas criticized the encomienda system and the abuse of Indigenous workers, and the Spanish crown issued the New Laws of 1542 to limit forced labor.",
          explain:
            "The debate shows that some Europeans questioned conquest and forced labor, though the reforms were often poorly enforced.",
        },
        alternatives:
          "Answers can also explain the Valladolid debate of 1550 and 1551 between Las Casas and Juan Ginés de Sepúlveda over the rights of Indigenous peoples.",
        review: [
          {
            topicId: "world-4-5",
            sectionId: "labor-systems",
            label: "Coerced labor",
          },
        ],
      },
    ],
  }),
  leq({
    id: "world-4-leq-continuity",
    unitNumber: 4,
    headline: "Global trade and China's economy",
    prompt:
      "Evaluate the extent to which global trade changed China's economy and society in the period 1500 to 1750.",
    sourceIds: ["ced-topic-4-5", "ced-topic-4-8"],
    topicId: "world-4-8",
    outlineReview: { sectionId: "what-changed", label: "What changed" },
    essayReview: { sectionId: "what-continued", label: "What continued" },
    modelResponse:
      "Before 1500, China had the world's largest economy and a history of foreign trade, but the Ming dynasty, founded in 1368, restricted private overseas trade after the voyages of Zheng He ended in the 1430s. Government revenue came mainly from land taxes collected from peasants, and the Confucian civil service examinations selected officials.\n\nBetween 1500 and 1750, global trade changed China's economy significantly by bringing in silver and new crops, but it did not change the Confucian state or the dominance of agriculture, so the change was major in the economy and limited in politics and social order.\n\nThe flow of silver reshaped the economy. After the Spanish founded Manila in 1571, galleons carried silver from the Americas across the Pacific, and Chinese merchants exchanged silk and porcelain for it. China's demand for silver was strong because the Ming government, in tax reforms often called the Single Whip, collected taxes in silver. As a result, markets expanded, more peasants sold crops and crafts for money, and cities such as Jingdezhen grew as centers of porcelain production for export.\n\nNew crops from the Americas also changed society. Maize, sweet potatoes, and peanuts could grow on hillsides and poor soil, and historians connect them to the growth of China's population in the 1600s and 1700s. More people settled in upland areas, which changed the landscape and farming.\n\nHowever, important structures stayed the same. The Confucian examination system and the emperor's authority continued under both the Ming and the Qing, who took power in 1644. Most people remained peasant farmers, family and kinship stayed central, and the court still limited foreign merchants to certain ports and did not give them political influence. Silver also showed China's vulnerability: when imports declined in the 1630s and 1640s, the shortage of silver contributed to a fiscal crisis that helped bring down the Ming.\n\nIn conclusion, global trade transformed money, markets, and food in China, but the political system and the central role of agriculture remained, so the change was deep in the economy and shallow in the structure of the state.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes the Ming dynasty, the end of Zheng He's voyages, and China's tax system before 1500.",
      },
      {
        label: "Thesis",
        text: "The thesis answers the question of extent, distinguishing change in the economy from continuity in politics and social order.",
      },
      {
        label: "Evidence",
        text: "Manila, silver taxation, Jingdezhen, new American crops, the examination system, and the Ming fiscal crisis are specific and used to support the argument.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay organizes evidence around what changed and what continued, and it qualifies the claim by noting China's vulnerability to changes in the silver supply.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that global trade changed China less than it changed the Americas or Europe, using the Qing's control of foreign merchants and the small share of trade in China's economy as evidence of continuity.",
    commonErrors: [
      "Describing trade without saying how much it changed China.",
      "Claiming that China was isolated from the world before 1500 or after.",
      "Listing changes without any evidence of what stayed the same.",
      "Using events after 1750 as the main evidence.",
    ],
  }),
  // END mock exam prompts
];

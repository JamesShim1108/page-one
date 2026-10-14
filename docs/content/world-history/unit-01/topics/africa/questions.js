// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-1-5-q1",
      topicId: "world-1-5",
      concept: "africa-kinship",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt: "Which comparison of Mali and the Hausa city-states is accurate?",
      choices: [
        "Mali built a large empire, while Hausa cities were provinces within it",
        "Both were ruled by a single dynasty that united West Africa after 1250",
        "Mali built a large empire, while Hausa cities kept separate rulers",
        "Both were coastal states that depended mainly on Indian Ocean trade",
      ],
      correctAnswer: 2,
      explanation:
        "Mali expanded into an empire under one ruler, while Hausa city-states such as Kano governed themselves.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Mali's empire is right, but the Hausa cities were independent, not Malian provinces.",
        "No single dynasty united West Africa; Mali and the Hausa cities were separate.",
        "Mali expanded into an empire under one ruler, while Hausa city-states such as Kano governed themselves.",
        "Both were inland states linked to Saharan and regional trade.",
      ],
      nearMissIndex: 0,
      distinguisher: "Compare the scale of political authority.",
    },
    {
      id: "world-1-5-q2",
      topicId: "world-1-5",
      concept: "africa-mali",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "How did trans-Saharan exchange contribute to Mali’s political power?",
      choices: [
        "Revenue from trade helped rulers support armies and administration",
        "Gold exports gave Mali's rulers control over North African states",
        "Caravan merchants elected Mali's rulers and paid them salaries",
        "Revenue from trade replaced farming as the main way most people lived",
      ],
      correctAnswer: 0,
      explanation:
        "Taxes and control of routes gave rulers wealth to fund soldiers and officials.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Taxes and control of routes gave rulers wealth to fund soldiers and officials.",
        "Mali traded with North Africa but did not rule it.",
        "Mali's rulers came from a royal lineage; merchants did not choose them.",
        "Trade enriched rulers, but most people in Mali still farmed or herded.",
      ],
      nearMissIndex: 3,
      distinguisher: "Trade funded the state; it did not replace the economy's base.",
    },
    {
      id: "world-1-5-q3",
      topicId: "world-1-5",
      concept: "africa-mali",
      difficulty: "Apply",
      skill: "developments",
      prompt: "How could Mansa Musa’s pilgrimage support his authority?",
      choices: [
        "It allowed him to claim the throne of Egypt during his stay in Cairo",
        "It showed his wealth and led every Malian subject to convert to Islam",
        "It won him a title from the Abbasid caliph in Baghdad that ended local rivalries",
        "It showed his wealth and tied him to influential Muslim scholars and rulers",
      ],
      correctAnswer: 3,
      explanation:
        "The pilgrimage advertised Mali's riches and strengthened ties with the Islamic world.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Musa visited Cairo as a pilgrim, not as a claimant to Egypt's throne.",
        "Wealth is right, but many subjects kept local religious practices.",
        "The Abbasid caliphate in Baghdad had ended in 1258, decades before the pilgrimage.",
        "The pilgrimage advertised Mali's riches and strengthened ties with the Islamic world.",
      ],
      nearMissIndex: 1,
      distinguisher: "Visibility and connection, not mass conversion or conquest.",
    },
    {
      id: "world-1-5-q4",
      topicId: "world-1-5",
      concept: "africa-swahili",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Which interpretation of Swahili cities best accounts for African and imported cultural elements?",
      choices: [
        "African communities built the cities, but Arab settlers governed them all",
        "African communities shaped cities that were linked to overseas trade",
        "Arab and Persian settlers founded the cities, and Africans only traded there",
        "The cities copied Arabian culture completely, including its main language",
      ],
      correctAnswer: 1,
      explanation:
        "Swahili cities were African urban societies that absorbed influences through trade.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "African builders are right, but the cities had their own rulers, often of local origin.",
        "Swahili cities were African urban societies that absorbed influences through trade.",
        "The older claim that outsiders founded these cities is not supported by evidence.",
        "Swahili is a Bantu language; Arabic contributed vocabulary, not replacement.",
      ],
      nearMissIndex: 0,
      distinguisher: "Connection does not mean foreign control.",
    },
    {
      id: "world-1-5-q5",
      topicId: "world-1-5",
      concept: "africa-zimbabwe",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "What would imported ceramics found at Great Zimbabwe most directly suggest?",
      choices: [
        "The city's builders learned stone construction from Chinese workers",
        "The inland city was linked to distant trade through coastal networks",
        "The city's people depended on imported food from the coast",
        "The inland city was ruled by foreign merchants who brought the ceramics",
      ],
      correctAnswer: 1,
      explanation:
        "Imported goods show connections reaching the city through Swahili and Indian Ocean trade.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The dry-stone building tradition was local.",
        "Imported goods show connections reaching the city through Swahili and Indian Ocean trade.",
        "Ceramics show trade connections, not food dependence; farming and cattle supported the city.",
        "Imports show contact, not foreign rule; Shona ancestors built and governed the site.",
      ],
      nearMissIndex: 3,
      distinguisher: "A traded object shows connection, not control.",
    },
    {
      id: "world-1-5-q6",
      topicId: "world-1-5",
      concept: "africa-ethiopia",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "How do Lalibela’s churches challenge the claim that African state building relied exclusively on Islam?",
      choices: [
        "They show that Ethiopia was cut off from other regions",
        "They show Christian patronage, so Islam played no role in Africa",
        "They show that Ethiopia was ruled from Rome by the pope",
        "They show Christian patronage connected to Ethiopian kingship",
      ],
      correctAnswer: 3,
      explanation:
        "Rock-hewn churches built with royal support show a Christian state with its own institutions.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Ethiopia traded with and fought Muslim neighbors and kept ties to Egypt.",
        "Christian patronage disproves the exclusive claim, but Islam remained important elsewhere in Africa.",
        "Ethiopian Christianity was linked to the Coptic Church in Egypt, not Rome.",
        "Rock-hewn churches built with royal support show a Christian state with its own institutions.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A counterexample disproves an “exclusively” claim without replacing it with another extreme.",
    },
    {
      id: "world-1-5-q7",
      topicId: "world-1-5",
      concept: "africa-culture",
      difficulty: "Apply",
      skill: "sourcing",
      prompt: "Why should a historian examine the context of a griot’s account?",
      choices: [
        "Its audience and transmission can shape how rulers and events are remembered",
        "Its audience shaped it, so oral accounts cannot be used as historical evidence",
        "Griots recorded events in writing at the moment they happened",
        "Griots were foreign visitors who did not understand local traditions",
      ],
      correctAnswer: 0,
      explanation:
        "Griots often performed for patrons and passed accounts down over generations, which shapes what is preserved.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Griots often performed for patrons and passed accounts down over generations, which shapes what is preserved.",
        "Context matters, but oral tradition is valuable evidence when weighed carefully.",
        "Griots preserved history orally, often long after events.",
        "Griots were members of West African societies and keepers of local tradition.",
      ],
      nearMissIndex: 1,
      distinguisher: "Sourcing applies to oral sources just as it does to written ones.",
    },
    {
      id: "world-1-5-q8",
      topicId: "world-1-5",
      concept: "africa-kinship",
      difficulty: "Apply",
      skill: "argumentation",
      prompt: "What is a problem with saying kin-based societies had no government?",
      choices: [
        "It ignores that these societies wrote down detailed law codes",
        "It ignores that these societies had no conflicts to resolve",
        "It ignores institutions that organized decisions and settled disputes",
        "It ignores that these societies were all ruled by Mali's emperors",
      ],
      correctAnswer: 2,
      explanation:
        "Elders, lineage heads, and chiefs governed land, labor, and disputes without a central state.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Many such societies governed through oral custom rather than written codes.",
        "All societies have conflicts; the point is that they had ways to resolve them.",
        "Elders, lineage heads, and chiefs governed land, labor, and disputes without a central state.",
        "Many kin-based communities lay outside Mali's control.",
      ],
      nearMissIndex: 3,
      distinguisher: "No central king is not the same as no government.",
    },
    {
      id: "world-1-5-k1",
      topicId: "world-1-5",
      concept: "africa-zimbabwe",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "Where was Great Zimbabwe?",
      choices: [
        "The Ethiopian highlands",
        "The Swahili coast of East Africa",
        "The Niger River valley in West Africa",
        "Inland southern Africa",
      ],
      correctAnswer: 3,
      explanation:
        "Great Zimbabwe lay inland, in present-day Zimbabwe, linked to the coast by trade.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The Ethiopian highlands were home to Christian kingdoms such as the Zagwe and Solomonic states.",
        "It traded with the Swahili coast but lay well inland.",
        "The Niger valley was the heartland of Mali.",
        "Great Zimbabwe lay inland, in present-day Zimbabwe, linked to the coast by trade.",
      ],
      nearMissIndex: 1,
      distinguisher: "Inland, south of the Zambezi.",
    },
    {
      id: "world-1-5-k2",
      topicId: "world-1-5",
      concept: "africa-ethiopia",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "Which tradition was important to medieval Ethiopian kingship?",
      choices: ["Sunni Islam", "Theravada Buddhism", "Christianity", "Zoroastrianism"],
      correctAnswer: 2,
      explanation: "Ethiopian rulers drew on a Christian tradition rooted in Aksum.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Muslim states bordered Ethiopia, but its kingship was Christian.",
        "Theravada Buddhism belonged to Sri Lanka and Southeast Asia.",
        "Ethiopian rulers drew on a Christian tradition rooted in Aksum.",
        "Zoroastrianism was a Persian tradition, not Ethiopian.",
      ],
      nearMissIndex: 0,
      distinguisher: "Ethiopia was a Christian kingdom.",
    },
    {
      id: "world-1-5-k3",
      topicId: "world-1-5",
      concept: "africa-swahili",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "What connected many Swahili cities to distant markets?",
      choices: [
        "Silk Roads caravans",
        "Monsoon-driven Indian Ocean trade",
        "Mediterranean galleys",
        "Trans-Saharan caravans",
      ],
      correctAnswer: 1,
      explanation:
        "Monsoon-driven Indian Ocean trade linked the Swahili coast with Arabia, India, and beyond.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.5 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The Silk Roads were overland routes across Central Asia.",
        "Monsoon-driven Indian Ocean trade linked the Swahili coast with Arabia, India, and beyond.",
        "The Swahili coast faced the Indian Ocean, not the Mediterranean.",
        "Trans-Saharan caravans connected West Africa, not the Swahili coast.",
      ],
      nearMissIndex: 3,
      distinguisher: "The Swahili coast faces the Indian Ocean.",
    },
    // BEGIN unit-01 practice test
    // Unit 1 Practice Test items (t-numbered): AP-style sets that each depend on one stimulus.
    {
      id: "world-1-5-t01",
      topicId: "world-1-5",
      concept: "africa-ethiopia",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Which of the following conclusions about Abash is best supported by the passage?",
      choices: [
        "It was isolated from contact with other states and religions",
        "It was a Christian state ruled directly by the Byzantine emperor",
        "It was a Christian state whose ruler had authority over other kings",
        "It was a Muslim sultanate allied with the ruler of Aden",
      ],
      correctAnswer: 2,
      explanation:
        "Polo says the greatest of the six kings is a Christian to whom the others are subject.",
      sourceIds: ["ced-topic-1-5", "polo-yule-1903"],
      choiceExplanations: [
        "The passage mentions wars with neighbors and a pilgrimage to Jerusalem, evidence of contact.",
        "Polo describes a Christian king of Abash, not Byzantine rule.",
        "Polo says the greatest of the six kings is a Christian to whom the others are subject.",
        "Polo describes Abash as at war with the Soldan of Aden.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Ethiopia was Christian, but it had its own kings; Polo says the greatest of its six kings was its overlord.",
      stimulusId: "polo-abash",
      stimulusBlocks: [excerpts.poloAbash],
    },
    {
      id: "world-1-5-t02",
      topicId: "world-1-5",
      concept: "africa-ethiopia",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "The Christian kingship described in the passage is best understood in the context of",
      choices: [
        "a Christian tradition in the region dating back to the kingdom of Aksum",
        "a Christian tradition introduced to the region by crusaders from Europe",
        "Mongol conquests that spread Christianity in Northeast Africa",
        "the recent arrival of Portuguese missionaries on the East African coast",
      ],
      correctAnswer: 0,
      explanation:
        "Ethiopian Christianity grew out of Aksum's conversion in the fourth century, and the Solomonic dynasty claimed that heritage.",
      sourceIds: ["ced-topic-1-5", "polo-yule-1903"],
      choiceExplanations: [
        "Ethiopian Christianity grew out of Aksum's conversion in the fourth century, and the Solomonic dynasty claimed that heritage.",
        "Ethiopian Christianity was much older than the Crusades.",
        "The Mongols did not conquer Northeast Africa.",
        "Portuguese missionaries arrived after 1500, too late for Polo's account.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "There was a long Christian tradition, but it came from Aksum's conversion centuries earlier, not from crusaders.",
      stimulusId: "polo-abash",
      stimulusBlocks: [excerpts.poloAbash],
    },
    {
      id: "world-1-5-t03",
      topicId: "world-1-5",
      concept: "africa-ethiopia",
      difficulty: "Apply",
      skill: "sourcing",
      prompt:
        "Which of the following most limits the usefulness of the passage as evidence about Ethiopia?",
      choices: [
        "Polo wrote it in Arabic for a Muslim audience in Aden",
        "Polo based it on Ethiopian royal chronicles that he translated",
        "Polo wrote it while serving as an official of the Ethiopian king",
        "Polo based it on reports he heard rather than on his own observation",
      ],
      correctAnswer: 3,
      explanation:
        "Polo did not visit Ethiopia, so his description relies on secondhand reports that may be inaccurate.",
      sourceIds: ["ced-topic-1-5", "polo-yule-1903"],
      choiceExplanations: [
        "Polo's book was written for European readers, not in Arabic.",
        "There is no evidence Polo read or translated Ethiopian chronicles.",
        "Polo never served the Ethiopian king.",
        "Polo did not visit Ethiopia, so his description relies on secondhand reports that may be inaccurate.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Using reports is the issue, but Polo did not translate Ethiopian chronicles; he relied on what traders told him.",
      stimulusId: "polo-abash",
      stimulusBlocks: [excerpts.poloAbash],
    },
    {
      id: "world-1-5-t04",
      topicId: "world-1-5",
      concept: "africa-zimbabwe",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "The Chinese porcelain and Persian pottery found at Great Zimbabwe are best used as evidence that",
      choices: [
        "Great Zimbabwe was built by merchants from China and Persia",
        "Great Zimbabwe was connected to Indian Ocean trade networks",
        "Great Zimbabwe was connected to trans-Saharan trade routes",
        "Great Zimbabwe produced porcelain for export",
      ],
      correctAnswer: 1,
      explanation:
        "Goods from China and Persia reached the site through the Swahili coast and Indian Ocean trade.",
      sourceIds: ["ced-topic-1-5"],
      choiceExplanations: [
        "Imported goods show connection, not foreign builders; the passage rejects that claim.",
        "Goods from China and Persia reached the site through the Swahili coast and Indian Ocean trade.",
        "Great Zimbabwe traded toward the east coast, not across the Sahara.",
        "The porcelain was imported, not made at the site.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Long-distance connection is right, but Great Zimbabwe's goods moved toward the Swahili coast and the Indian Ocean, not across the Sahara.",
      stimulusId: "original-great-zimbabwe",
      stimulusBlocks: [excerpts.originalGreatZimbabwe],
    },
    {
      id: "world-1-5-t05",
      topicId: "world-1-5",
      concept: "africa-zimbabwe",
      difficulty: "Apply",
      skill: "sourcing",
      prompt:
        "The claims made by some European writers in the 1800s, described in the passage, were most likely shaped by",
      choices: [
        "the oral traditions of Shona-speaking communities",
        "racist assumptions used to justify European colonial expansion",
        "careful study of Arabic accounts written by visiting merchants",
        "careful archaeological excavation of the stone enclosures",
      ],
      correctAnswer: 1,
      explanation:
        "Denying African achievement supported racist ideas used to justify colonial rule in the 1800s.",
      sourceIds: ["ced-topic-1-5"],
      choiceExplanations: [
        "Shona traditions connected the site to their own ancestors, contradicting the writers' claim.",
        "Denying African achievement supported racist ideas used to justify colonial rule in the 1800s.",
        "No such accounts support the writers' claim; it rested on assumptions, not evidence.",
        "Archaeological research disproved the claim.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Shona oral traditions linked the site to African ancestors; they would not support the claim that Africans could not build it.",
      stimulusId: "original-great-zimbabwe",
      stimulusBlocks: [excerpts.originalGreatZimbabwe],
    },
    {
      id: "world-1-5-t06",
      topicId: "world-1-5",
      concept: "africa-mali",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Which aspect of Mali's government does Ibn Battuta praise most directly in the passage?",
      choices: [
        "Its policy of forcing all subjects to convert to Islam",
        "Its success in keeping order by confiscating foreign property",
        "Its system of examinations for selecting officials",
        "Its success in keeping order and protecting travelers",
      ],
      correctAnswer: 3,
      explanation:
        "He stresses security: neither travelers nor residents feared robbers.",
      sourceIds: ["ced-topic-1-5", "battuta-gibb-1929"],
      choiceExplanations: [
        "He praises Muslim devotion but does not describe forced conversion.",
        "He says the property of a foreigner who dies is kept safe for the rightful heir.",
        "Mali did not use civil service examinations.",
        "He stresses security: neither travelers nor residents feared robbers.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Order is right, but Ibn Battuta says Mali did not confiscate the property of foreigners who died there.",
      stimulusId: "battuta-mali",
      stimulusBlocks: [excerpts.battutaMali],
    },
    {
      id: "world-1-5-t07",
      topicId: "world-1-5",
      concept: "africa-mali",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "Ibn Battuta's observations of Islamic practice in Mali are best explained by",
      choices: [
        "the spread of Islam through trans-Saharan trade and the patronage of Mali's rulers",
        "the conquest of Mali by Mamluk armies from Egypt",
        "the spread of Islam through trans-Saharan trade, which quickly ended all local traditions",
        "the work of Christian missionaries who taught Arabic in Timbuktu",
      ],
      correctAnswer: 0,
      explanation:
        "Muslim merchants and rulers such as Mansa Musa supported mosques and learning in Mali.",
      sourceIds: ["ced-topic-1-5", "battuta-gibb-1929"],
      choiceExplanations: [
        "Muslim merchants and rulers such as Mansa Musa supported mosques and learning in Mali.",
        "Mali was never conquered by the Mamluks.",
        "Ibn Battuta criticizes customs such as dust on heads, which shows local traditions continued.",
        "Islamic learning in Timbuktu was supported by Muslim scholars, not Christian missionaries.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Trade did spread Islam, but Ibn Battuta's own complaints show local customs continued.",
      stimulusId: "battuta-mali",
      stimulusBlocks: [excerpts.battutaMali],
    },
    {
      id: "world-1-5-t08",
      topicId: "world-1-5",
      concept: "africa-culture",
      difficulty: "Apply",
      skill: "sourcing",
      prompt: "Ibn Battuta's criticism of some customs in Mali is most likely shaped by",
      choices: [
        "his desire to attract European merchants to West Africa",
        "his background as a merchant seeking to buy Malian gold",
        "his background as a Muslim legal scholar from North Africa",
        "his role as an official of the Mali government",
      ],
      correctAnswer: 2,
      explanation:
        "As a scholar of Islamic law, he judged local customs against his own standards of proper Muslim practice.",
      sourceIds: ["ced-topic-1-5", "battuta-gibb-1929"],
      choiceExplanations: [
        "His account was written for a Muslim audience in Morocco.",
        "His criticisms concern religious and social customs, not the gold trade.",
        "As a scholar of Islamic law, he judged local customs against his own standards of proper Muslim practice.",
        "He was a visitor, not an official of Mali.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Ibn Battuta traveled widely and traded at times, but his judgments about proper practice reflect his training in Islamic law.",
      stimulusId: "battuta-mali",
      stimulusBlocks: [excerpts.battutaMali],
    },
    // END unit-01 practice test
  ],
  quizzes: [
    {
      id: "world-1-5-quiz",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-5",
      title: "Africa topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-1-5-q1",
        "world-1-5-q2",
        "world-1-5-q3",
        "world-1-5-q4",
        "world-1-5-q5",
        "world-1-5-q6",
        "world-1-5-q7",
        "world-1-5-q8",
      ],
    },
    {
      id: "world-1-5-quick",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-5",
      title: "Africa quick practice",
      quizType: "quick",
      questionIds: ["world-1-5-k1", "world-1-5-k2", "world-1-5-k3"],
    },
  ],
};

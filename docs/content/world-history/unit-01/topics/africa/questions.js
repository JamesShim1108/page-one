// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.

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

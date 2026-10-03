// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-2-2-q01",
      topicId: "world-2-2",
      concept: "state-building",
      difficulty: "Core",
      skill: "developments",
      prompt: "Which factor best explains the speed of Mongol expansion in the 1200s?",
      choices: [
        "Mounted archers alone, since settled states had no armies of their own",
        "A large navy that let Mongol forces land armies along the coasts of Eurasia",
        "Disciplined mounted armies combined with intelligence and borrowed expertise",
        "Gunpowder weapons that the Mongols themselves invented on the Central Asian steppe",
      ],
      correctAnswer: 2,
      explanation:
        "Mobility mattered, but so did organization, scouting, and engineers and administrators drawn from conquered peoples.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Horses and archery were important, but settled states had armies; organization and adaptation explain Mongol success.",
        "Mongol power was land-based. Their sea invasions of Japan in 1274 and 1281 failed.",
        "Mobility mattered, but so did organization, scouting, and engineers and administrators drawn from conquered peoples.",
        "Gunpowder came from China. The Mongols used Chinese expertise; they did not invent it.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Mobility is part of the answer. The best choice adds organization and adaptation.",
    },
    {
      id: "world-2-2-q02",
      topicId: "world-2-2",
      concept: "khanates-rule",
      difficulty: "Core",
      skill: "developments",
      prompt: "Which khanate ruled China as a Chinese-style dynasty after 1271?",
      choices: [
        "The Yuan dynasty under Kublai Khan",
        "The Golden Horde on the western steppe",
        "The Chagatai Khanate in Central Asia",
        "The Ilkhanate under Hulagu and his heirs",
      ],
      correctAnswer: 0,
      explanation:
        "Kublai Khan proclaimed the Yuan dynasty in 1271 and completed the conquest of the Southern Song in 1279.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Kublai Khan proclaimed the Yuan dynasty in 1271 and completed the conquest of the Southern Song in 1279.",
        "The Golden Horde dominated the western steppe and collected tribute from Rus principalities.",
        "The Chagatai Khanate held Central Asia between the Yuan and the Ilkhanate.",
        "The Ilkhanate ruled Persia and Iraq, not China, though it kept ties with the Yuan court.",
      ],
      nearMissIndex: 3,
      distinguisher: "Each khanate is tied to a region. Match the dynasty to China.",
    },
    {
      id: "world-2-2-q03",
      topicId: "world-2-2",
      concept: "trade-communication",
      difficulty: "Core",
      skill: "developments",
      prompt: "What does the term Pax Mongolica describe?",
      choices: [
        "A Mongol law code that required every subject to convert to one religion",
        "A period of complete peace in which Mongol rulers ended all violence in Asia",
        "A treaty in which the Mongols agreed to stop expanding into Europe and Japan",
        "A period of relative stability that eased travel across parts of Mongol Eurasia",
      ],
      correctAnswer: 3,
      explanation:
        "Mongol authority over large regions protected routes and made long-distance travel more practical.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Mongol rulers were generally tolerant of many religions; they did not impose one faith.",
        "The stability was relative and rested on conquest; wars between khanates continued.",
        "No such treaty existed. Expansion halted for several reasons, including succession disputes and failed invasions.",
        "Mongol authority over large regions protected routes and made long-distance travel more practical.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "“Relative” is the key word. Stability for travelers is not the same as peace for everyone.",
    },
    {
      id: "world-2-2-q04",
      topicId: "world-2-2",
      concept: "cultural-transfer",
      difficulty: "Core",
      skill: "developments",
      prompt:
        "Which example best shows Mongol rulers adopting a practice from a conquered or neighboring people?",
      choices: [
        "Using the Uyghur script to replace Chinese writing everywhere in Yuan China",
        "Using the Uyghur script to write the Mongol language for administration",
        "Abandoning horses after conquest and adopting the settled farming of Persia",
        "Requiring Chinese officials to learn a new Mongol alphabet invented in Europe",
      ],
      correctAnswer: 1,
      explanation:
        "Mongol rulers adapted an existing script to record their own language and run their empire.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The Uyghur script served Mongol administration; Chinese writing remained in wide use in Yuan China.",
        "Mongol rulers adapted an existing script to record their own language and run their empire.",
        "Mongol elites kept steppe traditions and military horsemanship even as they ruled settled societies.",
        "No European-made alphabet existed. Later Yuan scripts drew on Asian writing traditions.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Borrowing means adapting a tool for one's own use, not replacing everything.",
    },
    {
      id: "world-2-2-q05",
      topicId: "world-2-2",
      concept: "trade-communication",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "The passage best supports which claim about Yuan government?",
      choices: [
        "The state relied on private merchants to deliver official messages for a fee",
        "The state organized communication across great distances using local resources",
        "The state limited travel so that only Mongols could use the roads at all",
        "The state paid for every post station with silver collected from foreign trade",
      ],
      correctAnswer: 1,
      explanation:
        "Stations every twenty-five miles carried news quickly, and nearby communities had to supply the horses.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "The passage describes the emperor's own messengers and runners, not merchants hired for the job.",
        "Stations every twenty-five miles carried news quickly, and nearby communities had to supply the horses.",
        "The passage is about official messengers; it says nothing about banning other travelers.",
        "Polo says the horses cost the emperor nothing because nearby towns supplied them, which contradicts state payment.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Notice who paid: the passage says local communities supplied the horses.",
      stimulusBlocks: [excerpts.poloPostStations],
    },
    {
      id: "world-2-2-q06",
      topicId: "world-2-2",
      concept: "khanates-rule",
      difficulty: "Apply",
      skill: "contextualization",
      prompt: "The system described in the passage is best understood in the context of",
      choices: [
        "European demand for faster mail service between Venice and China",
        "Mongol efforts to govern China by abolishing its existing bureaucracy",
        "Song dynasty reforms that prepared China to resist steppe invasions",
        "Mongol efforts to govern and connect a vast, multiethnic empire",
      ],
      correctAnswer: 3,
      explanation:
        "The yam system helped rulers move orders, envoys, and information across an empire stretching across Eurasia.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "The system served the Mongol state; European demand had nothing to do with it.",
        "The Yuan kept and adapted much of China's bureaucracy instead of abolishing it.",
        "Polo describes Yuan institutions under Kublai Khan, after the Song had fallen.",
        "The yam system helped rulers move orders, envoys, and information across an empire stretching across Eurasia.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Context explains why the practice existed: governing a huge empire.",
      stimulusBlocks: [excerpts.poloPostStations],
    },
    {
      id: "world-2-2-q07",
      topicId: "world-2-2",
      concept: "trade-communication",
      difficulty: "Challenge",
      skill: "sourcing",
      prompt:
        "Which feature of the source should make a historian most cautious about Polo's numbers?",
      choices: [
        "Polo was dictating an account meant to amaze readers, and he cites no records",
        "Polo was dictating an account meant to amaze readers, so the stations are invented",
        "Polo wrote in Chinese, and his translators misread the numbers for horses",
        "Polo was a Mongol official who had reason to hide the true size of the system",
      ],
      correctAnswer: 0,
      explanation:
        "Figures such as 300,000 horses in the full chapter may be exaggerated. Purpose and lack of records call for caution, not dismissal.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Figures such as 300,000 horses in the full chapter may be exaggerated. Purpose and lack of records call for caution, not dismissal.",
        "Caution is right, but Chinese and Persian sources confirm the yam system existed. Purpose affects numbers, not existence.",
        "Polo's account was written in a European language with Rustichello, not in Chinese.",
        "Polo was a foreign visitor writing for Europeans. If anything, his purpose encouraged inflating numbers.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Sourcing should limit a claim to what the author's situation supports, without throwing out confirmed facts.",
      stimulusBlocks: [excerpts.poloPostStations],
    },
    {
      id: "world-2-2-q08",
      topicId: "world-2-2",
      concept: "state-building",
      difficulty: "Core",
      skill: "developments",
      prompt: "How did the Mongols use conquered peoples in building their empire?",
      choices: [
        "They required conquered peoples to adopt steppe herding in place of farming",
        "They moved all conquered peoples to Mongolia to prevent local revolts",
        "They recruited skilled engineers, administrators, and soldiers into their service",
        "They recruited skilled engineers, but kept all administrative posts for Mongols",
      ],
      correctAnswer: 2,
      explanation:
        "Mongol rulers drew on Chinese siege engineers, Persian and Uyghur administrators, and many others.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Mongol rulers taxed settled farmers; forcing them into herding would have destroyed revenue.",
        "Some artisans were relocated, but whole populations were not moved to Mongolia.",
        "Mongol rulers drew on Chinese siege engineers, Persian and Uyghur administrators, and many others.",
        "Engineers were recruited, but so were non-Mongol officials. The Yuan and Ilkhanate employed many of them.",
      ],
      nearMissIndex: 3,
      distinguisher: "The Mongols borrowed talent at every level, not just in warfare.",
    },
    {
      id: "world-2-2-q09",
      topicId: "world-2-2",
      concept: "khanates-rule",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Which statement best compares Yuan rule in China with Golden Horde rule over Rus?",
      choices: [
        "The Golden Horde adopted Chinese administration, while the Yuan relied on Rus princes",
        "Both ruled directly, replacing local princes and officials with appointed Mongol governors in every region",
        "Both converted to Islam early, which shaped their relations with their subjects",
        "The Yuan governed China directly, while the Golden Horde mostly took tribute through Rus princes",
      ],
      correctAnswer: 3,
      explanation:
        "Kublai Khan ruled from within China using Chinese institutions, while Rus princes paid tribute and kept local authority.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "This reverses the two. Chinese institutions belong to the Yuan.",
        "The Yuan ruled directly, but the Golden Horde usually worked through Rus princes instead of replacing them.",
        "Golden Horde rulers adopted Islam in stages, officially under Özbeg in the early 1300s; the Yuan court did not.",
        "Kublai Khan ruled from within China using Chinese institutions, while Rus princes paid tribute and kept local authority.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A good comparison names the same feature on both sides: here, how directly each ruled.",
    },
    {
      id: "world-2-2-q10",
      topicId: "world-2-2",
      concept: "khanates-rule",
      difficulty: "Core",
      skill: "claims-evidence",
      prompt:
        "According to the passage, what role did Mongol women play in pastoral life?",
      choices: [
        "They managed trade and household supplies but had no role in Mongol politics",
        "They stayed behind in permanent towns while the men moved herds between pastures",
        "They managed trade and household supplies while men hunted and trained for war",
        "They were barred from economic activity under strict seclusion rules",
      ],
      correctAnswer: 2,
      explanation:
        "Polo says “the women do the buying and selling” and provide for the household.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "The passage describes economic roles. It says nothing about politics, and Mongol royal women often held influence.",
        "The passage says women and children traveled in the wagons with the migrating household.",
        "Polo says “the women do the buying and selling” and provide for the household.",
        "The passage directly contradicts seclusion: women did the buying and selling.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Answer only what the passage says. Claims about politics need other evidence.",
      stimulusBlocks: [excerpts.poloTartarCustoms],
    },
    {
      id: "world-2-2-q11",
      topicId: "world-2-2",
      concept: "state-building",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "How did the way of life described in the passage contribute to Mongol military strength?",
      choices: [
        "Permanent felt houses allowed the Mongols to build fortified cities quickly",
        "Seasonal migration and constant riding produced mobile, skilled horsemen",
        "Hunting with falcons replaced the need for organized military training",
        "Seasonal migration produced large surpluses of grain to feed standing armies",
      ],
      correctAnswer: 1,
      explanation:
        "Pastoral life kept people mobile and trained in riding, which translated into speed and range in war.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Felt houses were portable precisely because the Mongols did not build fixed settlements.",
        "Pastoral life kept people mobile and trained in riding, which translated into speed and range in war.",
        "Polo mentions “warlike exercises” alongside hunting; the Mongols trained hard and organized carefully.",
        "Herders lived on milk and meat, not grain surpluses; mobility, not farming, was the advantage.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Connect the economy described (pastoralism) to the military result (mobility).",
      stimulusBlocks: [excerpts.poloTartarCustoms],
    },
    {
      id: "world-2-2-q12",
      topicId: "world-2-2",
      concept: "khanates-rule",
      difficulty: "Apply",
      skill: "sourcing",
      prompt:
        "Which limitation matters most when using this passage as evidence of Mongol society?",
      choices: [
        "Polo was an outsider generalizing about a whole people from a European viewpoint",
        "Polo based the passage only on Chinese books about the steppe",
        "Polo was an outsider, so nothing he says about Mongol customs can be trusted at all",
        "Polo wrote the passage decades after the Mongol Empire had already collapsed",
      ],
      correctAnswer: 0,
      explanation:
        "A foreign merchant describes “the Tartars” as one group, which can flatten variation among steppe communities.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "A foreign merchant describes “the Tartars” as one group, which can flatten variation among steppe communities.",
        "Polo relied on his own travels and what he was told, not on Chinese books.",
        "Being an outsider is a limitation to weigh, not a reason to reject everything; other sources confirm much of it.",
        "Polo dictated his book around 1298, while Mongol khanates still ruled much of Asia.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "A limitation narrows what a source can prove. It does not erase the source.",
      stimulusBlocks: [excerpts.poloTartarCustoms],
    },
    {
      id: "world-2-2-q13",
      topicId: "world-2-2",
      concept: "costs-continuities",
      difficulty: "Apply",
      skill: "developments",
      prompt: "Which statement best describes the costs of Mongol conquest?",
      choices: [
        "Conquest killed many people and destroyed cities such as Baghdad in 1258",
        "Conquest destroyed Baghdad in 1258, but no other major city was harmed",
        "Conquest caused little damage because most cities surrendered peacefully",
        "Conquest affected only nomadic peoples and left settled regions untouched",
      ],
      correctAnswer: 0,
      explanation:
        "The sack of Baghdad ended the Abbasid caliphate. Many other cities that resisted were also destroyed.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The sack of Baghdad ended the Abbasid caliphate. Many other cities that resisted were also destroyed.",
        "Baghdad is one example among many. Cities in Central Asia, Persia, and China also suffered.",
        "Some cities surrendered, but those that resisted often faced massacre and destruction.",
        "Settled societies from China to Persia to Rus bore heavy losses.",
      ],
      nearMissIndex: 1,
      distinguisher: "Baghdad is an example, not the whole story.",
    },
    {
      id: "world-2-2-q14",
      topicId: "world-2-2",
      concept: "cultural-transfer",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt: "How did Mongol rule help move knowledge between Persia and China?",
      choices: [
        "Mongol rulers translated all Chinese texts into Arabic for their subjects",
        "Officials, scholars, and artisans traveled between allied Mongol courts",
        "European universities sent scholars to teach at Mongol courts in Asia",
        "Officials, scholars, and artisans were all required to move to Mongolia",
      ],
      correctAnswer: 1,
      explanation:
        "Links between the Yuan and the Ilkhanate carried astronomers, physicians, and craftsmen in both directions.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "No such complete translation program existed; transfer happened through people and selected works.",
        "Links between the Yuan and the Ilkhanate carried astronomers, physicians, and craftsmen in both directions.",
        "Very few Europeans reached Mongol courts, and they did not supply teachers.",
        "Some experts went to Mongol capitals, but exchange happened between many courts, not only in Mongolia.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Name the carriers of knowledge: people moving between connected courts.",
    },
    {
      id: "world-2-2-q15",
      topicId: "world-2-2",
      concept: "costs-continuities",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt:
        "Which example best shows a Mongol practice continuing after Mongol rule ended?",
      choices: [
        "Persian rulers returned to the Abbasid caliphate as soon as the Ilkhanate fell",
        "Russian rulers kept the Mongol khan as their religious leader after independence",
        "Russian rulers kept postal relay stations whose name came from the Mongol word yam",
        "Ming emperors restored nomadic herding as the basis of China's economy",
      ],
      correctAnswer: 2,
      explanation:
        "The Russian word for a post station (yam) is a lasting trace of Mongol administration.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The Abbasid caliphate in Baghdad ended in 1258 and was not restored there.",
        "Rus rulers were Orthodox Christians. They kept administrative practices, not religious ties to the khan.",
        "The Russian word for a post station (yam) is a lasting trace of Mongol administration.",
        "The Ming dynasty rejected Mongol rule and relied on settled agriculture.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Continuity needs evidence that a specific practice outlasted the change.",
    },
    {
      id: "world-2-2-q16",
      topicId: "world-2-2",
      concept: "state-building",
      difficulty: "Challenge",
      skill: "argumentation",
      prompt: "Which claim about Mongol rule is most defensible?",
      choices: [
        "Mongol rule was destructive and sharply reduced long-distance exchange everywhere it reached",
        "Mongol rule was peaceful, so historians should stop calling it violent",
        "Mongol rule changed nothing, since local rulers kept all their old powers",
        "Mongol rule was destructive and also increased exchange, depending on time and place",
      ],
      correctAnswer: 3,
      explanation:
        "This claim recognizes both conquest and connection and qualifies by region and period.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Destruction was real, but trade and travel also grew in many regions under Mongol protection.",
        "The empire was built through mass violence; stability came after conquest.",
        "Mongol rule changed governments, trade, and populations across Eurasia.",
        "This claim recognizes both conquest and connection and qualifies by region and period.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The most defensible claim holds two true things together and qualifies them.",
    },
    {
      id: "world-2-2-q17",
      topicId: "world-2-2",
      concept: "trade-communication",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which development most directly helped spread the plague across Eurasia in the 1300s?",
      choices: [
        "A Mongol policy of using plague as a weapon against every city",
        "The collapse of all trade, which forced people into crowded cities",
        "Intensified travel and trade along routes linked under Mongol rule",
        "Intensified travel and trade, which began only with Mongol conquest",
      ],
      correctAnswer: 2,
      explanation:
        "Busier routes moved people, animals, and goods, giving fleas and rats new paths between regions.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "One account describes plague during the siege of Caffa, but no empire-wide policy spread the disease.",
        "Plague spread because routes were active, not because trade collapsed.",
        "Busier routes moved people, animals, and goods, giving fleas and rats new paths between regions.",
        "Mobility mattered, but long-distance trade predates the Mongols; Mongol rule intensified it.",
      ],
      nearMissIndex: 3,
      distinguisher: "The mechanism is movement along connected routes.",
    },
    {
      id: "world-2-2-q18",
      topicId: "world-2-2",
      concept: "costs-continuities",
      difficulty: "Challenge",
      skill: "connections",
      reasoning: "comparison",
      prompt: "Which comparison of Mongol rule in China and Persia is most accurate?",
      choices: [
        "In both, Mongol rulers abandoned the steppe and became indistinguishable from locals",
        "In both, Mongol rulers relied on local officials and eventually converted to the majority religion",
        "In China, Mongols banned local officials, while in Persia they banned Mongol customs",
        "In both, Mongol rulers relied on local officials, though the Ilkhans later converted to Islam",
      ],
      correctAnswer: 3,
      explanation:
        "Both used local administrators. Ghazan's conversion in 1295 made the Ilkhanate Muslim, while the Yuan court never adopted a single local faith.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Both courts kept Mongol identity, language, and traditions alongside local practices.",
        "Local officials are correct, but the Yuan court did not convert to a majority Chinese religion as the Ilkhans did to Islam.",
        "The Yuan employed many Chinese and other officials; the Ilkhans kept many Mongol customs.",
        "Both used local administrators. Ghazan's conversion in 1295 made the Ilkhanate Muslim, while the Yuan court never adopted a single local faith.",
      ],
      nearMissIndex: 1,
      distinguisher: "Find the shared feature first, then the specific difference.",
    },
    {
      id: "world-2-2-q19",
      topicId: "world-2-2",
      concept: "cultural-transfer",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Kublai Khan's statement in the passage best illustrates which Mongol policy?",
      choices: [
        "Respect for several religions, which helped rule a diverse population",
        "Respect for several religions, leading to Kublai's baptism as a Christian",
        "Suppression of religion in favor of loyalty to the Mongol state alone",
        "Adoption of Islam as the official religion of the Yuan dynasty",
      ],
      correctAnswer: 0,
      explanation:
        "Kublai honors the prophets of Christians, Muslims, Jews, and Buddhists and asks all for aid.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "Kublai honors the prophets of Christians, Muslims, Jews, and Buddhists and asks all for aid.",
        "The passage shows respect for several faiths, but Kublai did not convert to Christianity.",
        "Kublai takes part in several religions' festivals instead of suppressing them.",
        "Islam is one of four traditions he honors; the Yuan did not make it the state religion.",
      ],
      nearMissIndex: 1,
      distinguisher: "Stay with what Kublai says: he honors all four.",
      stimulusBlocks: [excerpts.poloFourProphets],
    },
    {
      id: "world-2-2-q20",
      topicId: "world-2-2",
      concept: "cultural-transfer",
      difficulty: "Challenge",
      skill: "sourcing",
      prompt:
        "Which feature of this source most limits its reliability on Kublai Khan's beliefs?",
      choices: [
        "It was written by Kublai Khan himself, who wanted to hide his true religion",
        "It appears only in a 1559 edition and claims Kublai favored Christianity for a Christian audience",
        "It was translated from a Persian chronicle that criticized Mongol rulers",
        "It appears in a 1559 edition, so it cannot tell historians anything reliable about Mongol rulers",
      ],
      correctAnswer: 1,
      explanation:
        "The passage survives only in Ramusio's late edition, and its claim that Kublai preferred Christianity suits European readers.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2", "polo-yule-1903"],
      sourceLocators: [
        {
          sourceId: "ced-topic-2-2",
          locator: "Topic 2.2 learning objectives and historical developments",
        },
        {
          sourceId: "polo-yule-1903",
          locator: "vol",
        },
      ],
      choiceExplanations: [
        "The passage reports Kublai's words secondhand; he did not write it.",
        "The passage survives only in Ramusio's late edition, and its claim that Kublai preferred Christianity suits European readers.",
        "The passage comes from Ramusio's Italian edition of Polo, not a Persian chronicle.",
        "Late transmission calls for caution, but the description of religious tolerance matches other evidence.",
      ],
      nearMissIndex: 3,
      distinguisher: "Look at transmission and audience together.",
      stimulusBlocks: [excerpts.poloFourProphets],
    },
  ],
  quizzes: [
    {
      id: "world-2-2-quick",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-2",
      title: "Topic 2 quick check",
      quizType: "quick",
      questionIds: ["world-2-2-q01", "world-2-2-q02", "world-2-2-q03", "world-2-2-q04"],
    },
    {
      id: "world-2-2-quiz",
      courseId: "world",
      unitId: "world-2",
      topicId: "world-2-2",
      title: "The Mongol Empire and the Making of the Modern World topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-2-2-q05",
        "world-2-2-q06",
        "world-2-2-q07",
        "world-2-2-q08",
        "world-2-2-q09",
        "world-2-2-q10",
        "world-2-2-q11",
        "world-2-2-q12",
        "world-2-2-q13",
        "world-2-2-q14",
        "world-2-2-q15",
        "world-2-2-q16",
      ],
    },
  ],
};

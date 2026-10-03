// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Each question names an AP skill from ../../../skills.js. Stimulus excerpts come from ../../../excerpts.js.

export const bank = {
  questions: [
    {
      id: "world-1-7-q1",
      topicId: "world-1-7",
      concept: "compare-governance",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt:
        "Which statement makes the strongest comparison of political administration?",
      choices: [
        "Song rulers used exam-selected officials, while the Mexica built large temples and pyramids in Tenochtitlan",
        "Song China grew Champa rice, while the Mexica farmed on chinampas in Lake Texcoco",
        "Song rulers used exam-selected officials, while Mexica rulers collected tribute through local leaders",
        "Song China and the Mexica state both existed at some point between 1200 and 1450",
      ],
      correctAnswer: 2,
      explanation:
        "Both halves describe the same category, how each state administered territory.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "The first half is about administration, but temples are about religion, so the halves do not match.",
        "This compares agriculture, not administration.",
        "Both halves describe the same category, how each state administered territory.",
        "Sharing a time period is not a comparison of administration.",
      ],
      nearMissIndex: 0,
      distinguisher: "Both sides must address the same category.",
    },
    {
      id: "world-1-7-q2",
      topicId: "world-1-7",
      concept: "compare-beliefs",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "comparison",
      prompt: "What is a defensible similarity between Mali and Ethiopia?",
      choices: [
        "Rulers drew legitimacy from religious patronage, though of different faiths",
        "Both states were Christian kingdoms linked to the Coptic Church in Egypt",
        "Both states depended mainly on Indian Ocean ports for their revenue",
        "Rulers drew legitimacy from Islam, which both states adopted as their official religion",
      ],
      correctAnswer: 0,
      explanation:
        "Mali's rulers patronized Islam and Ethiopia's patronized Christianity; both used religion for legitimacy.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Mali's rulers patronized Islam and Ethiopia's patronized Christianity; both used religion for legitimacy.",
        "Ethiopia was Christian; Mali's rulers were Muslim.",
        "Mali was an inland empire tied to Saharan trade.",
        "Mali's rulers were Muslim, but Ethiopia's were Christian.",
      ],
      nearMissIndex: 3,
      distinguisher: "A similarity of function can involve different beliefs.",
    },
    {
      id: "world-1-7-q3",
      topicId: "world-1-7",
      concept: "compare-resources",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "Which evidence best supports a claim that states obtained resources in different forms?",
      choices: [
        "Both the Mexica and Inca relied on maize and other American crops",
        "Mexica tribute was paid in goods, and Inca subjects also paid their taxes mainly in goods",
        "Both the Mexica and Inca built large capitals in mountainous regions",
        "Mexica tribute was paid in goods, while Inca mit'a required labor service",
      ],
      correctAnswer: 3,
      explanation: "Goods versus labor shows two different forms of resource extraction.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Shared crops do not show different methods of extraction.",
        "Paying goods in both cases would show a similarity, not a difference, and the Inca relied mainly on labor.",
        "Capitals do not show how resources were collected; Tenochtitlan was in a lake basin.",
        "Goods versus labor shows two different forms of resource extraction.",
      ],
      nearMissIndex: 1,
      distinguisher: "Evidence must show the specific difference claimed.",
    },
    {
      id: "world-1-7-q4",
      topicId: "world-1-7",
      concept: "compare-change",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "continuity",
      prompt: "Which example illustrates continuity with innovation?",
      choices: [
        "Chinese dynasties kept a bureaucracy, and recruitment stayed exactly the same for centuries",
        "Chinese dynasties kept a bureaucracy while revising how officials were recruited",
        "The Abbasid caliphate's fall in 1258 ended Islamic institutions everywhere",
        "Maya cities ended when their rulers adopted Christianity from Spain",
      ],
      correctAnswer: 1,
      explanation:
        "The bureaucratic tradition persisted while recruitment and administration changed over time.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Continuity is right, but this choice leaves out the innovation the question asks for.",
        "The bureaucratic tradition persisted while recruitment and administration changed over time.",
        "Islamic institutions continued in successor states after 1258.",
        "Maya cities continued before European contact; Christianity arrived only after 1500.",
      ],
      nearMissIndex: 0,
      distinguisher: "Name both what persisted and what changed.",
    },
    {
      id: "world-1-7-q5",
      topicId: "world-1-7",
      concept: "compare-evidence",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "Which sentence provides the explanation in an APE response about rice and cities?",
      choices: [
        "Song China had large cities such as Hangzhou and Kaifeng",
        "More food could support more people working outside farming, so towns grew",
        "Rice was one of the main crops grown in Song China",
        "Champa rice ripened quickly and spread across much of southern China after 1000",
      ],
      correctAnswer: 1,
      explanation:
        "This sentence explains how the evidence connects to the claim about urban growth.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "This states a fact about cities without linking it to rice.",
        "This sentence explains how the evidence connects to the claim about urban growth.",
        "This is background, not an explanation.",
        "This is evidence (the Prove step), not the explanation linking it to cities.",
      ],
      nearMissIndex: 3,
      distinguisher: "Explanation connects evidence to claim.",
    },
    {
      id: "world-1-7-q6",
      topicId: "world-1-7",
      concept: "compare-governance",
      difficulty: "Apply",
      skill: "argumentation",
      prompt:
        "Which evidence most directly challenges the claim that all states centralized between 1200 and 1450?",
      choices: [
        "The Mexica built an alliance that collected tribute widely",
        "Mali and the Inca expanded across large territories",
        "Song China expanded its bureaucracy of scholar-officials",
        "Maya and Hausa cities continued to have separate rulers",
      ],
      correctAnswer: 3,
      explanation:
        "Decentralized city-states contradict a claim that every state centralized.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "A tribute empire supports centralization.",
        "Expansion supports centralization rather than challenging it.",
        "A growing bureaucracy supports centralization.",
        "Decentralized city-states contradict a claim that every state centralized.",
      ],
      nearMissIndex: 1,
      distinguisher: "A challenge must contradict the claim.",
    },
    {
      id: "world-1-7-q7",
      topicId: "world-1-7",
      concept: "compare-change",
      difficulty: "Apply",
      skill: "contextualization",
      prompt: "What chronology caution matters when comparing the Song and Inca states?",
      choices: [
        "The Song ended in 1279, long before the major Inca expansion after about 1438",
        "The Song ended in 1279, shortly after the Inca had reached their largest size",
        "The two states fought a war over Pacific trade routes in the 1300s",
        "Both reached their greatest size in the same year, around 1350",
      ],
      correctAnswer: 0,
      explanation:
        "They fall in the same broad period but did not exist at their height at the same time.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "They fall in the same broad period but did not exist at their height at the same time.",
        "The Song date is right, but the Inca's largest size came in the late 1400s.",
        "The two states had no contact.",
        "Their peaks were more than a century apart.",
      ],
      nearMissIndex: 1,
      distinguisher: "Same period does not mean same moment.",
    },
    {
      id: "world-1-7-q8",
      topicId: "world-1-7",
      concept: "compare-evidence",
      difficulty: "Apply",
      skill: "sourcing",
      prompt:
        "A historian uses a royal temple to claim every subject supported the ruler. What is the main weakness?",
      choices: [
        "Buildings cannot provide any historical evidence about the past",
        "Temples were built after 1450, so they fall outside the period",
        "Royal patronage does not reveal the beliefs or loyalty of every subject",
        "Royal temples were always built by foreign architects for visiting rulers",
      ],
      correctAnswer: 2,
      explanation:
        "A temple shows what rulers sponsored and could mobilize, not what all subjects believed.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Buildings are valuable evidence, but of specific things, such as resources and patronage.",
        "Many royal temples date from within this period.",
        "A temple shows what rulers sponsored and could mobilize, not what all subjects believed.",
        "Royal temples were usually built by local workers and artisans.",
      ],
      nearMissIndex: 3,
      distinguisher: "Match the claim to what the evidence can show.",
    },
    {
      id: "world-1-7-k1",
      topicId: "world-1-7",
      concept: "compare-evidence",
      difficulty: "Quick check",
      skill: "connections",
      reasoning: "comparison",
      prompt: "What must a comparison address?",
      choices: [
        "Events that happened in the same year",
        "One interesting fact about each case",
        "The most famous ruler in each case",
        "A shared category in two or more cases",
      ],
      correctAnswer: 3,
      explanation: "A comparison sets the same feature side by side in different cases.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Cases can be compared across a period.",
        "Facts alone do not form a comparison without a shared category.",
        "Fame is not a category of comparison.",
        "A comparison sets the same feature side by side in different cases.",
      ],
      nearMissIndex: 1,
      distinguisher: "Comparison starts with a shared category.",
    },
    {
      id: "world-1-7-k2",
      topicId: "world-1-7",
      concept: "compare-beliefs",
      difficulty: "Quick check",
      skill: "developments",
      prompt: "What does legitimacy describe?",
      choices: [
        "The total size of a ruler's standing army",
        "A ruler's ability to collect tribute",
        "Accepted justification for holding authority",
        "The number of temples a ruler built",
      ],
      correctAnswer: 2,
      explanation: "Legitimacy is the belief that a ruler has the right to rule.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Military size is power, not legitimacy.",
        "Collecting tribute shows power, which legitimacy helps justify.",
        "Legitimacy is the belief that a ruler has the right to rule.",
        "Temples can support legitimacy, but they are not the definition.",
      ],
      nearMissIndex: 0,
      distinguisher: "Legitimacy is about the right to rule.",
    },
    {
      id: "world-1-7-k3",
      topicId: "world-1-7",
      concept: "compare-resources",
      difficulty: "Quick check",
      skill: "developments",
      prompt:
        "Which InSPECT lens most directly fits required payments and labor obligations?",
      choices: [
        "S: Social interactions",
        "E: Economic systems",
        "T: Technology and innovation",
        "P: Political systems",
      ],
      correctAnswer: 1,
      explanation:
        "Payments and labor obligations describe how goods and work were produced and taken.",
      sourceIds: ["amsco-unit-1", "ced"],
      sourceLocators: [
        {
          sourceId: "ced",
          locator: "Topic 1.7 learning objectives and historical developments",
        },
      ],
      choiceExplanations: [
        "Social rank shaped who owed labor, but the obligations are economic.",
        "Payments and labor obligations describe how goods and work were produced and taken.",
        "Technology concerns tools and techniques, not obligations.",
        "Political power enforced these obligations, but the payments are economic.",
      ],
      nearMissIndex: 3,
      distinguisher: "Payments and labor are economic.",
    },
  ],
  quizzes: [
    {
      id: "world-1-7-quiz",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-7",
      title: "Comparisons in the Period topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-1-7-q1",
        "world-1-7-q2",
        "world-1-7-q3",
        "world-1-7-q4",
        "world-1-7-q5",
        "world-1-7-q6",
        "world-1-7-q7",
        "world-1-7-q8",
      ],
    },
    {
      id: "world-1-7-quick",
      courseId: "world",
      unitId: "world-1",
      topicId: "world-1-7",
      title: "Comparisons in the Period quick practice",
      quizType: "quick",
      questionIds: ["world-1-7-k1", "world-1-7-k2", "world-1-7-k3"],
    },
  ],
};

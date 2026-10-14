// Original Page One lesson for CED Topic 4.1. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-04.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-4-1",
  unitId: "world-4",
  courseId: "world",
  code: "4.1",
  title: "Technological Innovations from 1450 to 1750",
  period: "c. 1450–1750",
  status: "ready",
  order: 1,
  summary:
    "How tools, ship designs, and knowledge of winds and currents, much of it borrowed, made transoceanic voyages possible.",
  minutes: 9,
  learningGoals: [
    "Explain how cross-cultural interactions spread technology that changed patterns of trade and travel.",
    "Describe the ship designs and navigational tools that made long ocean voyages practical.",
  ],
  bigIdea:
    "Europeans combined navigational knowledge and tools from Asia and the Islamic world with new ship designs, which made voyages across open oceans possible.",
  context:
    "Before 1450, sailors in the Indian Ocean, South China Sea, and Mediterranean had long used compasses, lateen sails, and seasonal winds. Atlantic Europeans built on this knowledge.",
  sections: [
    {
      id: "borrowed-knowledge",
      title: "Borrowed knowledge",
      conceptTitle: "Borrowed knowledge",
      lenses: ["T", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "The magnetic compass came from China. The astrolabe, refined by scholars in the Islamic world, measured the height of stars to find latitude. The lateen sail, a triangular sail used in the Indian Ocean and Mediterranean, let ships sail closer to the wind.",
        },
        {
          type: "paragraph",
          text: "European mapmakers also drew on Greek, Arabic, and Chinese geographic knowledge. Printing spread new maps and sailing guides quickly.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Do not describe these tools as European inventions. The AP framework stresses that knowledge from the Classical, Islamic, and Asian worlds made European voyages possible.",
        },
      ],
      takeaway: "European exploration rested on knowledge gathered across Afro-Eurasia.",
      sourceIds: ["ced-topic-4-1"],
    },
    {
      id: "ships-navigation",
      title: "New ships",
      conceptTitle: "New ships",
      lenses: ["T", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Portuguese builders developed the caravel, a small ship with square and lateen sails that could explore coasts and sail against the wind. Larger carracks carried more cargo and guns for long trading voyages.",
        },
        {
          type: "paragraph",
          text: "The Dutch later built the fluyt, a cargo ship designed to carry large loads with a small crew. Lower shipping costs helped the Dutch dominate European trade in the 1600s.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Better ships lowered the cost and risk of long voyages, which made regular ocean trade profitable and encouraged states and merchants to invest in it.",
        },
      ],
      takeaway:
        "Ship design responded to the goals of exploration, warfare, and cheap cargo transport.",
      sourceIds: ["ced-topic-4-1"],
    },
    {
      id: "winds-currents",
      title: "Winds and currents",
      conceptTitle: "Winds and currents",
      lenses: ["In", "T"],
      blocks: [
        {
          type: "paragraph",
          text: "Sailors learned that Atlantic winds move in large circles. Portuguese captains returning from West Africa swung far west to catch winds blowing toward Europe. Columbus used the trade winds that blow west near the Canary Islands.",
        },
        {
          type: "paragraph",
          text: "In the Indian Ocean, monsoon winds had long set the rhythm of trade. When Vasco da Gama reached East Africa in 1498, he hired a local pilot who knew the route to India.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Europeans did not discover the monsoons. They learned the Indian Ocean system from sailors who had used it for centuries.",
        },
      ],
      takeaway:
        "Understanding wind patterns turned dangerous voyages into repeatable routes.",
      sourceIds: ["ced-topic-4-1"],
    },
  ],
  vocabulary: [
    {
      id: "astrolabe",
      topicId: "world-4-1",
      term: "astrolabe",
      definition:
        "An instrument, refined in the Islamic world, that measures the angle of the sun or stars to help find latitude.",
    },
    {
      id: "lateen-sail",
      topicId: "world-4-1",
      term: "lateen sail",
      definition:
        "A triangular sail, long used in the Indian Ocean and Mediterranean, that lets a ship sail closer to the direction of the wind.",
    },
    {
      id: "caravel",
      topicId: "world-4-1",
      term: "caravel",
      definition:
        "A small, maneuverable Portuguese ship with square and lateen sails, used for exploring the African coast.",
    },
    {
      id: "fluyt",
      topicId: "world-4-1",
      term: "fluyt",
      definition:
        "A Dutch cargo ship designed to carry large loads with a small crew, which lowered shipping costs.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-4-astrolabe",
      "world-4-lateen-sail",
      "world-4-caravel",
      "world-4-fluyt",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 2 bridge",
      title: "Indian Ocean knowledge",
      body: "Unit 2 described monsoon sailing and the compass in Indian Ocean trade. Those same tools and wind patterns made Portuguese voyages to Asia possible.",
      transferQuestion:
        "How did knowledge from Indian Ocean trade help European sailors after 1450?",
      feedback: "Name a tool or wind pattern and explain how Europeans used it.",
      links: [
        {
          topicId: "world-2-3",
          sectionId: "monsoon-navigation",
          label: "Review the monsoon system",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-4-1", "ced"],
};

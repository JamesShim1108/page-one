// Original Page One lesson for CED Topic 4.2.

export const lesson = {
  schemaVersion: 1,
  id: "world-4-2",
  unitId: "world-4",
  courseId: "world",
  code: "4.2",
  title: "Exploration: Causes and Events from 1450 to 1750",
  period: "c. 1450–1750",
  status: "ready",
  order: 2,
  summary:
    "Why European states sponsored ocean voyages, and how Portuguese, Spanish, English, French, and Dutch exploration unfolded.",
  minutes: 11,
  learningGoals: [
    "Describe the role of states in the expansion of maritime exploration.",
    "Explain the economic causes and effects of maritime exploration by European states.",
  ],
  bigIdea:
    "European states sponsored exploration to gain wealth, spread Christianity, and gain advantage over rivals, especially by reaching Asian trade without Muslim or Venetian middlemen.",
  context:
    "Asian spices, silk, and porcelain reached Europe through Ottoman, Egyptian, and Venetian merchants who took large profits. Atlantic kingdoms looked for routes of their own.",
  sections: [
    {
      id: "motives",
      title: "Why states sponsored voyages",
      conceptTitle: "Why states sponsored voyages",
      lenses: ["E", "P", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "Rulers wanted gold, spices, and new sources of revenue. They also hoped to spread Christianity and outflank Muslim rivals. Voyages were expensive and risky, so they usually needed royal backing.",
        },
        {
          type: "paragraph",
          text: "Mercantilism, the idea that a state grows strong by exporting more than it imports and accumulating gold and silver, encouraged rulers to claim colonies and control trade.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "High prices for Asian goods and the profits taken by middlemen made a direct sea route valuable, so rulers funded voyages, which led to new routes and colonies.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Do not reduce exploration to curiosity. States paid for voyages because they expected wealth and power.",
        },
      ],
      takeaway:
        "Exploration was a state project driven by economic, religious, and political goals.",
      sourceIds: ["ced-topic-4-2"],
    },
    {
      id: "portuguese-voyages",
      title: "Portugal reaches Asia",
      conceptTitle: "Portugal reaches Asia",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Prince Henry of Portugal sponsored voyages down the West African coast in the early 1400s. Bartolomeu Dias rounded the southern tip of Africa in 1488, and Vasco da Gama reached Calicut in India in 1498.",
        },
        {
          type: "paragraph",
          text: "The sea route let Portugal trade for spices without Venetian or Ottoman middlemen. Portugal soon built fortified trading posts along the coasts of Africa and Asia.",
        },
      ],
      takeaway: "Portugal pioneered a sea route around Africa to Asia's markets.",
      sourceIds: ["ced-topic-4-2"],
    },
    {
      id: "spanish-voyages",
      title: "Spain crosses the Atlantic",
      conceptTitle: "Spain crosses the Atlantic",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Christopher Columbus sailed for Spain in 1492, hoping to reach Asia by sailing west, and reached the Caribbean. The Treaty of Tordesillas in 1494 divided newly claimed lands between Spain and Portugal.",
        },
        {
          type: "paragraph",
          text: "The expedition begun by Ferdinand Magellan sailed around the world from 1519 to 1522. Spain went on to conquer the Mexica and Inca empires and built a vast American empire funded by silver.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Columbus did not prove the world was round; educated Europeans already knew that. His error was underestimating the distance to Asia.",
        },
      ],
      takeaway:
        "Spanish voyages connected the Americas to Europe and, through the Pacific, to Asia.",
      sourceIds: ["ced-topic-4-2"],
    },
    {
      id: "northern-atlantic",
      title: "English, French, and Dutch voyages",
      conceptTitle: "English, French, and Dutch voyages",
      lenses: ["E", "In"],
      blocks: [
        {
          type: "paragraph",
          text: "John Cabot, sailing for England, reached Newfoundland in 1497. Jacques Cartier explored the St. Lawrence River for France in the 1530s. They searched for a northwest passage to Asia and did not find one.",
        },
        {
          type: "paragraph",
          text: "Instead, northern Atlantic voyages led to rich fisheries and a fur trade with Indigenous peoples. French and Dutch traders exchanged metal goods and cloth for beaver pelts.",
        },
      ],
      takeaway:
        "Northern voyages failed to find a route to Asia but opened fisheries and the fur trade.",
      sourceIds: ["ced-topic-4-2"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Within Unit 4",
      title: "From voyages to exchange",
      body: "Columbus's voyages began the Columbian Exchange of plants, animals, and diseases described in Topic 4.3.",
      transferQuestion: "How did the voyages of 1492 lead to biological exchange?",
      feedback: "Name a specific organism and its effect.",
      links: [
        {
          topicId: "world-4-3",
          sectionId: "disease",
          label: "Review the Columbian Exchange",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-4-2", "ced"],
};

// Original Page One lesson for CED Topic 9.6.

export const lesson = {
  schemaVersion: 1,
  id: "world-9-6",
  unitId: "world-9",
  courseId: "world",
  code: "9.6",
  title: "Globalized Culture After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 6,
  summary:
    "How consumer culture, film, music, and sports spread across the world in many directions.",
  minutes: 8,
  learningGoals: ["Explain how and why globalization changed culture over time."],
  bigIdea:
    "Culture became global, with American brands spreading worldwide but also Indian films, Jamaican music, and Korean pop reaching audiences everywhere.",
  context:
    "Radio, film, television, and the internet carried culture across borders faster than ever.",
  sections: [
    {
      id: "global-culture",
      title: "Culture in many directions",
      conceptTitle: "Culture in many directions",
      lenses: ["C", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "After World War II, consumer culture, a way of life centered on buying brand-name goods, spread worldwide with companies such as Coca-Cola and McDonald's. Critics warned of Americanization.",
        },
        {
          type: "paragraph",
          text: "But culture also flowed in other directions. India's Bollywood film industry reached audiences across Asia and Africa. Reggae spread from Jamaica, and Japanese anime and Korean pop music won global fans through social media.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Globalized culture was not simply American culture. Local cultures adapted global products, and non-Western culture spread worldwide.",
        },
      ],
      takeaway: "Global culture flowed in many directions, not only from the West.",
      sourceIds: ["ced-topic-9-6"],
    },
    {
      id: "sports",
      title: "Global sports",
      conceptTitle: "Global sports",
      lenses: ["C", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Sports became global spectacles. The FIFA World Cup, first held in 1930, draws hundreds of millions of viewers. Cricket, spread by the British Empire, became a national passion in South Asia and the Caribbean.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Television and satellite broadcasting turned sports into global events and created international audiences and markets.",
        },
      ],
      takeaway:
        "Sports created shared global experiences while expressing national pride.",
      sourceIds: ["ced-topic-9-6"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 6 bridge",
      title: "Empire and culture",
      body: "Cricket and the English language spread through the British Empire and remained after independence.",
      transferQuestion: "How did imperialism shape later global culture?",
      feedback: "Name a cultural practice spread by empire and explain its later role.",
      links: [
        { topicId: "world-9-6", sectionId: "sports", label: "Review global sports" },
      ],
    },
  ],
  sourceIds: ["ced-topic-9-6", "ced"],
};

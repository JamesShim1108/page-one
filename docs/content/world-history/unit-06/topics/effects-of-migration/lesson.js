// Original Page One lesson for CED Topic 6.7.

export const lesson = {
  schemaVersion: 1,
  id: "world-6-7",
  unitId: "world-6",
  courseId: "world",
  code: "6.7",
  title: "Effects of Migration",
  period: "c. 1750–1900",
  status: "ready",
  order: 7,
  summary:
    "How migrants formed ethnic enclaves, how migration changed home societies, and how some receiving societies responded with exclusion.",
  minutes: 8,
  learningGoals: [
    "Explain how and why new patterns of migration affected society from 1750 to 1900.",
    "Explain why some receiving societies passed laws restricting immigration.",
  ],
  bigIdea:
    "Migration created diverse communities around the world, changed gender roles at home, and provoked nativist laws in some receiving societies.",
  context:
    "Migrants carried languages, religions, and foods with them. Their arrival changed both the places they went and the places they left.",
  sections: [
    {
      id: "enclaves",
      title: "Ethnic enclaves and home societies",
      conceptTitle: "Ethnic enclaves and home societies",
      lenses: ["S", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "Migrants often formed ethnic enclaves, such as Chinese communities in Southeast Asia, the Caribbean, and San Francisco, and Indian communities in East Africa and the Caribbean.",
        },
        {
          type: "paragraph",
          text: "Most migrants were young men. Women in home societies, such as southern Italy and southern China, often took on more responsibility for farms and businesses.",
        },
      ],
      takeaway: "Migration built diverse communities and changed family roles at home.",
      sourceIds: ["ced-topic-6-7"],
    },
    {
      id: "nativism",
      title: "Nativism and exclusion",
      conceptTitle: "Nativism and exclusion",
      lenses: ["P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Some receiving societies reacted with nativism, hostility toward immigrants. The United States passed the Chinese Exclusion Act in 1882, and Australia adopted the White Australia Policy in 1901.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Economic competition and racial ideas led some workers and politicians to blame immigrants, which produced laws excluding them.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Exclusion laws targeted particular groups. The same countries welcomed many European immigrants.",
        },
      ],
      takeaway: "Racial ideas shaped who receiving societies welcomed and excluded.",
      sourceIds: ["ced-topic-6-7"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "Migration in the 1900s",
      body: "Unit 9 traces migration after 1900, including movement from former colonies to Europe.",
      transferQuestion: "How might patterns of migration change after empires end?",
      feedback:
        "Suggest a connection between former colonies and former imperial powers.",
      links: [
        {
          topicId: "world-6-7",
          sectionId: "enclaves",
          label: "Review ethnic enclaves",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-6-7", "ced"],
};

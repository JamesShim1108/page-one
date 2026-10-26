// Original Page One lesson for CED Topic 9.8.

export const lesson = {
  schemaVersion: 1,
  id: "world-9-8",
  unitId: "world-9",
  courseId: "world",
  code: "9.8",
  title: "Institutions Developing in a Globalized World",
  period: "c. 1900–present",
  status: "ready",
  order: 8,
  summary:
    "How international, regional, and nongovernmental organizations grew to manage a connected world.",
  minutes: 9,
  learningGoals: [
    "Explain how and why institutions developed to address global problems after 1900.",
  ],
  bigIdea:
    "States created international and regional organizations to keep peace, promote trade, and address shared problems, and private groups formed to act across borders.",
  context:
    "After two world wars and a depression, leaders hoped international cooperation would prevent new disasters.",
  sections: [
    {
      id: "international",
      title: "International organizations",
      conceptTitle: "International organizations",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "The United Nations, founded in 1945, sent peacekeepers to conflict zones, and its agencies such as the World Health Organization fought disease. The International Monetary Fund and World Bank lent money for stability and development.",
        },
        {
          type: "paragraph",
          text: "In 1995, the World Trade Organization began setting trade rules and settling disputes. Nongovernmental organizations, or NGOs, such as Amnesty International and Doctors Without Borders, worked across borders on human rights and health.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "International organizations depend on member states. The UN cannot act against the veto of a permanent Security Council member.",
        },
      ],
      takeaway:
        "Global institutions and NGOs grew to address problems no single state could solve.",
      sourceIds: ["ced-topic-9-8"],
    },
    {
      id: "regional",
      title: "Regional organizations",
      conceptTitle: "Regional organizations",
      lenses: ["P", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Western European states formed a common market in 1957 that grew into the European Union in 1993; many members adopted the euro in 1999. Other regions formed groups such as the Association of Southeast Asian Nations and the African Union.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Regional cooperation promised economic growth and peace, but members had to give up some control over trade and borders.",
        },
      ],
      takeaway:
        "Regional organizations traded some national control for economic and political cooperation.",
      sourceIds: ["ced-topic-9-8"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 7 bridge",
      title: "From the League to the UN",
      body: "The League of Nations failed to prevent World War II; the United Nations was designed to be stronger.",
      transferQuestion: "How did the United Nations differ from the League of Nations?",
      feedback: "Name one structural difference, such as the Security Council.",
      links: [
        {
          topicId: "world-8-1",
          sectionId: "two-superpowers",
          label: "Review the founding of the UN",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-9-8", "ced"],
};

// Original Page One lesson for CED Topic 5.1.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-1",
  unitId: "world-5",
  courseId: "world",
  code: "5.1",
  title: "The Enlightenment",
  period: "c. 1750–1900",
  status: "ready",
  order: 1,
  summary:
    "How Enlightenment thinkers applied reason to government and society, and how their ideas inspired reform movements.",
  minutes: 11,
  learningGoals: [
    "Explain the intellectual and ideological context in which revolutions swept the Atlantic world.",
    "Explain how Enlightenment ideas influenced reform movements, including abolition and women's rights.",
  ],
  bigIdea:
    "Enlightenment thinkers used reason to question inherited authority, and their ideas about natural rights and consent fueled revolutions and reform movements.",
  context:
    "The Scientific Revolution showed that reason and observation could explain nature. Thinkers of the 1700s applied the same methods to politics, religion, and society.",
  sections: [
    {
      id: "natural-rights",
      title: "Natural rights and the social contract",
      conceptTitle: "Natural rights and the social contract",
      lenses: ["P", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "John Locke argued in 1690 that people have natural rights to life, liberty, and property, and that government rests on the consent of the governed. If rulers violate those rights, the people may replace them.",
        },
        {
          type: "paragraph",
          text: "Jean-Jacques Rousseau described a social contract in which citizens together form the general will. Montesquieu argued for the separation of powers among branches of government, and Voltaire championed religious tolerance and free expression.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Ideas that authority comes from the people undermined divine right, which encouraged colonists and subjects to justify revolt against kings.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Enlightenment thinkers did not all agree, and many did not apply their ideas to women, enslaved people, or colonized peoples.",
        },
      ],
      takeaway: "Natural rights and consent became the language of revolution.",
      sourceIds: ["ced-topic-5-1"],
    },
    {
      id: "reform-movements",
      title: "Reform movements",
      conceptTitle: "Reform movements",
      lenses: ["S", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "Abolitionists drew on natural rights and on religious belief. Britain ended its slave trade in 1807 and abolished slavery in most of its empire in 1833. Russia emancipated its serfs in 1861.",
        },
        {
          type: "paragraph",
          text: "Mary Wollstonecraft argued in 1792 that women deserved the same education as men. At Seneca Falls in 1848, activists demanded women's suffrage, the right to vote. New Zealand granted women the national vote in 1893.",
        },
      ],
      takeaway:
        "Reformers used Enlightenment principles to demand rights for groups that had been excluded.",
      sourceIds: ["ced-topic-5-1"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 3 bridge",
      title: "From divine right to consent",
      body: "Unit 3 described rulers such as Louis XIV who claimed divine right. Enlightenment thinkers argued instead that legitimate government rests on the consent of the governed.",
      transferQuestion: "How did natural rights challenge the idea of divine right?",
      feedback: "Name the source of authority in each idea and explain the conflict.",
      links: [
        {
          topicId: "world-3-2",
          sectionId: "religion-legitimacy",
          label: "Review divine right",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-1", "ced"],
};

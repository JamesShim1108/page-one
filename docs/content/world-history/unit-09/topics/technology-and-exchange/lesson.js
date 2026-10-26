// Original Page One lesson for CED Topic 9.1.

export const lesson = {
  schemaVersion: 1,
  id: "world-9-1",
  unitId: "world-9",
  courseId: "world",
  code: "9.1",
  title: "Advances in Technology and Exchange After 1900",
  period: "c. 1900–present",
  status: "ready",
  order: 1,
  summary:
    "How new communication, transportation, agriculture, and medicine shrank distances and lengthened lives.",
  minutes: 9,
  learningGoals: [
    "Explain how the development of new technologies changed the world from 1900 to the present.",
  ],
  bigIdea:
    "Technology reduced the problem of distance, fed a rapidly growing population, and helped people live longer, though its benefits were spread unevenly.",
  context:
    "The world's population grew from about 1.6 billion in 1900 to more than 8 billion by 2022.",
  sections: [
    {
      id: "shrinking-distance",
      title: "Shrinking distance",
      conceptTitle: "Shrinking distance",
      lenses: ["T", "E"],
      blocks: [
        {
          type: "paragraph",
          text: "Radio reached mass audiences in the 1920s, and television followed after World War II. Jet airliners cut ocean crossings from days to hours. Shipping containers, standard steel boxes moved from ship to train to truck without unloading, made it far cheaper to ship goods across the world after 1956.",
        },
        {
          type: "paragraph",
          text: "The internet grew from a 1969 US research network into a global system in the 1990s, and mobile phones spread to most of the world's people. Petroleum and nuclear power supplied the energy to run factories, cars, and cities.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Cheaper transport and instant communication made it possible to design a product in one country, build it in another, and sell it everywhere.",
        },
      ],
      takeaway:
        "New communication and transportation technologies reduced the problem of distance.",
      sourceIds: ["ced-topic-9-1"],
    },
    {
      id: "food-and-medicine",
      title: "Feeding and healing more people",
      conceptTitle: "Feeding and healing more people",
      lenses: ["T", "In", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "The Green Revolution of the 1940s to 1970s spread high-yield seeds, chemical fertilizers, and irrigation from Mexico to India, Pakistan, and elsewhere, greatly increasing grain harvests.",
        },
        {
          type: "paragraph",
          text: "Vaccines and antibiotics, drugs such as penicillin that kill bacteria, saved millions of lives. Global life expectancy roughly doubled between 1900 and 2000.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The benefits of new technology were not equal. The Green Revolution helped wealthier farmers most, and many poor regions gained access to medicine and the internet only slowly.",
        },
      ],
      takeaway:
        "Agricultural and medical technology supported a much larger, longer-lived population.",
      sourceIds: ["ced-topic-9-1"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 5 bridge",
      title: "A second technological transformation",
      body: "The steam engine and telegraph of the Industrial Revolution shrank distances in the nineteenth century; jets, containers, and the internet did so again in the twentieth.",
      transferQuestion: "Compare the effects of the telegraph and the internet.",
      feedback:
        "Name one similarity in what each made possible and one difference in scale.",
      links: [
        {
          topicId: "world-9-1",
          sectionId: "shrinking-distance",
          label: "Review shrinking distance",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-9-1", "ced"],
};

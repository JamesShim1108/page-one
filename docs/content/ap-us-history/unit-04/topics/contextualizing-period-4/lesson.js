// Original Page One lesson for CED Topic 4.1, a context topic.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.1", {
  summary:
    "The context for Period 4: a more participatory democracy and a new national culture, an economy transformed by innovation, and a nation that expanded westward and argued over slavery, 1800–1848.",
  minutes: 10,
  goals: [
    "Describe the development of a more participatory democracy and a new national culture after 1800.",
    "Explain how innovations in technology, agriculture, and commerce changed the American economy and society.",
    "Explain how expansion and foreign policy gave rise to conflicts over slavery.",
  ],
  bigIdea:
    "Between 1800 and 1848 the United States grew more democratic, more commercial, and larger, and each change raised new questions about who belonged in the nation and where slavery would be allowed.",
  context:
    "The CED asks you to explain the context in which the republic developed from 1800 to 1848. For any Period 4 event, ask what the nation had inherited from the 1790s, what else was changing at the same time, and how both shaped the event.",
  sections: [
    section(
      "democracy-and-national-culture",
      "Democracy and a national culture",
      ["PCE", "ARC", "NAT"],
      [
        "The United States began to develop a modern democracy and celebrated a new national culture, while Americans sought to define the nation's democratic ideals and change their society and institutions to match them. The nation's transition to a more participatory democracy was achieved by expanding suffrage from a system based on property ownership to one based on voting by all adult white men, and it was accompanied by the growth of political parties.",
        "While Americans embraced a new national culture, various groups developed distinctive cultures of their own. Increasing numbers of Americans, many inspired by new religious and intellectual movements, worked primarily outside of government institutions to advance their ideals, which led to reform movements such as temperance, abolitionism, and women's rights.",
        [
          "Common trap",
          "More participatory democracy did not mean democracy for everyone. In this period the vote expanded for white men while women, most African Americans, and American Indians stayed outside it.",
        ],
      ],
      "Suffrage grew for white men, parties multiplied, and a national culture and many reform movements developed.",
    ),
    section(
      "market-revolution-overview",
      "Innovation and the market revolution",
      ["WXT", "SOC", "MIG"],
      [
        "Innovations in technology, agriculture, and commerce powerfully accelerated the American economy, precipitating profound changes to U.S. society and to national and regional identities. New transportation systems and technologies, including canals, steamboats, and railroads, dramatically expanded manufacturing and agricultural production.",
        "The changes caused by the market revolution had significant effects on U.S. society, workers' lives, and gender and family relations. Economic development shaped settlement and trade patterns, helping to unify the nation while also encouraging the growth of different regions.",
      ],
      "New technology and transportation expanded the economy, changed daily life, and drew regions together in some ways while setting them apart in others.",
    ),
    section(
      "expansion-and-slavery",
      "Expansion, foreign policy, and slavery",
      ["WOR", "GEO", "MIG"],
      [
        "The U.S. interest in increasing foreign trade and expanding its national borders shaped the nation's foreign policy and spurred government and private initiatives. Struggling to create an independent global presence, the United States sought to claim territory throughout the North American continent and promote foreign trade.",
        "The United States' acquisition of lands in the West gave rise to contests over the extension of slavery into new territories. Each new addition of land raised the question of whether slavery would be allowed to spread, and that question would increasingly divide the nation.",
      ],
      "A growing nation claimed more territory, and each acquisition renewed the conflict over slavery.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge from Unit 3",
      title: "From the new republic to a democratic nation",
      body: "Unit 3 ended with the first political parties and disputes over federal power. Period 4 begins with the next stage of those disputes.",
      transferQuestion:
        "Which development of the 1790s helps explain the political debates of the early 1800s?",
      feedback:
        "A strong answer names the Federalist and Democratic-Republican disagreement over federal power or foreign policy and explains how it continued.",
      links: [
        {
          topicId: "apush-3-10",
          sectionId: "parties-and-foreign-policy",
          label: "Review the first parties and foreign policy",
        },
      ],
    },
  ],
  sourceIds: [],
});

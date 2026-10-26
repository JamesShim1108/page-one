// Original Page One lesson for CED Topic 4.14, a reasoning-process topic.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.14", {
  summary:
    "A guide to explaining the causes and effects of change from 1800 to 1848, and to judging the extent to which politics, economics, and foreign policy promoted an American identity.",
  minutes: 11,
  goals: [
    "Distinguish a cause from an effect and a short-term cause from a long-term cause.",
    "Explain how politics and foreign policy helped to shape an American identity from 1800 to 1848.",
    "Explain how economic change and its effects on regions promoted or limited a shared identity.",
  ],
  bigIdea:
    "Politics, economics, and foreign policy all promoted a stronger sense of national identity from 1800 to 1848, but the same forces widened differences among regions, especially over slavery.",
  context:
    "The CED treats causation as a historical reasoning process. The strongest answers identify a cause and an effect, explain how one led to the other, and judge the extent of the effect, using specific evidence.",
  sections: [
    section(
      "how-to-reason-about-causation",
      "How to reason about causation",
      ["NAT", "SOC"],
      [
        "Causation means explaining why something happened and what resulted. Begin by naming the event or development. Then name a cause, which is something that helped to bring it about, and an effect, which is something that followed from it. Strong answers separate long-term causes, such as the growth of a market economy, from short-term causes, such as a specific election or law.",
        "A good causal claim explains the link between cause and effect and does not simply put them side by side. Avoid saying that one thing caused something else only because it came before it. Ask also how large the effect was. Questions about “the extent” of an effect call for you to say how much a factor mattered and what else mattered more.",
      ],
      "Name the cause, name the effect, explain the link, and judge how large the effect was.",
    ),
    section(
      "politics-and-foreign-policy",
      "Politics and foreign policy as causes of identity",
      ["PCE", "WOR", "NAT"],
      [
        "Politics promoted a shared identity when more citizens voted and took part in national campaigns. The expansion of suffrage and the rise of the Democrats and the Whigs gave many white men a sense of belonging to a nation. Supreme Court decisions such as McCulloch v. Maryland and Gibbons v. Ogden strengthened national authority over the states.",
        "Foreign policy had similar effects. The War of 1812 stirred national pride and ended the Federalist Party. The Monroe Doctrine claimed a role for the United States in the Western Hemisphere. Territorial expansion, from the Louisiana Purchase to the removal of American Indians, gave Americans a sense of a continental destiny.",
        "These same forces also divided. Regional interests shaped debates over the tariff and the bank, the nullification crisis showed how states could challenge federal power, and each addition of territory renewed the dispute over slavery, as the Missouri Compromise showed.",
      ],
      "Participation, national courts, war, and expansion strengthened national identity, but regional interests and slavery pulled the country apart.",
    ),
    section(
      "economics-and-society",
      "Economic change as a cause of identity",
      ["WXT", "GEO", "SOC"],
      [
        "The market revolution tied together the country's economy. Canals, steamboats, railroads, and the telegraph linked the North and Midwest, and the sale of Southern cotton to Northern and British buyers tied the South to the national and international market. Consumers across the country bought goods from distant producers.",
        "Economic change also produced differences. The North developed factories, wage labor, and cities, while the South relied on cotton and slave labor. These differences shaped political positions on tariffs, internal improvements, and the extension of slavery. In an essay about the extent to which politics, economics, and foreign policy promoted American identity, a balanced answer would say that each promoted a common identity among many Americans and that each also deepened regional differences.",
        [
          "Common trap",
          "A single cause rarely explains a large change. Combine causes, and say which mattered most and why.",
        ],
      ],
      "The market revolution linked regions into one economy and created regional differences, so its effect on identity was mixed.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Unit 5",
      title: "A nation divided over expansion and slavery",
      body: "Unit 5 follows the same regional divisions as territorial expansion and the debate over slavery lead to the Civil War.",
      transferQuestion:
        "Which cause from Period 4 do you think did the most to widen the gap between the North and the South, and why?",
      feedback:
        "A strong answer picks one cause, such as the westward spread of slavery or the different paths of Northern and Southern economies, and uses specific evidence to explain its effect.",
      links: [
        {
          topicId: "apush-4-13",
          sectionId: "westward-slavery",
          label: "Review the westward movement of slavery",
        },
      ],
    },
  ],
  sourceIds: [],
});

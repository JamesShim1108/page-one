// Original Page One lesson for CED Topic 1.7, a reasoning topic on causation.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("1.7", {
  summary:
    "How to explain the causes and effects of the transatlantic voyages of 1491–1607: separating long-term and short-term causes, tracing chains of effects, and weighing competing explanations.",
  minutes: 10,
  goals: [
    "Distinguish long-term causes from short-term causes of European exploration and conquest.",
    "Trace chains of cause and effect, including intended and unintended consequences, from the voyages to the Atlantic world.",
    "Weigh competing causes and write a causal claim that is supported with evidence.",
  ],
  bigIdea:
    "Historians explain events by identifying several causes, separating what made an event possible from what made it happen, and judging which causes mattered most.",
  context:
    "This topic applies the reasoning skill of causation to everything in Unit 1. The CED asks you to explain the effects of the development of transatlantic voyages from 1491 to 1607.",
  sections: [
    section(
      "causes-of-voyages",
      "Why the voyages began",
      ["WOR", "WXT"],
      [
        "Causation means explaining why something happened and what it led to. Most events have more than one cause, and causes differ in how long they were at work. Long-term causes built over many years. Short-term causes were closer to the event and often triggered it.",
        "The long-term causes of European exploration were the search for new sources of wealth, economic and military competition among monarchies, and a desire to spread Christianity. A short-term trigger was a particular decision, such as Ferdinand and Isabella's agreement in 1492 to fund Columbus. Better ships and navigation tools, such as the caravel and the compass, were conditions that made long voyages possible, but they do not explain why rulers wanted to pay for them.",
        [
          "Common trap",
          "Do not confuse what made an event possible with what made it happen. Technology made the voyages possible. Wealth, rivalry, and faith gave monarchs reasons to send them.",
        ],
      ],
      "Exploration had several long-term causes, and a short-term decision set particular voyages in motion.",
    ),
    section(
      "effects-of-voyages",
      "From voyages to an Atlantic world",
      ["WOR", "GEO", "SOC"],
      [
        "The voyages produced effects that unfolded in stages. Contact quickly brought the Columbian Exchange. Old World diseases spread through Native populations that had no immunity, and in many regions most of the people died within a few generations. These losses, together with Indigenous alliances and Spanish weapons, made conquest possible.",
        "Conquest led to further effects. Spain built an empire that depended on forced labor. Labor shortages after Native population decline increased the demand for enslaved Africans, which expanded the Atlantic slave trade and strengthened the role of some West African partners in supplying captives. American silver and crops helped change Europe's economy, and new business methods such as joint-stock companies spread. Over time, the voyages linked Europe, Africa, and the Americas in one Atlantic world.",
        [
          "Cause and effect",
          "Voyages carried diseases to the Americas, Native populations fell, labor shortages followed, and Spain imported more enslaved Africans. Each effect became a cause of the next development.",
        ],
        [
          "Intended and unintended effects",
          "Rulers intended to gain wealth and spread Christianity. They did not intend the epidemics that spread among Native peoples, although the epidemics helped the conquest succeed.",
        ],
      ],
      "Effects of the voyages linked together in chains, and some of the most important ones were unintended.",
    ),
    section(
      "weighing-causes",
      "Weighing causes and making a causal claim",
      ["WOR", "PCE"],
      [
        "When several causes explain an event, historians judge which mattered most. Consider the fall of the Aztec Empire. Some historians stress disease, because epidemics killed many Aztecs and weakened the city. Others stress Indigenous allies, such as the Tlaxcalans, because thousands of Native warriors fought alongside a small Spanish force. Most agree that weapons, allies, and disease worked together, but they disagree about how much weight each deserves.",
        "A strong causal claim names a cause and an effect, explains the link between them, and supports the link with specific evidence. For example, a claim that competition among monarchies drove exploration should point to specific actions, such as Spain and Portugal dividing the world in the Treaty of Tordesillas and England and France sending their own expeditions despite it.",
      ],
      "To make a causal claim, name the cause and effect, explain the link, and weigh it against other causes with evidence.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Unit 2",
      title: "The same causes shape new colonies",
      body: "Unit 2 covers 1607 to 1754, when England, France, and the Netherlands founded colonies of their own. Wealth, rivalry, and religion remained central motives, and the labor systems and cultural encounters of Period 1 provided patterns that later colonies would follow or change.",
      transferQuestion:
        "Which cause of Spanish exploration would you expect to matter in English colonization, and what evidence would you look for?",
      feedback:
        "A strong answer picks one cause, such as rivalry with Spain, and names the kind of evidence, such as an English promoter's argument or a charter, that would show its effect.",
      links: [
        {
          topicId: "apush-1-4",
          sectionId: "epidemics-and-conquest",
          label: "Review epidemics and conquest",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-1"],
});

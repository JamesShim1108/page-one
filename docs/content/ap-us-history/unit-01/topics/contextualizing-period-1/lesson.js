// Original Page One lesson for CED Topic 1.1, a contextualizing topic.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("1.1", {
  summary:
    "What a historical context is, and the Native American, European, and African developments that framed the encounters of 1491 to 1607.",
  minutes: 9,
  goals: [
    "Describe a historical context as developments before, during, or after an event that help explain it.",
    "Describe the Native American societies, European rivalries, and Atlantic connections that set the stage for contact.",
    "Explain how one development, such as the Reconquista, is situated within that broader context.",
  ],
  bigIdea:
    "Encounters in the Americas began in a world already full of complex Native societies, competing European monarchies, and growing Atlantic trade. Placing an event in that setting is what contextualization means.",
  context:
    "Every AP U.S. History period opens with a contextualizing topic. For Period 1 the question is what was already happening in the Americas, Europe, and Africa that shaped what happened when they met.",
  sections: [
    section(
      "what-is-context",
      "Context is the larger setting around a development",
      ["WOR"],
      [
        "Contextualization means placing an event or process in the broader setting in which it happened. A strong context describes developments that came before, took place at the same time, or continued after the topic, and then connects them to it.",
        "Take the Spanish conquest of the Aztec Empire (1519–1521). The completion of the Reconquista in 1492 is context from before: it joined Spanish military power to the goal of spreading Christianity. Spanish rivalry with Portugal for Atlantic wealth is context from the same period. The later flow of American silver to Europe shows how far the effects reached.",
        [
          "Common trap",
          "A date or a phrase is not a context. “Europeans wanted to explore” names no development. “After the Reconquista ended in 1492, the Spanish monarchy looked for wealth and converts beyond Iberia” describes one and ties it to the topic.",
        ],
      ],
      "A context is a described development that helps explain the topic, not a date or a vague phrase.",
    ),
    section(
      "americas-before-1491",
      "The Americas before 1491",
      ["GEO", "MIG"],
      [
        "Over thousands of years, Native peoples migrated across and settled North America. By 1491 they had built many distinct societies by adapting to, and reshaping, very different environments. Farmers in the Southwest irrigated maize fields. Peoples of the Northeast lived in permanent villages and combined farming with hunting. Peoples of the Northwest coast drew on the ocean's resources, and many Great Plains and Great Basin societies were largely mobile.",
        "Some societies were large and complex. Cahokia, near present-day St. Louis, was the center of a mound-building Mississippian society that traded across a wide region. In Mesoamerica and the Andes, the Aztec and Inca empires collected tribute from many peoples and governed large cities. Treating all of these peoples as one group hides the diversity that Europeans met.",
        [
          "Cause and effect",
          "Different environments led Native societies to develop different economies. Those economies in turn shaped where people lived, how they were governed, and how they would later respond to Europeans.",
        ],
      ],
      "Native societies were diverse and often complex before contact, and environment helped shape how each one lived.",
    ),
    section(
      "europe-africa-atlantic",
      "Europe, Africa, and the Atlantic",
      ["WOR", "SOC"],
      [
        "In the late 1400s, European monarchies were competing for wealth, power, and religious leadership. Spain's rulers, Ferdinand and Isabella, united their kingdoms and completed the Reconquista in January 1492 by taking Granada. Portugal had already sent ships down the African coast, setting up trading posts for gold and, increasingly, enslaved people. Italian merchants and Muslim intermediaries controlled much of the trade with Asia, which gave Atlantic states a reason to seek other routes.",
        "West African states such as Songhai and Kongo had their own trade networks, and slavery already existed in Africa, the Mediterranean, and Europe. Portuguese and Spanish colonists on Atlantic islands such as Madeira and São Tomé began growing sugar with enslaved African labor. This model later shaped labor in the Americas. The Protestant Reformation, which began in 1517, soon added religious conflict to the rivalry among European states.",
      ],
      "Rivalry among European monarchies and growing Atlantic trade explain why Europeans crossed the ocean when they did.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Within Unit 1",
      title: "From context to cause",
      body: "Topic 1.1 describes the setting. Topic 1.3 asks why European states acted within it, and Topic 1.4 follows what happened when the societies met.",
      transferQuestion:
        "Which one development from this topic would you use as context for the Columbian Exchange, and why?",
      feedback:
        "A strong answer names a specific development, such as Atlantic voyages or the Reconquista, and explains how it led to contact between hemispheres.",
    },
  ],
  sourceIds: ["albert-apush-contextualization-p1", "fiveable-apush-unit-1"],
});

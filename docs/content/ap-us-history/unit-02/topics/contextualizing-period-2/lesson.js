// Original Page One lesson for CED Topic 2.1.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("2.1", {
  summary:
    "The context for European colonization of North America from 1607 to 1754: what had already happened, what each empire wanted, and how environment and rivalry shaped the colonies.",
  minutes: 9,
  goals: [
    "Describe the context before 1607 that helped explain why European colonies were founded in North America.",
    "Compare the economic and imperial goals of Spain, France, the Netherlands, and Britain.",
    "Explain how competition for resources among Europeans and American Indians led to trade and conflict.",
  ],
  bigIdea:
    "Different European empires brought different goals for land and labor to North America, and competition over resources shaped relations with American Indians and with one another.",
  context:
    "A context describes the broader developments before, during, and after the period that help explain an event. Period 2 covers 1607 to 1754, when European colonies took root and grew.",
  sections: [
    section(
      "what-came-before",
      "What had already happened by 1607",
      ["WOR", "MIG"],
      [
        "By 1607, Spain had ruled much of Mexico, the Caribbean, and South America for nearly a century and was bringing silver across the Atlantic. Spanish settlers had founded St. Augustine in Florida in 1565. English leaders, who envied Spain's wealth, had tried and failed to plant a colony at Roanoke in the 1580s, and in 1588 England's navy helped defeat the Spanish Armada, a fleet Spain had sent against England.",
        "Religious conflict also pushed migration. The Protestant Reformation had divided Europe, and in England Puritans wanted to reform the Church of England while Separatists wanted to leave it. In addition, English economic troubles, including a growing population and unemployment, led some people to look for opportunity overseas.",
        [
          "Common trap",
          "Contextualization is not a list of earlier events. It explains how those developments help account for the thing you are studying.",
        ],
      ],
      "Spanish wealth, English rivalry with Spain, religious conflict, and economic pressure helped set the stage for colonies in North America.",
    ),
    section(
      "imperial-goals",
      "Different empires, different goals",
      ["WOR", "WXT"],
      [
        "Spain's goal was to extract wealth from the land. Its institutions subjugated Native populations, converted them to Christianity, and incorporated them, along with enslaved and free Africans, into Spanish colonial society.",
        "France and the Netherlands pursued trade. Few French and Dutch colonists crossed the ocean, and they built economic and diplomatic ties with American Indians to obtain furs and other goods for export to Europe. Britain sent far larger numbers of migrants, men and women, who wanted land, prosperity, religious freedom, and a better life. English colonists focused on agriculture and settled on land taken from Native Americans.",
      ],
      "Spain sought wealth and subjects, France and the Netherlands sought trade, and Britain sought settlement and agriculture.",
    ),
    section(
      "land-labor-and-rivalry",
      "Environment, resources, and rivalry",
      ["GEO", "WOR"],
      [
        "North America offered varied environments, from cold northern forests to warm southern coasts and fertile river valleys. Each region supported different products, such as furs, grain, fish, tobacco, and rice, and those products shaped how colonies earned money and what kind of labor they used.",
        "Europeans competed with one another and with American Indians for resources such as land, furs, and fishing grounds. That competition encouraged industry and trade, but it also led to conflict. American Indian nations joined Europeans as allies, traded with them, and sometimes fought them to protect their own interests.",
      ],
      "Varied environments and competition for resources shaped colonial economies and set the stage for trade and conflict.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 2.2",
      title: "From context to colonies",
      body: "Topic 2.2 follows how Spain, France, the Netherlands, and Britain turned their different goals into different colonies.",
      transferQuestion:
        "How would different imperial goals lead to different relationships with American Indians?",
      feedback:
        "A strong answer links a goal, such as the fur trade or land for farming, to a pattern, such as trade alliances or the taking of land.",
      links: [
        {
          topicId: "apush-1-7",
          sectionId: "effects-of-voyages",
          label: "Review the effects of the voyages",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-2"],
});

// Original Page One lesson for CED Topic 3.1, a context topic.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.1", {
  summary:
    "How the Seven Years' War, British imperial reform, colonial self-government, and Enlightenment ideas set the stage for independence and the first experiments in republican government, 1754–1800.",
  minutes: 10,
  goals: [
    "Describe the situation of the British colonies in 1754: growth, self-government, and rivalry with France.",
    "Explain how British attempts to tighten control collided with colonists' resolve to govern themselves.",
    "Explain how the new nation's experiments in government and its conflicts over land and trade grew out of the Revolution.",
  ],
  bigIdea:
    "Period 3 begins with a war among empires and ends with a new republic, and each stage grew out of the conflict between imperial control and colonial self-government.",
  context:
    "The CED asks you to explain the context in which America gained independence and developed a sense of national identity. For any Period 3 event, ask what came before it, what else was happening at the same time, and how both shaped it.",
  sections: [
    section(
      "colonies-in-1754",
      "The colonies in 1754",
      ["NAT", "GEO", "WOR"],
      [
        "By 1754 the British colonies were growing quickly. They were tied to Britain by trade, print, and English political habits, and they governed themselves through elected assemblies. At the same time, the growing colonial population was expanding into the interior of North America, where it ran into French colonies and American Indian nations that depended on the fur trade and wanted to keep their lands.",
        "The competition among the British, French, and American Indians for economic and political advantage culminated in the Seven Years' War (the French and Indian War), in which Britain defeated France and its Native allies. That victory is the starting point for nearly everything else in Period 3.",
        [
          "Common trap",
          "Context is the broader situation around an event, not the event itself. For the Revolution, the Seven Years' War and Britain's debts are context, while the Boston Tea Party is part of the story being explained.",
        ],
      ],
      "A growing, self-governing set of colonies found itself in a contest with France and Native nations for the interior.",
    ),
    section(
      "control-and-self-government",
      "Imperial control and self-government",
      ["NAT", "PCE", "WXT"],
      [
        "British attempts to assert tighter control over its North American colonies and the colonial resolve to pursue self-government led to a colonial independence movement and the Revolutionary War. After 1763 Britain tried to raise revenue and manage its larger empire. Colonists who were used to governing themselves, and who drew on their rights as British subjects and on the ideas of the Enlightenment, resisted.",
        "Protest moved from petitions and boycotts to armed conflict in 1775 and to a declaration of independence in 1776. The war that followed ended with British recognition of American independence in 1783.",
      ],
      "Tighter British control met colonial determination to govern themselves, and the clash led to independence.",
    ),
    section(
      "building-a-republic",
      "Building a republic",
      ["PCE", "NAT", "MIG"],
      [
        "The American Revolution's democratic and republican ideals inspired new experiments with different forms of government. The states wrote new constitutions, the Articles of Confederation created a weak national government, and the Constitution of 1787 replaced it with a stronger one. In the 1790s disagreements among leaders produced the first political parties.",
        "The new nation also faced conflict over land, borders, and trade. Migration within North America and competition over resources intensified conflicts among peoples and nations, and the continued presence of British and Spanish power challenged the United States to protect its borders and trade. Questions about slavery and the rights of women showed that the ideals of the Revolution were not applied to everyone.",
      ],
      "Revolutionary ideals led to new governments, new parties, and new conflicts over land, trade, and who counted as a citizen.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.2",
      title: "A war that changed the colonies",
      body: "Topic 3.2 follows the Seven Years' War, which removed France from eastern North America and left Britain with debts and new responsibilities.",
      transferQuestion:
        "Which developments before 1754 help explain why colonists expected to govern themselves?",
      feedback:
        "A strong answer names elected assemblies, town meetings, or English legal traditions and explains how they shaped colonial expectations.",
      links: [
        {
          topicId: "apush-2-3",
          sectionId: "self-government",
          label: "Review self-government at a distance",
        },
      ],
    },
  ],
  sourceIds: [],
});

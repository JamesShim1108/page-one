// Original Page One lesson for CED Topic 3.3.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.3", {
  summary:
    "How Parliament's efforts to raise revenue and assert authority after 1763 united the colonists in protest, what arguments they used, and how resistance moved from boycotts to war.",
  minutes: 14,
  goals: [
    "Explain how new British policies after 1763 provoked colonial opposition.",
    "Explain the arguments colonial leaders used to justify resistance.",
    "Explain how popular movements, including laborers, artisans, and women, supported the cause.",
  ],
  bigIdea:
    "New taxes and controls imposed without colonial consent united colonists who defended their rights as British subjects and their traditions of self-rule.",
  context:
    "The CED asks you to explain how British colonial policies regarding North America led to the Revolutionary War. For each policy, ask what Britain wanted, how colonists responded, and what the response showed about their ideas of rights.",
  sections: [
    section(
      "new-policies",
      "New taxes and controls, 1764–1775",
      ["PCE", "WXT", "NAT"],
      [
        "New British efforts to collect taxes without direct colonial representation or consent, and to assert imperial authority in the colonies, began to unite the colonists against perceived and real constraints on their economic activities and political rights. The Sugar Act of 1764 taxed imported sugar and molasses and strengthened enforcement against smuggling. The Stamp Act of 1765 taxed printed materials such as newspapers, legal documents, and playing cards, and it was the first direct tax Parliament placed on the colonists.",
        "Colonial protest, including the Stamp Act Congress and boycotts of British goods, led Parliament to repeal the Stamp Act in 1766. At the same time Parliament passed the Declaratory Act, which claimed the power to make laws for the colonies “in all cases whatsoever.” The Townshend Acts of 1767 placed duties on imports such as glass, paper, paint, and tea, and colonists responded with new boycotts. Most of those duties were repealed in 1770, but the tax on tea remained.",
        "In March 1770 soldiers fired on a Boston crowd and killed five colonists in the Boston Massacre. The Tea Act of 1773 helped the East India Company sell tea cheaply in the colonies, but colonists saw it as a trick to make them accept Parliament's tax, and in December 1773 Bostonians dumped tea into the harbor. Parliament answered with the Coercive Acts of 1774, which closed Boston's port and limited self-government in Massachusetts and which colonists called the Intolerable Acts. The First Continental Congress met in Philadelphia in 1774 and organized a boycott of British goods. In April 1775, fighting at Lexington and Concord began the war.",
      ],
      "After 1763 Parliament tried to raise revenue and tighten control, and each effort met colonial resistance that grew more organized.",
    ),
    section(
      "arguments-for-resistance",
      "Arguments for resistance",
      ["NAT", "PCE", "ARC"],
      [
        "Colonial leaders based their calls for resistance to Britain on arguments about the rights of British subjects, the rights of the individual, local traditions of self-rule, and the ideas of the Enlightenment. They argued that, as British subjects, they could be taxed only by representatives they had chosen, which gave rise to the slogan “no taxation without representation.” They pointed to their own assemblies, which had long taxed and governed the colonies.",
        "British officials answered that Parliament represented all British subjects, including colonists who elected no members, a claim often called virtual representation. Many colonists rejected it. John Dickinson's Letters from a Farmer in Pennsylvania (1767–1768) argued that Parliament could regulate trade but could not tax the colonists to raise revenue. Colonists also drew on Locke's idea that governments exist to protect natural rights and on a tradition that warned that unchecked power tends to corrupt liberty.",
        [
          "Common trap",
          "“No taxation without representation” did not mean most colonists wanted seats in Parliament. Most wanted to be taxed only by their own assemblies.",
        ],
      ],
      "Colonists argued from the rights of British subjects, local self-rule, and Enlightenment ideas that only their own representatives could tax them.",
    ),
    section(
      "popular-movements",
      "Popular movements and shared sacrifice",
      ["SOC", "WXT", "PCE"],
      [
        "The effort for American independence was energized by colonial leaders such as Benjamin Franklin, as well as by popular movements that included the political activism of laborers, artisans, and women. Franklin, who lived in London as a colonial agent, explained colonial objections to Parliament. In port cities, crowds known as the Sons of Liberty pressured stamp distributors to resign. Artisans and merchants joined boycotts, and women formed groups such as the Daughters of Liberty, who spun cloth at home and gave up British tea. Committees of correspondence, organized in the early 1770s, linked towns and colonies so that they could share news and coordinate resistance.",
        "In the face of economic shortages and the British military occupation of some regions, men and women mobilized in large numbers to provide financial and material support to the Patriot movement. Women ran farms and shops while men served in the army, raised money, and made clothing for soldiers.",
      ],
      "Leaders, crowds, artisans, and women all took part in organized resistance, which gave the movement broad support.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.4",
      title: "The ideas behind resistance",
      body: "Colonists justified resistance with ideas about rights and government. Topic 3.4 follows those ideas and the documents that expressed them.",
      transferQuestion:
        "How did colonial leaders use ideas about rights to justify resistance to Parliament?",
      feedback:
        "A strong answer names a specific idea, such as consent of the governed or the rights of British subjects, and explains how it was used against a specific policy.",
      links: [
        {
          topicId: "apush-2-7",
          sectionId: "anglicization-and-resistance",
          label: "Review Anglicization and growing mistrust",
        },
      ],
    },
  ],
  sourceIds: ["declaration-1776"],
});

// Original Page One lesson for CED Topic 3.4.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.4", {
  summary:
    "The Enlightenment, religion, and republican ideas that shaped colonial attitudes toward government and the individual, and how Common Sense and the Declaration of Independence expressed them.",
  minutes: 12,
  goals: [
    "Explain how Enlightenment ideas and religion changed colonial attitudes about government and the individual.",
    "Explain what republicanism and natural rights meant to Revolutionary leaders.",
    "Explain how Common Sense and the Declaration of Independence expressed these ideas.",
  ],
  bigIdea:
    "The ideals behind the Revolution grew out of new beliefs about politics, religion, and society that had been developing through the 18th century.",
  context:
    "The CED asks you to explain how and why colonial attitudes about government and the individual changed before the Revolution. Pair each idea with a document or event where colonists put it to use, and note that these documents shaped later American ideals as well.",
  sections: [
    section(
      "enlightenment-and-religion",
      "Enlightenment ideas and religion",
      ["ARC", "NAT"],
      [
        "Enlightenment ideas and philosophy inspired many American political thinkers to emphasize individual talent over hereditary privilege, while religion strengthened Americans' view of themselves as a people blessed with liberty. Enlightenment writers argued that reason could be used to understand nature and society and that government existed to serve people rather than the other way around. John Locke's argument that people have natural rights to life, liberty, and property, and that governments rest on the consent of the governed, had long been read in the colonies, and Montesquieu's ideas about dividing power among separate branches also influenced American thinkers.",
        "Religion supported these ideas. The Great Awakening had taught many colonists to question established authority in matters of faith, and many ministers preached that Americans were a people blessed with liberty who should defend it. Both traditions encouraged colonists to value merit and conscience over birth and rank.",
      ],
      "Reason and natural rights, together with religious ideas of liberty, led colonists to value talent over birth and to question inherited authority.",
    ),
    section(
      "republicanism-and-natural-rights",
      "Republicanism and natural rights",
      ["PCE", "NAT"],
      [
        "The colonists' belief in the superiority of republican forms of government based on the natural rights of the people was central to the Revolutionary cause. In a republic, power comes from the people and is exercised by representatives, rather than being held by a monarch or a hereditary aristocracy. Republican thinkers believed that a republic depended on the civic virtue of its citizens, meaning their willingness to put the public good ahead of private interest, and they feared that power concentrated in a few hands would corrupt liberty.",
        "These beliefs led colonists to see British actions after 1763 not only as unwise but as a threat to their liberty. They also helped explain why the new states chose republican governments rather than monarchies after independence.",
        [
          "Common trap",
          "A republic is not the same as a democracy. Revolutionary leaders wanted government by representatives chosen by the people, and many feared that unchecked popular majorities could also threaten liberty.",
        ],
      ],
      "Republicanism placed power in the people and their representatives and relied on civic virtue and fear of concentrated power.",
    ),
    section(
      "common-sense-and-the-declaration",
      "Common Sense and the Declaration of Independence",
      ["ARC", "NAT", "PCE"],
      [
        "The belief in republican government found expression in Thomas Paine's Common Sense and the Declaration of Independence. Paine's pamphlet, published in January 1776, attacked monarchy and hereditary rule, argued that it was absurd for a continent to be governed by an island, and called for independence in plain language that ordinary readers could follow. It was widely read and helped turn colonial opinion away from reconciliation with Britain.",
        "The Second Continental Congress adopted the Declaration of Independence on July 4, 1776. Thomas Jefferson was the principal author. The Declaration stated that all men are created equal and have unalienable rights, that governments derive their powers from the consent of the governed, and that people may change or abolish a government that violates those rights. It then listed grievances against King George III.",
        "The ideas in these documents resonated throughout American history, shaping Americans' understanding of the ideals on which the nation was based. Later reformers appealed to the Declaration's language of equality and rights to demand that the nation live up to its principles.",
      ],
      "Common Sense and the Declaration turned republican and natural-rights ideas into a public case for independence that Americans would cite for generations.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.5",
      title: "From ideas to war",
      body: "Ideas alone did not win independence. Topic 3.5 follows the war and the reasons the Patriot cause succeeded.",
      transferQuestion:
        "How did the Declaration of Independence link colonial grievances to natural-rights ideas?",
      feedback:
        "A strong answer connects a specific grievance, such as taxation without consent, to the claim that governments rest on the consent of the governed.",
      links: [
        {
          topicId: "apush-3-3",
          sectionId: "arguments-for-resistance",
          label: "Review the arguments for resistance",
        },
      ],
    },
  ],
  sourceIds: ["paine-1776", "declaration-1776"],
});

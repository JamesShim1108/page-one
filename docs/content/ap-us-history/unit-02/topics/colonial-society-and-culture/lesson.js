// Original Page One lesson for CED Topic 2.7.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("2.7", {
  summary:
    "How religious and ethnic diversity, the Great Awakening, Enlightenment ideas, print, and Anglicization shaped colonial culture and prepared colonists to question British control.",
  minutes: 12,
  goals: [
    "Explain how religious and ethnic diversity, the Great Awakening, and the Enlightenment shaped colonial society.",
    "Explain how Anglicization, trade, and print culture tied the colonies to Britain and to each other.",
    "Explain why colonists became dissatisfied with British policies and what ideas supported resistance.",
  ],
  bigIdea:
    "Diversity, religious revival, Enlightenment ideas, and English political habits bound the colonies to Britain and to each other, even as they gave colonists reasons to resist imperial control.",
  context:
    "The CED asks you to explain how the movement of people and ideas across the Atlantic shaped American culture and how colonists viewed their relationship with Britain. Notice what pulled the colonies closer to Britain and what pushed them away.",
  sections: [
    section(
      "pluralism-and-awakening",
      "Pluralism and the Great Awakening",
      ["ARC", "MIG", "NAT"],
      [
        "The presence of different European religious and ethnic groups, including English Anglicans and Puritans, Dutch Reformed, German Lutherans, Scots-Irish Presbyterians, Quakers, and Catholics, contributed to a significant degree of pluralism and intellectual exchange in the colonies. No single church could claim the loyalty of everyone.",
        "In the 1730s and 1740s the First Great Awakening, a wave of Protestant revivals, swept the colonies. Preachers such as Jonathan Edwards and George Whitefield urged listeners to seek a personal religious experience. Edwards's 1741 sermon \"Sinners in the Hands of an Angry God\" warned that sinners depended on God's mercy. The Awakening divided congregations between supporters and critics, challenged established ministers, increased religious independence and diversity, and gave colonists a shared experience across colonial boundaries.",
        [
          "Common trap",
          "The Great Awakening was a religious movement, not a political one, but it taught colonists to question established authority and to organize on their own.",
        ],
      ],
      "Religious and ethnic pluralism, deepened by the Great Awakening, gave colonists more religious independence and common experience.",
    ),
    section(
      "enlightenment-and-print",
      "Enlightenment ideas and print culture",
      ["ARC", "NAT"],
      [
        "The European Enlightenment, an intellectual movement that stressed reason, observation, and natural rights, also spread to the colonies. Benjamin Franklin conducted scientific experiments and helped found the American Philosophical Society in 1743. Colonial readers studied the writings of English thinkers, including John Locke, who argued that government rested on the consent of the governed and existed to protect natural rights.",
        "A transatlantic print culture linked the colonies to Britain and to one another. Colonial newspapers, almanacs, and pamphlets spread news and ideas, and in 1735 a New York jury acquitted the printer John Peter Zenger of libel after he criticized the royal governor, which strengthened ideas about a free press.",
      ],
      "Enlightenment ideas and a growing print culture connected colonists to Europe and to each other.",
    ),
    section(
      "anglicization-and-resistance",
      "Anglicization and growing mistrust",
      ["NAT", "PCE"],
      [
        "Over time the British colonies experienced a gradual Anglicization, developing autonomous political communities based on English models, with elected assemblies, English law, and English customs. Intercolonial commercial ties, the print culture, and the spread of Protestant evangelicalism also helped bind the colonies to Britain and one another.",
        "At the same time, the goals and interests of European leaders and colonists diverged, leading to a growing mistrust on both sides of the Atlantic. Colonists, especially in British North America, were dissatisfied over issues such as territorial settlements, frontier defense, self-rule, and trade. Their resistance drew on local experience of self-government, evolving ideas of liberty, the political thought of the Enlightenment, greater religious independence and diversity, and a belief that the imperial system was corrupt.",
      ],
      "Colonists became more English in their institutions, yet their experiences and ideas also gave them grounds to resist imperial control.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Unit 3",
      title: "From connection to conflict",
      body: "Unit 3 begins in 1754, when war with France changed the relationship between Britain and its colonies. The habits of self-government and the ideas described here shaped how colonists responded.",
      transferQuestion:
        "Which of the developments in this topic would most help colonists organize resistance to Britain, and why?",
      feedback:
        "A strong answer picks one development, such as local self-government, print culture, or the Great Awakening, and explains how it taught colonists to question authority or communicate with each other.",
      links: [
        {
          topicId: "apush-2-3",
          sectionId: "self-government",
          label: "Review self-government at a distance",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-2", "edwards-1741"],
});

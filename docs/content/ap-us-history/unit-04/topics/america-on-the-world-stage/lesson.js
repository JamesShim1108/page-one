// Original Page One lesson for CED Topic 4.4.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.4", {
  summary:
    "How the War of 1812, border agreements with Britain and Spain, and the Monroe Doctrine expressed a growing American effort to claim territory, protect trade, and assert influence in the Western Hemisphere.",
  minutes: 13,
  goals: [
    "Explain the causes and effects of the War of 1812.",
    "Explain how treaties and agreements fixed U.S. borders in North America.",
    "Explain the purposes and significance of the Monroe Doctrine.",
  ],
  bigIdea:
    "The United States tried to create an independent global presence by claiming territory across the continent, defending its trade, and warning European powers away from the Western Hemisphere.",
  context:
    "The CED asks you to explain how and why American foreign policy developed and expanded. Pair each action with its aim: security, trade, or territory.",
  sections: [
    section(
      "war-of-1812",
      "The War of 1812",
      ["WOR", "GEO", "PCE"],
      [
        "Struggling to create an independent global presence, the United States sought to claim territory throughout the North American continent and promote foreign trade. Britain and France continued to interfere with American shipping in their wars, and Britain impressed sailors from American ships, which angered many Americans. In the West, settlers blamed the British for supporting Native resistance. The Shawnee leader Tecumseh and his brother Tenskwatawa built a confederacy of Native nations to resist the loss of land, and U.S. forces under William Henry Harrison defeated them at Tippecanoe in 1811.",
        "A group of young congressmen from the South and West, called War Hawks, pushed for war, and Congress declared war on Britain in June 1812. The fighting included the British burning of Washington in 1814, the defense of Baltimore that inspired the “Star-Spangled Banner,” and Andrew Jackson's victory at New Orleans in January 1815, which took place after the peace treaty had been signed at Ghent in December 1814. The treaty restored the situation before the war.",
        "The war's effects were large even though it ended without territorial change. It strengthened national feeling, weakened the Federalist Party after its Hartford Convention criticized the war, destroyed Tecumseh's confederacy and weakened Native resistance east of the Mississippi, and encouraged American manufacturing by cutting off British imports.",
      ],
      "The war grew out of conflicts over trade and the frontier, and it ended in a draw that strengthened national feeling and weakened Native resistance.",
    ),
    section(
      "diplomacy-and-borders",
      "Diplomacy and borders",
      ["GEO", "WOR"],
      [
        "After the war the United States settled its borders through diplomacy. The Rush–Bagot Agreement of 1817 limited naval forces on the Great Lakes, and the Convention of 1818 set the northern boundary between the Louisiana Purchase and British Canada at the 49th parallel and provided for joint American and British occupation of the Oregon Country.",
        "In the Adams–Onís Treaty of 1819, Spain gave Florida to the United States and accepted a boundary that ran to the Pacific, which gave the United States a claim on the Pacific coast. These agreements reduced the British and Spanish presence on the nation's borders without war.",
      ],
      "Treaties with Britain and Spain fixed the northern boundary, gave the United States Florida, and extended its claims to the Pacific.",
    ),
    section(
      "monroe-doctrine",
      "The Monroe Doctrine",
      ["WOR", "PCE"],
      [
        "The U.S. government sought influence and control over the Western Hemisphere through a variety of means, including military actions, American Indian removal, and diplomatic efforts such as the Monroe Doctrine. In the 1810s and 1820s, most of Spain's colonies in Latin America won independence, and European monarchies talked of helping Spain regain them. Britain, which wanted to keep trade with the new nations, proposed a joint statement, but Secretary of State John Quincy Adams urged the United States to act on its own.",
        "In his annual message of December 1823, President James Monroe declared that the United States would regard any attempt by a European power to extend its system to any part of the Western Hemisphere as dangerous to the nation's peace and safety. He also said that the United States would not interfere with existing European colonies and would not take part in European wars. The Monroe Doctrine had little force at the time, because the United States lacked the strength to enforce it, and British naval power protected the new nations. Later presidents invoked it to justify American influence in the hemisphere.",
        [
          "Common trap",
          "The Monroe Doctrine was a statement of policy and not a treaty or an alliance. In 1823 it was effective mainly because Britain's navy also opposed European intervention.",
        ],
      ],
      "The Monroe Doctrine warned Europe against intervening in the Western Hemisphere, and it later became a foundation of American foreign policy.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.5",
      title: "The economy behind the foreign policy",
      body: "The wish for trade and territory had a domestic side. Topic 4.5 follows the transformation of production and transportation.",
      transferQuestion:
        "How did the War of 1812 contribute to the growth of American manufacturing?",
      feedback:
        "A strong answer notes that the war and the earlier embargo cut off British imports, which encouraged Americans to invest in domestic factories.",
      links: [
        {
          topicId: "apush-4-3",
          sectionId: "american-system",
          label: "Review the American System",
        },
      ],
    },
  ],
  sourceIds: ["monroe-1823"],
});

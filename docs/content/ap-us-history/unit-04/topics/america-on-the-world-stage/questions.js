// Original practice questions for Topic 4.4. q-numbered items are topic practice;
// t-numbered items belong to the Unit 4 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("4.4", [
  {
    id: "q01",
    s: "war-of-1812",
    sub: "1.A",
    kc: ["KC-4.3.I"],
    q: "Which of the following was a cause of the War of 1812?",
    right: "British impressment of American sailors and interference with American trade",
    at: 1,
    wrong: [
      [
        "Spain's refusal to sell Florida to the United States after the Louisiana Purchase",
        "Florida was transferred in 1819, and Spain was not the opponent in 1812.",
      ],
      [
        "A French attack on American ports along the Atlantic coast in the summer of 1812",
        "The war was fought against Britain.",
      ],
      [
        "A British plan to take the Louisiana Territory from the United States by force",
        "Britain had not claimed Louisiana.",
      ],
    ],
    why: "Britain seized sailors and ships during its wars with France, and many Americans also blamed Britain for aiding Native resistance in the West.",
    d: "The Florida choice is close because Florida was a diplomatic issue in these years, but the war was fought over British actions.",
  },
  {
    id: "q02",
    s: "war-of-1812",
    sub: "1.B",
    kc: ["KC-4.3.I"],
    q: "The Treaty of Ghent (1814) ended the War of 1812 by",
    right: "restoring the borders and conditions that had existed before the war began",
    at: 2,
    wrong: [
      [
        "requiring Britain to stop impressing American sailors and to pay for damage to shipping",
        "The treaty did not mention impressment or damages.",
      ],
      [
        "giving Canada to the United States in exchange for an end of the British blockade",
        "The treaty did not transfer Canada.",
      ],
      [
        "dividing the Northwest Territory between the British and the Native confederacy",
        "No such division was made.",
      ],
    ],
    why: "Neither side won territory, and the treaty restored the conditions before the war.",
    d: "The impressment choice is close because impressment was a cause of the war, but the treaty did not address it.",
  },
  {
    id: "q03",
    s: "war-of-1812",
    sub: "1.B",
    kc: ["KC-4.3.I"],
    q: "Which of the following was an effect of the War of 1812 on American politics?",
    right: "The Federalist Party declined after its Hartford Convention seemed disloyal",
    at: 0,
    wrong: [
      [
        "The Federalist Party gained power in Congress by supporting the war effort",
        "The Federalists had opposed the war.",
      ],
      [
        "The Democratic-Republican Party broke apart and was replaced by a party of war veterans",
        "The Democratic-Republicans dominated afterward.",
      ],
      [
        "Congress ended political parties by passing a constitutional amendment in 1815",
        "No amendment ended parties.",
      ],
    ],
    why: "Federalists had opposed the war, and their Hartford Convention was widely viewed as unpatriotic, which left the party weak.",
    d: "The gain-power choice is close because the party was strong in New England before the war, but its antiwar stance hurt it.",
  },
  {
    id: "q04",
    s: "diplomacy-and-borders",
    sub: "1.A",
    kc: ["KC-4.3.I"],
    q: "The Adams–Onís Treaty of 1819",
    right:
      "transferred Florida from Spain to the United States and extended a boundary to the Pacific",
    at: 3,
    wrong: [
      [
        "added the Oregon Country to the United States and fixed the border with Canada",
        "The Oregon boundary was settled in 1846.",
      ],
      [
        "ended Spanish rule in Mexico and recognized the independence of its provinces",
        "Mexico gained independence in 1821 through its own revolution.",
      ],
      [
        "gave Spain control of the Mississippi River in return for the use of New Orleans",
        "Spain gave up claims, and the treaty did not return the Mississippi.",
      ],
    ],
    why: "Spain gave up Florida and accepted a boundary that gave the United States a claim to the Pacific coast.",
    d: "The Oregon choice is close because the treaty touched the Pacific, but the Oregon dispute was settled with Britain later.",
  },
  {
    id: "q05",
    s: "monroe-doctrine",
    sub: "1.A",
    kc: ["KC-4.3.I.A.ii"],
    q: "In the Monroe Doctrine, the United States declared that",
    right:
      "it would oppose European efforts to extend their political systems into the Western Hemisphere",
    at: 1,
    wrong: [
      [
        "it would form an alliance with Britain to defend the new nations of Latin America",
        "The United States acted on its own and not in an alliance with Britain.",
      ],
      [
        "it would take control of the existing European colonies in the Western Hemisphere",
        "Monroe said the United States would not interfere with existing colonies.",
      ],
      [
        "it would enter European wars whenever democracies were threatened by monarchies",
        "Monroe said the United States would stay out of European wars.",
      ],
    ],
    why: "Monroe warned European powers not to extend their systems to the Americas and promised that the United States would stay out of Europe's wars.",
    d: "The Britain alliance choice is close because Britain had proposed a joint statement, but Adams persuaded Monroe to act alone.",
  },
  {
    id: "q06",
    s: "monroe-doctrine",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.3.I.A.ii"],
    q: "Which of the following best explains why the United States issued the Monroe Doctrine in 1823?",
    right:
      "European monarchies discussed helping Spain regain its Latin American colonies",
    at: 2,
    wrong: [
      [
        "The United States wanted to annex the new nations of Latin America as new states",
        "The Doctrine concerned European intervention, not annexation.",
      ],
      [
        "Britain had declared war on the United States to win control of the Caribbean",
        "Britain and the United States were not at war.",
      ],
      [
        "Congress had demanded that the navy build a base on the island of Cuba",
        "No such demand drove the Doctrine.",
      ],
    ],
    why: "Most of Spain's colonies had won independence, and the United States wanted to keep European monarchies from regaining them.",
    d: "The annexation choice is close because American expansion was a theme of the period, but the Doctrine defended independence.",
  },
  {
    id: "q07",
    s: "diplomacy-and-borders",
    sub: "4.A",
    kc: ["KC-4.3.I"],
    q: "The Rush–Bagot Agreement (1817) and the Convention of 1818 are best understood in the context of which of the following?",
    right: "A postwar effort to settle disputes with Britain peacefully",
    at: 0,
    wrong: [
      [
        "A preparation for a second war with Britain over the borders of Canada",
        "The agreements reduced the danger of conflict.",
      ],
      [
        "An American effort to annex British Canada through a treaty with Parliament",
        "The agreements did not transfer Canada.",
      ],
      [
        "The need to end the Embargo Act, which had closed American ports in 1807",
        "The embargo had ended in 1809.",
      ],
    ],
    why: "After the war, both nations chose to limit naval forces on the Great Lakes and fix the northern boundary.",
    d: "The second war choice is close because the agreements followed a war, but they lowered tensions.",
  },
  {
    id: "q08",
    s: "monroe-doctrine",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-4.3.I"],
    q: "Which of the following reflects a continuity in United States foreign policy from Washington's presidency to the Monroe Doctrine?",
    right: "A wish to avoid entanglement in European political conflicts",
    at: 1,
    wrong: [
      [
        "A commitment to join Britain or France whenever either went to war",
        "American leaders chose neutrality and not commitments to join either power.",
      ],
      [
        "A refusal to claim new territory in North America or in the Caribbean",
        "The nation claimed more territory over time.",
      ],
      [
        "An unwillingness to defend American trade with force",
        "The United States used force when it saw its trade threatened, as in 1812.",
      ],
    ],
    why: "Washington's Farewell Address and Monroe's message both urged the nation to stay out of Europe's quarrels.",
    d: "The join-either-power choice is close because the nation had treaties with France, but leaders later avoided such commitments.",
  },
  {
    id: "t01",
    s: "monroe-doctrine",
    sub: "2.B",
    kc: ["KC-4.3.I.A.ii"],
    q: "Which of the following was Monroe's primary purpose in the second paragraph of the excerpt?",
    right:
      "To warn European powers against extending their systems to independent nations in the hemisphere",
    at: 2,
    wrong: [
      [
        "To ask Britain for an alliance against the European monarchies that wished to restore Spain's rule",
        "Monroe announced a policy that the United States would follow on its own.",
      ],
      [
        "To declare that the United States would take possession of the remaining European colonies",
        "He said the United States would not interfere with existing colonies.",
      ],
      [
        "To announce that the United States would send troops to defend the new nations in battle",
        "He did not promise troops.",
      ],
    ],
    why: "Monroe says that any European attempt to oppress or control the independent governments would be viewed as unfriendly to the United States.",
    d: "The alliance choice is close because Britain had proposed joint action, but the excerpt shows a unilateral warning.",
    stim: excerpts.monroeDoctrine,
  },
  {
    id: "t02",
    s: "monroe-doctrine",
    sub: "3.A",
    kc: ["KC-4.3.I.A.ii"],
    q: "Which of the following statements about United States policy is best supported by the excerpt?",
    right:
      "The United States would leave existing colonies alone but resist European control of independent nations",
    at: 0,
    wrong: [
      [
        "The United States would act to remove all European colonies from the Western Hemisphere",
        "Monroe said that the United States had not interfered and would not interfere with existing colonies.",
      ],
      [
        "The United States regarded the independence of the Latin American nations as a danger",
        "He said the United States had acknowledged their independence on just principles.",
      ],
      [
        "The United States would take part in the wars of Europe to defend the cause of freedom",
        "The first paragraph states that the United States had never taken part in those wars.",
      ],
    ],
    why: "Monroe separates existing colonies, which the United States will leave alone, from independent governments, which it will defend against European control.",
    d: "The remove-all-colonies choice is close because the Doctrine opposed new colonization, but it accepted the colonies that already existed.",
    stim: excerpts.monroeDoctrine,
  },
  {
    id: "t03",
    s: "monroe-doctrine",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.3.I.A.ii"],
    q: "Which of the following developments most directly led to the policy that Monroe announces in the excerpt?",
    right:
      "The independence won by Spain's former colonies and talk of restoring them to Spain",
    at: 1,
    wrong: [
      [
        "The Louisiana Purchase, which had given the United States control of the Mississippi",
        "That purchase was in 1803 and concerned North American territory.",
      ],
      [
        "The Treaty of Ghent, which had ended the war and returned the borders of 1812",
        "The treaty settled the war with Britain, and the Doctrine concerned Latin America.",
      ],
      [
        "The Missouri Compromise, which had set the boundary between slave and free territory",
        "That compromise concerned slavery and not European colonies.",
      ],
    ],
    why: "The independence of Latin American nations and the fear of European intervention led the United States to declare its hemispheric policy.",
    d: "The Louisiana choice is close because it also expanded American influence, but the Doctrine responded to events in Latin America.",
    stim: excerpts.monroeDoctrine,
  },
]);

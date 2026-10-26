// Original practice questions for Topic 2.5. q-numbered items are topic practice;
// t-numbered items belong to the Unit 2 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("2.5", [
  {
    id: "q01",
    s: "alliances-and-accommodation",
    sub: "1.A",
    kc: ["KC-2.1.III.C"],
    q: "Which of the following best describes relations between European colonies and American Indian nations in the 1600s?",
    right:
      "Both cooperation and conflict, as colonies allied with and armed some Native nations while competing with others",
    at: 1,
    wrong: [
      [
        "Constant conflict, because no European colony formed an alliance with any Native nation",
        "French, Dutch, British, and Spanish colonies all formed alliances with Native groups.",
      ],
      [
        "Uniform cooperation, because Native nations accepted European rule in exchange for protection",
        "Native nations frequently resisted European control, and wars such as Metacom's War followed.",
      ],
      [
        "Strict neutrality, because Native nations avoided involvement in the rivalries of European empires",
        "Native nations often sought European allies against their own rivals.",
      ],
    ],
    why: "Alliances, trade, and accommodation existed beside competition for land and resources, and Europeans and Native nations used each other in their own rivalries.",
    d: "Cooperation and conflict both occurred, so each wrong choice describes only half of the pattern or denies the alliances.",
  },
  {
    id: "q02",
    s: "alliances-and-accommodation",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.III.C"],
    q: "Which of the following best explains why many American Indian nations sought alliances with Europeans?",
    right: "They hoped to gain trade goods and support against rival Native nations",
    at: 2,
    wrong: [
      [
        "They had been defeated in war and were required by treaty to ally with the nearest colony",
        "Most alliances were chosen by Native nations to advance their own interests.",
      ],
      [
        "They wanted to adopt European religion and government as soon as colonists arrived",
        "Native nations generally pursued alliances for trade, protection, and power rather than to adopt European institutions.",
      ],
      [
        "They sought to end trade with other Native nations and trade only with European merchants",
        "Native nations continued trading with one another.",
      ],
    ],
    why: "Native nations acted for their own interests, and an alliance could bring trade goods, weapons, and help against enemies.",
    d: "Some Native nations were defeated, but the question concerns why many sought alliances, and the main reasons were trade and power.",
  },
  {
    id: "q03",
    s: "pueblo-revolt",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1.III.E", "KC-2.1.III.F"],
    q: "Which of the following was a similarity between Metacom's War and the Pueblo Revolt?",
    right:
      "Both were Native resistance to colonial demands for land, labor, or religious change",
    at: 0,
    wrong: [
      [
        "Both ended with Native nations regaining permanent control of the lands they had held",
        "Native power ended in southern New England after Metacom's War, and the Spanish returned to New Mexico.",
      ],
      [
        "Both were fought mainly with the help of French allies who supplied weapons to Native leaders",
        "French allies were not central to either conflict.",
      ],
      [
        "Both were fought mainly over control of the fur trade between Native nations and Dutch merchants",
        "Neither conflict was mainly about the fur trade or the Dutch.",
      ],
    ],
    why: "Metacom's war responded to English pressure on land, law, and religion, and the Pueblo Revolt responded to Spanish demands for labor and religious change.",
    d: "The first wrong choice is partly true of the Pueblo case, but neither conflict gave Native nations permanent control.",
  },
  {
    id: "q04",
    s: "metacoms-war",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.III.E"],
    q: "Which of the following best explains the outbreak of Metacom's War in 1675?",
    right:
      "English towns were growing and colonists were pressing on Native land, law, and religion",
    at: 3,
    wrong: [
      [
        "Spanish raids from Florida had weakened New England's defenses against its Native neighbors",
        "Spanish raids from Florida were not a cause of the war in New England.",
      ],
      [
        "The Wampanoag had allied with the Dutch against the Massachusetts Bay Colony",
        "The war grew out of English pressure on Native peoples and did not begin with a Dutch alliance.",
      ],
      [
        "The English had tried to take over the fur trade of the Iroquois Confederacy",
        "The war was fought in New England between English colonists and several Native nations.",
      ],
    ],
    why: "Expanding English towns, English law, and pressure to adopt Christianity led Metacom and other Native leaders to resist.",
    d: "The Iroquois did trade with the English, but that trade was in a different region and not the cause of Metacom's War.",
  },
  {
    id: "q05",
    s: "metacoms-war",
    sub: "1.B",
    kc: ["KC-2.1.III.E"],
    q: "Which of the following was a long-term result of Metacom's War?",
    right:
      "Native power in southern New England was broken, and many captives were enslaved or sold",
    at: 1,
    wrong: [
      [
        "Native nations regained control of the lands they had held before the war began",
        "The war weakened Native nations in southern New England.",
      ],
      [
        "England withdrew its colonists from New England after the destruction of several towns",
        "The colonists rebuilt their towns, and English settlement continued.",
      ],
      [
        "The English and the Wampanoag formed the Covenant Chain to keep peace in the region",
        "The Covenant Chain was an alliance between the Iroquois and the English.",
      ],
    ],
    why: "The English victory ended Native power in southern New England, and many Native captives were enslaved or sold.",
    d: "The Covenant Chain is a real alliance from the same era, but it involved the Iroquois, not the Wampanoag.",
  },
  {
    id: "q06",
    s: "pueblo-revolt",
    sub: "1.A",
    kc: ["KC-2.1.III.F"],
    q: "In 1680, the Pueblo Revolt",
    right:
      "drove the Spanish out of New Mexico, and they did not return for over a decade",
    at: 3,
    wrong: [
      [
        "ended Spanish rule in North America for good and opened the Southwest to the English",
        "The Spanish returned in 1692 and 1693, and Spain kept the region.",
      ],
      [
        "was a conflict between the Pueblo and French traders who had entered New Mexico",
        "The revolt was against Spanish rule.",
      ],
      [
        "led Spain to abandon its missions and to stop all efforts to convert Native peoples",
        "Spain continued missions after returning, though it tolerated some Pueblo practices.",
      ],
    ],
    why: "Pueblo communities rose together, killed hundreds of colonists and priests, and expelled the Spanish until their return in 1692 and 1693.",
    d: "The near miss exaggerates the revolt's permanence, since the Spanish returned and kept New Mexico.",
  },
  {
    id: "q07",
    s: "pueblo-revolt",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.III.F"],
    q: "Which of the following best explains why Spain accommodated some Pueblo religious practices after 1692?",
    right:
      "Pueblo resistance showed that Spain could not rule by suppressing Native culture and demanding forced labor",
    at: 2,
    wrong: [
      [
        "Spanish priests no longer believed that conversion to Christianity was important",
        "Spain continued to seek converts, though it changed its methods.",
      ],
      [
        "England had defeated Spain in the Southwest and required Spain to protect Native religious practices afterward",
        "England did not defeat Spain in the Southwest at this time.",
      ],
      [
        "Pueblo leaders had agreed to join the Spanish Empire in return for protection from the French",
        "The Spanish accommodation followed the Pueblo Revolt, and it was not a bargain for French protection.",
      ],
    ],
    why: "The revolt showed the cost of harsh rule, so Spain reduced forced labor demands and tolerated some Pueblo practices.",
    d: "Spain's goals remained religious, but its methods changed, so the first wrong choice misstates the change.",
  },
  {
    id: "q08",
    s: "alliances-and-accommodation",
    sub: "1.B",
    kc: ["KC-2.1.III.C"],
    q: "The Covenant Chain was",
    right:
      "an alliance between the Iroquois Confederacy and English colonists in the late 1600s",
    at: 0,
    wrong: [
      [
        "a treaty that divided newly discovered lands in the Americas between Spain and Portugal",
        "That describes the Treaty of Tordesillas in 1494.",
      ],
      [
        "a network of French forts along the St. Lawrence River and the Great Lakes for the fur trade",
        "The Covenant Chain involved the English and the Iroquois, not the French.",
      ],
      [
        "an agreement among New England colonies to defend themselves against the Wampanoag",
        "The Covenant Chain was a diplomatic alliance with the Iroquois.",
      ],
    ],
    why: "The Covenant Chain linked the Iroquois and the English in a diplomatic alliance.",
    d: "The New England agreement is a plausible alliance from the same era, but the Covenant Chain involved the Iroquois.",
  },
  {
    id: "t01",
    s: "metacoms-war",
    sub: "2.A",
    kc: ["KC-2.1.III.E"],
    q: "Which of the following best describes the point of view of the author of the excerpt?",
    right:
      "A Puritan colonist who experienced the war as an attack on her family and her community",
    at: 1,
    wrong: [
      [
        "A Wampanoag leader who defended his people's land against the spread of English settlement",
        "The author describes the attackers as enemies and is not a Wampanoag leader.",
      ],
      [
        "A colonial official who prepared a neutral report on the causes of the war",
        "The author describes events that happened to her and does not write as a neutral official.",
      ],
      [
        "A French trader who watched the war while selling goods to both sides",
        "The author lived in Lancaster, Massachusetts, and was captured in the attack.",
      ],
    ],
    why: "The author, Mary Rowlandson, was a colonist who lived in Lancaster, and she describes the attack from the viewpoint of a victim.",
    d: "The neutral-report choice is close because the passage records events, but its language shows a personal and hostile point of view.",
    stim: excerpts.rowlandsonLancaster,
  },
  {
    id: "t02",
    s: "metacoms-war",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.III.E"],
    q: "The events described in the excerpt were most directly a result of which of the following?",
    right:
      "Conflict between New England colonists and Native nations over land and authority",
    at: 2,
    wrong: [
      [
        "A dispute between colonial assemblies and Parliament over taxes on colonial trade",
        "That dispute belongs to a later period, and the attackers in the excerpt were Native nations.",
      ],
      [
        "Competition between French and English fur traders for control of the Great Lakes",
        "The attack took place in Massachusetts and was tied to the war in New England.",
      ],
      [
        "Efforts by Spain to extend its missions into New England from Florida",
        "Spain was not involved in the war in New England.",
      ],
    ],
    why: "The attack on Lancaster occurred during Metacom's War, which grew from English pressure on Native land, law, and religion.",
    d: "The dispute with Parliament is a conflict between colonists and Britain, whereas the excerpt describes an attack by Native nations.",
    stim: excerpts.rowlandsonLancaster,
  },
  {
    id: "t03",
    s: "metacoms-war",
    sub: "2.C",
    kc: ["KC-2.1.III.E"],
    q: "Which of the following is a limitation of the excerpt as evidence of how Native peoples understood the war?",
    right:
      "It was written by a colonist who describes the attackers from her own point of view",
    at: 3,
    wrong: [
      [
        "It was written long after the war by a historian who relied on secondhand accounts",
        "The author was an eyewitness whose narrative was published in 1682.",
      ],
      [
        "It describes events that occurred outside New England and cannot show the war's effects",
        "The excerpt describes an attack in Massachusetts.",
      ],
      [
        "It was written by a person who did not witness the events that she describes",
        "The author describes an attack on her own town and her own house.",
      ],
    ],
    why: "Rowlandson recorded what she saw and felt as a colonist and captive, so the excerpt shows her view and not that of the Native attackers.",
    d: "The eyewitness status is a strength of the source, so the wrong choices claim a weakness that the source does not have.",
    stim: excerpts.rowlandsonLancaster,
  },
]);

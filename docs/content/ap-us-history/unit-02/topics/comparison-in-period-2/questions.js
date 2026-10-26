// Original practice questions for Topic 2.8, a reasoning topic on comparison.
import { topicBank } from "../../../kit.js";

export const bank = topicBank("2.8", [
  {
    id: "q01",
    s: "comparison-basics",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1"],
    q: "A student wants to write a strong comparison of Spanish and English colonization. Which approach would be most effective?",
    right:
      "Choose a criterion such as labor, then explain a similarity, a difference, and the reasons for them",
    at: 2,
    wrong: [
      [
        "Describe everything known about Spanish colonies, then everything known about English colonies",
        "Describing each subject separately is description and not comparison.",
      ],
      [
        "List the founding dates of colonies in each empire and arrange them in chronological order",
        "A list of dates is not a comparison.",
      ],
      [
        "Argue that one empire's colonies were better than the other's and give examples of success",
        "A comparison explains similarities and differences instead of judging which is better.",
      ],
    ],
    why: "A strong comparison uses a criterion, names a similarity and a difference, and explains why they existed.",
    d: "Describing each empire in turn feels thorough, but it never connects the two.",
  },
  {
    id: "q02",
    s: "comparison-basics",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1"],
    q: "Why does a strong comparison include a criterion?",
    right:
      "It ensures that both developments are measured against the same standard of comparison",
    at: 0,
    wrong: [
      [
        "It allows the writer to avoid discussing differences between the two developments being compared",
        "A comparison must include differences as well as similarities.",
      ],
      [
        "It requires the writer to discuss only the causes of each development and not the effects",
        "A criterion can be any shared feature, such as labor or religion.",
      ],
      [
        "It limits the comparison to events that happened in a single year or a single colony",
        "A criterion does not limit a comparison to one year or place.",
      ],
    ],
    why: "A criterion, such as labor or religion, gives both subjects a common standard so that their similarities and differences can be judged fairly.",
    d: "A criterion focuses the comparison, but it does not allow the writer to skip differences.",
  },
  {
    id: "q03",
    s: "comparing-empires",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1.I.A", "KC-2.1.I.B"],
    q: "Which of the following is a difference between French and Spanish relations with American Indians?",
    right:
      "The French relied on trade alliances and intermarriage, while the Spanish subjugated and converted Native peoples",
    at: 0,
    wrong: [
      [
        "The French subjugated and converted Native peoples, while the Spanish relied on trade alliances and intermarriage",
        "This reverses the two empires' methods.",
      ],
      [
        "The French avoided contact with Native peoples, while the Spanish traded with them for furs and deerskins",
        "The French depended on contact with Native peoples for furs.",
      ],
      [
        "The French forced Native peoples to work in mines, while the Spanish never required Native labor",
        "The Spanish used Native labor extensively.",
      ],
    ],
    why: "French colonies depended on trade alliances and intermarriage for furs, while Spanish colonies built institutions based on subjugation and conversion.",
    d: "The reversed statement uses the right ideas for the wrong empires.",
  },
  {
    id: "q04",
    s: "comparing-empires",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.I"],
    q: "Which of the following best explains why relations with American Indians differed in French and English colonies?",
    right:
      "Colonies built around the fur trade needed Native partners, while farming colonies needed Native land",
    at: 1,
    wrong: [
      [
        "French colonists were Catholic and English colonists were Protestant, so they could not trade together",
        "Religion did not prevent trade, and the main difference lay in each colony's economic goals.",
      ],
      [
        "The French government banned its colonists from settling on farms, while England required them to farm",
        "No government rule explains the difference.",
      ],
      [
        "English colonists lived among Native peoples in shared villages, while French colonists lived apart",
        "English colonists lived separately from Native peoples.",
      ],
    ],
    why: "Colonists who relied on furs depended on Native partners, but colonists who relied on farming wanted Native land.",
    d: "Religion differed between the empires, but the economic purpose of each colony better explains its relations with Native peoples.",
  },
  {
    id: "q05",
    s: "comparing-regions",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1.II", "KC-2.2"],
    q: "Which of the following was a similarity among all of the British colonial regions?",
    right: "Each developed elected assemblies and took part in trade across the Atlantic",
    at: 0,
    wrong: [
      [
        "Each relied mainly on enslaved Africans for its labor and exported a single crop",
        "New England and the middle colonies relied mainly on family farms.",
      ],
      [
        "Each was governed directly by Parliament through officials chosen and paid in London",
        "The colonies developed their own assemblies and local government.",
      ],
      [
        "Each was settled almost entirely by English Puritans seeking religious uniformity",
        "The colonies were settled by many groups, and the middle colonies were diverse.",
      ],
    ],
    why: "All of the regions built elected assemblies, traded across the Atlantic, and became more English over time.",
    d: "Slavery existed in every colony to some degree, but it was not the main labor system in all of them.",
  },
  {
    id: "q06",
    s: "comparing-regions",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.II"],
    q: "Which of the following best explains why plantation colonies relied on large enslaved workforces while New England did not?",
    right:
      "Long growing seasons favored labor-intensive cash crops, while rocky soil favored family farms",
    at: 3,
    wrong: [
      [
        "New England colonists were forbidden by law from owning enslaved people, but plantation colonists were not",
        "Slavery was legal in New England.",
      ],
      [
        "New England colonists had a steady supply of indentured servants, but plantation colonists had none",
        "Planters in the Chesapeake also used indentured servants before turning to enslaved Africans.",
      ],
      [
        "Plantation colonists lived in towns with town meetings that encouraged them to rely on enslaved labor",
        "Town meetings were a New England institution, and plantation colonists lived on dispersed estates.",
      ],
    ],
    why: "Environment shaped the economies, since a long growing season made large cash-crop plantations profitable and New England's soil favored smaller farms.",
    d: "Slavery existed in New England, but its farms were too small to use many enslaved laborers.",
  },
  {
    id: "q07",
    s: "comparing-regions",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1.II.B", "KC-2.1.II.C"],
    q: "Which of the following was a difference between New England and the middle colonies?",
    right:
      "The middle colonies were more ethnically and religiously diverse and exported grain",
    at: 3,
    wrong: [
      [
        "New England was more ethnically and religiously diverse and exported tobacco and rice",
        "This reverses the regions' diversity and ignores their actual exports.",
      ],
      [
        "The middle colonies were settled mostly by English Puritans and had no elected assemblies",
        "Puritans settled New England, and the middle colonies had assemblies.",
      ],
      [
        "New England relied on enslaved Africans for most labor, while the middle colonies did not",
        "New England's small farms used relatively few enslaved laborers.",
      ],
    ],
    why: "Fertile land and trade attracted many kinds of settlers to the middle colonies, which exported wheat and flour, while New England was more uniformly English and Puritan.",
    d: "The reversed statement is wrong on both diversity and exports.",
  },
  {
    id: "q08",
    s: "comparing-empires",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1.I.B", "KC-2.1.I.C"],
    q: "Which of the following is a similarity between the British and Dutch colonies in North America?",
    right:
      "Both were founded with the backing of private companies that hoped to earn profits",
    at: 2,
    wrong: [
      [
        "Both were settled mainly by large numbers of families who farmed land taken from Native peoples",
        "The Dutch colony had relatively few Europeans and relied on trade.",
      ],
      [
        "Both were governed mainly by missionaries who sought to convert Native peoples to Christianity",
        "Neither colony was governed mainly by missionaries.",
      ],
      [
        "Both relied mainly on a Native labor draft similar to the encomienda system used by the Spanish",
        "The encomienda was a Spanish system.",
      ],
    ],
    why: "The Virginia Company financed Jamestown, and the Dutch West India Company organized New Netherland, so private companies backed both.",
    d: "The family-farm choice describes the English pattern but not the Dutch one.",
  },
]);

// Original practice questions for Topic 2.3. q-numbered items are topic practice;
// t-numbered items belong to the Unit 2 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("2.3", [
  {
    id: "q01",
    s: "tobacco-colonies",
    sub: "1.A",
    kc: ["KC-2.1.II.A"],
    q: "The Chesapeake colonies relied on indentured servants at first primarily because",
    right:
      "tobacco required a great deal of labor, and English migrants would work for a set term in exchange for passage",
    at: 2,
    wrong: [
      [
        "Parliament forbade colonists from owning enslaved Africans until the end of the 1600s",
        "No such ban existed, and colonists turned to enslaved labor as servants became scarcer.",
      ],
      [
        "the Powhatan Confederacy agreed by treaty to supply workers for English tobacco farms",
        "Native peoples were not treaty suppliers of labor for Chesapeake tobacco.",
      ],
      [
        "tobacco could be grown on small plots without much labor, and servants were needed only for defense",
        "Tobacco was a labor-intensive crop, which is why planters needed so many workers.",
      ],
    ],
    why: "Tobacco was labor-intensive, and contracts of indenture gave planters a workforce of migrants who paid for passage with years of work.",
    d: "Slavery did become common in the Chesapeake, but it replaced indentured servitude gradually, so the early workforce was mostly servants.",
  },
  {
    id: "q02",
    s: "tobacco-colonies",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.II.A"],
    q: "Which of the following was a long-term effect of the Chesapeake colonies' dependence on tobacco?",
    right:
      "Planters sought a permanent workforce, which led them increasingly toward enslaved Africans",
    at: 0,
    wrong: [
      [
        "Planters established town meetings to govern local affairs in small farming communities",
        "Town meetings were a New England institution, not a result of tobacco farming.",
      ],
      [
        "Planters shifted to a mixed economy of fishing, shipbuilding, and trade with the West Indies",
        "A mixed economy of commerce developed in New England rather than the Chesapeake.",
      ],
      [
        "Planters developed a flourishing export economy based on wheat and flour sold to Europe",
        "Cereal crops were the base of the middle colonies' economy.",
      ],
    ],
    why: "Tobacco needed large amounts of labor, and as fewer servants arrived, planters turned to enslaved Africans as a permanent workforce.",
    d: "Each wrong choice describes a real feature of another region, so the question depends on matching the effect to the Chesapeake.",
  },
  {
    id: "q03",
    s: "new-england",
    sub: "1.B",
    kc: ["KC-2.1.II.B"],
    q: "Which of the following best describes the economy of New England in the 1600s and early 1700s?",
    right: "A mixed economy of family farming, fishing, shipbuilding, lumber, and trade",
    at: 3,
    wrong: [
      [
        "A plantation economy that depended on a single cash crop grown by enslaved Africans",
        "That describes the southern Atlantic coast and the West Indies.",
      ],
      [
        "An economy built on the fur trade and on alliances with French and Native partners",
        "New England's economy was based on farming and commerce, and its colonists were English.",
      ],
      [
        "A grain-exporting economy that employed mostly indentured servants on large estates",
        "New England farms were family-sized, and wheat exports were a feature of the middle colonies.",
      ],
    ],
    why: "Rocky soil and short growing seasons led colonists to combine small farms with fishing, lumber, shipbuilding, and trade.",
    d: "The grain-export choice is close because New England farmed, but its family farms did not support large exports of wheat.",
  },
  {
    id: "q04",
    s: "new-england",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1.II.A", "KC-2.1.II.B"],
    q: "Which of the following was a difference between New England and the Chesapeake in the 1600s?",
    right:
      "New England migrants often came as families, while early Chesapeake settlers were mostly male servants",
    at: 1,
    wrong: [
      [
        "New England colonists exported tobacco to Europe, while Chesapeake colonists exported fish and lumber",
        "This reverses the two regions' main products.",
      ],
      [
        "New England colonies lacked representative government, while Chesapeake colonies elected assemblies",
        "New England colonies had town meetings and elected legislatures.",
      ],
      [
        "New England depended on enslaved Africans for most labor, while the Chesapeake depended on family farms",
        "This reverses the labor systems; New England used few enslaved workers.",
      ],
    ],
    why: "Puritans and others often migrated in families, which produced a balanced population, while the Chesapeake's early servants were mostly men.",
    d: "The reversed statements trade the regions' products and labor systems, so the question depends on remembering which region did which.",
  },
  {
    id: "q05",
    s: "middle-colonies",
    sub: "1.A",
    kc: ["KC-2.1.II.C"],
    q: "The middle colonies were distinctive among the British colonies because they",
    right:
      "attracted settlers of many European backgrounds and religions and exported grain",
    at: 0,
    wrong: [
      [
        "were settled almost entirely by English Puritans who sought to enforce religious uniformity",
        "Puritans settled New England, and the middle colonies were notably diverse.",
      ],
      [
        "depended on rice and indigo plantations that were worked by enslaved Africans",
        "That describes the southern Atlantic coast, not the middle colonies.",
      ],
      [
        "had no elected assemblies because the Crown governed through appointed officials alone",
        "The middle colonies, like the others, developed elected assemblies.",
      ],
    ],
    why: "Fertile land and trade drew English, Dutch, German, Scots-Irish, and other settlers, and farmers exported wheat and flour.",
    d: "Because the middle colonies had some enslaved workers, the plantation choice is tempting, but their economy rested on grain.",
  },
  {
    id: "q06",
    s: "plantation-colonies",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.II.D"],
    q: "Which of the following best explains why plantation economies developed in South Carolina and the British West Indies?",
    right:
      "Long growing seasons made cash crops such as rice and sugar profitable on large estates worked by enslaved labor",
    at: 3,
    wrong: [
      [
        "Short growing seasons forced colonists to rely on one cash crop that grew in cool weather",
        "These regions had long growing seasons, not short ones.",
      ],
      [
        "Parliament required settlers in every southern colony to establish plantations for export",
        "Colonists chose crops based on conditions and profit, and Parliament did not order plantations.",
      ],
      [
        "American Indian nations in the region offered workers to planters in exchange for manufactured goods",
        "Plantations depended mainly on enslaved Africans rather than Native workers from trade agreements.",
      ],
    ],
    why: "A long growing season supported cash crops that were valuable in Europe, and planters relied on enslaved Africans to grow them.",
    d: "Parliament did regulate trade, but the choice of plantation crops followed climate and profit.",
  },
  {
    id: "q07",
    s: "self-government",
    sub: "4.B",
    kc: ["KC-2.1.II.E"],
    q: "Which of the following best explains why the British colonies developed self-governing institutions?",
    right:
      "Distance from Britain and its lax early attention left colonists free to manage local affairs",
    at: 1,
    wrong: [
      [
        "The Navigation Acts required each colony to create an assembly that would regulate trade",
        "The Navigation Acts regulated trade and did not order colonial assemblies.",
      ],
      [
        "The Crown promised colonists the same voting rights as English nobles in exchange for settlement",
        "Voting was limited, and the Crown made no such promise.",
      ],
      [
        "Frontier wars with France required colonists to raise armies through newly formed assemblies",
        "Assemblies like the House of Burgesses began in 1619, well before the large wars with France.",
      ],
    ],
    why: "The Atlantic made close supervision difficult, so colonists built assemblies and town meetings to govern themselves.",
    d: "Defense did lead assemblies to raise money later, but they began long before the wars the near miss describes.",
  },
  {
    id: "q08",
    s: "middle-colonies",
    sub: "1.B",
    kc: ["KC-2.1.II.C"],
    q: "William Penn founded Pennsylvania in 1681 as",
    right: "a refuge for Quakers that also welcomed settlers of many backgrounds",
    at: 2,
    wrong: [
      [
        "a trading post for Dutch fur traders on the Delaware River",
        "Dutch trading posts were part of New Netherland, not Penn's colony.",
      ],
      [
        "a Puritan colony intended to enforce a single established church and Puritan worship",
        "Penn was a Quaker, and his colony was known for tolerance.",
      ],
      [
        "a plantation colony intended to export rice and indigo to Europe",
        "Pennsylvania's farmers raised wheat, and rice and indigo came from farther south.",
      ],
    ],
    why: "Penn offered Quakers a place to worship and welcomed migrants from many places, which made Pennsylvania diverse.",
    d: "The Puritan choice is close because both groups were religious dissenters, but Penn's colony was open and tolerant.",
  },
  {
    id: "t01",
    s: "tobacco-colonies",
    sub: "3.A",
    kc: ["KC-2.1.II"],
    q: "Which of the following claims about the British colonies is best supported by the information in the table?",
    right: "The regions relied on different exports and different sources of labor",
    at: 1,
    wrong: [
      [
        "Tobacco was the main export of every region listed in the table",
        "The table lists tobacco only for the Chesapeake.",
      ],
      [
        "Enslaved Africans were the main source of labor in every region listed in the table",
        "The table lists family farms and hired workers for New England and the middle colonies.",
      ],
      [
        "Only the middle colonies and the Lower South exported goods to markets outside the colonies",
        "The table lists exports for all four regions.",
      ],
    ],
    why: "The table shows tobacco, fish and lumber, grain, and rice and indigo, produced by different labor systems.",
    d: "The near miss misreads the table, which lists exports for every region.",
    stim: excerpts.originalRegionsTable,
  },
  {
    id: "t02",
    s: "new-england",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.1.II"],
    q: "Which of the following best explains the differences in main exports among the regions shown in the table?",
    right:
      "Differences in climate, soil, and growing seasons made different products profitable in each region",
    at: 3,
    wrong: [
      [
        "Parliament assigned each region a product to export under the Navigation Acts",
        "The Navigation Acts regulated where certain goods could be sold but did not assign regions their products.",
      ],
      [
        "American Indian nations in each region controlled which products colonists could export",
        "Native nations did not decide what colonists exported.",
      ],
      [
        "Each region's assembly limited its colonists to a single export in order to avoid competition",
        "Assemblies did not limit colonists to one export, and New England and the middle colonies exported several goods.",
      ],
    ],
    why: "Long growing seasons favored tobacco, rice, and indigo, while rocky soil in New England and fertile grain land in the middle colonies shaped their exports.",
    d: "The Navigation Acts did name certain goods, but they did not decide which region produced what.",
    stim: excerpts.originalRegionsTable,
  },
  {
    id: "t03",
    s: "plantation-colonies",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.1.II.A", "KC-2.1.II.D"],
    q: "Which of the following is a similarity between the Chesapeake and the Lower South as shown in the table?",
    right: "Both relied on enslaved Africans to produce crops for export",
    at: 2,
    wrong: [
      [
        "Both exported fish, lumber, and ships to markets in Europe and the West Indies",
        "The table lists tobacco for the Chesapeake and rice and indigo for the Lower South.",
      ],
      [
        "Both depended mainly on family farms with a few hired workers",
        "The table lists plantations and enslaved labor for these regions.",
      ],
      [
        "Both had societies shaped by settlers of many ethnic and religious backgrounds",
        "The table gives that description for the middle colonies.",
      ],
    ],
    why: "The table lists enslaved Africans as the labor force in the Lower South and as the eventual labor force in the Chesapeake.",
    d: "The family-farm choice describes New England and the middle colonies, which is why it fails for these two regions.",
    stim: excerpts.originalRegionsTable,
  },
]);

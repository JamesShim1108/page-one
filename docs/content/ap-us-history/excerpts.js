// Primary-source excerpts and Page One practice passages used as stimuli in
// AP U.S. History questions, SAQs, and DBQs. One record per source; questions
// import it so a correction reaches every use. The rules are the same as World
// History's excerpts.js (see handbook/ap-practice.md and handbook/ap-us-history.md):
//
// - Text quotations (`medium` omitted) copy a public-domain edition exactly and
//   register their ID prefix in scripts/lib/excerpt-sources.mjs.
// - Images (`medium: "image"`) are cartoons, posters, photographs, paintings,
//   or maps listed in this course's assets.js, with `alt`, `description`, and an
//   archive `citation` such as a Library of Congress call number.
// - Data tables (`medium: "table"`) give `caption`, `columns`, and `rows`.
// - Every record names its CED key concept or source record in `source` and a
//   `ced_review` of "pending" or "complete".
// - Practice passages (`sourceType: "original"`) are written by Page One to
//   summarize how historians describe a development. They are labeled as such
//   when shown and are never presented as quotations.
//
// Paired sources (two historians, or two primary voices) are two records used
// together in one set's stimulusBlocks.

export const excerpts = {
  originalNativeSocieties: {
    id: "original-native-societies",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.2, KC-1.1.I: Different native societies adapted to and transformed their environments through innovations in agriculture, resource use, and social structure",
    ced_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe Native American societies before European contact",
    text: "Before 1491, Native peoples across North America lived in societies shaped by the land they used. In the Southwest, the spread of maize from present-day Mexico supported farming villages, irrigation, and growing differences in social roles. On the Great Plains and in the Great Basin, where water was scarce, many groups moved with the seasons to hunt, gather, and trade. In the Northeast and the Mississippi River Valley, societies combined farming with hunting and gathering and built permanent villages. Along the Pacific Northwest coast, communities lived well on fish and other resources of the ocean without relying on farming.\n\nHistorians note that these societies did more than adjust to their surroundings. Farmers cleared and burned land, built irrigation systems, and carried crops from one region to another, so Native peoples also reshaped their environments.",
  },
  originalVoyagesTable: {
    id: "original-voyages-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 1.3, KC-1.2.I.A: European efforts to explore and conquer the New World stemmed from a search for wealth, competition, and a desire to spread Christianity",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from standard histories of European exploration",
    caption: "Selected European voyages of exploration, 1488–1534",
    columns: ["Year", "Explorer", "Sponsoring kingdom", "Region reached"],
    rows: [
      ["1488", "Bartolomeu Dias", "Portugal", "Southern tip of Africa"],
      ["1492", "Christopher Columbus", "Spain", "Caribbean islands"],
      ["1497", "John Cabot", "England", "Coast of North America"],
      ["1498", "Vasco da Gama", "Portugal", "India"],
      ["1524", "Giovanni da Verrazzano", "France", "Atlantic coast of North America"],
      ["1534", "Jacques Cartier", "France", "Gulf of St. Lawrence"],
    ],
    citation: "Compiled by Page One; see the Topic 1.3 reading.",
  },
  originalColumbianExchange: {
    id: "original-columbian-exchange",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.4, KC-1.2.II.A: Spanish conquest was accompanied by deadly epidemics and by the introduction of crops and animals",
    ced_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe the Columbian Exchange",
    text: "The Columbian Exchange did not affect the two sides of the Atlantic equally. In Europe, potatoes and maize gave farmers more food from the same land, and silver from mines in Mexico and the Andes enriched monarchs and merchants. In the Americas, smallpox and other Old World diseases spread among peoples with no earlier exposure to them, and in many regions most of the population died within a few generations.\n\nHistorians differ about how much weight to give disease in explaining Spanish conquest. Some argue that epidemics did more than weapons to make conquest possible. Others emphasize that Spanish forces also relied on Indigenous allies who opposed Aztec rule, and on rivalries that already divided Native peoples. Most agree, however, that the Exchange transformed the Americas more suddenly than it transformed Europe.",
  },
  originalSpanishLabor: {
    id: "original-spanish-labor",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.5, KC-1.2.II.B, KC-1.2.II.C, and KC-1.2.II.D: the encomienda, enslaved African labor, and the Spanish caste system",
    ced_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe labor and rank in the Spanish empire",
    text: "By the late 1500s, the silver mines of Potosí in the Andes and Zacatecas in Mexico were among the most valuable in the world. Spanish officials adapted the labor draft of the Inca, called the mita, to supply thousands of Native workers to the mines, and colonists who held encomienda grants received labor and tribute from Native villages. As epidemics reduced Native populations, colonists imported growing numbers of enslaved Africans to work on sugar plantations and in mines.\n\nSpanish officials also ranked the empire's people by ancestry. Peninsulares, born in Spain, held the highest offices, and criollos, born in the Americas, held wealth and land but were largely shut out of the top positions. Mestizos, mulattoes, Native peoples, and enslaved Africans held lower ranks. A person's rank affected taxes, occupations, and legal rights.",
  },
  harriotDisease: {
    id: "harriot-disease",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 1.4, KC-1.2.II.A, and Topic 1.6, KC-1.2.III.A: epidemics among Native peoples and the beliefs each side formed about the other",
    ced_review: "pending",
    attribution:
      "Thomas Harriot, English scientist and member of the 1585 Roanoke expedition, A Briefe and True Report of the New Found Land of Virginia, 1588",
    citation:
      "Thomas Harriot, A Briefe and True Report of the New Found Land of Virginia (London, 1588), section on the nature and manners of the people. Project Gutenberg eBook #4247.",
    note: "Spelling is as printed in 1588: “vs” means “us,” “euerie” means “every,” and “wee” means “we.” “Wiroans” was Harriot’s word for a chief.",
    text: "There was no towne where we had any subtile deuise practised against vs, we leauing it vnpunished or not reuenged (because wee sought by all meanes possible to win them by gentlenesse) but that within a few dayes after our departure from euerie such towne, the people began to die very fast, and many in short space; in some townes about twentie, in some fourtie, in some sixtie, & in one sixe score, which in trueth was very manie in respect of their numbers. . . . The disease also so strange, that they neither knew what it was, nor how to cure it; the like by the report of the oldest men in the countrey neuer happened before, time out of minde.\n\nInsomuch that when some of the inhabitantes which were our friends & especially the 'Wiroans Wingina' had obserued such effects in foure or fiue towns to follow their wicked practises, they were preswaded that it was the worke of our God through our meanes, and that wee by him might kil and slai whom we would without weapons and not come neere them.",
  },
  harriotReligion: {
    id: "harriot-religion",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 1.6, KC-1.2.III.A: mutual misunderstandings and the beliefs each side formed about the other",
    ced_review: "pending",
    attribution:
      "Thomas Harriot, English scientist and member of the 1585 Roanoke expedition, A Briefe and True Report of the New Found Land of Virginia, 1588",
    citation:
      "Thomas Harriot, A Briefe and True Report of the New Found Land of Virginia (London, 1588), section on the nature and manners of the people. Project Gutenberg eBook #4247.",
    note: "Spelling is as printed in 1588: “vs” means “us,” “vnto” means “unto,” and “woorkes” means “works.”",
    text: "Most thinges they sawe with vs, as Mathematicall instruments, sea compasses, the vertue of the loadstone in drawing yron, a perspectiue glasse whereby was shewed manie strange sightes, burning glasses, wildefire woorkes, gunnes, bookes, writing and reading, spring clocks that seeme to goe of themselues, and manie other thinges that wee had, were so straunge vnto them, and so farre exceeded their capacities to comprehend the reason and meanes how they should be made and done, that they thought they were rather the works of gods then of men, or at the leastwise they had bin giuen and taught vs of the gods. Which made manie of them to haue such opinions of vs, as that if they knew not the trueth of god and religion already, it was rather to be had from vs, whom God so specially loued then from a people that were so simple, as they found themselues to be in comparison of vs. Whereupon greater credite was giuen vnto that we spake of concerning such matters.",
  },
  originalConquestDisease: {
    id: "original-conquest-disease",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.7 and Topic 1.4, KC-1.2.II.A: epidemics devastated Native populations during Spanish conquest",
    ced_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing historians who emphasize disease in the Spanish conquest",
    text: "Interpretation A. The conquest of the Americas succeeded above all because of disease. Smallpox and other Old World illnesses spread among Native peoples who had no immunity, and in many regions most of the population died within a few generations. Epidemics broke the armies and governments of the Aztec and Inca Empires, so small Spanish forces could take advantage of societies already in crisis.",
  },
  originalConquestAllies: {
    id: "original-conquest-allies",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.7 and Topic 1.6, KC-1.2.III.B: Native peoples acted through alliance, negotiation, and resistance",
    ced_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing historians who emphasize Native allies in the Spanish conquest",
    text: "Interpretation B. The conquest of the Americas depended on Native allies. Cortés's few hundred soldiers could not have taken Tenochtitlan without thousands of Tlaxcalan and other warriors who wanted to end Aztec tribute demands. Conquest was also a long process in which Native leaders negotiated, fought, and formed alliances to pursue their own goals.",
  },
  originalColoniesTable: {
    id: "original-colonies-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 2.2, KC-2.1.I: Spanish, French, Dutch, and British colonizers had different economic and imperial goals that shaped their colonies",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from standard histories of European colonization",
    caption: "Selected European settlements in North America, 1565–1630",
    columns: ["Year", "Settlement", "Founding empire", "Main purpose"],
    rows: [
      [
        "1565",
        "St. Augustine, Florida",
        "Spain",
        "Military base to defend Spanish claims",
      ],
      [
        "1607",
        "Jamestown, Virginia",
        "England",
        "Profit for the investors of a joint-stock company",
      ],
      ["1608", "Quebec", "France", "Trading post for the fur trade"],
      ["1610", "Santa Fe, New Mexico", "Spain", "Royal government and Catholic missions"],
      ["1620", "Plymouth, Massachusetts", "England", "Religious freedom for Separatists"],
      ["1625", "New Amsterdam", "Netherlands", "Trading post for the fur trade"],
      [
        "1630",
        "Boston, Massachusetts Bay",
        "England",
        "Religious community for Puritans",
      ],
    ],
    citation: "Compiled by Page One; see the Topic 2.2 reading.",
  },
  originalRegionsTable: {
    id: "original-regions-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 2.3, KC-2.1.II: regional differences in the British colonies reflected environmental, economic, cultural, and demographic factors",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from standard histories of the British colonies",
    caption: "British colonial regions, c. 1700–1750",
    columns: ["Region", "Main exports", "Main source of labor", "Society"],
    rows: [
      [
        "Chesapeake",
        "Tobacco",
        "Indentured servants, then enslaved Africans",
        "Scattered plantations and farms",
      ],
      [
        "New England",
        "Fish, lumber, and ships",
        "Family farms, with some hired and enslaved workers",
        "Small towns with town meetings",
      ],
      [
        "Middle colonies",
        "Wheat and flour",
        "Family farms, with hired, indentured, and enslaved workers",
        "Settlers of many ethnic and religious backgrounds",
      ],
      [
        "Lower South",
        "Rice and indigo",
        "Enslaved Africans",
        "Large plantations, with enslaved people often a majority",
      ],
    ],
    citation: "Compiled by Page One; see the Topic 2.3 reading.",
  },
  originalMercantilism: {
    id: "original-mercantilism",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 2.4, KC-2.2.I.C: the British government tried to incorporate its colonies into an imperial structure to pursue mercantilist aims, but enforcement was erratic",
    ced_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe mercantilism and the Navigation Acts",
    text: "English leaders in the 1600s believed that a nation grew stronger when it exported more than it imported, and they expected colonies to help by supplying raw materials and buying English manufactured goods. Historians call this approach mercantilism.\n\nTo put these ideas into practice, Parliament passed a series of Navigation Acts beginning in 1651 and 1660. The laws required that colonial goods travel on English or colonial ships and that valuable products, such as tobacco and sugar, be shipped only to England or other English colonies. Colonial merchants and shipbuilders gained protected markets, but planters and farmers had fewer places to sell their goods and often paid more for imports.\n\nBritain was far from North America and was often busy with problems at home and in Europe, so enforcement was uneven. Many colonists ignored the rules or smuggled goods, and attempts to tighten control, such as the Dominion of New England in the 1680s, met resistance.",
  },
  rowlandsonLancaster: {
    id: "rowlandson-lancaster",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 2.5, KC-2.1.III.E: British conflicts with American Indians over land, resources, and political boundaries led to military confrontations such as Metacom's War",
    ced_review: "pending",
    attribution:
      "Mary Rowlandson, a Puritan colonist captured in the attack on Lancaster, Massachusetts, during Metacom's War, in her narrative first published in 1682",
    citation:
      "Mary Rowlandson, The Sovereignty and Goodness of God, or Narrative of the Captivity and Restoration of Mrs. Mary Rowlandson (1682). Project Gutenberg eBook #851.",
    note: "Rowlandson dated the attack by the older English calendar, which began the year in March. By the modern calendar it took place in February 1676.",
    text: "On the tenth of February 1675, came the Indians with great numbers upon Lancaster: their first coming was about sunrising; hearing the noise of some guns, we looked out; several houses were burning, and the smoke ascending to heaven. There were five persons taken in one house; the father, and the mother and a sucking child, they knocked on the head; the other two they took and carried away alive. . . . Thus these murderous wretches went on, burning, and destroying before them.\n\nAt length they came and beset our own house, and quickly it was the dolefulest day that ever mine eyes saw.",
  },
  equianoMiddlePassage: {
    id: "equiano-middle-passage",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 2.6, KC-2.2.II.A and KC-2.2.II.C: the Atlantic slave trade and the dehumanizing nature of slavery",
    ced_review: "pending",
    attribution:
      "Olaudah Equiano, a formerly enslaved man living in Britain, in his autobiography published in London in 1789 during the campaign to end the slave trade",
    citation:
      "Olaudah Equiano, The Interesting Narrative of the Life of Olaudah Equiano, or Gustavus Vassa, the African (London, 1789), chapter 2. Standard Ebooks edition.",
    text: "The first object which saluted my eyes when I arrived on the coast was the sea, and a slave ship, which was then riding at anchor, and waiting for its cargo. These filled me with astonishment, which was soon converted into terror when I was carried on board. I was immediately handled and tossed up to see if I were sound by some of the crew; and I was now persuaded that I had gotten into a world of bad spirits, and that they were going to kill me. . . . When I looked round the ship too and saw a large furnace or copper boiling, and a multitude of black people of every description chained together, every one of their countenances expressing dejection and sorrow, I no longer doubted of my fate; and, quite overpowered with horror and anguish, I fell motionless on the deck and fainted.",
  },
  originalSlaveryEconomic: {
    id: "original-slavery-economic",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 2.6, KC-2.2.II.B: as chattel slavery became the dominant labor system, new laws created a strict racial system",
    ced_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing historians who emphasize planters' demand for labor in the origins of racial slavery",
    text: "Interpretation A. Racial slavery took hold in the English colonies mainly because of labor needs. In the early 1600s, Chesapeake planters depended on English indentured servants. As fewer servants arrived from England, and as more of those who did arrive survived to demand land of their own, planters turned to enslaved Africans, who could be held for life and whose children could be held as well. Colonial legislatures then wrote slave codes that protected this investment by making slavery lifelong, hereditary, and tied to race. On this view, planters' demand for a permanent workforce produced racial slavery, and racial ideas were used to justify it afterward.",
  },
  originalSlaveryPrejudice: {
    id: "original-slavery-prejudice",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 2.6, KC-2.2.II.B: as chattel slavery became the dominant labor system, new laws created a strict racial system",
    ced_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing historians who emphasize English attitudes toward Africans in the origins of racial slavery",
    text: "Interpretation B. Racial slavery took hold in the English colonies mainly because of English attitudes toward Africans. Before slavery was widespread, English colonists already described Africans as different and inferior because of their color, their religion, and their origins. Courts in the 1640s sometimes punished Africans more harshly than white servants, and later laws banned marriage between the groups and made slavery pass from mother to child. On this view, prejudice made it easy for planters to hold Africans in permanent bondage, and the laws that made slavery racial grew out of those beliefs, not only out of economic demand.",
  },
  edwardsEnfield: {
    id: "edwards-enfield",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 2.7, KC-2.2.I.A: religious pluralism and intellectual exchange, later enhanced by the First Great Awakening",
    ced_review: "pending",
    attribution:
      "Jonathan Edwards, a Congregationalist minister, in a sermon preached to his congregation at Enfield, Connecticut, in July 1741, during the Great Awakening",
    citation:
      "Jonathan Edwards, Sinners in the Hands of an Angry God (1741), in Selected Sermons of Jonathan Edwards, ed. H. Norman Gardiner (New York: Macmillan, 1904). Project Gutenberg eBook #34632.",
    text: "The God that holds you over the pit of hell, much as one holds a spider or some loathsome insect over the fire, abhors you, and is dreadfully provoked; his wrath towards you burns like fire; he looks upon you as worthy of nothing else, but to be cast into the fire; he is of purer eyes than to bear to have you in his sight; you are ten thousand times so abominable in his eyes, as the most hateful and venomous serpent is in ours. You have offended him infinitely more than ever a stubborn rebel did his prince: and yet it is nothing but his hand that holds you from falling into the fire every moment.",
  },
};

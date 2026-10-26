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
  originalSevenYearsWar: {
    id: "original-seven-years-war",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.2, KC-3.1.I.B and KC-3.1.I.C: Britain's victory brought territory at great expense, and attempts to restrict western settlement generated colonial opposition",
    ced_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe the results of the Seven Years' War in North America",
    text: "The Seven Years' War ended in 1763 with a great British victory. In the Treaty of Paris, France gave up Canada and its claims east of the Mississippi River, and Spain gave Florida to Britain. The victory removed the French threat to the colonies, but it left Britain deeply in debt and responsible for a much larger empire.\n\nBritish officials decided that the colonies should help pay for their own defense. They also wanted to avoid new wars with American Indians, many of whom had fought beside the French and now feared the loss of their land. In the Proclamation of 1763, the Crown forbade colonists from settling west of the Appalachian Mountains. Many colonists, who had expected to move onto western lands after the war, resented the order, and many ignored it.",
  },
  declarationGrievances: {
    id: "declaration-grievances",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 3.3, KC-3.1.II.A and KC-3.1.II.B: colonial leaders based resistance on the rights of British subjects and objected to taxes imposed without colonial consent",
    ced_review: "pending",
    attribution:
      "The Declaration of Independence, adopted by the Second Continental Congress on July 4, 1776, from the list of complaints against King George III",
    citation:
      "The Declaration of Independence (1776), list of grievances. Project Gutenberg eBook #16780.",
    note: "“Others” refers to Parliament, whose authority over the colonies the Declaration rejects. “Pretended” means “claimed.”",
    text: "He has combined with others to subject us to a jurisdiction foreign to our constitution, and unacknowledged by our laws; giving his Assent to their Acts of pretended legislation: For quartering large bodies of armed troops among us: For protecting them, by a mock Trial, from Punishment for any Murders which they should commit on the Inhabitants of these States: For cutting off our Trade with all parts of the world: For imposing taxes on us without our Consent: For depriving us, in many cases, of the benefits of Trial by Jury:",
  },
  paineDistance: {
    id: "paine-distance",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 3.4, KC-3.2.I.B: the colonists' belief in republican forms of government found expression in Thomas Paine's Common Sense",
    ced_review: "pending",
    attribution:
      "Thomas Paine, an English-born writer living in Philadelphia, in the pamphlet Common Sense, published in January 1776",
    citation:
      "Thomas Paine, Common Sense (Philadelphia, 1776), “Thoughts on the Present State of American Affairs.” Project Gutenberg eBook #147.",
    note: "“The continent” is the thirteen British colonies in North America, and “the island” is Great Britain.",
    text: "As to government matters, it is not in the power of Britain to do this continent justice: The business of it will soon be too weighty, and intricate, to be managed with any tolerable degree of convenience, by a power so distant from us, and so very ignorant of us; for if they cannot conquer us, they cannot govern us. To be always running three or four thousand miles with a tale or a petition, waiting four or five months for an answer, which when obtained requires five or six more to explain it in, will in a few years be looked upon as folly and childishness . . . .\n\nSmall islands not capable of protecting themselves, are the proper objects for kingdoms to take under their care; but there is something very absurd, in supposing a continent to be perpetually governed by an island.",
  },
  originalRevolutionTable: {
    id: "original-revolution-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 3.5, KC-3.1.II.E: the Patriot cause succeeded because of militias, the Continental Army, Washington's leadership, ideological commitment, and assistance from European allies",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from standard histories of the American Revolution",
    caption: "Selected turning points in the American Revolution, 1775–1783",
    columns: ["Year", "Event", "Outcome"],
    rows: [
      [
        "1775",
        "Lexington and Concord",
        "Massachusetts militia forced British troops to retreat to Boston",
      ],
      [
        "1776",
        "Trenton",
        "Washington's army surprised German soldiers hired by Britain and raised Patriot morale",
      ],
      ["1777", "Saratoga", "A British army under General Burgoyne surrendered"],
      [
        "1778",
        "Franco-American alliance",
        "France agreed to fight Britain alongside the United States",
      ],
      [
        "1781",
        "Yorktown",
        "American and French forces trapped a British army, which surrendered",
      ],
      ["1783", "Treaty of Paris", "Britain recognized American independence"],
    ],
    citation: "Compiled by Page One; see the Topic 3.5 reading.",
  },
  declarationEquality: {
    id: "declaration-equality",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 3.6, KC-3.2.I.C: an increased awareness of inequalities in society motivated calls for the abolition of slavery and greater political democracy",
    ced_review: "pending",
    attribution:
      "The Declaration of Independence, adopted by the Second Continental Congress on July 4, 1776",
    citation:
      "The Declaration of Independence (1776), second paragraph. Project Gutenberg eBook #16780.",
    text: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty, and the pursuit of Happiness.",
  },
  originalArticlesTable: {
    id: "original-articles-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 3.7, KC-3.2.II.B: the Articles of Confederation created a central government with limited power",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from standard histories of the Articles of Confederation",
    caption: "The national government under the Articles of Confederation, 1781–1788",
    columns: ["Feature", "Under the Articles"],
    rows: [
      ["Legislature", "One house (Congress), with one vote for each state"],
      ["Executive", "No president or executive branch"],
      ["National courts", "No national court system"],
      ["Taxes", "Congress could ask the states for money but could not tax citizens"],
      [
        "Trade",
        "Congress could not regulate trade among the states or with other countries",
      ],
      ["Passing laws", "Nine of the thirteen states had to approve important laws"],
      ["Amendments", "All thirteen states had to approve any change"],
    ],
    citation: "Compiled by Page One; see the Topic 3.7 reading.",
  },
  federalistTen: {
    id: "federalist-10",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 3.8, KC-3.2.II.E: Federalists, whose principles were articulated in the Federalist Papers, argued for ratification of the Constitution",
    ced_review: "pending",
    attribution:
      "James Madison, writing as “Publius” in support of ratification of the Constitution, The Federalist No. 10, November 1787",
    citation:
      "James Madison, The Federalist No. 10 (1787), in The Federalist Papers. Project Gutenberg eBook #1404.",
    note: "In Madison's use, a “faction” is any group of citizens, whether a majority or a minority, united by a shared interest or passion that threatens the rights of others or the good of the community.",
    text: "By a faction, I understand a number of citizens, whether amounting to a majority or a minority of the whole, who are united and actuated by some common impulse of passion, or of interest, adversed to the rights of other citizens, or to the permanent and aggregate interests of the community. . . .\n\nExtend the sphere, and you take in a greater variety of parties and interests; you make it less probable that a majority of the whole will have a common motive to invade the rights of other citizens; or if such a common motive exists, it will be more difficult for all who feel it to discover their own strength, and to act in unison with each other.",
  },
  constitutionPowers: {
    id: "constitution-powers",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 3.9, KC-3.2.II.C.ii: the Constitution created a limited but dynamic central government embodying federalism and a separation of powers",
    ced_review: "pending",
    attribution:
      "The Constitution of the United States, drafted by the Constitutional Convention in 1787, Article I, Section 8",
    citation:
      "Constitution of the United States (1787), Article I, Section 8. Project Gutenberg eBook #5.",
    text: "The Congress shall have Power to lay and collect Taxes, Duties, Imposts and Excises, to pay the Debts and provide for the common Defence and general Welfare of the United States; but all Duties, Imposts and Excises shall be uniform throughout the United States; To borrow Money on the credit of the United States; To regulate Commerce with foreign Nations, and among the several States, and with the Indian Tribes;",
  },
  originalPartiesTable: {
    id: "original-parties-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 3.10, KC-3.2.III.B: political leaders in the 1790s took differing positions that led to the formation of political parties",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from standard histories of the early republic",
    caption: "Positions of the first political parties, 1790s",
    columns: ["Issue", "Federalists", "Democratic-Republicans"],
    rows: [
      [
        "Role of the national government",
        "Favored a strong national government",
        "Favored limiting national power and protecting the states",
      ],
      [
        "Economy",
        "Supported a national bank and policies that helped commerce and manufacturing",
        "Opposed the national bank and favored an economy of small farmers",
      ],
      [
        "Foreign policy",
        "Favored closer ties with Britain",
        "Favored closer ties with France",
      ],
      [
        "Reading of the Constitution",
        "Interpreted the Constitution broadly",
        "Interpreted the Constitution strictly",
      ],
    ],
    citation: "Compiled by Page One; see the Topic 3.10 reading.",
  },
  jeffersonInaugural: {
    id: "jefferson-inaugural-1801-unity",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 4.2, KC-4.1.I.A and KC-4.3.I.A.i: national political parties continued to debate the powers of the federal government and relations with European powers in the early 1800s",
    ced_review: "pending",
    attribution:
      "Thomas Jefferson, delivering his First Inaugural Address on March 4, 1801, after the contested election of 1800 in which he defeated the incumbent, John Adams",
    citation:
      "Thomas Jefferson, First Inaugural Address (March 4, 1801). NLTK inaugural corpus, 1801-Jefferson.txt.",
    note: "Jefferson uses “Republicans” and “Federalists” as the names of the two parties and also as words for principles that he says all Americans share: republican government and a federal union.",
    text: "But every difference of opinion is not a difference of principle. We have called by different names brethren of the same principle. We are all Republicans, we are all Federalists.\n\nEqual and exact justice to all men, of whatever state or persuasion, religious or political; peace, commerce, and honest friendship with all nations, entangling alliances with none; the support of the State governments in all their rights, as the most competent administrations for our domestic concerns and the surest bulwarks against antirepublican tendencies; . . . .",
  },
  originalMissouriTable: {
    id: "original-missouri-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 4.3, KC-4.3.II.C: congressional attempts at political compromise, such as the Missouri Compromise, only temporarily stemmed growing tensions between opponents and defenders of slavery",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from standard histories of the Missouri Compromise",
    caption: "The Missouri Compromise, 1820–1821",
    columns: ["Provision", "What it did"],
    rows: [
      ["Missouri", "Admitted as a slave state"],
      ["Maine", "Admitted as a free state, separated from Massachusetts"],
      [
        "Louisiana Purchase north of 36°30′",
        "Slavery prohibited, except within Missouri",
      ],
      [
        "Louisiana Purchase south of 36°30′",
        "Slavery remained legal (the Arkansas Territory)",
      ],
      [
        "Balance in the Senate",
        "Kept the numbers of free and slave states equal at twelve each",
      ],
    ],
    citation: "Compiled by Page One; see the Topic 4.3 reading.",
  },
  monroeDoctrine: {
    id: "monroe-annual-message-1823",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 4.4, KC-4.3.I.A.ii: the U.S. government sought influence and control over the Western Hemisphere through a variety of means, including diplomatic efforts such as the Monroe Doctrine",
    ced_review: "pending",
    attribution:
      "President James Monroe, in his annual message to Congress, December 2, 1823, after Spain's American colonies had won independence and European monarchies had talked of restoring royal rule",
    citation:
      "James Monroe, Seventh Annual Message to Congress (December 2, 1823), in State of the Union Addresses of James Monroe. Project Gutenberg eBook #5014.",
    note: "“The allied powers” are the monarchies of Europe, especially the Holy Alliance of Russia, Austria, and Prussia. “This hemisphere” is the Western Hemisphere.",
    text: "In the wars of the European powers in matters relating to themselves we have never taken any part, nor does it comport with our policy so to do.\n\nWe owe it, therefore, to candor and to the amicable relations existing between the United States and those powers to declare that we should consider any attempt on their part to extend their system to any portion of this hemisphere as dangerous to our peace and safety. With the existing colonies or dependencies of any European power we have not interfered and shall not interfere, but with the Governments who have declared their independence and maintained it, and whose independence we have, on great consideration and on just principles, acknowledged, we could not view any interposition for the purpose of oppressing them, or controlling in any other manner their destiny, by any European power in any other light than as the manifestation of an unfriendly disposition toward the United States.",
  },
  originalTransportTable: {
    id: "original-transport-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 4.5, KC-4.2.I.B and KC-4.2.I.C: innovations in technology and new transportation networks increased the efficiency of production, extended markets, and fostered regional interdependence",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from standard histories of the market revolution",
    caption:
      "Selected innovations in transportation, agriculture, and communication, 1807–1844",
    columns: ["Year", "Innovation", "Effect"],
    rows: [
      [
        "1807",
        "Steamboat (Robert Fulton’s Clermont)",
        "Allowed boats to travel upstream on rivers, which sped river commerce",
      ],
      [
        "1825",
        "Erie Canal",
        "Linked the Hudson River with Lake Erie and lowered the cost of shipping goods between New York City and the Great Lakes region",
      ],
      [
        "1830",
        "Railroad (Baltimore and Ohio)",
        "Began regular rail service in the United States; railroad networks later linked the North and Midwest closely",
      ],
      [
        "1834",
        "Mechanical reaper (Cyrus McCormick)",
        "Allowed farmers to harvest much more grain with less labor",
      ],
      [
        "1844",
        "Telegraph (Samuel Morse)",
        "Sent messages over wires almost instantly, which sped the flow of news and business information",
      ],
    ],
    citation: "Compiled by Page One; see the Topic 4.5 reading.",
  },
  tocquevilleSuffrage: {
    id: "tocqueville-suffrage",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 4.7, KC-4.1.I: the nation moved to a more participatory democracy by expanding suffrage from a system based on property ownership to one based on voting by all adult white men",
    ced_review: "pending",
    attribution:
      "Alexis de Tocqueville, a French writer who traveled in the United States in 1831–1832, in Democracy in America, published in 1835",
    citation:
      "Alexis de Tocqueville, Democracy in America, vol. 1 (1835), chap. 4, translated by Henry Reeve. Project Gutenberg eBook #815.",
    note: "The “elective qualification” is the requirement that voters own property or pay taxes. By “universal suffrage” Tocqueville means voting by all adult white men, because women, most African Americans, and American Indians could not vote in most states.",
    text: "When a nation modifies the elective qualification, it may easily be foreseen that sooner or later that qualification will be entirely abolished. There is no more invariable rule in the history of society: the further electoral rights are extended, the greater is the need of extending them; for after each concession the strength of the democracy increases, and its demands increase with its strength. The ambition of those who are below the appointed rate is irritated in exact proportion to the great number of those who are above it. The exception at last becomes the rule, concession follows concession, and no stop can be made short of universal suffrage.",
  },
  jacksonRemoval: {
    id: "jackson-removal-1830",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 4.8, KC-4.3.I.B: American Indian resistance led to a sequence of wars and federal efforts to control and relocate American Indian populations",
    ced_review: "pending",
    attribution:
      "President Andrew Jackson, in his Second Annual Message to Congress, December 6, 1830, six months after Congress passed the Indian Removal Act",
    citation:
      "Andrew Jackson, Second Annual Message to Congress (December 6, 1830), in State of the Union Addresses of Andrew Jackson. Project Gutenberg eBook #5016.",
    note: "The “provision made for their removal at the last session of Congress” is the Indian Removal Act of 1830, which authorized the president to negotiate exchanges of Indian lands in the East for lands west of the Mississippi River. The language about Native peoples reflects the president’s view and the prejudices of his time, not the view of the Native nations.",
    text: "It gives me pleasure to announce to Congress that the benevolent policy of the Government, steadily pursued for nearly 30 years, in relation to the removal of the Indians beyond the white settlements is approaching to a happy consummation. Two important tribes have accepted the provision made for their removal at the last session of Congress, and it is believed that their example will induce the remaining tribes also to seek the same obvious advantages.\n\nThe consequences of a speedy removal will be important to the United States, to individual States, and to the Indians themselves. . . . It puts an end to all possible danger of collision between the authorities of the General and State Governments on account of the Indians. It will place a dense and civilized population in large tracts of country now occupied by a few savage hunters.",
  },
  senecaSentiments: {
    id: "seneca-falls-sentiments",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 4.11, KC-4.1.III.C: a women's rights movement sought to create greater equality and opportunities for women, expressing its ideals at the Seneca Falls Convention",
    ced_review: "pending",
    attribution:
      "The Declaration of Sentiments, adopted at the Seneca Falls Convention in New York on July 19–20, 1848, and written chiefly by Elizabeth Cady Stanton",
    citation:
      "Declaration of Sentiments (1848), as printed in Elizabeth Cady Stanton, Susan B. Anthony, and Matilda Joslyn Gage, eds., History of Woman Suffrage, vol. 1 (1881). Project Gutenberg eBook #28020.",
    note: "The Declaration of Sentiments follows the wording and structure of the Declaration of Independence of 1776. “Franchise” means the right to vote.",
    text: "We hold these truths to be self-evident: that all men and women are created equal; that they are endowed by their Creator with certain inalienable rights; that among these are life, liberty, and the pursuit of happiness; . . . .\n\nThe history of mankind is a history of repeated injuries and usurpations on the part of man toward woman, having in direct object the establishment of an absolute tyranny over her.\n\nHe has never permitted her to exercise her inalienable right to the elective franchise. He has compelled her to submit to laws, in the formation of which she had no voice. He has withheld from her rights which are given to the most ignorant and degraded men--both natives and foreigners.",
  },
  douglassPathway: {
    id: "douglass-pathway",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 4.12, KC-4.1.II.D: enslaved and free African Americans created strategies to protect their dignity and joined efforts aimed at changing their status",
    ced_review: "pending",
    attribution:
      "Frederick Douglass, who escaped from slavery in 1838, writing about his time as an enslaved boy in Baltimore, in his Narrative of the Life of Frederick Douglass, an American Slave, published in 1845",
    citation:
      "Frederick Douglass, Narrative of the Life of Frederick Douglass, an American Slave (Boston, 1845), chap. 6. Project Gutenberg eBook #23.",
    note: "“These words” are the objections of Hugh Auld, Douglass’s master in Baltimore, to his wife Sophia Auld teaching the young Douglass to read.",
    text: "These words sank deep into my heart, stirred up sentiments within that lay slumbering, and called into existence an entirely new train of thought. It was a new and special revelation, explaining dark and mysterious things, with which my youthful understanding had struggled, but struggled in vain. I now understood what had been to me a most perplexing difficulty--to wit, the white man's power to enslave the black man. It was a grand achievement, and I prized it highly. From that moment, I understood the pathway from slavery to freedom. It was just what I wanted, and I got it at a time when I the least expected it.",
  },

  polkAnnexation: {
    id: "polk-inaugural-annexation",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 5.2, KC-5.1.I.B: advocates of annexing western lands argued that Manifest Destiny and the superiority of American institutions compelled the United States to expand its borders westward to the Pacific Ocean",
    ced_review: "pending",
    attribution:
      "President James K. Polk, in his Inaugural Address on March 4, 1845, three months after Congress voted to invite Texas into the Union",
    citation:
      "James K. Polk, Inaugural Address (March 4, 1845). NLTK inaugural corpus, 1845-Polk.txt.",
    note: "Texas had been an independent republic since 1836. “The Oregon” was the region west of the Rocky Mountains that both the United States and Britain claimed.",
    text: "Foreign powers should therefore look on the annexation of Texas to the United States not as the conquest of a nation seeking to extend her dominions by arms and violence, but as the peaceful acquisition of a territory once her own, by adding another member to our confederation, with the consent of that member, thereby diminishing the chances of war and opening to them new and ever-increasing markets for their products.\n\nNor will it become in a less degree my duty to assert and maintain by all constitutional means the right of the United States to that portion of our territory which lies beyond the Rocky Mountains. Our title to the country of the Oregon is “clear and unquestionable,” and already are our people preparing to perfect that title by occupying it with their wives and children. . . . The jurisdiction of our laws and the benefits of our republican institutions should be extended over them in the distant regions which they have selected for their homes.",
  },
  polkWar: {
    id: "polk-message-mexico-1846",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 5.3, KC-5.1.I.C: the United States added large territories in the West through victory in the Mexican–American War and diplomatic negotiations",
    ced_review: "pending",
    attribution:
      "President James K. Polk, in his Second Annual Message to Congress on December 8, 1846, while the United States was at war with Mexico",
    citation:
      "James K. Polk, Second Annual Message to Congress (December 8, 1846), in State of the Union Addresses of James Polk. Project Gutenberg eBook #5019.",
    note: "Mexico did not accept the Rio Grande as the border of Texas and claimed the land north of the Rio Grande as far as the Nueces River. Polk was explaining why the United States was at war.",
    text: "Whilst occupying his position on the east bank of the Rio Grande, within the limits of Texas, then recently admitted as one of the States of our Union, the commanding general of the Mexican forces, who, in pursuance of the orders of his Government, had collected a large army on the opposite shore of the Rio Grande, crossed the river, invaded our territory, and commenced hostilities by attacking our forces. Thus, after all the injuries which we had received and borne from Mexico, and after she had insultingly rejected a minister sent to her on a mission of peace, and whom she had solemnly agreed to receive, she consummated her long course of outrage against our country by commencing an offensive war and shedding the blood of our citizens on our own soil.",
  },
  thoreauWar: {
    id: "thoreau-mexican-war",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 5.3, KC-5.1.I.C: the Mexican–American War raised questions about the status of slavery in the newly acquired lands",
    ced_review: "pending",
    attribution:
      "Henry David Thoreau, a writer from Massachusetts who spent a night in jail in 1846 for refusing to pay a tax, in his essay “Resistance to Civil Government,” published in 1849 and later called “Civil Disobedience”",
    citation:
      "Henry David Thoreau, “Resistance to Civil Government” (1849), later titled On the Duty of Civil Disobedience. Project Gutenberg eBook #71.",
    note: "By “the standing government,” Thoreau means the government of the United States as it was run from day to day.",
    text: "Witness the present Mexican war, the work of comparatively a few individuals using the standing government as their tool; for, in the outset, the people would not have consented to this measure.\n\n. . . This people must cease to hold slaves, and to make war on Mexico, though it cost them their existence as a people.",
  },
  lincolnCooper: {
    id: "lincoln-cooper-union-1860",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 5.5, KC-5.2.I.A and KC-5.2.I.C: Northerners who joined the free-soil movement portrayed the expansion of slavery as incompatible with free labor, while defenders of slavery called it a positive social good",
    ced_review: "pending",
    attribution:
      "Abraham Lincoln, a Republican from Illinois who had not yet been nominated for president, in a speech to an audience of New York Republicans at Cooper Institute on February 27, 1860",
    citation:
      "Abraham Lincoln, Cooper Institute Speech (February 27, 1860), in Noted Speeches of Abraham Lincoln, Including the Lincoln-Douglas Debate. Project Gutenberg eBook #48364.",
    note: "In this part of the speech, Lincoln speaks to Southerners, and “they” and “their” refer to the defenders of slavery.",
    text: "Holding, as they do, that slavery is morally right and socially elevating, they cannot cease to demand a full national recognition of it as a legal right and a social blessing.\n\nTheir thinking it right and our thinking it wrong is the precise fact upon which depends the whole controversy.\n\nWrong as we think slavery is, we can yet afford to let it alone where it is, because that much is due to the necessity arising from its actual presence in the nation; but can we, while our votes will prevent it, allow it to spread into the national Territories, and to overrun us here in these free States?",
  },
  lincolnOttawa: {
    id: "lincoln-ottawa-1858",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 5.6, KC-5.2.II.B.ii: the Kansas–Nebraska Act and the Dred Scott decision failed to reduce conflict over slavery in the territories",
    ced_review: "pending",
    attribution:
      "Abraham Lincoln, the Republican candidate for the U.S. Senate in Illinois, replying to Stephen A. Douglas in their first debate at Ottawa, Illinois, on August 21, 1858",
    citation:
      "Abraham Lincoln, reply in the first Lincoln–Douglas debate (Ottawa, Illinois, August 21, 1858), in Noted Speeches of Abraham Lincoln, Including the Lincoln-Douglas Debate. Project Gutenberg eBook #48364.",
    note: "Lincoln is defending his earlier statement, in his “House Divided” speech, that “a house divided against itself cannot stand.” “He” is Douglas, the Democratic senator who wrote the Kansas–Nebraska Act and supported popular sovereignty.",
    text: "I leave it to you to say whether, in the history of our government, this institution of slavery has not always failed to be a bond of union, and on the contrary been an apple of discord and an element of division in the house. . . .\n\nlately, I think that he, and those acting with him, have placed that institution on a new basis, which looks to the perpetuity and nationalization of slavery. And while it is placed upon this new basis, I say and I have said that I believe we shall not have peace upon the question until the opponents of slavery arrest the further spread of it, and place it where the public mind shall rest in the belief that it is in the course of ultimate extinction; or, on the other hand, that its advocates will push it forward until it shall become alike lawful in all the States, old as well as new, North as well as South.",
  },
  lincolnFirstInaugural: {
    id: "lincoln-first-inaugural-1861",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 5.7, KC-5.2.II.D: after a series of contested debates about secession, most slave states voted to secede from the Union",
    ced_review: "pending",
    attribution:
      "President Abraham Lincoln, in his First Inaugural Address on March 4, 1861, after seven Southern states had declared that they had left the Union",
    citation:
      "Abraham Lincoln, First Inaugural Address (March 4, 1861). NLTK inaugural corpus, 1861-Lincoln.txt.",
    note: "By “the institution of slavery in the States where it exists,” Lincoln means slavery in the Southern states, as opposed to slavery in the territories.",
    text: "I have no purpose, directly or indirectly, to interfere with the institution of slavery in the States where it exists. I believe I have no lawful right to do so, and I have no inclination to do so.\n\nI hold that in contemplation of universal law and of the Constitution the Union of these States is perpetual.\n\nIn your hands, my dissatisfied fellow-countrymen, and not in mine, is the momentous issue of civil war. The Government will not assail you. You can have no conflict without being yourselves the aggressors. You have no oath registered in heaven to destroy the Government, while I shall have the most solemn one to “preserve, protect, and defend it.”",
  },
  originalResourcesTable: {
    id: "original-resources-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 5.8, KC-5.3.I.D: the Union ultimately succeeded due to improvements in leadership and strategy, key victories, greater resources, and the wartime destruction of the South's infrastructure",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from rounded figures commonly reported for the United States in 1860–1861",
    caption: "The Union and the Confederacy at the start of the Civil War, 1861",
    columns: ["Resource", "Union", "Confederacy"],
    rows: [
      [
        "Population",
        "About 22 million",
        "About 9 million, including about 3.5 million enslaved people",
      ],
      ["Railroad mileage", "About 22,000 miles", "About 9,000 miles"],
      ["Share of the nation's manufacturing", "Roughly nine-tenths", "Roughly one-tenth"],
      ["Cotton", "Little grown", "Nearly all of the nation's cotton, a leading export"],
      ["Navy", "Held nearly all of the U.S. Navy's ships", "Had to build or buy a navy"],
    ],
    citation:
      "Compiled by Page One; figures are rounded approximations of those usually reported from the 1860 census. See the Topic 5.8 reading.",
  },
  emancipationProclamation: {
    id: "emancipation-proclamation-1863",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 5.9, KC-5.3.I.B: Lincoln's decision to issue the Emancipation Proclamation reframed the purpose of the war",
    ced_review: "pending",
    attribution:
      "President Abraham Lincoln, in the Emancipation Proclamation, issued on January 1, 1863, during the Civil War",
    citation:
      "Abraham Lincoln, Proclamation of Emancipation (January 1, 1863), in Noted Speeches of Abraham Lincoln, Including the Lincoln-Douglas Debate. Project Gutenberg eBook #48364.",
    note: "The proclamation applied to the areas that the president named as being “in rebellion.” It did not name the four slave states that had stayed in the Union.",
    text: "I, ABRAHAM LINCOLN, President of the United States, by virtue of the power in me vested as Commander-in-Chief of the army and navy of the United States in time of actual armed rebellion against the authority and government of the United States, and as a fit and necessary war measure for suppressing said rebellion, do . . . order and designate, as the States and parts of States wherein the people thereof respectively are this day in rebellion against the United States, the following, to wit: . . . .\n\nAnd, by virtue of the power and for the purpose aforesaid, I do order and declare that all persons held as slaves within said designated States and parts of States are and henceforth shall be free; and that the Executive Government of the United States, including the military and naval authorities thereof, will recognize and maintain the freedom of said persons.\n\nAnd I further declare and make known that such persons of suitable condition will be received into the armed service of the United States, to garrison forts, positions, stations, and other places, and to man vessels of all sorts in said service.",
  },
  gettysburgAddress: {
    id: "gettysburg-address-1863",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 5.9, KC-5.3.I.C: Lincoln used speeches such as the Gettysburg Address to portray the struggle against slavery as the fulfillment of America's founding democratic ideals",
    ced_review: "pending",
    attribution:
      "President Abraham Lincoln, at the dedication of the national cemetery at Gettysburg, Pennsylvania, on November 19, 1863, four months after the battle there",
    citation:
      "Abraham Lincoln, Gettysburg Address (1863), in Noted Speeches of Abraham Lincoln, Including the Lincoln-Douglas Debate. Project Gutenberg eBook #48364.",
    note: "“Fourscore and seven years ago” points back to 1776, the year of the Declaration of Independence.",
    text: "Fourscore and seven years ago our fathers brought forth upon this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field as a final resting-place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But in a larger sense we cannot dedicate, we cannot consecrate, we cannot hallow this ground. The brave men, living and dead, who struggled here, have consecrated it far above our power to add or detract. The world will little note, nor long remember, what we say here; but it can never forget what they did here. It is for us, the living, rather to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us, that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion; that we here highly resolve that these dead shall not have died in vain; that this nation, under God, shall have a new birth of freedom, and that government of the people, by the people, and for the people, shall not perish from the earth.",
  },
  originalAmendmentsTable: {
    id: "original-amendments-table",
    type: "source",
    medium: "table",
    sourceType: "original",
    source:
      "CED Topic 5.10, KC-5.3.II.A: the 13th Amendment abolished slavery, while the 14th and 15th amendments granted African Americans citizenship, equal protection under the laws, and voting rights",
    ced_review: "pending",
    attribution:
      "Table compiled by Page One from the text of the Thirteenth, Fourteenth, and Fifteenth Amendments",
    caption: "The Reconstruction amendments, 1865–1870",
    columns: ["Amendment", "Ratified", "What it did", "What it left open"],
    rows: [
      [
        "Thirteenth",
        "1865",
        "Abolished slavery throughout the United States",
        "Permitted forced labor as a punishment for crime, which Southern states used in the Black Codes",
      ],
      [
        "Fourteenth",
        "1868",
        "Made all persons born or naturalized in the United States citizens and barred states from denying equal protection of the laws",
        "Did not guarantee the vote to African Americans, and it wrote the word “male” into the Constitution in setting penalties for denying the vote",
      ],
      [
        "Fifteenth",
        "1870",
        "Barred the national government and the states from denying the vote on account of race, color, or previous condition of servitude",
        "Said nothing about sex, and states found other ways to limit Black voting, such as poll taxes and literacy tests",
      ],
    ],
    citation: "Compiled by Page One; see the Topic 5.10 reading.",
  },
  hayesInaugural: {
    id: "hayes-inaugural-1877",
    type: "source",
    sourceType: "primary",
    source:
      "CED Topic 5.11, KC-5.3.II.E: segregation, violence, Supreme Court decisions, and local political tactics progressively stripped away African American rights",
    ced_review: "pending",
    attribution:
      "President Rutherford B. Hayes, in his Inaugural Address on March 5, 1877, after a disputed election and as federal troops were leaving the last Southern states they occupied",
    citation:
      "Rutherford B. Hayes, Inaugural Address (March 5, 1877). NLTK inaugural corpus, 1877-Hayes.txt.",
    note: "Hayes uses “local self-government” to mean that Southern states would run their own affairs without federal troops. “The white and … the colored people” means white and Black Southerners.",
    text: "The people of those States are still impoverished, and the inestimable blessing of wise, honest, and peaceful local self-government is not fully enjoyed. Whatever difference of opinion may exist as to the cause of this condition of things, the fact is clear that in the progress of events the time has come when such government is the imperative necessity required by all the varied interests, public and private, of those States. But it must not be forgotten that only a local government which recognizes and maintains inviolate the rights of all is a true self-government.\n\nLet me assure my countrymen of the Southern States that it is my earnest desire to regard and promote their truest interest -- the interests of the white and of the colored people both and equally -- and to put forth my best efforts in behalf of a civil policy which will forever wipe out in our political affairs the color line and the distinction between North and South, to the end that we may have not merely a united North or a united South, but a united country.",
  },
};

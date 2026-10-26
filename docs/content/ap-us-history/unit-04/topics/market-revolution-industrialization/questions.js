// Original practice questions for Topic 4.5. q-numbered items are topic practice;
// t-numbered items belong to the Unit 4 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("4.5", [
  {
    id: "q01",
    s: "market-revolution",
    sub: "1.A",
    kc: ["KC-4.2.I.A"],
    q: "The market revolution of the early 1800s is best described as",
    right:
      "a change in which production for distant buyers replaced much household production",
    at: 2,
    wrong: [
      [
        "a return to household production as families made more of their own goods at home",
        "Household production declined as market production grew.",
      ],
      [
        "a federal policy that set the prices and wages paid in each state's industries",
        "Prices and wages were set in markets and not by federal policy.",
      ],
      [
        "a political movement that demanded the end of all tariffs on imported manufactured goods",
        "The market revolution was an economic change, not a movement against tariffs.",
      ],
    ],
    why: "As manufacturing became more organized, market relationships between producers and consumers came to prevail.",
    d: "The household production choice is close because many families still made goods at home, but the trend moved toward production for sale.",
  },
  {
    id: "q02",
    s: "innovations",
    sub: "1.A",
    kc: ["KC-4.2.I.B"],
    q: "Eli Whitney's cotton gin (1793) was important because it",
    right:
      "made it much easier to clean cotton, which sharply increased cotton production",
    at: 0,
    wrong: [
      [
        "allowed mills to weave cloth quickly and cheaply, which put hand weavers out of work",
        "That describes the power loom.",
      ],
      [
        "allowed farmers to harvest large fields of grain with far less labor than before",
        "That describes the mechanical reaper.",
      ],
      [
        "allowed messages to travel along wires and so speeded the news of cotton prices",
        "That describes the telegraph.",
      ],
    ],
    why: "The cotton gin cleaned cotton far faster than hand labor, which made large-scale cotton farming profitable.",
    d: "The power loom choice is close because both machines served the cotton trade, but the gin cleaned the fiber and the loom wove cloth.",
  },
  {
    id: "q03",
    s: "transportation-and-commerce",
    sub: "1.B",
    kc: ["KC-4.2.I.C"],
    q: "The Erie Canal (1825) most directly",
    right:
      "lowered the cost of shipping goods between the Great Lakes region and New York City",
    at: 3,
    wrong: [
      [
        "connected the Mississippi River with the ports of the Gulf of Mexico and the South",
        "The canal ran across New York State.",
      ],
      [
        "ended the use of steamboats on the Hudson River by making rail travel faster",
        "Steamboats continued to operate on the Hudson.",
      ],
      [
        "linked the Ohio River with the harbors of Virginia and the Chesapeake Bay",
        "The Erie Canal joined the Hudson River with Lake Erie.",
      ],
    ],
    why: "The canal joined the Hudson River to Lake Erie and helped to make New York City the nation's leading port.",
    d: "The Mississippi choice is close because the Mississippi also mattered to western trade, but the Erie Canal was in New York.",
  },
  {
    id: "q04",
    s: "transportation-and-commerce",
    sub: "1.B",
    kc: ["KC-4.2.I.C"],
    q: "In Gibbons v. Ogden (1824), the Supreme Court ruled that",
    right:
      "Congress could regulate interstate commerce, ending a state steamboat monopoly",
    at: 1,
    wrong: [
      [
        "states could grant monopolies on any trade that crossed their borders",
        "The Court limited state monopolies on interstate trade.",
      ],
      [
        "Congress could not build roads or canals without an amendment to the Constitution",
        "The case concerned commerce and steamboat licenses.",
      ],
      [
        "a state could tax the federal government's agencies that operated within its borders",
        "That question was decided in McCulloch v. Maryland.",
      ],
    ],
    why: "By upholding congressional authority over interstate commerce, the Court opened waterways to competition and strengthened national power over the economy.",
    d: "The monopolies choice is close because the case arose from a state monopoly, but the Court ruled against it.",
  },
  {
    id: "q05",
    s: "transportation-and-commerce",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.2.III.B"],
    q: "Which of the following best explains the growth of Northern banking, shipping, and manufacturing in the first half of the 1800s?",
    right:
      "Expanding Southern cotton production created demand for Northern financing, shipping, and mills",
    at: 2,
    wrong: [
      [
        "A decline in cotton exports forced Northern investors to move their money into factories",
        "Cotton exports increased in these decades.",
      ],
      [
        "A law required Southern planters to sell their cotton only through Northern ports",
        "No law required Southern planters to use Northern ports.",
      ],
      [
        "An end to trade between New England and Great Britain left the region without other markets",
        "New England continued to trade with Britain, and its mills used cotton.",
      ],
    ],
    why: "Northern merchants financed and shipped Southern cotton, and New England mills used it, which tied the regions together.",
    d: "The declining cotton exports choice is close because the cotton trade affected Northern investment, but exports rose.",
  },
  {
    id: "q06",
    s: "market-revolution",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.2.I.A"],
    q: "Which of the following best explains why New England investors built more textile mills after 1807?",
    right:
      "The embargo and the war cut off British goods and encouraged American manufacturing",
    at: 1,
    wrong: [
      [
        "The federal government ordered every state to build mills to supply the army with cloth",
        "No order required states to build textile mills.",
      ],
      [
        "Cotton became cheaper after the end of the Atlantic slave trade in January 1808",
        "Cotton prices were affected by many factors, and the end of the slave trade did not cause cheap cotton.",
      ],
      [
        "The Supreme Court ruled that foreign cloth could not be sold in the United States",
        "The Court issued no such ruling.",
      ],
    ],
    why: "When the embargo and the War of 1812 reduced British imports, American investors saw opportunities in domestic manufacturing.",
    d: "The cheaper cotton choice is close because mills needed cotton, but the new investment followed the loss of British goods.",
  },
  {
    id: "q07",
    s: "transportation-and-commerce",
    sub: "4.A",
    kc: ["KC-4.2.I.C"],
    q: "The building of the National Road and the Erie Canal is best understood in the context of which of the following?",
    right: "A desire to enlarge markets by linking the East with the interior",
    at: 0,
    wrong: [
      [
        "A plan to move the nation's capital from the Atlantic coast to the Ohio Valley",
        "The capital remained in Washington.",
      ],
      [
        "A wish to prepare for a war with Spain by moving troops to the Florida border",
        "The projects served commerce and settlement and were not made for a war with Spain.",
      ],
      [
        "A federal decision to end the use of rivers in favor of roads and canals alone",
        "Rivers remained important for transportation.",
      ],
    ],
    why: "Roads and canals extended markets by connecting farms in the interior with Eastern cities and ports.",
    d: "The capital choice is close because the projects did help western settlement, but they were not part of a plan to move the capital.",
  },
  {
    id: "q08",
    s: "transportation-and-commerce",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-4.2.I.C"],
    q: "Which of the following describes a difference in how transportation networks linked the North and the South before 1850?",
    right:
      "Canals and railroads tied the North and Midwest closely, while the South relied mostly on rivers",
    at: 3,
    wrong: [
      [
        "Railroads and canals tied the South to the Midwest more closely than they tied the North",
        "The North and Midwest were more closely tied.",
      ],
      [
        "The South built the nation's first canal systems, and the North built none until the 1850s",
        "The Erie Canal, built in the North, opened in 1825.",
      ],
      [
        "The North depended on rivers alone, while the South developed an extensive railroad network",
        "The North developed the larger railroad network.",
      ],
    ],
    why: "Transportation networks linked the North and Midwest more closely than the South, whose cotton moved mostly by river to ports.",
    d: "The South-and-Midwest choice is close because the Mississippi connected the South and the West, but canals and railroads tied the North and Midwest more closely.",
  },
  {
    id: "q09",
    s: "innovations",
    sub: "1.B",
    kc: ["KC-4.2.I.B"],
    q: "Interchangeable parts, promoted by Eli Whitney and other arms makers, helped industrialization by",
    right: "making goods easier to produce in large quantities and easier to repair",
    at: 1,
    wrong: [
      [
        "allowing factories to run without the use of water power or steam engines",
        "Factories still needed power.",
      ],
      [
        "making each product unique so that craftsmen could set high prices for their goods",
        "Interchangeable parts made products standard and not unique.",
      ],
      [
        "replacing paper currency with metal coins that were accepted in every state",
        "Interchangeable parts concerned manufacturing and had nothing to do with currency.",
      ],
    ],
    why: "Standardized parts made it possible to manufacture goods in quantity and to replace broken pieces.",
    d: "The no-power choice is close because machines reduced labor, but factories still relied on water or steam.",
  },
  {
    id: "t01",
    s: "transportation-and-commerce",
    sub: "3.A",
    kc: ["KC-4.2.I.B", "KC-4.2.I.C"],
    q: "Which of the following claims about innovation is best supported by the table?",
    right:
      "New transportation and communication technologies increased the speed and reach of commerce",
    at: 2,
    wrong: [
      [
        "Railroads were the first innovation to speed the movement of goods and travelers",
        "The table shows that the steamboat came first, in 1807.",
      ],
      [
        "Agricultural inventions were the only innovations that changed American production",
        "The table lists innovations in transportation and communication as well.",
      ],
      [
        "Government funding paid for each innovation, and private investors played no part",
        "The table does not mention funding.",
      ],
    ],
    why: "Each entry describes a technology that sped commerce, transportation, or the flow of information.",
    d: "The railroads-first choice is close because railroads were important, but the table shows that steamboats and canals came earlier.",
    stim: excerpts.originalTransportTable,
  },
  {
    id: "t02",
    s: "transportation-and-commerce",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.2.I.C"],
    q: "Which of the following was a likely effect of the innovation listed for 1825 in the table?",
    right:
      "Western New York farmers and merchants could sell goods in eastern markets more cheaply",
    at: 0,
    wrong: [
      [
        "Southern ports replaced New York as the main outlet for Midwestern crops",
        "The canal strengthened New York's position.",
      ],
      [
        "Steamboats were no longer used on rivers because canal boats were faster",
        "Steamboats continued to be used on rivers and lakes.",
      ],
      [
        "Farmers in the Midwest lost access to eastern cities because the canal ended river trade",
        "The canal expanded their markets.",
      ],
    ],
    why: "The canal lowered shipping costs between the Great Lakes region and New York City, which enlarged markets.",
    d: "The Southern ports choice is close because the Mississippi also carried crops, but the canal drew trade to the Hudson.",
    stim: excerpts.originalTransportTable,
  },
  {
    id: "t03",
    s: "market-revolution",
    sub: "4.A",
    kc: ["KC-4.2.I.A"],
    q: "The innovations listed in the table are best understood in the context of which of the following?",
    right: "A market revolution in which more producers sold goods to distant buyers",
    at: 3,
    wrong: [
      [
        "A decline of commerce that sent most families back to farms that supplied their own needs",
        "Commerce expanded in these decades.",
      ],
      [
        "A national plan to place the production of all goods under federal control",
        "Production remained in private hands.",
      ],
      [
        "A period of isolation in which the United States cut off trade with Europe and Asia",
        "Trade expanded, and the United States traded widely.",
      ],
    ],
    why: "The innovations helped expand markets and made it practical to produce goods for sale far from home.",
    d: "The decline of commerce choice is close because the embargo briefly reduced trade, but these innovations expanded commerce.",
    stim: excerpts.originalTransportTable,
  },
]);

// Original Page One lesson for CED Topic 4.5.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.5", {
  summary:
    "How entrepreneurs, new machines, and new transportation networks created a market revolution between 1800 and 1848, and why the North, the Midwest, and the South were linked in different ways.",
  minutes: 14,
  goals: [
    "Explain what the market revolution was and who helped to create it.",
    "Explain how innovations in technology and agriculture increased the efficiency of production.",
    "Explain how transportation networks and government actions linked regions of the country and shaped national and international commercial ties.",
  ],
  bigIdea:
    "New machines, new roads, canals, and railroads, and government support for them created a market economy, and that economy tied the North and Midwest together while binding the South to cotton exports.",
  context:
    "The CED asks you to explain the causes and effects of innovations in technology, agriculture, and commerce. For each innovation, ask what it made cheaper or faster, who profited, and which regions it connected.",
  sections: [
    section(
      "market-revolution",
      "The market revolution",
      ["WXT", "SOC"],
      [
        "Entrepreneurs helped to create a market revolution in production and commerce, in which market relationships between producers and consumers came to prevail as the manufacture of goods became more organized. Early in the century, most families still grew much of their own food and made many of their own goods. As the manufacture of goods became more organized, more people produced goods to sell to distant buyers and bought what they needed from others.",
        "In New England, Samuel Slater opened a water-powered textile mill in Rhode Island in 1790. In the 1810s and 1820s the Boston Manufacturing Company in Waltham and the mills of Lowell, Massachusetts, brought spinning and weaving together under one roof. Investors formed corporations to raise money from many people. In many industries, the older putting-out system, in which merchants gave raw materials to families to work at home, gave way to factories.",
      ],
      "Entrepreneurs organized production for distant markets, and factories began to replace work done at home.",
    ),
    section(
      "innovations",
      "Innovations in production",
      ["WXT", "NAT"],
      [
        "Innovations including textile machinery, steam engines, interchangeable parts, the telegraph, and agricultural inventions increased the efficiency of production methods. The power loom let mills weave cloth faster and more cheaply than home weavers. Steam engines powered boats and railroads and, in time, factories. Interchangeable parts, which Eli Whitney and other arms makers promoted, made goods easier to produce in quantity and to repair. Samuel Morse demonstrated the telegraph in 1844, and it let information travel almost instantly over long distances.",
        "Agricultural inventions changed farming. Eli Whitney's cotton gin (1793) made it far easier to separate cotton fiber from its seeds. Cyrus McCormick's mechanical reaper (1834) let farmers harvest much more grain, and John Deere's steel plow (1837) cut through the heavy soil of the prairies. Such tools helped farmers raise crops for sale rather than for the family alone.",
      ],
      "Machines and inventions raised the efficiency of manufacturing and farming and encouraged production for the market.",
    ),
    section(
      "transportation-and-commerce",
      "Transportation, government, and regional ties",
      ["WXT", "GEO", "PCE"],
      [
        "Legislation and judicial systems supported the development of roads, canals, and railroads, which extended and enlarged markets and helped foster regional interdependence. States chartered companies and paid for canals, and the federal government helped to build the National Road. In Gibbons v. Ogden (1824) the Supreme Court held that Congress had the power to regulate interstate commerce, which ended a New York monopoly on steamboat travel. The Erie Canal (1825) joined the Hudson River with Lake Erie, lowered the cost of shipping goods between the Midwest and New York City, and helped to make New York the nation's leading port. Robert Fulton's steamboat, the Clermont (1807), proved that boats could travel upstream, and railroads such as the Baltimore and Ohio began running in 1830.",
        "Transportation networks linked the North and Midwest more closely than they linked regions in the South. Midwestern farmers sent grain and livestock east and bought Northern manufactured goods. The South depended mostly on rivers that carried its cotton to ports. Increasing Southern cotton production and the related growth of Northern manufacturing, banking, and shipping industries promoted the development of national and international commercial ties. Southern cotton supplied New England and British mills, and Northern bankers, insurers, and shippers financed and carried the trade.",
        [
          "Common trap",
          "The market revolution did not affect every region in the same way. It tied the North and Midwest together by canals and railroads, while the South's economy rested on exporting cotton that was grown by enslaved labor.",
        ],
      ],
      "Government-supported roads, canals, and railroads enlarged markets, linked the North and Midwest, and tied the South to Northern and British buyers and bankers.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.6",
      title: "From new markets to new lives",
      body: "New ways of making and selling goods changed where people lived, how they worked, and how families were organized. Topic 4.6 follows those social effects.",
      transferQuestion:
        "How did the Erie Canal change the markets available to farmers in the Midwest?",
      feedback:
        "A strong answer notes that the canal lowered the cost of shipping grain and livestock to eastern cities and let farmers sell to distant buyers.",
      links: [
        {
          topicId: "apush-4-3",
          sectionId: "american-system",
          label: "Review the American System",
        },
      ],
    },
  ],
  sourceIds: [],
});

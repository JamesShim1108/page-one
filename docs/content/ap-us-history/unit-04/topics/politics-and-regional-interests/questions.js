// Original practice questions for Topic 4.3. q-numbered items are topic practice;
// t-numbered items belong to the Unit 4 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("4.3", [
  {
    id: "q01",
    s: "regional-interests",
    sub: "1.A",
    kc: ["KC-4.1.I.D"],
    q: "In the early 1800s, which region most strongly favored a protective tariff?",
    right:
      "The Northeast, where growing manufacturers wanted protection from British competition",
    at: 1,
    wrong: [
      [
        "The South, where cotton planters hoped to shelter their crops from foreign competition",
        "Southern planters exported cotton and bought manufactured goods, so they opposed higher tariffs.",
      ],
      [
        "The West, where farmers hoped to raise the price of the manufactured goods they bought",
        "Western farmers wanted lower prices for goods and better roads to markets.",
      ],
      [
        "No region, because Congress had banned all tariffs after the end of the War of 1812",
        "Congress passed protective tariffs in 1816 and later.",
      ],
    ],
    why: "Northern manufacturers sought a tariff to make British goods more expensive and to protect their growing industries.",
    d: "The Southern choice is close because planters cared about trade policy, but they favored low tariffs.",
  },
  {
    id: "q02",
    s: "american-system",
    sub: "1.A",
    kc: ["KC-4.2.III.D"],
    q: "Henry Clay's American System called for",
    right:
      "a protective tariff, a national bank, and federal spending on roads and canals",
    at: 3,
    wrong: [
      [
        "a protective tariff, a national bank, and a ban on federal spending for roads and canals",
        "The plan favored federal spending on internal improvements.",
      ],
      [
        "free trade with Britain, the end of the national bank, and state control of all transportation",
        "Clay favored a tariff and a national bank.",
      ],
      [
        "federal ownership of factories, a state-chartered bank, and a tax on exports of cotton",
        "The plan relied on private enterprise and did not call for federal ownership.",
      ],
    ],
    why: "Clay's plan aimed to unify the national economy by sheltering industry, providing stable credit, and improving transportation.",
    d: "The ban on spending choice is close because it keeps two of the three elements, but the plan called for federal funding of internal improvements.",
  },
  {
    id: "q03",
    s: "american-system",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.2.III.D"],
    q: "Which of the following best explains why many Southerners opposed the protective tariff?",
    right:
      "It raised the prices of goods they bought and risked foreign retaliation against Southern exports",
    at: 0,
    wrong: [
      [
        "It required Southern planters to sell their cotton only to Northern mills at fixed prices",
        "The tariff did not fix the price or the buyers of cotton.",
      ],
      [
        "It reduced the number of Southern representatives in the Senate to the number of Northern ones",
        "The Senate's composition was unrelated to the tariff.",
      ],
      [
        "It banned the export of cotton to Britain until Britain lowered its own duties",
        "The tariff did not ban cotton exports.",
      ],
    ],
    why: "Southerners sold crops abroad and bought manufactured goods, so a tariff seemed to benefit the North at their expense.",
    d: "The fixed-price choice is close because Southerners did sell cotton to Northern mills, but the tariff did not set prices.",
  },
  {
    id: "q04",
    s: "missouri-compromise",
    sub: "1.B",
    kc: ["KC-4.3.II.C"],
    q: "Which of the following was part of the Missouri Compromise of 1820–1821?",
    right:
      "Admitting Missouri as a slave state and Maine as a free state, with slavery banned north of 36°30′",
    at: 2,
    wrong: [
      [
        "Admitting Missouri as a free state and Maine as a slave state, with slavery banned in the entire Louisiana Purchase",
        "Missouri entered as a slave state and Maine as a free state, and slavery stayed legal south of 36°30′.",
      ],
      [
        "Letting the settlers of each territory vote on whether to allow slavery within their borders",
        "That approach, popular sovereignty, came later.",
      ],
      [
        "Ending the importation of enslaved people from Africa and the Caribbean after January 1808",
        "The ban on importation took effect in 1808, long before the compromise.",
      ],
    ],
    why: "The compromise kept the Senate balanced and drew a line at 36°30′ across the rest of the Louisiana Purchase.",
    d: "The all-free choice is close because the compromise did ban slavery in most of the northern territory, but not in Missouri and not in the south.",
  },
  {
    id: "q05",
    s: "missouri-compromise",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.3.II.C"],
    q: "Which of the following best explains why Missouri's request to enter the Union caused a national crisis?",
    right:
      "The Senate balance of free and slave states was at stake, and the sections disagreed over slavery",
    at: 1,
    wrong: [
      [
        "The sections disagreed over whether the Constitution allowed Congress to create new states in the West",
        "The dispute concerned slavery and not the power to admit states.",
      ],
      [
        "Missouri's settlers had refused to accept the authority of the Constitution and Congress",
        "Missouri's settlers sought statehood within the Union.",
      ],
      [
        "Britain objected to the admission of a new state along the Mississippi River",
        "Britain did not take part in the Missouri dispute.",
      ],
    ],
    why: "The Senate was evenly divided between free and slave states, so adding a state of either kind threatened to shift the balance.",
    d: "The power-to-admit choice is close because the debate involved congressional authority, but the question was whether to restrict slavery in Missouri.",
  },
  {
    id: "q06",
    s: "regional-interests",
    sub: "1.A",
    kc: ["KC-4.1.I.D"],
    q: "Which of the following describes national politics during the Era of Good Feelings (about 1817–1825)?",
    right:
      "One party, the Democratic-Republicans, dominated, and regional disputes arose within it",
    at: 3,
    wrong: [
      [
        "The Federalists regained control of Congress by opposing the policies of the Monroe administration",
        "The Federalist Party had collapsed after the War of 1812.",
      ],
      [
        "Two national parties competed in every state and ran candidates for each office",
        "Only one national party was active.",
      ],
      [
        "Congress banned political parties because they were thought to threaten national unity",
        "Parties were never banned.",
      ],
    ],
    why: "Without Federalist opposition, regional interests competed inside a single dominant party.",
    d: "The Federalist comeback choice is close because the party had been strong in New England earlier, but it faded after the war.",
  },
  {
    id: "q07",
    s: "regional-interests",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-4.1.I.D"],
    q: "Which of the following describes a difference between the Northeast and the South in the early 1800s?",
    right:
      "The Northeast wanted to protect growing manufacturing, while the South depended on exporting cotton",
    at: 2,
    wrong: [
      [
        "The Northeast depended on exporting cotton, while the South relied on manufacturing",
        "The roles were the reverse.",
      ],
      [
        "The South wanted federal funds for canals, while the Northeast opposed all internal improvements",
        "The Northeast favored many improvements to connect its markets.",
      ],
      [
        "The South wanted a high tariff, while the Northeast demanded free trade with Britain",
        "The positions on the tariff were reversed.",
      ],
    ],
    why: "Regional economies shaped positions on the tariff, and the Northeast and South usually stood on opposite sides.",
    d: "The reversal choice is close because it names the same two products, but the Northeast manufactured and the South grew cotton.",
  },
  {
    id: "q08",
    s: "american-system",
    sub: "1.B",
    kc: ["KC-4.2.III.D"],
    q: "Why did Presidents Madison and Monroe veto bills for federal internal improvements?",
    right:
      "They doubted that the Constitution let the federal government build roads and canals",
    at: 0,
    wrong: [
      [
        "They believed that roads and canals would hurt the economy of the Western states and the Southeast",
        "Both presidents supported better transportation but questioned federal power.",
      ],
      [
        "They thought the projects cost too much and wanted Congress to end all government spending",
        "Their objection was constitutional and not only a matter of cost.",
      ],
      [
        "They wanted to leave all roads under the control of Great Britain and Canada",
        "No such plan existed.",
      ],
    ],
    why: "Both presidents thought that a constitutional amendment would be needed before the federal government could build such projects, so many were left to states and private companies.",
    d: "The Western economy choice is close because the projects mainly benefited the West, but the vetoes rested on constitutional doubts.",
  },
  {
    id: "t01",
    s: "missouri-compromise",
    sub: "3.A",
    kc: ["KC-4.3.II.C"],
    q: "Which of the following claims about the Missouri Compromise is best supported by the table?",
    right:
      "Congress paired the admission of a slave state with the admission of a free state",
    at: 1,
    wrong: [
      [
        "Congress banned slavery throughout the whole of the Louisiana Purchase",
        "The table says slavery stayed legal south of 36°30′ and in Missouri.",
      ],
      [
        "Congress admitted Missouri as a free state to please the Northern representatives",
        "The table lists Missouri as a slave state.",
      ],
      [
        "Congress admitted Maine as a slave state to keep the balance of power in the House",
        "The table lists Maine as a free state.",
      ],
    ],
    why: "The table shows that Missouri entered as a slave state and Maine as a free state, which kept the number of states equal in the Senate.",
    d: "The whole-purchase choice is close because the compromise did ban slavery in part of the purchase, but not all of it.",
    stim: excerpts.originalMissouriTable,
  },
  {
    id: "t02",
    s: "missouri-compromise",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.3.II.C"],
    q: "Which of the following was a short-term effect of the provisions listed in the table?",
    right:
      "The immediate dispute ended, and the number of free and slave states stayed equal",
    at: 0,
    wrong: [
      [
        "The question of slavery in the territories was settled permanently for all future land",
        "The question returned with each new territory.",
      ],
      [
        "Northern states agreed to end their opposition to the spread of slavery",
        "Northern opposition continued.",
      ],
      [
        "Southern states left the Union because the compromise limited slavery north of a line",
        "Southern states did not leave the Union in 1820.",
      ],
    ],
    why: "The compromise preserved the Senate balance, but it only postponed the larger conflict over slavery in new lands.",
    d: "The permanent settlement choice is close because the line seemed final, but each new acquisition revived the question.",
    stim: excerpts.originalMissouriTable,
  },
  {
    id: "t03",
    s: "missouri-compromise",
    sub: "4.A",
    kc: ["KC-4.3.II.C"],
    q: "The dispute that led to the provisions in the table is best understood in the context of which of the following?",
    right:
      "Westward expansion that raised the question of whether slavery would spread into new territory",
    at: 3,
    wrong: [
      [
        "The Supreme Court's decision in Gibbons v. Ogden, which strengthened federal power over commerce",
        "That decision concerned steamboat monopolies and not slavery.",
      ],
      [
        "The debate over whether to renew the charter of the Second Bank of the United States",
        "The bank question was a separate economic dispute.",
      ],
      [
        "The Embargo Act, which had cut off American trade with European nations in 1807",
        "The embargo ended in 1809, long before the Missouri dispute.",
      ],
    ],
    why: "The Louisiana Purchase and westward settlement made it necessary to decide where slavery could go, and Missouri forced the issue.",
    d: "The Gibbons choice is close because it came in the same decade, but it did not concern slavery.",
    stim: excerpts.originalMissouriTable,
  },
]);

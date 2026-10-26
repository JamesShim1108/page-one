// Original practice questions for Topic 4.2. q-numbered items are topic practice;
// t-numbered items belong to the Unit 4 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("4.2", [
  {
    id: "q01",
    s: "election-of-1800-and-jeffersonian-politics",
    sub: "1.A",
    kc: ["KC-4.1.I.A"],
    q: "The presidential election of 1800 is significant mainly because",
    right:
      "power passed from one party to another peacefully after a bitterly contested election",
    at: 2,
    wrong: [
      [
        "the Supreme Court decided the winner after the Electoral College result ended in a tie",
        "The House of Representatives, not the Court, chose the president.",
      ],
      [
        "Federalist leaders refused to leave office until the Twelfth Amendment forced them out",
        "The Federalists accepted the result, and the Amendment came later.",
      ],
      [
        "Jefferson and Adams agreed to share the presidency for two terms to end the dispute",
        "The presidency was never shared.",
      ],
    ],
    why: "Jefferson's election showed that the republic could transfer power from the Federalists to the Democratic-Republicans without violence.",
    d: "The Supreme Court choice is close because the Court later became powerful, but the House of Representatives decided the 1800 tie.",
  },
  {
    id: "q02",
    s: "election-of-1800-and-jeffersonian-politics",
    sub: "1.B",
    kc: ["KC-4.1.I.A"],
    q: "The Embargo Act of 1807 was intended to",
    right:
      "pressure Britain and France to respect American neutral rights by cutting off trade",
    at: 0,
    wrong: [
      [
        "protect American manufacturers from foreign competition by raising tariffs on British goods",
        "The embargo stopped trade; it was not a tariff to shelter manufacturers.",
      ],
      [
        "punish Native nations that had allied with Britain along the northwestern frontier",
        "The embargo concerned trade with Europe.",
      ],
      [
        "raise money for the army by placing a new tax on goods exported from American ports",
        "The embargo ended exports and did not tax them.",
      ],
    ],
    why: "Jefferson hoped that the loss of American trade would force Britain and France to stop seizing American ships, but the embargo hurt American merchants and was repealed in 1809.",
    d: "The tariff choice is close because the embargo changed trade, but it halted exports and imports instead of raising duties.",
  },
  {
    id: "q03",
    s: "courts-and-the-constitution",
    sub: "1.B",
    kc: ["KC-4.1.I.B"],
    q: "In Marbury v. Madison (1803), the Supreme Court",
    right:
      "asserted its power to decide whether acts of Congress violate the Constitution",
    at: 3,
    wrong: [
      [
        "ordered the secretary of state to deliver the commissions of the appointed Federalist judges",
        "The Court said it could not issue that order.",
      ],
      [
        "ruled that states could not tax the national bank chartered by Congress",
        "That was the ruling in McCulloch v. Maryland (1819).",
      ],
      [
        "gave Congress the power to regulate trade among the states and with other nations",
        "That was the ruling in Gibbons v. Ogden (1824).",
      ],
    ],
    why: "Chief Justice Marshall's opinion established judicial review, the Court's power to judge the constitutionality of laws.",
    d: "The commissions choice is close because the case began as a dispute over commissions, but the Court's lasting ruling concerned judicial review.",
  },
  {
    id: "q04",
    s: "courts-and-the-constitution",
    sub: "1.B",
    kc: ["KC-4.1.I.B"],
    q: "The Supreme Court's decision in McCulloch v. Maryland (1819) established that",
    right:
      "federal law was supreme over state law and Congress could charter a national bank",
    at: 1,
    wrong: [
      [
        "the Constitution barred Congress from creating a national bank without the consent of the states",
        "The Court upheld the bank and the power of Congress.",
      ],
      [
        "states could tax federal institutions that operated inside their borders if they chose",
        "The Court ruled that Maryland could not tax the national bank.",
      ],
      [
        "the Court lacked the power to review the actions of state governments under the Constitution",
        "The decision asserted federal supremacy over the states.",
      ],
    ],
    why: "The Court held that the Constitution's implied powers allowed the bank and that a state could not tax a federal institution.",
    d: "The state tax choice is close because the case began with a state tax, but the Court ruled against the state.",
  },
  {
    id: "q05",
    s: "louisiana-purchase-and-exploration",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.3.I.A.i"],
    q: "Which of the following best explains why Jefferson agreed to buy the Louisiana Territory in 1803?",
    right:
      "Control of New Orleans and the Mississippi River was vital to western farmers and trade",
    at: 0,
    wrong: [
      [
        "He believed that the Constitution clearly gave the president the power to purchase territory",
        "Jefferson was unsure whether the Constitution allowed it.",
      ],
      [
        "France had threatened to attack the United States unless it bought the territory",
        "France offered the land in order to raise money for its European wars.",
      ],
      [
        "Spain had asked the United States to take over its colonies in the American West",
        "Spain had given Louisiana to France, which sold it.",
      ],
    ],
    why: "Western farmers depended on the Mississippi and New Orleans, so Jefferson set aside his doubts about the Constitution to secure the region.",
    d: "The Constitution choice is close because Jefferson wanted to follow it closely, but he was unsure that the document allowed the purchase.",
  },
  {
    id: "q06",
    s: "louisiana-purchase-and-exploration",
    sub: "1.A",
    kc: ["KC-4.3.I.A.i"],
    q: "Jefferson sent the Lewis and Clark expedition (1804–1806) to",
    right:
      "explore the Louisiana Territory and the route to the Pacific and to gather information",
    at: 2,
    wrong: [
      [
        "establish farming settlements along the Columbia River for American families",
        "The expedition explored and did not establish settlements.",
      ],
      [
        "negotiate a treaty with France that would fix the western border of the purchase",
        "The treaty with France had been signed in 1803.",
      ],
      [
        "locate gold deposits that could pay the national debt that the purchase had created",
        "The expedition's goals were exploration, trade, and science.",
      ],
    ],
    why: "Lewis and Clark mapped routes, gathered information about land and peoples, and strengthened American claims in the Northwest.",
    d: "The settlements choice is close because the expedition built winter camps, but its purpose was to explore and not to settle.",
  },
  {
    id: "q07",
    s: "election-of-1800-and-jeffersonian-politics",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-4.1.I.A"],
    q: "Which of the following describes a continuity in American politics from the 1790s into the early 1800s?",
    right:
      "The two national parties continued to disagree over federal power and relations with Europe",
    at: 1,
    wrong: [
      [
        "Both parties agreed that the tariff should rise and that the national bank should be ended",
        "The parties disagreed on the powers of the federal government.",
      ],
      [
        "Presidential elections stopped being contested after the Twelfth Amendment took effect in 1804",
        "Elections remained competitive.",
      ],
      [
        "Both parties favored joining Britain in a war against France to protect American trade",
        "The parties disagreed about Britain and France, and the nation stayed neutral.",
      ],
    ],
    why: "The parties that formed in the 1790s over federal power and the French Revolution continued to debate those matters in the early 1800s.",
    d: "The Twelfth Amendment choice is close because it changed the electoral system in 1804, but elections remained contested.",
  },
  {
    id: "q08",
    s: "courts-and-the-constitution",
    sub: "4.A",
    kc: ["KC-4.1.I.B"],
    q: "The Supreme Court's early claims to review laws are best understood in the context of which of the following?",
    right:
      "The new nation's effort to define the Constitution and the balance of power among the branches",
    at: 3,
    wrong: [
      [
        "The Articles of Confederation, which had set up a national judiciary with power over the states",
        "The Articles created no national courts.",
      ],
      [
        "A Federalist plan to remove Jefferson from the presidency by order of the courts",
        "The Federalists did not seek to remove Jefferson by court order.",
      ],
      [
        "A constitutional rule that required the Court to approve each bill before Congress could vote",
        "The Constitution gives the Court no such role in the lawmaking process.",
      ],
    ],
    why: "Americans were still working out what the Constitution meant, and the Marshall Court claimed the final say on those questions.",
    d: "The Federalist plan choice is close because the case arose from Federalist appointments, but it did not involve removing the president.",
  },
  {
    id: "t01",
    s: "election-of-1800-and-jeffersonian-politics",
    sub: "2.A",
    kc: ["KC-4.1.I.A"],
    q: "Jefferson's statement that “We are all Republicans, we are all Federalists” was most likely intended to",
    right: "lessen the bitterness between the parties after a hard-fought election",
    at: 2,
    wrong: [
      [
        "persuade Federalist leaders to give up their party and join the Democratic-Republicans",
        "He spoke of shared principles, not of ending the Federalist Party.",
      ],
      [
        "announce that Congress had outlawed political parties as a danger to the republic",
        "Parties were not outlawed.",
      ],
      [
        "defend the Alien and Sedition Acts that the Federalists had passed in 1798",
        "Jefferson and his party had opposed those Acts.",
      ],
    ],
    why: "Jefferson spoke to a divided nation and stressed principles that both parties shared in order to calm party feeling.",
    d: "The join-the-party choice is close because Jefferson hoped to win over moderates, but his address stressed shared principles and did not demand a change of party.",
    stim: excerpts.jeffersonInaugural,
  },
  {
    id: "t02",
    s: "election-of-1800-and-jeffersonian-politics",
    sub: "3.A",
    kc: ["KC-4.1.I.A"],
    q: "Which of the following positions is best supported by Jefferson's list of principles in the second paragraph?",
    right:
      "Support for the rights of the state governments and avoidance of alliances with other nations",
    at: 1,
    wrong: [
      [
        "Support for a strong central government and a permanent alliance with Britain",
        "He praised state governments and rejected alliances.",
      ],
      [
        "Support for an end to commerce with foreign nations in order to protect the states",
        "He supported commerce and friendship with all nations.",
      ],
      [
        "Support for federal control of domestic concerns and a national religion",
        "He supported equal justice regardless of religious persuasion and the states' role in domestic matters.",
      ],
    ],
    why: "Jefferson calls for “the support of the State governments in all their rights” and “entangling alliances with none.”",
    d: "The strong central government choice is close because it describes the Federalist position, which Jefferson did not state in the excerpt.",
    stim: excerpts.jeffersonInaugural,
  },
  {
    id: "t03",
    s: "election-of-1800-and-jeffersonian-politics",
    sub: "4.A",
    kc: ["KC-4.1.I.A"],
    q: "The phrase “entangling alliances with none” is best understood in the context of which of the following?",
    right:
      "Earlier American efforts to stay neutral in the wars between Britain and France",
    at: 3,
    wrong: [
      [
        "The Monroe Doctrine's warning against European intervention in the Western Hemisphere",
        "The Monroe Doctrine came in 1823, after this speech.",
      ],
      [
        "The Treaty of Alliance with France that Congress had approved during the Revolution",
        "That alliance was the kind of entanglement leaders now wished to avoid.",
      ],
      [
        "A plan to join the Holy Alliance of European monarchies in order to protect trade",
        "The Holy Alliance formed in 1815, and the United States did not join it.",
      ],
    ],
    why: "Leaders from Washington on warned against permanent alliances, and neutrality shaped policy during the wars of the French Revolution.",
    d: "The Monroe Doctrine choice is close because both statements concern foreign policy, but the Doctrine was announced more than twenty years later.",
    stim: excerpts.jeffersonInaugural,
  },
]);

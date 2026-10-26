// Original practice questions for Topic 3.8. q-numbered items are topic practice;
// t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("3.8", [
  {
    id: "q01",
    s: "convention-and-compromise",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-3.2.II.C.i"],
    q: "Which of the following was a difference between the Virginia Plan and the New Jersey Plan at the Constitutional Convention?",
    right:
      "The Virginia Plan based representation on population, while the New Jersey Plan gave each state an equal vote",
    at: 1,
    wrong: [
      [
        "The Virginia Plan gave each state equal representation, while the New Jersey Plan based seats in Congress on population",
        "This reverses the two plans.",
      ],
      [
        "The Virginia Plan kept the Articles of Confederation, while the New Jersey Plan created a monarchy",
        "Neither plan proposed a monarchy, and the Virginia Plan proposed a new government.",
      ],
      [
        "The Virginia Plan banned slavery in the states, while the New Jersey Plan allowed it everywhere",
        "Neither plan was mainly about slavery.",
      ],
    ],
    why: "Large states favored representation by population, and small states favored equal representation for each state.",
    d: "The reversed-plans choice is close because it uses the same terms, but it swaps which plan supported which kind of representation.",
  },
  {
    id: "q02",
    s: "convention-and-compromise",
    sub: "1.A",
    kc: ["KC-3.2.II.C.i"],
    q: "The Great Compromise at the Constitutional Convention created",
    right:
      "a House of Representatives based on population and a Senate with two members from each state",
    at: 0,
    wrong: [
      [
        "a Senate based on population and a House of Representatives with two members from each state",
        "This reverses the two houses.",
      ],
      [
        "a single house of Congress in which every state had one vote and a majority of states could pass a law",
        "The Great Compromise created two houses.",
      ],
      [
        "an executive council chosen by the states that held power instead of a single president",
        "The Great Compromise concerned representation in Congress.",
      ],
    ],
    why: "The compromise gave large states representation by population in the House and small states equal votes in the Senate.",
    d: "The reversed-houses choice is close because it names the same features, but it swaps the two houses.",
  },
  {
    id: "q03",
    s: "convention-and-compromise",
    sub: "1.B",
    kc: ["KC-3.2.II.D"],
    q: "Under the Three-Fifths Compromise at the Constitutional Convention,",
    right:
      "three-fifths of the enslaved population was counted for representation and for direct taxes",
    at: 3,
    wrong: [
      [
        "enslaved people were counted fully for representation but not for taxes in the Southern states",
        "Three-fifths of the enslaved population was counted for both representation and direct taxes.",
      ],
      [
        "enslaved people received three-fifths of the rights of free citizens, including the right to vote",
        "Enslaved people had no political rights.",
      ],
      [
        "Congress was required to end slavery in three-fifths of the states within a period of twenty years",
        "The compromise did not require any state to end slavery.",
      ],
    ],
    why: "The compromise increased the representation of the slave states in Congress and in the Electoral College by counting part of the enslaved population.",
    d: "The full-count choice is close because the South had wanted a full count, but the compromise was three-fifths.",
  },
  {
    id: "q04",
    s: "convention-and-compromise",
    sub: "1.B",
    kc: ["KC-3.2.II.D"],
    q: "Which of the following statements about the Constitution and the slave trade is accurate?",
    right:
      "The Constitution allowed Congress to prohibit the international slave trade after 1808",
    at: 2,
    wrong: [
      [
        "The Constitution banned the international slave trade immediately and ended slavery in the Deep South",
        "The Constitution did not ban the trade immediately.",
      ],
      [
        "The Constitution required Congress to protect the international slave trade for as long as any state wished",
        "The Constitution allowed Congress to prohibit the trade after 1808.",
      ],
      [
        "The Constitution gave each state the right to end slavery within a year if it voted to do so",
        "States could regulate slavery, but this provision was not part of the compromise on the slave trade.",
      ],
    ],
    why: "The delegates compromised by delaying any federal prohibition of the international slave trade until 1808.",
    d: "The immediate-ban choice is close because some delegates opposed the trade, but the delay was part of the compromise.",
  },
  {
    id: "q05",
    s: "convention-and-compromise",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.II.D"],
    q: "Which of the following best explains why the Constitution included protections for slavery?",
    right:
      "Delegates from the Deep South would not join the new government without them, and other delegates compromised to form a union",
    at: 1,
    wrong: [
      [
        "Most delegates at the Convention owned enslaved people and wanted slavery to continue in every state",
        "Many delegates opposed slavery or were uneasy about it, but compromised for union.",
      ],
      [
        "Britain required the protections as a condition of the Treaty of Paris and the return of the forts",
        "Britain did not require these protections.",
      ],
      [
        "The Anti-Federalists demanded the protections as a price for ending their opposition to the Constitution",
        "Anti-Federalists did not demand protections for slavery in return for ratification.",
      ],
    ],
    why: "Deep South delegates made clear that they would not accept a plan that threatened slavery, and the others chose compromise over failure.",
    d: "The delegates-owned-slaves choice is close because many delegates did, but the compromise was driven by the need to form a union.",
  },
  {
    id: "q06",
    s: "federalists-and-anti-federalists",
    sub: "1.B",
    kc: ["KC-3.2.II.E"],
    q: "Federalists supported ratification of the Constitution because they believed that",
    right:
      "a stronger national government with divided powers would protect liberty and could govern a large republic",
    at: 3,
    wrong: [
      [
        "the states should keep the powers they had under the Articles, with Congress acting only as an advisor to them",
        "This describes the position of many Anti-Federalists.",
      ],
      [
        "a bill of rights must be written first, and the government should not be formed until it was approved",
        "Federalists did not insist on a bill of rights before ratification.",
      ],
      [
        "republics work best in small communities where representatives stay close to the people they serve",
        "This describes the Anti-Federalist view.",
      ],
    ],
    why: "Federalists argued, as in the Federalist Papers, that a stronger government was needed and that dividing power would protect liberty.",
    d: "The bill-of-rights choice is close because the Bill of Rights became part of the deal, but Federalists first resisted adding one.",
  },
  {
    id: "q07",
    s: "federalists-and-anti-federalists",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-3.2.II.E"],
    q: "Which of the following was a main objection of the Anti-Federalists to the Constitution?",
    right:
      "A distant national government might threaten individual rights and state powers, and there was no bill of rights",
    at: 0,
    wrong: [
      [
        "The Constitution gave too much power to the states and left the national government unable to tax",
        "This was a complaint about the Articles and not the Constitution.",
      ],
      [
        "The Constitution made Congress a single house with one vote for each state, as the Articles had done",
        "The Constitution created a two-house Congress.",
      ],
      [
        "The Constitution did not allow the states to elect their senators, and it ended all of the state governments",
        "The Constitution did not end the state governments.",
      ],
    ],
    why: "Anti-Federalists, such as Patrick Henry and George Mason, feared a distant government and wanted explicit protections for individual rights.",
    d: "The too-much-state-power choice is close because it concerns the balance of power, but that was the Federalist complaint about the Articles.",
  },
  {
    id: "q08",
    s: "bill-of-rights",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.II.E"],
    q: "Which of the following best explains why the Bill of Rights was added to the Constitution?",
    right:
      "Federalists promised to add amendments protecting individual rights in order to win ratification",
    at: 2,
    wrong: [
      [
        "The Constitutional Convention included a bill of rights, but Congress removed it before the vote",
        "The Convention did not include a bill of rights.",
      ],
      [
        "Britain demanded that the United States protect individual rights as a condition of trade",
        "Britain did not make such a demand.",
      ],
      [
        "The Articles of Confederation had required that any new government include a list of rights",
        "The Articles did not require a bill of rights.",
      ],
    ],
    why: "Anti-Federalist opposition and the lack of a bill of rights threatened ratification, and Federalists agreed to add one.",
    d: "The Convention choice is close because many delegates wanted a bill of rights, but the Convention did not include one.",
  },
  {
    id: "t01",
    s: "federalists-and-anti-federalists",
    sub: "2.A",
    kc: ["KC-3.2.II.E"],
    q: "Which of the following best describes the point of view of the author of the excerpt?",
    right:
      "A supporter of ratification who believed a large republic would help control the dangers of faction",
    at: 1,
    wrong: [
      [
        "An opponent of the Constitution who believed the states were too weak to control the national government",
        "The author wrote in support of ratification.",
      ],
      [
        "A delegate who wished to return to the Articles of Confederation and to give Congress no power",
        "The author supports a stronger system.",
      ],
      [
        "A British official who hoped that the American republic would fail because of disputes among factions",
        "The author is an American advocate of the Constitution.",
      ],
    ],
    why: "The excerpt is from the Federalist Papers, a series of essays that argued for ratification of the Constitution.",
    d: "The opponent choice is close because the author discusses dangers to liberty, but the author argues that the Constitution will address them.",
    stim: excerpts.federalistTen,
  },
  {
    id: "t02",
    s: "federalists-and-anti-federalists",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.II.E"],
    q: "According to the author, why would extending the sphere of the republic reduce the danger of faction?",
    right:
      "A larger republic includes more parties and interests, so a single majority is less likely to act together against others",
    at: 3,
    wrong: [
      [
        "A larger republic would allow the national government to forbid any group from forming a party",
        "The author does not propose forbidding groups.",
      ],
      [
        "A larger republic would give each state an equal vote, which prevents any state from acting in its own interest",
        "The author does not discuss equal votes for states.",
      ],
      [
        "A larger republic would remove the need for elections, because the people would trust the government",
        "The author expects elections to continue and does not call for trust.",
      ],
    ],
    why: "The author argues that a greater variety of interests makes it less likely that a majority will share a common motive to invade others' rights.",
    d: "The forbid-parties choice is close because it addresses faction, but the author relies on variety and not prohibition.",
    stim: excerpts.federalistTen,
  },
  {
    id: "t03",
    s: "federalists-and-anti-federalists",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-3.2.II.E"],
    q: "Which of the following groups would most likely have opposed the argument in the excerpt?",
    right:
      "Anti-Federalists, who believed that republics worked best in small communities close to the people",
    at: 0,
    wrong: [
      [
        "Federalists, who believed that the Constitution should be ratified without any amendments",
        "Federalists wrote the Federalist Papers and agreed with the argument.",
      ],
      [
        "Loyalists, who believed that the colonies should have remained under British rule even after 1783",
        "Loyalists were not part of the debate over the Constitution.",
      ],
      [
        "Delegates from the large states, who wanted representation based on population in the House of Representatives",
        "Delegates from large states generally supported a stronger national government.",
      ],
    ],
    why: "Anti-Federalists argued that a large republic would be too distant from the people, which is the opposite of Madison's argument.",
    d: "The Federalists choice is close because Federalists argued over amendments, but they supported the argument in the excerpt.",
    stim: excerpts.federalistTen,
  },
]);

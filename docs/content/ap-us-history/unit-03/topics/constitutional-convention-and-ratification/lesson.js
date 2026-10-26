// Original Page One lesson for CED Topic 3.8.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.8", {
  summary:
    "How delegates bargained over representation and slavery at the Constitutional Convention, and how Federalists and Anti-Federalists argued over ratification until a Bill of Rights was promised.",
  minutes: 14,
  goals: [
    "Explain how compromise shaped the Constitution, including compromises over representation and slavery.",
    "Compare the positions of Federalists and Anti-Federalists on the structure and function of the federal government.",
    "Explain why the Bill of Rights was added.",
  ],
  bigIdea:
    "The Constitution was the product of negotiation and compromise, and its ratification depended on a promise to add a Bill of Rights.",
  context:
    "The CED asks you to explain the differing ideological positions on the structure and function of the federal government. Practice reading a claim and the evidence behind it, because stimulus questions on this topic ask you to match a document to a position.",
  sections: [
    section(
      "convention-and-compromise",
      "The Convention and its compromises",
      ["PCE", "GEO"],
      [
        "In the summer of 1787, delegates from twelve states met in Philadelphia, with Rhode Island absent, and through negotiation, collaboration, and compromise proposed a constitution. They had been called to revise the Articles of Confederation, but they wrote a new plan of government. George Washington presided, and James Madison's notes are the most complete record of the debates.",
        "The delegates first disagreed over representation. The Virginia Plan, supported by large states, called for a strong national government with representation based on population. The New Jersey Plan, supported by small states, called for a single house of Congress with equal representation for each state. The Great Compromise created a House of Representatives based on population and a Senate with two members from each state.",
        "The delegates also compromised over the representation of slave states in Congress and the role of the federal government in regulating both slavery and the slave trade. Under the Three-Fifths Compromise, three-fifths of the enslaved population would be counted for representation and direct taxes. The Constitution allowed the prohibition of the international slave trade after 1808, and it required the return of people who escaped slavery. Delegates from the Deep South made clear that they would not join the new government without such protections, and the compromises gave slavery a protected place in the new government.",
      ],
      "Compromises over representation and slavery made the Constitution possible, and the compromises over slavery gave the institution protection.",
    ),
    section(
      "federalists-and-anti-federalists",
      "Federalists and Anti-Federalists",
      ["PCE", "NAT"],
      [
        "When the Constitution was sent to the states for ratification, Anti-Federalists opposing ratification battled with Federalists, whose principles were articulated in the Federalist Papers, primarily written by Alexander Hamilton and James Madison, with John Jay. Federalists argued that a stronger national government was needed to govern a large country and that the new system would protect liberty by dividing power. In Federalist No. 10, Madison argued that a large republic would make it harder for a single faction to control the government, because there would be many competing interests.",
        "Anti-Federalists, among them Patrick Henry and George Mason, feared that a distant national government would threaten the rights of individuals and the powers of the states. Many believed that republics worked best in small communities where representatives stayed close to the people. They also objected that the Constitution had no bill of rights.",
        "Nine states had to approve the Constitution for it to take effect. Delaware ratified first, in December 1787, and New Hampshire became the ninth state in June 1788. The large states of Virginia and New York ratified after bitter debates.",
      ],
      "Federalists argued that a large republic with divided power would protect liberty, while Anti-Federalists feared distant, powerful government.",
    ),
    section(
      "bill-of-rights",
      "The Bill of Rights",
      ["PCE", "NAT"],
      [
        "Federalists ensured the ratification of the Constitution by promising the addition of a Bill of Rights that enumerated individual rights and explicitly restricted the powers of the federal government. Several states ratified with recommended amendments. In 1789 the First Congress, led by James Madison, proposed amendments, and ten of them were ratified in 1791. They protected freedom of religion, speech, press, and assembly, the right to bear arms, rights of the accused such as trial by jury, and reserved to the states and the people the powers not given to the federal government.",
        "The Bill of Rights answered a central Anti-Federalist objection and made the new government more acceptable to those who feared central power.",
        [
          "Common trap",
          "The Bill of Rights was not part of the Constitution as signed in 1787. It was added after ratification, as the price of winning support.",
        ],
      ],
      "The promise of a Bill of Rights secured ratification, and the first ten amendments limited the powers of the federal government.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.9",
      title: "What the Constitution created",
      body: "The compromises produced a government with a particular structure. Topic 3.9 follows that structure, including federalism and separation of powers.",
      transferQuestion:
        "How did the Federalist argument in Federalist No. 10 answer the fear that republics could not survive in a large country?",
      feedback:
        "A strong answer explains that a large republic includes many interests, so no single faction is likely to dominate.",
      links: [
        {
          topicId: "apush-3-7",
          sectionId: "government-under-the-articles",
          label: "Review problems under the Articles",
        },
      ],
    },
  ],
  sourceIds: ["federalist-1787", "constitution-1787"],
});

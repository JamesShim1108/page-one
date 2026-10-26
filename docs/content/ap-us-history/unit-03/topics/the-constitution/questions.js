// Original practice questions for Topic 3.9. q-numbered items are topic practice;
// t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("3.9", [
  {
    id: "q01",
    s: "federalism",
    sub: "1.A",
    kc: ["KC-3.2.II.C.ii"],
    q: "Federalism, as established by the Constitution, is a system in which",
    right:
      "power is divided between the national government and the state governments, each with its own sphere",
    at: 3,
    wrong: [
      [
        "all powers belong to the national government, and the states act only as administrative districts",
        "The states kept significant powers under the Constitution.",
      ],
      [
        "all powers belong to the states, and the national government can act only with the approval of each state",
        "This describes the Articles of Confederation more than the Constitution.",
      ],
      [
        "power is divided among three branches, and the states have no part in the national government",
        "This describes the separation of powers, and the states had roles in the national government.",
      ],
    ],
    why: "Federalism divides authority between the national government and the states, each of which has its own sphere of power.",
    d: "The three-branches choice is close because the Constitution does separate powers, but that is a different principle called the separation of powers.",
  },
  {
    id: "q02",
    s: "federalism",
    sub: "1.B",
    kc: ["KC-3.2.II.C.ii"],
    q: "Which of the following powers did the Constitution give to Congress that the Articles of Confederation had not given it?",
    right:
      "The power to tax and to regulate commerce among the states and with foreign nations",
    at: 1,
    wrong: [
      [
        "The power to make treaties with foreign nations without the approval of the Senate or the president",
        "The Constitution requires Senate approval of treaties.",
      ],
      [
        "The power to establish an official national church to unite the people of the different states",
        "The Constitution did not give Congress this power, and the First Amendment forbids it.",
      ],
      [
        "The power to appoint the governors of the states and to remove them from their offices",
        "The states kept their own governors.",
      ],
    ],
    why: "The power to tax and to regulate commerce addressed the weaknesses of the Articles.",
    d: "The treaty choice is close because Congress shares in foreign policy, but the Senate must approve treaties.",
  },
  {
    id: "q03",
    s: "federalism",
    sub: "1.B",
    kc: ["KC-3.2.II.C.ii"],
    q: "The Constitution's declaration that it is the “supreme law of the land” meant that",
    right:
      "valid federal laws override conflicting state laws, although the states keep powers not given to the nation",
    at: 0,
    wrong: [
      [
        "state laws take priority over federal laws whenever the two conflict within the borders of a state",
        "Valid federal law takes priority over conflicting state law.",
      ],
      [
        "the president can overrule any decision of a state court without the approval of Congress",
        "The supremacy clause does not give such power to the president.",
      ],
      [
        "each state must obtain the permission of Congress before it can pass any law within its borders",
        "States could pass laws on matters within their authority.",
      ],
    ],
    why: "Supremacy ensured that national law would prevail over state law in the areas where the Constitution gave power to the nation.",
    d: "The state-priority choice is close because it describes the Articles' approach, but the Constitution reversed it.",
  },
  {
    id: "q04",
    s: "continuity-and-change",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-3.2.II.C.ii"],
    q: "Which of the following was a difference between the Constitution and the Articles of Confederation?",
    right:
      "The Constitution allowed Congress to tax directly, while the Articles let Congress only ask the states for money",
    at: 2,
    wrong: [
      [
        "The Constitution gave each state one vote in Congress, while the Articles based votes on population",
        "The Articles gave each state one vote.",
      ],
      [
        "The Constitution had no executive branch, while the Articles created a president with broad powers",
        "The Constitution created the presidency, and the Articles had none.",
      ],
      [
        "The Constitution required unanimous consent to change it, while the Articles needed only a majority",
        "The Articles required unanimity for amendments, which the Constitution relaxed.",
      ],
    ],
    why: "The Constitution corrected one of the Articles' main weaknesses by giving Congress the power to raise its own revenue.",
    d: "The one-vote choice is close because representation changed, but it reverses what the two documents provided.",
  },
  {
    id: "q05",
    s: "separation-of-powers",
    sub: "1.B",
    kc: ["KC-3.2.II.C.ii"],
    q: "Which of the following is an example of a check that one branch of the national government has on another?",
    right:
      "The president can veto a bill, but Congress can override the veto with a two-thirds vote",
    at: 1,
    wrong: [
      [
        "The Supreme Court appoints the president, and the president approves the justices' decisions",
        "The president appoints justices with Senate approval.",
      ],
      [
        "Congress selects the members of the Supreme Court, and the Court approves the laws that Congress makes",
        "The president appoints justices, and the Senate confirms them.",
      ],
      [
        "The president makes laws for the nation, and Congress carries them out with the help of the states",
        "Congress makes laws, and the president carries them out.",
      ],
    ],
    why: "Each branch has powers that limit the others, which prevents any one branch from dominating.",
    d: "The Court-appoints choice is close because it names two branches, but it reverses who appoints whom.",
  },
  {
    id: "q06",
    s: "separation-of-powers",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.II.C.ii"],
    q: "Which of the following best explains why the framers divided power among three branches?",
    right:
      "They feared concentrated power, an idea drawn from republican thinkers and from experience with Britain",
    at: 2,
    wrong: [
      [
        "They wished to preserve the structure of the Articles, which had also created three separate branches",
        "The Articles created only a Congress.",
      ],
      [
        "They believed that the people could not be trusted with any role in electing the government",
        "The House was elected directly by voters.",
      ],
      [
        "They wished to make the national government as weak as possible to protect the states",
        "The framers wanted a government that was stronger than that under the Articles.",
      ],
    ],
    why: "Fear of concentrated power shaped a system in which each branch checks the others.",
    d: "The weak-government choice is close because the framers did fear power, but they also wanted the government to be effective.",
  },
  {
    id: "q07",
    s: "continuity-and-change",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-3.2.II.C.ii"],
    q: "Which of the following was a continuity between the Articles of Confederation and the Constitution?",
    right:
      "Both preserved the states and kept a republican form of government with elected legislatures",
    at: 3,
    wrong: [
      [
        "Both gave Congress the power to tax citizens and to regulate commerce among the states",
        "The Articles denied Congress these powers.",
      ],
      [
        "Both created a president who served as the head of the government and as commander of the army",
        "The Articles created no president.",
      ],
      [
        "Both set up a national court system with the power to decide disputes among the states",
        "The Articles created no national court system.",
      ],
    ],
    why: "The framers kept the republic and the states, and changed the structure and powers of the national government.",
    d: "The taxation choice is close because both were national governments, but only the Constitution gave the power to tax.",
  },
  {
    id: "q08",
    s: "federalism",
    sub: "1.B",
    kc: ["KC-3.2.II.C.ii"],
    q: "The “necessary and proper” clause of the Constitution is significant because it",
    right:
      "allowed Congress to make the laws needed to carry out its powers, which let the government grow",
    at: 0,
    wrong: [
      [
        "required Congress to ask the states for permission before it passed any law on taxes or on trade",
        "The clause allowed Congress to act without such permission.",
      ],
      [
        "limited the national government to the powers named in the Bill of Rights and no others",
        "The Bill of Rights is separate from the clause.",
      ],
      [
        "gave the president the power to issue orders that overrode the laws that Congress had passed",
        "The clause concerns the powers of Congress.",
      ],
    ],
    why: "The clause gave Congress flexibility, which is part of why the Constitution created a dynamic government.",
    d: "The Bill of Rights choice is close because the Tenth Amendment limits federal powers, but the clause itself expanded Congress's options.",
  },
  {
    id: "t01",
    s: "federalism",
    sub: "3.A",
    kc: ["KC-3.2.II.C.ii"],
    q: "Which of the following best summarizes the powers described in the excerpt?",
    right:
      "Congress could raise money and regulate commerce, which gave the nation powers it had lacked",
    at: 1,
    wrong: [
      [
        "Congress could appoint judges and decide cases between citizens of different states",
        "The excerpt does not mention appointing judges or deciding cases.",
      ],
      [
        "Congress could make laws for the states only if each state legislature approved of the laws",
        "The excerpt does not require state approval.",
      ],
      [
        "Congress could control the Indian tribes as sovereign nations and make laws for their territory",
        "The excerpt refers to the regulation of commerce with the tribes.",
      ],
    ],
    why: "The excerpt lists the powers to tax, to borrow, and to regulate commerce, which gave Congress financial and economic powers.",
    d: "The tribes choice is close because the tribes are mentioned, but the excerpt refers only to commerce with them.",
    stim: excerpts.constitutionPowers,
  },
  {
    id: "t02",
    s: "continuity-and-change",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-3.2.II.C.ii"],
    q: "Which of the following is a difference between the powers in the excerpt and the powers of Congress under the Articles of Confederation?",
    right: "Congress could now levy taxes directly and regulate trade among the states",
    at: 0,
    wrong: [
      [
        "Congress could now raise money only by asking the states for contributions",
        "This describes the Articles.",
      ],
      [
        "Congress could now regulate only trade with foreign nations and not trade within the country",
        "The excerpt includes commerce among the states.",
      ],
      [
        "Congress could now borrow money only with the unanimous approval of the state legislatures",
        "The excerpt gives Congress the power to borrow money.",
      ],
    ],
    why: "The Articles denied Congress the power to tax citizens or to regulate commerce, and the Constitution gave it both powers.",
    d: "The asking-for-contributions choice is close because it concerns money, but it describes the earlier system.",
    stim: excerpts.constitutionPowers,
  },
  {
    id: "t03",
    s: "continuity-and-change",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.II.C.ii"],
    q: "The powers described in the excerpt are best understood as a response to which of the following?",
    right:
      "Problems under the Articles, including war debts, trade barriers among states, and a lack of funds",
    at: 3,
    wrong: [
      [
        "The Proclamation of 1763, which had limited western settlement and angered colonists",
        "The Proclamation was issued by Britain before the Revolution.",
      ],
      [
        "The Stamp Act, which had taxed printed materials without the consent of the colonial assemblies",
        "The Stamp Act belonged to the colonial period.",
      ],
      [
        "The Alien and Sedition Acts, which had limited criticism of the government during the 1790s",
        "The Alien and Sedition Acts came after the Constitution.",
      ],
    ],
    why: "The framers gave Congress powers over revenue and commerce to remedy the financial and trade problems that had weakened the Confederation government.",
    d: "The Stamp Act choice is close because it also concerned taxes, but it was a British measure that the Constitution did not respond to.",
    stim: excerpts.constitutionPowers,
  },
]);

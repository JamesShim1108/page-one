// Original Page One lesson for CED Topic 3.9.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.9", {
  summary:
    "How the Constitution created a limited but dynamic national government through federalism and the separation of powers, and what it kept and changed from the Articles and from colonial government.",
  minutes: 12,
  goals: [
    "Explain how federalism divides power between the national and state governments.",
    "Explain how the separation of powers and checks and balances limit the national government.",
    "Explain the continuities and changes between the Articles of Confederation and the Constitution.",
  ],
  bigIdea:
    "The Constitution created a limited but dynamic central government that embodied federalism and provided for a separation of powers among three branches.",
  context:
    "The CED asks you to explain continuities and changes in the structure and functions of government with ratification of the Constitution. For each feature, ask what it kept from earlier governments and what it changed.",
  sections: [
    section(
      "federalism",
      "Federalism",
      ["PCE", "NAT"],
      [
        "Delegates from the states participated in the Constitutional Convention that created a limited but dynamic central government embodying federalism. Federalism divides power between the national government and the states. The Constitution gave Congress specific powers, which are called enumerated powers. Article I, Section 8 included the power to lay and collect taxes, to borrow money, and to regulate commerce with foreign nations, among the states, and with the Indian tribes. It also gave Congress the power to make all laws “necessary and proper” to carry out those powers, a clause that allowed the national government to grow in later years.",
        "The Constitution declared itself the supreme law of the land, which meant that valid federal law overrode conflicting state law. Powers not given to the national government remained with the states or the people, a principle later stated in the Tenth Amendment. States kept responsibility for much of daily life, including most criminal law, education, and local government.",
      ],
      "Federalism shares power between the national and state governments and gives the national government specific powers, including taxation and the regulation of commerce.",
    ),
    section(
      "separation-of-powers",
      "Separation of powers and checks and balances",
      ["PCE", "NAT"],
      [
        "The Constitution provided for a separation of powers among three branches. Congress, which makes laws, is divided into a House of Representatives and a Senate. The president, who carries out the laws, is chosen by an Electoral College, and the federal courts interpret the law. Each branch can check the others. The president can veto bills, Congress can override a veto and can impeach officials, the Senate approves treaties and appointments, including federal judges, and the courts decide cases under the Constitution and federal law.",
        "These arrangements reflected the fear of concentrated power that Revolutionary leaders had learned from republican thinkers and from Montesquieu. They also limited excessive popular influence. Senators were chosen by state legislatures and presidents were chosen by electors rather than by direct vote, so only the House was elected directly by voters.",
        "The process of amending the Constitution was made difficult but not impossible, which allowed it to change over time.",
      ],
      "Three branches with checks on one another limit the power of each, and indirect election limited the influence of popular majorities.",
    ),
    section(
      "continuity-and-change",
      "Continuities and changes from the Articles",
      ["PCE", "WXT"],
      [
        "The Constitution kept the republican form of government, the written framework, the states, and a Congress, and it kept many familiar features of colonial and state government, such as elected legislatures with two houses and a division of powers. The Constitution changed the structure of the national government. It created an executive and a national court system, gave the national government direct power to tax and to regulate commerce among the states, provided that federal law was supreme over state law, and replaced one vote per state with representation in the House based on population.",
        "Ratification therefore preserved the republican ideals of the Revolution while correcting the weaknesses that the Articles had shown. Its supporters considered it a stronger government that nonetheless remained limited by law.",
        [
          "Common trap",
          "The Constitution did not abolish state governments. It created a stronger national government on top of state governments that kept real power.",
        ],
      ],
      "The Constitution kept the republic and the states but gave the national government the structure and powers that the Articles had lacked.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.10",
      title: "Putting the Constitution into practice",
      body: "The Constitution's words had to be turned into working government. Topic 3.10 follows the presidencies of Washington and Adams and the first political parties.",
      transferQuestion:
        "Which feature of the Constitution do you think was the biggest change from the Articles of Confederation, and why?",
      feedback:
        "A strong answer names a specific feature, such as the power to tax or the creation of an executive, and ties it to a problem under the Articles.",
      links: [
        {
          topicId: "apush-3-7",
          sectionId: "government-under-the-articles",
          label: "Review the Articles of Confederation",
        },
      ],
    },
  ],
  sourceIds: ["constitution-1787"],
});

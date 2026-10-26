// Original practice questions for Topic 3.7. q-numbered items are topic practice;
// t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("3.7", [
  {
    id: "q01",
    s: "state-constitutions",
    sub: "1.A",
    kc: ["KC-3.2.II.A"],
    q: "Which of the following describes many of the new state constitutions written after 1776?",
    right:
      "They placed the most power in the legislature and kept property requirements for voting and citizenship",
    at: 2,
    wrong: [
      [
        "They gave governors the power to veto laws and to dismiss the legislatures whenever they disagreed",
        "Most states limited the powers of their governors.",
      ],
      [
        "They gave every adult resident the right to vote, regardless of property or sex, and ended all restrictions",
        "Most states kept property qualifications for voting.",
      ],
      [
        "They created a single national legislature that governed all of the states through appointed councils",
        "State constitutions created state governments.",
      ],
    ],
    why: "Americans feared executive power, so most states made the legislature the strongest branch, and many continued to limit voting to property owners.",
    d: "The universal-suffrage choice is close because the state constitutions spoke of rights, but they kept property qualifications.",
  },
  {
    id: "q02",
    s: "state-constitutions",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.II.A"],
    q: "Which of the following best explains why most states gave their governors limited powers in the new state constitutions?",
    right:
      "Americans feared concentrated executive power after their experience with royal governors and the king",
    at: 1,
    wrong: [
      [
        "British officials required the states to limit their governors as a condition of the Treaty of Paris",
        "The treaty did not set terms for state governments.",
      ],
      [
        "State legislatures had often failed to pass laws, and voters wanted a stronger executive to replace them",
        "Voters distrusted executives more than legislatures.",
      ],
      [
        "The Articles of Confederation ordered the states to give most of their powers to the Congress",
        "The Articles left most powers with the states.",
      ],
    ],
    why: "The colonists' experience with the Crown and royal governors made them wary of a strong executive.",
    d: "The treaty choice is close because the treaty ended the war, but Americans chose their own state governments.",
  },
  {
    id: "q03",
    s: "government-under-the-articles",
    sub: "1.A",
    kc: ["KC-3.2.II.B"],
    q: "Under the Articles of Confederation, the national government",
    right:
      "consisted of a Congress in which each state had one vote, with no president and no national courts",
    at: 0,
    wrong: [
      [
        "had a president elected by the people who could veto laws passed by the Congress of the states",
        "The Articles created no president.",
      ],
      [
        "had a two-house Congress in which seats were awarded by population and laws passed by majority vote",
        "Congress had one house with one vote per state.",
      ],
      [
        "had a supreme court that could overturn state laws and enforce the treaties that Congress made",
        "The Articles created no national court system.",
      ],
    ],
    why: "The Articles created a central government with limited power, in which Congress was the only branch and the states kept most authority.",
    d: "The two-house choice is close because it describes the later Congress, but the Articles created a single house.",
  },
  {
    id: "q04",
    s: "government-under-the-articles",
    sub: "1.B",
    kc: ["KC-3.2.II.B"],
    q: "Which of the following was a major weakness of the national government under the Articles of Confederation?",
    right:
      "Congress could not tax citizens or regulate trade among the states, and it relied on the states for money",
    at: 3,
    wrong: [
      [
        "Congress controlled the state militias, and the states could not raise troops of their own for defense",
        "The states kept control of their militias.",
      ],
      [
        "The president could dismiss Congress, and no law could pass without his approval in each session",
        "No president existed under the Articles, so no executive could dismiss Congress.",
      ],
      [
        "Congress could change the Articles whenever a majority of the states voted in favor of a change",
        "Amendments required the agreement of all thirteen states.",
      ],
    ],
    why: "Without the power to tax or regulate commerce, Congress depended on the states and could not solve the nation's financial and trade problems.",
    d: "The amendment choice is close because it concerns a weakness in the Articles, but the requirement was unanimity and not a majority.",
  },
  {
    id: "q05",
    s: "government-under-the-articles",
    sub: "1.A",
    kc: ["KC-3.2.II.B"],
    q: "Shays' Rebellion of 1786–1787 is best described as",
    right:
      "an uprising of indebted farmers in western Massachusetts who closed courts to stop foreclosures",
    at: 1,
    wrong: [
      [
        "a revolt of Loyalists in New York who tried to return the state to British rule after the war",
        "Shays' Rebellion was a protest of indebted farmers and not a Loyalist revolt.",
      ],
      [
        "a protest by western Pennsylvania farmers against the federal excise tax on whiskey in 1794",
        "This describes the Whiskey Rebellion of 1794.",
      ],
      [
        "a rebellion of enslaved people in Virginia that led the state to tighten its slave laws",
        "Shays' Rebellion was in Massachusetts and was not a rebellion of enslaved people.",
      ],
    ],
    why: "The rebellion frightened many leaders because the national government could not help the state put it down, and it persuaded many that a stronger government was needed.",
    d: "The Whiskey Rebellion choice is close because both involved farmers, but it took place in the 1790s under the Constitution.",
  },
  {
    id: "q06",
    s: "government-under-the-articles",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.II.B"],
    q: "Which of the following best explains why many leaders called for a stronger national government in the 1780s?",
    right:
      "Difficulties with trade, finances, interstate commerce, foreign relations, and unrest under the Articles",
    at: 2,
    wrong: [
      [
        "Britain had threatened to reconquer the states unless Congress created a national army with a king as commander",
        "Britain did not threaten reconquest on these terms.",
      ],
      [
        "The Northwest Ordinance had failed to organize the western lands, and settlers demanded the return of British rule",
        "The Northwest Ordinance was one of the successes of the Confederation Congress.",
      ],
      [
        "The state legislatures had grown so strong that they asked Congress to abolish all state governments",
        "The states did not ask to abolish their own governments.",
      ],
    ],
    why: "The Confederation government struggled with debt, trade, foreign relations, and disorder, and many leaders concluded that it needed more power.",
    d: "The Northwest Ordinance choice is close because the ordinance was a Confederation action, but it was a success and not a reason for change.",
  },
  {
    id: "q07",
    s: "northwest-ordinance",
    sub: "1.B",
    kc: ["KC-3.3.I.C"],
    q: "The Northwest Ordinance of 1787 did which of the following?",
    right:
      "Provided a path to statehood, promoted education and private property, and banned slavery in the territory",
    at: 3,
    wrong: [
      [
        "Allowed the settlers in the Northwest to decide whether slavery would be legal in each new state",
        "The ordinance banned slavery in the Northwest Territory.",
      ],
      [
        "Recognized the land claims of American Indian nations and prohibited any settlement north of the Ohio River",
        "The ordinance did not recognize Native land claims, and settlers moved into the region.",
      ],
      [
        "Kept the western lands under the control of the original states, which governed them as colonies",
        "The ordinance provided for admission of new states on equal terms.",
      ],
    ],
    why: "The ordinance set up a process for governing the territory north of the Ohio River and admitting new states, and it set principles for education, property, and slavery.",
    d: "The slavery choice is close because slavery was debated, but the ordinance banned it in the Northwest Territory.",
  },
  {
    id: "q08",
    s: "state-constitutions",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-3.2.II.A", "KC-3.2.II.B"],
    q: "Which of the following was a similarity between most state governments and the national government under the Articles?",
    right:
      "Both placed the main power in the legislature and kept the executive weak or nonexistent",
    at: 0,
    wrong: [
      [
        "Both gave the executive the power to appoint judges and to veto all laws passed by the legislature",
        "Both kept executives weak.",
      ],
      [
        "Both required every citizen to pay taxes to the national government at rates set by Congress",
        "Congress could not tax citizens directly.",
      ],
      [
        "Both created national courts with the power to overturn the actions of the state governments",
        "The Articles created no national courts.",
      ],
    ],
    why: "Americans were afraid of strong executives, so both the state constitutions and the Articles placed authority in legislatures.",
    d: "The taxation choice is close because both governments needed money, but under the Articles Congress had to ask the states for it.",
  },
  {
    id: "t01",
    s: "government-under-the-articles",
    sub: "3.A",
    kc: ["KC-3.2.II.B"],
    q: "Which of the following claims about the national government is best supported by the table?",
    right: "It depended on the states for money and for approval of important decisions",
    at: 2,
    wrong: [
      [
        "It could tax citizens directly but was unable to raise an army or to conduct foreign relations",
        "The table says Congress could not tax citizens.",
      ],
      [
        "It was led by a president who could veto laws and who appointed judges to a national court system",
        "The table shows no president and no national courts.",
      ],
      [
        "It was able to change its own structure by a majority vote of the members of Congress",
        "The table says all thirteen states had to approve any change.",
      ],
    ],
    why: "The table shows that Congress could only ask the states for money and that important laws needed nine states, while changes needed all thirteen.",
    d: "The taxation choice is close because it names a power in question, but the table says Congress could not tax citizens.",
    stim: excerpts.originalArticlesTable,
  },
  {
    id: "t02",
    s: "government-under-the-articles",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.II.B"],
    q: "Which of the following problems most directly resulted from the feature listed in the table under “Taxes”?",
    right:
      "The national government struggled to pay its war debts and to fund its operations",
    at: 1,
    wrong: [
      [
        "Settlers in the Northwest Territory were allowed to hold enslaved people without any restriction",
        "The Northwest Ordinance banned slavery, and the ban was not related to taxes.",
      ],
      [
        "Britain kept its troops in the forts in the Northwest because the states refused to hold elections",
        "British forts remained for other reasons and not because of state elections.",
      ],
      [
        "The state governments lost their authority over local matters, including schools and courts",
        "The states kept their authority under the Articles.",
      ],
    ],
    why: "Because Congress could only ask the states for money, it was often short of funds to pay debts and run the government.",
    d: "The forts choice is close because it was also a problem under the Articles, but it was not caused by the taxing power.",
    stim: excerpts.originalArticlesTable,
  },
  {
    id: "t03",
    s: "state-constitutions",
    sub: "4.A",
    kc: ["KC-3.2.II.B"],
    q: "The limits on the national government shown in the table are best understood in the context of which of the following?",
    right:
      "Americans' fear of concentrated power after their experience with the British Crown and Parliament",
    at: 0,
    wrong: [
      [
        "The Constitutional Convention's decision to keep the powers of the states and the nation separate",
        "The table describes the Articles, which came before the Constitutional Convention.",
      ],
      [
        "A wish to create a hereditary monarchy that would rule the states after the Treaty of Paris",
        "Americans rejected monarchy.",
      ],
      [
        "The need to pay for a large army to defend the western territories against the French in the 1780s",
        "France had given up its claims to the interior in 1763.",
      ],
    ],
    why: "Having fought against a powerful central authority, many Americans designed a government that would have little power over the states.",
    d: "The Convention choice is close because it also concerned the division of power, but the Articles preceded the Convention.",
    stim: excerpts.originalArticlesTable,
  },
]);

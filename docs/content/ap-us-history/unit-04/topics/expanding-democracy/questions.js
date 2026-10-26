// Original practice questions for Topic 4.7. q-numbered items are topic practice;
// t-numbered items belong to the Unit 4 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("4.7", [
  {
    id: "q01",
    s: "ending-property-requirements",
    sub: "1.A",
    kc: ["KC-4.1.I"],
    q: "By the 1840s, which of the following was true of voting qualifications in most states?",
    right: "Property requirements for white men had been dropped",
    at: 2,
    wrong: [
      [
        "Property requirements had been replaced by literacy tests for all white men",
        "Literacy tests became common much later.",
      ],
      [
        "Free Black men could vote on the same terms as white men in most states",
        "Many states restricted or denied the vote to free Black men.",
      ],
      [
        "Women who owned property could vote in local elections in most states",
        "Women could not vote in most states.",
      ],
    ],
    why: "New states entered with few restrictions and older states revised their constitutions, so most white men could vote without owning property.",
    d: "The literacy test choice is close because it also replaced property tests in some states later, but not in the 1840s.",
  },
  {
    id: "q02",
    s: "party-politics-and-participation",
    sub: "1.A",
    kc: ["KC-4.1.I"],
    q: "The Anti-Masonic Party's national convention in 1831 was significant because it",
    right: "introduced the nominating convention that other parties then adopted",
    at: 1,
    wrong: [
      [
        "established the first national political party in the history of the United States",
        "National parties had existed since the 1790s.",
      ],
      [
        "ended the use of the Electoral College as a method of choosing presidents",
        "The Electoral College remained.",
      ],
      [
        "marked the first time that the House of Representatives chose a president",
        "The House first chose a president in 1801.",
      ],
    ],
    why: "Conventions replaced congressional caucuses and gave parties a more open way to name candidates.",
    d: "The first party choice is close because the Anti-Masonic Party was a new party, but the Federalists and Democratic-Republicans came earlier.",
  },
  {
    id: "q03",
    s: "ending-property-requirements",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.I"],
    q: "Which of the following best explains the movement to end property requirements for voting?",
    right:
      "Wage earners without land and new western states pressed for an equal political voice",
    at: 0,
    wrong: [
      [
        "Wealthy landowners demanded a larger electorate to protect their estates from taxes",
        "Landowners generally defended the older requirements.",
      ],
      [
        "Congress ordered every state to change its constitution by passing a federal law",
        "States decided their own voting rules.",
      ],
      [
        "The Supreme Court ruled that property requirements violated the First Amendment",
        "The Court did not make such a ruling.",
      ],
    ],
    why: "Men who paid taxes and served in the militia argued that they deserved a vote, and competing parties sought their support.",
    d: "The landowners choice is close because some wealthy leaders supported change, but the pressure came from workers and the West.",
  },
  {
    id: "q04",
    s: "party-politics-and-participation",
    sub: "1.B",
    kc: ["KC-4.1.I"],
    q: "Jackson's supporters charged a “corrupt bargain” after the election of 1824 because",
    right:
      "Adams, chosen by the House, named Clay secretary of state although Jackson led in votes",
    at: 3,
    wrong: [
      [
        "the Senate refused to count the electoral votes that had given Jackson a majority",
        "No candidate had a majority of the electoral votes.",
      ],
      [
        "Clay had withdrawn from the race and then received a cabinet post from Jackson",
        "Clay received the cabinet post from Adams.",
      ],
      [
        "Adams had won the most popular votes, but the Supreme Court awarded the office to Jackson",
        "The House, and not the Court, chose the president.",
      ],
    ],
    why: "Since no candidate won a majority, the House decided the election, and the appointment of Clay looked like a deal to Jackson's supporters.",
    d: "The Senate choice is close because the Senate counts electoral votes, but no one had a majority in 1824.",
  },
  {
    id: "q05",
    s: "party-politics-and-participation",
    sub: "1.A",
    kc: ["KC-4.1.I"],
    q: "Which of the following describes voter turnout in presidential elections between 1824 and 1840?",
    right:
      "It rose sharply, from about a quarter of eligible voters to about eighty percent",
    at: 1,
    wrong: [
      [
        "It fell as property requirements ended and fewer men saw a reason to vote",
        "Turnout increased.",
      ],
      [
        "It stayed near one-half of the electorate in each election during these years",
        "Turnout changed dramatically.",
      ],
      [
        "It rose among women, who voted in large numbers in the election of 1840",
        "Women could not vote.",
      ],
    ],
    why: "Mass campaigns and a larger electorate raised participation to a very high level by 1840.",
    d: "The steady-turnout choice is close because turnout was about half in 1828, but it was lower in 1824 and higher in 1840.",
  },
  {
    id: "q06",
    s: "limits-of-democracy",
    sub: "1.B",
    kc: ["KC-4.1.I"],
    q: "Which of the following limited the expansion of democracy in the early 1800s?",
    right:
      "Many states took the vote away from free Black men while giving it to all white men",
    at: 2,
    wrong: [
      [
        "Congress banned white men without property from voting in federal elections",
        "The states controlled voting qualifications.",
      ],
      [
        "State constitutions required every voter to join a political party and to pay dues",
        "No state required party membership.",
      ],
      [
        "Federal courts ended elections in the Western territories until they became states",
        "Territorial elections continued.",
      ],
    ],
    why: "As white men gained the vote, states such as Pennsylvania took it from free Black men, and women and American Indians stayed outside.",
    d: "The federal ban choice is close because Congress did set some rules for territories, but voting rights were set by the states.",
  },
  {
    id: "q07",
    s: "limits-of-democracy",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-4.1.I"],
    q: "Which of the following describes a difference in voting rights in the 1830s?",
    right:
      "Most states ended property tests for white men but many limited free Black men",
    at: 3,
    wrong: [
      [
        "Free Black men could vote in every state, while white men needed property to vote",
        "The rights were reversed.",
      ],
      [
        "White women could vote in most states, while free Black women could not",
        "White women could not vote in most states.",
      ],
      [
        "American Indians voted in all states, while white men needed to own property",
        "American Indians were not citizens and could not vote.",
      ],
    ],
    why: "Democracy grew for white men, but free Black men lost or never gained equal voting rights in many states.",
    d: "The reversed-rights choice is close because it uses the same two groups, but white men had broader rights.",
  },
  {
    id: "q08",
    s: "party-politics-and-participation",
    sub: "4.A",
    kc: ["KC-4.1.I"],
    q: "The growth of party rallies, parades, and campaign newspapers is best understood in the context of which of the following?",
    right:
      "A larger electorate that parties had to reach and persuade across many states",
    at: 0,
    wrong: [
      [
        "A federal ban on private political organizations that forced parties to work in secret",
        "No such ban existed.",
      ],
      [
        "A decline in voter interest that led parties to hold events to keep their members",
        "Voter interest grew.",
      ],
      [
        "The end of the Electoral College and the direct election of the president by Congress",
        "The Electoral College remained.",
      ],
    ],
    why: "As more men could vote, parties turned to mass campaigns to win them.",
    d: "The declining interest choice is close because campaigns were designed to raise interest, but participation was growing.",
  },
  {
    id: "t01",
    s: "ending-property-requirements",
    sub: "3.B",
    kc: ["KC-4.1.I"],
    q: "Which of the following is the main argument that Tocqueville makes in the excerpt?",
    right:
      "Once a nation begins to widen the right to vote, it will not stop short of giving it to all",
    at: 1,
    wrong: [
      [
        "Nations that widen the right to vote usually return to property requirements after a short time",
        "He says the process rarely reverses.",
      ],
      [
        "Wealthy voters will always protect their power by preventing any extension of the vote",
        "He says the push for wider voting grows stronger.",
      ],
      [
        "A nation can safely extend the vote to some groups and then stop the process",
        "He argues that no stop can be made.",
      ],
    ],
    why: "Tocqueville says that after each concession the democracy gains strength and its demands increase, until universal suffrage is reached.",
    d: "The safe-stopping choice is close because it addresses the same process, but Tocqueville says that stopping is not possible.",
    stim: excerpts.tocquevilleSuffrage,
  },
  {
    id: "t02",
    s: "ending-property-requirements",
    sub: "2.C",
    kc: ["KC-4.1.I"],
    q: "Which of the following best explains why Tocqueville's observations are useful to historians of American democracy?",
    right: "He was a foreign traveler who compared the United States with Europe",
    at: 2,
    wrong: [
      [
        "He was an elected official who helped to write the state constitutions of the 1820s",
        "He was a visitor from France and not an American official.",
      ],
      [
        "He was a former president who had directed the changes in suffrage after 1800",
        "He was never president of the United States.",
      ],
      [
        "He was a Southern planter whose experience shows the views of the enslaved",
        "He was not a planter, and he wrote as a French traveler.",
      ],
    ],
    why: "An observer from another society could notice patterns that Americans took for granted, though his account reflects his own point of view.",
    d: "The official choice is close because he wrote about politics, but he was a French visitor and not a participant in American government.",
    stim: excerpts.tocquevilleSuffrage,
  },
  {
    id: "t03",
    s: "ending-property-requirements",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.I"],
    q: "Which of the following developments before 1835 best illustrates the trend Tocqueville describes?",
    right:
      "New western states and older states dropped property requirements for white men",
    at: 3,
    wrong: [
      [
        "Congress passed a law that gave the vote to women who owned property in every state",
        "Congress did not give women the vote.",
      ],
      [
        "Southern states ended slavery in order to give the right to vote to more people",
        "Southern states did not end slavery in these years.",
      ],
      [
        "The Supreme Court ruled that all citizens had an equal right to vote in federal elections",
        "No such ruling was made.",
      ],
    ],
    why: "The extension of the vote to white men without property is the trend that Tocqueville describes.",
    d: "The women's vote choice is close because it also describes an extension of voting, but it did not occur in this period.",
    stim: excerpts.tocquevilleSuffrage,
  },
]);

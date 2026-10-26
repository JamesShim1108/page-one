// Original practice questions for Topic 4.11. q-numbered items are topic practice;
// t-numbered items belong to the Unit 4 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("4.11", [
  {
    id: "q01",
    s: "voluntary-organizations-and-reform",
    sub: "1.A",
    kc: ["KC-4.1.III.A"],
    q: "The American Temperance Society (1826) sought to",
    right: "reduce drinking, which reformers blamed for poverty and family suffering",
    at: 3,
    wrong: [
      [
        "end the sale of alcohol throughout the nation by passing a federal law",
        "It was a voluntary society that urged people to change their habits.",
      ],
      [
        "end slavery by boycotting goods made by enslaved laborers in the South",
        "That was a goal of abolitionists.",
      ],
      [
        "raise money for asylums and prisons through taxes on alcohol sold in the cities",
        "Its goal was to reduce drinking.",
      ],
    ],
    why: "Temperance reformers tried to change individual behavior and improve society through voluntary action.",
    d: "The federal law choice is close because later reformers pressed for prohibition laws, but the Society relied on persuasion.",
  },
  {
    id: "q02",
    s: "voluntary-organizations-and-reform",
    sub: "1.A",
    kc: ["KC-4.1.III.A"],
    q: "Horace Mann's reform work in Massachusetts was mainly aimed at",
    right: "building public schools and improving the training of teachers",
    at: 1,
    wrong: [
      [
        "creating asylums to care for the mentally ill and reforming conditions in prisons",
        "That was the work of Dorothea Dix.",
      ],
      [
        "ending child labor in the textile mills of Lowell and other New England towns",
        "Mann focused on schools.",
      ],
      [
        "founding colleges that admitted only women and trained them for political office",
        "His goal was common schools for children.",
      ],
    ],
    why: "Mann argued that free public schools would educate citizens and promote opportunity.",
    d: "The asylums choice is close because both were reformers in Massachusetts in the same years, but Dix worked on asylums.",
  },
  {
    id: "q03",
    s: "voluntary-organizations-and-reform",
    sub: "1.B",
    kc: ["KC-4.1.II.A.ii"],
    q: "Utopian communities such as New Harmony and Brook Farm",
    right: "tried to create model societies based on cooperation and shared ideals",
    at: 0,
    wrong: [
      [
        "were founded to enforce temperance laws and to punish the sale of alcohol",
        "They were experiments in communal living.",
      ],
      [
        "were settlements for free Black Americans who had left the Northern states",
        "They were not designed for that purpose.",
      ],
      [
        "were military forts built by the army to defend the frontier against Native nations",
        "They were not military outposts.",
      ],
    ],
    why: "These communities sought to show that people could live in more equal and cooperative ways.",
    d: "The temperance laws choice is close because many utopians were reformers, but their aim was to build model communities.",
  },
  {
    id: "q04",
    s: "voluntary-organizations-and-reform",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.II.A.ii"],
    q: "Which of the following helped to cause the growth of reform movements in the 1820s through the 1840s?",
    right: "The Second Great Awakening's stress on moral improvement",
    at: 2,
    wrong: [
      [
        "A decline in religious feeling that led Americans to look to government for answers",
        "Religious feeling increased.",
      ],
      [
        "Federal laws that required states to fund every voluntary reform organization",
        "Reform groups were mostly private.",
      ],
      [
        "A shortage of newspapers that kept Americans from learning about social problems",
        "Newspapers and pamphlets spread rapidly.",
      ],
    ],
    why: "Revivalist preaching encouraged believers to improve themselves and their communities, and many turned to reform.",
    d: "The declining religion choice is close because it also links religion to reform, but religion was growing.",
  },
  {
    id: "q05",
    s: "abolition-and-antislavery",
    sub: "1.A",
    kc: ["KC-4.1.III.B.i"],
    q: "Which of the following describes the status of slavery in the North by the 1820s?",
    right: "Most Northern states had ended slavery or set it on a path to gradual ending",
    at: 1,
    wrong: [
      [
        "Slavery was growing rapidly in every Northern state as the cotton trade expanded",
        "Cotton slavery grew in the South.",
      ],
      [
        "Northern states required free Black people to move to the South to find work",
        "Free Black communities grew in the North.",
      ],
      [
        "Congress had abolished slavery in every state north of the Mason-Dixon line",
        "Northern states ended slavery by their own laws.",
      ],
    ],
    why: "Gradual emancipation laws in the North contributed to a growing free African American population.",
    d: "The Congress choice is close because Congress did regulate slavery in territories, but states abolished it in the North.",
  },
  {
    id: "q06",
    s: "abolition-and-antislavery",
    sub: "1.B",
    kc: ["KC-4.1.III.B.i"],
    q: "William Lloyd Garrison's newspaper The Liberator (1831) was important because it",
    right:
      "demanded immediate emancipation and helped to launch a more radical abolitionist movement",
    at: 3,
    wrong: [
      [
        "proposed sending free Black people to Africa through the American Colonization Society",
        "Garrison opposed colonization.",
      ],
      [
        "argued that slavery should be left to the Southern states to end in their own time",
        "He rejected gradual approaches.",
      ],
      [
        "recommended that the federal government buy the freedom of enslaved people",
        "Garrison demanded immediate emancipation.",
      ],
    ],
    why: "Garrison and the American Anti-Slavery Society (1833) called slavery a sin and demanded its immediate end.",
    d: "The colonization choice is close because it concerns early antislavery opinion, but Garrison attacked that approach.",
  },
  {
    id: "q07",
    s: "abolition-and-antislavery",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-4.1.III.B.i"],
    q: "Which of the following describes a difference between the American Colonization Society and the abolitionists of the 1830s?",
    right:
      "The Society backed colonization in Africa, while abolitionists demanded immediate freedom",
    at: 0,
    wrong: [
      [
        "The Society demanded immediate emancipation, while abolitionists favored colonization",
        "The groups held the reverse positions.",
      ],
      [
        "The Society favored equal rights for all African Americans, while abolitionists opposed them",
        "Abolitionists, not the Society, were the more radical supporters of equality.",
      ],
      [
        "The Society wanted to expand slavery into the West, while abolitionists wished to end it",
        "The Society did not seek to expand slavery.",
      ],
    ],
    why: "The Society's plan to colonize free Black people in Africa was rejected by most African Americans and by radical abolitionists.",
    d: "The reversed positions choice is close because it names the same two programs, but they are assigned to the wrong groups.",
  },
  {
    id: "q08",
    s: "womens-rights",
    sub: "1.B",
    kc: ["KC-4.1.III.C"],
    q: "The Seneca Falls Convention (1848) is significant because it",
    right: "issued a Declaration of Sentiments listing women's grievances",
    at: 2,
    wrong: [
      [
        "won women the right to vote in New York State, which other states then copied",
        "Women did not win the vote in New York in 1848.",
      ],
      [
        "led Congress to pass the Nineteenth Amendment in the years that followed",
        "That amendment was ratified in 1920.",
      ],
      [
        "was organized by male abolitionists who declined to let women speak at the meeting",
        "Women organized the convention and spoke.",
      ],
    ],
    why: "The Declaration of Sentiments was modeled on the Declaration of Independence and listed the ways that women were denied rights.",
    d: "The voting rights choice is close because suffrage was a demand at Seneca Falls, but women did not gain the vote then.",
  },
  {
    id: "q09",
    s: "womens-rights",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.III.C"],
    q: "Which of the following best explains why many early women's rights leaders came from the abolitionist and temperance movements?",
    right:
      "They gained experience in organizing but were often kept from speaking or voting",
    at: 1,
    wrong: [
      [
        "Those movements required their members to demand the vote before joining",
        "The movements did not make that demand.",
      ],
      [
        "Women had been banned from reform groups until the Seneca Falls Convention",
        "Women had taken part in reform groups for years.",
      ],
      [
        "The federal government had asked women to lead the movement against slavery",
        "The government made no such request.",
      ],
    ],
    why: "Women learned how to organize and speak in reform groups and then questioned their own lack of rights.",
    d: "The ban choice is close because women faced limits in these groups, but they were not banned from joining.",
  },
  {
    id: "t01",
    s: "womens-rights",
    sub: "3.A",
    kc: ["KC-4.1.III.C"],
    q: "Which of the following claims about the status of women is best supported by the excerpt?",
    right:
      "Women were denied the vote and were governed by laws that they had no voice in making",
    at: 3,
    wrong: [
      [
        "Women had won the vote in state elections but were denied the right to hold office",
        "The excerpt says that women had never been permitted to vote.",
      ],
      [
        "Women's rights were already protected by the Constitution and by the state laws",
        "The excerpt says that men had withheld rights from women.",
      ],
      [
        "Women could vote in national elections but were denied a voice in local government",
        "The excerpt says women were denied the franchise.",
      ],
    ],
    why: "The excerpt says that man “has never permitted her” to vote and has compelled her to submit to laws she had no voice in forming.",
    d: "The state elections choice is close because the excerpt discusses voting, but it says that women had never voted.",
    stim: excerpts.senecaSentiments,
  },
  {
    id: "t02",
    s: "womens-rights",
    sub: "3.B",
    kc: ["KC-4.1.III.C"],
    q: "Which of the following does the excerpt use as evidence for its claim that men have tried to establish “an absolute tyranny” over women?",
    right:
      "A list of the rights withheld from women, including the vote and a voice in making laws",
    at: 1,
    wrong: [
      [
        "Statistics on the number of women who worked in factories and in the mill towns",
        "The excerpt gives no statistics.",
      ],
      [
        "Testimony from enslaved women about their treatment under the laws of the South",
        "The excerpt contains no such testimony.",
      ],
      [
        "A comparison of the rights of women in the United States and in European monarchies",
        "The excerpt makes no comparison with Europe.",
      ],
    ],
    why: "The authors support their claim with specific injuries, such as denying women the franchise and imposing laws they had no voice in forming.",
    d: "The factory statistics choice is close because the excerpt is about women's status, but it lists rights denied and not wages.",
    stim: excerpts.senecaSentiments,
  },
  {
    id: "t03",
    s: "womens-rights",
    sub: "2.A",
    kc: ["KC-4.1.III.C"],
    q: "The authors most likely modeled the excerpt on the Declaration of Independence in order to",
    right: "present women's rights as an extension of the nation's founding principles",
    at: 2,
    wrong: [
      [
        "show that the movement was loyal to the British Crown and to its laws",
        "The Declaration of Independence rejected the Crown.",
      ],
      [
        "avoid asking for the vote, which the authors considered too radical a demand",
        "The excerpt demands the franchise.",
      ],
      [
        "ask Congress to rewrite the Declaration of Independence to include women",
        "The excerpt does not ask for a rewriting of the document.",
      ],
    ],
    why: "By echoing the Declaration, the authors used a familiar American text to argue that its promise of equality should include women.",
    d: "The loyalty choice is close because the excerpt copies the style of a document about a king, but its aim was women's equality.",
    stim: excerpts.senecaSentiments,
  },
]);

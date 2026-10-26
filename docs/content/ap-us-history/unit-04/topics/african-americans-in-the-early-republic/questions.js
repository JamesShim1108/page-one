// Original practice questions for Topic 4.12. q-numbered items are topic practice;
// t-numbered items belong to the Unit 4 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("4.12", [
  {
    id: "q01",
    s: "slavery-and-resistance",
    sub: "1.A",
    kc: ["KC-4.1.III.B.ii"],
    q: "Which of the following describes the antislavery efforts of enslaved people in the South between 1800 and 1848?",
    right: "They were largely limited to rebellions and plots that did not succeed",
    at: 2,
    wrong: [
      [
        "They led several Southern states to end slavery by law before the Civil War",
        "No Southern state ended slavery in these years.",
      ],
      [
        "They won the support of Congress, which banned slavery in the Southern states",
        "Congress did not ban slavery in the Southern states.",
      ],
      [
        "They ended when enslaved people were given the right to vote in the Deep South",
        "Enslaved people had no voting rights.",
      ],
    ],
    why: "Plots and rebellions such as those of Gabriel, Vesey, and Turner were crushed, though enslaved people also resisted in daily ways.",
    d: "The state laws choice is close because Northern states did pass such laws, but Southern states did not.",
  },
  {
    id: "q02",
    s: "slavery-and-resistance",
    sub: "1.B",
    kc: ["KC-4.1.III.B.ii"],
    q: "Which of the following was a result of Nat Turner's rebellion in 1831?",
    right:
      "Southern legislatures tightened the slave codes and restricted education and movement",
    at: 0,
    wrong: [
      [
        "Virginia ended slavery after the rebellion showed that it was dangerous to the state",
        "Virginia did not end slavery.",
      ],
      [
        "Congress banned the movement of enslaved people from the Upper South to the Deep South",
        "Congress took no such action.",
      ],
      [
        "The rebels won their freedom and founded a settlement in Southampton County",
        "The rebellion was suppressed.",
      ],
    ],
    why: "White Southerners responded to the rebellion with harsher laws, and a debate over ending slavery in Virginia produced no change.",
    d: "The Virginia ended slavery choice is close because the legislature debated the issue in 1832, but it did not act.",
  },
  {
    id: "q03",
    s: "slavery-and-resistance",
    sub: "1.A",
    kc: ["KC-4.1.III.B.ii"],
    q: "Denmark Vesey's plot of 1822 in Charleston, South Carolina, was",
    right: "discovered before it began, and the authorities executed its leaders",
    at: 1,
    wrong: [
      [
        "a successful uprising that freed the enslaved people on the coast of the state",
        "The plot was discovered before it was carried out.",
      ],
      [
        "a rebellion in Virginia, led by Gabriel, that threatened the city of Richmond",
        "That describes Gabriel's plot of 1800.",
      ],
      [
        "a revolt by free Black sailors against the officers of ships in Charleston",
        "The plot aimed to end slavery in the region.",
      ],
    ],
    why: "Authorities uncovered the plan and executed Vesey and others, and South Carolina tightened its laws.",
    d: "The Gabriel choice is close because both were planned rebellions, but Gabriel's plot was in Virginia in 1800.",
  },
  {
    id: "q04",
    s: "enslaved-families-and-communities",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.II.D"],
    q: "Why did enslaved people work to keep family ties across plantations despite the threat of sale?",
    right: "Family ties protected their dignity and gave them support",
    at: 3,
    wrong: [
      [
        "Slaveholders were required by law to keep enslaved families together",
        "The law gave enslaved families no protection.",
      ],
      [
        "Kin ties were needed to qualify for freedom under the laws of the Southern states",
        "No such law existed.",
      ],
      [
        "Families wanted to gather enough money to purchase land and to start farms",
        "Enslaved people had few means to purchase land.",
      ],
    ],
    why: "Enslaved people built families and kin networks that gave comfort and cultural continuity, even when the law did not recognize them.",
    d: "The slaveholder requirement choice is close because some owners kept families together, but the law did not require it.",
  },
  {
    id: "q05",
    s: "free-black-communities-and-activism",
    sub: "1.A",
    kc: ["KC-4.1.II.D"],
    q: "The African Methodist Episcopal Church, founded by Richard Allen in 1816, was",
    right: "a Black-led denomination that gave free Black people a church of their own",
    at: 1,
    wrong: [
      [
        "a missionary society that sent freed people to settle in Liberia",
        "That describes the American Colonization Society.",
      ],
      [
        "a Southern church that taught enslaved people to obey their enslavers",
        "The AME Church was independent and based in the North.",
      ],
      [
        "an abolitionist newspaper that demanded the immediate end of slavery",
        "It was a church and not a newspaper.",
      ],
    ],
    why: "Free African Americans built churches, schools, and mutual aid societies that served as centers of community life and activism.",
    d: "The missionary society choice is close because it also concerned Black Americans, but the AME Church was a church.",
  },
  {
    id: "q06",
    s: "slavery-and-resistance",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-4.1.III.B.ii"],
    q: "Which of the following was a continuity in the experience of African Americans from 1800 to 1848?",
    right:
      "Most African Americans remained enslaved, and slavery continued to expand in the South",
    at: 0,
    wrong: [
      [
        "Slavery ended in every state south of Virginia after the Atlantic slave trade closed",
        "Slavery spread in the Deep South.",
      ],
      [
        "Free Black people gained equal political rights in the North and the South",
        "Free Black people faced growing restrictions.",
      ],
      [
        "Enslaved families were protected from sale by laws passed by Congress",
        "Congress did not protect them.",
      ],
    ],
    why: "The power of slavery and racial prejudice continued even as free Black institutions and abolitionism grew.",
    d: "The ending of slavery choice is close because the importation of enslaved Africans ended in 1808, but slavery itself expanded.",
  },
  {
    id: "q07",
    s: "free-black-communities-and-activism",
    sub: "1.B",
    kc: ["KC-4.1.II.D"],
    q: "David Walker's Appeal (1829) is best known for",
    right: "calling on enslaved people to resist and condemning slavery",
    at: 2,
    wrong: [
      [
        "urging free Black Americans to move to Africa and found a new nation there",
        "Walker opposed colonization.",
      ],
      [
        "defending the gradual end of slavery as a policy that Southerners could support",
        "Walker demanded resistance and an end to slavery.",
      ],
      [
        "arguing that Congress should buy the freedom of the enslaved from their owners",
        "He called on Black Americans to resist.",
      ],
    ],
    why: "Walker's pamphlet alarmed Southern leaders and encouraged more militant Black activism.",
    d: "The colonization choice is close because many writers discussed it, but Walker urged resistance.",
  },
  {
    id: "q08",
    s: "free-black-communities-and-activism",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.II.D"],
    q: "Which of the following best explains why free Black Northerners founded their own churches, schools, and mutual aid societies?",
    right: "White institutions excluded them, so they built institutions of their own",
    at: 1,
    wrong: [
      [
        "State law required Black communities to build all of their own institutions",
        "State law did not require it.",
      ],
      [
        "White churches and schools had been closed in the North by order of the courts",
        "White institutions remained open.",
      ],
      [
        "Free Black people had no interest in education or religion until the 1830s",
        "They had long valued both.",
      ],
    ],
    why: "Excluded from many white institutions, free Black communities created their own and used them for mutual support and activism.",
    d: "The state law choice is close because segregation was often enforced by law, but communities also built institutions by choice.",
  },
  {
    id: "q09",
    s: "slavery-and-resistance",
    sub: "4.A",
    kc: ["KC-4.1.III.B.ii"],
    q: "The growth of the internal slave trade is best understood in the context of which of the following?",
    right: "The expansion of cotton and the end of the Atlantic slave trade in 1808",
    at: 3,
    wrong: [
      [
        "A decline in the demand for cotton that left planters with surplus workers",
        "Demand for cotton rose.",
      ],
      [
        "A federal plan to resettle enslaved people on land in the Northwest Territory",
        "No such plan was made.",
      ],
      [
        "The abolition of slavery in the Upper South by gradual emancipation laws",
        "Slavery continued in the Upper South.",
      ],
    ],
    why: "With the importation of enslaved Africans banned, planters in the Deep South bought people from the Upper South.",
    d: "The declining demand choice is close because the Upper South's tobacco economy weakened, but the demand for cotton workers rose.",
  },
  {
    id: "t01",
    s: "enslaved-families-and-communities",
    sub: "3.A",
    kc: ["KC-4.1.II.D"],
    q: "Which of the following claims about Douglass's experience is best supported by the excerpt?",
    right: "Reading gave Douglass an understanding of slavery and a path to freedom",
    at: 2,
    wrong: [
      [
        "Douglass believed that reading would make slaveholders treat the enslaved with kindness",
        "He describes understanding the power of the white man over the black man.",
      ],
      [
        "Douglass learned to read because his master encouraged him to seek an education",
        "The excerpt refers to his master's objections.",
      ],
      [
        "Douglass had always known how slavery worked and did not need to learn it",
        "He describes it as a new revelation.",
      ],
    ],
    why: "Douglass says that he understood “the pathway from slavery to freedom” once he understood the white man's power to enslave.",
    d: "The kindness choice is close because the excerpt is about learning, but Douglass drew a lesson about power and freedom.",
    stim: excerpts.douglassPathway,
  },
  {
    id: "t02",
    s: "enslaved-families-and-communities",
    sub: "2.A",
    kc: ["KC-4.1.II.D"],
    q: "Douglass most likely wrote the Narrative (1845) in order to",
    right: "persuade Northern readers that slavery was wrong",
    at: 0,
    wrong: [
      [
        "provide a legal brief for a lawsuit seeking the freedom of his family from their owners",
        "It was a published autobiography and not a legal brief.",
      ],
      [
        "defend the slaveholders who had taught him to read from the charges of cruelty",
        "He wrote to condemn slavery.",
      ],
      [
        "urge Congress to pay slaveholders for the freedom of enslaved people",
        "The Narrative argued against slavery and did not seek compensation.",
      ],
    ],
    why: "Douglass was a leading abolitionist, and his narrative gave Northern readers a firsthand account of the injustice of slavery.",
    d: "The legal brief choice is close because Douglass later sought legal rights, but the Narrative was written for a public audience.",
    stim: excerpts.douglassPathway,
  },
  {
    id: "t03",
    s: "enslaved-families-and-communities",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.II.D"],
    q: "The words that “sank deep” into Douglass's heart most directly led him to",
    right: "see literacy as a pathway to freedom and to seek to learn despite the risks",
    at: 1,
    wrong: [
      [
        "give up his efforts to learn to read in order to avoid trouble",
        "He describes the words as a revelation that he prized.",
      ],
      [
        "ask his master to free him in return for his labor and his loyalty",
        "The excerpt does not say that he asked for freedom.",
      ],
      [
        "join a Northern abolitionist society at once and publish a newspaper",
        "That came later in his life.",
      ],
    ],
    why: "Hugh Auld's objections taught Douglass that knowledge made slavery impossible to keep, and he determined to learn.",
    d: "The give-up choice is close because the words were a warning, but Douglass drew the opposite lesson.",
    stim: excerpts.douglassPathway,
  },
]);

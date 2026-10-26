// Original practice questions for Topic 5.5. q-numbered items are topic practice;
// t-numbered items belong to the Unit 5 Practice Test. The topic covers two
// learning objectives, so items about slavery and regional tension carry lo: "F".
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.5", [
  {
    id: "q01",
    s: "immigration-and-nativism",
    sub: "1.A",
    kc: ["KC-5.1.II.A"],
    q: "Which two countries sent the largest numbers of immigrants to the United States in the 1840s and 1850s?",
    right: "Ireland and Germany",
    at: 1,
    wrong: [
      [
        "Britain and France",
        "Those countries sent immigrants, but fewer than Ireland and Germany.",
      ],
      ["Italy and Russia", "Large migrations from those countries came later."],
      [
        "China and Japan",
        "Chinese migration was smaller, and Japanese migration had barely begun.",
      ],
    ],
    why: "Famine and economic hardship in Ireland and political and economic upheaval in Germany sent millions across the Atlantic.",
    d: "The Britain and France choice is close because those countries sent migrants for many years, but Ireland and Germany sent the largest numbers in these years.",
  },
  {
    id: "q02",
    s: "immigration-and-nativism",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.1.II.A"],
    q: "Which of the following was a main cause of Irish migration to the United States in the late 1840s?",
    right: "A famine that followed the failure of the potato crop",
    at: 0,
    wrong: [
      [
        "The failure of the revolutions of 1848 in the lands of Europe",
        "The revolutions of 1848 sent many Germans, not most of the Irish, to the United States.",
      ],
      [
        "A British law that banned Irish farmers from owning any land in Ireland",
        "Britain passed no such ban on Irish landowning.",
      ],
      [
        "An American program that paid Irish families to settle in the Midwest",
        "No such program existed.",
      ],
    ],
    why: "The potato blight that began in 1845 caused famine and death in Ireland, and many survivors left for the United States.",
    d: "The revolutions of 1848 choice is close because those events also drove migration, but they sent Germans to the United States, and the Irish left because of famine.",
  },
  {
    id: "q03",
    s: "immigration-and-nativism",
    sub: "1.B",
    kc: ["KC-5.1.II.A"],
    q: "Many immigrants settled in ethnic communities in order to",
    right:
      "preserve parts of their languages and customs and find support from neighbors",
    at: 2,
    wrong: [
      [
        "avoid the taxes that the government required of other residents of the cities",
        "Immigrants paid the same taxes as other residents.",
      ],
      [
        "meet the legal requirements of the federal law that governed citizenship",
        "Federal law did not require ethnic neighborhoods.",
      ],
      [
        "comply with state laws that kept immigrants apart from the rest of the population",
        "No such laws required it.",
      ],
    ],
    why: "Ethnic neighborhoods gave newcomers churches, newspapers, schools, and neighbors who shared their language.",
    d: "The tax choice is close because immigrants did face high costs of living, but they were not exempt from taxes.",
  },
  {
    id: "q04",
    s: "immigration-and-nativism",
    sub: "1.A",
    kc: ["KC-5.1.II.B"],
    q: "The nativist movement of the 1850s was aimed mainly at limiting",
    right: "the political power and cultural influence of Catholic immigrants",
    at: 3,
    wrong: [
      [
        "the spread of slavery into the western territories of the United States",
        "That was the aim of the free-soil movement.",
      ],
      [
        "the number of banks that could issue paper money in the Northern states",
        "The movement did not concern banking.",
      ],
      [
        "the right of women to speak at public meetings on reform and religion",
        "That was a different issue.",
      ],
    ],
    why: "Nativists feared that Catholic newcomers would be loyal to the pope and would change American politics and culture.",
    d: "The spread of slavery choice is close because both movements shaped party politics in the 1850s, but nativists were concerned with immigrants.",
  },
  {
    id: "q05",
    s: "immigration-and-nativism",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.1.II.B"],
    q: "Which of the following helps to explain the rise of the Know-Nothing movement?",
    right: "Fear that Catholic immigrants would be loyal to the pope and take jobs",
    at: 1,
    wrong: [
      [
        "Anger among Northern workers at the Fugitive Slave Act of 1850",
        "That anger helped the antislavery cause and not nativism.",
      ],
      [
        "A law that gave immigrants the right to vote after one year in the country",
        "Immigrants had to wait longer to vote.",
      ],
      [
        "A ban on Catholic worship that Northern states had passed in the 1840s",
        "No Northern state banned Catholic worship.",
      ],
    ],
    why: "Many native-born Protestants feared the political and economic weight of the new Irish and German Catholic voters.",
    d: "The Fugitive Slave Act choice is close because the Act did upset Northerners in the same years, but it did not cause the nativist movement.",
    lo: "E",
  },
  {
    id: "q06",
    s: "free-labor-and-free-soil",
    sub: "1.A",
    lo: "F",
    kc: ["KC-5.2.I.A"],
    q: "Free-soil Northerners argued that the expansion of slavery",
    right: "would undermine free labor in the western territories",
    at: 3,
    wrong: [
      [
        "was a sin that had to end at once in every state of the Union",
        "That was the abolitionist argument.",
      ],
      [
        "would lower the price of cotton and cause losses for Northern mills",
        "Free-soilers did not make that argument.",
      ],
      [
        "violated the Fugitive Slave Act and the rights of the Northern states",
        "The Act helped slaveholders and not free-soilers.",
      ],
    ],
    why: "Free-soilers feared that slave labor would crowd free workers out of the West.",
    d: "The sin choice is close because many free-soilers did think that slavery was wrong, but their main argument concerned free labor and the territories.",
  },
  {
    id: "q07",
    s: "free-labor-and-free-soil",
    sub: "5.A",
    r: "comparison",
    lo: "F",
    kc: ["KC-5.2.I.A", "KC-5.2.I.B"],
    q: "Which of the following describes a difference between free-soilers and abolitionists?",
    right:
      "Free-soilers sought to stop slavery's spread, and abolitionists to end it everywhere",
    at: 2,
    wrong: [
      [
        "Free-soilers sought to end slavery everywhere, and abolitionists to stop its spread",
        "The positions are reversed.",
      ],
      [
        "Free-soilers were mostly Southerners, and abolitionists were mostly Northerners",
        "Free-soilers were Northerners.",
      ],
      [
        "Free-soilers favored violence, and abolitionists favored only voting",
        "Neither group was limited in that way.",
      ],
    ],
    why: "Free-soilers wanted slavery kept out of the territories, and abolitionists demanded that it end throughout the nation.",
    d: "The reversed choice is close because it names the same two groups, but it gives each one the wrong goal.",
  },
  {
    id: "q08",
    s: "abolitionists-and-defenders-of-slavery",
    sub: "1.B",
    lo: "F",
    kc: ["KC-5.2.I.B"],
    q: "Which of the following was a method used by abolitionists in the 1840s and 1850s?",
    right: "Helping people escape from slavery on the Underground Railroad",
    at: 0,
    wrong: [
      [
        "Passing laws in Southern legislatures to end slavery gradually",
        "Southern legislatures did not pass such laws.",
      ],
      [
        "Calling a convention of the states to rewrite the Constitution",
        "No such convention was called.",
      ],
      [
        "Taking control of Congress by winning a majority in every election",
        "Abolitionists were a minority.",
      ],
    ],
    why: "Black and white abolitionists wrote, spoke, petitioned, and helped people escape, and some were willing to use violence.",
    d: "The legislatures choice is close because abolitionists did try to change laws, but they could not persuade Southern legislatures to end slavery.",
  },
  {
    id: "q09",
    s: "abolitionists-and-defenders-of-slavery",
    sub: "4.A",
    lo: "F",
    kc: ["KC-5.2.I.C"],
    q: "Southern defenders of slavery claimed that it was a “positive good.” This claim is best understood in the context of which of the following?",
    right:
      "Growing attacks on slavery by abolitionists and the profits that slavery produced",
    at: 1,
    wrong: [
      [
        "A drop in cotton prices that had left slavery unprofitable in the South",
        "Cotton was highly profitable.",
      ],
      [
        "A Supreme Court decision that had ended slavery in the Southern states",
        "The Court issued no such decision.",
      ],
      [
        "A law that required the Southern states to compensate their slaveholders",
        "Compensation to slaveholders was never required.",
      ],
    ],
    why: "As abolitionists attacked slavery, Southern leaders moved from calling it a necessary evil to defending it as beneficial.",
    d: "The cotton prices choice is close because the economy shaped Southern arguments, but cotton was profitable, which gave slaveholders reason to defend slavery.",
  },
  {
    id: "t01",
    s: "free-labor-and-free-soil",
    sub: "2.B",
    lo: "F",
    kc: ["KC-5.2.I.A"],
    q: "Lincoln most likely said that Republicans could “afford to let it alone where it is” in order to",
    right:
      "reassure listeners that Republicans would not interfere with slavery in the states",
    at: 3,
    wrong: [
      [
        "announce a plan to end slavery in the Southern states by act of Congress",
        "He rejects interference in the states where slavery existed.",
      ],
      [
        "argue that slavery was a good that should be expanded into the territories",
        "He opposes the spread of slavery.",
      ],
      [
        "ask Northern voters to give up the free-soil position in order to win the election",
        "He keeps the free-soil position.",
      ],
    ],
    why: "Speaking in New York in 1860, Lincoln separated the Republican goal of stopping slavery's spread from any attack on slavery in the states.",
    d: "The plan to end slavery choice is close because Lincoln thought slavery was wrong, but the passage says that Republicans would leave it alone where it exists.",
    stim: excerpts.lincolnCooper,
  },
  {
    id: "t02",
    s: "abolitionists-and-defenders-of-slavery",
    sub: "3.A",
    lo: "F",
    kc: ["KC-5.2.I.C"],
    q: "According to Lincoln in the first paragraph, defenders of slavery in 1860 held that slavery was",
    right: "morally right and deserving of national recognition",
    at: 0,
    wrong: [
      [
        "a necessary evil that would end in time",
        "Lincoln says they now call it morally right.",
      ],
      [
        "a matter for each state and unconnected to the territories",
        "He says they demand national recognition.",
      ],
      [
        "an outdated system that the Constitution would soon end",
        "He does not say that they expected an end.",
      ],
    ],
    why: "Lincoln describes defenders as “holding . . . that slavery is morally right and socially elevating,” and demanding “full national recognition” of it.",
    d: "The necessary evil choice is close because earlier Southern leaders held that view, but Lincoln says that defenders in 1860 called slavery right.",
    stim: excerpts.lincolnCooper,
  },
  {
    id: "t03",
    s: "free-labor-and-free-soil",
    sub: "3.A",
    lo: "F",
    kc: ["KC-5.2.I.A"],
    q: "Which of the following conclusions about the sections is best supported by the second paragraph of the excerpt?",
    right:
      "Lincoln saw the dispute as a conflict of belief over whether slavery was right",
    at: 2,
    wrong: [
      [
        "Lincoln saw the dispute as a conflict over the tariff and federal spending",
        "The paragraph concerns slavery.",
      ],
      [
        "Lincoln saw the sections as agreed on slavery and divided on other questions",
        "He says the sections disagree about slavery.",
      ],
      [
        "Lincoln saw the dispute as one that the South alone could end by changing its laws",
        "He says each side thinks the other wrong.",
      ],
    ],
    why: "Lincoln says that “their thinking it right and our thinking it wrong is the precise fact upon which depends the whole controversy.”",
    d: "The tariff choice is close because economic issues divided the sections, but the paragraph names slavery as the whole controversy.",
    stim: excerpts.lincolnCooper,
  },
]);

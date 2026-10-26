// Original practice questions for Topic 5.6. q-numbered items are topic practice;
// t-numbered items belong to the Unit 5 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.6", [
  {
    id: "q01",
    s: "kansas-nebraska-and-the-republican-party",
    sub: "1.B",
    kc: ["KC-5.2.II.B.ii"],
    q: "The Kansas–Nebraska Act of 1854 provided that",
    right: "settlers in Kansas and Nebraska would decide the question of slavery",
    at: 2,
    wrong: [
      [
        "slavery would be banned in the new territories north of 36°30′",
        "The Act repealed that ban.",
      ],
      [
        "Kansas would enter as a slave state and Nebraska would enter as a free state",
        "The Act did not set the status of either state.",
      ],
      [
        "the Missouri Compromise line would be extended west to the Pacific Ocean",
        "The Act repealed the line.",
      ],
    ],
    why: "Douglas applied popular sovereignty to Kansas and Nebraska, and the Act repealed the Missouri Compromise ban on slavery north of the line.",
    d: "The banned choice is close because Kansas and Nebraska lay north of the old line where slavery had been banned, but the Act repealed that ban.",
  },
  {
    id: "q02",
    s: "kansas-nebraska-and-the-republican-party",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.2.II.C"],
    q: "Which of the following was an effect of the Kansas–Nebraska Act?",
    right: "It helped to bring about the Republican Party in the North",
    at: 0,
    wrong: [
      [
        "It settled the question of slavery in the territories for a generation",
        "Conflict increased after the Act.",
      ],
      [
        "It united Northern and Southern Whigs behind the leadership of Douglas",
        "The Whig Party broke apart.",
      ],
      [
        "It led the Southern Democrats to leave their party and form a new one",
        "That split came later, in 1860.",
      ],
    ],
    why: "Northern anger at the repeal of the Missouri Compromise brought together Free-Soilers, antislavery Whigs, and antislavery Democrats.",
    d: "The settled for a generation choice is close because Douglas hoped popular sovereignty would end the dispute, but the Act renewed it.",
  },
  {
    id: "q03",
    s: "kansas-nebraska-and-the-republican-party",
    sub: "1.A",
    kc: ["KC-5.2.II.C"],
    q: "The Republican Party, formed in 1854, was united mainly by its opposition to",
    right: "the spread of slavery into the western territories",
    at: 1,
    wrong: [
      [
        "slavery in every state of the Union, which its platform demanded be ended at once",
        "The party did not demand an end to slavery in the states.",
      ],
      [
        "the political power of Catholic immigrants, which its leaders wanted to limit",
        "That was the aim of the Know-Nothings.",
      ],
      [
        "the Treaty of Guadalupe Hidalgo and the lands that it had added to the nation",
        "The party did not oppose the treaty.",
      ],
    ],
    why: "Republicans came together to keep slavery out of the territories, not to abolish it in the states.",
    d: "The slavery in every state choice is close because Republicans disliked slavery, but their platform aimed at stopping its spread.",
  },
  {
    id: "q04",
    s: "bleeding-kansas-and-dred-scott",
    sub: "4.A",
    kc: ["KC-5.2.II.B.ii"],
    q: "The violence in Kansas in 1856 is best understood in the context of which of the following?",
    right:
      "Rival efforts by proslavery and antislavery settlers to control the new territory",
    at: 3,
    wrong: [
      [
        "A war between the United States and the Native nations of the Great Plains",
        "The violence was between settlers.",
      ],
      [
        "A revolt by farmers against the tax on the railroad that crossed the territory",
        "No tax revolt took place.",
      ],
      [
        "A boundary dispute between Missouri and Kansas over the course of a river",
        "The dispute concerned slavery and not a river.",
      ],
    ],
    why: "Popular sovereignty invited both sides to send settlers, and the contest for control turned violent.",
    d: "The war with Native nations choice is close because Kansas was Native land before settlement, but the 1856 violence was between rival settlers.",
  },
  {
    id: "q05",
    s: "bleeding-kansas-and-dred-scott",
    sub: "1.B",
    kc: ["KC-5.2.II.B.ii"],
    q: "In Dred Scott v. Sandford (1857), the Supreme Court ruled that",
    right: "Congress had no power to ban slavery in the territories",
    at: 2,
    wrong: [
      [
        "Dred Scott was free because he had lived for years in a free territory",
        "The Court ruled against him.",
      ],
      [
        "popular sovereignty was the only lawful way to decide the status of slavery",
        "The Court did not endorse popular sovereignty.",
      ],
      [
        "free African Americans could be citizens of a state but not of the nation",
        "The Court held that no African American could be a citizen.",
      ],
    ],
    why: "Chief Justice Taney wrote that Congress could not prohibit slavery in the territories and that African Americans could not be citizens.",
    d: "The freedom choice is close because Scott had sued on that ground, but the Court ruled that he remained enslaved.",
  },
  {
    id: "q06",
    s: "bleeding-kansas-and-dred-scott",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.2.II.B.ii"],
    q: "Which of the following was an effect of the Dred Scott decision?",
    right: "It angered many Northerners and strengthened the Republican Party",
    at: 3,
    wrong: [
      [
        "It persuaded most Northerners to accept the spread of slavery into the territories",
        "Most Northerners were angered.",
      ],
      [
        "It ended the dispute over slavery in the territories for several years",
        "The dispute increased.",
      ],
      [
        "It led Congress to repeal the Fugitive Slave Act in the same year",
        "The Act stayed in force until 1864.",
      ],
    ],
    why: "The ruling denied the Republican goal of banning slavery in the territories and convinced many Northerners that a “slave power” controlled the government.",
    d: "The accept the spread choice is close because the Court's authority was great, but Northern voters rejected the ruling and turned to the Republicans.",
  },
  {
    id: "q07",
    s: "kansas-nebraska-and-the-republican-party",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.2.II.C"],
    q: "Which of the following describes a difference between the Whig Party and the Republican Party?",
    right:
      "The Whigs had Northern and Southern members, while the Republicans were a Northern party",
    at: 1,
    wrong: [
      [
        "The Whigs opposed the spread of slavery, while the Republicans did not address it",
        "The Republicans were founded to oppose the spread of slavery.",
      ],
      [
        "The Whigs grew stronger in the 1850s, while the Republicans quickly declined",
        "The Whigs collapsed and the Republicans grew.",
      ],
      [
        "The Whigs were a sectional party of the South, while the Republicans were national",
        "The Whigs were national and the Republicans were Northern.",
      ],
    ],
    why: "The Whigs split over slavery, while the Republicans formed in the North and won no Southern electoral votes in 1860.",
    d: "The opposed the spread choice is close because some Whigs were antislavery, but the party as a whole did not take that position.",
  },
  {
    id: "q08",
    s: "lincoln-douglas-and-john-brown",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.2.II.B.ii"],
    q: "Why did Douglas's answer at Freeport in 1858 anger many Southern Democrats?",
    right: "It suggested that settlers could keep out slavery by refusing to protect it",
    at: 0,
    wrong: [
      [
        "It said that Congress should ban slavery in all of the territories",
        "Douglas did not call for a congressional ban.",
      ],
      [
        "It declared that he would leave the Democratic Party to join the Republicans",
        "He remained a Democrat.",
      ],
      [
        "It called for the repeal of the Fugitive Slave Act in the free states",
        "He did not make that call.",
      ],
    ],
    why: "Southerners wanted slavery protected in the territories, and Douglas's answer allowed settlers to defeat it in practice.",
    d: "The Congress ban choice is close because Douglas's answer limited slavery, but he relied on settlers and not Congress.",
  },
  {
    id: "t01",
    s: "lincoln-douglas-and-john-brown",
    sub: "3.A",
    kc: ["KC-5.2.II.B.ii"],
    q: "Lincoln's description of slavery as “an apple of discord and an element of division” best supports which claim?",
    right: "Slavery had been a steady source of conflict between the sections",
    at: 0,
    wrong: [
      [
        "Slavery had been a bond of union among the states",
        "Lincoln says it had “always failed to be a bond of union.”",
      ],
      [
        "Slavery had caused the American colonies to separate from Britain",
        "The excerpt does not connect slavery to the Revolution.",
      ],
      [
        "Slavery's critics had caused the conflict by attacking it",
        "Lincoln blames slavery and not its critics.",
      ],
    ],
    why: "Lincoln says that slavery has “always failed to be a bond of union” and has been “an element of division in the house.”",
    d: "The bond of union choice is close because Lincoln uses those words, but he says slavery had failed to be one.",
    stim: excerpts.lincolnOttawa,
  },
  {
    id: "t02",
    s: "lincoln-douglas-and-john-brown",
    sub: "2.B",
    kc: ["KC-5.2.II.B.ii"],
    q: "Which of the following about Lincoln's situation in August 1858 best explains his argument in the excerpt?",
    right:
      "He was a Republican candidate trying to persuade voters that Douglas favored the spread of slavery",
    at: 3,
    wrong: [
      [
        "He was the Democratic nominee who wished to win the votes of antislavery Northerners",
        "Douglas, not Lincoln, was the Democrat.",
      ],
      [
        "He was a congressman who had just introduced a bill to ban slavery in the territories",
        "He was not then in Congress.",
      ],
      [
        "He was the governor of Illinois, preparing the state for a war against the South",
        "He held no such office.",
      ],
    ],
    why: "Lincoln was running against Douglas for the Senate, and he accused Douglas and his allies of putting slavery “on a new basis.”",
    d: "The Democratic nominee choice is close because the two men were rivals in the same race, but Douglas was the Democrat and Lincoln the Republican.",
    stim: excerpts.lincolnOttawa,
  },
  {
    id: "t03",
    s: "lincoln-douglas-and-john-brown",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.2.II.B.ii"],
    q: "According to Lincoln in the excerpt, what would follow if the spread of slavery were stopped?",
    right: "Slavery would be seen as in the course of ultimate extinction",
    at: 1,
    wrong: [
      [
        "Slavery would become lawful in all of the states, old and new, North and South",
        "Lincoln says that would follow if its advocates pushed it forward.",
      ],
      [
        "Slavery would end at once in the states where it already existed",
        "The excerpt speaks of stopping the spread of slavery and not of ending it at once.",
      ],
      [
        "The Supreme Court would overturn the Dred Scott decision on slavery",
        "The excerpt does not mention the Court.",
      ],
    ],
    why: "Lincoln says that if the opponents of slavery “arrest the further spread of it,” the public mind will “rest in the belief that it is in the course of ultimate extinction.”",
    d: "The lawful in all states choice is close because Lincoln names it, but he says it would follow if slavery's advocates succeeded in pushing it forward.",
    stim: excerpts.lincolnOttawa,
  },
]);

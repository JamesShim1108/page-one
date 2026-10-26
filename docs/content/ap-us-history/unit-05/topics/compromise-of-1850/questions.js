// Original practice questions for Topic 5.4. q-numbered items are topic practice.
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.4", [
  {
    id: "q01",
    s: "slavery-in-the-mexican-cession",
    sub: "1.A",
    kc: ["KC-5.2.II.A"],
    q: "The Free-Soil Party, formed in 1848, was best known for its demand that",
    right: "slavery not be allowed to spread into the western territories",
    at: 2,
    wrong: [
      [
        "slavery be ended at once in the states where it already existed",
        "The party sought to stop the spread of slavery and not to end it in the states.",
      ],
      [
        "the settlers of each territory decide whether to allow slavery within its borders",
        "That was popular sovereignty.",
      ],
      [
        "the United States pay slaveholders in order to free the enslaved people in the territories",
        "The party did not propose payments to slaveholders.",
      ],
    ],
    why: "Free-Soilers wanted western land kept open to free workers and closed to slavery.",
    d: "The immediate end choice is close because the Free-Soilers opposed slavery, but they sought to stop its spread and not to end it in the states.",
  },
  {
    id: "q02",
    s: "slavery-in-the-mexican-cession",
    sub: "1.A",
    kc: ["KC-5.2.II.A"],
    q: "Popular sovereignty was the idea that",
    right: "settlers in a territory should decide whether to allow slavery",
    at: 0,
    wrong: [
      [
        "Congress should ban slavery in every territory taken from Mexico",
        "That was the Wilmot Proviso.",
      ],
      [
        "the president should decide the status of slavery in each new territory",
        "No one proposed leaving the choice to the president.",
      ],
      [
        "each state should elect its senators by a direct vote of the people",
        "That change came with the Seventeenth Amendment in 1913.",
      ],
    ],
    why: "Senator Cass and later Senator Douglas argued that the people living in a territory should settle the question for themselves.",
    d: "The Congress ban choice is close because both ideas concerned the territories, but the Wilmot Proviso left the decision to Congress and popular sovereignty left it to settlers.",
  },
  {
    id: "q03",
    s: "slavery-in-the-mexican-cession",
    sub: "4.B",
    kc: ["KC-5.2.II.A"],
    q: "California's request in 1849 to enter the Union as a free state caused a crisis mainly because",
    right: "its admission would give the free states a majority in the Senate",
    at: 1,
    wrong: [
      [
        "its population was too small to qualify for statehood under the law",
        "The Gold Rush had filled California with settlers.",
      ],
      [
        "Mexico had not yet accepted the Treaty of Guadalupe Hidalgo",
        "The treaty had been signed in 1848.",
      ],
      [
        "Congress had not yet decided to organize any territory in the Southwest",
        "The crisis concerned the balance of power in the Senate.",
      ],
    ],
    why: "The Senate had been evenly divided between free and slave states, and Southerners feared losing their veto over laws about slavery.",
    d: "The population choice is close because California had been settled only recently, but the Gold Rush had brought enough people, and the dispute was about the balance in the Senate.",
  },
  {
    id: "q04",
    s: "the-compromise",
    sub: "1.B",
    kc: ["KC-5.2.II.B.i"],
    q: "Which of the following was a provision of the Compromise of 1850?",
    right:
      "California entered as a free state, and a stronger Fugitive Slave Act was passed",
    at: 3,
    wrong: [
      [
        "Slavery was abolished in Washington, D.C., and in the territory of Utah",
        "Only the slave trade in the District of Columbia was ended.",
      ],
      [
        "Slavery was barred from all of the lands that had been taken from Mexico",
        "Popular sovereignty applied in Utah and New Mexico.",
      ],
      [
        "The Missouri Compromise line was extended west to the Pacific Ocean",
        "The Compromise of 1850 did not extend the line.",
      ],
    ],
    why: "The Compromise admitted California as a free state, used popular sovereignty in Utah and New Mexico, and strengthened the Fugitive Slave Act.",
    d: "The abolished in D.C. choice is close because the Compromise did affect the capital, but it ended only the slave trade there and not slavery itself.",
  },
  {
    id: "q05",
    s: "regional-reactions",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.2.II.B.i"],
    q: "Which of the following was an effect of the Fugitive Slave Act of 1850?",
    right: "Many Northerners were angered, and some states passed protective laws",
    at: 0,
    wrong: [
      [
        "Fewer people escaped from slavery, so Northern states stopped debating it",
        "Escapes continued, and the Act increased the debate.",
      ],
      [
        "Accused fugitives gained the right to a jury trial in the free states",
        "The Act denied them a jury trial.",
      ],
      [
        "Southern leaders accepted the free status of California in return for the Act",
        "Many Southerners still objected to California.",
      ],
    ],
    why: "The Act required Northerners to help capture people who had escaped, and it turned many of them against the South.",
    d: "The fewer escapes choice is close because the Act aimed to stop escapes, but Northerners resisted it and the debate over slavery grew.",
  },
  {
    id: "q06",
    s: "the-compromise",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.2.II.B.i"],
    q: "Which of the following describes a similarity between the Missouri Compromise and the Compromise of 1850?",
    right:
      "Both tried to settle the spread of slavery by an agreement between the sections",
    at: 2,
    wrong: [
      [
        "Both banned slavery in the western lands north of the line at 36°30′",
        "Only the Missouri Compromise used that line.",
      ],
      [
        "Both were struck down by the Supreme Court soon after they were passed",
        "The Court did not strike down either one at that time.",
      ],
      [
        "Both gave the settlers of each territory the right to decide the question of slavery",
        "Only the Compromise of 1850 used popular sovereignty.",
      ],
    ],
    why: "Each compromise balanced free and slave states and sought to avoid a crisis over the territories.",
    d: "The 36°30′ choice is close because the Missouri Compromise used that line, but the Compromise of 1850 did not.",
  },
  {
    id: "q07",
    s: "regional-reactions",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.2.II.A"],
    q: "Which of the following describes a difference between Northern and Southern attitudes toward the Compromise of 1850?",
    right:
      "Northerners objected most to the Fugitive Slave Act, and many Southerners to California's free status",
    at: 1,
    wrong: [
      [
        "Southerners objected most to the Fugitive Slave Act, and Northerners to California's free status",
        "The objections were the reverse.",
      ],
      [
        "Northerners wanted slavery extended to Utah, while Southerners wanted it barred",
        "Northerners did not seek to extend slavery.",
      ],
      [
        "Southerners opposed any federal law on slavery, while Northerners opposed only state laws",
        "Southerners welcomed the Fugitive Slave Act.",
      ],
    ],
    why: "Each section accepted parts of the Compromise and objected to the part that seemed to favor the other.",
    d: "The reversed choice is close because it names the same two provisions, but it gives each section the wrong objection.",
  },
  {
    id: "q08",
    s: "regional-reactions",
    sub: "4.A",
    kc: ["KC-5.2.II.A"],
    q: "The Nashville Convention of 1850, where some Southern delegates discussed leaving the Union, is best understood in the context of which of the following?",
    right: "Southern fears that a free California and the Wilmot Proviso threatened them",
    at: 3,
    wrong: [
      [
        "A dispute between South Carolina and President Andrew Jackson over the tariff",
        "That dispute took place in 1832.",
      ],
      [
        "A call by Northern abolitionists for the Southern states to end slavery at once",
        "Delegates responded to national policy and to the Wilmot Proviso.",
      ],
      [
        "A plan by Texas to leave the Union after the end of the Mexican–American War",
        "Texas did not seek to leave the Union.",
      ],
    ],
    why: "Southern delegates feared that the free states would take control of Congress and limit the spread of slavery.",
    d: "The tariff dispute choice is close because Southern leaders had threatened to resist federal law before, but that dispute came in 1832.",
  },
  {
    id: "q09",
    s: "regional-reactions",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.2.I.B"],
    q: "Harriet Beecher Stowe's Uncle Tom's Cabin (1852) affected the debate over slavery by",
    right: "turning many Northern readers against slavery and the Fugitive Slave Act",
    at: 2,
    wrong: [
      [
        "persuading Southern legislatures to pass laws that ended slavery gradually",
        "Southern leaders rejected the book.",
      ],
      [
        "convincing Congress to repeal the Fugitive Slave Act within a year",
        "The Act remained in force.",
      ],
      [
        "showing that slavery had little effect on the lives of enslaved families",
        "The novel portrayed the cruelty of slavery.",
      ],
    ],
    why: "The novel was widely read, and it made the human cost of slavery vivid to Northern readers.",
    d: "The repeal choice is close because the novel angered Northerners about the Act, but Congress did not repeal it until 1864.",
  },
]);

// Original practice questions for Topic 5.7. q-numbered items are topic practice;
// t-numbered items belong to the Unit 5 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.7", [
  {
    id: "q01",
    s: "the-election-of-1860",
    sub: "1.A",
    kc: ["KC-5.2.II.D"],
    q: "In the presidential election of 1860, the Democratic Party",
    right: "split, with Northern and Southern wings nominating different candidates",
    at: 1,
    wrong: [
      [
        "united behind Stephen Douglas, who won most of the Southern states",
        "The party split, and Douglas won few states.",
      ],
      [
        "nominated Abraham Lincoln on a platform to stop the spread of slavery",
        "Lincoln was the Republican nominee.",
      ],
      [
        "chose not to run a candidate and instead backed the Constitutional Union ticket",
        "The Democrats ran two candidates.",
      ],
    ],
    why: "Northern Democrats nominated Douglas and Southern Democrats nominated Breckinridge, which divided the party's vote.",
    d: "The united behind Douglas choice is close because Douglas was the leading Democrat, but Southern Democrats refused to support him.",
  },
  {
    id: "q02",
    s: "the-election-of-1860",
    sub: "1.B",
    kc: ["KC-5.2.II.D"],
    q: "Abraham Lincoln won the presidency in 1860",
    right: "with a majority of electoral votes but no electoral votes from the South",
    at: 3,
    wrong: [
      [
        "with a majority of the popular vote but few electoral votes",
        "He won about 40 percent of the popular vote.",
      ],
      [
        "with the support of most Southern states after promising to protect slavery",
        "He won no Southern electoral votes.",
      ],
      [
        "after the House of Representatives chose him when no one won a majority",
        "The Electoral College gave him a majority.",
      ],
    ],
    why: "Lincoln carried the free states, and a divided opposition gave him a majority of the electoral vote without Southern support.",
    d: "The popular vote choice is close because Lincoln's victory was lawful, but he won about 40 percent of the popular vote and not a majority.",
  },
  {
    id: "q03",
    s: "secession",
    sub: "4.B",
    kc: ["KC-5.2.II.D"],
    q: "The decision of Southern states to secede after Lincoln's election is best understood in the context of which of the following?",
    right:
      "Fear that a Republican president would stop the spread of slavery and weaken Southern power",
    at: 0,
    wrong: [
      [
        "A demand by Lincoln that the Southern states end slavery immediately",
        "Lincoln promised not to interfere with slavery in the states.",
      ],
      [
        "A Republican plan to raise the tariff on cotton sold to Britain",
        "The Republicans had no such plan.",
      ],
      [
        "A Supreme Court decision that had banned slavery in the Southern states",
        "The Court had ruled in favor of slaveholders.",
      ],
    ],
    why: "Southern leaders feared that the new administration would stop the spread of slavery and would reduce the South's place in the Union.",
    d: "The immediate end choice is close because Lincoln opposed slavery, but he pledged not to interfere with it in the states where it existed.",
  },
  {
    id: "q04",
    s: "fort-sumter-and-the-upper-south",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.2.II.D"],
    q: "Which of the following was a cause of the secession of Virginia, Arkansas, Tennessee, and North Carolina?",
    right:
      "Lincoln's call for troops to put down the rebellion after the attack on Fort Sumter",
    at: 2,
    wrong: [
      [
        "Lincoln's election in November 1860, which led them to secede with the first seven states",
        "These four states waited until after Fort Sumter.",
      ],
      [
        "The passage of the Crittenden Compromise, which they believed betrayed the South",
        "The Crittenden Compromise did not pass.",
      ],
      [
        "The Confederate victory at Bull Run, which showed that the South would win the war",
        "Bull Run was fought in July 1861, after they had left.",
      ],
    ],
    why: "Many in the Upper South opposed secession until the president asked them to send troops against other Southern states.",
    d: "The election of Lincoln choice is close because it caused the first states to leave, but these four stayed until Lincoln called for troops.",
  },
  {
    id: "q05",
    s: "fort-sumter-and-the-upper-south",
    sub: "1.A",
    kc: ["KC-5.2.II.D"],
    q: "Which of the following were the border states that kept slavery but stayed in the Union?",
    right: "Delaware, Maryland, Kentucky, and Missouri",
    at: 1,
    wrong: [
      [
        "Virginia, Tennessee, Arkansas, and North Carolina",
        "Those four states joined the Confederacy.",
      ],
      [
        "Texas, Louisiana, Alabama, and Georgia",
        "Those states belonged to the Deep South and seceded.",
      ],
      ["Ohio, Indiana, Illinois, and Iowa", "Those states had abolished slavery."],
    ],
    why: "Four slave states stayed loyal, and Lincoln worked to keep them because of their location and resources.",
    d: "The Virginia, Tennessee, Arkansas, and North Carolina choice is close because they were also slave states of the Upper South, but they seceded.",
  },
  {
    id: "q06",
    s: "secession",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.2.II.D"],
    q: "Which of the following describes a difference between the views of Lincoln and Southern leaders in 1861 about the Union?",
    right:
      "Lincoln held that the Union was perpetual, and Southern leaders that states could leave it",
    at: 0,
    wrong: [
      [
        "Lincoln held that states could leave the Union, and Southern leaders that it was perpetual",
        "The views are reversed.",
      ],
      [
        "Lincoln wanted slavery ended in the states, and Southern leaders wanted it to remain",
        "Lincoln pledged not to end slavery in the states.",
      ],
      [
        "Lincoln held that secession needed the consent of Congress, and Southern leaders that it needed a popular vote",
        "Lincoln denied that any state could lawfully leave.",
      ],
    ],
    why: "Lincoln argued that no state could lawfully leave the Union, and Southern leaders claimed a right to secede.",
    d: "The reversed choice is close because it names the same two views, but it gives each side the position of the other.",
  },
  {
    id: "q07",
    s: "secession",
    sub: "4.A",
    kc: ["KC-5.2.II.D"],
    q: "The Crittenden Compromise of 1860 is best understood in the context of which of the following?",
    right:
      "Efforts to keep the Union together by protecting slavery south of the line at 36°30′",
    at: 3,
    wrong: [
      [
        "The Compromise of 1850, which had admitted California as a free state",
        "That Compromise was passed ten years earlier.",
      ],
      [
        "A plan to end slavery gradually in the border states with payment to owners",
        "Crittenden's plan protected slavery.",
      ],
      [
        "A treaty with Britain that had settled the boundary of the Oregon country",
        "The Oregon treaty was signed in 1846.",
      ],
    ],
    why: "Senator Crittenden proposed amendments to protect slavery in the territories south of the line, in the hope of keeping the South in the Union.",
    d: "The Compromise of 1850 choice is close because both plans sought to preserve the Union, but the Crittenden plan came as the Southern states were seceding.",
  },
  {
    id: "q08",
    s: "secession",
    sub: "1.B",
    kc: ["KC-5.2.II.D"],
    q: "The Confederate States of America was formed in February 1861 by",
    right:
      "seven Southern states that had left the Union, with Jefferson Davis as president",
    at: 2,
    wrong: [
      [
        "all fifteen slave states, with Robert E. Lee as its first president",
        "Only seven states had left, and Davis was president.",
      ],
      [
        "Southern Democrats who remained in Congress, with Stephen Douglas as leader",
        "The Confederacy was formed outside the Union.",
      ],
      [
        "the states of the Upper South after the firing on Fort Sumter began the war",
        "The Confederacy was formed before Fort Sumter.",
      ],
    ],
    why: "South Carolina and six other states of the Deep South formed a new government and chose Davis as president.",
    d: "The all fifteen slave states choice is close because the Confederacy later grew to eleven states, but it began with seven and had Davis as its president.",
  },
  {
    id: "t01",
    s: "secession",
    sub: "2.A",
    kc: ["KC-5.2.II.D"],
    q: "Lincoln most likely addressed “my dissatisfied fellow-countrymen” in order to",
    right: "persuade Southerners that the choice between peace and civil war was theirs",
    at: 1,
    wrong: [
      [
        "ask Congress to declare war on the states that had left the Union",
        "The excerpt says the government will not assail them.",
      ],
      [
        "announce an end to slavery in the states that had left the Union",
        "He says that he has no purpose to interfere with slavery.",
      ],
      [
        "assure Northern voters that the Republicans had given up their platform",
        "He speaks to Southerners and keeps his position.",
      ],
    ],
    why: "Lincoln says that “in your hands . . . is the momentous issue of civil war,” and that the government “will not assail you.”",
    d: "The declare war choice is close because the speech came as the Union broke apart, but Lincoln said that the Southerners would be the aggressors.",
    stim: excerpts.lincolnFirstInaugural,
  },
  {
    id: "t02",
    s: "the-election-of-1860",
    sub: "3.A",
    kc: ["KC-5.2.II.D"],
    q: "Which of the following claims about slavery is best supported by the first paragraph of the excerpt?",
    right:
      "Lincoln promised not to interfere with slavery in the states where it existed",
    at: 3,
    wrong: [
      [
        "Lincoln promised to end slavery in the states by an act of Congress",
        "He says that he has no lawful right to do so.",
      ],
      [
        "Lincoln promised to ban slavery from the territories that were still unsettled",
        "The paragraph concerns slavery in the states.",
      ],
      [
        "Lincoln promised that slavery could spread to the western territories",
        "He opposed the spread of slavery.",
      ],
    ],
    why: "Lincoln says, “I have no purpose, directly or indirectly, to interfere with the institution of slavery in the States where it exists.”",
    d: "The territories choice is close because the Republican platform did oppose the spread of slavery, but the paragraph speaks only of slavery in the states.",
    stim: excerpts.lincolnFirstInaugural,
  },
  {
    id: "t03",
    s: "secession",
    sub: "4.A",
    kc: ["KC-5.2.II.D"],
    q: "Lincoln's statement that “the Union of these States is perpetual” is best understood as a response to",
    right: "the claim of Southern leaders that states could leave the Union",
    at: 0,
    wrong: [
      [
        "the claim of some abolitionists that the free states should leave the Union",
        "Lincoln was answering the secession then under way.",
      ],
      [
        "a proposal from Britain that the states form a looser confederation",
        "No such proposal was made.",
      ],
      [
        "the ruling in Dred Scott that Congress could not govern the territories",
        "The ruling concerned the territories.",
      ],
    ],
    why: "Seven states had already seceded when Lincoln spoke, and he denied that they had a right to do so.",
    d: "The abolitionists choice is close because some followers of William Lloyd Garrison called for disunion, but Lincoln was answering the secession of the Southern states.",
    stim: excerpts.lincolnFirstInaugural,
  },
]);

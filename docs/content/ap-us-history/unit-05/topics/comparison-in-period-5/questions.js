// Original practice questions for Topic 5.12. q-numbered items are topic practice.
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.12", [
  {
    id: "q01",
    s: "how-to-reason-about-comparison",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.2.I"],
    q: "Which of the following statements about the North and South in 1860 is a comparison?",
    right: "The North relied on free labor, while the South relied on enslaved labor",
    at: 2,
    wrong: [
      [
        "The North built canals and railroads because its cities needed to move goods",
        "This explains a cause and does not compare the two sections.",
      ],
      [
        "The South produced more cotton in 1860 than it had produced in 1800",
        "This describes a change over time in one section.",
      ],
      [
        "The South seceded in 1861 after Lincoln won the election of 1860",
        "This describes a single event in one section.",
      ],
    ],
    why: "A comparison places two things side by side in the same category, here the labor system and economy of each section.",
    d: "The canals choice is close because it concerns the North's economy, but it explains why the North built transportation and says nothing about the South.",
  },
  {
    id: "q02",
    s: "comparing-responses-to-slavery",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.2.I.A", "KC-5.2.I.B"],
    q: "Which of the following describes a difference between abolitionists and many free-soilers?",
    right:
      "Abolitionists condemned slavery as immoral, and many free-soilers wished to stop its spread",
    at: 0,
    wrong: [
      [
        "Abolitionists wished to stop the spread of slavery, and free-soilers wanted it ended everywhere",
        "The goals are assigned to the wrong groups.",
      ],
      [
        "Abolitionists defended slavery as a social good, and free-soilers opposed it",
        "Abolitionists opposed slavery.",
      ],
      [
        "Abolitionists made up most of the North, and free-soilers were a small minority",
        "Abolitionists were a minority in the North.",
      ],
    ],
    why: "Abolitionists made moral arguments against slavery itself, while free-soilers stressed that its spread threatened free labor.",
    d: "The reversed choice is close because it names the same two groups and the same two goals, but it assigns each goal to the wrong group.",
  },
  {
    id: "q03",
    s: "comparing-responses-to-slavery",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.2.II.B.ii"],
    q: "Which of the following describes a difference between Stephen Douglas and Abraham Lincoln in their debates of 1858?",
    right: "Douglas favored popular sovereignty, and Lincoln opposed slavery's spread",
    at: 3,
    wrong: [
      [
        "Douglas opposed the Union, and Lincoln defended it in the debates",
        "Both men supported the Union.",
      ],
      [
        "Douglas called for the end of slavery in the South, and Lincoln defended it there",
        "Neither man took those positions.",
      ],
      [
        "Douglas sought the repeal of the Fugitive Slave Act, and Lincoln sought to strengthen it",
        "The debates centered on the territories.",
      ],
    ],
    why: "Douglas would let settlers decide, while Lincoln and the Republicans held that slavery should not expand.",
    d: "The Union choice is close because the debates took place on the eve of secession, but both men wished to preserve the Union.",
  },
  {
    id: "q04",
    s: "comparing-responses-to-slavery",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.2.II.B.i", "KC-5.2.II.B.ii"],
    q: "Which of the following was a similarity between the Compromise of 1850 and the Kansas–Nebraska Act of 1854?",
    right: "Both used popular sovereignty to decide slavery's status in territories",
    at: 1,
    wrong: [
      [
        "Both repealed the ban on slavery north of the 36°30′ line",
        "Only the Kansas–Nebraska Act did so.",
      ],
      [
        "Both admitted a new state to the Union as a free state",
        "Only the Compromise of 1850 admitted California.",
      ],
      [
        "Both created a stronger law for the return of those who had escaped slavery",
        "Only the Compromise of 1850 did so.",
      ],
    ],
    why: "Both laws let the settlers of the territories decide, which was the idea of popular sovereignty.",
    d: "The repeal choice is close because it also concerns the territories, but only the Kansas–Nebraska Act repealed the Missouri Compromise line.",
  },
  {
    id: "q05",
    s: "comparing-the-war-and-reconstruction",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.3.I.D"],
    q: "Which of the following was an advantage of the Union over the Confederacy in the Civil War?",
    right: "A larger population, more factories, and a greater length of railroads",
    at: 0,
    wrong: [
      [
        "A stronger claim to the military loyalty of Southern officers",
        "Many Southern officers joined the Confederacy.",
      ],
      [
        "Control of the cotton crop that British mills wanted to buy",
        "The Confederacy held the cotton-growing region.",
      ],
      [
        "The support of Britain and France, which sent aid to the Union",
        "Neither power gave the Union aid in the war.",
      ],
    ],
    why: "The Union's greater manpower and industrial resources helped it to win a long war of attrition.",
    d: "The Southern officers choice is close because the Union did keep the army and navy, but a large number of officers resigned to serve the Confederacy.",
  },
  {
    id: "q06",
    s: "comparing-the-war-and-reconstruction",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.3.I.A"],
    q: "Which of the following was true of both the Union and the Confederacy during the Civil War?",
    right: "Both drafted soldiers and faced protest against the draft",
    at: 2,
    wrong: [
      [
        "Both relied on volunteers only until the war ended",
        "Both passed laws for a draft.",
      ],
      [
        "Both paid for the war with gold and silver coins alone",
        "Both issued paper money.",
      ],
      [
        "Both won diplomatic recognition from Britain and France",
        "Britain and France never recognized the Confederacy.",
      ],
    ],
    why: "The Confederacy passed a draft in 1862, the Union passed one in 1863, and both met resistance at home.",
    d: "The volunteers choice is close because both sides began with volunteers, but they turned to a draft when the volunteers ran short.",
  },
  {
    id: "q07",
    s: "comparing-the-war-and-reconstruction",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.3.I.B", "KC-5.3.II.A"],
    q: "Which of the following describes a difference between the Emancipation Proclamation and the Thirteenth Amendment?",
    right: "The Proclamation covered areas in rebellion, and the Amendment ended slavery",
    at: 1,
    wrong: [
      [
        "The Proclamation was ratified by the states, and the Amendment was a war order",
        "The descriptions are reversed.",
      ],
      [
        "The Proclamation ended slavery in the border states, and the Amendment did not",
        "The Proclamation did not apply to them.",
      ],
      [
        "The Proclamation followed the end of the war, and the Amendment came before it",
        "The Proclamation came in 1863, and the Amendment in 1865.",
      ],
    ],
    why: "Lincoln issued the Proclamation as a war measure, and the Amendment, ratified in 1865, made abolition part of the Constitution.",
    d: "The reversed choice is close because both documents concern emancipation, but it assigns the ratification to the war order.",
  },
  {
    id: "q08",
    s: "comparing-the-war-and-reconstruction",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.3.II.i"],
    q: "Which of the following was a similarity between the Civil War and Reconstruction?",
    right: "Both increased the power of the federal government over the states",
    at: 3,
    wrong: [
      [
        "Both left the Southern states in control of their own affairs",
        "Both brought new federal controls to the South.",
      ],
      [
        "Both gave the Supreme Court the leading role in making national policy",
        "Congress and the president led.",
      ],
      [
        "Both ended with a lasting guarantee of equal rights in the South",
        "Reconstruction ended with rights taken away.",
      ],
    ],
    why: "The war brought a draft, taxes, and a national bank, and Reconstruction brought the Freedmen's Bureau, army rule, and new amendments.",
    d: "The Southern control choice is close because Reconstruction ended with that result, but both periods began with federal action that limited the states.",
  },
  {
    id: "q09",
    s: "comparing-the-war-and-reconstruction",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.3.II.D", "KC-5.3.II.E"],
    q: "Which of the following compares the promise of the Reconstruction amendments with the results by 1900?",
    right: "They promised equal rights, but Black Southerners lost the vote",
    at: 2,
    wrong: [
      [
        "They promised land to freed people, and sharecropping gave them farms",
        "The amendments did not promise land.",
      ],
      [
        "They promised segregation, and Southern states soon ended the practice",
        "Segregation spread in the South.",
      ],
      [
        "They promised the vote to women, and Southern states granted it",
        "Women gained the national vote in 1920.",
      ],
    ],
    why: "Poll taxes, literacy tests, violence, and Jim Crow laws took away rights that the amendments had promised.",
    d: "The land choice is close because freed people wanted land, but the amendments did not promise it, and most freed people did not become owners.",
  },
]);

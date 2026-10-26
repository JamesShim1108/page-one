// Original practice questions for Topic 5.8. q-numbered items are topic practice;
// t-numbered items belong to the Unit 5 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.8", [
  {
    id: "q01",
    s: "mobilization-and-the-home-front",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.3.I.A"],
    q: "Which of the following describes a similarity between the Union and the Confederacy during the Civil War?",
    right: "Both used conscription and faced opposition to the draft at home",
    at: 2,
    wrong: [
      [
        "Both relied on a large navy to blockade the ports of the other side",
        "Only the Union blockaded its enemy's ports.",
      ],
      [
        "Both fought almost entirely on the territory of the Confederate states",
        "Battles took place in the North as well.",
      ],
      [
        "Both paid for the war entirely through taxes and avoided paper money",
        "Both governments printed paper money.",
      ],
    ],
    why: "The Confederacy passed a draft in 1862 and the Union in 1863, and both laws provoked protest.",
    d: "The navy choice is close because both sides had ships, but the Union held the navy and used it to blockade the South.",
  },
  {
    id: "q02",
    s: "mobilization-and-the-home-front",
    sub: "1.A",
    kc: ["KC-5.3.I.A"],
    q: "The New York City draft riots of July 1863 were a protest against",
    right: "a draft law that let men avoid service by paying $300 or hiring a substitute",
    at: 0,
    wrong: [
      [
        "a Confederate attack on New York harbor that threatened the city's trade",
        "No such attack took place.",
      ],
      [
        "a tax on imported goods that had raised prices in the city's stores",
        "The riots concerned the draft.",
      ],
      [
        "a strike by factory workers who were seeking higher wages in the city's mills",
        "The riots were a protest against the draft.",
      ],
    ],
    why: "Many poor workers resented a law that allowed the wealthy to buy their way out of service, and the riot turned violent.",
    d: "The Confederate attack choice is close because the war made many Northerners fear for their cities, but the riot was a protest against the draft.",
  },
  {
    id: "q03",
    s: "resources-strategy-and-leadership",
    sub: "1.B",
    kc: ["KC-5.3.I.D"],
    q: "The Anaconda Plan proposed by General Winfield Scott called for the Union to",
    right: "blockade Southern ports and take control of the Mississippi River",
    at: 1,
    wrong: [
      [
        "invade the South in a single drive to capture Richmond at once",
        "Scott's plan called for a long and slow squeeze.",
      ],
      [
        "ask Britain to join a blockade of the Confederate coast",
        "Britain was not asked to join.",
      ],
      [
        "negotiate an end to the war after the first major Union victory",
        "The plan assumed a long war.",
      ],
    ],
    why: "The plan aimed to squeeze the Confederacy by closing its ports and splitting it along the Mississippi.",
    d: "The Richmond choice is close because the capture of Richmond was a Union goal, but the Anaconda Plan was a slow strategy of blockade and river control.",
  },
  {
    id: "q04",
    s: "resources-strategy-and-leadership",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.I.D"],
    q: "Which of the following helped the Union to defeat the Confederacy?",
    right: "Its greater population and its larger number of factories and railroads",
    at: 3,
    wrong: [
      [
        "A navy built by the Confederacy that could not be stopped by the Union",
        "The Union held the navy and blockaded the South.",
      ],
      [
        "Recognition of the Union by Britain and France, who sent money and ships",
        "Neither power sent aid to the Union.",
      ],
      [
        "The loyalty of all slave states, including Virginia, Tennessee, and Arkansas",
        "Those states joined the Confederacy.",
      ],
    ],
    why: "The North could put more soldiers in the field and could supply and move them more easily.",
    d: "The Confederate navy choice is close because the Confederacy did use some ships and raiders, but it never broke the Union blockade.",
  },
  {
    id: "q05",
    s: "turning-points-and-total-war",
    sub: "1.A",
    kc: ["KC-5.3.I.D"],
    q: "The Union victories at Gettysburg and Vicksburg in July 1863 had which result?",
    right:
      "They ended Lee's invasion of the North and gave the Union the Mississippi River",
    at: 2,
    wrong: [
      [
        "They forced the Confederacy to ask for peace within a few months",
        "The war lasted until 1865.",
      ],
      [
        "They caused Britain to recognize the Confederacy as an independent nation",
        "Britain never recognized the Confederacy.",
      ],
      [
        "They led Lincoln to issue the Emancipation Proclamation to the Confederate states",
        "The Proclamation was issued on January 1, 1863.",
      ],
    ],
    why: "Gettysburg turned back Lee's army in Pennsylvania, and the fall of Vicksburg split the Confederacy.",
    d: "The peace within months choice is close because the victories changed the course of the war, but the fighting continued for nearly two more years.",
  },
  {
    id: "q06",
    s: "turning-points-and-total-war",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-5.3.I.D"],
    q: "Which of the following was a change in Union strategy by 1864?",
    right:
      "Attacking the railroads, farms, and cities of the South to break its ability to fight",
    at: 0,
    wrong: [
      [
        "Avoiding battle with Lee's army in order to preserve the Union's soldiers",
        "Grant pressed Lee's army throughout 1864.",
      ],
      [
        "Seeking a negotiated peace in which the Confederacy would keep its territory",
        "Lincoln insisted on reunion.",
      ],
      [
        "Giving up the blockade of Southern ports in order to open trade with Britain",
        "The blockade continued.",
      ],
    ],
    why: "Grant and Sherman moved from limited battles to a war on the South's resources, as in Sherman's march across Georgia.",
    d: "The avoiding battle choice is close because Union commanders in the East had once been cautious, but Grant fought Lee continuously in 1864.",
  },
  {
    id: "q07",
    s: "turning-points-and-total-war",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.I.D"],
    q: "Sherman's capture of Atlanta in September 1864 contributed to Lincoln's re-election because",
    right: "it raised Northern confidence that the Union would win the war",
    at: 1,
    wrong: [
      [
        "it forced the Confederacy to surrender before the voters went to the polls",
        "The Confederacy surrendered in 1865.",
      ],
      [
        "it ended the draft and allowed thousands of soldiers to return home to vote",
        "The draft continued.",
      ],
      [
        "it persuaded the Democrats to withdraw their candidate from the contest",
        "The Democrats ran General McClellan.",
      ],
    ],
    why: "Before the victory many Northerners were tired of the war, and the fall of Atlanta renewed their hope of success.",
    d: "The surrender choice is close because Atlanta was a major blow, but the Confederate armies kept fighting until the spring of 1865.",
  },
  {
    id: "q08",
    s: "mobilization-and-the-home-front",
    sub: "4.A",
    kc: ["KC-5.3.I.A"],
    q: "The bread riots in Richmond in April 1863 are best understood in the context of which of the following?",
    right: "Shortages and rising prices in the South caused by the war and the blockade",
    at: 3,
    wrong: [
      [
        "The capture of the Confederate capital by Union troops in the spring of 1863",
        "Richmond did not fall until April 1865.",
      ],
      [
        "A dispute between farmers and merchants over the price of cotton in Britain",
        "The riots concerned food in Richmond.",
      ],
      [
        "A strike by soldiers in the Confederate army who had not been paid in months",
        "The rioters were civilians.",
      ],
    ],
    why: "The war disrupted farming and trade, and the blockade and inflation made food scarce and costly.",
    d: "The capture of Richmond choice is close because the city was a target of the Union, but it was not captured until 1865.",
  },
  {
    id: "t01",
    s: "resources-strategy-and-leadership",
    sub: "3.A",
    kc: ["KC-5.3.I.D"],
    q: "Which of the following conclusions is best supported by the table?",
    right: "The Union had large advantages in population, railroads, and manufacturing",
    at: 2,
    wrong: [
      [
        "The Confederacy had more railroads than the Union but fewer people",
        "The Union had more than twice as many miles of railroad.",
      ],
      [
        "The Union and the Confederacy were nearly equal in manufacturing",
        "The Union produced roughly nine-tenths of the nation's manufacturing.",
      ],
      [
        "The Union's chief advantage was the large cotton crop that it grew and exported",
        "The Confederacy grew nearly all of the cotton.",
      ],
    ],
    why: "The table shows the Union with about 22 million people to the Confederacy's 9 million, more railroad mileage, and most of the nation's manufacturing.",
    d: "The railroads choice is close because the table does list railroad mileage, but it shows that the Union had more.",
    stim: excerpts.originalResourcesTable,
  },
  {
    id: "t02",
    s: "resources-strategy-and-leadership",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.I.D"],
    q: "Which of the following best explains why the Confederacy's cotton did not bring it victory, despite its place in the table?",
    right:
      "The Union's navy could blockade Southern ports and cut off the sale of cotton",
    at: 3,
    wrong: [
      [
        "Britain and France could buy all the cotton they needed from the Northern states",
        "The Northern states grew little cotton.",
      ],
      [
        "Confederate leaders refused to ship cotton to any foreign country during the war",
        "Southerners tried to sell cotton abroad.",
      ],
      [
        "The Confederacy had no way of growing cotton after the first year of the war",
        "Cotton continued to be grown.",
      ],
    ],
    why: "The table lists the Union as the holder of nearly all of the navy, which it used to close Southern ports.",
    d: "The Northern states choice is close because Britain needed a supply of cotton, but the North grew little and could not replace the South.",
    stim: excerpts.originalResourcesTable,
  },
  {
    id: "t03",
    s: "resources-strategy-and-leadership",
    sub: "4.B",
    kc: ["KC-5.3.I.D"],
    q: "The differences shown in the table are best understood in the context of which of the following?",
    right:
      "Decades of Northern industrial growth and a Southern economy built on cotton and slavery",
    at: 1,
    wrong: [
      [
        "A federal program of the 1850s that had built factories in the Northern cities",
        "The government did not build the factories.",
      ],
      [
        "A Confederate decision in 1861 to stop building railroads in order to save money",
        "The differences existed before the war.",
      ],
      [
        "A Union plan to destroy Southern factories during the first year of the war",
        "The Confederacy had few factories to destroy.",
      ],
    ],
    why: "The North developed factories, railroads, and cities, while the South invested in land and enslaved laborers and exported cotton.",
    d: "The federal program choice is close because the government did support some economic growth, but private investors built the Northern factories.",
    stim: excerpts.originalResourcesTable,
  },
]);

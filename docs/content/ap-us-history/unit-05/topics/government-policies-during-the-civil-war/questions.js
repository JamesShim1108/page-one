// Original practice questions for Topic 5.9. q-numbered items are topic practice;
// t-numbered items belong to the Unit 5 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.9", [
  {
    id: "q01",
    s: "from-union-to-emancipation",
    sub: "1.A",
    kc: ["KC-5.3.I.B"],
    q: "Lincoln and most Union supporters began the Civil War mainly to",
    right: "preserve the Union and bring back the Southern states",
    at: 2,
    wrong: [
      [
        "end slavery in every state of the nation",
        "Ending slavery became a purpose of the war later.",
      ],
      [
        "take Southern lands for Northern settlers",
        "The Union sought to restore the Southern states.",
      ],
      [
        "punish the leaders of the Confederate government",
        "The Union's aim was to restore the Union.",
      ],
    ],
    why: "Most Northerners saw the war as a fight to save the nation, and the aim of ending slavery came later.",
    d: "The end slavery choice is close because Lincoln disliked slavery, but at the start he said that the war was to preserve the Union.",
  },
  {
    id: "q02",
    s: "from-union-to-emancipation",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.I.B"],
    q: "Which of the following helped to cause Lincoln's decision to issue the Emancipation Proclamation?",
    right: "The need to weaken the Confederacy as enslaved people fled to Union lines",
    at: 0,
    wrong: [
      [
        "A Supreme Court order that all enslaved people in the Confederacy be freed",
        "The Court issued no such order.",
      ],
      [
        "A demand by the border states that slavery be ended in all of the states",
        "The border states opposed emancipation.",
      ],
      [
        "A promise by Britain to fight on the side of the Union if slavery ended",
        "Britain made no such promise.",
      ],
    ],
    why: "Enslaved labor supported the Confederate war effort, and freeing it would weaken the South and add soldiers to the Union army.",
    d: "The border states choice is close because Lincoln needed their loyalty, but they opposed emancipation and he did not apply the Proclamation to them.",
  },
  {
    id: "q03",
    s: "from-union-to-emancipation",
    sub: "1.B",
    kc: ["KC-5.3.I.B"],
    q: "The Emancipation Proclamation applied to",
    right: "areas of the Confederacy that were in rebellion",
    at: 3,
    wrong: [
      [
        "all enslaved people in the United States, including the border states",
        "It did not apply to the border states.",
      ],
      [
        "only the enslaved people living in the District of Columbia",
        "Congress had freed them earlier.",
      ],
      [
        "only the enslaved people who joined the Union army",
        "It applied to people in the areas in rebellion.",
      ],
    ],
    why: "Lincoln issued the order as a war measure, so it covered only the territory held by the enemy.",
    d: "The all enslaved people choice is close because the Proclamation is remembered as ending slavery, but it excluded the border states and did not end slavery everywhere.",
  },
  {
    id: "q04",
    s: "from-union-to-emancipation",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.I.B"],
    q: "Which of the following was an effect of the Emancipation Proclamation on the diplomacy of the war?",
    right: "It made it harder for Britain and France to support the Confederacy",
    at: 1,
    wrong: [
      [
        "It led Britain and France to recognize the Confederacy as a nation",
        "Neither power recognized the Confederacy.",
      ],
      [
        "It persuaded European powers to send troops to join the Union army",
        "No European power sent troops.",
      ],
      [
        "It ended the Union blockade by an agreement with the British government",
        "The blockade continued.",
      ],
    ],
    why: "Once the war was a fight against slavery, Britain and France could not easily support the South without seeming to support slavery.",
    d: "The recognition choice is close because the Confederacy hoped for recognition, but the Proclamation made it less likely.",
  },
  {
    id: "q05",
    s: "from-union-to-emancipation",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.I.B"],
    q: "How did the flight of enslaved people from Southern plantations affect the Confederacy?",
    right: "It cost the Confederacy labor and added workers and soldiers to the Union",
    at: 2,
    wrong: [
      [
        "It strengthened the Confederate army by adding thousands of enlisted men",
        "Those who fled joined the Union.",
      ],
      [
        "It caused the Union to return them to their owners under the Fugitive Slave Act",
        "The Union army generally did not return them.",
      ],
      [
        "It had little effect, because few people escaped from slavery during the war",
        "Many thousands escaped.",
      ],
    ],
    why: "Enslaved workers grew food and built defenses, and when they left for Union lines the Confederacy lost their labor.",
    d: "The Confederate army choice is close because the Confederacy did draft some enslaved men as laborers, but those who fled joined the Union.",
  },
  {
    id: "q06",
    s: "gettysburg-and-american-ideals",
    sub: "4.A",
    kc: ["KC-5.3.I.C"],
    q: "Lincoln's Gettysburg Address is best understood in the context of which of the following?",
    right:
      "A need to give meaning to the sacrifices of the war and link the Union cause to equality",
    at: 3,
    wrong: [
      [
        "A Union victory that had ended the war and restored the Southern states",
        "The war continued until 1865.",
      ],
      [
        "A debate in Congress over the passage of the Homestead Act",
        "The Act had passed in 1862.",
      ],
      [
        "A decision by the Confederacy to end the war on the terms of the Union",
        "The Confederacy fought on.",
      ],
    ],
    why: "Lincoln spoke at a cemetery during a long and costly war, and he tied the dead to the idea “that all men are created equal.”",
    d: "The Union victory choice is close because Gettysburg was a Union victory, but the war was not over, and Lincoln spoke of the work that remained.",
  },
  {
    id: "q07",
    s: "from-union-to-emancipation",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.3.I.B"],
    q: "Which of the following describes a difference between the purposes of the Union in 1861 and in 1863?",
    right:
      "In 1861 it sought to preserve the Union, and by 1863 it also sought to end slavery",
    at: 1,
    wrong: [
      [
        "In 1861 it sought to end slavery, and by 1863 it sought only to restore the Union",
        "The purposes are reversed.",
      ],
      [
        "In 1861 it sought to gain Southern land, and by 1863 it sought to defend its borders",
        "Neither was the Union's purpose.",
      ],
      [
        "In 1861 and in 1863 it sought only to preserve the Union and nothing more",
        "The Emancipation Proclamation added a new purpose.",
      ],
    ],
    why: "The Emancipation Proclamation added the end of slavery to the aim of preserving the Union.",
    d: "The reversed choice is close because it names the same two purposes, but it puts them in the wrong order.",
  },
  {
    id: "q08",
    s: "wartime-policies",
    sub: "1.B",
    kc: ["KC-5.3.I.C"],
    q: "Which of the following was a result of the absence of Southern members from Congress during the war?",
    right: "Congress passed laws such as the Homestead Act and the Pacific Railway Act",
    at: 0,
    wrong: [
      [
        "Congress ended the tariff and the national bank that the South had opposed",
        "Congress raised the tariff and created a national banking system.",
      ],
      [
        "Congress passed a stronger Fugitive Slave Act to help recapture people",
        "Congress later repealed the Fugitive Slave Acts.",
      ],
      [
        "Congress left the details of the war effort to the governors of the states",
        "The national government took on more power.",
      ],
    ],
    why: "Without Southern votes, Congress could pass western development laws that the South had blocked.",
    d: "The ended the tariff choice is close because the South had opposed those policies, but Congress raised the tariff and created a national bank.",
  },
  {
    id: "t01",
    s: "from-union-to-emancipation",
    sub: "3.A",
    kc: ["KC-5.3.I.B"],
    q: "Which of the following claims about emancipation is best supported by the excerpt?",
    right:
      "Lincoln justified emancipation as a war measure within his powers as commander-in-chief",
    at: 2,
    wrong: [
      [
        "Lincoln justified emancipation as a peacetime reform that Congress had ordered",
        "He cites his own power as commander-in-chief.",
      ],
      [
        "Lincoln justified emancipation as a punishment for slaveholders in the border states",
        "The excerpt concerns states in rebellion.",
      ],
      [
        "Lincoln justified emancipation as an act that required the approval of the Southern states",
        "He issues the order on his own authority.",
      ],
    ],
    why: "Lincoln writes “by virtue of the power in me vested as Commander-in-Chief” and “as a fit and necessary war measure for suppressing said rebellion.”",
    d: "The peacetime reform choice is close because emancipation was also a moral cause, but the excerpt bases the order on Lincoln's war powers.",
    stim: excerpts.emancipationProclamation,
  },
  {
    id: "t02",
    s: "from-union-to-emancipation",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.I.B"],
    q: "The Proclamation's provision that Black men “will be received into the armed service” most directly led to",
    right: "the enlistment of thousands of African Americans in the Union Army",
    at: 1,
    wrong: [
      [
        "an immediate grant of citizenship to African American soldiers",
        "The provision did not grant citizenship.",
      ],
      ["an end to the draft in the Northern states", "The draft continued."],
      [
        "the return of freed people to their former owners after the war",
        "The Proclamation declared them free.",
      ],
    ],
    why: "About 180,000 Black men served in the Union army, and their service strengthened the Union and the claim of African Americans to citizenship.",
    d: "The citizenship choice is close because Black service later supported claims to citizenship, but the Proclamation did not grant it.",
    stim: excerpts.emancipationProclamation,
  },
  {
    id: "t03",
    s: "from-union-to-emancipation",
    sub: "4.B",
    kc: ["KC-5.3.I.B"],
    q: "Why did the Proclamation apply only to areas “in rebellion against the United States”?",
    right:
      "It rested on Lincoln's war powers, and he did not want to lose the border states",
    at: 3,
    wrong: [
      [
        "The Supreme Court had ruled that the president could free only some people",
        "The Court had issued no such ruling.",
      ],
      [
        "Congress had voted to limit the order to the states that had left the Union",
        "Lincoln acted on his own authority.",
      ],
      [
        "The Confederate government had agreed to free those people in exchange for peace",
        "The Confederacy made no such agreement.",
      ],
    ],
    why: "As commander-in-chief, Lincoln could take measures against the enemy, and he wished to keep the loyal slave states in the Union.",
    d: "The Supreme Court choice is close because the Court was shaping the debate over slavery, but it had not limited Lincoln's order.",
    stim: excerpts.emancipationProclamation,
  },
]);

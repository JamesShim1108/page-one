// Original practice questions for Topic 5.10. q-numbered items are topic practice;
// t-numbered items belong to the Unit 5 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.10", [
  {
    id: "q01",
    s: "plans-for-reconstruction",
    sub: "1.A",
    kc: ["KC-5.3.II.ii"],
    q: "Lincoln's Ten Percent Plan of 1863 proposed that",
    right: "a state could return once ten percent of its voters took a loyalty oath",
    at: 1,
    wrong: [
      [
        "a state could return only after a majority of its voters had taken an oath of loyalty",
        "That was the requirement of the Wade–Davis Bill.",
      ],
      [
        "former Confederate leaders be tried for treason and their land given to freed people",
        "The plan was lenient and did not seize land.",
      ],
      [
        "the army govern the Southern states for a decade before any state could return",
        "That described Congress's later plan.",
      ],
    ],
    why: "Lincoln wanted to restore the Southern states quickly, and he asked only a small share of voters to accept the Union and the end of slavery.",
    d: "The majority oath choice is close because it was also a loyalty oath, but it was the requirement of the stricter Wade–Davis Bill.",
  },
  {
    id: "q02",
    s: "plans-for-reconstruction",
    sub: "1.B",
    kc: ["KC-5.3.II.ii"],
    q: "The Black Codes passed by Southern states in 1865 and 1866",
    right: "limited the freedom of freed people, such as their work and movement",
    at: 3,
    wrong: [
      [
        "gave freed people the right to vote and to hold office in the Southern states",
        "The Codes denied political rights.",
      ],
      [
        "were federal laws that protected the property of freed people in the South",
        "They were state laws and they restricted freed people.",
      ],
      [
        "required the Northern states to return people who had escaped slavery",
        "They concerned the former slave states.",
      ],
    ],
    why: "The Codes tried to keep Black workers on the plantations under conditions close to slavery, and they angered Northerners.",
    d: "The right to vote choice is close because Reconstruction later brought the vote to Black men, but the Codes aimed to deny it.",
  },
  {
    id: "q03",
    s: "plans-for-reconstruction",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.II.C"],
    q: "Which of the following helps to explain why Congress passed the Reconstruction Acts of 1867?",
    right:
      "Southern governments had passed Black Codes and elected former Confederate leaders",
    at: 0,
    wrong: [
      [
        "President Johnson had asked Congress to take control of the process of Reconstruction",
        "Johnson opposed the Acts and vetoed them.",
      ],
      [
        "The Supreme Court had ordered the army to occupy the Southern states",
        "Congress acted before the Court did.",
      ],
      [
        "Northern states had demanded that the South pay the cost of the war",
        "The Acts concerned rights and government.",
      ],
    ],
    why: "Many Republicans believed that Johnson's plan had returned power to the old leaders without protecting the freed people.",
    d: "The Johnson request choice is close because the president had a role in Reconstruction, but he opposed the Acts and Congress passed them over his veto.",
  },
  {
    id: "q04",
    s: "the-reconstruction-amendments",
    sub: "1.A",
    kc: ["KC-5.3.II.A"],
    q: "The Fourteenth Amendment (1868)",
    right: "made all persons born in the United States citizens",
    at: 2,
    wrong: [
      [
        "gave African American men the right to vote throughout the nation",
        "That was the Fifteenth Amendment.",
      ],
      [
        "abolished slavery in every part of the United States",
        "That was the Thirteenth Amendment.",
      ],
      [
        "gave women the right to vote in elections for federal office",
        "That was the Nineteenth Amendment of 1920.",
      ],
    ],
    why: "The Amendment overturned the Dred Scott ruling on citizenship and set a standard of equal protection for all persons.",
    d: "The right to vote choice is close because the three amendments are often taught together, but the Fifteenth Amendment dealt with voting.",
  },
  {
    id: "q05",
    s: "the-reconstruction-amendments",
    sub: "1.B",
    kc: ["KC-5.3.II.A"],
    q: "The Fifteenth Amendment (1870) barred the denial of the vote",
    right: "on account of race, color, or previous condition of servitude",
    at: 3,
    wrong: [
      [
        "on account of sex, which opened the vote to all adult women",
        "The amendment did not mention sex.",
      ],
      [
        "to men who could not read, which ended the use of literacy tests",
        "The Amendment did not ban such tests.",
      ],
      [
        "to men who owned no property, which ended property requirements",
        "Most states had already dropped those requirements.",
      ],
    ],
    why: "The Amendment aimed to protect the vote of Black men, but it left room for states to use other tests.",
    d: "The sex choice is close because women's suffrage leaders wanted it included, but the Amendment did not mention sex.",
  },
  {
    id: "q06",
    s: "the-reconstruction-amendments",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.II.B"],
    q: "Why did Elizabeth Cady Stanton and Susan B. Anthony oppose the Fifteenth Amendment?",
    right: "It extended the vote to Black men but not to women",
    at: 1,
    wrong: [
      [
        "It denied Black men the right to vote in the states of the North",
        "It protected the vote of Black men.",
      ],
      [
        "It required women to pay a poll tax before they could vote",
        "It did not mention women or taxes.",
      ],
      [
        "It gave the vote to immigrants before it gave the vote to women",
        "It concerned race and not immigration.",
      ],
    ],
    why: "Stanton and Anthony had worked for both causes and were disappointed that the amendment did not include women.",
    d: "The Black men choice is close because they were concerned with Black rights, but they had favored them and objected to the omission of women.",
  },
  {
    id: "q07",
    s: "plans-for-reconstruction",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.3.II.C"],
    q: "Which of the following describes a difference between Johnson's Reconstruction and Congressional Reconstruction after 1867?",
    right:
      "Johnson let the South return with few conditions, and Congress imposed army rule",
    at: 0,
    wrong: [
      [
        "Johnson required Black men to vote in the South, and Congress forbade their voting",
        "The positions are reversed.",
      ],
      [
        "Johnson punished Confederate leaders harshly, and Congress pardoned all of them",
        "Johnson pardoned most Confederates.",
      ],
      [
        "Johnson ruled the South by the army, and Congress returned it to civilian rule",
        "Congress set up military districts.",
      ],
    ],
    why: "Johnson's plan restored the Southern governments quickly, while the Reconstruction Acts placed the South under the army and required Black suffrage.",
    d: "The reversed choice is close because both plans dealt with Black voting, but Johnson opposed it and Congress required it.",
  },
  {
    id: "q08",
    s: "reconstruction-in-the-south",
    sub: "1.A",
    kc: ["KC-5.3.II.C"],
    q: "Which of the following was a political opportunity opened to African Americans during Reconstruction?",
    right: "Black men voted and held office, including seats in Congress",
    at: 2,
    wrong: [
      [
        "Black men held a majority of the seats in every Southern state legislature",
        "That was true in only a few states, and for a short time.",
      ],
      [
        "Black women won the right to vote in elections in the Southern states",
        "Women did not vote in this period.",
      ],
      [
        "Black Southerners gained control of the federal courts in the Southern states",
        "Federal judges were appointed by the president.",
      ],
    ],
    why: "Black voters elected Black officials, such as Hiram Revels, who served in the Senate from Mississippi.",
    d: "The majority of seats choice is close because Black officeholders were numerous in some states, but they did not hold a majority in every one.",
  },
  {
    id: "q09",
    s: "plans-for-reconstruction",
    sub: "4.A",
    kc: ["KC-5.3.II.C"],
    q: "The impeachment of Andrew Johnson in 1868 is best understood in the context of which of the following?",
    right:
      "A struggle between Congress and the president over how to carry out Reconstruction",
    at: 3,
    wrong: [
      [
        "A charge that Johnson had helped to plan the assassination of Lincoln",
        "No such charge was made.",
      ],
      [
        "A dispute between Johnson and Congress over the purchase of Alaska",
        "Johnson's administration purchased Alaska in 1867.",
      ],
      [
        "A decision by the Supreme Court that Johnson had broken the Constitution",
        "The Supreme Court played no part.",
      ],
    ],
    why: "Radical Republicans in Congress clashed with Johnson over the Reconstruction Acts and the Tenure of Office Act, and the House voted to impeach him.",
    d: "The assassination choice is close because Johnson came to office after Lincoln's death, but the impeachment concerned his conflict with Congress.",
  },
  {
    id: "t01",
    s: "the-reconstruction-amendments",
    sub: "3.A",
    kc: ["KC-5.3.II.A"],
    q: "Which of the following statements about the amendments is best supported by the table?",
    right: "Each amendment left some question of rights unsettled or open to evasion",
    at: 1,
    wrong: [
      [
        "The amendments gave equal rights in practice to all of the nation's people",
        "The right-hand column lists gaps that remained.",
      ],
      [
        "The amendments were ratified in an order opposite to their numbers",
        "They were ratified in 1865, 1868, and 1870.",
      ],
      [
        "All three amendments applied only to the states that had joined the Confederacy",
        "The table describes national rules.",
      ],
    ],
    why: "The last column lists a gap for each amendment: forced labor for crime, the limits of the vote, and the omission of women.",
    d: "The equal rights choice is close because the amendments did extend rights, but the table shows what each one left open.",
    stim: excerpts.originalAmendmentsTable,
  },
  {
    id: "t02",
    s: "the-reconstruction-amendments",
    sub: "3.B",
    kc: ["KC-5.3.II.B"],
    q: "Which detail in the table best supports the claim that the amendments divided the women's rights movement?",
    right: "The Fourteenth Amendment wrote “male” into the Constitution",
    at: 3,
    wrong: [
      [
        "The Thirteenth Amendment allowed forced labor as a punishment for crime",
        "That detail concerns slavery and crime.",
      ],
      [
        "The Fifteenth Amendment was ratified in 1870, five years after the Thirteenth",
        "A date does not show a division.",
      ],
      [
        "The Fourteenth Amendment made all persons born in the nation citizens",
        "That detail does not concern women's voting.",
      ],
    ],
    why: "Women's suffrage leaders disagreed about whether to support amendments that gave the vote to Black men and left out women.",
    d: "The Thirteenth Amendment choice is close because it is another detail in the table, but it concerns forced labor and not the vote.",
    stim: excerpts.originalAmendmentsTable,
  },
  {
    id: "t03",
    s: "the-reconstruction-amendments",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.II.A"],
    q: "The exception in the Thirteenth Amendment for punishment for crime contributed most directly to which development?",
    right:
      "Southern laws that made minor offenses crimes and forced freed people to work",
    at: 0,
    wrong: [
      [
        "The creation of the Freedmen's Bureau to help the freed people",
        "The Bureau was created to help them.",
      ],
      [
        "The passage of the Civil Rights Act of 1866 over Johnson's veto",
        "The Act protected the freed people.",
      ],
      [
        "The impeachment of Johnson by the House of Representatives in 1868",
        "That event concerned the president and Congress.",
      ],
    ],
    why: "The Black Codes and later convict labor used the exception to hold freed people to forced work.",
    d: "The Civil Rights Act choice is close because it responded to the Black Codes, but it was a reaction to them and not an effect of the exception.",
    stim: excerpts.originalAmendmentsTable,
  },
]);

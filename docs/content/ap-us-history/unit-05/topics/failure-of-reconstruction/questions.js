// Original practice questions for Topic 5.11. q-numbered items are topic practice;
// t-numbered items belong to the Unit 5 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.11", [
  {
    id: "q01",
    s: "land-and-sharecropping",
    sub: "1.A",
    kc: ["KC-5.3.II.D"],
    q: "Which of the following describes land ownership in the South after Reconstruction?",
    right: "Planters still held most of the land, and most freed people owned none",
    at: 1,
    wrong: [
      [
        "Most freed people gained land under Sherman's order and were able to keep it",
        "Johnson ordered most of the land returned to its former owners.",
      ],
      [
        "The federal government owned most of the farmland and rented it to farmers",
        "Most farmland remained in private hands.",
      ],
      [
        "Small white farmers held most of the land after the planters had sold their farms",
        "Planters kept most of their land.",
      ],
    ],
    why: "Planters kept their land, and Congress did not give land to the freed people.",
    d: "The Sherman's order choice is close because Sherman did set aside land for freed families in 1865, but President Johnson returned most of it to its owners.",
  },
  {
    id: "q02",
    s: "land-and-sharecropping",
    sub: "1.B",
    kc: ["KC-5.3.II.D"],
    q: "Under the sharecropping system, a farm family typically",
    right: "worked a plot owned by a landowner in return for a share of the crop",
    at: 3,
    wrong: [
      [
        "owned its farm and rented the land to a planter for part of the crop",
        "Sharecroppers did not own the land.",
      ],
      [
        "worked for daily wages paid in cash by the owner of the plantation",
        "Sharecroppers were paid with a share of the crop.",
      ],
      [
        "worked on land that the government had rented to it at a low cost",
        "The government did not rent land to sharecroppers.",
      ],
    ],
    why: "Sharecropping gave families a plot to farm without cash, but it kept them poor and in debt.",
    d: "The owned its farm choice is close because it also involves a share of the crop, but sharecroppers worked land that belonged to others.",
  },
  {
    id: "q03",
    s: "land-and-sharecropping",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.II.D"],
    q: "Which of the following helps to explain why many sharecroppers remained in debt?",
    right:
      "They bought supplies on credit at high prices, and the debts often exceeded their crops",
    at: 0,
    wrong: [
      [
        "The federal government taxed their crops more heavily than any other crop",
        "No such tax existed.",
      ],
      [
        "They were paid wages that were too low to allow them to buy a farm",
        "Sharecroppers received a share of the crop and not wages.",
      ],
      [
        "The Freedmen's Bureau charged them high interest on money lent for seed",
        "The Bureau aimed to help the freed people.",
      ],
    ],
    why: "Merchants charged high prices on credit, and sharecroppers who could not repay owed the debt into the next year.",
    d: "The federal tax choice is close because farmers did pay taxes, but their debts came from credit given by merchants and landowners.",
  },
  {
    id: "q04",
    s: "land-and-sharecropping",
    sub: "4.A",
    kc: ["KC-5.3.II.D"],
    q: "The spread of sharecropping is best understood in the context of which of the following?",
    right: "Freed people who wanted land and planters who had land but little cash",
    at: 2,
    wrong: [
      [
        "A shortage of buyers for cotton in Britain after the Civil War",
        "Cotton continued to be sold abroad.",
      ],
      [
        "A federal program that sold farms to freed people at low prices",
        "Congress did not fund any such sale of farms.",
      ],
      [
        "A law that required planters to pay their workers daily wages in cash",
        "Planters faced no legal duty to pay cash wages.",
      ],
    ],
    why: "Planters had land but no cash to pay wages, and freed people had labor but no land, so they agreed to share the crop.",
    d: "The shortage of buyers choice is close because cotton prices fell in later years, but cotton was still sold, and the system arose from a lack of cash and land.",
  },
  {
    id: "q05",
    s: "redeemers-violence-and-the-end",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.3.II.E"],
    q: "Which of the following helped Redeemers to regain control of Southern state governments?",
    right: "Violence and intimidation against Black voters and Republican officials",
    at: 3,
    wrong: [
      [
        "A federal law that barred Republican officeholders from state governments",
        "Congress passed no ban on Republican officeholders.",
      ],
      [
        "The Supreme Court's order for the army to leave the Southern states",
        "The president withdrew the troops.",
      ],
      [
        "The growth of the Republican Party among white landowners in the South",
        "Most white Southerners voted for the Democrats.",
      ],
    ],
    why: "The Klan and similar groups attacked Black voters and Republicans, and fewer people voted as the violence grew.",
    d: "The federal law choice is close because Congress did pass laws about officeholders, but the laws it passed protected Black voters and did not remove Republicans.",
  },
  {
    id: "q06",
    s: "redeemers-violence-and-the-end",
    sub: "1.B",
    kc: ["KC-5.3.II.E"],
    q: "The Compromise of 1877 is usually described as an arrangement in which",
    right: "Hayes became president and federal troops were withdrawn from the South",
    at: 1,
    wrong: [
      [
        "Tilden became president and the army remained in the South for several years",
        "Hayes became president.",
      ],
      [
        "Congress passed a new Civil Rights Act to protect Black voters in the South",
        "Federal protection ended.",
      ],
      [
        "Democrats accepted the Reconstruction amendments in return for a lower tariff",
        "The arrangement concerned the election and the troops.",
      ],
    ],
    why: "Southern Democrats accepted Hayes's election, and he soon ended the army's presence in the South.",
    d: "The Tilden choice is close because Tilden won the popular vote, but the commission gave the disputed electoral votes to Hayes.",
  },
  {
    id: "q07",
    s: "retreat-from-equal-rights",
    sub: "1.A",
    kc: ["KC-5.3.II.E"],
    q: "In Plessy v. Ferguson (1896), the Supreme Court",
    right:
      "upheld laws that required separate public facilities for Black and white people",
    at: 0,
    wrong: [
      [
        "ruled that the Fourteenth Amendment barred segregation in public schools",
        "That was the ruling in Brown v. Board of Education (1954).",
      ],
      [
        "struck down the poll taxes that Southern states used to limit voting",
        "The Court did not strike down poll taxes in this case.",
      ],
      [
        "held that Congress could ban discrimination by private businesses",
        "The Court had rejected that view in 1883.",
      ],
    ],
    why: "The Court held that “separate but equal” facilities satisfied the Constitution, which supported segregation for decades.",
    d: "The Brown choice is close because both cases concerned segregation, but Brown overturned the Plessy rule more than fifty years later.",
  },
  {
    id: "q08",
    s: "retreat-from-equal-rights",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-5.3.II.D", "KC-5.3.II.E"],
    q: "Which of the following describes a continuity in the South from before the Civil War to the end of Reconstruction?",
    right: "White landowners kept most of the land and much of the political power",
    at: 2,
    wrong: [
      [
        "Black men continued to vote freely and to hold office in large numbers",
        "Violence and laws pushed them out of politics.",
      ],
      [
        "The federal army continued to enforce civil rights in every Southern state",
        "The troops were withdrawn in 1877.",
      ],
      [
        "Public schools remained closed and the freed people had no churches",
        "Freed people founded schools and churches.",
      ],
    ],
    why: "Slavery had ended, but the planters kept their land, and white Democrats regained control of state governments.",
    d: "The voting freely choice is close because Black men did vote during Reconstruction, but the gain did not last.",
  },
  {
    id: "t01",
    s: "redeemers-violence-and-the-end",
    sub: "3.A",
    kc: ["KC-5.3.II.E"],
    q: "Which of the following claims is best supported by the first paragraph of the excerpt?",
    right: "Hayes held that the South should govern itself and protect the rights of all",
    at: 2,
    wrong: [
      [
        "Hayes held that the South must remain under the army until it became prosperous",
        "He calls for local self-government.",
      ],
      [
        "Hayes held that Black voters should govern the South until the poverty ended",
        "He does not call for rule by one group.",
      ],
      [
        "Hayes held that the poverty of the South had been caused by federal taxes",
        "He does not name the cause of the poverty.",
      ],
    ],
    why: "Hayes calls local self-government “the imperative necessity” and says that only a government that “maintains inviolate the rights of all is a true self-government.”",
    d: "The army choice is close because troops were still in some Southern states, but Hayes calls for self-government and not for continued military rule.",
    stim: excerpts.hayesInaugural,
  },
  {
    id: "t02",
    s: "redeemers-violence-and-the-end",
    sub: "2.B",
    kc: ["KC-5.3.II.E"],
    q: "Hayes most likely promised to serve the interests of “the white and of the colored people both and equally” in order to",
    right:
      "win the confidence of both races while ending federal intervention in Southern affairs",
    at: 1,
    wrong: [
      [
        "announce a new program of federal land grants to the freed people",
        "The excerpt does not propose land grants.",
      ],
      [
        "justify the permanent presence of federal troops in the Southern states",
        "He calls for local self-government.",
      ],
      [
        "ask Congress to remove the governors of the Southern states from office",
        "He does not propose removing governors.",
      ],
    ],
    why: "Hayes had won a disputed election, and he addressed Southerners of both races as he moved to end federal oversight of the South.",
    d: "The land grants choice is close because the freed people wanted land, but the excerpt makes no such promise.",
    stim: excerpts.hayesInaugural,
  },
  {
    id: "t03",
    s: "retreat-from-equal-rights",
    sub: "3.D",
    kc: ["KC-5.3.II.E"],
    q: "Which later development most clearly shows that the promise in the second paragraph was not kept?",
    right: "Segregation laws and voting limits that took away African Americans' rights",
    at: 3,
    wrong: [
      [
        "The ratification of the Fifteenth Amendment, which protected the vote in 1870",
        "That event came before Hayes's speech.",
      ],
      [
        "The passage of the Homestead Act, which opened western land to settlers",
        "That law was passed in 1862.",
      ],
      [
        "The purchase of Alaska from Russia during the presidency of Andrew Johnson",
        "That purchase was made in 1867.",
      ],
    ],
    why: "Hayes spoke of ending “the color line,” but Southern states soon passed Jim Crow laws, poll taxes, and literacy tests.",
    d: "The Fifteenth Amendment choice is close because it concerned rights, but it was ratified in 1870, seven years before Hayes spoke.",
    stim: excerpts.hayesInaugural,
  },
]);

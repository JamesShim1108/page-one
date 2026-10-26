// Original practice questions for Topic 4.8. q-numbered items are topic practice;
// t-numbered items belong to the Unit 4 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("4.8", [
  {
    id: "q01",
    s: "democrats-and-whigs",
    sub: "1.A",
    kc: ["KC-4.1.I.C"],
    q: "In the 1830s, the Whig Party led by Henry Clay generally supported",
    right: "a national bank, high tariffs, and federal funding of internal improvements",
    at: 2,
    wrong: [
      [
        "a limited federal government, state banks, and low tariffs on imported goods",
        "That describes the Democrats led by Jackson.",
      ],
      [
        "an end to the national bank and the abolition of all tariffs and roads",
        "The Whigs supported the American System.",
      ],
      [
        "a ban on federal spending and a requirement that states build their own roads",
        "The Whigs favored federal action on the economy.",
      ],
    ],
    why: "The Whigs favored the American System and a more active role for the federal government in the economy.",
    d: "The limited government choice is close because it describes the opposing party, the Democrats.",
  },
  {
    id: "q02",
    s: "democrats-and-whigs",
    sub: "1.B",
    kc: ["KC-4.1.I.C"],
    q: "Jackson vetoed the renewal of the charter of the Second Bank of the United States in 1832 because he believed that",
    right:
      "the Bank was a monopoly that favored the wealthy at the expense of ordinary Americans",
    at: 0,
    wrong: [
      [
        "the Bank had failed to provide a stable currency and had ruined the national credit",
        "Jackson's objection concerned privilege and power, not the stability of the currency.",
      ],
      [
        "the Supreme Court had ruled that a national bank violated the Constitution",
        "The Court had upheld the bank in McCulloch v. Maryland.",
      ],
      [
        "the states had asked Congress to replace the Bank with a system of federal courts",
        "No such request was made.",
      ],
    ],
    why: "Jackson portrayed the Bank as an institution that served the rich and had too much power, and he won reelection after the veto.",
    d: "The currency choice is close because the Bank had a role in the currency, but Jackson's argument was about privilege.",
  },
  {
    id: "q03",
    s: "nullification-crisis",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.I.C"],
    q: "South Carolina's decision to nullify federal law in 1832 was a response to",
    right: "the tariffs of 1828 and 1832, which Southerners believed favored the North",
    at: 1,
    wrong: [
      [
        "Jackson's removal of federal deposits from the Second Bank of the United States",
        "The deposit removal came after the nullification dispute began and involved a different issue.",
      ],
      [
        "the Indian Removal Act, which South Carolina believed treated Native nations unfairly",
        "Southern states generally supported removal.",
      ],
      [
        "the Missouri Compromise, which had banned slavery north of a line in the Louisiana Purchase",
        "That compromise dated from 1820 and did not cause the tariff dispute.",
      ],
    ],
    why: "Southerners thought the high tariffs raised prices and served Northern manufacturers, and South Carolina declared them null and void.",
    d: "The Bank choice is close because the Bank War took place at the same time, but nullification was a protest against the tariffs.",
  },
  {
    id: "q04",
    s: "nullification-crisis",
    sub: "1.B",
    kc: ["KC-4.1.I.C"],
    q: "How was the nullification crisis resolved in 1833?",
    right:
      "Congress passed a compromise tariff and a Force Act, and South Carolina backed down",
    at: 3,
    wrong: [
      [
        "The Supreme Court ordered South Carolina to pay the tariff and removed its state officials",
        "The Court did not decide the dispute in this way.",
      ],
      [
        "Jackson sent the army to occupy Charleston and ended the tariff by executive order",
        "The army was not used, and Congress passed the compromise.",
      ],
      [
        "South Carolina left the Union and formed a government with the other Southern states",
        "South Carolina did not secede in 1833.",
      ],
    ],
    why: "The compromise tariff lowered duties gradually, and the Force Act allowed the president to enforce the law, so South Carolina backed down.",
    d: "The army choice is close because Jackson threatened force, but the crisis ended through a compromise.",
  },
  {
    id: "q05",
    s: "indian-removal",
    sub: "1.A",
    kc: ["KC-4.3.I.B"],
    q: "The Indian Removal Act of 1830",
    right:
      "authorized the president to exchange lands in the West for Native lands in the East",
    at: 2,
    wrong: [
      [
        "recognized the Cherokee Nation as a foreign nation with its own territory in Georgia",
        "The Supreme Court ruled in 1831 that the Cherokee Nation was not a foreign nation.",
      ],
      [
        "made American Indians citizens so that they could keep their lands in the East",
        "The act did not grant citizenship.",
      ],
      [
        "created reservations in the East that were protected from settlers by federal troops",
        "The act aimed at relocation to the West.",
      ],
    ],
    why: "The law gave the president power to negotiate the exchange of land and became the basis for the removal of many nations.",
    d: "The foreign nation choice is close because the Cherokee did seek that recognition, but the law supported removal.",
  },
  {
    id: "q06",
    s: "indian-removal",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.3.I.B"],
    q: "Which of the following best explains why settlers and state governments in the Southeast supported Indian removal?",
    right:
      "They wanted access to Native lands for farming, especially for growing cotton",
    at: 0,
    wrong: [
      [
        "They believed that Native nations had formed an alliance with Britain against the United States",
        "The removal debate of the 1830s was about land.",
      ],
      [
        "They hoped to protect Native nations from attacks by neighboring settlers in the West",
        "The settlers wanted the land for themselves.",
      ],
      [
        "They were required to do so by a Supreme Court decision in Worcester v. Georgia",
        "The Court's decision in Worcester favored the Cherokee.",
      ],
    ],
    why: "Frontier settlers wanted to expand, and cotton made Southeastern land very valuable.",
    d: "The alliance choice is close because the fear of a British alliance was a cause of the War of 1812, but removal in the 1830s was driven by land.",
  },
  {
    id: "q07",
    s: "indian-removal",
    sub: "4.A",
    kc: ["KC-4.3.I.B"],
    q: "The Trail of Tears (1838–1839) is best understood in the context of which of the following?",
    right: "Federal policy to relocate Native nations west of the Mississippi",
    at: 1,
    wrong: [
      [
        "A voluntary migration of the Cherokee Nation toward better farmland in the West",
        "The removal was forced by the army.",
      ],
      [
        "A plan to send Native nations to Africa under the American Colonization Society",
        "That society proposed sending free Black Americans to Africa.",
      ],
      [
        "The Supreme Court's order that the Cherokee leave Georgia in return for payment",
        "The Court had ruled in the Cherokee's favor in Worcester v. Georgia.",
      ],
    ],
    why: "Under the Indian Removal Act and the Treaty of New Echota, the army forced the Cherokee westward.",
    d: "The voluntary migration choice is close because some Cherokee had moved earlier, but this removal was forced.",
  },
  {
    id: "q08",
    s: "democrats-and-whigs",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-4.1.I.C"],
    q: "Which of the following describes a difference between Democrats and Whigs in the 1830s?",
    right:
      "Democrats favored limited national power, while Whigs favored federal economic action",
    at: 3,
    wrong: [
      [
        "Democrats favored a national bank, while Whigs wanted the states to charter all banks",
        "The parties took the opposite positions.",
      ],
      [
        "Democrats wanted federal funding of roads, while Whigs opposed all internal improvements",
        "Whigs favored federal funding of internal improvements.",
      ],
      [
        "Democrats favored high protective tariffs, while Whigs wanted free trade with Britain",
        "Whigs favored protective tariffs.",
      ],
    ],
    why: "Democrats under Jackson distrusted concentrated economic power, while Whigs followed Clay's American System.",
    d: "The national bank choice is close because the bank divided the parties, but the Whigs were the party of the bank.",
  },
  {
    id: "t01",
    s: "indian-removal",
    sub: "2.A",
    kc: ["KC-4.3.I.B"],
    q: "Jackson's primary purpose in the excerpt was most likely to",
    right:
      "justify the removal policy to Congress and encourage the remaining nations to accept it",
    at: 2,
    wrong: [
      [
        "ask Congress to repeal the Indian Removal Act after the first nations accepted it",
        "He praises the law and reports its success.",
      ],
      [
        "announce that the army would force the remaining nations to leave if they refused",
        "He says nothing about the use of the army.",
      ],
      [
        "defend the Supreme Court's recent decisions on the rights of the Cherokee Nation",
        "The excerpt does not mention the Court.",
      ],
    ],
    why: "Jackson reports that two nations have agreed to removal and expects that others will follow their example.",
    d: "The repeal choice is close because the excerpt discusses the law, but Jackson is defending it.",
    stim: excerpts.jacksonRemoval,
  },
  {
    id: "t02",
    s: "indian-removal",
    sub: "3.B",
    kc: ["KC-4.3.I.B"],
    q: "Which of the following arguments does Jackson make in support of removal in the second paragraph?",
    right:
      "Removal would end possible conflict between federal and state governments over Native lands",
    at: 0,
    wrong: [
      [
        "Removal would protect the right of Native nations to govern themselves in the East",
        "He proposes moving them west.",
      ],
      [
        "Removal would be costly but was required by the treaties that had been signed",
        "He argues that removal had advantages and does not cite treaties as a requirement.",
      ],
      [
        "Removal would reduce the population of the states and weaken their economies",
        "He claims that removal would benefit the states.",
      ],
    ],
    why: "Jackson says that removal would end all danger of collision between the General and State governments on account of the Indians.",
    d: "The self-government choice is close because the nations had sought to keep their governments, but Jackson argues for moving them.",
    stim: excerpts.jacksonRemoval,
  },
  {
    id: "t03",
    s: "indian-removal",
    sub: "2.C",
    kc: ["KC-4.3.I.B"],
    q: "Which of the following limits the usefulness of the excerpt as evidence of how Native nations experienced removal?",
    right: "It shows only the president's view and not the views of Native nations",
    at: 1,
    wrong: [
      [
        "It was written many decades after the removal had taken place",
        "It was delivered in 1830, soon after the law was passed.",
      ],
      [
        "It was written by a Southern planter with no role in the federal government",
        "It was delivered by the president.",
      ],
      [
        "It was a private letter that was never intended to be shared with Congress",
        "It was an annual message to Congress.",
      ],
    ],
    why: "The president's account shows federal policy and its justification, but not the experience of the nations that were removed.",
    d: "The decades-later choice is close because many historical sources are late, but this message was delivered in 1830.",
    stim: excerpts.jacksonRemoval,
  },
]);

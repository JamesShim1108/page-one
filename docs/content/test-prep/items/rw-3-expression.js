// Expression of Ideas items. Original practice written by Page One. Rhetorical
// synthesis notes are written by Page One from facts about public-domain
// authors and works; transition items hide a transition from a public-domain
// passage (see ../passages.js). Skill names and formats follow the official
// SAT Suite descriptions; no official item is copied or paraphrased.

const ids = ["A", "B", "C", "D"];
const choices = (texts) => texts.map((text, index) => ({ id: ids[index], text }));
const notesStem = (goal) =>
  `While researching a topic, a student has taken the notes shown. The student wants to ${goal} Which choice most effectively uses relevant information from the notes to accomplish this goal?`;

export const items = [
  // Rhetorical Synthesis
  {
    schemaVersion: 1,
    id: "tp-rw-rs-001",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "easy",
    format: "single-select",
    originalText:
      "• Charles Darwin published The Formation of Vegetable Mould, through the Action of Worms in 1881.\n• It was the last book he published.\n• In it, he studied how earthworms bring soil to the surface.\n• He estimated that in many parts of England, more than ten tons of dry earth pass through worms on each acre of land every year.",
    stem: notesStem("emphasize how much soil earthworms move."),
    choices: choices([
      "Darwin's book about earthworms, The Formation of Vegetable Mould, was published in 1881.",
      "Darwin's last book, published in 1881, was about how earthworms bring soil to the surface.",
      "Darwin studied earthworms, which bring soil up to the surface of the land.",
      "Darwin estimated that in many parts of England, more than ten tons of earth per acre pass through worms each year.",
    ]),
    answer: "D",
    nearMiss: "C",
    explanation:
      "Only the estimate of more than ten tons per acre each year tells the reader how much soil worms move.",
    rationales: {
      A: "This gives the book's title and date but says nothing about the amount of soil.",
      B: "This says that worms bring soil to the surface but not how much they bring.",
      C: "This describes what worms do without giving any sense of the amount involved.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-rs-002",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "medium",
    format: "single-select",
    originalText:
      "• Zitkala-Ša (1876–1938) was a Yankton Dakota writer and activist.\n• In 1921, she published American Indian Stories.\n• The book includes essays about her childhood.\n• In 1926, she cofounded the National Council of American Indians.",
    stem: notesStem(
      "introduce Zitkala-Ša and her book to readers who have not heard of her.",
    ),
    choices: choices([
      "In 1926, Zitkala-Ša cofounded an organization called the National Council of American Indians.",
      "Zitkala-Ša, a Yankton Dakota writer and activist, published American Indian Stories in 1921.",
      "American Indian Stories, published in 1921, includes essays about its author's childhood.",
      "Zitkala-Ša, who lived from 1876 to 1938, was born more than forty years before 1921.",
    ]),
    answer: "B",
    nearMiss: "C",
    explanation:
      "An introduction for new readers should say who Zitkala-Ša was and name her book. This choice identifies her as a Yankton Dakota writer and activist and names American Indian Stories.",
    rationales: {
      A: "This describes her later activism but does not mention her book.",
      C: "This describes the book without telling readers who its author was.",
      D: "This gives dates of her life but neither describes her work nor names the book.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-rs-003",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "medium",
    format: "single-select",
    originalText:
      "• John Muir (1838–1914) was a naturalist who was born in Scotland.\n• In 1869, he spent a summer in the Sierra Nevada mountains of California.\n• He kept a journal during that summer.\n• His account of that summer, My First Summer in the Sierra, was published in 1911.",
    stem: notesStem(
      "emphasize how long after the summer Muir's account of it was published.",
    ),
    choices: choices([
      "Muir, a naturalist who was born in Scotland, kept a journal during the summer of 1869.",
      "My First Summer in the Sierra was published in 1911, three years before Muir's death.",
      "Muir spent the summer of 1869 in the Sierra Nevada, but his account was not published until 1911.",
      "In 1869, Muir spent a summer in the Sierra Nevada mountains of California and kept a journal.",
    ]),
    answer: "C",
    nearMiss: "B",
    explanation:
      "To show how long the account waited, a sentence needs both dates: the summer of 1869 and publication in 1911. This choice gives both and marks the delay with “not published until.”",
    rationales: {
      A: "This mentions 1869 but not when the account was published.",
      B: "This relates the publication to Muir's death, not to the summer the book describes.",
      D: "This describes the summer but never says when the account appeared.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-rs-004",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "hard",
    format: "single-select",
    originalText:
      "• Gilbert White (1720–1793) was an English naturalist.\n• He lived most of his life in the village of Selborne.\n• In a letter written in 1777, he argued that earthworms are important to soil and plants.\n• Charles Darwin published a book about earthworms in 1881.",
    stem: notesStem(
      "emphasize how early White recognized the importance of earthworms compared with Darwin.",
    ),
    choices: choices([
      "White wrote about the importance of earthworms in 1777, more than a century before Darwin's 1881 book.",
      "Both White, in a letter, and Darwin, in a book, wrote about the effects that earthworms have on soil.",
      "White, an English naturalist, lived most of his life in the village of Selborne.",
      "Darwin's book about earthworms appeared in 1881, many years after White's death in 1793.",
    ]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "Comparing the two dates, 1777 and 1881, shows that White wrote about earthworms' importance more than a hundred years before Darwin's book.",
    rationales: {
      B: "This shows that both writers discussed earthworms but does not say which one wrote first or by how much.",
      C: "This describes where White lived without mentioning earthworms or Darwin.",
      D: "This compares Darwin's book with White's death rather than with White's writing about earthworms.",
    },
  },

  // Transitions
  {
    schemaVersion: 1,
    id: "tp-rw-tr-001",
    skillId: "rw-transitions",
    difficulty: "easy",
    format: "single-select",
    passageId: "tp-p-darwin-peewit",
    blank: "Nevertheless,",
    stem: "Charles Darwin is discussing what makes earthworms leave their burrows. Which choice completes the text with the most logical transition?",
    choices: choices(["Similarly,", "For instance,", "Nevertheless,", "Consequently,"]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "The first sentence suggests that shaking the ground brings worms out. The next sentence qualifies that: worms do not always come out. “Nevertheless” signals this contrast.",
    rationales: {
      A: "“Similarly” would introduce a matching point, but the second sentence limits the first instead of repeating it.",
      B: "“For instance” would introduce an example of the peewit's trick working, but the sentence describes a case where it fails.",
      D: "“Consequently” would present a result of the peewit's behavior, but worms staying put is not caused by it.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-tr-002",
    skillId: "rw-transitions",
    difficulty: "hard",
    format: "single-select",
    passageId: "tp-p-darwin-ants",
    blank: "For instance,",
    stem: "Charles Darwin has described how worms pull leaves into their burrows, trying different ways until one works. Which choice completes the text with the most logical transition?",
    choices: choices(["For instance,", "In contrast,", "Nevertheless,", "Consequently,"]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "Darwin says many higher animals lack the worm's ability. Ants that keep trying to drag an object the hard way are an example of such an animal, so “For instance” fits.",
    rationales: {
      B: "Ants do differ from worms, but the sentence illustrates the claim about higher animals rather than setting up a new contrast.",
      C: "“Nevertheless” would signal a point that goes against the claim, but the ants support it.",
      D: "The ants' behavior is not a result of anything in the first sentence.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-tr-003",
    skillId: "rw-transitions",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-herland-unit",
    blank: "Therefore,",
    stem: "In this passage from Herland, the narrator describes how the people of an isolated country think about their land. Which choice completes the text with the most logical transition?",
    choices: choices(["However,", "For example,", "Meanwhile,", "Therefore,"]),
    answer: "D",
    nearMiss: "B",
    explanation:
      "Because the people's sense of time was not limited to one lifetime, it follows that they made plans lasting centuries. “Therefore” signals that result.",
    rationales: {
      A: "“However” signals a contrast, but long-range planning agrees with the time-sense just described.",
      B: "Long-range planning is a consequence of the people's time-sense, not one example among several of it.",
      C: "“Meanwhile” signals events happening at the same time, which does not fit a cause and its result.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-tr-004",
    skillId: "rw-transitions",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-washington-hat",
    blank: "In fact,",
    stem: "Booker T. Washington recalls his first days at school. Which choice completes the text with the most logical transition?",
    choices: choices(["However,", "In fact,", "As a result,", "Similarly,"]),
    answer: "B",
    nearMiss: "C",
    explanation:
      "Washington first says he had no hat or cap. The next sentence goes further: he had never worn any covering on his head at all. “In fact” introduces this stronger version of the point.",
    rationales: {
      A: "“However” would signal a contrast, but the second sentence strengthens the first.",
      C: "Never having worn a hat is not a result of noticing the other children's hats.",
      D: "“Similarly” would introduce a separate, parallel point, but this sentence intensifies the same point.",
    },
  },
];

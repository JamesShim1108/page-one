// Expression of Ideas items. Original practice written by Page One. Rhetorical
// synthesis notes are written by Page One from documented facts about
// historical people and public-domain works; transition items hide a transition
// from a public-domain passage (see ../passages.js). Skill names, formats, and
// prompt forms follow the official SAT Suite descriptions; no official item is
// copied or paraphrased.

const ids = ["A", "B", "C", "D"];
const choices = (texts) => texts.map((text, index) => ({ id: ids[index], text }));
const NOTES = "While researching a topic, a student has taken the following notes:";
const notes = (...lines) => [NOTES, ...lines.map((line) => `• ${line}`)].join("\n");
const goal = (text) =>
  `The student wants to ${text}. Which choice most effectively uses relevant information from the notes to accomplish this goal?`;
const TRANSITION = "Which choice completes the text with the most logical transition?";

export const items = [
  // Rhetorical Synthesis
  {
    schemaVersion: 1,
    id: "tp-rw-rs-001",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "easy",
    format: "single-select",
    originalText: notes(
      "Charles Darwin published The Formation of Vegetable Mould, through the Action of Worms in 1881.",
      "It was the last book he published.",
      "In it, he studied how earthworms bring soil to the surface.",
      "He estimated that in many parts of England, more than ten tons of dry earth pass through worms on each acre of land every year.",
    ),
    stem: goal("emphasize how much soil earthworms move"),
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
    originalText: notes(
      "Zitkala-Ša (1876–1938) was a Yankton Dakota writer and activist.",
      "In 1921, she published American Indian Stories.",
      "The book includes essays about her childhood.",
      "In 1926, she cofounded the National Council of American Indians.",
    ),
    stem: goal("introduce Zitkala-Ša and her book to an audience unfamiliar with her"),
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
    originalText: notes(
      "John Muir (1838–1914) was a naturalist who was born in Scotland.",
      "In 1869, he spent a summer in the Sierra Nevada mountains of California.",
      "He kept a journal during that summer.",
      "His account of that summer, My First Summer in the Sierra, was published in 1911.",
    ),
    stem: goal("emphasize how long after the summer Muir's account of it was published"),
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
    originalText: notes(
      "Gilbert White (1720–1793) was an English naturalist.",
      "He lived most of his life in the village of Selborne.",
      "In a letter written in 1777, he argued that earthworms are important to soil and plants.",
      "Charles Darwin published a book about earthworms in 1881.",
    ),
    stem: goal(
      "emphasize how early White recognized the importance of earthworms compared with Darwin",
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
  {
    schemaVersion: 1,
    id: "tp-rw-rs-005",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "easy",
    format: "single-select",
    originalText: notes(
      "In 1889, the journalist Nellie Bly set out to travel around the world.",
      "She hoped to beat the 80 days taken by the hero of Jules Verne's novel Around the World in Eighty Days.",
      "She left New York on November 14, 1889.",
      "She completed the journey in 72 days.",
    ),
    stem: goal("compare the length of Bly's journey with the journey in Verne's novel"),
    choices: choices([
      "Nellie Bly, a journalist, left New York on November 14, 1889, to travel around the world.",
      "Bly circled the globe in 72 days, eight days faster than the journey in Verne's novel.",
      "Jules Verne wrote a novel called Around the World in Eighty Days.",
      "Bly's trip around the world began in 1889 and took 72 days.",
    ]),
    answer: "B",
    nearMiss: "D",
    explanation:
      "A comparison needs both lengths. This choice gives Bly's 72 days and the novel's 80 days and states the difference.",
    rationales: {
      A: "This gives the start of her trip but neither length of time.",
      C: "This names the novel without giving either journey's length.",
      D: "This gives Bly's 72 days but never mentions the 80 days it is supposed to be compared with.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-rs-006",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "medium",
    format: "single-select",
    originalText: notes(
      "On December 17, 1903, Orville and Wilbur Wright flew a powered airplane near Kitty Hawk, North Carolina.",
      "The first flight that day, with Orville as pilot, lasted 12 seconds and covered 120 feet.",
      "The longest flight that day, with Wilbur as pilot, lasted 59 seconds and covered 852 feet.",
    ),
    stem: goal(
      "emphasize how much the brothers' flights improved over the course of that day",
    ),
    choices: choices([
      "Orville and Wilbur Wright flew a powered airplane near Kitty Hawk, North Carolina, on December 17, 1903.",
      "Orville Wright piloted the first flight of December 17, 1903, which lasted 12 seconds.",
      "Their flights grew from 12 seconds and 120 feet on the first try to 59 seconds and 852 feet.",
      "Wilbur Wright piloted the longest flight of December 17, 1903, which lasted 59 seconds and covered 852 feet.",
    ]),
    answer: "C",
    nearMiss: "D",
    explanation:
      "To show improvement over the day, the sentence must compare the first flight with the longest. This choice gives both flights' times and distances.",
    rationales: {
      A: "This gives the place and date but no measure of improvement.",
      B: "This describes only the first flight, so there is nothing to compare it with.",
      D: "This gives the longest flight's time and distance but nothing about the first flight to compare them with.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-rs-007",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "easy",
    format: "single-select",
    originalText: notes(
      "Maria Mitchell (1818–1889) was an American astronomer.",
      "In 1847, she discovered a comet using a telescope on Nantucket Island, Massachusetts.",
      "The comet became known as “Miss Mitchell's Comet.”",
      "In 1865, she became a professor of astronomy at Vassar College.",
    ),
    stem: goal("introduce Mitchell and her discovery to an audience unfamiliar with her"),
    choices: choices([
      "Maria Mitchell, an American astronomer, discovered a comet in 1847 that became known as “Miss Mitchell's Comet.”",
      "Maria Mitchell became a professor of astronomy at Vassar College in 1865, nearly twenty years after 1847.",
      "In 1847, a comet was spotted through a telescope on Nantucket Island, in the state of Massachusetts.",
      "The comet discovered in 1847 through a telescope on Nantucket became known as “Miss Mitchell's Comet.”",
    ]),
    answer: "A",
    nearMiss: "D",
    explanation:
      "An introduction for new readers should say who Mitchell was and what she discovered. This choice identifies her as an American astronomer and names her discovery.",
    rationales: {
      B: "This tells readers about her teaching but does not mention her discovery.",
      C: "This describes where a comet was seen without saying who Mitchell was or that she found it.",
      D: "This names the comet but does not tell readers who Mitchell was.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-rs-008",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "hard",
    format: "single-select",
    originalText: notes(
      "Mary Anning (1799–1847) collected fossils on the coast near Lyme Regis, England.",
      "Around 1811, she and her brother Joseph found the fossil skeleton of an ichthyosaur, a marine reptile.",
      "In 1823, she found the first complete skeleton of a plesiosaur, another marine reptile.",
    ),
    stem: goal("emphasize a discovery that Anning made without her brother's help"),
    choices: choices([
      "Mary Anning collected fossils along the coast near Lyme Regis, England.",
      "Mary and Joseph Anning found the skeleton of an ichthyosaur, a marine reptile, around 1811.",
      "Both the ichthyosaur and the plesiosaur were marine reptiles.",
      "In 1823, Mary Anning found the first complete skeleton of a plesiosaur.",
    ]),
    answer: "D",
    nearMiss: "B",
    explanation:
      "The notes credit the 1823 plesiosaur to Mary Anning alone, while the ichthyosaur was found with her brother. Only this choice describes a discovery she made without his help.",
    rationales: {
      A: "This describes her collecting in general, not a particular discovery.",
      B: "This describes the find she made with her brother, the opposite of the goal.",
      C: "This compares the two reptiles without describing a discovery or who made it.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-rs-009",
    skillId: "rw-rhetorical-synthesis",
    difficulty: "medium",
    format: "single-select",
    originalText: notes(
      "Ada Lovelace (1815–1852) was an English mathematician.",
      "In 1843, she published an English translation of an article about Charles Babbage's Analytical Engine, a proposed calculating machine.",
      "She added her own notes to the translation, and the notes were longer than the article itself.",
      "One of her notes described a method for the engine to calculate a series of numbers called Bernoulli numbers.",
    ),
    stem: goal("explain why Lovelace's 1843 publication was more than a translation"),
    choices: choices([
      "Lovelace's 1843 publication translated an article about Babbage's Analytical Engine into English.",
      "Charles Babbage designed a calculating machine called the Analytical Engine.",
      "Lovelace added notes longer than the article itself, including a method for the engine to calculate Bernoulli numbers.",
      "Ada Lovelace was an English mathematician who lived from 1815 to 1852.",
    ]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "The publication went beyond translation because of Lovelace's own additions. This choice describes those notes, their length, and their method for calculating Bernoulli numbers.",
    rationales: {
      A: "This describes only the translation, which is the part the goal says to go beyond.",
      B: "This is about Babbage's machine, not about what Lovelace added.",
      D: "This gives facts about Lovelace's life but not about her publication.",
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
    stem: TRANSITION,
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
    stem: TRANSITION,
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
    stem: TRANSITION,
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
    stem: TRANSITION,
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
  {
    schemaVersion: 1,
    id: "tp-rw-tr-005",
    skillId: "rw-transitions",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-washington-speaking",
    blank: "In fact,",
    stem: TRANSITION,
    choices: choices(["Instead,", "For example,", "In fact,", "Meanwhile,"]),
    answer: "C",
    nearMiss: "B",
    explanation:
      "Washington says talking for its own sake never attracted him, then goes further: he considers such speaking “empty and unsatisfactory.” “In fact” introduces this stronger statement of the same view.",
    rationales: {
      A: "“Instead” would introduce an alternative, but the sentence restates and strengthens his dislike of empty speaking.",
      B: "The sentence states his view more strongly; it does not give an example of anything.",
      D: "“Meanwhile” signals something happening at the same time, which does not fit a restated opinion.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-tr-006",
    skillId: "rw-transitions",
    difficulty: "hard",
    format: "single-select",
    passageId: "tp-p-herland-physiology",
    blank: "Indeed,",
    stem: TRANSITION,
    choices: choices(["Indeed,", "Even so,", "Otherwise,", "By contrast,"]),
    answer: "A",
    nearMiss: "D",
    explanation:
      "The narrator says the people knew physiology well, then extends the point: in all the concrete sciences their results were surprising. “Indeed” introduces this stronger, broader claim.",
    rationales: {
      B: "“Even so” signals a result despite an obstacle, but nothing in the first sentence works against their skill.",
      C: "“Otherwise” signals what would happen if something were not true, which does not fit two related claims.",
      D: "Physiology is one of the concrete sciences the next sentence praises, so the sentence extends the point instead of contrasting with it.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-tr-007",
    skillId: "rw-transitions",
    difficulty: "easy",
    format: "single-select",
    passageId: "tp-p-dubois-john",
    blank: "Nevertheless,",
    stem: TRANSITION,
    choices: choices(["Therefore,", "Nevertheless,", "Similarly,", "For example,"]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "The text lists John's difficulties: divided families, careless parents, irregular children, and missing books. He kept going anyway, so “Nevertheless” signals that he struggled on despite them.",
    rationales: {
      A: "“Therefore” would make his hopeful struggle a result of the problems, but he continued in spite of them.",
      C: "“Similarly” would add another problem, but the sentence turns to how John responded.",
      D: "John's hopeful effort is not an example of the difficulties just listed.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-tr-008",
    skillId: "rw-transitions",
    difficulty: "hard",
    format: "single-select",
    passageId: "tp-p-thoreau-factory",
    blank: "Therefore,",
    stem: TRANSITION,
    choices: choices(["However,", "Similarly,", "In other words,", "Therefore,"]),
    answer: "D",
    nearMiss: "C",
    explanation:
      "Thoreau states a principle, that people hit only what they aim at, and then draws a conclusion from it: they should aim at something high. “Therefore” signals that conclusion.",
    rationales: {
      A: "“However” signals a contrast, but aiming high follows from the principle instead of opposing it.",
      B: "“Similarly” would add a parallel point, but the sentence draws a conclusion.",
      C: "“In other words” would restate the principle, but the sentence gives advice based on it.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-tr-009",
    skillId: "rw-transitions",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-montgomery-history",
    blank: "Still,",
    stem: TRANSITION,
    choices: choices(["Still,", "As a result,", "For instance,", "Likewise,"]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "Anne says the history paper was hard and she got mixed up in the dates, yet she thinks she did fairly well. “Still” signals this outcome despite the difficulty.",
    rationales: {
      B: "Doing fairly well is not a result of getting mixed up in the dates; it happened in spite of that.",
      C: "Her overall sense of the exam is not an example of getting the dates mixed up.",
      D: "“Likewise” would add a similar point, but the sentence contrasts with the difficulty just described.",
    },
  },
];

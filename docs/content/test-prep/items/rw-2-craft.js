// Craft and Structure items. Original practice written by Page One around
// public-domain passages (see ../passages.js). Skill names and formats follow
// the official SAT Suite descriptions; no official item is copied or
// paraphrased. A blank hides the source's own word, which is the answer.

const ids = ["A", "B", "C", "D"];
const choices = (texts) => texts.map((text, index) => ({ id: ids[index], text }));

export const items = [
  // Words in Context
  {
    schemaVersion: 1,
    id: "tp-rw-wic-001",
    skillId: "rw-words-in-context",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-zitkala-oversight",
    stem: "In this text, Zitkala-Ša recalls learning beadwork from her mother. As used in the text, what does the word “oversight” most nearly mean?",
    choices: choices(["supervision", "mistake", "absence", "approval"]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "The mother watches her daughter's work and has little patience with its faults, and her quiet watching makes the girl feel responsible. Here “oversight” means watching over someone's work: supervision.",
    rationales: {
      B: "“Oversight” can mean an error, but nothing in the text describes the mother making a mistake.",
      C: "The mother is present and watching closely, so her oversight is not an absence.",
      D: "The mother shows impatience with faults and gives rebukes, so her oversight is not simply approval.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-wic-002",
    skillId: "rw-words-in-context",
    difficulty: "easy",
    format: "single-select",
    passageId: "tp-p-douglass-fixed",
    blank: "high hope",
    stem: "Frederick Douglass describes his decision to keep learning to read after his lessons were stopped. Which choice completes the text with the most logical and precise word or phrase?",
    choices: choices(["faint hope", "false hope", "high hope", "borrowed hope"]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "“Though conscious of the difficulty” sets up a contrast: despite knowing how hard it would be, Douglass set out with strong hope and a “fixed purpose.” “High hope” fits that contrast.",
    rationales: {
      A: "Faint hope would match the difficulty instead of contrasting with it, and it clashes with his “fixed purpose.”",
      B: "False hope would mean he expected to fail, which conflicts with his firm resolve to learn.",
      D: "Hope cannot sensibly be borrowed here, and nothing suggests his hope came from someone else.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-wic-003",
    skillId: "rw-words-in-context",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-thoreau-woods",
    stem: "In Walden, Henry David Thoreau explains why he went to live alone in the woods. As used in the text, what does the word “deliberately” most nearly mean?",
    choices: choices([
      "at a slow and careful pace",
      "with conscious purpose",
      "without telling anyone",
      "in order to make money",
    ]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "Thoreau wants to “front only the essential facts of life” and not discover at death “that I had not lived.” To live deliberately is to live with careful attention and intention.",
    rationales: {
      A: "“Deliberately” can describe an unhurried pace, but Thoreau's concern is living with intention, not living at a slow speed.",
      C: "Thoreau plans to “publish” what he learns to the world, so he is not hiding his purpose from anyone.",
      D: "Nothing in the text concerns earning money; his aim is to learn what life has to teach.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-wic-004",
    skillId: "rw-words-in-context",
    difficulty: "hard",
    format: "single-select",
    passageId: "tp-p-herland-cats",
    stem: "In this passage from Herland, the narrator describes the cats raised by the women of an isolated country. As used in the text, what does the word “rigorously” most nearly mean?",
    choices: choices(["harshly", "quickly", "secretly", "strictly"]),
    answer: "D",
    nearMiss: "A",
    explanation:
      "The cats were produced by “prolonged and careful selection and exclusion,” and they were bred to hunt pests but leave birds alone. “Rigorously” here means strictly and exactly controlled.",
    rationales: {
      A: "“Rigorous” can suggest severity, but the text stresses careful, exact control rather than harsh treatment of the cats.",
      B: "The breeding is described as “prolonged,” the opposite of quick.",
      C: "The narrator calls the result “a fact” and describes it openly; nothing about the breeding was hidden.",
    },
  },

  // Text Structure and Purpose
  {
    schemaVersion: 1,
    id: "tp-rw-ts-001",
    skillId: "rw-text-structure",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-douglass-shipyard",
    stem: "Which choice best describes the overall structure of this text by Frederick Douglass?",
    choices: choices([
      "It describes a set of labels used in a shipyard and then explains why carpenters needed each one.",
      "It describes a problem the narrator faced and then explains why he decided not to pursue it.",
      "It explains where the narrator found a way to learn, gives examples of it, and then tells how he used it.",
      "It compares the narrator's early attempts at writing with the carpenters' finished work on the ships.",
    ]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "Douglass first says the idea for learning to write came from watching shipyard carpenters, then gives examples of their letter labels, and finally tells how he learned and copied those letters.",
    rationales: {
      A: "The labels are described, but the text's point is how they taught Douglass to write, not why carpenters needed them.",
      B: "Douglass does not give up; the text ends with him able to make the four letters.",
      D: "The text never compares his writing with the carpenters' work.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-ts-002",
    skillId: "rw-text-structure",
    difficulty: "easy",
    format: "single-select",
    passageId: "tp-p-thoreau-woods",
    stem: "Which choice best states the main purpose of this text from Walden by Henry David Thoreau?",
    choices: choices([
      "To explain the reasons behind the narrator's decision to live in the woods",
      "To describe the daily routine the narrator followed while living in the woods",
      "To argue that everyone should leave towns behind and move into the woods",
      "To compare life in the woods with the life of a person in a busy city",
    ]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "The text begins “I went to the woods because,” then lists what Thoreau hoped to do: live deliberately, face life's essential facts, and learn what life had to teach. It explains his reasons.",
    rationales: {
      B: "The text describes what Thoreau hoped to learn, not the activities of an ordinary day.",
      C: "Thoreau explains his own choice and does not urge others to make it.",
      D: "No city life is described, so there is no comparison.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-ts-003",
    skillId: "rw-text-structure",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-muir-tenaya",
    stem: "In this journal entry, John Muir describes a lake in the Sierra Nevada mountains. Which choice best describes the overall structure of the text?",
    choices: choices([
      "It describes the lake's shore and then explains why the lake was given the Indian name that it has.",
      "It explains how glaciers form and then traces the history of a single glacier.",
      "It compares two mountain lakes and then concludes which of them is older.",
      "It describes the bare rock around a lake and then suggests how the lake's basin was formed.",
    ]),
    answer: "D",
    nearMiss: "A",
    explanation:
      "Muir first describes the shore of bare, shining granite and then offers an explanation for the basin: it “seems to have been slowly excavated by the ancient glaciers.”",
    rationales: {
      A: "The name is mentioned as it relates to the shining rock, but the text ends by explaining how the basin formed, not by explaining the name.",
      B: "Muir does not explain how glaciers form or follow one glacier's history.",
      C: "Only one lake is described.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-ts-004",
    skillId: "rw-text-structure",
    difficulty: "hard",
    format: "single-select",
    passageId: "tp-p-austen-truth",
    stem: "Which choice best states the main purpose of this text from the opening of Pride and Prejudice by Jane Austen?",
    choices: choices([
      "To describe the private feelings of a wealthy man as he settles into a new neighbourhood",
      "To present a widely held belief and show how it shapes a community's view of a newcomer",
      "To argue that wealthy men should marry soon after moving to a new place",
      "To explain why the families in a neighbourhood tend to avoid newcomers until they know them",
    ]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "The text states a “truth universally acknowledged” and then shows its effect: whatever the man himself feels, local families already treat him as the “rightful property” of one of their daughters.",
    rationales: {
      A: "The text says the man's feelings may be “little known,” so it does not describe them.",
      C: "The text reports what people believe; it does not argue for what wealthy men should do.",
      D: "The families are eager to claim the newcomer, not to avoid him.",
    },
  },

  // Cross-Text Connections
  {
    schemaVersion: 1,
    id: "tp-rw-ct-001",
    skillId: "rw-cross-text",
    difficulty: "medium",
    format: "single-select",
    passageIds: ["tp-p-white-worms", "tp-p-darwin-plough"],
    stem: "Text 1 is from a 1777 letter by Gilbert White. Text 2 is from an 1881 book by Charles Darwin. Based on the texts, how would Darwin most likely respond to White's claim that earthworms, despite their appearance, are important?",
    choices: choices([
      "He would say White exaggerates, since worms affect only soil and not the history of the land.",
      "He would agree and go further, suggesting that worms have worked the land since before humans existed.",
      "He would disagree, arguing that ploughing by people has done more to improve the soil than worms have.",
      "He would agree only about the birds and other animals that White says depend on worms for food.",
    ]),
    answer: "B",
    nearMiss: "C",
    explanation:
      "White says worms are a “despicable” link in nature only in appearance. Darwin agrees and goes further: worms ploughed the land “long before” humans existed and have played a very important part “in the history of the world.”",
    rationales: {
      A: "Darwin says worms have played an important part in the history of the world, so he would not call White's claim exaggerated.",
      C: "Darwin mentions the plough only to say that worms were ploughing the land long before people were.",
      D: "Darwin's text does not discuss birds and other animals, and his agreement with White is much broader than that.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-ct-002",
    skillId: "rw-cross-text",
    difficulty: "hard",
    format: "single-select",
    passageIds: ["tp-p-white-worms", "tp-p-darwin-plough"],
    stem: "Text 1 is from a 1777 letter by Gilbert White. Text 2 is from an 1881 book by Charles Darwin. Which choice best describes a difference in how the two texts discuss earthworms?",
    choices: choices([
      "Text 1 doubts that worms help plants, while Text 2 is certain that they do.",
      "Text 1 discusses worms in English gardens, while Text 2 discusses worms in the world's tropical oceans.",
      "Text 1 compares worms with a human invention, while Text 2 lists the many animals that feed on worms.",
      "Text 1 stresses how worms help plants grow, while Text 2 stresses their role in the land's history.",
    ]),
    answer: "D",
    nearMiss: "C",
    explanation:
      "White focuses on worms as “promoters of vegetation” that loosen soil for plants. Darwin compares them to the plough and stresses their part “in the history of the world.”",
    rationales: {
      A: "White says worms are “the great promoters of vegetation,” so he does not doubt that they help plants.",
      B: "Neither text discusses tropical oceans.",
      C: "This reverses the texts: Darwin makes the comparison with the plough, and White mentions animals supported by worms.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-ct-003",
    skillId: "rw-cross-text",
    difficulty: "hard",
    format: "single-select",
    passageIds: ["tp-p-washington-atlanta", "tp-p-dubois-washington"],
    stem: "Text 1 is from an 1895 speech by Booker T. Washington. Text 2 is from a 1903 essay by W. E. B. Du Bois. Based on the texts, how would Du Bois most likely respond to Washington's statement that “there is as much dignity in tilling a field as in writing a poem”?",
    choices: choices([
      "He would agree and add that writing poetry distracts people from making economic progress.",
      "He would argue that farming deserves less respect than other kinds of work.",
      "He would argue that Washington's focus on labor and money crowds out the higher aims of life.",
      "He would agree but argue that Washington underestimates how quickly the South's economy is growing.",
    ]),
    answer: "C",
    nearMiss: "D",
    explanation:
      "Du Bois says Washington's program becomes “a gospel of Work and Money” that nearly overshadows “the higher aims of life.” He would see Washington's praise of field work as part of that narrow focus.",
    rationales: {
      A: "Du Bois worries that higher aims are being overshadowed, so he would not dismiss pursuits such as poetry.",
      B: "Du Bois criticizes the emphasis of Washington's program, not the dignity of farming itself.",
      D: "Du Bois calls the period one of “unusual economic development,” but he does not say Washington misjudges its pace.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-ct-004",
    skillId: "rw-cross-text",
    difficulty: "medium",
    format: "single-select",
    passageIds: ["tp-p-washington-atlanta", "tp-p-dubois-washington"],
    stem: "Text 1 is from an 1895 speech by Booker T. Washington. Text 2 is from a 1903 essay by W. E. B. Du Bois. Which choice best describes the relationship between the texts?",
    choices: choices([
      "Text 2 criticizes the outlook of Text 1 as too narrowly focused on economic goals.",
      "Text 2 provides additional examples that support the main argument made in Text 1.",
      "Text 2 describes the historical events that led Washington to give the speech in Text 1.",
      "Both texts argue that the education of young people should center on poetry and the arts.",
    ]),
    answer: "A",
    nearMiss: "C",
    explanation:
      "Text 1 urges people to prosper through “common labour.” Text 2 says Washington's program takes “an economic cast” that overshadows higher aims, a direct criticism of that outlook.",
    rationales: {
      B: "Text 2 challenges Washington's program rather than supporting it.",
      C: "Text 2 describes the age Washington spoke in, but its purpose is to judge his program, not to narrate the events behind the speech.",
      D: "Text 1 values field work as much as poetry, and Text 2 does not mention poetry or the arts.",
    },
  },
];

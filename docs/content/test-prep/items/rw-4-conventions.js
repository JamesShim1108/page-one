// Standard English Conventions items. Original practice written by Page One
// around public-domain passages (see ../passages.js). Each blank hides the
// source's own wording, chosen where that wording also follows current
// conventions. Skill names and formats follow the official SAT Suite
// descriptions; no official item is copied or paraphrased.

const ids = ["A", "B", "C", "D"];
const choices = (texts) => texts.map((text, index) => ({ id: ids[index], text }));
const stem = (context) =>
  `${context} Which choice completes the text so that it conforms to the conventions of Standard English?`;

export const items = [
  // Boundaries
  {
    schemaVersion: 1,
    id: "tp-rw-bd-001",
    skillId: "rw-boundaries",
    difficulty: "easy",
    format: "single-select",
    passageId: "tp-p-herland-terry",
    blank: "pleased. His",
    stem: stem("In Herland, the narrator describes his friend Terry."),
    choices: choices([
      "pleased, his",
      "pleased his",
      "pleased. His",
      "pleased, which his",
    ]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "“Terry was rich enough to do as he pleased” and “His great aim was exploration” are both complete sentences. A period correctly separates them.",
    rationales: {
      A: "A comma alone cannot join two complete sentences; this creates a comma splice.",
      B: "With no punctuation at all, the two complete sentences run together.",
      D: "“Which” makes the second part an incomplete relative clause that does not fit with “his great aim was exploration.”",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-bd-002",
    skillId: "rw-boundaries",
    difficulty: "easy",
    format: "single-select",
    passageId: "tp-p-washington-swept",
    blank: "times. Then",
    stem: stem("Booker T. Washington describes cleaning a classroom."),
    choices: choices(["times. Then", "times, then", "times then", "times, and, then"]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "“I swept the recitation-room three times” and “Then I got a dusting-cloth and dusted it four times” are complete sentences, so a period between them is correct.",
    rationales: {
      B: "“Then” is not a conjunction, so a comma before it creates a comma splice.",
      C: "Without punctuation, two complete sentences are fused together.",
      D: "A comma after “and” wrongly separates the conjunction from the clause it introduces.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-bd-003",
    skillId: "rw-boundaries",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-washington-examination",
    blank: "examination, and never",
    stem: stem(
      "Booker T. Washington recalls learning that he had been admitted to school.",
    ),
    choices: choices([
      "examination, never",
      "examination and, never",
      "examination; and, never",
      "examination, and never",
    ]),
    answer: "D",
    nearMiss: "A",
    explanation:
      "Two independent clauses are joined by the conjunction “and.” A comma before the conjunction, with none after it, is the standard punctuation.",
    rationales: {
      A: "Without “and,” a comma alone joins two independent clauses, creating a comma splice.",
      B: "The comma belongs before “and,” not after it.",
      C: "A comma after “and” wrongly separates the conjunction from its clause.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-bd-004",
    skillId: "rw-boundaries",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-douglass-copybook",
    blank: "pavement; my",
    stem: stem("Frederick Douglass describes how he taught himself to write."),
    choices: choices([
      "pavement, my",
      "pavement; my",
      "pavement my",
      "pavement, and, my",
    ]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "“My copy-book was the board fence, brick wall, and pavement” and “my pen and ink was a lump of chalk” are independent clauses. A semicolon correctly joins them.",
    rationales: {
      A: "A comma alone joining two independent clauses is a comma splice.",
      C: "With no punctuation, the two independent clauses run together.",
      D: "A comma after “and” wrongly separates the conjunction from its clause.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-bd-005",
    skillId: "rw-boundaries",
    difficulty: "hard",
    format: "single-select",
    passageId: "tp-p-zitkala-wigwam",
    blank: "slender poles. Then",
    stem: stem("Zitkala-Ša describes mornings in her family's home."),
    choices: choices([
      "slender poles, then",
      "slender poles then",
      "slender poles. Then",
      "slender poles; and, then",
    ]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "The sentence about rolling up the canvas is complete, and “Then the cool morning breezes swept freely through our dwelling” begins a new complete sentence. A period separates them.",
    rationales: {
      A: "“Then” is an adverb, not a conjunction, so a comma before it creates a comma splice.",
      B: "Without punctuation, the second independent clause runs into the first.",
      D: "A semicolon cannot be followed by “and” set off with a comma in this way.",
    },
  },

  // Form, Structure, and Sense
  {
    schemaVersion: 1,
    id: "tp-rw-fs-001",
    skillId: "rw-form-structure-sense",
    difficulty: "easy",
    format: "single-select",
    passageId: "tp-p-herland-science",
    blank: "were interested",
    stem: stem("In Herland, the narrator describes what he and his two friends shared."),
    choices: choices([
      "were interested",
      "was interested",
      "is interested",
      "be interested",
    ]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "The subject “All of us” is plural, and the text is in the past tense, so the plural past-tense verb “were” is correct.",
    rationales: {
      B: "“Was” is singular, but “All of us” refers to the three friends together.",
      C: "“Is” is singular and present tense, which matches neither the plural subject nor the past-tense text.",
      D: "“Be” is not a complete verb form for this sentence.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-fs-002",
    skillId: "rw-form-structure-sense",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-darwin-muscular",
    blank: "possess",
    stem: stem("Charles Darwin describes earthworms."),
    choices: choices(["possesses", "possessing", "to possess", "possess"]),
    answer: "D",
    nearMiss: "A",
    explanation:
      "“They are extraordinarily numerous, and for their size possess great muscular power” joins two verbs that share the plural subject “they.” The plural present-tense “possess” matches “are.”",
    rationales: {
      A: "“Possesses” is singular, but the subject “they” is plural.",
      B: "“Possessing” is not a finite verb, so the second part of the sentence would lack one.",
      C: "“To possess” is not a finite verb and does not parallel “are.”",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-fs-003",
    skillId: "rw-form-structure-sense",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-darwin-body",
    blank: "is sensitive",
    stem: stem("Charles Darwin describes how earthworms respond to touch."),
    choices: choices([
      "are sensitive",
      "is sensitive",
      "were sensitive",
      "being sensitive",
    ]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "The subject is “The whole body,” which is singular; “of a worm” only describes it. A singular present-tense verb, “is,” is needed.",
    rationales: {
      A: "“Are” is plural, but the subject “body” is singular.",
      C: "“Were” is plural and past tense, which matches neither the singular subject nor the present-tense text.",
      D: "“Being” is not a finite verb, so the sentence would have no main verb.",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-fs-004",
    skillId: "rw-form-structure-sense",
    difficulty: "hard",
    format: "single-select",
    passageId: "tp-p-thoreau-compose",
    blank: "compose",
    stem: stem(
      "Henry David Thoreau introduces a list of the costs of building his house.",
    ),
    choices: choices(["composes", "composing", "compose", "has composed"]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "In “the various materials which compose them,” the subject of the verb is “which,” standing for the plural “materials.” The plural verb “compose” agrees with it.",
    rationales: {
      A: "“Composes” is singular, but “which” refers to the plural “materials.”",
      B: "“Composing” is not a finite verb, so the clause beginning with “which” would have no verb.",
      D: "“Has composed” is singular and does not agree with “materials.”",
    },
  },
  {
    schemaVersion: 1,
    id: "tp-rw-fs-005",
    skillId: "rw-form-structure-sense",
    difficulty: "medium",
    format: "single-select",
    passageId: "tp-p-douglass-thomas",
    blank: "Master Thomas's",
    stem: stem("Frederick Douglass describes practicing his writing."),
    choices: choices([
      "Master Thomas's",
      "Master Thomases",
      "Master Thomas",
      "Master Thomases'",
    ]),
    answer: "A",
    nearMiss: "C",
    explanation:
      "The copy-book belongs to one person, Master Thomas, so the singular possessive “Master Thomas's” is correct.",
    rationales: {
      B: "“Thomases” is a plural with no apostrophe, so it does not show that the copy-book belongs to anyone.",
      C: "Without a possessive ending, the name cannot show who owns the copy-book.",
      D: "“Thomases'” is a plural possessive, but the copy-book belongs to only one person.",
    },
  },
];

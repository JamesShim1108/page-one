// Reusable source records. Lessons, questions, and writing prompts refer to
// these IDs instead of copying URLs. Course content is built from the CED and
// College Board materials first, then Khan Academy, The Princeton Review,
// Fiveable, and Albert. Add a record here when content first cites it.

export const sources = [
  {
    id: "ced",
    label:
      "College Board: AP U.S. History Course and Exam Description (effective fall 2026)",
    url: "https://apcentral.collegeboard.org/media/pdf/ap-us-history-course-and-exam-description.pdf",
    note: "Course framework, learning objectives, key concepts, exam format, and scoring rubrics. Recorded for checking in ced.js, skills.js, framework.js, and exam-format.js.",
  },
  {
    id: "ced-clarifications",
    label:
      "College Board: AP U.S. History Course and Exam Description clarifications (effective fall 2026)",
    url: "https://apcentral.collegeboard.org/media/pdf/ap-us-history-course-and-exam-description-clarifications-effective-fall-2026.pdf",
    note: "Corrects Key Concept 2.1.II.D (cash crops) and confirms the May 2027 short-answer and long essay format.",
  },
  {
    id: "exam",
    label: "College Board: AP history exam updates for 2027",
    url: "https://apcentral.collegeboard.org/courses/ap-history-exam-updates",
    note: "Three required short-answer questions with sources and one required long essay question, starting with the May 2027 exam.",
  },
  {
    id: "exam-page",
    label: "College Board: AP United States History exam (AP Central)",
    url: "https://apcentral.collegeboard.org/courses/ap-united-states-history/exam",
    note: "Released free-response questions and scoring guidelines.",
  },
  {
    id: "fiveable-apush-unit-1",
    label: "Fiveable: AP U.S. History Unit 1, Contact & Colonization, 1491-1607",
    url: "https://fiveable.me/apush/unit-1",
    note: "Topic-by-topic overview used to cross-check the coverage and examples in Unit 1.",
  },
  {
    id: "albert-apush-contextualization-p1",
    label: "Albert: Contextualization in Period 1 (AP U.S. History review)",
    url: "https://www.albert.io/blog/contextualization-in-period-1-ap-us-history-review/",
    note: "Used to cross-check the context for Topic 1.1.",
  },
  {
    id: "albert-apush-european-exploration",
    label: "Albert: European Exploration in the Americas (AP U.S. History review)",
    url: "https://www.albert.io/blog/ap-us-history-european-exploration-americas/",
    note: "Used to cross-check motives, navigation technology, and the Treaty of Tordesillas in Topic 1.3.",
  },
  {
    id: "albert-apush-columbian-exchange",
    label:
      "Albert: The Columbian Exchange, Spanish Exploration, and Conquest (AP U.S. History study guide)",
    url: "https://www.albert.io/blog/the-columbian-exchange-spanish-exploration-and-conquest-an-ap-us-history-study-guide/",
    note: "Used to cross-check the exchange, epidemics, conquest, and silver in Topic 1.4.",
  },
  {
    id: "albert-apush-labor-slavery-caste",
    label:
      "Albert: Labor, Slavery, and Caste in the Spanish Colonial System (AP U.S. History review)",
    url: "https://www.albert.io/blog/ap-us-history-labor-slavery-caste-spanish-colonial/",
    note: "Used to cross-check the encomienda, the mita, enslaved African labor, and the casta ranks in Topic 1.5.",
  },
  {
    id: "albert-apush-cultural-interactions",
    label:
      "Albert: Topic 1.6, Cultural Interactions Between Europeans, Native Americans, and Africans",
    url: "https://www.albert.io/blog/ap-us-history-topic-1-6-cultural-interactions-between-europeans-native-americans-and-africans/",
    note: "Used to cross-check borrowing, resistance, and justifications for subjugation in Topic 1.6.",
  },
  {
    id: "harriot-1588",
    label:
      "Thomas Harriot, A Briefe and True Report of the New Found Land of Virginia (1588), Project Gutenberg eBook #4247",
    url: "https://www.gutenberg.org/ebooks/4247",
    note: "Public-domain text of the primary source quoted in the Unit 1 Practice Test and short-answer questions. Quotations are checked against this edition.",
  },
  {
    id: "fiveable-apush-unit-2",
    label: "Fiveable: AP U.S. History Unit 2, Colonial America, 1607-1754",
    url: "https://fiveable.me/apush/unit-2",
    note: "Topic-by-topic overview used to cross-check the coverage and examples in Unit 2.",
  },
  {
    id: "rowlandson-1682",
    label:
      "Mary Rowlandson, The Sovereignty and Goodness of God, or Narrative of the Captivity and Restoration of Mrs. Mary Rowlandson (1682), Project Gutenberg eBook #851",
    url: "https://www.gutenberg.org/ebooks/851",
    note: "Public-domain text of the primary source quoted in the Unit 2 Practice Test and short-answer questions. Quotations are checked against this edition.",
  },
  {
    id: "equiano-1789",
    label:
      "Olaudah Equiano, The Interesting Narrative of the Life of Olaudah Equiano (1789), Standard Ebooks edition",
    url: "https://standardebooks.org/ebooks/olaudah-equiano/the-interesting-narrative-of-the-life-of-olaudah-equiano",
    note: "Public-domain text of the primary source quoted in the Unit 2 Practice Test. Quotations are checked against this edition.",
  },
  {
    id: "edwards-1741",
    label:
      "Jonathan Edwards, Sinners in the Hands of an Angry God (1741), in Selected Sermons of Jonathan Edwards, ed. H. Norman Gardiner (1904), Project Gutenberg eBook #34632",
    url: "https://www.gutenberg.org/ebooks/34632",
    note: "Public-domain text of the primary source quoted in the Unit 2 Practice Test and short-answer questions. Quotations are checked against this edition.",
  },
  {
    id: "declaration-1776",
    label:
      "The Declaration of Independence of the United States of America (1776), Project Gutenberg eBook #16780",
    url: "https://www.gutenberg.org/ebooks/16780",
    note: "Public-domain text of the primary source quoted in the Unit 3 Practice Test and short-answer questions. Quotations are checked against this edition.",
  },
  {
    id: "paine-1776",
    label: "Thomas Paine, Common Sense (1776), Project Gutenberg eBook #147",
    url: "https://www.gutenberg.org/ebooks/147",
    note: "Public-domain text of the primary source quoted in the Unit 3 Practice Test. Quotations are checked against this edition.",
  },
  {
    id: "federalist-1787",
    label:
      "Alexander Hamilton, James Madison, and John Jay, The Federalist Papers (1787-1788), Project Gutenberg eBook #1404",
    url: "https://www.gutenberg.org/ebooks/1404",
    note: "Public-domain text of the primary source quoted in the Unit 3 Practice Test and short-answer questions. Quotations are checked against this edition.",
  },
  {
    id: "constitution-1787",
    label: "The Constitution of the United States (1787), Project Gutenberg eBook #5",
    url: "https://www.gutenberg.org/ebooks/5",
    note: "Public-domain text of the primary source quoted in the Unit 3 Practice Test. Quotations are checked against this edition.",
  },
  {
    id: "jefferson-1801",
    label:
      "Thomas Jefferson, First Inaugural Address (1801), NLTK inaugural corpus transcript",
    url: "https://github.com/nltk/nltk_data",
    note: "Public-domain presidential address quoted in the Unit 4 Practice Test. Quotations are checked against the corpus transcript.",
  },
  {
    id: "monroe-1823",
    label:
      "James Monroe, Seventh Annual Message to Congress (1823), in State of the Union Addresses of James Monroe, Project Gutenberg eBook #5014",
    url: "https://www.gutenberg.org/ebooks/5014",
    note: "Public-domain text of the message that contains the Monroe Doctrine, quoted in the Unit 4 Practice Test and short-answer questions. Quotations are checked against this edition.",
  },
  {
    id: "tocqueville-1835",
    label:
      "Alexis de Tocqueville, Democracy in America, vol. 1 (1835), Reeve translation, Project Gutenberg eBook #815",
    url: "https://www.gutenberg.org/ebooks/815",
    note: "Public-domain text of the primary source quoted in the Unit 4 Practice Test. Quotations are checked against this edition.",
  },
  {
    id: "jackson-1830",
    label:
      "Andrew Jackson, Second Annual Message to Congress (1830), in State of the Union Addresses of Andrew Jackson, Project Gutenberg eBook #5016",
    url: "https://www.gutenberg.org/ebooks/5016",
    note: "Public-domain text of the primary source quoted in the Unit 4 Practice Test and short-answer questions. Quotations are checked against this edition.",
  },
  {
    id: "seneca-falls-1848",
    label:
      "Declaration of Sentiments (1848), in History of Woman Suffrage, vol. 1, Project Gutenberg eBook #28020",
    url: "https://www.gutenberg.org/ebooks/28020",
    note: "Public-domain text of the primary source quoted in the Unit 4 Practice Test and short-answer questions. Quotations are checked against this edition.",
  },
  {
    id: "douglass-1845",
    label:
      "Frederick Douglass, Narrative of the Life of Frederick Douglass, an American Slave (1845), Project Gutenberg eBook #23",
    url: "https://www.gutenberg.org/ebooks/23",
    note: "Public-domain text of the primary source quoted in the Unit 4 Practice Test and short-answer questions. Quotations are checked against this edition.",
  },
];

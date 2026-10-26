// Excerpt ID prefixes and the public-domain edition files that verify them.
// scripts/verify-excerpts.mjs reads these files from a folder you supply; the
// build only checks that every quoted excerpt belongs to a registered edition.
// Project Gutenberg plain-text files can be downloaded from gutenberg.org or
// from the GITenberg mirror on GitHub, which republishes the same files.
// Presidential addresses are US government works. Their check files are the
// C-SPAN transcripts in the NLTK data repository on GitHub
// (packages/corpora/inaugural.zip and state_union.zip), renamed with an
// inaugural- or sotu- prefix because both corpora use names like 1981-Reagan.txt.
// Internet Archive files are the item's full-text OCR (<identifier>_djvu.txt);
// scripts/verify-excerpts.mjs maps their scanner errors to the printed reading.
export const EXCERPT_SOURCES = Object.freeze({
  "polo-": {
    files: ["polo-v1.txt", "polo-v2.txt"],
    label: "Project Gutenberg #10636 and #12410 (Yule–Cordier Marco Polo, 1903)",
  },
  "boccaccio-": {
    files: ["decameron.txt"],
    label: "Project Gutenberg #23700 (Payne's Decameron, 1886)",
  },
  "battuta-": {
    files: ["gibb-ocr.txt"],
    label: "Internet Archive full-text OCR of travelsinasiaafr0000ibnb (Gibb, 1929)",
  },
  "busbecq-": {
    files: ["busbecq-v1.txt"],
    label: "Project Gutenberg #53629 (Forster and Daniell's Busbecq, 1881, vol. 1)",
  },
  "luther-": {
    files: ["luther-theses.txt"],
    label: "Project Gutenberg #274 (Works of Martin Luther, vol. 1, 1915)",
  },
  "smith-": {
    files: ["smith-wealth.txt"],
    label:
      "Project Gutenberg #3300 (Adam Smith, The Wealth of Nations), converted to UTF-8",
  },
  "montaigne-": {
    files: ["montaigne-essays.txt"],
    label: "Project Gutenberg #3600 (Cotton's Montaigne, ed. Hazlitt, 1877)",
  },
  "locke-": {
    files: ["locke-second-treatise.txt"],
    label: "Project Gutenberg #7370 (Locke, Second Treatise of Government)",
  },
  "wollstonecraft-": {
    files: ["wollstonecraft-vindication.txt"],
    label:
      "Project Gutenberg #3420 (Wollstonecraft, A Vindication of the Rights of Woman)",
  },
  "paine-": {
    files: ["paine-common-sense.txt"],
    label: "Project Gutenberg #147 (Paine, Common Sense)",
  },
  "manifesto-": {
    files: ["communist-manifesto.txt"],
    label: "Project Gutenberg #61 (Communist Manifesto, 1888 English edition)",
  },
  "smiles-": {
    files: ["smiles-self-help.txt"],
    label: "Project Gutenberg #935 (Smiles, Self-Help, 1897 edition)",
  },
  "mill-": {
    files: ["mill-on-liberty.txt"],
    label: "Project Gutenberg #34901 (Mill, On Liberty)",
  },
  "reed-": {
    files: ["reed-ten-days.txt"],
    label: "Project Gutenberg #3076 (Reed, Ten Days That Shook the World)",
  },
  "keynes-": {
    files: ["keynes-consequences.txt"],
    label: "Project Gutenberg #15776 (Keynes, The Economic Consequences of the Peace)",
  },
  "truman-inaugural-": {
    files: ["inaugural-1949-Truman.txt"],
    label: "NLTK inaugural corpus, 1949-Truman.txt (C-SPAN transcript)",
  },
  "kennedy-inaugural-": {
    files: ["inaugural-1961-Kennedy.txt"],
    label: "NLTK inaugural corpus, 1961-Kennedy.txt (C-SPAN transcript)",
  },
  "bush-sotu-1990-": {
    files: ["sotu-1990-Bush.txt"],
    label: "NLTK State of the Union corpus, 1990-Bush.txt (C-SPAN transcript)",
  },
  "nixon-sotu-1970-": {
    files: ["sotu-1970-Nixon.txt"],
    label:
      "NLTK State of the Union corpus, 1970-Nixon.txt (C-SPAN transcript), converted from Latin-1 to UTF-8",
  },
  "reagan-inaugural-": {
    files: ["inaugural-1981-Reagan.txt"],
    label: "NLTK inaugural corpus, 1981-Reagan.txt (C-SPAN transcript)",
  },
  "clinton-sotu-2000-": {
    files: ["sotu-2000-Clinton.txt"],
    label: "NLTK State of the Union corpus, 2000-Clinton.txt (C-SPAN transcript)",
  },
  "gwbush-sotu-2003-": {
    files: ["sotu-2003-GWBush.txt"],
    label: "NLTK State of the Union corpus, 2003-GWBush.txt (C-SPAN transcript)",
  },
  "zhao-": {
    files: ["zhao-hirth-rockhill-ocr.txt"],
    label:
      "Internet Archive full-text OCR of b29353087 (Hirth and Rockhill's Chau Ju-kua, 1911)",
  },
  "barani-": {
    files: ["elliot-dowson-v3-ocr.txt"],
    label:
      "Internet Archive full-text OCR of bub_gb_dB7qafVTrKkC (Elliot and Dowson, History of India, vol. 3, 1871)",
  },
  "qianlong-": {
    files: ["backhouse-bland-annals-ocr.txt"],
    label:
      "Internet Archive full-text OCR of cu31924023125796 (Backhouse and Bland, Annals & Memoirs of the Court of Peking, 1914)",
  },
  "roy-": {
    files: ["rammohun-roy-1906-ocr.txt"],
    label:
      "Internet Archive full-text OCR of the-english-works-of-raja-rammohan-ray-1906 (Panini Office, 1906)",
  },
  "rizal-": {
    files: ["rizal-century-hence.txt"],
    label: "Project Gutenberg #35899 (Rizal, The Philippines a Century Hence, 1912)",
  },
  "mexico-constitution-1917-": {
    files: ["mexican-review-1917-ocr.txt"],
    label:
      "Internet Archive full-text OCR of mexicanconstitut00mexi (Branch's translation in The Mexican Review, March 1917)",
  },
  "gandhi-": {
    files: ["gandhi-wheel-of-fortune.txt"],
    label: "Project Gutenberg #41954 (Gandhi, The Wheel of Fortune, 1922)",
  },
  "sun-yatsen-": {
    files: ["sun-international-development.txt"],
    label:
      "Project Gutenberg #45188 (Sun Yat-sen, The International Development of China, 1922)",
  },
  "harriot-": {
    files: ["harriot-report.txt"],
    label:
      "Project Gutenberg #4247 (Thomas Harriot, A Briefe and True Report of the New Found Land of Virginia, 1588), file 4247.txt",
  },
  "rowlandson-": {
    files: ["rowlandson-narrative.txt"],
    label:
      "Project Gutenberg #851 (Mary Rowlandson, Narrative of the Captivity and Restoration), file 851.txt",
  },
  "edwards-": {
    files: ["edwards-sermons.txt"],
    label:
      "Project Gutenberg #34632 (Selected Sermons of Jonathan Edwards, ed. Gardiner, 1904), file 34632.txt",
  },
  "equiano-": {
    files: ["equiano-narrative.txt"],
    label:
      "Standard Ebooks edition of Equiano, The Interesting Narrative (chapters 1-12), converted from XHTML to plain text",
  },
  "declaration-": {
    files: ["declaration-of-independence.txt"],
    label:
      "Project Gutenberg #16780 (The Declaration of Independence of the United States of America), file 16780.txt",
  },
  "constitution-": {
    files: ["us-constitution.txt"],
    label: "Project Gutenberg #5 (The United States Constitution), file 5-0.txt",
  },
  "federalist-": {
    files: ["federalist-papers.txt"],
    label:
      "Project Gutenberg #1404 (The Federalist Papers, Hamilton, Madison, and Jay), file 1404.txt",
  },
  "jefferson-inaugural-": {
    files: ["inaugural-1801-Jefferson.txt"],
    label: "NLTK inaugural corpus, 1801-Jefferson.txt (C-SPAN transcript)",
  },
  "monroe-": {
    files: ["monroe-state-of-union.txt"],
    label:
      "Project Gutenberg #5014 (State of the Union Addresses of James Monroe), file 5014.txt",
  },
  "tocqueville-": {
    files: ["tocqueville-democracy-v1.txt"],
    label:
      "Project Gutenberg #815 (Tocqueville, Democracy in America, vol. 1, Reeve translation), file 815.txt",
  },
  "jackson-": {
    files: ["jackson-state-of-union.txt"],
    label:
      "Project Gutenberg #5016 (State of the Union Addresses of Andrew Jackson), file 5016.txt",
  },
  "seneca-falls-": {
    files: ["woman-suffrage-v1.txt"],
    label:
      "Project Gutenberg #28020 (History of Woman Suffrage, vol. 1, Stanton, Anthony, and Gage), file 28020.txt",
  },
  "douglass-": {
    files: ["douglass-narrative.txt"],
    label:
      "Project Gutenberg #23 (Narrative of the Life of Frederick Douglass, an American Slave), file 23.txt",
  },
});

export function excerptSourceFor(id) {
  const prefix = Object.keys(EXCERPT_SOURCES).find((key) => id.startsWith(key));
  return prefix ? { prefix, ...EXCERPT_SOURCES[prefix] } : null;
}

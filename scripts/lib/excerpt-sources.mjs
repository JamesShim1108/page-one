// Excerpt ID prefixes and the public-domain edition files that verify them.
// scripts/verify-excerpts.mjs reads these files from a folder you supply; the
// build only checks that every quoted excerpt belongs to a registered edition.
// Project Gutenberg plain-text files can be downloaded from gutenberg.org or
// from the GITenberg mirror on GitHub, which republishes the same files.
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
});

export function excerptSourceFor(id) {
  const prefix = Object.keys(EXCERPT_SOURCES).find((key) => id.startsWith(key));
  return prefix ? { prefix, ...EXCERPT_SOURCES[prefix] } : null;
}

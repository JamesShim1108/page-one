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
});

export function excerptSourceFor(id) {
  const prefix = Object.keys(EXCERPT_SOURCES).find((key) => id.startsWith(key));
  return prefix ? { prefix, ...EXCERPT_SOURCES[prefix] } : null;
}

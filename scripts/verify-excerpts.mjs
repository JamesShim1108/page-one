// Checks every quoted run in docs/content/world-history/excerpts.js against
// the full text of its edition. The source texts are not stored in this
// repository; pass a folder containing:
//   polo-v1.txt     Project Gutenberg #10636 (Yule–Cordier Marco Polo, vol. 1)
//   polo-v2.txt     Project Gutenberg #12410 (Yule–Cordier Marco Polo, vol. 2)
//   decameron.txt   Project Gutenberg #23700 (Payne's Decameron)
//   gibb-ocr.txt    Internet Archive full-text OCR of travelsinasiaafr0000ibnb
// Usage: node scripts/verify-excerpts.mjs path/to/source-texts
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { excerpts } from "../docs/content/world-history/excerpts.js";

const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/verify-excerpts.mjs path/to/source-texts");
  process.exit(2);
}

// Scanner errors in the Gibb OCR text, mapped to the printed reading. Diacritics
// are dropped to match the excerpt file's stated convention.
const gibbOcrCorrections = [
  ["respeét", "respect"],
  ["objeét", "object"],
  ["distri€ts", "districts"],
  ["Sijilmd4sa", "Sijilmasa"],
  ["Sijilmdsa", "Sijilmasa"],
  ["Taghaz4", "Taghaza"],
  ["Tagh4z4", "Taghaza"],
  ["Dar'a®", "Dar'a"],
  ["Mam- basé", "Mambasa"],
  ["country.*° It", "country. It"],
  ["brought . to", "brought to"],
  ["We Stayed", "We stayed"],
  ["Kulw4", "Kulwa"],
  ['it." Kulwé', "it. Kulwa"],
  ["Sufála", "Sufala"],
  ["qAdi", "qadi"],
  ["every- one", "everyone"],
  ["inhabi- tants", "inhabitants"],
  ["apart- ments", "apartments"],
];

function normalize(text) {
  return text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .replace(/\[NOTE ?\d+\]/g, "")
    .replace(/\[scan p\.\d+\] ?/g, "")
    .replace(/_/g, "")
    .replace(/ +/g, " ");
}

async function load(name, corrections = []) {
  let text = normalize(await readFile(join(folder, name), "utf8"));
  for (const [wrong, right] of corrections) text = text.split(wrong).join(right);
  return text;
}

const texts = {
  polo: (await load("polo-v1.txt")) + " " + (await load("polo-v2.txt")),
  decameron: await load("decameron.txt"),
  gibb: await load("gibb-ocr.txt", gibbOcrCorrections),
};

function textFor(excerpt) {
  if (excerpt.id.startsWith("polo-")) return texts.polo;
  if (excerpt.id.startsWith("boccaccio-")) return texts.decameron;
  if (excerpt.id.startsWith("battuta-")) return texts.gibb;
  throw new Error(`${excerpt.id}: no source text is registered for this prefix`);
}

let failures = 0;
let runs = 0;
const quoted = Object.values(excerpts).filter(
  (excerpt) => excerpt.sourceType !== "original",
);
for (const excerpt of quoted) {
  let restored = excerpt.text;
  for (const edit of excerpt.edits || []) {
    if (!restored.includes(edit.shown)) {
      console.error(`${excerpt.id}: edit "${edit.shown}" is not in the excerpt`);
      failures += 1;
    }
    restored = restored.split(edit.shown).join(edit.original);
  }
  const source = textFor(excerpt);
  const pieces = normalize(restored.replace(/\n{2,}/g, " ¶ "))
    .split(/ ?\. \. \.(?: \.)? ?|¶/)
    .map((piece) => piece.trim())
    .filter((piece) => piece.length > 0);
  for (const piece of pieces) {
    runs += 1;
    if (!source.includes(piece)) {
      failures += 1;
      console.error(`${excerpt.id}: not found in source:\n  "${piece}"`);
    }
  }
}
console.log(
  `${runs} quoted runs checked across ${quoted.length} excerpts; ${failures} problem(s).`,
);
process.exit(failures ? 1 : 0);

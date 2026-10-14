// Checks every quoted run in docs/content/world-history/excerpts.js against
// the full text of its edition. The source texts are not stored in this
// repository; pass a folder containing the files listed in
// scripts/lib/excerpt-sources.mjs.
// Project Gutenberg texts can be downloaded from gutenberg.org (or the
// GITenberg mirror on GitHub, which republishes the same plain-text files).
// Usage: node scripts/verify-excerpts.mjs path/to/source-texts [--require-all]
//
// An excerpt whose source file is missing is reported as "not checked". With
// --require-all, a missing file fails the run; without it, only mismatches fail.
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { excerpts } from "../docs/content/world-history/excerpts.js";
import { excerptSourceFor } from "./lib/excerpt-sources.mjs";

const folder = process.argv[2];
const requireAll = process.argv.includes("--require-all");
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

const corrections = { "battuta-": gibbOcrCorrections };

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

async function present(name) {
  try {
    await access(join(folder, name));
    return true;
  } catch {
    return false;
  }
}

const cache = new Map();
async function textFor(excerpt) {
  const registered = excerptSourceFor(excerpt.id);
  if (!registered)
    throw new Error(`${excerpt.id}: no source text is registered for this prefix`);
  const { prefix, files } = registered;
  if (cache.has(prefix)) return cache.get(prefix);
  let text = null;
  if ((await Promise.all(files.map(present))).every(Boolean)) {
    text = "";
    for (const name of files)
      text += " " + normalize(await readFile(join(folder, name), "utf8"));
    for (const [wrong, right] of corrections[prefix] || [])
      text = text.split(wrong).join(right);
  }
  cache.set(prefix, text);
  return text;
}

let failures = 0;
let runs = 0;
const skipped = [];
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
  const source = await textFor(excerpt);
  if (source === null) {
    skipped.push(excerpt.id);
    continue;
  }
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
const edits = quoted.flatMap((excerpt) =>
  (excerpt.edits || []).map(
    (edit) => `  ${excerpt.id}: "${edit.shown}" replaces "${edit.original}"`,
  ),
);
if (edits.length)
  console.log(`Bracketed editorial edits (${edits.length}):\n${edits.join("\n")}`);
if (skipped.length) {
  console.log(`Not checked (source file missing): ${skipped.join(", ")}`);
  if (requireAll) failures += skipped.length;
}
console.log(
  `${runs} quoted runs checked across ${quoted.length - skipped.length} of ${quoted.length} excerpts; ${failures} problem(s).`,
);
process.exit(failures ? 1 : 0);

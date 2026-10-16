// Checks every PSAT/SAT passage against the full text of its source edition.
//
//   node scripts/verify-test-prep-passages.mjs path/to/texts
//
// The folder holds Project Gutenberg plain-text files named by ebook number,
// such as 205.txt for Walden. Texts are not stored in this repository; download
// them from gutenberg.org (or a mirror of the same release) before running.
//
// Matching ignores line wrapping, underscores used for italics, and the
// difference between "--" and an em dash, and between straight and curly
// quotes. ". . ." stands for an omission, and a bracketed edit stands for the
// original words listed in the passage's `edits`.
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/verify-test-prep-passages.mjs path/to/texts");
  process.exit(2);
}

const root = resolve(new URL("..", import.meta.url).pathname);
const { passages } = await import(
  pathToFileURL(join(root, "docs/content/test-prep/passages.js"))
);

function normalize(text) {
  return text
    .replace(/\r/g, "")
    .replace(/_/g, "")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/—|--/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function pattern(passage) {
  const edits = new Map(
    (passage.edits || []).map((edit) => [edit.replacement, edit.original]),
  );
  const parts = normalize(passage.text).split(/(\s?\. \. \.\s?|\[[^\]]+\])/);
  return new RegExp(
    parts
      .map((part) => {
        if (/^\s?\. \. \.\s?$/.test(part)) return "[\\s\\S]{1,4000}?";
        const edit = part.match(/^\[([^\]]+)\]$/);
        if (edit)
          return edits.has(edit[1])
            ? escapeRegExp(normalize(edits.get(edit[1])))
            : "[\\s\\S]{0,120}?";
        return escapeRegExp(part);
      })
      .join(""),
  );
}

const cache = new Map();
let failures = 0;
let checked = 0;
for (const passage of passages) {
  const number = passage.source.gutenberg;
  if (!number) {
    console.log(`SKIP ${passage.id}: no Gutenberg number`);
    continue;
  }
  if (!cache.has(number)) {
    try {
      cache.set(number, normalize(await readFile(join(folder, `${number}.txt`), "utf8")));
    } catch {
      console.error(`MISSING ${number}.txt for ${passage.id}`);
      failures += 1;
      continue;
    }
  }
  checked += 1;
  if (pattern(passage).test(cache.get(number))) console.log(`OK   ${passage.id}`);
  else {
    failures += 1;
    console.error(`FAIL ${passage.id}: text does not match ${number}.txt`);
  }
}
console.log(`${checked} passages checked, ${failures} problems.`);
process.exit(failures ? 1 : 0);

// Stamps every app module and stylesheet URL with a hash of its contents, so a
// browser never mixes a cached file from an older release with a newer one.
//
// - docs/index.html gets an import map that sends each app module to
//   "<file>?v=<hash>", plus hashed URLs for main.js and styles.css.
// - docs/styles.css gets hashed @import URLs.
//
// Run with --check to fail (without writing) when the stamped files are stale.
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const check = process.argv.includes("--check");

const hash = (text) => createHash("sha256").update(text).digest("hex").slice(0, 10);
const toUrl = (file) => "./" + path.relative(docs, file).split(path.sep).join("/");

async function walk(dir, ext) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, ext)));
    else if (entry.name.endsWith(ext)) out.push(full);
  }
  return out.sort();
}

async function stampStyles() {
  const file = path.join(docs, "styles.css");
  const before = await readFile(file, "utf8");
  let after = before;
  for (const match of before.matchAll(
    /@import url\("(\.\/styles\/[^"?]+)(\?v=[^"]*)?"\);/g,
  )) {
    const css = await readFile(path.join(docs, match[1]), "utf8");
    after = after.replace(match[0], `@import url("${match[1]}?v=${hash(css)}");`);
  }
  return { file, before, after };
}

async function stampIndex(stylesText) {
  const file = path.join(docs, "index.html");
  const before = await readFile(file, "utf8");
  const modules = await walk(path.join(docs, "app"), ".js");
  const imports = {};
  let mainUrl = "";
  for (const module of modules) {
    const url = toUrl(module);
    const versioned = `${url}?v=${hash(await readFile(module, "utf8"))}`;
    imports[url] = versioned;
    if (url === "./app/main.js") mainUrl = versioned;
  }
  const map = `<script type="importmap">${JSON.stringify({ imports })}</script>`;
  let html = before
    .replace(/\s*<script type="importmap">[\s\S]*?<\/script>/, "")
    .replace(
      /<link rel="stylesheet" href="\.\/styles\.css[^"]*" \/>/,
      `<link rel="stylesheet" href="./styles.css?v=${hash(stylesText)}" />`,
    )
    .replace(
      /<script type="module" src="\.\/app\/main\.js[^"]*"><\/script>/,
      `${map}<script type="module" src="${mainUrl}"></script>`,
    );
  if (!html.includes('type="importmap"'))
    throw new Error("index.html is missing the main.js module script tag.");
  const options = (await prettier.resolveConfig(file)) || {};
  html = await prettier.format(html, { ...options, parser: "html", filepath: file });
  return { file, before, after: html };
}

const styles = await stampStyles();
const index = await stampIndex(styles.after);
const stale = [styles, index].filter((item) => item.before !== item.after);
if (check) {
  if (stale.length) {
    console.error(
      `Release stamps are out of date in ${stale.map((item) => path.relative(root, item.file)).join(", ")}. Run npm run build.`,
    );
    process.exit(1);
  }
  console.log("Release stamps are current.");
} else {
  for (const item of stale) await writeFile(item.file, item.after);
  console.log(
    `Stamped ${stale.length ? stale.map((item) => path.relative(root, item.file)).join(", ") : "nothing (already current)"}.`,
  );
}

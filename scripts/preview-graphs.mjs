// Writes graph-preview/index.html, a page that draws graph blocks so you can check
// them in a browser while authoring.
//
//   npm run graphs                     every graph in docs/generated (run npm run build first)
//   npm run graphs -- my-graph.json    graphs from a JSON file (one block or a list)
//   npm run graphs -- my-graphs.mjs    graphs from a module's default export
//
// Open graph-preview/index.html through the same local server you use for the site
// (for example VS Code Live Server at the repository root) so the site styles load.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderGraph } from "../docs/app/graph/render.js";
import { validateGraph } from "./lib/validate-graph.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "graph-preview");

function collect(value, where, found) {
  if (Array.isArray(value))
    value.forEach((item, i) => collect(item, `${where}[${i}]`, found));
  else if (value && typeof value === "object") {
    if (value.type === "graph" && value.window) found.push({ where, block: value });
    else
      for (const [key, item] of Object.entries(value))
        collect(item, `${where}.${key}`, found);
  }
}

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith(".json")) files.push(full);
  }
  return files;
}

const escapeHtml = (text) =>
  String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const found = [];
const input = process.argv[2];
if (input) {
  const file = path.resolve(input);
  const data = file.endsWith(".json")
    ? JSON.parse(await readFile(file, "utf8"))
    : (await import(pathToFileURL(file).href)).default;
  const blocks = Array.isArray(data) ? data : [data];
  blocks.forEach((block, i) =>
    found.push({
      where: `${path.basename(file)}[${i}]`,
      block: { type: "graph", ...block },
    }),
  );
} else {
  for (const file of await walk(path.join(root, "docs", "generated")))
    collect(JSON.parse(await readFile(file, "utf8")), path.relative(root, file), found);
}

const cards = found.map(({ where, block }) => {
  let body;
  try {
    validateGraph(block, where);
    body = renderGraph(block);
  } catch (error) {
    body = `<p class="preview-error">${escapeHtml(error.message)}</p>`;
  }
  return `<section class="preview-card"><p class="preview-where">${escapeHtml(where)}</p>${body}</section>`;
});

await mkdir(outDir, { recursive: true });
await writeFile(
  path.join(outDir, "index.html"),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Graph preview</title>
<link rel="stylesheet" href="../docs/styles.css">
<style>
  body { padding: 24px; }
  .preview-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); }
  .preview-where { font: 12px var(--mono); color: var(--muted); margin: 0; word-break: break-all; }
  .preview-error { color: var(--red); font-weight: 600; }
</style>
</head>
<body>
<h1>Graph preview · ${found.length} graph${found.length === 1 ? "" : "s"}</h1>
<div class="preview-grid">${cards.join("\n")}</div>
</body>
</html>
`,
);
console.log(
  `Wrote graph-preview/index.html with ${found.length} graph${found.length === 1 ? "" : "s"}.`,
);

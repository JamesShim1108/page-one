// Prints sample problems from a topic's problems.js so an author can read them the way a
// student will, without a full build.
//
//   npm run sample -- unit-03/topics/polar-function-graphs        two samples of every template
//   npm run sample -- unit-03/topics/polar-function-graphs p05 4   four samples of p05
//
// The folder is relative to docs/content/ap-precalculus/.
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { createRandom } = await import(
  pathToFileURL(resolve(root, "docs/content/practice-kit/index.js"))
);
const { answerText } = await import(
  pathToFileURL(resolve(root, "docs/app/practice/answers.js"))
);

const [folder, only, countArg] = process.argv.slice(2);
if (!folder) {
  console.error("usage: npm run sample -- <unit-0N/topics/folder> [pNN] [count]");
  process.exit(1);
}
const file = resolve(root, "docs/content/ap-precalculus", folder, "problems.js");
if (!existsSync(file)) {
  console.error(`No problems.js at ${file}`);
  process.exit(1);
}
const count = Number(countArg || 2);
const { problems } = await import(pathToFileURL(file));

for (const template of problems) {
  if (only && only !== template.id) continue;
  const flags = `${template.tier}${template.unit ? ", unit practice" : ""}`;
  console.log(`\n=== ${template.id} [${flags}] ${template.concept} / ${template.skill}`);
  let shown = 0;
  for (let attempt = 0; attempt < 200 && shown < count; attempt += 1) {
    const random = createRandom(`sample-${template.id}#${attempt}`);
    let variant;
    try {
      variant = template.make(random, { attempt });
    } catch (error) {
      if (error?.name === "Reject") continue;
      throw error;
    }
    if (!variant) continue;
    shown += 1;
    console.log(`-- ${variant.stem}`);
    for (const block of variant.stimulusBlocks || [])
      console.log(`   [${block.type}] ${block.caption || ""}`);
    for (const part of variant.parts) {
      if (part.prompt) console.log(`   ${part.id}. ${part.prompt}`);
      for (const field of part.fields)
        console.log(
          `      ${field.label || "(answer)"} [${field.type}] => ${answerText(field)}`,
        );
    }
    for (const step of variant.solution) console.log(`   · ${step}`);
  }
}

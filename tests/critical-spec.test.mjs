import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { resolveGlossary, selectGlossary } from "../scripts/lib/glossary.mjs";
import { validateDefinitionCoverage } from "../scripts/lib/validate.mjs";
import { coursePage } from "../docs/app/views/catalog.js";

const root = new URL("../", import.meta.url);
const readGenerated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));

test("Unit 2 and its guide emit selected, source-backed definition coverage", async () => {
  for (let number = 1; number <= 7; number += 1) {
    const page = await readGenerated(`world/topics/world-2-${number}.json`);
    assert.equal(page.lesson.definitionCoverage.status, "required");
    assert.ok(page.glossary.length > 0);
    for (const concept of page.glossary) {
      assert.ok(concept.sourceIds.length > 0);
      assert.ok(concept.sourceLocators.length > 0);
      assert.ok(concept.verificationNote);
    }
  }
  const guide = await readGenerated("world/guides/world-2.json");
  assert.equal(guide.guide.definitionCoverage.status, "required");
  assert.ok(guide.glossary.length >= 10);
});

test("a future course glossary fixture uses shared coverage validation", () => {
  const topics = new Map([["algebra2-1-1", { lesson: { vocabulary: [] } }]]);
  const sources = new Map([
    ["fixture-source", { id: "fixture-source", label: "Fixture source" }],
  ]);
  const concepts = resolveGlossary(
    [
      {
        file: "fixture/glossary.js",
        glossary: {
          schemaVersion: 1,
          courseId: "algebra2",
          entries: [
            {
              id: "algebra2-function",
              term: "function",
              definition: "A relation that assigns each input exactly one output.",
              sourceLabel: "Fixture source",
              sourceIds: ["fixture-source"],
              sourceLocators: [
                { sourceId: "fixture-source", locator: "Fixture section" },
              ],
              verificationNote: "Fixture verification note.",
              topicIds: ["algebra2-1-1"],
            },
          ],
        },
      },
    ],
    { courseId: "algebra2", topics, sources },
  );
  const selected = selectGlossary(concepts, { topicIds: ["algebra2-1-1"] }, "fixture");
  assert.doesNotThrow(() =>
    validateDefinitionCoverage({
      coverage: { status: "required", conceptIds: ["algebra2-function"] },
      concepts: selected,
      text: "A function assigns each input one output.",
      location: "fixture/algebra2-1-1",
      pageId: "algebra2-1-1",
    }),
  );
  assert.throws(
    () =>
      validateDefinitionCoverage({
        coverage: undefined,
        concepts: selected,
        text: "A function assigns each input one output.",
        location: "fixture/algebra2-1-1",
        pageId: "algebra2-1-1",
      }),
    /add definitionCoverage/,
  );
  assert.doesNotThrow(() =>
    validateDefinitionCoverage({
      coverage: { status: "not-needed", reason: "Interactive-only fixture." },
      concepts: selected,
      text: "",
      location: "fixture/algebra2-tool",
      pageId: "algebra2-tool",
    }),
  );
});

test("Algebra 2 is a clickable empty shell with no study content", async () => {
  const index = await readGenerated("algebra2/index.json");
  const catalog = await readGenerated("catalog.json");
  const algebra = catalog.courses.find((course) => course.id === "algebra2");
  assert.equal(algebra.status, "soon");
  assert.equal(algebra.emptyShell, true);
  assert.equal(algebra.readyTopicCount, 0);
  assert.deepEqual(index.units, []);
  const html = coursePage(index);
  assert.match(html, /No lessons or practice have been added yet/);
  assert.match(html, /Coming soon/i);
  assert.equal(html.includes("Explore the units"), false);
  assert.equal(html.includes("Start Topic"), false);
});

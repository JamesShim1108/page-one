import test from "node:test";
import assert from "node:assert/strict";
import { compileContent } from "../scripts/build-content.mjs";
import { resolveGlossary, selectGlossary } from "../scripts/lib/glossary.mjs";
import { createConceptText } from "../docs/app/concepts/text.js";
import { placePopover } from "../docs/app/concepts/position.js";
import { renderBlocks } from "../docs/app/blocks.js";
import { lessonPage } from "../docs/app/views/lesson.js";
import { studyGuidePage } from "../docs/app/views/guide.js";

const compiled = compileContent();
const concept = (id, term, aliases = []) => ({
  id,
  term,
  aliases,
  definition: `Meaning of ${term}.`,
});

test("concept matching preserves text, prefers longer phrases, and respects word boundaries", () => {
  const text = createConceptText([
    concept("world-maya", "Maya"),
    concept("world-city", "Maya city-state"),
  ]);
  const input = "Maya city-state, MAYA, Mayan, and Maya.";
  const html = text(input);
  assert.equal((html.match(/data-concept-id=/g) || []).length, 2);
  assert.match(html, /data-concept-id="world-city"[^>]*>Maya city-state</);
  assert.match(html, /data-concept-id="world-maya"[^>]*>MAYA</);
  assert.equal(html.replace(/<[^>]+>/g, ""), input);
  assert.doesNotMatch(html, />Mayan</);
  // The next paragraph can explain the same concept again.
  assert.match(text("Maya"), /data-concept-id="world-maya"/);
});

test("aliases use the same meaning without matching substrings or treating regex punctuation as code", () => {
  const text = createConceptText([
    concept("demo-guild", "Guild", ["guilds"]),
    concept("demo-code", "C++"),
    concept("demo-cafe", "Café"),
  ]);
  const html = text("Guilds, gilded, C++, CAFE, CAFÉ, and guild.");
  assert.equal((html.match(/data-concept-id=/g) || []).length, 3);
  assert.match(html, />Guilds</);
  assert.match(html, />C\+\+</);
  assert.match(html, />CAFÉ</);
  assert.doesNotMatch(html, />CAFE</);
});

test("untrusted text stays escaped and practice blocks stay plain unless explicitly opted in", () => {
  const text = createConceptText([concept("world-guild", "Guild")]);
  const html = text('<img src=x onerror="bad()"> Guild & guild');
  assert.doesNotMatch(html, /<img/);
  assert.match(html, /&lt;img/);
  assert.match(html, / &amp; guild/);
  const blocks = [
    { type: "paragraph", text: "Guild" },
    { type: "list", items: ["Guild"] },
    { type: "table", caption: "Review", columns: ["Example"], rows: [["Guild"]] },
  ];
  assert.doesNotMatch(renderBlocks(blocks), /concept-trigger/);
  assert.equal(
    (renderBlocks(blocks, {}, text).match(/concept-trigger/g) || []).length,
    3,
  );
});

const fixtures = () => ({
  courseId: "demo",
  topics: new Map([
    [
      "demo-1",
      {
        lesson: {
          id: "demo-1",
          code: "1.1",
          vocabulary: [
            { id: "guild", term: "Guild", definition: "The original definition." },
          ],
        },
      },
    ],
  ]),
  sources: new Map([["notes", { label: "Class notes" }]]),
});
const group = (entries) => [
  {
    file: "demo/glossary/economy.js",
    glossary: { schemaVersion: 1, courseId: "demo", entries },
  },
];

test("glossary references reuse the source verbatim and follow source edits", () => {
  const context = fixtures();
  const authored = group([
    {
      id: "demo-guild",
      from: { topicId: "demo-1", vocabularyId: "guild" },
      aliases: ["guilds"],
    },
  ]);
  assert.equal(
    resolveGlossary(authored, context).get("demo-guild").definition,
    "The original definition.",
  );
  context.topics.get("demo-1").lesson.vocabulary[0].definition =
    "An updated source definition.";
  const registry = resolveGlossary(authored, context);
  assert.equal(registry.get("demo-guild").definition, "An updated source definition.");
  assert.equal(selectGlossary(registry, { topicIds: ["demo-1"] }, "lesson").length, 1);
  assert.deepEqual(selectGlossary(registry, { ids: [] }, "lesson"), []);
  assert.deepEqual(
    selectGlossary(registry, { topicIds: ["demo-2"] }, "other lesson"),
    [],
  );
});

test("validation catches missing meanings, duplicate IDs and aliases, and ambiguous page vocabularies", () => {
  const entry = { id: "demo-guild", from: { topicId: "demo-1", vocabularyId: "guild" } };
  assert.throws(
    () =>
      resolveGlossary(
        group([{ ...entry, from: { ...entry.from, vocabularyId: "missing" } }]),
        fixtures(),
      ),
    /does not exist/,
  );
  assert.throws(
    () => resolveGlossary(group([entry, entry]), fixtures()),
    /duplicate concept/,
  );
  assert.throws(
    () => resolveGlossary(group([{ ...entry, definition: "Copy" }]), fixtures()),
    /OR authored text/,
  );
  assert.throws(
    () => resolveGlossary(group([{ ...entry, aliases: ["guild"] }]), fixtures()),
    /duplicate matching phrase/,
  );
  const registry = resolveGlossary(
    group([entry, { ...entry, id: "demo-second-context" }]),
    fixtures(),
  );
  assert.throws(
    () => selectGlossary(registry, { topicIds: ["demo-1"] }, "page"),
    /ambiguous phrase/,
  );
  assert.equal(selectGlossary(registry, { ids: ["demo-guild"] }, "page").length, 1);
  assert.throws(
    () => selectGlossary(registry, { ids: ["demo-missing"] }, "page"),
    /unknown glossary/,
  );
});

test("new concepts can be authored once with valid source references", () => {
  const entry = {
    id: "demo-new",
    term: "New concept",
    definition: "Original explanation.",
    sourceLabel: "Class notes",
    sourceIds: ["notes"],
    topicIds: ["demo-1"],
  };
  assert.equal(
    resolveGlossary(group([entry]), fixtures()).get(entry.id).definition,
    entry.definition,
  );
  assert.throws(
    () => resolveGlossary(group([{ ...entry, sourceIds: ["missing"] }]), fixtures()),
    /unknown source/,
  );
});

for (let number = 1; number <= 7; number++) {
  test(`Topic 1.${number}: resolved definitions match existing vocabulary and render accessible reading controls`, async () => {
    const files = await compiled;
    const data = JSON.parse(files.get(`world/topics/world-1-${number}.json`));
    data.bank = JSON.parse(files.get(data.bankPath));
    assert.equal(data.glossary.length, data.lesson.vocabulary.length);
    for (const entry of data.glossary) {
      const original = data.lesson.vocabulary.find((term) => term.term === entry.term);
      assert.equal(entry.definition, original.definition);
    }
    const html = lessonPage(data, { attempt: () => null, quickView: () => "" });
    assert.match(html, /class="concept-trigger"/);
    assert.match(html, /aria-haspopup="dialog" aria-expanded="false"/);
    const ids = [...html.matchAll(/id="(concept-word-\d+)"/g)].map((match) => match[1]);
    assert.equal(ids.length, new Set(ids).size);
    const vocabulary = html.split('<dl class="terms">')[1].split("</dl>")[0];
    assert.doesNotMatch(vocabulary, /concept-trigger/);
    assert.equal(JSON.parse(files.get(data.bankPath)).glossary, undefined);
  });
}

test("study guides reuse selected course concepts without shipping a course-wide dictionary to the homepage", async () => {
  const files = await compiled;
  const guide = JSON.parse(files.get("world/guides/world-1.json"));
  assert.equal(guide.glossary.length, guide.guide.glossaryIds.length);
  assert.match(studyGuidePage(guide), /class="concept-trigger"/);
  assert.doesNotMatch(files.get("catalog.json"), /glossary|definition/);
  assert.doesNotMatch(files.get("world/quizzes/world-1-practice.json"), /glossary/);
});

test("popover placement fits desktop, phone, and bottom-edge anchors", () => {
  assert.deepEqual(
    placePopover(
      { left: 100, top: 100, bottom: 120 },
      { width: 300, height: 180 },
      { width: 1200, height: 800 },
    ),
    { left: 100, top: 130 },
  );
  const small = placePopover(
    { left: 270, top: 700, bottom: 730 },
    { width: 296, height: 240 },
    { width: 320, height: 844 },
  );
  assert.deepEqual(small, { left: 12, top: 450 });
  const crowded = placePopover(
    { left: 0, top: 20, bottom: 40 },
    { width: 296, height: 180 },
    { width: 320, height: 204 },
  );
  assert.deepEqual(crowded, { left: 12, top: 12 });
});

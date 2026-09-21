import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { renderBlocks } from "../docs/app/blocks.js";
import {
  applyReadingPreferences,
  createReadingPreferences,
  defaultReadingPreferences,
  readingSettingsPanel,
} from "../docs/app/reading/preferences.js";
import {
  createReadingPositionStore,
  normalizeReadingPosition,
} from "../docs/app/reading/position.js";
import { studyGuidePage } from "../docs/app/views/guide.js";
import { lessonPage } from "../docs/app/views/lesson.js";
import { validateBlocks } from "../scripts/lib/validate.mjs";
import { createLocalAdapter } from "../docs/app/storage/adapter.js";

function memoryStorage() {
  const values = new Map();
  return {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

function fakeDocument() {
  const styleValues = new Map();
  const classes = new Set();
  return {
    documentElement: {
      style: {
        setProperty(name, value) {
          styleValues.set(name, value);
        },
      },
    },
    body: {
      classList: {
        toggle(name, enabled) {
          if (enabled) classes.add(name);
          else classes.delete(name);
        },
      },
    },
    styleValues,
    classes,
  };
}

test("reading preferences apply immediately, persist independently, and reset safely", async () => {
  const storage = memoryStorage();
  const options = {
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "reading-preferences-test",
  };
  const preferences = createReadingPreferences(createLocalAdapter(options));
  await preferences.ready;
  assert.deepEqual(preferences.values, defaultReadingPreferences);

  const document = fakeDocument();
  assert.equal(
    applyReadingPreferences({ textScale: "150", background: "plain" }, document)
      .textScale,
    "150",
  );
  assert.equal(document.styleValues.get("--reading-scale"), "1.5");
  assert.equal(document.styleValues.get("--reading-measure"), "68ch");
  assert.equal(document.classes.has("reading-plain"), true);
  assert.match(readingSettingsPanel(preferences.values), /aria-label="Text size"/);

  const saved = await preferences.set("readingWidth", "80");
  assert.equal(saved.ok, true);
  assert.equal(saved.status, "temporary");
  const reloaded = createReadingPreferences(createLocalAdapter(options));
  await reloaded.ready;
  assert.equal(reloaded.values.readingWidth, "80");
  await reloaded.reset();
  assert.deepEqual(reloaded.values, defaultReadingPreferences);
});

test("denied storage keeps reading preferences usable in memory", async () => {
  const preferences = createReadingPreferences(
    createLocalAdapter({
      indexedDB: null,
      getStorage: () => null,
      deploymentScope: "reading-denied-test",
    }),
  );
  await preferences.ready;
  const result = await preferences.set("textScale", "130");
  assert.equal(result.ok, true);
  assert.equal(preferences.values.textScale, "130");
  assert.equal(preferences.state, "temporary");
});

test("reading positions are bounded and survive the shared local adapter", async () => {
  assert.equal(
    normalizeReadingPosition({ pageId: "p", sectionId: "s", offset: 999 }, 300).offset,
    300,
  );
  assert.equal(
    normalizeReadingPosition({ pageId: "p", sectionId: "s", offset: -999 }, 300).offset,
    -300,
  );
  assert.equal(
    normalizeReadingPosition({ pageId: "p", sectionId: "s", offset: "bad" }),
    null,
  );

  const storage = memoryStorage();
  const options = {
    indexedDB: null,
    getStorage: () => storage,
    deploymentScope: "reading-position-test",
  };
  const adapter = createLocalAdapter(options);
  const positions = createReadingPositionStore(adapter, "reading:topic:demo", "demo");
  await positions.ready;
  const saved = await positions.save({
    sectionId: "section-a",
    blockId: "paragraph-a",
    offset: 42,
    disclosures: ["sources"],
  });
  assert.equal(saved.ok, true);
  const reloaded = createReadingPositionStore(
    createLocalAdapter(options),
    "reading:topic:demo",
    "demo",
  );
  await reloaded.ready;
  assert.deepEqual(reloaded.position, {
    pageId: "reading:topic:demo",
    sectionId: "section-a",
    blockId: "paragraph-a",
    offset: 42,
    pageRevision: "",
    disclosures: ["sources"],
  });
});

test("structured reading renderers expose stable anchors without changing authored prose", async () => {
  const html = renderBlocks(
    [{ type: "paragraph", id: "stable-paragraph", text: "Anchor text & unchanged." }],
    {},
    undefined,
    "section-a",
  );
  assert.match(html, /id="stable-paragraph"/);
  assert.match(html, /data-reading-section="section-a"/);
  assert.match(html, /Anchor text &amp; unchanged\./);
  assert.throws(
    () =>
      validateBlocks(
        [
          { type: "paragraph", id: "same", text: "One" },
          { type: "paragraph", id: "same", text: "Two" },
        ],
        new Map(),
        "fixture.section",
      ),
    /duplicate stable block ID/,
  );

  const lesson = JSON.parse(
    await readFile(
      new URL("../docs/generated/world/topics/world-1-2.json", import.meta.url),
    ),
  );
  lesson.bank = JSON.parse(
    await readFile(
      new URL("../docs/generated/world/banks/world-1-2.json", import.meta.url),
    ),
  );
  const lessonHtml = lessonPage(lesson, { attempt: () => null, quickView: () => "" });
  assert.match(lessonHtml, /class="container reading-surface"/);
  assert.match(lessonHtml, /data-reading-nav-link="learn"/);
  assert.match(lessonHtml, /data-reading-section="islam-states"/);
  assert.match(lessonHtml, /data-reading-action="copy-section"/);
  assert.match(lessonHtml, /data-reading-disclosure="sources"/);
  assert.doesNotMatch(lessonHtml, /data-reading-disclosure="reading-reveal"/);

  const guide = JSON.parse(
    await readFile(
      new URL("../docs/generated/world/guides/world-1.json", import.meta.url),
    ),
  );
  const guideHtml = studyGuidePage(guide);
  assert.match(guideHtml, /data-reading-route="\/guide\/world-1"/);
  assert.match(guideHtml, /data-reading-section="timeline"/);
  assert.match(guideHtml, /data-reading-nav-link="resources"/);
});

import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createTermsEngine } from "../docs/app/terms/engine.js";
import { createTermsStore } from "../docs/app/terms/store.js";
import { createLocalAdapter } from "../docs/app/storage/adapter.js";
import { termsIndexPage, termSetPage } from "../docs/app/terms/views.js";
import { unitPage } from "../docs/app/views/catalog.js";
import { compileContent } from "../scripts/build-content.mjs";
import { validateTermSet } from "../scripts/lib/terms.mjs";
import { createContentStore } from "../docs/app/content-store.js";
import { termSet as a } from "../docs/content/world-history/terms/period-1-a.js";
import { termSet as b } from "../docs/content/world-history/terms/period-1-b.js";

// Fingerprints were recorded only after verify-term-sources matched the supplied
// PDFs in full. They catch text edits without keeping a second copy of definitions.
const sourceChecks = [
  [a, 27, "c018a57fb66a576a52a16c675f7cc98f9f6a968bd3ac0f31d1918e23c322685d"],
  [b, 29, "7443f55b4b1e3508d5c14755f782532f23595f76e8b8967eef797dde44dca20f"],
];
const fixture = { ...a, revision: "source-a-1" };
const compiled = await compileContent();
const data = (path) => JSON.parse(compiled.get(path));

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
}

for (const [set, count, checksum] of sourceChecks) {
  test(`${set.title}: exact source terms, definitions, order, and no duplicates`, () => {
    assert.equal(set.cards.length, count);
    assert.equal(new Set(set.cards.map((card) => card.term.toLowerCase())).size, count);
    const digest = createHash("sha256")
      .update(JSON.stringify(set.cards.map(({ term, definition }) => [term, definition])))
      .digest("hex");
    assert.equal(digest, checksum);
    assert.deepEqual(data(`world/terms/${set.id}.json`).set.cards, set.cards);
    validateTermSet(set, "world", "test");
  });
  test(`${set.title}: every card can flip, classify, advance, and be revisited`, () => {
    const engine = createTermsEngine({ ...set, revision: "test" });
    for (let i = 0; i < count; i++) {
      assert.equal(engine.current().id, set.cards[i].id);
      engine.flip();
      assert.equal(engine.state.flipped, true);
      engine.flip();
      assert.equal(engine.state.flipped, false);
      engine.classify(i % 2 ? "known" : "unknown");
      assert.equal(engine.state.flipped, false);
    }
    assert.equal(engine.current(), null);
    assert.equal(engine.counts().remaining, 0);
    engine.move(-1);
    assert.equal(engine.current().id, set.cards.at(-1).id);
    engine.start("all");
    assert.equal(engine.state.order.length, count);
    assert.equal(engine.counts().remaining, 0);
  });
}

test("classifying in a filtered round never skips a card", () => {
  const engine = createTermsEngine(fixture);
  engine.classify("unknown");
  engine.classify("unknown");
  engine.classify("known");
  assert.deepEqual(engine.counts(), { known: 1, unknown: 2, remaining: 24, total: 27 });
  engine.start("unknown");
  assert.deepEqual(engine.state.order, ["caliph", "sunni"]);
  engine.classify("known");
  assert.equal(engine.current().id, "sunni");
  engine.classify("known");
  assert.equal(engine.current(), null);
  engine.move(-1);
  assert.equal(engine.current().id, "sunni");
  engine.start("unknown");
  assert.equal(engine.state.order.length, 0);
  engine.start("remaining");
  assert.equal(engine.state.order.length, 24);
  assert.equal(engine.current().id, "allah");
  engine.classify("known");
  assert.equal(engine.current().id, "ramadan");
});

test("shuffle is a permutation, unshuffle restores original order, front switching clears flip", () => {
  const before = JSON.stringify(fixture.cards);
  const engine = createTermsEngine(fixture, null, () => 0);
  engine.classify("known");
  engine.setShuffle(true);
  assert.deepEqual(
    engine.state.order,
    fixture.cards.map((card) => card.id),
  );
  engine.start();
  assert.notDeepEqual(
    engine.state.order,
    fixture.cards.map((card) => card.id),
  );
  assert.deepEqual(
    [...engine.state.order].sort(),
    fixture.cards.map((card) => card.id).sort(),
  );
  engine.setShuffle(false);
  assert.notDeepEqual(
    engine.state.order,
    fixture.cards.map((card) => card.id),
  );
  engine.start();
  assert.deepEqual(
    engine.state.order,
    fixture.cards.map((card) => card.id),
  );
  engine.flip();
  engine.setFront("definition");
  assert.equal(engine.state.flipped, false);
  assert.equal(engine.state.front, "definition");
  assert.equal(engine.counts().known, 1);
  assert.equal(JSON.stringify(fixture.cards), before);
});

test("classification undo restores unstudied state, cursor, and the completed card", () => {
  const engine = createTermsEngine({ ...fixture, cards: fixture.cards.slice(0, 2) });
  engine.classify("known");
  engine.classify("unknown");
  assert.equal(engine.current(), null);
  assert.equal(engine.undo(), true);
  assert.equal(engine.current().id, fixture.cards[1].id);
  assert.equal(engine.state.classifications[fixture.cards[1].id], undefined);
  assert.equal(engine.counts().remaining, 1);
  assert.equal(engine.undo(), true);
  assert.equal(engine.current().id, fixture.cards[0].id);
  assert.equal(engine.state.classifications[fixture.cards[0].id], undefined);
  assert.equal(engine.undo(), false);
});

test("undo is bounded, survives a snapshot, and a new classification does not redo", () => {
  const small = { ...fixture, cards: fixture.cards.slice(0, 2) };
  const engine = createTermsEngine(small);
  engine.classify("known");
  engine.move(-1);
  engine.classify("unknown");
  const restored = createTermsEngine(small, engine.snapshot());
  assert.equal(restored.undo(), true);
  assert.equal(restored.state.classifications[small.cards[0].id], "known");
  restored.classify("known");
  assert.equal(restored.undo(), true);
  assert.equal(restored.state.classifications[small.cards[0].id], "known");
});

test("a filtered list can start a frozen custom round that survives reload", () => {
  const small = { ...fixture, cards: fixture.cards.slice(0, 3) };
  const engine = createTermsEngine(small, null, () => 0);
  assert.equal(engine.startWithIds([small.cards[2].id, small.cards[0].id]), true);
  assert.deepEqual(engine.state.order, [small.cards[2].id, small.cards[0].id]);
  engine.classify("unknown");
  const restored = createTermsEngine(small, engine.snapshot(), () => 0.5);
  assert.equal(restored.state.filter, "custom");
  assert.deepEqual(restored.state.order, [small.cards[2].id, small.cards[0].id]);
  assert.equal(restored.current().id, small.cards[0].id);
});

test("restart retains classifications and preferences; reset clears only this set's progress", () => {
  const engine = createTermsEngine(fixture);
  engine.classify("unknown");
  engine.classify("known");
  engine.setFront("definition");
  engine.start("unknown");
  engine.start();
  assert.equal(engine.state.filter, "unknown");
  assert.equal(engine.counts().known, 1);
  engine.reset();
  assert.equal(engine.state.filter, "all");
  assert.equal(engine.state.index, 0);
  assert.equal(engine.state.front, "definition");
  assert.equal(engine.counts().remaining, 27);
});

test("progress survives reload, set switching, and shared unit entry points", () => {
  const values = new Map([["page-one-attempts-v1", "unchanged"]]);
  const getStorage = () => ({
    getItem: (key) => values.get(key),
    setItem: (key, value) => values.set(key, value),
  });
  const store = createTermsStore({ getStorage });
  const engine = createTermsEngine(fixture);
  engine.classify("unknown");
  engine.setFront("definition");
  store.save(a.id, engine.snapshot());
  store.save(b.id, { revision: "b", classifications: { tatars: "known" } });
  const reloaded = createTermsEngine(
    fixture,
    createTermsStore({ getStorage }).load(a.id),
  );
  assert.equal(reloaded.current().id, "sunni");
  assert.equal(reloaded.state.front, "definition");
  assert.equal(reloaded.counts().unknown, 1);
  reloaded.reset();
  store.save(a.id, reloaded.snapshot());
  assert.equal(store.load(b.id).classifications.tatars, "known");
  assert.equal(values.get("page-one-attempts-v1"), "unchanged");
});

test("blocked storage and malformed or stale state fail safely", () => {
  const store = createTermsStore({
    getStorage: () => {
      throw new Error("blocked");
    },
  });
  assert.equal(store.load(a.id), null);
  store.save(a.id, { revision: "test" });
  assert.equal(store.available, false);
  assert.equal(store.load(a.id).revision, "test");
  const invalid = createTermsEngine(fixture, {
    revision: fixture.revision,
    index: -4,
    order: ["caliph", "caliph"],
    classifications: { missing: "known", caliph: "bad" },
  });
  assert.equal(invalid.counts().remaining, 27);
  assert.equal(invalid.state.index, 0);
  const stale = createTermsEngine(fixture, {
    revision: "old",
    classifications: { caliph: "known" },
  });
  assert.equal(stale.counts().known, 0);
});

test("one-card sets, empty filters, and boundaries remain usable", () => {
  const engine = createTermsEngine({ ...fixture, cards: [fixture.cards[0]] });
  engine.move(-1);
  assert.equal(engine.state.index, 0);
  engine.classify("known");
  assert.equal(engine.current(), null);
  engine.move(1);
  assert.equal(engine.state.index, 1);
  engine.start("unknown");
  assert.equal(engine.state.order.length, 0);
  engine.start("remaining");
  assert.equal(engine.state.order.length, 0);
  engine.reset();
  assert.equal(engine.current().id, "caliph");
});

test("all unit hubs put modes first and never make unavailable practice clickable", () => {
  for (let number = 1; number <= 9; number++) {
    const unit = data(`world/units/world-${number}.json`);
    const html = unitPage(unit);
    assert.ok(html.indexOf('aria-label="Unit study modes"') < html.indexOf('id="learn"'));
    for (const title of ["Practice Quiz", "Terms", "Writing Practice", "Reading / Learn"])
      assert.ok(html.includes(`<h2>${title}</h2>`));
    assert.ok(html.includes(`href="#/terms/world-${number}"`));
    if (number > 2) assert.ok(html.includes('aria-disabled="true"'));
    assert.equal(unit.unit.termSets.length, number <= 2 ? 2 : 0);
    if (number > 2) assert.ok(termsIndexPage(unit).includes("No class term sets yet"));
  }
});

test("Terms navigation loads metadata first and only the selected canonical set", async () => {
  const requests = [];
  const store = createContentStore({
    fetchJson: async (path) => {
      requests.push(path);
      return data(path);
    },
  });
  const index = await store.page("terms", "world-1");
  assert.equal(index.unit.termSets.length, 2);
  assert.deepEqual(requests, [
    "catalog.json",
    "world/routes.json",
    "world/units/world-1.json",
  ]);
  const selected = await store.page("term-set", a.id);
  assert.equal(selected.set.cards.length, 27);
  assert.equal(requests.at(-1), "world/terms/world-period-1-a.json");
  assert.equal(
    requests.some((path) => /banks|topics|period-1-b/.test(path)),
    false,
  );
  assert.deepEqual(
    selected.units.map((unit) => unit.id),
    ["world-1", "world-2"],
  );
  assert.equal(await store.page("term-set", "world-missing"), null);
});

test("term lists show all cards once and render unsafe text only as text", () => {
  const input = data("world/terms/world-period-1-a.json");
  const engine = createTermsEngine(input.set);
  const list = termSetPage({ ...input, unit: input.units[0] }, engine, { mode: "list" });
  assert.equal((list.match(/<dt>/g) || []).length, 27);
  assert.equal((list.match(/<dd>/g) || []).length, 27);
  const malicious = structuredClone(input);
  malicious.set.cards[0].term = '<script>alert("bad")</script>';
  const rendered = termSetPage({ ...malicious, unit: input.units[0] }, engine, {
    mode: "list",
  });
  assert.ok(!rendered.includes("<script>"));
  assert.ok(rendered.includes("&lt;script&gt;"));
});

test("private Terms notes stay separate, escape in views, and recover removed cards", async () => {
  const adapter = createLocalAdapter({
    indexedDB: null,
    getStorage: () => memoryStorage(),
    deploymentScope: "terms-notes",
  });
  await adapter.ready;
  const store = createTermsStore({ adapter });
  await store.ready;
  const set = { ...fixture, courseId: "world" };
  const saved = await store.saveNote(set, "caliph", '<script>alert("x")</script>');
  assert.equal(saved.ok, true);
  const notes = await store.loadNotes(set);
  assert.equal(notes.active.caliph.note, '<script>alert("x")</script>');

  const engine = createTermsEngine(set);
  const rendered = termSetPage(
    {
      course: { id: "world", shortTitle: "AP World" },
      unit: { id: "world-1", number: 1 },
      set,
    },
    engine,
    { mode: "list", notes },
  );
  assert.doesNotMatch(rendered, /<script>alert/);
  assert.match(rendered, /&lt;script&gt;alert/);
  assert.match(rendered, /Copy term and definition/);
  assert.match(rendered, /Copy with my note/);

  const revised = { ...set, revision: "new-revision", cards: set.cards.slice(1) };
  const unresolved = await store.loadNotes(revised);
  assert.equal(unresolved.unresolved.length, 1);
  assert.equal(unresolved.unresolved[0].priorTerm, "Caliph");
});

test("validation rejects duplicate required terms, card IDs, and blank definitions", () => {
  const duplicate = structuredClone(a);
  duplicate.cards.push({ ...a.cards[0], id: "duplicate" });
  assert.throws(() => validateTermSet(duplicate, "world", "test"), /duplicate term/);
  duplicate.cards.at(-1).term = "Different";
  duplicate.cards.at(-1).id = a.cards[0].id;
  assert.throws(() => validateTermSet(duplicate, "world", "test"), /duplicate ID/);
  const blank = structuredClone(a);
  blank.cards[0].definition = " ";
  assert.throws(() => validateTermSet(blank, "world", "test"), /nonempty text/);
});

import test from "node:test";
import assert from "node:assert/strict";
import {
  readFile,
  mkdtemp,
  mkdir,
  writeFile,
  copyFile,
  rm,
  access,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

import { parseRoute } from "../docs/app/router.js";
import { createContentStore } from "../docs/app/content-store.js";
import {
  checkResponse,
  gridInEntryProblem,
  sameScaleFamily,
  estimateLabel,
} from "../docs/app/test-prep/engine.js";
import {
  itemView,
  testPrepIndexPage,
  testPrepTestPage,
} from "../docs/app/test-prep/views.js";
import { check, respond, retry } from "../docs/app/test-prep/controller.js";
import {
  R,
  compileTestPrep,
  requiredGridInForms,
  validateItem,
  validateItemPatterns,
  validatePassages,
  validateTaxonomy,
} from "../scripts/lib/test-prep.mjs";
import { taxonomy } from "../docs/content/test-prep/taxonomy.js";

const root = new URL("../", import.meta.url);
const readGenerated = async (path) =>
  JSON.parse(await readFile(new URL(`docs/generated/${path}`, root), "utf8"));
const skills = validateTaxonomy(taxonomy, "taxonomy");
const noPassages = new Map();

// Fixtures exercise the schema only. They are trivial placeholders, not practice
// content, and never ship: authored items live in docs/content/test-prep/items/.
function choiceItem(overrides = {}) {
  return {
    schemaVersion: 1,
    id: "tp-fixture-choice",
    skillId: "math-linear-functions",
    difficulty: "easy",
    format: "single-select",
    stem: "Fixture: what is 3 + 4?",
    choices: [
      { id: "A", text: "6" },
      { id: "B", text: "7" },
      { id: "C", text: "8" },
      { id: "D", text: "12" },
    ],
    answer: "B",
    nearMiss: "C",
    explanation: "Adding 3 and 4 gives 7.",
    rationales: {
      A: "This undercounts by one.",
      C: "This overcounts by one.",
      D: "This multiplies instead of adding.",
    },
    verification: {
      kind: "value",
      compute: "3 + 4",
      choiceValues: { A: "6", B: "7", C: "8", D: "12" },
    },
    ...overrides,
  };
}

function gridItem(overrides = {}) {
  return {
    schemaVersion: 1,
    id: "tp-fixture-grid",
    skillId: "math-ratios-rates",
    difficulty: "medium",
    format: "grid-in",
    stem: "Fixture: what is 2 divided by 3?",
    acceptedAnswers: ["2/3", ".6666", ".6667", "0.666", "0.667"],
    explanation: "Two divided by three is 2/3.",
    verification: { kind: "value", compute: "R(2, 3)" },
    ...overrides,
  };
}

const validate = (item, passages = noPassages) =>
  validateItem(item, { skills, passages, location: "fixture" });

test("the generated index lists four tests with separate score scales", async () => {
  const index = await readGenerated("test-prep/index.json");
  assert.deepEqual(
    index.tests.map((item) => item.id),
    ["psat89", "psat10", "psatnmsqt", "sat"],
  );
  const scales = Object.fromEntries(index.tests.map((item) => [item.id, item.scale]));
  assert.deepEqual(scales.psat89.total, { min: 240, max: 1440 });
  assert.deepEqual(scales.psat89.section, { min: 120, max: 720 });
  assert.deepEqual(scales.psat10.total, { min: 320, max: 1520 });
  assert.deepEqual(scales.psatnmsqt.total, { min: 320, max: 1520 });
  assert.deepEqual(scales.sat.total, { min: 400, max: 1600 });
  const psat89 = index.tests.find((item) => item.id === "psat89");
  for (const other of index.tests.filter((item) => item.id !== "psat89"))
    assert.equal(sameScaleFamily(psat89, other), false, other.id);
  for (const item of index.tests) {
    assert.deepEqual(
      item.sections.map(({ id, questions, minutes, modules }) => [
        id,
        questions,
        minutes,
        modules,
      ]),
      [
        ["rw", 54, 64, 2],
        ["math", 44, 70, 2],
      ],
    );
    assert.ok(item.itemCount > 0, `${item.id} has practice items`);
    assert.ok(
      item.sections.every((section) => section.moduleReady),
      `${item.id} modules`,
    );
  }
  assert.match(index.notice, /not affiliated/);
  const manifest = await readGenerated("manifest.json");
  assert.deepEqual(
    manifest.filter((path) => path.startsWith("test-prep/banks/")),
    ["test-prep/banks/math.json", "test-prep/banks/rw.json"],
  );
});

test("skills follow each test's content: trig and circles are limited", async () => {
  const index = await readGenerated("test-prep/index.json");
  const skillIds = (testId) =>
    index.tests
      .find((item) => item.id === testId)
      .sections.flatMap((section) => section.domains)
      .flatMap((domain) => domain.skills.map((skill) => skill.id));
  const geometry = (testId) =>
    index.tests
      .find((item) => item.id === testId)
      .sections[1].domains.find((domain) => domain.id === "math-geometry-trig");
  assert.equal(geometry("psat89").title, "Geometry");
  assert.equal(geometry("sat").title, "Geometry and Trigonometry");
  assert.ok(!skillIds("psat89").includes("math-right-triangles-trig"));
  assert.ok(!skillIds("psat89").includes("math-circles"));
  for (const testId of ["psat10", "psatnmsqt"]) {
    assert.ok(skillIds(testId).includes("math-right-triangles-trig"));
    assert.ok(!skillIds(testId).includes("math-circles"));
  }
  assert.ok(skillIds("sat").includes("math-circles"));
  assert.equal(skillIds("sat").length, 23);
  // The hierarchy is test > section > domain > skill.
  const sat = index.tests.find((item) => item.id === "sat");
  assert.deepEqual(
    sat.sections.map((section) => section.domains.map((domain) => domain.title)),
    [
      [
        "Information and Ideas",
        "Craft and Structure",
        "Expression of Ideas",
        "Standard English Conventions",
      ],
      [
        "Algebra",
        "Advanced Math",
        "Problem-Solving and Data Analysis",
        "Geometry and Trigonometry",
      ],
    ],
  );
});

test("routes reach the selection page and each test page", async () => {
  assert.equal(parseRoute("#/test-prep").type, "test-prep");
  assert.equal(parseRoute("#/test-prep").id, undefined);
  assert.equal(parseRoute("#/test-prep/sat").id, "sat");
  assert.equal(parseRoute("#/test-prep/sat/extra").type, "missing");
  // Existing routes are unchanged.
  assert.equal(parseRoute("#/topic/world-1-1").type, "topic");
  assert.equal(parseRoute("#/courses/extra").type, "missing");

  const index = await readGenerated("test-prep/index.json");
  const files = {
    "catalog.json": await readGenerated("catalog.json"),
    "test-prep/index.json": index,
  };
  const store = createContentStore({ fetchJson: async (path) => files[path] });
  assert.equal((await store.page("test-prep")).testPrep.tests.length, 4);
  assert.equal((await store.page("test-prep", "psatnmsqt")).test.title, "PSAT/NMSQT");
  assert.equal(await store.page("test-prep", "act"), null);
});

test("the selection page shows four cards, the scale note, and no affiliation", async () => {
  const index = await readGenerated("test-prep/index.json");
  const html = testPrepIndexPage({ testPrep: index });
  for (const id of ["psat89", "psat10", "psatnmsqt", "sat"])
    assert.ok(html.includes(`href="#/test-prep/${id}"`), id);
  assert.equal(html.match(/class="tp-test-card"/g).length, 4);
  assert.match(html, /240–1440/);
  assert.match(html, /400–1600/);
  assert.match(html, /never shows a PSAT 8\/9 estimate as equal/);
  assert.match(html, /not affiliated with or endorsed by the College Board/);
  assert.match(html, /\d+ practice items/);

  const psat89 = testPrepTestPage({ testPrep: index, test: index.tests[0] });
  assert.match(psat89, /<h3>Geometry<\/h3>/);
  assert.doesNotMatch(psat89, /Circles|trigonometry/);
  const sat = testPrepTestPage({ testPrep: index, test: index.tests[3] });
  assert.match(sat, /Circles/);
  assert.match(
    sat,
    /Command of Evidence<\/a><span class="muted"> \(Textual, Quantitative\)/,
  );
  assert.match(
    sat,
    /href="#\/test-practice\/sat\?section=math&amp;mode=module"|href="#\/test-practice\/sat\?section=math&mode=module"/,
  );
});

test("grid-in entries follow the Bluebook entry rules", () => {
  for (const entry of ["7/2", "3.5", ".5", "-3.25", "-1/2", "12345", " 42 "])
    assert.equal(gridInEntryProblem(entry), null, entry);
  const cases = {
    "": /Enter an answer/,
    "3 1/2": /Mixed numbers/,
    123456: /up to 5 characters/,
    "-123456": /up to 6 characters/,
    "50%": /percent/,
    "1,000": /commas/,
    $5: /dollar/,
    "1/0": /denominator/,
    "2x": /digits/,
    "1.2.3": /digits/,
    "1 2": /spaces/,
  };
  for (const [entry, message] of Object.entries(cases))
    assert.match(gridInEntryProblem(entry), message, entry);
});

test("required grid-in forms include every exact and fill-the-space form", () => {
  const sorted = (value) => requiredGridInForms(value).sort();
  assert.deepEqual(sorted(R(2, 3)), ["0.666", "0.667", ".6666", ".6667", "2/3"].sort());
  assert.deepEqual(sorted(R(1, 2)), [".5", "0.5", "1/2"].sort());
  assert.deepEqual(sorted(7), ["7"]);
  assert.deepEqual(
    sorted(R(-2, 3)),
    ["-.6666", "-.6667", "-0.666", "-0.667", "-2/3"].sort(),
  );
  assert.deepEqual(sorted(R(1, 64)), [".0156", "0.015", "0.016", "1/64"].sort());
  assert.deepEqual(sorted(R(13, 7)), ["1.857", "13/7"].sort());
  assert.deepEqual(sorted(Math.sqrt(2)), ["1.414"]);
  assert.deepEqual(sorted(R(25, 4)), ["25/4", "6.25"].sort());
});

test("validation proves math keys and every grid-in form", () => {
  assert.doesNotThrow(() => validate(choiceItem()));
  assert.doesNotThrow(() => validate(gridItem()));
  // Unreduced fractions with the same value may be listed too.
  assert.doesNotThrow(() =>
    validate(gridItem({ acceptedAnswers: [...gridItem().acceptedAnswers, "4/6"] })),
  );
  assert.throws(
    () =>
      validate(
        choiceItem({
          answer: "C",
          nearMiss: "B",
          rationales: { A: "Too small.", B: "Off by one.", D: "Multiplies." },
        }),
      ),
    /does not match/,
  );
  assert.throws(
    () =>
      validate(
        choiceItem({
          verification: {
            kind: "value",
            compute: "3 + 4",
            choiceValues: { A: "6", B: "7", C: "14 / 2", D: "12" },
          },
        }),
      ),
    /two right answers/,
  );
  assert.throws(
    () => validate(gridItem({ acceptedAnswers: ["2/3", "0.667"] })),
    /acceptedAnswers is missing 0\.666/,
  );
  assert.throws(
    () =>
      validate(gridItem({ acceptedAnswers: [...gridItem().acceptedAnswers, "0.67"] })),
    /does not equal/,
  );
  assert.throws(() => validate(choiceItem({ verification: undefined })), /verification/);
  assert.throws(
    () =>
      validate(
        choiceItem({ verification: { kind: "value", compute: "process.exit()" } }),
      ),
    /unknown name process/,
  );
  // Expression keys are compared at sample points.
  const expression = {
    kind: "expression",
    variables: ["x"],
    compute: "2 * (x + 3)",
    choiceExpressions: { A: "2 * x + 3", B: "2 * x + 6", C: "x + 6", D: "2 * x + 5" },
  };
  assert.doesNotThrow(() =>
    validate(
      choiceItem({ skillId: "math-equivalent-expressions", verification: expression }),
    ),
  );
  assert.throws(
    () =>
      validate(
        choiceItem({
          skillId: "math-equivalent-expressions",
          verification: {
            ...expression,
            choiceExpressions: { ...expression.choiceExpressions, D: "6 + 2 * x" },
          },
        }),
      ),
    /equivalent to the key/,
  );
});

test("validation enforces item structure, sourcing, and test fit", () => {
  assert.throws(
    () =>
      validate(
        choiceItem({
          rationales: { ...choiceItem().rationales, A: "Too small. Off by one." },
        }),
      ),
    /one sentence/,
  );
  assert.throws(() => validate(choiceItem({ nearMiss: "B" })), /nearMiss/);
  assert.throws(
    () => validate(choiceItem({ rationales: { A: "One.", C: "Two." } })),
    /one entry for each distractor/,
  );
  assert.throws(
    () => validate(choiceItem({ skillId: "math-circles", tests: ["psat10"] })),
    /subset/,
  );
  assert.throws(
    () => validate(gridItem({ skillId: "rw-boundaries" })),
    /cannot be grid-in/,
  );
  const reading = {
    ...choiceItem({ verification: undefined }),
    skillId: "rw-central-ideas",
    originalText: "A short text written for practice.",
  };
  assert.throws(() => validate(reading), /public-domain passage/);
  assert.doesNotThrow(() => validate({ ...reading, skillId: "rw-transitions" }));
  assert.throws(
    () =>
      validate({
        ...reading,
        skillId: "rw-command-of-evidence",
        originalText: undefined,
        passageId: "tp-p-x",
      }),
    /variant/,
  );

  const passage = (year, basis = "us-pre-1931") => ({
    id: "tp-p-fixture",
    text: "Fixture passage text.",
    source: {
      author: "Fixture Author",
      title: "Fixture Title",
      publication: "Fixture Press",
      year,
      basis,
      url: "https://www.gutenberg.org/",
    },
  });
  assert.doesNotThrow(() => validatePassages([passage(1930)], "passages"));
  assert.throws(() => validatePassages([passage(1931)], "passages"), /public domain/);
  assert.doesNotThrow(() =>
    validatePassages([passage(2001, "us-government-work")], "passages"),
  );
  const passages = validatePassages([passage(1890)], "passages");
  const { originalText: _unused, ...withPassage } = reading;
  assert.doesNotThrow(() =>
    validate({ ...withPassage, passageId: "tp-p-fixture" }, passages),
  );
  assert.throws(
    () => validate({ ...withPassage, passageId: "tp-p-missing" }, passages),
    /unknown passage/,
  );
});

test("bank checks catch answer-position and answer-length habits", () => {
  const varied = (answer, index, longCorrect = false) => {
    const texts = { A: "ten", B: "eleven", C: "twelve", D: "nine" };
    if (longCorrect) texts[answer] = "seventeen";
    return {
      ...choiceItem(),
      id: `tp-fixture-${index}`,
      answer,
      choices: ["A", "B", "C", "D"].map((id) => ({ id, text: texts[id] })),
      explanation: `Explanation ${index}.`,
      rationales: Object.fromEntries(
        ["A", "B", "C", "D"]
          .filter((id) => id !== answer)
          .map((id) => [id, `Why ${id} misses ${index}.`]),
      ),
    };
  };
  const pattern = ["A", "C", "B", "D", "C", "A", "D", "B"];
  assert.doesNotThrow(() =>
    validateItemPatterns(
      pattern.map((answer, index) => varied(answer, index, index === 2)),
      "bank",
    ),
  );
  assert.throws(
    () =>
      validateItemPatterns(
        ["A", "A", "A", "A", "B", "C", "D", "B", "C", "D"].map((a, i) =>
          varied(a, i, i === 5),
        ),
        "bank",
      ),
    /in a row/,
  );
  assert.throws(
    () =>
      validateItemPatterns(
        ["A", "B", "A", "C", "A", "B", "A", "C"].map((a, i) => varied(a, i, i === 1)),
        "bank",
      ),
    /no item has D|A is the answer/,
  );
  assert.throws(
    () =>
      validateItemPatterns(
        pattern.map((answer, index) => varied(answer, index, true)),
        "bank",
      ),
    /longest/,
  );
});

test("responses are checked and the renderer shows feedback per distractor", () => {
  const choice = choiceItem({ skillTitle: "Linear functions" });
  const grid = gridItem({
    skillTitle: "Ratios, rates, proportional relationships, and units",
  });
  assert.equal(checkResponse(choice, "B").correct, true);
  assert.equal(checkResponse(choice, "C").correct, false);
  assert.equal(checkResponse(choice, "E").answered, false);
  assert.equal(checkResponse(grid, "0.667").correct, true);
  assert.equal(checkResponse(grid, " .6667 ").correct, true);
  assert.equal(checkResponse(grid, "0.67").correct, false);
  assert.match(checkResponse(grid, "0 2/3").problem, /Mixed numbers/);

  // State transitions used by the controller.
  const malformed = check(grid, respond("50%"));
  assert.equal(malformed.checked, false);
  assert.match(malformed.problem, /percent/);
  const right = check(grid, respond("2/3"));
  assert.deepEqual([right.checked, right.result.correct], [true, true]);
  assert.deepEqual(retry(), {
    response: "",
    checked: false,
    problem: null,
    result: null,
  });

  const blank = itemView(grid, retry());
  assert.match(blank, /<input id="tp-item-tp-fixture-grid-entry"/);
  assert.match(blank, /Mixed numbers are not accepted/);
  assert.match(blank, /type="submit" class="btn" disabled/);
  const invalid = itemView(grid, malformed);
  assert.match(invalid, /aria-invalid="true"/);
  assert.match(invalid, /role="alert"/);
  const answered = itemView(grid, check(grid, respond("0.67")));
  assert.match(answered, /✗ Incorrect/);
  assert.match(answered, /<code>\.6666<\/code>/);

  const picked = itemView(choice, check(choice, respond("C")));
  assert.equal(picked.match(/type="radio"/g).length, 4);
  assert.match(picked, /Correct answer:<\/strong> B\. 7/);
  assert.match(picked, /<strong>A\.<\/strong> This undercounts by one\./);
  assert.match(picked, /<strong>C\.<\/strong> This overcounts by one\./);
  assert.match(picked, /<strong>D\.<\/strong> This multiplies instead of adding\./);
  assert.doesNotMatch(picked, /<strong>B\.<\/strong>/);
  const escaped = itemView({ ...choice, stem: "<script>alert(1)</script>" }, retry());
  assert.doesNotMatch(escaped, /<script>/);
});

test("compiled banks strip verification and update counts", async () => {
  const temp = await mkdtemp(join(tmpdir(), "page-one-test-prep-"));
  try {
    const source = fileURLToPath(new URL("docs/content/test-prep/", root));
    const target = join(temp, "test-prep");
    await mkdir(join(target, "items"), { recursive: true });
    for (const file of ["tests.js", "taxonomy.js", "sources.js", "passages.js"])
      await copyFile(join(source, file), join(target, file));
    await writeFile(
      join(target, "items", "fixture.js"),
      `export const items = ${JSON.stringify([choiceItem(), gridItem()])};\n`,
    );
    const output = new Map();
    const readModule = async (path, name) =>
      structuredClone((await import(pathToFileURL(path)))[name]);
    const exists = async (path) => {
      try {
        await access(path);
        return true;
      } catch {
        return false;
      }
    };
    await compileTestPrep({
      contentRoot: temp,
      emit: (path, data) => output.set(path, data),
      readModule,
      optionalModule: async (path, name, fallback) =>
        (await exists(path)) ? readModule(path, name) : fallback,
      exists,
    });
    const bank = output.get("test-prep/banks/math.json");
    assert.equal(bank.items.length, 2);
    assert.ok(bank.items.every((item) => item.verification === undefined));
    assert.equal(bank.items[0].domainId, "math-algebra");
    assert.equal(output.has("test-prep/banks/rw.json"), false);
    const index = output.get("test-prep/index.json");
    const sat = index.tests.find((item) => item.id === "sat");
    assert.equal(sat.itemCount, 2);
    assert.equal(sat.sections[1].bankPath, "test-prep/banks/math.json");
    assert.equal(sat.sections[0].bankPath, "");
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test("score estimates are labeled and never cross scale families", async () => {
  const index = await readGenerated("test-prep/index.json");
  const [psat89, psat10, , sat] = index.tests;
  assert.equal(
    estimateLabel(psat89, 900),
    "Practice estimate: 900 on the PSAT 8/9 scale (240–1440)",
  );
  assert.equal(sameScaleFamily(psat89, sat), false);
  assert.equal(sameScaleFamily(psat10, index.tests[2]), true);
});

// ---------------------------------------------------------------------------
// Practice sessions

import {
  drawModule,
  scopeItems,
  scopeLabel,
  sectionEstimate,
  summarize,
  formatClock,
} from "../docs/app/test-prep/practice.js";
import { createTestPrepSession } from "../docs/app/test-prep/session.js";

function sessionFixtures(test) {
  // Enough placeholder items for one module in each domain of the blueprint.
  const items = [];
  for (const section of test.sections)
    for (const domain of section.domains) {
      const needed = section.moduleDomains[domain.id] + 1;
      for (let index = 0; index < needed; index += 1) {
        const skill = domain.skills[index % domain.skills.length];
        items.push({
          ...choiceItem(),
          id: `tp-fixture-${domain.id}-${index}`,
          skillId: skill.id,
          skillTitle: skill.title,
          domainId: domain.id,
          sectionId: section.id,
          tests: [test.id],
          difficulty: ["hard", "easy", "medium"][index % 3],
        });
      }
    }
  return items;
}

test("modules draw the blueprint's count from each domain", async () => {
  const index = await readGenerated("test-prep/index.json");
  for (const test of index.tests) {
    const items = sessionFixtures(test);
    for (const section of test.sections) {
      const ids = drawModule(items, test, section.id, () => 0.42);
      assert.equal(ids.length, section.moduleSize, `${test.id} ${section.id}`);
      assert.equal(section.moduleSize * section.modules, section.questions);
      const byDomain = Object.fromEntries(
        Object.keys(section.moduleDomains).map((id) => [
          id,
          ids.filter((itemId) => itemId.includes(`-${id}-`)).length,
        ]),
      );
      assert.deepEqual(byDomain, section.moduleDomains);
      if (section.id === "math") {
        const order = ids.map((id) =>
          ["easy", "medium", "hard"].indexOf(
            items.find((item) => item.id === id).difficulty,
          ),
        );
        assert.deepEqual(
          order,
          [...order].sort((a, b) => a - b),
          "math runs easy to hard",
        );
      }
    }
    // Not enough items: no module.
    assert.equal(drawModule(items.slice(0, 3), test, "rw"), null);
  }
});

test("scopes, summaries, estimates, and clocks", async () => {
  const index = await readGenerated("test-prep/index.json");
  const sat = index.tests.find((item) => item.id === "sat");
  const psat89 = index.tests.find((item) => item.id === "psat89");
  const items = sessionFixtures(sat);
  assert.ok(
    scopeItems(items, sat, { skill: "math-circles" }).every(
      (item) => item.skillId === "math-circles",
    ),
  );
  assert.equal(
    scopeItems(items, psat89).length,
    0,
    "items tagged for SAT stay out of PSAT 8/9",
  );
  assert.equal(scopeLabel(sat, { skill: "math-circles" }), "Circles");
  assert.equal(scopeLabel(psat89, { domain: "math-geometry-trig" }), "Geometry");
  assert.equal(scopeLabel(sat, { section: "rw" }), "Reading and Writing");

  const set = items.slice(0, 4);
  const summary = summarize(sat, set, { [set[0].id]: "B", [set[1].id]: "A" });
  assert.deepEqual([summary.correct, summary.answered, summary.total], [1, 2, 4]);
  assert.ok(summary.byDomain.every((row) => row.total > 0));

  assert.deepEqual(
    [sectionEstimate(sat, 27, 27).low, sectionEstimate(sat, 27, 27).high],
    [760, 800],
  );
  assert.deepEqual(
    [sectionEstimate(sat, 0, 27).low, sectionEstimate(sat, 0, 27).high],
    [200, 240],
  );
  const middle = sectionEstimate(psat89, 11, 22);
  assert.ok(middle.low >= 120 && middle.high <= 720 && middle.low < middle.high);
  assert.equal(middle.label, "Practice estimate");
  assert.equal(formatClock(35 * 60 * 1000), "35:00");
  assert.equal(formatClock(61_001), "1:02");
  assert.equal(formatClock(-5), "0:00");
});

test("practice and module sessions move through their phases", async () => {
  const index = await readGenerated("test-prep/index.json");
  const sat = index.tests.find((item) => item.id === "sat");
  const items = sessionFixtures(sat);
  const testPrep = index;
  let paints = 0;
  const practice = createTestPrepSession({
    testPrep,
    test: sat,
    items,
    params: new URLSearchParams("skill=math-linear-functions"),
    repaint: () => (paints += 1),
  });
  const total = scopeItems(items, sat, { skill: "math-linear-functions" }).length;
  assert.match(practice.page(), new RegExp(`Question 1 of ${total}`));
  assert.match(practice.page(), /Check answer/);
  practice.setResponse("B");
  practice.checkCurrent();
  assert.match(practice.page(), /✓ Correct/);
  for (let step = 1; step < total; step += 1) practice.act("next");
  practice.act("finish");
  assert.match(practice.page(), new RegExp(`1 of ${total} correct`));
  assert.match(practice.page(), /accuracy only/);
  assert.ok(paints > 0);

  const module = createTestPrepSession({
    testPrep,
    test: sat,
    items,
    params: new URLSearchParams("section=math&mode=module"),
    repaint: () => {},
  });
  assert.match(module.page(), /Start module/);
  assert.match(module.page(), /35 minutes/);
  module.act("start");
  assert.equal(module.debug().ids.length, 22);
  assert.match(module.page(), /Question 1 of 22/);
  assert.doesNotMatch(
    module.page(),
    /Check answer|✓ Correct/,
    "no feedback during a module",
  );
  module.setResponse("B");
  module.act("next");
  module.setResponse("A");
  module.act("review");
  assert.match(module.page(), /20 questions are unanswered/);
  module.act("submit");
  const results = module.page();
  assert.match(results, /1 of 22 correct/);
  assert.match(results, /Practice estimate/);
  assert.match(results, /SAT Math section scale, 200–800/);
  assert.match(results, /Not an official score/);
  assert.equal(results.match(/class="tp-review-item/g).length, 22);
});

// ---------------------------------------------------------------------------
// Authored content

async function authoredItems() {
  const [math, rw] = await Promise.all([
    readGenerated("test-prep/banks/math.json"),
    readGenerated("test-prep/banks/rw.json"),
  ]);
  return [...rw.items, ...math.items];
}

test("authored items fit their tests and never ship verification", async () => {
  const items = await authoredItems();
  const index = await readGenerated("test-prep/index.json");
  assert.ok(items.length >= 100);
  assert.ok(items.every((item) => item.verification === undefined));
  for (const item of items) {
    if (item.tests.includes("psat89"))
      assert.ok(
        !["math-right-triangles-trig", "math-circles"].includes(item.skillId),
        `${item.id} is not PSAT 8/9 content`,
      );
    if (item.skillId === "math-circles") assert.deepEqual(item.tests, ["sat"]);
    for (const passage of [item.passage, ...(item.passages || [])].filter(Boolean)) {
      assert.ok(passage.source.year <= 1930, `${passage.id} is public domain`);
      assert.match(passage.source.url, /^https:\/\/www\.gutenberg\.org\/ebooks\/\d+$/);
    }
    if (item.sectionId === "rw")
      assert.ok(
        item.passage || item.passages || item.originalText,
        `${item.id} has a text`,
      );
  }
  // Every skill on every test has at least one item.
  for (const test of index.tests)
    for (const section of test.sections)
      for (const domain of section.domains)
        for (const skill of domain.skills)
          assert.ok(skill.itemCount > 0, `${test.id} ${skill.id}`);
});

test("hidden wording never appears in another item's passage", async () => {
  const items = await authoredItems();
  const shown = (item) =>
    [item.passage?.text, ...(item.passages || []).map((passage) => passage.text)]
      .filter(Boolean)
      .join("\n");
  for (const item of items.filter((entry) => entry.blank)) {
    for (const other of items) {
      if (other.id === item.id) continue;
      assert.ok(
        // Whole words only: "possession" does not reveal a blank of "possess".
        !new RegExp(
          `(^|[^\\w])${item.blank.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^\\w])`,
        ).test(shown(other)) || other.passage?.id === item.passage?.id,
        `${other.id} reveals the answer to ${item.id}`,
      );
      if (other.passage?.id === item.passage?.id && other.id !== item.id)
        assert.fail(`${item.id} hides wording in a passage that ${other.id} also shows`);
    }
    const html = itemView(item, {});
    assert.match(html, /tp-blank/);
    const passageHtml = html.slice(
      html.indexOf("<blockquote>"),
      html.indexOf("</blockquote>"),
    );
    assert.ok(!passageHtml.includes(item.blank), `${item.id} hides its blank`);
  }
});

test("every authored item renders in practice, test, and review modes", async () => {
  const items = await authoredItems();
  for (const item of items) {
    for (const mode of ["practice", "test", "review"]) {
      const right = item.format === "grid-in" ? item.acceptedAnswers[0] : item.answer;
      const html = itemView(
        item,
        mode === "review" ? check(item, respond(right)) : respond(right),
        { mode, number: 1 },
      );
      assert.match(html, new RegExp(`data-tp-item="${item.id}"`));
      if (mode === "test") assert.doesNotMatch(html, /answer-feedback/);
      if (mode === "review") assert.match(html, /✓ Correct/);
    }
    // Every accepted answer passes the entry rules and checks as correct.
    for (const entry of item.acceptedAnswers || [])
      assert.equal(checkResponse(item, entry).correct, true, `${item.id} ${entry}`);
  }
});

test("a full module with real items scores every answer and reports an estimate", async () => {
  const index = await readGenerated("test-prep/index.json");
  const items = await authoredItems();
  for (const test of index.tests)
    for (const section of test.sections) {
      const ids = drawModule(items, test, section.id);
      assert.equal(ids.length, section.moduleSize, `${test.id} ${section.id}`);
      assert.equal(new Set(ids).size, ids.length, "no repeats in a module");
    }
  const psat89 = index.tests.find((item) => item.id === "psat89");
  const session = createTestPrepSession({
    testPrep: index,
    test: psat89,
    items,
    params: new URLSearchParams("section=math&mode=module"),
    repaint: () => {},
  });
  session.act("start");
  const { ids } = session.debug();
  for (const [position, id] of ids.entries()) {
    const item = items.find((entry) => entry.id === id);
    session.setResponse(
      item.format === "grid-in" ? item.acceptedAnswers.at(-1) : item.answer,
    );
    if (position < ids.length - 1) session.act("next");
  }
  session.act("review");
  assert.match(session.page(), /Every question has an answer/);
  session.act("submit");
  const results = session.page();
  assert.match(results, /22 of 22 correct/);
  assert.match(results, /680–720/);
  assert.match(results, /PSAT 8\/9 Math section scale, 120–720/);
  assert.doesNotMatch(results, /SAT Math section scale, 200/);
});

test("Reading and Writing modules group questions by domain and skill", async () => {
  const index = await readGenerated("test-prep/index.json");
  const items = await authoredItems();
  const sat = index.tests.find((item) => item.id === "sat");
  const section = sat.sections[0];
  const skills = section.domains.flatMap((domain) =>
    domain.skills.map((skill) => skill.id),
  );
  const ids = drawModule(items, sat, "rw", () => 0.3);
  const positions = ids.map((id) =>
    skills.indexOf(items.find((item) => item.id === id).skillId),
  );
  const domains = Object.keys(section.moduleDomains);
  const domainOf = (id) => domains.indexOf(items.find((item) => item.id === id).domainId);
  const order = ids.map(domainOf);
  assert.deepEqual(
    order,
    [...order].sort((a, b) => a - b),
  );
  for (let index = 1; index < ids.length; index += 1)
    if (order[index] === order[index - 1])
      assert.ok(positions[index] >= positions[index - 1], "skills stay grouped");
});

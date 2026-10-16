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
    assert.equal(item.itemCount, 0);
  }
  assert.match(index.notice, /not affiliated/);
  const manifest = await readGenerated("manifest.json");
  assert.equal(
    manifest.some((path) => path.startsWith("test-prep/banks/")),
    false,
    "no item banks until items are authored",
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
  assert.match(html, /Items in preparation/);

  const psat89 = testPrepTestPage({ testPrep: index, test: index.tests[0] });
  assert.match(psat89, /<h3>Geometry<\/h3>/);
  assert.doesNotMatch(psat89, /Circles|trigonometry/);
  const sat = testPrepTestPage({ testPrep: index, test: index.tests[3] });
  assert.match(sat, /Circles/);
  assert.match(sat, /Command of Evidence<span class="muted"> \(Textual, Quantitative\)/);
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

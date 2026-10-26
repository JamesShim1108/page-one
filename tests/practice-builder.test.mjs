import test from "node:test";
import assert from "node:assert/strict";

import { compilePractice, VARIANTS_PER_TEMPLATE } from "../scripts/lib/practice.mjs";
import { graphReadability } from "../scripts/lib/validate-graph.mjs";
import {
  ask,
  part,
  problem,
  reject,
  assertNear,
  assert as verify,
} from "../docs/content/practice-kit/index.js";

const lesson = {
  id: "fixture-1",
  courseId: "fixture",
  unitId: "fixture-unit",
  title: "Fixture topic",
  sections: [{ id: "s1" }, { id: "s2" }],
};
const skills = { items: new Map([["solve", {}]]), reasoning: new Map() };
const assets = new Map();
const location = "fixture";

// A template that adds two random whole numbers. `over` replaces any part of it.
function sum(n, tier, { unit = false, ...over } = {}) {
  return {
    id: `p${String(n).padStart(2, "0")}`,
    tier,
    unit,
    concept: "s1",
    skill: "solve",
    make(r) {
      const a = r.int(2, 40);
      const b = r.int(2, 40);
      return problem({
        stem: `Add ${a} and ${b}.`,
        parts: [part("Find the sum.", ask.number("Sum:", a + b))],
        solution: [`${a} + ${b} = ${a + b}.`],
        data: { a, b },
      });
    },
    verify({ data: { a, b } }) {
      assertNear(a + b, b + a, "sum");
    },
    ...over,
  };
}

// 4 quick checks (p01 to p04), 6 topic-quiz questions (p05 to p10), 3 reserved for the unit.
function templates(over = {}) {
  const list = [];
  for (let n = 1; n <= 10; n += 1)
    list.push(sum(n, n <= 4 ? "quick" : "quiz", { unit: [2, 7, 9].includes(n) }));
  return list.map((template) =>
    over[template.id] ? { ...template, ...over[template.id] } : template,
  );
}

const compile = (problems) =>
  compilePractice({ lesson, unit: {}, problems, skills, assets, location });

test("a topic compiles to four quick checks, six quiz questions, and three unit questions", () => {
  const { questions, quizzes, unitQuestionIds } = compile(templates());
  assert.equal(questions.length, 10);
  assert.deepEqual(
    quizzes.map((quiz) => [quiz.id, quiz.quizType, quiz.questionIds.length]),
    [
      ["fixture-1-quick", "quick", 4],
      ["fixture-1-quiz", "topic", 6],
    ],
  );
  assert.equal(quizzes[1].customPractice, true);
  assert.deepEqual(unitQuestionIds, ["fixture-1-p02", "fixture-1-p07", "fixture-1-p09"]);
  for (const question of questions) {
    assert.equal(question.format, "free");
    assert.equal(question.topicId, "fixture-1");
    assert.equal(question.variants.length, VARIANTS_PER_TEMPLATE);
    assert.ok(!("unitPractice" in question));
  }
  assert.equal(questions[0].difficulty, "Quick check");
  assert.equal(questions[9].difficulty, "Core");
});

test("variants are reproducible: the same templates always give the same numbers", () => {
  const first = compile(templates());
  const second = compile(templates());
  assert.deepEqual(first, second);
  const stems = new Set(first.questions[0].variants.map((variant) => variant.stem));
  assert.ok(stems.size >= 6, "different attempts see different numbers");
});

test("variant data is stripped and every key is published with its answer boxes", () => {
  const { questions } = compile(templates());
  const variant = questions[0].variants[0];
  assert.ok(!("data" in variant));
  assert.equal(variant.parts[0].id, "a");
  assert.equal(variant.parts[0].fields[0].id, "a1");
  assert.equal(variant.parts[0].fields[0].type, "number");
  assert.ok(Number.isFinite(Number(variant.parts[0].fields[0].key)));
});

test("reject() skips a bad seed instead of failing the build", () => {
  const picky = sum(1, "quick", {
    make(r) {
      const a = r.int(2, 40);
      if (a % 2) reject("odd");
      return problem({
        stem: `Add ${a} and 1.`,
        parts: [part("Find the sum.", ask.number("Sum:", a + 1))],
        solution: [`${a} + 1 = ${a + 1}.`],
        data: { a },
      });
    },
    verify() {},
  });
  const { questions } = compile([picky, ...templates().slice(1)]);
  assert.ok(
    questions[0].variants.every(
      (variant) => Number(/\d+/.exec(variant.stem)[0]) % 2 === 0,
    ),
  );
});

test("a template that rejects everything fails with a clear message", () => {
  const never = sum(1, "quick", { make: () => reject("always") });
  assert.throws(
    () => compile([never, ...templates().slice(1)]),
    /only 0 different variants.*need at least 6/,
  );
});

test("a failing verify() is a build error that names the seed and shows the variant", () => {
  const wrong = sum(3, "quick", {
    verify() {
      verify(false, "the key is wrong");
    },
  });
  const list = templates();
  list[2] = wrong;
  assert.throws(() => compile(list), /seed 0: .*the key is wrong[\s\S]*variant:/);
});

test("the structure of a topic is enforced", () => {
  const list = templates();
  assert.throws(() => compile(list.slice(1)), /needs 4 quick-check templates, has 3/);
  assert.throws(
    () => compile(list.map((t, i) => (i === 9 ? { ...t, tier: "quick" } : t))),
    /needs 4 quick-check templates, has 5/,
  );
  assert.throws(
    () => compile(list.map((t) => ({ ...t, unit: false }))),
    /needs 3 unit-practice templates, has 0/,
  );
  assert.throws(
    () =>
      compile(
        list.map((t) =>
          ["p05", "p06", "p07"].includes(t.id)
            ? { ...t, unit: true }
            : { ...t, unit: false },
        ),
      ),
    /at most 2 unit-practice templates/,
  );
});

test("templates must name a real lesson section, skill, tier, and id", () => {
  const swap = (change) => templates({ p03: change });
  assert.throws(() => compile(swap({ concept: "nowhere" })), /unknown concept nowhere/);
  assert.throws(() => compile(swap({ skill: "guess" })), /unknown skill guess/);
  assert.throws(() => compile(swap({ tier: "hard" })), /tier is quick or quiz/);
  assert.throws(() => compile(swap({ id: "q03" })), /bad template id q03/);
  assert.throws(() => compile(swap({ id: "p04" })), /duplicate template id/);
  assert.throws(() => compile(swap({ verify: undefined })), /needs verify/);
});

// Each of these is text a student should never see.
const BAD = [
  ["an em dash", "Add 2 — then 3."],
  ["a hyphen where a minus sign belongs", "Evaluate f(-3)."],
  ["a doubled sign", "Evaluate 2 + −3."],
  ["a leaked JavaScript value", "Evaluate NaN."],
  ["an unsimplified term", "Find the zeros of 1x + 2."],
  ["a plural noun after the number 1", "The segment is 1 units long."],
  ["a plural noun after the number 1", "It takes 1 hours."],
  ["repeated spaces", "Add  2 and 3."],
  ["a space inside parentheses", "Evaluate f( 2)."],
];

test("student-facing text is checked for typing slips", () => {
  for (const [message, stem] of BAD) {
    const list = templates({
      p03: {
        make(r) {
          const a = r.int(2, 40);
          return problem({
            stem,
            parts: [part("Find the sum.", ask.number("Sum:", a))],
            solution: [`The answer is ${a}.`],
            data: { a },
          });
        },
        verify() {},
      },
    });
    assert.throws(() => compile(list), new RegExp(message), stem);
  }
});

test("text that is fine is not flagged", () => {
  const fine = [
    "Evaluate f(−3) when x = 0.1 units.",
    "It is 2 hours and 11 units long.",
    "The segment is 1 unit long.",
    "Compare 21 units with 1.5 units.",
  ];
  for (const stem of fine) {
    const list = templates({
      p03: {
        make(r) {
          const a = r.int(2, 40);
          return problem({
            stem: `${stem} Use ${a}.`,
            parts: [part("Find the sum.", ask.number("Sum:", a))],
            solution: ["Done."],
            data: {},
          });
        },
        verify() {},
      },
    });
    assert.doesNotThrow(() => compile(list), stem);
  }
});

test("graph captions and descriptions are checked too", () => {
  const withAlt = (alt) =>
    templates({
      p03: {
        make: (r) =>
          problem({
            stem: `Read the graph and use x = ${r.int(2, 40)}.`,
            blocks: [
              {
                type: "graph",
                interactive: false,
                caption: "The graph of a line",
                alt,
                window: { x: [-5, 5], y: [-5, 5] },
                ticks: { x: 1, y: 1 },
                functions: [{ expr: "x", domain: [-5, 5] }],
              },
            ],
            parts: [part("Find y when x is 1.", ask.number("y =", 1))],
            solution: ["y = 1."],
            data: {},
          }),
        verify() {},
      },
    });
  assert.doesNotThrow(() =>
    compile(withAlt("A line through the origin with an open circle at x = 2.")),
  );
  assert.throws(
    () => compile(withAlt("A line with an open circle at x = -3.")),
    /graph alt.*hyphen/,
  );
});

test("choice fields need different options that include the key", () => {
  const choice = (options, key) =>
    templates({
      p03: {
        make: (r) =>
          problem({
            stem: `Pick one of the options for ${r.int(2, 40)}.`,
            parts: [part("Which is right?", ask.choice("Choice:", options, key))],
            solution: ["It is b."],
            data: {},
          }),
        verify() {},
      },
    });
  assert.doesNotThrow(() => compile(choice(["a", "b", "c"], "b")));
  assert.throws(() => compile(choice(["a", "a", "b"], "b")), /different options/);
  assert.throws(() => compile(choice(["a", "c"], "b")), /different options/);
});

test("a key the grader cannot read is a build error, not a broken question", () => {
  const unreadable = templates({
    p03: {
      make: () =>
        problem({
          stem: "Find the value.",
          parts: [part("Find x.", ask.number("x =", "not a number"))],
          solution: ["x is not a number."],
          data: {},
        }),
      verify() {},
    },
  });
  assert.throws(() => compile(unreadable));
});

test("every field of a multi-part question needs a label or a part prompt", () => {
  const unlabeled = templates({
    p03: {
      make: () =>
        problem({
          stem: "Find both values.",
          parts: [part("", ask.number("", 1), ask.number("", 2))],
          solution: ["1 and 2."],
          data: {},
        }),
      verify() {},
    },
  });
  assert.throws(() => compile(unlabeled), /needs a label or part prompt/);
});

const readable = (block) =>
  graphReadability({
    window: { x: [-8, 8], y: [-10, 10] },
    ticks: { x: 1, y: 1 },
    ...block,
  });

test("graphReadability flags curves that hide almost all of themselves", () => {
  assert.equal(readable({ functions: [{ expr: "x" }] }), null);
  assert.equal(readable({ functions: [{ expr: "x^2", domain: [-3, 3] }] }), null);
  assert.match(readable({ functions: [{ expr: "x + 40" }] }), /shows only 0%/);
  // A curve that only brushes the window next to its asymptote is hidden too.
  assert.match(
    readable({
      functions: [{ expr: "10 + 1/x" }],
      asymptotes: [{ x: 0 }],
      window: { x: [-8, 8], y: [-2, 2] },
    }),
    /10 \+ 1\/x/,
  );
  assert.equal(
    readable({
      functions: [{ expr: "1/x" }],
      asymptotes: [{ x: 0 }],
      window: { x: [-8, 8], y: [-4, 4] },
    }),
    null,
  );
  // Pieces narrower than the minimum width are not judged.
  assert.equal(
    readable({
      functions: [{ expr: "x + 40", domain: [0, 1] }],
    }),
    null,
  );
  assert.equal(readable({}), null);
});

test("generate() skips a variant whose graph cannot be read instead of publishing it", () => {
  const graphOf = (offset) => ({
    type: "graph",
    interactive: false,
    caption: "The graph of a line",
    alt: "A line that may be off the page.",
    window: { x: [-5, 5], y: [-5, 5] },
    ticks: { x: 1, y: 1 },
    functions: [{ expr: `x + ${offset}` }],
  });
  const picky = sum(1, "quick", {
    make(r) {
      const a = r.int(2, 40);
      const offset = r.pick([0, 0, 0, 30]);
      return problem({
        stem: `Read the graph and use ${a}.`,
        blocks: [graphOf(offset)],
        parts: [part("Find the sum.", ask.number("Sum:", a))],
        solution: ["Done."],
        data: { offset },
      });
    },
    verify() {},
  });
  const { questions } = compile([picky, ...templates().slice(1)]);
  assert.ok(
    questions[0].variants.every(
      (variant) => variant.stimulusBlocks[0].functions[0].expr === "x + 0",
    ),
    "no variant draws the line 30 units above the window",
  );
});

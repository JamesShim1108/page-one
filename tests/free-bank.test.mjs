import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { gradeField, answerText } from "../docs/app/practice/answers.js";

const banks = new URL("../docs/generated/precalculus/banks/", import.meta.url);
const files = fs.readdirSync(banks).filter((name) => name.endsWith(".json"));
const questions = files.flatMap(
  (name) => JSON.parse(fs.readFileSync(new URL(name, banks), "utf8")).questions,
);
const variants = questions.flatMap((question) =>
  question.variants.map((variant, index) => ({ question, variant, index })),
);

test("the bank covers all 44 topics of Units 1 to 3 with 10 typed templates each", () => {
  assert.equal(files.length, 44);
  assert.equal(questions.length, 440);
  assert.ok(questions.every((question) => question.format === "free"));
  assert.ok(variants.length >= 440 * 6);
});

test("every published key is accepted by the grader exactly as a student would type it", () => {
  for (const { question, variant, index } of variants) {
    for (const part of variant.parts) {
      for (const field of part.fields) {
        const typed = field.type === "choice" ? field.key : answerText(field);
        assert.equal(
          gradeField(field, typed).status,
          "correct",
          `${question.id} variant ${index} field ${field.id}: ${typed}`,
        );
      }
    }
  }
});

test("a blank box is never marked right or wrong, and a wrong choice is wrong", () => {
  for (const { question, variant } of variants.filter((_, i) => i % 7 === 0)) {
    for (const part of variant.parts) {
      for (const field of part.fields) {
        assert.equal(gradeField(field, "").status, "empty", question.id);
        if (field.type === "choice") {
          for (const option of field.options.filter((o) => o !== field.key))
            assert.equal(gradeField(field, option).status, "wrong", question.id);
        }
      }
    }
  }
});

// Text a student reads must not contain typing slips.
const SLIPS = [
  [/—/, "an em dash"],
  [/(^|[\s(=,×·/])-\d/, "a hyphen where a minus sign belongs"],
  [/\+ −|− −|\+ \+|− \+/, "a doubled sign"],
  [
    /\bNaN\b|\[object|\bnull\b|Infinity|\bundefined[x²)]|[(\d]undefined\b/,
    "a leaked JavaScript value",
  ],
  [
    /(^|[^\d.,/])[−-]?1 (units|meters|feet|seconds|minutes|hours|days|years|radians|degrees)\b/,
    "a plural after 1",
  ],
  [/\s{2,}/, "repeated spaces"],
];

test("stems, prompts, labels, and worked solutions are free of typing slips", () => {
  for (const { question, variant, index } of variants) {
    const texts = [
      variant.stem,
      ...variant.solution,
      ...variant.parts.flatMap((part) => [
        part.prompt,
        ...part.fields.flatMap((field) => [field.label, ...(field.options || [])]),
      ]),
      ...(variant.stimulusBlocks || []).flatMap((block) => [block.caption, block.alt]),
    ].filter((value) => typeof value === "string");
    for (const text of texts)
      for (const [pattern, name] of SLIPS)
        assert.ok(
          !pattern.test(text),
          `${question.id} variant ${index} has ${name}: "${text}"`,
        );
  }
});

test("every typed question has a different set of numbers for different attempts", () => {
  for (const question of questions) {
    const seen = new Set(question.variants.map((variant) => JSON.stringify(variant)));
    assert.ok(seen.size >= 6, `${question.id} has ${seen.size} distinct variants`);
    const stemsAndKeys = new Set(
      question.variants.map((variant) =>
        JSON.stringify([
          variant.stem,
          variant.stimulusBlocks,
          variant.parts.map((part) => [
            part.prompt,
            part.fields.map((field) => field.key),
          ]),
        ]),
      ),
    );
    assert.ok(
      stemsAndKeys.size >= 6,
      `${question.id} variants differ in more than layout`,
    );
  }
});

test("choice boxes list different options and always include the key", () => {
  for (const { question, variant } of variants) {
    for (const part of variant.parts)
      for (const field of part.fields.filter((entry) => entry.type === "choice")) {
        assert.equal(new Set(field.options).size, field.options.length, question.id);
        assert.ok(field.options.length >= 2, question.id);
        assert.ok(field.options.includes(field.key), `${question.id}: ${field.key}`);
      }
  }
});

test("every part of every variant has a prompt or a labeled box, and every part is worked", () => {
  for (const { question, variant, index } of variants) {
    const boxes = variant.parts.reduce((sum, part) => sum + part.fields.length, 0);
    for (const part of variant.parts)
      for (const field of part.fields)
        assert.ok(
          boxes === 1 || field.label || part.prompt,
          `${question.id} variant ${index}: box ${field.id} has nothing to say what to enter`,
        );
    assert.ok(variant.solution.length >= 1, question.id);
    assert.ok(
      variant.solution.every((step) => step.trim().length > 8),
      `${question.id} variant ${index} has a real solution`,
    );
  }
});

test("every graph in the bank carries a description and a caption for people who cannot see it", () => {
  let graphs = 0;
  for (const { question, variant, index } of variants) {
    for (const block of variant.stimulusBlocks || []) {
      if (block.type !== "graph") continue;
      graphs += 1;
      assert.ok(
        block.alt && block.alt.length > 20,
        `${question.id} variant ${index} alt`,
      );
      assert.ok(
        block.caption && block.caption.length > 5,
        `${question.id} variant ${index} caption`,
      );
    }
  }
  assert.ok(graphs > 100, `graph questions exist (${graphs})`);
});

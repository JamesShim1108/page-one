// Shared skill taxonomy: section > domain > skill. Math skills follow the
// official list and order for each domain. Items name one skill ID; the
// build derives their section and domain from here, so the hierarchy cannot drift.
//
// `tests` on a skill lists where that skill is tested. Right triangle
// trigonometry is not on the PSAT 8/9, and circles appear only on the SAT.
// `titleByTest` renames a domain for one test: the PSAT 8/9 calls it "Geometry".

const allTests = ["psat89", "psat10", "psatnmsqt", "sat"];

export const taxonomy = {
  schemaVersion: 1,
  sections: [
    {
      id: "rw",
      title: "Reading and Writing",
      formats: ["single-select"],
      // Order of question groups in a module, as on the digital test.
      moduleOrder: [
        "rw-words-in-context",
        "rw-text-structure",
        "rw-cross-text",
        "rw-central-ideas",
        "rw-command-of-evidence",
        "rw-inferences",
        "rw-form-structure-sense",
        "rw-boundaries",
        "rw-transitions",
        "rw-rhetorical-synthesis",
      ],
      domains: [
        {
          id: "rw-information-ideas",
          title: "Information and Ideas",
          skills: [
            {
              id: "rw-central-ideas",
              title: "Central Ideas and Details",
              tests: allTests,
            },
            {
              id: "rw-command-of-evidence",
              title: "Command of Evidence",
              tests: allTests,
              variants: [
                { id: "textual", title: "Textual" },
                { id: "quantitative", title: "Quantitative" },
              ],
            },
            { id: "rw-inferences", title: "Inferences", tests: allTests },
          ],
        },
        {
          id: "rw-craft-structure",
          title: "Craft and Structure",
          skills: [
            { id: "rw-words-in-context", title: "Words in Context", tests: allTests },
            {
              id: "rw-text-structure",
              title: "Text Structure and Purpose",
              tests: allTests,
            },
            {
              id: "rw-cross-text",
              title: "Cross-Text Connections",
              tests: allTests,
            },
          ],
        },
        {
          id: "rw-expression-ideas",
          title: "Expression of Ideas",
          skills: [
            {
              id: "rw-rhetorical-synthesis",
              title: "Rhetorical Synthesis",
              tests: allTests,
            },
            { id: "rw-transitions", title: "Transitions", tests: allTests },
          ],
        },
        {
          id: "rw-conventions",
          title: "Standard English Conventions",
          skills: [
            { id: "rw-boundaries", title: "Boundaries", tests: allTests },
            {
              id: "rw-form-structure-sense",
              title: "Form, Structure, and Sense",
              tests: allTests,
            },
          ],
        },
      ],
    },
    {
      id: "math",
      title: "Math",
      formats: ["single-select", "grid-in"],
      domains: [
        {
          id: "math-algebra",
          title: "Algebra",
          skills: [
            {
              id: "math-linear-equations-one",
              title: "Linear equations in one variable",
              tests: allTests,
            },
            {
              id: "math-linear-equations-two",
              title: "Linear equations in two variables",
              tests: allTests,
            },
            { id: "math-linear-functions", title: "Linear functions", tests: allTests },
            {
              id: "math-linear-systems",
              title: "Systems of two linear equations in two variables",
              tests: allTests,
            },
            {
              id: "math-linear-inequalities",
              title: "Linear inequalities in one or two variables",
              tests: allTests,
            },
          ],
        },
        {
          id: "math-advanced",
          title: "Advanced Math",
          skills: [
            {
              id: "math-equivalent-expressions",
              title: "Equivalent expressions",
              tests: allTests,
            },
            {
              id: "math-nonlinear-equations",
              title:
                "Nonlinear equations in one variable and systems of equations in two variables",
              tests: allTests,
            },
            {
              id: "math-nonlinear-functions",
              title: "Nonlinear functions",
              tests: allTests,
            },
          ],
        },
        {
          id: "math-data-analysis",
          title: "Problem-Solving and Data Analysis",
          skills: [
            {
              id: "math-ratios-rates",
              title: "Ratios, rates, proportional relationships, and units",
              tests: allTests,
            },
            { id: "math-percentages", title: "Percentages", tests: allTests },
            {
              id: "math-one-variable-data",
              title: "One-variable data: distributions and measures of center and spread",
              tests: allTests,
            },
            {
              id: "math-two-variable-data",
              title: "Two-variable data: models and scatterplots",
              tests: allTests,
            },
            {
              id: "math-probability",
              title: "Probability and conditional probability",
              tests: allTests,
            },
            // Margin of error is SAT only; items about it list tests: ["sat"].
            {
              id: "math-inference",
              title: "Inference from sample statistics and margin of error",
              tests: ["psat10", "psatnmsqt", "sat"],
            },
            {
              id: "math-statistical-claims",
              title:
                "Evaluating statistical claims: observational studies and experiments",
              tests: ["sat"],
            },
          ],
        },
        {
          id: "math-geometry-trig",
          title: "Geometry and Trigonometry",
          titleByTest: { psat89: "Geometry" },
          skills: [
            { id: "math-area-volume", title: "Area and volume", tests: allTests },
            {
              id: "math-lines-angles-triangles",
              title: "Lines, angles, and triangles",
              tests: allTests,
            },
            {
              id: "math-right-triangles-trig",
              title: "Right triangles and trigonometry",
              tests: ["psat10", "psatnmsqt", "sat"],
            },
            { id: "math-circles", title: "Circles", tests: ["sat"] },
          ],
        },
      ],
    },
  ],
};

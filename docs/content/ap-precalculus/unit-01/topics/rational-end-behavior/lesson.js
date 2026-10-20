// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-7",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 7,
  code: "1.7",
  title: "Rational Functions and End Behavior",
  period: "Unit 1",
  status: "ready",
  summary:
    "Rational functions as quotients of polynomials, and how the quotient of the leading terms gives the end behavior, horizontal asymptotes, and slant asymptotes.",
  minutes: 12,
  learningGoals: ["1.7.A Describe end behaviors of rational functions."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "For input values of large magnitude, each polynomial is dominated by its leading term, so a rational function behaves like the quotient of the leading terms of its numerator and denominator.",
  context:
    "Topic 1.6 found the end behavior of a polynomial from one leading term. A rational function has two polynomials, and its end behavior depends on which one dominates, or whether neither does.",
  sections: [
    {
      id: "rational-quotient",
      title: "1.7.A · A rational function is a quotient of two polynomial functions.",
      conceptTitle: "Rational functions",
      blocks: [
        {
          type: "paragraph",
          text: "A rational function is analytically represented as a quotient of two polynomial functions, r(x) = p(x)/q(x). For each value in its domain, it measures the size of the polynomial in the numerator relative to the polynomial in the denominator. The domain excludes every real zero of q.",
        },
        {
          type: "table",
          caption: "Degrees of the numerator and denominator",
          columns: ["Rational function", "Degree of numerator", "Degree of denominator"],
          rows: [
            ["(3x² + 1)/(x² − 5)", "2", "2"],
            ["(2x³ − x)/(x² + 1)", "3", "2"],
            ["(4x − 1)/(x² + 3)", "1", "2"],
          ],
        },
      ],
      takeaway: "A rational function is p(x)/q(x), undefined wherever q(x) = 0.",
    },
    {
      id: "compare-degrees",
      title: "1.7.A · The end behavior comes from the quotient of the leading terms.",
      conceptTitle: "Comparing leading terms",
      blocks: [
        {
          type: "paragraph",
          text: "The end behavior of a rational function is affected most by the polynomial with the greater degree, because its values dominate for input values of large magnitude. Since each polynomial is dominated by its leading term, the end behavior can be understood by examining the quotient of the leading terms.",
        },
        {
          type: "table",
          caption: "Three cases for r(x) = p(x)/q(x)",
          columns: [
            "Which polynomial dominates",
            "Quotient of the leading terms",
            "End behavior of r",
          ],
          rows: [
            [
              "The denominator (degree of q is greater)",
              "A constant over a nonconstant polynomial",
              "Horizontal asymptote y = 0",
            ],
            [
              "Neither (equal degrees)",
              "A constant",
              "Horizontal asymptote at that constant",
            ],
            [
              "The numerator (degree of p is greater)",
              "A nonconstant polynomial",
              "The end behavior of that polynomial; a slant asymptote if it is linear",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "For r(x) = (4x − 1)/(x² + 3), the quotient of the leading terms is 4x/x² = 4/x, so lim x→±∞ r(x) = 0. For r(x) = (3x² + 1)/(x² − 5), the quotient is 3x²/x² = 3, so the horizontal asymptote is y = 3.",
        },
      ],
      takeaway: "Divide the leading terms. The result tells you which case you are in.",
    },
    {
      id: "horizontal-asymptotes",
      title:
        "1.7.A · A horizontal asymptote y = b means the output values get and stay arbitrarily close to b.",
      conceptTitle: "Horizontal asymptotes",
      blocks: [
        {
          type: "paragraph",
          text: "When the graph of a rational function r has a horizontal asymptote at y = b, the output values get arbitrarily close to b and stay arbitrarily close to b as the input values increase or decrease without bound. The corresponding notation is lim x→∞ r(x) = b or lim x→−∞ r(x) = b.",
        },
        {
          type: "table",
          caption: "Values of r(x) = (3x² + 1)/(x² − 5)",
          columns: ["x", "r(x)"],
          rows: [
            ["10", "3.16842"],
            ["100", "3.00160"],
            ["1000", "3.00002"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Because the degrees of the numerator and denominator are equal, the quotient of the leading terms is 3x²/x² = 3. Therefore lim x→∞ r(x) = 3 and lim x→−∞ r(x) = 3, and the graph of r has a horizontal asymptote at y = 3.",
        },
        {
          type: "paragraph",
          text: "An asymptote describes the ends of the graph only. The graph of r(x) = x/(x² + 1) has the horizontal asymptote y = 0, yet r(0) = 0, so the graph meets that line at the origin.",
        },
      ],
      takeaway:
        "State a horizontal asymptote with limit notation for both directions when both apply.",
    },
    {
      id: "slant-asymptotes",
      title:
        "1.7.A · When the quotient of the leading terms is linear, the graph has a slant asymptote.",
      conceptTitle: "Slant asymptotes",
      blocks: [
        {
          type: "paragraph",
          text: "If the numerator dominates, the quotient of the leading terms is a nonconstant polynomial, and the rational function has the end behavior of that polynomial. If that polynomial is linear, the graph of the rational function has a slant asymptote parallel to the graph of that line.",
        },
        {
          type: "table",
          caption: "Comparing r(x) = (2x³ − x)/(x² + 1) with y = 2x",
          columns: ["x", "r(x)", "2x"],
          rows: [
            ["10", "19.703", "20"],
            ["100", "199.970", "200"],
            ["1000", "1999.997", "2000"],
          ],
        },
        {
          type: "paragraph",
          text: "Here the quotient of the leading terms is 2x³/x² = 2x, and the graph approaches the slant asymptote y = 2x. For (x² + 3x + 5)/(x − 1), the quotient of the leading terms is x, so the slant asymptote is parallel to y = x. Polynomial long division in Topic 1.11 gives its exact equation, y = x + 4.",
        },
        {
          type: "graph",
          caption:
            "Graph of r(x) = (2x³ − x)/(x² + 1) approaching its slant asymptote y = 2x",
          alt: "A curve that follows the dashed line y = 2x for large positive and negative x and wiggles slightly near the origin.",
          window: {
            x: [-5, 5],
            y: [-10, 10],
          },
          ticks: {
            x: 1,
            y: 2,
          },
          functions: [
            {
              expr: "(2x^3 - x)/(x^2 + 1)",
              label: "r",
              labelAt: 3.8,
              labelPosition: "se",
            },
          ],
          asymptotes: [
            {
              slope: 2,
              intercept: 0,
            },
          ],
        },
      ],
      takeaway:
        "A linear quotient of the leading terms gives the slope of the slant asymptote. Long division gives the exact line.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-7-rational-function",
      topicId: "precalculus-1-7",
      term: "Rational function",
      definition:
        "A function analytically represented as a quotient of two polynomial functions, p(x)/q(x).",
    },
    {
      id: "precalculus-1-7-horizontal-asymptote",
      topicId: "precalculus-1-7",
      term: "Horizontal asymptote",
      definition:
        "A line y = b such that the output values get arbitrarily close to b and stay arbitrarily close to b as the input values increase or decrease without bound.",
    },
    {
      id: "precalculus-1-7-slant-asymptote",
      topicId: "precalculus-1-7",
      term: "Slant asymptote",
      definition:
        "A non-horizontal line that the graph of a rational function approaches as the input values increase or decrease without bound.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-7-c1",
      topicId: "precalculus-1-7",
      type: "Look back",
      title: "The same domination, now in a quotient",
      body: "Topic 1.6 showed that a polynomial behaves like its leading term at its ends. Here two leading terms compete, and their quotient decides the end behavior.",
      transferQuestion:
        "Why does a denominator of greater degree make the output values approach 0?",
      feedback:
        "The denominator's values grow much faster in magnitude than the numerator's, so the quotient gets arbitrarily close to 0.",
      links: [
        {
          topicId: "precalculus-1-6",
          sectionId: "leading-term",
          label: "Review the dominant leading term",
        },
      ],
    },
    {
      id: "precalculus-1-7-c2",
      topicId: "precalculus-1-7",
      type: "Looking ahead",
      title: "Zeros, vertical asymptotes, and holes",
      body: "Topics 1.8 to 1.10 study what happens at the real zeros of the numerator and denominator: zeros of the function, vertical asymptotes, and holes.",
      transferQuestion:
        "Where else, besides the ends, can a rational function behave in an unusual way?",
      feedback: "At the real zeros of the denominator, where the function is undefined.",
      links: [
        {
          topicId: "precalculus-1-9",
          sectionId: "where-asymptotes",
          label: "Preview vertical asymptotes",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-7"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-4-leading-term",
      "precalculus-1-6-end-behavior",
      "precalculus-1-6-without-bound",
      "precalculus-1-6-limit-notation",
      "precalculus-1-7-rational-function",
      "precalculus-1-7-horizontal-asymptote",
      "precalculus-1-7-slant-asymptote",
    ],
  },
};

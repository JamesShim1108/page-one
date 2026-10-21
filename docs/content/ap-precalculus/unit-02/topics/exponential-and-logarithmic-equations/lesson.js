// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-13",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 13,
  code: "2.13",
  title: "Exponential and Logarithmic Equations and Inequalities",
  period: "Unit 2",
  status: "ready",
  summary:
    "Solving exponential and logarithmic equations and inequalities with properties and inverses, checking for extraneous solutions, rewriting exponential expressions with logarithms, and finding inverses of transformed exponential and logarithmic functions.",
  minutes: 15,
  learningGoals: [
    "2.13.A Solve exponential and logarithmic equations and inequalities.",
    "2.13.B Construct the inverse function for exponential and logarithmic functions.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "To solve for a variable in an exponent, take a logarithm; to solve for a variable inside a logarithm, exponentiate. Then check each answer, because the domain of a logarithm can rule some out.",
  context:
    "Free-response Question 4 on the AP Exam asks you to solve exponential and logarithmic equations without a calculator and to show every step. This topic brings together the properties from Topics 2.4 and 2.12.",
  sections: [
    {
      id: "solving",
      title:
        "2.13.A · Use properties and the inverse relationship to solve equations and inequalities.",
      conceptTitle: "Solving equations and inequalities",
      blocks: [
        {
          type: "paragraph",
          text: "Properties of exponents, properties of logarithms, and the inverse relationship between exponential and logarithmic functions can be used to solve equations and inequalities involving exponents and logarithms.",
        },
        {
          type: "table",
          caption: "Three kinds of equations",
          columns: ["Equation", "Method", "Solution"],
          rows: [
            ["3^(2x − 1) = 27", "Common base: 27 = 3³, so 2x − 1 = 3", "x = 2"],
            ["4ˣ = 20", "Take a logarithm: x = log₄ 20 = (ln 20)/(ln 4)", "x ≈ 2.161"],
            ["log₅ (x + 2) = 2", "Exponentiate: x + 2 = 5²", "x = 23"],
          ],
        },
        {
          type: "paragraph",
          text: "Inequalities follow the same steps, as long as the function applied to both sides preserves the order. Because 2ˣ is always increasing, 2ˣ > 32 = 2⁵ gives x > 5. Because (1/2)ˣ is always decreasing, (1/2)ˣ > 1/32 gives x < 5.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "6e^(2x) − e = 2e. 6e^(2x) = 3e. e^(2x) = e/2. 2x = ln (e/2) = 1 − ln 2. x = (1 − ln 2)/2.",
        },
      ],
      takeaway:
        "Exponent unknown: take a log. Log unknown: exponentiate. Decreasing functions reverse inequalities.",
    },
    {
      id: "extraneous",
      title: "2.13.A · Check solutions for extraneous solutions.",
      conceptTitle: "Extraneous solutions",
      blocks: [
        {
          type: "paragraph",
          text: "When solving exponential and logarithmic equations found through analytical or graphical methods, the results should be examined for extraneous solutions precluded by the mathematical or contextual limitations.",
        },
        {
          type: "paragraph",
          text: "Example: log₂ x + log₂ (x − 2) = 3. The product property gives log₂ (x(x − 2)) = 3, so x² − 2x = 8 and (x − 4)(x + 2) = 0. The value x = −2 is extraneous, because log₂ (−2) is undefined. The only solution is x = 4.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "x = −2 is not a solution because −2 is not in the domain of log₂ x. Therefore x = 4.",
        },
      ],
      takeaway: "Every argument of every logarithm must be positive at the solution.",
    },
    {
      id: "rewriting",
      title: "2.13.A · Logarithms can rewrite exponential expressions.",
      conceptTitle: "Rewriting exponentials with logarithms",
      blocks: [
        {
          type: "paragraph",
          text: "Logarithms can be used to rewrite expressions involving exponential functions in different ways that may reveal helpful information. Specifically, bˣ = c^((log_c b)(x)).",
        },
        {
          type: "paragraph",
          text: "Example: 2ˣ = e^((ln 2)x) ≈ e^(0.693x). A model written with base e shows a continuous rate, while the same model written with base 2 shows a doubling.",
        },
      ],
      takeaway:
        "Any exponential can be rewritten with any other base: bˣ = c^((log_c b)x).",
    },
    {
      id: "inverses",
      title:
        "2.13.B · Find inverses of transformed exponential and logarithmic functions.",
      conceptTitle: "Inverses of transformed functions",
      blocks: [
        {
          type: "paragraph",
          text: "The function f(x) = ab^(x + h) + k is a combination of additive transformations of an exponential function in general form. The inverse of y = f(x) can be found by determining the inverse operations to reverse the mapping.",
        },
        {
          type: "paragraph",
          text: "The function f(x) = a log_b (x + h) + k is a combination of additive transformations of a logarithmic function in general form. The inverse of y = f(x) can be found by determining the inverse operations to reverse the mapping.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "y = 5(2)^(x − 1) + 3. Reverse x and y: x = 5(2)^(y − 1) + 3. Then (x − 3)/5 = 2^(y − 1), so y − 1 = log₂ ((x − 3)/5) and f⁻¹(x) = log₂ ((x − 3)/5) + 1.",
        },
      ],
      takeaway: "Undo k, then a, then the exponential or logarithm, then h.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-13-extraneous-solutions",
      topicId: "precalculus-2-13",
      term: "Extraneous solutions",
      definition:
        "When solving exponential and logarithmic equations found through analytical or graphical methods, the results should be examined for extraneous solutions precluded by the mathematical or contextual limitations.",
      source: "CED 2.13.A.2",
    },
  ],
  connections: [
    {
      id: "precalculus-2-13-c1",
      topicId: "precalculus-2-13",
      type: "Look back",
      title: "Inverse operations",
      body: "Topic 2.8 found inverses by reversing the roles of x and y. Topic 2.10 showed that log_b x undoes bˣ. Both ideas are used here to solve equations and build inverses.",
      transferQuestion: "Solve 10ˣ = 0.001 without a calculator.",
      feedback: "x = log 0.001 = −3.",
      links: [
        {
          topicId: "precalculus-2-12",
          sectionId: "product-property",
          label: "Review properties of logarithms",
        },
      ],
    },
    {
      id: "precalculus-2-13-c2",
      topicId: "precalculus-2-13",
      type: "Looking ahead",
      title: "Logarithmic models",
      body: "Topic 2.14 builds logarithmic models from data and context, and solving equations like these answers questions about those models.",
      transferQuestion: "If a model is L(t) = 20 log₂ t, when is L(t) = 60?",
      feedback: "log₂ t = 3, so t = 8.",
      links: [
        {
          topicId: "precalculus-2-14",
          sectionId: "log-models",
          label: "See logarithmic models",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-13"],
  definitionCoverage: {
    status: "required",
    conceptIds: ["precalculus-2-13-extraneous-solutions"],
  },
};

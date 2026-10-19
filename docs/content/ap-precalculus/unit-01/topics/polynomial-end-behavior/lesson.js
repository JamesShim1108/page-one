// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-6",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 6,
  code: "1.6",
  title: "Polynomial Functions and End Behavior",
  period: "Unit 1",
  status: "ready",
  summary:
    "Limit notation, why the leading term controls the far left and far right of the graph, and the four end-behavior cases.",
  minutes: 10,
  learningGoals: [
    "Read and write limit notation that describes what outputs do as inputs grow or shrink without bound.",
    "Explain why the leading term determines the end behavior of a polynomial.",
    "Predict a polynomial's end behavior from the parity of its degree and the sign of its leading coefficient.",
  ],
  bigIdea:
    "Far from the origin, a polynomial behaves like its leading term. Whether the degree is even or odd and whether the leading coefficient is positive or negative gives all four possible end behaviors.",
  context:
    "Zeros and turning points describe the middle of a polynomial's graph. End behavior describes the two far edges. Together they let you sketch a believable graph without plotting many points.",
  sections: [
    {
      id: "unbounded-notation",
      title: "End behavior asks what happens as inputs grow without bound.",
      conceptTitle: "Limit notation for end behavior",
      blocks: [
        {
          type: "paragraph",
          text: "End behavior describes the outputs of a function when the input moves far to the right (x increases without bound, written x → ∞) or far to the left (x decreases without bound, written x → −∞). Limit notation records the result. The statement lim x→∞ f(x) = ∞ says that as x increases without bound, the outputs also increase without bound.",
        },
        {
          type: "paragraph",
          text: "Likewise lim x→−∞ f(x) = −∞ says that as x decreases without bound, the outputs decrease without bound, which means they become more and more negative. The symbols ∞ and −∞ describe a direction of growth, not a number the function ever reaches.",
        },
        {
          type: "table",
          caption: "End behavior of four simple power functions",
          columns: ["Function", "As x → −∞", "As x → ∞"],
          rows: [
            ["x²", "Outputs increase without bound", "Outputs increase without bound"],
            ["x³", "Outputs decrease without bound", "Outputs increase without bound"],
            ["−x³", "Outputs increase without bound", "Outputs decrease without bound"],
            ["−x²", "Outputs decrease without bound", "Outputs decrease without bound"],
          ],
        },
      ],
      takeaway:
        "Limit notation says in symbols what the outputs do at the far left and far right.",
    },
    {
      id: "leading-term",
      title: "For large inputs, the leading term dominates.",
      conceptTitle: "The leading term dominates",
      blocks: [
        {
          type: "paragraph",
          text: "A polynomial has several terms, but for inputs far from zero the highest power outgrows the rest. Compare p(x) = x³ − 100x². At small inputs the −100x² term wins, but once x is large the x³ term takes over.",
        },
        {
          type: "table",
          caption: "Terms of p(x) = x³ − 100x² at larger and larger inputs",
          columns: ["x", "x³", "−100x²", "p(x)"],
          rows: [
            ["10", "1,000", "−10,000", "−9,000"],
            ["100", "1,000,000", "−1,000,000", "0"],
            ["1,000", "1,000,000,000", "−100,000,000", "900,000,000"],
            ["10,000", "1,000,000,000,000", "−10,000,000,000", "990,000,000,000"],
          ],
        },
        {
          type: "paragraph",
          text: "At x = 10 the polynomial is negative, and at x = 100 the two terms cancel. By x = 10,000 the value p(x) is 99% of x³. The smaller term is still there, but it matters less and less, so the end behavior of p matches the end behavior of its leading term.",
        },
      ],
      takeaway:
        "The end behavior of a polynomial is the end behavior of its leading term.",
    },
    {
      id: "four-cases",
      title: "Degree parity and the sign of the leading coefficient give four cases.",
      conceptTitle: "Four end-behavior cases",
      blocks: [
        {
          type: "table",
          caption: "End behavior from the leading term",
          columns: ["Degree", "Leading coefficient", "As x → −∞", "As x → ∞"],
          rows: [
            ["Even", "Positive", "Outputs increase", "Outputs increase"],
            ["Even", "Negative", "Outputs decrease", "Outputs decrease"],
            ["Odd", "Positive", "Outputs decrease", "Outputs increase"],
            ["Odd", "Negative", "Outputs increase", "Outputs decrease"],
          ],
        },
        {
          type: "paragraph",
          text: "Use two questions. First, is the degree even or odd? Even degree means both ends go the same direction, and odd degree means the ends go opposite directions. Second, is the leading coefficient positive or negative? A positive coefficient sends the right end up, and a negative one sends it down. For p(x) = −2x⁴ + 5x³ − x, the degree is even and the leading coefficient is negative, so lim x→∞ p(x) = −∞ and lim x→−∞ p(x) = −∞.",
        },
        {
          type: "callout",
          title: "Zeros do not change the ends",
          text: "The number and location of zeros affect the middle of the graph. They never change the end behavior, which depends only on the leading term.",
        },
      ],
      takeaway:
        "Even degree: ends match. Odd degree: ends oppose. The sign of the leading coefficient picks the direction of the right end.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-6-end-behavior",
      topicId: "precalculus-1-6",
      term: "End behavior",
      definition:
        "The behavior of a function's outputs as the input increases without bound or decreases without bound.",
    },
    {
      id: "precalculus-1-6-without-bound",
      topicId: "precalculus-1-6",
      term: "Without bound",
      definition:
        "Growing larger than any fixed number, or more negative than any fixed number, as the input moves in one direction.",
    },
    {
      id: "precalculus-1-6-limit-notation",
      topicId: "precalculus-1-6",
      term: "Limit notation",
      definition:
        "Notation such as lim x→∞ f(x) = ∞ that records what the outputs of a function do as the input grows without bound or approaches a value.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-6-c1",
      topicId: "precalculus-1-6",
      type: "Look back",
      title: "Parity predicts the ends",
      body: "Topic 1.5 introduced even and odd symmetry. The same words show up here: even-degree power functions have matching ends and odd-degree power functions have opposite ends.",
      transferQuestion: "Why do x² and x⁴ both have ends that point the same direction?",
      feedback:
        "Raising a negative number to an even power gives a positive result, so large negative and large positive inputs give large positive outputs alike.",
      links: [
        {
          topicId: "precalculus-1-5",
          sectionId: "even-and-odd",
          label: "Review even and odd functions",
        },
      ],
    },
    {
      id: "precalculus-1-6-c2",
      topicId: "precalculus-1-6",
      type: "Looking ahead",
      title: "The same idea works for quotients",
      body: "Topic 1.7 asks what the end behavior of a rational function looks like. The answer again comes from comparing leading terms, this time the leading term of the numerator against that of the denominator.",
      transferQuestion:
        "What would you compare to decide the end behavior of a quotient of two polynomials?",
      feedback:
        "Compare the leading terms of the numerator and denominator, since they dominate for large inputs.",
      links: [
        {
          topicId: "precalculus-1-7",
          sectionId: "compare-degrees",
          label: "Preview rational end behavior",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-6"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-4-polynomial",
      "precalculus-1-4-degree",
      "precalculus-1-4-leading-term",
      "precalculus-1-4-leading-coefficient",
      "precalculus-1-6-end-behavior",
      "precalculus-1-6-without-bound",
      "precalculus-1-6-limit-notation",
    ],
  },
};

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
    "Limit notation for end behavior and why the degree and the sign of the leading term determine the end behavior of a polynomial function.",
  minutes: 10,
  learningGoals: ["1.6.A Describe end behaviors of polynomial functions."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "As input values increase or decrease without bound, the leading term of a polynomial dominates all lower-degree terms. So the degree and the sign of the leading term determine the end behavior.",
  context:
    "Zeros and extrema describe the middle of a polynomial's graph. End behavior describes the output values as the input values increase or decrease without bound, and the AP Exam expects it in limit notation.",
  sections: [
    {
      id: "unbounded-notation",
      title: "1.6.A · End behavior is written with limit notation.",
      conceptTitle: "Limit notation",
      blocks: [
        {
          type: "paragraph",
          text: "As the input values of a nonconstant polynomial function p increase without bound, the output values either increase without bound or decrease without bound. The corresponding notation is lim x→∞ p(x) = ∞ or lim x→∞ p(x) = −∞. As the input values decrease without bound, the output values also either increase or decrease without bound: lim x→−∞ p(x) = ∞ or lim x→−∞ p(x) = −∞.",
        },
        {
          type: "table",
          caption: "End behavior of four power functions",
          columns: [
            "Function",
            "As x decreases without bound",
            "As x increases without bound",
          ],
          rows: [
            ["x²", "lim x→−∞ x² = ∞", "lim x→∞ x² = ∞"],
            ["x³", "lim x→−∞ x³ = −∞", "lim x→∞ x³ = ∞"],
            ["−x³", "lim x→−∞ (−x³) = ∞", "lim x→∞ (−x³) = −∞"],
            ["−x²", "lim x→−∞ (−x²) = −∞", "lim x→∞ (−x²) = −∞"],
          ],
        },
        {
          type: "paragraph",
          text: "The symbols ∞ and −∞ describe output values that increase or decrease without bound. They are not output values the function reaches.",
        },
      ],
      takeaway:
        "The input direction goes under lim, and the output behavior goes after the equals sign.",
    },
    {
      id: "leading-term",
      title: "1.6.A · The leading term dominates for input values of large magnitude.",
      conceptTitle: "The leading term dominates",
      blocks: [
        {
          type: "paragraph",
          text: "The degree and sign of the leading term of a polynomial determine its end behavior, because as the input values increase or decrease without bound, the values of the leading term dominate the values of all lower-degree terms. In p(x) = x³ − 100x², the term −100x² is larger in magnitude for small x, but x³ takes over as x grows.",
        },
        {
          type: "table",
          caption: "Terms of p(x) = x³ − 100x²",
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
          text: "At x = 10,000, p(x) is 99% of x³. The end behavior of p is the end behavior of x³: lim x→∞ p(x) = ∞ and lim x→−∞ p(x) = −∞.",
        },
      ],
      takeaway: "A polynomial has the end behavior of its leading term.",
    },
    {
      id: "four-cases",
      title:
        "1.6.A · The degree and the sign of the leading coefficient give four cases.",
      conceptTitle: "Four end-behavior cases",
      blocks: [
        {
          type: "table",
          caption: "End behavior from the leading term aₙxⁿ",
          columns: ["Degree n", "Sign of aₙ", "lim x→−∞ p(x)", "lim x→∞ p(x)"],
          rows: [
            ["Even", "Positive", "∞", "∞"],
            ["Even", "Negative", "−∞", "−∞"],
            ["Odd", "Positive", "−∞", "∞"],
            ["Odd", "Negative", "∞", "−∞"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "For p(x) = −2x⁴ + 5x³ − x: the leading term −2x⁴ has a negative sign and an even degree; therefore, lim x→−∞ p(x) = −∞ and lim x→∞ p(x) = −∞.",
        },
        {
          type: "paragraph",
          text: "Real zeros, relative extrema, and points of inflection describe the middle of the graph. They never change the end behavior, which depends only on the leading term.",
        },
      ],
      takeaway:
        "Even degree: both ends go the same way. Odd degree: the ends go opposite ways. The sign of the leading coefficient sets the direction as x → ∞.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-6-end-behavior",
      topicId: "precalculus-1-6",
      term: "End behavior",
      definition:
        "The behavior of the output values of a function as the input values increase without bound or decrease without bound.",
    },
    {
      id: "precalculus-1-6-without-bound",
      topicId: "precalculus-1-6",
      term: "Without bound",
      definition:
        "Increasing beyond every fixed number, or decreasing below every fixed number.",
    },
    {
      id: "precalculus-1-6-limit-notation",
      topicId: "precalculus-1-6",
      term: "Limit notation",
      definition:
        "Notation such as lim x→∞ p(x) = −∞ that describes what the output values do as the input values increase without bound, decrease without bound, or approach a value.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-6-c1",
      topicId: "precalculus-1-6",
      type: "Look back",
      title: "Even and odd powers",
      body: "Topic 1.5 showed that p(x) = aₙxⁿ is even when n is even and odd when n is odd. That same parity decides whether the two ends of a polynomial's graph point the same way.",
      transferQuestion: "Why do x² and x⁴ have ends that point the same way?",
      feedback:
        "A negative number raised to an even power is positive, so input values of large magnitude on either side give large positive output values.",
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
      title: "Comparing leading terms in a quotient",
      body: "Topic 1.7 finds the end behavior of a rational function by examining the quotient of the leading terms of the numerator and the denominator.",
      transferQuestion:
        "What would you compare to find the end behavior of a quotient of two polynomials?",
      feedback:
        "The leading terms of the numerator and denominator, since they dominate for input values of large magnitude.",
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

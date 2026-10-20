// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-9",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 9,
  code: "1.9",
  title: "Rational Functions and Vertical Asymptotes",
  period: "Unit 1",
  status: "ready",
  summary:
    "Where the graph of a rational function has a vertical asymptote, and how one-sided limits describe the output values near it.",
  minutes: 13,
  learningGoals: ["1.9.A Determine vertical asymptotes of graphs of rational functions."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Near a real zero of the denominator that is not cancelled by the numerator, the denominator's values are arbitrarily close to 0, so the output values of the rational function increase or decrease without bound.",
  context:
    "Topic 1.8 left the real zeros of the denominator out of every solution. This topic studies the graph near those input values and the one-sided limit notation the AP Exam uses to describe it.",
  sections: [
    {
      id: "where-asymptotes",
      title:
        "1.9.A · A vertical asymptote occurs at a real zero of the denominator that is not a zero of the numerator.",
      conceptTitle: "Locating vertical asymptotes",
      blocks: [
        {
          type: "paragraph",
          text: "If a is a real zero of the polynomial in the denominator of a rational function and is not also a real zero of the polynomial in the numerator, then the graph has a vertical asymptote at x = a. A vertical asymptote also occurs at x = a if the multiplicity of a as a real zero of the denominator is greater than its multiplicity as a real zero of the numerator.",
        },
        {
          type: "paragraph",
          text: "For r(x) = (x + 1)/(x − 3), the denominator is 0 at x = 3 and the numerator is 4 there, so the graph has a vertical asymptote at x = 3. For (x − 1)/(x − 1)², the value 1 has multiplicity 2 in the denominator and 1 in the numerator, so there is a vertical asymptote at x = 1 as well. The domain of each function leaves out the asymptote's x-value.",
        },
        {
          type: "table",
          caption: "Values of r(x) = (x + 1)/(x − 3) near x = 3",
          columns: ["x", "r(x)"],
          rows: [
            ["2.9", "−39"],
            ["2.99", "−399"],
            ["2.999", "−3,999"],
            ["3.001", "4,001"],
            ["3.01", "401"],
            ["3.1", "41"],
          ],
        },
        {
          type: "callout",
          title: "No real zero in the denominator, no vertical asymptote",
          text: "The denominator of (x + 1)/(x² + 4) is at least 4 for every x, so the graph has no vertical asymptote.",
        },
        {
          type: "graph",
          caption:
            "Graph of r(x) = (x + 1)/(x − 3) with vertical asymptote x = 3 and horizontal asymptote y = 1",
          alt: "A two-branch curve. Left of x = 3 it falls toward negative infinity; right of x = 3 it comes down from positive infinity. Both branches level off toward the dashed line y = 1.",
          window: {
            x: [-6, 12],
            y: [-8, 10],
          },
          ticks: {
            x: 2,
            y: 2,
          },
          functions: [
            {
              expr: "(x + 1)/(x - 3)",
              label: "r",
              labelAt: 6,
              labelPosition: "ne",
            },
          ],
          asymptotes: [
            {
              x: 3,
            },
            {
              y: 1,
            },
          ],
        },
      ],
      takeaway:
        "Compare the multiplicity of each real zero of the denominator with its multiplicity in the numerator.",
    },
    {
      id: "one-sided-limits",
      title:
        "1.9.A · One-sided limits describe the output values on each side of a vertical asymptote.",
      conceptTitle: "One-sided limits",
      blocks: [
        {
          type: "paragraph",
          text: "Near a vertical asymptote x = a, the values of the denominator are arbitrarily close to 0, so the values of r increase or decrease without bound. For input values near a and greater than a, write lim x→a⁺ r(x) = ∞ or lim x→a⁺ r(x) = −∞. For input values near a and less than a, write lim x→a⁻ r(x) = ∞ or lim x→a⁻ r(x) = −∞.",
        },
        {
          type: "paragraph",
          text: "For r(x) = (x + 1)/(x − 3): just left of 3, the numerator is near 4 and the denominator is a small negative number, so lim x→3⁻ r(x) = −∞. Just right of 3, both are positive, so lim x→3⁺ r(x) = ∞.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "lim x→3⁻ r(x) = −∞ and lim x→3⁺ r(x) = ∞, so the graph of r has a vertical asymptote at x = 3.",
        },
      ],
      takeaway:
        "Find the sign of the numerator and the denominator just left and just right of the asymptote.",
    },
    {
      id: "multiplicity-effect",
      title:
        "1.9.A · The multiplicity of the denominator's zero decides whether the two sides match.",
      conceptTitle: "Multiplicity and asymptote behavior",
      blocks: [
        {
          type: "paragraph",
          text: "A factor of odd multiplicity changes sign at its zero, so the output values head in opposite directions on the two sides of the asymptote. A factor of even multiplicity does not change sign, so they head in the same direction.",
        },
        {
          type: "table",
          caption: "Comparing 1/(x − 2)² and 1/(x − 2)³ near x = 2",
          columns: ["x", "1/(x − 2)²", "1/(x − 2)³"],
          rows: [
            ["1.9", "100", "−1,000"],
            ["1.99", "10,000", "−1,000,000"],
            ["2.01", "10,000", "1,000,000"],
            ["2.1", "100", "1,000"],
          ],
        },
        {
          type: "paragraph",
          text: "For 1/(x − 2)², lim x→2⁻ = ∞ and lim x→2⁺ = ∞. For 1/(x − 2)³, lim x→2⁻ = −∞ and lim x→2⁺ = ∞. A negative numerator near the asymptote reverses every sign: (x − 1)/(x + 2)² has limit −∞ from both sides of x = −2.",
        },
      ],
      takeaway:
        "Odd multiplicity: opposite directions. Even multiplicity: the same direction. The sign of the rest of the expression picks ∞ or −∞.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-9-vertical-asymptote",
      topicId: "precalculus-1-9",
      term: "Vertical asymptote",
      definition:
        "A line x = a near which the output values of a function increase or decrease without bound as the input values approach a.",
    },
    {
      id: "precalculus-1-9-one-sided-limit",
      topicId: "precalculus-1-9",
      term: "One-sided limit",
      definition:
        "A limit as the input values approach a only from values greater than a, written x→a⁺, or only from values less than a, written x→a⁻.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-9-c1",
      topicId: "precalculus-1-9",
      type: "Look back",
      title: "Signs of factors again",
      body: "Topic 1.8 used the signs of the factors to find where a rational function is positive or negative. The same signs decide whether a one-sided limit is ∞ or −∞.",
      transferQuestion:
        "What must you know about r(x) just left and just right of x = a to choose ∞ or −∞?",
      feedback: "Whether r(x) is positive or negative on each side.",
      links: [
        {
          topicId: "precalculus-1-8",
          sectionId: "sign-analysis",
          label: "Review signs of a rational function",
        },
      ],
    },
    {
      id: "precalculus-1-9-c2",
      topicId: "precalculus-1-9",
      type: "Looking ahead",
      title: "When the numerator's multiplicity is at least as great",
      body: "If the multiplicity of a in the numerator is greater than or equal to its multiplicity in the denominator, there is no vertical asymptote at x = a. Topic 1.10 shows that the graph has a hole there.",
      transferQuestion:
        "What changes in the asymptote condition if the numerator is also 0 at x = a?",
      feedback:
        "Compare multiplicities. If the numerator's multiplicity is at least the denominator's, the graph has a hole instead.",
      links: [
        {
          topicId: "precalculus-1-10",
          sectionId: "hole-condition",
          label: "Preview holes",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-9"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-domain",
      "precalculus-1-5-multiplicity",
      "precalculus-1-6-without-bound",
      "precalculus-1-6-limit-notation",
      "precalculus-1-7-rational-function",
      "precalculus-1-9-vertical-asymptote",
      "precalculus-1-9-one-sided-limit",
    ],
  },
};

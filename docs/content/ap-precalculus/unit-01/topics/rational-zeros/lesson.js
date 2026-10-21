// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-8",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 8,
  code: "1.8",
  title: "Rational Functions and Zeros",
  period: "Unit 1",
  status: "ready",
  summary:
    "The real zeros of a rational function, and how the real zeros of its numerator and denominator determine where it is positive or negative.",
  minutes: 12,
  learningGoals: ["1.8.A Determine the zeros of rational functions."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "The real zeros of a rational function are the real zeros of its numerator that are in its domain. The real zeros of the numerator and of the denominator together mark the endpoints and asymptotes of the intervals where the function is positive or negative.",
  context:
    "A quotient is 0 only when its numerator is 0 and the quotient is defined. That single fact gives the zeros of a rational function and is the starting point for solving rational inequalities.",
  sections: [
    {
      id: "numerator-zeros",
      title:
        "1.8.A · The real zeros of a rational function are the real zeros of the numerator in its domain.",
      conceptTitle: "Zeros of a rational function",
      blocks: [
        {
          type: "paragraph",
          text: "The real zeros of a rational function correspond to the real zeros of the numerator for such values in its domain. For r(x) = (x − 2)(x + 3)/(x − 1), the real zeros are x = 2 and x = −3. The value x = 1 makes the denominator 0, so 1 is not in the domain of r.",
        },
        {
          type: "callout",
          title: "Check the domain first",
          text: "For r(x) = (x² − 1)/(x − 1) = (x − 1)(x + 1)/(x − 1), the numerator is 0 at x = 1 and x = −1, but x = 1 is not in the domain of r. The only real zero of r is x = −1. Topic 1.10 describes the graph at x = 1.",
        },
      ],
      takeaway:
        "Find the real zeros of the numerator, then discard any that are not in the domain.",
    },
    {
      id: "sign-analysis",
      title:
        "1.8.A · The real zeros of the numerator and denominator divide the number line into intervals of constant sign.",
      conceptTitle: "Sign of a rational function",
      blocks: [
        {
          type: "paragraph",
          text: "For r(x) = (x + 2)(x − 1)/(x − 4), the numerator has real zeros −2 and 1, and the denominator has real zero 4. These values split the number line into four intervals, and on each interval r(x) has one sign, so a single test value determines the sign on the whole interval.",
        },
        {
          type: "table",
          caption: "Sign of r(x) = (x + 2)(x − 1)/(x − 4)",
          columns: ["Interval", "Test value", "r(test value)", "Sign of r(x)"],
          rows: [
            ["x < −2", "−3", "−0.571", "Negative"],
            ["−2 < x < 1", "0", "0.5", "Positive"],
            ["1 < x < 4", "2", "−2", "Negative"],
            ["x > 4", "5", "28", "Positive"],
          ],
        },
        {
          type: "paragraph",
          text: "A factor with even multiplicity does not change the sign. In r(x) = (x − 2)²(x + 1)/(x − 5), the sign of r(x) is the same on both sides of x = 2.",
        },
        {
          type: "graph",
          caption:
            "Graph of r(x) = (x + 2)(x − 1)/(x − 4): negative, positive, negative, positive",
          alt: "A rational function with zeros at x = −2 and x = 1 and a vertical asymptote at x = 4. It is below the x-axis left of −2, above between −2 and 1, below between 1 and 4, and above right of 4.",
          window: {
            x: [-5, 11],
            y: [-12, 28],
          },
          ticks: {
            x: 1,
            y: 4,
          },
          functions: [
            {
              expr: "(x + 2)(x - 1)/(x - 4)",
              label: "r",
              labelAt: 7,
              labelPosition: "nw",
            },
          ],
          asymptotes: [
            {
              x: 4,
            },
          ],
          points: [
            {
              at: [-2, 0],
              label: "(−2, 0)",
              position: "nw",
            },
            {
              at: [1, 0],
              label: "(1, 0)",
              position: "ne",
            },
          ],
        },
      ],
      takeaway:
        "Mark every real zero of the numerator and denominator, test one value in each interval, and watch for even multiplicity.",
    },
    {
      id: "inequalities",
      title:
        "1.8.A · Real zeros are endpoints, and denominator zeros are asymptotes, for rational inequalities.",
      conceptTitle: "Rational inequalities",
      blocks: [
        {
          type: "paragraph",
          text: "The real zeros of both polynomials of a rational function r are endpoints or asymptotes for the intervals satisfying r(x) ≥ 0 or r(x) ≤ 0. For r(x) = (x + 2)(x − 1)/(x − 4), r(x) = 0 at x = −2 and x = 1, and r is undefined at x = 4. So r(x) ≥ 0 for −2 ≤ x ≤ 1 and for x > 4.",
        },
        {
          type: "list",
          title: "Endpoint rules",
          items: [
            "A real zero of the numerator in the domain satisfies r(x) ≥ 0 and r(x) ≤ 0, so include it.",
            "For r(x) > 0 or r(x) < 0, exclude the real zeros of the numerator.",
            "Always exclude a real zero of the denominator, because r is undefined there.",
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "r(x) ≥ 0 for −2 ≤ x ≤ 1 and for x > 4. The value x = 4 is not included because r(4) is undefined.",
        },
      ],
      takeaway:
        "Use the sign intervals, then decide each endpoint with the endpoint rules.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-8-rational-zeros",
      topicId: "precalculus-1-8",
      term: "Real zeros of a rational function",
      definition:
        "The real zeros of a rational function correspond to the real zeros of the numerator for such values in its domain.",
      source: "CED 1.8.A.1",
    },
    {
      id: "precalculus-1-8-rational-inequality",
      topicId: "precalculus-1-8",
      term: "Rational function inequalities",
      definition:
        "The real zeros of both polynomial functions of a rational function r are endpoints or asymptotes for intervals satisfying the rational function inequalities r(x) ≥ 0 or r(x) ≤ 0.",
      source: "CED 1.8.A.2",
    },
  ],
  connections: [
    {
      id: "precalculus-1-8-c1",
      topicId: "precalculus-1-8",
      type: "Look back",
      title: "Polynomial inequalities first",
      body: "Topic 1.5 showed that the real zeros of a polynomial are the endpoints of the intervals satisfying a polynomial inequality. A rational function adds the real zeros of its denominator to that list.",
      transferQuestion:
        "At a zero of even multiplicity, does the sign of the function change?",
      feedback: "No. The output values have the same sign on both sides.",
      links: [
        {
          topicId: "precalculus-1-5",
          sectionId: "multiplicity",
          label: "Review multiplicity",
        },
      ],
    },
    {
      id: "precalculus-1-8-c2",
      topicId: "precalculus-1-8",
      type: "Looking ahead",
      title: "What happens at the denominator's zeros",
      body: "Topic 1.9 studies the graph near a real zero of the denominator that is not also a zero of the numerator: a vertical asymptote.",
      transferQuestion:
        "Why might the output values be very large in magnitude near a real zero of the denominator?",
      feedback:
        "The denominator's values are arbitrarily close to 0 while the numerator's are not.",
      links: [
        {
          topicId: "precalculus-1-9",
          sectionId: "where-asymptotes",
          label: "Preview vertical asymptotes",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-8"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-zero",
      "precalculus-1-7-rational-function",
      "precalculus-1-8-rational-zeros",
      "precalculus-1-8-rational-inequality",
    ],
  },
};

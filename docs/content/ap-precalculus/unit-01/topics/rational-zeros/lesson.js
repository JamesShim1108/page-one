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
    "Finding the zeros of a rational function and using signs to decide where it is positive or negative.",
  minutes: 12,
  learningGoals: [
    "Find the zeros of a rational function from its numerator, and exclude inputs where the denominator is zero.",
    "Use a sign chart to decide where a rational function is positive or negative.",
    "Solve rational inequalities and write the solution with the correct endpoints.",
  ],
  bigIdea:
    "A rational function can change sign only at a zero of the numerator or at an input where the denominator is zero. Finding those inputs splits the number line into intervals where the sign stays the same.",
  context:
    "A quotient is zero only when the numerator is zero and the quotient exists. That gives a short checklist for locating zeros, and the same inputs mark the boundaries between positive and negative stretches.",
  sections: [
    {
      id: "numerator-zeros",
      title:
        "A zero of a rational function is a zero of the numerator that is not excluded by the denominator.",
      conceptTitle: "Zeros of rational functions",
      blocks: [
        {
          type: "paragraph",
          text: "A fraction equals 0 only when its numerator equals 0 and the fraction is defined. So the zeros of the rational function r(x) = p(x)/q(x) are the zeros of p(x) at which q(x) is not 0. For r(x) = (x − 2)(x + 3)/(x − 1), the zeros are x = 2 and x = −3. The input x = 1 makes the denominator zero, so r(1) does not exist.",
        },
        {
          type: "callout",
          title: "Check the denominator before you call it a zero",
          text: "For r(x) = (x² − 1)/(x − 1) = (x − 1)(x + 1)/(x − 1), the numerator is zero at both x = 1 and x = −1. But r(1) is undefined, so x = 1 is not a zero. The only zero is x = −1. Topic 1.10 explains what the graph does at x = 1.",
        },
      ],
      takeaway:
        "Set the numerator equal to 0, then throw out any solution that also makes the denominator 0.",
    },
    {
      id: "sign-analysis",
      title:
        "A sign chart records whether the function is positive or negative on each interval.",
      conceptTitle: "Sign analysis",
      blocks: [
        {
          type: "paragraph",
          text: "Take r(x) = (x + 2)(x − 1)/(x − 4). The numerator is zero at x = −2 and x = 1, and the denominator is zero at x = 4. These three inputs split the number line into four intervals. On each interval, r(x) cannot change sign, so one test value tells you the sign of the whole interval.",
        },
        {
          type: "table",
          caption: "Sign chart for r(x) = (x + 2)(x − 1)/(x − 4)",
          columns: ["Interval", "Test value", "r(test value)", "Sign of r"],
          rows: [
            ["x < −2", "−3", "−0.571", "Negative"],
            ["−2 < x < 1", "0", "0.5", "Positive"],
            ["1 < x < 4", "2", "−2", "Negative"],
            ["x > 4", "5", "28", "Positive"],
          ],
        },
        {
          type: "paragraph",
          text: "The sign does not always change at a zero. A factor with even multiplicity, such as (x − 2)² in r(x) = (x − 2)²(x + 1)/(x − 5), touches the axis at x = 2 without crossing it, so the sign stays the same on both sides. The same idea applies to a repeated factor in the denominator.",
        },
      ],
      takeaway:
        "Mark every zero of the numerator and denominator, test one value in each interval, and watch for even multiplicity.",
    },
    {
      id: "inequalities",
      title:
        "A rational inequality is solved by choosing the intervals with the right sign.",
      conceptTitle: "Rational inequalities",
      blocks: [
        {
          type: "paragraph",
          text: "To solve r(x) ≥ 0 for the function above, read the sign chart. The function is positive on −2 < x < 1 and on x > 4. It equals 0 at x = −2 and x = 1, and those inputs satisfy the inequality. It is undefined at x = 4, so that input never belongs to the solution. The solution is [−2, 1] ∪ (4, ∞).",
        },
        {
          type: "list",
          title: "Endpoint rules",
          items: [
            "Include a zero of the numerator when the inequality is ≥ or ≤.",
            "Exclude a zero of the numerator when the inequality is > or <.",
            "Always exclude an input where the denominator is 0.",
          ],
        },
      ],
      takeaway:
        "Use the sign chart for the intervals, then decide each endpoint with the endpoint rules.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-8-sign-chart",
      topicId: "precalculus-1-8",
      term: "Sign chart",
      definition:
        "A table that records whether a function is positive or negative on each interval between its zeros and its undefined inputs.",
    },
    {
      id: "precalculus-1-8-test-value",
      topicId: "precalculus-1-8",
      term: "Test value",
      definition:
        "An input chosen inside an interval to find the sign of a function on the whole interval.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-8-c1",
      topicId: "precalculus-1-8",
      type: "Look back",
      title: "Multiplicity decides whether the sign changes",
      body: "In Topic 1.5, an odd-multiplicity zero made a polynomial cross the x-axis and an even-multiplicity zero made it touch. The same rule applies to the factors of a numerator and a denominator.",
      transferQuestion:
        "At a zero where the factor appears twice, does the sign of the function change?",
      feedback:
        "No. A factor with even multiplicity touches the axis and the function keeps the same sign on both sides.",
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
      title: "The undefined inputs come next",
      body: "In this topic you excluded inputs where the denominator is zero. Topic 1.9 studies what the graph does near them, and a sign chart helps again.",
      transferQuestion:
        "Why might the graph shoot upward on one side of an undefined input and downward on the other?",
      feedback:
        "The sign of the function can differ on the two sides, while the size of the outputs is very large near the input.",
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
      "precalculus-1-8-sign-chart",
      "precalculus-1-8-test-value",
    ],
  },
};

// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-4",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 4,
  code: "1.4",
  title: "Polynomial Functions and Rates of Change",
  period: "Unit 1",
  status: "ready",
  summary:
    "Polynomial vocabulary, local and global extrema, how zeros and turning points relate, and inflection points.",
  minutes: 11,
  learningGoals: [
    "Name the degree, leading term, and leading coefficient of a polynomial.",
    "Distinguish local from global maxima and minima and explain where they occur.",
    "Use the sign pattern of rates of change to locate extrema and inflection points.",
  ],
  bigIdea:
    "A polynomial's graph is shaped by how its rate of change rises and falls. Extrema mark where it changes direction, and inflection points mark where it changes concavity.",
  context:
    "You have studied how outputs change and how rates themselves change. Polynomial functions are the first large family where both ideas appear in rich combination, and they are built from the simple power functions you already know.",
  sections: [
    {
      id: "polynomial-terms",
      title: "A polynomial function is a sum of terms with whole-number powers.",
      conceptTitle: "Polynomial vocabulary",
      blocks: [
        {
          type: "paragraph",
          text: "A nonconstant polynomial function is equivalent to a sum of terms, each a real number times a power of x, where every power is a positive whole number or zero. Written in order, it looks like aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀, with aₙ ≠ 0. The exponent n is the degree, aₙxⁿ is the leading term, and aₙ is the leading coefficient.",
        },
        {
          type: "table",
          caption: "Reading polynomial vocabulary",
          columns: ["Polynomial", "Degree", "Leading term"],
          rows: [
            ["3x⁴ − x + 7", "4", "3x⁴"],
            ["−2x³ + 5x²", "3", "−2x³"],
            ["x(x − 1)(x + 2) = x³ + x² − 2x", "3", "x³"],
          ],
        },
        {
          type: "paragraph",
          text: "A product of factors still counts as a polynomial, because it is equivalent to a sum of powers once expanded. Rules such as 5/x or √x are not polynomials, since x appears in a denominator or under a radical instead of with a whole-number power.",
        },
      ],
      takeaway:
        "Degree comes from the highest power of x after the polynomial is fully expanded.",
    },
    {
      id: "extrema",
      title: "Extrema occur where a function switches between increasing and decreasing.",
      conceptTitle: "Local and global extrema",
      blocks: [
        {
          type: "paragraph",
          text: "A local maximum occurs where a function switches from increasing to decreasing, and a local minimum occurs where it switches from decreasing to increasing. A local extremum can also occur at an included endpoint of the domain. A local extremum whose output beats every other output of the function is a global maximum or a global minimum.",
        },
        {
          type: "table",
          caption: "Values of f(x) = x³ − 3x",
          columns: ["x", "f(x)"],
          rows: [
            ["-2", "-2"],
            ["-1", "2"],
            ["0", "0"],
            ["1", "-2"],
            ["2", "2"],
          ],
        },
        {
          type: "paragraph",
          text: "The outputs rise from −2 to 2 as x goes from −2 to −1, then fall to −2 at x = 1, then rise again. So f has a local maximum near x = −1 and a local minimum near x = 1. Neither is global: the outputs of a cubic keep growing without bound in one direction and shrinking in the other.",
        },
        {
          type: "callout",
          title: "Even-degree polynomials",
          text: "An even-degree polynomial always has a global maximum or a global minimum, because both ends of its graph turn the same way. For a quadratic, that extreme output occurs at the vertex.",
        },
      ],
      takeaway:
        "A local extremum is the best output nearby. A global extremum is the best output everywhere.",
    },
    {
      id: "extrema-and-zeros",
      title: "Between two real zeros, a polynomial must turn around.",
      conceptTitle: "Zeros and turning points",
      blocks: [
        {
          type: "paragraph",
          text: "If a polynomial has two different real zeros, its output is 0 at both. To leave 0 and later return to 0, the function must change direction somewhere in between. So there is at least one local maximum or minimum between any two distinct real zeros.",
        },
        {
          type: "paragraph",
          text: "Consider f(x) = x(x − 2)(x + 2) = x³ − 4x, which has zeros at −2, 0, and 2. Between −2 and 0 the graph rises above the x-axis and turns around, giving a local maximum of about 3.08 near x = −1.15. Between 0 and 2 the graph dips below the axis, giving a local minimum of about −3.08 near x = 1.15.",
        },
      ],
      takeaway:
        "At least one turning point sits between any two distinct real zeros of a polynomial.",
    },
    {
      id: "inflection",
      title: "Inflection points are where concavity changes.",
      conceptTitle: "Inflection points",
      blocks: [
        {
          type: "paragraph",
          text: "An inflection point is where the rate of change switches between increasing and decreasing, so the graph switches between concave up and concave down. Extrema describe direction. Inflection points describe curvature, and they are different features that can occur at different inputs.",
        },
        {
          type: "table",
          caption: "Values and changes of f(x) = x³",
          columns: ["Interval", "Output change over the interval"],
          rows: [
            ["[−2, −1]", "7"],
            ["[−1, 0]", "1"],
            ["[0, 1]", "1"],
            ["[1, 2]", "7"],
          ],
        },
        {
          type: "paragraph",
          text: "The output changes drop from 7 to 1 on the left, then climb from 1 to 7 on the right. The rate of change is decreasing before x = 0 and increasing after it, so the graph is concave down to the left of 0 and concave up to the right. The inflection point is at x = 0.",
        },
      ],
      takeaway:
        "At an inflection point the graph changes concavity. At an extremum the graph changes direction.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-4-polynomial",
      topicId: "precalculus-1-4",
      term: "Polynomial function",
      definition:
        "A function equivalent to a sum of terms of the form a·xⁿ, where each a is a real number and each n is zero or a positive whole number.",
    },
    {
      id: "precalculus-1-4-degree",
      topicId: "precalculus-1-4",
      term: "Degree",
      definition: "The highest power of x in a polynomial after it is fully expanded.",
    },
    {
      id: "precalculus-1-4-leading-term",
      topicId: "precalculus-1-4",
      term: "Leading term",
      definition: "The term of a polynomial with the highest power of x.",
    },
    {
      id: "precalculus-1-4-leading-coefficient",
      topicId: "precalculus-1-4",
      term: "Leading coefficient",
      definition: "The coefficient of the leading term of a polynomial.",
    },
    {
      id: "precalculus-1-4-local-max",
      topicId: "precalculus-1-4",
      term: "Local maximum",
      definition:
        "An output at an input where a function switches from increasing to decreasing, or at an included endpoint where it is greater than nearby outputs.",
    },
    {
      id: "precalculus-1-4-local-min",
      topicId: "precalculus-1-4",
      term: "Local minimum",
      definition:
        "An output at an input where a function switches from decreasing to increasing, or at an included endpoint where it is less than nearby outputs.",
    },
    {
      id: "precalculus-1-4-global-max",
      topicId: "precalculus-1-4",
      term: "Global maximum",
      definition:
        "A local maximum whose output is greater than every other output of the function.",
    },
    {
      id: "precalculus-1-4-global-min",
      topicId: "precalculus-1-4",
      term: "Global minimum",
      definition:
        "A local minimum whose output is less than every other output of the function.",
    },
    {
      id: "precalculus-1-4-inflection",
      topicId: "precalculus-1-4",
      term: "Inflection point",
      definition:
        "A point where the rate of change switches between increasing and decreasing, so the concavity of the graph changes.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-4-c1",
      topicId: "precalculus-1-4",
      type: "Look back",
      title: "Quadratics are the simplest case",
      body: "A quadratic has one vertex, which is a global extremum, and no inflection point because its rates change at a constant pace. Higher-degree polynomials can have several extrema and inflection points.",
      transferQuestion: "Why can a quadratic never have an inflection point?",
      feedback:
        "Its average rates change by a constant amount in one direction, so the graph never switches between concave up and concave down.",
      links: [
        {
          topicId: "precalculus-1-3",
          sectionId: "quadratic-rates",
          label: "Review quadratic rates",
        },
      ],
    },
    {
      id: "precalculus-1-4-c2",
      topicId: "precalculus-1-4",
      type: "Looking ahead",
      title: "Zeros and end behavior finish the picture",
      body: "Topic 1.5 will connect real zeros to factors and to where the graph crosses or touches the x-axis. Topic 1.6 will use the leading term to describe where the graph goes at the far left and far right.",
      transferQuestion:
        "What two kinds of information about a polynomial graph would you want in order to sketch it?",
      feedback:
        "A strong answer includes the zeros and the end behavior, and then adds turning points and concavity to refine the shape.",
      links: [
        {
          topicId: "precalculus-1-6",
          sectionId: "four-cases",
          label: "Preview end behavior",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-4"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-concave-up",
      "precalculus-1-1-concave-down",
      "precalculus-1-4-polynomial",
      "precalculus-1-4-degree",
      "precalculus-1-4-leading-term",
      "precalculus-1-4-leading-coefficient",
      "precalculus-1-4-local-max",
      "precalculus-1-4-local-min",
      "precalculus-1-4-global-max",
      "precalculus-1-4-global-min",
      "precalculus-1-4-inflection",
    ],
  },
};

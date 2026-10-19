// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-5",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 5,
  code: "1.5",
  title: "Polynomial Functions and Complex Zeros",
  period: "Unit 1",
  status: "ready",
  summary:
    "Zeros and factors, multiplicity, conjugate pairs of non-real zeros, finding degree from differences, and even and odd symmetry.",
  minutes: 14,
  learningGoals: [
    "Connect real zeros, linear factors, and x-intercepts, and use zeros to solve polynomial inequalities.",
    "Describe how multiplicity affects the graph at a zero, and count complex zeros using the degree.",
    "Find a polynomial's degree from successive differences and decide whether a function is even, odd, or neither.",
  ],
  bigIdea:
    "A polynomial's zeros, with their multiplicities, are its fingerprints. They determine its factors, where its graph crosses or touches the x-axis, and how many complex zeros it has.",
  context:
    "Topic 1.4 showed that zeros and turning points are linked. Here zeros take center stage. You will work with real zeros that appear as x-intercepts and with non-real zeros that never appear on the graph but still count toward the degree.",
  sections: [
    {
      id: "zeros-and-factors",
      title: "A real zero corresponds to a linear factor.",
      conceptTitle: "Zeros and factors",
      blocks: [
        {
          type: "paragraph",
          text: "A number a is a zero of a polynomial p when p(a) = 0. For a real number a, the expression (x − a) is a factor of p exactly when a is a zero. Real zeros are also the x-intercepts of the graph. For example, p(x) = x³ − 2x² − 5x + 6 factors as (x − 1)(x + 2)(x − 3), so its zeros are 1, −2, and 3.",
        },
        {
          type: "paragraph",
          text: "Real zeros also split the number line into intervals where the polynomial keeps one sign. To solve p(x) > 0, find the zeros, then test one input in each interval between them.",
        },
        {
          type: "table",
          caption: "Sign of p(x) = (x − 1)(x + 2)(x − 3) between its zeros",
          columns: ["Interval", "x − 1", "x + 2", "x − 3", "p(x)"],
          rows: [
            ["x < −2", "−", "−", "−", "Negative"],
            ["−2 < x < 1", "−", "+", "−", "Positive"],
            ["1 < x < 3", "+", "+", "−", "Negative"],
            ["x > 3", "+", "+", "+", "Positive"],
          ],
        },
        {
          type: "paragraph",
          text: "So p(x) > 0 on the intervals (−2, 1) and (3, ∞). The zeros are the boundaries between positive and negative stretches.",
        },
      ],
      takeaway:
        "Zeros give factors, x-intercepts, and the boundaries of the intervals where a polynomial is positive or negative.",
    },
    {
      id: "multiplicity",
      title: "A repeated factor gives a zero with multiplicity.",
      conceptTitle: "Multiplicity",
      blocks: [
        {
          type: "paragraph",
          text: "If the factor (x − a) appears n times, then a is a zero of multiplicity n. A polynomial of degree n has exactly n complex zeros when each zero is counted as many times as its multiplicity. For p(x) = (x + 1)²(x − 2)³, the zero −1 has multiplicity 2, the zero 2 has multiplicity 3, and the degree is 5.",
        },
        {
          type: "table",
          caption: "Multiplicity and the graph for p(x) = (x + 1)²(x − 2)³",
          columns: ["Zero", "Multiplicity", "What the graph does"],
          rows: [
            [
              "−1",
              "2 (even)",
              "Touches the x-axis and turns around; the output keeps the same sign on both sides",
            ],
            ["2", "3 (odd)", "Crosses the x-axis; the output changes sign"],
          ],
        },
        {
          type: "paragraph",
          text: "A real zero of even multiplicity does not change the sign of the output, so the graph touches the x-axis there. A real zero of odd multiplicity does change the sign, so the graph passes through the x-axis.",
        },
      ],
      takeaway: "Even multiplicity means touch and turn. Odd multiplicity means cross.",
    },
    {
      id: "conjugate-zeros",
      title: "Non-real zeros come in conjugate pairs.",
      conceptTitle: "Complex conjugate pairs",
      blocks: [
        {
          type: "paragraph",
          text: "A complex number has the form a + bi, where a and b are real and i² = −1. When a polynomial has real coefficients, its non-real zeros come in conjugate pairs: if a + bi is a zero with b ≠ 0, then a − bi is a zero too. For instance, x² + 4 has zeros 2i and −2i, and x² − 2x + 5 has zeros 1 + 2i and 1 − 2i.",
        },
        {
          type: "paragraph",
          text: "Non-real zeros never appear as x-intercepts, but they still count toward the degree. Because they come in pairs, a real-coefficient polynomial of odd degree always has at least one real zero. The polynomial (x² + 4)(x − 1) has degree 3 and three complex zeros, 2i, −2i, and 1, but its graph meets the x-axis only once.",
        },
      ],
      takeaway:
        "Non-real zeros pair up as conjugates, so they can reduce the number of x-intercepts without changing the degree.",
    },
    {
      id: "degree-from-differences",
      title: "Successive differences reveal the degree from a table.",
      conceptTitle: "Degree from differences",
      blocks: [
        {
          type: "paragraph",
          text: "When outputs are given at equally spaced inputs, take differences between consecutive outputs, then differences of those differences, and so on. The degree of the polynomial is the smallest n for which the nth differences are constant.",
        },
        {
          type: "table",
          caption: "Successive differences for outputs of x³ at x = 0, 1, 2, 3, 4, 5",
          columns: ["Row", "Values"],
          rows: [
            ["Outputs", "0, 1, 8, 27, 64, 125"],
            ["First differences", "1, 7, 19, 37, 61"],
            ["Second differences", "6, 12, 18, 24"],
            ["Third differences", "6, 6, 6"],
          ],
        },
        {
          type: "paragraph",
          text: "The third differences are the first constant row, so the degree is 3. This works only when the inputs are equally spaced.",
        },
      ],
      takeaway:
        "The degree is the number of times you must take differences before they become constant.",
    },
    {
      id: "even-and-odd",
      title: "Even and odd functions have symmetry.",
      conceptTitle: "Even and odd functions",
      blocks: [
        {
          type: "paragraph",
          text: "A function f is an even function if f(−x) = f(x) for every x in its domain. Its graph is symmetric about the y-axis, and power functions with even exponents, such as x² and x⁴, are even. A function f is an odd function if f(−x) = −f(x). Its graph is symmetric about the origin, and power functions with odd exponents, such as x and x³, are odd.",
        },
        {
          type: "table",
          caption: "Testing symmetry",
          columns: ["Function", "Result of replacing x with −x", "Type"],
          rows: [
            ["x⁴ − 3x² + 1", "x⁴ − 3x² + 1, the same function", "Even"],
            ["x³ − 5x", "−x³ + 5x, the opposite of the function", "Odd"],
            ["x³ + x²", "−x³ + x², neither the same nor the opposite", "Neither"],
          ],
        },
      ],
      takeaway:
        "Replace x with −x. The same function means even, the opposite means odd, and anything else means neither.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-5-multiplicity",
      topicId: "precalculus-1-5",
      term: "Multiplicity",
      definition:
        "The number of times a factor (x − a) appears in a polynomial, which is the multiplicity of the zero a.",
    },
    {
      id: "precalculus-1-5-complex-number",
      topicId: "precalculus-1-5",
      term: "Complex number",
      definition:
        "A number of the form a + bi, where a and b are real numbers and i² = −1.",
    },
    {
      id: "precalculus-1-5-conjugate-pair",
      topicId: "precalculus-1-5",
      term: "Conjugate pair",
      definition:
        "Two complex numbers a + bi and a − bi that differ only in the sign of the imaginary part.",
    },
    {
      id: "precalculus-1-5-successive-differences",
      topicId: "precalculus-1-5",
      term: "Successive differences",
      definition:
        "Differences between consecutive outputs, then differences of those differences, and so on, taken at equally spaced inputs.",
    },
    {
      id: "precalculus-1-5-even-function",
      topicId: "precalculus-1-5",
      term: "Even function",
      definition:
        "A function with f(−x) = f(x) for every x in its domain, so its graph is symmetric about the y-axis.",
    },
    {
      id: "precalculus-1-5-odd-function",
      topicId: "precalculus-1-5",
      term: "Odd function",
      definition:
        "A function with f(−x) = −f(x) for every x in its domain, so its graph is symmetric about the origin.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-5-c1",
      topicId: "precalculus-1-5",
      type: "Look back",
      title: "Turning points sit between zeros",
      body: "Topic 1.4 showed there is at least one turning point between two distinct real zeros. Multiplicity adds a twist: at a zero of even multiplicity the graph itself turns around right on the x-axis.",
      transferQuestion: "How does a double zero relate to a local extremum?",
      feedback:
        "At a zero of even multiplicity the graph touches the axis and turns, so that zero is also a local maximum or minimum.",
      links: [
        {
          topicId: "precalculus-1-4",
          sectionId: "extrema-and-zeros",
          label: "Review zeros and turning points",
        },
      ],
    },
    {
      id: "precalculus-1-5-c2",
      topicId: "precalculus-1-5",
      type: "Looking ahead",
      title: "Zeros will help with rational functions",
      body: "In Topics 1.8 through 1.10 the zeros of numerators and denominators decide where rational functions cross, approach, or skip the x-axis. Multiplicity reappears there when you compare numerator and denominator factors.",
      transferQuestion:
        "If a factor appears in both a numerator and a denominator, what do you expect to happen at that input?",
      feedback:
        "Expect something special to happen there. Topic 1.10 shows it can create a hole in the graph.",
      links: [
        {
          topicId: "precalculus-1-10",
          sectionId: "hole-condition",
          label: "Preview holes",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-5"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-zero",
      "precalculus-1-4-polynomial",
      "precalculus-1-4-degree",
      "precalculus-1-5-multiplicity",
      "precalculus-1-5-complex-number",
      "precalculus-1-5-conjugate-pair",
      "precalculus-1-5-successive-differences",
      "precalculus-1-5-even-function",
      "precalculus-1-5-odd-function",
    ],
  },
};

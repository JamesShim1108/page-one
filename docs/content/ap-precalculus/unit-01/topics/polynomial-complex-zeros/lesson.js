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
    "Zeros and linear factors, multiplicity, complex zeros and conjugates, degree from successive differences, and even and odd functions.",
  minutes: 15,
  learningGoals: [
    "1.5.A Identify key characteristics of a polynomial function related to its zeros when suitable factorizations are available or with technology.",
    "1.5.B Determine if a polynomial function is even or odd.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "The zeros of a polynomial function, counted with multiplicity, determine its linear factors, where its graph crosses or is tangent to the x-axis, and the endpoints of the intervals where it is positive or negative.",
  context:
    "Topic 1.4 showed that relative extrema sit between real zeros. This topic studies the zeros themselves, including non-real zeros that never appear on the graph but still count toward the degree.",
  sections: [
    {
      id: "zeros-and-factors",
      title:
        "1.5.A · A real number a is a zero of p if and only if (x − a) is a linear factor of p.",
      conceptTitle: "Zeros and linear factors",
      blocks: [
        {
          type: "paragraph",
          text: "If a is a complex number and p(a) = 0, then a is a zero of the polynomial function p, or a root of the equation p(x) = 0. If a is a real number, then (x − a) is a linear factor of p if and only if a is a zero of p, and the graph of y = p(x) has an x-intercept at the point (a, 0). For example, p(x) = x³ − 2x² − 5x + 6 = (x − 1)(x + 2)(x − 3), so the real zeros of p are 1, −2, and 3.",
        },
        {
          type: "paragraph",
          text: "Real zeros of a polynomial can be endpoints for intervals satisfying polynomial inequalities. To solve p(x) > 0, find the real zeros, then determine the sign of p(x) on each interval between them.",
        },
        {
          type: "table",
          caption: "Sign of p(x) = (x − 1)(x + 2)(x − 3) on each interval",
          columns: [
            "Interval",
            "Sign of x − 1",
            "Sign of x + 2",
            "Sign of x − 3",
            "Sign of p(x)",
          ],
          rows: [
            ["x < −2", "−", "−", "−", "Negative"],
            ["−2 < x < 1", "−", "+", "−", "Positive"],
            ["1 < x < 3", "+", "+", "−", "Negative"],
            ["x > 3", "+", "+", "+", "Positive"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "p(x) > 0 for −2 < x < 1 and for x > 3, because on those intervals the product (x − 1)(x + 2)(x − 3) has an even number of negative factors.",
        },
      ],
      takeaway:
        "Real zeros give linear factors, x-intercepts, and the endpoints of the intervals where p(x) > 0 or p(x) < 0.",
    },
    {
      id: "multiplicity",
      title: "1.5.A · A repeated linear factor gives a zero with multiplicity.",
      conceptTitle: "Multiplicity",
      blocks: [
        {
          type: "paragraph",
          text: "If a linear factor (x − a) is repeated n times, the corresponding zero has multiplicity n. A polynomial function of degree n has exactly n complex zeros when multiplicities are counted. For p(x) = (x + 1)²(x − 2)³, the zero −1 has multiplicity 2, the zero 2 has multiplicity 3, and the degree is 5.",
        },
        {
          type: "paragraph",
          text: "If a real zero a has even multiplicity, then the signs of the output values are the same for input values near x = a, and the graph is tangent to the x-axis at x = a. If a has odd multiplicity, the output values change sign and the graph crosses the x-axis.",
        },
        {
          type: "table",
          caption: "Multiplicity and the graph of p(x) = (x + 1)²(x − 2)³",
          columns: ["Zero", "Multiplicity", "Graph near the zero"],
          rows: [
            ["−1", "2 (even)", "Tangent to the x-axis; p(x) < 0 on both sides"],
            [
              "2",
              "3 (odd)",
              "Crosses the x-axis; p(x) changes from negative to positive",
            ],
          ],
        },
      ],
      takeaway:
        "Even multiplicity: same sign on both sides and tangent to the x-axis. Odd multiplicity: the sign changes and the graph crosses.",
    },
    {
      id: "conjugate-zeros",
      title: "1.5.A · Non-real zeros come in conjugate pairs.",
      conceptTitle: "Complex zeros and conjugates",
      blocks: [
        {
          type: "paragraph",
          text: "A complex number has the form a + bi, where a and b are real and i² = −1. If a + bi is a non-real zero of a polynomial function p, then its conjugate a − bi is also a zero of p. For example, x² − 2x + 5 has zeros 1 + 2i and 1 − 2i.",
        },
        {
          type: "paragraph",
          text: "Non-real zeros are not x-intercepts, but they count toward the degree. The function p(x) = (x² + 4)(x − 1) has degree 3 and three complex zeros, 2i, −2i, and 1, but its graph has only one x-intercept, at (1, 0). Because non-real zeros come in pairs, a polynomial of odd degree has at least one real zero.",
        },
      ],
      takeaway:
        "Non-real zeros come in conjugate pairs, and every zero counts toward the degree.",
    },
    {
      id: "degree-from-differences",
      title:
        "1.5.A · The degree is the least n for which the nth differences are constant.",
      conceptTitle: "Degree from successive differences",
      blocks: [
        {
          type: "paragraph",
          text: "The degree of a polynomial function can be found by examining the successive differences of the output values over equal-interval input values. The degree is equal to the least value n for which the successive nth differences are constant.",
        },
        {
          type: "table",
          caption:
            "Successive differences of the output values of x³ at x = 0, 1, 2, 3, 4, 5",
          columns: ["Row", "Values"],
          rows: [
            ["Output values", "0, 1, 8, 27, 64, 125"],
            ["1st differences", "1, 7, 19, 37, 61"],
            ["2nd differences", "6, 12, 18, 24"],
            ["3rd differences", "6, 6, 6"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Because the 3rd differences in the output values are a constant 6 over consecutive equal-length input-value intervals, and the 2nd differences are not constant, the polynomial has degree 3.",
        },
      ],
      takeaway: "Count how many rows of differences it takes to reach a constant row.",
    },
    {
      id: "even-and-odd",
      title:
        "1.5.B · Even functions satisfy f(−x) = f(x); odd functions satisfy f(−x) = −f(x).",
      conceptTitle: "Even and odd functions",
      blocks: [
        {
          type: "paragraph",
          text: "An even function is graphically symmetric over the line x = 0 and analytically has the property f(−x) = f(x). An odd function is graphically symmetric about the point (0, 0) and analytically has the property f(−x) = −f(x). If n is even, p(x) = aₙxⁿ (with n ≥ 1 and aₙ ≠ 0) is an even function, and if n is odd, it is an odd function.",
        },
        {
          type: "table",
          caption: "Testing f(−x)",
          columns: ["f(x)", "f(−x)", "Conclusion"],
          rows: [
            ["x⁴ − 3x² + 1", "x⁴ − 3x² + 1 = f(x)", "Even"],
            ["x³ − 5x", "−x³ + 5x = −f(x)", "Odd"],
            ["x³ + x²", "−x³ + x², which is neither f(x) nor −f(x)", "Neither"],
          ],
        },
        {
          type: "paragraph",
          text: "Symmetry carries features across. If p is odd and p(3) = −4 is a relative maximum, then p(−3) = 4 is a relative minimum, because the point (3, −4) reflects through the origin to (−3, 4) and a high point becomes a low point.",
        },
      ],
      takeaway:
        "Evaluate f(−x): equal to f(x) means even, equal to −f(x) means odd, otherwise neither.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-5-multiplicity",
      topicId: "precalculus-1-5",
      term: "Multiplicity",
      definition:
        "The number of times a linear factor (x − a) is repeated in a polynomial, which is the multiplicity of the zero a.",
    },
    {
      id: "precalculus-1-5-complex-number",
      topicId: "precalculus-1-5",
      term: "Complex number",
      definition:
        "A number of the form a + bi, where a and b are real numbers and i² = −1.",
    },
    {
      id: "precalculus-1-5-conjugate",
      topicId: "precalculus-1-5",
      term: "Conjugate",
      definition: "The conjugate of a + bi is a − bi.",
    },
    {
      id: "precalculus-1-5-successive-differences",
      topicId: "precalculus-1-5",
      term: "Successive differences",
      definition:
        "Differences of consecutive output values over equal-interval input values, then differences of those differences, and so on.",
    },
    {
      id: "precalculus-1-5-even-function",
      topicId: "precalculus-1-5",
      term: "Even function",
      definition:
        "A function with f(−x) = f(x) for every x in its domain. Its graph is symmetric over the line x = 0.",
    },
    {
      id: "precalculus-1-5-odd-function",
      topicId: "precalculus-1-5",
      term: "Odd function",
      definition:
        "A function with f(−x) = −f(x) for every x in its domain. Its graph is symmetric about the point (0, 0).",
    },
  ],
  connections: [
    {
      id: "precalculus-1-5-c1",
      topicId: "precalculus-1-5",
      type: "Look back",
      title: "Relative extrema sit between zeros",
      body: "Topic 1.4 showed there is a relative extremum between two distinct real zeros. At a zero of even multiplicity, the graph is tangent to the x-axis, so the zero is itself a relative extremum.",
      transferQuestion:
        "Why is a real zero of even multiplicity also a relative maximum or minimum?",
      feedback:
        "The output values have the same sign on both sides, so the value 0 is less than (or greater than) all nearby output values.",
      links: [
        {
          topicId: "precalculus-1-4",
          sectionId: "extrema-and-zeros",
          label: "Review extrema between zeros",
        },
      ],
    },
    {
      id: "precalculus-1-5-c2",
      topicId: "precalculus-1-5",
      type: "Looking ahead",
      title: "Multiplicity decides holes and asymptotes",
      body: "In Topics 1.9 and 1.10 you compare the multiplicity of a zero in a numerator with its multiplicity in a denominator to decide whether a rational function has a vertical asymptote or a hole.",
      transferQuestion:
        "If a factor appears in both the numerator and the denominator of a rational function, what might happen at that input value?",
      feedback:
        "The graph may have a hole there instead of an asymptote, depending on the multiplicities.",
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
      "precalculus-1-5-conjugate",
      "precalculus-1-5-successive-differences",
      "precalculus-1-5-even-function",
      "precalculus-1-5-odd-function",
    ],
  },
};

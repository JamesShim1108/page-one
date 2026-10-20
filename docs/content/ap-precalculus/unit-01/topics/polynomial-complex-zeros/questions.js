// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-5-q01",
      topicId: "precalculus-1-5",
      concept: "multiplicity",
      difficulty: "Quick check",
      skill: "equivalent-forms",
      prompt:
        "The polynomial function p is given by p(x) = (x + 3)(x − 2)²(x − 5). Which of the following lists the zeros of p with their multiplicities?",
      choices: [
        "−3 with multiplicity 1, 2 with multiplicity 1, 5 with multiplicity 2",
        "−3 with multiplicity 1, 2 with multiplicity 2, 5 with multiplicity 1",
        "3 with multiplicity 1, −2 with multiplicity 2, −5 with multiplicity 1",
        "−3 with multiplicity 2, 2 with multiplicity 1, 5 with multiplicity 1",
      ],
      correctAnswer: 1,
      explanation:
        "Each linear factor (x − a) gives the zero a. The factor (x − 2) is repeated twice, so 2 has multiplicity 2; −3 and 5 each have multiplicity 1.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The exponent 2 is on the factor (x − 2), not (x − 5).",
        "The zeros are −3, 2, and 5, and only (x − 2) is repeated.",
        "The signs are reversed. The zero of (x + 3) is −3.",
        "The exponent 2 is on (x − 2), so 2 has multiplicity 2.",
      ],
      nearMissIndex: 0,
      distinguisher: "The exponent belongs to the zero of the factor it is attached to.",
    },
    {
      id: "precalculus-1-5-q02",
      topicId: "precalculus-1-5",
      concept: "multiplicity",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The polynomial function p is given by p(x) = x(x − 3)²(x + 1). At which of the following values of x is the graph of y = p(x) tangent to the x-axis?",
      choices: [
        "x = 0",
        "x = −1",
        "x = 3",
        "None; the graph crosses the x-axis at every zero",
      ],
      correctAnswer: 2,
      explanation:
        "3 is a zero of multiplicity 2, which is even, so the output values have the same sign on both sides of x = 3 and the graph is tangent to the x-axis there.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "0 has multiplicity 1, so p(x) changes sign and the graph crosses the x-axis.",
        "−1 has multiplicity 1, so the graph crosses the x-axis there.",
        "The factor (x − 3)² gives even multiplicity, so the graph is tangent to the x-axis at x = 3.",
        "The zero at x = 3 has even multiplicity, so the graph does not cross there.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Only a zero of even multiplicity keeps the same sign on both sides.",
    },
    {
      id: "precalculus-1-5-q03",
      topicId: "precalculus-1-5",
      concept: "conjugate-zeros",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The polynomial function p has real coefficients, and 3 − 2i is a zero of p. Which of the following must also be a zero of p?",
      choices: ["3 + 2i", "−3 + 2i", "−3 − 2i", "2 − 3i"],
      correctAnswer: 0,
      explanation:
        "If a + bi is a non-real zero of p, then its conjugate a − bi is also a zero. The conjugate of 3 − 2i is 3 + 2i.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The conjugate keeps the real part 3 and changes the sign of the imaginary part.",
        "This changes the real part. The conjugate keeps the real part the same.",
        "This negates the whole number. The conjugate changes only the imaginary part.",
        "This swaps the real and imaginary parts, which is not the conjugate.",
      ],
      nearMissIndex: 1,
      distinguisher: "A conjugate changes only the sign of the imaginary part.",
    },
    {
      id: "precalculus-1-5-q04",
      topicId: "precalculus-1-5",
      concept: "even-and-odd",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The polynomial function p is an even function. If p(2) = 5 is a relative minimum of p, which of the following statements about p(−2) must be true?",
      choices: [
        "p(−2) = −5 is a relative maximum.",
        "p(−2) = 5 is a relative maximum.",
        "p(−2) = −5 is a relative minimum.",
        "p(−2) = 5 is also a relative minimum.",
      ],
      correctAnswer: 3,
      explanation:
        "An even function satisfies p(−x) = p(x), so p(−2) = 5, and its graph is symmetric over the line x = 0. A reflection over a vertical line keeps a low point low, so p(−2) = 5 is also a relative minimum.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "p(−2) = −p(2) describes an odd function. For an even function, p(−2) = p(2) = 5.",
        "The value 5 is correct, but reflecting over the line x = 0 keeps a relative minimum a minimum.",
        "For an even function, p(−2) = p(2), so the value is 5, not −5.",
        "p(−2) = p(2) = 5, and the reflection over x = 0 keeps it a relative minimum.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Even: reflect over x = 0, which keeps highs high and lows low. Odd: reflect through the origin, which swaps them.",
    },
    {
      id: "precalculus-1-5-q05",
      topicId: "precalculus-1-5",
      concept: "zeros-and-factors",
      difficulty: "Core",
      skill: "solve",
      prompt:
        "The polynomial function p is given by p(x) = (x − 1)(x + 2)(x − 3). What are all values of x for which p(x) > 0?",
      choices: ["x < −2 or 1 < x < 3", "−2 < x < 3", "−2 < x < 1 or x > 3", "x > 3 only"],
      correctAnswer: 2,
      explanation:
        "The real zeros −2, 1, and 3 are the endpoints of the intervals. Testing one value in each interval gives signs negative, positive, negative, positive from left to right.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "These are the intervals where p(x) < 0.",
        "p(x) changes sign at x = 1, so it is not positive on all of −2 < x < 3.",
        "p(x) is positive for −2 < x < 1 and for x > 3.",
        "p(x) is also positive for −2 < x < 1.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Each real zero of odd multiplicity is an endpoint where the sign changes.",
    },
    {
      id: "precalculus-1-5-q06",
      topicId: "precalculus-1-5",
      concept: "degree-from-differences",
      difficulty: "Core",
      skill: "construct-representations",
      prompt:
        "The table gives values of a polynomial function f for equally spaced values of x. What is the degree of f?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of f",
          columns: ["x", "f(x)"],
          rows: [
            ["0", "1"],
            ["1", "2"],
            ["2", "15"],
            ["3", "52"],
            ["4", "125"],
            ["5", "246"],
          ],
        },
      ],
      choices: ["3", "2", "4", "12"],
      correctAnswer: 0,
      explanation:
        "The 1st differences are 1, 13, 37, 73, 121; the 2nd differences are 12, 24, 36, 48; the 3rd differences are 12, 12, 12. The least n for which the nth differences are constant is 3.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The 3rd differences are the first constant differences, so the degree is 3.",
        "The 2nd differences, 12, 24, 36, 48, are not constant.",
        "The 3rd differences are already constant, so the least such n is 3, not 4.",
        "12 is the value of the constant 3rd differences, not the degree.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "The degree counts rows of differences. It is not the constant value itself.",
    },
    {
      id: "precalculus-1-5-q07",
      topicId: "precalculus-1-5",
      concept: "even-and-odd",
      difficulty: "Core",
      skill: "identify-information",
      prompt: "Which of the following functions is an odd function?",
      choices: [
        "f(x) = x³ + x²",
        "f(x) = x⁴ − 3x² + 1",
        "f(x) = x³ − 5x",
        "f(x) = x² + 2x",
      ],
      correctAnswer: 2,
      explanation:
        "For f(x) = x³ − 5x, f(−x) = −x³ + 5x = −(x³ − 5x) = −f(x), so f is odd.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "f(−x) = −x³ + x², which is neither f(x) nor −f(x).",
        "f(−x) = f(x), so this function is even.",
        "Every term has an odd power, so f(−x) = −f(x).",
        "f(−x) = x² − 2x, which is neither f(x) nor −f(x).",
      ],
      nearMissIndex: 0,
      distinguisher: "An odd polynomial needs every power of x to be odd.",
    },
    {
      id: "precalculus-1-5-q08",
      topicId: "precalculus-1-5",
      concept: "multiplicity",
      difficulty: "Core",
      skill: "construct-representations",
      prompt:
        "The figure shows the graph of a polynomial function g. Which of the following could be an expression for g(x)?",
      stimulusBlocks: [
        {
          type: "graph",
          caption: "Graph of y = g(x)",
          alt: "A polynomial graph that crosses the x-axis at x = −4, touches the x-axis and turns back at x = 1, and crosses the x-axis again at x = 5. It is negative between −4 and 5 except at x = 1, and positive for x < −4 and x > 5.",
          window: {
            x: [-6, 7],
            y: [-16, 12],
          },
          ticks: {
            x: 1,
            y: 4,
          },
          functions: [
            {
              expr: "0.1(x + 4)(x - 1)^2 (x - 5)",
              label: "g",
              labelAt: 6.2,
              labelPosition: "w",
            },
          ],
        },
      ],
      choices: [
        "0.1(x − 4)(x + 1)²(x + 5)",
        "0.1(x + 4)²(x − 1)(x − 5)",
        "−0.1(x + 4)(x − 1)²(x − 5)",
        "0.1(x + 4)(x − 1)²(x − 5)",
      ],
      correctAnswer: 3,
      explanation:
        "The graph crosses the x-axis at x = −4 and x = 5, so those zeros have odd multiplicity, and it is tangent to the x-axis at x = 1, so that zero has even multiplicity. The ends rise, so the leading coefficient is positive: 0.1(x + 4)(x − 1)²(x − 5).",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The signs are reversed: this has zeros at 4, −1, and −5.",
        "This makes −4 the zero of even multiplicity, so the graph would be tangent at x = −4, not x = 1.",
        "The negative leading coefficient would make both ends decrease without bound.",
        "Odd multiplicity at −4 and 5, even multiplicity at 1, and a positive leading coefficient match the graph.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Read multiplicity from crossing versus tangency, then check the end behavior for the sign.",
    },
    {
      id: "precalculus-1-5-q09",
      topicId: "precalculus-1-5",
      concept: "conjugate-zeros",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A polynomial function p of degree 5 has real coefficients. Two of its zeros are 2 + i and 1 − 3i. What is the greatest number of real zeros p can have, counting multiplicities?",
      choices: ["3", "1", "2", "5"],
      correctAnswer: 1,
      explanation:
        "The conjugates 2 − i and 1 + 3i must also be zeros, so at least 4 of the 5 complex zeros are non-real. At most 1 zero is real.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The two given zeros each require their conjugates, so only 5 − 4 = 1 zero can be real.",
        "Four non-real zeros are required, leaving exactly one zero, which must be real.",
        "Two real zeros would bring the total to 6, more than the degree.",
        "Non-real zeros are not real, and four of the five zeros are non-real.",
      ],
      nearMissIndex: 0,
      distinguisher: "Count each non-real zero together with its conjugate.",
    },
    {
      id: "precalculus-1-5-q10",
      topicId: "precalculus-1-5",
      concept: "conjugate-zeros",
      difficulty: "Apply",
      skill: "describe",
      prompt:
        "The polynomial function p is given by p(x) = (x² + 9)(x − 4). Which of the following statements is true?",
      choices: [
        "p has three complex zeros, and the graph of p has one x-intercept, at (4, 0).",
        "The graph of p has three x-intercepts, because p has degree 3.",
        "The graph of p has no x-intercepts, because x² + 9 is never 0.",
        "The graph of p has two x-intercepts, at (4, 0) and (9, 0).",
      ],
      correctAnswer: 0,
      explanation:
        "x² + 9 = 0 gives the non-real zeros 3i and −3i, which are not x-intercepts. x − 4 = 0 gives the real zero 4. All three zeros count toward the degree.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The zeros are 3i, −3i, and 4, and only the real zero 4 is an x-intercept.",
        "The degree counts complex zeros, but only real zeros are x-intercepts.",
        "The factor x − 4 still gives a real zero.",
        "x² + 9 has no real zeros, so 9 is not a zero of p.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Every zero counts toward the degree, but only real zeros are x-intercepts.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-5-quick",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-5",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-1-5-q01",
        "precalculus-1-5-q02",
        "precalculus-1-5-q03",
        "precalculus-1-5-q04",
      ],
    },
    {
      id: "precalculus-1-5-quiz",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-5",
      title: "Polynomial Functions and Complex Zeros topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-1-5-q05",
        "precalculus-1-5-q06",
        "precalculus-1-5-q07",
        "precalculus-1-5-q08",
        "precalculus-1-5-q09",
        "precalculus-1-5-q10",
      ],
    },
  ],
};

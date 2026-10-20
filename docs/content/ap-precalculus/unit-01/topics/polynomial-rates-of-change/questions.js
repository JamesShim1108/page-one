// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-4-q01",
      topicId: "precalculus-1-4",
      concept: "polynomial-terms",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The polynomial function p is given by p(x) = 5 + 2x³ − 7x⁴ + x. What are the degree and the leading coefficient of p?",
      choices: [
        "Degree 4; leading coefficient −7",
        "Degree 4; leading coefficient 7",
        "Degree 3; leading coefficient 2",
        "Degree 4; leading coefficient 5",
      ],
      correctAnswer: 0,
      explanation:
        "The term with the greatest power of x is −7x⁴, so the degree is 4 and the leading coefficient is −7.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "The leading term is −7x⁴, so the degree is 4 and the leading coefficient is −7.",
        "The degree is right, but the sign is lost. The coefficient of x⁴ is −7.",
        "2x³ is not the term with the greatest power. Order the terms from highest power to lowest.",
        "5 is the constant term, not the coefficient of the leading term.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Order the terms by power and keep the sign of the leading coefficient.",
    },
    {
      id: "precalculus-1-4-q02",
      topicId: "precalculus-1-4",
      concept: "polynomial-terms",
      difficulty: "Quick check",
      skill: "describe",
      prompt: "Which of the following defines a polynomial function?",
      choices: [
        "f(x) = x³ + 2x + x⁻¹",
        "f(x) = (4x³ + x + 1)/x",
        "f(x) = 3x⁴ − √x + 1",
        "f(x) = (x² − 1)(x + 4)",
      ],
      correctAnswer: 3,
      explanation:
        "(x² − 1)(x + 4) is equivalent to x³ + 4x² − x − 4, a sum of terms with nonnegative integer powers of x.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "x⁻¹ = 1/x has a negative exponent, so this is not a polynomial.",
        "This is equivalent to 4x² + 1 + 1/x, which has x in a denominator.",
        "√x has exponent 1/2, which is not an integer.",
        "Expanding gives x³ + 4x² − x − 4, so this is a polynomial function.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A product of polynomials is a polynomial, but negative and fractional powers are not allowed.",
    },
    {
      id: "precalculus-1-4-q03",
      topicId: "precalculus-1-4",
      concept: "extrema",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The polynomial function f is given by f(x) = x³ − 3x. The table gives values of f(x) for selected values of x. Based on the table, at which value of x does f have a relative maximum?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of f",
          columns: ["x", "f(x)"],
          rows: [
            ["−2", "−2"],
            ["−1", "2"],
            ["0", "0"],
            ["1", "−2"],
            ["2", "2"],
          ],
        },
      ],
      choices: ["x = 2", "x = −1", "x = 1", "x = −2"],
      correctAnswer: 1,
      explanation:
        "As x increases from −2 to −1, f(x) increases, and as x increases from −1 to 1, f(x) decreases. f changes from increasing to decreasing at x = −1, so f has a relative maximum there.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "f(2) = 2 equals f(−1), but f is still increasing at x = 2, so there is no relative maximum there.",
        "f changes from increasing to decreasing at x = −1.",
        "f changes from decreasing to increasing at x = 1, which is a relative minimum.",
        "f(−2) = −2 is less than f(−1) = 2, and f is increasing from x = −2 to x = −1, so x = −2 is not a relative maximum.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A relative maximum needs the function to change from increasing to decreasing, not just a large output value.",
    },
    {
      id: "precalculus-1-4-q04",
      topicId: "precalculus-1-4",
      concept: "inflection",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The graph of a polynomial function changes from concave up to concave down at x = a. Which of the following must be true at x = a?",
      choices: [
        "The function has a relative maximum.",
        "The function has a zero.",
        "The graph has a point of inflection.",
        "The function changes from increasing to decreasing.",
      ],
      correctAnswer: 2,
      explanation:
        "A change in concavity is exactly a point of inflection: the rate of change switches from increasing to decreasing at x = a.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "A relative maximum is a change in direction. A graph can be concave down on both sides of one.",
        "A zero is an input value where the output value is 0, which is unrelated to concavity.",
        "A change between concave up and concave down is a point of inflection.",
        "A change from increasing to decreasing is a relative maximum, not a change in concavity.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Concavity changes at a point of inflection. Direction changes at a relative extremum.",
    },
    {
      id: "precalculus-1-4-q05",
      topicId: "precalculus-1-4",
      concept: "extrema",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "Which of the following statements must be true for every polynomial function of even degree?",
      choices: [
        "It has both an absolute maximum value and an absolute minimum value.",
        "It has either an absolute maximum or an absolute minimum.",
        "It has exactly one real zero.",
        "Its graph is concave up on its entire domain.",
      ],
      correctAnswer: 1,
      explanation:
        "The ends of the graph of an even-degree polynomial point the same way, so it has an absolute minimum if both ends rise and an absolute maximum if both ends fall.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "If both ends rise, there is no absolute maximum. The function has only one of the two.",
        "Both ends point the same way, so there is either a greatest or a least output value.",
        "x² + 1 has no real zeros, and x⁴ − 5x² + 4 has four.",
        "−x² and x⁴ − 3x² are concave down on some intervals.",
      ],
      nearMissIndex: 0,
      distinguisher: "Ends that point the same way give one absolute extremum, not both.",
    },
    {
      id: "precalculus-1-4-q06",
      topicId: "precalculus-1-4",
      concept: "extrema-and-zeros",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A polynomial function p has real zeros at x = −3 and x = 5 and no real zeros between them. Which of the following statements must be true?",
      choices: [
        "p has at least one relative extremum on the interval −3 < x < 5.",
        "p has exactly one relative extremum on the interval −3 < x < 5.",
        "p is increasing on the interval −3 < x < 5.",
        "p has a zero at x = 1, the midpoint of −3 and 5.",
      ],
      correctAnswer: 0,
      explanation:
        "Between two distinct real zeros of a nonconstant polynomial function there must be at least one input value where the function has a relative maximum or minimum.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "p(−3) = p(5) = 0, so p must change direction at least once between them.",
        "At least one is guaranteed, but there could be more than one.",
        "p(−3) = p(5), so p cannot be increasing on the whole interval.",
        "Nothing requires a zero at the midpoint, and the problem says there are no zeros between them.",
      ],
      nearMissIndex: 1,
      distinguisher: "The guarantee is at least one relative extremum, not exactly one.",
    },
    {
      id: "precalculus-1-4-q07",
      topicId: "precalculus-1-4",
      concept: "inflection",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The function f is given by f(x) = x³. The table gives the change in f(x) over consecutive intervals of length 1. Based on the table, near which value of x does the graph of f have a point of inflection?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Changes in f(x)",
          columns: ["Interval", "Change in f(x)"],
          rows: [
            ["[−2, −1]", "7"],
            ["[−1, 0]", "1"],
            ["[0, 1]", "1"],
            ["[1, 2]", "7"],
          ],
        },
      ],
      choices: [
        "x = −2",
        "x = 2",
        "None; the graph of f is concave up everywhere",
        "x = 0",
      ],
      correctAnswer: 3,
      explanation:
        "The changes decrease from 7 to 1 for x < 0, so the graph is concave down there, then increase from 1 to 7 for x > 0, so it is concave up. The concavity changes at x = 0.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "x = −2 is an endpoint of the table, and the concavity does not change there.",
        "x = 2 is where the output value is greatest in the table, which is not a concavity feature.",
        "f is increasing everywhere, but its rate of change decreases and then increases, so the concavity changes.",
        "The rate of change changes from decreasing to increasing at x = 0.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Increasing output values do not mean concave up. Look at how the changes change.",
    },
    {
      id: "precalculus-1-4-q08",
      topicId: "precalculus-1-4",
      concept: "polynomial-terms",
      difficulty: "Core",
      skill: "equivalent-forms",
      prompt:
        "The polynomial function p is given by p(x) = (2x − 1)²(x + 3)(x² + 1). What are the degree and the leading coefficient of p?",
      choices: [
        "Degree 5; leading coefficient 2",
        "Degree 6; leading coefficient 4",
        "Degree 5; leading coefficient 4",
        "Degree 4; leading coefficient 4",
      ],
      correctAnswer: 2,
      explanation:
        "The leading terms multiply to (2x)² · x · x² = 4x⁵, so the degree is 5 and the leading coefficient is 4.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "The leading term of (2x − 1)² is (2x)² = 4x², so the leading coefficient is 4, not 2.",
        "The degrees add as 2 + 1 + 2 = 5, not 6.",
        "(2x)² · x · x² = 4x⁵.",
        "The degrees add to 5, not 4.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Multiply the leading terms of the factors, and square the coefficient 2 along with x.",
    },
    {
      id: "precalculus-1-4-q09",
      topicId: "precalculus-1-4",
      concept: "extrema",
      difficulty: "Core",
      skill: "solve",
      prompt:
        "The quadratic function r is given by r(x) = −2x² + 8x − 3. What is the absolute maximum value of r?",
      choices: ["5", "2", "−3", "8"],
      correctAnswer: 0,
      explanation:
        "The vertex is at x = −8/(2(−2)) = 2. The absolute maximum value is r(2) = −8 + 16 − 3 = 5.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "r(2) = −2(4) + 16 − 3 = 5.",
        "2 is the input value where the maximum occurs, not the maximum value.",
        "−3 is r(0), not the maximum.",
        "8 is a coefficient, not an output value of r.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The maximum value is an output value, not the input value where it occurs.",
    },
    {
      id: "precalculus-1-4-q10",
      topicId: "precalculus-1-4",
      concept: "extrema",
      difficulty: "Apply",
      skill: "apply-results",
      prompt:
        "The temperature, in degrees Fahrenheit, at a weather station is modeled by a polynomial function T, where h is the number of hours after midnight for 0 ≤ h ≤ 24. T has a relative maximum at h = 15. Which of the following statements is best supported?",
      choices: [
        "The temperature at h = 15 is the greatest temperature for the whole interval 0 ≤ h ≤ 24.",
        "The temperature stays constant for all times from h = 15 to h = 24.",
        "The temperature is decreasing for times just before h = 15 and increasing just after.",
        "The temperature at h = 15 is greater than at times just before and just after h = 15.",
      ],
      correctAnswer: 3,
      explanation:
        "At a relative maximum the function changes from increasing to decreasing, so the output value is greater than nearby output values. It need not be the absolute maximum on 0 ≤ h ≤ 24.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "That describes an absolute maximum. A relative maximum is only greater than nearby values.",
        "A relative maximum is a change in direction, not a stretch of constant values.",
        "Just before a relative maximum the function is increasing, not decreasing.",
        "T changes from increasing to decreasing at h = 15.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Relative compares with nearby output values. Absolute compares with all output values.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-4-quick",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-4",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-1-4-q01",
        "precalculus-1-4-q02",
        "precalculus-1-4-q03",
        "precalculus-1-4-q04",
      ],
    },
    {
      id: "precalculus-1-4-quiz",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-4",
      title: "Polynomial Functions and Rates of Change topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-1-4-q05",
        "precalculus-1-4-q06",
        "precalculus-1-4-q07",
        "precalculus-1-4-q08",
        "precalculus-1-4-q09",
        "precalculus-1-4-q10",
      ],
    },
  ],
};

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
      prompt: "What are the degree and leading coefficient of p(x) = 5 + 2x³ − 7x⁴ + x?",
      choices: [
        "Degree 4, leading coefficient −7",
        "Degree 4, leading coefficient 7",
        "Degree 3, with leading coefficient 2",
        "Degree 4, leading coefficient 5",
      ],
      correctAnswer: 0,
      explanation:
        "The highest power is x⁴, so the degree is 4. The coefficient of that term is −7, so the leading coefficient is −7.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "The highest-power term is −7x⁴, giving degree 4 and leading coefficient −7.",
        "The degree is correct, but the sign is dropped. The coefficient of x⁴ is −7, not 7.",
        "This takes the first power that appears in the list, not the highest power. Rewrite the terms from highest power to lowest.",
        "5 is the constant term. The leading coefficient belongs to the highest power, not the first number written.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Reorder from highest to lowest power before reading the leading coefficient, and keep its sign.",
    },
    {
      id: "precalculus-1-4-q02",
      topicId: "precalculus-1-4",
      concept: "polynomial-terms",
      difficulty: "Quick check",
      skill: "describe",
      prompt: "Which of the following is a polynomial function?",
      choices: [
        "f(x) = x³ + 2x + x⁻¹",
        "f(x) = (4x³ + 1)/x",
        "f(x) = 3x⁴ − √x + 1",
        "f(x) = (x² − 1)(x + 4)",
      ],
      correctAnswer: 3,
      explanation:
        "The product (x² − 1)(x + 4) expands to x³ + 4x² − x − 4, a sum of whole-number powers. The others contain x in a denominator, under a radical, or with a negative exponent.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "The term x⁻¹ is 1/x, which has a negative exponent, so this is not a polynomial.",
        "5/x puts x in the denominator, which a polynomial cannot do.",
        "√x is x to the one-half power, which is not a whole-number power.",
        "Expanded, this is x³ + 4x² − x − 4, a sum of whole-number powers, so it is a polynomial.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Every power of x must be a whole number, even after a product is expanded.",
    },
    {
      id: "precalculus-1-4-q03",
      topicId: "precalculus-1-4",
      concept: "extrema",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "Values of f(x) = x³ − 3x are shown. Where does the table suggest that f has a local maximum?",
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
      choices: [
        "At x = 2, where the table ends",
        "Near x = −1, the second input",
        "Near x = 1, the fourth input",
        "At x = 0, the middle input",
      ],
      correctAnswer: 1,
      explanation:
        "The outputs rise from −2 to 2 as x goes from −2 to −1, then fall afterward. The switch from increasing to decreasing is near x = −1, which is a local maximum.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "x = 2 has the same output as x = −1, but the table ends there and the outputs are still rising, so it is not a local maximum.",
        "The outputs rise up to x = −1 and fall afterward, so the switch from increasing to decreasing is near x = −1.",
        "The outputs fall into x = 1 and rise afterward. That is a local minimum, not a maximum.",
        "The output 0 sits between 2 and −2 on a falling stretch, so it is not a maximum.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A local maximum has smaller outputs on both sides of it, not just the same output as another point.",
    },
    {
      id: "precalculus-1-4-q04",
      topicId: "precalculus-1-4",
      concept: "inflection",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "At which kind of point does a graph change from concave up to concave down?",
      choices: [
        "A local maximum",
        "A zero of the function",
        "An inflection point",
        "A y-intercept",
      ],
      correctAnswer: 2,
      explanation:
        "An inflection point is where the concavity of the graph changes, in either direction.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "A local maximum is where direction changes from increasing to decreasing. A graph can be concave down on both sides of one.",
        "A zero is where the output is 0, which says nothing about concavity.",
        "Concavity changes exactly at inflection points, from up to down or from down to up.",
        "A y-intercept is where the graph meets the y-axis, which has nothing to do with concavity.",
      ],
      nearMissIndex: 0,
      distinguisher: "Extrema change direction. Inflection points change concavity.",
    },
    {
      id: "precalculus-1-4-q05",
      topicId: "precalculus-1-4",
      concept: "extrema",
      difficulty: "Core",
      skill: "describe",
      prompt: "Which statement must be true of every polynomial function of even degree?",
      choices: [
        "It has both a global maximum and a global minimum.",
        "It has either a global maximum or a global minimum.",
        "It has exactly one real zero somewhere on its graph.",
        "It is concave up everywhere on its domain, like a parabola.",
      ],
      correctAnswer: 1,
      explanation:
        "Both ends of an even-degree polynomial go the same way, so the graph has an overall lowest point or an overall highest point, but not both.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "If both ends rise, there is no global maximum, and if both fall, there is no global minimum. The graph has one or the other.",
        "Both ends head the same direction, so there is either an overall lowest or an overall highest output.",
        "Even-degree polynomials can have no real zeros, such as x² + 1, or several.",
        "Even-degree polynomials can be concave down in places, such as −x² or x⁴ − 3x².",
      ],
      nearMissIndex: 0,
      distinguisher: "Same-direction ends give one global extremum, not two.",
    },
    {
      id: "precalculus-1-4-q06",
      topicId: "precalculus-1-4",
      concept: "extrema-and-zeros",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A polynomial p has real zeros at x = −3 and x = 5. Which statement must be true?",
      choices: [
        "The function p has at least one local maximum or minimum between −3 and 5.",
        "The function p has exactly one local maximum or minimum between −3 and 5, no more.",
        "The function p is increasing on every interval between −3 and 5.",
        "The function p must also have a zero at x = 1, the midpoint of −3 and 5.",
      ],
      correctAnswer: 0,
      explanation:
        "Between two distinct real zeros a polynomial must turn around at least once, so there is at least one local extremum between them. It could have more than one.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "To leave 0 and return to 0, the function must switch direction, so there is at least one turning point between the zeros.",
        "The turning point count is at least one, not exactly one. There could be more.",
        "Since p returns to the same output at both ends, it cannot be increasing the entire way.",
        "Nothing forces a zero at the midpoint. The zeros can be anywhere.",
      ],
      nearMissIndex: 1,
      distinguisher: "The guarantee is a minimum of one turning point, not exactly one.",
    },
    {
      id: "precalculus-1-4-q07",
      topicId: "precalculus-1-4",
      concept: "inflection",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The table gives the output change of f(x) = x³ over unit intervals. Where does the concavity of the graph appear to change?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Output change of f over equal intervals",
          columns: ["Interval", "Output change"],
          rows: [
            ["[−2, −1]", "7"],
            ["[−1, 0]", "1"],
            ["[0, 1]", "1"],
            ["[1, 2]", "7"],
          ],
        },
      ],
      choices: [
        "Near x = −2, where the output is smallest of the five values",
        "Near x = 2, where the output is greatest of the five values",
        "Nowhere, because the graph is concave up on its whole domain",
        "Near x = 0, where the rates switch from decreasing to increasing",
      ],
      correctAnswer: 3,
      explanation:
        "The changes fall from 7 to 1 on the left, so the graph is concave down there, then rise from 1 to 7 on the right, so it is concave up. The switch happens near x = 0.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "The smallest output is not a concavity feature. Concavity depends on how the rates change.",
        "The greatest output at the right end has no effect on concavity. Look at the pattern of the changes.",
        "The outputs increase everywhere, but the rates first decrease and then increase, so the concavity does change.",
        "The changes drop from 7 to 1 and then rise from 1 to 7, so concavity switches near x = 0.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Increasing outputs do not mean concave up. Look at whether the rates are growing or shrinking.",
    },
    {
      id: "precalculus-1-4-q08",
      topicId: "precalculus-1-4",
      concept: "polynomial-terms",
      difficulty: "Core",
      skill: "equivalent-forms",
      prompt:
        "What are the degree and leading coefficient of p(x) = (2x − 1)²(x + 3)(x² + 1)?",
      choices: [
        "Degree 5, leading coefficient 2",
        "Degree 6, leading coefficient 4",
        "Degree 5, leading coefficient 4",
        "Degree 4, leading coefficient 4",
      ],
      correctAnswer: 2,
      explanation:
        "The highest powers multiply: x² from the square, x from the linear factor, and x² from the last factor, so the degree is 2 + 1 + 2 = 5. The leading coefficients multiply to 2² · 1 · 1 = 4.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "The degree is right, but the leading coefficient of (2x − 1)² is 2² = 4, not 2.",
        "The degree adds the three highest powers 2, 1, and 2 to get 5, not 6.",
        "The degree is 2 + 1 + 2 = 5 and the leading coefficient is 2² · 1 · 1 = 4.",
        "The exponents of the highest-power terms add up to 5, not 4.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Multiply the leading coefficients and add the degrees, and remember the square applies to the coefficient too.",
    },
    {
      id: "precalculus-1-4-q09",
      topicId: "precalculus-1-4",
      concept: "extrema",
      difficulty: "Core",
      skill: "solve",
      prompt:
        "The quadratic function r(x) = −2x² + 8x − 3 has a global maximum. What is the maximum output value?",
      choices: ["5", "2", "−3", "8"],
      correctAnswer: 0,
      explanation:
        "The vertex is at x = −8/(2 · (−2)) = 2. The maximum output is r(2) = −8 + 16 − 3 = 5.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "The maximum output is r(2) = −2(4) + 16 − 3 = 5.",
        "2 is the input where the maximum occurs, not the maximum output.",
        "−3 is the value of r(0), the y-intercept, not the maximum.",
        "8 is the coefficient of x, not an output value of the function.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The vertex gives an input and an output. The maximum value is the output.",
    },
    {
      id: "precalculus-1-4-q10",
      topicId: "precalculus-1-4",
      concept: "extrema",
      difficulty: "Apply",
      skill: "apply-results",
      prompt:
        "A polynomial model T(h) gives the temperature at hour h of a day. The model has a local maximum at h = 15. Which statement is best supported?",
      choices: [
        "The temperature is the highest of the entire day, at exactly h = 15.",
        "The temperature stays constant for every hour after h = 15 in the day.",
        "The temperature is decreasing during the hours leading up to h = 15.",
        "The temperature at h = 15 is higher than at nearby times just before and after.",
      ],
      correctAnswer: 3,
      explanation:
        "A local maximum is the greatest output in its neighborhood. It need not be the greatest over the whole domain, which would require a global maximum.",
      sourceIds: ["ced", "ced-topic-1-4"],
      choiceExplanations: [
        "That describes a global maximum. A local maximum is only guaranteed to beat nearby outputs.",
        "A turning point does not make the output stop changing. It only marks a change of direction.",
        "Before a local maximum the function is increasing, so the temperature is rising, not falling.",
        "At a local maximum the function switches from increasing to decreasing, so nearby outputs on both sides are lower.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Local means compared with nearby outputs. Global means compared with all outputs.",
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

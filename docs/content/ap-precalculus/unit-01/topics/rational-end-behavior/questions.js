// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-7-q01",
      topicId: "precalculus-1-7",
      concept: "horizontal-asymptotes",
      difficulty: "Quick check",
      skill: "equivalent-forms",
      prompt:
        "The rational function r is given by r(x) = (6x² − x)/(2x² + 5). Which of the following is an equation of the horizontal asymptote of the graph of r?",
      choices: ["y = 6", "y = 3", "y = 0", "The graph of r has no horizontal asymptote."],
      correctAnswer: 1,
      explanation:
        "The degrees are equal, so the quotient of the leading terms is 6x²/(2x²) = 3. The horizontal asymptote is y = 3.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "6 is the leading coefficient of the numerator only. The quotient of the leading terms is 6x²/(2x²) = 3.",
        "6x²/(2x²) = 3, so lim x→±∞ r(x) = 3.",
        "y = 0 requires the denominator to have the greater degree.",
        "When the numerator does not dominate, the graph has a horizontal asymptote.",
      ],
      nearMissIndex: 0,
      distinguisher: "With equal degrees, divide the leading coefficients.",
    },
    {
      id: "precalculus-1-7-q02",
      topicId: "precalculus-1-7",
      concept: "compare-degrees",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The rational function r is given by r(x) = (5x + 2)/(x² − 4). Which of the following describes the end behavior of r?",
      choices: [
        "lim x→∞ r(x) = 0 and lim x→−∞ r(x) = 0",
        "lim x→∞ r(x) = 5 and lim x→−∞ r(x) = 5",
        "lim x→∞ r(x) = ∞ and lim x→−∞ r(x) = −∞",
        "lim x→∞ r(x) = −1/2 and lim x→−∞ r(x) = −1/2",
      ],
      correctAnswer: 0,
      explanation:
        "The denominator dominates: the quotient of the leading terms is 5x/x² = 5/x, which approaches 0 at both ends.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "The quotient of the leading terms, 5/x, gets arbitrarily close to 0 at both ends.",
        "5 would be the asymptote only if the degrees were equal.",
        "The numerator does not dominate, so the output values do not increase or decrease without bound.",
        "−1/2 is the ratio of the constant terms, which do not affect end behavior.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The coefficient of the numerator matters only when the degrees are equal.",
    },
    {
      id: "precalculus-1-7-q03",
      topicId: "precalculus-1-7",
      concept: "slant-asymptotes",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The rational function r is given by r(x) = (x² + 1)/(x − 2). Which of the following statements is true?",
      choices: [
        "The graph of r has a horizontal asymptote at y = 1, because the leading coefficients of the numerator and denominator are both 1.",
        "The graph of r has no asymptote as x increases without bound, because the denominator is 0 at x = 2.",
        "The graph of r has a slant asymptote, because the quotient of the leading terms, x, is linear.",
        "The graph of r has a horizontal asymptote at y = 0, because the denominator has a real zero.",
      ],
      correctAnswer: 2,
      explanation:
        "The numerator dominates, and the quotient of the leading terms is x²/x = x, which is linear. So the graph has a slant asymptote parallel to y = x.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "Equal leading coefficients give a horizontal asymptote only when the degrees are equal.",
        "The zero of the denominator gives a vertical asymptote. It does not affect the end behavior.",
        "x²/x = x is linear, so the graph has a slant asymptote.",
        "A real zero in the denominator does not create a horizontal asymptote.",
      ],
      nearMissIndex: 0,
      distinguisher: "Compare degrees before comparing coefficients.",
    },
    {
      id: "precalculus-1-7-q04",
      topicId: "precalculus-1-7",
      concept: "rational-quotient",
      difficulty: "Quick check",
      skill: "describe",
      prompt: "Which of the following best describes a rational function?",
      choices: [
        "A polynomial function in which some coefficients are fractions",
        "Any function with a variable in a denominator or under a radical sign",
        "Any function whose graph has at least one horizontal or vertical asymptote",
        "A function that is a quotient of two polynomial functions",
      ],
      correctAnswer: 3,
      explanation:
        "A rational function is analytically represented as a quotient of two polynomial functions.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "A polynomial with fractional coefficients is still a polynomial, not a quotient of polynomials.",
        "Radicals are not allowed. A rational function uses only polynomials.",
        "Other functions, such as tangent and exponential functions, also have asymptotes.",
        "p(x)/q(x), with p and q polynomial functions.",
      ],
      nearMissIndex: 0,
      distinguisher: "The key word is quotient: a polynomial divided by a polynomial.",
    },
    {
      id: "precalculus-1-7-q05",
      topicId: "precalculus-1-7",
      concept: "slant-asymptotes",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "The rational function r is given by r(x) = (2x³ − x)/(x² + 1). Which of the following describes the end behavior of r?",
      choices: [
        "lim x→∞ r(x) = ∞ and lim x→−∞ r(x) = −∞",
        "lim x→∞ r(x) = 2 and lim x→−∞ r(x) = 2",
        "lim x→∞ r(x) = 0 and lim x→−∞ r(x) = 0",
        "lim x→∞ r(x) = −∞ and lim x→−∞ r(x) = ∞",
      ],
      correctAnswer: 0,
      explanation:
        "The quotient of the leading terms is 2x³/x² = 2x, so r has the end behavior of 2x: lim x→∞ r(x) = ∞ and lim x→−∞ r(x) = −∞.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "r behaves like 2x, which increases without bound as x → ∞ and decreases without bound as x → −∞.",
        "2 is the ratio of the leading coefficients, but the degrees differ, so the output values do not approach 2.",
        "The output values approach 0 only when the denominator dominates.",
        "The signs are reversed. 2x is positive for large positive x.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Unequal degrees with the numerator dominant mean the output values grow without bound.",
    },
    {
      id: "precalculus-1-7-q06",
      topicId: "precalculus-1-7",
      concept: "horizontal-asymptotes",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The table gives values of the rational function r for selected values of x. Which of the following statements is best supported by the table?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of r",
          columns: ["x", "r(x)"],
          rows: [
            ["10", "3.16842"],
            ["100", "3.00160"],
            ["1,000", "3.00002"],
          ],
        },
      ],
      choices: [
        "lim x→∞ r(x) = 3.16842",
        "lim x→∞ r(x) = 0",
        "lim x→∞ r(x) = 3",
        "lim x→∞ r(x) = ∞",
      ],
      correctAnswer: 2,
      explanation:
        "As x increases, the values of r(x) get closer and closer to 3, which suggests lim x→∞ r(x) = 3 and a horizontal asymptote at y = 3.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "3.16842 is only r(10). The values keep getting closer to 3.",
        "The values are near 3, not near 0.",
        "The output values get and stay arbitrarily close to 3 as x increases.",
        "The output values are not increasing without bound.",
      ],
      nearMissIndex: 0,
      distinguisher: "A limit describes the trend as x grows, not one output value.",
    },
    {
      id: "precalculus-1-7-q07",
      topicId: "precalculus-1-7",
      concept: "slant-asymptotes",
      difficulty: "Core",
      skill: "equivalent-forms",
      prompt:
        "The rational function r is given by r(x) = (x² + 3x + 5)/(x − 1), which is equivalent to r(x) = x + 4 + 9/(x − 1) for x ≠ 1. Which of the following is an equation of the slant asymptote of the graph of r?",
      choices: ["x = 1", "y = x + 4", "y = 9", "y = x + 9"],
      correctAnswer: 1,
      explanation:
        "As x increases or decreases without bound, 9/(x − 1) gets arbitrarily close to 0, so r(x) gets arbitrarily close to x + 4. The slant asymptote is y = x + 4.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "x = 1 is a vertical line where the denominator is 0. It is not a slant asymptote.",
        "The term 9/(x − 1) approaches 0, leaving the line y = x + 4.",
        "9 is the numerator of the remainder term, not a line the graph approaches.",
        "The 9 belongs to the remainder term, which approaches 0, so it is not part of the line.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Drop the remainder term, which approaches 0. What remains is the asymptote.",
    },
    {
      id: "precalculus-1-7-q08",
      topicId: "precalculus-1-7",
      concept: "compare-degrees",
      difficulty: "Core",
      skill: "equivalent-forms",
      prompt:
        "The graph of which of the following rational functions has a horizontal asymptote at y = −2?",
      choices: [
        "r(x) = (−2x² + 1)/(x³ + 3)",
        "r(x) = (−2x³ + 1)/(x² + 3)",
        "r(x) = (x² − 2)/(x + 1)",
        "r(x) = (4x² − 1)/(−2x² + 3)",
      ],
      correctAnswer: 3,
      explanation:
        "For (4x² − 1)/(−2x² + 3), the degrees are equal and the quotient of the leading terms is 4x²/(−2x²) = −2.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "The denominator dominates, so the horizontal asymptote is y = 0, not y = −2.",
        "The numerator dominates, so there is no horizontal asymptote.",
        "The numerator dominates, and the quotient of the leading terms, x, gives a slant asymptote.",
        "4x²/(−2x²) = −2, so lim x→±∞ r(x) = −2.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A coefficient of −2 in the numerator is not enough. The degrees must be equal.",
    },
    {
      id: "precalculus-1-7-q09",
      topicId: "precalculus-1-7",
      concept: "horizontal-asymptotes",
      difficulty: "Apply",
      skill: "apply-results",
      prompt:
        "The concentration of a medicine in a patient's blood, in milligrams per liter, is modeled by C(t) = 5t/(t² + 4), where t is the number of hours after a dose. Which of the following is the best interpretation of lim t→∞ C(t) = 0?",
      choices: [
        "As time increases without bound, the concentration gets arbitrarily close to 0 milligrams per liter.",
        "At some time after the dose is given, the concentration is exactly 0 milligrams per liter.",
        "The concentration is less than 0 milligrams per liter for large values of t.",
        "The greatest concentration of the medicine is 0 milligrams per liter.",
      ],
      correctAnswer: 0,
      explanation:
        "The denominator dominates, so C(t) gets arbitrarily close to 0 as t increases without bound. In context, the medicine fades toward zero concentration, though C(t) > 0 for every t > 0.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "The limit describes output values that approach 0 as time increases.",
        "A limit describes approach, not arrival. C(t) > 0 for every t > 0.",
        "C(t) is positive for every t > 0.",
        "The maximum value of C is positive. The limit describes the long-run behavior.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A horizontal asymptote describes where output values head, not a value they reach.",
    },
    {
      id: "precalculus-1-7-q10",
      topicId: "precalculus-1-7",
      concept: "slant-asymptotes",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "The rational function r is given by r(x) = (2x³ − x)/(x² + 1). Which of the following is closest to r(1000)?",
      choices: ["2", "1,000", "2,000", "200"],
      correctAnswer: 2,
      explanation:
        "The graph of r approaches the slant asymptote y = 2x, so r(1000) is close to 2(1000) = 2,000. In fact r(1000) ≈ 1,999.997.",
      sourceIds: ["ced", "ced-topic-1-7"],
      choiceExplanations: [
        "2 is the ratio of the leading coefficients, which matters only when the degrees are equal.",
        "1,000 is the value of y = x at x = 1000, but the slant asymptote is y = 2x.",
        "r(1000) ≈ 1,999.997, close to 2(1000).",
        "200 is close to r(100), not r(1000).",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The slant asymptote predicts the size of the output values for large input values.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-7-mcq",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-7",
      title: "Rational Functions and End Behavior multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-1-7-q01",
        "precalculus-1-7-q02",
        "precalculus-1-7-q03",
        "precalculus-1-7-q04",
        "precalculus-1-7-q05",
        "precalculus-1-7-q06",
        "precalculus-1-7-q07",
        "precalculus-1-7-q08",
        "precalculus-1-7-q09",
        "precalculus-1-7-q10",
      ],
    },
  ],
};

// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-11-q01",
      topicId: "precalculus-1-11",
      concept: "choose-form",
      difficulty: "Quick check",
      skill: "equivalent-forms",
      prompt: "Which of the following is equivalent to (x − 1)²(x + 2)?",
      choices: ["x³ + 3x − 2", "x³ + 2x² + x + 2", "x³ − 3x² + 2", "x³ − 3x + 2"],
      correctAnswer: 3,
      explanation:
        "(x − 1)² = x² − 2x + 1. Then (x² − 2x + 1)(x + 2) = x³ + 2x² − 2x² − 4x + x + 2 = x³ − 3x + 2.",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "The value at x = 0 is 2, not −2.",
        "This squares x − 1 as x² + 1, dropping the middle term −2x.",
        "The x² terms cancel, so there is no x² term.",
        "(x² − 2x + 1)(x + 2) = x³ − 3x + 2, because the x² terms cancel.",
      ],
      nearMissIndex: 1,
      distinguisher: "Squaring a binomial produces a middle term. Do not drop it.",
    },
    {
      id: "precalculus-1-11-q02",
      topicId: "precalculus-1-11",
      concept: "choose-form",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "Which representation of a rational function most readily reveals the locations of its holes and vertical asymptotes?",
      choices: [
        "The numerator and denominator written in factored form",
        "The numerator and denominator in standard form",
        "A quotient plus a remainder term from long division",
        "A table of values at input values of large magnitude",
      ],
      correctAnswer: 0,
      explanation:
        "Holes and vertical asymptotes come from the real zeros of the denominator and their multiplicities in the numerator, which are visible in factored form.",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "Factored form shows which real zeros are shared and with what multiplicity.",
        "Standard form reveals end behavior, but it hides the factors.",
        "Long division is useful for slant asymptotes, but it hides which factors are shared.",
        "Large input values show end behavior, not holes or vertical asymptotes.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Factored form shows what happens at specific input values. Standard form shows the ends.",
    },
    {
      id: "precalculus-1-11-q03",
      topicId: "precalculus-1-11",
      concept: "long-division",
      difficulty: "Quick check",
      skill: "solve",
      prompt:
        "When x² − 5x + 7 is divided by x − 2, what are the quotient and the remainder?",
      choices: [
        "Quotient x − 3; remainder 7",
        "Quotient x − 3; remainder 1",
        "Quotient x − 5; remainder 7",
        "Quotient x + 3; remainder 1",
      ],
      correctAnswer: 1,
      explanation:
        "(x − 2)(x − 3) = x² − 5x + 6, and x² − 5x + 7 − (x² − 5x + 6) = 1. So x² − 5x + 7 = (x − 2)(x − 3) + 1.",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "The remainder is what is left after subtracting (x − 2)(x − 3), not the constant term of the dividend.",
        "(x − 2)(x − 3) + 1 = x² − 5x + 7.",
        "(x − 2)(x − 5) = x² − 7x + 10, which does not match.",
        "(x − 2)(x + 3) = x² + x − 6, which does not match.",
      ],
      nearMissIndex: 0,
      distinguisher: "Check with f(x) = g(x)q(x) + r(x).",
    },
    {
      id: "precalculus-1-11-q04",
      topicId: "precalculus-1-11",
      concept: "binomial-theorem",
      difficulty: "Quick check",
      skill: "solve",
      prompt: "What is the coefficient of x² in the expansion of (x + 3)⁴?",
      choices: ["81", "18", "54", "6"],
      correctAnswer: 2,
      explanation:
        "Row 4 of Pascal's triangle is 1, 4, 6, 4, 1. The x² term is 6 · x² · 3² = 54x².",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "81 = 3⁴ is the constant term.",
        "This uses 3 instead of 3². The power of 3 is 2 in the x² term.",
        "6 · 3² = 54.",
        "6 is only the entry from Pascal's triangle.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The coefficient includes the power of the constant, not only the entry from Pascal's triangle.",
    },
    {
      id: "precalculus-1-11-q05",
      topicId: "precalculus-1-11",
      concept: "long-division",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The rational function r is given by r(x) = (2x² + 3x − 5)/(x + 4). Which of the following is an equation of the slant asymptote of the graph of r?",
      choices: ["y = 2x − 5", "y = 2x + 3", "y = 2x", "y = 15"],
      correctAnswer: 0,
      explanation:
        "Long division gives 2x² + 3x − 5 = (x + 4)(2x − 5) + 15, so r(x) = 2x − 5 + 15/(x + 4). The slant asymptote is y = 2x − 5.",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "The quotient 2x − 5 is the line the graph approaches.",
        "2x + 3 uses the first two coefficients of the numerator, not the quotient.",
        "This keeps only the first term of the quotient.",
        "15 is the remainder.",
      ],
      nearMissIndex: 2,
      distinguisher: "The whole quotient, constant included, is the asymptote.",
    },
    {
      id: "precalculus-1-11-q06",
      topicId: "precalculus-1-11",
      concept: "binomial-theorem",
      difficulty: "Core",
      skill: "equivalent-forms",
      prompt: "Which of the following is equivalent to (2x − 1)³?",
      choices: [
        "8x³ − 6x² + 6x − 1",
        "8x³ + 12x² + 6x + 1",
        "2x³ − 3x² + 3x − 1",
        "8x³ − 12x² + 6x − 1",
      ],
      correctAnswer: 3,
      explanation:
        "With a = 2x and b = −1 and row 3 (1, 3, 3, 1): (2x)³ + 3(2x)²(−1) + 3(2x)(−1)² + (−1)³ = 8x³ − 12x² + 6x − 1.",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "3(2x)²(−1) = −12x², not −6x².",
        "With b = −1, the signs alternate.",
        "The coefficient 2 must also be raised to each power.",
        "Row 3 with a = 2x and b = −1 gives 8x³ − 12x² + 6x − 1.",
      ],
      nearMissIndex: 1,
      distinguisher: "Raise the whole term 2x to each power, and keep the sign of b.",
    },
    {
      id: "precalculus-1-11-q07",
      topicId: "precalculus-1-11",
      concept: "choose-form",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "The function g is given by g(x) = x³ − x² − 6x, and the function h is given by h(x) = x² − 9. Let k be the function given by k(x) = h(x)/g(x). What is the domain of k?",
      choices: [
        "All real numbers x where x ≠ 0",
        "All real numbers x where x ≠ −3 and x ≠ 3",
        "All real numbers x where x ≠ −2, x ≠ 0, and x ≠ 3",
        "All real numbers x where x ≠ −3, x ≠ −2, x ≠ 0, and x ≠ 3",
      ],
      correctAnswer: 2,
      explanation:
        "Factored, g(x) = x(x − 3)(x + 2), so g(x) = 0 at x = 0, 3, and −2. The domain of k excludes exactly these values.",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "g(x) = x(x − 3)(x + 2) has three real zeros, not only 0.",
        "These are the real zeros of h, which do not affect the domain.",
        "The domain excludes the real zeros of the denominator g: −2, 0, and 3.",
        "−3 is a zero of the numerator h only, so k(−3) is defined (it equals 0).",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Only the real zeros of the denominator are excluded from the domain.",
    },
    {
      id: "precalculus-1-11-q08",
      topicId: "precalculus-1-11",
      concept: "long-division",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A student divides x² + 1 by x + 2 and obtains a quotient of x − 2 and a remainder of 5. Which of the following equations verifies the student's result?",
      choices: [
        "(x + 2)(x − 2) = x² + 1",
        "(x + 2)(x − 2) + 5 = x² + 1",
        "(x + 2) + (x − 2) + 5 = x² + 1",
        "5(x − 2) + (x + 2) = x² + 1",
      ],
      correctAnswer: 1,
      explanation: "f(x) = g(x)q(x) + r(x): (x + 2)(x − 2) + 5 = x² − 4 + 5 = x² + 1.",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "(x + 2)(x − 2) = x² − 4, so the remainder must be added.",
        "g(x)q(x) + r(x) = x² − 4 + 5 = x² + 1.",
        "The divisor and quotient are multiplied, not added.",
        "The remainder is added, not multiplied by the quotient.",
      ],
      nearMissIndex: 0,
      distinguisher: "Divisor times quotient, plus remainder, equals the dividend.",
    },
    {
      id: "precalculus-1-11-q09",
      topicId: "precalculus-1-11",
      concept: "binomial-theorem",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "In the expansion of (x + y)⁶, how many terms are there, and what is the coefficient of x²y⁴?",
      choices: [
        "7 terms; coefficient 15",
        "6 terms; coefficient 15",
        "7 terms; coefficient 20",
        "7 terms; coefficient 6",
      ],
      correctAnswer: 0,
      explanation:
        "Row 6 of Pascal's triangle is 1, 6, 15, 20, 15, 6, 1, so there are 7 terms. The term x²y⁴ uses the entry 15.",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "Row 6 has 7 entries, and the entry for x²y⁴ is 15.",
        "The powers of y run from 0 to 6, giving 7 terms.",
        "20 is the coefficient of x³y³.",
        "6 is the coefficient of x⁵y and xy⁵.",
      ],
      nearMissIndex: 2,
      distinguisher: "Row n has n + 1 entries. Choose the entry by the power of y.",
    },
    {
      id: "precalculus-1-11-q10",
      topicId: "precalculus-1-11",
      concept: "choose-form",
      difficulty: "Apply",
      skill: "apply-results",
      prompt:
        "The cost per item, in dollars, of producing n items is modeled by C(n) = (50n + 2000)/n. Which of the following equivalent forms best shows the cost per item when n is very large?",
      choices: [
        "C(n) = 50(n + 40)/n, because the factored numerator shows the long-run cost",
        "C(n) = (50n + 2000)/n, because the original form shows the long-run cost best",
        "C(n) = 2050/n, because the terms combine into one fraction that decreases",
        "C(n) = 50 + 2000/n, because 2000/n approaches 0, so the cost per item approaches $50",
      ],
      correctAnswer: 3,
      explanation:
        "Dividing each term by n gives C(n) = 50 + 2000/n. As n increases without bound, 2000/n approaches 0, so lim n→∞ C(n) = 50.",
      sourceIds: ["ced", "ced-topic-1-11"],
      choiceExplanations: [
        "50(n + 40)/n is equivalent, but the factored form shows the zero of the numerator, not the long-run value.",
        "The original form is equivalent but does not show the long-run value directly.",
        "2050/n is not equivalent to (50n + 2000)/n.",
        "This form separates a constant from a term that approaches 0.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "For long-run behavior, pick the form that separates out the term approaching 0.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-11-quick",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-11",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-1-11-q01",
        "precalculus-1-11-q02",
        "precalculus-1-11-q03",
        "precalculus-1-11-q04",
      ],
    },
    {
      id: "precalculus-1-11-quiz",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-11",
      title:
        "Equivalent Representations of Polynomial and Rational Expressions topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-1-11-q05",
        "precalculus-1-11-q06",
        "precalculus-1-11-q07",
        "precalculus-1-11-q08",
        "precalculus-1-11-q09",
        "precalculus-1-11-q10",
      ],
    },
  ],
};

// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-9-q01",
      topicId: "precalculus-1-9",
      concept: "where-asymptotes",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The rational function r is given by r(x) = (x + 1)/((x − 3)(x + 2)). At which of the following values of x does the graph of r have a vertical asymptote?",
      choices: [
        "x = 3, x = −2, and x = −1",
        "x = −3 and x = 2 only",
        "x = 3 and x = −2 only",
        "x = −1 only",
      ],
      correctAnswer: 2,
      explanation:
        "The denominator is 0 at x = 3 and x = −2, and the numerator x + 1 is not 0 at either value. So the graph has vertical asymptotes at x = 3 and x = −2.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "x = −1 is a real zero of the numerator, so r(−1) = 0 there, not an asymptote.",
        "The signs are reversed. (x − 3) is 0 at x = 3.",
        "Both real zeros of the denominator are not zeros of the numerator.",
        "x = −1 is a zero of r, not a vertical asymptote.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Vertical asymptotes come from the denominator. Zeros come from the numerator.",
    },
    {
      id: "precalculus-1-9-q02",
      topicId: "precalculus-1-9",
      concept: "where-asymptotes",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The rational function r is given by r(x) = (x + 1)/(x² + 4). Which of the following statements is true?",
      choices: [
        "The graph of r has no vertical asymptote, because x² + 4 has no real zeros.",
        "The graph of r has vertical asymptotes at x = 2 and x = −2, where x² − 4 = 0.",
        "The graph of r has a vertical asymptote at x = −1, where the numerator is 0.",
        "The graph of r has a vertical asymptote at x = 4, because 4 is in the denominator.",
      ],
      correctAnswer: 0,
      explanation:
        "x² + 4 ≥ 4 for every real x, so the denominator has no real zeros and the graph has no vertical asymptote.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "The denominator is never 0 for real x.",
        "x² − 4 is a different polynomial. x² + 4 = 0 has no real solutions.",
        "x = −1 is a real zero of r.",
        "At x = 4 the denominator is 20, not 0.",
      ],
      nearMissIndex: 1,
      distinguisher: "Solve denominator = 0 over the real numbers first.",
    },
    {
      id: "precalculus-1-9-q03",
      topicId: "precalculus-1-9",
      concept: "one-sided-limits",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The rational function r is given by r(x) = (x + 1)/(x − 3). What is lim x→3⁺ r(x)?",
      choices: ["−∞", "0", "4", "∞"],
      correctAnswer: 3,
      explanation:
        "For x near 3 and greater than 3, the numerator is near 4 and the denominator is a small positive number, so r(x) increases without bound.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "−∞ is lim x→3⁻ r(x), where the denominator is negative.",
        "The numerator is near 4, not 0.",
        "4 is the value of the numerator at x = 3, not the limit.",
        "A value near 4 divided by a small positive number is a large positive number.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Decide which side of 3 you are on, because the sign of x − 3 changes there.",
    },
    {
      id: "precalculus-1-9-q04",
      topicId: "precalculus-1-9",
      concept: "multiplicity-effect",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The function r is given by r(x) = 1/(x − 2)². Which of the following describes the behavior of r near x = 2?",
      choices: [
        "lim x→2⁻ r(x) = −∞ and lim x→2⁺ r(x) = ∞",
        "lim x→2⁻ r(x) = ∞ and lim x→2⁺ r(x) = ∞",
        "lim x→2⁻ r(x) = 0 and lim x→2⁺ r(x) = 0",
        "lim x→2⁻ r(x) = 2 and lim x→2⁺ r(x) = 2",
      ],
      correctAnswer: 1,
      explanation:
        "(x − 2)² is a small positive number on both sides of 2, so 1/(x − 2)² increases without bound on both sides.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "Opposite directions require odd multiplicity, such as (x − 2)³.",
        "The denominator is positive on both sides, so both one-sided limits are ∞.",
        "As the denominator approaches 0, the output values grow in magnitude.",
        "The input values approach 2, but the output values grow without bound.",
      ],
      nearMissIndex: 0,
      distinguisher: "An even power is positive on both sides of its zero.",
    },
    {
      id: "precalculus-1-9-q05",
      topicId: "precalculus-1-9",
      concept: "where-asymptotes",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The table gives values of the function g for selected values of x. Which of the following statements is best supported by the table?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of g near x = −1",
          columns: ["x", "g(x)"],
          rows: [
            ["−1.1", "−20"],
            ["−1.01", "−200"],
            ["−1.001", "−2,000"],
            ["−0.999", "2,000"],
            ["−0.99", "200"],
            ["−0.9", "20"],
          ],
        },
      ],
      choices: [
        "lim x→−1⁻ g(x) = −∞ and lim x→−1⁺ g(x) = ∞",
        "lim x→−1⁻ g(x) = ∞ and lim x→−1⁺ g(x) = ∞",
        "g has a real zero at x = −1, because the output values change sign.",
        "g has a hole at x = −1, because no output value is listed there.",
      ],
      correctAnswer: 0,
      explanation:
        "From the left, the output values are negative and grow in magnitude, and from the right they are positive and grow in magnitude. So lim x→−1⁻ g(x) = −∞ and lim x→−1⁺ g(x) = ∞.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "The output values decrease without bound from the left and increase without bound from the right.",
        "The output values to the left of −1 are negative.",
        "A zero would need output values near 0. These grow without bound.",
        "A hole needs output values that approach a finite number.",
      ],
      nearMissIndex: 1,
      distinguisher: "Compare the signs on the two sides before choosing ∞ or −∞.",
    },
    {
      id: "precalculus-1-9-q06",
      topicId: "precalculus-1-9",
      concept: "one-sided-limits",
      difficulty: "Core",
      skill: "solve",
      prompt:
        "The rational function r is given by r(x) = (x − 1)/(x + 2)². Which of the following is true?",
      choices: [
        "lim x→−2⁻ r(x) = ∞ and lim x→−2⁺ r(x) = ∞",
        "lim x→−2⁻ r(x) = −∞ and lim x→−2⁺ r(x) = ∞",
        "lim x→−2⁻ r(x) = ∞ and lim x→−2⁺ r(x) = −∞",
        "lim x→−2⁻ r(x) = −∞ and lim x→−2⁺ r(x) = −∞",
      ],
      correctAnswer: 3,
      explanation:
        "Near x = −2 the numerator is about −3, and (x + 2)² is a small positive number on both sides. The quotient is negative and large in magnitude on both sides.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "The negative numerator makes the quotient negative.",
        "(x + 2)² does not change sign, so the two limits cannot have opposite signs.",
        "The squared factor keeps the same sign on both sides.",
        "A negative numerator over a small positive square gives −∞ on both sides.",
      ],
      nearMissIndex: 1,
      distinguisher: "Check the multiplicity, then the sign of the numerator.",
    },
    {
      id: "precalculus-1-9-q07",
      topicId: "precalculus-1-9",
      concept: "multiplicity-effect",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "Which of the following functions satisfies lim x→1⁻ f(x) = −∞ and lim x→1⁺ f(x) = −∞?",
      choices: [
        "f(x) = 1/(x − 1)²",
        "f(x) = −1/(x − 1)²",
        "f(x) = −1/(x − 1)³",
        "f(x) = 1/(x − 1)³",
      ],
      correctAnswer: 1,
      explanation:
        "(x − 1)² is positive on both sides of 1, and the numerator −1 makes the quotient negative, so both one-sided limits are −∞.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "A positive numerator gives ∞ on both sides.",
        "Even multiplicity and a negative numerator give −∞ on both sides.",
        "Odd multiplicity gives opposite directions: ∞ on the left and −∞ on the right.",
        "Odd multiplicity gives opposite directions on the two sides.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Choose the multiplicity for the sides, then the sign for the direction.",
    },
    {
      id: "precalculus-1-9-q08",
      topicId: "precalculus-1-9",
      concept: "where-asymptotes",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "The rational function r is given by r(x) = x/(x² − 9). A student claims that the graph of r has vertical asymptotes at x = 0, x = 3, and x = −3. Which of the following is the best response?",
      choices: [
        "The claim is correct, because 0, 3, and −3 are the zeros of x(x − 3)(x + 3).",
        "Only x = 3 is a vertical asymptote, because −3 is negative.",
        "x = 0 is a zero of r, not a vertical asymptote.",
        "There are no vertical asymptotes, because the numerator has a zero.",
      ],
      correctAnswer: 2,
      explanation:
        "At x = 0 the denominator is −9, not 0, and r(0) = 0. The real zeros of the denominator, 3 and −3, are not zeros of the numerator, so the vertical asymptotes are x = 3 and x = −3.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "Only the real zeros of the denominator, x² − 9, can give vertical asymptotes.",
        "A negative value can be a vertical asymptote. x² − 9 = 0 at both 3 and −3.",
        "r(0) = 0, and the vertical asymptotes are x = 3 and x = −3.",
        "A zero of the numerator elsewhere does not remove the asymptotes at 3 and −3.",
      ],
      nearMissIndex: 0,
      distinguisher: "Test each claimed value in the denominator.",
    },
    {
      id: "precalculus-1-9-q09",
      topicId: "precalculus-1-9",
      concept: "one-sided-limits",
      difficulty: "Apply",
      skill: "apply-results",
      prompt:
        "The time, in hours, to drive 120 miles at a constant speed of s miles per hour is modeled by T(s) = 120/s for s > 0. Which of the following is the best interpretation of lim s→0⁺ T(s) = ∞?",
      choices: [
        "As the speed gets close to 0 miles per hour, the time gets close to 0 hours.",
        "As the time gets close to 0 hours, the speed increases without bound.",
        "As the speed gets close to 0 miles per hour, the time gets close to 120 hours.",
        "As the speed gets close to 0 miles per hour, the time increases without bound.",
      ],
      correctAnswer: 3,
      explanation:
        "As s approaches 0 from values greater than 0, the denominator is a small positive number, so 120/s increases without bound. A slower speed means a longer trip.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "The limit is ∞, not 0. Slower speeds take more time.",
        "This reverses the input and output. The limit describes T as s approaches 0.",
        "T(1) = 120, but T keeps increasing as s gets closer to 0.",
        "T(s) increases without bound as s approaches 0 from the right.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Read the limit as: as the input approaches the value, what do the output values do?",
    },
    {
      id: "precalculus-1-9-q10",
      topicId: "precalculus-1-9",
      concept: "multiplicity-effect",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "The rational function r is given by r(x) = (x + 3)/((x − 1)²(x − 4)). Which of the following describes the behavior of r near x = 1?",
      choices: [
        "lim x→1⁻ r(x) = −∞ and lim x→1⁺ r(x) = −∞",
        "lim x→1⁻ r(x) = ∞ and lim x→1⁺ r(x) = ∞",
        "lim x→1⁻ r(x) = −∞ and lim x→1⁺ r(x) = ∞",
        "lim x→1⁻ r(x) = 0 and lim x→1⁺ r(x) = 0",
      ],
      correctAnswer: 0,
      explanation:
        "Near x = 1, x + 3 ≈ 4 and x − 4 ≈ −3, so their quotient is negative. (x − 1)² is a small positive number on both sides, so r(x) decreases without bound on both sides.",
      sourceIds: ["ced", "ced-topic-1-9"],
      choiceExplanations: [
        "The squared factor is positive on both sides, and the other factors give a negative sign.",
        "This ignores the negative factor x − 4 in the denominator.",
        "The squared factor does not change sign, so the limits cannot be opposite.",
        "The denominator approaches 0 while the numerator does not, so the output values grow in magnitude.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Find the sign of every other factor near the asymptote, not only the squared one.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-9-quick",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-9",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-1-9-q01",
        "precalculus-1-9-q02",
        "precalculus-1-9-q03",
        "precalculus-1-9-q04",
      ],
    },
    {
      id: "precalculus-1-9-quiz",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-9",
      title: "Rational Functions and Vertical Asymptotes topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-1-9-q05",
        "precalculus-1-9-q06",
        "precalculus-1-9-q07",
        "precalculus-1-9-q08",
        "precalculus-1-9-q09",
        "precalculus-1-9-q10",
      ],
    },
  ],
};

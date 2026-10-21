// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-2-2-q01",
      topicId: "precalculus-2-2",
      concept: "linear-vs-exponential",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The table gives values of a function h at equally spaced values of x. Which type of function best models h?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of h",
          columns: ["x", "1", "3", "5", "7"],
          rows: [["h(x)", "200", "160", "128", "102.4"]],
        },
      ],
      choices: [
        "Linear, because the output values decrease",
        "Linear, because the output values change by 40 each time",
        "Exponential, because the output values change proportionally",
        "Exponential, because the output values decrease by a larger amount each time",
      ],
      correctAnswer: 2,
      explanation:
        "160/200 = 128/160 = 102.4/128 = 0.8. The outputs change proportionally over equal-length input intervals, so h is exponential.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "A decreasing function can be exponential. Check differences and ratios.",
        "The differences are −40, −32, −25.6, which are not constant.",
        "The ratio of successive outputs is a constant 0.8.",
        "The decreases get smaller, 40, 32, 25.6, not larger. The reason for exponential is the constant ratio.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Name the constant ratio as the reason, not the size of the changes.",
    },
    {
      id: "precalculus-2-2-q02",
      topicId: "precalculus-2-2",
      concept: "exponential-and-geometric",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt:
        "Which exponential function passes through the point (3, 50) and has ratio b = 1.2?",
      choices: [
        "f(x) = 50(1.2)^(x − 3)",
        "f(x) = 50(1.2)^(x + 3)",
        "f(x) = 50 + 1.2(x − 3)",
        "f(x) = 1.2(50)^(x − 3)",
      ],
      correctAnswer: 0,
      explanation:
        "An exponential function through (xᵢ, yᵢ) with ratio b is f(x) = yᵢb^(x − xᵢ). Here f(x) = 50(1.2)^(x − 3), and f(3) = 50.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "f(3) = 50(1.2)⁰ = 50.",
        "With x + 3, f(−3) = 50 instead of f(3) = 50.",
        "Adding 1.2 per unit describes a linear function with slope 1.2.",
        "The base and the coefficient are switched.",
      ],
      nearMissIndex: 1,
      distinguisher: "The exponent is x − xᵢ, so the function equals yᵢ when x = xᵢ.",
    },
    {
      id: "precalculus-2-2-q03",
      topicId: "precalculus-2-2",
      concept: "linear-and-arithmetic",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt:
        "A linear function f has slope 4 and f(5) = 3. Which of the following is an expression for f(x)?",
      choices: ["3 + 4(x + 5)", "3 + 4(x − 5)", "5 + 4(x − 3)", "3(4)^(x − 5)"],
      correctAnswer: 1,
      explanation: "f(x) = yᵢ + m(x − xᵢ) = 3 + 4(x − 5). Check: f(5) = 3.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "This gives f(−5) = 3, not f(5) = 3.",
        "The point-slope form with (xᵢ, yᵢ) = (5, 3) and m = 4.",
        "The coordinates of the point are switched: this gives f(3) = 5.",
        "Repeated multiplication by 4 describes an exponential function.",
      ],
      nearMissIndex: 0,
      distinguisher: "Subtract the input of the known point inside the parentheses.",
    },
    {
      id: "precalculus-2-2-q04",
      topicId: "precalculus-2-2",
      concept: "linear-vs-exponential",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "Which of the following is a difference between linear functions f(x) = b + mx and exponential functions g(x) = abˣ?",
      choices: [
        "Only linear functions can be expressed in terms of an initial value.",
        "Only exponential functions are determined by two distinct function values.",
        "Linear functions are always increasing, and exponential functions can decrease.",
        "Linear functions are based on addition, while exponential functions are based on multiplication.",
      ],
      correctAnswer: 3,
      explanation:
        "Both are expressed with an initial value and a constant involved with change, but linear functions add a constant rate of change while exponential functions multiply by a constant ratio.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "Both have an initial value: b for f and a for g.",
        "Both kinds of functions are determined by two distinct function values.",
        "A linear function with m < 0 decreases.",
        "Repeated addition versus repeated multiplication is the difference.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Two values determine both function types; the difference is the operation.",
    },
    {
      id: "precalculus-2-2-q05",
      topicId: "precalculus-2-2",
      concept: "exponential-and-geometric",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "An exponential function g satisfies g(1) = 12 and g(3) = 108. Which of the following is g(x)?",
      choices: ["g(x) = 12(3)ˣ", "g(x) = 4(9)ˣ", "g(x) = 4(3)ˣ", "g(x) = 12 + 48(x − 1)"],
      correctAnswer: 2,
      explanation:
        "g(3)/g(1) = b² = 9, so b = 3. Then a = g(1)/b = 4, and g(x) = 4(3)ˣ. Check: g(3) = 4(27) = 108.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "This uses 12 as the initial value, which gives g(1) = 36.",
        "9 is the ratio over 2 units, b², not the ratio per unit.",
        "b² = 108/12 = 9, so b = 3 and a = 12/3 = 4.",
        "A slope of 48 fits the two points with a line, not an exponential function.",
      ],
      nearMissIndex: 0,
      distinguisher: "Over two units, the outputs change by a factor of b².",
    },
    {
      id: "precalculus-2-2-q06",
      topicId: "precalculus-2-2",
      concept: "linear-vs-exponential",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The function f is linear and the function g is exponential. Both satisfy f(0) = g(0) = 10 and f(2) = g(2) = 40. What is f(4) − g(4)?",
      choices: ["−90", "0", "−30", "90"],
      correctAnswer: 0,
      explanation:
        "f increases by 15 per unit: f(4) = 10 + 60 = 70. g has b² = 4, so b = 2 and g(4) = 10(2)⁴ = 160. f(4) − g(4) = 70 − 160 = −90.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "f(4) = 70 and g(4) = 160, so f(4) − g(4) = −90.",
        "The functions agree at x = 0 and x = 2, but not at x = 4.",
        "−30 uses g(4) = 100, as if g added 30 per unit like f.",
        "90 is g(4) − f(4), the difference in the other order.",
      ],
      nearMissIndex: 3,
      distinguisher: "Two shared values do not make the functions agree elsewhere.",
    },
    {
      id: "precalculus-2-2-q07",
      topicId: "precalculus-2-2",
      concept: "linear-and-arithmetic",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "An arithmetic sequence has a₀ = 6 and a₅ = 21. Which linear function of the real numbers agrees with the sequence at every whole number n?",
      choices: ["f(x) = 21 + 3x", "f(x) = 6 + 5x", "f(x) = 6(1.5)ˣ", "f(x) = 6 + 3x"],
      correctAnswer: 3,
      explanation:
        "d = (21 − 6)/5 = 3, so aₙ = 6 + 3n and the corresponding linear function is f(x) = 6 + 3x.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "21 is a₅, not the initial value.",
        "5 is the number of steps, not the common difference.",
        "Multiplying by 1.5 describes a geometric pattern, and 6(1.5)⁵ is not 21.",
        "Slope 3 and initial value 6 match a₀ = 6 and a₅ = 21.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The slope is the common difference: change in terms over change in n.",
    },
    {
      id: "precalculus-2-2-q08",
      topicId: "precalculus-2-2",
      concept: "exponential-and-geometric",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "The geometric sequence gₙ = 5(2)ⁿ and the exponential function f(x) = 5(2)ˣ are compared. Which statement is true?",
      choices: [
        "They have the same domain, so they have the same graph.",
        "They agree at every whole number, but f is also defined between whole numbers.",
        "They agree only at n = 0, because a sequence is not a function.",
        "f has a domain of whole numbers, and the sequence is defined for all real numbers.",
      ],
      correctAnswer: 1,
      explanation:
        "Sequences and their corresponding functions may have different domains. gₙ is defined for whole numbers, while f is defined for all real numbers, and f(n) = gₙ for every whole number n.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "The domains are different: whole numbers for the sequence, all real numbers for f.",
        "f(n) = gₙ at whole numbers, and f also has values such as f(0.5) = 5√2.",
        "A sequence is a function from the whole numbers to the real numbers.",
        "This switches the two domains.",
      ],
      nearMissIndex: 0,
      distinguisher: "Same rule, different domains: points versus a curve.",
    },
    {
      id: "precalculus-2-2-q09",
      topicId: "precalculus-2-2",
      concept: "linear-vs-exponential",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A data set has inputs 0, 2, 4, 6 and outputs 5, 11, 17, 23. A student says an exponential model is appropriate because the outputs are increasing. Which statement best responds to the claim?",
      choices: [
        "The claim is correct, because increasing outputs mean exponential growth.",
        "The claim is correct, because the outputs grow by a larger amount each time.",
        "The claim is incorrect, because the outputs change by a constant 6 over equal-length intervals, so a linear model is appropriate.",
        "The claim is incorrect, because the outputs change by a constant ratio of 6, so a linear model is appropriate.",
      ],
      correctAnswer: 2,
      explanation:
        "The differences are 6, 6, 6 over intervals of length 2, a constant rate of change. That indicates a linear function, not an exponential one.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "Linear functions with positive slope also increase.",
        "Each increase is exactly 6, not larger each time.",
        "Constant differences over equal-length intervals mean linear.",
        "6 is a constant difference, not a ratio: 11/5 and 17/11 are not equal.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Name constant difference for linear; a ratio is something different.",
    },
    {
      id: "precalculus-2-2-q10",
      topicId: "precalculus-2-2",
      concept: "exponential-and-geometric",
      difficulty: "Core",
      skill: "apply-results",
      prompt: "An exponential function f has f(0) = 64 and f(1) = 48. What is f(3)?",
      choices: ["16", "36", "1", "27"],
      correctAnswer: 3,
      explanation: "b = 48/64 = 0.75, so f(x) = 64(0.75)ˣ and f(3) = 64(0.421875) = 27.",
      sourceIds: ["ced", "ced-topic-2-2"],
      choiceExplanations: [
        "16 subtracts 16 per unit, which treats f as linear.",
        "36 = 48(0.75) is f(2), not f(3).",
        "1 = 64(0.25)³ uses 0.25, the fraction lost each unit, as the ratio. The ratio of successive outputs is 0.75.",
        "f(3) = 64(0.75)³ = 27.",
      ],
      nearMissIndex: 1,
      distinguisher: "Exponential: multiply by 0.75 each unit; do not subtract 16.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-2-2-quick",
      courseId: "precalculus",
      unitId: "precalculus-2",
      topicId: "precalculus-2-2",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-2-2-q01",
        "precalculus-2-2-q02",
        "precalculus-2-2-q03",
        "precalculus-2-2-q04",
      ],
    },
    {
      id: "precalculus-2-2-quiz",
      courseId: "precalculus",
      unitId: "precalculus-2",
      topicId: "precalculus-2-2",
      title: "Change in Linear and Exponential Functions topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-2-2-q05",
        "precalculus-2-2-q06",
        "precalculus-2-2-q07",
        "precalculus-2-2-q08",
        "precalculus-2-2-q09",
        "precalculus-2-2-q10",
      ],
    },
  ],
};

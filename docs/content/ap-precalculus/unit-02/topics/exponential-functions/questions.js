// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-2-3-q01",
      topicId: "precalculus-2-3",
      concept: "general-form",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "Which of the following exponential functions demonstrates exponential decay?",
      choices: ["f(x) = 0.4(3)ˣ", "f(x) = 3(0.4)ˣ", "f(x) = −3(0.4)ˣ", "f(x) = −0.4(3)ˣ"],
      correctAnswer: 1,
      explanation:
        "Exponential decay means a > 0 and 0 < b < 1. Only f(x) = 3(0.4)ˣ has a = 3 > 0 and b = 0.4.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "b = 3 > 1 with a > 0 is exponential growth.",
        "a = 3 > 0 and 0 < b = 0.4 < 1.",
        "The base is 0.4, but a < 0, so this function is increasing toward 0 from below.",
        "a < 0 and b > 1, so the function is decreasing, but this is not called exponential decay in general form.",
      ],
      nearMissIndex: 2,
      distinguisher: "Decay needs a > 0 as well as 0 < b < 1.",
    },
    {
      id: "precalculus-2-3-q02",
      topicId: "precalculus-2-3",
      concept: "end-behavior",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "For f(x) = 6(0.5)ˣ, which of the following describes the end behavior of f?",
      choices: [
        "lim x→∞ f(x) = ∞ and lim x→−∞ f(x) = 0",
        "lim x→∞ f(x) = 0 and lim x→−∞ f(x) = 0",
        "lim x→∞ f(x) = −∞ and lim x→−∞ f(x) = ∞",
        "lim x→∞ f(x) = 0 and lim x→−∞ f(x) = ∞",
      ],
      correctAnswer: 3,
      explanation:
        "With a = 6 > 0 and 0 < b < 1, f decays: the outputs get arbitrarily close to 0 as x increases and increase without bound as x decreases.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "This is the end behavior of exponential growth, with b > 1.",
        "Only one end of an exponential function approaches 0.",
        "f(x) is positive for every x because a > 0, so it cannot decrease without bound.",
        "Decay: lim x→∞ f(x) = 0 and lim x→−∞ f(x) = ∞.",
      ],
      nearMissIndex: 0,
      distinguisher: "For 0 < b < 1, the outputs approach 0 on the right.",
    },
    {
      id: "precalculus-2-3-q03",
      topicId: "precalculus-2-3",
      concept: "monotonic-and-concavity",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "Which of the following must be true about the function f(x) = abˣ, where a ≠ 0, b > 0, and b ≠ 1?",
      choices: [
        "Its graph has no points of inflection.",
        "It has exactly one relative extremum.",
        "Its graph changes from concave up to concave down.",
        "It is increasing on some interval and decreasing on another.",
      ],
      correctAnswer: 0,
      explanation:
        "Exponential functions in general form are always increasing or always decreasing and always concave up or always concave down, so their graphs have no points of inflection.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "The concavity never changes, so there are no points of inflection.",
        "Exponential functions have no extrema except on a closed interval.",
        "The graph is always concave up or always concave down.",
        "An exponential function in general form never switches between increasing and decreasing.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Proportional change means one direction and one concavity everywhere.",
    },
    {
      id: "precalculus-2-3-q04",
      topicId: "precalculus-2-3",
      concept: "general-form",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "For the exponential function f(x) = 4(1.25)ˣ, which statement gives the initial value and the base?",
      choices: [
        "The initial value is 1.25 and the base is 4.",
        "The initial value is 5 and the base is 1.25.",
        "The initial value is 4 and the base is 1.25.",
        "The initial value is 4 and the base is 0.25.",
      ],
      correctAnswer: 2,
      explanation:
        "In f(x) = abˣ, the initial value is a = f(0) = 4 and the base is b = 1.25.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "The coefficient is the initial value and the number raised to the power x is the base.",
        "5 = 4(1.25) is f(1), not f(0).",
        "a = 4 and b = 1.25.",
        "0.25 is the percent increase written as a decimal; the base is the ratio 1.25.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "The base is the ratio of successive outputs, not the percent change.",
    },
    {
      id: "precalculus-2-3-q05",
      topicId: "precalculus-2-3",
      concept: "monotonic-and-concavity",
      difficulty: "Core",
      skill: "describe",
      prompt: "For f(x) = −2(3)ˣ, which of the following is true?",
      choices: [
        "f is increasing, and its graph is concave up.",
        "f is decreasing, and its graph is concave down.",
        "f is decreasing, and its graph is concave up.",
        "f is increasing, and its graph is concave down.",
      ],
      correctAnswer: 1,
      explanation:
        "With b = 3 > 1, 3ˣ increases and is concave up. Multiplying by a = −2 reflects it over the x-axis, so f is decreasing and concave down.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "That describes 2(3)ˣ. The negative initial value reflects the graph.",
        "a < 0 and b > 1: always decreasing, always concave down.",
        "f is decreasing, but the reflection over the x-axis also reverses the concavity.",
        "That describes a < 0 with 0 < b < 1.",
      ],
      nearMissIndex: 2,
      distinguisher: "A negative a reverses both direction and concavity.",
    },
    {
      id: "precalculus-2-3-q06",
      topicId: "precalculus-2-3",
      concept: "monotonic-and-concavity",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "The table gives values of a function g. Which of the following could be g(x)?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of g",
          columns: ["x", "0", "1", "2", "3"],
          rows: [["g(x)", "6", "7", "9", "13"]],
        },
      ],
      choices: ["g(x) = 6(1.5)ˣ", "g(x) = 6 + (7/6)ˣ", "g(x) = 6 + 2x", "g(x) = 2ˣ + 5"],
      correctAnswer: 3,
      explanation:
        "Subtracting 5 gives 1, 2, 4, 8, which are proportional with ratio 2. So g(x) = 2ˣ + 5. Check: g(3) = 8 + 5 = 13.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "6(1.5)ˣ gives 6, 9, 13.5, 20.25.",
        "6 + (7/6)ˣ gives g(0) = 7, not 6.",
        "6 + 2x gives 6, 8, 10, 12.",
        "g(x) − 5 = 1, 2, 4, 8 is proportional, so g is an additive transformation of 2ˣ.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "When outputs are not proportional, try subtracting a constant first.",
    },
    {
      id: "precalculus-2-3-q07",
      topicId: "precalculus-2-3",
      concept: "end-behavior",
      difficulty: "Core",
      skill: "identify-information",
      prompt: "For f(x) = −5(2)ˣ, what is lim x→−∞ f(x)?",
      choices: ["−∞", "∞", "0", "−5"],
      correctAnswer: 2,
      explanation:
        "As x decreases without bound, 2ˣ gets arbitrarily close to 0, so −5(2)ˣ also gets arbitrarily close to 0.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "−∞ is lim x→∞ f(x), the other end.",
        "f(x) is negative for every x, so it never increases without bound.",
        "2ˣ → 0 as x → −∞, so −5(2)ˣ → 0.",
        "−5 is f(0), the initial value.",
      ],
      nearMissIndex: 0,
      distinguisher: "The end where bˣ shrinks approaches 0, whatever the sign of a.",
    },
    {
      id: "precalculus-2-3-q08",
      topicId: "precalculus-2-3",
      concept: "general-form",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "An exponential function f(x) = abˣ has f(0) = 12 and f(1) = 9. What is f(3)?",
      choices: ["5.0625", "3", "6.75", "0"],
      correctAnswer: 0,
      explanation: "a = 12 and b = 9/12 = 0.75, so f(3) = 12(0.75)³ = 5.0625.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "f(3) = 12(0.75)³ = 5.0625.",
        "3 subtracts 3 per unit, which treats f as linear.",
        "6.75 = 12(0.75)² is f(2), with two factors of the base instead of three.",
        "0 continues subtracting 3, which is linear change.",
      ],
      nearMissIndex: 2,
      distinguisher: "The input 3 means three factors of the base.",
    },
    {
      id: "precalculus-2-3-q09",
      topicId: "precalculus-2-3",
      concept: "monotonic-and-concavity",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A student claims that h(x) = 3(0.7)ˣ has an absolute minimum on the interval −∞ < x < ∞. Which response is correct?",
      choices: [
        "The claim is correct, because h is decreasing.",
        "The claim is correct, because h(x) approaches 0 as x increases.",
        "The claim is incorrect, because the absolute minimum is 0.",
        "The claim is incorrect, because h is always decreasing, so it has no extrema except on a closed interval.",
      ],
      correctAnswer: 3,
      explanation:
        "h is always decreasing and its outputs get arbitrarily close to 0 but never reach it, so h has no minimum on the set of all real numbers.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "A decreasing function on all real numbers has no smallest output.",
        "Approaching 0 is not the same as reaching a minimum value.",
        "0 is never an output of h, since 3(0.7)ˣ > 0 for every x.",
        "Exponential functions do not have extrema except on a closed interval.",
      ],
      nearMissIndex: 2,
      distinguisher: "A horizontal asymptote is not a minimum value.",
    },
    {
      id: "precalculus-2-3-q10",
      topicId: "precalculus-2-3",
      concept: "general-form",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "For f(x) = 2(3)ˣ, the input x = 4 specifies the number of factors of the base applied to the initial value. Which expression equals f(4)?",
      choices: ["2·4·3", "2·3·3·3·3", "(2·3)⁴", "2 + 3 + 3 + 3 + 3"],
      correctAnswer: 1,
      explanation:
        "f(4) = 2(3)⁴ applies four factors of 3 to the initial value 2: 2·3·3·3·3 = 162.",
      sourceIds: ["ced", "ced-topic-2-3"],
      choiceExplanations: [
        "2·4·3 = 24 multiplies by the input instead of using it as an exponent.",
        "Four factors of the base 3 applied to the initial value 2.",
        "(2·3)⁴ = 1296 also raises the initial value to the fourth power.",
        "Repeated addition describes a linear function.",
      ],
      nearMissIndex: 2,
      distinguisher: "Only the base is repeated; the initial value appears once.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-2-3-mcq",
      courseId: "precalculus",
      unitId: "precalculus-2",
      topicId: "precalculus-2-3",
      title: "Exponential Functions multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-2-3-q01",
        "precalculus-2-3-q02",
        "precalculus-2-3-q03",
        "precalculus-2-3-q04",
        "precalculus-2-3-q05",
        "precalculus-2-3-q06",
        "precalculus-2-3-q07",
        "precalculus-2-3-q08",
        "precalculus-2-3-q09",
        "precalculus-2-3-q10",
      ],
    },
  ],
};

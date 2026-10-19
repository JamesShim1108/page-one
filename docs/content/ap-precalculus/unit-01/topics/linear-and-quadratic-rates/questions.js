// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-3-q01",
      topicId: "precalculus-1-3",
      concept: "linear-rates",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt: "Which of the functions in the table is linear?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values at equally spaced inputs",
          columns: ["x", "f(x)", "g(x)", "h(x)"],
          rows: [
            ["0", "2", "1", "12"],
            ["1", "5", "3", "9"],
            ["2", "8", "6", "6"],
            ["3", "11", "10", "3"],
          ],
        },
      ],
      choices: ["f only", "g only", "f and h", "g and h"],
      correctAnswer: 2,
      explanation:
        "The outputs of f change by +3 each step and the outputs of h change by −3 each step, so both have a constant rate. The outputs of g change by 2, 3, 4, which is not constant.",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "f is linear, but so is h. A constant negative rate is still a constant rate.",
        "g changes by 2, then 3, then 4, so its rate is not constant and g is not linear.",
        "f changes by 3 each step and h changes by −3 each step. Both have constant rates.",
        "g is not linear because its changes are 2, 3, 4, though h is linear.",
      ],
      nearMissIndex: 0,
      distinguisher: "A decreasing function can still be linear if its rate is constant.",
    },
    {
      id: "precalculus-1-3-q02",
      topicId: "precalculus-1-3",
      concept: "quadratic-rates",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "For a quadratic function, how do the average rates of change over consecutive intervals of the same width behave?",
      choices: [
        "They stay constant from one interval to the next.",
        "They change by the same amount from one interval to the next.",
        "They double from one interval to the next.",
        "They alternate between positive and negative values.",
      ],
      correctAnswer: 1,
      explanation:
        "The average rates of a quadratic form a linear pattern, so they increase or decrease by a constant amount each time.",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "Constant rates are the signature of a linear function, not a quadratic.",
        "Average rates for a quadratic change by a constant amount, so they form a linear pattern.",
        "Doubling describes exponential growth. Quadratic rates change by adding a fixed amount.",
        "Nothing in a quadratic forces the rates to alternate in sign.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Constant rate means linear. Constantly changing rate means quadratic.",
    },
    {
      id: "precalculus-1-3-q03",
      topicId: "precalculus-1-3",
      concept: "secant-lines",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "Let f(x) = x² − x. What is the slope of the secant line through the points on the graph of f where x = 1 and x = 4?",
      choices: ["3", "4", "6", "12"],
      correctAnswer: 1,
      explanation: "Here f(1) = 0 and f(4) = 12. The slope is (12 − 0)/(4 − 1) = 4.",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "Dividing 12 by 4 uses the endpoint instead of the interval width, which is 3.",
        "The output change is 12 and the input change is 3, so the slope is 12/3 = 4.",
        "6 is the average of the two outputs, not a slope.",
        "12 is the change in output. The slope also requires dividing by the change in input.",
      ],
      nearMissIndex: 0,
      distinguisher: "Divide by the width of the interval, not by one of its endpoints.",
    },
    {
      id: "precalculus-1-3-q04",
      topicId: "precalculus-1-3",
      concept: "concavity-from-rates",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The average rates of change of f over three consecutive equal-width intervals are 9, 5, and 1. Which statement is correct?",
      choices: [
        "The graph is concave down, because the rates keep decreasing.",
        "The graph is concave up, because all of the rates are positive.",
        "The function is linear, because the rates change by the same amount each time.",
        "The function is decreasing, because the rates are getting smaller.",
      ],
      correctAnswer: 0,
      explanation:
        "The rates drop from 9 to 5 to 1, so the rate of change is decreasing. That is the definition of concave down. All the rates are positive, so f is still increasing.",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "The rates keep decreasing, which means the graph is concave down.",
        "Positive rates make a function increasing. Concavity depends on whether the rates are rising or falling.",
        "A linear function has equal rates. These rates change, by −4 each time, which points to a quadratic pattern.",
        "The rates are positive, so f is increasing, not decreasing, even though the rates shrink.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Sign of the rates gives increasing or decreasing. Change in the rates gives concavity.",
    },
    {
      id: "precalculus-1-3-q05",
      topicId: "precalculus-1-3",
      concept: "quadratic-rates",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "For g(x) = 2x² − 3x + 1, the average rates over [0, 1], [1, 2], [2, 3] are −1, 3, 7. By how much do the average rates increase from one interval to the next?",
      choices: ["2", "3", "4", "8"],
      correctAnswer: 2,
      explanation:
        "From −1 to 3 to 7 the rates increase by 4 each time. For ax² + bx + c on intervals of width 1, the rates change by 2a, and here 2a = 4.",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "2 is the coefficient a, but the rates change by 2a = 4 on intervals of width 1.",
        "3 is the second rate, not the amount by which the rates change.",
        "−1 → 3 → 7 increases by 4 each time, and 2a = 2 · 2 = 4.",
        "8 is twice the actual change. The rates change by 4, not 8.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The common difference between rates for width 1 is twice the leading coefficient.",
    },
    {
      id: "precalculus-1-3-q06",
      topicId: "precalculus-1-3",
      concept: "quadratic-rates",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "A quadratic function has average rates of change of 5 and 9 over the intervals [0, 1] and [1, 2]. What is its average rate of change over [2, 3]?",
      choices: ["14", "13", "11", "18"],
      correctAnswer: 1,
      explanation:
        "The rates 5 and 9 differ by 4. A quadratic's rates change by a constant amount, so the next rate is 9 + 4 = 13.",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "14 comes from adding the first rate, 5, to 9. The amount to add is the difference between the rates, 4.",
        "The rates increase by 4 each time, so the next rate is 9 + 4 = 13.",
        "11 adds only 2, which is half the actual constant difference.",
        "18 doubles 9. Quadratic rates grow by a fixed amount, not by doubling.",
      ],
      nearMissIndex: 0,
      distinguisher: "Find the constant difference between rates, then add it once.",
    },
    {
      id: "precalculus-1-3-q07",
      topicId: "precalculus-1-3",
      concept: "secant-lines",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The points (−1, 4) and (3, 12) lie on the graph of h. Which statement about the secant line through them is correct?",
      choices: [
        "Its slope is 8, which is the change in output.",
        "Its slope is 1/2, which is the average rate of change.",
        "Its slope is 3, which is the average of 4 and 12 divided by 3.",
        "Its slope is 2, which is the average rate of change of h on [−1, 3].",
      ],
      correctAnswer: 3,
      explanation:
        "The slope is (12 − 4)/(3 − (−1)) = 8/4 = 2. This is also the average rate of change of h on [−1, 3].",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "8 is the output change. The slope divides this by the input change, 4.",
        "1/2 inverts the ratio. Slope is rise over run, the output change over the input change.",
        "That calculation does not correspond to rise over run. Subtract the coordinates and divide.",
        "The output change is 8 and the input change is 4, so the slope is 2, equal to the average rate.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Slope and average rate are the same ratio: output change over input change.",
    },
    {
      id: "precalculus-1-3-q08",
      topicId: "precalculus-1-3",
      concept: "concavity-from-rates",
      difficulty: "Core",
      skill: "construct-representations",
      prompt: "Which description is consistent with the values of k in the table?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of k at equally spaced inputs",
          columns: ["x", "k(x)"],
          rows: [
            ["0", "3"],
            ["1", "5"],
            ["2", "9"],
            ["3", "15"],
            ["4", "23"],
          ],
        },
      ],
      choices: [
        "A concave up function whose average rates 2, 4, 6, 8 increase steadily",
        "A linear function, because the outputs always increase from one input to the next",
        "A concave down function, because the outputs grow larger at every step",
        "A function with a constant average rate of 5.75 over every interval",
      ],
      correctAnswer: 0,
      explanation:
        "The outputs change by 2, 4, 6, 8. The rates increase by 2 each time, so the graph is concave up and the data are consistent with a quadratic function.",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "The rates 2, 4, 6, 8 increase by a constant amount, so the graph is concave up and fits a quadratic pattern.",
        "Outputs always increasing does not make a function linear. A linear function needs equal output changes.",
        "Growing outputs do not make the graph concave down. The rates are increasing, which is concave up.",
        "The overall average over [0, 4] is 5, and a single average does not describe the changing rates.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A linear function needs equal changes, not just increasing outputs.",
    },
    {
      id: "precalculus-1-3-q09",
      topicId: "precalculus-1-3",
      concept: "concavity-from-rates",
      difficulty: "Apply",
      skill: "apply-results",
      prompt:
        "A ball's height is recorded each second: 10, 25, 30, 25 feet at 0, 1, 2, 3 seconds. Which statement describes the average rates of change over consecutive 1-second intervals?",
      choices: [
        "They are 15, 25, and 30, which increase, so the graph is concave up.",
        "They are constant at 5 feet per second, so the graph is a line.",
        "They are 15, 5, and −5, which increase, so the graph is concave up.",
        "They are 15, 5, and −5, which decrease by 10 each second, so the graph is concave down.",
      ],
      correctAnswer: 3,
      explanation:
        "The rates are 25 − 10 = 15, 30 − 25 = 5, and 25 − 30 = −5. They drop by 10 each second, so the graph is concave down, the shape of a thrown ball's height.",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "15, 25, and 30 are the heights, not the rates. The rates are the changes between heights.",
        "The rates are not constant. Each is different from the last.",
        "The rates 15, 5, −5 are correct, but they decrease. Decreasing rates give a concave down graph.",
        "The rates 15, 5, −5 fall by 10 each second, so the graph is concave down.",
      ],
      nearMissIndex: 2,
      distinguisher: "Check the direction of the rates, not just their values.",
    },
    {
      id: "precalculus-1-3-q10",
      topicId: "precalculus-1-3",
      concept: "linear-rates",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A linear function has the same average rate of change over every interval. At what rate do those average rates change?",
      choices: [
        "At a constant nonzero rate",
        "At the same rate as the slope",
        "At a rate of zero",
        "At a rate that cannot be determined",
      ],
      correctAnswer: 2,
      explanation:
        "The average rates of a linear function never change, so they change at a rate of zero.",
      sourceIds: ["ced", "ced-topic-1-3"],
      choiceExplanations: [
        "A constant nonzero change in the rates is the pattern of a quadratic function.",
        "The slope is the rate of the function itself. The rates do not change, so their rate of change is not the slope.",
        "The rates are always the same value, so they are not changing, and their rate of change is zero.",
        "The rates are all equal, so the rate at which they change is easy to determine.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Quadratics change their rates by a constant nonzero amount. Lines change them by zero.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-3-quick",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-3",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-1-3-q01",
        "precalculus-1-3-q02",
        "precalculus-1-3-q03",
        "precalculus-1-3-q04",
      ],
    },
    {
      id: "precalculus-1-3-quiz",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-3",
      title: "Rates of Change in Linear and Quadratic Functions topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-1-3-q05",
        "precalculus-1-3-q06",
        "precalculus-1-3-q07",
        "precalculus-1-3-q08",
        "precalculus-1-3-q09",
        "precalculus-1-3-q10",
      ],
    },
  ],
};

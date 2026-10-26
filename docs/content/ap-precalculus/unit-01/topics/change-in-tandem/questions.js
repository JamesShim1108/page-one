// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-1-q01",
      topicId: "precalculus-1-1",
      concept: "function-basics",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The table gives pairs of values for the quantities x and y. Which of the following statements is true?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Pairs of values",
          columns: ["x", "y"],
          rows: [
            ["1", "3"],
            ["2", "5"],
            ["2", "6"],
            ["4", "8"],
          ],
        },
      ],
      choices: [
        "y is a function of x, because every value of x is paired with a value of y.",
        "y is a function of x, because no value of y is repeated.",
        "y is not a function of x, because the input value 2 is mapped to two output values.",
        "y is not a function of x, because the values of y do not change by a constant amount.",
      ],
      correctAnswer: 2,
      explanation:
        "A function maps each input value to exactly one output value. The input value 2 is paired with both 5 and 6, so y is not a function of x.",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "Having an output value for every input value is not enough. Each input value must have exactly one output value.",
        "Repeated output values are allowed. Only one input value with two different output values breaks the definition.",
        "The input value 2 is mapped to 5 and to 6, so the relation is not a function.",
        "A constant change describes a linear function, but a function does not have to be linear.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A function may repeat output values, but one input value can never have two output values.",
    },
    {
      id: "precalculus-1-1-q02",
      topicId: "precalculus-1-1",
      concept: "increasing-decreasing",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The table gives values of the function P for selected values of t. Based on the table, which of the following could be the interval on which P is increasing?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of P",
          columns: ["t", "P(t)"],
          rows: [
            ["0", "5"],
            ["1", "12"],
            ["2", "15"],
            ["3", "12"],
            ["4", "5"],
          ],
        },
      ],
      choices: ["(0, 4)", "(2, 4)", "(1, 3)", "(0, 2)"],
      correctAnswer: 3,
      explanation:
        "As t increases from 0 to 2, the values P(t) = 5, 12, 15 increase. From t = 2 to t = 4 they decrease. P could be increasing on (0, 2).",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "P(4) = 5 is less than P(2) = 15, so P is not increasing on all of (0, 4).",
        "From t = 2 to t = 4 the values fall from 15 to 5, so P is decreasing there.",
        "P(3) = 12 is less than P(2) = 15, so P is not increasing on (1, 3).",
        "For the listed values, a < b in (0, 2) gives P(a) < P(b).",
      ],
      nearMissIndex: 2,
      distinguisher:
        "An increasing interval cannot contain an input value where the output values start to fall.",
    },
    {
      id: "precalculus-1-1-q03",
      topicId: "precalculus-1-1",
      concept: "concavity",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The table gives values of the function h at equally spaced values of x. Which of the following best describes h on the interval 0 < x < 4?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of h",
          columns: ["x", "h(x)"],
          rows: [
            ["0", "20"],
            ["1", "12"],
            ["2", "7"],
            ["3", "4"],
            ["4", "3"],
          ],
        },
      ],
      choices: [
        "h is increasing, and the rate of change of h is increasing.",
        "h is decreasing, and the rate of change of h is increasing.",
        "h is decreasing, and the rate of change of h is decreasing.",
        "h is increasing, and the rate of change of h is decreasing.",
      ],
      correctAnswer: 1,
      explanation:
        "The output values fall, so h is decreasing. The changes are −8, −5, −3, −1, which are increasing, so the rate of change of h is increasing and the graph of h is concave up.",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "The output values fall from 20 to 3, so h is decreasing, not increasing.",
        "The changes −8, −5, −3, −1 increase over equal-length intervals, so h is decreasing while its rate of change increases.",
        "The drops shrink in size, so the changes −8, −5, −3, −1 increase. The rate of change is increasing.",
        "The output values fall, so h is not increasing.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Compare the signed changes −8, −5, −3, −1. They are increasing even though each is negative.",
    },
    {
      id: "precalculus-1-1-q04",
      topicId: "precalculus-1-1",
      concept: "zeros",
      difficulty: "Quick check",
      skill: "solve",
      prompt:
        "The function p is given by p(x) = (x − 4)(x + 1). What are all values of x for which p(x) = 0?",
      choices: ["x = 4 and x = −1", "x = 4 and x = 1", "x = −4 only", "x = −4 and x = 1"],
      correctAnswer: 0,
      explanation: "p(x) = 0 when x − 4 = 0 or x + 1 = 0, so x = 4 or x = −1.",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "x − 4 = 0 at x = 4 and x + 1 = 0 at x = −1, so both are zeros.",
        "p(1) = (−3)(2) = −6, so 1 is not a zero of p.",
        "p(−4) = 24, and p has two zeros, not one.",
        "The signs are reversed: p(−4) = (−8)(−3) = 24, not 0.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "The factor (x − c) is 0 at x = c, so the zero has the opposite sign of the number shown in the factor.",
    },
    {
      id: "precalculus-1-1-q05",
      topicId: "precalculus-1-1",
      concept: "function-basics",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "For the function f, f(3) = 7 and f(−1) = 7. Which of the following statements must be true?",
      choices: [
        "The values 3 and −1 are both in the preimage of 7.",
        "f is not a function, because the output value 7 occurs twice.",
        "The value 7 is in the preimage of both 3 and −1.",
        "The value 3 is the image of −1.",
      ],
      correctAnswer: 0,
      explanation:
        "The image of both 3 and −1 is 7, so both input values belong to the preimage of 7. Two input values sharing an output value is allowed for a function.",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "The preimage of 7 is the set of input values that give 7, which includes 3 and −1.",
        "A function may give the same output value for different input values. It only forbids one input value with two output values.",
        "The roles are reversed. 7 is an output value, so it is the image of 3 and of −1.",
        "The image of −1 is f(−1) = 7, not 3.",
      ],
      nearMissIndex: 1,
      distinguisher: "Images are output values and preimages are sets of input values.",
    },
    {
      id: "precalculus-1-1-q06",
      topicId: "precalculus-1-1",
      concept: "function-basics",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The function f is defined only for the values of x in the table. Which of the following gives the domain and the range of f?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of f",
          columns: ["x", "f(x)"],
          rows: [
            ["−2", "7"],
            ["0", "3"],
            ["1", "3"],
            ["4", "−1"],
          ],
        },
      ],
      choices: [
        "Domain {−1, 3, 7}; range {−2, 0, 1, 4}",
        "Domain {−2, 0, 1, 4}; range {−1, 3, 7}",
        "Domain all real numbers; range {−1, 3, 7}",
        "Domain {−2, 0, 1, 4}; range {3}",
      ],
      correctAnswer: 1,
      explanation:
        "The domain is the set of input values, {−2, 0, 1, 4}. The range is the set of output values, {−1, 3, 7}.",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "This swaps the sets. The input values form the domain and the output values form the range.",
        "The input values are −2, 0, 1, 4 and the distinct output values are −1, 3, 7.",
        "f is defined only at the four listed input values, so its domain is not all real numbers.",
        "The range contains every output value, including 7 and −1, not only the repeated value.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The domain comes from the x column and the range from the distinct values in the f(x) column.",
    },
    {
      id: "precalculus-1-1-q07",
      topicId: "precalculus-1-1",
      concept: "concavity",
      difficulty: "Core",
      skill: "construct-representations",
      prompt:
        "The table gives values of the function g at equally spaced values of x. Which of the following statements about the graph of g is true?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of g",
          columns: ["x", "g(x)"],
          rows: [
            ["0", "1"],
            ["2", "3"],
            ["4", "7"],
            ["6", "15"],
            ["8", "31"],
          ],
        },
      ],
      choices: [
        "The graph is concave down, because each output value is greater than the one before.",
        "The graph is a line, because the output values always increase.",
        "The graph is concave up, because the changes in g(x), 2, 4, 8, 16, are increasing.",
        "The graph increases and then decreases, because the changes in g(x) keep growing.",
      ],
      correctAnswer: 2,
      explanation:
        "Over equal-length intervals the output values increase by 2, 4, 8, then 16. The changes are increasing, so the rate of change of g is increasing and the graph is concave up.",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "Greater output values show only that g is increasing. Concave down would need the changes to decrease.",
        "A linear function has equal changes over equal-length intervals, and these changes are not equal.",
        "The changes 2, 4, 8, 16 increase over equal-length intervals, so the rate of change is increasing.",
        "The output values never decrease, so the graph does not turn.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Look at how the changes change, not only at whether the output values increase.",
    },
    {
      id: "precalculus-1-1-q08",
      topicId: "precalculus-1-1",
      concept: "construct-graph",
      difficulty: "Apply",
      skill: "construct-representations",
      prompt:
        "Water is poured at a constant rate into a vase that gets narrower toward the top. The function H gives the height of the water, in centimeters, t seconds after pouring begins, until the vase is full. Which of the following describes the graph of y = H(t)?",
      choices: [
        "H is increasing, and the graph of H is concave down.",
        "H is decreasing, and the graph of H is concave up.",
        "H is increasing, and the graph of H is a line.",
        "H is increasing, and the graph of H is concave up.",
      ],
      correctAnswer: 3,
      explanation:
        "The height rises the whole time, so H is increasing. Each second adds the same volume to a narrower part of the vase, so the height rises by more each second. The rate of change of H is increasing, and the graph is concave up.",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "Concave down would mean the height rises by less each second, which happens in a vase that gets wider.",
        "Water is being added, so the height is increasing, not decreasing.",
        "A line would need the height to rise by the same amount each second, which needs a vase of constant width.",
        "The height increases, and it increases at an increasing rate as the vase narrows.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A narrower cross section makes the same volume of water add more height.",
    },
    {
      id: "precalculus-1-1-q09",
      topicId: "precalculus-1-1",
      concept: "concavity",
      difficulty: "Apply",
      skill: "identify-information",
      prompt:
        "The depth of water, in feet, in a pond is modeled by the function W. The graph of y = W(t) is shown for 0 ≤ t ≤ 9, where t is the number of days since the first day of a month. What are all intervals of t on which the depth of water is increasing at a decreasing rate?",
      stimulusBlocks: [
        {
          type: "graph",
          caption: "Graph of y = W(t)",
          alt: "A curve that starts at (0, 2), rises with increasing steepness to (3, 4), keeps rising but flattens to a peak at (6, 6), and then falls to (9, 2).",
          window: {
            x: [0, 9],
            y: [0, 7],
          },
          ticks: {
            x: 1,
            y: 1,
          },
          axisLabels: {
            x: "t",
            y: "W(t)",
          },
          functions: [
            {
              expr: "-t^3/27 + t^2/3 + 2",
              variable: "t",
              domain: [0, 9],
              label: "W",
              labelAt: 7.5,
              labelPosition: "ne",
            },
          ],
        },
      ],
      choices: ["(0, 3)", "(3, 6) only", "(0, 6)", "(6, 9)"],
      correctAnswer: 1,
      explanation:
        "W is increasing on (0, 6). On (0, 3) the graph is concave up, so the rate of change is increasing; on (3, 6) it is concave down, so the rate of change is decreasing. W is increasing at a decreasing rate on (3, 6) only.",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "On (0, 3) the graph is concave up, so W is increasing at an increasing rate.",
        "On (3, 6), W is increasing and the graph is concave down, so the rate of change is decreasing.",
        "On (0, 3) the rate of change is increasing, so the whole interval (0, 6) does not work.",
        "On (6, 9), W is decreasing.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Increasing at a decreasing rate needs both: the graph rises, and it is concave down.",
    },
    {
      id: "precalculus-1-1-q10",
      topicId: "precalculus-1-1",
      concept: "function-basics",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "The functions f and g are given by f(x) = (x² − 4)/(x − 2) and g(x) = x + 2. Which of the following statements is true?",
      choices: [
        "f and g are equal, because f(x) = g(x) for every value of x in the domain of f.",
        "f and g are equal, because their graphs are the same line.",
        "f and g are not equal, because f(x) = g(x) is false for every value of x.",
        "f and g are not equal, because 2 is in the domain of g but not in the domain of f.",
      ],
      correctAnswer: 3,
      explanation:
        "Equal functions must have the same domain. f(2) is undefined, so 2 is not in the domain of f, but g(2) = 4. Even though f(x) = g(x) for all x ≠ 2, the functions are not equal.",
      sourceIds: ["ced", "ced-topic-1-1"],
      choiceExplanations: [
        "Agreeing on the domain of f is not enough. The domains themselves must be the same, and 2 is in the domain of g only.",
        "The graph of f is the line y = x + 2 with the point (2, 4) missing, so the graphs are not the same.",
        "f(x) = g(x) is true for every x ≠ 2, so this reason is false.",
        "f is undefined at x = 2 while g(2) = 4, so the domains differ and the functions are not equal.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Two functions are equal only when their domains match and their output values match.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-1-mcq",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-1",
      title: "Change in Tandem multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-1-1-q01",
        "precalculus-1-1-q02",
        "precalculus-1-1-q03",
        "precalculus-1-1-q04",
        "precalculus-1-1-q05",
        "precalculus-1-1-q06",
        "precalculus-1-1-q07",
        "precalculus-1-1-q08",
        "precalculus-1-1-q09",
        "precalculus-1-1-q10",
      ],
    },
  ],
};

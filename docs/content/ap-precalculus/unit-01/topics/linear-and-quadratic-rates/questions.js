// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  "questions": [
    {
      "id": "precalculus-1-3-q01",
      "topicId": "precalculus-1-3",
      "concept": "linear-rates",
      "difficulty": "Quick check",
      "skill": "identify-information",
      "prompt": "The table gives values of the functions f, g, and h at selected values of x. Which of the functions could be linear?",
      "stimulusBlocks": [
        {
          "type": "table",
          "caption": "Values of f, g, and h",
          "columns": [
            "x",
            "f(x)",
            "g(x)",
            "h(x)"
          ],
          "rows": [
            [
              "0",
              "2",
              "1",
              "12"
            ],
            [
              "1",
              "5",
              "3",
              "9"
            ],
            [
              "2",
              "8",
              "6",
              "6"
            ],
            [
              "3",
              "11",
              "10",
              "3"
            ]
          ]
        }
      ],
      "choices": [
        "f only",
        "g only",
        "f and h only",
        "g and h only"
      ],
      "correctAnswer": 2,
      "explanation": "Over consecutive intervals of length 1, f changes by 3 each time and h changes by −3 each time, so each has a constant average rate of change. g changes by 2, 3, 4, which is not constant.",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "f could be linear, but so could h. A constant negative average rate of change is still constant.",
        "g changes by 2, 3, then 4, so its average rate of change is not constant.",
        "f has a constant average rate of change of 3 and h has a constant average rate of change of −3.",
        "g is not linear because its changes are 2, 3, 4."
      ],
      "nearMissIndex": 0,
      "distinguisher": "A decreasing function is linear when its average rate of change is constant."
    },
    {
      "id": "precalculus-1-3-q02",
      "topicId": "precalculus-1-3",
      "concept": "quadratic-rates",
      "difficulty": "Quick check",
      "skill": "describe",
      "prompt": "Which of the following statements is true about the average rates of change of a quadratic function over consecutive equal-length input-value intervals?",
      "choices": [
        "The average rates of change are constant.",
        "The average rates of change are given by a linear function.",
        "The average rates of change double from each interval to the next.",
        "The average rates of change alternate between positive and negative values."
      ],
      "correctAnswer": 1,
      "explanation": "For a quadratic function, the average rates of change over consecutive equal-length intervals change by a constant amount, so they are given by a linear function.",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "Constant average rates of change describe a linear function, not a quadratic function.",
        "They change by the same amount each time, which is what a linear function does.",
        "Doubling describes multiplicative change, which is studied in Unit 2.",
        "Nothing about a quadratic function forces the signs to alternate."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Constant means linear. Changing at a constant rate means quadratic."
    },
    {
      "id": "precalculus-1-3-q03",
      "topicId": "precalculus-1-3",
      "concept": "secant-lines",
      "difficulty": "Quick check",
      "skill": "identify-information",
      "prompt": "The function f is given by f(x) = x² − x. What is the slope of the secant line from the point (1, f(1)) to the point (4, f(4))?",
      "choices": [
        "3",
        "4",
        "6",
        "12"
      ],
      "correctAnswer": 1,
      "explanation": "f(1) = 0 and f(4) = 12, so the slope is (12 − 0)/(4 − 1) = 4.",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "12/4 divides by the right endpoint instead of the change in input values, which is 3.",
        "(f(4) − f(1))/(4 − 1) = 12/3 = 4.",
        "6 is the average of the output values 0 and 12, not a slope.",
        "12 is the change in output values. It must be divided by the change in input values."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Divide by the change in input values, not by an endpoint."
    },
    {
      "id": "precalculus-1-3-q04",
      "topicId": "precalculus-1-3",
      "concept": "concavity-from-rates",
      "difficulty": "Quick check",
      "skill": "describe",
      "prompt": "The average rates of change of the function f over three consecutive equal-length intervals are 9, 5, and 1. Which of the following statements is true?",
      "choices": [
        "The graph of f is concave down, because the average rates of change are decreasing.",
        "The graph of f is concave up, because the average rates of change are positive.",
        "f is linear, because the average rates of change change by the same amount.",
        "f is decreasing, because the average rates of change are decreasing."
      ],
      "correctAnswer": 0,
      "explanation": "The average rates of change decrease from 9 to 5 to 1, so the graph is concave down. All three are positive, so f is increasing.",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "Decreasing average rates of change over equal-length intervals mean the graph is concave down.",
        "Positive average rates of change mean f is increasing. Concavity depends on whether they increase or decrease.",
        "A linear function has equal average rates of change. These change by −4 each time.",
        "The average rates of change are positive, so f is increasing."
      ],
      "nearMissIndex": 1,
      "distinguisher": "The sign of the rates gives increasing or decreasing. Their change gives concavity."
    },
    {
      "id": "precalculus-1-3-q05",
      "topicId": "precalculus-1-3",
      "concept": "quadratic-rates",
      "difficulty": "Core",
      "skill": "identify-information",
      "prompt": "The function g is given by g(x) = 2x² − 3x + 1. The average rates of change of g over [0, 1], [1, 2], and [2, 3] are −1, 3, and 7. By how much does the average rate of change increase from each interval to the next?",
      "choices": [
        "2",
        "3",
        "4",
        "8"
      ],
      "correctAnswer": 2,
      "explanation": "−1 to 3 to 7 increases by 4 each time. For ax² + bx + c over intervals of length 1, the average rates of change change by 2a = 4.",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "2 is the leading coefficient a. The average rates of change change by 2a = 4.",
        "3 is one of the average rates of change, not the change between them.",
        "3 − (−1) = 4 and 7 − 3 = 4.",
        "8 is twice the change between consecutive average rates of change."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Subtract consecutive average rates of change to find the constant change."
    },
    {
      "id": "precalculus-1-3-q06",
      "topicId": "precalculus-1-3",
      "concept": "quadratic-rates",
      "difficulty": "Core",
      "skill": "apply-results",
      "prompt": "The function q is quadratic. The average rate of change of q over [0, 1] is 5, and the average rate of change of q over [1, 2] is 9. What is the average rate of change of q over [2, 3]?",
      "choices": [
        "14",
        "13",
        "11",
        "18"
      ],
      "correctAnswer": 1,
      "explanation": "For a quadratic function the average rates of change over consecutive equal-length intervals change by a constant amount. 9 − 5 = 4, so the next is 9 + 4 = 13.",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "14 adds 5 to 9. The amount to add is the change, 9 − 5 = 4.",
        "The average rates of change increase by 4 each time, so the next is 13.",
        "11 adds 2, half of the constant change.",
        "18 doubles 9, but quadratic average rates of change change by a constant amount."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Find the constant change, then add it once."
    },
    {
      "id": "precalculus-1-3-q07",
      "topicId": "precalculus-1-3",
      "concept": "secant-lines",
      "difficulty": "Core",
      "skill": "identify-information",
      "prompt": "The points (−1, 4) and (3, 12) are on the graph of the function h. Which of the following statements is true?",
      "choices": [
        "The secant line through the points has slope 8, the change in the output values.",
        "The average rate of change of h over [−1, 3] is 1/2.",
        "The average rate of change of h over [−1, 3] is 3, the change in the input values.",
        "The average rate of change of h over [−1, 3] is 2, the slope of the secant line."
      ],
      "correctAnswer": 3,
      "explanation": "The slope of the secant line is (12 − 4)/(3 − (−1)) = 8/4 = 2, which is the average rate of change of h over [−1, 3].",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "8 is the change in output values. The slope divides it by the change in input values, 4.",
        "1/2 inverts the ratio. Output change goes in the numerator.",
        "The change in input values is 4, not 3, and it is not the average rate of change.",
        "8/4 = 2, and the secant slope equals the average rate of change."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Secant slope and average rate of change are the same ratio."
    },
    {
      "id": "precalculus-1-3-q08",
      "topicId": "precalculus-1-3",
      "concept": "concavity-from-rates",
      "difficulty": "Core",
      "skill": "construct-representations",
      "prompt": "The table gives values of the function k at equally spaced values of x. Which of the following statements about k is true?",
      "stimulusBlocks": [
        {
          "type": "table",
          "caption": "Values of k",
          "columns": [
            "x",
            "k(x)"
          ],
          "rows": [
            [
              "0",
              "3"
            ],
            [
              "1",
              "5"
            ],
            [
              "2",
              "9"
            ],
            [
              "3",
              "15"
            ],
            [
              "4",
              "23"
            ]
          ]
        }
      ],
      "choices": [
        "The average rates of change, 2, 4, 6, 8, increase at a constant rate, so the graph of k is concave up.",
        "k is linear, because its output values increase from each input value to the next.",
        "The graph of k is concave down, because the output values grow larger at every step.",
        "The average rate of change of k is 5 over every interval, so k is linear."
      ],
      "correctAnswer": 0,
      "explanation": "The average rates of change over intervals of length 1 are 2, 4, 6, 8. They increase by a constant 2, so the graph is concave up and k is consistent with a quadratic function.",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "The average rates of change increase by 2 each time, so they change at a constant rate and the graph is concave up.",
        "Increasing output values do not make a function linear. A linear function needs equal changes.",
        "The average rates of change are increasing, which means concave up.",
        "5 is the average rate of change over [0, 4] only. The other intervals give different values."
      ],
      "nearMissIndex": 1,
      "distinguisher": "A linear function needs equal changes, not just output values that increase."
    },
    {
      "id": "precalculus-1-3-q09",
      "topicId": "precalculus-1-3",
      "concept": "concavity-from-rates",
      "difficulty": "Apply",
      "skill": "apply-results",
      "prompt": "The height of a ball, in feet, is 10, 25, 30, and 25 at times t = 0, 1, 2, and 3 seconds. Which of the following describes the average rates of change of the height over consecutive 1-second intervals?",
      "choices": [
        "They are 15, 25, and 30 feet per second, which increase, so the graph is concave up.",
        "They are constant at 5 feet per second, so the graph is a line.",
        "They are 15, 5, and −5 feet per second, which increase, so the graph is concave up.",
        "They are 15, 5, and −5 feet per second, which decrease, so the graph is concave down."
      ],
      "correctAnswer": 3,
      "explanation": "The average rates of change are 25 − 10 = 15, 30 − 25 = 5, and 25 − 30 = −5 feet per second. They decrease by 10 each second, so the graph is concave down.",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "15, 25, and 30 are heights, not average rates of change.",
        "The average rates of change are 15, 5, and −5, which are not constant.",
        "15, 5, −5 are correct, but they decrease, which means concave down.",
        "The average rates of change decrease by 10 each second, so the graph is concave down."
      ],
      "nearMissIndex": 2,
      "distinguisher": "Check whether the average rates of change increase or decrease, not only their values."
    },
    {
      "id": "precalculus-1-3-q10",
      "topicId": "precalculus-1-3",
      "concept": "linear-rates",
      "difficulty": "Core",
      "skill": "support-conclusions",
      "prompt": "For a linear function, the average rates of change over consecutive equal-length input-value intervals are given by a constant function. At what rate are these average rates of change changing?",
      "choices": [
        "At a constant nonzero rate",
        "At a rate equal to the slope of the line",
        "At a rate of zero",
        "At a rate that cannot be determined"
      ],
      "correctAnswer": 2,
      "explanation": "The average rates of change of a linear function are all equal, so they are changing at a rate of zero.",
      "sourceIds": [
        "ced",
        "ced-topic-1-3"
      ],
      "choiceExplanations": [
        "Average rates of change that change at a constant nonzero rate describe a quadratic function.",
        "The slope is the average rate of change itself, not the rate at which it changes.",
        "A constant function does not change, so its rate of change is zero.",
        "The average rates of change are all equal, so the rate at which they change is known."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Linear: the average rates of change do not change. Quadratic: they change at a constant nonzero rate."
    }
  ],
  "quizzes": [
    {
      "id": "precalculus-1-3-quick",
      "courseId": "precalculus",
      "unitId": "precalculus-1",
      "topicId": "precalculus-1-3",
      "title": "Quick check",
      "quizType": "quick",
      "questionIds": [
        "precalculus-1-3-q01",
        "precalculus-1-3-q02",
        "precalculus-1-3-q03",
        "precalculus-1-3-q04"
      ]
    },
    {
      "id": "precalculus-1-3-quiz",
      "courseId": "precalculus",
      "unitId": "precalculus-1",
      "topicId": "precalculus-1-3",
      "title": "Rates of Change in Linear and Quadratic Functions topic practice",
      "quizType": "topic",
      "customPractice": true,
      "questionIds": [
        "precalculus-1-3-q05",
        "precalculus-1-3-q06",
        "precalculus-1-3-q07",
        "precalculus-1-3-q08",
        "precalculus-1-3-q09",
        "precalculus-1-3-q10"
      ]
    }
  ]
};

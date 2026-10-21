// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  "questions": [
    {
      "id": "precalculus-1-12-q01",
      "topicId": "precalculus-1-12",
      "concept": "shifts",
      "difficulty": "Quick check",
      "skill": "describe",
      "prompt": "The function g is given by g(x) = f(x − 4) + 1. Which of the following describes how the graph of g is related to the graph of f?",
      "choices": [
        "A horizontal translation by 4 units and a vertical translation by 1 unit",
        "A horizontal translation by −4 units and a vertical translation by 1 unit",
        "A horizontal translation by 1 unit and a vertical translation by 4 units",
        "A horizontal translation by −1 unit and a vertical translation by −4 units"
      ],
      "correctAnswer": 0,
      "explanation": "f(x + h) translates horizontally by −h units. Here h = −4, so the horizontal translation is by 4 units. Adding 1 translates vertically by 1 unit.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "f(x − 4) is f(x + h) with h = −4, a horizontal translation by 4 units.",
        "The horizontal translation is by −h = 4 units, not −4.",
        "This swaps the two constants.",
        "Both translations are reversed."
      ],
      "nearMissIndex": 1,
      "distinguisher": "g(x) = f(x + h) translates by −h units, so the sign flips."
    },
    {
      "id": "precalculus-1-12-q02",
      "topicId": "precalculus-1-12",
      "concept": "shifts",
      "difficulty": "Quick check",
      "skill": "solve",
      "prompt": "The point (2, 5) is on the graph of the function f. Which of the following points must be on the graph of g(x) = f(x + 3) − 2?",
      "choices": [
        "(5, 3)",
        "(−1, 7)",
        "(−1, 3)",
        "(5, 7)"
      ],
      "correctAnswer": 2,
      "explanation": "g(x) = f(x + 3) − 2 needs x + 3 = 2, so x = −1, and g(−1) = f(2) − 2 = 3. The point (−1, 3) is on the graph of g.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "x = 5 gives f(8), not f(2). The horizontal translation is by −3 units.",
        "The horizontal part is right, but the output value is f(2) − 2 = 3.",
        "g(−1) = f(−1 + 3) − 2 = f(2) − 2 = 3.",
        "Both translations are reversed."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Solve for the input value that makes x + 3 equal the original x-coordinate."
    },
    {
      "id": "precalculus-1-12-q03",
      "topicId": "precalculus-1-12",
      "concept": "dilations-reflections",
      "difficulty": "Quick check",
      "skill": "describe",
      "prompt": "Which of the following functions g is a reflection of the graph of f over the x-axis?",
      "choices": [
        "g(x) = f(−x)",
        "g(x) = −f(x)",
        "g(x) = 1/f(x)",
        "g(x) = −x·f(x)"
      ],
      "correctAnswer": 1,
      "explanation": "g(x) = a·f(x) with a = −1 is a vertical dilation by a factor of 1 with a reflection over the x-axis.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "f(−x) is f(bx) with b = −1, a reflection over the y-axis.",
        "Multiplying the output values by −1 reflects the graph over the x-axis.",
        "1/f(x) is not a transformation of this kind.",
        "Multiplying by −x is not a constant multiple, so it is not a dilation."
      ],
      "nearMissIndex": 0,
      "distinguisher": "A negative multiplier on the output reflects over the x-axis. On the input, it reflects over the y-axis."
    },
    {
      "id": "precalculus-1-12-q04",
      "topicId": "precalculus-1-12",
      "concept": "dilations-reflections",
      "difficulty": "Quick check",
      "skill": "solve",
      "prompt": "The point (6, −4) is on the graph of the function f. Which of the following points must be on the graph of h(x) = f(x/3)?",
      "choices": [
        "(2, −4)",
        "(6, −12)",
        "(18, −12)",
        "(18, −4)"
      ],
      "correctAnswer": 3,
      "explanation": "h(x) = f(bx) with b = 1/3 is a horizontal dilation by a factor of 3. x/3 = 6 gives x = 18, and h(18) = f(6) = −4.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "A horizontal dilation by a factor of 1/|b| = 3 multiplies x-coordinates by 3.",
        "A horizontal dilation does not change the output values.",
        "Only the input is changed, so the output value stays −4.",
        "x/3 = 6 gives x = 18, and the output value is still −4."
      ],
      "nearMissIndex": 0,
      "distinguisher": "f(bx) dilates horizontally by 1/|b|, not by |b|."
    },
    {
      "id": "precalculus-1-12-q05",
      "topicId": "precalculus-1-12",
      "concept": "combining",
      "difficulty": "Core",
      "skill": "identify-information",
      "prompt": "The table gives values of the function f for selected values of x. Let g(x) = a·f(bx) + c, where a, b, and c are constants. The graph of g is constructed by applying three transformations to the graph of f in this order: a horizontal dilation by a factor of 1/2, a vertical dilation by a factor of 2, and a vertical translation by −3 units. What is the value of g(−1)?",
      "stimulusBlocks": [
        {
          "type": "table",
          "caption": "Values of f",
          "columns": [
            "x",
            "f(x)"
          ],
          "rows": [
            [
              "−4",
              "9"
            ],
            [
              "−2",
              "1"
            ],
            [
              "−1",
              "7"
            ],
            [
              "0",
              "−3"
            ],
            [
              "2",
              "6"
            ]
          ]
        }
      ],
      "choices": [
        "−1",
        "5",
        "−4",
        "11"
      ],
      "correctAnswer": 0,
      "explanation": "A horizontal dilation by a factor of 1/2 means b = 2, so g(x) = 2f(2x) − 3. Then g(−1) = 2f(−2) − 3 = 2(1) − 3 = −1.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "g(−1) = 2f(−2) − 3 = 2(1) − 3 = −1.",
        "This translates by 3 units instead of −3 units: 2f(−2) + 3 = 5.",
        "This translates before dilating: 2(f(−2) − 3) = −4. The vertical translation is applied last.",
        "This ignores the horizontal dilation: 2f(−1) − 3 = 11."
      ],
      "nearMissIndex": 1,
      "distinguisher": "A horizontal dilation by a factor of 1/2 corresponds to f(2x)."
    },
    {
      "id": "precalculus-1-12-q06",
      "topicId": "precalculus-1-12",
      "concept": "combining",
      "difficulty": "Core",
      "skill": "construct-functions",
      "prompt": "The graph of g is the graph of f reflected over the x-axis, then translated horizontally by −2 units and vertically by 5 units. Which of the following is an expression for g(x)?",
      "choices": [
        "−f(x − 2) + 5",
        "f(−x + 2) + 5",
        "−f(x) + 7",
        "−f(x + 2) + 5"
      ],
      "correctAnswer": 3,
      "explanation": "A reflection over the x-axis gives −f(x). A horizontal translation by −2 units replaces x with x + 2, and a vertical translation by 5 adds 5: g(x) = −f(x + 2) + 5.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "f(x − 2) is a horizontal translation by 2 units, not −2.",
        "A negative sign on the input reflects over the y-axis.",
        "This has no horizontal translation.",
        "f(x + h) with h = 2 translates by −2 units."
      ],
      "nearMissIndex": 0,
      "distinguisher": "A horizontal translation by −2 units is f(x + 2)."
    },
    {
      "id": "precalculus-1-12-q07",
      "topicId": "precalculus-1-12",
      "concept": "domain-and-range",
      "difficulty": "Core",
      "skill": "identify-information",
      "prompt": "The function g is given by g(x) = 1/(x − 2) + 3. Which of the following are the equations of the asymptotes of the graph of g?",
      "choices": [
        "x = −2 and y = 3",
        "x = 2 and y = −3",
        "x = 2 and y = 3",
        "x = 3 and y = 2"
      ],
      "correctAnswer": 2,
      "explanation": "The parent function 1/x has asymptotes x = 0 and y = 0. A horizontal translation by 2 units moves the vertical asymptote to x = 2, and a vertical translation by 3 units moves the horizontal asymptote to y = 3.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "1/(x − 2) is a horizontal translation by 2 units, so the vertical asymptote is x = 2.",
        "Adding 3 translates the horizontal asymptote up to y = 3.",
        "The vertical asymptote is x = 2 and the horizontal asymptote is y = 3.",
        "The constants are swapped."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Vertical asymptotes move with horizontal translations, and horizontal asymptotes move with vertical ones."
    },
    {
      "id": "precalculus-1-12-q08",
      "topicId": "precalculus-1-12",
      "concept": "domain-and-range",
      "difficulty": "Core",
      "skill": "solve",
      "prompt": "The function f(x) = x² has range y ≥ 0. What is the range of h(x) = −2f(x) + 3?",
      "choices": [
        "y ≥ 3",
        "y ≤ 3",
        "y ≤ −3",
        "y ≥ −3"
      ],
      "correctAnswer": 1,
      "explanation": "f(x) ≥ 0 gives −2f(x) ≤ 0, so h(x) = −2f(x) + 3 ≤ 3. The greatest value, 3, occurs at x = 0.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "The factor −2 reflects the graph over the x-axis, so the inequality reverses.",
        "−2f(x) ≤ 0, so h(x) ≤ 3.",
        "The vertical translation is by 3 units, not −3.",
        "The reflection reverses the inequality, and the translation is by 3, not −3."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Apply the output transformations to y ≥ 0 in order, and reverse the inequality when multiplying by a negative."
    },
    {
      "id": "precalculus-1-12-q09",
      "topicId": "precalculus-1-12",
      "concept": "shifts",
      "difficulty": "Core",
      "skill": "support-conclusions",
      "prompt": "A student claims that the graph of g(x) = f(x + 3) is the graph of f translated horizontally by 3 units, because the constant 3 is added. Which of the following is the best response?",
      "choices": [
        "The claim is incorrect: g(x) = f(x + h) is a horizontal translation by −h units, so the translation is by −3 units.",
        "The claim is incorrect: adding 3 to the input translates the graph vertically by 3 units.",
        "The claim is correct: adding a constant to the input translates the graph by that constant.",
        "The claim is incorrect: the graph is dilated horizontally by a factor of 3."
      ],
      "correctAnswer": 0,
      "explanation": "g(−3) = f(0), so the point (0, f(0)) of f appears at x = −3 on g. The graph is translated horizontally by −3 units.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "g(x) = f(x + h) is a horizontal translation by −h units, so f(x + 3) moves the graph by −3 units.",
        "The 3 is added to the input, so the translation is horizontal.",
        "g(−3) = f(0), so points move by −3 units, not 3.",
        "Adding to the input translates the graph. Multiplying the input dilates it."
      ],
      "nearMissIndex": 2,
      "distinguisher": "Test one point: where does (0, f(0)) appear on g?"
    },
    {
      "id": "precalculus-1-12-q10",
      "topicId": "precalculus-1-12",
      "concept": "combining",
      "difficulty": "Apply",
      "skill": "apply-results",
      "prompt": "The population, in millions, of a town t years after 2020 is modeled by P(t). A second town follows the same pattern 5 years later and is modeled by Q(t) = P(t − 5). Which of the following is the best interpretation?",
      "choices": [
        "The second town's population is 5 million more than the first town's.",
        "The second town's population is 5 times the first town's at every time t.",
        "The second town reaches each value 5 years before the first town does.",
        "The second town reaches each population value 5 years after the first town does."
      ],
      "correctAnswer": 3,
      "explanation": "Q(t) = P(t − 5) is a horizontal translation by 5 units. Q(7) = P(2), so the value the first town has at t = 2 occurs for the second town at t = 7, 5 years later.",
      "sourceIds": [
        "ced",
        "ced-topic-1-12"
      ],
      "choiceExplanations": [
        "A vertical translation would be P(t) + 5.",
        "A vertical dilation would be 5·P(t).",
        "The translation is by 5 units to the right, so events happen later, not earlier.",
        "Q(t) = P(t − 5) shifts each value 5 years later."
      ],
      "nearMissIndex": 2,
      "distinguisher": "A horizontal translation by a positive amount delays every value."
    }
  ],
  "quizzes": [
    {
      "id": "precalculus-1-12-quick",
      "courseId": "precalculus",
      "unitId": "precalculus-1",
      "topicId": "precalculus-1-12",
      "title": "Quick check",
      "quizType": "quick",
      "questionIds": [
        "precalculus-1-12-q01",
        "precalculus-1-12-q02",
        "precalculus-1-12-q03",
        "precalculus-1-12-q04"
      ]
    },
    {
      "id": "precalculus-1-12-quiz",
      "courseId": "precalculus",
      "unitId": "precalculus-1",
      "topicId": "precalculus-1-12",
      "title": "Transformations of Functions topic practice",
      "quizType": "topic",
      "customPractice": true,
      "questionIds": [
        "precalculus-1-12-q05",
        "precalculus-1-12-q06",
        "precalculus-1-12-q07",
        "precalculus-1-12-q08",
        "precalculus-1-12-q09",
        "precalculus-1-12-q10"
      ]
    }
  ]
};

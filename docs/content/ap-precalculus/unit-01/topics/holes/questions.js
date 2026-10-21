// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  "questions": [
    {
      "id": "precalculus-1-10-q01",
      "topicId": "precalculus-1-10",
      "concept": "hole-condition",
      "difficulty": "Quick check",
      "skill": "identify-information",
      "prompt": "The rational function r is given by r(x) = (x − 3)(x + 2)/((x − 3)(x + 5)). At which value of x does the graph of r have a hole?",
      "choices": [
        "x = −5",
        "x = 3",
        "x = −2",
        "x = 3 and x = −5"
      ],
      "correctAnswer": 1,
      "explanation": "3 is a zero of both the numerator and the denominator with multiplicity 1 each, so the graph has a hole at x = 3. At x = −5 only the denominator is 0, which gives a vertical asymptote.",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "x = −5 is a zero of the denominator only, so it is a vertical asymptote.",
        "The multiplicities of 3 in the numerator and denominator are equal, so there is a hole at x = 3.",
        "x = −2 is a real zero of r.",
        "x = −5 is a vertical asymptote, not a hole."
      ],
      "nearMissIndex": 3,
      "distinguisher": "Only a zero shared by the numerator and denominator, with enough multiplicity in the numerator, gives a hole."
    },
    {
      "id": "precalculus-1-10-q02",
      "topicId": "precalculus-1-10",
      "concept": "hole-condition",
      "difficulty": "Quick check",
      "skill": "describe",
      "prompt": "The graph of which of the following functions has a hole?",
      "choices": [
        "r(x) = (x² − 9)/(x − 3)",
        "r(x) = (x² + 9)/(x − 3)",
        "r(x) = (x − 3)/(x² + 9)",
        "r(x) = (x + 3)/(x − 3)"
      ],
      "correctAnswer": 0,
      "explanation": "x² − 9 = (x − 3)(x + 3), so 3 is a zero of the numerator and the denominator with equal multiplicity. The graph has a hole at x = 3.",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "The common factor x − 3 gives a hole at x = 3.",
        "x² + 9 has no real zeros, so x = 3 is a vertical asymptote.",
        "The denominator x² + 9 has no real zeros, so there is no hole.",
        "The numerator is 6 at x = 3, so x = 3 is a vertical asymptote."
      ],
      "nearMissIndex": 3,
      "distinguisher": "A hole needs the numerator to be 0 where the denominator is 0."
    },
    {
      "id": "precalculus-1-10-q03",
      "topicId": "precalculus-1-10",
      "concept": "hole-location",
      "difficulty": "Quick check",
      "skill": "solve",
      "prompt": "The rational function r is given by r(x) = (x² − 4)/(x − 2). What are the coordinates of the hole in the graph of r?",
      "choices": [
        "(−2, 0)",
        "(2, 0)",
        "(2, 4)",
        "(4, 2)"
      ],
      "correctAnswer": 2,
      "explanation": "r(x) = x + 2 for x ≠ 2, so lim x→2 r(x) = 4. The hole is at (2, 4).",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "(−2, 0) is the x-intercept of the graph.",
        "The y-coordinate comes from the limit, which is 4, not 0.",
        "The hole is at x = 2, and lim x→2 r(x) = 2 + 2 = 4.",
        "The coordinates are reversed."
      ],
      "nearMissIndex": 1,
      "distinguisher": "Find c first, then L = lim x→c r(x)."
    },
    {
      "id": "precalculus-1-10-q04",
      "topicId": "precalculus-1-10",
      "concept": "hole-or-asymptote",
      "difficulty": "Quick check",
      "skill": "describe",
      "prompt": "The rational function r is given by r(x) = (x − 2)/(x − 2)². Which of the following is true about the graph of r at x = 2?",
      "choices": [
        "It has a hole at x = 2 and no vertical asymptote.",
        "It has a hole and a vertical asymptote at x = 2.",
        "It has neither a hole nor a vertical asymptote at x = 2.",
        "It has a vertical asymptote at x = 2 and no hole."
      ],
      "correctAnswer": 3,
      "explanation": "2 has multiplicity 1 in the numerator and 2 in the denominator. The denominator's multiplicity is greater, so the graph has a vertical asymptote at x = 2.",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "A hole needs the numerator's multiplicity to be at least the denominator's, but 1 < 2.",
        "At a single input value the graph has a hole or a vertical asymptote, not both.",
        "r is undefined at x = 2, and the output values grow without bound there.",
        "Multiplicity 2 in the denominator is greater than 1 in the numerator."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Compare the multiplicities of 2 in the numerator and denominator."
    },
    {
      "id": "precalculus-1-10-q05",
      "topicId": "precalculus-1-10",
      "concept": "hole-location",
      "difficulty": "Core",
      "skill": "identify-information",
      "prompt": "The table gives values of the function r for selected values of x. Which of the following statements is best supported by the table?",
      "stimulusBlocks": [
        {
          "type": "table",
          "caption": "Values of r near x = 1",
          "columns": [
            "x",
            "r(x)"
          ],
          "rows": [
            [
              "0.9",
              "2.710"
            ],
            [
              "0.99",
              "2.970"
            ],
            [
              "0.999",
              "2.997"
            ],
            [
              "1",
              "undefined"
            ],
            [
              "1.001",
              "3.003"
            ],
            [
              "1.01",
              "3.030"
            ],
            [
              "1.1",
              "3.310"
            ]
          ]
        }
      ],
      "choices": [
        "lim x→1 r(x) = 3, so the graph of r could have a hole at (1, 3).",
        "lim x→1⁺ r(x) = ∞, so the graph of r has a vertical asymptote at x = 1.",
        "r(1) = 0, so x = 1 is a real zero of r.",
        "lim x→1 r(x) = 2.710, because r(0.9) = 2.710."
      ],
      "correctAnswer": 0,
      "explanation": "From both sides the output values get arbitrarily close to 3, and r(1) is undefined. This supports lim x→1 r(x) = 3 and a hole at (1, 3).",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "Both one-sided limits appear to be 3, and r is undefined at x = 1.",
        "The output values approach 3. They do not increase without bound.",
        "r(1) is undefined, so 1 is not a zero.",
        "One output value does not give the limit. The trend from both sides is toward 3."
      ],
      "nearMissIndex": 1,
      "distinguisher": "Undefined does not mean asymptote. Look at where the nearby output values head."
    },
    {
      "id": "precalculus-1-10-q06",
      "topicId": "precalculus-1-10",
      "concept": "hole-or-asymptote",
      "difficulty": "Core",
      "skill": "describe",
      "prompt": "The rational function r is given by r(x) = (x − 1)(x + 3)/((x − 1)(x − 2)). Which of the following statements is true?",
      "choices": [
        "The graph of r has a hole at (2, 4) and a vertical asymptote at x = 1.",
        "The graph of r has a hole at (1, 0) and a vertical asymptote at x = 2.",
        "The graph of r has vertical asymptotes at x = 1 and x = 2 and no hole.",
        "The graph of r has a hole at (1, −4) and a vertical asymptote at x = 2."
      ],
      "correctAnswer": 3,
      "explanation": "At x = 1 the multiplicities are equal, so there is a hole, and lim x→1 r(x) = (1 + 3)/(1 − 2) = −4. At x = 2 the numerator is not 0, so there is a vertical asymptote.",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "This swaps the roles of 1 and 2.",
        "The hole is at x = 1, but its y-coordinate is lim x→1 r(x) = −4, not 0.",
        "The factor x − 1 has equal multiplicity in the numerator and denominator, so x = 1 is a hole.",
        "The hole is at (1, −4) and the vertical asymptote is x = 2."
      ],
      "nearMissIndex": 1,
      "distinguisher": "The y-coordinate of a hole is a limit, not a value of the numerator."
    },
    {
      "id": "precalculus-1-10-q07",
      "topicId": "precalculus-1-10",
      "concept": "hole-or-asymptote",
      "difficulty": "Core",
      "skill": "construct-functions",
      "prompt": "Which of the following functions has a zero at x = −2 and has a graph in the xy-plane with a vertical asymptote at x = 3 and a hole at x = −1?",
      "choices": [
        "r(x) = (x + 2)/(x² − 2x − 3)",
        "r(x) = (x² + 3x + 2)/(x² − 2x − 3)",
        "r(x) = (x² + x − 2)/(x² − 2x − 3)",
        "r(x) = (x² + 3x + 2)/(x² + 2x − 3)"
      ],
      "correctAnswer": 1,
      "explanation": "(x² + 3x + 2)/(x² − 2x − 3) = (x + 1)(x + 2)/((x + 1)(x − 3)). The common factor x + 1 gives a hole at x = −1, the factor x − 3 gives a vertical asymptote at x = 3, and x + 2 gives a zero at x = −2.",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "The denominator is (x + 1)(x − 3), but the numerator is not 0 at x = −1, so x = −1 is a vertical asymptote, not a hole.",
        "Factoring gives (x + 1)(x + 2)/((x + 1)(x − 3)).",
        "The numerator is (x + 2)(x − 1), which is not 0 at x = −1, so x = −1 is a vertical asymptote.",
        "The denominator is (x + 3)(x − 1), so the asymptote and hole are at the wrong values."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Factor both polynomials and look for the common factor (x + 1)."
    },
    {
      "id": "precalculus-1-10-q08",
      "topicId": "precalculus-1-10",
      "concept": "hole-condition",
      "difficulty": "Core",
      "skill": "support-conclusions",
      "prompt": "The rational function r is given by r(x) = (x² − 5x + 6)/(x − 2). A student claims that the graph of r has a vertical asymptote at x = 2 because the denominator is 0 there. Which of the following is the best response?",
      "choices": [
        "The asymptote is at x = 3 instead, because 3 is a real zero of the numerator.",
        "The student is correct, because a real zero of the denominator always gives a vertical asymptote.",
        "x² − 5x + 6 = (x − 2)(x − 3), so the multiplicities of 2 are equal and the graph has a hole at (2, −1).",
        "The asymptote is at x = −2, because the factor is (x − 2)."
      ],
      "correctAnswer": 2,
      "explanation": "The numerator factors as (x − 2)(x − 3). The value 2 has multiplicity 1 in both, so there is a hole. lim x→2 r(x) = 2 − 3 = −1, so the hole is at (2, −1).",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "x = 3 is a real zero of r, not an asymptote.",
        "A real zero of the denominator gives a vertical asymptote only when its multiplicity in the denominator is greater.",
        "The common factor x − 2 gives a hole, and lim x→2 r(x) = −1.",
        "(x − 2) is 0 at x = 2, not −2."
      ],
      "nearMissIndex": 1,
      "distinguisher": "Factor the numerator before deciding what a real zero of the denominator does."
    },
    {
      "id": "precalculus-1-10-q09",
      "topicId": "precalculus-1-10",
      "concept": "hole-location",
      "difficulty": "Apply",
      "skill": "apply-results",
      "prompt": "The rate at which water enters a pool, in liters per minute, is modeled by R(t) = (t² − 25)/(t − 5), where t is the time in minutes. The model is undefined at t = 5. Which of the following is the best interpretation of lim t→5 R(t)?",
      "choices": [
        "As t approaches 5 minutes, the rate increases without bound.",
        "At t = 5 minutes, the rate is 0 liters per minute, because the numerator is 0.",
        "For times near t = 5 minutes, the rate is close to 5 liters per minute.",
        "For times near t = 5 minutes, the rate is close to 10 liters per minute."
      ],
      "correctAnswer": 3,
      "explanation": "R(t) = t + 5 for t ≠ 5, so lim t→5 R(t) = 10. For times near 5 minutes the rate is close to 10 liters per minute, even though the model gives no value at exactly t = 5.",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "The output values approach 10, so the graph has a hole at t = 5, not an asymptote.",
        "R(5) is undefined, and the output values near 5 are close to 10.",
        "5 is the input value. The limit comes from t + 5 at t = 5.",
        "lim t→5 R(t) = 5 + 5 = 10 liters per minute."
      ],
      "nearMissIndex": 0,
      "distinguisher": "A limit describes output values near the input value, not the value at it."
    },
    {
      "id": "precalculus-1-10-q10",
      "topicId": "precalculus-1-10",
      "concept": "hole-location",
      "difficulty": "Core",
      "skill": "describe",
      "prompt": "The rational function r is given by r(x) = (x + 1)(x − 4)/((x − 4)(x + 3)). What is lim x→4 r(x)?",
      "choices": [
        "5/7",
        "The limit does not exist.",
        "∞",
        "0"
      ],
      "correctAnswer": 0,
      "explanation": "r(x) = (x + 1)/(x + 3) for x ≠ 4, so lim x→4 r(x) = 5/7. The limit exists even though r(4) is undefined.",
      "sourceIds": [
        "ced",
        "ced-topic-1-10"
      ],
      "choiceExplanations": [
        "(4 + 1)/(4 + 3) = 5/7.",
        "A limit can exist where the function is undefined. Both one-sided limits are 5/7.",
        "The output values stay near 5/7, so they do not increase without bound.",
        "The numerator of the simplified form is 5 at x = 4, not 0."
      ],
      "nearMissIndex": 1,
      "distinguisher": "Whether r is defined at x = 4 does not decide whether the limit exists."
    }
  ],
  "quizzes": [
    {
      "id": "precalculus-1-10-quick",
      "courseId": "precalculus",
      "unitId": "precalculus-1",
      "topicId": "precalculus-1-10",
      "title": "Quick check",
      "quizType": "quick",
      "questionIds": [
        "precalculus-1-10-q01",
        "precalculus-1-10-q02",
        "precalculus-1-10-q03",
        "precalculus-1-10-q04"
      ]
    },
    {
      "id": "precalculus-1-10-quiz",
      "courseId": "precalculus",
      "unitId": "precalculus-1",
      "topicId": "precalculus-1-10",
      "title": "Rational Functions and Holes topic practice",
      "quizType": "topic",
      "customPractice": true,
      "questionIds": [
        "precalculus-1-10-q05",
        "precalculus-1-10-q06",
        "precalculus-1-10-q07",
        "precalculus-1-10-q08",
        "precalculus-1-10-q09",
        "precalculus-1-10-q10"
      ]
    }
  ]
};

// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  "questions": [
    {
      "id": "precalculus-1-6-q01",
      "topicId": "precalculus-1-6",
      "concept": "four-cases",
      "difficulty": "Quick check",
      "skill": "describe",
      "prompt": "The polynomial function p is given by p(x) = −3x⁵ + 2x² + 4. Which of the following statements about the end behavior of p is true?",
      "choices": [
        "The sign of the leading term of p is negative, and the degree of the leading term is odd; therefore, lim x→−∞ p(x) = −∞ and lim x→∞ p(x) = ∞.",
        "The sign of the leading term of p is negative, and the degree of the leading term is odd; therefore, lim x→−∞ p(x) = ∞ and lim x→∞ p(x) = −∞.",
        "The sign of the leading term of p is positive, and the degree of the leading term is even; therefore, lim x→−∞ p(x) = ∞ and lim x→∞ p(x) = ∞.",
        "The sign of the leading term of p is negative, and the degree of the leading term is even; therefore, lim x→−∞ p(x) = −∞ and lim x→∞ p(x) = −∞."
      ],
      "correctAnswer": 1,
      "explanation": "The leading term is −3x⁵: negative sign, odd degree. For large positive x, −3x⁵ is very negative, and for large negative x it is very positive. So lim x→−∞ p(x) = ∞ and lim x→∞ p(x) = −∞.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "The description of the leading term is right, but the limits are reversed. A negative leading coefficient makes p(x) decrease without bound as x → ∞.",
        "Negative sign and odd degree give lim x→−∞ p(x) = ∞ and lim x→∞ p(x) = −∞.",
        "The leading term is −3x⁵, not 2x² or 4. Its sign is negative and its degree is 5.",
        "The degree of the leading term, 5, is odd, so the two ends point in opposite directions."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Find the leading term first, then decide each end from its sign and degree."
    },
    {
      "id": "precalculus-1-6-q02",
      "topicId": "precalculus-1-6",
      "concept": "four-cases",
      "difficulty": "Quick check",
      "skill": "describe",
      "prompt": "The polynomial function f is given by f(x) = 2x⁴ − x³ + 7. Which of the following describes the end behavior of f?",
      "choices": [
        "lim x→−∞ f(x) = ∞ and lim x→∞ f(x) = ∞",
        "lim x→−∞ f(x) = −∞ and lim x→∞ f(x) = ∞",
        "lim x→−∞ f(x) = −∞ and lim x→∞ f(x) = −∞",
        "lim x→−∞ f(x) = ∞ and lim x→∞ f(x) = −∞"
      ],
      "correctAnswer": 0,
      "explanation": "The leading term 2x⁴ has an even degree and a positive coefficient, so the output values increase without bound at both ends.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "Even degree and a positive leading coefficient give ∞ at both ends.",
        "This is the end behavior of an odd-degree polynomial with a positive leading coefficient.",
        "Both ends decrease without bound only when the leading coefficient is negative.",
        "This is the end behavior of an odd-degree polynomial with a negative leading coefficient."
      ],
      "nearMissIndex": 1,
      "distinguisher": "Even degree means both ends match. The sign of the leading coefficient picks ∞ or −∞."
    },
    {
      "id": "precalculus-1-6-q03",
      "topicId": "precalculus-1-6",
      "concept": "four-cases",
      "difficulty": "Quick check",
      "skill": "identify-information",
      "prompt": "Which of the following polynomial functions p satisfies lim x→−∞ p(x) = −∞ and lim x→∞ p(x) = ∞?",
      "choices": [
        "p(x) = −x³ + 2",
        "p(x) = x⁴ − 4",
        "p(x) = −x⁴ + 3x",
        "p(x) = x³ − 4x"
      ],
      "correctAnswer": 3,
      "explanation": "Output values that decrease without bound on the left and increase without bound on the right require an odd degree and a positive leading coefficient. Only x³ − 4x fits.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "The degree is odd, but the negative leading coefficient reverses both limits.",
        "Even degree gives the same limit at both ends.",
        "Even degree gives the same limit at both ends, and here both are −∞.",
        "Odd degree with a positive leading coefficient gives −∞ on the left and ∞ on the right."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Only odd degree with a positive leading coefficient matches this pair of limits."
    },
    {
      "id": "precalculus-1-6-q04",
      "topicId": "precalculus-1-6",
      "concept": "leading-term",
      "difficulty": "Quick check",
      "skill": "describe",
      "prompt": "Which of the following determines the end behavior of a polynomial function?",
      "choices": [
        "The constant term, because it is the y-coordinate of the y-intercept",
        "The degree alone, without regard to the sign of any coefficient",
        "The degree and sign of the leading term, because it dominates for input values of large magnitude",
        "The real zero closest to the origin, because the graph crosses the x-axis there"
      ],
      "correctAnswer": 2,
      "explanation": "As the input values increase or decrease without bound, the leading term dominates all lower-degree terms, so its degree and sign determine the end behavior.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "The constant term shifts the graph vertically but does not affect the end behavior.",
        "The degree decides whether the ends match, but the sign of the leading coefficient is needed to decide the direction.",
        "The leading term dominates all lower-degree terms for input values of large magnitude.",
        "Zeros describe the middle of the graph, not its end behavior."
      ],
      "nearMissIndex": 1,
      "distinguisher": "The degree is half of the answer. The sign of the leading coefficient is the other half."
    },
    {
      "id": "precalculus-1-6-q05",
      "topicId": "precalculus-1-6",
      "concept": "leading-term",
      "difficulty": "Core",
      "skill": "support-conclusions",
      "prompt": "The table gives values of the terms of p(x) = x³ − 100x² for selected values of x. Which of the following conclusions is best supported by the table?",
      "stimulusBlocks": [
        {
          "type": "table",
          "caption": "Terms of p(x) = x³ − 100x²",
          "columns": [
            "x",
            "x³",
            "−100x²",
            "p(x)"
          ],
          "rows": [
            [
              "10",
              "1,000",
              "−10,000",
              "−9,000"
            ],
            [
              "100",
              "1,000,000",
              "−1,000,000",
              "0"
            ],
            [
              "1,000",
              "1,000,000,000",
              "−100,000,000",
              "900,000,000"
            ],
            [
              "10,000",
              "1,000,000,000,000",
              "−10,000,000,000",
              "990,000,000,000"
            ]
          ]
        }
      ],
      "choices": [
        "p(x) < 0 for all x > 0, because of the term −100x².",
        "lim x→∞ p(x) = ∞, because x³ dominates −100x² as x increases without bound.",
        "lim x→∞ p(x) = −∞, because the coefficient −100 has the greater magnitude.",
        "lim x→∞ p(x) = 0, because the terms cancel when x = 100."
      ],
      "correctAnswer": 1,
      "explanation": "p(10) is negative, but p(10,000) is 99% of x³. The leading term x³ dominates as x increases, so lim x→∞ p(x) = ∞.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "p(1,000) and p(10,000) are positive, so p(x) is not negative for all x > 0.",
        "x³ grows faster than 100x², so the output values increase without bound.",
        "A larger coefficient on a lower power is eventually dominated by a higher power.",
        "The terms cancel only at x = 100. After that p(x) increases."
      ],
      "nearMissIndex": 0,
      "distinguisher": "A higher power eventually dominates a larger coefficient on a lower power."
    },
    {
      "id": "precalculus-1-6-q06",
      "topicId": "precalculus-1-6",
      "concept": "unbounded-notation",
      "difficulty": "Core",
      "skill": "describe",
      "prompt": "Which of the following is equivalent to the statement lim x→−∞ f(x) = −∞?",
      "choices": [
        "As x increases without bound, f(x) decreases without bound.",
        "f(0) = −∞",
        "The graph of f is decreasing for all x < 0.",
        "As x decreases without bound, f(x) decreases without bound."
      ],
      "correctAnswer": 3,
      "explanation": "x → −∞ means the input values decrease without bound, and f(x) = −∞ in a limit means the output values decrease without bound.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "This describes lim x→∞ f(x) = −∞, the behavior as x increases.",
        "−∞ is not an output value, and the limit is not about x = 0.",
        "The limit describes only the end behavior. f could increase on parts of x < 0.",
        "The input values decrease without bound, and so do the output values."
      ],
      "nearMissIndex": 0,
      "distinguisher": "The direction under lim is the input. The value after the equals sign is the output behavior."
    },
    {
      "id": "precalculus-1-6-q07",
      "topicId": "precalculus-1-6",
      "concept": "four-cases",
      "difficulty": "Core",
      "skill": "describe",
      "prompt": "The polynomial function p has odd degree and a negative leading coefficient. Which of the following describes the end behavior of p?",
      "choices": [
        "lim x→−∞ p(x) = −∞ and lim x→∞ p(x) = ∞",
        "lim x→−∞ p(x) = −∞ and lim x→∞ p(x) = −∞",
        "lim x→−∞ p(x) = ∞ and lim x→∞ p(x) = −∞",
        "lim x→−∞ p(x) = ∞ and lim x→∞ p(x) = ∞"
      ],
      "correctAnswer": 2,
      "explanation": "Odd degree sends the ends in opposite directions. A negative leading coefficient gives lim x→∞ p(x) = −∞, so lim x→−∞ p(x) = ∞.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "These limits fit a positive leading coefficient.",
        "Both ends at −∞ requires even degree.",
        "Odd degree and a negative leading coefficient give ∞ on the left and −∞ on the right.",
        "Both ends at ∞ requires even degree and a positive leading coefficient."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Decide the right end from the sign, then make the left end opposite for odd degree."
    },
    {
      "id": "precalculus-1-6-q08",
      "topicId": "precalculus-1-6",
      "concept": "four-cases",
      "difficulty": "Core",
      "skill": "identify-information",
      "prompt": "Which of the following polynomial functions p satisfies lim x→−∞ p(x) = ∞ and lim x→∞ p(x) = ∞?",
      "choices": [
        "p(x) = 3x⁴ − 5x² + 1",
        "p(x) = x³ − x",
        "p(x) = −2x⁴ + x",
        "p(x) = −x⁵ + 2x"
      ],
      "correctAnswer": 0,
      "explanation": "Both limits are ∞, so the degree is even and the leading coefficient is positive. Only 3x⁴ − 5x² + 1 fits.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "Even degree and a positive leading coefficient give ∞ at both ends.",
        "The leading coefficient is positive, but odd degree gives lim x→−∞ p(x) = −∞.",
        "Even degree with a negative leading coefficient gives −∞ at both ends.",
        "Odd degree with a negative leading coefficient gives lim x→∞ p(x) = −∞."
      ],
      "nearMissIndex": 1,
      "distinguisher": "A positive leading coefficient is not enough. The degree must also be even."
    },
    {
      "id": "precalculus-1-6-q09",
      "topicId": "precalculus-1-6",
      "concept": "leading-term",
      "difficulty": "Core",
      "skill": "support-conclusions",
      "prompt": "The functions f and g are given by f(x) = x⁴ and g(x) = 1000x³. Which of the following statements is true?",
      "choices": [
        "g(x) > f(x) for all x > 0, because 1000 is greater than 1.",
        "f(x) = g(x) for all x > 1000, because both are polynomials.",
        "f(x) > g(x) for all x > 1000, because x⁴ = x · x³ and x > 1000.",
        "g(x) > f(x) for all x > 1000, because the graph of g is steeper near x = 1."
      ],
      "correctAnswer": 2,
      "explanation": "f(x) − g(x) = x³(x − 1000), which is positive for x > 1000. A higher power eventually dominates a larger coefficient.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "For x > 1000, x⁴ = x · x³ is greater than 1000x³.",
        "The functions are equal only at x = 0 and x = 1000.",
        "x⁴ − 1000x³ = x³(x − 1000) > 0 when x > 1000.",
        "Steepness near x = 1 says nothing about large input values."
      ],
      "nearMissIndex": 0,
      "distinguisher": "Compare degrees first. Coefficients decide only between terms of the same degree."
    },
    {
      "id": "precalculus-1-6-q10",
      "topicId": "precalculus-1-6",
      "concept": "four-cases",
      "difficulty": "Core",
      "skill": "support-conclusions",
      "prompt": "The polynomial function p satisfies lim x→−∞ p(x) = −∞ and lim x→∞ p(x) = −∞. Which of the following must be true about the leading term of p?",
      "choices": [
        "Its degree is odd, and its coefficient is negative.",
        "Its degree is even, and its coefficient is positive.",
        "Its degree is odd, and its coefficient is positive.",
        "Its degree is even, and its coefficient is negative."
      ],
      "correctAnswer": 3,
      "explanation": "Both ends have the same limit, so the degree is even. Both limits are −∞, so the leading coefficient is negative.",
      "sourceIds": [
        "ced",
        "ced-topic-1-6"
      ],
      "choiceExplanations": [
        "Odd degree gives opposite limits at the two ends.",
        "Even degree with a positive coefficient gives ∞ at both ends.",
        "Odd degree gives opposite limits at the two ends.",
        "Matching limits mean even degree, and −∞ means a negative leading coefficient."
      ],
      "nearMissIndex": 1,
      "distinguisher": "Matching ends decide the degree. Their direction decides the sign."
    }
  ],
  "quizzes": [
    {
      "id": "precalculus-1-6-quick",
      "courseId": "precalculus",
      "unitId": "precalculus-1",
      "topicId": "precalculus-1-6",
      "title": "Quick check",
      "quizType": "quick",
      "questionIds": [
        "precalculus-1-6-q01",
        "precalculus-1-6-q02",
        "precalculus-1-6-q03",
        "precalculus-1-6-q04"
      ]
    },
    {
      "id": "precalculus-1-6-quiz",
      "courseId": "precalculus",
      "unitId": "precalculus-1",
      "topicId": "precalculus-1-6",
      "title": "Polynomial Functions and End Behavior topic practice",
      "quizType": "topic",
      "customPractice": true,
      "questionIds": [
        "precalculus-1-6-q05",
        "precalculus-1-6-q06",
        "precalculus-1-6-q07",
        "precalculus-1-6-q08",
        "precalculus-1-6-q09",
        "precalculus-1-6-q10"
      ]
    }
  ]
};

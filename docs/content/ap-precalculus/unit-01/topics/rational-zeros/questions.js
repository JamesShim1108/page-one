// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-8-q01",
      topicId: "precalculus-1-8",
      concept: "numerator-zeros",
      difficulty: "Quick check",
      skill: "solve",
      prompt:
        "The rational function r is given by r(x) = (x − 3)(x + 5)/(x − 1). What are all real zeros of r?",
      choices: [
        "x = 3, x = −5, and x = 1",
        "x = 3 and x = −5",
        "x = −3 and x = 5",
        "x = 1 only",
      ],
      correctAnswer: 1,
      explanation:
        "The real zeros of r are the real zeros of the numerator in the domain of r: x = 3 and x = −5. Neither makes the denominator 0.",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "x = 1 makes the denominator 0, so it is not in the domain of r.",
        "Both 3 and −5 make the numerator 0 and are in the domain of r.",
        "The signs are reversed. (x − 3) is 0 at x = 3.",
        "x = 1 is not in the domain of r, so it cannot be a zero.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A zero must make r(x) = 0, but a zero of the denominator makes r undefined.",
    },
    {
      id: "precalculus-1-8-q02",
      topicId: "precalculus-1-8",
      concept: "numerator-zeros",
      difficulty: "Quick check",
      skill: "support-conclusions",
      prompt:
        "The rational function r is given by r(x) = (x² − 9)/(x + 3). Which of the following statements about the real zeros of r is true?",
      choices: [
        "x = 3 is the only real zero of r, because −3 is not in the domain of r.",
        "x = 3 and x = −3 are both real zeros of r, because both make the numerator 0.",
        "x = −3 is the only real zero of r, because it makes the denominator 0.",
        "r has no real zeros, because the numerator and denominator have a common factor.",
      ],
      correctAnswer: 0,
      explanation:
        "The numerator is 0 at x = 3 and x = −3, but r(−3) is undefined. The only real zero in the domain is x = 3.",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "r(−3) is undefined, so only x = 3 is a real zero.",
        "x = −3 also makes the denominator 0, so it is not in the domain of r.",
        "A real zero of the denominator is never a zero of the function.",
        "The common factor removes −3 from the domain, but r(3) = 0.",
      ],
      nearMissIndex: 1,
      distinguisher: "Check each real zero of the numerator against the domain.",
    },
    {
      id: "precalculus-1-8-q03",
      topicId: "precalculus-1-8",
      concept: "sign-analysis",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The rational function r is given by r(x) = (x + 2)(x − 1)/(x − 4). On which of the following intervals is r(x) > 0?",
      choices: [
        "x < −2 and 1 < x < 4",
        "−2 < x < 4, with x ≠ 1",
        "−2 < x < 1 and x > 4",
        "1 < x < 4 and x > 4",
      ],
      correctAnswer: 2,
      explanation:
        "Using test values, r(0) = 0.5 > 0 and r(5) = 28 > 0, while r(−3) ≈ −0.571 < 0 and r(2) = −2 < 0. So r(x) > 0 for −2 < x < 1 and for x > 4.",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "These are the intervals where r(x) < 0.",
        "r(2) = −2, so r is negative on 1 < x < 4.",
        "The test values 0 and 5 give positive output values.",
        "r(2) = −2, so r is negative on 1 < x < 4.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The sign changes at each real zero of odd multiplicity, so alternate from the right.",
    },
    {
      id: "precalculus-1-8-q04",
      topicId: "precalculus-1-8",
      concept: "sign-analysis",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The rational function r is given by r(x) = (x − 2)²(x + 1)/(x − 5). Which of the following describes the sign of r(x) for input values near x = 2?",
      choices: [
        "r(x) changes from positive to negative at x = 2.",
        "r(x) changes from negative to positive at x = 2.",
        "r(x) is undefined for input values on both sides of x = 2.",
        "r(x) has the same sign for input values on both sides of x = 2.",
      ],
      correctAnswer: 3,
      explanation:
        "x = 2 is a real zero of even multiplicity in the numerator, so the sign of r(x) is the same on both sides of x = 2.",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "A sign change requires odd multiplicity.",
        "A sign change requires odd multiplicity, and (x − 2) is squared.",
        "r is defined near x = 2. It is undefined only at x = 5.",
        "Even multiplicity means the output values have the same sign on both sides.",
      ],
      nearMissIndex: 1,
      distinguisher: "Count the multiplicity before deciding whether the sign changes.",
    },
    {
      id: "precalculus-1-8-q05",
      topicId: "precalculus-1-8",
      concept: "inequalities",
      difficulty: "Core",
      skill: "solve",
      prompt: "What are all values of x for which (x − 1)/(x + 2) ≥ 0?",
      choices: ["x < −2 or x ≥ 1", "x ≤ −2 or x ≥ 1", "x < −2 or x > 1", "−2 < x ≤ 1"],
      correctAnswer: 0,
      explanation:
        "The real zero of the numerator is 1 and the real zero of the denominator is −2. The quotient is positive for x < −2 and x > 1, and equals 0 at x = 1. Include 1 and exclude −2.",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "x = 1 gives 0, which satisfies ≥ 0, and x = −2 is not in the domain.",
        "x = −2 makes the denominator 0, so it is not included.",
        "x = 1 gives 0, which satisfies ≥ 0, so it must be included.",
        "On −2 < x < 1 the quotient is negative.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A real zero of the denominator is never included, whatever the inequality symbol.",
    },
    {
      id: "precalculus-1-8-q06",
      topicId: "precalculus-1-8",
      concept: "sign-analysis",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The rational function r has real zeros at x = −2 and x = 1 and is undefined only at x = 4. The table gives values of r for selected values of x. What are all values of x for which r(x) < 0?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of r",
          columns: ["x", "r(x)"],
          rows: [
            ["−3", "−0.571"],
            ["0", "0.5"],
            ["2", "−2"],
            ["5", "28"],
          ],
        },
      ],
      choices: [
        "−2 < x < 1 or x > 4",
        "x ≤ −2 or 1 ≤ x < 4",
        "−3 < x < 2",
        "x < −2 or 1 < x < 4",
      ],
      correctAnswer: 3,
      explanation:
        "The sign can change only at −2, 1, and 4. The values at −3 and 2 are negative, so r(x) < 0 for x < −2 and 1 < x < 4. The inequality is strict, so the zeros are excluded.",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "These are the intervals where r(x) > 0, as r(0) and r(5) show.",
        "The intervals are right, but r(−2) = r(1) = 0 does not satisfy r(x) < 0.",
        "Test values are not endpoints. The endpoints are the real zeros and the asymptote.",
        "r(−3) and r(2) are negative, and the endpoints −2, 1, and 4 are excluded.",
      ],
      nearMissIndex: 1,
      distinguisher: "A strict inequality excludes the real zeros of the numerator.",
    },
    {
      id: "precalculus-1-8-q07",
      topicId: "precalculus-1-8",
      concept: "numerator-zeros",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "Which of the following rational functions has real zeros at x = 2 and x = −4 and is undefined at x = 1?",
      choices: [
        "r(x) = (x + 2)(x − 4)/(x − 1)",
        "r(x) = (x − 2)(x + 4)/(x − 1)",
        "r(x) = (x − 2)(x + 4)/(x + 1)",
        "r(x) = (x − 1)/((x − 2)(x + 4))",
      ],
      correctAnswer: 1,
      explanation:
        "The numerator needs the linear factors (x − 2) and (x + 4), and the denominator needs the factor (x − 1).",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "The signs are reversed: this has zeros at −2 and 4.",
        "(x − 2)(x + 4) gives the zeros 2 and −4, and (x − 1) makes r undefined at 1.",
        "This is undefined at x = −1, not at x = 1.",
        "The numerator and denominator are swapped.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The factor (x − a) is 0 at x = a, so check the sign inside each factor.",
    },
    {
      id: "precalculus-1-8-q08",
      topicId: "precalculus-1-8",
      concept: "inequalities",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A student solves (x + 1)/(x − 3) ≤ 0 and gives the answer −1 ≤ x ≤ 3. Which of the following statements is true about the student's answer?",
      choices: [
        "It is incorrect, because x = −1 gives 0, which does not satisfy the inequality.",
        "It is incorrect, because the solution is x ≤ −1 or x > 3.",
        "It is incorrect, because x = 3 is not in the domain, so the solution is −1 ≤ x < 3.",
        "It is correct, because both −1 and 3 are endpoints of the interval.",
      ],
      correctAnswer: 2,
      explanation:
        "The quotient is negative for −1 < x < 3 and equals 0 at x = −1. The value x = 3 makes the denominator 0, so it must be excluded. The solution is −1 ≤ x < 3.",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "A value of 0 does satisfy ≤ 0, so −1 belongs in the solution.",
        "These are the intervals where the quotient is positive or zero at −1.",
        "x = 3 makes the denominator 0, so the correct solution is −1 ≤ x < 3.",
        "x = 3 is an endpoint, but it is not in the domain, so it cannot be included.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Check each endpoint: numerator zeros may be included, denominator zeros never are.",
    },
    {
      id: "precalculus-1-8-q09",
      topicId: "precalculus-1-8",
      concept: "numerator-zeros",
      difficulty: "Apply",
      skill: "apply-results",
      prompt:
        "A club's profit per member, in dollars, is modeled by P(n) = (n − 12)(n + 4)/(n + 1), where n is the number of members and n ≥ 0. Which of the following is the best interpretation of the real zero of P in the context of the problem?",
      choices: [
        "When the club has 12 members, the profit per member is 0 dollars.",
        "When the club has 12 or −4 members, the profit per member is 0 dollars.",
        "When the club has 4 members, the profit per member is 0 dollars, because n + 4 is a factor.",
        "When the club has 1 member, the profit per member is undefined, because n + 1 is the denominator.",
      ],
      correctAnswer: 0,
      explanation:
        "The real zeros of the numerator are 12 and −4, but only n = 12 is in the domain n ≥ 0. So the profit per member is 0 dollars when there are 12 members.",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "n = 12 is the only real zero with n ≥ 0.",
        "−4 is a zero of the formula, but it is not a possible number of members.",
        "(n + 4) is 0 at n = −4, not n = 4.",
        "The denominator n + 1 is 0 at n = −1, not n = 1, and that is not a zero.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A zero of the model must also be in the domain given by the context.",
    },
    {
      id: "precalculus-1-8-q10",
      topicId: "precalculus-1-8",
      concept: "inequalities",
      difficulty: "Core",
      skill: "solve",
      prompt: "What are all values of x for which (x − 2)²/(x + 1) ≥ 0?",
      choices: ["x ≥ −1", "x < −1", "x > −1 and x ≠ 2", "x > −1"],
      correctAnswer: 3,
      explanation:
        "(x − 2)² ≥ 0 for all x, so the sign is set by x + 1, which is positive for x > −1. At x = 2 the quotient is 0, which satisfies ≥ 0. At x = −1 it is undefined.",
      sourceIds: ["ced", "ced-topic-1-8"],
      choiceExplanations: [
        "x = −1 makes the denominator 0, so it is excluded.",
        "For x < −1 the quotient is negative.",
        "The value at x = 2 is 0, which satisfies ≥ 0, so x = 2 is included.",
        "The quotient is positive or 0 for every x > −1.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "A real zero of even multiplicity in the numerator still satisfies ≥ 0.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-8-mcq",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-8",
      title: "Rational Functions and Zeros multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-1-8-q01",
        "precalculus-1-8-q02",
        "precalculus-1-8-q03",
        "precalculus-1-8-q04",
        "precalculus-1-8-q05",
        "precalculus-1-8-q06",
        "precalculus-1-8-q07",
        "precalculus-1-8-q08",
        "precalculus-1-8-q09",
        "precalculus-1-8-q10",
      ],
    },
  ],
};

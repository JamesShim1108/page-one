// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-5-q01",
      topicId: "precalculus-1-5",
      concept: "multiplicity",
      difficulty: "Quick check",
      skill: "equivalent-forms",
      prompt:
        "Which pairing correctly lists the zeros and multiplicities of p(x) = (x + 3)(x − 2)²(x − 5)?",
      choices: [
        "−3 with multiplicity 1, 2 with multiplicity 1, 5 with multiplicity 2",
        "−3 with multiplicity 1, 2 with multiplicity 2, 5 with multiplicity 1",
        "3 with multiplicity 1, −2 with multiplicity 2, −5 with multiplicity 1",
        "−3 with multiplicity 2, 2 with multiplicity 1, 5 with multiplicity 1",
      ],
      correctAnswer: 1,
      explanation:
        "Each factor (x − a) gives a zero at a. The factor (x + 3) gives −3, the squared factor (x − 2)² gives 2 with multiplicity 2, and (x − 5) gives 5.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The exponent 2 belongs to the factor (x − 2), not to (x − 5).",
        "The zeros are −3, 2, and 5, and only the factor (x − 2) is squared, so only 2 has multiplicity 2.",
        "The signs are flipped. The zero of (x + 3) is −3, not 3.",
        "The exponent 2 belongs to the factor (x − 2), so 2 has multiplicity 2, not −3.",
      ],
      nearMissIndex: 0,
      distinguisher: "The exponent attaches to the zero of the factor it sits on.",
    },
    {
      id: "precalculus-1-5-q02",
      topicId: "precalculus-1-5",
      concept: "multiplicity",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "At which zero does the graph of p(x) = x(x − 3)²(x + 1) touch the x-axis without crossing it?",
      choices: ["x = 0", "x = −1", "x = 3", "None. Every zero is a crossing."],
      correctAnswer: 2,
      explanation:
        "The factor (x − 3) is squared, so 3 is a zero of even multiplicity. The output keeps the same sign on both sides of 3, so the graph touches the axis and turns around there.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The factor x appears once, so 0 has odd multiplicity and the graph crosses there.",
        "The factor (x + 1) appears once, so −1 has odd multiplicity and the graph crosses there.",
        "The squared factor (x − 3)² gives even multiplicity at 3, so the graph touches and turns.",
        "A squared factor does not change sign, so the zero at 3 is a touch, not a crossing.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Only a zero of even multiplicity keeps the same sign on both sides.",
    },
    {
      id: "precalculus-1-5-q03",
      topicId: "precalculus-1-5",
      concept: "conjugate-zeros",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "A polynomial with real coefficients has 3 − 2i as a zero. Which number must also be a zero?",
      choices: ["3 + 2i", "−3 + 2i", "−3 − 2i", "2 − 3i"],
      correctAnswer: 0,
      explanation:
        "Non-real zeros of a real-coefficient polynomial come in conjugate pairs. The conjugate of 3 − 2i changes only the sign of the imaginary part, giving 3 + 2i.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The conjugate keeps the real part 3 and flips the sign of the imaginary part.",
        "This flips the real part. A conjugate keeps the real part the same.",
        "This negates both parts. A conjugate changes only the imaginary part.",
        "This swaps the real and imaginary parts, which is not a conjugate.",
      ],
      nearMissIndex: 1,
      distinguisher: "A conjugate flips only the sign in front of the imaginary part.",
    },
    {
      id: "precalculus-1-5-q04",
      topicId: "precalculus-1-5",
      concept: "multiplicity",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "How many complex zeros does p(x) = 2x⁵ − x³ + 7 have, when each zero is counted as many times as its multiplicity?",
      choices: [
        "Three, one for each term of p",
        "Five, all of them real",
        "Four, one fewer than the degree",
        "Five, though some of them may not be real",
      ],
      correctAnswer: 3,
      explanation:
        "A polynomial of degree n has exactly n complex zeros counting multiplicity. This polynomial has degree 5, so it has five complex zeros, and some may be non-real.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The number of terms has nothing to do with the number of zeros. The degree does.",
        "The count of five is right, but real zeros are not guaranteed. Some of the five could be non-real.",
        "The number of complex zeros equals the degree, not one fewer.",
        "The degree is 5, so there are five complex zeros counting multiplicity, real or not.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Complex zeros always add up to the degree. Real zeros might be fewer.",
    },
    {
      id: "precalculus-1-5-q05",
      topicId: "precalculus-1-5",
      concept: "zeros-and-factors",
      difficulty: "Core",
      skill: "solve",
      prompt: "For which values of x is p(x) = (x − 1)(x + 2)(x − 3) positive?",
      choices: ["x < −2 or 1 < x < 3", "−2 < x < 3", "−2 < x < 1 or x > 3", "x > 3 only"],
      correctAnswer: 2,
      explanation:
        "Test a value in each interval. The output is negative below −2, positive between −2 and 1, negative between 1 and 3, and positive above 3.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "This is the opposite pattern. The output is negative on x < −2 and on 1 < x < 3.",
        "The output changes sign at 1, so it is not positive on the whole interval from −2 to 3.",
        "The signs are −, +, −, + from left to right, so p is positive on (−2, 1) and on (3, ∞).",
        "The output is also positive between −2 and 1, so x > 3 is not the only positive stretch.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Alternate the signs across the zeros, starting from the sign of the far left.",
    },
    {
      id: "precalculus-1-5-q06",
      topicId: "precalculus-1-5",
      concept: "degree-from-differences",
      difficulty: "Core",
      skill: "construct-representations",
      prompt:
        "A polynomial function has the outputs shown at equally spaced inputs. What is its degree?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Outputs at x = 0, 1, 2, 3, 4, 5",
          columns: ["x", "f(x)"],
          rows: [
            ["0", "1"],
            ["1", "2"],
            ["2", "15"],
            ["3", "52"],
            ["4", "125"],
            ["5", "246"],
          ],
        },
      ],
      choices: ["3", "2", "4", "12"],
      correctAnswer: 0,
      explanation:
        "The outputs are 1, 2, 15, 52, 125, 246. First differences: 1, 13, 37, 73, 121. Second differences: 12, 24, 36, 48. Third differences: 12, 12, 12, so the third differences are the first constant row and the degree is 3.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The third differences are the first constant row, so the degree is 3.",
        "The second differences are 12, 24, 36, 48, which are not constant, so the degree is not 2.",
        "The degree is already known at the third differences, since they are constant, so there is no need for a fourth.",
        "12 is the constant value of the third differences, but the degree is the number of times you take differences.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "The degree counts the rows of differences, not the constant value in the last row.",
    },
    {
      id: "precalculus-1-5-q07",
      topicId: "precalculus-1-5",
      concept: "even-and-odd",
      difficulty: "Core",
      skill: "identify-information",
      prompt: "Which of the following functions is odd?",
      choices: [
        "f(x) = x³ + x²",
        "f(x) = x⁴ − 3x² + 1",
        "f(x) = x³ − 5x",
        "f(x) = x² + 2x",
      ],
      correctAnswer: 2,
      explanation:
        "For f(x) = x³ − 5x, replacing x with −x gives −x³ + 5x, which equals −f(x). So the function is odd.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "This has an odd power but also an even one. Replacing x with −x gives −x³ + x², which is neither f(x) nor −f(x).",
        "Every power is even, so replacing x with −x returns the same function. It is even, not odd.",
        "Every term has an odd power, so f(−x) = −f(x) and the function is odd.",
        "The term x² is even and 2x is odd, so f(−x) is neither f(x) nor −f(x).",
      ],
      nearMissIndex: 0,
      distinguisher: "An odd function needs every power to be odd, not just one of them.",
    },
    {
      id: "precalculus-1-5-q08",
      topicId: "precalculus-1-5",
      concept: "multiplicity",
      difficulty: "Core",
      skill: "equivalent-forms",
      prompt:
        "Which polynomial of degree 3 has a zero at 2 and a zero of multiplicity 2 at −1?",
      choices: [
        "p(x) = (x + 2)(x − 1)²",
        "p(x) = (x − 2)²(x + 1)",
        "p(x) = (x − 2)(x + 1)",
        "p(x) = (x − 2)(x + 1)²",
      ],
      correctAnswer: 3,
      explanation:
        "A zero at 2 gives the factor (x − 2), and a zero of multiplicity 2 at −1 gives the factor (x + 1)². Together they have degree 3.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The signs are reversed, giving zeros at −2 and 1 instead of 2 and −1.",
        "The multiplicities are swapped. This gives multiplicity 2 at 2 and multiplicity 1 at −1.",
        "This has the right zeros but degree 2, so −1 has multiplicity 1.",
        "The factor (x − 2) gives the zero 2 once and (x + 1)² gives the zero −1 twice, for degree 3.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Check both the sign inside each factor and which factor carries the exponent.",
    },
    {
      id: "precalculus-1-5-q09",
      topicId: "precalculus-1-5",
      concept: "conjugate-zeros",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A polynomial with real coefficients has degree 5. Two of its zeros are 2 + i and 1 − 3i. What is the least number of non-real zeros it can have?",
      choices: ["2", "4", "3", "5"],
      correctAnswer: 1,
      explanation:
        "Each non-real zero brings its conjugate: 2 − i and 1 + 3i also are zeros. That makes 4 non-real zeros, leaving one zero for the fifth, which must be real.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The two given zeros each need a conjugate partner, so there are at least four non-real zeros.",
        "The conjugates 2 − i and 1 + 3i must also be zeros, giving four non-real zeros in all.",
        "Non-real zeros come in pairs, so an odd count such as 3 is impossible.",
        "The fifth zero must be real, since the other four are two conjugate pairs and non-real zeros come in pairs.",
      ],
      nearMissIndex: 0,
      distinguisher: "Count each given zero together with its conjugate partner.",
    },
    {
      id: "precalculus-1-5-q10",
      topicId: "precalculus-1-5",
      concept: "conjugate-zeros",
      difficulty: "Apply",
      skill: "describe",
      prompt:
        "The polynomial p(x) = (x² + 9)(x − 4) has degree 3. Which statement about its zeros and graph is correct?",
      choices: [
        "Its graph has one x-intercept, at x = 4, but it has three complex zeros counting multiplicity.",
        "Its graph has three x-intercepts, because the degree is 3.",
        "Its graph has no x-intercepts, because x² + 9 is never zero.",
        "Its graph has two x-intercepts, at x = 4 and x = 9.",
      ],
      correctAnswer: 0,
      explanation:
        "The factor x² + 9 gives the non-real zeros 3i and −3i, which are not x-intercepts. The factor x − 4 gives the only real zero, 4. All three zeros count toward the degree.",
      sourceIds: ["ced", "ced-topic-1-5"],
      choiceExplanations: [
        "The real zero 4 is the only x-intercept, and the zeros 3i and −3i complete the three complex zeros.",
        "The degree counts all complex zeros, but only real zeros are x-intercepts.",
        "The factor x − 4 still gives the real zero 4, so there is an x-intercept.",
        "Nothing in the factorization gives a zero at 9. The factor x² + 9 has no real zeros.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Only real zeros appear on the graph, but every zero counts toward the degree.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-5-quick",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-5",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-1-5-q01",
        "precalculus-1-5-q02",
        "precalculus-1-5-q03",
        "precalculus-1-5-q04",
      ],
    },
    {
      id: "precalculus-1-5-quiz",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-5",
      title: "Polynomial Functions and Complex Zeros topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-1-5-q05",
        "precalculus-1-5-q06",
        "precalculus-1-5-q07",
        "precalculus-1-5-q08",
        "precalculus-1-5-q09",
        "precalculus-1-5-q10",
      ],
    },
  ],
};

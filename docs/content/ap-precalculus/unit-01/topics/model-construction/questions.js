// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-14-q01",
      topicId: "precalculus-1-14",
      concept: "build-from-conditions",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt:
        "A cubic polynomial has zeros at x = −2, x = 1, and x = 3 and passes through (0, 12). Which rule is p(x)?",
      choices: [
        "p(x) = 2(x + 2)(x − 1)(x − 3)",
        "p(x) = (x + 2)(x − 1)(x − 3)",
        "p(x) = 2(x − 2)(x + 1)(x + 3)",
        "p(x) = 12(x + 2)(x − 1)(x − 3)",
      ],
      correctAnswer: 0,
      explanation:
        "The factors (x + 2), (x − 1), and (x − 3) give the zeros, and a scales the graph. At x = 0 the product is 6, so 6a = 12 and a = 2.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "At x = 0, 2·(2)(−1)(−3) = 12, and the zeros are correct.",
        "This has the right zeros, but p(0) = 6, not 12, because the constant multiple was left out.",
        "These factors give the zeros 2, −1, and −3, and p(0) = −12.",
        "The multiple should be found from p(0) = 12, not set to 12. This gives p(0) = 72.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "After setting the zeros with factors, use the extra point to find the constant multiple.",
    },
    {
      id: "precalculus-1-14-q02",
      topicId: "precalculus-1-14",
      concept: "build-from-conditions",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt:
        "The points (0, 5), (1, 9), and (2, 15) lie on the graph of a quadratic function. Which rule is it?",
      choices: ["y = x² + 4x + 5", "y = 2x² + 2x + 5", "y = x² + 3x + 5", "y = 4x² + 5"],
      correctAnswer: 2,
      explanation:
        "The point (0, 5) gives c = 5. The point (1, 9) gives a + b = 4, and (2, 15) gives 4a + 2b = 10. Then a = 1 and b = 3.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "This gives y = 10 at x = 1, not 9. The sum a + b must be 4.",
        "This gives y = 17 at x = 2, not 15.",
        "The rule gives 5, 9, and 15 at x = 0, 1, and 2.",
        "This gives y = 9 at x = 1, but y = 21 at x = 2, not 15.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Substitute the point with x = 0 first, because it gives the constant term.",
    },
    {
      id: "precalculus-1-14-q03",
      topicId: "precalculus-1-14",
      concept: "build-from-parent",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt: "A rational model g(x) = a/(x − 1) + 2 passes through (3, 3). What is a?",
      choices: ["1", "4", "3", "2"],
      correctAnswer: 3,
      explanation: "Substituting gives a/(3 − 1) + 2 = 3. Then a/2 = 1, so a = 2.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "With a = 1, g(3) = 1/2 + 2 = 2.5, not 3.",
        "With a = 4, g(3) = 2 + 2 = 4, not 3.",
        "With a = 3, g(3) = 1.5 + 2 = 3.5, not 3.",
        "With a = 2, g(3) = 2/2 + 2 = 3.",
      ],
      nearMissIndex: 0,
      distinguisher: "Substitute the point and solve for the one unknown constant.",
    },
    {
      id: "precalculus-1-14-q04",
      topicId: "precalculus-1-14",
      concept: "build-from-parent",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt:
        "Which rule is a parabola with parent function x² that opens downward and has vertex (3, −4)?",
      choices: [
        "g(x) = −(x − 3)² + 4",
        "g(x) = −(x − 3)² − 4",
        "g(x) = −(x + 3)² − 4",
        "g(x) = (x − 3)² − 4",
      ],
      correctAnswer: 1,
      explanation:
        "A negative leading factor opens the parabola downward. The vertex form a(x − h)² + k with h = 3 and k = −4 gives −(x − 3)² − 4.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "This has the vertex (3, 4), because the constant added is +4.",
        "The factor (x − 3) puts the vertex at x = 3, and − 4 puts it at y = −4, with a downward opening.",
        "(x + 3) puts the vertex at x = −3, not x = 3.",
        "This has the vertex (3, −4) but opens upward.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Read the vertex from the signs inside and outside, and the opening from the multiplier.",
    },
    {
      id: "precalculus-1-14-q05",
      topicId: "precalculus-1-14",
      concept: "regression-technology",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A student proposes y = x² + 3x + 5 for data at x = 0, 1, 2, 3, 4. Which conclusion is best supported by the table?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Data and model predictions",
          columns: ["x", "0", "1", "2", "3", "4"],
          rows: [
            ["Data y", "5", "9", "15", "23", "34"],
            ["Model y", "5", "9", "15", "23", "33"],
          ],
        },
      ],
      choices: [
        "The model is poor, because it does not match the data at x = 4",
        "The model is exact, because the data and the model agree at every point",
        "The model is poor, because quadratic models cannot fit five points",
        "The model is close, because it differs from the data only by 1 at x = 4",
      ],
      correctAnswer: 3,
      explanation:
        "The data and the model agree at x = 0 through 3, and differ by 1 at x = 4. That is a small difference, so the model describes the data closely, although not perfectly.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "A difference of 1 at one point is small compared with the size of the values, so it does not make the model poor.",
        "The data and the model differ at x = 4, where the data are 34 and the model gives 33.",
        "A quadratic model can fit any number of points closely. It need not pass through all of them.",
        "The only difference is 34 − 33 = 1, at the last point, so the fit is close.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Judge a fit by the size of the differences, not by whether every point matches exactly.",
    },
    {
      id: "precalculus-1-14-q06",
      topicId: "precalculus-1-14",
      concept: "regression-technology",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "After technology fits a model to a data set, why should you graph the data and the model together?",
      choices: [
        "To make sure the technology rounded the constants correctly before use",
        "To check that the model's shape matches the data, not only that the numbers are close",
        "To change the model to the type with the highest degree available",
        "To replace the original data with the values that the model predicts",
      ],
      correctAnswer: 1,
      explanation:
        "A model can be close at the data points and still have the wrong shape, for example by turning around where the data keep rising. A graph of both shows whether the model type makes sense.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "Rounding is rarely the concern. The graph tests whether the type of model is appropriate.",
        "Viewing both together shows whether the model has the right shape and behaves sensibly outside the data.",
        "A higher degree does not make a model better. It can fit noise and behave poorly between points.",
        "The data are the evidence. Predictions from a model do not replace them.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A fit that is close in numbers can still fail in shape or in context.",
    },
    {
      id: "precalculus-1-14-q07",
      topicId: "precalculus-1-14",
      concept: "rational-models",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "A print shop charges a $120 setup fee plus $3 per poster, so the cost per poster is A(n) = (120 + 3n)/n dollars. What does the horizontal asymptote y = 3 mean?",
      choices: [
        "The cost per poster is exactly $3 when 120 posters are printed",
        "The total cost of the order approaches $3 as the order grows",
        "As more posters are printed, the cost per poster gets close to $3",
        "The cost per poster is $3 for every order, whatever its size",
      ],
      correctAnswer: 2,
      explanation:
        "As n grows, the term 120/n becomes small and A(n) approaches 3. The setup fee is spread over so many posters that the cost per poster nears the $3 per-poster charge.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "A(120) = 4, not 3. The cost per poster reaches 3 only in the limit.",
        "The total cost grows with the order. The asymptote describes the cost per poster.",
        "A(240) = 3.5, A(1200) = 3.1, and so on. The values approach 3 as n grows.",
        "A(10) = 15, so the cost per poster depends strongly on the size of the order.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Read an asymptote as what happens to the output as the input grows large.",
    },
    {
      id: "precalculus-1-14-q08",
      topicId: "precalculus-1-14",
      concept: "rational-models",
      difficulty: "Core",
      skill: "solve",
      prompt:
        "For A(n) = (120 + 3n)/n, for what number of posters is the cost per poster exactly $5?",
      choices: ["60", "40", "24", "120"],
      correctAnswer: 0,
      explanation:
        "Setting (120 + 3n)/n = 5 gives 120 + 3n = 5n, so 120 = 2n and n = 60. Check: A(60) = 300/60 = 5.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "A(60) = (120 + 180)/60 = 5.",
        "A(40) = 240/40 = 6, not 5.",
        "24 comes from dividing 120 by 5 and ignoring the 3n term.",
        "A(120) = 480/120 = 4, which is below 5.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Multiply both sides by n before solving, and check the result in the original model.",
    },
    {
      id: "precalculus-1-14-q09",
      topicId: "precalculus-1-14",
      concept: "interpret-model",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "A store's revenue, in dollars, from selling an item at a price of p dollars is R(p) = p(80 − 4p). What does the zero at p = 20 mean?",
      choices: [
        "At a price of $20, no one buys the item, so the revenue is $0",
        "At a price of $20, the revenue is $20",
        "The revenue is greatest at a price of $20",
        "The price must be lowered by $20 for the revenue to be positive",
      ],
      correctAnswer: 0,
      explanation:
        "R(20) = 20·(80 − 80) = 0. At a price of $20, the factor 80 − 4p is 0, which means the number of items sold is 0, so the revenue is 0.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "The factor 80 − 4p is the number sold, and it is 0 at p = 20.",
        "R(20) = 0, not 20. The output is the revenue in dollars.",
        "The maximum is halfway between the zeros, at p = 10, where R = 400.",
        "Prices between 0 and 20 give positive revenue. The zero tells where the revenue stops, not an amount to subtract.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "A zero of a model is an input where the output is zero, so say what that means in context.",
    },
    {
      id: "precalculus-1-14-q10",
      topicId: "precalculus-1-14",
      concept: "interpret-model",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "For the revenue model R(p) = p(80 − 4p), which statement gives the maximum revenue and where it occurs?",
      choices: [
        "A maximum revenue of $10 when the price is $400",
        "A maximum revenue of $400 when the price is $20",
        "A maximum revenue of $800 when the price is $10",
        "A maximum revenue of $400 when the price is $10",
      ],
      correctAnswer: 3,
      explanation:
        "The maximum of a quadratic occurs halfway between its zeros, 0 and 20, at p = 10. R(10) = 10·40 = 400, so the maximum revenue is $400 at a price of $10.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "The price and the revenue are swapped. The input is the price and the output is the revenue.",
        "The price of $20 is a zero of the model, where the revenue is 0, not its maximum.",
        "R(10) = 10·40 = 400, not 800, since 80 − 4(10) = 40.",
        "The vertex is halfway between the zeros, at p = 10, with R(10) = 400.",
      ],
      nearMissIndex: 0,
      distinguisher: "Keep track of which quantity is the input and which is the output.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-14-quick",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-14",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-1-14-q01",
        "precalculus-1-14-q02",
        "precalculus-1-14-q03",
        "precalculus-1-14-q04",
      ],
    },
    {
      id: "precalculus-1-14-quiz",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-14",
      title: "Function Model Construction and Application topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-1-14-q05",
        "precalculus-1-14-q06",
        "precalculus-1-14-q07",
        "precalculus-1-14-q08",
        "precalculus-1-14-q09",
        "precalculus-1-14-q10",
      ],
    },
  ],
};

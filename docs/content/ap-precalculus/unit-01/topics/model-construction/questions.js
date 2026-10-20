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
        "A cubic polynomial function p has real zeros at x = −2, x = 1, and x = 3, and p(0) = 12. Which of the following is an expression for p(x)?",
      choices: [
        "2(x + 2)(x − 1)(x − 3)",
        "(x + 2)(x − 1)(x − 3)",
        "2(x − 2)(x + 1)(x + 3)",
        "12(x + 2)(x − 1)(x − 3)",
      ],
      correctAnswer: 0,
      explanation:
        "p(x) = a(x + 2)(x − 1)(x − 3), and p(0) = a(2)(−1)(−3) = 6a = 12, so a = 2.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "6a = 12 gives a = 2.",
        "The zeros are right, but this gives p(0) = 6.",
        "The signs are reversed, giving zeros at 2, −1, and −3.",
        "a is found from 6a = 12, not set equal to 12. This gives p(0) = 72.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "After writing the linear factors, use the extra condition to find the constant multiple.",
    },
    {
      id: "precalculus-1-14-q02",
      topicId: "precalculus-1-14",
      concept: "build-from-conditions",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt:
        "The points (0, 5), (1, 9), and (2, 15) are on the graph of the quadratic function y = ax² + bx + c. Which of the following gives the values of a, b, and c?",
      choices: [
        "a = 1, b = 4, c = 5",
        "a = 2, b = 2, c = 5",
        "a = 1, b = 3, c = 5",
        "a = 3, b = 1, c = 5",
      ],
      correctAnswer: 2,
      explanation:
        "c = 5, a + b + 5 = 9, and 4a + 2b + 5 = 15. So a + b = 4 and 2a + b = 5, which give a = 1 and b = 3.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "a + b = 5 ≠ 4, so this does not pass through (1, 9).",
        "4a + 2b + c = 17, so this does not pass through (2, 15).",
        "These values satisfy all three equations.",
        "4a + 2b + c = 19, so this does not pass through (2, 15).",
      ],
      nearMissIndex: 0,
      distinguisher: "Use the point with x = 0 first to find c, then solve for a and b.",
    },
    {
      id: "precalculus-1-14-q03",
      topicId: "precalculus-1-14",
      concept: "build-from-parent",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt:
        "The rational function g is given by g(x) = a/(x − 1) + 2, where a is a constant. The graph of g passes through (3, 3). What is the value of a?",
      choices: ["1", "4", "3", "2"],
      correctAnswer: 3,
      explanation: "a/(3 − 1) + 2 = 3, so a/2 = 1 and a = 2.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "g(3) would be 2.5, not 3.",
        "g(3) would be 4, not 3.",
        "g(3) would be 3.5, not 3.",
        "2/2 + 2 = 3.",
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
        "A model is constructed by transforming the parent function f(x) = x² so that its graph opens downward and has its vertex at (3, −4). Which of the following could be the model?",
      choices: ["−(x − 3)² + 4", "−(x − 3)² − 4", "−(x + 3)² − 4", "(x − 3)² − 4"],
      correctAnswer: 1,
      explanation:
        "A vertical dilation by a factor of 1 with a reflection over the x-axis opens the graph downward. A horizontal translation by 3 and a vertical translation by −4 place the vertex at (3, −4).",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "This has vertex (3, 4).",
        "−(x − 3)² − 4 opens downward with vertex (3, −4).",
        "(x + 3)² places the vertex at x = −3.",
        "This opens upward.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Read the vertex from the translations and the opening from the sign of the dilation.",
    },
    {
      id: "precalculus-1-14-q05",
      topicId: "precalculus-1-14",
      concept: "regression-technology",
      difficulty: "Apply",
      skill: "apply-results",
      prompt:
        "The table gives values of y for selected values of x. A quadratic regression is used to model these data. Using the regression model, what is the predicted value of y at x = 6?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Data",
          columns: ["x", "0", "1", "2", "3", "4", "5"],
          rows: [["y", "2.1", "3.9", "8.2", "14.1", "21.8", "32.2"]],
        },
      ],
      choices: ["44.160", "44.169", "34.727", "42.600"],
      correctAnswer: 0,
      explanation:
        "A quadratic regression gives y = 1.010714x² + 0.949286x + 2.078571 (stored at full precision). At x = 6 the model predicts 44.160.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "This uses the full-precision quadratic regression.",
        "This uses the constants rounded to three decimal places before computing. Avoid rounding intermediate values.",
        "This is the prediction of a linear regression, 34.727, not a quadratic regression.",
        "This repeats the last change in y, 10.4, instead of using a regression model.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Keep the regression constants at full precision until the final answer.",
    },
    {
      id: "precalculus-1-14-q06",
      topicId: "precalculus-1-14",
      concept: "rational-models",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "The intensity of light, in lux, is inversely proportional to the square of the distance d, in meters, from the source. The intensity is 50 lux at d = 2 meters. Which of the following models the intensity I(d)?",
      choices: ["I(d) = 100/d", "I(d) = 50/d²", "I(d) = 100/d²", "I(d) = 200/d²"],
      correctAnswer: 3,
      explanation: "I(d) = k/d² and I(2) = k/4 = 50, so k = 200.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "100/d gives I(2) = 50, but it is inversely proportional to d, not to d².",
        "50/d² gives I(2) = 12.5.",
        "100/d² gives I(2) = 25. The constant k must satisfy k/4 = 50.",
        "k/4 = 50 gives k = 200.",
      ],
      nearMissIndex: 0,
      distinguisher: "Inversely proportional to the square means k/d².",
    },
    {
      id: "precalculus-1-14-q07",
      topicId: "precalculus-1-14",
      concept: "rational-models",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "A print shop charges a $120 setup fee plus $3 per poster. The average cost per poster, in dollars, for an order of n posters is modeled by A(n) = (120 + 3n)/n. Which of the following is the best interpretation of lim n→∞ A(n) = 3?",
      choices: [
        "When exactly 120 posters are ordered, the average cost per poster is exactly $3.",
        "As the order grows, the total cost of the order gets close to $3.",
        "As n increases without bound, the average cost per poster gets arbitrarily close to $3.",
        "The average cost per poster is exactly $3 for every order, no matter how many posters are ordered.",
      ],
      correctAnswer: 2,
      explanation:
        "A(n) = 3 + 120/n, and 120/n approaches 0 as n increases without bound. So the average cost per poster gets arbitrarily close to $3.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "A(120) = 4, not 3. The value 3 is approached, not reached.",
        "The total cost grows. The limit describes the average cost per poster.",
        "A(n) = 3 + 120/n, and 120/n approaches 0.",
        "A(10) = 15, so the average cost depends on the size of the order.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A limit at infinity describes the long-run value, not a value at a particular input.",
    },
    {
      id: "precalculus-1-14-q08",
      topicId: "precalculus-1-14",
      concept: "interpret-model",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "The intensity of light, in lux, at a distance of d meters from a source is modeled by I(d) = 200/d². Which of the following gives the average rate of change of I from d = 2 to d = 5 meters, with a correct interpretation?",
      choices: [
        "−42; the intensity decreased by a total of 42 lux per meter from d = 2 to d = 5 meters.",
        "−14; from d = 2 to d = 5 meters, on average, the intensity decreased at a rate of 14 lux per meter.",
        "14; from d = 2 to d = 5 meters, on average, the intensity increased at a rate of 14 lux per meter.",
        "−14; at d = 5 meters, the intensity is decreasing at a rate of exactly 14 lux per meter.",
      ],
      correctAnswer: 1,
      explanation:
        "(I(5) − I(2))/(5 − 2) = (8 − 50)/3 = −14. From d = 2 to d = 5 meters, on average, the intensity decreased at a rate of 14 lux per meter.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "−42 is the change in intensity, not divided by the change in distance, 3.",
        "(8 − 50)/3 = −14 lux per meter, interpreted over the interval.",
        "The intensity decreases as d increases, so the average rate of change is negative.",
        "An average rate of change describes an interval, not the rate of change at one point.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "An average rate of change belongs to an interval and is stated as an average.",
    },
    {
      id: "precalculus-1-14-q09",
      topicId: "precalculus-1-14",
      concept: "interpret-model",
      difficulty: "Apply",
      skill: "apply-results",
      prompt:
        "A store's revenue, in dollars, from selling an item at a price of p dollars is modeled by R(p) = p(80 − 4p). Which of the following is the best interpretation of R(20) = 0?",
      choices: [
        "At a price of $20, the number of items sold is 0, so the revenue is $0.",
        "At a price of $20, the revenue is $20.",
        "The greatest revenue occurs at a price of $20.",
        "The price must be lowered by $20 for the revenue to be positive.",
      ],
      correctAnswer: 0,
      explanation:
        "R(20) = 20(80 − 80) = 0. The factor 80 − 4p, the number of items sold, is 0 at p = 20, so the revenue is $0.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "The factor 80 − 4p is 0 at p = 20, so no items are sold.",
        "R(20) = 0, not 20. The output value is revenue in dollars.",
        "The maximum is halfway between the zeros, at p = 10.",
        "Prices between 0 and 20 already give positive revenue.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "A zero of the model is an input value where the output value is 0. Say what that means in context.",
    },
    {
      id: "precalculus-1-14-q10",
      topicId: "precalculus-1-14",
      concept: "interpret-model",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "A store's revenue, in dollars, from selling an item at a price of p dollars is modeled by R(p) = p(80 − 4p). Which of the following gives the maximum revenue and the price at which it occurs?",
      choices: [
        "A maximum revenue of $10 at a price of $400",
        "A maximum revenue of $400 at a price of $20",
        "A maximum revenue of $800 at a price of $10",
        "A maximum revenue of $400 at a price of $10",
      ],
      correctAnswer: 3,
      explanation:
        "The vertex of a quadratic is halfway between its zeros, 0 and 20, so p = 10. R(10) = 10(40) = 400. The maximum revenue is $400 at a price of $10.",
      sourceIds: ["ced", "ced-topic-1-14"],
      choiceExplanations: [
        "The input (price) and output (revenue) are swapped.",
        "p = 20 is a zero, where the revenue is $0.",
        "R(10) = 10(80 − 40) = 400, not 800.",
        "The vertex is at p = 10, and R(10) = 400.",
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

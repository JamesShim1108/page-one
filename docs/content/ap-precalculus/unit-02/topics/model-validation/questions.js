// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-2-6-q01",
      topicId: "precalculus-2-6",
      concept: "residuals",
      difficulty: "Quick check",
      skill: "apply-results",
      prompt:
        "A regression model predicts y = 48.6 when x = 5. The actual value of y at x = 5 is 51.0. What is the residual at x = 5?",
      choices: ["−2.4", "2.4", "99.6", "1.049"],
      correctAnswer: 1,
      explanation: "Residual = actual − predicted = 51.0 − 48.6 = 2.4.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "−2.4 is predicted − actual, the reverse order.",
        "51.0 − 48.6 = 2.4.",
        "99.6 adds the two values.",
        "1.049 ≈ 51.0/48.6 divides instead of subtracting.",
      ],
      nearMissIndex: 0,
      distinguisher: "Residual is actual minus predicted.",
    },
    {
      id: "precalculus-2-6-q02",
      topicId: "precalculus-2-6",
      concept: "residuals",
      difficulty: "Quick check",
      skill: "support-conclusions",
      prompt:
        "Which residual plot would justify that a model is appropriate for its data set?",
      choices: [
        "A residual plot with all residuals positive",
        "A residual plot whose residuals form a U-shaped curve",
        "A residual plot whose residuals increase steadily from left to right",
        "A residual plot whose residuals are scattered with no pattern",
      ],
      correctAnswer: 3,
      explanation:
        "A model is justified as appropriate for a data set if the residual plot appears without pattern.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "All positive residuals mean the model underestimates everywhere.",
        "A curved pattern shows the model misses the shape of the data.",
        "A trend in the residuals is a pattern.",
        "No pattern in the residual plot justifies the model as appropriate.",
      ],
      nearMissIndex: 1,
      distinguisher: "Appropriate means no pattern, not small values alone.",
    },
    {
      id: "precalculus-2-6-q03",
      topicId: "precalculus-2-6",
      concept: "errors",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "On the interval 2 ≤ x ≤ 6, every residual of a model is negative. Which statement is true on that interval?",
      choices: [
        "The model overestimates the actual values.",
        "The model underestimates the actual values.",
        "The model is appropriate on that interval.",
        "The actual values are decreasing.",
      ],
      correctAnswer: 0,
      explanation:
        "A negative residual means actual − predicted < 0, so the predicted values are greater than the actual values: the model overestimates.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "Predicted values greater than actual values means the model overestimates.",
        "Underestimates go with positive residuals.",
        "Residuals that all share a sign form a pattern.",
        "The sign of the residuals says nothing about whether the data are decreasing.",
      ],
      nearMissIndex: 1,
      distinguisher: "Negative residual: predicted is too high.",
    },
    {
      id: "precalculus-2-6-q04",
      topicId: "precalculus-2-6",
      concept: "competing-models",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "Which of the following describes data that can be modeled by linear, quadratic, and exponential function models?",
      choices: [
        "Data with a rate of change that is exactly zero",
        "Data with periodic repeating output values",
        "Data with a slightly changing rate of change",
        "Data with no relationship between the two variables",
      ],
      correctAnswer: 2,
      explanation:
        "Two variables in a data set that demonstrate a slightly changing rate of change can be modeled by linear, quadratic, and exponential function models.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "A rate of change of exactly zero describes constant data.",
        "Repeating outputs call for a periodic model, studied in Unit 3.",
        "A slightly changing rate of change can be modeled by all three function types.",
        "Without a relationship, none of these models is meaningful.",
      ],
      nearMissIndex: 0,
      distinguisher: "Slightly changing rate: all three types are reasonable candidates.",
    },
    {
      id: "precalculus-2-6-q05",
      topicId: "precalculus-2-6",
      concept: "residuals",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "A data set has the point (3, 5.4). The linear model y = 1.205 + 1.691x is used for the data. What is the residual of the linear model at x = 3?",
      choices: ["−0.878", "0.878", "6.278", "−0.588"],
      correctAnswer: 0,
      explanation:
        "Predicted: 1.205 + 1.691(3) = 6.278. Residual = 5.4 − 6.278 = −0.878.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "5.4 − 6.278 = −0.878.",
        "0.878 is predicted − actual, the reverse order.",
        "6.278 is the predicted value, not the residual.",
        "−0.588 is the residual at x = 2, not x = 3.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Compute the prediction at the same input, then actual minus predicted.",
    },
    {
      id: "precalculus-2-6-q06",
      topicId: "precalculus-2-6",
      concept: "residuals",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A linear model and an exponential model are fit to the same data. The residuals of the linear model are positive, then negative, then positive as x increases. The residuals of the exponential model have no pattern. Which conclusion is best supported?",
      choices: [
        "The linear model is more appropriate, because some residuals are positive.",
        "Both models are equally appropriate, because both are regressions.",
        "The exponential model is more appropriate, because its residuals have no pattern.",
        "Neither model is appropriate, because both have nonzero residuals.",
      ],
      correctAnswer: 2,
      explanation:
        "A model is justified as appropriate if its residual plot appears without pattern. The linear model's residuals form a pattern; the exponential model's do not.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "Positive residuals are expected; the question is whether there is a pattern.",
        "Being a regression does not make a model appropriate.",
        "No pattern in the residuals justifies the exponential model.",
        "Nonzero residuals are normal; a pattern is what signals a problem.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Judge models by the pattern of residuals, not by whether residuals are zero.",
    },
    {
      id: "precalculus-2-6-q07",
      topicId: "precalculus-2-6",
      concept: "errors",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A model predicts how much fuel remains in an aircraft. Which kind of error would be preferred on the interval near the end of a flight?",
      choices: [
        "Overestimates, so the crew believes there is more fuel than there is",
        "Large errors of either sign, as long as they average to zero",
        "Errors do not matter in context once the model is appropriate",
        "Underestimates, so the crew never believes there is more fuel than there is",
      ],
      correctAnswer: 3,
      explanation:
        "The data set and context can provide clues as to whether underestimates or overestimates are preferred. Believing there is less fuel than there is keeps the flight safe.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "Overestimating fuel is the dangerous error here.",
        "Errors that are large are a problem even if they average to zero.",
        "Context decides which errors are acceptable.",
        "Underestimating remaining fuel is the safer error.",
      ],
      nearMissIndex: 0,
      distinguisher: "Context decides which direction of error is safer.",
    },
    {
      id: "precalculus-2-6-q08",
      topicId: "precalculus-2-6",
      concept: "errors",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "A model's residuals at x = 1, 2, 3, 4 are 0.3, −0.5, 0.2, −0.4. Using the unsigned absolute values of the residuals as the errors, what is the largest error?",
      choices: ["0.3", "0.5", "−0.5", "0.4"],
      correctAnswer: 1,
      explanation:
        "The absolute values are 0.3, 0.5, 0.2, 0.4, so the largest error is 0.5.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "0.3 is the largest positive residual, not the largest absolute value.",
        "|−0.5| = 0.5 is the largest absolute value.",
        "Unsigned errors are absolute values, so the error is 0.5, not −0.5.",
        "0.4 = |−0.4| is smaller than 0.5.",
      ],
      nearMissIndex: 2,
      distinguisher: "Unsigned error means absolute value.",
    },
    {
      id: "precalculus-2-6-q09",
      topicId: "precalculus-2-6",
      concept: "competing-models",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A biologist models the number of cells in a dish that can hold at most 10,000 cells. The data so far fit both a linear model and an exponential model well. Which statement is best supported by contextual clues?",
      choices: [
        "The exponential model is appropriate for all future times, because cells reproduce.",
        "The linear model is appropriate for all future times, because it grows more slowly.",
        "Neither model should be used far into the future, because both increase without bound past 10,000.",
        "Both models are appropriate for all future times, because both fit the data.",
      ],
      correctAnswer: 2,
      explanation:
        "Models can be compared based on contextual clues. Both models increase without bound, but the dish holds at most 10,000 cells, so neither applies far into the future.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "Reproduction suggests exponential growth for a while, but the limit of 10,000 cells is also a clue.",
        "A linear model also increases without bound.",
        "The contextual limit of 10,000 rules out unbounded models far from the data.",
        "Fitting the data does not make a model applicable outside it.",
      ],
      nearMissIndex: 0,
      distinguisher: "A limit in the context is a clue against unbounded models.",
    },
    {
      id: "precalculus-2-6-q10",
      topicId: "precalculus-2-6",
      concept: "residuals",
      difficulty: "Core",
      skill: "identify-information",
      prompt: "For a residual plot, which quantities are on each axis?",
      choices: [
        "The independent variable on the horizontal axis and the residuals on the vertical axis",
        "The residuals on the horizontal axis and the independent variable on the vertical axis",
        "The independent variable on the horizontal axis and the predicted values on the vertical axis",
        "The predicted values on the horizontal axis and the actual values on the vertical axis",
      ],
      correctAnswer: 0,
      explanation:
        "A residual plot shows the residuals on the vertical axis and the independent variable on the horizontal axis.",
      sourceIds: ["ced", "ced-topic-2-6"],
      choiceExplanations: [
        "This matches the CED description of a residual plot.",
        "The axes are switched.",
        "Plotting predicted values gives the graph of the model, not a residual plot.",
        "Actual versus predicted values is a different graph.",
      ],
      nearMissIndex: 1,
      distinguisher: "Residuals go up the vertical axis.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-2-6-mcq",
      courseId: "precalculus",
      unitId: "precalculus-2",
      topicId: "precalculus-2-6",
      title: "Competing Function Model Validation multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-2-6-q01",
        "precalculus-2-6-q02",
        "precalculus-2-6-q03",
        "precalculus-2-6-q04",
        "precalculus-2-6-q05",
        "precalculus-2-6-q06",
        "precalculus-2-6-q07",
        "precalculus-2-6-q08",
        "precalculus-2-6-q09",
        "precalculus-2-6-q10",
      ],
    },
  ],
};

// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-2-15-q01",
      topicId: "precalculus-2-15",
      concept: "semi-log",
      difficulty: "Quick check",
      skill: "support-conclusions",
      prompt:
        "A semi-log plot of a data set, with the y-axis logarithmically scaled, appears linear. Which conclusion is best supported?",
      choices: [
        "A linear model is appropriate for the original data.",
        "A logarithmic model is appropriate for the original data.",
        "An exponential model is appropriate for the original data.",
        "No model is appropriate, because the data were transformed.",
      ],
      correctAnswer: 2,
      explanation:
        "When the y-axis of a semi-log plot is logarithmically scaled, data that demonstrate exponential characteristics appear linear.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "The semi-log plot is linear, not the original data.",
        "A logarithmic model would appear linear if the x-axis were logarithmically scaled instead.",
        "Linear on a y-semi-log plot means exponential.",
        "Transforming data to test a model is exactly the purpose of a semi-log plot.",
      ],
      nearMissIndex: 1,
      distinguisher: "The log is on y, so the original data are exponential.",
    },
    {
      id: "precalculus-2-15-q02",
      topicId: "precalculus-2-15",
      concept: "linearization",
      difficulty: "Quick check",
      skill: "equivalent-forms",
      prompt:
        "For y = 4(5)ˣ, which is the corresponding linear model on a semi-log plot with base 10?",
      choices: [
        "log y = (log 5)x + log 4",
        "log y = (log 4)x + log 5",
        "log y = 5x + 4",
        "log y = (log 20)x",
      ],
      correctAnswer: 0,
      explanation:
        "For y = abˣ, the linear model is log_n y = (log_n b)x + log_n a. With a = 4 and b = 5: log y = (log 5)x + log 4.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "Slope log b = log 5, intercept log a = log 4.",
        "This switches the slope and the intercept.",
        "The slope and intercept are logarithms of b and a, not b and a themselves.",
        "a and b are not multiplied together before taking the logarithm.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The base b gives the slope; the initial value a gives the intercept.",
    },
    {
      id: "precalculus-2-15-q03",
      topicId: "precalculus-2-15",
      concept: "semi-log",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "What does it mean for the y-axis of a semi-log plot to be logarithmically scaled with base 10?",
      choices: [
        "Each unit on the y-axis represents adding 10 to the output.",
        "The y-axis shows the output values divided by 10.",
        "Both axes are scaled by powers of 10.",
        "Each unit up represents multiplying the output by 10.",
      ],
      correctAnswer: 3,
      explanation:
        "On a logarithmic scale, each unit represents a multiplicative change of the base of the logarithm.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "Adding 10 per unit is a standard scale.",
        "Dividing by 10 rescales the axis but keeps it linear.",
        "In a semi-log plot, only one axis is logarithmically scaled.",
        "One unit up means one more factor of 10.",
      ],
      nearMissIndex: 0,
      distinguisher: "Log scale: each unit is a factor, not an amount.",
    },
    {
      id: "precalculus-2-15-q04",
      topicId: "precalculus-2-15",
      concept: "linearization",
      difficulty: "Quick check",
      skill: "apply-results",
      prompt:
        "A semi-log plot of exponential data, using base 10 on the y-axis, has the linear model log y = 0.5x + 1. Which exponential model matches?",
      choices: ["y = 0.5(1)ˣ", "y = 10(3.162)ˣ", "y = 1(0.5)ˣ", "y = 3.162(10)ˣ"],
      correctAnswer: 1,
      explanation:
        "log a = 1 gives a = 10, and log b = 0.5 gives b = 10^0.5 ≈ 3.162. So y ≈ 10(3.162)ˣ.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "The slope and intercept are logarithms; undo them with powers of 10.",
        "a = 10¹ = 10 and b = 10^0.5 ≈ 3.162.",
        "The intercept 1 is log a, not a, and 0.5 is log b, not b.",
        "This switches a and b.",
      ],
      nearMissIndex: 3,
      distinguisher: "Intercept gives a = 10^(intercept); slope gives b = 10^(slope).",
    },
    {
      id: "precalculus-2-15-q05",
      topicId: "precalculus-2-15",
      concept: "linearization",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "For y = 6(1.5)ˣ, the semi-log plot uses the natural logarithm on the y-axis. What is the linear rate of change of the semi-log plot?",
      choices: ["1.5", "ln 6", "ln 1.5", "log 1.5"],
      correctAnswer: 2,
      explanation:
        "The linear rate of change is log_n b. With n = e and b = 1.5, it is ln 1.5 ≈ 0.405.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "1.5 is the base b, not its logarithm.",
        "ln 6 is the initial linear value, log_n a.",
        "Slope = ln b = ln 1.5.",
        "log 1.5 uses base 10, but this semi-log plot uses the natural logarithm.",
      ],
      nearMissIndex: 1,
      distinguisher: "The slope comes from the base, and it is a logarithm.",
    },
    {
      id: "precalculus-2-15-q06",
      topicId: "precalculus-2-15",
      concept: "semi-log",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "Data values 3, 5, 9, 17, 33 are recorded at x = 0, 1, 2, 3, 4. A semi-log plot of y is not linear for small x but becomes nearly linear for large x. Which statement is best supported?",
      choices: [
        "A transformation of an exponential function can model the data.",
        "The data cannot be modeled by any exponential function.",
        "A linear model is appropriate, because the plot becomes linear.",
        "The semi-log plot must be wrong, because exponential data are always linear on it.",
      ],
      correctAnswer: 0,
      explanation:
        "If for large input values the logarithms of the outputs trend linear, transformations of an exponential function can be used to model the data. Here y − 1 = 2, 4, 8, 16, 32, so y = 2^(x + 1) + 1.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "y = 2^(x + 1) + 1, a transformation of an exponential function, fits the data.",
        "A vertical translation of an exponential function still fits.",
        "The semi-log plot trending linear points to an exponential model, not a linear one.",
        "Only data of the form abˣ are exactly linear; translations trend linear for large inputs.",
      ],
      nearMissIndex: 1,
      distinguisher: "Trending linear for large x still signals an exponential model.",
    },
    {
      id: "precalculus-2-15-q07",
      topicId: "precalculus-2-15",
      concept: "linearization",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "Why does taking the logarithm of y = abˣ produce a linear relationship in x?",
      choices: [
        "Because logarithms are always linear functions",
        "Because the logarithm cancels the initial value a",
        "Because exponential functions are linear for large x",
        "Because log (abˣ) = log a + x log b",
      ],
      correctAnswer: 3,
      explanation:
        "The product property splits log (abˣ) into log a + log bˣ, and the power property turns log bˣ into x log b, a linear expression in x.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "Logarithmic functions are not linear.",
        "log a remains as the intercept; it is not canceled.",
        "Exponential functions are never linear.",
        "Product property, then power property, gives log a + x log b.",
      ],
      nearMissIndex: 1,
      distinguisher: "The power property brings x down as a coefficient.",
    },
    {
      id: "precalculus-2-15-q08",
      topicId: "precalculus-2-15",
      concept: "semi-log",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "On a semi-log plot with base 10 on the y-axis, a data point is plotted at (3, 2.5). What is the original output value at x = 3?",
      choices: ["2.5", "316.228", "12.182", "0.398"],
      correctAnswer: 1,
      explanation: "The vertical coordinate is log y = 2.5, so y = 10^2.5 ≈ 316.228.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "2.5 is log y, not y.",
        "y = 10^2.5 ≈ 316.228.",
        "12.182 ≈ e^2.5 uses base e instead of base 10.",
        "0.398 ≈ log 2.5 takes another logarithm instead of undoing one.",
      ],
      nearMissIndex: 2,
      distinguisher: "Undo the logarithm with a power of the base.",
    },
    {
      id: "precalculus-2-15-q09",
      topicId: "precalculus-2-15",
      concept: "linearization",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "A semi-log plot of data, using the natural logarithm, has a line through (0, 1.2) and (5, 3.2). Which exponential model matches the data?",
      choices: [
        "y = e^1.2 (e^0.4)ˣ",
        "y = 1.2(0.4)ˣ",
        "y = 1.2e^(0.4x) + 1",
        "y = e^0.4 (e^1.2)ˣ",
      ],
      correctAnswer: 0,
      explanation:
        "Slope = (3.2 − 1.2)/5 = 0.4 = ln b, so b = e^0.4. Intercept 1.2 = ln a, so a = e^1.2. y = e^1.2 (e^0.4)ˣ.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "a = e^(intercept) and b = e^(slope).",
        "The slope and intercept are natural logarithms of b and a.",
        "There is no added constant; the plot is exactly linear.",
        "This switches the roles of the slope and the intercept.",
      ],
      nearMissIndex: 3,
      distinguisher: "Intercept gives a, slope gives b, both through e^(…).",
    },
    {
      id: "precalculus-2-15-q10",
      topicId: "precalculus-2-15",
      concept: "semi-log",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "What is one advantage of semi-log plots for deciding whether an exponential model is appropriate?",
      choices: [
        "They make every data set, exponential or not, appear linear.",
        "They remove the need to compute logarithms of the data.",
        "They show the residuals of a model on the vertical axis.",
        "Outputs need not be shifted by a constant to show the trend.",
      ],
      correctAnswer: 3,
      explanation:
        "An advantage of semi-log plots is that the dependent variable values do not need to be transformed by a constant to reveal that transformations of an exponential function would produce an appropriate model.",
      sourceIds: ["ced", "ced-topic-2-15"],
      choiceExplanations: [
        "Only exponential data appear linear on a y-semi-log plot.",
        "The vertical axis is a logarithm of the output.",
        "A residual plot shows residuals; a semi-log plot shows the logarithms of the outputs.",
        "This is the advantage the CED names.",
      ],
      nearMissIndex: 2,
      distinguisher: "No need to subtract a constant first when looking for the trend.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-2-15-mcq",
      courseId: "precalculus",
      unitId: "precalculus-2",
      topicId: "precalculus-2-15",
      title: "Semi-log Plots multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-2-15-q01",
        "precalculus-2-15-q02",
        "precalculus-2-15-q03",
        "precalculus-2-15-q04",
        "precalculus-2-15-q05",
        "precalculus-2-15-q06",
        "precalculus-2-15-q07",
        "precalculus-2-15-q08",
        "precalculus-2-15-q09",
        "precalculus-2-15-q10",
      ],
    },
  ],
};

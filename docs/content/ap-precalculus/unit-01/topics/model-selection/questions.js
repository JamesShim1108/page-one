// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-13-q01",
      topicId: "precalculus-1-13",
      concept: "choose-type",
      difficulty: "Quick check",
      skill: "support-conclusions",
      prompt:
        "The output values of a function f at x = 0, 1, 2, 3, 4 are 3, 7, 11, 15, 19. Which of the following function types best models f, and why?",
      choices: [
        "Quadratic, because the output values increase as x increases from 0 to 4",
        "Linear, because the 1st differences are a constant 4 over equal-length intervals",
        "Cubic, because the output values increase by more than 3 at every step",
        "Quadratic, because there are five data points with distinct input values",
      ],
      correctAnswer: 1,
      explanation:
        "The 1st differences are 4, 4, 4, 4. A constant rate of change over equal-length input-value intervals means a linear model is best.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Increasing output values do not imply a quadratic. A quadratic has constant 2nd differences.",
        "Constant 1st differences of 4 over equal-length intervals mean a constant rate of change.",
        "The output values change by exactly 4 each time, which is linear.",
        "The number of data points does not decide the function type.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Name the level of differences that is constant: 1st means linear, 2nd means quadratic.",
    },
    {
      id: "precalculus-1-13-q02",
      topicId: "precalculus-1-13",
      concept: "differences-and-degree",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The table gives values of the function f for selected values of x. Based on the table, which of the following function types best models f?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of f",
          columns: ["x", "1", "2", "3", "4", "5"],
          rows: [["f(x)", "2", "5", "12", "23", "38"]],
        },
      ],
      choices: ["Linear", "Cubic", "Exponential", "Quadratic"],
      correctAnswer: 3,
      explanation:
        "The 1st differences are 3, 7, 11, 15 and the 2nd differences are 4, 4, 4. Because the 2nd differences are a constant 4 over consecutive equal-length input-value intervals, a quadratic model is best.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "The 1st differences, 3, 7, 11, 15, are not constant.",
        "A cubic model fits constant 3rd differences, but here the 2nd differences are already constant.",
        "An exponential model would need a constant ratio of consecutive output values, but 5/2 and 12/5 are not equal.",
        "The 2nd differences are a constant 4.",
      ],
      nearMissIndex: 1,
      distinguisher: "Choose the least degree at which the differences become constant.",
    },
    {
      id: "precalculus-1-13-q03",
      topicId: "precalculus-1-13",
      concept: "differences-and-degree",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "A data set consists of 5 points with distinct input values. What is the least degree n for which a polynomial function of degree n or less is guaranteed to pass through all 5 points?",
      choices: ["4", "5", "3", "6"],
      correctAnswer: 0,
      explanation:
        "A polynomial function of degree n or less can model a graph of n + 1 points with distinct input values. For 5 points, n + 1 = 5, so n = 4.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "n + 1 = 5 gives n = 4.",
        "Degree 5 also works, but it is not the least degree that is guaranteed.",
        "A cubic passes through 4 points in general, not every set of 5 points.",
        "Degree 6 is more than is needed.",
      ],
      nearMissIndex: 1,
      distinguisher: "n + 1 points need degree n.",
    },
    {
      id: "precalculus-1-13-q04",
      topicId: "precalculus-1-13",
      concept: "assumptions-restrictions",
      difficulty: "Quick check",
      skill: "support-conclusions",
      prompt:
        "The height, in feet, of a ball t seconds after it is thrown is modeled by h(t) = −16t² + 48t + 5. The ball lands when h(t) = 0, at t ≈ 3.101. Which of the following is the most appropriate domain for the model?",
      choices: [
        "All real numbers, since the formula is defined for every t",
        "t ≥ 0, since time cannot be negative",
        "0 ≤ t ≤ 3.101, from the throw until the ball lands",
        "0 ≤ t ≤ 1.5, from the throw until the ball reaches its maximum height",
      ],
      correctAnswer: 2,
      explanation:
        "The model describes the ball from the throw, t = 0, until it lands at t ≈ 3.101 seconds. After that the model gives negative heights.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Negative times are before the throw, and large times give negative heights.",
        "The start is right, but times after t ≈ 3.101 give heights below the ground.",
        "The domain starts at the throw and ends when h(t) = 0.",
        "The ball is still in the air after reaching its maximum height.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Find where the context starts and where the model stops making sense.",
    },
    {
      id: "precalculus-1-13-q05",
      topicId: "precalculus-1-13",
      concept: "choose-type",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "An open box is made from a 20-inch by 30-inch sheet of cardboard by cutting a square with side length x inches from each corner and folding up the sides. Which of the following function types best models the volume of the box as a function of x?",
      choices: [
        "Linear, because the side length x of each square increases at a constant rate",
        "Quadratic, because the base of the box is a rectangle with an area",
        "Cubic, because volume involves three dimensions",
        "Piecewise-defined, because there are four corners",
      ],
      correctAnswer: 2,
      explanation:
        "The volume is x(30 − 2x)(20 − 2x), a product of three linear factors. Geometric contexts involving volume, or three dimensions, are often modeled by cubic functions.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "A constant change in x does not make the volume change at a constant rate.",
        "The area of the base is quadratic, but the volume multiplies it by the height x.",
        "V(x) = x(30 − 2x)(20 − 2x) has degree 3.",
        "The four corners are cut the same way, so the rule is the same for every x.",
      ],
      nearMissIndex: 1,
      distinguisher: "Area involves two dimensions. Volume involves three.",
    },
    {
      id: "precalculus-1-13-q06",
      topicId: "precalculus-1-13",
      concept: "differences-and-degree",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "Which of the following lists of output values, at x = 1, 2, 3, 4, 5, could be modeled exactly by a quadratic function?",
      choices: [
        "2, 6, 12, 20, 30",
        "2, 6, 12, 20, 31",
        "3, 7, 11, 15, 19",
        "1, 8, 27, 64, 125",
      ],
      correctAnswer: 0,
      explanation:
        "For 2, 6, 12, 20, 30 the 1st differences are 4, 6, 8, 10 and the 2nd differences are a constant 2.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "The 2nd differences are a constant 2.",
        "The last value breaks the pattern: the 2nd differences are 2, 2, 3.",
        "These have constant 1st differences, so they are linear.",
        "These have constant 3rd differences, so they are cubic.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Compute two levels of differences and check whether the 2nd level is constant and nonzero.",
    },
    {
      id: "precalculus-1-13-q07",
      topicId: "precalculus-1-13",
      concept: "assumptions-restrictions",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A quadratic model N(t) = 0.5t² + 2t + 20 fits the number of visitors to a website, in thousands, for months t = 0 to t = 12. A student uses the model to predict N(60) = 1,940 and says the prediction is reliable because the model fits the data well. Which of the following is the best response?",
      choices: [
        "The model should be linear, because data collected monthly always follow a linear pattern.",
        "The model cannot be evaluated at t = 60, because 60 is greater than 12.",
        "The prediction should be less than N(12), because every quadratic model eventually decreases.",
        "t = 60 is far outside the data, so the trend may not continue.",
      ],
      correctAnswer: 3,
      explanation:
        "The model is supported only for 0 ≤ t ≤ 12. Using it at t = 60 assumes the same pattern of change continues for four more years, which the data cannot confirm.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Monthly data can follow many patterns, and the quadratic fits these.",
        "The formula can be evaluated at t = 60. The issue is whether the prediction is reliable.",
        "This quadratic opens upward, so N keeps increasing for t > 0.",
        "Predictions far beyond the data rely on an assumption the data do not support.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A good fit supports predictions inside the data, not necessarily far outside it.",
    },
    {
      id: "precalculus-1-13-q08",
      topicId: "precalculus-1-13",
      concept: "assumptions-restrictions",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "The number of tickets sold for a concert d days after sales open is modeled by T(d) = 40d + 0.8d² for 0 ≤ d ≤ 30. Which of the following describes an appropriate range restriction for the model?",
      choices: [
        "The output values may be any real numbers, including negative numbers of tickets.",
        "Tickets are whole numbers, so outputs are rounded, with 0 ≤ T ≤ 1,920.",
        "The output values are restricted to 0 ≤ T ≤ 30, the number of days.",
        "The output values are restricted to T ≥ 1,920.",
      ],
      correctAnswer: 1,
      explanation:
        "Tickets are counted in whole numbers, so output values are rounded, and T is increasing on 0 ≤ d ≤ 30, from T(0) = 0 to T(30) = 1,200 + 720 = 1,920.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "A number of tickets cannot be negative.",
        "Tickets are whole numbers, and the model gives values from 0 to 1,920 on the domain.",
        "30 restricts the domain (days), not the range (tickets).",
        "T(30) = 1,920 is the greatest value on the domain, not the least.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Domain restrictions are about inputs. Range restrictions, including rounding, are about outputs.",
    },
    {
      id: "precalculus-1-13-q09",
      topicId: "precalculus-1-13",
      concept: "piecewise-models",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "A parking garage charges $3 per hour for the first 2 hours and $1 per hour for each hour after that. Which of the following best models the cost C(t), in dollars, for t hours?",
      choices: [
        "A piecewise-defined function: C(t) = 3t for 0 ≤ t ≤ 2 and C(t) = 6 + (t − 2) for t > 2",
        "A linear function: C(t) = 3t for all t ≥ 0, since the first rate is $3 per hour",
        "A linear function: C(t) = 4t for all t ≥ 0, combining the two hourly rates",
        "A quadratic function, because the rate of change is not the same for all t",
      ],
      correctAnswer: 0,
      explanation:
        "The rate of change is 3 dollars per hour on 0 ≤ t ≤ 2 and 1 dollar per hour for t > 2. Different characteristics over different intervals call for a piecewise-defined function.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Each piece is linear with its own rate of change, and the pieces meet at C(2) = 6.",
        "3t overcharges after 2 hours: at t = 5 it gives 15, but the cost is 9.",
        "The two rates are not added together.",
        "The rate changes once, at t = 2, not at a constant rate, so the model is not quadratic.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A sudden change in the rate at a known input value suggests a piecewise-defined model.",
    },
    {
      id: "precalculus-1-13-q10",
      topicId: "precalculus-1-13",
      concept: "assumptions-restrictions",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "The height of a plant, in centimeters, is modeled by H(t) = 2t + 10, where t is the number of days after the first measurement. Which of the following is an assumption of this model?",
      choices: [
        "The plant grows faster and faster as the days pass.",
        "The plant stops growing after day 10 and then stays the same height.",
        "The plant is exactly 10 centimeters tall on day 10.",
        "The plant grows by the same number of centimeters each day.",
      ],
      correctAnswer: 3,
      explanation:
        "A linear model has a constant rate of change, here 2 centimeters per day. The model assumes the plant grows by the same amount each day.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Growth that speeds up would need a rate of change that increases.",
        "A plant that stops growing would need a model that levels off.",
        "H(10) = 30. The value 10 is the height at t = 0.",
        "The slope 2 means 2 centimeters of growth per day, every day.",
      ],
      nearMissIndex: 0,
      distinguisher: "Name the rate of change the model assumes.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-13-mcq",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-13",
      title: "Function Model Selection and Assumption Articulation multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-1-13-q01",
        "precalculus-1-13-q02",
        "precalculus-1-13-q03",
        "precalculus-1-13-q04",
        "precalculus-1-13-q05",
        "precalculus-1-13-q06",
        "precalculus-1-13-q07",
        "precalculus-1-13-q08",
        "precalculus-1-13-q09",
        "precalculus-1-13-q10",
      ],
    },
  ],
};

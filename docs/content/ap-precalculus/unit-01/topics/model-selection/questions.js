// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-13-q01",
      topicId: "precalculus-1-13",
      concept: "choose-type",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "Data at x = 0, 1, 2, 3, 4 have outputs 3, 7, 11, 15, 19. Which type of model fits?",
      choices: [
        "A quadratic model, because the outputs keep increasing",
        "A linear model, because the output changes by 4 for each step",
        "A cubic model, because the outputs increase by more than 3 each time",
        "A rational model, because the outputs are whole numbers",
      ],
      correctAnswer: 1,
      explanation:
        "The first differences are 4, 4, 4, 4. Constant first differences mean the average rate of change is constant, which is linear.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Increasing outputs do not make a model quadratic. A quadratic has constant second differences, while these have constant first differences.",
        "Equal changes in output for equal steps in input match a linear function with slope 4.",
        "The outputs rise by exactly 4 each step, so there is no sign of a higher degree.",
        "Whole-number outputs do not indicate a rational model.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Look at what is constant: first differences suggest linear and second differences suggest quadratic.",
    },
    {
      id: "precalculus-1-13-q02",
      topicId: "precalculus-1-13",
      concept: "differences-and-degree",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The table gives data from a polynomial function at equally spaced inputs. What is the lowest degree that fits?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Data at equally spaced inputs",
          columns: ["x", "0", "1", "2", "3", "4"],
          rows: [["y", "2", "5", "12", "23", "38"]],
        },
      ],
      choices: ["1", "3", "4", "2"],
      correctAnswer: 3,
      explanation:
        "The first differences are 3, 7, 11, 15, which are not constant. The second differences are 4, 4, 4, which are constant. The lowest degree is 2.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "A degree 1 function would have constant first differences, but 3, 7, 11, 15 vary.",
        "A cubic would be needed only if the second differences were not constant. They are all 4.",
        "A degree 4 fit would require constant fourth differences, but the second differences are already constant.",
        "The second differences are constant at 4, so a quadratic fits.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Take differences until a list is constant, and count how many times you subtracted.",
    },
    {
      id: "precalculus-1-13-q03",
      topicId: "precalculus-1-13",
      concept: "differences-and-degree",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "Data at equally spaced inputs have constant fourth differences and nonconstant third differences. What is the lowest degree of a polynomial that fits?",
      choices: ["4", "3", "5", "2"],
      correctAnswer: 0,
      explanation:
        "The number of times you must take differences to reach a constant list equals the degree. Constant fourth differences mean degree 4.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Four rounds of differences are needed to reach a constant, so the degree is 4.",
        "Degree 3 would give constant third differences, but these are not constant.",
        "Degree 5 would require five rounds of differences. Four are enough.",
        "Degree 2 would give constant second differences.",
      ],
      nearMissIndex: 1,
      distinguisher: "The level of difference that becomes constant is the degree.",
    },
    {
      id: "precalculus-1-13-q04",
      topicId: "precalculus-1-13",
      concept: "assumptions-restrictions",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "A ball's height is modeled by h(t) = −16t² + 48t + 5 feet, t seconds after being thrown. Which domain is most reasonable for describing the flight?",
      choices: [
        "All real numbers",
        "t ≥ 0",
        "0 ≤ t ≤ 3.1, about when the ball lands",
        "0 ≤ t ≤ 1.5, when the ball reaches its peak",
      ],
      correctAnswer: 2,
      explanation:
        "The flight begins at t = 0 and ends when the ball lands, at h(t) = 0. Solving gives t ≈ 3.1 seconds. After that the model gives negative heights, which do not describe the ball.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Negative times come before the throw, and large times give heights below the ground.",
        "This starts correctly, but it allows times after the landing, when the model gives negative heights.",
        "The flight lasts from the throw until the landing at about 3.1 seconds.",
        "The peak is only the middle of the flight. The ball is still in the air afterward.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Ask when the situation starts and when it ends, then check where the formula stops making sense.",
    },
    {
      id: "precalculus-1-13-q05",
      topicId: "precalculus-1-13",
      concept: "choose-type",
      difficulty: "Core",
      skill: "identify-information",
      prompt: "Which type of model does the table suggest?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of y",
          columns: ["x", "1", "2", "3", "4"],
          rows: [["y", "12", "6", "4", "3"]],
        },
      ],
      choices: [
        "A linear model, because the outputs decrease as x increases",
        "A quadratic model, because the outputs are not equally spaced",
        "A rational model, because the product of x and y is always 12",
        "A cubic model, because there are four data points",
      ],
      correctAnswer: 2,
      explanation:
        "Each product x·y equals 12, so y = 12/x. That is a rational function of the form constant over x.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "A linear model would have constant first differences, but the differences are −6, −2, −1.",
        "Unequal spacing alone does not make a model quadratic. The second differences, 4 and 1, are not constant either.",
        "The constant product means y = 12/x, a rational function.",
        "The number of data points does not determine the degree.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Look for a constant product or ratio when the outputs shrink as the inputs grow.",
    },
    {
      id: "precalculus-1-13-q06",
      topicId: "precalculus-1-13",
      concept: "differences-and-degree",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "Which list of y-values at x = 1, 2, 3, 4, 5 could come from a quadratic function?",
      choices: [
        "2, 6, 12, 20, 30",
        "2, 6, 12, 20, 31",
        "3, 7, 11, 15, 19",
        "1, 8, 27, 64, 125",
      ],
      correctAnswer: 0,
      explanation:
        "For 2, 6, 12, 20, 30 the first differences are 4, 6, 8, 10, and the second differences are 2, 2, 2. The second differences are constant, so a quadratic fits.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "The second differences are all 2, which matches a quadratic function.",
        "The last value breaks the pattern. The second differences are 2, 2, 3, so they are not constant.",
        "These first differences are constant, which means a linear function.",
        "These have constant third differences, which means a cubic function.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Compute two levels of differences and see whether the second list is constant.",
    },
    {
      id: "precalculus-1-13-q07",
      topicId: "precalculus-1-13",
      concept: "assumptions-restrictions",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A quadratic model N(t) = 0.5t² + 2t + 20 fits a website's monthly visitors, in thousands, very well for months t = 0 to 12. A student uses it to predict month 60 (N(60) = 1,940) and says the prediction is reliable because the model fits. What is the best critique?",
      choices: [
        "The model should be linear, since data collected monthly always follow a linear pattern",
        "The model cannot give a value for any month, because the input 60 is too large",
        "The prediction should be smaller than N(12), because all quadratic models eventually decrease",
        "The prediction is an extrapolation far beyond the data, so the trend may not continue",
      ],
      correctAnswer: 3,
      explanation:
        "A good fit on months 0 to 12 does not guarantee that the same trend continues to month 60. Extrapolating far from the data assumes that nothing in the situation changes.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Monthly data can follow many patterns. The fit shows that a quadratic works over the observed months.",
        "The formula can be evaluated at t = 60. The concern is whether the prediction is believable, not whether it is computable.",
        "This quadratic opens upward, so N keeps increasing for t > 0. N(60) = 1,940 is larger than N(12) = 116.",
        "The model is only supported by months 0 to 12, so a prediction at month 60 relies on the assumption that the trend continues.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A model's fit supports predictions inside the data, but not necessarily far outside it.",
    },
    {
      id: "precalculus-1-13-q08",
      topicId: "precalculus-1-13",
      concept: "assumptions-restrictions",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "Using the model h(t) = −16t² + 48t + 5 for the flight from the throw until the ball lands, what is the range of h?",
      choices: ["5 ≤ h ≤ 41", "0 ≤ h ≤ 41", "h ≤ 41", "0 ≤ h ≤ 5"],
      correctAnswer: 1,
      explanation:
        "The greatest height is the vertex value h(1.5) = 41. The flight ends at the ground, where h = 0. Heights range from 0 to 41 feet.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "5 is the starting height. The ball later falls below 5 feet and reaches the ground.",
        "The ball starts at 5 feet, rises to 41 feet, and then falls to 0 feet at landing.",
        "Without the lower bound, the range includes negative heights below the ground.",
        "5 is the starting height, not the highest. The ball rises to 41 feet.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Find the greatest height from the vertex, and the least height from the end of the flight.",
    },
    {
      id: "precalculus-1-13-q09",
      topicId: "precalculus-1-13",
      concept: "choose-type",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "A club shares a fixed cost of $300 equally among its n members, so each member pays C(n) = 300/n dollars. Which statement about this model is correct?",
      choices: [
        "It is a rational model, and the domain is the positive whole numbers of members, not all reals",
        "It is a linear model with a constant rate of change, and the domain is all real numbers",
        "It is a quadratic model because n appears, and the domain should be n ≥ 0",
        "It is a rational model, and the domain should be all real numbers except 0",
      ],
      correctAnswer: 0,
      explanation:
        "C(n) = 300/n is a ratio of polynomials, so it is rational. The number of members is a positive whole number, so the domain is restricted to those values, even though the formula alone is undefined only at n = 0.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "The formula has a polynomial over a polynomial, and the context allows only whole numbers of members at least 1.",
        "The graph of 300/n is not a line, and it has a vertical asymptote at n = 0.",
        "There is no n² term, and n = 0 is not allowed because C(0) is undefined.",
        "The type is right, but the context restricts the domain to positive whole numbers.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "A formula's domain and the situation's domain can differ, and the model must use the second.",
    },
    {
      id: "precalculus-1-13-q10",
      topicId: "precalculus-1-13",
      concept: "assumptions-restrictions",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "A plant's height in centimeters is modeled by H(t) = 2t + 10, where t is the number of days after the first measurement. Which assumption is needed for this linear model?",
      choices: [
        "The plant's growth speeds up as the days pass",
        "The plant stops growing after day 10",
        "The plant has a height of 10 centimeters on day 10",
        "The plant grows by the same number of centimeters each day",
      ],
      correctAnswer: 3,
      explanation:
        "A linear model has a constant rate of change, which here is 2 centimeters per day. Using it assumes that the plant grows by the same amount each day over the interval modeled.",
      sourceIds: ["ced", "ced-topic-1-13"],
      choiceExplanations: [
        "Growth that speeds up would give a rate of change that changes, which would need a nonlinear model.",
        "A plant that stops growing would be modeled by a function that levels off, not by a line.",
        "The height at day 10 is H(10) = 30. The value 10 is the height at the first measurement.",
        "The rate of change is the slope 2, so the model assumes a constant 2 centimeters of growth per day.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Name the rate of change the model assumes, and say whether it can stay constant.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-13-quick",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-13",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-1-13-q01",
        "precalculus-1-13-q02",
        "precalculus-1-13-q03",
        "precalculus-1-13-q04",
      ],
    },
    {
      id: "precalculus-1-13-quiz",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-13",
      title: "Function Model Selection and Assumption Articulation topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
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

// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-3",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 3,
  code: "1.3",
  title: "Rates of Change in Linear and Quadratic Functions",
  period: "Unit 1",
  status: "ready",
  summary:
    "How average rates behave for linear and quadratic functions, secant slopes, and reading concavity from changing rates.",
  minutes: 11,
  learningGoals: [
    "Explain why a linear function has the same average rate of change over every interval of equal width.",
    "Describe how the average rates of a quadratic function change across consecutive equal-width intervals.",
    "Connect an average rate of change to the slope of a secant line and use changing average rates to decide concavity.",
  ],
  bigIdea:
    "The pattern of average rates over equal-width intervals reveals the type of function. Constant rates mean a linear function, and rates that change by a constant amount are the signature of a quadratic function.",
  context:
    "Topic 1.2 gave you a way to calculate and interpret rates. This topic studies how those rates themselves behave. Looking at the rate of change of the rates is the first step toward recognizing function families from their data.",
  sections: [
    {
      id: "linear-rates",
      title: "A linear function has the same average rate of change everywhere.",
      conceptTitle: "Linear functions and constant rates",
      blocks: [
        {
          type: "paragraph",
          text: "A linear function f(x) = mx + b changes by the same amount m for every one-unit step in x. Its average rate of change is the constant m over every interval of any width. The graph is a line, and the line has no concavity because its rate never changes.",
        },
        {
          type: "table",
          caption: "Outputs of f(x) = 3x + 2 at equally spaced inputs",
          columns: ["x", "f(x)", "Change from the previous output"],
          rows: [
            ["0", "2", "n/a"],
            ["1", "5", "3"],
            ["2", "8", "3"],
            ["3", "11", "3"],
          ],
        },
        {
          type: "paragraph",
          text: "A sequence is a function whose inputs are the positive integers, so it lists outputs in order. When consecutive terms differ by the same amount, the average rate of change from one term to the next is constant, and the sequence behaves like a linear function. Because the average rates of a linear function never change, they change at a rate of zero.",
        },
      ],
      takeaway:
        "Constant average rates mean linear. The rate of change of those rates is zero.",
    },
    {
      id: "quadratic-rates",
      title: "A quadratic function's average rates change by a constant amount.",
      conceptTitle: "Quadratic functions and changing rates",
      blocks: [
        {
          type: "paragraph",
          text: "A quadratic function can be written q(x) = ax² + bx + c with a ≠ 0. Its average rate of change is not constant. Instead, over consecutive intervals of the same width, the average rates themselves follow a linear pattern, increasing or decreasing by the same amount each time.",
        },
        {
          type: "table",
          caption:
            "Average rates for q(x) = 2x² − 3x + 1 on consecutive intervals of width 1",
          columns: ["Interval", "q at left end", "q at right end", "Average rate"],
          rows: [
            ["[0, 1]", "1", "0", "-1"],
            ["[1, 2]", "0", "3", "3"],
            ["[2, 3]", "3", "10", "7"],
            ["[3, 4]", "10", "21", "11"],
            ["[4, 5]", "21", "36", "15"],
          ],
        },
        {
          type: "paragraph",
          text: "The average rates −1, 3, 7, 11, 15 increase by 4 each time. Since the rates change at a constant rate, they form a linear function of the interval. When a is positive the rates increase and the graph is concave up. When a is negative the rates decrease and the graph is concave down.",
        },
      ],
      takeaway:
        "For a quadratic, the average rates over equal-width intervals change by a constant amount.",
    },
    {
      id: "secant-lines",
      title: "On a graph, an average rate of change is the slope of a secant line.",
      conceptTitle: "Secant lines",
      blocks: [
        {
          type: "paragraph",
          text: "A secant line is a line through two points on a graph. Its slope is rise over run, which is exactly the change in output divided by the change in input. So the average rate of change of f on [a, b] equals the slope of the secant line through (a, f(a)) and (b, f(b)).",
        },
        {
          type: "paragraph",
          text: "For f(x) = x², the secant line through (1, 1) and (3, 9) has slope (9 − 1)/(3 − 1) = 4. That number is also the average rate of change of f on [1, 3]. Picturing the secant line is a useful way to see why average rates are different on different intervals: different intervals produce secant lines with different slopes.",
        },
      ],
      takeaway:
        "Average rate of change and secant slope are two names for the same number.",
    },
    {
      id: "concavity-from-rates",
      title: "How average rates change reveals concavity.",
      conceptTitle: "Concavity from rates",
      blocks: [
        {
          type: "paragraph",
          text: "Take average rates over consecutive intervals of equal width and see what they do. If they keep increasing, the graph is concave up. If they keep decreasing, the graph is concave down. If they stay the same, the graph is a line.",
        },
        {
          type: "table",
          caption: "Reading the pattern of average rates",
          columns: [
            "Average rates on consecutive equal intervals",
            "Pattern",
            "Shape of the graph",
          ],
          rows: [
            ["2, 4, 6, 8", "Increasing", "Concave up"],
            ["9, 5, 1, −3", "Decreasing", "Concave down"],
            ["3, 3, 3, 3", "Constant", "A line, with no concavity"],
          ],
        },
        {
          type: "callout",
          title: "Rates can be negative and still increase",
          text: "The rates −8, −5, −3, −1 are all negative, but they are increasing, so the graph falls and is concave up. Compare the rates with each other, not with zero.",
        },
      ],
      takeaway:
        "Increasing rates mean concave up. Decreasing rates mean concave down. Constant rates mean linear.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-3-linear-function",
      topicId: "precalculus-1-3",
      term: "Linear function",
      definition:
        "A function of the form f(x) = mx + b. Its average rate of change is the constant m over every interval.",
    },
    {
      id: "precalculus-1-3-quadratic-function",
      topicId: "precalculus-1-3",
      term: "Quadratic function",
      definition:
        "A function that can be written ax² + bx + c with a ≠ 0. Its average rates over consecutive equal-width intervals form a linear pattern.",
    },
    {
      id: "precalculus-1-3-secant-line",
      topicId: "precalculus-1-3",
      term: "Secant line",
      definition:
        "A line through two points of a graph. Its slope is the average rate of change between those points.",
    },
    {
      id: "precalculus-1-3-sequence",
      topicId: "precalculus-1-3",
      term: "Sequence",
      definition:
        "A function whose inputs are the positive integers, listing outputs in order.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-3-c1",
      topicId: "precalculus-1-3",
      type: "Look back",
      title: "Same idea, now with numbers",
      body: "Topic 1.1 said concave up means the rate of change is increasing. Here you tested that claim by listing average rates over equal-width intervals and watching whether they grow.",
      transferQuestion:
        "Average rates over three consecutive equal intervals are 12, 7, and 3. Is the graph concave up or concave down, and is the function increasing?",
      feedback:
        "The rates are decreasing, so the graph is concave down. The rates are all positive, so the function is still increasing.",
      links: [
        {
          topicId: "precalculus-1-1",
          sectionId: "concavity",
          label: "Review concavity",
        },
      ],
    },
    {
      id: "precalculus-1-3-c2",
      topicId: "precalculus-1-3",
      type: "Looking ahead",
      title: "Polynomials generalize this pattern",
      body: "A quadratic has constant second differences. Topic 1.5 extends this: the degree of a polynomial can be found by taking successive differences until they become constant.",
      transferQuestion:
        "If the first differences of a table are constant, what degree would you expect? What if the second differences are constant?",
      feedback:
        "Constant first differences point to degree 1 and constant second differences to degree 2. In general, the first constant row of differences names the degree.",
      links: [
        {
          topicId: "precalculus-1-5",
          sectionId: "degree-from-differences",
          label: "See degree from differences",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-3"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-concave-up",
      "precalculus-1-1-concave-down",
      "precalculus-1-2-average-rate",
      "precalculus-1-3-linear-function",
      "precalculus-1-3-quadratic-function",
      "precalculus-1-3-secant-line",
      "precalculus-1-3-sequence",
    ],
  },
};

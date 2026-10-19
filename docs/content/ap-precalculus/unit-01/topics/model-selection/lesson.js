// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-13",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 13,
  code: "1.13",
  title: "Function Model Selection and Assumption Articulation",
  period: "Unit 1",
  status: "ready",
  summary:
    "Choosing a type of function to model a situation, using successive differences, and stating the assumptions and restrictions that come with a model.",
  minutes: 14,
  learningGoals: [
    "Match the pattern in a situation or data set to a linear, quadratic, polynomial, or rational model.",
    "Use successive differences of equally spaced data to identify the degree of a polynomial model.",
    "State the assumptions and the domain and range restrictions that a model needs in context.",
  ],
  bigIdea:
    "A model is a function chosen to describe a situation, and it is only as good as the pattern it matches and the assumptions behind it. Choosing a model means connecting the structure of the data to the structure of a function family, then saying where the model applies.",
  context:
    "You now know several function families and how to read rates, zeros, asymptotes, and transformations. This topic asks which family to reach for, and how to be honest about what the model assumes and where it breaks down.",
  sections: [
    {
      id: "choose-type",
      title: "The pattern in the data points to a type of function.",
      conceptTitle: "Choosing a type of model",
      blocks: [
        {
          type: "paragraph",
          text: "A mathematical model is a function that describes how two quantities in a situation are related. Before fitting anything, ask what the situation says about how the output changes. The average rate of change over equal steps is a strong clue.",
        },
        {
          type: "table",
          caption: "Clues for choosing a model",
          columns: ["What you notice", "Model that fits"],
          rows: [
            ["Equal input steps give equal output changes", "Linear function"],
            [
              "The changes in output themselves change by a constant amount",
              "Quadratic function",
            ],
            [
              "Constant differences appear only at a higher level (third differences, for example)",
              "Polynomial function of higher degree",
            ],
            [
              "The output depends on a ratio, such as a fixed total shared among n people, or levels off near a value",
              "Rational function",
            ],
          ],
        },
      ],
      takeaway:
        "Describe how the output changes, then choose the function family whose structure has that same pattern.",
    },
    {
      id: "differences-and-degree",
      title: "Successive differences reveal the degree of a polynomial model.",
      conceptTitle: "Successive differences",
      blocks: [
        {
          type: "paragraph",
          text: "When the inputs are equally spaced, successive differences are found by subtracting each output from the next, then repeating on the new list. If the nth differences are constant, a polynomial of degree n fits the data. First differences that are constant indicate a linear function, and second differences that are constant indicate a quadratic function.",
        },
        {
          type: "table",
          caption: "Successive differences for data from a cubic function",
          columns: ["Row (inputs x = 0, 1, 2, 3, 4, 5)", "Values"],
          rows: [
            ["y", "0, −1, 4, 21, 56, 115"],
            ["First differences", "−1, 5, 17, 35, 59"],
            ["Second differences", "6, 12, 18, 24"],
            ["Third differences", "6, 6, 6"],
          ],
        },
        {
          type: "paragraph",
          text: "The first and second differences vary, but the third differences are all 6. So a cubic function fits these data. Real measurements contain error, so differences are rarely perfectly constant, and you look for differences that are close to constant.",
        },
      ],
      takeaway:
        "Keep taking differences until they become constant. The number of times you subtracted is the degree.",
    },
    {
      id: "assumptions-restrictions",
      title: "Every model has assumptions and restrictions on its domain and range.",
      conceptTitle: "Assumptions and restrictions",
      blocks: [
        {
          type: "paragraph",
          text: "A ball is thrown upward from a height of 5 feet, and its height after t seconds is modeled by h(t) = −16t² + 48t + 5 feet. This model assumes the ball moves only under gravity, with no air resistance and no wind. It also describes only the flight itself: the domain is 0 ≤ t ≤ about 3.1 seconds, when the ball lands. The range is 0 ≤ h ≤ 41 feet, since the greatest height is h(1.5) = 41 and the ball ends at ground level.",
        },
        {
          type: "table",
          caption: "Heights from h(t) = −16t² + 48t + 5",
          columns: ["t (seconds)", "h(t) (feet)"],
          rows: [
            ["0", "5"],
            ["0.5", "25"],
            ["1", "37"],
            ["1.5", "41"],
            ["2", "37"],
            ["2.5", "25"],
            ["3", "5"],
          ],
        },
        {
          type: "paragraph",
          text: "The average rate of change from t = 0 to t = 1 is 32 feet per second, and from t = 1.5 to t = 3 it is −24 feet per second. Using the model to make predictions at times far from where it was fit, called extrapolation, is risky. A formula keeps producing numbers outside the situation, such as negative heights, even when they make no sense.",
        },
      ],
      takeaway:
        "State what the model assumes, restrict the domain and range to what makes sense, and be cautious about extrapolation.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-13-mathematical-model",
      topicId: "precalculus-1-13",
      term: "Mathematical model",
      definition:
        "A function or equation chosen to describe how quantities in a real situation are related.",
    },
    {
      id: "precalculus-1-13-assumption",
      topicId: "precalculus-1-13",
      term: "Assumption",
      definition:
        "A condition taken to be true when a model is built, such as ignoring air resistance or assuming a constant rate.",
    },
    {
      id: "precalculus-1-13-extrapolation",
      topicId: "precalculus-1-13",
      term: "Extrapolation",
      definition:
        "Using a model to predict outputs for inputs outside the interval of data it was built from.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-13-c1",
      topicId: "precalculus-1-13",
      type: "Look back",
      title: "Rates of change were already the evidence",
      body: "In Topic 1.3, the average rate of change was constant for linear functions and changed at a constant pace for quadratic functions. Successive differences are the same idea applied to data tables.",
      transferQuestion:
        "Why does a constant second difference match a quadratic function?",
      feedback:
        "The rate of change of a quadratic function changes at a constant pace, so the changes in the first differences are constant.",
      links: [
        {
          topicId: "precalculus-1-3",
          sectionId: "quadratic-rates",
          label: "Review quadratic rates of change",
        },
      ],
    },
    {
      id: "precalculus-1-13-c2",
      topicId: "precalculus-1-13",
      type: "Looking ahead",
      title: "From choosing to building",
      body: "In Topic 1.14, you will construct the equation of a model from conditions or technology. Choosing a type first tells you what form to build.",
      transferQuestion:
        "What information might you need to find the specific constants in the model once you have chosen its type?",
      feedback:
        "Points or conditions from the data, such as zeros, a maximum, or a few input-output pairs.",
      links: [
        {
          topicId: "precalculus-1-14",
          sectionId: "build-from-conditions",
          label: "Preview model construction",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-13"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-domain",
      "precalculus-1-1-range",
      "precalculus-1-2-average-rate",
      "precalculus-1-3-quadratic-function",
      "precalculus-1-5-successive-differences",
      "precalculus-1-13-mathematical-model",
      "precalculus-1-13-assumption",
      "precalculus-1-13-extrapolation",
    ],
  },
};

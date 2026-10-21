// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-14",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 14,
  code: "1.14",
  title: "Function Model Construction and Application",
  period: "Unit 1",
  status: "ready",
  summary:
    "Constructing polynomial, piecewise-defined, and rational models from conditions, transformations, or regression, and applying a model to answer questions with units.",
  minutes: 16,
  learningGoals: [
    "1.14.A Construct a linear, quadratic, cubic, quartic, polynomial of degree n, or related piecewise-defined function model.",
    "1.14.B Construct a rational function model based on a context.",
    "1.14.C Apply a function model to answer questions about a data set or contextual scenario.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A model is constructed from restrictions in a context, from transformations of a parent function, or from a regression on data. Once constructed, its values, rates of change, average rates of change, and asymptotes answer questions about the context, with units.",
  context:
    "Topic 1.13 chose the function type. This topic finds the specific function and uses it. Free-response Question 2 on the AP Exam follows this path: build the model, compute an average rate of change with units, then interpret and restrict the model.",
  sections: [
    {
      id: "build-from-conditions",
      title: "1.14.A · A model can be constructed from restrictions in a context.",
      conceptTitle: "Constructing a model from conditions",
      blocks: [
        {
          type: "paragraph",
          text: "A model can be constructed based on restrictions identified in a mathematical or contextual scenario. If a cubic has real zeros at −2, 1, and 3 and passes through (0, 12), then p(x) = a(x + 2)(x − 1)(x − 3). At x = 0 this gives 6a = 12, so a = 2 and p(x) = 2(x + 2)(x − 1)(x − 3).",
        },
        {
          type: "table",
          caption: "Checking p(x) = 2(x + 2)(x − 1)(x − 3)",
          columns: ["x", "p(x)"],
          rows: [
            ["−2", "0"],
            ["1", "0"],
            ["3", "0"],
            ["0", "12"],
          ],
        },
        {
          type: "paragraph",
          text: "When a model has unknown constants, write one equation for each given condition and solve the system. For y = ax² + bx + c through (0, 5), (1, 9), and (2, 15): c = 5, a + b + c = 9, and 4a + 2b + c = 15, so a = 1, b = 3, and the model is y = x² + 3x + 5.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Because the model passes through (0, 5), (1, 9), and (2, 15), three equations to find a, b, and c are c = 5, a + b + c = 9, and 4a + 2b + c = 15.",
        },
      ],
      takeaway: "Write one equation per condition, then solve for the constants.",
    },
    {
      id: "build-from-parent",
      title:
        "1.14.A · A model can be constructed with transformations of a parent function.",
      conceptTitle: "Constructing a model from a parent function",
      blocks: [
        {
          type: "paragraph",
          text: "A model of a data set or a contextual scenario can be constructed using transformations of the parent function. Choose the parent function with the right shape, then use the features of the context to choose the translations and dilations.",
        },
        {
          type: "paragraph",
          text: "A quadratic model with vertex (2, 5) through (0, 1) has the form a(x − 2)² + 5. Then 1 = 4a + 5, so a = −1. A rational model with a vertical asymptote at x = 1 and a horizontal asymptote at y = 2 through (3, 3) has the form a/(x − 1) + 2. Then 3 = a/2 + 2, so a = 2.",
        },
        {
          type: "table",
          caption: "Checking g(x) = 2/(x − 1) + 2",
          columns: ["x", "g(x)"],
          rows: [
            ["−1", "1"],
            ["0", "0"],
            ["2", "4"],
            ["3", "3"],
            ["5", "2.5"],
          ],
        },
      ],
      takeaway:
        "Translations place the vertex or asymptotes; one more point fixes the dilation.",
    },
    {
      id: "regression-technology",
      title:
        "1.14.A · A model of a data set can be constructed with technology and regressions.",
      conceptTitle: "Regression with technology",
      blocks: [
        {
          type: "paragraph",
          text: "A model of a data set can be constructed using technology and regressions, including linear, quadratic, cubic, and quartic regressions. You choose the type from the data and the context; the graphing calculator finds the constants. A piecewise-defined model can combine modeling techniques on different intervals.",
        },
        {
          type: "table",
          caption: "A data set",
          columns: ["x", "0", "1", "2", "3", "4", "5"],
          rows: [["y", "2.1", "3.9", "8.2", "14.1", "21.8", "32.2"]],
        },
        {
          type: "paragraph",
          text: "A quadratic regression on these data gives y ≈ 1.011x² + 0.949x + 2.079. Store the full-precision constants in the calculator. Using them, the model predicts y ≈ 44.160 at x = 6. Using the rounded constants instead gives 44.169, which is a different answer to three decimal places.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Avoid rounding intermediate computations. Unless the question says otherwise, report decimal approximations accurate to three places after the decimal point.",
        },
        {
          type: "graph",
          caption: "The data with the quadratic regression model",
          alt: "Six data points rising more and more steeply from (0, 2.1) to (5, 32.2), with a smooth upward-curving regression curve passing close to every point.",
          window: {
            x: [-0.5, 6.5],
            y: [0, 50],
          },
          ticks: {
            x: 1,
            y: 10,
          },
          functions: [
            {
              expr: "1.010714286x^2 + 0.949285714x + 2.078571429",
              domain: [0, 6.3],
              color: 2,
              label: "model",
              labelAt: 6,
              labelPosition: "w",
            },
          ],
          points: [
            {
              at: [0, 2.1],
            },
            {
              at: [1, 3.9],
            },
            {
              at: [2, 8.2],
            },
            {
              at: [3, 14.1],
            },
            {
              at: [4, 21.8],
            },
            {
              at: [5, 32.2],
            },
          ],
        },
      ],
      takeaway:
        "Choose the regression type yourself, keep full precision, and report three decimal places.",
    },
    {
      id: "rational-models",
      title:
        "1.14.B · Inversely proportional quantities are modeled by rational functions.",
      conceptTitle: "Rational function models",
      blocks: [
        {
          type: "paragraph",
          text: "Data sets and contextual scenarios involving quantities that are inversely proportional can often be modeled by rational functions. For example, the magnitudes of the gravitational force and the electromagnetic force between objects are inversely proportional to the square of the distance between them, and so is the intensity of light from a point source.",
        },
        {
          type: "paragraph",
          text: "If the intensity of light is 50 lux at 2 meters from a source and is inversely proportional to the square of the distance d, then I(d) = k/d² with 50 = k/4, so k = 200 and I(d) = 200/d². At d = 5 meters the model predicts I(5) = 8 lux.",
        },
        {
          type: "table",
          caption:
            "Average cost per poster for an order of n posters with a $120 setup fee and $3 per poster, A(n) = (120 + 3n)/n",
          columns: ["n", "A(n) (dollars per poster)"],
          rows: [
            ["10", "15"],
            ["20", "9"],
            ["40", "6"],
            ["60", "5"],
            ["120", "4"],
            ["240", "3.5"],
          ],
        },
        {
          type: "paragraph",
          text: "In the cost model, lim n→∞ A(n) = 3: as the number of posters increases without bound, the average cost per poster gets arbitrarily close to $3.",
        },
      ],
      takeaway:
        "Inverse proportionality gives a rational model k/x or k/x². Asymptotes describe long-run values.",
    },
    {
      id: "interpret-model",
      title: "1.14.C · A model is applied to answer questions, with appropriate units.",
      conceptTitle: "Applying a model",
      blocks: [
        {
          type: "paragraph",
          text: "A model can be used to draw conclusions about the data set or context, including answering key questions and predicting values, rates of change, average rates of change, and changing rates of change. Appropriate units of measure should be extracted or inferred from the context.",
        },
        {
          type: "paragraph",
          text: "For I(d) = 200/d², the average rate of change from d = 2 to d = 5 is (I(5) − I(2))/(5 − 2) = (8 − 50)/3 = −14 lux per meter. For a store's revenue R(p) = p(80 − 4p), in dollars, at price p dollars, the zeros p = 0 and p = 20 mean no revenue, and the maximum is R(10) = 400 dollars at a price of $10.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "From d = 2 meters to d = 5 meters, on average, the intensity of the light decreased at a rate of 14 lux per meter.",
        },
      ],
      takeaway:
        "Every answer in context names the quantity, the units, and the interval or input value.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-14-regression",
      topicId: "precalculus-1-14",
      term: "Regression",
      definition:
        "A model of a data set can be constructed using technology and regressions, including linear, quadratic, cubic, and quartic regressions.",
      source: "CED 1.14.A.3",
    },
    {
      id: "precalculus-1-14-inversely-proportional",
      topicId: "precalculus-1-14",
      term: "Inversely proportional",
      definition:
        "Data sets and aspects of contextual scenarios involving quantities that are inversely proportional can often be modeled by rational functions.",
      source: "CED 1.14.B.1",
    },
  ],
  connections: [
    {
      id: "precalculus-1-14-c1",
      topicId: "precalculus-1-14",
      type: "Look back",
      title: "Choose first, then construct",
      body: "Topic 1.13 chose the function type from the data and context. The type tells you which constants to find and which conditions to use.",
      transferQuestion: "Why must you choose the type before finding constants?",
      feedback:
        "The type determines the form, and the form determines which constants exist.",
      links: [
        {
          topicId: "precalculus-1-13",
          sectionId: "choose-type",
          label: "Review choosing a function type",
        },
      ],
    },
    {
      id: "precalculus-1-14-c2",
      topicId: "precalculus-1-14",
      type: "Look back",
      title: "Transformations place the features",
      body: "Topic 1.12 showed how translations and dilations move vertices and asymptotes. Building a model from a parent function uses those moves in reverse.",
      transferQuestion:
        "Which translations turn 1/x into a function with asymptotes x = 1 and y = 2?",
      feedback:
        "A horizontal translation by 1 unit and a vertical translation by 2 units.",
      links: [
        {
          topicId: "precalculus-1-12",
          sectionId: "domain-and-range",
          label: "Review transformations and asymptotes",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-14"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-2-average-rate",
      "precalculus-1-7-rational-function",
      "precalculus-1-7-horizontal-asymptote",
      "precalculus-1-9-vertical-asymptote",
      "precalculus-1-13-piecewise-defined",
      "precalculus-1-14-regression",
      "precalculus-1-14-inversely-proportional",
    ],
  },
};

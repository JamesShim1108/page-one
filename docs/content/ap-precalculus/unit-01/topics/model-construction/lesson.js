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
    "Building a function model from conditions, a parent function, or technology, and interpreting the model in context.",
  minutes: 15,
  learningGoals: [
    "Construct a polynomial or rational model that satisfies given zeros, points, or asymptotes.",
    "Build a model by transforming a parent function or by using technology to fit data.",
    "Interpret zeros, extreme values, rates of change, and asymptotes of a model with units and context.",
  ],
  bigIdea:
    "A model is built from conditions: what it must equal at certain inputs, where it is zero, and where it levels off. Once built, its features are not just math facts. Each one answers a question in the situation.",
  context:
    "Topic 1.13 chose the type of model. This topic finds the constants that make that type fit, and then reads the finished model back into the situation.",
  sections: [
    {
      id: "build-from-conditions",
      title: "Zeros and a point determine a polynomial model.",
      conceptTitle: "Building from conditions",
      blocks: [
        {
          type: "paragraph",
          text: "If a polynomial has zeros at r₁, r₂, …, it has factors (x − r₁), (x − r₂), …, and an unknown constant multiple a. Use one more point on the graph to find a. Suppose a cubic has zeros at −2, 1, and 3 and passes through (0, 12). Then p(x) = a(x + 2)(x − 1)(x − 3). At x = 0 this gives 6a = 12, so a = 2 and p(x) = 2(x + 2)(x − 1)(x − 3).",
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
          text: "A quadratic with a known vertex can be written as a(x − h)² + k. A vertex at (2, 5) and a graph through (0, 1) give 1 = a(0 − 2)² + 5, so a = −1 and the model is −(x − 2)² + 5. Three points on a quadratic also determine it, by writing ax² + bx + c at each point and solving the resulting equations.",
        },
      ],
      takeaway:
        "Write the form that shows the given features, then use one more condition to find the constant.",
    },
    {
      id: "build-from-parent",
      title: "A parent function plus a transformation builds a model.",
      conceptTitle: "Building from a parent function",
      blocks: [
        {
          type: "paragraph",
          text: "A parent function is a basic function, such as x², x³, or 1/x, from which others are made by translations, dilations, and reflections. Start with the parent that has the right shape, then use asymptotes, vertices, or points to choose the transformation.",
        },
        {
          type: "paragraph",
          text: "Suppose a rational model has the vertical asymptote x = 1, the horizontal asymptote y = 2, and passes through (3, 3). Starting from 1/x, the form is g(x) = a/(x − 1) + 2. At x = 3 this gives a/2 + 2 = 3, so a = 2. The model is g(x) = 2/(x − 1) + 2.",
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
        "Use the asymptotes or vertex to set the shifts, then one point to set the scale factor.",
    },
    {
      id: "regression-technology",
      title: "Technology fits a chosen type of function to data.",
      conceptTitle: "Regression with technology",
      blocks: [
        {
          type: "paragraph",
          text: "Graphing calculators and software can perform regression: given data and a chosen type, such as quadratic or cubic, they find the constants that make that function closest to the data. The type is your decision, based on the pattern in the data and on the situation, as in Topic 1.13.",
        },
        {
          type: "table",
          caption: "Data that a quadratic fits exactly",
          columns: ["x", "0", "1", "2", "3", "4"],
          rows: [
            ["Data y", "5", "9", "15", "23", "33"],
            ["y = x² + 3x + 5", "5", "9", "15", "23", "33"],
          ],
        },
        {
          type: "paragraph",
          text: "A quadratic regression of these data returns y = x² + 3x + 5, because every point lies on that curve. For real data the model will not pass through every point. Check the result by graphing the data and the model together, and compare predictions with the data. A model that is close at the data points can still be a poor choice outside them.",
        },
      ],
      takeaway:
        "Choose the type yourself, let technology find the constants, and then judge the fit against the data and the context.",
    },
    {
      id: "rational-models",
      title: "Rational models describe costs and rates shared over a quantity.",
      conceptTitle: "Rational models",
      blocks: [
        {
          type: "paragraph",
          text: "A print shop charges a $120 setup fee plus $3 per poster. The average cost per poster for n posters is A(n) = (120 + 3n)/n, with n a positive whole number. This is a rational function. Its vertical asymptote at n = 0 is outside the domain of the situation, and its horizontal asymptote y = 3 describes the long-run cost.",
        },
        {
          type: "table",
          caption: "Cost per poster, A(n) = (120 + 3n)/n",
          columns: ["Posters n", "Cost per poster (dollars)"],
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
          text: "In context, the horizontal asymptote means that as the number of posters grows, the cost per poster gets close to $3 without ever being less than $3. The setup fee is spread over more posters, so its effect becomes small.",
        },
      ],
      takeaway:
        "In a rational model, the horizontal asymptote is a long-run value and the vertical asymptote often marks an input outside the situation.",
    },
    {
      id: "interpret-model",
      title: "Each feature of a model answers a question in context.",
      conceptTitle: "Interpreting a model",
      blocks: [
        {
          type: "paragraph",
          text: "A store models its revenue, in dollars, by R(p) = p(80 − 4p) when it sells an item at a price of p dollars. The zeros are p = 0 and p = 20. At p = 0 nothing is earned because the item is free. At p = 20 the factor 80 − 4p is 0, so no one buys and revenue is 0. A quadratic is symmetric, so the maximum occurs halfway between the zeros, at p = 10. There R(10) = 10·40 = 400, so the greatest revenue is $400 at a price of $10.",
        },
        {
          type: "callout",
          title: "Say what the number means",
          text: "A complete interpretation names the quantity, the units, and the situation: The store earns its greatest revenue, $400, when it charges $10. Restating only R(10) = 400 leaves the reader to guess what it means. Also keep the answer within the domain, 0 ≤ p ≤ 20, where the revenue is not negative.",
        },
      ],
      takeaway:
        "Write conclusions in a full sentence with units, and check them against the domain and the assumptions.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-14-regression",
      topicId: "precalculus-1-14",
      term: "Regression",
      definition:
        "A method, usually carried out with technology, that finds the constants of a chosen type of function so that it fits a data set as closely as possible.",
    },
    {
      id: "precalculus-1-14-parent-function",
      topicId: "precalculus-1-14",
      term: "Parent function",
      definition:
        "A basic function, such as x², x³, or 1/x, that other functions of its family are built from by transformations.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-14-c1",
      topicId: "precalculus-1-14",
      type: "Look back",
      title: "Choose first, then construct",
      body: "In Topic 1.13, you chose a type of model from the pattern in the data. The constants in the type are what this topic finds, using zeros, points, asymptotes, or technology.",
      transferQuestion:
        "Why does choosing the type of model come before finding its constants?",
      feedback:
        "The type determines which constants exist and which conditions can be used to find them.",
      links: [
        {
          topicId: "precalculus-1-13",
          sectionId: "choose-type",
          label: "Review choosing a type of model",
        },
      ],
    },
    {
      id: "precalculus-1-14-c2",
      topicId: "precalculus-1-14",
      type: "Look back",
      title: "Transformations set the constants",
      body: "In Topic 1.12, shifts and dilations moved the asymptotes, the vertex, and the points of a parent function. Here the same moves are chosen in reverse, to fit the model to given conditions.",
      transferQuestion:
        "Given a vertical asymptote at x = 1 and a horizontal asymptote at y = 2, what shifts are applied to 1/x?",
      feedback:
        "A shift right by 1 for the vertical asymptote and up by 2 for the horizontal asymptote.",
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
      "precalculus-1-7-rational-function",
      "precalculus-1-7-horizontal-asymptote",
      "precalculus-1-9-vertical-asymptote",
      "precalculus-1-13-mathematical-model",
      "precalculus-1-13-assumption",
      "precalculus-1-14-regression",
      "precalculus-1-14-parent-function",
    ],
  },
};

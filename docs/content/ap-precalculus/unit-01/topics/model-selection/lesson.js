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
    "Choosing a linear, quadratic, polynomial, or piecewise-defined model from a data set or context, and stating the assumptions and domain and range restrictions of a model.",
  minutes: 15,
  learningGoals: [
    "1.13.A Identify an appropriate function type to construct a function model for a given scenario.",
    "1.13.B Describe assumptions and restrictions related to building a function model.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A function model is chosen by matching how the quantities in a data set or context change to how a function type changes. Every model also carries assumptions about what stays consistent, and restrictions on its domain and range.",
  context:
    "You now know how linear, quadratic, and other polynomial functions change. This topic asks which type to choose and how to justify the choice, a part that appears in free-response Question 1 and Question 2 of the AP Exam.",
  sections: [
    {
      id: "choose-type",
      title:
        "1.13.A · The pattern of change in a data set or context points to a function type.",
      conceptTitle: "Choosing a function type",
      blocks: [
        {
          type: "table",
          caption: "Matching scenarios to function types",
          columns: ["The data set or context shows", "Function type"],
          rows: [
            ["Roughly constant rates of change", "Linear"],
            [
              "Roughly linear rates of change, or roughly symmetric data with a unique maximum or minimum",
              "Quadratic",
            ],
            ["A geometric context involving area or two dimensions", "Quadratic"],
            ["A geometric context involving volume or three dimensions", "Cubic"],
            [
              "Multiple real zeros, or multiple maxima or minima",
              "Polynomial of higher degree",
            ],
            [
              "Roughly constant nonzero nth differences over equal-length input-value intervals",
              "Polynomial of degree n",
            ],
            ["Different characteristics over different intervals", "Piecewise-defined"],
          ],
        },
        {
          type: "paragraph",
          text: "An open box made by cutting squares of side x from the corners of a sheet has volume x(30 − 2x)(20 − 2x), a cubic function of x, because volume involves three dimensions. The area of a rectangle with a fixed perimeter is a quadratic function of its width, because area involves two dimensions.",
        },
      ],
      takeaway:
        "Describe how the output values change, then choose the function type that changes the same way.",
    },
    {
      id: "differences-and-degree",
      title:
        "1.13.A · A polynomial of degree n models roughly constant nonzero nth differences.",
      conceptTitle: "Successive differences and degree",
      blocks: [
        {
          type: "paragraph",
          text: "A polynomial function of degree n models data sets or contextual scenarios that demonstrate roughly constant nonzero nth differences. Also, a polynomial function of degree n or less can be used to model a graph of n + 1 points with distinct input values, so 3 points can always be fit by a quadratic function or a line.",
        },
        {
          type: "table",
          caption: "Successive differences for data at x = 0, 1, 2, 3, 4, 5",
          columns: ["Row", "Values"],
          rows: [
            ["y", "0, −1, 4, 21, 56, 115"],
            ["1st differences", "−1, 5, 17, 35, 59"],
            ["2nd differences", "6, 12, 18, 24"],
            ["3rd differences", "6, 6, 6"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Because the 3rd differences in the output values are a constant 6 over consecutive equal-length input-value intervals, a cubic model is best. Refer to the values from the table in the reason.",
        },
      ],
      takeaway:
        "Name the constant difference, the level at which it appears, and the equal-length intervals.",
    },
    {
      id: "piecewise-models",
      title:
        "1.13.A · A piecewise-defined function models different behavior on different intervals.",
      conceptTitle: "Piecewise-defined models",
      blocks: [
        {
          type: "paragraph",
          text: "A piecewise-defined function consists of a set of functions defined over nonoverlapping domain intervals. It is useful for modeling a data set or contextual scenario that demonstrates different characteristics over different intervals.",
        },
        {
          type: "paragraph",
          text: "A parking garage charges $3 per hour for the first 2 hours and $1 per hour after that. The cost is modeled by C(t) = 3t for 0 ≤ t ≤ 2 and C(t) = 6 + (t − 2) for t > 2. Each piece is linear, but the rate of change is 3 dollars per hour on the first interval and 1 dollar per hour on the second.",
        },
      ],
      takeaway:
        "Use a piecewise-defined model when the rate or pattern changes at a known input value.",
    },
    {
      id: "assumptions-restrictions",
      title: "1.13.B · Models have assumptions and domain and range restrictions.",
      conceptTitle: "Assumptions and restrictions",
      blocks: [
        {
          type: "list",
          items: [
            "A model may assume something is consistent, such as a constant growth rate or a fixed price.",
            "A model may assume how the quantities change together, such as a constant rate of change for a linear model.",
            "A model may require domain restrictions based on mathematical clues, contextual clues, or extreme values in the data set.",
            "A model may require range restrictions, such as rounding to whole numbers, based on mathematical clues, contextual clues, or extreme values in the data set.",
          ],
        },
        {
          type: "paragraph",
          text: "A ball thrown from a height of 5 feet has height h(t) = −16t² + 48t + 5 feet after t seconds. The model assumes only gravity acts on the ball. Its domain is restricted to 0 ≤ t ≤ 3.101, from the throw until the ball lands, and its range to 0 ≤ h(t) ≤ 41, since the maximum height is h(1.5) = 41.",
        },
        {
          type: "table",
          caption: "Values of h(t)",
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
          type: "callout",
          title: "Write it like the AP Exam",
          text: "The model is appropriate until the ball lands, when h(t) = 0 at t = 3.101 seconds. The throw is at t = 0. Therefore, an appropriate domain for the model h is [0, 3.101] seconds.",
        },
      ],
      takeaway:
        "State the assumption, the domain, and the range in the language of the context.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-13-function-model",
      topicId: "precalculus-1-13",
      term: "Function model",
      definition:
        "A function chosen to describe how two quantities in a data set or contextual scenario are related.",
    },
    {
      id: "precalculus-1-13-piecewise-defined",
      topicId: "precalculus-1-13",
      term: "Piecewise-defined function",
      definition:
        "A function made of a set of functions defined over nonoverlapping domain intervals.",
    },
    {
      id: "precalculus-1-13-assumption",
      topicId: "precalculus-1-13",
      term: "Assumption",
      definition:
        "A condition a model takes to be true, such as what stays consistent or how the quantities change together.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-13-c1",
      topicId: "precalculus-1-13",
      type: "Look back",
      title: "Rates of change were the evidence",
      body: "Topic 1.3 showed that linear functions have constant average rates of change and quadratic functions have average rates of change that change at a constant rate. Successive differences apply that idea to a data table.",
      transferQuestion: "Why does a constant 2nd difference point to a quadratic model?",
      feedback:
        "The 1st differences, which are average rates of change over equal-length intervals, change at a constant rate.",
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
      title: "From choosing to constructing",
      body: "Topic 1.14 finds the constants of the chosen model from conditions, transformations, or regression, and then uses the model to answer questions.",
      transferQuestion:
        "Once you choose a quadratic model, what do you need to find its equation?",
      feedback: "Three conditions, such as three points, or a vertex and one more point.",
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
      "precalculus-1-3-quadratic-function",
      "precalculus-1-5-successive-differences",
      "precalculus-1-13-function-model",
      "precalculus-1-13-piecewise-defined",
      "precalculus-1-13-assumption",
    ],
  },
};

// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-15",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 15,
  code: "2.15",
  title: "Semi-log Plots",
  period: "Unit 2",
  status: "ready",
  summary:
    "Semi-log plots with a logarithmically scaled y-axis, why exponential data appear linear on them, and the linear model log_n y = (log_n b)x + log_n a that comes from y = abˣ.",
  minutes: 12,
  learningGoals: [
    "2.15.A Determine if an exponential model is appropriate by examining a semi-log plot of a data set.",
    "2.15.B Construct the linearization of exponential data.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Taking a logarithm of exponential outputs turns multiplication into addition, so exponential data line up along a straight line. A straight semi-log plot is evidence for an exponential model.",
  context:
    "Topic 2.6 judged models with residuals, and Topic 2.12 showed that logarithms turn products into sums. A semi-log plot combines the two ideas into a quick visual test for exponential data.",
  sections: [
    {
      id: "semi-log",
      title: "2.15.A · On a semi-log plot, exponential data appear linear.",
      conceptTitle: "Reading semi-log plots",
      blocks: [
        {
          type: "paragraph",
          text: "In a semi-log plot, one of the axes is logarithmically scaled with logarithm base n, where n > 1. When the y-axis of a semi-log plot is logarithmically scaled, data or functions that demonstrate exponential characteristics will appear linear.",
        },
        {
          type: "table",
          caption: "Data from y = 2(3)ˣ and the common logarithm of each output",
          columns: ["x", "0", "1", "2", "3", "4"],
          rows: [
            ["y", "2", "6", "18", "54", "162"],
            ["log y", "0.301", "0.778", "1.255", "1.732", "2.210"],
          ],
        },
        {
          type: "graph",
          caption:
            "Semi-log plot of the data: log y against x lies on a line with slope log 3 ≈ 0.477",
          alt: "Five points at x = 0 through 4 with heights 0.301, 0.778, 1.255, 1.732, and 2.210, lying exactly on a straight dashed line that rises about 0.477 for each unit of x.",
          window: {
            x: [-0.5, 4.5],
            y: [0, 2.5],
          },
          ticks: {
            x: 1,
            y: 0.5,
          },
          axisLabels: {
            x: "x",
            y: "log y",
          },
          functions: [
            {
              expr: "0.30103 + 0.47712x",
              dashed: true,
              color: 2,
            },
          ],
          points: [
            {
              at: [0, 0.301],
            },
            {
              at: [1, 0.778],
            },
            {
              at: [2, 1.255],
            },
            {
              at: [3, 1.732],
            },
            {
              at: [4, 2.21],
            },
          ],
        },
        {
          type: "paragraph",
          text: "If for large input values of a bivariate data set the logarithms of the output values trend linear, then transformations of an exponential function can be used to model the data set. Therefore, an advantage of semi-log plots is that the dependent variable values do not need to be transformed by a constant to reveal that transformations of an exponential function would produce an appropriate model.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "An exponential model is appropriate because the semi-log plot of the data, with log y on the vertical axis, appears linear.",
        },
      ],
      takeaway: "Linear on a semi-log plot (log of y against x) means exponential.",
    },
    {
      id: "linearization",
      title: "2.15.B · y = abˣ becomes the line log_n y = (log_n b)x + log_n a.",
      conceptTitle: "Linearizing exponential data",
      blocks: [
        {
          type: "paragraph",
          text: "Techniques used to model linear functions can be applied to a semi-log graph.",
        },
        {
          type: "paragraph",
          text: "For an exponential model of the form y = abˣ, the corresponding linear model for the semi-log plot is y = (log_n b)x + log_n a, where n > 0 and n ≠ 1. Specifically, the linear rate of change is log_n b, and the initial linear value is log_n a.",
        },
        {
          type: "paragraph",
          text: "Here the vertical coordinate of the semi-log plot is log_n of the original output. For y = 2(3)ˣ with n = 10, the line has slope log 3 ≈ 0.477 and vertical intercept log 2 ≈ 0.301.",
        },
        {
          type: "paragraph",
          text: "The process also runs backward. If a semi-log plot with base 10 has the line log y = 0.5x + 1, then log b = 0.5 and log a = 1, so b = 10^0.5 ≈ 3.162 and a = 10, and y ≈ 10(3.162)ˣ.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Taking log of both sides of y = abˣ gives log y = log a + x log b, which is linear in x with slope log b and intercept log a.",
        },
      ],
      takeaway:
        "Slope = log_n b, intercept = log_n a. Undo with n^(slope) and n^(intercept).",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-15-semi-log-plot",
      topicId: "precalculus-2-15",
      term: "Semi-log plot",
      definition:
        "In a semi-log plot, one of the axes is logarithmically scaled with logarithm base n, where n > 1. When the y-axis of a semi-log plot is logarithmically scaled, data or functions that demonstrate exponential characteristics will appear linear.",
      source: "CED 2.15.A.1",
    },
  ],
  connections: [
    {
      id: "precalculus-2-15-c1",
      topicId: "precalculus-2-15",
      type: "Look back",
      title: "Product and power properties",
      body: "Topic 2.12's product and power properties are exactly what turn log (abˣ) into log a + x log b, the equation of a line.",
      transferQuestion: "Write ln (5eˣ) as a linear expression in x.",
      feedback: "ln 5 + x, a line with slope 1 and intercept ln 5.",
      links: [
        {
          topicId: "precalculus-2-12",
          sectionId: "power-property",
          label: "Review the power property for logarithms",
        },
      ],
    },
    {
      id: "precalculus-2-15-c2",
      topicId: "precalculus-2-15",
      type: "Looking ahead",
      title: "Periodic models",
      body: "Unit 3 turns to data that repeat instead of growing, which no exponential or logarithmic model can fit and which call for sinusoidal functions.",
      transferQuestion:
        "Would a semi-log plot of hourly temperatures over three days look linear?",
      feedback:
        "No. Temperatures that rise and fall each day are periodic, not exponential.",
      links: [
        {
          topicId: "precalculus-2-6",
          sectionId: "competing-models",
          label: "Review competing models",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-15"],
  definitionCoverage: {
    status: "required",
    conceptIds: ["precalculus-2-15-semi-log-plot"],
  },
};

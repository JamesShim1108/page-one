// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-6",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 6,
  code: "2.6",
  title: "Competing Function Model Validation",
  period: "Unit 2",
  status: "ready",
  summary:
    "Comparing linear, quadratic, and exponential models for the same data, residuals and residual plots, judging whether a model is appropriate, and how errors show where a model underestimates or overestimates.",
  minutes: 13,
  learningGoals: [
    "2.6.A Construct linear, quadratic, and exponential models based on a data set.",
    "2.6.B Validate a model constructed from a data set.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Several models can fit the same data reasonably well. Residuals, the leftover differences between the data and a model, show which model captures the pattern: an appropriate model leaves residuals with no pattern.",
  context:
    "Topics 1.14 and 2.5 built models with regressions. This topic decides between competing models, which is a reasoning skill the AP Exam asks you to justify with residuals or context.",
  sections: [
    {
      id: "competing-models",
      title: "2.6.A · Several function types can model the same data.",
      conceptTitle: "Competing models",
      blocks: [
        {
          type: "paragraph",
          text: "Two variables in a data set that demonstrate a slightly changing rate of change can be modeled by linear, quadratic, and exponential function models.",
        },
        {
          type: "paragraph",
          text: "Models can be compared based on contextual clues and applicability to determine which model is most appropriate.",
        },
        {
          type: "table",
          caption: "A data set with a slightly changing rate of change",
          columns: ["x", "0", "1", "2", "3", "4", "5"],
          rows: [["y", "2.1", "2.7", "4.0", "5.4", "7.8", "10.6"]],
        },
        {
          type: "paragraph",
          text: "Linear regression gives y ≈ 1.205 + 1.691x, and exponential regression gives y ≈ 2.034(1.392)ˣ. Both follow the general upward trend, so the graphs alone do not settle which model is more appropriate.",
        },
        {
          type: "paragraph",
          text: "Contextual clues matter too. If y is the number of users of an app that spreads by sharing, growth that compounds suggests an exponential model. If y can never exceed a fixed limit, a model that increases without bound is not appropriate far from the data.",
        },
      ],
      takeaway:
        "More than one model can fit; context and residuals decide which is most appropriate.",
    },
    {
      id: "residuals",
      title:
        "2.6.B · A model is appropriate if its residual plot appears without pattern.",
      conceptTitle: "Residuals and residual plots",
      blocks: [
        {
          type: "paragraph",
          text: "For a given value of an independent variable, a residual of a regression is the actual value of the dependent variable minus the value predicted by the function regression model.",
        },
        {
          type: "paragraph",
          text: "A residual plot is a graphical representation of the residuals of a regression, with the residuals on the vertical axis and the independent variable on the horizontal axis. A model is justified as appropriate for a data set if the residual plot appears without pattern.",
        },
        {
          type: "graph",
          caption: "Residual plot for the linear model: a curved pattern",
          alt: "Six residual points. They start positive at x = 0, dip below zero for x = 1 through 4, and rise to positive again at x = 5, forming a U-shaped pattern.",
          window: {
            x: [-0.5, 5.5],
            y: [-1.2, 1.2],
          },
          ticks: {
            x: 1,
            y: 0.4,
          },
          axisLabels: {
            x: "x",
            y: "residual",
          },
          height: 220,
          points: [
            {
              at: [0, 0.895],
            },
            {
              at: [1, -0.196],
            },
            {
              at: [2, -0.588],
            },
            {
              at: [3, -0.879],
            },
            {
              at: [4, -0.17],
            },
            {
              at: [5, 0.938],
            },
          ],
        },
        {
          type: "graph",
          caption: "Residual plot for the exponential model: no pattern",
          alt: "Six residual points scattered close to zero, alternating above and below the x-axis with no curve or trend, all between −0.2 and 0.2.",
          window: {
            x: [-0.5, 5.5],
            y: [-1.2, 1.2],
          },
          ticks: {
            x: 1,
            y: 0.4,
          },
          axisLabels: {
            x: "x",
            y: "residual",
          },
          height: 220,
          points: [
            {
              at: [0, 0.066],
            },
            {
              at: [1, -0.132],
            },
            {
              at: [2, 0.058],
            },
            {
              at: [3, -0.088],
            },
            {
              at: [4, 0.161],
            },
            {
              at: [5, -0.034],
            },
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "The exponential model is more appropriate because its residual plot appears without pattern, while the residuals of the linear model are positive, then negative, then positive.",
        },
      ],
      takeaway:
        "Residual = actual − predicted. Pattern means the model misses something; no pattern means appropriate.",
    },
    {
      id: "errors",
      title: "2.6.B · Errors show where a model underestimates or overestimates.",
      conceptTitle: "Errors and over- and underestimates",
      blocks: [
        {
          type: "paragraph",
          text: "For given values of an independent variable, the errors in a model can relate to the signed differences in the values of the dependent variable predicted by the function regression model and the actual values OR the unsigned absolute values of the residuals. Errors may reveal that the model underestimates or overestimates actual values on a given input-value interval. The data set and context can provide clues as to whether underestimates or overestimates are preferred on a given input-value interval.",
        },
        {
          type: "paragraph",
          text: "A positive residual means the actual value is greater than the predicted value, so the model underestimates there. A negative residual means the model overestimates. In the linear model above, the residuals are negative for 1 ≤ x ≤ 4, so the linear model overestimates on that interval.",
        },
        {
          type: "paragraph",
          text: "Context decides which kind of error is worse. A model for how much medicine remains in the body might prefer to overestimate on an interval, so a second dose is not given too early, while a model for how many seats a venue holds might prefer to underestimate.",
        },
      ],
      takeaway:
        "Positive residual: model underestimates. Negative residual: model overestimates.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-6-residual",
      topicId: "precalculus-2-6",
      term: "Residual",
      definition:
        "For a given value of an independent variable, a residual of a regression is the actual value of the dependent variable minus the value predicted by the function regression model.",
      source: "CED 2.6.B.1",
    },
    {
      id: "precalculus-2-6-residual-plot",
      topicId: "precalculus-2-6",
      term: "Residual plot",
      definition:
        "A residual plot is a graphical representation of the residuals of a regression, with the residuals on the vertical axis and the independent variable on the horizontal axis.",
      source: "CED 2.6.B.1",
    },
    {
      id: "precalculus-2-6-appropriate",
      topicId: "precalculus-2-6",
      term: "Appropriate",
      definition:
        "A model is justified as appropriate for a data set if the residual plot appears without pattern.",
      source: "CED 2.6.B.1",
    },
    {
      id: "precalculus-2-6-errors",
      topicId: "precalculus-2-6",
      term: "Errors",
      definition:
        "For given values of an independent variable, the errors in a model can relate to the signed differences in the values of the dependent variable predicted by the function regression model and the actual values OR the unsigned absolute values of the residuals.",
      source: "CED 2.6.B.2",
    },
  ],
  connections: [
    {
      id: "precalculus-2-6-c1",
      topicId: "precalculus-2-6",
      type: "Look back",
      title: "Regression",
      body: "Topic 1.14 constructed models with technology and regressions. Topic 2.5 added exponential regression. Residuals are how you check whether a regression model is appropriate.",
      transferQuestion:
        "A model predicts 14.2 and the actual value is 13.5. What is the residual?",
      feedback: "13.5 − 14.2 = −0.7. The model overestimates at that input value.",
      links: [
        {
          topicId: "precalculus-2-5",
          sectionId: "building-models",
          label: "Review exponential models",
        },
      ],
    },
    {
      id: "precalculus-2-6-c2",
      topicId: "precalculus-2-6",
      type: "Looking ahead",
      title: "Logarithmic models",
      body: "Topic 2.14 adds logarithmic regression as another competing model, and residuals are again the way to compare them.",
      transferQuestion:
        "If an exponential model's residual plot shows a clear curve, what does that suggest?",
      feedback: "That another function type may be more appropriate for the data.",
      links: [
        {
          topicId: "precalculus-2-14",
          sectionId: "log-models",
          label: "See logarithmic models",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-6"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-2-6-residual",
      "precalculus-2-6-residual-plot",
      "precalculus-2-6-appropriate",
      "precalculus-2-6-errors",
    ],
  },
};

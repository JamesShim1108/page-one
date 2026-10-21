// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-7",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 7,
  code: "3.7",
  title: "Sinusoidal Function Context and Data Modeling",
  period: "Unit 3",
  status: "ready",
  summary:
    "Building sinusoidal models of periodic phenomena: the period from consecutive maximums or minimums, the amplitude and midline from the extreme values, the phase shift from one data point, sinusoidal regression, and where a model can be trusted.",
  minutes: 13,
  learningGoals: ["3.7.A Construct sinusoidal function models of periodic phenomena."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A sinusoidal model needs four numbers, and data supply each one: the time between peaks gives the period, the peak and trough give the amplitude and midline, and one known point fixes the phase shift.",
  context:
    "Topic 3.6 read features from an equation. Here the direction reverses: start from a context or a table, estimate the features, and write the equation, by hand or with a regression.",
  sections: [
    {
      id: "period-and-amplitude-from-data",
      title:
        "3.7.A · Period from consecutive extremes; amplitude and midline from the extreme values.",
      conceptTitle: "Period, amplitude, and vertical shift from data",
      blocks: [
        {
          type: "paragraph",
          text: "The smallest interval of input values over which the maximum or minimum output values start to repeat, that is, the input-value interval between consecutive maxima or consecutive minima, can be used to determine or estimate the period and frequency for a sinusoidal function model.",
        },
        {
          type: "paragraph",
          text: "The maximum and minimum output values can be used to determine or estimate the amplitude and vertical shift for a sinusoidal function model.",
        },
        {
          type: "paragraph",
          text: "Example: at a harbor, high tide is 9.2 feet at 3:00 a.m. and the next low tide is 1.4 feet at 9:15 a.m. From a maximum to the next minimum is half a cycle, 6.25 hours, so the period is 12.5 hours and the frequency is 1/12.5 = 0.08 cycle per hour. The amplitude is (9.2 − 1.4)/2 = 3.9 feet and the midline is D = (9.2 + 1.4)/2 = 5.3 feet.",
        },
        {
          type: "table",
          caption: "From the tide data to the parameters of D(t) = a cos(b(t + c)) + d",
          columns: ["Feature", "From the data", "Parameter"],
          rows: [
            ["Period", "2(9.25 − 3) = 12.5 hours", "|b| = 2π/12.5 = 0.16π"],
            ["Amplitude", "(9.2 − 1.4)/2 = 3.9", "|a| = 3.9"],
            ["Midline", "(9.2 + 1.4)/2 = 5.3", "d = 5.3"],
          ],
        },
      ],
      takeaway: "Peak to peak is a period; peak to trough is half a period.",
    },
    {
      id: "phase-shift-and-regression",
      title:
        "3.7.A · One data point fixes the phase shift; technology can do the fitting.",
      conceptTitle: "Phase shift, regression, and the contextual domain",
      blocks: [
        {
          type: "paragraph",
          text: "An actual pair of input-output values can be compared to pairs of input-output values produced by a sinusoidal function model to determine or estimate a phase shift for the model.",
        },
        {
          type: "paragraph",
          text: "For the tide, t is hours after midnight. Cosine reaches its maximum when its input is 0, and the real maximum is at t = 3, so the model needs b(t + c) = 0 at t = 3, which means c = −3. The model is D(t) = 3.9 cos(0.16π(t − 3)) + 5.3. Check: D(3) = 3.9 + 5.3 = 9.2 and D(9.25) = −3.9 + 5.3 = 1.4.",
        },
        {
          type: "graph",
          caption: "The tide model D(t) = 3.9 cos(0.16π(t − 3)) + 5.3 for the first day",
          alt: "A wave with maximums of 9.2 at t = 3 and t = 15.5 and a minimum of 1.4 at t = 9.25, with a dashed midline at 5.3.",
          window: {
            x: [0, 24],
            y: [0, 10.5],
          },
          ticks: {
            x: 3,
            y: 1,
          },
          axisLabels: {
            x: "t",
            y: "D(t)",
          },
          functions: [
            {
              expr: "3.9cos(0.16pi(x - 3)) + 5.3",
              label: "D",
              labelAt: 20,
            },
          ],
          asymptotes: [
            {
              y: 5.3,
            },
          ],
          points: [
            {
              at: [3, 9.2],
              label: "(3, 9.2)",
              position: "ne",
            },
            {
              at: [9.25, 1.4],
              label: "(9.25, 1.4)",
              position: "se",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Sinusoidal function models can be constructed for a data set with technology by estimating key values or using sinusoidal regressions. The calculator on this site fits y = a sin(b(x + c)) + d to a list of points; check its period and midline against the data before using it.",
        },
        {
          type: "paragraph",
          text: "Sinusoidal functions that model a data set are frequently only useful over their contextual domain, can be used to predict values of the dependent variable from values of the independent variable, and may be used to determine values of the independent variable from values of the dependent variable.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Based on the model, the depth is predicted to be D(6) ≈ 5.54 feet at 6:00 a.m. Because the model was built from one day of tides, it is less reliable for predictions weeks later, when the times of high and low tide drift.",
        },
      ],
      takeaway:
        "Match one real point to fix c; trust the model mainly inside the data's domain.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-7-sinusoidal-regression",
      topicId: "precalculus-3-7",
      term: "Sinusoidal regression",
      definition:
        "Sinusoidal function models can be constructed for a data set with technology by estimating key values or using sinusoidal regressions.",
      source: "CED 3.7.A.4",
    },
  ],
  connections: [
    {
      id: "precalculus-3-7-c1",
      topicId: "precalculus-3-7",
      type: "Look back",
      title: "Choosing and checking models",
      body: "Topic 2.6 compared models using residuals. A sinusoidal regression is checked the same way: residuals that look random support the model.",
      transferQuestion:
        "A sinusoidal model's residuals are all positive in the afternoon and all negative at night. What does that suggest?",
      feedback:
        "The model is systematically off at those times, so it can be improved, possibly by adjusting the phase shift.",
      links: [
        {
          topicId: "precalculus-2-6",
          sectionId: "residuals",
          label: "Review residuals",
        },
      ],
    },
    {
      id: "precalculus-3-7-c2",
      topicId: "precalculus-3-7",
      type: "Looking ahead",
      title: "Solving with a model",
      body: "Finding when the tide reaches a given depth means solving D(t) = k, a trigonometric equation. Topic 3.10 solves these with inverse trigonometric functions.",
      transferQuestion:
        "Write the equation you would solve to find when the depth is 7 feet.",
      feedback: "3.9 cos(0.16π(t − 3)) + 5.3 = 7.",
      links: [
        {
          topicId: "precalculus-3-10",
          sectionId: "solving-equations",
          label: "See trigonometric equations",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-7"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-1-period",
      "precalculus-3-5-sinusoidal-function",
      "precalculus-3-5-frequency",
      "precalculus-3-5-amplitude",
      "precalculus-3-5-midline",
      "precalculus-3-6-phase-shift",
      "precalculus-3-7-sinusoidal-regression",
    ],
  },
};

// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-15",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 15,
  code: "3.15",
  title: "Rates of Change in Polar Functions",
  period: "Unit 3",
  status: "ready",
  summary:
    "When the graph of a polar function moves toward or away from the origin, relative extrema as points closest to or farthest from the origin, and the average rate of change of r with respect to θ.",
  minutes: 12,
  learningGoals: ["3.15.A Describe characteristics of the graph of a polar function."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "The distance from the origin is |r|, so whether a polar curve moves away from the origin depends on both the sign of r and whether r is increasing or decreasing. The average rate of change of r measures how fast the signed radius changes per radian.",
  context:
    "Topic 3.14 drew polar graphs. This topic describes how they change, in the same language Unit 1 used for functions: increasing, decreasing, extrema, and average rates of change.",
  sections: [
    {
      id: "increasing-and-decreasing-distance",
      title: "3.15.A · The sign of r and its direction of change decide the distance.",
      conceptTitle: "Distance from the origin and relative extrema",
      blocks: [
        {
          type: "paragraph",
          text: "If a polar function, r = f(θ), is positive and increasing or negative and decreasing, then the distance between the point with polar coordinates (f(θ), θ) and the origin is increasing.",
        },
        {
          type: "paragraph",
          text: "If a polar function, r = f(θ), is positive and decreasing or negative and increasing, then the distance between the point with polar coordinates (f(θ), θ) and the origin is decreasing.",
        },
        {
          type: "table",
          caption: "Is the point moving away from the origin?",
          columns: ["r = f(θ) is", "Increasing", "Decreasing"],
          rows: [
            ["Positive", "Distance increasing", "Distance decreasing"],
            ["Negative", "Distance decreasing", "Distance increasing"],
          ],
        },
        {
          type: "graph",
          caption: "r = 1 + 2 cos θ graphed with θ on the horizontal axis",
          alt: "A cosine-shaped curve from r = 3 at θ = 0, decreasing through r = 0 at θ = 2π/3 to r = −1 at θ = π, then increasing back through 0 at 4π/3 to 3 at 2π.",
          window: {
            x: [-0.3, 6.583185307179586],
            y: [-1.5, 3.5],
          },
          ticks: {
            x: [
              {
                at: 0,
                label: "0",
              },
              {
                at: 1.0471975511965976,
                label: "π/3",
              },
              {
                at: 2.0943951023931953,
                label: "2π/3",
              },
              {
                at: 3.141592653589793,
                label: "π",
              },
              {
                at: 4.1887902047863905,
                label: "4π/3",
              },
              {
                at: 5.235987755982989,
                label: "5π/3",
              },
              {
                at: 6.283185307179586,
                label: "2π",
              },
            ],
            y: 1,
          },
          axisLabels: {
            x: "θ",
            y: "r",
          },
          functions: [
            {
              expr: "1 + 2cos(x)",
              label: "r = f(θ)",
              labelAt: 5.6,
              labelPosition: "nw",
            },
          ],
          points: [
            {
              at: [2.0943951023931953, 0],
              label: "(2π/3, 0)",
              position: "ne",
            },
            {
              at: [3.141592653589793, -1],
              label: "(π, −1)",
              position: "s",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Example: for r = 1 + 2 cos θ on 0 < θ < π, r is decreasing. On 0 < θ < 2π/3, r is positive, so the distance from the origin is decreasing. On 2π/3 < θ < π, r is negative, so the distance is increasing: the curve is tracing its inner loop outward.",
        },
        {
          type: "paragraph",
          text: "For a polar function, r = f(θ), if the function changes from increasing to decreasing or decreasing to increasing on an interval, then the function has a relative extremum on the interval corresponding to a point relatively closest to or farthest from the origin.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "On 2π/3 < θ < π, the distance between the point (f(θ), θ) and the origin is increasing because f is negative and decreasing on that interval.",
        },
      ],
      takeaway: "Same sign of r and its change: moving away. Opposite: moving closer.",
    },
    {
      id: "polar-rates-of-change",
      title: "3.15.A · Average rate of change of r with respect to θ.",
      conceptTitle: "Average rates of change in polar functions",
      blocks: [
        {
          type: "paragraph",
          text: "The average rate of change of r with respect to θ over an interval of θ is the ratio of the change in the signed radius values to the change in θ over an interval of θ. Graphically, the average rate of change indicates the rate at which the signed radius is changing per radian.",
        },
        {
          type: "paragraph",
          text: "The average rate of change of r with respect to θ over an interval of θ can be used to estimate values of the function within the interval.",
        },
        {
          type: "paragraph",
          text: "Example: for r = 1 + 2 cos θ on 0 ≤ θ ≤ π/2, the average rate of change is (f(π/2) − f(0))/(π/2 − 0) = (1 − 3)/(π/2) = −4/π ≈ −1.273. On average, the signed radius decreases by about 1.273 units per radian on this interval.",
        },
        {
          type: "paragraph",
          text: "Estimating with it: f(π/4) ≈ f(0) + (−4/π)(π/4) = 3 − 1 = 2. The actual value is 1 + 2 cos(π/4) = 1 + √2 ≈ 2.414, so the estimate is reasonable but not exact, because r does not change at a constant rate.",
        },
        {
          type: "callout",
          title: "Units",
          text: "The average rate of change of r with respect to θ is in units of radius per radian, the same kind of ratio as the average rates of change in Topic 1.2.",
        },
      ],
      takeaway:
        "Δr/Δθ: change in signed radius per radian, useful for estimates inside the interval.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-15-average-rate-of-change-of-r",
      topicId: "precalculus-3-15",
      term: "Average rate of change of r with respect to θ",
      definition:
        "The average rate of change of r with respect to θ over an interval of θ is the ratio of the change in the signed radius values to the change in θ over an interval of θ. Graphically, the average rate of change indicates the rate at which the signed radius is changing per radian.",
      source: "CED 3.15.A.4",
    },
  ],
  connections: [
    {
      id: "precalculus-3-15-c1",
      topicId: "precalculus-3-15",
      type: "Look back",
      title: "Average rate of change",
      body: "Topic 1.2 defined the average rate of change of a function over an interval as the change in output over the change in input. For a polar function the output is the signed radius and the input is an angle.",
      transferQuestion: "Find the average rate of change of r = 2θ on 1 ≤ θ ≤ 3.",
      feedback: "(6 − 2)/(3 − 1) = 2 units of radius per radian.",
      links: [
        {
          topicId: "precalculus-1-2",
          sectionId: "average-rate",
          label: "Review average rate of change",
        },
      ],
    },
    {
      id: "precalculus-3-15-c2",
      topicId: "precalculus-3-15",
      type: "Looking ahead",
      title: "The AP Exam",
      body: "This topic finishes Unit 3. Polar functions appear in multiple-choice questions, and the periodic modeling free-response question uses the sinusoidal ideas from Topics 3.5 to 3.7.",
      transferQuestion:
        "Which Unit 3 topic would you review to find the amplitude and midline from a graph?",
      feedback: "Topic 3.5, and Topic 3.7 for building a model from data.",
      links: [
        {
          topicId: "precalculus-3-7",
          sectionId: "period-and-amplitude-from-data",
          label: "Review data modeling",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-15"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-13-polar-coordinates",
      "precalculus-3-14-polar-function",
      "precalculus-3-15-average-rate-of-change-of-r",
    ],
  },
};

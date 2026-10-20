// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-2",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 2,
  code: "1.2",
  title: "Rates of Change",
  period: "Unit 1",
  status: "ready",
  summary:
    "Average rates of change over intervals, rates of change at a point, and what the sign of a rate of change says about how two quantities vary together.",
  minutes: 12,
  learningGoals: [
    "1.2.A Compare the rates of change at two points using average rates of change near the points.",
    "1.2.B Describe how two quantities vary together at different points and over different intervals of a function.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Rates of change quantify how two quantities vary together. An average rate of change describes an interval, and average rates of change over smaller and smaller intervals approximate the rate of change at a point.",
  context:
    "Topic 1.1 described whether output values increase or decrease. This topic measures how fast they do. Average rate of change, with units and an interpretation, appears in nearly every modeling free-response question on the AP Exam.",
  sections: [
    {
      id: "average-rate",
      title: "1.2.A · The average rate of change is a ratio of changes over an interval.",
      conceptTitle: "Average rate of change",
      blocks: [
        {
          type: "paragraph",
          text: "The average rate of change of a function f over the interval a ≤ x ≤ b is (f(b) − f(a))/(b − a), the ratio of the change in the output values to the change in the input values. It is the constant rate of change that would give the same change in output values as f gives over that interval. Its units are output units per input unit.",
        },
        {
          type: "table",
          caption:
            "Position s(t), in meters, of a cyclist at time t, in seconds, where s(t) = t² + 5t",
          columns: ["t", "s(t)"],
          rows: [
            ["0", "0"],
            ["2", "14"],
            ["5", "50"],
            ["9", "126"],
          ],
        },
        {
          type: "paragraph",
          text: "Over 2 ≤ t ≤ 5 the average rate of change is (s(5) − s(2))/(5 − 2) = (50 − 14)/3 = 12 meters per second. Over 5 ≤ t ≤ 9 it is (126 − 50)/4 = 19 meters per second. The answers differ, so an average rate of change always belongs to a stated interval.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Show the computation, then interpret it with the interval, the direction, and units: (s(5) − s(2))/(5 − 2) = 12. From t = 2 to t = 5 seconds, on average, the position of the cyclist increased at a rate of 12 meters per second.",
        },
        {
          type: "graph",
          caption:
            "The average rate of change of s over [2, 5] is the slope of the dashed secant line",
          alt: "The curve s(t) = t² + 5t with a dashed line through the points (2, 14) and (5, 50) on the curve.",
          window: {
            x: [0, 6],
            y: [0, 70],
          },
          ticks: {
            x: 1,
            y: 10,
          },
          axisLabels: {
            x: "t",
            y: "s(t)",
          },
          functions: [
            {
              expr: "t^2 + 5t",
              variable: "t",
              domain: [0, 6],
              label: "s",
              labelAt: 5.6,
              labelPosition: "w",
            },
          ],
          segments: [
            {
              from: [2, 14],
              to: [5, 50],
              dashed: true,
              color: 2,
            },
          ],
          points: [
            {
              at: [2, 14],
              label: "(2, 14)",
              position: "se",
            },
            {
              at: [5, 50],
              label: "(5, 50)",
              position: "nw",
            },
          ],
        },
      ],
      takeaway:
        "Average rate of change = (change in output values)/(change in input values), stated for an interval and with units.",
    },
    {
      id: "rate-at-a-point",
      title:
        "1.2.A · Average rates of change over small intervals approximate the rate of change at a point.",
      conceptTitle: "Rate of change at a point",
      blocks: [
        {
          type: "paragraph",
          text: "The rate of change of a function at a point measures how fast the output values would change if the input values changed at that point. It can be approximated by the average rates of change of the function over small intervals containing the point, if such values exist.",
        },
        {
          type: "table",
          caption:
            "Average rates of change of s over shrinking intervals that start at t = 3",
          columns: ["Interval", "Average rate of change (meters per second)"],
          rows: [
            ["3 ≤ t ≤ 4", "12"],
            ["3 ≤ t ≤ 3.5", "11.5"],
            ["3 ≤ t ≤ 3.1", "11.1"],
            ["3 ≤ t ≤ 3.01", "11.01"],
          ],
        },
        {
          type: "paragraph",
          text: "As the interval shrinks, the average rates of change approach 11, so the rate of change of s at t = 3 is about 11 meters per second. An interval centered at the point, such as 2.9 ≤ t ≤ 3.1, gives (s(3.1) − s(2.9))/0.2 = 11 as well.",
        },
      ],
      takeaway:
        "To estimate the rate of change at a point, use the average rate of change over a small interval containing the point.",
    },
    {
      id: "comparing-rates",
      title:
        "1.2.A · Compare rates of change at two points with small intervals near each point.",
      conceptTitle: "Comparing rates of change",
      blocks: [
        {
          type: "paragraph",
          text: "The rates of change at two points can be compared using average rates of change over sufficiently small intervals containing each point. Near t = 3 the rate of change of s is about 11 meters per second. Over 7.9 ≤ t ≤ 8.1 the average rate of change is (106.11 − 101.91)/0.2 = 21 meters per second. So the position is changing faster at t = 8 than at t = 3.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Because the average rate of change of s over 7.9 ≤ t ≤ 8.1 is greater than the average rate of change over 2.9 ≤ t ≤ 3.1, the rate of change of s at t = 8 is greater than the rate of change of s at t = 3.",
        },
      ],
      takeaway:
        "Use intervals of the same small length near each point, then compare the two average rates of change.",
    },
    {
      id: "sign-and-meaning",
      title:
        "1.2.B · The sign of a rate of change describes how two quantities vary together.",
      conceptTitle: "Sign and meaning of a rate of change",
      blocks: [
        {
          type: "list",
          items: [
            "A positive rate of change means that as one quantity increases or decreases, the other quantity does the same.",
            "A negative rate of change means that as one quantity increases, the other decreases.",
            "The size of a rate of change tells how much the output values change per unit change in the input values.",
          ],
        },
        {
          type: "paragraph",
          text: "A rate of change can be positive at some points and negative at others, and an average rate of change over a long interval can hide those changes. An average rate of change of −0.5 degrees Celsius per minute for cooling coffee means that, on average, the temperature decreased by 0.5 degrees Celsius per minute over that interval. It does not mean the temperature fell at that rate every minute.",
        },
      ],
      takeaway:
        "Interpret a rate of change with its sign, its size, its units, and its interval or point.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-2-average-rate",
      topicId: "precalculus-1-2",
      term: "Average rate of change",
      definition:
        "For a function f over a ≤ x ≤ b, the ratio (f(b) − f(a))/(b − a) of the change in output values to the change in input values.",
    },
    {
      id: "precalculus-1-2-rate-of-change",
      topicId: "precalculus-1-2",
      term: "Rate of change",
      definition:
        "A measure of how fast the output values of a function change as the input values change, over an interval or at a point.",
    },
    {
      id: "precalculus-1-2-interval",
      topicId: "precalculus-1-2",
      term: "Interval",
      definition: "The set of all real numbers between two endpoints.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-2-c1",
      topicId: "precalculus-1-2",
      type: "Look back",
      title: "Rates make concavity measurable",
      body: "Topic 1.1 defined concave up as a rate of change that is increasing. Average rates of change over equal-length intervals let you check that numerically.",
      transferQuestion:
        "Output values are 4, 9, 17 at equally spaced input values. Is the graph concave up or concave down on that interval?",
      feedback:
        "The changes are 5 and 8, so the average rates of change are increasing and the graph is concave up there.",
      links: [
        {
          topicId: "precalculus-1-1",
          sectionId: "concavity",
          label: "Review concavity",
        },
      ],
    },
    {
      id: "precalculus-1-2-c2",
      topicId: "precalculus-1-2",
      type: "Looking ahead",
      title: "Average rates of change become secant slopes",
      body: "Topic 1.3 shows that the average rate of change over an interval is the slope of a secant line, and it separates linear functions, with a constant rate of change, from quadratic functions, whose average rates of change change at a constant rate.",
      transferQuestion:
        "Why must a linear function have the same average rate of change over every interval?",
      feedback: "The graph is a line, and any two points on a line give the same slope.",
      links: [
        {
          topicId: "precalculus-1-3",
          sectionId: "secant-lines",
          label: "See secant lines",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-2"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-2-average-rate",
      "precalculus-1-2-rate-of-change",
      "precalculus-1-2-interval",
    ],
  },
};

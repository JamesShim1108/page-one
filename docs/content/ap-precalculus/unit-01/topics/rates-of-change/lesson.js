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
    "Average rates of change over intervals, estimating the rate at a point, and what the sign of a rate tells you.",
  minutes: 11,
  learningGoals: [
    "Calculate an average rate of change over an interval and state it with units.",
    "Estimate the rate of change at a point using average rates over small intervals around it.",
    "Compare rates at two points and interpret the sign of a rate in context.",
  ],
  bigIdea:
    "An average rate of change summarizes how fast an output changes over an interval. Shrinking the interval around a point gives an estimate of how fast the output is changing at that point.",
  context:
    "Topic 1.1 described whether outputs rise or fall and whether the rise speeds up or slows down. This topic puts numbers on those ideas. Rates of change are the central tool of the whole course, and they are what makes calculus possible later on.",
  sections: [
    {
      id: "average-rate",
      title: "The average rate of change compares output change to input change.",
      conceptTitle: "Average rate of change",
      blocks: [
        {
          type: "paragraph",
          text: "Over the interval from x = a to x = b, the average rate of change of f is (f(b) − f(a))/(b − a). It is the single constant rate that would produce the same overall change in output across the same change in input. Its units are output units per input unit, such as meters per second.",
        },
        {
          type: "table",
          caption: "Position of a cyclist, s(t) = t² + 5t",
          columns: ["Time t (seconds)", "Position s(t) (meters)"],
          rows: [
            ["0", "0"],
            ["2", "14"],
            ["5", "50"],
            ["9", "126"],
          ],
        },
        {
          type: "paragraph",
          text: "From t = 2 to t = 5 the position changes by 50 − 14 = 36 meters in 3 seconds, so the average rate of change is 36/3 = 12 meters per second. From t = 5 to t = 9 it is (126 − 50)/4 = 19 meters per second. The two answers differ because an average rate depends on the interval, so always state the interval.",
        },
      ],
      takeaway:
        "Average rate of change is change in output divided by change in input, and it belongs to a specific interval.",
    },
    {
      id: "rate-at-a-point",
      title: "Small intervals give an estimate of the rate at a point.",
      conceptTitle: "Rate of change at a point",
      blocks: [
        {
          type: "paragraph",
          text: "The average over three seconds says little about how fast the cyclist is moving at exactly t = 3. To estimate that, shrink the interval so it starts or surrounds t = 3. The average rate of change over a very small interval approximates the rate of change at the point, whenever the function has a rate of change there.",
        },
        {
          type: "table",
          caption: "Average rate of change of s starting at t = 3",
          columns: ["Interval", "Average rate (meters per second)"],
          rows: [
            ["[3, 4]", "12"],
            ["[3, 3.5]", "11.5"],
            ["[3, 3.1]", "11.1"],
            ["[3, 3.01]", "11.01"],
          ],
        },
        {
          type: "paragraph",
          text: "As the interval shrinks, the averages settle toward 11. The cyclist is moving at about 11 meters per second at t = 3. A calculator or table makes this quick, but the idea is only that small intervals reveal what is happening at one input.",
        },
      ],
      takeaway:
        "To estimate a rate at a point, use the average rate over a small interval at or around that point.",
    },
    {
      id: "comparing-rates",
      title: "Compare rates at two points using small intervals near each.",
      conceptTitle: "Comparing rates",
      blocks: [
        {
          type: "paragraph",
          text: "To decide where an output changes faster, estimate the rate near each input and compare the results. Near t = 3 the cyclist's rate is about 11 meters per second. Using the interval from 7.9 to 8.1 seconds, the average rate is (106.11 − 101.91)/0.2 = 21 meters per second. The cyclist is changing position faster near t = 8 than near t = 3.",
        },
        {
          type: "callout",
          title: "Compare like with like",
          text: "Use small intervals of similar width around each point. A wide interval blends together many different rates and can hide which point is really changing faster.",
        },
      ],
      takeaway:
        "Compare rates at two points by estimating each with a small interval, then comparing the numbers.",
    },
    {
      id: "sign-and-meaning",
      title: "The sign of a rate tells you how the two quantities move together.",
      conceptTitle: "Sign and meaning of a rate",
      blocks: [
        {
          type: "list",
          items: [
            "A positive rate means the two quantities move in the same direction: as the input increases, the output increases.",
            "A negative rate means they move in opposite directions: as the input increases, the output decreases.",
            "A rate close to zero means the output is changing very little compared with the input.",
          ],
        },
        {
          type: "paragraph",
          text: "State every rate with its meaning and its units. A good sentence has the form: at about this input, the output is increasing or decreasing at about this many output units per input unit. For example, the average rate of −0.5 degrees per minute for cooling coffee says the temperature is falling by half a degree each minute on average.",
        },
      ],
      takeaway:
        "A rate has a sign, a size, and units. Say all three when you interpret it.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-2-average-rate",
      topicId: "precalculus-1-2",
      term: "Average rate of change",
      definition:
        "The change in output divided by the change in input over an interval, (f(b) − f(a))/(b − a).",
    },
    {
      id: "precalculus-1-2-rate-of-change",
      topicId: "precalculus-1-2",
      term: "Rate of change",
      definition:
        "How quickly an output changes as the input changes, either over an interval or at a single input.",
    },
    {
      id: "precalculus-1-2-interval",
      topicId: "precalculus-1-2",
      term: "Interval",
      definition: "A set of all real numbers between two endpoints.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-2-c1",
      topicId: "precalculus-1-2",
      type: "Look back",
      title: "Rates make concavity measurable",
      body: "Topic 1.1 defined concave up as an increasing rate of change. Now you can check that with numbers: if average rates over equal-width intervals keep growing, the graph is concave up.",
      transferQuestion:
        "Outputs are 4, 9, 17 at equally spaced inputs. Are the average rates growing or shrinking, and what does that say about concavity?",
      feedback:
        "The changes are 5 and 8, so the rates are growing and the graph is concave up over that stretch.",
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
      title: "Average rates become secant slopes",
      body: "On a graph, the average rate of change between two points is the slope of the line through them. Topic 1.3 uses that picture to separate linear functions, which have one constant rate, from quadratic functions, whose rates keep changing in a steady pattern.",
      transferQuestion:
        "Why must a linear function have the same average rate of change over every interval of the same width?",
      feedback:
        "A line has one slope everywhere, so any two points on it give that same slope.",
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

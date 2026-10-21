// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-3",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 3,
  code: "1.3",
  title: "Rates of Change in Linear and Quadratic Functions",
  period: "Unit 1",
  status: "ready",
  summary:
    "Average rates of change for sequences, linear functions, and quadratic functions, secant lines, and how the change in average rates of change reveals concavity.",
  minutes: 12,
  learningGoals: [
    "1.3.A Determine the average rates of change for sequences and functions, including linear, quadratic, and other function types.",
    "1.3.B Determine the change in the average rates of change for linear, quadratic, and other function types.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "The pattern of average rates of change over consecutive equal-length input-value intervals identifies a function type. Constant average rates of change mean linear. Average rates of change that change at a constant rate mean quadratic.",
  context:
    "Topic 1.2 computed and interpreted average rates of change. This topic studies how those average rates of change themselves change, which is the reasoning the AP Exam expects when you justify a choice of model from a table.",
  sections: [
    {
      id: "linear-rates",
      title: "1.3.A · For a linear function, the average rate of change is constant.",
      conceptTitle: "Linear functions and sequences",
      blocks: [
        {
          type: "paragraph",
          text: "For a linear function, the average rate of change over any length input-value interval is constant. For f(x) = 3x + 2, every interval gives an average rate of change of 3, the slope of the line.",
        },
        {
          type: "table",
          caption: "Values of f(x) = 3x + 2",
          columns: ["x", "f(x)", "Change from the previous value"],
          rows: [
            ["0", "2", "None (first value)"],
            ["1", "5", "3"],
            ["2", "8", "3"],
            ["3", "11", "3"],
          ],
        },
        {
          type: "paragraph",
          text: "A sequence is a function whose input values are whole numbers, so the same idea applies to its terms. The sequence 7, 11, 15, 19 changes by 4 from each term to the next, so its average rate of change is 4 per term. A sequence with a constant change between consecutive terms behaves like a linear function.",
        },
      ],
      takeaway:
        "A linear function has the same average rate of change over every interval.",
    },
    {
      id: "quadratic-rates",
      title:
        "1.3.A · For a quadratic function, the average rates of change are given by a linear function.",
      conceptTitle: "Quadratic functions",
      blocks: [
        {
          type: "paragraph",
          text: "A quadratic function can be written q(x) = ax² + bx + c with a ≠ 0. Its average rate of change is not constant. Over consecutive equal-length input-value intervals, its average rates of change can be given by a linear function.",
        },
        {
          type: "table",
          caption:
            "Average rates of change of q(x) = 2x² − 3x + 1 over consecutive intervals of length 1",
          columns: [
            "Interval",
            "q at the left endpoint",
            "q at the right endpoint",
            "Average rate of change",
          ],
          rows: [
            ["[0, 1]", "1", "0", "−1"],
            ["[1, 2]", "0", "3", "3"],
            ["[2, 3]", "3", "10", "7"],
            ["[3, 4]", "10", "21", "11"],
            ["[4, 5]", "21", "36", "15"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Because the average rates of change of q over consecutive equal-length input-value intervals, −1, 3, 7, 11, 15, change by a constant 4, these average rates of change are given by a linear function, which is consistent with q being quadratic.",
        },
      ],
      takeaway:
        "A quadratic function's average rates of change over equal-length intervals change by a constant amount.",
    },
    {
      id: "secant-lines",
      title:
        "1.3.A · The average rate of change over [a, b] is the slope of a secant line.",
      conceptTitle: "Secant lines",
      blocks: [
        {
          type: "paragraph",
          text: "The average rate of change of a function f over the closed interval [a, b] is the slope of the secant line from the point (a, f(a)) to the point (b, f(b)). For f(x) = x², the secant line from (1, 1) to (3, 9) has slope (9 − 1)/(3 − 1) = 4, which is also the average rate of change of f over [1, 3].",
        },
        {
          type: "paragraph",
          text: "Different intervals give secant lines with different slopes unless the function is linear. That is a picture of why only a linear function has a constant average rate of change.",
        },
        {
          type: "graph",
          caption:
            "Secant line of f(x) = x² over the interval [1, b], with slope (b² − 1)/(b − 1) = b + 1",
          alt: "An upward-opening parabola with a dashed secant line through (1, 1) and (b, b²). It starts at b = 3, through (1, 1) and (3, 9) with slope 4; a larger b gives a steeper secant line.",
          window: {
            x: [-1, 4],
            y: [-1, 13],
          },
          ticks: {
            x: 1,
            y: 2,
          },
          sliders: [
            {
              name: "b",
              label: "Right endpoint of the interval",
              min: 1.25,
              max: 3.5,
              step: 0.25,
              value: 3,
            },
          ],
          functions: [
            {
              expr: "x^2",
              label: "f",
              labelAt: 3.3,
              labelPosition: "w",
            },
          ],
          segments: [
            {
              from: [-1, "1 - 2(b + 1)"],
              to: [4, "1 + 3(b + 1)"],
              dashed: true,
              color: 2,
              label: "slope {b + 1}",
              labelAt: 0.2,
              labelPosition: "se",
            },
          ],
          points: [
            {
              at: [1, 1],
              label: "(1, 1)",
              position: "se",
            },
            {
              at: ["b", "b^2"],
              label: "({b}, {b^2})",
              position: "nw",
            },
          ],
        },
      ],
      takeaway:
        "Average rate of change over [a, b] and the slope of the secant line are the same number.",
    },
    {
      id: "concavity-from-rates",
      title: "1.3.B · The change in the average rates of change reveals concavity.",
      conceptTitle: "Changing average rates of change",
      blocks: [
        {
          type: "paragraph",
          text: "For a linear function, the average rates of change over consecutive equal-length intervals are given by a constant function, so they change at a rate of zero. For a quadratic function, they are given by a linear function, so they change at a constant rate.",
        },
        {
          type: "paragraph",
          text: "When the average rate of change over equal-length input-value intervals is increasing for all small-length intervals, the graph of the function is concave up. When it is decreasing for all small-length intervals, the graph is concave down.",
        },
        {
          type: "table",
          caption:
            "Reading average rates of change over consecutive equal-length intervals",
          columns: ["Average rates of change", "How they change", "Graph"],
          rows: [
            [
              "2, 4, 6, 8",
              "Increasing at a constant rate",
              "Concave up, consistent with a quadratic",
            ],
            [
              "9, 5, 1, −3",
              "Decreasing at a constant rate",
              "Concave down, consistent with a quadratic",
            ],
            ["3, 3, 3, 3", "Changing at a rate of zero", "A line"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "The graph of h is concave down on [0, 3] because the average rates of change of h over consecutive equal-length intervals, 15, 5, −5, are decreasing.",
        },
      ],
      takeaway:
        "Increasing average rates of change mean concave up, and decreasing ones mean concave down.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-3-linear-function",
      topicId: "precalculus-1-3",
      term: "Linear function",
      definition:
        "For a linear function, the average rate of change over any length input-value interval is constant.",
      source: "CED 1.3.A.1",
    },
    {
      id: "precalculus-1-3-quadratic-function",
      topicId: "precalculus-1-3",
      term: "Quadratic function",
      definition:
        "For a quadratic function, the average rates of change over consecutive equal-length input-value intervals can be given by a linear function.",
      source: "CED 1.3.A.2",
    },
    {
      id: "precalculus-1-3-secant-line",
      topicId: "precalculus-1-3",
      term: "Secant line",
      definition:
        "The average rate of change of a function f over the closed interval [a, b] is the slope of the secant line from the point (a, f(a)) to (b, f(b)).",
      source: "CED 1.3.A.3",
    },
  ],
  connections: [
    {
      id: "precalculus-1-3-c1",
      topicId: "precalculus-1-3",
      type: "Look back",
      title: "Concavity, now with numbers",
      body: "Topic 1.1 defined concave up as a rate of change that is increasing. Here the definition becomes a test: list the average rates of change over equal-length intervals and see whether they increase.",
      transferQuestion:
        "Average rates of change over three consecutive equal-length intervals are 12, 7, and 3. Is the function increasing, and is its graph concave up or concave down?",
      feedback:
        "The average rates of change are positive, so the function is increasing. They decrease, so the graph is concave down.",
      links: [
        {
          topicId: "precalculus-1-1",
          sectionId: "concavity",
          label: "Review concavity",
        },
      ],
    },
    {
      id: "precalculus-1-3-c2",
      topicId: "precalculus-1-3",
      type: "Looking ahead",
      title: "Degree from successive differences",
      body: "A quadratic function has constant second differences. Topic 1.5 extends this: the degree of a polynomial is the least n for which the successive nth differences are constant.",
      transferQuestion:
        "If the first differences of a table are constant, what degree fits? What if the second differences are the first constant differences?",
      feedback:
        "Constant first differences point to degree 1 and constant second differences to degree 2.",
      links: [
        {
          topicId: "precalculus-1-5",
          sectionId: "degree-from-differences",
          label: "See degree from differences",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-3"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-concave-up",
      "precalculus-1-1-concave-down",
      "precalculus-1-2-average-rate",
      "precalculus-1-3-linear-function",
      "precalculus-1-3-quadratic-function",
      "precalculus-1-3-secant-line",
    ],
  },
};

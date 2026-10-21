// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-1",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 1,
  code: "1.1",
  title: "Change in Tandem",
  period: "Unit 1",
  status: "ready",
  summary:
    "How input values and output values of a function vary together: domain and range, increasing and decreasing, concavity, and zeros.",
  minutes: 12,
  learningGoals: [
    "1.1.A Describe how the input and output values of a function vary together by comparing function values.",
    "1.1.B Construct a graph representing two quantities that vary with respect to each other in a contextual scenario.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A function is a rule that relates two changing quantities. Describing how the output values change as the input values change, whether they increase or decrease and whether the rate of change is increasing or decreasing, is the starting point for every function in this course.",
  context:
    "Unit 1 is built on two ideas: covariation, meaning how output values change in tandem with input values, and rates of change. This topic is about the first idea, and it introduces the precise language the AP Exam expects whenever you describe a function.",
  sections: [
    {
      id: "function-basics",
      title: "1.1.A · A function maps each input value to exactly one output value.",
      conceptTitle: "Functions, domain, and range",
      blocks: [
        {
          type: "paragraph",
          text: "A function is a mathematical relation that maps a set of input values to a set of output values such that each input value is mapped to exactly one output value. The set of input values is called the domain of the function, and the set of output values is called the range of the function. The variable representing input values is called the independent variable, and the variable representing output values is called the dependent variable.",
        },
        {
          type: "table",
          caption: "Values of the function f",
          columns: ["x", "f(x)"],
          rows: [
            ["−2", "7"],
            ["0", "3"],
            ["1", "3"],
            ["4", "−1"],
          ],
        },
        {
          type: "paragraph",
          text: "Different input values may share an output value, as 0 and 1 do above. One input value with two output values is not allowed. The image of an input value is the single output value yielded by the function rule. Since f(0) = 3, the image of 0 is 3. The preimage of an output value is the set of input values for which the function rule yields that output value. Here, the preimage of 3 is {0, 1}.",
        },
        {
          type: "paragraph",
          text: "Two functions f and g are equal only when they have the same domain and f(a) = g(a) for every input value a in that domain. A function can be given graphically, numerically (a table), analytically (a formula), or verbally (a description). The representation changes, but the function does not.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Name both variables with their units. For example: The input values of the function h are times, in seconds, and the output values are heights, in feet.",
        },
      ],
      takeaway:
        "Each input value has exactly one output value. Images are output values, and preimages are sets of input values.",
    },
    {
      id: "increasing-decreasing",
      title:
        "1.1.A · Increasing and decreasing compare output values as input values increase.",
      conceptTitle: "Increasing and decreasing",
      blocks: [
        {
          type: "paragraph",
          text: "A function is increasing over an interval of its domain if, as the input values increase, the output values always increase. That is, for all a and b in the interval, if a < b, then f(a) < f(b). A function is decreasing over an interval of its domain if, as the input values increase, the output values always decrease. That is, for all a and b in the interval, if a < b, then f(a) > f(b).",
        },
        {
          type: "table",
          caption: "Height h(t), in feet, of a ball t seconds after it is thrown",
          columns: ["t", "h(t)"],
          rows: [
            ["0", "6"],
            ["0.5", "26"],
            ["1", "38"],
            ["1.5", "42"],
            ["2", "38"],
            ["2.5", "26"],
            ["3", "6"],
          ],
        },
        {
          type: "paragraph",
          text: "Comparing function values: from t = 0 to t = 1.5 each output value is greater than the one before, and from t = 1.5 to t = 3 each output value is less than the one before. So h is increasing on the interval 0 < t < 1.5 and decreasing on the interval 1.5 < t < 3.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "On the interval 0 < t < 1.5, as t increases, h(t) increases. On the interval 1.5 < t < 3, as t increases, h(t) decreases. Telling open intervals apart from closed intervals when you state where a function is increasing or decreasing is outside the scope of the course, so either form is accepted.",
        },
        {
          type: "graph",
          caption: "Graph of h(t) = −16t² + 48t + 6",
          alt: "A downward-opening parabola that rises from (0, 6) to its highest point (1.5, 42) and then falls back to (3, 6).",
          window: {
            x: [0, 3.2],
            y: [0, 48],
          },
          ticks: {
            x: 0.5,
            y: 6,
          },
          axisLabels: {
            x: "t",
            y: "h(t)",
          },
          functions: [
            {
              expr: "-16t^2 + 48t + 6",
              variable: "t",
              domain: [0, 3],
              label: "h",
              labelAt: 2.6,
            },
          ],
          points: [
            {
              at: [1.5, 42],
              label: "(1.5, 42)",
              position: "n",
            },
          ],
        },
      ],
      takeaway:
        "State the interval, then say how the output values change as the input values increase.",
    },
    {
      id: "construct-graph",
      title: "1.1.B · A verbal description of a context can be turned into a graph.",
      conceptTitle: "Constructing a graph from a context",
      blocks: [
        {
          type: "paragraph",
          text: "The graph of a function displays a set of input-output pairs and shows how the input and output values vary together. To construct a graph from a description, decide which quantity is the input and which is the output, then translate each sentence of the description into a feature of the graph.",
        },
        {
          type: "table",
          caption: "Translating a description of draining water into graph features",
          columns: ["Description", "Feature of the graph of y = D(t)"],
          rows: [
            ["The depth D of the water falls the whole time", "D is decreasing"],
            [
              "It falls quickly at first, then more and more slowly",
              "The rate of change is increasing toward 0, so the graph is concave up",
            ],
            ["The tank is empty after 20 minutes", "D(20) = 0, so t = 20 is a zero of D"],
          ],
        },
      ],
      takeaway:
        "Sketch by features: where the graph increases or decreases, how it bends, and where it meets the axes.",
    },
    {
      id: "concavity",
      title:
        "1.1.B · Concavity describes whether the rate of change is increasing or decreasing.",
      conceptTitle: "Concavity",
      blocks: [
        {
          type: "paragraph",
          text: "The graph of a function is concave up on intervals in which the rate of change is increasing, and concave down on intervals in which the rate of change is decreasing. Increasing or decreasing is one question, and concave up or concave down is a separate question.",
        },
        {
          type: "table",
          caption: "Two increasing functions with different concavity",
          columns: ["x", "f(x)", "g(x)"],
          rows: [
            ["0", "0", "0"],
            ["1", "1", "5"],
            ["2", "4", "8"],
            ["3", "9", "9"],
          ],
        },
        {
          type: "paragraph",
          text: "Over equal steps of 1, the output values of f change by 1, 3, and 5, so the rate of change of f is increasing and its graph is concave up. The output values of g change by 5, 3, and 1, so the rate of change of g is decreasing and its graph is concave down.",
        },
        {
          type: "table",
          caption: "Describing direction and concavity together",
          columns: ["Behavior", "Rate of change", "AP phrasing"],
          rows: [
            [
              "Increasing, concave up",
              "Positive and increasing",
              "Increasing at an increasing rate",
            ],
            [
              "Increasing, concave down",
              "Positive and decreasing",
              "Increasing at a decreasing rate",
            ],
            [
              "Decreasing, concave up",
              "Negative and increasing",
              "Decreasing, and the rate of change is increasing",
            ],
            [
              "Decreasing, concave down",
              "Negative and decreasing",
              "Decreasing, and the rate of change is decreasing",
            ],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "The graph of f is concave up on the interval 0 < x < 3 because the rate of change of f is increasing on that interval. For a decreasing function, name the rate of change directly, as in the table, so the reader cannot misread which rate you mean.",
        },
        {
          type: "graph",
          caption: "Both functions are increasing; f is concave up and g is concave down",
          alt: "Two increasing curves from the origin. The curve f bends upward, getting steeper. The curve g bends downward, getting flatter.",
          window: {
            x: [0, 3.2],
            y: [0, 10],
          },
          ticks: {
            x: 1,
            y: 2,
          },
          functions: [
            {
              expr: "x^2",
              domain: [0, 3],
              label: "f",
              labelAt: 2.9,
              labelPosition: "w",
            },
            {
              expr: "6x - x^2",
              domain: [0, 3],
              label: "g",
              color: 2,
              labelAt: 2.2,
              labelPosition: "nw",
            },
          ],
        },
      ],
      takeaway:
        "Concave up means the rate of change is increasing. Concave down means the rate of change is decreasing.",
    },
    {
      id: "zeros",
      title: "1.1.B · A zero is an input value where the output value is zero.",
      conceptTitle: "Zeros",
      blocks: [
        {
          type: "paragraph",
          text: "The graph of a function intersects the x-axis when the output value is zero, and the corresponding input values are the zeros of the function. If p(x) = (x − 2)(x + 5), then p(2) = 0 and p(−5) = 0, so the zeros of p are x = 2 and x = −5, and the graph crosses the x-axis at the points (2, 0) and (−5, 0).",
        },
        {
          type: "list",
          items: [
            "Analytically: set the output equal to 0 and solve.",
            "Numerically: look for table rows whose output value is 0.",
            "Graphically: look for the input values where the graph meets the x-axis.",
            "Verbally: ask when the measured quantity equals 0, such as when a height reaches the ground.",
          ],
        },
      ],
      takeaway: "A zero is an input value. The output value at a zero is 0.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-1-function",
      topicId: "precalculus-1-1",
      term: "Function",
      definition:
        "A function is a mathematical relation that maps a set of input values to a set of output values such that each input value is mapped to exactly one output value.",
      source: "CED 1.1.A.1",
    },
    {
      id: "precalculus-1-1-domain",
      topicId: "precalculus-1-1",
      term: "Domain",
      definition:
        "The set of input values is called the domain of the function, and the set of output values is called the range of the function.",
      source: "CED 1.1.A.1",
    },
    {
      id: "precalculus-1-1-range",
      topicId: "precalculus-1-1",
      term: "Range",
      definition:
        "The set of input values is called the domain of the function, and the set of output values is called the range of the function.",
      source: "CED 1.1.A.1",
    },
    {
      id: "precalculus-1-1-independent-variable",
      topicId: "precalculus-1-1",
      term: "Independent variable",
      definition:
        "The variable representing input values is called the independent variable, and the variable representing output values is called the dependent variable.",
      source: "CED 1.1.A.1",
    },
    {
      id: "precalculus-1-1-dependent-variable",
      topicId: "precalculus-1-1",
      term: "Dependent variable",
      definition:
        "The variable representing input values is called the independent variable, and the variable representing output values is called the dependent variable.",
      source: "CED 1.1.A.1",
    },
    {
      id: "precalculus-1-1-image",
      topicId: "precalculus-1-1",
      term: "Image of an input value",
      definition:
        "The image of an input value is the single output value yielded by the function rule.",
      source: "CED 1.1.A.2",
    },
    {
      id: "precalculus-1-1-preimage",
      topicId: "precalculus-1-1",
      term: "Preimage of an output value",
      definition:
        "The preimage of an output value is the set of input values for which the function rule yields that output value.",
      source: "CED 1.1.A.2",
    },
    {
      id: "precalculus-1-1-increasing",
      topicId: "precalculus-1-1",
      term: "Increasing",
      definition:
        "A function is increasing over an interval of its domain if, as the input values increase, the output values always increase. That is, for all a and b in the interval, if a < b, then f(a) < f(b).",
      source: "CED 1.1.A.3",
    },
    {
      id: "precalculus-1-1-decreasing",
      topicId: "precalculus-1-1",
      term: "Decreasing",
      definition:
        "A function is decreasing over an interval of its domain if, as the input values increase, the output values always decrease. That is, for all a and b in the interval, if a < b, then f(a) > f(b).",
      source: "CED 1.1.A.4",
    },
    {
      id: "precalculus-1-1-concave-up",
      topicId: "precalculus-1-1",
      term: "Concave up",
      definition:
        "The graph of a function is concave up on intervals in which the rate of change is increasing.",
      source: "CED 1.1.B.3",
    },
    {
      id: "precalculus-1-1-concave-down",
      topicId: "precalculus-1-1",
      term: "Concave down",
      definition:
        "The graph of a function is concave down on intervals in which the rate of change is decreasing.",
      source: "CED 1.1.B.4",
    },
    {
      id: "precalculus-1-1-zero",
      topicId: "precalculus-1-1",
      term: "Zeros of the function",
      definition:
        "The graph intersects the x-axis when the output value is zero. The corresponding input values are said to be zeros of the function.",
      source: "CED 1.1.B.5",
    },
  ],
  connections: [
    {
      id: "precalculus-1-1-c1",
      topicId: "precalculus-1-1",
      type: "Preview",
      title: "Rates of change make concavity measurable",
      body: "Topic 1.2 puts numbers on rates of change, and Topic 1.3 checks concavity by watching how average rates of change over equal-length intervals change.",
      transferQuestion:
        "A phone battery drains faster as more apps run. Is the graph of battery percentage against time concave up or concave down?",
      feedback:
        "Concave down. The percentage is decreasing and the rate of change is decreasing, becoming more negative, as the drain speeds up.",
      links: [
        {
          topicId: "precalculus-1-2",
          sectionId: "average-rate",
          label: "Preview average rate of change",
        },
      ],
    },
    {
      id: "precalculus-1-1-c2",
      topicId: "precalculus-1-1",
      type: "Looking ahead",
      title: "Zeros become factors",
      body: "In Topic 1.5, a real zero a of a polynomial corresponds to a linear factor (x − a). Reading zeros from a graph, table, or formula is what makes that connection possible.",
      transferQuestion:
        "A polynomial has zeros at x = 3 and x = −2. Which linear factors must it have?",
      feedback: "(x − 3) and (x + 2). Each real zero a gives the linear factor (x − a).",
      links: [
        {
          topicId: "precalculus-1-5",
          sectionId: "zeros-and-factors",
          label: "See zeros and factors",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-1"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-function",
      "precalculus-1-1-domain",
      "precalculus-1-1-range",
      "precalculus-1-1-independent-variable",
      "precalculus-1-1-dependent-variable",
      "precalculus-1-1-image",
      "precalculus-1-1-preimage",
      "precalculus-1-1-increasing",
      "precalculus-1-1-decreasing",
      "precalculus-1-1-concave-up",
      "precalculus-1-1-concave-down",
      "precalculus-1-1-zero",
    ],
  },
};

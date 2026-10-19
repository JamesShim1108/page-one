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
    "How inputs and outputs vary together: functions, increasing and decreasing behavior, concavity, and zeros.",
  minutes: 10,
  learningGoals: [
    "Decide whether a table or rule describes a function, and name its domain and range.",
    "Describe where a function is increasing or decreasing and where its graph is concave up or concave down.",
    "Identify the zeros of a function from a rule, a table, or a description.",
  ],
  bigIdea:
    "A function tells you how an output responds as an input changes. Describing that response, whether it rises or falls and whether it speeds up or slows down, is the foundation for everything else in this course.",
  context:
    "Whenever two quantities are linked, a natural question is what one does when the other changes. Functions answer that question precisely. The rest of this unit, from rates of change to polynomial and rational behavior, builds on describing how an output and an input change in tandem.",
  sections: [
    {
      id: "function-basics",
      title: "A function gives each input exactly one output.",
      conceptTitle: "Functions, domain, and range",
      blocks: [
        {
          type: "paragraph",
          text: "A function assigns to each allowed input exactly one output. The set of allowed inputs is the domain, and the set of outputs that actually occur is the range. Two functions are the same function only when they have the same domain and give the same output for every input in it.",
        },
        {
          type: "paragraph",
          text: "A function can appear as a table of values, a graph, an equation, or a verbal description. The representation changes, but the function does not. Moving between representations is a skill you will use in every unit.",
        },
        {
          type: "table",
          caption: "A function: each input appears with one output",
          columns: ["Input x", "Output f(x)"],
          rows: [
            ["−2", "7"],
            ["0", "3"],
            ["1", "3"],
            ["4", "−1"],
          ],
        },
        {
          type: "paragraph",
          text: "Different inputs may share an output, as 0 and 1 do above. The reverse is not allowed. If the input 2 were paired with both 5 and 9, the table would not describe a function. When f(3) = 7, we call 7 the image of 3 and 3 a preimage of 7. An output can have more than one preimage.",
        },
      ],
      takeaway:
        "Each input has exactly one output, but different inputs are allowed to share an output.",
    },
    {
      id: "increasing-decreasing",
      title: "Increasing and decreasing describe how outputs respond to larger inputs.",
      conceptTitle: "Increasing and decreasing",
      blocks: [
        {
          type: "paragraph",
          text: "A function is increasing on an interval if larger inputs always give larger outputs there. It is decreasing on an interval if larger inputs always give smaller outputs there. On a graph read from left to right, rising means increasing and falling means decreasing.",
        },
        {
          type: "paragraph",
          text: "Many functions change direction. A ball thrown upward gains height while it rises and loses height while it falls, so its height function is increasing on one interval and decreasing on the next. Always name the interval when you describe the behavior.",
        },
        {
          type: "table",
          caption: "Height of a thrown ball over time",
          columns: ["Time (seconds)", "Height (feet)"],
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
          type: "callout",
          title: "Turning points",
          text: "In this course you do not need to decide whether the turning point itself belongs to the increasing interval or the decreasing interval. Describe what the function does on either side of it.",
        },
      ],
      takeaway:
        "Name the interval and the direction. One function can increase in one place and decrease in another.",
    },
    {
      id: "concavity",
      title: "Concavity describes how the rate of change is itself changing.",
      conceptTitle: "Concavity",
      blocks: [
        {
          type: "paragraph",
          text: "Two functions can both be increasing and still look very different. One climbs faster and faster, while the other climbs more and more slowly. Concavity captures that difference. A graph is concave up where its rate of change is increasing, and concave down where its rate of change is decreasing.",
        },
        {
          type: "table",
          caption: "Equal input steps, different output patterns",
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
          text: "Compare the output changes across each equal step. For f, the changes are 1, 3, and 5, which grow, so f is concave up. For g, the changes are 5, 3, and 1, which shrink, so g is concave down. Both functions are increasing, so increasing or decreasing is a separate question from concave up or concave down.",
        },
      ],
      takeaway:
        "Concave up means the rate of change is increasing. Concave down means the rate of change is decreasing.",
    },
    {
      id: "zeros",
      title: "Zeros are the inputs that make the output zero.",
      conceptTitle: "Zeros",
      blocks: [
        {
          type: "paragraph",
          text: "A zero of a function is an input whose output is 0. On a graph, a real zero is a point where the graph meets the x-axis, so real zeros are also called x-intercepts. If p(x) = (x − 2)(x + 5), then p(2) = 0 and p(−5) = 0, so 2 and −5 are the zeros of p.",
        },
        {
          type: "list",
          items: [
            "From a rule, set the output equal to 0 and solve.",
            "From a table, look for rows whose output is 0.",
            "From a graph, look for x-intercepts.",
            "From a context, ask when the quantity being measured equals 0, such as when a height reaches the ground.",
          ],
        },
      ],
      takeaway: "A zero is an input, not an output. It is the x-value where f(x) = 0.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-1-function",
      topicId: "precalculus-1-1",
      term: "Function",
      definition: "A relationship that assigns each input exactly one output.",
    },
    {
      id: "precalculus-1-1-domain",
      topicId: "precalculus-1-1",
      term: "Domain",
      definition: "The set of allowed inputs of a function.",
    },
    {
      id: "precalculus-1-1-range",
      topicId: "precalculus-1-1",
      term: "Range",
      definition: "The set of outputs a function actually produces.",
    },
    {
      id: "precalculus-1-1-image",
      topicId: "precalculus-1-1",
      term: "Image",
      definition:
        "The output a function assigns to an input. If f(3) = 7, then 7 is the image of 3.",
    },
    {
      id: "precalculus-1-1-preimage",
      topicId: "precalculus-1-1",
      term: "Preimage",
      definition:
        "An input that produces a given output. If f(3) = 7, then 3 is a preimage of 7, and an output can have several preimages.",
    },
    {
      id: "precalculus-1-1-increasing",
      topicId: "precalculus-1-1",
      term: "Increasing",
      definition:
        "A function is increasing on an interval if larger inputs always give larger outputs there.",
    },
    {
      id: "precalculus-1-1-decreasing",
      topicId: "precalculus-1-1",
      term: "Decreasing",
      definition:
        "A function is decreasing on an interval if larger inputs always give smaller outputs there.",
    },
    {
      id: "precalculus-1-1-concave-up",
      topicId: "precalculus-1-1",
      term: "Concave up",
      definition: "A graph is concave up where its rate of change is increasing.",
    },
    {
      id: "precalculus-1-1-concave-down",
      topicId: "precalculus-1-1",
      term: "Concave down",
      definition: "A graph is concave down where its rate of change is decreasing.",
    },
    {
      id: "precalculus-1-1-zero",
      topicId: "precalculus-1-1",
      term: "Zero",
      definition:
        "An input whose output is 0. A real zero is also an x-intercept of the graph.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-1-c1",
      topicId: "precalculus-1-1",
      type: "Preview",
      title: "Concavity returns with rates of change",
      body: "Topic 1.2 puts numbers on rates of change, and Topic 1.3 shows how to tell concave up from concave down by watching those numbers change. Concavity is the idea that connects them.",
      transferQuestion:
        "Think of a quantity you can track over time, such as a phone battery percentage. Would you expect its graph to be concave up or concave down, and why?",
      feedback:
        "A strong answer ties the shape to how the rate of change itself changes, for example a battery that drains faster as more apps run.",
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
      body: "Later in this unit you will see that a real zero of a polynomial corresponds to a factor of the polynomial. The skill of reading zeros from a graph, table, or equation is what makes that connection possible.",
      transferQuestion:
        "If a function has zeros at 3 and −2, what do you expect its factored form to contain?",
      feedback:
        "Expect the factors (x − 3) and (x + 2). A strong answer notes that each zero produces one linear factor.",
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
      "precalculus-1-1-image",
      "precalculus-1-1-preimage",
      "precalculus-1-1-increasing",
      "precalculus-1-1-decreasing",
      "precalculus-1-1-concave-up",
      "precalculus-1-1-concave-down",
      "precalculus-1-1-zero",
      "precalculus-1-2-rate-of-change",
    ],
  },
};

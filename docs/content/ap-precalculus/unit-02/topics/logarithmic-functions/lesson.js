// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-11",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 11,
  code: "2.11",
  title: "Logarithmic Functions",
  period: "Unit 2",
  status: "ready",
  summary:
    "The domain, range, vertical asymptote, and end behavior of logarithmic functions, why they have no extrema or points of inflection, and recognizing a logarithmic pattern after an additive transformation.",
  minutes: 12,
  learningGoals: ["2.11.A Identify key characteristics of logarithmic functions."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A logarithmic function is an exponential function reflected over y = x, so every characteristic of bˣ appears in log_b x with the roles of x and y switched: a horizontal asymptote becomes a vertical one, and an all-real domain becomes an all-real range.",
  context:
    "Topic 2.3 listed the key characteristics of exponential functions. This topic lists the matching characteristics of logarithmic functions, which the AP Exam uses in both multiple-choice and free-response questions.",
  sections: [
    {
      id: "domain-range",
      title:
        "2.11.A · Domain x > 0, range all real numbers, and a vertical asymptote at x = 0.",
      conceptTitle: "Domain, range, and asymptote",
      blocks: [
        {
          type: "paragraph",
          text: "The domain of a logarithmic function in general form is any real number greater than zero, and its range is all real numbers.",
        },
        {
          type: "paragraph",
          text: "With their limited domain, logarithmic functions in general form are vertically asymptotic to x = 0, with an end behavior that is unbounded. That is, for a logarithmic function in general form, lim x→0⁺ a log_b x = ±∞ and lim x→∞ a log_b x = ±∞.",
        },
        {
          type: "graph",
          caption:
            "f(x) = log₂ x and g(x) = −2 log₃ x, both with the vertical asymptote x = 0",
          alt: "Two curves defined only for x > 0. The curve f rises from far below near the y-axis, crosses the x-axis at (1, 0), and keeps rising slowly. The dashed curve g starts far above near the y-axis, crosses the x-axis at (1, 0), and keeps falling slowly. The y-axis is a dashed vertical asymptote.",
          window: {
            x: [-1, 10],
            y: [-6, 6],
          },
          ticks: {
            x: 1,
            y: 1,
          },
          functions: [
            {
              expr: "log2(x)",
              label: "f",
              labelAt: 9,
              labelPosition: "n",
            },
            {
              expr: "-2 ln(x)/ln(3)",
              label: "g",
              color: 2,
              dashed: true,
              labelAt: 9,
              labelPosition: "s",
            },
          ],
          asymptotes: [
            {
              x: 0,
            },
          ],
          points: [
            {
              at: [1, 0],
              label: "(1, 0)",
              position: "se",
            },
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "For f(x) = log₂ x, lim x→0⁺ f(x) = −∞ and lim x→∞ f(x) = ∞. The graph of f has a vertical asymptote at x = 0.",
        },
      ],
      takeaway:
        "Domain x > 0, range all reals, vertical asymptote x = 0, unbounded at both ends.",
    },
    {
      id: "monotonic",
      title: "2.11.A · Logarithmic functions are always increasing or always decreasing.",
      conceptTitle: "Increasing, decreasing, and concavity",
      blocks: [
        {
          type: "paragraph",
          text: "Because logarithmic functions are inverses of exponential functions, logarithmic functions are also always increasing or always decreasing, and their graphs are either always concave up or always concave down. Consequently, logarithmic functions do not have extrema except on a closed interval, and their graphs do not have points of inflection.",
        },
        {
          type: "table",
          caption: "How a and b determine the graph of f(x) = a log_b x",
          columns: ["a and b", "Increasing or decreasing", "Concavity"],
          rows: [
            ["a > 0, b > 1", "Always increasing", "Always concave down"],
            ["a < 0, b > 1", "Always decreasing", "Always concave up"],
            ["a > 0, 0 < b < 1", "Always decreasing", "Always concave up"],
            ["a < 0, 0 < b < 1", "Always increasing", "Always concave down"],
          ],
        },
      ],
      takeaway:
        "One direction and one concavity everywhere: no extrema, no inflection points.",
    },
    {
      id: "additive-transformation",
      title:
        "2.11.A · Recognizing a logarithmic pattern after an additive transformation.",
      conceptTitle: "Additive transformations of logarithmic functions",
      blocks: [
        {
          type: "paragraph",
          text: "The additive transformation function g(x) = f(x + k), where k ≠ 0, of a logarithmic function f in general form does not have input values that are proportional over equal-length output-value intervals. However, if the input values of the additive transformation function, g(x) = f(x + k), of any function f are proportional over equal-length output value intervals, then f is logarithmic.",
        },
        {
          type: "table",
          caption: "Values of a function g",
          columns: ["x", "0", "1", "3", "7"],
          rows: [["g(x)", "0", "1", "2", "3"]],
        },
        {
          type: "paragraph",
          text: "The inputs 0, 1, 3, 7 are not proportional, but the outputs increase by 1 each time. Adding 1 to each input gives 1, 2, 4, 8, which are proportional with ratio 2. So g(x) = f(x + 1) with f logarithmic, and g(x) = log₂ (x + 1) fits the table.",
        },
      ],
      takeaway:
        "If shifting the inputs makes them proportional over equal output steps, the function is logarithmic.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-11-log-domain-range",
      topicId: "precalculus-2-11",
      term: "Domain of a logarithmic function",
      definition:
        "The domain of a logarithmic function in general form is any real number greater than zero, and its range is all real numbers.",
      source: "CED 2.11.A.1",
    },
    {
      id: "precalculus-2-11-vertically-asymptotic",
      topicId: "precalculus-2-11",
      term: "Vertically asymptotic",
      definition:
        "With their limited domain, logarithmic functions in general form are vertically asymptotic to x = 0, with an end behavior that is unbounded.",
      source: "CED 2.11.A.4",
    },
  ],
  connections: [
    {
      id: "precalculus-2-11-c1",
      topicId: "precalculus-2-11",
      type: "Look back",
      title: "Mirror of exponential characteristics",
      body: "Topic 2.3 showed that exponential functions have range y > 0 when a > 0 and a horizontal asymptote y = 0. Reflecting over y = x gives the domain x > 0 and the vertical asymptote x = 0 of logarithmic functions.",
      transferQuestion:
        "The exponential function 3ˣ has domain all real numbers. What is the range of log₃ x?",
      feedback: "All real numbers. The domain of a function is the range of its inverse.",
      links: [
        {
          topicId: "precalculus-2-10",
          sectionId: "inverse-pairs",
          label: "Review log_b x as an inverse",
        },
      ],
    },
    {
      id: "precalculus-2-11-c2",
      topicId: "precalculus-2-11",
      type: "Looking ahead",
      title: "Properties of logarithms",
      body: "Topic 2.12 shows that a horizontal dilation of a logarithmic function is a vertical translation, using the product property for logarithms.",
      transferQuestion: "Is log₂ (8x) a vertical translation of log₂ x? By how much?",
      feedback:
        "Yes. log₂ (8x) = log₂ 8 + log₂ x = 3 + log₂ x, a translation up 3 units.",
      links: [
        {
          topicId: "precalculus-2-12",
          sectionId: "product-property",
          label: "See the product property",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-11"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-2-11-log-domain-range",
      "precalculus-2-11-vertically-asymptotic",
    ],
  },
};

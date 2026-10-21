// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-2",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 2,
  code: "2.2",
  title: "Change in Linear and Exponential Functions",
  period: "Unit 2",
  status: "ready",
  summary:
    "Linear functions as the real-number version of arithmetic sequences, exponential functions as the real-number version of geometric sequences, and how to tell additive change from multiplicative change.",
  minutes: 13,
  learningGoals: [
    "2.2.A Construct functions of the real numbers that are comparable to arithmetic and geometric sequences.",
    "2.2.B Describe similarities and differences between linear and exponential functions.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Linear functions are built on repeated addition of a constant rate of change. Exponential functions are built on repeated multiplication by a constant ratio. Two values are enough to determine either one.",
  context:
    "Topic 2.1 wrote arithmetic and geometric sequences on the whole numbers. This topic extends them to functions of all real numbers and gives the test the AP Exam uses to choose between a linear and an exponential model.",
  sections: [
    {
      id: "linear-and-arithmetic",
      title: "2.2.A · Linear functions are comparable to arithmetic sequences.",
      conceptTitle: "Linear functions and arithmetic sequences",
      blocks: [
        {
          type: "paragraph",
          text: "Linear functions of the form f(x) = b + mx are similar to arithmetic sequences of the form aₙ = a₀ + dn, as both can be expressed as an initial value (b or a₀) plus repeated addition of a constant rate of change, the slope (m or d).",
        },
        {
          type: "paragraph",
          text: "Similar to arithmetic sequences of the form aₙ = aₖ + d(n − k), which are based on a known difference, d, and a kth term, linear functions can be expressed in the form f(x) = yᵢ + m(x − xᵢ) based on a known slope, m, and a point, (xᵢ, yᵢ).",
        },
        {
          type: "paragraph",
          text: "Example: a line with slope −2 through (4, 9) is f(x) = 9 − 2(x − 4). Expanding gives f(x) = 17 − 2x, so the initial value is f(0) = 17.",
        },
      ],
      takeaway:
        "f(x) = b + mx and f(x) = yᵢ + m(x − xᵢ) match aₙ = a₀ + dn and aₙ = aₖ + d(n − k).",
    },
    {
      id: "exponential-and-geometric",
      title: "2.2.A · Exponential functions are comparable to geometric sequences.",
      conceptTitle: "Exponential functions and geometric sequences",
      blocks: [
        {
          type: "paragraph",
          text: "Exponential functions of the form f(x) = abˣ are similar to geometric sequences of the form gₙ = g₀rⁿ, as both can be expressed as an initial value (a or g₀) times repeated multiplication by a constant ratio (b or r).",
        },
        {
          type: "paragraph",
          text: "Similar to geometric sequences of the form gₙ = gₖr^(n − k), which are based on a known ratio, r, and a kth term, exponential functions can be expressed in the form f(x) = yᵢb^(x − xᵢ) based on a known ratio, b, and a point, (xᵢ, yᵢ).",
        },
        {
          type: "paragraph",
          text: "Sequences and their corresponding functions may have different domains. The sequence gₙ = 3(2)ⁿ is defined only for whole numbers n, while the function f(x) = 3(2)ˣ is defined for every real number x, such as f(2.5) = 3(2)^2.5 ≈ 16.971.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "An exponential function with ratio 1.5 through the point (2, 40) is f(x) = 40(1.5)^(x − 2).",
        },
      ],
      takeaway:
        "f(x) = abˣ and f(x) = yᵢb^(x − xᵢ) match gₙ = g₀rⁿ and gₙ = gₖr^(n − k).",
    },
    {
      id: "linear-vs-exponential",
      title: "2.2.B · Linear functions add; exponential functions multiply.",
      conceptTitle: "Comparing linear and exponential change",
      blocks: [
        {
          type: "paragraph",
          text: "Over equal-length input-value intervals, if the output values of a function change at constant rate, then the function is linear; if the output values of a function change proportionally, then the function is exponential. For an exponential function, the known ratio cannot be 0 or 1.",
        },
        {
          type: "table",
          caption: "f(x) = 7 + 2x and g(x) = 3(2)ˣ over equal-length intervals",
          columns: ["x", "0", "1", "2", "3", "4"],
          rows: [
            ["f(x)", "7", "9", "11", "13", "15"],
            ["Difference", "—", "+2", "+2", "+2", "+2"],
            ["g(x)", "3", "6", "12", "24", "48"],
            ["Ratio", "—", "×2", "×2", "×2", "×2"],
          ],
        },
        {
          type: "paragraph",
          text: "Linear functions of the form f(x) = b + mx and exponential functions of the form f(x) = abˣ can both be expressed analytically in terms of an initial value and a constant involved with change. However, linear functions are based on addition, while exponential functions are based on multiplication.",
        },
        {
          type: "paragraph",
          text: "Arithmetic sequences, linear functions, geometric sequences, and exponential functions all have the property that they can be determined by two distinct sequence or function values.",
        },
        {
          type: "graph",
          caption:
            "f(x) = 7 + 2x and g(x) = 3(2)ˣ: the exponential function eventually exceeds the linear one",
          alt: "A line f rising 2 units for every 1 unit to the right from (0, 7), and a dashed exponential curve g starting at (0, 3) that rises slowly, crosses the line between x = 1 and x = 2, and then rises much faster.",
          window: {
            x: [-1, 4.5],
            y: [0, 30],
          },
          ticks: {
            x: 1,
            y: 5,
          },
          functions: [
            {
              expr: "7 + 2x",
              label: "f",
              labelAt: 4.2,
              labelPosition: "se",
            },
            {
              expr: "3(2)^x",
              label: "g",
              color: 2,
              dashed: true,
              labelAt: 3.3,
              labelPosition: "w",
            },
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "The output values change proportionally over equal-length input-value intervals, since 6/3 = 12/6 = 24/12 = 2. Therefore an exponential model is appropriate.",
        },
      ],
      takeaway:
        "Equal differences mean linear. Equal ratios (not 0 or 1) mean exponential.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-2-linear-function",
      topicId: "precalculus-2-2",
      term: "Linear function",
      definition:
        "Over equal-length input-value intervals, if the output values of a function change at constant rate, then the function is linear; if the output values of a function change proportionally, then the function is exponential.",
      source: "CED 2.2.B.1",
    },
    {
      id: "precalculus-2-2-exponential-function",
      topicId: "precalculus-2-2",
      term: "Exponential function",
      definition:
        "Over equal-length input-value intervals, if the output values of a function change at constant rate, then the function is linear; if the output values of a function change proportionally, then the function is exponential. For an exponential function, the known ratio cannot be 0 or 1.",
      source: "CED 2.2.B.1",
    },
  ],
  connections: [
    {
      id: "precalculus-2-2-c1",
      topicId: "precalculus-2-2",
      type: "Look back",
      title: "Sequences become functions",
      body: "Topic 2.1 wrote aₙ = a₀ + dn and gₙ = g₀rⁿ for whole-number inputs. Replacing n with any real number x gives the linear and exponential functions of this topic.",
      transferQuestion:
        "What function of the real numbers corresponds to the sequence aₙ = 4 + 6n?",
      feedback: "f(x) = 4 + 6x, a linear function with initial value 4 and slope 6.",
      links: [
        {
          topicId: "precalculus-2-1",
          sectionId: "arithmetic",
          label: "Review arithmetic sequences",
        },
      ],
    },
    {
      id: "precalculus-2-2-c2",
      topicId: "precalculus-2-2",
      type: "Looking ahead",
      title: "The general form of an exponential function",
      body: "Topic 2.3 names the parts of f(x) = abˣ, the initial value a and the base b, and uses them to describe growth, decay, and end behavior.",
      transferQuestion: "In f(x) = 5(0.8)ˣ, is the function increasing or decreasing?",
      feedback: "Decreasing, because a = 5 > 0 and 0 < b = 0.8 < 1.",
      links: [
        {
          topicId: "precalculus-2-3",
          sectionId: "general-form",
          label: "See the general form",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-2"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-2-2-linear-function",
      "precalculus-2-2-exponential-function",
    ],
  },
};

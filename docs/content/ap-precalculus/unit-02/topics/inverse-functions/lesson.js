// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-8",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 8,
  code: "2.8",
  title: "Inverse Functions",
  period: "Unit 2",
  status: "ready",
  summary:
    "When a function is invertible, how an inverse reverses input-output pairs, composition with the identity function, domains and ranges of inverses, reflecting a graph over y = x, and finding an inverse analytically.",
  minutes: 14,
  learningGoals: [
    "2.8.A Determine the input-output pairs of the inverse of a function.",
    "2.8.B Determine the inverse of a function on an invertible domain.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "An inverse function runs a function backward: it sends each output back to the one input that produced it. That only works when no output comes from two different inputs, which sometimes requires restricting the domain.",
  context:
    "Topic 2.7 introduced composition and the identity function. Inverses are defined by composition, and Topic 2.10 uses them to build logarithmic functions as inverses of exponential functions.",
  sections: [
    {
      id: "invertible",
      title: "2.8.A · A function is invertible if each output comes from a unique input.",
      conceptTitle: "Invertible functions and reverse mappings",
      blocks: [
        {
          type: "paragraph",
          text: "On a specified domain, a function, f, has an inverse function, or is invertible, if each output value of f is mapped from a unique input value. The domain of a function may be restricted in many ways to make the function invertible.",
        },
        {
          type: "paragraph",
          text: "An inverse function can be thought of as a reverse mapping of the function. An inverse function, f⁻¹, maps the output values of a function, f, on its invertible domain to their corresponding input values; that is, if f(a) = b, then f⁻¹(b) = a. Alternately, on its invertible domain, if a function consists of input-output pairs (a, b), then the inverse function consists of input-output pairs (b, a).",
        },
        {
          type: "paragraph",
          text: "Example: f(x) = x² is not invertible on all real numbers, because f(−3) = f(3) = 9. Restricted to x ≥ 0, each output comes from one input, and f⁻¹(x) = √x.",
        },
      ],
      takeaway:
        "Invertible means no output is shared; the inverse swaps every (a, b) to (b, a).",
    },
    {
      id: "inverse-by-composition",
      title: "2.8.B · A function composed with its inverse is the identity function.",
      conceptTitle: "Inverses, composition, domain, and range",
      blocks: [
        {
          type: "paragraph",
          text: "The composition of a function, f, and its inverse function, f⁻¹, is the identity function; that is, f(f⁻¹(x)) = f⁻¹(f(x)) = x.",
        },
        {
          type: "paragraph",
          text: "On a function's invertible domain, the function's range and domain are the inverse function's domain and range, respectively. The inverse of the table of values of y = f(x) can be found by reversing the input-output pairs; that is, (a, b) corresponds to (b, a).",
        },
        {
          type: "table",
          caption: "A table of values of f and the table of its inverse",
          columns: ["x", "−1", "0", "2", "5"],
          rows: [
            ["f(x)", "8", "6", "2", "−4"],
            ["Inverse: input", "8", "6", "2", "−4"],
            ["Inverse: output f⁻¹", "−1", "0", "2", "5"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Because f(0) = 6, f⁻¹(6) = 0.",
        },
      ],
      takeaway: "f(f⁻¹(x)) = f⁻¹(f(x)) = x, and the domain and range trade places.",
    },
    {
      id: "finding-inverses",
      title:
        "2.8.B · Find an inverse by reflecting the graph or reversing the operations.",
      conceptTitle: "Finding inverse functions",
      blocks: [
        {
          type: "paragraph",
          text: "The inverse of the graph of the function y = f(x) can be found by reversing the roles of the x- and y-axes; that is, by reflecting the graph of the function over the graph of the identity function h(x) = x.",
        },
        {
          type: "graph",
          caption:
            "f(x) = 3x + 5 and its inverse f⁻¹(x) = (x − 5)/3, reflections of each other over y = x",
          alt: "A steep line f through (0, 5) and (−1, 2), a dashed shallow line through (5, 0) and (2, −1), and a dashed gray line y = x between them. Each point (a, b) on f matches a point (b, a) on the inverse.",
          window: {
            x: [-6, 9],
            y: [-6, 9],
          },
          ticks: {
            x: 1,
            y: 1,
          },
          functions: [
            {
              expr: "3x + 5",
              label: "f",
              labelAt: 1,
              labelPosition: "w",
            },
            {
              expr: "(x - 5)/3",
              label: "f⁻¹",
              color: 2,
              dashed: true,
              labelAt: 8,
              labelPosition: "se",
            },
          ],
          asymptotes: [
            {
              slope: 1,
              intercept: 0,
            },
          ],
          points: [
            {
              at: [0, 5],
              label: "(0, 5)",
              position: "e",
            },
            {
              at: [5, 0],
              label: "(5, 0)",
              position: "s",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The inverse of the function can be found by determining the inverse operations to reverse the mapping. One method for finding the inverse of the function f is reversing the roles of x and y in the equation y = f(x), then solving for y = f⁻¹(x).",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "y = 3x + 5. Reverse the roles of x and y: x = 3y + 5. Solve: y = (x − 5)/3. So f⁻¹(x) = (x − 5)/3.",
        },
        {
          type: "paragraph",
          text: "In addition to limiting the domain of a function to obtain an inverse function, contextual restrictions may also limit the applicability of an inverse function.",
        },
      ],
      takeaway: "Swap x and y, then solve for y. The graph reflects over y = x.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-8-invertible",
      topicId: "precalculus-2-8",
      term: "Invertible",
      definition:
        "On a specified domain, a function, f, has an inverse function, or is invertible, if each output value of f is mapped from a unique input value.",
      source: "CED 2.8.A.1",
    },
    {
      id: "precalculus-2-8-inverse-function",
      topicId: "precalculus-2-8",
      term: "Inverse function",
      definition:
        "An inverse function can be thought of as a reverse mapping of the function. An inverse function, f⁻¹, maps the output values of a function, f, on its invertible domain to their corresponding input values; that is, if f(a) = b, then f⁻¹(b) = a.",
      source: "CED 2.8.A.2",
    },
  ],
  connections: [
    {
      id: "precalculus-2-8-c1",
      topicId: "precalculus-2-8",
      type: "Look back",
      title: "Preimages",
      body: "Topic 1.1 defined the preimage of an output value as the set of inputs that give it. A function is invertible exactly when every preimage contains a single input.",
      transferQuestion:
        "If f(2) = f(7) = 10, can f be invertible on a domain containing 2 and 7?",
      feedback:
        "No. The preimage of 10 contains two inputs, so f⁻¹(10) would not be a single value.",
      links: [
        {
          topicId: "precalculus-2-7",
          sectionId: "order-and-identity",
          label: "Review the identity function",
        },
      ],
    },
    {
      id: "precalculus-2-8-c2",
      topicId: "precalculus-2-8",
      type: "Looking ahead",
      title: "Logarithms undo exponentials",
      body: "Topic 2.10 shows that f(x) = log_b x is the inverse of g(x) = bˣ, so the point (s, t) on bˣ becomes (t, s) on log_b x.",
      transferQuestion:
        "The point (3, 8) is on the graph of y = 2ˣ. What point is on the graph of its inverse?",
      feedback: "(8, 3), because the inverse reverses each input-output pair.",
      links: [
        {
          topicId: "precalculus-2-10",
          sectionId: "inverse-pairs",
          label: "See logarithms as inverses",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-8"],
  definitionCoverage: {
    status: "required",
    conceptIds: ["precalculus-2-8-invertible", "precalculus-2-8-inverse-function"],
  },
};

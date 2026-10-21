// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-3",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 3,
  code: "2.3",
  title: "Exponential Functions",
  period: "Unit 2",
  status: "ready",
  summary:
    "The general form f(x) = abˣ, its initial value and base, exponential growth and decay, why exponential functions have no extrema or points of inflection, and their end behavior.",
  minutes: 12,
  learningGoals: ["2.3.A Identify key characteristics of exponential functions."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Every key characteristic of an exponential function in general form follows from two numbers: the initial value a and the base b. Their signs and sizes decide whether the function grows or decays, its concavity, and its end behavior.",
  context:
    "Topic 2.2 introduced f(x) = abˣ as the real-number version of a geometric sequence. This topic names its parts and the behavior the AP Exam expects you to read from them.",
  sections: [
    {
      id: "general-form",
      title: "2.3.A · The general form of an exponential function is f(x) = abˣ.",
      conceptTitle: "General form, initial value, and base",
      blocks: [
        {
          type: "paragraph",
          text: "The general form of an exponential function is f(x) = abˣ, with the initial value a, where a ≠ 0, and the base b, where b > 0, and b ≠ 1. When a > 0 and b > 1, the exponential function is said to demonstrate exponential growth. When a > 0 and 0 < b < 1, the exponential function is said to demonstrate exponential decay.",
        },
        {
          type: "paragraph",
          text: "When the natural numbers are input values in an exponential function, the input value specifies the number of factors of the base to be applied to the function's initial value. The domain of an exponential function is all real numbers.",
        },
        {
          type: "paragraph",
          text: "Example: for f(x) = 5(0.8)ˣ, the initial value is f(0) = 5 and the base is 0.8. f(2) = 5(0.8)(0.8) = 3.2 applies two factors of 0.8. Because a > 0 and 0 < b < 1, f demonstrates exponential decay.",
        },
      ],
      takeaway:
        "a is the initial value, b is the base; a > 0 with b > 1 is growth, and a > 0 with 0 < b < 1 is decay.",
    },
    {
      id: "monotonic-and-concavity",
      title: "2.3.A · Exponential functions are always increasing or always decreasing.",
      conceptTitle: "Increasing, decreasing, and concavity",
      blocks: [
        {
          type: "paragraph",
          text: "Because the output values of exponential functions in general form are proportional over equal-length input-value intervals, exponential functions are always increasing or always decreasing, and their graphs are always concave up or always concave down. Consequently, exponential functions do not have extrema except on a closed interval, and their graphs do not have points of inflection.",
        },
        {
          type: "table",
          caption: "How the signs of a and b determine the graph of f(x) = abˣ",
          columns: ["Initial value and base", "Increasing or decreasing", "Concavity"],
          rows: [
            ["a > 0, b > 1", "Always increasing (growth)", "Always concave up"],
            ["a > 0, 0 < b < 1", "Always decreasing (decay)", "Always concave up"],
            ["a < 0, b > 1", "Always decreasing", "Always concave down"],
            ["a < 0, 0 < b < 1", "Always increasing", "Always concave down"],
          ],
        },
        {
          type: "paragraph",
          text: "If the output values of the function f are not proportional over equal-length input-value intervals, but the output values of an additive transformation of f are proportional over equal-length input-value intervals, then f can be modeled by an additive transformation of an exponential function.",
        },
        {
          type: "paragraph",
          text: "Example: the values 4, 5, 7, 11 are not proportional. Subtracting 3 gives 1, 2, 4, 8, which are proportional with ratio 2. So the data can be modeled by y = 2ˣ + 3.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "f has no relative maximum because an exponential function in general form is always increasing or always decreasing.",
        },
      ],
      takeaway:
        "No turning points and no inflection points: one direction, one concavity.",
    },
    {
      id: "end-behavior",
      title:
        "2.3.A · End behavior: unbounded on one side, approaching zero on the other.",
      conceptTitle: "End behavior of exponential functions",
      blocks: [
        {
          type: "paragraph",
          text: "For an exponential function in general form, as the input values increase or decrease without bound, the output values will increase or decrease without bound or will get arbitrarily close to zero. That is, for an exponential function in general form, lim x→±∞ abˣ = ∞, lim x→±∞ abˣ = −∞, or lim x→±∞ abˣ = 0.",
        },
        {
          type: "graph",
          caption:
            "Exponential growth g(x) = 2(1.5)ˣ and exponential decay h(x) = 2(0.5)ˣ, both with initial value 2",
          alt: "Two curves through (0, 2). The curve g rises slowly on the left, close to the x-axis, and steeply on the right. The dashed curve h falls steeply on the left and flattens toward the x-axis on the right. Neither curve touches the x-axis.",
          window: {
            x: [-4, 4],
            y: [-1, 12],
          },
          ticks: {
            x: 1,
            y: 2,
          },
          functions: [
            {
              expr: "2(1.5)^x",
              label: "g",
              labelAt: 3.6,
              labelPosition: "w",
            },
            {
              expr: "2(0.5)^x",
              label: "h",
              color: 2,
              dashed: true,
              labelAt: -3.3,
              labelPosition: "e",
            },
          ],
          points: [
            {
              at: [0, 2],
              label: "(0, 2)",
              position: "e",
            },
          ],
        },
        {
          type: "paragraph",
          text: "For g(x) = 2(1.5)ˣ, lim x→∞ g(x) = ∞ and lim x→−∞ g(x) = 0. For h(x) = 2(0.5)ˣ, lim x→∞ h(x) = 0 and lim x→−∞ h(x) = ∞. In each case the line y = 0 is a horizontal asymptote on one side.",
        },
      ],
      takeaway: "One end goes to ±∞; the other gets arbitrarily close to 0.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-3-initial-value",
      topicId: "precalculus-2-3",
      term: "Initial value",
      definition:
        "The general form of an exponential function is f(x) = abˣ, with the initial value a, where a ≠ 0, and the base b, where b > 0, and b ≠ 1.",
      source: "CED 2.3.A.1",
    },
    {
      id: "precalculus-2-3-base",
      topicId: "precalculus-2-3",
      term: "Base",
      definition:
        "The general form of an exponential function is f(x) = abˣ, with the initial value a, where a ≠ 0, and the base b, where b > 0, and b ≠ 1.",
      source: "CED 2.3.A.1",
    },
    {
      id: "precalculus-2-3-exponential-growth",
      topicId: "precalculus-2-3",
      term: "Exponential growth",
      definition:
        "When a > 0 and b > 1, the exponential function is said to demonstrate exponential growth.",
      source: "CED 2.3.A.1",
    },
    {
      id: "precalculus-2-3-exponential-decay",
      topicId: "precalculus-2-3",
      term: "Exponential decay",
      definition:
        "When a > 0 and 0 < b < 1, the exponential function is said to demonstrate exponential decay.",
      source: "CED 2.3.A.1",
    },
  ],
  connections: [
    {
      id: "precalculus-2-3-c1",
      topicId: "precalculus-2-3",
      type: "Look back",
      title: "Concavity from rates of change",
      body: "Topic 1.1 linked concavity to whether the rate of change is increasing. For a > 0, an exponential function's rate of change keeps increasing, so its graph is always concave up.",
      transferQuestion: "Is the graph of f(x) = −3(2)ˣ concave up or concave down?",
      feedback:
        "Concave down. With a < 0 the function is always decreasing, and it decreases faster and faster.",
      links: [
        {
          topicId: "precalculus-2-2",
          sectionId: "linear-vs-exponential",
          label: "Review proportional change",
        },
      ],
    },
    {
      id: "precalculus-2-3-c2",
      topicId: "precalculus-2-3",
      type: "Looking ahead",
      title: "Rewriting exponential expressions",
      body: "Topic 2.4 uses the properties of exponents to rewrite abˣ, which shows that horizontal translations and dilations of exponential functions are really changes of a and b.",
      transferQuestion: "Rewrite 2^(x + 3) as a·2ˣ.",
      feedback: "2^(x + 3) = 2³·2ˣ = 8·2ˣ, so a = 8.",
      links: [
        {
          topicId: "precalculus-2-4",
          sectionId: "product-property",
          label: "See the product property",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-3"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-2-3-initial-value",
      "precalculus-2-3-base",
      "precalculus-2-3-exponential-growth",
      "precalculus-2-3-exponential-decay",
    ],
  },
};

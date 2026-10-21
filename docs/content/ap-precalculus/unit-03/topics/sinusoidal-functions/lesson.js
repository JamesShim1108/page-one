// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-5",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 5,
  code: "3.5",
  title: "Sinusoidal Functions",
  period: "Unit 3",
  status: "ready",
  summary:
    "Sinusoidal functions as transformations of sin θ, with period, frequency, amplitude, and midline, plus the concavity of their graphs and the symmetry that makes sine odd and cosine even.",
  minutes: 12,
  learningGoals: ["3.5.A Identify key characteristics of the sine and cosine functions."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Every sinusoidal function is a stretched and shifted copy of the sine graph. Four numbers describe it: the period, its reciprocal the frequency, the amplitude, and the midline.",
  context:
    "Topic 3.4 drew the graphs of sine and cosine. This topic gives the vocabulary for their features, which Topic 3.6 then changes with transformations and Topic 3.7 uses to build models.",
  sections: [
    {
      id: "sinusoidal-functions",
      title: "3.5.A · Sine and cosine are both sinusoidal functions.",
      conceptTitle: "Sinusoidal functions, period, and frequency",
      blocks: [
        {
          type: "paragraph",
          text: "A sinusoidal function is any function that involves additive and multiplicative transformations of f(θ) = sin θ. The sine and cosine functions are both sinusoidal functions, with cos θ = sin(θ + π/2).",
        },
        {
          type: "paragraph",
          text: "The equation cos θ = sin(θ + π/2) says the cosine graph is the sine graph slid π/2 units to the left. In Topic 3.4, cosine reached its maximum at θ = 0, a quarter period before sine reached its maximum at θ = π/2.",
        },
        {
          type: "paragraph",
          text: "The period and frequency of a sinusoidal function are reciprocals. The period of f(θ) = sin θ and g(θ) = cos θ is 2π, and the frequency is 1/(2π).",
        },
        {
          type: "callout",
          title: "Reading frequency",
          text: "The period is the length of one cycle; the frequency is the number of cycles per unit of input. A wave with period 1/4 second completes 4 cycles each second, so its frequency is 4 cycles per second.",
        },
      ],
      takeaway: "Frequency = 1/period; for sin θ and cos θ the period is 2π.",
    },
    {
      id: "amplitude-and-midline",
      title: "3.5.A · Amplitude and midline come from the maximum and minimum.",
      conceptTitle: "Amplitude and midline",
      blocks: [
        {
          type: "paragraph",
          text: "The amplitude of a sinusoidal function is half the difference between its maximum and minimum values. The amplitude of f(θ) = sin θ and g(θ) = cos θ is 1.",
        },
        {
          type: "paragraph",
          text: "The midline of the graph of a sinusoidal function is determined by the average, or arithmetic mean, of the maximum and minimum values of the function. The midline of the graphs of y = sin θ and y = cos θ is y = 0.",
        },
        {
          type: "graph",
          caption: "A sinusoidal function with maximum 9 and minimum 1",
          alt: "A wave that oscillates between a maximum of 9 and a minimum of 1. A dashed horizontal line at y = 5 runs through the middle of the wave.",
          window: {
            x: [-0.3, 12.866370614359173],
            y: [-1, 11],
          },
          ticks: {
            x: [
              {
                at: 0,
                label: "0",
              },
              {
                at: 1.5707963267948966,
                label: "π/2",
              },
              {
                at: 3.141592653589793,
                label: "π",
              },
              {
                at: 4.71238898038469,
                label: "3π/2",
              },
              {
                at: 6.283185307179586,
                label: "2π",
              },
              {
                at: 7.853981633974483,
                label: "5π/2",
              },
              {
                at: 9.42477796076938,
                label: "3π",
              },
              {
                at: 10.995574287564276,
                label: "7π/2",
              },
              {
                at: 12.566370614359172,
                label: "4π",
              },
            ],
            y: 1,
          },
          axisLabels: {
            x: "θ",
            y: "y",
          },
          functions: [
            {
              expr: "5 + 4sin(x)",
              label: "f",
              labelAt: 7.4,
              labelPosition: "ne",
            },
          ],
          asymptotes: [
            {
              y: 5,
            },
          ],
          points: [
            {
              at: [1.5707963267948966, 9],
              label: "max 9",
              position: "n",
            },
            {
              at: [4.71238898038469, 1],
              label: "min 1",
              position: "s",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Example: for the function graphed above, the amplitude is (9 − 1)/2 = 4 and the midline is y = (9 + 1)/2 = 5. The dashed line marks the midline; the graph rises 4 units above it and falls 4 units below it.",
        },
      ],
      takeaway: "Amplitude = (max − min)/2; midline y = (max + min)/2.",
    },
    {
      id: "symmetry-and-concavity",
      title: "3.5.A · Concavity alternates, sine is odd, and cosine is even.",
      conceptTitle: "Concavity and symmetry",
      blocks: [
        {
          type: "paragraph",
          text: "As input values increase, the graphs of sinusoidal functions oscillate between concave down and concave up.",
        },
        {
          type: "paragraph",
          text: "For y = sin θ, the graph is concave down on 0 < θ < π, where it lies above its midline, and concave up on π < θ < 2π, where it lies below. The points of inflection are where the graph crosses the midline.",
        },
        {
          type: "paragraph",
          text: "The graph of y = sin θ has rotational symmetry about the origin and is therefore an odd function. The graph of y = cos θ has reflective symmetry over the y-axis and is therefore an even function.",
        },
        {
          type: "table",
          caption: "Symmetry of sine and cosine",
          columns: ["Function", "Symmetry of the graph", "Algebraic statement"],
          rows: [
            ["y = sin θ", "Rotational about the origin (odd)", "sin(−θ) = −sin θ"],
            ["y = cos θ", "Reflective over the y-axis (even)", "cos(−θ) = cos θ"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "The graph of y = cos θ is concave up on π/2 < θ < 3π/2 because it is below its midline there; it changes concavity at θ = π/2 and θ = 3π/2, where it crosses the midline.",
        },
      ],
      takeaway:
        "Above the midline: concave down. Below: concave up. Sine is odd; cosine is even.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-5-sinusoidal-function",
      topicId: "precalculus-3-5",
      term: "Sinusoidal function",
      definition:
        "A sinusoidal function is any function that involves additive and multiplicative transformations of f(θ) = sin θ. The sine and cosine functions are both sinusoidal functions, with cos θ = sin(θ + π/2).",
      source: "CED 3.5.A.1",
    },
    {
      id: "precalculus-3-5-frequency",
      topicId: "precalculus-3-5",
      term: "Frequency",
      definition:
        "The period and frequency of a sinusoidal function are reciprocals. The period of f(θ) = sin θ and g(θ) = cos θ is 2π, and the frequency is 1/(2π).",
      source: "CED 3.5.A.2",
    },
    {
      id: "precalculus-3-5-amplitude",
      topicId: "precalculus-3-5",
      term: "Amplitude",
      definition:
        "The amplitude of a sinusoidal function is half the difference between its maximum and minimum values. The amplitude of f(θ) = sin θ and g(θ) = cos θ is 1.",
      source: "CED 3.5.A.3",
    },
    {
      id: "precalculus-3-5-midline",
      topicId: "precalculus-3-5",
      term: "Midline",
      definition:
        "The midline of the graph of a sinusoidal function is determined by the average, or arithmetic mean, of the maximum and minimum values of the function. The midline of the graphs of y = sin θ and y = cos θ is y = 0.",
      source: "CED 3.5.A.4",
    },
  ],
  connections: [
    {
      id: "precalculus-3-5-c1",
      topicId: "precalculus-3-5",
      type: "Look back",
      title: "Odd and even functions",
      body: "Topic 1.5 defined even functions by f(−x) = f(x) and odd functions by f(−x) = −f(x). Sine and cosine are the most important examples of each.",
      transferQuestion: "If sin(0.4) ≈ 0.389, what is sin(−0.4)?",
      feedback: "About −0.389, because sine is odd.",
      links: [
        {
          topicId: "precalculus-1-5",
          sectionId: "even-and-odd",
          label: "Review even and odd functions",
        },
      ],
    },
    {
      id: "precalculus-3-5-c2",
      topicId: "precalculus-3-5",
      type: "Looking ahead",
      title: "Changing the four features",
      body: "Topic 3.6 shows how f(θ) = a sin(b(θ + c)) + d sets the amplitude, period, phase shift, and midline directly.",
      transferQuestion: "Guess the amplitude and midline of y = 3 sin θ + 2.",
      feedback: "Amplitude 3, midline y = 2: the maximum is 5 and the minimum is −1.",
      links: [
        {
          topicId: "precalculus-3-6",
          sectionId: "general-form",
          label: "See the general form",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-5"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-1-period",
      "precalculus-3-5-sinusoidal-function",
      "precalculus-3-5-frequency",
      "precalculus-3-5-amplitude",
      "precalculus-3-5-midline",
    ],
  },
};

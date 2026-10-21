// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-6",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 6,
  code: "3.6",
  title: "Sinusoidal Function Transformations",
  period: "Unit 3",
  status: "ready",
  summary:
    "How a, b, c, and d in f(θ) = a sin(b(θ + c)) + d set the amplitude, period, phase shift, and midline of a sinusoidal function, for both sine and cosine.",
  minutes: 13,
  learningGoals: [
    "3.6.A Identify the amplitude, vertical shift, period, and phase shift of a sinusoidal function.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Every sinusoidal function can be written as a sin(b(θ + c)) + d. Each parameter controls one feature: |a| the amplitude, |1/b|·2π the period, −c the phase shift, and d the midline.",
  context:
    "Topic 1.12 transformed functions in general, and Topic 3.5 named the features of sinusoidal graphs. This topic connects the two, so you can read the features from an equation and write an equation from the features.",
  sections: [
    {
      id: "additive-transformations",
      title: "3.6.A · Adding d moves the midline; adding c inside shifts the phase.",
      conceptTitle: "Vertical translations and phase shifts",
      blocks: [
        {
          type: "paragraph",
          text: "Functions that can be written in the form f(θ) = a sin(b(θ + c)) + d or g(θ) = a cos(b(θ + c)) + d, where a, b, c, and d are real numbers, a ≠ 0, and b ≠ 0, are sinusoidal functions and are transformations of the sine and cosine functions. Additive and multiplicative transformations are the same for both sine and cosine because the cosine function is a phase shift of the sine function by −π/2 units.",
        },
        {
          type: "paragraph",
          text: "The graph of the additive transformation g(θ) = sin θ + d of the sine function f(θ) = sin θ is a vertical translation of the graph of f, including its midline, by d units. The same transformation of the cosine function yields the same result.",
        },
        {
          type: "paragraph",
          text: "The graph of the additive transformation g(θ) = sin(θ + c) of the sine function f(θ) = sin θ is a horizontal translation, or phase shift, of the graph of f by −c units. The same transformation of the cosine function yields the same result.",
        },
        {
          type: "paragraph",
          text: "Example: g(θ) = cos(θ − π/3) has c = −π/3, so its graph is the graph of y = cos θ shifted −c = π/3 units, which is π/3 units to the right. Its maximum moves from θ = 0 to θ = π/3.",
        },
      ],
      takeaway: "+d moves the graph up d; +c inside moves it −c units horizontally.",
    },
    {
      id: "multiplicative-transformations",
      title:
        "3.6.A · Multiplying by a changes the amplitude; multiplying θ by b changes the period.",
      conceptTitle: "Vertical and horizontal dilations",
      blocks: [
        {
          type: "paragraph",
          text: "The graph of the multiplicative transformation g(θ) = a sin θ of the sine function f(θ) = sin θ is a vertical dilation of the graph of f and differs in amplitude by a factor of |a|. The same transformation of the cosine function yields the same result.",
        },
        {
          type: "paragraph",
          text: "The graph of the multiplicative transformation g(θ) = sin(bθ) of the sine function f(θ) = sin θ is a horizontal dilation of the graph of f and differs in period by a factor of |1/b|. The same transformation of the cosine function yields the same result.",
        },
        {
          type: "graph",
          caption: "y = sin θ (dashed), y = 3 sin θ, and y = sin(2θ)",
          alt: "Three waves through the origin. The dashed y = sin θ has height 1 and period 2π. The wave y = 3 sin θ has the same period but rises to 3. The wave y = sin(2θ) has height 1 but completes two cycles in 2π.",
          window: {
            x: [-0.3, 6.583185307179586],
            y: [-3.5, 3.5],
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
            ],
            y: 1,
          },
          axisLabels: {
            x: "θ",
            y: "y",
          },
          functions: [
            {
              expr: "sin(x)",
              dashed: true,
              color: 4,
              label: "sin θ",
              labelAt: 5.2,
              labelPosition: "se",
            },
            {
              expr: "3sin(x)",
              label: "3 sin θ",
              labelAt: 1.7,
              labelPosition: "ne",
            },
            {
              expr: "sin(2x)",
              color: 2,
              label: "sin(2θ)",
              labelAt: 0.75,
              labelPosition: "nw",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Example: y = 3 sin θ has amplitude 3|1| = 3. y = sin(2θ) has period |1/2|·2π = π, so it fits two cycles where y = sin θ fits one. A negative a also reflects the graph over its midline, but the amplitude is still |a|.",
        },
      ],
      takeaway: "Amplitude |a|; period 2π/|b|.",
    },
    {
      id: "general-form",
      title: "3.6.A · Reading all four features from a sin(b(θ + c)) + d.",
      conceptTitle: "The general form",
      blocks: [
        {
          type: "paragraph",
          text: "The graph of y = f(θ) = a sin(b(θ + c)) + d has an amplitude of |a| units, a period of |1/b|·2π units, a midline vertical shift of d units from y = 0, and a phase shift of −c units. The same transformations of the cosine function yield the same results.",
        },
        {
          type: "graph",
          caption:
            "y = a sin(b(θ + c)) + d. Move the sliders to see each parameter's effect.",
          alt: "A sine wave that starts as y = 3 sin(2(θ − π/4)) + 1, with maximum 4, minimum −2, midline y = 1, and period π. Sliders change a, b, c, and d.",
          window: {
            x: [-0.5, 6.583185307179586],
            y: [-6, 6],
          },
          ticks: {
            x: [
              {
                at: 0,
                label: "0",
              },
              {
                at: 0.7853981633974483,
                label: "π/4",
              },
              {
                at: 1.5707963267948966,
                label: "π/2",
              },
              {
                at: 2.356194490192345,
                label: "3π/4",
              },
              {
                at: 3.141592653589793,
                label: "π",
              },
              {
                at: 3.9269908169872414,
                label: "5π/4",
              },
              {
                at: 4.71238898038469,
                label: "3π/2",
              },
              {
                at: 5.497787143782138,
                label: "7π/4",
              },
              {
                at: 6.283185307179586,
                label: "2π",
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
              expr: "a sin(b(x + c)) + d",
              label: "f",
              labelAt: 5.5,
            },
          ],
          sliders: [
            {
              name: "a",
              min: -4,
              max: 4,
              step: 0.5,
              value: 3,
              label: "Amplitude factor a",
            },
            {
              name: "b",
              min: 0.5,
              max: 4,
              step: 0.5,
              value: 2,
              label: "Period factor b",
            },
            {
              name: "c",
              min: -3.14,
              max: 3.14,
              step: 0.01,
              value: -0.79,
              label: "Shift c",
            },
            {
              name: "d",
              min: -2,
              max: 2,
              step: 0.5,
              value: 1,
              label: "Midline d",
            },
          ],
        },
        {
          type: "table",
          caption: "Features of f(θ) = 3 sin(2(θ − π/4)) + 1",
          columns: ["Feature", "Rule", "Value"],
          rows: [
            ["Amplitude", "|a|", "3"],
            ["Period", "|1/b|·2π", "π"],
            ["Phase shift", "−c", "π/4 (to the right)"],
            ["Midline", "y = d", "y = 1"],
            ["Maximum and minimum", "d ± |a|", "4 and −2"],
          ],
        },
        {
          type: "callout",
          title: "Factor out b first",
          text: "In f(θ) = sin(2θ + π), the phase shift is not −π. Factor first: sin(2θ + π) = sin(2(θ + π/2)), so c = π/2 and the phase shift is −π/2: the graph moves π/2 units to the left.",
        },
      ],
      takeaway: "Write the function as a sin(b(θ + c)) + d before reading c.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-6-phase-shift",
      topicId: "precalculus-3-6",
      term: "Phase shift",
      definition:
        "The graph of the additive transformation g(θ) = sin(θ + c) of the sine function f(θ) = sin θ is a horizontal translation, or phase shift, of the graph of f by −c units. The same transformation of the cosine function yields the same result.",
      source: "CED 3.6.A.3",
    },
  ],
  connections: [
    {
      id: "precalculus-3-6-c1",
      topicId: "precalculus-3-6",
      type: "Look back",
      title: "Transformations of any function",
      body: "Topic 1.12 showed that f(x) + k translates vertically, f(x + h) translates horizontally, a·f(x) dilates vertically, and f(bx) dilates horizontally. The same four moves produce every sinusoidal function.",
      transferQuestion:
        "In Topic 1.12 terms, how is y = sin(θ − 2) related to y = sin θ?",
      feedback: "A horizontal translation 2 units to the right.",
      links: [
        {
          topicId: "precalculus-1-12",
          sectionId: "combining",
          label: "Review combining transformations",
        },
      ],
    },
    {
      id: "precalculus-3-6-c2",
      topicId: "precalculus-3-6",
      type: "Looking ahead",
      title: "Building models",
      body: "Topic 3.7 works backward: it estimates a, b, c, and d from data or a description of a periodic context.",
      transferQuestion:
        "A wave has maximum 10, minimum 2, and period 8. What are |a|, d, and |b| in a sin(b(t + c)) + d?",
      feedback: "|a| = 4, d = 6, and |b| = 2π/8 = π/4.",
      links: [
        {
          topicId: "precalculus-3-7",
          sectionId: "period-and-amplitude-from-data",
          label: "See data modeling",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-6"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-1-period",
      "precalculus-3-5-sinusoidal-function",
      "precalculus-3-5-amplitude",
      "precalculus-3-5-midline",
      "precalculus-3-6-phase-shift",
    ],
  },
};

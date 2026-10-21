// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-11",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 11,
  code: "3.11",
  title: "The Secant, Cosecant, and Cotangent Functions",
  period: "Unit 3",
  status: "ready",
  summary:
    "Secant, cosecant, and cotangent as reciprocals of cosine, sine, and tangent: where they are defined, their vertical asymptotes, their ranges, and the shapes of their graphs.",
  minutes: 11,
  learningGoals: [
    "3.11.A Identify key characteristics of functions that involve quotients of the sine and cosine functions.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Each of the three new functions is 1 divided by a familiar one. Wherever the familiar function is 0, its reciprocal has a vertical asymptote, and wherever the familiar function is small, its reciprocal is large.",
  context:
    "Topic 3.8 wrote tangent as the quotient sin θ/cos θ. This topic completes the set of quotients of sine and cosine, which Topic 3.12 then uses in identities.",
  sections: [
    {
      id: "secant-and-cosecant",
      title: "3.11.A · Secant and cosecant are reciprocals of cosine and sine.",
      conceptTitle: "Secant and cosecant",
      blocks: [
        {
          type: "paragraph",
          text: "The secant function, f(θ) = sec θ, is the reciprocal of the cosine function, where cos θ ≠ 0.",
        },
        {
          type: "paragraph",
          text: "The cosecant function, f(θ) = csc θ, is the reciprocal of the sine function, where sin θ ≠ 0.",
        },
        {
          type: "paragraph",
          text: "The graphs of the secant and cosecant functions have vertical asymptotes where cosine and sine are zero, respectively, and have a range of (−∞, −1] ∪ [1, ∞).",
        },
        {
          type: "graph",
          caption: "y = sec θ with y = cos θ (dashed)",
          alt: "U-shaped branches of the secant graph. Each branch touches the dashed cosine curve at a maximum or minimum of cosine, at y = 1 or y = −1, and approaches the vertical asymptotes at θ = ±π/2 and ±3π/2, where cosine is 0.",
          window: {
            x: [-6.283185307179586, 6.283185307179586],
            y: [-4, 4],
          },
          ticks: {
            x: [
              {
                at: -6.283185307179586,
                label: "−2π",
              },
              {
                at: -4.71238898038469,
                label: "−3π/2",
              },
              {
                at: -3.141592653589793,
                label: "−π",
              },
              {
                at: -1.5707963267948966,
                label: "−π/2",
              },
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
              expr: "cos(x)",
              dashed: true,
              color: 4,
              label: "cos θ",
              labelAt: -2.4,
              labelPosition: "s",
            },
            {
              expr: "sec(x)",
              label: "sec θ",
              labelAt: 0.9,
              labelPosition: "e",
            },
          ],
          asymptotes: [
            {
              x: -4.71238898038469,
            },
            {
              x: -1.5707963267948966,
            },
            {
              x: 1.5707963267948966,
            },
            {
              x: 4.71238898038469,
            },
          ],
        },
        {
          type: "paragraph",
          text: "Example: cos(π/3) = 1/2, so sec(π/3) = 2. sin(7π/6) = −1/2, so csc(7π/6) = −2. Where cos θ = ±1, sec θ = ±1 too, which is why the branches of the secant graph touch the cosine graph at its maximums and minimums.",
        },
      ],
      takeaway:
        "sec θ = 1/cos θ and csc θ = 1/sin θ; their outputs are never between −1 and 1.",
    },
    {
      id: "cotangent",
      title: "3.11.A · Cotangent is the reciprocal of tangent.",
      conceptTitle: "The cotangent function",
      blocks: [
        {
          type: "paragraph",
          text: "The cotangent function, f(θ) = cot θ, is the reciprocal of the tangent function, where tan θ ≠ 0. Equivalently, cot θ = (cos θ)/(sin θ), where sin θ ≠ 0.",
        },
        {
          type: "paragraph",
          text: "The graph of the cotangent function has vertical asymptotes for domain values where tan θ = 0 and is decreasing between consecutive asymptotes.",
        },
        {
          type: "graph",
          caption: "y = cot θ, with vertical asymptotes at multiples of π",
          alt: "Repeating decreasing branches. Each falls from positive infinity near one dashed asymptote at a multiple of π to negative infinity near the next, crossing the θ-axis halfway between, at π/2 + kπ.",
          window: {
            x: [-6.283185307179586, 6.283185307179586],
            y: [-4, 4],
          },
          ticks: {
            x: [
              {
                at: -6.283185307179586,
                label: "−2π",
              },
              {
                at: -4.71238898038469,
                label: "−3π/2",
              },
              {
                at: -3.141592653589793,
                label: "−π",
              },
              {
                at: -1.5707963267948966,
                label: "−π/2",
              },
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
              expr: "cot(x)",
              label: "y = cot θ",
              labelAt: 0.5,
              labelPosition: "e",
            },
          ],
          asymptotes: [
            {
              x: -6.283185307179586,
            },
            {
              x: -3.141592653589793,
            },
            {
              x: 0,
            },
            {
              x: 3.141592653589793,
            },
            {
              x: 6.283185307179586,
            },
          ],
          points: [
            {
              at: [1.5707963267948966, 0],
              label: "(π/2, 0)",
              position: "ne",
            },
          ],
        },
        {
          type: "table",
          caption: "Where each function is undefined, and why",
          columns: ["Function", "Defined as", "Vertical asymptotes"],
          rows: [
            ["sec θ", "1/cos θ", "θ = π/2 + kπ, where cos θ = 0"],
            ["csc θ", "1/sin θ", "θ = kπ, where sin θ = 0"],
            ["cot θ", "cos θ/sin θ", "θ = kπ, where sin θ = 0"],
          ],
        },
        {
          type: "callout",
          title: "Reciprocal is not inverse",
          text: "sec θ = 1/cos θ is a reciprocal. The notation cos⁻¹x means arccos x, the inverse function from Topic 3.9. They are different functions: sec 0 = 1, while arccos 0 = π/2.",
        },
      ],
      takeaway:
        "cot θ = cos θ/sin θ: zeros where cos θ = 0, asymptotes where sin θ = 0, decreasing in between.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-11-secant",
      topicId: "precalculus-3-11",
      term: "Secant function",
      definition:
        "The secant function, f(θ) = sec θ, is the reciprocal of the cosine function, where cos θ ≠ 0.",
      source: "CED 3.11.A.1",
    },
    {
      id: "precalculus-3-11-cosecant",
      topicId: "precalculus-3-11",
      term: "Cosecant function",
      definition:
        "The cosecant function, f(θ) = csc θ, is the reciprocal of the sine function, where sin θ ≠ 0.",
      source: "CED 3.11.A.2",
    },
    {
      id: "precalculus-3-11-cotangent",
      topicId: "precalculus-3-11",
      term: "Cotangent function",
      definition:
        "The cotangent function, f(θ) = cot θ, is the reciprocal of the tangent function, where tan θ ≠ 0. Equivalently, cot θ = (cos θ)/(sin θ), where sin θ ≠ 0.",
      source: "CED 3.11.A.4",
    },
  ],
  connections: [
    {
      id: "precalculus-3-11-c1",
      topicId: "precalculus-3-11",
      type: "Look back",
      title: "Where the denominator is zero",
      body: "Topic 3.8 found the asymptotes of tan θ = sin θ/cos θ where cos θ = 0. Cotangent flips the fraction, so its asymptotes move to where sin θ = 0.",
      transferQuestion:
        "Where does tan θ have zeros, and where does cot θ have asymptotes?",
      feedback: "Both at θ = kπ, where sin θ = 0.",
      links: [
        {
          topicId: "precalculus-3-8",
          sectionId: "tangent-characteristics",
          label: "Review the tangent graph",
        },
      ],
    },
    {
      id: "precalculus-3-11-c2",
      topicId: "precalculus-3-11",
      type: "Looking ahead",
      title: "Identities with reciprocals",
      body: "Topic 3.12 divides the Pythagorean identity by cos²θ to get tan²θ = sec²θ − 1, an identity that uses secant.",
      transferQuestion: "If cos θ = 1/3, what are sec θ and sec²θ − 1?",
      feedback: "sec θ = 3, and sec²θ − 1 = 8.",
      links: [
        {
          topicId: "precalculus-3-12",
          sectionId: "pythagorean-identity",
          label: "See the Pythagorean identity",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-11"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-11-secant",
      "precalculus-3-11-cosecant",
      "precalculus-3-11-cotangent",
    ],
  },
};

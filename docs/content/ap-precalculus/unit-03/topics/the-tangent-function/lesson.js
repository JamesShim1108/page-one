// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-8",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 8,
  code: "3.8",
  title: "The Tangent Function",
  period: "Unit 3",
  status: "ready",
  summary:
    "The tangent function as the slope of the terminal ray, its period of π, its vertical asymptotes, its increasing and changing concavity between asymptotes, and its additive and multiplicative transformations.",
  minutes: 13,
  learningGoals: [
    "3.8.A Construct representations of the tangent function using the unit circle.",
    "3.8.B Describe key characteristics of the tangent function.",
    "3.8.C Describe additive and multiplicative transformations involving the tangent function.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "The tangent function gives the slope of the terminal ray. The slope repeats every half turn and does not exist when the ray is vertical, so tangent has period π and a vertical asymptote every π units.",
  context:
    "Topic 3.2 defined the tangent of a single angle. This topic graphs it as a function and transforms it, using the same a, b, c, and d as the sinusoidal functions in Topic 3.6.",
  sections: [
    {
      id: "tangent-function",
      title: "3.8.A · The tangent function gives the slope of the terminal ray.",
      conceptTitle: "Tangent from the unit circle",
      blocks: [
        {
          type: "paragraph",
          text: "Given an angle of measure θ in standard position and a unit circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The tangent function, f(θ) = tan θ, gives the slope of the terminal ray.",
        },
        {
          type: "paragraph",
          text: "Because the slope of the terminal ray is the ratio of the change in the y-values to the change in the x-values between any two points on the ray, the tangent function is also the ratio of the sine function to the cosine function. Therefore, tan θ = (sin θ)/(cos θ), where cos θ ≠ 0.",
        },
        {
          type: "paragraph",
          text: "Example: if sin θ = −3/5 and cos θ = 4/5, then tan θ = (−3/5)/(4/5) = −3/4. The terminal ray points down and to the right, so its slope is negative.",
        },
      ],
      takeaway: "tan θ = slope of the terminal ray = sin θ/cos θ.",
    },
    {
      id: "tangent-characteristics",
      title:
        "3.8.B · Period π, asymptotes where cos θ = 0, always increasing between them.",
      conceptTitle: "Period, asymptotes, and concavity of tangent",
      blocks: [
        {
          type: "paragraph",
          text: "Because the slope values of the terminal ray repeat every one-half revolution of the circle, the tangent function has a period of π.",
        },
        {
          type: "paragraph",
          text: "The tangent function demonstrates periodic asymptotic behavior at input values θ = π/2 + kπ, for integer values of k, because cos θ = 0 at those values.",
        },
        {
          type: "paragraph",
          text: "The tangent function increases and its graph changes from concave down to concave up between consecutive asymptotes.",
        },
        {
          type: "graph",
          caption: "y = tan θ with its vertical asymptotes at θ = ±π/2 and ±3π/2",
          alt: "Repeating branches. Each branch rises from negative infinity near one dashed vertical asymptote to positive infinity near the next, passing through a zero at θ = −π, 0, and π, where it changes from concave down to concave up.",
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
              expr: "tan(x)",
              label: "y = tan θ",
              labelAt: 1.25,
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
          points: [
            {
              at: [0, 0],
              label: "(0, 0)",
              position: "se",
            },
            {
              at: [0.7853981633974483, 1],
              label: "(π/4, 1)",
              position: "e",
            },
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "On −π/2 < θ < π/2, tan θ is increasing; its graph is concave down for −π/2 < θ < 0 and concave up for 0 < θ < π/2, so (0, 0) is a point of inflection.",
        },
      ],
      takeaway: "Period π; asymptotes at π/2 + kπ; zeros and inflection points at kπ.",
    },
    {
      id: "tangent-transformations",
      title: "3.8.C · Transformations of tangent work like those of sine and cosine.",
      conceptTitle: "Transformations of the tangent function",
      blocks: [
        {
          type: "paragraph",
          text: "The graph of the additive transformation g(θ) = tan θ + d of the tangent function f(θ) = tan θ is a vertical translation of the graph of f and the line containing its points of inflection by d units.",
        },
        {
          type: "paragraph",
          text: "The graph of the additive transformation g(θ) = tan(θ + c) of the tangent function f(θ) = tan θ is a horizontal translation, or phase shift, of the graph of f by −c units.",
        },
        {
          type: "paragraph",
          text: "The graph of the multiplicative transformation g(θ) = a tan θ of the tangent function f(θ) = tan θ is a vertical dilation of the graph of f by a factor of |a|. If a < 0, the transformation involves a reflection over the x-axis.",
        },
        {
          type: "paragraph",
          text: "The graph of the multiplicative transformation g(θ) = tan(bθ) of the tangent function f(θ) = tan θ is a horizontal dilation of the graph of f and differs in period by a factor of |1/b|. If b < 0, the transformation involves a reflection over the y-axis.",
        },
        {
          type: "paragraph",
          text: "The graph of y = f(θ) = a tan(b(θ + c)) + d is a vertical dilation of the graph of y = tan θ by a factor of |a|, has a period of |1/b|π units, is a vertical shift of the line containing the points of inflection of the graph of y = tan θ by d units, and is a phase shift of −c units.",
        },
        {
          type: "graph",
          caption:
            "y = a tan(b(θ + c)) + d. Move the sliders to compare with y = tan θ (dashed).",
          alt: "A tangent graph starting as y = 2 tan(θ/2) + 1, with period 2π and inflection points on the line y = 1, drawn over the dashed graph of y = tan θ. Sliders change a, b, c, and d.",
          window: {
            x: [-6.283185307179586, 6.283185307179586],
            y: [-5, 5],
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
              expr: "tan(x)",
              dashed: true,
              color: 4,
            },
            {
              expr: "a tan(b(x + c)) + d",
              label: "f",
              labelAt: 2.4,
            },
          ],
          sliders: [
            {
              name: "a",
              min: -3,
              max: 3,
              step: 0.5,
              value: 2,
              label: "Vertical factor a",
            },
            {
              name: "b",
              min: 0.5,
              max: 3,
              step: 0.5,
              value: 0.5,
              label: "Period factor b",
            },
            {
              name: "c",
              min: -3.14,
              max: 3.14,
              step: 0.01,
              value: 0,
              label: "Shift c",
            },
            {
              name: "d",
              min: -2,
              max: 2,
              step: 0.5,
              value: 1,
              label: "Shift d",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Example: f(θ) = 3 tan(2θ) − 1 has period |1/2|π = π/2, and its points of inflection lie on y = −1. Its asymptotes are where 2θ = π/2 + kπ, that is, θ = π/4 + kπ/2.",
        },
      ],
      takeaway: "Period π/|b|; no amplitude, because tangent is unbounded.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-8-tangent-function",
      topicId: "precalculus-3-8",
      term: "Tangent function",
      definition:
        "Given an angle of measure θ in standard position and a unit circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The tangent function, f(θ) = tan θ, gives the slope of the terminal ray.",
      source: "CED 3.8.A.1",
    },
  ],
  connections: [
    {
      id: "precalculus-3-8-c1",
      topicId: "precalculus-3-8",
      type: "Look back",
      title: "Vertical asymptotes of quotients",
      body: "Topic 1.9 found vertical asymptotes of rational functions where the denominator is 0 and the numerator is not. tan θ = sin θ/cos θ has asymptotes for the same reason, wherever cos θ = 0.",
      transferQuestion: "Why is there no asymptote of tan θ at θ = π, where sin θ = 0?",
      feedback:
        "At θ = π the denominator cos θ = −1 is not 0, so tan π = 0 is a zero, not an asymptote.",
      links: [
        {
          topicId: "precalculus-1-9",
          sectionId: "where-asymptotes",
          label: "Review vertical asymptotes",
        },
      ],
    },
    {
      id: "precalculus-3-8-c2",
      topicId: "precalculus-3-8",
      type: "Looking ahead",
      title: "Undoing tangent",
      body: "Because tangent repeats every π, it has an inverse only on a restricted domain. Topic 3.9 restricts it to −π/2 < θ < π/2 to define the arctangent.",
      transferQuestion: "Which angle in −π/2 < θ < π/2 has tan θ = 1?",
      feedback: "θ = π/4.",
      links: [
        {
          topicId: "precalculus-3-9",
          sectionId: "restricted-domains",
          label: "See restricted domains",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-8"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-1-period",
      "precalculus-3-2-standard-position",
      "precalculus-3-2-terminal-ray",
      "precalculus-3-6-phase-shift",
      "precalculus-3-8-tangent-function",
    ],
  },
};

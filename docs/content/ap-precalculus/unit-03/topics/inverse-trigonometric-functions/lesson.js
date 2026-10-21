// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-9",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 9,
  code: "3.9",
  title: "Inverse Trigonometric Functions",
  period: "Unit 3",
  status: "ready",
  summary:
    "Arcsine, arccosine, and arctangent: why the trigonometric functions need restricted domains to be invertible, which domains are used, and how the output of an inverse trigonometric function is read as an angle.",
  minutes: 12,
  learningGoals: [
    "3.9.A Construct analytical and graphical representations of the inverse of the sine, cosine, and tangent functions over a restricted domain.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "An inverse trigonometric function takes a value of sine, cosine, or tangent and returns an angle. Because the original functions repeat, each inverse returns only the one angle that lies in an agreed restricted domain.",
  context:
    "Topic 2.8 found inverses by switching inputs and outputs, and required the function to be one-to-one. Sine, cosine, and tangent are periodic, so this topic restricts them before inverting.",
  sections: [
    {
      id: "inverse-trig-functions",
      title: "3.9.A · Inverse trigonometric functions switch inputs and outputs.",
      conceptTitle: "Arcsine, arccosine, and arctangent",
      blocks: [
        {
          type: "paragraph",
          text: "For inverse trigonometric functions, the input and output values are switched from their corresponding trigonometric functions, so the output value of an inverse trigonometric function is often interpreted as an angle measure and the input is a value in the range of the corresponding trigonometric function.",
        },
        {
          type: "paragraph",
          text: "The inverse trigonometric functions are called arcsine, arccosine, and arctangent (also represented as sin⁻¹x, cos⁻¹x, and tan⁻¹x). Because the corresponding trigonometric functions are periodic, they are only invertible if they have restricted domains.",
        },
        {
          type: "paragraph",
          text: "Example: sin(π/6) = 1/2, so arcsin(1/2) = π/6. The input 1/2 is a value of sine, and the output π/6 is an angle. The notation sin⁻¹x means the inverse function, not 1/sin x.",
        },
        {
          type: "callout",
          title: "In context",
          text: "A ramp rises 1.2 meters over a horizontal run of 6 meters, so the slope is tan θ = 0.2. The angle the ramp makes with the ground is θ = arctan(0.2) ≈ 0.197 radian.",
        },
      ],
      takeaway: "arcsin, arccos, and arctan take a ratio and return an angle.",
    },
    {
      id: "restricted-domains",
      title: "3.9.A · Each inverse uses a restricted domain of the original function.",
      conceptTitle: "Restricted domains and the graphs of the inverses",
      blocks: [
        {
          type: "paragraph",
          text: "In order to define their respective inverse functions, the domain of the sine function is restricted to [−π/2, π/2], the cosine function to [0, π], and the tangent function to (−π/2, π/2).",
        },
        {
          type: "table",
          caption: "Restricted domains and the resulting inverses",
          columns: ["Inverse", "Domain (input)", "Range (output angle)"],
          rows: [
            ["arcsin x", "−1 ≤ x ≤ 1", "−π/2 ≤ y ≤ π/2"],
            ["arccos x", "−1 ≤ x ≤ 1", "0 ≤ y ≤ π"],
            ["arctan x", "all real numbers", "−π/2 < y < π/2"],
          ],
        },
        {
          type: "paragraph",
          text: "On each restricted domain the function is one-to-one and still takes on every value in its range: sine and tangent increase on their intervals, and cosine decreases on [0, π]. So each output of the inverse is the one angle in the restricted domain with the given value.",
        },
        {
          type: "graph",
          caption:
            "y = sin x on [−π/2, π/2] and its inverse y = arcsin x, reflections of each other over y = x",
          alt: "An increasing S-shaped curve for sine from (−π/2, −1) to (π/2, 1), and its reflection over the dashed line y = x, the arcsine curve from (−1, −π/2) to (1, π/2).",
          window: {
            x: [-2, 2],
            y: [-2, 2],
          },
          ticks: {
            x: 0.5,
            y: 0.5,
          },
          height: 432,
          functions: [
            {
              expr: "x",
              dashed: true,
              color: 4,
            },
            {
              expr: "sin(x)",
              domain: [-1.5707963267948966, 1.5707963267948966],
              endpoints: ["closed", "closed"],
              color: 2,
              label: "sin x",
              labelAt: 1.2,
              labelPosition: "se",
            },
            {
              expr: "asin(x)",
              domain: [-1, 1],
              endpoints: ["closed", "closed"],
              label: "arcsin x",
              labelAt: 0.6,
              labelPosition: "nw",
            },
          ],
        },
        {
          type: "graph",
          caption: "y = arccos x (left) and y = arctan x (right)",
          alt: "On the left half, the decreasing arccosine curve from (−1, π) to (1, 0). The arctangent curve is increasing for all x and approaches the dashed horizontal asymptotes y = π/2 and y = −π/2.",
          window: {
            x: [-6, 6],
            y: [-2, 3.5],
          },
          ticks: {
            x: 1,
            y: [
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
            ],
          },
          functions: [
            {
              expr: "acos(x)",
              domain: [-1, 1],
              endpoints: ["closed", "closed"],
              color: 2,
              label: "arccos x",
              labelAt: -0.6,
              labelPosition: "ne",
            },
            {
              expr: "atan(x)",
              label: "arctan x",
              labelAt: 4,
              labelPosition: "s",
            },
          ],
          asymptotes: [
            {
              y: 1.5707963267948966,
            },
            {
              y: -1.5707963267948966,
            },
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "arcsin(sin(5π/6)) = π/6, not 5π/6, because the output of arcsine must lie in [−π/2, π/2], and sin(π/6) = sin(5π/6) = 1/2.",
        },
      ],
      takeaway:
        "arcsin and arctan return angles near 0 on either side; arccos returns angles from 0 to π.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-9-arcsine",
      topicId: "precalculus-3-9",
      term: "Arcsine",
      definition:
        "The inverse trigonometric functions are called arcsine, arccosine, and arctangent (also represented as sin⁻¹x, cos⁻¹x, and tan⁻¹x). Because the corresponding trigonometric functions are periodic, they are only invertible if they have restricted domains.",
      source: "CED 3.9.A.2",
    },
    {
      id: "precalculus-3-9-arccosine",
      topicId: "precalculus-3-9",
      term: "Arccosine",
      definition:
        "The inverse trigonometric functions are called arcsine, arccosine, and arctangent (also represented as sin⁻¹x, cos⁻¹x, and tan⁻¹x). Because the corresponding trigonometric functions are periodic, they are only invertible if they have restricted domains.",
      source: "CED 3.9.A.2",
    },
    {
      id: "precalculus-3-9-arctangent",
      topicId: "precalculus-3-9",
      term: "Arctangent",
      definition:
        "The inverse trigonometric functions are called arcsine, arccosine, and arctangent (also represented as sin⁻¹x, cos⁻¹x, and tan⁻¹x). Because the corresponding trigonometric functions are periodic, they are only invertible if they have restricted domains.",
      source: "CED 3.9.A.2",
    },
  ],
  connections: [
    {
      id: "precalculus-3-9-c1",
      topicId: "precalculus-3-9",
      type: "Look back",
      title: "Inverses need one-to-one functions",
      body: "Topic 2.8 explained that a function has an inverse only when each output comes from exactly one input. Restricting the domain makes sine, cosine, and tangent one-to-one.",
      transferQuestion:
        "How many inputs in 0 ≤ θ < 2π give sin θ = 1/2, and which one does arcsin(1/2) return?",
      feedback: "Two: π/6 and 5π/6. arcsin(1/2) returns π/6, the one in [−π/2, π/2].",
      links: [
        {
          topicId: "precalculus-2-8",
          sectionId: "invertible",
          label: "Review invertible functions",
        },
      ],
    },
    {
      id: "precalculus-3-9-c2",
      topicId: "precalculus-3-9",
      type: "Looking ahead",
      title: "Solving trigonometric equations",
      body: "Topic 3.10 uses the inverse functions to find one solution of an equation such as sin θ = 0.3, then uses periodicity and symmetry to find the rest.",
      transferQuestion:
        "arcsin(0.3) ≈ 0.305. What is the other solution of sin θ = 0.3 in [0, 2π)?",
      feedback: "π − 0.305 ≈ 2.837.",
      links: [
        {
          topicId: "precalculus-3-10",
          sectionId: "solving-equations",
          label: "See solving equations",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-9"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-9-arcsine",
      "precalculus-3-9-arccosine",
      "precalculus-3-9-arctangent",
    ],
  },
};

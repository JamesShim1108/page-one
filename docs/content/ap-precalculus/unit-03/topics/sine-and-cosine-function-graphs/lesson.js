// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-4",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 4,
  code: "3.4",
  title: "Sine and Cosine Function Graphs",
  period: "Unit 3",
  status: "ready",
  summary:
    "The sine and cosine functions as the vertical and horizontal displacements of a point moving around the unit circle, their domains, their outputs between −1 and 1, and how to sketch their graphs.",
  minutes: 11,
  learningGoals: [
    "3.4.A Construct representations of the sine and cosine functions using the unit circle.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "As an angle θ grows, the point P where its terminal ray meets the unit circle travels around and around. Plotting P's y-coordinate against θ gives the graph of sine; plotting its x-coordinate gives the graph of cosine.",
  context:
    "Topics 3.2 and 3.3 found sine and cosine one angle at a time. This topic treats them as functions of θ and turns the unit circle into the two graphs used for the rest of the unit.",
  sections: [
    {
      id: "sine-function",
      title:
        "3.4.A · The sine function gives the vertical displacement of P from the x-axis.",
      conceptTitle: "The sine function and its graph",
      blocks: [
        {
          type: "paragraph",
          text: "Given an angle of measure θ in standard position and a unit circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The sine function, f(θ) = sin θ, gives the y-coordinate, or vertical displacement from the x-axis, of point P. The domain of the sine function is all real numbers.",
        },
        {
          type: "paragraph",
          text: "As the input values, or angle measures, of the sine function increase, the output values oscillate between −1 and 1, taking every value in between and tracking the vertical displacement of points on the unit circle from the x-axis.",
        },
        {
          type: "graph",
          caption:
            "y = sin θ. Move the slider to send P around the unit circle; the marked point shows (a, sin a).",
          alt: "A wave that starts at the origin, rises to 1 at π/2, returns to 0 at π, falls to −1 at 3π/2, and returns to 0 at 2π. The same shape repeats for negative angles. A marked point sits on the curve at the slider's angle.",
          window: {
            x: [-6.583185307179586, 6.583185307179586],
            y: [-1.6, 1.6],
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
            y: 0.5,
          },
          axisLabels: {
            x: "θ",
            y: "y",
          },
          functions: [
            {
              expr: "sin(x)",
              label: "y = sin θ",
              labelAt: -3.6,
              labelPosition: "ne",
            },
          ],
          sliders: [
            {
              name: "a",
              min: 0,
              max: 6.28,
              step: 0.01,
              value: 0.79,
              label: "Angle",
            },
          ],
          points: [
            {
              at: ["a", "sin(a)"],
              label: "({a}, {sin(a)})",
              position: "se",
            },
          ],
        },
        {
          type: "table",
          caption: "Where P is on the unit circle and the value of sin θ",
          columns: ["θ", "0", "π/2", "π", "3π/2", "2π"],
          rows: [
            ["P", "(1, 0)", "(0, 1)", "(−1, 0)", "(0, −1)", "(1, 0)"],
            ["sin θ", "0", "1", "0", "−1", "0"],
          ],
        },
      ],
      takeaway:
        "sin θ is P's height above or below the x-axis; it never leaves −1 ≤ y ≤ 1.",
    },
    {
      id: "cosine-function",
      title:
        "3.4.A · The cosine function gives the horizontal displacement of P from the y-axis.",
      conceptTitle: "The cosine function and its graph",
      blocks: [
        {
          type: "paragraph",
          text: "Given an angle of measure θ in standard position and a unit circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The cosine function, f(θ) = cos θ, gives the x-coordinate, or horizontal displacement from the y-axis, of point P. The domain of the cosine function is all real numbers.",
        },
        {
          type: "paragraph",
          text: "As the input values, or angle measures, of the cosine function increase, the output values oscillate between −1 and 1, taking every value in between and tracking the horizontal displacement of points on the unit circle from the y-axis.",
        },
        {
          type: "graph",
          caption: "y = cos θ (solid) and y = sin θ (dashed)",
          alt: "Two waves. The solid cosine wave starts at 1 when θ = 0, falls to 0 at π/2, to −1 at π, back to 0 at 3π/2, and 1 at 2π. The dashed sine wave has the same shape, a quarter turn later.",
          window: {
            x: [-6.583185307179586, 6.583185307179586],
            y: [-1.6, 1.6],
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
            y: 0.5,
          },
          axisLabels: {
            x: "θ",
            y: "y",
          },
          functions: [
            {
              expr: "cos(x)",
              label: "cos θ",
              labelAt: 0.4,
              labelPosition: "ne",
            },
            {
              expr: "sin(x)",
              label: "sin θ",
              color: 2,
              dashed: true,
              labelAt: 1.9,
              labelPosition: "ne",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Example: as θ increases from π to 3π/2, P moves from (−1, 0) to (0, −1). Its x-coordinate goes from −1 to 0, so cos θ increases, while its y-coordinate goes from 0 to −1, so sin θ decreases.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "On 0 < θ < π/2, cos θ is decreasing because P moves toward the y-axis, so its horizontal displacement from the y-axis shrinks from 1 to 0.",
        },
      ],
      takeaway:
        "cos θ is P's horizontal position; sine and cosine have the same shape, a quarter turn apart.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-4-sine-function",
      topicId: "precalculus-3-4",
      term: "Sine function",
      definition:
        "Given an angle of measure θ in standard position and a unit circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The sine function, f(θ) = sin θ, gives the y-coordinate, or vertical displacement from the x-axis, of point P. The domain of the sine function is all real numbers.",
      source: "CED 3.4.A.1",
    },
    {
      id: "precalculus-3-4-cosine-function",
      topicId: "precalculus-3-4",
      term: "Cosine function",
      definition:
        "Given an angle of measure θ in standard position and a unit circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The cosine function, f(θ) = cos θ, gives the x-coordinate, or horizontal displacement from the y-axis, of point P. The domain of the cosine function is all real numbers.",
      source: "CED 3.4.A.3",
    },
  ],
  connections: [
    {
      id: "precalculus-3-4-c1",
      topicId: "precalculus-3-4",
      type: "Look back",
      title: "Exact values become points",
      body: "The exact values from Topic 3.3 give points on these graphs. For example, (π/6, 1/2) is on the graph of y = sin θ and (π/6, √3/2) is on the graph of y = cos θ.",
      transferQuestion: "Name the point on the graph of y = cos θ with θ = 2π/3.",
      feedback: "(2π/3, −1/2), because cos(2π/3) = −1/2.",
      links: [
        {
          topicId: "precalculus-3-3",
          sectionId: "special-angles",
          label: "Review exact values",
        },
      ],
    },
    {
      id: "precalculus-3-4-c2",
      topicId: "precalculus-3-4",
      type: "Looking ahead",
      title: "Sinusoidal functions",
      body: "Topic 3.5 calls sine and cosine sinusoidal functions and names their period, frequency, amplitude, and midline.",
      transferQuestion:
        "From the graph, after how long an interval of θ does y = sin θ start to repeat?",
      feedback: "2π.",
      links: [
        {
          topicId: "precalculus-3-5",
          sectionId: "sinusoidal-functions",
          label: "See sinusoidal functions",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-4"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-1-period",
      "precalculus-3-2-standard-position",
      "precalculus-3-2-terminal-ray",
      "precalculus-3-4-sine-function",
      "precalculus-3-4-cosine-function",
    ],
  },
};

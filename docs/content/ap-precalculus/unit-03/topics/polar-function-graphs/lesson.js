// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-14",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 14,
  code: "3.14",
  title: "Polar Function Graphs",
  period: "Unit 3",
  status: "ready",
  summary:
    "Graphing r = f(θ) in polar coordinates: reading angle as direction and output as signed radius, connecting the rectangular graph of r against θ to the polar curve, and restricting the domain to draw part of a curve.",
  minutes: 13,
  learningGoals: ["3.14.A Construct graphs of polar functions."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A polar function turns each angle into a distance. Sweep θ around the origin and move out (or back) by r = f(θ): circles, cardioids, and roses all come from that one rule.",
  context:
    "Topic 3.13 plotted single points (r, θ). Here r depends on θ, so the points form a curve. The rectangular graph of r against θ is the best tool for predicting the polar picture.",
  sections: [
    {
      id: "polar-graphs",
      title: "3.14.A · Input is an angle; output is a signed radius.",
      conceptTitle: "Graphing r = f(θ)",
      blocks: [
        {
          type: "paragraph",
          text: "The graph of the function r = f(θ) in polar coordinates consists of input-output pairs of values where the input values are angle measures and the output values are radii.",
        },
        {
          type: "paragraph",
          text: "When graphing polar functions in the form of r = f(θ), changes in input values relate to changes in angle measures from the polar axis, and changes in output values relate to changes in signed radial displacements from the origin.",
        },
        {
          type: "graph",
          caption: "r = 2 + 2 cos θ graphed with θ on the horizontal axis",
          alt: "A cosine-shaped wave from r = 4 at θ = 0 down to r = 0 at θ = π and back up to r = 4 at θ = 2π.",
          window: {
            x: [-0.3, 6.583185307179586],
            y: [-1, 5],
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
            y: "r",
          },
          functions: [
            {
              expr: "2 + 2cos(x)",
              label: "r = f(θ)",
              labelAt: 5.3,
              labelPosition: "nw",
            },
          ],
          points: [
            {
              at: [0, 4],
              label: "(0, 4)",
              position: "e",
            },
            {
              at: [1.5707963267948966, 2],
              label: "(π/2, 2)",
              position: "ne",
            },
            {
              at: [3.141592653589793, 0],
              label: "(π, 0)",
              position: "n",
            },
          ],
        },
        {
          type: "graph",
          caption:
            "The same function in polar coordinates. Move the slider to trace the curve from θ = 0.",
          alt: "A heart-shaped curve called a cardioid on a polar grid. It starts 4 units out on the polar axis, passes 2 units up the positive y-axis, reaches the origin at θ = π, and returns symmetrically below the axis.",
          window: {
            x: [-2, 5],
            y: [-3.5, 3.5],
          },
          ticks: {
            x: 1,
            y: 1,
          },
          grid: "polar",
          height: 432,
          polar: [
            {
              expr: "2 + 2cos(θ)",
              color: 4,
              dashed: true,
            },
            {
              expr: "2 + 2cos(θ)",
              domain: [0, "t"],
              label: "r = 2 + 2 cos θ",
              labelAt: 0.6,
              labelPosition: "ne",
            },
          ],
          sliders: [
            {
              name: "t",
              min: 0.05,
              max: 6.28,
              step: 0.01,
              value: 2.1,
              label: "Trace to θ",
            },
          ],
          points: [
            {
              at: [4, 0],
              label: "(4, 0)",
              position: "se",
            },
            {
              at: [0, 2],
              label: "(2, π/2)",
              position: "ne",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Reading the two graphs together: as θ increases from 0 to π, r decreases from 4 to 0, so the curve sweeps counterclockwise while moving in toward the origin. From π to 2π, r increases back to 4.",
        },
        {
          type: "table",
          caption: "Common polar graphs",
          columns: ["Function", "Shape"],
          rows: [
            ["r = 3", "Circle of radius 3 centered at the origin"],
            ["r = 2 + 2 cos θ", "Cardioid through the origin"],
            ["r = 1 + 2 cos θ", "Limaçon with an inner loop where r < 0"],
            ["r = 3 sin(2θ)", "Rose with four petals"],
          ],
        },
      ],
      takeaway:
        "Sweep the angle, set the signed distance, and use the r–θ graph to predict the shape.",
    },
    {
      id: "restricting-the-domain",
      title: "3.14.A · Restrict the domain to draw part of a polar graph.",
      conceptTitle: "Restricting the domain and negative radii",
      blocks: [
        {
          type: "paragraph",
          text: "The domain of the polar function r = f(θ), given graphically, can be restricted to a desired portion of the function by selecting endpoints corresponding to the desired angle and radius.",
        },
        {
          type: "graph",
          caption:
            "r = 3 sin(2θ): the whole rose (dashed) and the petal drawn by 0 ≤ θ ≤ π/2",
          alt: "A four-petal rose on a polar grid, drawn dashed, with one petal in Quadrant I drawn solid. The solid petal starts and ends at the origin and reaches 3 units out at θ = π/4.",
          window: {
            x: [-3.5, 3.5],
            y: [-3.5, 3.5],
          },
          ticks: {
            x: 1,
            y: 1,
          },
          grid: "polar",
          height: 432,
          polar: [
            {
              expr: "3sin(2θ)",
              color: 4,
              dashed: true,
            },
            {
              expr: "3sin(2θ)",
              domain: [0, "pi/2"],
              label: "0 ≤ θ ≤ π/2",
              labelAt: 0.785,
              labelPosition: "ne",
            },
          ],
        },
        {
          type: "paragraph",
          text: "For r = 3 sin(2θ), r = 0 at θ = 0 and θ = π/2 and r = 3 at θ = π/4, so 0 ≤ θ ≤ π/2 draws exactly the petal in Quadrant I. On π/2 < θ < π, sin(2θ) < 0, so r < 0 and those points land in the opposite quadrant, Quadrant IV.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "For π/2 < θ < π, r = 3 sin(2θ) is negative, so the points of the graph are in Quadrant IV, opposite the terminal rays of θ in Quadrant II.",
        },
      ],
      takeaway:
        "Pick θ-endpoints where r = 0 (or at the desired radius) to isolate a piece; negative r reflects through the origin.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-14-polar-function",
      topicId: "precalculus-3-14",
      term: "Polar function",
      definition:
        "The graph of the function r = f(θ) in polar coordinates consists of input-output pairs of values where the input values are angle measures and the output values are radii.",
      source: "CED 3.14.A.1",
    },
  ],
  connections: [
    {
      id: "precalculus-3-14-c1",
      topicId: "precalculus-3-14",
      type: "Look back",
      title: "Plotting polar points",
      body: "Topic 3.13 placed points with negative r on the opposite side of the origin. A polar graph is many such points, so the same rule explains loops and petals.",
      transferQuestion:
        "For r = 1 + 2 cos θ, find r at θ = π and say where the point is.",
      feedback:
        "r = 1 − 2 = −1, so the point is 1 unit along the ray opposite π, at (1, 0) in rectangular coordinates.",
      links: [
        {
          topicId: "precalculus-3-13",
          sectionId: "polar-coordinates",
          label: "Review polar coordinates",
        },
      ],
    },
    {
      id: "precalculus-3-14-c2",
      topicId: "precalculus-3-14",
      type: "Looking ahead",
      title: "Moving toward or away from the origin",
      body: "Topic 3.15 uses the sign of r and whether r is increasing or decreasing to tell when the curve moves away from the origin, and it measures the average rate of change of r with respect to θ.",
      transferQuestion:
        "On 0 < θ < π, is the cardioid r = 2 + 2 cos θ moving toward or away from the origin?",
      feedback: "Toward: r is positive and decreasing.",
      links: [
        {
          topicId: "precalculus-3-15",
          sectionId: "increasing-and-decreasing-distance",
          label: "See distance from the origin",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-14"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-13-polar-coordinates",
      "precalculus-3-13-polar-axis",
      "precalculus-3-14-polar-function",
    ],
  },
};

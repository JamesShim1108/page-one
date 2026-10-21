// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-13",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 13,
  code: "3.13",
  title: "Trigonometry and Polar Coordinates",
  period: "Unit 3",
  status: "ready",
  summary:
    "The polar coordinate system, polar coordinates (r, θ) with positive and negative r, converting between polar and rectangular coordinates, and locating complex numbers with either system.",
  minutes: 13,
  learningGoals: [
    "3.13.A Determine the location of a point in the plane using both rectangular and polar coordinates.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A point can be located by how far right and up it is, (x, y), or by which direction it lies in and how far along that direction, (r, θ). Sine and cosine translate between the two descriptions.",
  context:
    "Topic 3.3 found the point (r cos θ, r sin θ) on a circle of radius r. Polar coordinates name that point directly as (r, θ), and Topics 3.14 and 3.15 graph functions in this system.",
  sections: [
    {
      id: "polar-coordinates",
      title: "3.13.A · Polar coordinates give a direction and a signed distance.",
      conceptTitle: "The polar coordinate system",
      blocks: [
        {
          type: "paragraph",
          text: "The polar coordinate system is based on a grid of circles centered at the origin and on lines through the origin. The positive x-axis is called the polar axis. Polar coordinates of a point are defined as an ordered pair, (r, θ). The value of θ is given by the measure of an angle in standard position whose terminal ray lies in a line that passes through the point, and r is the radial displacement of the point from the origin.",
        },
        {
          type: "paragraph",
          text: "Positive values of r indicate radial displacement from the origin along the terminal ray of the angle θ. Negative values of r indicate radial displacement from the origin along the line containing the terminal ray of the angle θ, but in the opposite direction of the terminal ray of the angle θ. In the polar coordinate system, the same point can be represented many ways with combinations of positive and negative values of r and θ.",
        },
        {
          type: "graph",
          caption: "Points A(3, π/4) and B(−2, π/3) on a polar grid",
          alt: "A polar grid of circles and rays. Point A is 3 units out along the ray at π/4 in Quadrant I. A dashed segment shows the ray at π/3; point B is 2 units from the origin in the opposite direction, in Quadrant III.",
          window: {
            x: [-4, 4],
            y: [-4, 4],
          },
          ticks: {
            x: 1,
            y: 1,
          },
          grid: "polar",
          height: 432,
          segments: [
            {
              from: [0, 0],
              to: [2, 3.4641016151377544],
              dashed: true,
              color: 4,
              label: "θ = π/3",
              labelAt: 1.6,
              labelPosition: "e",
            },
            {
              from: [0, 0],
              to: [-1, -1.7320508075688772],
              color: 2,
            },
          ],
          points: [
            {
              at: [2.121320343559643, 2.1213203435596424],
              label: "A(3, π/4)",
              position: "e",
            },
            {
              at: [-1, -1.7320508075688772],
              label: "B(−2, π/3)",
              position: "w",
            },
          ],
        },
        {
          type: "paragraph",
          text: "B is on the line through the ray θ = π/3, but r = −2 places it 2 units in the opposite direction. The same point B is also (2, 4π/3), (2, −2π/3), and (−2, π/3 + 2π).",
        },
      ],
      takeaway: "θ picks the line; the sign of r picks the direction along it.",
    },
    {
      id: "converting-coordinates",
      title: "3.13.A · Converting between polar and rectangular coordinates.",
      conceptTitle: "Converting coordinates",
      blocks: [
        {
          type: "paragraph",
          text: "The coordinates of a point in the polar coordinate system, (r, θ), can be converted to coordinates in the rectangular coordinate system, (x, y), using x = r cos θ and y = r sin θ.",
        },
        {
          type: "paragraph",
          text: "The coordinates of a point in the rectangular coordinate system, (x, y), can be converted to coordinates in the polar coordinate system, (r, θ), using r = √(x² + y²) and θ = arctan(y/x) for x > 0 or θ = arctan(y/x) + π for x < 0.",
        },
        {
          type: "table",
          caption: "Examples of converting",
          columns: ["Given", "Work", "Result"],
          rows: [
            [
              "Polar (−2, π/3)",
              "x = −2 cos(π/3), y = −2 sin(π/3)",
              "Rectangular (−1, −√3)",
            ],
            [
              "Rectangular (−3, 3)",
              "r = √(9 + 9); x < 0, so θ = arctan(−1) + π",
              "Polar (3√2, 3π/4)",
            ],
            [
              "Rectangular (4, −4)",
              "r = √32; x > 0, so θ = arctan(−1)",
              "Polar (4√2, −π/4)",
            ],
          ],
        },
        {
          type: "callout",
          title: "Why add π when x < 0",
          text: "Arctangent returns angles between −π/2 and π/2, which point into Quadrants I and IV. A point with x < 0 is in Quadrant II or III, so its direction is π more than the arctangent value.",
        },
      ],
      takeaway:
        "x = r cos θ, y = r sin θ; r = √(x² + y²), θ = arctan(y/x), plus π when x < 0.",
    },
    {
      id: "complex-numbers",
      title: "3.13.A · Complex numbers are points in the complex plane.",
      conceptTitle: "Complex numbers in rectangular and polar form",
      blocks: [
        {
          type: "paragraph",
          text: "A complex number can be understood as a point in the complex plane and can be determined by its corresponding rectangular or polar coordinates. When the complex number has the rectangular coordinates (a, b), it can be expressed as a + bi. When the complex number has polar coordinates (r, θ), it can be expressed as (r cos θ) + i(r sin θ).",
        },
        {
          type: "paragraph",
          text: "Example: z = 1 − √3 i is the point (1, −√3). Its distance from the origin is √(1 + 3) = 2, and since x > 0, θ = arctan(−√3) = −π/3. So z = 2 cos(−π/3) + i(2 sin(−π/3)), which can also be written with θ = 5π/3.",
        },
      ],
      takeaway: "a + bi ↔ (a, b); (r, θ) ↔ (r cos θ) + i(r sin θ).",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-13-polar-coordinates",
      topicId: "precalculus-3-13",
      term: "Polar coordinates",
      definition:
        "The polar coordinate system is based on a grid of circles centered at the origin and on lines through the origin. The positive x-axis is called the polar axis. Polar coordinates of a point are defined as an ordered pair, (r, θ). The value of θ is given by the measure of an angle in standard position whose terminal ray lies in a line that passes through the point, and r is the radial displacement of the point from the origin.",
      source: "CED 3.13.A.1",
    },
    {
      id: "precalculus-3-13-polar-axis",
      topicId: "precalculus-3-13",
      term: "Polar axis",
      definition: "The positive x-axis is called the polar axis.",
      source: "CED 3.13.A.1",
    },
    {
      id: "precalculus-3-13-complex-plane",
      topicId: "precalculus-3-13",
      term: "Complex plane",
      definition:
        "A complex number can be understood as a point in the complex plane and can be determined by its corresponding rectangular or polar coordinates.",
      source: "CED 3.13.A.4",
    },
  ],
  connections: [
    {
      id: "precalculus-3-13-c1",
      topicId: "precalculus-3-13",
      type: "Look back",
      title: "Points on a circle",
      body: "Topic 3.3 showed that the terminal ray of θ meets a circle of radius r at (r cos θ, r sin θ). Converting polar to rectangular is the same formula.",
      transferQuestion: "Convert the polar point (10, π/6) to rectangular coordinates.",
      feedback: "(10 cos(π/6), 10 sin(π/6)) = (5√3, 5).",
      links: [
        {
          topicId: "precalculus-3-3",
          sectionId: "points-on-a-circle",
          label: "Review points on a circle",
        },
      ],
    },
    {
      id: "precalculus-3-13-c2",
      topicId: "precalculus-3-13",
      type: "Looking ahead",
      title: "Polar functions",
      body: "Topic 3.14 lets r depend on θ, as in r = 2 + 2 cos θ, and plots all the points (r, θ) to draw a curve.",
      transferQuestion:
        "For r = 2 + 2 cos θ, what is the point when θ = π/2, in polar coordinates?",
      feedback: "r = 2 + 0 = 2, so (2, π/2).",
      links: [
        {
          topicId: "precalculus-3-14",
          sectionId: "polar-graphs",
          label: "See polar graphs",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-13"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-2-standard-position",
      "precalculus-3-2-terminal-ray",
      "precalculus-3-9-arctangent",
      "precalculus-3-13-polar-coordinates",
      "precalculus-3-13-polar-axis",
      "precalculus-3-13-complex-plane",
    ],
  },
};

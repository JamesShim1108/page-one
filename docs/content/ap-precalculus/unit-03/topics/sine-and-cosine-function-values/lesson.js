// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-3",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 3,
  code: "3.3",
  title: "Sine and Cosine Function Values",
  period: "Unit 3",
  status: "ready",
  summary:
    "The coordinates (r cos θ, r sin θ) of a point on a circle centered at the origin, and exact sine and cosine values for multiples of π/4 and π/6 from special right triangles.",
  minutes: 12,
  learningGoals: [
    "3.3.A Determine coordinates of points on a circle centered at the origin.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Every point on a circle of radius r centered at the origin can be written as (r cos θ, r sin θ). For angles that are multiples of π/4 and π/6, two special triangles give the exact values of the cosine and sine, and the quadrant gives their signs.",
  context:
    "Topic 3.2 defined sine and cosine as ratios. This topic turns the ratios around to find coordinates, and builds the exact values that AP Exam questions without a calculator expect.",
  sections: [
    {
      id: "points-on-a-circle",
      title:
        "3.3.A · A point on a circle of radius r has coordinates (r cos θ, r sin θ).",
      conceptTitle: "Coordinates of points on a circle",
      blocks: [
        {
          type: "paragraph",
          text: "Given an angle of measure θ in standard position and a circle with radius r centered at the origin, there is a point, P, where the terminal ray intersects the circle. The coordinates of point P are (r cos θ, r sin θ).",
        },
        {
          type: "paragraph",
          text: "This follows from Topic 3.2: cos θ = x/r and sin θ = y/r, so x = r cos θ and y = r sin θ.",
        },
        {
          type: "paragraph",
          text: "Example: on a circle of radius 6, the terminal ray of θ = 5π/6 meets the circle at (6 cos(5π/6), 6 sin(5π/6)) = (6(−√3/2), 6(1/2)) = (−3√3, 3).",
        },
        {
          type: "callout",
          title: "In context",
          text: "A Ferris wheel of radius 20 meters has its center 25 meters above the ground. A seat that starts level with the center, on the right side, and turns counterclockwise through an angle θ is 20 sin θ meters above the center, so its height is 25 + 20 sin θ meters. After θ = π/6 the seat is 25 + 20(1/2) = 35 meters high.",
        },
      ],
      takeaway: "x = r cos θ and y = r sin θ.",
    },
    {
      id: "special-angles",
      title: "3.3.A · Special triangles give exact values for multiples of π/4 and π/6.",
      conceptTitle: "Exact values from special right triangles",
      blocks: [
        {
          type: "paragraph",
          text: "The geometry of isosceles right and equilateral triangles, while attending to the signs of the values based on the quadrant of the angle, can be used to find exact values for the cosine and sine of angles that are multiples of π/4 and π/6 radians and whose terminal rays do not lie on an axis.",
        },
        {
          type: "paragraph",
          text: "An isosceles right triangle with hypotenuse 1 has legs √2/2, which gives the values at π/4. Cutting an equilateral triangle with side 1 in half gives legs 1/2 and √3/2, which gives the values at π/6 and π/3.",
        },
        {
          type: "table",
          caption: "Exact values in Quadrant I",
          columns: ["θ", "π/6", "π/4", "π/3"],
          rows: [
            ["cos θ", "√3/2", "√2/2", "1/2"],
            ["sin θ", "1/2", "√2/2", "√3/2"],
          ],
        },
        {
          type: "graph",
          caption:
            "Points on the unit circle at π/6, π/4, π/3, and their reflections into the other quadrants",
          alt: "The unit circle with marked points. In Quadrant I they are at about (0.87, 0.5), (0.71, 0.71), and (0.5, 0.87). The same three points are reflected into Quadrants II, III, and IV.",
          window: {
            x: [-1.5, 1.5],
            y: [-1.5, 1.5],
          },
          ticks: {
            x: 0.5,
            y: 0.5,
          },
          height: 432,
          polar: [
            {
              expr: "1",
              color: 4,
            },
          ],
          points: [
            {
              at: [0.8660254037844386, 0.5],
              label: "π/6",
              position: "e",
            },
            {
              at: [0.7071067811865476, 0.7071067811865476],
              label: "π/4",
              position: "ne",
            },
            {
              at: [0.5, 0.8660254037844386],
              label: "π/3",
              position: "n",
            },
            {
              at: [-0.8660254037844386, 0.5],
              label: "5π/6",
              position: "w",
            },
            {
              at: [-0.7071067811865476, 0.7071067811865476],
              label: "3π/4",
              position: "nw",
            },
            {
              at: [-0.5, 0.8660254037844386],
              label: "2π/3",
              position: "n",
            },
            {
              at: [-0.8660254037844386, -0.5],
              label: "7π/6",
              position: "w",
            },
            {
              at: [-0.7071067811865476, -0.7071067811865476],
              label: "5π/4",
              position: "sw",
            },
            {
              at: [-0.5, -0.8660254037844386],
              label: "4π/3",
              position: "s",
            },
            {
              at: [0.8660254037844386, -0.5],
              label: "11π/6",
              position: "e",
            },
            {
              at: [0.7071067811865476, -0.7071067811865476],
              label: "7π/4",
              position: "se",
            },
            {
              at: [0.5, -0.8660254037844386],
              label: "5π/3",
              position: "s",
            },
          ],
        },
        {
          type: "paragraph",
          text: "To find an exact value outside Quadrant I, find the Quadrant I angle whose terminal ray makes the same acute angle with the x-axis, then attach the sign for the quadrant. For example, 7π/6 is π/6 past π, in Quadrant III, so cos(7π/6) = −√3/2 and sin(7π/6) = −1/2.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "sin(5π/3) = −√3/2, because the terminal ray of 5π/3 is in Quadrant IV, where the y-coordinate of P is negative.",
        },
      ],
      takeaway:
        "Use the triangle for the size of the value and the quadrant for its sign.",
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "precalculus-3-3-c1",
      topicId: "precalculus-3-3",
      type: "Look back",
      title: "Sine and cosine as ratios",
      body: "Topic 3.2 defined cos θ as x/r and sin θ as y/r. Solving each ratio for the coordinate gives the formula in this topic.",
      transferQuestion:
        "If sin θ = 0.6 on a circle of radius 15, what is the y-coordinate of P?",
      feedback: "y = r sin θ = 15(0.6) = 9.",
      links: [
        {
          topicId: "precalculus-3-2",
          sectionId: "sine-cosine-tangent",
          label: "Review the definitions",
        },
      ],
    },
    {
      id: "precalculus-3-3-c2",
      topicId: "precalculus-3-3",
      type: "Looking ahead",
      title: "From values to graphs",
      body: "Topic 3.4 plots sin θ and cos θ for every angle θ. The exact values in this topic become the points that make those graphs easy to sketch.",
      transferQuestion:
        "Using exact values, what are sin 0, sin(π/2), sin π, and sin(3π/2)?",
      feedback: "0, 1, 0, and −1.",
      links: [
        {
          topicId: "precalculus-3-4",
          sectionId: "sine-function",
          label: "See the sine function",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-3"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-2-standard-position",
      "precalculus-3-2-terminal-ray",
      "precalculus-3-2-sine",
      "precalculus-3-2-cosine",
    ],
  },
};

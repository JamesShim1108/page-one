// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-2",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 2,
  code: "3.2",
  title: "Sine, Cosine, and Tangent",
  period: "Unit 3",
  status: "ready",
  summary:
    "Angles in standard position, terminal rays, radian measure, and the sine, cosine, and tangent of an angle defined from a point on a circle centered at the origin.",
  minutes: 12,
  learningGoals: [
    "3.2.A Determine the sine, cosine, and tangent of an angle using the unit circle.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "An angle in standard position picks out a terminal ray, and that ray meets any circle centered at the origin at a point P. Sine, cosine, and tangent are ratios built from P's coordinates and its distance from the origin.",
  context:
    "Topic 3.1 described periodic relationships in general. To build periodic functions, this topic measures angles as rotations and defines three ratios that repeat every time the rotation completes a full turn.",
  sections: [
    {
      id: "standard-position-and-radians",
      title: "3.2.A · Angles in standard position are measured in radians.",
      conceptTitle: "Standard position, terminal rays, and radians",
      blocks: [
        {
          type: "paragraph",
          text: "In the coordinate plane, an angle is in standard position when the vertex coincides with the origin and one ray coincides with the positive x-axis. The other ray is called the terminal ray. Positive and negative angle measures indicate rotations from the positive x-axis in the counterclockwise and clockwise direction, respectively. Angles in standard position that share a terminal ray differ by an integer number of revolutions.",
        },
        {
          type: "paragraph",
          text: "When considering a circle centered at the origin, the radian measure of an angle in standard position is the ratio of the length of the arc of the circle that the angle subtends to the radius of that same circle. For a unit circle, which has radius 1, one radian is the measure of the angle subtended at the center of the circle by an arc that has length 1.",
        },
        {
          type: "graph",
          caption:
            "An angle of 2π/3 in standard position, with its terminal ray meeting the unit circle at P",
          alt: "The unit circle centered at the origin. A ray from the origin points up and to the left, at about 120 degrees from the positive x-axis, and meets the circle at the point P near (−0.5, 0.87).",
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
            {
              expr: "0.25",
              domain: [0, "2pi/3"],
              color: 2,
              label: "2π/3",
              labelAt: 1,
              labelPosition: "ne",
            },
          ],
          segments: [
            {
              from: [0, 0],
              to: [-0.5, 0.866],
              label: "terminal ray",
              labelAt: -0.3,
              labelPosition: "w",
            },
          ],
          points: [
            {
              at: [-0.5, 0.866],
              label: "P",
              position: "nw",
            },
          ],
        },
        {
          type: "paragraph",
          text: "A full revolution subtends the whole circumference, 2πr, so it measures 2πr/r = 2π radians. Half a revolution is π, and a quarter revolution is π/2. The angles 2π/3, 2π/3 + 2π = 8π/3, and 2π/3 − 2π = −4π/3 all share the terminal ray shown above.",
        },
        {
          type: "callout",
          title: "Arc length from radians",
          text: "Because the radian measure θ is arc length divided by radius, the arc length on a circle of radius r is s = rθ. A 2-radian angle on a circle of radius 30 cm subtends an arc of 60 cm.",
        },
      ],
      takeaway:
        "Radian measure is arc length over radius; angles that differ by whole revolutions share a terminal ray.",
    },
    {
      id: "sine-cosine-tangent",
      title:
        "3.2.A · Sine, cosine, and tangent come from the point where the terminal ray meets the circle.",
      conceptTitle: "Sine, cosine, and tangent of an angle",
      blocks: [
        {
          type: "paragraph",
          text: "Given an angle in standard position and a circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The sine of the angle is the ratio of the vertical displacement of P from the x-axis to the distance between the origin and point P. Therefore, for a unit circle, the sine of the angle is the y-coordinate of point P.",
        },
        {
          type: "paragraph",
          text: "Given an angle in standard position and a circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The cosine of the angle is the ratio of the horizontal displacement of P from the y-axis to the distance between the origin and point P. Therefore, for a unit circle, the cosine of the angle is the x-coordinate of point P.",
        },
        {
          type: "paragraph",
          text: "Given an angle in standard position, the tangent of the angle is the slope, if it exists, of the terminal ray. Because the slope of the terminal ray is the ratio of the vertical displacement to the horizontal displacement over any interval, the tangent of the angle is the ratio of the y-coordinate to the x-coordinate of the point at which the terminal ray intersects the unit circle; alternately, it is the ratio of the angle's sine to its cosine.",
        },
        {
          type: "graph",
          caption:
            "The terminal ray of θ passes through P(−3, 4) on a circle of radius 5",
          alt: "A circle of radius 5 centered at the origin. A ray from the origin goes up and to the left through the point P at (−3, 4) on the circle. A dashed vertical segment drops from P to the x-axis.",
          window: {
            x: [-6, 6],
            y: [-6, 6],
          },
          ticks: {
            x: 1,
            y: 1,
          },
          height: 432,
          polar: [
            {
              expr: "5",
              color: 4,
            },
          ],
          segments: [
            {
              from: [0, 0],
              to: [-3, 4],
            },
            {
              from: [-3, 4],
              to: [-3, 0],
              dashed: true,
              color: 2,
            },
          ],
          points: [
            {
              at: [-3, 4],
              label: "P(−3, 4)",
              position: "nw",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Example: P is 5 units from the origin, since √((−3)² + 4²) = 5. So sin θ = 4/5, cos θ = −3/5, and tan θ = 4/(−3) = −4/3. The tangent is also (4/5)/(−3/5) = −4/3, the ratio of the sine to the cosine.",
        },
        {
          type: "table",
          caption:
            "Signs of sine, cosine, and tangent by the quadrant of the terminal ray",
          columns: ["Quadrant", "sin θ", "cos θ", "tan θ"],
          rows: [
            ["I", "+", "+", "+"],
            ["II", "+", "−", "−"],
            ["III", "−", "−", "+"],
            ["IV", "−", "+", "−"],
          ],
        },
        {
          type: "callout",
          title: "When the tangent does not exist",
          text: "If the terminal ray lies on the y-axis, as for θ = π/2, the ray is vertical, its slope does not exist, and tan θ is undefined. In that case cos θ = 0, so sin θ/cos θ is undefined too.",
        },
      ],
      takeaway:
        "sin θ = y/r, cos θ = x/r, tan θ = y/x; on the unit circle, P = (cos θ, sin θ).",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-2-standard-position",
      topicId: "precalculus-3-2",
      term: "Standard position",
      definition:
        "In the coordinate plane, an angle is in standard position when the vertex coincides with the origin and one ray coincides with the positive x-axis. The other ray is called the terminal ray.",
      source: "CED 3.2.A.1",
    },
    {
      id: "precalculus-3-2-terminal-ray",
      topicId: "precalculus-3-2",
      term: "Terminal ray",
      definition:
        "In the coordinate plane, an angle is in standard position when the vertex coincides with the origin and one ray coincides with the positive x-axis. The other ray is called the terminal ray. Positive and negative angle measures indicate rotations from the positive x-axis in the counterclockwise and clockwise direction, respectively. Angles in standard position that share a terminal ray differ by an integer number of revolutions.",
      source: "CED 3.2.A.1",
    },
    {
      id: "precalculus-3-2-radian",
      topicId: "precalculus-3-2",
      term: "Radian",
      definition:
        "When considering a circle centered at the origin, the radian measure of an angle in standard position is the ratio of the length of the arc of the circle that the angle subtends to the radius of that same circle. For a unit circle, which has radius 1, one radian is the measure of the angle subtended at the center of the circle by an arc that has length 1.",
      source: "CED 3.2.A.2",
    },
    {
      id: "precalculus-3-2-sine",
      topicId: "precalculus-3-2",
      term: "Sine",
      definition:
        "Given an angle in standard position and a circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The sine of the angle is the ratio of the vertical displacement of P from the x-axis to the distance between the origin and point P. Therefore, for a unit circle, the sine of the angle is the y-coordinate of point P.",
      source: "CED 3.2.A.3",
    },
    {
      id: "precalculus-3-2-cosine",
      topicId: "precalculus-3-2",
      term: "Cosine",
      definition:
        "Given an angle in standard position and a circle centered at the origin, there is a point, P, where the terminal ray intersects the circle. The cosine of the angle is the ratio of the horizontal displacement of P from the y-axis to the distance between the origin and point P. Therefore, for a unit circle, the cosine of the angle is the x-coordinate of point P.",
      source: "CED 3.2.A.4",
    },
    {
      id: "precalculus-3-2-tangent",
      topicId: "precalculus-3-2",
      term: "Tangent",
      definition:
        "Given an angle in standard position, the tangent of the angle is the slope, if it exists, of the terminal ray. Because the slope of the terminal ray is the ratio of the vertical displacement to the horizontal displacement over any interval, the tangent of the angle is the ratio of the y-coordinate to the x-coordinate of the point at which the terminal ray intersects the unit circle; alternately, it is the ratio of the angle's sine to its cosine.",
      source: "CED 3.2.A.5",
    },
  ],
  connections: [
    {
      id: "precalculus-3-2-c1",
      topicId: "precalculus-3-2",
      type: "Look back",
      title: "Slope as a ratio of changes",
      body: "Topic 1.2 measured rates of change as a ratio of changes. The tangent of an angle is exactly that ratio for the terminal ray: vertical change over horizontal change.",
      transferQuestion:
        "A terminal ray passes through (2, 5). What is the tangent of the angle?",
      feedback: "The slope from (0, 0) to (2, 5) is 5/2, so tan θ = 5/2.",
      links: [
        {
          topicId: "precalculus-1-2",
          sectionId: "average-rate",
          label: "Review average rate of change",
        },
      ],
    },
    {
      id: "precalculus-3-2-c2",
      topicId: "precalculus-3-2",
      type: "Looking ahead",
      title: "Exact coordinates",
      body: "Topic 3.3 finds exact values of sine and cosine for angles that are multiples of π/4 and π/6, and gives every point on a circle of radius r as (r cos θ, r sin θ).",
      transferQuestion:
        "On a circle of radius 2, the terminal ray of θ meets the circle at (r cos θ, r sin θ). What is that point when θ = 0?",
      feedback: "(2 cos 0, 2 sin 0) = (2, 0).",
      links: [
        {
          topicId: "precalculus-3-3",
          sectionId: "points-on-a-circle",
          label: "See points on a circle",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-2"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-2-standard-position",
      "precalculus-3-2-terminal-ray",
      "precalculus-3-2-radian",
      "precalculus-3-2-sine",
      "precalculus-3-2-cosine",
      "precalculus-3-2-tangent",
    ],
  },
};

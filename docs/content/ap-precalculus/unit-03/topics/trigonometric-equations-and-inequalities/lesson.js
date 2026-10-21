// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-10",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 10,
  code: "3.10",
  title: "Trigonometric Equations and Inequalities",
  period: "Unit 3",
  status: "ready",
  summary:
    "Solving equations and inequalities involving trigonometric functions: one solution from an inverse function, the others from symmetry and periodicity, and the domain restrictions that a context implies.",
  minutes: 13,
  learningGoals: [
    "3.10.A Solve equations and inequalities involving trigonometric functions.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "An inverse trigonometric function returns one solution, chosen from its restricted range. The symmetry of the unit circle gives a second solution in each period, periodicity gives all the rest, and a context usually tells you which ones matter.",
  context:
    "Topic 3.9 defined arcsine, arccosine, and arctangent. This topic uses them to solve equations such as sin θ = 0.3, then uses graphs to solve inequalities such as sin θ > 1/2.",
  sections: [
    {
      id: "solving-equations",
      title: "3.10.A · Inverses give one solution; periodicity gives infinitely many.",
      conceptTitle: "Solving trigonometric equations",
      blocks: [
        {
          type: "paragraph",
          text: "Inverse trigonometric functions are useful in solving equations and inequalities involving trigonometric functions, but solutions may need to be modified due to domain restrictions.",
        },
        {
          type: "paragraph",
          text: "Because trigonometric functions are periodic, there are often infinitely many solutions to trigonometric equations.",
        },
        {
          type: "paragraph",
          text: "Example: solve 2 sin θ − 1 = 0. Then sin θ = 1/2, and arcsin(1/2) = π/6. Sine is also 1/2 in Quadrant II, at π − π/6 = 5π/6. On 0 ≤ θ < 2π the solutions are π/6 and 5π/6. Over all real numbers they are θ = π/6 + 2kπ and θ = 5π/6 + 2kπ for integers k.",
        },
        {
          type: "graph",
          caption: "The solutions of sin θ = 1/2 are where y = sin θ meets y = 1/2",
          alt: "The graph of y = sin θ and the horizontal line y = 1/2. They intersect at θ = π/6 and 5π/6, and again one period later at 13π/6 and 17π/6.",
          window: {
            x: [-0.3, 12.866370614359173],
            y: [-1.5, 1.5],
          },
          ticks: {
            x: [
              {
                at: 0,
                label: "0",
              },
              {
                at: 1.0471975511965976,
                label: "π/3",
              },
              {
                at: 2.0943951023931953,
                label: "2π/3",
              },
              {
                at: 3.141592653589793,
                label: "π",
              },
              {
                at: 4.1887902047863905,
                label: "4π/3",
              },
              {
                at: 5.235987755982989,
                label: "5π/3",
              },
              {
                at: 6.283185307179586,
                label: "2π",
              },
              {
                at: 7.330382858376184,
                label: "7π/3",
              },
              {
                at: 8.377580409572781,
                label: "8π/3",
              },
              {
                at: 9.42477796076938,
                label: "3π",
              },
              {
                at: 10.471975511965978,
                label: "10π/3",
              },
              {
                at: 11.519173063162574,
                label: "11π/3",
              },
              {
                at: 12.566370614359172,
                label: "4π",
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
              labelAt: 4.7,
              labelPosition: "se",
            },
            {
              expr: "0.5",
              color: 2,
              dashed: true,
              label: "y = 1/2",
              labelAt: 12.2,
              labelPosition: "n",
            },
          ],
          points: [
            {
              at: [0.5235987755982988, 0.5],
              label: "π/6",
              position: "nw",
            },
            {
              at: [2.6179938779914944, 0.5],
              label: "5π/6",
              position: "ne",
            },
            {
              at: [6.806784082777885, 0.5],
              label: "13π/6",
              position: "nw",
            },
            {
              at: [8.901179185171081, 0.5],
              label: "17π/6",
              position: "ne",
            },
          ],
        },
        {
          type: "table",
          caption: "Finding the second solution in 0 ≤ θ < 2π from the first",
          columns: ["Equation", "Inverse gives", "Second solution"],
          rows: [
            ["sin θ = k", "θ₁ = arcsin k", "π − θ₁ (add 2π if needed)"],
            ["cos θ = k", "θ₁ = arccos k", "2π − θ₁"],
            ["tan θ = k", "θ₁ = arctan k", "θ₁ + π (add 2π if needed)"],
          ],
        },
        {
          type: "paragraph",
          text: "Example with technology: cos θ = −0.4 gives θ₁ = arccos(−0.4) ≈ 1.982 and the second solution 2π − 1.982 ≈ 4.301.",
        },
      ],
      takeaway:
        "One solution from the inverse, a second from symmetry, the rest by adding periods.",
    },
    {
      id: "inequalities-and-context",
      title: "3.10.A · Inequalities and contexts limit which solutions count.",
      conceptTitle: "Inequalities and contextual domains",
      blocks: [
        {
          type: "paragraph",
          text: "To solve an inequality such as sin θ > 1/2 on 0 ≤ θ < 2π, first solve the equation sin θ = 1/2, then use the graph to see where the curve is above the line. In the graph above, y = sin θ is above y = 1/2 between π/6 and 5π/6, so the solution is π/6 < θ < 5π/6.",
        },
        {
          type: "paragraph",
          text: "In trigonometric equations and inequalities arising from a contextual scenario, there is often a domain restriction that can be implied from the context, which limits the number of solutions.",
        },
        {
          type: "paragraph",
          text: "Example: a Ferris wheel rider's height is h(t) = 25 − 20 cos((π/4)t) meters, t minutes after boarding, during one 8-minute ride, 0 ≤ t ≤ 8. When is the rider higher than 35 meters? Solve 25 − 20 cos((π/4)t) > 35, which means cos((π/4)t) < −1/2. On 0 ≤ (π/4)t ≤ 2π, that happens for 2π/3 < (π/4)t < 4π/3, so 8/3 < t < 16/3. The rider is above 35 meters for 16/3 − 8/3 = 8/3, about 2.67 minutes.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Because the ride lasts 8 minutes, only solutions with 0 ≤ t ≤ 8 are in the domain of the model, so the rider is above 35 meters only for 8/3 < t < 16/3.",
        },
      ],
      takeaway:
        "Solve the equation, read the inequality from the graph, and keep only solutions in the context's domain.",
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "precalculus-3-10-c1",
      topicId: "precalculus-3-10",
      type: "Look back",
      title: "Sign changes and inequalities",
      body: "Topic 1.8 solved polynomial and rational inequalities by finding where the function equals zero and testing the intervals between. Trigonometric inequalities use the same idea with the solutions of the equation.",
      transferQuestion: "Solve cos θ > 0 on 0 ≤ θ < 2π.",
      feedback:
        "cos θ = 0 at π/2 and 3π/2, so cos θ > 0 for 0 ≤ θ < π/2 or 3π/2 < θ < 2π.",
      links: [
        {
          topicId: "precalculus-1-8",
          sectionId: "inequalities",
          label: "Review inequalities",
        },
      ],
    },
    {
      id: "precalculus-3-10-c2",
      topicId: "precalculus-3-10",
      type: "Looking ahead",
      title: "Identities that unlock equations",
      body: "Topic 3.12 rewrites equations such as sin²θ = 1 − cos θ with the Pythagorean identity so they can be solved by the methods of this topic.",
      transferQuestion: "Use sin²θ + cos²θ = 1 to rewrite sin²θ in terms of cos θ.",
      feedback: "sin²θ = 1 − cos²θ.",
      links: [
        {
          topicId: "precalculus-3-12",
          sectionId: "solving-with-identities",
          label: "See solving with identities",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-10"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-9-arcsine",
      "precalculus-3-9-arccosine",
      "precalculus-3-9-arctangent",
    ],
  },
};

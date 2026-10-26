// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-3-14-q01",
      topicId: "precalculus-3-14",
      concept: "polar-graphs",
      difficulty: "Quick check",
      skill: "construct-representations",
      prompt: "Which of the following describes the graph of the polar function r = 3?",
      choices: [
        "The vertical line x = 3",
        "The ray θ = 3",
        "A single point 3 units from the origin",
        "A circle of radius 3 centered at the origin",
      ],
      correctAnswer: 3,
      explanation:
        "Every angle θ is paired with radius 3, so the graph is every point 3 units from the origin: a circle.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "x = 3 is the rectangular graph; in polar coordinates r = 3 means distance 3 in every direction.",
        "θ = 3 would fix the direction, not the distance.",
        "Every value of θ gives a different point at distance 3.",
        "All directions, distance 3.",
      ],
      nearMissIndex: 0,
      distinguisher: "In r = 3, the distance is constant and the angle varies.",
    },
    {
      id: "precalculus-3-14-q02",
      topicId: "precalculus-3-14",
      concept: "polar-graphs",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "For 0 ≤ θ < 2π, at which value of θ does the graph of r = 2 + 2 cos θ pass through the origin?",
      choices: ["θ = 0", "θ = π", "θ = π/2", "θ = 3π/2"],
      correctAnswer: 1,
      explanation:
        "The graph is at the origin when r = 0: 2 + 2 cos θ = 0 means cos θ = −1, so θ = π.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "At θ = 0, r = 4, the point farthest from the origin.",
        "r = 2 + 2(−1) = 0.",
        "At θ = π/2, r = 2.",
        "At θ = 3π/2, r = 2.",
      ],
      nearMissIndex: 0,
      distinguisher: "The origin is where r = 0.",
    },
    {
      id: "precalculus-3-14-q03",
      topicId: "precalculus-3-14",
      concept: "restricting-the-domain",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "For the polar function r = 3 sin(2θ), the point with θ = 3π/4 lies in which quadrant?",
      choices: ["Quadrant II", "Quadrant I", "Quadrant III", "Quadrant IV"],
      correctAnswer: 3,
      explanation:
        "r = 3 sin(3π/2) = −3. The ray of 3π/4 points into Quadrant II, and a negative r places the point the opposite way, in Quadrant IV.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "The ray of 3π/4 is in Quadrant II, but r is negative.",
        "Quadrant I is not on the line through the ray of 3π/4.",
        "Quadrant III is not on the line through the ray of 3π/4.",
        "Negative r reverses the direction of the Quadrant II ray.",
      ],
      nearMissIndex: 0,
      distinguisher: "Check the sign of r before choosing the quadrant.",
    },
    {
      id: "precalculus-3-14-q04",
      topicId: "precalculus-3-14",
      concept: "restricting-the-domain",
      difficulty: "Quick check",
      skill: "construct-representations",
      prompt:
        "Which interval of θ draws exactly the petal of r = 3 sin(2θ) that lies in Quadrant I?",
      choices: ["0 ≤ θ ≤ π", "0 ≤ θ ≤ π/4", "0 ≤ θ ≤ π/2", "π/4 ≤ θ ≤ 3π/4"],
      correctAnswer: 2,
      explanation:
        "r = 0 at θ = 0 and θ = π/2, and r > 0 between them, so 0 ≤ θ ≤ π/2 starts and ends at the origin and stays in Quadrant I.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "On π/2 < θ < π, r < 0, which adds a petal in Quadrant IV.",
        "0 ≤ θ ≤ π/4 draws only half of the petal, out to r = 3.",
        "The petal runs from r = 0 to r = 3 and back to r = 0.",
        "This draws half of the Quadrant I petal and half of the Quadrant IV petal.",
      ],
      nearMissIndex: 0,
      distinguisher: "Choose endpoints where r = 0.",
    },
    {
      id: "precalculus-3-14-q05",
      topicId: "precalculus-3-14",
      concept: "polar-graphs",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "What is the greatest distance from the origin of any point on the graph of r = 1 + 2 cos θ?",
      choices: ["1", "3", "2", "−1"],
      correctAnswer: 1,
      explanation:
        "The distance is |r|. r ranges from 1 + 2(1) = 3 at θ = 0 to 1 + 2(−1) = −1 at θ = π, so the greatest |r| is 3.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "1 is |r| at θ = π, the far point of the inner loop.",
        "|r| is largest at θ = 0, where r = 3.",
        "2 is the coefficient of cos θ.",
        "−1 is the smallest value of r, and a distance is never negative.",
      ],
      nearMissIndex: 0,
      distinguisher: "Distance is |r|, so check both the largest and smallest r.",
    },
    {
      id: "precalculus-3-14-q06",
      topicId: "precalculus-3-14",
      concept: "restricting-the-domain",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "For π/2 < θ < π, the polar function r = 4 cos θ has negative values. In which quadrant are the points of the graph for these values of θ?",
      choices: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
      correctAnswer: 3,
      explanation:
        "The rays for π/2 < θ < π point into Quadrant II. Since r < 0, each point is placed the opposite way, in Quadrant IV.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "Quadrant I is not opposite Quadrant II.",
        "The rays are in Quadrant II, but negative r reverses the direction.",
        "Quadrant III is not on the lines through these rays.",
        "Opposite Quadrant II.",
      ],
      nearMissIndex: 1,
      distinguisher: "Negative r: opposite the ray.",
    },
    {
      id: "precalculus-3-14-q07",
      topicId: "precalculus-3-14",
      concept: "polar-graphs",
      difficulty: "Core",
      skill: "construct-representations",
      prompt: "Which of the following describes the graph of r = θ for θ ≥ 0?",
      choices: [
        "A straight line through the origin",
        "A circle centered at the origin",
        "A spiral that moves farther from the origin as θ increases",
        "A spiral that moves closer to the origin as θ increases",
      ],
      correctAnswer: 2,
      explanation:
        "As θ increases, the direction keeps turning counterclockwise while the distance r = θ keeps growing, which traces an outward spiral.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "r = θ is a line when graphed with θ and r as rectangular axes, but not in polar coordinates.",
        "A circle needs a constant r.",
        "Turning angle, growing radius.",
        "r = θ increases, so the points move away from the origin.",
      ],
      nearMissIndex: 0,
      distinguisher: "Don't confuse the r–θ graph with the polar graph.",
    },
    {
      id: "precalculus-3-14-q08",
      topicId: "precalculus-3-14",
      concept: "polar-graphs",
      difficulty: "Core",
      skill: "construct-representations",
      prompt:
        "The graph of a polar function is shown. Which of the following could be its equation?",
      stimulusBlocks: [
        {
          type: "graph",
          caption: "Graph of a polar function",
          alt: "A heart-shaped curve with its point at the origin. It extends 4 units up along the positive y-axis and 2 units left and right along the x-axis.",
          window: {
            x: [-3.5, 3.5],
            y: [-1.5, 5],
          },
          ticks: {
            x: 1,
            y: 1,
          },
          grid: "polar",
          height: 400,
          polar: [
            {
              expr: "2 + 2sin(θ)",
            },
          ],
        },
      ],
      choices: ["r = 2 + 2 cos θ", "r = 2 + 2 sin θ", "r = 4 sin(2θ)", "r = 2 sin θ"],
      correctAnswer: 1,
      explanation:
        "The curve is farthest from the origin, 4 units, straight up at θ = π/2, and passes through the origin at θ = 3π/2. r = 2 + 2 sin θ gives r = 4 at π/2, r = 0 at 3π/2, and r = 2 at θ = 0 and π.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "r = 2 + 2 cos θ is the same cardioid turned to point along the polar axis, with r = 4 at θ = 0.",
        "r = 4 at π/2, 0 at 3π/2, and 2 at 0 and π.",
        "r = 4 sin(2θ) is a four-petal rose.",
        "r = 2 sin θ is a circle of diameter 2.",
      ],
      nearMissIndex: 0,
      distinguisher: "The direction of the largest r tells you sine or cosine.",
    },
    {
      id: "precalculus-3-14-q09",
      topicId: "precalculus-3-14",
      concept: "restricting-the-domain",
      difficulty: "Core",
      skill: "construct-representations",
      prompt:
        "Which interval of θ draws only the part of the graph of r = 2 + 2 cos θ that is on or above the x-axis?",
      choices: ["0 ≤ θ ≤ π", "−π/2 ≤ θ ≤ π/2", "π ≤ θ ≤ 2π", "0 ≤ θ ≤ π/2"],
      correctAnswer: 0,
      explanation:
        "r = 2 + 2 cos θ ≥ 0 for every θ, so each point lies on its own terminal ray. The rays for 0 ≤ θ ≤ π are on or above the x-axis, and they trace the whole upper half from (4, 0) to the origin.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "r is never negative, so the rays with 0 ≤ θ ≤ π give exactly the upper half.",
        "−π/2 ≤ θ ≤ π/2 draws the right half of the curve, not the upper half.",
        "π ≤ θ ≤ 2π draws the lower half.",
        "0 ≤ θ ≤ π/2 stops at (2, π/2) and misses the upper-left part.",
      ],
      nearMissIndex: 1,
      distinguisher: "When r ≥ 0, the points lie on the rays themselves.",
    },
    {
      id: "precalculus-3-14-q10",
      topicId: "precalculus-3-14",
      concept: "restricting-the-domain",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A student says the pair (θ, r) = (π/4, −2) cannot be on the graph of a polar function, because a radius cannot be negative. Which of the following is the best response?",
      choices: [
        "The student is correct, because a radius is a distance.",
        "The student is correct, because polar functions are only defined for r ≥ 0.",
        "The student is incorrect, because r is a signed displacement; r = −2 is opposite the ray of π/4.",
        "The student is incorrect, because (π/4, −2) is the same point as (π/4, 2).",
      ],
      correctAnswer: 2,
      explanation:
        "Output values of a polar function are signed radial displacements. A negative r puts the point 2 units from the origin along the line of θ = π/4, in the opposite direction, in Quadrant III.",
      sourceIds: ["ced", "ced-topic-3-14"],
      choiceExplanations: [
        "|r| is the distance; r itself carries a sign.",
        "Polar functions such as r = 1 + 2 cos θ do take negative values.",
        "Negative r means the opposite direction.",
        "(π/4, 2) is in Quadrant I; (π/4, −2) is in Quadrant III.",
      ],
      nearMissIndex: 3,
      distinguisher: "r is signed; |r| is the distance.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-3-14-mcq",
      courseId: "precalculus",
      unitId: "precalculus-3",
      topicId: "precalculus-3-14",
      title: "Polar Function Graphs multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-3-14-q01",
        "precalculus-3-14-q02",
        "precalculus-3-14-q03",
        "precalculus-3-14-q04",
        "precalculus-3-14-q05",
        "precalculus-3-14-q06",
        "precalculus-3-14-q07",
        "precalculus-3-14-q08",
        "precalculus-3-14-q09",
        "precalculus-3-14-q10",
      ],
    },
  ],
};

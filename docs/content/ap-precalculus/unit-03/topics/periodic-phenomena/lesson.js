// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-1",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 1,
  code: "3.1",
  title: "Periodic Phenomena",
  period: "Unit 3",
  status: "ready",
  summary:
    "What makes a relationship periodic, how one cycle of a graph builds the whole graph, the period of a function, and estimating a period from data.",
  minutes: 11,
  learningGoals: [
    "3.1.A Construct graphs of periodic relationships based on verbal representations.",
    "3.1.B Describe key characteristics of a periodic function based on a verbal representation.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A periodic relationship repeats the same pattern of output values over and over. Once you know one full cycle, you know the whole function, because every characteristic of one period appears in every period.",
  context:
    "Units 1 and 2 studied functions that rise or fall toward their end behavior. Unit 3 turns to functions that repeat: tides, rotating wheels, and sound waves. This topic sets up the vocabulary before the sine and cosine functions arrive in Topics 3.2 to 3.5.",
  sections: [
    {
      id: "periodic-relationships",
      title:
        "3.1.A · A periodic relationship repeats over successive equal-length intervals.",
      conceptTitle: "Periodic relationships and their graphs",
      blocks: [
        {
          type: "paragraph",
          text: "A periodic relationship can be identified between two aspects of a context if, as the input values increase, the output values demonstrate a repeating pattern over successive equal-length intervals. The height of a seat on a turning Ferris wheel, the water level at a harbor over several days, and the position of a swinging pendulum are all periodic.",
        },
        {
          type: "paragraph",
          text: "The graph of a periodic relationship can be constructed from the graph of a single cycle of the relationship. Draw one cycle, then copy it end to end in both directions.",
        },
        {
          type: "paragraph",
          text: "Example: a windshield wiper sweeps at a constant rate from the bottom of the windshield up to 90° in 1 second, then back down to 0° in the next second, and repeats. Let W(t) be the wiper's angle, in degrees, t seconds after it starts. One cycle is the rise from (0, 0) to (1, 90) and the fall back to (2, 0). The graph below repeats that single cycle.",
        },
        {
          type: "graph",
          caption: "The wiper angle W(t), built from copies of one 2-second cycle",
          alt: "A zigzag graph. It rises in a straight line from (0, 0) to (1, 90), falls to (2, 0), and repeats the same rise and fall every 2 seconds through t = 6.",
          window: {
            x: [0, 6.2],
            y: [-10, 110],
          },
          ticks: {
            x: 1,
            y: 30,
          },
          axisLabels: {
            x: "t",
            y: "W(t)",
          },
          functions: [
            {
              expr: "(90/pi)acos(cos(pi x))",
              domain: [0, 6],
              label: "W",
              labelAt: 5,
              labelPosition: "ne",
            },
          ],
          points: [
            {
              at: [0, 0],
              label: "(0, 0)",
              position: "ne",
            },
            {
              at: [1, 90],
              label: "(1, 90)",
              position: "e",
            },
            {
              at: [2, 0],
              label: "(2, 0)",
              position: "ne",
            },
          ],
        },
        {
          type: "callout",
          title: "Not every periodic function is curved",
          text: "The wiper graph is made of line segments, yet it is periodic because the same pattern repeats over intervals of equal length. Sinusoidal functions, which start in Topic 3.5, are the smooth periodic functions this unit focuses on.",
        },
      ],
      takeaway:
        "Periodic means the output pattern repeats over equal-length input intervals; one cycle builds the whole graph.",
    },
    {
      id: "period",
      title: "3.1.B · The period is the length of the shortest interval that repeats.",
      conceptTitle: "Period and characteristics of periodic functions",
      blocks: [
        {
          type: "paragraph",
          text: "The period of the function is the smallest positive value k such that f(x + k) = f(x) for all x in the domain. Consequently, the behavior of a periodic function is completely determined by any interval of width k.",
        },
        {
          type: "paragraph",
          text: "For the wiper, W(t + 2) = W(t) for every t, and no smaller positive number works, so the period is 2 seconds. It is also true that W(t + 4) = W(t), but 4 is not the smallest such value.",
        },
        {
          type: "paragraph",
          text: "The period can be estimated by investigating successive equal-length output values and finding where the pattern begins to repeat. A single repeated output is not enough: the whole sequence of outputs has to start over.",
        },
        {
          type: "table",
          caption: "Water depth D(t), in feet, at a dock, t hours after midnight",
          columns: ["t", "0", "3", "6", "9", "12", "15", "18", "21", "24"],
          rows: [["D(t)", "8", "11", "8", "5", "8", "11", "8", "5", "8"]],
        },
        {
          type: "paragraph",
          text: "The depth returns to 8 feet at t = 6, but the next value is 5, not 11, so the pattern has not started over. The full pattern 8, 11, 8, 5 begins again at t = 12, so the period is estimated to be 12 hours.",
        },
        {
          type: "paragraph",
          text: "Periodic functions take on characteristics of other functions, such as intervals of increase and decrease, different concavities, and various rates of change. However, with periodic functions, all characteristics found in one period of the function will be in every period of the function.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Because W has period 2 and W is increasing on 0 < t < 1, W is also increasing on 2 < t < 3, 4 < t < 5, and every interval 2n < t < 2n + 1 for integers n.",
        },
      ],
      takeaway:
        "Smallest k with f(x + k) = f(x); whatever happens in one period happens in every period.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-1-periodic-relationship",
      topicId: "precalculus-3-1",
      term: "Periodic relationship",
      definition:
        "A periodic relationship can be identified between two aspects of a context if, as the input values increase, the output values demonstrate a repeating pattern over successive equal-length intervals.",
      source: "CED 3.1.A.1",
    },
    {
      id: "precalculus-3-1-period",
      topicId: "precalculus-3-1",
      term: "Period",
      definition:
        "The period of the function is the smallest positive value k such that f(x + k) = f(x) for all x in the domain. Consequently, the behavior of a periodic function is completely determined by any interval of width k.",
      source: "CED 3.1.B.1",
    },
  ],
  connections: [
    {
      id: "precalculus-3-1-c1",
      topicId: "precalculus-3-1",
      type: "Look back",
      title: "Increasing, decreasing, and concavity",
      body: "Topic 1.1 described where a function increases, decreases, and changes concavity. A periodic function has the same features, repeated once per period.",
      transferQuestion:
        "A periodic function g has period 8 and is decreasing on 1 < x < 3. Name another interval on which g is decreasing.",
      feedback: "9 < x < 11, or any interval 1 + 8n < x < 3 + 8n for an integer n.",
      links: [
        {
          topicId: "precalculus-1-1",
          sectionId: "increasing-decreasing",
          label: "Review increasing and decreasing",
        },
      ],
    },
    {
      id: "precalculus-3-1-c2",
      topicId: "precalculus-3-1",
      type: "Looking ahead",
      title: "Angles that repeat",
      body: "Topic 3.2 measures angles as rotations. Rotating one more full turn lands on the same terminal ray, which is why the sine and cosine functions are periodic.",
      transferQuestion:
        "Why should an angle of 2π + 1 radians and an angle of 1 radian give the same point on a circle?",
      feedback: "They differ by one full revolution, so they share a terminal ray.",
      links: [
        {
          topicId: "precalculus-3-2",
          sectionId: "standard-position-and-radians",
          label: "See angles in standard position",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-1"],
  definitionCoverage: {
    status: "required",
    conceptIds: ["precalculus-3-1-periodic-relationship", "precalculus-3-1-period"],
  },
};

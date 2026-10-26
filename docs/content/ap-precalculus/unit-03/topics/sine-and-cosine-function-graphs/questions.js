// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-3-4-q01",
      topicId: "precalculus-3-4",
      concept: "sine-function",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "Which of the following describes the range of the sine function, f(θ) = sin θ?",
      choices: ["All real numbers", "0 ≤ f(θ) ≤ 1", "−1 ≤ f(θ) ≤ 1", "−2π ≤ f(θ) ≤ 2π"],
      correctAnswer: 2,
      explanation:
        "The output values oscillate between −1 and 1, taking every value in between, because they are y-coordinates of points on the unit circle.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "All real numbers is the domain of the sine function, not its range.",
        "sin θ is negative whenever P is below the x-axis.",
        "The y-coordinates on the unit circle run from −1 to 1.",
        "2π is a period of the inputs, not a bound on the outputs.",
      ],
      nearMissIndex: 0,
      distinguisher: "Domain is all real angles; range is −1 to 1.",
    },
    {
      id: "precalculus-3-4-q02",
      topicId: "precalculus-3-4",
      concept: "cosine-function",
      difficulty: "Quick check",
      skill: "describe",
      prompt: "As θ increases from π/2 to π, how do the values of cos θ change?",
      choices: [
        "They increase from 0 to 1.",
        "They decrease from 1 to 0.",
        "They increase from −1 to 0.",
        "They decrease from 0 to −1.",
      ],
      correctAnswer: 3,
      explanation:
        "P moves from (0, 1) to (−1, 0), so its x-coordinate goes from 0 down to −1.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "P moves left, away from the positive x-axis, so the x-coordinate does not increase.",
        "That is the change on 0 ≤ θ ≤ π/2, the quarter turn before.",
        "That is the change on π ≤ θ ≤ 3π/2.",
        "x-coordinate 0 at π/2 and −1 at π.",
      ],
      nearMissIndex: 1,
      distinguisher: "Track the x-coordinate of P from (0, 1) to (−1, 0).",
    },
    {
      id: "precalculus-3-4-q03",
      topicId: "precalculus-3-4",
      concept: "cosine-function",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt: "On which of the following intervals are both sin θ and cos θ increasing?",
      choices: ["0 < θ < π/2", "π/2 < θ < π", "π < θ < 3π/2", "3π/2 < θ < 2π"],
      correctAnswer: 3,
      explanation:
        "From 3π/2 to 2π, P moves from (0, −1) to (1, 0): its y-coordinate rises from −1 to 0 and its x-coordinate rises from 0 to 1.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "sin θ increases there, but cos θ decreases from 1 to 0.",
        "Both decrease: P moves from (0, 1) to (−1, 0).",
        "cos θ increases, but sin θ decreases from 0 to −1.",
        "Both coordinates of P increase in Quadrant IV.",
      ],
      nearMissIndex: 0,
      distinguisher: "Both increase only when P moves up and to the right.",
    },
    {
      id: "precalculus-3-4-q04",
      topicId: "precalculus-3-4",
      concept: "cosine-function",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt: "For 0 ≤ θ < 2π, at which value of θ does cos θ reach its minimum value?",
      choices: ["θ = 0", "θ = π/2", "θ = π", "θ = 3π/2"],
      correctAnswer: 2,
      explanation:
        "cos θ is the x-coordinate of P, which is smallest, −1, when P = (−1, 0) at θ = π.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "At θ = 0, cos θ = 1, its maximum.",
        "At θ = π/2, cos θ = 0.",
        "P = (−1, 0), the leftmost point of the unit circle.",
        "θ = 3π/2 is where sin θ reaches its minimum; cos(3π/2) = 0.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Cosine is smallest at the leftmost point; sine is smallest at the bottom.",
    },
    {
      id: "precalculus-3-4-q05",
      topicId: "precalculus-3-4",
      concept: "sine-function",
      difficulty: "Core",
      skill: "solve",
      prompt: "How many values of θ in the interval 0 ≤ θ < 2π satisfy sin θ = 0.3?",
      choices: ["1", "2", "3", "4"],
      correctAnswer: 1,
      explanation:
        "The horizontal line y = 0.3 meets the unit circle twice above the x-axis, once in Quadrant I and once in Quadrant II. So sin θ = 0.3 has two solutions on one period.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "There is a solution in Quadrant I, and the reflection over the y-axis gives a second in Quadrant II.",
        "One in Quadrant I and one in Quadrant II.",
        "On a single period the sine graph crosses y = 0.3 only twice.",
        "sin θ is negative in Quadrants III and IV, so there are no solutions there.",
      ],
      nearMissIndex: 0,
      distinguisher: "Each output strictly between −1 and 1 occurs twice per period.",
    },
    {
      id: "precalculus-3-4-q06",
      topicId: "precalculus-3-4",
      concept: "cosine-function",
      difficulty: "Core",
      skill: "identify-information",
      prompt: "For 0 ≤ θ ≤ 2π, what are all the zeros of the cosine function?",
      choices: [
        "θ = 0, θ = π, and θ = 2π",
        "θ = π/2 and θ = 3π/2",
        "θ = π only",
        "θ = π/4 and θ = 5π/4",
      ],
      correctAnswer: 1,
      explanation:
        "cos θ = 0 when P is on the y-axis: at (0, 1) for θ = π/2 and at (0, −1) for θ = 3π/2.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "Those are the zeros of the sine function, where P is on the x-axis.",
        "P lies on the y-axis at π/2 and 3π/2.",
        "cos π = −1, the minimum value.",
        "At π/4 and 5π/4, sin θ = cos θ, but neither is 0.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Cosine is zero where P has no horizontal displacement from the y-axis.",
    },
    {
      id: "precalculus-3-4-q07",
      topicId: "precalculus-3-4",
      concept: "sine-function",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A student claims that sin θ = 1.2 for some angle θ, because the domain of the sine function is all real numbers. Which of the following is the best response?",
      choices: [
        "The claim is correct, because some angle must give each real output.",
        "The claim is incorrect, because the outputs of the sine function are always between −1 and 1.",
        "The claim is correct, because 1.2 radians is an angle in the domain.",
        "The claim is incorrect, because the domain of the sine function is 0 ≤ θ < 2π.",
      ],
      correctAnswer: 1,
      explanation:
        "Every real number is a possible input, but the outputs are y-coordinates of points on the unit circle, which never exceed 1.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "A domain of all real numbers says nothing about which outputs occur.",
        "The range of sine is −1 ≤ sin θ ≤ 1.",
        "sin(1.2) is a value of about 0.93, which is different from sin θ = 1.2.",
        "The domain is all real numbers; the problem is the range, not the domain.",
      ],
      nearMissIndex: 3,
      distinguisher: "The student confuses the domain with the range.",
    },
    {
      id: "precalculus-3-4-q08",
      topicId: "precalculus-3-4",
      concept: "cosine-function",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "Point P moves counterclockwise on the unit circle from the terminal ray of θ = π to the terminal ray of θ = 3π/2. Which of the following describes the horizontal displacement of P from the y-axis?",
      choices: [
        "It decreases from 0 to −1.",
        "It decreases from 1 to 0.",
        "It increases from 0 to 1.",
        "It increases from −1 to 0.",
      ],
      correctAnswer: 3,
      explanation:
        "The horizontal displacement is cos θ. P moves from (−1, 0) to (0, −1), so cos θ increases from −1 to 0.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "That is the vertical displacement, sin θ, over the same interval.",
        "That is cos θ on 0 ≤ θ ≤ π/2.",
        "That is cos θ on 3π/2 ≤ θ ≤ 2π.",
        "P moves right, from x = −1 to x = 0.",
      ],
      nearMissIndex: 0,
      distinguisher: "Horizontal displacement is cosine, the x-coordinate.",
    },
    {
      id: "precalculus-3-4-q09",
      topicId: "precalculus-3-4",
      concept: "sine-function",
      difficulty: "Core",
      skill: "apply-results",
      prompt: "What is the value of sin(17π/6)?",
      choices: ["−1/2", "√3/2", "1/2", "−√3/2"],
      correctAnswer: 2,
      explanation:
        "17π/6 = 5π/6 + 2π, one revolution more than 5π/6, so sin(17π/6) = sin(5π/6) = 1/2.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "17π/6 shares its terminal ray with 5π/6 in Quadrant II, where sine is positive.",
        "√3/2 is the size of cos(5π/6), not sin(5π/6).",
        "Subtract 2π to get 5π/6; sin(5π/6) = 1/2.",
        "−√3/2 is cos(5π/6).",
      ],
      nearMissIndex: 0,
      distinguisher: "Remove whole revolutions first, then find the quadrant.",
    },
    {
      id: "precalculus-3-4-q10",
      topicId: "precalculus-3-4",
      concept: "cosine-function",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The graph of y = cos θ is shown. Point Q is on the graph and has θ-coordinate 4π/3. What is the y-coordinate of Q?",
      stimulusBlocks: [
        {
          type: "graph",
          caption: "Graph of y = cos θ for 0 ≤ θ ≤ 2π",
          alt: "A cosine wave from (0, 1) down to (π, −1) and back up to (2π, 1). A point Q is marked on the curve between π and 3π/2.",
          window: {
            x: [-0.3, 6.583185307179586],
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
              domain: [0, 6.283185307179586],
            },
          ],
          points: [
            {
              at: [4.1887902047863905, -0.5],
              label: "Q",
              position: "se",
            },
          ],
        },
      ],
      choices: ["−1/2", "−√3/2", "1/2", "√3/2"],
      correctAnswer: 0,
      explanation:
        "4π/3 is in Quadrant III and related to π/3, so cos(4π/3) = −cos(π/3) = −1/2.",
      sourceIds: ["ced", "ced-topic-3-4"],
      choiceExplanations: [
        "cos(4π/3) = −1/2.",
        "−√3/2 is sin(4π/3).",
        "Cosine is negative in Quadrant III.",
        "√3/2 is the value for angles related to π/6.",
      ],
      nearMissIndex: 1,
      distinguisher: "For angles related to π/3, the cosine has size 1/2.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-3-4-mcq",
      courseId: "precalculus",
      unitId: "precalculus-3",
      topicId: "precalculus-3-4",
      title: "Sine and Cosine Function Graphs multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-3-4-q01",
        "precalculus-3-4-q02",
        "precalculus-3-4-q03",
        "precalculus-3-4-q04",
        "precalculus-3-4-q05",
        "precalculus-3-4-q06",
        "precalculus-3-4-q07",
        "precalculus-3-4-q08",
        "precalculus-3-4-q09",
        "precalculus-3-4-q10",
      ],
    },
  ],
};

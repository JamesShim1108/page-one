// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-3-5-q01",
      topicId: "precalculus-3-5",
      concept: "amplitude-and-midline",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "A sinusoidal function has a maximum value of 9 and a minimum value of 1. What are the amplitude and midline of its graph?",
      choices: [
        "Amplitude 8 and midline y = 5",
        "Amplitude 4 and midline y = 4",
        "Amplitude 4 and midline y = 5",
        "Amplitude 8 and midline y = 4",
      ],
      correctAnswer: 2,
      explanation: "Amplitude = (9 − 1)/2 = 4. Midline: y = (9 + 1)/2 = 5.",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "8 is the full difference between maximum and minimum; the amplitude is half of it.",
        "The midline is the average of 9 and 1, not half their difference.",
        "Half the difference is 4; the average is 5.",
        "This takes the full difference and uses half the difference for the midline.",
      ],
      nearMissIndex: 0,
      distinguisher: "Amplitude halves the difference; midline averages the values.",
    },
    {
      id: "precalculus-3-5-q02",
      topicId: "precalculus-3-5",
      concept: "sinusoidal-functions",
      difficulty: "Quick check",
      skill: "apply-results",
      prompt: "A sinusoidal function has a period of 4. What is its frequency?",
      choices: ["4", "π/2", "8", "1/4"],
      correctAnswer: 3,
      explanation:
        "Period and frequency are reciprocals, so the frequency is 1/4: one quarter of a cycle per unit of input.",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "4 is the period itself.",
        "π/2 = 2π/4 confuses the frequency with the value b in sin(bθ), which Topic 3.6 relates to the period.",
        "8 is twice the period.",
        "The reciprocal of the period 4.",
      ],
      nearMissIndex: 1,
      distinguisher: "Frequency is exactly 1/period, with no 2π.",
    },
    {
      id: "precalculus-3-5-q03",
      topicId: "precalculus-3-5",
      concept: "symmetry-and-concavity",
      difficulty: "Quick check",
      skill: "describe",
      prompt: "Which of the following is true for all real numbers θ?",
      choices: [
        "cos(−θ) = −cos θ",
        "cos(−θ) = cos θ",
        "sin(−θ) = sin θ",
        "cos(θ + π) = cos θ",
      ],
      correctAnswer: 1,
      explanation:
        "The graph of y = cos θ has reflective symmetry over the y-axis, so cosine is an even function: cos(−θ) = cos θ.",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "That is the odd-function rule, which holds for sine, not cosine.",
        "Cosine is even.",
        "Sine is odd, so sin(−θ) = −sin θ.",
        "π is half the period; cos(θ + π) = −cos θ.",
      ],
      nearMissIndex: 0,
      distinguisher: "Cosine is even, sine is odd.",
    },
    {
      id: "precalculus-3-5-q04",
      topicId: "precalculus-3-5",
      concept: "amplitude-and-midline",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The graph of a sinusoidal function g is shown. What is the equation of the midline of the graph of g?",
      stimulusBlocks: [
        {
          type: "graph",
          caption: "Graph of y = g(x)",
          alt: "A wave that oscillates between a maximum of 3 and a minimum of −5.",
          window: {
            x: [-0.3, 12.866370614359173],
            y: [-6, 4],
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
              {
                at: 7.853981633974483,
                label: "5π/2",
              },
              {
                at: 9.42477796076938,
                label: "3π",
              },
              {
                at: 10.995574287564276,
                label: "7π/2",
              },
              {
                at: 12.566370614359172,
                label: "4π",
              },
            ],
            y: 1,
          },
          functions: [
            {
              expr: "4sin(x) - 1",
              label: "g",
              labelAt: 2.4,
            },
          ],
        },
      ],
      choices: ["y = −1", "y = 4", "y = −2", "y = 0"],
      correctAnswer: 0,
      explanation:
        "The maximum is 3 and the minimum is −5, so the midline is y = (3 + (−5))/2 = −1.",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "The average of 3 and −5 is −1.",
        "4 is the amplitude, (3 − (−5))/2, not the midline.",
        "(3 + (−5))/2 = −1, not −2.",
        "y = 0 is the x-axis, the midline of sin θ and cos θ, but this graph is shifted down.",
      ],
      nearMissIndex: 1,
      distinguisher: "Average the maximum and minimum; don't halve their difference.",
    },
    {
      id: "precalculus-3-5-q05",
      topicId: "precalculus-3-5",
      concept: "sinusoidal-functions",
      difficulty: "Core",
      skill: "equivalent-forms",
      prompt:
        "Which of the following expressions is equal to cos θ for all real numbers θ?",
      choices: ["sin(θ − π/2)", "sin(θ + π/2)", "sin θ + π/2", "sin((π/2)θ)"],
      correctAnswer: 1,
      explanation:
        "The sine and cosine functions are both sinusoidal functions, with cos θ = sin(θ + π/2).",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "sin(θ − π/2) = −cos θ; the shift is in the wrong direction.",
        "Shifting the sine graph π/2 to the left gives the cosine graph.",
        "Adding π/2 to the output moves the graph up, not sideways.",
        "Multiplying the input changes the period, not the starting point.",
      ],
      nearMissIndex: 0,
      distinguisher: "Add π/2 inside the sine, not subtract it.",
    },
    {
      id: "precalculus-3-5-q06",
      topicId: "precalculus-3-5",
      concept: "symmetry-and-concavity",
      difficulty: "Core",
      skill: "describe",
      prompt: "On which of the following intervals is the graph of y = sin θ concave up?",
      choices: ["0 < θ < π", "π/2 < θ < 3π/2", "π < θ < 2π", "−π/2 < θ < π/2"],
      correctAnswer: 2,
      explanation:
        "On π < θ < 2π the graph of y = sin θ is below its midline y = 0, where it is concave up.",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "On 0 < θ < π the graph is above the midline and concave down.",
        "The graph changes concavity at θ = π, inside this interval.",
        "Below the midline, the graph is concave up.",
        "The graph changes concavity at θ = 0, inside this interval.",
      ],
      nearMissIndex: 0,
      distinguisher: "For sine, concavity changes where the graph crosses y = 0.",
    },
    {
      id: "precalculus-3-5-q07",
      topicId: "precalculus-3-5",
      concept: "symmetry-and-concavity",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "Which of the following is a point of inflection of the graph of y = cos θ?",
      choices: ["(0, 1)", "(π, −1)", "(π/4, √2/2)", "(π/2, 0)"],
      correctAnswer: 3,
      explanation:
        "The graph of y = cos θ changes from concave down to concave up where it crosses its midline y = 0, at θ = π/2.",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "(0, 1) is a maximum; the graph is concave down on both sides.",
        "(π, −1) is a minimum, where the graph is concave up on both sides.",
        "At π/4 the graph is still above the midline and concave down.",
        "The graph crosses the midline here and changes concavity.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Inflection points of sinusoidal graphs are on the midline, not at the extremes.",
    },
    {
      id: "precalculus-3-5-q08",
      topicId: "precalculus-3-5",
      concept: "amplitude-and-midline",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "A sinusoidal function f has a maximum value of 7 at x = 1, and its next minimum value, −1, occurs at x = 4. Which of the following is true?",
      choices: [
        "The period is 3, and the midline is y = 3.",
        "The period is 6, and the midline is y = 4.",
        "The period is 6, and the midline is y = 3.",
        "The period is 3, and the amplitude is 8.",
      ],
      correctAnswer: 2,
      explanation:
        "From a maximum to the next minimum is half a cycle, so the period is 2(4 − 1) = 6. The midline is y = (7 + (−1))/2 = 3.",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "3 units is only half a cycle, from a maximum to a minimum.",
        "4 is the amplitude, (7 − (−1))/2, not the midline.",
        "Half a cycle is 3 units, so a full cycle is 6; the average of 7 and −1 is 3.",
        "The period is 6 and the amplitude is 4.",
      ],
      nearMissIndex: 0,
      distinguisher: "Maximum to next minimum is half a period.",
    },
    {
      id: "precalculus-3-5-q09",
      topicId: "precalculus-3-5",
      concept: "symmetry-and-concavity",
      difficulty: "Core",
      skill: "describe",
      prompt: "Which of the following describes the symmetry of the graph of y = sin θ?",
      choices: [
        "Reflective symmetry over the y-axis, so sine is even",
        "Reflective symmetry over the x-axis, so sine is an odd function",
        "Rotational symmetry about the origin, so sine is an odd function",
        "Rotational symmetry about the origin, so sine is even",
      ],
      correctAnswer: 2,
      explanation:
        "The graph of y = sin θ has rotational symmetry about the origin and is therefore an odd function.",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "Reflective symmetry over the y-axis describes cosine, which is even.",
        "A function's graph cannot be symmetric over the x-axis unless it is y = 0.",
        "Rotational symmetry about the origin means sin(−θ) = −sin θ.",
        "Rotational symmetry about the origin makes a function odd, not even.",
      ],
      nearMissIndex: 0,
      distinguisher: "Odd goes with the origin; even goes with the y-axis.",
    },
    {
      id: "precalculus-3-5-q10",
      topicId: "precalculus-3-5",
      concept: "sinusoidal-functions",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "The air pressure of a musical note is modeled by a sinusoidal function of time with a frequency of 440 cycles per second. What is the period of the function?",
      choices: ["440 seconds", "1/440 second", "2π/440 second", "440/(2π) seconds"],
      correctAnswer: 1,
      explanation:
        "Period and frequency are reciprocals, so the period is 1/440 second, about 0.00227 second per cycle.",
      sourceIds: ["ced", "ced-topic-3-5"],
      choiceExplanations: [
        "440 is the frequency, the number of cycles in one second.",
        "The reciprocal of 440 cycles per second.",
        "2π/440 brings in the period of sin θ, but the period is simply the reciprocal of the frequency.",
        "This is neither the frequency nor its reciprocal.",
      ],
      nearMissIndex: 2,
      distinguisher: "Period = 1/frequency.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-3-5-quick",
      courseId: "precalculus",
      unitId: "precalculus-3",
      topicId: "precalculus-3-5",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-3-5-q01",
        "precalculus-3-5-q02",
        "precalculus-3-5-q03",
        "precalculus-3-5-q04",
      ],
    },
    {
      id: "precalculus-3-5-quiz",
      courseId: "precalculus",
      unitId: "precalculus-3",
      topicId: "precalculus-3-5",
      title: "Sinusoidal Functions topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-3-5-q05",
        "precalculus-3-5-q06",
        "precalculus-3-5-q07",
        "precalculus-3-5-q08",
        "precalculus-3-5-q09",
        "precalculus-3-5-q10",
      ],
    },
  ],
};

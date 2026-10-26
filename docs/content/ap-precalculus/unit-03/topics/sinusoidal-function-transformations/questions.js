// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-3-6-q01",
      topicId: "precalculus-3-6",
      concept: "general-form",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt: "What are the amplitude and the period of f(θ) = −3 sin(2θ) + 5?",
      choices: [
        "Amplitude −3 and period π",
        "Amplitude 3 and period 4π",
        "Amplitude 3 and period π",
        "Amplitude 5 and period π",
      ],
      correctAnswer: 2,
      explanation:
        "The amplitude is |a| = |−3| = 3, and the period is |1/b|·2π = (1/2)(2π) = π.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "An amplitude is a distance, |a|, so it is never negative.",
        "The period is 2π divided by |b|, not multiplied by it.",
        "|−3| = 3 and 2π/2 = π.",
        "5 is d, the vertical shift of the midline.",
      ],
      nearMissIndex: 1,
      distinguisher: "Divide 2π by |b|.",
    },
    {
      id: "precalculus-3-6-q02",
      topicId: "precalculus-3-6",
      concept: "additive-transformations",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "How is the graph of g(θ) = cos(θ − π/3) related to the graph of y = cos θ?",
      choices: [
        "It is shifted π/3 units to the left.",
        "It is shifted π/3 units up.",
        "It is shifted π/3 units to the right.",
        "It is shifted 1/3 unit to the right.",
      ],
      correctAnswer: 2,
      explanation:
        "Here c = −π/3, and the phase shift is −c = π/3 units, which is to the right.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "The phase shift is −c; with c = −π/3, that is positive, to the right.",
        "Adding inside the cosine moves the graph horizontally, not vertically.",
        "−c = π/3, a shift to the right.",
        "The shift is π/3 units, not 1/3; π stays in the shift.",
      ],
      nearMissIndex: 0,
      distinguisher: "θ − π/3 shifts right, θ + π/3 shifts left.",
    },
    {
      id: "precalculus-3-6-q03",
      topicId: "precalculus-3-6",
      concept: "additive-transformations",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt: "What is the equation of the midline of the graph of y = 2 cos(4θ) − 7?",
      choices: ["y = 7", "y = −5", "y = 2", "y = −7"],
      correctAnswer: 3,
      explanation: "The midline is shifted d = −7 units from y = 0, so it is y = −7.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "d = −7, so the midline moves down, not up.",
        "−5 = −7 + 2 is the maximum value, not the midline.",
        "2 is the amplitude.",
        "The vertical shift d is −7.",
      ],
      nearMissIndex: 1,
      distinguisher: "The midline is y = d, the average of the maximum and minimum.",
    },
    {
      id: "precalculus-3-6-q04",
      topicId: "precalculus-3-6",
      concept: "general-form",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt:
        "Which of the following functions has an amplitude of 4, a period of 6, and a midline of y = 1?",
      choices: [
        "f(x) = 4 sin((π/3)x) + 1",
        "f(x) = 4 sin(6x) + 1",
        "f(x) = 4 sin((π/6)x) + 1",
        "f(x) = sin((π/3)x) + 4",
      ],
      correctAnswer: 0,
      explanation:
        "Amplitude 4 gives |a| = 4 and midline y = 1 gives d = 1. The period 6 = 2π/|b| gives b = 2π/6 = π/3.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "2π/(π/3) = 6.",
        "b = 6 gives a period of 2π/6 = π/3, not 6.",
        "b = π/6 gives a period of 2π/(π/6) = 12.",
        "This has amplitude 1 and midline y = 4, swapping a and d.",
      ],
      nearMissIndex: 1,
      distinguisher: "Solve 2π/|b| = period for b.",
    },
    {
      id: "precalculus-3-6-q05",
      topicId: "precalculus-3-6",
      concept: "general-form",
      difficulty: "Core",
      skill: "apply-results",
      prompt: "What is the maximum value of h(θ) = 5 − 2 sin(3θ)?",
      choices: ["3", "7", "5", "2"],
      correctAnswer: 1,
      explanation:
        "Here a = −2 and d = 5. The outputs go |a| = 2 above and below the midline y = 5, so the maximum is 7.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "3 = 5 − 2 is the minimum value.",
        "d + |a| = 5 + 2 = 7.",
        "5 is the midline value, the average of the maximum and minimum.",
        "2 is the amplitude.",
      ],
      nearMissIndex: 0,
      distinguisher: "The negative a reflects the graph but does not change d ± |a|.",
    },
    {
      id: "precalculus-3-6-q06",
      topicId: "precalculus-3-6",
      concept: "multiplicative-transformations",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "The temperature, in degrees, in a greenhouse t hours after midnight is modeled by T(t) = 70 + 8 sin((π/12)t). What is the period of T?",
      choices: ["12 hours", "π/12 hours", "24 hours", "1/24 hour"],
      correctAnswer: 2,
      explanation: "The period is |1/b|·2π = (12/π)(2π) = 24 hours.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "12 is the reciprocal of π/12 without the 2π.",
        "π/12 is the value of b, not the period.",
        "2π/(π/12) = 24.",
        "1/24 is the frequency, the reciprocal of the period.",
      ],
      nearMissIndex: 0,
      distinguisher: "Period = 2π/|b|, where b already contains π.",
    },
    {
      id: "precalculus-3-6-q07",
      topicId: "precalculus-3-6",
      concept: "multiplicative-transformations",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "The graph of g is obtained from the graph of y = sin θ by a vertical dilation by a factor of 2, followed by a vertical translation of 3 units down. Which of the following is g(θ)?",
      choices: [
        "g(θ) = 2(sin θ − 3)",
        "g(θ) = sin(2θ) − 3",
        "g(θ) = 2 sin(θ − 3)",
        "g(θ) = 2 sin θ − 3",
      ],
      correctAnswer: 3,
      explanation:
        "Dilating by 2 gives 2 sin θ. Translating that down 3 gives 2 sin θ − 3.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "2(sin θ − 3) = 2 sin θ − 6 translates first and then dilates, which moves the midline to y = −6.",
        "sin(2θ) is a horizontal dilation, which changes the period instead of the amplitude.",
        "Subtracting 3 inside the sine is a horizontal shift.",
        "Dilate, then translate.",
      ],
      nearMissIndex: 0,
      distinguisher: "The order of the transformations matters for the midline.",
    },
    {
      id: "precalculus-3-6-q08",
      topicId: "precalculus-3-6",
      concept: "general-form",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "What is the phase shift of the graph of f(θ) = sin(2θ + π) relative to the graph of y = sin(2θ)?",
      choices: [
        "π units to the left",
        "π/2 units to the left",
        "π/2 units to the right",
        "2π units to the left",
      ],
      correctAnswer: 1,
      explanation:
        "Factor out b: sin(2θ + π) = sin(2(θ + π/2)). So c = π/2, and the phase shift is −c = −π/2, which is π/2 units to the left.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "π is the constant before b is factored out.",
        "2θ + π = 2(θ + π/2), so c = π/2 and the shift is to the left.",
        "A positive c shifts the graph to the left.",
        "2π multiplies by b instead of dividing.",
      ],
      nearMissIndex: 0,
      distinguisher: "Factor b out of the input before reading c.",
    },
    {
      id: "precalculus-3-6-q09",
      topicId: "precalculus-3-6",
      concept: "general-form",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "The graph of a sinusoidal function is shown. Which of the following could define the function?",
      stimulusBlocks: [
        {
          type: "graph",
          caption: "Graph of a sinusoidal function",
          alt: "A wave with a maximum of 4 at θ = 0 and a minimum of −2 at θ = π/2. It completes one full cycle from θ = 0 to θ = π and two cycles from 0 to 2π.",
          window: {
            x: [-0.3, 6.583185307179586],
            y: [-3, 5],
          },
          ticks: {
            x: [
              {
                at: 0,
                label: "0",
              },
              {
                at: 0.7853981633974483,
                label: "π/4",
              },
              {
                at: 1.5707963267948966,
                label: "π/2",
              },
              {
                at: 2.356194490192345,
                label: "3π/4",
              },
              {
                at: 3.141592653589793,
                label: "π",
              },
              {
                at: 3.9269908169872414,
                label: "5π/4",
              },
              {
                at: 4.71238898038469,
                label: "3π/2",
              },
              {
                at: 5.497787143782138,
                label: "7π/4",
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
            y: "y",
          },
          functions: [
            {
              expr: "3cos(2x) + 1",
            },
          ],
        },
      ],
      choices: [
        "y = 3 cos(θ/2) + 1",
        "y = 2 cos(3θ) + 1",
        "y = 3 cos(2θ) − 1",
        "y = 3 cos(2θ) + 1",
      ],
      correctAnswer: 3,
      explanation:
        "The maximum is 4 and the minimum is −2, so the amplitude is 3 and the midline is y = 1. One cycle takes π, so |b| = 2π/π = 2. A maximum at θ = 0 fits cosine with no phase shift.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "b = 1/2 gives a period of 4π, but the graph repeats every π.",
        "This has amplitude 2 and period 2π/3.",
        "The midline is y = (4 + (−2))/2 = 1, not −1.",
        "Amplitude 3, period π, midline y = 1.",
      ],
      nearMissIndex: 0,
      distinguisher: "A period of π means b = 2, not 1/2.",
    },
    {
      id: "precalculus-3-6-q10",
      topicId: "precalculus-3-6",
      concept: "multiplicative-transformations",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A student says the period of f(θ) = sin(−2θ) is −π, because 2π/(−2) = −π. Which of the following is the best response?",
      choices: [
        "The student is incorrect, because a period must be positive; the period is |1/b|·2π = π.",
        "The student is incorrect, because the period is 4π.",
        "The student is correct, because b = −2.",
        "The student is incorrect, because the period of any sine function is 2π.",
      ],
      correctAnswer: 0,
      explanation:
        "The period is the smallest positive value k with f(θ + k) = f(θ). The factor is |1/b|, so the period is (1/2)(2π) = π.",
      sourceIds: ["ced", "ced-topic-3-6"],
      choiceExplanations: [
        "The period uses the absolute value of 1/b.",
        "4π multiplies 2π by |b| instead of dividing.",
        "The period is defined as a positive value, so the sign of b does not carry over.",
        "Only sin θ itself has period 2π; b = −2 changes it.",
      ],
      nearMissIndex: 1,
      distinguisher: "The period uses |1/b|.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-3-6-mcq",
      courseId: "precalculus",
      unitId: "precalculus-3",
      topicId: "precalculus-3-6",
      title: "Sinusoidal Function Transformations multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-3-6-q01",
        "precalculus-3-6-q02",
        "precalculus-3-6-q03",
        "precalculus-3-6-q04",
        "precalculus-3-6-q05",
        "precalculus-3-6-q06",
        "precalculus-3-6-q07",
        "precalculus-3-6-q08",
        "precalculus-3-6-q09",
        "precalculus-3-6-q10",
      ],
    },
  ],
};

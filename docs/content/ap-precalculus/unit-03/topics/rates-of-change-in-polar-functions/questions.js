// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-3-15-q01",
      topicId: "precalculus-3-15",
      concept: "increasing-and-decreasing-distance",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "On an interval of θ, the polar function r = f(θ) is negative and decreasing. Which of the following is true about the distance between the point (f(θ), θ) and the origin on that interval?",
      choices: [
        "It is decreasing.",
        "It is constant.",
        "It is increasing.",
        "It is equal to f(θ).",
      ],
      correctAnswer: 2,
      explanation:
        "If r = f(θ) is negative and decreasing, its values move farther below 0, so |r|, the distance from the origin, is increasing.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "r is decreasing, but because r is negative, its size |r| grows.",
        "A changing r means a changing distance.",
        "Negative and decreasing: moving away from the origin.",
        "The distance is |f(θ)|, which is −f(θ) when f(θ) < 0.",
      ],
      nearMissIndex: 0,
      distinguisher: "For negative r, decreasing values mean growing distance.",
    },
    {
      id: "precalculus-3-15-q02",
      topicId: "precalculus-3-15",
      concept: "polar-rates-of-change",
      difficulty: "Quick check",
      skill: "apply-results",
      prompt:
        "What is the average rate of change of r = 3 + 2 sin θ with respect to θ over the interval 0 ≤ θ ≤ π/2?",
      choices: ["2", "4/π", "π/4", "1"],
      correctAnswer: 1,
      explanation: "(r(π/2) − r(0))/(π/2 − 0) = (5 − 3)/(π/2) = 4/π ≈ 1.273.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "2 is the change in r; divide by the change in θ, π/2.",
        "Change in r over change in θ.",
        "π/4 is the change in θ over the change in r, upside down.",
        "1 would require the change in θ to equal the change in r.",
      ],
      nearMissIndex: 0,
      distinguisher: "Divide by Δθ = π/2.",
    },
    {
      id: "precalculus-3-15-q03",
      topicId: "precalculus-3-15",
      concept: "polar-rates-of-change",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "For a polar function r = f(θ), the average rate of change of r with respect to θ over an interval is −1.5. Which of the following is the best interpretation?",
      choices: [
        "On average, the signed radius decreases by 1.5 units per radian over the interval.",
        "On average, the point moves 1.5 units closer to the origin per radian.",
        "On average, the angle decreases by 1.5 radians per unit of radius.",
        "The polar graph is a line with slope −1.5 over the interval.",
      ],
      correctAnswer: 0,
      explanation:
        "The average rate of change of r with respect to θ indicates the rate at which the signed radius is changing per radian.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "Signed radius per radian.",
        "That holds only if r stays positive; for negative r, a decreasing r moves away from the origin.",
        "The rate is radius per radian, not radians per radius.",
        "The rate describes r against θ, not the slope of the polar curve.",
      ],
      nearMissIndex: 1,
      distinguisher: "Signed radius is not the same as distance.",
    },
    {
      id: "precalculus-3-15-q04",
      topicId: "precalculus-3-15",
      concept: "increasing-and-decreasing-distance",
      difficulty: "Quick check",
      skill: "support-conclusions",
      prompt:
        "For r = 1 + 2 cos θ on the interval 2π/3 < θ < π, is the distance between the point (r, θ) and the origin increasing or decreasing?",
      choices: [
        "Decreasing, because r is decreasing",
        "Increasing, because r is positive and increasing",
        "Decreasing, because r is negative",
        "Increasing, because r is negative and decreasing",
      ],
      correctAnswer: 3,
      explanation:
        "On 2π/3 < θ < π, cos θ < −1/2, so r < 0, and cos θ is decreasing, so r is decreasing. Negative and decreasing means the distance is increasing.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "A decreasing r means a decreasing distance only when r is positive.",
        "r is negative on this interval: r(π) = −1.",
        "Negative alone does not decide; the direction of change matters too.",
        "r goes from 0 down to −1, so |r| goes from 0 up to 1.",
      ],
      nearMissIndex: 0,
      distinguisher: "Check the sign of r and the direction of change together.",
    },
    {
      id: "precalculus-3-15-q05",
      topicId: "precalculus-3-15",
      concept: "increasing-and-decreasing-distance",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "On the interval 0 < θ < π/2, at which value of θ is the point on the graph of r = 2 + sin(2θ) farthest from the origin?",
      choices: ["θ = π/8", "θ = π/2", "θ = π/4", "θ = π/3"],
      correctAnswer: 2,
      explanation:
        "r is positive and changes from increasing to decreasing where sin(2θ) is largest, at 2θ = π/2. So θ = π/4, where r = 3, is relatively farthest from the origin.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "At π/8, r = 2 + √2/2 ≈ 2.71, still increasing.",
        "At π/2, r = 2 + sin π = 2, back down to its starting value.",
        "r changes from increasing to decreasing at θ = π/4.",
        "At π/3, r = 2 + √3/2 ≈ 2.87, already decreasing.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Farthest is where r (positive) switches from increasing to decreasing.",
    },
    {
      id: "precalculus-3-15-q06",
      topicId: "precalculus-3-15",
      concept: "polar-rates-of-change",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "For a polar function r = f(θ), f(π/6) = 2.4 and f(π/3) = 3.0. Using the average rate of change of r with respect to θ over π/6 ≤ θ ≤ π/3, which is the best estimate of f(π/4)?",
      choices: ["0.6", "2.7", "about 1.146", "3.3"],
      correctAnswer: 1,
      explanation:
        "The average rate of change is 0.6/(π/6) = 3.6/π ≈ 1.146 per radian. π/4 is π/12 past π/6, so f(π/4) ≈ 2.4 + (3.6/π)(π/12) = 2.4 + 0.3 = 2.7.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "0.6 is the change in r over the whole interval.",
        "2.4 + (rate)(π/12) = 2.7.",
        "1.146 is the average rate of change, not an estimate of f(π/4).",
        "3.3 adds the change past the end of the interval.",
      ],
      nearMissIndex: 2,
      distinguisher: "Estimate = starting value + rate × change in θ.",
    },
    {
      id: "precalculus-3-15-q07",
      topicId: "precalculus-3-15",
      concept: "increasing-and-decreasing-distance",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "For the polar function r = 1 − 2 sin θ, on which of the following intervals is the distance between the point (r, θ) and the origin increasing?",
      choices: ["0 < θ < π/6", "π/6 < θ < π/2", "π/2 < θ < 5π/6", "0 < θ < π/2"],
      correctAnswer: 1,
      explanation:
        "On 0 < θ < π/2, r is decreasing from 1 to −1 and equals 0 at θ = π/6. On π/6 < θ < π/2, r is negative and decreasing, so the distance is increasing.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "On 0 < θ < π/6, r is positive and decreasing, so the distance is decreasing.",
        "Negative and decreasing.",
        "On π/2 < θ < 5π/6, r is negative and increasing toward 0, so the distance is decreasing.",
        "The distance decreases to 0 at θ = π/6 before it increases.",
      ],
      nearMissIndex: 0,
      distinguisher: "Split the interval where r = 0.",
    },
    {
      id: "precalculus-3-15-q08",
      topicId: "precalculus-3-15",
      concept: "polar-rates-of-change",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "What is the average rate of change of r = 4 cos(2θ) with respect to θ over the interval 0 ≤ θ ≤ π/4?",
      choices: ["−4", "16/π", "−π/16", "−16/π"],
      correctAnswer: 3,
      explanation: "(r(π/4) − r(0))/(π/4) = (0 − 4)/(π/4) = −16/π ≈ −5.09.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "−4 is the change in r; divide by π/4.",
        "r decreases from 4 to 0, so the rate is negative.",
        "−π/16 is the reciprocal of the rate.",
        "−4 divided by π/4.",
      ],
      nearMissIndex: 0,
      distinguisher: "Dividing by π/4 multiplies by 4/π.",
    },
    {
      id: "precalculus-3-15-q09",
      topicId: "precalculus-3-15",
      concept: "increasing-and-decreasing-distance",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "The polar function r = 3 − 2 cos θ changes from decreasing to increasing at θ = 0, and r > 0 for all θ. What does this tell you about the point on the graph with θ = 0?",
      choices: [
        "It is relatively farthest from the origin.",
        "It is relatively closest to the origin.",
        "It is at the origin.",
        "It is where the graph crosses the polar axis twice.",
      ],
      correctAnswer: 1,
      explanation:
        "A change from decreasing to increasing is a relative minimum of r. Since r > 0, the point (1, 0) is relatively closest to the origin.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "Farthest would be a change from increasing to decreasing, as at θ = π, where r = 5.",
        "Relative minimum of positive r: closest point.",
        "r(0) = 3 − 2 = 1, not 0.",
        "A polar curve passes through a single point at each θ; the extremum describes distance.",
      ],
      nearMissIndex: 0,
      distinguisher: "Positive r with a relative minimum means a closest point.",
    },
    {
      id: "precalculus-3-15-q10",
      topicId: "precalculus-3-15",
      concept: "polar-rates-of-change",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "For r = 2 + 2 cos θ, a student uses the average rate of change of r over 0 ≤ θ ≤ π/2 to estimate r at θ = π/4 and gets 3. Which of the following is the best statement about the estimate?",
      choices: [
        "It is exact, because the average rate of change gives the rate at every θ.",
        "It is wrong, because an average rate of change cannot be used to estimate values.",
        "It is reasonable but not exact; r(π/4) = 2 + √2 ≈ 3.41, because r does not change at a constant rate.",
        "It should be 4 − 4/π ≈ 2.73, using a change in θ of 1 radian.",
      ],
      correctAnswer: 2,
      explanation:
        "The rate is (2 − 4)/(π/2) = −4/π, so the estimate is 4 + (−4/π)(π/4) = 3. The average rate of change can be used to estimate values within the interval, but the actual value is 2 + 2 cos(π/4) = 2 + √2 ≈ 3.41.",
      sourceIds: ["ced", "ced-topic-3-15"],
      choiceExplanations: [
        "An average rate describes the whole interval, not each point in it.",
        "Average rates of change can be used to estimate values of the function within the interval.",
        "Estimate 3, actual about 3.41.",
        "π/4 − 0 = π/4, not 1.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "An estimate from an average rate is close, not exact, unless r changes at a constant rate.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-3-15-mcq",
      courseId: "precalculus",
      unitId: "precalculus-3",
      topicId: "precalculus-3-15",
      title: "Rates of Change in Polar Functions multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-3-15-q01",
        "precalculus-3-15-q02",
        "precalculus-3-15-q03",
        "precalculus-3-15-q04",
        "precalculus-3-15-q05",
        "precalculus-3-15-q06",
        "precalculus-3-15-q07",
        "precalculus-3-15-q08",
        "precalculus-3-15-q09",
        "precalculus-3-15-q10",
      ],
    },
  ],
};

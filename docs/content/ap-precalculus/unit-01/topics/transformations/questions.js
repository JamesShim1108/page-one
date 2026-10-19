// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-1-12-q01",
      topicId: "precalculus-1-12",
      concept: "shifts",
      difficulty: "Quick check",
      skill: "describe",
      prompt: "How does the graph of g(x) = f(x − 4) + 1 compare with the graph of f?",
      choices: [
        "It is shifted right 4 units and up 1 unit",
        "It is shifted left 4 units and up 1 unit",
        "It is shifted right 1 unit and up 4 units",
        "It is shifted left 1 unit and down 4 units",
      ],
      correctAnswer: 0,
      explanation:
        "Subtracting 4 inside the parentheses moves the graph right 4 units, and adding 1 outside moves it up 1 unit.",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "The input x − 4 moves each point right by 4, and the added 1 moves it up by 1.",
        "A subtraction inside the parentheses shifts right, not left.",
        "This swaps the roles of the two constants. The inside change is 4 and the outside change is 1.",
        "Both directions and sizes are reversed.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Inside changes move the graph sideways in the opposite direction of the sign.",
    },
    {
      id: "precalculus-1-12-q02",
      topicId: "precalculus-1-12",
      concept: "shifts",
      difficulty: "Quick check",
      skill: "solve",
      prompt:
        "The graph of f contains the point (2, 5). Which point must be on the graph of g(x) = f(x + 3) − 2?",
      choices: ["(5, 3)", "(−1, 7)", "(−1, 3)", "(5, 7)"],
      correctAnswer: 2,
      explanation:
        "For g(x) = f(x + 3) − 2, the input x + 3 must equal 2, so x = −1. Then g(−1) = f(2) − 2 = 3. The point is (−1, 3).",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "x = 5 would make x + 3 equal 8, not 2. The graph moves left, not right.",
        "The horizontal move is right, but the output should decrease by 2, giving 3, not 7.",
        "g(−1) = f(−1 + 3) − 2 = f(2) − 2 = 3.",
        "Both moves go the wrong way. The input moves left and the output moves down.",
      ],
      nearMissIndex: 0,
      distinguisher: "Find the input that makes the inside equal the old x-coordinate.",
    },
    {
      id: "precalculus-1-12-q03",
      topicId: "precalculus-1-12",
      concept: "dilations-reflections",
      difficulty: "Quick check",
      skill: "describe",
      prompt: "Which transformation reflects the graph of f across the x-axis?",
      choices: ["g(x) = f(−x)", "g(x) = −f(x)", "g(x) = 1/f(x)", "g(x) = −x·f(x)"],
      correctAnswer: 1,
      explanation:
        "Reflecting across the x-axis changes the sign of every output while the input stays the same. That is g(x) = −f(x).",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "f(−x) changes the sign of the input, which reflects across the y-axis.",
        "Multiplying the output by −1 flips each point over the x-axis.",
        "1/f(x) takes the reciprocal of the outputs, which is not a reflection.",
        "This multiplies f by −x, which changes the shape in a way that depends on x.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A sign change on the output reflects across the x-axis, and on the input across the y-axis.",
    },
    {
      id: "precalculus-1-12-q04",
      topicId: "precalculus-1-12",
      concept: "dilations-reflections",
      difficulty: "Quick check",
      skill: "solve",
      prompt:
        "The graph of f contains the point (6, −4). Which point is on the graph of h(x) = f(x/3)?",
      choices: ["(2, −4)", "(6, −12)", "(18, −12)", "(18, −4)"],
      correctAnswer: 3,
      explanation:
        "For h(x) = f(x/3), the input x/3 must equal 6, so x = 18. The output stays −4. The point is (18, −4).",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "This divides the x-coordinate by 3, but dividing the input stretches the graph and multiplies x-coordinates by 3.",
        "The output of a change in the input does not change, so −4 stays as it is.",
        "The output is not multiplied here. Only the input has been changed.",
        "x/3 = 6 gives x = 18, and the output remains −4.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Solve for the new input that makes the inside equal the old x-coordinate.",
    },
    {
      id: "precalculus-1-12-q05",
      topicId: "precalculus-1-12",
      concept: "combining",
      difficulty: "Core",
      skill: "apply-results",
      prompt: "Values of f are shown. If g(x) = −2·f(x − 1) + 3, what is g(2)?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of f",
          columns: ["x", "f(x)"],
          rows: [
            ["−1", "3"],
            ["0", "1"],
            ["1", "−2"],
            ["2", "4"],
          ],
        },
      ],
      choices: ["7", "−5", "−1", "1"],
      correctAnswer: 0,
      explanation: "g(2) = −2·f(2 − 1) + 3 = −2·f(1) + 3 = −2(−2) + 3 = 7.",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "f(1) = −2, so −2·(−2) + 3 = 7.",
        "This uses f(2) = 4, which means the input was not shifted. The input is 2 − 1 = 1.",
        "This adds the wrong sign to the shift, using 2·f(1) + 3.",
        "This subtracts 3 and keeps the multiplier −2, giving 4 − 3.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Do the inside first: find the value of f at x − 1, then the outside operations.",
    },
    {
      id: "precalculus-1-12-q06",
      topicId: "precalculus-1-12",
      concept: "combining",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "Which rule reflects f across the x-axis, then shifts the graph left 2 units and up 5 units?",
      choices: [
        "g(x) = −f(x − 2) + 5",
        "g(x) = f(−x + 2) + 5",
        "g(x) = −f(x) + 7",
        "g(x) = −f(x + 2) + 5",
      ],
      correctAnswer: 3,
      explanation:
        "A reflection across the x-axis negates the output, giving −f(x). Shifting left 2 replaces x with x + 2, and shifting up 5 adds 5. The result is −f(x + 2) + 5.",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "This shifts the graph right 2 units, because x − 2 is inside the function.",
        "This reflects across the y-axis, because the sign change is on the input.",
        "Adding 7 shifts the graph up, but there is no horizontal shift.",
        "The negative on the output reflects across the x-axis, x + 2 shifts left, and +5 shifts up.",
      ],
      nearMissIndex: 0,
      distinguisher: "Left means plus inside the parentheses.",
    },
    {
      id: "precalculus-1-12-q07",
      topicId: "precalculus-1-12",
      concept: "domain-and-range",
      difficulty: "Core",
      skill: "identify-information",
      prompt: "What are the asymptotes of g(x) = 1/(x − 2) + 3?",
      choices: [
        "x = −2 and y = 3",
        "x = 2 and y = −3",
        "x = 2 and y = 3",
        "x = 3 and y = 2",
      ],
      correctAnswer: 2,
      explanation:
        "The parent function 1/x has asymptotes x = 0 and y = 0. Replacing x with x − 2 moves the vertical asymptote to x = 2, and adding 3 moves the horizontal asymptote to y = 3.",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "The vertical asymptote is where x − 2 = 0, which is x = 2 and not −2.",
        "Adding 3 raises the horizontal asymptote to y = 3, not −3.",
        "The inside shift gives x = 2, and the outside shift gives y = 3.",
        "The constants are swapped. The inside constant 2 gives the vertical asymptote.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Vertical asymptotes come from the inside, and horizontal asymptotes from the outside.",
    },
    {
      id: "precalculus-1-12-q08",
      topicId: "precalculus-1-12",
      concept: "domain-and-range",
      difficulty: "Core",
      skill: "solve",
      prompt:
        "The function f(x) = x² has range [0, ∞). What is the range of h(x) = −2f(x) + 3?",
      choices: ["[3, ∞)", "(−∞, 3]", "(−∞, −3]", "[−3, ∞)"],
      correctAnswer: 1,
      explanation:
        "Since x² ≥ 0, we have −2x² ≤ 0. Adding 3 gives h(x) ≤ 3, with 3 reached at x = 0. The range is (−∞, 3].",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "This ignores the negative multiplier. Multiplying by −2 flips the graph so it opens downward.",
        "The largest output is h(0) = 3, and the outputs fall from there without bound.",
        "The shift is +3, which raises the largest output to 3, not −3.",
        "The reflection reverses the direction, and the shift is up, so −3 is not the boundary.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Apply the output operations in order to the endpoints of the range, and note when an inequality reverses.",
    },
    {
      id: "precalculus-1-12-q09",
      topicId: "precalculus-1-12",
      concept: "shifts",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A student says g(x) = f(x + 3) shifts the graph of f right by 3 because there is a plus sign. What is the best correction?",
      choices: [
        "The graph shifts left by 3, because the input must be 3 smaller to give the same output as f",
        "The graph shifts right by 3 and up by 3, because the plus sign appears twice",
        "The graph shifts up by 3, because adding 3 raises the outputs",
        "The graph is stretched horizontally by 3, because 3 multiplies the input",
      ],
      correctAnswer: 0,
      explanation:
        "g(x) = f(x + 3) outputs the same value as f at the input x + 3. For example, g(−3) = f(0), so the point at x = 0 on f appears at x = −3 on g. The graph shifts left by 3.",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "g(−3) = f(0), so each point of f is found 3 units to the left on g.",
        "The plus sign appears once, and it is inside the parentheses, so there is no vertical shift.",
        "Adding to the output would shift the graph up, but this 3 is added to the input.",
        "Adding 3 does not multiply the input, so it does not stretch the graph.",
      ],
      nearMissIndex: 2,
      distinguisher: "Test one input to see where a point of f lands on g.",
    },
    {
      id: "precalculus-1-12-q10",
      topicId: "precalculus-1-12",
      concept: "combining",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "The population of a town is modeled by P(t) million people, t years after 2020. A second town follows the same pattern but five years later, and is modeled by Q(t) = P(t − 5). What does this tell you?",
      choices: [
        "Q(t) is 5 million larger than P(t) at every time t",
        "Q(t) is 5 times as large as P(t) at every time t",
        "The second town's population reaches each value 5 years before the first",
        "The second town's population reaches each value 5 years after the first town's does",
      ],
      correctAnswer: 3,
      explanation:
        "Q(t) = P(t − 5) means the output at time t equals the first town's output 5 years earlier. For example, Q(7) = P(2). So the second town reaches each population level 5 years later.",
      sourceIds: ["ced", "ced-topic-1-12"],
      choiceExplanations: [
        "Adding to the outputs would give P(t) + 5, but the 5 is inside the function here.",
        "Multiplying the outputs would give 5·P(t), which is not what is written.",
        "The inside shift moves the graph right, so the events occur later, not earlier.",
        "Q(7) = P(2), so the value the first town had at t = 2 appears for the second at t = 7.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "A shift to the right delays the pattern, so the events happen later.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-1-12-quick",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-12",
      title: "Quick check",
      quizType: "quick",
      questionIds: [
        "precalculus-1-12-q01",
        "precalculus-1-12-q02",
        "precalculus-1-12-q03",
        "precalculus-1-12-q04",
      ],
    },
    {
      id: "precalculus-1-12-quiz",
      courseId: "precalculus",
      unitId: "precalculus-1",
      topicId: "precalculus-1-12",
      title: "Transformations of Functions topic practice",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "precalculus-1-12-q05",
        "precalculus-1-12-q06",
        "precalculus-1-12-q07",
        "precalculus-1-12-q08",
        "precalculus-1-12-q09",
        "precalculus-1-12-q10",
      ],
    },
  ],
};

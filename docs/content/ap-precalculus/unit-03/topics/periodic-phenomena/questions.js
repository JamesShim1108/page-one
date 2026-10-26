// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-3-1-q01",
      topicId: "precalculus-3-1",
      concept: "periodic-relationships",
      difficulty: "Quick check",
      skill: "describe",
      prompt: "Which of the following relationships is periodic?",
      choices: [
        "The amount in a savings account that earns 3% interest compounded yearly, as a function of time",
        "The temperature of a cup of hot tea left on a table, as a function of time",
        "The height of a seat on a Ferris wheel that turns at a constant speed, as a function of time",
        "The distance a car traveling at a constant 50 miles per hour has gone, as a function of time",
      ],
      correctAnswer: 2,
      explanation:
        "As the wheel turns, the seat's height rises and falls through the same pattern over each equal-length interval of time, so the relationship is periodic.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "The balance keeps increasing; no pattern of outputs repeats.",
        "The tea's temperature falls toward room temperature and levels off, but it never repeats a cycle.",
        "The seat repeats the same heights each time the wheel completes a turn.",
        "The distance increases at a constant rate, which is linear, not periodic.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Leveling off is not repeating; a periodic pattern starts over again and again.",
    },
    {
      id: "precalculus-3-1-q02",
      topicId: "precalculus-3-1",
      concept: "period",
      difficulty: "Quick check",
      skill: "apply-results",
      prompt:
        "A function f has period 6, and f(2) = 5. Which of the following must also equal 5?",
      choices: ["f(12)", "f(7)", "f(11)", "f(−10)"],
      correctAnswer: 3,
      explanation:
        "Inputs that differ by a multiple of the period give the same output. Since −10 = 2 − 2(6), f(−10) = f(2) = 5.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "12 is a multiple of 6, but 12 − 2 = 10 is not, so f(12) equals f(0), not f(2).",
        "7 − 2 = 5 is not a multiple of 6.",
        "11 − 2 = 9 is not a multiple of 6.",
        "−10 differs from 2 by −12, two full periods.",
      ],
      nearMissIndex: 0,
      distinguisher: "Count the period from the known input, 2, not from 0.",
    },
    {
      id: "precalculus-3-1-q03",
      topicId: "precalculus-3-1",
      concept: "period",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "The table gives values of a periodic function h at equally spaced inputs. Based on the table, which of the following is the best estimate of the period of h?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of h",
          columns: ["x", "0", "1", "2", "3", "4", "5", "6", "7", "8"],
          rows: [["h(x)", "4", "7", "9", "7", "4", "1", "−1", "1", "4"]],
        },
      ],
      choices: ["2", "4", "8", "9"],
      correctAnswer: 2,
      explanation:
        "The output 4 appears again at x = 4, but the outputs then go 1, −1, 1 instead of 7, 9, 7. The full pattern 4, 7, 9, 7, 4, 1, −1, 1 starts over at x = 8, so the period is about 8.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "h(0) and h(2) are not equal, so the pattern does not repeat every 2.",
        "h(4) = h(0), but h(5) = 1 while h(1) = 7, so the pattern has not started over.",
        "The sequence of outputs begins again at x = 8.",
        "9 is the largest output value, not an input interval.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "A repeated output is not a repeated pattern; the outputs that follow must match too.",
    },
    {
      id: "precalculus-3-1-q04",
      topicId: "precalculus-3-1",
      concept: "period",
      difficulty: "Quick check",
      skill: "apply-results",
      prompt:
        "The table gives the values of a function g over one period, 0 ≤ x < 4. The function g has period 4. What is the value of g(11)?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Values of g on one period",
          columns: ["x", "0", "1", "2", "3"],
          rows: [["g(x)", "2", "5", "3", "−1"]],
        },
      ],
      choices: ["5", "−1", "3", "2"],
      correctAnswer: 1,
      explanation: "Subtract whole periods: 11 − 2(4) = 3, so g(11) = g(3) = −1.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "5 is g(1). That would require 11 − 1 = 10 to be a multiple of 4.",
        "11 − 8 = 3, so g(11) = g(3) = −1.",
        "3 is g(2), and also the input 3. g(11) is the output at x = 3, not the number 3.",
        "2 is g(0); 11 is not a multiple of 4.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "Reduce the input by whole periods, then read the output at that input.",
    },
    {
      id: "precalculus-3-1-q05",
      topicId: "precalculus-3-1",
      concept: "periodic-relationships",
      difficulty: "Core",
      skill: "construct-representations",
      prompt:
        "A windshield wiper's angle W(t), in degrees, increases at a constant rate from 0 to 90 for 0 ≤ t ≤ 1 and decreases at a constant rate back to 0 for 1 ≤ t ≤ 2, where t is in seconds. This pattern repeats. On which of the following intervals is W decreasing?",
      choices: ["4 < t < 5", "6 < t < 7", "2 < t < 3", "7 < t < 8"],
      correctAnswer: 3,
      explanation:
        "W has period 2 and decreases on 1 < t < 2. Adding three periods gives 7 < t < 8.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "4 < t < 5 is 0 < t < 1 shifted by two periods, where W increases.",
        "6 < t < 7 is three periods after 0 < t < 1, where W increases. The decreasing interval comes one second later.",
        "2 < t < 3 is one period after 0 < t < 1, where W increases.",
        "7 < t < 8 is 1 < t < 2 shifted by 3 periods of 2 seconds.",
      ],
      nearMissIndex: 1,
      distinguisher: "Shift the decreasing interval 1 < t < 2, not the increasing one.",
    },
    {
      id: "precalculus-3-1-q06",
      topicId: "precalculus-3-1",
      concept: "period",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "A periodic function f has period 5. On the interval 0 ≤ x < 5, f has exactly two relative maximums. How many relative maximums does f have on the interval 0 ≤ x < 20?",
      choices: ["4", "8", "10", "2"],
      correctAnswer: 1,
      explanation:
        "The interval 0 ≤ x < 20 contains 20/5 = 4 full periods, and every period has the same two relative maximums, so there are 4(2) = 8.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "4 counts the periods, not the maximums in them.",
        "Four periods with two relative maximums each gives 8.",
        "10 divides the interval length by the number of maximums, 20/2, instead of using the period.",
        "Characteristics in one period appear in every period, so there are more than two.",
      ],
      nearMissIndex: 2,
      distinguisher: "Number of periods times maximums per period.",
    },
    {
      id: "precalculus-3-1-q07",
      topicId: "precalculus-3-1",
      concept: "period",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "For a function f, f(x + 4) = f(x) for all real numbers x, and no smaller positive number has this property. Which of the following must be true?",
      choices: [
        "f(x + 12) = f(x) for all real numbers x.",
        "f(x + 2) = f(x) for all real numbers x.",
        "f(4x) = f(x) for all real numbers x.",
        "f(x) + 4 = f(x) for all real numbers x.",
      ],
      correctAnswer: 0,
      explanation:
        "The period is 4, so f(x + 12) = f(x + 4 + 4 + 4) = f(x). Adding any whole number of periods to the input leaves the output unchanged.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "12 is three periods.",
        "If this were true, 2 would be a smaller positive number with the property.",
        "The period describes adding to the input, not multiplying it.",
        "This would mean 4 = 0. The period is added to the input, not the output.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "Multiples of the period work; numbers smaller than the period cannot.",
    },
    {
      id: "precalculus-3-1-q08",
      topicId: "precalculus-3-1",
      concept: "period",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "A function p satisfies p(0) = 3, p(4) = 3, and p(8) = 3. A student concludes that p must be periodic with period 4. Which of the following is the best response?",
      choices: [
        "The student is correct, because p repeats the same output every 4 units.",
        "The student is incorrect, because a period cannot be found from a table.",
        "The student is correct, because three equal outputs are enough to find a period.",
        "The student is incorrect, because three equal outputs do not show that every output repeats.",
      ],
      correctAnswer: 3,
      explanation:
        "A period requires p(x + 4) = p(x) for all x in the domain. Three matching outputs say nothing about the inputs between them; p could even be a constant function or not periodic at all.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "Only three outputs are known, not the outputs for every x.",
        "A period can be estimated from data, but it takes the whole pattern of outputs, not three matching values.",
        "The definition needs f(x + k) = f(x) for all x, not for a few values.",
        "A period must work for every input in the domain.",
      ],
      nearMissIndex: 0,
      distinguisher: "'For all x' is the key phrase in the definition of a period.",
    },
    {
      id: "precalculus-3-1-q09",
      topicId: "precalculus-3-1",
      concept: "period",
      difficulty: "Core",
      skill: "identify-information",
      prompt:
        "The table gives the number of hours of daylight D(m) in a city m months after January 1, over two years. Based on the table, what is the best estimate of the period of D?",
      stimulusBlocks: [
        {
          type: "table",
          caption: "Hours of daylight",
          columns: ["m", "0", "3", "6", "9", "12", "15", "18", "21", "24"],
          rows: [["D(m)", "9.5", "12", "14.5", "12", "9.5", "12", "14.5", "12", "9.5"]],
        },
      ],
      choices: ["6 months", "3 months", "12 months", "24 months"],
      correctAnswer: 2,
      explanation:
        "The pattern 9.5, 12, 14.5, 12 starts over at m = 12, so the period is about 12 months.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "D(3) = D(9) = 12, but D(6) = 14.5 is not D(12) = 9.5, so the pattern does not repeat every 6 months.",
        "3 months is the spacing between data values.",
        "The outputs repeat their full pattern every 12 months.",
        "D repeats every 24 months too, but 12 is the smallest such interval.",
      ],
      nearMissIndex: 0,
      distinguisher: "The period is the smallest repeating interval.",
    },
    {
      id: "precalculus-3-1-q10",
      topicId: "precalculus-3-1",
      concept: "period",
      difficulty: "Core",
      skill: "describe",
      prompt:
        "A periodic function k has period 10. The graph of k is concave down on the interval 2 < x < 5. Which of the following must be true?",
      choices: [
        "The graph of k is concave down on 7 < x < 10.",
        "The graph of k is concave up on 12 < x < 15.",
        "The graph of k is concave down on 32 < x < 35.",
        "The graph of k is concave down on 22 < x < 26.",
      ],
      correctAnswer: 2,
      explanation:
        "32 < x < 35 is 2 < x < 5 shifted by 3 periods of 10, so the graph has the same concavity there.",
      sourceIds: ["ced", "ced-topic-3-1"],
      choiceExplanations: [
        "7 < x < 10 is a shift of half a period, which tells you nothing about concavity.",
        "12 < x < 15 is one period later, so the graph is concave down there, not up.",
        "30 = 3(10), a whole number of periods.",
        "Concave down is known only on 22 < x < 25. Nothing is known about 25 ≤ x < 26.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Shift by whole periods only, and keep the interval the same length.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-3-1-mcq",
      courseId: "precalculus",
      unitId: "precalculus-3",
      topicId: "precalculus-3-1",
      title: "Periodic Phenomena multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-3-1-q01",
        "precalculus-3-1-q02",
        "precalculus-3-1-q03",
        "precalculus-3-1-q04",
        "precalculus-3-1-q05",
        "precalculus-3-1-q06",
        "precalculus-3-1-q07",
        "precalculus-3-1-q08",
        "precalculus-3-1-q09",
        "precalculus-3-1-q10",
      ],
    },
  ],
};

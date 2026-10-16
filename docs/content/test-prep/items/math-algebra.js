// Algebra items. Original practice written by Page One; skill names and formats
// follow the official SAT Suite descriptions, but no official item is copied or
// paraphrased. Every key is computed by the build from `verification`.

const ids = ["A", "B", "C", "D"];
const choices = (texts) => texts.map((text, index) => ({ id: ids[index], text }));
const values = (list) =>
  Object.fromEntries(list.map((value, index) => [ids[index], value]));

export const items = [
  // Linear functions
  {
    schemaVersion: 1,
    id: "tp-math-lf-001",
    skillId: "math-linear-functions",
    difficulty: "easy",
    format: "single-select",
    stem: "A tutoring center charges a one-time registration fee plus a fixed amount for each session. The total cost, in dollars, for n sessions is C(n) = 35n + 60. What is the cost, in dollars, of each session?",
    choices: choices(["25", "35", "60", "95"]),
    answer: "B",
    nearMiss: "C",
    explanation:
      "In C(n) = 35n + 60, the cost rises by 35 for each added session, so 35 is the cost per session. The constant 60 is paid once, no matter how many sessions there are.",
    rationales: {
      A: "This subtracts the per-session cost from the fee, which has no meaning in the model.",
      C: "This is the one-time registration fee, because it is the part of the cost that does not depend on n.",
      D: "This is the total cost of exactly one session including the fee, not the cost of each session.",
    },
    verification: {
      kind: "value",
      compute: "35",
      choiceValues: values(["25", "35", "60", "95"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-lf-002",
    skillId: "math-linear-functions",
    difficulty: "medium",
    format: "grid-in",
    stem: "The function f is linear, f(2) = 11, and f(6) = 27. What is the value of f(10)?",
    acceptedAnswers: ["43"],
    explanation:
      "The slope is (27 − 11) / (6 − 2) = 4, so f increases by 4 for each increase of 1 in x. From x = 6 to x = 10, f increases by 4 × 4 = 16, so f(10) = 27 + 16 = 43.",
    verification: { kind: "value", compute: "27 + ((27 - 11) / (6 - 2)) * (10 - 6)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-lf-003",
    skillId: "math-linear-functions",
    difficulty: "medium",
    format: "single-select",
    stem: "A candle is 30 centimeters tall when it is lit, and its height decreases by 1.5 centimeters each hour. Which function h gives the candle's height, in centimeters, t hours after it is lit?",
    choices: choices([
      "h(t) = 1.5t − 30",
      "h(t) = 30t − 1.5",
      "h(t) = 28.5t",
      "h(t) = 30 − 1.5t",
    ]),
    answer: "D",
    nearMiss: "B",
    explanation:
      "The height starts at 30 when t = 0 and falls by 1.5 for every hour, so the starting value is 30 and the rate of change is −1.5: h(t) = 30 − 1.5t.",
    rationales: {
      A: "This has the right rate but the wrong sign throughout, so it gives a height of −30 when the candle is lit.",
      B: "This swaps the roles of the numbers, treating 30 as the hourly change and 1.5 as the starting height.",
      C: "This combines the starting height and the hourly change into one rate, so the height would grow over time.",
    },
    verification: {
      kind: "expression",
      variables: ["t"],
      compute: "30 - 1.5 * t",
      choiceExpressions: values([
        "1.5 * t - 30",
        "30 * t - 1.5",
        "28.5 * t",
        "30 - 1.5 * t",
      ]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-lf-004",
    skillId: "math-linear-functions",
    difficulty: "hard",
    format: "single-select",
    stem: "For the linear function g, the graph of y = g(x) in the xy-plane passes through the points (−4, 9) and (8, 0). What is the y-intercept of the graph?",
    choices: choices(["(0, 6)", "(0, −6)", "(0, 9)", "(0, 12)"]),
    answer: "A",
    nearMiss: "D",
    explanation:
      "The slope is (0 − 9) / (8 − (−4)) = −9/12 = −3/4. Using (8, 0): 0 = (−3/4)(8) + b, so b = 6, and the y-intercept is (0, 6).",
    rationales: {
      B: "This makes a sign error when solving 0 = −6 + b, giving b = −6 instead of 6.",
      C: "This uses the y-coordinate of the point (−4, 9), which is not on the y-axis.",
      D: "This makes a sign error with (−4, 9), adding 3 to 9 instead of subtracting it.",
    },
    verification: {
      kind: "value",
      compute: "0 - ((0 - 9) / (8 - -4)) * 8",
      choiceValues: values(["6", "-6", "9", "12"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-lf-005",
    skillId: "math-linear-functions",
    difficulty: "hard",
    format: "grid-in",
    stem: "A plumber charges a flat fee plus an hourly rate. A 2-hour job costs $190, and a 5-hour job costs $385. What is the flat fee, in dollars?",
    acceptedAnswers: ["60"],
    explanation:
      "Three extra hours add 385 − 190 = 195 dollars, so the hourly rate is 195 / 3 = 65 dollars. For the 2-hour job, 190 − 2(65) = 60, so the flat fee is $60.",
    verification: { kind: "value", compute: "190 - 2 * ((385 - 190) / (5 - 2))" },
  },

  // Linear equations in two variables
  {
    schemaVersion: 1,
    id: "tp-math-le-001",
    skillId: "math-linear-equations-two",
    difficulty: "easy",
    format: "single-select",
    stem: "The equation 4x + 5y = 60 relates the number of 4-pound bags, x, and 5-pound bags, y, in a shipment that weighs 60 pounds in all. If the shipment has 5 four-pound bags, how many 5-pound bags does it have?",
    choices: choices(["4", "10", "8", "12"]),
    answer: "C",
    nearMiss: "B",
    explanation: "Substitute x = 5: 4(5) + 5y = 60, so 5y = 40 and y = 8.",
    rationales: {
      A: "This divides the 20 pounds of 4-pound bags by 5 instead of finding the weight that remains.",
      B: "This finds the 40 pounds that remain but divides by 4 instead of by 5.",
      D: "This divides the full 60 pounds by 5, ignoring the 4-pound bags already in the shipment.",
    },
    verification: {
      kind: "value",
      compute: "(60 - 4 * 5) / 5",
      choiceValues: values(["4", "10", "8", "12"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-le-002",
    skillId: "math-linear-equations-two",
    difficulty: "medium",
    format: "single-select",
    stem: "In the xy-plane, the graph of 3x − 2y = 18 crosses the x-axis at the point (a, 0). What is the value of a?",
    choices: choices(["−9", "6", "9", "−6"]),
    answer: "B",
    nearMiss: "A",
    explanation: "On the x-axis, y = 0, so 3a − 2(0) = 18 and a = 6.",
    rationales: {
      A: "This sets x = 0 and finds the y-intercept, y = −9, instead of the x-intercept.",
      C: "This divides 18 by 2, the coefficient of y, instead of by 3.",
      D: "This makes a sign error when dividing 18 by 3.",
    },
    verification: {
      kind: "value",
      compute: "18 / 3",
      choiceValues: values(["-9", "6", "9", "-6"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-le-003",
    skillId: "math-linear-equations-two",
    difficulty: "medium",
    format: "grid-in",
    stem: "The line with equation 2x + 7y = 21 is graphed in the xy-plane. What is the slope of the line?",
    acceptedAnswers: ["-2/7", "-.2857", "-0.285", "-0.286"],
    explanation:
      "Solve for y: 7y = −2x + 21, so y = (−2/7)x + 3. The slope is −2/7, or about −0.2857.",
    verification: { kind: "value", compute: "R(-2, 7)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-le-004",
    skillId: "math-linear-equations-two",
    difficulty: "medium",
    format: "single-select",
    stem: "A theater sells adult tickets for $12 each and student tickets for $8 each. One night, ticket sales totaled $1,000. Which equation relates the number of adult tickets, a, and student tickets, s, sold that night?",
    choices: choices([
      "12a + 8s = 1,000",
      "8a + 12s = 1,000",
      "20(a + s) = 1,000",
      "a + s = 1,000",
    ]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "Adult tickets bring in 12a dollars and student tickets bring in 8s dollars, so the total is 12a + 8s = 1,000.",
    rationales: {
      B: "This attaches each price to the wrong kind of ticket.",
      C: "This charges $20 for every ticket, as though each sale were one adult and one student ticket together.",
      D: "This sets the number of tickets equal to the number of dollars collected.",
    },
    verification: {
      kind: "expression",
      variables: ["a", "s"],
      compute: "12 * a + 8 * s - 1000",
      choiceExpressions: values([
        "12 * a + 8 * s - 1000",
        "8 * a + 12 * s - 1000",
        "20 * (a + s) - 1000",
        "a + s - 1000",
      ]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-le-005",
    skillId: "math-linear-equations-two",
    difficulty: "hard",
    format: "grid-in",
    stem: "The point (k, k + 4) lies on the line 5x − 3y = 2. What is the value of k?",
    acceptedAnswers: ["7"],
    explanation:
      "Substitute: 5k − 3(k + 4) = 2, so 5k − 3k − 12 = 2, 2k = 14, and k = 7.",
    verification: { kind: "value", compute: "(2 + 3 * 4) / (5 - 3)" },
  },

  // Linear inequalities
  {
    schemaVersion: 1,
    id: "tp-math-li-001",
    skillId: "math-linear-inequalities",
    difficulty: "easy",
    format: "single-select",
    stem: "A van can carry at most 1,200 pounds. The driver weighs 180 pounds, and each box weighs 40 pounds. What is the greatest number of boxes the van can carry along with the driver?",
    choices: choices(["26", "30", "34", "25"]),
    answer: "D",
    nearMiss: "A",
    explanation:
      "The boxes can weigh at most 1,200 − 180 = 1,020 pounds. Since 1,020 / 40 = 25.5 and only whole boxes count, the greatest number is 25.",
    rationales: {
      A: "This rounds 25.5 up, but 26 boxes would weigh 1,040 pounds and put the van over its limit.",
      B: "This divides 1,200 by 40 and leaves out the driver's weight.",
      C: "This adds the driver's weight to the limit instead of subtracting it.",
    },
    verification: {
      kind: "value",
      compute: "Math.floor((1200 - 180) / 40)",
      choiceValues: values(["26", "30", "34", "25"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-li-002",
    skillId: "math-linear-inequalities",
    difficulty: "medium",
    format: "single-select",
    stem: "Which value of x is a solution to the inequality 7 − 2x > 15?",
    choices: choices(["−4", "4", "−6.5", "11"]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "Subtract 7 and divide by −2, reversing the inequality: x < −4. Of the choices, only −6.5 is less than −4.",
    rationales: {
      A: "This is the boundary value, but at x = −4 the two sides are equal, so the strict inequality is false.",
      B: "This forgets to reverse the inequality when dividing by a negative number.",
      D: "This adds 7 to 15 and divides by 2, which solves a different inequality.",
    },
    verification: {
      kind: "predicate",
      variables: ["x"],
      condition: "7 - 2 * x > 15",
      choicePoints: values([[-4], [4], [-6.5], [11]]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-li-003",
    skillId: "math-linear-inequalities",
    difficulty: "medium",
    format: "grid-in",
    stem: "What is the least integer value of n that satisfies 5(n − 2) ≥ 3n + 9?",
    acceptedAnswers: ["10"],
    explanation:
      "Expand: 5n − 10 ≥ 3n + 9, so 2n ≥ 19 and n ≥ 9.5. The least integer that is at least 9.5 is 10.",
    verification: { kind: "value", compute: "Math.ceil((9 + 10) / (5 - 3))" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-li-004",
    skillId: "math-linear-inequalities",
    difficulty: "hard",
    format: "single-select",
    stem: "A school club needs to raise at least $600. It has already raised $135 and earns $15 for each T-shirt it sells. Which inequality gives the numbers of T-shirts, t, the club can sell to meet its goal?",
    choices: choices([
      "15t + 135 ≤ 600",
      "15t + 135 ≥ 600",
      "135t + 15 ≥ 600",
      "15t ≥ 600 + 135",
    ]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "The total raised is the $135 already collected plus $15 for each shirt, and it must be at least $600: 15t + 135 ≥ 600.",
    rationales: {
      A: "This uses the right total but the wrong direction, describing amounts that stay at or below the goal.",
      C: "This swaps the amount already raised with the amount earned per shirt.",
      D: "This adds the money already raised to the goal instead of counting it toward the goal.",
    },
    verification: {
      kind: "expression",
      compare: "truth",
      variables: ["t"],
      samples: [0, 20, 31, 32, 40, 60],
      compute: "15 * t + 135 >= 600",
      choiceExpressions: values([
        "15 * t + 135 <= 600",
        "15 * t + 135 >= 600",
        "135 * t + 15 >= 600",
        "15 * t >= 600 + 135",
      ]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-li-005",
    skillId: "math-linear-inequalities",
    difficulty: "hard",
    format: "single-select",
    stem: "Which point (x, y) is a solution to the system of inequalities y > 2x − 1 and y ≤ −x + 5?",
    choices: choices(["(1, 3.5)", "(3, 2)", "(0, −1)", "(2, 4)"]),
    answer: "A",
    nearMiss: "C",
    explanation:
      "For (1, 3.5): 3.5 > 2(1) − 1 = 1 is true, and 3.5 ≤ −1 + 5 = 4 is true, so the point satisfies both inequalities.",
    rationales: {
      B: "This point fails the first inequality, because 2 is not greater than 2(3) − 1 = 5.",
      C: "This point lies on the boundary y = 2x − 1, so it fails the strict first inequality.",
      D: "This point satisfies the first inequality but fails the second, because 4 is greater than −2 + 5 = 3.",
    },
    verification: {
      kind: "predicate",
      variables: ["x", "y"],
      condition: "y > 2 * x - 1 && y <= -x + 5",
      choicePoints: values([
        [1, 3.5],
        [3, 2],
        [0, -1],
        [2, 4],
      ]),
    },
  },

  // Systems of two linear equations
  {
    schemaVersion: 1,
    id: "tp-math-ls-001",
    skillId: "math-linear-systems",
    difficulty: "easy",
    format: "single-select",
    stem: "If x + y = 14 and x − y = 4, what is the value of x?",
    choices: choices(["5", "10", "18", "9"]),
    answer: "D",
    nearMiss: "A",
    explanation: "Adding the equations gives 2x = 18, so x = 9. (Then y = 5.)",
    rationales: {
      A: "This is the value of y, not x.",
      B: "This subtracts the equations' right sides, 14 − 4, without accounting for the variables.",
      C: "This adds the equations to get 2x = 18 but does not divide by 2.",
    },
    verification: {
      kind: "value",
      compute: "(14 + 4) / 2",
      choiceValues: values(["5", "10", "18", "9"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ls-002",
    skillId: "math-linear-systems",
    difficulty: "medium",
    format: "grid-in",
    stem: "A store sold 40 notebooks. Some sold for $3 each and the rest sold for $5 each, for a total of $164. How many $5 notebooks did the store sell?",
    acceptedAnswers: ["22"],
    explanation:
      "Let x be the $3 notebooks and y the $5 notebooks: x + y = 40 and 3x + 5y = 164. Substituting x = 40 − y gives 120 + 2y = 164, so y = 22.",
    verification: { kind: "value", compute: "(164 - 3 * 40) / (5 - 3)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ls-003",
    skillId: "math-linear-systems",
    difficulty: "medium",
    format: "single-select",
    stem: "For what value of c does the system 6x − 4y = 10 and 3x − 2y = c have infinitely many solutions?",
    choices: choices(["10", "−5", "5", "20"]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "The first equation is exactly 2 times 3x − 2y = 5. The equations describe the same line only when c = 5.",
    rationales: {
      A: "This keeps the constant from the first equation without halving it along with the other terms.",
      B: "This halves the constant but changes its sign.",
      D: "This doubles the constant instead of halving it.",
    },
    verification: {
      kind: "value",
      compute: "10 / 2",
      choiceValues: values(["10", "-5", "5", "20"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ls-004",
    skillId: "math-linear-systems",
    difficulty: "hard",
    format: "single-select",
    stem: "The system 2x + ky = 7 and 4x + 10y = 3 has no solution, where k is a constant. What is the value of k?",
    choices: choices(["20", "5", "−5", "14"]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "A system has no solution when its lines are parallel: the coefficients of x and y are in the same ratio but the constants are not. Since 2/4 = k/10, k = 5, and 7/3 is not 1/2, so the lines are distinct.",
    rationales: {
      A: "This sets up the ratio upside down, solving 4/2 = k/10.",
      C: "This gives the right size of k but the wrong sign, which would make the lines intersect.",
      D: "This doubles the constant 7, which does not control whether the lines are parallel.",
    },
    verification: {
      kind: "value",
      compute: "(10 * 2) / 4",
      choiceValues: values(["20", "5", "-5", "14"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ls-005",
    skillId: "math-linear-systems",
    difficulty: "hard",
    format: "grid-in",
    stem: "If 3a + 2b = 19 and a + 4b = 13, what is the value of a + b?",
    acceptedAnswers: ["7"],
    explanation:
      "From the second equation, a = 13 − 4b. Substituting: 3(13 − 4b) + 2b = 19, so 39 − 10b = 19 and b = 2. Then a = 5, and a + b = 7.",
    verification: {
      kind: "value",
      compute:
        "(19 * 4 - 2 * 13) / (3 * 4 - 2 * 1) + (3 * 13 - 19 * 1) / (3 * 4 - 2 * 1)",
    },
  },
];

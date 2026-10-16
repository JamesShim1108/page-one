// Problem-Solving and Data Analysis items. Original practice written by Page
// One; skill names and formats follow the official SAT Suite descriptions, but
// no official item is copied or paraphrased. Data in these items are invented
// for practice and labeled that way. Every key is computed by the build.

const ids = ["A", "B", "C", "D"];
const choices = (texts) => texts.map((text, index) => ({ id: ids[index], text }));
const values = (list) =>
  Object.fromEntries(list.map((value, index) => [ids[index], value]));

export const items = [
  // Two-variable data
  {
    schemaVersion: 1,
    id: "tp-math-tv-001",
    skillId: "math-two-variable-data",
    difficulty: "easy",
    format: "single-select",
    stem: "A scatterplot shows the heights and arm spans of 20 students. The line of best fit is y = 0.98x + 2, where x is height and y is arm span, both in centimeters. Based on the line of best fit, what is the predicted arm span, in centimeters, of a student who is 150 centimeters tall?",
    choices: choices(["149", "152", "147", "150"]),
    answer: "A",
    nearMiss: "C",
    explanation: "Substitute x = 150: y = 0.98(150) + 2 = 147 + 2 = 149.",
    rationales: {
      B: "This adds 2 to the height and skips multiplying by 0.98.",
      C: "This multiplies by 0.98 but leaves out the constant 2.",
      D: "This assumes arm span equals height, which the model does not say.",
    },
    verification: {
      kind: "value",
      compute: "0.98 * 150 + 2",
      choiceValues: values(["149", "152", "147", "150"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-tv-002",
    skillId: "math-two-variable-data",
    difficulty: "medium",
    format: "grid-in",
    stem: "The table shows the number of hours five students studied and their quiz scores. What is the average rate of change in quiz score, in points per hour, from the student who studied 1 hour to the student who studied 5 hours?",
    table: {
      title: "Study time and quiz score",
      columns: ["Hours studied", "Quiz score"],
      rows: [
        ["1", "62"],
        ["2", "68"],
        ["3", "71"],
        ["4", "79"],
        ["5", "85"],
      ],
      data: "illustrative",
    },
    acceptedAnswers: ["23/4", "5.75"],
    explanation:
      "The average rate of change is the change in score divided by the change in hours: (85 − 62) / (5 − 1) = 23/4 = 5.75 points per hour.",
    verification: { kind: "value", compute: "R(85 - 62, 5 - 1)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-tv-003",
    skillId: "math-two-variable-data",
    difficulty: "medium",
    format: "single-select",
    stem: "A café models the number of hot drinks it sells, y, on a day with an outdoor temperature of x degrees Fahrenheit with the line of best fit y = −2.5x + 210. According to the model, at what temperature, in degrees Fahrenheit, would the café sell 85 hot drinks?",
    choices: choices(["34", "118", "125", "50"]),
    answer: "D",
    nearMiss: "C",
    explanation: "Set y = 85: 85 = −2.5x + 210, so −2.5x = −125 and x = 50.",
    rationales: {
      A: "This divides 85 by 2.5 and ignores the intercept of 210.",
      B: "This adds 85 to 210 before dividing, a sign error when moving 85 across the equation.",
      C: "This finds 210 − 85 but does not divide by the slope's size, 2.5.",
    },
    verification: {
      kind: "value",
      compute: "(210 - 85) / 2.5",
      choiceValues: values(["34", "118", "125", "50"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-tv-004",
    skillId: "math-two-variable-data",
    difficulty: "hard",
    format: "grid-in",
    stem: "A line of best fit for a data set is y = 3.2x + 4. One data point is (8, 31). What is the residual for this point, found by subtracting the predicted value from the observed value?",
    acceptedAnswers: ["7/5", "1.4"],
    explanation:
      "The predicted value at x = 8 is 3.2(8) + 4 = 29.6. The residual is 31 − 29.6 = 1.4. A positive residual means the point lies above the line.",
    verification: { kind: "value", compute: "R(31).sub(R(32, 10).mul(8)).sub(4)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-tv-005",
    skillId: "math-two-variable-data",
    difficulty: "hard",
    format: "single-select",
    stem: "The table shows the number of subscribers, y, to a newsletter x months after it launched. Which equation best models the data?",
    table: {
      title: "Newsletter subscribers",
      columns: ["Months after launch, x", "Subscribers, y"],
      rows: [
        ["0", "200"],
        ["1", "240"],
        ["2", "288"],
        ["3", "345.6"],
      ],
      data: "illustrative",
    },
    choices: choices([
      "y = 200 + 40x",
      "y = 240(1.2)^x",
      "y = 200(1.2)^x",
      "y = 200(0.2)^x",
    ]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "Each value is 1.2 times the one before it (240 / 200 = 288 / 240 = 1.2), and the value at x = 0 is 200, so y = 200(1.2)^x fits every row.",
    rationales: {
      A: "This fits the first two rows but adds 40 each month, while the increases grow from 40 to 48 to 57.6.",
      B: "This has the right growth factor but starts at 240, the value after 1 month.",
      D: "This uses the growth rate, 0.2, as the factor, which would shrink the number each month.",
    },
    verification: {
      kind: "expression",
      variables: ["x"],
      samples: [0, 1, 2, 3, 5],
      compute: "200 * 1.2 ** x",
      choiceExpressions: values([
        "200 + 40 * x",
        "240 * 1.2 ** x",
        "200 * 1.2 ** x",
        "200 * 0.2 ** x",
      ]),
    },
  },

  // Percentages
  {
    schemaVersion: 1,
    id: "tp-math-pc-001",
    skillId: "math-percentages",
    difficulty: "easy",
    format: "single-select",
    stem: "A jacket originally priced at $80 is on sale for 15% off. What is the sale price, in dollars?",
    choices: choices(["65", "68", "12", "92"]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "15% of 80 is 0.15 × 80 = 12, so the sale price is 80 − 12 = 68. Equivalently, 0.85 × 80 = 68.",
    rationales: {
      A: "This subtracts 15 dollars instead of 15 percent of the price.",
      C: "This is the amount of the discount, not the price after the discount.",
      D: "This adds the discount to the original price instead of subtracting it.",
    },
    verification: {
      kind: "value",
      compute: "80 * (1 - 0.15)",
      choiceValues: values(["65", "68", "12", "92"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-pc-002",
    skillId: "math-percentages",
    difficulty: "medium",
    format: "grid-in",
    stem: "A town's population grew from 12,500 to 14,000. By what percent did the population increase? (Enter your answer without the percent sign.)",
    acceptedAnswers: ["12"],
    explanation:
      "The increase is 14,000 − 12,500 = 1,500. As a percent of the original population: 1,500 / 12,500 = 0.12, or 12%.",
    verification: { kind: "value", compute: "((14000 - 12500) * 100) / 12500" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-pc-003",
    skillId: "math-percentages",
    difficulty: "medium",
    format: "single-select",
    stem: "After a 20% increase, the price of a game is $54. What was the price, in dollars, before the increase?",
    choices: choices(["45", "43.20", "34", "64.80"]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "The new price is 120% of the old price: 1.2p = 54, so p = 54 / 1.2 = 45. Check: 45 + 0.2(45) = 54.",
    rationales: {
      B: "This takes 20% off the new price, but the 20% was based on the old, smaller price.",
      C: "This subtracts 20 dollars instead of reversing a 20 percent increase.",
      D: "This increases the new price by another 20% instead of undoing the increase.",
    },
    verification: {
      kind: "value",
      compute: "54 / 1.2",
      choiceValues: values(["45", "43.20", "34", "64.80"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-pc-004",
    skillId: "math-percentages",
    difficulty: "hard",
    format: "single-select",
    stem: "A store raises the price of a lamp by 25%. Later, it lowers the new price by 20%. The final price is what percent of the original price?",
    choices: choices(["105%", "95%", "100%", "80%"]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "Multiply the factors: 1.25 × 0.80 = 1.00. The final price equals the original price, so it is 100% of the original.",
    rationales: {
      A: "This adds and subtracts the percents, but each percent applies to a different starting price.",
      B: "This assumes the later decrease outweighs the increase, without multiplying the two factors to check.",
      D: "This applies only the decrease and ignores the earlier increase.",
    },
    verification: {
      kind: "value",
      compute: "1.25 * 0.8 * 100",
      choiceValues: values(["105", "95", "100", "80"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-pc-005",
    skillId: "math-percentages",
    difficulty: "hard",
    format: "grid-in",
    stem: "The number p is 40% of q, and q is 150% of r. The number p is what percent of r? (Enter your answer without the percent sign.)",
    acceptedAnswers: ["60"],
    explanation:
      "p = 0.4q and q = 1.5r, so p = 0.4(1.5r) = 0.6r. The number p is 60% of r.",
    verification: { kind: "value", compute: "R(4, 10).mul(R(15, 10)).mul(100)" },
  },

  // Ratios, rates, and units
  {
    schemaVersion: 1,
    id: "tp-math-rr-001",
    skillId: "math-ratios-rates",
    difficulty: "easy",
    format: "single-select",
    stem: "A recipe uses 3 cups of flour for every 2 cups of milk. How many cups of flour are needed for 7 cups of milk?",
    choices: choices(["4⅔", "8", "21", "10.5"]),
    answer: "D",
    nearMiss: "A",
    explanation: "Flour is 3/2 times the milk, so 7 × 3/2 = 10.5 cups of flour.",
    rationales: {
      A: "This flips the ratio, multiplying 7 by 2/3 instead of 3/2.",
      B: "This adds the difference between 3 and 2 to the milk, which treats the ratio as a difference.",
      C: "This multiplies 7 by 3 without dividing by 2.",
    },
    verification: {
      kind: "value",
      compute: "(7 * 3) / 2",
      choiceValues: values(["14 / 3", "8", "21", "10.5"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-rr-002",
    skillId: "math-ratios-rates",
    difficulty: "medium",
    format: "grid-in",
    stem: "A car travels 150 miles on 6 gallons of gas. At this rate, how many gallons does the car need to travel 425 miles?",
    acceptedAnswers: ["17"],
    explanation:
      "The car travels 150 / 6 = 25 miles per gallon. For 425 miles it needs 425 / 25 = 17 gallons.",
    verification: { kind: "value", compute: "425 / (150 / 6)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-rr-003",
    skillId: "math-ratios-rates",
    difficulty: "medium",
    format: "single-select",
    stem: "A faucet leaks 4 milliliters of water every 30 seconds. How many liters of water does it leak in one day? (1 liter = 1,000 milliliters)",
    choices: choices(["0.48", "11.52", "5.76", "115.2"]),
    answer: "B",
    nearMiss: "C",
    explanation:
      "The faucet leaks 8 milliliters per minute, so in a day it leaks 8 × 60 × 24 = 11,520 milliliters, which is 11.52 liters.",
    rationales: {
      A: "This is the amount leaked in one hour, not one day.",
      C: "This counts 4 milliliters per minute, forgetting there are two 30-second periods in a minute.",
      D: "This divides by 100 instead of 1,000 when converting milliliters to liters.",
    },
    verification: {
      kind: "value",
      compute: "(4 * (60 / 30) * 60 * 24) / 1000",
      choiceValues: values(["0.48", "11.52", "5.76", "115.2"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-rr-004",
    skillId: "math-ratios-rates",
    difficulty: "medium",
    format: "single-select",
    stem: "On a map, 1 inch represents 2.5 miles. Two towns are 18 miles apart. How far apart, in inches, are the towns on the map?",
    choices: choices(["7.2", "45", "15.5", "0.14"]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "Each inch stands for 2.5 miles, so the map distance is 18 / 2.5 = 7.2 inches.",
    rationales: {
      B: "This multiplies by the scale instead of dividing, which converts inches to miles.",
      C: "This subtracts the scale from the distance, which does not use the scale as a rate.",
      D: "This divides the scale by the distance, giving the reciprocal of the right answer.",
    },
    verification: {
      kind: "value",
      compute: "18 / 2.5",
      choiceValues: values(["7.2", "45", "15.5", "2.5 / 18"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-rr-005",
    skillId: "math-ratios-rates",
    difficulty: "hard",
    format: "grid-in",
    stem: "One printer prints 18 pages per minute, and a second printer prints 30 pages per minute. Working at the same time, how many minutes will the two printers take to print 720 pages?",
    acceptedAnswers: ["15"],
    explanation:
      "Together the printers print 18 + 30 = 48 pages per minute, so 720 pages take 720 / 48 = 15 minutes.",
    verification: { kind: "value", compute: "720 / (18 + 30)" },
  },
];

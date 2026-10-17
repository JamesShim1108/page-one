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
  // One-variable data
  {
    schemaVersion: 1,
    id: "tp-math-ov-001",
    skillId: "math-one-variable-data",
    difficulty: "easy",
    format: "single-select",
    stem: "A soccer team scored the following numbers of goals in its last 7 games: 2, 0, 3, 1, 2, 6, 1. What is the median number of goals scored?",
    choices: choices(["1", "2", "6", "15/7"]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "In order, the scores are 0, 1, 1, 2, 2, 3, 6. The median is the middle (4th) value, 2.",
    rationales: {
      A: "This is the middle value of the list as given, before putting the scores in order.",
      C: "This is the range, 6 − 0, which measures spread rather than center.",
      D: "This is the mean, the total of 15 goals divided by 7 games, not the median.",
    },
    verification: {
      kind: "value",
      compute: "S.median([2, 0, 3, 1, 2, 6, 1])",
      choiceValues: values(["1", "2", "6", "R(15, 7)"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ov-002",
    skillId: "math-one-variable-data",
    difficulty: "hard",
    format: "single-select",
    stem: "The graph shows the yearly rainfall that the naturalist Gilbert White recorded in the village of Selborne, England, from 1780 to 1786. If the value for 1782 is removed from the data, which statement about the remaining six values is true?",
    figure: {
      type: "bars",
      title: "Rainfall at Selborne, England, 1780–1786",
      alt: "Bar graph of yearly rainfall at Selborne in inches: 1780, 27.32; 1781, 30.71; 1782, 50.26; 1783, 33.71; 1784, 33.80; 1785, 31.55; 1786, 39.57.",
      categories: ["1780", "1781", "1782", "1783", "1784", "1785", "1786"],
      series: [
        { name: "Rainfall", values: [27.32, 30.71, 50.26, 33.71, 33.8, 31.55, 39.57] },
      ],
      y: { min: 0, max: 55, step: 5, label: "Rainfall (inches)" },
      note: "Data: Gilbert White, The Natural History and Antiquities of Selborne (1789).",
    },
    choices: choices([
      "The mean and the median both decrease, and the mean decreases by more.",
      "The mean and the median both decrease, and the median decreases by more.",
      "The mean decreases, and the median stays the same.",
      "The mean decreases, and the median increases.",
    ]),
    answer: "A",
    nearMiss: "C",
    explanation:
      "The 1782 value, 50.26, is far above the others. Removing it lowers the mean from about 35.27 to about 32.78 inches. The median moves from 33.71 to the average of 31.55 and 33.71, which is 32.63, a smaller drop. An extreme value pulls the mean more than the median.",
    rationales: {
      B: "The median drops by only about 1.08 inches, while the mean drops by about 2.50 inches.",
      C: "With six values left, the median becomes the average of the two middle values, 32.63, so it changes.",
      D: "Removing the largest value cannot raise the median.",
    },
    verification: {
      kind: "value",
      compute:
        "S.median([27.32, 30.71, 33.71, 33.8, 31.55, 39.57]) === S.median([27.32, 30.71, 50.26, 33.71, 33.8, 31.55, 39.57]) ? 3 : S.median([27.32, 30.71, 33.71, 33.8, 31.55, 39.57]) > S.median([27.32, 30.71, 50.26, 33.71, 33.8, 31.55, 39.57]) ? 4 : S.mean([27.32, 30.71, 50.26, 33.71, 33.8, 31.55, 39.57]) - S.mean([27.32, 30.71, 33.71, 33.8, 31.55, 39.57]) > S.median([27.32, 30.71, 50.26, 33.71, 33.8, 31.55, 39.57]) - S.median([27.32, 30.71, 33.71, 33.8, 31.55, 39.57]) ? 1 : 2",
      choiceValues: values(["1", "2", "3", "4"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ov-003",
    skillId: "math-one-variable-data",
    difficulty: "medium",
    format: "grid-in",
    stem: "The mean of five numbers is 12. Four of the numbers are 8, 15, 10, and 9. What is the fifth number?",
    acceptedAnswers: ["18"],
    explanation:
      "Five numbers with a mean of 12 add up to 5 × 12 = 60. The four given numbers add up to 42, so the fifth is 60 − 42 = 18.",
    verification: { kind: "value", compute: "5 * 12 - (8 + 15 + 10 + 9)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ov-004",
    skillId: "math-one-variable-data",
    difficulty: "hard",
    format: "single-select",
    stem: "Data set A is 10, 20, 30, 40, 50. Data set B is 28, 29, 30, 31, 32. Which statement is true?",
    choices: choices([
      "Set A has the greater mean, and the sets have the same standard deviation.",
      "The sets have equal means, and set B has the greater standard deviation.",
      "The sets have equal means, and set A has the greater standard deviation.",
      "The sets have equal means and equal standard deviations.",
    ]),
    answer: "C",
    nearMiss: "B",
    explanation:
      "Both sets add up to 150, so both means are 30. The values in set A lie much farther from 30 than those in set B, so set A has the greater standard deviation.",
    rationales: {
      A: "Both sets have a mean of 30, and their spreads are very different.",
      B: "The means are equal, but set B's values are clustered near 30, so its standard deviation is smaller.",
      D: "The means are equal, but set A is far more spread out, so the standard deviations differ.",
    },
    verification: {
      kind: "value",
      compute:
        "S.mean([10, 20, 30, 40, 50]) !== S.mean([28, 29, 30, 31, 32]) ? 1 : S.sd([10, 20, 30, 40, 50]) === S.sd([28, 29, 30, 31, 32]) ? 4 : S.sd([10, 20, 30, 40, 50]) > S.sd([28, 29, 30, 31, 32]) ? 3 : 2",
      choiceValues: values(["1", "2", "3", "4"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ov-005",
    skillId: "math-one-variable-data",
    difficulty: "medium",
    format: "single-select",
    stem: "The table shows how many siblings each of 20 students has. What is the mean number of siblings for these students?",
    table: {
      title: "Number of siblings",
      columns: ["Siblings", "Number of students"],
      rows: [
        ["0", "4"],
        ["1", "7"],
        ["2", "6"],
        ["3", "3"],
      ],
      data: "illustrative",
    },
    choices: choices(["1", "1.4", "5", "1.5"]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "The total number of siblings is 0(4) + 1(7) + 2(6) + 3(3) = 28. Divided among 20 students, the mean is 28/20 = 1.4.",
    rationales: {
      A: "This is the median: the 10th and 11th students in order both have 1 sibling.",
      C: "This averages the numbers of students, 20/4, instead of the numbers of siblings.",
      D: "This averages the possible values 0, 1, 2, and 3 without weighting them by how many students have each.",
    },
    verification: {
      kind: "value",
      compute: "R(0 * 4 + 1 * 7 + 2 * 6 + 3 * 3, 20)",
      choiceValues: values(["1", "R(14, 10)", "5", "R(15, 10)"]),
    },
  },

  // Probability and conditional probability
  {
    schemaVersion: 1,
    id: "tp-math-pr-001",
    skillId: "math-probability",
    difficulty: "easy",
    format: "single-select",
    stem: "A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. One marble is chosen at random. What is the probability that it is blue?",
    choices: choices(["3/7", "1/3", "3/10", "3/5"]),
    answer: "C",
    nearMiss: "A",
    explanation: "There are 10 marbles, and 3 are blue, so the probability is 3/10.",
    rationales: {
      A: "This compares blue marbles with the 7 marbles that are not blue instead of with all 10.",
      B: "This treats the three colors as equally likely, but there are different numbers of each.",
      D: "This compares blue marbles with red marbles only.",
    },
    verification: {
      kind: "value",
      compute: "R(3, 5 + 3 + 2)",
      choiceValues: values(["R(3, 7)", "R(1, 3)", "R(3, 10)", "R(3, 5)"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-pr-002",
    skillId: "math-probability",
    difficulty: "medium",
    format: "single-select",
    stem: "The table summarizes how 200 students in two grades get to school. If one of the students who bike to school is chosen at random, what is the probability that the student is in grade 10?",
    table: {
      title: "How students get to school",
      columns: ["Grade", "Bike", "Do not bike", "Total"],
      rows: [
        ["Grade 10", "36", "64", "100"],
        ["Grade 11", "24", "76", "100"],
        ["Total", "60", "140", "200"],
      ],
      data: "illustrative",
    },
    choices: choices(["9/25", "3/5", "9/50", "3/10"]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "The question limits the choice to the 60 students who bike. Of those, 36 are in grade 10, so the probability is 36/60 = 3/5.",
    rationales: {
      A: "This is 36/100, the probability that a grade 10 student bikes, which reverses the condition.",
      C: "This is 36/200, which uses all 200 students instead of only those who bike.",
      D: "This is 60/200, the probability that any student bikes.",
    },
    verification: {
      kind: "value",
      compute: "R(36, 36 + 24)",
      choiceValues: values(["R(36, 100)", "R(3, 5)", "R(36, 200)", "R(60, 200)"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-pr-003",
    skillId: "math-probability",
    difficulty: "medium",
    format: "grid-in",
    stem: "A fair six-sided number cube, with faces numbered 1 through 6, is rolled twice. What is the probability that both rolls show an even number?",
    acceptedAnswers: ["1/4", ".25", "0.25"],
    explanation:
      "Each roll is even with probability 3/6 = 1/2, and the rolls are independent, so both are even with probability (1/2)(1/2) = 1/4.",
    verification: { kind: "value", compute: "R(3, 6).mul(R(3, 6))" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-pr-004",
    skillId: "math-probability",
    difficulty: "hard",
    format: "single-select",
    stem: "In a group of 50 people, 30 have a cat, 25 have a dog, and 12 have both a cat and a dog. If one of the people who has a dog is chosen at random, what is the probability that the person also has a cat?",
    choices: choices(["2/5", "6/25", "3/5", "12/25"]),
    answer: "D",
    nearMiss: "A",
    explanation:
      "The choice is limited to the 25 dog owners, and 12 of them also have a cat, so the probability is 12/25.",
    rationales: {
      A: "This is 12/30, the probability that a cat owner also has a dog, which reverses the condition.",
      B: "This is 12/50, which uses the whole group instead of only the dog owners.",
      C: "This is 30/50, the probability that anyone in the group has a cat.",
    },
    verification: {
      kind: "value",
      compute: "R(12, 25)",
      choiceValues: values(["R(12, 30)", "R(12, 50)", "R(30, 50)", "R(12, 25)"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-pr-005",
    skillId: "math-probability",
    difficulty: "easy",
    format: "grid-in",
    stem: "A spinner has 8 equal sections numbered 1 through 8. What is the probability that the spinner lands on a number greater than 5?",
    acceptedAnswers: ["3/8", ".375", "0.375"],
    explanation:
      "Three of the eight sections, 6, 7, and 8, are greater than 5, so the probability is 3/8.",
    verification: { kind: "value", compute: "R(8 - 5, 8)" },
  },

  // Inference from sample statistics and margin of error
  {
    schemaVersion: 1,
    id: "tp-math-inf-001",
    skillId: "math-inference",
    difficulty: "medium",
    format: "single-select",
    stem: "A random sample of 400 voters in a city found that 248 support building a new library. Based on the sample, about how many of the city's 50,000 voters would be expected to support it?",
    choices: choices(["24,800", "62", "31,000", "49,752"]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "In the sample, 248/400 = 62% support the library. Applying that share to the city gives 0.62 × 50,000 = 31,000 voters.",
    rationales: {
      A: "This multiplies 248 by 100, as if the city were 100 times the size of the sample instead of 125 times.",
      B: "This is the percent of the sample that supports the library, not a number of voters in the city.",
      D: "This subtracts the sample's supporters from the city's population, which has no meaning here.",
    },
    verification: {
      kind: "value",
      compute: "50000 * 248 / 400",
      choiceValues: values(["24800", "62", "31000", "49752"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-inf-002",
    skillId: "math-inference",
    tests: ["sat"],
    difficulty: "hard",
    format: "single-select",
    stem: "A survey of a random sample of 900 adults in a state estimates that 41% of all adults in the state exercise daily, with a margin of error of 3 percentage points. Based on the survey, which range of values is a plausible range for the percent of all adults in the state who exercise daily?",
    choices: choices(["35% to 47%", "41% to 44%", "38% to 44%", "40% to 42%"]),
    answer: "C",
    nearMiss: "B",
    explanation:
      "A margin of error of 3 percentage points gives plausible values from 41 − 3 = 38% to 41 + 3 = 44%.",
    rationales: {
      A: "This uses twice the margin of error on each side.",
      B: "This adds the margin of error above the estimate but not below it.",
      D: "This uses a margin of error of 1 percentage point instead of 3.",
    },
    verification: {
      kind: "value",
      compute: "(41 - 3) * 1000 + (41 + 3)",
      choiceValues: values(["35047", "41044", "38044", "40042"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-inf-003",
    skillId: "math-inference",
    difficulty: "medium",
    format: "grid-in",
    stem: "In a random sample of 80 bags of trail mix from a factory, 6 bags were underweight. The factory makes 12,000 bags of trail mix each day. Based on the sample, about how many bags made each day would be expected to be underweight?",
    acceptedAnswers: ["900"],
    explanation:
      "In the sample, 6/80 = 7.5% of bags were underweight, and 0.075 × 12,000 = 900.",
    verification: { kind: "value", compute: "12000 * 6 / 80" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-inf-004",
    skillId: "math-inference",
    tests: ["sat"],
    difficulty: "hard",
    format: "single-select",
    stem: "Two random samples are taken from the same large population to estimate the same percentage. Sample A has 400 people, and sample B has 1,600 people. The margin of error of an estimate is roughly proportional to 1/√n, where n is the sample size. About how does the margin of error for sample B compare with that for sample A?",
    choices: choices([
      "It is about one-fourth as large.",
      "It is about twice as large.",
      "It is about half as large.",
      "It is about four times as large.",
    ]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "Sample B is 4 times as large, so its margin of error is about 1/√4 = 1/2 as large. Larger samples give smaller margins of error, but not in direct proportion.",
    rationales: {
      A: "This treats the margin of error as proportional to 1/n instead of 1/√n.",
      B: "A larger sample gives a smaller margin of error, not a larger one.",
      D: "This reverses the relationship and uses n instead of √n.",
    },
    verification: {
      kind: "value",
      compute: "Math.sqrt(400 / 1600)",
      choiceValues: values(["0.25", "2", "0.5", "4"]),
    },
  },

  // Evaluating statistical claims (SAT only)
  {
    schemaVersion: 1,
    id: "tp-math-sc-001",
    skillId: "math-statistical-claims",
    difficulty: "medium",
    format: "single-select",
    stem: "Researchers chose 500 students at random from a large high school. They randomly assigned half of these students to use a new study app and the other half not to use it. After a month, the students who used the app had higher average quiz scores. Which conclusion is best supported by the study?",
    choices: choices([
      "Using the app likely causes higher quiz scores for students at all high schools in the country.",
      "Using the app likely causes higher quiz scores for students at this high school.",
      "No conclusion about cause can be drawn, because the students were not studied for a full year.",
      "Every student at this high school who uses the app will earn a higher quiz score.",
    ]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "Random assignment to use or not use the app supports a conclusion about cause. Random selection from this high school allows the result to be applied to students at this school, but not beyond it.",
    rationales: {
      A: "The sample came from one high school, so the results cannot be applied to all high schools in the country.",
      C: "The study's length does not prevent a causal conclusion, and random assignment supports one.",
      D: "The study describes averages, which do not guarantee a higher score for every individual student.",
    },
    verification: {
      kind: "study",
      design: { randomSample: true, randomAssignment: true },
      choiceClaims: {
        A: { cause: "yes", scope: "beyond" },
        B: { cause: "yes", scope: "population" },
        C: { cause: "cannot", scope: "population" },
        D: { cause: "yes", scope: "every-individual" },
      },
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-sc-002",
    skillId: "math-statistical-claims",
    difficulty: "hard",
    format: "single-select",
    stem: "A researcher surveyed a random sample of 1,000 adults in a city. Adults who reported sleeping more hours each night tended to report lower levels of stress. Which conclusion is best supported by the survey?",
    choices: choices([
      "Sleeping more hours causes lower stress among adults in the city.",
      "Among adults in every city, sleeping more hours is linked with lower stress.",
      "Among adults in the city, sleeping more hours is linked with lower reported stress.",
      "Lower stress causes adults in the city to sleep more hours each night.",
    ]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "The survey observed people without assigning anyone to sleep more or less, so it can show a link but not a cause. Because the sample was random, the link can be applied to adults in that city.",
    rationales: {
      A: "This claims a cause, but no one was assigned to sleep more, so other factors could explain the link.",
      B: "The sample came from one city, so the result cannot be applied to every city.",
      D: "This also claims a cause, just in the opposite direction, which an observational survey cannot show.",
    },
    verification: {
      kind: "study",
      design: { randomSample: true, randomAssignment: false },
      choiceClaims: {
        A: { cause: "yes", scope: "population" },
        B: { cause: "association", scope: "beyond" },
        C: { cause: "association", scope: "population" },
        D: { cause: "yes", scope: "population" },
      },
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-sc-003",
    skillId: "math-statistical-claims",
    difficulty: "hard",
    format: "single-select",
    stem: "A gardener randomly assigned each of the 40 tomato plants in her garden to receive either a new fertilizer or no fertilizer. The plants that received the fertilizer produced more tomatoes, on average. Which conclusion is best supported?",
    choices: choices([
      "The fertilizer likely caused the increase in tomatoes among the 40 plants in her garden.",
      "The fertilizer would likely increase the number of tomatoes on all tomato plants.",
      "No conclusion about cause can be drawn, because the plants were not chosen at random from all tomato plants.",
      "Every plant that receives the fertilizer will produce more tomatoes.",
    ]),
    answer: "A",
    nearMiss: "B",
    explanation:
      "Random assignment supports a conclusion that the fertilizer caused the difference. The plants were not a random sample of all tomato plants, so the conclusion applies only to the plants in her garden.",
    rationales: {
      B: "The 40 plants were not randomly chosen from all tomato plants, so the result cannot be applied to all of them.",
      C: "Random assignment, not random selection, is what supports a causal conclusion, and this study had it.",
      D: "Results about averages do not guarantee the same outcome for every individual plant.",
    },
    verification: {
      kind: "study",
      design: { randomSample: false, randomAssignment: true },
      choiceClaims: {
        A: { cause: "yes", scope: "sample" },
        B: { cause: "yes", scope: "population" },
        C: { cause: "cannot", scope: "sample" },
        D: { cause: "yes", scope: "every-individual" },
      },
    },
  },

  // Percentages
  {
    schemaVersion: 1,
    id: "tp-math-pc-006",
    skillId: "math-percentages",
    difficulty: "medium",
    format: "grid-in",
    stem: "A $60 jacket is on sale for 25% off. A 10% sales tax is then added to the sale price. What is the final cost of the jacket, in dollars?",
    acceptedAnswers: ["99/2", "49.5"],
    explanation:
      "The sale price is 60 × 0.75 = 45 dollars. Adding 10% tax gives 45 × 1.10 = 49.50 dollars.",
    verification: { kind: "value", compute: "R(60).mul(R(75, 100)).mul(R(110, 100))" },
  },
];

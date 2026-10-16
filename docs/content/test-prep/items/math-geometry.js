// Geometry and Trigonometry items. Original practice written by Page One; skill
// names and formats follow the official SAT Suite descriptions, but no
// official item is copied or paraphrased. Figures are described in words.
// Every key is computed by the build from `verification`.

const ids = ["A", "B", "C", "D"];
const choices = (texts) => texts.map((text, index) => ({ id: ids[index], text }));
const values = (list) =>
  Object.fromEntries(list.map((value, index) => [ids[index], value]));

export const items = [
  // Lines, angles, and triangles (all four tests)
  {
    schemaVersion: 1,
    id: "tp-math-lat-001",
    skillId: "math-lines-angles-triangles",
    difficulty: "easy",
    format: "single-select",
    stem: "In triangle ABC, angle A measures 47° and angle B measures 68°. What is the measure of angle C?",
    choices: choices(["115°", "25°", "65°", "133°"]),
    answer: "C",
    nearMiss: "A",
    explanation:
      "The angles of a triangle add to 180°, so angle C = 180° − 47° − 68° = 65°.",
    rationales: {
      A: "This is the sum of angles A and B, which is the exterior angle at C, not angle C itself.",
      B: "This subtracts the two given angles from 90° as if the triangle were split at a right angle.",
      D: "This subtracts only angle A from 180°.",
    },
    verification: {
      kind: "value",
      compute: "180 - 47 - 68",
      choiceValues: values(["115", "25", "65", "133"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-lat-002",
    skillId: "math-lines-angles-triangles",
    difficulty: "medium",
    format: "grid-in",
    stem: "Two parallel lines are cut by a transversal. Two same-side interior angles formed by the transversal measure (3x + 12)° and (5x − 4)°. What is the value of x?",
    acceptedAnswers: ["43/2", "21.5"],
    explanation:
      "Same-side interior angles between parallel lines add to 180°: (3x + 12) + (5x − 4) = 180, so 8x + 8 = 180 and x = 21.5.",
    verification: { kind: "value", compute: "R(180 - 12 + 4, 3 + 5)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-lat-003",
    skillId: "math-lines-angles-triangles",
    difficulty: "medium",
    format: "single-select",
    stem: "Triangle PQR is similar to triangle STU, with P corresponding to S, Q to T, and R to U. If PQ = 6, QR = 7, and ST = 10, what is the length of TU?",
    choices: choices(["11", "4.2", "12", "35/3"]),
    answer: "D",
    nearMiss: "A",
    explanation:
      "Corresponding sides share one scale factor: ST / PQ = 10 / 6 = 5/3. So TU = QR × 5/3 = 7 × 5/3 = 35/3.",
    rationales: {
      A: "This adds the difference ST − PQ = 4 to QR, but similar triangles scale by multiplying, not adding.",
      B: "This uses the scale factor upside down, multiplying 7 by 6/10.",
      C: "This doubles PQ, which does not correspond to TU.",
    },
    verification: {
      kind: "value",
      compute: "(7 * 10) / 6",
      choiceValues: values(["11", "4.2", "12", "35 / 3"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-lat-004",
    skillId: "math-lines-angles-triangles",
    difficulty: "hard",
    format: "single-select",
    stem: "An isosceles triangle has two sides of length 13 and a third side of length 10. What is the area of the triangle?",
    choices: choices(["65", "60", "120", "130"]),
    answer: "B",
    nearMiss: "C",
    explanation:
      "The height to the base of 10 splits it into halves of 5, so the height is √(13² − 5²) = √144 = 12. The area is (1/2)(10)(12) = 60.",
    rationales: {
      A: "This multiplies a side of 13 by half the base, using a slanted side as the height.",
      C: "This finds the height correctly but forgets the factor of 1/2 in the area formula.",
      D: "This multiplies 13 by 10 and uses a slanted side as the height.",
    },
    verification: {
      kind: "value",
      compute: "0.5 * 10 * Math.sqrt(13 * 13 - 5 * 5)",
      choiceValues: values(["65", "60", "120", "130"]),
    },
  },

  // Right triangles and trigonometry (not on the PSAT 8/9)
  {
    schemaVersion: 1,
    id: "tp-math-rt-001",
    skillId: "math-right-triangles-trig",
    difficulty: "easy",
    format: "single-select",
    stem: "In right triangle ABC, angle C is the right angle, AC = 5, and BC = 12. What is the length of AB?",
    choices: choices(["13", "17", "7", "√119"]),
    answer: "A",
    nearMiss: "D",
    explanation: "AB is the hypotenuse: AB = √(5² + 12²) = √169 = 13.",
    rationales: {
      B: "This adds the legs, but the hypotenuse comes from adding their squares.",
      C: "This subtracts the legs, which does not follow the Pythagorean theorem.",
      D: "This subtracts the squares, treating a leg as the hypotenuse.",
    },
    verification: {
      kind: "value",
      compute: "Math.sqrt(5 * 5 + 12 * 12)",
      choiceValues: values(["13", "17", "7", "Math.sqrt(119)"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-rt-002",
    skillId: "math-right-triangles-trig",
    difficulty: "medium",
    format: "single-select",
    stem: "In right triangle DEF, angle F is the right angle, DF = 8, and DE = 17. What is the value of sin E?",
    choices: choices(["15/17", "8/15", "17/8", "8/17"]),
    answer: "D",
    nearMiss: "A",
    explanation:
      "The side opposite angle E is DF = 8, and the hypotenuse is DE = 17, so sin E = 8/17. (EF = √(17² − 8²) = 15.)",
    rationales: {
      A: "This is cos E, using the adjacent side EF = 15 instead of the opposite side.",
      B: "This is tan E, opposite over adjacent instead of opposite over hypotenuse.",
      C: "This turns the ratio upside down, and a sine can never be greater than 1.",
    },
    verification: {
      kind: "value",
      compute: "8 / 17",
      choiceValues: values(["15 / 17", "8 / 15", "17 / 8", "8 / 17"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-rt-003",
    skillId: "math-right-triangles-trig",
    difficulty: "medium",
    format: "grid-in",
    stem: "In a right triangle, one acute angle measures x°, and sin(x°) = 0.6. What is the value of cos((90 − x)°)?",
    acceptedAnswers: ["3/5", "0.6", ".6"],
    explanation:
      "The two acute angles of a right triangle are complementary, and the sine of one equals the cosine of the other. So cos((90 − x)°) = sin(x°) = 0.6.",
    verification: { kind: "value", compute: "R(6, 10)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-rt-004",
    skillId: "math-right-triangles-trig",
    difficulty: "hard",
    format: "single-select",
    stem: "A 30°-60°-90° triangle has a hypotenuse of length 14. What is the length of the side opposite the 60° angle?",
    choices: choices(["7", "7√3", "14√3", "7√2"]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "In a 30°-60°-90° triangle, the short leg is half the hypotenuse, 7, and the long leg, opposite the 60° angle, is √3 times the short leg: 7√3.",
    rationales: {
      A: "This is the side opposite the 30° angle.",
      C: "This multiplies the hypotenuse by √3 instead of the short leg.",
      D: "This uses the ratio for a 45°-45°-90° triangle.",
    },
    verification: {
      kind: "value",
      compute: "14 * Math.sin(Math.PI / 3)",
      choiceValues: values([
        "7",
        "7 * Math.sqrt(3)",
        "14 * Math.sqrt(3)",
        "7 * Math.sqrt(2)",
      ]),
    },
  },

  // Circles (SAT only)
  {
    schemaVersion: 1,
    id: "tp-math-ci-001",
    skillId: "math-circles",
    difficulty: "easy",
    format: "single-select",
    stem: "A circle has a circumference of 18π. What is the area of the circle?",
    choices: choices(["18π", "36π", "81π", "324π"]),
    answer: "C",
    nearMiss: "D",
    explanation: "Circumference is 2πr = 18π, so r = 9. The area is πr² = 81π.",
    rationales: {
      A: "This repeats the circumference, which measures length around the circle, not area.",
      B: "This doubles the circumference's coefficient instead of finding the radius.",
      D: "This uses 18, the diameter, as the radius.",
    },
    verification: {
      kind: "value",
      compute: "Math.PI * ((18 * Math.PI) / (2 * Math.PI)) ** 2",
      choiceValues: values([
        "18 * Math.PI",
        "36 * Math.PI",
        "81 * Math.PI",
        "324 * Math.PI",
      ]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ci-002",
    skillId: "math-circles",
    difficulty: "medium",
    format: "grid-in",
    stem: "In the xy-plane, the graph of x² + y² − 6x + 10y − 2 = 0 is a circle. What is the radius of the circle?",
    acceptedAnswers: ["6"],
    explanation:
      "Complete the square: (x² − 6x + 9) + (y² + 10y + 25) = 2 + 9 + 25, so (x − 3)² + (y + 5)² = 36. The radius is √36 = 6.",
    verification: { kind: "value", compute: "Math.sqrt(2 + 3 * 3 + 5 * 5)" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ci-003",
    skillId: "math-circles",
    difficulty: "medium",
    format: "single-select",
    stem: "A circle has a radius of 10. What is the length of the arc cut off by a central angle of 72°?",
    choices: choices(["4π", "20π", "2π", "8π"]),
    answer: "A",
    nearMiss: "C",
    explanation:
      "The arc is 72/360 = 1/5 of the circumference, 2π(10) = 20π. So the arc length is 20π / 5 = 4π.",
    rationales: {
      B: "This is the whole circumference, not the fraction cut off by the angle.",
      C: "This uses πr instead of 2πr for the circumference.",
      D: "This uses the diameter, 20, as the radius.",
    },
    verification: {
      kind: "value",
      compute: "2 * Math.PI * 10 * (72 / 360)",
      choiceValues: values(["4 * Math.PI", "20 * Math.PI", "2 * Math.PI", "8 * Math.PI"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-ci-004",
    skillId: "math-circles",
    difficulty: "hard",
    format: "grid-in",
    stem: "In the xy-plane, a circle has its center at (−1, −1), and the point (2, 3) lies on the circle. What is the diameter of the circle?",
    acceptedAnswers: ["10"],
    explanation:
      "The radius is the distance from the center to (2, 3): √((2 + 1)² + (3 + 1)²) = √(9 + 16) = 5. The diameter is 2 × 5 = 10.",
    verification: {
      kind: "value",
      compute: "2 * Math.sqrt((2 + 1) ** 2 + (3 + 1) ** 2)",
    },
  },
];

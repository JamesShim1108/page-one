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
  // Area and volume
  {
    schemaVersion: 1,
    id: "tp-math-av-001",
    skillId: "math-area-volume",
    difficulty: "easy",
    format: "single-select",
    stem: "A rectangle has a length of 12 centimeters and an area of 54 square centimeters. What is the perimeter of the rectangle, in centimeters?",
    choices: choices(["16.5", "33", "66", "108"]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "The width is 54 ÷ 12 = 4.5 centimeters. The perimeter is 2(12 + 4.5) = 33 centimeters.",
    rationales: {
      A: "This adds the length and width once, 12 + 4.5, instead of going around all four sides.",
      C: "This doubles the correct perimeter.",
      D: "This doubles the area, which is not a perimeter.",
    },
    verification: {
      kind: "value",
      compute: "2 * (12 + 54 / 12)",
      choiceValues: values(["16.5", "33", "66", "108"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-av-002",
    skillId: "math-area-volume",
    difficulty: "medium",
    format: "grid-in",
    stem: "A right circular cylinder has a radius of 3 units and a height of 8 units. Its volume is kπ cubic units. What is the value of k?",
    acceptedAnswers: ["72"],
    explanation: "The volume is πr²h = π(3²)(8) = 72π cubic units, so k = 72.",
    verification: { kind: "value", compute: "3 * 3 * 8" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-av-003",
    skillId: "math-area-volume",
    difficulty: "medium",
    format: "single-select",
    stem: "A cube has a volume of 64 cubic inches. What is the total surface area of the cube, in square inches?",
    choices: choices(["16", "64", "384", "96"]),
    answer: "D",
    nearMiss: "A",
    explanation:
      "Each edge is the cube root of 64, which is 4 inches. Each of the 6 faces has area 4² = 16, so the surface area is 6 × 16 = 96 square inches.",
    rationales: {
      A: "This is the area of a single face, but a cube has 6 faces.",
      B: "This repeats the volume, which measures space inside the cube rather than its surface.",
      C: "This multiplies the volume by 6 instead of multiplying the area of one face by 6.",
    },
    verification: {
      kind: "value",
      compute: "6 * Math.cbrt(64) ** 2",
      choiceValues: values(["16", "64", "384", "96"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-av-004",
    skillId: "math-area-volume",
    difficulty: "hard",
    format: "single-select",
    stem: "Two prisms are similar. Each edge of the larger prism is 3 times as long as the corresponding edge of the smaller prism. The smaller prism has a volume of 20 cubic centimeters. What is the volume of the larger prism, in cubic centimeters?",
    choices: choices(["60", "540", "180", "23"]),
    answer: "B",
    nearMiss: "C",
    explanation:
      "Volume grows by the cube of the scale factor, so the larger volume is 20 × 3³ = 20 × 27 = 540 cubic centimeters.",
    rationales: {
      A: "This multiplies by the scale factor itself, which is how lengths change, not volumes.",
      C: "This multiplies by 3², the factor for areas, instead of 3³ for volumes.",
      D: "This adds 3 to the volume instead of scaling it.",
    },
    verification: {
      kind: "value",
      compute: "20 * 3 ** 3",
      choiceValues: values(["60", "540", "180", "23"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-av-005",
    skillId: "math-area-volume",
    difficulty: "hard",
    format: "grid-in",
    stem: "In the figure, a right triangle with legs of length 4 and 6 has been cut from one corner of a square with side length 10. What is the area of the remaining shaded region?",
    figure: {
      type: "shapes",
      alt: "A square with side length 10. A right triangle has been cut from its top left corner, with legs 4 along the top edge and 6 along the left edge. The remaining five-sided region is shaded.",
      width: 10,
      height: 10,
      polygons: [
        {
          points: [
            [0, 0],
            [10, 0],
            [10, 10],
            [4, 10],
            [0, 4],
          ],
        },
      ],
      segments: [
        { from: [0, 4], to: [0, 10], dashed: true },
        { from: [0, 10], to: [4, 10], dashed: true },
      ],
      labels: [
        { at: [5, -0.5], text: "10" },
        { at: [10.5, 5], text: "10" },
        { at: [2, 10.5], text: "4" },
        { at: [-0.5, 7], text: "6" },
      ],
    },
    acceptedAnswers: ["88"],
    explanation:
      "The square's area is 10 × 10 = 100. The triangle removed has area ½ × 4 × 6 = 12. The remaining region has area 100 − 12 = 88.",
    verification: { kind: "value", compute: "10 * 10 - (1 / 2) * 4 * 6" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-av-006",
    skillId: "math-area-volume",
    difficulty: "medium",
    format: "single-select",
    stem: "A sphere has a radius of 3 inches. What is the volume of the sphere, in cubic inches?",
    choices: choices(["9π", "4π", "36π", "6π"]),
    answer: "C",
    nearMiss: "B",
    explanation: "The volume of a sphere is (4/3)πr³ = (4/3)π(27) = 36π cubic inches.",
    rationales: {
      A: "This is πr², the area of a circle with radius 3, not a volume.",
      B: "This uses r instead of r³: (4/3)π(3) = 4π.",
      D: "This is 2πr, the circumference of a circle with radius 3, not a volume.",
    },
    verification: {
      kind: "value",
      compute: "(4 / 3) * Math.PI * 3 ** 3",
      choiceValues: values([
        "12 * Math.PI",
        "27 * Math.PI",
        "36 * Math.PI",
        "108 * Math.PI",
      ]),
    },
  },

  // More lines, angles, and triangles
  {
    schemaVersion: 1,
    id: "tp-math-lat-005",
    skillId: "math-lines-angles-triangles",
    difficulty: "easy",
    format: "single-select",
    stem: "In the figure, two lines intersect. The measures of two vertical angles formed by the lines are (3x + 10)° and (5x − 30)°. What is the value of x?",
    figure: {
      type: "shapes",
      alt: "Two straight lines crossing at a point. The angle on the left is labeled (3x + 10)° and the vertical angle opposite it, on the right, is labeled (5x − 30)°.",
      width: 10,
      height: 6,
      segments: [
        { from: [0, 1], to: [10, 5] },
        { from: [0, 5], to: [10, 1] },
      ],
      labels: [
        { at: [2.6, 3], text: "(3x + 10)°" },
        { at: [7.4, 3], text: "(5x − 30)°" },
      ],
    },
    choices: choices(["10", "25", "20", "70"]),
    answer: "C",
    nearMiss: "B",
    explanation: "Vertical angles are equal: 3x + 10 = 5x − 30, so 40 = 2x and x = 20.",
    rationales: {
      A: "This divides 40 by 4 instead of by 2.",
      B: "This treats the angles as supplementary (adding to 180°), but vertical angles are equal.",
      D: "This is the measure of each angle, 3(20) + 10, not the value of x.",
    },
    verification: {
      kind: "value",
      compute: "(10 + 30) / (5 - 3)",
      choiceValues: values(["10", "25", "20", "70"]),
    },
  },
  {
    schemaVersion: 1,
    id: "tp-math-lat-006",
    skillId: "math-lines-angles-triangles",
    difficulty: "medium",
    format: "grid-in",
    stem: "In triangle ABC, the exterior angle at vertex C measures 128°, and angle A measures 51°. What is the measure of angle B, in degrees?",
    acceptedAnswers: ["77"],
    explanation:
      "An exterior angle of a triangle equals the sum of the two interior angles that are not next to it, so 51 + B = 128 and B = 77°.",
    verification: { kind: "value", compute: "128 - 51" },
  },
  {
    schemaVersion: 1,
    id: "tp-math-lat-007",
    skillId: "math-lines-angles-triangles",
    difficulty: "hard",
    format: "single-select",
    stem: "In triangle PQR, PQ = PR. Angle P measures (4x)°, and angle Q measures (2x + 10)°. What is the measure of angle R, in degrees?",
    choices: choices(["20", "50", "80", "40"]),
    answer: "B",
    nearMiss: "A",
    explanation:
      "Since PQ = PR, angles Q and R are equal. Then 4x + 2(2x + 10) = 180, so 8x = 160 and x = 20. Angle R equals angle Q: 2(20) + 10 = 50°.",
    rationales: {
      A: "This is the value of x, not the measure of the angle.",
      C: "This is the measure of angle P, 4(20), not angle R.",
      D: "This doubles x without adding 10.",
    },
    verification: {
      kind: "value",
      compute: "2 * ((180 - 20) / 8) + 10",
      choiceValues: values(["20", "50", "80", "40"]),
    },
  },
];

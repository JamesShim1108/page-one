// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-3-12",
  courseId: "precalculus",
  unitId: "precalculus-3",
  order: 12,
  code: "3.12",
  title: "Equivalent Representations of Trigonometric Functions",
  period: "Unit 3",
  status: "ready",
  summary:
    "The Pythagorean identity and forms derived from it, the sum identities for sine and cosine with their difference and double-angle versions, and using equivalent forms to solve trigonometric equations.",
  minutes: 14,
  learningGoals: [
    "3.12.A Rewrite trigonometric expressions in equivalent forms with the Pythagorean identity.",
    "3.12.B Rewrite trigonometric expressions in equivalent forms with sine and cosine sum identities.",
    "3.12.C Solve equations using equivalent analytic representations of trigonometric functions.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "An identity is an equation that is true for every input where both sides are defined, so it lets you trade one expression for another. Choosing the right form turns an unfamiliar equation into one you already know how to solve.",
  context:
    "Topics 3.10 and 3.11 solved equations in a single trigonometric function. Equations that mix sine and cosine, or involve sums of angles, need identities first. The AP Exam's symbolic manipulation question asks for exactly this kind of rewriting.",
  sections: [
    {
      id: "pythagorean-identity",
      title: "3.12.A · The Pythagorean identity: sin²θ + cos²θ = 1.",
      conceptTitle: "The Pythagorean identity",
      blocks: [
        {
          type: "paragraph",
          text: "The Pythagorean Theorem can be applied to right triangles with points on the unit circle at coordinates (cos θ, sin θ), resulting in the Pythagorean identity: sin²θ + cos²θ = 1.",
        },
        {
          type: "paragraph",
          text: "The Pythagorean identity can be algebraically manipulated into other forms involving trigonometric functions, such as tan²θ = sec²θ − 1, and can be used to establish other trigonometric relationships, such as arcsin x = arccos(√(1 − x²)), with appropriate domain restrictions.",
        },
        {
          type: "paragraph",
          text: "Dividing sin²θ + cos²θ = 1 by cos²θ gives tan²θ + 1 = sec²θ, which is tan²θ = sec²θ − 1 wherever cos θ ≠ 0. The relationship arcsin x = arccos(√(1 − x²)) holds for 0 ≤ x ≤ 1, where both sides name the same Quadrant I angle; for negative x, arcsin x is negative but arccosine never is.",
        },
        {
          type: "paragraph",
          text: "Example: sin θ = 0.6 and the terminal ray of θ is in Quadrant II. Then cos²θ = 1 − 0.36 = 0.64, so cos θ = ±0.8, and the quadrant makes it −0.8.",
        },
        {
          type: "callout",
          title: "The square root needs a sign",
          text: "Solving sin²θ + cos²θ = 1 for cos θ gives two values, ±√(1 − sin²θ). The quadrant of θ chooses between them.",
        },
      ],
      takeaway: "sin²θ + cos²θ = 1 and tan²θ = sec²θ − 1; the quadrant picks the sign.",
    },
    {
      id: "sum-identities",
      title: "3.12.B · Sum identities for sine and cosine.",
      conceptTitle: "Sum, difference, and double-angle identities",
      blocks: [
        {
          type: "paragraph",
          text: "The sum identity for sine is sin(α + β) = sin α cos β + cos α sin β.",
        },
        {
          type: "paragraph",
          text: "The sum identity for cosine is cos(α + β) = cos α cos β − sin α sin β.",
        },
        {
          type: "paragraph",
          text: "The sum identities for sine and cosine can also be used as difference and double-angle identities.",
        },
        {
          type: "table",
          caption: "Identities that follow from the sum identities",
          columns: ["Replace", "Sine", "Cosine"],
          rows: [
            [
              "β with −β",
              "sin(α − β) = sin α cos β − cos α sin β",
              "cos(α − β) = cos α cos β + sin α sin β",
            ],
            ["β with α", "sin(2α) = 2 sin α cos α", "cos(2α) = cos²α − sin²α"],
          ],
        },
        {
          type: "paragraph",
          text: "Example: π/12 = π/3 − π/4, so cos(π/12) = cos(π/3)cos(π/4) + sin(π/3)sin(π/4) = (1/2)(√2/2) + (√3/2)(√2/2) = (√2 + √6)/4 ≈ 0.966.",
        },
        {
          type: "paragraph",
          text: "Properties of trigonometric functions, known trigonometric identities, and other algebraic properties can be used to verify additional trigonometric identities. For instance, using the Pythagorean identity, cos(2α) = cos²α − sin²α can also be written as 1 − 2 sin²α or 2 cos²α − 1.",
        },
      ],
      takeaway: "Learn the two sum identities; differences and doubles follow from them.",
    },
    {
      id: "solving-with-identities",
      title: "3.12.C · Rewrite to solve.",
      conceptTitle: "Solving equations with equivalent forms",
      blocks: [
        {
          type: "paragraph",
          text: "A specific equivalent form involving trigonometric expressions can make information more accessible.",
        },
        {
          type: "paragraph",
          text: "Equivalent trigonometric forms may be useful in solving trigonometric equations and inequalities.",
        },
        {
          type: "paragraph",
          text: "Example: solve 2 cos²θ + 3 sin θ − 3 = 0 on 0 ≤ θ < 2π. Replace cos²θ with 1 − sin²θ: 2 − 2 sin²θ + 3 sin θ − 3 = 0, so 2 sin²θ − 3 sin θ + 1 = 0. This factors as (2 sin θ − 1)(sin θ − 1) = 0, so sin θ = 1/2 or sin θ = 1. The solutions are θ = π/6, π/2, and 5π/6.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Rewrite so the equation has only one trigonometric function, solve that function for its values, then find every angle in the required interval.",
        },
      ],
      takeaway:
        "Use an identity to get a single trigonometric function, then solve as in Topic 3.10.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-3-12-pythagorean-identity",
      topicId: "precalculus-3-12",
      term: "Pythagorean identity",
      definition:
        "The Pythagorean Theorem can be applied to right triangles with points on the unit circle at coordinates (cos θ, sin θ), resulting in the Pythagorean identity: sin²θ + cos²θ = 1.",
      source: "CED 3.12.A.1",
    },
    {
      id: "precalculus-3-12-sum-identity-for-sine",
      topicId: "precalculus-3-12",
      term: "Sum identity for sine",
      definition: "The sum identity for sine is sin(α + β) = sin α cos β + cos α sin β.",
      source: "CED 3.12.B.1",
    },
    {
      id: "precalculus-3-12-sum-identity-for-cosine",
      topicId: "precalculus-3-12",
      term: "Sum identity for cosine",
      definition:
        "The sum identity for cosine is cos(α + β) = cos α cos β − sin α sin β.",
      source: "CED 3.12.B.2",
    },
  ],
  connections: [
    {
      id: "precalculus-3-12-c1",
      topicId: "precalculus-3-12",
      type: "Look back",
      title: "Solving trigonometric equations",
      body: "After rewriting, the last step is always a basic equation such as sin θ = 1/2, solved with the methods of Topic 3.10.",
      transferQuestion: "Solve sin θ = 1 on 0 ≤ θ < 2π.",
      feedback: "θ = π/2 only.",
      links: [
        {
          topicId: "precalculus-3-10",
          sectionId: "solving-equations",
          label: "Review solving equations",
        },
      ],
    },
    {
      id: "precalculus-3-12-c2",
      topicId: "precalculus-3-12",
      type: "Looking ahead",
      title: "Polar coordinates",
      body: "Topic 3.13 uses the Pythagorean Theorem again, r = √(x² + y²), to convert points from rectangular to polar coordinates.",
      transferQuestion: "A point is at (cos θ, sin θ). How far is it from the origin?",
      feedback: "√(cos²θ + sin²θ) = 1.",
      links: [
        {
          topicId: "precalculus-3-13",
          sectionId: "converting-coordinates",
          label: "See converting coordinates",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-3-12"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-3-12-pythagorean-identity",
      "precalculus-3-12-sum-identity-for-sine",
      "precalculus-3-12-sum-identity-for-cosine",
    ],
  },
};

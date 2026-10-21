// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-4",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 4,
  code: "2.4",
  title: "Exponential Function Manipulation",
  period: "Unit 2",
  status: "ready",
  summary:
    "The product, power, and negative exponent properties, unit-fraction exponents as roots, and how horizontal translations and dilations of exponential functions become vertical dilations and changes of base.",
  minutes: 12,
  learningGoals: ["2.4.A Rewrite exponential expressions in equivalent forms."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "The properties of exponents are not just rules for simplifying. They show that shifting an exponential graph sideways is the same as stretching it vertically, and squeezing it sideways is the same as changing its base.",
  context:
    "Topic 2.3 described f(x) = abˣ. Free-response Question 4 on the AP Exam asks you to rewrite exponential expressions in equivalent forms without a calculator, using exactly these properties.",
  sections: [
    {
      id: "product-property",
      title:
        "2.4.A · The product property: a horizontal translation is a vertical dilation.",
      conceptTitle: "Product property for exponents",
      blocks: [
        {
          type: "paragraph",
          text: "The product property for exponents states that bᵐbⁿ = b^(m + n). Graphically, this property implies that every horizontal translation of an exponential function, f(x) = b^(x + k), is equivalent to a vertical dilation, f(x) = b^(x + k) = bˣbᵏ = abˣ, where a = bᵏ.",
        },
        {
          type: "paragraph",
          text: "Example: 2^(x + 3) = 2ˣ·2³ = 8(2)ˣ. Translating the graph of y = 2ˣ horizontally by −3 units gives the same graph as dilating it vertically by a factor of 8.",
        },
        {
          type: "graph",
          caption: "y = 2^(x + 3) and y = 8(2)ˣ are the same function",
          alt: "A single exponential curve through (0, 8) and (−3, 1), with a dashed copy of y = 2ˣ through (0, 1) for comparison. The labeled curve can be read as y = 2ˣ shifted left 3 units or stretched vertically by a factor of 8.",
          window: {
            x: [-5, 3],
            y: [-1, 20],
          },
          ticks: {
            x: 1,
            y: 4,
          },
          functions: [
            {
              expr: "2^(x + 3)",
              label: "y = 2^(x + 3) = 8(2)ˣ",
              labelAt: 0.9,
              labelPosition: "w",
            },
            {
              expr: "2^x",
              color: 2,
              dashed: true,
              label: "y = 2ˣ",
              labelAt: 2.6,
              labelPosition: "nw",
            },
          ],
          points: [
            {
              at: [0, 8],
              label: "(0, 8)",
              position: "e",
            },
            {
              at: [-3, 1],
              label: "(−3, 1)",
              position: "nw",
            },
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "5^(x − 2) = 5ˣ·5⁻² = (1/25)·5ˣ. Show the product property step before writing the coefficient.",
        },
      ],
      takeaway: "b^(x + k) = bᵏ·bˣ: shift left by k, or stretch by bᵏ. Same graph.",
    },
    {
      id: "power-property",
      title: "2.4.A · The power property: a horizontal dilation is a change of base.",
      conceptTitle: "Power property for exponents",
      blocks: [
        {
          type: "paragraph",
          text: "The power property for exponents states that (bᵐ)ⁿ = b^(mn). Graphically, this property implies that every horizontal dilation of an exponential function, f(x) = b^(cx), is equivalent to a change of the base of an exponential function, f(x) = (b^c)ˣ, where b^c is a constant and c ≠ 0.",
        },
        {
          type: "paragraph",
          text: "Example: 3^(2x) = (3²)ˣ = 9ˣ, and 16^(x/4) = (16^(1/4))ˣ = 2ˣ. A horizontal dilation by a factor of 1/2 turns base 3 into base 9.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "4^(3x + 1) = 4^(3x)·4¹ = 4(4³)ˣ = 4(64)ˣ. Use the product property first, then the power property.",
        },
      ],
      takeaway: "b^(cx) = (b^c)ˣ: a horizontal dilation changes the base to b^c.",
    },
    {
      id: "negative-and-roots",
      title: "2.4.A · Negative exponents and unit-fraction exponents.",
      conceptTitle: "Negative and fractional exponents",
      blocks: [
        {
          type: "paragraph",
          text: "The negative exponent property states that b⁻ⁿ = 1/bⁿ.",
        },
        {
          type: "paragraph",
          text: "The value of an exponential expression involving an exponential unit fraction, such as b^(1/k) where k is a natural number, is the kth root of b, when it exists.",
        },
        {
          type: "table",
          caption: "Rewriting with the properties of exponents",
          columns: ["Expression", "Property", "Equivalent form"],
          rows: [
            ["7³·7⁵", "Product", "7⁸"],
            ["(2³)⁴", "Power", "2¹²"],
            ["10⁻³", "Negative exponent", "1/10³ = 0.001"],
            ["32^(1/5)", "Unit fraction", "the fifth root of 32, which is 2"],
            ["8^(2/3)", "Power and unit fraction", "(8^(1/3))² = 2² = 4"],
            ["(1/3)ˣ", "Negative exponent", "3^(−x)"],
          ],
        },
        {
          type: "paragraph",
          text: "Because (1/b)ˣ = b^(−x), exponential decay with base 1/b is a reflection over the y-axis of exponential growth with base b.",
        },
      ],
      takeaway: "b⁻ⁿ = 1/bⁿ and b^(1/k) is the kth root of b.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-4-product-property",
      topicId: "precalculus-2-4",
      term: "Product property for exponents",
      definition: "The product property for exponents states that bᵐbⁿ = b^(m + n).",
      source: "CED 2.4.A.1",
    },
    {
      id: "precalculus-2-4-power-property",
      topicId: "precalculus-2-4",
      term: "Power property for exponents",
      definition: "The power property for exponents states that (bᵐ)ⁿ = b^(mn).",
      source: "CED 2.4.A.2",
    },
    {
      id: "precalculus-2-4-negative-exponent-property",
      topicId: "precalculus-2-4",
      term: "Negative exponent property",
      definition: "The negative exponent property states that b⁻ⁿ = 1/bⁿ.",
      source: "CED 2.4.A.3",
    },
  ],
  connections: [
    {
      id: "precalculus-2-4-c1",
      topicId: "precalculus-2-4",
      type: "Look back",
      title: "Transformations of functions",
      body: "Topic 1.12 described f(x + h) as a horizontal translation and f(bx) as a horizontal dilation. For exponential functions, the properties of exponents turn those into a vertical dilation and a change of base.",
      transferQuestion: "Write g(x) = 3^(x − 1) as a vertical dilation of 3ˣ.",
      feedback: "g(x) = 3ˣ·3⁻¹ = (1/3)·3ˣ, a vertical dilation by a factor of 1/3.",
      links: [
        {
          topicId: "precalculus-2-3",
          sectionId: "general-form",
          label: "Review the general form",
        },
      ],
    },
    {
      id: "precalculus-2-4-c2",
      topicId: "precalculus-2-4",
      type: "Looking ahead",
      title: "Equivalent forms in context",
      body: "Topic 2.5 uses equivalent forms to change the time unit of a model: a quantity that doubles every day grows by a factor of 2⁷ every week.",
      transferQuestion:
        "Rewrite 2^(t/7) as an exponential function with base b raised to the power t.",
      feedback: "2^(t/7) = (2^(1/7))ᵗ ≈ 1.104ᵗ.",
      links: [
        {
          topicId: "precalculus-2-5",
          sectionId: "using-models",
          label: "See equivalent forms in context",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-4"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-2-4-product-property",
      "precalculus-2-4-power-property",
      "precalculus-2-4-negative-exponent-property",
    ],
  },
};

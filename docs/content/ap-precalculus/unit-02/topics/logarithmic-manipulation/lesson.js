// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-12",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 12,
  code: "2.12",
  title: "Logarithmic Function Manipulation",
  period: "Unit 2",
  status: "ready",
  summary:
    "The product, power, and change of base properties for logarithms, the natural logarithm, and how horizontal dilations of logarithmic functions become vertical translations and dilations.",
  minutes: 13,
  learningGoals: ["2.12.A Rewrite logarithmic expressions in equivalent forms."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Logarithms turn multiplication into addition and powers into multiplication. Those two facts let you combine logarithmic terms into one, which is exactly what free-response Question 4 asks for.",
  context:
    "Topic 2.4 rewrote exponential expressions with the properties of exponents. Each property of logarithms here is the same property read through the inverse relationship of Topic 2.10.",
  sections: [
    {
      id: "product-property",
      title:
        "2.12.A · The product property: a horizontal dilation is a vertical translation.",
      conceptTitle: "Product property for logarithms",
      blocks: [
        {
          type: "paragraph",
          text: "The product property for logarithms states that log_b (xy) = log_b x + log_b y. Graphically, this property implies that every horizontal dilation of a logarithmic function, f(x) = log_b (kx), is equivalent to a vertical translation, f(x) = log_b (kx) = log_b k + log_b x = a + log_b x, where a = log_b k.",
        },
        {
          type: "paragraph",
          text: "Example: log₂ (8x) = log₂ 8 + log₂ x = 3 + log₂ x. Compressing the graph of y = log₂ x horizontally by a factor of 1/8 gives the same graph as translating it up 3 units.",
        },
        {
          type: "paragraph",
          text: "Combining the product property with the power property below gives a rule for quotients: log_b (x/y) = log_b (x·y⁻¹) = log_b x − log_b y. For example, log₂ 48 − log₂ 3 = log₂ 16 = 4.",
        },
      ],
      takeaway:
        "log_b (xy) = log_b x + log_b y, so log_b (kx) is log_b x shifted by log_b k.",
    },
    {
      id: "power-property",
      title:
        "2.12.A · The power property: raising the input to a power is a vertical dilation.",
      conceptTitle: "Power property for logarithms",
      blocks: [
        {
          type: "paragraph",
          text: "The power property for logarithms states that log_b xⁿ = n log_b x. Graphically, this property implies that raising the input of a logarithmic function to a power, f(x) = log_b xᵏ, results in a vertical dilation, f(x) = log_b xᵏ = k log_b x.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "2 ln 6 − ln 4 = ln 6² − ln 4 = ln 36 − ln 4 = ln (36/4) = ln 9. Write each step with the property it uses.",
        },
        {
          type: "table",
          caption: "Combining logarithmic terms into a single logarithm",
          columns: ["Expression", "Steps", "Single logarithm"],
          rows: [
            ["log₃ 5 + log₃ 4", "Product property", "log₃ 20"],
            ["3 log x", "Power property", "log x³"],
            ["log₂ x + 2 log₂ y", "Power, then product", "log₂ (xy²)"],
            ["ln 50 − 2 ln 5", "Power, then quotient", "ln 2"],
          ],
        },
      ],
      takeaway: "log_b xⁿ = n log_b x: a power of the input becomes a coefficient.",
    },
    {
      id: "change-of-base",
      title:
        "2.12.A · Change of base: all logarithmic functions are vertical dilations of each other.",
      conceptTitle: "Change of base and the natural logarithm",
      blocks: [
        {
          type: "paragraph",
          text: "The change of base property for logarithms states that log_b x = (log_a x)/(log_a b), where a > 0 and a ≠ 1. This implies that all logarithmic functions are vertical dilations of each other.",
        },
        {
          type: "paragraph",
          text: "The function f(x) = ln x is a logarithmic function with the natural base e; that is, ln x = logₑ x.",
        },
        {
          type: "paragraph",
          text: "Example: log₅ 40 = (ln 40)/(ln 5) ≈ 2.292. Also log₈ x = (log₂ x)/(log₂ 8) = (1/3) log₂ x, so the graph of y = log₈ x is a vertical dilation of y = log₂ x by a factor of 1/3.",
        },
      ],
      takeaway: "log_b x = (log_a x)/(log_a b), and ln x = logₑ x.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-12-product-property-logs",
      topicId: "precalculus-2-12",
      term: "Product property for logarithms",
      definition:
        "The product property for logarithms states that log_b (xy) = log_b x + log_b y.",
      source: "CED 2.12.A.1",
    },
    {
      id: "precalculus-2-12-power-property-logs",
      topicId: "precalculus-2-12",
      term: "Power property for logarithms",
      definition: "The power property for logarithms states that log_b xⁿ = n log_b x.",
      source: "CED 2.12.A.2",
    },
    {
      id: "precalculus-2-12-change-of-base",
      topicId: "precalculus-2-12",
      term: "Change of base property",
      definition:
        "The change of base property for logarithms states that log_b x = (log_a x)/(log_a b), where a > 0 and a ≠ 1. This implies that all logarithmic functions are vertical dilations of each other.",
      source: "CED 2.12.A.3",
    },
    {
      id: "precalculus-2-12-natural-logarithm",
      topicId: "precalculus-2-12",
      term: "Natural logarithm",
      definition:
        "The function f(x) = ln x is a logarithmic function with the natural base e; that is, ln x = logₑ x.",
      source: "CED 2.12.A.4",
    },
  ],
  connections: [
    {
      id: "precalculus-2-12-c1",
      topicId: "precalculus-2-12",
      type: "Look back",
      title: "Properties of exponents, read backward",
      body: "Topic 2.4 showed bᵐbⁿ = b^(m + n). Taking log_b of both sides gives log_b (bᵐbⁿ) = m + n = log_b bᵐ + log_b bⁿ, the product property for logarithms.",
      transferQuestion:
        "Which property of exponents corresponds to log_b xⁿ = n log_b x?",
      feedback: "The power property, (bᵐ)ⁿ = b^(mn).",
      links: [
        {
          topicId: "precalculus-2-4",
          sectionId: "power-property",
          label: "Review the power property for exponents",
        },
      ],
    },
    {
      id: "precalculus-2-12-c2",
      topicId: "precalculus-2-12",
      type: "Looking ahead",
      title: "Solving equations",
      body: "Topic 2.13 uses these properties to solve exponential and logarithmic equations, and checks every solution against the domain.",
      transferQuestion:
        "Solve log₂ x + log₂ (x − 2) = 3 by first combining the left side.",
      feedback:
        "log₂ (x(x − 2)) = 3, so x² − 2x = 8 and x = 4 (x = −2 is outside the domain).",
      links: [
        {
          topicId: "precalculus-2-13",
          sectionId: "solving",
          label: "See solving equations",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-12"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-2-12-product-property-logs",
      "precalculus-2-12-power-property-logs",
      "precalculus-2-12-change-of-base",
      "precalculus-2-12-natural-logarithm",
    ],
  },
};

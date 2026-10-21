// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-9",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 9,
  code: "2.9",
  title: "Logarithmic Expressions",
  period: "Unit 2",
  status: "ready",
  summary:
    "What log_b c means, evaluating logarithms with and without technology, the common logarithm, and logarithmic scales.",
  minutes: 11,
  learningGoals: ["2.9.A Evaluate logarithmic expressions."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A logarithm answers one question: what exponent turns the base into this number? Every logarithm statement is an exponential statement read the other way.",
  context:
    "Topics 2.3 to 2.5 asked for outputs of exponential functions. Logarithms ask for the input instead, which is the step needed to solve exponential equations and to build logarithmic functions in Topic 2.10.",
  sections: [
    {
      id: "meaning",
      title:
        "2.9.A · log_b c is the exponent that b must be raised to in order to obtain c.",
      conceptTitle: "What a logarithm means",
      blocks: [
        {
          type: "paragraph",
          text: "The logarithmic expression log_b c is equal to, or represents, the value that the base b must be exponentially raised to in order to obtain the value c. That is, log_b c = a if and only if bᵃ = c, where a and c are constants, b > 0, and b ≠ 1. (when the base of a logarithmic expression is not specified, it is understood as the common logarithm with a base of 10)",
        },
        {
          type: "table",
          caption: "Each logarithm statement is an exponential statement",
          columns: ["Logarithmic form", "Exponential form", "In words"],
          rows: [
            ["log₂ 32 = 5", "2⁵ = 32", "2 must be raised to 5 to obtain 32."],
            ["log₃ (1/27) = −3", "3⁻³ = 1/27", "3 must be raised to −3 to obtain 1/27."],
            ["log 0.01 = −2", "10⁻² = 0.01", "The common logarithm has base 10."],
            ["log₉ 3 = 1/2", "9^(1/2) = 3", "A unit-fraction exponent is a root."],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "log₄ 64 = 3 because 4³ = 64. State the exponential form as the reason.",
        },
      ],
      takeaway: "log_b c = a means bᵃ = c. No base written means base 10.",
    },
    {
      id: "evaluating",
      title: "2.9.A · Some logarithms are exact; others are estimated with technology.",
      conceptTitle: "Evaluating logarithms",
      blocks: [
        {
          type: "paragraph",
          text: "The values of some logarithmic expressions are readily accessible through basic arithmetic while other values can be estimated through the use of technology.",
        },
        {
          type: "paragraph",
          text: "log₅ 125 = 3 is exact, because 125 = 5³. log 40 is not an integer: since 10¹ = 10 and 10² = 100, log 40 is between 1 and 2, and technology gives log 40 ≈ 1.602.",
        },
        {
          type: "paragraph",
          text: "When the argument can be written as a power of a common base, rewrite both: log₈ 4 asks for a with 8ᵃ = 4. Since 8 = 2³ and 4 = 2², (2³)ᵃ = 2², so 3a = 2 and log₈ 4 = 2/3.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "On the no-calculator Question 4, find exact values such as log₂ 8 = 3. Use a decimal only when a calculator is allowed and the value is not exact.",
        },
      ],
      takeaway:
        "Rewrite as powers of a common base for exact values; estimate the rest with technology.",
    },
    {
      id: "log-scale",
      title: "2.9.A · On a logarithmic scale, each unit is a multiplicative change.",
      conceptTitle: "Logarithmic scales",
      blocks: [
        {
          type: "paragraph",
          text: "On a logarithmic scale, each unit represents a multiplicative change of the base of the logarithm. For example, on a standard scale, the units might be 0, 1, 2, …, while on a logarithmic scale, using logarithm base 10, the units might be 10⁰, 10¹, 10², ….",
        },
        {
          type: "table",
          caption: "Equal steps on a base-10 logarithmic scale",
          columns: ["Position on the scale", "0", "1", "2", "3", "4"],
          rows: [["Value represented", "1", "10", "100", "1,000", "10,000"]],
        },
        {
          type: "paragraph",
          text: "Moving one unit to the right multiplies the value by 10, so values that differ by many orders of magnitude, such as the intensity of a whisper and a jet engine, fit on one scale.",
        },
      ],
      takeaway: "Equal steps on a log scale mean equal factors, not equal differences.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-9-logarithmic-expression",
      topicId: "precalculus-2-9",
      term: "Logarithmic expression",
      definition:
        "The logarithmic expression log_b c is equal to, or represents, the value that the base b must be exponentially raised to in order to obtain the value c. That is, log_b c = a if and only if bᵃ = c, where a and c are constants, b > 0, and b ≠ 1.",
      source: "CED 2.9.A.1",
    },
    {
      id: "precalculus-2-9-common-logarithm",
      topicId: "precalculus-2-9",
      term: "Common logarithm",
      definition:
        "(when the base of a logarithmic expression is not specified, it is understood as the common logarithm with a base of 10)",
      source: "CED 2.9.A.1",
    },
    {
      id: "precalculus-2-9-logarithmic-scale",
      topicId: "precalculus-2-9",
      term: "Logarithmic scale",
      definition:
        "On a logarithmic scale, each unit represents a multiplicative change of the base of the logarithm. For example, on a standard scale, the units might be 0, 1, 2, …, while on a logarithmic scale, using logarithm base 10, the units might be 10⁰, 10¹, 10², ….",
      source: "CED 2.9.A.3",
    },
  ],
  connections: [
    {
      id: "precalculus-2-9-c1",
      topicId: "precalculus-2-9",
      type: "Look back",
      title: "Unit-fraction exponents",
      body: "Topic 2.4 showed that b^(1/k) is the kth root of b. That is why log₉ 3 = 1/2 and log₈ 2 = 1/3.",
      transferQuestion: "What is log₁₆ 2?",
      feedback: "1/4, because 16^(1/4) = 2.",
      links: [
        {
          topicId: "precalculus-2-4",
          sectionId: "negative-and-roots",
          label: "Review fractional exponents",
        },
      ],
    },
    {
      id: "precalculus-2-9-c2",
      topicId: "precalculus-2-9",
      type: "Looking ahead",
      title: "Logarithmic functions",
      body: "Topic 2.10 turns log_b x into a function of x and shows it is the inverse of the exponential function bˣ.",
      transferQuestion: "If f(x) = 3ˣ, what is f⁻¹(81)?",
      feedback: "4, because 3⁴ = 81. That is log₃ 81.",
      links: [
        {
          topicId: "precalculus-2-10",
          sectionId: "inverse-pairs",
          label: "See logarithms as inverses",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-9"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-2-9-logarithmic-expression",
      "precalculus-2-9-common-logarithm",
      "precalculus-2-9-logarithmic-scale",
    ],
  },
};

// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-10",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 10,
  code: "1.10",
  title: "Rational Functions and Holes",
  period: "Unit 1",
  status: "ready",
  summary:
    "When a factor cancels, the graph has a hole instead of an asymptote, and how to find its coordinates.",
  minutes: 12,
  learningGoals: [
    "Recognize when a common factor of the numerator and denominator produces a hole.",
    "Find the coordinates of a hole by simplifying and evaluating.",
    "Decide whether an undefined input gives a hole or a vertical asymptote.",
  ],
  bigIdea:
    "A rational function can be undefined at an input without having an asymptote there. When a factor of the denominator cancels completely, the graph approaches a single point and has a hole at that input.",
  context:
    "In Topic 1.9, every zero of the denominator led to an asymptote because the numerator was not zero there. This topic covers the other case, in which the numerator is zero at the same input.",
  sections: [
    {
      id: "hole-condition",
      title: "A hole appears when a factor cancels out of the denominator.",
      conceptTitle: "The condition for a hole",
      blocks: [
        {
          type: "paragraph",
          text: "Suppose the factor (x − a) appears in both the numerator and the denominator of a rational function. The function is undefined at x = a, because the original denominator is 0 there. But after the common factor is cancelled, nothing in the denominator is zero at x = a. The graph approaches a single point and has a hole at x = a.",
        },
        {
          type: "paragraph",
          text: "The multiplicities matter. A hole occurs when the factor appears in the numerator at least as many times as in the denominator. For r(x) = (x − 2)²/(x − 2), cancelling one factor leaves x − 2, so the graph has a hole at x = 2. For r(x) = (x − 2)/(x − 2)², cancelling leaves 1/(x − 2), so x = 2 is a vertical asymptote instead.",
        },
      ],
      takeaway:
        "Cancel common factors. If no factor of (x − a) is left in the denominator, there is a hole at x = a.",
    },
    {
      id: "hole-location",
      title: "The y-coordinate of a hole comes from the simplified function.",
      conceptTitle: "Locating a hole",
      blocks: [
        {
          type: "paragraph",
          text: "To find a hole, factor, cancel the common factor, and substitute the input into what is left. For r(x) = (x² − 4)/(x − 2) = (x − 2)(x + 2)/(x − 2), the cancelled factor is x − 2, so the hole is at x = 2. The simplified function is x + 2, and at x = 2 it equals 4. The hole is at the point (2, 4).",
        },
        {
          type: "table",
          caption: "Values of r(x) = (x² − 4)/(x − 2) near x = 2",
          columns: ["x", "r(x)"],
          rows: [
            ["1.9", "3.900"],
            ["1.99", "3.990"],
            ["1.999", "3.999"],
            ["2", "undefined"],
            ["2.001", "4.001"],
            ["2.01", "4.010"],
            ["2.1", "4.100"],
          ],
        },
        {
          type: "paragraph",
          text: "In limit notation, lim x→2 r(x) = 4. The one-sided limits from the left and from the right agree, which is different from a vertical asymptote. The limit exists even though r(2) does not.",
        },
      ],
      takeaway:
        "The hole is at the cancelled input, and its height is the value of the simplified function there.",
    },
    {
      id: "hole-or-asymptote",
      title: "After cancelling, remaining denominator zeros are asymptotes.",
      conceptTitle: "Holes versus asymptotes",
      blocks: [
        {
          type: "list",
          title: "A routine for each undefined input",
          items: [
            "Factor the numerator and the denominator.",
            "Cancel any common factors. Each cancelled input is a hole.",
            "Each zero of the denominator that remains is a vertical asymptote.",
          ],
        },
        {
          type: "paragraph",
          text: "Take r(x) = (x − 1)(x + 3)/((x − 1)(x − 2)). The factor x − 1 cancels, so there is a hole at x = 1. The simplified function (x + 3)/(x − 2) equals −4 at x = 1, so the hole is at (1, −4). The factor x − 2 does not cancel and the numerator is not zero at 2, so x = 2 is a vertical asymptote.",
        },
      ],
      takeaway:
        "One function can have both a hole and a vertical asymptote at different inputs.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-10-hole",
      topicId: "precalculus-1-10",
      term: "Hole",
      definition:
        "A single missing point in the graph of a function, at an input where the function is undefined but the outputs approach a finite value.",
    },
    {
      id: "precalculus-1-10-common-factor",
      topicId: "precalculus-1-10",
      term: "Common factor",
      definition:
        "A factor that appears in both the numerator and the denominator of a rational function.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-10-c1",
      topicId: "precalculus-1-10",
      type: "Look back",
      title: "Two reasons for an undefined input",
      body: "In Topic 1.9, a zero of the denominator that the numerator did not share gave a vertical asymptote. Here the numerator shares the zero, and the graph has only a hole.",
      transferQuestion:
        "What single check tells you whether an undefined input is an asymptote or a hole?",
      feedback:
        "Factor and cancel. If a factor of the denominator is left that is zero at that input, it is an asymptote. If not, it is a hole.",
      links: [
        {
          topicId: "precalculus-1-9",
          sectionId: "where-asymptotes",
          label: "Review vertical asymptotes",
        },
      ],
    },
    {
      id: "precalculus-1-10-c2",
      topicId: "precalculus-1-10",
      type: "Looking ahead",
      title: "Cancelling is one form of rewriting",
      body: "Factoring and cancelling gives an equivalent form of a rational expression. Topic 1.11 collects other ways to rewrite polynomial and rational expressions, including division.",
      transferQuestion:
        "Why might a rewritten form of a function reveal something the original form hides?",
      feedback:
        "Different forms highlight different features. A factored form shows zeros and holes, while a divided form shows the end behavior.",
      links: [
        {
          topicId: "precalculus-1-11",
          sectionId: "choose-form",
          label: "Preview equivalent forms",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-10"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-6-limit-notation",
      "precalculus-1-7-rational-function",
      "precalculus-1-9-vertical-asymptote",
      "precalculus-1-9-one-sided-limit",
      "precalculus-1-10-hole",
      "precalculus-1-10-common-factor",
    ],
  },
};

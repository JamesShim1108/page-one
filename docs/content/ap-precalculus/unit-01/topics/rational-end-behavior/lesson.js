// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-7",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 7,
  code: "1.7",
  title: "Rational Functions and End Behavior",
  period: "Unit 1",
  status: "ready",
  summary:
    "What a rational function is, and how comparing leading terms gives horizontal and slant asymptotes.",
  minutes: 12,
  learningGoals: [
    "Identify a rational function and recognize where its denominator can make it undefined.",
    "Use the degrees and leading coefficients of the numerator and denominator to find horizontal asymptotes.",
    "Recognize when a rational function has a slant asymptote and describe the end behavior in limit notation.",
  ],
  bigIdea:
    "For large inputs, a rational function behaves like the quotient of its leading terms. Comparing the sizes of the numerator and denominator tells you whether the outputs settle near a number, follow a line, or grow without bound.",
  context:
    "Polynomial end behavior came from one leading term. A rational function has two polynomials fighting for control, so the question becomes which one grows faster, or whether they grow at the same pace.",
  sections: [
    {
      id: "rational-quotient",
      title: "A rational function is a quotient of two polynomials.",
      conceptTitle: "Rational functions",
      blocks: [
        {
          type: "paragraph",
          text: "A rational function can be written r(x) = p(x)/q(x), where p and q are polynomials and q is not the zero polynomial. At each input, the output measures the size of the numerator relative to the size of the denominator. The function is undefined wherever q(x) = 0.",
        },
        {
          type: "table",
          caption: "Comparing the degrees of numerator and denominator",
          columns: ["Rational function", "Numerator degree", "Denominator degree"],
          rows: [
            ["(3x² + 1)/(x² − 5)", "2", "2"],
            ["(2x³ − x)/(x² + 1)", "3", "2"],
            ["(x + 4)/(x² − 1)", "1", "2"],
          ],
        },
      ],
      takeaway:
        "A rational function is a polynomial divided by a polynomial, and it is undefined where the denominator is zero.",
    },
    {
      id: "compare-degrees",
      title: "End behavior comes from comparing the leading terms.",
      conceptTitle: "Comparing degrees",
      blocks: [
        {
          type: "paragraph",
          text: "When |x| is large, a polynomial acts like its leading term. So a rational function acts like the quotient of the leading term of the numerator and the leading term of the denominator. What that quotient does depends on which degree is larger.",
        },
        {
          type: "table",
          caption: "End behavior of a rational function from the degrees",
          columns: ["Comparison of degrees", "Quotient of leading terms", "End behavior"],
          rows: [
            [
              "Denominator degree is greater",
              "Approaches 0",
              "Horizontal asymptote y = 0",
            ],
            [
              "Degrees are equal",
              "A constant: the ratio of leading coefficients",
              "Horizontal asymptote at that ratio",
            ],
            [
              "Numerator degree is greater",
              "Grows without bound",
              "Follows the end behavior of a polynomial; a slant asymptote if the numerator degree is exactly one more",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "For r(x) = (4x − 1)/(x² + 3), the denominator dominates, so the outputs shrink toward 0. For r(x) = (3x² + 1)/(x² − 5), the degrees are equal and the leading terms give 3x²/x² = 3.",
        },
      ],
      takeaway:
        "Compare degrees first. Equal degrees give a horizontal asymptote at the ratio of the leading coefficients.",
    },
    {
      id: "horizontal-asymptotes",
      title: "A horizontal asymptote describes the outputs at the ends.",
      conceptTitle: "Horizontal asymptotes",
      blocks: [
        {
          type: "paragraph",
          text: "A horizontal asymptote at y = b means that lim x→∞ r(x) = b, or lim x→−∞ r(x) = b, or both. The outputs get as close to b as you like, though they may not ever equal b at the far ends. For r(x) = (3x² + 1)/(x² − 5), the table shows the outputs closing in on 3.",
        },
        {
          type: "table",
          caption: "Values of r(x) = (3x² + 1)/(x² − 5)",
          columns: ["x", "r(x)"],
          rows: [
            ["10", "3.16842"],
            ["100", "3.00160"],
            ["1000", "3.00002"],
          ],
        },
        {
          type: "callout",
          title: "An asymptote describes the ends only",
          text: "A graph may cross a horizontal asymptote in the middle. The function r(x) = x/(x² + 1) has the horizontal asymptote y = 0 at both ends, yet r(0) = 0, so the graph meets that line at the origin.",
        },
      ],
      takeaway:
        "A horizontal asymptote is a statement about the far ends, written with limit notation.",
    },
    {
      id: "slant-asymptotes",
      title:
        "When the numerator's degree is one greater, the graph follows a slanted line.",
      conceptTitle: "Slant asymptotes",
      blocks: [
        {
          type: "paragraph",
          text: "Take r(x) = (2x³ − x)/(x² + 1). The numerator has degree 3 and the denominator has degree 2, so the outputs grow without bound. Dividing gives the equivalent form r(x) = 2x − 3x/(x² + 1). The last term shrinks toward 0 for large |x|, so r(x) behaves more and more like 2x.",
        },
        {
          type: "table",
          caption: "Comparing r(x) = (2x³ − x)/(x² + 1) with the line y = 2x",
          columns: ["x", "r(x)", "2x"],
          rows: [
            ["10", "19.703", "20"],
            ["100", "199.970", "200"],
            ["1000", "1999.997", "2000"],
          ],
        },
        {
          type: "paragraph",
          text: "The line y = 2x is a slant asymptote. Topic 1.11 shows how to find the equivalent form using polynomial long division. If the numerator's degree exceeds the denominator's by 2 or more, the outputs still grow without bound, but they follow a curve rather than a line.",
        },
      ],
      takeaway:
        "A numerator degree exactly one greater gives a slant asymptote, found from the quotient of a division.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-7-rational-function",
      topicId: "precalculus-1-7",
      term: "Rational function",
      definition:
        "A function that can be written as a quotient of two polynomials, with a denominator that is not the zero polynomial.",
    },
    {
      id: "precalculus-1-7-asymptote",
      topicId: "precalculus-1-7",
      term: "Asymptote",
      definition:
        "A line that a graph gets closer and closer to, described by what the function does as an input or output grows without bound.",
    },
    {
      id: "precalculus-1-7-horizontal-asymptote",
      topicId: "precalculus-1-7",
      term: "Horizontal asymptote",
      definition:
        "A line y = b that the outputs approach as the input increases or decreases without bound.",
    },
    {
      id: "precalculus-1-7-slant-asymptote",
      topicId: "precalculus-1-7",
      term: "Slant asymptote",
      definition:
        "A non-horizontal line that the graph of a rational function approaches as the input increases or decreases without bound.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-7-c1",
      topicId: "precalculus-1-7",
      type: "Look back",
      title: "Same dominance, new setting",
      body: "Topic 1.6 showed that a polynomial behaves like its leading term at the ends. Here two leading terms compete, and the winner, or the tie, determines the asymptote.",
      transferQuestion: "Why does a larger denominator degree pull the outputs toward 0?",
      feedback:
        "The denominator grows faster than the numerator, so the ratio shrinks toward 0.",
      links: [
        {
          topicId: "precalculus-1-6",
          sectionId: "leading-term",
          label: "Review how the leading term dominates",
        },
      ],
    },
    {
      id: "precalculus-1-7-c2",
      topicId: "precalculus-1-7",
      type: "Looking ahead",
      title: "Asymptotes meet zeros and holes",
      body: "Topic 1.8 finds where rational functions cross the x-axis. Topic 1.9 finds the vertical asymptotes that appear when the denominator is zero, and Topic 1.10 finds the holes that appear when a factor cancels.",
      transferQuestion:
        "Where would you look in a rational function for inputs where something unusual happens besides the ends?",
      feedback:
        "A strong answer says to factor the numerator and denominator and look at where each equals zero.",
      links: [
        {
          topicId: "precalculus-1-9",
          sectionId: "where-asymptotes",
          label: "Preview vertical asymptotes",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-7"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-4-leading-term",
      "precalculus-1-6-end-behavior",
      "precalculus-1-6-without-bound",
      "precalculus-1-6-limit-notation",
      "precalculus-1-7-rational-function",
      "precalculus-1-7-asymptote",
      "precalculus-1-7-horizontal-asymptote",
      "precalculus-1-7-slant-asymptote",
    ],
  },
};

// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-11",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 11,
  code: "1.11",
  title: "Equivalent Representations of Polynomial and Rational Expressions",
  period: "Unit 1",
  status: "ready",
  summary:
    "Rewriting expressions by factoring, expanding, dividing, and using the binomial theorem, and choosing the form that shows what you need.",
  minutes: 14,
  learningGoals: [
    "Choose between factored, expanded, and divided forms based on what you want to learn about a function.",
    "Rewrite a rational expression as a quotient plus a remainder using polynomial long division.",
    "Expand a power of a binomial using the binomial theorem.",
  ],
  bigIdea:
    "Equivalent expressions give the same outputs, but each form makes some features easy to see and others hard. Skilled work with functions includes choosing the form that fits the question.",
  context:
    "Earlier topics factored expressions to find zeros, holes, and asymptotes, and divided to find a slant asymptote. This topic gathers those moves and adds the binomial theorem for expanding powers.",
  sections: [
    {
      id: "choose-form",
      title: "Each form of an expression shows different features.",
      conceptTitle: "Choosing a form",
      blocks: [
        {
          type: "paragraph",
          text: "Two expressions are equivalent expressions when they have the same value for every input in their shared domain. The polynomial (x − 1)²(x + 2) and the polynomial x³ − 3x + 2 are equivalent. Neither is better in general. The factored form shows the zeros and their multiplicities at once, while the expanded form shows the degree, the leading term, and the value at x = 0.",
        },
        {
          type: "table",
          caption: "What each form shows",
          columns: ["Form", "Example", "What it shows quickly"],
          rows: [
            ["Factored polynomial", "(x − 1)²(x + 2)", "Zeros and their multiplicities"],
            [
              "Expanded polynomial",
              "x³ − 3x + 2",
              "Degree, leading term, value at x = 0",
            ],
            [
              "Factored rational function",
              "(x − 3)(x + 1)/((x − 3)(x − 2))",
              "Holes, common factors, and vertical asymptotes",
            ],
            [
              "Divided rational function",
              "x + 4 + 9/(x − 1)",
              "Horizontal or slant asymptote, and end behavior",
            ],
          ],
        },
        {
          type: "callout",
          title: "Watch the domain",
          text: "Cancelling a common factor changes the domain. The expression (x² − 4)/(x − 2) equals x + 2 only when x ≠ 2, because the original is undefined at 2. The two forms agree everywhere else.",
        },
      ],
      takeaway:
        "Decide what you want to learn about the function, then rewrite it in the form that shows it.",
    },
    {
      id: "long-division",
      title:
        "Polynomial long division rewrites a rational function as a quotient plus a remainder.",
      conceptTitle: "Polynomial long division",
      blocks: [
        {
          type: "paragraph",
          text: "Polynomial long division divides a polynomial p(x) by a polynomial d(x) and gives a quotient q(x) and a remainder r(x) with p(x) = d(x)·q(x) + r(x), where r has a lower degree than d. Dividing both sides by d(x) turns this into p(x)/d(x) = q(x) + r(x)/d(x). For a rational function, this divided form is useful because r(x)/d(x) shrinks toward 0 at the ends.",
        },
        {
          type: "paragraph",
          text: "For (x² + 3x + 5)/(x − 1), the first term of the quotient is x, because x·(x − 1) = x² − x. Subtracting leaves 4x + 5, and the next term is 4, since 4·(x − 1) = 4x − 4. The remainder is 9. So x² + 3x + 5 = (x − 1)(x + 4) + 9, and the rational function equals x + 4 + 9/(x − 1).",
        },
        {
          type: "paragraph",
          text: "The quotient x + 4 is the slant asymptote. When the numerator and denominator have the same degree, the quotient is a constant, and that constant is the horizontal asymptote, matching the ratio of leading coefficients from Topic 1.7. You can always check a division by multiplying the divisor and the quotient and adding the remainder.",
        },
      ],
      takeaway:
        "Divide, write quotient plus remainder over divisor, and check by multiplying back.",
    },
    {
      id: "binomial-theorem",
      title:
        "The binomial theorem expands a power of a sum without repeated multiplying.",
      conceptTitle: "The binomial theorem",
      blocks: [
        {
          type: "paragraph",
          text: "The binomial theorem says that (a + b)ⁿ is the sum of terms C(n, k)·aⁿ⁻ᵏ·bᵏ for k = 0, 1, …, n. The numbers C(n, k) are the binomial coefficients, and they form row n of Pascal's triangle. The powers of a fall by one in each term, and the powers of b rise by one.",
        },
        {
          type: "table",
          caption: "Binomial coefficients for n = 0 through 5",
          columns: ["n", "Coefficients C(n, 0), C(n, 1), …, C(n, n)"],
          rows: [
            ["0", "1"],
            ["1", "1, 1"],
            ["2", "1, 2, 1"],
            ["3", "1, 3, 3, 1"],
            ["4", "1, 4, 6, 4, 1"],
            ["5", "1, 5, 10, 10, 5, 1"],
          ],
        },
        {
          type: "paragraph",
          text: "For (x + 2)⁴ the coefficients are 1, 4, 6, 4, 1, and the powers of 2 are 1, 2, 4, 8, 16. The terms are 1·x⁴, 4·2·x³, 6·4·x², 4·8·x, and 1·16. So (x + 2)⁴ = x⁴ + 8x³ + 24x² + 32x + 16. When the second term is negative, as in (2x − 1)³, treat it as b = −1 and the signs alternate: 8x³ − 12x² + 6x − 1.",
        },
      ],
      takeaway:
        "Use the row of Pascal's triangle for the coefficients, and carry any coefficient and sign inside a and b.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-11-equivalent-expressions",
      topicId: "precalculus-1-11",
      term: "Equivalent expressions",
      definition:
        "Expressions that have the same value for every input in their shared domain.",
    },
    {
      id: "precalculus-1-11-polynomial-long-division",
      topicId: "precalculus-1-11",
      term: "Polynomial long division",
      definition:
        "A procedure that divides one polynomial by another and produces a quotient and a remainder of lower degree than the divisor.",
    },
    {
      id: "precalculus-1-11-binomial-theorem",
      topicId: "precalculus-1-11",
      term: "Binomial theorem",
      definition:
        "A rule that expands (a + b)ⁿ as a sum of terms whose coefficients are binomial coefficients.",
    },
    {
      id: "precalculus-1-11-binomial-coefficient",
      topicId: "precalculus-1-11",
      term: "Binomial coefficient",
      definition:
        "The number C(n, k) that multiplies the term with bᵏ in the expansion of (a + b)ⁿ, found in row n of Pascal's triangle.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-11-c1",
      topicId: "precalculus-1-11",
      type: "Look back",
      title: "Division gave the slant asymptote",
      body: "In Topic 1.7, the line y = 2x was the slant asymptote of (2x³ − x)/(x² + 1). Dividing is the method that finds such a line for any rational function whose numerator is one degree higher.",
      transferQuestion: "Which part of the divided form tells you the slant asymptote?",
      feedback: "The quotient. The remainder term shrinks toward 0 at the ends.",
      links: [
        {
          topicId: "precalculus-1-7",
          sectionId: "slant-asymptotes",
          label: "Review slant asymptotes",
        },
      ],
    },
    {
      id: "precalculus-1-11-c2",
      topicId: "precalculus-1-11",
      type: "Looking ahead",
      title: "Forms that reveal shifts",
      body: "Topic 1.12 describes how adding to the input or the output moves a graph. Writing an expression in a convenient form often makes the shift easy to read.",
      transferQuestion:
        "If a function is written in terms of (x − 3), which way is its graph shifted from the one written in terms of x?",
      feedback:
        "To the right by 3, because the input must be 3 larger to get the same output.",
      links: [
        {
          topicId: "precalculus-1-12",
          sectionId: "shifts",
          label: "Preview shifts",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-11"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-7-rational-function",
      "precalculus-1-7-horizontal-asymptote",
      "precalculus-1-7-slant-asymptote",
      "precalculus-1-10-common-factor",
      "precalculus-1-11-equivalent-expressions",
      "precalculus-1-11-polynomial-long-division",
      "precalculus-1-11-binomial-theorem",
      "precalculus-1-11-binomial-coefficient",
    ],
  },
};

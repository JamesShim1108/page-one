// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-9",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 9,
  code: "1.9",
  title: "Rational Functions and Vertical Asymptotes",
  period: "Unit 1",
  status: "ready",
  summary:
    "Where the denominator is zero but the numerator is not, and how one-sided limits describe the graph nearby.",
  minutes: 13,
  learningGoals: [
    "Find the vertical asymptotes of a rational function from the zeros of its denominator.",
    "Describe behavior near a vertical asymptote with one-sided limits in limit notation.",
    "Use the multiplicity of a denominator factor to decide whether the outputs have the same or opposite signs on the two sides.",
  ],
  bigIdea:
    "Near an input that makes the denominator zero but not the numerator, the outputs become very large in size. A sign chart tells you whether they head toward ∞ or −∞ on each side.",
  context:
    "Topic 1.8 excluded the inputs where the denominator is zero. Here we study what the graph does just beside them. The outputs do not settle down, and the way they blow up depends on the signs of the factors.",
  sections: [
    {
      id: "where-asymptotes",
      title:
        "A vertical asymptote sits where the denominator is zero and the numerator is not.",
      conceptTitle: "Vertical asymptotes",
      blocks: [
        {
          type: "paragraph",
          text: "A rational function r(x) = p(x)/q(x) has a vertical asymptote at x = a when q(a) = 0 and p(a) ≠ 0. The domain leaves out a, and for inputs near a, the outputs grow without bound in size. A vertical asymptote is a vertical line, so it is written as x = a.",
        },
        {
          type: "paragraph",
          text: "For r(x) = (x + 1)/(x − 3), the denominator is zero at x = 3 and the numerator is 4 there. The table shows what happens as x moves toward 3 from each side.",
        },
        {
          type: "table",
          caption: "Values of r(x) = (x + 1)/(x − 3) near x = 3",
          columns: ["x", "r(x)"],
          rows: [
            ["2.9", "−39"],
            ["2.99", "−399"],
            ["2.999", "−3,999"],
            ["3.001", "4,001"],
            ["3.01", "401"],
            ["3.1", "41"],
          ],
        },
        {
          type: "callout",
          title: "No denominator zero, no vertical asymptote",
          text: "The function (x + 1)/(x² + 4) has a denominator that is never 0, because x² + 4 is at least 4. It has no vertical asymptote. Also, if a factor cancels completely, as in (x − 3)/(x − 3), there is no asymptote either. Topic 1.10 treats that case.",
        },
      ],
      takeaway:
        "Factor the denominator, find its zeros, and keep the ones where the numerator is not zero.",
    },
    {
      id: "one-sided-limits",
      title: "One-sided limits describe the two sides of an asymptote separately.",
      conceptTitle: "One-sided limits",
      blocks: [
        {
          type: "paragraph",
          text: "In limit notation, x→3⁻ means x approaches 3 from values less than 3, and x→3⁺ means x approaches 3 from values greater than 3. The table above gives lim x→3⁻ r(x) = −∞ and lim x→3⁺ r(x) = ∞. The outputs fall without bound on the left and rise without bound on the right.",
        },
        {
          type: "paragraph",
          text: "You can predict these without a table. Just left of 3, the numerator x + 1 is positive and the denominator x − 3 is negative, so the quotient is negative and large. Just right of 3, both are positive, so the quotient is positive and large. A sign chart makes this routine.",
        },
      ],
      takeaway:
        "Check the sign of the numerator and of the denominator just to the left and just to the right of the asymptote.",
    },
    {
      id: "multiplicity-effect",
      title:
        "The multiplicity of a denominator factor decides whether the two sides match.",
      conceptTitle: "Multiplicity and asymptote behavior",
      blocks: [
        {
          type: "paragraph",
          text: "A factor with odd multiplicity changes sign at its zero, so the outputs head in opposite directions on the two sides. A factor with even multiplicity does not change sign, so the outputs head the same direction on both sides.",
        },
        {
          type: "table",
          caption: "Comparing 1/(x − 2)² and 1/(x − 2)³ near x = 2",
          columns: ["x", "1/(x − 2)²", "1/(x − 2)³"],
          rows: [
            ["1.9", "100", "−1,000"],
            ["1.99", "10,000", "−1,000,000"],
            ["2.01", "10,000", "1,000,000"],
            ["2.1", "100", "1,000"],
          ],
        },
        {
          type: "paragraph",
          text: "For 1/(x − 2)², both one-sided limits at 2 equal ∞. For 1/(x − 2)³, the left limit is −∞ and the right limit is ∞. If the numerator is negative near the asymptote, every sign flips. For example, (x − 1)/(x + 2)² has the limit −∞ from both sides at x = −2.",
        },
      ],
      takeaway:
        "Odd multiplicity gives opposite directions. Even multiplicity gives the same direction. A negative numerator flips both.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-9-vertical-asymptote",
      topicId: "precalculus-1-9",
      term: "Vertical asymptote",
      definition:
        "A vertical line x = a that the graph of a function approaches, with the outputs growing without bound in size as the input approaches a.",
    },
    {
      id: "precalculus-1-9-one-sided-limit",
      topicId: "precalculus-1-9",
      term: "One-sided limit",
      definition:
        "A limit in which the input approaches a value only from the left, written x→a⁻, or only from the right, written x→a⁺.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-9-c1",
      topicId: "precalculus-1-9",
      type: "Look back",
      title: "The sign chart returns",
      body: "In Topic 1.8, a sign chart showed where a rational function is positive or negative. The same tool tells you which way the outputs head beside a vertical asymptote.",
      transferQuestion:
        "What do you need to know about the sign of the function near an asymptote to decide between ∞ and −∞?",
      feedback:
        "Whether the function is positive or negative just to the left and just to the right of the asymptote.",
      links: [
        {
          topicId: "precalculus-1-8",
          sectionId: "sign-analysis",
          label: "Review sign analysis",
        },
      ],
    },
    {
      id: "precalculus-1-9-c2",
      topicId: "precalculus-1-9",
      type: "Looking ahead",
      title: "When a factor cancels",
      body: "If the same factor appears in the numerator and the denominator, the denominator's zero does not create an asymptote. Topic 1.10 shows what the graph does instead.",
      transferQuestion:
        "What would change in the test for an asymptote if the numerator were also zero at the same input?",
      feedback:
        "The condition p(a) ≠ 0 would fail, so the input is not a vertical asymptote.",
      links: [
        {
          topicId: "precalculus-1-10",
          sectionId: "hole-condition",
          label: "Preview holes",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-9"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-domain",
      "precalculus-1-6-without-bound",
      "precalculus-1-6-limit-notation",
      "precalculus-1-7-rational-function",
      "precalculus-1-7-asymptote",
      "precalculus-1-8-sign-chart",
      "precalculus-1-9-vertical-asymptote",
      "precalculus-1-9-one-sided-limit",
    ],
  },
};

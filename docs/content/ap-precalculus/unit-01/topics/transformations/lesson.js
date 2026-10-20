// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-1-12",
  courseId: "precalculus",
  unitId: "precalculus-1",
  order: 12,
  code: "1.12",
  title: "Transformations of Functions",
  period: "Unit 1",
  status: "ready",
  summary:
    "Additive and multiplicative transformations: translations, dilations, and reflections, combined transformations, and their effect on domain, range, and asymptotes.",
  minutes: 14,
  learningGoals: [
    "1.12.A Construct a function that is an additive and/or multiplicative transformation of another function.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "Adding a constant to the input or output of a function translates its graph, and multiplying the input or output by a constant dilates it, possibly with a reflection. Changes to the input act horizontally, and changes to the output act vertically.",
  context:
    "Each function type in AP Precalculus comes with a parent function. Transformations turn a parent function into a model that fits a context, which is why they appear in modeling questions throughout the course.",
  sections: [
    {
      id: "shifts",
      title: "1.12.A · Additive transformations translate the graph.",
      conceptTitle: "Translations",
      blocks: [
        {
          type: "paragraph",
          text: "The function g(x) = f(x) + k is an additive transformation of f that results in a vertical translation of the graph of f by k units. The function g(x) = f(x + h) is an additive transformation of f that results in a horizontal translation of the graph of f by −h units.",
        },
        {
          type: "paragraph",
          text: "So f(x − 3) is a horizontal translation by 3 units (to the right), and f(x + 3) is a horizontal translation by −3 units (to the left). For g(x) = f(x − 3), g(5) = f(2), so the point (2, f(2)) of f appears at x = 5 on g.",
        },
        {
          type: "table",
          caption: "Points of f(x) = x² and of g(x) = f(x − 3) + 2",
          columns: ["Point on the graph of f", "Corresponding point on the graph of g"],
          rows: [
            ["(−2, 4)", "(1, 6)"],
            ["(0, 0)", "(3, 2)"],
            ["(2, 4)", "(5, 6)"],
          ],
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "The graph of g(x) = f(x − 3) + 2 is the graph of f translated horizontally by 3 units and vertically by 2 units.",
        },
      ],
      takeaway:
        "f(x + h) translates horizontally by −h units. f(x) + k translates vertically by k units.",
    },
    {
      id: "dilations-reflections",
      title:
        "1.12.A · Multiplicative transformations dilate the graph and may reflect it.",
      conceptTitle: "Dilations and reflections",
      blocks: [
        {
          type: "paragraph",
          text: "The function g(x) = a·f(x), where a ≠ 0, is a multiplicative transformation of f that results in a vertical dilation of the graph of f by a factor of |a|. If a < 0, the transformation involves a reflection over the x-axis.",
        },
        {
          type: "paragraph",
          text: "The function g(x) = f(bx), where b ≠ 0, is a multiplicative transformation of f that results in a horizontal dilation of the graph of f by a factor of 1/|b|. If b < 0, the transformation involves a reflection over the y-axis.",
        },
        {
          type: "table",
          caption: "Points of f(x) = 4 − x², of −2·f(x), and of f(2x)",
          columns: [
            "Point on f",
            "On −2·f(x): vertical dilation by 2 and reflection over the x-axis",
            "On f(2x): horizontal dilation by 1/2",
          ],
          rows: [
            ["(−2, 0)", "(−2, 0)", "(−1, 0)"],
            ["(0, 4)", "(0, −8)", "(0, 4)"],
            ["(1, 3)", "(1, −6)", "(0.5, 3)"],
            ["(2, 0)", "(2, 0)", "(1, 0)"],
          ],
        },
      ],
      takeaway:
        "a·f(x) dilates vertically by |a|. f(bx) dilates horizontally by 1/|b|. A negative a or b adds a reflection.",
    },
    {
      id: "combining",
      title: "1.12.A · Additive and multiplicative transformations can be combined.",
      conceptTitle: "Combined transformations",
      blocks: [
        {
          type: "paragraph",
          text: "Additive and multiplicative transformations can be combined, resulting in combinations of horizontal and vertical translations and dilations. The set of points before the transformations is the preimage, and the set of points after the transformations is the image.",
        },
        {
          type: "paragraph",
          text: "Let f(x) = x² − 1, with zeros at x = −1 and x = 1, and let g(x) = 2f(x − 3). The graph of g is the graph of f translated horizontally by 3 units and dilated vertically by a factor of 2. The zeros move to x = 2 and x = 4, and the vertex (0, −1) moves to (3, −2).",
        },
        {
          type: "paragraph",
          text: "When transformations are given in words, build the rule one step at a time. A horizontal dilation by a factor of 2, then a vertical dilation by a factor of 3, then a vertical translation by 5 units gives g(x) = 3f(x/2) + 5. To evaluate g(4), find f(4/2) = f(2) first.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "g(x) = 3f(x/2) + 5, so g(4) = 3f(2) + 5. Show the input value given to f before applying the outside operations.",
        },
      ],
      takeaway:
        "Work from the inside out: find the input to f, then apply the dilation and translation of the output.",
    },
    {
      id: "domain-and-range",
      title:
        "1.12.A · A transformation can change the domain, the range, and the asymptotes.",
      conceptTitle: "Domain, range, and asymptotes",
      blocks: [
        {
          type: "paragraph",
          text: "The domain and range of a function that is a transformation of a parent function may be different from those of the parent function. Horizontal transformations move vertical asymptotes and change the domain. Vertical transformations move horizontal asymptotes and change the range.",
        },
        {
          type: "paragraph",
          text: "The parent function f(x) = 1/x has the vertical asymptote x = 0 and the horizontal asymptote y = 0. For g(x) = 1/(x − 2) + 3, the asymptotes are x = 2 and y = 3, the domain is all real numbers x ≠ 2, and the range is all real numbers y ≠ 3. The parent function x² has range y ≥ 0, while h(x) = −2x² + 3 has range y ≤ 3.",
        },
      ],
      takeaway:
        "Transform the asymptotes, the domain, and the range along with the points.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-1-12-translation",
      topicId: "precalculus-1-12",
      term: "Translation",
      definition:
        "A transformation that shifts every point of a graph the same distance horizontally or vertically. f(x) + k translates vertically by k units, and f(x + h) translates horizontally by −h units.",
    },
    {
      id: "precalculus-1-12-dilation",
      topicId: "precalculus-1-12",
      term: "Dilation",
      definition:
        "A transformation that stretches or compresses a graph. a·f(x) is a vertical dilation by a factor of |a|, and f(bx) is a horizontal dilation by a factor of 1/|b|.",
    },
    {
      id: "precalculus-1-12-reflection",
      topicId: "precalculus-1-12",
      term: "Reflection",
      definition:
        "A transformation that flips a graph over the x-axis, as in a·f(x) with a < 0, or over the y-axis, as in f(bx) with b < 0.",
    },
    {
      id: "precalculus-1-12-parent-function",
      topicId: "precalculus-1-12",
      term: "Parent function",
      definition:
        "A basic function of a function type, such as x², x³, or 1/x, from which other functions of that type are built by transformations.",
    },
  ],
  connections: [
    {
      id: "precalculus-1-12-c1",
      topicId: "precalculus-1-12",
      type: "Look back",
      title: "Forms that show transformations",
      body: "Topic 1.11 showed that each form of an expression reveals different information. A form such as a·f(x + h) + k reveals translations and dilations directly.",
      transferQuestion: "Why is (x − 3)² + 2 easier to graph than x² − 6x + 11?",
      feedback:
        "It shows the horizontal translation by 3 units and the vertical translation by 2 units.",
      links: [
        {
          topicId: "precalculus-1-11",
          sectionId: "choose-form",
          label: "Review choosing a form",
        },
      ],
    },
    {
      id: "precalculus-1-12-c2",
      topicId: "precalculus-1-12",
      type: "Looking ahead",
      title: "Transformations in models",
      body: "Topic 1.14 constructs models from a parent function by choosing transformations that match a context.",
      transferQuestion:
        "Which kind of transformation would move the starting point of a model?",
      feedback: "A translation.",
      links: [
        {
          topicId: "precalculus-1-13",
          sectionId: "choose-type",
          label: "Preview model selection",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-1-12"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-1-1-domain",
      "precalculus-1-1-range",
      "precalculus-1-7-horizontal-asymptote",
      "precalculus-1-9-vertical-asymptote",
      "precalculus-1-12-translation",
      "precalculus-1-12-dilation",
      "precalculus-1-12-reflection",
      "precalculus-1-12-parent-function",
    ],
  },
};

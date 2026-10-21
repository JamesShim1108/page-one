// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-7",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 7,
  code: "2.7",
  title: "Composition of Functions",
  period: "Unit 2",
  status: "ready",
  summary:
    "Evaluating f ∘ g from tables, graphs, and formulas, why composition is not commutative, the identity function, building f(g(x)) analytically, and decomposing a function into simpler functions.",
  minutes: 14,
  learningGoals: [
    "2.7.A Evaluate the composition of two or more functions for given values.",
    "2.7.B Construct a representation of the composition of two or more functions.",
    "2.7.C Rewrite a given function as a composition of two or more functions.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "In a composition, the output of one function becomes the input of the next. Reading from the inside out evaluates it, substituting builds it, and looking for the inner and outer steps takes it apart.",
  context:
    "Free-response Question 1 on the AP Exam regularly asks for values of a composite function from a table or a graph. Composition is also the language of inverse functions in Topic 2.8.",
  sections: [
    {
      id: "evaluate",
      title: "2.7.A · The outputs of g become the inputs of f.",
      conceptTitle: "Evaluating compositions",
      blocks: [
        {
          type: "paragraph",
          text: "If f and g are functions, the composite function f ∘ g maps a set of input values to a set of output values such that the output values of g are used as input values of f. For this reason, the domain of the composite function is restricted to those input values of g for which the corresponding output value is in the domain of f. (f ∘ g)(x) can also be represented as f(g(x)).",
        },
        {
          type: "paragraph",
          text: "Values for the composite function f ∘ g can be calculated or estimated from the graphical, numerical, analytical, or verbal representations of f and g by using output values from g as input values for f.",
        },
        {
          type: "table",
          caption: "Values of f and g",
          columns: ["x", "0", "1", "2", "3", "4"],
          rows: [
            ["f(x)", "3", "5", "−1", "4", "0"],
            ["g(x)", "2", "4", "0", "1", "3"],
          ],
        },
        {
          type: "paragraph",
          text: "To find f(g(1)), work from the inside out: g(1) = 4, then f(4) = 0, so f(g(1)) = 0. To find g(f(1)), first f(1) = 5, but 5 is not an input in the table for g, so g(f(1)) cannot be found from the table.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "f(g(3)) = f(1) = 5. Show the inner value g(3) = 1 before evaluating f.",
        },
      ],
      takeaway: "Inside first: find g(x), then use it as the input of f.",
    },
    {
      id: "order-and-identity",
      title:
        "2.7.A · Composition is not commutative; the identity function changes nothing.",
      conceptTitle: "Order and the identity function",
      blocks: [
        {
          type: "paragraph",
          text: "The composition of functions is not commutative; that is, f ∘ g and g ∘ f are typically different functions; therefore, f(g(x)) and g(f(x)) are typically different values.",
        },
        {
          type: "paragraph",
          text: "Example: with f(x) = x² and g(x) = 2x + 1, f(g(3)) = f(7) = 49 but g(f(3)) = g(9) = 19.",
        },
        {
          type: "paragraph",
          text: "If the function f(x) = x is composed with any function g, the resulting composite function is the same as g; that is, g(f(x)) = f(g(x)) = g(x). The function f(x) = x is called the identity function. When composing two functions, the identity function acts in the same way as 0, the additive identity, when adding two numbers and 1, the multiplicative identity, when multiplying two numbers.",
        },
      ],
      takeaway:
        "f(g(x)) and g(f(x)) usually differ; composing with x leaves a function unchanged.",
    },
    {
      id: "construct",
      title: "2.7.B · Build f(g(x)) by substituting g(x) for every x in f.",
      conceptTitle: "Constructing compositions",
      blocks: [
        {
          type: "paragraph",
          text: "Function composition is useful for relating two quantities that are not directly related by an existing formula.",
        },
        {
          type: "paragraph",
          text: "When analytic representations of the functions f and g are available, an analytic representation of f(g(x)) can be constructed by substituting g(x) for every instance of x in f.",
        },
        {
          type: "paragraph",
          text: "A numerical or graphical representation of f ∘ g can often be constructed by calculating or estimating values for (x, f(g(x))).",
        },
        {
          type: "paragraph",
          text: "Example: the radius of a ripple is r(t) = 3t centimeters after t seconds, and the area of a circle of radius r is A(r) = πr². Area and time are not related by a given formula, but the composition A(r(t)) = π(3t)² = 9πt² relates them.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "If f(x) = √(x + 4) and g(x) = x² − 3, then f(g(x)) = √((x² − 3) + 4) = √(x² + 1).",
        },
      ],
      takeaway:
        "Replace every x in the outer function with the whole inner function, in parentheses.",
    },
    {
      id: "decompose",
      title: "2.7.C · Decompose a function into simpler functions.",
      conceptTitle: "Decomposing functions",
      blocks: [
        {
          type: "paragraph",
          text: "Functions given analytically can often be decomposed into less complicated functions. When properly decomposed, the variable in one function should replace each instance of the function with which it was composed.",
        },
        {
          type: "paragraph",
          text: "An additive transformation of a function, f, that results in vertical and horizontal translations can be understood as the composition of g(x) = x + k with f. A multiplicative transformation of a function, f, that results in vertical and horizontal dilations can be understood as the composition of g(x) = kx with f.",
        },
        {
          type: "table",
          caption:
            "Decomposing h into an outer function f and an inner function g, so h(x) = f(g(x))",
          columns: ["h(x)", "Inner g(x)", "Outer f(x)"],
          rows: [
            ["(3x − 1)⁵", "3x − 1", "x⁵"],
            ["2^(x²)", "x²", "2ˣ"],
            ["1/(x + 4)", "x + 4", "1/x"],
            ["f(x − 2), a horizontal translation", "x − 2", "f(x)"],
            ["5f(x), a vertical dilation", "f(x)", "5x"],
          ],
        },
      ],
      takeaway: "Find the inner expression, name it, and see what is done to it.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-7-composite-function",
      topicId: "precalculus-2-7",
      term: "Composite function",
      definition:
        "If f and g are functions, the composite function f ∘ g maps a set of input values to a set of output values such that the output values of g are used as input values of f.",
      source: "CED 2.7.A.1",
    },
    {
      id: "precalculus-2-7-identity-function",
      topicId: "precalculus-2-7",
      term: "Identity function",
      definition:
        "If the function f(x) = x is composed with any function g, the resulting composite function is the same as g; that is, g(f(x)) = f(g(x)) = g(x). The function f(x) = x is called the identity function.",
      source: "CED 2.7.A.4",
    },
  ],
  connections: [
    {
      id: "precalculus-2-7-c1",
      topicId: "precalculus-2-7",
      type: "Look back",
      title: "Transformations as compositions",
      body: "Topic 1.12 wrote f(x + h) and af(x). Here those transformations become compositions with x + k and kx, which makes transformations a special case of composition.",
      transferQuestion: "Write g(x) = f(2x) as a composition of f with another function.",
      feedback: "g(x) = f(k(x)) with k(x) = 2x, a horizontal dilation.",
      links: [
        {
          topicId: "precalculus-2-4",
          sectionId: "power-property",
          label: "Review dilations of exponential functions",
        },
      ],
    },
    {
      id: "precalculus-2-7-c2",
      topicId: "precalculus-2-7",
      type: "Looking ahead",
      title: "Inverse functions",
      body: "Topic 2.8 defines the inverse function f⁻¹ by composition: f(f⁻¹(x)) = f⁻¹(f(x)) = x, the identity function.",
      transferQuestion: "If f(x) = x + 5, what function g makes f(g(x)) = x?",
      feedback: "g(x) = x − 5, which undoes adding 5.",
      links: [
        {
          topicId: "precalculus-2-8",
          sectionId: "inverse-by-composition",
          label: "See inverses and composition",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-7"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-2-7-composite-function",
      "precalculus-2-7-identity-function",
    ],
  },
};

// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-14",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 14,
  code: "2.14",
  title: "Logarithmic Function Context and Data Modeling",
  period: "Unit 2",
  status: "ready",
  summary:
    "When a logarithmic model fits, building one from a proportion and a zero or from two points, transformations and logarithmic regression, the natural logarithm in models, and using the model to predict and solve.",
  minutes: 14,
  learningGoals: ["2.14.A Construct a logarithmic function model."],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "A logarithmic model fits when equal steps in the output come from multiplying the input by the same factor. Its output counts how many times the input has been multiplied by that factor.",
  context:
    "Topic 2.5 modeled proportional growth in the outputs with exponential functions. Logarithmic functions model the reverse situation, where the inputs grow proportionally, as in sound levels, earthquake magnitudes, and pH.",
  sections: [
    {
      id: "log-models",
      title: "2.14.A · Logarithmic functions model proportional change in the inputs.",
      conceptTitle: "When a logarithmic model fits",
      blocks: [
        {
          type: "paragraph",
          text: "Logarithmic functions are inverses of exponential functions and can be used to model situations involving proportional growth, or repeated multiplication, where the input values change proportionally over equal-length output-value intervals. Alternately, if the output value is a whole number, it indicates how many times the initial value has been multiplied by the proportion.",
        },
        {
          type: "table",
          caption:
            "A loudness rating L for sound sources of intensity I (relative units)",
          columns: ["I", "1", "10", "100", "1,000", "10,000"],
          rows: [["L", "0", "10", "20", "30", "40"]],
        },
        {
          type: "paragraph",
          text: "Each time the intensity is multiplied by 10, the rating increases by 10. The inputs change proportionally over equal-length output intervals, so L(I) = 10 log I is a logarithmic model. L = 30 says the intensity 1 has been multiplied by 10 three times.",
        },
        {
          type: "paragraph",
          text: "The natural logarithm function is often useful in modeling real-world phenomena.",
        },
      ],
      takeaway:
        "Inputs multiply by a constant while outputs add a constant: logarithmic.",
    },
    {
      id: "building",
      title:
        "2.14.A · Build a model from a proportion and a zero, two points, transformations, or regression.",
      conceptTitle: "Constructing logarithmic models",
      blocks: [
        {
          type: "paragraph",
          text: "A logarithmic function model can be constructed from an appropriate proportion and a real zero or from two input-output pairs.",
        },
        {
          type: "paragraph",
          text: "Example: a model of the form y = a + b log₂ x passes through (2, 10) and (8, 16). Since log₂ 2 = 1 and log₂ 8 = 3, the system is a + b = 10 and a + 3b = 16. Subtracting gives 2b = 6, so b = 3 and a = 7. The model is y = 7 + 3 log₂ x.",
        },
        {
          type: "paragraph",
          text: "Logarithmic function models can be constructed by applying transformations to f(x) = a log_b x based on characteristics of a context or data set.",
        },
        {
          type: "paragraph",
          text: "Logarithmic function models can be constructed for a data set with technology using logarithmic regressions.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Using the given data, a + b log₂ 2 = 10 and a + b log₂ 8 = 16, so a + b = 10 and a + 3b = 16. Therefore b = 3 and a = 7.",
        },
      ],
      takeaway:
        "Two points give two linear equations in a and b once the logarithms are evaluated.",
    },
    {
      id: "using",
      title: "2.14.A · Use the model to predict outputs and to find inputs.",
      conceptTitle: "Applying logarithmic models",
      blocks: [
        {
          type: "paragraph",
          text: "Logarithmic function models can be used to predict values for the dependent variable, and they may be used to determine values of the independent variable.",
        },
        {
          type: "paragraph",
          text: "With y = 7 + 3 log₂ x, the prediction at x = 32 is 7 + 3(5) = 22. To find when y = 25, solve 3 log₂ x = 18, so log₂ x = 6 and x = 64.",
        },
        {
          type: "paragraph",
          text: "In chemistry, pH = −log [H⁺]. A solution with [H⁺] = 3.2 × 10⁻⁴ has pH = −log (3.2 × 10⁻⁴) ≈ 3.495.",
        },
      ],
      takeaway: "Predict by evaluating; find an input by exponentiating.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-14-log-model",
      topicId: "precalculus-2-14",
      term: "Logarithmic model",
      definition:
        "Logarithmic functions are inverses of exponential functions and can be used to model situations involving proportional growth, or repeated multiplication, where the input values change proportionally over equal-length output-value intervals.",
      source: "CED 2.14.A.1",
    },
  ],
  connections: [
    {
      id: "precalculus-2-14-c1",
      topicId: "precalculus-2-14",
      type: "Look back",
      title: "Logarithmic growth",
      body: "Topic 2.10 described logarithmic growth as outputs changing additively while inputs change multiplicatively. That is the pattern to look for in a data table before choosing a logarithmic model.",
      transferQuestion:
        "Inputs 3, 9, 27, 81 have outputs 5, 7, 9, 11. Is a logarithmic model reasonable?",
      feedback:
        "Yes. The inputs are multiplied by 3 while the outputs increase by 2 each time.",
      links: [
        {
          topicId: "precalculus-2-10",
          sectionId: "inverse-relationship",
          label: "Review logarithmic growth",
        },
      ],
    },
    {
      id: "precalculus-2-14-c2",
      topicId: "precalculus-2-14",
      type: "Looking ahead",
      title: "Semi-log plots",
      body: "Topic 2.15 plots the logarithm of the outputs instead of the outputs, so that exponential data appear linear and can be modeled with techniques for lines.",
      transferQuestion: "If y = 3(2)ˣ, what is log₂ y in terms of x?",
      feedback: "log₂ y = log₂ 3 + x, a linear function of x.",
      links: [
        {
          topicId: "precalculus-2-15",
          sectionId: "semi-log",
          label: "See semi-log plots",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-14"],
  definitionCoverage: {
    status: "required",
    conceptIds: ["precalculus-2-14-log-model"],
  },
};

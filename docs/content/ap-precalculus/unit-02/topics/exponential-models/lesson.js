// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-5",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 5,
  code: "2.5",
  title: "Exponential Function Context and Data Modeling",
  period: "Unit 2",
  status: "ready",
  summary:
    "Recognizing proportional growth in data, building an exponential model from a ratio and initial value or from two points, the natural base e, growth factors and percent change, and using equivalent forms to answer questions in context.",
  minutes: 14,
  learningGoals: [
    "2.5.A Construct a model for situations involving proportional output values over equal-length input-value intervals.",
    "2.5.B Apply exponential models to answer questions about a data set or contextual scenario.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "When a quantity changes by the same factor over each equal-length interval, an exponential model fits. Its base is that factor, and rewriting the model in an equivalent form can answer a different question about the same situation.",
  context:
    "Free-response Question 2 on the AP Exam often gives two data points from a context and asks you to build an exponential model by solving a system of equations, then interpret the model and its limitations.",
  sections: [
    {
      id: "proportional-growth",
      title: "2.5.A · Exponential functions model proportional growth patterns.",
      conceptTitle: "Proportional growth in data",
      blocks: [
        {
          type: "paragraph",
          text: "Exponential functions model growth patterns where successive output values over equal-length input-value intervals are proportional. When the input values are whole numbers, exponential functions model situations of repeated multiplication of a constant to an initial value.",
        },
        {
          type: "paragraph",
          text: "A constant may need to be added to the dependent variable values of a data set to reveal a proportional growth pattern.",
        },
        {
          type: "table",
          caption:
            "The temperature of a cooling drink, in degrees Fahrenheit, in a 70°F room",
          columns: ["Minutes", "0", "10", "20", "30"],
          rows: [
            ["Temperature T", "190", "130", "100", "85"],
            ["T − 70", "120", "60", "30", "15"],
          ],
        },
        {
          type: "paragraph",
          text: "The temperatures themselves are not proportional: 130/190 ≠ 100/130. After subtracting the room temperature, the values 120, 60, 30, 15 have a constant ratio of 1/2 every 10 minutes, so T(t) = 120(1/2)^(t/10) + 70 models the data.",
        },
      ],
      takeaway: "Look for a constant ratio, after subtracting a constant if needed.",
    },
    {
      id: "building-models",
      title:
        "2.5.A · Build an exponential model from a ratio and initial value, or from two points.",
      conceptTitle: "Constructing exponential models",
      blocks: [
        {
          type: "paragraph",
          text: "An exponential function model can be constructed from an appropriate ratio and initial value or from two input-output pairs. The initial value and the base can be found by solving a system of equations resulting from the two input-output pairs.",
        },
        {
          type: "paragraph",
          text: "Example: a population is 500 when t = 2 years and 720 when t = 4 years. Using P(t) = abᵗ, the system is ab² = 500 and ab⁴ = 720. Dividing gives b² = 1.44, so b = 1.2, and then a = 500/1.44 ≈ 347.222. The model is P(t) ≈ 347.222(1.2)ᵗ.",
        },
        {
          type: "paragraph",
          text: "Exponential function models can be constructed by applying transformations to f(x) = abˣ based on characteristics of a contextual scenario or data set. Exponential function models can be constructed for a data set with technology using exponential regressions.",
        },
        {
          type: "paragraph",
          text: "The natural base e, which is approximately 2.718, is often used as the base in exponential functions that model contextual scenarios.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "Using the given data, ab² = 500 and ab⁴ = 720. Then (ab⁴)/(ab²) = b² = 720/500 = 1.44, so b = 1.2 and a = 500/1.2² ≈ 347.222.",
        },
      ],
      takeaway: "Two input-output pairs give two equations; divide them to eliminate a.",
    },
    {
      id: "using-models",
      title: "2.5.B · Growth factors, percent change, and equivalent forms.",
      conceptTitle: "Applying exponential models",
      blocks: [
        {
          type: "paragraph",
          text: "For an exponential model in general form f(x) = abˣ, the base of the exponent, b, can be understood as a growth factor in successive unit changes in the input values and is related to a percent change in context.",
        },
        {
          type: "paragraph",
          text: "A savings balance modeled by B(t) = 1200(1.03)ᵗ, with t in years, has growth factor 1.03: it increases by 3% per year. A value modeled by V(t) = 18000(0.85)ᵗ has growth factor 0.85: it decreases by 15% per year.",
        },
        {
          type: "paragraph",
          text: "Equivalent forms of an exponential function can reveal different properties of the function. For example, if d represents number of days, then the base of f(d) = 2ᵈ indicates that the quantity increases by a factor of 2 every day, but the equivalent form f(d) = (2⁷)^(d/7) indicates that the quantity increases by a factor of 2⁷ every week.",
        },
        {
          type: "paragraph",
          text: "Exponential models can be used to predict values for the dependent variable, depending on the contextual constraints on the domain, and may be used to determine values of the independent variable.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "B(10) = 1200(1.03)¹⁰ ≈ 1612.700. According to the model, the balance after 10 years is about $1612.70. The balance reaches $2400 when 1200(1.03)ᵗ = 2400, at t ≈ 23.450 years.",
        },
      ],
      takeaway:
        "b = 1 + r for growth and 1 − r for decay; rewrite the exponent to change the time unit.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-5-growth-factor",
      topicId: "precalculus-2-5",
      term: "Growth factor",
      definition:
        "For an exponential model in general form f(x) = abˣ, the base of the exponent, b, can be understood as a growth factor in successive unit changes in the input values and is related to a percent change in context.",
      source: "CED 2.5.B.1",
    },
    {
      id: "precalculus-2-5-natural-base",
      topicId: "precalculus-2-5",
      term: "Natural base e",
      definition:
        "The natural base e, which is approximately 2.718, is often used as the base in exponential functions that model contextual scenarios.",
      source: "CED 2.5.A.6",
    },
  ],
  connections: [
    {
      id: "precalculus-2-5-c1",
      topicId: "precalculus-2-5",
      type: "Look back",
      title: "Additive transformations",
      body: "Topic 2.3 noted that a function can be modeled by an additive transformation of an exponential function when subtracting a constant makes its outputs proportional. The cooling drink is that idea in context.",
      transferQuestion:
        "Values 13, 7, 4, 2.5 are not proportional. What constant, subtracted from each, makes them proportional?",
      feedback: "Subtract 1: 12, 6, 3, 1.5 have a constant ratio of 1/2.",
      links: [
        {
          topicId: "precalculus-2-3",
          sectionId: "monotonic-and-concavity",
          label: "Review additive transformations",
        },
      ],
    },
    {
      id: "precalculus-2-5-c2",
      topicId: "precalculus-2-5",
      type: "Looking ahead",
      title: "Choosing between models",
      body: "Topic 2.6 compares linear, quadratic, and exponential models for the same data set and uses residuals to decide which model is appropriate.",
      transferQuestion:
        "If a data set's outputs change by roughly the same amount each interval, which model would you try first?",
      feedback:
        "A linear model, because roughly constant differences mean a roughly constant rate of change.",
      links: [
        {
          topicId: "precalculus-2-6",
          sectionId: "residuals",
          label: "See residuals",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-5"],
  definitionCoverage: {
    status: "required",
    conceptIds: ["precalculus-2-5-growth-factor", "precalculus-2-5-natural-base"],
  },
};

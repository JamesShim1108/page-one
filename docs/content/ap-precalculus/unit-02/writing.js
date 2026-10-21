// Unit 2 free-response practice in the AP Precalculus FRQ formats.
// Original questions: two for Topics 2.1 to 2.8 and two for Topics 2.9 to 2.15,
// mirroring how the CED splits Unit 2. Every number was computed and checked in code.

export const writingQuizzes = [
  {
    id: "precalculus-2-frq-1",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-2",
    title: "Unit 2 FRQ 1: Function concepts (Topics 2.1 to 2.8)",
    headline:
      "Composition and inverse values, a zero and end behavior of an exponential function, and choosing a function type from a table.",
    promptTitle: "Free response 1 · Function concepts · graphing calculator",
    prompt:
      "The function f is given by f(x) = 3(2)ˣ − 12. The table gives values of a function g at selected values of x.",
    instructions:
      "Part A style: a graphing calculator is required. Show the work that leads to each answer; answers without supporting work may not earn credit where work is requested. Avoid rounding intermediate values, and give decimal approximations accurate to three places after the decimal point unless the part says otherwise. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: [
      "ced",
      "ced-topic-2-2",
      "ced-topic-2-3",
      "ced-topic-2-7",
      "ced-topic-2-8",
    ],
    stimulusBlocks: [
      {
        type: "table",
        caption: "Values of g",
        columns: ["x", "0", "4", "8", "12", "16"],
        rows: [["g(x)", "9", "5", "1", "−3", "−7"]],
      },
    ],
    scaffold: [
      {
        label: "Show work",
        text: "Write the setup, such as the expression you evaluate or the equation you solve, before the answer.",
      },
      {
        label: "Use notation",
        text: "Use limit notation, interval notation, and units exactly where a part asks for them.",
      },
      {
        label: "Justify",
        text: "When a part says give a reason or explain, refer to the given values or the context.",
      },
    ],
    responseFields: [
      {
        id: "a1",
        label: "Part A (i)",
        prompt:
          "A (i). Find the value of g(f(3)) as an exact value. Show the work that leads to your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-7",
            sectionId: "evaluate",
            label: "Evaluating compositions",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt:
          "A (ii). The function f is invertible. Find the value of f⁻¹(36). Show the work that leads to your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-8",
            sectionId: "invertible",
            label: "Inverse input-output pairs",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt: "B (i). Find all real zeros of f.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-13",
            sectionId: "solving",
            label: "Solving exponential equations",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt:
          "B (ii). Determine the end behavior of f as x decreases without bound. Express your answer using the mathematical notation of a limit.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-3",
            sectionId: "end-behavior",
            label: "End behavior of exponential functions",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). Based on the table, determine which of the following function types best models g: linear, quadratic, or exponential.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-2",
            sectionId: "linear-vs-exponential",
            label: "Linear versus exponential",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). Give a reason for your answer to part C (i) based on the relationship between the change in the output values of g and the change in the input values of g. Refer to the values in the table in your reasoning.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-2",
            sectionId: "linear-vs-exponential",
            label: "Constant rate versus proportional change",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-comp",
        field: "a1",
        label: "A (i) Composite value",
        points: 1,
        guidance:
          "Earn the point for g(f(3)) = g(12) = −3, with f(3) = 3(8) − 12 = 12 shown.",
      },
      {
        id: "a2-inverse",
        field: "a2",
        label: "A (ii) Inverse value",
        points: 1,
        guidance:
          "Earn the point for f⁻¹(36) = 4, with work such as 3(2)ˣ − 12 = 36, 2ˣ = 16, x = 4, or the reasoning that f(4) = 36.",
      },
      {
        id: "b1-zero",
        field: "b1",
        label: "B (i) Real zero",
        points: 1,
        guidance: "Earn the point for x = 2, from 3(2)ˣ = 12 and 2ˣ = 4.",
      },
      {
        id: "b2-end",
        field: "b2",
        label: "B (ii) End behavior with limit notation",
        points: 1,
        guidance:
          "Earn the point for lim x→−∞ f(x) = −12. A description without limit notation does not earn the point.",
      },
      {
        id: "c1-type",
        field: "c1",
        label: "C (i) Function type",
        points: 1,
        guidance: "Earn the point for: g is best modeled by a linear function.",
      },
      {
        id: "c2-reason",
        field: "c2",
        label: "C (ii) Reason",
        points: 1,
        guidance:
          "Earn the point for: over consecutive equal-length input-value intervals of length 4, the output values of g change by a constant −4, so g changes at a constant rate.",
      },
    ],
    modelResponse:
      "A (i). f(3) = 3(2)³ − 12 = 24 − 12 = 12. Then g(f(3)) = g(12) = −3.\n\nA (ii). f(x) = 36 gives 3(2)ˣ − 12 = 36, so 3(2)ˣ = 48, 2ˣ = 16, and x = 4. Since f(4) = 36, f⁻¹(36) = 4.\n\nB (i). f(x) = 0 gives 3(2)ˣ = 12, so 2ˣ = 4 and x = 2. The only real zero of f is x = 2.\n\nB (ii). As x decreases without bound, 2ˣ gets arbitrarily close to 0, so 3(2)ˣ − 12 gets arbitrarily close to −12: lim x→−∞ f(x) = −12.\n\nC (i). g is best modeled by a linear function.\n\nC (ii). The input values increase by 4 each time, and the output values change by 5 − 9 = −4, 1 − 5 = −4, −3 − 1 = −4, and −7 − (−3) = −4. Because the output values change by a constant amount over consecutive equal-length input-value intervals, g changes at a constant rate, which is the behavior of a linear function.",
    alternateModel:
      "In A (ii) it is enough to observe from f(4) = 3(16) − 12 = 36 that f⁻¹(36) = 4. In C (ii) you may also note that the ratios 5/9, 1/5, −3/1 are not constant, which rules out an exponential model.",
    commonErrors: [
      "Computing f(g(3)), the composition in the other order.",
      "Giving f⁻¹(36) as 1/f(36) or as f(36).",
      "Writing lim x→−∞ f(x) = 0, forgetting the −12 translation.",
      "Choosing exponential because the outputs decrease.",
      "Giving differences without saying the input intervals have equal length.",
    ],
  },
  {
    id: "precalculus-2-frq-2",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-2",
    title: "Unit 2 FRQ 2: Modeling a non-periodic context (Topics 2.1 to 2.8)",
    headline:
      "Build an exponential model from two data points, use average rates of change, and explain a limitation of the model.",
    promptTitle:
      "Free response 2 · Modeling a non-periodic context · graphing calculator",
    prompt:
      "A study app launched in a school district. The number of students using the app t months after launch is modeled by U(t) = abᵗ, where a and b are positive constants. One month after launch, 1200 students were using the app, and three months after launch, 2700 students were using the app.",
    instructions:
      "Part A style: a graphing calculator is required. Show the work that leads to each answer; answers without supporting work may not earn credit where work is requested. Avoid rounding intermediate values, and give decimal approximations accurate to three places after the decimal point unless the part says otherwise. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: ["ced", "ced-topic-2-3", "ced-topic-2-5", "ced-topic-2-6"],
    scaffold: [
      {
        label: "Show work",
        text: "Write the setup, such as the expression you evaluate or the equation you solve, before the answer.",
      },
      {
        label: "Use notation",
        text: "Use limit notation, interval notation, and units exactly where a part asks for them.",
      },
      {
        label: "Justify",
        text: "When a part says give a reason or explain, refer to the given values or the context.",
      },
    ],
    responseFields: [
      {
        id: "a1",
        label: "Part A (i)",
        prompt:
          "A (i). Use the given data to write two equations that can be used to find the values for constants a and b in the expression for U(t).",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-5",
            sectionId: "building-models",
            label: "Exponential models from two points",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt: "A (ii). Find the values for a and b as decimal approximations.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-5",
            sectionId: "building-models",
            label: "Solving for a and b",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). Use the given data to find the average rate of change of the number of students using the app, in students per month, from t = 1 to t = 3 months. Show the computations that lead to your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-2",
            sectionId: "average-rate",
            label: "Average rate of change",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt:
          "B (ii). Using the model, compare the average rates of change of U over the intervals 1 ≤ t ≤ 2 and 2 ≤ t ≤ 3. Is the number of students increasing at an increasing rate or at a decreasing rate? Give a reason for your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-3",
            sectionId: "monotonic-and-concavity",
            label: "Concavity of exponential functions",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). Use the model to find the value of t, in months, at which 10,000 students are using the app. Express your answer as a decimal approximation.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-5",
            sectionId: "using-models",
            label: "Applying exponential models",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). The school district has 15,000 students. Explain why the model U is not appropriate for predicting the number of users 12 months after launch. Refer to the model and to the context in your explanation.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-5",
            sectionId: "using-models",
            label: "Contextual constraints on the domain",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-eqs",
        field: "a1",
        label: "A (i) Two equations",
        points: 1,
        guidance: "Earn the point for ab = 1200 and ab³ = 2700.",
      },
      {
        id: "a2-vals",
        field: "a2",
        label: "A (ii) Values of a and b",
        points: 1,
        guidance: "Earn the point for b = 1.5 and a = 800 (b² = 2700/1200 = 2.25).",
      },
      {
        id: "b1-aroc",
        field: "b1",
        label: "B (i) Average rate of change",
        points: 1,
        guidance:
          "Earn the point for (2700 − 1200)/(3 − 1) = 750 students per month, with the computation shown.",
      },
      {
        id: "b2-rate",
        field: "b2",
        label: "B (ii) Increasing at an increasing rate, with reason",
        points: 1,
        guidance:
          "Earn the point for: U(2) = 1800, so the average rates of change are 600 students per month on [1, 2] and 900 students per month on [2, 3]; they are positive and increasing, so the number of students is increasing at an increasing rate.",
      },
      {
        id: "c1-solve",
        field: "c1",
        label: "C (i) Value of t",
        points: 1,
        guidance: "Earn the point for 800(1.5)ᵗ = 10000 with t = 6.229 months.",
      },
      {
        id: "c2-limit",
        field: "c2",
        label: "C (ii) Limitation",
        points: 1,
        guidance:
          "Earn the point for explaining that U(12) = 800(1.5)¹² ≈ 103,797, which is far more than the 15,000 students in the district, because an exponential model increases without bound while the number of users cannot exceed 15,000.",
      },
    ],
    modelResponse:
      "A (i). U(1) = 1200 and U(3) = 2700 give ab = 1200 and ab³ = 2700.\n\nA (ii). Dividing, ab³/(ab) = b² = 2700/1200 = 2.25, so b = 1.5 (b > 0). Then a = 1200/1.5 = 800. U(t) = 800(1.5)ᵗ.\n\nB (i). (U(3) − U(1))/(3 − 1) = (2700 − 1200)/2 = 750. The average rate of change is 750 students per month.\n\nB (ii). U(2) = 800(1.5)² = 1800. Over [1, 2] the average rate of change is (1800 − 1200)/1 = 600 students per month, and over [2, 3] it is (2700 − 1800)/1 = 900 students per month. Both are positive and the second is greater, so the number of students is increasing at an increasing rate.\n\nC (i). 800(1.5)ᵗ = 10000, so (1.5)ᵗ = 12.5. Using a graphing calculator, t = 6.229 months.\n\nC (ii). The model gives U(12) = 800(1.5)¹² ≈ 103,797 students. An exponential model with b > 1 increases without bound, but the number of users cannot be more than the 15,000 students in the district. So U is not appropriate for t = 12.",
    alternateModel:
      "In A (ii) a graphing calculator may be used to solve the system. In C (ii) it is also correct to find when the model reaches 15,000, at t ≈ 7.229 months, and explain that predictions after that time exceed the district's population.",
    commonErrors: [
      "Writing a + b = 1200, a linear relationship, instead of ab = 1200.",
      "Using b² = 2.25 as the value of b.",
      "Reporting 1500 students, the change, instead of dividing by 2 months.",
      "Saying 'increasing' without comparing two average rates of change.",
      "Saying the model fails 'because it is a model' without referring to the 15,000-student limit.",
    ],
  },
  {
    id: "precalculus-2-frq-3",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-2",
    title: "Unit 2 FRQ 3: Symbolic manipulations (Topics 2.9 to 2.15)",
    headline:
      "Rewrite logarithmic and exponential expressions, solve exponential and logarithmic equations exactly, and find an inverse.",
    promptTitle: "Free response 3 · Symbolic manipulations · no calculator",
    prompt:
      "This question has three parts that each give different functions. Work each part without a calculator.",
    instructions:
      "Part B style: no calculator is allowed. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number. Solutions to equations must be real numbers. Determine the exact value of any expression that can be obtained without a calculator, such as log₂ 8. Unless otherwise specified, combine terms using algebraic methods and rules for exponents and logarithms. Show the work that leads to your answers.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: ["ced", "ced-topic-2-4", "ced-topic-2-12", "ced-topic-2-13"],
    stimulusBlocks: [
      {
        type: "list",
        items: [
          "Part A: g(x) = 2 log₃ x − log₃ (9x) and h(x) = 4^(x + 1)·2^(−x).",
          "Part B: j(x) = e^(2x) − 5eˣ + 6 and k(x) = log₂ (x + 2) + log₂ (x − 1).",
          "Part C: m(x) = 3(5)^(x − 2) + 1.",
        ],
      },
    ],
    scaffold: [
      {
        label: "Show work",
        text: "Write the setup, such as the expression you evaluate or the equation you solve, before the answer.",
      },
      {
        label: "Use notation",
        text: "Use limit notation, interval notation, and units exactly where a part asks for them.",
      },
      {
        label: "Justify",
        text: "When a part says give a reason or explain, refer to the given values or the context.",
      },
    ],
    responseFields: [
      {
        id: "a1",
        label: "Part A (i)",
        prompt:
          "A (i). Rewrite g(x) as a single logarithm base 3 without negative exponents in any part of the expression. Your result should be of the form log₃ (expression).",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-12",
            sectionId: "power-property",
            label: "Combining logarithms",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt: "A (ii). Rewrite h(x) in the form a·bˣ, where a and b are constants.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-4",
            sectionId: "product-property",
            label: "Properties of exponents",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt: "B (i). Solve j(x) = 0 for values of x in the domain of j.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-13",
            sectionId: "solving",
            label: "Solving exponential equations",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt: "B (ii). Solve k(x) = 2 for values of x in the domain of k.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-13",
            sectionId: "extraneous",
            label: "Extraneous solutions",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt: "C (i). Find an expression for m⁻¹(x), the inverse function of m.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-13",
            sectionId: "inverses",
            label: "Inverses of transformed functions",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt: "C (ii). What is the domain of m⁻¹? Give a reason for your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-8",
            sectionId: "inverse-by-composition",
            label: "Domain and range of an inverse",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-log",
        field: "a1",
        label: "A (i) Single logarithm",
        points: 1,
        guidance:
          "Earn the point for g(x) = log₃ (x/9), for x > 0, with work such as log₃ x² − log₃ (9x) = log₃ (x²/(9x)).",
      },
      {
        id: "a2-exp",
        field: "a2",
        label: "A (ii) Form a·bˣ",
        points: 1,
        guidance:
          "Earn the point for h(x) = 4·2ˣ, with work such as 4^(x + 1) = 4·4ˣ = 4·2^(2x), then 4·2^(2x)·2^(−x) = 4·2ˣ.",
      },
      {
        id: "b1-solve",
        field: "b1",
        label: "B (i) Solutions of j(x) = 0",
        points: 1,
        guidance: "Earn the point for x = ln 2 and x = ln 3, from (eˣ − 2)(eˣ − 3) = 0.",
      },
      {
        id: "b2-solve",
        field: "b2",
        label: "B (ii) Solution of k(x) = 2",
        points: 1,
        guidance:
          "Earn the point for x = 2 only, with x = −3 rejected because it is not in the domain of k.",
      },
      {
        id: "c1-inverse",
        field: "c1",
        label: "C (i) Inverse expression",
        points: 1,
        guidance:
          "Earn the point for m⁻¹(x) = log₅ ((x − 1)/3) + 2, or an equivalent expression.",
      },
      {
        id: "c2-domain",
        field: "c2",
        label: "C (ii) Domain with reason",
        points: 1,
        guidance:
          "Earn the point for x > 1, with the reason that the range of m is y > 1 (because 3(5)^(x − 2) > 0), and the domain of m⁻¹ is the range of m.",
      },
    ],
    modelResponse:
      "A (i). g(x) = 2 log₃ x − log₃ (9x) = log₃ x² − log₃ (9x) = log₃ (x²/(9x)) = log₃ (x/9), for x > 0.\n\nA (ii). h(x) = 4^(x + 1)·2^(−x) = 4·4ˣ·2^(−x) = 4·(2²)ˣ·2^(−x) = 4·2^(2x)·2^(−x) = 4·2ˣ.\n\nB (i). Let u = eˣ. Then u² − 5u + 6 = 0, so (u − 2)(u − 3) = 0. eˣ = 2 or eˣ = 3, so x = ln 2 or x = ln 3.\n\nB (ii). log₂ ((x + 2)(x − 1)) = 2, so (x + 2)(x − 1) = 4. Then x² + x − 2 = 4, x² + x − 6 = 0, and (x + 3)(x − 2) = 0. x = −3 is not in the domain of k because x − 1 = −4 < 0. So x = 2.\n\nC (i). y = 3(5)^(x − 2) + 1. Reverse x and y: x = 3(5)^(y − 2) + 1. Then (x − 1)/3 = 5^(y − 2), so y − 2 = log₅ ((x − 1)/3) and m⁻¹(x) = log₅ ((x − 1)/3) + 2.\n\nC (ii). Because 3(5)^(x − 2) > 0 for every x, the range of m is y > 1. The domain of m⁻¹ is the range of m, so the domain of m⁻¹ is x > 1. This also matches the requirement (x − 1)/3 > 0 for the logarithm.",
    alternateModel:
      "In A (i) you may first write 2 log₃ x − (log₃ 9 + log₃ x) = log₃ x − 2 and then rewrite −2 as −log₃ 9 to get log₃ (x/9). In C (i), m⁻¹(x) = log₅ (x − 1) − log₅ 3 + 2 is an equivalent expression.",
    commonErrors: [
      "Writing log₃ (2x − 9x) by combining coefficients inside the logarithm.",
      "Writing 4^(x + 1)·2^(−x) = 8^(1) or another product of bases.",
      "Taking ln of each term of e^(2x) − 5eˣ + 6 separately.",
      "Keeping x = −3 in B (ii).",
      "Subtracting 2 instead of adding 2 when undoing the exponent x − 2.",
    ],
  },
  {
    id: "precalculus-2-frq-4",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-2",
    title: "Unit 2 FRQ 4: Modeling a non-periodic context (Topics 2.9 to 2.15)",
    headline:
      "Build a logarithmic model from two data points, interpret an average rate of change, and judge a long-range prediction.",
    promptTitle:
      "Free response 4 · Modeling a non-periodic context · graphing calculator",
    prompt:
      "A greenhouse records the height of a seedling, in centimeters, t days after it sprouts. The height is modeled by H(t) = a + b log₂ t for t ≥ 1, where a and b are constants. On day 2 the seedling is 9 centimeters tall, and on day 16 it is 21 centimeters tall.",
    instructions:
      "Part A style: a graphing calculator is required. Show the work that leads to each answer; answers without supporting work may not earn credit where work is requested. Avoid rounding intermediate values, and give decimal approximations accurate to three places after the decimal point unless the part says otherwise. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: ["ced", "ced-topic-2-9", "ced-topic-2-14"],
    scaffold: [
      {
        label: "Show work",
        text: "Write the setup, such as the expression you evaluate or the equation you solve, before the answer.",
      },
      {
        label: "Use notation",
        text: "Use limit notation, interval notation, and units exactly where a part asks for them.",
      },
      {
        label: "Justify",
        text: "When a part says give a reason or explain, refer to the given values or the context.",
      },
    ],
    responseFields: [
      {
        id: "a1",
        label: "Part A (i)",
        prompt:
          "A (i). Use the given data to write two equations that can be used to find the values for constants a and b in the expression for H(t).",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-14",
            sectionId: "building",
            label: "Logarithmic models from two points",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt: "A (ii). Find the values for a and b.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-14",
            sectionId: "building",
            label: "Solving for a and b",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). Use the given data to find the average rate of change of the height of the seedling, in centimeters per day, from t = 2 to t = 16 days. Express your answer as a decimal approximation. Show the computations that lead to your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-2",
            sectionId: "average-rate",
            label: "Average rate of change",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt:
          "B (ii). Interpret the meaning of your answer from part B (i) in the context of the problem.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-2",
            sectionId: "average-rate",
            label: "Interpreting a rate",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). Use the model to find the value of t, in days, at which the seedling is 30 centimeters tall. Express your answer as a decimal approximation.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-14",
            sectionId: "using",
            label: "Applying logarithmic models",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). The plant species never grows taller than 35 centimeters. Is the model H appropriate for predicting the height of the plant one year (365 days) after it sprouts? Give a reason for your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-2-11",
            sectionId: "domain-range",
            label: "Unbounded end behavior",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-eqs",
        field: "a1",
        label: "A (i) Two equations",
        points: 1,
        guidance:
          "Earn the point for a + b log₂ 2 = 9 and a + b log₂ 16 = 21, or the equivalent a + b = 9 and a + 4b = 21.",
      },
      {
        id: "a2-vals",
        field: "a2",
        label: "A (ii) Values of a and b",
        points: 1,
        guidance: "Earn the point for a = 5 and b = 4.",
      },
      {
        id: "b1-aroc",
        field: "b1",
        label: "B (i) Average rate of change",
        points: 1,
        guidance:
          "Earn the point for (21 − 9)/(16 − 2) = 12/14 ≈ 0.857 centimeters per day, with the computation shown.",
      },
      {
        id: "b2-interp",
        field: "b2",
        label: "B (ii) Interpretation",
        points: 1,
        guidance:
          "Earn the point for: from day 2 to day 16, on average, the height of the seedling increased at a rate of about 0.857 centimeter per day. The interval, 'on average', and units are needed.",
      },
      {
        id: "c1-solve",
        field: "c1",
        label: "C (i) Value of t",
        points: 1,
        guidance: "Earn the point for 5 + 4 log₂ t = 30 with t = 2^(25/4) ≈ 76.109 days.",
      },
      {
        id: "c2-reason",
        field: "c2",
        label: "C (ii) Reason",
        points: 1,
        guidance:
          "Earn the point for: no, because H(365) ≈ 39.047 centimeters, which is greater than 35, since a logarithmic model increases without bound while the plant's height is limited to 35 centimeters.",
      },
    ],
    modelResponse:
      "A (i). H(2) = 9 and H(16) = 21 give a + b log₂ 2 = 9 and a + b log₂ 16 = 21, that is, a + b = 9 and a + 4b = 21.\n\nA (ii). Subtracting, 3b = 12, so b = 4 and a = 5. H(t) = 5 + 4 log₂ t.\n\nB (i). (H(16) − H(2))/(16 − 2) = (21 − 9)/14 = 12/14 ≈ 0.857. The average rate of change is about 0.857 centimeters per day.\n\nB (ii). From day 2 to day 16, on average, the height of the seedling increased at a rate of about 0.857 centimeter per day.\n\nC (i). 5 + 4 log₂ t = 30, so log₂ t = 25/4 and t = 2^(25/4) ≈ 76.109 days.\n\nC (ii). No. The model gives H(365) = 5 + 4 log₂ 365 ≈ 39.047 centimeters. A logarithmic model increases without bound, but the plant never grows taller than 35 centimeters, so the model overestimates the height for large t and is not appropriate at t = 365.",
    alternateModel:
      "In C (ii) it is also correct to find when the model reaches 35 centimeters, at t = 2^7.5 ≈ 181.019 days, and explain that predictions after that day exceed the plant's maximum height.",
    commonErrors: [
      "Using log₂ 16 = 8 or log₂ 2 = 2.",
      "Writing a·b log₂ t or solving for b as 12.",
      "Giving 12 centimeters, the change, instead of dividing by 14 days.",
      "Solving log₂ t = 25/4 as t = 25/8.",
      "Claiming the model is appropriate because logarithmic functions grow slowly, without comparing H(365) to 35.",
    ],
  },
];

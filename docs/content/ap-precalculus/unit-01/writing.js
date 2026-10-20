// Unit 1 free-response practice in the AP Precalculus FRQ format.
// Original questions: two for Topics 1.1 to 1.6 and two for Topics 1.7 to 1.14,
// mirroring how the CED splits Unit 1. Every number was computed and checked in code.

export const writingQuizzes = [
  {
    id: "precalculus-1-frq-1",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-1",
    title: "Unit 1 FRQ 1: Function concepts (Topics 1.1 to 1.6)",
    headline:
      "Zeros, extrema, end behavior, symmetry, and choosing a model from a table.",
    promptTitle: "Free response 1 · Function concepts · graphing calculator",
    prompt:
      "Let f be an increasing function defined for x ≥ 1. The table gives values of f(x) at selected values of x. The function g is given by g(x) = −x⁴ + 5x² − 4.",
    instructions:
      "Part A style: a graphing calculator is required. Show the work that leads to each answer; answers without supporting work may not earn credit where work is requested. Avoid rounding intermediate values, and give decimal approximations accurate to three places after the decimal point unless the part says otherwise. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: ["ced", "ced-topic-1-4", "ced-topic-1-5", "ced-topic-1-6"],
    stimulusBlocks: [
      {
        type: "table",
        caption: "Values of f",
        columns: ["x", "1", "2", "3", "4", "5"],
        rows: [["f(x)", "2", "3", "12", "35", "78"]],
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
          "A (i). Find all real zeros of g. Show the work that leads to your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-5",
            sectionId: "zeros-and-factors",
            label: "Zeros and linear factors",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt:
          "A (ii). Find the relative maximum value of g on the interval 0 < x < 3, and the value of x at which it occurs. Express both as decimal approximations.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-4",
            sectionId: "extrema",
            label: "Relative and absolute extrema",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). Determine the end behavior of g as x increases without bound. Express your answer using the mathematical notation of a limit.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-6",
            sectionId: "four-cases",
            label: "End behavior from the leading term",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt:
          "B (ii). Determine whether g is even, odd, or neither. Give a reason for your answer based on the definition of an even or odd function.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-5",
            sectionId: "even-and-odd",
            label: "Even and odd functions",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). Based on the table, determine which of the following function types best models f: linear, quadratic, or cubic.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-5",
            sectionId: "degree-from-differences",
            label: "Degree from successive differences",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). Give a reason for your answer to part C (i) based on the relationship between the change in the output values of f and the change in the input values of f. Refer to the values in the table in your reasoning.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-13",
            sectionId: "differences-and-degree",
            label: "Successive differences and degree",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-zeros",
        field: "a1",
        label: "A (i) Real zeros",
        points: 1,
        guidance:
          "Earn the point for x = −2, −1, 1, and 2, with supporting work such as g(x) = −(x² − 1)(x² − 4) = −(x − 1)(x + 1)(x − 2)(x + 2).",
      },
      {
        id: "a2-max",
        field: "a2",
        label: "A (ii) Relative maximum",
        points: 1,
        guidance:
          "Earn the point for a relative maximum value of 2.250 (or 2.25) at x = 1.581, found with technology or by analysis.",
      },
      {
        id: "b1-end",
        field: "b1",
        label: "B (i) End behavior with limit notation",
        points: 1,
        guidance:
          "Earn the point for lim x→∞ g(x) = −∞. A verbal description alone, without limit notation, does not earn the point.",
      },
      {
        id: "b2-even",
        field: "b2",
        label: "B (ii) Even, with reason",
        points: 1,
        guidance:
          "Earn the point for stating that g is even because g(−x) = −(−x)⁴ + 5(−x)² − 4 = −x⁴ + 5x² − 4 = g(x) for all x.",
      },
      {
        id: "c1-type",
        field: "c1",
        label: "C (i) Function type",
        points: 1,
        guidance: "Earn the point for: f is best modeled by a cubic function.",
      },
      {
        id: "c2-reason",
        field: "c2",
        label: "C (ii) Reason",
        points: 1,
        guidance:
          "Earn the point for a reason that uses the table: the 1st differences 1, 9, 23, 43 and 2nd differences 8, 14, 20 are not constant, but the 3rd differences are a constant 6 over consecutive equal-length input-value intervals.",
      },
    ],
    modelResponse:
      "A (i). g(x) = −(x⁴ − 5x² + 4) = −(x² − 1)(x² − 4) = −(x − 1)(x + 1)(x − 2)(x + 2). Setting g(x) = 0 gives x = −2, x = −1, x = 1, and x = 2.\n\nA (ii). Using a graphing calculator on 0 < x < 3, the relative maximum of g occurs at x = 1.581, and the relative maximum value is g(1.581) = 2.250.\n\nB (i). The leading term −x⁴ has a negative coefficient and an even degree. As x increases without bound, g(x) decreases without bound: lim x→∞ g(x) = −∞.\n\nB (ii). g(−x) = −(−x)⁴ + 5(−x)² − 4 = −x⁴ + 5x² − 4 = g(x). Because g(−x) = g(x) for all x, g is an even function.\n\nC (i). f is best modeled by a cubic function.\n\nC (ii). The 1st differences in f(x)-values are 3 − 2 = 1, 12 − 3 = 9, 35 − 12 = 23, 78 − 35 = 43. The 2nd differences are 8, 14, 20. The 3rd differences are 14 − 8 = 6 and 20 − 14 = 6. Because the 3rd differences in the output values are a constant 6 over consecutive equal-length input-value intervals, a cubic model is best.",
    alternateModel:
      "In A (ii) an exact analysis is also acceptable: the maximum occurs where x² = 2.5, so x = √2.5 ≈ 1.581 and g(√2.5) = −6.25 + 12.5 − 4 = 2.25. In C (ii) a table of differences, like the one in the scoring guidelines style, is a complete reason when it is followed by the conclusion sentence.",
    commonErrors: [
      "Listing only the positive zeros 1 and 2.",
      "Reporting x ≈ 1.58 or a value rounded to fewer than three decimal places.",
      "Writing 'g goes down' instead of lim x→∞ g(x) = −∞.",
      "Saying g is even because 'the graph looks symmetric' without showing g(−x) = g(x).",
      "Choosing quadratic because the output values grow faster and faster, without checking the 2nd differences.",
    ],
  },
  {
    id: "precalculus-1-frq-2",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-1",
    title: "Unit 1 FRQ 2: Modeling a non-periodic context (Topics 1.1 to 1.6)",
    headline:
      "Average rate of change with units, rate of change at a point, and a domain restriction.",
    promptTitle:
      "Free response 2 · Modeling a non-periodic context · graphing calculator",
    prompt:
      "Water is pumped into a storage tank. The amount of water in the tank, in gallons, is modeled by V(t) = −t³ + 12t² + 20, where t is the time in hours since pumping began. The tank holds at most 250 gallons, and the model is used only while the tank is not overflowing.",
    instructions:
      "Part A style: a graphing calculator is required. Show the work that leads to each answer; answers without supporting work may not earn credit where work is requested. Avoid rounding intermediate values, and give decimal approximations accurate to three places after the decimal point unless the part says otherwise. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: ["ced", "ced-topic-1-2", "ced-topic-1-3", "ced-topic-1-4"],
    stimulusBlocks: [
      {
        type: "table",
        caption: "Selected values of V(t)",
        columns: ["t (hours)", "2", "4", "5", "6", "7"],
        rows: [["V(t) (gallons)", "60", "148", "195", "236", "265"]],
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
          "A (i). Find the average rate of change of V from t = 2 to t = 5 hours. Show the computations that lead to your answer.",
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
        id: "a2",
        label: "Part A (ii)",
        prompt:
          "A (ii). Interpret the meaning of your answer from part A (i) in the context of the problem.",
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
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). Use the average rate of change of V over the interval 3.9 ≤ t ≤ 4.1 to estimate the rate of change of V at t = 4. Express your answer as a decimal approximation with units.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-2",
            sectionId: "rate-at-a-point",
            label: "Rate of change at a point",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt:
          "B (ii). Using the values in the table, is the amount of water increasing at an increasing rate or increasing at a decreasing rate on the interval 5 < t < 7? Give a reason for your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-3",
            sectionId: "concavity-from-rates",
            label: "Changing average rates of change",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). Write and solve an equation whose solution gives the time t, in hours, when the tank is full. Express your value for t as a decimal approximation.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-1",
            sectionId: "function-basics",
            label: "Input and output values",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). Explain how the value of t found in part C (i) can be used to determine an appropriate domain restriction for the model V. Refer to the context of the problem in your explanation.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-13",
            sectionId: "assumptions-restrictions",
            label: "Domain restrictions",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-aroc",
        field: "a1",
        label: "A (i) Average rate of change",
        points: 1,
        guidance:
          "Earn the point for (V(5) − V(2))/(5 − 2) = (195 − 60)/3 = 45 gallons per hour, with the computation shown.",
      },
      {
        id: "a2-interp",
        field: "a2",
        label: "A (ii) Interpretation",
        points: 1,
        guidance:
          "Earn the point for: from t = 2 to t = 5 hours, on average, the amount of water in the tank increased at a rate of 45 gallons per hour. The interval, 'on average', and units are all needed.",
      },
      {
        id: "b1-estimate",
        field: "b1",
        label: "B (i) Estimate with units",
        points: 1,
        guidance:
          "Earn the point for (V(4.1) − V(3.9))/0.2 = (152.799 − 143.201)/0.2 = 47.990 gallons per hour.",
      },
      {
        id: "b2-rate",
        field: "b2",
        label: "B (ii) Increasing at a decreasing rate, with reason",
        points: 1,
        guidance:
          "Earn the point for 'increasing at a decreasing rate' with a reason: the average rates of change over [5, 6] and [6, 7] are 41 and 29 gallons per hour, which are positive and decreasing.",
      },
      {
        id: "c1-solve",
        field: "c1",
        label: "C (i) Equation and value of t",
        points: 1,
        guidance:
          "Earn the point for V(t) = 250, that is −t³ + 12t² + 20 = 250, with t = 6.420 hours.",
      },
      {
        id: "c2-domain",
        field: "c2",
        label: "C (ii) Domain explanation",
        points: 1,
        guidance:
          "Earn the point for explaining that the model applies from the start of pumping until the tank is full, so an appropriate domain is 0 ≤ t ≤ 6.420 hours.",
      },
    ],
    modelResponse:
      "A (i). (V(5) − V(2))/(5 − 2) = (195 − 60)/3 = 45. The average rate of change is 45 gallons per hour.\n\nA (ii). From t = 2 to t = 5 hours, on average, the amount of water in the tank increased at a rate of 45 gallons per hour.\n\nB (i). (V(4.1) − V(3.9))/(4.1 − 3.9) = (152.799 − 143.201)/0.2 = 47.990. At t = 4 hours, the amount of water is increasing at a rate of about 47.990 gallons per hour.\n\nB (ii). The average rate of change over [5, 6] is 236 − 195 = 41 gallons per hour, and over [6, 7] it is 265 − 236 = 29 gallons per hour. Both are positive, so the amount of water is increasing, and they decrease, so it is increasing at a decreasing rate on 5 < t < 7.\n\nC (i). V(t) = 250, so −t³ + 12t² + 20 = 250. Using a graphing calculator, t = 6.420 hours.\n\nC (ii). The model applies only while the tank is not overflowing. Pumping begins at t = 0, and the tank is full at t = 6.420. Therefore an appropriate domain for V is 0 ≤ t ≤ 6.420 hours.",
    alternateModel:
      "In B (ii) you may instead compare consecutive changes in the table, 41 and then 29, as long as you say they are average rates of change over equal-length intervals and that they are decreasing. In C (i) any correct equation equivalent to V(t) = 250, such as t³ − 12t² + 230 = 0, earns the point with the value of t.",
    commonErrors: [
      "Reporting 135 gallons, the change in V, instead of dividing by 3 hours.",
      "Interpreting 45 as the amount of water at some time, or leaving out 'on average' or the interval.",
      "Using V(4) = 148 as the rate of change at t = 4.",
      "Saying the amount is decreasing on 5 < t < 7 because the rates are getting smaller.",
      "Rounding V(3.9) and V(4.1) before dividing, which can change the third decimal place.",
    ],
  },
  {
    id: "precalculus-1-frq-3",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-1",
    title: "Unit 1 FRQ 3: Function concepts (Topics 1.7 to 1.14)",
    headline:
      "A hole, a vertical asymptote, end behavior, a rational inequality, and choosing a model.",
    promptTitle: "Free response 3 · Function concepts · graphing calculator",
    prompt:
      "The function r is given by r(x) = (x² − x − 6)/(x² − 4). The table gives values of a function h at selected values of x.",
    instructions:
      "Part A style: a graphing calculator is required. Show the work that leads to each answer; answers without supporting work may not earn credit where work is requested. Avoid rounding intermediate values, and give decimal approximations accurate to three places after the decimal point unless the part says otherwise. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: [
      "ced",
      "ced-topic-1-7",
      "ced-topic-1-8",
      "ced-topic-1-9",
      "ced-topic-1-10",
      "ced-topic-1-13",
    ],
    stimulusBlocks: [
      {
        type: "table",
        caption: "Values of h",
        columns: ["x", "0", "1", "2", "3", "4"],
        rows: [["h(x)", "7", "4", "3", "4", "7"]],
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
          "A (i). The graph of r has a hole. Find the coordinates of the hole. Show the work that leads to your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-10",
            sectionId: "hole-location",
            label: "Locating a hole",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt:
          "A (ii). The graph of r has a vertical asymptote at x = 2. Describe the behavior of r on each side of x = 2 using the mathematical notation of limits.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-9",
            sectionId: "one-sided-limits",
            label: "One-sided limits",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). Determine the end behavior of r as x increases without bound and as x decreases without bound. Express your answers using the mathematical notation of limits.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-7",
            sectionId: "horizontal-asymptotes",
            label: "Horizontal asymptotes",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt:
          "B (ii). Find all values of x for which r(x) ≥ 0. Give a reason for your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-8",
            sectionId: "inequalities",
            label: "Rational inequalities",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). Based on the table, determine which of the following function types best models h: linear, quadratic, or cubic.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-13",
            sectionId: "choose-type",
            label: "Choosing a function type",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). Give a reason for your answer to part C (i) based on the relationship between the change in the output values of h and the change in the input values of h. Refer to the values in the table in your reasoning.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-13",
            sectionId: "differences-and-degree",
            label: "Successive differences and degree",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-hole",
        field: "a1",
        label: "A (i) Coordinates of the hole",
        points: 1,
        guidance:
          "Earn the point for (−2, 5/4), or (−2, 1.25), with work such as r(x) = (x − 3)(x + 2)/((x − 2)(x + 2)) and lim x→−2 r(x) = (−5)/(−4) = 5/4.",
      },
      {
        id: "a2-limits",
        field: "a2",
        label: "A (ii) One-sided limits",
        points: 1,
        guidance:
          "Earn the point for lim x→2⁻ r(x) = ∞ and lim x→2⁺ r(x) = −∞. Both limits are needed.",
      },
      {
        id: "b1-end",
        field: "b1",
        label: "B (i) End behavior with limit notation",
        points: 1,
        guidance: "Earn the point for lim x→∞ r(x) = 1 and lim x→−∞ r(x) = 1.",
      },
      {
        id: "b2-ineq",
        field: "b2",
        label: "B (ii) Solution with reason",
        points: 1,
        guidance:
          "Earn the point for x < −2, −2 < x < 2, or x ≥ 3, with a reason that names the zero x = 3, the vertical asymptote x = 2, and the excluded value x = −2.",
      },
      {
        id: "c1-type",
        field: "c1",
        label: "C (i) Function type",
        points: 1,
        guidance: "Earn the point for: h is best modeled by a quadratic function.",
      },
      {
        id: "c2-reason",
        field: "c2",
        label: "C (ii) Reason",
        points: 1,
        guidance:
          "Earn the point for: the 1st differences −3, −1, 1, 3 are not constant, and the 2nd differences are a constant 2 over consecutive equal-length input-value intervals.",
      },
    ],
    modelResponse:
      "A (i). r(x) = (x − 3)(x + 2)/((x − 2)(x + 2)). The factor x + 2 has multiplicity 1 in both the numerator and the denominator, so the graph has a hole at x = −2. For x ≠ −2, r(x) = (x − 3)/(x − 2), so lim x→−2 r(x) = (−5)/(−4) = 5/4. The hole is at (−2, 5/4).\n\nA (ii). Near x = 2, the numerator x − 3 is about −1. For x < 2 the denominator x − 2 is a small negative number, and for x > 2 it is a small positive number. Therefore lim x→2⁻ r(x) = ∞ and lim x→2⁺ r(x) = −∞.\n\nB (i). The degrees of the numerator and denominator are equal, and the quotient of the leading terms is x²/x² = 1. Therefore lim x→∞ r(x) = 1 and lim x→−∞ r(x) = 1.\n\nB (ii). For x ≠ −2, r(x) = (x − 3)/(x − 2). The real zero x = 3 and the vertical asymptote x = 2 are the endpoints, and x = −2 is excluded because r is undefined there. The quotient is positive for x < 2 (both factors negative) and for x > 3, and it is 0 at x = 3. So r(x) ≥ 0 for x < −2, for −2 < x < 2, and for x ≥ 3.\n\nC (i). h is best modeled by a quadratic function.\n\nC (ii). The 1st differences in h(x)-values are 4 − 7 = −3, 3 − 4 = −1, 4 − 3 = 1, and 7 − 4 = 3. The 2nd differences are −1 − (−3) = 2, 1 − (−1) = 2, and 3 − 1 = 2. Because the 2nd differences are a constant 2 over consecutive equal-length input-value intervals, a quadratic model is best.",
    alternateModel:
      "In C (ii) it is also correct to note that the data are symmetric about x = 2 with a unique minimum of 3, which is consistent with a quadratic model, but the difference argument is the most direct reason. In B (ii), a sign table of x − 3 and x − 2 on each interval is a complete reason.",
    commonErrors: [
      "Giving the hole as (−2, 0) by using the original numerator.",
      "Listing x = −2 as a vertical asymptote.",
      "Reversing the one-sided limits at x = 2.",
      "Including x = −2 or x = 2 in the solution of r(x) ≥ 0.",
      "Saying h is linear or cubic without computing differences.",
    ],
  },
  {
    id: "precalculus-1-frq-4",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-1",
    title: "Unit 1 FRQ 4: Modeling a non-periodic context (Topics 1.7 to 1.14)",
    headline:
      "Build a rational model from two conditions, interpret an average rate of change, and explain a limitation.",
    promptTitle:
      "Free response 4 · Modeling a non-periodic context · graphing calculator",
    prompt:
      "A company makes custom water bottles. The average cost per bottle, in dollars, for an order of n bottles is modeled by A(n) = (a + bn)/n, where a is a fixed setup cost in dollars and b is the cost in dollars of making each bottle. For an order of 20 bottles the average cost is $13 per bottle, and for an order of 80 bottles the average cost is $7 per bottle.",
    instructions:
      "Part A style: a graphing calculator is required. Show the work that leads to each answer; answers without supporting work may not earn credit where work is requested. Avoid rounding intermediate values, and give decimal approximations accurate to three places after the decimal point unless the part says otherwise. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: ["ced", "ced-topic-1-7", "ced-topic-1-13", "ced-topic-1-14"],
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
          "A (i). Use the given data to write two equations that can be used to find the values of the constants a and b in the expression for A(n).",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-14",
            sectionId: "build-from-conditions",
            label: "Constructing a model from conditions",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt: "A (ii). Find the values of a and b.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-14",
            sectionId: "build-from-conditions",
            label: "Solving for the constants",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). Use the given data to find the average rate of change of A from n = 20 to n = 80 bottles. Show the computations that lead to your answer, and include units.",
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
            topicId: "precalculus-1-14",
            sectionId: "interpret-model",
            label: "Applying a model",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). Write and solve an equation whose solution gives the number of bottles n for which the average cost is $6 per bottle.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-14",
            sectionId: "rational-models",
            label: "Rational function models",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). A manager claims that a large enough order will bring the average cost to $5 per bottle. Use the model to explain whether the claim is correct. Refer to the end behavior of A in your explanation.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-1-7",
            sectionId: "horizontal-asymptotes",
            label: "Horizontal asymptotes",
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
          "Earn the point for (a + 20b)/20 = 13 and (a + 80b)/80 = 7, or the equivalent a + 20b = 260 and a + 80b = 560.",
      },
      {
        id: "a2-vals",
        field: "a2",
        label: "A (ii) Values of a and b",
        points: 1,
        guidance: "Earn the point for a = 160 and b = 5, so A(n) = (160 + 5n)/n.",
      },
      {
        id: "b1-aroc",
        field: "b1",
        label: "B (i) Average rate of change",
        points: 1,
        guidance:
          "Earn the point for (A(80) − A(20))/(80 − 20) = (7 − 13)/60 = −0.1 dollar per bottle, per bottle.",
      },
      {
        id: "b2-interp",
        field: "b2",
        label: "B (ii) Interpretation",
        points: 1,
        guidance:
          "Earn the point for: from n = 20 to n = 80 bottles, on average, the average cost per bottle decreased at a rate of $0.10 per additional bottle ordered.",
      },
      {
        id: "c1-solve",
        field: "c1",
        label: "C (i) Equation and value of n",
        points: 1,
        guidance:
          "Earn the point for (160 + 5n)/n = 6, giving 160 + 5n = 6n and n = 160 bottles.",
      },
      {
        id: "c2-explain",
        field: "c2",
        label: "C (ii) Explanation",
        points: 1,
        guidance:
          "Earn the point for explaining that A(n) = 5 + 160/n > 5 for every n > 0, and lim n→∞ A(n) = 5, so the average cost gets arbitrarily close to $5 but never reaches it; the claim is incorrect.",
      },
    ],
    modelResponse:
      "A (i). Because A(20) = 13 and A(80) = 7, two equations are (a + 20b)/20 = 13 and (a + 80b)/80 = 7, that is, a + 20b = 260 and a + 80b = 560.\n\nA (ii). Subtracting gives 60b = 300, so b = 5. Then a = 260 − 100 = 160. A(n) = (160 + 5n)/n.\n\nB (i). (A(80) − A(20))/(80 − 20) = (7 − 13)/60 = −0.1. The average rate of change is −0.1 dollar per bottle, per additional bottle.\n\nB (ii). From an order of 20 bottles to an order of 80 bottles, on average, the average cost per bottle decreased at a rate of $0.10 for each additional bottle ordered.\n\nC (i). A(n) = 6, so (160 + 5n)/n = 6. Then 160 + 5n = 6n, and n = 160 bottles.\n\nC (ii). A(n) = 5 + 160/n. For every n > 0, 160/n > 0, so A(n) > 5. As n increases without bound, 160/n approaches 0, so lim n→∞ A(n) = 5. The average cost gets arbitrarily close to $5 per bottle but never equals $5, so the manager's claim is incorrect.",
    alternateModel:
      "In A (ii) a graphing calculator may be used to solve the system. In C (ii) it is also correct to solve (160 + 5n)/n = 5, which gives 160 = 0, a contradiction, and to connect that to the horizontal asymptote y = 5.",
    commonErrors: [
      "Writing a + 20b = 13 instead of multiplying the average cost by the number of bottles.",
      "Reporting the change in average cost, −6, instead of dividing by 60 bottles.",
      "Interpreting −0.1 as the cost of one bottle.",
      "Claiming the average cost reaches $5 for a very large order.",
      "Leaving out units or 'on average' in the interpretation.",
    ],
  },
];

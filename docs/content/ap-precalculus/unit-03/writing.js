// Unit 3 free-response practice in the AP Precalculus FRQ formats.
// Original questions: two for Topics 3.1 to 3.7 and two for Topics 3.8 to 3.15,
// mirroring how the CED splits Unit 3. Every number was computed and checked in code.

export const writingQuizzes = [
  {
    id: "precalculus-3-frq-1",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-3",
    title: "Unit 3 FRQ 1: Modeling a periodic context (Topics 3.1 to 3.7)",
    headline:
      "Read key points from a sinusoidal graph with no scale, build h(t) = a sin(b(t + c)) + d, and describe how the rate of change behaves.",
    promptTitle: "Free response 1 · Modeling a periodic context · no calculator",
    prompt:
      "A water wheel turns at a constant rate. The height of the tip of one paddle above the bottom of the stream, in feet, is modeled by the sinusoidal function h, where t is the time in seconds. At time t = 0, the tip is at its highest point, 14 feet above the bottom of the stream. At time t = 5, the tip is at its lowest point, 2 feet above the bottom of the stream. Between t = 0 and t = 5, the tip is never at its highest or lowest point. The graph of h and its dashed midline for two full cycles is shown. Five points, F, G, J, K, and P, are labeled on the graph. No scale is indicated, and no axes are presented.",
    instructions:
      "Part B style: no calculator is allowed. Angle measures are in radians. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number. Solutions to equations must be real numbers. Determine the exact value of any expression that can be obtained without a calculator, such as sin(π/6) or arccos(1/2). Show the work that leads to your answers.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: ["ced", "ced-topic-3-5", "ced-topic-3-6", "ced-topic-3-7"],
    stimulusBlocks: [
      {
        type: "graph",
        caption: "Graph of h with its dashed midline, two full cycles",
        alt: "A sinusoidal curve over two full cycles with a dashed horizontal midline. F is the first maximum at the left end. G is where the curve next crosses the midline going down. J is the next minimum. K is where the curve crosses the midline going down in the second cycle, after the second maximum. P is the minimum after K.",
        window: {
          x: [-0.8, 20.8],
          y: [0.5, 15.5],
        },
        tickLabels: false,
        axes: false,
        grid: false,
        functions: [
          {
            expr: "6cos((pi/5)x) + 8",
            domain: [0, 20],
          },
        ],
        asymptotes: [
          {
            y: 8,
          },
        ],
        points: [
          {
            at: [0, 14],
            label: "F",
            position: "ne",
          },
          {
            at: [2.5, 8],
            label: "G",
            position: "ne",
          },
          {
            at: [5, 2],
            label: "J",
            position: "s",
          },
          {
            at: [12.5, 8],
            label: "K",
            position: "ne",
          },
          {
            at: [15, 2],
            label: "P",
            position: "s",
          },
        ],
      },
    ],
    scaffold: [
      {
        label: "Show work",
        text: "Write the setup, such as the expression you evaluate or the equation you solve, before the answer.",
      },
      {
        label: "Use exact values",
        text: "Without a calculator, give exact values such as √3/2 or 7π/6, not decimals.",
      },
      {
        label: "Justify",
        text: "When a part says give a reason or explain, refer to the graph, the given values, or the context.",
      },
    ],
    responseFields: [
      {
        id: "a1",
        label: "Part A (i)",
        prompt:
          "A (i). The point F has coordinates (0, 14). Determine possible coordinates (t, h(t)) for the points G and J.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-7",
            sectionId: "period-and-amplitude-from-data",
            label: "Period, amplitude, and midline from data",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt:
          "A (ii). Determine possible coordinates (t, h(t)) for the points K and P.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-1",
            sectionId: "period",
            label: "Characteristics repeat every period",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). The function h can be written in the form h(t) = a sin(b(t + c)) + d, where b > 0. Find the values of the constants a and d.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-5",
            sectionId: "amplitude-and-midline",
            label: "Amplitude and midline",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt: "B (ii). Find values of the constants b and c for the form in B (i).",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-6",
            sectionId: "general-form",
            label: "Period and phase shift from b and c",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). The t-coordinate of G is t₁, and the t-coordinate of J is t₂. On the interval (t₁, t₂), is h increasing or decreasing? Is the graph of h concave up or concave down?",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-5",
            sectionId: "symmetry-and-concavity",
            label: "Concavity of sinusoidal graphs",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). Describe how the rate of change of h changes over the interval (t₁, t₂). Give a reason for your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-5",
            sectionId: "symmetry-and-concavity",
            label: "Concavity and rate of change",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-gj",
        field: "a1",
        label: "A (i) G and J",
        points: 1,
        guidance: "Earn the point for G = (2.5, 8) and J = (5, 2). Both are needed.",
      },
      {
        id: "a2-kp",
        field: "a2",
        label: "A (ii) K and P",
        points: 1,
        guidance: "Earn the point for K = (12.5, 8) and P = (15, 2). Both are needed.",
      },
      {
        id: "b1-ad",
        field: "b1",
        label: "B (i) a and d",
        points: 1,
        guidance: "Earn the point for a = 6 (or a = −6 with a matching c) and d = 8.",
      },
      {
        id: "b2-bc",
        field: "b2",
        label: "B (ii) b and c",
        points: 1,
        guidance:
          "Earn the point for b = π/5 and a value of c consistent with a, such as c = 5/2 when a = 6, or c = −5/2 when a = −6. Any c that differs from these by a multiple of 10 is also correct.",
      },
      {
        id: "c1-behavior",
        field: "c1",
        label: "C (i) Increasing or decreasing and concavity",
        points: 1,
        guidance:
          "Earn the point for: h is decreasing, and the graph of h is concave up. Both are needed.",
      },
      {
        id: "c2-rate",
        field: "c2",
        label: "C (ii) Rate of change",
        points: 1,
        guidance:
          "Earn the point for: the rate of change of h is increasing (negative values getting closer to 0), with a reason such as the graph is concave up on (t₁, t₂).",
      },
    ],
    modelResponse:
      "A (i). The highest point is at t = 0 and the next lowest point is at t = 5, which is half a cycle, so the period is 10. G is a quarter cycle after F, on the midline h = (14 + 2)/2 = 8, so G = (2.5, 8). J is the minimum, J = (5, 2).\n\nA (ii). The second maximum is at t = 10, so K, a quarter cycle later on the midline, is (12.5, 8), and P, the following minimum, is (15, 2).\n\nB (i). The amplitude is (14 − 2)/2 = 6, so a = 6, and the midline is h = 8, so d = 8.\n\nB (ii). The period is 10 = 2π/b, so b = π/5. The sine function increases through its midline when its input is 0; h increases through its midline at t = −2.5 (a quarter cycle before the maximum at t = 0). So (π/5)(−2.5 + c) = 0, c = 5/2. h(t) = 6 sin((π/5)(t + 5/2)) + 8.\n\nC (i). From G to J the graph falls from the midline to the minimum, so h is decreasing. Below the midline the graph is concave up.\n\nC (ii). The rate of change of h is increasing on (t₁, t₂): it is negative, and it gets closer to 0, reaching 0 at the minimum J. This is because the graph of h is concave up on the interval.",
    alternateModel:
      "With a = −6, the sine is reflected, so h(t) = −6 sin((π/5)(t − 5/2)) + 8 is also correct. Any c that differs from 5/2 by a multiple of the period 10, such as c = −15/2, also works. In cosine form, h(t) = 6 cos((π/5)t) + 8.",
    commonErrors: [
      "Using 5 as the period, from the maximum to the next minimum.",
      "Placing G at the minimum instead of on the midline.",
      "Giving a = 12, the full difference between the highest and lowest points.",
      "Using b = 10 or b = 1/10 instead of b = 2π/10.",
      "Saying the rate of change is decreasing because h is decreasing.",
    ],
  },
  {
    id: "precalculus-3-frq-2",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-3",
    title: "Unit 3 FRQ 2: Sinusoidal model from data (Topics 3.1 to 3.7)",
    headline:
      "Build a sinusoidal model from monthly temperatures, use an average rate of change with units, solve the model, and reason about how the rate of change behaves.",
    promptTitle: "Free response 2 · Sinusoidal model from data · graphing calculator",
    prompt:
      "The average daily high temperature in a city, in degrees Fahrenheit (°F), is modeled by the sinusoidal function T, where m is the month number (m = 1 for January, m = 2 for February, and so on, with m = 13 for the following January). The table gives values of T(m) for selected months. The model reaches its maximum value at m = 7 and its minimum value at m = 1 and m = 13.",
    instructions:
      "Part A style: a graphing calculator is required. Show the work that leads to each answer; answers without supporting work may not earn credit where work is requested. Angle measures are in radians. Avoid rounding intermediate values, and give decimal approximations accurate to three places after the decimal point unless the part says otherwise. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: [
      "ced",
      "ced-topic-3-5",
      "ced-topic-3-6",
      "ced-topic-3-7",
      "ced-topic-3-10",
    ],
    stimulusBlocks: [
      {
        type: "table",
        caption: "Average daily high temperature",
        columns: ["m (months)", "1", "3", "5", "7", "9", "11"],
        rows: [["T(m) (°F)", "42", "52", "72", "82", "72", "52"]],
      },
    ],
    scaffold: [
      {
        label: "Show work",
        text: "Write the setup, such as the expression you evaluate or the equation you solve, before the answer.",
      },
      {
        label: "Use exact values",
        text: "Without a calculator, give exact values such as √3/2 or 7π/6, not decimals.",
      },
      {
        label: "Justify",
        text: "When a part says give a reason or explain, refer to the graph, the given values, or the context.",
      },
    ],
    responseFields: [
      {
        id: "a1",
        label: "Part A (i)",
        prompt:
          "A (i). T can be written in the form T(m) = a sin(b(m + c)) + d, where a > 0 and b > 0. Find the values of a, b, and d.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-7",
            sectionId: "period-and-amplitude-from-data",
            label: "Period, amplitude, and midline from data",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt:
          "A (ii). Find a value of c for the form in A (i). Show the work that leads to your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-7",
            sectionId: "phase-shift-and-regression",
            label: "Phase shift from a data point",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). Use the model to find the average rate of change of T from m = 1 to m = 4. Express your answer as a decimal approximation and include units.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-7",
            sectionId: "phase-shift-and-regression",
            label: "Using a sinusoidal model",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt:
          "B (ii). Interpret the meaning of your answer to B (i) in the context of the problem.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-7",
            sectionId: "phase-shift-and-regression",
            label: "Interpreting model values",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). Use the model to find all values of m, for 1 ≤ m ≤ 12, for which T(m) = 72.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-10",
            sectionId: "solving-equations",
            label: "Solving trigonometric equations",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). On the interval 4 < m < 7, is the rate of change of T increasing or decreasing? Give a reason for your answer.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-5",
            sectionId: "symmetry-and-concavity",
            label: "Concavity and rate of change",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-abd",
        field: "a1",
        label: "A (i) a, b, and d",
        points: 1,
        guidance:
          "Earn the point for a = 20, b = π/6 (about 0.524), and d = 62. All three are needed.",
      },
      {
        id: "a2-c",
        field: "a2",
        label: "A (ii) c",
        points: 1,
        guidance:
          "Earn the point for c = −4 (or any value −4 + 12k), with work such as (π/6)(7 + c) = π/2.",
      },
      {
        id: "b1-rate",
        field: "b1",
        label: "B (i) Average rate of change with units",
        points: 1,
        guidance:
          "Earn the point for (T(4) − T(1))/(4 − 1) = (62 − 42)/3 ≈ 6.667 degrees Fahrenheit per month.",
      },
      {
        id: "b2-interp",
        field: "b2",
        label: "B (ii) Interpretation",
        points: 1,
        guidance:
          "Earn the point for: from m = 1 to m = 4, the average daily high temperature increases, on average, by about 6.667 °F per month. The interval and 'on average' are needed.",
      },
      {
        id: "c1-solve",
        field: "c1",
        label: "C (i) Solutions",
        points: 1,
        guidance: "Earn the point for m = 5 and m = 9. Both are needed.",
      },
      {
        id: "c2-rate",
        field: "c2",
        label: "C (ii) Rate of change with reason",
        points: 1,
        guidance:
          "Earn the point for: decreasing, because on 4 < m < 7 the graph of T is above its midline and concave down (T increases toward its maximum more and more slowly).",
      },
    ],
    modelResponse:
      "A (i). Maximum 82 and minimum 42 give a = (82 − 42)/2 = 20 and d = (82 + 42)/2 = 62. Consecutive minimums at m = 1 and m = 13 give a period of 12, so b = 2π/12 = π/6.\n\nA (ii). The sine function reaches its maximum when its input is π/2. The maximum is at m = 7, so (π/6)(7 + c) = π/2, 7 + c = 3, and c = −4. T(m) = 20 sin((π/6)(m − 4)) + 62.\n\nB (i). T(1) = 20 sin(−π/2) + 62 = 42 and T(4) = 20 sin(0) + 62 = 62. The average rate of change is (62 − 42)/(4 − 1) = 20/3 ≈ 6.667 °F per month.\n\nB (ii). From m = 1 to m = 4, the average daily high temperature increases, on average, by about 6.667 °F per month.\n\nC (i). 20 sin((π/6)(m − 4)) + 62 = 72 gives sin((π/6)(m − 4)) = 1/2. For 1 ≤ m ≤ 12, (π/6)(m − 4) is between −π/2 and 4π/3, so (π/6)(m − 4) = π/6 or 5π/6, which gives m = 5 or m = 9. A graphing calculator confirms the intersections of y = T(m) and y = 72 at m = 5 and m = 9.\n\nC (ii). The rate of change is decreasing. On 4 < m < 7, T rises from its midline value at m = 4 to its maximum at m = 7. The graph of a sinusoidal function is concave down above its midline, so T increases at a decreasing rate there.",
    alternateModel:
      "A cosine form is also correct when the question allows it: T(m) = 20 cos((π/6)(m − 7)) + 62. In the sine form, c = 8 also works, since it differs from −4 by the period 12.",
    commonErrors: [
      "Taking the period as 6, the time from a minimum to the next maximum.",
      "Writing b = 12 instead of b = 2π/12.",
      "Using c = 4 or c = 7, which shifts the graph the wrong way or forgets that sine peaks at input π/2.",
      "Giving an average rate of change without units or with the units reversed.",
      "Giving only m = 5 for T(m) = 72 and missing the second solution.",
    ],
  },
  {
    id: "precalculus-3-frq-3",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-3",
    title: "Unit 3 FRQ 3: Symbolic manipulations (Topics 3.8 to 3.15)",
    headline:
      "Solve trigonometric equations, rewrite expressions with identities, evaluate an inverse composition, and solve an inequality, all with exact values.",
    promptTitle: "Free response 3 · Symbolic manipulations · no calculator",
    prompt:
      "Directions: Answer each part using exact values. For parts A and C (ii), give all solutions in the interval 0 ≤ x < 2π.",
    instructions:
      "Part B style: no calculator is allowed. Angle measures are in radians. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number. Solutions to equations must be real numbers. Determine the exact value of any expression that can be obtained without a calculator, such as sin(π/6) or arccos(1/2). Show the work that leads to your answers.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: ["ced", "ced-topic-3-9", "ced-topic-3-10", "ced-topic-3-12"],
    scaffold: [
      {
        label: "Show work",
        text: "Write the setup, such as the expression you evaluate or the equation you solve, before the answer.",
      },
      {
        label: "Use exact values",
        text: "Without a calculator, give exact values such as √3/2 or 7π/6, not decimals.",
      },
      {
        label: "Justify",
        text: "When a part says give a reason or explain, refer to the graph, the given values, or the context.",
      },
    ],
    responseFields: [
      {
        id: "a1",
        label: "Part A (i)",
        prompt: "A (i). Solve 2 sin²x − sin x − 1 = 0 for 0 ≤ x < 2π.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-12",
            sectionId: "solving-with-identities",
            label: "Quadratic in a trigonometric function",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt: "A (ii). Solve 2 cos(2x) = 1 for 0 ≤ x < 2π.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-10",
            sectionId: "solving-equations",
            label: "Equations with a multiple angle",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). Rewrite h(x) = (1 − cos²x)/(sin x · cos x) as a single trigonometric function of x, without fractions.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-12",
            sectionId: "pythagorean-identity",
            label: "The Pythagorean identity",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt:
          "B (ii). Rewrite k(x) = cos(x + π/3) as an expression of the form A cos x + B sin x, where A and B are exact constants.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-12",
            sectionId: "sum-identities",
            label: "The cosine sum identity",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt: "C (i). Find the exact value of sin(arccos(−3/5)).",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-9",
            sectionId: "restricted-domains",
            label: "Ranges of inverse trigonometric functions",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt:
          "C (ii). Solve 2 sin x + 1 > 0 for 0 ≤ x < 2π. Express your answer using interval notation.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-10",
            sectionId: "inequalities-and-context",
            label: "Trigonometric inequalities",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-solve",
        field: "a1",
        label: "A (i) Solutions",
        points: 1,
        guidance:
          "Earn the point for x = π/2, 7π/6, and 11π/6, from (2 sin x + 1)(sin x − 1) = 0. All three are needed.",
      },
      {
        id: "a2-solve",
        field: "a2",
        label: "A (ii) Solutions",
        points: 1,
        guidance:
          "Earn the point for x = π/6, 5π/6, 7π/6, and 11π/6, from cos(2x) = 1/2 with 0 ≤ 2x < 4π. All four are needed.",
      },
      {
        id: "b1-tan",
        field: "b1",
        label: "B (i) Single function",
        points: 1,
        guidance:
          "Earn the point for h(x) = tan x, with work such as (1 − cos²x)/(sin x cos x) = sin²x/(sin x cos x) = sin x/cos x.",
      },
      {
        id: "b2-sum",
        field: "b2",
        label: "B (ii) Sum identity",
        points: 1,
        guidance: "Earn the point for k(x) = (1/2)cos x − (√3/2)sin x.",
      },
      {
        id: "c1-value",
        field: "c1",
        label: "C (i) Exact value",
        points: 1,
        guidance:
          "Earn the point for 4/5, with the reasoning that arccos(−3/5) is an angle in [0, π], where sine is not negative.",
      },
      {
        id: "c2-ineq",
        field: "c2",
        label: "C (ii) Inequality",
        points: 1,
        guidance: "Earn the point for [0, 7π/6) ∪ (11π/6, 2π).",
      },
    ],
    modelResponse:
      "A (i). Factor: (2 sin x + 1)(sin x − 1) = 0. So sin x = −1/2, giving x = 7π/6 and 11π/6, or sin x = 1, giving x = π/2.\n\nA (ii). cos(2x) = 1/2. Since 0 ≤ x < 2π, 0 ≤ 2x < 4π, so 2x = π/3, 5π/3, 7π/3, 11π/3. Then x = π/6, 5π/6, 7π/6, 11π/6.\n\nB (i). By the Pythagorean identity, 1 − cos²x = sin²x. So h(x) = sin²x/(sin x cos x) = sin x/cos x = tan x, for x where sin x ≠ 0 and cos x ≠ 0.\n\nB (ii). cos(x + π/3) = cos x cos(π/3) − sin x sin(π/3) = (1/2)cos x − (√3/2)sin x.\n\nC (i). Let θ = arccos(−3/5). Then cos θ = −3/5 and θ is in [0, π], so sin θ ≥ 0. sin θ = √(1 − 9/25) = 4/5.\n\nC (ii). 2 sin x + 1 > 0 means sin x > −1/2. sin x = −1/2 at x = 7π/6 and 11π/6, and sin x < −1/2 between them. So the solution is [0, 7π/6) ∪ (11π/6, 2π).",
    alternateModel:
      "In A (i) you may substitute u = sin x and solve 2u² − u − 1 = 0 first. In C (i) a right triangle with adjacent side −3 and hypotenuse 5 in Quadrant II gives the same value, 4/5.",
    commonErrors: [
      "Dropping the solution x = π/2 from the factor sin x − 1.",
      "Solving 2x = π/3 and 5π/3 only, which misses half of the solutions of A (ii).",
      "Writing 1 − cos²x = sin x, without the square.",
      "Using a plus sign in the cosine sum identity.",
      "Giving −4/5 in C (i), ignoring that arccosine returns an angle in [0, π].",
      "Writing the inequality's solution as 7π/6 < x < 11π/6, which is where 2 sin x + 1 < 0.",
    ],
  },
  {
    id: "precalculus-3-frq-4",
    version: 1,
    courseId: "precalculus",
    unitId: "precalculus-3",
    title: "Unit 3 FRQ 4: Polar functions (Topics 3.8 to 3.15)",
    headline:
      "Convert a point on a polar graph to rectangular coordinates, find where the graph meets the origin, use an average rate of change of r, and decide whether the distance from the origin is increasing.",
    promptTitle: "Free response 4 · Polar functions · graphing calculator",
    prompt:
      "The polar function r = f(θ) is given by f(θ) = 1 + 3 cos θ for 0 ≤ θ ≤ 2π. The graph of r = f(θ) in polar coordinates and the graph of f in the θr-plane are shown.",
    instructions:
      "Part A style: a graphing calculator is required. Show the work that leads to each answer; answers without supporting work may not earn credit where work is requested. Angle measures are in radians. Avoid rounding intermediate values, and give decimal approximations accurate to three places after the decimal point unless the part says otherwise. Unless otherwise specified, the domain of a function f is the set of all real numbers x for which f(x) is a real number.",
    note: "Original practice question written in the AP Precalculus free-response format (6 points, parts A to C). Scoring is self-assessed with the point-by-point rubric. It is not an official AP question or an official AP score.",
    exerciseType: "frq",
    sourceIds: ["ced", "ced-topic-3-13", "ced-topic-3-14", "ced-topic-3-15"],
    stimulusBlocks: [
      {
        type: "graph",
        caption: "Graph of r = 1 + 3 cos θ in polar coordinates",
        alt: "A limaçon on a polar grid. Its outer loop reaches 4 units along the polar axis, and a small inner loop passes through the origin and reaches 2 units along the polar axis.",
        window: {
          x: [-2, 4.5],
          y: [-3.25, 3.25],
        },
        ticks: {
          x: 1,
          y: 1,
        },
        grid: "polar",
        height: 432,
        polar: [
          {
            expr: "1 + 3cos(θ)",
          },
        ],
      },
      {
        type: "graph",
        caption: "Graph of r = f(θ) in the θr-plane",
        alt: "A cosine-shaped curve from r = 4 at θ = 0, decreasing to r = −2 at θ = π, and increasing back to 4 at θ = 2π. It crosses r = 0 twice.",
        window: {
          x: [-0.3, 6.583185307179586],
          y: [-2.5, 4.5],
        },
        ticks: {
          x: [
            {
              at: 0,
              label: "0",
            },
            {
              at: 1.5707963267948966,
              label: "π/2",
            },
            {
              at: 3.141592653589793,
              label: "π",
            },
            {
              at: 4.71238898038469,
              label: "3π/2",
            },
            {
              at: 6.283185307179586,
              label: "2π",
            },
          ],
          y: 1,
        },
        axisLabels: {
          x: "θ",
          y: "r",
        },
        functions: [
          {
            expr: "1 + 3cos(x)",
            domain: [0, 6.283185307179586],
          },
        ],
      },
    ],
    scaffold: [
      {
        label: "Show work",
        text: "Write the setup, such as the expression you evaluate or the equation you solve, before the answer.",
      },
      {
        label: "Use exact values",
        text: "Without a calculator, give exact values such as √3/2 or 7π/6, not decimals.",
      },
      {
        label: "Justify",
        text: "When a part says give a reason or explain, refer to the graph, the given values, or the context.",
      },
    ],
    responseFields: [
      {
        id: "a1",
        label: "Part A (i)",
        prompt:
          "A (i). Find the rectangular coordinates (x, y) of the point on the graph of r = f(θ) that corresponds to θ = 2π/3. In which quadrant is this point?",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-13",
            sectionId: "converting-coordinates",
            label: "Polar to rectangular coordinates",
          },
        ],
      },
      {
        id: "a2",
        label: "Part A (ii)",
        prompt:
          "A (ii). Find all values of θ, for 0 ≤ θ ≤ 2π, at which the graph of r = f(θ) passes through the origin.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-14",
            sectionId: "polar-graphs",
            label: "Where a polar graph meets the origin",
          },
        ],
      },
      {
        id: "b1",
        label: "Part B (i)",
        prompt:
          "B (i). Find the average rate of change of r with respect to θ over the interval 0 ≤ θ ≤ π/2.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-15",
            sectionId: "polar-rates-of-change",
            label: "Average rate of change of r",
          },
        ],
      },
      {
        id: "b2",
        label: "Part B (ii)",
        prompt:
          "B (ii). Interpret the meaning of your answer to B (i) in terms of the signed radius.",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-15",
            sectionId: "polar-rates-of-change",
            label: "Interpreting the average rate of change",
          },
        ],
      },
      {
        id: "c1",
        label: "Part C (i)",
        prompt:
          "C (i). Let α be the value of θ in the interval 0 < θ < π for which f(θ) = 0. On the interval α < θ < π, is the distance between the point (f(θ), θ) and the origin increasing or decreasing?",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-15",
            sectionId: "increasing-and-decreasing-distance",
            label: "Distance from the origin",
          },
        ],
      },
      {
        id: "c2",
        label: "Part C (ii)",
        prompt: "C (ii). Give a reason for your answer to C (i).",
        required: true,
        rows: 5,
        placeholder:
          "Show the work that leads to your answer, then state the answer with any units or notation the part asks for.",
        review: [
          {
            topicId: "precalculus-3-15",
            sectionId: "increasing-and-decreasing-distance",
            label: "Sign of r and direction of change",
          },
        ],
      },
    ],
    rubric: [
      {
        id: "a1-xy",
        field: "a1",
        label: "A (i) Rectangular coordinates and quadrant",
        points: 1,
        guidance:
          "Earn the point for (x, y) = (0.250, −0.433), exactly (1/4, −√3/4), in Quadrant IV.",
      },
      {
        id: "a2-origin",
        field: "a2",
        label: "A (ii) Values of θ",
        points: 1,
        guidance:
          "Earn the point for θ = arccos(−1/3) ≈ 1.911 and θ = 2π − arccos(−1/3) ≈ 4.373. Both are needed.",
      },
      {
        id: "b1-rate",
        field: "b1",
        label: "B (i) Average rate of change",
        points: 1,
        guidance:
          "Earn the point for (f(π/2) − f(0))/(π/2 − 0) = (1 − 4)/(π/2) = −6/π ≈ −1.910.",
      },
      {
        id: "b2-interp",
        field: "b2",
        label: "B (ii) Interpretation",
        points: 1,
        guidance:
          "Earn the point for: on average, the signed radius decreases by about 1.910 units per radian as θ increases from 0 to π/2.",
      },
      {
        id: "c1-distance",
        field: "c1",
        label: "C (i) Increasing or decreasing",
        points: 1,
        guidance: "Earn the point for: the distance is increasing.",
      },
      {
        id: "c2-reason",
        field: "c2",
        label: "C (ii) Reason",
        points: 1,
        guidance:
          "Earn the point for: on α < θ < π, f(θ) is negative and decreasing (cos θ is decreasing), so |f(θ)| is increasing.",
      },
    ],
    modelResponse:
      "A (i). f(2π/3) = 1 + 3(−1/2) = −1/2. Then x = r cos θ = (−1/2)(−1/2) = 1/4 = 0.250 and y = r sin θ = (−1/2)(√3/2) = −√3/4 ≈ −0.433. The point (0.250, −0.433) is in Quadrant IV.\n\nA (ii). The graph passes through the origin when r = 0: 1 + 3 cos θ = 0, so cos θ = −1/3. θ = arccos(−1/3) ≈ 1.911 and θ = 2π − arccos(−1/3) ≈ 4.373.\n\nB (i). f(0) = 4 and f(π/2) = 1. The average rate of change is (1 − 4)/(π/2 − 0) = −6/π ≈ −1.910.\n\nB (ii). As θ increases from 0 to π/2, the signed radius decreases, on average, by about 1.910 units per radian.\n\nC (i). The distance between the point and the origin is increasing.\n\nC (ii). On α < θ < π, cos θ < −1/3, so f(θ) < 0. cos θ is decreasing on this interval, so f(θ) is decreasing. A polar function that is negative and decreasing moves away from the origin, so the distance |f(θ)| is increasing.",
    alternateModel:
      "In C (ii), you may read the θr-graph: on (α, π) the curve is below the θ-axis and falling, so its values move farther from 0.",
    commonErrors: [
      "Plotting the point at θ = 2π/3 in Quadrant II, ignoring that r is negative.",
      "Giving only θ ≈ 1.911 in A (ii).",
      "Dividing by 90 or by 1 instead of π/2 in B (i).",
      "Interpreting −1.910 as the point moving 1.910 units closer to the origin per radian.",
      "Concluding the distance decreases because r is decreasing, without checking the sign of r.",
    ],
  },
];

// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  schemaVersion: 1,
  id: "precalculus-2-1",
  courseId: "precalculus",
  unitId: "precalculus-2",
  order: 1,
  code: "2.1",
  title: "Change in Arithmetic and Geometric Sequences",
  period: "Unit 2",
  status: "ready",
  summary:
    "Sequences as functions of the whole numbers, arithmetic sequences with a common difference, geometric sequences with a common ratio, and the general term of each.",
  minutes: 12,
  learningGoals: [
    "2.1.A Express arithmetic sequences found in mathematical and contextual scenarios as functions of the whole numbers.",
    "2.1.B Express geometric sequences found in mathematical and contextual scenarios as functions of the whole numbers.",
  ],
  labels: {
    goals: "AP learning objectives",
    learn: "Understand the mathematics.",
    context: "Where this fits.",
  },
  bigIdea:
    "An arithmetic sequence changes by adding the same amount each step. A geometric sequence changes by multiplying by the same amount each step. Unit 2 builds linear and exponential functions from these two kinds of change.",
  context:
    "Unit 1 compared average rates of change over equal-length intervals. Sequences are the simplest place to see the two patterns Unit 2 is about: constant change and proportional change.",
  sections: [
    {
      id: "sequences",
      title:
        "2.1.A · A sequence is a function from the whole numbers to the real numbers.",
      conceptTitle: "Sequences as functions",
      blocks: [
        {
          type: "paragraph",
          text: "A sequence is a function from the whole numbers to the real numbers. Consequently, the graph of a sequence consists of discrete points instead of a curve.",
        },
        {
          type: "paragraph",
          text: "The input is the position n = 0, 1, 2, …, and the output is the term aₙ. Writing a₃ = 14 means the function value at n = 3 is 14, the same idea as f(3) = 14.",
        },
        {
          type: "graph",
          caption:
            "The arithmetic sequence aₙ = 5 + 3n for n = 0 to 5: separate points, not a curve",
          alt: "Six separate points at (0, 5), (1, 8), (2, 11), (3, 14), (4, 17), and (5, 20). Each point is 3 units higher than the one before it, and no line connects them.",
          window: {
            x: [-0.5, 6],
            y: [0, 24],
          },
          ticks: {
            x: 1,
            y: 4,
          },
          axisLabels: {
            x: "n",
            y: "aₙ",
          },
          points: [
            {
              at: [0, 5],
            },
            {
              at: [1, 8],
            },
            {
              at: [2, 11],
            },
            {
              at: [3, 14],
            },
            {
              at: [4, 17],
            },
            {
              at: [5, 20],
            },
          ],
        },
      ],
      takeaway:
        "A sequence takes whole-number inputs, so its graph is a set of separate points.",
    },
    {
      id: "arithmetic",
      title: "2.1.A · An arithmetic sequence has a common difference.",
      conceptTitle: "Arithmetic sequences",
      blocks: [
        {
          type: "paragraph",
          text: "Successive terms in an arithmetic sequence have a common difference, or constant rate of change.",
        },
        {
          type: "paragraph",
          text: "The general term of an arithmetic sequence with a common difference d is denoted by aₙ and is given by aₙ = a₀ + dn, where a₀ is the initial value, or by aₙ = aₖ + d(n − k), where aₖ is the kth term of the sequence.",
        },
        {
          type: "table",
          caption: "The arithmetic sequence 5, 8, 11, 14, … with a₀ = 5 and d = 3",
          columns: ["n", "0", "1", "2", "3", "4"],
          rows: [
            ["aₙ", "5", "8", "11", "14", "17"],
            ["Change from the previous term", "(start)", "+3", "+3", "+3", "+3"],
          ],
        },
        {
          type: "paragraph",
          text: "Either form gives the same sequence. With a₀ = 5 and d = 3, aₙ = 5 + 3n, so a₁₀ = 35. Starting from the known term a₄ = 17 instead, aₙ = 17 + 3(n − 4), and a₁₀ = 17 + 3(6) = 35.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "The sequence is arithmetic because successive terms have a common difference of 3. So aₙ = 5 + 3n.",
        },
      ],
      takeaway: "Arithmetic: aₙ = a₀ + dn, or aₙ = aₖ + d(n − k) from any known term.",
    },
    {
      id: "geometric",
      title: "2.1.B · A geometric sequence has a common ratio.",
      conceptTitle: "Geometric sequences",
      blocks: [
        {
          type: "paragraph",
          text: "Successive terms in an increasing or decreasing geometric sequence have a common ratio, or constant proportional change.",
        },
        {
          type: "paragraph",
          text: "The general term of an increasing or decreasing geometric sequence with a common ratio r is denoted by gₙ and is given by gₙ = g₀rⁿ, where g₀ is the initial value, or by gₙ = gₖr^(n − k), where gₖ is the kth term of the sequence.",
        },
        {
          type: "table",
          caption: "The geometric sequence 5, 15, 45, 135, … with g₀ = 5 and r = 3",
          columns: ["n", "0", "1", "2", "3", "4"],
          rows: [
            ["gₙ", "5", "15", "45", "135", "405"],
            ["Ratio to the previous term", "(start)", "×3", "×3", "×3", "×3"],
          ],
        },
        {
          type: "paragraph",
          text: "An increasing arithmetic sequence increases equally with each step, whereas an increasing geometric sequence of positive values increases by a larger amount with each successive step. Both sequences above start at 5 and use the number 3, but by n = 4 the arithmetic sequence has reached 17 while the geometric sequence has reached 405.",
        },
        {
          type: "callout",
          title: "Write it like the AP Exam",
          text: "The sequence is geometric because the ratio of successive terms is constant: 15/5 = 45/15 = 135/45 = 3. So gₙ = 5(3)ⁿ.",
        },
      ],
      takeaway:
        "Geometric: gₙ = g₀rⁿ, or gₙ = gₖr^(n − k). Check ratios, not differences.",
    },
  ],
  vocabulary: [
    {
      id: "precalculus-2-1-sequence",
      topicId: "precalculus-2-1",
      term: "Sequence",
      definition:
        "A sequence is a function from the whole numbers to the real numbers. Consequently, the graph of a sequence consists of discrete points instead of a curve.",
      source: "CED 2.1.A.1",
    },
    {
      id: "precalculus-2-1-arithmetic-sequence",
      topicId: "precalculus-2-1",
      term: "Arithmetic sequence",
      definition:
        "Successive terms in an arithmetic sequence have a common difference, or constant rate of change.",
      source: "CED 2.1.A.2",
    },
    {
      id: "precalculus-2-1-geometric-sequence",
      topicId: "precalculus-2-1",
      term: "Geometric sequence",
      definition:
        "Successive terms in an increasing or decreasing geometric sequence have a common ratio, or constant proportional change.",
      source: "CED 2.1.B.1",
    },
  ],
  connections: [
    {
      id: "precalculus-2-1-c1",
      topicId: "precalculus-2-1",
      type: "Look back",
      title: "Constant rate of change",
      body: "Topic 1.3 showed that a linear function has a constant average rate of change over equal-length intervals. An arithmetic sequence is the whole-number version of that idea.",
      transferQuestion:
        "The terms 7, 4, 1, −2 have differences of −3. What is a₀ + d·n for this sequence if 7 is a₀?",
      feedback:
        "aₙ = 7 − 3n. A negative common difference gives a decreasing arithmetic sequence.",
      links: [
        {
          topicId: "precalculus-2-2",
          sectionId: "linear-and-arithmetic",
          label: "See linear functions and arithmetic sequences",
        },
      ],
    },
    {
      id: "precalculus-2-1-c2",
      topicId: "precalculus-2-1",
      type: "Looking ahead",
      title: "From sequences to functions",
      body: "Topic 2.2 extends aₙ = a₀ + dn to linear functions f(x) = b + mx and gₙ = g₀rⁿ to exponential functions f(x) = abˣ, whose inputs can be any real number.",
      transferQuestion:
        "Which kind of function would extend the sequence 2, 6, 18, 54 to all real inputs?",
      feedback:
        "An exponential function, because the terms have a common ratio of 3: f(x) = 2(3)ˣ.",
      links: [
        {
          topicId: "precalculus-2-2",
          sectionId: "exponential-and-geometric",
          label: "See exponential functions and geometric sequences",
        },
      ],
    },
  ],
  sourceIds: ["ced", "ced-topic-2-1"],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "precalculus-2-1-sequence",
      "precalculus-2-1-arithmetic-sequence",
      "precalculus-2-1-geometric-sequence",
    ],
  },
};

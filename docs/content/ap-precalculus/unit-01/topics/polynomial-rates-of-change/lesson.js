// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  "schemaVersion": 1,
  "id": "precalculus-1-4",
  "courseId": "precalculus",
  "unitId": "precalculus-1",
  "order": 4,
  "code": "1.4",
  "title": "Polynomial Functions and Rates of Change",
  "period": "Unit 1",
  "status": "ready",
  "summary": "Degree, leading term, and leading coefficient, relative and absolute extrema, extrema between real zeros, and points of inflection.",
  "minutes": 12,
  "learningGoals": [
    "1.4.A Identify key characteristics of polynomial functions related to rates of change."
  ],
  "labels": {
    "goals": "AP learning objectives",
    "learn": "Understand the mathematics.",
    "context": "Where this fits."
  },
  "bigIdea": "Where the rate of change of a polynomial function changes sign, the function has a relative maximum or minimum. Where the rate of change changes from increasing to decreasing, or the reverse, the graph has a point of inflection.",
  "context": "Topics 1.1 to 1.3 described output values and rates of change in general. Polynomial functions are the first family where those ideas combine into several turning points and changes in concavity on one graph.",
  "sections": [
    {
      "id": "polynomial-terms",
      "title": "1.4.A · A polynomial function has a degree, a leading term, and a leading coefficient.",
      "conceptTitle": "Polynomial functions",
      "blocks": [
        {
          "type": "paragraph",
          "text": "A nonconstant polynomial function of x is any function representation equivalent to p(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₂x² + a₁x + a₀, where n is a positive integer, each aᵢ is a real number, and aₙ is nonzero. The polynomial has degree n, the leading term is aₙxⁿ, and the leading coefficient is aₙ."
        },
        {
          "type": "table",
          "caption": "Degree, leading term, and leading coefficient",
          "columns": [
            "Polynomial",
            "Degree",
            "Leading term",
            "Leading coefficient"
          ],
          "rows": [
            [
              "3x⁴ − x + 7",
              "4",
              "3x⁴",
              "3"
            ],
            [
              "5x² − 2x³",
              "3",
              "−2x³",
              "−2"
            ],
            [
              "x(x − 1)(x + 2)",
              "3",
              "x³",
              "1"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "A product such as x(x − 1)(x + 2) is a polynomial because it is equivalent to x³ + x² − 2x. Expressions such as 5/x or √x are not polynomials, because they are not equivalent to a sum of terms with positive integer powers of x."
        }
      ],
      "takeaway": "Write the terms from highest to lowest power: the first term is the leading term, and its power is the degree."
    },
    {
      "id": "extrema",
      "title": "1.4.A · Relative extrema occur where a polynomial switches between increasing and decreasing.",
      "conceptTitle": "Relative and absolute extrema",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Where a polynomial function switches between increasing and decreasing, or at an included endpoint of a polynomial with a restricted domain, the function has a local, or relative, maximum or minimum output value. If a relative maximum is greater than all other output values, it is a global, or absolute, maximum. If a relative minimum is less than all other output values, it is a global, or absolute, minimum."
        },
        {
          "type": "table",
          "caption": "Values of f(x) = x³ − 3x",
          "columns": [
            "x",
            "f(x)"
          ],
          "rows": [
            [
              "-2",
              "−2"
            ],
            [
              "-1",
              "2"
            ],
            [
              "0",
              "0"
            ],
            [
              "1",
              "−2"
            ],
            [
              "2",
              "2"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "As x increases from −2 to −1, f(x) increases from −2 to 2, and from −1 to 1, f(x) decreases to −2. So f has a relative maximum of 2 at x = −1 and a relative minimum of −2 at x = 1. Neither is absolute, because a cubic's output values increase without bound in one direction and decrease without bound in the other."
        },
        {
          "type": "paragraph",
          "text": "A polynomial function of even degree has either a global maximum or a global minimum. For a quadratic function, the global maximum or global minimum occurs at the vertex. Both ends of the graph of an even-degree polynomial point the same way, which is why one of them must exist."
        },
        {
          "type": "callout",
          "title": "Write it like the AP Exam",
          "text": "f has a relative maximum at x = −1 because f changes from increasing to decreasing at x = −1. The relative maximum value is f(−1) = 2."
        },
        {
          "type": "graph",
          "caption": "Graph of f(x) = x³ − 3x, with a relative maximum at x = −1 and a relative minimum at x = 1",
          "alt": "A cubic curve that rises to a peak at (−1, 2), falls to a low point at (1, −2), then rises again.",
          "window": {
            "x": [
              -2.5,
              2.5
            ],
            "y": [
              -4,
              4
            ]
          },
          "ticks": {
            "x": 1,
            "y": 1
          },
          "functions": [
            {
              "expr": "x^3 - 3x",
              "label": "f",
              "labelAt": 2.1,
              "labelPosition": "w"
            }
          ],
          "points": [
            {
              "at": [
                -1,
                2
              ],
              "label": "(−1, 2)",
              "position": "n"
            },
            {
              "at": [
                1,
                -2
              ],
              "label": "(1, −2)",
              "position": "s"
            }
          ]
        }
      ],
      "takeaway": "A relative extremum is greatest or least nearby. An absolute extremum is greatest or least over the whole domain."
    },
    {
      "id": "extrema-and-zeros",
      "title": "1.4.A · Between two distinct real zeros there is a relative extremum.",
      "conceptTitle": "Extrema between zeros",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Between every two distinct real zeros of a nonconstant polynomial function, there must be at least one input value corresponding to a relative maximum or relative minimum. The output values leave 0 and return to 0, so the function must change direction in between."
        },
        {
          "type": "paragraph",
          "text": "For g(x) = x³ − 4x = x(x − 2)(x + 2), with zeros at −2, 0, and 2, technology shows a relative maximum of about 3.079 at x ≈ −1.155 between −2 and 0, and a relative minimum of about −3.079 at x ≈ 1.155 between 0 and 2."
        }
      ],
      "takeaway": "Two distinct real zeros guarantee at least one relative extremum between them, not exactly one."
    },
    {
      "id": "inflection",
      "title": "1.4.A · Points of inflection occur where the rate of change changes from increasing to decreasing, or the reverse.",
      "conceptTitle": "Points of inflection",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Points of inflection of a polynomial function occur at input values where the rate of change of the function changes from increasing to decreasing or from decreasing to increasing. This is where the graph changes from concave up to concave down or from concave down to concave up."
        },
        {
          "type": "table",
          "caption": "Changes in f(x) = x³ over intervals of length 1",
          "columns": [
            "Interval",
            "Change in f(x)"
          ],
          "rows": [
            [
              "[−2, −1]",
              "7"
            ],
            [
              "[−1, 0]",
              "1"
            ],
            [
              "[0, 1]",
              "1"
            ],
            [
              "[1, 2]",
              "7"
            ]
          ]
        },
        {
          "type": "callout",
          "title": "Write it like the AP Exam",
          "text": "The graph of f has a point of inflection at x = 0 because the rate of change of f changes from decreasing to increasing there, so the graph changes from concave down to concave up."
        }
      ],
      "takeaway": "An extremum is a change in direction. A point of inflection is a change in concavity."
    }
  ],
  "vocabulary": [
    {
      "id": "precalculus-1-4-polynomial",
      "topicId": "precalculus-1-4",
      "term": "Polynomial function",
      "definition": "A nonconstant polynomial function of x is any function representation that is equivalent to the analytical form p(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + aₙ₋₂xⁿ⁻² + … + a₂x² + a₁x + a₀, where n is a positive integer, aᵢ is a real number for each i from 0 to n, and aₙ is nonzero. A nonzero constant is also a polynomial function of degree zero.",
      "source": "CED 1.4.A.1"
    },
    {
      "id": "precalculus-1-4-degree",
      "topicId": "precalculus-1-4",
      "term": "Degree",
      "definition": "The polynomial has degree n, the leading term is aₙxⁿ, and the leading coefficient is aₙ.",
      "source": "CED 1.4.A.1"
    },
    {
      "id": "precalculus-1-4-leading-term",
      "topicId": "precalculus-1-4",
      "term": "Leading term",
      "definition": "The polynomial has degree n, the leading term is aₙxⁿ, and the leading coefficient is aₙ.",
      "source": "CED 1.4.A.1"
    },
    {
      "id": "precalculus-1-4-leading-coefficient",
      "topicId": "precalculus-1-4",
      "term": "Leading coefficient",
      "definition": "The polynomial has degree n, the leading term is aₙxⁿ, and the leading coefficient is aₙ.",
      "source": "CED 1.4.A.1"
    },
    {
      "id": "precalculus-1-4-relative-max",
      "topicId": "precalculus-1-4",
      "term": "Relative maximum",
      "definition": "Where a polynomial function switches between increasing and decreasing, or at the included endpoint of a polynomial with a restricted domain, the polynomial function will have a local, or relative, maximum or minimum output value.",
      "source": "CED 1.4.A.2"
    },
    {
      "id": "precalculus-1-4-relative-min",
      "topicId": "precalculus-1-4",
      "term": "Relative minimum",
      "definition": "Where a polynomial function switches between increasing and decreasing, or at the included endpoint of a polynomial with a restricted domain, the polynomial function will have a local, or relative, maximum or minimum output value.",
      "source": "CED 1.4.A.2"
    },
    {
      "id": "precalculus-1-4-absolute-max",
      "topicId": "precalculus-1-4",
      "term": "Absolute maximum",
      "definition": "If any local maximum is greater than all other function output values, then that local maximum is a global, or absolute, maximum.",
      "source": "CED 1.4.A.2"
    },
    {
      "id": "precalculus-1-4-absolute-min",
      "topicId": "precalculus-1-4",
      "term": "Absolute minimum",
      "definition": "Similarly, if any local minimum is less than all other function output values, then that local minimum is a global, or absolute, minimum.",
      "source": "CED 1.4.A.2"
    },
    {
      "id": "precalculus-1-4-vertex",
      "topicId": "precalculus-1-4",
      "term": "Vertex",
      "definition": "For a quadratic function, the global maximum or global minimum occurs at the vertex.",
      "source": "CED 1.4.A.4"
    },
    {
      "id": "precalculus-1-4-inflection",
      "topicId": "precalculus-1-4",
      "term": "Point of inflection",
      "definition": "Points of inflection of a polynomial function occur at input values where the rate of change of the function changes from increasing to decreasing or from decreasing to increasing. This occurs where the graph of a polynomial function changes from concave up to concave down or from concave down to concave up.",
      "source": "CED 1.4.A.5"
    }
  ],
  "connections": [
    {
      "id": "precalculus-1-4-c1",
      "topicId": "precalculus-1-4",
      "type": "Look back",
      "title": "Quadratic functions are the simplest case",
      "body": "A quadratic function has one vertex, which is its absolute extremum, and no point of inflection, because its average rates of change change at a constant rate in one direction.",
      "transferQuestion": "Why can the graph of a quadratic function never have a point of inflection?",
      "feedback": "Its rate of change is always increasing or always decreasing, so its concavity never changes.",
      "links": [
        {
          "topicId": "precalculus-1-3",
          "sectionId": "quadratic-rates",
          "label": "Review quadratic rates of change"
        }
      ]
    },
    {
      "id": "precalculus-1-4-c2",
      "topicId": "precalculus-1-4",
      "type": "Looking ahead",
      "title": "Zeros and end behavior complete the picture",
      "body": "Topic 1.5 links real zeros to linear factors and to how the graph meets the x-axis, and Topic 1.6 uses the leading term to describe end behavior.",
      "transferQuestion": "What would you want to know about a polynomial before sketching its graph?",
      "feedback": "Its real zeros and their multiplicities, its end behavior, and then its extrema and concavity.",
      "links": [
        {
          "topicId": "precalculus-1-6",
          "sectionId": "four-cases",
          "label": "Preview end behavior"
        }
      ]
    }
  ],
  "sourceIds": [
    "ced",
    "ced-topic-1-4"
  ],
  "definitionCoverage": {
    "status": "required",
    "conceptIds": [
      "precalculus-1-1-concave-up",
      "precalculus-1-1-concave-down",
      "precalculus-1-3-quadratic-function",
      "precalculus-1-4-polynomial",
      "precalculus-1-4-degree",
      "precalculus-1-4-leading-term",
      "precalculus-1-4-leading-coefficient",
      "precalculus-1-4-relative-max",
      "precalculus-1-4-relative-min",
      "precalculus-1-4-absolute-max",
      "precalculus-1-4-absolute-min",
      "precalculus-1-4-vertex",
      "precalculus-1-4-inflection"
    ]
  }
};

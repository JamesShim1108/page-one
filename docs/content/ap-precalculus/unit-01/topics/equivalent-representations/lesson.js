// Edit lesson text here. IDs are permanent because review links and saved attempts use them.
// Math is plain text: use − (minus), ², ³, √, ≤, ≥, ∞, → and write fractions as (numerator)/(denominator).

export const lesson = {
  "schemaVersion": 1,
  "id": "precalculus-1-11",
  "courseId": "precalculus",
  "unitId": "precalculus-1",
  "order": 11,
  "code": "1.11",
  "title": "Equivalent Representations of Polynomial and Rational Expressions",
  "period": "Unit 1",
  "status": "ready",
  "summary": "Factored and standard forms, polynomial long division, and the binomial theorem, and which form answers which question.",
  "minutes": 15,
  "learningGoals": [
    "1.11.A Rewrite polynomial and rational expressions in equivalent forms.",
    "1.11.B Determine the quotient of two polynomial functions using long division.",
    "1.11.C Rewrite the repeated product of binomials using the binomial theorem."
  ],
  "labels": {
    "goals": "AP learning objectives",
    "learn": "Understand the mathematics.",
    "context": "Where this fits."
  },
  "bigIdea": "Equivalent analytic representations of the same function reveal different information. Factored form shows real zeros, holes, asymptotes, domain, and range. Standard form shows end behavior. Long division gives slant asymptotes, and the binomial theorem expands powers of binomials.",
  "context": "Earlier topics factored to find zeros, holes, and vertical asymptotes, and compared leading terms to find end behavior. This topic names those forms and adds two tools the CED requires: polynomial long division and the binomial theorem.",
  "sections": [
    {
      "id": "choose-form",
      "title": "1.11.A · Factored form and standard form reveal different information.",
      "conceptTitle": "Choosing a form",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Because the factored form of a polynomial or rational function readily provides information about real zeros, it can reveal x-intercepts, asymptotes, holes, domain, and range. The standard form of a polynomial or rational function can reveal its end behavior. The information from different analytic representations of the same function can be used to answer questions in context."
        },
        {
          "type": "table",
          "caption": "What each form shows",
          "columns": [
            "Form",
            "Example",
            "Information it reveals readily"
          ],
          "rows": [
            [
              "Factored polynomial",
              "(x − 1)²(x + 2)",
              "Real zeros and multiplicities, x-intercepts"
            ],
            [
              "Standard form polynomial",
              "x³ − 3x + 2",
              "Degree, leading term, end behavior, y-intercept"
            ],
            [
              "Factored rational function",
              "(x − 3)(x + 1)/((x − 3)(x − 2))",
              "Domain, zeros, holes, vertical asymptotes"
            ],
            [
              "Rational function with numerator and denominator in standard form",
              "(3x² + 1)/(x² − 5)",
              "End behavior and horizontal asymptote"
            ]
          ]
        },
        {
          "type": "callout",
          "title": "Watch the domain",
          "text": "Removing a common factor changes the domain. (x² − 4)/(x − 2) equals x + 2 only for x ≠ 2."
        }
      ],
      "takeaway": "Decide what you need to find, then rewrite in the form that shows it."
    },
    {
      "id": "long-division",
      "title": "1.11.B · Polynomial long division gives f(x) = g(x)q(x) + r(x).",
      "conceptTitle": "Polynomial long division",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Polynomial long division is an algebraic process similar to numerical long division involving a quotient and remainder. If the polynomial f is divided by the polynomial g, then f can be rewritten as f(x) = g(x)q(x) + r(x), where q is the quotient, r is the remainder, and the degree of r is less than the degree of g. Dividing by g(x) gives f(x)/g(x) = q(x) + r(x)/g(x)."
        },
        {
          "type": "paragraph",
          "text": "To divide x² + 3x + 5 by x − 1: x · (x − 1) = x² − x, leaving 4x + 5; then 4 · (x − 1) = 4x − 4, leaving a remainder of 9. So x² + 3x + 5 = (x − 1)(x + 4) + 9, and (x² + 3x + 5)/(x − 1) = x + 4 + 9/(x − 1)."
        },
        {
          "type": "paragraph",
          "text": "The result of polynomial long division is helpful in finding equations of slant asymptotes. As x increases or decreases without bound, 9/(x − 1) gets arbitrarily close to 0, so the slant asymptote is y = x + 4."
        },
        {
          "type": "callout",
          "title": "Write it like the AP Exam",
          "text": "Show the identity that checks the division: (x − 1)(x + 4) + 9 = x² + 3x + 5."
        },
        {
          "type": "graph",
          "caption": "Graph of (x² + 3x + 5)/(x − 1) with its slant asymptote y = x + 4",
          "alt": "A two-branch curve with a dashed vertical asymptote at x = 1; both branches approach the dashed slanted line y = x + 4.",
          "window": {
            "x": [
              -8,
              10
            ],
            "y": [
              -20,
              30
            ]
          },
          "ticks": {
            "x": 2,
            "y": 5
          },
          "functions": [
            {
              "expr": "(x^2 + 3x + 5)/(x - 1)",
              "label": "r",
              "labelAt": 7,
              "labelPosition": "nw"
            }
          ],
          "asymptotes": [
            {
              "x": 1
            },
            {
              "slope": 1,
              "intercept": 4
            }
          ]
        }
      ],
      "takeaway": "The quotient gives the slant asymptote, and the remainder term approaches 0 at the ends."
    },
    {
      "id": "binomial-theorem",
      "title": "1.11.C · The binomial theorem uses a row of Pascal's triangle to expand (a + b)ⁿ.",
      "conceptTitle": "The binomial theorem",
      "blocks": [
        {
          "type": "paragraph",
          "text": "The binomial theorem uses the entries in a single row of Pascal's triangle to expand expressions of the form (a + b)ⁿ, including polynomial functions of the form p(x) = (x + c)ⁿ, where c is a constant. Row n gives the coefficients, the powers of a decrease from n to 0, and the powers of b increase from 0 to n."
        },
        {
          "type": "table",
          "caption": "Rows 0 through 5 of Pascal's triangle",
          "columns": [
            "Row n",
            "Entries"
          ],
          "rows": [
            [
              "0",
              "1"
            ],
            [
              "1",
              "1, 1"
            ],
            [
              "2",
              "1, 2, 1"
            ],
            [
              "3",
              "1, 3, 3, 1"
            ],
            [
              "4",
              "1, 4, 6, 4, 1"
            ],
            [
              "5",
              "1, 5, 10, 10, 5, 1"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "For (x + 2)⁴, row 4 is 1, 4, 6, 4, 1, and the powers of 2 are 1, 2, 4, 8, 16. So (x + 2)⁴ = x⁴ + 8x³ + 24x² + 32x + 16. For (2x − 1)³, use a = 2x and b = −1: 8x³ − 12x² + 6x − 1."
        }
      ],
      "takeaway": "Use row n for the coefficients, and raise the whole of a and b, signs included, to their powers."
    }
  ],
  "vocabulary": [
    {
      "id": "precalculus-1-11-factored-form",
      "topicId": "precalculus-1-11",
      "term": "Factored form",
      "definition": "Because the factored form of a polynomial or rational function readily provides information about real zeros, it can reveal information about x-intercepts, asymptotes, holes, domain, and range.",
      "source": "CED 1.11.A.1"
    },
    {
      "id": "precalculus-1-11-standard-form",
      "topicId": "precalculus-1-11",
      "term": "Standard form",
      "definition": "The standard form of a polynomial or rational function can reveal information about end behaviors of the function.",
      "source": "CED 1.11.A.2"
    },
    {
      "id": "precalculus-1-11-polynomial-long-division",
      "topicId": "precalculus-1-11",
      "term": "Polynomial long division",
      "definition": "Polynomial long division is an algebraic process similar to numerical long division involving a quotient and remainder. If the polynomial f is divided by the polynomial g, then f can be rewritten as f(x) = g(x)q(x) + r(x), where q is the quotient, r is the remainder, and the degree of r is less than the degree of g.",
      "source": "CED 1.11.B.1"
    },
    {
      "id": "precalculus-1-11-binomial-theorem",
      "topicId": "precalculus-1-11",
      "term": "Binomial theorem",
      "definition": "The binomial theorem utilizes the entries in a single row of Pascal’s Triangle to more easily expand expressions of the form (a + b)ⁿ, including polynomial functions of the form p(x) = (x + c)ⁿ, where c is a constant.",
      "source": "CED 1.11.C.1"
    }
  ],
  "connections": [
    {
      "id": "precalculus-1-11-c1",
      "topicId": "precalculus-1-11",
      "type": "Look back",
      "title": "The quotient of leading terms, made exact",
      "body": "Topic 1.7 found that the slant asymptote of (x² + 3x + 5)/(x − 1) is parallel to y = x. Long division gives the exact line, y = x + 4.",
      "transferQuestion": "Which part of the divided form gives the slant asymptote?",
      "feedback": "The quotient. The remainder term approaches 0 at the ends.",
      "links": [
        {
          "topicId": "precalculus-1-7",
          "sectionId": "slant-asymptotes",
          "label": "Review slant asymptotes"
        }
      ]
    },
    {
      "id": "precalculus-1-11-c2",
      "topicId": "precalculus-1-11",
      "type": "Looking ahead",
      "title": "Forms that show transformations",
      "body": "Topic 1.12 writes functions as transformations of a parent function, such as a·f(x + h) + k. That form shows translations and dilations directly.",
      "transferQuestion": "Compared with the graph of x², which way is the graph of (x − 3)² translated?",
      "feedback": "3 units to the right.",
      "links": [
        {
          "topicId": "precalculus-1-12",
          "sectionId": "shifts",
          "label": "Preview translations"
        }
      ]
    }
  ],
  "sourceIds": [
    "ced",
    "ced-topic-1-11"
  ],
  "definitionCoverage": {
    "status": "required",
    "conceptIds": [
      "precalculus-1-6-end-behavior",
      "precalculus-1-7-rational-function",
      "precalculus-1-7-horizontal-asymptote",
      "precalculus-1-7-slant-asymptote",
      "precalculus-1-9-vertical-asymptote",
      "precalculus-1-10-hole",
      "precalculus-1-11-factored-form",
      "precalculus-1-11-standard-form",
      "precalculus-1-11-polynomial-long-division",
      "precalculus-1-11-binomial-theorem"
    ]
  }
};

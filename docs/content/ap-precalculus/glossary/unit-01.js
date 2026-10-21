// Unit 1 reading definitions. Each entry reuses the Key Terms wording from its
// lesson's vocabulary, so the popup and the Key Terms list never disagree.
// topicIds extends a definition to later lessons that rely on the same idea.

export const glossary = {
  schemaVersion: 1,
  courseId: "precalculus",
  entries: [
    {
      id: "precalculus-1-1-function",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-function",
      },
    },
    {
      id: "precalculus-1-1-domain",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-domain",
      },
      topicIds: ["precalculus-1-9", "precalculus-1-12", "precalculus-1-13"],
    },
    {
      id: "precalculus-1-1-range",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-range",
      },
      topicIds: ["precalculus-1-12", "precalculus-1-13"],
    },
    {
      id: "precalculus-1-1-independent-variable",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-independent-variable",
      },
    },
    {
      id: "precalculus-1-1-dependent-variable",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-dependent-variable",
      },
    },
    {
      id: "precalculus-1-1-image",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-image",
      },
      aliases: ["image"],
    },
    {
      id: "precalculus-1-1-preimage",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-preimage",
      },
      aliases: ["preimage"],
    },
    {
      id: "precalculus-1-1-increasing",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-increasing",
      },
    },
    {
      id: "precalculus-1-1-decreasing",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-decreasing",
      },
    },
    {
      id: "precalculus-1-1-concave-up",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-concave-up",
      },
      topicIds: ["precalculus-1-3", "precalculus-1-4"],
    },
    {
      id: "precalculus-1-1-concave-down",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-concave-down",
      },
      topicIds: ["precalculus-1-3", "precalculus-1-4"],
    },
    {
      id: "precalculus-1-1-zero",
      from: {
        topicId: "precalculus-1-1",
        vocabularyId: "precalculus-1-1-zero",
      },
      aliases: ["zeros", "zero"],
      topicIds: ["precalculus-1-5", "precalculus-1-8"],
    },
    {
      id: "precalculus-1-2-average-rate",
      from: {
        topicId: "precalculus-1-2",
        vocabularyId: "precalculus-1-2-average-rate",
      },
      topicIds: ["precalculus-1-3", "precalculus-1-13", "precalculus-1-14"],
    },
    {
      id: "precalculus-1-2-rate-of-change",
      from: {
        topicId: "precalculus-1-2",
        vocabularyId: "precalculus-1-2-rate-of-change",
      },
      topicIds: ["precalculus-1-1"],
    },
    {
      id: "precalculus-1-3-linear-function",
      from: {
        topicId: "precalculus-1-3",
        vocabularyId: "precalculus-1-3-linear-function",
      },
    },
    {
      id: "precalculus-1-3-quadratic-function",
      from: {
        topicId: "precalculus-1-3",
        vocabularyId: "precalculus-1-3-quadratic-function",
      },
      topicIds: ["precalculus-1-4", "precalculus-1-13"],
    },
    {
      id: "precalculus-1-3-secant-line",
      from: {
        topicId: "precalculus-1-3",
        vocabularyId: "precalculus-1-3-secant-line",
      },
    },
    {
      id: "precalculus-1-4-polynomial",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-polynomial",
      },
      aliases: ["polynomial", "polynomials"],
      topicIds: ["precalculus-1-5", "precalculus-1-6"],
    },
    {
      id: "precalculus-1-4-degree",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-degree",
      },
      topicIds: ["precalculus-1-5", "precalculus-1-6"],
    },
    {
      id: "precalculus-1-4-leading-term",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-leading-term",
      },
      topicIds: ["precalculus-1-6", "precalculus-1-7"],
    },
    {
      id: "precalculus-1-4-leading-coefficient",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-leading-coefficient",
      },
      topicIds: ["precalculus-1-6", "precalculus-1-7"],
    },
    {
      id: "precalculus-1-4-relative-max",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-relative-max",
      },
      aliases: ["local maximum"],
    },
    {
      id: "precalculus-1-4-relative-min",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-relative-min",
      },
      aliases: ["local minimum"],
    },
    {
      id: "precalculus-1-4-absolute-max",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-absolute-max",
      },
      aliases: ["global maximum"],
    },
    {
      id: "precalculus-1-4-absolute-min",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-absolute-min",
      },
      aliases: ["global minimum"],
    },
    {
      id: "precalculus-1-4-vertex",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-vertex",
      },
    },
    {
      id: "precalculus-1-4-inflection",
      from: {
        topicId: "precalculus-1-4",
        vocabularyId: "precalculus-1-4-inflection",
      },
      aliases: ["points of inflection"],
    },
    {
      id: "precalculus-1-5-root",
      from: {
        topicId: "precalculus-1-5",
        vocabularyId: "precalculus-1-5-root",
      },
    },
    {
      id: "precalculus-1-5-multiplicity",
      from: {
        topicId: "precalculus-1-5",
        vocabularyId: "precalculus-1-5-multiplicity",
      },
      topicIds: ["precalculus-1-9", "precalculus-1-10"],
    },
    {
      id: "precalculus-1-5-conjugate",
      from: {
        topicId: "precalculus-1-5",
        vocabularyId: "precalculus-1-5-conjugate",
      },
    },
    {
      id: "precalculus-1-5-successive-differences",
      from: {
        topicId: "precalculus-1-5",
        vocabularyId: "precalculus-1-5-successive-differences",
      },
      topicIds: ["precalculus-1-13"],
    },
    {
      id: "precalculus-1-5-even-function",
      from: {
        topicId: "precalculus-1-5",
        vocabularyId: "precalculus-1-5-even-function",
      },
    },
    {
      id: "precalculus-1-5-odd-function",
      from: {
        topicId: "precalculus-1-5",
        vocabularyId: "precalculus-1-5-odd-function",
      },
    },
    {
      id: "precalculus-1-6-end-behavior",
      from: {
        topicId: "precalculus-1-6",
        vocabularyId: "precalculus-1-6-end-behavior",
      },
      aliases: ["end behaviors"],
      topicIds: ["precalculus-1-7", "precalculus-1-11"],
    },
    {
      id: "precalculus-1-7-rational-function",
      from: {
        topicId: "precalculus-1-7",
        vocabularyId: "precalculus-1-7-rational-function",
      },
      aliases: ["rational functions"],
      topicIds: [
        "precalculus-1-8",
        "precalculus-1-9",
        "precalculus-1-10",
        "precalculus-1-11",
        "precalculus-1-14",
      ],
    },
    {
      id: "precalculus-1-7-horizontal-asymptote",
      from: {
        topicId: "precalculus-1-7",
        vocabularyId: "precalculus-1-7-horizontal-asymptote",
      },
      aliases: ["horizontal asymptotes"],
      topicIds: ["precalculus-1-11", "precalculus-1-12", "precalculus-1-14"],
    },
    {
      id: "precalculus-1-7-slant-asymptote",
      from: {
        topicId: "precalculus-1-7",
        vocabularyId: "precalculus-1-7-slant-asymptote",
      },
      aliases: ["slant asymptotes"],
      topicIds: ["precalculus-1-11"],
    },
    {
      id: "precalculus-1-8-rational-zeros",
      from: {
        topicId: "precalculus-1-8",
        vocabularyId: "precalculus-1-8-rational-zeros",
      },
    },
    {
      id: "precalculus-1-8-rational-inequality",
      from: {
        topicId: "precalculus-1-8",
        vocabularyId: "precalculus-1-8-rational-inequality",
      },
      aliases: ["rational inequalities"],
    },
    {
      id: "precalculus-1-9-vertical-asymptote",
      from: {
        topicId: "precalculus-1-9",
        vocabularyId: "precalculus-1-9-vertical-asymptote",
      },
      aliases: ["vertical asymptotes"],
      topicIds: [
        "precalculus-1-10",
        "precalculus-1-11",
        "precalculus-1-12",
        "precalculus-1-14",
      ],
    },
    {
      id: "precalculus-1-10-hole",
      from: {
        topicId: "precalculus-1-10",
        vocabularyId: "precalculus-1-10-hole",
      },
      aliases: ["holes"],
      topicIds: ["precalculus-1-11"],
    },
    {
      id: "precalculus-1-11-factored-form",
      from: {
        topicId: "precalculus-1-11",
        vocabularyId: "precalculus-1-11-factored-form",
      },
    },
    {
      id: "precalculus-1-11-standard-form",
      from: {
        topicId: "precalculus-1-11",
        vocabularyId: "precalculus-1-11-standard-form",
      },
    },
    {
      id: "precalculus-1-11-polynomial-long-division",
      from: {
        topicId: "precalculus-1-11",
        vocabularyId: "precalculus-1-11-polynomial-long-division",
      },
      aliases: ["long division"],
    },
    {
      id: "precalculus-1-11-binomial-theorem",
      from: {
        topicId: "precalculus-1-11",
        vocabularyId: "precalculus-1-11-binomial-theorem",
      },
    },
    {
      id: "precalculus-1-12-vertical-translation",
      from: {
        topicId: "precalculus-1-12",
        vocabularyId: "precalculus-1-12-vertical-translation",
      },
    },
    {
      id: "precalculus-1-12-horizontal-translation",
      from: {
        topicId: "precalculus-1-12",
        vocabularyId: "precalculus-1-12-horizontal-translation",
      },
    },
    {
      id: "precalculus-1-12-vertical-dilation",
      from: {
        topicId: "precalculus-1-12",
        vocabularyId: "precalculus-1-12-vertical-dilation",
      },
    },
    {
      id: "precalculus-1-12-horizontal-dilation",
      from: {
        topicId: "precalculus-1-12",
        vocabularyId: "precalculus-1-12-horizontal-dilation",
      },
    },
    {
      id: "precalculus-1-13-piecewise-defined",
      from: {
        topicId: "precalculus-1-13",
        vocabularyId: "precalculus-1-13-piecewise-defined",
      },
      aliases: ["piecewise-defined"],
      topicIds: ["precalculus-1-14"],
    },
    {
      id: "precalculus-1-13-assumption",
      from: {
        topicId: "precalculus-1-13",
        vocabularyId: "precalculus-1-13-assumption",
      },
      aliases: ["assumptions"],
      topicIds: ["precalculus-1-14"],
    },
    {
      id: "precalculus-1-14-regression",
      from: {
        topicId: "precalculus-1-14",
        vocabularyId: "precalculus-1-14-regression",
      },
      aliases: ["regressions"],
    },
    {
      id: "precalculus-1-14-inversely-proportional",
      from: {
        topicId: "precalculus-1-14",
        vocabularyId: "precalculus-1-14-inversely-proportional",
      },
    },
  ],
};

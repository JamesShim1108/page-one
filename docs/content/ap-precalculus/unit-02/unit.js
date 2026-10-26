// Unit metadata and unit-level question selections. Topic order comes from each lesson's order field.

export const unit = {
  schemaVersion: 1,
  id: "precalculus-2",
  courseId: "precalculus",
  number: 2,
  title: "Exponential and Logarithmic Functions",
  period: "AP Exam weighting 25–40%",
  status: "ready",
  description:
    "Compare additive and multiplicative change, then build, compose, invert, and model with exponential and logarithmic functions, including residuals and semi-log plots.",
  // Typed-answer practice. Each part takes the unit-practice problems from its topics.
  practice: [
    {
      id: "precalculus-2-practice",
      title: "Unit 2 practice, Part 1: Topics 2.1 to 2.8",
      topicIds: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `precalculus-2-${n}`),
    },
    {
      id: "precalculus-2-practice-2",
      title: "Unit 2 practice, Part 2: Topics 2.9 to 2.15",
      topicIds: [9, 10, 11, 12, 13, 14, 15].map((n) => `precalculus-2-${n}`),
    },
  ],
  // Multiple-choice unit sets. These appear in the Multiple Choice section, not on topic pages.
  quizzes: [
    {
      id: "precalculus-2-mcq-1",
      courseId: "precalculus",
      unitId: "precalculus-2",
      title: "Unit 2 multiple choice, Part 1: Topics 2.1 to 2.8",
      quizType: "unit",
      selections: [
        {
          topicId: "precalculus-2-1",
          questionIds: [
            "precalculus-2-1-q01",
            "precalculus-2-1-q04",
            "precalculus-2-1-q06",
          ],
        },
        {
          topicId: "precalculus-2-2",
          questionIds: [
            "precalculus-2-2-q01",
            "precalculus-2-2-q04",
            "precalculus-2-2-q05",
          ],
        },
        {
          topicId: "precalculus-2-3",
          questionIds: [
            "precalculus-2-3-q01",
            "precalculus-2-3-q04",
            "precalculus-2-3-q06",
          ],
        },
        {
          topicId: "precalculus-2-4",
          questionIds: [
            "precalculus-2-4-q01",
            "precalculus-2-4-q04",
            "precalculus-2-4-q06",
          ],
        },
        {
          topicId: "precalculus-2-5",
          questionIds: [
            "precalculus-2-5-q01",
            "precalculus-2-5-q05",
            "precalculus-2-5-q09",
          ],
        },
        {
          topicId: "precalculus-2-6",
          questionIds: [
            "precalculus-2-6-q01",
            "precalculus-2-6-q03",
            "precalculus-2-6-q06",
          ],
        },
        {
          topicId: "precalculus-2-7",
          questionIds: [
            "precalculus-2-7-q01",
            "precalculus-2-7-q04",
            "precalculus-2-7-q07",
          ],
        },
        {
          topicId: "precalculus-2-8",
          questionIds: [
            "precalculus-2-8-q01",
            "precalculus-2-8-q04",
            "precalculus-2-8-q06",
          ],
        },
      ],
    },
    {
      id: "precalculus-2-mcq-2",
      courseId: "precalculus",
      unitId: "precalculus-2",
      title: "Unit 2 multiple choice, Part 2: Topics 2.9 to 2.15",
      quizType: "unit",
      selections: [
        {
          topicId: "precalculus-2-9",
          questionIds: [
            "precalculus-2-9-q01",
            "precalculus-2-9-q03",
            "precalculus-2-9-q06",
          ],
        },
        {
          topicId: "precalculus-2-10",
          questionIds: [
            "precalculus-2-10-q01",
            "precalculus-2-10-q03",
            "precalculus-2-10-q06",
          ],
        },
        {
          topicId: "precalculus-2-11",
          questionIds: [
            "precalculus-2-11-q01",
            "precalculus-2-11-q04",
            "precalculus-2-11-q09",
          ],
        },
        {
          topicId: "precalculus-2-12",
          questionIds: [
            "precalculus-2-12-q01",
            "precalculus-2-12-q03",
            "precalculus-2-12-q05",
          ],
        },
        {
          topicId: "precalculus-2-13",
          questionIds: [
            "precalculus-2-13-q01",
            "precalculus-2-13-q03",
            "precalculus-2-13-q06",
          ],
        },
        {
          topicId: "precalculus-2-14",
          questionIds: [
            "precalculus-2-14-q01",
            "precalculus-2-14-q03",
            "precalculus-2-14-q05",
          ],
        },
        {
          topicId: "precalculus-2-15",
          questionIds: [
            "precalculus-2-15-q01",
            "precalculus-2-15-q04",
            "precalculus-2-15-q07",
          ],
        },
      ],
    },
  ],
};

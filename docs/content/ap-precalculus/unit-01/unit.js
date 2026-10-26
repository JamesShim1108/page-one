// Unit metadata and unit-level question selections. Topic order comes from each lesson's order field.

export const unit = {
  schemaVersion: 1,
  id: "precalculus-1",
  courseId: "precalculus",
  number: 1,
  title: "Polynomial and Rational Functions",
  period: "AP Exam weighting 30–40%",
  status: "ready",
  description:
    "See how outputs change with inputs, then use rates of change, zeros, end behavior, asymptotes, and holes to describe polynomial and rational functions and build models from them.",
  // Typed-answer practice. Each part takes the unit-practice problems from its topics.
  practice: [
    {
      id: "precalculus-1-practice",
      title: "Unit 1 practice, Part 1: Topics 1.1 to 1.6",
      topicIds: [1, 2, 3, 4, 5, 6].map((n) => `precalculus-1-${n}`),
    },
    {
      id: "precalculus-1-practice-2",
      title: "Unit 1 practice, Part 2: Topics 1.7 to 1.14",
      topicIds: [7, 8, 9, 10, 11, 12, 13, 14].map((n) => `precalculus-1-${n}`),
    },
  ],
  // Multiple-choice unit sets. These appear in the Multiple Choice section, not on topic pages.
  quizzes: [
    {
      id: "precalculus-1-mcq-1",
      courseId: "precalculus",
      unitId: "precalculus-1",
      title: "Unit 1 multiple choice, Part 1: Topics 1.1 to 1.6",
      quizType: "unit",
      selections: [
        {
          topicId: "precalculus-1-1",
          questionIds: [
            "precalculus-1-1-q02",
            "precalculus-1-1-q06",
            "precalculus-1-1-q07",
          ],
        },
        {
          topicId: "precalculus-1-2",
          questionIds: [
            "precalculus-1-2-q02",
            "precalculus-1-2-q03",
            "precalculus-1-2-q06",
          ],
        },
        {
          topicId: "precalculus-1-3",
          questionIds: [
            "precalculus-1-3-q01",
            "precalculus-1-3-q04",
            "precalculus-1-3-q08",
          ],
        },
        {
          topicId: "precalculus-1-4",
          questionIds: [
            "precalculus-1-4-q02",
            "precalculus-1-4-q04",
            "precalculus-1-4-q08",
          ],
        },
        {
          topicId: "precalculus-1-5",
          questionIds: [
            "precalculus-1-5-q02",
            "precalculus-1-5-q06",
            "precalculus-1-5-q10",
          ],
        },
        {
          topicId: "precalculus-1-6",
          questionIds: [
            "precalculus-1-6-q02",
            "precalculus-1-6-q07",
            "precalculus-1-6-q08",
          ],
        },
      ],
    },
    {
      id: "precalculus-1-mcq-2",
      courseId: "precalculus",
      unitId: "precalculus-1",
      title: "Unit 1 multiple choice, Part 2: Topics 1.7 to 1.14",
      quizType: "unit",
      selections: [
        {
          topicId: "precalculus-1-7",
          questionIds: [
            "precalculus-1-7-q01",
            "precalculus-1-7-q03",
            "precalculus-1-7-q08",
          ],
        },
        {
          topicId: "precalculus-1-8",
          questionIds: [
            "precalculus-1-8-q02",
            "precalculus-1-8-q05",
            "precalculus-1-8-q07",
          ],
        },
        {
          topicId: "precalculus-1-9",
          questionIds: [
            "precalculus-1-9-q03",
            "precalculus-1-9-q06",
            "precalculus-1-9-q07",
          ],
        },
        {
          topicId: "precalculus-1-10",
          questionIds: [
            "precalculus-1-10-q03",
            "precalculus-1-10-q06",
            "precalculus-1-10-q07",
          ],
        },
        {
          topicId: "precalculus-1-11",
          questionIds: [
            "precalculus-1-11-q03",
            "precalculus-1-11-q06",
            "precalculus-1-11-q07",
          ],
        },
        {
          topicId: "precalculus-1-12",
          questionIds: [
            "precalculus-1-12-q02",
            "precalculus-1-12-q05",
            "precalculus-1-12-q07",
          ],
        },
        {
          topicId: "precalculus-1-13",
          questionIds: [
            "precalculus-1-13-q02",
            "precalculus-1-13-q06",
            "precalculus-1-13-q08",
          ],
        },
        {
          topicId: "precalculus-1-14",
          questionIds: [
            "precalculus-1-14-q01",
            "precalculus-1-14-q05",
            "precalculus-1-14-q08",
          ],
        },
      ],
    },
  ],
};

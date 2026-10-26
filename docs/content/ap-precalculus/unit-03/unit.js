// Unit metadata and unit-level question selections. Topic order comes from each lesson's order field.

export const unit = {
  schemaVersion: 1,
  id: "precalculus-3",
  courseId: "precalculus",
  number: 3,
  title: "Trigonometric and Polar Functions",
  period: "AP Exam weighting 30–35%",
  status: "ready",
  description:
    "Model periodic phenomena with sine, cosine, and tangent, use inverse trigonometric functions and identities, and describe how polar functions change.",
  // Typed-answer practice. Each part takes the unit-practice problems from its topics.
  practice: [
    {
      id: "precalculus-3-practice",
      title: "Unit 3 practice, Part 1: Topics 3.1 to 3.7",
      topicIds: [1, 2, 3, 4, 5, 6, 7].map((n) => `precalculus-3-${n}`),
    },
    {
      id: "precalculus-3-practice-2",
      title: "Unit 3 practice, Part 2: Topics 3.8 to 3.15",
      topicIds: [8, 9, 10, 11, 12, 13, 14, 15].map((n) => `precalculus-3-${n}`),
    },
  ],
  // Multiple-choice unit sets. These appear in the Multiple Choice section, not on topic pages.
  quizzes: [
    {
      id: "precalculus-3-mcq-1",
      courseId: "precalculus",
      unitId: "precalculus-3",
      title: "Unit 3 multiple choice, Part 1: Topics 3.1 to 3.7",
      quizType: "unit",
      selections: [
        {
          topicId: "precalculus-3-1",
          questionIds: [
            "precalculus-3-1-q01",
            "precalculus-3-1-q02",
            "precalculus-3-1-q09",
          ],
        },
        {
          topicId: "precalculus-3-2",
          questionIds: [
            "precalculus-3-2-q01",
            "precalculus-3-2-q03",
            "precalculus-3-2-q10",
          ],
        },
        {
          topicId: "precalculus-3-3",
          questionIds: [
            "precalculus-3-3-q01",
            "precalculus-3-3-q02",
            "precalculus-3-3-q05",
          ],
        },
        {
          topicId: "precalculus-3-4",
          questionIds: [
            "precalculus-3-4-q01",
            "precalculus-3-4-q03",
            "precalculus-3-4-q05",
          ],
        },
        {
          topicId: "precalculus-3-5",
          questionIds: [
            "precalculus-3-5-q01",
            "precalculus-3-5-q02",
            "precalculus-3-5-q06",
          ],
        },
        {
          topicId: "precalculus-3-6",
          questionIds: [
            "precalculus-3-6-q01",
            "precalculus-3-6-q04",
            "precalculus-3-6-q08",
          ],
        },
        {
          topicId: "precalculus-3-7",
          questionIds: [
            "precalculus-3-7-q01",
            "precalculus-3-7-q02",
            "precalculus-3-7-q05",
          ],
        },
      ],
    },
    {
      id: "precalculus-3-mcq-2",
      courseId: "precalculus",
      unitId: "precalculus-3",
      title: "Unit 3 multiple choice, Part 2: Topics 3.8 to 3.15",
      quizType: "unit",
      selections: [
        {
          topicId: "precalculus-3-8",
          questionIds: [
            "precalculus-3-8-q01",
            "precalculus-3-8-q02",
            "precalculus-3-8-q05",
          ],
        },
        {
          topicId: "precalculus-3-9",
          questionIds: [
            "precalculus-3-9-q01",
            "precalculus-3-9-q03",
            "precalculus-3-9-q07",
          ],
        },
        {
          topicId: "precalculus-3-10",
          questionIds: [
            "precalculus-3-10-q01",
            "precalculus-3-10-q04",
            "precalculus-3-10-q07",
          ],
        },
        {
          topicId: "precalculus-3-11",
          questionIds: [
            "precalculus-3-11-q01",
            "precalculus-3-11-q04",
            "precalculus-3-11-q05",
          ],
        },
        {
          topicId: "precalculus-3-12",
          questionIds: [
            "precalculus-3-12-q01",
            "precalculus-3-12-q03",
            "precalculus-3-12-q08",
          ],
        },
        {
          topicId: "precalculus-3-13",
          questionIds: [
            "precalculus-3-13-q01",
            "precalculus-3-13-q02",
            "precalculus-3-13-q04",
          ],
        },
        {
          topicId: "precalculus-3-14",
          questionIds: [
            "precalculus-3-14-q02",
            "precalculus-3-14-q04",
            "precalculus-3-14-q06",
          ],
        },
        {
          topicId: "precalculus-3-15",
          questionIds: [
            "precalculus-3-15-q01",
            "precalculus-3-15-q02",
            "precalculus-3-15-q07",
          ],
        },
      ],
    },
  ],
};

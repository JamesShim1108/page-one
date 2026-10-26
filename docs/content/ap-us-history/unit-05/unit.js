// Unit metadata and unit-level question selections. The number, title, and
// period match the CED (see ../ced.js); the build checks them. Topic order comes
// from each lesson's order field.
import { practiceSet, practiceTest } from "../kit.js";

const mixed = (code, ids) => ({
  topicId: `apush-${code.replace(".", "-")}`,
  questionIds: ids.map((id) => `apush-${code.replace(".", "-")}-${id}`),
});

export const unit = {
  schemaVersion: 1,
  id: "apush-5",
  courseId: "apush",
  number: 5,
  title: "Period 5",
  period: "1844–1877",
  status: "ready",
  description:
    "Follow Manifest Destiny and the Mexican–American War, the sectional conflict over slavery, the election of 1860 and secession, the Civil War, and Reconstruction and its failure from 1844 to 1877.",
  quizzes: [
    {
      id: "apush-5-practice",
      courseId: "apush",
      unitId: "apush-5",
      title: "Unit 5 practice",
      quizType: "unit",
      selections: [
        mixed("5.1", ["q01", "q04", "q06"]),
        mixed("5.2", ["q01", "q04", "q06"]),
        mixed("5.3", ["q01", "q04", "q06"]),
        mixed("5.4", ["q01", "q04", "q06"]),
        mixed("5.5", ["q01", "q04", "q06"]),
        mixed("5.6", ["q01", "q04", "q06"]),
        mixed("5.7", ["q01", "q04", "q06"]),
        mixed("5.8", ["q01", "q04", "q06"]),
        mixed("5.9", ["q01", "q04", "q06"]),
        mixed("5.10", ["q01", "q04", "q06"]),
        mixed("5.11", ["q01", "q04", "q06"]),
        mixed("5.12", ["q01", "q04", "q06"]),
      ],
    },
    // The Practice Test mirrors the AP multiple-choice section: one selection
    // per stimulus set, in exam order.
    practiceTest(5, [
      practiceSet("5.2", ["t01", "t02", "t03"]),
      practiceSet("5.3", ["t01", "t02", "t03"]),
      practiceSet("5.5", ["t01", "t02", "t03"]),
      practiceSet("5.6", ["t01", "t02", "t03"]),
      practiceSet("5.7", ["t01", "t02", "t03"]),
      practiceSet("5.8", ["t01", "t02", "t03"]),
      practiceSet("5.9", ["t01", "t02", "t03"]),
      practiceSet("5.10", ["t01", "t02", "t03"]),
      practiceSet("5.11", ["t01", "t02", "t03"]),
    ]),
  ],
};

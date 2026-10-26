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
  id: "apush-3",
  courseId: "apush",
  number: 3,
  title: "Period 3",
  period: "1754–1800",
  status: "ready",
  description:
    "Follow the Seven Years' War, the road to independence, the Revolution, the Articles of Confederation and the Constitution, and the first political parties from 1754 to 1800.",
  quizzes: [
    {
      id: "apush-3-practice",
      courseId: "apush",
      unitId: "apush-3",
      title: "Unit 3 practice",
      quizType: "unit",
      selections: [
        mixed("3.1", ["q01", "q04", "q06"]),
        mixed("3.2", ["q01", "q04", "q06"]),
        mixed("3.3", ["q01", "q04", "q06"]),
        mixed("3.4", ["q01", "q04", "q06"]),
        mixed("3.5", ["q01", "q04", "q06"]),
        mixed("3.6", ["q01", "q04", "q06"]),
        mixed("3.7", ["q01", "q04", "q06"]),
        mixed("3.8", ["q01", "q04", "q06"]),
        mixed("3.9", ["q01", "q04", "q06"]),
        mixed("3.10", ["q01", "q04", "q06"]),
        mixed("3.11", ["q01", "q04", "q06"]),
        mixed("3.12", ["q01", "q04", "q06"]),
        mixed("3.13", ["q01", "q04", "q06"]),
      ],
    },
    // The Practice Test mirrors the AP multiple-choice section: one selection
    // per stimulus set, in exam order.
    practiceTest(3, [
      practiceSet("3.2", ["t01", "t02", "t03"]),
      practiceSet("3.3", ["t01", "t02", "t03"]),
      practiceSet("3.4", ["t01", "t02", "t03"]),
      practiceSet("3.5", ["t01", "t02", "t03"]),
      practiceSet("3.6", ["t01", "t02", "t03"]),
      practiceSet("3.7", ["t01", "t02", "t03"]),
      practiceSet("3.8", ["t01", "t02", "t03"]),
      practiceSet("3.9", ["t01", "t02", "t03"]),
      practiceSet("3.10", ["t01", "t02", "t03"]),
    ]),
  ],
};

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
  id: "apush-1",
  courseId: "apush",
  number: 1,
  title: "Period 1",
  period: "1491–1607",
  status: "ready",
  description:
    "Follow Native American societies, European exploration, the Columbian Exchange, and the Spanish empire from 1491 to 1607.",
  quizzes: [
    {
      id: "apush-1-practice",
      courseId: "apush",
      unitId: "apush-1",
      title: "Unit 1 practice",
      quizType: "unit",
      selections: [
        mixed("1.1", ["q01", "q04", "q07"]),
        mixed("1.2", ["q01", "q04", "q06"]),
        mixed("1.3", ["q01", "q04", "q06"]),
        mixed("1.4", ["q01", "q04", "q06"]),
        mixed("1.5", ["q01", "q04", "q06"]),
        mixed("1.6", ["q01", "q04", "q06"]),
        mixed("1.7", ["q01", "q04", "q06"]),
      ],
    },
    // The Practice Test mirrors the AP multiple-choice section: one selection
    // per stimulus set, in exam order.
    practiceTest(1, [
      practiceSet("1.2", ["t01", "t02", "t03"]),
      practiceSet("1.3", ["t01", "t02", "t03"]),
      practiceSet("1.4", ["t01", "t02", "t03"]),
      practiceSet("1.5", ["t01", "t02", "t03"]),
      practiceSet("1.6", ["t01", "t02", "t03"]),
      practiceSet("1.6", ["t04", "t05", "t06"]),
      practiceSet("1.7", ["t01", "t02", "t03"]),
    ]),
  ],
};

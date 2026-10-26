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
  id: "apush-2",
  courseId: "apush",
  number: 2,
  title: "Period 2",
  period: "1607–1754",
  status: "ready",
  description:
    "Follow the Spanish, French, Dutch, and British colonies, the regions of British North America, Atlantic trade, slavery, and colonial society from 1607 to 1754.",
  quizzes: [
    {
      id: "apush-2-practice",
      courseId: "apush",
      unitId: "apush-2",
      title: "Unit 2 practice",
      quizType: "unit",
      selections: [
        mixed("2.1", ["q01", "q04", "q06"]),
        mixed("2.2", ["q01", "q04", "q06"]),
        mixed("2.3", ["q01", "q04", "q06"]),
        mixed("2.4", ["q01", "q04", "q06"]),
        mixed("2.5", ["q01", "q04", "q06"]),
        mixed("2.6", ["q01", "q04", "q06"]),
        mixed("2.7", ["q01", "q04", "q06"]),
        mixed("2.8", ["q01", "q04", "q06"]),
      ],
    },
    // The Practice Test mirrors the AP multiple-choice section: one selection
    // per stimulus set, in exam order.
    practiceTest(2, [
      practiceSet("2.2", ["t01", "t02", "t03"]),
      practiceSet("2.3", ["t01", "t02", "t03"]),
      practiceSet("2.4", ["t01", "t02", "t03"]),
      practiceSet("2.5", ["t01", "t02", "t03"]),
      practiceSet("2.6", ["t01", "t02", "t03"]),
      practiceSet("2.6", ["t04", "t05", "t06"]),
      practiceSet("2.7", ["t01", "t02", "t03"]),
    ]),
  ],
};

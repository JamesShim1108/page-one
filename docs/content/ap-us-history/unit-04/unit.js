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
  id: "apush-4",
  courseId: "apush",
  number: 4,
  title: "Period 4",
  period: "1800–1848",
  status: "ready",
  description:
    "Follow the rise of party politics and a more participatory democracy, the market revolution, westward expansion and foreign policy, the Second Great Awakening and reform, and the growth of slavery from 1800 to 1848.",
  quizzes: [
    {
      id: "apush-4-practice",
      courseId: "apush",
      unitId: "apush-4",
      title: "Unit 4 practice",
      quizType: "unit",
      selections: [
        mixed("4.1", ["q01", "q04", "q06"]),
        mixed("4.2", ["q01", "q04", "q06"]),
        mixed("4.3", ["q01", "q04", "q06"]),
        mixed("4.4", ["q01", "q04", "q06"]),
        mixed("4.5", ["q01", "q04", "q06"]),
        mixed("4.6", ["q01", "q04", "q06"]),
        mixed("4.7", ["q01", "q04", "q06"]),
        mixed("4.8", ["q01", "q04", "q06"]),
        mixed("4.9", ["q01", "q04", "q06"]),
        mixed("4.10", ["q01", "q04", "q06"]),
        mixed("4.11", ["q01", "q04", "q06"]),
        mixed("4.12", ["q01", "q04", "q06"]),
        mixed("4.13", ["q01", "q04", "q06"]),
        mixed("4.14", ["q01", "q04", "q06"]),
      ],
    },
    // The Practice Test mirrors the AP multiple-choice section: one selection
    // per stimulus set, in exam order.
    practiceTest(4, [
      practiceSet("4.2", ["t01", "t02", "t03"]),
      practiceSet("4.3", ["t01", "t02", "t03"]),
      practiceSet("4.4", ["t01", "t02", "t03"]),
      practiceSet("4.5", ["t01", "t02", "t03"]),
      practiceSet("4.7", ["t01", "t02", "t03"]),
      practiceSet("4.8", ["t01", "t02", "t03"]),
      practiceSet("4.11", ["t01", "t02", "t03"]),
      practiceSet("4.12", ["t01", "t02", "t03"]),
    ]),
  ],
};

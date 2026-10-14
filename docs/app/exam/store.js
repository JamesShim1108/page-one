// Saves one record per mock exam: the attempt in progress and short summaries
// of finished attempts. Writes go through the shared record writer, so reset,
// temporary mode, and cross-tab conflicts work as they do for other saved work.
import { courseNamespace } from "../storage/adapter.js";
import { attemptMatches, createAttempt, scoreSheet } from "./engine.js";

export const EXAM_RECORD_KIND = "mock-exam";
const HISTORY_LIMIT = 20;

function summaryFor(attempt, exam) {
  const sheet = scoreSheet(attempt, exam);
  const mcq = sheet.sections.filter((section) => section.kind === "mcq");
  return {
    attemptId: attempt.attemptId,
    finishedAt: attempt.finishedAt,
    timed: attempt.timed,
    mcqCorrect: mcq.reduce((sum, section) => sum + section.points, 0),
    mcqTotal: mcq.reduce((sum, section) => sum + section.maxPoints, 0),
    weightedPercent: sheet.weightedPercent,
    complete: sheet.complete,
  };
}

export function createExamStore({ adapter = null, exam }) {
  const { id: examId, courseId } = exam.exam;
  const writer = adapter?.createRecordWriter({
    namespace: courseNamespace(courseId, examId),
    kind: EXAM_RECORD_KIND,
    recordId: examId,
    resetScopes: [`exam:${examId}`, courseNamespace(courseId, examId), "all"],
    courseId,
    contentIdentity: exam.revision || examId,
  });
  let current = null;
  let history = [];
  let stale = false;
  let state = writer ? "pending" : "temporary";

  const ready = (writer ? writer.ready : Promise.resolve(null))
    .then((record) => {
      const payload = record?.payload;
      history = Array.isArray(payload?.history) ? payload.history : [];
      if (payload?.current && attemptMatches(payload.current, exam))
        current = payload.current;
      // An attempt from an earlier version of this exam cannot be resumed.
      else stale = Boolean(payload?.current);
      state = writer ? "clean" : "temporary";
    })
    .catch(() => {
      state = "failed";
    });

  async function persist() {
    if (!writer) return { ok: true, status: "temporary" };
    const result = await writer
      .save({ schemaVersion: 1, examId, courseId, current, history })
      .catch((error) => ({ ok: false, status: "failed", error }));
    state = result?.ok === false ? "failed" : result?.status || "saved";
    return result;
  }

  function remember(attempt) {
    if (attempt.status !== "finished") return;
    const summary = summaryFor(attempt, exam);
    history = [summary, ...history.filter((item) => item.attemptId !== attempt.attemptId)]
      .sort((a, b) => b.finishedAt - a.finishedAt)
      .slice(0, HISTORY_LIMIT);
  }

  return {
    ready,
    get attempt() {
      return current;
    },
    get history() {
      return history;
    },
    get stale() {
      return stale;
    },
    get state() {
      return state;
    },
    start({ timed = true, now = Date.now() } = {}) {
      current = createAttempt(exam, { timed, now });
      stale = false;
      return persist();
    },
    update(attempt) {
      current = attempt;
      remember(attempt);
      return persist();
    },
    discard() {
      current = null;
      stale = false;
      return persist();
    },
    flush: () => (writer ? writer.flush() : Promise.resolve(null)),
  };
}

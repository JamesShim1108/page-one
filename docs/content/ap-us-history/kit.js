// Builders for AP U.S. History topics. A topic's lesson.js and questions.js
// list only what is unique to the topic; these builders add the identity,
// ownership, CED alignment, and quiz wiring that every topic shares. Titles,
// periods, themes, and learning objectives come from ced.js, so a topic cannot
// drift from the Course and Exam Description.
//
// Output is the same plain lesson and bank objects the rest of the system
// reads. Nothing here runs in the browser.
import { ced } from "./ced.js";

const courseId = "apush";

function find(code) {
  const unitNumber = Number(code.split(".")[0]);
  const unit = ced.units.find((item) => item.number === unitNumber);
  const topic = unit?.topics.find((item) => item.code === code);
  if (!topic) throw new Error(`Topic ${code} is not in ced.js`);
  return { unit, topic, index: unit.topics.indexOf(topic) };
}

export const topicId = (code) => `${courseId}-${code.replace(".", "-")}`;

// ---------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------

/**
 * A reading section. `blocks` takes plain strings (paragraphs), two-item
 * arrays [title, text] (callouts), and ready-made block objects.
 */
export function section(id, title, lenses, blocks, takeaway) {
  return {
    id,
    title,
    conceptTitle: title,
    lenses,
    blocks: blocks.map((block) => {
      if (typeof block === "string") return { type: "paragraph", text: block };
      if (Array.isArray(block))
        return { type: "callout", title: block[0], text: block[1] };
      return block;
    }),
    takeaway,
  };
}

/**
 * A topic lesson. `goals` are what a student can do afterward; `connections`
 * are { id, type, title, body, transferQuestion, feedback, links }.
 */
export function topicLesson(
  code,
  { summary, minutes, goals, bigIdea, context, sections, connections, sourceIds = [] },
) {
  const { unit, topic, index } = find(code);
  return {
    schemaVersion: 1,
    id: topicId(code),
    unitId: `${courseId}-${unit.number}`,
    courseId,
    code,
    title: topic.title,
    period: unit.period,
    status: "ready",
    order: index + 1,
    summary,
    minutes,
    learningGoals: goals,
    bigIdea,
    context,
    sections,
    vocabulary: [],
    ...(connections ? { connections } : {}),
    sourceIds: ["ced", ...sourceIds],
  };
}

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

const SKILL_IDS = {
  1: "developments",
  2: "sourcing",
  3: "claims-evidence",
  4: "contextualization",
  5: "connections",
};
const EASY = new Set(["1.A", "4.A", "2.A", "3.A", "3.B", "5.A"]);

/**
 * One multiple-choice question.
 *   id      "q01" for topic practice, "t01" for the unit Practice Test.
 *   s       the lesson section it reviews.
 *   sub     CED sub-skill (1.A ... 5.B); the skill is implied.
 *   r       reasoning process, required for Making Connections (5.x).
 *   q       the stem.
 *   right   the correct choice; `at` is the zero-based position it takes.
 *   wrong   three [choice, why it is wrong] pairs; the first is the near miss.
 *   why     explanation shown for the correct choice.
 *   d       what separates the near miss from the correct choice.
 *   lo      learning objective letter (default: the topic's first).
 *   kc      key concept codes (default: the topic's first).
 *   stim    stimulus source block(s) for a Practice Test item.
 */
function question(code, input) {
  const { unit, topic } = find(code);
  const { id, s, sub, r, q, right, at, wrong, why, d, lo, kc, stim, level } = input;
  if (!Array.isArray(wrong) || wrong.length !== 3)
    throw new Error(`${code} ${id}: give three wrong choices`);
  const skill = SKILL_IDS[sub?.[0]];
  if (!skill) throw new Error(`${code} ${id}: unknown sub-skill ${sub}`);
  const choices = wrong.map(([text]) => text);
  const explanations = wrong.map(([, text]) => text);
  choices.splice(at, 0, right);
  explanations.splice(at, 0, why);
  const blocks = stim ? (Array.isArray(stim) ? stim : [stim]) : null;
  return {
    id: `${topicId(code)}-${id}`,
    topicId: topicId(code),
    concept: s,
    difficulty: level || (EASY.has(sub) ? "Core" : "Apply"),
    skill,
    subskill: sub,
    ...(r ? { reasoning: r } : {}),
    learningObjective: `${unit.number}.${lo || topic.learningObjectives[0]}`,
    keyConcepts: kc || [topic.keyConcepts[0]],
    ...(topic.themes.length ? { themes: topic.themes } : {}),
    prompt: q,
    choices,
    correctAnswer: at,
    explanation: why,
    sourceIds: ["ced"],
    choiceExplanations: explanations,
    nearMissIndex: at === 0 ? 1 : 0,
    distinguisher: d,
    ...(blocks ? { stimulusId: blocks[0].id, stimulusBlocks: blocks } : {}),
  };
}

/**
 * The question bank for a topic. Questions whose id starts with "q" feed the
 * quick check (the first three) and the topic quiz (all of them); "t" items
 * belong to the unit Practice Test and are selected by unit.js.
 */
export function topicBank(code, inputs) {
  const { unit, topic } = find(code);
  const questions = inputs.map((input) => question(code, input));
  const practice = questions.filter((item) => item.id.includes("-q")).map((i) => i.id);
  const base = {
    courseId,
    unitId: `${courseId}-${unit.number}`,
    topicId: topicId(code),
  };
  return {
    questions,
    quizzes: [
      {
        id: `${topicId(code)}-quick`,
        ...base,
        title: `Topic ${code} quick check`,
        quizType: "quick",
        questionIds: practice.slice(0, 3),
      },
      {
        id: `${topicId(code)}-quiz`,
        ...base,
        title: `${topic.title} topic quiz`,
        quizType: "topic",
        customPractice: true,
        questionIds: practice,
      },
    ],
  };
}

/** A Practice Test stimulus set: question ids "t01"... within one topic. */
export function practiceSet(code, ids) {
  return {
    topicId: topicId(code),
    questionIds: ids.map((id) => `${topicId(code)}-${id}`),
  };
}

/** The unit Practice Test, listing one set per stimulus in exam order. */
export function practiceTest(unitNumber, sets) {
  return {
    id: `${courseId}-${unitNumber}-practice-test`,
    courseId,
    unitId: `${courseId}-${unitNumber}`,
    title: `Unit ${unitNumber} Practice Test`,
    quizType: "unit",
    practiceTest: true,
    selections: sets,
  };
}

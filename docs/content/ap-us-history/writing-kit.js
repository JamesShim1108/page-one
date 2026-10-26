// Builders for AP U.S. History writing prompts: short-answer questions, the
// document-based question, and the long essay question, in the format that
// starts with the May 2027 exam. Each builder fills in the course-wide parts
// of a prompt (instructions, rubric, scaffold, response fields), so a unit's
// writing.js lists only what is unique to the prompt.
//
// Task directions, rubric criteria, and decision rules follow the wording of
// the AP U.S. History Course and Exam Description so practice reads like the
// exam. Scoring on Page One is the student's own self-assessment.
//
// By default every prompt is examOnly, so it appears only inside a mock exam.
// Pass examOnly: false for unit practice that students see on the Study Hub.

const courseId = "apush";
const pad = (number) => String(number).padStart(2, "0");

const scoringNote =
  "Original Page One practice in AP format. Rubric criteria follow the College Board's AP history rubrics; scoring here is your own self-assessment, not an official score.";

// ---------------------------------------------------------------------------
// Short-answer questions
// ---------------------------------------------------------------------------

const saqInstructions =
  "Answer (a), (b), and (c). Each part is worth one point. Answer the question directly, support it with specific historical evidence, and explain how the evidence supports your answer. Describe means more than mentioning a term; explain means showing how or why.";

const saqScaffold = [
  {
    label: "Answer",
    text: "Respond directly to the task verb: identify, describe, explain, or compare.",
  },
  {
    label: "Prove",
    text: "Name a specific event, development, or circumstance from the period in the prompt.",
  },
  { label: "Explain", text: "Show how or why the evidence answers the question." },
];

/**
 * A short-answer question with three parts, (a) to (c).
 * The exam format decides which stimulus each slot needs: Question 1 uses
 * secondary text sources (often two historians), Question 2 a primary text
 * source, and Question 3 a primary or secondary non-text source (an image,
 * map, or data table). Each part: { id: "a", prompt, criteria, alternatives,
 * model: { answer, prove, explain }, lenses?, review? }.
 */
export function saq({
  id,
  unitNumber,
  number,
  headline,
  prompt = "Using the sources above, answer (a), (b), and (c).",
  stimulusBlocks,
  parts,
  sourceIds,
  learningObjectives,
  keyConcepts,
  themes,
  examOnly = true,
}) {
  return {
    id,
    version: 1,
    courseId,
    unitId: `${courseId}-${unitNumber}`,
    title: `Unit ${unitNumber} SAQ ${pad(number)}`,
    headline,
    promptTitle: "Short-answer question",
    prompt,
    instructions: saqInstructions,
    note: scoringNote,
    exerciseType: "saq",
    examOnly,
    ...(stimulusBlocks ? { stimulusBlocks } : {}),
    scaffold: saqScaffold,
    parts,
    sourceIds,
    ...(learningObjectives ? { learningObjectives } : {}),
    ...(keyConcepts ? { keyConcepts } : {}),
    ...(themes ? { themes } : {}),
  };
}

/**
 * The standard part prompts for a paired-historian SAQ (Question 1), in the
 * CED's wording. Supply the historians' surnames as printed in the source
 * lines, the subject of their interpretations, and the date range students
 * draw outside evidence from.
 */
export function pairedInterpretationPrompts({ first, second, subject, period }) {
  return {
    a: `Briefly describe ONE important difference between ${first}’s and ${second}’s historical interpretations of ${subject}.`,
    b: `Briefly explain how ONE specific historical event, development, or circumstance from the period ${period} that is not specifically mentioned in the excerpts could be used to support ${first}’s argument.`,
    c: `Briefly explain how ONE specific historical event, development, or circumstance from the period ${period} that is not specifically mentioned in the excerpts could be used to support ${second}’s argument.`,
  };
}

// ---------------------------------------------------------------------------
// Essay rubrics (AP history rubrics in the CED)
// ---------------------------------------------------------------------------

const thesis = {
  id: "thesis",
  label: "Thesis/Claim",
  points: 1,
  guidance:
    "Responds to the prompt with a historically defensible thesis/claim that establishes a line of reasoning. The thesis must make a claim that responds to the prompt rather than restating or rephrasing the prompt, and must be one or more sentences in one place, in either the introduction or the conclusion.",
};

const contextualization = {
  id: "context",
  label: "Contextualization",
  points: 1,
  guidance:
    "Describes a broader historical context relevant to the prompt: events, developments, or processes that occur before, during, or continue after the time frame of the prompt. Not awarded for merely a phrase or reference.",
};

const complexityWays =
  "A complex understanding can come from sophisticated argumentation (explaining multiple themes or perspectives; multiple causes or effects, similarities or differences, or continuities or changes; both cause and effect, similarity and difference, or continuity and change; or insightful connections within and across periods or regions) or from effective use of evidence. It must be part of the argument and more than a phrase or reference.";

export const leqRubric = [
  thesis,
  contextualization,
  {
    id: "evidence",
    label: "Evidence",
    points: 2,
    guidance:
      "1 point: provides specific examples of at least two pieces of evidence relevant to the topic of the prompt. 2 points: supports an argument in response to the prompt using at least two pieces of specific and relevant evidence.",
  },
  {
    id: "analysis",
    label: "Analysis and Reasoning",
    points: 2,
    guidance: `1 point: uses historical reasoning (comparison, causation, or continuity and change) to frame or structure an argument that addresses the prompt; the reasoning may be uneven. 2 points: demonstrates a complex understanding of the historical development that is the focus of the prompt through sophisticated argumentation and/or effective use of evidence. With evidence, that can mean explaining how at least four pieces of specific evidence support a nuanced argument. ${complexityWays}`,
  },
];

export const dbqRubric = [
  thesis,
  contextualization,
  {
    id: "documents",
    label: "Evidence from the Documents",
    points: 2,
    guidance:
      "1 point: accurately describes, rather than simply quotes, the content of at least three documents to address the topic of the prompt. 2 points: accurately describes the content of at least four documents and uses them to support an argument in response to the prompt.",
  },
  {
    id: "outside",
    label: "Evidence Beyond the Documents",
    points: 1,
    guidance:
      "Uses at least one additional piece of specific historical evidence, beyond that found in the documents, relevant to an argument about the prompt. It must be described, not just named, and must differ from the evidence used for contextualization.",
  },
  {
    id: "sourcing",
    label: "Sourcing",
    points: 1,
    guidance:
      "For at least two documents, explains how or why (rather than simply identifying) the document's point of view, purpose, historical situation, or audience is relevant to an argument about the prompt.",
  },
  {
    id: "complexity",
    label: "Complexity",
    points: 1,
    guidance: `Demonstrates a complex understanding of the historical development that is the focus of the prompt. With documents, that can mean using all seven documents to support the argument, explaining the sourcing of at least four documents, or using documents and outside evidence to show different perspectives. ${complexityWays}`,
  },
];

// ---------------------------------------------------------------------------
// Long essay question (one required prompt)
// ---------------------------------------------------------------------------

const leqDirections = [
  "Respond to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.",
  "Describe a broader historical context relevant to the prompt.",
  "Support an argument in response to the prompt using at least two pieces of specific and relevant evidence.",
  "Use historical reasoning (e.g., comparison, causation, continuity or change) to frame or structure an argument that addresses the prompt.",
  "Demonstrate a complex understanding of a historical development related to the prompt through sophisticated argumentation and/or effective use of evidence.",
];

const leqScaffold = [
  { label: "Choose", text: "Pick the development(s) in the prompt you know best." },
  { label: "Claim", text: "Answer the task and preview your line of reasoning." },
  {
    label: "Context",
    text: "Describe a broader development before or during the period.",
  },
  { label: "Evidence", text: "Use at least two specific examples and explain each one." },
  {
    label: "Complexity",
    text: "Qualify your claim or weigh causes, effects, or changes.",
  },
];

const reviewList = (topicId, review) =>
  topicId && review ? [{ topicId, ...review }] : [];

/**
 * The long essay question. On the exam it is one required prompt covering about
 * half of the course's chronology: a context statement naming developments,
 * then the task, then a note that students may focus on one or more of them.
 * `units` lists every unit the prompt covers (at least three for an exam
 * prompt), and `dateRange` is the span it names, such as "1776–1876".
 */
export function leq({
  id,
  unitNumber,
  units,
  dateRange,
  headline,
  context,
  task,
  focusNote,
  reasoning,
  sourceIds,
  topicId,
  outlineReview,
  essayReview,
  modelResponse,
  modelNotes,
  alternateModel,
  commonErrors,
  learningObjectives,
  keyConcepts,
  themes,
  examOnly = true,
}) {
  return {
    id,
    version: 1,
    courseId,
    unitId: `${courseId}-${unitNumber}`,
    ...(units ? { units } : {}),
    ...(dateRange ? { dateRange } : {}),
    title: `LEQ: ${headline}`,
    headline,
    promptTitle: "Long essay question",
    prompt: `${context} ${task} ${focusNote} You are not expected to address the entire time period in your response.`,
    instructions: `In your response you should do the following: ${leqDirections.join(" ")}`,
    note: scoringNote,
    exerciseType: "leq",
    ...(reasoning ? { reasoning } : {}),
    examOnly,
    sourceIds,
    responseFields: [
      {
        id: "outline",
        label: "Optional outline",
        prompt: "Plan your claim, context, evidence, and reasoning before drafting.",
        required: false,
        rows: 6,
        help: "Optional planning notes; the essay is the required response.",
        review: reviewList(topicId, outlineReview),
      },
      {
        id: "essay",
        label: "Essay response",
        prompt:
          "Write the full essay. Make the line of reasoning visible and explain why each example supports the claim.",
        required: true,
        rows: 16,
        help: "Informational word count only. No automatic grading.",
        review: reviewList(topicId, essayReview),
      },
    ],
    rubric: leqRubric,
    scaffold: leqScaffold,
    modelResponse,
    modelNotes,
    alternateModel,
    commonErrors,
    ...(learningObjectives ? { learningObjectives } : {}),
    ...(keyConcepts ? { keyConcepts } : {}),
    ...(themes ? { themes } : {}),
  };
}

// ---------------------------------------------------------------------------
// Document-based question
// ---------------------------------------------------------------------------

const dbqDirections = [
  "Respond to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.",
  "Describe a broader historical context relevant to the prompt.",
  "Support an argument in response to the prompt using at least four documents.",
  "Use at least one additional piece of specific historical evidence (beyond that found in the documents) relevant to an argument about the prompt.",
  "For at least two documents, explain how or why the document's point of view, purpose, historical situation, and/or audience is relevant to an argument.",
  "Demonstrate a complex understanding of a historical development related to the prompt through sophisticated argumentation and/or effective use of evidence.",
];

const dbqScaffold = [
  {
    label: "Read",
    text: "Note each document's author, date, and purpose before its content.",
  },
  {
    label: "Group",
    text: "Sort documents by the claim they support, not by their order.",
  },
  {
    label: "Argue",
    text: "Use documents as evidence and explain how each supports your claim.",
  },
  {
    label: "Source",
    text: "Explain why point of view, purpose, situation, or audience matters for two documents.",
  },
  { label: "Qualify", text: "Show where the pattern varied by region, group, or time." },
];

/**
 * A DBQ document built from a record in excerpts.js. A passage reuses its text
 * unchanged; an image (cartoon, poster, photograph, map) reuses its asset,
 * alt text, and description. Either way a correction to the excerpt reaches
 * every prompt that uses it.
 */
export function dbqDocument({
  id,
  label,
  excerpt,
  author,
  date,
  setting,
  audience,
  rights,
  sourceId,
}) {
  const visual = excerpt.medium === "image";
  return {
    id,
    label,
    sourceType: excerpt.sourceType || "primary",
    attribution: excerpt.attribution,
    ...(visual
      ? {
          medium: "image",
          assetId: excerpt.assetId,
          alt: excerpt.alt,
          description: excerpt.description,
        }
      : { content: excerpt.text }),
    citation: excerpt.citation,
    ...(excerpt.note ? { note: excerpt.note } : {}),
    sourceNote: visual
      ? "Image and description are reused unchanged from Page One's excerpt library; credit and license are in the course's asset manifest."
      : "Excerpt text is reused unchanged from Page One's excerpt library, where it is checked against the edition named in the citation.",
    metadata: { author, date, setting, audience, rights },
    sourceIds: [sourceId],
    status: "verified",
  };
}

/** A seven-document DBQ. Exam DBQs fall between 1754 and 1980 (Units 3-8). */
export function dbq({
  id,
  unitNumber,
  units,
  dateRange,
  headline,
  prompt,
  sourceIds,
  sourceLocators,
  topicId,
  noteReview,
  essayReview,
  documents,
  modelResponse,
  modelNotes,
  alternateModel,
  commonErrors,
  learningObjectives,
  keyConcepts,
  themes,
  examOnly = true,
}) {
  return {
    id,
    version: 1,
    courseId,
    unitId: `${courseId}-${unitNumber}`,
    ...(units ? { units } : {}),
    ...(dateRange ? { dateRange } : {}),
    title: `DBQ: ${headline}`,
    headline,
    promptTitle: "Document-based question",
    prompt,
    instructions: `In your response you should do the following: ${dbqDirections.join(" ")}`,
    note: scoringNote,
    exerciseType: "dbq",
    examOnly,
    availability: "available",
    sourceIds,
    ...(sourceLocators ? { sourceLocators } : {}),
    responseFields: [
      ...[1, 2, 3, 4, 5, 6, 7].map((number) => ({
        id: `doc-${number}-notes`,
        label: `Document ${number} notes`,
        prompt:
          "Note what this document shows, which part of your argument it supports, and how its point of view, purpose, situation, or audience matters.",
        required: false,
        rows: 4,
        review: reviewList(topicId, noteReview),
      })),
      {
        id: "essay",
        label: "DBQ essay",
        prompt:
          "Write the full essay: thesis, contextualization, at least four documents used as evidence, sourcing for at least two, outside evidence, and a complex argument.",
        required: true,
        rows: 20,
        review: reviewList(topicId, essayReview),
      },
    ],
    rubric: dbqRubric,
    scaffold: dbqScaffold,
    documents,
    modelResponse,
    modelNotes,
    alternateModel,
    commonErrors,
    ...(learningObjectives ? { learningObjectives } : {}),
    ...(keyConcepts ? { keyConcepts } : {}),
    ...(themes ? { themes } : {}),
  };
}

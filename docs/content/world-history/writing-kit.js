// Builders for the writing prompts written for full-length mock exams. Every
// prompt they build is examOnly: it appears only inside a mock exam, never on a
// unit page or at its own /writing route, so students meet it fresh. Each
// builder fills in the course-wide parts of a prompt (instructions, rubric,
// scaffold, response fields) so a unit's writing.js lists only what is unique
// to the prompt. Unit practice prompts written earlier spell these out in full.

const saqInstructions =
  "Answer all three parts. For each part, Answer the question directly, Prove it with specific historical evidence, and Explain how the evidence supports your answer. On the AP exam each part earns one point. This is self-assessment practice, not official College Board scoring.";

const saqNote =
  "Original Page One practice in AP short-answer format. Model answers show one strong response; other accurate, well-supported answers can earn the point.";

const saqScaffold = [
  {
    label: "Answer",
    text: "Respond directly to the task verb: identify, describe, or explain.",
  },
  { label: "Prove", text: "Name a specific person, place, institution, or development." },
  { label: "Explain", text: "Show how or why the evidence answers the question." },
];

const essayNote =
  "Original Page One practice. Rubric categories follow the structure of the College Board's AP history rubrics; scoring here is your own self-assessment, not an official score.";

const leqRubric = [
  {
    id: "thesis",
    label: "Thesis",
    points: 1,
    guidance:
      "Responds to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.",
  },
  {
    id: "context",
    label: "Contextualization",
    points: 1,
    guidance:
      "Describes a broader historical context relevant to the prompt: developments before, during, or continuing after the period.",
  },
  {
    id: "evidence",
    label: "Evidence",
    points: 2,
    guidance:
      "1 point: provides at least two specific historical examples relevant to the prompt. 2 points: uses specific and relevant examples to support an argument in response to the prompt.",
  },
  {
    id: "analysis",
    label: "Analysis and reasoning",
    points: 2,
    guidance:
      "1 point: uses comparison, causation, or continuity and change to frame or structure the argument. 2 points: demonstrates a complex understanding, for example by explaining multiple causes, weighing similarities and differences, or using evidence to qualify or modify the argument.",
  },
];

const leqScaffold = [
  { label: "Claim", text: "Answer the prompt and preview your line of reasoning." },
  {
    label: "Context",
    text: "Describe a broader development before or during the period.",
  },
  {
    label: "Evidence",
    text: "Use at least two specific examples, and explain each one.",
  },
  {
    label: "Reasoning",
    text: "Structure the essay around the reasoning process and qualify your claim.",
  },
];

const dbqRubric = [
  {
    id: "thesis",
    label: "Thesis",
    points: 1,
    guidance:
      "Responds to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.",
  },
  {
    id: "context",
    label: "Contextualization",
    points: 1,
    guidance: "Describes a broader historical context relevant to the prompt.",
  },
  {
    id: "documents",
    label: "Evidence from the documents",
    points: 2,
    guidance:
      "1 point: accurately describes the content of at least three documents to address the prompt. 2 points: uses the content of at least four documents to support an argument in response to the prompt.",
  },
  {
    id: "outside",
    label: "Evidence beyond the documents",
    points: 1,
    guidance:
      "Uses at least one additional piece of specific historical evidence, not found in the documents, that is relevant to an argument about the prompt.",
  },
  {
    id: "sourcing",
    label: "Sourcing",
    points: 1,
    guidance:
      "For at least two documents, explains how or why the document's point of view, purpose, historical situation, or audience is relevant to an argument.",
  },
  {
    id: "complexity",
    label: "Complexity",
    points: 1,
    guidance:
      "Demonstrates a complex understanding of the topic, using evidence to corroborate, qualify, or modify an argument.",
  },
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
  {
    label: "Qualify",
    text: "Show where the pattern varied by region or social group.",
  },
];

const pad = (number) => String(number).padStart(2, "0");

/** A stimulus-based short-answer question with three scored parts. */
export function saq({
  id,
  unitNumber,
  number,
  headline,
  promptTitle,
  prompt,
  stimulusBlocks,
  parts,
  sourceIds,
}) {
  return {
    id,
    version: 1,
    courseId: "world",
    unitId: `world-${unitNumber}`,
    title: `Unit ${unitNumber} SAQ ${pad(number)}`,
    headline,
    promptTitle,
    prompt,
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    examOnly: true,
    ...(stimulusBlocks ? { stimulusBlocks } : {}),
    scaffold: saqScaffold,
    parts,
    sourceIds,
  };
}

/** A long essay question (comparison, causation, or continuity and change). */
export function leq({
  id,
  unitNumber,
  headline,
  prompt,
  sourceIds,
  topicId,
  outlineReview,
  essayReview,
  modelResponse,
  modelNotes,
  alternateModel,
  commonErrors,
}) {
  return {
    id,
    version: 1,
    courseId: "world",
    unitId: `world-${unitNumber}`,
    title: `Unit ${unitNumber} LEQ: ${headline}`,
    headline,
    promptTitle: "Long essay question",
    prompt,
    instructions:
      "Develop an argument in one organized essay. Include a thesis, contextualization, specific evidence, and historical reasoning. This is untimed practice in AP long-essay format, not a full exam simulation.",
    note: essayNote,
    exerciseType: "leq",
    examOnly: true,
    sourceIds,
    responseFields: [
      {
        id: "outline",
        label: "Optional outline",
        prompt: "Plan your claim, context, evidence, and reasoning before drafting.",
        required: false,
        rows: 6,
        help: "Optional planning notes; the essay is the required response.",
        review: [{ topicId, ...outlineReview }],
      },
      {
        id: "essay",
        label: "Essay response",
        prompt:
          "Write the full essay. Make the line of reasoning visible and explain why each example supports the claim.",
        required: true,
        rows: 16,
        help: "Informational word count only. No timer or automatic grading.",
        review: [{ topicId, ...essayReview }],
      },
    ],
    rubric: leqRubric,
    scaffold: leqScaffold,
    modelResponse,
    modelNotes,
    alternateModel,
    commonErrors,
  };
}

/**
 * A DBQ document built from an excerpt in excerpts.js. The excerpt's text,
 * attribution, citation, and note are reused unchanged, so a correction to the
 * excerpt reaches every question and prompt that uses it.
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
  return {
    id,
    label,
    sourceType: "primary",
    attribution: excerpt.attribution,
    content: excerpt.text,
    citation: excerpt.citation,
    ...(excerpt.note ? { note: excerpt.note } : {}),
    sourceNote:
      "Excerpt text is reused unchanged from Page One's excerpt library, where it is checked against the edition named in the citation.",
    metadata: { author, date, setting, audience, rights },
    sourceIds: [sourceId],
    status: "verified",
  };
}

/** A seven-document DBQ. */
export function dbq({
  id,
  unitNumber,
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
}) {
  return {
    id,
    version: 1,
    courseId: "world",
    unitId: `world-${unitNumber}`,
    title: `Unit ${unitNumber} DBQ: ${headline}`,
    headline,
    promptTitle: "Document-based question",
    prompt,
    instructions:
      "Use at least four documents to support an argument. For at least two documents, explain how the author's point of view, purpose, historical situation, or audience is relevant to your argument. Use at least one piece of specific historical evidence beyond the documents. Include contextualization and develop a complex argument. This is untimed self-assessment practice in AP format.",
    note: essayNote,
    exerciseType: "dbq",
    examOnly: true,
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
        review: [{ topicId, ...noteReview }],
      })),
      {
        id: "essay",
        label: "DBQ essay",
        prompt:
          "Write the full essay: thesis, contextualization, at least four documents used as evidence, sourcing for at least two, outside evidence, and a qualified argument.",
        required: true,
        rows: 20,
        review: [{ topicId, ...essayReview }],
      },
    ],
    rubric: dbqRubric,
    scaffold: dbqScaffold,
    documents,
    modelResponse,
    modelNotes,
    alternateModel,
    commonErrors,
  };
}

// Unit 7 writing practice: a stimulus-based SAQ with model APE responses.
// Lenses name the InSPECT categories in ../framework.js. Increment `version` when a
// prompt or its fields change enough to invalidate saved drafts.
import { excerpts } from "../excerpts.js";

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

export const writingQuizzes = [
  {
    id: "world-7-saq-01",
    version: 1,
    courseId: "world",
    unitId: "world-7",
    title: "Unit 7 SAQ 01",
    headline: "Keynes and the peace of 1919",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.keynesPeace],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["P", "E"],
        prompt: "Identify ONE criticism Keynes makes of the peace treaty.",
        criteria: [
          "States a specific criticism from the passage.",
          "Connects it to the treaty.",
        ],
        model: {
          answer:
            "Keynes criticizes the treaty for doing nothing to restore Europe's economy.",
          prove:
            "He writes that the treaty “includes no provisions for the economic rehabilitation of Europe” and nothing to stabilize the new states.",
          explain:
            "Without economic recovery, he believed Europe would remain unstable and resentful.",
        },
        alternatives:
          "Answers can also identify his warning that impoverishing Central Europe would lead to vengeance and revolution.",
        review: [
          {
            topicId: "world-7-5",
            sectionId: "versailles",
            label: "The Treaty of Versailles",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P"],
        prompt:
          "Explain ONE development in the period 1919 to 1939 that supports Keynes's prediction.",
        criteria: [
          "Names a specific development.",
          "Explains how it connects to the treaty's effects.",
        ],
        model: {
          answer: "The rise of the Nazi Party supports Keynes's warning about vengeance.",
          prove:
            "During the Depression, Hitler won support by denouncing the Versailles treaty, and after 1933 he rearmed Germany in violation of it.",
          explain:
            "German resentment of a punishing peace, combined with economic crisis, helped an extremist movement take power and pursue revenge.",
        },
        alternatives:
          "Answers can also explain German hyperinflation in 1923, the occupation of the Ruhr, or the failure of the League of Nations.",
        review: [
          {
            topicId: "world-7-6",
            sectionId: "fascism",
            label: "The rise of fascism",
          },
        ],
      },
      {
        id: "c",
        lenses: ["C"],
        prompt:
          "Explain ONE way Keynes's position might affect how historians use this source.",
        criteria: [
          "Identifies a feature of Keynes's position or purpose.",
          "Explains its effect on the source's use.",
        ],
        model: {
          answer:
            "Keynes was an insider at the peace conference who resigned in protest, so his account is informed but also argumentative.",
          prove:
            "He served as the British Treasury's representative in Paris until June 1919 and wrote the book to persuade readers to revise the treaty.",
          explain:
            "Historians value his knowledge of the negotiations but treat his predictions and judgments as part of an argument, not neutral description.",
        },
        alternatives:
          "Answers can also note that as an economist he focused on economic terms more than security concerns, especially French fears of Germany.",
        review: [
          {
            topicId: "world-7-5",
            sectionId: "versailles",
            label: "The Treaty of Versailles",
          },
        ],
      },
    ],
    sourceIds: ["keynes-consequences", "ced-topic-7-5", "ced"],
  },
];

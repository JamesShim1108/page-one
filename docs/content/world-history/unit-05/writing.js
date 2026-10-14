// Unit 5 writing practice: a stimulus-based SAQ with model APE responses.
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
    id: "world-5-saq-01",
    version: 1,
    courseId: "world",
    unitId: "world-5",
    title: "Unit 5 SAQ 01",
    headline: "Locke and the right of revolution",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.lockeConsent],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["P", "C"],
        prompt:
          "Identify ONE argument Locke makes about the source of political authority.",
        criteria: [
          "States a specific argument from the passage.",
          "Connects it to where authority comes from.",
        ],
        model: {
          answer:
            "Locke argues that political authority comes from the consent of the people.",
          prove:
            "He writes that no one can be subjected to the political power of another “without his own consent.”",
          explain:
            "If authority rests on consent, rulers hold power only as long as they serve the people who gave it.",
        },
        alternatives:
          "Answers can also identify his claim that rulers who seize arbitrary power forfeit it and that power then devolves to the people.",
        review: [
          {
            topicId: "world-5-1",
            sectionId: "natural-rights",
            label: "Natural rights",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P"],
        prompt:
          "Explain ONE way ideas like Locke's influenced a revolution in the period 1750 to 1900.",
        criteria: [
          "Names a specific revolution.",
          "Explains how natural rights or consent shaped it.",
        ],
        model: {
          answer:
            "Locke's ideas shaped the American colonists' justification for independence.",
          prove:
            "The Declaration of Independence of 1776 said governments derive their powers from the consent of the governed and may be replaced when they destroy people's rights.",
          explain:
            "Colonists used Locke's argument to claim that Britain had broken its trust, which made revolt a defense of rights rather than rebellion.",
        },
        alternatives:
          "Answers can also explain the French Declaration of the Rights of Man, the Haitian Revolution's claims to liberty, or Latin American independence.",
        review: [
          {
            topicId: "world-5-2",
            sectionId: "atlantic-revolutions",
            label: "American and French revolutions",
          },
        ],
      },
      {
        id: "c",
        lenses: ["S", "C"],
        prompt:
          "Explain ONE way the application of ideas like Locke's was limited in the period 1750 to 1900.",
        criteria: [
          "Names a specific group or situation.",
          "Explains how rights were limited for that group.",
        ],
        model: {
          answer:
            "Many revolutionaries did not extend natural rights to enslaved people.",
          prove:
            "The United States declared that all men are created equal in 1776, yet kept slavery until 1865.",
          explain:
            "Leaders who claimed rights for themselves protected slavery for economic and political reasons, which shows the limits of Enlightenment ideals in practice.",
        },
        alternatives:
          "Answers can also explain the exclusion of women, shown by Wollstonecraft's and Olympe de Gouges's protests, or the exclusion of Indigenous and colonized peoples.",
        review: [
          {
            topicId: "world-5-1",
            sectionId: "reform-movements",
            label: "Reform movements",
          },
        ],
      },
    ],
    sourceIds: ["locke-second-treatise", "ced-topic-5-1", "ced"],
  },
];

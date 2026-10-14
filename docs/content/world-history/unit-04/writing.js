// Unit 4 writing practice: a stimulus-based SAQ with model APE responses.
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
    id: "world-4-saq-01",
    version: 1,
    courseId: "world",
    unitId: "world-4",
    title: "Unit 4 SAQ 01",
    headline: "Smith on the discoveries",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.smithDiscovery],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["E", "S"],
        prompt: "Identify ONE effect of the voyages of exploration that Smith describes.",
        criteria: [
          "Names a specific effect stated in the passage.",
          "Connects the effect to the voyages of exploration.",
        ],
        model: {
          answer:
            "Smith says the voyages connected distant parts of the world through trade.",
          prove:
            "He writes that the discoveries united “the most distant parts of the world,” letting them relieve one another's wants and encourage one another's industry.",
          explain:
            "Sea routes to the Americas and around Africa let goods move between regions that had never traded directly, creating a global economy.",
        },
        alternatives:
          "Answers can also identify the misfortunes suffered by Indigenous peoples, or the strengthening of the mercantile system.",
        review: [
          {
            topicId: "world-4-8",
            sectionId: "what-changed",
            label: "What changed",
          },
        ],
      },
      {
        id: "b",
        lenses: ["E", "S", "P"],
        prompt:
          "Explain ONE way European expansion caused the “dreadful misfortunes” Smith describes for the natives of the Americas in the period 1450 to 1750.",
        criteria: [
          "Names a specific development from the period.",
          "Explains how it harmed Indigenous peoples.",
        ],
        model: {
          answer:
            "Spanish labor systems forced Indigenous people into dangerous work for colonial profit.",
          prove:
            "Under the Spanish mit'a, Andean communities had to send men to the silver mines of Potosí, where many died from accidents and mercury poisoning.",
          explain:
            "Because colonial wealth depended on silver, Spain used its power to force Indigenous labor, which Smith calls the “superiority of force” that allowed injustice.",
        },
        alternatives:
          "Answers can also explain the encomienda system, epidemic disease such as smallpox, or the conquest of the Mexica and Inca.",
        review: [
          {
            topicId: "world-4-5",
            sectionId: "labor-systems",
            label: "Coerced labor",
          },
          {
            topicId: "world-4-3",
            sectionId: "disease",
            label: "Disease",
          },
        ],
      },
      {
        id: "c",
        lenses: ["C", "E"],
        prompt:
          "Explain ONE way Smith's purpose in writing might affect how historians use this passage.",
        criteria: [
          "Identifies a specific feature of Smith's purpose or point of view.",
          "Explains how it affects the passage's usefulness as evidence.",
        ],
        model: {
          answer:
            "Smith wrote to criticize mercantilism, so he presents colonial trade in a way that supports his case for freer trade.",
          prove:
            "He describes the discoveries raising the mercantile system to “splendour and glory,” a system the rest of his book attacks.",
          explain:
            "Historians can use the passage as evidence of an influential 1776 view, but they should check his economic claims against other evidence because he was making an argument.",
        },
        alternatives:
          "Answers can also note that Smith wrote in 1776, centuries after the voyages, so the passage reflects later reflection rather than eyewitness experience.",
        review: [
          {
            topicId: "world-4-2",
            sectionId: "motives",
            label: "Mercantilism",
          },
        ],
      },
    ],
    sourceIds: ["smith-wealth-of-nations", "ced-topic-4-8", "ced"],
  },
];

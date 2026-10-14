// Unit 6 writing practice: a stimulus-based SAQ with model APE responses.
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
    id: "world-6-saq-01",
    version: 1,
    courseId: "world",
    unitId: "world-6",
    title: "Unit 6 SAQ 01",
    headline: "Mill on liberty and empire",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.millDespotism],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["P", "C"],
        prompt:
          "Identify ONE claim Mill makes about which societies his principle of liberty applies to.",
        criteria: [
          "States a specific claim from the passage.",
          "Connects it to who deserves liberty.",
        ],
        model: {
          answer:
            "Mill claims that liberty applies only to societies he considered mature or advanced.",
          prove:
            "He writes that “Liberty, as a principle, has no application” until people can be improved “by free and equal discussion.”",
          explain:
            "This lets Mill defend freedom in Britain while accepting despotic rule over peoples he labeled backward.",
        },
        alternatives:
          "Answers can also identify his claim that despotism is legitimate over “barbarians” if the goal is their improvement.",
        review: [
          {
            topicId: "world-6-1",
            sectionId: "ideologies",
            label: "Justifying empire",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "E"],
        prompt:
          "Explain ONE way European states put ideas like Mill's into practice in the period 1750 to 1900.",
        criteria: [
          "Names a specific colonial policy or region.",
          "Explains how it reflected the idea of rule for improvement.",
        ],
        model: {
          answer: "Britain ruled India directly while claiming to improve it.",
          prove:
            "After 1858 the British Crown governed India, building railways and introducing English-language education for an elite while denying Indians self-government.",
          explain:
            "British officials presented these projects as progress, which echoes Mill's view that despotism was acceptable when aimed at improvement.",
        },
        alternatives:
          "Answers can also explain mission schools and the civilizing mission in Africa, or the US justification for ruling the Philippines.",
        review: [
          {
            topicId: "world-6-2",
            sectionId: "existing-colonies",
            label: "British India",
          },
          {
            topicId: "world-6-1",
            sectionId: "ideologies",
            label: "The civilizing mission",
          },
        ],
      },
      {
        id: "c",
        lenses: ["C"],
        prompt:
          "Explain ONE way Mill's position or situation might have shaped his argument.",
        criteria: [
          "Identifies a specific feature of Mill's situation.",
          "Explains how it shaped the passage.",
        ],
        model: {
          answer:
            "Mill worked for the East India Company for decades, so he had a stake in defending British rule in India.",
          prove:
            "He served the company from 1823 to 1858, and in the passage he names the Mughal emperor Akbar as an example of a good despot.",
          explain:
            "A man whose career depended on ruling India had reason to argue that rule without consent could be legitimate there.",
        },
        alternatives:
          "Answers can also explain that Mill wrote as a British liberal in an age of imperial confidence, when ideas of European superiority were widespread.",
        review: [
          {
            topicId: "world-6-1",
            sectionId: "ideologies",
            label: "Justifying empire",
          },
        ],
      },
    ],
    sourceIds: ["mill-on-liberty", "ced-topic-6-1", "ced"],
  },
];

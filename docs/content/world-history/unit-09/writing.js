// Unit 9 writing practice: a stimulus-based SAQ with model APE responses.
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
    id: "world-9-saq-01",
    version: 1,
    courseId: "world",
    unitId: "world-9",
    title: "Unit 9 SAQ 01",
    headline: "Nixon and the price of pollution",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.nixonEnvironment],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["In", "E"],
        prompt: "Identify ONE claim Nixon makes about the cost of pollution.",
        criteria: [
          "States a specific claim from the passage.",
          "Connects it to the cost of pollution or its control.",
        ],
        model: {
          answer:
            "Nixon claims that clean air and water have a real cost that the country can no longer ignore.",
          prove:
            "He says that “clean air is not free, and neither is clean water,” and that past carelessness created “a debt to nature” that “is being called.”",
          explain:
            "By describing pollution as a debt, he argues that Americans must now pay to repair damage they once treated as free.",
        },
        alternatives:
          "Answers can also identify his claim that the price of goods should include the cost of producing and disposing of them without harming the environment.",
        review: [
          {
            topicId: "world-9-3",
            sectionId: "environmental-debates",
            label: "Debating responses",
          },
        ],
      },
      {
        id: "b",
        lenses: ["In", "E"],
        prompt:
          "Explain ONE way that economic or population growth in the period 1900 to the present contributed to the environmental problems Nixon describes.",
        criteria: [
          "Names a specific economic or demographic development.",
          "Explains how it damaged air, land, or water.",
        ],
        model: {
          answer:
            "Industrial growth powered by fossil fuels released pollutants into the air and water.",
          prove:
            "After World War II, factories, power plants, and tens of millions of new cars burned coal and oil, and Nixon himself called the automobile the country's worst air polluter.",
          explain:
            "As production and consumption grew, so did emissions and waste, which damaged the air, land, and water Nixon wanted to restore.",
        },
        alternatives:
          "Answers can also explain how rapid population growth increased demand for land, water, and energy, or how the Green Revolution's fertilizers and pesticides polluted soil and water.",
        review: [
          {
            topicId: "world-9-3",
            sectionId: "environmental-change",
            label: "A changing planet",
          },
        ],
      },
      {
        id: "c",
        lenses: ["In", "P"],
        prompt:
          "Explain ONE limitation of Nixon's speech as evidence for understanding global debates about the environment after 1970.",
        criteria: [
          "Identifies a specific feature of the source's purpose, audience, or perspective.",
          "Explains why it limits what the source shows about global debates.",
        ],
        model: {
          answer:
            "The speech presents the view of a wealthy industrial country and focuses only on American air, land, and water.",
          prove:
            "Nixon was addressing Congress to win support for US laws, and he speaks of clean air and water as the “birthright of every American.”",
          explain:
            "It does not show the view of developing countries, which later argued at Kyoto that rich nations had caused most pollution and that poorer nations needed room to grow.",
        },
        alternatives:
          "Answers can also explain that, as a political speech, it was meant to persuade and may promise more than the government later delivered, or that it predates scientific concern about global warming.",
        review: [
          {
            topicId: "world-9-3",
            sectionId: "environmental-debates",
            label: "Debating responses",
          },
        ],
      },
    ],
    sourceIds: ["nixon-sotu-1970", "ced-topic-9-3", "ced"],
  },
];

// Unit 8 writing practice: a stimulus-based SAQ with model APE responses.
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
    id: "world-8-saq-01",
    version: 1,
    courseId: "world",
    unitId: "world-8",
    title: "Unit 8 SAQ 01",
    headline: "Kennedy, the new states, and the arms race",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.kennedyPledge],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["P"],
        prompt: "Identify ONE pledge Kennedy makes to newly independent states.",
        criteria: [
          "States a specific pledge from the passage.",
          "Connects it to the new states Kennedy addresses.",
        ],
        model: {
          answer:
            "Kennedy pledges that the end of colonial rule will not be followed by a harsher form of domination.",
          prove:
            "He promises the “new States” that “one form of colonial control shall not have passed away merely to be replaced by a far more iron tyranny.”",
          explain:
            "By “iron tyranny” he means Soviet-backed communism, so the pledge offers US support against communist takeovers in former colonies.",
        },
        alternatives:
          "Answers can also identify his statement that the United States will not always expect the new states to support its views.",
        review: [
          {
            topicId: "world-8-2",
            sectionId: "nonalignment",
            label: "Choosing not to choose",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "E"],
        prompt:
          "Explain ONE way the United States or the Soviet Union competed for influence in newly independent states in the period 1950 to 1990.",
        criteria: [
          "Names a specific method and place.",
          "Explains how the method was meant to win influence.",
        ],
        model: {
          answer:
            "The superpowers backed opposing sides in proxy wars fought in newly independent states.",
          prove:
            "In Angola after independence in 1975, the Soviet Union and thousands of Cuban troops supported the government, while the United States and South Africa backed rebel forces.",
          explain:
            "By arming local allies, each superpower tried to bring a new state into its bloc without fighting the other directly.",
        },
        alternatives:
          "Answers can also explain economic aid, such as Soviet help building Egypt's Aswan High Dam or the US Alliance for Progress in Latin America, or covert action such as the US-backed coup in Guatemala in 1954.",
        review: [
          {
            topicId: "world-8-3",
            sectionId: "proxy-wars",
            label: "Proxy wars",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P"],
        prompt:
          "Explain ONE way the historical situation in which Kennedy spoke shaped his message in the passage.",
        criteria: [
          "Describes a specific feature of the situation in early 1961.",
          "Explains how it shaped what Kennedy says.",
        ],
        model: {
          answer:
            "Kennedy spoke as decolonization was creating many new states that both superpowers hoped to win as allies.",
          prove:
            "Seventeen African colonies became independent in 1960, and Castro's Cuba had recently turned to the Soviet Union for support.",
          explain:
            "That situation explains why he reassures the new states and warns rivals, presenting the United States as the protector of their freedom rather than a new colonial power.",
        },
        alternatives:
          "Answers can also explain how the growing nuclear arsenals of both superpowers shaped his warning about the “balance of terror,” or how an audience of allies and rivals shaped his firm tone.",
        review: [
          {
            topicId: "world-8-3",
            sectionId: "arms-race",
            label: "The arms race",
          },
        ],
      },
    ],
    sourceIds: ["kennedy-inaugural-1961", "ced-topic-8-3", "ced"],
  },
];

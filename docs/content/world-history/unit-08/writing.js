// Unit 8 writing practice: a stimulus-based SAQ with model APE responses.
// Lenses name the InSPECT categories in ../framework.js. Increment `version` when a
// prompt or its fields change enough to invalidate saved drafts.
import { excerpts } from "../excerpts.js";
import { dbq, dbqDocument, leq, saq } from "../writing-kit.js";

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
  // BEGIN mock exam prompts (written for full-length mock exams)
  leq({
    id: "world-8-leq-causation",
    unitNumber: 8,
    headline: "Causes of decolonization",
    prompt:
      "Evaluate the relative importance of the causes of decolonization in the period 1945 to 1975.",
    sourceIds: ["ced-topic-8-9", "ced-topic-8-5", "ced-topic-8-1"],
    topicId: "world-8-9",
    outlineReview: { sectionId: "intertwined", label: "Cold War and decolonization" },
    essayReview: { sectionId: "intertwined", label: "Cold War and decolonization" },
    modelResponse:
      "By 1945, nationalist movements in Asia and Africa had grown for decades, and two world wars had drained the European powers. The Atlantic Charter of 1941 endorsed the right of peoples to choose their own governments, and Japan's occupation of colonies in Southeast Asia had shown that European rule was not permanent.\n\nAlthough Cold War pressure and the weakness of the European empires made independence easier, the most important cause of decolonization between 1945 and 1975 was the mass nationalist movements in the colonies themselves, which made colonial rule too costly to maintain.\n\nNationalist mobilization explains why independence came when it did. In India, the Indian National Congress under Gandhi and Nehru organized boycotts and marches across the country, and the Muslim League pressed for a separate state, so Britain could no longer govern without large-scale repression. In the Gold Coast, Kwame Nkrumah's Convention People's Party used strikes and elections to win independence as Ghana in 1957, and in Algeria the National Liberation Front fought a war from 1954 to 1962 that ended French rule. In each case, leaders built movements that colonial powers could not defeat cheaply.\n\nThe weakness of the European powers made it easier for those movements to succeed. Britain and France emerged from the Second World War deeply in debt and dependent on American aid, and the Suez Crisis of 1956 showed that they could not act abroad without American and Soviet approval. Yet weakness alone did not end empire: France fought long wars in Vietnam and Algeria before giving way, so pressure from nationalists remained necessary.\n\nCold War rivalry added pressure but did not by itself cause independence. The United States and the Soviet Union both criticized colonialism in the United Nations and courted new states. At the same time, the superpowers sometimes backed colonial powers they saw as allies, as the United States did with France in Vietnam.\n\nIn conclusion, nationalist movements were the most important cause of decolonization, with European weakness and superpower pressure creating conditions in which those movements could succeed.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes earlier nationalism, the effects of the world wars, the Atlantic Charter, and Japanese occupation.",
      },
      {
        label: "Thesis",
        text: "The thesis ranks nationalist movements first and previews European weakness and Cold War pressure as secondary causes.",
      },
      {
        label: "Evidence",
        text: "The Indian National Congress, Ghana, the Algerian war, the Suez Crisis, and American support for France in Vietnam are specific and used to support the ranking.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay explains how causes interacted, tests the importance of European weakness with the example of France's wars, and qualifies Cold War pressure.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that the weakening of the European powers by the Second World War was most important, then show how nationalist movements and the superpowers took advantage of that weakness.",
    commonErrors: [
      "Describing independence movements without ranking their importance against other causes.",
      "Treating all regions as if decolonization happened in the same way.",
      "Naming the Cold War without saying how it changed what colonial powers or movements could do.",
      "Using events after 1975 as the main evidence.",
    ],
  }),
  saq({
    id: "world-8-saq-02",
    unitNumber: 8,
    number: 2,
    headline: "The Cold War and the new states",
    promptTitle: "Short-answer question without a stimulus",
    prompt: "Answer all parts of the question.",
    sourceIds: ["ced-topic-8-2", "ced-topic-8-3", "ced-topic-8-6"],
    parts: [
      {
        id: "a",
        lenses: ["P", "T"],
        prompt:
          "Identify ONE way the United States and the Soviet Union competed without fighting each other directly during the Cold War.",
        criteria: [
          "Names a specific form of competition.",
          "Connects it to the rivalry between the two superpowers.",
        ],
        model: {
          answer: "The superpowers competed in an arms race.",
          prove:
            "Both built thousands of nuclear weapons, and each developed long-range missiles after the Soviet Union tested an atomic bomb in 1949 and launched Sputnik in 1957.",
          explain:
            "Each side feared falling behind, so spending on weapons increased and the threat of mutual destruction shaped decisions in crises.",
        },
        alternatives:
          "Answers can also identify the space race, economic aid to other countries, propaganda, or support for rival governments in other countries.",
        review: [
          {
            topicId: "world-8-3",
            sectionId: "arms-race",
            label: "The arms race",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "S"],
        prompt:
          "Describe ONE conflict in which the superpowers supported opposing sides during the Cold War.",
        criteria: [
          "Names a specific conflict.",
          "Describes which sides each superpower supported.",
        ],
        model: {
          answer: "In the Korean War, the superpowers supported opposing governments.",
          prove:
            "The Soviet Union and China backed communist North Korea, while the United States led a United Nations force that defended South Korea from 1950 to 1953.",
          explain:
            "The war ended in a stalemate and left Korea divided, showing how Cold War rivalry could turn a local conflict into a larger war.",
        },
        alternatives:
          "Answers can also describe the Vietnam War, in which the Soviet Union and China aided North Vietnam while the United States supported South Vietnam, or the Soviet–Afghan War of the 1980s.",
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
        lenses: ["P", "E"],
        prompt:
          "Explain ONE way the Cold War affected newly independent states between 1945 and 1975.",
        criteria: [
          "Names a specific state, movement, or policy.",
          "Explains how the Cold War shaped its options.",
        ],
        model: {
          answer:
            "Some new states joined the Non-Aligned Movement to avoid choosing a side.",
          prove:
            "Leaders such as Jawaharlal Nehru of India, Gamal Abdel Nasser of Egypt, and Sukarno of Indonesia met at the Bandung Conference in 1955 and helped found the Non-Aligned Movement in 1961.",
          explain:
            "Nonalignment let new states seek aid from both blocs and gave them more independence in foreign policy than alliance with either superpower would have.",
        },
        alternatives:
          "Answers can also explain how the superpowers gave economic or military aid to rival governments, as in the Congo or Angola, or supported coups against leaders they distrusted.",
        review: [
          {
            topicId: "world-8-2",
            sectionId: "nonalignment",
            label: "Nonalignment",
          },
        ],
      },
    ],
  }),
  // END mock exam prompts
];

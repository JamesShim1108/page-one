// Unit 7 writing practice: a stimulus-based SAQ with model APE responses.
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
  // BEGIN mock exam prompts (written for full-length mock exams)
  saq({
    id: "world-7-saq-02",
    unitNumber: 7,
    number: 2,
    headline: "World War I and the colonies",
    promptTitle: "Short-answer question without a stimulus",
    prompt: "Answer all parts of the question.",
    sourceIds: ["ced-topic-7-3", "ced-topic-7-5"],
    parts: [
      {
        id: "a",
        lenses: ["P", "E"],
        prompt:
          "Identify ONE way governments mobilized their societies for total war during World War I.",
        criteria: [
          "States a specific policy or practice.",
          "Connects it to war mobilization.",
        ],
        model: {
          answer: "Governments used conscription to build mass armies.",
          prove:
            "Britain introduced conscription in 1916, and France, Germany, and Russia drafted millions of men.",
          explain:
            "Drafting such large numbers shifted the war from the small professional armies of earlier conflicts to the mobilization of whole societies.",
        },
        alternatives:
          "Answers can also identify rationing, state control of industry, propaganda, or the recruitment of women to work in factories.",
        review: [
          {
            topicId: "world-7-3",
            sectionId: "total-war",
            label: "Total war",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "S"],
        prompt: "Describe ONE role that colonial subjects played in World War I.",
        criteria: ["Names a specific group or region.", "Describes what that group did."],
        model: {
          answer: "Soldiers from the British Empire fought on several fronts.",
          prove:
            "About 1.3 million Indian soldiers served in Europe, the Middle East, and Africa, and soldiers from Senegal and other French colonies fought in France.",
          explain:
            "Their service supplied manpower to the Allies and also gave colonial peoples expectations about their rights after the war.",
        },
        alternatives:
          "Answers can also describe Chinese laborers who worked behind the lines in France or African porters who carried supplies in East Africa.",
        review: [
          {
            topicId: "world-7-3",
            sectionId: "empire-at-war",
            label: "Empire at war",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P", "C"],
        prompt:
          "Explain ONE way the outcome of World War I contributed to anticolonial movements after 1919.",
        criteria: [
          "Names a specific event, place, or movement.",
          "Explains how the war's outcome or peace settlement encouraged it.",
        ],
        model: {
          answer:
            "The peace settlement raised hopes of self-determination that it did not meet in the colonies.",
          prove:
            "When the Paris Peace Conference gave Germany's rights in Shandong to Japan, Chinese students protested in the May Fourth Movement of 1919, and in India the Amritsar massacre of 1919 deepened opposition to British rule.",
          explain:
            "Wilson's call for self-determination applied mainly to Europe, so colonial leaders concluded that they would have to press for independence themselves.",
        },
        alternatives:
          "Answers can also explain Arab disappointment with the mandates in the Middle East or the growth of nationalist parties among colonial veterans.",
        review: [
          {
            topicId: "world-7-5",
            sectionId: "mandates-anticolonial",
            label: "Mandates and anticolonial movements",
          },
        ],
      },
    ],
  }),
  leq({
    id: "world-7-leq-comparison",
    unitNumber: 7,
    headline: "Responses to the Great Depression",
    prompt:
      "Evaluate the similarities and differences in how the governments of the United States and Germany responded to the Great Depression between 1929 and 1939.",
    sourceIds: ["ced-topic-7-4", "ced-topic-7-6"],
    topicId: "world-7-4",
    outlineReview: { sectionId: "state-responses", label: "State responses" },
    essayReview: { sectionId: "state-responses", label: "State responses" },
    modelResponse:
      "After the First World War, many economies relied on loans from the United States, and when the New York stock market crashed in 1929, those loans stopped and trade collapsed. Germany, which was already burdened by war debts and the memory of hyperinflation in 1923, suffered some of the worst unemployment in the world, and by 1932 about six million Germans were out of work. In the United States, unemployment reached about a quarter of the workforce by 1933.\n\nThe governments of the United States and Germany were similar in that both expanded state control of the economy to fight unemployment, but they differed because the New Deal aimed at relief and reform within a democracy while Nazi Germany directed the economy toward rearmament and rejected democratic limits.\n\nBoth governments used public works and government direction to put people to work. In the United States, Franklin Roosevelt's New Deal created the Civilian Conservation Corps and the Works Progress Administration, which employed millions in building roads, bridges, and parks. In Germany, the Nazi government that took power in 1933 funded public works, including the autobahn highways, and sharply increased spending on the military. Both showed that governments were willing to take a larger role in the economy than they had before the Depression.\n\nThe differences were also significant. The New Deal sought to relieve distress and prevent a repeat of the crash through reforms such as bank deposit insurance and the Social Security Act of 1935, while leaving private property and elections in place. Nazi economic policy was designed to prepare for war and to reduce dependence on imports. The government directed industry under the Four-Year Plan of 1936, suppressed labor unions, and persecuted Jews and other groups, who were forced out of jobs. German unemployment fell mainly because of rearmament and conscription, not because of reforms meant to make the economy fairer.\n\nThe results also differed. The United States recovered slowly and still had high unemployment in 1938, but it preserved democratic government. Germany reduced unemployment faster but did so through policies that led toward war.\n\nIn conclusion, both governments expanded their economic role, but the United States did so to relieve hardship within a democratic framework, while Nazi Germany did so to build a militarized, authoritarian state.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes the stock market crash, the end of American loans, and Germany's earlier economic troubles.",
      },
      {
        label: "Thesis",
        text: "The thesis names a similarity and a difference and gives a reason for each.",
      },
      {
        label: "Evidence",
        text: "The CCC, the WPA, deposit insurance, the Social Security Act, the autobahn, rearmament, and the Four-Year Plan are specific and used in the comparison.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay compares aims, methods, and results, and qualifies the American recovery by noting continued unemployment in 1938, which shows complexity.",
      },
    ],
    alternateModel:
      "A different strong essay could compare the United States with the Soviet Union, arguing that both expanded government planning but that the Soviet Five-Year Plans replaced markets entirely while the New Deal worked within them.",
    commonErrors: [
      "Describing each government's policies in separate paragraphs without comparing them.",
      "Claiming the New Deal ended the Depression by itself.",
      "Treating Germany's falling unemployment as proof of a healthy economy.",
      "Ignoring the political differences between a democracy and a dictatorship.",
    ],
  }),
  saq({
    id: "world-7-saq-03",
    unitNumber: 7,
    number: 3,
    headline: "Historians and appeasement",
    promptTitle: "Secondary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    stimulusBlocks: [excerpts.m3Appeasement],
    sourceIds: ["ced-topic-7-6", "ced-topic-7-5"],
    parts: [
      {
        id: "a",
        lenses: ["P", "S"],
        prompt:
          "Identify ONE argument the passage presents in defense of the policy of appeasement.",
        criteria: [
          "States a specific argument from the passage.",
          "Connects it to avoiding or delaying war in 1938.",
        ],
        model: {
          answer:
            "Some historians argue that Britain and France were not ready for war in 1938.",
          prove:
            "The passage says their armies were not ready and that the Munich agreement gave them time to rearm.",
          explain:
            "If the Allies lacked the strength to win quickly, accepting a settlement could be a way to prepare for a later war.",
        },
        alternatives:
          "Answers can also identify the argument that public opinion in Britain and the empire opposed another war so soon after 1918.",
        review: [
          {
            topicId: "world-7-6",
            sectionId: "road-to-war",
            label: "The road to war",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "C"],
        prompt:
          "Explain ONE piece of historical evidence, not mentioned in the passage, that supports the argument that Hitler's goals were not limited to the Sudetenland.",
        criteria: [
          "Gives a specific example beyond the passage.",
          "Explains how it shows aggressive aims beyond the Sudetenland.",
        ],
        model: {
          answer:
            "Germany had already taken other territory in violation of the Treaty of Versailles.",
          prove:
            "Hitler sent troops into the demilitarized Rhineland in 1936 and annexed Austria in the Anschluss of March 1938.",
          explain:
            "Each success strengthened Germany's position and showed that Hitler was willing to break the treaty and expand when the Allies did not resist.",
        },
        alternatives:
          "Answers can also explain Hitler's occupation of Prague in March 1939, which broke the Munich agreement, or his statement of the need for living space in the east.",
        review: [
          {
            topicId: "world-7-6",
            sectionId: "fascism",
            label: "Fascism",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P", "S"],
        prompt:
          "Explain ONE way the policy of appeasement affected relations between the Western powers and the Soviet Union.",
        criteria: [
          "Names a specific event or decision.",
          "Explains how appeasement shaped Soviet policy or Western–Soviet relations.",
        ],
        model: {
          answer: "Appeasement increased Soviet distrust of Britain and France.",
          prove:
            "The Soviet Union was not invited to the Munich conference in 1938, and in August 1939 Stalin signed a nonaggression pact with Germany.",
          explain:
            "Stalin concluded that the Western powers hoped to turn Germany eastward, so he made an agreement that bought time and allowed Germany to invade Poland.",
        },
        alternatives:
          "Answers can also explain that the failure of appeasement led Britain and France to guarantee Poland's independence in 1939, which brought them into war when Germany invaded.",
        review: [
          {
            topicId: "world-7-6",
            sectionId: "road-to-war",
            label: "The road to war",
          },
        ],
      },
    ],
  }),
  // END mock exam prompts
];

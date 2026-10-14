// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// q-numbered items are topic practice; t-numbered items belong to the Unit 8 Practice Test.
import { excerpts } from "../../../excerpts.js";

export const bank = {
  questions: [
    {
      id: "world-8-1-q01",
      topicId: "world-8-1",
      concept: "two-superpowers",
      difficulty: "Core",
      skill: "developments",
      prompt: "Which two states emerged as superpowers after World War II?",
      choices: [
        "Britain and France, the war's European victors",
        "The United States and the Soviet Union",
        "Germany and Japan after their reconstruction",
        "The United States and Great Britain",
      ],
      correctAnswer: 1,
      explanation:
        "Only the United States and the Soviet Union had the military and economic strength to dominate the postwar world.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "Britain and France won but were weakened and indebted.",
        "Only the United States and the Soviet Union had the military and economic strength to dominate the postwar world.",
        "Germany and Japan were defeated and occupied.",
        "Britain was a close US ally but too indebted to remain a superpower.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Britain was on the winning side but did not have superpower strength after 1945.",
    },
    {
      id: "world-8-1-q02",
      topicId: "world-8-1",
      concept: "two-superpowers",
      difficulty: "Core",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "Which of the following best explains why the wartime alliance between the United States and the Soviet Union broke down after 1945?",
      choices: [
        "The Soviet Union had refused to fight Germany until the war's final months",
        "The two powers fought a border war in Europe in 1946",
        "Without a common enemy, their opposing systems and goals clashed",
        "Both states were too weakened by the war to help rebuild Europe",
      ],
      correctAnswer: 2,
      explanation:
        "Once Germany was defeated, capitalist democracy and Soviet communism competed for influence.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "The Soviet Union bore the heaviest share of the fighting against Germany.",
        "The superpowers never fought a war against each other, in 1946 or later.",
        "Once Germany was defeated, capitalist democracy and Soviet communism competed for influence.",
        "Both emerged far stronger than the European powers.",
      ],
      nearMissIndex: 3,
      distinguisher: "The superpowers were the two strongest states, not the weakest.",
    },
    {
      id: "world-8-1-q03",
      topicId: "world-8-1",
      concept: "empires-weakened",
      difficulty: "Core",
      skill: "connections",
      reasoning: "causation",
      prompt: "Which of the following was a way World War II encouraged decolonization?",
      choices: [
        "It left Britain and France richer and better able to pay for their empires",
        "It led Asian nationalists to abandon demands for independence",
        "Japan's early victories showed European colonial powers could be beaten",
        "It gave colonial powers large new armies to hold their colonies by force",
      ],
      correctAnswer: 2,
      explanation:
        "Japan's conquests of 1941 and 1942 broke the image of European invincibility.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "Britain and France ended the war deeply in debt.",
        "Nationalist movements grew stronger after the war.",
        "Japan's conquests of 1941 and 1942 broke the image of European invincibility.",
        "The colonial powers were exhausted and demobilizing.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Britain and France were on the winning side, but the war weakened their economies.",
    },
    {
      id: "world-8-1-q04",
      topicId: "world-8-1",
      concept: "empires-weakened",
      difficulty: "Core",
      skill: "contextualization",
      prompt:
        "Nationalist demands for self-determination after 1945 are best understood in the context of",
      choices: [
        "the Atlantic Charter and colonial subjects' wartime service",
        "the Congress of Vienna's restoration of monarchs",
        "the Berlin Conference's division of Africa",
        "the Treaty of Versailles granting independence to all colonies",
      ],
      correctAnswer: 0,
      explanation:
        "Colonial peoples who had fought for the Allies cited the Charter's promise of self-government.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "Colonial peoples who had fought for the Allies cited the Charter's promise of self-government.",
        "The Congress of Vienna met in 1815 to restore European monarchies.",
        "The Berlin Conference of 1884 divided Africa among colonizers.",
        "The 1919 settlement created mandates rather than freeing colonies.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "The 1919 peace spoke of self-determination but applied it only in Europe.",
    },
    {
      id: "world-8-1-q05",
      topicId: "world-8-1",
      concept: "two-superpowers",
      difficulty: "Core",
      skill: "developments",
      prompt:
        "The structure of the United Nations Security Council reflected the postwar world because",
      choices: [
        "it excluded every country that had fought in the war",
        "it gave the war's main victors permanent seats and a veto",
        "it gave colonies an equal vote with their rulers",
        "it gave every member nation a permanent seat and a veto",
      ],
      correctAnswer: 1,
      explanation:
        "The United States, the Soviet Union, Britain, France, and China held permanent seats.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "The founders were the war's victors.",
        "The United States, the Soviet Union, Britain, France, and China held permanent seats.",
        "Colonies were not members.",
        "Only five members hold permanent seats with a veto.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "The veto belongs only to the five permanent members, not to every member.",
    },
    {
      id: "world-8-1-t01",
      topicId: "world-8-1",
      concept: "two-superpowers",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt:
        "Which piece of evidence from the passage best supports the claim that the United States emerged from the war in a strong position?",
      choices: [
        "Fifty nations met in San Francisco to found the United Nations",
        "Britain and France, its allies, were deeply in debt after the war",
        "It produced about half of the world's manufactured goods",
        "Millions of refugees were on the move across Europe and Asia",
      ],
      correctAnswer: 2,
      explanation: "Economic output on that scale shows American strength in 1945.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "The San Francisco meeting shows cooperation, not American strength.",
        "That describes the weakness of other powers rather than US strength.",
        "Economic output on that scale shows American strength in 1945.",
        "Refugees show the war's destruction.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "European debt shows others' weakness; the question asks for evidence of US strength.",
      stimulusId: "original-postwar-world",
      stimulusBlocks: [excerpts.originalPostwarWorld],
    },
    {
      id: "world-8-1-t02",
      topicId: "world-8-1",
      concept: "two-superpowers",
      difficulty: "Apply",
      skill: "contextualization",
      prompt:
        "The founding of the United Nations described in the passage is best understood as a response to",
      choices: [
        "the failure of the League of Nations to prevent World War II",
        "the League of Nations' success in stopping aggression in the 1930s",
        "the Communist victory in China's civil war in 1949",
        "the collapse of the Soviet Union and its Eastern European allies",
      ],
      correctAnswer: 0,
      explanation:
        "The founders hoped a stronger organization would succeed where the League had failed.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "The founders hoped a stronger organization would succeed where the League had failed.",
        "The League failed to stop aggression in the 1930s.",
        "The UN was founded in 1945, four years before the communist victory in China.",
        "The Soviet Union was a founding member.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The League existed in the 1930s, but it failed rather than succeeded.",
      stimulusId: "original-postwar-world",
      stimulusBlocks: [excerpts.originalPostwarWorld],
    },
    {
      id: "world-8-1-t03",
      topicId: "world-8-1",
      concept: "two-superpowers",
      difficulty: "Apply",
      skill: "connections",
      reasoning: "causation",
      prompt:
        "The Soviet occupation of Eastern Europe described in the passage most directly contributed to",
      choices: [
        "the immediate independence of Eastern European states",
        "tension between the Soviet Union and the Western powers",
        "the end of the Soviet Communist Party",
        "the Soviet Union's withdrawal of its troops from all of Eastern Europe in 1946",
      ],
      correctAnswer: 1,
      explanation:
        "Western leaders saw Soviet-backed governments in Eastern Europe as a threat.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "Eastern European states came under Soviet-backed governments.",
        "Western leaders saw Soviet-backed governments in Eastern Europe as a threat.",
        "The Communist Party ruled the Soviet Union until 1991.",
        "Soviet troops stayed in Eastern Europe for decades.",
      ],
      nearMissIndex: 3,
      distinguisher:
        "Soviet troops remained in Eastern Europe until the end of the Cold War.",
      stimulusId: "original-postwar-world",
      stimulusBlocks: [excerpts.originalPostwarWorld],
    },
    {
      id: "world-8-1-t04",
      topicId: "world-8-1",
      concept: "empires-weakened",
      difficulty: "Apply",
      skill: "claims-evidence",
      prompt: "The passage suggests that the Atlantic Charter",
      choices: [
        "brought an immediate end to British rule in India",
        "was written by Asian and African nationalist leaders",
        "was used by nationalists to challenge colonial rule",
        "was rejected by nationalists as irrelevant to colonies",
      ],
      correctAnswer: 2,
      explanation:
        "Nationalists quoted its promise of self-government back to the colonizers.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "India won independence in 1947, six years later.",
        "Britain and the United States issued it.",
        "Nationalists quoted its promise of self-government back to the colonizers.",
        "Nationalists embraced its words.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "The Charter fed nationalist demands, but India's independence came later.",
      stimulusId: "original-empires-weakened",
      stimulusBlocks: [excerpts.originalEmpiresWeakened],
    },
    {
      id: "world-8-1-t05",
      topicId: "world-8-1",
      concept: "empires-weakened",
      difficulty: "Apply",
      skill: "argumentation",
      prompt: "The passage would best support which argument?",
      choices: [
        "World War II strengthened colonial rule in Asia",
        "Colonial subjects played no role in World War II",
        "World War II weakened the foundations of colonial rule",
        "Japan's conquests made Europeans more secure",
      ],
      correctAnswer: 2,
      explanation:
        "Japanese victories, colonial service, and the Charter all undermined imperial authority.",
      sourceIds: ["ced-topic-8-1"],
      choiceExplanations: [
        "The passage describes colonial power being shaken.",
        "Millions of Indians and Africans served.",
        "Japanese victories, colonial service, and the Charter all undermined imperial authority.",
        "Japan's victories shattered European prestige.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "Japan's victories in Asia undermined European colonial rule rather than strengthening it.",
      stimulusId: "original-empires-weakened",
      stimulusBlocks: [excerpts.originalEmpiresWeakened],
    },
  ],
  quizzes: [
    {
      id: "world-8-1-quick",
      courseId: "world",
      unitId: "world-8",
      topicId: "world-8-1",
      title: "Topic 8.1 quick check",
      quizType: "quick",
      questionIds: ["world-8-1-q01", "world-8-1-q02", "world-8-1-q03"],
    },
    {
      id: "world-8-1-quiz",
      courseId: "world",
      unitId: "world-8",
      topicId: "world-8-1",
      title: "Setting the Stage topic quiz",
      quizType: "topic",
      customPractice: true,
      questionIds: [
        "world-8-1-q01",
        "world-8-1-q02",
        "world-8-1-q03",
        "world-8-1-q04",
        "world-8-1-q05",
      ],
    },
  ],
};

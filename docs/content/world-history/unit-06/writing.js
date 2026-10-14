// Unit 6 writing practice: a stimulus-based SAQ with model APE responses.
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
  // BEGIN mock exam prompts (written for full-length mock exams)
  leq({
    id: "world-6-leq-causation",
    unitNumber: 6,
    headline: "Causes of imperial expansion",
    prompt:
      "Evaluate the relative importance of the causes of European imperial expansion in Africa and Asia in the period 1850 to 1914.",
    sourceIds: ["ced-topic-6-8", "ced-topic-6-1", "ced-topic-6-2"],
    topicId: "world-6-8",
    outlineReview: { sectionId: "industry-empire", label: "Industry and empire" },
    essayReview: { sectionId: "industry-empire", label: "Industry and empire" },
    modelResponse:
      "By 1850, Britain, France, and other European states already held colonies and trading ports, and the Industrial Revolution was creating factories that used more raw materials than Europe could supply. After the Indian Rebellion of 1857, Britain replaced Company rule with direct Crown rule, a sign that governments were willing to take on more responsibility for overseas territory.\n\nAlthough nationalism and ideas of European superiority mattered, the most important cause of imperial expansion between 1850 and 1914 was the demand of industrial economies for raw materials and markets, which was made possible by new technology.\n\nIndustrial demand explains why Europeans moved from coastal trading posts to territorial control. Factories in Britain needed cotton, and later rubber, palm oil, copper, and other raw materials, and manufacturers wanted markets for goods. King Leopold II's Congo Free State was run to export rubber and ivory, and Britain took control of Egypt in 1882 to protect the Suez Canal and its route to India. The Opium Wars of 1839 to 1860 forced China to open ports to foreign trade.\n\nTechnology allowed Europeans to act on this demand. Steamships and railroads moved troops and goods, the telegraph connected distant officials, quinine protected Europeans from malaria in tropical Africa, and the Maxim gun gave small forces decisive advantages, as at Omdurman in 1898, where a British force with machine guns defeated a much larger Sudanese army. These tools lowered the cost of conquest, but they did not give Europeans a reason to conquer.\n\nNationalism and ideology were important in shaping how and when expansion happened. Fear of being outdone drove the rush for Africa after the Berlin Conference of 1884–1885, and Germany and Italy, newly unified, sought colonies to show their strength. Ideas such as the civilizing mission and Social Darwinism justified conquest to European publics. Yet these ideas often followed economic and strategic goals instead of creating them.\n\nIn conclusion, industrial economies' need for raw materials and markets was the most important cause of imperial expansion, technology made it possible, and nationalism and ideology gave it direction and public support.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes earlier European colonies and the Industrial Revolution, and notes the shift to Crown rule in India.",
      },
      {
        label: "Thesis",
        text: "The thesis ranks economic demand above technology, nationalism, and ideology and names the line of reasoning.",
      },
      {
        label: "Evidence",
        text: "The Congo Free State, Egypt and the Suez Canal, the Opium Wars, the Maxim gun at Omdurman, and the Berlin Conference are specific and linked to the claim.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay weighs causes against each other and distinguishes a motive from an enabling condition, which shows a complex understanding of causation.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that rivalry among European states was most important, using the Berlin Conference and the competition among Britain, France, and Germany, while treating industry as the source of the resources that made rivalry matter.",
    commonErrors: [
      "Listing God, gold, and glory-style motives without arguing which mattered most.",
      "Treating technology as a motive instead of an enabling condition.",
      "Describing colonies instead of explaining why they were acquired.",
      "Using only British examples to explain European expansion in general.",
    ],
  }),
  dbq({
    id: "world-6-dbq-ideas",
    unitNumber: 6,
    headline: "New ideas and old hierarchies",
    prompt:
      "Evaluate the extent to which new ideas about government, labor, and economic life challenged existing social and political hierarchies in the period 1750–1900.",
    sourceIds: [
      "paine-common-sense",
      "smith-wealth-of-nations",
      "wollstonecraft-vindication",
      "marx-engels-1888",
      "smiles-self-help",
      "mill-on-liberty",
      "ced-topic-5-1",
      "ced-topic-5-8",
    ],
    topicId: "world-5-1",
    noteReview: { sectionId: "natural-rights", label: "Natural rights" },
    essayReview: { sectionId: "reform-movements", label: "Reform movements" },
    documents: [
      dbqDocument({
        id: "doc-1",
        label: "A pamphlet for American independence",
        excerpt: excerpts.paineCommonSense,
        author: "Thomas Paine",
        date: "January 1776",
        setting: "Philadelphia, on the eve of the American Declaration of Independence",
        audience: "Colonists in British North America",
        rights: "Public-domain text.",
        sourceId: "paine-common-sense",
      }),
      dbqDocument({
        id: "doc-2",
        label: "Division of labor in a pin factory",
        excerpt: excerpts.smithPins,
        author: "Adam Smith",
        date: "1776",
        setting: "Great Britain, at the start of the Industrial Revolution",
        audience: "Educated British readers",
        rights: "Public-domain text.",
        sourceId: "smith-wealth-of-nations",
      }),
      dbqDocument({
        id: "doc-3",
        label: "A call for women's education",
        excerpt: excerpts.wollstonecraftReason,
        author: "Mary Wollstonecraft",
        date: "1792",
        setting: "England, during the French Revolution",
        audience: "Educated English and European readers",
        rights: "Public-domain text.",
        sourceId: "wollstonecraft-vindication",
      }),
      dbqDocument({
        id: "doc-4",
        label: "Class struggle and the factory worker",
        excerpt: excerpts.manifestoClass,
        author: "Karl Marx and Friedrich Engels",
        date: "1848",
        setting: "Europe, during a year of revolutions",
        audience: "Workers and members of the Communist League",
        rights: "Public-domain translation (1888).",
        sourceId: "marx-engels-1888",
      }),
      dbqDocument({
        id: "doc-5",
        label: "The value of self-help",
        excerpt: excerpts.smilesSelfHelp,
        author: "Samuel Smiles",
        date: "1859",
        setting: "Victorian Britain",
        audience: "Working-class and middle-class readers seeking self-improvement",
        rights: "Public-domain text.",
        sourceId: "smiles-self-help",
      }),
      dbqDocument({
        id: "doc-6",
        label: "Capitalism and the world market",
        excerpt: excerpts.manifestoWorldMarket,
        author: "Karl Marx and Friedrich Engels",
        date: "1848",
        setting: "Europe, at the height of European industrial and imperial power",
        audience: "Workers and members of the Communist League",
        rights: "Public-domain translation (1888).",
        sourceId: "marx-engels-1888",
      }),
      dbqDocument({
        id: "doc-7",
        label: "Liberty and “backward” societies",
        excerpt: excerpts.millDespotism,
        author: "John Stuart Mill",
        date: "1859",
        setting: "Britain, while he and others debated colonial rule",
        audience: "British readers",
        rights: "Public-domain text.",
        sourceId: "mill-on-liberty",
      }),
    ],
    modelResponse:
      'In 1750, most societies were organized around hierarchies of birth: monarchs and nobles ruled, women had few legal rights, and European empires governed colonies overseas. The Enlightenment questioned those arrangements by arguing that people had natural rights and that reason, not tradition, should guide government. Soon afterward, the Industrial Revolution created factories, a wage-earning working class, and a new middle class that sought influence.\n\nBetween 1750 and 1900, new ideas about government, labor, and economic life challenged hierarchies based on birth and monarchy, but they also created or justified new hierarchies of class, gender, and empire, so the challenge was significant but uneven.\n\nSeveral documents show direct challenges to traditional authority. Thomas Paine argued that "society in every state is a blessing, but government even in its best state is but a necessary evil" and mocked the idea that a continent should be governed by an island (Document 1). Writing as a pamphleteer in Philadelphia in 1776, Paine wanted to persuade ordinary colonists to support independence, so he used plain, forceful language, and his claim that freedom had been "hunted round the globe" was meant to move readers more than to describe every case accurately. Even so, the American Declaration of Independence soon echoed his challenge to hereditary authority. Mary Wollstonecraft extended the logic of reason to gender, demanding "a revolution in female manners" and women\'s power "over themselves" (Document 3). Because she was responding to Rousseau and wrote for educated readers, her argument focused on education rather than political rights, and she did not claim that women should rule men. Olympe de Gouges\'s Declaration of the Rights of Woman (1791) shows that some contemporaries asked for more.\n\nIdeas about labor and the economy also unsettled older hierarchies. Marx and Engels described history as "the history of class struggles" and called on workers to overthrow their rulers (Document 4). Writing for a political organization in 1848, they had reason to emphasize conflict and to treat workers as a unified force, which most British workers were not at the time. Samuel Smiles, in contrast, told readers that growth came from individual effort and that excessive government help made people "helpless" (Document 5). Writing for readers hoping to rise, Smiles challenged the idea that birth fixed a person\'s place, but he also argued against state help, a position that fit the interests of a growing middle class. Adam Smith\'s account of pin-making (Document 2) shows how the division of labor increased output, laying groundwork for factory production that would create both new wealth and the workers whom Marx described as an "appendage of the machine."\n\nHowever, new ideas also reinforced hierarchies. Marx and Engels observed that capitalism "compels all nations" to adopt its mode of production (Document 6), but they also portrayed European industry as forcing other societies into a subordinate position. Mill, an official of the East India Company, argued that liberty applied only to people capable of improvement by free discussion and that despotism was legitimate for "barbarians" (Document 7). Because he worked for the company that governed much of India, his view helped justify colonial rule at a time when Britain was expanding its empire. The Indian Rebellion of 1857 and the partition of Africa after 1884 show how liberal states applied liberty selectively.\n\nIn conclusion, new ideas weakened hierarchies based on birth and absolute monarchy, but they also created class divisions and gave new justifications for empire, so they challenged existing hierarchies without ending inequality.',
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes birth-based hierarchies, the Enlightenment, and the start of industrialization.",
      },
      {
        label: "Thesis",
        text: "The thesis makes a qualified claim about the extent of change and previews two lines of reasoning: challenges to old hierarchies and the creation of new ones.",
      },
      {
        label: "Evidence from the documents",
        text: "All seven documents are used to support the argument and are grouped by claim.",
      },
      {
        label: "Evidence beyond the documents",
        text: "The Declaration of Independence, Olympe de Gouges's declaration, the Indian Rebellion of 1857, and the partition of Africa are specific evidence not found in the documents.",
      },
      {
        label: "Sourcing",
        text: "The essay explains Paine's purpose and audience, Wollstonecraft's response to Rousseau, the purpose of Marx and Engels's pamphlet, Smiles's audience, and Mill's employment by the East India Company.",
      },
      {
        label: "Complexity",
        text: "The argument shows how ideas challenged some hierarchies while creating or justifying others, and it uses outside evidence to qualify the documents.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that economic ideas changed society more than political ideas, grouping Documents 2, 4, 5, and 6 as evidence of a new industrial order and Documents 1 and 3 as demands that took longer to change law.",
    commonErrors: [
      "Summarizing each document in order instead of grouping them by claim.",
      "Treating Marx and Engels as speaking for all workers.",
      "Quoting Mill without noting his employment by the East India Company.",
      "Writing “the author is biased” without explaining how that affects the argument.",
    ],
  }),
  // END mock exam prompts
];

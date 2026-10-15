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
      "Evaluate the extent to which new ideas about government, society, and economic life challenged existing social and political hierarchies in the period 1750–1900.",
    sourceIds: [
      "paine-common-sense",
      "wollstonecraft-vindication",
      "backhouse-bland-annals-1914",
      "rammohun-roy-1906",
      "marx-engels-1888",
      "mill-on-liberty",
      "rizal-century-hence-1912",
      "ced-topic-5-1",
      "ced-topic-5-8",
      "ced-topic-6-2",
      "ced-topic-6-3",
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
        id: "doc-3",
        label: "The emperor answers the British king",
        excerpt: excerpts.qianlongGeorge,
        author: "The Qianlong Emperor",
        date: "1793",
        setting:
          "Beijing, after the Macartney embassy asked for an envoy at court and wider trade",
        audience: "King George III of Great Britain",
        rights: "Public-domain translation (1914).",
        sourceId: "backhouse-bland-annals-1914",
      }),
      dbqDocument({
        id: "doc-4",
        label: "A Bengali reformer on education",
        excerpt: excerpts.royEducation,
        author: "Ram Mohan Roy",
        date: "1823",
        setting: "Calcutta, under East India Company rule",
        audience: "Lord Amherst, governor-general of India",
        rights: "Public-domain text (1906 edition).",
        sourceId: "rammohun-roy-1906",
      }),
      dbqDocument({
        id: "doc-5",
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
        id: "doc-6",
        label: "Liberty and “backward” societies",
        excerpt: excerpts.millDespotism,
        author: "John Stuart Mill",
        date: "1859",
        setting: "Britain, while he and others debated colonial rule",
        audience: "British readers",
        rights: "Public-domain text.",
        sourceId: "mill-on-liberty",
      }),
      dbqDocument({
        id: "doc-7",
        label: "A Filipino reformer warns Spain",
        excerpt: excerpts.rizalCenturyHence,
        author: "José Rizal",
        date: "1889–1890",
        setting: "Madrid, where Filipino reformers published La Solidaridad",
        audience: "Spanish readers and Filipino reformers",
        rights: "Public-domain translation in the United States (1912).",
        sourceId: "rizal-century-hence-1912",
      }),
    ],
    modelResponse:
      'In 1750, most societies were organized around hierarchies of birth and rank: monarchs and nobles ruled in Europe, women had few legal rights, Qing emperors treated foreign rulers as tribute-bearing inferiors, and European companies and empires governed colonies from India to the Americas. The Enlightenment questioned those arrangements by arguing that people had natural rights and that reason, not tradition, should guide government. Industrialization and empire then carried new ideas and European power around the world.\n\nBetween 1750 and 1900, new ideas about rights, reason, and economic life challenged hierarchies of birth, gender, and colonial rule from the Atlantic world to Asia, but the challenge was uneven: established rulers rejected these ideas, and the same ideas were used to justify new hierarchies of class and empire.\n\nIn the Atlantic world, the new ideas attacked traditional authority directly. Thomas Paine called government "a necessary evil" and mocked the idea of "a continent to be perpetually governed by an island" (Document 1). Writing as a pamphleteer in Philadelphia in 1776, Paine wanted to move ordinary colonists to support independence, so he used plain, forceful language rather than careful argument. The Declaration of Independence soon echoed his challenge, and the Haitian Revolution showed enslaved people turning the language of rights against slavery itself. Mary Wollstonecraft extended the logic of reason to gender, demanding "a revolution in female manners" (Document 2). Because she was answering Rousseau for educated readers, she focused on education rather than political rights.\n\nColonial subjects adapted the same ideas to challenge hierarchies at home and in empire. Ram Mohan Roy urged the British to fund "Mathematics, Natural Philosophy, Chemistry, Anatomy" instead of a Sanskrit college that would "keep this country in darkness" (Document 4). His proposal challenged the authority of Brahmin pandits over learning, and he also campaigned against sati, which the British banned in 1829. Roy was writing to the governor-general, so he presented his plan as serving the government\'s own goal of "the improvement of the native population"; this tactful framing was a strategy to persuade a foreign ruler, not proof that he accepted British rule without question. José Rizal argued that a Filipino regarded as "a fit citizen when he is asked to pay taxes or shed his blood" deserved rights as well, and he warned that without "more law and greater liberty" Filipinos would "declare themselves independent, after steeping themselves and the mother country in blood" (Document 7). Because Rizal published in Madrid for Spanish readers, he framed his demands as reforms within Spanish rule, such as a free press and Filipino seats in the Spanish Cortes; the Philippine Revolution that began in 1896, the year Spain executed him, shows how quickly reform could become revolt.\n\nHowever, older hierarchies resisted, and new ideas built new ones. The Qianlong Emperor refused a British envoy, declared that "we possess all things" and had "no use for your country\'s manufactures," and told George III to show "perpetual submission to our Throne" (Document 3). As an official edict to a foreign king, the document\'s purpose was to restate the tribute system\'s hierarchy, not to describe China\'s economy; Britain\'s victory in the Opium War of 1839–1842 later forced the Qing to open more ports. Marx and Engels challenged the rule of the bourgeoisie, but their description of the worker as "an appendage of the machine" shows that industrial capitalism had created a new class hierarchy (Document 5). Writing for a revolutionary organization in 1848, they had reason to stress conflict. John Stuart Mill limited liberty to people capable of "free and equal discussion" and called despotism "legitimate" for "barbarians" (Document 6). As an official of the East India Company, Mill had a stake in justifying colonial rule, and Britain\'s harsh response to the Indian Rebellion of 1857 showed how liberal states applied liberty selectively.\n\nIn conclusion, new ideas weakened hierarchies of birth and inspired reformers from Philadelphia to Calcutta and Manila, but rulers such as the Qianlong Emperor rejected them, and liberal and industrial thinkers also justified new divisions of class and empire, so the challenge was real but incomplete.',
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes hierarchies of birth, gender, and empire in Europe, China, and the colonies, along with the Enlightenment and industrialization.",
      },
      {
        label: "Thesis",
        text: "The thesis makes a qualified claim about extent and previews three lines of reasoning: challenges in the Atlantic world, colonial reformers adapting new ideas, and resistance and new hierarchies.",
      },
      {
        label: "Evidence from the documents",
        text: "All seven documents are used to support the argument and are grouped by claim.",
      },
      {
        label: "Evidence beyond the documents",
        text: "The Declaration of Independence, the Haitian Revolution, the ban on sati in 1829, the Opium War, the Indian Rebellion of 1857, and the Philippine Revolution of 1896 are specific evidence not found in the documents.",
      },
      {
        label: "Sourcing",
        text: "The essay explains Paine's purpose and audience, Wollstonecraft's response to Rousseau, Roy's audience, Rizal's Spanish readers, the purpose of the Qianlong edict, Marx and Engels's purpose, and Mill's employment by the East India Company.",
      },
      {
        label: "Complexity",
        text: "The argument shows how ideas challenged some hierarchies while others resisted or new ones formed, and it compares responses in the Atlantic world, South Asia, Southeast Asia, and China.",
      },
    ],
    alternateModel:
      "A different strong essay could compare where challenges came from, grouping Documents 1, 2, and 5 as challenges raised inside Europe and the Atlantic world, Documents 4 and 7 as colonial subjects using liberal ideas to demand reform, and Documents 3 and 6 as rulers in Qing China and Britain defending hierarchy.",
    commonErrors: [
      "Summarizing each document in order instead of grouping them by claim.",
      "Treating the Qianlong Emperor's edict as simple ignorance instead of a statement of the tribute system's hierarchy.",
      "Calling Roy or Rizal pro-British or pro-Spanish without explaining whom each was trying to persuade.",
      "Quoting Mill without noting his employment by the East India Company.",
      "Writing “the author is biased” without explaining how that affects the argument.",
    ],
  }),
  // END mock exam prompts
];

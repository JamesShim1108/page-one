// Unit 5 writing practice: a stimulus-based SAQ with model APE responses.
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
  // BEGIN mock exam prompts (written for full-length mock exams)
  saq({
    id: "world-5-saq-02",
    unitNumber: 5,
    number: 2,
    headline: "Industrialization and society",
    promptTitle: "Short-answer question without a stimulus",
    prompt: "Answer all parts of the question.",
    sourceIds: ["ced-topic-5-3", "ced-topic-5-9", "ced-topic-5-8"],
    parts: [
      {
        id: "a",
        lenses: ["In", "E"],
        prompt:
          "Identify ONE reason industrialization began in Great Britain in the late 1700s.",
        criteria: [
          "States a specific reason.",
          "Connects the reason to industrial production.",
        ],
        model: {
          answer:
            "Britain had coal and iron ore near rivers and ports that factories and steam engines could use.",
          prove:
            "Coalfields in northern England and Wales supplied fuel for steam engines and iron smelting, and coastal and river transport carried the materials to market.",
          explain:
            "Cheap fuel and easy transport lowered the cost of making iron and textiles with machines, which made factory production profitable.",
        },
        alternatives:
          "Answers can also identify agricultural improvements that pushed workers toward towns, capital from overseas trade, a stable government that protected property, or raw cotton and markets in the colonies.",
        review: [
          {
            topicId: "world-5-3",
            sectionId: "why-britain",
            label: "Why Britain industrialized first",
          },
        ],
      },
      {
        id: "b",
        lenses: ["S", "E"],
        prompt:
          "Describe ONE way industrialization changed family life or work for women or children in the 1800s.",
        criteria: ["Names a specific change.", "Describes it accurately for the 1800s."],
        model: {
          answer:
            "Many women and children worked outside the home for wages in factories and mines.",
          prove:
            "In British textile mills and coal mines, children and women worked long hours, which prompted inquiries and laws such as the Factory Act of 1833 and the Mines Act of 1842.",
          explain:
            "Work moved away from the household and into workplaces run by owners, which changed how families earned a living.",
        },
        alternatives:
          "Answers can also describe the ideal of a middle-class home in which wives stayed at home, or the growth of domestic service as a major occupation for working-class women.",
        review: [
          {
            topicId: "world-5-9",
            sectionId: "family-cities",
            label: "Families and cities",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P", "S"],
        prompt:
          "Explain ONE way governments or reformers responded to conditions in industrial cities by 1900.",
        criteria: [
          "Names a specific response, such as a law or movement.",
          "Explains how it addressed a problem of industrial life.",
        ],
        model: {
          answer:
            "Governments passed public health laws to improve sanitation in crowded cities.",
          prove:
            "After cholera epidemics, Britain's Public Health Act of 1848 and later laws led cities to build sewers and provide cleaner water.",
          explain:
            "Rapid urban growth had produced crowded slums where disease spread, so public works for water and waste reduced death rates and showed a larger role for government.",
        },
        alternatives:
          "Answers can also explain factory legislation, the legal recognition of trade unions, the extension of the vote to working men, or Bismarck's insurance programs in Germany.",
        review: [
          {
            topicId: "world-5-8",
            sectionId: "state-reforms",
            label: "State reforms",
          },
        ],
      },
    ],
  }),
  leq({
    id: "world-5-leq-comparison",
    unitNumber: 5,
    headline: "Revolutions in the Atlantic world",
    prompt:
      "Evaluate the similarities and differences between the American Revolution and the Haitian Revolution in their causes and outcomes.",
    sourceIds: ["ced-topic-5-2", "ced-topic-5-1"],
    topicId: "world-5-2",
    outlineReview: { sectionId: "atlantic-revolutions", label: "Atlantic revolutions" },
    essayReview: { sectionId: "haiti-latin-america", label: "Haiti and Latin America" },
    modelResponse:
      "By the 1770s, Enlightenment writers such as Locke and Rousseau had argued that governments rested on the consent of the governed, and European empires in the Americas depended on trade and plantation labor. Wars such as the Seven Years' War had left Britain and France with large debts, which led both governments to seek more revenue from their colonies.\n\nThe American and Haitian Revolutions were similar in that both drew on Enlightenment ideas and resentment of imperial control, but they differed because the Haitian Revolution began among enslaved people and ended slavery, while the American Revolution kept slavery in place.\n\nBoth revolutions were shaped by Enlightenment principles. American colonists objected to taxes such as the Stamp Act of 1765 that were imposed without their consent, and the Declaration of Independence in 1776 declared that people had natural rights. In Saint-Domingue, the French Revolution's Declaration of the Rights of Man in 1789 inspired free people of color, who demanded the same rights as white colonists, and then enslaved people, who revolted in 1791. In both cases, a colonial population challenged rulers who seemed to violate principles of liberty.\n\nThe causes also differed. The American Revolution was mainly led by colonial elites, including merchants and planters, who wanted political autonomy and an end to British economic regulation. The Haitian Revolution grew from the brutal conditions of the sugar plantations, where enslaved Africans outnumbered whites and free people of color by a wide margin, and it was led by formerly enslaved leaders such as Toussaint Louverture.\n\nTheir outcomes diverged as well. The new United States created a constitution in 1787 and a republic, but it preserved slavery and excluded women and Native Americans from political rights. Haiti's leaders abolished slavery, defeated Napoleon's army, and in 1804 created the first independent state in Latin America founded by formerly enslaved people. Yet Haiti paid a heavy price: France demanded an indemnity of 150 million francs in 1825 in exchange for recognition, and many nations refused to trade with the new state, which limited its economic growth.\n\nIn conclusion, both revolutions grew from Enlightenment ideas and anti-imperial resentment, but Haiti's revolution was more radical in who it freed and more costly in its aftermath.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes Enlightenment ideas and the debts of European empires after the Seven Years' War.",
      },
      {
        label: "Thesis",
        text: "The thesis states one similarity and one difference with a reason for each.",
      },
      {
        label: "Evidence",
        text: "The Stamp Act, the Declaration of Independence, the Declaration of the Rights of Man, the 1791 uprising, the Constitution of 1787, and the indemnity of 1825 are specific and used in the comparison.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay compares causes and outcomes point by point and explains why the revolutions differed. Noting Haiti's later isolation and the limits of the American republic qualifies the claim.",
      },
    ],
    alternateModel:
      "A different strong essay could compare the Haitian Revolution with the Latin American independence movements, arguing that both ended colonial rule but that elite creole leaders in Spanish America feared the social revolution that Haiti had produced.",
    commonErrors: [
      "Describing each revolution in turn without making direct comparisons.",
      "Treating Enlightenment ideas as the only cause and ignoring economic conditions.",
      "Claiming the American Revolution ended slavery or gave equal rights to all.",
      "Confusing the dates of the Haitian Revolution (1791–1804) with the French Revolution.",
    ],
  }),
  leq({
    id: "world-5-leq-continuity",
    unitNumber: 5,
    headline: "Industrialization and British workers",
    prompt:
      "Evaluate the extent to which industrialization changed the lives of workers in Britain between 1750 and 1900.",
    sourceIds: ["ced-topic-5-10", "ced-topic-5-9", "ced-topic-5-8"],
    topicId: "world-5-10",
    outlineReview: {
      sectionId: "industrial-change",
      label: "Change in the industrial age",
    },
    essayReview: {
      sectionId: "industrial-change",
      label: "Change in the industrial age",
    },
    modelResponse:
      "In 1750, most British workers lived in villages, working in agriculture or at home on goods such as cloth. Families set their own pace of work according to the seasons and daylight. Then new machines, steam engines, and factories began to change how goods were made, starting with cotton textiles in the late 1700s.\n\nIndustrialization changed workers' lives greatly in where, when, and how they worked and in their health and political rights, but poverty, long hours, and unequal treatment of women persisted for much of the period, so the change was profound but uneven.\n\nThe workplace itself changed. Mechanized cotton mills in Lancashire required workers to follow the schedule of the factory bell and work 12 to 16 hours a day, and the spinning jenny and power loom replaced much of the skilled hand work of artisans. Workers moved to cities such as Manchester, whose population multiplied in the first half of the century. Living conditions in crowded neighborhoods were poor, and cholera epidemics in the 1830s and 1840s killed thousands.\n\nWorkers also gained new ways to improve their position. They formed trade unions, which Parliament had banned under the Combination Acts of 1799 but legalized in 1824 and protected by law in 1871. Reformers passed laws such as the Factory Act of 1833, which limited children's hours, and the Mines Act of 1842, which barred women and young children from underground work. The Reform Acts of 1832 and 1867 widened the vote and brought some working men into politics. By the 1870s and 1880s, real wages had risen for many workers.\n\nYet there were important continuities. Many people still worked in agriculture or in domestic service, which was the largest occupation for women. Women and children continued to earn less than men and did long hours in textile mills and workshops. Poverty remained widespread, and as late as the 1880s surveys found that a large part of London's population lived near subsistence.\n\nIn conclusion, industrialization transformed the setting and rhythm of work and eventually gave workers more rights and wages, but poverty and inequality continued, so the change was great in structure and gradual in improvement.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes agricultural and household work before industrialization and the start of factory production.",
      },
      {
        label: "Thesis",
        text: "The thesis answers the extent question and previews both change and continuity.",
      },
      {
        label: "Evidence",
        text: "The factory bell, Manchester, cholera, the Combination Acts, the Factory Act of 1833, the Mines Act of 1842, and the Reform Acts are specific and tied to the claim.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay organizes change and continuity, shows that improvement came gradually, and qualifies the argument by noting uneven effects on women, children, and the poor.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that the changes in workers' lives were limited before 1850 and larger afterward, using reform laws and rising wages in the second half of the century as the main turning point.",
    commonErrors: [
      "Describing the Industrial Revolution generally without focusing on workers.",
      "Claiming that all workers lived in factories or cities by 1800.",
      "Listing reforms without explaining how they changed daily life.",
      "Treating Britain's experience as identical to industrialization elsewhere.",
    ],
  }),
  // END mock exam prompts
];

// Unit 3 writing practice: a stimulus-based SAQ with model APE responses.
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
    id: "world-3-saq-01",
    version: 1,
    courseId: "world",
    unitId: "world-3",
    title: "Unit 3 SAQ 01",
    headline: "Merit and power at the Ottoman court",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.busbecqMerit],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["P", "S"],
        prompt:
          "Identify ONE claim Busbecq makes about how officials were chosen in the Ottoman Empire.",
        criteria: [
          "States a specific claim from the passage.",
          "Connects the claim to how officials or soldiers were chosen or promoted.",
        ],
        model: {
          answer:
            "Busbecq claims that Ottoman officials rose through merit rather than noble birth.",
          prove:
            "He writes that no one at the court owed his position to anything but valor and merit, and that most high officials were sons of shepherds or herdsmen.",
          explain:
            "By stressing humble origins and ability, he shows that the sultan promoted men for service, not for family rank.",
        },
        alternatives:
          "Answers can also identify his claim that the sultan judged each man's character and ability, or that this system explains Ottoman success.",
        review: [
          {
            topicId: "world-3-2",
            sectionId: "bureaucracy-military",
            label: "Ottoman administration",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "S"],
        prompt:
          "Explain ONE Ottoman practice from the period 1450 to 1750 that helps account for the system Busbecq describes.",
        criteria: [
          "Names a specific Ottoman practice.",
          "Explains how it produced officials or soldiers loyal to the sultan.",
        ],
        model: {
          answer:
            "The devshirme produced officials and soldiers who owed their careers to the sultan.",
          prove:
            "Under the devshirme, Christian boys from the Balkans were taken from their families, converted to Islam, and trained as Janissaries or administrators.",
          explain:
            "Because recruits had no noble family to rely on, their rank depended on training and the sultan's favor, which matches Busbecq's picture of promotion without regard to birth.",
        },
        alternatives:
          "Answers can also explain the Janissaries as a salaried standing army, or the palace schools that trained officials, if they connect the practice to loyalty or merit.",
        review: [
          {
            topicId: "world-3-2",
            sectionId: "bureaucracy-military",
            label: "The devshirme",
          },
          {
            topicId: "world-3-1",
            sectionId: "gunpowder-armies",
            label: "The Janissaries",
          },
        ],
      },
      {
        id: "c",
        lenses: ["C"],
        prompt:
          "Explain ONE way Busbecq's purpose or audience might affect the reliability of his description.",
        criteria: [
          "Identifies a specific feature of Busbecq's purpose, audience, or situation.",
          "Explains how it could make the description more or less reliable.",
        ],
        model: {
          answer:
            "Busbecq used the Ottomans to criticize his own society, so he may have exaggerated how fair the Ottoman system was.",
          prove:
            "He ends by contrasting Ottoman merit with Europe, where “birth is the standard for everything,” and asks his reader to keep the comparison private.",
          explain:
            "A writer who wants to make a point about his own society has reason to idealize the other side, and he leaves out that the devshirme took boys from their families by force.",
        },
        alternatives:
          "Answers can also note that as an ambassador he saw the court during formal audiences, or that he had diplomatic reasons to study Ottoman strength closely, which could make parts of the account more informed.",
        review: [
          {
            topicId: "world-3-2",
            sectionId: "bureaucracy-military",
            label: "The devshirme",
          },
        ],
      },
    ],
    sourceIds: ["busbecq-forster-1881", "ced-topic-3-2", "ced"],
  },
  // BEGIN mock exam prompts (written for full-length mock exams)
  saq({
    id: "world-3-saq-02",
    unitNumber: 3,
    number: 2,
    headline: "Luther and the sale of indulgences",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    stimulusBlocks: [excerpts.lutherTheses],
    sourceIds: ["luther-works-1915", "ced-topic-3-3"],
    parts: [
      {
        id: "a",
        lenses: ["C", "E"],
        prompt:
          "Identify ONE criticism of the Church's sale of indulgences that Luther makes in the passage.",
        criteria: [
          "States a specific criticism found in the passage.",
          "Connects the criticism to the sale of indulgences, not to the Church in general.",
        ],
        model: {
          answer:
            "Luther criticizes preachers of indulgences for encouraging greed instead of true repentance.",
          prove:
            "He writes that when “the penny jingles into the money-box, gain and avarice can be increased,” and that the pope would rather see St. Peter's church burn than have it built with the “skin, flesh and bones” of his flock.",
          explain:
            "Both statements argue that the sale of pardons enriched the Church at the expense of ordinary believers, who could receive forgiveness through repentance without paying.",
        },
        alternatives:
          "The question in thesis 86 about why the pope does not build St. Peter's with his own wealth also earns the point. A general statement that Luther “disagreed with the Church” does not.",
        review: [
          {
            topicId: "world-3-3",
            sectionId: "protestant-reformation",
            label: "The Protestant Reformation",
          },
        ],
      },
      {
        id: "b",
        lenses: ["T", "C"],
        prompt:
          "Explain ONE way the printing press contributed to the spread of Luther's ideas in the 1500s.",
        criteria: [
          "Names a specific effect of printing, such as pamphlets or vernacular Bibles.",
          "Explains how the effect spread Luther's ideas beyond the clergy or beyond Wittenberg.",
        ],
        model: {
          answer:
            "Printing let Luther's ideas reach large numbers of ordinary people faster than Church authorities could respond.",
          prove:
            "Printers in German towns produced Luther's pamphlets and, from 1522, his German translation of the New Testament in thousands of cheap copies.",
          explain:
            "Because the writings were in German and inexpensive, literate townspeople could read and discuss them without a priest, which spread reform beyond universities and Latin-reading clergy.",
        },
        alternatives:
          "Answers can also explain that printed woodcuts and sermons helped people who could not read follow the debate, or that printing let Reformers in other places, such as Zwingli and Calvin, circulate their own works.",
        review: [
          {
            topicId: "world-3-3",
            sectionId: "protestant-reformation",
            label: "The Protestant Reformation",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P", "C"],
        prompt:
          "Explain ONE political or religious result of the Protestant Reformation in Europe by 1650.",
        criteria: [
          "Names a specific result, such as a treaty, a war, or a Catholic response.",
          "Explains how the Reformation caused or shaped the result.",
        ],
        model: {
          answer:
            "The Reformation divided Europe into Protestant and Catholic states that fought over religion and borders.",
          prove:
            "The Peace of Augsburg in 1555 let each German prince choose Lutheranism or Catholicism for his territory, and the Thirty Years' War from 1618 to 1648 drew in Catholic and Protestant powers across Europe.",
          explain:
            "Because rulers could now tie their authority to different churches, religious disagreement became part of rivalries between states.",
        },
        alternatives:
          "Answers can also explain the Catholic Reformation, including the Council of Trent and the Jesuits, or the creation of state churches such as the Church of England.",
        review: [
          {
            topicId: "world-3-3",
            sectionId: "catholic-reformation",
            label: "The Catholic Reformation",
          },
        ],
      },
    ],
  }),
  saq({
    id: "world-3-saq-03",
    unitNumber: 3,
    number: 3,
    headline: "Religious policy in the Mughal Empire",
    promptTitle: "Short-answer question without a stimulus",
    prompt: "Answer all parts of the question.",
    sourceIds: ["ced-topic-3-2", "ced-topic-3-3"],
    parts: [
      {
        id: "a",
        lenses: ["P", "C"],
        prompt:
          "Identify ONE policy by which the Mughal emperor Akbar tried to win the support of his non-Muslim subjects.",
        criteria: [
          "Names a specific policy.",
          "Connects it to non-Muslim, especially Hindu, subjects.",
        ],
        model: {
          answer: "Akbar ended the jizya, the tax paid by non-Muslims.",
          prove:
            "He abolished the jizya in 1564, and he also appointed Hindu Rajput leaders to high ranks in the imperial service.",
          explain:
            "Removing the tax and opening high offices gave Hindu elites a stake in Mughal rule and helped Akbar govern a population that was mostly Hindu.",
        },
        alternatives:
          "Answers can also identify his policy of sulh-i-kul, or “peace with all,” his marriages to Rajput princesses, or his sponsorship of discussions among scholars of different faiths.",
        review: [
          {
            topicId: "world-3-2",
            sectionId: "religion-legitimacy",
            label: "Religion and legitimacy",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "C"],
        prompt:
          "Describe ONE way the religious policies of Akbar's great-grandson Aurangzeb (r. 1658–1707) differed from Akbar's.",
        criteria: [
          "Names a specific policy of Aurangzeb.",
          "Describes how it differed from Akbar's approach.",
        ],
        model: {
          answer: "Aurangzeb reimposed the jizya on non-Muslims.",
          prove:
            "In 1679 he restored the tax that Akbar had abolished, and he ordered some Hindu temples destroyed.",
          explain:
            "These measures emphasized the privileged position of Islam and ended Akbar's effort to treat Hindus as full partners in the state.",
        },
        alternatives:
          "Answers can also describe Aurangzeb's execution of the Sikh guru Tegh Bahadur in 1675 or his stricter enforcement of Islamic law.",
        review: [
          {
            topicId: "world-3-3",
            sectionId: "sikhism",
            label: "Sikhism",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P", "S"],
        prompt:
          "Explain ONE way religious policy affected the stability of the Mughal Empire in the late 1600s and early 1700s.",
        criteria: [
          "Names a specific group, region, or event.",
          "Explains how religious policy contributed to instability.",
        ],
        model: {
          answer: "Stricter policies contributed to revolts that weakened the empire.",
          prove:
            "The Marathas under Shivaji and his successors resisted Mughal rule in the Deccan, and Sikhs under Guru Gobind Singh organized as a military community after the execution of Guru Tegh Bahadur.",
          explain:
            "Aurangzeb's long wars against these groups drained the treasury and army, and after his death in 1707 the Mughal state lost control of many provinces.",
        },
        alternatives:
          "Answers can also explain Rajput resentment of Aurangzeb's policies or the empire's loss of Hindu allies who had been central to Akbar's system.",
        review: [
          {
            topicId: "world-3-2",
            sectionId: "taxes-revenue",
            label: "Taxes and revenue",
          },
        ],
      },
    ],
  }),
  leq({
    id: "world-3-leq-comparison",
    unitNumber: 3,
    headline: "Governing religious diversity",
    prompt:
      "Evaluate the similarities and differences in how the Ottoman and Mughal Empires governed the religious diversity of their populations in the period 1500 to 1750.",
    sourceIds: ["ced-topic-3-4", "ced-topic-3-2"],
    topicId: "world-3-4",
    outlineReview: { sectionId: "compare-religion", label: "Comparing religious policy" },
    essayReview: { sectionId: "compare-religion", label: "Comparing religious policy" },
    modelResponse:
      "Both the Ottoman and Mughal Empires grew out of Turkic and Mongol traditions of conquest and Islamic rule. After the Ottomans took Constantinople in 1453 and Babur defeated the Delhi sultan at Panipat in 1526, each empire ruled large populations that did not share the ruler's faith, including Christians and Jews in the Ottoman lands and a Hindu majority in northern India.\n\nThe Ottoman and Mughal Empires were similar in practical accommodation of non-Muslims within states led by Sunni rulers, but they differed in method: the Ottomans organized religious communities into semi-self-governing groups, while the Mughals under Akbar tried to bring Hindu elites into the ruling class, though later policy shifted under Aurangzeb.\n\nBoth empires accepted that non-Muslims could practice their religions. Ottoman rulers allowed Christians and Jews to worship and to pay the jizya in exchange for protection, and in 1492 Sultan Bayezid II welcomed Jews expelled from Spain. Akbar likewise permitted Hindu worship, and in the early Mughal period non-Muslims also paid the jizya until he abolished it in 1564. In each case, rulers valued the stability and tax revenue that came from keeping diverse subjects content.\n\nThe empires differed in how they organized that diversity. The Ottomans formalized the millet system, in which Orthodox Christians, Armenians, and Jews ran their own courts and schools under religious leaders who answered to the sultan. By contrast, Akbar integrated Hindu leaders directly into the state. He married Rajput princesses, gave Rajputs high ranks in the mansabdar system, and promoted a policy of sulh-i-kul, or peace with all. Ottoman integration of non-Muslims was more through separate communities; Mughal integration was more through shared offices.\n\nPolicy also changed over time in the Mughal case. Aurangzeb reimposed the jizya in 1679 and ordered some temples destroyed, and his long wars with the Marathas, Rajputs, and Sikhs strained the empire. The Ottoman system was more stable over this period, though Ottoman rulers treated Shi'a as threats during the wars against the Safavids.\n\nIn conclusion, both empires governed religious diversity pragmatically, but the Ottomans relied on separate, self-governing communities while Akbar's Mughals integrated Hindu elites into the state, a policy later reversed with costly consequences.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes the Turkic-Mongol origins of both empires and their conquests of Constantinople and northern India, which created religiously diverse states.",
      },
      {
        label: "Thesis",
        text: "The thesis names a similarity and a difference and states the reasons for each, so it establishes a line of reasoning.",
      },
      {
        label: "Evidence",
        text: "The jizya, Bayezid II and Spanish Jews, the millet system, Akbar's Rajput policy and sulh-i-kul, and Aurangzeb's reimposition of the jizya are specific and used to support comparison.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay is organized by points of comparison, explains why the approaches differed, and qualifies the comparison by noting that Mughal policy changed and that Ottoman tolerance had limits.",
      },
    ],
    alternateModel:
      "A different strong essay could compare the Ottoman and Safavid empires, arguing that both used religion to legitimize rule but differed because the Safavids imposed Shi'ism on a mostly Sunni population while the Ottomans governed a religiously mixed empire with formal communities.",
    commonErrors: [
      "Describing the Ottoman Empire, then the Mughal Empire, without comparing them directly.",
      "Treating Akbar's policies as if they described the whole Mughal period.",
      "Claiming that either empire practiced modern religious equality.",
      "Using dates outside 1500 to 1750 as the main evidence.",
    ],
  }),
  // END mock exam prompts
];

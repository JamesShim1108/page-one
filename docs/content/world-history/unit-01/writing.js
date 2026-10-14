// Writing prompts and criteria are content. Saving and review behavior live in app/writing/.
import { excerpts } from "../excerpts.js";
import { dbq, dbqDocument, leq, saq } from "../writing-kit.js";

export const writingQuizzes = [
  {
    id: "world-1-saq",
    version: 1,
    courseId: "world",
    unitId: "world-1",
    title: "Unit 1 writing quiz",
    prompt:
      "States across the world developed different ways to maintain authority in the period c. 1200 to c. 1450. Answer all three parts below.",
    instructions:
      "Write three APE responses, one for each part. Answer the question directly, Prove it with specific historical evidence, and Explain how that evidence supports your answer. Aim for a short paragraph per part, usually about three sentences. There is no required word count.",
    parts: [
      {
        id: "a",
        lenses: ["C", "P"],
        prompt:
          "Explain ONE way a belief system helped a ruler or government maintain authority in either Song China or Mali during the period c. 1200 to c. 1450.",
        criteria: [
          "Name a relevant way beliefs supported authority in Song China or Mali.",
          "Use an accurate, specific example within the period.",
          "Explain how that example strengthened authority, rather than only describing the belief.",
        ],
        model: {
          answer:
            "Confucian teaching helped the Song government justify political hierarchy.",
          prove:
            "Civil service examinations required candidates to study Confucian texts, which emphasized duties within ordered relationships.",
          explain:
            "Recruiting officials educated in those duties linked government service to a shared moral tradition and reinforced expectations of obedience to imperial authority.",
        },
        alternatives:
          "Mansa Musa’s patronage of Islamic learning or his 1324-1325 pilgrimage can also work if you explain how it enhanced his legitimacy or connections. Naming a religion without explaining the political link is insufficient.",
        review: [
          {
            topicId: "world-1-1",
            sectionId: "governance",
            label: "Song government",
          },
          {
            topicId: "world-1-5",
            sectionId: "africa-mali",
            label: "Mali",
          },
        ],
      },
      {
        id: "b",
        lenses: ["In", "E", "T", "P"],
        prompt:
          "Explain ONE way an agricultural adaptation or labor system supported a state in the Americas during the period c. 1200 to c. 1450.",
        criteria: [
          "Identify a relevant American state and an agricultural adaptation or labor system.",
          "Describe a specific example accurately.",
          "Explain how food production or mobilized labor supported the state.",
        ],
        model: {
          answer:
            "Intensive agriculture helped the Mexica support the population of their capital.",
          prove:
            "Farmers used chinampas, constructed growing beds in shallow lake areas, to produce crops near Tenochtitlan.",
          explain:
            "That food supply helped sustain urban residents and specialists, giving the state a stronger base for administration and expansion.",
        },
        alternatives:
          "Inca mit’a obligations or Andean terraces are acceptable when linked to resources for administration, infrastructure, or armies. Place early Inca expansion in the fifteenth century. Do not describe the later Spanish colonial mita as an Inca policy.",
        review: [
          {
            topicId: "world-1-4",
            sectionId: "americas-mexica",
            label: "Mexica agriculture",
          },
          {
            topicId: "world-1-4",
            sectionId: "americas-inca",
            label: "Inca labor",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P", "S", "E"],
        prompt:
          "Explain ONE difference between how Song China and either the Mexica state or the Inca state administered their territories during the period c. 1200 to c. 1450.",
        criteria: [
          "Make an explicit difference about administration, comparing Song China with one named American state.",
          "Support both sides with accurate evidence.",
          "Explain what the difference meant for organizing officials, subjects, or resources.",
        ],
        model: {
          answer:
            "Song China emphasized examination-selected officials, while the Mexica often collected tribute through existing local rulers.",
          prove:
            "Song candidates studied Confucian writings for civil service examinations, whereas Mexica tributary communities commonly retained leaders who delivered required goods.",
          explain:
            "These arrangements gave Song rule a shared bureaucratic recruitment system, while Mexica control relied more on enforcing obligations through subordinate political communities.",
        },
        alternatives:
          "An Inca comparison can contrast Song examination recruitment with Inca officials and hereditary local leaders coordinating labor obligations. Both states had administration, so claiming that the Inca had no bureaucracy would not work. The states need not exist in the exact same year to be compared within the period.",
        review: [
          {
            topicId: "world-1-7",
            sectionId: "compare-governance",
            label: "Comparing administration",
          },
          {
            topicId: "world-1-4",
            sectionId: "americas-inca",
            label: "Inca administration",
          },
        ],
      },
    ],
    note: "This is an original classroom SAQ with three parts. APE is a writing scaffold, not a College Board scoring formula. The review offers one self-assessed point per part; it does not automatically grade your writing or predict an exam score.",
    headline: "Put it in your words.",
    promptTitle: "Building and maintaining authority",
    scaffold: [
      {
        label: "A / Answer",
        text: "Make a direct claim.",
      },
      {
        label: "P / Prove",
        text: "Use specific evidence.",
      },
      {
        label: "E / Explain",
        text: "Connect evidence to the claim.",
      },
    ],
    sidebar: {
      title: "A short paragraph is enough.",
      paragraphs: [
        "Use a concrete example, then explain what it shows. Part C needs evidence for both societies.",
        "You do not need an introduction or conclusion for the whole question.",
      ],
    },
  },
  // BEGIN unit-01 stimulus saq
  // Stimulus-based SAQ paired with the Unit 1 Practice Test.
  {
    id: "world-1-saq-02",
    version: 1,
    courseId: "world",
    unitId: "world-1",
    title: "Unit 1 SAQ 02",
    headline: "Merchants, faith, and states in Southeast Asia",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions:
      "Answer all three parts. For each part, Answer the question directly, Prove it with specific historical evidence, and Explain how the evidence supports your answer. On the AP exam each part earns one point. This is self-assessment practice, not official College Board scoring.",
    note: "Original Page One practice in AP short-answer format. Model answers show one strong response; other accurate, well-supported answers can earn the point.",
    exerciseType: "saq",
    stimulusBlocks: [excerpts.poloFerlec],
    scaffold: [
      {
        label: "Answer",
        text: "Respond directly to the task verb: identify, describe, or explain.",
      },
      {
        label: "Prove",
        text: "Name a specific person, place, institution, or development.",
      },
      {
        label: "Explain",
        text: "Show how or why the evidence answers the question.",
      },
    ],
    parts: [
      {
        id: "a",
        lenses: ["C", "E"],
        prompt:
          "Identify ONE way the passage shows a connection between trade and religion in Southeast Asia.",
        criteria: [
          "Names a specific connection stated in the passage.",
          "Links trade (merchants, goods, or ports) with religious change.",
        ],
        model: {
          answer:
            "The passage shows that Muslim merchants spread Islam to the towns they traded with.",
          prove:
            "Polo writes that Ferlec was so frequented by Saracen merchants that they converted the townspeople to Islam.",
          explain:
            "Regular commercial visits created the contact through which a new faith was introduced, so trade served as a path for religious change.",
        },
        alternatives:
          "Answers can also note that conversion was limited to the towns, which shows that religion followed the routes merchants used.",
        review: [
          {
            topicId: "world-1-3",
            sectionId: "asia-sea",
            label: "Ports and Islam",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "S"],
        prompt:
          "Explain ONE reason why Islam spread in coastal Southeast Asia during the period c. 1200 to c. 1450.",
        criteria: [
          "Gives a specific historical reason, not only a restatement of the passage.",
          "Explains how that reason encouraged conversion or the growth of Muslim communities.",
        ],
        model: {
          answer:
            "Rulers of port cities adopted Islam because it strengthened their ties to Muslim trading partners.",
          prove:
            "Melaka became a Muslim sultanate in the fifteenth century and grew into a major port linking the Indian Ocean and the South China Sea.",
          explain:
            "A shared faith built trust with Muslim merchants from Gujarat, Arabia, and Persia, which attracted trade and revenue to the port and encouraged others to convert.",
        },
        alternatives:
          "The work of Sufi teachers, intermarriage between merchants and local families, and the growth of Muslim merchant communities in ports can also earn the point if explained.",
        review: [
          {
            topicId: "world-1-3",
            sectionId: "asia-sea",
            label: "Melaka and maritime states",
          },
          {
            topicId: "world-1-3",
            sectionId: "asia-devotion",
            label: "Sufism",
          },
        ],
      },
      {
        id: "c",
        lenses: ["C"],
        prompt:
          "Explain ONE way Marco Polo's point of view might affect how historians use this passage as evidence.",
        criteria: [
          "Identifies a specific feature of Polo's point of view, purpose, or situation.",
          "Explains how that feature affects the passage's usefulness or reliability.",
        ],
        model: {
          answer:
            "Polo was a European Christian outsider, so he described local beliefs in dismissive terms.",
          prove:
            "He calls the island's people “Idolaters,” a label that lumps together Buddhist, Hindu, and local traditions, and he passed this coast only briefly on his voyage home.",
          explain:
            "Historians can use the passage as evidence that Islam was spreading through ports, but they should not trust his descriptions of non-Muslim beliefs without other sources.",
        },
        alternatives:
          "Answers can also explain that Polo dictated the book years later from memory, or that he wrote to impress European readers with distant marvels.",
        review: [
          {
            topicId: "world-1-3",
            sectionId: "asia-beliefs",
            label: "Beliefs in South and Southeast Asia",
          },
        ],
      },
    ],
    sourceIds: ["polo-yule-1903", "ced-topic-1-3", "ced"],
  },
  // END unit-01 stimulus saq
  // BEGIN mock exam prompts (written for full-length mock exams)
  saq({
    id: "world-1-saq-03",
    unitNumber: 1,
    number: 3,
    headline: "Authority in Song China and feudal Europe",
    promptTitle: "Short-answer question without a stimulus",
    prompt: "Answer all parts of the question.",
    sourceIds: ["ced-topic-1-1", "ced-topic-1-6"],
    parts: [
      {
        id: "a",
        lenses: ["P", "S"],
        prompt:
          "Identify ONE way rulers of Song China chose officials for their government.",
        criteria: [
          "Names a specific method or institution.",
          "Connects it to the Song bureaucracy.",
        ],
        model: {
          answer: "Song rulers chose many officials through civil service examinations.",
          prove:
            "Candidates studied Confucian classics and took written examinations, and successful candidates received posts in the imperial bureaucracy.",
          explain:
            "The examinations let the emperor recruit educated officials whose careers depended on the central government instead of on aristocratic birth alone.",
        },
        alternatives:
          "Answers can also identify the use of recommendations from officials or the use of examination degrees to rank officials.",
        review: [
          {
            topicId: "world-1-1",
            sectionId: "governance",
            label: "Governance in East Asia",
          },
        ],
      },
      {
        id: "b",
        lenses: ["P", "E"],
        prompt:
          "Describe ONE way political authority in feudal Western Europe differed from political authority in Song China.",
        criteria: [
          "Describes a specific feature of European authority.",
          "Makes the difference from Song China clear.",
        ],
        model: {
          answer:
            "Power in Western Europe was divided among kings, nobles, and the Church instead of being centralized in a bureaucracy.",
          prove:
            "Kings depended on lords who held land in return for military service, and the lords' own vassals owed loyalty to them, so a king could not directly command all his subjects.",
          explain:
            "Song emperors ruled through officials who answered to the court, so European rulers had less direct control over their territories.",
        },
        alternatives:
          "Answers can also describe manorialism, in which lords controlled the labor of serfs, or the weakness of royal tax systems compared with Song revenues.",
        review: [
          {
            topicId: "world-1-6",
            sectionId: "europe-power",
            label: "Power in medieval Europe",
          },
        ],
      },
      {
        id: "c",
        lenses: ["P", "C"],
        prompt:
          "Explain ONE way the Catholic Church influenced political authority in Western Europe between 1200 and 1450.",
        criteria: [
          "Names a specific action, institution, or conflict.",
          "Explains how it affected rulers or their power.",
        ],
        model: {
          answer: "The Church could pressure rulers by threatening spiritual penalties.",
          prove:
            "Pope Innocent III placed England under an interdict and excommunicated King John, and in 1213 John submitted and accepted the pope as his feudal lord.",
          explain:
            "Because most people believed these penalties affected their salvation, rulers who angered the pope risked losing support from their subjects.",
        },
        alternatives:
          "Answers can also explain that the Church crowned kings and emperors, ran courts under canon law, or collected tithes that gave it wealth independent of rulers.",
        review: [
          {
            topicId: "world-1-6",
            sectionId: "europe-faith",
            label: "Faith and the Church",
          },
        ],
      },
    ],
  }),
  // END mock exam prompts
];

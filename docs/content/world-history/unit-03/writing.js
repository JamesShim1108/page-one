// Unit 3 writing practice: a stimulus-based SAQ with model APE responses.
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
];

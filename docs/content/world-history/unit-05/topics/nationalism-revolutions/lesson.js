// Original Page One lesson for CED Topic 5.2. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-05.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-5-2",
  unitId: "world-5",
  courseId: "world",
  code: "5.2",
  title: "Nationalism and Revolutions in the Period from 1750 to 1900",
  period: "c. 1750–1900",
  status: "ready",
  order: 2,
  summary:
    "How the American, French, Haitian, and Latin American revolutions and the rise of nationalism reshaped states.",
  minutes: 13,
  learningGoals: [
    "Explain causes and effects of the various revolutions in the period from 1750 to 1900.",
    "Explain how nationalism led to the unification of Italy and Germany.",
  ],
  bigIdea:
    "Enlightenment ideas and resentment of imperial or royal rule produced revolutions across the Atlantic world, while nationalism created new states in Europe.",
  context:
    "By 1750, colonists and subjects had grievances about taxes, privilege, and exclusion. Enlightenment ideas gave those grievances a common language.",
  sections: [
    {
      id: "atlantic-revolutions",
      title: "American and French revolutions",
      conceptTitle: "American and French revolutions",
      lenses: ["P", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "British colonists in North America declared independence in 1776, justifying revolt with natural rights and consent. Thomas Paine's pamphlet Common Sense helped persuade colonists to break with Britain.",
        },
        {
          type: "paragraph",
          text: "In France, financial crisis and resentment of noble privilege led to revolution in 1789. The National Assembly issued the Declaration of the Rights of Man and of the Citizen. Olympe de Gouges answered with a declaration of the rights of women in 1791.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Debt and taxes created conflict with rulers, and Enlightenment ideas turned that conflict into demands for new governments based on rights.",
        },
      ],
      takeaway:
        "Revolutions in North America and France applied Enlightenment ideas to real governments.",
      sourceIds: ["ced-topic-5-2"],
    },
    {
      id: "haiti-latin-america",
      title: "Haiti and Latin America",
      conceptTitle: "Haiti and Latin America",
      lenses: ["P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "In the French colony of Saint-Domingue, enslaved people revolted in 1791. Led by Toussaint Louverture and others, they won independence as Haiti in 1804, the only state founded by a successful revolt of enslaved people.",
        },
        {
          type: "paragraph",
          text: "After Napoleon invaded Spain in 1808, creole leaders such as Simón Bolívar led independence wars that freed most of Spanish South America by 1825. Mexico became independent in 1821 and Brazil in 1822.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Latin American independence was led mostly by creole elites. It did not overturn the colonial social hierarchy.",
        },
      ],
      takeaway:
        "Revolutions in the Americas ended colonial rule but left many inequalities intact.",
      sourceIds: ["ced-topic-5-2"],
    },
    {
      id: "nationalism-unification",
      title: "Nationalism and unification",
      conceptTitle: "Nationalism and unification",
      lenses: ["P", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "Nationalism is the belief that people who share a language, culture, and history should form one nation with its own state. It united some peoples and divided empires.",
        },
        {
          type: "paragraph",
          text: "Italy was unified in 1861 through Cavour's diplomacy and Garibaldi's campaigns. Prussia's Otto von Bismarck unified Germany through war, proclaiming the German Empire in 1871.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Nationalism was not always democratic. Bismarck's unification was led by a conservative monarchy through war.",
        },
      ],
      takeaway:
        "Nationalism created Italy and Germany and threatened multiethnic empires.",
      sourceIds: ["ced-topic-5-2"],
    },
  ],
  vocabulary: [
    {
      id: "nationalism",
      topicId: "world-5-2",
      term: "Nationalism",
      definition:
        "The belief that people who share a language, culture, and history should form a nation with its own state.",
    },
    {
      id: "declaration-rights-man",
      topicId: "world-5-2",
      term: "Declaration of the Rights of Man and of the Citizen",
      definition:
        "A 1789 statement of rights issued by the French National Assembly, based on Enlightenment ideas.",
    },
    {
      id: "haiti",
      topicId: "world-5-2",
      term: "Haiti",
      definition:
        "The independent nation founded in 1804 by formerly enslaved people after the revolution in the French colony of Saint-Domingue.",
    },
    {
      id: "creole",
      topicId: "world-5-2",
      term: "creole",
      definition: "A person of Spanish descent born in the Americas.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-5-nationalism",
      "world-5-declaration-rights-man",
      "world-5-haiti",
      "world-5-creole",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 4 bridge",
      title: "Creole resentment",
      body: "Unit 4 described the casta system, in which Spanish-born peninsulares held the highest offices. Creole resentment of that system helped drive independence movements.",
      transferQuestion: "How did the casta system contribute to independence movements?",
      feedback: "Connect creole exclusion to their leadership of revolution.",
      links: [
        {
          topicId: "world-4-7",
          sectionId: "casta-system",
          label: "Review the casta system",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-5-2", "ced"],
};

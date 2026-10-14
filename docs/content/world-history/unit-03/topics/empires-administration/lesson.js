// Original Page One lesson for CED Topic 3.2. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-03.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-3-2",
  unitId: "world-3",
  courseId: "world",
  code: "3.2",
  title: "Empires: Administration",
  period: "c. 1450–1750",
  status: "ready",
  order: 2,
  summary:
    "How rulers used officials, soldiers, religion, monuments, and taxes to legitimize and consolidate power.",
  minutes: 14,
  learningGoals: [
    "Explain how rulers used bureaucratic elites and military professionals to keep control.",
    "Explain how religion, art, and architecture legitimized rule.",
    "Compare the methods empires used to collect revenue.",
  ],
  bigIdea:
    "Rulers kept large empires together by recruiting loyal officials and soldiers, linking their authority to religion and spectacle, and finding reliable ways to collect taxes.",
  context:
    "Conquest created empires, but administration kept them. Rulers from Europe to East Asia faced the same problems: finding loyal servants, persuading subjects to obey, and paying for armies and courts.",
  sections: [
    {
      id: "bureaucracy-military",
      title: "Loyal officials and soldiers",
      conceptTitle: "Loyal officials and soldiers",
      lenses: ["P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "The Ottomans used the devshirme, a system in which Christian boys from the Balkans were taken from their families, converted to Islam, and trained to serve the sultan. The most talented became administrators; many others joined the Janissaries. Because they had no noble family to support them, they depended on the sultan.",
        },
        {
          type: "paragraph",
          text: "In Japan, the Tokugawa shogunate, established in 1603, moved samurai into castle towns and paid them fixed rice stipends. The alternate attendance system required daimyo, the regional lords, to live part of the time in Edo and leave their families there as hostages.",
        },
        {
          type: "paragraph",
          text: "The Qing kept the Ming examination system, so Chinese scholars staffed most offices. Many top posts were shared by one Manchu and one Han Chinese official.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Rulers feared powerful nobles, so they recruited servants who owed everything to the throne, which reduced the chance that officials would build rival power bases.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The devshirme was coercive. Describing it only as a path to opportunity leaves out that boys were taken from their families by force.",
        },
      ],
      takeaway:
        "Rulers sought officials and soldiers whose loyalty depended on the ruler, not on their own family wealth.",
      sourceIds: ["ced-topic-3-2"],
    },
    {
      id: "religion-legitimacy",
      title: "Religion and the right to rule",
      conceptTitle: "Religion and the right to rule",
      lenses: ["C", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Many European monarchs claimed divine right, the belief that God chose kings and that resisting them was resisting God. Louis XIV of France, who ruled from 1643 to 1715, became a model of absolutism, ruling without calling France's representative assembly.",
        },
        {
          type: "paragraph",
          text: "In Songhai, Askia Muhammad, who ruled from 1493 to 1528, promoted Islam, appointed Muslim judges, and made a pilgrimage to Mecca. Earlier, Mexica rulers had linked their power to sacred duties, including human sacrifice to the sun god.",
        },
        {
          type: "paragraph",
          text: "Ottoman sultans took the title of caliph and protected the holy cities of Mecca and Medina after 1517. Safavid shahs presented themselves as leaders of Shi'a Islam.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Religious legitimacy did not mean everyone shared the ruler's faith. Askia Muhammad's promotion of Islam left rural religious practice largely unchanged.",
        },
      ],
      takeaway:
        "Rulers tied their authority to religious ideas so that obedience seemed a sacred duty.",
      sourceIds: ["ced-topic-3-2"],
    },
    {
      id: "art-architecture",
      title: "Art and monumental architecture",
      conceptTitle: "Art and monumental architecture",
      lenses: ["C"],
      blocks: [
        {
          type: "paragraph",
          text: "The Mughal emperor Shah Jahan built the Taj Mahal as a tomb for his wife, blending Persian, Indian, and Islamic designs. The architect Sinan designed the Süleymaniye Mosque for Suleiman I. Louis XIV moved his court to Versailles in 1682 and turned daily life there into ceremony centered on the king.",
        },
        {
          type: "paragraph",
          text: "Qing emperors commissioned portraits showing themselves as Confucian scholars, Buddhist patrons, and Manchu warriors. In the Americas, the Inca had covered the Temple of the Sun at Cusco with gold.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Rulers needed subjects and rivals to see their power, so they spent heavily on monuments, which displayed wealth and piety and gave the dynasty a lasting public image.",
        },
      ],
      takeaway: "Monuments and art turned royal power into something people could see.",
      sourceIds: ["ced-topic-3-2"],
    },
    {
      id: "taxes-revenue",
      title: "Collecting revenue",
      conceptTitle: "Collecting revenue",
      lenses: ["E", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "In Mughal India, zamindars, local landholders, collected taxes from peasants and kept a share. Ottoman rulers increasingly used tax farming, selling the right to collect certain taxes to bidders who paid in advance.",
        },
        {
          type: "paragraph",
          text: "The Mexica had recorded tribute owed by conquered towns in painted lists. In Ming China, reforms in the late 1500s merged many taxes and labor duties into one payment in silver, which increased Chinese demand for silver from Japan and the Americas.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Tax farming raised money quickly but let collectors squeeze peasants. Do not describe any system as simply efficient without naming its costs.",
        },
      ],
      takeaway:
        "Revenue systems relied on intermediaries, which made collection possible but also created room for abuse.",
      sourceIds: ["ced-topic-3-2"],
    },
  ],
  vocabulary: [
    {
      id: "devshirme",
      topicId: "world-3-2",
      term: "devshirme",
      definition:
        "The Ottoman practice of taking Christian boys from the Balkans, converting them to Islam, and training them as soldiers or officials loyal to the sultan.",
    },
    {
      id: "divine-right",
      topicId: "world-3-2",
      term: "divine right",
      definition:
        "The belief that monarchs received their authority from God and answered to God alone.",
    },
    {
      id: "absolutism",
      topicId: "world-3-2",
      term: "absolutism",
      definition:
        "A system in which a monarch claims complete authority and rules without sharing power with nobles or representative assemblies.",
    },
    {
      id: "zamindars",
      topicId: "world-3-2",
      term: "zamindars",
      definition:
        "Landholders in Mughal India who collected taxes from peasants and passed a share to the state.",
    },
    {
      id: "tax-farming",
      topicId: "world-3-2",
      term: "tax farming",
      definition:
        "A system in which a government sells the right to collect taxes to private bidders, who pay in advance and keep what they collect beyond that amount.",
    },
    {
      id: "daimyo",
      topicId: "world-3-2",
      term: "daimyo",
      definition:
        "Regional lords in Japan who controlled lands and samurai under the authority of the shogun.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-3-devshirme",
      "world-3-divine-right",
      "world-3-absolutism",
      "world-3-zamindars",
      "world-3-tax-farming",
      "world-3-daimyo",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 1 bridge",
      title: "Examinations and loyalty",
      body: "Song China selected officials by examination in Unit 1. The Qing kept that system, while the Ottomans relied on the devshirme. Both aimed to staff government with servants loyal to the ruler.",
      transferQuestion:
        "How did the Qing and the Ottomans each try to make officials loyal to the ruler?",
      feedback:
        "Name each method and explain why it limited the power of independent elites.",
      links: [
        {
          topicId: "world-1-1",
          sectionId: "governance",
          label: "Review Song government",
        },
      ],
    },
    {
      id: "c2",
      type: "Within Unit 3",
      title: "Legitimacy and religious change",
      body: "Rulers used religion to support their authority, but religious movements such as the Reformation and the Sunni and Shi'a split could also divide subjects and spark wars.",
      transferQuestion:
        "How could religion both strengthen and weaken a ruler's authority?",
      feedback: "Give one example of each and explain the mechanism.",
      links: [
        {
          topicId: "world-3-3",
          sectionId: "sunni-shia",
          label: "Review the Ottoman and Safavid rivalry",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-3-2", "ced"],
};

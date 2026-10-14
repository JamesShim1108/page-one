// Original Page One lesson for CED Topic 3.4. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-03.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-3-4",
  unitId: "world-3",
  courseId: "world",
  code: "3.4",
  title: "Comparison in Land-Based Empires",
  period: "c. 1450–1750",
  status: "ready",
  order: 4,
  summary:
    "How the Ottoman, Safavid, Mughal, and Qing empires compared in expansion, legitimacy, and their treatment of diverse subjects.",
  minutes: 10,
  learningGoals: [
    "Compare how land-based empires expanded and increased their influence from 1450 to 1750.",
    "Compare how rulers legitimized power and governed diverse populations.",
    "Make a defensible comparative claim supported with specific evidence.",
  ],
  bigIdea:
    "Land-based empires shared common problems, but they solved them in different ways depending on their rulers, subjects, and resources.",
  context:
    "Comparison is a core AP skill. A strong comparison names the same feature in two empires, gives evidence for both, and explains why the similarity or difference mattered.",
  sections: [
    {
      id: "compare-expansion",
      title: "Comparing expansion",
      conceptTitle: "Comparing expansion",
      lenses: ["P", "T"],
      blocks: [
        {
          type: "paragraph",
          text: "All four major land empires used gunpowder weapons, but in different ways. The Ottomans built a large salaried infantry, the Janissaries. The Mughals used field cannons at Panipat but relied heavily on cavalry and alliances with Rajput princes. The Qing banners combined cavalry traditions with firearms.",
        },
        {
          type: "paragraph",
          text: "Each empire expanded at frontiers where rivals were weak or divided. The Qing defeated the Zunghar Mongols, the Ottomans advanced into Hungary, and the Mughals pushed south into the Deccan.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "A comparison needs both sides. Saying the Ottomans used Janissaries is a description; adding how the Mughals differed makes it a comparison.",
        },
      ],
      takeaway:
        "Similar weapons led to different military systems shaped by each empire's society.",
      sourceIds: ["ced-topic-3-4"],
    },
    {
      id: "compare-legitimacy",
      title: "Comparing legitimacy",
      conceptTitle: "Comparing legitimacy",
      lenses: ["C", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Rulers combined religion, ceremony, and monuments. Ottoman sultans claimed the title of caliph, Safavid shahs led Shi'a Islam, Mughal emperors built grand tombs and mosques, and Qing emperors presented themselves as Confucian rulers to Chinese subjects and as Buddhist patrons to Tibetans and Mongols.",
        },
        {
          type: "paragraph",
          text: "Each dynasty was a ruling minority. Inclusion of local elites, such as Rajputs in Mughal service or Han Chinese officials in the Qing bureaucracy, made rule more stable.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Because rulers governed populations very different from themselves, they adopted multiple ways of claiming authority, which helped them win the cooperation of different groups.",
        },
      ],
      takeaway:
        "Empires that spoke to several audiences at once were better able to hold diverse subjects.",
      sourceIds: ["ced-topic-3-4"],
    },
    {
      id: "compare-religion",
      title: "Comparing religious policy",
      conceptTitle: "Comparing religious policy",
      lenses: ["C", "S", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "The Ottomans allowed Christian and Jewish communities to keep their own religious leaders and courts for family matters, while non-Muslims paid the jizya tax. Akbar abolished the jizya in 1564 and brought Hindu nobles into high office. Aurangzeb restored it in 1679, and revolts followed.",
        },
        {
          type: "paragraph",
          text: "The Safavids, by contrast, pressed for conversion to Shi'ism. Religious policy could unify a ruling group, but it could also alienate subjects.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Tolerance in this period did not mean equality. Ottoman non-Muslims paid extra taxes and faced legal limits even while practicing their faith.",
        },
      ],
      takeaway:
        "Religious policy ranged from accommodation to pressure, with real effects on stability.",
      sourceIds: ["ced-topic-3-4"],
    },
  ],
  vocabulary: [
    {
      id: "jizya",
      topicId: "world-3-4",
      term: "jizya",
      definition:
        "A tax paid by non-Muslim subjects in many Muslim-ruled states, abolished by Akbar and restored by Aurangzeb in Mughal India.",
    },
    {
      id: "rajputs",
      topicId: "world-3-4",
      term: "Rajputs",
      definition:
        "Hindu warrior princes of northern and western India, many of whom served the Mughal emperors after Akbar made alliances with them.",
    },
    {
      id: "banners",
      topicId: "world-3-4",
      term: "banners",
      definition:
        "Manchu military and social units that organized the Qing army and its families.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: ["world-3-jizya", "world-3-rajputs", "world-3-banners"],
  },
  connections: [
    {
      id: "c1",
      type: "Looking ahead",
      title: "From land empires to maritime empires",
      body: "Unit 4 turns to empires built by sea. Comparing land-based and maritime empires helps explain why some states focused on frontiers while others built networks of ports and colonies.",
      transferQuestion:
        "What is one difference between how a land-based empire and a maritime empire expanded?",
      feedback:
        "Name a specific land empire and explain how its expansion depended on territory rather than sea routes.",
      links: [
        {
          topicId: "world-3-1",
          sectionId: "islamic-empires",
          label: "Review land-based expansion",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-3-4", "ced"],
};

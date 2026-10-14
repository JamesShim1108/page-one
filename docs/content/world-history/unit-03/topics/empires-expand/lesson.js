// Original Page One lesson for CED Topic 3.1. Reading definitions come from
// this lesson's vocabulary through ../../../glossary/unit-03.js.

export const lesson = {
  schemaVersion: 1,
  id: "world-3-1",
  unitId: "world-3",
  courseId: "world",
  code: "3.1",
  title: "Empires Expand",
  period: "c. 1450–1750",
  status: "ready",
  order: 1,
  summary:
    "How gunpowder weapons, military organization, and rivalries shaped the growth of the Ottoman, Safavid, Mughal, Qing, and Songhai states.",
  minutes: 12,
  learningGoals: [
    "Explain how and why land-based empires developed and expanded from 1450 to 1750.",
    "Describe the role of gunpowder weapons without treating them as the only cause of expansion.",
    "Explain how political and religious rivalries led to conflict between states.",
  ],
  bigIdea:
    "Land-based empires grew when rulers combined new gunpowder weapons with disciplined armies, effective revenue systems, and alliances with local elites.",
  context:
    "Gunpowder had spread from China across Eurasia before 1450. In the following centuries, rulers who could afford cannons, muskets, and trained soldiers built some of the largest states the world had yet seen.",
  sections: [
    {
      id: "gunpowder-armies",
      title: "Gunpowder and military organization",
      conceptTitle: "Gunpowder and military organization",
      lenses: ["T", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Cannons could break city walls that had resisted older siege methods. When the Ottoman sultan Mehmed II took Constantinople in 1453, giant cannons pounded its defenses for weeks. Muskets gave infantry a way to defeat cavalry when soldiers fired in disciplined ranks.",
        },
        {
          type: "paragraph",
          text: "Firearms were expensive. A ruler needed revenue to buy cannons, pay gunners, and keep soldiers trained all year. The Janissaries, the Ottoman standing infantry, show how a state paired new weapons with a permanent professional force.",
        },
        {
          type: "paragraph",
          text: "Historians sometimes call the Ottoman, Safavid, and Mughal states gunpowder empires. The label highlights a real change, but it can hide the importance of cavalry, diplomacy, and tax collection.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Rulers with steady revenue bought cannons and paid standing armies, which let them take fortified cities and defeat rivals, which brought more land and taxes to pay for still larger armies.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Do not write that guns alone built these empires. A strong answer links weapons to the money, organization, and alliances that made them useful.",
        },
      ],
      takeaway:
        "Gunpowder weapons mattered most when states could pay for them and organize soldiers to use them.",
      sourceIds: ["ced-topic-3-1"],
    },
    {
      id: "islamic-empires",
      title: "Ottoman, Safavid, and Mughal expansion",
      conceptTitle: "Ottoman, Safavid, and Mughal expansion",
      lenses: ["P", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "The Ottoman Empire grew from a small state in Anatolia. After 1453, Constantinople, renamed Istanbul over time, became its capital. Selim I conquered the Mamluk sultanate of Egypt and Syria in 1517, and Suleiman I, who ruled from 1520 to 1566, pushed into Hungary and besieged Vienna in 1529.",
        },
        {
          type: "paragraph",
          text: "The Safavid Empire began in 1501 when Ismail I took power in Persia. Shah Abbas I, who ruled from 1588 to 1629, reorganized the army with firearms and enslaved soldiers from the Caucasus and made Isfahan a splendid capital.",
        },
        {
          type: "paragraph",
          text: "The Mughal Empire began in 1526 when Babur defeated the Sultan of Delhi at Panipat using field guns. His grandson Akbar, who ruled from 1556 to 1605, expanded across northern India and drew Hindu Rajput princes into his service.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The Ottomans did not convert most of their Christian subjects, and the Mughals did not convert most of their Hindu subjects. Muslim rule and a Muslim majority are different things.",
        },
      ],
      takeaway:
        "Three Muslim dynasties built large empires in Southwest and South Asia, each by combining conquest with ways of governing diverse subjects.",
      sourceIds: ["ced-topic-3-1"],
    },
    {
      id: "qing-expansion",
      title: "The Qing dynasty",
      conceptTitle: "The Qing dynasty",
      lenses: ["P", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "The Manchus, from northeast of the Great Wall, organized their society into military banners. In 1644, after rebels took Beijing and the last Ming emperor died, Manchu armies entered China and founded the Qing dynasty.",
        },
        {
          type: "paragraph",
          text: "Qing emperors expanded far beyond Ming borders. They took Taiwan in 1683 and, in the 1750s, defeated the Zunghar Mongols and added Xinjiang. The Qianlong emperor, who ruled from 1735 to 1796, presided over the empire at its largest.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Ming weakness and rebellion opened Beijing to the Manchus, and the banner armies then allowed the Qing to defeat rivals on the steppe and push China's borders into Central Asia.",
        },
      ],
      takeaway:
        "The Qing were a land-based empire that conquered China and then expanded it, ruling as a small Manchu minority.",
      sourceIds: ["ced-topic-3-1"],
    },
    {
      id: "rivalries",
      title: "Rivalries between states",
      conceptTitle: "Rivalries between states",
      lenses: ["P", "E", "C"],
      blocks: [
        {
          type: "paragraph",
          text: "Empires competed for land, trade routes, and prestige. The Safavids and Mughals fought for Kandahar, a fortress on the main route between Persia and India. The Ottomans and Safavids fought for decades, and their rivalry was sharpened by the Sunni and Shi'a divide.",
        },
        {
          type: "paragraph",
          text: "In West Africa, the Songhai Empire controlled Gao and Timbuktu and taxed the trans-Saharan trade. In 1591 an army sent by the Moroccan sultan Ahmad al-Mansur crossed the Sahara and used firearms to defeat Songhai at the Battle of Tondibi. Morocco gained less gold than it hoped, and the region broke into smaller states.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Not every rivalry was religious. Kandahar was fought over by two Muslim dynasties for strategic and commercial reasons.",
        },
      ],
      takeaway:
        "Political, economic, and religious motives drove conflict between empires, often at strategic frontiers.",
      sourceIds: ["ced-topic-3-1"],
    },
  ],
  vocabulary: [
    {
      id: "gunpowder-empires",
      topicId: "world-3-1",
      term: "gunpowder empires",
      definition:
        "A label historians have used for the Ottoman, Safavid, and Mughal states, stressing the role of firearms and cannons in their expansion.",
    },
    {
      id: "janissaries",
      topicId: "world-3-1",
      term: "Janissaries",
      definition:
        "Elite Ottoman infantry, recruited largely through the devshirme, who served as a permanent professional army armed with firearms.",
    },
    {
      id: "qing-dynasty",
      topicId: "world-3-1",
      term: "Qing dynasty",
      definition:
        "The dynasty founded by the Manchus, who conquered China in 1644 and ruled until 1912.",
    },
    {
      id: "songhai-empire",
      topicId: "world-3-1",
      term: "Songhai Empire",
      definition:
        "A West African empire centered on the middle Niger River that taxed trans-Saharan trade until Moroccan forces defeated it in 1591.",
    },
    {
      id: "safavid-empire",
      topicId: "world-3-1",
      term: "Safavid Empire",
      definition:
        "A Persian empire founded in 1501 by Ismail I, which made Twelver Shi'a Islam the state religion.",
    },
  ],
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-3-gunpowder-empires",
      "world-3-janissaries",
      "world-3-qing-dynasty",
      "world-3-songhai-empire",
      "world-3-safavid-empire",
    ],
  },
  connections: [
    {
      id: "c1",
      type: "Unit 2 bridge",
      title: "Mongol successors and new empires",
      body: "Babur descended from Timur and from the Mongols, and the Qing defeated the last great Mongol confederation on the steppe. Unit 3 empires grew in regions shaped by Mongol rule and its collapse.",
      transferQuestion:
        "How did the end of Mongol rule create openings for new land-based empires?",
      feedback:
        "A strong answer names one empire and explains how the breakup of Mongol power or Mongol traditions shaped its rise.",
      links: [
        {
          topicId: "world-2-2",
          sectionId: "khanates-rule",
          label: "Review the Mongol khanates",
        },
      ],
    },
    {
      id: "c2",
      type: "Within Unit 3",
      title: "Expansion required administration",
      body: "Conquest brought new land, but holding it required officials, taxes, and legitimacy. Topic 3.2 explains how rulers turned victories into lasting states.",
      transferQuestion:
        "Why could a dynasty that won battles still fail to keep an empire?",
      feedback: "Connect military success to the revenue and loyalty needed to govern.",
      links: [
        {
          topicId: "world-3-2",
          sectionId: "bureaucracy-military",
          label: "Review imperial administration",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-3-1", "ced"],
};

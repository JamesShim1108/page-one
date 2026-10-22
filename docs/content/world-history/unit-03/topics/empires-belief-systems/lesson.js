// Original Page One lesson for CED Topic 3.3.

export const lesson = {
  schemaVersion: 1,
  id: "world-3-3",
  unitId: "world-3",
  courseId: "world",
  code: "3.3",
  title: "Empires: Belief Systems",
  period: "c. 1450–1750",
  status: "ready",
  order: 3,
  summary:
    "How the Protestant and Catholic reformations, the Sunni and Shi'a rivalry, and the rise of Sikhism changed belief systems from 1450 to 1750.",
  minutes: 12,
  learningGoals: [
    "Explain continuity and change within belief systems from 1450 to 1750.",
    "Explain how the Protestant Reformation and the Catholic Reformation reshaped Christianity in Europe.",
    "Explain how political rivalry widened the Sunni and Shi'a divide, and how Sikhism developed.",
  ],
  bigIdea:
    "Belief systems split and changed in this period, and rulers often turned religious differences into political boundaries.",
  context:
    "Christianity, Islam, and the religions of South Asia were centuries old by 1450. New printing technology, the ambitions of rulers, and the work of reformers produced lasting divisions and one new religion.",
  sections: [
    {
      id: "protestant-reformation",
      title: "The Protestant Reformation",
      conceptTitle: "The Protestant Reformation",
      lenses: ["C", "P", "T"],
      blocks: [
        {
          type: "paragraph",
          text: "In 1517 Martin Luther, a German monk, challenged the sale of indulgences, grants said to reduce punishment for sins. He argued that salvation came through faith and that the Bible, not Church tradition, was the highest authority. The printing press spread his writings quickly.",
        },
        {
          type: "paragraph",
          text: "German princes who supported Luther gained control over churches and Church lands in their territories. The Peace of Augsburg in 1555 allowed each prince in the Holy Roman Empire to choose Lutheranism or Catholicism for his lands. Other reformers, such as John Calvin, built separate Protestant churches, and in 1534 Henry VIII made himself head of the Church of England.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Anger at Church practices and the spread of printed criticism led many to reject papal authority, and rulers who saw political and financial gain backed the reformers, which made the split permanent.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The Reformation was not only about belief. Princes and kings supported it partly to gain power and property, so explain both motives.",
        },
      ],
      takeaway:
        "Religious criticism became a lasting division when printing spread it and rulers adopted it for their own ends.",
      sourceIds: ["ced-topic-3-3"],
    },
    {
      id: "catholic-reformation",
      title: "The Catholic Reformation",
      conceptTitle: "The Catholic Reformation",
      lenses: ["C", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "The Catholic Church responded with reform and renewal. The Council of Trent, from 1545 to 1563, reaffirmed Catholic teachings and ordered bishops to stop abuses. The Society of Jesus, or Jesuits, founded in 1540, opened schools and sent missionaries around the world.",
        },
        {
          type: "paragraph",
          text: "Religious divisions fed wars. The Thirty Years' War, from 1618 to 1648, began as a conflict between Protestant and Catholic states in the Holy Roman Empire and became a struggle among Europe's great powers. The Peace of Westphalia in 1648 confirmed that rulers would decide the religion of their own states.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "The Catholic Reformation was not only a reaction. It also renewed Catholic education and missions that reached Asia and the Americas.",
        },
      ],
      takeaway:
        "Catholic reform strengthened the Church in many regions but did not restore Christian unity in western Europe.",
      sourceIds: ["ced-topic-3-3"],
    },
    {
      id: "sunni-shia",
      title: "Sunni and Shi'a rivalry",
      conceptTitle: "Sunni and Shi'a rivalry",
      lenses: ["C", "P"],
      blocks: [
        {
          type: "paragraph",
          text: "Ismail I, founder of the Safavid dynasty in 1501, made Twelver Shi'ism the state religion of Persia and pressed Sunni subjects to convert. The Ottomans, who were Sunni, saw Safavid influence among Anatolian tribes as a danger.",
        },
        {
          type: "paragraph",
          text: "At the Battle of Chaldiran in 1514, Ottoman cannons and muskets defeated Safavid cavalry. Warfare continued until a treaty in 1639 fixed a lasting border. Political rivalry hardened the religious line between a mostly Shi'a Persia and mostly Sunni Ottoman lands.",
        },
        {
          type: "callout",
          title: "Cause and effect",
          text: "Safavid rulers used Shi'ism to unify their state and win followers, the Ottomans treated this as a threat, and decades of war turned the religious divide into a political frontier.",
        },
      ],
      takeaway:
        "The Sunni and Shi'a split was centuries old, but Ottoman and Safavid rivalry made it a border between states.",
      sourceIds: ["ced-topic-3-3"],
    },
    {
      id: "sikhism",
      title: "The rise of Sikhism",
      conceptTitle: "The rise of Sikhism",
      lenses: ["C", "S"],
      blocks: [
        {
          type: "paragraph",
          text: "Sikhism began in the Punjab with Guru Nanak, who lived from 1469 to 1539. He taught devotion to one God and rejected caste distinctions in worship. Community kitchens served meals to everyone, whatever their caste.",
        },
        {
          type: "paragraph",
          text: "Scholars note links between Sikh teachings and both Hindu bhakti devotion and Islamic Sufism. Over time Sikhs developed their own scripture, the Adi Granth, compiled in 1604, and their own institutions.",
        },
        {
          type: "callout",
          title: "Common trap",
          text: "Sikhism drew on older traditions but is a distinct religion, not a branch of Hinduism or Islam.",
        },
      ],
      takeaway:
        "Sikhism developed from the meeting of religious traditions in South Asia into a new faith.",
      sourceIds: ["ced-topic-3-3"],
    },
  ],
  vocabulary: [],
  connections: [
    {
      id: "c1",
      type: "Unit 1 bridge",
      title: "Bhakti, Sufism, and new faiths",
      body: "Unit 1 introduced bhakti devotion and Sufism in South Asia. Sikhism grew in a region where both were widespread, which helps explain its emphasis on personal devotion.",
      transferQuestion: "Which earlier traditions help explain Guru Nanak's teachings?",
      feedback:
        "Name one tradition and explain a shared idea, then note what made Sikhism distinct.",
      links: [
        {
          topicId: "world-1-3",
          sectionId: "asia-devotion",
          label: "Review bhakti and Sufism",
        },
      ],
    },
    {
      id: "c2",
      type: "Within Unit 3",
      title: "Religion and empire",
      body: "Topic 3.4 compares how empires handled religious diversity. The Ottoman and Safavid rivalry shows how religion could sharpen conflict between states.",
      transferQuestion:
        "How did the Safavid choice of Shi'ism affect relations with the Ottomans?",
      feedback: "Explain the threat the Ottomans perceived and the result.",
      links: [
        {
          topicId: "world-3-4",
          sectionId: "compare-religion",
          label: "Compare religious policy",
        },
      ],
    },
  ],
  sourceIds: ["ced-topic-3-3", "ced"],
};

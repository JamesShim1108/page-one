// Original practice questions for Topic 2.7. q-numbered items are topic practice;
// t-numbered items belong to the Unit 2 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("2.7", [
  {
    id: "q01",
    s: "pluralism-and-awakening",
    sub: "1.A",
    kc: ["KC-2.2.I.A"],
    q: "The presence of many European religious and ethnic groups in the colonies most directly contributed to",
    right:
      "a significant degree of pluralism in which no single church could claim everyone's loyalty",
    at: 1,
    wrong: [
      [
        "a single colonial church that was supported by public taxes in every one of the British colonies",
        "Colonies differed in their churches, and no single church united them all.",
      ],
      [
        "the end of religious differences between Protestants and Catholics throughout the colonies",
        "Religious differences continued and grew more varied.",
      ],
      [
        "a ban on public worship by minority religious groups in all of the British colonies",
        "Many colonies tolerated minority worship, and diversity increased.",
      ],
    ],
    why: "Anglicans, Puritans, Dutch Reformed, Lutherans, Presbyterians, Quakers, Catholics, and others created a plural religious life.",
    d: "Some colonies had established churches, but the question concerns the effect of diversity across the colonies as a whole.",
  },
  {
    id: "q02",
    s: "pluralism-and-awakening",
    sub: "1.B",
    kc: ["KC-2.2.I.A"],
    q: "Which of the following best describes the First Great Awakening?",
    right:
      "A wave of Protestant revivals in the 1730s and 1740s that stressed a personal religious experience",
    at: 3,
    wrong: [
      [
        "A movement of colonial legislators in the 1730s to separate churches from colonial governments",
        "The Awakening was a religious revival and was not led by legislators.",
      ],
      [
        "An intellectual movement of the 1700s that stressed reason, observation, and natural rights",
        "That describes the Enlightenment, not the Great Awakening.",
      ],
      [
        "A reform of the Church of England, led by Parliament, to reduce the power of its bishops",
        "The Awakening arose from revivals among many Protestant groups and was not a Parliamentary reform.",
      ],
    ],
    why: "Preachers such as Jonathan Edwards and George Whitefield led revivals that urged listeners to seek a personal religious experience.",
    d: "The Enlightenment also spread in the colonies in the same years, but it stressed reason rather than religious conversion.",
  },
  {
    id: "q03",
    s: "pluralism-and-awakening",
    sub: "5.B",
    r: "causation",
    kc: ["KC-2.2.I.A", "KC-2.2.I.D"],
    q: "Which of the following was an effect of the Great Awakening in the colonies?",
    right:
      "Congregations divided between supporters and critics, and colonists gained religious independence",
    at: 0,
    wrong: [
      [
        "The Church of England became the established church in every colony from New England to Georgia",
        "The Awakening increased religious independence and diversity and did not establish one church.",
      ],
      [
        "Colonial ministers lost all influence as colonists stopped attending church and turned to science",
        "Ministers remained influential, and church attendance increased in many places.",
      ],
      [
        "Colonial assemblies were abolished and replaced with councils of ministers from each denomination",
        "Colonial assemblies continued to meet.",
      ],
    ],
    why: "The revivals split congregations, challenged established ministers, and encouraged colonists to choose their own religious communities.",
    d: "The Enlightenment also encouraged science in the same years, but it did not cause colonists to abandon church.",
  },
  {
    id: "q04",
    s: "enlightenment-and-print",
    sub: "1.A",
    kc: ["KC-2.2.I.A"],
    q: "The Enlightenment ideas that influenced many colonists emphasized",
    right:
      "the power of reason, careful observation, and the natural rights of individuals",
    at: 2,
    wrong: [
      [
        "obedience to church leaders and monarchs as the foundation of a stable society",
        "Enlightenment thinkers questioned traditional authority.",
      ],
      [
        "the divine right of kings and the inheritance of political power within noble families",
        "Enlightenment thinkers such as Locke argued that government rested on consent.",
      ],
      [
        "the importance of emotional religious conversion as the surest path to knowledge of God",
        "That describes the Great Awakening and not the Enlightenment.",
      ],
    ],
    why: "The Enlightenment stressed reason, observation, and natural rights, and thinkers such as Locke argued that government rested on the consent of the governed.",
    d: "The conversion choice describes the Great Awakening, a movement of the same years that stressed emotion over reason.",
  },
  {
    id: "q05",
    s: "enlightenment-and-print",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-2.2.I.A", "KC-2.2.I.B"],
    q: "Which of the following was a similarity between the Great Awakening and the Enlightenment in the colonies?",
    right:
      "Both spread across colonial boundaries and encouraged colonists to question traditional authority",
    at: 0,
    wrong: [
      [
        "Both taught that reason was a more reliable guide than religious faith in matters of morality",
        "Only the Enlightenment emphasized reason over faith.",
      ],
      [
        "Both were organized by Parliament to strengthen royal control over colonial churches and schools",
        "Neither was organized by Parliament.",
      ],
      [
        "Both were limited to a single colony and had little influence elsewhere in British America",
        "Both movements spread widely through the colonies.",
      ],
    ],
    why: "Revivals and Enlightenment writings both traveled through print and travel, and each encouraged colonists to question established authority.",
    d: "The reason-over-faith choice is true of the Enlightenment but not of the Great Awakening.",
  },
  {
    id: "q06",
    s: "enlightenment-and-print",
    sub: "1.B",
    kc: ["KC-2.2.I.B"],
    q: "The 1735 trial of the printer John Peter Zenger is most closely associated with",
    right:
      "the strengthening of ideas about a free press after a jury acquitted him of libel",
    at: 3,
    wrong: [
      [
        "a Parliament-ordered ban on colonial newspapers that criticized royal governors or Parliament",
        "The jury acquitted Zenger, and Parliament did not ban colonial newspapers as a result.",
      ],
      [
        "the creation of an established Anglican church in the colony of New York in the 1730s",
        "The trial concerned a printer who had criticized the governor and did not involve a church.",
      ],
      [
        "a conviction that led colonial printers to stop publishing political opinion for fear of punishment",
        "Zenger was acquitted, which encouraged printers.",
      ],
    ],
    why: "A New York jury acquitted Zenger after he criticized the royal governor, which strengthened ideas about a free press.",
    d: "The conviction choice reverses the verdict, so it fails the basic facts of the trial.",
  },
  {
    id: "q07",
    s: "anglicization-and-resistance",
    sub: "1.A",
    kc: ["KC-2.2.I.B"],
    q: "The Anglicization of the British colonies refers to",
    right:
      "their gradual development of political communities and customs based on English models",
    at: 1,
    wrong: [
      [
        "Parliament's decision to make the Church of England the only legal church in the colonies",
        "Anglicization refers to a gradual cultural and political change, not a single law.",
      ],
      [
        "the replacement of colonial assemblies with governors appointed directly by the king",
        "Colonial assemblies grew stronger as part of Anglicization.",
      ],
      [
        "the conversion of most American Indians in the colonies to the Church of England by missionaries",
        "Anglicization concerned the colonists' own institutions and customs.",
      ],
    ],
    why: "Colonists built elected assemblies, English law, and English customs, and trade, print, and evangelicalism bound them to Britain and each other.",
    d: "The Church of England choice treats a broad cultural process as a single religious policy.",
  },
  {
    id: "q08",
    s: "anglicization-and-resistance",
    sub: "5.B",
    r: "causation",
    lo: "I",
    kc: ["KC-2.1.III.D"],
    q: "Which of the following best explains the growing mistrust between colonists and British leaders before 1754?",
    right:
      "Their goals and interests diverged over issues such as frontier defense, self-rule, and trade",
    at: 2,
    wrong: [
      [
        "Colonists had been demanding independence from Britain since the founding of Jamestown in 1607",
        "Most colonists did not seek independence before the 1770s.",
      ],
      [
        "Parliament had begun taxing colonists directly to pay the costs of a large standing army in the colonies",
        "Direct taxes on the colonies came after 1754.",
      ],
      [
        "The Great Awakening had convinced colonists that the Church of England should be abolished",
        "The Awakening increased religious independence but did not call for abolishing the Church of England.",
      ],
    ],
    why: "Colonists and officials disagreed about territorial settlements, frontier defense, self-rule, and trade, which produced mistrust on both sides.",
    d: "Parliamentary taxation became a major issue later, but it had not begun before 1754.",
  },
  {
    id: "t01",
    s: "pluralism-and-awakening",
    sub: "2.B",
    kc: ["KC-2.2.I.A"],
    q: "Which of the following best explains the purpose of the imagery in the excerpt?",
    right: "To make listeners fear God's anger and seek a personal religious experience",
    at: 0,
    wrong: [
      [
        "To urge the colonists to resist British rule and to defend their natural rights as subjects",
        "The sermon concerns salvation and does not address British rule.",
      ],
      [
        "To argue that reason and scientific observation, not faith, were the best guides to moral life",
        "The sermon appeals to fear of God and not to reason.",
      ],
      [
        "To persuade ministers to unite behind a single church supported by the colonial government",
        "The sermon is addressed to sinners in a congregation and not to ministers.",
      ],
    ],
    why: "Edwards used frightening images to make listeners feel their danger and seek a personal religious experience during the Great Awakening.",
    d: "Colonists did later use natural rights to resist Britain, but the excerpt is about sin and salvation.",
    stim: excerpts.edwardsEnfield,
  },
  {
    id: "t02",
    s: "pluralism-and-awakening",
    sub: "3.A",
    kc: ["KC-2.2.I.A"],
    q: "Which of the following best states the main claim of the excerpt?",
    right:
      "Sinners are saved from destruction only by God's mercy and not by their own merit",
    at: 3,
    wrong: [
      [
        "People can earn their salvation through good works and careful obedience to the law",
        "The excerpt says sinners depend entirely on God's hand.",
      ],
      [
        "God has little interest in human behavior and is willing to forgive any wrongdoing",
        "The excerpt describes God as angry at sinners.",
      ],
      [
        "Ministers should rely on reason and natural law to guide their congregations toward virtue",
        "The excerpt appeals to fear and judgment and does not mention reason or natural law.",
      ],
    ],
    why: "The excerpt says that nothing but God's hand keeps sinners from falling into the fire, which stresses dependence on God's mercy.",
    d: "The good-works choice sounds religious, but the excerpt denies that sinners can save themselves.",
    stim: excerpts.edwardsEnfield,
  },
  {
    id: "t03",
    s: "pluralism-and-awakening",
    sub: "4.A",
    kc: ["KC-2.2.I.A"],
    q: "The sermon in the excerpt is best understood in the context of which of the following?",
    right: "The First Great Awakening, a wave of Protestant revivals in the colonies",
    at: 1,
    wrong: [
      [
        "The Enlightenment, which encouraged colonists to rely on reason and natural rights",
        "The sermon appeals to religious fear and not to reason.",
      ],
      [
        "The Zenger trial of 1735, which strengthened colonists' belief in freedom of the press",
        "The sermon was preached to a congregation and concerns sin, not the press.",
      ],
      [
        "The Salem witch trials, which led Puritan ministers to fear that sin was spreading",
        "The Salem trials occurred in 1692, almost fifty years before the sermon.",
      ],
    ],
    why: "Edwards preached at Enfield in 1741 during the revivals of the Great Awakening.",
    d: "The Salem trials also involved Puritan fears of sin, but they occurred long before 1741.",
    stim: excerpts.edwardsEnfield,
  },
]);

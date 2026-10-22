// Original practice questions for Topic 1.5. q-numbered items are topic practice;
// t-numbered items belong to the Unit 1 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("1.5", [
  {
    id: "q01",
    s: "encomienda",
    sub: "1.A",
    kc: ["KC-1.2.II.B"],
    q: "The encomienda system was a Spanish colonial arrangement in which",
    right:
      "colonists received the right to demand labor and tribute from a Native community",
    at: 2,
    wrong: [
      [
        "Native communities received legal protection and wages in return for adopting the Christian faith",
        "The Native community owed labor and tribute; wages were rarely paid and protection was often ignored.",
      ],
      [
        "colonists leased farmland from the Crown and paid their rent in silver mined by free workers",
        "Encomiendas granted labor and tribute, not leased farmland for rent.",
      ],
      [
        "royal officials assigned enslaved Africans to planters according to the size of their landholdings",
        "The encomienda concerned Native labor, not enslaved Africans.",
      ],
    ],
    why: "An encomienda granted a colonist labor and tribute from a Native community, in exchange for a duty to protect and instruct its people.",
    d: "The encomienda did carry a duty of protection and Christian instruction, but that duty did not turn the grant into a wage arrangement.",
  },
  {
    id: "q02",
    s: "encomienda",
    sub: "5.B",
    r: "causation",
    kc: ["KC-1.2.II.B"],
    q: "Which of the following best explains why Spanish officials created the encomienda system?",
    right:
      "To reward conquistadors and settlers while organizing Native labor for mining and farming",
    at: 1,
    wrong: [
      [
        "To replace Native labor with enslaved Africans as quickly as possible in mines and on plantations",
        "Enslaved Africans were imported later, as Native populations fell; the encomienda used Native labor.",
      ],
      [
        "To protect Native communities from Spanish settlers by forbidding the colonists from using Native labor",
        "The system gave colonists access to Native labor rather than forbidding it.",
      ],
      [
        "To raise money for the Crown by selling Native lands directly to merchants and joint-stock companies",
        "The system rewarded colonists with labor and tribute rather than land sales to companies.",
      ],
    ],
    why: "The encomienda rewarded colonists and gave them a workforce to extract silver and grow crops.",
    d: "Enslaved Africans did replace Native workers in some places later, but the encomienda was created to use Native labor.",
  },
  {
    id: "q03",
    s: "african-slavery",
    sub: "5.B",
    r: "causation",
    kc: ["KC-1.2.II.C"],
    q: "Which of the following developments most directly increased the demand for enslaved Africans in Spanish colonies?",
    right:
      "Native population decline from disease and overwork, which created labor shortages in mines and on plantations",
    at: 3,
    wrong: [
      [
        "The New Laws of 1542, which ended all Native labor in the colonies and forced planters to find workers elsewhere",
        "The New Laws limited new encomiendas and Native enslavement, but colonists kept using Native labor.",
      ],
      [
        "The Protestant Reformation, which reduced Spain's trade with Europe and forced colonists to rely on slave labor",
        "The Reformation did not create the colonial labor shortage.",
      ],
      [
        "The growth of joint-stock companies, which paid colonists to switch from encomienda to slave labor",
        "Joint-stock companies were not what created demand for enslaved Africans in Spanish colonies.",
      ],
    ],
    why: "As Native workers died, colonists needed labor, and enslaved Africans were brought in to fill the gap.",
    d: "The New Laws attempted to restrict abuse of Native peoples, but labor shortages from population decline were the main driver of demand.",
  },
  {
    id: "q04",
    s: "african-slavery",
    sub: "1.B",
    kc: ["KC-1.2.II.C"],
    q: "In the 1500s, European traders obtained enslaved Africans primarily by",
    right:
      "partnering with some West African groups that practiced slavery and sold captives on the coast",
    at: 0,
    wrong: [
      [
        "sending large armed expeditions deep into the African interior to capture people and bring them to the coast",
        "Europeans relied on African partners and coastal trading posts rather than large inland raids.",
      ],
      [
        "buying captives from Native American merchants who had brought them to Caribbean islands",
        "The trade began in Africa, and Native Americans were not the sellers of enslaved Africans.",
      ],
      [
        "recruiting workers through labor contracts signed in African ports before the voyage across the Atlantic",
        "Enslaved Africans were forcibly taken and did not sign contracts.",
      ],
    ],
    why: "Portuguese and other European traders worked with some West African groups who captured and sold people.",
    d: "Europeans did sometimes use force, but the system worked through partnerships with African groups on the coast rather than inland conquest.",
  },
  {
    id: "q05",
    s: "casta-system",
    sub: "1.A",
    kc: ["KC-1.2.II.D"],
    q: "In the Spanish colonial casta system, a person's social status was based primarily on",
    right:
      "ancestry and ethnic background, which affected legal rights, occupations, and taxes",
    at: 1,
    wrong: [
      [
        "wealth alone, which allowed any rich colonist to claim the highest rank regardless of birth",
        "Wealth mattered, but rank was defined by ancestry and birthplace.",
      ],
      [
        "religion, with all Catholic converts ranked above members of other faiths regardless of ancestry",
        "Rank depended on ancestry, and converts to Christianity were not all given equal standing.",
      ],
      [
        "place of residence, with city dwellers ranked above all rural dwellers regardless of background",
        "Rank was tied to ancestry, not to whether someone lived in a city or the countryside.",
      ],
    ],
    why: "The casta system ranked people by ancestry, and rank shaped what rights, jobs, and taxes each person had.",
    d: "Wealth could help a person's standing, but it did not erase the ancestry that defined a person's casta.",
  },
  {
    id: "q06",
    s: "casta-system",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-1.2.II.D"],
    q: "Which of the following was a difference between peninsulares and criollos in Spanish America?",
    right:
      "Peninsulares, born in Spain, held the highest offices, while criollos, born in the Americas, were largely shut out of them",
    at: 3,
    wrong: [
      [
        "Peninsulares had Spanish and Native ancestry, while criollos were of entirely Spanish descent and held lower offices",
        "Mestizos, not peninsulares, had Spanish and Native ancestry.",
      ],
      [
        "Peninsulares were enslaved workers brought from Spain, while criollos were free settlers who owned land",
        "Peninsulares were privileged Spanish-born officials, not enslaved workers.",
      ],
      [
        "Peninsulares were Native leaders who governed their villages, while criollos paid tribute to them",
        "Peninsulares were Spanish-born, and Native leaders were a different group.",
      ],
    ],
    why: "Peninsulares, born in Spain, held the top offices, and criollos, born in the Americas, were generally shut out of them.",
    d: "The near miss describes a real group, mestizos, with Spanish and Native ancestry, but peninsulares were Spanish-born.",
  },
  {
    id: "q07",
    s: "african-slavery",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-1.2.II.B", "KC-1.2.II.C"],
    q: "Which of the following best describes a pattern in the labor systems of Spanish America in the 1500s?",
    right:
      "Colonial economies relied on forced labor, first from Native Americans and then increasingly from enslaved Africans",
    at: 2,
    wrong: [
      [
        "Colonial economies relied on forced labor, first from enslaved Africans and then increasingly from Native Americans",
        "Native labor came first and was increasingly supplemented by enslaved Africans.",
      ],
      [
        "Colonial economies relied mainly on free wage labor, with forced labor used only for criminals and rebels",
        "Forced labor was central to mining and plantations, not limited to criminals.",
      ],
      [
        "Colonial economies relied on family farms worked by European settlers who arrived with their own labor",
        "Spanish colonial wealth was built on mining and plantations using forced labor.",
      ],
    ],
    why: "Spain first used Native labor through the encomienda and mita and then turned increasingly to enslaved Africans as Native populations fell.",
    d: "The near miss has the right two groups but reverses the order in which they were used.",
  },
  {
    id: "q08",
    s: "casta-system",
    sub: "4.B",
    kc: ["KC-1.2.II.D"],
    q: "Which of the following developments most directly contributed to the creation of the casta system?",
    right:
      "Widespread intermarriage among Europeans, Native Americans, and Africans created a mixed population that officials sought to classify",
    at: 0,
    wrong: [
      [
        "A Spanish law that barred all marriage between colonists and Native Americans created separate and distinct groups",
        "Intermarriage occurred widely, and no law prevented it from producing a mixed population.",
      ],
      [
        "The arrival of Spanish women in large numbers kept the colonial population purely European in ancestry",
        "Few Spanish women migrated at first, and the population became mixed rather than purely European.",
      ],
      [
        "The Protestant Reformation led Spanish officials to rank people by their church and by their religious practices",
        "Spain's classification depended on ancestry, and the Reformation was not its cause.",
      ],
    ],
    why: "As a mixed population grew, Spanish officials and the Church ranked groups by ancestry to organize society.",
    d: "Ranking depended on ancestry produced by mixing, not on laws that separated groups or on religious divisions.",
  },
  {
    id: "t01",
    s: "encomienda",
    sub: "3.A",
    lo: "E",
    kc: ["KC-1.2.II.B"],
    q: "Which of the following best summarizes the passage's description of the Spanish empire?",
    right:
      "The Spanish empire relied on forced labor and a social order that ranked people by ancestry",
    at: 1,
    wrong: [
      [
        "The Spanish empire relied on free wage labor, and it ranked people by wealth and not by ancestry",
        "The passage describes encomienda and mita labor and ranks that depended on ancestry.",
      ],
      [
        "The Spanish empire relied on enslaved Africans alone, since Native peoples refused to work in the mines",
        "The passage describes Native labor in mines through the mita and encomienda grants.",
      ],
      [
        "The Spanish empire gave all of its subjects equal rights, but it limited their occupations by place of birth",
        "The passage says rank affected legal rights and taxes.",
      ],
    ],
    why: "The passage describes encomienda and mita labor, the use of enslaved Africans, and a ranking by ancestry.",
    d: "The near miss gets the ranking wrong and replaces forced labor with wage labor.",
    stim: excerpts.originalSpanishLabor,
  },
  {
    id: "t02",
    s: "african-slavery",
    sub: "5.B",
    r: "causation",
    lo: "E",
    kc: ["KC-1.2.II.C"],
    q: "According to the passage, colonists imported growing numbers of enslaved Africans primarily because",
    right:
      "epidemics had sharply reduced the Native population that supplied the mines with labor",
    at: 3,
    wrong: [
      [
        "the Inca had ended the mita, which cut off Spain's supply of workers for the silver mines",
        "The passage says Spanish officials adapted the mita and does not say the Inca ended it.",
      ],
      [
        "Spanish law forbade Native peoples from working in mines and on plantations in New Spain",
        "The passage says Native workers were supplied to the mines.",
      ],
      [
        "colonists who held encomienda grants wanted to avoid paying tribute to the Spanish Crown",
        "The passage says Native villages owed tribute to encomienda holders, not the reverse.",
      ],
    ],
    why: "The passage links the importing of enslaved Africans to the decline of Native populations during epidemics.",
    d: "The mita did supply workers, but the passage connects the turn to enslaved Africans to the loss of Native population.",
    stim: excerpts.originalSpanishLabor,
  },
  {
    id: "t03",
    s: "casta-system",
    sub: "5.A",
    r: "comparison",
    lo: "E",
    kc: ["KC-1.2.II.D"],
    q: "The labor systems and ranks described in the passage most directly reflect which of the following goals of the Spanish empire?",
    right:
      "Extracting precious metals and developing plantation agriculture while keeping control of a diverse population",
    at: 2,
    wrong: [
      [
        "Encouraging Native peoples to govern themselves and trade freely with Spanish colonists",
        "The passage describes forced labor and rank, not self-government or free trade.",
      ],
      [
        "Limiting the empire's silver production in order to protect Native villages from overwork",
        "The passage describes growing silver production that relied on Native labor.",
      ],
      [
        "Replacing Spanish officials with Native and African leaders who could manage the empire more cheaply",
        "The passage says Spanish-born officials held the highest offices.",
      ],
    ],
    why: "Forced labor supplied mines and plantations, and the ranking by ancestry organized the empire's diverse people.",
    d: "The empire did permit some trade, but the systems in the passage were meant to extract wealth and keep control.",
    stim: excerpts.originalSpanishLabor,
  },
]);

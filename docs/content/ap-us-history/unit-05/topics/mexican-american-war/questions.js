// Original practice questions for Topic 5.3. q-numbered items are topic practice;
// t-numbered items belong to the Unit 5 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

const war = [excerpts.polkWar, excerpts.thoreauWar];

export const bank = topicBank("5.3", [
  {
    id: "q01",
    s: "road-to-war",
    sub: "1.A",
    kc: ["KC-5.1.I.C"],
    q: "Which of the following was a cause of the Mexican–American War?",
    right: "A dispute over whether Texas ended at the Nueces River or at the Rio Grande",
    at: 3,
    wrong: [
      [
        "A Mexican attack on the Alamo in San Antonio, which took place in 1846",
        "The Alamo fell in 1836, during the Texas Revolution.",
      ],
      [
        "Britain's decision to ally with Mexico against the United States in Oregon",
        "Britain and the United States settled Oregon peacefully.",
      ],
      [
        "Mexico's refusal to honor the Gadsden Purchase of the Southwest",
        "The Gadsden Purchase came in 1853, after the war.",
      ],
    ],
    why: "Mexico claimed that Texas ended at the Nueces, the United States claimed the Rio Grande, and Polk sent troops into the disputed land.",
    d: "The Alamo choice is close because it was a famous clash between Texans and Mexico, but it took place in 1836, ten years before the war.",
  },
  {
    id: "q02",
    s: "road-to-war",
    sub: "4.A",
    kc: ["KC-5.1.I.C"],
    q: "Polk's decision to send troops to the Rio Grande in 1846 is best understood in the context of which of the following?",
    right: "A border dispute with Mexico that followed the annexation of Texas",
    at: 0,
    wrong: [
      [
        "A war with Britain over the boundary of the Oregon country",
        "The Oregon boundary was settled by treaty in 1846.",
      ],
      [
        "A request from Mexico for American troops to help defend its northern border",
        "Mexico did not ask for American troops.",
      ],
      [
        "A Supreme Court ruling that placed the Texas border at the Rio Grande",
        "The Court made no such ruling.",
      ],
    ],
    why: "Texas was annexed in 1845, and the dispute over its southern boundary led to the movement of troops.",
    d: "The Oregon war choice is close because Polk faced two boundary disputes, but only the dispute with Mexico led to fighting.",
  },
  {
    id: "q03",
    s: "victory-and-the-treaty",
    sub: "1.B",
    kc: ["KC-5.1.I.C"],
    q: "The Treaty of Guadalupe Hidalgo (1848) provided that",
    right:
      "Mexico would give California and the Southwest to the United States in return for $15 million",
    at: 2,
    wrong: [
      [
        "the United States would return the lands it had taken in return for a payment from Mexico",
        "The United States kept the conquered lands.",
      ],
      [
        "Mexico would give up Oregon and the right to trade in the ports of the Pacific coast",
        "Oregon had never been Mexican.",
      ],
      [
        "slavery would be banned in the lands that the United States took from Mexico",
        "The treaty did not decide the question of slavery.",
      ],
    ],
    why: "Mexico accepted the Rio Grande border and ceded the Mexican Cession, and the United States paid $15 million.",
    d: "The return of land choice is close because some wars end with the return of territory, but Mexico gave up its northern lands.",
  },
  {
    id: "q04",
    s: "slavery-mexicans-and-american-indians",
    sub: "1.B",
    kc: ["KC-5.1.I.C"],
    q: "The Wilmot Proviso (1846) proposed that",
    right: "slavery be banned in any territory acquired from Mexico",
    at: 1,
    wrong: [
      [
        "settlers in each territory vote on whether to allow slavery",
        "That was popular sovereignty, a different plan.",
      ],
      [
        "the United States end the war and return the land it had taken",
        "The Proviso concerned slavery.",
      ],
      [
        "enslaved people who escaped to Mexico be returned to their owners",
        "The Proviso did not concern escaped slaves.",
      ],
    ],
    why: "Wilmot's proposal passed the House but not the Senate, and it divided Northerners from Southerners.",
    d: "The settlers' vote choice is close because it was another plan offered in the same debate, but Wilmot would have banned slavery outright.",
  },
  {
    id: "q05",
    s: "slavery-mexicans-and-american-indians",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.1.II.C"],
    q: "Which of the following was an effect of the Mexican Cession on Mexican Americans in the Southwest?",
    right: "Many lost their land and faced discrimination, despite the treaty",
    at: 3,
    wrong: [
      [
        "They gained control of the new state governments of California and New Mexico",
        "Settlers from the United States soon outnumbered them and held power.",
      ],
      [
        "Most were required by the treaty to move to Mexico within one year",
        "The treaty allowed them to remain.",
      ],
      [
        "They were given a separate territory in which to govern themselves",
        "No separate territory was created.",
      ],
    ],
    why: "Lawsuits, taxes, and violence took land from many Mexican families, and they faced prejudice from newcomers.",
    d: "The state governments choice is close because some Mexican Americans held office in the early years, but settlers from the United States soon held most of the power.",
  },
  {
    id: "q06",
    s: "slavery-mexicans-and-american-indians",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.1.II.C"],
    q: "Which of the following was an effect of the Mexican–American War on American Indians in the Southwest and California?",
    right: "Settlers and soldiers entered their lands and changed their ways of life",
    at: 2,
    wrong: [
      [
        "The treaty guaranteed their lands, and the United States kept settlers out",
        "The treaty did not protect Native lands.",
      ],
      [
        "They allied with the United States and were granted citizenship",
        "American Indians were not made citizens.",
      ],
      [
        "They were moved to Indian Territory, east of the Mississippi River",
        "The Indian Territory lay west of the Mississippi.",
      ],
    ],
    why: "The war brought new settlers and conflict, and Native peoples lost land and the ability to support themselves as before.",
    d: "The treaty guarantee choice is close because the treaty protected the property of Mexican citizens, but it did not protect Native lands.",
  },
  {
    id: "q07",
    s: "victory-and-the-treaty",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.1.I.C"],
    q: "Which of the following describes a similarity between the Louisiana Purchase and the Mexican Cession?",
    right:
      "Both added large territories and raised the question of slavery in the new lands",
    at: 1,
    wrong: [
      [
        "Both were bought by the president from European powers in peaceful negotiations",
        "The Mexican Cession followed a war, and Mexico was not a European power.",
      ],
      [
        "Both were won in a war and approved by treaty after the capture of the capital",
        "The Louisiana Purchase followed no war.",
      ],
      [
        "Both were acquired with the consent of the American Indians who lived there",
        "Neither acquisition involved their consent.",
      ],
    ],
    why: "Each acquisition doubled or greatly enlarged the nation, and each reopened the dispute over whether slavery would spread.",
    d: "The bought from European powers choice is close because the Louisiana Purchase was a purchase, but the Mexican Cession followed a war with Mexico.",
  },
  {
    id: "q08",
    s: "road-to-war",
    sub: "4.A",
    kc: ["KC-5.1.I.C"],
    q: "Opposition to the Mexican–American War among many Northerners is best understood in the context of which of the following?",
    right:
      "A fear that the war would add slave states and increase the power of the South",
    at: 0,
    wrong: [
      [
        "A fear that Mexico would invade the United States if the war continued",
        "Mexico had no ability to invade the United States.",
      ],
      [
        "A belief that the Constitution forbade the nation to acquire foreign territory",
        "Many had accepted the Louisiana Purchase.",
      ],
      [
        "A demand that Britain take part in the war and share the cost",
        "The war was fought by the United States alone.",
      ],
    ],
    why: "Many Whigs and antislavery Northerners believed that the war would extend slavery and benefit slaveholders.",
    d: "The Mexican invasion choice is close because Polk claimed that Mexico had invaded, but the opposition came from fears about the effects of the war on slavery.",
  },
  {
    id: "t01",
    s: "road-to-war",
    sub: "3.C",
    kc: ["KC-5.1.I.C"],
    q: "Which of the following best describes a difference between the arguments of Polk and Thoreau about the war?",
    right:
      "Polk blamed Mexico for starting the war, while Thoreau blamed a few Americans who used the government",
    at: 3,
    wrong: [
      [
        "Polk said that the people had demanded the war, while Thoreau said Congress alone had begun it",
        "Thoreau says the people would not have consented, and Polk blames Mexico.",
      ],
      [
        "Polk argued that the war was unjust to Mexico, while Thoreau argued that it defended the United States",
        "Their views are the reverse of these.",
      ],
      [
        "Polk said that slavery had caused the war, while Thoreau said that trade disputes had caused it",
        "Polk does not mention slavery in the excerpt.",
      ],
    ],
    why: "Polk accuses Mexico of “commencing an offensive war,” while Thoreau calls the war “the work of comparatively a few individuals.”",
    d: "The people demanded choice is close because Polk wrote of a nation aroused, but the excerpt blames Mexico and not the people.",
    stim: war,
  },
  {
    id: "t02",
    s: "road-to-war",
    sub: "2.B",
    kc: ["KC-5.1.I.C"],
    q: "Thoreau's claim that “the people would not have consented” to the war is best understood in light of which of the following about his point of view?",
    right: "He opposed slavery and feared that the war would extend it",
    at: 0,
    wrong: [
      [
        "He was a soldier who had fought in Mexico and had seen the war firsthand",
        "Thoreau was a writer who protested the war by refusing to pay a tax.",
      ],
      [
        "He was a Southern planter who hoped that the war would add slave states",
        "He was from Massachusetts and opposed slavery.",
      ],
      [
        "He was a diplomat who had taken part in the talks with Mexico",
        "He held no government post.",
      ],
    ],
    why: "Thoreau writes that “this people must cease to hold slaves, and to make war on Mexico,” which ties his opposition to the war to his opposition to slavery.",
    d: "The soldier choice is close because the passage is about the war, but Thoreau was a writer who protested it and did not fight in it.",
    stim: war,
  },
  {
    id: "t03",
    s: "road-to-war",
    sub: "3.A",
    kc: ["KC-5.1.I.C"],
    q: "Polk's claim that Mexican forces “invaded our territory” depends on which assumption?",
    right:
      "That the Rio Grande was the southern boundary of Texas and that its east bank was American soil",
    at: 2,
    wrong: [
      [
        "That Mexico had agreed in a treaty to give up its claim to the land north of the Rio Grande",
        "Mexico had agreed to no such treaty.",
      ],
      [
        "That Congress had already declared war on Mexico before the fighting began",
        "Congress declared war after the fighting.",
      ],
      [
        "That the United States held the land by conquest from Britain",
        "Britain had no claim to the land.",
      ],
    ],
    why: "Polk describes the American army on “the east bank of the Rio Grande, within the limits of Texas,” and Mexico disputed that boundary.",
    d: "The treaty choice is close because a treaty would settle a border, but the border was in dispute and Mexico had not agreed to the Rio Grande.",
    stim: war,
  },
]);

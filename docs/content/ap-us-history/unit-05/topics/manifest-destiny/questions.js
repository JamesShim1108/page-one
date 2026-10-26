// Original practice questions for Topic 5.2. q-numbered items are topic practice;
// t-numbered items belong to the Unit 5 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("5.2", [
  {
    id: "q01",
    s: "manifest-destiny-and-annexation",
    sub: "1.A",
    kc: ["KC-5.1.I.B"],
    q: "The term Manifest Destiny expressed the belief that",
    right: "the nation was meant to spread its institutions across the continent",
    at: 2,
    wrong: [
      [
        "European powers had no right to start new colonies anywhere in the Western Hemisphere",
        "That is the Monroe Doctrine of 1823.",
      ],
      [
        "Congress had a duty to guarantee equal rights to the people living in acquired lands",
        "The belief did not promise rights to the people already living there.",
      ],
      [
        "American farmers should stay in the East to protect the economy of the older states",
        "The belief urged Americans to move west.",
      ],
    ],
    why: "Supporters of expansion said that the nation's institutions and mission justified its spread to the Pacific.",
    d: "The European colonies choice is close because both ideas concern the hemisphere, but it describes the Monroe Doctrine and not a mission to expand.",
  },
  {
    id: "q02",
    s: "migration-to-the-west",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.1.I.A"],
    q: "Which of the following best explains the arrival of hundreds of thousands of migrants in California after 1848?",
    right: "The discovery of gold at Sutter's Mill drew people hoping for wealth",
    at: 0,
    wrong: [
      [
        "The Homestead Act offered free land to every settler who reached California",
        "The Homestead Act was passed in 1862, years after the Gold Rush began.",
      ],
      [
        "Britain closed the Oregon Trail, which turned the settlers toward California",
        "Britain did not close the trail.",
      ],
      [
        "Mexico offered free land to American families who would move to California",
        "Mexico made no such offer in the 1840s.",
      ],
    ],
    why: "News of gold set off the Gold Rush, and people came from the United States, Latin America, Europe, and China.",
    d: "The Homestead Act choice is close because that law also drew settlers west, but it came in 1862, after the Gold Rush had begun.",
  },
  {
    id: "q03",
    s: "migration-to-the-west",
    sub: "1.A",
    kc: ["KC-5.1.I.A"],
    q: "Why did Brigham Young lead the Mormons to the Great Salt Lake in 1847?",
    right:
      "To find a place for their community beyond the settlements where they had met violence",
    at: 3,
    wrong: [
      [
        "To search for gold in the mountains after hearing of a discovery in California",
        "Gold was found in California in 1848, a year later.",
      ],
      [
        "To claim the Oregon country for the United States on the orders of the president",
        "The Mormons moved for religious reasons, not on orders from the government.",
      ],
      [
        "To escape a federal law that had made their religion illegal in the Midwest",
        "No federal law outlawed their religion.",
      ],
    ],
    why: "The Mormons had been attacked in the Midwest and moved west to practice their faith in safety.",
    d: "The gold choice is close because the West drew many settlers in these years, but the Mormons moved a year before the discovery and for religious refuge.",
  },
  {
    id: "q04",
    s: "migration-to-the-west",
    sub: "1.B",
    kc: ["KC-5.1.I.D"],
    q: "The Homestead Act of 1862 encouraged western settlement by",
    right: "offering 160 acres of public land to settlers who farmed it for five years",
    at: 1,
    wrong: [
      [
        "giving public land to railroad companies that agreed to carry settlers west",
        "A different law of 1862, the Pacific Railway Act, made grants to railroads.",
      ],
      [
        "paying settlers a salary to defend the frontier against American Indian nations",
        "Settlers received land, not a salary.",
      ],
      [
        "selling western land at low prices only to farmers who already owned land in the East",
        "The Act applied to settlers who did not own land.",
      ],
    ],
    why: "The law gave land to families who lived on it and worked it, and it brought many settlers to the Plains.",
    d: "The railroad companies choice is close because another law of the same year gave land to railroads, but the Homestead Act gave land to settlers.",
  },
  {
    id: "q05",
    s: "migration-to-the-west",
    sub: "1.B",
    kc: ["KC-5.1.I.D"],
    q: "The Pacific Railway Act of 1862 supported the development of the West by",
    right: "providing land and loans for a railroad linking the Midwest to California",
    at: 2,
    wrong: [
      [
        "giving farm families 160 acres on the condition that they live on it and work it",
        "That describes the Homestead Act.",
      ],
      [
        "ending the tariff on goods carried by train from the East to Western markets",
        "The law did not change the tariff.",
      ],
      [
        "creating a national bank to lend money to farmers west of the Mississippi River",
        "The law concerned railroads and not banking.",
      ],
    ],
    why: "The government supported the building of a transcontinental railroad, completed in 1869, which joined East and West.",
    d: "The 160 acres choice is close because it is another law of 1862 that promoted settlement, but it describes the Homestead Act.",
  },
  {
    id: "q06",
    s: "trade-with-asia",
    sub: "5.B",
    r: "causation",
    kc: ["KC-5.1.I.E"],
    q: "Which of the following best explains why Commodore Matthew Perry sailed to Japan in 1853?",
    right: "The United States wanted Japan to open its ports to American trade",
    at: 1,
    wrong: [
      [
        "The United States hoped to annex Japan, as it had annexed Texas in 1845",
        "Perry sought access to ports and not territory.",
      ],
      [
        "Japan had asked the United States for help in a war against Britain",
        "Japan had not asked for help.",
      ],
      [
        "Congress had ordered the navy to end the slave trade in Asian waters",
        "The mission concerned trade.",
      ],
    ],
    why: "American merchants and the navy wanted Japanese ports open, and the Treaty of Kanagawa (1854) opened two of them.",
    d: "The annexation choice is close because the age was one of expansion, but Perry's mission aimed at trade and not at territory.",
  },
  {
    id: "q07",
    s: "manifest-destiny-and-annexation",
    sub: "4.A",
    kc: ["KC-5.1.I.B"],
    q: "The belief in Manifest Destiny is best understood in the context of which of the following?",
    right:
      "A sense that American institutions were superior and a hunger for land, resources, and markets",
    at: 3,
    wrong: [
      [
        "A decline in the number of settlers who wished to move west after the Panic of 1837",
        "Migration continued and grew in the 1840s.",
      ],
      [
        "A treaty with Britain that barred Americans from settling west of the Rocky Mountains",
        "No such treaty existed.",
      ],
      [
        "A Supreme Court decision that gave the president the power to annex territory",
        "The Court issued no such decision.",
      ],
    ],
    why: "Faith in American institutions, together with the desire for land and trade, made expansion seem natural to many Americans.",
    d: "The Panic of 1837 choice is close because the downturn affected many Americans, but settlers kept moving west and support for expansion grew.",
  },
  {
    id: "q08",
    s: "manifest-destiny-and-annexation",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-5.1.I.B"],
    q: "Which of the following describes a difference in how the United States gained Texas and the Oregon country?",
    right:
      "Texas was annexed and led to war, while Oregon was divided with Britain by treaty",
    at: 0,
    wrong: [
      [
        "Oregon was annexed at the request of its people, while Texas was bought from France",
        "Texas was not bought from France.",
      ],
      [
        "Both were bought from France as part of the Louisiana Purchase of 1803",
        "The United States did not buy either one from France.",
      ],
      [
        "Both were won from Britain in a war that ended with the Treaty of Ghent",
        "Neither was won in a war with Britain.",
      ],
    ],
    why: "Annexing Texas brought a border dispute with Mexico, while the Oregon boundary was settled at the 49th parallel in 1846.",
    d: "The reversed choice is close because it names the same two places, but it assigns the methods of acquisition to the wrong place.",
  },
  {
    id: "t01",
    s: "manifest-destiny-and-annexation",
    sub: "3.A",
    kc: ["KC-5.1.I.B"],
    q: "Which of the following claims about Texas is best supported by the first paragraph of the excerpt?",
    right:
      "Annexation would be peaceful because Texas consented to join and would open new markets",
    at: 2,
    wrong: [
      [
        "Annexation was a conquest that was justified by the need to protect American settlers",
        "Polk calls annexation “not . . . the conquest of a nation.”",
      ],
      [
        "Foreign powers held the right to approve the terms on which Texas would join",
        "Polk says foreign nations had no such right.",
      ],
      [
        "Annexation would close the markets of Texas to the goods of foreign nations",
        "He says annexation would open “new and ever-increasing markets.”",
      ],
    ],
    why: "Polk writes of a “peaceful acquisition” made “with the consent of that member” that would open new markets.",
    d: "The conquest choice is close because the nation's critics called annexation a seizure, but Polk's paragraph rejects that description.",
    stim: excerpts.polkAnnexation,
  },
  {
    id: "t02",
    s: "manifest-destiny-and-annexation",
    sub: "2.A",
    kc: ["KC-5.1.I.B"],
    q: "Polk most likely described annexation as “peaceful” in order to",
    right: "reassure foreign powers that the United States was not seeking conquest",
    at: 0,
    wrong: [
      [
        "persuade Congress to vote for an annexation that it had so far refused to approve",
        "Congress had already approved annexation.",
      ],
      [
        "warn Mexico that the United States would use force to take California",
        "The excerpt does not mention California or force.",
      ],
      [
        "justify the removal of American Indian nations from the lands of Texas",
        "The excerpt does not mention American Indians.",
      ],
    ],
    why: "The paragraph addresses “foreign powers” and tells them that annexation was an agreement and not a conquest.",
    d: "The Congress choice is close because the policy needed approval, but Congress had already voted and the paragraph speaks to foreign powers.",
    stim: excerpts.polkAnnexation,
  },
  {
    id: "t03",
    s: "migration-to-the-west",
    sub: "4.A",
    kc: ["KC-5.1.I.A"],
    q: "Polk's statement that settlers were “preparing to perfect” the American title to Oregon is best understood in the context of which of the following?",
    right:
      "The movement of American families along the Oregon Trail to the Pacific Northwest",
    at: 1,
    wrong: [
      [
        "The discovery of gold in California, which began a rush to the Pacific coast",
        "Gold was discovered in 1848, three years after the speech.",
      ],
      [
        "The Homestead Act, which gave public land to settlers who farmed it",
        "The Homestead Act was passed in 1862.",
      ],
      [
        "The purchase of the Louisiana Territory, which gave the nation the Oregon country",
        "Oregon lay outside the Louisiana Purchase.",
      ],
    ],
    why: "In the 1840s American families were traveling to Oregon, and Polk used their presence to support the American claim.",
    d: "The gold choice is close because both events involved migration to the Pacific, but the Gold Rush began three years after Polk spoke.",
    stim: excerpts.polkAnnexation,
  },
]);

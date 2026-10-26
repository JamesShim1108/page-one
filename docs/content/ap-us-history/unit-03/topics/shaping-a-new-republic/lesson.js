// Original Page One lesson for CED Topic 3.10.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.10", {
  summary:
    "How Washington and Adams put the Constitution into practice, why disputes over economics and foreign policy produced the first political parties, and how the new nation dealt with Britain, Spain, France, and American Indian nations.",
  minutes: 16,
  goals: [
    "Explain the institutions and precedents created under Washington and Adams.",
    "Explain the positions of Federalists and Democratic-Republicans and why parties formed.",
    "Explain how competition with European powers and American Indian nations shaped policy toward borders and trade.",
  ],
  bigIdea:
    "In the 1790s the new government built lasting institutions, and disagreements over the nation's economy, foreign policy, and the meaning of the Constitution gave rise to political parties.",
  context:
    "The CED asks you to explain how competition intensified conflicts among peoples and nations and how political ideas, institutions, and party systems developed. Keep the domestic and the foreign sides together, because the French Revolution drove both.",
  sections: [
    section(
      "institutions-and-precedents",
      "Washington, Adams, and institutions",
      ["PCE", "WOR"],
      [
        "During the presidential administrations of George Washington and John Adams, political leaders created institutions and precedents that put the principles of the Constitution into practice. Washington took office in 1789. He appointed department heads, including Alexander Hamilton as Secretary of the Treasury and Thomas Jefferson as Secretary of State, who met with him as a cabinet. The Judiciary Act of 1789 established the federal court system.",
        "Hamilton proposed a financial program to strengthen the national government and its credit. It called for the federal government to pay the national debt and to assume the states' war debts, to create a national bank, and to raise revenue through tariffs and an excise tax on whiskey. His supporters saw a program that would build the nation's economy, while opponents saw a program that favored merchants and speculators and expanded federal power. In 1794 farmers in western Pennsylvania resisted the whiskey tax in the Whiskey Rebellion, and Washington led a large militia force to the region, which demonstrated that the federal government could enforce its laws.",
        "Washington's Farewell Address, published in 1796, encouraged national unity, as he cautioned against political factions and warned about the danger of permanent foreign alliances. Washington decided not to seek a third term, setting a precedent that lasted more than a century.",
      ],
      "Washington and Adams made the Constitution work by creating departments, courts, a financial system, and precedents.",
    ),
    section(
      "parties-and-foreign-policy",
      "Parties and foreign policy",
      ["PCE", "WOR"],
      [
        "Political leaders in the 1790s took a variety of positions on issues such as the relationship between the national government and the states, economic policy, foreign policy, and the balance between liberty and order. This led to the formation of political parties, most significantly the Federalists, led by Alexander Hamilton, and the Democratic-Republican Party, led by Thomas Jefferson and James Madison. Federalists favored a strong national government, commerce and manufacturing, and friendly ties with Britain. Democratic-Republicans favored limited national government, a strict reading of the Constitution, agriculture, and sympathy for France.",
        "War between France and Britain resulting from the French Revolution presented challenges to the United States over issues of free trade and foreign policy and fostered political disagreement. Washington issued a Neutrality Proclamation in 1793, but Britain seized American ships and sailors. Jay's Treaty of 1794 settled some disputes and led Britain to remove troops from forts in the Northwest, but it was unpopular with Democratic-Republicans, who thought it favored Britain. Under Pinckney's Treaty of 1795, Spain recognized American rights to navigate the Mississippi River and to store goods at New Orleans, and settled the southern boundary.",
        "Under President Adams, relations with France worsened. In the XYZ Affair, French agents demanded bribes from American diplomats, and an undeclared naval conflict called the Quasi-War followed. The Federalist Congress passed the Alien and Sedition Acts in 1798, which lengthened the residency required for citizenship, allowed the president to deport noncitizens judged dangerous, and made it a crime to publish false or malicious statements against the government. Democratic-Republicans saw the laws as attacks on their party and on freedom of speech. Jefferson and Madison replied with the Virginia and Kentucky Resolutions, which argued that states could judge the constitutionality of federal laws.",
        [
          "Common trap",
          "Washington warned against political parties, yet the parties formed during his own presidency. Do not treat the Farewell Address as describing a world without parties.",
        ],
      ],
      "Disputes over the national government's power, the economy, and the French Revolution divided leaders into the first two political parties.",
    ),
    section(
      "borders-and-american-indians",
      "Borders, American Indians, and Spanish California",
      ["MIG", "WOR", "GEO"],
      [
        "The U.S. government forged diplomatic initiatives aimed at dealing with the continued British and Spanish presence in North America, as U.S. settlers migrated beyond the Appalachians and sought free navigation of the Mississippi River. Pinckney's Treaty addressed the Mississippi question, and Jay's Treaty addressed the British forts.",
        "An ambiguous relationship between the federal government and American Indian tribes contributed to problems regarding treaties and American Indian legal claims relating to the seizure of their lands. The Constitution gave Congress authority over commerce with the tribes, and the government made treaties with them, but states, settlers, and speculators often ignored those agreements. After a Native confederacy in the Ohio country defeated U.S. armies in the early 1790s, General Anthony Wayne defeated it at Fallen Timbers in 1794, and in the Treaty of Greenville of 1795 the tribes gave up much of present-day Ohio.",
        "In the West, the Spanish, supported by the bonded labor of the local American Indians, expanded their mission settlements into California. These missions provided opportunities for social mobility for soldiers and led to new cultural blending, even as Native people suffered from disease and forced labor.",
      ],
      "The United States used treaties and force to secure its borders and the Ohio country, while Spain expanded missions in California.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.11",
      title: "A new national identity",
      body: "Political institutions were one part of a new national identity. Topic 3.11 follows American culture, art, and literature.",
      transferQuestion:
        "Why did Hamilton's financial program and the French Revolution both deepen the divisions between Federalists and Democratic-Republicans?",
      feedback:
        "A strong answer links Hamilton's program to disputes over federal power, and the French Revolution to disputes over foreign policy and ties to Britain or France.",
      links: [
        {
          topicId: "apush-3-9",
          sectionId: "federalism",
          label: "Review federalism",
        },
      ],
    },
  ],
  sourceIds: [],
});

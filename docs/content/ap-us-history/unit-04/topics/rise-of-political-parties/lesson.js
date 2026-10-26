// Original Page One lesson for CED Topic 4.2.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.2", {
  summary:
    "How the election of 1800, Jefferson's presidency, the Supreme Court's early decisions, and the Louisiana Purchase shaped national politics and the nation's reach across North America.",
  minutes: 13,
  goals: [
    "Explain the issues that divided the national parties in the early 1800s.",
    "Explain how Supreme Court decisions established the primacy of the judiciary and of federal law.",
    "Explain how the Louisiana Purchase and exploration expanded American influence and control in North America.",
  ],
  bigIdea:
    "The early 1800s kept the party conflict of the 1790s alive, while the Supreme Court defined the Constitution's meaning and the Louisiana Purchase doubled the nation's size.",
  context:
    "The CED asks you to explain the causes and effects of policy debates in the early republic. For each debate, ask which party took which side and what the outcome showed about the powers of the federal government.",
  sections: [
    section(
      "election-of-1800-and-jeffersonian-politics",
      "The election of 1800 and Jeffersonian politics",
      ["PCE", "WOR"],
      [
        "In the early 1800s, national political parties continued to debate issues such as the tariff, the powers of the federal government, and relations with European powers. The election of 1800 was bitter. Thomas Jefferson, the Democratic-Republican candidate, tied in the Electoral College with his running mate, Aaron Burr, and the House of Representatives chose Jefferson as president. The Twelfth Amendment (1804) changed the Constitution so that electors would vote separately for president and vice president. The transfer of power from the Federalists to the Democratic-Republicans took place without violence.",
        "In his First Inaugural Address, Jefferson tried to calm party feelings by saying, “We are all Republicans, we are all Federalists.” His administration cut federal spending and taxes, including the excise tax on whiskey, and worked to reduce the national debt. Relations with European powers remained a problem. Britain and France seized American ships during their wars, and in 1807 Jefferson persuaded Congress to pass the Embargo Act, which forbade American ships to sail to foreign ports. The embargo hurt American merchants and was repealed in 1809.",
      ],
      "The peaceful transfer of power in 1800 showed that the republic could survive party conflict, and foreign policy remained divisive.",
    ),
    section(
      "courts-and-the-constitution",
      "The Supreme Court and the Constitution",
      ["PCE", "NAT"],
      [
        "Supreme Court decisions established the primacy of the judiciary in determining the meaning of the Constitution and asserted that federal laws took precedence over state laws. In Marbury v. Madison (1803), Chief Justice John Marshall wrote that the Court had the power to decide whether a law passed by Congress was constitutional, which is known as judicial review. The case arose from the last-minute appointment of federal judges by the Federalists in 1801.",
        "In McCulloch v. Maryland (1819), the Court upheld Congress's power to charter a national bank and ruled that a state could not tax it, which established that federal law is supreme over state law. In Gibbons v. Ogden (1824), the Court held that the power to regulate interstate commerce belonged to Congress, which strengthened national authority over the economy.",
        [
          "Common trap",
          "Marbury v. Madison did not give the Court the power to make laws. It established that the Court could say what the Constitution means and could decide that an act of Congress violates it.",
        ],
      ],
      "The Marshall Court claimed the final word on the Constitution and strengthened federal power over the states.",
    ),
    section(
      "louisiana-purchase-and-exploration",
      "The Louisiana Purchase and exploration",
      ["GEO", "WOR", "MIG"],
      [
        "Following the Louisiana Purchase, the U.S. government sought influence and control over North America through a variety of means, including exploration and diplomatic efforts. In 1803 the United States bought the Louisiana Territory from France for about $15 million, which doubled the size of the nation. Jefferson had been unsure whether the Constitution allowed such a purchase, but he agreed because it gave American farmers access to the Mississippi River and the port of New Orleans and removed a European power from the western border.",
        "Jefferson sent Meriwether Lewis and William Clark to explore the new territory and the lands beyond it. Their expedition, from 1804 to 1806, was guided in part by the Shoshone woman Sacagawea. It mapped routes to the Pacific, gathered information about the region's geography and peoples, and strengthened American claims to the Northwest.",
      ],
      "The purchase doubled the nation's size, and exploration helped establish American claims across the continent.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.3",
      title: "A bigger nation, sharper regional debates",
      body: "The new lands and growing economy raised questions about the federal government's role. Topic 4.3 follows how regional interests shaped those debates.",
      transferQuestion:
        "How did the Louisiana Purchase raise a constitutional question for Jefferson, who favored limited federal power?",
      feedback:
        "A strong answer notes that the Constitution did not clearly give the president the power to buy territory, and that Jefferson set aside his strict reading because of the purchase's benefits.",
      links: [
        {
          topicId: "apush-3-10",
          sectionId: "parties-and-foreign-policy",
          label: "Review the first parties",
        },
      ],
    },
  ],
  sourceIds: ["jefferson-1801"],
});

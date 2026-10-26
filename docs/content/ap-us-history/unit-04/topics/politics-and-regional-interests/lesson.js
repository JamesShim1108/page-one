// Original Page One lesson for CED Topic 4.3.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.3", {
  summary:
    "How the economic interests of the Northeast, South, and West shaped political positions in the 1810s and 1820s, how the American System aimed to unify the economy, and how the Missouri Compromise postponed the conflict over slavery.",
  minutes: 12,
  goals: [
    "Explain how regional interests shaped national political positions.",
    "Explain the purposes of the American System and the debates it caused.",
    "Explain how the Missouri Compromise settled a dispute and why it only temporarily eased tensions.",
  ],
  bigIdea:
    "Regional interests often trumped national concerns, and attempts to unify the economy and settle the question of slavery's expansion produced debates that deepened sectional differences.",
  context:
    "The CED asks you to explain how different regional interests affected debates about the role of the federal government. Ask which region gained or lost under each policy and how that shaped its representatives' votes.",
  sections: [
    section(
      "regional-interests",
      "Regional interests and national politics",
      ["PCE", "GEO", "WXT"],
      [
        "Regional interests often trumped national concerns as the basis for many political leaders' positions on slavery and economic policy. The Northeast had growing manufacturing and trade and wanted protection for its industries. The South depended on exporting cotton and other crops, bought manufactured goods, and generally opposed taxes that raised prices. The West wanted cheap land, access to markets, and roads and canals to carry its crops.",
        "After the War of 1812 the Federalist Party collapsed, and the single-party politics of the Era of Good Feelings (about 1817–1825) hid sharp regional disputes within the Democratic-Republican Party. Without two parties to organize national debate, regional blocs competed within one party.",
      ],
      "The North, South, and West had different economic interests, and leaders voted according to those interests more than any national plan.",
    ),
    section(
      "american-system",
      "The American System",
      ["WXT", "PCE", "GEO"],
      [
        "Plans to further unify the U.S. economy, such as the American System, generated debates over whether such policies would benefit agriculture or industry, potentially favoring different sections of the country. Henry Clay of Kentucky promoted the American System, which called for a protective tariff to shelter American manufacturers from British competition, a national bank to provide a stable currency and credit, and federal spending on internal improvements such as roads and canals.",
        "Congress passed the Tariff of 1816 and chartered the Second Bank of the United States in 1816. Supporters said the plan would knit the sections together by creating a national market, while opponents, especially in the South, said that tariffs raised the cost of manufactured goods and benefited the North, and many questioned whether the Constitution allowed the federal government to build roads and canals. Presidents Madison and Monroe vetoed bills for internal improvements on constitutional grounds, so such projects were often left to the states or private companies.",
      ],
      "The American System aimed to bind the nation's economy together, but it favored some regions more than others and raised constitutional questions.",
    ),
    section(
      "missouri-compromise",
      "The Missouri Compromise",
      ["PCE", "SOC", "GEO"],
      [
        "Congressional attempts at political compromise, such as the Missouri Compromise, only temporarily stemmed growing tensions between opponents and defenders of slavery. When Missouri asked to join the Union as a slave state in 1819, Representative James Tallmadge of New York proposed to restrict slavery there. Southerners objected because the balance between free and slave states in the Senate was at stake, and the Senate was equally divided.",
        "In the compromise of 1820–1821, Maine entered as a free state and Missouri as a slave state, which kept the Senate balanced. Slavery was banned in the rest of the Louisiana Purchase north of the latitude 36°30′, except in Missouri. The agreement settled the immediate dispute but showed that Americans were dividing along sectional lines over slavery, and the question returned with each new territory.",
        [
          "Common trap",
          "The Missouri Compromise did not end slavery's expansion or the debate over it. It set a rule for one region and postponed the larger question.",
        ],
      ],
      "The compromise preserved the Senate balance and drew a line across the Louisiana Purchase, but it postponed the conflict rather than ending it.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.4",
      title: "Regional interests and foreign policy",
      body: "The War of 1812 helped shape these regional debates, and the nation's growing confidence shaped its foreign policy. Topic 4.4 follows both.",
      transferQuestion:
        "Why did the South oppose a protective tariff while the Northeast supported one?",
      feedback:
        "A strong answer explains that Northern manufacturers wanted protection from British goods, while Southern farmers sold crops abroad and bought manufactured goods and feared higher prices and foreign retaliation.",
      links: [
        {
          topicId: "apush-4-2",
          sectionId: "courts-and-the-constitution",
          label: "Review the Supreme Court and federal power",
        },
      ],
    },
  ],
  sourceIds: [],
});

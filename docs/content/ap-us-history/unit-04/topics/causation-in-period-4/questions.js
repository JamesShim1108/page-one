// Original practice questions for Topic 4.14. q-numbered items are topic practice.
import { topicBank } from "../../../kit.js";

export const bank = topicBank("4.14", [
  {
    id: "q01",
    s: "how-to-reason-about-causation",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.I"],
    q: "Which of the following is best described as a long-term cause of the rise of mass political parties?",
    right:
      "The expansion of suffrage and a market economy that created many wage earners",
    at: 0,
    wrong: [
      [
        "The nomination of Andrew Jackson as a presidential candidate in 1828",
        "This was a short-term event, not a long-term cause.",
      ],
      [
        "The defeat of John Quincy Adams in the presidential election of 1828",
        "An election result was a short-term effect.",
      ],
      [
        "The decision of the Whigs to hold a national convention in 1839",
        "The Whig convention was a result of party growth.",
      ],
    ],
    why: "Long-term changes in who could vote and how Americans earned a living created the conditions for mass parties.",
    d: "The nomination choice is close because it affected parties directly, but it was a single event and not a long-term cause.",
  },
  {
    id: "q02",
    s: "how-to-reason-about-causation",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.I.C"],
    q: "Which of the following was a short-term cause of the nullification crisis of 1832?",
    right: "The passage of the tariffs of 1828 and 1832",
    at: 2,
    wrong: [
      [
        "The invention of the cotton gin in 1793",
        "That was a very long-term influence on the Southern economy.",
      ],
      [
        "The signing of the Constitution in 1787",
        "The Constitution was a long-term background factor.",
      ],
      [
        "The end of the Atlantic slave trade in 1808",
        "That event came long before the tariff dispute.",
      ],
    ],
    why: "South Carolina acted in response to recent tariffs that it believed harmed its economy.",
    d: "The cotton gin choice is close because the gin helped shape the Southern economy, but it was a long-term factor.",
  },
  {
    id: "q03",
    s: "politics-and-foreign-policy",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.I.B"],
    q: "How did the decisions of the Marshall Court promote a stronger national identity?",
    right: "They strengthened federal authority over the states",
    at: 3,
    wrong: [
      [
        "They gave the states the final say on the meaning of the Constitution",
        "The decisions asserted national supremacy.",
      ],
      [
        "They ended the power of Congress to regulate trade with other nations",
        "The Court upheld Congress's commerce power.",
      ],
      [
        "They placed limits on the power of the federal courts to review state laws",
        "The Court asserted its power over state laws.",
      ],
    ],
    why: "McCulloch v. Maryland and Gibbons v. Ogden supported national supremacy and a national economy.",
    d: "The states' final say choice is close because it describes a major dispute of the period, but the Marshall Court ruled for national authority.",
  },
  {
    id: "q04",
    s: "politics-and-foreign-policy",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.3.I"],
    q: "How did the War of 1812 contribute to a stronger American national identity?",
    right: "Many Americans saw its end as a victory, and the Federalists lost influence",
    at: 1,
    wrong: [
      [
        "It gave the United States control of Canada and ended all disputes with Britain",
        "The United States did not gain Canada.",
      ],
      [
        "It divided the nation more deeply and led several New England states to leave the Union",
        "The Hartford Convention did not lead to secession.",
      ],
      [
        "It made Americans dependent on British manufactured goods for the next generation",
        "The war encouraged American manufacturing.",
      ],
    ],
    why: "National pride grew after the war, and the Federalist Party, which had opposed it, lost influence.",
    d: "The Canada choice is close because some Americans had hoped to take Canada, but the treaty restored the prewar borders.",
  },
  {
    id: "q05",
    s: "economics-and-society",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.2"],
    q: "Which of the following best explains how the market revolution both promoted and limited a shared national identity?",
    right:
      "It linked regions through trade but gave the North and South different interests",
    at: 2,
    wrong: [
      [
        "It made every region produce the same goods and so ended all disputes over the tariff",
        "Regions specialized, and the tariff remained controversial.",
      ],
      [
        "It isolated each region from the others and ended trade between the North and South",
        "Trade between the regions grew.",
      ],
      [
        "It gave the federal government direct control of every farm and factory in the nation",
        "Production stayed in private hands.",
      ],
    ],
    why: "Canals, railroads, and cotton exports linked Americans, but the Northern and Southern economies developed in different directions.",
    d: "The same goods choice is close because markets did unify, but regions specialized in different goods.",
  },
  {
    id: "q06",
    s: "politics-and-foreign-policy",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-4.1.I"],
    q: "Which of the following was a continuity in American politics from the 1790s to the 1840s?",
    right: "Disputes over the role and powers of the federal government continued",
    at: 0,
    wrong: [
      [
        "The same two parties competed in every election without change",
        "The parties changed from Federalists and Democratic-Republicans to Democrats and Whigs.",
      ],
      [
        "Property requirements for voting were enforced in every state",
        "Property requirements were dropped in most states.",
      ],
      [
        "Congress and the president agreed on the national bank at all times",
        "The bank was a source of conflict.",
      ],
    ],
    why: "Debates about the bank, tariffs, and internal improvements echoed the arguments of Hamilton and Jefferson.",
    d: "The same parties choice is close because parties persisted, but their names and makeup changed.",
  },
  {
    id: "q07",
    s: "politics-and-foreign-policy",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-4.3.I"],
    q: "Which of the following describes a difference between the Louisiana Purchase and the Monroe Doctrine as foreign-policy actions?",
    right:
      "The purchase added territory, while the Doctrine warned Europe against intervening",
    at: 1,
    wrong: [
      [
        "The purchase warned European powers away, while the Doctrine added territory to the nation",
        "The actions are reversed.",
      ],
      [
        "The purchase formed an alliance with France, while the Doctrine ended trade with Europe",
        "The purchase was not an alliance, and the Doctrine did not end trade.",
      ],
      [
        "The purchase ended the war with Britain, while the Doctrine ended the war with Spain",
        "Neither action ended a war.",
      ],
    ],
    why: "The purchase of 1803 doubled the nation's size, and the Doctrine of 1823 set a policy toward European powers.",
    d: "The reversed actions choice is close because it names the same two events, but it assigns the effects to the wrong event.",
  },
  {
    id: "q08",
    s: "politics-and-foreign-policy",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.3.II"],
    q: "Which of the following was an effect of westward expansion on the debate over slavery between 1800 and 1848?",
    right:
      "Disputes such as the Missouri Compromise showed the sections disagreed over slavery in new lands",
    at: 3,
    wrong: [
      [
        "The sections reached a lasting agreement on slavery that ended the debate in Congress",
        "The debate continued.",
      ],
      [
        "Northerners and Southerners agreed that new territories should be closed to slavery",
        "Southerners opposed closing the territories.",
      ],
      [
        "Congress gave the Western territories the power to decide the question of slavery alone",
        "Congress took part in the decisions.",
      ],
    ],
    why: "Each new addition of land raised the question of the spread of slavery and showed the divisions between the sections.",
    d: "The lasting agreement choice is close because the compromise seemed to settle the issue, but it was only temporary.",
  },
  {
    id: "q09",
    s: "economics-and-society",
    sub: "5.B",
    r: "causation",
    kc: ["KC-4.1.II"],
    q: "Which of the following was an effect, rather than a cause, of the Second Great Awakening?",
    right: "Increased participation in temperance and antislavery societies",
    at: 2,
    wrong: [
      [
        "Anxiety about the changes of the market revolution",
        "That anxiety helped to cause the revivals.",
      ],
      [
        "Democratic and individualistic ideas in the early republic",
        "Those ideas were a cause.",
      ],
      [
        "Social and geographical mobility that loosened old ties to churches",
        "Mobility was a cause of the revivals.",
      ],
    ],
    why: "Revivals encouraged believers to join reform societies, which makes reform an effect of the Awakening.",
    d: "The anxiety choice is close because it is linked to the Awakening, but it came before the revivals.",
  },
]);

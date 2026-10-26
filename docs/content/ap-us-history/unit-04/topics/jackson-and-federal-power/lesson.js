// Original Page One lesson for CED Topic 4.8.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.8", {
  summary:
    "How Andrew Jackson's presidency divided Democrats and Whigs over the national bank, tariffs, and federal power, and how Indian removal shaped relations with American Indian nations.",
  minutes: 14,
  goals: [
    "Explain how Democrats and Whigs differed on the powers of the federal government.",
    "Explain the causes and outcome of the nullification crisis and the Bank War.",
    "Explain the causes and effects of American Indian removal.",
  ],
  bigIdea:
    "Under Jackson, a mass electorate debated the powers of the federal government, and the federal government used its power to remove American Indian nations from the Southeast.",
  context:
    "The CED asks you to explain the causes and effects of continuing policy debates about the role of the federal government. Pair each debate with the party and region that took each side.",
  sections: [
    section(
      "democrats-and-whigs",
      "Democrats, Whigs, and the Bank War",
      ["PCE", "WXT"],
      [
        "By the 1820s and 1830s, new political parties arose, the Democrats, led by Andrew Jackson, and the Whigs, led by Henry Clay, that disagreed about the role and powers of the federal government and issues such as the national bank, tariffs, and federally funded internal improvements. Democrats generally favored limited federal power, a more limited role for the national government in the economy, and the interests of farmers and workers. Whigs, who formed in opposition to what they called “King Andrew,” supported the American System of a national bank, a protective tariff, and federal funding of roads and canals.",
        "Jackson's fight against the Second Bank of the United States showed the difference. Jackson saw the Bank as a monopoly that favored the wealthy. In 1832 he vetoed the bill to renew its charter, and he won reelection that year. He then removed federal deposits from the Bank and placed them in state banks, which critics called “pet banks.” A financial panic began in 1837, and it led to a depression that hurt the Democrats in the election of 1840.",
      ],
      "Democrats and Whigs differed over the bank, tariffs, and internal improvements, and the Bank War made the divide sharper.",
    ),
    section(
      "nullification-crisis",
      "The nullification crisis",
      ["PCE", "GEO"],
      [
        "Regional interests also shaped the federal power debate. Southerners disliked the protective tariffs of 1828 and 1832, which they thought raised the price of manufactured goods and favored the North. John C. Calhoun of South Carolina argued that a state could nullify, or declare void, a federal law that it judged unconstitutional. In November 1832 a South Carolina convention declared the tariffs null and void within the state.",
        "Jackson rejected nullification as a threat to the Union and asked Congress to authorize force if needed. Congress passed the Force Act, and it also passed a compromise tariff in 1833 that lowered duties gradually. South Carolina then withdrew its nullification, though it also declared the Force Act null. The crisis ended without violence, but the question of whether states could resist federal law remained.",
      ],
      "South Carolina's nullification challenge to the tariffs ended in a compromise but left the question of state authority unsettled.",
    ),
    section(
      "indian-removal",
      "American Indian removal",
      ["MIG", "GEO", "PCE"],
      [
        "Frontier settlers tended to champion expansion efforts, while American Indian resistance led to a sequence of wars and federal efforts to control and relocate American Indian populations. Settlers in Georgia, Alabama, and Mississippi wanted the land of the Cherokee, Creek, Choctaw, Chickasaw, and Seminole, even though several of these nations had adopted written constitutions, farming, and some American customs. Jackson, who had fought the Creek in 1814 and the Seminole in 1818, supported removal.",
        "Congress passed the Indian Removal Act in 1830, which gave the president the power to exchange land west of the Mississippi River for Native land in the East. The Supreme Court ruled in Worcester v. Georgia (1832) that Georgia could not extend its laws over the Cherokee Nation, but the federal government did not enforce the decision. In 1835 a small group of Cherokee signed the Treaty of New Echota, which most of the nation rejected, and in 1838–1839 the army forced about 16,000 Cherokee westward on the Trail of Tears, on which thousands died. Other nations resisted, as in the Black Hawk War (1832) and the Second Seminole War (1835–1842).",
        [
          "Common trap",
          "Removal was not carried out by settlers alone. The Indian Removal Act, treaties, and the army made it federal policy.",
        ],
      ],
      "The federal government forced Native nations out of the Southeast through laws, treaties, and force.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.9",
      title: "Democracy, expansion, and national identity",
      body: "Debates over power and territory happened alongside the growth of a national culture. Topic 4.9 follows that culture.",
      transferQuestion:
        "How did the nullification crisis show that regional interests could outweigh national loyalty?",
      feedback:
        "A strong answer notes that South Carolina placed its economic interest in lower tariffs ahead of the federal law, and that other Southern states did not support nullification.",
      links: [
        {
          topicId: "apush-4-3",
          sectionId: "regional-interests",
          label: "Review regional interests",
        },
      ],
    },
  ],
  sourceIds: ["jackson-1830"],
});

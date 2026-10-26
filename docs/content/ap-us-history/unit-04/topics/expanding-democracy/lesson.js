// Original Page One lesson for CED Topic 4.7.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.7", {
  summary:
    "How voting expanded from property owners to nearly all adult white men between 1800 and 1848, how party politics changed as a result, and who was left out.",
  minutes: 12,
  goals: [
    "Explain how and why suffrage expanded for white men.",
    "Explain how party organization and campaigning changed as more people voted.",
    "Explain how race and sex limited the expansion of democracy.",
  ],
  bigIdea:
    "Political participation grew sharply for white men, but the same decades narrowed or denied the vote for women, free African Americans, and American Indians.",
  context:
    "The CED asks you to explain the causes and effects of the expansion of participatory democracy. Always ask who gained a political voice, why, and who was excluded.",
  sections: [
    section(
      "ending-property-requirements",
      "Ending property requirements",
      ["PCE", "SOC"],
      [
        "The nation's transition to a more participatory democracy was achieved by expanding suffrage from a system based on property ownership to one based on voting by all adult white men. At the nation's founding, most states required voters to own property or pay taxes. New western states, such as Indiana, Illinois, and Missouri, entered the Union with few or no property requirements. Older states revised their constitutions, and by the 1840s most states had dropped property requirements for white men.",
        "Several developments explained the change. Many wage earners owned no land, and they argued that men who paid taxes and served in the militia should have a voice in government. Competing parties sought new voters, and the idea that the common man should have political influence became part of political life. In Rhode Island, which still used its colonial charter and limited the vote to landowners, Thomas Dorr led a movement in 1841–1842 that pressed for broader suffrage, and the state adopted a new constitution in 1843.",
      ],
      "Property requirements fell as western states, wage earners, and competing parties pressed for the vote.",
    ),
    section(
      "party-politics-and-participation",
      "Party politics and participation",
      ["PCE"],
      [
        "The expansion of voting was accompanied by the growth of political parties. Parties nominated candidates at national conventions instead of in congressional caucuses, and the Anti-Masonic Party held the first national nominating convention in 1831. By 1832 every state but South Carolina chose presidential electors by popular vote. Parties organized parades, rallies, and newspapers, and they rewarded loyal supporters with government jobs, which became known as the spoils system.",
        "The election of 1824 helped to bring about these changes. Andrew Jackson won the most popular and electoral votes but not a majority of electoral votes, and the House of Representatives chose John Quincy Adams. When Adams named Henry Clay secretary of state, Jackson's supporters charged that a “corrupt bargain” had denied the will of the voters. Jackson won in 1828, and voter turnout rose from about a quarter of eligible voters in 1824 to more than half in 1828 and to about 80 percent in 1840.",
      ],
      "Conventions, popular votes for electors, and mass campaigns made politics a mass activity.",
    ),
    section(
      "limits-of-democracy",
      "The limits of democracy",
      ["SOC", "PCE"],
      [
        "The expansion of democracy was limited by race and sex. Many states took the vote away from free African American men even as they gave it to all white men. New York required free Black men, but not white men, to own property in 1821, and Pennsylvania excluded Black men entirely in 1838. Only a few New England states allowed Black men to vote on equal terms. In 1807 New Jersey ended the voting rights that some propertied women had held. Women could not vote anywhere, and American Indians were not citizens.",
        [
          "Common trap",
          "Do not describe the period as universal democracy. Suffrage became broader for white men and narrower for many free Black men.",
        ],
      ],
      "Voting rights grew for white men, but women, free Black men, and American Indians were largely shut out.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.8",
      title: "A mass electorate and a new party system",
      body: "A larger electorate rewarded politicians who spoke for ordinary voters. Topic 4.8 follows Andrew Jackson, the Democrats, and the Whigs.",
      transferQuestion:
        "Why did political parties have more reason to campaign for voters once property requirements ended?",
      feedback:
        "A strong answer notes that a much larger group of voters had to be reached and persuaded, which rewarded organization, rallies, newspapers, and appeals to ordinary voters.",
      links: [
        {
          topicId: "apush-4-6",
          sectionId: "work-wealth-and-class",
          label: "Review work, wealth, and class",
        },
      ],
    },
  ],
  sourceIds: ["tocqueville-1835"],
});

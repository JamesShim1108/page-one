// Original Page One lesson for CED Topic 4.6.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.6", {
  summary:
    "How the market revolution moved people to cities and to the West, divided Americans into new economic classes, and changed the roles of women and families.",
  minutes: 13,
  goals: [
    "Explain how migration to Northern cities and to the West changed American communities.",
    "Explain how the growth of manufacturing affected workers and social classes.",
    "Explain how the market revolution changed gender and family roles.",
  ],
  bigIdea:
    "The market revolution raised living standards for some Americans and left many others poor, and it reshaped where people lived, how they worked, and how families divided their roles.",
  context:
    "The CED asks you to explain how innovation in technology, agriculture, and commerce affected different segments of American society. Always ask who gained, who lost, and who stayed outside the benefits.",
  sections: [
    section(
      "migration-and-new-communities",
      "Migration and new communities",
      ["MIG", "GEO", "SOC"],
      [
        "Large numbers of international migrants moved to industrializing Northern cities, while many Americans moved west of the Appalachians, developing thriving new communities along the Ohio and Mississippi rivers. Irish and German immigrants arrived in large numbers in the 1830s and 1840s. The Irish potato famine, which began in 1845, sent many Irish families to cities such as Boston and New York, where they took low-paying jobs in factories and construction and as domestic servants. Many Germans settled in Midwestern cities and farmland.",
        "Many native-born Protestants reacted with nativism, a hostility toward immigrants, especially Catholics, which led to riots and the formation of anti-immigrant organizations. Meanwhile, Americans who crossed the Appalachians built towns and cities along the rivers. Cincinnati, Louisville, and St. Louis grew rapidly because river trade carried their goods to markets.",
      ],
      "Immigrants filled Northern cities and factories, and settlers built river towns in the West.",
    ),
    section(
      "work-wealth-and-class",
      "Work, wealth, and class",
      ["SOC", "WXT"],
      [
        "Increasing numbers of Americans, especially women and men working in factories, no longer relied on semi-subsistence agriculture. Instead they supported themselves by producing goods for distant markets. In Lowell and other mill towns, owners recruited young unmarried farm women, who lived in company boardinghouses and earned cash wages. When owners cut wages, some of these women held strikes in the 1830s, and by the 1840s many mills turned to immigrant workers.",
        "The growth of manufacturing drove a significant increase in prosperity and standards of living for some. This led to the emergence of a larger middle class of merchants, professionals, clerks, and shopkeepers, and of a small but wealthy business elite, but also to a large and growing population of laboring poor. Many wage earners worked long hours in crowded conditions, and they formed unions to demand better pay and shorter hours. In Commonwealth v. Hunt (1842), the Massachusetts Supreme Judicial Court ruled that workers had the right to organize a union and to strike.",
      ],
      "Factory work brought cash wages and prosperity for some, while a growing group of workers remained poor.",
    ),
    section(
      "gender-and-family-roles",
      "Gender and family roles",
      ["SOC", "ARC"],
      [
        "Gender and family roles changed in response to the market revolution, particularly with the growth of definitions of domestic ideals that emphasized the separation of public and private spheres. As work moved out of the home, many middle-class Americans came to see men as breadwinners in the public world of work and politics and women as the moral guardians of the home. Historians call this ideal the cult of domesticity or the cult of true womanhood. Magazines such as Godey's Lady's Book spread it, and the birthrate among middle-class families fell as families came to emphasize the care of fewer children.",
        "This ideal gave women new influence in the home and in the education of children, and it encouraged new schools for girls, such as Emma Willard's Troy Female Seminary (1821). It also did not describe the lives of most women. Farm women, factory workers, immigrant domestic servants, and enslaved women all worked outside the ideal.",
        [
          "Common trap",
          "The separation of public and private spheres was an ideal that grew up mostly among middle-class families. It did not describe how all women lived or worked.",
        ],
      ],
      "The market economy encouraged an ideal that separated men's public work from women's roles in the home, though many women did not live by it.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.7",
      title: "Economic change and political change",
      body: "A larger class of workers, shopkeepers, and farmers also wanted a voice in government. Topic 4.7 follows the expansion of political participation.",
      transferQuestion:
        "How did the growth of wage labor contribute to the demand for broader voting rights?",
      feedback:
        "A strong answer notes that many men owned no land, so property requirements excluded them, and that working men demanded political power equal to their economic role.",
      links: [
        {
          topicId: "apush-4-5",
          sectionId: "market-revolution",
          label: "Review the market revolution",
        },
      ],
    },
  ],
  sourceIds: [],
});

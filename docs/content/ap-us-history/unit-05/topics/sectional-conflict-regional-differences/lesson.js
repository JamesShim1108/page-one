// Original Page One lesson for CED Topic 5.5.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.5", {
  summary:
    "How immigration and nativism changed the North, how free labor and slave labor divided the economies of the two sections, and how abolitionists and defenders of slavery argued over slavery.",
  minutes: 14,
  goals: [
    "Explain the effects of immigration from Europe and Asia on American culture from 1844 to 1877.",
    "Explain how the free-labor North and the slave-labor South developed opposed views of western expansion.",
    "Explain the arguments of free-soilers, abolitionists, and defenders of slavery.",
  ],
  bigIdea:
    "Immigration changed Northern society, and the North's free-labor economy and the South's slave-labor economy produced opposed responses to the spread of slavery.",
  context:
    "This topic covers two learning objectives: the effects of immigration on American culture and the regional differences over slavery that caused tension before the Civil War. The CED asks you to read sources for their purpose and point of view, so note who is speaking and to whom.",
  sections: [
    section(
      "immigration-and-nativism",
      "Immigration and nativism",
      ["MIG", "SOC", "ARC"],
      [
        "Substantial numbers of international migrants continued to arrive in the United States from Europe and Asia, mainly from Ireland and Germany, often settling in ethnic communities where they could preserve elements of their languages and customs. Many Irish migrants fled the famine that began in 1845 and settled in Northern cities, where they worked on canals and railroads and in factories. Many Germans, some of them fleeing the failed revolutions of 1848, settled as farmers in the Midwest and in cities such as Milwaukee and St. Louis. Chinese migrants came to California, many of them to work in the mines. The newcomers built churches, newspapers, and schools, and they increased the number of Roman Catholics in the United States, which changed American religious and cultural life.",
        "A strongly anti-Catholic nativist movement arose that was aimed at limiting new immigrants' political power and cultural influence. Nativist mobs attacked Catholic churches and homes in Philadelphia in 1844. In the 1850s the American Party, whose members were called the Know-Nothings, won elections in several states by calling for longer waiting periods before immigrants could become citizens and vote. The party broke apart over slavery.",
      ],
      "Irish and German immigration reshaped Northern society, and nativists tried to limit the political power of the newcomers.",
    ),
    section(
      "free-labor-and-free-soil",
      "Free labor and the free-soil movement",
      ["WXT", "SOC", "PCE"],
      [
        "The North's expanding manufacturing economy relied on free labor, in contrast to the Southern economy's dependence on enslaved labor. By 1860 nearly four million people were enslaved in the South, and cotton, grown by their labor, was the nation's leading export. Some Northerners did not object to slavery on principle but claimed that slavery would undermine the free labor market. As a result, a free-soil movement arose that portrayed the expansion of slavery as incompatible with free labor.",
        "Free-soilers believed that a worker should be able to rise through his own effort and feared that slaveholders would take the best western land and leave no room for free farmers and wage earners. Many free-soilers held racial prejudices, and some wanted the territories kept for white settlers. The Free-Soil Party of 1848 and, later, the Republican Party of the 1850s gave the movement a political voice.",
        [
          "Common trap",
          "Free-soilers and abolitionists were not the same. Abolitionists wanted to end slavery everywhere, while many free-soilers wanted only to stop its spread in order to protect free labor.",
        ],
      ],
      "The free-labor North feared that slavery would crowd out free workers in the West, and the free-soil movement grew from that fear.",
    ),
    section(
      "abolitionists-and-defenders-of-slavery",
      "Abolitionists and defenders of slavery",
      ["SOC", "ARC", "PCE"],
      [
        "African American and white abolitionists, although a minority in the North, mounted a highly visible campaign against slavery, presenting moral arguments against the institution, assisting escapes, and sometimes expressing a willingness to use violence to achieve their goals. William Lloyd Garrison's newspaper The Liberator demanded immediate emancipation, and Frederick Douglass began to publish The North Star in 1847. Harriet Tubman and many others helped enslaved people to escape on the Underground Railroad. John Brown, who believed that violence was justified, led a raid on the federal arsenal at Harpers Ferry, Virginia, in 1859.",
        "Defenders of slavery based their arguments on racial doctrines, the view that slavery was a positive social good, and the belief that slavery and states' rights were protected by the Constitution. John C. Calhoun and writers such as George Fitzhugh claimed that slavery benefited enslaved people and society, and they relied on false claims about the inferiority of Black people. The House of Representatives adopted a “gag rule” from 1836 to 1844 that set aside antislavery petitions without reading them, and Southern states restricted the circulation of antislavery writings.",
      ],
      "Abolitionists attacked slavery on moral grounds, and its defenders answered with racial doctrines, claims of social benefit, and appeals to the Constitution.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.6",
      title: "From argument to political crisis",
      body: "The opposed views of free-soilers, abolitionists, and defenders of slavery shaped the political events of the 1850s. Topic 5.6 follows them.",
      transferQuestion:
        "How did the arguments of defenders of slavery in the 1850s differ from the views of Southern leaders in the early republic?",
      feedback:
        "A strong answer notes that many early leaders called slavery a necessary evil, while by the 1830s and 1850s defenders called it a positive good and relied on racial doctrines.",
      links: [
        {
          topicId: "apush-4-11",
          sectionId: "abolition-and-antislavery",
          label: "Review abolitionism before 1848",
        },
        {
          topicId: "apush-4-13",
          sectionId: "slavery-as-a-way-of-life",
          label: "Review slavery as a way of life in the South",
        },
      ],
    },
  ],
  sourceIds: ["lincoln-speeches"],
});

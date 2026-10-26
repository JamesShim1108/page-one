// Original Page One lesson for CED Topic 4.11.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.11", {
  summary:
    "How religious revival, voluntary organizations, abolitionism, and the women's rights movement tried to improve American society between 1800 and 1848.",
  minutes: 15,
  goals: [
    "Explain how and why reform movements such as temperance and education reform developed.",
    "Explain how abolitionism and antislavery movements grew in the North and what limits they faced.",
    "Explain how the women's rights movement expressed its ideals at Seneca Falls.",
  ],
  bigIdea:
    "Inspired by the Second Great Awakening and by democratic ideals, Americans formed voluntary organizations outside of government to improve society, and those efforts included antislavery and women's rights movements.",
  context:
    "The CED asks you to explain how and why various reform movements developed and expanded. For each movement, name the problem it identified, who led it, how it worked outside government, and how much it achieved.",
  sections: [
    section(
      "voluntary-organizations-and-reform",
      "Voluntary organizations and reform",
      ["ARC", "SOC", "PCE"],
      [
        "Americans formed new voluntary organizations that aimed to change individual behaviors and improve society through temperance and other reform efforts. The American Temperance Society (1826) urged Americans to give up alcohol, which reformers blamed for poverty, violence, and family suffering. Horace Mann in Massachusetts promoted public schools, and Dorothea Dix pressed states to build asylums to care for the mentally ill and to improve prisons.",
        "The Second Great Awakening also inspired utopian communities, which tried to create model societies. Some, such as the Shakers, were religious, and others, such as New Harmony in Indiana and Brook Farm in Massachusetts, were based on cooperative ideals.",
      ],
      "Voluntary groups worked outside government to reduce drinking, expand schools, reform asylums and prisons, and build model communities.",
    ),
    section(
      "abolition-and-antislavery",
      "Abolitionism and antislavery movements",
      ["SOC", "PCE", "ARC"],
      [
        "Abolitionist and antislavery movements gradually achieved emancipation in the North, contributing to the growth of the free African American population, even as many state governments restricted African Americans' rights. By the 1820s most Northern states had abolished slavery or put it on the path to ending. Early antislavery efforts included the American Colonization Society (1816), which proposed sending free Black Americans to Africa, and most African Americans rejected this plan.",
        "In the 1830s a more radical abolitionist movement called for immediate emancipation. William Lloyd Garrison began publishing The Liberator in 1831, and the American Anti-Slavery Society formed in 1833. Frederick Douglass, a formerly enslaved man, became one of the movement's greatest speakers. Antislavery movements increased in the North, but they faced hostility. Mobs attacked abolitionists, Congress adopted a rule in 1836 to table antislavery petitions without discussion, and many Northerners opposed equal rights for African Americans.",
      ],
      "Abolitionists moved from gradual emancipation toward demands for immediate freedom, in the face of strong opposition.",
    ),
    section(
      "womens-rights",
      "The women's rights movement",
      ["SOC", "ARC", "PCE"],
      [
        "A women's rights movement sought to create greater equality and opportunities for women, expressing its ideals at the Seneca Falls Convention. Many of its leaders began in the temperance and antislavery movements, where women learned to organize but often found themselves restricted. In 1848 Elizabeth Cady Stanton and Lucretia Mott organized the convention at Seneca Falls, New York. It adopted the Declaration of Sentiments, which was modeled on the Declaration of Independence and listed the ways in which women were denied rights, including the right to vote, to own property, and to receive an equal education.",
        "Over time, arguments emerged over whether to narrow the goals to white women. Black women such as Sojourner Truth took part in the movement, but disagreements about race divided the movement in later decades.",
        [
          "Common trap",
          "Seneca Falls did not win the vote for women. It was the beginning of a long campaign that continued until the Nineteenth Amendment in 1920.",
        ],
      ],
      "At Seneca Falls, reformers adapted the language of the Declaration of Independence to demand equal rights for women.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.12",
      title: "Antislavery voices and African American communities",
      body: "African Americans were central to the antislavery movement and created their own organizations. Topic 4.12 follows their experience.",
      transferQuestion:
        "Why did many reformers who worked in the temperance and antislavery movements turn to women's rights?",
      feedback:
        "A strong answer notes that women gained organizing experience in those movements but were often kept from speaking and voting, and that this led them to question their own rights.",
      links: [
        {
          topicId: "apush-4-10",
          sectionId: "effects-of-the-awakening",
          label: "Review the effects of the Second Great Awakening",
        },
      ],
    },
  ],
  sourceIds: ["seneca-falls-1848"],
});

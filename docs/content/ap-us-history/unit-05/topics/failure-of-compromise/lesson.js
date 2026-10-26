// Original Page One lesson for CED Topic 5.6.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.6", {
  summary:
    "Why the Kansas–Nebraska Act, violence in Kansas, the Dred Scott decision, the Lincoln–Douglas debates, and John Brown's raid failed to settle the question of slavery and ended the old party system.",
  minutes: 13,
  goals: [
    "Explain how the Kansas–Nebraska Act and the collapse of the Whigs led to the Republican Party.",
    "Explain how Bleeding Kansas and the Dred Scott decision increased conflict over slavery in the territories.",
    "Explain how the Lincoln–Douglas debates and John Brown's raid deepened the divide between the sections.",
  ],
  bigIdea:
    "Each attempt to settle slavery in the territories in the 1850s failed to reduce conflict, and the failures destroyed the old parties and produced a sectional party in the North.",
  context:
    "The CED asks you to explain the political causes of the Civil War. For each event in this topic, ask what attempt it made to settle the question of slavery and why the attempt made the conflict worse.",
  sections: [
    section(
      "kansas-nebraska-and-the-republican-party",
      "The Kansas–Nebraska Act and the Republican Party",
      ["PCE", "NAT", "GEO"],
      [
        "In 1854 Senator Stephen Douglas introduced the Kansas–Nebraska Act to organize the lands west of Missouri and Iowa and to prepare the way for a railroad across the Midwest. The Act created the territories of Kansas and Nebraska and applied popular sovereignty to both, which repealed the ban on slavery north of 36°30′ that the Missouri Compromise had set in 1820. Many Northerners were outraged that slavery might enter lands that had been closed to it.",
        "The Kansas–Nebraska Act, the Dred Scott decision, and other attempts to resolve the issue of slavery in the territories ultimately failed to reduce conflict. The Second Party System ended when the issues of slavery and anti-immigrant nativism weakened loyalties to the two major parties and fostered the emergence of sectional parties, most notably the Republican Party in the North. The Whigs broke apart after 1852 because Northern and Southern Whigs disagreed over slavery. The Republican Party formed in 1854 from Free-Soilers, antislavery Whigs, and antislavery Democrats, and it called for stopping the spread of slavery. In 1856 its first presidential candidate, John C. Frémont, carried many Northern states but lost to the Democrat James Buchanan.",
      ],
      "The Kansas–Nebraska Act reopened the question of slavery in the territories and helped to create the Republican Party.",
    ),
    section(
      "bleeding-kansas-and-dred-scott",
      "Bleeding Kansas and the Dred Scott decision",
      ["PCE", "SOC", "NAT"],
      [
        "Settlers from both sides rushed into Kansas to decide the question of slavery. Proslavery Missourians crossed the border to vote, and rival governments formed. In 1856 proslavery men attacked the antislavery town of Lawrence, and John Brown and his followers killed five proslavery settlers at Pottawatomie Creek. The fighting is known as Bleeding Kansas. In the same year Representative Preston Brooks of South Carolina beat Senator Charles Sumner of Massachusetts with a cane on the floor of the Senate after Sumner gave a speech attacking slavery. Northerners called it brutality, and many Southerners praised Brooks, which showed how far apart the sections had moved.",
        "In Dred Scott v. Sandford (1857), the Supreme Court ruled against Dred Scott, an enslaved man who had sued for his freedom after living in free territory. Chief Justice Roger Taney wrote that African Americans, enslaved or free, could not be citizens of the United States and that Congress had no power to ban slavery in the territories, which meant that the Missouri Compromise had always been unconstitutional. The Court meant to settle the issue. Instead it outraged Northerners and strengthened the Republican Party.",
        [
          "Common trap",
          "The Dred Scott decision did not settle the question of slavery in the territories. It increased conflict, because it denied the main goal of the Republican Party.",
        ],
      ],
      "Violence in Kansas and the Dred Scott ruling showed that neither force nor the courts could end the dispute.",
    ),
    section(
      "lincoln-douglas-and-john-brown",
      "The Lincoln–Douglas debates and John Brown",
      ["PCE", "NAT", "ARC"],
      [
        "In 1858 Abraham Lincoln, the Republican candidate for the Senate in Illinois, debated the Democratic senator Stephen Douglas seven times. In accepting his nomination, Lincoln said, “A house divided against itself cannot stand,” and he predicted that the nation would “become all one thing or all the other.” In the debates, Lincoln argued that slavery was a wrong that must be stopped from spreading. At Freeport, Douglas answered that settlers could keep slavery out of a territory by refusing to pass laws to protect it, a position called the Freeport Doctrine, which angered Southern Democrats. Douglas won the Senate seat, but Lincoln became known across the nation.",
        "In October 1859 John Brown led a small band of white and Black men in a raid on the federal arsenal at Harpers Ferry, Virginia, in an attempt to start a rebellion of enslaved people. Brown was captured and hanged. Many Northerners honored him as a martyr, and many Southerners took the Northern response as proof that the North meant to destroy slavery by force.",
      ],
      "The debates made the choice between spreading slavery and stopping it the central question of the nation, and Harpers Ferry raised Southern fears.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.7",
      title: "The politics of 1860",
      body: "By 1860 the Democratic Party also divided along sectional lines. Topic 5.7 follows the election of 1860 and secession.",
      transferQuestion:
        "Why did the Compromise of 1850 succeed in avoiding crisis for a few years while the Kansas–Nebraska Act did not?",
      feedback:
        "A strong answer notes that the Compromise of 1850 gave each section something and left most territory unsettled, while the Kansas–Nebraska Act repealed the Missouri Compromise line and opened closed lands to slavery.",
      links: [
        {
          topicId: "apush-5-4",
          sectionId: "the-compromise",
          label: "Review the Compromise of 1850",
        },
      ],
    },
  ],
  sourceIds: ["lincoln-speeches"],
});

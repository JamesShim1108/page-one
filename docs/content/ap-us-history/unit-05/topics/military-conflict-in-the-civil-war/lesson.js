// Original Page One lesson for CED Topic 5.8.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.8", {
  summary:
    "How the Union and the Confederacy mobilized for war, why the Union's resources and leadership proved decisive, and which battles and strategies led to its victory in 1865.",
  minutes: 13,
  goals: [
    "Compare how the Union and the Confederacy mobilized their economies and societies and met opposition at home.",
    "Explain how the resources, strategies, and leaders of each side shaped the course of the war.",
    "Explain how key victories and the destruction of the South's infrastructure led to Union victory.",
  ],
  bigIdea:
    "The Confederacy showed daring early in the war, but the Union's greater resources, better leadership and strategy, key victories, and the destruction of the South's infrastructure brought its victory.",
  context:
    "The CED asks you to compare and to trace continuity and change in the Civil War. As you read, notice where the two sides were alike, as in their need to draft soldiers, and where they differed, as in their resources.",
  sections: [
    section(
      "mobilization-and-the-home-front",
      "Mobilization and the home front",
      ["WOR", "WXT", "SOC"],
      [
        "Both the Union and the Confederacy mobilized their economies and societies to wage the war even while facing considerable home front opposition. Both governments turned to conscription. The Confederacy passed the first national draft in April 1862, and the Union passed the Enrollment Act in March 1863, which allowed a drafted man to avoid service by paying $300 or by hiring a substitute. Critics said that it made the conflict “a rich man's war and a poor man's fight.”",
        "Opposition took many forms. In July 1863 rioters in New York City, many of them poor Irish workers, attacked draft offices and Black residents. Peace Democrats, whom their opponents called Copperheads, demanded an end to the war. In the Confederacy, shortages and rising prices caused bread riots, such as the one in Richmond in April 1863, and some Southerners resisted the draft and the seizure of crops by the army. Women on both sides ran farms and businesses, worked in factories, and served as nurses.",
      ],
      "Both sides drafted soldiers and organized their economies for war, and both faced protest at home.",
    ),
    section(
      "resources-strategy-and-leadership",
      "Resources, strategy, and leadership",
      ["WOR", "GEO", "WXT"],
      [
        "The Union held large advantages in resources. It had many more people, nearly all of the nation's factories, more railroads, and the navy. Its strategy, called the Anaconda Plan after the proposal of General Winfield Scott, was to blockade Southern ports, take control of the Mississippi River, and capture the Confederate capital at Richmond. The Confederacy aimed to defend its territory and to wear down Northern support for the war. It hoped that Britain and France, which depended on Southern cotton, would aid it, but their governments did not recognize the Confederacy.",
        "Although the Confederacy showed military initiative and daring early in the war, the Union ultimately succeeded due to improvements in leadership and strategy, key victories, greater resources, and the wartime destruction of the South's infrastructure. Generals Robert E. Lee and Thomas “Stonewall” Jackson won battles at Bull Run (1861), Fredericksburg (1862), and Chancellorsville (1863), while Union commanders in the East were often cautious. Lincoln looked for generals who would fight. Ulysses S. Grant won victories in the West, at Fort Donelson (1862) and Vicksburg (1863), and in 1864 Lincoln made him commander of all the Union armies.",
      ],
      "The North's people, factories, railroads, and navy gave it the means to win, and better generals and strategy made use of them.",
    ),
    section(
      "turning-points-and-total-war",
      "Turning points and total war",
      ["WOR", "GEO", "NAT"],
      [
        "In September 1862 Union forces stopped Lee's invasion of Maryland at Antietam, the bloodiest single day of the war, and Lincoln used the victory to announce the Emancipation Proclamation (Topic 5.9). In July 1863 the Union won at Gettysburg, Pennsylvania, which ended Lee's invasion of the North, and at Vicksburg, which gave it control of the Mississippi River and split the Confederacy in two.",
        "In 1864 Grant pressed Lee in Virginia in a costly campaign of attrition, and General William T. Sherman captured Atlanta in September and marched across Georgia to the sea, destroying railroads, crops, and plantations to break the South's ability to fight. The fall of Atlanta raised Northern hopes and helped Lincoln to win re-election. Lee surrendered to Grant at Appomattox Court House on April 9, 1865. More than 600,000 soldiers died, and the war left much of the South's railroads, farms, and cities in ruins.",
      ],
      "Victories in 1863 and the destruction of the South's means of fighting in 1864 led to Lee's surrender in 1865.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.9",
      title: "A war with a changing purpose",
      body: "As the fighting went on, the Union's purpose changed. Topic 5.9 follows the government policies that redefined the war.",
      transferQuestion:
        "Why was the Union's control of the border states important to its chances of winning the war?",
      feedback:
        "A strong answer notes that Maryland, Kentucky, and Missouri lay along the routes and rivers that the Union needed, held large populations and resources, and would have strengthened the Confederacy if they had left.",
      links: [
        {
          topicId: "apush-5-7",
          sectionId: "fort-sumter-and-the-upper-south",
          label: "Review the border states",
        },
      ],
    },
  ],
  sourceIds: [],
});

// Writing prompts for Unit 4. Saving and review behavior live in app/writing/.
// These are unit practice prompts (examOnly: false). Mock exams reuse prompts
// flagged examOnly: true, and Unit 4 has none yet.
import { excerpts } from "../excerpts.js";
import { leq, saq } from "../writing-kit.js";

export const writingQuizzes = [
  saq({
    id: "apush-4-saq-01",
    unitNumber: 4,
    number: 1,
    headline: "The Monroe Doctrine",
    stimulusBlocks: [excerpts.monroeDoctrine],
    sourceIds: ["ced", "monroe-1823"],
    learningObjectives: ["4.D"],
    keyConcepts: ["KC-4.3.I", "KC-4.3.I.A.ii"],
    themes: ["WOR", "GEO"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["WOR"],
        prompt:
          "Briefly describe ONE way the excerpt expresses the policy of the United States toward the European powers.",
        criteria: [
          "Identifies a policy stated in the excerpt, such as staying out of European wars or opposing European extension of political systems to the hemisphere.",
          "Uses the excerpt to show it, with more than a copied phrase.",
        ],
        model: {
          answer:
            "The excerpt expresses a policy of staying out of Europe's affairs while warning Europe to stay out of the Western Hemisphere.",
          prove:
            "Monroe says that the United States has “never taken any part” in the wars of the European powers, and that it would consider any attempt by them “to extend their system to any portion of this hemisphere as dangerous to our peace and safety.”",
          explain:
            "This shows a policy of separate spheres, in which the United States would avoid European conflicts and would oppose European intervention in the Americas.",
        },
        alternatives:
          "A response can also point to Monroe's statement that the United States will not interfere with existing European colonies, if it explains that the policy was aimed at new intervention and not at the colonies that already existed.",
        review: [
          {
            topicId: "apush-4-4",
            sectionId: "monroe-doctrine",
            label: "The Monroe Doctrine",
          },
        ],
      },
      {
        id: "b",
        lenses: ["WOR", "GEO"],
        prompt:
          "Briefly explain ONE specific historical development from the period 1810 to 1823 that contributed to the policy announced in the excerpt.",
        criteria: [
          "Names a specific development from 1810–1823.",
          "Explains how it led the United States to announce the policy.",
        ],
        model: {
          answer:
            "The independence of most of Spain's colonies in Latin America contributed to the policy.",
          prove:
            "Between about 1810 and 1822, Mexico, Colombia, Chile, Argentina, and other colonies won independence, and in 1822 the United States recognized several of the new nations, while the monarchies of Europe discussed restoring Spain's rule.",
          explain:
            "This created the risk of European intervention near the United States, so Monroe declared that the United States would oppose any such effort in order to protect its security and its trade.",
        },
        alternatives:
          "A response can also use Britain's proposal for a joint statement and John Quincy Adams's argument for acting alone, or the Adams–Onís Treaty of 1819, if it explains the connection to the policy.",
        review: [
          {
            topicId: "apush-4-4",
            sectionId: "monroe-doctrine",
            label: "The Monroe Doctrine",
          },
        ],
      },
      {
        id: "c",
        lenses: ["WOR", "GEO"],
        prompt:
          "Briefly explain ONE way, other than the policy in the excerpt, that the United States government sought to extend its influence or control in North America between 1800 and 1823.",
        criteria: [
          "Names a specific action by the federal government between 1800 and 1823.",
          "Explains how it extended American influence or control.",
        ],
        model: {
          answer:
            "The United States extended its control by acquiring Florida in the Adams–Onís Treaty of 1819.",
          prove:
            "Spain gave Florida to the United States and accepted a boundary that extended to the Pacific Ocean, which gave the United States a claim to the Pacific coast.",
          explain:
            "The treaty removed Spanish power from the southeastern border and extended American claims across the continent without a war.",
        },
        alternatives:
          "A response can also use the Louisiana Purchase of 1803, the Lewis and Clark expedition, the Convention of 1818 with Britain, or the War of 1812 and the defeat of Tecumseh's confederacy, if it explains how the action extended American influence.",
        review: [
          {
            topicId: "apush-4-4",
            sectionId: "diplomacy-and-borders",
            label: "Diplomacy and borders",
          },
        ],
      },
    ],
  }),
  saq({
    id: "apush-4-saq-02",
    unitNumber: 4,
    number: 2,
    headline: "The Declaration of Sentiments",
    stimulusBlocks: [excerpts.senecaSentiments],
    sourceIds: ["ced", "seneca-falls-1848"],
    learningObjectives: ["4.K"],
    keyConcepts: ["KC-4.1.III.C", "KC-4.1.III.A"],
    themes: ["SOC", "ARC", "PCE"],
    examOnly: false,
    parts: [
      {
        id: "a",
        lenses: ["SOC", "PCE"],
        prompt:
          "Briefly describe ONE way the excerpt reflects the ideals of the American Revolution.",
        criteria: [
          "Identifies language or an idea in the excerpt that comes from the American Revolution.",
          "Explains how the excerpt applies it to women.",
        ],
        model: {
          answer:
            "The excerpt reflects the ideals of the Revolution by applying the Declaration of Independence to women.",
          prove:
            "It begins, “We hold these truths to be self-evident: that all men and women are created equal,” and repeats the Declaration's claim that people are endowed with “life, liberty, and the pursuit of happiness.”",
          explain:
            "By using the founding language and adding “and women,” the authors argued that the principle of natural rights should apply to women as well.",
        },
        alternatives:
          "A response can also point to the list of grievances against “man,” which echoes the Declaration's list of injuries by the king, if it explains how the comparison portrays men as tyrants.",
        review: [
          {
            topicId: "apush-4-11",
            sectionId: "womens-rights",
            label: "The women's rights movement",
          },
        ],
      },
      {
        id: "b",
        lenses: ["ARC", "SOC"],
        prompt:
          "Briefly explain ONE way that another reform movement or religious development in the period 1800 to 1848 contributed to the movement for women's rights.",
        criteria: [
          "Names a specific reform movement or religious development from 1800–1848.",
          "Explains how it contributed to the women's rights movement.",
        ],
        model: {
          answer:
            "The abolitionist movement contributed to the movement for women's rights.",
          prove:
            "Women such as Lucretia Mott and Elizabeth Cady Stanton joined antislavery societies, and in 1840 they were denied seats at the World Anti-Slavery Convention in London because they were women.",
          explain:
            "The experience gave women skills in organizing and public speaking, and it showed them that they faced limits on their own rights, which led them to call the Seneca Falls Convention in 1848.",
        },
        alternatives:
          "A response can also use the Second Great Awakening, which encouraged women to take part in religious and reform societies, or the temperance movement, if it explains how it prepared women for public activism.",
        review: [
          {
            topicId: "apush-4-11",
            sectionId: "abolition-and-antislavery",
            label: "Abolitionism and antislavery movements",
          },
        ],
      },
      {
        id: "c",
        lenses: ["SOC", "ARC"],
        prompt:
          "Briefly explain ONE way that a reform movement other than women's rights sought to change American society between 1800 and 1848.",
        criteria: [
          "Names a specific reform movement from 1800–1848 other than women's rights.",
          "Explains how it tried to change American society or institutions.",
        ],
        model: {
          answer:
            "The temperance movement sought to change American society by reducing the use of alcohol.",
          prove:
            "The American Temperance Society, founded in 1826, organized a voluntary campaign that urged Americans to avoid drinking and blamed alcohol for poverty, violence, and family suffering.",
          explain:
            "The reformers worked outside of government to change individual behavior, in the belief that society would improve if people gave up drinking.",
        },
        alternatives:
          "A response can also use abolitionism, public school reform led by Horace Mann, reform of asylums and prisons led by Dorothea Dix, or utopian communities such as Brook Farm, if it explains how the movement sought to change society.",
        review: [
          {
            topicId: "apush-4-11",
            sectionId: "voluntary-organizations-and-reform",
            label: "Voluntary organizations and reform",
          },
        ],
      },
    ],
  }),
  leq({
    id: "apush-4-leq-identity",
    unitNumber: 4,
    headline: "Did economic change create a national identity?",
    context:
      "Between 1800 and 1848, canals, steamboats, railroads, and new machines transformed the American economy and the way that regions did business with each other.",
    task: "Evaluate the extent to which economic change promoted a sense of national identity in the United States in the period 1800 to 1848.",
    focusNote:
      "Your response may focus on any aspect of economic change, such as transportation, manufacturing, agriculture, or the cotton economy, and on any region or regions.",
    reasoning: "causation",
    sourceIds: ["ced"],
    topicId: "apush-4-14",
    outlineReview: {
      sectionId: "economics-and-society",
      label: "Review economic change as a cause of identity",
    },
    essayReview: {
      sectionId: "how-to-reason-about-causation",
      label: "Review how to reason about causation",
    },
    learningObjectives: ["4.N", "4.E"],
    keyConcepts: ["KC-4.2", "KC-4.2.I", "KC-4.2.III", "KC-4.2.III.B"],
    themes: ["WXT", "SOC", "NAT"],
    examOnly: false,
    modelResponse:
      "In 1800 most Americans lived on farms, traded mainly within their own regions, and looked first to their states for their identity. During the next five decades, canals, steamboats, railroads, and new machines created a national market economy, and Americans also argued about whether the federal government should help to build it.\n\nEconomic change promoted a sense of national identity to a moderate extent. It tied together the North and the Midwest and linked the South to national and international markets, but it also gave the regions different interests, and those differences, especially over slavery, limited the sense of a shared nation.\n\nEconomic change did bring Americans together. The Erie Canal (1825) lowered the cost of shipping Midwestern grain and livestock to New York City, and railroads such as the Baltimore and Ohio (1830) extended similar links. Midwestern farmers sold to Eastern buyers and bought Northern manufactured goods, so the North and Midwest became interdependent. Southern cotton, which spread rapidly after Eli Whitney's cotton gin of 1793, supplied New England mills as well as British ones, and Northern bankers, shippers, and insurers handled the trade, so the South was also bound to the national economy. Henry Clay's American System, with its tariff, national bank, and internal improvements, aimed to strengthen such ties, and in Gibbons v. Ogden (1824) the Supreme Court held that Congress could regulate commerce among the states. The telegraph (1844), which carried news and prices quickly over long distances, added to the sense that Americans belonged to the same nation.\n\nYet the same changes divided the country. The North developed factories, wage labor, and cities, while the South invested in land and enslaved laborers and exported staple crops. Canals and railroads tied the North and Midwest more closely to each other than to the South. These differences produced conflicting interests. Northern manufacturers favored the protective tariffs that Southerners blamed for higher prices, and in 1832 South Carolina declared the tariffs null and void. The cotton economy also drove planters, as soil wore out in the Southeast, to move enslaved people to new lands in the Deep South, which made slavery in the territories a more urgent question, as the Missouri Compromise of 1820 showed.\n\nEconomic forces were not the only influence on identity. Politics and foreign policy also shaped it. The War of 1812 and the Monroe Doctrine encouraged national pride, and the expansion of voting rights and the growth of party campaigns drew many white men into national politics. These influences may have done as much as economic change to create a shared identity among white Americans, but they, too, left out enslaved people, women, and Native nations, whom the market economy did not include as equals.\n\nIn sum, economic change gave Americans a national market and shared experiences, which promoted a national identity, but its uneven effects on the North and the South strengthened sectional loyalties, so its contribution to a single American identity was real but limited.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes a country of regional farm economies in 1800 and the arrival of a market economy, which places the question in context.",
      },
      {
        label: "Thesis",
        text: "The second paragraph makes a defensible claim about extent, that economic change promoted identity moderately, and names the reasons on both sides.",
      },
      {
        label: "Evidence",
        text: "The Erie Canal, the Baltimore and Ohio Railroad, the cotton gin, the American System, Gibbons v. Ogden, the telegraph, the Tariff dispute of 1832, and the Missouri Compromise are specific examples used to support the argument.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay explains how each change linked or divided regions, and the paragraph on politics and foreign policy qualifies the argument, which supports a complex understanding.",
      },
    ],
    alternateModel:
      "An essay could argue that economic change did more to divide than to unite, by focusing on the contrast between the Northern factory and wage economy and the Southern cotton and slave economy, and on the tariff and slavery disputes that followed. To earn the complexity point it could add a qualification, such as the fact that Southern cotton depended on Northern banks, shippers, and mills, which shows that the regions were also tied together.",
    commonErrors: [
      "Describing inventions such as the cotton gin and the telegraph without explaining how they affected national identity.",
      "Claiming that the economy united the country completely or divided it completely without evaluating the extent.",
      'Writing a thesis that only says the economy had "some effect" without a claim about how much and why.',
      "Using evidence from after 1848, such as the Civil War, or from before 1800, such as the first Bank of the United States alone.",
    ],
  }),
];

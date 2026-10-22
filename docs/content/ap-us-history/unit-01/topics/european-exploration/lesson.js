// Original Page One lesson for CED Topic 1.3.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("1.3", {
  summary:
    "Why Spain, Portugal, England, and France sent ships across the Atlantic: wealth, rivalry among monarchies, and the spread of Christianity.",
  minutes: 9,
  goals: [
    "Explain the economic, political, and religious causes of European exploration and conquest in the Americas.",
    "Describe how navigation technology and royal sponsorship made long Atlantic voyages possible.",
    "Explain how rivalry among European states shaped claims in the Americas.",
  ],
  bigIdea:
    "European monarchies sought wealth, advantages over rivals, and religious expansion at the same time. Those motives overlapped, and together they explain why exploration became conquest.",
  context:
    "The CED states one key concept for this topic: European efforts to explore and conquer the New World stemmed from a search for new sources of wealth, economic and military competition, and a desire to spread Christianity.",
  sections: [
    section(
      "wealth-and-routes",
      "Wealth, trade routes, and navigation",
      ["WOR", "WXT"],
      [
        "Spices, silk, and other Asian goods were valuable in Europe, and Italian merchants and Muslim intermediaries earned much of the profit. Rulers on the Atlantic edge of Europe wanted a share. Portugal sent ships down the African coast, and Bartolomeu Dias rounded the southern tip of Africa in 1488. Vasco da Gama reached India by sea in 1498.",
        "Spain's rulers, Ferdinand and Isabella, agreed in 1492 to fund Christopher Columbus's plan to reach Asia by sailing west. Columbus reached islands in the Caribbean instead. New ships and tools made such voyages possible. The caravel's triangular sails let it sail against the wind, and the magnetic compass and astrolabe helped sailors find direction and latitude.",
        [
          "Cause and effect",
          "Competition for trade with Asia led monarchs to pay for new routes, better ships made long voyages possible, and the voyages brought Europeans into contact with the Americas.",
        ],
      ],
      "The search for wealth and trade routes, aided by new ships and navigation tools, sent Europeans across the Atlantic.",
    ),
    section(
      "rivalry-among-monarchies",
      "Competition among European monarchies",
      ["WOR", "PCE"],
      [
        "Strong monarchies saw overseas wealth as a way to pay armies and gain power over rivals. Portugal and Spain moved first. Pope Alexander VI's 1493 decree and the Treaty of Tordesillas in 1494 drew a line that gave Spain most lands to the west and Portugal lands to the east, which later gave Portugal claim to Brazil.",
        "Other states ignored these agreements. England sponsored John Cabot's voyage to North America in 1497, and France sent Giovanni da Verrazzano in 1524 and Jacques Cartier in 1534. Each state claimed land by right of discovery, and each hoped to keep rivals from gaining the same wealth.",
        [
          "Common trap",
          "The treaty divided claims between two Catholic states. It did not stop France or England from sending their own expeditions.",
        ],
      ],
      "Rivalry pushed monarchies to claim territory quickly, and agreements between two states did not bind the others.",
    ),
    section(
      "spreading-christianity",
      "Religion as a motive",
      ["WOR", "ARC"],
      [
        "Many Europeans saw conquest and conversion as linked. Spain had just completed the Reconquista, the centuries-long Christian campaign against Muslim rule in Iberia, and its rulers carried that crusading spirit across the ocean. Catholic monarchs sent priests with soldiers, and they argued that they had a duty to convert the peoples they met.",
        "After the Protestant Reformation began in 1517, religion also sharpened rivalry. Protestant England and Catholic Spain became opponents, and promoters of colonies, such as Richard Hakluyt in his 1584 Discourse Concerning Western Planting, argued that English settlements could spread Protestant Christianity and weaken Spain. Wealth, rivalry, and faith were rarely separate motives.",
      ],
      "Religious goals strengthened the economic and political reasons for exploration and gave conquest a moral justification.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 1.4",
      title: "From voyages to exchange",
      body: "The voyages that these motives launched created the Columbian Exchange. Topic 1.4 explains what moved across the Atlantic and what happened to the societies that met.",
      transferQuestion:
        "Which motive for exploration, wealth, rivalry, or religion, do you think did most to turn exploration into conquest, and why?",
      feedback:
        "Take a position, give a specific example such as Spain after the Reconquista, and explain how your motive worked together with at least one other.",
      links: [
        {
          topicId: "apush-1-1",
          sectionId: "europe-africa-atlantic",
          label: "Review Europe, Africa, and the Atlantic",
        },
      ],
    },
  ],
  sourceIds: ["albert-apush-european-exploration", "fiveable-apush-unit-1"],
});

// Original Page One lesson for CED Topic 1.2.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("1.2", {
  summary:
    "How maize, aridity, mixed farming, and ocean resources shaped the economies and settlements of Native American societies across North America before 1491.",
  minutes: 10,
  goals: [
    "Identify the regional environments of North America and the ways of life Native societies developed in them.",
    "Explain how the spread of maize cultivation supported irrigation, settlement, and social diversification.",
    "Compare how societies in the Southwest, the Great Basin and Plains, the East, and the Pacific coast met their needs.",
  ],
  bigIdea:
    "Native societies did not share one way of life. Each adapted to its environment, and those adaptations produced very different economies, settlements, and social structures.",
  context:
    "Learning objective B asks how and why native populations interacted with their natural environment. The strongest answers tie a region to its resources and then to the way people organized their lives.",
  sections: [
    section(
      "maize-southwest",
      "Maize cultivation and the Southwest",
      ["GEO", "WXT"],
      [
        "Maize was first domesticated in what is now Mexico and spread north over centuries into the present-day American Southwest and beyond. Where farmers could water their fields, maize supported denser populations and permanent settlement.",
        "The Hohokam of present-day Arizona dug long irrigation canals to bring river water to desert fields. Ancestral Puebloan peoples built multistory stone and adobe towns, such as the great houses of Chaco Canyon, and their descendants lived in pueblos such as Acoma. Surplus food allowed some people to work as builders, traders, and religious leaders, a change historians call social diversification.",
        [
          "Cause and effect",
          "Maize spread north, farmers developed irrigation, harvests grew, and settlements and specialized roles followed. These societies stayed politically separate and never formed a single Southwest empire.",
        ],
      ],
      "Maize and irrigation supported settlement and social diversification in the Southwest, without creating one political system.",
    ),
    section(
      "mobile-west",
      "Mobile societies of the Great Basin and Great Plains",
      ["GEO", "MIG"],
      [
        "Much of the Great Basin is dry and offers little farmland. Shoshone, Paiute, and Ute families gathered seeds, pine nuts, and roots and hunted small game, moving in small groups with the seasons to follow scarce food.",
        "On the grasslands of the western Great Plains, many peoples hunted bison, which required following the herds. Before horses arrived with Europeans, hunters traveled on foot and used fire and drives to take bison. Some Plains peoples, such as the Mandan, lived in river valleys and farmed as well as hunted, a reminder that one region could hold more than one way of life.",
      ],
      "Aridity in the Great Basin and bison on the Plains led many societies to largely mobile lifestyles.",
    ),
    section(
      "eastern-woodlands",
      "Mixed economies in the Northeast, Mississippi Valley, and Atlantic seaboard",
      ["GEO", "SOC"],
      [
        "In the eastern woodlands and river valleys, many societies combined farming with hunting, fishing, and gathering. Maize, beans, and squash were grown together, and the food they supplied made permanent villages possible.",
        "Mississippian peoples built large mounds and the city of Cahokia, which depended on maize and on trade across a wide region. In the Northeast, the Haudenosaunee lived in villages of longhouses. Algonquian-speaking peoples such as the Lenape and the Secotan of the Roanoke area moved seasonally to fish and hunt but kept fixed villages and fields.",
        [
          "Common trap",
          "Mixed economies were not the same as mobile ones. These societies farmed and kept permanent villages even when families traveled to hunt or fish.",
        ],
      ],
      "A mix of farming, hunting, and gathering favored permanent villages in the East.",
    ),
    section(
      "pacific-coast",
      "The Northwest and California: ocean and river resources",
      ["GEO", "WXT"],
      [
        "Along the Northwest coast, peoples such as the Chinook and the Tlingit relied on salmon, whales, shellfish, and forest products. These reliable resources let them live in settled communities with large plank houses and a rich trade in goods.",
        "In California, many peoples, including the Chumash, supported dense populations without farming, relying on acorns, fish, and sea mammals. Neither region used maize, yet both developed settled and complex societies.",
      ],
      "Abundant ocean and river resources supported settled communities without agriculture.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Within Unit 1",
      title: "Environment and the first encounters",
      body: "The way each society used its environment affected how it traded, how it was governed, and how it met Europeans. Topic 1.6 returns to the differing worldviews that came from these ways of life.",
      transferQuestion:
        "Choose one region and explain how its environment shaped one part of how its people lived.",
      feedback:
        "A strong answer names a region, a specific resource or condition, and a way of life that resulted from it.",
      links: [
        {
          topicId: "apush-1-1",
          sectionId: "americas-before-1491",
          label: "Review the Americas before 1491",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-1"],
});

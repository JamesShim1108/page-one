// Original practice questions for Topic 1.2. q-numbered items are topic practice;
// t-numbered items belong to the Unit 1 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("1.2", [
  {
    id: "q01",
    s: "maize-southwest",
    sub: "1.B",
    kc: ["KC-1.1.I.A"],
    q: "Which of the following was an effect of the spread of maize cultivation into the present-day American Southwest?",
    right:
      "Irrigated farming supported larger permanent settlements and greater social diversification",
    at: 2,
    wrong: [
      [
        "Irrigated farming supported larger settlements, and the region's peoples united under one centralized empire",
        "Farming did support larger settlements, but Southwest societies stayed politically separate.",
      ],
      [
        "Farmers abandoned permanent settlements so that they could follow bison herds across the grasslands",
        "Maize farming encouraged settlement; following bison was a Plains way of life.",
      ],
      [
        "Farming ended the need for trade because each village could grow every resource it needed",
        "Southwest societies took part in trade networks, and surplus food supported traders.",
      ],
    ],
    why: "Where maize spread and could be irrigated, harvests grew, and societies built permanent settlements and developed specialized roles.",
    d: "Maize did support larger settlements, but the Hohokam and Pueblo peoples remained separate societies rather than one empire.",
  },
  {
    id: "q02",
    s: "mobile-west",
    sub: "1.B",
    kc: ["KC-1.1.I.B"],
    q: "Which of the following best explains why many Native societies in the Great Basin developed largely mobile lifestyles?",
    right:
      "The region's aridity limited farming, so groups moved seasonally to gather scarce food",
    at: 0,
    wrong: [
      [
        "Huge herds of bison covered the region's grasslands, so hunters followed the herds across long distances",
        "Bison herds shaped mobility on the Great Plains, but the Great Basin was dry and had few large herds.",
      ],
      [
        "Frequent flooding of the region's rivers destroyed villages, so families moved to higher ground each year",
        "The Great Basin was dry, not flood-prone, and its rivers did not drive repeated relocation.",
      ],
      [
        "Spanish explorers forced these communities to move away from the coast and into the interior",
        "These mobile lifestyles developed before European contact.",
      ],
    ],
    why: "Aridity in the Great Basin meant little farmland, so people moved with the seasons to find seeds, nuts, and small game.",
    d: "Mobility on the Plains came from following bison; in the Great Basin it came from aridity and scattered food.",
  },
  {
    id: "q03",
    s: "eastern-woodlands",
    sub: "1.A",
    kc: ["KC-1.1.I.C"],
    q: "Which of the following best describes the economies of many Native societies in the Northeast and along the Atlantic seaboard before 1491?",
    right:
      "A mix of farming with hunting, fishing, and gathering that supported permanent villages near fields",
    at: 3,
    wrong: [
      [
        "Large-scale irrigated agriculture that supported crowded cities governed by a single ruler",
        "Large irrigated farms were characteristic of the Southwest, not of the East.",
      ],
      [
        "Hunting and gathering only, with no use of crops and few lasting settlements in any season",
        "Many eastern peoples grew maize, beans, and squash and kept permanent villages.",
      ],
      [
        "Trade in ocean products such as salmon and whale oil, which replaced local farming entirely",
        "Salmon and whaling belong to the Pacific Northwest, and eastern societies farmed.",
      ],
    ],
    why: "Many eastern peoples combined farming with hunting, fishing, and gathering, and their food supply supported permanent villages.",
    d: "Irrigated agriculture was important in the Southwest, but eastern societies relied on rainfall-based farming mixed with hunting.",
  },
  {
    id: "q04",
    s: "eastern-woodlands",
    sub: "1.B",
    kc: ["KC-1.1.I.C"],
    q: "Which of the following best explains how many Eastern Woodlands societies could live in permanent villages while still hunting and fishing?",
    right:
      "Farming provided a dependable food supply, and seasonal hunting and fishing added to it",
    at: 1,
    wrong: [
      [
        "Trade with Spanish colonists provided steady food, so hunting was no longer necessary for survival",
        "This took place before European contact, so trade with colonists cannot explain it.",
      ],
      [
        "Hunting supplied almost all food, and villages were occupied only briefly each year during the winter",
        "Villages were permanent, and farming supplied a large share of food.",
      ],
      [
        "Irrigation canals watered large fields, which freed families from the need to fish or hunt at all",
        "Irrigation canals were a Southwest development, and eastern peoples still hunted and fished.",
      ],
    ],
    why: "Crops such as maize, beans, and squash gave a reliable base, and seasonal hunting and fishing supplemented it.",
    d: "Both explanations mention hunting, but only the correct one explains permanent villages through reliable farming that began before contact.",
  },
  {
    id: "q05",
    s: "pacific-coast",
    sub: "1.B",
    kc: ["KC-1.1.I.D"],
    q: "Settled communities developed in the Pacific Northwest primarily because",
    right:
      "abundant salmon, shellfish, and other ocean and river resources provided a reliable food supply",
    at: 2,
    wrong: [
      [
        "irrigation canals carried river water to large fields of maize that fed growing populations",
        "Irrigated maize farming belongs to the Southwest; Northwest peoples did not rely on maize.",
      ],
      [
        "Spanish missions introduced herding and farming, which ended the need for seasonal movement",
        "Settled communities existed there before Spanish missions.",
      ],
      [
        "bison herds moved through the region each year, which allowed hunters to build permanent camps",
        "Bison were a resource of the Great Plains, not of the Pacific coast.",
      ],
    ],
    why: "Reliable ocean and river resources let people settle in villages without farming.",
    d: "Irrigated maize also supported settlement, but in the Southwest; the Northwest relied on salmon and the ocean.",
  },
  {
    id: "q06",
    s: "maize-southwest",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-1.1.I.A", "KC-1.1.I.B"],
    q: "A comparison of the Southwest with the Great Basin before 1491 best supports which of the following conclusions?",
    right:
      "Different environments led Native societies to develop different economies and settlement patterns",
    at: 1,
    wrong: [
      [
        "Climate alone determined political organization, so societies in similar environments had identical governments",
        "Environment shaped economies and settlement, but it did not dictate political systems.",
      ],
      [
        "Societies that farmed maize were more advanced than societies that relied on gathering and hunting",
        "Mobile societies adapted successfully to their environments; the evidence does not rank them as less advanced.",
      ],
      [
        "All Native societies changed from mobile to settled life as farming spread north from Mexico",
        "Farming did not suit every environment, and many societies stayed mobile.",
      ],
    ],
    why: "The Southwest supported irrigation and settlement, while the Great Basin's dryness supported mobile gathering, showing that environment shaped economic choices.",
    d: "Environment did shape each society, but that does not mean it fixed their governments or ranked their levels of development.",
  },
  {
    id: "q07",
    s: "eastern-woodlands",
    sub: "4.A",
    kc: ["KC-1.1.I.C"],
    q: "Which of the following developments is most relevant context for the growth of the Mississippian city of Cahokia?",
    right:
      "The spread of maize cultivation, which supported denser populations and permanent settlements",
    at: 3,
    wrong: [
      [
        "The arrival of horses with Spanish explorers, which allowed hunters to follow bison over long distances",
        "Horses arrived with Europeans, after Cahokia had declined.",
      ],
      [
        "The Columbian Exchange, which brought new crops and animals that increased food supplies",
        "The Columbian Exchange began in 1492 and came after Cahokia's peak.",
      ],
      [
        "The founding of English colonies on the Atlantic coast, which created a demand for trade goods",
        "English colonies began well after Cahokia was in decline.",
      ],
    ],
    why: "Maize agriculture gave Mississippian farmers the surplus needed to build and sustain large towns and mounds.",
    d: "The other choices name real developments but all came after Cahokia's height, so only maize cultivation is context from before.",
  },
  {
    id: "q08",
    s: "pacific-coast",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-1.1.I.C", "KC-1.1.I.D"],
    q: "Which of the following was a similarity between Native societies of the Pacific Northwest and those of the Eastern Woodlands?",
    right:
      "Both developed permanent villages, although they relied on different sources of food",
    at: 0,
    wrong: [
      [
        "Both relied on maize as the main food source and supported their villages through irrigation canals",
        "Northwest peoples did not rely on maize, and eastern farmers did not use large irrigation canals.",
      ],
      [
        "Both lived as small mobile groups that traveled with the seasons and avoided building permanent homes",
        "Both regions had permanent villages, which is the key similarity.",
      ],
      [
        "Both were governed by a single confederation that coordinated trade between the two regions",
        "No such confederation joined the two regions.",
      ],
    ],
    why: "Northwest peoples settled around ocean and river resources, and eastern peoples around farming, but each lived in permanent villages.",
    d: "The two regions shared permanent villages but not a diet; the maize-and-irrigation choice mistakes eastern farming for Southwest farming and ignores salmon.",
  },
  {
    id: "t01",
    s: "maize-southwest",
    sub: "3.A",
    lo: "B",
    kc: ["KC-1.1.I"],
    q: "Which of the following best states the main idea of the passage?",
    right:
      "Native societies in North America developed varied ways of life by adapting to, and also changing, their environments",
    at: 2,
    wrong: [
      [
        "Native societies in North America shared one way of life based on farming, which spread from Mexico to every region",
        "The passage describes regional differences, including mobile and coastal societies that did not rely on farming.",
      ],
      [
        "Native societies in North America relied only on hunting and gathering until Europeans introduced farming to them",
        "The passage describes farming in several regions before 1491.",
      ],
      [
        "Native societies in North America changed little over time because they adjusted to their surroundings without altering them",
        "The passage says Native peoples also reshaped their environments.",
      ],
    ],
    why: "The passage describes different regional societies and then says they also reshaped their environments.",
    d: "The near miss treats maize farming as a single shared pattern, but the passage stresses variety.",
    stim: excerpts.originalNativeSocieties,
  },
  {
    id: "t02",
    s: "eastern-woodlands",
    sub: "3.B",
    lo: "B",
    kc: ["KC-1.1.I"],
    q: "Which detail from the passage best supports the claim that Native peoples transformed their environments?",
    right:
      "Farmers cleared and burned land, built irrigation systems, and carried crops from one region to another",
    at: 0,
    wrong: [
      [
        "Societies in the Northeast and the Mississippi River Valley combined farming with hunting and gathering and built permanent villages",
        "This shows how those societies made a living and settled; it does not describe changes they made to the land.",
      ],
      [
        "Groups on the Great Plains and in the Great Basin moved with the seasons to hunt, gather, and trade",
        "This is an example of adapting to a dry environment, not of changing it.",
      ],
      [
        "Communities along the Pacific Northwest coast lived well on fish and other resources of the ocean",
        "This is an example of using the environment, not of changing it.",
      ],
    ],
    why: "Clearing and burning land, building irrigation systems, and moving crops are changes Native peoples made to their surroundings.",
    d: "Permanent villages show settled life, but only the clearing, burning, and irrigation described in the last sentence show changes to the land itself.",
    stim: excerpts.originalNativeSocieties,
  },
  {
    id: "t03",
    s: "maize-southwest",
    sub: "5.B",
    r: "causation",
    lo: "B",
    kc: ["KC-1.1.I.A"],
    q: "Which of the following developments most directly made possible the farming villages and irrigation described for the Southwest?",
    right:
      "The spread of maize cultivation northward from present-day Mexico into the American Southwest",
    at: 1,
    wrong: [
      [
        "The adoption of the horse, which let groups hunt bison across wide areas of the Plains",
        "The horse reached Native peoples after 1492, and it affected the Plains, not Southwest farming.",
      ],
      [
        "The arrival of Spanish settlers who introduced wheat and livestock to the region",
        "Southwest farming and irrigation began long before Spanish settlers arrived.",
      ],
      [
        "The growth of fishing communities along the Pacific Northwest coast, which supplied the Southwest with food",
        "The passage describes the Pacific Northwest as a separate region that did not rely on farming.",
      ],
    ],
    why: "The passage says maize spread from present-day Mexico and supported farming villages and irrigation in the Southwest.",
    d: "The horse transformed some Native societies, but it arrived after contact and did not cause Southwest farming.",
    stim: excerpts.originalNativeSocieties,
  },
]);

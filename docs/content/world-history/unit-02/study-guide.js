import {
  networks,
  places,
  connections,
  seasonalExamples,
  saharaPlans,
  comparisonPrompts,
  mapSource,
} from "./network-data.js";
import { activities } from "./practice-activities.js";
export const guide = {
  title: "Unit 2 study guide",
  headline: "Networks of Exchange. Connect the routes.",
  essential:
    "How did networks of exchange change economies, states, cultures, and environments from c. 1200 to c. 1450?",
  overview:
    "Between c. 1200 and c. 1450, older Afro-Eurasian exchange networks intensified without becoming one unified system. Demand for luxury and everyday goods encouraged production, while caravan services, credit, ports, ships, camel logistics, and state policy changed what movement was practical. The Mongol Empire connected large overland regions through conquest and administration, yet local experiences ranged from facilitated travel to destruction and coercion. Indian Ocean sailors used seasonal winds and maritime technology, and port communities turned repeated voyages into diasporas and cultural adaptation. Trans-Saharan routes linked desert logistics to West African production, taxation, pilgrimage, and scholarship. Connectivity moved crops, knowledge, religions, people, animals, and pathogens. Those consequences were uneven: a crop could widen food possibilities while disease or intensified land use created serious costs. The unit’s networks overlapped, and the most defensible arguments explain both shared pressures and differences in geography, power, and community agency.",
  timeline: [
    {
      date: "Before 1200",
      text: "Older Silk Roads, Indian Ocean routes, Saharan crossings, farming systems, and religious networks created the foundations later intensified.",
    },
    {
      date: "1206",
      text: "Temüjin was recognized as Chinggis Khan, beginning the political consolidation that launched Mongol expansion.",
    },
    {
      date: "1200s",
      text: "Mali expanded in West Africa; the Delhi Sultanate began in 1206; Mongol conquests reshaped Eurasian politics and routes.",
    },
    {
      date: "1258",
      text: "The Mongols captured Baghdad. Political change did not end Islamic scholarship or cultural exchange across the region.",
    },
    {
      date: "1279",
      text: "The Mongol Yuan dynasty completed the conquest of the Southern Song, bringing China under Mongol rule.",
    },
    {
      date: "1324–1325",
      text: "Mansa Musa made a pilgrimage to Mecca that displayed Mali’s wealth and strengthened its wider Islamic connections.",
    },
    {
      date: "1330s–1350s",
      text: "Bubonic plague spread through connected regions, causing severe and uneven demographic consequences.",
    },
    {
      date: "1368",
      text: "The Ming replaced the Yuan in China, illustrating political change within the same wider exchange era before the later Zheng He expeditions.",
    },
    {
      date: "1405–1433",
      text: "Zheng He led Ming maritime expeditions across the Indian Ocean as state-sponsored diplomacy and display.",
    },
    {
      date: "1450 boundary",
      text: "The unit ends before the major European maritime expansion of the later fifteenth century; later developments are context, not Unit 2 evidence.",
    },
  ],
  comparisons: {
    caption: "Three exchange networks, compared by the same dimensions",
    columns: ["Dimension", "Silk Roads", "Indian Ocean", "Trans-Saharan"],
    rows: [
      [
        "Geography",
        "Deserts, mountains, oases, and river valleys across Eurasia",
        "Seasonal ocean winds linking coastal and island ports",
        "Sahara crossings connected to oases, rivers, and West African cities",
      ],
      [
        "Transport and environment",
        "Caravans, camel saddles, caravanserai, and relay exchange",
        "Dhows, junks, sails, rudders, compass, astrolabe, and monsoon timing",
        "Camels, load-bearing saddles, caravans, guides, and water planning",
      ],
      [
        "Representative goods",
        "Silk, porcelain, textiles, paper, horses, and spices",
        "Cotton, pepper, spices, porcelain, silk, gold, ivory, and other products",
        "Gold, salt, textiles, horses, books, ivory, and enslaved people",
      ],
      [
        "State involvement",
        "Protection and administration by empires and regional rulers",
        "Port fees, customs, navies, and strategic passages",
        "Taxation, route protection, and expansion by states such as Mali",
      ],
      [
        "Cultural consequences",
        "Religious, scientific, technological, and urban exchange",
        "Diasporas, intermarriage, Islam, languages, and port cultures",
        "Islamic learning, pilgrimage, scholarship, and local adaptation",
      ],
      [
        "Environmental consequences",
        "Crops, pathogens, and pressure from intensified movement",
        "Crop movement, disease exposure, and coastal settlement",
        "Desert logistics, resource exchange, and biological movement",
      ],
    ],
  },
  pitfalls: [
    "The Silk Roads were a connected set of routes, not one uninterrupted road traveled by every merchant.",
    "Mongol political fragmentation into khanates did not immediately end exchange or communication.",
    "The Indian Ocean network depended on monsoon timing and local maritime expertise, not a single technology.",
    "Mali’s wealth came from trade and agriculture; Mansa Musa did not introduce Islam to West Africa for the first time.",
    "A traveler’s account provides situated evidence, not an automatic description of every community.",
    "Crop diffusion can increase food possibilities while disease and land pressure create serious costs.",
    "A comparison needs a shared dimension and reasoning, not three disconnected facts.",
    "The networks overlapped. Do not treat them as sealed compartments.",
    "Do not use later Portuguese expansion or the Columbian Exchange as causes of developments inside 1200–1450.",
    "Avoid unsupported precise epidemic totals, universal claims about regional immunity, or simplistic one-cause explanations.",
  ],
  causalChains: [
    {
      title: "Commercial practices → trade",
      steps: [
        "Demand and production created an incentive to move goods.",
        "Caravanserai, credit, and relay exchange reduced some travel or payment problems.",
        "More regular movement strengthened markets and specialized production while leaving costs and risks uneven.",
      ],
    },
    {
      title: "Trade ↔ state power",
      steps: [
        "States taxed, protected, or redirected routes.",
        "Revenue and information could strengthen political authority.",
        "Rulers still depended on merchants, guides, sailors, farmers, and artisans to make networks work.",
      ],
    },
    {
      title: "Seasonal travel → diaspora",
      steps: [
        "Monsoon scheduling required waiting, repair, and resupply in ports.",
        "Repeated contact encouraged merchant communities, intermarriage, and shared trust.",
        "Local societies adapted cultural practices in two directions rather than becoming identical.",
      ],
    },
    {
      title: "Biological exchange → differentiated consequences",
      steps: [
        "Mobility moved crops, animals, people, and pathogens.",
        "Local ecology, institutions, and social power shaped what happened next.",
        "Food possibilities, disease exposure, labor changes, and land pressure varied by region and group.",
      ],
    },
  ],
  evidenceGuide: [
    {
      id: "e1",
      whereWhen: "Kashgar and Samarkand, c. 1200–1450",
      claim: "Overland networks depended on nodes and relay exchange.",
      limitation: "A city’s importance does not prove it controlled every route.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
      review: {
        topicId: "world-2-1",
        sectionId: "network-geography",
        label: "Review Silk Roads geography",
      },
    },
    {
      id: "e2",
      whereWhen: "Chinese production centers, c. 1200–1450",
      claim: "Demand and specialized production reinforced exchange.",
      limitation: "Production varied by region and was not modern factory production.",
      sourceIds: ["amsco-unit-2", "class-tang-song-mongols"],
      review: {
        topicId: "world-2-1",
        sectionId: "cities-production",
        label: "Review cities and production",
      },
    },
    {
      id: "e3",
      whereWhen: "Mongol khanates and Yuan China, 1206–1368",
      claim: "Conquest and administration could facilitate some interregional movement.",
      limitation:
        "Security was uneven and built through coercion; routes predated Mongol rule.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      review: {
        topicId: "world-2-2",
        sectionId: "trade-communication",
        label: "Review Mongol exchange",
      },
    },
    {
      id: "e4",
      whereWhen: "Mongol cultural administration, 1200s–1300s",
      claim: "Knowledge transfer involved adoption and adaptation.",
      limitation:
        "Diffusion does not prove a single society invented every related practice.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-2"],
      review: {
        topicId: "world-2-2",
        sectionId: "cultural-transfer",
        label: "Review cultural transfer",
      },
    },
    {
      id: "e5",
      whereWhen: "Indian Ocean ports, c. 1200–1450",
      claim: "Monsoon knowledge and technology made seasonal exchange more predictable.",
      limitation:
        "Wind patterns varied by location; no single arrow describes the whole ocean.",
      sourceIds: ["amsco-unit-2", "class-indian-ocean"],
      review: {
        topicId: "world-2-3",
        sectionId: "monsoon-navigation",
        label: "Review monsoon navigation",
      },
    },
    {
      id: "e6",
      whereWhen: "Kilwa, Mombasa, Calicut, and Malacca, c. 1200–1450",
      claim:
        "Ports connected maritime commerce to interior production and diaspora life.",
      limitation: "No one port or empire ruled the entire ocean.",
      sourceIds: ["amsco-unit-2", "class-indian-ocean"],
      review: {
        topicId: "world-2-3",
        sectionId: "states-revenue",
        label: "Review port states",
      },
    },
    {
      id: "e7",
      whereWhen: "Sahara and Sahel, c. 1200–1450",
      claim: "Camel logistics and oasis knowledge made desert exchange possible.",
      limitation: "Caravans still faced water, security, and political constraints.",
      sourceIds: ["amsco-unit-2", "class-trans-saharan"],
      review: {
        topicId: "world-2-4",
        sectionId: "desert-logistics",
        label: "Review desert logistics",
      },
    },
    {
      id: "e8",
      whereWhen: "Mali and Mansa Musa’s pilgrimage, 1300s",
      claim: "Trade revenue and patronage connected state power to Islamic scholarship.",
      limitation: "Mansa Musa did not introduce Islam to West Africa for the first time.",
      sourceIds: ["amsco-unit-2", "class-trans-saharan"],
      review: {
        topicId: "world-2-4",
        sectionId: "musa-learning",
        label: "Review pilgrimage and patronage",
      },
    },
    {
      id: "e9",
      whereWhen: "Traveler accounts in the period",
      claim: "Accounts can reveal encounters, priorities, and judgments.",
      limitation:
        "A traveler is not representative of every community and may be mediated by scribes or translators.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      review: {
        topicId: "world-2-5",
        sectionId: "travelers-sourcing",
        label: "Review sourcing",
      },
    },
    {
      id: "e10",
      whereWhen: "Religious and scientific exchange, c. 1200–1450",
      claim: "Connectivity moved ideas through people and institutions.",
      limitation:
        "Diffusion often produced local adaptation rather than uniform conversion.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
      review: {
        topicId: "world-2-5",
        sectionId: "diffusion-not-uniformity",
        label: "Review adaptation",
      },
    },
    {
      id: "e11",
      whereWhen: "Champa rice, bananas, and citrus, c. 1200–1450",
      claim:
        "Crop movement could support food possibilities and settlement in suitable settings.",
      limitation:
        "Crop effects depended on ecology, farming practice, labor, and institutions.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-6"],
      review: {
        topicId: "world-2-6",
        sectionId: "crop-movement",
        label: "Review crop movement",
      },
    },
    {
      id: "e12",
      whereWhen: "Connected regions during plague outbreaks, 1300s–1400s",
      claim:
        "Mobility created pathways for pathogens and differentiated demographic effects.",
      limitation:
        "Exact origins, routes, and regional totals require careful corroboration.",
      sourceIds: ["amsco-unit-2", "ced-topic-2-6"],
      review: {
        topicId: "world-2-6",
        sectionId: "pathogen-networks",
        label: "Review pathogen networks",
      },
    },
  ],
  unit1Bridge:
    "Unit 1 supplies the agricultural, commercial, religious, political, and scholarly foundations that Unit 2 networks intensified. The chronology overlaps: Unit 2 is not a wholly separate world that begins after Unit 1 ends.",
  laterCallout:
    "Looking ahead: later European maritime expansion after 1450 changed the scale and power of oceanic exchange. It is a later contrast, not evidence for causes inside this unit.",
  definitionCoverage: {
    status: "required",
    conceptIds: [
      "world-2-caravanserai",
      "world-2-credit",
      "world-2-khanate",
      "world-2-monsoon",
      "world-2-diaspora",
      "world-2-taxation",
      "world-2-crop-diffusion",
      "world-2-pathogens",
      "world-2-commercial-practice",
      "world-2-state-involvement",
    ],
  },
  sourceIds: [
    "ced",
    "exam",
    "amsco-unit-2",
    "amsco-unit-1",
    "class-tang-song-mongols",
    "class-indian-ocean",
    "class-trans-saharan",
    "natural-earth-populated-places",
  ],
  networkData: {
    networks,
    places,
    connections,
    seasonalExamples,
    saharaPlans,
    comparisonPrompts,
    mapSource,
  },
  activities,
};

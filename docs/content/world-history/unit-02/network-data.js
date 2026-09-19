export const mapSource = {
  sourceIds: ["natural-earth-populated-places"],
  label: "Approximate modern coordinates adapted from Natural Earth populated places",
  note: "The SVG is an orientation diagram. It has no modern political borders and does not claim that every line operated unchanged throughout 1200–1450.",
};

export const networks = [
  {
    id: "silk-roads",
    label: "Silk Roads",
    sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
    dimensions: {
      geography:
        "Connected routes through Central Asia, deserts, mountain passes, river valleys, and cities; the category is a network rather than one road.",
      transportEnvironment:
        "Caravans, camel saddles, relay exchange, oasis services, and local route knowledge made difficult land travel possible.",
      representativeGoods:
        "Silk, porcelain, textiles, paper, horses, spices, and other high-value or regionally specialized goods.",
      commercialPractices:
        "Caravanserai, credit, bills of exchange, and currency reduced some carrying, timing, and transaction problems.",
      stateInvolvement:
        "States protected, taxed, administered, or redirected routes unevenly; no single empire controlled the whole network throughout the period.",
      tradingCities:
        "Kashgar, Samarkand, and other nodes supplied water, markets, crafts, information, and cultural institutions.",
      culturalConsequences:
        "Religions, technologies, scientific knowledge, languages, and urban practices moved through merchants, scholars, and officials.",
      environmentalConsequences:
        "Crops, animals, pathogens, and intensified movement altered societies in varied ways; risks and benefits were uneven.",
    },
  },
  {
    id: "indian-ocean",
    label: "Indian Ocean",
    sourceIds: ["amsco-unit-2", "ced-topic-2-3", "class-indian-ocean"],
    dimensions: {
      geography:
        "Seasonal sea routes linked East Africa, Arabia, Persia, South Asia, Southeast Asia, and China through coastal and island ports.",
      transportEnvironment:
        "Sailors combined monsoon timing, local currents, ship design, sails, rudders, compasses, astrolabes, and pilot expertise.",
      representativeGoods:
        "Cotton textiles, pepper, spices, porcelain, silk, gold, ivory, and other products from coastal and interior regions.",
      commercialPractices:
        "Port markets, merchant partnerships, credit, customs, and diaspora trust supported repeated seasonal voyages.",
      stateInvolvement:
        "Swahili cities, Gujarat, Malacca, and other states gained revenue and influence through ports, protection, and strategic passages.",
      tradingCities:
        "Kilwa, Mombasa, Hormuz, Calicut, Malacca, and Hangzhou connected maritime exchange to interior production and consumption.",
      culturalConsequences:
        "Diasporas, intermarriage, Islam, languages, and material culture developed through two-way contact and local adaptation.",
      environmentalConsequences:
        "Crops, disease exposure, coastal settlement, and resource demand moved through routes whose local effects varied.",
    },
  },
  {
    id: "trans-saharan",
    label: "Trans-Saharan",
    sourceIds: ["amsco-unit-2", "ced-topic-2-4", "class-trans-saharan"],
    dimensions: {
      geography:
        "Desert crossings linked North African markets, oasis settlements, Sahel communities, and West African cities.",
      transportEnvironment:
        "Camels, load-bearing saddles, caravans, guides, water planning, oasis stops, and security knowledge structured movement.",
      representativeGoods:
        "Gold, salt, textiles, horses, books, ivory, and other goods moved through multiple intermediaries; people were also subjected to coercive trafficking.",
      commercialPractices:
        "Relay exchange, brokerage, taxation, credit, and market services connected desert logistics to regional production.",
      stateInvolvement:
        "Mali and other states used taxation, protection, political expansion, and patronage to shape exchange while relying on communities and specialists.",
      tradingCities:
        "Taghaza, Walata, Timbuktu, Gao, and a verified North African endpoint connected resources, scholarship, and markets.",
      culturalConsequences:
        "Islamic learning, pilgrimage, scholarship, languages, and local traditions interacted without producing uniform conversion or culture.",
      environmentalConsequences:
        "Desert logistics and biological movement shaped where exchange could occur; water, animals, and land use remained limiting conditions.",
    },
  },
];

export const places = [
  {
    id: "kashgar",
    name: "Kashgar",
    networks: ["silk-roads"],
    region: "Central Asia",
    role: "Overland node near oasis and mountain routes; merchants exchanged goods, information, and services here.",
    exchanges: "Textiles, horses, paper, porcelain, food, and relay services.",
    coordinates: { latitude: 39.47, longitude: 75.99 },
    sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
    topicId: "world-2-1",
    sectionId: "network-geography",
  },
  {
    id: "samarkand",
    name: "Samarkand",
    networks: ["silk-roads"],
    region: "Central Asia",
    role: "Central Asian city where routes, artisans, markets, scholars, and political authorities intersected.",
    exchanges: "Luxury goods, craft production, knowledge, and caravan services.",
    coordinates: { latitude: 39.65, longitude: 66.96 },
    sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
    topicId: "world-2-1",
    sectionId: "cities-production",
  },
  {
    id: "hangzhou",
    name: "Hangzhou",
    networks: ["silk-roads", "indian-ocean"],
    region: "East Asia",
    role: "Chinese production and market center linked to inland and maritime commerce; not an oasis.",
    exchanges: "Silk, porcelain, iron and steel goods, grain, and maritime cargo.",
    coordinates: { latitude: 30.25, longitude: 120.17 },
    sourceIds: ["amsco-unit-2", "class-tang-song-mongols"],
    topicId: "world-2-3",
    sectionId: "ports-products",
  },
  {
    id: "hormuz",
    name: "Hormuz",
    networks: ["indian-ocean"],
    region: "Persian Gulf",
    role: "Strategic port connecting Gulf shipping, coastal routes, and inland markets.",
    exchanges: "Spices, textiles, horses, metals, and port services.",
    coordinates: { latitude: 27.07, longitude: 56.46 },
    sourceIds: ["amsco-unit-2", "class-indian-ocean"],
    topicId: "world-2-3",
    sectionId: "ports-products",
  },
  {
    id: "calicut",
    name: "Calicut",
    networks: ["indian-ocean"],
    region: "South Asia",
    role: "Indian port where monsoon schedules, merchants, and regional production met.",
    exchanges: "Pepper, cotton textiles, porcelain, and merchant credit.",
    coordinates: { latitude: 11.25, longitude: 75.78 },
    sourceIds: ["amsco-unit-2", "class-indian-ocean"],
    topicId: "world-2-3",
    sectionId: "ports-products",
  },
  {
    id: "malacca",
    name: "Malacca",
    networks: ["indian-ocean"],
    region: "Southeast Asia",
    role: "Strategic strait and port where ships waited, resupplied, and exchanged goods and information.",
    exchanges: "Spices, textiles, porcelain, food, and customs revenue.",
    coordinates: { latitude: 2.19, longitude: 102.25 },
    sourceIds: ["amsco-unit-2", "ced-topic-2-3", "class-indian-ocean"],
    topicId: "world-2-3",
    sectionId: "states-revenue",
  },
  {
    id: "kilwa",
    name: "Kilwa",
    networks: ["indian-ocean", "trans-saharan"],
    region: "East Africa",
    role: "Swahili coastal city connecting maritime commerce with inland production and gold routes.",
    exchanges: "Gold, ivory, textiles, beads, and maritime services.",
    coordinates: { latitude: -9.0, longitude: 39.65 },
    sourceIds: ["amsco-unit-2", "class-indian-ocean"],
    topicId: "world-2-3",
    sectionId: "ports-products",
  },
  {
    id: "mombasa",
    name: "Mombasa",
    networks: ["indian-ocean"],
    region: "East Africa",
    role: "Swahili port where local communities, merchants, and seasonal shipping interacted.",
    exchanges: "Ivory, gold, food, textiles, and cultural practices.",
    coordinates: { latitude: -4.05, longitude: 39.67 },
    sourceIds: ["amsco-unit-2", "class-indian-ocean"],
    topicId: "world-2-3",
    sectionId: "diaspora-communities",
  },
  {
    id: "taghaza",
    name: "Taghaza",
    networks: ["trans-saharan"],
    region: "Sahara",
    role: "Salt-producing settlement that supplied a major desert exchange network.",
    exchanges: "Salt, caravan services, and connections to Sahel markets.",
    coordinates: { latitude: 23.14, longitude: -8.8 },
    sourceIds: ["amsco-unit-2", "class-trans-saharan"],
    topicId: "world-2-4",
    sectionId: "goods-intermediaries",
  },
  {
    id: "walata",
    name: "Walata",
    networks: ["trans-saharan"],
    region: "Sahel",
    role: "Sahelian node where caravans, local producers, and intermediaries connected desert and West African routes.",
    exchanges: "Gold, salt, textiles, food, books, and brokerage.",
    coordinates: { latitude: 17.3, longitude: -9.55 },
    sourceIds: ["amsco-unit-2", "class-trans-saharan"],
    topicId: "world-2-4",
    sectionId: "desert-logistics",
  },
  {
    id: "timbuktu",
    name: "Timbuktu",
    networks: ["trans-saharan"],
    region: "West Africa",
    role: "Niger-region city associated with commerce, scholarship, and political patronage.",
    exchanges: "Gold, salt, books, scholarship, and market services.",
    coordinates: { latitude: 16.77, longitude: -3.0 },
    sourceIds: ["amsco-unit-2", "class-trans-saharan"],
    topicId: "world-2-4",
    sectionId: "musa-learning",
  },
  {
    id: "gao",
    name: "Gao",
    networks: ["trans-saharan"],
    region: "West Africa",
    role: "Niger-region political and commercial center linked to desert and riverine routes.",
    exchanges: "Gold, salt, agricultural products, textiles, and political revenue.",
    coordinates: { latitude: 16.27, longitude: -0.05 },
    sourceIds: ["amsco-unit-2", "class-trans-saharan"],
    topicId: "world-2-4",
    sectionId: "mali-state-trade",
  },
  {
    id: "tunis",
    name: "Tunis",
    networks: ["trans-saharan"],
    region: "North Africa",
    role: "North African endpoint and market connecting Mediterranean and Saharan exchange; routes and political control varied over time.",
    exchanges: "Gold, salt, textiles, books, and Mediterranean market connections.",
    coordinates: { latitude: 36.81, longitude: 10.18 },
    sourceIds: ["amsco-unit-2", "class-trans-saharan"],
    topicId: "world-2-4",
    sectionId: "accounts-local-life",
  },
];

export const connections = [
  ["kashgar", "samarkand"],
  ["samarkand", "hangzhou"],
  ["hangzhou", "hormuz"],
  ["hormuz", "calicut"],
  ["calicut", "malacca"],
  ["malacca", "kilwa"],
  ["kilwa", "mombasa"],
  ["taghaza", "walata"],
  ["walata", "timbuktu"],
  ["timbuktu", "gao"],
  ["gao", "tunis"],
  ["kilwa", "gao"],
];

export const seasonalExamples = [
  {
    id: "calicut-malacca",
    label: "Calicut to Malacca",
    outwardSeason:
      "Use the favorable monsoon season for an eastward voyage; exact departure timing varied by local winds and route.",
    returnSeason: "Wait for the seasonal reversal before planning the return westward.",
    feedback:
      "The key historical point is scheduling around seasonal winds and using port communities for waiting, repair, supplies, and exchange. Do not treat one local wind pattern as universal across the ocean.",
    sourceIds: ["amsco-unit-2", "class-indian-ocean"],
  },
];

export const saharaPlans = [
  {
    id: "oasis-first",
    label: "Plan around water and intermediaries",
    choice:
      "Use known oasis stops, a guide with local route expertise, and a cargo plan that leaves capacity for water and supplies.",
    feedback:
      "This plan fits desert logistics: water, animals, guides, and security are constraints. It does not guarantee safety or remove unequal power.",
  },
  {
    id: "cargo-first",
    label: "Maximize cargo and improvise stops",
    choice:
      "Carry as much cargo as possible and assume every settlement can supply water and protection.",
    feedback:
      "This plan ignores the environmental and political limits that made oasis knowledge, intermediaries, and caravan organization essential.",
  },
];

export const comparisonPrompts = [
  {
    id: "compare-transport",
    prompt:
      "How did geography produce different transport and scheduling choices in two networks?",
    model:
      "A defensible comparison pairs a shared dimension with evidence from both networks and explains why the environment changed the solution.",
  },
  {
    id: "compare-state",
    prompt: "How did states gain from exchange while depending on non-state specialists?",
    model:
      "A strong answer distinguishes taxation or protection from the work of merchants, sailors, guides, producers, and communities.",
  },
  {
    id: "compare-consequences",
    prompt:
      "How could connectivity create both cultural opportunity and environmental risk?",
    model:
      "Use one cultural and one environmental example, then qualify the claim by region, group, or mechanism.",
  },
];

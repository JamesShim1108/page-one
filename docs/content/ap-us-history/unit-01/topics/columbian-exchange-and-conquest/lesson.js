// Original Page One lesson for CED Topic 1.4.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("1.4", {
  summary:
    "What crossed the Atlantic after 1492, how epidemics and alliances made Spanish conquest possible, and how American silver and new business methods changed Europe's economy.",
  minutes: 11,
  goals: [
    "Explain the causes of the Columbian Exchange and its effects on Europe and the Americas.",
    "Explain how epidemics, Indigenous alliances, and Spanish weapons contributed to the conquest of the Aztec and Inca empires.",
    "Explain how American silver, new crops, and joint-stock companies helped change Europe's economy.",
  ],
  bigIdea:
    "The Columbian Exchange moved crops, animals, and diseases between hemispheres. It strengthened European economies while devastating Native populations, and it made Spanish conquest possible.",
  context:
    "This topic asks you to read claims about the Exchange and conquest. When you meet a source, ask what it claims, what evidence supports the claim, and what other factors it leaves out.",
  sections: [
    section(
      "columbian-exchange",
      "What crossed the Atlantic",
      ["GEO", "WXT"],
      [
        "The Columbian Exchange was the movement of plants, animals, diseases, and people between the Eastern and Western Hemispheres that followed Columbus's voyages beginning in 1492. From the Americas came maize, potatoes, tomatoes, beans, cacao, and tobacco. From the Old World came wheat, sugar cane, horses, pigs, cattle, and sheep, along with diseases such as smallpox, measles, and influenza.",
        "Potatoes and maize gave European farmers more food from the same land, which stimulated population growth. In the Americas, livestock changed how land was used, and wandering cattle and pigs sometimes damaged Native fields. Horses would later transform life for peoples of the Great Plains.",
        [
          "Cause and effect",
          "Voyages carried crops to Europe, and Europe's food supply and population grew. Voyages also carried diseases to the Americas, and Native populations fell sharply.",
        ],
      ],
      "The Exchange changed both hemispheres, but it did not affect them equally.",
    ),
    section(
      "epidemics-and-conquest",
      "Epidemics and Spanish conquest",
      ["GEO", "WOR"],
      [
        "Native peoples had no earlier exposure to Old World diseases, so epidemics spread quickly. In many regions most of the population died within a few generations. These losses weakened Native societies and made conquest easier.",
        "In 1519 Hernán Cortés landed in Mexico with several hundred Spaniards, horses, and steel weapons. He won allies, such as the Tlaxcalans, who resented Aztec tribute demands. Smallpox struck Tenochtitlan in 1520, and the city fell in 1521. In the 1530s Francisco Pizarro conquered the Inca Empire, which had been weakened by disease and a civil war.",
        "Spanish expeditions also reached what is now the United States. Ponce de León sailed to Florida in 1513, Hernando de Soto crossed the Southeast in 1539–1542, and Francisco Vázquez de Coronado explored the Southwest in 1540–1542. In 1565 Spain founded St. Augustine in Florida, the oldest continuously occupied European settlement in the continental United States.",
        [
          "Common trap",
          "Disease did not make conquest automatic. Spanish victories also depended on Indigenous allies, divisions among Native states, and Spanish weapons and horses.",
        ],
      ],
      "Epidemics, Indigenous allies, and Spanish weapons together explain the fall of the Aztec and Inca empires.",
    ),
    section(
      "silver-and-trade",
      "Silver, trade, and a changing European economy",
      ["WXT", "WOR"],
      [
        "Spanish colonists found rich silver deposits at Potosí in the Andes, beginning in 1545, and at Zacatecas in Mexico. Silver flowed to Spain and then across Europe and to Asia, financing armies and expanding trade.",
        "New methods of doing business spread too. Joint-stock companies let investors pool money for risky overseas ventures and share profits. Along with American crops and mineral wealth, these changes helped drive Europe's shift from feudalism, an economy built on land and obligations between lords and peasants, toward capitalism, an economy built on markets, money, and investment. The shift was gradual and uneven.",
      ],
      "American silver and new business methods helped move Europe toward a market economy.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Within Unit 1",
      title: "Conquest creates a new labor system",
      body: "Conquest gave Spain control of land and Native workers. Topic 1.5 explains how the encomienda, African slavery, and the caste system organized work and society in the Spanish empire.",
      transferQuestion:
        "How did the decline of Native populations after epidemics affect the labor systems Spain created?",
      feedback:
        "A strong answer links population loss to labor shortages and then to the turn toward enslaved Africans.",
      links: [
        {
          topicId: "apush-1-3",
          sectionId: "wealth-and-routes",
          label: "Review wealth, trade routes, and navigation",
        },
      ],
    },
  ],
  sourceIds: ["albert-apush-columbian-exchange", "fiveable-apush-unit-1"],
});

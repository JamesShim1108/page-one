// Original Page One lesson for CED Topic 2.3.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("2.3", {
  summary:
    "How environment, religion, labor, and distance from Britain produced the Chesapeake, New England, middle, and southern plantation colonies and their self-governing institutions.",
  minutes: 12,
  goals: [
    "Explain how tobacco shaped the economy and labor of the Chesapeake and North Carolina.",
    "Compare the economies and societies of New England, the middle colonies, and the plantation colonies.",
    "Explain why colonial governments developed self-governing institutions.",
  ],
  bigIdea:
    "The British colonies developed distinct regions because of different environments, motives, and labor systems, and distance from Britain let all of them build self-governing institutions.",
  context:
    "The CED asks you to explain how and why environmental and other factors shaped the development of the British colonies. For each region, ask what the land produced, who did the work, and how the colony governed itself.",
  sections: [
    section(
      "tobacco-colonies",
      "The Chesapeake and North Carolina: tobacco",
      ["GEO", "WXT", "SOC"],
      [
        "Virginia and Maryland, the Chesapeake colonies, and North Carolina grew prosperous by exporting tobacco. Jamestown struggled until John Rolfe's tobacco found a market in England, after which planters rushed to claim land. Tobacco was labor-intensive, and at first it was grown mainly by white, mostly male indentured servants who signed contracts to work for a set number of years in exchange for passage.",
        "Later, as fewer servants came and planters wanted a permanent workforce, enslaved Africans increasingly replaced indentured servants. Because most of the early migrants were men, the Chesapeake had unequal numbers of men and women and high death rates from disease.",
        [
          "Common trap",
          "Indentured servitude was not slavery. Servants worked under contract for a limited time, while slavery was permanent and hereditary.",
        ],
      ],
      "Tobacco drove the Chesapeake economy, first with indentured servants and later with enslaved Africans.",
    ),
    section(
      "new-england",
      "New England: towns and a mixed economy",
      ["GEO", "WXT", "ARC"],
      [
        "Puritans settled New England beginning in the 1620s and 1630s, seeking to build religious communities. Colonists settled in small towns and farmed family-sized plots on rocky soil with short growing seasons. They did not grow a single export crop. Instead they built a thriving mixed economy of agriculture, fishing, shipbuilding, lumber, and trade.",
        "Many families migrated together, and the New England population was healthier and more balanced than the Chesapeake's. Town meetings, where male landholders discussed local affairs, shaped local government.",
      ],
      "New England's Puritan towns and family farms supported a mixed economy of agriculture and commerce.",
    ),
    section(
      "middle-colonies",
      "The middle colonies: grain and diversity",
      ["MIG", "WXT", "SOC"],
      [
        "New York, New Jersey, Pennsylvania, and Delaware had fertile soil and a longer growing season than New England. Their farmers raised cereal crops, especially wheat, and exported grain and flour, which gave the middle colonies a flourishing export economy. William Penn founded Pennsylvania in 1681 as a refuge for Quakers.",
        "Because their land and trade drew migrants from many places, the middle colonies became more diverse than New England or the South. English, Dutch, German, Scots-Irish, and other settlers, with Protestants of many denominations and some Jews and Catholics, lived side by side, which led to greater cultural, ethnic, and religious diversity and tolerance.",
      ],
      "Grain exports and migration from many places made the middle colonies diverse and relatively tolerant.",
    ),
    section(
      "plantation-colonies",
      "The southern Atlantic coast and the West Indies: plantations",
      ["GEO", "WXT", "SOC"],
      [
        "South Carolina, Georgia, and the British West Indies had long growing seasons that supported plantation economies based on exporting cash crops. South Carolina planters grew rice and, later, indigo. In the West Indies, planters on islands such as Barbados and Jamaica grew sugar.",
        "These plantations depended on the labor of enslaved Africans, who often made up the majority of the population in these areas. Enslaved people developed their own forms of cultural and religious autonomy, blending African traditions with new surroundings.",
      ],
      "Long growing seasons produced cash-crop plantations that relied on enslaved Africans, who were often the majority.",
    ),
    section(
      "self-government",
      "Self-government at a distance",
      ["NAT", "PCE"],
      [
        "Distance and Britain's initially lax attention let the colonies create self-governing institutions that were unusually democratic for the era. In Virginia, the House of Burgesses first met in 1619. In New England, power rested in participatory town meetings, whose members elected representatives to colonial legislatures. In the southern colonies, elite planters exercised local authority and also dominated the elected assemblies.",
        "Voting was limited, usually to white men who owned property, but a much larger share of colonists could vote than in Britain. Colonial assemblies gained experience in taxing and spending, which later shaped how colonists reacted to British control.",
      ],
      "Weak British oversight let colonists build assemblies and town meetings that were unusually democratic for the era.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 2.4",
      title: "Regions linked by trade",
      body: "The regions were different, but all depended on trade across the Atlantic. Topic 2.4 explains how that trade worked and how Britain tried to control it.",
      transferQuestion:
        "How did the products of each region fit into the Atlantic economy?",
      feedback:
        "A strong answer names each region's export, such as tobacco, grain, fish, or sugar, and explains where it was sold and what labor produced it.",
      links: [
        {
          topicId: "apush-2-2",
          sectionId: "english-colonies",
          label: "Review English settlement colonies",
        },
      ],
    },
  ],
  sourceIds: ["fiveable-apush-unit-2"],
});

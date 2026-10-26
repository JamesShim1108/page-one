// Original Page One lesson for CED Topic 1.6.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("1.6", {
  summary:
    "How Europeans, Native Americans, and Africans misunderstood and borrowed from one another, how Native peoples defended their lands, and how Spanish leaders argued over the treatment of Native peoples.",
  minutes: 11,
  goals: [
    "Explain how differing views of land, gender, family, religion, and power led to misunderstandings between Europeans and Native Americans.",
    "Explain how Native peoples used diplomacy and military resistance to defend their sovereignty.",
    "Explain how Spanish leaders debated the treatment of Native peoples and how justifications for subjugation evolved.",
  ],
  bigIdea:
    "Europeans and Native Americans held divergent worldviews, borrowed useful things from each other, and clashed over land and labor, while Europeans argued over how non-Europeans should be treated.",
  context:
    "The CED asks you to explain how and why perspectives of others developed and changed. Look for what each side believed, what each side wanted, and how each side acted on those beliefs.",
  sections: [
    section(
      "misunderstandings-and-borrowing",
      "Misunderstandings and borrowing",
      ["WOR", "SOC"],
      [
        "In the early years of contact, each group tried to make sense of the other using its own assumptions. Europeans and Native Americans held divergent views about land use, gender roles, family, religion, and power, and these differences often produced misunderstandings.",
        "Many Europeans believed land could be owned by individuals, fenced, bought, and sold. Many Native societies instead recognized shared rights to use land for farming, hunting, and gathering, and they did not see an agreement as giving up the land forever. Europeans also noticed that in many Native societies women farmed while men hunted and fought. Because European custom treated farming as men's work, many colonists judged Native societies as disordered or uncivilized. Native peoples often saw trade as a way to build lasting relationships through gifts and alliances, while Europeans emphasized profit.",
        "Over time each side also adopted useful parts of the other's culture. Europeans learned to grow maize and other Native crops, and they borrowed Native knowledge of the land and its waters. Native peoples acquired European metal tools, cloth, and firearms, and, on the Plains, horses.",
        [
          "Common trap",
          "Misunderstanding did not mean that only Europeans failed to understand. Both sides misread the other, and each also borrowed what it found useful.",
        ],
      ],
      "Different views of land, gender, religion, and trade produced misunderstandings, but each side also borrowed from the other.",
    ),
    section(
      "diplomacy-and-resistance",
      "Diplomacy and resistance",
      ["WOR", "PCE"],
      [
        "As Europeans pressed onto Native lands and demanded Native labor, Native peoples worked to defend their political independence, their economies, their religious beliefs, and their ideas about gender relations. They used two main approaches: diplomatic negotiation and military resistance.",
        "Diplomacy included trade agreements and alliances. Some Native leaders allied with Europeans to gain advantages over their own rivals. The Tlaxcalans, for example, joined Cortés against the Aztecs, whose tribute demands they resented. Military resistance took many forms. In 1598 Spanish settlers under Juan de Oñate entered the Pueblo lands of New Mexico and demanded food, goods, and labor. When warriors from Acoma Pueblo killed a group of Oñate's men, the Spanish attacked in January 1599, destroyed the pueblo, and enslaved many survivors.",
        [
          "Cause and effect",
          "European demands for land, labor, and religious change led Native peoples to negotiate when they could and to fight when they felt they must.",
        ],
      ],
      "Native peoples defended their sovereignty through alliances and negotiation and through armed resistance.",
    ),
    section(
      "debate-over-treatment",
      "The Spanish debate over treatment",
      ["WOR", "SOC", "PCE"],
      [
        "Extended contact with Native Americans and Africans led Spanish religious and political leaders to argue over how non-Europeans should be treated. The Spanish Crown claimed the right to rule the Americas and to spread Christianity, and in 1513 royal lawyers drafted a document called the Requerimiento, which conquerors were told to read aloud to Native peoples. It demanded that they accept Spanish rule and the Christian faith or face war.",
        "Some Spaniards condemned the cruelty of the colonial system. The Dominican friar Bartolomé de las Casas, who had seen the abuse of Native workers, argued that Native peoples were rational human beings who should be converted by persuasion, not by force. His writings influenced the New Laws of 1542, which restricted new encomiendas and tried to limit abuse, though colonists resisted and enforcement was weak. Las Casas at first suggested that enslaved Africans could ease the burden on Native workers, a view he later condemned. Others, such as the scholar Juan Ginés de Sepúlveda, argued that Native peoples were naturally inferior and could justly be ruled and made to work. The two men presented their arguments in a famous debate at Valladolid in 1550–1551.",
        "Over time, the justifications used to subjugate Native Americans and Africans changed and combined religious, cultural, and racial arguments. Defenders of conquest and slavery claimed they were civilizing and converting people they described as inferior, and these ideas about race became more important as slavery expanded.",
      ],
      "Spanish leaders disagreed about how to treat Native peoples, and the justifications for subjugating Africans and Native Americans came to include religious, cultural, and racial arguments.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Within Unit 1",
      title: "From cultural contact to causation",
      body: "Topics 1.1 through 1.6 describe contact, conquest, and the social order that followed. Topic 1.7 asks you to explain how and why those developments happened and what they caused.",
      transferQuestion:
        "How did European views of land and gender contribute to conflict with Native peoples?",
      feedback:
        "A strong answer names a specific difference, such as individual ownership versus shared use, and explains how it produced misunderstanding or conflict over land and labor.",
      links: [
        {
          topicId: "apush-1-5",
          sectionId: "encomienda",
          label: "Review the encomienda and Native labor",
        },
      ],
    },
  ],
  sourceIds: ["albert-apush-cultural-interactions", "fiveable-apush-unit-1"],
});

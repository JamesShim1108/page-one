// Original Page One lesson for CED Topic 3.11.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("3.11", {
  summary:
    "How Americans expressed a national identity after the Revolution in language, literature, art, and architecture, while regional differences continued.",
  minutes: 9,
  goals: [
    "Describe new forms of national culture that developed in the United States after the Revolution.",
    "Explain how ideas about national identity were expressed in works of art, literature, and architecture.",
    "Explain how regional variations continued alongside national culture.",
  ],
  bigIdea:
    "Americans began to create a national culture that expressed republican ideals, but regional differences continued.",
  context:
    "The CED asks you to explain the continuities and changes in American culture from 1754 to 1800. This topic is a development topic, so aim to describe a change and explain why it happened.",
  sections: [
    section(
      "national-culture",
      "A new national culture",
      ["ARC", "NAT"],
      [
        "New forms of national culture developed in the United States alongside continued regional variations. After independence, writers, artists, and educators saw a need to establish a distinctive American culture to match the new republic. Noah Webster's spelling book and later dictionary promoted a standard American usage of English, and school texts taught republican virtue and love of country. Americans celebrated Washington as a national hero, and the symbols of the new nation, including the eagle and the flag, spread.",
        "Many people believed that republican government required an educated citizenry, so there was new attention to schools and to the education of both boys and girls. Americans also dropped many traditional ties to Britain. Several states ended official support for churches, and Virginia's Statute for Religious Freedom (1786) separated church and state.",
      ],
      "After independence, Americans promoted a distinct national culture through language, education, symbols, and religious freedom.",
    ),
    section(
      "art-literature-architecture",
      "Art, literature, and architecture",
      ["ARC", "NAT"],
      [
        "Ideas about national identity increasingly found expression in works of art, literature, and architecture. Painters such as Charles Willson Peale and Gilbert Stuart made portraits of Revolutionary leaders, and John Trumbull painted scenes from the Revolution. Writers such as Royall Tyler, whose play The Contrast (1787) contrasted American simplicity with European manners, and Philip Freneau, whose poetry celebrated the Revolution, tried to create a literature with American themes. Phillis Wheatley, an enslaved woman who published poetry in the 1770s, showed that Black writers also took part in this culture.",
        "In architecture, Americans favored a neoclassical style drawing on Greek and Roman models, which they associated with republican government. Thomas Jefferson's design for the Virginia state capitol and his own home, Monticello, are examples, and the new capital city of Washington, D.C., was planned with large public buildings in this style.",
      ],
      "Painters, writers, and architects used American subjects and classical models to express national identity.",
    ),
    section(
      "regional-variations",
      "Regional variations",
      ["GEO", "SOC"],
      [
        "A national culture did not erase regional differences. New England had towns centered on churches and commerce, the Middle Atlantic region had a diverse population and active trade, the South depended on plantation agriculture and slavery, and the backcountry had its own frontier culture. These regions differed over economic, political, social, and foreign policy issues, as the disputes between Federalists and Democratic-Republicans showed.",
        "National identity and regional identity developed side by side, and the tension between them would shape American politics in the decades that followed.",
      ],
      "National identity grew while regional differences in economy, society, and politics continued.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 3.12",
      title: "People on the move",
      body: "Culture developed in a nation of migrants. Topic 3.12 follows movement westward, American Indian alliances, and attitudes toward slavery.",
      transferQuestion:
        "How did neoclassical architecture express the political ideals of the early republic?",
      feedback:
        "A strong answer links Greek and Roman models to the republican form of government that Americans admired.",
      links: [
        {
          topicId: "apush-3-4",
          sectionId: "republicanism-and-natural-rights",
          label: "Review republicanism",
        },
      ],
    },
  ],
  sourceIds: [],
});

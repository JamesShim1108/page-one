// Original Page One lesson for CED Topic 4.9, a context-skill topic.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("4.9", {
  summary:
    "How a national culture emerged between 1800 and 1848 from American subjects, European influences, and regional traditions, and how Romantic ideas shaped literature, art, philosophy, and architecture.",
  minutes: 12,
  goals: [
    "Explain how American, European, and regional influences combined to form a new national culture.",
    "Explain how Romantic ideas influenced literature and art.",
    "Explain how Transcendentalism and other ideas reflected a belief in human perfectibility.",
  ],
  bigIdea:
    "Americans created a national culture that blended American themes, European influences, and regional traditions, and many of its writers and artists believed in human perfectibility and in nature.",
  context:
    "The CED asks you to explain how and why a new national culture developed. Place each writer, artist, or idea in its context: the new nation's search for its own identity, European Romanticism, and the market revolution.",
  sections: [
    section(
      "blending-cultures",
      "Blending American, European, and regional cultures",
      ["ARC", "NAT"],
      [
        "A new national culture emerged that combined American elements, European influences, and regional cultural sensibilities. After the War of 1812, Americans felt a stronger desire for their own national identity. Noah Webster's dictionary (1828) and his earlier spelling books promoted an American form of English. Artists and writers chose American landscapes, history, and people as subjects, although they still borrowed styles and ideas from Europe.",
        "Regional cultures also shaped the national culture. New England produced many writers and reformers, the South developed its own traditions and humor, and the frontier supplied folk heroes, songs, and stories.",
      ],
      "National culture drew on American subjects, European models, and the traditions of regions.",
    ),
    section(
      "romanticism-and-the-arts",
      "Romanticism in literature, art, and architecture",
      ["ARC", "NAT"],
      [
        "Liberal social ideas from abroad and Romantic beliefs in human perfectibility influenced literature, art, philosophy, and architecture. Romanticism, a European movement, valued emotion, imagination, individualism, and nature over the rationalism of the Enlightenment. American writers such as Washington Irving, James Fenimore Cooper, Edgar Allan Poe, and Nathaniel Hawthorne wrote stories that drew on American settings and on imagination and moral questions.",
        "Painters of the Hudson River School, including Thomas Cole, painted the grandeur of the American landscape, and many viewed the nation's wilderness as a source of national pride. In architecture, the Greek Revival style used columns and pediments to link the young republic to ancient Athens and Rome, which Americans saw as models of democracy and republican virtue.",
      ],
      "Romantic ideas inspired American writers, painters, and architects who found national themes in nature and history.",
    ),
    section(
      "transcendentalism-and-ideas",
      "Transcendentalism and human perfectibility",
      ["ARC", "SOC"],
      [
        "Transcendentalism was an American philosophical and literary movement that grew out of Romanticism. Ralph Waldo Emerson, Henry David Thoreau, and Margaret Fuller argued that individuals could find truth through intuition and through nature, and that society should not demand conformity. Emerson's essay “Self-Reliance” (1841) urged people to trust themselves. These ideas reflected the Romantic belief in human perfectibility, and they encouraged many reformers who tried to improve individuals and society.",
        [
          "Common trap",
          "The new national culture was not wholly American in origin. Many of its leading ideas and styles, such as Romanticism, came from Europe and were adapted to American conditions.",
        ],
      ],
      "Transcendentalists stressed individualism, intuition, and nature, and their belief in perfectibility supported reform.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 4.10",
      title: "Perfectibility in thought and in religion",
      body: "The belief that individuals could improve themselves appeared in philosophy and in religion. Topic 4.10 follows the religious side of the same shift.",
      transferQuestion:
        "What did Romanticism and the Second Great Awakening have in common?",
      feedback:
        "A strong answer notes that both stressed the individual, emotion, and the possibility of improvement, in contrast to a rationalist and fixed view of human nature.",
      links: [
        {
          topicId: "apush-4-7",
          sectionId: "ending-property-requirements",
          label: "Review the expansion of suffrage",
        },
      ],
    },
  ],
  sourceIds: [],
});

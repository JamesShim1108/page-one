// The eight AP U.S. History course themes. They play the role InSPECT plays in
// World History: lenses for choosing evidence, tags on lesson sections and
// writing parts, and the thematic focus of each CED topic (see ced.js). Theme
// IDs are the CED's own codes so tags read the same as in AP Classroom.
// `description` is quoted from the Course and Exam Description; `question` and
// `example` are Page One wording.

export const framework = {
  id: "apush-themes",
  name: "Course themes",
  title: "Use the course themes to choose your evidence",
  intro:
    "The themes connect developments across all nine periods. A piece of evidence can fit more than one theme; choose the one that answers the prompt.",
  sourceNote:
    "Theme names, codes, and descriptions follow the AP U.S. History Course and Exam Description (fall 2026).",
  themes: [
    {
      id: "NAT",
      shortTitle: "Identity",
      title: "American and National Identity",
      description:
        "This theme focuses on how and why definitions of American and national identity and values have developed among the diverse and changing population of North America as well as on related topics, such as citizenship, constitutionalism, foreign policy, assimilation, and American exceptionalism.",
      question:
        "Who counted as American, and what did people believe the nation stood for?",
      example:
        "Debates over ratifying the Constitution turned on what kind of republic Americans wanted.",
    },
    {
      id: "WXT",
      shortTitle: "Work and exchange",
      title: "Work, Exchange, and Technology",
      description:
        "This theme focuses on the factors behind the development of systems of economic exchange, particularly the role of technology, economic markets, and government.",
      question: "How did people earn a living, trade, and use new technology?",
      example: "Canals and railroads tied farmers in the West to markets in the East.",
    },
    {
      id: "GEO",
      shortTitle: "Geography",
      title: "Geography and the Environment",
      description:
        "This theme focuses on the role of geography and both the natural and human-made environments in the social and political developments in what would become the United States.",
      question:
        "How did land, climate, and resources shape choices, and how did people change them?",
      example: "The Chesapeake's climate suited tobacco, which shaped its labor system.",
    },
    {
      id: "MIG",
      shortTitle: "Migration",
      title: "Migration and Settlement",
      description:
        "This theme focuses on why and how the various people who moved to and within the United States both adapted to and transformed their new social and physical environments.",
      question: "Why did people move, and how did they change the places they settled?",
      example:
        "The Great Migration brought African Americans from the rural South to northern cities.",
    },
    {
      id: "PCE",
      shortTitle: "Politics",
      title: "Politics and Power",
      description:
        "This theme focuses on how different social and political groups have influenced society and government in the United States as well as how political beliefs and institutions have changed over time.",
      question: "Who held power, how did they use it, and who challenged it?",
      example: "The New Deal expanded the federal government's role in the economy.",
    },
    {
      id: "WOR",
      shortTitle: "World",
      title: "America in the World",
      description:
        "This theme focuses on the interactions between nations that affected North American history in the colonial period and on the influence of the United States on world affairs.",
      question:
        "How did contact, trade, diplomacy, and war connect America to other nations?",
      example:
        "The Seven Years' War left Britain in debt and changed its policies toward the colonies.",
    },
    {
      id: "ARC",
      shortTitle: "Culture",
      title: "American and Regional Culture",
      description:
        "This theme focuses on the how and why national, regional, and group cultures developed and changed as well as how culture has shaped government policy and the economy.",
      question:
        "How did beliefs, religion, arts, and media develop and shape public life?",
      example:
        "The Second Great Awakening inspired many Americans to join reform movements.",
    },
    {
      id: "SOC",
      shortTitle: "Society",
      title: "Social Structures",
      description:
        "This theme focuses on how and why systems of social organization develop and change as well as the impact that these systems have on the broader society.",
      question:
        "How were people ranked by race, class, and gender, and how did that change?",
      example:
        "The growth of a middle class in the Gilded Age changed ideas about leisure and family.",
    },
  ],
};

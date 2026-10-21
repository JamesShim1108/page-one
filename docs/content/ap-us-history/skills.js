// AP historical thinking skills and reasoning processes that AP U.S. History
// practice is tagged with. Results and history group performance by the skill
// IDs, so keep IDs permanent. Skill names, sub-skill statements (1.A-6.D), and
// reasoning-process statements are quoted from the AP U.S. History Course and
// Exam Description (fall 2026); the short descriptions are Page One wording.
//
// A question names one `skill` and may name the exact `subskill` code the item
// assesses, as the CED answer key does ("3.D"). Skill 6 has `mcq: false`: the
// CED says no multiple-choice questions explicitly assess argumentation, so the
// build rejects a multiple-choice question tagged with it.

export const skills = {
  id: "ap-history",
  name: "AP history skills",
  sourceNote:
    "Skill names, sub-skills, and reasoning processes are quoted from the AP U.S. History Course and Exam Description. Descriptions are original Page One summaries.",
  items: [
    {
      id: "developments",
      code: "1",
      label: "Developments and Processes",
      description: "Identify and explain historical developments and processes.",
      subskills: [
        { code: "1.A", text: "Identify a historical concept, development, or process." },
        { code: "1.B", text: "Explain a historical concept, development, or process." },
      ],
    },
    {
      id: "sourcing",
      code: "2",
      label: "Sourcing and Situation",
      description: "Analyze sourcing and situation of primary and secondary sources.",
      subskills: [
        {
          code: "2.A",
          text: "Identify a source’s point of view, purpose, historical situation, and/or audience.",
        },
        {
          code: "2.B",
          text: "Explain the point of view, purpose, historical situation, and/or audience of a source.",
        },
        {
          code: "2.C",
          text: "Explain the significance of a source’s point of view, purpose, historical situation, and/or audience, including how these might limit the use(s) of a source.",
        },
      ],
    },
    {
      id: "claims-evidence",
      code: "3",
      label: "Claims and Evidence in Sources",
      description: "Analyze arguments in primary and secondary sources.",
      subskills: [
        {
          code: "3.A",
          text: "Identify and describe a claim and/or argument in a text-based or non-text-based source.",
        },
        {
          code: "3.B",
          text: "Identify the evidence used in a source to support an argument.",
        },
        { code: "3.C", text: "Compare the arguments or main ideas of two sources." },
        {
          code: "3.D",
          text: "Explain how claims or evidence support, modify, or refute a source’s argument.",
        },
      ],
    },
    {
      id: "contextualization",
      code: "4",
      label: "Contextualization",
      description:
        "Analyze the context of historical events, developments, or processes.",
      subskills: [
        {
          code: "4.A",
          text: "Identify and describe a historical context for a specific historical development or process.",
        },
        {
          code: "4.B",
          text: "Explain how a specific historical development or process is situated within a broader historical context.",
        },
      ],
    },
    {
      id: "connections",
      code: "5",
      label: "Making Connections",
      description:
        "Using historical reasoning processes (comparison, causation, continuity and change), analyze patterns and connections between and among historical developments and processes.",
      subskills: [
        {
          code: "5.A",
          text: "Identify patterns among or connections between historical developments and processes.",
        },
        {
          code: "5.B",
          text: "Explain how a historical development or process relates to another historical development or process.",
        },
      ],
    },
    {
      id: "argumentation",
      code: "6",
      label: "Argumentation",
      description: "Develop an argument.",
      // Assessed by the DBQ and LEQ only.
      mcq: false,
      subskills: [
        { code: "6.A", text: "Make a historically defensible claim." },
        {
          code: "6.B",
          text: "Support an argument using specific and relevant evidence.",
        },
        {
          code: "6.C",
          text: "Use historical reasoning to explain relationships among pieces of historical evidence.",
        },
        {
          code: "6.D",
          text: "Corroborate, qualify, or modify an argument using diverse and alternative evidence in order to develop a complex argument.",
        },
      ],
    },
  ],
  reasoning: [
    {
      id: "comparison",
      label: "Comparison",
      processes: [
        {
          code: "1.i",
          text: "Describe similarities and/or differences between different historical developments or processes.",
        },
        {
          code: "1.ii",
          text: "Explain relevant similarities and/or differences between specific historical developments and processes.",
        },
        {
          code: "1.iii",
          text: "Explain the relative historical significance of similarities and/or differences between different historical developments or processes.",
        },
      ],
    },
    {
      id: "causation",
      label: "Causation",
      processes: [
        {
          code: "2.i",
          text: "Describe causes and/or effects of a specific historical development or process.",
        },
        {
          code: "2.ii",
          text: "Explain the relationship between causes and effects of a specific historical development or process.",
        },
        {
          code: "2.iii",
          text: "Explain the difference between primary and secondary causes and between short- and long-term effects.",
        },
        {
          code: "2.iv",
          text: "Explain how a relevant context influenced a specific historical development or process.",
        },
        {
          code: "2.v",
          text: "Explain the relative historical significance of different causes and/or effects.",
        },
      ],
    },
    {
      id: "continuity",
      label: "Continuity and change",
      processes: [
        { code: "3.i", text: "Describe patterns of continuity and/or change over time." },
        { code: "3.ii", text: "Explain patterns of continuity and/or change over time." },
        {
          code: "3.iii",
          text: "Explain the relative historical significance of specific historical developments in relation to a larger pattern of continuity and/or change.",
        },
      ],
    },
  ],
};

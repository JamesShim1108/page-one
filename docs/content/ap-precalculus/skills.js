// Mathematical practices that practice questions are tagged with. Results and
// history group performance by these IDs, so keep IDs permanent. The eight
// codes follow the skills organized under the three Mathematical Practices in
// the AP Precalculus Course and Exam Description; labels and descriptions are
// Page One wording.
//
// The validator requires a reasoning process on any question whose skill ID is
// "connections" (a history rule), so no math skill uses that ID.

export const skills = {
  id: "ap-precalculus-practices",
  name: "AP Precalculus skills",
  sourceNote:
    "Skill codes follow the Mathematical Practices in the AP Precalculus Course and Exam Description. Labels and descriptions are original Page One summaries.",
  items: [
    {
      id: "solve",
      code: "1.A",
      label: "Solve equations and inequalities",
      description:
        "Solve equations and inequalities given in symbolic form, with or without technology.",
    },
    {
      id: "equivalent-forms",
      code: "1.B",
      label: "Rewrite in equivalent forms",
      description:
        "Rewrite a function, equation, or expression in an equivalent form that makes the needed information easier to see.",
    },
    {
      id: "construct-functions",
      code: "1.C",
      label: "Construct new functions",
      description:
        "Build a new function from another by transformation, composition, inversion, or regression.",
    },
    {
      id: "identify-information",
      code: "2.A",
      label: "Identify information in a representation",
      description:
        "Read the information a graph, table, equation, or verbal description gives about a function.",
    },
    {
      id: "construct-representations",
      code: "2.B",
      label: "Build equivalent representations",
      description:
        "Move between graphical, numerical, symbolic, and verbal representations of the same function.",
    },
    {
      id: "describe",
      code: "3.A",
      label: "Describe function characteristics",
      description:
        "Describe features of a function, such as behavior, rates of change, or asymptotes, with the precision the situation needs.",
    },
    {
      id: "apply-results",
      code: "3.B",
      label: "Apply results in context",
      description:
        "Interpret a numerical or symbolic result in terms of a mathematical or real-world situation, including units.",
    },
    {
      id: "support-conclusions",
      code: "3.C",
      label: "Support conclusions",
      description:
        "Justify a conclusion or a modeling choice with a logical rationale or appropriate data.",
    },
  ],
  reasoning: [],
};

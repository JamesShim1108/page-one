// Mathematical practices that practice questions are tagged with. Results and
// history group performance by these IDs, so keep IDs permanent. The eight
// codes follow the skills organized under the three Mathematical Practices in
// the AP Precalculus Course and Exam Description. Descriptions use the CED skill
// statements so practice feedback uses the same language as the exam.
//
// The validator requires a reasoning process on any question whose skill ID is
// "connections" (a history rule), so no math skill uses that ID.

export const skills = {
  id: "ap-precalculus-practices",
  name: "AP Precalculus skills",
  sourceNote:
    "Skill codes and descriptions follow the eight skills of the three Mathematical Practices in the AP Precalculus Course and Exam Description: Procedural and Symbolic Fluency (1.A to 1.C), Multiple Representations (2.A and 2.B), and Communication and Reasoning (3.A to 3.C). Labels are short Page One names.",
  items: [
    {
      id: "solve",
      code: "1.A",
      label: "Solve equations and inequalities",
      description:
        "Solve equations and inequalities represented analytically, with and without technology.",
    },
    {
      id: "equivalent-forms",
      code: "1.B",
      label: "Rewrite in equivalent forms",
      description:
        "Express functions, equations, or expressions in analytically equivalent forms that are useful in a given mathematical or applied context.",
    },
    {
      id: "construct-functions",
      code: "1.C",
      label: "Construct new functions",
      description:
        "Construct new functions, using transformations, compositions, inverses, or regressions, that may be useful in modeling contexts, criteria, or data, with and without technology.",
    },
    {
      id: "identify-information",
      code: "2.A",
      label: "Identify information in a representation",
      description:
        "Identify information from graphical, numerical, analytical, and verbal representations to answer a question or construct a model, with and without technology.",
    },
    {
      id: "construct-representations",
      code: "2.B",
      label: "Build equivalent representations",
      description:
        "Construct equivalent graphical, numerical, analytical, and verbal representations of functions that are useful in a given mathematical or applied context, with and without technology.",
    },
    {
      id: "describe",
      code: "3.A",
      label: "Describe function characteristics",
      description:
        "Describe the characteristics of a function with varying levels of precision, depending on the function representation and available mathematical tools.",
    },
    {
      id: "apply-results",
      code: "3.B",
      label: "Apply results in context",
      description: "Apply numerical results in a given mathematical or applied context.",
    },
    {
      id: "support-conclusions",
      code: "3.C",
      label: "Support conclusions",
      description:
        "Support conclusions or choices with a logical rationale or appropriate data.",
    },
  ],
  reasoning: [],
};

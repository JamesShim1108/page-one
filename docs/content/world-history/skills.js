// AP history practices that practice questions are tagged with. Results and
// history group performance by these IDs, so keep IDs permanent. Labels follow
// the historical thinking skills and reasoning processes named in the AP World
// History: Modern Course and Exam Description; descriptions are Page One wording.

export const skills = {
  id: "ap-history",
  name: "AP history skills",
  sourceNote:
    "Skill and reasoning-process names follow the AP World History: Modern Course and Exam Description. Descriptions are original Page One summaries.",
  items: [
    {
      id: "developments",
      code: "1",
      label: "Developments and processes",
      description:
        "Identify and explain historical concepts, developments, and processes.",
    },
    {
      id: "sourcing",
      code: "2",
      label: "Sourcing and situation",
      description:
        "Explain a source's point of view, purpose, historical situation, or audience, and why it matters.",
    },
    {
      id: "claims-evidence",
      code: "3",
      label: "Claims and evidence in sources",
      description:
        "Identify a source's claim or the evidence it offers, and explain how it supports or challenges an argument.",
    },
    {
      id: "contextualization",
      code: "4",
      label: "Contextualization",
      description: "Place a development or source within its broader historical setting.",
    },
    {
      id: "connections",
      code: "5",
      label: "Making connections",
      description:
        "Use comparison, causation, or continuity and change to relate developments across time and place.",
    },
    {
      id: "argumentation",
      code: "6",
      label: "Argumentation",
      description:
        "Make and support a defensible claim, including qualifying it where evidence varies.",
    },
  ],
  reasoning: [
    { id: "comparison", label: "Comparison" },
    { id: "causation", label: "Causation" },
    { id: "continuity", label: "Continuity and change" },
  ],
};

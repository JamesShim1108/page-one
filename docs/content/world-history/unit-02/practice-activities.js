export const activities = [
  {
    id: "world-2-claim-trade-growth",
    title: "Trade growth: choose the evidence",
    focus: "Trade growth",
    claim:
      "Commercial institutions helped turn demand into more regular long-distance exchange.",
    options: [
      {
        id: "a",
        text: "Caravanserai and credit reduced some travel or payment problems.",
        correct: true,
        feedback:
          "This evidence directly supports the claim because it names an institution and explains its mechanism.",
      },
      {
        id: "b",
        text: "A ruler was famous in a later period.",
        correct: false,
        feedback:
          "This may be historically interesting, but it does not directly show how commercial institutions changed exchange.",
      },
      {
        id: "c",
        text: "A luxury good was attractive to wealthy consumers.",
        correct: false,
        feedback:
          "Demand helps explain growth, but by itself it does not support the specific institutional part of the claim.",
      },
    ],
    sourceIds: ["amsco-unit-2", "ced-topic-2-1"],
    review: {
      topicId: "world-2-1",
      sectionId: "commercial-practices",
      label: "Review commercial practices",
    },
  },
  {
    id: "world-2-claim-state-power",
    title: "State power: choose the evidence",
    focus: "State power",
    claim:
      "States could gain revenue from exchange while relying on specialists and communities to make routes work.",
    options: [
      {
        id: "a",
        text: "Mali used taxation and protection while merchants, guides, and producers supplied practical expertise.",
        correct: true,
        feedback:
          "This evidence supports both halves of the claim and distinguishes state policy from everyday work.",
      },
      {
        id: "b",
        text: "A city had a large population in an unspecified century.",
        correct: false,
        feedback:
          "A population claim without a period, place, or mechanism does not directly support the relationship.",
      },
      {
        id: "c",
        text: "All routes were controlled by one empire.",
        correct: false,
        feedback:
          "This contradicts the varied and overlapping political arrangements in the unit.",
      },
    ],
    sourceIds: ["amsco-unit-2", "ced-topic-2-4"],
    review: {
      topicId: "world-2-4",
      sectionId: "mali-state-trade",
      label: "Review Mali and trade",
    },
  },
  {
    id: "world-2-claim-diaspora",
    title: "Diaspora: choose the evidence",
    focus: "Diaspora",
    claim:
      "Port communities made seasonal exchange durable by building trust and adapting local practices.",
    options: [
      {
        id: "a",
        text: "Merchant communities settled in port cities, intermarried, and used shared commercial relationships.",
        correct: true,
        feedback:
          "This evidence names people and mechanisms that connect repeated voyages to durable community life.",
      },
      {
        id: "b",
        text: "Monsoon winds changed direction each season.",
        correct: false,
        feedback:
          "That supports the environmental condition for travel, but not the claim about community formation.",
      },
      {
        id: "c",
        text: "A state collected a tax from a port.",
        correct: false,
        feedback:
          "Taxation can support state power, but it does not by itself show diaspora trust or adaptation.",
      },
    ],
    sourceIds: ["amsco-unit-2", "class-indian-ocean"],
    review: {
      topicId: "world-2-3",
      sectionId: "diaspora-communities",
      label: "Review diaspora communities",
    },
  },
  {
    id: "world-2-claim-cultural-transfer",
    title: "Cultural transfer: choose the evidence",
    focus: "Cultural transfer",
    claim:
      "Connectivity moved knowledge through intermediaries, and receiving communities adapted what they received.",
    options: [
      {
        id: "a",
        text: "Translators, scholars, merchants, and officials carried and modified paper, medical, or mathematical knowledge.",
        correct: true,
        feedback:
          "The evidence identifies carriers and the adaptation mechanism rather than treating diffusion as a one-way gift.",
      },
      {
        id: "b",
        text: "A technology existed before 1200.",
        correct: false,
        feedback:
          "Earlier origins matter, but this fact alone does not show how knowledge moved or changed after 1200.",
      },
      {
        id: "c",
        text: "A ruler adopted a religion and every subject followed.",
        correct: false,
        feedback:
          "The claim requires local agency and variation; universal conversion is unsupported.",
      },
    ],
    sourceIds: ["amsco-unit-2", "ced-topic-2-5"],
    review: {
      topicId: "world-2-5",
      sectionId: "knowledge-technology",
      label: "Review knowledge transfer",
    },
  },
  {
    id: "world-2-claim-environment",
    title: "Environmental consequences: choose the evidence",
    focus: "Environmental consequences",
    claim:
      "Connectivity could expand food possibilities and disease exposure at the same time.",
    options: [
      {
        id: "a",
        text: "Crop movement supported food production in some settings while mobility created pathways for pathogens.",
        correct: true,
        feedback:
          "This evidence supports both sides and leaves room for different local outcomes.",
      },
      {
        id: "b",
        text: "A trade route crossed a mountain pass.",
        correct: false,
        feedback:
          "A route description does not directly show a biological or agricultural consequence.",
      },
      {
        id: "c",
        text: "Every region experienced exactly the same epidemic loss.",
        correct: false,
        feedback:
          "The unit emphasizes uneven evidence and regional variation rather than identical outcomes.",
      },
    ],
    sourceIds: ["amsco-unit-2", "ced-topic-2-6"],
    review: {
      topicId: "world-2-6",
      sectionId: "pathogen-networks",
      label: "Review pathogen networks",
    },
  },
  {
    id: "world-2-claim-comparison",
    title: "Comparison: choose the evidence",
    focus: "Comparison",
    claim:
      "The three networks shared broad pressures but solved geographic problems differently.",
    options: [
      {
        id: "a",
        text: "Demand and institutions mattered across networks, while monsoon timing, camel logistics, and overland relay produced different solutions.",
        correct: true,
        feedback:
          "This evidence makes a comparative claim and explains why the difference existed.",
      },
      {
        id: "b",
        text: "All three networks used trade.",
        correct: false,
        feedback:
          "This is true but too general to show a meaningful similarity or difference.",
      },
      {
        id: "c",
        text: "One network was simply better than the others.",
        correct: false,
        feedback:
          "A historical comparison needs criteria and reasoning rather than an unsupported ranking.",
      },
    ],
    sourceIds: ["amsco-unit-2", "ced-topic-2-7"],
    review: {
      topicId: "world-2-7",
      sectionId: "comparison-framework",
      label: "Review comparison framework",
    },
  },
];

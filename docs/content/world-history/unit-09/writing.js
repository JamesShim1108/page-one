// Unit 9 writing practice: a stimulus-based SAQ with model APE responses.
// Lenses name the InSPECT categories in ../framework.js. Increment `version` when a
// prompt or its fields change enough to invalidate saved drafts.
import { excerpts } from "../excerpts.js";
import { dbq, dbqDocument, leq, saq } from "../writing-kit.js";

const saqInstructions =
  "Answer all three parts. For each part, Answer the question directly, Prove it with specific historical evidence, and Explain how the evidence supports your answer. On the AP exam each part earns one point. This is self-assessment practice, not official College Board scoring.";

const saqNote =
  "Original Page One practice in AP short-answer format. Model answers show one strong response; other accurate, well-supported answers can earn the point.";

const saqScaffold = [
  {
    label: "Answer",
    text: "Respond directly to the task verb: identify, describe, or explain.",
  },
  { label: "Prove", text: "Name a specific person, place, institution, or development." },
  { label: "Explain", text: "Show how or why the evidence answers the question." },
];

export const writingQuizzes = [
  {
    id: "world-9-saq-01",
    version: 1,
    courseId: "world",
    unitId: "world-9",
    title: "Unit 9 SAQ 01",
    headline: "Nixon and the price of pollution",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    instructions: saqInstructions,
    note: saqNote,
    exerciseType: "saq",
    stimulusBlocks: [excerpts.nixonEnvironment],
    scaffold: saqScaffold,
    parts: [
      {
        id: "a",
        lenses: ["In", "E"],
        prompt: "Identify ONE claim Nixon makes about the cost of pollution.",
        criteria: [
          "States a specific claim from the passage.",
          "Connects it to the cost of pollution or its control.",
        ],
        model: {
          answer:
            "Nixon claims that clean air and water have a real cost that the country can no longer ignore.",
          prove:
            "He says that “clean air is not free, and neither is clean water,” and that past carelessness created “a debt to nature” that “is being called.”",
          explain:
            "By describing pollution as a debt, he argues that Americans must now pay to repair damage they once treated as free.",
        },
        alternatives:
          "Answers can also identify his claim that the price of goods should include the cost of producing and disposing of them without harming the environment.",
        review: [
          {
            topicId: "world-9-3",
            sectionId: "environmental-debates",
            label: "Debating responses",
          },
        ],
      },
      {
        id: "b",
        lenses: ["In", "E"],
        prompt:
          "Explain ONE way that economic or population growth in the period 1900 to the present contributed to the environmental problems Nixon describes.",
        criteria: [
          "Names a specific economic or demographic development.",
          "Explains how it damaged air, land, or water.",
        ],
        model: {
          answer:
            "Industrial growth powered by fossil fuels released pollutants into the air and water.",
          prove:
            "After World War II, factories, power plants, and tens of millions of new cars burned coal and oil, and Nixon himself called the automobile the country's worst air polluter.",
          explain:
            "As production and consumption grew, so did emissions and waste, which damaged the air, land, and water Nixon wanted to restore.",
        },
        alternatives:
          "Answers can also explain how rapid population growth increased demand for land, water, and energy, or how the Green Revolution's fertilizers and pesticides polluted soil and water.",
        review: [
          {
            topicId: "world-9-3",
            sectionId: "environmental-change",
            label: "A changing planet",
          },
        ],
      },
      {
        id: "c",
        lenses: ["In", "P"],
        prompt:
          "Explain ONE limitation of Nixon's speech as evidence for understanding global debates about the environment after 1970.",
        criteria: [
          "Identifies a specific feature of the source's purpose, audience, or perspective.",
          "Explains why it limits what the source shows about global debates.",
        ],
        model: {
          answer:
            "The speech presents the view of a wealthy industrial country and focuses only on American air, land, and water.",
          prove:
            "Nixon was addressing Congress to win support for US laws, and he speaks of clean air and water as the “birthright of every American.”",
          explain:
            "It does not show the view of developing countries, which later argued at Kyoto that rich nations had caused most pollution and that poorer nations needed room to grow.",
        },
        alternatives:
          "Answers can also explain that, as a political speech, it was meant to persuade and may promise more than the government later delivered, or that it predates scientific concern about global warming.",
        review: [
          {
            topicId: "world-9-3",
            sectionId: "environmental-debates",
            label: "Debating responses",
          },
        ],
      },
    ],
    sourceIds: ["nixon-sotu-1970", "ced-topic-9-3", "ced"],
  },
  // BEGIN mock exam prompts (written for full-length mock exams)
  saq({
    id: "world-9-saq-02",
    unitNumber: 9,
    number: 2,
    headline: "AIDS in Africa",
    promptTitle: "Primary-source short-answer question",
    prompt: "Use the passage below to answer all parts of the question.",
    stimulusBlocks: [excerpts.gwbushAids],
    sourceIds: ["gwbush-sotu-2003", "ced-topic-9-2"],
    parts: [
      {
        id: "a",
        lenses: ["E", "P"],
        prompt:
          "Identify ONE reason George W. Bush gives for why action against AIDS in Africa was possible in 2003.",
        criteria: [
          "States a specific reason from the passage.",
          "Connects the reason to the possibility of treatment or prevention.",
        ],
        model: {
          answer: "Bush says the cost of anti-retroviral drugs had fallen sharply.",
          prove:
            "He notes that the drugs that cost 12,000 dollars a year now cost under 300 dollars, and that AIDS can be prevented.",
          explain:
            "Lower prices made it realistic for governments to treat millions of people, so a large aid program could save many lives.",
        },
        alternatives:
          "Answers can also identify his statement that anti-retroviral drugs can extend life for many years.",
        review: [
          {
            topicId: "world-9-2",
            sectionId: "medical-advances",
            label: "Medical advances",
          },
        ],
      },
      {
        id: "b",
        lenses: ["In", "S"],
        prompt:
          "Explain ONE way globalization in the second half of the twentieth century contributed to the spread of disease.",
        criteria: [
          "Names a specific development, such as travel, migration, or urbanization.",
          "Explains how it helped a disease spread.",
        ],
        model: {
          answer:
            "Faster and cheaper travel allowed diseases to move across regions quickly.",
          prove:
            "Jet air travel after the 1950s carried millions of passengers across continents, and migration from rural areas to crowded cities increased contact among people.",
          explain:
            "Infected people could reach distant places in hours, before symptoms appeared, so epidemics spread more widely than they could when travel took weeks.",
        },
        alternatives:
          "Answers can also explain how growing cities in Africa, Asia, and Latin America created conditions in which diseases such as HIV and cholera spread.",
        review: [
          {
            topicId: "world-9-2",
            sectionId: "epidemics",
            label: "Epidemics",
          },
        ],
      },
      {
        id: "c",
        lenses: ["T", "P"],
        prompt:
          "Explain ONE way medical advances or international cooperation reduced the impact of a disease in the twentieth century.",
        criteria: [
          "Names a specific disease and a specific advance or program.",
          "Explains how it reduced the disease's effects.",
        ],
        model: {
          answer: "A global vaccination campaign eliminated smallpox.",
          prove:
            "The World Health Organization led an international campaign of vaccination and tracking of cases that ended with the declaration in 1980 that smallpox had been eradicated.",
          explain:
            "Cooperation among governments allowed vaccination teams to reach remote areas, showing that organized international action could defeat a disease that had killed millions.",
        },
        alternatives:
          "Answers can also explain the development of antibiotics such as penicillin, the polio vaccines of the 1950s, or antiretroviral treatment for HIV.",
        review: [
          {
            topicId: "world-9-2",
            sectionId: "medical-advances",
            label: "Medical advances",
          },
        ],
      },
    ],
  }),
  dbq({
    id: "world-9-dbq-government",
    unitNumber: 9,
    headline: "Ideas about the role of government",
    prompt:
      "Evaluate the extent to which ideas in Europe and the United States about the proper role of government in economic life changed in the period 1917–2000.",
    sourceIds: [
      "reed-ten-days",
      "keynes-consequences",
      "truman-inaugural-1949",
      "nixon-sotu-1970",
      "reagan-inaugural-1981",
      "bush-sotu-1990",
      "clinton-sotu-2000",
      "ced-topic-9-4",
      "ced-topic-8-8",
    ],
    topicId: "world-9-4",
    noteReview: { sectionId: "free-market", label: "Free-market reforms" },
    essayReview: { sectionId: "new-economies", label: "New economies" },
    documents: [
      dbqDocument({
        id: "doc-1",
        label: "“All Power to the Soviets!”",
        excerpt: excerpts.reedPetrograd,
        author: "John Reed",
        date: "Events of 1917; published 1919",
        setting: "Petrograd, Russia, during the revolution",
        audience: "American readers",
        rights: "Public-domain text.",
        sourceId: "reed-ten-days",
      }),
      dbqDocument({
        id: "doc-2",
        label: "A warning about the peace settlement",
        excerpt: excerpts.keynesPeace,
        author: "John Maynard Keynes",
        date: "1919",
        setting: "Britain, after the Paris Peace Conference",
        audience: "British and international readers",
        rights: "Public-domain text.",
        sourceId: "keynes-consequences",
      }),
      dbqDocument({
        id: "doc-3",
        label: "Democracy and communism",
        excerpt: excerpts.trumanCommunism,
        author: "Harry S. Truman",
        date: "January 20, 1949",
        setting: "Washington, at the start of the Cold War",
        audience: "The American public and the world",
        rights: "Work of the United States government.",
        sourceId: "truman-inaugural-1949",
      }),
      dbqDocument({
        id: "doc-4",
        label: "A call for environmental regulation",
        excerpt: excerpts.nixonEnvironment,
        author: "Richard Nixon",
        date: "January 22, 1970",
        setting: "Washington, as environmental concern was growing",
        audience: "Congress and the American public",
        rights: "Work of the United States government.",
        sourceId: "nixon-sotu-1970",
      }),
      dbqDocument({
        id: "doc-5",
        label: "“Government is not the solution”",
        excerpt: excerpts.reaganGovernment,
        author: "Ronald Reagan",
        date: "January 20, 1981",
        setting: "Washington, during a period of inflation and slow growth",
        audience: "The American public",
        rights: "Work of the United States government.",
        sourceId: "reagan-inaugural-1981",
      }),
      dbqDocument({
        id: "doc-6",
        label: "The Revolution of 1989",
        excerpt: excerpts.bushRevolution89,
        author: "George H. W. Bush",
        date: "January 31, 1990",
        setting: "Washington, after the fall of communist governments in Eastern Europe",
        audience: "Congress and the American public",
        rights: "Work of the United States government.",
        sourceId: "bush-sotu-1990",
      }),
      dbqDocument({
        id: "doc-7",
        label: "Globalization and rules for trade",
        excerpt: excerpts.clintonGlobalization,
        author: "Bill Clinton",
        date: "January 27, 2000",
        setting: "Washington, soon after protests against the World Trade Organization",
        audience: "Congress and the American public",
        rights: "Work of the United States government.",
        sourceId: "clinton-sotu-2000",
      }),
    ],
    modelResponse:
      'In 1900, most governments played a limited role in daily economic life, but the First World War, the Russian Revolution, and the Great Depression led many people to ask whether governments should take on much more. The Cold War then divided the world between states with market economies and states with planned economies, and the late twentieth century produced new debates about markets and regulation.\n\nBetween 1917 and 2000, ideas about the role of government changed substantially, moving from confidence in an active state in the early and middle decades toward greater trust in markets after 1980, but the shift was incomplete because governments continued to regulate, to set rules for trade, and to defend political systems.\n\nIn the first half of the century, many writers expected governments to act. In Petrograd, the Bolsheviks called for "All Power to the Soviets" and promised land, bread, and peace as the Provisional Government failed to feed the city (Document 1). John Reed, an American socialist who supported the revolution, had reason to highlight the Bolsheviks\' appeal, but his description of falling bread rations helps explain why many Russians turned to a government that promised to take control of the economy. After the war, Keynes warned that the Treaty of Versailles had "no provisions for the economic rehabilitation of Europe" and predicted revolution if Central Europe were impoverished (Document 2). Writing after resigning from the British delegation, Keynes wanted to persuade readers that governments had a responsibility to plan for recovery. The Great Depression and the New Deal in the United States confirmed this view: governments took on responsibility for employment and relief.\n\nDuring the Cold War, the debate was about which kind of government should rule. President Truman described communism as based on the belief that people need "strong masters," while democracy rested on the "capacity . . . to govern himself" (Document 3). Speaking in 1949 during the Berlin airlift, Truman had a purpose of rallying Americans and allies behind containment, so his contrast is stark. Yet he did not oppose government action: the Marshall Plan committed billions of dollars in public aid to rebuild Western Europe. Nixon\'s 1970 call for "comprehensive new regulations" on pollution (Document 4) shows that active government remained a mainstream view in a Republican administration, and he used it to respond to growing public concern and the creation of the Environmental Protection Agency.\n\nAfter 1975, confidence in the state declined. Reagan said that "government is not the solution to our problem" and proposed to remove "roadblocks" to the economy (Document 5). He spoke after a decade of inflation and slow growth, and his inaugural address was meant to justify tax cuts and deregulation. Similar ideas shaped Margaret Thatcher\'s privatizations in Britain and the market reforms of Deng Xiaoping in China. The collapse of communist governments in 1989, celebrated by Bush (Document 6), seemed to confirm the failure of central planning, though Bush was also claiming credit for his country\'s Cold War policy. Gorbachev\'s perestroika and glasnost had opened the way.\n\nBy 2000, the debate had shifted again. Clinton described globalization as "the central reality of our time" and urged "rule-based trade" that would not tolerate "a race to the bottom" in the environment and worker protection (Document 7). Speaking soon after the protests at the WTO meeting in Seattle, he had a political reason to show that he took critics seriously. His position shows that even leaders who praised markets accepted a role for government in setting rules.\n\nIn conclusion, ideas about government moved from confidence in state direction to greater trust in markets, but governments never stopped regulating, protecting, and setting the terms of exchange, so the change was real but incomplete.',
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes the role of governments before 1917, the effects of the world wars and the Depression, and the Cold War division.",
      },
      {
        label: "Thesis",
        text: "The thesis answers the question of extent and previews a pattern of change with limits.",
      },
      {
        label: "Evidence from the documents",
        text: "All seven documents are used as evidence, grouped by period.",
      },
      {
        label: "Evidence beyond the documents",
        text: "The New Deal, the Marshall Plan, the Environmental Protection Agency, Thatcher's privatizations, Deng Xiaoping's reforms, and Gorbachev's reforms are specific evidence not found in the documents.",
      },
      {
        label: "Sourcing",
        text: "The essay explains Reed's sympathies, Keynes's purpose after resigning, Truman's Cold War audience, Reagan's response to inflation, Bush's claim to credit, and Clinton's political situation after the Seattle protests.",
      },
      {
        label: "Complexity",
        text: "The essay qualifies the claim of a shift toward markets by showing continuing regulation in Nixon's and Clinton's addresses and by noting that Bush and Truman were also political speakers.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that the central change was not the size of government but its purpose, grouping Documents 1–3 as arguments about which political system should rule and Documents 4–7 as arguments about how far markets should be regulated.",
    commonErrors: [
      "Treating the documents, most of which are by American presidents, as evidence for the whole world.",
      "Summarizing each document in order instead of grouping them by claim.",
      "Claiming that government's role simply grew or simply shrank throughout the century.",
      "Quoting speeches without noting that political speakers have purposes and audiences.",
    ],
  }),
  leq({
    id: "world-9-leq-continuity",
    unitNumber: 9,
    headline: "Technology and global connections",
    prompt:
      "Evaluate the extent to which new communication and transportation technologies changed global connections in the period 1900 to 2001.",
    sourceIds: ["ced-topic-9-9", "ced-topic-9-1"],
    topicId: "world-9-9",
    outlineReview: { sectionId: "continuity-change", label: "Continuity and change" },
    essayReview: { sectionId: "continuity-change", label: "Continuity and change" },
    modelResponse:
      "By 1900, steamships, railroads, and the telegraph had already linked many parts of the world. Submarine cables connected continents, and the opening of the Suez Canal in 1869 had shortened routes between Europe and Asia. These earlier technologies had helped European empires and global trade grow.\n\nBetween 1900 and 2001, new technologies of communication and transport greatly increased the speed, volume, and reach of global connections, but political barriers, economic inequality, and the dominance of a few powerful states limited how equally people shared in those connections.\n\nTechnology changed the speed and scale of exchange. Commercial jet travel, which began in the late 1950s, cut the time to cross oceans from days to hours and allowed millions of people to travel and migrate. Shipping containers, introduced in the 1950s, lowered the cost of moving goods and made it practical for manufacturers to assemble products using parts from many countries. Radio and television spread news, music, and sports to mass audiences, and the Internet and the World Wide Web, which became widely used in the 1990s, let people exchange information instantly across borders.\n\nTechnology also changed the way people experienced events. In 1969 an estimated hundreds of millions of people watched the Apollo moon landing on television, and satellite broadcasts allowed global audiences to watch events as they happened. Disease and finance also moved faster: HIV spread along air routes and migration, and financial crises such as the Asian financial crisis of 1997 spread quickly across markets.\n\nHowever, important continuities limited these changes. Political divisions shaped the use of technology: during the Cold War, the Iron Curtain and the Berlin Wall restricted travel and information between East and West, and governments such as China's censored the Internet. Economic inequality meant that many people in poorer countries had little access to telephones, computers, or air travel, a gap often called the digital divide. Wealthy industrialized states and their companies also controlled most of the trade and information flows, so technology did not end older patterns of dependence.\n\nIn conclusion, technology made global connections faster and broader than ever before, but its benefits were uneven and shaped by governments and economic power, so the change was dramatic in speed and unequal in effect.",
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes steamships, railroads, the telegraph, and the Suez Canal before 1900.",
      },
      {
        label: "Thesis",
        text: "The thesis answers the question of extent and names both the changes and the limits.",
      },
      {
        label: "Evidence",
        text: "Jet travel, containers, television, the Apollo landing, the Internet, the Cold War barriers, and censorship are specific and used to support both change and continuity.",
      },
      {
        label: "Analysis and reasoning",
        text: "The essay organizes continuity and change and qualifies the claim by showing how politics and inequality limited the effects of technology.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that technology changed global connections more before 1950 than after, using the telegraph, steamship, and radio as the main turning points and treating jets and the Internet as extensions.",
    commonErrors: [
      "Listing technologies without explaining how they changed connections.",
      "Treating globalization as new in the twentieth century instead of building on earlier networks.",
      "Ignoring evidence of continuity, such as unequal access and political barriers.",
      "Using developments after 2001 as the main evidence.",
    ],
  }),
  // END mock exam prompts
];

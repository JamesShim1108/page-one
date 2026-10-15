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
      "Evaluate the extent to which ideas about the proper role of government in economic life changed in the period 1917–2000.",
    sourceIds: [
      "mexico-constitution-1917-branch",
      "reed-ten-days",
      "gandhi-wheel-of-fortune-1922",
      "sun-yatsen-development-1922",
      "truman-inaugural-1949",
      "reagan-inaugural-1981",
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
        label: "The nation's ownership of land and oil",
        excerpt: excerpts.mexicoArticle27,
        author: "Mexican constitutional convention",
        date: "February 1917",
        setting: "Querétaro, Mexico, during the Mexican Revolution",
        audience:
          "Mexican citizens; this translation was published in Washington for American readers",
        rights: "Public-domain translation (1917).",
        sourceId: "mexico-constitution-1917-branch",
      }),
      dbqDocument({
        id: "doc-2",
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
        id: "doc-3",
        label: "Hand-spinning and India's poverty",
        excerpt: excerpts.gandhiSwadeshi,
        author: "Mohandas K. Gandhi",
        date: "August 18, 1920",
        setting: "India, under British rule, during the noncooperation movement",
        audience: "Readers of Gandhi's weekly Young India",
        rights: "Public-domain text (1922 collection).",
        sourceId: "gandhi-wheel-of-fortune-1922",
      }),
      dbqDocument({
        id: "doc-4",
        label: "A plan for China's development",
        excerpt: excerpts.sunDevelopment,
        author: "Sun Yat-sen",
        date: "1922; written from 1918",
        setting: "China, divided among warlords and foreign spheres of influence",
        audience: "Foreign governments and bankers, and English-speaking readers",
        rights: "Public-domain text.",
        sourceId: "sun-yatsen-development-1922",
      }),
      dbqDocument({
        id: "doc-5",
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
        id: "doc-6",
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
      'Before 1914, the leading industrial states generally left most economic decisions to markets, while colonial governments managed the economies of Asia and Africa largely for the benefit of the colonizing countries. The First World War, the Russian Revolution, the rise of anticolonial nationalism, and later the Great Depression led people around the world to ask whether governments should own resources, plan development, or protect national industry.\n\nBetween 1917 and 2000, ideas about government\'s role in economic life changed substantially, moving from widespread confidence that states should own, plan, or protect key parts of the economy toward greater trust in markets after 1980, but the change was incomplete, because even leaders who praised markets still expected governments to set the rules of trade.\n\nIn the years after 1917, revolutionaries and nationalists across the world called for governments to take control of economic life. Mexico\'s 1917 constitution vested ownership of land and "petroleum and all hydrocarbons" in "the Nation" and ordered the division of "large landed estates" (Document 1). This translation appeared in a Washington journal devoted to explaining Mexico\'s revolutionary government to "the American people," so it presented the constitution favorably even though Article 27 threatened American-owned oil and mining companies; in 1938 President Cárdenas used it to nationalize Mexico\'s oil. In Russia the Bolsheviks promised "Land, bread" as rations fell (Document 2). John Reed, an American socialist who supported the revolution, had reason to stress the Bolsheviks\' appeal, but the Soviet state soon nationalized industry and, under Stalin, adopted Five-Year Plans. Sun Yat-sen proposed a mixed economy: private enterprise for most matters, but monopolies "taken up as national undertakings," so as "to make capitalism create socialism in China" (Document 4). Because Sun addressed foreign governments and bankers, he emphasized that their capital would be repaid; his goal of national development without foreign domination was shared by many anticolonial leaders.\n\nNot every critic of the old order wanted a stronger state. Gandhi blamed "the East India Company" for destroying India\'s hand-spinning industry and called Swadeshi a solution to "India\'s grinding poverty" (Document 3). Writing in Young India for supporters of the noncooperation movement, Gandhi wanted to persuade Indians to boycott British cloth and spin their own, so his program relied on village self-help rather than government planning. After independence, however, Nehru chose state-led industrialization through Five-Year Plans, showing that the idea of an active developmental state proved stronger than Gandhi\'s alternative.\n\nDuring the Cold War, the debate became a contest between political systems. Truman contrasted communism, which required "the rule of strong masters," with democracy, based on the right "to govern himself" (Document 5). Speaking in 1949 to rally Americans and allies behind containment, Truman painted the contrast starkly, yet his administration was spending billions in public money on the Marshall Plan. Across the decolonizing world, states such as Nasser\'s Egypt, which nationalized the Suez Canal in 1956, also kept a strong economic role.\n\nAfter 1975, confidence in the state declined. Reagan declared that "government is not the solution to our problem" and promised to remove "roadblocks" to the economy (Document 6). He spoke after a decade of inflation, and his address was meant to justify tax cuts and deregulation. Similar ideas shaped Margaret Thatcher\'s privatizations in Britain and Deng Xiaoping\'s market reforms in China. Yet by 2000, Clinton urged "rule-based trade" that would not tolerate "a race to the bottom" in the environment and worker protection (Document 7). Speaking soon after the protests at the WTO meeting in Seattle, he had a political reason to show he took critics seriously, and his position shows that even leaders who praised markets assigned governments the job of setting rules.\n\nIn conclusion, ideas about government moved from confidence in state ownership and planning, voiced in Mexico, Russia, and China after 1917, toward greater trust in markets after 1980, but governments never stopped regulating and setting the terms of exchange, so the change was real but incomplete.',
    modelNotes: [
      {
        label: "Contextualization",
        text: "The first paragraph describes the limited economic role of industrial governments before 1914, colonial economies, and the effects of the First World War, revolution, nationalism, and the Depression.",
      },
      {
        label: "Thesis",
        text: "The thesis answers the question of extent and previews a pattern of change with limits.",
      },
      {
        label: "Evidence from the documents",
        text: "All seven documents are used as evidence, grouped by period and argument.",
      },
      {
        label: "Evidence beyond the documents",
        text: "Cárdenas's oil nationalization, the Soviet Five-Year Plans, Nehru's Five-Year Plans, the Marshall Plan, the nationalization of the Suez Canal, Thatcher's privatizations, and Deng Xiaoping's reforms are specific evidence not found in the documents.",
      },
      {
        label: "Sourcing",
        text: "The essay explains the purpose of the Washington journal that published the Mexican constitution, Reed's sympathies, Sun's foreign audience, Gandhi's readers and purpose, Truman's Cold War audience, Reagan's response to inflation, and Clinton's political situation after the Seattle protests.",
      },
      {
        label: "Complexity",
        text: "The essay qualifies the claim of a shift toward markets by showing Gandhi's alternative to state planning and the continuing role of rules in Clinton's address, and it compares ideas in Latin America, Russia, South Asia, East Asia, and the United States.",
      },
    ],
    alternateModel:
      "A different strong essay could argue that the sharpest divide was between colonized or developing countries and industrial powers, grouping Documents 1, 3, and 4 as nationalist programs that used economic policy to escape foreign control and Documents 2, 5, 6, and 7 as arguments among the great powers about planning and markets.",
    commonErrors: [
      "Treating Gandhi's call for hand-spinning as a demand for government ownership; he wanted Indians to boycott British cloth and produce their own.",
      "Generalizing about the whole world after 1945 from three American presidential speeches without outside evidence from other regions.",
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

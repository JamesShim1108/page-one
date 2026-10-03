// Public-domain primary-source excerpts used as question and DBQ stimuli.
//
// Rules for this file:
// - Quote the named edition exactly. Mark omissions with " . . . " and keep
//   each quoted run contiguous in the original.
// - Words in [square brackets] are either the translator's own brackets or an
//   editorial substitution. Every substitution is listed in `edits`, and
//   scripts/verify-excerpts.mjs checks each run against the full source text.
// - Spelling, punctuation, and capitalization stay as printed. Diacritical
//   marks in Gibb's transliterations are omitted.
//
// Editions: Yule–Cordier Marco Polo (1903) and Payne's Decameron (1886) are
// verified against their Project Gutenberg texts. Gibb's Ibn Battuta (1929) is
// verified against the Internet Archive scan (travelsinasiaafr0000ibnb).

const polo = {
  citationBase:
    "The Book of Ser Marco Polo, trans. Henry Yule, rev. Henri Cordier, 3rd ed. (London: John Murray, 1903)",
  attributionBase:
    "Marco Polo, Venetian merchant who traveled in Mongol-ruled Asia c. 1271–1295, account dictated to the writer Rustichello of Pisa, c. 1298",
};

const gibb =
  "Ibn Battuta, Travels in Asia and Africa, 1325–1354, trans. H. A. R. Gibb (London: George Routledge & Sons, 1929)";

const battutaAttribution =
  "Ibn Battuta, Muslim legal scholar from Morocco who traveled c. 1325–1354, account dictated to the writer Ibn Juzayy, 1355";

export const excerpts = {
  poloPaperMoney: {
    id: "polo-paper-money",
    type: "source",
    sourceType: "primary",
    attribution: `${polo.attributionBase}, describing Yuan China`,
    citation: `${polo.citationBase}, vol. 1, Book II, ch. 24. Project Gutenberg eBook #10636.`,
    note: "In this translation, “the Great Kaan” and “the Emperor” refer to Kublai Khan.",
    text: "With these pieces of paper, made as I have described, he causes all payments on his own account to be made; and he makes them to pass current universally over all his kingdoms and provinces and territories, and whithersoever his power and sovereignty extends. And nobody, however important he may think himself, dares to refuse them on pain of death. . . .\n\nFurthermore all merchants arriving from India or other countries, and bringing with them gold or silver or gems and pearls, are prohibited from selling to any one but the Emperor. . . . The merchants accept his price readily, for in the first place they would not get so good an one from anybody else, and secondly they are paid without any delay. And with this paper-money they can buy what they like anywhere over the Empire, whilst it is also vastly lighter to carry about on their journeys.",
  },
  poloPostStations: {
    id: "polo-post-stations",
    type: "source",
    sourceType: "primary",
    attribution: `${polo.attributionBase}, describing Yuan China`,
    citation: `${polo.citationBase}, vol. 1, Book II, ch. 26. Project Gutenberg eBook #10636.`,
    note: "Cambaluc was the Yuan capital, present-day Beijing. “Yamb” is a version of the Mongol word yam.",
    text: 'And the messengers of the Emperor in travelling from Cambaluc, be the road whichsoever they will, find at every twenty-five miles of the journey a station which they call Yamb, or, as we should say, the "Horse-Post-House." . . . And in this way the Emperor, who has an immense number of these runners, receives despatches with news from places ten days\' journey off in one day and night . . . .\n\nNow all these numbers of post-horses cost the Emperor nothing at all; and I will tell you the how and the why. Every city, or village, or hamlet, that stands near one of those post-stations, has a fixed demand made on it for as many horses as it can supply, and these it must furnish to the post.',
  },
  poloCambalucTrade: {
    id: "polo-cambaluc-trade",
    type: "source",
    sourceType: "primary",
    attribution: `${polo.attributionBase}, describing the Yuan capital`,
    citation: `${polo.citationBase}, vol. 1, Book II, ch. 22. Project Gutenberg eBook #10636.`,
    note: "Cambaluc was the Yuan capital, present-day Beijing. Yule placed in brackets passages found only in some manuscripts.",
    text: "In those suburbs lodge the foreign merchants and travellers, of whom there are always great numbers who have come to bring presents to the Emperor, or to sell articles at Court, or because the city affords so good a mart to attract traders. [There are in each of the suburbs, to a distance of a mile from the city, numerous fine hostelries for the lodgment of merchants from different parts of the world, and a special hostelry is assigned to each description of people, as if we should say there is one for the Lombards, another for the Germans, and a third for the Frenchmen.] . . .\n\nAs a sample, I tell you, no day in the year passes that there do not enter the city 1000 cart-loads of silk alone, from which are made quantities of cloth of silk and gold, and of other goods.",
  },
  poloZayton: {
    id: "polo-zayton",
    type: "source",
    sourceType: "primary",
    attribution: `${polo.attributionBase}, describing the port of Quanzhou in southern China`,
    citation: `${polo.citationBase}, vol. 2, Book II, ch. 82. Project Gutenberg eBook #12410.`,
    note: "Zayton is Quanzhou. “The Great Kaan” is Kublai Khan. Christendom means Christian Europe.",
    text: "At this city you must know is the Haven of Zayton, frequented by all the ships of India, which bring thither spicery and all other kinds of costly wares. . . . And I assure you that for one shipload of pepper that goes to Alexandria or elsewhere, destined for Christendom, there come a hundred such, aye and more too, to this haven of Zayton; for it is one of the two greatest havens in the world for commerce.\n\nThe Great Kaan derives a very large revenue from the duties paid in this city and haven; for you must know that on all the merchandize imported, including precious stones and pearls, he levies a duty of ten per cent., or in other words takes tithe of everything.",
  },
  poloMelibar: {
    id: "polo-melibar",
    type: "source",
    sourceType: "primary",
    attribution: `${polo.attributionBase}, describing the Malabar coast of southwestern India`,
    citation: `${polo.citationBase}, vol. 2, Book III, ch. 25. Project Gutenberg eBook #12410.`,
    note: "Melibar is Malabar; Gozurat is Gujarat; Manzi is southern China.",
    text: "And you must know that from this kingdom of Melibar, and from another near it called Gozurat, there go forth every year more than a hundred corsair vessels on cruize. . . . But now the merchants are aware of this, and go so well manned and armed, and with such great ships, that they don't fear the corsairs. . . .\n\nShips come hither from many quarters, but especially from the great province of Manzi. Coarse spices are exported hence both to Manzi and to the west, and that which is carried by the merchants to Aden goes on to Alexandria, but the ships that go in the latter direction are not one to ten of those that go to the eastward",
  },
  poloFourProphets: {
    id: "polo-four-prophets",
    type: "source",
    sourceType: "primary",
    attribution:
      "Passage attributed to Marco Polo that appears only in Giovanni Battista Ramusio's Italian edition of Polo's book, published in Venice in 1559, describing Kublai Khan's court",
    citation: `${polo.citationBase}, vol. 1, Book II, ch. 6, note 1 (Yule's translation of Ramusio). Project Gutenberg eBook #10636.`,
    note: "Saracens means Muslims. “Idolaters” was the translator's term for Buddhists. Bracketed words are Yule's.",
    text: "On being asked why, he said: 'There are Four Prophets worshipped and revered by all the world. The Christians say their God is Jesus Christ; the Saracens, Mahommet; the Jews, Moses; the Idolaters, Sogomon Borcan [Sakya-Muni Burkhan or Buddha], who was the first god among the idols; and I worship and pay respect to all four, and pray that he among them who is greatest in heaven in very truth may aid me.' But the Great Khan let it be seen well enough that he held the Christian Faith to be the truest and best",
  },
  poloRoadsClosed: {
    id: "polo-roads-closed",
    type: "source",
    sourceType: "primary",
    attribution:
      "Passage attributed to Marco Polo in Giovanni Battista Ramusio's 1559 edition, describing envoys escorting a Mongol bride from Kublai Khan's court to the Ilkhan ruler of Persia, c. 1290",
    citation: `${polo.citationBase}, vol. 1, Prologue, ch. 17, note 3 (Yule's translation of Ramusio). Project Gutenberg eBook #10636.`,
    note: "King Argon was Arghun, the Mongol Ilkhan of Persia.",
    text: "So everything being ready, with a great escort to do honour to the bride of King Argon, the Ambassadors took leave and set forth. But after travelling eight months by the same way that they had come, they found the roads closed, in consequence of wars lately broken out among certain Tartar Princes; so being unable to proceed, they were compelled to return to the Court of the Great Kaan.",
  },
  poloTartarCustoms: {
    id: "polo-tartar-customs",
    type: "source",
    sourceType: "primary",
    attribution: `${polo.attributionBase}, describing Mongol pastoral life`,
    citation: `${polo.citationBase}, vol. 1, Book I, ch. 52. Project Gutenberg eBook #10636.`,
    note: "Tartars was a common European name for the Mongols.",
    text: "The Tartar custom is to spend the winter in warm plains, where they find good pasture for their cattle, whilst in summer they betake themselves to a cool climate among the mountains and valleys, where water is to be found as well as woods and pastures.\n\nTheir houses are circular, and are made of wands covered with felts. These are carried along with them whithersoever they go . . . . The women do the buying and selling, and whatever is necessary to provide for the husband and household; for the men all lead the life of gentlemen, troubling themselves about nothing but hunting and hawking, and looking after their goshawks and falcons, unless it be the practice of warlike exercises.",
  },
  battutaMali: {
    id: "battuta-mali",
    type: "source",
    sourceType: "primary",
    attribution: `${battutaAttribution}, describing his stay in the Mali Empire, 1352–1353`,
    citation: `${gibb}, ch. 14. Checked against Internet Archive scan travelsinasiaafr0000ibnb, scan pp. 351–352.`,
    note: "Bracketed words replace the translator's dated term for West Africans. “White men” refers to North African and Arab visitors and merchants.",
    edits: [{ shown: "[The people of Mali]", original: "The negroes" }],
    text: "[The people of Mali] possess some admirable qualities. They are seldom unjust, and have a greater abhorrence of injustice than any other people. Their sultan shows no mercy to anyone who is guilty of the least act of it. There is complete security in their country. Neither traveller nor inhabitant in it has anything to fear from robbers or men of violence. They do not confiscate the property of any white man who dies in their country, even if it be uncounted wealth. On the contrary, they give it into the charge of some trustworthy person among the whites, until the rightful heir takes possession of it. They are careful to observe the hours of prayer, and assiduous in attending them in congregations, and in bringing up their children to them. . . .\n\nYet another is their zeal for learning the Koran by heart. . . . Among their bad qualities are the following. . . . Then there is their custom of putting dust and ashes on their heads, as a mark of respect, and the grotesque ceremonies we have described when the poets recite their verses.",
  },
  battutaTaghaza: {
    id: "battuta-taghaza",
    type: "source",
    sourceType: "primary",
    attribution: `${battutaAttribution}, describing his journey south across the Sahara toward Mali, 1352`,
    citation: `${gibb}, ch. 14. Checked against Internet Archive scan travelsinasiaafr0000ibnb, scan p. 339.`,
    note: "Bracketed words replace the translator's dated terms for West Africa and West Africans. Sijilmasa was a Moroccan caravan city; the Massufa were a Berber group.",
    edits: [
      { shown: "[West Africa]", original: "the Negrolands" },
      { shown: "[West Africans]", original: "The negroes" },
    ],
    text: "After twenty-five days we reached Taghaza, an unattractive village, with the curious feature that its houses and mosques are built of blocks of salt, roofed with camel skins. There are no trees there, nothing but sand. In the sand is a salt mine; they dig for the salt, and find it in thick slabs, lying one on top of the other, as though they had been tool-squared and laid under the surface of the earth. . . . A camel will carry two of these slabs. No one lives at Taghaza except the slaves of the Massufa tribe, who dig for the salt; they subsist on dates imported from Dar'a and Sijilmasa, camels' flesh, and millet imported from [West Africa]. [West Africans] come up from their country and take away the salt from there.",
  },
  battutaSwahili: {
    id: "battuta-swahili",
    type: "source",
    sourceType: "primary",
    attribution: `${battutaAttribution}, describing the East African coast, c. 1331`,
    citation: `${gibb}, ch. 4. Checked against Internet Archive scan travelsinasiaafr0000ibnb, scan p. 130.`,
    note: "Bracketed place names are Gibb's. The Sawahil is the Swahili coast; Kulwa is Kilwa; Sufala is Sofala, in present-day Mozambique.",
    text: "We came to Mambasa [Mombasa], a large island two days' journey by sea from the Sawahil country. It possesses no territory on the mainland. They have fruit trees on the island, but no cereals, which have to be brought to them from the Sawahil. Their food consists chiefly of bananas and fish. The inhabitants are pious, honourable, and upright, and they have well-built wooden mosques. . . .\n\nI was told by a merchant that the town of Sufala lies a fortnight's journey [south] from Kulwa, and that gold dust is brought to Sufala from Yufi in the country of the Limis, which is a month's journey distant from it. Kulwa is a very fine and substantially built town, and all its buildings are of wood.",
  },
  battutaZaytun: {
    id: "battuta-zaytun",
    type: "source",
    sourceType: "primary",
    attribution: `${battutaAttribution}, describing his arrival at Quanzhou, China, c. 1345`,
    citation: `${gibb}, ch. 12. Checked against Internet Archive scan travelsinasiaafr0000ibnb, scan p. 310.`,
    note: "Zaytun is Quanzhou. A qadi is a Muslim judge. Tabriz is a city in northwestern Iran.",
    text: 'I received visits from the qadi of the Muslims, the shaykh al-Islam, and the principal merchants. Amongst the latter was Sharaf ad-Din of Tabriz, one of the merchants from whom I had borrowed at the time of my arrival in India, and the one who had treated me most fairly. He knew the Koran by heart and used to recite it constantly. These merchants, living as they do in a land of infidels, are overjoyed when a Muslim comes to them. They say "He has come from the land of Islam," and they make him the recipient of the tithes on their properties, so that he becomes as rich as themselves.',
  },
  battutaHinawr: {
    id: "battuta-hinawr",
    type: "source",
    sourceType: "primary",
    attribution: `${battutaAttribution}, describing the port of Honavar on India's southwestern coast, c. 1342`,
    citation: `${gibb}, ch. 8. Checked against Internet Archive scan travelsinasiaafr0000ibnb, scan p. 252.`,
    note: "Bracketed place names are Gibb's. “Haryab” is usually identified as Harihara, ruler of the Vijayanagara kingdom.",
    edits: [{ shown: "[The women of this town]", original: "They" }],
    text: "Next day we reached the town of Hinawr [Honavar, Onore], which is on a large inlet navigable for large ships. . . . [The women of this town] are beautiful and virtuous, and each wears a gold ring in her nose. One peculiarity amongst them is that they all know the Koran by heart. I saw in the town thirteen schools for girls and twenty-three for boys, a thing which I have never seen elsewhere. Its inhabitants live by maritime commerce, and have no cultivated land. The ruler of Hinawr is Sultan Jalal ad-Din, who is one of the best and most powerful sultans. He is under the suzerainty of an infidel sultan named Haryab",
  },
  boccaccioArrival: {
    id: "boccaccio-arrival",
    type: "source",
    sourceType: "primary",
    attribution:
      "Giovanni Boccaccio, Florentine writer, introduction to The Decameron, a collection of stories completed c. 1353",
    citation:
      "The Decameron of Giovanni Boccaccio, trans. John Payne (London: Villon Society, 1886), First Day, introduction. Project Gutenberg eBook #23700.",
    note: "Bracketed words are the translator's. Payne's 1886 English imitates older usage.",
    text: "I say, then, that the years [of the era] of the fruitful Incarnation of the Son of God had attained to the number of one thousand three hundred and forty-eight, when into the notable city of Florence, fair over every other of Italy, there came the death-dealing pestilence, which, through the operation of the heavenly bodies or of our own iniquitous dealings, being sent down upon mankind for our correction by the just wrath of God, had some years before appeared in the parts of the East and after having bereft these latter of an innumerable number of inhabitants, extending without cease from one place to another, had now unhappily spread towards the West.",
  },
  boccaccioSociety: {
    id: "boccaccio-society",
    type: "source",
    sourceType: "primary",
    attribution:
      "Giovanni Boccaccio, Florentine writer, introduction to The Decameron, completed c. 1353, describing Florence and its countryside during the plague of 1348",
    citation:
      "The Decameron of Giovanni Boccaccio, trans. John Payne (London: Villon Society, 1886), First Day, introduction. Project Gutenberg eBook #23700.",
    note: "Husbandmen are farmers. Payne's 1886 English imitates older usage.",
    text: "By reason whereof there remained unto those (and the number of them, both males and females, was incalculable) who fell sick, none other succour than that which they owed either to the charity of friends (and of these there were few) or the greed of servants, who tended them, allured by high and extravagant wage . . . .\n\nthroughout the scattered villages and in the fields, the poor and miserable husbandmen and their families, without succour of physician or aid of servitor, died, not like men, but well nigh like beasts, by the ways or in their tillages or about the houses, indifferently by day and night. . . . the oxen, the asses, the sheep, the goats, the swine, the fowls, nay, the very dogs, so faithful to mankind, being driven forth of their own houses, went straying at their pleasure about the fields, where the very corn was abandoned, without being cut, much less gathered in",
  },

  // Practice passages written by Page One. They summarize widely accepted
  // scholarship in original words and are labeled as practice passages when
  // shown. They are not quotations and are not checked by verify-excerpts.mjs.
  originalMusaLegacy: {
    id: "original-musa-legacy",
    type: "source",
    sourceType: "original",
    attribution:
      "Practice passage written for Page One, summarizing how historians interpret Mansa Musa's reign",
    text: "Historians often treat Mansa Musa's pilgrimage to Mecca in 1324–1325 as a turning point in how the wider Islamic world viewed West Africa. Writers in Cairo later recorded that his large company spent and gave away so much gold that its value there stayed lower for years. After his return, Musa sponsored mosques and Islamic scholarship in cities such as Timbuktu.\n\nYet historians also caution against reading Mali's power through one ruler's wealth. The empire rested on farming, tribute from subject peoples, and control of the routes that linked gold fields, salt sources, and Saharan markets. Many people in the empire continued local religious practices alongside, or instead of, Islam.",
  },
  originalCulturalDiffusion: {
    id: "original-cultural-diffusion",
    type: "source",
    sourceType: "original",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe cultural exchange in Afro-Eurasia, c. 1200–1450",
    text: "Historians increasingly describe cultural exchange in this period as translation rather than transfer. When Persian astronomers worked at the Yuan court, when Arabic medical texts circulated in Latin translation, or when Swahili towns built coral-stone mosques, the receiving society did not simply copy what arrived. People selected what was useful, reinterpreted it through existing beliefs and institutions, and often produced something new.\n\nThis view shifts attention from the ideas themselves to the people who carried them: merchants, scholars, pilgrims, and officials whose movement depended on trade routes and the policies of rulers.",
  },
  originalCropDiffusion: {
    id: "original-crop-diffusion",
    type: "source",
    sourceType: "original",
    attribution:
      "Practice passage written for Page One, summarizing how historians explain crop diffusion, c. 1000–1450",
    text: "Champa rice, a fast-ripening variety from mainland Southeast Asia, was promoted by the Song government in the early 1000s, and its spread in southern China allowed some farmers to harvest more than once a year. Bananas, first domesticated in Southeast Asia and New Guinea, had spread across the Indian Ocean to Africa well before this period and became staple foods in parts of East Africa.\n\nIn both cases historians stress that a crop's arrival did not determine its effect. Farmers had to adapt planting methods, water management, and labor to local conditions, and the crops' impact varied widely from one region to another.",
  },
  originalNetworkComparison: {
    id: "original-network-comparison",
    type: "source",
    sourceType: "original",
    attribution:
      "Practice passage written for Page One, comparing three Afro-Eurasian trade networks, c. 1200–1450",
    text: "The Silk Roads, the Indian Ocean, and the trans-Saharan routes are often taught as separate systems, but merchants and goods moved among them. Gold from West Africa crossed the Sahara to North African and Egyptian markets that also traded with the Indian Ocean. Chinese porcelain reached East African ports by sea, while Chinese silk moved west by both land and sea.\n\nWhat distinguished the networks was less what they connected than how. Desert crossings depended on camels, oases, and the knowledge of guides; maritime routes depended on the monsoon calendar and port cities where ships waited for the winds to change. These conditions shaped which goods traveled, which cities grew, and which rulers could profit.",
  },
  originalMongolInterpretation: {
    id: "original-mongol-interpretation",
    type: "source",
    sourceType: "original",
    attribution:
      "Practice passage written for Page One, summarizing how historians' interpretations of the Mongol Empire have changed",
    text: "Historians once described the Mongols chiefly as destroyers, emphasizing the massacres at cities that resisted, such as Baghdad in 1258. More recent scholarship has stressed what the Mongols built: relay stations for official travel, protection for merchants, and the movement of artisans, physicians, and astronomers between courts from China to Persia. In this view, Mongol rule left Eurasia more connected than ever before.\n\nThese two pictures are not opposites. The same empire that destroyed cities also moved their surviving craftsmen to new capitals, and the security merchants enjoyed was built on overwhelming violence. A convincing account of the Mongols has to hold both together.",
  },
};

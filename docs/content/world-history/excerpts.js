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
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution: `${polo.attributionBase}, describing Yuan China`,
    citation: `${polo.citationBase}, vol. 1, Book II, ch. 24. Project Gutenberg eBook #10636.`,
    note: "In this translation, “the Great Kaan” and “the Emperor” refer to Kublai Khan.",
    text: "With these pieces of paper, made as I have described, he causes all payments on his own account to be made; and he makes them to pass current universally over all his kingdoms and provinces and territories, and whithersoever his power and sovereignty extends. And nobody, however important he may think himself, dares to refuse them on pain of death. . . .\n\nFurthermore all merchants arriving from India or other countries, and bringing with them gold or silver or gems and pearls, are prohibited from selling to any one but the Emperor. . . . The merchants accept his price readily, for in the first place they would not get so good an one from anybody else, and secondly they are paid without any delay. And with this paper-money they can buy what they like anywhere over the Empire, whilst it is also vastly lighter to carry about on their journeys.",
  },
  poloPostStations: {
    id: "polo-post-stations",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution: `${polo.attributionBase}, describing Yuan China`,
    citation: `${polo.citationBase}, vol. 1, Book II, ch. 26. Project Gutenberg eBook #10636.`,
    note: "Cambaluc was the Yuan capital, present-day Beijing. “Yamb” is a version of the Mongol word yam.",
    text: 'And the messengers of the Emperor in travelling from Cambaluc, be the road whichsoever they will, find at every twenty-five miles of the journey a station which they call Yamb, or, as we should say, the "Horse-Post-House." . . . And in this way the Emperor, who has an immense number of these runners, receives despatches with news from places ten days\' journey off in one day and night . . . .\n\nNow all these numbers of post-horses cost the Emperor nothing at all; and I will tell you the how and the why. Every city, or village, or hamlet, that stands near one of those post-stations, has a fixed demand made on it for as many horses as it can supply, and these it must furnish to the post.',
  },
  poloCambalucTrade: {
    id: "polo-cambaluc-trade",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution: `${polo.attributionBase}, describing the Yuan capital`,
    citation: `${polo.citationBase}, vol. 1, Book II, ch. 22. Project Gutenberg eBook #10636.`,
    note: "Cambaluc was the Yuan capital, present-day Beijing. Yule placed in brackets passages found only in some manuscripts.",
    text: "In those suburbs lodge the foreign merchants and travellers, of whom there are always great numbers who have come to bring presents to the Emperor, or to sell articles at Court, or because the city affords so good a mart to attract traders. [There are in each of the suburbs, to a distance of a mile from the city, numerous fine hostelries for the lodgment of merchants from different parts of the world, and a special hostelry is assigned to each description of people, as if we should say there is one for the Lombards, another for the Germans, and a third for the Frenchmen.] . . .\n\nAs a sample, I tell you, no day in the year passes that there do not enter the city 1000 cart-loads of silk alone, from which are made quantities of cloth of silk and gold, and of other goods.",
  },
  poloZayton: {
    id: "polo-zayton",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution: `${polo.attributionBase}, describing the port of Quanzhou in southern China`,
    citation: `${polo.citationBase}, vol. 2, Book II, ch. 82. Project Gutenberg eBook #12410.`,
    note: "Zayton is Quanzhou. “The Great Kaan” is Kublai Khan. Christendom means Christian Europe.",
    text: "At this city you must know is the Haven of Zayton, frequented by all the ships of India, which bring thither spicery and all other kinds of costly wares. . . . And I assure you that for one shipload of pepper that goes to Alexandria or elsewhere, destined for Christendom, there come a hundred such, aye and more too, to this haven of Zayton; for it is one of the two greatest havens in the world for commerce.\n\nThe Great Kaan derives a very large revenue from the duties paid in this city and haven; for you must know that on all the merchandize imported, including precious stones and pearls, he levies a duty of ten per cent., or in other words takes tithe of everything.",
  },
  poloMelibar: {
    id: "polo-melibar",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution: `${polo.attributionBase}, describing the Malabar coast of southwestern India`,
    citation: `${polo.citationBase}, vol. 2, Book III, ch. 25. Project Gutenberg eBook #12410.`,
    note: "Melibar is Malabar; Gozurat is Gujarat; Manzi is southern China.",
    text: "And you must know that from this kingdom of Melibar, and from another near it called Gozurat, there go forth every year more than a hundred corsair vessels on cruize. . . . But now the merchants are aware of this, and go so well manned and armed, and with such great ships, that they don't fear the corsairs. . . .\n\nShips come hither from many quarters, but especially from the great province of Manzi. Coarse spices are exported hence both to Manzi and to the west, and that which is carried by the merchants to Aden goes on to Alexandria, but the ships that go in the latter direction are not one to ten of those that go to the eastward",
  },
  poloFourProphets: {
    id: "polo-four-prophets",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
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
    source: "polo-yule-1903",
    amsco_review: "pending",
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
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution: `${polo.attributionBase}, describing Mongol pastoral life`,
    citation: `${polo.citationBase}, vol. 1, Book I, ch. 52. Project Gutenberg eBook #10636.`,
    note: "Tartars was a common European name for the Mongols.",
    text: "The Tartar custom is to spend the winter in warm plains, where they find good pasture for their cattle, whilst in summer they betake themselves to a cool climate among the mountains and valleys, where water is to be found as well as woods and pastures.\n\nTheir houses are circular, and are made of wands covered with felts. These are carried along with them whithersoever they go . . . . The women do the buying and selling, and whatever is necessary to provide for the husband and household; for the men all lead the life of gentlemen, troubling themselves about nothing but hunting and hawking, and looking after their goshawks and falcons, unless it be the practice of warlike exercises.",
  },
  battutaMali: {
    id: "battuta-mali",
    type: "source",
    sourceType: "primary",
    source: "battuta-gibb-1929",
    amsco_review: "pending",
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
    source: "battuta-gibb-1929",
    amsco_review: "pending",
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
    source: "battuta-gibb-1929",
    amsco_review: "pending",
    attribution: `${battutaAttribution}, describing the East African coast, c. 1331`,
    citation: `${gibb}, ch. 4. Checked against Internet Archive scan travelsinasiaafr0000ibnb, scan p. 130.`,
    note: "Bracketed place names are Gibb's. The Sawahil is the Swahili coast; Kulwa is Kilwa; Sufala is Sofala, in present-day Mozambique.",
    text: "We came to Mambasa [Mombasa], a large island two days' journey by sea from the Sawahil country. It possesses no territory on the mainland. They have fruit trees on the island, but no cereals, which have to be brought to them from the Sawahil. Their food consists chiefly of bananas and fish. The inhabitants are pious, honourable, and upright, and they have well-built wooden mosques. . . .\n\nI was told by a merchant that the town of Sufala lies a fortnight's journey [south] from Kulwa, and that gold dust is brought to Sufala from Yufi in the country of the Limis, which is a month's journey distant from it. Kulwa is a very fine and substantially built town, and all its buildings are of wood.",
  },
  battutaZaytun: {
    id: "battuta-zaytun",
    type: "source",
    sourceType: "primary",
    source: "battuta-gibb-1929",
    amsco_review: "pending",
    attribution: `${battutaAttribution}, describing his arrival at Quanzhou, China, c. 1345`,
    citation: `${gibb}, ch. 12. Checked against Internet Archive scan travelsinasiaafr0000ibnb, scan p. 310.`,
    note: "Zaytun is Quanzhou. A qadi is a Muslim judge. Tabriz is a city in northwestern Iran.",
    text: 'I received visits from the qadi of the Muslims, the shaykh al-Islam, and the principal merchants. Amongst the latter was Sharaf ad-Din of Tabriz, one of the merchants from whom I had borrowed at the time of my arrival in India, and the one who had treated me most fairly. He knew the Koran by heart and used to recite it constantly. These merchants, living as they do in a land of infidels, are overjoyed when a Muslim comes to them. They say "He has come from the land of Islam," and they make him the recipient of the tithes on their properties, so that he becomes as rich as themselves.',
  },
  battutaHinawr: {
    id: "battuta-hinawr",
    type: "source",
    sourceType: "primary",
    source: "battuta-gibb-1929",
    amsco_review: "pending",
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
    source: "boccaccio-payne-1886",
    amsco_review: "pending",
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
    source: "boccaccio-payne-1886",
    amsco_review: "pending",
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
    source:
      "CED Topic 2.4, KC-3.1.I.E.ii: expanding empires such as Mali drew new peoples and regions into trade networks",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians interpret Mansa Musa's reign",
    text: "Historians often treat Mansa Musa's pilgrimage to Mecca in 1324–1325 as a turning point in how the wider Islamic world viewed West Africa. Writers in Cairo later recorded that his large company spent and gave away so much gold that its value there stayed lower for years. After his return, Musa sponsored mosques and Islamic scholarship in cities such as Timbuktu.\n\nYet historians also caution against reading Mali's power through one ruler's wealth. The empire rested on farming, tribute from subject peoples, and control of the routes that linked gold fields, salt sources, and Saharan markets. Many people in the empire continued local religious practices alongside, or instead of, Islam.",
  },
  originalCulturalDiffusion: {
    id: "original-cultural-diffusion",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 2.5, KC-3.1.III.D: networks of exchange spread religious, scientific, and cultural traditions, which receiving societies adapted",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe cultural exchange in Afro-Eurasia, c. 1200–1450",
    text: "Historians increasingly describe cultural exchange in this period as translation rather than transfer. When Persian astronomers worked at the Yuan court, when Arabic medical texts circulated in Latin translation, or when Swahili towns built coral-stone mosques, the receiving society did not simply copy what arrived. People selected what was useful, reinterpreted it through existing beliefs and institutions, and often produced something new.\n\nThis view shifts attention from the ideas themselves to the people who carried them: merchants, scholars, pilgrims, and officials whose movement depended on trade routes and the policies of rulers.",
  },
  originalCropDiffusion: {
    id: "original-crop-diffusion",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 2.6, KC-3.1.IV: networks of exchange spread crops and pathogens, with uneven environmental effects",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians explain crop diffusion, c. 1000–1450",
    text: "Champa rice, a fast-ripening variety from mainland Southeast Asia, was promoted by the Song government in the early 1000s, and its spread in southern China allowed some farmers to harvest more than once a year. Bananas, first domesticated in Southeast Asia and New Guinea, had spread across the Indian Ocean to Africa well before this period and became staple foods in parts of East Africa.\n\nIn both cases historians stress that a crop's arrival did not determine its effect. Farmers had to adapt planting methods, water management, and labor to local conditions, and the crops' impact varied widely from one region to another.",
  },
  originalNetworkComparison: {
    id: "original-network-comparison",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 2.7, KC-3.1: growth and comparison of the Silk Roads, Indian Ocean, and trans-Saharan networks",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, comparing three Afro-Eurasian trade networks, c. 1200–1450",
    text: "The Silk Roads, the Indian Ocean, and the trans-Saharan routes are often taught as separate systems, but merchants and goods moved among them. Gold from West Africa crossed the Sahara to North African and Egyptian markets that also traded with the Indian Ocean. Chinese porcelain reached East African ports by sea, while Chinese silk moved west by both land and sea.\n\nWhat distinguished the networks was less what they connected than how. Desert crossings depended on camels, oases, and the knowledge of guides; maritime routes depended on the monsoon calendar and port cities where ships waited for the winds to change. These conditions shaped which goods traveled, which cities grew, and which rulers could profit.",
  },
  originalMongolInterpretation: {
    id: "original-mongol-interpretation",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 2.2, KC-3.2.II.A.ii: interregional contacts and conflicts, including those of the Mongols, encouraged significant technological and cultural transfers",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians' interpretations of the Mongol Empire have changed",
    text: "Historians once described the Mongols chiefly as destroyers, emphasizing the massacres at cities that resisted, such as Baghdad in 1258. More recent scholarship has stressed what the Mongols built: relay stations for official travel, protection for merchants, and the movement of artisans, physicians, and astronomers between courts from China to Persia. In this view, Mongol rule left Eurasia more connected than ever before.\n\nThese two pictures are not opposites. The same empire that destroyed cities also moved their surviving craftsmen to new capitals, and the security merchants enjoyed was built on overwhelming violence. A convincing account of the Mongols has to hold both together.",
  },
  // BEGIN unit-01
  poloKinsay: {
    id: "polo-kinsay",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution:
      "Marco Polo, Venetian merchant who traveled in Mongol-ruled Asia c. 1271–1295, account dictated to the writer Rustichello of Pisa, c. 1298, describing Hangzhou, the former Southern Song capital, soon after the Mongol conquest of 1276",
    citation:
      "The Book of Ser Marco Polo, trans. Henry Yule, rev. Henri Cordier, 3rd ed. (London: John Murray, 1903), vol. 2, Book II, ch. 76. Project Gutenberg eBook #12410.",
    note: "Kinsay is Hangzhou. Manzi is southern China. Bayan was the Mongol general who conquered the Southern Song; the Queen was the Song empress dowager. “The Great Kaan” is Kublai Khan.",
    text: "And since we have got thither I will enter into particulars about its magnificence; and these are well worth the telling, for the city is beyond dispute the finest and the noblest in the world. In this we shall speak according to the written statement which the Queen of this Realm sent to Bayan the conqueror of the country for transmission to the Great Kaan, in order that he might be aware of the surpassing grandeur of the city and might be moved to save it from destruction or injury. . . .\n\nThe document aforesaid also went on to state that there were in this city twelve guilds of the different crafts, and that each guild had 12,000 houses in the occupation of its workmen. . . . And yet all these craftsmen had full occupation, for many other cities of the kingdom are supplied from this city with what they require.\n\nThe document aforesaid also stated that the number and wealth of the merchants, and the amount of goods that passed through their hands, was so enormous that no man could form a just estimate thereof. . . .\n\nThe Kaan watches this city with especial diligence because it forms the head of all Manzi; and because he has an immense revenue from the duties levied on the transactions of trade therein, the amount of which is such that no one would credit it on mere hearsay.",
  },
  poloBaudas: {
    id: "polo-baudas",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution:
      "Marco Polo, Venetian merchant who traveled in Mongol-ruled Asia c. 1271–1295, account dictated to the writer Rustichello of Pisa, c. 1298, describing Baghdad",
    citation:
      "The Book of Ser Marco Polo, trans. Henry Yule, rev. Henri Cordier, 3rd ed. (London: John Murray, 1903), vol. 1, Book I, ch. 6. Project Gutenberg eBook #10636.",
    note: "Baudas is Baghdad. Saracens means Muslims. Alaue is Hulagu, brother of Kublai Khan, and the Calif was the Abbasid caliph. Baghdad fell to Hulagu in 1258; Polo gives the year as 1255.",
    text: "Baudas is a great city, which used to be the seat of the Calif of all the Saracens in the world, just as Rome is the seat of the Pope of all the Christians. A very great river flows through the city, and by this you can descend to the Sea of India. There is a great traffic of merchants with their goods this way . . . .\n\nIn Baudas they weave many different kinds of silk stuffs and gold brocades . . . . It is the noblest and greatest city in all those regions.\n\nNow it came to pass on a day in the year of Christ 1255, that the Lord of the Tartars of the Levant, whose name was Alaue, brother to the Great Kaan now reigning, gathered a mighty host and came up against Baudas and took it by storm. . . . Howbeit, since that time, there has been never another Calif, either at Baudas or anywhere else.",
  },
  poloFerlec: {
    id: "polo-ferlec",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution:
      "Marco Polo, Venetian merchant who traveled in Mongol-ruled Asia c. 1271–1295, account dictated to the writer Rustichello of Pisa, c. 1298, describing northern Sumatra, which he passed on his voyage home, c. 1292",
    citation:
      "The Book of Ser Marco Polo, trans. Henry Yule, rev. Henri Cordier, 3rd ed. (London: John Murray, 1903), vol. 2, Book III, ch. 9. Project Gutenberg eBook #12410.",
    note: "“Java the Less” is Sumatra. Ferlec is Perlak, on Sumatra's northern tip. Saracen means Muslim; “Idolaters” was the translator's term for followers of Buddhist and Hindu traditions. Bracketed words replace “This” at the start of a sentence about the next kingdom.",
    edits: [
      {
        shown: "[Basma]",
        original: "This",
      },
    ],
    text: "You see there are upon it eight kingdoms and eight crowned kings. The people are all Idolaters, and every kingdom has a language of its own. The Island hath great abundance of treasure, with costly spices, lign-aloes and spikenard and many others that never come into our parts. . . .\n\nThis kingdom, you must know, is so much frequented by the Saracen merchants that they have converted the natives to the Law of Mahommet--I mean the townspeople only . . . .\n\n[Basma] also is an independent kingdom, and the people have a language of their own . . . . They call themselves subjects of the Great Kaan, but they pay him no tribute; indeed they are so far away that his men could not go thither. Still all these Islanders declare themselves to be his subjects, and sometimes they send him curiosities as presents.",
  },
  poloSeilan: {
    id: "polo-seilan",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution:
      "Marco Polo, Venetian merchant who traveled in Mongol-ruled Asia c. 1271–1295, account dictated to the writer Rustichello of Pisa, c. 1298, describing Adam's Peak in Sri Lanka",
    citation:
      "The Book of Ser Marco Polo, trans. Henry Yule, rev. Henri Cordier, 3rd ed. (London: John Murray, 1903), vol. 2, Book III, ch. 15. Project Gutenberg eBook #12410.",
    note: "Seilan is Sri Lanka. Sagamoni Borcan is Shakyamuni Buddha; “Idolaters” was the translator's term for Buddhists. Saracens means Muslims. Gallicia is Galicia, in Spain, where Christians visited the shrine of Saint James.",
    text: "Furthermore you must know that in the Island of Seilan there is an exceeding high mountain . . . . And I tell you they say that on this mountain is the sepulchre of Adam our first parent; at least that is what the Saracens say. But the Idolaters say that it is the sepulchre of SAGAMONI BORCAN, before whose time there were no idols. They hold him to have been the best of men, a great saint in fact, according to their fashion, and the first in whose name idols were made. . . .\n\nThe Idolaters come thither on pilgrimage from very long distances and with great devotion, just as Christians go to the shrine of Messer Saint James in Gallicia. . . . But the Saracens also come thither on pilgrimage in great numbers, and they say that it is the sepulchre of Adam our first father, and that the teeth, and the hair, and the dish were those of Adam.",
  },
  poloAbash: {
    id: "polo-abash",
    type: "source",
    sourceType: "primary",
    source: "polo-yule-1903",
    amsco_review: "pending",
    attribution:
      "Marco Polo, Venetian merchant who traveled in Mongol-ruled Asia c. 1271–1295, account dictated to the writer Rustichello of Pisa, c. 1298, describing the Christian kingdom of Ethiopia from reports he heard in Indian Ocean ports",
    citation:
      "The Book of Ser Marco Polo, trans. Henry Yule, rev. Henri Cordier, 3rd ed. (London: John Murray, 1903), vol. 2, Book III, ch. 35. Project Gutenberg eBook #12410.",
    note: "Abash is Abyssinia (Ethiopia); Polo, like many Europeans, called distant lands a part of “India.” Saracens means Muslims. Aden is a port in Yemen. Polo did not visit Ethiopia.",
    text: "Abash is a very great Province, and you must know that it constitutes the MIDDLE INDIA; and it is on the mainland. There are in it six great Kings with six great Kingdoms; and of these six Kings there are three that are Christians and three that are Saracens; but the greatest of all the six is a Christian, and all the others are subject to him. . . .\n\nThe people here are excellent soldiers, and they go on horseback, for they have horses in plenty. Well they may; for they are in daily war with the Soldan of ADEN, and with the Nubians, and a variety of other nations. . . .\n\nYou must know that this Christian King, who is the Lord of the Province of Abash, declared his intention to go on pilgrimage to Jerusalem to adore the Holy Sepulchre of Our Lord God Jesus Christ the Saviour. But his Barons said that for him to go in person would be to run too great a risk; and they recommended him to send some bishop or prelate in his stead.",
  },
  boccaccioLaws: {
    id: "boccaccio-laws",
    type: "source",
    sourceType: "primary",
    source: "boccaccio-payne-1886",
    amsco_review: "pending",
    attribution:
      "Giovanni Boccaccio, Florentine writer, introduction to The Decameron, completed c. 1353, describing Florence during the plague of 1348",
    citation:
      "The Decameron of Giovanni Boccaccio, trans. John Payne (London: Villon Society, 1886), First Day, introduction. Project Gutenberg eBook #23700.",
    note: "Bracketed words are the translator's. Payne's 1886 English imitates older usage; “recking of nought” means caring about nothing.",
    text: "In this sore affliction and misery of our city, the reverend authority of the laws, both human and divine, was all in a manner dissolved and fallen into decay, for [lack of] the ministers and executors thereof, who, like other men, were all either dead or sick or else left so destitute of followers that they were unable to exercise any office, wherefore every one had license to do whatsoever pleased him. . . .\n\nSome were of a more barbarous, though, peradventure, a surer way of thinking, avouching that there was no remedy against pestilences better than--no, nor any so good as--to flee before them; wherefore, moved by this reasoning and recking of nought but themselves, very many, both men and women, abandoned their own city, their own houses and homes, their kinsfolk and possessions, and sought the country seats of others, or, at the least, their own . . . .",
  },
  originalSongExams: {
    id: "original-song-exams",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.1, KC-3.2.I.A: the Song Dynasty used traditional methods of Confucianism and an imperial bureaucracy to maintain and justify its rule",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe government in Song China, 960–1279",
    text: "Song emperors relied on officials chosen largely through written examinations on the Confucian classics. The number of degree holders grew far beyond the number of government posts, so many educated men served as local teachers, managers, and community leaders instead. Their shared training spread a common set of values about loyalty, family duty, and proper hierarchy.\n\nHistorians note that the system was more open than rule by hereditary aristocrats, but it was not equal. Years of study required books and tutors, so most successful candidates came from families with land or commercial wealth. Women could not sit for the examinations at all.",
  },
  originalEastAsiaAdaptation: {
    id: "original-east-asia-adaptation",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.1, KC-3.1.III.D.i: Chinese cultural traditions continued, and they influenced neighboring regions",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, comparing how Korea and Japan adapted Chinese models, c. 1200–1450",
    text: "Korean courts adopted Chinese-style civil service examinations and Confucian ideas about family and government, yet aristocratic families kept a strong hold on high office. In Japan, the court in Kyoto had earlier borrowed Chinese writing, Buddhist learning, and bureaucratic titles. By the late 1100s, however, real power had shifted to warrior families, and the shogun in Kamakura governed through warrior vassals rather than examination-selected scholars.\n\nIn both societies, borrowing from China was selective. Local elites kept the features that strengthened their own position and reshaped or ignored the rest.",
  },
  originalTurkicStates: {
    id: "original-turkic-states",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.2, KC-3.2.I: as the Abbasid Caliphate fragmented, new Islamic political entities emerged, most of which were dominated by Turkic peoples",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the rise of military states in Dar al-Islam, c. 1000–1450",
    text: "By the eleventh century the Abbasid caliph in Baghdad had lost most of his practical power. Seljuk Turks took control of much of Southwest Asia and ruled as sultans while leaving the caliph as a religious figurehead. In Egypt, the Mamluks, soldiers originally purchased as enslaved boys and trained for war, seized power in 1250 and defeated a Mongol army at Ayn Jalut in 1260. In northern India, Turkic commanders founded the Delhi Sultanate in 1206.\n\nThese states were governed by military elites who were often culturally different from the populations they ruled. They gained legitimacy by defending Muslim lands, supporting religious scholars, and building mosques and schools.",
  },
  originalIslamicScholarship: {
    id: "original-islamic-scholarship",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.2, KC-3.2.II.A.i: Muslim states and empires encouraged significant intellectual innovations and transfers",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe scholarship in Dar al-Islam, c. 800–1450",
    text: "Abbasid patronage in Baghdad, associated with the House of Wisdom, supported the translation of Greek, Persian, and Indian works into Arabic. Later scholars did more than preserve these texts. Nasir al-Din al-Tusi, working at the Maragha observatory under Mongol rulers, refined models of planetary motion, and physicians wrote medical encyclopedias based on hospital practice.\n\nIn Iberia, Muslim, Jewish, and Christian scholars worked with Arabic texts. After Christian kingdoms captured cities such as Toledo, translators there turned Arabic works on philosophy, medicine, and mathematics into Latin, and these translations reached European universities.",
  },
  originalSouthAsiaStates: {
    id: "original-south-asia-states",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.3, KC-3.2.I.B.i: new Hindu and Buddhist states emerged in South and Southeast Asia, alongside Muslim-ruled states",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, comparing states in South Asia, c. 1200–1450",
    text: "The Delhi Sultanate, founded in 1206, was ruled by Turkic and Afghan Muslim elites who governed a mostly Hindu population. Sultans relied on cavalry armies and on land revenue collected through local intermediaries, and they faced constant pressure from regional rivals. Most of their subjects did not convert to Islam.\n\nFarther south, the Vijayanagara Empire, founded in 1336, built its power on agricultural revenue, trade, and a large army. Its rulers presented themselves as protectors of Hindu tradition and gave rich gifts to temples, which in turn served as centers of worship, landholding, and local economic life.",
  },
  originalMexicaTribute: {
    id: "original-mexica-tribute",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.4, KC-3.2.I.D.i: in the Americas, as in Afro-Eurasia, state systems demonstrated continuity, innovation, and diversity, and expanded in scope and reach",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe the Mexica tributary system, c. 1428–1519",
    text: "After 1428, the Mexica of Tenochtitlan and their allies conquered much of central Mexico. Rather than govern conquered towns directly, they usually left local rulers in place and demanded regular deliveries of tribute: maize, cotton cloth, feathers, cacao, and other goods recorded in painted tribute lists. Imperial officials collected these goods, and the threat of military punishment enforced payment.\n\nThe system brought great wealth into Tenochtitlan, but it also created resentment. When Spanish forces arrived in 1519, several subject and rival peoples chose to fight alongside them against the Mexica.",
  },
  originalIncaAdministration: {
    id: "original-inca-administration",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.4, KC-3.2.I.D.i: state systems in the Americas demonstrated continuity, innovation, and diversity, and expanded in scope and reach",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe Inca administration in the 1400s",
    text: "The Inca state expanded rapidly from Cusco during the fifteenth century. It collected little in the way of goods or money from ordinary households. Instead, communities owed mit'a, a rotating labor obligation, and sent workers to farm state lands, build roads and terraces, serve in the army, or produce cloth. The products filled thousands of state storehouses.\n\nOfficials tracked people, labor, and stored goods with khipu, knotted cords that recorded numbers. A network of roads with relay runners and way stations carried messages and moved soldiers and supplies through the mountains.",
  },
  originalCahokia: {
    id: "original-cahokia",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.4, KC-3.2.I.D.i: state systems in the Americas demonstrated continuity, innovation, and diversity; Cahokia is an illustrative example",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing archaeological evidence about Cahokia, c. 1050–1350",
    text: "Cahokia, near present-day St. Louis, was the largest Mississippian center in North America. At its height in the 1100s it may have held 10,000 to 20,000 people, supported by maize farming in the fertile river floodplain. Its residents built more than one hundred earthen mounds, the largest of which covered about 14 acres at its base.\n\nArchaeologists point to elite burials with valuable goods from distant regions, and to the labor needed for the mounds, as evidence of a ranked society able to organize large workforces. Cahokia's population declined during the 1200s, and the site was largely abandoned by about 1350.",
  },
  originalGreatZimbabwe: {
    id: "original-great-zimbabwe",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.5, KC-3.2.I.D.ii: in Africa, state systems demonstrated continuity, innovation, and diversity; Great Zimbabwe is an illustrative example",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing archaeological evidence about Great Zimbabwe, c. 1200–1450",
    text: "Great Zimbabwe, built by ancestors of the Shona people, was the capital of a state in southern Africa between about 1200 and 1450. Its stone enclosures were built without mortar, and the largest wall is more than 9 meters high in places. Cattle herding and farming supported the population, while rulers controlled trade in gold and ivory that moved toward the Swahili coast.\n\nArchaeologists have found Chinese porcelain, Persian pottery, and glass beads at the site. In the 1800s, some European writers claimed that Africans could not have built the walls. Archaeological research has shown that claim to be false.",
  },
  originalFeudalism: {
    id: "original-feudalism",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.6, KC-3.2.I.B.ii and KC-3.3.III.C: Europe was politically fragmented, with decentralized monarchies, feudalism, and the manorial system, and depended on free and coerced labor including serfdom",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe lordship and labor in Europe, c. 1200–1450",
    text: "In much of western Europe, kings depended on nobles who held land in return for loyalty and military service. These lords collected rents and labor from the peasants on their estates, held courts, and kept armed followers. A king who wanted to raise an army or a tax often had to bargain with them.\n\nOn many manors, serfs were bound to the land and owed their lord days of labor each week, along with fees for using his mill or for marrying. Yet the system was never uniform. Free peasants rented land for money, towns won charters that limited lords' control, and after the plague of 1348 surviving laborers in some regions demanded higher wages.",
  },
  originalEuropeLearning: {
    id: "original-europe-learning",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.6, KC-3.1.III.D.v: Christianity, Judaism, Islam, and their core beliefs and practices continued to shape societies in Europe",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe the Church and learning in Europe, c. 1200–1450",
    text: "The Roman Catholic Church was the largest landowner in western Europe and the main sponsor of education. Universities such as those at Paris and Oxford grew out of church schools in the 1100s and 1200s. There, scholars such as Thomas Aquinas used the logic of Aristotle, whose works had reached Latin readers largely through translations from Arabic, to explain Christian teaching.\n\nThe Church's authority did not go unchallenged. Popes and kings argued over who could appoint bishops and tax clergy, and Jewish communities, which contributed to medicine and trade, faced expulsions from England in 1290 and from France in 1306.",
  },
  originalCompareSong: {
    id: "original-compare-song",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.7, KC-3.2.I.A and KC-3.2.I.D.i: comparison of state formation in Song China and the Inca Empire",
    amsco_review: "pending",
    attribution:
      "Practice passage A written for Page One, describing how Song China governed its territory",
    text: "Passage A: Song China governed tens of millions of people through a salaried bureaucracy. Officials, most of them selected through examinations, were rotated between posts so that they would not build local power bases. Taxes were paid in grain, cloth, and increasingly in coin, and written records tracked land and households.",
  },
  originalCompareInca: {
    id: "original-compare-inca",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.7, KC-3.2.I.A and KC-3.2.I.D.i: comparison of state formation in Song China and the Inca Empire",
    amsco_review: "pending",
    attribution:
      "Practice passage B written for Page One, describing how the Inca Empire governed its territory",
    text: "Passage B: The Inca ruled several million people across the Andes. Members of the Inca nobility held the highest posts, while local leaders called kurakas kept authority over their own communities as long as they delivered the labor the state demanded. Obligations were counted in work rather than coin and were recorded on knotted cords instead of in writing.",
  },
  originalLegitimacy: {
    id: "original-legitimacy",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.7, KC-3.2.I: comparison of how rulers used religion to legitimize state power, c. 1200–1450",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, comparing religion and royal authority in three states, c. 1200–1450",
    text: "Rulers in many regions linked their authority to religion. Mansa Musa of Mali publicized his Muslim faith through his pilgrimage to Mecca in 1324 and sponsored mosques in Timbuktu. Vijayanagara kings endowed great Hindu temples. Ethiopia's Solomonic kings, who took power in 1270, claimed descent from the biblical King Solomon and supported Christian monasteries.\n\nIn each case, religious patronage did more than express personal belief. It tied rulers to respected institutions and to networks of scholars and clergy, though many subjects continued older local practices.",
  },
  originalContinuity: {
    id: "original-continuity",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 1.7, KC-3.2: continuity and change in state formation, c. 1200–1450",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing continuity and change in states, c. 1200–1450",
    text: "Many states of this period built on older foundations. Song officials used Confucian ideas that were more than a thousand years old, and Ethiopian kings drew on a Christian tradition dating back to Aksum. At the same time, new forms of rule appeared. Turkic military elites replaced Abbasid authority across much of Dar al-Islam, and the Inca created one of the largest empires in the world within about a century.\n\nHistorians therefore describe the period as one in which states reused inherited ideas and institutions while adapting them to new circumstances.",
  },
  // END unit-01
  // BEGIN unit-03
  busbecqMerit: {
    id: "busbecq-merit",
    type: "source",
    sourceType: "primary",
    source: "busbecq-forster-1881",
    amsco_review: "pending",
    attribution:
      "Ogier Ghiselin de Busbecq, ambassador of the Habsburg ruler Ferdinand I to the court of the Ottoman sultan Suleiman I, letter written in 1555 describing his audience with the sultan, published in Latin in 1589",
    citation:
      "The Life and Letters of Ogier Ghiselin de Busbecq, trans. Charles Thornton Forster and F. H. Blackburne Daniell (London: C. Kegan Paul, 1881), vol. 1, Letter I. Project Gutenberg eBook #53629.",
    note: "Spahis were cavalry; Janissaries were infantry recruited through the devshirme. Busbecq's letter was addressed to a friend in the Habsburg lands.",
    text: "The Sultan's hall was crowded with people, among whom were several officers of high rank. Besides these there were all the troopers of the Imperial guard, Spahis, Ghourebas, Ouloufedgis, and a large force of Janissaries; but there was not in all that great assembly a single man who owed his position to aught save his valour and his merit. No distinction is attached to birth among the Turks; the deference to be paid to a man is measured by the position he holds in the public service. . . . Those who receive the highest offices from the Sultan are for the most part the sons of shepherds or herdsmen, and so far from being ashamed of their parentage, they actually glory in it . . . .\n\nThis is the reason that they are successful in their undertakings, that they lord it over others, and are daily extending the bounds of their empire. These are not our ideas, with us there is no opening left for merit; birth is the standard for everything; the prestige of birth is the sole key to advancement in the public service.",
  },
  lutherTheses: {
    id: "luther-theses",
    type: "source",
    sourceType: "primary",
    source: "luther-works-1915",
    amsco_review: "pending",
    attribution:
      "Martin Luther, German monk and professor of theology, Disputation on the Power and Efficacy of Indulgences (the Ninety-five Theses), Wittenberg, 1517",
    citation:
      "Works of Martin Luther, trans. and ed. Adolph Spaeth, L. D. Reed, Henry Eyster Jacobs, et al. (Philadelphia: A. J. Holman Company, 1915), vol. 1, pp. 29–38, theses 21, 27–28, 36, 50, and 86. Project Gutenberg eBook #274.",
    note: "Indulgences were grants from the Church said to reduce punishment for sins. “They preach man” means they preach human teaching rather than God's. Bracketed words are the translators'. Thesis 86 is one of several questions Luther says ordinary believers were asking.",
    text: "21. Therefore those preachers of indulgences are in error, who say that by the pope's indulgences a man is freed from every penalty, and saved; . . .\n\n27. They preach man who say that so soon as the penny jingles into the money-box, the soul flies out [of purgatory].\n\n28. It is certain that when the penny jingles into the money-box, gain and avarice can be increased, but the result of the intercession of the Church is in the power of God alone. . . .\n\n36. Every truly repentant Christian has a right to full remission of penalty and guilt, even without letters of pardon. . . .\n\n50. Christians are to be taught that if the pope knew the exactions of the pardon-preachers, he would rather that St. Peter's church should go to ashes, than that it should be built up with the skin, flesh and bones of his sheep. . . .\n\n86. Again:--\"Why does not the pope, whose wealth is to-day greater than the riches of the richest, build just this one church of St. Peter with his own money, rather than with the money of poor believers?\"",
  },
  originalGunpowder: {
    id: "original-gunpowder-ottoman",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.1, KC-4.3.II: imperial expansion relied on the increased use of gunpowder, cannons, and armed trade",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians describe the Ottoman conquest of Constantinople in 1453",
    text: "When Sultan Mehmed II besieged Constantinople in 1453, he brought dozens of cannons, including giant bombards cast for the campaign by a Hungarian founder. For weeks the guns battered walls that had protected the city for a thousand years. Ottoman ships were dragged overland into the city's harbor to tighten the siege. After the city fell, Mehmed made it his capital.\n\nHistorians stress that cannons alone did not win the siege. The Ottomans also had a disciplined standing infantry, the Janissaries, a state able to pay and supply a large army, and engineers and gunners recruited from many backgrounds.",
  },
  originalSafavidMughal: {
    id: "original-safavid-mughal",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.1, KC-4.3.III.i: political and religious disputes led to rivalries and conflict between states; the Safavid–Mughal conflict is an illustrative example",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the conflict between the Safavid and Mughal empires, c. 1550–1650",
    text: "The fortress city of Kandahar sat on the main route between Persia and northern India. Whoever held it controlled caravans, tolls, and an invasion path. The Mughals took Kandahar in 1595, the Safavid shah Abbas I captured it in 1622, the Mughals regained it in 1638, and the Safavids took it back for good in 1649. Three Mughal sieges between 1649 and 1653 failed.\n\nThe rivalry was not mainly religious. Both dynasties had Turkic and Persian roots, and Persian was the language of both courts. The conflict was about trade, prestige, and a strategic frontier.",
  },
  originalSonghaiMorocco: {
    id: "original-songhai-morocco",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.1, KC-4.3.III.i: political and religious disputes led to rivalries and conflict between states; the Songhai Empire's conflict with Morocco is an illustrative example",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the Moroccan invasion of the Songhai Empire in 1591",
    text: "In the late 1400s and 1500s, Songhai rulers controlled the middle Niger River and the cities of Gao and Timbuktu, taxing the trans-Saharan trade in gold and salt. In 1591 the Moroccan sultan Ahmad al-Mansur sent an army of about 4,000 soldiers, many armed with firearms, across the Sahara. At the Battle of Tondibi, Moroccan musketeers defeated a much larger Songhai force that relied on cavalry and spears.\n\nMorocco hoped to seize the gold trade. It held Timbuktu and Gao for a time, but the conquest proved costly to maintain, and the region split into smaller states.",
  },
  originalQingExpansion: {
    id: "original-qing-expansion",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.1, KC-4.3.II.B: land empires included the Manchu, Mughal, Ottoman, and Safavid",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the rise and expansion of the Qing dynasty, 1644–1760",
    text: "The Manchus, a people from northeast of the Great Wall, organized their warriors into military units called banners. In 1644, after rebels captured Beijing and the last Ming emperor died, Manchu armies entered China and founded the Qing dynasty. Over the next century, Qing emperors defeated remaining Ming loyalists, took Taiwan in 1683, and in the 1750s conquered the Zunghar Mongols, adding Xinjiang to the empire.\n\nBy 1760 the Qing ruled roughly twice the territory of the Ming. Manchus were a small minority, so they governed with Chinese officials while keeping key military commands in Manchu hands.",
  },
  originalMughalAkbar: {
    id: "original-mughal-akbar",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.1, KC-4.3.II.B: land empires included the Manchu, Mughal, Ottoman, and Safavid",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the founding and expansion of the Mughal Empire, 1526–1605",
    text: "In 1526 Babur, a Central Asian prince descended from Timur, defeated the Sultan of Delhi at Panipat with field cannons and matchlock muskets. His grandson Akbar, who ruled from 1556 to 1605, turned these conquests into a lasting empire. Akbar expanded across northern India, made alliances with Rajput princes by marriage and by giving them high military rank, and ranked officers in a system of mansabs that tied their pay to the number of troops they kept.\n\nMost of Akbar's subjects were Hindu. His policy of including Hindu elites in government helped him rule a population far larger than the Muslim ruling class.",
  },
  originalTaxes: {
    id: "original-tax-systems",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.2, KC-4.3.I.D: rulers used tribute collection, tax farming, and innovative tax-collection systems to generate revenue",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, comparing tax collection in three empires, c. 1550–1700",
    text: "Large empires needed steady revenue, and each solved the problem differently. In Mughal India, zamindars, local landholders, collected land taxes from peasants and passed a share to the state. The Ottomans increasingly sold the right to collect certain taxes to tax farmers, who paid the treasury in advance and then collected what they could. In Ming China, reforms in the late 1500s combined many taxes and labor duties into a single payment in silver.\n\nEach method raised money, but each had costs. Intermediaries could keep too much, squeeze peasants, or build local power that rivaled the central government.",
  },
  originalTokugawa: {
    id: "original-tokugawa",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.2, KC-4.3.I.C: rulers used bureaucratic elites and military professionals to consolidate power; salaried samurai are an illustrative example",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how the Tokugawa shoguns governed Japan after 1603",
    text: "After decades of civil war, Tokugawa Ieyasu became shogun in 1603. His successors required the daimyo, the regional lords, to spend every other year in the capital at Edo and to leave their families there when they returned home. This alternate attendance system was expensive and kept the daimyo under watch.\n\nSamurai were moved off the land and into castle towns, where they received fixed stipends paid in rice. Many became administrators rather than active warriors. A strict social order ranked samurai above peasants, artisans, and merchants, even as merchants in cities such as Osaka grew wealthy.",
  },
  originalMonuments: {
    id: "original-monuments",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.2, KC-4.3.I.A: rulers used religious ideas, art, and monumental architecture to legitimize their rule",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how rulers used architecture and art, c. 1450–1750",
    text: "Rulers built on a massive scale to display power. The Mughal emperor Shah Jahan built the Taj Mahal in Agra as a tomb for his wife Mumtaz Mahal, using white marble and Persian, Indian, and Islamic designs. The Ottoman architect Sinan designed the Süleymaniye Mosque in Istanbul for Suleiman I. In France, Louis XIV moved his court to the palace of Versailles in 1682, where nobles competed for his attention through elaborate ceremonies.\n\nSuch projects were expensive, but they presented the ruler as wealthy, pious, and permanent. They also employed thousands of artisans and turned the capital into a stage for royal authority.",
  },
  originalDivineRight: {
    id: "original-divine-right",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.2, KC-4.3.I.A: rulers used religious ideas to legitimize their rule; European notions of divine right are an illustrative example",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the idea of divine right in Europe, c. 1600–1715",
    text: "Many European monarchs of the 1600s claimed to rule by divine right, the idea that God chose kings and that subjects owed them obedience as they owed obedience to God. Supporters of Louis XIV, who ruled France from 1643 to 1715, argued that the king answered to God alone, not to nobles or representative assemblies. Louis never called France's old assembly of estates, the Estates-General, and relied instead on royal officials sent to the provinces.\n\nCritics pointed to the costs: long wars and heavy taxes fell hardest on peasants. In England, conflict over royal power led to civil war in the 1640s and the execution of King Charles I in 1649.",
  },
  originalSongaiIslam: {
    id: "original-songhai-islam",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.2, KC-4.3.I.A: rulers used religious ideas to legitimize their rule; the Songhai promotion of Islam is an illustrative example",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how Askia Muhammad of Songhai used Islam, 1493–1528",
    text: "Askia Muhammad seized the Songhai throne in 1493 from the son of Sunni Ali, a ruler whom Muslim scholars had criticized for mixing Islam with local religious practices. Askia Muhammad made a pilgrimage to Mecca in 1496 and 1497 and returned with the title of caliph's deputy for West Africa. He appointed Muslim judges, supported scholars in Timbuktu, and encouraged Islamic law in the towns.\n\nIn the countryside, many farmers and fishers kept older beliefs. Askia Muhammad's Islam strengthened his ties to merchants and scholars, but it did not erase local religion.",
  },
  originalQingAdministration: {
    id: "original-qing-administration",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.2, KC-4.3.I.C and KC-4.3.I.A: rulers used bureaucratic elites and religious and artistic patronage to consolidate power",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how the Qing dynasty governed China, c. 1650–1750",
    text: "The Qing kept the Ming bureaucracy and the civil service examinations, so Chinese scholars continued to staff most government offices. At the highest levels, many posts were held jointly by one Manchu and one Han Chinese official. The Kangxi emperor, who ruled from 1661 to 1722, studied the Confucian classics and sponsored large scholarly projects.\n\nAt the same time, the Qing required Han Chinese men to wear the Manchu queue hairstyle as a sign of loyalty, and they commissioned portraits that showed emperors as Confucian rulers, Buddhist patrons, and Manchu warriors for different audiences.",
  },
  originalCatholicReform: {
    id: "original-catholic-reform",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.3, KC-4.1.VI.i: the Protestant Reformation marked a break with established Christian traditions, and the Catholic Reformation responded",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the Catholic Reformation, 1540–1600",
    text: "The Catholic Church answered the Protestant challenge in several ways. The Council of Trent, which met between 1545 and 1563, reaffirmed Catholic teachings on the sacraments and the authority of Church tradition, while ordering bishops to correct abuses such as the sale of church offices. New religious orders, especially the Society of Jesus, or Jesuits, founded in 1540, opened schools and sent missionaries to Asia, Africa, and the Americas.\n\nThe result was not reunion. Europe remained divided between Catholic and Protestant states, and religious difference fed wars such as the Thirty Years' War of 1618 to 1648.",
  },
  originalSunniShia: {
    id: "original-sunni-shia",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.3, KC-4.1.VI.ii: within Islam, the Sunni–Shi'a split was widened by the political rivalry between the Ottoman and Safavid empires",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the Ottoman–Safavid rivalry, 1501–1639",
    text: "When Ismail I founded the Safavid dynasty in Persia in 1501, he declared Twelver Shi'ism the official religion and pressed his largely Sunni subjects to convert. The neighboring Ottomans, who were Sunni, saw Safavid preachers among Anatolian tribes as a threat. Sultan Selim I defeated Ismail at the Battle of Chaldiran in 1514, where Ottoman cannons and muskets overwhelmed Safavid cavalry.\n\nThe two empires fought repeatedly until a treaty in 1639 set a lasting border. Their rivalry turned a religious difference into a political boundary, and Persia remained mostly Shi'a while Ottoman lands remained mostly Sunni.",
  },
  originalSikhism: {
    id: "original-sikhism",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.3, KC-4.1.VI.iii: some belief systems, such as Sikhism, developed as a blend of existing traditions",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the origins of Sikhism, c. 1500–1604",
    text: "Sikhism began in the Punjab region of northern India with Guru Nanak, who lived from 1469 to 1539. Nanak taught devotion to one God and rejected the idea that ritual, caste, or religious labels made a person closer to the divine. His followers ate together in community kitchens open to all, regardless of caste.\n\nScholars see connections between Nanak's teachings and both Hindu bhakti devotion and Islamic Sufism, which were widespread in the region. Yet his successors built distinct institutions, and in 1604 the fifth Guru compiled the Adi Granth, the Sikh scripture.",
  },
  originalReligiousPolicyA: {
    id: "original-religious-policy-ottoman",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.4, KC-4.3 and KC-4.1.VI: comparison of how land-based empires ruled religiously diverse populations",
    amsco_review: "pending",
    attribution:
      "Practice passage A written for Page One, describing Ottoman rule over religious communities",
    text: "Passage A: The Ottoman sultans were Sunni Muslims, but millions of their subjects were Orthodox Christians, Armenians, or Jews. These communities were allowed to keep their religious leaders, courts for family matters, and places of worship. Non-Muslims paid a special tax, the jizya, and faced legal limits, but they could rise in commerce and some served the state as translators and bankers.",
  },
  originalReligiousPolicyB: {
    id: "original-religious-policy-mughal",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.4, KC-4.3 and KC-4.1.VI: comparison of how land-based empires ruled religiously diverse populations",
    amsco_review: "pending",
    attribution:
      "Practice passage B written for Page One, describing Mughal religious policy under Akbar and Aurangzeb",
    text: "Passage B: The Mughal emperor Akbar abolished the jizya on non-Muslims in 1564, invited scholars of many faiths to debate at his court, and appointed Hindu Rajputs to high command. A century later, Aurangzeb, a stricter Sunni ruler, restored the jizya in 1679 and ordered some temples destroyed. Historians link Aurangzeb's policies to revolts that weakened the empire after his death in 1707.",
  },
  originalGunpowderDebate: {
    id: "original-gunpowder-debate",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.4, KC-4.3.II: comparison of how land empires expanded and the role of gunpowder",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing a historians' debate about the label “gunpowder empires”",
    text: "In the twentieth century, some historians called the Ottoman, Safavid, and Mughal states “gunpowder empires,” arguing that firearms and cannons allowed these dynasties to build large, centralized states. The label is still common in textbooks.\n\nMore recent historians have questioned it. They point out that cavalry, alliances with local elites, tax systems, and religious legitimacy mattered as much as guns, and that the Safavids adopted firearms only gradually. Gunpowder helped these empires expand, these historians argue, but it does not by itself explain how they lasted.",
  },
  originalLegitimacyCompare: {
    id: "original-legitimacy-compare",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 3.4, KC-4.3: comparison of how land-based empires legitimized and consolidated their rule",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, comparing how land-based empires governed diverse populations, c. 1450–1750",
    text: "Each of the great land empires was ruled by a minority. Turkic Ottomans governed Greeks, Arabs, Slavs, and Armenians. Muslim Mughals governed a Hindu majority. Manchu Qing emperors governed millions of Han Chinese. To hold power, rulers combined force with inclusion: they recruited outsiders into the army and bureaucracy, kept many local institutions, and presented themselves in different ways to different subjects.\n\nWhen inclusion gave way to policies that alienated important groups, revolts and frontier wars became harder to contain.",
  },
  // END unit-03
  // BEGIN unit-04
  smithDiscovery: {
    id: "smith-discovery",
    type: "source",
    sourceType: "primary",
    source: "smith-wealth-of-nations",
    amsco_review: "pending",
    attribution:
      "Adam Smith, Scottish philosopher and economist, An Inquiry into the Nature and Causes of the Wealth of Nations, 1776",
    citation:
      "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book IV, ch. 7, part 3. Project Gutenberg eBook #3300.",
    note: "The East Indies and West Indies mean South and Southeast Asia and the Americas. The mercantile system is mercantilism, which Smith criticized.",
    text: "The discovery of America, and that of a passage to the East Indies by the Cape of Good Hope, are the two greatest and most important events recorded in the history of mankind. . . . By uniting in some measure the most distant parts of the world, by enabling them to relieve one another's wants, to increase one another's enjoyments, and to encourage one another's industry, their general tendency would seem to be beneficial. To the natives, however, both of the East and West Indies, all the commercial benefits which can have resulted from those events have been sunk and lost in the dreadful misfortunes which they have occasioned. . . . At the particular time when these discoveries were made, the superiority of force happened to be so great on the side of the Europeans, that they were enabled to commit with impunity every sort of injustice in those remote countries.\n\nIn the mean time, one of the principal effects of those discoveries has been, to raise the mercantile system to a degree of splendour and glory which it could never otherwise have attained to.",
  },
  montaigneCannibals: {
    id: "montaigne-cannibals",
    type: "source",
    sourceType: "primary",
    source: "montaigne-cotton-1877",
    amsco_review: "pending",
    attribution:
      "Michel de Montaigne, French writer and landowner, essay “Of Cannibals,” published in 1580, discussing the Tupinamba people of Brazil",
    citation:
      "The Essays of Montaigne, trans. Charles Cotton, ed. William Carew Hazlitt (1877), Book I, ch. 30, “Of Cannibals.” Project Gutenberg eBook #3600.",
    note: "Antarctic France was a short-lived French colony in Brazil founded by Villegaignon in 1555. “This nation” means the Tupinamba. The last lines refer to cruelty during France's wars of religion.",
    text: "I long had a man in my house that lived ten or twelve years in the New World, discovered in these latter days, and in that part of it where Villegaignon landed, . . . which he called Antarctic France. . . .\n\nNow, to return to my subject, I find that there is nothing barbarous and savage in this nation, by anything that I can gather, excepting, that every one gives the title of barbarism to everything that is not in use in his own country. . . .\n\nI am not sorry that we should here take notice of the barbarous horror of so cruel an action, but that, seeing so clearly into their faults, we should be so blind to our own. I conceive there is more barbarity in eating a man alive, than when he is dead; in tearing a body limb from limb by racks and torments, that is yet in perfect sense; . . . (as we have not only read, but lately seen, not amongst inveterate and mortal enemies, but among neighbours and fellow-citizens, and, which is worse, under colour of piety and religion), than to roast and eat him after he is dead.",
  },
  originalNavTech: {
    id: "original-navigation-technology",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.1 key concept: knowledge, scientific learning, and technology from the Classical, Islamic, and Asian worlds spread, enabling European maritime innovation",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians explain European navigation technology, c. 1400–1600",
    text: "Few of the tools European sailors used in the 1400s were European inventions. The magnetic compass came from China. The astrolabe, refined by scholars in the Islamic world, let navigators measure latitude by the height of the sun or stars. The triangular lateen sail, used for centuries by sailors in the Indian Ocean and Mediterranean, let ships sail closer to the wind.\n\nPortuguese shipbuilders combined these elements in the caravel, a small, maneuverable ship with both square and lateen sails. Its design allowed sailors to explore the West African coast and return against the prevailing winds.",
  },
  originalWinds: {
    id: "original-winds-currents",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.1 key concept: new tools, ship designs, and an improved understanding of regional wind and current patterns made transoceanic travel and trade possible",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how sailors used Atlantic and Indian Ocean wind systems, c. 1450–1600",
    text: "Sailing home from West Africa was harder than sailing out, because winds blew steadily from the north. Portuguese captains learned to swing far west into the open Atlantic, where westerly winds could carry them back to Europe. This long loop, sometimes called the volta do mar, depended on knowledge of wind patterns built up over many voyages.\n\nIn the Indian Ocean, European ships entered a world that already had detailed knowledge of the monsoon winds. When Vasco da Gama reached East Africa in 1498, he hired a local pilot to guide his fleet across the ocean to Calicut.",
  },
  originalPortugueseVoyages: {
    id: "original-portuguese-voyages",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.2 key concept: new state-supported transoceanic maritime exploration occurred in this period, led at first by Portugal",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing Portuguese exploration, 1415–1500",
    text: "In the early 1400s, Prince Henry of Portugal sponsored voyages down the West African coast. His motives combined a search for gold, a desire to reach Africa's gold-producing regions without going through Muslim middlemen in North Africa, crusading zeal, and curiosity about the coast. The Portuguese crown claimed a share of the profits.\n\nBartolomeu Dias rounded the southern tip of Africa in 1488. Ten years later, Vasco da Gama reached Calicut in India, opening a sea route that bypassed the Venetian and Ottoman middlemen who had controlled the spice trade into Europe.",
  },
  originalSpanishVoyages: {
    id: "original-spanish-voyages",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.2 key concept: Spanish sponsorship of the first Columbian and subsequent voyages across the Atlantic and Pacific dramatically increased European interest in transoceanic travel and trade",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing Spanish exploration, 1492–1522",
    text: "Christopher Columbus, a Genoese navigator, sailed for the Spanish monarchs Ferdinand and Isabella in 1492, hoping to reach Asia by sailing west. Instead he reached the Caribbean. In 1494 the Treaty of Tordesillas divided newly claimed lands outside Europe between Spain and Portugal along a line in the Atlantic, which later gave Portugal its claim to Brazil.\n\nFrom 1519 to 1522 an expedition led at first by Ferdinand Magellan sailed around the world. Magellan was killed in the Philippines, but one ship returned to Spain, proving that the Americas lay between Europe and Asia and that the oceans were connected.",
  },
  originalNorthernAtlantic: {
    id: "original-northern-atlantic",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.2 key concept: northern Atlantic crossings were undertaken under English, French, and Dutch sponsorship, often with the goal of finding alternative sea routes to Asia",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing English, French, and Dutch voyages to North America, 1497–1610",
    text: "Sailing for England in 1497, John Cabot reached the coast of Newfoundland. French voyages under Jacques Cartier in the 1530s explored the St. Lawrence River. Both searched for a northwest passage to Asia, and neither found one.\n\nWhat they found instead were rich fishing grounds and a trade in furs with Indigenous peoples. By the early 1600s, French traders in New France and Dutch traders along the Hudson River were exchanging metal tools, cloth, and guns for beaver pelts, which were in high demand in Europe for hats.",
  },
  originalDisease: {
    id: "original-disease",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.3 key concept: European colonization of the Americas led to the unintentional transfer of disease vectors, including smallpox and measles, that devastated Indigenous populations",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how historians explain population decline in the Americas after 1492",
    text: "Before 1492, people in the Americas had no exposure to smallpox, measles, or influenza, diseases that had circulated in Afro-Eurasia for centuries. When these diseases arrived, they spread faster than the Europeans themselves. A smallpox epidemic struck Tenochtitlan in 1520, during the Spanish campaign against the Mexica, and smallpox reached the Andes before Francisco Pizarro did.\n\nHistorians estimate that the Indigenous population of the Americas fell by as much as 90 percent in the century after contact. They add that disease worked together with war, forced labor, and displacement, which left survivors less able to recover.",
  },
  originalCrops: {
    id: "original-crops-animals",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.3 key concept: American foods became staple crops in various parts of Europe, Asia, and Africa, while Afro-Eurasian crops and animals transformed the Americas",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the exchange of plants and animals after 1492",
    text: "Maize, potatoes, and manioc, all first domesticated in the Americas, became staple foods across Afro-Eurasia. Potatoes grew well in cool northern Europe, maize spread through Africa and China, and manioc became important in West and Central Africa. Some historians link these crops to population growth in the 1700s.\n\nIn the other direction, Europeans brought wheat, sugarcane, horses, cattle, and pigs to the Americas. Grazing animals changed landscapes and Indigenous ways of life. On the Great Plains, horses transformed hunting and warfare. Sugar, grown on plantations by enslaved Africans, became one of the most profitable crops in the world.",
  },
  originalTradingPosts: {
    id: "original-trading-posts",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.4 key concept: Europeans established new trading posts in Africa and Asia, which proved profitable for the rulers and merchants involved in new global trade networks",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the Portuguese trading-post empire, 1498–1600",
    text: "The Portuguese did not conquer large territories in Asia. Instead they seized fortified ports at key points: Goa in India in 1510, Malacca in 1511, and Hormuz near the Persian Gulf. From these bases they required Asian merchant ships to buy a pass, the cartaz, and pay duties at Portuguese ports, or risk being attacked.\n\nThis system brought large profits but limited control. Most Indian Ocean trade continued to be carried by Asian merchants, and powerful land empires such as the Mughals were largely unaffected by Portuguese naval power.",
  },
  originalVOC: {
    id: "original-voc",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.4 key concept: European merchants' role in Asian trade was characterized by joint-stock companies and by efforts to dominate trade in specific goods",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the Dutch East India Company, 1602–1700",
    text: "In 1602 the Dutch government chartered the Dutch East India Company, known by its Dutch initials VOC. As a joint-stock company, it raised money by selling shares to many investors, who shared the profits and the risks of long, dangerous voyages. The company could build forts, keep soldiers, and make treaties.\n\nFrom its headquarters at Batavia on Java, founded in 1619, the VOC used force to control the trade in nutmeg, cloves, and mace. On the Banda Islands in the 1620s, company forces killed or enslaved much of the population and replaced them with plantations worked by enslaved laborers.",
  },
  originalAfricanStates: {
    id: "original-african-states",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.4 key concept: expansion of maritime trading networks fostered the growth of states in Africa, including the Asante and the Kingdom of the Kongo",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing how Kongo and Asante took part in Atlantic trade, c. 1490–1750",
    text: "The Kingdom of Kongo in west-central Africa established relations with Portugal in the 1480s. King Afonso I, who ruled from about 1509 to 1542, converted to Christianity and exchanged ambassadors with Portugal, but he also wrote letters protesting that Portuguese traders were enslaving his subjects.\n\nThe Asante kingdom, which rose in the forests of present-day Ghana around 1700, grew powerful by selling gold and enslaved war captives to European traders on the coast in exchange for firearms and cloth. Its rulers used the firearms to expand their state.",
  },
  originalLaborSystems: {
    id: "original-labor-systems",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.5 key concept: the demand for labor intensified, and colonial economies in the Americas depended on coerced labor such as the encomienda, hacienda, and Spanish adaptation of the mit'a",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing labor systems in Spanish America, c. 1500–1700",
    text: "Under the encomienda system, the Spanish crown granted colonists the right to demand labor and tribute from Indigenous communities, in return for protecting them and teaching them Christianity. Abuses were widespread, and the crown restricted the system after the 1540s. Large estates called haciendas later relied on Indigenous workers bound by debt.\n\nIn the Andes, Spanish officials adapted the Inca mit'a. Communities had to send a share of their adult men to work for months in the silver mines of Potosí, discovered in 1545. The work was dangerous, and many workers died from accidents and mercury poisoning.",
  },
  originalAtlanticSlavery: {
    id: "original-atlantic-slavery",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.5 key concept: the Atlantic trading system involved the movement of goods, wealth, and free and unfree laborers, and chattel slavery grew with plantation economies",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the growth of the Atlantic slave trade, c. 1500–1750",
    text: "Sugar plantations in Brazil and the Caribbean demanded huge amounts of labor. As Indigenous populations collapsed, planters turned to enslaved Africans. Over the course of the transatlantic slave trade, about 12.5 million Africans were forced onto ships, and nearly 2 million died during the Middle Passage. Most went to Brazil and the Caribbean.\n\nAtlantic slavery differed from many earlier forms of slavery. Enslaved status was inherited and tied to race, and enslaved people were treated as property, a system called chattel slavery. Yet enslaved Africans kept languages, beliefs, and skills, including rice cultivation, that shaped American societies.",
  },
  originalSilver: {
    id: "original-silver-trade",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.5 key concept: the global flow of silver from the Americas and Japan, much of it to China, connected maritime empires and Asian economies",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the global silver trade, c. 1550–1700",
    text: "After 1571, when Spain founded Manila in the Philippines, ships called the Manila galleons carried silver from Mexico across the Pacific. In Manila, Chinese merchants traded silk and porcelain for the silver. China's economy had a huge demand for silver, partly because the Ming government collected taxes in it.\n\nHistorians describe this as the first truly global trade network, linking the Americas, Asia, and Europe. The flood of silver also caused inflation in Spain, which spent much of its wealth on wars and imports instead of investing at home.",
  },
  originalRestrictions: {
    id: "original-trade-restrictions",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.5 key concept: some Asian states, such as Tokugawa Japan and Qing China, sought to limit the disruptive effects of European trade through restrictive policies",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing Japanese and Chinese limits on European trade, c. 1630–1760",
    text: "In the 1630s, the Tokugawa shogunate banned Christianity, expelled Portuguese traders, and forbade Japanese from traveling abroad. Only Dutch and Chinese merchants were allowed to trade, and the Dutch were confined to a small island in Nagasaki harbor. Japan continued to trade with China and Korea.\n\nThe Qing also controlled European trade. By the 1750s, European merchants were limited to the port of Canton and could deal only with licensed Chinese merchant houses. Both states welcomed some trade but tried to keep foreign influence under control.",
  },
  originalPuebloRevolt: {
    id: "original-pueblo-revolt",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.6 key concept: as states expanded and centralized, resistance to state power by Indigenous peoples and others increased",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the Pueblo Revolt of 1680",
    text: "By the 1670s, Pueblo communities in present-day New Mexico had endured decades of Spanish rule. Spanish colonists demanded labor and tribute, and Franciscan missionaries tried to suppress Pueblo religious ceremonies. Drought and raids made life harder still.\n\nIn 1680, led by a religious leader named Popé, many Pueblo towns rose together, killed about 400 Spanish colonists and priests, and drove the survivors south out of the region. The Spanish returned in the 1690s, but afterward they generally tolerated more Pueblo religious practice and relied less on forced labor.",
  },
  originalStateChallenges: {
    id: "original-state-challenges",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.6 key concept: as states expanded and centralized, resistance to state power increased, from elites, peasants, and rival groups",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing challenges to state power in three regions, c. 1620–1700",
    text: "In west-central Africa, Queen Nzinga of Ndongo and Matamba resisted Portuguese expansion from the 1620s to the 1660s, combining diplomacy, warfare, and alliances with the Dutch. In France, nobles and Paris officials rose against the young Louis XIV in the Fronde between 1648 and 1653. In India, the Maratha leader Shivaji built an independent kingdom in the 1670s and fought the Mughal Empire.\n\nThe causes differed. Nzinga resisted a foreign colonial power, the Fronde opposed the growth of royal authority, and the Marathas challenged an empire they saw as foreign and burdensome.",
  },
  originalCasta: {
    id: "original-casta",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.7 key concept: the casta system in the Americas reflected new social hierarchies based on ancestry, as colonial societies combined European, African, and Indigenous peoples",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing social hierarchy in Spanish America, c. 1600–1750",
    text: "Spanish American society was ranked largely by ancestry. At the top were peninsulares, people born in Spain, who held the highest offices. Below them were creoles, people of Spanish descent born in the Americas. Mestizos had mixed Spanish and Indigenous ancestry, and mulattoes had mixed Spanish and African ancestry. Indigenous people and enslaved Africans were near the bottom.\n\nIn the 1700s, painters produced casta paintings that labeled many categories of mixed ancestry. Historians note that the categories were not always fixed in practice: wealth, occupation, and reputation could change how a person was classified.",
  },
  originalContinuity4: {
    id: "original-continuity-1450-1750",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 4.8 key concept: continuity and change in economic systems, labor, and global trade from 1450 to 1750",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing continuity and change in global trade, 1450–1750",
    text: "Between 1450 and 1750, sea routes linked every inhabited continent for the first time. Yet many older patterns continued. Asian merchants still carried most Indian Ocean trade, Chinese and Indian manufactured goods remained in high demand, and land-based empires such as the Ottomans and Mughals remained far larger and richer than any European colony in Asia.\n\nWhat changed most was the Atlantic world. There, European empires, new crops and diseases, and the forced migration of Africans created societies that had no earlier parallel.",
  },
  // END unit-04
  // BEGIN unit-05
  lockeConsent: {
    id: "locke-consent",
    type: "source",
    sourceType: "primary",
    source: "locke-second-treatise",
    amsco_review: "pending",
    attribution: "John Locke, English philosopher, Second Treatise of Government, 1690",
    citation:
      "John Locke, Second Treatise of Government, sections 95 and 222. Project Gutenberg eBook #7370.",
    note: "Locke uses “property” to mean people's lives, liberties, and estates. The legislative is the lawmaking power.",
    text: "MEN being, as has been said, by nature, all free, equal, and independent, no one can be put out of this estate, and subjected to the political power of another, without his own consent. . . .\n\n. . . whenever the legislators endeavour to take away, and destroy the property of the people, or to reduce them to slavery under arbitrary power, they put themselves into a state of war with the people, who are thereupon absolved from any farther obedience . . . . Whensoever therefore the legislative shall transgress this fundamental rule of society; and either by ambition, fear, folly or corruption, endeavour to grasp themselves, or put into the hands of any other, an absolute power over the lives, liberties, and estates of the people; by this breach of trust they forfeit the power the people had put into their hands for quite contrary ends, and it devolves to the people, who have a right to resume their original liberty . . . .",
  },
  wollstonecraftReason: {
    id: "wollstonecraft-reason",
    type: "source",
    sourceType: "primary",
    source: "wollstonecraft-vindication",
    amsco_review: "pending",
    attribution:
      "Mary Wollstonecraft, English writer, A Vindication of the Rights of Woman, 1792",
    citation:
      "Mary Wollstonecraft, A Vindication of the Rights of Woman, chs. 3–4. Project Gutenberg eBook #3420.",
    note: "Wollstonecraft is responding to the French Enlightenment writer Jean-Jacques Rousseau, who argued that women should be educated to please men. Bracketed words replace “they.”",
    edits: [
      {
        shown: "[Women]",
        original: "they",
      },
    ],
    text: 'It is time to effect a revolution in female manners, time to restore to them their lost dignity, and make them, as a part of the human species, labour by reforming themselves to reform the world. . . .\n\n[Women] would be more respectable members of society, and discharge the important duties of life by the light of their own reason. "Educate women like men," says Rousseau, "and the more they resemble our sex the less power will they have over us." This is the very point I aim at. I do not wish them to have power over men; but over themselves.',
  },
  paineCommonSense: {
    id: "paine-common-sense",
    type: "source",
    sourceType: "primary",
    source: "paine-common-sense",
    amsco_review: "pending",
    attribution:
      "Thomas Paine, English-born writer living in Philadelphia, Common Sense, pamphlet published in January 1776",
    citation:
      "Thomas Paine, Common Sense (1776), introduction and parts 1 and 3. Project Gutenberg eBook #147.",
    note: "“The continent” is the thirteen British colonies in North America; “the island” is Great Britain.",
    text: "The cause of America is in a great measure the cause of all mankind. . . .\n\nSociety in every state is a blessing, but government even in its best state is but a necessary evil; in its worst state an intolerable one . . . .\n\nSmall islands not capable of protecting themselves, are the proper objects for kingdoms to take under their care; but there is something very absurd, in supposing a continent to be perpetually governed by an island. . . .\n\nO ye that love mankind! Ye that dare oppose, not only the tyranny, but the tyrant, stand forth! Every spot of the old world is overrun with oppression. Freedom hath been hunted round the globe.",
  },
  smithPins: {
    id: "smith-pins",
    type: "source",
    sourceType: "primary",
    source: "smith-wealth-of-nations",
    amsco_review: "pending",
    attribution:
      "Adam Smith, Scottish philosopher and economist, An Inquiry into the Nature and Causes of the Wealth of Nations, 1776",
    citation:
      "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book I, ch. 1. Project Gutenberg eBook #3300.",
    note: "A manufactory is a workshop. Smith is describing the division of labor in pin-making.",
    text: "One man draws out the wire; another straights it; a third cuts it; a fourth points it; a fifth grinds it at the top for receiving the head; to make the head requires two or three distinct operations; to put it on is a peculiar business; to whiten the pins is another; it is even a trade by itself to put them into the paper; and the important business of making a pin is, in this manner, divided into about eighteen distinct operations, which, in some manufactories, are all performed by distinct hands, though in others the same man will sometimes perform two or three of them. I have seen a small manufactory of this kind, where ten men only were employed, and where some of them consequently performed two or three distinct operations.",
  },
  manifestoClass: {
    id: "manifesto-class-struggle",
    type: "source",
    sourceType: "primary",
    source: "marx-engels-1888",
    amsco_review: "pending",
    attribution:
      "Karl Marx and Friedrich Engels, German political philosophers, Manifesto of the Communist Party, 1848",
    citation:
      "Karl Marx and Friedrich Engels, Manifesto of the Communist Party, English edition of 1888, trans. Samuel Moore, sections I and IV. Project Gutenberg eBook #61.",
    note: "The bourgeoisie are the owners of factories and capital; the proletarians are industrial wage workers.",
    text: "The history of all hitherto existing societies is the history of class struggles. . . .\n\nThe need of a constantly expanding market for its products chases the bourgeoisie over the whole surface of the globe. It must nestle everywhere, settle everywhere, establish connexions everywhere. . . .\n\nOwing to the extensive use of machinery and to division of labour, the work of the proletarians has lost all individual character, and consequently, all charm for the workman. He becomes an appendage of the machine . . . .\n\nLet the ruling classes tremble at a Communistic revolution. The proletarians have nothing to lose but their chains. They have a world to win.",
  },
  smilesSelfHelp: {
    id: "smiles-self-help",
    type: "source",
    sourceType: "primary",
    source: "smiles-self-help",
    amsco_review: "pending",
    attribution:
      "Samuel Smiles, Scottish writer and reformer, Self-Help, first published in 1859",
    citation:
      "Samuel Smiles, Self-Help (London: John Murray, 1897), ch. 1. Project Gutenberg eBook #935.",
    text: '"HEAVEN helps those who help themselves" is a well-tried maxim, embodying in a small compass the results of vast human experience. The spirit of self-help is the root of all genuine growth in the individual; and, exhibited in the lives of many, it constitutes the true source of national vigour and strength. Help from without is often enfeebling in its effects, but help from within invariably invigorates. Whatever is done for men or classes, to a certain extent takes away the stimulus and necessity of doing for themselves; and where men are subjected to over-guidance and over-government, the inevitable tendency is to render them comparatively helpless.',
  },
  originalReformMovements: {
    id: "original-reform-movements",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.1 key concept: Enlightenment ideas and religious ideals influenced reform movements, including the abolition of slavery, the end of serfdom, and the expansion of political rights",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing reform movements influenced by Enlightenment ideas, 1780–1900",
    text: "Enlightenment arguments about natural rights gave reformers a powerful language. Abolitionists, many of them also motivated by religious belief, pressed Britain to end its slave trade in 1807 and to abolish slavery in most of its empire in 1833. Russia emancipated its serfs in 1861. In 1848, activists meeting at Seneca Falls, New York, demanded rights for women, including the vote.\n\nChange came slowly and unevenly. The United States ended slavery only in 1865 after a civil war, Brazil in 1888. New Zealand became the first country to allow women to vote in national elections in 1893.",
  },
  originalHaiti: {
    id: "original-haitian-revolution",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.2 key concept: people around the world developed a new sense of commonality, and slave resistance challenged existing authorities in the Americas, as in the Haitian Revolution",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the Haitian Revolution, 1791–1804",
    text: "Saint-Domingue, a French colony on the island of Hispaniola, was the richest colony in the Caribbean, producing much of Europe's sugar and coffee with the labor of about 500,000 enslaved Africans. In 1791, enslaved people rose in revolt. Under leaders such as Toussaint Louverture, they defeated French, Spanish, and British forces, and in 1804 declared the independent nation of Haiti.\n\nHaiti was the only state founded by a successful revolt of enslaved people. Its independence alarmed slaveholders across the Americas, and France demanded a large payment from Haiti in 1825 in exchange for recognition.",
  },
  originalLatinAmerica: {
    id: "original-latin-american-independence",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.2 key concept: discontent with monarchist and imperial rule encouraged the development of political ideologies, and Enlightenment ideas inspired independence movements in Latin America",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing Latin American independence movements, 1810–1825",
    text: "When Napoleon invaded Spain in 1808, Spanish rule in the Americas was thrown into confusion. Creole elites, people of Spanish descent born in the Americas, had long resented that the highest offices went to men born in Spain. Leaders such as Simón Bolívar and José de San Martín led armies that won independence for most of Spanish South America by 1825.\n\nIndependence did not overturn the colonial social order. Creoles took the top positions, while most Indigenous people, mestizos, and people of African descent remained poor and excluded from power.",
  },
  originalNationalism: {
    id: "original-nationalism",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.2 key concept: nationalism, a sense of commonality based on language, religion, social customs, and territory, led to the unification of Italy and Germany",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing Italian and German unification, 1848–1871",
    text: "In the early 1800s, Italy and Germany were divided into many states. Nationalists argued that people who shared a language and culture should share a government. In Italy, Count Camillo di Cavour, prime minister of Piedmont-Sardinia, used diplomacy and war, while Giuseppe Garibaldi's volunteers conquered southern Italy. The Kingdom of Italy was proclaimed in 1861.\n\nIn Germany, the Prussian minister Otto von Bismarck fought three wars, against Denmark, Austria, and France, and proclaimed the German Empire in 1871. Bismarck said great questions would be decided by “iron and blood,” not by speeches.",
  },
  originalWhyBritain: {
    id: "original-why-britain",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.3 key concept: a variety of factors led to the rise of industrial production, including Europe's location on the Atlantic, geographic distribution of coal, iron, and timber, urbanization, and access to foreign resources",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing why industrialization began in Britain, c. 1750–1830",
    text: "Historians point to several reasons that industrial production began in Britain. Britain had large deposits of coal and iron ore near rivers and ports. Improvements in farming, along with the enclosure of common lands, raised food output and pushed laborers toward towns. Merchants and landowners had capital to invest, and banks and a stable government protected property.\n\nOverseas trade mattered too. Colonies and the Atlantic trade supplied raw cotton and markets for finished cloth. Some historians stress that cheap coal and high wages made it profitable for British manufacturers to replace workers with machines.",
  },
  originalTextiles: {
    id: "original-textile-machines",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.3 key concept: the development of machines, including steam engines, and the factory system transformed production, beginning with textiles",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the mechanization of British cotton manufacturing, 1760–1830",
    text: "Cotton spinning was transformed first. The spinning jenny of the 1760s let one worker spin many threads at once, and Richard Arkwright's water frame, patented in 1769, used water power to spin strong thread. Arkwright built mills that gathered hundreds of workers under one roof, keeping them on fixed hours.\n\nWhen steam engines replaced water wheels, mills no longer had to be built beside fast rivers and could be placed in cities near coal and workers. Manchester grew from a market town into the center of a world cotton industry.",
  },
  originalSpread: {
    id: "original-industrial-spread",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.4 key concept: industrialization spread from Great Britain to western Europe, the United States, Russia, and Japan, while production in some regions, such as India's textile industry, declined",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing the spread of industrialization, 1830–1900",
    text: "Belgium, France, and the German states began to industrialize in the early 1800s, often by copying British machines and hiring British engineers. By 1900 the United States and Germany produced more steel than Britain. Russia and Japan began rapid industrialization in the late 1800s, with strong government support.\n\nIndustrialization also had losers. Cheap machine-made cloth from British mills flooded markets in India, where hand spinners and weavers had once supplied much of the world's cotton cloth. India became a major exporter of raw cotton instead.",
  },
  originalSteam: {
    id: "original-steam-technology",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.5 key concept: the development of the steam engine, railroads, steamships, and the telegraph, and later electricity and steel, transformed production, transportation, and communication",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing new technologies of the industrial age, 1770–1900",
    text: "James Watt's improvements to the steam engine, patented in 1769, made it far more efficient. Steam soon powered factories, then locomotives and ships. The Liverpool and Manchester Railway opened in 1830, and by 1900 railroads crossed every inhabited continent. Steamships cut the time of ocean voyages and no longer depended on the wind.\n\nThe telegraph carried messages by electric signal; a cable across the Atlantic worked from 1866. In the late 1800s, a second wave of innovation brought cheap steel, electricity, chemicals, and the internal combustion engine.",
  },
  originalMeiji: {
    id: "original-meiji",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.6 key concept: as states industrialized, they also expanded existing overseas colonies and established new ones; in Japan, the Meiji government promoted industrialization",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing state-led industrialization in Meiji Japan, 1868–1900",
    text: "In 1868 a group of young samurai overthrew the Tokugawa shogunate and restored power to the Meiji emperor. The new leaders feared that Japan would be colonized like parts of China unless it built modern industry and armed forces. They abolished the samurai class, created a conscript army, sent students and officials to study in Europe and the United States, and built railroads, telegraph lines, and model factories.\n\nThe government later sold many factories to private firms. Some of these grew into large family-controlled business groups called zaibatsu. By 1900 Japan was the most industrialized country in Asia.",
  },
  originalEgyptOttoman: {
    id: "original-egypt-ottoman-reform",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.6 key concept: state-sponsored industrialization in the Ottoman Empire and Egypt under Muhammad Ali",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing state-led industrialization in Egypt, 1805–1848",
    text: "Muhammad Ali, who governed Egypt from 1805 to 1848 as a nominal subject of the Ottoman sultan, wanted a strong army and an independent state. He built state-owned factories to make textiles and weapons, brought in European advisers, and required farmers to grow cotton, which the state bought cheaply and sold abroad.\n\nThe factories struggled with high costs and competition from British goods. After European powers forced him to reduce his army and open Egypt's markets in 1841, many factories closed, and Egypt's economy came to depend on exporting raw cotton.",
  },
  originalCorporations: {
    id: "original-corporations",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.7 key concept: as the influence of the industrial states grew, new financial instruments and transnational businesses developed, along with laissez-faire capitalism",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing new business organizations, 1850–1900",
    text: "Laws allowing limited liability, passed in Britain in 1855 and in other countries soon after, meant that investors could lose only the money they had put into a company. This encouraged many people to buy stocks, and stock exchanges grew. Large banks and companies began to operate across borders. The Hongkong and Shanghai Banking Corporation, founded in 1865, financed trade across Asia.\n\nSupporters of laissez-faire capitalism argued that markets worked best with little government interference. Critics pointed to monopolies, harsh working conditions, and periodic economic crises.",
  },
  originalUnions: {
    id: "original-labor-unions",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.8 key concept: workers established labor unions and movements promoting reforms, and some governments responded with reforms",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing workers' movements and reforms in Britain, 1810–1900",
    text: "Early workers' protests in Britain included the Luddites, who smashed textile machines between 1811 and 1816. Over time, workers formed trade unions to bargain for higher wages and shorter hours. The Chartists of the 1830s and 1840s gathered millions of signatures demanding that all men be allowed to vote.\n\nParliament responded with gradual reforms. The Factory Act of 1833 limited child labor in textile mills, and voting rights expanded in 1867 and 1884 to include many working men. Socialists argued that such reforms were not enough.",
  },
  originalSelfStrengthening: {
    id: "original-self-strengthening",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.8 key concept: as the industrial states grew stronger, some states, such as China and the Ottoman Empire, attempted reforms, with mixed results",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing reform efforts in Qing China and the Ottoman Empire, 1839–1895",
    text: "After defeats by Britain and France, Qing officials launched the Self-Strengthening Movement in the 1860s. They built arsenals, shipyards, and a modern navy while keeping Confucian values and the imperial system. Conservative officials resisted deeper change, and Japan destroyed much of the new Chinese navy in 1895.\n\nThe Ottoman Tanzimat reforms, from 1839 to 1876, reorganized the army, courts, and schools along European lines and declared all subjects equal under the law. Critics complained that the reforms increased European influence without stopping the empire's loss of territory.",
  },
  originalFactoryLife: {
    id: "original-factory-life",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.9 key concept: new social classes, including the middle class and the industrial working class, developed, and family dynamics, gender roles, and demographics changed",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing social change in industrial cities, 1800–1900",
    text: "Industrial cities grew faster than housing, water, and sewers. Working families crowded into tenements, and diseases such as cholera spread through polluted water. Factory work ran on the clock, often for twelve or more hours a day, and women and children worked in mills for lower pay than men.\n\nA growing middle class of managers, professionals, and shopkeepers developed new ideals. Middle-class families often expected women to manage the home rather than work for wages, an ideal called separate spheres that few working-class families could afford to follow.",
  },
  originalContinuity5: {
    id: "original-continuity-1750-1900",
    type: "source",
    sourceType: "original",
    source:
      "CED Topic 5.10 key concept: continuity and change in political ideas, economies, and societies during the age of revolutions and industrialization",
    amsco_review: "pending",
    attribution:
      "Practice passage written for Page One, summarizing continuity and change, 1750–1900",
    text: "Between 1750 and 1900, ideas of natural rights and national self-government spread widely, and new nations formed across the Americas and Europe. Machines and fossil fuels transformed how goods were made and moved.\n\nYet much continued. Most people in the world still farmed, monarchies still ruled many states, and the new industrial wealth was concentrated in a few countries. Political rights expanded for some groups while women, colonized peoples, and many workers remained excluded.",
  },
  // END unit-05
};

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
};

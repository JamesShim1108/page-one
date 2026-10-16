// Reading passages for PSAT/SAT practice. Public domain only.
//
// Each record:
//   id: "tp-p-<short-name>"
//   text: the excerpt exactly as printed in the cited edition. Mark omissions
//         with ". . ." and list every bracketed editorial change in `edits`.
//         Blank lines separate paragraphs.
//   source: { author, title, year, publication, url, basis, gutenberg }
//     year: first publication year (an integer)
//     basis: "us-pre-1931" (published 1930 or earlier) or
//            "us-government-work" (a work of the U.S. federal government)
//     gutenberg: the Project Gutenberg ebook number used to check the text
//   edits: optional list of { original, replacement } bracketed changes
//
// Check every passage against the full texts before committing a change:
//   node scripts/verify-test-prep-passages.mjs path/to/texts
//
// Items reference a passage with `passageId` (or `passageIds` for two texts).
// A passage whose wording is hidden by an item's blank is used by that item
// only, so another item never reveals the answer.

const source = (author, title, year, publication, gutenberg) => ({
  author,
  title,
  year,
  publication,
  url: `https://www.gutenberg.org/ebooks/${gutenberg}`,
  basis: "us-pre-1931",
  gutenberg,
});

const muir = source(
  "John Muir",
  "My First Summer in the Sierra",
  1911,
  "Houghton Mifflin",
  32540,
);
const zitkala = source(
  "Zitkala-Ša",
  "American Indian Stories",
  1921,
  "Hayworth Publishing House",
  10376,
);
const washington = source(
  "Booker T. Washington",
  "Up from Slavery: An Autobiography",
  1901,
  "Doubleday, Page & Co.",
  2376,
);
const darwin = source(
  "Charles Darwin",
  "The Formation of Vegetable Mould, through the Action of Worms",
  1881,
  "John Murray",
  2355,
);
const thoreau = source("Henry David Thoreau", "Walden", 1854, "Ticknor and Fields", 205);
const gilman = source("Charlotte Perkins Gilman", "Herland", 1915, "The Forerunner", 32);
const douglass = source(
  "Frederick Douglass",
  "Narrative of the Life of Frederick Douglass, an American Slave",
  1845,
  "Anti-Slavery Office",
  23,
);
const austen = source("Jane Austen", "Pride and Prejudice", 1813, "T. Egerton", 1342);
const white = source(
  "Gilbert White",
  "The Natural History and Antiquities of Selborne",
  1789,
  "B. White and Son",
  1408,
);
const dubois = source(
  "W. E. B. Du Bois",
  "The Souls of Black Folk",
  1903,
  "A. C. McClurg & Co.",
  408,
);

export const passages = [
  // Information and Ideas
  {
    id: "tp-p-muir-hitched",
    text: "No Sierra landscape that I have seen holds anything truly dead or dull, or any trace of what in manufactories is called rubbish or waste; everything is perfectly clean and pure and full of divine lessons. This quick, inevitable interest attaching to everything seems marvelous until the hand of God becomes visible; then it seems reasonable that what interests Him may well interest us. When we try to pick out anything by itself, we find it hitched to everything else in the universe. One fancies a heart like our own must be beating in every crystal and cell, and we feel like stopping to speak to the plants and animals as friendly fellow mountaineers.",
    source: muir,
  },
  {
    id: "tp-p-zitkala-oversight",
    text: "After some experience I usually drew easy and simple crosses and squares. These were some of the set forms. My original designs were not always symmetrical nor sufficiently characteristic, two faults with which my mother had little patience. The quietness of her oversight made me feel strongly responsible and dependent upon my own judgment. She treated me as a dignified little individual as long as I was on my good behavior; and how humiliated I was when some boldness of mine drew forth a rebuke from her!",
    source: zitkala,
  },
  {
    id: "tp-p-washington-sweeping",
    text: "After some hours had passed, the head teacher said to me: “The adjoining recitation-room needs sweeping. Take the broom and sweep it.”\n\nIt occurred to me at once that here was my chance. Never did I receive an order with more delight. . . . I had the feeling that in a large measure my future depended upon the impression I made upon the teacher in the cleaning of that room.",
    source: washington,
  },
  {
    id: "tp-p-darwin-turf",
    text: "When we behold a wide, turf-covered expanse, we should remember that its smoothness, on which so much of its beauty depends, is mainly due to all the inequalities having been slowly levelled by worms. It is a marvellous reflection that the whole of the superficial mould over any such expanse has passed, and will again pass, every few years through the bodies of worms.",
    source: darwin,
  },
  {
    id: "tp-p-thoreau-woods",
    text: "I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived. I did not wish to live what was not life, living is so dear; nor did I wish to practise resignation, unless it was quite necessary. I wanted to live deep and suck out all the marrow of life, to live so sturdily and Spartan-like as to put to rout all that was not life, to cut a broad swath and shave close, to drive life into a corner, and reduce it to its lowest terms, and, if it proved to be mean, why then to get the whole and genuine meanness of it, and publish its meanness to the world; or if it were sublime, to know it by experience, and be able to give a true account of it in my next excursion.",
    source: thoreau,
  },
  {
    id: "tp-p-muir-lily",
    text: "Found the white fragrant Washington lily, the finest of all the Sierra lilies. Its bulbs are buried in shaggy chaparral tangles, I suppose for safety from pawing bears; and its magnificent panicles sway and rock over the top of the rough snow-pressed bushes, while big, bold, blunt-nosed bees drone and mumble in its polleny bells. A lovely flower, worth going hungry and footsore endless miles to see. The whole world seems richer now that I have found this plant in so noble a landscape.",
    source: muir,
  },
  {
    id: "tp-p-herland-friends",
    text: "As for me, sociology's my major. You have to back that up with a lot of other sciences, of course. I'm interested in them all.\n\nTerry was strong on facts—geography and meteorology and those; Jeff could beat him any time on biology, and I didn't care what it was they talked about, so long as it connected with human life, somehow. There are few things that don't.",
    source: gilman,
  },
  {
    id: "tp-p-thoreau-house",
    text: "I have thus a tight shingled and plastered house, ten feet wide by fifteen long, and eight-feet posts, with a garret and a closet, a large window on each side, two trap doors, one door at the end, and a brick fireplace opposite.",
    source: thoreau,
  },
  {
    id: "tp-p-darwin-tons",
    text: "In many parts of England a weight of more than ten tons (10,516 kilogrammes) of dry earth annually passes through their bodies and is brought to the surface on each acre of land; so that the whole superficial bed of vegetable mould passes through their bodies in the course of every few years.",
    source: darwin,
  },
  {
    id: "tp-p-thoreau-beans",
    text: "I harvested twelve bushels of beans.\n\nBut to be more particular, for it is complained that Mr. Coleman has reported chiefly the expensive experiments of gentlemen farmers, my outgoes were . . .",
    source: thoreau,
  },
  {
    id: "tp-p-douglass-argument",
    text: "The very decided manner with which he spoke, and strove to impress his wife with the evil consequences of giving me instruction, served to convince me that he was deeply sensible of the truths he was uttering. . . . What he most dreaded, that I most desired. What he most loved, that I most hated. That which to him was a great evil, to be carefully shunned, was to me a great good, to be diligently sought; and the argument which he so warmly urged, against my learning to read, only served to inspire me with a desire and determination to learn.",
    source: douglass,
  },
  {
    id: "tp-p-zitkala-trials",
    text: "It took many trials before I learned how to knot my sinew thread on the point of my finger, as I saw her do. Then the next difficulty was in keeping my thread stiffly twisted, so that I could easily string my beads upon it. My mother required of me original designs for my lessons in beading. At first I frequently ensnared many a sunny hour into working a long design. Soon I learned from self-inflicted punishment to refrain from drawing complex patterns, for I had to finish whatever I began.",
    source: zitkala,
  },
  {
    id: "tp-p-herland-inference",
    text: "[They] had inferred (marvelously keen on inference and deduction their minds were!) the existence and development of civilization in other places, much as we infer it on other planets.\n\nWhen our biplane came whirring over their heads in that first scouting flight of ours, they had instantly accepted it as proof of the high development of Some Where Else, and had prepared to receive us as cautiously and eagerly as we might prepare to welcome visitors who came “by meteor” from Mars.",
    source: gilman,
    edits: [{ original: "Nevertheless, they", replacement: "They" }],
  },
  {
    id: "tp-p-darwin-mississippi",
    text: "For the sake of those who have never attended to this subject, a single instance may be here given, namely, that of the Mississippi, which is chosen because the amount of sediment brought down by this great river has been investigated with especial care by order of the United States Government. The result is, as Mr. Croll shows, that the mean level of its enormous area of drainage must be lowered 1/4566 of a foot annually, or 1 foot in 4566 years. Consequently, taking the best estimate of the mean height of the North American continent, viz. 748 feet, and looking to the future, the whole of the great Mississippi basin will be washed away, and “brought down to the sea-level in less than 4,500,000 years, if no elevation of the land takes place.”",
    source: darwin,
  },

  // Craft and Structure
  {
    id: "tp-p-douglass-fixed",
    text: "Whilst I was saddened by the thought of losing the aid of my kind mistress, I was gladdened by the invaluable instruction which, by the merest accident, I had gained from my master. Though conscious of the difficulty of learning without a teacher, I set out with high hope, and a fixed purpose, at whatever cost of trouble, to learn how to read.",
    source: douglass,
  },
  {
    id: "tp-p-herland-cats",
    text: "What do you suppose these Lady Burbanks had done with their cats? By the most prolonged and careful selection and exclusion they had developed a race of cats that did not sing! That's a fact. The most those poor dumb brutes could do was to make a kind of squeak when they were hungry or wanted the door open, and, of course, to purr, and make the various mother-noises to their kittens.\n\nMoreover, they had ceased to kill birds. They were rigorously bred to destroy mice and moles and all such enemies of the food supply; but the birds were numerous and safe.",
    source: gilman,
  },
  {
    id: "tp-p-douglass-shipyard",
    text: "The idea as to how I might learn to write was suggested to me by being in Durgin and Bailey's ship-yard, and frequently seeing the ship carpenters, after hewing, and getting a piece of timber ready for use, write on the timber the name of that part of the ship for which it was intended. When a piece of timber was intended for the larboard side, it would be marked thus—“L.” When a piece was for the starboard side, it would be marked thus—“S.” . . . I soon learned the names of these letters, and for what they were intended when placed upon a piece of timber in the ship-yard. I immediately commenced copying them, and in a short time was able to make the four letters named.",
    source: douglass,
  },
  {
    id: "tp-p-muir-tenaya",
    text: "Scarce a handful of loose soil is to be seen on the north shore. All is bare, shining granite, suggesting the Indian name of the lake, Pywiack, meaning shining rock. The basin seems to have been slowly excavated by the ancient glaciers, a marvelous work requiring countless thousands of years.",
    source: muir,
  },
  {
    id: "tp-p-austen-truth",
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\n\nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.",
    source: austen,
  },
  {
    id: "tp-p-white-worms",
    text: "Earth-worms, though in appearance a small and despicable link in the chain of nature, yet, if lost, would make a lamentable chasm. For, to say nothing of half the birds, and some quadrupeds, which are almost entirely supported by them, worms seem to be the great promoters of vegetation, which would proceed but lamely without them, by boring, perforating, and loosening the soil, and rendering it pervious to rains and the fibres of plants . . .",
    source: white,
  },
  {
    id: "tp-p-darwin-plough",
    text: "The plough is one of the most ancient and most valuable of man’s inventions; but long before he existed the land was in fact regularly ploughed, and still continues to be thus ploughed by earth-worms. It may be doubted whether there are many other animals which have played so important a part in the history of the world, as have these lowly organized creatures.",
    source: darwin,
  },
  {
    id: "tp-p-washington-atlanta",
    text: "Our greatest danger is that in the great leap from slavery to freedom we may overlook the fact that the masses of us are to live by the productions of our hands, and fail to keep in mind that we shall prosper in proportion as we learn to dignify and glorify common labour and put brains and skill into the common occupations of life . . . . No race can prosper till it learns that there is as much dignity in tilling a field as in writing a poem. It is at the bottom of life we must begin, and not at the top.",
    source: washington,
  },
  {
    id: "tp-p-dubois-washington",
    text: "Mr. Washington represents in Negro thought the old attitude of adjustment and submission; but adjustment at such a peculiar time as to make his programme unique. This is an age of unusual economic development, and Mr. Washington's programme naturally takes an economic cast, becoming a gospel of Work and Money to such an extent as apparently almost completely to overshadow the higher aims of life.",
    source: dubois,
  },

  // Expression of Ideas
  {
    id: "tp-p-darwin-peewit",
    text: "The Peewit . . . seems to know instinctively that worms will emerge if the ground is made to tremble; for Bishop Stanley states (as I hear from Mr. Moorhouse) that a young peewit kept in confinement used to stand on one leg and beat the turf with the other leg until the worms crawled out of their burrows, when they were instantly devoured. Nevertheless, worms do not invariably leave their burrows when the ground is made to tremble, as I know by having beaten it with a spade, but perhaps it was beaten too violently.",
    source: darwin,
  },
  {
    id: "tp-p-darwin-ants",
    text: "But it is surprising that an animal so low in the scale as a worm should have the capacity for acting in this manner, as many higher animals have no such capacity. For instance, ants may be seen vainly trying to drag an object transversely to their course, which could be easily drawn longitudinally . . .",
    source: darwin,
  },
  {
    id: "tp-p-herland-unit",
    text: "To them the country was a unit—it was theirs. They themselves were a unit, a conscious group; they thought in terms of the community. As such, their time-sense was not limited to the hopes and ambitions of an individual life. Therefore, they habitually considered and carried out plans for improvement which might cover centuries.",
    source: gilman,
  },
  {
    id: "tp-p-washington-hat",
    text: "When, however, I found myself at the school for the first time, I also found myself confronted with two other difficulties. In the first place, I found that all the other children wore hats or caps on their heads, and I had neither hat nor cap. In fact, I do not remember that up to the time of going to school I had ever worn any kind of covering upon my head, nor do I recall that either I or anybody else had even thought anything about the need of covering for my head.",
    source: washington,
  },

  // Standard English Conventions
  {
    id: "tp-p-herland-terry",
    text: "Terry was rich enough to do as he pleased. His great aim was exploration. He used to make all kinds of a row because there was nothing left to explore now, only patchwork and filling in, he said.",
    source: gilman,
  },
  {
    id: "tp-p-washington-swept",
    text: "I swept the recitation-room three times. Then I got a dusting-cloth and dusted it four times. All the woodwork around the walls, every bench, table, and desk, I went over four times with my dusting-cloth.",
    source: washington,
  },
  {
    id: "tp-p-washington-examination",
    text: "I was one of the happiest souls on Earth. The sweeping of that room was my college examination, and never did any youth pass an examination for entrance into Harvard or Yale that gave him more genuine satisfaction.",
    source: washington,
  },
  {
    id: "tp-p-douglass-copybook",
    text: "In this way I got a good many lessons in writing, which it is quite possible I should never have gotten in any other way. During this time, my copy-book was the board fence, brick wall, and pavement; my pen and ink was a lump of chalk. With these, I learned mainly how to write.",
    source: douglass,
  },
  {
    id: "tp-p-zitkala-wigwam",
    text: "Soon after breakfast mother sometimes began her beadwork. On a bright, clear day, she pulled out the wooden pegs that pinned the skirt of our wigwam to the ground, and rolled the canvas part way up on its frame of slender poles. Then the cool morning breezes swept freely through our dwelling, now and then wafting the perfume of sweet grasses from newly burnt prairie.",
    source: zitkala,
  },
  {
    id: "tp-p-herland-science",
    text: "We had known each other years and years, and in spite of our differences we had a good deal in common. All of us were interested in science.",
    source: gilman,
  },
  {
    id: "tp-p-darwin-muscular",
    text: "[Worms] have played a more important part in the history of the world than most persons would at first suppose. In almost all humid countries they are extraordinarily numerous, and for their size possess great muscular power.",
    source: darwin,
    edits: [{ original: "WORMS", replacement: "Worms" }],
  },
  {
    id: "tp-p-darwin-body",
    text: "The whole body of a worm is sensitive to contact. A slight puff of air from the mouth causes an instant retreat.",
    source: darwin,
  },
  {
    id: "tp-p-thoreau-compose",
    text: "The exact cost of my house, paying the usual price for such materials as I used, but not counting the work, all of which was done by myself, was as follows; and I give the details because very few are able to tell exactly what their houses cost, and fewer still, if any, the separate cost of the various materials which compose them . . .",
    source: thoreau,
  },
  {
    id: "tp-p-douglass-thomas",
    text: "My mistress used to go to class meeting at the Wilk Street meetinghouse every Monday afternoon, and leave me to take care of the house. When left thus, I used to spend the time in writing in the spaces left in Master Thomas's copy-book, copying what he had written. I continued to do this until I could write a hand very similar to that of Master Thomas.",
    source: douglass,
  },
];

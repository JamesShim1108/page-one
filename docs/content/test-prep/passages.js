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
// Items reference a passage with `passageId`, `passageIds` (two texts), or
// `quotesFrom` (quotation choices). Each passage is used by one item only.
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

const london = source("Jack London", "The Call of the Wild", 1903, "Macmillan", 215);
const austenEmma = source("Jane Austen", "Emma", 1815, "John Murray", 158);
const jewett = source(
  "Sarah Orne Jewett",
  "The Country of the Pointed Firs",
  1896,
  "Houghton, Mifflin and Company",
  367,
);
const yellowWallpaper = source(
  "Charlotte Perkins Gilman",
  "The Yellow Wallpaper",
  1892,
  "The New England Magazine",
  1952,
);
const twain = source(
  "Mark Twain",
  "Life on the Mississippi",
  1883,
  "James R. Osgood and Company",
  245,
);
const faraday = source(
  "Michael Faraday",
  "The Chemical History of a Candle",
  1861,
  "Griffin, Bohn, and Company",
  14474,
);
const wharton = source(
  "Edith Wharton",
  "The Age of Innocence",
  1920,
  "D. Appleton and Company",
  541,
);
const burnett = source(
  "Frances Hodgson Burnett",
  "The Secret Garden",
  1911,
  "Frederick A. Stokes",
  113,
);
const alcott = source("Louisa May Alcott", "Little Women", 1868, "Roberts Brothers", 514);
const wilde = source(
  "Oscar Wilde",
  "The Picture of Dorian Gray",
  1891,
  "Ward, Lock and Company",
  174,
);
const dickens = source(
  "Charles Dickens",
  "Great Expectations",
  1861,
  "Chapman and Hall",
  1400,
);
const montgomery = source(
  "L. M. Montgomery",
  "Anne of Green Gables",
  1908,
  "L. C. Page & Company",
  45,
);

// Each passage belongs to exactly one question, as on the real test, and opens
// with a line naming the author, the work, and the year.
export const passages = [
  {
    id: "tp-p-muir-hitched",
    intro:
      "The following text is from John Muir's 1911 book My First Summer in the Sierra, a journal of the summer of 1869, which he spent in the Sierra Nevada mountains of California.",
    text: "No Sierra landscape that I have seen holds anything truly dead or dull, or any trace of what in manufactories is called rubbish or waste; everything is perfectly clean and pure and full of divine lessons. This quick, inevitable interest attaching to everything seems marvelous until the hand of God becomes visible; then it seems reasonable that what interests Him may well interest us. When we try to pick out anything by itself, we find it hitched to everything else in the universe. One fancies a heart like our own must be beating in every crystal and cell, and we feel like stopping to speak to the plants and animals as friendly fellow mountaineers.",
    source: muir,
  },
  {
    id: "tp-p-zitkala-oversight",
    intro:
      "The following text is from Zitkala-Ša's 1921 book American Indian Stories. She recalls learning beadwork from her mother as a child.",
    text: "After some experience I usually drew easy and simple crosses and squares. These were some of the set forms. My original designs were not always symmetrical nor sufficiently characteristic, two faults with which my mother had little patience. The quietness of her oversight made me feel strongly responsible and dependent upon my own judgment. She treated me as a dignified little individual as long as I was on my good behavior; and how humiliated I was when some boldness of mine drew forth a rebuke from her!",
    source: zitkala,
  },
  {
    id: "tp-p-washington-sweeping",
    intro:
      "The following text is from Booker T. Washington's 1901 autobiography Up from Slavery. As a teenager, he has arrived at a school whose head teacher has not yet decided whether to admit him.",
    text: "After some hours had passed, the head teacher said to me: “The adjoining recitation-room needs sweeping. Take the broom and sweep it.”\n\nIt occurred to me at once that here was my chance. Never did I receive an order with more delight. . . . I had the feeling that in a large measure my future depended upon the impression I made upon the teacher in the cleaning of that room.",
    source: washington,
  },
  {
    id: "tp-p-darwin-turf",
    intro:
      "The following text is from Charles Darwin's 1881 book The Formation of Vegetable Mould, through the Action of Worms.",
    text: "When we behold a wide, turf-covered expanse, we should remember that its smoothness, on which so much of its beauty depends, is mainly due to all the inequalities having been slowly levelled by worms. It is a marvellous reflection that the whole of the superficial mould over any such expanse has passed, and will again pass, every few years through the bodies of worms.",
    source: darwin,
  },
  {
    id: "tp-p-thoreau-woods",
    intro: "The following text is from Henry David Thoreau's 1854 book Walden.",
    text: "I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived. I did not wish to live what was not life, living is so dear; nor did I wish to practise resignation, unless it was quite necessary. I wanted to live deep and suck out all the marrow of life, to live so sturdily and Spartan-like as to put to rout all that was not life, to cut a broad swath and shave close, to drive life into a corner, and reduce it to its lowest terms, and, if it proved to be mean, why then to get the whole and genuine meanness of it, and publish its meanness to the world; or if it were sublime, to know it by experience, and be able to give a true account of it in my next excursion.",
    source: thoreau,
  },
  {
    id: "tp-p-muir-lily",
    intro:
      "The following text is from John Muir's 1911 book My First Summer in the Sierra.",
    text: "Found the white fragrant Washington lily, the finest of all the Sierra lilies. Its bulbs are buried in shaggy chaparral tangles, I suppose for safety from pawing bears; and its magnificent panicles sway and rock over the top of the rough snow-pressed bushes, while big, bold, blunt-nosed bees drone and mumble in its polleny bells. A lovely flower, worth going hungry and footsore endless miles to see. The whole world seems richer now that I have found this plant in so noble a landscape.",
    source: muir,
  },
  {
    id: "tp-p-herland-friends",
    intro: "The following text is from Charlotte Perkins Gilman's 1915 novel Herland.",
    text: "As for me, sociology's my major. You have to back that up with a lot of other sciences, of course. I'm interested in them all.\n\nTerry was strong on facts—geography and meteorology and those; Jeff could beat him any time on biology, and I didn't care what it was they talked about, so long as it connected with human life, somehow. There are few things that don't.",
    source: gilman,
  },
  {
    id: "tp-p-thoreau-house",
    intro:
      "The following text is from Henry David Thoreau's 1854 book Walden. Thoreau built the house himself near Walden Pond in Massachusetts.",
    text: "I have thus a tight shingled and plastered house, ten feet wide by fifteen long, and eight-feet posts, with a garret and a closet, a large window on each side, two trap doors, one door at the end, and a brick fireplace opposite.",
    source: thoreau,
  },
  {
    id: "tp-p-darwin-tons",
    intro:
      "The following text is from Charles Darwin's 1881 book The Formation of Vegetable Mould, through the Action of Worms.",
    text: "In many parts of England a weight of more than ten tons (10,516 kilogrammes) of dry earth annually passes through their bodies and is brought to the surface on each acre of land; so that the whole superficial bed of vegetable mould passes through their bodies in the course of every few years.",
    source: darwin,
  },
  {
    id: "tp-p-thoreau-beans",
    intro:
      "The following text is from Henry David Thoreau's 1854 book Walden. Thoreau farmed a field near his cabin for one season.",
    text: "I harvested twelve bushels of beans.\n\nBut to be more particular, for it is complained that Mr. Coleman has reported chiefly the expensive experiments of gentlemen farmers, my outgoes were . . .",
    source: thoreau,
  },
  {
    id: "tp-p-douglass-argument",
    intro:
      "The following text is from Frederick Douglass's 1845 autobiography Narrative of the Life of Frederick Douglass, an American Slave. Douglass has just overheard his enslaver warn that teaching him to read would make him impossible to control.",
    text: "The very decided manner with which he spoke, and strove to impress his wife with the evil consequences of giving me instruction, served to convince me that he was deeply sensible of the truths he was uttering. . . . What he most dreaded, that I most desired. What he most loved, that I most hated. That which to him was a great evil, to be carefully shunned, was to me a great good, to be diligently sought; and the argument which he so warmly urged, against my learning to read, only served to inspire me with a desire and determination to learn.",
    source: douglass,
  },
  {
    id: "tp-p-zitkala-trials",
    intro:
      "The following text is from Zitkala-Ša's 1921 book American Indian Stories. She recalls learning beadwork from her mother as a child.",
    text: "It took many trials before I learned how to knot my sinew thread on the point of my finger, as I saw her do. Then the next difficulty was in keeping my thread stiffly twisted, so that I could easily string my beads upon it. My mother required of me original designs for my lessons in beading. At first I frequently ensnared many a sunny hour into working a long design. Soon I learned from self-inflicted punishment to refrain from drawing complex patterns, for I had to finish whatever I began.",
    source: zitkala,
  },
  {
    id: "tp-p-herland-inference",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1915 novel Herland. The narrator describes the people of a country that had long been cut off from the rest of the world.",
    text: "[They] had inferred (marvelously keen on inference and deduction their minds were!) the existence and development of civilization in other places, much as we infer it on other planets.\n\nWhen our biplane came whirring over their heads in that first scouting flight of ours, they had instantly accepted it as proof of the high development of Some Where Else, and had prepared to receive us as cautiously and eagerly as we might prepare to welcome visitors who came “by meteor” from Mars.",
    source: gilman,
    edits: [{ original: "Nevertheless, they", replacement: "They" }],
  },
  {
    id: "tp-p-darwin-mississippi",
    intro:
      "The following text is from Charles Darwin's 1881 book The Formation of Vegetable Mould, through the Action of Worms. Darwin uses a river to show how quickly running water can wear land away.",
    text: "For the sake of those who have never attended to this subject, a single instance may be here given, namely, that of the Mississippi, which is chosen because the amount of sediment brought down by this great river has been investigated with especial care by order of the United States Government. The result is, as Mr. Croll shows, that the mean level of its enormous area of drainage must be lowered 1/4566 of a foot annually, or 1 foot in 4566 years. Consequently, taking the best estimate of the mean height of the North American continent, viz. 748 feet, and looking to the future, the whole of the great Mississippi basin will be washed away, and “brought down to the sea-level in less than 4,500,000 years, if no elevation of the land takes place.”",
    source: darwin,
  },
  {
    id: "tp-p-douglass-fixed",
    intro:
      "The following text is from Frederick Douglass's 1845 autobiography. His enslaver has just forbidden anyone to teach him to read.",
    text: "Whilst I was saddened by the thought of losing the aid of my kind mistress, I was gladdened by the invaluable instruction which, by the merest accident, I had gained from my master. Though conscious of the difficulty of learning without a teacher, I set out with high hope, and a fixed purpose, at whatever cost of trouble, to learn how to read.",
    source: douglass,
  },
  {
    id: "tp-p-herland-cats",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1915 novel Herland. The narrator describes the cats raised by the women of an isolated country.",
    text: "What do you suppose these Lady Burbanks had done with their cats? By the most prolonged and careful selection and exclusion they had developed a race of cats that did not sing! That's a fact. The most those poor dumb brutes could do was to make a kind of squeak when they were hungry or wanted the door open, and, of course, to purr, and make the various mother-noises to their kittens.\n\nMoreover, they had ceased to kill birds. They were rigorously bred to destroy mice and moles and all such enemies of the food supply; but the birds were numerous and safe.",
    source: gilman,
  },
  {
    id: "tp-p-douglass-shipyard",
    intro:
      "The following text is from Frederick Douglass's 1845 autobiography. As a boy, Douglass lived near a shipyard in Baltimore.",
    text: "The idea as to how I might learn to write was suggested to me by being in Durgin and Bailey's ship-yard, and frequently seeing the ship carpenters, after hewing, and getting a piece of timber ready for use, write on the timber the name of that part of the ship for which it was intended. When a piece of timber was intended for the larboard side, it would be marked thus—“L.” When a piece was for the starboard side, it would be marked thus—“S.” . . . I soon learned the names of these letters, and for what they were intended when placed upon a piece of timber in the ship-yard. I immediately commenced copying them, and in a short time was able to make the four letters named.",
    source: douglass,
  },
  {
    id: "tp-p-muir-tenaya",
    intro:
      "The following text is from John Muir's 1911 book My First Summer in the Sierra. Muir describes a lake in the Sierra Nevada mountains.",
    text: "Scarce a handful of loose soil is to be seen on the north shore. All is bare, shining granite, suggesting the Indian name of the lake, Pywiack, meaning shining rock. The basin seems to have been slowly excavated by the ancient glaciers, a marvelous work requiring countless thousands of years.",
    source: muir,
  },
  {
    id: "tp-p-austen-truth",
    intro:
      "The following text is from the opening of Jane Austen's 1813 novel Pride and Prejudice.",
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\n\nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.",
    source: austen,
  },
  {
    id: "tp-p-white-worms",
    intro:
      "Text 1 is from a 1777 letter by the English naturalist Gilbert White, published in his 1789 book The Natural History and Antiquities of Selborne.",
    text: "Earth-worms, though in appearance a small and despicable link in the chain of nature, yet, if lost, would make a lamentable chasm. For, to say nothing of half the birds, and some quadrupeds, which are almost entirely supported by them, worms seem to be the great promoters of vegetation, which would proceed but lamely without them, by boring, perforating, and loosening the soil, and rendering it pervious to rains and the fibres of plants . . .",
    source: white,
  },
  {
    id: "tp-p-darwin-plough",
    intro:
      "Text 2 is from Charles Darwin's 1881 book The Formation of Vegetable Mould, through the Action of Worms.",
    text: "The plough is one of the most ancient and most valuable of man’s inventions; but long before he existed the land was in fact regularly ploughed, and still continues to be thus ploughed by earth-worms. It may be doubted whether there are many other animals which have played so important a part in the history of the world, as have these lowly organized creatures.",
    source: darwin,
  },
  {
    id: "tp-p-washington-atlanta",
    intro:
      "Text 1 is from a speech Booker T. Washington gave in Atlanta in 1895, printed in his 1901 autobiography Up from Slavery.",
    text: "Our greatest danger is that in the great leap from slavery to freedom we may overlook the fact that the masses of us are to live by the productions of our hands, and fail to keep in mind that we shall prosper in proportion as we learn to dignify and glorify common labour and put brains and skill into the common occupations of life . . . . No race can prosper till it learns that there is as much dignity in tilling a field as in writing a poem. It is at the bottom of life we must begin, and not at the top.",
    source: washington,
  },
  {
    id: "tp-p-dubois-washington",
    intro: "Text 2 is from W. E. B. Du Bois's 1903 book The Souls of Black Folk.",
    text: "Mr. Washington represents in Negro thought the old attitude of adjustment and submission; but adjustment at such a peculiar time as to make his programme unique. This is an age of unusual economic development, and Mr. Washington's programme naturally takes an economic cast, becoming a gospel of Work and Money to such an extent as apparently almost completely to overshadow the higher aims of life.",
    source: dubois,
  },
  {
    id: "tp-p-darwin-peewit",
    intro:
      "The following text is from Charles Darwin's 1881 book The Formation of Vegetable Mould, through the Action of Worms. Darwin is discussing what makes earthworms leave their burrows.",
    text: "The Peewit . . . seems to know instinctively that worms will emerge if the ground is made to tremble; for Bishop Stanley states (as I hear from Mr. Moorhouse) that a young peewit kept in confinement used to stand on one leg and beat the turf with the other leg until the worms crawled out of their burrows, when they were instantly devoured. Nevertheless, worms do not invariably leave their burrows when the ground is made to tremble, as I know by having beaten it with a spade, but perhaps it was beaten too violently.",
    source: darwin,
  },
  {
    id: "tp-p-darwin-ants",
    intro:
      "The following text is from Charles Darwin's 1881 book The Formation of Vegetable Mould, through the Action of Worms. Darwin has described how worms pull leaves into their burrows, trying different ways until one works.",
    text: "But it is surprising that an animal so low in the scale as a worm should have the capacity for acting in this manner, as many higher animals have no such capacity. For instance, ants may be seen vainly trying to drag an object transversely to their course, which could be easily drawn longitudinally . . .",
    source: darwin,
  },
  {
    id: "tp-p-herland-unit",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1915 novel Herland. The narrator describes how the people of an isolated country think about their land.",
    text: "To them the country was a unit—it was theirs. They themselves were a unit, a conscious group; they thought in terms of the community. As such, their time-sense was not limited to the hopes and ambitions of an individual life. Therefore, they habitually considered and carried out plans for improvement which might cover centuries.",
    source: gilman,
  },
  {
    id: "tp-p-washington-hat",
    intro:
      "The following text is from Booker T. Washington's 1901 autobiography Up from Slavery. He recalls his first days at school.",
    text: "When, however, I found myself at the school for the first time, I also found myself confronted with two other difficulties. In the first place, I found that all the other children wore hats or caps on their heads, and I had neither hat nor cap. In fact, I do not remember that up to the time of going to school I had ever worn any kind of covering upon my head, nor do I recall that either I or anybody else had even thought anything about the need of covering for my head.",
    source: washington,
  },
  {
    id: "tp-p-herland-terry",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1915 novel Herland. The narrator describes his friend Terry.",
    text: "Terry was rich enough to do as he pleased. His great aim was exploration. He used to make all kinds of a row because there was nothing left to explore now, only patchwork and filling in, he said.",
    source: gilman,
  },
  {
    id: "tp-p-washington-swept",
    intro:
      "The following text is from Booker T. Washington's 1901 autobiography Up from Slavery. He describes cleaning a classroom to show a teacher that he deserved to be admitted to her school.",
    text: "I swept the recitation-room three times. Then I got a dusting-cloth and dusted it four times. All the woodwork around the walls, every bench, table, and desk, I went over four times with my dusting-cloth.",
    source: washington,
  },
  {
    id: "tp-p-washington-examination",
    intro:
      "The following text is from Booker T. Washington's 1901 autobiography Up from Slavery. He has just learned that he will be admitted to school.",
    text: "I was one of the happiest souls on Earth. The sweeping of that room was my college examination, and never did any youth pass an examination for entrance into Harvard or Yale that gave him more genuine satisfaction.",
    source: washington,
  },
  {
    id: "tp-p-douglass-copybook",
    intro:
      "The following text is from Frederick Douglass's 1845 autobiography. He describes how he taught himself to write.",
    text: "In this way I got a good many lessons in writing, which it is quite possible I should never have gotten in any other way. During this time, my copy-book was the board fence, brick wall, and pavement; my pen and ink was a lump of chalk. With these, I learned mainly how to write.",
    source: douglass,
  },
  {
    id: "tp-p-zitkala-wigwam",
    intro:
      "The following text is from Zitkala-Ša's 1921 book American Indian Stories. She describes mornings in her family's home.",
    text: "Soon after breakfast mother sometimes began her beadwork. On a bright, clear day, she pulled out the wooden pegs that pinned the skirt of our wigwam to the ground, and rolled the canvas part way up on its frame of slender poles. Then the cool morning breezes swept freely through our dwelling, now and then wafting the perfume of sweet grasses from newly burnt prairie.",
    source: zitkala,
  },
  {
    id: "tp-p-herland-science",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1915 novel Herland. The narrator describes what he and his two friends shared.",
    text: "We had known each other years and years, and in spite of our differences we had a good deal in common. All of us were interested in science.",
    source: gilman,
  },
  {
    id: "tp-p-darwin-muscular",
    intro:
      "The following text is from Charles Darwin's 1881 book The Formation of Vegetable Mould, through the Action of Worms.",
    text: "[Worms] have played a more important part in the history of the world than most persons would at first suppose. In almost all humid countries they are extraordinarily numerous, and for their size possess great muscular power.",
    source: darwin,
    edits: [{ original: "WORMS", replacement: "Worms" }],
  },
  {
    id: "tp-p-thoreau-compose",
    intro:
      "The following text is from Henry David Thoreau's 1854 book Walden. Thoreau introduces a list of what it cost to build his house.",
    text: "The exact cost of my house, paying the usual price for such materials as I used, but not counting the work, all of which was done by myself, was as follows; and I give the details because very few are able to tell exactly what their houses cost, and fewer still, if any, the separate cost of the various materials which compose them . . .",
    source: thoreau,
  },
  {
    id: "tp-p-douglass-thomas",
    intro:
      "The following text is from Frederick Douglass's 1845 autobiography. He describes practicing his writing in secret.",
    text: "My mistress used to go to class meeting at the Wilk Street meetinghouse every Monday afternoon, and leave me to take care of the house. When left thus, I used to spend the time in writing in the spaces left in Master Thomas's copy-book, copying what he had written. I continued to do this until I could write a hand very similar to that of Master Thomas.",
    source: douglass,
  },
  {
    id: "tp-p-london-gold",
    intro:
      "The following text is from Jack London's 1903 novel The Call of the Wild. Buck is a large dog living on a ranch in California.",
    text: "Buck did not read the newspapers, or he would have known that trouble was brewing, not alone for himself, but for every tide-water dog, strong of muscle and with warm, long hair, from Puget Sound to San Diego. Because men, groping in the Arctic darkness, had found a yellow metal, and because steamship and transportation companies were booming the find, thousands of men were rushing into the Northland. These men wanted dogs, and the dogs they wanted were heavy dogs, with strong muscles by which to toil, and furry coats to protect them from the frost.",
    source: london,
  },
  {
    id: "tp-p-austen-emma-evils",
    intro: "The following text is from Jane Austen's 1815 novel Emma.",
    text: "The real evils, indeed, of Emma's situation were the power of having rather too much her own way, and a disposition to think a little too well of herself; these were the disadvantages which threatened alloy to her many enjoyments. The danger, however, was at present so unperceived, that they did not by any means rank as misfortunes with her.",
    source: austenEmma,
  },
  {
    id: "tp-p-jewett-littlepage",
    intro:
      "The following text is from Sarah Orne Jewett's 1896 novel The Country of the Pointed Firs. The narrator is staying with Mrs. Todd, an herbalist in a small coastal village.",
    text: "This was Captain Littlepage, whom I had seen only once or twice before, sitting pale and old behind a closed window; never out of doors until now. Mrs. Todd always shook her head gravely when I asked a question, and said that he wasn't what he had been once, and seemed to class him with her other secrets. He might have belonged with a simple which grew in a certain slug-haunted corner of the garden, whose use she could never be betrayed into telling me, though I saw her cutting the tops by moonlight once, as if it were a charm, and not a medicine, like the great fading bloodroot leaves.",
    source: jewett,
  },
  {
    id: "tp-p-gilman-yw-fancy",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1892 short story “The Yellow Wallpaper.”",
    text: "Out of another I get a lovely view of the bay and a little private wharf belonging to the estate. There is a beautiful shaded lane that runs down there from the house. I always fancy I see people walking in these numerous paths and arbors, but John has cautioned me not to give way to fancy in the least. He says that with my imaginative power and habit of story-making, a nervous weakness like mine is sure to lead to all manner of excited fancies, and that I ought to use my will and good sense to check the tendency. So I try.",
    source: yellowWallpaper,
  },
  {
    id: "tp-p-austen-emma-father",
    intro: "The following text is from Jane Austen's 1815 novel Emma.",
    text: "How was she to bear the change?—It was true that her friend was going only half a mile from them; but Emma was aware that great must be the difference between a Mrs. Weston, only half a mile from them, and a Miss Taylor in the house; and with all her advantages, natural and domestic, she was now in great danger of suffering from intellectual solitude. She dearly loved her father, but he was no companion for her. He could not meet her in conversation, rational or playful.",
    source: austenEmma,
  },
  {
    id: "tp-p-london-selected",
    intro:
      "The following text is from Jack London's 1903 novel The Call of the Wild. Buck, a dog, has been taken from his home and sold to a man in a red sweater.",
    text: "Now and again men came, strangers, who talked excitedly, wheedlingly, and in all kinds of fashions to the man in the red sweater. And at such times that money passed between them the strangers took one or more of the dogs away with them. Buck wondered where they went, for they never came back; but the fear of the future was strong upon him, and he was glad each time when he was not selected.",
    source: london,
  },
  {
    id: "tp-p-jewett-tansy",
    intro:
      "The following text is from Sarah Orne Jewett's 1896 novel The Country of the Pointed Firs. Mrs. Todd gathers herbs, such as tansy, to make medicines.",
    text: "One day she appeared at the schoolhouse itself, partly out of amused curiosity about my industries; but she explained that there was no tansy in the neighborhood with such snap to it as some that grew about the schoolhouse lot. Being scuffed down all the spring made it grow so much the better, like some folks that had it hard in their youth, and were bound to make the most of themselves before they died.",
    source: jewett,
  },
  {
    id: "tp-p-twain-points",
    intro:
      "The following text is from Mark Twain's 1883 memoir Life on the Mississippi. As a young man, Twain is learning from Mr. Bixby how to pilot a steamboat.",
    text: "Now and then Mr. Bixby called my attention to certain things. Said he, 'This is Six-Mile Point.' I assented. It was pleasant enough information, but I could not see the bearing of it. I was not conscious that it was a matter of any interest to me. Another time he said, 'This is Nine-Mile Point.' Later he said, 'This is Twelve-Mile Point.' They were all about level with the water's edge; they all looked about alike to me; they were monotonously unpicturesque. I hoped Mr. Bixby would change the subject.",
    source: twain,
  },
  {
    id: "tp-p-gilman-yw-pronounced",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1892 short story “The Yellow Wallpaper.” The narrator describes the pattern of the wallpaper in her room.",
    text: "It is dull enough to confuse the eye in following, pronounced enough to constantly irritate and provoke study, and when you follow the lame uncertain curves for a little distance they suddenly commit suicide—plunge off at outrageous angles, destroy themselves in unheard of contradictions.",
    source: yellowWallpaper,
  },
  {
    id: "tp-p-thoreau-deliberately",
    intro:
      "The following text is from Henry David Thoreau's 1854 book Walden, in which he describes two years he spent living in a small cabin near Walden Pond in Massachusetts.",
    text: "I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived. I did not wish to live what was not life, living is so dear; nor did I wish to practise resignation, unless it was quite necessary.",
    source: thoreau,
  },
  {
    id: "tp-p-london-unwonted",
    intro:
      "The following text is from Jack London's 1903 novel The Call of the Wild. Perrault, a courier for the Canadian government, has just bought Buck, a dog, during the Klondike gold rush.",
    text: 'Perrault grinned. Considering that the price of dogs had been boomed skyward by the unwonted demand, it was not an unfair sum for so fine an animal. The Canadian Government would be no loser, nor would its despatches travel the slower. Perrault knew dogs, and when he looked at Buck he knew that he was one in a thousand—"One in ten t\'ousand," he commented mentally.',
    source: london,
  },
  {
    id: "tp-p-austen-emma-unite",
    intro: "The following text is from Jane Austen's 1815 novel Emma.",
    text: "Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence; and had lived nearly twenty-one years in the world with very little to distress or vex her.",
    source: austenEmma,
  },
  {
    id: "tp-p-wilde-preface",
    intro:
      "The following text is from the preface to Oscar Wilde's 1891 novel The Picture of Dorian Gray.",
    text: "The artist is the creator of beautiful things. To reveal art and conceal the artist is art's aim. The critic is he who can translate into another manner or a new material his impression of beautiful things.",
    source: wilde,
  },
  {
    id: "tp-p-faraday-flame",
    intro:
      "The following text is from Michael Faraday's 1861 book The Chemical History of a Candle, based on lectures he gave to young people.",
    text: "Now, as to the shape or form of the flame. It concerns us much to know about the condition which the matter of the candle finally assumes at the top of the wick—where you have such beauty and brightness as nothing but combustion or flame can produce.",
    source: faraday,
  },
  {
    id: "tp-p-wharton-academy",
    intro:
      "The following text is from Edith Wharton's 1920 novel The Age of Innocence, set in New York City in the 1870s. The Academy was the city's opera house.",
    text: 'Though there was already talk of the erection, in remote metropolitan distances "above the Forties," of a new Opera House which should compete in costliness and splendour with those of the great European capitals, the world of fashion was still content to reassemble every winter in the shabby red and gold boxes of the sociable old Academy. Conservatives cherished it for being small and inconvenient, and thus keeping out the "new people" whom New York was beginning to dread and yet be drawn to; and the sentimental clung to it for its historic associations, and the musical for its excellent acoustics, always so problematic a quality in halls built for the hearing of music.',
    source: wharton,
  },
  {
    id: "tp-p-burnett-snake",
    intro:
      "The following text is from Frances Hodgson Burnett's 1911 novel The Secret Garden. Mary, a young girl, has been left alone in her family's house in India.",
    text: "But no one came, and as she lay waiting the house seemed to grow more and more silent. She heard something rustling on the matting and when she looked down she saw a little snake gliding along and watching her with eyes like jewels. She was not frightened, because he was a harmless little thing who would not hurt her and he seemed in a hurry to get out of the room. He slipped under the door as she watched him.",
    source: burnett,
  },
  {
    id: "tp-p-alcott-altered",
    intro:
      "The following text is from Louisa May Alcott's 1868 novel Little Women. The four March sisters are talking about Christmas while their father is away serving in the Civil War.",
    text: "Nobody spoke for a minute; then Meg said in an altered tone, \"You know the reason Mother proposed not having any presents this Christmas was because it is going to be a hard winter for everyone; and she thinks we ought not to spend money for pleasure, when our men are suffering so in the army. We can't do much, but we can make our little sacrifices, and ought to do it gladly. But I am afraid I don't,\" and Meg shook her head, as she thought regretfully of all the pretty things she wanted.",
    source: alcott,
  },
  {
    id: "tp-p-wharton-conventions",
    intro:
      "The following text is from Edith Wharton's 1920 novel The Age of Innocence. Newland Archer is attending an opera in New York City.",
    text: 'She sang, of course, "M\'ama!" and not "he loves me," since an unalterable and unquestioned law of the musical world required that the German text of French operas sung by Swedish artists should be translated into Italian for the clearer understanding of English-speaking audiences. This seemed as natural to Newland Archer as all the other conventions on which his life was moulded: such as the duty of using two silver-backed brushes with his monogram in blue enamel to part his hair, and of never appearing in society without a flower (preferably a gardenia) in his buttonhole.',
    source: wharton,
  },
  {
    id: "tp-p-austen-emma-married",
    intro:
      "The following text is from Jane Austen's 1815 novel Emma. Miss Taylor had lived with Emma's family for sixteen years as Emma's governess and friend.",
    text: "Sorrow came—a gentle sorrow—but not at all in the shape of any disagreeable consciousness.—Miss Taylor married. It was Miss Taylor's loss which first brought grief. It was on the wedding-day of this beloved friend that Emma first sat in mournful thought of any continuance. The wedding over, and the bride-people gone, her father and herself were left to dine together, with no prospect of a third to cheer a long evening. Her father composed himself to sleep after dinner, as usual, and she had then only to sit and think of what she had lost.",
    source: austenEmma,
  },
  {
    id: "tp-p-twain-education",
    intro:
      "The following text is from Mark Twain's 1883 memoir Life on the Mississippi. Twain is training to pilot steamboats under Mr. Bixby.",
    text: "When I had learned the name and position of every visible feature of the river; when I had so mastered its shape that I could shut my eyes and trace it from St. Louis to New Orleans; when I had learned to read the face of the water as one would cull the news from the morning paper; and finally, when I had trained my dull memory to treasure up an endless array of soundings and crossing-marks, and keep fast hold of them, I judged that my education was complete: so I got to tilting my cap to the side of my head, and wearing a tooth-pick in my mouth at the wheel. Mr. Bixby had his eye on these airs.",
    source: twain,
  },
  {
    id: "tp-p-jewett-procession",
    intro:
      "The following text is from Sarah Orne Jewett's 1896 novel The Country of the Pointed Firs. The narrator is watching a funeral procession walk along the coast.",
    text: "The bay-sheltered islands and the great sea beyond stretched away to the far horizon southward and eastward; the little procession in the foreground looked futile and helpless on the edge of the rocky shore. It was a glorious day early in July, with a clear, high sky; there were no clouds, there was no noise of the sea. The song sparrows sang and sang, as if with joyous knowledge of immortality, and contempt for those who could so pettily concern themselves with death. I stood watching until the funeral procession had crept round a shoulder of the slope below and disappeared from the great landscape as if it had gone into a cave.",
    source: jewett,
  },
  {
    id: "tp-p-dickens-convict",
    intro:
      "The following text is from Charles Dickens's 1861 novel Great Expectations. Pip, a young boy, is alone in a churchyard when a stranger appears.",
    text: "A fearful man, all in coarse gray, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared, and growled; and whose teeth chattered in his head as he seized me by the chin.",
    source: dickens,
  },
  {
    id: "tp-p-twain-romance",
    intro:
      "Text 1 is from Mark Twain's 1883 memoir Life on the Mississippi, which describes his years learning to pilot steamboats.",
    text: "No, the romance and the beauty were all gone from the river. All the value any feature of it had for me now was the amount of usefulness it could furnish toward compassing the safe piloting of a steamboat. Since those days, I have pitied doctors from my heart. What does the lovely flush in a beauty's cheek mean to a doctor but a 'break' that ripples above some deadly disease. Are not all her visible charms sown thick with what are to him the signs and symbols of hidden decay? Does he ever see her beauty at all, or doesn't he simply view her professionally, and comment upon her unwholesome condition all to himself? And doesn't he sometimes wonder whether he has gained most or lost most by learning his trade?",
    source: twain,
  },
  {
    id: "tp-p-faraday-beautiful",
    intro:
      "Text 2 is from Michael Faraday's 1861 book The Chemical History of a Candle, based on lectures that explained the chemistry of a burning candle.",
    text: "Is it not beautiful to think that such a process is going on, and that such a dirty thing as charcoal can become so incandescent? You see it comes to this—that all bright flames contain these solid particles; all things that burn and produce solid particles, either during the time they are burning, as in the candle, or immediately after being burnt, as in the case of the gunpowder and iron-filings,—all these things give us this glorious and beautiful light.",
    source: faraday,
  },
  {
    id: "tp-p-washington-bucket",
    intro:
      "Text 1 is from a speech Booker T. Washington gave in Atlanta in 1895, printed in his 1901 autobiography Up from Slavery. He has just told a story about sailors who learned that the river water around their ship was fresh.",
    text: 'To those of my race who depend on bettering their condition in a foreign land or who underestimate the importance of cultivating friendly relations with the Southern white man, who is their next-door neighbour, I would say: "Cast down your bucket where you are"—cast it down in making friends in every manly way of the people of all races by whom we are surrounded. Cast it down in agriculture, mechanics, in commerce, in domestic service, and in the professions.',
    source: washington,
  },
  {
    id: "tp-p-dubois-three-things",
    intro: "Text 2 is from W. E. B. Du Bois's 1903 book The Souls of Black Folk.",
    text: "In answer to this, it has been claimed that the Negro can survive only through submission. Mr. Washington distinctly asks that black people give up, at least for the present, three things,— First, political power, Second, insistence on civil rights, Third, higher education of Negro youth,—and concentrate all their energies on industrial education, and accumulation of wealth, and the conciliation of the South.",
    source: dubois,
  },
  {
    id: "tp-p-douglass-pathway",
    intro:
      "Text 1 is from Frederick Douglass's 1845 autobiography. Douglass has just overheard his enslaver forbid anyone to teach him to read.",
    text: "These words sank deep into my heart, stirred up sentiments within that lay slumbering, and called into existence an entirely new train of thought. It was a new and special revelation, explaining dark and mysterious things, with which my youthful understanding had struggled, but struggled in vain. I now understood what had been to me a most perplexing difficulty—to wit, the white man's power to enslave the black man. It was a grand achievement, and I prized it highly. From that moment, I understood the pathway from slavery to freedom. It was just what I wanted, and I got it at a time when I the least expected it.",
    source: douglass,
  },
  {
    id: "tp-p-washington-longing",
    intro: "Text 2 is from Booker T. Washington's 1901 autobiography Up from Slavery.",
    text: "From the time that I can remember having any thoughts about anything, I recall that I had an intense longing to learn to read. I determined, when quite a small child, that, if I accomplished nothing else in life, I would in some way get enough education to enable me to read common books and newspapers. . . . I had learned from somebody that the way to begin to read was to learn the alphabet, so I tried in all the ways I could think of to learn it,—all of course without a teacher, for I could find no one to teach me.",
    source: washington,
  },
  {
    id: "tp-p-washington-speaking",
    intro:
      "The following text is from Booker T. Washington's 1901 autobiography Up from Slavery. Miss Lord was one of his teachers.",
    text: "Whatever ability I may have as a public speaker I owe in a measure to Miss Lord. When she found out that I had some inclination in this direction, she gave me private lessons in the matter of breathing, emphasis, and articulation. Simply to be able to talk in public for the sake of talking has never had the least attraction to me. In fact, I consider that there is nothing so empty and unsatisfactory as mere abstract public speaking; but from my early childhood I have had a desire to do something to make the world better, and then to be able to speak to the world about that thing.",
    source: washington,
  },
  {
    id: "tp-p-herland-physiology",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1915 novel Herland. Three American men describe what they learned about the people of an isolated country.",
    text: "Physiology they were quite familiar with. Indeed, when it came to the simpler and more concrete sciences, wherein the subject matter was at hand and they had but to exercise their minds upon it, the results were surprising. They had worked out a chemistry, a botany, a physics, with all the blends where a science touches an art, or merges into an industry, to such fullness of knowledge as made us feel like schoolchildren.",
    source: gilman,
  },
  {
    id: "tp-p-dubois-john",
    intro:
      "The following text is from W. E. B. Du Bois's 1903 book The Souls of Black Folk. John has returned to his hometown in Georgia to open a school.",
    text: "For John, it had been a long, hard pull to get things started in the rickety old shanty that sheltered his school. The Negroes were rent into factions for and against him, the parents were careless, the children irregular and dirty, and books, pencils, and slates largely missing. Nevertheless, he struggled hopefully on, and seemed to see at last some glimmering of dawn. The attendance was larger and the children were a shade cleaner this week. Even the booby class in reading showed a little comforting progress. So John settled himself with renewed patience this afternoon.",
    source: dubois,
  },
  {
    id: "tp-p-thoreau-factory",
    intro: "The following text is from Henry David Thoreau's 1854 book Walden.",
    text: "I cannot believe that our factory system is the best mode by which men may get clothing. The condition of the operatives is becoming every day more like that of the English; and it cannot be wondered at, since, as far as I have heard or observed, the principal object is, not that mankind may be well and honestly clad, but, unquestionably, that corporations may be enriched. In the long run men hit only what they aim at. Therefore, though they should fail immediately, they had better aim at something high.",
    source: thoreau,
  },
  {
    id: "tp-p-montgomery-history",
    intro:
      "The following text is from L. M. Montgomery's 1908 novel Anne of Green Gables. Anne is writing to her friend Diana while taking a series of exams.",
    text: '"At noon we went home for dinner and then back again for history in the afternoon. The history was a pretty hard paper and I got dreadfully mixed up in the dates. Still, I think I did fairly well today. But oh, Diana, tomorrow the geometry exam comes off and when I think of it it takes every bit of determination I possess to keep from opening my Euclid. If I thought the multiplication table would help me any I would recite it from now till tomorrow morning.',
    source: montgomery,
  },
  {
    id: "tp-p-gilman-yw-paper",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1892 short story “The Yellow Wallpaper.” The narrator describes the room where she is staying.",
    text: "The paint and paper look as if a boys' school had used it. It is stripped off—the paper—in great patches all around the head of my bed, about as far as I can reach, and in a great place on the other side of the room low down. I never saw a worse paper in my life.",
    source: yellowWallpaper,
  },
  {
    id: "tp-p-gilman-yw-smell",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1892 short story “The Yellow Wallpaper.”",
    text: "But there is something else about that paper—the smell! I noticed it the moment we came into the room, but with so much air and sun it was not bad. Now we have had a week of fog and rain, and whether the windows are open or not, the smell is here.",
    source: yellowWallpaper,
  },
  {
    id: "tp-p-austen-emma-governess",
    intro: "The following text is from Jane Austen's 1815 novel Emma.",
    text: "Sixteen years had Miss Taylor been in Mr. Woodhouse's family, less as a governess than a friend, very fond of both daughters, but particularly of Emma. Between them it was more the intimacy of sisters. Even before Miss Taylor had ceased to hold the nominal office of governess, the mildness of her temper had hardly allowed her to impose any restraint; and the shadow of authority being now long passed away, they had been living together as friend and friend very mutually attached, and Emma doing just what she liked; highly esteeming Miss Taylor's judgment, but directed chiefly by her own.",
    source: austenEmma,
  },
  {
    id: "tp-p-london-rope",
    intro:
      "The following text is from Jack London's 1903 novel The Call of the Wild. Buck, a dog, has been stolen and shipped north in a crate.",
    text: "He was glad for one thing: the rope was off his neck. That had given them an unfair advantage; but now that it was off, he would show them. They would never get another rope around his neck. Upon that he was resolved.",
    source: london,
  },
  {
    id: "tp-p-burnett-footsteps",
    intro:
      "The following text is from Frances Hodgson Burnett's 1911 novel The Secret Garden. Mary, a young girl, is alone in her family's house in India during an outbreak of disease.",
    text: "Almost the next minute she heard footsteps in the compound, and then on the veranda. They were men's footsteps, and the men entered the bungalow and talked in low voices.",
    source: burnett,
  },
  {
    id: "tp-p-london-meal",
    intro:
      "The following text is from Jack London's 1903 novel The Call of the Wild. Buck, a dog, has just been beaten by the man in the red sweater who bought him.",
    text: "As he spoke he fearlessly patted the head he had so mercilessly pounded, and though Buck's hair involuntarily bristled at touch of the hand, he endured it without protest. When the man brought him water he drank eagerly, and later bolted a generous meal of raw meat, chunk by chunk, from the man's hand.",
    source: london,
  },
  {
    id: "tp-p-gilman-yw-room",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1892 short story “The Yellow Wallpaper.”",
    text: "It is a big, airy room, the whole floor nearly, with windows that look all ways, and air and sunshine galore. It was nursery first and then playroom and gymnasium, I should judge; for the windows are barred for little children, and there are rings and things in the walls.",
    source: yellowWallpaper,
  },
  {
    id: "tp-p-gilman-yw-eyes",
    intro:
      "The following text is from Charlotte Perkins Gilman's 1892 short story “The Yellow Wallpaper.” The narrator describes the pattern of the wallpaper in her room.",
    text: "I get positively angry with the impertinence of it and the everlastingness. Up and down and sideways they crawl, and those absurd, unblinking eyes are everywhere. There is one place where two breadths didn't match, and the eyes go all up and down the line, one a little higher than the other.",
    source: yellowWallpaper,
  },
  {
    id: "tp-p-burnett-garden",
    intro:
      "The following text is from Frances Hodgson Burnett's 1911 novel The Secret Garden. Mary has begun clearing weeds from a neglected garden.",
    text: "Mistress Mary worked in her garden until it was time to go to her midday dinner. In fact, she was rather late in remembering, and when she put on her coat and hat, and picked up her skipping-rope, she could not believe that she had been working two or three hours. She had been actually happy all the time; and dozens and dozens of the tiny, pale green points were to be seen in cleared places, looking twice as cheerful as they had looked before when the grass and weeds had been smothering them.",
    source: burnett,
  },
  {
    id: "tp-p-dickens-pip",
    intro:
      "The following text is from the opening of Charles Dickens's 1861 novel Great Expectations.",
    text: "My father's family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip.",
    source: dickens,
  },
  {
    id: "tp-p-london-crate",
    intro:
      "The following text is from Jack London's 1903 novel The Call of the Wild. Buck, a dog, is locked in a wooden crate, and a man is breaking it open with a hatchet.",
    text: "Buck rushed at the splintering wood, sinking his teeth into it, surging and wrestling with it. Wherever the hatchet fell on the outside, he was there on the inside, snarling and growling, as furiously anxious to get out as the man in the red sweater was calmly intent on getting him out.",
    source: london,
  },
  {
    id: "tp-p-darwin-body",
    intro:
      "The following text is from Charles Darwin's 1881 book The Formation of Vegetable Mould, through the Action of Worms. Darwin kept earthworms in pots covered with glass plates.",
    text: "The whole body of a worm is sensitive to contact. A slight puff of air from the mouth causes an instant retreat. The glass plates placed over the pots did not fit closely, and blowing through the very narrow chinks thus left, often sufficed to cause a rapid retreat.",
    source: darwin,
  },
  {
    id: "tp-p-darwin-castings",
    intro:
      "The following text is from Charles Darwin's 1881 book The Formation of Vegetable Mould, through the Action of Worms.",
    text: "In this table we see that castings which had been ejected at the mouth of the same burrow, and which in most cases appeared fresh and always retained their vermiform configuration, generally exceeded an ounce in weight after being dried, and sometimes nearly equalled a quarter of a pound.",
    source: darwin,
  },
];

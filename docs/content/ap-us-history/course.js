// Course identity and catalog copy. Unit lists are generated from unit folders.
// The course is "soon": its framework, exam format, and practice rules are in
// place, but no lessons or questions have been written yet. Each unit folder
// matches a CED unit (see ced.js); topics are added as content is authored.

export const course = {
  schemaVersion: 1,
  id: "apush",
  title: "AP U.S. History",
  shortTitle: "AP U.S. History",
  description:
    "Trace how Americans have argued over identity, power, work, and their place in the world, from the societies that existed before 1491 to the present.",
  status: "soon",
  period: "1491–present",
  order: 4,
  previewDescription:
    "Follow the nation's development from early contact and colonization through independence, civil war, industrialization, world wars, and recent decades.",
  // Every source block records a review against the CED key concept it
  // supports (pending until checked, then complete), instead of World
  // History's class AMSCO reading.
  sourceReview: "ced_review",
};

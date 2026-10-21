// Primary-source excerpts and Page One practice passages used as stimuli in
// AP U.S. History questions, SAQs, and DBQs. One record per source; questions
// import it so a correction reaches every use. The rules are the same as World
// History's excerpts.js (see handbook/ap-practice.md and handbook/ap-us-history.md):
//
// - Text quotations (`medium` omitted) copy a public-domain edition exactly and
//   register their ID prefix in scripts/lib/excerpt-sources.mjs.
// - Images (`medium: "image"`) are cartoons, posters, photographs, paintings,
//   or maps listed in this course's assets.js, with `alt`, `description`, and an
//   archive `citation` such as a Library of Congress call number.
// - Data tables (`medium: "table"`) give `caption`, `columns`, and `rows`.
// - Every record names its CED key concept or source record in `source` and a
//   `ced_review` of "pending" or "complete".
//
// Paired sources (two historians, or two primary voices) are two records used
// together in one set's stimulusBlocks.

export const excerpts = {};

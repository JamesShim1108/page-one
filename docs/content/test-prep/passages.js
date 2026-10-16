// Reading passages for PSAT/SAT practice. Public domain only.
//
// Each record:
//   id: "tp-p-<short-name>"
//   text: the excerpt exactly as printed in the cited edition. Mark omissions
//         with ". . ." and list every bracketed editorial change in `edits`.
//   source: { author, title, year, publication, url, basis }
//     year: first publication year (an integer)
//     basis: "us-pre-1931" (published 1930 or earlier) or
//            "us-government-work" (a work of the U.S. federal government)
//   edits: optional list of { original, replacement } bracketed changes
//
// Items reference a passage with `passageId`. Empty until items are authored.
export const passages = [];

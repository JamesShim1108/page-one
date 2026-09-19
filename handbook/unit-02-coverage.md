# Unit 2 implementation coverage ledger

Status values: `pass` means implemented and checked in the generated output; `qualified` means implemented with an explicit limitation in student text or the evidence ledger; `blocked` means intentionally unavailable until the listed source or rights gate is complete.

## Delivery inventory

| Requirement                          | Result    | Evidence                                                                                                                                                                                                      |
| ------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit 2 hub with existing study modes | pass      | `world-2` is ready; Practice Quiz, Terms, Writing Practice, Reading / Learn, Study Guide, and Maps & Connections appear in the shared hub.                                                                    |
| Seven Topics 2.1–2.7                 | pass      | Seven ready topic routes and lesson payloads; stable IDs `world-2-1` through `world-2-7`.                                                                                                                     |
| Lesson depth and reading guides      | qualified | Five explanatory sections and five revealable prompts per lesson; generated prose is original and mechanism-focused. Exact 700–1,100-word guidance was not treated as a padding quota.                        |
| Original MCQs                        | pass      | 140 unique items; each bank has 20 items, four choices, one canonical answer, four choice explanations, near-miss index, distinguisher, citations, and source locators.                                       |
| Quick checks / topic quizzes         | pass      | q01–q04 quick; q05–q16 topic quiz; each topic quiz has six stimulus-backed items.                                                                                                                             |
| Unit practice Forms A/B              | pass      | Form A selects q17/q18 from each topic (14); Form B selects q19/q20 from each topic (14); combined review selects all 28 unique reserved items.                                                               |
| SAQs                                 | qualified | Seven three-part source-context exercises with self-assessed 0/1 parts. Sets 02, 04, and 05 use original scenarios while the specified primary-passage editions remain unresolved; see the conflict log.      |
| LEQ-style exercises                  | pass      | Three typed exercises: comparison, causation, continuity/change; six-point self-assessment rubric and outline/essay fields.                                                                                   |
| DBQ                                  | blocked   | Prompt, seven document shells, document notes, rubric, and workflow are implemented; the packet is unavailable until document provenance and rights are independently verified.                               |
| Skill drills                         | pass      | Four typed drills: thesis, context, evidence-to-reasoning, sourcing; checklist feedback, no implied official score.                                                                                           |
| Study guide                          | pass      | Overview, 10-entry timeline, canonical comparison table, four causal chains, 12 evidence examples, ten pitfalls, Unit 1 bridge, later callout.                                                                |
| Network explorer                     | qualified | Three layers, 13 places, 12 selected connections, synchronized text list, approximate modern coordinates, seasonal control, Sahara logistics control. SVG lines are schematic and not exhaustive itineraries. |
| Comparison workspace                 | pass      | Pairwise and all-three table use the same canonical network records as the guide; three typed comparison prompts with revealable models.                                                                      |
| Claim/evidence activities            | pass      | Six ordinary radio-button tasks, one correct option each, feedback and review destinations.                                                                                                                   |
| Source registry and audits           | pass      | Unit 2 source records, evidence ledger, conflict log, and this coverage ledger.                                                                                                                               |
| Terms additions                      | pass      | Zero new class terms, vocabulary cards, flashcards, term quizzes, or glossary entries; Unit 2 retains `world-period-1-a` and `world-period-1-b`.                                                              |

## Curriculum and historical checks

| Check                                                          | Status    | Verification note                                                                                                                                 |
| -------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objective letters A–L represented in teaching and assessment   | pass      | Reading-guide objective mapping: A (2.1), B–D (2.2), E–G (2.3), H–I (2.4), J (2.5), K (2.6), L (2.7); each topic also has quick/topic assessment. |
| Official topic order and titles                                | pass      | Topic codes/titles and order match the supplied Fall 2026 CED map.                                                                                |
| Earlier foundations and later context labeled                  | pass      | Context paragraphs, Unit 1 bridge, 1450 boundary, and later-period callout separate chronology.                                                   |
| Three networks covered, compared, and connected                | pass      | Silk Roads, Indian Ocean, and trans-Saharan records share eight dimensions and cross-topic links.                                                 |
| Networks not invented in 1200, isolated, or uniform            | pass      | Overview, lessons, comparison, and pitfalls describe older foundations, overlap, and regional variation.                                          |
| Trade growth mechanisms                                        | pass      | Demand, production, institutions, political protection, transport, and environmental constraints are linked in lessons and activities.            |
| Mongol coercion and differentiated rule                        | pass      | Topic 2.2 includes conquest costs alongside administration, khanates, communication, and transfer.                                                |
| Religious and cultural change treated as adaptation            | pass      | Cultural lessons and pitfalls reject instant uniform conversion and one-way diffusion.                                                            |
| African and Asian agency                                       | pass      | Merchant, ruler, producer, sailor, guide, artisan, scholar, and port-community roles are explicit.                                                |
| Diaspora treated as two-way interaction                        | pass      | Indian Ocean lesson, guide, activity, and evidence guide state intermarriage, trust, and local adaptation.                                        |
| Cultural and environmental consequences distinguished          | pass      | Topics 2.5 and 2.6 separate knowledge/religious change from crops, disease, land, and demographic effects while showing relationships.            |
| Plague/crop claims qualified                                   | pass      | No unsupported totals, universal immunity, single-origin claim, or fixed route is published.                                                      |
| No unsupported numerical trade data or universal travel speeds | pass      | Qualitative evidence and schematic relationships only; no invented volumes, prices, durations, or rankings.                                       |
| Primary/secondary distinctions and modern image dates          | qualified | Original contexts are labeled; DBQ primary packet is blocked; map coordinates are labeled modern orientation data.                                |
| One best answer and near miss per MCQ                          | pass      | Validator and focused tests check canonical index, four explanations, and non-answer near-miss.                                                   |
| Answer-key and wording bias checks                             | qualified | Correct positions are balanced five per choice per bank and not sequential; qualitative answer-length review remains editorial work.              |
| Writing models and defensible alternatives                     | pass      | LEQ/skill models name evidence and common errors; alternatives permit other supported arguments; DBQ model stays withheld.                        |
| Current labels and self-assessment rubrics                     | pass      | UI labels SAQ/LEQ/DBQ/skill; self-check totals are 3, 6, and 7 only after all required rubric categories are assessed.                            |
| Mandatory conflicts resolved or blocked                        | pass      | See `unit-02-source-conflicts.md`; no blocked quotation or image is published.                                                                    |
| New Terms/vocabulary/glossary content                          | pass      | Zero; regression tests preserve Period 1 fingerprints and Unit 2 empty vocabulary arrays.                                                         |

## Engineering and accessibility checks

| Check                                                                      | Status  | Evidence / limitation                                                                                                                                                     |
| -------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build and generated output                                                 | pass    | `npm run build` generated 65 content files; `npm run validate` passes stale-output validation.                                                                            |
| Automated tests                                                            | pass    | `npm test`: 45 tests passed, including Unit 2 content graph, assessment partition, citations/stimuli, writing scoring, and empty-vocabulary rendering.                    |
| Formatting and syntax                                                      | pass    | `npm run format:check` passes; focused `node --check` passes for the new tool/views.                                                                                      |
| Lazy loading                                                               | pass    | Existing content-store tests confirm topic and unit quiz pages request only required banks; new routes use the same loader.                                               |
| Persistence and legacy compatibility                                       | pass    | Existing Unit 1 writing/Terms tests pass; typed drafts use the existing local store and clear scores on revision.                                                         |
| Map text equivalent and keyboard controls                                  | pass    | Place buttons, layer checkboxes, select/radio controls, live feedback, and review links are rendered alongside the SVG.                                                   |
| Browser visual review at 360/768/1440, keyboard, reduced motion, 200% zoom | not run | This execution environment did not provide a full browser automation/screenshot pass. Static HTML/data and syntax checks passed; run the listed scenarios before merging. |
| DBQ source release gate                                                    | blocked | Do not enable the DBQ link until seven documents have traceable metadata and rights.                                                                                      |

## Objective-to-destination map

| Objective | Primary lesson | Assessment destinations                           |
| --------- | -------------- | ------------------------------------------------- |
| A         | `world-2-1`    | `world-2-1-quiz`, q17–q20, SAQ 01                 |
| B–D       | `world-2-2`    | `world-2-2-quiz`, q17–q20, SAQ 02                 |
| E–G       | `world-2-3`    | `world-2-3-quiz`, q17–q20, SAQ 03                 |
| H–I       | `world-2-4`    | `world-2-4-quiz`, q17–q20, SAQ 04                 |
| J         | `world-2-5`    | `world-2-5-quiz`, q17–q20, SAQ 05, sourcing drill |
| K         | `world-2-6`    | `world-2-6-quiz`, q17–q20, SAQ 06                 |
| L         | `world-2-7`    | `world-2-7-quiz`, q17–q20, SAQ 07, three LEQs     |

The branch is ready for review, but it is not merged into `main` and does not deploy automatically from this branch.

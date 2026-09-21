import { escapeHtml as esc, breadcrumbs, contextCrumbs, link, arrow } from "../ui.js";
import { reportButton, sharePanel } from "../share/views.js";

export function termsIndexPage({ course, unit }) {
  return `<div class="container terms-page">${breadcrumbs(contextCrumbs({ course, unit }, "Terms"))}
    <header class="study-heading"><p class="eyebrow">Unit ${unit.number} · Terms</p><h1>Choose your term set.</h1>
      <p>Review the full list or get straight to flashcards. Class definitions, kept exactly as provided.</p></header>
    ${sharePanel({ path: `/terms/${unit.id}`, title: `Unit ${unit.number} terms`, label: "Share these term sets without private classifications or notes." })}${link(`/print?course=${encodeURIComponent(course.id)}&kind=unit&unit=${encodeURIComponent(unit.id)}&terms=1&reading=0&practice=0`, "Print unit Terms", "text-link")}
    <div class="term-set-grid">${unit.termSets
      .map(
        (
          set,
        ) => `<a class="term-set-card" href="#/term-set/${esc(set.id)}?unit=${esc(unit.id)}">
      <span class="eyebrow">${set.count} terms</span><h2>${esc(set.title)}</h2><p>Term list · Flashcards · Know / Don’t Know</p><span class="text-link">Open set ${arrow}</span>
    </a>`,
      )
      .join("")}</div>
    ${unit.termSets.length ? "" : `<div class="study-empty"><h2>No class term sets yet</h2><p>Terms will appear here when the required class list is added. We won’t substitute vocabulary from other sources.</p>${link(`/unit/${unit.id}`, "Back to study hub", "btn secondary")}</div>`}
  </div>`;
}

const control = (id, label, extra = "", cls = "btn secondary") =>
  `<button type="button" id="terms-${id}" data-terms-action="${id}" class="${cls}" ${extra}>${label}</button>`;

function listFilterFor(view) {
  return {
    status: ["all", "unknown", "unstudied"].includes(view.listFilter?.status)
      ? view.listFilter.status
      : "all",
    query: String(view.listFilter?.query || ""),
    includeNotes: view.listFilter?.includeNotes === true,
    row: String(view.listFilter?.row || ""),
  };
}

function listPath(data, view, row = "") {
  const filter = listFilterFor(view);
  const params = new URLSearchParams({ unit: data.unit.id, view: "list" });
  if (filter.status !== "all") params.set("status", filter.status);
  if (filter.query) params.set("q", filter.query);
  if (filter.includeNotes) params.set("notes", "1");
  if (row) params.set("row", row);
  return `/term-set/${data.set.id}?${params}`;
}

function referencePath(data, view, cardId) {
  const params = new URLSearchParams({
    unit: data.unit.id,
    card: cardId,
    return: listPath(data, view, cardId),
  });
  return `/term-set/${data.set.id}?${params}`;
}

function noteFor(view, cardId) {
  return view.notes?.active?.[cardId] || null;
}

function noteEditor(card, view) {
  const note = noteFor(view, card.id);
  const draft = view.noteDrafts?.[card.id] ?? note?.note ?? "";
  const message = view.noteMessages?.[card.id] || "";
  return `<form class="term-note-form" data-term-note-form data-term-card="${esc(card.id)}">
    <label for="term-note-${esc(card.id)}"><strong>My note</strong><span class="muted">Private to this browser</span></label>
    <textarea id="term-note-${esc(card.id)}" name="note" maxlength="2000" rows="3" placeholder="Add a mnemonic or reminder.">${esc(draft)}</textarea>
    <div class="term-note-actions"><button type="submit" class="text-button">Save note</button><span id="term-note-status-${esc(card.id)}" role="status">${esc(message)}</span></div>
  </form>`;
}

function copyControls(card, note, view) {
  return `<div class="term-copy-actions"><button type="button" class="text-button" data-terms-copy="${esc(card.id)}">Copy term and definition</button>${note ? `<button type="button" class="text-button" data-terms-copy="${esc(card.id)}" data-terms-copy-with-note="true">Copy with my note</button>` : ""}<span id="term-copy-status-${esc(card.id)}" role="status">${esc(view?.copyMessages?.[card.id] || "")}</span></div>`;
}

function cardStatus(engine, card) {
  return engine.state.classifications[card.id] || "unstudied";
}

function statusLabel(status) {
  return { known: "Know", unknown: "Don’t know", unstudied: "Not studied" }[status];
}

export function filteredCardsForList(set, engine, view) {
  const filter = listFilterFor(view);
  const query = filter.query.trim().toLocaleLowerCase();
  return set.cards.filter((card) => {
    const status = cardStatus(engine, card);
    if (filter.status !== "all" && status !== filter.status) return false;
    if (!query) return true;
    const note = noteFor(view, card.id);
    const official = `${card.term}\n${card.definition}`.toLocaleLowerCase();
    const personal = filter.includeNotes ? note?.note?.toLocaleLowerCase() || "" : "";
    return `${official}\n${personal}`.includes(query);
  });
}

function termList(data, engine, view) {
  const filter = listFilterFor(view);
  const cards = filteredCardsForList(data.set, engine, view);
  const options = [
    ["all", "All cards"],
    ["unknown", "Don’t know"],
    ["unstudied", "Not studied yet"],
  ];
  return `<section aria-label="Complete term list" class="terms-reference-list">
    <form class="terms-list-filter-form" data-terms-list-filter-form>
      <div><label for="terms-list-query">Find within this set</label><input id="terms-list-query" name="q" type="search" value="${esc(filter.query)}" placeholder="Search official terms or definitions"></div>
      <div><label for="terms-list-status">Show</label><select id="terms-list-status" name="status">${options.map(([value, label]) => `<option value="${value}" ${filter.status === value ? "selected" : ""}>${label}</option>`).join("")}</select></div>
      <label class="terms-checkbox"><input type="checkbox" name="notes" value="1" ${filter.includeNotes ? "checked" : ""}> Include my notes</label>
      <button type="submit" class="btn secondary">Apply filter</button>
      ${filter.status !== "all" || filter.query || filter.includeNotes ? control("clear-list-filter", "Clear filter", "", "text-button") : ""}
    </form>
    <div class="section-heading terms-list-heading"><h2>Terms to reference</h2><span id="terms-list-count" role="status">${cards.length} of ${data.set.cards.length} terms shown</span>${reportButton({ type: "term-list", courseId: data.course.id, topicId: data.unit.id, itemId: data.set.id, title: data.set.title, revision: data.contentRevision || "", path: `/term-set/${data.set.id}?unit=${data.unit.id}`, label: "Report an issue" })}</div>
    ${cards.length ? `<div class="terms-list-round-action">${control("start-filtered-round", `Start a round with these ${cards.length} card${cards.length === 1 ? "" : "s"}`, "", "btn")}</div>` : ""}
    ${
      cards.length
        ? `<dl class="terms-list">${cards
            .map((card) => {
              const note = noteFor(view, card.id);
              const status = cardStatus(engine, card);
              return `<div class="terms-list__row" id="term-row-${esc(card.id)}" data-term-row="${esc(card.id)}">
          <dt><span class="term-number" aria-hidden="true">${data.set.cards.indexOf(card) + 1}</span><span>${esc(card.term)}</span><span class="term-status">${statusLabel(status)}</span></dt>
          <dd><p class="term-definition">${esc(card.definition)}</p><div class="term-row-actions">${link(referencePath(data, view, card.id), "Open card", "text-link")} ${copyControls(card, note, view)}</div>${note ? `<div class="term-note-display"><strong>My note</strong><p>${esc(note.note)}</p></div>` : ""}${noteEditor(card, view)}</dd>
        </div>`;
            })
            .join("")}</dl>`
        : `<div class="study-empty"><h3>No terms match this filter.</h3><p>Clear the filter or choose another status. The official set is unchanged.</p>${control("clear-list-filter", "Clear filter", "", "btn secondary")}</div>`
    }
    ${view.notes?.unresolved?.length ? `<section class="term-unresolved-notes" aria-labelledby="unresolved-notes-title"><h3 id="unresolved-notes-title">Notes needing review</h3><p>These personal notes were kept, but their original card is no longer an exact match for this set. They were not attached to another term.</p><ul>${view.notes.unresolved.map((note) => `<li><strong>${esc(note.priorTerm)}</strong><p>${esc(note.note)}</p><span class="muted">Earlier set version or removed card</span></li>`).join("")}</ul></section>` : ""}
  </section>`;
}

function referenceCardPage(data, engine, view, card) {
  const note = noteFor(view, card.id);
  const unresolved = view.notes?.unresolved?.find((item) => item.cardId === card.id);
  const back = view.returnPath || listPath(data, view, card.id);
  return `<section class="term-reference-card" aria-labelledby="term-reference-title">
    <p class="eyebrow">REFERENCE CARD · ${statusLabel(cardStatus(engine, card))}</p><h2 id="term-reference-title">${esc(card.term)}</h2><p class="term-reference-definition">${esc(card.definition)}</p>
    ${unresolved ? `<div class="term-note-warning" role="note"><strong>Earlier personal note kept for review</strong><p>${esc(unresolved.note)}</p><span class="muted">This note belongs to an earlier version of the card.</span></div>` : ""}
    ${noteEditor(card, view)}${copyControls(card, note, view)}${reportButton({ type: "term", courseId: data.course.id, topicId: data.unit.id, itemId: card.id, title: card.term, revision: data.contentRevision || "", path: `/term-set/${data.set.id}?unit=${data.unit.id}`, label: "Report an issue with this term" })}
    <div class="actions">${link(back, "Return to term list", "btn secondary")}</div>
  </section>`;
}

export function termSetPage(data, engine, view = {}) {
  const { course, unit, set } = data;
  const { state } = engine;
  const crumbs = contextCrumbs({ course, unit });
  crumbs.push(["Terms", `/terms/${unit.id}`], [set.title]);
  const path = `/term-set/${set.id}?unit=${unit.id}`;
  const referenceCard = view.referenceCardId
    ? set.cards.find((card) => card.id === view.referenceCardId)
    : null;
  return `<div class="container terms-page">${breadcrumbs(crumbs)}
    <header class="study-heading"><p class="eyebrow">${set.cards.length} terms · Class vocabulary</p><h1>${esc(set.title)}</h1></header>
    ${sharePanel({ path: `/term-set/${set.id}?unit=${unit.id}`, title: set.title, label: "Share this official term set without private classifications or notes." })}${link(`/print?course=${encodeURIComponent(course.id)}&kind=terms&set=${encodeURIComponent(set.id)}&unit=${encodeURIComponent(unit.id)}`, "Print this set", "text-link")}
    <nav class="terms-tabs" aria-label="Study this term set">
      <a href="#${esc(path)}" ${view.mode === "cards" ? 'aria-current="page"' : ""}>Flashcards</a>
      <a href="#${esc(listPath(data, view))}" ${view.mode === "list" ? 'aria-current="page"' : ""}>Term List</a>
    </nav>
    ${view.mode === "list" ? termList(data, engine, view) : referenceCard ? referenceCardPage(data, engine, view, referenceCard) : flashcards(data, engine, view)}
    <p class="terms-source">Source: ${esc(set.source)}. Wording is preserved from your class list.</p>
  </div>`;
}

function flashcards(data, engine, view) {
  const { set, unit } = data;
  const { state } = engine,
    card = engine.current(),
    counts = engine.counts();
  const filterName = {
    all: "All cards",
    unknown: "Don’t know only",
    remaining: "Not studied yet",
    custom: "Selected cards",
  }[state.filter];
  const face = state.front;
  const back = face === "term" ? "definition" : "term";
  const resetPrompt = view.confirmReset
    ? `<div class="terms-reset" role="alert"><p>Clear Know / Don’t Know for this set and restart all cards?</p><div class="actions">${control("confirm-reset", "Yes, reset progress")}${control("cancel-reset", "Cancel")}</div></div>`
    : "";
  const conflictPrompt =
    view.storageState === "conflict"
      ? `<aside class="storage-conflict note" role="alert"><strong>This Terms progress changed in another tab.</strong><p>Classifications were not merged. Choose the saved set or keep this round as a separate recovery copy.</p><div class="actions">${view.conflict?.remoteRecord ? control("resolve-conflict", "Use saved classifications") : ""}${control("keep-conflict", "Keep this round separate", "", "btn secondary")}</div></aside>`
      : "";
  const roundLabel = card
    ? `Round: ${state.index + 1} of ${state.order.length}`
    : state.order.length
      ? `Round finished · ${state.order.length} cards`
      : "Round is empty";
  return `<section class="flashcard-workspace" aria-label="Flashcards">
    <div class="terms-counts" aria-label="Set classifications"><span>Set: <strong>${counts.known}</strong> Know</span><span><strong>${counts.unknown}</strong> Don’t know</span><span><strong>${counts.remaining}</strong> Not studied</span></div>
    <div class="flashcard-toolbar"><span>${filterName}</span><span id="terms-position" role="status">${roundLabel}</span><div class="terms-toolbar-actions">${control("undo", "Undo", state.undo.length ? "" : "disabled", "btn secondary")}<details class="terms-settings" ${view.settingsOpen ? "open" : ""}><summary id="terms-settings-toggle">Settings</summary><div class="terms-settings__body">
        <label for="terms-front">Card front</label><select id="terms-front"><option value="term" ${face === "term" ? "selected" : ""}>Term</option><option value="definition" ${face === "definition" ? "selected" : ""}>Definition</option></select>
        <label class="terms-checkbox"><input type="checkbox" id="terms-shuffle" ${state.shuffle ? "checked" : ""}> Shuffle order</label>
        <label for="terms-filter">Cards to study</label><select id="terms-filter">${[
          ...(state.filter === "custom" ? [["custom", "Selected cards"]] : []),
          ["all", "Study all"],
          ["unknown", "Study only Don’t Know"],
          ["remaining", "Continue remaining"],
        ]
          .map(
            ([value, label]) =>
              `<option value="${value}" ${state.filter === value ? "selected" : ""}>${label}</option>`,
          )
          .join("")}</select>
        <div class="terms-settings__actions">${control("restart", "Start a new round")}${control("reset", "Reset progress")}</div>
        <small>Shuffle applies to the next round. Starting a new round keeps classifications and never changes the original list.</small>
      </div></details></div>
    </div>${view.returnPath ? `<p class="terms-return-link">${link(view.returnPath, "Return to filtered list", "text-link")}</p>` : ""}${resetPrompt}${conflictPrompt}
    ${
      card
        ? `<div class="flashcard-stage"><button type="button" id="terms-flip" class="flashcard ${state.flipped ? "is-flipped" : ""}" data-terms-action="flip" aria-label="Flip flashcard" aria-describedby="terms-readable terms-flip-hint" aria-pressed="${state.flipped}">
      <span class="flashcard__inner"><span class="flashcard__face" aria-hidden="true"><span class="eyebrow">${face === "term" ? "Term" : "Definition"}</span><span class="flashcard__text ${face === "definition" ? "is-definition" : ""}">${esc(card[face])}</span></span>
      <span class="flashcard__face flashcard__face--back" aria-hidden="true"><span class="eyebrow">${back === "term" ? "Term" : "Definition"}</span><span class="flashcard__text ${back === "definition" ? "is-definition" : ""}">${esc(card[back])}</span></span></span></button>
      <p id="terms-readable" class="visually-hidden" aria-live="polite">${esc(card[state.flipped ? back : face])}</p>
    </div><p id="terms-flip-hint" class="flashcard-hint">Tap card to flip · ${state.classifications[card.id] === "known" ? "Marked Know" : state.classifications[card.id] === "unknown" ? "Marked Don’t Know" : "Not classified yet"}</p>
    ${noteEditor(card, view)}${copyControls(card, noteFor(view, card.id), view)}${reportButton({ type: "term", courseId: data.course.id, topicId: unit.id, itemId: card.id, title: card.term, revision: data.contentRevision || "", path: `/term-set/${set.id}?unit=${unit.id}`, label: "Report an issue with this term" })}
    <div class="flashcard-classify">${control("unknown", "Don’t Know", 'aria-keyshortcuts="1"', "btn secondary")}${control("known", "Know", 'aria-keyshortcuts="2"', "btn")}</div>
    <div class="flashcard-navigation">${control("previous", "← Previous", state.index === 0 ? "disabled" : "")}<span class="muted">${state.index === state.order.length - 1 ? "Finish without classifying" : "Classifying advances the card"}</span>${state.index === state.order.length - 1 ? control("finish", "Finish round →") : control("next", "Next →")}</div>`
        : `<div id="terms-complete" class="study-empty" role="status" tabindex="-1"><p class="eyebrow">${state.order.length ? "Round finished" : "Nothing in this view"}</p><h2>${state.order.length ? "Choose your next round." : state.filter === "unknown" ? "No Don’t Know cards yet." : state.filter === "remaining" ? "No remaining cards." : "No cards in this round."}</h2>
      <p>${state.order.length ? `You reviewed ${state.order.length} cards in this round.` : "Choose another filter or start the full set."} Set totals: ${counts.known} Know, ${counts.unknown} Don’t know, ${counts.remaining} not studied.</p>
      <div class="actions">${counts.unknown ? control("study-unknown", `Review Don’t Know (${counts.unknown})`, "", "btn") : ""}${counts.remaining ? control("study-remaining", `Continue remaining (${counts.remaining})`) : ""}${control("study-all", "Start all cards")}${state.order.length ? control("previous", "Previous card") : ""}${link(`/terms/${unit.id}`, "Return to term sets", "btn secondary")}</div></div>`
    }
    <p class="terms-shortcuts">Keyboard: focus the card and press Space to flip · ← / → to move · 1 Don’t Know · 2 Know</p>
    <p class="terms-save-note">${view.storageState === "saved" ? "Progress saved in this browser." : view.storageState === "temporary" ? "Progress is kept for this tab or browser session only." : view.storageOK ? "Your progress will save in this browser as you work." : "Browser storage is unavailable. Progress is kept on this page until it is reloaded."}</p>
  </section>`;
}

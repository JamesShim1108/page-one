import { createTermsEngine } from "./engine.js";
import { filteredCardsForList, termSetPage } from "./views.js";

function listFilterValue(value) {
  return ["all", "unknown", "unstudied"].includes(value) ? value : "all";
}

function normalizedListFilter(filter = {}) {
  return {
    status: listFilterValue(filter.status),
    query: String(filter.query || ""),
    includeNotes: filter.includeNotes === true,
    row: String(filter.row || ""),
  };
}

function listPath(setId, unitId, filter, row = "") {
  const params = new URLSearchParams({ unit: unitId, view: "list" });
  if (filter.status !== "all") params.set("status", filter.status);
  if (filter.query) params.set("q", filter.query);
  if (filter.includeNotes) params.set("notes", "1");
  if (row) params.set("row", row);
  return `/term-set/${setId}?${params}`;
}

function safeReturnPath(path) {
  return typeof path === "string" && path.startsWith("/term-set/") && !path.includes("#")
    ? path
    : "";
}

export function createTermsController(
  data,
  store,
  {
    repaint = () => {},
    navigate = null,
    mode = "cards",
    recent = null,
    listFilter = {},
    referenceCardId = "",
    returnPath = "",
  } = {},
) {
  const engine = createTermsEngine(data.set, store.load(data.set.id));
  const view = {
    mode,
    settingsOpen: false,
    confirmReset: false,
    storageOK: store.available,
    storageState: store.storageState,
    conflict: store.conflictFor(data.set.id),
    listFilter: normalizedListFilter(listFilter),
    referenceCardId: String(referenceCardId || ""),
    returnPath: safeReturnPath(returnPath),
    notes: { active: {}, unresolved: [] },
    noteDrafts: {},
    noteMessages: {},
    copyMessages: {},
  };

  function touchRecent() {
    if (!recent || view.mode !== "cards" || view.referenceCardId) return;
    const current = engine.current();
    const total = engine.state.order.length;
    const active = Boolean(current);
    Promise.resolve(
      recent.touch({
        key: `terms:${data.set.id}`,
        kind: "terms",
        route: `/term-set/${data.set.id}?unit=${data.unit.id}`,
        courseId: data.course.id,
        title: data.set.title,
        detail: active
          ? `Card ${Math.min(engine.state.index + 1, total)} of ${total}`
          : "Round finished",
        active,
        status: active ? "active" : "recent",
        enteringUnitId: data.unit.id,
        view: "cards",
      }),
    ).catch(() => {});
  }

  function save(meaningful = false) {
    const result = store.save(data.set.id, engine.snapshot());
    view.storageOK = store.available;
    if (meaningful) touchRecent();
    if (result?.then)
      result.then(() => {
        view.storageState = store.storageState;
        view.conflict = store.conflictFor(data.set.id);
      });
  }

  function update({ closeSettings = false, focusId = null } = {}) {
    const activeId = document.activeElement?.id;
    view.settingsOpen =
      !closeSettings && (document.querySelector(".terms-settings")?.open || false);
    save(true);
    repaint();
    const focus = [focusId, activeId, "terms-flip", "terms-complete"]
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .find((element) => element && !element.disabled);
    focus?.focus({ preventScroll: true });
  }

  function applyListFilter(nextFilter) {
    view.listFilter = normalizedListFilter(nextFilter);
    view.listFilter.row = "";
    const path = listPath(data.set.id, data.unit.id, view.listFilter);
    if (navigate) navigate(path);
    else repaint();
  }

  function noteStatus(result) {
    if (result.status === "saved") return "Saved in this browser.";
    if (result.status === "temporary") return "Saved for this tab.";
    return result.error?.message || result.error || "This note could not be saved.";
  }

  async function saveNote(form) {
    const cardId = form.dataset.termCard;
    const text = String(form.elements.namedItem("note")?.value || "");
    view.noteDrafts[cardId] = text;
    const status = document.getElementById(`term-note-status-${cardId}`);
    if (status) status.textContent = "Saving personal note…";
    const result = await store.saveNote(data.set, cardId, text);
    view.storageState = store.storageState;
    if (!result.ok) {
      if (status) status.textContent = noteStatus(result);
      return;
    }
    view.notes = await store.loadNotes(data.set);
    delete view.noteDrafts[cardId];
    view.noteMessages[cardId] = noteStatus(result);
    repaint();
  }

  async function copyCard(cardId, includeNote) {
    const card = data.set.cards.find((item) => item.id === cardId);
    if (!card) return;
    const note = view.notes.active?.[cardId];
    const value = `Term: ${card.term}\nDefinition: ${card.definition}${includeNote && note ? `\n\nMy note (private): ${note.note}` : ""}`;
    let message = "Copy is unavailable in this browser.";
    if (globalThis.navigator?.clipboard?.writeText) {
      try {
        await globalThis.navigator.clipboard.writeText(value);
        message = includeNote
          ? "Copied with your private note."
          : "Copied official text.";
      } catch {
        // Keep the visible fallback message.
      }
    }
    view.copyMessages[cardId] = message;
    const status = document.getElementById(`term-copy-status-${cardId}`);
    if (status) status.textContent = message;
    else repaint();
  }

  function act(action) {
    switch (action) {
      case "flip": {
        engine.flip();
        touchRecent();
        const button = document.getElementById("terms-flip");
        if (button) {
          button.classList.toggle("is-flipped", engine.state.flipped);
          button.setAttribute("aria-pressed", String(engine.state.flipped));
          const field = engine.state.flipped
            ? engine.state.front === "term"
              ? "definition"
              : "term"
            : engine.state.front;
          const readable = document.getElementById("terms-readable");
          if (readable) readable.textContent = engine.current()?.[field] || "";
        }
        return true;
      }
      case "previous":
        engine.move(-1);
        break;
      case "next":
        engine.move(1);
        break;
      case "finish":
        engine.finish();
        break;
      case "undo":
        if (!engine.undo()) return true;
        break;
      case "known":
      case "unknown":
        engine.classify(action);
        break;
      case "study-unknown":
        engine.start("unknown");
        break;
      case "study-remaining":
        engine.start("remaining");
        break;
      case "study-all":
        engine.start("all");
        break;
      case "start-filtered-round": {
        const cards = filteredCardsForList(data.set, engine, view);
        if (!cards.length) return true;
        engine.startWithIds(cards.map((card) => card.id));
        view.mode = "cards";
        view.referenceCardId = "";
        view.returnPath = listPath(data.set.id, data.unit.id, view.listFilter);
        if (navigate) {
          const params = new URLSearchParams({
            unit: data.unit.id,
            return: view.returnPath,
          });
          Promise.resolve(store.save(data.set.id, engine.snapshot())).then((result) => {
            if (result?.ok === false) {
              view.storageState = store.storageState;
              repaint();
              return;
            }
            navigate(`/term-set/${data.set.id}?${params}`);
          });
          return true;
        }
        break;
      }
      case "restart":
        engine.start();
        break;
      case "reset":
        view.confirmReset = true;
        update({ closeSettings: true, focusId: "terms-confirm-reset" });
        return true;
      case "cancel-reset":
        view.confirmReset = false;
        update({ focusId: "terms-settings-toggle" });
        return true;
      case "confirm-reset":
        engine.reset();
        view.confirmReset = false;
        update({ closeSettings: true, focusId: "terms-flip" });
        return true;
      case "clear-list-filter":
        applyListFilter({ status: "all", query: "", includeNotes: false });
        return true;
      case "resolve-conflict":
        store.resolveConflict(data.set.id).then((payload) => {
          if (payload) Object.assign(engine.state, payload);
          view.storageState = store.storageState;
          view.conflict = null;
          repaint();
        });
        return true;
      case "keep-conflict":
        view.storageState = "conflict";
        update({ closeSettings: true });
        return true;
      default:
        return false;
    }
    update({ focusId: action === "undo" || action === "finish" ? "terms-flip" : null });
    return true;
  }

  const ready = Promise.resolve(
    typeof store.loadNotes === "function" ? store.loadNotes(data.set) : view.notes,
  )
    .then((notes) => {
      view.notes = notes || view.notes;
    })
    .catch(() => {
      view.notes = { active: {}, unresolved: [] };
    });

  save();
  return {
    ready,
    page: () => termSetPage(data, engine, view),
    click(event) {
      const copy = event.target.closest?.("[data-terms-copy]");
      if (copy) {
        copyCard(copy.dataset.termsCopy, copy.dataset.termsCopyWithNote === "true");
        return true;
      }
      const control = event.target.closest?.("[data-terms-action]");
      return control ? act(control.dataset.termsAction) : false;
    },
    submit(event) {
      const noteForm = event.target.closest?.("[data-term-note-form]");
      if (noteForm) {
        event.preventDefault();
        saveNote(noteForm).catch(() => {
          const status = document.getElementById(
            `term-note-status-${noteForm.dataset.termCard}`,
          );
          if (status) status.textContent = "This note could not be saved.";
        });
        return true;
      }
      const filterForm = event.target.closest?.("[data-terms-list-filter-form]");
      if (filterForm) {
        event.preventDefault();
        const form = new FormData(filterForm);
        applyListFilter({
          status: form.get("status"),
          query: form.get("q"),
          includeNotes: form.get("notes") === "1",
        });
        return true;
      }
      return false;
    },
    change(event) {
      if (event.target.id === "terms-front") engine.setFront(event.target.value);
      else if (event.target.id === "terms-shuffle")
        engine.setShuffle(event.target.checked);
      else if (event.target.id === "terms-filter") engine.start(event.target.value);
      else return false;
      update();
      return true;
    },
    keydown(event) {
      if (
        view.mode !== "cards" ||
        view.referenceCardId ||
        view.confirmReset ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.repeat ||
        event.target.closest?.(
          "input, select, textarea, summary, [contenteditable], .terms-settings",
        )
      )
        return;
      const action = {
        ArrowLeft: "previous",
        ArrowRight: "next",
        1: "unknown",
        2: "known",
      }[event.key];
      const space = event.code === "Space" && !event.target.closest?.("button, a");
      if (action || space) {
        event.preventDefault();
        act(action || "flip");
      }
    },
  };
}

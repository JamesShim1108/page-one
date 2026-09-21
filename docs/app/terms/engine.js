// Pure study logic. A session orders IDs, never copies or edits source definitions.
export const TERMS_UNDO_LIMIT = 20;

export function createTermsEngine(set, saved = null, random = Math.random) {
  const cards = new Map(set.cards.map((card) => [card.id, card]));
  const sourceIds = [...cards.keys()];
  const filters = ["all", "unknown", "remaining", "custom"];
  const state = {
    revision: set.revision,
    classifications: {},
    order: [],
    index: 0,
    filter: "all",
    shuffle: false,
    front: "term",
    flipped: false,
    undo: [],
    roundIds: null,
  };

  function start(filter = state.filter) {
    state.filter = filters.includes(filter) ? filter : "all";
    if (state.filter !== "custom") state.roundIds = null;
    const candidates =
      state.filter === "custom"
        ? (Array.isArray(state.roundIds) ? state.roundIds : []).filter((id) =>
            cards.has(id),
          )
        : sourceIds.filter((id) =>
            state.filter === "unknown"
              ? state.classifications[id] === "unknown"
              : state.filter === "remaining"
                ? !state.classifications[id]
                : true,
          );
    state.order = [...new Set(candidates)];
    if (state.shuffle) {
      for (let i = state.order.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [state.order[i], state.order[j]] = [state.order[j], state.order[i]];
      }
    }
    state.index = 0;
    state.flipped = false;
    state.undo = [];
  }

  if (saved && saved.revision === set.revision) {
    if (saved.front === "definition") state.front = saved.front;
    state.shuffle = saved.shuffle === true;
    if (filters.includes(saved.filter)) state.filter = saved.filter;
    if (
      Array.isArray(saved.roundIds) &&
      saved.roundIds.every((id) => cards.has(id)) &&
      new Set(saved.roundIds).size === saved.roundIds.length
    )
      state.roundIds = [...saved.roundIds];
    for (const [id, status] of Object.entries(saved.classifications || {})) {
      if (cards.has(id) && ["known", "unknown"].includes(status))
        state.classifications[id] = status;
    }
  }
  start();
  // A filtered queue is a snapshot: classifying a card must not shift the next
  // card's index or make Previous skip it. The next round refreshes membership.
  if (
    saved?.revision === set.revision &&
    Array.isArray(saved.order) &&
    saved.order.every((id) => cards.has(id)) &&
    new Set(saved.order).size === saved.order.length &&
    (state.filter !== "all" || saved.order.length === sourceIds.length) &&
    Number.isInteger(saved.index) &&
    saved.index >= 0 &&
    saved.index <= saved.order.length
  ) {
    state.order = [...saved.order];
    state.index = saved.index;
    state.undo = (Array.isArray(saved.undo) ? saved.undo : [])
      .filter(
        (action) =>
          action &&
          cards.has(action.cardId) &&
          state.order[action.previousIndex] === action.cardId &&
          Number.isInteger(action.previousIndex) &&
          action.previousIndex >= 0 &&
          action.previousIndex < state.order.length &&
          [null, "known", "unknown"].includes(action.previousClassification) &&
          ["known", "unknown"].includes(action.resultingClassification),
      )
      .slice(-TERMS_UNDO_LIMIT);
  }

  function current() {
    return cards.get(state.order[state.index]) || null;
  }
  function move(offset) {
    state.index = Math.min(state.order.length, Math.max(0, state.index + offset));
    state.flipped = false;
  }
  function classify(status) {
    const card = current();
    if (!card || !["known", "unknown"].includes(status)) return false;
    const previousClassification = state.classifications[card.id] || null;
    state.classifications[card.id] = status;
    state.index = Math.min(state.order.length, state.index + 1);
    state.flipped = false;
    state.undo = [
      ...state.undo,
      {
        cardId: card.id,
        previousClassification,
        previousIndex: state.index - 1,
        resultingClassification: status,
      },
    ].slice(-TERMS_UNDO_LIMIT);
    return true;
  }
  function undo() {
    const action = state.undo.at(-1);
    if (!action) return false;
    if (
      !cards.has(action.cardId) ||
      state.order[action.previousIndex] !== action.cardId
    ) {
      state.undo = [];
      return false;
    }
    if (action.previousClassification)
      state.classifications[action.cardId] = action.previousClassification;
    else delete state.classifications[action.cardId];
    state.undo = state.undo.slice(0, -1);
    state.index = action.previousIndex;
    state.flipped = false;
    return true;
  }
  function startWithIds(ids) {
    if (!Array.isArray(ids)) return false;
    const validIds = [...new Set(ids)].filter((id) => cards.has(id));
    state.roundIds = validIds;
    start("custom");
    return true;
  }
  function counts() {
    const values = Object.values(state.classifications);
    const known = values.filter((value) => value === "known").length;
    const unknown = values.filter((value) => value === "unknown").length;
    return {
      known,
      unknown,
      remaining: sourceIds.length - known - unknown,
      total: sourceIds.length,
    };
  }
  return {
    state,
    current,
    counts,
    start,
    startWithIds,
    move,
    classify,
    flip() {
      if (current()) state.flipped = !state.flipped;
    },
    setFront(front) {
      if (["term", "definition"].includes(front)) state.front = front;
      state.flipped = false;
    },
    setShuffle(enabled) {
      state.shuffle = Boolean(enabled);
      state.flipped = false;
    },
    undo,
    finish() {
      state.index = state.order.length;
      state.flipped = false;
    },
    reset() {
      state.classifications = {};
      start("all");
    },
    snapshot() {
      const { flipped, ...persistent } = state;
      return structuredClone(persistent);
    },
  };
}

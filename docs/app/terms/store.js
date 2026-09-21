import {
  courseNamespace,
  createLocalAdapter,
  migrationIdentity,
} from "../storage/adapter.js";

export const MAX_TERM_NOTE_LENGTH = 2000;

function safeStorage(getStorage) {
  try {
    return typeof getStorage === "function" ? getStorage() : getStorage;
  } catch {
    return null;
  }
}

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function noteStorageKey(setId, cardId) {
  return `page-one-terms-note-v1:${setId}:${cardId}`;
}

function cardTextHash(card) {
  let hash = 2166136261;
  for (const character of `${card?.term || ""}\u0000${card?.definition || ""}`) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function emptyNoteBucket() {
  return { active: {}, unresolved: [] };
}

function noteCacheKey(set) {
  return `${set.id}@${set.revision || "unknown"}`;
}

function noteFromPayload(set, payload) {
  if (
    !payload ||
    typeof payload !== "object" ||
    payload.setId !== set.id ||
    !payload.cardId ||
    typeof payload.note !== "string" ||
    !payload.note.trim()
  )
    return null;
  const card = set.cards.find((item) => item.id === payload.cardId) || null;
  const unresolved =
    !card ||
    payload.setRevision !== set.revision ||
    payload.cardTextHash !== cardTextHash(card);
  return {
    cardId: String(payload.cardId),
    note: payload.note,
    priorTerm: String(payload.term || card?.term || "Unknown term"),
    setRevision: String(payload.setRevision || ""),
    cardTextHash: String(payload.cardTextHash || ""),
    unresolved,
  };
}

function legacyEntries(storage) {
  if (!storage || !Number.isInteger(storage.length) || typeof storage.key !== "function")
    return [];
  const entries = [];
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (!key?.startsWith("page-one-terms-v1:")) continue;
    try {
      const value = JSON.parse(storage.getItem(key) || "null");
      if (value && typeof value === "object" && !Array.isArray(value))
        entries.push({ key, value });
    } catch {
      // A malformed legacy value is left untouched for recovery; it is not
      // allowed to poison the rest of the Terms migration.
    }
  }
  return entries;
}

// Session-only progress remains supported for callers that do not provide the
// shared adapter. The adapter path uses one durable record per authored set.
export function createTermsStore({
  getStorage = () => sessionStorage,
  adapter = null,
  usePersistentStorage = false,
  ...options
} = {}) {
  const localAdapter =
    adapter ||
    (usePersistentStorage ? createLocalAdapter({ getStorage, ...options }) : null);
  const storage = safeStorage(getStorage);
  const memory = new Map();
  const writers = new Map();
  const noteMemory = new Map();
  const noteWriters = new Map();
  let available = storage !== null;
  let state = localAdapter ? "pending" : "temporary";

  async function migrateLegacy() {
    if (!localAdapter) return;
    const entries = legacyEntries(storage);
    const records = entries.map(({ key, value }) => {
      const setId = key.slice("page-one-terms-v1:".length);
      return {
        namespace: courseNamespace(value.courseId, setId),
        kind: "terms-progress",
        recordId: setId,
        courseId: value.courseId || setId.split("-")[0],
        contentIdentity: value.revision || setId,
        payload: value,
      };
    });
    for (const entry of entries) {
      const setId = entry.key.slice("page-one-terms-v1:".length);
      await localAdapter.commitMigration({
        migrationId: migrationIdentity(entry.key, setId, entry.value),
        source: entry.key,
        records: [records.find((record) => record.recordId === setId)],
      });
    }
  }

  const ready = localAdapter
    ? localAdapter.ready
        .then(migrateLegacy)
        .then(async () => {
          const records = await localAdapter.list({ kind: "terms-progress" });
          for (const record of records) memory.set(record.recordId, record.payload);
          state = localAdapter.availability === "persistent" ? "clean" : "temporary";
          available = state === "persistent" || state === "session";
        })
        .catch(() => {
          state = "failed";
          available = false;
        })
    : Promise.resolve();

  function writerFor(id, stateValue) {
    if (!localAdapter) return null;
    if (!writers.has(id)) {
      writers.set(
        id,
        localAdapter.createRecordWriter({
          namespace: courseNamespace(stateValue.courseId, id),
          kind: "terms-progress",
          recordId: id,
          resetScopes: [`terms:${id}`, courseNamespace(stateValue.courseId, id), "all"],
          courseId: stateValue.courseId || id.split("-")[0],
          contentIdentity: stateValue.revision || id,
        }),
      );
    }
    return writers.get(id);
  }

  function noteWriterFor(set, cardId) {
    if (!localAdapter) return null;
    const key = `${set.id}:${cardId}`;
    if (!noteWriters.has(key))
      noteWriters.set(
        key,
        localAdapter.createRecordWriter({
          namespace: courseNamespace(set.courseId, set.id),
          kind: "terms-note",
          recordId: key,
          resetScopes: [`terms:${set.id}`, courseNamespace(set.courseId, set.id), "all"],
          courseId: set.courseId || set.id.split("-")[0],
          contentIdentity: set.revision || set.id,
        }),
      );
    return noteWriters.get(key);
  }

  function cacheNote(set, payload) {
    const cacheKey = noteCacheKey(set);
    const bucket = noteMemory.get(cacheKey) || emptyNoteBucket();
    const note = noteFromPayload(set, payload);
    bucket.active = { ...bucket.active };
    bucket.unresolved = [...bucket.unresolved];
    delete bucket.active[String(payload?.cardId || "")];
    bucket.unresolved = bucket.unresolved.filter(
      (item) => item.cardId !== String(payload?.cardId || ""),
    );
    if (note) {
      if (note.unresolved) bucket.unresolved.push(note);
      else bucket.active[note.cardId] = note;
    }
    noteMemory.set(cacheKey, bucket);
    return note;
  }

  async function loadNotes(set) {
    const cacheKey = noteCacheKey(set);
    if (noteMemory.has(cacheKey)) return clone(noteMemory.get(cacheKey));
    const bucket = emptyNoteBucket();
    if (localAdapter) {
      const records = await localAdapter.list({
        namespace: courseNamespace(set.courseId, set.id),
        kind: "terms-note",
      });
      for (const record of records) {
        const note = noteFromPayload(set, record.payload);
        if (!note) continue;
        if (note.unresolved) bucket.unresolved.push(note);
        else bucket.active[note.cardId] = note;
      }
    } else if (storage) {
      const keys = new Set(set.cards.map((card) => noteStorageKey(set.id, card.id)));
      if (Number.isInteger(storage.length) && typeof storage.key === "function")
        for (let index = 0; index < storage.length; index += 1) {
          const key = storage.key(index);
          if (key?.startsWith(`page-one-terms-note-v1:${set.id}:`)) keys.add(key);
        }
      for (const key of keys) {
        try {
          const payload = JSON.parse(storage.getItem(key) || "null");
          const note = noteFromPayload(set, payload);
          if (!note) continue;
          if (note.unresolved) bucket.unresolved.push(note);
          else bucket.active[note.cardId] = note;
        } catch {
          // A malformed personal note does not prevent the official set from opening.
        }
      }
    }
    noteMemory.set(cacheKey, bucket);
    return clone(bucket);
  }

  async function saveNote(set, cardId, text) {
    const card = set.cards.find((item) => item.id === cardId);
    if (!card)
      return {
        ok: false,
        status: "invalid",
        error: "That term is no longer in this set.",
      };
    if (typeof text !== "string" || text.length > MAX_TERM_NOTE_LENGTH)
      return {
        ok: false,
        status: "invalid",
        error: `Keep personal notes to ${MAX_TERM_NOTE_LENGTH.toLocaleString()} characters or fewer.`,
      };
    await loadNotes(set);
    const payload = {
      schemaVersion: 1,
      setId: set.id,
      cardId,
      note: text,
      term: card.term,
      setRevision: set.revision,
      cardTextHash: cardTextHash(card),
    };
    if (!localAdapter) {
      if (!storage) {
        available = false;
        return {
          ok: false,
          status: "failed",
          error: "Personal notes could not be saved here.",
        };
      }
      try {
        storage.setItem(noteStorageKey(set.id, cardId), JSON.stringify(payload));
        available = true;
        const note = cacheNote(set, payload);
        return { ok: true, status: "temporary", note };
      } catch {
        available = false;
        return {
          ok: false,
          status: "failed",
          error: "Personal notes could not be saved here.",
        };
      }
    }
    const writer = noteWriterFor(set, cardId);
    const result = await writer.save(payload).catch((error) => ({
      ok: false,
      status: "failed",
      error,
    }));
    if (!result.ok) return result;
    const note = cacheNote(set, payload);
    return { ...result, note };
  }

  function load(id) {
    if (memory.has(id)) return structuredClone(memory.get(id));
    if (!localAdapter) {
      if (!storage) {
        available = false;
        return null;
      }
      try {
        const saved = JSON.parse(storage?.getItem(`page-one-terms-v1:${id}`) || "null");
        if (saved && typeof saved === "object" && !Array.isArray(saved)) {
          memory.set(id, saved);
          return structuredClone(saved);
        }
      } catch {
        available = false;
      }
      return null;
    }
    return null;
  }

  function save(id, stateValue) {
    memory.set(id, structuredClone(stateValue));
    if (!localAdapter) {
      if (!storage) {
        available = false;
        return false;
      }
      try {
        storage.setItem(`page-one-terms-v1:${id}`, JSON.stringify(stateValue));
        available = true;
      } catch {
        available = false;
      }
      return available;
    }
    state = "pending";
    return writerFor(id, stateValue)
      .save(stateValue)
      .then((result) => {
        if (result.ok) {
          state = result.status === "temporary" ? "temporary" : "saved";
          available =
            result.status === "temporary" ||
            localAdapter.availability === "persistent" ||
            localAdapter.availability === "temporary";
        } else {
          state = result.status;
          available = false;
        }
        return result;
      });
  }

  function conflictFor(id) {
    return writers.get(id)?.conflict || null;
  }

  async function resolveConflict(id) {
    const writer = writers.get(id);
    const payload = await writer?.resolveSaved();
    if (!payload) return null;
    memory.set(id, structuredClone(payload));
    state = "saved";
    available = true;
    return structuredClone(payload);
  }

  return {
    ready,
    load,
    loadNotes,
    saveNote,
    save,
    conflictFor,
    resolveConflict,
    get available() {
      return available;
    },
    get storageState() {
      for (const writer of writers.values())
        if (writer.state === "conflict") return "conflict";
      return state;
    },
  };
}

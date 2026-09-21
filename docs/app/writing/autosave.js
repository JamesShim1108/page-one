/* Keep writing saves bounded without touching the editor DOM. */
export function createWritingAutosave({
  save,
  onDirty = () => {},
  onStart = () => {},
  onComplete = () => {},
  debounceMs = 500,
  maxIntervalMs = 2000,
  setTimeoutFn = setTimeout,
  clearTimeoutFn = clearTimeout,
}) {
  let debounceTimer = null;
  let maxTimer = null;
  let revision = 0;
  let dirty = false;
  let disposed = false;
  let latestStartedRevision = 0;

  function clearTimers() {
    if (debounceTimer !== null) clearTimeoutFn(debounceTimer);
    if (maxTimer !== null) clearTimeoutFn(maxTimer);
    debounceTimer = null;
    maxTimer = null;
  }

  function complete(result, revisionAtSave) {
    const stale = revisionAtSave !== revision;
    const superseded = revisionAtSave < latestStartedRevision;
    if (!disposed && !superseded)
      onComplete(result, {
        revision: revisionAtSave,
        currentRevision: revision,
        stale,
      });
    if (stale && dirty && !disposed) flush();
    return result;
  }

  function flush() {
    clearTimers();
    if (!dirty || disposed) return Promise.resolve(null);
    const revisionAtSave = revision;
    dirty = false;
    latestStartedRevision = Math.max(latestStartedRevision, revisionAtSave);
    let result;
    try {
      result = save();
      onStart({ revision: revisionAtSave });
    } catch (error) {
      result = Promise.reject(error);
    }
    return Promise.resolve(result).then(
      (value) => complete(value, revisionAtSave),
      (error) => complete({ ok: false, status: "failed", error }, revisionAtSave),
    );
  }

  function markDirty() {
    if (disposed) return;
    const wasClean = !dirty;
    dirty = true;
    revision += 1;
    if (wasClean) onDirty({ revision });
    if (debounceTimer !== null) clearTimeoutFn(debounceTimer);
    debounceTimer = setTimeoutFn(() => {
      debounceTimer = null;
      flush();
    }, debounceMs);
    if (maxTimer === null) {
      maxTimer = setTimeoutFn(() => {
        maxTimer = null;
        flush();
      }, maxIntervalMs);
    }
  }

  function dispose() {
    clearTimers();
    disposed = true;
  }

  return {
    markDirty,
    flush,
    dispose,
    get revision() {
      return revision;
    },
    get dirty() {
      return dirty;
    },
  };
}

// Cross-tab messages are hints only. IndexedDB transactions remain the source
// of truth; this module only helps an awake tab notice that it should reread.

function randomId(prefix) {
  try {
    if (globalThis.crypto?.randomUUID)
      return `${prefix}-${globalThis.crypto.randomUUID()}`;
  } catch {
    // Fall through to a non-identifying local value.
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function createStorageCoordinator({ scope = "root" } = {}) {
  const tabId = randomId("tab");
  const listeners = new Set();
  let channel = null;
  let removeVisibilityListeners = () => {};
  const canUseBrowserChannel =
    typeof globalThis.window !== "undefined" &&
    typeof globalThis.BroadcastChannel === "function";

  if (canUseBrowserChannel) {
    try {
      channel = new globalThis.BroadcastChannel(`page-one-local-events:${scope}`);
      channel.onmessage = (event) => {
        const message = event.data;
        if (!message || message.sourceId === tabId) return;
        for (const listener of listeners) listener(message);
      };
    } catch {
      channel = null;
    }
  }

  if (!channel && typeof globalThis.addEventListener === "function") {
    const refresh = () => {
      const message = { type: "refresh", sourceId: null, reason: "visibility" };
      for (const listener of listeners) listener(message);
    };
    globalThis.addEventListener("focus", refresh);
    globalThis.addEventListener("visibilitychange", refresh);
    removeVisibilityListeners = () => {
      globalThis.removeEventListener("focus", refresh);
      globalThis.removeEventListener("visibilitychange", refresh);
    };
  }

  function notify(message) {
    const event = { ...message, sourceId: tabId, scope };
    try {
      channel?.postMessage(event);
    } catch {
      // A closed or unavailable channel cannot make a successful write fail.
    }
    for (const listener of listeners) listener(event);
  }

  return {
    tabId,
    usesBroadcastChannel: Boolean(channel),
    notify,
    subscribe(listener) {
      if (typeof listener !== "function") return () => {};
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    close() {
      removeVisibilityListeners();
      channel?.close();
      channel = null;
      listeners.clear();
    },
  };
}

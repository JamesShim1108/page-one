const memory = new Map();

function storage() {
  try {
    return globalThis.sessionStorage;
  } catch {
    return null;
  }
}

function randomToken(prefix) {
  try {
    if (globalThis.crypto?.randomUUID)
      return `${prefix}-${globalThis.crypto.randomUUID()}`;
  } catch {
    // Session context is optional; the local fallback is sufficient.
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function saveNavigationContext(kind, payload) {
  const token = randomToken(kind);
  const value = { ...payload, createdAt: Date.now() };
  memory.set(token, value);
  try {
    storage()?.setItem(`page-one-navigation:${kind}:${token}`, JSON.stringify(value));
  } catch {
    // Memory is the deliberate fallback when session storage is unavailable.
  }
  return token;
}

export function readNavigationContext(kind, token) {
  if (!token) return null;
  if (memory.has(token)) return { ...memory.get(token) };
  try {
    const raw = storage()?.getItem(`page-one-navigation:${kind}:${token}`);
    if (!raw) return null;
    const value = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    memory.set(token, value);
    return { ...value };
  } catch {
    return null;
  }
}

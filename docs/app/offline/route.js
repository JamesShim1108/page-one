function locationLike(value = globalThis.location) {
  return value && typeof value === "object" ? value : { search: "", pathname: "/" };
}

export function offlinePackId(value = globalThis.location) {
  const location = locationLike(value);
  const id = new URLSearchParams(location.search || "").get("offlinePack") || "";
  return /^[a-z0-9._:-]{1,160}$/i.test(id) ? id : "";
}

export function offlineReadingActive(value = globalThis.location) {
  return Boolean(offlinePackId(value));
}

export function offlineRoute(path, packId) {
  const id = offlinePackId({
    search: `?offlinePack=${encodeURIComponent(packId || "")}`,
  });
  if (!id) return `#${path.startsWith("/") ? path : `/${path}`}`;
  return `?offlinePack=${encodeURIComponent(id)}#${path.startsWith("/") ? path : `/${path}`}`;
}

export async function announceOfflinePack(packId, navigatorLike = globalThis.navigator) {
  if (!packId || !navigatorLike?.serviceWorker) return false;
  try {
    const registration = await navigatorLike.serviceWorker.ready;
    const target = navigatorLike.serviceWorker.controller || registration.active;
    if (!target) return false;
    target.postMessage({ type: "use-pack", packId });
    return true;
  } catch {
    return false;
  }
}

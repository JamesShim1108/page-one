const clientPacks = new Map();

function safePackId(value) {
  return /^[a-z0-9._:-]{1,160}$/i.test(String(value || "")) ? String(value) : "";
}

function packCacheName(packId) {
  return `page-one-reading-pack:${packId.replace(/[^a-z0-9._:-]/gi, "_")}`;
}

function packIdFromUrl(value) {
  try {
    return safePackId(new URL(value).searchParams.get("offlinePack"));
  } catch {
    return "";
  }
}

function packIdFor(event) {
  const clientId = event.clientId || "";
  return (
    clientPacks.get(clientId) ||
    packIdFromUrl(event.request.url) ||
    packIdFromUrl(event.request.referrer)
  );
}

async function readyPackCache(packId) {
  try {
    const cache = await caches.open(packCacheName(packId));
    const marker = new URL(
      `__page-one-offline/${encodeURIComponent(packId)}.json`,
      self.registration.scope,
    );
    const response = await cache.match(marker);
    if (!response) return null;
    const manifest = await response.clone().json();
    return manifest.status === "complete" && manifest.packId === packId ? cache : null;
  } catch {
    return null;
  }
}

self.addEventListener("install", () => {
  // A new worker waits for the current release to finish. It never takes over a
  // tab that may still be reading an older pack.
});

self.addEventListener("activate", () => {
  // Cache cleanup is explicit and release-aware; activation does not delete packs.
});

self.addEventListener("message", (event) => {
  const message = event.data || {};
  const clientId = event.source?.id || "";
  if (message.type === "use-pack") {
    const packId = safePackId(message.packId);
    if (clientId && packId) clientPacks.set(clientId, packId);
    return;
  }
  if (message.type === "forget-pack" && clientId) {
    clientPacks.delete(clientId);
    return;
  }
  if (message.type === "delete-pack") {
    const packId = safePackId(message.packId);
    if (packId) event.waitUntil(caches.delete(packCacheName(packId)));
  }
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.method !== "GET" ||
    new URL(event.request.url).origin !== self.location.origin
  )
    return;
  const packId = packIdFor(event);
  if (!packId) return;
  event.respondWith(
    (async () => {
      const cache = await readyPackCache(packId);
      if (!cache) {
        try {
          return await fetch(event.request);
        } catch {
          return new Response(
            "This reading resource is not in the selected offline pack.",
            {
              status: 504,
              headers: { "content-type": "text/plain; charset=utf-8" },
            },
          );
        }
      }
      const cached =
        (await cache.match(event.request)) ||
        (await cache.match(event.request, { ignoreSearch: true }));
      if (cached) return cached;
      try {
        return await fetch(event.request);
      } catch {
        return new Response(
          "This reading resource is not in the selected offline pack.",
          {
            status: 504,
            headers: { "content-type": "text/plain; charset=utf-8" },
          },
        );
      }
    })(),
  );
});

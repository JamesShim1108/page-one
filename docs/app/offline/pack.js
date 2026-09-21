export const OFFLINE_PACK_FORMAT = "page-one-reading-pack";
export const OFFLINE_PACK_VERSION = 1;
export const MAX_PACK_BYTES = 25 * 1024 * 1024;
export const MAX_TOTAL_PACK_BYTES = 100 * 1024 * 1024;
export const DOWNLOAD_CONCURRENCY = 4;
export const OFFLINE_SHELL_RELEASE = "20260921-reading-packs-v1";

const STATIC_READING_RESOURCES = Object.freeze([
  "index.html",
  "styles.css",
  "styles/backup.css",
  "styles/offline.css",
  "styles/base.css",
  "styles/carousel.css",
  "styles/catalog.css",
  "styles/concepts.css",
  "styles/layout.css",
  "styles/lesson.css",
  "styles/media.css",
  "styles/print.css",
  "styles/quiz.css",
  "styles/reading.css",
  "styles/search.css",
  "styles/session.css",
  "styles/settings.css",
  "styles/share.css",
  "styles/study.css",
  "styles/terms.css",
  "styles/tokens.css",
  "service-worker.js",
  "app/backup/controller.js",
  "app/backup/format.js",
  "app/backup/views.js",
  "app/blocks.js",
  "app/carousel.js",
  "app/concepts/controller.js",
  "app/concepts/position.js",
  "app/concepts/text.js",
  "app/content-store.js",
  "app/history.js",
  "app/main.js",
  "app/navigation-context.js",
  "app/offline/controller.js",
  "app/offline/pack.js",
  "app/offline/route.js",
  "app/print/controller.js",
  "app/print/renderer.js",
  "app/print/selection.js",
  "app/quiz/controller.js",
  "app/quiz/engine.js",
  "app/quiz/store.js",
  "app/quiz/views.js",
  "app/reading/controller.js",
  "app/reading/marks.js",
  "app/reading/position.js",
  "app/reading/preferences.js",
  "app/recent.js",
  "app/router.js",
  "app/search.js",
  "app/search/engine.js",
  "app/session/config.js",
  "app/session/controller.js",
  "app/session/selection.js",
  "app/session/views.js",
  "app/settings.js",
  "app/share/controller.js",
  "app/share/links.js",
  "app/share/qr.js",
  "app/share/report.js",
  "app/share/views.js",
  "app/storage/adapter.js",
  "app/storage/coordination.js",
  "app/terms/controller.js",
  "app/terms/engine.js",
  "app/terms/store.js",
  "app/terms/views.js",
  "app/ui.js",
  "app/unit-tools.js",
  "app/views/catalog.js",
  "app/views/framework.js",
  "app/views/guide.js",
  "app/views/lesson.js",
  "app/writing/autosave.js",
  "app/writing/controller.js",
  "app/writing/engine.js",
  "app/writing/export.js",
  "app/writing/store.js",
  "app/writing/views.js",
]);

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function byteLength(text) {
  if (typeof TextEncoder === "function") return new TextEncoder().encode(text).length;
  return unescape(encodeURIComponent(text)).length;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function digestText(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  let hash = 2166136261;
  for (const character of text) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function normalizePath(path) {
  const value = String(path || "").replace(/^\/+/, "");
  if (!value || value === "index.html") return "index.html";
  if (
    value.includes("\\") ||
    value.split("/").some((part) => part === "..") ||
    /^[a-z][a-z\d+.-]*:/i.test(value)
  )
    throw new Error("Offline packs can contain only local release resources.");
  return value;
}

export function baseUrlFromModule(moduleUrl) {
  return new URL("../../", moduleUrl || import.meta.url);
}

export function serviceWorkerUrl(moduleUrl) {
  return new URL("../../service-worker.js", moduleUrl || import.meta.url);
}

export function resourceUrl(baseUrl, path) {
  const base = new URL(baseUrl);
  const normalized = normalizePath(path);
  const url = new URL(normalized === "index.html" ? "./" : normalized, base);
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname))
    throw new Error("Offline resource escaped the deployed application base.");
  return url;
}

export function cacheName(packId) {
  return `page-one-reading-pack:${String(packId).replace(/[^a-z0-9._:-]/gi, "_")}`;
}

export function stagingCacheName(packId) {
  return `page-one-reading-pack-staging:${String(packId).replace(/[^a-z0-9._:-]/gi, "_")}`;
}

export function manifestUrl(baseUrl, packId) {
  return new URL(`__page-one-offline/${encodeURIComponent(packId)}.json`, baseUrl);
}

export function offlineCapability(env = globalThis) {
  const location = env.location;
  const secure =
    env.isSecureContext === true ||
    location?.protocol === "https:" ||
    location?.hostname === "localhost" ||
    location?.hostname === "127.0.0.1";
  const serviceWorker = Boolean(env.navigator?.serviceWorker);
  const cacheStorage = Boolean(env.caches && typeof env.caches.open === "function");
  if (!secure)
    return { ok: false, reason: "Offline packs require a secure browser context." };
  if (!serviceWorker || !cacheStorage)
    return {
      ok: false,
      reason: "This browser does not provide the required offline storage APIs.",
    };
  return { ok: true, reason: "" };
}

function assetPaths(topicData = []) {
  return topicData.flatMap((data) =>
    Object.values(data.assets || {}).flatMap((asset) => [
      asset.file,
      ...(asset.variants || []).map((variant) => variant.file),
    ]),
  );
}

export function readingResourcePaths(data) {
  const generated = [
    "catalog.json",
    data.paths?.routes,
    ...(data.paths?.topics || []),
    data.paths?.guide,
  ];
  return unique([
    ...STATIC_READING_RESOURCES,
    ...generated,
    ...assetPaths(data.topicData),
  ]).map(normalizePath);
}

function pageEntries(data) {
  return [
    ...data.topicData.map((topic) => ({
      kind: "topic",
      id: topic.topic.id,
      title: topic.lesson.title,
      route: `/topic/${topic.topic.id}`,
    })),
    ...(data.guideData
      ? [
          {
            kind: "guide",
            id: data.unit.id,
            title: data.guideData.guide.headline,
            route: `/guide/${data.unit.id}`,
          },
        ]
      : []),
  ];
}

export function createReadingPackPlan(
  data,
  { baseUrl, applicationRelease = "", resourceSizes = {} } = {},
) {
  if (!data?.course?.id || !data.unit?.id || !Array.isArray(data.topicData))
    throw new Error("A reading pack needs one ready course unit.");
  const base = new URL(baseUrl);
  const resources = readingResourcePaths(data).map((path) => ({
    path,
    kind: path.startsWith("world/") || path.startsWith("algebra2/") ? "content" : "shell",
    required: true,
    estimatedBytes: Number.isFinite(resourceSizes[path]) ? resourceSizes[path] : null,
  }));
  const revisions = [
    ...data.topicData.map((topic) => topic.contentRevision || ""),
    data.guideData?.contentRevision || "",
  ];
  const release = `reading-${digestText({ applicationRelease, courseId: data.course.id, unitId: data.unit.id, revisions })}`;
  const packId = `pack-${digestText({ release, basePath: base.pathname })}`;
  const estimatedBytes = resources.reduce(
    (sum, resource) => sum + (resource.estimatedBytes || 0),
    0,
  );
  const unknownSizeCount = resources.filter(
    (resource) => resource.estimatedBytes === null,
  ).length;
  return {
    format: OFFLINE_PACK_FORMAT,
    formatVersion: OFFLINE_PACK_VERSION,
    packId,
    release,
    basePath: base.pathname,
    createdAt: new Date().toISOString(),
    course: {
      id: data.course.id,
      title: data.course.title,
    },
    unit: {
      id: data.unit.id,
      title: data.unit.title,
      period: data.unit.period,
    },
    pages: pageEntries(data),
    exclusions: [
      "Quizzes and question banks",
      "Writing activities and answer tasks",
      "External videos, source PDFs, and external media",
      "Automatic background downloads",
    ],
    resources,
    estimatedBytes,
    unknownSizeCount,
    byteSize: null,
    digestAlgorithm: "sha-256",
    status: "planned",
  };
}

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "size unavailable";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

export function totalPackBytes(records = []) {
  return records
    .filter(
      (record) => record.kind === "offline-pack" && record.payload?.status === "complete",
    )
    .reduce((sum, record) => sum + (Number(record.payload?.manifest?.byteSize) || 0), 0);
}

async function mapConcurrent(items, limit, task) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await task(items[index], index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, Math.max(1, items.length)) }, worker),
  );
  return results;
}

export async function estimateResourceSizes(
  manifest,
  { baseUrl, fetchFn = globalThis.fetch } = {},
) {
  if (typeof fetchFn !== "function") return manifest;
  const resources = await mapConcurrent(
    manifest.resources,
    DOWNLOAD_CONCURRENCY,
    async (resource) => {
      try {
        const response = await fetchFn(resourceUrl(baseUrl, resource.path), {
          method: "HEAD",
          cache: "no-cache",
          credentials: "same-origin",
        });
        const length = Number(response.headers?.get?.("content-length"));
        return {
          ...resource,
          estimatedBytes: Number.isFinite(length) && length >= 0 ? length : null,
        };
      } catch {
        return { ...resource, estimatedBytes: null };
      }
    },
  );
  return createManifestWithResources(manifest, resources);
}

function createManifestWithResources(manifest, resources) {
  const estimatedBytes = resources.reduce(
    (sum, resource) => sum + (resource.estimatedBytes || 0),
    0,
  );
  return {
    ...manifest,
    resources,
    estimatedBytes,
    unknownSizeCount: resources.filter((resource) => resource.estimatedBytes === null)
      .length,
  };
}

async function digestBytes(bytes) {
  if (globalThis.crypto?.subtle) {
    const hash = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(hash)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }
  return `fnv1a-${digestText(new TextDecoder().decode(bytes))}`;
}

function responseForManifest(manifest) {
  return new Response(JSON.stringify(manifest), {
    headers: { "content-type": "application/json" },
  });
}

export async function downloadReadingPack(
  manifest,
  {
    baseUrl,
    cacheStorage = globalThis.caches,
    fetchFn = globalThis.fetch,
    signal,
    maxTotalBytes = MAX_TOTAL_PACK_BYTES,
    existingRecords = [],
    onProgress = () => {},
  } = {},
) {
  if (!cacheStorage || typeof cacheStorage.open !== "function")
    return { ok: false, status: "unsupported", error: "Offline storage is unavailable." };
  if (manifest.estimatedBytes > MAX_PACK_BYTES)
    return {
      ok: false,
      status: "rejected",
      error: `This pack is larger than the ${formatBytes(MAX_PACK_BYTES)} per-pack limit.`,
    };
  const existing = existingRecords.find(
    (record) => record.kind === "offline-pack" && record.recordId === manifest.packId,
  );
  const totalBefore =
    totalPackBytes(existingRecords) -
    (Number(existing?.payload?.manifest?.byteSize) || 0);
  if (manifest.estimatedBytes && totalBefore + manifest.estimatedBytes > maxTotalBytes)
    return {
      ok: false,
      status: "rejected",
      error: `Saved packs would exceed the ${formatBytes(maxTotalBytes)} total limit.`,
    };
  if (typeof fetchFn !== "function")
    return {
      ok: false,
      status: "unsupported",
      error: "The browser cannot download offline resources.",
    };

  const base = new URL(baseUrl);
  const cache = await cacheStorage.open(stagingCacheName(manifest.packId));
  let completed = 0;
  let byteSize = 0;
  try {
    const resources = await mapConcurrent(
      manifest.resources,
      DOWNLOAD_CONCURRENCY,
      async (resource) => {
        if (signal?.aborted) throw new DOMException("Download cancelled.", "AbortError");
        const url = resourceUrl(base, resource.path);
        const response = await fetchFn(url, {
          cache: "no-cache",
          credentials: "same-origin",
          signal,
        });
        if (!response?.ok)
          throw new Error(`Required resource could not be downloaded: ${resource.path}`);
        const stored = response.clone();
        const bytes = await response.arrayBuffer();
        const digest = await digestBytes(bytes);
        if (resource.digest && resource.digest !== digest)
          throw new Error(
            `Required resource changed while downloading: ${resource.path}`,
          );
        byteSize += bytes.byteLength;
        if (byteSize > MAX_PACK_BYTES)
          throw new Error(
            `This pack is larger than the ${formatBytes(MAX_PACK_BYTES)} per-pack limit.`,
          );
        await cache.put(url, stored);
        completed += 1;
        onProgress({
          completed,
          total: manifest.resources.length,
          path: resource.path,
          byteSize,
        });
        return { ...resource, url: undefined, bytes: bytes.byteLength, digest };
      },
    );
    if (totalBefore + byteSize > maxTotalBytes)
      throw new Error(
        `Saved packs would exceed the ${formatBytes(maxTotalBytes)} total limit.`,
      );
    const completeManifest = createManifestWithResources(
      {
        ...clone(manifest),
        byteSize,
        status: "complete",
        completedAt: new Date().toISOString(),
        digestAlgorithm: resources[0]?.digest?.startsWith("fnv1a-")
          ? "fnv1a-32"
          : "sha-256",
      },
      resources.map((resource) => ({
        ...resource,
        estimatedBytes: resource.bytes,
        bytes: undefined,
      })),
    );
    await cacheStorage.delete(cacheName(manifest.packId));
    const finalCache = await cacheStorage.open(cacheName(manifest.packId));
    await mapConcurrent(resources, DOWNLOAD_CONCURRENCY, async (resource) => {
      const staged = await cache.match(resourceUrl(base, resource.path));
      if (!staged)
        throw new Error(`Required staged resource disappeared: ${resource.path}`);
      await finalCache.put(resourceUrl(base, resource.path), staged);
    });
    await finalCache.put(
      manifestUrl(base, manifest.packId),
      responseForManifest(completeManifest),
    );
    await cacheStorage.delete(stagingCacheName(manifest.packId));
    return { ok: true, status: "complete", manifest: completeManifest };
  } catch (error) {
    return {
      ok: false,
      status:
        signal?.aborted || error?.name === "AbortError" ? "cancelled" : "incomplete",
      error: error?.message || "The offline pack could not be completed.",
      completed,
      total: manifest.resources.length,
      byteSize,
    };
  }
}

export async function verifyReadingPack(
  record,
  { baseUrl, cacheStorage = globalThis.caches } = {},
) {
  const manifest = record?.payload?.manifest;
  if (
    !manifest ||
    manifest.status !== "complete" ||
    manifest.basePath !== new URL(baseUrl).pathname
  )
    return { ok: false, reason: "This pack is not complete for the current deployment." };
  if (!cacheStorage || typeof cacheStorage.open !== "function")
    return { ok: false, reason: "Offline storage is unavailable." };
  let cache;
  try {
    cache = await cacheStorage.open(cacheName(manifest.packId));
  } catch {
    return { ok: false, reason: "The saved pack cache is unavailable." };
  }
  const marker = await cache.match(manifestUrl(baseUrl, manifest.packId));
  if (!marker) return { ok: false, reason: "The pack completion marker is missing." };
  try {
    const cachedManifest = await marker.clone().json();
    if (cachedManifest.status !== "complete" || cachedManifest.packId !== manifest.packId)
      return { ok: false, reason: "The pack completion marker is invalid." };
  } catch {
    return { ok: false, reason: "The pack completion marker is invalid." };
  }
  const missing = [];
  await mapConcurrent(manifest.resources, DOWNLOAD_CONCURRENCY, async (resource) => {
    const match = await cache.match(resourceUrl(baseUrl, resource.path));
    if (!match) {
      missing.push(resource.path);
      return;
    }
    if (resource.digest) {
      const digest = await digestBytes(await match.clone().arrayBuffer());
      if (digest !== resource.digest) missing.push(resource.path);
    }
  });
  return missing.length
    ? { ok: false, reason: "A required file is no longer cached.", missing }
    : { ok: true, manifest };
}

export async function deleteReadingPack(packId, cacheStorage = globalThis.caches) {
  if (!cacheStorage || typeof cacheStorage.delete !== "function") return false;
  const results = await Promise.all([
    cacheStorage.delete(cacheName(packId)),
    cacheStorage.delete(stagingCacheName(packId)),
  ]);
  return results.some(Boolean);
}

export { STATIC_READING_RESOURCES };

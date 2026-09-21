import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createContentStore } from "../docs/app/content-store.js";
import {
  MAX_PACK_BYTES,
  OFFLINE_PACK_FORMAT,
  createReadingPackPlan,
  deleteReadingPack,
  downloadReadingPack,
  formatBytes,
  offlineCapability,
  readingResourcePaths,
  resourceUrl,
  stagingCacheName,
  verifyReadingPack,
} from "../docs/app/offline/pack.js";
import { offlineRoute, offlinePackId } from "../docs/app/offline/route.js";
import { studyGuidePage } from "../docs/app/views/guide.js";
import { lessonPage } from "../docs/app/views/lesson.js";

class FakeCache {
  constructor() {
    this.values = new Map();
  }

  key(request) {
    return String(request);
  }

  async put(request, response) {
    this.values.set(this.key(request), response.clone());
  }

  async match(request) {
    const response = this.values.get(this.key(request));
    return response ? response.clone() : undefined;
  }
}

class FakeCaches {
  constructor() {
    this.values = new Map();
  }

  async open(name) {
    if (!this.values.has(name)) this.values.set(name, new FakeCache());
    return this.values.get(name);
  }

  async delete(name) {
    return this.values.delete(name);
  }
}

function packData() {
  return {
    course: { id: "world", title: "AP World History: Modern" },
    unit: { id: "world-1", title: "The Global Tapestry", period: "c. 1200–1450" },
    topicData: [
      {
        topic: { id: "world-1-1" },
        lesson: { title: "East Asia" },
        contentRevision: "topic-rev-1",
        assets: {},
      },
      {
        topic: { id: "world-1-2" },
        lesson: { title: "Dar al-Islam" },
        contentRevision: "topic-rev-2",
        assets: {},
      },
    ],
    guideData: {
      guide: { headline: "Unit 1 study guide" },
      contentRevision: "guide-rev-1",
    },
    paths: {
      routes: "world/routes.json",
      topics: ["world/topics/world-1-1.json", "world/topics/world-1-2.json"],
      guide: "world/guides/world-1.json",
    },
  };
}

test("reading pack plans are scoped, explicit, and exclude activity data", () => {
  const plan = createReadingPackPlan(packData(), {
    baseUrl: "https://school.example/page-one/",
  });
  assert.equal(plan.format, OFFLINE_PACK_FORMAT);
  assert.equal(plan.basePath, "/page-one/");
  assert.deepEqual(
    plan.pages.map((page) => page.route),
    ["/topic/world-1-1", "/topic/world-1-2", "/guide/world-1"],
  );
  assert.equal(
    plan.resources.some((resource) => resource.path.includes("banks/")),
    false,
  );
  assert.equal(
    plan.resources.some((resource) => resource.path.includes("world/writing/")),
    false,
  );
  assert.equal(
    plan.exclusions.some((item) => /quiz/i.test(item)),
    true,
  );
  assert.equal(readingResourcePaths(packData()).includes("catalog.json"), true);
  assert.equal(
    resourceUrl("https://school.example/page-one/", "index.html").pathname,
    "/page-one/",
  );
  assert.throws(
    () => resourceUrl("https://school.example/page-one/", "https://other.example/x"),
    /local release resources/,
  );
});

test("generated reading-pack data loads lessons and guides without fetching question banks", async () => {
  const content = createContentStore({
    fetchJson: async (path) =>
      JSON.parse(
        fs.readFileSync(new URL(`../docs/generated/${path}`, import.meta.url), "utf8"),
      ),
  });
  const data = await content.readingPack("world", "world-1");
  assert.equal(data.topicData.length, 7);
  assert.equal(Boolean(data.guideData?.guide), true);
  assert.equal(
    data.topicData.every((topic) => topic.bank === undefined),
    true,
  );
  assert.equal(
    data.paths.topics.every((path) => path.startsWith("world/topics/")),
    true,
  );
});

test("offline reading renders cached lessons while keeping unavailable activities online", async () => {
  const content = createContentStore({
    fetchJson: async (path) =>
      JSON.parse(
        fs.readFileSync(new URL(`../docs/generated/${path}`, import.meta.url), "utf8"),
      ),
  });
  const data = await content.readingPack("world", "world-1");
  const lessonHtml = lessonPage(
    { ...data.topicData[0], offlineReading: true, readingPreferences: {} },
    null,
  );
  const guideHtml = studyGuidePage({
    ...data.guideData,
    offlineReading: true,
    readingPreferences: {},
  });
  assert.match(lessonHtml, /Practice is available online when you reconnect/);
  assert.match(lessonHtml, /Writing practice needs a connection/);
  assert.doesNotMatch(lessonHtml, /#\/quiz\//);
  assert.doesNotMatch(lessonHtml, /#\/writing\//);
  assert.match(guideHtml, /Quizzes and writing practice are available online/);
  assert.doesNotMatch(guideHtml, /#\/quiz\//);
  assert.doesNotMatch(guideHtml, /#\/writing\//);
  assert.doesNotMatch(guideHtml, /data-unit-tool=/);
});

test("offline pack download verifies resources, records digests, and detects eviction", async () => {
  const data = packData();
  const baseUrl = "https://school.example/page-one/";
  const plan = createReadingPackPlan(data, { baseUrl });
  const caches = new FakeCaches();
  let active = 0;
  let peak = 0;
  const fetchFn = async (url) => {
    active += 1;
    peak = Math.max(peak, active);
    await Promise.resolve();
    const response = new Response(`resource:${url.pathname}`, { status: 200 });
    active -= 1;
    return response;
  };
  const result = await downloadReadingPack(plan, {
    baseUrl,
    cacheStorage: caches,
    fetchFn,
  });
  assert.equal(result.ok, true);
  assert.equal(result.manifest.status, "complete");
  assert.equal(result.manifest.byteSize > 0, true);
  assert.equal(caches.values.has(stagingCacheName(result.manifest.packId)), false);
  assert.equal(
    result.manifest.resources.every((resource) => resource.digest),
    true,
  );
  assert.equal(peak <= 4, true);
  const record = {
    kind: "offline-pack",
    recordId: result.manifest.packId,
    payload: { status: "complete", manifest: result.manifest },
  };
  assert.equal(
    (await verifyReadingPack(record, { baseUrl, cacheStorage: caches })).ok,
    true,
  );
  const cache = await caches.open(`page-one-reading-pack:${result.manifest.packId}`);
  cache.values.delete(
    String(new URL(`__page-one-offline/${result.manifest.packId}.json`, baseUrl)),
  );
  assert.equal(
    (await verifyReadingPack(record, { baseUrl, cacheStorage: caches })).ok,
    false,
  );
  await downloadReadingPack(plan, { baseUrl, cacheStorage: caches, fetchFn });
  const refreshedCache = await caches.open(
    `page-one-reading-pack:${result.manifest.packId}`,
  );
  refreshedCache.values.delete(
    String(resourceUrl(baseUrl, result.manifest.resources[0].path)),
  );
  const missing = await verifyReadingPack(record, { baseUrl, cacheStorage: caches });
  assert.equal(missing.ok, false);
  assert.match(missing.reason, /no longer cached/);
  assert.equal(await deleteReadingPack(result.manifest.packId, caches), true);
});

test("offline limits, cancellation, capability, and pack-specific routes are honest", async () => {
  const plan = createReadingPackPlan(packData(), {
    baseUrl: "https://school.example/page-one/",
  });
  const caches = new FakeCaches();
  const tooLarge = await downloadReadingPack(
    { ...plan, estimatedBytes: MAX_PACK_BYTES + 1 },
    {
      baseUrl: "https://school.example/page-one/",
      cacheStorage: caches,
      fetchFn: async () => new Response("x"),
    },
  );
  assert.equal(tooLarge.status, "rejected");
  assert.match(tooLarge.error, /per-pack limit/);

  const controller = new AbortController();
  controller.abort();
  const cancelled = await downloadReadingPack(plan, {
    baseUrl: "https://school.example/page-one/",
    cacheStorage: caches,
    fetchFn: async () => new Response("x"),
    signal: controller.signal,
  });
  assert.equal(cancelled.status, "cancelled");
  assert.equal(
    offlineCapability({ location: { protocol: "http:", hostname: "school.example" } }).ok,
    false,
  );
  assert.equal(
    offlineCapability({
      isSecureContext: true,
      navigator: { serviceWorker: {} },
      caches: { open() {} },
    }).ok,
    true,
  );
  assert.equal(offlinePackId({ search: "?offlinePack=pack-ab12" }), "pack-ab12");
  assert.equal(offlinePackId({ search: "?offlinePack=bad%2Fid" }), "");
  assert.equal(
    offlineRoute("/topic/world-1-1", "pack-ab12"),
    "?offlinePack=pack-ab12#/topic/world-1-1",
  );
  assert.match(formatBytes(MAX_PACK_BYTES), /MiB/);
});

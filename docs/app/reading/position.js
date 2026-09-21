function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function normalizeReadingPosition(
  position,
  viewportHeight = globalThis.innerHeight || 1000,
) {
  if (!position || typeof position !== "object") return null;
  if (typeof position.pageId !== "string" || typeof position.sectionId !== "string")
    return null;
  if (!Number.isFinite(position.offset)) return null;
  const height = Math.max(1, Number(viewportHeight) || 1000);
  return {
    pageId: position.pageId,
    sectionId: position.sectionId,
    blockId: typeof position.blockId === "string" ? position.blockId : null,
    offset: clamp(position.offset, -height, height),
    pageRevision: typeof position.pageRevision === "string" ? position.pageRevision : "",
    disclosures: Array.isArray(position.disclosures)
      ? position.disclosures.filter((id) => typeof id === "string").slice(0, 20)
      : [],
  };
}

export function createReadingPositionStore(adapter, pageId, courseId = "") {
  const spec = {
    namespace: "app",
    kind: "reading-position",
    recordId: pageId,
    courseId,
    contentIdentity: pageId,
  };
  let writer = null;
  let current = null;
  const ready = adapter
    ? adapter.ready
        .then(() => {
          writer = adapter.createRecordWriter({
            ...spec,
            resetScopes: ["all"],
          });
          return writer.ready;
        })
        .then((record) => {
          current = normalizeReadingPosition(record?.payload);
          return current;
        })
    : Promise.resolve(null);

  return {
    ready,
    get position() {
      return current ? { ...current, disclosures: [...current.disclosures] } : null;
    },
    async save(position) {
      const next = normalizeReadingPosition({ ...position, pageId });
      if (!next) return { ok: false, status: "invalid" };
      current = next;
      if (adapter && !writer) {
        try {
          await ready;
        } catch (error) {
          return { ok: false, status: "failed", error };
        }
      }
      if (!writer) return { ok: true, status: "temporary", position: next };
      const result = await writer.save(next).catch((error) => ({
        ok: false,
        status: "failed",
        error,
      }));
      return result;
    },
    get state() {
      return writer?.state || "temporary";
    },
  };
}

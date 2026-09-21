// Session selection is pure so the preview and the frozen attempt can share
// one deterministic allocation rule without touching browser state.

function unique(values) {
  return [...new Set((Array.isArray(values) ? values : []).map(String))];
}

function poolQuestions(pools, topicId) {
  const ids = [];
  for (const pool of pools || []) {
    if (pool.topicId !== topicId) continue;
    ids.push(...(pool.questionIds || []));
  }
  return unique(ids);
}

export function normalizedPools(pools = []) {
  return (Array.isArray(pools) ? pools : [])
    .filter((pool) => pool && typeof pool.topicId === "string")
    .map((pool) => ({
      ...pool,
      questionIds: unique(pool.questionIds),
    }));
}

export function allocateSession({
  pools = [],
  topicIds = [],
  count = 5,
  exposedIds = [],
  preferUnseen = false,
} = {}) {
  const selectedTopics = unique(topicIds);
  const availableByTopic = new Map();
  const ownerByQuestion = new Map();
  const normalized = normalizedPools(pools);

  for (const topicId of selectedTopics) {
    const ids = [];
    for (const id of poolQuestions(normalized, topicId)) {
      if (!ownerByQuestion.has(id)) ownerByQuestion.set(id, topicId);
      if (ownerByQuestion.get(id) === topicId) ids.push(id);
    }
    availableByTopic.set(topicId, ids);
  }

  // A question appearing in overlapping eligible pools belongs to the first
  // selected topic in the URL. It is never allocated twice.
  const exposed = new Set(unique(exposedIds));
  const target = Math.max(0, Math.min(Number(count) || 0, 50));
  const selected = [];
  const allocations = new Map(selectedTopics.map((topicId) => [topicId, []]));
  const used = new Set();

  const pick = (topicId) => {
    const candidates = availableByTopic.get(topicId) || [];
    const preferred = preferUnseen
      ? candidates.filter((id) => !exposed.has(id) && !used.has(id))
      : [];
    const fallback = candidates.filter((id) => !used.has(id));
    return (preferred.length ? preferred : fallback)[0] || null;
  };

  // Round-robin allocation gives each topic an equal opportunity. Empty or
  // exhausted topics are skipped, so shortages redistribute predictably.
  while (selected.length < target) {
    let progressed = false;
    for (const topicId of selectedTopics) {
      if (selected.length >= target) break;
      const id = pick(topicId);
      if (!id) continue;
      used.add(id);
      selected.push({ id, topicId });
      allocations.get(topicId).push(id);
      progressed = true;
    }
    if (!progressed) break;
  }

  const allAvailable = [...availableByTopic.values()].flat();
  const uniqueAvailable = [...new Set(allAvailable)];
  const unseenAvailable = uniqueAvailable.filter((id) => !exposed.has(id));
  const newCount = selected.filter(({ id }) => !exposed.has(id)).length;
  const repeatedCount = selected.length - newCount;

  return {
    topicIds: selectedTopics,
    requestedCount: target,
    availableCount: uniqueAvailable.length,
    unseenAvailableCount: unseenAvailable.length,
    questionIds: selected.map(({ id }) => id),
    selected,
    allocation: Object.fromEntries(
      selectedTopics.map((topicId) => [topicId, [...(allocations.get(topicId) || [])]]),
    ),
    availability: Object.fromEntries(
      selectedTopics.map((topicId) => [
        topicId,
        (availableByTopic.get(topicId) || []).length,
      ]),
    ),
    newCount,
    repeatedCount,
    includesRepeats: repeatedCount > 0,
    shortage: selected.length < target,
    emptyTopicIds: selectedTopics.filter(
      (topicId) => (availableByTopic.get(topicId) || []).length === 0,
    ),
  };
}

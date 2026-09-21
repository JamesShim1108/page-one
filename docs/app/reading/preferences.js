import { escapeHtml as esc } from "../ui.js";

export const defaultReadingPreferences = Object.freeze({
  textScale: "100",
  lineSpacing: "default",
  readingWidth: "68",
  background: "graph",
  definitionTrigger: "hover-focus",
});

const choices = {
  textScale: [
    ["100", "100%"],
    ["115", "115%"],
    ["130", "130%"],
    ["150", "150%"],
  ],
  lineSpacing: [
    ["default", "Default"],
    ["roomier", "Roomier"],
  ],
  readingWidth: [
    ["56", "Narrow · about 56 characters"],
    ["68", "Standard · about 68 characters"],
    ["80", "Wide · about 80 characters"],
  ],
  background: [
    ["graph", "Graph paper"],
    ["plain", "Plain"],
  ],
  definitionTrigger: [
    ["hover-focus", "Hover and focus"],
    ["click", "Click or tap"],
    ["off", "Off"],
  ],
};

const legacyPreferenceValues = { "hover-click": "hover-focus" };

function normalize(values = {}) {
  return Object.fromEntries(
    Object.entries(defaultReadingPreferences).map(([key, fallback]) => [
      key,
      choices[key].some(
        ([value]) => value === (legacyPreferenceValues[values[key]] || values[key]),
      )
        ? legacyPreferenceValues[values[key]] || values[key]
        : fallback,
    ]),
  );
}

function preferenceRecord(values) {
  return { schemaVersion: 1, reading: normalize(values) };
}

export function applyReadingPreferences(
  values = defaultReadingPreferences,
  root = document,
) {
  const normalized = normalize(values);
  const documentElement = root.documentElement;
  documentElement.style.setProperty(
    "--reading-scale",
    `${Number(normalized.textScale) / 100}`,
  );
  documentElement.style.setProperty(
    "--reading-leading",
    normalized.lineSpacing === "roomier" ? "2" : "1.8",
  );
  documentElement.style.setProperty("--reading-measure", `${normalized.readingWidth}ch`);
  root.body?.classList.toggle("reading-plain", normalized.background === "plain");
  return normalized;
}

export function readingSettingsPanel(
  values = defaultReadingPreferences,
  { compact = false } = {},
) {
  const normalized = normalize(values);
  const controls = [
    ["textScale", "Text size"],
    ["lineSpacing", "Line spacing"],
    ["readingWidth", "Reading width"],
    ["background", "Background"],
    ["definitionTrigger", "Definition interaction"],
  ];
  return `<div class="reading-settings-controls${compact ? " reading-settings-controls--compact" : ""}"><p class="reading-settings-help">These display choices stay in this browser and do not change saved work.</p>${controls
    .map(
      ([key, label]) =>
        `<label>${esc(label)}<select data-reading-preference="${key}" aria-label="${esc(label)}">${choices[key].map(([value, text]) => `<option value="${value}" ${normalized[key] === value ? "selected" : ""}>${esc(text)}</option>`).join("")}</select></label>`,
    )
    .join(
      "",
    )}<div class="reading-settings-actions"><button type="button" class="text-button" data-reading-action="reset-reading-settings">Reset reading settings</button><p id="reading-settings-status" class="muted" role="status" aria-live="polite"></p></div></div>`;
}

export function createReadingPreferences(adapter) {
  const spec = { namespace: "app", kind: "preferences", recordId: "reading" };
  let values = { ...defaultReadingPreferences };
  let writer = null;
  let state = adapter ? "pending" : "temporary";
  const listeners = new Set();

  function openWriter() {
    writer = adapter.createRecordWriter({
      ...spec,
      resetScopes: ["preferences", "all"],
    });
    return writer.ready;
  }

  function notify() {
    for (const listener of listeners) listener({ ...values });
  }

  async function load() {
    if (!adapter) return;
    const record = await openWriter();
    values = normalize(record?.payload?.reading || record?.payload || {});
    state = adapter.availability === "persistent" ? "saved" : "temporary";
  }

  const ready = adapter
    ? adapter.ready.then(load).catch(() => {
        state = "failed";
      })
    : Promise.resolve();

  async function save() {
    if (!adapter || !writer) {
      state = "temporary";
      return { ok: true, status: "temporary" };
    }
    state = "pending";
    const result = await writer.save(preferenceRecord(values)).catch((error) => ({
      ok: false,
      status: "failed",
      error,
    }));
    state = result.ok
      ? result.status === "temporary"
        ? "temporary"
        : "saved"
      : result.status || "failed";
    return result;
  }

  return {
    ready,
    get values() {
      return { ...values };
    },
    get state() {
      return writer?.state === "conflict" ? "conflict" : state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    async set(key, value) {
      if (!Object.hasOwn(defaultReadingPreferences, key))
        return { ok: false, status: "invalid" };
      if (!choices[key].some(([choice]) => choice === value))
        return { ok: false, status: "invalid" };
      values = normalize({ ...values, [key]: value });
      notify();
      return save();
    },
    async reset() {
      values = { ...defaultReadingPreferences };
      notify();
      return save();
    },
    async reload() {
      if (!adapter) return values;
      if (writer?.state === "conflict" && writer.conflict?.reset) {
        await writer.remove().catch(() => {});
        await openWriter();
      }
      const record = await adapter.read(spec);
      values = normalize(record?.payload?.reading || record?.payload || {});
      state = adapter.availability === "persistent" ? "saved" : "temporary";
      notify();
      return { ...values };
    },
  };
}

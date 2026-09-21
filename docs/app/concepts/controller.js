import { placePopover } from "./position.js";

const normalizeMode = (mode) =>
  mode === "click" || mode === "off" || mode === "hover-focus" ? mode : "hover-focus";

function selectionIsActive() {
  const selection = globalThis.getSelection?.();
  return Boolean(selection && !selection.isCollapsed && selection.toString());
}

async function copyPlainText(value) {
  try {
    if (globalThis.navigator?.clipboard?.writeText) {
      await globalThis.navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Try the selection-preserving fallback below when the async clipboard is denied.
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.readOnly = true;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.setAttribute("aria-hidden", "true");
    document.body.append(textarea);
    try {
      textarea.select();
      return Boolean(
        typeof document.execCommand === "function" && document.execCommand("copy"),
      );
    } finally {
      textarea.remove();
    }
  } catch {
    return false;
  }
}

// One delegated controller and one popup per reading page, regardless of how
// many words are linked. Destroy it before replacing the page's HTML.
export function mountConceptPopovers(
  root,
  concepts = [],
  { mode: initialMode = "hover-focus", reportContext = null } = {},
) {
  if (!concepts.length) return () => {};
  const entries = new Map(concepts.map((entry) => [entry.id, entry]));
  const listeners = new AbortController();
  const panel = document.createElement("aside");
  panel.id = "concept-popover";
  panel.className = "concept-popover";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-labelledby", "concept-popover-title");
  panel.setAttribute("aria-describedby", "concept-popover-definition");
  panel.innerHTML =
    '<button type="button" class="concept-popover__close" aria-label="Close definition">×</button><h2 id="concept-popover-title"></h2><p id="concept-popover-definition"></p><p class="concept-popover__source"></p><button type="button" class="concept-popover__copy">Copy definition</button><button type="button" class="text-button concept-popover__report" data-report-action="open">Report an issue</button><p class="concept-popover__status" role="status" aria-live="polite"></p>';
  document.body.append(panel);
  const title = panel.querySelector("h2");
  const definition = panel.querySelector("#concept-popover-definition");
  const source = panel.querySelector(".concept-popover__source");
  const closeButton = panel.querySelector(".concept-popover__close");
  const copyButton = panel.querySelector(".concept-popover__copy");
  const reportButton = panel.querySelector(".concept-popover__report");
  const copyStatus = panel.querySelector(".concept-popover__status");
  let mode = normalizeMode(initialMode);
  let anchor = null,
    pinned = false,
    openTimer = null,
    closeTimer = null,
    selecting = false,
    suppressFocus = null,
    pendingMode = null,
    triggerIndex = root.querySelectorAll("[id^='concept-word-']").length;

  const listen = (target, type, handler, options = {}) =>
    target.addEventListener(type, handler, { ...options, signal: listeners.signal });
  const triggerFor = (target) => {
    const trigger = target?.closest?.(".concept-trigger");
    return trigger && root.contains(trigger) && entries.has(trigger.dataset.conceptId)
      ? trigger
      : null;
  };
  function clearTimers() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
  }
  function close(restoreFocus = false) {
    clearTimers();
    const previous = anchor;
    if (previous) {
      previous.setAttribute("aria-expanded", "false");
      previous.removeAttribute("aria-controls");
      previous.removeAttribute("aria-describedby");
    }
    anchor = null;
    pinned = false;
    panel.hidden = true;
    copyStatus.textContent = "";
    if (restoreFocus && previous?.isConnected) {
      // Restoring focus after Escape must not immediately reopen the definition.
      suppressFocus = previous;
      previous.focus({ preventScroll: true });
      suppressFocus = null;
    }
  }
  function position() {
    if (!anchor || panel.hidden) return;
    const bounds = anchor.getBoundingClientRect();
    if (!anchor.isConnected || bounds.bottom < 0 || bounds.top > window.innerHeight) {
      close();
      return;
    }
    // clientWidth excludes a visible scrollbar, unlike CSS viewport units.
    panel.style.maxWidth = `${Math.max(0, document.documentElement.clientWidth - 24)}px`;
    panel.style.maxHeight = `${Math.max(80, window.innerHeight - 24)}px`;
    const point = placePopover(bounds, panel.getBoundingClientRect(), {
      width: document.documentElement.clientWidth,
      height: window.innerHeight,
    });
    panel.style.left = `${point.left}px`;
    panel.style.top = `${point.top}px`;
  }
  function open(trigger, pin = false) {
    if (mode === "off") return;
    if (anchor !== trigger) close();
    clearTimers();
    anchor = trigger;
    pinned ||= pin;
    const entry = entries.get(trigger.dataset.conceptId);
    title.textContent = entry.term;
    definition.textContent = entry.definition;
    source.textContent = entry.sourceLabel ? `Source: ${entry.sourceLabel}` : "";
    source.hidden = !entry.sourceLabel;
    copyStatus.textContent = "";
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-controls", panel.id);
    trigger.setAttribute("aria-describedby", definition.id);
    copyButton.dataset.conceptId = entry.id;
    if (reportButton) {
      const context = reportContext || {};
      reportButton.dataset.reportType = "definition";
      reportButton.dataset.reportCourse = context.courseId || "";
      reportButton.dataset.reportTopic = context.topicId || "";
      reportButton.dataset.reportItem = entry.id;
      reportButton.dataset.reportTitle = entry.term;
      reportButton.dataset.reportRevision = context.revision || "";
      reportButton.dataset.reportPath = context.path || "/";
    }
    position();
  }
  function scheduleClose() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    if (pinned) return;
    closeTimer = setTimeout(() => {
      if (!panel.contains(document.activeElement) && document.activeElement !== anchor)
        close();
    }, 180);
  }
  function toPlainTerm(trigger) {
    const term = document.createElement("span");
    term.className = "concept-term";
    term.dataset.conceptId = trigger.dataset.conceptId;
    term.textContent = trigger.textContent;
    trigger.replaceWith(term);
  }
  function toTrigger(term) {
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "concept-trigger";
    trigger.id = `concept-word-runtime-${triggerIndex++}`;
    trigger.dataset.conceptId = term.dataset.conceptId;
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", "false");
    trigger.textContent = term.textContent;
    term.replaceWith(trigger);
  }
  function applyMode(nextMode) {
    const next = normalizeMode(nextMode);
    if (next === mode) {
      pendingMode = null;
      return;
    }
    if (selectionIsActive()) {
      pendingMode = next;
      return;
    }
    close();
    if (next === "off")
      [...root.querySelectorAll(".concept-trigger")].forEach(toPlainTerm);
    else [...root.querySelectorAll(".concept-term[data-concept-id]")].forEach(toTrigger);
    mode = next;
    pendingMode = null;
  }

  listen(root, "pointerover", (event) => {
    const trigger = triggerFor(event.target);
    if (
      mode !== "hover-focus" ||
      !trigger ||
      event.pointerType !== "mouse" ||
      pinned ||
      selecting
    )
      return;
    clearTimeout(closeTimer);
    if (trigger === anchor || trigger.contains(event.relatedTarget)) return;
    clearTimeout(openTimer);
    openTimer = setTimeout(() => {
      if (trigger.isConnected && !selectionIsActive()) open(trigger);
    }, 140);
  });
  listen(root, "pointerout", (event) => {
    const trigger = triggerFor(event.target);
    if (
      mode !== "hover-focus" ||
      !trigger ||
      trigger.contains(event.relatedTarget) ||
      panel.contains(event.relatedTarget)
    )
      return;
    scheduleClose();
  });
  listen(root, "pointerdown", (event) => {
    if (mode === "hover-focus" && event.pointerType === "mouse" && event.button === 0) {
      selecting = true;
      clearTimeout(openTimer);
    }
  });
  const finishSelection = () => {
    if (!selecting) return;
    selecting = false;
    if (selectionIsActive()) close();
  };
  listen(root, "pointerup", finishSelection);
  listen(root, "pointercancel", () => {
    selecting = false;
  });
  listen(panel, "pointerenter", () => clearTimeout(closeTimer));
  listen(panel, "pointerleave", scheduleClose);
  listen(root, "focusin", (event) => {
    const trigger = triggerFor(event.target);
    if (mode === "hover-focus" && trigger && trigger !== suppressFocus) open(trigger);
  });
  const onFocusOut = (event) => {
    if (!anchor || (event.target !== anchor && !panel.contains(event.target))) return;
    if (event.relatedTarget !== anchor && !panel.contains(event.relatedTarget)) close();
  };
  listen(root, "focusout", onFocusOut);
  listen(panel, "focusout", onFocusOut);
  listen(root, "click", (event) => {
    const trigger = triggerFor(event.target);
    if (mode === "off" || !trigger) return;
    if (selectionIsActive()) {
      close();
      return;
    }
    if (anchor === trigger && pinned) close();
    else {
      open(trigger, true);
      if (event.detail === 0) closeButton.focus({ preventScroll: true });
    }
  });
  listen(document, "click", (event) => {
    if (anchor && !anchor.contains(event.target) && !panel.contains(event.target))
      close();
  });
  listen(closeButton, "click", () => close(true));
  listen(copyButton, "click", async () => {
    const entry = entries.get(anchor?.dataset.conceptId || copyButton.dataset.conceptId);
    if (!entry) return;
    const value = [
      entry.term,
      entry.definition,
      entry.sourceLabel ? `Source: ${entry.sourceLabel}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    copyStatus.textContent = (await copyPlainText(value))
      ? "Definition copied."
      : "Couldn’t copy here. Select the definition text to copy.";
  });
  listen(document, "keydown", (event) => {
    if (event.key === "Escape" && anchor) {
      event.preventDefault();
      close(panel.contains(document.activeElement));
    }
  });
  listen(window, "page-one-reading-preference", (event) => {
    if (event.detail?.definitionTrigger) applyMode(event.detail.definitionTrigger);
  });
  listen(document, "selectionchange", () => {
    if (pendingMode && !selectionIsActive()) applyMode(pendingMode);
  });
  listen(window, "resize", position);
  listen(
    window,
    "scroll",
    (event) => {
      if (!panel.contains(event.target)) position();
    },
    { capture: true, passive: true },
  );

  return () => {
    close();
    listeners.abort();
    panel.remove();
  };
}

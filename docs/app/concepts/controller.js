import { placePopover } from "./position.js";

// One delegated controller and one popup per reading page, regardless of how
// many words are linked. Destroy it before replacing the page's HTML.
export function mountConceptPopovers(root, concepts = []) {
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
    '<button type="button" class="concept-popover__close" aria-label="Close definition">×</button><h2 id="concept-popover-title"></h2><p id="concept-popover-definition"></p><p class="concept-popover__source"></p>';
  document.body.append(panel);
  const title = panel.querySelector("h2");
  const definition = panel.querySelector("#concept-popover-definition");
  const source = panel.querySelector(".concept-popover__source");
  const closeButton = panel.querySelector("button");
  let anchor = null,
    pinned = false,
    openTimer = null,
    closeTimer = null;
  let suppressFocus = null;

  const listen = (target, type, handler, options = {}) =>
    target.addEventListener(type, handler, { ...options, signal: listeners.signal });
  const triggerFor = (target) => {
    const trigger = target instanceof Element ? target.closest(".concept-trigger") : null;
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
    if (anchor !== trigger) close();
    clearTimers();
    anchor = trigger;
    pinned ||= pin;
    const entry = entries.get(trigger.dataset.conceptId);
    title.textContent = entry.term;
    definition.textContent = entry.definition;
    source.textContent = entry.sourceLabel;
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-controls", panel.id);
    trigger.setAttribute("aria-describedby", definition.id);
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

  listen(root, "pointerover", (event) => {
    const trigger = triggerFor(event.target);
    if (!trigger || event.pointerType !== "mouse" || pinned) return;
    clearTimeout(closeTimer);
    if (trigger === anchor || trigger.contains(event.relatedTarget)) return;
    clearTimeout(openTimer);
    openTimer = setTimeout(() => {
      if (trigger.isConnected) open(trigger);
    }, 140);
  });
  listen(root, "pointerout", (event) => {
    const trigger = triggerFor(event.target);
    if (
      !trigger ||
      trigger.contains(event.relatedTarget) ||
      panel.contains(event.relatedTarget)
    )
      return;
    scheduleClose();
  });
  listen(panel, "pointerenter", () => clearTimeout(closeTimer));
  listen(panel, "pointerleave", scheduleClose);
  listen(root, "focusin", (event) => {
    const trigger = triggerFor(event.target);
    if (trigger && trigger !== suppressFocus) open(trigger);
  });
  const onFocusOut = (event) => {
    if (!anchor || (event.target !== anchor && !panel.contains(event.target))) return;
    if (event.relatedTarget !== anchor && !panel.contains(event.relatedTarget)) close();
  };
  listen(root, "focusout", onFocusOut);
  listen(panel, "focusout", onFocusOut);
  listen(root, "click", (event) => {
    const trigger = triggerFor(event.target);
    if (!trigger) return;
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
  listen(document, "keydown", (event) => {
    if (event.key === "Escape" && anchor) {
      event.preventDefault();
      close(panel.contains(document.activeElement));
    }
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
